/* Zukko Kimyo — "egilib bo'rtish": cards tilt toward the pointer with a glare highlight */
(function () {
  const SEL = '.lcard,.gcard,.xcard,.fcard,.toolcard,.xinline,.mst,.achv.on,.gprog,.pn a';
  const MAX = 12; // degrees
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let cur = null, raf = 0, last = null;
  function setVars(el, e) {
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    const k = r.width > 520 ? 0.45 : 1; // big cards tilt less
    el.style.setProperty('--ry', ((x - 0.5) * 2 * MAX * k).toFixed(2) + 'deg');
    el.style.setProperty('--rx', ((0.5 - y) * 2 * MAX * k).toFixed(2) + 'deg');
    el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
    el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
  }
  function leave(el) { if (!el) return; el.classList.remove('tilt-on'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); }
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || reduce.matches) return;
    const el = e.target.closest && e.target.closest(SEL);
    if (el !== cur) { leave(cur); cur = el; if (el) el.classList.add('tilt-on'); }
    if (!el) return;
    last = e; if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (cur && last) setVars(cur, last); });
  }, { passive: true });
  document.addEventListener('pointerleave', () => { leave(cur); cur = null; });
  window.addEventListener('hashchange', () => { leave(cur); cur = null; });
  // touch: short "press & pop" with tilt toward the finger
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || reduce.matches) return;
    const el = e.target.closest && e.target.closest(SEL); if (!el) return;
    setVars(el, e); el.classList.add('tilt-press');
    const up = () => { el.classList.remove('tilt-press'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); };
    document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  }, { passive: true });
})();
