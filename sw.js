var CACHE_NAME = 'prog-deportiva-v6';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(k) {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;

  // Si la petición va a Google Sheets o imágenes de GitHub, NO tocarla; va directo a la red
  if (url.includes('docs.google.com') || url.includes('raw.githubusercontent.com') || url.includes('google.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
