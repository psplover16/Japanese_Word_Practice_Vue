/* eslint-disable no-undef */
import { precacheAndRoute } from 'workbox-precaching';

// 🔥 Workbox 會在 build 時把檔案清單注入到這裡
precacheAndRoute(self.__WB_MANIFEST);

// 立即啟用新版
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim()
  );
});

// fetch fallback（離線）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
