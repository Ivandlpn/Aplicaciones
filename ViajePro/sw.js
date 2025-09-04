const CACHE_NAME = 'inspeccion-via-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'img/icon-192x192.png',
  'img/icon-512x512.png'
];

// Evento de instalación: se abre el caché y se agregan los archivos principales.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento fetch: intercepta las peticiones de red.
// Estrategia "Cache First": primero busca en el caché, si no lo encuentra, va a la red.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la respuesta está en el caché, la devuelve.
        if (response) {
          return response;
        }
        // Si no, hace la petición a la red.
        return fetch(event.request);
      }
    )
  );
});