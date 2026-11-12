# ADR-0004: AI kimyo yordamchisi — Cloud Functions + OpenAI

- **Holat:** qabul qilingan (loyiha egasi tanlovi, 2026-11-12); amalga oshirish 6-bosqichda
- **Sana:** 2026-11-12

## Qaror
- Model: OpenAI (ChatGPT) API.
- Kalit faqat serverda: `firebase functions:secrets:set OPENAI_API_KEY` (Secret Manager). Repozitoriyda, sayt kodida yoki Firestore'da saqlanmaydi.
- Callable Cloud Function `aiTutor`: faqat kirgan foydalanuvchi; har bir o'quvchi uchun kunlik so'rov limiti (Firestore'da hisoblagich); savol bilan birga tegishli dars matni yuboriladi (javob darsga tayanadi); xavfli amaliy ko'rsatmalarga javob bermaslik bo'yicha tizim ko'rsatmasi; javob ostida "AI xato qilishi mumkin" eslatmasi.
- Talab: Firebase Blaze tarifi.

## Muqobillar
Cloudflare Worker (bepul, lekin login bilan bog'lash murakkabroq) — rad etildi: Firebase Auth bilan bitta tizimda qolish soddaroq.
