// Service Worker for 我的逆袭计划表
const CACHE_NAME = 'study-plan-admin-nav-ui-20260513_01';
const OFFLINE_URL = '/study/';

// 安装时缓存核心资源
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/study/',
        '/study/icon-192.png',
        '/study/icon-512.png',
        '/manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// 网络优先策略：优先从网络获取，失败时用缓存
self.addEventListener('fetch', function(event) {
  // API 请求不缓存
  if (event.request.url.includes('/api/')) {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // 成功则更新缓存
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function() {
        // 网络失败时从缓存读取
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match(OFFLINE_URL);
        });
      })
  );
});
