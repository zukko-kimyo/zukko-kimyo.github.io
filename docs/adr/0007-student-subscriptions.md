# 0007 — O'quvchilar obunasi (tariflar)

Sana: 2026-11-17 · Holat: taklif (PR orqali ko'rib chiqiladi)

## Kontekst
Foydalanuvchi so'rovi: "saytning boshqa qisimlari sotib olingach keyin ishlashi kerak bu oquvchilar ucun obuna tariflari boladi".
Tanlovlar (2026-11-17):
- pullik qismlar: 3D laboratoriya, testlar va imtihon, 7–8-sinf darslari, darslik sahifalari;
- muddatlar: oylik, choraklik, o'quv yili;
- to'lov: administrator qo'lda yoqadi (naqd/o'tkazma);
- maktab o'quvchilari ham to'laydi;
- himoya: bosqichma-bosqich.

Muhim cheklov: sayt — ochiq (public) repodan GitHub Pages'da tarqatiladigan statik fayllar. Darslar, testlar va darslik
rasmlari hozir ochiq fayllarda. Firestore qoidalari bu fayllarni himoya qila olmaydi.

Aniqlashtirish (2026-11-17): "har bir sinifdan malum darajada darslar ochiladi yani 6-sinf dastlabki 2-3 mavzular tekin keyingilarini korish ucun obuna kerak labaratoriya ham shunday testlar ham shunday Oqituvchi va Admin ucun hammasi ochiq bulishi kerak".
Shunga ko'ra: har sinfda dastlabki `freeN` mavzu (standart 3, admin sozlaydi) barcha tablari bilan bepul; 3D tajriba bepul darsga
bog'langan bo'lsa ochiq; testlar va darslik sahifalari ham shu mavzular doirasida.

## Qaror
**1-bosqich (shu PR): obuna yozuvi va interfeysdagi qulflar.**
- `users/{uid}.sub = { plan, until, at, by }`. Faqat administrator yozadi. `firestore.rules` o'quvchiga ham, o'qituvchiga ham
  ruxsat bermaydi va maydonlar shaklini tekshiradi. O'qituvchi o'quvchi profilini tahrirlasa, `sub` o'zgarmasligi shart.
- Muddat hisoblash va kim ko'ra olishi `lib/sub.js` da (sof funksiyalar, unit testlar bilan):
  - faol obuna uzaytirilsa, muddat uning oxiridan qo'shiladi;
  - "O'quv yili" 30-iyungacha amal qiladi;
  - o'qituvchi va admin hamma narsani ko'radi;
  - Firebase sozlanmagan, ochiq rejimda hamma narsa ochiq.
- `app.js`: pullik sahifa yoki tabda "obuna bilan ochiladi" oynasi chiqadi. Unda tariflar, admin kiritgan narxlar va to'lov
  ma'lumoti (`settings/site.prices`, `payInfo`) ko'rsatiladi. 3D, test va tarjima fayllari umuman yuklanmaydi.
- Admin: o'qituvchi panelidagi "Obunalar" tabida bitta o'quvchiga yoki butun sinfga obuna beradi va to'xtatadi.
  "Sayt sozlamalari"da narxlar va to'lov yo'riqnomasi kiritiladi.

**2-bosqich (keyingi PR): kontentni himoyalash.**
- Test bazasi, 7–8-sinf dars matnlari va darslik sahifalari tarjimasi Firestore'ga ko'chiriladi. O'qish qoidasi:
  `get(users/uid).data.sub.until > request.time.toMillis()` yoki xodim.
- Darslik rasmlari Firebase Storage'ga ko'chiriladi, xuddi shunday qoida bilan. Bu Blaze tarifini talab qilishi mumkin.
- Fayllar ochiq repodan olib tashlanadi. Eski git tarixida ular qoladi, shuning uchun to'liq yopish uchun tarixni tozalash
  yoki yangi repo kerak. Bu alohida qaror.
- 3D tajribalar kodi baribir brauzerga yuklanadi va to'liq yashirib bo'lmaydi. Qulf interfeysda qoladi.

## Oqibatlar
- 1-bosqichda texnik biladigan odam ochiq fayllarni to'g'ridan-to'g'ri yuklab olishi mumkin. Oddiy foydalanuvchi uchun qulf ishlaydi.
- O'quvchi qurilma soatini o'zgartirsa, faqat interfeys qulfi aldanadi. 2-bosqichda qoidalar server vaqtiga tayanadi.
- Obuna yoqilgach, o'quvchi sahifani yangilashi kerak. Yopiq oynada "Tekshirish" tugmasi bor.
- Onlayn to'lov (Click/Payme) keyinroq qo'shilishi mumkin. Buning uchun server (Firebase Functions) kerak: u to'lovni tekshirib,
  `sub` ni o'zi yozadi. Mijozga yozish ruxsati berilmaydi.
