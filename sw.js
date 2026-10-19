/* Loja Systekna · service worker v1.4.2
   Atualização imediata com self.skipWaiting() e estratégia Network-First para scripts. */
const VERSION = "stk-loja-v1.4.2";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest",
  "./css/styles.css",
  "./js/config.js", "./js/app.js", "./js/data.js", "./js/seed.js", "./js/vendor/qrcode.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Firebase (Firestore/Auth) cuida do próprio cache e da conexão em tempo real
  if (/firestore\.googleapis\.com|identitytoolkit|securetoken|googleapis\.com\/identity|firebaseapp\.com/.test(url.host + url.pathname)) return;

  // Navegação: rede primeiro, cópia salva quando offline
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(r => {
          const copy = r.clone();
          caches.open(VERSION).then(c => c.put("./index.html", copy));
          return r;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Scripts JS e CSS de mesma origem: Network-First com fallback para cache
  const isCode = url.origin === location.origin && (url.pathname.endsWith(".js") || url.pathname.endsWith(".css"));
  if (isCode) {
    e.respondWith(
      fetch(req)
        .then(r => {
          if (r && (r.ok || r.type === "opaque")) {
            const copy = r.clone();
            caches.open(VERSION).then(c => c.put(req, copy));
          }
          return r;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Arquivos estáticos (fontes, imagens): cache primeiro com atualização em segundo plano
  const cacheable = url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com|www\.gstatic\.com\/firebasejs/.test(url.host + url.pathname);
  if (!cacheable) return;
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req)
        .then(r => {
          if (r && (r.ok || r.type === "opaque")) {
            const copy = r.clone();
            caches.open(VERSION).then(c => c.put(req, copy));
          }
          return r;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});

