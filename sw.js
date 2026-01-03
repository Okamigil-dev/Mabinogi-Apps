const CACHE_NAME = 'mabi-tools-v3'; // Bump version (v4, v5...) to force updates

// List of all files to cache. If a file is missing here, it won't work offline.
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './tracker.html',
  './commerce.html',
  './barter.html',
  './wishlist.html',
  './calculators.html',
  './simulator.html',
  './settings.html', 
  './manifest.json'
  // Add specific image paths here if you want them offline (e.g., './images/icon-192.png')
];

// Install Event: Cache files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
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
});

// Fetch Event: Serve from Cache if available, otherwise Network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
