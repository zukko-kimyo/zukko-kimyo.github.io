# 0008 — Zukko Akademiyasi: ko'p fanli platforma

Sana: 2026-11-17 · Holat: taklif (PR orqali ko'rib chiqiladi)

## Kontekst
Foydalanuvchi so'rovi: "yana boshqa fanlarni ham qoshish kerak rus tili matematika ing tili … har bir oqituvchi oziga
biriktirilgan fanni gina kora olsin xolos boshqalari korinmasligi kerak".

Foydalanuvchi tanlovlari:
- bitta sayt, uning ichida fanlar;
- nomi — "Zukko Akademiyasi";
- har fanga alohida obuna;
- 1–11-sinflar.

Birinchi bo'lib uchta darslik keldi, hammasi 1-sinf, 1-qism, har biri 104 sahifa va 50 mavzudan iborat:
- Zukko English Pathway 1;
- Zukko Russian Pathway 1;
- Mathematics Grade 1.

## Qaror
**1-bosqich (shu PR): platforma asosi.**
- **`subjects.js`:** fanlar ro'yxati va darsliklar mundarijasi. Ochiq ma'lumot: mavzu nomlari va o'zbekcha tarjimasi, bo'limlar, bosma sahifalar.
- **Kimyo:** mavjud bo'lim (`chem`) bo'lib, o'zgarishsiz ishlayveradi.
- **Sahifalar:**
  - `#fanlar` — fanlar ro'yxati;
  - `#s/<fan>` — fan sahifasi (1–11-sinf);
  - `#s/<fan>/<sinf>` — mavzular ro'yxati;
  - `#s/<fan>/<sinf>/<qism>/<mavzu>` — mavzu sahifasi.

  Bosh sahifada fanlar bo'limi bor. Sarlavhadagi fan nomi joriy sahifaga qarab almashadi.
- **O'qituvchi:**
  - `users.subjects` (`['math', …]`) ni faqat administrator belgilaydi.
  - Maydon yo'q bo'lsa — `['chem']`: oldingi o'qituvchilar kimyo o'qituvchilari edi.
  - O'qituvchi faqat biriktirilgan fani bo'yicha natijalarni ko'radi. `firestore.rules` da `teacherOf()` funksiyasi buni ta'minlaydi: kimyo natijalari (`progress`) faqat admin va kimyo o'qituvchisiga ochiq.
- **Obuna:**
  - `users.subs = { <fan>: { plan, until, at, by } }` — har fanga alohida.
  - Eski `users.sub` yozuvi kimyo obunasi sifatida o'qiladi.
  - Admin "Obunalar" tabida fanni tanlab beradi.
  - Qoidalar fan nomlari va obuna yozuvi shaklini tekshiradi.

**2-bosqich (keyingi PR): darsliklar.**
- Har bir sahifa alohida webp ko'rinishida Firestore'ga yoziladi (`content/<fan>-<sinf>-<qism>-<sahifa>`, taxminan 100 KB, hujjat chegarasi 1 MB). Bu Firebase'ning bepul (Spark) tarifida ishlaydi, Storage va Blaze kerak emas.
- O'qish qoidasi: xodim, sinfdagi dastlabki `freeN` mavzu, yoki `subs[fan].until > request.time`.
- Yuklashni administrator admin paneldagi "Darslik yuklash" orqali qiladi: Claude parol bilan kira olmaydi.
- Yangi so'zlar kartochkalari, brauzer orqali talaffuz (ru-RU / en-GB), mavzu bo'yicha kichik o'yin-test. Natijalar fan bo'yicha alohida hujjatda saqlanadi, shuning uchun o'qituvchi faqat o'z fanini ko'radi.

## Oqibatlar
- Mavzu nomlari ochiq, darslik sahifalari esa yopiq bo'ladi.
- Har bir yangi fan uchun `firestore.rules` dagi fanlar ro'yxatini (`chem`, `math`, `eng`, `rus`) kengaytirish kerak.
- Sayt manzili hozircha `zukko-kimyo.github.io` bo'lib qoladi. Keyinroq o'z domeni yoki yangi GitHub tashkiloti bilan o'zgartirish mumkin.
