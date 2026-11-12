# ADR-0002: Parollarni vaqtincha `secrets` kolleksiyasida saqlash

- **Holat:** vaqtinchalik qabul qilingan; 2-bosqichda bekor qilinadi
- **Sana:** 2026-11-12

## Kontekst
Firebase mijoz SDK'si boshqa foydalanuvchining parolini almashtira yoki hisobini o'chira olmaydi — buning uchun Admin SDK (server) kerak. Spark tarifida Cloud Functions yo'q. Maktabda esa o'qituvchi o'quvchining unutilgan parolini tiklay olishi shart.

## Qaror (vaqtinchalik)
Hisob yaratilganda parol `secrets/{uid}` ga yoziladi. O'qituvchi "Yangi parol"ni bosganda sayt ikkinchi (xotirada) Firebase ilovasida o'sha o'quvchi bo'lib kiradi va parolni almashtiradi. Qoidalar: o'quvchi parolini faqat o'qituvchi/admin, o'qituvchi parolini faqat admin o'qiydi; o'quvchi hech qanday parolni o'qiy olmaydi.

## Xavf
Parollar ochiq matnda. O'qituvchi hisobi buzilsa, o'quvchilar parollari oshkor bo'ladi. ChatGPT ko'rib chiqishida ham bu asosiy xavf sifatida ko'rsatilgan.

## Bekor qilish rejasi (2-bosqich)
1. Firebase Blaze tarifi yoqiladi.
2. Cloud Function `manageUsers` (callable): `createUser`, `resetPassword`, `deleteUser` — chaqiruvchining roli Firestore'dan tekshiriladi, o'qituvchi faqat o'z sinflari bilan ishlaydi.
3. `teacher.js` va `auth.js` shu funksiyalarga o'tkaziladi; yangi parol faqat bir marta ekranda ko'rsatiladi.
4. Migratsiya skripti `secrets` kolleksiyasini o'chiradi; qoidalardan `secrets` bloki olib tashlanadi; testlar yangilanadi.
