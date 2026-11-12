# Arxitektura

Zukko Kimyo — build bosqichi yo'q statik sayt (oddiy HTML + JavaScript), GitHub Pages'da joylashgan. Login va ma'lumotlar Firebase'da (Authentication + Cloud Firestore). Sayt: <https://zukko-kimyo.github.io/>.

## Fayllar

| Fayl | Vazifasi |
| --- | --- |
| `index.html` | Butun dizayn (CSS) va skript yuklovchi. Skriptlar `?v=VER` bilan yuklanadi — yangi relizda `VER` o'zgartiriladi (kesh) |
| `firebase-config.js` | Firebase web sozlamalari (maxfiy emas). Bo'sh bo'lsa — sayt loginsiz ishlaydi |
| `auth.js` | Login, ro'yxatdan o'tish, chiqish, natijani serverga sinxronlash, `ZKAuth` API. Ikki backend: Firebase va `mock` (sinov) |
| `teacher.js` | O'qituvchi paneli (`#teacher`): natijalar, o'quvchi qo'shish, arizalar, sinf kodlari, o'qituvchilar (admin) |
| `app.js` | Asosiy SPA: marshrutlar (`#home`, `#g6`…`#g8-12`, `#tests`, `#lab`, `#ptable`, `#book-g7`, `#me`, `#teacher`), dars sahifalari, test markazi |
| `progress.js` | XP, darajalar, kunlik maqsad, yutuqlar. `localStorage['zk_prog']` ga yozadi va `zk:save` hodisasini chiqaradi |
| `data-g6.js`, `data-g7.js`, `data-g8.js` | Darslar mazmuni (uz/en) — `window.BOOKS` |
| `tests.js`, `tests-g8.js` | Test banki va generatorlari — `window.QB` |
| `lab-core.js`, `lab-exps1..7.js` | Three.js 3D laboratoriya (52 tajriba) |
| `ptable.js` | Interaktiv davriy jadval |
| `pages-tr.js`, `pages/s/` | Darslik sahifalari rasmlari (4 sahifadan birlashtirilgan webp) |
| `mobile.js`, `tilt.js` | Telefon uchun surish (swipe), kartalarning egilish effekti |
| `firestore.rules` | Firestore xavfsizlik qoidalari — **manba shu fayl** |

### Yuklanish tartibi (`index.html`)

1. `firebase-config.js` → `auth.js` → `ZKAuth.ready()` (login oynasi yoki sessiyani tiklash; natija `localStorage`ga yoziladi)
2. Three.js (CDN, import map) → `lab-*.js`
3. `data-*.js`, `tests*.js`, `pages-tr.js`, `ptable.js`, `progress.js`, `tilt.js`, `teacher.js`, `app.js`, `mobile.js`
4. `ZKAuth.chip()` — sarlavhadagi foydalanuvchi menyusi

## Rejimlar

| Holat | Qanday yoqiladi | Natija |
| --- | --- | --- |
| Ochiq (loginsiz) | `firebase-config.js` bo'sh | Login yo'q, natijalar faqat brauzerda |
| Firebase | `firebase-config.js` to'ldirilgan | Login majburiy, natijalar Firestore'da |
| Sinov (`mock`) | config bo'sh + manzilda `?mock` | Firebase'siz to'liq login tizimi, hammasi `localStorage['zk_mock_db']`da. E2E testlar shu rejimda ishlaydi |

Haqiqiy config bo'lganda `?mock` ishlamaydi — loginni chetlab o'tib bo'lmaydi.

## Firebase

- Loyiha: `zukko-kimyo`, Firestore joylashuvi `europe-west3` (Frankfurt), tarif: Spark (bepul).
- Login: Email/Password. Foydalanuvchi logini email'ga aylanadi: `vali.a.7a` → `vali.a.7a@zukko-kimyo.uz` (xat yuborilmaydi).
- Administrator birinchi kirishda saytning o'zida yaratiladi (`admin` loginini egallagan birinchi odam). Qoidalar buni faqat `admin@zukko-kimyo.uz` uchun va faqat bir marta ruxsat beradi.

### Ma'lumotlar tuzilmasi (Firestore)

| Kolleksiya / hujjat | Maydonlar | Kim o'qiydi | Kim yozadi |
| --- | --- | --- | --- |
| `users/{uid}` | `login, name, role (student/teacher/admin), cls, status? (pending/active), code?, self?, created, by?` | o'zi; o'qituvchi va admin | o'qituvchi (o'quvchi), admin (o'qituvchi), o'zi (ro'yxatdan o'tishda, `pending`) |
| `progress/{uid}` | `data` (progress.js JSON), `xp, done6, done7, done8, quizAvg, quizN, labs, visited, last, updated, login, name, cls, role` | o'zi; o'qituvchi va admin | faqat o'zi (`pending` emas) |
| `secrets/{uid}` | `pw, role, login` — **vaqtinchalik**, qarang [ADR-0002](adr/0002-temporary-password-storage.md) | admin (hammasi), o'qituvchi (faqat o'quvchilar) | admin, o'qituvchi, o'zi (ro'yxatdan o'tishda) |
| `classes/{CODE}` | `cls, active, by, created` | aniq kod bo'yicha — hamma; ro'yxat — o'qituvchi | o'qituvchi, admin |

Qolgan barcha yo'llar yopiq (`match /{document=**} { allow read, write: if false; }`).

### Qoidalarni e'lon qilish

`firestore.rules` o'zgargan PR birlashtirilgach, loyiha egasi (yoki uning ruxsati bilan AI) qoidalarni e'lon qiladi:

- Firebase konsoli → Firestore Database → Rules → fayl matnini qo'yish → **Publish**, yoki
- `npx firebase deploy --only firestore:rules --project zukko-kimyo` (Firebase'ga kirgan kompyuterdan).

Avval `npm run test:rules` (yoki CI) yashil bo'lishi shart.

## Joylash (deploy)

`main` branchga birlashtirilgan har bir commit GitHub Pages tomonidan 1–2 daqiqada saytga chiqadi. Orqaga qaytarish: `main`da `git revert` (PR orqali).

## Maqsadli tuzilma (2.0)

ChatGPT taklif qilgan va kelishilgan yo'nalish: mavjud fayllar bir zumda emas, **bosqichma-bosqich** `src/` ostidagi modullarga ko'chiriladi, server mantiqi Cloud Functions'ga o'tadi (`functions/`). Har bir ko'chirish alohida PR, testlar bilan. Batafsil: [ROADMAP.md](ROADMAP.md).
