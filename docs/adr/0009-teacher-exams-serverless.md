# ADR-0009: O'qituvchi yuboradigan testlar — serversiz (bepul) arxitektura

Holat: qabul qilindi (2026-11-25)

## Kontekst
Topshiriqda testlarni server tomonida baholash, server vaqti va real vaqt bildirishnomalari so'ralgan. Cloud Functions uchun Blaze tarifi (oldindan to'lov) kerak — loyiha bepul (Spark) rejimida qoladi.

## Qaror
- Kolleksiyalar: `examTests` (o'qituvchi bazasi), `examAssign` (yuborilgan nusxa — javob kalitisiz), `examKeys` (kalit, faqat egasi/admin), `examAttempts` (`<aid>_<uid>_<n>`), `examResults` (id = urinish id).
- Vaqt: urinish `startedAt` va har saqlash `serverTimestamp()`; Firestore qoidalari `request.time` bilan muddat va davomiylikni tekshiradi (+20 s tarmoq zaxirasi). Mijoz soati hal qiluvchi emas.
- Baholash: testni yuborgan o'qituvchi (yoki admin) brauzerida — monitoring sahifasida darhol, sayt ochiq bo'lsa fon rejimida har daqiqada. Natija o'quvchiga o'qituvchi saytga kirgach chiqadi.
- Bildirishnoma: Firestore `onSnapshot` (`uids array-contains`).

## Oqibatlar
- Natija darhol emas: o'qituvchi saytni ochmaguncha «Tekshirilmoqda». Blaze yoqilsa, baholashni Cloud Function'ga ko'chirish oson (bir xil `gradeAttempt`).
- Javob kaliti o'quvchi qurilmasiga hech qachon tushmaydi.
