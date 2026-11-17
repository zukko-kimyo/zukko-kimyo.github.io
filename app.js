(function () {
  const I18N = {
    school: { uz: 'Zukko Xalqaro Maktabi', en: 'Zukko International School' },
    nav_home: { uz: 'Bosh sahifa', en: 'Home' }, nav_g6: { uz: '6-sinf', en: 'Grade 6' }, nav_g7: { uz: '7-sinf', en: 'Grade 7' }, nav_g8: { uz: '8-sinf', en: 'Grade 8' }, nav_grades: { uz: 'Sinflar', en: 'Grades' }, ng6: { uz: 'Boshlang‘ich bosqich', en: 'Foundation' }, ng7: { uz: 'Keyingi bosqich', en: 'Intermediate' }, ng8: { uz: 'Chuqurlashtirish', en: 'Advanced' },
    nav_lab: { uz: '3D laboratoriya', en: '3D Lab' }, nav_pt: { uz: 'Davriy jadval', en: 'Periodic table' }, nav_me: { uz: 'Yutuqlarim', en: 'My progress' }, b_home: { uz: 'Bosh', en: 'Home' }, b_tests: { uz: 'Testlar', en: 'Tests' }, tool_h: { uz: 'Interaktiv vosita', en: 'Interactive tool' }, pt_desc: { uz: "Elementlarni bosib o'rganing: tartib raqami, massa, elektron qavatlar, oilalar va o'yin rejimi.", en: 'Explore elements by clicking: atomic number, mass, shells, families and a game mode.' }, nav_book: { uz: 'Darslik', en: 'Textbook' },
    search: { uz: 'Qidirish…', en: 'Search…' },
    foot: { uz: "6–8-sinf kimyo darsliklari asosidagi interaktiv o'quv sayti", en: 'Interactive learning site based on the Grade 6–8 chemistry textbooks' },
    foot2: { uz: 'Bilim — kuch! Tadqiqot — kelajak!', en: 'Knowledge is power! Research is the future!' },
    hero_pill: { uz: '🧪 6–8-sinf kimyo • 2 tilda', en: '🧪 Grade 6–8 chemistry • 2 languages' },
    hero_h: { uz: 'Kimyoni <span>ko\'rib, tajriba qilib</span> o\'rganamiz!', en: 'Learn chemistry by <span>seeing and experimenting!</span>' },
    hero_p: { uz: "Zukko Xalqaro Maktabi darsliklaridagi barcha mavzular, darslik sahifalari, testlar va har bir tajribaning 3D animatsiyasi — o'zbek va ingliz tillarida.", en: 'Every topic from the Zukko International School textbooks, the original pages, quizzes and a 3D animation of every experiment — in Uzbek and English.' },
    start6: { uz: '6-sinfdan boshlash', en: 'Start Grade 6' }, start7: { uz: '7-sinf', en: 'Grade 7' }, open_lab: { uz: '3D laboratoriya', en: '3D Lab' },
    st_lessons: { uz: 'ta dars', en: 'lessons' }, st_exps: { uz: 'ta 3D tajriba', en: '3D experiments' }, st_pages: { uz: 'ta darslik sahifasi', en: 'textbook pages' },
    books_h: { uz: 'Darsliklar', en: 'Textbooks' }, books_p: { uz: 'Sinfni tanlang va mavzular bo\'yicha o\'rganing', en: 'Choose a grade and study topic by topic' },
    g6_t: { uz: '6-sinf Kimyo', en: 'Grade 6 Chemistry' }, g7_t: { uz: '7-sinf Kimyo', en: 'Grade 7 Chemistry' }, g8_t: { uz: '8-sinf Kimyo', en: 'Grade 8 Chemistry' }, start8: { uz: '8-sinf', en: 'Grade 8' },
    g8_d: { uz: "Noorganik birikmalar sinflari, davriy qonun va atom tuzilishi, kimyoviy bog'lanish, oksidlanish-qaytarilish, nometallar va galogenlar, Avogadro qonuni, oltingugurt, azot va fosfor.", en: 'Classes of inorganic compounds, the periodic law and atomic structure, chemical bonding, redox reactions, nonmetals and halogens, Avogadro’s law, sulfur, nitrogen and phosphorus.' },
    g6_d: { uz: "Modda va uning xossalari, atom, aralashmalar, reaksiyalar, suv, havo, oziq-ovqat, dorilar va ekologiya kimyosi.", en: 'Substances and properties, atoms, mixtures, reactions, water, air, food, medicines and ecology.' },
    g7_d: { uz: "Atom tuzilishi, element va izotoplar, valentlik, formula va tenglamalar, mol, davriy jadval, kislorod, vodorod, kislotalar va suv.", en: 'Atomic structure, elements and isotopes, valency, formulas and equations, the mole, the periodic table, oxygen, hydrogen, acids and water.' },
    orig_uz: { uz: 'Asl darslik: o\'zbekcha', en: 'Original: Uzbek' }, orig_en: { uz: 'Asl darslik: inglizcha', en: 'Original: English' },
    feat_h: { uz: 'Saytda nimalar bor?', en: "What's inside?" },
    f1: { uz: 'Dars mazmuni', en: 'Lesson content' }, f1d: { uz: 'Asosiy tushunchalar, atamalar va qiziqarli faktlar ikki tilda.', en: 'Key ideas, terms and fun facts in two languages.' },
    f2: { uz: '3D tajribalar', en: '3D experiments' }, f2d: { uz: 'Har bir tajriba bosqichma-bosqich 3D animatsiyada, mikro-ko\'rinish bilan.', en: 'Every experiment as a step-by-step 3D animation with a micro view.' },
    f3: { uz: 'Darslik sahifalari', en: 'Textbook pages' }, f3d: { uz: 'Har bir darsning asl sahifalari — rasmlar va topshiriqlar bilan.', en: 'The original pages of every lesson — with pictures and tasks.' },
    f4: { uz: 'Testlar', en: 'Quizzes' }, f4d: { uz: "Har bir mavzudan 10+ test (oson, o'rtacha, qiyin), tasodifiy to'plamlar va natija tahlili.", en: '10+ questions per topic (easy, medium, hard), random sets and result analysis.' },
    lab_h: { uz: '3D laboratoriya', en: '3D Laboratory' }, lab_p: { uz: 'Darsliklardagi tajribalarni xavfsiz, istalgancha takrorlang. Sahnani aylantiring, yaqinlashtiring, bosqichlarni o\'tkazing.', en: 'Repeat the textbook experiments safely, as often as you like. Rotate, zoom and step through each stage.' },
    all: { uz: 'Barchasi', en: 'All' }, with3d: { uz: '3D tajribali', en: 'With 3D' },
    lessons_of: { uz: 'darslar', en: 'lessons' }, lesson: { uz: 'Dars', en: 'Lesson' },
    t_content: { uz: 'Dars mazmuni', en: 'Lesson' }, t_pages: { uz: 'Darslik sahifalari', en: 'Textbook pages' }, t_lab: { uz: '3D tajriba', en: '3D experiment' }, t_quiz: { uz: 'Test', en: 'Quiz' }, ts_content: { uz: 'Mazmun', en: 'Lesson' }, ts_pages: { uz: 'Sahifalar', en: 'Pages' }, ts_lab: { uz: '3D tajriba', en: '3D lab' }, ts_quiz: { uz: 'Test', en: 'Quiz' }, swipe_hint: { uz: '👆 Barmoq bilan suring', en: '👆 Swipe to scroll' },
    keyq: { uz: 'Asosiy savol', en: 'Key question' }, main_ideas: { uz: 'Asosiy fikrlar', en: 'Main ideas' }, terms: { uz: 'Atamalar', en: 'Key terms' }, fact: { uz: 'Bilib oling!', en: 'Did you know?' },
    exps_here: { uz: 'Bu darsdagi tajribalar', en: 'Experiments in this lesson' }, watch: { uz: '▶ 3D da ko\'rish', en: '▶ Watch in 3D' },
    pages_note_uz: { uz: 'Darslikning asl sahifalari (o\'zbek tilida). Kattalashtirish uchun bosing.', en: 'Original textbook pages (in Uzbek). Click to enlarge.' },
    pages_note_en: { uz: 'Darslikning asl sahifalari (ingliz tilida). Kattalashtirish uchun bosing.', en: 'Original textbook pages (in English). Click to enlarge.' },
    quiz_h: { uz: 'Ha yoki yo\'q?', en: 'True or false?' }, yes: { uz: 'Ha', en: 'True' }, no: { uz: 'Yo\'q', en: 'False' },
    right: { uz: '✓ To\'g\'ri!', en: '✓ Correct!' }, wrong: { uz: '✗ Noto\'g\'ri. To\'g\'ri javob: ', en: '✗ Not quite. Correct answer: ' },
    score: { uz: 'Natija', en: 'Score' }, retry: { uz: 'Qayta', en: 'Retry' },
    prev: { uz: '← Oldingi dars', en: '← Previous' }, next: { uz: 'Keyingi dars →', en: 'Next →' }, all_lessons: { uz: 'Barcha darslar', en: 'All lessons' },
    no_lab: { uz: "Bu darsda alohida laboratoriya tajribasi yo'q. Boshqa 3D tajribalarni ko'ring:", en: 'This lesson has no separate lab experiment. Explore other 3D experiments:' },
    safety: { uz: "Xavfsizlik: tajribalar faqat o'qituvchi nazoratida, himoya ko'zoynagi va xalatda o'tkaziladi.", en: 'Safety: carry out experiments only under teacher supervision, wearing goggles and a lab coat.' },
    related: { uz: 'Bog\'liq darslar', en: 'Related lessons' }, open: { uz: 'Ochish', en: 'Open' },
    book_h: { uz: 'Darslikni varaqlash', en: 'Flip through the textbook' }, page: { uz: 'bet', en: 'page' },
    nores: { uz: 'Hech narsa topilmadi', en: 'Nothing found' }, no_lesson_n: { uz: '{n}-dars topilmadi (6-sinfda 35, 7-sinfda 72, 8-sinfda 68 ta dars bor)', en: 'Lesson {n} not found (grade 6 has 35, grade 7 has 72, grade 8 has 68 lessons)' }, of_word: { uz: 'dan', en: 'of' }, kb_hint: { uz: 'Klaviaturada ← → tugmalari bilan ham o\'tish mumkin', en: 'You can also use the ← → keys' }, grade: { uz: 'sinf', en: 'grade' },
    exp_word: { uz: 'tajriba', en: 'experiment' }, back_lab: { uz: '← Barcha tajribalar', en: '← All experiments' },
    hero_badge: { uz: '3D • aylantiring', en: '3D • drag to rotate' },
    nav_tests: { uz: 'Testlar', en: 'Tests' },
    t_h: { uz: 'Testlar markazi', en: 'Test centre' }, t_p: { uz: "Har bir mavzu bo'yicha kamida 10 ta savol: 3 ta oson, 4 ta o'rtacha, 3 ta qiyin. Har safar yangi tasodifiy to'plam tuziladi.", en: 'At least 10 questions per topic: 3 easy, 4 medium, 3 hard. A new random set is built every time.' },
    t_grade: { uz: 'Sinf', en: 'Grade' }, t_both: { uz: 'Hammasi', en: 'All' }, t_topics: { uz: 'Mavzular', en: 'Topics' }, t_all: { uz: 'Hammasini belgilash', en: 'Select all' }, t_none: { uz: 'Tozalash', en: 'Clear' },
    t_count: { uz: 'Savollar soni', en: 'Number of questions' }, t_diff: { uz: 'Qiyinlik', en: 'Difficulty' }, t_mix: { uz: 'Aralash (3:4:3)', en: 'Mixed (3:4:3)' },
    easy: { uz: 'Oson', en: 'Easy' }, medium: { uz: "O'rtacha", en: 'Medium' }, hard: { uz: 'Qiyin', en: 'Hard' },
    t_mode: { uz: 'Rejim', en: 'Mode' }, t_practice: { uz: 'Mashq — javob darhol ko\'rinadi', en: 'Practice — instant feedback' }, t_exam: { uz: 'Imtihon — natija oxirida, vaqt bilan', en: 'Exam — results at the end, timed' },
    t_start: { uz: 'Testni boshlash', en: 'Start test' }, t_quick: { uz: '⚡ Tasodifiy 20 ta savol', en: '⚡ Random 20 questions' }, t_bank: { uz: 'Savollar bazasi', en: 'Question bank' },
    t_selected: { uz: 'ta mavzu tanlandi', en: 'topics selected' }, t_pick: { uz: 'Kamida bitta mavzu tanlang', en: 'Select at least one topic' },
    q_word: { uz: 'Savol', en: 'Question' }, prev_q: { uz: '← Oldingi', en: '← Previous' }, next_q: { uz: 'Keyingi →', en: 'Next →' }, finish: { uz: 'Yakunlash', en: 'Finish' },
    check: { uz: 'Tekshirish', en: 'Check' }, res_h: { uz: 'Natija', en: 'Result' }, res_grade: { uz: 'Baho', en: 'Grade' }, by_diff: { uz: 'Qiyinlik bo\'yicha', en: 'By difficulty' }, by_topic: { uz: 'Mavzular bo\'yicha', en: 'By topic' },
    review: { uz: 'Javoblar tahlili', en: 'Answer review' }, your: { uz: 'Sizning javobingiz', en: 'Your answer' }, correct_a: { uz: "To'g'ri javob", en: 'Correct answer' }, noans: { uz: 'Javob berilmagan', en: 'Not answered' },
    retry_wrong: { uz: 'Xatolar ustida ishlash', en: 'Practise mistakes' }, new_test: { uz: 'Yangi test', en: 'New test' }, back_setup: { uz: '← Sozlamalar', en: '← Settings' }, history: { uz: 'Oxirgi natijalar', en: 'Recent results' },
    time_left: { uz: 'Qolgan vaqt', en: 'Time left' }, study: { uz: 'Mavzuni takrorlash', en: 'Review topic' }, new_set: { uz: '🔀 Yangi to\'plam', en: '🔀 New set' },
    lesson_bank: { uz: "Bu mavzu bo'yicha savollar bazasi", en: 'Question bank for this topic' }, calc_gen: { uz: 'hisoblash masalalari har safar yangidan tuziladi', en: 'calculation problems are generated fresh each time' },
    tf_hint: { uz: "Ha yoki yo'q?", en: 'True or false?' }, finished_q: { uz: 'Hamma savollarga javob berildi. Natijani ko\'rish uchun «Yakunlash» tugmasini bosing.', en: 'All questions answered. Press "Finish" to see your result.' },
    pages_tr: { uz: "Sahifalar matni (o'zbekcha tarjima)", en: 'Page text (English translation)' }, show_orig: { uz: '📷 Asl sahifalarni ko\'rish', en: '📷 Show original pages' }, show_tr: { uz: '📝 Tarjima matnini ko\'rish', en: '📝 Show translated text' },
    pg_in_uz: { uz: "Darslik sahifalari — o'zbek tilida. Kattalashtirish uchun bosing.", en: 'Textbook pages — Uzbek edition. Click to enlarge.' }, pg_in_en: { uz: 'Darslik sahifalari — ingliz tilida. Kattalashtirish uchun bosing.', en: 'Textbook pages — English edition. Click to enlarge.' }, see_en: { uz: '🇬🇧 Inglizcha nusxasi', en: '🇬🇧 English edition' }, see_uz: { uz: "🇺🇿 O'zbekcha nusxasi", en: '🇺🇿 Uzbek edition' }, both_ed: { uz: "📚 O'zbekcha va inglizcha nashr", en: '📚 Uzbek and English editions' },
    tr_note_uz: { uz: "Darslikning asl sahifalari inglizcha. Quyida ushbu ikki sahifaning to'liq o'zbekcha tarjimasi berilgan.", en: '' }, tr_note_en: { uz: '', en: 'The original pages are in Uzbek. Below is a full English translation of these two pages.' }, page_n: { uz: 'sahifa', en: 'page' }
  };
  const B = window.BOOKS;
  let showOrig = false, bookFlip = false;
  let lang = 'uz'; try { lang = localStorage.getItem('zk_lang') || 'uz'; } catch (e) { }
  const t = (k) => (I18N[k] ? I18N[k][lang] : k);
  const tr = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] || o.uz || ''));
  const app = document.getElementById('app');
  let labHandle = null, modalHandle = null;
  const GC = { g6: '#2563c9', g7: '#217a51', g8: '#00555a' }; // sinf ranglari — brend palitrasi
  const GN = { g6: 6, g7: 7, g8: 8 }; const GRADES = ['g6', 'g7', 'g8'];
  // Darslik bo'limlari ranglari — oldingi versiyadagidek (foydalanuvchi talabi, 2026-11-13).
  // Dars sahifasida ham shu bo'lim rangi ishlatiladi (--uc).
  const UC = ['#ff7a1a', '#8b5cf6', '#22c55e', '#ec4899', '#0ea5e9', '#f59e0b', '#14b8a6', '#ef4444', '#6366f1', '#84cc16'];
  // Bo'lim rangi ustidagi matn rangi: oq yetarli o'qilmasa (WCAG, katta matn 3:1) — to'q rang.
  const onCol = (hex) => { const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))); const L = 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; return 1.05 / (L + 0.05) >= 3 ? '#ffffff' : '#0f2a2c'; };
  // Kichik matn uchun (4.5:1): bo'lim rangi o'zi yetmasa — biroz to'qroq fon + oq matn.
  const ucStrong = (hex) => {
    const lum = (h) => { const v = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const L = lum(hex); if (1.05 / (L + 0.05) >= 4.5) return [hex, '#ffffff']; if ((L + 0.05) / 0.0717 >= 4.5) return [hex, '#0f2a2c'];
    let c = hex; for (let k = 0; k < 12 && 1.05 / (lum(c) + 0.05) < 4.6; k++) c = '#' + [1, 3, 5].map((i) => Math.round(parseInt(c.slice(i, i + 2), 16) * 0.92).toString(16).padStart(2, '0')).join('');
    return [c, '#ffffff'];
  };
  const unitIdx = (g, n) => Math.max(0, (B[g].units || []).filter((u) => u.from <= n).length - 1);
  const XPok = () => !!window.XP;
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function pagesOf(g, n) { return g === 'g6' ? [2 * n + 1, 2 * n + 2] : [2 * n + 2, 2 * n + 3]; }
  const PMAX = { g6: 75, g7: 150, g8: 142 };
  const PH = { g6: 1273, g6en: 1273, g7: 1271, g7uz: 1273, g8: 1273, g8en: 1273 };
  const ptag = (set, i, extra = '') => `<img ${extra} src="pages/s/${set}/${String(Math.floor(i / 4)).padStart(2, '0')}.webp" data-h="${PH[set]}" style="aspect-ratio:900/${PH[set]};object-fit:cover;object-position:50% ${((i % 4) * 100) / 3}%">`;
  const img = (g, i) => ptag(g, i);
  const ALT = { g6: 'g6en', g7: 'g7uz', g8: 'g8en' }, ORIG = { g6: 'uz', g7: 'en', g8: 'uz' };
  const altHas = (g, i) => (g === 'g6' ? i !== 2 && i >= 0 && i < 75 : i >= 0 && i < PMAX[g]);
  const pageLang = (g, i, flip) => { const want = flip ? (lang === 'uz' ? 'en' : 'uz') : lang; return want !== ORIG[g] && altHas(g, i) ? want : ORIG[g]; };
  const pimg = (g, i, flip, extra) => ptag(pageLang(g, i, flip) === ORIG[g] ? g : ALT[g], i, extra);
  const TOOLS = [{ id: 'ptable', href: '#ptable', icon: '🧩', t: 'nav_pt', d: 'pt_desc', lessons: [['g7', 17], ['g7', 18], ['g7', 26], ['g7', 27], ['g7', 35], ['g7', 36], ['g7', 37], ['g7', 38], ['g8', 4], ['g8', 5], ['g8', 6], ['g8', 7], ['g8', 13], ['g8', 26], ['g8', 43], ['g8', 55], ['g7', 13], ['g7', 14], ['g6', 5]] }];
  function toolsOf(g, n) { return TOOLS.filter((x) => x.lessons.some((l) => l[0] === g && l[1] === n)); }
  const toolCard = (x) => `<a class="toolcard" href="${x.href}"><div class="ic">${x.icon}</div><div><small>${t('tool_h')}</small><h4>${t(x.t)}</h4><p>${t(x.d)}</p></div><span class="go">→</span></a>`;
  function expsOf(g, n) { const gr = GN[g]; return Lab.list.filter((e) => (e.lessons || []).some((l) => l[0] === gr && l[1] === n)); }
  function lessonsOfExp(e) { return (e.lessons || []).map(([gr, n]) => ({ g: 'g' + gr, n, L: B['g' + gr].lessons[n - 1] })).filter((x) => x.L); }

  function setLang(l) {
    lang = l; showOrig = false; bookFlip = false; Lab.lang = l; try { localStorage.setItem('zk_lang', l); } catch (e) { }
    document.documentElement.lang = l;
    document.querySelectorAll('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === l));
    document.querySelectorAll('[data-i]').forEach((el) => (el.innerHTML = t(el.dataset.i)));
    document.getElementById('q').placeholder = t('search');
    // ekran o'quvchilar uchun nomlar (til bilan birga almashadi)
    const uz = l === 'uz', setA = (id, v) => { const e = document.getElementById(id); if (e) e.setAttribute('aria-label', v); };
    setA('zoom', uz ? 'Darslik sahifasi' : 'Textbook page'); setA('sres', uz ? 'Qidiruv natijalari' : 'Search results');
    setA('q', uz ? 'Mavzu yoki dars raqamini qidirish' : 'Search topics or lesson number');
    setA('burger', uz ? 'Menyu' : 'Menu'); setA('bnav', uz ? 'Pastki menyu' : 'Bottom navigation'); setA('nav', uz ? 'Asosiy menyu' : 'Main menu');
    document.querySelectorAll('.lang button').forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); b.setAttribute('lang', b.dataset.lang); });
    const sk = document.getElementById('zkSkip'); if (sk) sk.textContent = uz ? 'Asosiy qismga o‘tish' : 'Skip to main content';
    if (window.ZKAuth && ZKAuth.user) ZKAuth.chip();
    route();
  }
  function destroyLab() { if (labHandle) { labHandle.destroy(); labHandle = null; } }

  /* ---------- views ---------- */
  // Bosh sahifa: "Davom ettirish" kartasi — saytga faqat login bilan kiriladi, demak har bir kiruvchi o'quvchi.
  function heroCont() {
    if (!XPok() || !XP.s) return '';
    let g = 'g6', n = 1, started = false;
    if (/^g[678]-[1-9]\d*$/.test(XP.s.last || '')) { const p = XP.s.last.split('-'); g = p[0]; n = +p[1]; started = true; }
    const L = B[g] && B[g].lessons[n - 1]; if (!L) return '';
    const col = UC[unitIdx(g, n) % UC.length], u = (B[g].units || [])[unitIdx(g, n)];
    const uz = lang === 'uz', arrow = '<svg class="zi zk-hc-arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    const gp = XP.grade(g, B[g].lessons.length).p, C = 2 * Math.PI * 30;
    return `<a class="zk-hero-cont" href="#${g}-${n}" style="--uc:${col};--uc-on:${onCol(col)}">
      <span class="zk-hc-ring" title="${GN[g]}-${uz ? 'sinf' : 'grade'}: ${gp}%"><svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="30" class="tr"/><circle cx="36" cy="36" r="30" class="fg" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - gp / 100)).toFixed(1)}" style="stroke:${col}"/></svg><span class="lnum" style="background:${col};color:${onCol(col)}">${n}</span></span>
      <span class="zk-hc-t"><small>${started ? (uz ? 'DAVOM ETTIRISH' : 'CONTINUE') : (uz ? 'BIRINCHI DARS' : 'FIRST LESSON')} · ${GN[g]}-${uz ? 'SINF' : 'GRADE'}</small><b>${esc(tr(L.t))}</b>${u ? `<span>${esc(tr(u.t))}</span>` : ''}</span>
      <span class="zk-hc-go">${started ? (uz ? 'Davom etish' : 'Continue') : (uz ? 'Boshlash' : 'Start')}${arrow}</span></a>`;
  }

  // ---- Bosh sahifa (Shisha 2.0 dizayni) yordamchilari ----
  let homeGrade = 'g6';
  function homeGoal() {
    if (!XPok() || !XP.s) return '';
    const uz = lang === 'uz', st = XP.s, days = st.days || {}, goal = Math.max(1, +st.goal || 2);
    const dk = (d) => d.toLocaleDateString('sv'), now = new Date();
    const td = days[dk(now)] || {}, n = Array.isArray(td.ls) ? td.ls.length : 0, p = Math.min(100, Math.round((100 * n) / goal));
    const names = uz ? ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const wk = []; for (let i = 6; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i); const on = +((days[dk(d)] || {}).xp) > 0; wk.push(`<span class="${on ? 'on' : ''}${i === 0 ? ' today' : ''}" title="${dk(d)}">${names[d.getDay()]}</span>`); }
    return `<a class="zk-goal" href="#me"><div class="zk-goal-h"><b>${uz ? 'Bugungi maqsad' : 'Today’s goal'}</b><span><b>${n}</b> / ${goal} ${uz ? 'dars' : 'lessons'}</span></div>
      <div class="zk-goal-bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" aria-label="${uz ? 'Bugungi maqsad' : 'Today’s goal'}"><i style="width:${Math.max(p, 3)}%"></i></div>
      <div class="zk-week" aria-label="${uz ? 'Oxirgi 7 kun faolligi' : 'Activity in the last 7 days'}">${wk.join('')}</div></a>`;
  }
  function gradeCard(g) {
    const uz = lang === 'uz', n = GN[g], o = XPok() ? XP.grade(g, B[g].lessons.length) : { done: 0, p: 0 };
    const stage = { g6: uz ? 'Boshlang‘ich bosqich' : 'Foundation', g7: uz ? 'Keyingi bosqich' : 'Intermediate', g8: uz ? 'Chuqurlashtirish' : 'Advanced' }[g];
    return `<a class="gcard ${g}" href="#${g}"><span class="zk-gglow" aria-hidden="true"></span>
      <div class="zk-gtop"><span class="zk-grade-number">${n}</span><span class="zk-ggo" aria-hidden="true"><svg class="zi" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
      <h3>${n}-${uz ? 'sinf' : 'grade'} · ${stage}</h3><p>${t(g + '_d')}</p>
      <div class="zk-gmeta"><span><b>${B[g].lessons.length}</b> ${uz ? 'dars' : 'lessons'}</span><span><b>${(B[g].units || []).length}</b> ${uz ? 'bo‘lim' : 'units'}</span><span><b>${o.done}</b> ${uz ? 'bajarildi' : 'done'}</span></div>
      <div class="zk-gbar" role="progressbar" aria-valuenow="${o.p}" aria-valuemin="0" aria-valuemax="100" aria-label="${n}-${uz ? 'sinf' : 'grade'}"><i style="width:${Math.max(o.p, 2)}%"></i></div></a>`;
  }
  function miniPt() {
    let h = '';
    for (let r = 1; r <= 7; r++) for (let c = 1; c <= 18; c++) {
      const on = r === 1 ? c === 1 || c === 18 : r <= 3 ? c <= 2 || c >= 13 : true;
      const k = !on ? '' : c === 1 ? (r === 1 ? 'h' : 'a') : c === 2 ? 'ae' : c <= 12 ? 't' : c <= 16 ? 'p' : c === 17 ? 'x' : 'n';
      h += `<i class="${k}"></i>`;
    }
    return h;
  }
  function homeLessons(g, pg) {
    const uz = lang === 'uz', bk = B[g]; if (!bk) return '';
    const units = (bk.units || [{ from: 1, t: { uz: '', en: '' } }]).slice(0, 3);
    const seg = GRADES.filter((x) => B[x]).map((x) => `<button type="button" data-hg="${x}" class="${x === g ? 'on' : ''}" aria-pressed="${x === g}">${GN[x]}-${uz ? 'sinf' : 'grade'}</button>`).join('');
    const ui = GRADES.filter((x) => B[x]).indexOf(g);
    const body = units.map((u, i) => {
      const next = (bk.units[i + 1] || {}).from || bk.lessons.length + 1, total = next - u.from;
      const col = UC[i % UC.length], ls = [];
      for (let n = u.from; n < Math.min(next, u.from + 3); n++) {
        const L = bk.lessons[n - 1], st = XPok() ? XP.state(g, n) : '', ex = expsOf(g, n).length;
        const stat = st === 'done' ? `<span class="zk-st done">${uz ? 'Bajarildi' : 'Done'}</span>` : st ? `<span class="zk-st go" style="--uc:${col}">${uz ? 'Davom etmoqda' : 'In progress'}</span>` : `<span class="zk-st">${uz ? 'Yangi' : 'New'}</span>`;
        ls.push(`<a class="lcard zk-hl ${st}" href="#${g}-${n}" style="--uc:${col};--uc-on:${onCol(col)}"><div class="lnum" style="background:${col};color:${onCol(col)}">${st === 'done' ? '✓' : n}</div><div><h4>${esc(tr(L.t))}</h4><div class="tags">${stat}${ex ? '<span class="zk-st x">3D</span>' : ''}</div></div></a>`);
      }
      return `<div class="zk-hunit"><div class="unit-h" style="--uc:${col};--uc-on:${onCol(col)}"><span>${i + 1}</span>${esc(tr(u.t))}<i></i><a href="#${g}">${uz ? 'Barchasi' : 'All'} · ${total} ${uz ? 'dars' : 'lessons'}</a></div><div class="zk-hgrid">${ls.join('')}</div></div>`;
    }).join('');
    return `<div class="zk-lhead"><div><h2>${GN[g]}-${uz ? 'sinf darslari' : 'grade lessons'}</h2><p>${uz ? 'Bo‘lim ranglari darslikdagidek saqlangan' : 'Unit colours match the textbook'}</p></div>
      <div class="zk-seg3" role="group" aria-label="${uz ? 'Sinfni tanlash' : 'Choose grade'}"><span class="zk-seg3-t" style="--i:${ui};--p:${pg ? GRADES.filter((x) => B[x]).indexOf(pg) : ui}" aria-hidden="true"></span>${seg}</div></div>${body}`;
  }
  function bindHomeLessons() {
    const box = document.getElementById('zkLessons'); if (!box) return;
    box.querySelectorAll('[data-hg]').forEach((b) => (b.onclick = () => { const pg = homeGrade; homeGrade = b.dataset.hg; box.innerHTML = homeLessons(homeGrade, pg); box.classList.remove('zk-swap'); void box.offsetWidth; box.classList.add('zk-swap'); bindHomeLessons(); }));
  }

  function home() {
    const nL = GRADES.reduce((a, g) => a + (B[g] ? B[g].lessons.length : 0), 0);
    const hc = heroCont();
    const uz = lang === 'uz', ARR = '<svg class="zi zk-arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    app.innerHTML = `
    <section class="hero zk-hero-v3"><div class="wrap">
      <div class="zk-hero-content">
        <div class="zk-hero-kicker"><span class="zk-live-dot"></span>${uz ? 'ZUKKO XALQARO MAKTABI · RAQAMLI KIMYO' : 'ZUKKO INTERNATIONAL SCHOOL · CHEMISTRY'}</div>
        <h1>${uz ? 'Kimyoni ko‘r.' : 'See chemistry.'} <em>${uz ? 'Tajribada kashf et.' : 'Discover it in action.'}</em></h1>
        <p class="lead">${uz ? 'Darsliklardagi har bir mavzu, interaktiv 3D tajribalar va testlar — 6, 7 va 8-sinflar uchun bir joyda.' : 'Every textbook topic, interactive 3D experiments and quizzes — for grades 6, 7 and 8 in one place.'}</p>
        ${hc}
        <div class="btns${hc ? ' zk-btns-sec' : ''}">
          ${hc ? '' : `<a class="btn pri" href="#g6">${uz ? 'Darslarni boshlash' : 'Start learning'} ${ARR}</a>`}
          <a class="btn sec" href="#lab">🧪 ${uz ? '3D laboratoriya' : '3D laboratory'}</a>
          <a class="btn sec" href="#tests">✅ ${uz ? 'Testlar' : 'Quizzes'}</a>
        </div>
      </div>
      <button type="button" class="zk-scene-toggle" id="zkSceneToggle" aria-expanded="false" aria-controls="zkScene"><span class="zk-scene-toggle-ic">⚛️</span><span class="zk-scene-toggle-t"><b>${uz ? 'Molekulyar laboratoriya' : 'Molecular laboratory'}</b><small>${uz ? '3D atom modeli — ochish uchun bosing' : '3D atom model — tap to open'}</small></span><span class="zk-scene-toggle-ch" aria-hidden="true">⌄</span></button>
      <div class="zk-hero-scene" id="zkScene">
        <div class="zk-scene-top"><span>${uz ? 'MOLEKULYAR LABORATORIYA' : 'MOLECULAR LABORATORY'}</span><span class="zk-dots" aria-hidden="true"><i></i><i></i><i></i></span></div>
        <div class="hero-art"><span class="badge3d">✦ ${uz ? 'INTERAKTIV 3D' : 'INTERACTIVE 3D'}</span><div class="lab-host" id="heroLab"></div></div>
        <div class="zk-scene-bottom"><span>LAB / 001 — ATOM MODEL</span><span class="zk-scene-active">${uz ? 'TADQIQ ETING' : 'EXPLORE'}</span></div>
        <span class="zk-float-eq" aria-hidden="true">2H₂ + O₂ → 2H₂O</span>
      </div>
    </div></section>
    <section class="zk-home-row"><div class="wrap">
      <div class="zk-stats">
        <div><b>${nL}</b><span>${uz ? 'ta dars, 3 ta darslik' : 'lessons, 3 textbooks'}</span></div>
        <div><b>${Lab.list.length}</b><span>${t('st_exps')}</span></div>
        <div><b>2</b><span>${uz ? 'til: o‘zbek, ingliz' : 'languages: Uzbek, English'}</span></div>
      </div>
      ${homeGoal()}
    </div></section>
    <section class="blk zk-grades2"><div class="wrap">
      <div class="sec-h"><div><h2>${uz ? 'Sinfingizni tanlang' : 'Choose your grade'}</h2></div><p class="zk-sec-note">${uz ? 'Har bir sinf — o‘z darsligi asosida' : 'Each grade follows its own textbook'}</p></div>
      <div class="grades">${GRADES.filter((g) => B[g]).map(gradeCard).join('')}</div>
    </div></section>
    <section class="blk zk-bento-sec"><div class="wrap"><div class="zk-bento">
      <a class="zk-bcard zk-bpt" href="#ptable"><div class="zk-bh"><b>${uz ? 'Davriy jadval' : 'Periodic table'}</b><small>${uz ? '118 element' : '118 elements'}</small></div><div class="zk-minipt" aria-hidden="true">${miniPt()}</div><small>${uz ? 'Elementni bosing — atom tuzilishi 3D ko‘rinishda ochiladi' : 'Tap an element to open its atom in 3D'}</small></a>
      <a class="zk-bcard" href="#lab"><span class="zk-bic">🧪</span><b>${uz ? '3D laboratoriya' : '3D laboratory'}</b><small>${uz ? `${Lab.list.length} ta tajriba: reaksiyalar, kristall panjaralar va molekulalarni aylantirib ko‘ring.` : `${Lab.list.length} experiments: rotate reactions, crystal lattices and molecules.`}</small><span class="zk-blink">${uz ? 'Laboratoriyaga kirish' : 'Open the lab'} ${ARR}</span></a>
      <a class="zk-bcard" href="#tests"><span class="zk-bic">✅</span><b>${uz ? 'Testlar' : 'Quizzes'}</b><small>${uz ? 'Har bir darsga 10+ savol, uch darajada. Natija XP ga qo‘shiladi.' : '10+ questions per lesson at three levels. Results add XP.'}</small><span class="zk-lvls"><span class="dchip easy">${t('easy')}</span><span class="dchip medium">${t('medium')}</span><span class="dchip hard">${t('hard')}</span></span></a>
    </div></div></section>
    <section class="blk zk-lessons-sec"><div class="wrap"><div class="zk-lpanel" id="zkLessons">${homeLessons(homeGrade)}</div></div></section>`;
    bindHomeLessons();
    // Molekulyar laboratoriya: telefonda yig'ilgan holda turadi va 3D faqat ochilganda yuklanadi
    // (kompyuterda bosh blok yonida doim ko'rinadi).
    const host = document.getElementById('heroLab');
    const scene = document.getElementById('zkScene'), tog = document.getElementById('zkSceneToggle');
    const startHero = () => {
      if (labHandle || !window.THREE || !host.isConnected) return;
      labHandle = Lab.open(host, 'atom-model', { autoplay: true, quiet: true });
      if (labHandle) setTimeout(() => labHandle && labHandle.seek(9), 50);
    };
    const compact = window.matchMedia && matchMedia('(max-width: 760px)').matches;
    // Tezlik: 3D sahna sahifa ko'ringandan keyin, brauzer bo'shaganda quriladi — bosh sahifaga o'tish darhol bo'ladi.
    if (!compact) { const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200)); setTimeout(() => idle(startHero, { timeout: 800 }), 350); }
    tog.onclick = () => {
      const open = !scene.classList.contains('open');
      scene.classList.toggle('open', open); tog.setAttribute('aria-expanded', String(open)); tog.classList.toggle('open', open);
      if (open) startHero(); else if (labHandle) { destroyLab(); host.innerHTML = ''; }
    };
  }
  function gp(g) { if (!XPok()) return ''; const o = XP.grade(g, B[g].lessons.length); return `<div class="gpmini"><div class="xbar"><div style="width:${o.p}%"></div></div><small>⭐ ${o.done}/${o.total} • ${o.p}%</small></div>`; }
  function countExps(gr) { return Lab.list.filter((e) => (e.lessons || []).some((l) => l[0] === gr)).length; }
  function xcard(e) {
    const all = lessonsOfExp(e), MAXC = 3;
    const ls = all.slice(0, MAXC).map((x) => `<span class="chip ${x.g === 'g7' ? 'g' : x.g === 'g8' ? 'p' : ''}">${GN[x.g]}-${lang === 'uz' ? 'sinf' : 'gr'} • ${x.n}</span>`).join(' ')
      + (all.length > MAXC ? ` <span class="chip more" title="${esc(all.slice(MAXC).map((x) => GN[x.g] + '-' + x.n).join(', '))}">+${all.length - MAXC}</span>` : '');
    return `<a class="xcard" href="#lab-${e.id}"><div class="th">${e.icon || '🧪'}</div><div class="bd"><h4>${tr(e.title)}</h4><p>${tr(e.desc)}</p><div class="tags">${ls}</div><span class="go">${t('watch')}</span></div></a>`;
  }

  let filter3d = false;
  function list(g) {
    const bk = B[g]; const gr = GN[g];
    let html = '', cnt = 0;
    bk.lessons.forEach((L, i) => {
      const n = i + 1; if (bk.units) { const u = bk.units.find((u) => u.from === n); if (u && !filter3d) html += `<div class="unit-h" style="--uc:${UC[unitIdx(g, n) % UC.length]};--uc-on:${onCol(UC[unitIdx(g, n) % UC.length])}"><span>${unitIdx(g, n) + 1}</span>${tr(u.t)}</div>`; }
      const ex = expsOf(g, n); if (filter3d && !ex.length) return;
      const col = UC[unitIdx(g, n) % UC.length]; const ls = XPok() ? XP.state(g, n) : ''; const best = ls ? XP.s.L[g + '-' + n].best : 0;
      html += `<a class="lcard ${ls}" href="#${g}-${n}" style="--uc:${col};--uc-on:${onCol(col)};--i:${Math.min(cnt++, 24)}"><div class="lnum" style="background:${col};color:${onCol(col)}">${ls === 'done' ? '★' : n}</div><div><h4>${tr(L.t)}</h4><div class="tags">${ls === 'done' ? `<span class="chip ok">⭐ ${best}/10</span>` : ls ? `<span class="chip st">▶ ${XP.t('st_start')}</span>` : ''}${ex.length ? `<span class="chip p">🧪 ${ex.length} 3D</span>` : ''}<span class="chip o">✅ 10+</span></div></div>${ls === 'done' ? '<span class="lstate">✓</span>' : ''}</a>`;
    });
    app.innerHTML = `<div class="page-h ${g}"><div class="wrap"><div class="crumbs"><a href="#home">${t('nav_home')}</a> / ${t('nav_' + g)}</div><h1>${t(g + '_t')}</h1><p>${t(g + '_d')}</p>${XPok() ? (() => { const o = XP.grade(g, bk.lessons.length); return `<div class="phprog"><div class="xbar big"><div style="width:${o.p}%"></div><i style="width:${Math.round((100 * (o.done + o.started)) / o.total)}%"></i></div><span>⭐ ${o.done} / ${o.total} ${XP.t('st_done').toLowerCase()} • ${o.p}%</span></div>`; })() : ''}</div></div>
      <div class="wrap"><div class="toolbar"><div class="seg"><button data-f="0" class="${filter3d ? '' : 'on'}">${t('all')} (${bk.lessons.length})</button><button data-f="1" class="${filter3d ? 'on' : ''}">🧪 ${t('with3d')}</button></div><a class="btn sec" href="#book-${g}" style="padding:8px 14px;font-size:14px">📖 ${t('nav_book')}</a></div>
      <div class="lgrid">${html}</div></div>`;
    app.querySelectorAll('.seg button').forEach((b) => (b.onclick = () => { filter3d = b.dataset.f === '1'; list(g); }));
  }

  function lesson(g, n, tab) {
    const bk = B[g]; const L = bk.lessons[n - 1]; if (!L) return list(g);
    destroyLab(); // tab almashganda oldingi 3D sahna yashirincha ishlab qolmasin
    const ex = expsOf(g, n); const gr = GN[g]; tab = tab || 'content';
    if (XPok()) XP.visit(g, n);
    const col = UC[unitIdx(g, n) % UC.length]; const lst = XPok() ? XP.state(g, n) : '';
    const pg = pagesOf(g, n);
    let body = '';
    if (tab === 'content') {
      body += L.q ? `<div class="keyq"><div class="ic">❓</div><div><b>${t('keyq')}</b>${tr(L.q)}</div></div>` : '';
      body += `<div class="panel prose"><h3>📘 ${tr(L.t)}</h3>${(L.intro ? [].concat(L.intro) : []).map((p) => `<p>${tr(p)}</p>`).join('')}</div>`;
      if (L.pts && L.pts.length) body += `<div class="panel"><h3>💡 ${t('main_ideas')}</h3><ul class="pts">${L.pts.map((p) => `<li>${tr(p)}</li>`).join('')}</ul></div>`;
      if (L.eq) body += `<div class="panel"><h3>⚗️ ${lang === 'uz' ? 'Formulalar va tenglamalar' : 'Formulas and equations'}</h3>${[].concat(L.eq).map((e) => `<div class="eqbox" style="margin-bottom:8px">${e}</div>`).join('')}</div>`;
      if (L.terms && L.terms.length) body += `<div class="panel"><h3>📖 ${t('terms')}</h3><div class="terms">${L.terms.map((x) => `<div class="term"><b>${tr(x[0])}</b><span>${tr(x[1])}</span></div>`).join('')}</div></div>`;
      if (ex.length) body += `<div class="panel"><h3>🧪 ${t('exps_here')}</h3>${ex.map(xinline).join('')}</div>`;
      const tl = toolsOf(g, n); if (tl.length) body += `<div class="panel"><h3>🧩 ${t('tool_h')}</h3>${tl.map(toolCard).join('')}</div>`;
      if (L.fact) body += `<div class="fact"><div class="ic">🌟</div><div><b>${t('fact')}</b> ${tr(L.fact)}</div></div>`;
    } else if (tab === 'pages' && pg.every((i) => altHas(g, i))) {
      const pl = pageLang(g, pg[0], showOrig);
      body += `<div class="panel"><div class="tr-bar"><div class="note" style="margin:0;flex:1">${t(pl === 'uz' ? 'pg_in_uz' : 'pg_in_en')}</div><button class="btn sec" id="trToggle" style="padding:8px 14px;font-size:13.5px">${t(pl === 'uz' ? 'see_en' : 'see_uz')}</button></div><div class="pages">${pg.map((i) => pimg(g, i, showOrig, `loading="lazy" alt="${t('page')} ${i}"`)).join('')}</div></div>`;
    } else if (tab === 'pages') {
      const origLang = g === 'g6' ? 'uz' : 'en';
      const trData = window.PAGES_TR && window.PAGES_TR[g] && window.PAGES_TR[g][n - 1];
      const showTr = lang !== origLang && trData && !showOrig;
      const imgs = `<div class="pages">${pg.map((i) => ptag(g, i, `loading="lazy" alt="${t('page')} ${i}"`)).join('')}</div>`;
      if (lang !== origLang && trData) {
        body += `<div class="panel"><div class="tr-bar"><div class="note" style="margin:0;flex:1">${t(g === 'g6' ? 'tr_note_en' : 'tr_note_uz')}</div><button class="btn sec" id="trToggle" style="padding:8px 14px;font-size:13.5px">${showTr ? t('show_orig') : t('show_tr')}</button></div>
          ${showTr ? `<div class="trpages">${trData.map((p, k) => `<article class="trpage"><div class="trp-h"><span>${GN[g]}-${lang === 'uz' ? 'SINF KIMYO' : 'GRADE CHEMISTRY'}</span><span>${t('lesson')} ${n} • ${pg[k] - (g === 'g6' ? 2 : 3)}-${t('page_n')}</span></div>${p}</article>`).join('')}</div>` : imgs}</div>`;
      } else body += `<div class="panel"><div class="note">${t(g === 'g6' ? 'pages_note_uz' : 'pages_note_en')}</div>${imgs}</div>`;
    } else if (tab === 'lab') {
      if (ex.length) {
        body += `<div class="panel" style="padding:14px"><div class="seg" style="margin-bottom:12px;flex-wrap:wrap" id="exSel">${ex.map((e, i) => `<button data-x="${e.id}" class="${i ? '' : 'on'}">${e.icon} ${tr(e.title)}</button>`).join('')}</div><div class="labpage"><div class="lab-host" id="lessonLab"></div></div><div class="safety">⚠️ ${t('safety')}</div></div>`;
      } else if (toolsOf(g, n).length) body += `<div class="panel">${toolsOf(g, n).map(toolCard).join('')}</div>`;
      else body += `<div class="panel"><p>${t('no_lab')}</p><div class="xgrid">${Lab.list.slice(0, 3).map(xcard).join('')}</div></div>`;
    } else if (tab === 'quiz') {
      const c = window.QB ? QB.counts(g, n) : { easy: 0, medium: 0, hard: 0 };
      body += `<div class="panel"><div class="bankline"><b>${t('lesson_bank')}:</b> <span class="dchip easy">${t('easy')}: ${c.easy}</span><span class="dchip medium">${t('medium')}: ${c.medium}</span><span class="dchip hard">${t('hard')}: ${c.hard}</span>${window.QB && QB.hasGen(g, n) ? `<small>∞ — ${t('calc_gen')}</small>` : ''}<button class="btn sec" id="newSet" style="margin-left:auto;padding:7px 12px;font-size:13px">${t('new_set')}</button></div><div id="quiz"></div></div>`;
    }
    const navl = bk.lessons.map((x, i) => `<a href="#${g}-${i + 1}" class="${i + 1 === n ? 'on' : ''}"><i>${i + 1}</i>${tr(x.t)}</a>`).join('');
    const prev = bk.lessons[n - 2], next = bk.lessons[n];
    const TABS = ['content', 'pages', 'lab', 'quiz']; const ti = Math.max(0, TABS.indexOf(tab)); const tp = lastTab && lastTab.key === g + '-' + n ? lastTab.i : ti; lastTab = { key: g + '-' + n, i: ti };
    const ucs = ucStrong(col); const ucv = `--uc:${col};--uc-on:${onCol(col)};--uc-bs:${ucs[0]};--uc-os:${ucs[1]}`;
    app.innerHTML = `<div class="lesson-top" style="${ucv}"><div class="wrap">
        <div class="crumbs" style="color:var(--muted)"><a href="#home">${t('nav_home')}</a> / <a href="#${g}">${t('nav_' + g)}</a> / ${t('lesson')} ${n}</div>
        <div class="lhead"><h1><span class="zk-sr">${lang === 'uz' ? n + '-dars: ' : 'Lesson ' + n + ': '}</span><span class="lnum" aria-hidden="true" style="background:${col};color:${onCol(col)}">${n}</span>${tr(L.t)}${lst === 'done' ? `<span class="lstat done">⭐ ${XP.t('st_done')}</span>` : ''}</h1>
          <div class="lnav" title="${t('kb_hint')}">${prev ? `<a class="lnb" href="#${g}-${n - 1}" aria-label="${t('prev')}">‹</a>` : '<span class="lnb off">‹</span>'}<span class="lpos"><b>${n}</b> / ${bk.lessons.length}</span>${next ? `<a class="lnb" href="#${g}-${n + 1}" aria-label="${t('next')}">›</a>` : '<span class="lnb off">›</span>'}</div></div>
        <div class="tabs" role="tablist"><span class="tthumb" aria-hidden="true" style="--ti:${ti};--tp:${tp}"></span>${TABS.map((k) => `<button data-tab="${k}" role="tab" id="ltab-${k}" aria-controls="lpanel" aria-selected="${tab === k}" tabindex="${tab === k ? 0 : -1}" class="${tab === k ? 'on' : ''}"><i class="ti" aria-hidden="true">${{ content: '📘', pages: '📄', lab: '🧪', quiz: '✅' }[k]}</i><span class="tlong">${t('t_' + k)}</span><span class="tsh">${t('ts_' + k)}</span>${k === 'lab' && (ex.length || toolsOf(g, n).length) ? `<span class="cnt">${ex.length + toolsOf(g, n).length}</span>` : ''}${k === 'quiz' ? `<span class="cnt q">10</span>` : ''}</button>`).join('')}</div>
      </div></div>
      <div class="wrap lesson-body" style="${ucv}">
        <div><div id="lpanel" role="tabpanel" aria-labelledby="ltab-${tab}">${body}</div>
          <div class="pn">${prev ? `<a href="#${g}-${n - 1}"><small>${t('prev')}</small>${tr(prev.t)}</a>` : '<span style="flex:1"></span>'}${next ? `<a class="r" href="#${g}-${n + 1}"><small>${t('next')}</small>${tr(next.t)}</a>` : '<span style="flex:1"></span>'}</div>
        </div>
        <aside class="side">
          ${ex.length ? `<div class="panel"><h4>🧪 ${t('t_lab')}</h4>${ex.map((e) => `<a href="#lab-${e.id}" class="sidex">${e.icon} ${tr(e.title)}</a>`).join('')}</div>` : ''}
          <div class="panel"><h4>📚 ${t('all_lessons')}</h4><div class="navl">${navl}</div></div>
        </aside>
      </div>
      <div class="fnav">${prev ? `<a href="#${g}-${n - 1}" title="${esc(tr(prev.t))}">‹ <span>${t('prev').replace(/[←→]/g, '').trim()}</span></a>` : '<span class="off">‹</span>'}<b>${n} / ${bk.lessons.length}</b>${next ? `<a href="#${g}-${n + 1}" title="${esc(tr(next.t))}"><span>${t('next').replace(/[←→]/g, '').trim()}</span> ›</a>` : '<span class="off">›</span>'}</div>`;
    // Tablar: bosilganda ham, strelkalar bilan ham; fokus yangi tabda qoladi
    const goTab = (k, focus) => { curTab = k; lesson(g, n, curTab); window.scrollTo({ top: 0 }); if (focus) { const nb = document.getElementById('ltab-' + k); if (nb) nb.focus({ preventScroll: true }); } };
    app.querySelectorAll('.tabs button').forEach((b) => (b.onclick = () => goTab(b.dataset.tab, true)));
    const tl = app.querySelector('.tabs[role=tablist]');
    if (tl) tl.onkeydown = (e) => {
      const i = TABS.indexOf(tab), j = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[e.key];
      if (j == null) return; e.preventDefault(); e.stopPropagation();
      // faqat fokus siljiydi (har bosishda dars qayta chizilmasin, 3D yuklanmasin); Enter/Space — tanlash
      const bs = [...tl.querySelectorAll('[role=tab]')], cur = bs.indexOf(document.activeElement), base = cur >= 0 ? cur : i;
      const jj = { ArrowRight: base + 1, ArrowLeft: base - 1, Home: 0, End: bs.length - 1 }[e.key];
      const nb = bs[(jj + bs.length) % bs.length]; if (nb) { bs.forEach((x) => (x.tabIndex = x === nb ? 0 : -1)); nb.focus(); }
    };
    app.querySelectorAll('.pages img').forEach((im) => pressable(im, () => zoomImg(im), `${t('page')} ${(im.getAttribute('alt') || '').replace(/\D+/g, '')} — ${lang === 'uz' ? 'kattalashtirish' : 'enlarge'}`));
    app.querySelectorAll('.xinline').forEach((el) => { const h4 = el.querySelector('h4'); pressable(el, () => openModal(el.dataset.x), (h4 ? h4.textContent.trim() + ' — ' : '') + (lang === 'uz' ? '3D tajribani ochish' : 'open 3D experiment')); });
    const on = app.querySelector('.navl a.on'); const nl = on && on.closest('.navl');
    if (on && nl) { const d = on.getBoundingClientRect().top - nl.getBoundingClientRect().top; nl.scrollTop += d - nl.clientHeight / 2 + on.offsetHeight / 2; } // faqat ro'yxat suriladi, sahifa sakramaydi
    if (tab === 'lab' && ex.length) {
      const run = (id) => { destroyLab(); labHandle = Lab.open(document.getElementById('lessonLab'), id, { autoplay: false }); };
      run(ex[0].id);
      app.querySelectorAll('#exSel button').forEach((b) => (b.onclick = () => { app.querySelectorAll('#exSel button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); run(b.dataset.x); }));
    }
    if (tab === 'quiz' && window.QB) { const run = () => runTest(document.getElementById('quiz'), QB.lessonTest(g, n), { mode: 'practice', compact: true, onNew: run, onFinish: (s, tot) => (XPok() ? XP.quiz(g, n, s, tot) : 0) }); run(); document.getElementById('newSet').onclick = run; }
    const tg = document.getElementById('trToggle'); if (tg) tg.onclick = () => { showOrig = !showOrig; lesson(g, n, 'pages'); };
  }

  /* ---------- test runner ---------- */
  const DL = { easy: 'easy', medium: 'medium', hard: 'hard' };
  function lessonTitle(it) { const L = B[it.g].lessons[it.n - 1]; return `${GN[it.g]}-${t('grade')} • ${t('lesson')} ${it.n}: ${tr(L.t)}`; }
  const uzL = () => lang === 'uz';
  function runTest(el, items, opts = {}) {
    const st = { i: 0, ans: items.map(() => null), done: false, start: Date.now(), timer: null };
    const exam = opts.mode === 'exam'; const limit = exam ? items.length * 60 : 0;
    function clearT() { if (st.timer) { clearInterval(st.timer); st.timer = null; } }
    const tmText = () => { const left = Math.max(0, limit - Math.floor((Date.now() - st.start) / 1000)); return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; };
    if (exam) st.timer = setInterval(() => { const left = limit - Math.floor((Date.now() - st.start) / 1000); const tEl = el.querySelector('.tm'); if (!document.body.contains(el)) return clearT(); if (left <= 0) { finish(); return; } if (tEl) tEl.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; }, 1000);
    const letters = ['A', 'B', 'C', 'D', 'E'];
    function draw() {
      if (st.done) return results();
      const it = items[st.i]; const a = st.ans[st.i]; const reveal = !exam && a != null;
      const answered = st.ans.filter((x) => x != null).length;
      el.innerHTML = `<div class="tr-run">
        <div class="tr-top"><div class="tr-prog"><div style="width:${100 * answered / items.length}%"></div></div><span>${t('q_word')} ${st.i + 1} / ${items.length}</span>${exam ? `<span class="tm-box">⏱ <b class="tm">${tmText()}</b></span>` : ''}</div>
        <div class="tr-meta"><span class="dchip ${it.d}">${t(DL[it.d])}</span><a href="#${it.g}-${it.n}" class="tr-topic">${lessonTitle(it)}</a></div>
        <div class="tr-q" id="trq" tabindex="-1">${it.tf ? `<small>${t('tf_hint')}</small>` : ''}${tr(it.q)}</div>
        <div class="tr-opts ${it.tf ? 'tf' : ''}" role="radiogroup" aria-labelledby="trq">${it.o.map((o, k) => { let cls = ''; if (a === k) cls = 'sel'; if (reveal) { if (k === it.a) cls = 'ok'; else if (a === k) cls = 'bad'; } return `<button type="button" role="radio" aria-checked="${a === k}" tabindex="${(a == null ? k === 0 : a === k) ? 0 : -1}" data-k="${k}" class="${cls}" ${reveal ? 'aria-disabled="true"' : ''}><i>${it.tf ? (k ? '✗' : '✓') : letters[k]}</i><span>${tr(o)}</span></button>`; }).join('')}</div>
        ${reveal ? `<div class="tr-fb ${a === it.a ? 'ok' : 'bad'}">${a === it.a ? t('right') : t('wrong') + '<b>' + tr(it.o[it.a]) + '</b>'}${it.e ? ' — ' + tr(it.e) : ''}</div>` : ''}
        ${answered === items.length && !opts.compact ? `<div class="note" style="margin-top:12px">${t('finished_q')}</div>` : ''}
        <div class="tr-nav"><button class="btn sec" id="qp" ${st.i ? '' : 'disabled'}>${t('prev_q')}</button>
          <div class="tr-pal" role="group" aria-label="${uzL() ? 'Savollar' : 'Questions'}">${items.map((x, k) => { const stt = st.ans[k] == null ? '' : exam ? (uzL() ? ', javob berilgan' : ', answered') : st.ans[k] === x.a ? (uzL() ? ', to‘g‘ri' : ', correct') : (uzL() ? ', noto‘g‘ri' : ', wrong'); return `<button type="button" data-j="${k}" aria-label="${t('q_word')} ${k + 1}${stt}" ${k === st.i ? 'aria-current="step"' : ''} class="${k === st.i ? 'cur' : ''} ${st.ans[k] != null ? (exam ? 'done' : (st.ans[k] === x.a ? 'okk' : 'badd')) : ''}">${k + 1}</button>`; }).join('')}</div>
          ${st.i < items.length - 1 ? `<button class="btn pri" id="qn">${t('next_q')}</button>` : `<button class="btn grn" id="qf">${t('finish')}</button>`}</div>
      </div>`;
      // Klaviatura va ekran o'quvchilar: javobdan keyin natija e'lon qilinadi, fokus mantiqiy joyga o'tadi
      const fq = () => { const x = el.querySelector('#trq'); if (x) x.focus({ preventScroll: true }); };
      const say = (txt) => { const an = document.getElementById('zkAnnounce'); if (an) { an.textContent = ''; setTimeout(() => (an.textContent = txt), 40); } };
      el.querySelectorAll('.tr-opts button').forEach((b) => (b.onclick = () => {
        if (b.getAttribute('aria-disabled') === 'true') return;
        st.ans[st.i] = +b.dataset.k; const was = st.i; if (exam && st.i < items.length - 1) { st.i++; } draw();
        if (!exam) { const fb = el.querySelector('.tr-fb'); if (fb) say(fb.textContent); const nx = el.querySelector('#qn,#qf'); if (nx) { nx.focus({ preventScroll: true }); if (nx.scrollIntoView) nx.scrollIntoView({ block: 'nearest' }); } }
        else if (st.i !== was) fq(); else { const o = el.querySelector(`.tr-opts [data-k="${st.ans[st.i]}"]`); if (o) o.focus({ preventScroll: true }); }
      }));
      { const og = el.querySelector('.tr-opts'); if (og) og.onkeydown = (e) => {
          // radiogroup: strelkalar fokusni siljitadi (javobni o'zi tanlamaydi — tanlash qaytarib bo'lmaydi), Enter/Space tanlaydi
          const bs = [...og.querySelectorAll('button')], i = bs.indexOf(document.activeElement); if (i < 0) return;
          const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; let j = null;
          if (d) j = (i + d + bs.length) % bs.length; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = bs.length - 1;
          if (j == null) return; e.preventDefault(); e.stopPropagation(); bs.forEach((b, k) => (b.tabIndex = k === j ? 0 : -1)); bs[j].focus();
        }; }
      el.querySelectorAll('.tr-pal button').forEach((b) => (b.onclick = () => { st.i = +b.dataset.j; draw(); fq(); }));
      const qp = el.querySelector('#qp'), qn = el.querySelector('#qn'), qf = el.querySelector('#qf');
      if (qp) qp.onclick = () => { st.i--; draw(); fq(); }; if (qn) qn.onclick = () => { st.i++; draw(); fq(); }; if (qf) qf.onclick = finish;
    }
    function finish() { clearT(); st.done = true; save(); st.gain = opts.onFinish ? opts.onFinish(score(), items.length) || 0 : 0; results();
      { const an = document.getElementById('zkAnnounce'); if (an) an.textContent = `${t('res_h')}: ${score()} / ${items.length}`; const h = el.querySelector('.tr-res h3'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } } if (!opts.compact) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90 }); }
    function score() { return items.reduce((s, it, k) => s + (st.ans[k] === it.a ? 1 : 0), 0); }
    function save() { try { const h = JSON.parse(localStorage.getItem('zk_hist') || '[]'); h.unshift({ d: Date.now(), s: score(), n: items.length, title: opts.title || lessonTitle(items[0]) }); localStorage.setItem('zk_hist', JSON.stringify(h.slice(0, 10))); } catch (e) { } }
    function results() {
      const s = score(), pct = Math.round(100 * s / items.length); const mark = pct >= 86 ? 5 : pct >= 71 ? 4 : pct >= 56 ? 3 : 2;
      const by = {}; ['easy', 'medium', 'hard'].forEach((d) => (by[d] = { ok: 0, n: 0 }));
      const topics = {}; items.forEach((it, k) => { by[it.d].n++; if (st.ans[k] === it.a) by[it.d].ok++; const key = it.g + '-' + it.n; topics[key] = topics[key] || { it, ok: 0, n: 0 }; topics[key].n++; if (st.ans[k] === it.a) topics[key].ok++; });
      const wrong = items.filter((it, k) => st.ans[k] !== it.a);
      const secs = Math.round((Date.now() - st.start) / 1000);
      el.innerHTML = `<div class="tr-res">
        <div class="res-top"><div class="ring" style="--p:${pct}"><b>${pct}%</b><small>${s}/${items.length}</small></div>
          <div><h3>${t('res_h')}: ${s} / ${items.length}</h3><p class="res-mark">${t('res_grade')}: <b class="m${mark}">${mark}</b> &nbsp;•&nbsp; ⏱ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}${st.gain ? ` &nbsp;<span class="xpgain">⚡ +${st.gain} XP</span>` : ''}</p>
          <div class="btns">${wrong.length ? `<button class="btn grn" id="rw">${t('retry_wrong')} (${wrong.length})</button>` : ''}<button class="btn pri" id="rn">${t('new_test')}</button>${opts.onBack ? `<button class="btn sec" id="rb">${t('back_setup')}</button>` : ''}</div></div></div>
        <h4>${t('by_diff')}</h4><div class="bars">${['easy', 'medium', 'hard'].filter((d) => by[d].n).map((d) => `<div class="bar"><span class="dchip ${d}">${t(d)}</span><div class="bt"><div class="bf ${d}" style="width:${100 * by[d].ok / by[d].n}%"></div></div><b>${by[d].ok}/${by[d].n}</b></div>`).join('')}</div>
        ${Object.keys(topics).length > 1 ? `<h4>${t('by_topic')}</h4><div class="tops">${Object.values(topics).sort((a, b) => a.ok / a.n - b.ok / b.n).map((x) => `<a href="#${x.it.g}-${x.it.n}" class="top-row"><span>${lessonTitle(x.it)}</span><b class="${x.ok === x.n ? 'g' : x.ok / x.n < 0.5 ? 'r' : ''}">${x.ok}/${x.n}</b></a>`).join('')}</div>` : ''}
        <h4>${t('review')}</h4><div class="rev">${items.map((it, k) => { const a = st.ans[k], ok = a === it.a; return `<div class="rev-i ${ok ? 'ok' : 'bad'}"><div class="rev-h"><span class="num">${k + 1}</span><span class="dchip ${it.d}">${t(it.d)}</span><span class="rev-q">${tr(it.q)}</span></div>${ok ? `<div class="rev-a ok">✓ ${tr(it.o[it.a])}</div>` : `<div class="rev-a bad">✗ ${t('your')}: ${a == null ? t('noans') : tr(it.o[a])}</div><div class="rev-a ok">✓ ${t('correct_a')}: ${tr(it.o[it.a])}</div><a class="rev-l" href="#${it.g}-${it.n}">📘 ${t('study')}</a>`}</div>`; }).join('')}</div>
      </div>`;
      const rw = el.querySelector('#rw'); if (rw) rw.onclick = () => runTest(el, wrong.map((x) => Object.assign({}, x)), Object.assign({}, opts, { mode: 'practice', onFinish: null }));
      el.querySelector('#rn').onclick = () => (opts.onNew ? opts.onNew() : null);
      const rb = el.querySelector('#rb'); if (rb) rb.onclick = opts.onBack;
    }
    draw();
    if (opts.focus) { const x = el.querySelector('#trq'); if (x) x.focus({ preventScroll: true }); }
  }

  /* ---------- tests centre ---------- */
  const TS = { grade: 'both', sel: null, count: 20, diff: 'mix', mode: 'practice' };
  function allLessons() { const out = []; GRADES.forEach((g) => { if (TS.grade !== 'both' && TS.grade !== g) return; B[g].lessons.forEach((L, i) => out.push([g, i + 1])); }); return out; }
  function testsPage() {
    if (!window.QB) { app.innerHTML = '<div class="wrap">…</div>'; return; }
    if (!TS.sel) TS.sel = new Set(allLessons().map((x) => x.join('-')));
    let bankTotal = 0; GRADES.forEach((g) => B[g].lessons.forEach((L, i) => { const P = QB.pool(g, i + 1); bankTotal += P.easy.length + P.medium.length + P.hard.length; }));
    let hist = []; try { hist = JSON.parse(localStorage.getItem('zk_hist') || '[]'); } catch (e) { }
    const groups = GRADES.filter((g) => TS.grade === 'both' || TS.grade === g).map((g) => {
      const bk = B[g]; let html = `<div class="tg-h">${t(g + '_t')}</div>`;
      bk.lessons.forEach((L, i) => { const n = i + 1; const u = (bk.units || []).find((u) => u.from === n); if (u) html += `<div class="tu-h">${tr(u.t)}</div>`; const key = g + '-' + n; html += `<label class="tl"><input type="checkbox" data-k="${key}" ${TS.sel.has(key) ? 'checked' : ''}><span class="lnum s" style="background:${ucStrong(UC[unitIdx(g, n) % UC.length])[0]};color:${ucStrong(UC[unitIdx(g, n) % UC.length])[1]}">${n}</span><span>${tr(L.t)}</span></label>`; });
      return html;
    }).join('');
    const seg = (name, val, opts) => `<div class="seg" data-seg="${name}">${opts.map(([v, l]) => `<button data-v="${v}" class="${String(TS[name]) === String(v) ? 'on' : ''}">${l}</button>`).join('')}</div>`;
    app.innerHTML = `<div class="page-h tests"><div class="wrap"><div class="crumbs"><a href="#home">${t('nav_home')}</a> / ${t('nav_tests')}</div><h1>✅ ${t('t_h')}</h1><p>${t('t_p')}</p><div class="stats" style="margin-top:14px"><div><b>${bankTotal}+</b><span>${t('t_bank')}</span></div><div><b>${GRADES.reduce((a, g) => a + B[g].lessons.length, 0)}</b><span>${t('t_topics')}</span></div><div><b>3 : 4 : 3</b><span>${t('easy')} : ${t('medium')} : ${t('hard')}</span></div></div></div></div>
    <div class="wrap" id="tWrap"><div class="tsetup">
      <div class="panel ts-l"><h3>📚 ${t('t_topics')} <small id="selc" style="font-weight:600;color:var(--muted);font-size:13px"></small></h3>
        <div class="ts-row">${seg('grade', TS.grade, [['both', t('t_both')], ['g6', t('nav_g6')], ['g7', t('nav_g7')], ['g8', t('nav_g8')]])}<button class="btn sec sm" id="sa">${t('t_all')}</button><button class="btn sec sm" id="sn">${t('t_none')}</button></div>
        <div class="tlist">${groups}</div></div>
      <div class="ts-r"><div class="panel"><h3>⚙️ ${lang === 'uz' ? 'Sozlamalar' : 'Settings'}</h3>
        <div class="ts-f" role="group" aria-labelledby="tsl1"><label id="tsl1">${t('t_count')}</label>${seg('count', TS.count, [[10, '10'], [20, '20'], [30, '30'], [50, '50']])}</div>
        <div class="ts-f" role="group" aria-labelledby="tsl2"><label id="tsl2">${t('t_diff')}</label>${seg('diff', TS.diff, [['mix', t('t_mix')], ['easy', t('easy')], ['medium', t('medium')], ['hard', t('hard')]])}</div>
        <div class="ts-f" role="group" aria-labelledby="tsl3"><label id="tsl3">${t('t_mode')}</label><div class="modes"><label><input type="radio" name="md" value="practice" ${TS.mode === 'practice' ? 'checked' : ''}> ${t('t_practice')}</label><label><input type="radio" name="md" value="exam" ${TS.mode === 'exam' ? 'checked' : ''}> ${t('t_exam')}</label></div></div>
        <button class="btn grn big" id="tgo">▶ ${t('t_start')}</button><button class="btn sec big" id="tq" style="margin-top:8px">${t('t_quick')}</button><div id="terr" class="terr" role="alert"></div></div>
        ${hist.length ? `<div class="panel"><h3>🕘 ${t('history')}</h3>${hist.map((h) => `<div class="hist"><span>${new Date(h.d).toLocaleDateString()} — ${h.title}</span><b>${h.s}/${h.n}</b></div>`).join('')}</div>` : ''}
      </div></div></div>`;
    const updC = () => (document.getElementById('selc').textContent = `(${TS.sel.size} ${t('t_selected')})`); updC();
    app.querySelectorAll('.tlist input').forEach((c) => (c.onchange = () => { c.checked ? TS.sel.add(c.dataset.k) : TS.sel.delete(c.dataset.k); updC(); }));
    app.querySelectorAll('[data-seg]').forEach((s) => s.querySelectorAll('button').forEach((b) => (b.onclick = () => { const k = s.dataset.seg; TS[k] = k === 'count' ? +b.dataset.v : b.dataset.v; if (k === 'grade') TS.sel = new Set(allLessons().map((x) => x.join('-'))); testsPage(); const f = app.querySelector(`[data-seg="${k}"] [data-v="${b.dataset.v}"]`); if (f) f.focus({ preventScroll: true }); })));
    app.querySelectorAll('input[name=md]').forEach((r) => (r.onchange = () => (TS.mode = r.value)));
    document.getElementById('sa').onclick = () => { TS.sel = new Set(allLessons().map((x) => x.join('-'))); testsPage(); const f = document.getElementById('sa'); if (f) f.focus({ preventScroll: true }); };
    document.getElementById('sn').onclick = () => { TS.sel = new Set(); testsPage(); const f = document.getElementById('sn'); if (f) f.focus({ preventScroll: true }); };
    const start = (sel, count, diff) => {
      if (!sel.length) { document.getElementById('terr').textContent = t('t_pick'); return; }
      const go = () => { const items = QB.build(sel, count, diff); const w = document.getElementById('tWrap'); w.innerHTML = '<div class="panel tr-panel"><div id="tRun"></div></div>'; runTest(document.getElementById('tRun'), items, { mode: TS.mode, title: `${t('nav_tests')} (${sel.length} ${lang === 'uz' ? 'mavzu' : 'topics'})`, onNew: go, onBack: testsPage, focus: true, onFinish: (s) => { if (XPok()) XP.test(s); return s; } }); window.scrollTo({ top: 0 }); };
      go();
    };
    document.getElementById('tgo').onclick = () => start([...TS.sel].map((k) => { const [g, n] = k.split('-'); return [g, +n]; }), TS.count, TS.diff);
    document.getElementById('tq').onclick = () => start(allLessons(), 20, 'mix');
  }
  let curTab = 'content'; let lastTab = null; let lastAnnounced = '';
  function xinline(e) { return `<div class="xinline" data-x="${e.id}"><div class="ic">${e.icon || '🧪'}</div><div><h4>${tr(e.title)}</h4><p>${tr(e.desc)}</p></div><span class="play">${t('watch')}</span></div>`; }

  function quiz(el, qs) {
    let ans = {};
    function draw() {
      const done = Object.keys(ans).length, ok = Object.keys(ans).filter((k) => ans[k] === qs[k][1]).length;
      el.innerHTML = qs.map((q, i) => {
        const a = ans[i]; const st = a == null ? '' : a === q[1] ? 'ok' : 'bad';
        return `<div class="q ${st}"><div class="qt">${i + 1}. ${tr(q[0])}</div><div class="qa"><button data-i="${i}" data-v="1" ${a != null ? 'disabled' : ''}>${t('yes')}</button><button data-i="${i}" data-v="0" ${a != null ? 'disabled' : ''}>${t('no')}</button></div>${a != null ? `<div class="fb">${a === q[1] ? t('right') : t('wrong') + (q[1] ? t('yes') : t('no'))}${q[2] ? ' — ' + tr(q[2]) : ''}</div>` : ''}</div>`;
      }).join('') + (done === qs.length && qs.length ? `<div class="score">🏆 ${t('score')}: ${ok} / ${qs.length} <button class="btn sec" style="margin-left:auto;padding:7px 14px" id="qr">${t('retry')}</button></div>` : '');
      el.querySelectorAll('.qa button').forEach((b) => (b.onclick = () => { ans[b.dataset.i] = b.dataset.v === '1'; draw(); }));
      const r = el.querySelector('#qr'); if (r) r.onclick = () => { ans = {}; draw(); };
    }
    draw();
  }

  function labList() {
    const groups = [[6, t('g6_t')], [7, t('g7_t')], [8, t('g8_t')]];
    app.innerHTML = `<div class="page-h lab"><div class="wrap"><div class="crumbs"><a href="#home">${t('nav_home')}</a> / ${t('nav_lab')}</div><h1>🧪 ${t('lab_h')}</h1><p>${t('lab_p')}</p></div></div>
    <div class="wrap">${groups.map(([gr, name]) => `<div class="sec-h" style="margin-top:28px"><h2>${name}</h2></div><div class="xgrid">${Lab.list.filter((e) => (e.lessons || []).some((l) => l[0] === gr) && ((e.lessons[0] || [])[0] === gr)).map(xcard).join('')}</div>`).join('')}</div>`;
  }
  function labPage(id) {
    const e = Lab.exps[id]; if (!e) return labList();
    const ls = lessonsOfExp(e);
    app.innerHTML = `<div class="wrap" style="padding-top:20px;padding-bottom:30px">
      <div class="crumbs" style="color:var(--muted);margin-bottom:10px"><a href="#lab">${t('back_lab')}</a></div>
      <h1 class="zk-lab-title"><span aria-hidden="true">${e.icon}</span> ${tr(e.title)}</h1><p style="margin:0 0 16px;color:var(--muted)">${tr(e.desc)}</p>
      <div class="labpage"><div class="lab-host" id="bigLab"></div></div>
      <div class="safety">⚠️ ${t('safety')}</div>
      <div id="zkLabGuide"></div>
      <div class="panel" style="margin-top:18px"><h3>📚 ${t('related')}</h3>${ls.map((x) => `<a href="#${x.g}-${x.n}" style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)"><span class="lnum" style="width:32px;height:32px;font-size:13px;background:${ucStrong(UC[unitIdx(x.g, x.n) % UC.length])[0]};color:${ucStrong(UC[unitIdx(x.g, x.n) % UC.length])[1]}">${x.n}</span><span><b>${tr(x.L.t)}</b><br><small style="color:var(--muted)">${GN[x.g]}-${t('grade')}</small></span></a>`).join('')}</div>
    </div>`;
    labHandle = Lab.open(document.getElementById('bigLab'), id, { autoplay: true });
    if (window.ZKLabGuide && labHandle) ZKLabGuide.mount(document.getElementById('zkLabGuide'), labHandle, { lang });
  }
  // Klaviatura bilan bosiladigan element (div/img uchun): Enter/Space, fokuslanadi, nomi bor
  function pressable(el, fn, label) {
    el.onclick = fn; if (!/^(BUTTON|A)$/.test(el.tagName)) { el.tabIndex = 0; el.setAttribute('role', 'button'); }
    if (label) el.setAttribute('aria-label', label);
    el.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } };
  }
  // Oyna (dialog): ochilganda fokus ichkariga, Tab ichida aylanadi, yopilganda fokus joyiga qaytadi
  let dlgBack = null;
  const BG = 'header.top,#app,#bnav,footer,#zkSkip';
  const setInert = (on) => document.querySelectorAll(BG).forEach((n) => { if (on) n.setAttribute('inert', ''); else n.removeAttribute('inert'); });
  function dlgOpen(box, focusEl) {
    dlgBack = document.activeElement; setInert(true);
    box.onkeydown = (e) => {
      if (e.key !== 'Tab') return;
      const F = [...box.querySelectorAll('button,a[href],input,select,[tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null);
      if (!F.length) { e.preventDefault(); return; }
      const a = F[0], z = F[F.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    setTimeout(() => (focusEl || box).focus({ preventScroll: true }), 30);
  }
  function dlgClose() { setInert(false); const b = dlgBack; dlgBack = null; if (b && document.contains(b) && b.focus) b.focus({ preventScroll: true }); }
  function openModal(id) {
    const e = Lab.exps[id]; if (!e) return; destroyLab();
    document.getElementById('lmTitle').textContent = tr(e.title); document.getElementById('lmIcon').textContent = e.icon || '🧪';
    const m = document.getElementById('labModal'); m.classList.add('on');
    document.getElementById('lmClose').setAttribute('aria-label', lang === 'uz' ? 'Yopish' : 'Close');
    modalHandle = Lab.open(document.getElementById('lmHost'), id, { autoplay: !matchMedia('(prefers-reduced-motion: reduce)').matches });
    dlgOpen(m, document.getElementById('lmClose'));
  }
  function closeModal() { const m = document.getElementById('labModal'); const was = m.classList.contains('on'); m.classList.remove('on'); if (modalHandle) { modalHandle.destroy(); modalHandle = null; } if (was) dlgClose(); }
  function closeZoom() { const z = document.getElementById('zoom'); if (z.classList.contains('on') || z.classList.contains('big')) { const zi = z.querySelector('img'); if (z.classList.contains('big') && zi && zi.dataset.cs != null) { zi.style.cssText = zi.dataset.cs; } z.classList.remove('on', 'big'); dlgClose(); } }
  document.getElementById('lmClose').onclick = closeModal;
  document.getElementById('labModal').onclick = (ev) => { if (ev.target.id === 'labModal') closeModal(); };

  function book(g, p) {
    const max = PMAX[g]; p = Math.max(0, Math.min(max - 1, p || 0)); if (p % 2 && p > 0) p -= 1;
    const origLang = g === 'g6' ? 'uz' : 'en';
    const trOf = (i) => { const T = window.PAGES_TR && window.PAGES_TR[g]; if (!T) return null; const off = g === 'g6' ? 1 : 2; const n = Math.floor((i - off) / 2), k = (i - off) % 2; return n >= 1 && T[n - 1] && T[n - 1][k] ? { n, k, h: T[n - 1][k] } : null; };
    const trAvail = lang !== origLang && ((!altHas(g, p) && trOf(p)) || (p + 1 < max && !altHas(g, p + 1) && trOf(p + 1)));
    const useTr = trAvail && bookTr;
    const cell = (i) => { const x = useTr && !altHas(g, i) && trOf(i); return x ? `<article class="trpage"><div class="trp-h"><span>${GN[g]}-${lang === 'uz' ? 'SINF KIMYO' : 'GRADE CHEMISTRY'}</span><span><a href="#${g}-${x.n}">${t('lesson')} ${x.n}</a> • ${i + 1}</span></div>${x.h}</article>` : pimg(g, i, bookFlip, 'alt=""'); };
    app.innerHTML = `<div class="page-h ${g}"><div class="wrap"><div class="crumbs"><a href="#home">${t('nav_home')}</a> / ${t('nav_book')}</div><h1>📖 ${t(g + '_t')}</h1><p>${t('book_h')}</p></div></div>
    <div class="wrap reader">
      <div class="seg"><button data-b="g6" class="${g === 'g6' ? 'on' : ''}">${t('nav_g6')}</button><button data-b="g7" class="${g === 'g7' ? 'on' : ''}">${t('nav_g7')}</button><button data-b="g8" class="${g === 'g8' ? 'on' : ''}">${t('nav_g8')}</button></div>
      <div class="ctl"><button type="button" class="btn sec" id="bp" aria-label="${lang === 'uz' ? 'Oldingi sahifa' : 'Previous page'}">←</button><input id="bi" type="number" min="1" max="${max}" value="${p + 1}" aria-label="${lang === 'uz' ? 'Sahifa raqami' : 'Page number'}"><span style="color:var(--muted)">/ ${max}</span><button type="button" class="btn sec" id="bn" aria-label="${lang === 'uz' ? 'Keyingi sahifa' : 'Next page'}">→</button></div>
      ${trAvail ? `<div class="tr-bar" style="margin:4px 0 12px"><div class="note" style="margin:0;flex:1">${t(g === 'g6' ? 'tr_note_en' : 'tr_note_uz')}</div><button class="btn sec" id="bkTr" style="padding:8px 14px;font-size:13.5px">${bookTr ? t('show_orig') : t('show_tr')}</button></div>` : ''}
      <div class="tr-bar" style="margin:4px 0 12px"><div class="note" style="margin:0;flex:1">${t(pageLang(g, p, bookFlip) === 'uz' ? 'pg_in_uz' : 'pg_in_en')}</div><button class="btn sec" id="bkFlip" style="padding:8px 14px;font-size:13.5px">${t(pageLang(g, p, bookFlip) === 'uz' ? 'see_en' : 'see_uz')}</button></div>
      <div class="spread${useTr ? ' trspread' : ''}">${cell(p)}${p + 1 < max ? cell(p + 1) : ''}</div>
    </div>`;
    document.getElementById('bkFlip').onclick = () => { bookFlip = !bookFlip; book(g, p); };
    const bt = document.getElementById('bkTr'); if (bt) bt.onclick = () => { bookTr = !bookTr; book(g, p); };
    const go = (q) => { bookPos[g] = q; book(g, q); };
    document.getElementById('bp').onclick = () => go(p - 2); document.getElementById('bn').onclick = () => go(p + 2);
    document.getElementById('bi').onchange = (e) => go(+e.target.value - 1);
    app.querySelectorAll('[data-b]').forEach((b) => (b.onclick = () => (location.hash = 'book-' + b.dataset.b)));
    app.querySelectorAll('.spread img').forEach((im) => pressable(im, () => zoomImg(im), lang === 'uz' ? 'Sahifani kattalashtirish' : 'Enlarge page'));
  }
  const bookPos = { g6: 0, g7: 0, g8: 0 }; let bookTr = true;
  document.onkeydown = (e) => {
    if (e.key === 'Escape') { closeModal(); closeZoom(); return; }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const tg = e.target; if (tg && (tg.tagName === 'INPUT' || tg.tagName === 'TEXTAREA' || tg.tagName === 'SELECT' || tg.isContentEditable)) return;
      if (tg && tg.closest && tg.closest('[role=tablist],[role=radiogroup],[role=toolbar],.lab-host,.ptgrid')) return; // o'z strelkalari bor elementlar
      if (document.getElementById('labModal').classList.contains('on') || document.getElementById('zoom').classList.contains('on')) return;
      const m = (location.hash || '').match(/^#(g[678])-(\d+)$/); if (!m) return;
      const n = +m[2] + (e.key === 'ArrowRight' ? 1 : -1); if (n < 1 || n > B[m[1]].lessons.length) return;
      e.preventDefault(); location.hash = `${m[1]}-${n}`;
    }
  };

  function zoomImg(im) { const z = document.getElementById('zoom'); const zi = z.querySelector('img'); zi.src = im.getAttribute('src'); const h = +im.dataset.h || 1273; zi.style.cssText = `aspect-ratio:900/${h};object-fit:cover;object-position:${im.style.objectPosition};height:min(96vh, ${(96 * h / 900).toFixed(1)}vw);width:auto`; z.classList.remove('big'); z.classList.add('on'); zi.alt = im.getAttribute('alt') || ''; const zx = document.getElementById('zoomX'); if (zx) { zx.setAttribute('aria-label', lang === 'uz' ? 'Yopish' : 'Close'); zx.onclick = (e) => { e.stopPropagation(); closeZoom(); }; } dlgOpen(z, zx); }
  { const z = document.getElementById('zoom'); const zi = z.querySelector('img'); const touch = matchMedia('(pointer:coarse)').matches;
    z.onclick = (e) => { if (touch && e.target === zi) { const r0 = zi.getBoundingClientRect(); const fx = (e.clientX - r0.left) / r0.width, fy = (e.clientY - r0.top) / r0.height; const big = z.classList.toggle('big'); if (big) { zi.dataset.cs = zi.style.cssText; zi.style.height = 'auto'; zi.style.width = '240vw'; zi.style.maxWidth = 'none'; zi.style.maxHeight = 'none'; requestAnimationFrame(() => { const r = zi.getBoundingClientRect(); z.scrollTo({ left: fx * r.width - innerWidth / 2 + 20, top: fy * r.height - innerHeight / 2 + 20 }); }); } else { zi.style.cssText = zi.dataset.cs || ''; z.scrollTo(0, 0); } return; } z.classList.remove('on', 'big'); z.scrollTo(0, 0); dlgClose(); }; }

  /* ---------- search ---------- */
  const q = document.getElementById('q'), sres = document.getElementById('sres');
  let sIdx = -1;
  // lesson-number query: "5", "5-dars", "dars 5", "lesson 5", "7-12", "7 12", "7-sinf 12", "g7 12", "6.5"
  function parseNum(s) {
    s = s.replace(/[’'`ʻʼ]/g, '').trim();
    let m = s.match(/^(?:g)?([678])\s*(?:-?\s*sinf|-?\s*grade|-?\s*class)?\s*[-.,:/ ]\s*(?:dars|lesson|mavzu|topic|l)?\s*-?\s*(\d{1,2})(?:\s*-?\s*(?:dars|lesson|mavzu))?$/i);
    if (m) return { g: 'g' + m[1], n: +m[2] };
    m = s.match(/^(?:dars|lesson|mavzu|topic|№|#|l)?\s*-?\s*(\d{1,2})\s*-?\s*(?:dars|lesson|mavzu|topic)?$/i);
    if (m) return { g: null, n: +m[1] };
    return null;
  }
  const hit = (g, n, L, cls) => `<a href="#${g}-${n}" class="${cls || ''}"><span class="snum ${g}">${n}</span><span class="stx">${esc(tr(L.t))}<small>${GN[g]}-${t('grade')} • ${t('lesson')} ${n}</small></span></a>`;
  q.oninput = () => {
    const raw = q.value.trim(), s = raw.toLowerCase(); sIdx = -1;
    const num = parseNum(s);
    if (!num && s.length < 2) { clearTimeout(srchSay._t); sres.classList.remove('on'); q.setAttribute('aria-expanded', 'false'); return; }
    const out = [], seen = new Set();
    if (num) {
      GRADES.forEach((g) => { if (num.g && num.g !== g) return; const L = B[g].lessons[num.n - 1]; if (L) { out.push(hit(g, num.n, L, 'top')); seen.add(g + num.n); } });
      if (!out.length) out.push(`<a class="muted" role="option" aria-disabled="true">${t('no_lesson_n').replace('{n}', num.n)}</a>`);
    }
    if (s.length >= 2) {
      GRADES.forEach((g) => B[g].lessons.forEach((L, i) => { if (seen.has(g + (i + 1))) return; const hay = [L.t.uz, L.t.en, ...(L.pts || []).flatMap((p) => [p.uz, p.en]), ...(L.terms || []).flatMap((x) => [x[0].uz, x[0].en])].join(' ').toLowerCase(); if (hay.includes(s)) out.push(hit(g, i + 1, L)); }));
      Lab.list.forEach((e) => { if ((e.title.uz + e.title.en + e.desc.uz + e.desc.en).toLowerCase().includes(s)) out.push(`<a href="#lab-${e.id}"><span class="snum lab">${e.icon}</span><span class="stx">${esc(tr(e.title))}<small>3D ${t('exp_word')}</small></span></a>`); });
    }
    sres.innerHTML = out.slice(0, 14).join('') || `<a class="muted" role="option" aria-disabled="true">${t('nores')}</a>`; sres.classList.add('on');
    links().forEach((a, i) => { a.id = 'sr' + i; a.tabIndex = -1; a.setAttribute('role', 'option'); a.setAttribute('aria-selected', 'false'); });
    q.setAttribute('aria-expanded', 'true'); q.removeAttribute('aria-activedescendant');
    clearTimeout(srchSay._t); srchSay._t = setTimeout(() => { const an = document.getElementById('zkAnnounce'); if (!an) return; const n = links().length; an.textContent = ''; setTimeout(() => (an.textContent = n ? `${n} ${lang === 'uz' ? 'ta natija' : 'results'}` : t('nores')), 40); }, 450);
    if (num && sres.querySelector('a[href]')) { sIdx = 0; mark(); }
  };
  const links = () => [...sres.querySelectorAll('a[href]')]; const srchSay = {};
  function mark() { links().forEach((a, i) => { a.classList.toggle('sel', i === sIdx); a.setAttribute('aria-selected', String(i === sIdx)); }); const a = links()[sIdx]; if (a) { a.scrollIntoView({ block: 'nearest' }); q.setAttribute('aria-activedescendant', a.id); } }
  q.onkeydown = (e) => {
    const L = links(); if (!sres.classList.contains('on') || !L.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); sIdx = (sIdx + 1) % L.length; mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sIdx = (sIdx - 1 + L.length) % L.length; mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); clearTimeout(srchSay._t); const a = L[Math.max(0, sIdx)]; location.hash = a.getAttribute('href'); q.value = ''; q.blur(); sres.classList.remove('on'); }
    else if (e.key === 'Escape') { e.preventDefault(); clearTimeout(srchSay._t); sres.classList.remove('on'); q.setAttribute('aria-expanded', 'false'); q.blur(); }
  };
  q.onfocus = () => { if (q.value.trim()) q.oninput(); };
  q.onblur = () => setTimeout(() => { clearTimeout(srchSay._t); sres.classList.remove('on'); q.setAttribute('aria-expanded', 'false'); }, 200);
  sres.onclick = () => { q.value = ''; sres.classList.remove('on'); };

  /* ---------- router ---------- */
  let lastRoute = '';
  // Sahifalar orasida silliq o'tish: View Transitions API (Chrome/Edge 111+, Safari 18+) bilan
  // eski sahifa tez so'nadi, yangisi yumshoq paydo bo'ladi; header va pastki menyu joyida qoladi.
  // Qo'llamaydigan brauzerda — oddiy qisqa fade (brand.css). "Harakatni kamaytirish" yoqilgan bo'lsa — animatsiyasiz.
  function route() {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduce && lastRoute !== '' && document.visibilityState === 'visible') {
      const root = document.documentElement, sw = document.body.dataset.swipe; // telefonda surish yo'nalishi
      const cls = ['zk-vt'].concat(sw === 'l' || sw === 'r' ? ['zk-vt-' + sw] : []);
      root.classList.add(...cls);
      try {
        const seq = String(Date.now() + Math.random()); root.dataset.vtSeq = seq;
        const vt = document.startViewTransition(() => renderRoute());
        // tez-tez almashganda oldingi animatsiya "skipped" bo'ladi — bu xato emas, jim yutiladi;
        // klass faqat oxirgi animatsiya tugaganda olinadi
        const quiet = () => {}; vt.ready.catch(quiet); vt.updateCallbackDone.catch((e) => console.error('route render', e));
        vt.finished.catch(quiet).finally(() => { if (root.dataset.vtSeq === seq) root.classList.remove(...cls); });
        return;
      } catch (e) { root.classList.remove('zk-vt'); }
    }
    renderRoute();
  }
  function toTop() { const st = document.documentElement.style; const prev = st.scrollBehavior; st.scrollBehavior = 'auto'; window.scrollTo(0, 0); st.scrollBehavior = prev; }
  // Segment tugmalari (.seg / .modes) holati ekran o'quvchiga aria-pressed orqali bildiriladi.
  // Tugmalar ko'p joyda qo'lda yaratiladi, shuning uchun bitta kuzatuvchi .on klassini kuzatib boradi.
  const syncPressed = (root) => root.querySelectorAll('.seg > button, .modes > button, #tcTabs > button, .tc-chips > button').forEach((b) => {
    if (b.getAttribute('role') === 'tab' || b.getAttribute('role') === 'radio') return;
    const v = String(b.classList.contains('on')); if (b.getAttribute('aria-pressed') !== v) b.setAttribute('aria-pressed', v);
    if (!b.hasAttribute('type')) b.type = 'button';
  });
  try {
    const appEl = document.getElementById('app');
    if (appEl && 'MutationObserver' in window) new MutationObserver((ms) => {
      for (const m of ms) { if (m.type === 'childList') { if (!syncPressed._q) { syncPressed._q = 1; requestAnimationFrame(() => { syncPressed._q = 0; syncPressed(appEl); }); } return; } const tg = m.target; if (tg.parentElement && tg.parentElement.matches('.seg,.modes,#tcTabs,.tc-chips')) { syncPressed(tg.parentElement); } }
    }).observe(appEl, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
  } catch (e) { }
  function renderRoute() {
    const h = (location.hash || '#home').slice(1);
    const newPage = h !== lastRoute && !(h.match(/-\d+$/) && lastRoute === h);
    if (newPage) toTop();
    destroyLab(); closeModal(); closeZoom(); document.getElementById('nav').classList.remove('open'); document.getElementById('burger').setAttribute('aria-expanded', 'false');
    let m, navKey = 'home';
    if (h === 'home' || h === '') home();
    else if (h === 'g6' || h === 'g7' || h === 'g8') { list(h); navKey = h; }
    else if ((m = h.match(/^(g[678])-(\d+)$/))) { if (lastRoute.split('-')[0] !== m[1] || !lastRoute.match(/-\d+$/)) curTab = 'content'; lesson(m[1], +m[2], curTab); navKey = m[1]; }
    else if (h === 'tests') { testsPage(); navKey = 'tests'; }
    else if ((m = h.match(/^ptable(?:-(\d+))?$/))) { if (window.PT) PT.render(app, { lang, t, tr, B, z: m[1] ? +m[1] : null }); else home(); navKey = 'pt'; }
    else if (h === 'me') { if (XPok()) { XP.page(app, { t, tr, B }); if (window.ZKDashboard) { const ph = app.querySelector('.page-h'); const dash = ZKDashboard.render({ lang, tr, B }); if (ph) ph.insertAdjacentHTML('afterend', dash); else app.insertAdjacentHTML('afterbegin', dash); } } else home(); navKey = 'me'; }
    else if (h === 'certificate') { if (window.ZKCertificate && XPok()) ZKCertificate.render(app, { lang, B }); else home(); navKey = 'me'; }
    else if (h === 'admin' && window.ZKA && window.ZKAuth && ZKAuth.isAdmin()) { ZKA.render(app, { t, tr, B, lang, GC }); navKey = 'admin'; }
    else if (h === 'teacher' && window.ZKT && window.ZKAuth && ZKAuth.isStaff()) { ZKT.render(app, { t, tr, B, lang, GC }); navKey = 'teacher'; }
    else if (h === 'lab') { labList(); navKey = 'lab'; }
    else if ((m = h.match(/^lab-(.+)$/))) { labPage(m[1]); navKey = 'lab'; }
    else if ((m = h.match(/^book-(g[678])$/))) { book(m[1], bookPos[m[1]]); navKey = 'book'; }
    else home();
    if (newPage) { toTop(); requestAnimationFrame(toTop); } // silliq scroll emas — darhol yuqoriga (rasmlar yuklansa ham)
    lastRoute = h;
    document.querySelectorAll('nav.main a, .bnav a').forEach((a) => { const on = a.dataset.nav === navKey; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    // Sahifa sarlavhasi (brauzer tabi) va ekran o'quvchilar uchun e'lon; yangi sahifada fokus sarlavhaga o'tadi
    const h1 = app.querySelector('h1'), hc = h1 && h1.cloneNode(true); if (hc) hc.querySelectorAll('.lnum,.lstat,[aria-hidden="true"]').forEach((x) => x.remove()); const h1t = hc ? hc.textContent.replace(/\s+/g, ' ').trim() : '';
    const isHome = !!app.querySelector('.zk-hero-v3'); const tt = h1t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
    document.title = (tt && !isHome ? tt + ' · ' : '') + 'Zukko Xalqaro Maktabi — Kimyo';
    if (newPage && lastAnnounced !== '') {
      const an = document.getElementById('zkAnnounce'); if (an) { an.textContent = ''; setTimeout(() => (an.textContent = h1t || document.title), 60); }
      if (h1 && document.activeElement && (document.activeElement === document.body || !document.activeElement.closest('header,#bnav,.zk-gate,.lesson-top .tabs'))) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); }
    }
    lastAnnounced = h;
    const gBtn = document.getElementById('navGradesBtn'); if (gBtn) { gBtn.classList.toggle('on', /^g[678]$/.test(navKey)); gradesMenu(false); }
    if (XPok()) XP.refresh();
    app.classList.remove('enter'); if (!document.documentElement.classList.contains('zk-vt')) { void app.offsetWidth; app.classList.add('enter'); }
  }
  window.addEventListener('hashchange', route);
  document.querySelectorAll('.lang button').forEach((b) => (b.onclick = () => setLang(b.dataset.lang)));
  document.getElementById('burger').onclick = () => { const nv = document.getElementById('nav'), o = nv.classList.toggle('open'); document.getElementById('burger').setAttribute('aria-expanded', String(o)); if (o) { const f = nv.querySelector('a[href],button'); if (f) setTimeout(() => f.focus(), 30); } };
  document.getElementById('burger').addEventListener('keydown', (e) => { const nv = document.getElementById('nav'); if (e.key === 'Escape' && nv.classList.contains('open')) { nv.classList.remove('open'); e.currentTarget.setAttribute('aria-expanded', 'false'); } });
  document.getElementById('nav').addEventListener('keydown', (e) => { const nv = e.currentTarget; if (e.key === 'Escape' && nv.classList.contains('open')) { nv.classList.remove('open'); const bg = document.getElementById('burger'); bg.setAttribute('aria-expanded', 'false'); bg.focus(); } });
  // "Asosiy qismga o'tish": klaviatura foydalanuvchisi header tugmalarini aylanib o'tmaydi
  { const sk = document.getElementById('zkSkip'); if (sk) sk.onclick = () => { const h1 = app.querySelector('h1'); const tg = h1 || app; if (h1) h1.tabIndex = -1; tg.focus(); }; }
  // "Sinflar" ochiladigan menyusi (header): 6-, 7-, 8-sinf pastga ochiladi.
  function gradesMenu(open) {
    const btn = document.getElementById('navGradesBtn'), menu = document.getElementById('navGradesMenu');
    if (!btn || !menu) return;
    menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); btn.classList.toggle('open', open);
  }
  (function () {
    const grp = document.getElementById('navGrades'), btn = document.getElementById('navGradesBtn'), menu = document.getElementById('navGradesMenu');
    if (!grp || !btn || !menu) return;
    btn.onclick = (e) => { e.stopPropagation(); const open = menu.hidden; gradesMenu(open); if (open) menu.querySelector('a').focus({ preventScroll: true }); };
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) gradesMenu(false); });
    document.addEventListener('click', (e) => { if (!menu.hidden && !grp.contains(e.target)) gradesMenu(false); });
    grp.addEventListener('focusout', (e) => { if (!menu.hidden && e.relatedTarget && !grp.contains(e.relatedTarget)) gradesMenu(false); });
    grp.addEventListener('keydown', (e) => {
      const L = [...menu.querySelectorAll('a')], i = L.indexOf(document.activeElement);
      if (e.key === 'Escape' && !menu.hidden) { e.preventDefault(); e.stopPropagation(); gradesMenu(false); btn.focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (menu.hidden) gradesMenu(true); L[(i + 1) % L.length].focus(); }
      else if (e.key === 'ArrowUp' && !menu.hidden) { e.preventDefault(); L[(i - 1 + L.length) % L.length].focus(); }
    });
  })();
  setLang(lang);
})();
