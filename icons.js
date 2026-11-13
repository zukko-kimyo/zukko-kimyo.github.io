/* Zukko Kimyo — bir xil uslubdagi SVG ikonkalar (Zukko brend dizayni).
   Interfeysdagi emojilar (sarlavhalar, tugmalar, menyular, KPI kartalari) shu ikonkalarga
   almashtiriladi. Emojilar har xil telefonda har xil ko'rinadi; SVG esa hamma joyda bir xil
   va matn rangini (currentColor) oladi.
   Tajriba rasmchalari (.th), nishonlar (.achv) va dars matni ichidagi illyustratsiyalar
   o'zgarmaydi — ular kontent. */
(function () {
  'use strict';
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    books: '<path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19"/><path d="M8.5 7h6"/>',
    book: '<path d="M2 4.5h6a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h7z"/>',
    doc: '<path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6.5l-5.4 8.7A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.8L14 9.5V3"/><path d="M7.4 15h9.2"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12.4 2.7 2.7 5.8-5.8"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    teacher: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/><path d="m7.5 12 3-3 2 2 4-4"/>',
    grad: '<path d="M2 9.5 12 4.5l10 5-10 5z"/><path d="M6 11.5v4.8c3.3 2.6 8.7 2.6 12 0v-4.8"/><path d="M22 9.5v5.5"/>',
    trophy: '<path d="M8 4h8v5.5a4 4 0 0 1-8 0z"/><path d="M16 5.5h3v1.8a3.2 3.2 0 0 1-3.2 3.2M8 5.5H5v1.8a3.2 3.2 0 0 0 3.2 3.2"/><path d="M12 13.5V17M8.5 21h7M9.5 17h5l.5 4h-6z"/>',
    medal: '<circle cx="12" cy="15" r="5.5"/><path d="M8.7 10.6 6 3h4l2 5 2-5h4l-2.7 7.6"/><path d="m12 12.6.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2z"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="m10 17-5-5 5-5"/><path d="M5 12h11"/>',
    play: '<path d="M7.5 4.8v14.4a.8.8 0 0 0 1.2.7l11.1-7.2a.8.8 0 0 0 0-1.4L8.7 4.1a.8.8 0 0 0-1.2.7z" fill="currentColor"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" stroke="none"/>',
    prev: '<path d="M18 5.5v13a.7.7 0 0 1-1.1.6L8.5 12.6a.7.7 0 0 1 0-1.2l8.4-6.5a.7.7 0 0 1 1.1.6z" fill="currentColor"/><path d="M6 5v14"/>',
    next: '<path d="M6 5.5v13a.7.7 0 0 0 1.1.6l8.4-6.5a.7.7 0 0 0 0-1.2L7.1 4.9A.7.7 0 0 0 6 5.5z" fill="currentColor"/><path d="M18 5v14"/>',
    zap: '<path d="M13 2.5 4.5 14H11l-1 7.5L18.5 10H12z"/>',
    flame: '<path d="M12 3c.9 3.4 5.5 5.6 5.5 10.4a5.5 5.5 0 0 1-11 0c0-2.3 1.1-3.9 2.4-5 .2 1.7 1 2.7 2.2 3.1-.6-3-.3-5.9.9-8.5z"/>',
    star: '<path d="m12 3.2 2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.8 1-6-4.3-4.2 6-.9z"/>',
    sparkle: '<path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5"/>',
    atom: '<circle cx="12" cy="12" r="1.7" fill="currentColor"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>',
    chart: '<path d="M4 4v16h16"/><path d="M8.5 16v-4M12.5 16V8M16.5 16v-6"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>',
    rocket: '<path d="M5.5 15.5C4 17 3.5 20.5 3.5 20.5s3.5-.5 5-2"/><path d="m9 15-3-3c1-4.5 5.5-9 12.5-9 0 7-4.5 11.5-9.5 12z"/><circle cx="14.5" cy="9.5" r="1.6"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/>',
    award: '<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M7 8h10M7 11.5h5.5"/><circle cx="16.5" cy="16.5" r="2.8"/><path d="m15 19 -.5 2.5 2-1 2 1-.5-2.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M2.5 12h3M18.5 12h3M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    school: '<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5"/><circle cx="12" cy="10.5" r="1.4"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16.5 6.5l3 3M14.5 8.5l2 2"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6"/><path d="m6 7 1 13h10l1-13M9 7V4h6v3"/>',
    download: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
    cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.7-8.9A6 6 0 0 1 17.8 9 4.5 4.5 0 0 1 17.5 18.5z"/>',
    inbox: '<path d="M3 13h5l1.5 3h5l1.5-3h5"/><path d="M5.5 5h13l2.5 8v6H3v-6z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.7.3-1.2.9-1.2 1.7v.4"/><path d="M12 17h.01"/>',
    alert: '<path d="M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17h.01"/>',
    mouse: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v3"/>',
    hand: '<path d="M9 11.5V5a1.5 1.5 0 0 1 3 0v5.5"/><path d="M12 10V8.5a1.5 1.5 0 0 1 3 0V11"/><path d="M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.7-2.3l-2.4-3a1.6 1.6 0 0 1 2.4-2.1L9 15"/>',
    gamepad: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="15.5" cy="11.5" r="1" fill="currentColor"/><circle cx="17.8" cy="13.8" r="1" fill="currentColor"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
    microscope: '<path d="M6 18h8M3 22h18"/><path d="M14 22a7 7 0 1 0-7-7"/><path d="M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2"/><path d="M12 6V3H8v3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.6L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.3 4.6L20 16"/><path d="M20 21v-5h-5"/>',
    pencil: '<path d="m4 20 1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="m13.5 7 3 3"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  };
  // Emoji (U+FE0F siz) -> ikonka nomi.
  const MAP = {
    '🏠': 'home', '📚': 'books', '📘': 'book', '📖': 'book', '📗': 'book', '📙': 'book', '📄': 'doc', '📋': 'doc', '📝': 'pencil',
    '🧪': 'flask', '⚗': 'flask', '✅': 'check', '✔': 'check', '🛡': 'shield', '👩‍🏫': 'teacher', '🧑‍🏫': 'teacher', '👨‍🏫': 'teacher',
    '🎓': 'grad', '🏆': 'trophy', '🏅': 'medal', '🎖': 'medal', '🚪': 'logout', '▶': 'play', '⏸': 'pause', '⏮': 'prev', '⏭': 'next',
    '⚡': 'zap', '🔥': 'flame', '⭐': 'star', '🌟': 'star', '✨': 'sparkle', '✦': 'sparkle', '⚛': 'atom', '📊': 'chart', '📈': 'trend',
    '🎯': 'target', '🚀': 'rocket', '🧩': 'grid', '📜': 'award', '🧭': 'compass', '💡': 'bulb', '⚙': 'gear', '🏫': 'school',
    '📦': 'box', '🔐': 'lock', '🔒': 'lock', '🔑': 'key', '🗑': 'trash', '⬇': 'download', '☁': 'cloud', '📥': 'inbox', '➕': 'plus',
    '❓': 'help', '⚠': 'alert', '🖱': 'mouse', '👆': 'hand', '🎮': 'gamepad', '👣': 'flag', '🔬': 'microscope', '👤': 'user',
    '👁': 'eye', '🔍': 'search', '🔎': 'search', '🔄': 'refresh', '↺': 'refresh', '🗓': 'calendar', '📅': 'calendar',
  };
  // Bu joylardagi emojilar kontent/illyustratsiya — tegilmaydi.
  const SKIP = 'script,style,textarea,input,select,option,svg,canvas,.th,.achv,.xinline .ic,.sidex,#lmIcon,.zk-keep-emoji,.trpage,.lesson-body .txt,.ptcell';
  const RE = /(\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*|[✦↺])/gu;
  const NS = 'http://www.w3.org/2000/svg';

  function el(name) {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    s.setAttribute('class', 'zi zi-' + name);
    s.innerHTML = P[name];
    return s;
  }
  function svg(name, cls) {
    if (!P[name]) return '';
    return `<svg class="zi zi-${name}${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[name]}</svg>`;
  }
  const keyOf = (s) => s.replace(/️/g, '');
  function nameOf(emoji) { return MAP[keyOf(emoji)] || null; }

  function swap(node) {
    const txt = node.data; RE.lastIndex = 0;
    if (!RE.test(txt)) return;
    RE.lastIndex = 0;
    let m, last = 0, changed = false; const frag = document.createDocumentFragment();
    while ((m = RE.exec(txt))) {
      const name = nameOf(m[0]);
      if (!name) continue;
      if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
      frag.appendChild(el(name)); last = m.index + m[0].length; changed = true;
    }
    if (!changed) return;
    if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }
  function decorate(root) {
    if (!root) return;
    if (root.nodeType === 3) { const p = root.parentElement; if (p && !p.closest(SKIP)) swap(root); return; }
    if (root.nodeType !== 1 || root.closest && root.closest(SKIP)) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (RE.lastIndex = 0, RE.test(n.data) && n.parentElement && !n.parentElement.closest(SKIP) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    const list = []; let n; while ((n = w.nextNode())) list.push(n);
    list.forEach(swap);
  }

  let queue = new Set(), scheduled = false;
  function flush() { scheduled = false; const q = queue; queue = new Set(); q.forEach((x) => x.isConnected && decorate(x)); }
  function watch() {
    decorate(document.body);
    new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === 'characterData') queue.add(r.target);
        else r.addedNodes.forEach((x) => queue.add(x));
      }
      if (!scheduled && queue.size) { scheduled = true; requestAnimationFrame(flush); }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  window.ZKIcons = { svg, decorate, nameOf, names: Object.keys(P), map: MAP };
  if (document.body) watch(); else document.addEventListener('DOMContentLoaded', watch);
})();
