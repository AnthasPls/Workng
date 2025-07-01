const CACHE_NAME = 'academia-os-cache-v1';
// A list of all the essential files your app needs to load.
const urlsToCache = [
  '/',
  '/index.html', // Or your specific HTML file name
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@700&display=swap',
  'https://unpkg.com/@phosphor-icons/web',
  'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js',
  // You would add all other CDN script URLs here
  'icon-192x192.png',
  'icon-512x512.png'
];

// When the app is first opened, save all the files to the cache.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// When the app requests a file, try to serve it from the cache first.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we have the file in the cache, serve it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the internet.
        return fetch(event.request);
      })
  );
});
