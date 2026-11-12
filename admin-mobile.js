/* Mobile administration: right-hand student directory, no credentials/passwords exposed. */
(function () {
  'use strict';
  const S = {
    uz: { btn:'O‘quvchilar', title:'O‘quvchilar', tag:'MAKTAB BOSHQARUVI',
      search:'Ism, sinf yoki login bo‘yicha qidirish', ph:'O‘quvchini qidirish…',
      shown:'Ko‘rsatilmoqda', empty:'O‘quvchilar topilmadi.', quiz:'Test',
      manage:'O‘quvchilarni boshqarish', close:'Panelni yopish' },
    en: { btn:'Students', title:'Students', tag:'SCHOOL MANAGEMENT',
      search:'Search by name, class or login', ph:'Find a student…',
      shown:'Showing', empty:'No students found.', quiz:'Quiz',
      manage:'Manage student accounts', close:'Close panel' }
  };
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let current = null;
  function close(restoreFocus) {
    if (!current || current.drawer.hidden) return;
    current.drawer.hidden = true;
    current.shade.hidden = true;
    document.body.classList.remove('ad-students-opened');
    if (restoreFocus && current.button.isConnected) current.button.focus();
  }
  function mount(app, users, progress, lang) {
    if (!app || !window.ZKAuth || !window.ZKAuth.isAdmin || !window.ZKAuth.isAdmin()) return;
    close(false);
    const top = app.querySelector('.ad-top'), directory = app.querySelector('.ad-directory');
    if (!top) return;
    if (directory?.children[1]) directory.children[1].classList.add('ad-students-panel');
    const T = S[lang === 'en' ? 'en' : 'uz'];
    let button = top.querySelector('#adStudentsOpen');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button'; button.id = 'adStudentsOpen'; button.className = 'btn sec sm ad-students-open';
      button.textContent = '🎓 ' + T.btn;
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-controls', 'adStudentsDrawer');
      const teacherLink = top.querySelector('a[href="#teacher"]');
      top.insertBefore(button, teacherLink || null);
    }
    let shade = app.querySelector('#adStudentsShade');
    if (!shade) {
      shade = document.createElement('div'); shade.id = 'adStudentsShade'; shade.className = 'ad-students-shade'; shade.hidden = true;
      app.appendChild(shade);
    }
    let drawer = app.querySelector('#adStudentsDrawer');
    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'adStudentsDrawer'; drawer.className = 'ad-students-drawer';
      drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-label', T.title); drawer.hidden = true;
      drawer.innerHTML = `<div class="ad-students-drawer-head">
        <div><span class="ad-drawer-tag">${T.tag}</span><h2>🎓 ${T.title}</h2></div>
        <button type="button" class="ad-students-close" id="adStudentsClose" aria-label="${T.close}">✕</button>
      </div>
      <label class="ad-drawer-search-label" for="adStudentsSearch">${T.search}</label>
      <input type="search" id="adStudentsSearch" placeholder="${T.ph}" autocomplete="off">
      <div id="adStudentsSummary" class="ad-students-summary" aria-live="polite"></div>
      <div id="adStudentsRows" class="ad-students-drawer-list"></div>
      <a class="ad-drawer-manage" href="#teacher">${T.manage} <span aria-hidden="true">↗</span></a>`;
      app.appendChild(drawer);
    }
    current = { button, shade, drawer };
    const search = drawer.querySelector('#adStudentsSearch');
    const count = drawer.querySelector('#adStudentsSummary');
    const rows = drawer.querySelector('#adStudentsRows');
    const students = (users || []).filter(u => u.role === 'student' && u.status !== 'pending')
      .sort((a,b) => String(a.cls||'').localeCompare(String(b.cls||''),undefined,{numeric:true})
        || String(a.name||a.login||'').localeCompare(String(b.name||b.login||'')));
    function draw() {
      const q = search.value.trim().toLocaleLowerCase();
      const visible = students.filter(u => [u.name,u.cls,u.login].join(' ').toLocaleLowerCase().includes(q));
      count.textContent = T.shown + ': ' + visible.length + ' / ' + students.length;
      rows.innerHTML = visible.length ? visible.map(u => {
        const p = (progress || {})[u.id] || {}, xp = Math.max(0, Number(p.xp)||0);
        return `<article class="ad-student-row">
          <span class="ad-student-avatar" aria-hidden="true">${esc((String(u.name||u.login||'?').trim()[0]||'?').toUpperCase())}</span>
          <div class="ad-student-info"><b>${esc(u.name||u.login||'')}</b>
          <small>${esc(u.cls||'—')} · ${esc(u.login||'')}</small>
          <span>${xp} XP · ${T.quiz}: ${p.quizAvg == null ? '—' : esc(p.quizAvg)}</span></div>
        </article>`;
      }).join('') : `<p class="ad-students-none">${T.empty}</p>`;
    }
    search.oninput = draw;
    button.onclick = () => {
      if (!drawer.hidden) return;
      search.value = '';
      draw();
      drawer.hidden = false; shade.hidden = false;
      document.body.classList.add('ad-students-opened');
      drawer.querySelector('#adStudentsClose').focus();
    };
    shade.onclick = () => close(true);
    drawer.querySelector('#adStudentsClose').onclick = () => close(true);
    drawer.querySelector('.ad-drawer-manage').onclick = () => close(false);
    draw();
  }
  document.addEventListener('keydown', e => {
    const d = current?.drawer;
    if (!d || d.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
    if (e.key === 'Tab') {
      const focus = [...d.querySelectorAll('button,input,a[href]')].filter(x => !x.disabled && x.getClientRects().length);
      const first = focus[0], last = focus[focus.length-1];
      if (!first) return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener('hashchange', () => close(false));
  window.addEventListener('resize', () => { if (innerWidth > 760) close(false); });
  window.ZKAdminMobile = { mount, close };
})();
