
const CACHE = 'letrin-v0-31';
const ASSETS = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.json', 'assets/milo.webp', 'assets/garden.svg', 'assets/milo-peeking.webp', 'assets/milo-celebrando.webp', 'assets/abeja.webp', 'assets/avion.webp', 'assets/arbol.webp', 'assets/arana.webp'];
self.addEventListener('install', event => {
  ASSETS.push('styles.css?v=31','app.js?v=31');
  ASSETS.push('styles.css?v=30','app.js?v=30','letter-path.js?v=30');
  ASSETS.push('styles.css?v=29','app.js?v=29');
  ASSETS.push('styles.css?v=28','app.js?v=28','letter-path.js?v=28','assets/milo-pintar.webp','assets/milo-trazar.webp');
  ASSETS.push('audio.js?v=26','audio-catalog.js?v=27');
  ASSETS.push('styles.css?v=25','app.js?v=25','letter-path.js?v=25','audio.js','audio-catalog.js','audio.js?v=25','audio-catalog.js?v=25','assets/ui-icons.svg','assets/letra-a-roja.webp','assets/letra-a-verde.webp');
  ASSETS.push(...['trazar','pintar','elegir','atrapar'].map(asset => `assets/actividad-${asset}.webp`));
  ASSETS.push(...['sol','oso','casa','pelota','luna','barco','flor','gato','banana'].map(asset => `assets/${asset}.webp`));
  ASSETS.push('letter-path.js','assets/fonts/nunito.ttf','assets/milo-fiesta-0.webp','assets/milo-fiesta-1.webp','assets/milo-fiesta-2.webp','assets/milo-fiesta-3.webp','assets/milo-fiesta-4.webp');
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('letrin-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request, {cache:'no-cache'}).then(response => {
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
