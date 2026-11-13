/* Telefon uchun: pastki tugmani scroll'da yashirish, darslar orasida surish (swipe) */
(function () {
  // Role-aware mobile navigation: no grade labels in the bottom bar.
  // Only the owner of an admin/teacher account sees the staff panel link.
  const gradesToggle = document.getElementById('mobileGradesToggle');
  const gradesMenu = document.getElementById('mobileGradesMenu');
  const panelLink = document.getElementById('mobilePanelLink');
  function closeGrades(restoreFocus) {
    if (!gradesToggle || !gradesMenu) return;
    const wasOpen = !gradesMenu.hidden;
    gradesMenu.hidden = true;
    gradesToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus && wasOpen) gradesToggle.focus();
  }
  function refreshMobileNav() {
    if (!gradesToggle || !gradesMenu || !panelLink) return;
    const en = document.documentElement.lang === 'en';
    const h = (location.hash || '#home').slice(1);
    const isAdmin = Boolean(window.ZKAuth && ZKAuth.isAdmin && ZKAuth.isAdmin());
    const isTeacher = !isAdmin && Boolean(window.ZKAuth && ZKAuth.isStaff && ZKAuth.isStaff());
    const target = isAdmin ? 'admin' : isTeacher ? 'teacher' : 'me';
    panelLink.href = '#' + target;
    panelLink.dataset.nav = target;
    document.getElementById('mobilePanelIcon').textContent = isAdmin ? '🛡️' : isTeacher ? '👩‍🏫' : '👤';
    document.getElementById('mobilePanelLabel').textContent = (isAdmin || isTeacher) ? (en ? 'Panel' : 'Panel') : (en ? 'Profile' : 'Profil');
    document.getElementById('mobileGradesLabel').textContent = en ? 'Classes' : 'Sinflar';
    document.getElementById('mobileGradesTitle').textContent = en ? 'Choose a class' : 'Sinfni tanlang';
    gradesMenu.setAttribute('aria-label', en ? 'Classes' : 'Sinflar');
    gradesToggle.setAttribute('aria-label', en ? 'Choose a class' : 'Sinfni tanlang');
    gradesMenu.querySelectorAll('a[href^="#g"]').forEach((link) => {
      const number = link.hash.replace('#g', '');
      const text = link.querySelector('span:nth-child(2)');
      if (text) text.textContent = en ? 'Grade ' + number : number + '-sinf';
    });
    gradesToggle.classList.toggle('on', /^(?:g[678](?:-|$)|book-g[678]$)/.test(h));
    panelLink.classList.toggle('on', h === target || (target === 'me' && h === 'certificate'));
  }
  if (gradesToggle && gradesMenu) {
    gradesToggle.addEventListener('click', () => {
      const open = gradesMenu.hidden;
      gradesMenu.hidden = !open;
      gradesToggle.setAttribute('aria-expanded', String(open));
      if (open) gradesMenu.querySelector('a')?.focus();
    });
    gradesMenu.addEventListener('click', (e) => {
      if (e.target.closest('a[href]')) closeGrades(false);
    });
    document.addEventListener('click', (e) => {
      if (!gradesMenu.hidden && !gradesMenu.contains(e.target) && !gradesToggle.contains(e.target)) closeGrades(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !gradesMenu.hidden) { e.preventDefault(); closeGrades(true); }
    });
    window.addEventListener('hashchange', () => { closeGrades(false); refreshMobileNav(); });
    if (window.MutationObserver) new MutationObserver(refreshMobileNav).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    refreshMobileNav();
  }
  // Telefonda foydalanuvchi belgisi (avatar "A" va menyusi) pastki menyuning o'ng chetiga ko'chadi:
  // "Panel" tugmasi o'rnida turadi, menyu yuqoriga ochiladi. Kompyuterda header'da qoladi.
  (function bottomChip() {
    const bnav = document.getElementById('bnav'); const head = document.querySelector('header.top .wrap');
    if (!bnav || !head || !window.matchMedia) return;
    const mq = matchMedia('(max-width: 760px)');
    function place() {
      const c = document.getElementById('uchip'); if (!c) { document.body.classList.remove('zk-chip-bottom'); return; }
      if (mq.matches) {
        if (c.parentElement !== bnav) bnav.insertBefore(c, document.getElementById('mobileGradesMenu'));
        document.body.classList.add('zk-chip-bottom');
        const h = (location.hash || '#home').slice(1);
        c.classList.toggle('on', /^(admin|teacher|me|certificate)$/.test(h));
      } else {
        if (c.parentElement !== head) head.insertBefore(c, head.querySelector('.lang'));
        document.body.classList.remove('zk-chip-bottom');
      }
    }
    new MutationObserver(place).observe(head, { childList: true });
    if (mq.addEventListener) mq.addEventListener('change', place); else mq.addListener(place);
    window.addEventListener('hashchange', place);
    place();
  })();
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
