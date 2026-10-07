
const CACHE = 'letrin-v0-44';
const ASSETS = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.json', 'assets/milo.webp', 'assets/garden.svg', 'assets/milo-peeking.webp', 'assets/milo-celebrando.webp', 'assets/abeja.webp', 'assets/avion.webp', 'assets/arbol.webp', 'assets/arana.webp'];
self.addEventListener('install', event => {
  ASSETS.push(...['dado','delfin','diente','durazno','letra-d-roja','letra-d-verde','actividad-trazar-d','actividad-atrapar-d'].map(asset=>`assets/${asset}.webp`));
  ASSETS.push(...['letra-d','dado','delfin','diente','durazno'].map(word=>`assets/audio/es-AR/${word}.mp3`));
  ASSETS.push('styles.css?v=44','app.js?v=44','letters.js?v=43','letter-path.js?v=43');
  ASSETS.push(...['cama','conejo','corazon','letra-c-roja','letra-c-verde','actividad-trazar-c','actividad-atrapar-c'].map(asset=>`assets/${asset}.webp`));
  ASSETS.push('assets/actividad-trazar-b.webp','assets/actividad-atrapar-b.webp');
  ASSETS.push('assets/ballena.webp','assets/bicicleta.webp','assets/letra-b-roja.webp','assets/letra-b-verde.webp');
  ASSETS.push('assets/app-icon-192.png','assets/app-icon-512.png','assets/app-icon-maskable-512.png');
  ASSETS.push(...['abeja','avion','arbol','arana'].map(word => `assets/audio/es-AR/${word}.mp3`));
  ASSETS.push('assets/audio/es-AR/letra-a.mp3');
  ASSETS.push(...['letra-b','barco','banana','ballena','bicicleta'].map(word => `assets/audio/es-AR/${word}.mp3`));
  ASSETS.push(...['letra-c','casa','cama','conejo','corazon'].map(word => `assets/audio/es-AR/${word}.mp3`));
  ASSETS.push('styles.css?v=30','app.js?v=30','letter-path.js?v=30');
  ASSETS.push('styles.css?v=29','app.js?v=29');
  ASSETS.push('styles.css?v=28','app.js?v=28','letter-path.js?v=28','assets/milo-pintar.webp','assets/milo-trazar.webp');
  ASSETS.push('audio.js?v=39','audio-catalog.js?v=43');
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
