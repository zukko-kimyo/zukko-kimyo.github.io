# Hamkorlik qoidalari: Claude + ChatGPT + loyiha egasi

Zukko Kimyo 2.0 ni ikki AI va loyiha egasi birgalikda rivojlantiradi. Yagona umumiy joy — shu GitHub repozitoriy. Barcha kelishuvlar, qarorlar va natijalar shu yerda yoziladi, chat suhbatlarida emas.

## Rollar

| Kim | Asosiy vazifa |
| --- | --- |
| **Loyiha egasi** (Zukko maktabi) | Ustuvorliklarni belgilaydi, PR'larni tasdiqlaydi va `main`ga birlashtiradi, Firebase konsolidagi o'zgarishlarni (qoidalarni e'lon qilish, tariflar) bajaradi yoki ruxsat beradi |
| **Claude** | Funksiyalarni ishlab chiqadi: kod, dizayn, 3D laboratoriya, testlar, hujjatlar; har bir ish uchun branch va PR ochadi |
| **ChatGPT** | Mustaqil ko'rib chiquvchi: kodni, xavfsizlikni va testlarni tekshiradi, PR'ga izoh yozadi, kerak bo'lsa tuzatishlarni alohida branchda taklif qiladi |

Rollar qat'iy emas: ChatGPT ham funksiya yozishi, Claude ham ChatGPT ishini ko'rib chiqishi mumkin. Asosiy qoida — **muallif o'z PR'ini o'zi tasdiqlamaydi**.

## Qat'iy qoidalar

1. **`main`ga to'g'ridan-to'g'ri yozilmaydi.** Har bir o'zgarish branch → Pull Request → ko'rib chiqish → loyiha egasining tasdig'i orqali kiradi. `main` = jonli sayt (GitHub Pages undan avtomatik yangilanadi).
2. **Maxfiy ma'lumot git'ga tushmaydi:** parollar, API kalitlari (OpenAI va boshqalar), service account fayllari, `.env`. `tests/unit/no-secrets.test.mjs` buni har PR'da tekshiradi. Firebase web `apiKey` maxfiy emas (qarang: [ADR-0001](adr/0001-static-site-firebase.md)).
3. **Mavjud ishlayotgan tizim buzilmaydi.** Firebase loyihasi, foydalanuvchilar va ularning natijalari saqlanadi. Ma'lumot tuzilmasini o'zgartiradigan PR migratsiya rejasini yozishi shart.
4. **Har bir o'zgarish testlar bilan keladi.** Yangi funksiya — yangi test. Qoidalar (`firestore.rules`) o'zgarsa — `tests/rules/` yangilanadi.
5. **Har bir muhim qaror yoziladi** — `docs/adr/` da qisqa ADR (Architecture Decision Record).

## Branch nomlari

| Prefiks | Nima uchun | Misol |
| --- | --- | --- |
| `feature/` | yangi funksiya | `feature/admin-panel` |
| `fix/` | xato tuzatish | `fix/teacher-panel-race` |
| `security/` | xavfsizlik | `security/remove-plaintext-passwords` |
| `chore/` | infratuzilma, testlar, CI | `chore/collaboration-setup` |
| `docs/` | faqat hujjatlar | `docs/architecture` |
| `review/` | ko'rib chiquvchining tuzatish taklifi | `review/admin-panel-chatgpt` |

Bir PR = bitta mavzu. Katta funksiya bir nechta kichik PR'ga bo'linadi.

## Commit xabarlari

Birinchi qator qisqa va aniq, o'zbek tilida (inglizcha ham bo'ladi), keyin bo'sh qator va kerak bo'lsa tafsilot. Qaysi AI yozganini `Co-Authored-By:` qatori ko'rsatadi.

```
Administrator paneli: 14 kunlik faollik grafigi

Faol o'quvchilar soni progress.days dan hisoblanadi (lib/stats.js).

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Pull Request tartibi

1. Muallif branch ochadi, ishlaydi, testlarni ishga tushiradi.
2. PR ochiladi — shablon (`.github/pull_request_template.md`) to'liq to'ldiriladi: nima o'zgardi, fayllar jadvali, texnik qarorlar, test natijalari, xavfsizlik, qaytarish rejasi.
3. CI (GitHub Actions, `Testlar`) avtomatik ishlaydi: unit, Firestore qoidalari, e2e.
4. Ko'rib chiquvchi (boshqa AI) PR'ni o'qiydi va izoh qoldiradi. Topilgan muammolar:
   - kichik — PR izohida;
   - katta yoki kod bilan — `review/<mavzu>` branchida, PR'ning branchiga qaratilgan alohida PR sifatida.
5. Muallif izohlarga javob beradi yoki tuzatadi.
6. **Loyiha egasi** tasdiqlaydi va birlashtiradi (squash merge tavsiya etiladi).
7. `firestore.rules` o'zgargan bo'lsa — birlashtirilgandan keyin qoidalar Firebase konsolida e'lon qilinadi (qarang: [ARCHITECTURE.md](ARCHITECTURE.md#qoidalarni-elon-qilish)).

## Ko'rib chiquvchi uchun tekshiruv ro'yxati

- [ ] Kod PR tavsifida aytilgan ishni qiladimi, ortiqcha narsa yo'qmi?
- [ ] Rollar to'g'ri tekshiriladimi (o'quvchi / o'qituvchi / administrator)? Mijoz tomonidagi tekshiruv yetarli emas — `firestore.rules` ham himoya qiladimi?
- [ ] Maxfiy ma'lumot, parol, kalit yo'qmi? Foydalanuvchi kiritgan matn HTML'ga xavfsiz qo'yiladimi (`esc()`)?
- [ ] Testlar haqiqatan funksiyani tekshiradimi, CI yashilmi?
- [ ] Telefon (360 px) va kompyuterda ishlaydimi? Ikki tilda (uz/en) matnlar bormi?
- [ ] Mavjud ma'lumotlar bilan orqaga moslik saqlanganmi?

## Holatni kuzatish

- **Reja va bosqichlar:** [ROADMAP.md](ROADMAP.md)
- **O'zgarishlar tarixi:** [../CHANGELOG.md](../CHANGELOG.md)
- **Arxitektura va ma'lumotlar tuzilmasi:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Testlar:** [TESTING.md](TESTING.md)
- **Xavfsizlik va ma'lum xavflar:** [SECURITY.md](SECURITY.md)
- **Qarorlar:** [adr/](adr/)
