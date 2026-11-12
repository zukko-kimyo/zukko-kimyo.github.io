# ADR-0001: Statik sayt (GitHub Pages) + Firebase

- **Holat:** qabul qilingan
- **Sana:** 2026-11-12

## Kontekst
Maktab uchun bepul, oson yangilanadigan va telefonda ishlaydigan sayt kerak. Login va o'quvchi natijalarini saqlash talab qilinadi.

## Qaror
- Sayt — build bosqichisiz statik HTML/JS, GitHub Pages'da (`main` branch, ildiz papka).
- Login — Firebase Authentication (Email/Password); login nomi `login@zukko-kimyo.uz` ko'rinishidagi soxta email'ga aylanadi, xat yuborilmaydi.
- Ma'lumotlar — Cloud Firestore, himoya `firestore.rules` bilan.
- Firebase web sozlamalari (`apiKey` va boshqalar) `firebase-config.js` da ochiq turadi: bu Firebase'ning odatiy usuli, `apiKey` maxfiy emas — loyihani aniqlaydi xolos. Himoya qoidalar va (keyin) App Check bilan ta'minlanadi.

## Oqibatlar
- Server kodi yo'q, xarajat yo'q; lekin server tomonidagi mantiq (parolni tiklash, baholash, AI) uchun Cloud Functions kerak bo'ladi → ADR-0002, ADR-0004.
- Sayt fayllari (darslik rasmlari ham) ochiq repozitoriyda — hamma ko'rishi mumkin.
