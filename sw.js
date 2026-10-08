var CACHE_NAME = 'prog-deportiva-v7';

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

  // No interceptar peticiones a Google Docs / Sheets ni librerías externas
  if (url.indexOf('google') !== -1 || url.indexOf('cloudflare') !== -1 || url.indexOf('githubusercontent') !== -1) {
    return;
  }

  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
