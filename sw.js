/* Keeps the app itself on the phone so it opens with no internet. It never touches the cloud (those calls go straight through). */
const CACHE = 'billdesk-phone-2.6.4';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./","./app.css","./app.js","./apple-touch-icon-180.png","./chunk-SQE76S5B.js","./chunk-XDTYHDBP.js","./favicon-32.png","./favicon-64.png","./icon-192.png","./icon-256.png","./icon-512.png","./icon-maskable-512.png","./index.html","./manifest.webmanifest"])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return r;
  }).catch(() => (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
