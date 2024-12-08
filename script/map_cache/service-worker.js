const CACHE_NAME = 'map-cache-v1';
const CACHE_MAP_TILES = 'map-tiles';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/map_cache/',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        if (
          !event.request.url.includes('/map_cache/') &&
          event.request.url.includes('/tiles/')
        ) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      });
    })
  );
});
