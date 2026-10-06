
const CACHE = 'letrin-v0-10';
const ASSETS = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.json', 'assets/milo.webp', 'assets/garden.svg', 'assets/milo-peeking.webp', 'assets/milo-celebrando.webp', 'assets/abeja.webp', 'assets/avion.webp', 'assets/arbol.webp', 'assets/arana.webp'];
self.addEventListener('install', event => {
  ASSETS.push('letter-path.js','assets/fonts/nunito.ttf','assets/milo-fiesta-0.webp','assets/milo-fiesta-1.webp','assets/milo-fiesta-2.webp','assets/milo-fiesta-3.webp','assets/milo-fiesta-4.webp');
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('letrin-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    if (event.request.mode === 'navigate') return caches.match('index.html');
    return Response.error();
  }));
});

