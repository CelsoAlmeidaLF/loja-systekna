/* =========================================================
   Loja Systekna · camada de dados (Arquitetura Hexagonal / Ports & Adapters)
   Mesma interface para os dois modos:
   - "demo": Local-First (localStorage + IndexedDB) com suporte a sessões e feedback local.
   - "firebase": Firestore (catálogo, imagens, avaliações, sugestões) + Auth
   ========================================================= */
import { SEED } from "./seed.js";

const FB = "https://www.gstatic.com/firebasejs/10.12.2/";
const MAX_IMG = 900 * 1024; // limite por imagem (documento do Firestore tem até 1 MiB)

const newId = () => (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "") : Date.now().toString(36) + Math.random().toString(36).slice(2, 12));
const blobToDataURL = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(b); });
const err = (code, message) => Object.assign(new Error(message || code), { code });

export async function createStore(cfg) {
  return cfg && cfg.firebase ? firebaseStore(cfg) : demoStore(cfg || {});
}

/* ---------------- modo demonstração / local-first ---------------- */
function demoStore(cfg) {
  const K = "stk-demo-";
  const read = (k, d) => { try { const v = localStorage.getItem(K + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(K + k, JSON.stringify(v)); } catch (e) { throw err("quota", "Espaço do navegador cheio"); } };

  const CURRENT_SEED_VER = 2;
  const lastSeedVer = read("seed_ver", 0);
  if (lastSeedVer < CURRENT_SEED_VER) {
    const currentApps = read("apps", {});
    SEED.forEach(a => {
      const { id, ...rest } = a;
      currentApps[id] = Object.assign({}, rest, currentApps[id] || {}, {
        iconBase64: rest.iconBase64,
        url: rest.url,
        repoUrl: rest.repoUrl
      });
    });
    write("apps", currentApps);
    write("seed_ver", CURRENT_SEED_VER);
    write("seeded", true);
  }

  const subs = { apps: new Set(), reviews: new Set(), replies: new Set(), settings: new Set(), suggestions: new Set() };
  const list = c => Object.entries(read(c, {})).map(([id, v]) => Object.assign({ id }, v));
  const emit = c => subs[c] && subs[c].forEach(cb => cb(list(c)));
  const on = c => (cb) => { subs[c].add(cb); setTimeout(() => cb(list(c)), 0); return () => subs[c].delete(cb); };
  const put = (c, id, v) => { const m = read(c, {}); if (v === null) delete m[id]; else m[id] = v; write(c, m); emit(c); };
  addEventListener("storage", e => { if (!e.key || !e.key.startsWith(K)) return; const c = e.key.slice(K.length); if (subs[c]) emit(c); });

  // Imagens no IndexedDB
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open("stk-demo-img", 1); r.onupgradeneeded = () => r.result.createObjectStore("img"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const tx = async (mode, fn) => { const d = await idb(); return new Promise((res, rej) => { const t = d.transaction("img", mode); const q = fn(t.objectStore("img")); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  const cache = new Map();

  // Gerenciamento de sessão simples
  let activeUser = read("auth_user", {
    uid: "demo-admin",
    name: "Administrador (Systekna)",
    email: "admin@systekna.com.br",
    photo: "",
    isAdmin: true,
    authType: "admin_pin"
  });
  const authSubs = new Set();
  const emitAuth = () => authSubs.forEach(cb => cb(activeUser));

  return {
    mode: "demo",
    onAuth(cb) { authSubs.add(cb); setTimeout(() => cb(activeUser), 0); return () => authSubs.delete(cb); },

    // Autenticação simples (PIN mestre / E-mail ou Visitante)
    async signInWithCredentials(identifier, pinOrPass) {
      const pin = String(pinOrPass || "").trim();
      const masterPin = String(cfg.adminMasterPin || "123456").trim();
      const email = String(identifier || "").trim().toLowerCase();
      const isAdmin = (pin === masterPin) || ((cfg.adminEmails || []).some(e => String(e).toLowerCase() === email));

      activeUser = {
        uid: isAdmin ? "admin-" + (email.split("@")[0] || "demo") : "user-" + newId().slice(0, 8),
        name: isAdmin ? "Administrador Systekna" : (identifier || "Usuário"),
        email: email || "admin@systekna.com.br",
        photo: "",
        isAdmin: isAdmin,
        authType: "credentials"
      };
      write("auth_user", activeUser);
      emitAuth();
      return activeUser;
    },

    async signInAsGuest(name) {
      const gName = String(name || "").trim() || "Visitante";
      activeUser = {
        uid: "guest-" + Date.now().toString(36),
        name: gName,
        email: "",
        photo: "",
        isAdmin: false,
        authType: "guest"
      };
      write("auth_user", activeUser);
      emitAuth();
      return activeUser;
    },

    async signIn() {
      activeUser = { uid: "demo-admin", name: "Administrador (Systekna)", email: "admin@systekna.com.br", photo: "", isAdmin: true, authType: "google" };
      write("auth_user", activeUser);
      emitAuth();
      return activeUser;
    },

    async signOut() {
      activeUser = null;
      localStorage.removeItem(K + "auth_user");
      emitAuth();
    },

    onApps: on("apps"),
    onReviews: on("reviews"),
    onReplies: on("replies"),
    onSuggestions: on("suggestions"),

    onSettings(cb) { return on("settings")(list => cb((list.find(x => x.id === "support")) || {})); },
    async setSettings(data) { put("settings", "support", data); },
    async setApp(id, body) { put("apps", id, body); },
    async updateApp(id, patch) { const m = read("apps", {}); if (!m[id]) throw err("not-found"); put("apps", id, Object.assign({}, m[id], patch)); },
    async deleteApp(id) { put("apps", id, null); },

    // Armazenamento de imagem (Base64 / Data URL)
    async putImage(blob) {
      const url = await blobToDataURL(blob);
      if (url.length > MAX_IMG * 1.37) throw err("too_large");
      const id = newId();
      await tx("readwrite", s => s.put(url, id));
      cache.set(id, url);
      return id;
    },
    async getImage(id) {
      if (cache.has(id)) return cache.get(id);
      const u = await tx("readonly", s => s.get(id));
      if (u) cache.set(id, u);
      return u || "";
    },
    async deleteImage(id) { cache.delete(id); await tx("readwrite", s => s.delete(id)); },

    // Avaliações
    async setReview(uid, data) { put("reviews", uid, data); },
    async setReply(uid, data) { put("replies", uid, data); },

    // Sugestões & Feedbacks da base canônica (coleção sugestoes)
    async addSuggestion(item) {
      const id = newId();
      const doc = Object.assign({
        id,
        tipo: item.tipo || "sugestao",
        texto: String(item.texto || "").trim(),
        app: item.app || "geral",
        email: item.email || "",
        criadoEm: new Date().toISOString(),
        lida: false
      });
      put("suggestions", id, doc);
      return id;
    },
    async updateSuggestion(id, patch) {
      const m = read("suggestions", {});
      if (!m[id]) return;
      put("suggestions", id, Object.assign({}, m[id], patch));
    },
    async deleteSuggestion(id) { put("suggestions", id, null); },

    async seed() {
      const m = {};
      SEED.forEach(a => { const { id, ...rest } = a; m[id] = rest; });
      write("apps", m);
      emit("apps");
    },
    async resetDemo() {
      ["apps", "reviews", "replies", "settings", "suggestions", "seeded", "auth_user"].forEach(k => localStorage.removeItem(K + k));
      indexedDB.deleteDatabase("stk-demo-img");
    }
  };
}

/* ---------------- Firebase (Firestore + Auth) ---------------- */
async function firebaseStore(cfg) {
  const [{ initializeApp }, A, F] = await Promise.all([
    import(FB + "firebase-app.js"), import(FB + "firebase-auth.js"), import(FB + "firebase-firestore.js")
  ]);
  const app = initializeApp(cfg.firebase);
  let db;
  try { db = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) }); }
  catch (e) { db = F.getFirestore(app); }
  const auth = A.getAuth(app);
  auth.languageCode = "pt";
  A.getRedirectResult(auth).catch(() => {});

  const admins = (cfg.adminEmails || []).map(e => String(e).toLowerCase());
  const masterPin = String(cfg.adminMasterPin || "123456").trim();

  // Sessão manual para fallback/PIN simples
  let localSession = null;
  try {
    const s = localStorage.getItem("stk-fb-session");
    if (s) localSession = JSON.parse(s);
  } catch (_) {}

  const authSubs = new Set();
  const toUser = u => {
    if (localSession) return localSession;
    if (!u) return null;
    const email = (u.email || "").toLowerCase();
    const isAdmin = !!(u.email && admins.includes(email));
    return {
      uid: u.uid,
      name: u.displayName || u.email || "Usuário",
      email: u.email || "",
      photo: u.photoURL || "",
      isAdmin,
      authType: "google"
    };
  };

  A.onAuthStateChanged(auth, u => {
    const active = toUser(u);
    authSubs.forEach(cb => cb(active));
  });

  const emitAuth = () => {
    const active = toUser(auth.currentUser);
    authSubs.forEach(cb => cb(active));
  };

  const col = c => (cb, onErr) => F.onSnapshot(F.collection(db, c),
    s => cb(s.docs.map(d => Object.assign({ id: d.id }, d.data()))), e => onErr && onErr(e));
  const cache = new Map();
  const map = e => { const c = e && e.code || ""; return err(c.includes("permission") ? "permission" : c.includes("unavailable") ? "offline" : c || "unknown", e && e.message); };
  const wrap = p => p.catch(e => { throw map(e); });

  return {
    mode: "firebase",
    onAuth(cb) {
      authSubs.add(cb);
      setTimeout(() => cb(toUser(auth.currentUser)), 0);
      return () => authSubs.delete(cb);
    },

    // Autenticação simples (PIN / Senha / Visitante)
    async signInWithCredentials(identifier, pinOrPass) {
      const pin = String(pinOrPass || "").trim();
      const email = String(identifier || "").trim().toLowerCase();

      // Autenticação por PIN Mestre Administrativo
      if (pin === masterPin || (admins.includes(email) && pin === masterPin)) {
        localSession = {
          uid: "admin-" + (email.split("@")[0] || "master"),
          name: "Administrador Systekna",
          email: email || admins[0] || "admin@systekna.com.br",
          photo: "",
          isAdmin: true,
          authType: "admin_pin"
        };
        localStorage.setItem("stk-fb-session", JSON.stringify(localSession));
        emitAuth();
        return localSession;
      }

      // Tenta Firebase Auth com E-mail e Senha caso configurado
      try {
        const cred = await A.signInWithEmailAndPassword(auth, email, pinOrPass);
        localSession = null;
        localStorage.removeItem("stk-fb-session");
        return toUser(cred.user);
      } catch (errAuth) {
        throw map(errAuth);
      }
    },

    async signInAsGuest(name) {
      const gName = String(name || "").trim() || "Visitante";
      localSession = {
        uid: "guest-" + Date.now().toString(36),
        name: gName,
        email: "",
        photo: "",
        isAdmin: false,
        authType: "guest"
      };
      localStorage.setItem("stk-fb-session", JSON.stringify(localSession));
      emitAuth();
      return localSession;
    },

    async signIn() {
      localSession = null;
      localStorage.removeItem("stk-fb-session");
      const p = new A.GoogleAuthProvider();
      p.setCustomParameters({ prompt: "select_account" });
      try { await A.signInWithPopup(auth, p); }
      catch (e) {
        if (/popup|cancelled|operation-not-supported/.test(e.code || "")) await A.signInWithRedirect(auth, p);
        else throw map(e);
      }
    },

    async signOut() {
      localSession = null;
      localStorage.removeItem("stk-fb-session");
      try { await A.signOut(auth); } catch (_) {}
      emitAuth();
    },

    onApps: col("apps"),
    onReviews: col("reviews"),
    onReplies: col("replies"),
    onSuggestions: col("sugestoes"),

    onSettings(cb, onErr) { return F.onSnapshot(F.doc(db, "settings", "support"), s => cb(s.exists() ? s.data() : {}), e => onErr && onErr(e)); },
    setSettings(data) { return wrap(F.setDoc(F.doc(db, "settings", "support"), data)); },

    // Gravação de app com URLs e ícone Base64 no Firestore
    setApp(id, body) { return wrap(F.setDoc(F.doc(db, "apps", id), body)); },
    updateApp(id, patch) { return wrap(F.updateDoc(F.doc(db, "apps", id), patch)); },
    deleteApp(id) { return wrap(F.deleteDoc(F.doc(db, "apps", id))); },

    // Armazenamento de imagem em Base64 na coleção 'images'
    async putImage(blob) {
      const data = await blobToDataURL(blob);
      if (data.length > MAX_IMG * 1.37) throw err("too_large");
      const id = newId();
      await wrap(F.setDoc(F.doc(db, "images", id), { data, type: blob.type || "image/jpeg", size: blob.size, at: new Date().toISOString() }));
      cache.set(id, data);
      return id;
    },
    async getImage(id) {
      if (cache.has(id)) return cache.get(id);
      const s = await F.getDoc(F.doc(db, "images", id));
      const u = s.exists() ? s.data().data : "";
      if (u) cache.set(id, u);
      return u;
    },
    deleteImage(id) { cache.delete(id); return wrap(F.deleteDoc(F.doc(db, "images", id))); },

    // Avaliações
    setReview(uid, data) { return wrap(F.setDoc(F.doc(db, "reviews", uid), data)); },
    setReply(uid, data) { return wrap(F.setDoc(F.doc(db, "replies", uid), data)); },

    // Coleção canônica de feedbacks da Systekna ('sugestoes')
    async addSuggestion(item) {
      const doc = {
        app: item.app || "geral",
        tipo: item.tipo || "sugestao",
        texto: String(item.texto || "").trim(),
        email: item.email || "",
        criadoEm: new Date().toISOString(),
        lida: false
      };
      const res = await wrap(F.addDoc(F.collection(db, "sugestoes"), doc));
      return res.id;
    },
    updateSuggestion(id, patch) { return wrap(F.updateDoc(F.doc(db, "sugestoes", id), patch)); },
    deleteSuggestion(id) { return wrap(F.deleteDoc(F.doc(db, "sugestoes", id))); },

    async seed() {
      const b = F.writeBatch(db);
      SEED.forEach(a => { const { id, ...rest } = a; b.set(F.doc(db, "apps", id), rest); });
      return wrap(b.commit());
    }
  };
}
