// Lets Money Calc open without a connection.
// - The app's own files: network first, so updates show up on the next open;
//   the saved copy is used when offline.
// - Fonts: saved copy first; they never change.
// - Exchange rates aren't touched here: the app keeps its own last rates.
const CACHE = 'moneycalc-v1';
const APP = [
  './',
  'manifest.webmanifest',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png',
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

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

  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // The page is saved as './' whatever it was opened as (/, /index.html, ?query).
  const key = req.mode === 'navigate' ? './' : req;
  e.respondWith(
    fetch(req).then(res => {
      // Safari refuses a saved page that came from a redirect, so keep those out.
      if (res.ok && !res.redirected) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(key, copy));
      }
      return res;
    }).catch(() => caches.match(key))
  );
});
