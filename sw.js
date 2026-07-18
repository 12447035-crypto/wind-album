const CACHE_NAME = 'wind-album-v51';

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