# Zukko Kimyo — 6–8-sinf

Sayt: **https://zukko-kimyo.github.io/** · Loyiha 2.0 bosqichida Claude va ChatGPT tomonidan GitHub orqali birgalikda rivojlantirilmoqda — qoidalar: [docs/COLLABORATION.md](docs/COLLABORATION.md).

Zukko Xalqaro Maktabi kimyo darsliklari asosidagi o'quv sayti: darslar (o'zbek/ingliz), darslik sahifalari, 3D tajribalar, testlar, davriy jadval, XP va yutuqlar, o'qituvchi paneli.

## Tuzilishi

| Fayl | Vazifasi |
|---|---|
| `index.html` | Sayt (dizayn va yuklovchi) |
| `firebase-config.js` | **Firebase sozlamalari — shu faylni to'ldirasiz** |
| `firestore.rules` | Maʼlumotlar bazasi xavfsizlik qoidalari (Firebase Console → Firestore → Rules) |
| `auth.js` | Login, chiqish, natijalarni serverga saqlash |
| `teacher.js` | O'qituvchi paneli (`#teacher`) |
| `app.js`, `progress.js`, `data-*.js`, `tests*.js`, `lab-*.js`, `ptable.js` | Sayt mazmuni va funksiyalari |
| `pages/s/` | Darslik sahifalari rasmlari |

## Rejimlar

- `firebase-config.js` bo'sh → sayt **loginsiz** ishlaydi (ochiq demo).
- `firebase-config.js` to'ldirilgan → login va parol bilan kiriladi.
- `firebase-config.js` bo'sh bo'lganda manzil oxiriga `?mock` qo'shilsa → **sinov rejimi** (server kerak emas, maʼlumotlar faqat shu brauzerda).

## Birinchi kirish

1. Saytni oching, login: `admin`, o'zingiz o'ylagan parol (kamida 6 belgi) → **Kirish**.
2. «Administrator hisobini yaratish» tugmasini bosing (faqat birinchi marta chiqadi).
3. Menyudagi **O'qituvchi paneli** → o'qituvchilar va o'quvchilarni qo'shing.

To'liq qo'llanma: sozlash hujjatida (GitHub + Firebase, qadamma-qadam).

## Ishlab chiquvchilar uchun

```bash
npm ci
npx playwright install chromium
npm test            # unit + e2e
npm run test:rules  # Firestore qoidalari (Java kerak)
npm run serve       # http://localhost:8090
```

- Hamkorlik tartibi: [docs/COLLABORATION.md](docs/COLLABORATION.md) — `main`ga faqat PR orqali, maxfiy kalitlar git'ga tushmaydi.
- Arxitektura va ma'lumotlar tuzilmasi: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Testlar: [docs/TESTING.md](docs/TESTING.md) · Xavfsizlik: [docs/SECURITY.md](docs/SECURITY.md) · Reja: [docs/ROADMAP.md](docs/ROADMAP.md) · Qarorlar: [docs/adr/](docs/adr/)
