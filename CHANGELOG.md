# O'zgarishlar tarixi

Format: har bir birlashtirilgan PR uchun qisqa yozuv. Eng yangisi tepada.

## [Chiqarilmagan]

### O'zgartirildi — Zukko brend dizayni (ADR 0005)
- `brand.css`: maktab logotipi rangi (teal #00555a) + yashil + ko'k + oq; sarlavhalar Fraunces (serif), matn Manrope. Sarlavhalar, chiplar, tablar, tugmalar, toastlar, o'qituvchi/admin paneli bitta uslubda.
- `icons.js`: interfeysdagi emojilar bir xil SVG ikonkalarga almashtirildi (tajriba rasmchalari va nishonlar o'zgarmadi).
- Header bitta qatorda (kompyuter va telefon); XP xabarlari sarlavhani yopmaydi; suzuvchi dars navigatsiyasi kompyuterda yashirildi.
- Bosh sahifa: o'zbekcha yorliqlar, yangi o'quvchi uchun "Boshlash uchun 3 qadam", tajriba kartalarida "+N" yorliq, "Molekulyar laboratoriya" telefonda bosganda ochiladi.
- O'qituvchi paneli tablari telefonda ekrandan chiqmaydi.
- Telefonda avatar ("A") va uning menyusi pastki menyuning o'ng chetida; menyu yuqoriga ochiladi.
- Darslik bo'lim ranglari oldingidek qaytdi va dars sahifasida ham ishlatiladi; darslik tuzilishi o'zgarmadi.
- Sahifalar orasida silliq o'tish: View Transitions (eski sahifa so'nadi, yangisi yumshoq paydo bo'ladi; header va pastki menyu joyida); bo'laklab kechikadigan kaskad va sekin "silliq scroll" olib tashlandi; telefonda surishda yo'nalishga mos siljish.
- Header: "Sinflar" tugmasi — bosganda 6-, 7-, 8-sinf pastga ochiladi (klaviatura: ↓ ↑ Esc). Telefonda pastki menyudagi "Sinflar" shu ranglarda.
- Kompyuterda sayt ekranni to'liq egallaydi (1290px cheklov olib tashlandi); keng ekranda kartalar ko'proq ustunga bo'linadi.
- "Liquid glass": shaffof header, telefonda suzuvchi shisha pastki menyu, shisha menyular va xabarlar.
- Telefonda maktab nomi to'liq: "ZUKKO XALQARO / MAKTABI / Kimyo"; "MAKTABI" o'rtada va "ZUKKO XALQARO" bilan bir xil o'lchamda; qidiruv belgisi ikonka bo'ldi.

### Qo'shildi
- Administrator paneli (`#admin`): 10 ta ko'rsatkich, 14 kunlik faollik grafigi, sinflar taqqoslanishi, eng faol o'quvchilar, eng qiyin darslar, sayt e'loni, ro'yxatdan o'tishni yoqish/o'chirish, CSV/JSON eksport (parollarsiz), administrator parolini o'zgartirish. `lib/stats.js` + testlar; `settings/site` uchun Firestore qoidalari va testlari.
- Hamkorlik qoidalari va hujjatlar: `docs/COLLABORATION.md`, `ARCHITECTURE.md`, `TESTING.md`, `SECURITY.md`, `ROADMAP.md`, `docs/adr/` (4 ta qaror).
- Testlar: unit (`node:test`), e2e (Playwright, desktop + mobil), Firestore qoidalari (emulyator); GitHub Actions `Testlar` workflow; PR shabloni.

### Tuzatildi
- PR #2 (administrator paneli) `main` o'rniga oraliq `chore/collaboration-setup` branchiga birlashgan edi — sayt yangilanmadi. PR #3 orqali `main`ga yetkazildi; COLLABORATION.md ga ketma-ket PR'lar qoidasi qo'shildi.
- O'qituvchi paneli: yuklanish paytida bo'lim almashtirilsa ma'lumot ikki marta so'ralar va yozilayotgan forma (masalan, o'quvchilar ro'yxati) o'chib ketardi.

## 2026-11-12 — 1.x (`main`ga to'g'ridan-to'g'ri, hamkorlik tartibidan oldin)
- Firebase login, o'qituvchi paneli, sinf kodi bilan ro'yxatdan o'tish va tasdiqlash.
- 6–8-sinf darslari, testlar, 3D laboratoriya, davriy jadval, XP tizimi, mobil versiya.
