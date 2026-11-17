/* Zukko Kimyo — login tizimi (Firebase Authentication + Firestore)
 * firebase-config.js bo'sh bo'lsa -> login o'chiq (ochiq demo rejim).
 * URL'da ?mock bo'lsa -> sinov rejimi (hammasi brauzerda saqlanadi, serversiz).
 */
(function () {
  const CFG = window.ZK_CONFIG || {};
  const FB = CFG.firebase || {};
  const MOCK = CFG.mock === true || (/[?&]mock\b/.test(location.search) && !FB.apiKey); // haqiqiy sozlamada ?mock ishlamaydi
  const ON = MOCK || !!(FB.apiKey && FB.projectId);
  const DOMAIN = CFG.loginDomain || 'zukko-kimyo.uz';
  const PKEY = 'zk_prog';
  const SDK = 'https://www.gstatic.com/firebasejs/10.14.1/';

  const S = {
    uz: {
      title: 'Zukko Akademiyasi', sub: 'Zukko Xalqaro Maktabi · Kimyo, 6–8-sinf', login: 'Login', pass: 'Parol', remember: 'Shu qurilmada eslab qolish',
      enter: 'Kirish', hint: "Login va parolni o'qituvchingizdan oling.", e_empty: 'Login va parolni kiriting.', e_bad: "Login yoki parol noto'g'ri.",
      e_net: "Internet bilan aloqa yo'q. Qayta urinib ko'ring.", e_many: "Juda ko'p urinish. Bir necha daqiqadan so'ng qayta urinib ko'ring.",
      sync_fail: "Natijalar hozircha serverga saqlanmadi — internet tiklanganda avtomatik saqlanadi.",
      logout_unsynced: "Natijalaringiz hali serverga saqlanmadi (internet yo'q bo'lishi mumkin). Baribir chiqasizmi? Natijalar shu qurilmada saqlanib qoladi va keyingi kirishda yuboriladi.",
      e_inactive: "Bu hisob faol emas. O'qituvchingizga murojaat qiling.", e_cfg: "Sayt sozlanmagan: firebase-config.js ni tekshiring.",
      mk_admin: 'Administrator hisobini yaratish', mk_admin_q: "Hali administrator yo'qmi? Shu parol bilan administrator hisobini yaratish mumkin (faqat birinchi marta).",
      e_weak: "Parol kamida 6 belgidan iborat bo'lsin.", e_exists: "Administrator allaqachon bor — parol noto'g'ri.",
      loading: 'Yuklanmoqda…', logout: 'Chiqish', panel: "O'qituvchi paneli", student: "o'quvchi", teacher: "o'qituvchi", admin: 'administrator',
      no_acc: "Hisobingiz yo'qmi?", reg_go: "Ro'yxatdan o'tish", have_acc: 'Hisobingiz bormi?', reg_h: "Ro'yxatdan o'tish",
      reg_p: "Sinf kodini o'qituvchingizdan oling. O'qituvchi tasdiqlagach, saytga kira olasiz.", r_name: 'Familiya va ism', r_name_ph: 'Aliyev Vali',
      r_code: 'Sinf kodi', r_login: "O'zingiz uchun login", r_login_h: "Lotin harflari, raqam, nuqta. Kamida 3 belgi, masalan vali.a", r_pass2: 'Parolni takrorlang',
      reg_btn: "Ro'yxatdan o'tish", e_r_name: 'Familiya va ismingizni to\'liq yozing.', e_r_code: "Sinf kodi noto'g'ri yoki eskirgan. O'qituvchingizdan so'rang.",
      e_r_login: "Login faqat lotin harflari, raqam, nuqta va chiziqchadan iborat bo'lsin (kamida 3 belgi).", e_r_pass2: 'Parollar bir xil emas.', e_r_taken: 'Bu login band. Boshqasini tanlang.',
      sent_h: 'Arizangiz yuborildi!', sent_p: "{n}, siz {c} sinfiga ro'yxatdan o'tdingiz. O'qituvchingiz tasdiqlagach, shu login va parol bilan kirasiz.", sent_back: 'Kirish sahifasiga qaytish',
      e_pending: "Hisobingiz hali tasdiqlanmagan. O'qituvchingiz tasdiqlashini kuting.",
      adm_panel: 'Administrator paneli', ann_close: 'Yopish', reg_closed: "Hozircha ro'yxatdan o'tish yopiq. Login va parolni o'qituvchingizdan oling.",
      mock: 'Sinov rejimi — maʼlumotlar faqat shu brauzerda', saved: 'Saqlandi', offline: 'Internet yo‘q — natijalar keyin saqlanadi', cls: 'Sinf',
    },
    en: {
      title: 'Zukko Academy', sub: 'Zukko International School · Chemistry, grades 6–8', login: 'Login', pass: 'Password', remember: 'Remember me on this device',
      enter: 'Sign in', hint: 'Get your login and password from your teacher.', e_empty: 'Enter your login and password.', e_bad: 'Wrong login or password.',
      e_net: 'No internet connection. Please try again.', e_many: 'Too many attempts. Try again in a few minutes.',
      sync_fail: 'Your progress is not saved to the server yet — it will sync automatically when the connection returns.',
      logout_unsynced: 'Your progress is not saved to the server yet (you may be offline). Sign out anyway? It stays on this device and syncs at your next sign-in.',
      e_inactive: 'This account is not active. Please contact your teacher.', e_cfg: 'Site is not configured: check firebase-config.js.',
      mk_admin: 'Create administrator account', mk_admin_q: 'No administrator yet? You can create one with this password (first time only).',
      e_weak: 'Password must be at least 6 characters.', e_exists: 'An administrator already exists — wrong password.',
      loading: 'Loading…', logout: 'Sign out', panel: 'Teacher panel', student: 'student', teacher: 'teacher', admin: 'administrator',
      no_acc: "Don't have an account?", reg_go: 'Sign up', have_acc: 'Already have an account?', reg_h: 'Sign up',
      reg_p: 'Get the class code from your teacher. You can sign in after your teacher approves you.', r_name: 'Full name', r_name_ph: 'Aliyev Vali',
      r_code: 'Class code', r_login: 'Choose a login', r_login_h: 'Latin letters, digits, dot. At least 3 characters, e.g. vali.a', r_pass2: 'Repeat password',
      reg_btn: 'Sign up', e_r_name: 'Enter your full name (surname and first name).', e_r_code: 'The class code is wrong or expired. Ask your teacher.',
      e_r_login: 'Login may contain only Latin letters, digits, dot and dash (at least 3 characters).', e_r_pass2: 'Passwords do not match.', e_r_taken: 'This login is taken. Choose another one.',
      sent_h: 'Request sent!', sent_p: '{n}, you signed up for class {c}. You can sign in with this login and password once your teacher approves you.', sent_back: 'Back to sign in',
      e_pending: 'Your account is not approved yet. Please wait for your teacher.',
      adm_panel: 'Admin panel', ann_close: 'Close', reg_closed: 'Sign-up is closed for now. Get your login and password from your teacher.',
      mock: 'Test mode — data stays in this browser', saved: 'Saved', offline: 'Offline — results will be saved later', cls: 'Class',
    },
  };
  const lang = () => { try { return localStorage.getItem('zk_lang') === 'en' ? 'en' : 'uz'; } catch (e) { return 'uz'; } };
  const t = (k) => S[lang()][k] || k;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normLogin = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, '');
  const emailOf = (login) => (login.includes('@') ? login : `${login}@${DOMAIN}`);

  /* ================= BACKEND ================= */
  // Bir xil interfeys: init, signIn, signOut, createSelf, createAccount, changePassword, deleteAccount, get, set, del, list
  function mockBackend() {
    const K = 'zk_mock_db';
    const db = () => { try { return JSON.parse(localStorage.getItem(K)) || { auth: {}, col: {} }; } catch (e) { return { auth: {}, col: {} }; } };
    const put = (d) => localStorage.setItem(K, JSON.stringify(d));
    const SK = 'zk_mock_session';
    const wait = (v) => new Promise((r) => setTimeout(() => r(v), 120));
    const err = (code) => { const e = new Error(code); e.code = code; return e; };
    const uidOf = (d, email) => Object.keys(d.auth).find((u) => d.auth[u].email === email);
    // Faqat sinov rejimi: testlar tarmoq xatosini taqlid qiladi (localStorage zk_mock_fail = {"progress:get":true})
    const fail = (c, op) => { let f = {}; try { f = JSON.parse(localStorage.getItem('zk_mock_fail') || '{}'); } catch (e) { } if (f[c + ':' + op]) throw err('unavailable'); };
    return {
      async init() { const u = sessionStorage.getItem(SK) || localStorage.getItem(SK); const d = db(); return wait(u && d.auth[u] ? { uid: u, email: d.auth[u].email } : null); },
      async signIn(email, pw, remember) { const d = db(); const u = uidOf(d, email); if (!u || d.auth[u].pw !== pw) throw err('auth/invalid-credential'); (remember ? localStorage : sessionStorage).setItem(SK, u); return wait({ uid: u, email }); },
      async signOut() { localStorage.removeItem(SK); sessionStorage.removeItem(SK); },
      async createSelf(email, pw) { const d = db(); if (uidOf(d, email)) throw err('auth/email-already-in-use'); if (pw.length < 6) throw err('auth/weak-password'); const u = 'u' + Math.random().toString(36).slice(2, 10); d.auth[u] = { email, pw }; put(d); localStorage.setItem(SK, u); return wait({ uid: u, email }); },
      async changeOwnPassword(oldPw, newPw) { const d = db(); const u = sessionStorage.getItem(SK) || localStorage.getItem(SK); if (!u || !d.auth[u]) throw err('auth/requires-recent-login'); if (d.auth[u].pw !== oldPw) throw err('auth/invalid-credential'); if (newPw.length < 6) throw err('auth/weak-password'); d.auth[u].pw = newPw; put(d); return wait(true); },
      async deleteSelf() { const d = db(); const u = sessionStorage.getItem(SK) || localStorage.getItem(SK); if (u) { delete d.auth[u]; put(d); } localStorage.removeItem(SK); sessionStorage.removeItem(SK); return wait(true); },
      async createAccount(email, pw) { const d = db(); if (uidOf(d, email)) throw err('auth/email-already-in-use'); if (pw.length < 6) throw err('auth/weak-password'); const u = 'u' + Math.random().toString(36).slice(2, 10); d.auth[u] = { email, pw }; put(d); return wait(u); },
      async changePassword(email, oldPw, newPw) { const d = db(); const u = uidOf(d, email); if (!u || d.auth[u].pw !== oldPw) throw err('auth/invalid-credential'); d.auth[u].pw = newPw; put(d); return wait(true); },
      async deleteAccount(email, pw) { const d = db(); const u = uidOf(d, email); if (u && d.auth[u].pw === pw) { delete d.auth[u]; put(d); } return wait(true); },
      async get(c, id) { fail(c, 'get'); const d = db(); return wait(((d.col[c] || {})[id]) || null); },
      async set(c, id, data, merge) { fail(c, 'set'); const d = db(); d.col[c] = d.col[c] || {}; d.col[c][id] = merge ? Object.assign({}, d.col[c][id] || {}, data) : data; put(d); return wait(true); },
      async del(c, id) { const d = db(); if (d.col[c]) delete d.col[c][id]; put(d); return wait(true); },
      async list(c, field, val) { const d = db(); return wait(Object.entries(d.col[c] || {}).filter(([, v]) => !field || v[field] === val).map(([id, v]) => Object.assign({ id }, v))); },
    };
  }

  function firebaseBackend() {
    let A, F, app, auth, fs, sec, secAuth;
    async function load() {
      if (A) return;
      const [mApp, mAuth, mFs] = await Promise.all([import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js'), import(SDK + 'firebase-firestore.js')]);
      A = mAuth; F = mFs;
      app = mApp.initializeApp(FB);
      auth = A.getAuth(app);
      try { fs = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) }); } catch (e) { fs = F.getFirestore(app); }
      sec = mApp.initializeApp(FB, 'zk-secondary');
      secAuth = A.initializeAuth(sec, { persistence: A.inMemoryPersistence });
    }
    async function withSecondary(fn) { try { return await fn(); } finally { try { await A.signOut(secAuth); } catch (e) { } } }
    const user = (u) => (u ? { uid: u.uid, email: u.email } : null);
    return {
      async init() { await load(); await auth.authStateReady(); return user(auth.currentUser); },
      async signIn(email, pw, remember) { await load(); await A.setPersistence(auth, remember ? A.browserLocalPersistence : A.browserSessionPersistence); const c = await A.signInWithEmailAndPassword(auth, email, pw); return user(c.user); },
      async signOut() { await load(); await A.signOut(auth); },
      async createSelf(email, pw) { await load(); const c = await A.createUserWithEmailAndPassword(auth, email, pw); return user(c.user); },
      async changeOwnPassword(oldPw, newPw) { await load(); const u = auth.currentUser; if (!u) throw Object.assign(new Error('not signed in'), { code: 'auth/requires-recent-login' }); await A.reauthenticateWithCredential(u, A.EmailAuthProvider.credential(u.email, oldPw)); await A.updatePassword(u, newPw); return true; },
      async deleteSelf() { await load(); if (auth.currentUser) await A.deleteUser(auth.currentUser); },
      async createAccount(email, pw) { await load(); return withSecondary(async () => (await A.createUserWithEmailAndPassword(secAuth, email, pw)).user.uid); },
      async changePassword(email, oldPw, newPw) { await load(); return withSecondary(async () => { const c = await A.signInWithEmailAndPassword(secAuth, email, oldPw); await A.updatePassword(c.user, newPw); return true; }); },
      async deleteAccount(email, pw) { await load(); return withSecondary(async () => { try { const c = await A.signInWithEmailAndPassword(secAuth, email, pw); await A.deleteUser(c.user); } catch (e) { if (!/user-not-found|invalid-credential/.test(e.code || '')) throw e; } return true; }); },
      async get(c, id) { await load(); const s = await F.getDoc(F.doc(fs, c, id)); return s.exists() ? s.data() : null; },
      async set(c, id, data, merge) { await load(); await F.setDoc(F.doc(fs, c, id), data, { merge: !!merge }); return true; },
      async del(c, id) { await load(); await F.deleteDoc(F.doc(fs, c, id)); return true; },
      async list(c, field, val) { await load(); const q = field ? F.query(F.collection(fs, c), F.where(field, '==', val)) : F.collection(fs, c); const s = await F.getDocs(q); return s.docs.map((d) => Object.assign({ id: d.id }, d.data())); },
    };
  }

  const B = ON ? (MOCK ? mockBackend() : firebaseBackend()) : null;
  const errMsg = (e) => {
    const c = (e && e.code) || '';
    if (/invalid-credential|wrong-password|user-not-found|invalid-email|invalid-login/.test(c)) return t('e_bad');
    if (/too-many-requests/.test(c)) return t('e_many');
    if (/network|unavailable/.test(c)) return t('e_net');
    if (/weak-password/.test(c)) return t('e_weak');
    if (/api-key|configuration|invalid-api|app-deleted|project/.test(c)) return t('e_cfg');
    return (e && e.message) || String(e);
  };

  /* ================= SESSION & PROGRESS SYNC ================= */
  let me = null; // {uid, login, name, role, cls}
  let pushT = null, dirty = false, syncBlocked = false, warned = false;
  // localStorage: maxfiy rejim yoki to'lgan xotirada xato bermasin
  const LS = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del: (k) => { try { localStorage.removeItem(k); } catch (e) { } },
  };
  const BAK = (uid) => 'zk_prog_bak_' + uid; // chiqishda serverga yetib bormagan natijalar zaxirasi
  function parse(j) { try { return j ? JSON.parse(j) : null; } catch (e) { return null; } }
  function readLocal() { return parse(LS.get(PKEY)); }
  // Ikki nusxani birlashtirish (hech biri yo'qolmasin): son — kattasi, ha/yo'q — "ha", ro'yxat — birlashma,
  // obyekt — ichma-ich, matn — mahalliy (shu qurilmadagi oxirgi holat).
  function mergeProg(a, b) {
    if (a == null) return b; if (b == null) return a;
    if (typeof a === 'number' && typeof b === 'number') return Math.max(a, b);
    if (typeof a === 'boolean' || typeof b === 'boolean') return !!(a || b);
    if (Array.isArray(a) && Array.isArray(b)) return [...new Set([...a, ...b])];
    if (typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
      const o = {}; new Set([...Object.keys(a), ...Object.keys(b)]).forEach((k) => (o[k] = mergeProg(a[k], b[k]))); return o;
    }
    return a === '' ? b : a;
  }
  function summary(s) {
    const L = s.L || {}; const g = { g6: 0, g7: 0, g8: 0 }; let qs = 0, qn = 0, vis = 0;
    Object.entries(L).forEach(([k, v]) => { if (v.v) vis++; const gg = k.split('-')[0]; if (v.done && g[gg] != null) g[gg]++; if (v.best) { qs += Number(v.best) || 0; qn++; } });
    return { xp: Math.max(0, Number(s.xp) || 0), done6: g.g6, done7: g.g7, done8: g.g8, quizAvg: qn ? Math.round((qs / qn) * 10) / 10 : null, quizN: qn, labs: Object.keys(s.labs || {}).length, visited: vis, last: String(s.last || '').slice(0, 20) };
  }
  // Server nusxasini qayta o'qib, mahalliy natija bilan birlashtiradi (o'qish muvaffaqiyatsiz bo'lsa — false)
  async function resync() {
    let remote; try { remote = await B.get('progress', me.uid); } catch (e) { return false; }
    const local = (window.XP && XP.s) || readLocal();
    const merged = mergeProg(local, parse(remote && remote.data));
    if (merged) { LS.set(PKEY, JSON.stringify(merged)); try { window.dispatchEvent(new Event('zk:prog-merged')); } catch (e) { } }
    syncBlocked = false; return true;
  }
  // Natijani serverga yuborish. Muvaffaqiyatli bo'lsa (yoki yuboradigan narsa bo'lmasa) — true.
  async function push() {
    if (!me) return true;
    if (!dirty && LS.get('zk_dirty') !== me.uid) return true;
    if (syncBlocked && !(await resync())) { dirty = true; return false; } // server nusxasini ko'rmay turib ustidan yozilmaydi
    const s = (window.XP && XP.s) || readLocal(); if (!s) { dirty = false; return true; }
    dirty = false;
    try {
      await B.set('progress', me.uid, Object.assign({ data: JSON.stringify(s), updated: Date.now(), login: String(me.login || '').slice(0, 80), name: String(me.name || '').slice(0, 120), cls: String(me.cls || '').slice(0, 40), role: me.role } /* qoidalardagi chegaralar: uzun ism sinxronlashni to'xtatmasin */, summary(s)));
      LS.del('zk_dirty'); return true;
    } catch (e) {
      dirty = true; LS.set('zk_dirty', me.uid); console.warn('progress push failed', e);
      if (!warned && window.XP && XP.toast) { warned = true; XP.toast('⚠ ' + t('sync_fail'), 'warn'); }
      return false;
    }
  }
  function schedule() { dirty = true; if (me) LS.set('zk_dirty', me.uid); clearTimeout(pushT); pushT = setTimeout(push, 2500); }
  window.addEventListener('zk:save', () => { if (me) schedule(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') push(); });
  window.addEventListener('pagehide', push);
  window.addEventListener('online', push);

  async function startSession(u) {
    // Tezlik: profil va natijalar bir vaqtda so'raladi. Natijani o'qish XATOSI "natija yo'q" bilan adashtirilmaydi:
    // aks holda bo'sh natija serverdagi eski natijaning ustidan yozilib, XP yo'qolardi.
    let readOk = true;
    const [prof, remote] = await Promise.all([B.get('users', u.uid), B.get('progress', u.uid).catch(() => { readOk = false; return null; })]);
    if (!prof || prof.disabled) { await B.signOut(); throw Object.assign(new Error(t('e_inactive')), { code: 'inactive' }); }
    if (prof.status === 'pending') { await B.signOut(); throw Object.assign(new Error(t('e_pending')), { code: 'pending' }); }
    me = { uid: u.uid, login: prof.login || u.email.split('@')[0], name: prof.name || '', role: prof.role || 'student', cls: prof.cls || '', sub: prof.sub || null, subs: prof.subs || null, subjects: Array.isArray(prof.subjects) ? prof.subjects : null };
    const sameOwner = LS.get('zk_prog_owner') === u.uid;
    let local = sameOwner ? readLocal() : null; // boshqa odamning natijasi qolib ketmasin
    const bak = parse(LS.get(BAK(u.uid))); if (bak) local = mergeProg(local, bak);
    const remoteData = parse(remote && remote.data);
    const merged = mergeProg(local, remoteData);
    if (merged) LS.set(PKEY, JSON.stringify(merged)); else LS.del(PKEY);
    LS.set('zk_prog_owner', u.uid); LS.del(BAK(u.uid));
    syncBlocked = !readOk;
    // Mahalliy nusxada serverda yo'q narsa bo'lsa — yuboriladi
    if (local && JSON.stringify(merged) !== JSON.stringify(remoteData)) { dirty = true; LS.set('zk_dirty', u.uid); setTimeout(push, 4000); }
    return me;
  }

  /* ================= SAYT SOZLAMALARI (settings/site) ================= */
  // { announce, announceOn, regOpen } — administrator panelidan o'zgartiriladi, hamma (kirmaganlar ham) o'qiy oladi.
  let SITE = {};
  async function loadSettings() { try { SITE = (await B.get('settings', 'site')) || {}; } catch (e) { SITE = {}; } return SITE; }
  const annText = () => (SITE.announceOn && SITE.announce ? String(SITE.announce) : '');
  const annHtml = () => (annText() ? `<div class="ann">📢 ${esc(annText())}</div>` : '');
  function applySettings(s) {
    if (s) SITE = Object.assign({}, SITE, s);
    css();
    let b = document.getElementById('zkAnn'); const txt = annText();
    const key = 'zk_ann_hide_' + txt.length + '_' + txt.slice(0, 20);
    if (!txt || sessionStorage.getItem(key)) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('div'); b.id = 'zkAnn'; const h = document.querySelector('header.top'); if (h) h.after(b); else document.body.prepend(b); }
    b.innerHTML = `<div class="wrap"><span>📢 ${esc(txt)}</span><button type="button" aria-label="${t('ann_close')}">✕</button></div>`;
    b.querySelector('button').onclick = () => { sessionStorage.setItem(key, '1'); b.remove(); };
  }

  /* ================= LOGIN SCREEN ================= */
  function css() {
    if (document.getElementById('zkAuthCss')) return;
    const st = document.createElement('style'); st.id = 'zkAuthCss';
    st.textContent = `
.zk-gate{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:20px;overflow:auto;background:radial-gradient(1200px 600px at 10% -10%,#ffe0c2 0,transparent 60%),radial-gradient(900px 600px at 110% 110%,#e7dcff 0,transparent 55%),#fff8ef;font-family:var(--f,Nunito,system-ui,sans-serif)}
.zk-gate .card{width:min(420px,100%);background:#fff;border:2px solid #f1e4d3;border-radius:26px;box-shadow:0 6px 0 #f1e4d3,0 30px 60px -30px rgba(120,60,0,.25);padding:28px 26px 24px;position:relative}
.zk-gate .lg{display:flex;align-items:center;gap:12px;margin-bottom:18px;padding-right:78px}.zk-gate .mk{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;font-size:28px;background:linear-gradient(135deg,#ff7a1a,#ff4d8d);box-shadow:0 4px 0 #d9560b}
.zk-gate h1{margin:0;font-size:24px;font-weight:900;color:#1f1a2e;line-height:1.1}.zk-gate .sb{font-size:13px;color:#8a7f73;font-weight:700;margin-top:3px}
.zk-gate label{display:block;font-weight:800;font-size:13.5px;color:#4b4256;margin:14px 0 6px}
.zk-gate .in{position:relative}.zk-gate input[type=text],.zk-gate input[type=password]{width:100%;box-sizing:border-box;border:2px solid #eadfce;border-radius:14px;padding:13px 44px 13px 14px;font:700 16px var(--f,Nunito,system-ui);background:#fffdf9;color:#1f1a2e;outline:none;transition:border-color .15s,box-shadow .15s}
.zk-gate input:focus{border-color:#ff7a1a;box-shadow:0 0 0 4px #ffe3cc}
.zk-gate .eye{position:absolute;right:6px;top:50%;transform:translateY(-50%);border:0;background:none;font-size:19px;padding:6px 8px;cursor:pointer;opacity:.7}
.zk-gate .rm{display:flex;align-items:center;gap:8px;margin:14px 0 4px;font-weight:700;font-size:13.5px;color:#5b5266;cursor:pointer}.zk-gate .rm input{width:18px;height:18px;accent-color:#ff7a1a}
.zk-gate .go{width:100%;margin-top:16px;border:0;border-radius:16px;padding:14px;font:900 17px var(--f,Nunito,system-ui);color:#fff;background:#ff7a1a;box-shadow:0 5px 0 #d9560b;cursor:pointer;transition:transform .1s,box-shadow .1s}
.zk-gate .go:active{transform:translateY(3px);box-shadow:0 2px 0 #d9560b}.zk-gate .go[disabled]{opacity:.6;cursor:wait}
.zk-gate .alt{width:100%;margin-top:10px;border:2px dashed #c9b8a5;border-radius:14px;padding:11px;font:800 14px var(--f,Nunito,system-ui);background:#fffaf3;color:#8a4b12;cursor:pointer}
.zk-gate .er{margin-top:12px;background:#fff0f0;border:2px solid #ffd2d2;color:#c0262d;border-radius:12px;padding:10px 12px;font-weight:800;font-size:13.5px;display:none}.zk-gate .er.on{display:block}
.zk-gate .nt{margin-top:10px;font-size:12.5px;color:#7a6f66;font-weight:700}
.zk-gate .ht{margin-top:16px;text-align:center;font-size:13px;color:#8a7f73;font-weight:700}
.zk-gate .lng{position:absolute;top:18px;right:18px;display:flex;background:#fff3e6;border-radius:11px;padding:3px}.zk-gate .lng button{border:0;background:none;padding:5px 9px;border-radius:8px;font:800 12.5px var(--f,Nunito);color:#8a7f73;cursor:pointer}.zk-gate .lng button.on{background:#fff;color:#d9560b;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.zk-gate .sw{margin-top:12px;text-align:center;font-weight:800;font-size:14px;color:#5b5266}.zk-gate .lnk{border:0;background:none;color:#d9560b;font:900 14px var(--f,Nunito);cursor:pointer;text-decoration:underline;padding:2px}
.zk-gate .rh{margin:6px 0 0;font-size:20px;font-weight:900;color:#1f1a2e}.zk-gate .sent{text-align:center;padding:6px 0 4px}.zk-gate .sent .big{font-size:52px}.zk-gate .sent p{color:#5b5266;font-weight:700;line-height:1.5}.zk-gate .kv{background:#fff7ec;border-radius:12px;padding:10px;font-weight:800}.zk-gate .kv code{font-size:16px}
.zk-gate .ann{background:#fff7e0;border:2px solid #fde68a;color:#854d0e;border-radius:14px;padding:10px 12px;font-weight:800;font-size:13.5px;margin:4px 0 6px;line-height:1.45}
#zkAnn{background:#fff7e0;border-bottom:2px solid #fde68a;color:#854d0e;font-weight:800;font-size:14px}#zkAnn .wrap{display:flex;gap:10px;align-items:center;padding-top:9px;padding-bottom:9px}#zkAnn span{flex:1;line-height:1.4}#zkAnn button{border:0;background:none;color:#854d0e;font-size:16px;cursor:pointer;padding:4px 8px}
.zk-gate .mockb{margin-top:14px;text-align:center;font-size:12px;font-weight:800;color:#6d28d9;background:#f3ecff;border-radius:10px;padding:6px}
.zk-gate.boot .card{text-align:center;padding:40px 26px}.zk-gate .spin{width:34px;height:34px;border:4px solid #ffe0c2;border-top-color:#ff7a1a;border-radius:50%;margin:0 auto 12px;animation:zkspin .8s linear infinite}@keyframes zkspin{to{transform:rotate(360deg)}}
.uchip{position:relative}.uchip>button{display:flex;align-items:center;gap:8px;border:2px solid var(--line,#f1e4d3);background:#fff;border-radius:14px;padding:4px 10px 4px 4px;font:800 13.5px var(--f,Nunito);color:#1f1a2e;cursor:pointer;max-width:190px}
.uchip .av{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;color:#fff;font-weight:900;font-size:14px;background:linear-gradient(135deg,#8b5cf6,#ec4899);flex:none}
.uchip .nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.uchip .mn{position:absolute;right:0;top:calc(100% + 8px);min-width:220px;background:#fff;border:2px solid var(--line,#f1e4d3);border-radius:16px;box-shadow:0 18px 40px -16px rgba(0,0,0,.25);padding:8px;display:none;z-index:60}
.uchip.open .mn{display:block}.uchip .mn .who{padding:8px 10px 10px;border-bottom:2px solid #f6eee3;margin-bottom:6px}.uchip .mn .who b{display:block;font-size:15px}.uchip .mn .who small{color:#8a7f73;font-weight:700}
.uchip .mn a,.uchip .mn button{display:flex;gap:10px;align-items:center;width:100%;text-align:left;border:0;background:none;padding:10px;border-radius:10px;font:800 14px var(--f,Nunito);color:#1f1a2e;cursor:pointer;text-decoration:none}
.uchip .mn a:hover,.uchip .mn button:hover{background:#fff3e6}
.zk-mockbar{position:fixed;left:10px;bottom:10px;z-index:70;background:#6d28d9;color:#fff;font:800 11.5px var(--f,Nunito);padding:5px 10px;border-radius:99px;opacity:.85;pointer-events:none}
.uchip .nm{display:none}.uchip>button{padding:3px}
@media (min-width:1581px){header.top .wrap:has(.uchip) .search input{width:180px}}
@media (min-width:961px) and (max-width:1100px){header.top .wrap:has(.uchip) .search input{width:84px}header.top .wrap:has(.uchip){gap:8px}}
@media (max-width:760px){.zk-mockbar{bottom:calc(76px + env(safe-area-inset-bottom))}}
`;
    document.head.appendChild(st);
  }

  function gate(resolve) {
    css();
    const el = document.createElement('div'); el.className = 'zk-gate'; document.body.appendChild(el);
    // Kirish oynasi modal: orqadagi sayt klaviatura va ekran o'quvchidan yashiriladi
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', lang() === 'en' ? 'Sign in' : 'Kirish');
    const BG = 'header.top,#app,#bnav,footer,#zkSkip';
    document.querySelectorAll(BG).forEach((n) => n.setAttribute('inert', ''));
    const closeGate = () => { document.querySelectorAll(BG).forEach((n) => n.removeAttribute('inert')); el.remove(); };
    let mode = 'login';
    const themeBtn = '<button type="button" class="zk-theme zk-gate-theme" aria-pressed="false" aria-label="Tungi rejimga o‘tish"><svg class="zk-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="zk-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>';
    const langBar = (L) => themeBtn + `<div class="lng"><button type="button" data-l="uz" class="${L === 'uz' ? 'on' : ''}">UZ</button><button type="button" data-l="en" class="${L === 'en' ? 'on' : ''}">EN</button></div>`;
    const head = () => `<div class="lg"><span class="mk zk-mk-mark"><img src="assets/zukko-mark.svg" alt="" width="139" height="314" decoding="async"></span><div><span class="zk-brand-kicker">${lang() === 'en' ? 'ZUKKO ACADEMY' : 'ZUKKO AKADEMIYASI'}</span><h1>${lang() === 'en' ? 'Welcome back' : 'Xush kelibsiz!'}</h1><div class="sb">${t('sub')}</div></div></div>`;
    const render = (keep) => {
      const L = lang(); const v = keep || {};
      el.setAttribute('aria-label', L === 'en' ? (mode === 'reg' ? 'Sign up' : 'Sign in') : (mode === 'reg' ? "Ro'yxatdan o'tish" : 'Kirish'));
      if (mode === 'reg') return renderReg(v);
      if (mode === 'sent') return renderSent(v);
      el.innerHTML = `<form class="card" autocomplete="on" novalidate>
        ${langBar(L)}${head()}${annHtml()}
        <label for="zkL">${t('login')}</label><div class="in"><input id="zkL" type="text" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" inputmode="email" value="${esc(v.l || '')}"></div>
        <label for="zkP">${t('pass')}</label><div class="in"><input id="zkP" type="password" name="password" autocomplete="current-password" value="${esc(v.p || '')}"><button type="button" class="eye" aria-label="${lang() === 'en' ? 'Show password' : 'Parolni ko‘rsatish'}" aria-pressed="false">◉</button></div>
        <label class="rm"><input type="checkbox" id="zkR" ${v.r === false ? '' : 'checked'}> ${t('remember')}</label>
        <button class="go" type="submit">${t('enter')}</button>
        <div class="er" id="zkE" role="alert"></div><div id="zkX"></div>
        <div class="ht">${t('hint')}</div>
        ${SITE.regOpen === false ? '' : `<div class="sw">${t('no_acc')} <button type="button" class="lnk" data-reg>${t('reg_go')}</button></div>`}
        ${MOCK ? `<div class="mockb">🧪 ${t('mock')}</div>` : ''}
      </form>`;
      const f = el.querySelector('form'), iL = el.querySelector('#zkL'), iP = el.querySelector('#zkP'), iR = el.querySelector('#zkR'), E = el.querySelector('#zkE'), X = el.querySelector('#zkX'), go = el.querySelector('.go');
      const showErr = (m) => { E.textContent = m; E.classList.toggle('on', !!m); };
      el.querySelectorAll('.lng button').forEach((b) => (b.onclick = () => { try { localStorage.setItem('zk_lang', b.dataset.l); } catch (e) { } render({ l: iL.value, p: iP.value, r: iR.checked }); }));
      el.querySelector('.eye').onclick = (e) => { iP.type = iP.type === 'password' ? 'text' : 'password'; e.currentTarget.setAttribute('aria-pressed', String(iP.type === 'text')); e.currentTarget.setAttribute('aria-label', iP.type === 'text' ? (lang() === 'en' ? 'Hide password' : 'Parolni yashirish') : (lang() === 'en' ? 'Show password' : 'Parolni ko‘rsatish')); };
      const rg = el.querySelector('[data-reg]'); if (rg) rg.onclick = () => { mode = 'reg'; render(); };
      // Avoid opening the on-screen keyboard automatically on phones.
      if (!matchMedia('(pointer:coarse)').matches) (v.l ? iP : iL).focus();
      const busy = (b) => { go.disabled = b; go.textContent = b ? t('loading') : t('enter'); };
      f.onsubmit = async (ev) => {
        ev.preventDefault(); showErr(''); X.innerHTML = '';
        const login = normLogin(iL.value), pw = iP.value;
        if (!login || !pw) return showErr(t('e_empty'));
        busy(true);
        try {
          const u = await B.signIn(emailOf(login), pw, iR.checked);
          await startSession(u); closeGate(); resolve(me);
        } catch (e) {
          busy(false); showErr(e.code === 'inactive' || e.code === 'pending' ? e.message : errMsg(e));
          if (login === 'admin' && /invalid-credential|user-not-found|wrong-password/.test(e.code || '')) {
            X.innerHTML = `<div class="nt">${t('mk_admin_q')}</div><button type="button" class="alt">🛡 ${t('mk_admin')}</button>`;
            X.querySelector('.alt').onclick = async () => {
              if (pw.length < 6) return showErr(t('e_weak'));
              busy(true); showErr('');
              try {
                const u = await B.createSelf(emailOf('admin'), pw);
                await B.set('users', u.uid, { login: 'admin', name: 'Administrator', role: 'admin', cls: '', created: Date.now() });
                await startSession(u); closeGate(); resolve(me);
              } catch (e2) { busy(false); showErr(/email-already-in-use/.test(e2.code || '') ? t('e_exists') : errMsg(e2)); }
            };
          }
        }
      };
    };
    function renderReg(v) {
      const L = lang();
      if (SITE.regOpen === false) { mode = 'login'; return render({ l: v.l }); }
      el.innerHTML = `<form class="card" autocomplete="on" novalidate>
        ${langBar(L)}${head()}
        <h2 class="rh">${t('reg_h')}</h2><div class="nt" style="margin-top:2px">${t('reg_p')}</div>
        <label for="zkN">${t('r_name')}</label><div class="in"><input id="zkN" type="text" autocomplete="name" placeholder="${t('r_name_ph')}" value="${esc(v.n || '')}"></div>
        <label for="zkC">${t('r_code')}</label><div class="in"><input id="zkC" type="text" autocapitalize="characters" spellcheck="false" placeholder="K4M9Q2" value="${esc(v.c || '')}" style="text-transform:uppercase;letter-spacing:.12em"></div>
        <label for="zkL">${t('r_login')}</label><div class="in"><input id="zkL" type="text" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="vali.a" value="${esc(v.l || '')}"></div>
        <div class="nt" style="margin-top:4px">${t('r_login_h')}</div>
        <label for="zkP">${t('pass')}</label><div class="in"><input id="zkP" type="password" name="new-password" autocomplete="new-password" value="${esc(v.p || '')}"><button type="button" class="eye" aria-label="${lang() === 'en' ? 'Show password' : 'Parolni ko‘rsatish'}" aria-pressed="false">◉</button></div>
        <label for="zkP2">${t('r_pass2')}</label><div class="in"><input id="zkP2" type="password" autocomplete="new-password" value="${esc(v.p2 || '')}"></div>
        <button class="go" type="submit">${t('reg_btn')}</button>
        <div class="er" id="zkE" role="alert"></div>
        <div class="sw">${t('have_acc')} <button type="button" class="lnk" data-login>${t('enter')}</button></div>
        ${MOCK ? `<div class="mockb">🧪 ${t('mock')}</div>` : ''}
      </form>`;
      const q = (s) => el.querySelector(s);
      const iN = q('#zkN'), iC = q('#zkC'), iL = q('#zkL'), iP = q('#zkP'), iP2 = q('#zkP2'), E = q('#zkE'), go = q('.go');
      const keepV = () => ({ n: iN.value, c: iC.value, l: iL.value, p: iP.value, p2: iP2.value });
      const showErr = (m) => { E.textContent = m; E.classList.toggle('on', !!m); };
      el.querySelectorAll('.lng button').forEach((b) => (b.onclick = () => { try { localStorage.setItem('zk_lang', b.dataset.l); } catch (e) { } renderReg(keepV()); }));
      q('.eye').onclick = (e) => { iP.type = iP2.type = iP.type === 'password' ? 'text' : 'password'; e.currentTarget.setAttribute('aria-pressed', String(iP.type === 'text')); e.currentTarget.setAttribute('aria-label', iP.type === 'text' ? (lang() === 'en' ? 'Hide password' : 'Parolni yashirish') : (lang() === 'en' ? 'Show password' : 'Parolni ko‘rsatish')); };
      q('[data-login]').onclick = () => { mode = 'login'; render({ l: iL.value }); };
      if (!matchMedia('(pointer:coarse)').matches) iN.focus();
      const busy = (b) => { go.disabled = b; go.textContent = b ? t('loading') : t('reg_btn'); };
      q('form').onsubmit = async (ev) => {
        ev.preventDefault(); showErr('');
        const name = iN.value.trim().replace(/\s+/g, ' '), code = iC.value.toUpperCase().replace(/[^A-Z0-9]/g, ''), login = normLogin(iL.value), pw = iP.value;
        if (name.length < 3 || !/\s/.test(name)) return showErr(t('e_r_name'));
        if (code.length < 4) return showErr(t('e_r_code'));
        if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(login) || login === 'admin') return showErr(t('e_r_login'));
        if (pw.length < 6) return showErr(t('e_weak'));
        if (pw !== iP2.value) return showErr(t('e_r_pass2'));
        busy(true);
        let created = null;
        try {
          const c = await B.get('classes', code);
          if (!c || !c.active) { busy(false); return showErr(t('e_r_code')); }
          try { created = await B.createSelf(emailOf(login), pw); }
          catch (e) { busy(false); return showErr(/email-already-in-use/.test(e.code || '') ? t('e_r_taken') : errMsg(e)); }
          await B.set('users', created.uid, { login, name, role: 'student', cls: c.cls, status: 'pending', code, created: Date.now(), self: true });
          await B.set('secrets', created.uid, { pw, role: 'student', login });
          await B.signOut();
          mode = 'sent'; render({ l: login, cls: c.cls, n: name });
        } catch (e) {
          if (created) { try { await B.deleteSelf(); } catch (e2) { } try { await B.signOut(); } catch (e3) { } }
          busy(false); showErr(errMsg(e));
        }
      };
    }
    function renderSent(v) {
      el.innerHTML = `<div class="card">${langBar(lang())}${head()}
        <div class="sent"><div class="big">📨</div><h2 class="rh">${t('sent_h')}</h2>
        <p>${t('sent_p').replace('{n}', esc(v.n || '')).replace('{c}', esc(v.cls || ''))}</p>
        <div class="kv"><span>${t('login')}:</span> <code>${esc(v.l || '')}</code></div></div>
        <button class="go" type="button" data-back>${t('sent_back')}</button></div>`;
      el.querySelectorAll('.lng button').forEach((b) => (b.onclick = () => { try { localStorage.setItem('zk_lang', b.dataset.l); } catch (e) { } renderSent(v); }));
      el.querySelector('[data-back]').onclick = () => { mode = 'login'; render({ l: v.l }); };
    }
    render();
  }

  /* ================= HEADER CHIP ================= */
  function chip() {
    if (!me) return;
    css();
    const host = document.querySelector('header.top .wrap'); if (!host) return;
    let c = document.getElementById('uchip');
    if (!c) { c = document.createElement('div'); c.className = 'uchip'; c.id = 'uchip'; const lg = host.querySelector('.lang'); host.insertBefore(c, lg || null); }
    const staff = me.role === 'teacher' || me.role === 'admin';
    const nm = me.name || me.login;
    c.innerHTML = `<button type="button" aria-haspopup="true" aria-expanded="false"><span class="av">${esc(nm.trim()[0] || '?').toUpperCase()}</span><span class="nm">${esc(nm)}</span></button>
      <div class="mn"><div class="who"><b>${esc(nm)}</b><small>${esc(me.login)} · ${t(me.role)}${me.cls ? ' · ' + esc(me.cls) : ''}</small></div>
      ${me.role === 'admin' ? `<a href="#admin">🛡 ${t('adm_panel')}</a>` : ''}${staff ? `<a href="#teacher">👩‍🏫 ${t('panel')}</a>` : ''}<a href="#me">🏆 ${lang() === 'en' ? 'My progress' : 'Mening yutuqlarim'}</a>
      <button type="button" data-out>🚪 ${t('logout')}</button></div>`;
    const ub = c.querySelector('button'), setOpen = (v) => { c.classList.toggle('open', v); ub.setAttribute('aria-expanded', String(v)); };
    ub.onclick = (e) => { e.stopPropagation(); setOpen(!c.classList.contains('open')); };
    c.onkeydown = (e) => { if (e.key === 'Escape' && c.classList.contains('open')) { e.stopPropagation(); setOpen(false); ub.focus(); } };
    c.querySelector('[data-out]').onclick = logout;
    c.querySelectorAll('.mn a').forEach((a) => (a.onclick = () => setOpen(false)));
    if (!chip._doc) { chip._doc = true; document.addEventListener('click', (e) => { const cc = document.getElementById('uchip'); if (cc && !cc.contains(e.target) && cc.classList.contains('open')) { cc.classList.remove('open'); const b = cc.querySelector('button'); if (b) b.setAttribute('aria-expanded', 'false'); } }); }
    applySettings();
    if (MOCK && !document.querySelector('.zk-mockbar')) { const m = document.createElement('div'); m.className = 'zk-mockbar'; m.textContent = '🧪 ' + t('mock'); document.body.appendChild(m); }
  }

  async function logout() {
    const ok = await push();
    if (!ok) {
      if (!confirm(t('logout_unsynced'))) return;
      // yuborilmagan natija shu qurilmada shu foydalanuvchi uchun zaxiralanadi va keyingi kirishda birlashtiriladi
      const cur = (window.XP && XP.s) || readLocal(); if (cur && me) LS.set(BAK(me.uid), JSON.stringify(cur));
    }
    try { await B.signOut(); } catch (e) { }
    LS.del(PKEY); LS.del('zk_prog_owner'); LS.del('zk_dirty'); LS.del('zk_hist'); // test tarixi keyingi foydalanuvchiga ko'rinmasin
    location.hash = '#home'; location.reload();
  }

  /* ================= PUBLIC ================= */
  let readyP = null;
  function ready() {
    if (readyP) return readyP;
    if (!ON) return (readyP = Promise.resolve(null));
    readyP = new Promise(async (resolve) => {
      css();
      const boot = document.createElement('div'); boot.className = 'zk-gate boot'; boot.innerHTML = `<div class="card" role="status" aria-live="polite"><div class="zk-brand-loader" aria-hidden="true"><img src="assets/zukko-mark.svg" width="139" height="314" alt="" decoding="sync"><span class="zk-brand-orbit"></span></div><b>${t('loading')}</b><p class="zk-boot-sub">${lang() === 'en' ? 'Zukko Academy · Chemistry' : 'Zukko Akademiyasi · Kimyo'}</p></div>`; document.body.appendChild(boot);
      let u = null;
      let setP = null;
      try { u = await B.init(); setP = loadSettings(); if (!u) await setP; } catch (e) { boot.querySelector('.card').innerHTML = `<b>${t('e_cfg')}</b><div class="nt">${esc(e.message || e)}</div>`; return; }
      // Tezlik: sayt sozlamalari va foydalanuvchi ma'lumotlari parallel yuklanadi.
      if (u) { try { await Promise.all([startSession(u), setP]); boot.remove(); return resolve(me); } catch (e) { await setP; /* login ekraniga */ } }
      boot.remove(); gate(resolve);
    });
    return readyP;
  }
  window.ZKAuth = {
    enabled: ON, mock: MOCK, domain: DOMAIN, ready, chip, logout, push, t, esc, normLogin, emailOf, errMsg, applySettings, get site() { return SITE; },
    get user() { return me; }, get backend() { return B; },
    isStaff: () => !!me && (me.role === 'teacher' || me.role === 'admin'), isAdmin: () => !!me && me.role === 'admin',
    // Obuna (lib/sub.js): pullik qismlar — obunali o'quvchi, o'qituvchi va admin uchun; kirishsiz rejimda hammasi ochiq
    canPaid: (subject) => (window.ZKSub ? ZKSub.canPaid(me, Date.now(), ON, subject) : true),
    subStatus: (subject) => (window.ZKSub ? ZKSub.status(ZKSub.subOf(me, subject), Date.now()) : { active: false, expired: false, plan: null, until: 0, daysLeft: 0 }),
    // O'qituvchiga biriktirilgan fanlar (admin — hammasi)
    mySubjects: () => (!me ? [] : me.role === 'admin' ? (window.ZKSubjects ? ZKSubjects.ids : ['chem']) : window.ZKSub ? ZKSub.teacherSubjects(me) : ['chem']),
  };
})();
