# Xavfsizlik

## Asosiy tamoyillar

- Haqiqiy himoya — **Firestore qoidalari** (`firestore.rules`) va (keyinchalik) **Cloud Functions**. Saytdagi JavaScript tekshiruvlari faqat qulaylik uchun: ularni brauzerda chetlab o'tish mumkin.
- Maxfiy kalitlar (OpenAI va boshqalar) faqat serverda: `firebase functions:secrets:set OPENAI_API_KEY`. Hech qachon `index.html`, `*.js` yoki boshqa repozitoriy fayliga yozilmaydi.
- Firebase web `apiKey` (`firebase-config.js`) maxfiy emas — u loyihani aniqlaydi xolos ([ADR-0001](adr/0001-static-site-firebase.md)).

## Ma'lum xavflar va reja

| # | Xavf | Hozirgi holat | Reja |
| --- | --- | --- | --- |
| S1 | O'quvchi va o'qituvchi parollari `secrets` kolleksiyasida ochiq matnda saqlanadi (o'qituvchi parolni tiklay olishi uchun) | Qoidalar bilan cheklangan: o'quvchi parolini faqat o'qituvchi/admin, o'qituvchi parolini faqat admin ko'radi | **2-bosqich:** Cloud Functions (`manageUsers`) — Admin SDK orqali parolni tiklash va hisobni o'chirish; `secrets` kolleksiyasi va unga oid kod olib tashlanadi. Blaze tarifi kerak. [ADR-0002](adr/0002-temporary-password-storage.md) |
| S2 | O'quvchi o'z natijasini (`progress`) o'zi yozadi — soxtalashtirish mumkin | Faqat o'z hujjati, roli o'zgarmaydi | Reyting, baho va sertifikatlar uchun test serverda baholanadi (`gradeQuiz`), `progress` faqat shaxsiy statistika bo'lib qoladi |
| S3 | Administratorda ikki bosqichli himoya (MFA) yo'q | Faqat parol | 2-bosqich: admin uchun MFA (Identity Platform) yoki qo'shimcha tasdiq |
| S4 | Firebase'ga bot so'rovlari | Faqat qoidalar | 2-bosqich: App Check (reCAPTCHA Enterprise) |
| S5 | Administrator paroli chat suhbatida yuborilgan | — | Loyiha egasi parolni almashtirishi kerak (admin panelda "Parolni o'zgartirish" — `feature/admin-panel`) |

## Har PR'da

- `tests/unit/no-secrets.test.mjs` — kalit/token/maxfiy kalit namunalarini qidiradi.
- `.gitignore` — `.env`, service account fayllari, `functions/.secret.local`.
- `firestore.rules` o'zgarsa, `tests/rules/` dagi testlar ham yangilanadi.

## Muammo topilsa

Ochiq Issue'da parol yoki kalitni yozmang. Loyiha egasiga bevosita xabar bering; kalit oshkor bo'lsa — darhol bekor qilinib, yangisi beriladi.
