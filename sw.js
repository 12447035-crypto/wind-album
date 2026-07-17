const CACHE_NAME = 'wind-album-v20';

// オフラインでも動くよう、キャッシュするファイル一覧
const ASSETS = [
  './',
  './index.html',
  './gallery.html',
  './css/style.css',
  './js/script.js',

  // 外部ライブラリ（CDN）
  'https://code.jquery.com/jquery-3.7.1.js',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',

  // 画像
  './img/wall.png',
  './img/biru.png',
  './img/そよ風.png','./img/初嵐.png','./img/北風.png','./img/向かい風.png',
  './img/夕風.png','./img/夜風.png','./img/寒風.png','./img/山風.png',
  './img/川風.png','./img/悲風.png','./img/春一番.png','./img/春風.png',
  './img/朝風.png','./img/木の芽風.png','./img/木枯らし.png','./img/海風.png',
  './img/涼風.png','./img/清風.png','./img/潮風.png','./img/熱風.png',
  './img/秋風.png','./img/花風.png','./img/若葉風.png','./img/追い風.png',
  './img/野風.png','./img/隙間風.png','./img/雨風.png','./img/青嵐.png',
  './img/黒南風.png',

  // 音声
  './snd/biru.mp3',
  './snd/そよ風.mp3','./snd/初嵐.mp3','./snd/北風.mp3','./snd/向かい風.mp3',
  './snd/夕風.mp3','./snd/夜風.mp3','./snd/寒風.mp3','./snd/山風.mp3',
  './snd/川風.mp3','./snd/悲風.mp3','./snd/春一番.mp3','./snd/春風.mp3',
  './snd/朝風.mp3','./snd/木の芽風.mp3','./snd/木枯らし.mp3','./snd/海風.mp3',
  './snd/涼風.mp3','./snd/清風.mp3','./snd/潮風.mp3','./snd/熱風.mp3',
  './snd/秋風.mp3','./snd/花風.mp3','./snd/若葉風.mp3','./snd/追い風.mp3',
  './snd/野風.mp3','./snd/隙間風.mp3','./snd/雨風.mp3','./snd/青嵐.mp3',
  './snd/黒南風.mp3'
];

// インストール時：全ファイルをキャッシュに保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 1つでも失敗すると全体が失敗するので、個別に握りつぶして続行
      return Promise.allSettled(
        ASSETS.map((url) => cache.add(url).catch((e) => console.warn('キャッシュ失敗:', url, e)))
      );
    })
  );
  self.skipWaiting();
});

// 有効化時：古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// リクエスト時：まずキャッシュ、なければネットワーク
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        // 新しく取得できたものはキャッシュに追加（フォントなど）
        return caches.open(CACHE_NAME).then((cache) => {
          try { cache.put(event.request, res.clone()); } catch(e){}
          return res;
        });
      }).catch(() => cached);
    })
  );
});