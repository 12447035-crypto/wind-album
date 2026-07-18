const CACHE_NAME = 'wind-album-v70';   // 数字は今までの続きに合わせて調整してください

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
  './img/wall.jpg',
  './img/biru.jpg',
  './img/そよ風.jpg','./img/初嵐.jpg','./img/北風.png','./img/向かい風.jpg',
  './img/夕風.jpg','./img/夜風.jpg','./img/寒風.jpg','./img/山風.jpg',
  './img/川風.jpg','./img/悲風.jpg','./img/春一番.jpg','./img/春風.jpg',
  './img/朝風.jpg','./img/木の芽風.jpg','./img/木枯らし.jpg','./img/海風.jpg',
  './img/涼風.jpg','./img/清風.jpg','./img/潮風.jpg','./img/熱風.jpg',
  './img/秋風.jpg','./img/花風.jpg','./img/若葉風.jpg','./img/追い風.jpg',
  './img/野風.jpg','./img/隙間風.png','./img/雨風.jpg','./img/青嵐.jpg',
  './img/黒南風.jpg',

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
    const req = event.request;
  
    // 音声ファイル（Rangeリクエスト対応が必要）
    if (req.destination === 'audio' || /\.mp3$/i.test(req.url)) {
      event.respondWith(handleAudioRequest(req));
      return;
    }
  
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            try { cache.put(req, res.clone()); } catch(e){}
            return res;
          });
        }).catch(() => cached);
      })
    );
  });
  
  // 音声ファイル専用：Rangeリクエストにキャッシュから正しく応答する
  async function handleAudioRequest(req){
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req.url, { ignoreSearch: true });
  
    if (!cached) {
      // キャッシュになければネットワークから取得を試みる
      try { return await fetch(req); }
      catch(e){ return new Response('', { status: 404 }); }
    }
  
    const rangeHeader = req.headers.get('range');
    const buffer = await cached.arrayBuffer();
    const total = buffer.byteLength;
  
    if (!rangeHeader) {
      // Rangeなしなら全体を返す
      return new Response(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': total,
          'Accept-Ranges': 'bytes'
        }
      });
    }
  
    // "bytes=開始-終了" を解析して、該当部分だけ切り出して返す
    const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
    const start = match ? parseInt(match[1], 10) : 0;
    const end = match && match[2] ? parseInt(match[2], 10) : total - 1;
    const chunk = buffer.slice(start, end + 1);
  
    return new Response(chunk, {
      status: 206,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': chunk.byteLength,
        'Accept-Ranges': 'bytes'
      }
    });
  }