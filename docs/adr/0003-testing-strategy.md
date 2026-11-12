# ADR-0003: Test strategiyasi

- **Holat:** qabul qilingan
- **Sana:** 2026-11-12

## Qaror
- **Unit** (`node:test`, paketsiz): ma'lumotlar to'liqligi, sof funksiyalar, maxfiy kalit skaneri.
- **E2E** (Playwright, desktop + mobil): sayt **sinov rejimida** (`?mock`, `auth.js` dagi `mockBackend`). Haqiqiy Firebase'ga tegilmaydi, jonli foydalanuvchilar xavf ostida emas, testlar tez va internet/kalitsiz ishlaydi.
- **Qoidalar** (`@firebase/rules-unit-testing` + Firestore emulyatori): xavfsizlik qoidalari alohida, chunki mock backend qoidalarni tekshirmaydi.
- CI: har PR'da uchala to'plam (`.github/workflows/tests.yml`).

## Oqibatlar
- Mock backend Firebase xatti-harakatini taqlid qiladi; farq qolmasligi uchun yangi backend metodi qo'shilganda ikkala backendga yoziladi.
- Cloud Functions qo'shilganda ular uchun emulyatorda alohida testlar yoziladi.
