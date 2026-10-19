/* =========================================================
   Loja Systekna · camada de dados
   Mesma interface para os dois modos:
   - "demo": tudo neste aparelho (localStorage + IndexedDB)
   - "firebase": Firestore (catálogo, imagens, avaliações) + Login Google
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

/* ---------------- modo demonstração ---------------- */
function demoStore(cfg) {
  const K = "stk-demo-";
  const read = (k, d) => { try { const v = localStorage.getItem(K + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(K + k, JSON.stringify(v)); } catch (e) { throw err("quota", "Espaço do navegador cheio"); } };
  if (!read("seeded", false)) { const m = {}; SEED.forEach(a => { const { id, ...rest } = a; m[id] = rest; }); write("apps", m); write("seeded", true); }

  const subs = { apps: new Set(), reviews: new Set(), replies: new Set(), settings: new Set() };
  const list = c => Object.entries(read(c, {})).map(([id, v]) => Object.assign({ id }, v));
  const emit = c => subs[c].forEach(cb => cb(list(c)));
  const on = c => (cb) => { subs[c].add(cb); setTimeout(() => cb(list(c)), 0); return () => subs[c].delete(cb); };
  const put = (c, id, v) => { const m = read(c, {}); if (v === null) delete m[id]; else m[id] = v; write(c, m); emit(c); };
  addEventListener("storage", e => { if (!e.key || !e.key.startsWith(K)) return; const c = e.key.slice(K.length); if (subs[c]) emit(c); });

  // imagens no IndexedDB
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open("stk-demo-img", 1); r.onupgradeneeded = () => r.result.createObjectStore("img"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const tx = async (mode, fn) => { const d = await idb(); return new Promise((res, rej) => { const t = d.transaction("img", mode); const q = fn(t.objectStore("img")); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  const cache = new Map();

  const user = { uid: "demo-admin", name: "Administrador (demo)", email: "", photo: "", isAdmin: true };
  return {
    mode: "demo",
    onAuth(cb) { setTimeout(() => cb(user), 0); return () => {}; },
    async signIn() { return user; },
    async signOut() {},
    onApps: on("apps"), onReviews: on("reviews"), onReplies: on("replies"),
    onSettings(cb) { return on("settings")(list => cb((list.find(x => x.id === "support")) || {})); },
    async setSettings(data) { put("settings", "support", data); },
    async setApp(id, body) { put("apps", id, body); },
    async updateApp(id, patch) { const m = read("apps", {}); if (!m[id]) throw err("not-found"); put("apps", id, Object.assign({}, m[id], patch)); },
    async deleteApp(id) { put("apps", id, null); },
    async putImage(blob) { const url = await blobToDataURL(blob); if (url.length > MAX_IMG * 1.37) throw err("too_large"); const id = newId(); await tx("readwrite", s => s.put(url, id)); cache.set(id, url); return id; },
    async getImage(id) { if (cache.has(id)) return cache.get(id); const u = await tx("readonly", s => s.get(id)); if (u) cache.set(id, u); return u || ""; },
    async deleteImage(id) { cache.delete(id); await tx("readwrite", s => s.delete(id)); },
    async setReview(uid, data) { put("reviews", uid, data); },
    async setReply(uid, data) { put("replies", uid, data); },
    async seed() { const m = {}; SEED.forEach(a => { const { id, ...rest } = a; m[id] = rest; }); write("apps", m); emit("apps"); },
    async resetDemo() { ["apps", "reviews", "replies", "settings", "seeded"].forEach(k => localStorage.removeItem(K + k)); indexedDB.deleteDatabase("stk-demo-img"); }
  };
}

/* ---------------- Firebase ---------------- */
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
  const toUser = u => u ? { uid: u.uid, name: u.displayName || "", email: u.email || "", photo: u.photoURL || "",
    isAdmin: !!(u.email && u.emailVerified && admins.includes(u.email.toLowerCase())) } : null;
  const col = c => (cb, onErr) => F.onSnapshot(F.collection(db, c),
    s => cb(s.docs.map(d => Object.assign({ id: d.id }, d.data()))), e => onErr && onErr(e));
  const cache = new Map();
  const map = e => { const c = e && e.code || ""; return err(c.includes("permission") ? "permission" : c.includes("unavailable") ? "offline" : c || "unknown", e && e.message); };
  const wrap = p => p.catch(e => { throw map(e); });

  return {
    mode: "firebase",
    onAuth(cb) { return A.onAuthStateChanged(auth, u => cb(toUser(u))); },
    async signIn() {
      const p = new A.GoogleAuthProvider(); p.setCustomParameters({ prompt: "select_account" });
      try { await A.signInWithPopup(auth, p); }
      catch (e) { if (/popup|cancelled|operation-not-supported/.test(e.code || "")) await A.signInWithRedirect(auth, p); else throw map(e); }
    },
    signOut() { return A.signOut(auth); },
    onApps: col("apps"), onReviews: col("reviews"), onReplies: col("replies"),
    onSettings(cb, onErr) { return F.onSnapshot(F.doc(db, "settings", "support"), s => cb(s.exists() ? s.data() : {}), e => onErr && onErr(e)); },
    setSettings(data) { return wrap(F.setDoc(F.doc(db, "settings", "support"), data)); },
    setApp(id, body) { return wrap(F.setDoc(F.doc(db, "apps", id), body)); },
    updateApp(id, patch) { return wrap(F.updateDoc(F.doc(db, "apps", id), patch)); },
    deleteApp(id) { return wrap(F.deleteDoc(F.doc(db, "apps", id))); },
    async putImage(blob) {
      const data = await blobToDataURL(blob);
      if (data.length > MAX_IMG * 1.37) throw err("too_large");
      const id = newId();
      await wrap(F.setDoc(F.doc(db, "images", id), { data, type: blob.type || "image/jpeg", size: blob.size, at: new Date().toISOString() }));
      cache.set(id, data); return id;
    },
    async getImage(id) {
      if (cache.has(id)) return cache.get(id);
      const s = await F.getDoc(F.doc(db, "images", id)); const u = s.exists() ? s.data().data : "";
      if (u) cache.set(id, u); return u;
    },
    deleteImage(id) { cache.delete(id); return wrap(F.deleteDoc(F.doc(db, "images", id))); },
    setReview(uid, data) { return wrap(F.setDoc(F.doc(db, "reviews", uid), data)); },
    setReply(uid, data) { return wrap(F.setDoc(F.doc(db, "replies", uid), data)); },
    async seed() {
      const b = F.writeBatch(db);
      SEED.forEach(a => { const { id, ...rest } = a; b.set(F.doc(db, "apps", id), rest); });
      return wrap(b.commit());
    }
  };
}
