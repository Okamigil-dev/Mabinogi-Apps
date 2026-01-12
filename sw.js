const CACHE_NAME = 'mabi-tools-v7-force-net'; // Bump this one last time to apply the fix

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './nav.js',
  './tracker.html',
  './commerce.html',
  './barter.html',
  './wishlist.html',
  './calculators.html',
  './simulator.html',
  './settings.html', 
  './manifest.json',
  './images/icon-192.png',
  './images/icon-512.png'
];

// Install Event: FORCE NETWORK LOAD
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We cannot use cache.addAll() because it respects the browser's HTTP cache.
      // We must manually fetch with { cache: 'reload' } to ensure we get the server version.
      const stack = ASSETS_TO_CACHE.map(url => {
        const request = new Request(url, { cache: 'reload' });
        return fetch(request).then(response => {
           if (!response.ok) throw Error('File not found ' + url);
           return cache.put(url, response);
        });
      });
      return Promise.all(stack);
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Fetch Event: Stale-While-Revalidate
self.addEventListener('fetch', (e) => {
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(e.request);

      // We perform a background fetch to update the cache for NEXT time
      const networkFetch = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(e.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {});

      return cachedResponse || networkFetch;
    })
  );
});
