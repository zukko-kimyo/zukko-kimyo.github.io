(function () {
  const I18N = {
    school: { uz: 'Zukko Xalqaro Maktabi', en: 'Zukko International School' },
    nav_home: { uz: 'Bosh sahifa', en: 'Home' }, nav_g6: { uz: '6-sinf', en: 'Grade 6' }, nav_g7: { uz: '7-sinf', en: 'Grade 7' }, nav_g8: { uz: '8-sinf', en: 'Grade 8' },
    nav_lab: { uz: '3D laboratoriya', en: '3D Lab' }, nav_pt: { uz: 'Davriy jadval', en: 'Periodic table' }, nav_me: { uz: 'Yutuqlarim', en: 'My progress' }, b_home: { uz: 'Bosh', en: 'Home' }, b_tests: { uz: 'Testlar', en: 'Tests' }, tool_h: { uz: 'Interaktiv vosita', en: 'Interactive tool' }, pt_desc: { uz: "Elementlarni bosib o'rganing: tartib raqami, massa, elektron qavatlar, oilalar va o'yin rejimi.", en: 'Explore elements by clicking: atomic number, mass, shells, families and a game mode.' }, nav_book: { uz: 'Darslik', en: 'Textbook' },
    search: { uz: 'Mavzu, dars raqami yoki tajriba…', en: 'Topic, lesson number or experiment…' },
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
    nores: { uz: 'Hech narsa topilmadi', en: 'Nothing found' }, no_lesson_n: { uz: '{n}-dars topilmadi (6-sinfda 35, 7-sinfda 72 ta dars bor)', en: 'Lesson {n} not found (grade 6 has 35, grade 7 has 72 lessons)' }, of_word: { uz: 'dan', en: 'of' }, kb_hint: { uz: 'Klaviaturada ← → tugmalari bilan ham o\'tish mumkin', en: 'You can also use the ← → keys' }, grade: { uz: 'sinf', en: 'grade' },
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
  const GC = { g6: '#2563c9', g7: '#2e9e6a', g8: '#00555a' }; // sinf ranglari — brend palitrasi
  const GN = { g6: 6, g7: 7, g8: 8 }; const GRADES = ['g6', 'g7', 'g8'];
  // Darslik bo'limlari ranglari — oldingi versiyadagidek (foydalanuvchi talabi, 2026-11-13).
  // Dars sahifasida ham shu bo'lim rangi ishlatiladi (--uc).
  const UC = ['#ff7a1a', '#8b5cf6', '#22c55e', '#ec4899', '#0ea5e9', '#f59e0b', '#14b8a6', '#ef4444', '#6366f1', '#84cc16'];
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
    if (window.ZKAuth && ZKAuth.user) ZKAuth.chip();
    route();
  }
  function destroyLab() { if (labHandle) { labHandle.destroy(); labHandle = null; } }

  /* ---------- views ---------- */
  function home() {
    const nL = GRADES.reduce((a, g) => a + (B[g] ? B[g].lessons.length : 0), 0);
    app.innerHTML = `
    <section class="hero zk-hero-v3"><div class="wrap">
      <div class="zk-hero-content">
        <div class="zk-hero-kicker"><span class="zk-live-dot"></span>${lang === 'uz' ? 'ZUKKO XALQARO MAKTABI · RAQAMLI KIMYO' : 'ZUKKO INTERNATIONAL SCHOOL · CHEMISTRY'}</div>
        <h1>${lang === 'uz' ? 'Kimyoni ko‘r.' : 'See chemistry.'} <em>${lang === 'uz' ? 'Tajribada kashf et.' : 'Discover it in action.'}</em></h1>
        <p class="lead">${lang === 'uz' ? 'Oddiy darslikdan ko‘proq: tushunarli mavzular, interaktiv 3D tajribalar va bilimni mustahkamlaydigan testlar — barchasi bir joyda.' : 'More than a textbook: clear lessons, interactive 3D experiments and practice tests, all in one modern learning space.'}</p>
        <div class="btns">
          <a class="btn pri" href="#g6">${lang === 'uz' ? '📚 Darslarni boshlash' : '📚 Explore lessons'} <span aria-hidden="true">↗</span></a>
          <a class="btn sec" href="#lab">${lang === 'uz' ? '🧪 3D laboratoriyani ochish' : '🧪 Explore the 3D laboratory'}</a>
        </div>
        <div class="zk-hero-stats">
          <div><b>${nL}</b><span>${t('st_lessons')}</span></div>
          <div><b>${Lab.list.length}</b><span>${t('st_exps')}</span></div>
          <div><b>6–8</b><span>${lang === 'uz' ? 'Sinflar' : 'Grades'}</span></div>
        </div>
      </div>
      <button type="button" class="zk-scene-toggle" id="zkSceneToggle" aria-expanded="false" aria-controls="zkScene"><span class="zk-scene-toggle-ic">⚛️</span><span class="zk-scene-toggle-t"><b>${lang === 'uz' ? 'Molekulyar laboratoriya' : 'Molecular laboratory'}</b><small>${lang === 'uz' ? '3D atom modeli — ochish uchun bosing' : '3D atom model — tap to open'}</small></span><span class="zk-scene-toggle-ch" aria-hidden="true">⌄</span></button>
      <div class="zk-hero-scene" id="zkScene">
        <div class="zk-scene-top"><span>${lang === 'uz' ? 'MOLEKULYAR LABORATORIYA' : 'MOLECULAR LABORATORY'}</span><span class="zk-dots" aria-hidden="true"><i></i><i></i><i></i></span></div>
        <div class="hero-art"><span class="badge3d">✦ ${lang === 'uz' ? 'INTERAKTIV 3D' : 'INTERACTIVE 3D'}</span><div class="lab-host" id="heroLab"></div></div>
        <div class="zk-scene-bottom"><span>LAB / 001 — ATOM MODEL</span><span class="zk-scene-active">${lang === 'uz' ? 'TADQIQ ETING' : 'EXPLORE'}</span></div>
      </div>
    </div></section>
    <section class="zk-quickstrip" aria-label="${lang === 'uz' ? 'Tezkor bo‘limlar' : 'Quick links'}">
      <div class="wrap">
        <a href="#g6" class="zk-quick-item"><span class="zk-quick-ic">📘</span><span><strong>${lang === 'uz' ? 'Sinf bo‘yicha darslar' : 'Lessons by grade'}</strong><small>${lang === 'uz' ? '6-, 7- va 8-sinf mavzulari' : 'Grades 6, 7 and 8'}</small></span><span class="zk-quick-arrow">↗</span></a>
        <a href="#tests" class="zk-quick-item"><span class="zk-quick-ic">✅</span><span><strong>${lang === 'uz' ? 'Bilimingizni sinang' : 'Test your knowledge'}</strong><small>${lang === 'uz' ? 'Interaktiv test va natijalar' : 'Interactive quizzes and results'}</small></span><span class="zk-quick-arrow">↗</span></a>
        <a href="#ptable" class="zk-quick-item"><span class="zk-quick-ic">⚛️</span><span><strong>${lang === 'uz' ? 'Davriy jadval' : 'Periodic table'}</strong><small>${lang === 'uz' ? 'Elementlarni yaqinroq o‘rganing' : 'Explore the elements'}</small></span><span class="zk-quick-arrow">↗</span></a>
      </div>
    </section>
    ${XPok() && window.ZKDashboard ? ZKDashboard.render({ lang, tr, B }) : (XPok() ? `<section class="blk xpsec"><div class="wrap">${XP.homeCard({ t, tr, B })}</div></section>` : '')}
    <section class="blk"><div class="wrap">
      <div class="sec-h"><div><span class="zk-section-kicker">${lang === 'uz' ? 'SINF BO‘LIMLARI' : 'LEARNING PATHS'}</span><h2>${t('books_h')}</h2><p>${t('books_p')}</p></div></div>
      <div class="grades">
        <a class="gcard g6" href="#g6">
          <div class="zk-grade-top"><span class="zk-grade-number">06</span>${pimg('g6', 0, false, 'alt=""')}</div>
          <div class="zk-grade-copy">
            <span class="zk-grade-eyebrow">${lang === 'uz' ? 'BOSHLANG‘ICH BOSQICH' : 'FOUNDATION'}</span>
            <h3>${t('g6_t')}</h3><p>${t('g6_d')}</p>
            <div class="meta"><span class="chip">${B.g6.lessons.length} ${t('st_lessons')}</span><span class="chip p">${countExps(6)} 3D</span></div>
            <div class="zk-grade-footer"><span>${lang === 'uz' ? 'Darslarni ko‘rish' : 'Explore lessons'}</span><span>↗</span></div>${gp('g6')}
          </div>
        </a>
        <a class="gcard g7" href="#g7">
          <div class="zk-grade-top"><span class="zk-grade-number">07</span>${pimg('g7', 0, false, 'alt=""')}</div>
          <div class="zk-grade-copy">
            <span class="zk-grade-eyebrow">${lang === 'uz' ? 'KEYINGI BOSQICH' : 'INTERMEDIATE'}</span>
            <h3>${t('g7_t')}</h3><p>${t('g7_d')}</p>
            <div class="meta"><span class="chip">${B.g7.lessons.length} ${t('st_lessons')}</span><span class="chip p">${countExps(7)} 3D</span></div>
            <div class="zk-grade-footer"><span>${lang === 'uz' ? 'Darslarni ko‘rish' : 'Explore lessons'}</span><span>↗</span></div>${gp('g7')}
          </div>
        </a>
        <a class="gcard g8" href="#g8">
          <div class="zk-grade-top"><span class="zk-grade-number">08</span>${pimg('g8', 0, false, 'alt=""')}</div>
          <div class="zk-grade-copy">
            <span class="zk-grade-eyebrow">${lang === 'uz' ? 'CHUQURLASHTIRISH' : 'ADVANCED'}</span>
            <h3>${t('g8_t')}</h3><p>${t('g8_d')}</p>
            <div class="meta"><span class="chip">${B.g8.lessons.length} ${t('st_lessons')}</span><span class="chip p">${countExps(8)} 3D</span></div>
            <div class="zk-grade-footer"><span>${lang === 'uz' ? 'Darslarni ko‘rish' : 'Explore lessons'}</span><span>↗</span></div>${gp('g8')}
          </div>
        </a>
      </div>
    </div></section>
    <section class="blk" style="padding-top:0"><div class="wrap">
      <div class="sec-h"><div><span class="zk-section-kicker">${lang === 'uz' ? 'IMKONIYATLAR' : 'FEATURES'}</span><h2>${t('feat_h')}</h2></div></div>
      <div class="feat">
        <div class="fcard"><div class="ic">📘</div><h4>${t('f1')}</h4><p>${t('f1d')}</p></div>
        <div class="fcard"><div class="ic">🧪</div><h4>${t('f2')}</h4><p>${t('f2d')}</p></div>
        <div class="fcard"><div class="ic">📖</div><h4>${t('f3')}</h4><p>${t('f3d')}</p></div>
        <a class="fcard" href="#tests"><div class="ic">✅</div><h4>${t('f4')}</h4><p>${t('f4d')}</p></a>
      </div>
    </div></section>
    <section class="blk" style="padding-top:0"><div class="wrap">
      <div class="sec-h"><div><span class="zk-section-kicker">${lang === 'uz' ? 'TAJRIBALAR' : 'EXPERIMENTS'}</span><h2>${t('lab_h')}</h2><p>${t('lab_p')}</p></div><a class="btn sec" href="#lab">${t('open')} →</a></div>
      <div class="xgrid">${Lab.list.slice(0, 8).map(xcard).join('')}</div>
    </div></section>`;
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
    if (!compact) startHero();
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
      const n = i + 1; if (bk.units) { const u = bk.units.find((u) => u.from === n); if (u && !filter3d) html += `<div class="unit-h" style="--uc:${UC[unitIdx(g, n) % UC.length]}"><span>${unitIdx(g, n) + 1}</span>${tr(u.t)}</div>`; }
      const ex = expsOf(g, n); if (filter3d && !ex.length) return;
      const col = UC[unitIdx(g, n) % UC.length]; const ls = XPok() ? XP.state(g, n) : ''; const best = ls ? XP.s.L[g + '-' + n].best : 0;
      html += `<a class="lcard ${ls}" href="#${g}-${n}" style="--uc:${col};--i:${Math.min(cnt++, 24)}"><div class="lnum" style="background:${col}">${ls === 'done' ? '★' : n}</div><div><h4>${tr(L.t)}</h4><div class="tags">${ls === 'done' ? `<span class="chip ok">⭐ ${best}/10</span>` : ls ? `<span class="chip st">▶ ${XP.t('st_start')}</span>` : ''}${ex.length ? `<span class="chip p">🧪 ${ex.length} 3D</span>` : ''}<span class="chip o">✅ 10+</span></div></div>${ls === 'done' ? '<span class="lstate">✓</span>' : ''}</a>`;
    });
    app.innerHTML = `<div class="page-h ${g}"><div class="wrap"><div class="crumbs"><a href="#home">${t('nav_home')}</a> / ${t('nav_' + g)}</div><h1>${t(g + '_t')}</h1><p>${t(g + '_d')}</p>${XPok() ? (() => { const o = XP.grade(g, bk.lessons.length); return `<div class="phprog"><div class="xbar big"><div style="width:${o.p}%"></div><i style="width:${Math.round((100 * (o.done + o.started)) / o.total)}%"></i></div><span>⭐ ${o.done} / ${o.total} ${XP.t('st_done').toLowerCase()} • ${o.p}%</span></div>`; })() : ''}</div></div>
      <div class="wrap"><div class="toolbar"><div class="seg"><button data-f="0" class="${filter3d ? '' : 'on'}">${t('all')} (${bk.lessons.length})</button><button data-f="1" class="${filter3d ? 'on' : ''}">🧪 ${t('with3d')}</button></div><a class="btn sec" href="#book-${g}" style="padding:8px 14px;font-size:14px">📖 ${t('nav_book')}</a></div>
      <div class="lgrid">${html}</div></div>`;
    app.querySelectorAll('.seg button').forEach((b) => (b.onclick = () => { filter3d = b.dataset.f === '1'; list(g); }));
  }

  function lesson(g, n, tab) {
    const bk = B[g]; const L = bk.lessons[n - 1]; if (!L) return list(g);
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
    app.innerHTML = `<div class="lesson-top" style="--uc:${col}"><div class="wrap">
        <div class="crumbs" style="color:var(--muted)"><a href="#home">${t('nav_home')}</a> / <a href="#${g}">${t('nav_' + g)}</a> / ${t('lesson')} ${n}</div>
        <div class="lhead"><h1><span class="lnum" style="background:${col}">${n}</span>${tr(L.t)}${lst === 'done' ? `<span class="lstat done">⭐ ${XP.t('st_done')}</span>` : ''}</h1>
          <div class="lnav" title="${t('kb_hint')}">${prev ? `<a class="lnb" href="#${g}-${n - 1}" aria-label="${t('prev')}">‹</a>` : '<span class="lnb off">‹</span>'}<span class="lpos"><b>${n}</b> / ${bk.lessons.length}</span>${next ? `<a class="lnb" href="#${g}-${n + 1}" aria-label="${t('next')}">›</a>` : '<span class="lnb off">›</span>'}</div></div>
        <div class="tabs">${['content', 'pages', 'lab', 'quiz'].map((k) => `<button data-tab="${k}" class="${tab === k ? 'on' : ''}"><i class="ti">${{ content: '📘', pages: '📄', lab: '🧪', quiz: '✅' }[k]}</i><span class="tlong">${t('t_' + k)}</span><span class="tsh">${t('ts_' + k)}</span>${k === 'lab' && (ex.length || toolsOf(g, n).length) ? `<span class="cnt">${ex.length + toolsOf(g, n).length}</span>` : ''}${k === 'quiz' ? `<span class="cnt q">10</span>` : ''}</button>`).join('')}</div>
      </div></div>
      <div class="wrap lesson-body" style="--uc:${col}">
        <div>${body}
          <div class="pn">${prev ? `<a href="#${g}-${n - 1}"><small>${t('prev')}</small>${tr(prev.t)}</a>` : '<span style="flex:1"></span>'}${next ? `<a class="r" href="#${g}-${n + 1}"><small>${t('next')}</small>${tr(next.t)}</a>` : '<span style="flex:1"></span>'}</div>
        </div>
        <aside class="side">
          ${ex.length ? `<div class="panel"><h4>🧪 ${t('t_lab')}</h4>${ex.map((e) => `<a href="#lab-${e.id}" class="sidex">${e.icon} ${tr(e.title)}</a>`).join('')}</div>` : ''}
          <div class="panel"><h4>📚 ${t('all_lessons')}</h4><div class="navl">${navl}</div></div>
        </aside>
      </div>
      <div class="fnav">${prev ? `<a href="#${g}-${n - 1}" title="${esc(tr(prev.t))}">‹ <span>${t('prev').replace(/[←→]/g, '').trim()}</span></a>` : '<span class="off">‹</span>'}<b>${n} / ${bk.lessons.length}</b>${next ? `<a href="#${g}-${n + 1}" title="${esc(tr(next.t))}"><span>${t('next').replace(/[←→]/g, '').trim()}</span> ›</a>` : '<span class="off">›</span>'}</div>`;
    app.querySelectorAll('.tabs button').forEach((b) => (b.onclick = () => { curTab = b.dataset.tab; lesson(g, n, curTab); window.scrollTo({ top: 0 }); }));
    app.querySelectorAll('.pages img').forEach((im) => (im.onclick = () => zoomImg(im)));
    app.querySelectorAll('.xinline').forEach((el) => (el.onclick = () => openModal(el.dataset.x)));
    const on = app.querySelector('.navl a.on'); if (on) on.scrollIntoView({ block: 'center' });
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
  function runTest(el, items, opts = {}) {
    const st = { i: 0, ans: items.map(() => null), done: false, start: Date.now(), timer: null };
    const exam = opts.mode === 'exam'; const limit = exam ? items.length * 60 : 0;
    function clearT() { if (st.timer) { clearInterval(st.timer); st.timer = null; } }
    if (exam) st.timer = setInterval(() => { const left = limit - Math.floor((Date.now() - st.start) / 1000); const tEl = el.querySelector('.tm'); if (!document.body.contains(el)) return clearT(); if (left <= 0) { finish(); return; } if (tEl) tEl.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; }, 1000);
    const letters = ['A', 'B', 'C', 'D', 'E'];
    function draw() {
      if (st.done) return results();
      const it = items[st.i]; const a = st.ans[st.i]; const reveal = !exam && a != null;
      const answered = st.ans.filter((x) => x != null).length;
      el.innerHTML = `<div class="tr-run">
        <div class="tr-top"><div class="tr-prog"><div style="width:${100 * answered / items.length}%"></div></div><span>${t('q_word')} ${st.i + 1} / ${items.length}</span>${exam ? `<span class="tm-box">⏱ <b class="tm">--:--</b></span>` : ''}</div>
        <div class="tr-meta"><span class="dchip ${it.d}">${t(DL[it.d])}</span><a href="#${it.g}-${it.n}" class="tr-topic">${lessonTitle(it)}</a></div>
        <div class="tr-q">${it.tf ? `<small>${t('tf_hint')}</small>` : ''}${tr(it.q)}</div>
        <div class="tr-opts ${it.tf ? 'tf' : ''}">${it.o.map((o, k) => { let cls = ''; if (a === k) cls = 'sel'; if (reveal) { if (k === it.a) cls = 'ok'; else if (a === k) cls = 'bad'; } return `<button data-k="${k}" class="${cls}" ${reveal ? 'disabled' : ''}><i>${it.tf ? (k ? '✗' : '✓') : letters[k]}</i><span>${tr(o)}</span></button>`; }).join('')}</div>
        ${reveal ? `<div class="tr-fb ${a === it.a ? 'ok' : 'bad'}">${a === it.a ? t('right') : t('wrong') + '<b>' + tr(it.o[it.a]) + '</b>'}${it.e ? ' — ' + tr(it.e) : ''}</div>` : ''}
        ${answered === items.length && !opts.compact ? `<div class="note" style="margin-top:12px">${t('finished_q')}</div>` : ''}
        <div class="tr-nav"><button class="btn sec" id="qp" ${st.i ? '' : 'disabled'}>${t('prev_q')}</button>
          <div class="tr-pal">${items.map((x, k) => `<button data-j="${k}" class="${k === st.i ? 'cur' : ''} ${st.ans[k] != null ? (exam ? 'done' : (st.ans[k] === x.a ? 'okk' : 'badd')) : ''}">${k + 1}</button>`).join('')}</div>
          ${st.i < items.length - 1 ? `<button class="btn pri" id="qn">${t('next_q')}</button>` : `<button class="btn grn" id="qf">${t('finish')}</button>`}</div>
      </div>`;
      el.querySelectorAll('.tr-opts button').forEach((b) => (b.onclick = () => { st.ans[st.i] = +b.dataset.k; if (exam && st.i < items.length - 1) { st.i++; } draw(); }));
      el.querySelectorAll('.tr-pal button').forEach((b) => (b.onclick = () => { st.i = +b.dataset.j; draw(); }));
      const qp = el.querySelector('#qp'), qn = el.querySelector('#qn'), qf = el.querySelector('#qf');
      if (qp) qp.onclick = () => { st.i--; draw(); }; if (qn) qn.onclick = () => { st.i++; draw(); }; if (qf) qf.onclick = finish;
    }
    function finish() { clearT(); st.done = true; save(); st.gain = opts.onFinish ? opts.onFinish(score(), items.length) || 0 : 0; results(); if (!opts.compact) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90 }); }
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
      bk.lessons.forEach((L, i) => { const n = i + 1; const u = (bk.units || []).find((u) => u.from === n); if (u) html += `<div class="tu-h">${tr(u.t)}</div>`; const key = g + '-' + n; html += `<label class="tl"><input type="checkbox" data-k="${key}" ${TS.sel.has(key) ? 'checked' : ''}><span class="lnum s" style="background:${GC[g]}">${n}</span><span>${tr(L.t)}</span></label>`; });
      return html;
    }).join('');
    const seg = (name, val, opts) => `<div class="seg" data-seg="${name}">${opts.map(([v, l]) => `<button data-v="${v}" class="${String(TS[name]) === String(v) ? 'on' : ''}">${l}</button>`).join('')}</div>`;
    app.innerHTML = `<div class="page-h tests"><div class="wrap"><div class="crumbs"><a href="#home">${t('nav_home')}</a> / ${t('nav_tests')}</div><h1>✅ ${t('t_h')}</h1><p>${t('t_p')}</p><div class="stats" style="margin-top:14px"><div><b style="color:#fff">${bankTotal}+</b><span style="color:#9de6c2">${t('t_bank')}</span></div><div><b style="color:#fff">${GRADES.reduce((a, g) => a + B[g].lessons.length, 0)}</b><span style="color:#9de6c2">${t('t_topics')}</span></div><div><b style="color:#fff">3 : 4 : 3</b><span style="color:#9de6c2">${t('easy')} : ${t('medium')} : ${t('hard')}</span></div></div></div></div>
    <div class="wrap" id="tWrap"><div class="tsetup">
      <div class="panel ts-l"><h3>📚 ${t('t_topics')} <small id="selc" style="font-weight:600;color:var(--muted);font-size:13px"></small></h3>
        <div class="ts-row">${seg('grade', TS.grade, [['both', t('t_both')], ['g6', t('nav_g6')], ['g7', t('nav_g7')], ['g8', t('nav_g8')]])}<button class="btn sec sm" id="sa">${t('t_all')}</button><button class="btn sec sm" id="sn">${t('t_none')}</button></div>
        <div class="tlist">${groups}</div></div>
      <div class="ts-r"><div class="panel"><h3>⚙️ ${lang === 'uz' ? 'Sozlamalar' : 'Settings'}</h3>
        <div class="ts-f"><label>${t('t_count')}</label>${seg('count', TS.count, [[10, '10'], [20, '20'], [30, '30'], [50, '50']])}</div>
        <div class="ts-f"><label>${t('t_diff')}</label>${seg('diff', TS.diff, [['mix', t('t_mix')], ['easy', t('easy')], ['medium', t('medium')], ['hard', t('hard')]])}</div>
        <div class="ts-f"><label>${t('t_mode')}</label><div class="modes"><label><input type="radio" name="md" value="practice" ${TS.mode === 'practice' ? 'checked' : ''}> ${t('t_practice')}</label><label><input type="radio" name="md" value="exam" ${TS.mode === 'exam' ? 'checked' : ''}> ${t('t_exam')}</label></div></div>
        <button class="btn grn big" id="tgo">▶ ${t('t_start')}</button><button class="btn sec big" id="tq" style="margin-top:8px">${t('t_quick')}</button><div id="terr" class="terr"></div></div>
        ${hist.length ? `<div class="panel"><h3>🕘 ${t('history')}</h3>${hist.map((h) => `<div class="hist"><span>${new Date(h.d).toLocaleDateString()} — ${h.title}</span><b>${h.s}/${h.n}</b></div>`).join('')}</div>` : ''}
      </div></div></div>`;
    const updC = () => (document.getElementById('selc').textContent = `(${TS.sel.size} ${t('t_selected')})`); updC();
    app.querySelectorAll('.tlist input').forEach((c) => (c.onchange = () => { c.checked ? TS.sel.add(c.dataset.k) : TS.sel.delete(c.dataset.k); updC(); }));
    app.querySelectorAll('[data-seg]').forEach((s) => s.querySelectorAll('button').forEach((b) => (b.onclick = () => { const k = s.dataset.seg; TS[k] = k === 'count' ? +b.dataset.v : b.dataset.v; if (k === 'grade') TS.sel = new Set(allLessons().map((x) => x.join('-'))); testsPage(); })));
    app.querySelectorAll('input[name=md]').forEach((r) => (r.onchange = () => (TS.mode = r.value)));
    document.getElementById('sa').onclick = () => { TS.sel = new Set(allLessons().map((x) => x.join('-'))); testsPage(); };
    document.getElementById('sn').onclick = () => { TS.sel = new Set(); testsPage(); };
    const start = (sel, count, diff) => {
      if (!sel.length) { document.getElementById('terr').textContent = t('t_pick'); return; }
      const go = () => { const items = QB.build(sel, count, diff); const w = document.getElementById('tWrap'); w.innerHTML = '<div class="panel tr-panel"><div id="tRun"></div></div>'; runTest(document.getElementById('tRun'), items, { mode: TS.mode, title: `${t('nav_tests')} (${sel.length} ${lang === 'uz' ? 'mavzu' : 'topics'})`, onNew: go, onBack: testsPage, onFinish: (s) => { if (XPok()) XP.test(s); return s; } }); window.scrollTo({ top: 0 }); };
      go();
    };
    document.getElementById('tgo').onclick = () => start([...TS.sel].map((k) => { const [g, n] = k.split('-'); return [g, +n]; }), TS.count, TS.diff);
    document.getElementById('tq').onclick = () => start(allLessons(), 20, 'mix');
  }
  let curTab = 'content';
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
      <h1 style="font-size:28px;color:var(--navy);margin-bottom:6px">${e.icon} ${tr(e.title)}</h1><p style="margin:0 0 16px;color:var(--muted)">${tr(e.desc)}</p>
      <div class="labpage"><div class="lab-host" id="bigLab"></div></div>
      <div class="safety">⚠️ ${t('safety')}</div>
      <div id="zkLabGuide"></div>
      <div class="panel" style="margin-top:18px"><h3>📚 ${t('related')}</h3>${ls.map((x) => `<a href="#${x.g}-${x.n}" style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)"><span class="lnum" style="width:32px;height:32px;font-size:13px;background:${GC[x.g]}">${x.n}</span><span><b>${tr(x.L.t)}</b><br><small style="color:var(--muted)">${GN[x.g]}-${t('grade')}</small></span></a>`).join('')}</div>
    </div>`;
    labHandle = Lab.open(document.getElementById('bigLab'), id, { autoplay: true });
    if (window.ZKLabGuide && labHandle) ZKLabGuide.mount(document.getElementById('zkLabGuide'), labHandle, { lang });
  }
  function openModal(id) {
    const e = Lab.exps[id]; if (!e) return; destroyLab();
    document.getElementById('lmTitle').textContent = tr(e.title); document.getElementById('lmIcon').textContent = e.icon || '🧪';
    document.getElementById('labModal').classList.add('on');
    modalHandle = Lab.open(document.getElementById('lmHost'), id, { autoplay: true });
  }
  function closeModal() { document.getElementById('labModal').classList.remove('on'); if (modalHandle) { modalHandle.destroy(); modalHandle = null; } }
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
      <div class="ctl"><button class="btn sec" id="bp">←</button><input id="bi" type="number" min="1" max="${max}" value="${p + 1}"><span style="color:var(--muted)">/ ${max}</span><button class="btn sec" id="bn">→</button></div>
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
    app.querySelectorAll('.spread img').forEach((im) => (im.onclick = () => zoomImg(im)));
  }
  const bookPos = { g6: 0, g7: 0, g8: 0 }; let bookTr = true;
  document.onkeydown = (e) => {
    if (e.key === 'Escape') { closeModal(); document.getElementById('zoom').classList.remove('on'); return; }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const tg = e.target; if (tg && (tg.tagName === 'INPUT' || tg.tagName === 'TEXTAREA' || tg.tagName === 'SELECT' || tg.isContentEditable)) return;
      if (document.getElementById('labModal').classList.contains('on') || document.getElementById('zoom').classList.contains('on')) return;
      const m = (location.hash || '').match(/^#(g[678])-(\d+)$/); if (!m) return;
      const n = +m[2] + (e.key === 'ArrowRight' ? 1 : -1); if (n < 1 || n > B[m[1]].lessons.length) return;
      e.preventDefault(); location.hash = `${m[1]}-${n}`;
    }
  };

  function zoomImg(im) { const z = document.getElementById('zoom'); const zi = z.querySelector('img'); zi.src = im.getAttribute('src'); const h = +im.dataset.h || 1273; zi.style.cssText = `aspect-ratio:900/${h};object-fit:cover;object-position:${im.style.objectPosition};height:min(96vh, ${(96 * h / 900).toFixed(1)}vw);width:auto`; z.classList.remove('big'); z.classList.add('on'); }
  { const z = document.getElementById('zoom'); const zi = z.querySelector('img'); const touch = matchMedia('(pointer:coarse)').matches;
    z.onclick = (e) => { if (touch && e.target === zi) { const r0 = zi.getBoundingClientRect(); const fx = (e.clientX - r0.left) / r0.width, fy = (e.clientY - r0.top) / r0.height; const big = z.classList.toggle('big'); if (big) { zi.dataset.cs = zi.style.cssText; zi.style.height = 'auto'; zi.style.width = '240vw'; zi.style.maxWidth = 'none'; zi.style.maxHeight = 'none'; requestAnimationFrame(() => { const r = zi.getBoundingClientRect(); z.scrollTo({ left: fx * r.width - innerWidth / 2 + 20, top: fy * r.height - innerHeight / 2 + 20 }); }); } else { zi.style.cssText = zi.dataset.cs || ''; z.scrollTo(0, 0); } return; } z.classList.remove('on', 'big'); z.scrollTo(0, 0); }; }

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
    if (!num && s.length < 2) { sres.classList.remove('on'); return; }
    const out = [], seen = new Set();
    if (num) {
      GRADES.forEach((g) => { if (num.g && num.g !== g) return; const L = B[g].lessons[num.n - 1]; if (L) { out.push(hit(g, num.n, L, 'top')); seen.add(g + num.n); } });
      if (!out.length) out.push(`<a class="muted">${t('no_lesson_n').replace('{n}', num.n)}</a>`);
    }
    if (s.length >= 2) {
      GRADES.forEach((g) => B[g].lessons.forEach((L, i) => { if (seen.has(g + (i + 1))) return; const hay = [L.t.uz, L.t.en, ...(L.pts || []).flatMap((p) => [p.uz, p.en]), ...(L.terms || []).flatMap((x) => [x[0].uz, x[0].en])].join(' ').toLowerCase(); if (hay.includes(s)) out.push(hit(g, i + 1, L)); }));
      Lab.list.forEach((e) => { if ((e.title.uz + e.title.en + e.desc.uz + e.desc.en).toLowerCase().includes(s)) out.push(`<a href="#lab-${e.id}"><span class="snum lab">${e.icon}</span><span class="stx">${esc(tr(e.title))}<small>3D ${t('exp_word')}</small></span></a>`); });
    }
    sres.innerHTML = out.slice(0, 14).join('') || `<a class="muted">${t('nores')}</a>`; sres.classList.add('on');
    if (num && sres.querySelector('a[href]')) { sIdx = 0; mark(); }
  };
  const links = () => [...sres.querySelectorAll('a[href]')];
  function mark() { links().forEach((a, i) => a.classList.toggle('sel', i === sIdx)); const a = links()[sIdx]; if (a) a.scrollIntoView({ block: 'nearest' }); }
  q.onkeydown = (e) => {
    const L = links(); if (!sres.classList.contains('on') || !L.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); sIdx = (sIdx + 1) % L.length; mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sIdx = (sIdx - 1 + L.length) % L.length; mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); const a = L[Math.max(0, sIdx)]; location.hash = a.getAttribute('href'); q.value = ''; q.blur(); sres.classList.remove('on'); }
    else if (e.key === 'Escape') { sres.classList.remove('on'); q.blur(); }
  };
  q.onfocus = () => { if (q.value.trim()) q.oninput(); };
  q.onblur = () => setTimeout(() => sres.classList.remove('on'), 200);
  sres.onclick = () => { q.value = ''; sres.classList.remove('on'); };

  /* ---------- router ---------- */
  let lastRoute = '';
  function route() {
    const h = (location.hash || '#home').slice(1);
    destroyLab(); closeModal(); document.getElementById('nav').classList.remove('open');
    let m, navKey = 'home';
    if (h === 'home' || h === '') home();
    else if (h === 'g6' || h === 'g7' || h === 'g8') { list(h); navKey = h; }
    else if ((m = h.match(/^(g[678])-(\d+)$/))) { if (lastRoute.split('-')[0] !== m[1] || !lastRoute.match(/-\d+$/)) curTab = 'content'; lesson(m[1], +m[2], curTab); navKey = m[1]; }
    else if (h === 'tests') { testsPage(); navKey = 'tests'; }
    else if ((m = h.match(/^ptable(?:-(\d+))?$/))) { if (window.PT) PT.render(app, { lang, t, tr, B, z: m[1] ? +m[1] : null }); else home(); navKey = 'pt'; }
    else if (h === 'me') { if (XPok()) XP.page(app, { t, tr, B }); else home(); navKey = 'me'; }
    else if (h === 'certificate') { if (window.ZKCertificate && XPok()) ZKCertificate.render(app, { lang, B }); else home(); navKey = 'me'; }
    else if (h === 'admin' && window.ZKA && window.ZKAuth && ZKAuth.isAdmin()) { ZKA.render(app, { t, tr, B, lang, GC }); navKey = 'admin'; }
    else if (h === 'teacher' && window.ZKT && window.ZKAuth && ZKAuth.isStaff()) { ZKT.render(app, { t, tr, B, lang, GC }); navKey = 'teacher'; }
    else if (h === 'lab') { labList(); navKey = 'lab'; }
    else if ((m = h.match(/^lab-(.+)$/))) { labPage(m[1]); navKey = 'lab'; }
    else if ((m = h.match(/^book-(g[678])$/))) { book(m[1], bookPos[m[1]]); navKey = 'book'; }
    else home();
    if (h !== lastRoute && !(h.match(/-\d+$/) && lastRoute === h)) window.scrollTo({ top: 0 });
    lastRoute = h;
    document.querySelectorAll('nav.main a, .bnav a').forEach((a) => a.classList.toggle('on', a.dataset.nav === navKey));
    if (XPok()) XP.refresh();
    app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
  }
  window.addEventListener('hashchange', route);
  document.querySelectorAll('.lang button').forEach((b) => (b.onclick = () => setLang(b.dataset.lang)));
  document.getElementById('burger').onclick = () => document.getElementById('nav').classList.toggle('open');
  setLang(lang);
})();
