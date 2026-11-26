# O'zgarishlar tarixi

Format: har bir birlashtirilgan PR uchun qisqa yozuv. Eng yangisi tepada.

## [Chiqarilmagan]

### Fan o'qituvchilari uchun tuzatishlar (2026-11-26)
- O'qituvchiga faqat biriktirilgan fan(lar) ko'rinadi: «Fanlar» menyusi, fanlar sahifasi, test tahriridagi fan ro'yxati; boshqa fan sahifasiga kirsa o'z faniga qaytariladi.
- O'qituvchi paneli: kimyodan boshqa fan o'qituvchilariga ham o'quvchilar ro'yxati — fan obunachilari (faol / tugagan, qolgan kun), «Barcha o'quvchilar», sinf bo'yicha saralash, o'qituvchi testlari natijalari (soni va o'rtacha %). Bir nechta fan biriktirilgan o'qituvchi fanni almashtiradi.
- Test yuborishda «⭐ <Fan> obunachilari» guruhi.
- «Saytdagi testlardan»: bitta yuklanmagan mavzu butun jarayonni «ruxsat yo'q» bilan to'xtatmaydi; Firestore qoidasi yo'q dars hujjatiga «topilmadi» qaytaradi. **Firebase konsolida qoidalarni yangilash kerak.**

### Word, PDF va matndan test yuklash (2026-11-25)
- «📄 Word, PDF, Excel yoki CSV dan»: .docx o'qiladi (tashqi kutubxonasiz) — «1. Savol / A) … D) …», bir qatordagi javoblar, Word avtomatik raqamlash, jadval ko'rinishidagi testlar, 1/2-variant sarlavhalari, pastki/yuqori indeks (H₂O, x²), formulalar va rasmlar.
- To'g'ri javob: «Javoblar: 1-A, 2-C…» kaliti (variantlar bo'yicha ham), javob oldidagi * yoki +, yoxud qalin / sariq / rangli / tagiga chizilgan javob. Topilmasa savol ⚠️ bilan belgilanadi va to'g'ri javob tanlanmaguncha test saqlanmaydi.
- Matnli PDF (pdf.js bilan); skanerlangan PDF haqida tushuntirish chiqadi.
- «📋 Matndan joylash»: Word'dan nusxa olib to'g'ridan-to'g'ri joylash.
- Ikki ustunli PDF (chapda 1–10, o'ngda 11–20) va yonma-yon variant kalitlari; «1. Б — izoh» ko'rinishidagi kalit.
- Savolda 2–4 ta javob varianti (A–B … A–D): tahrirlashda javob qo'shish / olib tashlash, Excel'da C/D ustunlari bo'sh qolishi mumkin.

### Testga savollarni tez qo'shish (2026-11-25)
- «📚 Saytdagi testlardan»: o'qituvchi fan, sinf, qism va mavzularni belgilaydi, oson/o'rtacha/qiyin sonini tanlaydi — savollar saytdagi test bazasidan (kimyo) va yuklangan dars mazmunidan (boshqa fanlar) avtomatik qo'shiladi; 1 va 2-variantga takrorlanmaydigan alohida savollar.
- «📊 Excel yoki CSV dan»: Savol · A · B · C · D · To'g'ri javob · Daraja · Variant ustunli jadvalni yuklash (.xlsx va .csv; tashqi kutubxonasiz). Xato qatorlar sababi bilan ko'rsatiladi; «⬇️ Excel namunasi» yuklab olinadi.

### O'qituvchi yuboradigan testlar (2026-11-25)
- O'qituvchi: test bazasi (yaratish, tahrirlash, nusxa, o'chirish), 1/2-variant, savol darajasi, A–D javoblar, rasm va formula (`H_2O`, `x^2`), ko'rib chiqish; sinf yoki tanlangan o'quvchilarga yuborish (vaqt, sana oralig'i, urinishlar soni).
- O'quvchi: 🔔 real vaqt bildirishnomasi, ogohlantirish va «Boshlash», server vaqti bo'yicha taymer, har javobda avtomatik saqlash, internetsiz rejimda qurilmada saqlab keyin yuborish, vaqt tugaganda avtomatik yakunlash, har o'quvchiga alohida tartib.
- Baholash o'qituvchi brauzerida (javob kaliti o'quvchiga yuborilmaydi); natija ranglari: 80–100% yashil, 70–79% sariq, 70% dan past qizil.
- Monitoring: kim boshlagan/ishlayapti/yakunlagan, sinf o'rtachasi, eng ko'p xato qilingan savollar, to'g'ri javoblarni ochish, testni erta yopish, qayta ishlashga ruxsat; Excel (CSV) va PDF eksport.
- Firestore qoidalari: muddatdan keyin javob qabul qilinmaydi, natijani faqat testni yuborgan o'qituvchi yozadi. **Firebase konsolida qoidalarni yangilash kerak.**

### Darslik sahifalari tiniqroq (2026-11-25)
- Admin panel PDF sahifalarini 900 o‘rniga 1500 piksel enlikda saqlaydi (hajm chegarasidan oshsa sifat, keyin o‘lcham avtomatik pasayadi). Yangi sifat uchun darsliklarni qayta yuklash kerak.

### Rus tili 3-sinf: 5 qism (2026-11-24)
- «Zukko Russian Pathway 3» darsligi: 5 qism, 250 mavzu — oila va odob, yaxshi so‘zlar, halollik, mehribonlik, mahalla, an’analar, til va bilim, madaniyat, tabiat va sog‘lom hayot, Vatan va kelajak.
- Har mavzuda dars mazmuni (uz/ru/en), darslik sahifalari va test; 1-qismdagi almashgan sahifalar to‘g‘ri juftlandi.

### Ingliz tili 1-sinf: 2–5-qismlar (2026-11-24)
- «Zukko English Pathway 1» darsligining 2–5-qismlari: 200 ta yangi mavzu (51–250) — maktab, tana va salomatlik, hayvonlar, tabiat, ovqat va ranglar, kasblar, jamoa, odob va xavfsizlik.
- Har mavzuda dars mazmuni (uz/ru/en), darslik sahifalari va 3 darajali test.

### Firestore qoidalari: ko‘p qismli darsliklar (2026-11-23)
- Darslik sahifalari va dars mazmuni uchun qism raqami 10 gacha, mavzu raqami 600 gacha ruxsat etiladi (rus tili 5-qismi uchun kerak; darslik sahifalaridagi mavzu raqami cheklovi ham tuzatildi). **Publish kerak**.

### Matematika 1-sinf: o‘zbek tilidagi darslik, 3 qism (2026-11-23)
- Inglizcha 1-qism o‘rniga «Zukko Matematika» o‘zbekcha darsligi: 1–3-qism, 150 mavzu (narsalar va guruhlash, 1–10 sonlar, 10 ichida qo‘shish-ayirish, 11–20 sonlar, o‘nlikdan o‘tib hisoblash, 100 gacha sonlar).
- Har mavzuda dars mazmuni (uz/ru/en), darslik sahifalari va 10 savollik test (3 oson, 4 o‘rtacha, 3 qiyin).

### Rus tili 1-sinf: 5-qism (2026-11-23)
- 50 ta yangi mavzu (201–250): «Моё сообщество и мир» va «Хорошие манеры, безопасность и счастливая жизнь». Har birida dars mazmuni (uz/ru/en), darslik sahifalari va 3 darajali test.
- Fan sahifasida 5-qismga tez o'tish tugmasi, testlar markazida 5-qism guruhi.

### Yangi fanlar: Tasviriy san'at, Jismoniy tarbiya, Tarbiya (2026-11-23)
- 1-sinf darsliklari: «Zukko San'at olami», «Zukko Sport olami», «Zukko Hayot saboqlari» — har birida 40 mavzu, dars mazmuni (uz/ru/en), darslik sahifalari va 3 darajali test.
- Bu fanlar o'zbek tilida: test savollari darslik asosida tuzilgan (har darsda 3 oson, 4 o'rtacha, 3 qiyin); xavfsizlik mavzularida to'g'ri javob — har doim xavfsiz xatti-harakat.
- Obuna, o'qituvchiga biriktirish va Firestore qoidalari yangi fanlarni qo'llaydi (**Publish kerak**).

### Rus tili 1-sinf: 2-, 3- va 4-qismlar (2026-11-23)
- 150 ta yangi mavzu (51–200): «Моя школа», «Моё тело и здоровье», «Животные вокруг меня», «Природа вокруг меня», «Еда, цвета и предметы», «Люди и профессии». Har birida dars mazmuni (uz/ru/en), darslik sahifalari va 3 darajali test.
- Mavzu raqamlari kitobdagidek davom etadi; bepul mavzular faqat 1-qism boshidagilar. Fan sahifasida qismlarga tez o'tish tugmalari, testlar markazida qismlar bo'yicha guruhlash.
- Darslikdagi almashib qolgan sahifalar (58, 94, 95-mavzular) to'g'ri tartibda ko'rsatiladi.

### Fan testlari: kimyodagi kabi 3 darajali savollar va testlar markazi (2026-11-23)
- Matematika, ingliz va rus tili darsining testi endi 10 savol: **3 oson, 4 o'rtacha, 3 qiyin** (avval 5 ta tayyor savol).
- Savollar dars mazmunidan tuziladi: oson — so'zning ma'nosi, rasmga mos so'z; o'rtacha — ma'nosiga mos so'z, gap tarjimasi, darsdagi tayyor savollar; qiyin — 🔊 tinglab so'z yoki gapni topish, gapni to'ldirish. Variantlar har safar aralashadi.
- Har fanga **testlar markazi** (`#s/<fan>/<sinf>/test`): mavzularni tanlash, savollar soni (10/20/30/50), qiyinligi (aralash 3:4:3, oson, o'rtacha, qiyin), mashq yoki imtihon rejimi. Obunasiz faqat bepul mavzular tanlanadi.
- Fan sahifasida «✅ Testlar markazi» tugmasi; boshqa fan ochilganda menyudagi «Testlar» shu fanning testlar markaziga olib boradi, kimyo bo'limlari yashiriladi.
- Natija foizda saqlanadi; 70% va undan yuqori — ⭐ (eski natijalar foizga aylantiriladi).

### Fan tanlash oynasi (2026-11-18, ADR-0008 4-bosqich)
- Kirgandan keyin «Qaysi fanni o'rganamiz?» oynasi: fanni tanlab, «Davom etish» bilan tasdiqlanadi. Bosh sahifa (logotip) tanlangan fanga olib boradi, sarlavhada shu fan nomi.
- Menyu fanga moslashadi: kimyo bo'limlari (sinflar, testlar, 3D laboratoriya, davriy jadval, darslik) faqat kimyoda; boshqa fanlarda telefon menyusida «Fanlar».
- «⇄ Fanni almashtirish»: Fanlar menyusida, fan sahifasida, kimyo bosh sahifasida va «Fanlar» sahifasida. O'qituvchi faqat o'ziga biriktirilgan fanlardan tanlaydi (bitta bo'lsa — avtomatik).
- Kimyo bosh sahifasi endi `#kimyo` manzilida ham. Bosh sahifa va «Fanlar» sahifasida fan nomi ko'rinmaydi, faqat fan tanlanganda.
- Kirish oynasi va sahifa nomi: «Kimyo, 6–8-sinf» o'rniga barcha fanlar.
- Tanlash oynasi jonli: salomlashuv (ism bilan), har fanning raqamlari (darslar, 3D tajribalar, mavzular), suzuvchi belgilar, tanlaganda effekt; harakatni kamaytirish sozlamasida animatsiyalar o'chadi.
- Obuna oynasi xodimga chiqmaydi: admin uchun hammasi ochiq, o'qituvchiga biriktirilmagan fanda «Bu fan sizga biriktirilmagan» izohi.

### 1-sinf fanlari: kimyo darsi kabi dars sahifalari (2026-11-17, ADR-0008 3-bosqich)
- Matematika, ingliz va rus tili 1-sinf mavzularida 3 tab: **Dars mazmuni** (maqsad, asosiy fikrlar, yangi so'zlar kartochkalari va gaplar 🔊 talaffuz bilan, darslikdagi topshiriqlar), **Darslik** (sahifalar), **Test** (5 savol, natija ⭐ bilan).
- Dars mazmuni uch tilda (o'zbek, rus, ingliz) — sayt tiliga qarab ko'rsatiladi.
- Admin paneli → "Darsliklar": har bir darslik uchun dars mazmuni JSON faylini yuklash ustuni. Mazmun Firebase'da himoyalangan (`lessons/…`), ruxsat — darslik sahifalari bilan bir xil. **Publish kerak**.
- Mavzu nomlari darslikning o'zidan tekshirilib tuzatildi (rus tili 6–50, matematika 45–50); ingliz tili 43–44-mavzu sahifalari darslikdagi tartibga moslandi.
- Telefonda admin paneli: yashirin fayl tanlagich sahifani kengaytirib yubormaydi.

### Uch tilli sayt: o'zbek, rus, ingliz (2026-11-17)
- Sarlavhada va kirish oynasida **RU** tugmasi; tanlov saqlanadi (`zk_lang`), `html lang="ru"`.
- Interfeys to'liq ruscha: menyular, bosh sahifa, fanlar, obuna oynasi, "Mening natijalarim" (darajalar, nishonlar), o'quv markazi, sertifikat, davriy jadval (118 element nomi, oilalar), 3D tajriba boshqaruvi, o'qituvchi va admin panellari, davomat, haftalik reyting.
- Kimyo dars mazmuni, darslik sahifalari va tajriba izohlari hozircha o'zbek/ingliz tilida; rus tilida o'zbekchasi ko'rsatiladi (keyingi bosqichda tarjima qilinadi).
- Yangi e2e test: `lang-ru.spec.mjs`.

### Fanlar: darslik sahifalari Firebase'da, himoyalangan (2026-11-17, ADR-0008 2-bosqich)
- Admin paneli → "Darsliklar (fanlar)": administrator darslik PDF'ini tanlaydi, brauzer har bir sahifani rasmga aylantirib (pdf.js) Firebase'ga yuklaydi (`content/<fan>-<sinf>-<qism>-<sahifa>`). Noto'g'ri fayl rad etiladi; jarayon ko'rsatiladi.
- Mavzu sahifasida darslikning 2 sahifasi (kattalashtirish bilan). Bepul mavzular (har sinfda dastlabki N ta) hammaga, qolganlari — shu fan obunasi bilan; yopiq mavzularda 🔒 va obuna oynasi.
- `firestore.rules`: sahifani faqat birma-bir o'qish; ruxsat — admin, shu fan o'qituvchisi, bepul mavzu yoki fan obunasi (server vaqti bo'yicha). Firebase bepul tarifida ishlaydi. **Publish kerak**.

### Zukko Akademiyasi: ko'p fanli platforma asosi (2026-11-17, ADR-0008)
- Fanlar: Kimyo (mavjud), Matematika, Ingliz tili, Rus tili (1–11-sinf). Menyuda "Sinflar" kabi ochiladigan "Fanlar" ro'yxati; har bir fanning o'z oynasi (`#s/<fan>`), unda faqat bitta sinf: o'quvchiga — o'z sinfi (profildagi sinfdan), admin/o'qituvchi sinfni tanlaydi. Bosh sahifada fanlar bo'limi; sarlavhada joriy fan nomi.
- 1-sinf, 1-qism darsliklari mundarijasi (har birida 50 mavzu, o'zbekcha tarjimasi bilan): English Pathway 1, Russian Pathway 1, Mathematics Grade 1. Darslik sahifalari va mashqlar — keyingi bosqichda (Firebase'da, himoyalangan).
- Admin o'qituvchiga fan(lar) biriktiradi; o'qituvchi faqat o'z fani natijalarini ko'radi (kimyo natijalari — faqat kimyo o'qituvchisi va admin).
- Obuna har fanga alohida (`users.subs`); "Obunalar" tabida fan tanlanadi. Eski kimyo obunalari amal qilaveradi.
- `firestore.rules`: `subs`, `subjects` tekshiruvi, `teacherOf()`. **Publish kerak**.

### Yangi nom: Zukko Akademiyasi (2026-11-17)
- Platforma nomi "Zukko Akademiyasi" (foydalanuvchi tanlovi; kelajakda matematika, ingliz tili, rus tili qo'shiladi). Sarlavha, kirish oynasi, sahifa nomi, ilova (manifest), sertifikat va login varaqalarida. Kimyo — joriy fan sifatida sarlavhada qoladi; Zukko Xalqaro Maktabi pastki qismda. Manzil o'zgarmadi.
- Kuchsiz grafikali kompyuterlarda bosh sahifadagi "3D modelni ko'rish" tugmasi to'q fonda yaxshi o'qiladi.

### O'qituvchi faqat kuzatadi (2026-11-17)
- Foydalanuvchi qarori: "oqituvchilarda oquvchi qoshish imkoni bulmasin u faqat nazorat qila olsin xolos".
- O'qituvchi panelida o'qituvchi uchun faqat "Natijalar" (o'quvchi tafsiloti, CSV eksport). O'quvchi qo'shish, arizalar, sinf kodlari, parollarni ko'rish/tiklash, login varaqalari va o'chirish faqat administratorda.
- `firestore.rules`: foydalanuvchi yaratish/o'zgartirish/o'chirish, parollar va sinf kodlari — faqat administrator; o'qituvchi profillar va natijalarni o'qiydi xolos. **Publish kerak**.

### Obuna qoidasi: har sinfda dastlabki mavzular bepul (2026-11-17)
- Foydalanuvchi aniqlashtirdi: har bir sinfda dastlabki mavzular (standart 3 ta; admin "Sayt sozlamalari"da 0–50 oralig'ida o'zgartiradi) — darsi, 3D tajribasi, testi va darslik sahifalari bilan — bepul. Qolganlari obuna bilan. O'qituvchi va admin uchun hammasi ochiq.
- 3D tajriba bepul darsga bog'langan bo'lsa ochiq. Testlar sahifasida yopiq mavzular 🔒 belgisi bilan tanlanmaydi. Darslik bepul mavzular sahifalarigacha ochiq. Ro'yxatlar, bosh sahifa va dars yon panelida yopiq darslarda 🔒 bor.
- `firestore.rules`: `settings/site.freeN` (butun son, 0–50) — **Publish kerak**.

### O'quvchilar obunasi — 1-bosqich (2026-11-17, ADR-0007)
- Pullik qismlar (3D laboratoriya, testlar va imtihon, 7–8-sinf darslari, darslik sahifalari) obunasiz o'quvchiga "obuna bilan ochiladi" oynasi bilan yopiq. Oynada tariflar, narxlar va to'lov yo'riqnomasi bor. Bepul: 6-sinf dars matni, davriy jadval, bosh sahifa, profil.
- Admin: o'qituvchi panelida "Obunalar" tabi (o'quvchiga yoki butun sinfga oylik / choraklik / o'quv yili obunasi, to'xtatish); "Sayt sozlamalari"da narxlar va to'lov ma'lumoti.
- `firestore.rules`: obunani faqat administrator beradi, maydonlar shakli tekshiriladi; **Firebase Console'da Publish qilish kerak**.
- `lib/sub.js` + unit testlar, qoidalar testlari, e2e testlar. Profil sahifasida obuna holati.

### Tezlik: kerak bo'lganda yuklash, darslik rasmlari, sakrashsiz sahifa (2026-11-17)
O'lchov (sekin 4G, 4× sekinlashtirilgan telefon protsessori, bitta o'lchov):
| | Oldin | Keyin |
|---|---|---|
| Bosh sahifa ochilishi (LCP) | 7.3 s | 3.9 s |
| Birinchi kirishda yuklanadigan hajm | 811 KB, 48 so'rov | 253 KB, 27 so'rov |
| Sahifa sakrashi (CLS) | 0.21 | 0.005 |
| Darsning "Darslik sahifalari" tabi (2 sahifa) | ~780 KB | ~180 KB |

- 3D (three.js + tajribalar), testlar bazasi, darslik tarjimasi, davriy jadval va o'qituvchi/admin panellari faqat kerak bo'lganda yuklanadi (`window.ZKLazy`); yuklanayotganda "Yuklanmoqda…", xato bo'lsa "Qayta urinish". Tez internetda 3D bo'sh paytda oldindan tayyorlanadi (trafikni tejash rejimida emas).
- Tajribalar ro'yxati alohida kichik `lab-meta.js` da (`node tools/build-lab-meta.mjs`; eskirsa unit test yiqiladi).
- Darslik rasmlari har bir sahifa alohida fayl (`pages/p/`), o'lchami ko'rsatilgan.
- Kuchsiz/dasturiy grafikali kompyuterlarda bosh sahifa 3D o'zi boshlanmaydi ("3D modelni ko'rish" tugmasi).
- Telefonda kartalarda shisha xiralash o'chirildi (sarlavha va pastki menyuda qoldi) — aylantirish silliqroq.
- Admin panelidagi bo'sh kartalarda "—" o'rniga tushuntirish.

### Ikkinchi tekshiruv tuzatishlari (2026-11-17, 4 ta mustaqil agent: dizayn, qulaylik, kod/xavfsizlik, tezlik)
- Dizayn: ikonkali sarlavhalar ikkinchi qatorda ikonka ostiga tushmaydi; "Mening yutuqlarim"da takror karta olib tashlandi; testlar tugmasi brend rangida, qiyinlik tugmalari telefonda bir tekis; sinf kartalari progressi bir chiziqda; telefonda lab kartalari; tungi rejimdagi eski ko'k/binafsha qoldiqlar; shriftlar bir xil; pastki menyuda "Profil"; davriy jadval planshetda to'liq; testlar ro'yxati va bog'liq darslarda bo'lim ranglari.
- Qulaylik: test sozlamalari qayta chizilganda fokus o'sha tugmada qoladi; xato xabari e'lon qilinadi; foydalanuvchi menyusi `aria-expanded` va Escape; burger Escape; o'qituvchi tablari holati; XP vidjeti nomi; kirish oynasi nomi tilga mos, fokus halqasi aniq; qidiruvdan Tab bilan chiqishda fokus yo'qolmaydi; mayda matnlar kontrasti; 3D vaqt chizig'i va radio tugmalar kattaroq; iOS'da maydon fokusda kattalashmaydi.
- Testlar: progress-sync testi aynan ochilgan darsni kutadi (tez almashganda oraliq sahifa o'tkazib yuborilardi).

### Qulaylik (klaviatura, ekran o'quvchi) va dizayn tozalash (2026-11-17, mustaqil agentlar tekshiruvi)
- Klaviatura: "Asosiy qismga o'tish" havolasi; dars tablari ARIA tablist (strelka fokusni siljitadi, Enter tanlaydi); test variantlari radiogroup, javob natijasi e'lon qilinadi; qidiruv combobox; mobil menyu va sinflar menyusida fokus va Escape.
- Oynalar (kirish, 3D tajriba, darslik sahifasi): fokus ichkarida aylanadi, orqadagi sayt `inert`; sahifa kattalashtirishda "Yopish" tugmasi.
- Sahifa almashganda sarlavha `document.title` ga yoziladi va e'lon qilinadi; dars raqami ekran o'quvchiga "5-dars:" deb o'qiladi.
- 3D tajriba boshqaruvlari nomlangan, vaqt chizig'i strelka bilan boshqariladi, ijro/pauza holati bildiriladi; "kamroq harakat" sozlamasida avtomatik ijro yo'q.
- Kontrast: kulrang matn tokeni to'qlashtirildi, pastki menyu, davriy jadval (tungi rejim) va boshqa joylar 4.5:1 ga yetkazildi.
- Dizayn: sahifa sarlavhalari (sinflar, testlar, lab, jadval, profil, o'qituvchi, admin) Shisha 2.0 uslubida; o'qituvchi va admin panellari binafsha o'rniga brend teal; davriy jadval katakchalarida matn kesilmaydi; profildagi takror bloklar olib tashlandi; footer qisqa sahifalarda pastda; footer, lab qo'llanma va jadval aksentlari yangi palitrada; katta monitorlarda kontent kengligi chegaralandi.

### Xavfsizlik va ma'lumot xavfsizligi tuzatishlari (2026-11-16, mustaqil audit natijasi)
- Firestore qoidalari: o'qituvchi faqat o'quvchi profiliga tegishli parol yozuvini yarata/yangilay oladi; natija hujjati tekshiriladi (faqat ma'lum maydonlar, sonlar — son, chegaralar bilan); o'chirib qo'yilgan foydalanuvchi natija yoza olmaydi. **Firebase Console'da qoidalarni "Publish" qilish kerak.**
- O'qituvchi va admin panelida o'quvchi natijalari songa aylantirilib chiqariladi; CSV eksportida `= + - @` bilan boshlangan katakchalar zararsizlantiriladi.
- Natijalarni sinxronlash: server o'qish xatosi "natija yo'q" deb qabul qilinmaydi, server nusxasi o'qilmaguncha ustidan yozilmaydi; mahalliy va server nusxalari birlashtiriladi; internetsiz chiqishda ogohlantirish va shu foydalanuvchi uchun zaxira (keyingi kirishda yuboriladi).
- Yuklovchi: bitta 3D fayl yuklanmasa ham sayt ochiladi; ilova ishga tushmasa — "Qayta yuklash" kartasi.

### Ko'rinadigan xatolar (2026-11-16)
- Planshetda (761–960px) header ekrandan chiqib ketmaydi.
- Dars tabi almashganda 3D sahna to'xtatiladi (yashirin animatsiya sikli qolmaydi).
- Til almashganda dars sahifasi pastga sakramaydi (faqat yon ro'yxat suriladi).
- Imtihonda taymer "--:--" ko'rsatmaydi; "dars topilmadi" matnida 8-sinf qo'shildi.
- Tez-tez sahifa almashganda View Transition xatolari konsolga chiqmaydi.

### Yangi dizayn "Shisha 2.0" va tungi rejim (2026-11-15, ADR 0006)
- **Tungi rejim**: headerda oy/quyosh tugmasi; tanlov eslab qolinadi (`localStorage zk_theme`), tanlanmagan bo'lsa qurilma sozlamasi (`prefers-color-scheme`) olinadi. Mavzu sahifa chizilishidan oldin qo'yiladi — oq "miltillash" yo'q. Almashganda tugmadan aylana bo'lib yoyiladi (View Transitions).
- `theme.css` — Shisha 2.0 qatlami: suzuvchi shisha header, shaffof bosh blok, yumshoq kartalar, prujinali (spring) harakatlar, dars tablarida bo'lim rangidagi siljiydigan tanlov.
- `theme-dark.css` — barcha och fon/to'q matn qoidalarining tungi muqobili (`tools/dark-mode/` bilan hosil qilingan), aniqlashtirishlar `theme.css` da.
- Bosh sahifada "Davom ettirish" kartasi (oxirgi ochilgan dars, bo'lim rangida).
- Kontrast (WCAG AA): bo'lim rangi ustidagi raqam/matn rangi avtomatik tanlanadi (to'q sariq, yashil — to'q matn); kichik matnli tugmalar biroz to'qroq fonda; kulrang izohlar 4.5:1.
- Telefonda: tajriba kartasi matni siqilib qolmaydi, takroriy tugma yashirildi, header tor ekranga sig'adi.
- Matn shrifti Manrope o'rniga Inter (maktab dizayn tizimi bo'yicha).
- `prefers-reduced-motion` da barcha animatsiyalar o'chadi.
- Login ekranida ham tungi rejim tugmasi (kartaning chap yuqori burchagida).
- Bosh sahifa dizayn maydonidagi variantga to'liq moslandi: statistika + "Bugungi maqsad" (haftalik faollik), shisha sinf kartalari (progress bilan), bento (kichik davriy jadval, 3D laboratoriya, testlar), darslar paneli 6/7/8-sinf almashtirgichi bilan (har bo'limdan 3 dars, bo'lim ranglarida).
- "Mening o'quv markazim" (dashboard) bosh sahifadan "Mening yutuqlarim" sahifasiga ko'chdi; tezkor havolalar, "Imkoniyatlar" va tajribalar ro'yxati bosh sahifadan olindi (ular 3D laboratoriya va bento kartalarida bor).

### 3D laboratoriya: kuchsiz videokartalar uchun yengil rejim (2026-11-13)
- Kuchsiz (o'rnatilgan/mobil/dasturiy) videokartada shisha va suyuqlikning "nur o'tkazish" effekti oddiy shaffoflikka, yumshoq soyalar oddiy soyaga almashadi; `?gfx=hq` / `?gfx=lite` bilan majburlash mumkin.
- Kadrlar sekin bo'lsa chizish o'lchami avtomatik pasayadi (moslashuvchan sifat).
- Shaderlar fonda kompilyatsiya qilinadi (`compileAsync`) — tajriba ochilganda sahifa qotib qolmaydi.
- Juda keng ekranda 3D sahna 1320px gacha.

### Tezlashtirildi (2026-11-13, foydalanuvchi: "sayt sekin ishlayapti")
O'lchov (foydalanuvchining Chrome'i, 1920px): bosh sahifada scroll 8–14 kadr/s, bo'sh turganda 34 kadr/s, sahifa ishga tushishi ~3,5 s.
- `background-attachment:fixed` o'rniga alohida qotirilgan qatlam (`body::before`) — scrollda butun ekran qayta chizilmaydi.
- 3D sahnalar ekranda ko'rinmasa yoki tab yashirin bo'lsa chizilmaydi; bosh sahifadagi bezak atomi ~30 kadr/s va past piksel zichligida; u sahifa ko'ringandan keyin (brauzer bo'shaganda) quriladi.
- Kirishda profil, natijalar va sayt sozlamalari bazadan parallel so'raladi (avval navbat bilan ~10 so'rov).
- Barcha skriptlar boshidan parallel yuklab olinadi (preload); 3D va dars ma'lumotlari login tekshiruvi bilan bir vaqtda tayyorlanadi.

### O'zgartirildi — Zukko brend dizayni (ADR 0005)
- `brand.css`: maktab logotipi rangi (teal #00555a) + yashil + ko'k + oq; sarlavhalar Fraunces (serif), matn Manrope. Sarlavhalar, chiplar, tablar, tugmalar, toastlar, o'qituvchi/admin paneli bitta uslubda.
- `icons.js`: interfeysdagi emojilar bir xil SVG ikonkalarga almashtirildi (tajriba rasmchalari va nishonlar o'zgarmadi).
- Header bitta qatorda (kompyuter va telefon); XP xabarlari sarlavhani yopmaydi; suzuvchi dars navigatsiyasi kompyuterda yashirildi.
- Bosh sahifa: o'zbekcha yorliqlar, yangi o'quvchi uchun "Boshlash uchun 3 qadam", tajriba kartalarida "+N" yorliq, "Molekulyar laboratoriya" telefonda bosganda ochiladi.
- O'qituvchi paneli tablari telefonda ekrandan chiqmaydi.
- Telefonda avatar ("A") va uning menyusi pastki menyuning o'ng chetida; menyu yuqoriga ochiladi.
- Darslik bo'lim ranglari oldingidek qaytdi va dars sahifasida ham ishlatiladi; darslik tuzilishi o'zgarmadi.
- **Yangi rasmiy logotip** (teal belgi + "ZUKKO INTERNATIONAL SCHOOL", vektor SVG): hamma joyda faqat belgi (inglizcha "INTERNATIONAL SCHOOL" yozuvisiz): headerda, login oynasida (ostida "ZUKKO XALQARO MAKTABI"), yuklanish ekranida, footerda oq belgi; favicon, Android/iOS ilova ikonkalari yangilandi (`assets/zukko-logo*.svg`, `zukko-mark*.svg`, `zukko-app-*.png`).
- Davriy jadval kompyuterda bir ekranga sig'adi (to'liq ekran rejimida katakchalar 100px gacha kattalashgan edi); "Molekulyar laboratoriya" kartasi tekis.
- Sahifalar orasida silliq o'tish: View Transitions (eski sahifa so'nadi, yangisi yumshoq paydo bo'ladi; header va pastki menyu joyida); bo'laklab kechikadigan kaskad va sekin "silliq scroll" olib tashlandi; telefonda surishda yo'nalishga mos siljish.
- Header: "Sinflar" tugmasi — bosganda 6-, 7-, 8-sinf pastga ochiladi (klaviatura: ↓ ↑ Esc). Telefonda pastki menyudagi "Sinflar" shu ranglarda.
- Kompyuterda sayt ekranni to'liq egallaydi (1290px cheklov olib tashlandi); keng ekranda kartalar ko'proq ustunga bo'linadi.
- "Liquid glass": shaffof header, telefonda suzuvchi shisha pastki menyu, shisha menyular va xabarlar.
- Telefonda maktab nomi to'liq: "ZUKKO XALQARO / MAKTABI / Kimyo"; "MAKTABI" o'rtada va "ZUKKO XALQARO" bilan bir xil o'lchamda; qidiruv belgisi ikonka bo'ldi.

### Qo'shildi
- Administrator paneli (`#admin`): 10 ta ko'rsatkich, 14 kunlik faollik grafigi, sinflar taqqoslanishi, eng faol o'quvchilar, eng qiyin darslar, sayt e'loni, ro'yxatdan o'tishni yoqish/o'chirish, CSV/JSON eksport (parollarsiz), administrator parolini o'zgartirish. `lib/stats.js` + testlar; `settings/site` uchun Firestore qoidalari va testlari.
- Hamkorlik qoidalari va hujjatlar: `docs/COLLABORATION.md`, `ARCHITECTURE.md`, `TESTING.md`, `SECURITY.md`, `ROADMAP.md`, `docs/adr/` (4 ta qaror).
- Testlar: unit (`node:test`), e2e (Playwright, desktop + mobil), Firestore qoidalari (emulyator); GitHub Actions `Testlar` workflow; PR shabloni.

### Tuzatildi
- PR #2 (administrator paneli) `main` o'rniga oraliq `chore/collaboration-setup` branchiga birlashgan edi — sayt yangilanmadi. PR #3 orqali `main`ga yetkazildi; COLLABORATION.md ga ketma-ket PR'lar qoidasi qo'shildi.
- O'qituvchi paneli: yuklanish paytida bo'lim almashtirilsa ma'lumot ikki marta so'ralar va yozilayotgan forma (masalan, o'quvchilar ro'yxati) o'chib ketardi.

## 2026-11-12 — 1.x (`main`ga to'g'ridan-to'g'ri, hamkorlik tartibidan oldin)
- Firebase login, o'qituvchi paneli, sinf kodi bilan ro'yxatdan o'tish va tasdiqlash.
- 6–8-sinf darslari, testlar, 3D laboratoriya, davriy jadval, XP tizimi, mobil versiya.
