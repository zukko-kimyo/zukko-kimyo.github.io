# O'zgarishlar tarixi

Format: har bir birlashtirilgan PR uchun qisqa yozuv. Eng yangisi tepada.

## [Chiqarilmagan]

### Qo'shildi
- Administrator paneli (`#admin`): 10 ta ko'rsatkich, 14 kunlik faollik grafigi, sinflar taqqoslanishi, eng faol o'quvchilar, eng qiyin darslar, sayt e'loni, ro'yxatdan o'tishni yoqish/o'chirish, CSV/JSON eksport (parollarsiz), administrator parolini o'zgartirish. `lib/stats.js` + testlar; `settings/site` uchun Firestore qoidalari va testlari.
- Hamkorlik qoidalari va hujjatlar: `docs/COLLABORATION.md`, `ARCHITECTURE.md`, `TESTING.md`, `SECURITY.md`, `ROADMAP.md`, `docs/adr/` (4 ta qaror).
- Testlar: unit (`node:test`), e2e (Playwright, desktop + mobil), Firestore qoidalari (emulyator); GitHub Actions `Testlar` workflow; PR shabloni.

### Tuzatildi
- O'qituvchi paneli: yuklanish paytida bo'lim almashtirilsa ma'lumot ikki marta so'ralar va yozilayotgan forma (masalan, o'quvchilar ro'yxati) o'chib ketardi.

## 2026-11-12 — 1.x (`main`ga to'g'ridan-to'g'ri, hamkorlik tartibidan oldin)
- Firebase login, o'qituvchi paneli, sinf kodi bilan ro'yxatdan o'tish va tasdiqlash.
- 6–8-sinf darslari, testlar, 3D laboratoriya, davriy jadval, XP tizimi, mobil versiya.
