# ADR 0005 — Zukko maktab brendi asosida yagona dizayn

- Sana: 2026-11-13
- Holat: Taklif qilingan (PR orqali)
- Mualliflar: Claude (foydalanuvchi so'rovi bo'yicha); tekshiruvchi: ChatGPT

## Kontekst
Saytda ikki xil uslub aralashgan edi: v3 qatlamidagi to'q ko'k + lime (bosh sahifa, sarlavhalar) va eski
o'yinli qatlam (to'q sariq / binafsha: login, dars raqamlari, tablar, chiplar, toastlar, o'qituvchi paneli).
Interfeysda emojilar ikonka sifatida ishlatilgan — ular har xil qurilmada har xil ko'rinadi.
Maktab dizayn tizimi: logotip rangi teal `#00555a`, yashil + ko'k + oq, sarlavhalarda serif, matnda sans.

## Qaror
1. `brand.css` — eng oxirida yuklanadigan brend qatlami. Mavjud CSS fayllar o'chirilmaydi (xavfsiz qaytarish:
   `<link brand.css>` va `icons.js` ni olib tashlash kifoya). Eski `--orange/--purple/--pri` tokenlari brendga ulanadi.
2. Shriftlar: sarlavhalar `Fraunces` (serif, Google Fonts), matn `Manrope`. Nunito olib tashlandi.
3. `icons.js` — 50+ ta bir xil chiziqli SVG ikonka. MutationObserver interfeysdagi ma'lum emojilarni ikonkaga
   almashtiradi. Kontent emojilari (tajriba rasmchalari `.th`, nishonlar `.achv`, dars ichidagi illyustratsiyalar)
   ataylab o'zgarmaydi. Mantiqqa tegilmaydi: matn kodida emoji qolgani uchun tarjima va testlar o'zgarmaydi.
4. Aniq UX tuzatishlari:
   - header kompyuterda bitta qator, telefonda ham bitta qator ("ZUKKO XALQARO / Kimyo" lockup);
   - XP xabarlari dars sarlavhasini yopmaydi (kompyuterda o'ng pastda, telefonda pastki menyu ustida);
   - suzuvchi "Oldingi/Keyingi dars" kompyuterda yashirildi (sarlavha yonida va pastda bor);
   - o'zbekcha rejimda inglizcha yorliqlar ("LEARNING PATHS" va h.k.) olib tashlandi;
   - yangi o'quvchi bo'sh grafik o'rniga "Boshlash uchun 3 qadam" ko'radi;
   - tajriba kartalarida ko'pi bilan 3 ta dars yorlig'i + "+N";
   - o'qituvchi paneli tablari telefonda 2 ustunli to'r (hammasi ko'rinadi);
   - "Molekulyar laboratoriya" telefonda yig'ilgan: bosilganda ochiladi, 3D faqat shunda yuklanadi
     (foydalanuvchi so'rovi). Kompyuterda bosh blok yonida qoladi.
   - telefonda foydalanuvchi belgisi (avatar "A") pastki menyuning o'ng chetiga ko'chdi, "Panel" tugmasi
     o'rnida turadi; menyu yuqoriga ochiladi (foydalanuvchi so'rovi). Kompyuterda header'da qoladi.

## Oqibatlar
- `+` Bitta brend, barqaror ikonkalar, telefonda kamroq yuklama (3D bosh sahifada so'ralganda).
- `−` Yana bitta override qatlami (`brand.css`). Keyinchalik `index.html` dagi eski inline CSS va
  `design-refresh.css`/`visual-v3.css` ni birlashtirib tozalash kerak (ROADMAP'ga yozilsin).
- Testlar: `tests/e2e/brand-design.spec.mjs` (16 holat: desktop + mobil); `visual-redesign.spec.mjs` da hero rangi yangilandi.
