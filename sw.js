const CACHE_NAME = 'masterflexo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo-app.png'
];
// ... el resto del código del sw.js que ya tienes permanece igual


// Instalar el Service Worker y cachear archivos base
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar versiones antiguas de caché
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estrategia: Cargar desde caché, si no existe, ir a la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});

