/* Telefon uchun: pastki tugmani scroll'da yashirish, darslar orasida surish (swipe) */
(function () {
  const coarse = matchMedia('(pointer:coarse)').matches;
  if (coarse) document.documentElement.classList.add('touch');
  // scroll pastga -> fnav yashirinadi, yuqoriga -> chiqadi
  let lastY = scrollY, acc = 0;
  addEventListener('scroll', () => {
    const y = scrollY, d = y - lastY; lastY = y;
    acc = (d > 0) === (acc > 0) ? acc + d : d;
    if (y < 80 || acc < -40) document.body.classList.remove('scdown');
    else if (acc > 60) document.body.classList.add('scdown');
  }, { passive: true });
  addEventListener('hashchange', () => document.body.classList.remove('scdown'));

  // darslar orasida chapga/o'ngga surish
  const SKIP = 'canvas,.lab-host,.ptscroll,.tabs,.tr-pal,.tr-opts,input,textarea,select,.zoom,.modal,.fnav,.bnav,header';
  function hScroll(el) {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (e.scrollWidth > e.clientWidth + 4 && /(auto|scroll)/.test(getComputedStyle(e).overflowX)) return true;
    }
    return false;
  }
  let sx = 0, sy = 0, st = 0, ok = false;
  document.addEventListener('touchstart', (e) => {
    ok = false; if (e.touches.length !== 1) return;
    if (!/^#g[678]-\d+$/.test(location.hash)) return;
    const tg = e.target; if (tg.closest && tg.closest(SKIP)) return; if (hScroll(tg)) return;
    if (document.querySelector('.zoom.on,#labModal.on')) return;
    const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); ok = true;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (!ok) return; ok = false;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Date.now() - st > 700 || Math.abs(dx) < 90 || Math.abs(dy) > Math.abs(dx) * 0.45) return;
    if (getSelection && String(getSelection()).length) return;
    const m = location.hash.match(/^#(g[678])-(\d+)$/); if (!m) return;
    const n = +m[2] + (dx < 0 ? 1 : -1);
    const bk = window.BOOKS && BOOKS[m[1]]; if (!bk || n < 1 || n > bk.lessons.length) return;
    const tab = document.querySelector('.tabs button.on');
    document.body.dataset.swipe = dx < 0 ? 'l' : 'r';
    location.hash = `${m[1]}-${n}`;
    setTimeout(() => { delete document.body.dataset.swipe; }, 500);
    if (tab && tab.dataset.tab && tab.dataset.tab !== 'content') setTimeout(() => { const b = document.querySelector(`.tabs button[data-tab="${tab.dataset.tab}"]`); if (b && !b.classList.contains('on')) b.click(); }, 60);
  }, { passive: true });
})();
