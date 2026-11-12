# Testlar

Uch xil test bor. Hammasi har bir Pull Request'da GitHub Actions'da (`.github/workflows/tests.yml`) avtomatik ishlaydi.

| Buyruq | Nima tekshiriladi | Talab |
| --- | --- | --- |
| `npm run test:unit` | Dars ma'lumotlari va test banki to'liqligi (har darsda ≥10 savol, to'g'ri javob variantlar ichida, sarlavhalar ikki tilda); repozitoriyda maxfiy kalit yo'qligi | Node 20+ |
| `npm run test:e2e` | Brauzerda saytning o'zi: sahifalar ochilishi, JS xatolari yo'qligi, telefonda gorizontal siljish yo'qligi, login, o'qituvchi paneli, ro'yxatdan o'tish va tasdiqlash. Desktop (1300 px) va mobil (Pixel 7) | Playwright Chromium |
| `npm run test:rules` | `firestore.rules`: kim nimani o'qiy/yoza oladi (o'quvchi, o'qituvchi, admin, kirmagan, tasdiqlanmagan) | Java 11+, Firebase emulyatori |

## Lokal ishga tushirish

```bash
npm ci
npx playwright install chromium   # bir marta
npm run test:unit
npm run test:e2e
npm run test:rules                # Java kerak
```

E2E testlar `node tests/serve.mjs` serverini o'zi ishga tushiradi (port 8090) va saytni **sinov rejimida** ochadi: `firebase-config.js` o'rniga bo'sh sozlama beriladi, shuning uchun haqiqiy Firebase'ga hech qanday so'rov ketmaydi va jonli ma'lumotlarga tegilmaydi.

### Internetsiz muhit

```bash
THREE_DIR=/yo'l/three   # node_modules/three nusxasi: CDN o'rniga shundan olinadi
OFFLINE=1               # Google Fonts so'rovlarini to'xtatadi
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers  # brauzer boshqa joyda bo'lsa
```

## Yangi test yozish

- E2E: `tests/e2e/*.spec.mjs`, `./fixtures.mjs` dan `test`, `expect`, `gotoMock`, `login`, `bootstrapAdmin`, `logout`, `waitReady` ni oling. Fixture har testda JS xatolarini avtomatik tekshiradi va `confirm/alert`larni qabul qiladi (`page.dialogs` — chiqqan xabarlar ro'yxati).
- Unit: `tests/unit/*.test.mjs`, `node:test` va `node:assert/strict`. Sayt skriptlarini `node:vm` bilan yuklash namunasi — `content.test.mjs`.
- Qoidalar: `tests/rules/*.test.mjs`, `@firebase/rules-unit-testing`. Har testdan oldin baza tozalanadi va namunaviy foydalanuvchilar yoziladi.

## Oxirgi natijalar

Har bir PR tavsifida o'sha PR uchun natijalar yoziladi. CI natijalari — PR'ning "Checks" bo'limida.
