// Lets Money Calc open instantly and without a connection.
// - The app's own files: the saved copy is shown straight away, and a fresh copy
//   is fetched in the background and saved, so updates show up on the next open.
//   Waiting for the network first made every open as slow as the connection.
// - Exchange rates aren't touched here: the app keeps its own last rates.
const CACHE = 'moneycalc-v2';
const APP = [
  './',
  'manifest.webmanifest',
  'inter-tight.woff2',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // The page is saved as './' whatever it was opened as (/, /index.html, ?query).
  const key = req.mode === 'navigate' ? './' : req;
  const fresh = fetch(req, { cache: 'no-cache' }).then(res => {
    // Safari refuses a saved page that came from a redirect, so keep those out.
    if (res.ok && !res.redirected) {
      const copy = res.clone();
      return caches.open(CACHE).then(c => c.put(key, copy)).then(() => res);
    }
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  e.respondWith(
    caches.match(key).then(hit => hit || fresh)
  );
});
