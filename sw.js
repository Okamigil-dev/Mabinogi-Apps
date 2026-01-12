const CACHE_NAME = 'mabi-tools-v6-swr'; // You can keep this static mostly now

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
  // Add other images here if you want them offline
];

// Install Event: Cache files immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Forces this SW to become active immediately
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
  self.clients.claim(); // Take control of all open clients immediately
});

// Fetch Event: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (e) => {
  // Only handle http/https requests (ignore chrome-extension:// etc)
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Try to find the response in the cache
      const cachedResponse = await cache.match(e.request);

      // 2. Define the network fetch (to update the cache)
      const networkFetch = fetch(e.request).then((networkResponse) => {
        // Clone the response because it can only be consumed once
        // Only cache valid responses (status 200, basic type)
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(e.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (Offline mode)
        // This catch block prevents the whole promise from rejecting if offline
      });

      // 3. Return cached response immediately if available (Fast/Offline)
      //    Otherwise wait for network (First load/uncached resource)
      return cachedResponse || networkFetch;
    })
  );
});
