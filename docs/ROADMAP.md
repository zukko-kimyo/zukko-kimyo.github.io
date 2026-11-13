# Zukko Kimyo 2.0 — reja

ChatGPT'ning texnik rejasi (2026-11-12) va loyiha egasining tanlovi asosida. Har bir bosqich bir yoki bir nechta PR. Holat shu faylda yangilanib boriladi.

| Bosqich | Mazmun | Branch | Holat |
| --- | --- | --- | --- |
| 0. Poydevor | Hamkorlik qoidalari, hujjatlar, unit/e2e/qoidalar testlari, CI, PR shabloni | `chore/collaboration-setup` | PR ochildi |
| 1. Administrator paneli | Umumiy statistika, faollik grafigi, sinflar taqqoslash, eng faol o'quvchilar, qiyin darslar, sayt e'loni, ro'yxatdan o'tishni yoqish/o'chirish, eksport, admin parolini o'zgartirish | `feature/admin-panel` | PR ochildi (asosi: 0-bosqich) |
| 2. Xavfsizlik va server | Firebase Blaze; Cloud Functions: `manageUsers` (parolni tiklash/o'chirish Admin SDK bilan), `secrets` kolleksiyasini olib tashlash, admin MFA, App Check, emulyatorda testlar | `security/cloud-functions` | Rejada — Blaze yoqilishi kerak |
| 3. Testlar va sertifikatlar | Bo'lim yakuniy testlari, vaqtli test, xatolar ustida takrorlash, serverda baholash (`gradeQuiz`), sinf reytingi, QR kod bilan tekshiriladigan sertifikat (`certificates`) | `feature/certificates` | Rejada |
| 4. Mobil dizayn | Dizayn tizimi (CSS o'zgaruvchilari), liquid glass sarlavha va menyu, yangi bosh sahifa/dashboard, tungi rejim, accessibility, PWA offline | `feature/mobile-design` | Rejada (namuna tayyor) |
| 5. Realistik 3D laboratoriya | Yaxshilangan materiallar va yorug'lik, qo'l bilan boshqariladigan tajribalar (avval 3 ta: neytrallanish, ...), mobil WebGL optimizatsiyasi | `feature/lab-v2` | Rejada |
| 6. AI kimyo yordamchisi | OpenAI (ChatGPT) API, Cloud Function `aiTutor` (kalit serverda), dars matniga tayangan javoblar, xavfsizlik filtri, kunlik limit | `feature/ai-tutor` | Rejada — 2-bosqichdan keyin |

## Birinchi versiya uchun qabul mezonlari

| Yo'nalish | Mezon |
| --- | --- |
| Mobil dizayn | 360 px ekranda gorizontal siljishsiz (e2e testda tekshiriladi) |
| Admin panel | O'qituvchi faqat ruxsat berilgan sinflarni boshqaradi |
| Xavfsizlik | Parollar Firestore'da ochiq saqlanmaydi |
| Natijalar | O'quvchi tasdiqlangan baho va reytingni o'zgartira olmaydi |
| 3D laboratoriya | Kamida 3 ta to'liq ishlaydigan, ilmiy tekshirilgan tajriba |
| AI yordamchi | Darsga tayangan javob, xavfsizlik filtri, foydalanish cheklovi |
| Sertifikat | QR orqali serverda haqiqiyligi tekshiriladi |
| Yangilash | PR, avtomatik test va oldingi versiyaga qaytish imkoni |

## Xarajatlar

GitHub Pages, Three.js va Firebase Spark bepul. Cloud Functions (2, 3, 6-bosqichlar) Blaze tarifini talab qiladi — maktab hajmida odatda bepul limit ichida, lekin bank kartasi ulanadi. OpenAI API so'rovlari pullik — `aiTutor`da kunlik limit va byudjet ogohlantirishi qo'yiladi.

## Texnik qarz (dizayn)
- `index.html` ichidagi eski inline CSS, `design-refresh.css`, `visual-v3.css` va `brand.css` ni bitta uslub fayliga birlashtirish (ADR 0005).
