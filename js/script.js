// トップページ（ロゴ・背景・波）は廃止。選ぶ画面から開始。


// ===== 各風のパラメータ（全30風） =====
// mp3を入れた風には audio:'snd/風名.mp3' を付けています（未設定の風は音なし）
const WIND_PARAMS = {
  '北風':     {h:212, sat:40, strength:.75, curl:.2,  dot:.4,  uneri:.5,  pitch:.3,  dur:198, desc:'北方から吹いてくる冷たい風。', audio:'snd/北風.mp3'},
  '山風':     {h:135, sat:48, strength:.5,  curl:.45, dot:.55, uneri:.55, pitch:.55, dur:241, desc:'山に吹く風。山から吹いてくる風。'},
  '海風':     {h:198, sat:60, strength:.45, curl:.6,  dot:.55, uneri:.9,  pitch:.85, dur:229, desc:'海の風。海上を吹く風。'},
  '川風':     {h:190, sat:54, strength:.35, curl:.65, dot:.45, uneri:.5,  pitch:.6,  dur:203, desc:'川の上を吹き渡る風。川から吹いてくる風。'},
  '潮風':     {h:186, sat:64, strength:.5,  curl:.75, dot:.6,  uneri:.8,  pitch:.5,  dur:215, desc:'海から吹く塩けを含んだ風。'},
  '向かい風': {h:230, sat:44, strength:.68, curl:.25, dot:.45, uneri:.65, pitch:.35, dur:258, desc:'進んでいく方向から吹いてくる風。'},
  '追い風':   {h:155, sat:52, strength:.6,  curl:.3,  dot:.5,  uneri:.6,  pitch:.7,  dur:175, desc:'後ろから吹いてくる風。'},
  '熱風':     {h:18,  sat:82, strength:.85, curl:.5,  dot:.7,  uneri:.7,  pitch:.4,  dur:196, desc:'熱気をもった風。'},
  '野風':     {h:95,  sat:65, strength:.4,  curl:.45, dot:.5,  uneri:.5,  pitch:.6,  dur:211, desc:'野原を吹く風。'},
  '清風':     {h:200, sat:40, strength:.25, curl:.4,  dot:.4,  uneri:.35, pitch:.7,  dur:192, desc:'さわやかな風。すがすがしい風。', audio:'snd/清風.mp3'},
  'そよ風':   {h:150, sat:35, strength:.12, curl:.5,  dot:.45, uneri:.2,  pitch:.9,  dur:187, desc:'そよそよと吹く風。', audio:'snd/そよ風.mp3'},
  'ビル風':   {h:235, sat:30, strength:.95, curl:.15, dot:.35, uneri:.6,  pitch:.2,  dur:178, desc:'高層ビルの周辺に生じる局部的な強風や乱流。', audio:'snd/biru.mp3'},
  '雨風':     {h:208, sat:55, strength:.6,  curl:.35, dot:.5,  uneri:.55, pitch:.35, dur:189, desc:'雨まじりの風。'},
  '朝風':     {h:45,  sat:55, strength:.3,  curl:.45, dot:.5,  uneri:.4,  pitch:.65, dur:222, desc:'朝吹く風。'},
  '夕風':     {h:24,  sat:70, strength:.35, curl:.5,  dot:.55, uneri:.45, pitch:.65, dur:234, desc:'夕方に吹く風。'},
  '夜風':     {h:250, sat:55, strength:.25, curl:.55, dot:.5,  uneri:.4,  pitch:.7,  dur:267, desc:'夜に吹く風。'},
  '春風':     {h:330, sat:48, strength:.25, curl:.5,  dot:.5,  uneri:.4,  pitch:.6,  dur:211, desc:'春の風。春の穏やかな風。'},
  '花風':     {h:340, sat:58, strength:.3,  curl:.55, dot:.6,  uneri:.45, pitch:.6,  dur:193, desc:'桜の花が盛りのころに吹く風。'},
  '春一番':   {h:50,  sat:78, strength:.8,  curl:.35, dot:.5,  uneri:.95, pitch:.4,  dur:217, desc:'立春のころ、その年に初めて吹く強い南風。'},
  '木の芽風': {h:80,  sat:55, strength:.3,  curl:.5,  dot:.5,  uneri:.4,  pitch:.6,  dur:223, desc:'木の芽どきに吹く風。'},
  '青嵐':     {h:148, sat:72, strength:.78, curl:.4,  dot:.55, uneri:.8,  pitch:.45, dur:195, desc:'初夏の青葉の頃に吹く、やや強い風。', audio:'snd/青嵐.mp3'},
  '若葉風':   {h:105, sat:62, strength:.35, curl:.45, dot:.5,  uneri:.45, pitch:.6,  dur:189, desc:'若葉に吹く風。', audio:'snd/若葉風.mp3'},
  '黒南風':   {h:218, sat:35, strength:.6,  curl:.35, dot:.45, uneri:.55, pitch:.4,  dur:206, desc:'梅雨の初めに吹く南風。'},
  '涼風':     {h:182, sat:55, strength:.3,  curl:.45, dot:.45, uneri:.4,  pitch:.7,  dur:198, desc:'涼しい風。夏の終わりに吹く爽やかな風。'},
  '初嵐':     {h:32,  sat:68, strength:.85, curl:.4,  dot:.5,  uneri:.85, pitch:.35, dur:201, desc:'秋の初めに吹く強い風。'},
  '秋風':     {h:35,  sat:62, strength:.4,  curl:.4,  dot:.5,  uneri:.5,  pitch:.55, dur:213, desc:'秋に吹く風。秋になって吹いてくる涼しい風。'},
  '悲風':     {h:262, sat:50, strength:.4,  curl:.5,  dot:.5,  uneri:.45, pitch:.6,  dur:228, desc:'寂しく悲しそうに吹く風。'},
  '寒風':     {h:215, sat:38, strength:.78, curl:.22, dot:.4,  uneri:.5,  pitch:.3,  dur:205, desc:'冬の寒い風。', audio:'snd/寒風.mp3'},
  '木枯らし': {h:206, sat:40, strength:.9,  curl:.2,  dot:.4,  uneri:.75, pitch:.25, dur:196, desc:'秋の末から冬の初めにかけて吹く強く冷たい風。'},
  '隙間風':   {h:225, sat:28, strength:.55, curl:.18, dot:.35, uneri:.45, pitch:.25, dur:184, desc:'壁や障子などのすきまから吹き込む風。'},
};
const DEFAULT_PARAM = {h:200, sat:45, strength:.4, curl:.45, dot:.5, uneri:.5, pitch:.55, dur:200, desc:''};

// snd フォルダに全30風のmp3が揃ったので、audio未設定の風にも自動でパスを補完
// （ファイル名は「風名.mp3」で統一）
Object.keys(WIND_PARAMS).forEach(name => {
  if (!WIND_PARAMS[name].audio) {
    WIND_PARAMS[name].audio = 'snd/' + name + '.mp3';
  }
});

function getParam(name){ return WIND_PARAMS[name] || DEFAULT_PARAM; }


// ===== 3Dカバーフロー + 選択フロー =====
(function(){
  const scene = document.getElementById('cf-scene');
  const stage = document.getElementById('cf-stage');
  const label = document.getElementById('cf-label');
  const cards = Array.from(stage.querySelectorAll('img'));

  // カードの横の間隔（layout()のxと、タップ判定のcardXで共通に使う）
  const CARD_GAP = 122;

  let current = 0, target = 0, wheelLock = false;
  const MAX = 5; let picked = [];

  const nameEl    = document.getElementById('cf-detail-name');
  const descEl    = document.getElementById('cf-detail-desc');
  const playBtn   = document.getElementById('cf-play');
  const progFill  = document.getElementById('cf-progress-fill');
  const progKnob  = document.getElementById('cf-progress-knob');
  const btnAdd    = document.getElementById('cf-add');
  const slotsEl   = document.getElementById('cf-slots');
  const confirmBtn= document.getElementById('cf-confirm');

  // 試聴用の音声
  const cfAudio = document.getElementById('cf-audio');
  let previewing = false;
  let shownIndex = -1;   // いま下部パネルに表示している風のindex

  cards.forEach((c, i) => { c.dataset.index = i; });

  // タップ／クリックはステージ全体で受け取り、押した位置に最も近いカードを選ぶ。
  // （カード同士が重なって、奥のカード＝端の薄いカードがタップを受け取れない問題を回避）
  scene.addEventListener('click', e => {
    const rect = scene.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;   // ステージ中心からの横位置

    // 表示中の各カードの「中心からの横位置」を計算し、押した位置に一番近いものを探す
    let best = -1, bestDist = Infinity;
    cards.forEach((c, i) => {
      const offset = i - current, abs = Math.abs(offset);
      if (abs > 4) return;                 // 非表示のカードは対象外
      const cardX = offset * CARD_GAP;     // layout() の x と同じ式
      const d = Math.abs(px - cardX);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best < 0) return;

    // 正面に来ていて、かつ動きが落ち着いている時だけ再生トグル。
    // それ以外（横のカード・移動中）は、まず正面へ寄せるだけ。
    const settled = (best === Math.round(current)) && (Math.abs(current - best) < 0.08);
    if (settled) {
      previewing ? stopPreview() : startPreview();
    } else {
      target = best;
    }
  });

  function layout(){
    const diff = target - current;
    // 指数補間（今までと同じ速さ感）に、終端だけ一定の最小速度を加えて
    // スナップによる段差をなくす。Safariで最後にカクッとなるのを防ぐ。
    if (Math.abs(diff) < 0.0001) {
      current = target;
    } else {
      const ease = diff * 0.16;
      const minStep = 0.0015 * Math.sign(diff);   // 終端で間引かれないための最小移動量
      current += (Math.abs(ease) > Math.abs(minStep)) ? ease : minStep;
      // 行き過ぎ防止
      if ((diff > 0 && current > target) || (diff < 0 && current < target)) current = target;
    }
    cards.forEach((c, i) => {
      const offset = i - current, abs = Math.abs(offset);
      if (abs > 4) { c.style.display = 'none'; return; }
      c.style.display = '';
      const x = offset * CARD_GAP, z = -abs * 90;
      // offsetに応じて角度を連続変化させる（±26度でクランプ）。
      // 正面に寄るほど0度に近づくので、斜め→正面がなめらかになる。
      const rotY = Math.max(-26, Math.min(26, -offset * 26));
      const scale = Math.max(0.55, 1 - abs * 0.11);
      const opacity = Math.max(0.12, 1 - abs * 0.28);
      c.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${rotY}deg) scale(${scale})`;
      c.style.opacity = opacity;
      c.style.zIndex = 1000 - Math.round(abs * 10);
    });
    const idx = Math.round(current);
    cards.forEach((c, i) => c.classList.toggle('is-center', i === idx));
    if (idx >= 0 && idx < cards.length) {
      label.innerHTML = cards[idx].dataset.name + '<br><span>' + (idx+1) + ' / ' + cards.length + '</span>';
      if (idx !== shownIndex) { showDetail(cards[idx]); }
    }
    requestAnimationFrame(layout);
  }

  scene.addEventListener('wheel', e => {
    if (wheelLock) return;
    // 左右スクロールのみでCDを切替。上下スクロールはページに通す
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    target += e.deltaX > 0 ? 1 : -1;
    target = Math.max(0, Math.min(cards.length - 1, target));
    wheelLock = true; setTimeout(() => { wheelLock = false; }, 120);
  }, { passive:false });

  // ---- タッチ操作（タブレット/スマホ）：横スワイプでCDを切替 ----
  // 横方向の指の動きが縦より大きいときだけ送る。縦スワイプはページスクロールに通す。
  let tStartX = 0, tStartY = 0, tLastX = 0, tHorizontal = null, tBaseTarget = 0;
  const SWIPE_STEP = 45;   // 何px動かすごとに1枚送るか（小さいほど敏感）

  scene.addEventListener('touchstart', e => {
    const t = e.touches[0];
    tStartX = tLastX = t.clientX;
    tStartY = t.clientY;
    tHorizontal = null;          // まだ縦横どちらの動きか未確定
    tBaseTarget = Math.round(target);
  }, { passive: true });

  scene.addEventListener('touchmove', e => {
    const t = e.touches[0];
    const dx = t.clientX - tStartX;
    const dy = t.clientY - tStartY;

    // 最初に動いた方向で「横スワイプか縦スクロールか」を判定
    if (tHorizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;  // 小さすぎる動きは保留
      tHorizontal = Math.abs(dx) > Math.abs(dy);
    }
    // 縦スクロールならページに任せる（何もしない）
    if (!tHorizontal) return;

    // 横スワイプ：ページが動かないようにしてCDを送る
    e.preventDefault();
    // スワイプ量に応じて、開始時の位置から何枚ぶん動いたか
    const steps = Math.round(-dx / SWIPE_STEP);   // 左へスワイプ→次のCDへ
    target = Math.max(0, Math.min(cards.length - 1, tBaseTarget + steps));
    tLastX = t.clientX;
  }, { passive: false });

  // ---- 端ホバーで自動スクロール（左右の端のカードに触れるとその方向へ流れる）----
  let edgeDir = 0;        // -1:左へ 0:止 1:右へ
  let edgeTimer = null;
  const EDGE_RATIO = 0.07;   // 左右それぞれ端から何割をスクロールゾーンにするか（小さいほど内側）
  const EDGE_INTERVAL = 550; // 1枚送る間隔(ms)。小さいほど速い

  scene.addEventListener('mousemove', e => {
    const rect = scene.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0(左端)〜1(右端)
    let dir = 0;
    if (x < EDGE_RATIO)        dir = -1;   // 左端ゾーン
    else if (x > 1 - EDGE_RATIO) dir = 1;  // 右端ゾーン
    setEdgeDir(dir);
  });
  scene.addEventListener('mouseleave', () => setEdgeDir(0));

  function setEdgeDir(dir){
    if (dir === edgeDir) return;
    edgeDir = dir;
    if (edgeTimer) { clearInterval(edgeTimer); edgeTimer = null; }
    if (edgeDir !== 0) {
      stepEdge();                                  // すぐ1枚送る
      edgeTimer = setInterval(stepEdge, EDGE_INTERVAL);
    }
  }
  function stepEdge(){
    target += edgeDir;
    target = Math.max(0, Math.min(cards.length - 1, target));
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') target = Math.min(cards.length - 1, target + 1);
    if (e.key === 'ArrowLeft')  target = Math.max(0, target - 1);
  });

  // 中央の風が変わるたびに、下部パネル（名前・説明・試聴・addボタン）を更新
  function showDetail(card){
    shownIndex = parseInt(card.dataset.index, 10);
    const name = card.dataset.name; const param = getParam(name);
    nameEl.textContent = name + '。';
    descEl.textContent = param.desc || '';
    updateAddBtn(shownIndex);
    stopPreview();
    setProgress(0);
  }

  function updateAddBtn(idx){
    const pos = picked.indexOf(idx);
    if (pos >= 0) { btnAdd.classList.add('added'); btnAdd.textContent = '✓ ' + (pos+1); }
    else { btnAdd.classList.remove('added'); btnAdd.textContent = picked.length >= MAX ? 'full' : 'add'; }
    btnAdd.disabled = (pos < 0 && picked.length >= MAX);
  }

  btnAdd.addEventListener('click', e => {
    e.stopPropagation();
    if (shownIndex < 0) return;
    const idx = shownIndex;
    const pos = picked.indexOf(idx);
    if (pos >= 0) { picked.splice(pos, 1); }
    else if (picked.length < MAX) { picked.push(idx); }
    updateAddBtn(idx); renderSlots();
  });

  // ---- 試聴（本物の音声）----
  playBtn.addEventListener('click', e => { e.stopPropagation(); previewing ? stopPreview() : startPreview(); });

  function startPreview(){
    if (shownIndex < 0) return;
    const name = cards[shownIndex].dataset.name;
    const src = getParam(name).audio || '';
    if (!src) { return; }              // mp3がない風は何もしない
    cfAudio.src = src;
    cfAudio.currentTime = 0;
    cfAudio.play();
    previewing = true;
    playBtn.classList.add('playing');
  }
  function stopPreview(){
    previewing = false;
    playBtn.classList.remove('playing');
    cfAudio.pause();
  }
  function setProgress(t){ progFill.style.width = (t*100) + '%'; progKnob.style.left = (t*100) + '%'; }

  // 再生位置に合わせてバーを動かす（曲の長さに自動で合う）
  cfAudio.addEventListener('timeupdate', () => {
    if (cfAudio.duration) setProgress(cfAudio.currentTime / cfAudio.duration);
  });
  cfAudio.addEventListener('ended', () => { stopPreview(); setProgress(0); });

  function renderSlots(){
    slotsEl.innerHTML = '';
    for (let i = 0; i < MAX; i++){
      const div = document.createElement('div'); div.className = 'slot';
      const ci = picked[i];
      if (ci !== undefined){
        const card = cards[ci]; div.classList.add('filled');
        div.innerHTML =
          '<span class="num">'+(i+1)+'</span>' +
          '<div class="thumb"><img src="'+card.getAttribute('src')+'" alt=""></div>' +
          '<span class="rm" data-slot="'+i+'">×</span>' +
          '<span class="nm">'+card.dataset.name+'</span>';
        div.querySelector('.rm').addEventListener('click', ev => {
          ev.stopPropagation();
          picked.splice(i, 1);
          renderSlots();
          if (shownIndex >= 0) updateAddBtn(shownIndex);
        });
        // スロットをクリックしたらその風を中央に表示
        div.querySelector('.thumb').addEventListener('click', ev => {
          ev.stopPropagation();
          target = ci;
        });
      } else { div.innerHTML = '<span class="num">'+(i+1)+'</span>'; }
      slotsEl.appendChild(div);
    }
    const justCompleted = (picked.length === MAX) && !confirmBtn.classList.contains('show');
    confirmBtn.classList.toggle('show', picked.length === MAX);
    // 5つ揃った瞬間だけ、完成ボタンへ自動スクロール
    if (justCompleted) {
      setTimeout(() => {
        confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  confirmBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (picked.length !== MAX) return;
    stopPreview();
    const tracks = picked.map(i => ({
      name: cards[i].dataset.name,
      src:  cards[i].getAttribute('src'),
      param: getParam(cards[i].dataset.name),
      dur:  getParam(cards[i].dataset.name).dur,
      desc: getParam(cards[i].dataset.name).desc,
      audio: getParam(cards[i].dataset.name).audio || ''
    }));
    startAlbum(tracks);
  });

  layout();
  renderSlots();
  // 初期表示：中央の風をパネルに反映
  if (cards.length) showDetail(cards[0]);
})();


// ===== ロード → 完成画面 =====
function startAlbum(tracks){
  const loading = document.getElementById('album-loading');
  const wall = document.getElementById('wall');
  loading.classList.add('show');
  wall.style.visibility = 'hidden';   // 選択画面を隠す（ちらつき防止）
  setTimeout(() => {
    loading.classList.remove('show');
    window.openAlbum(tracks);
  }, 2500);
}


// ===== 完成画面（CDプレイヤー筐体・プレイヤー・QR・音量ダイヤル）=====
(function(){
  const screen   = document.getElementById('album-screen');
  const titleIn  = document.getElementById('as-title');
  const tlEl     = document.getElementById('as-tracklist');

  const swatch = document.getElementById('as-swatch');
  const nameEl = document.getElementById('as-name');
  const numEl  = document.getElementById('as-num');
  const descEl = document.getElementById('as-desc');
  const fillEl = document.getElementById('as-fill');
  const knobEl = document.getElementById('as-knob');
  const timeEl = document.getElementById('as-time');
  const playEl = document.getElementById('as-play');
  const prevEl = document.getElementById('as-prev');
  const nextEl = document.getElementById('as-next');

  const screenPrev = document.getElementById('as-screen-prev');
  const screenNext = document.getElementById('as-screen-next');
  const qrOverlay= document.getElementById('as-qr-overlay');
  const qrEl     = document.getElementById('as-qr');

  // 完成画面の再生用の音声
  const asAudio = document.getElementById('as-audio');

  // ---- Web Audio（音量調整用）----
  // iPad/iOSのSafariは audio.volume への代入を無視するため、
  // GainNode を間に挟んで音量（ゲイン）を変える。これならiPadでも効く。
  let audioCtx = null, gainNode = null, srcNode = null;
  let curVol = 0.6;   // 現在の音量(0〜1)。ダイヤルと共有する
  function setupAudioGraph(){
    if (audioCtx) return;   // 一度だけ作る
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;        // 非対応ブラウザは従来の volume にフォールバック
    audioCtx = new AC();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = curVol;
    // audio要素 → gain → スピーカー の順につなぐ
    srcNode = audioCtx.createMediaElementSource(asAudio);
    srcNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  }
  // 音量を反映（GainNodeがあればそれを、無ければ従来のvolumeを使う）
  function applyVolume(v){
    curVol = Math.max(0, Math.min(1, v));
    if (gainNode) gainNode.gain.value = curVol;
    else asAudio.volume = curVol;
  }
  // iOSはユーザー操作をきっかけにしないとAudioContextが動かない(suspended)。
  // 再生開始時に呼んで起こす。
  function ensureAudioRunning(){
    setupAudioGraph();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }

  let tracks = [], cur = 0, prog = 0, playing = false, timer = null, seed = 0;
  function rng(s){let x=s^0xdeadbeef;return()=>{x=Math.imul(x^(x>>>16),0x45d9f3b);x=Math.imul(x^(x>>>16),0x45d9f3b);x^=x>>>16;return(x>>>0)/4294967295};}

  let cdP = null, P = null, phaseT = 0, htCenters = [], htPhaseBase = 0, SZ = 480, ready = false, running = false, discAngle = 0;
  let discSpeed = 0.2, targetSpeed = 0.2;
  // リボン用：再生中の曲に合わせて 速さ(ribbonSpeed) と 大きさ(ribbonScale) を
  // 現在値→目標値へなめらかに追従させる（曲が変わるとカクッとならないように）
  let ribbonSpeed = 0.02, targetRibbonSpeed = 0.02;
  let ribbonScale = 1.0,  targetRibbonScale = 1.0;

  function deriveParams(){
    const ws = tracks.map(t => t.param);
    let noiseScale = 0, dotSize = 0, strength = 0, curl = 0;
    ws.forEach((w, i) => { const wt = (5 - i) / 5;
      noiseScale += (0.004 + w.curl * 0.006) * wt; dotSize += w.dot * wt; strength += w.strength * wt; curl += w.curl * wt; });
    const sum = ws.reduce((s, _, i) => s + (5 - i) / 5, 0);
    return { noiseScale: noiseScale/sum, dotSize: dotSize/sum, strength: strength/sum, curl: curl/sum,
      baseHue: ws[0].h, subHue: ws[1].h,
      ribbonWind: ws.reduce((a,b)=>b.sat>a.sat?b:a, ws[0]), pearlWind: ws[2], ws };
  }
  const seedBase = () => tracks.reduce((s, t, i) => s + t.name.length * (i + 1) * 131, 7);

  const cdSketch = (p) => {
    cdP = p;
    p.setup = () => {
      const host = document.getElementById('as-disc-canvas');
      SZ = host.clientWidth || 480;
      p.pixelDensity(1);                 // Retinaの高解像度描画をやめて軽量化
      const c = p.createCanvas(SZ, SZ); c.parent(host);
      p.colorMode(p.HSL, 360, 100, 100, 1); p.clear();
    };
    p.windowResized = () => {
      const host = document.getElementById('as-disc-canvas');
      const ns = host.clientWidth;
      if (ns && Math.abs(ns - SZ) > 4) { SZ = ns; p.resizeCanvas(SZ, SZ); }
    };
    p.draw = () => {
      if (!ready) { p.clear(); return; }
      if (running) {
        // リボンの速さ・大きさを目標値へなめらかに寄せる（曲切替時の移行をなだらかに）
        ribbonSpeed += (targetRibbonSpeed - ribbonSpeed) * 0.04;
        ribbonScale += (targetRibbonScale - ribbonScale) * 0.04;
        phaseT += ribbonSpeed;
        discSpeed += (targetSpeed - discSpeed) * 0.03;
        discAngle = (discAngle + discSpeed) % 360;
        const wrap = document.getElementById('as-disc-rot');
        if (wrap) wrap.style.transform = 'rotate(' + discAngle + 'deg)';
        if (titleIn) {
          const wrapEl = document.getElementById('as-disc-wrap');
          const cy = wrapEl.clientHeight / 2;
          const ty = wrapEl.clientHeight * 0.26;
          titleIn.style.transformOrigin = 'center ' + (cy - ty) + 'px';
          titleIn.style.transform = 'translateX(-50%) rotate(' + discAngle + 'deg)';
        }
      }
      drawGradient(); drawBlobField(); drawHalftoneField(); drawRibbonCluster(); drawGrain();
      const ctx = p.drawingContext; ctx.globalCompositeOperation = 'overlay';
      const cx = SZ/2, cy = SZ/2;
      for (let ri = 1; ri < 10; ri++){ p.noFill(); p.stroke(0,0,100,0.05); p.strokeWeight(1); p.circle(cx,cy,SZ*(ri/10)); }
      ctx.globalCompositeOperation = 'source-over';
    };
    function drawGradient(){ p.noStroke(); for(let y=0;y<SZ;y++){ const t=y/SZ; const h=p.lerp(P.baseHue,P.subHue,t); p.fill(h,p.lerp(16,20,t),p.lerp(94,89,t)); p.rect(0,y,SZ,1);} }
    function drawBlobField(){ p.randomSeed(seedBase()+5); const ctx=p.drawingContext; ctx.save(); ctx.filter='blur('+Math.round(SZ*0.18)+'px)'; ctx.globalCompositeOperation='multiply';
      const cols=[[P.baseHue,18,90],[P.subHue,18,89],[P.pearlWind.h,18,90]];
      cols.forEach(c=>blob(p.random(SZ*0.2,SZ*0.8),p.random(SZ*0.15,SZ*0.55),SZ*1.5,c[0],c[1],c[2])); ctx.restore(); }
    function blob(cx,cy,r,hue,sat,lum){ for(let i=0;i<12;i++)softBlob(cx+p.random(-150,150),cy+p.random(-150,150),p.random(r*0.5,r),hue+p.random(-8,8),sat,lum,0.11); }
    function softBlob(x,y,r,h,s,l,a){ const ctx=p.drawingContext; h=((h%360)+360)%360; const g=ctx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,`hsla(${h|0},${s|0}%,${l|0}%,${a})`); g.addColorStop(0.45,`hsla(${h|0},${s|0}%,${l|0}%,${a*0.4})`); g.addColorStop(1,`hsla(${h|0},${s|0}%,${l|0}%,0)`); ctx.fillStyle=g; ctx.fillRect(x-r,y-r,r*2,r*2); }
    function drawHalftoneField(){
      const h=P.pearlWind.h,fillS=30,fillL=82,edgeS=42,edgeL=72;
      const spacing=Math.max(12,SZ/34),ns=P.noiseScale,maxR=spacing*0.46*(0.7+P.dotSize*0.5);
      const ph=htPhaseBase+phaseT*1.6;
      for(let y=spacing/2;y<SZ;y+=spacing)for(let x=spacing/2;x<SZ;x+=spacing){
        let field=0; htCenters.forEach(c=>{field+=p.sin(p.dist(x,y,c.x,c.y)*c.f+ph)*0.6;});
        field+=p.sin(x*0.02+y*0.012+phaseT*1.8)*0.5;
        field+=(p.noise(x*ns,y*ns,phaseT*0.35)-0.5)*2.4;
        const t=p.constrain(p.map(field,-1.8,1.8,0,1),0,1),r=t*maxR;
        if(r>0.5){ p.fill(h,fillS,fillL,0.85); p.stroke(h,edgeS,edgeL,0.85); p.strokeWeight(0.7); p.circle(x,y,r*2);}
      }
    }
    function drawRibbonCluster(){
      const rw=P.ribbonWind,hue=rw.h,sat=Math.min(95,rw.sat+25),lum=55;
      const baseCenterY=SZ*0.5,ribbons=3,assign=[P.ws[2],P.ws[3],P.ws[1]];
      for(let rb=0;rb<ribbons;rb++){
        const w=assign[rb%assign.length];
        // 波の大きさ(amp)に ribbonScale を掛けて、再生中の曲のうねりを反映
        const amp=SZ*(0.05+w.uneri*0.20)*ribbonScale,freq=0.5+(1-w.pitch)*1.6,twist=0.6+w.curl*1.4;
        const phase=rb*1.3+phaseT*1.2,cYoff=(rb-1)*SZ*0.05,copies=24,ribbonHeight=SZ*(0.05+w.uneri*0.22),baseA=0.6-rb*0.08;
        for(let i=0;i<copies;i++){
          const offsetY=p.map(i,0,copies-1,-ribbonHeight,ribbonHeight);
          p.noFill(); p.stroke(hue,sat,lum,baseA*(0.5+0.5*(1-Math.abs(i-copies/2)/(copies/2)))); p.strokeWeight(0.6);
          p.beginShape();
          for(let x=-100;x<=SZ+100;x+=6){ const t=x*0.01;
            const wave=p.sin(t*0.8*freq+phase)*amp+p.sin(t*2.1*freq+1.2+phase)*amp*0.28+p.sin(t*0.32*freq+phase*0.5)*amp*0.8;
            const compression=p.pow(p.abs(p.sin(t*0.4*freq+phase)),twist);
            const y=baseCenterY+cYoff+wave+offsetY*compression; p.curveVertex(x,y);}
          p.endShape();
        }
      }
    }
    function drawGrain(){ p.noStroke(); p.randomSeed(running?Math.floor(phaseT*4):777); for(let i=0;i<1200;i++){ if(p.random()<0.5)p.fill(255,p.random(0.01,0.03)); else p.fill(0,p.random(0.003,0.015)); p.circle(p.random(SZ),p.random(SZ),p.random(0.5,1.1)); } }
  };
  new p5(cdSketch);

  function buildVisual(){
    ready = true;
    P = deriveParams();
    const sd = seedBase();
    cdP.randomSeed(sd); cdP.noiseSeed(sd);
    htCenters = [];
    const nc = 2 + Math.floor(cdP.random() * 2);
    for (let i = 0; i < nc; i++) htCenters.push({ x: cdP.random(SZ), y: cdP.random(SZ), f: 0.02 + cdP.random() * 0.04 });
    htPhaseBase = cdP.random(1000);
    setTimeout(()=>cdP.windowResized&&cdP.windowResized(), 60);
  }

  function fmtTime(sec){
    const mm = Math.floor(sec/60), ss = String(Math.floor(sec%60)).padStart(2,'0');
    return mm + ':' + ss;
  }

  function buildTracklist(){
    tlEl.innerHTML = '';
    tracks.forEach((t, n) => {
      const row = document.createElement('div');
      row.className = 'as-track';
      row.innerHTML =
        '<span class="t-num">'+(n+1)+'</span>' +
        '<div class="t-thumb"><img src="'+t.src+'" alt=""></div>' +
        '<span class="t-name">'+t.name+'</span>' +
        '<span class="t-dur">'+(t.realDur ? fmtTime(t.realDur) : '--:--')+'</span>';
      row.addEventListener('click', () => selectTrack(n));
      tlEl.appendChild(row);

      // 実際のmp3の長さを読み込んで秒数を差し替える
      if (t.audio && !t.realDur) {
        const probe = new Audio();
        probe.preload = 'metadata';
        probe.src = t.audio;
        probe.addEventListener('loadedmetadata', () => {
          if (isFinite(probe.duration) && probe.duration > 0) {
            t.realDur = probe.duration;
            const durEl = tlEl.querySelectorAll('.as-track .t-dur')[n];
            if (durEl) durEl.textContent = fmtTime(t.realDur);
            if (n === cur) updatePlayer();   // 再生中の表示も更新
          }
        });
      }
    });
  }
  function highlight(){
    tlEl.querySelectorAll('.as-track').forEach((row,n)=>row.classList.toggle('playing', n===cur));
  }
  function selectTrack(n){ stopPlay(); cur=n; prog=0; loadTrack(); updatePlayer(); highlight(); startPlay(); }

  window.openAlbum = function(selectedTracks){
    tracks = selectedTracks;
    seed = Math.floor(Math.random()*999999);
    // タイトルは未入力スタート（「title」が点滅し、入力すると枠と点滅が消える）
    titleIn.value = '';

    buildVisual();
    buildTracklist();
    cur = 0; prog = 0; playing = false; running = false;
    loadTrack();
    updatePlayer(); highlight();
    updateTitleEditable();
    reflectTitleState();
    generateQR();

    screen.classList.add('show');
    history.pushState({ album: true }, '');   // 戻る用の履歴を積む
  };

  function closeAlbum(){
    stopPlay();
    qrOverlay.classList.remove('show');
    screen.classList.remove('show');
    document.getElementById('wall').style.visibility = 'visible';   // 選択画面を戻す
  }

  // ブラウザの戻るボタンで完成画面を閉じる
  window.addEventListener('popstate', () => {
    if (screen.classList.contains('show')) { closeAlbum(); }
  });

  // 今の曲の音声を読み込む（mp3があるときだけ）
  function loadTrack(){
    const t = tracks[cur];
    if (t && t.audio) { asAudio.src = t.audio; asAudio.currentTime = 0; }
    else { asAudio.removeAttribute('src'); asAudio.load(); }
  }

  function updatePlayer(){
    const t = tracks[cur];
    swatch.innerHTML = '<img src="'+t.src+'" alt="">';
    nameEl.textContent = t.name;
    numEl.textContent = 'トラック ' + (cur+1) + ' / ' + tracks.length;
    descEl.textContent = t.desc || '';

    // 実時間優先：再生中の音声→事前計測→最後の手段で擬似dur
    const total = (asAudio.duration && isFinite(asAudio.duration)) ? asAudio.duration
                : (t.realDur || t.dur);
    const cur_s = prog * total;
    fillEl.style.width = (prog*100).toFixed(1) + '%';
    knobEl.style.left = (prog*100).toFixed(1) + '%';
    const mm=Math.floor(total/60), ss=String(Math.floor(total%60)).padStart(2,'0');
    const cm=Math.floor(cur_s/60), cs=String(Math.floor(cur_s%60)).padStart(2,'0');
    timeEl.textContent = cm+':'+cs+' / '+mm+':'+ss;

    // CDの回転速度（既存）：風の強さで決める
    targetSpeed = 0.5 + (t.param.strength || 0.4) * 2.0;
    // リボンの速さ：風の強さで決める（強い風ほど速く流れる）
    targetRibbonSpeed = 0.012 + (t.param.strength || 0.4) * 0.045;
    // リボンの大きさ：うねりで決める（うねりが大きいほど波も大きい）
    targetRibbonScale = 0.6 + (t.param.uneri || 0.5) * 1.1;
  }

  function updateTitleEditable(){
    // 再生中は編集不可、停止中は編集可（クリックできる）
    if (playing) {
      titleIn.classList.remove('editable');
      titleIn.readOnly = true;
      titleIn.blur();
    } else {
      titleIn.classList.add('editable');
      titleIn.readOnly = false;
    }
  }

  function startPlay(){
    playing = true; running = true; playEl.classList.add('playing'); updateTitleEditable();
    const t = tracks[cur];
    if (t && t.audio) {
      // 本物の音声
      ensureAudioRunning();   // iOS対策：再生のタイミングでAudioContextを起こす
      if (!asAudio.src || asAudio.src === location.href) loadTrack();
      asAudio.play();
    } else {
      // mp3がない曲は擬似タイマー
      tick();
    }
  }
  function stopPlay(){
    playing = false; running = false; clearTimeout(timer);
    playEl.classList.remove('playing'); updateTitleEditable();
    asAudio.pause();
    if (titleIn) titleIn.style.transform = 'translateX(-50%) rotate(0deg)';
  }

  // mp3がない曲用の擬似タイマー
  function tick(){
    if(!playing) return;
    const t=tracks[cur];
    if (t.audio) return;              // 本物の音声がある曲はここを使わない
    prog += 1/(t.dur*3);
    if(prog>=1){
      if(cur<tracks.length-1){ cur++; prog=0; loadTrack(); updatePlayer(); highlight(); startPlay(); return; }
      else { prog=1; stopPlay(); updatePlayer(); return; }
    }
    updatePlayer();
    timer=setTimeout(tick,333);
  }

  // 本物の音声の進行に合わせてバー・時間を更新
  asAudio.addEventListener('timeupdate', () => {
    if (!playing || !asAudio.duration) return;
    prog = asAudio.currentTime / asAudio.duration;
    updatePlayer();
  });
  // 曲が終わったら次の曲へ
  asAudio.addEventListener('ended', () => {
    if (cur < tracks.length - 1) { cur++; prog = 0; loadTrack(); updatePlayer(); highlight(); startPlay(); }
    else { prog = 1; stopPlay(); updatePlayer(); }
  });
  // メタデータ（曲の長さ）が読めたら時間表示を更新
  asAudio.addEventListener('loadedmetadata', () => { updatePlayer(); });

  playEl.addEventListener('click', ()=> playing?stopPlay():startPlay());
  prevEl.addEventListener('click', ()=>{ if(cur>0){ stopPlay(); cur--; prog=0; loadTrack(); updatePlayer(); highlight(); startPlay(); } });
  nextEl.addEventListener('click', ()=>{ if(cur<tracks.length-1){ stopPlay(); cur++; prog=0; loadTrack(); updatePlayer(); highlight(); startPlay(); } });

  // ---- 音量ダイヤル ----
  (function(){
    const dial = document.getElementById('as-vol-dial');
    const mark = document.getElementById('as-vol-mark');
    if (!dial) return;
    let vol = curVol;              // 0〜1（初期音量。Web Audio側と共有）
    const MIN = -135, MAX = 135;   // 回転の角度範囲
    function render(){
      const deg = MIN + (MAX - MIN) * vol;
      mark.style.transform = `translateX(-50%) rotate(${deg}deg)`;
      applyVolume(vol);   // GainNode経由で音量を反映（iPadでも効く）
    }
    render();

    let dragging = false;
    // マウス・タッチ両対応で座標(clientX/Y)を取り出す
    // （iPadの指の操作は e.touches[0] の中に座標が入っているため）
    function getXY(e){
      if (e.touches && e.touches.length)        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      if (e.changedTouches && e.changedTouches.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    }
    function setFromEvent(e){
      const { x, y } = getXY(e);
      const rect = dial.getBoundingClientRect();
      const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
      let ang = Math.atan2(y - cy, x - cx) * 180/Math.PI + 90;
      if (ang > 180) ang -= 360;
      ang = Math.max(MIN, Math.min(MAX, ang));
      vol = (ang - MIN) / (MAX - MIN);
      render();
    }
    // マウス
    dial.addEventListener('mousedown', e => { dragging = true; setFromEvent(e); e.preventDefault(); });
    window.addEventListener('mousemove', e => { if (dragging) setFromEvent(e); });
    window.addEventListener('mouseup', () => { dragging = false; });
    // タッチ（iPad/スマホ）：指でダイヤルを回して音量を変える
    dial.addEventListener('touchstart', e => { dragging = true; setFromEvent(e); e.preventDefault(); }, { passive:false });
    window.addEventListener('touchmove', e => { if (dragging) { setFromEvent(e); e.preventDefault(); } }, { passive:false });
    window.addEventListener('touchend', () => { dragging = false; });
    window.addEventListener('touchcancel', () => { dragging = false; });
    // ホイール（PCのトラックパッド等）
    dial.addEventListener('wheel', e => { e.preventDefault(); vol = Math.max(0, Math.min(1, vol + (e.deltaY < 0 ? 0.05 : -0.05))); render(); }, { passive:false });
  })();

  function generateQR(){
    const data = { s: tracks.map(t=>t.name), seed: seed, t: titleIn.value };
    const param = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const baseUrl = location.href.split('?')[0].split('#')[0];
    const url = baseUrl + '?album=' + param;
    qrEl.innerHTML = '';
    new QRCode(qrEl, { text: url, width:280, height:280, colorDark:'#1d1d1f', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.M });
  }
  // タイトルの入力状態を反映：未入力なら枠＋点滅・次へ無効、入力済みなら枠と点滅を消し次へ有効
  function reflectTitleState(){
    const filled = titleIn.value.trim().length > 0;
    titleIn.classList.toggle('is-empty', !filled);
    screenNext.disabled = !filled;
    // 入力中は「確定済み」表示を一旦解除（打ち直し中とわかるように）
    titleIn.classList.remove('confirmed');
  }
  titleIn.addEventListener('input', reflectTitleState);

  // タイトル確定（入力できた感を出す）
  function confirmTitle(){
    const v = titleIn.value.trim();
    if (v.length === 0) return;   // 空は確定しない
    // 末尾に「。」を付ける（すでに付いていれば足さない＝二重防止）
    titleIn.value = v.endsWith('。') ? v : v + '。';
    titleIn.classList.add('confirmed');
    // 確定したらフォーカスを外してカーソルを消す（クリックでまた編集できる）
    titleIn.blur();
    // 一瞬光るフィードバック
    titleIn.classList.add('just-confirmed');
    setTimeout(() => titleIn.classList.remove('just-confirmed'), 600);
  }
  // Enterで確定（改行はしない）。ただしIME変換中のEnterは無視する
  titleIn.addEventListener('keydown', e => {
    // IMEで日本語変換を確定するためのEnterは拾わない（内容の重複を防ぐ）
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') { e.preventDefault(); confirmTitle(); titleIn.blur(); }
  });
  // フォーカスを外したときも確定扱い
  titleIn.addEventListener('blur', confirmTitle);

  // 次の画面へ（QR完成オーバーレイを枠の中央に被せる）
  screenNext.addEventListener('click', () => {
    if (screenNext.disabled) return;
    stopPlay();
    generateQR();
    qrOverlay.classList.add('show');
  });
  // 前の画面へ戻る（QRを閉じる→閉じていれば選択画面へ戻る）
  screenPrev.addEventListener('click', () => {
    if (qrOverlay.classList.contains('show')) {
      qrOverlay.classList.remove('show');     // まずQRを閉じる
    } else {
      history.back();                          // 完成画面を閉じて選択画面へ
    }
  });
  qrOverlay.addEventListener('click', () => qrOverlay.classList.remove('show'));

  function restoreFromURL(){
    const m = location.search.match(/[?&]album=([^&]+)/);
    if (!m) return;
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
      const stage = document.getElementById('cf-stage');
      const cards = Array.from(stage.querySelectorAll('img'));
      const restored = data.s.map(name => {
        const card = cards.find(c => c.dataset.name === name);
        const pm = getParam(name);
        return { name, src: card ? card.getAttribute('src') : '', param: pm, dur: pm.dur, desc: pm.desc, audio: pm.audio || '' };
      });
      // 選択画面を隠してからアルバムを開く（QRから来た人にいきなり完成画面を見せる）
      document.getElementById('wall').style.visibility = 'hidden';
      window.openAlbum(restored);
      if (data.t) { titleIn.value = data.t; reflectTitleState(); }
    } catch(e){ console.warn('復元に失敗', e); }
  }
  // ページ表示後に少し待ってから復元（画像やDOMが確実に揃ってから）
  window.addEventListener('load', () => { setTimeout(restoreFromURL, 50); });
})();

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  // QRからの復元（?album=付き）でない通常リロードのときだけ先頭へ
  if (!location.search.match(/[?&]album=/)) {
    window.scrollTo(0, 0);
  }
});