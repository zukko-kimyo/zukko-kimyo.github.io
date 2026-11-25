/* Zukko — o'qituvchi yuboradigan testlar (ADR-0009).
   O'qituvchi: test bazasi (yaratish, tahrir, nusxa, o'chirish), 1/2-variant, savol darajasi, rasm, formula (x^2, H_2O),
   ko'rib chiqish, sinf yoki o'quvchilarga yuborish (vaqt, sana oralig'i, urinishlar soni), real vaqt monitoringi, eksport.
   O'quvchi: real vaqt bildirishnoma → ogohlantirish → «Boshlash», server vaqti bo'yicha taymer, avtomatik saqlash,
   individual aralashtirilgan tartib, yakunlash; natijalar, statistika, xatolar ustida ishlash.
   Baholash — xodim brauzerida (javob kaliti o'quvchiga hech qachon yuborilmaydi). Server (Cloud Functions) yo'q:
   Firestore qoidalari server vaqtini (request.time) tekshiradi — muddatdan keyin javob qabul qilinmaydi. */
(function () {
  const A = () => window.ZKAuth, B = () => window.ZKAuth && ZKAuth.backend;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Formula: x^2 → x², H_2O → H₂O, x^{10}, a_{12}; kod emas — faqat matn
  const fx = (s) => esc(s).replace(/\^\{([^}]{1,12})\}|\^(-?\d{1,3}[+-]?|[a-zA-Z+-])/g, (m, a, b) => `<sup>${a || b}</sup>`).replace(/_\{([^}]{1,12})\}|_(\d{1,3})/g, (m, a, b) => `<sub>${a || b}</sub>`).replace(/\n/g, '<br>');
  const LV = { e: ['Oson', 'g'], m: ["O'rtacha", 'y'], h: ['Qiyin', 'r'] };
  const lvTag = (l) => `<span class="ex-lv ex-${(LV[l] || LV.m)[1]}">${(LV[l] || LV.m)[0]}</span>`;
  const grade = (p) => (p >= 80 ? ['Yaxshi', 'g'] : p >= 70 ? ["O'rtacha", 'y'] : ['Past', 'r']);
  const pctTag = (p) => `<span class="ex-pct ex-${grade(p)[1]}">${p}%</span>`;
  const bar = (p) => `<span class="ex-bar"><i class="ex-${grade(p)[1]}" style="width:${Math.max(0, Math.min(100, p))}%"></i></span>`;
  const fmtT = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const fmtD = (ms) => { if (!ms) return '—'; const d = new Date(ms); return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }); };
  const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const subjName = (id) => { if (id === 'chem') return 'Kimyo'; const s = window.ZKSubjects && ZKSubjects.get(id); return s ? (s.name && (s.name.uz || s.name)) || id : id || '—'; };
  const subjects = () => { const l = [['chem', 'Kimyo']]; try { (ZKSubjects.list || []).forEach((s) => l.push([s.id, subjName(s.id)])); } catch (e) { } const seen = {}; return l.filter(([id]) => (seen[id] ? 0 : (seen[id] = 1))); };
  // Urug'li tasodif: bir o'quvchi uchun tartib har safar bir xil (sahifa yangilansa ham)
  function rng(seed) { let h = 1779033703 ^ seed.length; for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; }
  function shuffled(n, r) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const toast = (m) => { let t = document.getElementById('exToast'); if (!t) { t = document.createElement('div'); t.id = 'exToast'; t.className = 'ex-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = m; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2600); };
  function modal(html, onMount) {
    const w = document.createElement('div'); w.className = 'ex-modal'; w.innerHTML = `<div class="ex-card" role="dialog" aria-modal="true">${html}</div>`;
    const close = () => { w.remove(); document.removeEventListener('keydown', key); };
    const key = (e) => { if (e.key === 'Escape') close(); };
    w.addEventListener('click', (e) => { if (e.target === w || e.target.closest('[data-x]')) close(); });
    document.addEventListener('keydown', key); document.body.appendChild(w);
    const f = w.querySelector('button, input, select, textarea'); if (f) f.focus();
    if (onMount) onMount(w, close); return close;
  }
  // Rasm: 900 px gacha kichraytirib, webp (hujjat 1 MB chegarasiga sig'sin)
  function shrink(file) {
    return new Promise((res, rej) => {
      const img = new Image(), url = URL.createObjectURL(file);
      img.onload = () => { const k = Math.min(1, 900 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); let d = c.toDataURL('image/webp', 0.78); if (!d.startsWith('data:image/webp')) d = c.toDataURL('image/jpeg', 0.8); res(d); };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('img')); }; img.src = url;
    });
  }

  // Firestore ichma-ich massivni saqlamaydi: variantlar [{qs:[...]}], kalitlar [{k:[...]}]
  const QS = (as, v) => ((as.vars || [])[v] || {}).qs || [];
  const KS = (key, v) => ((key.keys || [])[v] || {}).k || [];
  /* ================= BAHOLASH (xodim brauzerida) ================= */
  function gradeAttempt(at, as, key) {
    const v = at.v || 0, qs = QS(as, v), k = KS(key, v), ans = at.ans || {};
    let correct = 0, wrong = 0, blank = 0; const detail = [];
    qs.forEach((q, i) => { const g = ans[q.id]; const c = k[i]; if (g == null) blank++; else if (g === c) correct++; else wrong++; const d = { id: q.id, a: g == null ? null : g, ok: g != null && g === c }; if (as.reveal) d.c = c; detail.push(d); });
    const total = qs.length, end = Math.min(at.startedAt + as.dur * 60000, as.end);
    const pct = total ? Math.round((correct / total) * 1000) / 10 : 0;
    return { aid: as.id, uid: at.uid, n: at.n || 1, v, owner: as.owner, title: as.title, subj: as.subj, topic: as.topic || '', level: as.level || 'm', total, answered: correct + wrong, correct, wrong, blank, pct, spent: Math.max(0, (at.done && at.doneAt ? Math.min(at.doneAt, end) : end) - at.startedAt), reveal: !!as.reveal, detail, at: Date.now() };
  }
  const finished = (at, as, now) => at.done || now > Math.min(at.startedAt + as.dur * 60000 + 25000, as.end + 25000);
  async function gradeAll(as, atts, results) {
    const b = B(); const key = await b.get('examKeys', as.id); if (!key) return 0; let n = 0; const now = Date.now();
    for (const at of atts) {
      if (!finished(at, as, now)) continue;
      const r = results[at.id]; if (r && r.reveal === !!as.reveal && r.n === (at.n || 1) && r.answered + r.blank === r.total) continue;
      try { await b.set('examResults', at.id, gradeAttempt(at, as, key)); n++; } catch (e) { console.warn('grade', e); }
    }
    return n;
  }
  // Xodim saytni ochib tursa — fon rejimida har daqiqada o'z testlarini baholaydi
  let bgT = 0;
  async function bgGrade() {
    const a = A(); if (!a || !a.user || !a.isStaff()) return;
    try {
      const mine = await B().list('examAssign', 'owner', a.user.uid);
      for (const as of mine) { if (Date.now() - as.end > 7 * 864e5) continue; const atts = await B().list('examAttempts', 'aid', as.id); if (!atts.length) continue; const rs = {}; (await B().list('examResults', 'aid', as.id)).forEach((r) => { rs[r.id] = r; }); await gradeAll(as, atts, rs); }
    } catch (e) { console.warn('bgGrade', e); }
  }

  /* ================= SAVOL IMPORTI: saytdagi testlar va Excel/CSV ================= */
  const plain = (s) => String(s == null ? '' : typeof s === 'object' ? s.uz || s.en || s.ru || '' : s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
  const LVK = { easy: 'e', medium: 'm', hard: 'h' };
  // Sayt testidagi savol → o'qituvchi testi savoli (4 ta variant shart; tinglash savollari olinmaydi)
  function toQ(it) {
    if (!it || it.say || !Array.isArray(it.o) || !(it.a >= 0 && it.a < it.o.length)) return null;
    let o = it.o.map(plain), a = it.a; if (o.length < 4) return null;
    if (o.length > 4) { const keep = [a].concat(o.map((_, i) => i).filter((i) => i !== a).slice(0, 3)).sort((x, y) => x - y); a = keep.indexOf(a); o = keep.map((i) => o[i]); }
    const t = plain(it.q); if (!t || o.some((x) => !x) || new Set(o.map((x) => x.toLowerCase())).size < 4) return null;
    return { id: rid(), t, img: '', o, a, l: LVK[it.d] || 'm' };
  }
  const shuf = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function bankGrades(subj) { if (subj === 'chem') return [6, 7, 8].filter((g) => window.BOOKS && BOOKS['g' + g]); const s = window.ZKSubjects && ZKSubjects.get(subj); return s ? [...new Set(s.books.map((b) => b.grade))].sort((a, b) => a - b) : []; }
  function bankTopics(subj, g, part) {
    if (subj === 'chem') { const bk = window.BOOKS && BOOKS['g' + g]; return bk ? bk.lessons.map((L, i) => ({ n: i + 1, num: i + 1, t: plain(L.t && (L.t[0] || L.t)) })) : []; }
    const b = ZKSubjects.book(subj, g, part); return b ? b.topics.map((tp, i) => ({ n: i + 1, num: (b.first || 1) + i, t: plain(tp.uz || tp.t) + (tp.uz && tp.t && tp.uz !== tp.t ? ` (${plain(tp.t)})` : '') })) : [];
  }
  async function bankPool(subj, g, part, ns) {
    const P = { easy: [], medium: [], hard: [] }; let missing = 0;
    const add = (p) => ['easy', 'medium', 'hard'].forEach((d) => (p[d] || []).forEach((x) => P[d].push(Object.assign({}, x, { d }))));
    if (subj === 'chem') { if (!window.QB && window.ZKLazy) await ZKLazy.tests(); ns.forEach((n) => add(QB.pool('g' + g, n))); return { P, missing }; }
    const Ls = [];
    for (const n of ns) { try { const d = await B().get('lessons', `${subj}-${g}-${part}-${n}`); if (d && d.j) Ls.push(JSON.parse(d.j)); else missing++; } catch (e) { if (/permission/i.test(e.code || e.message || '')) throw Object.assign(new Error('perm'), { code: 'perm' }); missing++; } }
    if (!window.ZKSJQ) throw new Error('sjq');
    Ls.forEach((L) => add(ZKSJQ.pool(subj, L, Ls)));
    return { P, missing };
  }
  // Har darajadan kerakli son; yetmasa qo'shni darajadan; bir test ichida savol takrorlanmaydi
  function pickQs(P, counts, used) {
    const conv = {}; ['easy', 'medium', 'hard'].forEach((d) => { conv[d] = shuf(P[d]).map(toQ).filter(Boolean); });
    const out = [], fb = { easy: ['medium', 'hard'], medium: ['easy', 'hard'], hard: ['medium', 'easy'] };
    ['easy', 'medium', 'hard'].forEach((d) => { let need = counts[d] || 0;
      for (const src of [d].concat(fb[d])) { for (const q of conv[src]) { if (!need) break; const k = q.t.toLowerCase() + '|' + q.o[q.a].toLowerCase(); if (used.has(k)) continue; used.add(k); out.push(Object.assign(q, { l: LVK[d] })); need--; } if (!need) break; } });
    return out;
  }
  // ---- Excel (.xlsx) va CSV o'qish: tashqi kutubxonasiz (brauzerning DecompressionStream'i) ----
  async function unzip(buf) {
    const dv = new DataView(buf); let e = buf.byteLength - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--; if (e < 0) throw new Error('zip');
    const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true); const files = {}, td = new TextDecoder();
    for (let i = 0; i < n; i++) { const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true); files[td.decode(new Uint8Array(buf, p + 46, nl))] = { method, csize, off }; p += 46 + nl + el + cl; }
    const read = async (name, bin) => { const f = files[name]; if (!f) return null; const ln = dv.getUint16(f.off + 26, true), lx = dv.getUint16(f.off + 28, true); const data = new Uint8Array(buf, f.off + 30 + ln + lx, f.csize); if (f.method === 0) return bin ? new Blob([data]) : td.decode(data); if (f.method !== 8 || typeof DecompressionStream === 'undefined') throw new Error('zipm'); const r = new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))); return bin ? r.blob() : r.text(); };
    return { names: Object.keys(files), read };
  }
  async function readXlsx(buf) {
    const z = await unzip(buf), X = (s) => new DOMParser().parseFromString(s, 'application/xml');
    const ss = []; const sx = await z.read('xl/sharedStrings.xml'); if (sx) [...X(sx).getElementsByTagName('si')].forEach((si) => ss.push([...si.getElementsByTagName('t')].map((t) => t.textContent).join('')));
    const sheet = z.names.filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))[0];
    if (!sheet) throw new Error('sheet');
    const rows = [];
    [...X(await z.read(sheet)).getElementsByTagName('row')].forEach((r) => { const row = []; [...r.getElementsByTagName('c')].forEach((c) => { const ref = (c.getAttribute('r') || '').replace(/\d+/g, ''); let col = 0; for (const ch of ref) col = col * 26 + ch.charCodeAt(0) - 64; col = col ? col - 1 : row.length; const tp = c.getAttribute('t'); const v = c.getElementsByTagName('v')[0]; let val = tp === 's' ? ss[+(v && v.textContent)] : tp === 'inlineStr' ? [...c.getElementsByTagName('t')].map((t) => t.textContent).join('') : v ? v.textContent : ''; row[col] = val == null ? '' : val; }); rows[(+r.getAttribute('r') || rows.length + 1) - 1] = row; });
    return rows.filter(Boolean);
  }
  function parseCsv(txt) {
    txt = txt.replace(/^﻿/, ''); const first = txt.split(/\r?\n/)[0] || '';
    const d = [';', '\t', ','].map((c) => [c, first.split(c).length]).sort((a, b) => b[1] - a[1])[0][0];
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < txt.length; i++) { const ch = txt[i];
      if (q) { if (ch === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
      else if (ch === '"') q = true; else if (ch === d) { row.push(cur); cur = ''; } else if (ch === '\n' || ch === '\r') { if (ch === '\r' && txt[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; } else cur += ch; }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  const lvOf = (s) => { s = String(s || '').trim().toLowerCase(); return !s ? '' : /^(e|oson|easy|лёгк|легк|прост)/.test(s) ? 'e' : /^(h|qiyin|hard|трудн|сложн)/.test(s) ? 'h' : /^(m|o.?rta|medium|средн)/.test(s) ? 'm' : ''; };
  const ANS = { A: 0, B: 1, C: 2, D: 3, 'А': 0, 'Б': 1, 'В': 2, 'Г': 3 };
  // Ustunlar: Savol | A | B | C | D | To'g'ri javob (A–D, 1–4 yoki javob matni) | Daraja | Variant
  function rowsToQs(rows, defLv) {
    const out = [], bad = [];
    rows.forEach((r, i) => {
      r = (r || []).map((x) => String(x == null ? '' : x).trim()); if (!r.some(Boolean)) return;
      if (i === 0 && r.some((c) => /^(savol|savollar|question|вопрос|топшириқ|topshiriq)/i.test(c))) return;
      const [t, A1, B1, C1, D1, ans, lv, v] = r, o = [A1 || '', B1 || '', C1 || '', D1 || ''], s = String(ans || '').trim();
      let a = /^[1-4]$/.test(s) ? +s - 1 : s.length === 1 && ANS[s.toUpperCase()] != null ? ANS[s.toUpperCase()] : o.findIndex((x) => x && x.toLowerCase() === s.toLowerCase());
      const why = !t ? "savol matni yo'q" : o.some((x) => !x) ? "A, B, C, D javoblardan biri bo'sh" : a < 0 ? "to'g'ri javob ko'rsatilmagan (A, B, C yoki D yozing)" : '';
      if (why) { bad.push(`${i + 1}-qator: ${why}`); return; }
      out.push({ q: { id: rid(), t: t.slice(0, 1500), img: '', o: o.map((x) => x.slice(0, 400)), a, l: lvOf(lv) || defLv }, v: String(v || '').trim() === '2' ? 1 : String(v || '').trim() === '1' ? 0 : null });
    });
    return { out, bad };
  }
  // ---- Word (.docx): paragraflar, formatlash (qalin/rang/belgi), formulalar, rasmlar, avtomatik raqamlash ----
  async function readDocx(z) {
    const X = (s) => new DOMParser().parseFromString(s, 'application/xml');
    const kid = (el, n) => el && [...el.children].find((x) => x.tagName === n);
    const val = (el, n) => { const c = kid(el, n); return c ? c.getAttribute('w:val') || '' : null; };
    const rels = {}; const rx = await z.read('word/_rels/document.xml.rels');
    if (rx) [...X(rx).getElementsByTagName('Relationship')].forEach((r) => { rels[r.getAttribute('Id')] = r.getAttribute('Target'); });
    const nums = {}; const nx = await z.read('word/numbering.xml');
    if (nx) { const nd = X(nx), abs = {}; [...nd.getElementsByTagName('w:abstractNum')].forEach((a) => { const lv = {}; [...a.getElementsByTagName('w:lvl')].forEach((l) => { lv[l.getAttribute('w:ilvl')] = val(l, 'w:numFmt') || ''; }); abs[a.getAttribute('w:abstractNumId')] = lv; }); [...nd.getElementsByTagName('w:num')].forEach((n) => { nums[n.getAttribute('w:numId')] = abs[val(n, 'w:abstractNumId')] || {}; }); }
    const flags = (rPr) => { if (!rPr) return 0; let f = 0; const b = val(rPr, 'w:b'); if (b !== null && !/^(0|false|off)$/i.test(b)) f |= 1; const h = val(rPr, 'w:highlight'); if (h && h !== 'none') f |= 2; const sh = kid(rPr, 'w:shd'); if (sh && !/^(auto|ffffff|000000|)$/i.test(sh.getAttribute('w:fill') || '')) f |= 2; const c = val(rPr, 'w:color'); if (c && !/^(auto|000000|0d0d0d|1a1a1a|222222|262626|333333|404040|595959|1f1f1f)$/i.test(c)) f |= 4; const u = val(rPr, 'w:u'); if (u !== null && u !== 'none') f |= 8; return f; };
    const math = (el) => { let s = ''; for (const c of el.children) { const tn = c.tagName; if (tn === 'm:t') s += c.textContent; else if (tn === 'm:sSub') s += math(kid(c, 'm:e')) + '_{' + math(kid(c, 'm:sub')) + '}'; else if (tn === 'm:sSup') s += math(kid(c, 'm:e')) + '^{' + math(kid(c, 'm:sup')) + '}'; else if (tn === 'm:sSubSup') s += math(kid(c, 'm:e')) + '_{' + math(kid(c, 'm:sub')) + '}^{' + math(kid(c, 'm:sup')) + '}'; else if (tn === 'm:f') s += '(' + math(kid(c, 'm:num')) + ')/(' + math(kid(c, 'm:den')) + ')'; else if (tn === 'm:rad') s += '√(' + math(kid(c, 'm:e')) + ')'; else if (!/Pr$/.test(tn)) s += math(c); } return s; };
    const para = (p) => {
      let text = ''; const st = [], imgs = [];
      const add = (t, f) => { text += t; for (let i = 0; i < t.length; i++) st.push(f); };
      const run = (r) => { const rPr = kid(r, 'w:rPr'), f = flags(rPr), va = val(rPr, 'w:vertAlign');
        for (const c of r.children) { const tn = c.tagName;
          if (tn === 'w:t') { let t = c.textContent; if (t && va === 'subscript') t = '_{' + t + '}'; else if (t && va === 'superscript') t = '^{' + t + '}'; add(t, f); }
          else if (tn === 'w:tab' || tn === 'w:br' || tn === 'w:cr') add(' ', f);
          else if (tn === 'w:drawing' || tn === 'w:pict' || tn === 'w:object') { const bl = c.getElementsByTagName('a:blip')[0], im = c.getElementsByTagName('v:imagedata')[0]; const id = bl ? bl.getAttribute('r:embed') : im ? im.getAttribute('r:id') : null; if (id && rels[id]) imgs.push(rels[id]); } } };
      const walk = (el) => { for (const c of el.children) { const tn = c.tagName; if (tn === 'w:r') run(c); else if (tn === 'm:oMath' || tn === 'm:oMathPara') add(math(c), 0); else if (!/^w:(pPr|rPr|del|moveFrom|proofErr|bookmark)/.test(tn)) walk(c); } };
      walk(p);
      const np = kid(kid(p, 'w:pPr'), 'w:numPr'); let num = null;
      if (np) { const fmt = (nums[val(np, 'w:numId')] || {})[val(np, 'w:ilvl') || '0'] || ''; num = /letter|russian|aiueo|iroha/i.test(fmt) ? 'let' : /decimal|number|ordinal/i.test(fmt) ? 'dec' : null; }
      return { text, st, imgs, num };
    };
    const body = X(await z.read('word/document.xml')).getElementsByTagName('w:body')[0];
    const paras = [], grid = [];
    const block = (el) => { for (const c of el.children) { const tn = c.tagName;
      if (tn === 'w:p') paras.push(para(c));
      else if (tn === 'w:tbl') { const rows = [...c.children].filter((x) => x.tagName === 'w:tr').map((tr) => [...tr.children].filter((x) => x.tagName === 'w:tc'));
        const wide = rows.filter((r) => r.length >= 6).length;
        if (wide && wide >= rows.length - 1) { const cellRows = rows.map((r) => r.map((tc) => [...tc.getElementsByTagName('w:p')].map((p) => para(p).text).join(' ').trim()));
          const numCol = cellRows.filter((r) => r.length >= 7).length && cellRows.slice(1).filter((r) => /^\d+\.?$/.test(r[0] || '')).length >= Math.max(1, (cellRows.length - 1) / 2);
          cellRows.forEach((cells) => grid.push(numCol && cells.length >= 7 ? cells.slice(1) : cells)); }
        else rows.forEach((r) => r.forEach((tc) => block(tc))); }
      else if (tn === 'w:sdt') block(kid(c, 'w:sdtContent') || c); } };
    block(body);
    // rasmlar: kerak bo'lganda o'qiladi (EMF/WMF brauzerda ochilmaydi)
    const img = async (target) => { if (!target || /\.(emf|wmf)$/i.test(target)) return ''; const path = target.startsWith('/') ? target.slice(1) : 'word/' + target.replace(/^\.\//, ''); const b = await z.read(path, true); if (!b) return ''; try { return await shrink(b); } catch (e) { return ''; } };
    return { paras, grid, img };
  }
  // ---- PDF (matnli): pdf.js bilan qatorlarni tiklash; qalin shrift va pastki/yuqori indeks taniladi ----
  const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/';
  let pdfjsP = null;
  const loadPdfjs = () => pdfjsP || (pdfjsP = import(PDFJS + 'pdf.min.mjs').then((m) => { m.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.mjs'; return m; }).catch((e) => { pdfjsP = null; throw e; }));
  async function readPdf(buf) {
    const lib = await loadPdfjs(); const pdf = await lib.getDocument({ data: new Uint8Array(buf) }).promise;
    const paras = []; let chars = 0;
    for (let pn = 1; pn <= Math.min(pdf.numPages, 60); pn++) {
      const page = await pdf.getPage(pn); const tc = await page.getTextContent();
      const bold = {}; try { await page.getOperatorList(); } catch (e) { }
      const isBold = (fn) => { if (bold[fn] != null) return bold[fn]; let b = false; try { const f = page.commonObjs.has(fn) && page.commonObjs.get(fn); b = !!(f && /bold|black|heavy|semibold|demi/i.test(f.name || '')); } catch (e) { } return (bold[fn] = b); };
      const items = tc.items.filter((it) => it.str !== undefined && (it.str.trim() || it.str === ' ')).map((it) => ({ s: it.str, x: it.transform[4], y: it.transform[5], h: Math.abs(it.transform[3]) || it.height || 10, w: it.width || 0, b: isBold(it.fontName) }));
      const lines = [];
      items.forEach((it) => { const L = lines.find((l) => Math.abs(l.y - it.y) < Math.max(l.h, it.h) * 0.55); if (L) { L.it.push(it); if (it.h > L.h) { L.h = it.h; L.y = it.y; } } else lines.push({ y: it.y, h: it.h, it: [it] }); });
      lines.sort((a, b) => b.y - a.y).forEach((L) => {
        L.it.sort((a, b) => a.x - b.x); let text = '', st = [], end = null;
        L.it.forEach((it) => { let t = it.s; const small = it.h < L.h * 0.8 && t.trim();
          if (small && it.y > L.y + L.h * 0.15) t = '^{' + t.trim() + '}'; else if (small && it.y < L.y + L.h * 0.02) t = '_{' + t.trim() + '}';
          else if (end != null && it.x - end > L.h * 0.18 && !/\s$/.test(text) && !/^\s/.test(t)) { text += ' '; st.push(0); }
          text += t; for (let i = 0; i < t.length; i++) st.push(it.b ? 1 : 0); end = it.x + it.w; });
        chars += text.trim().length; paras.push({ text, st, imgs: [], num: null });
      });
    }
    return { paras, chars };
  }
  const LAT = 'ABCDE', CYR = 'АБВГД', LOOK = { A: 'А', B: 'В', C: 'С', E: 'Е' };
  const letIdx = (ch) => { ch = String(ch || '').toUpperCase(); const i = LAT.indexOf(ch); if (i >= 0) return i; const j = CYR.indexOf(ch); if (j >= 0) return j; const k = Object.values(LOOK).indexOf(ch); return k >= 0 ? LAT.indexOf(Object.keys(LOOK)[k]) : -1; };
  const STAR = /^\s*[*+#✓✔]\s*|\s*(\(\+\)|[*+✓✔])\s*$/;
  // Bir qatordagi javoblarni ajratish: «A) 2  B) 3  C) 4  D) 5» yoki «A. javob»
  function splitOpts(p) {
    const t = p.text, m0 = t.match(/^\s*([*+#✓✔]?)\s*([A-EА-Д])\s*(\)|\.|:|\s[-–]\s)\s*/i);
    if (!m0 || letIdx(m0[2]) < 0) return null;
    const sep = m0[3].trim() || '-', starts = [{ at: 0, body: m0[0].length, star: !!m0[1] }];
    let i = letIdx(m0[2]) + 1, from = m0[0].length;
    while (i < 5) { const cand = [LAT[i], CYR[i], LOOK[LAT[i]]].filter(Boolean).map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      const re = new RegExp(`(\\s)([*+#]?)\\s*(?:${cand})\\s*${sep === ')' ? '\\)' : sep === '.' ? '\\.' : sep === ':' ? ':' : '[-–]'}\\s*`, 'gi'); re.lastIndex = from; const m = re.exec(t);
      if (!m) break; starts.push({ at: m.index + 1, body: m.index + m[0].length, star: !!m[2] }); from = m.index + m[0].length; i++; }
    return starts.map((s, k) => { const end = k + 1 < starts.length ? starts[k + 1].at : t.length; let txt = t.slice(s.body, end); let star = s.star; if (STAR.test(txt)) { star = true; txt = txt.replace(STAR, ''); }
      const seg = p.st.slice(s.body, end).filter((_, j) => /\S/.test(t[s.body + j])); const all = (b) => seg.length > 0 && seg.every((f) => f & b), any = (b) => seg.some((f) => f & b);
      return { text: txt.trim(), star, b: all(1), hi: any(2), col: any(4), u: all(8) }; });
  }
  const KEYP = /(\d{1,3})\s*[-–.):=]?\s*([A-EА-Д])(?![A-Za-zА-Яа-я])/gi;
  const keyLine = (t) => { const m = [...t.matchAll(KEYP)]; return m.length >= 3 && t.replace(KEYP, '').replace(/[\s,;.|]/g, '').length <= 3 ? m : null; };
  function parseTestParas(paras, defLv) {
    const qs = [], key = {}, bad = []; let cur = null, keyMode = false, v = null;
    const setKey = (ms) => ms.forEach((m) => { const n = +m[1], a = letIdx(m[2]); if (a < 0) return; key[`${v}:${n}`] = a; if (key[`*:${n}`] == null) key[`*:${n}`] = a; });
    const close = () => { if (cur) qs.push(cur); cur = null; };
    for (const p of paras) {
      const text = p.text.replace(/ /g, ' ').replace(/\s+/g, ' ').trim(); if (!text && !p.imgs.length) continue;
      const vm = text.length < 45 && !/\?/.test(text) && text.match(/(?:^|\s)([12])\s*[-–]?\s*(?:variant|вариант)|(?:variant|вариант)\s*[-–№]?\s*([12])/i);
      if (vm && !/^\s*[A-EА-Д]\s*[).]/i.test(text)) { close(); v = +(vm[1] || vm[2]) - 1; const ms = [...text.replace(vm[0], ' ').matchAll(KEYP)]; if (ms.length) setKey(ms); keyMode = ms.length > 0 || /javob|kalit|ответ|ключ|answer/i.test(text); continue; }
      const kl = keyLine(text); if (kl) { close(); setKey(kl); continue; }
      if (text.length < 60 && !/\?/.test(text) && /^(to.?g.?ri\s+)?(javob|kalit|ответ|ключ|answer)/i.test(text)) { close(); keyMode = true; setKey([...text.matchAll(KEYP)]); continue; }
      if (keyMode) { const ms = [...text.matchAll(KEYP)]; if (ms.length && text.replace(KEYP, '').replace(/[\s,;.|]/g, '').length <= 6) { setKey(ms); continue; } keyMode = false; }
      let opts = splitOpts(Object.assign({}, p, { text: p.text.replace(/ /g, ' ').trim(), st: p.st.slice(p.text.length - p.text.replace(/^[\s ]+/, '').length) }));
      if (!opts && p.num === 'let' && cur && !/\?$/.test(text)) { let tx = text, star = false; if (STAR.test(tx)) { star = true; tx = tx.replace(STAR, ''); } const seg = p.st.filter((_, j) => /\S/.test(p.text[j])); opts = [{ text: tx.trim(), star, b: seg.length > 0 && seg.every((f) => f & 1), hi: seg.some((f) => f & 2), col: seg.some((f) => f & 4), u: seg.length > 0 && seg.every((f) => f & 8) }]; }
      if (opts) { if (!cur) { bad.push(`«${text.slice(0, 50)}» — savolsiz javob qatori`); continue; } opts.forEach((o) => cur.o.push(o)); if (!cur.img && p.imgs[0]) cur.img = p.imgs[0]; continue; }
      const m = text.match(/^\s*(\d{1,3})\s*[.)]\s*(?=\S)|^\s*(\d{1,3})\s+[-–]\s*/);
      if (m || p.num === 'dec' || !cur || cur.o.length >= 2) { close(); cur = { n: m ? +(m[1] || m[2]) : null, t: m ? text.slice(m[0].length) : text, o: [], img: p.imgs[0] || null, v }; }
      else if (!cur.o.length) { cur.t += '\n' + text; if (!cur.img && p.imgs[0]) cur.img = p.imgs[0]; }
      else cur.o[cur.o.length - 1].text += ' ' + text;
    }
    close();
    const out = []; let nokey = 0, auto = 0;
    qs.filter((q) => q.o.length).forEach((q, i) => { // javobsiz qatorlar (sarlavha, «Ism: ___») savol emas
      const n = q.n || i + 1, label = `${n}-savol`;
      if (!q.t.trim() && !q.img) { bad.push(`${label}: savol matni yo'q`); return; }
      if (q.o.length < 4) { bad.push(`${label}: ${q.o.length} ta javob (A, B, C, D kerak)`); return; }
      let a = key[`${q.v}:${n}`] ?? key[`null:${n}`] ?? key[`*:${n}`];
      if (a == null || a >= q.o.length) { a = null; for (const f of ['star', 'hi', 'col', 'b', 'u']) { const hit = q.o.map((o, j) => (o[f] ? j : -1)).filter((j) => j >= 0); if (hit.length === 1) { a = hit[0]; break; } } }
      let o = q.o.map((x) => x.text);
      if (o.length > 4) { const keep = [a == null ? 0 : a].concat(o.map((_, j) => j).filter((j) => j !== (a == null ? 0 : a)).slice(0, 3)).sort((x, y) => x - y); if (a != null) a = keep.indexOf(a); o = keep.map((j) => o[j]); }
      if (o.some((x) => !x)) { bad.push(`${label}: javoblardan biri bo'sh`); return; }
      const tidy = (s) => s.replace(/\}_\{/g, '').replace(/\}\^\{/g, '').slice(0, 1500);
      const nk = a == null; if (nk) nokey++; else auto++;
      out.push({ q: { id: rid(), t: tidy(q.t.trim()), img: '', o: o.map((x) => tidy(x).slice(0, 400)), a: nk ? 0 : a, l: defLv, nk: nk || undefined }, v: q.v, imgRef: q.img });
    });
    return { out, bad, nokey };
  }
  function downloadTemplate() {
    const lines = ["Savol;A;B;C;D;To'g'ri javob;Daraja;Variant", 'Suvning formulasi qaysi?;H_2O;CO_2;O_2;NaCl;A;oson;1', '2 + 3 nechaga teng?;4;5;6;7;B;o\'rtacha;1', 'x^2 = 9 bo\'lsa, musbat x = ?;1;3;9;81;3;qiyin;2'];
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'test-namunasi.csv'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function bankModal(t, vi, onAdd) {
    const mine = (A().mySubjects ? A().mySubjects() : ['chem']); const subs = subjects().filter(([id]) => mine.includes(id) && bankGrades(id).length);
    if (!subs.length) { toast("Sizga biriktirilgan fanlarda tayyor test yo'q"); return; }
    const s0 = subs.find(([id]) => id === t.subj) ? t.subj : subs[0][0];
    modal(`<div class="ex-card-h"><h3>📚 Saytdagi testlardan qo'shish</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div>
      <form class="ex-form" novalidate><div class="ex-row"><label>Fan<select name="s">${subs.map(([id, nm]) => `<option value="${id}" ${id === s0 ? 'selected' : ''}>${esc(nm)}</option>`).join('')}</select></label><label>Sinf<select name="g"></select></label><label class="ex-part">Qism<select name="p"></select></label></div>
      <div class="ex-stu"><label class="ex-all"><input type="checkbox" id="exTAll"> Hammasini belgilash</label><div class="ex-stl ex-tpl" id="exTl"></div></div>
      <div class="ex-row ex-r3"><label>Oson<input name="ce" type="number" min="0" max="50" value="3"></label><label>O'rtacha<input name="cm" type="number" min="0" max="50" value="4"></label><label>Qiyin<input name="ch" type="number" min="0" max="50" value="3"></label></div>
      <div class="ex-col"><label class="ex-all"><input type="radio" name="tv" value="cur" checked> ${vi + 1}-variantga qo'shish</label><label class="ex-all"><input type="radio" name="tv" value="both"> 1 va 2-variantga (har biriga alohida savollar)</label></div>
      <p class="ex-mut" id="exBk"></p><div class="ex-acts"><button type="submit" class="btn">➕ Qo'shish</button><button type="button" class="btn sec" data-x>Bekor qilish</button></div></form>`, (w, close) => {
      const f = w.querySelector('form'), tl = w.querySelector('#exTl'), info = w.querySelector('#exBk');
      const fillG = () => { const gs = bankGrades(f.s.value); f.g.innerHTML = gs.map((g) => `<option value="${g}">${g}-sinf</option>`).join(''); fillP(); };
      const fillP = () => { const chem = f.s.value === 'chem'; w.querySelector('.ex-part').hidden = chem; f.p.innerHTML = chem ? '<option value="1">1</option>' : ZKSubjects.books(f.s.value, +f.g.value).map((b) => `<option value="${b.part}">${b.part}-qism</option>`).join(''); fillT(); };
      const fillT = () => { const tp = bankTopics(f.s.value, +f.g.value, +f.p.value); tl.innerHTML = tp.length ? tp.map((x) => `<label><input type="checkbox" value="${x.n}"> ${x.num}. ${esc(x.t)}</label>`).join('') : '<p class="ex-mut">Mavzu yo\'q.</p>'; w.querySelector('#exTAll').checked = false; };
      f.s.onchange = fillG; f.g.onchange = fillP; f.p.onchange = fillT; fillG();
      w.querySelector('#exTAll').onchange = (e) => tl.querySelectorAll('input').forEach((c) => { c.checked = e.target.checked; });
      f.onsubmit = async (e) => {
        e.preventDefault();
        const ns = [...tl.querySelectorAll('input:checked')].map((c) => +c.value); const counts = { easy: Math.max(0, +f.ce.value | 0), medium: Math.max(0, +f.cm.value | 0), hard: Math.max(0, +f.ch.value | 0) };
        if (!ns.length) { toast('Kamida bitta mavzuni belgilang'); return; } if (!(counts.easy + counts.medium + counts.hard)) { toast('Savollar sonini kiriting'); return; }
        const sb = f.querySelector('[type=submit]'); sb.disabled = true; info.textContent = 'Savollar tayyorlanmoqda…';
        try {
          const { P, missing } = await bankPool(f.s.value, +f.g.value, +f.p.value, ns);
          const used = new Set(); t.vars.forEach((v) => v.qs.forEach((q) => used.add(String(q.t).toLowerCase() + '|' + String(q.o[q.a] || '').toLowerCase())));
          const both = f.tv.value === 'both', want = counts.easy + counts.medium + counts.hard;
          const res = both ? [pickQs(P, counts, used), pickQs(P, counts, used)] : [pickQs(P, counts, used)];
          const got = res.reduce((a, l) => a + l.length, 0);
          if (!got) { sb.disabled = false; info.textContent = missing ? "Tanlangan mavzularning dars mazmuni hali yuklanmagan — savol topilmadi." : "Bu mavzularda mos savol topilmadi."; return; }
          if (!t.subj || t.subj === 'chem') t.subj = f.s.value;
          onAdd(res, both);
          close();
          const short = res.some((l) => l.length < want);
          toast(`${got} ta savol qo'shildi${short ? " (mavzularda savol kamroq ekan)" : ''}${missing ? ` · ${missing} ta mavzu hali yuklanmagan` : ''}`);
        } catch (err) { sb.disabled = false; info.textContent = err.code === 'perm' ? "Bu fan darslariga ruxsat yo'q (administrator fanni sizga biriktirishi kerak)." : 'Savollar yuklanmadi: ' + (err.code || err.message); }
      };
    });
  }

  /* ================= O'QITUVCHI ================= */
  const st = { tab: 'tests', edit: null };
  function teacherPage(app) {
    const u = A().user;
    app.innerHTML = `<div class="page-h"><div class="wrap"><div class="crumbs"><a href="#home">Bosh sahifa</a> / Testlar</div><h1>📝 Testlar</h1><p class="sub">Test yarating, sinfga yuboring va natijalarni real vaqtda kuzating.</p></div></div>
      <div class="wrap ex-wrap"><div class="seg ex-tabs" role="tablist"><button data-t="tests" class="${st.tab === 'tests' ? 'on' : ''}">📚 Testlarim</button><button data-t="sent" class="${st.tab === 'sent' ? 'on' : ''}">📤 Yuborilganlar</button><button data-t="new" class="${st.tab === 'new' ? 'on' : ''}">➕ Yangi test</button></div><div id="exBody" class="ex-body"><div class="zk-lazy" role="status"><span class="zk-lazy-spin"></span>Yuklanmoqda…</div></div></div>`;
    app.querySelectorAll('.ex-tabs button').forEach((b) => { b.onclick = () => { st.tab = b.dataset.t; if (st.tab === 'new') st.edit = null; teacherPage(app); }; });
    const body = app.querySelector('#exBody');
    if (st.tab === 'new') return editor(body, st.edit, app);
    if (st.tab === 'tests') return testList(body, app, u);
    return sentList(body, app, u);
  }
  async function testList(body, app, u) {
    let list = []; try { list = await B().list('examTests', 'owner', u.uid); } catch (e) { body.innerHTML = `<p class="ex-err">Testlar yuklanmadi: ${esc(e.code || e.message)}</p>`; return; }
    list.sort((a, b) => (b.updated || 0) - (a.updated || 0));
    if (!list.length) { body.innerHTML = `<div class="ex-empty"><p>Hali test yo'q.</p><button class="btn" id="exNew">➕ Birinchi testni yaratish</button></div>`; body.querySelector('#exNew').onclick = () => { st.tab = 'new'; st.edit = null; teacherPage(app); }; return; }
    body.innerHTML = `<div class="ex-grid">${list.map((t) => { const nq = (t.vars[0] || { qs: [] }).qs.length; return `<article class="ex-tc" data-id="${t.id}"><div class="ex-tc-h"><b>${esc(t.title)}</b>${lvTag(t.level)}</div><p class="ex-mut">${esc(subjName(t.subj))}${t.topic ? ' · ' + esc(t.topic) : ''}</p><p class="ex-mut">${nq} ta savol · ${t.vars.length} variant</p><div class="ex-acts"><button class="btn sm" data-a="send">📤 Yuborish</button><button class="btn sec sm" data-a="edit">✏️ Tahrirlash</button><button class="btn sec sm" data-a="copy">⧉ Nusxa</button><button class="btn sec sm" data-a="view">👁 Ko'rish</button><button class="btn sec sm ex-danger" data-a="del">🗑</button></div></article>`; }).join('')}</div>`;
    body.querySelectorAll('.ex-tc').forEach((c) => {
      const t = list.find((x) => x.id === c.dataset.id);
      c.querySelectorAll('[data-a]').forEach((b) => {
        b.onclick = async () => {
          const a = b.dataset.a;
          if (a === 'edit') { st.tab = 'new'; st.edit = t; teacherPage(app); }
          else if (a === 'view') preview(t);
          else if (a === 'send') assignForm(t, app);
          else if (a === 'copy') { const n = Object.assign({}, t, { title: t.title + ' (nusxa)', created: Date.now(), updated: Date.now() }); delete n.id; await B().set('examTests', rid(), n); toast('Nusxa yaratildi'); teacherPage(app); }
          else if (a === 'del') modal(`<h3>Testni o'chirish</h3><p>«${esc(t.title)}» test bazasidan o'chiriladi. Yuborilgan nusxalar va natijalar saqlanib qoladi.</p><div class="ex-acts"><button class="btn ex-danger" id="exDelOk">O'chirish</button><button class="btn sec" data-x>Bekor qilish</button></div>`, (w, close) => { w.querySelector('#exDelOk').onclick = async () => { await B().del('examTests', t.id); close(); toast("O'chirildi"); teacherPage(app); }; });
        };
      });
    });
  }
  function blankQ() { return { id: rid(), t: '', img: '', o: ['', '', '', ''], a: 0, l: 'm' }; }
  function editor(body, t0, app) {
    const t = t0 ? JSON.parse(JSON.stringify(t0)) : { title: '', subj: 'chem', topic: '', level: 'm', vars: [{ qs: [blankQ()] }] };
    let vi = 0;
    const draw = () => {
      const qs = t.vars[vi].qs;
      body.innerHTML = `<form class="ex-form" novalidate>
        <div class="ex-row"><label>Test nomi<input name="title" required maxlength="120" value="${esc(t.title)}"></label><label>Fan<select name="subj">${subjects().map(([id, nm]) => `<option value="${id}" ${t.subj === id ? 'selected' : ''}>${esc(nm)}</option>`).join('')}</select></label></div>
        <div class="ex-row"><label>Mavzu<input name="topic" maxlength="120" value="${esc(t.topic)}"></label><label>Test darajasi<select name="level">${Object.entries(LV).map(([k, [n]]) => `<option value="${k}" ${t.level === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
        <div class="ex-vars"><span>Variantlar:</span>${t.vars.map((_, i) => `<button type="button" class="${i === vi ? 'on' : ''}" data-v="${i}">${i + 1}-variant (${t.vars[i].qs.length})</button>`).join('')}${t.vars.length < 2 ? '<button type="button" data-addv>➕ 2-variant qo\'shish</button>' : '<button type="button" data-delv class="ex-danger">2-variantni olib tashlash</button>'}</div>
        <p class="ex-hint">Formula yozish: <code>x^2</code> → x², <code>H_2O</code> → H₂O, <code>x^{10}</code>. Diagramma yoki chizma — rasm sifatida qo'shing.</p>
        <ol class="ex-qs">${qs.map((q, i) => `<li class="ex-q" data-i="${i}"><div class="ex-q-h"><b>${i + 1}-savol</b>${q.nk ? '<span class="ex-nk">⚠️ To\'g\'ri javobni belgilang</span>' : ''}<select data-f="l" aria-label="Savol darajasi">${Object.entries(LV).map(([k, [n]]) => `<option value="${k}" ${q.l === k ? 'selected' : ''}>${n}</option>`).join('')}</select><span class="ex-sp"></span><button type="button" data-q="up" title="Yuqoriga" ${i ? '' : 'disabled'}>↑</button><button type="button" data-q="dup" title="Nusxa">⧉</button><button type="button" data-q="del" title="O'chirish" class="ex-danger" ${qs.length > 1 ? '' : 'disabled'}>🗑</button></div>
          <textarea data-f="t" rows="2" maxlength="1500" placeholder="Savol matni" aria-label="${i + 1}-savol matni">${esc(q.t)}</textarea>
          <div class="ex-img">${q.img ? `<img src="${q.img}" alt="Savol rasmi"><button type="button" data-q="noimg">Rasmni olib tashlash</button>` : `<label class="btn sec sm">🖼 Rasm qo'shish<input type="file" accept="image/*" data-q="img" hidden></label>`}</div>
          <div class="ex-opts">${q.o.map((o, j) => `<label class="ex-opt ${q.a === j ? 'ok' : ''}"><input type="radio" name="a${i}" value="${j}" ${q.a === j ? 'checked' : ''} data-f="a" aria-label="${'ABCD'[j]} to'g'ri javob"><b>${'ABCD'[j]}</b><input data-f="o" data-j="${j}" maxlength="400" value="${esc(o)}" placeholder="${'ABCD'[j]} javob"></label>`).join('')}</div></li>`).join('')}</ol>
        <div class="ex-acts"><button type="button" class="btn sec" data-addq>➕ Savol qo'shish</button><button type="button" class="btn sec" data-bank>📚 Saytdagi testlardan</button><label class="btn sec" tabindex="0">📄 Word, PDF, Excel yoki CSV dan<input type="file" accept=".docx,.pdf,.xlsx,.csv,.txt" data-xl hidden></label><button type="button" class="btn sec" data-paste>📋 Matndan joylash</button><button type="button" class="btn sec sm" data-tpl>⬇️ Excel namunasi</button></div>
        <p class="ex-hint">Word: «1. Savol» va «A) … B) … C) … D) …» ko'rinishida; to'g'ri javob — oxiridagi «Javoblar: 1-A, 2-C…» kaliti, javob oldidagi * yoki +, yoxud qalin/rangli/belgilangan javob. Excel ustunlari: Savol · A · B · C · D · To'g'ri javob (A–D) · Daraja · Variant (1 yoki 2). PDF — faqat matnli (Word'dan saqlangan); skanerlangan PDF o'qilmaydi. Eski .doc/.xls faylni avval .docx/.xlsx qilib saqlang.</p>
        <div class="ex-acts ex-sticky"><button type="submit" class="btn">💾 Saqlash</button><button type="button" class="btn sec" data-prev>👁 Ko'rib chiqish</button><span class="ex-mut" id="exSz"></span></div></form>`;
      const f = body.querySelector('form');
      const sync = () => { t.title = f.title.value.trim(); t.subj = f.subj.value; t.topic = f.topic.value.trim(); t.level = f.level.value; f.querySelectorAll('.ex-q').forEach((el) => { const q = qs[+el.dataset.i]; q.t = el.querySelector('[data-f=t]').value; q.l = el.querySelector('[data-f=l]').value; el.querySelectorAll('[data-f=o]').forEach((x) => { q.o[+x.dataset.j] = x.value; }); const r = el.querySelector('[data-f=a]:checked'); q.a = r ? +r.value : 0; }); const sz = JSON.stringify(t).length; body.querySelector('#exSz').textContent = `Hajm: ${Math.round(sz / 1024)} KB / 900 KB`; return sz; };
      f.addEventListener('input', sync); sync();
      f.querySelectorAll('[data-f=a]').forEach((r) => r.addEventListener('change', () => { const el = r.closest('.ex-q'), q = qs[+el.dataset.i]; if (q.nk) { delete q.nk; const w = el.querySelector('.ex-nk'); if (w) w.remove(); } }));
      f.querySelectorAll('[data-v]').forEach((b) => { b.onclick = () => { sync(); vi = +b.dataset.v; draw(); }; });
      const av = f.querySelector('[data-addv]'); if (av) av.onclick = () => { sync(); t.vars.push({ qs: [blankQ()] }); vi = 1; draw(); };
      const dv = f.querySelector('[data-delv]'); if (dv) dv.onclick = () => { sync(); t.vars = [t.vars[0]]; vi = 0; draw(); };
      f.querySelector('[data-addq]').onclick = () => { sync(); qs.push(blankQ()); draw(); const l = body.querySelectorAll('.ex-q'); l[l.length - 1].querySelector('textarea').focus(); };
      const isBlank = (q) => !String(q.t).trim() && !q.img && q.o.every((o) => !String(o).trim());
      const addTo = (v, list) => { while (t.vars.length <= v) t.vars.push({ qs: [] }); const L = t.vars[v].qs; if (L.length === 1 && isBlank(L[0])) L.length = 0; list.forEach((q) => L.push(q)); };
      f.querySelector('[data-bank]').onclick = () => { sync(); bankModal(t, vi, (res, both) => { if (both) { addTo(0, res[0]); addTo(1, res[1]); } else addTo(vi, res[0]); draw(); }); };
      f.querySelector('[data-tpl]').onclick = downloadTemplate;
      const xl = f.querySelector('[data-xl]'); xl.closest('label').onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); xl.click(); } };
      const report = (n, bad, nokey) => {
        const warn = nokey ? `<p class="ex-warn">⚠️ ${nokey} ta savolda to'g'ri javob topilmadi — ular ⚠️ bilan belgilandi, saqlashdan oldin to'g'ri javobni tanlang.</p>` : '';
        if (bad.length || nokey) modal(`<h3>${n} ta savol qo'shildi</h3>${warn}${bad.length ? `<p>${bad.length} ta qator o'tkazib yuborildi:</p><ul class="ex-top">${bad.slice(0, 15).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>${bad.length > 15 ? `<p class="ex-mut">… va yana ${bad.length - 15} ta</p>` : ''}` : ''}<div class="ex-acts"><button class="btn" data-x>Tushunarli</button></div>`);
        else toast(`${n} ta savol qo'shildi`);
      };
      const none = (bad, what) => modal(`<h3>Savol topilmadi</h3><p>${what}</p>${bad.length ? `<ul class="ex-top">${bad.slice(0, 15).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}<p class="ex-hint">Word'da har savol «1. Savol matni», javoblar «A) …», «B) …» ko'rinishida bo'lsin. Excel uchun «⬇️ Excel namunasi»ni yuklab oling.</p><div class="ex-acts"><button class="btn" data-x>Tushunarli</button></div>`);
      const place = (out) => { [0, 1].forEach((v) => { const l = out.filter((x) => (x.v == null ? vi : x.v) === v).map((x) => x.q); if (l.length) addTo(v, l); }); draw(); };
      const fromParas = async (paras, grid, img) => {
        const r1 = parseTestParas(paras, t.level || 'm'), r2 = grid && grid.length ? rowsToQs(grid, t.level || 'm') : { out: [], bad: [] };
        if (img) for (const x of r1.out) if (x.imgRef) x.q.img = await img(x.imgRef);
        const out = r1.out.concat(r2.out), bad = r1.bad.concat(r2.bad);
        if (!out.length) { none(bad, "Matnda test savollari aniqlanmadi."); return; }
        place(out); report(out.length, bad, r1.nokey);
      };
      xl.onchange = async () => {
        sync(); const file = xl.files[0]; if (!file) return;
        try {
          const buf = await file.arrayBuffer(), h = new Uint8Array(buf, 0, Math.min(4, buf.byteLength));
          if (h[0] === 0x25 && h[1] === 0x50 && h[2] === 0x44 && h[3] === 0x46) { // %PDF
            let r; try { r = await readPdf(buf); } catch (e) { toast("PDF o'qilmadi (internet sekin bo'lishi mumkin) — qayta urinib ko'ring"); return; }
            if (r.chars < 20) { modal(`<h3>PDF ichida matn yo'q</h3><p>Bu PDF skanerlangan yoki rasmga olingan — undagi yozuvlar rasm ko'rinishida. Testni Word faylga ko'chiring yoki «📋 Matndan joylash» orqali kiriting.</p><div class="ex-acts"><button class="btn" data-x>Tushunarli</button></div>`); return; }
            await fromParas(r.paras); return;
          }
          if (h[0] === 0xd0 && h[1] === 0xcf) { toast("Eski .doc/.xls format o'qilmaydi — faylni .docx yoki .xlsx qilib saqlang"); return; }
          if (h[0] === 0x50 && h[1] === 0x4b) {
            const z = await unzip(buf);
            if (z.names.includes('word/document.xml')) { const d = await readDocx(z); await fromParas(d.paras, d.grid, d.img); return; }
            const { out, bad } = rowsToQs(await readXlsx(buf), t.level || 'm');
            if (!out.length) { none(bad, "Faylda to'g'ri to'ldirilgan qator yo'q."); return; }
            place(out); report(out.length, bad, 0); return;
          }
          const txt = new TextDecoder().decode(buf), rows = parseCsv(txt);
          if (rows.filter((r) => r.length >= 6).length >= Math.max(1, rows.filter((r) => r.some((c) => c.trim())).length - 1)) { const { out, bad } = rowsToQs(rows, t.level || 'm'); if (out.length) { place(out); report(out.length, bad, 0); return; } }
          await fromParas(txt.split(/\r?\n/).map((l) => ({ text: l, st: [...l].map(() => 0), imgs: [], num: null })));
        } catch (e) { console.warn('import', e); toast("Fayl o'qilmadi. .docx, .pdf, .xlsx yoki .csv faylni tanlang"); }
        finally { xl.value = ''; }
      };
      f.querySelector('[data-paste]').onclick = () => { sync(); modal(`<div class="ex-card-h"><h3>📋 Matndan joylash</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div><p class="ex-hint">Word yoki boshqa joydan testni nusxalab shu yerga joylang. To'g'ri javobni oxirida «Javoblar: 1-A, 2-B…» ko'rinishida yoki javob oldiga * qo'yib ko'rsating.</p><textarea id="exPaste" rows="12" style="width:100%;box-sizing:border-box;font:inherit;padding:10px;border-radius:10px;border:1px solid var(--line,#d1d5db)" placeholder="1. Suvning formulasi qaysi?&#10;A) H2O&#10;B) CO2&#10;C) O2&#10;D) NaCl&#10;&#10;Javoblar: 1-A"></textarea><div class="ex-acts"><button class="btn" id="exPasteOk">➕ Qo'shish</button><button class="btn sec" data-x>Bekor qilish</button></div>`, (w, close) => { w.querySelector('#exPasteOk').onclick = async () => { const txt = w.querySelector('#exPaste').value; if (!txt.trim()) { toast('Matn joylang'); return; } close(); await fromParas(txt.split(/\r?\n/).map((l) => ({ text: l, st: [...l].map(() => 0), imgs: [], num: null }))); }; }); };
      f.querySelectorAll('[data-q]').forEach((b) => {
        const i = +b.closest('.ex-q').dataset.i, k = b.dataset.q;
        if (k === 'img') b.onchange = async () => { sync(); if (!b.files[0]) return; try { qs[i].img = await shrink(b.files[0]); draw(); } catch (e) { toast('Rasm o\'qilmadi'); } };
        else b.onclick = () => { sync(); if (k === 'up') [qs[i - 1], qs[i]] = [qs[i], qs[i - 1]]; else if (k === 'dup') qs.splice(i + 1, 0, Object.assign(JSON.parse(JSON.stringify(qs[i])), { id: rid() })); else if (k === 'del') qs.splice(i, 1); else if (k === 'noimg') qs[i].img = ''; draw(); };
      });
      f.querySelector('[data-prev]').onclick = () => { sync(); preview(t); };
      f.onsubmit = async (e) => {
        e.preventDefault(); const sz = sync();
        const nkN = t.vars.reduce((n, v) => n + v.qs.filter((q) => q.nk).length, 0);
        const bad = !t.title ? 'Test nomini kiriting' : nkN ? `${nkN} ta savolda to'g'ri javob belgilanmagan (⚠️ belgili savollar)` : t.vars.some((v) => v.qs.some((q) => !q.t.trim() && !q.img)) ? "Har bir savolga matn yoki rasm kiriting" : t.vars.some((v) => v.qs.some((q) => q.o.some((o) => !o.trim()))) ? "Barcha A, B, C, D javoblarni to'ldiring" : sz > 900000 ? "Test juda katta (rasmlar ko'p). Rasmlarni kamaytiring yoki testni ikkiga bo'ling" : '';
        if (bad) { toast(bad); return; }
        const id = (t0 && t0.id) || rid(); const doc = { owner: A().user.uid, title: t.title, subj: t.subj, topic: t.topic, level: t.level, vars: t.vars.map((v) => ({ qs: v.qs.map(({ nk, ...q }) => q) })), created: (t0 && t0.created) || Date.now(), updated: Date.now() };
        try { await B().set('examTests', id, doc); toast('Saqlandi'); st.tab = 'tests'; st.edit = null; teacherPage(app); } catch (err) { toast('Saqlanmadi: ' + (err.code || err.message)); }
      };
    };
    draw();
  }
  function qView(q, num, order, sel, opts) {
    return `<div class="ex-qv"><div class="ex-qv-h"><b>${num}-savol</b>${lvTag(q.l)}</div><div class="ex-qt">${fx(q.t)}</div>${q.img ? `<img class="ex-qimg" src="${q.img}" alt="Savol rasmi">` : ''}<div class="ex-ch">${order.map((j, k) => `<button type="button" class="ex-cb ${sel === j ? 'on' : ''} ${opts && opts.c === j ? 'ok' : ''} ${opts && opts.c != null && sel === j && sel !== opts.c ? 'no' : ''}" data-j="${j}" ${opts && opts.ro ? 'disabled' : ''} aria-pressed="${sel === j}"><b>${'ABCD'[k]}</b><span>${fx(q.o[j])}</span></button>`).join('')}</div></div>`;
  }
  function preview(t) {
    let vi = 0;
    const html = () => `<div class="ex-card-h"><h3>👁 ${esc(t.title || 'Test')}</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div><p class="ex-mut">${esc(subjName(t.subj))}${t.topic ? ' · ' + esc(t.topic) : ''} · ${lvTag(t.level)}</p>${t.vars.length > 1 ? `<div class="ex-vars">${t.vars.map((_, i) => `<button type="button" data-pv="${i}" class="${i === vi ? 'on' : ''}">${i + 1}-variant</button>`).join('')}</div>` : ''}<div class="ex-scroll">${t.vars[vi].qs.map((q, i) => qView(q, i + 1, [0, 1, 2, 3], -1, { c: q.a, ro: true })).join('')}</div>`;
    modal(html(), (w) => { const wire = () => w.querySelectorAll('[data-pv]').forEach((b) => { b.onclick = () => { vi = +b.dataset.pv; w.querySelector('.ex-card').innerHTML = html(); wire(); }; }); wire(); });
  }
  const dtLocal = (ms) => { const d = new Date(ms - new Date(ms).getTimezoneOffset() * 60000); return d.toISOString().slice(0, 16); };
  async function assignForm(t, app) {
    let users = []; try { users = (await B().list('users', 'role', 'student')).filter((u) => u.status !== 'pending' && !u.disabled); } catch (e) { toast("O'quvchilar ro'yxati yuklanmadi"); return; }
    const classes = [...new Set(users.map((u) => u.cls || '—'))].sort();
    const now = Date.now();
    modal(`<div class="ex-card-h"><h3>📤 «${esc(t.title)}» ni yuborish</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div>
      <form class="ex-form" novalidate><div class="ex-row"><label>Sinf<select name="cls"><option value="">— tanlang —</option>${classes.map((c) => `<option>${esc(c)}</option>`).join('')}</select></label><label>Vaqt (daqiqa)<input name="dur" type="number" min="1" max="300" value="20"></label></div>
      <div id="exStu" class="ex-stu"><p class="ex-mut">Avval sinfni tanlang.</p></div>
      <div class="ex-row"><label>Boshlanishi<input name="start" type="datetime-local" value="${dtLocal(now)}"></label><label>Yakunlanishi<input name="end" type="datetime-local" value="${dtLocal(now + 7 * 864e5)}"></label></div>
      <div class="ex-row"><label>Urinishlar soni<select name="tries">${[1, 2, 3, 5].map((n) => `<option value="${n}">${n === 1 ? '1 (qayta ishlash yo\'q)' : n + ' ta'}</option>`).join('')}</select></label><label>Variantlar<select name="vm" ${t.vars.length > 1 ? '' : 'disabled'}><option value="auto">Avtomatik (navbat bilan)</option><option value="1">Hammasiga 1-variant</option>${t.vars.length > 1 ? '<option value="2">Hammasiga 2-variant</option><option value="man">O\'qituvchi tanlaydi</option>' : ''}</select></label></div>
      <p class="ex-warn">⚠️ Yuborilgan test — alohida nusxa: keyinroq testni tahrirlasangiz, yuborilgan nusxa o'zgarmaydi.</p>
      <div class="ex-acts"><button type="submit" class="btn">📤 Yuborish</button><button type="button" class="btn sec" data-x>Bekor qilish</button></div></form>`, (w, close) => {
      const f = w.querySelector('form'), box = w.querySelector('#exStu');
      const drawStu = () => {
        const list = users.filter((u) => (u.cls || '—') === f.cls.value).sort((a, b) => String(a.name).localeCompare(String(b.name)));
        if (!list.length) { box.innerHTML = '<p class="ex-mut">Bu sinfda o\'quvchi yo\'q.</p>'; return; }
        const man = f.vm.value === 'man';
        box.innerHTML = `<label class="ex-all"><input type="checkbox" id="exAll" checked> Butun sinf (${list.length})</label><div class="ex-stl">${list.map((u, i) => `<label><input type="checkbox" value="${u.id}" checked> ${esc(u.name || u.login)}${man ? ` <select data-vu="${u.id}"><option value="0" ${i % 2 ? '' : 'selected'}>1-v</option><option value="1" ${i % 2 ? 'selected' : ''}>2-v</option></select>` : ''}</label>`).join('')}</div>`;
        box.querySelector('#exAll').onchange = (e) => box.querySelectorAll('.ex-stl input').forEach((c) => { c.checked = e.target.checked; });
      };
      f.cls.onchange = drawStu; f.vm.onchange = drawStu;
      f.onsubmit = async (e) => {
        e.preventDefault();
        const uids = [...box.querySelectorAll('.ex-stl input:checked')].map((c) => c.value);
        const dur = Math.round(+f.dur.value), start = new Date(f.start.value).getTime(), end = new Date(f.end.value).getTime();
        const bad = !uids.length ? "Kamida bitta o'quvchini tanlang" : !(dur >= 1 && dur <= 300) ? 'Vaqt 1–300 daqiqa bo\'lsin' : !(end > start) ? "Yakunlanish vaqti boshlanishdan keyin bo'lsin" : end < Date.now() ? "Yakunlanish vaqti o'tib ketgan" : '';
        if (bad) { toast(bad); return; }
        const vmap = {}; const vm = t.vars.length > 1 ? f.vm.value : '1';
        uids.forEach((u, i) => { vmap[u] = vm === 'auto' ? i % 2 : vm === '2' ? 1 : vm === 'man' ? +(box.querySelector(`[data-vu="${u}"]`) || { value: 0 }).value : 0; });
        const aid = rid(), me = A().user;
        const vars = t.vars.map((v) => ({ qs: v.qs.map((q) => ({ id: q.id, t: q.t, img: q.img || '', o: q.o, l: q.l })) }));
        const keys = t.vars.map((v) => ({ k: v.qs.map((q) => q.a) }));
        const doc = { owner: me.uid, ownerName: me.name || me.login || "O'qituvchi", testId: t.id, title: t.title, subj: t.subj, topic: t.topic || '', level: t.level, nq: vars[0].qs.length, dur, start: new Date(start), end: new Date(end), tries: +f.tries.value, cls: f.cls.value, uids, vmap, vars, reveal: false, created: B().NOW };
        const sb = f.querySelector('[type=submit]'); sb.disabled = true;
        try { await B().set('examKeys', aid, { owner: me.uid, keys }); await B().put('examAssign', aid, doc); close(); toast(`Yuborildi: ${uids.length} o'quvchi`); st.tab = 'sent'; teacherPage(app); } catch (err) { sb.disabled = false; toast('Yuborilmadi: ' + (err.code || err.message)); }
      };
    });
  }
  async function sentList(body, app, u) {
    let list = []; try { list = await B().list('examAssign', 'owner', u.uid); } catch (e) { body.innerHTML = `<p class="ex-err">Yuklanmadi: ${esc(e.code || e.message)}</p>`; return; }
    list.sort((a, b) => (b.created || 0) - (a.created || 0));
    if (!list.length) { body.innerHTML = '<div class="ex-empty"><p>Hali test yuborilmagan.</p></div>'; return; }
    const now = Date.now();
    body.innerHTML = `<div class="ex-grid">${list.map((a) => `<a class="ex-tc" href="#exams/a/${a.id}"><div class="ex-tc-h"><b>${esc(a.title)}</b>${lvTag(a.level)}</div><p class="ex-mut">${esc(subjName(a.subj))} · ${esc(a.cls)} · ${a.uids.length} o'quvchi</p><p class="ex-mut">${a.nq} savol · ${a.dur} daq · ${fmtD(a.start)} — ${fmtD(a.end)}</p><span class="ex-st ${now > a.end ? 'off' : now < a.start ? 'wait' : 'on'}">${now > a.end ? 'Yakunlangan' : now < a.start ? 'Kutilmoqda' : 'Faol'}</span></a>`).join('')}</div>`;
  }
  // Monitoring: real vaqt (urinishlar va natijalar kuzatiladi), baholash avtomatik
  let monStop = [];
  function stopMon() { monStop.forEach((f) => f()); monStop = []; }
  async function monitor(app, aid) {
    stopMon();
    app.innerHTML = `<div class="wrap"><div class="zk-lazy" role="status"><span class="zk-lazy-spin"></span>Yuklanmoqda…</div></div>`;
    const b = B(); let as = await b.getT('examAssign', aid); if (!as) { app.innerHTML = '<div class="wrap"><p class="ex-err">Test topilmadi.</p></div>'; return; } as.id = aid;
    let users = {}; try { (await b.list('users', 'role', 'student')).forEach((x) => { users[x.id] = x; }); } catch (e) { }
    let atts = [], res = {}, grading = false;
    const draw = () => {
      if (!app.isConnected || location.hash !== '#exams/a/' + aid) { stopMon(); return; }
      const now = Date.now(), byU = {};
      atts.forEach((t) => { if (!byU[t.uid] || (t.n || 1) > (byU[t.uid].n || 1)) byU[t.uid] = t; });
      const rows = as.uids.map((uid) => { const t = byU[uid], r = t && res[t.id]; const s = !t ? (now > as.end ? 'missed' : 'sent') : r ? 'done' : finished(t, as, now) ? 'grading' : 'work'; return { uid, u: users[uid] || {}, t, r, s }; });
      const done = rows.filter((x) => x.r), pcts = done.map((x) => x.r.pct);
      const avg = pcts.length ? Math.round(pcts.reduce((a, c) => a + c, 0) / pcts.length * 10) / 10 : 0;
      const cnt = (s) => rows.filter((x) => x.s === s).length;
      const miss = {}; done.forEach((x) => (x.r.detail || []).forEach((d) => { if (!d.ok) { const k = x.r.v + ':' + d.id; miss[k] = (miss[k] || 0) + 1; } }));
      const top = Object.entries(miss).sort((a, c) => c[1] - a[1]).slice(0, 5).map(([k, n]) => { const [v, id] = k.split(':'); const i = QS(as, +v).findIndex((q) => q.id === id); const q = QS(as, +v)[i]; return q ? `<li><b>${+v + 1}-v, ${i + 1}-savol</b> — ${n} ta xato: ${fx(q.t).slice(0, 140)}</li>` : ''; }).join('');
      const vstat = [0, 1].filter((v) => QS(as, v).length).map((v) => { const p = done.filter((x) => x.r.v === v).map((x) => x.r.pct); return p.length ? `<span>${v + 1}-variant: o'rtacha ${pctTag(Math.round(p.reduce((a, c) => a + c, 0) / p.length * 10) / 10)} (${p.length} ta)</span>` : ''; }).join(' ');
      const S = { sent: ['Boshlamagan', 'wait'], work: ['Ishlayapti', 'on'], grading: ['Tekshirilmoqda', 'wait'], done: ['Yakunlagan', 'ok'], missed: ["Qatnashmadi", 'off'] };
      app.innerHTML = `<div class="page-h"><div class="wrap"><div class="crumbs"><a href="#exams">Testlar</a> / Monitoring</div><h1>${esc(as.title)}</h1><p class="sub">${esc(subjName(as.subj))}${as.topic ? ' · ' + esc(as.topic) : ''} · ${esc(as.cls)} · ${as.nq} savol · ${as.dur} daqiqa · ${fmtD(as.start)} — ${fmtD(as.end)}</p></div></div>
        <div class="wrap ex-wrap"><div class="ex-cards"><div class="ex-kpi"><b>${as.uids.length}</b><span>Yuborilgan</span></div><div class="ex-kpi"><b>${cnt('sent')}</b><span>Boshlamagan</span></div><div class="ex-kpi on"><b>${cnt('work')}</b><span>Ishlayapti</span></div><div class="ex-kpi ok"><b>${done.length}</b><span>Yakunlagan</span></div><div class="ex-kpi"><b>${pcts.length ? pctTag(avg) : '—'}</b><span>Sinf o'rtachasi</span></div><div class="ex-kpi"><b>${pcts.length ? Math.max(...pcts) + '% / ' + Math.min(...pcts) + '%' : '—'}</b><span>Eng yuqori / past</span></div></div>
        ${pcts.length ? `<div class="ex-donut-row">${donut(pcts)}<div>${vstat}</div></div>` : ''}
        <div class="ex-acts"><button class="btn sec sm" id="exRev">${as.reveal ? "🔒 To'g'ri javoblarni yopish" : "🔓 To'g'ri javoblarni o'quvchilarga ochish"}</button><button class="btn sec sm" id="exCsv">⬇️ Excel (CSV)</button><button class="btn sec sm" id="exPdf">🖨 PDF</button><button class="btn sec sm" id="exEnd" ${now > as.end ? 'disabled' : ''}>⏹ Testni hozir yopish</button></div>
        <div class="ex-tbl-w"><table class="ex-tbl"><thead><tr><th>O'quvchi</th><th>Holat</th><th>Variant</th><th>To'g'ri</th><th>Natija</th><th>Vaqt</th><th></th></tr></thead><tbody>${rows.map((x) => `<tr><td>${esc(x.u.name || x.u.login || x.uid)}</td><td><span class="ex-st ${S[x.s][1]}">${S[x.s][0]}</span></td><td>${(as.vmap[x.uid] || 0) + 1}</td><td>${x.r ? `${x.r.correct}/${x.r.total}` : x.t ? `${Object.keys(x.t.ans || {}).length}/${as.nq} javob` : '—'}</td><td>${x.r ? pctTag(x.r.pct) + bar(x.r.pct) : '—'}</td><td>${x.r ? fmtT(x.r.spent) : x.t && x.s === 'work' ? '⏱ ' + fmtT(Math.min(x.t.startedAt + as.dur * 60000, as.end) - now) : '—'}</td><td>${x.t ? `<button class="btn sec sm" data-reset="${x.uid}" title="Urinishni bekor qilib, qayta ishlashga ruxsat">↺</button>` : ''}</td></tr>`).join('')}</tbody></table></div>
        ${top ? `<h3>Eng ko'p xato qilingan savollar</h3><ol class="ex-top">${top}</ol>` : ''}</div>`;
      app.querySelector('#exRev').onclick = async () => { await b.set('examAssign', aid, { reveal: !as.reveal }, true); as.reveal = !as.reveal; toast(as.reveal ? "To'g'ri javoblar ochildi" : 'Yopildi'); grade(true); };
      app.querySelector('#exEnd').onclick = () => modal(`<h3>Testni yopish</h3><p>Yakunlanish vaqti hozirga o'zgartiriladi. Ishlayotgan o'quvchilarning saqlangan javoblari baholanadi.</p><div class="ex-acts"><button class="btn ex-danger" id="exEndOk">Yopish</button><button class="btn sec" data-x>Bekor qilish</button></div>`, (w, close) => { w.querySelector('#exEndOk').onclick = async () => { await b.put('examAssign', aid, { end: new Date() }, true); as.end = Date.now(); close(); draw(); }; });
      app.querySelector('#exCsv').onclick = () => exportCsv(as, rows);
      app.querySelector('#exPdf').onclick = () => window.print();
      app.querySelectorAll('[data-reset]').forEach((bt) => { bt.onclick = () => { const uid = bt.dataset.reset; modal(`<h3>Qayta ishlashga ruxsat</h3><p>Bu o'quvchining urinishi va natijasi o'chiriladi, u testni qaytadan ishlashi mumkin bo'ladi.</p><div class="ex-acts"><button class="btn" id="exRsOk">Ruxsat berish</button><button class="btn sec" data-x>Bekor qilish</button></div>`, (w, close) => { w.querySelector('#exRsOk').onclick = async () => { for (const t of atts.filter((t) => t.uid === uid)) { await b.del('examAttempts', t.id); await b.del('examResults', t.id).catch(() => { }); } close(); toast('Ruxsat berildi'); }; }); }; });
    };
    async function grade(force) { if (grading) return; grading = true; try { if (force) res = {}; await gradeAll(as, atts, res); } finally { grading = false; } }
    monStop.push(b.watch('examAttempts', 'aid', '==', aid, (l) => { atts = l; draw(); grade(); }));
    monStop.push(b.watch('examResults', 'aid', '==', aid, (l) => { res = {}; l.forEach((r) => { res[r.id] = r; }); draw(); }));
    const iv = setInterval(() => { draw(); grade(); }, 15000); monStop.push(() => clearInterval(iv));
  }
  function donut(pcts) {
    const g = pcts.filter((p) => p >= 80).length, y = pcts.filter((p) => p >= 70 && p < 80).length, r = pcts.length - g - y, n = pcts.length;
    const a1 = g / n * 100, a2 = a1 + y / n * 100;
    return `<div class="ex-donut" style="background:conic-gradient(var(--ex-g) 0 ${a1}%, var(--ex-y) ${a1}% ${a2}%, var(--ex-r) ${a2}% 100%)" role="img" aria-label="Yaxshi ${g}, o'rtacha ${y}, past ${r}"><span>${n}</span></div><ul class="ex-leg"><li><i class="ex-g"></i>Yaxshi (80–100%): ${g}</li><li><i class="ex-y"></i>O'rtacha (70–79%): ${y}</li><li><i class="ex-r"></i>Past (&lt;70%): ${r}</li></ul>`;
  }
  function exportCsv(as, rows) {
    const q = (s) => `"${String(s == null ? '' : s).replace(/"/g, '""')}"`;
    const lines = [['O\'quvchi', 'Sinf', 'Holat', 'Variant', 'Jami', 'To\'g\'ri', 'Noto\'g\'ri', 'Javobsiz', 'Natija %', 'Daraja', 'Sarflangan vaqt'].map(q).join(';')];
    rows.forEach((x) => lines.push([x.u.name || x.u.login || x.uid, x.u.cls || '', x.r ? 'Yakunlagan' : x.t ? 'Ishlayapti' : 'Boshlamagan', (as.vmap[x.uid] || 0) + 1, as.nq, x.r ? x.r.correct : '', x.r ? x.r.wrong : '', x.r ? x.r.blank : '', x.r ? x.r.pct : '', x.r ? grade(x.r.pct)[0] : '', x.r ? fmtT(x.r.spent) : ''].map(q).join(';')));
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${as.title.replace(/[^\wА-Яа-яЎўҚқҒғҲҳ ]+/g, '').trim() || 'test'}-natijalar.csv`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ================= O'QUVCHI ================= */
  const S2 = { assigns: [], atts: [], res: {}, stops: [], seen: {} };
  try { S2.seen = JSON.parse(localStorage.getItem('zk_ex_seen') || '{}'); } catch (e) { }
  function myLatest(aid) { let b = null; S2.atts.forEach((t) => { if (t.aid === aid && (!b || (t.n || 1) > (b.n || 1))) b = t; }); return b; }
  function stateOf(as) {
    const now = Date.now(), t = myLatest(as.id), r = t && S2.res[t.id];
    if (t && !finished(t, as, now)) return 'work';
    if (t) return r ? 'done' : 'grading';
    if (now < as.start) return 'soon'; if (now > as.end) return 'missed'; return 'new';
  }
  function startWatch() {
    const a = A(); if (!a || !a.user || a.isStaff() || S2.stops.length) return;
    const b = B(), uid = a.user.uid;
    S2.stops.push(b.watch('examAssign', 'uids', 'array-contains', uid, (l) => { S2.assigns = l; bell(); rerender(); }));
    S2.stops.push(b.watch('examAttempts', 'uid', '==', uid, (l) => { S2.atts = l; bell(); rerender(); }));
    S2.stops.push(b.watch('examResults', 'uid', '==', uid, (l) => { S2.res = {}; l.forEach((r) => { S2.res[r.id] = r; }); rerender(); }));
  }
  const rerender = () => { if (location.hash === '#exams' && document.getElementById('exStuPage')) studentPage(document.getElementById('app')); };
  function bell() {
    const host = document.querySelector('header.top .wrap'); if (!host || !A() || !A().user || A().isStaff()) return;
    let el = document.getElementById('exBell');
    if (!el) { el = document.createElement('button'); el.id = 'exBell'; el.type = 'button'; el.className = 'ex-bell'; const uc = document.getElementById('uchip'); host.insertBefore(el, uc || host.querySelector('.lang') || null); el.onclick = openBell; }
    const fresh = S2.assigns.filter((as) => stateOf(as) === 'new');
    const unseen = fresh.filter((as) => !S2.seen[as.id]).length;
    el.innerHTML = `🔔${fresh.length ? `<span class="ex-badge ${unseen ? 'pulse' : ''}">${fresh.length}</span>` : ''}`;
    el.setAttribute('aria-label', fresh.length ? `Yangi testlar: ${fresh.length}` : 'Bildirishnomalar');
  }
  function openBell() {
    const fresh = S2.assigns.filter((as) => ['new', 'work'].includes(stateOf(as))).sort((a, b) => (b.created || 0) - (a.created || 0));
    fresh.forEach((as) => { S2.seen[as.id] = 1; }); try { localStorage.setItem('zk_ex_seen', JSON.stringify(S2.seen)); } catch (e) { } bell();
    modal(`<div class="ex-card-h"><h3>🔔 Bildirishnomalar</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div>${fresh.length ? fresh.map((as) => notifCard(as)).join('') : '<p class="ex-mut">Yangi test yo\'q.</p>'}<p><a href="#exams" data-x>Barcha testlarim →</a></p>`, (w, close) => wireNotif(w, close));
  }
  function notifCard(as) {
    const s = stateOf(as);
    return `<div class="ex-ntf"><div class="ex-tc-h"><b>${esc(as.title)}</b>${lvTag(as.level)}</div><dl class="ex-dl"><dt>Fan</dt><dd>${esc(subjName(as.subj))}</dd>${as.topic ? `<dt>Mavzu</dt><dd>${esc(as.topic)}</dd>` : ''}<dt>O'qituvchi</dt><dd>${esc(as.ownerName || '—')}</dd><dt>Savollar</dt><dd>${as.nq} ta</dd><dt>Vaqt</dt><dd>${as.dur} daqiqa</dd><dt>Yuborilgan</dt><dd>${fmtD(as.created)}</dd><dt>Muddat</dt><dd>${fmtD(as.end)} gacha</dd></dl>
      ${s === 'work' ? `<button class="btn" data-go="${as.id}">▶️ Davom ettirish</button>` : `<p class="ex-warn">⏱ Diqqat: «Boshlash» tugmasini bosishingiz bilan ${as.dur} daqiqalik taymer boshlanadi va to'xtamaydi. Sahifani yangilash yoki chiqib ketish vaqtni to'xtatmaydi.</p><button class="btn" data-start="${as.id}">▶️ Boshlash</button>`}</div>`;
  }
  function wireNotif(w, close) {
    w.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => { close && close(); location.hash = '#exam/' + b.dataset.go; }; });
    w.querySelectorAll('[data-start]').forEach((b) => { b.onclick = async () => { b.disabled = true; const ok = await startAttempt(b.dataset.start); if (ok) { close && close(); location.hash = '#exam/' + b.dataset.start; } else b.disabled = false; }; });
  }
  async function startAttempt(aid) {
    const as = S2.assigns.find((x) => x.id === aid); if (!as) return false;
    const now = Date.now(); if (now < as.start) { toast('Test hali boshlanmagan'); return false; } if (now > as.end) { toast("Test muddati tugagan"); return false; }
    const prev = myLatest(aid), n = prev ? (prev.n || 1) + 1 : 1;
    if (prev && !finished(prev, as, now)) return true;
    if (n > as.tries) { toast('Urinishlar tugagan'); return false; }
    const uid = A().user.uid, id = `${aid}_${uid}_${n}`;
    try { await B().put('examAttempts', id, { aid, uid, n, v: (as.vmap && as.vmap[uid]) || 0, startedAt: B().NOW, ans: {}, done: false, doneAt: null, saved: B().NOW }); return true; }
    catch (e) { toast('Test boshlanmadi: ' + (e.code || e.message)); return false; }
  }
  function studentPage(app) {
    startWatch();
    const L = S2.assigns.map((as) => ({ as, s: stateOf(as) }));
    const grp = (k) => L.filter((x) => k.includes(x.s)).sort((a, b) => (b.as.created || 0) - (a.as.created || 0));
    const results = Object.values(S2.res).sort((a, b) => (b.at || 0) - (a.at || 0));
    const pcts = results.map((r) => r.pct), avg = pcts.length ? Math.round(pcts.reduce((a, c) => a + c, 0) / pcts.length * 10) / 10 : 0;
    const bySubj = {}; results.forEach((r) => { (bySubj[r.subj] = bySubj[r.subj] || []).push(r.pct); });
    const card = (x) => { const as = x.as, t = myLatest(as.id), r = t && S2.res[t.id]; return `<article class="ex-tc"><div class="ex-tc-h"><b>${esc(as.title)}</b>${lvTag(as.level)}</div><p class="ex-mut">${esc(subjName(as.subj))}${as.topic ? ' · ' + esc(as.topic) : ''} · ${as.nq} savol · ${as.dur} daq</p><p class="ex-mut">Muddat: ${fmtD(as.end)} gacha</p>${x.s === 'new' ? `<button class="btn sm" data-open="${as.id}">Ochish</button>` : x.s === 'work' ? `<button class="btn sm" data-go="${as.id}">▶️ Davom ettirish</button>` : x.s === 'soon' ? `<span class="ex-st wait">${fmtD(as.start)} da ochiladi</span>` : x.s === 'grading' ? '<span class="ex-st wait">Tekshirilmoqda — natija o\'qituvchi tekshirgach chiqadi</span>' : x.s === 'done' && r ? `<div class="ex-res">${pctTag(r.pct)}${bar(r.pct)}<span>${r.correct}/${r.total} to'g'ri</span></div><button class="btn sec sm" data-res="${t.id}">Batafsil</button>${as.tries > (t.n || 1) && Date.now() < as.end ? `<button class="btn sec sm" data-open="${as.id}">↺ Qayta ishlash (${as.tries - (t.n || 1)} ta qoldi)</button>` : ''}` : '<span class="ex-st off">Muddati o\'tgan</span>'}</article>`; };
    const sec = (h, l, e) => `<h2 class="ex-h2">${h} <small>${l.length}</small></h2>${l.length ? `<div class="ex-grid">${l.map(card).join('')}</div>` : `<p class="ex-mut">${e}</p>`}`;
    const wrongs = results.filter((r) => r.reveal && r.detail && r.detail.some((d) => !d.ok));
    app.innerHTML = `<div class="page-h" id="exStuPage"><div class="wrap"><div class="crumbs"><a href="#home">Bosh sahifa</a> / Mening testlarim</div><h1>📝 Mening testlarim</h1><p class="sub">O'qituvchi yuborgan testlar, natijalar va statistika.</p></div></div>
      <div class="wrap ex-wrap"><div class="ex-cards"><div class="ex-kpi"><b>${grp(['new']).length}</b><span>Yangi</span></div><div class="ex-kpi on"><b>${grp(['work']).length}</b><span>Jarayonda</span></div><div class="ex-kpi ok"><b>${results.length}</b><span>Yakunlangan</span></div><div class="ex-kpi"><b>${pcts.length ? pctTag(avg) : '—'}</b><span>O'rtacha natija</span></div></div>
      ${Object.keys(bySubj).length ? `<div class="panel ex-subj"><h3>Fanlar bo'yicha o'zlashtirish</h3>${Object.entries(bySubj).map(([s, l]) => { const p = Math.round(l.reduce((a, c) => a + c, 0) / l.length * 10) / 10; return `<div class="ex-sr"><span>${esc(subjName(s))}</span>${bar(p)}${pctTag(p)}</div>`; }).join('')}</div>` : ''}
      ${sec('🆕 Yangi testlar', grp(['new', 'soon']), "Yangi test yo'q.")}${sec('⏳ Jarayonda', grp(['work']), "Jarayondagi test yo'q.")}${sec('✅ Yakunlangan', grp(['done', 'grading']), 'Hali yakunlangan test yo\'q.')}
      ${wrongs.length ? `<h2 class="ex-h2">🧠 Xatolar ustida ishlash</h2><div class="ex-grid">${wrongs.map((r) => `<article class="ex-tc"><b>${esc(r.title)}</b><p class="ex-mut">${r.detail.filter((d) => !d.ok).length} ta xato</p><button class="btn sec sm" data-res="${r.id}">Ko'rish</button></article>`).join('')}</div>` : ''}
      ${grp(['missed']).length ? sec('Muddati o\'tgan', grp(['missed']), '') : ''}</div>`;
    app.querySelectorAll('[data-open]').forEach((b) => { b.onclick = () => { const as = S2.assigns.find((x) => x.id === b.dataset.open); modal(`<div class="ex-card-h"><h3>Test</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div>${notifCard(as)}`, (w, close) => wireNotif(w, close)); }; });
    wireNotif(app, null);
    app.querySelectorAll('[data-res]').forEach((b) => { b.onclick = () => resultModal(S2.res[b.dataset.res]); });
  }
  function resultModal(r) {
    if (!r) return; const as = S2.assigns.find((x) => x.id === r.aid); const qs = as ? QS(as, r.v) : [];
    const g = grade(r.pct);
    modal(`<div class="ex-card-h"><h3>${esc(r.title)}</h3><button class="ex-x" data-x aria-label="Yopish">✕</button></div>
      <div class="ex-big ex-${g[1]}"><b>${r.pct}%</b><span>${g[0]}</span></div>
      <div class="ex-cards sm"><div class="ex-kpi"><b>${r.total}</b><span>Jami</span></div><div class="ex-kpi"><b>${r.answered}</b><span>Ishlangan</span></div><div class="ex-kpi ok"><b>${r.correct}</b><span>To'g'ri</span></div><div class="ex-kpi bad"><b>${r.wrong}</b><span>Noto'g'ri</span></div><div class="ex-kpi"><b>${r.blank}</b><span>Javobsiz</span></div><div class="ex-kpi"><b>${fmtT(r.spent)}</b><span>Vaqt</span></div></div>
      <p class="ex-mut">${r.v + 1}-variant · ${(LV[r.level] || LV.m)[0]}</p>
      ${r.reveal ? `<div class="ex-scroll">${qs.map((q, i) => { const d = (r.detail || []).find((x) => x.id === q.id) || {}; return qView(q, i + 1, [0, 1, 2, 3], d.a, { c: d.c, ro: true }); }).join('')}</div>` : '<p class="ex-warn">To\'g\'ri javoblar o\'qituvchi ruxsat bergandan keyin ochiladi.</p>'}`);
  }

  /* ---------- Test ishlash sahifasi ---------- */
  let runStop = null;
  async function runPage(app, aid) {
    if (runStop) runStop();
    startWatch();
    app.innerHTML = `<div class="wrap"><div class="zk-lazy" role="status"><span class="zk-lazy-spin"></span>Test yuklanmoqda…</div></div>`;
    const b = B(), uid = A().user.uid;
    let as = S2.assigns.find((x) => x.id === aid) || await b.getT('examAssign', aid).catch(() => null);
    if (!as) { app.innerHTML = '<div class="wrap"><p class="ex-err">Test topilmadi yoki sizga yuborilmagan.</p><a class="btn sec" href="#exams">Mening testlarim</a></div>'; return; }
    as.id = aid;
    let at = myLatest(aid);
    if (!at) { const l = await b.query('examAttempts', 'uid', '==', uid).catch(() => []); l.filter((t) => t.aid === aid).forEach((t) => { if (!at || (t.n || 1) > (at.n || 1)) at = t; }); }
    if (!at) { app.innerHTML = '<div class="wrap"><p class="ex-warn">Bu test hali boshlanmagan.</p><a class="btn" href="#exams">Mening testlarim</a></div>'; return; }
    const id = at.id || `${aid}_${uid}_${at.n || 1}`;
    if (typeof at.startedAt !== 'number') { const f = await b.getT('examAttempts', id); if (f) at = Object.assign(f, { id }); }
    const qs = QS(as, at.v || 0), r = rng(id);
    const order = shuffled(qs.length, r), optOrd = qs.map(() => shuffled(4, r));
    const deadline = Math.min(at.startedAt + as.dur * 60000, as.end);
    const LS = 'zk_ex_ans_' + id; let ans = Object.assign({}, at.ans || {}); try { Object.assign(ans, JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) { }
    let cur = 0, ended = at.done || Date.now() > deadline + 20000, saving = 0, pending = false, net = navigator.onLine;
    const save = (final) => {
      try { localStorage.setItem(LS, JSON.stringify(ans)); } catch (e) { }
      if (Date.now() > deadline + 20000) return Promise.resolve();
      const data = { ans, saved: b.NOW }; if (final) Object.assign(data, { done: true, doneAt: b.NOW });
      pending = true; status();
      return b.put('examAttempts', id, data, true).then(() => { pending = false; status(); }).catch((e) => { pending = true; status(e); });
    };
    const status = (e) => { const s = app.querySelector('#exSave'); if (s) s.textContent = !navigator.onLine ? "📴 Internet yo'q — javoblar qurilmada saqlandi, ulanganda yuboriladi" : e ? '⚠️ Saqlanmadi, qayta urinilmoqda' : pending ? '⏳ Saqlanmoqda…' : '✅ Saqlandi'; };
    const finish = async (auto) => { if (ended) return; ended = true; clearInterval(tm); await save(true); draw(); toast(auto ? 'Vaqt tugadi — test yakunlandi' : 'Test yakunlandi'); };
    const draw = () => {
      if (!app.isConnected) return;
      if (ended) { app.innerHTML = `<div class="wrap ex-wrap"><div class="panel ex-done"><h2>✅ Test yakunlandi</h2><p>«${esc(as.title)}» — javoblaringiz saqlandi (${Object.keys(ans).length}/${qs.length}).</p><p class="ex-mut">Natija o'qituvchi tekshirgach «Mening testlarim» bo'limida chiqadi.</p><a class="btn" href="#exams">Mening testlarim</a></div></div>`; return; }
      const qi = order[cur], q = qs[qi];
      app.innerHTML = `<div class="ex-run"><div class="ex-run-top"><div><b>${esc(as.title)}</b><span class="ex-mut">${cur + 1} / ${qs.length} · Javob berildi: ${Object.keys(ans).length}</span></div><div class="ex-timer" id="exTm" role="timer" aria-live="off"></div></div>
        <div class="ex-pal" aria-label="Savollar">${order.map((x, i) => `<button type="button" class="${i === cur ? 'cur' : ''} ${ans[qs[x].id] != null ? 'ans' : ''}" data-k="${i}" aria-label="${i + 1}-savol${ans[qs[x].id] != null ? ', javob berilgan' : ''}">${i + 1}</button>`).join('')}</div>
        <div class="wrap ex-wrap">${qView(q, cur + 1, optOrd[qi], ans[q.id])}
        <div class="ex-nav"><button class="btn sec" id="exPrev" ${cur ? '' : 'disabled'}>← Oldingi</button><button class="btn sec" id="exSkip">Javobsizlarga o'tish</button><button class="btn sec" id="exNext" ${cur < qs.length - 1 ? '' : 'disabled'}>Keyingi →</button></div>
        <div class="ex-acts"><button class="btn" id="exFin">🏁 Testni yakunlash</button><span class="ex-mut" id="exSave"></span></div></div></div>`;
      status(); tick();
      app.querySelectorAll('.ex-cb').forEach((c) => { c.onclick = () => { ans[q.id] = +c.dataset.j; save(); draw(); }; });
      app.querySelectorAll('[data-k]').forEach((c) => { c.onclick = () => { cur = +c.dataset.k; draw(); }; });
      app.querySelector('#exPrev').onclick = () => { cur--; draw(); };
      app.querySelector('#exNext').onclick = () => { cur++; draw(); };
      app.querySelector('#exSkip').onclick = () => { const k = order.findIndex((x, i) => i > cur && ans[qs[x].id] == null); const k2 = k >= 0 ? k : order.findIndex((x) => ans[qs[x].id] == null); if (k2 >= 0) { cur = k2; draw(); } else toast('Hamma savolga javob berilgan'); };
      app.querySelector('#exFin').onclick = () => { const left = qs.length - Object.keys(ans).length; modal(`<h3>Testni yakunlaysizmi?</h3>${left ? `<p class="ex-warn">${left} ta savolga javob berilmagan.</p>` : '<p>Barcha savollarga javob berdingiz.</p>'}<p>Yakunlagandan keyin javoblarni o'zgartirib bo'lmaydi.</p><div class="ex-acts"><button class="btn" id="exFinOk">Yakunlash</button><button class="btn sec" data-x>Davom etish</button></div>`, (w, close) => { w.querySelector('#exFinOk').onclick = () => { close(); finish(false); }; }); };
    };
    const tick = () => { const el = document.getElementById('exTm'); const left = deadline - Date.now(); if (el) { el.textContent = '⏱ ' + fmtT(left); el.classList.toggle('low', left < 60000); } if (left <= 0) finish(true); };
    const tm = setInterval(tick, 1000);
    const on = () => { status(); if (navigator.onLine && pending) save(); };
    window.addEventListener('online', on); window.addEventListener('offline', on);
    runStop = () => { clearInterval(tm); window.removeEventListener('online', on); window.removeEventListener('offline', on); runStop = null; };
    const hs = () => { if (!location.hash.startsWith('#exam/')) { if (runStop) runStop(); window.removeEventListener('hashchange', hs); } };
    window.addEventListener('hashchange', hs);
    draw();
  }

  /* ---------- CSS ---------- */
  function css() {
    if (document.getElementById('exCss')) return;
    const s = document.createElement('style'); s.id = 'exCss';
    s.textContent = `:root{--ex-g:#16a34a;--ex-y:#d97706;--ex-r:#dc2626}
.ex-wrap{padding-bottom:48px}.ex-tabs{margin:8px 0 18px;display:flex;flex-wrap:wrap;gap:6px}.ex-body{min-height:200px}
.ex-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.ex-tc,.ex-ntf{display:block;background:var(--card,#fff);border:1px solid var(--line,#e5e7eb);border-radius:14px;padding:14px;color:inherit;text-decoration:none;box-shadow:0 1px 2px rgba(0,0,0,.04)}
a.ex-tc:hover{border-color:var(--brand,#6d28d9)}.ex-tc-h{display:flex;gap:8px;align-items:flex-start;justify-content:space-between}.ex-tc-h b{font-size:1.02rem}
.ex-mut{color:var(--muted,#6b7280);font-size:.9rem;margin:4px 0}.ex-hint{font-size:.88rem;color:var(--muted,#6b7280)}.ex-err{color:var(--ex-r)}
.ex-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0}.ex-danger{color:var(--ex-r)!important}
.ex-lv,.ex-st,.ex-pct{display:inline-block;padding:2px 9px;border-radius:999px;font-size:.78rem;font-weight:700;white-space:nowrap}
.ex-g{background:#dcfce7;color:#166534}.ex-y{background:#fef3c7;color:#92400e}.ex-r{background:#fee2e2;color:#991b1b}
.ex-bar{display:inline-block;width:90px;height:8px;background:var(--line,#e5e7eb);border-radius:9px;overflow:hidden;vertical-align:middle;margin:0 6px}.ex-bar i{display:block;height:100%}.ex-bar i.ex-g{background:var(--ex-g)}.ex-bar i.ex-y{background:var(--ex-y)}.ex-bar i.ex-r{background:var(--ex-r)}
.ex-st.on{background:#dbeafe;color:#1e40af}.ex-st.wait{background:#f3f4f6;color:#374151}.ex-st.off{background:#fee2e2;color:#991b1b}.ex-st.ok{background:#dcfce7;color:#166534}
.ex-form label{display:flex;flex-direction:column;gap:4px;font-weight:600;font-size:.9rem;flex:1;min-width:180px}.ex-form input,.ex-form select,.ex-form textarea{font:inherit;padding:9px 10px;border:1px solid var(--line,#d1d5db);border-radius:10px;background:var(--card,#fff);color:inherit}
.ex-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px}.ex-vars{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:10px 0}.ex-vars button{border:1px solid var(--line,#d1d5db);background:var(--card,#fff);color:inherit;border-radius:999px;padding:6px 12px;cursor:pointer}.ex-vars button.on{background:var(--brand,#6d28d9);color:#fff;border-color:transparent}
.ex-qs{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px}.ex-q{border:1px solid var(--line,#e5e7eb);border-radius:14px;padding:12px;background:var(--card,#fff)}
.ex-q-h{display:flex;gap:8px;align-items:center;margin-bottom:8px}.ex-q-h select{width:auto;min-width:0}.ex-q-h button{border:1px solid var(--line,#d1d5db);background:none;color:inherit;border-radius:8px;width:34px;height:34px;cursor:pointer}.ex-sp{flex:1}.ex-q textarea{width:100%;box-sizing:border-box}
.ex-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}@media(max-width:640px){.ex-opts{grid-template-columns:1fr}}
.ex-opt{flex-direction:row!important;align-items:center;gap:8px!important;border:1px solid var(--line,#e5e7eb);border-radius:10px;padding:6px 8px;min-width:0!important}.ex-opt.ok{border-color:var(--ex-g);background:rgba(22,163,74,.06)}.ex-opt input[data-f=o]{flex:1;min-width:0}
.ex-img img{max-width:240px;max-height:160px;border-radius:8px;display:block;margin:8px 0}.ex-sticky{position:sticky;bottom:0;background:var(--bg,#fff);padding:10px 0;border-top:1px solid var(--line,#e5e7eb);z-index:2}
.ex-modal{position:fixed;inset:0;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:12px}
.ex-card{background:var(--card,#fff);color:var(--ink,#111);border-radius:18px;padding:18px;max-width:720px;width:100%;max-height:92vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}.ex-card-h{display:flex;justify-content:space-between;align-items:center;gap:10px}.ex-card h3{margin:0 0 8px}
.ex-x{border:0;background:none;font-size:1.3rem;cursor:pointer;color:inherit;width:40px;height:40px}.ex-scroll{display:flex;flex-direction:column;gap:12px;margin-top:10px}
.ex-qv{border:1px solid var(--line,#e5e7eb);border-radius:14px;padding:14px;background:var(--card,#fff)}.ex-qv-h{display:flex;justify-content:space-between;margin-bottom:6px}.ex-qt{font-size:1.06rem;line-height:1.5;margin-bottom:10px}.ex-qimg{max-width:100%;max-height:340px;border-radius:10px;margin-bottom:10px}
.ex-ch{display:flex;flex-direction:column;gap:8px}.ex-cb{display:flex;gap:10px;align-items:center;text-align:left;border:2px solid var(--line,#e5e7eb);background:var(--card,#fff);color:inherit;border-radius:12px;padding:12px;font:inherit;cursor:pointer;min-height:48px}.ex-cb b{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--line,#eef0f3);flex:none}
.ex-cb.on{border-color:var(--brand,#6d28d9);background:rgba(109,40,217,.07)}.ex-cb.on b{background:var(--brand,#6d28d9);color:#fff}.ex-cb.ok{border-color:var(--ex-g);background:rgba(22,163,74,.08)}.ex-cb.no{border-color:var(--ex-r);background:rgba(220,38,38,.08)}.ex-cb:disabled{cursor:default}
.ex-warn{background:#fef3c7;color:#92400e;border-radius:10px;padding:10px 12px;font-size:.92rem}.ex-dl{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;margin:10px 0;font-size:.92rem}.ex-dl dt{color:var(--muted,#6b7280)}.ex-dl dd{margin:0;font-weight:600}
.ex-stu{border:1px solid var(--line,#e5e7eb);border-radius:12px;padding:10px;margin-bottom:10px;max-height:260px;overflow:auto}.ex-stl{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px;margin-top:8px}.ex-tpl{grid-template-columns:1fr}.ex-nk{background:#fef3c7;color:#92400e;border-radius:8px;padding:2px 8px;font-size:.8rem;font-weight:700}.ex-r3{flex-wrap:nowrap}.ex-r3 label{min-width:0!important}.ex-r3 input{width:100%;box-sizing:border-box}.ex-col{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}.ex-form [hidden]{display:none!important}.ex-stl label,.ex-all{flex-direction:row!important;align-items:center;gap:6px!important;font-weight:500!important;min-width:0!important}
.ex-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin:8px 0 16px}.ex-cards.sm{grid-template-columns:repeat(3,1fr)}.ex-kpi{background:var(--card,#fff);border:1px solid var(--line,#e5e7eb);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:2px}.ex-kpi b{font-size:1.35rem}.ex-kpi span{color:var(--muted,#6b7280);font-size:.82rem}.ex-kpi.on{border-color:#93c5fd}.ex-kpi.ok{border-color:#86efac}.ex-kpi.bad{border-color:#fca5a5}
.ex-tbl-w{overflow-x:auto;border:1px solid var(--line,#e5e7eb);border-radius:14px}.ex-tbl{width:100%;border-collapse:collapse;font-size:.92rem}.ex-tbl th,.ex-tbl td{padding:9px 10px;border-bottom:1px solid var(--line,#eef0f3);text-align:left;white-space:nowrap}.ex-tbl th{background:var(--soft,#f8fafc);font-size:.8rem;text-transform:uppercase;letter-spacing:.03em}
.ex-donut-row{display:flex;gap:18px;align-items:center;flex-wrap:wrap;margin-bottom:14px}.ex-donut{width:110px;height:110px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}.ex-donut span{background:var(--card,#fff);width:66px;height:66px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem}
.ex-leg{list-style:none;padding:0;margin:0;font-size:.9rem}.ex-leg i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;vertical-align:middle}.ex-leg i.ex-g{background:var(--ex-g)}.ex-leg i.ex-y{background:var(--ex-y)}.ex-leg i.ex-r{background:var(--ex-r)}
.ex-top{font-size:.92rem}.ex-empty{text-align:center;padding:40px 10px}.ex-h2{margin:22px 0 10px;font-size:1.2rem}.ex-h2 small{color:var(--muted,#6b7280);font-weight:500}
.ex-subj{padding:14px;margin-bottom:10px}.ex-sr{display:flex;align-items:center;gap:8px;margin:6px 0}.ex-sr span:first-child{min-width:110px}.ex-res{display:flex;align-items:center;gap:6px;margin:8px 0;flex-wrap:wrap}
.ex-big{text-align:center;border-radius:14px;padding:14px;margin:8px 0}.ex-big b{display:block;font-size:2.4rem}.ex-done{text-align:center;padding:30px 16px;margin-top:20px}
.ex-run-top{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 16px;background:var(--card,#fff);border-bottom:1px solid var(--line,#e5e7eb)}.ex-run-top>div:first-child{display:flex;flex-direction:column}
.ex-timer{font-size:1.4rem;font-weight:800;font-variant-numeric:tabular-nums;background:#dbeafe;color:#1e3a8a;padding:6px 12px;border-radius:12px}.ex-timer.low{background:#fee2e2;color:#991b1b;animation:exP 1s infinite}@keyframes exP{50%{opacity:.6}}
.ex-pal{display:flex;gap:6px;overflow-x:auto;padding:10px 16px}.ex-pal button{flex:none;width:38px;height:38px;border-radius:10px;border:1px solid var(--line,#d1d5db);background:var(--card,#fff);color:inherit;font-weight:700;cursor:pointer}.ex-pal button.ans{background:#dcfce7;border-color:#86efac;color:#166534}.ex-pal button.cur{outline:3px solid var(--brand,#6d28d9);outline-offset:1px}
.ex-nav{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:14px}
.ex-bell{position:relative;border:0;background:none;font-size:1.25rem;cursor:pointer;width:42px;height:42px;border-radius:12px;color:inherit}.ex-bell:hover{background:rgba(0,0,0,.06)}.ex-badge{position:absolute;top:3px;right:2px;background:var(--ex-r);color:#fff;font-size:.68rem;font-weight:800;min-width:17px;height:17px;border-radius:9px;display:flex;align-items:center;justify-content:center;padding:0 4px}.ex-badge.pulse{animation:exP 1.4s infinite}
.ex-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#111827;color:#fff;padding:10px 16px;border-radius:12px;opacity:0;transition:.25s;z-index:1100;pointer-events:none;max-width:90vw}.ex-toast.on{opacity:1;transform:translateX(-50%)}
html[data-theme=dark] .ex-g,body.dark .ex-g{background:rgba(22,163,74,.2);color:#86efac}html[data-theme=dark] .ex-y,body.dark .ex-y{background:rgba(217,119,6,.2);color:#fcd34d}html[data-theme=dark] .ex-r,body.dark .ex-r{background:rgba(220,38,38,.2);color:#fca5a5}html[data-theme=dark] .ex-warn{background:rgba(217,119,6,.18);color:#fcd34d}html[data-theme=dark] .ex-card{color:var(--ink,#f3f4f6)}
@media print{header.top,.bnav,.ex-acts,.ex-tabs,footer{display:none!important}.ex-tbl th,.ex-tbl td{white-space:normal}}
@media (prefers-reduced-motion:reduce){.ex-timer.low,.ex-badge.pulse{animation:none}}`;
    document.head.appendChild(s);
  }

  /* ---------- Kirish nuqtasi ---------- */
  function render(app, route) {
    css();
    const a = A(); if (!a || !a.enabled || !a.user) { app.innerHTML = '<div class="wrap"><p class="ex-warn">Testlar bo\'limi uchun tizimga kiring.</p></div>'; return; }
    if (route.startsWith('exam/')) { if (a.isStaff()) { location.hash = '#exams'; return; } return runPage(app, route.slice(5)); }
    const m = route.match(/^exams\/a\/(.+)$/);
    if (a.isStaff()) { if (m) return monitor(app, m[1]); stopMon(); return teacherPage(app); }
    return studentPage(app);
  }
  function boot() {
    const a = A(); if (!a || !a.enabled) return;
    (a.ready ? a.ready() : Promise.resolve()).then(() => {
      if (!a.user) return; css();
      const nav = document.getElementById('nav');
      if (nav && !document.getElementById('navExams')) { const l = document.createElement('a'); l.id = 'navExams'; l.href = '#exams'; l.dataset.nav = 'exams'; l.textContent = a.isStaff() ? '📝 Testlar (yuborish)' : '📝 Mening testlarim'; nav.appendChild(l); }
      if (a.isStaff()) { if (!bgT) { bgT = setInterval(bgGrade, 60000); setTimeout(bgGrade, 5000); } }
      else { startWatch(); setTimeout(bell, 500); }
    }).catch(() => { });
  }
  window.ZKExam = { render, boot, _grade: gradeAttempt, _rng: rng, _fx: fx, _rows: rowsToQs, _csv: parseCsv, _toQ: toQ, _paras: parseTestParas };
  boot();
})();
