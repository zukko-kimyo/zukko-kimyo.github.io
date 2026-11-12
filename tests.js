/* Zukko Kimyo — test bazasi va generator.
   Har bir mavzu: oson (to'g'ri/noto'g'ri, atama ta'rifi), o'rtacha (atamani topish, to'g'ri/noto'g'ri fikrni tanlash, bo'sh joyni to'ldirish),
   qiyin (qo'lda yozilgan tahliliy savollar + 7-sinf hisoblash generatorlari). Ma'lumotlarda birinchi variant — to'g'ri javob; ko'rsatishda aralashtiriladi. */
(function () {
  const S = (a) => a; // [uz, en, optsUz, optsEn|0]
  /* ---------------- 6-sinf: qiyin savollar ---------------- */
  const H6 = [
    [["Qaysi juftlikda ikkalasi ham modda?", 'Which pair are both substances?', ['Suv va temir', "Stakan va g'isht", 'Stol va suv', 'Mix va qoshiq'], ['Water and iron', 'Glass and brick', 'Table and water', 'Nail and spoon']],
     ["Kulolchilikda loy pishirilganda nima sodir bo'ladi?", 'What happens when clay is fired in pottery?', ["Kimyoviy o'zgarish — mustahkam yangi modda hosil bo'ladi", "Faqat suv muzlaydi", "Loy eriydi va oqib ketadi", "Hech narsa o'zgarmaydi"], ['A chemical change — a strong new material forms', 'Only the water freezes', 'The clay melts and flows away', 'Nothing changes']],
     ["Quyidagilardan qaysi biri kimyoviy hodisa EMAS?", 'Which of these is NOT a chemical change?', ["Shakarning choyda erishi", "Nonning yopilishi", "Temirning zanglashi", "Gugurtning yonishi"], ['Sugar dissolving in tea', 'Baking bread', 'Iron rusting', 'A match burning']]],
    [["Probirkani qizdirayotganda uning og'zini qayerga qaratish kerak?", 'When heating a test tube, where should its mouth point?', ["O'zingizdan va boshqalardan teskari tomonga", "O'zingizga qarab", "Do'stingizga qarab", "Pastga, olovga"], ['Away from yourself and others', 'Towards yourself', 'Towards a friend', 'Down into the flame']],
     ["Suyuqlik hajmini aniq o'lchash uchun qaysi jihoz eng mos?", 'Which equipment measures liquid volume most accurately?', ['Menzurka (o\'lchov silindri)', 'Voronka', 'Chinni hovoncha', 'Spirt lampasi'], ['Measuring cylinder', 'Funnel', 'Porcelain mortar', 'Spirit lamp']],
     ["Tajriba vaqtida kislota qo'lingizga tegsa, birinchi navbatda nima qilasiz?", 'If acid touches your hand during an experiment, what do you do first?', ["Ko'p oqar suv bilan yuvib, o'qituvchiga aytaman", 'Sochiq bilan ishqalayman', "E'tibor bermayman", "Ustiga yog' surtaman"], ['Rinse with plenty of running water and tell the teacher', 'Rub it with a towel', 'Ignore it', 'Put oil on it']]],
    [["Qaysi biri moddaning KIMYOVIY xossasi?", 'Which is a CHEMICAL property?', ["Qog'ozning yonishi", 'Tuzning oq rangi', "Suvning 100 °C da qaynashi", "Shakarning suvda erishi"], ['Paper can burn', 'Salt is white', 'Water boils at 100 °C', 'Sugar dissolves in water']],
     ["Tuz va qum aralashmasini qaysi xossa yordamida ajratish mumkin?", 'Which property lets us separate salt from sand?', ["Tuzning suvda erishi, qumning erimasligi", 'Ikkalasining rangi', 'Ikkalasining hidi', 'Ikkalasining qattiqligi'], ['Salt dissolves in water, sand does not', 'Their colour', 'Their smell', 'Their hardness']],
     ["Nega noma'lum moddani tatib ko'rish mumkin emas?", 'Why must you never taste an unknown substance?', ["U zaharli yoki kuydiruvchi bo'lishi mumkin", "Ta'mi yoqmasligi mumkin", "U qimmat", "Tatib ko'rish uzoq vaqt oladi"], ['It may be poisonous or corrosive', 'You might not like the taste', 'It is expensive', 'Tasting takes too long']]],
    [["To'g'ri ketma-ketlikni toping (kattadan kichikka):", 'Choose the correct order (largest to smallest):', ["Muz bo'lagi → suv molekulasi → kislorod atomi → proton", "Proton → atom → molekula → muz", "Molekula → muz → atom → proton", "Atom → proton → molekula → muz"], ['Ice cube → water molecule → oxygen atom → proton', 'Proton → atom → molecule → ice', 'Molecule → ice → atom → proton', 'Atom → proton → molecule → ice']],
     ["Atom nega elektroneytral?", 'Why is an atom electrically neutral?', ["Protonlar va elektronlar soni teng", "Unda faqat neytronlar bor", "Elektronlar yadroda joylashgan", "Protonlar zaryadsiz"], ['It has equal numbers of protons and electrons', 'It contains only neutrons', 'Its electrons are in the nucleus', 'Protons have no charge']],
     ["Suv molekulasi (H₂O) nechta atomdan iborat?", 'How many atoms are in a water molecule (H₂O)?', ['3', '2', '1', '4'], 0]],
    [["Atomlarida 6 ta proton bo'lgan element qaysi?", 'Which element has 6 protons in its atoms?', ['Uglerod (C)', 'Kislorod (O)', 'Natriy (Na)', 'Vodorod (H)'], ['Carbon (C)', 'Oxygen (O)', 'Sodium (Na)', 'Hydrogen (H)']],
     ["8p+8n va 8p+10n atomlar haqida qaysi fikr to'g'ri?", 'Which is true about atoms 8p+8n and 8p+10n?', ["Ular bitta elementning izotoplari", "Ular ikki xil element", "Ularning elektronlari soni har xil", "Ular ionlar"], ['They are isotopes of one element', 'They are two different elements', 'They have different numbers of electrons', 'They are ions']],
     ["Elementni nima aniqlaydi?", 'What determines which element an atom is?', ['Protonlar soni', 'Neytronlar soni', 'Atom massasi', 'Rangi'], ['Number of protons', 'Number of neutrons', 'Atomic mass', 'Its colour']]],
    [["Natriy atomi 1 ta elektron yo'qotsa, nima hosil bo'ladi?", 'If a sodium atom loses 1 electron, what forms?', ['Na⁺ ioni', 'Na⁻ ioni', 'Na₂ molekulasi', 'Neon atomi'], ['A Na⁺ ion', 'A Na⁻ ion', 'An Na₂ molecule', 'A neon atom']],
     ["Osh tuzi (NaCl) qanday zarrachalardan tuzilgan?", 'What particles make up table salt (NaCl)?', ['Ionlardan', 'Faqat atomlardan', 'Molekulalardan', 'Elektronlardan'], ['Ions', 'Only atoms', 'Molecules', 'Electrons']],
     ["Qaysi biri molekula?", 'Which one is a molecule?', ['CO₂', 'Ne', 'Na⁺', 'Cl⁻'], 0]],
    [["Nega gazni siqish oson, suyuqlikni esa qiyin?", 'Why is a gas easy to compress but a liquid is not?', ["Gaz zarrachalari orasida katta bo'shliq bor", "Gaz zarrachalari kattaroq", "Suyuqlik zarrachalari harakatlanmaydi", "Gaz zarrachalari og'irroq"], ['Gas particles have large spaces between them', 'Gas particles are bigger', 'Liquid particles do not move', 'Gas particles are heavier']],
     ["Qishda deraza oynasining ichki tomonida tomchilar paydo bo'lishi qaysi jarayon?", 'Water drops forming on a cold window in winter is which process?', ['Kondensatsiya', "Bug'lanish", 'Erish', 'Qaynash'], ['Condensation', 'Evaporation', 'Melting', 'Boiling']],
     ["Muz erib suvga aylanganda nima o'zgarmaydi?", 'What does NOT change when ice melts into water?', ['Moddaning tarkibi (H₂O)', 'Agregat holati', 'Shakli', 'Zarrachalar harakati'], ['The substance (H₂O)', 'Its state', 'Its shape', 'Particle movement']]],
    [["Muz erishi davomida termometr nega 0 °C ni ko'rsatib turadi?", 'Why does the thermometer stay at 0 °C while ice melts?', ["Issiqlik holatni o'zgartirishga sarflanadi", "Olov o'chib qoladi", "Termometr buziladi", "Muz issiqlikni yutmaydi"], ['The heat is used to change the state', 'The flame goes out', 'The thermometer breaks', 'Ice does not absorb heat']],
     ["Etil spirti 78 °C, suv 100 °C da qaynaydi. 90 °C da qaysi biri qaynaydi?", 'Ethanol boils at 78 °C, water at 100 °C. Which boils at 90 °C?', ['Faqat spirt', 'Faqat suv', 'Ikkalasi ham', 'Hech biri'], ['Only ethanol', 'Only water', 'Both', 'Neither']],
     ["Tibbiy asboblarni nega qaynatib sterillash mumkin?", 'Why can medical tools be sterilised by boiling?', ["100 °C da ko'plab mikroblar nobud bo'ladi", 'Qaynoq suv asbobni eritadi', 'Suv bug\'i asbobni bo\'yaydi', 'Qaynatish asbobni yengillashtiradi'], ['Many germs die at 100 °C', 'Boiling water dissolves the tool', 'Steam paints the tool', 'Boiling makes the tool lighter']]],
    [["Qaysi biri bir jinsli aralashma (eritma)?", 'Which is a homogeneous mixture (solution)?', ['Shakarli choy', 'Qum va suv', 'Tuproq', 'Yog\' va suv'], ['Sweet tea', 'Sand and water', 'Soil', 'Oil and water']],
     ["Fiziologik eritmada osh tuzi necha foiz?", 'What percentage of salt is in saline solution?', ['0,9%', '9%', '50%', '0,09%'], ['0.9%', '9%', '50%', '0.09%']],
     ["Distillangan suv nega sof modda hisoblanadi?", 'Why is distilled water a pure substance?', ["Unda faqat H₂O molekulalari bor", "U tiniq", "U sovuq", "U ichimlik suvi"], ['It contains only H₂O molecules', 'It is clear', 'It is cold', 'It is drinking water']]],
    [["Tuzli suvdan toza suv olish uchun qaysi usul kerak?", 'Which method gives pure water from salt water?', ['Distillash', 'Filtrlash', 'Magnit', 'Tindirish'], ['Distillation', 'Filtration', 'A magnet', 'Settling']],
     ["Dializ apparati inson organizmidagi qaysi a'zo vazifasini bajaradi?", 'A dialysis machine does the job of which organ?', ['Buyrak', 'Yurak', "O'pka", 'Jigar'], ['Kidney', 'Heart', 'Lungs', 'Liver']],
     ["Filtrlashda nega tuz filtr qog'ozida qolmaydi?", 'In filtration, why does salt not stay on the filter paper?', ["Tuz suvda erigan — zarrachalari juda mayda", "Tuz og'ir", "Filtr qog'ozi tuzni yutadi", "Tuz bug'lanadi"], ['The salt is dissolved — its particles are tiny', 'Salt is heavy', 'The paper absorbs it', 'Salt evaporates']]],
    [["Qaysi kuzatish kimyoviy reaksiya bo'lganini aniq tasdiqlaydi?", 'Which observation clearly shows a chemical reaction?', ["Ikki eritma aralashganda cho'kma hosil bo'ldi", "Muz erib ketdi", "Shisha sindi", "Suv qaynab ketdi"], ['A precipitate formed when two solutions mixed', 'Ice melted', 'Glass broke', 'Water boiled']],
     ["CH₃COOH + NaHCO₃ reaksiyasida ajralgan gaz qaysi?", 'What gas is released in CH₃COOH + NaHCO₃?', ['CO₂', 'O₂', 'H₂', 'N₂'], 0],
     ["Kimyoviy tenglamada strelkadan chapda nima yoziladi?", 'What is written to the left of the arrow in an equation?', ['Reagentlar', 'Mahsulotlar', 'Katalizator', 'Harorat'], ['Reactants', 'Products', 'Catalyst', 'Temperature']]],
    [["Qizib ketgan yog' yonib ketsa, qanday o'chirish to'g'ri?", 'If hot cooking oil catches fire, how should it be put out?', ["Qopqoq yoki qalin mato bilan yopib", 'Suv sepib', 'Puflab', 'Ustiga shakar sepib'], ['Cover it with a lid or thick blanket', 'Pour water on it', 'Blow on it', 'Sprinkle sugar on it']],
     ["Qum sepish yong'inni qanday o'chiradi?", 'How does sand put out a fire?', ['Kislorod kirishini to\'sadi', 'Yonuvchi moddani ko\'paytiradi', 'Haroratni oshiradi', 'Yangi kislorod beradi'], ['It blocks oxygen', 'It adds fuel', 'It raises the temperature', 'It supplies oxygen']],
     ["Sham yonganda qaysi moddalar hosil bo'ladi?", 'What substances form when a candle burns?', ["CO₂ va suv bug'i", 'Faqat kislorod', 'Vodorod va azot', 'Faqat parafin'], ['CO₂ and water vapour', 'Only oxygen', 'Hydrogen and nitrogen', 'Only paraffin']]],
    [["Qaysi modda suvda OH⁻ ionlarini hosil qiladi?", 'Which substance forms OH⁻ ions in water?', ['NaOH', 'HCl', 'CH₃COOH', 'NaCl'], 0],
     ["Oshqozon shirasidagi kislota qaysi?", 'Which acid is in stomach juice?', ['Xlorid kislota (HCl)', 'Sirka kislotasi', 'Limon kislotasi', 'Sulfat kislota'], ['Hydrochloric acid (HCl)', 'Acetic acid', 'Citric acid', 'Sulfuric acid']],
     ["Kislota yoki ishqorni aniqlashning XAVFSIZ usuli qaysi?", 'What is the SAFE way to tell an acid from an alkali?', ['Indikator ishlatish', "Tatib ko'rish", "Barmoq bilan ushlab ko'rish", 'Hidlash'], ['Use an indicator', 'Taste it', 'Touch it', 'Sniff it closely']]],
    [["pH = 2 bo'lgan eritma qanday muhitga ega?", 'A solution with pH = 2 is…', ['Kuchli kislotali', 'Neytral', 'Kuchsiz ishqoriy', 'Kuchli ishqoriy'], ['Strongly acidic', 'Neutral', 'Weakly alkaline', 'Strongly alkaline']],
     ["Universal indikator binafsha rangga kirsa, eritma pH qiymati taxminan qancha?", 'If universal indicator turns purple, the pH is about…', ['13', '7', '4', '1'], 0],
     ["Qonning pH qiymati qancha?", 'What is the pH of blood?', ['≈ 7,4', '≈ 2', '≈ 10', '≈ 5'], ['≈ 7.4', '≈ 2', '≈ 10', '≈ 5']]],
    [["Katalizator haqidagi qaysi fikr to'g'ri?", 'Which statement about catalysts is true?', ["Reaksiyani tezlashtiradi va o'zi sarflanmaydi", "Reaksiyani sekinlashtiradi", "Reaksiyada butunlay sarflanadi", "Faqat oziq-ovqatda bo'ladi"], ['It speeds up a reaction and is not used up', 'It slows down a reaction', 'It is completely used up', 'It exists only in food']],
     ["H₂O₂ ga kartoshka qo'shilganda ajralgan gaz qanday aniqlanadi?", 'How is the gas from H₂O₂ + potato identified?', ["Cho'g'langan cho'p alangalanadi", "Ohakli suv loyqalanadi", "«Puf» ovozi chiqadi", "Lakmus qizaradi"], ['A glowing splint relights', 'Limewater turns milky', 'It pops', 'Litmus turns red']],
     ["Qaysi biri ferment ishtirokidagi jarayon?", 'Which process involves enzymes?', ['Ovqat hazm bo\'lishi', "Muzning erishi", "Tuzning erishi", "Suvning bug'lanishi"], ['Digesting food', 'Ice melting', 'Salt dissolving', 'Water evaporating']]],
    [["Yer yuzidagi suvlarning qancha qismi chuchuk suv?", 'What fraction of Earth’s water is fresh water?', ['≈ 2,5%', '≈ 50%', '≈ 75%', '≈ 97%'], ['≈ 2.5%', '≈ 50%', '≈ 75%', '≈ 97%']],
     ["Nega suv yaxshi erituvchi deyiladi?", 'Why is water called a good solvent?', ["Unda ko'plab moddalar eriydi", "U rangsiz", "U 100 °C da qaynaydi", "U og'ir"], ['Many substances dissolve in it', 'It is colourless', 'It boils at 100 °C', 'It is heavy']],
     ["Inson tanasining taxminan qancha qismi suv?", 'About how much of the human body is water?', ['2/3', '1/10', '1/2', '9/10'], 0]],
    [["Iflos suv orqali qaysi kasallik tarqalishi mumkin?", 'Which disease can spread through dirty water?', ['Vabo', 'Uzoqni ko\'ra olmaslik', 'Allergiya', 'Tish og\'rig\'i'], ['Cholera', 'Short-sightedness', 'Allergy', 'Toothache']],
     ["Suv tozalash inshootida oxirgi bosqich qaysi?", 'What is the final stage at a water treatment plant?', ['Zararsizlantirish (xlor, UB nur)', 'Tindirish', 'Ifloslantirish', 'Muzlatish'], ['Disinfection (chlorine, UV)', 'Settling', 'Polluting', 'Freezing']],
     ["Qaysi harakat suvni tejaydi?", 'Which action saves water?', ['Tish yuvayotganda kranni yopish', 'Kranni ochiq qoldirish', 'Mashinani shlang bilan uzoq yuvish', "Chiqindini ariqqa tashlash"], ['Turning off the tap while brushing', 'Leaving the tap running', 'Washing a car with a hose for ages', 'Throwing rubbish in a canal']]],
    [["Havodagi gazlar ulushini to'g'ri ko'rsating:", 'Choose the correct gas shares in air:', ['N₂ 78%, O₂ 21%, boshqalar 1%', 'O₂ 78%, N₂ 21%', 'CO₂ 50%, O₂ 50%', 'N₂ 21%, O₂ 78%'], ['N₂ 78%, O₂ 21%, others 1%', 'O₂ 78%, N₂ 21%', 'CO₂ 50%, O₂ 50%', 'N₂ 21%, O₂ 78%']],
     ["Suvdagi sham stakan bilan yopilsa, suv qancha ko'tariladi?", 'When a candle in water is covered by a glass, how far does the water rise?', ['Taxminan 1/5 qismgacha', "To'liq", 'Umuman ko\'tarilmaydi', 'Yarmigacha'], ['About 1/5', 'All the way', 'Not at all', 'Halfway']],
     ["Havo nega aralashma, birikma emas?", 'Why is air a mixture, not a compound?', ["Gazlar o'z xossalarini saqlaydi va tarkibi o'zgarishi mumkin", "Havo ko'rinmaydi", "Havo yengil", "Havoda faqat bitta gaz bor"], ['Its gases keep their properties and its composition can vary', 'Air is invisible', 'Air is light', 'Air contains only one gas']]],
    [["Fotosintezda o'simlik nimani yutib, nimani ajratadi?", 'In photosynthesis, a plant takes in … and gives out …', ['CO₂ ni yutadi, O₂ ajratadi', 'O₂ ni yutadi, CO₂ ajratadi', 'N₂ ni yutadi, H₂ ajratadi', "Suvni yutadi, tuz ajratadi"], ['Takes in CO₂, gives out O₂', 'Takes in O₂, gives out CO₂', 'Takes in N₂, gives out H₂', 'Takes in water, gives out salt']],
     ["O'rmonlar kesilsa, havoda nima o'zgaradi?", 'If forests are cut down, what changes in the air?', ['CO₂ ko\'payadi, O₂ kamayadi', 'O₂ ko\'payadi', 'Azot yo\'qoladi', "Hech narsa o'zgarmaydi"], ['CO₂ rises and O₂ falls', 'O₂ rises', 'Nitrogen disappears', 'Nothing changes']],
     ["Qaysi jarayon CO₂ hosil qilmaydi?", 'Which process does NOT produce CO₂?', ['Fotosintez', 'Nafas olish', 'Yonish', 'Avtomobil dvigateli'], ['Photosynthesis', 'Respiration', 'Burning', 'A car engine']]],
    [["Mushaklarni tiklash uchun qaysi oziq modda eng muhim?", 'Which nutrient matters most for building muscle?', ['Oqsillar', 'Uglevodlar', "Yog'lar", 'Suv'], ['Proteins', 'Carbohydrates', 'Fats', 'Water']],
     ["Yod tomizilganda qaysi mahsulot ko'k-qora rang beradi?", 'Which food turns blue-black with iodine?', ['Kartoshka', 'Shakar', "O'simlik yog'i", 'Tuz'], ['Potato', 'Sugar', 'Vegetable oil', 'Salt']],
     ["1 g yog' 1 g uglevodga nisbatan qanday energiya beradi?", 'Compared with 1 g of carbohydrate, 1 g of fat gives…', ["Taxminan 2 barobar ko'p", 'Teng', 'Ikki marta kam', 'Umuman bermaydi'], ['About twice as much energy', 'The same', 'Half as much', 'None at all']]],
    [["Temir yetishmasa qanday holat yuzaga keladi?", 'What can iron deficiency cause?', ['Kamqonlik', 'Tish kariyesi', "Ko'zning yaxshi ko'rishi", "Suyaklarning qattiqlashishi"], ['Anaemia', 'Tooth decay', 'Better eyesight', 'Harder bones']],
     ["D vitamini qaysi mineral bilan birga suyakni mustahkamlaydi?", 'Vitamin D works with which mineral to strengthen bones?', ['Kalsiy', 'Natriy', 'Yod', 'Kaliy'], ['Calcium', 'Sodium', 'Iodine', 'Potassium']],
     ["Yodlangan tuz qaysi a'zo uchun foydali?", 'Iodised salt is good for which organ?', ['Qalqonsimon bez', "O'pka", 'Teri', 'Oshqozon'], ['Thyroid gland', 'Lungs', 'Skin', 'Stomach']]],
    [["Kariyes jarayonining to'g'ri ketma-ketligi:", 'Correct sequence of tooth decay:', ["Shakar → bakteriyalar → kislota → emal yemiriladi", "Kislota → shakar → emal → bakteriya", "Emal → shakar → kislota → bakteriya", "Bakteriya → emal → shakar → kislota"], ['Sugar → bacteria → acid → enamel dissolves', 'Acid → sugar → enamel → bacteria', 'Enamel → sugar → acid → bacteria', 'Bacteria → enamel → sugar → acid']],
     ["Tuxum po'chog'i sirkada erishi qaysi gaz ajralishi bilan kuzatiladi?", 'Dissolving eggshell in vinegar releases which gas?', ['CO₂', 'O₂', 'H₂', 'Cl₂'], 0],
     ["Tish emali asosan qaysi element birikmalaridan iborat?", 'Tooth enamel is mainly made of compounds of…', ['Kalsiy', 'Temir', 'Natriy', 'Uglerod'], ['Calcium', 'Iron', 'Sodium', 'Carbon']]],
    [["E300 qo'shimchasi aslida nima?", 'What is the additive E300?', ['C vitamini (askorbin kislota)', "Sun'iy bo'yoq", 'Shakar', 'Tuz'], ['Vitamin C (ascorbic acid)', 'An artificial dye', 'Sugar', 'Salt']],
     ["Konservantning asosiy vazifasi nima?", 'What is the main job of a preservative?', ['Mahsulotni buzilishdan saqlash', 'Rangini berish', "Ta'mini shirin qilish", 'Hajmini oshirish'], ['Stop food spoiling', 'Add colour', 'Make it sweet', 'Increase volume']],
     ["Allergiyasi bor odam qanday ish tutishi kerak?", 'What should a person with an allergy do?', ["Mahsulot yorlig'ini diqqat bilan o'qish", 'Faqat rangiga qarash', 'Narxiga qarash', 'Hech narsa qilmaslik'], ['Read the label carefully', 'Look only at the colour', 'Look at the price', 'Do nothing']]],
    [["Dorining kasallikka ta'sir qiluvchi qismi qanday ataladi?", 'What is the part of a medicine that acts on the illness called?', ['Faol modda', 'Yordamchi modda', "Qadoq", "Yo'riqnoma"], ['Active substance', 'Excipient', 'Packaging', 'Instructions']],
     ["Dorini ikki baravar ko'p ichsa nima bo'ladi?", 'What may happen if you take a double dose?', ["Zaharlanish xavfi ortadi", "Tezroq tuzaladi", "Hech narsa bo'lmaydi", "Dori kuchsizlanadi"], ['The risk of poisoning rises', 'You get well faster', 'Nothing happens', 'The medicine gets weaker']],
     ["Muddati o'tgan dorilarni nima qilish kerak?", 'What should be done with expired medicines?', ["Maxsus yig'ish joyiga topshirish", 'Ichib tugatish', 'Ariqqa tashlash', "Do'stga berish"], ['Take them to a collection point', 'Finish taking them', 'Throw them into a canal', 'Give them to a friend']]],
    [["Antibiotik qaysi kasallikni davolamaydi?", 'Which illness do antibiotics NOT treat?', ['Gripp (virus)', 'Bakterial angina', 'Ichak infeksiyasi (bakterial)', 'Yiringli yara'], ['Flu (a virus)', 'Bacterial tonsillitis', 'Bacterial gut infection', 'An infected wound']],
     ["Qatiq tayyorlashda nima ishtirok etadi?", 'What makes yoghurt?', ['Foydali bakteriyalar', 'Viruslar', 'Antibiotiklar', 'Tuz'], ['Useful bacteria', 'Viruses', 'Antibiotics', 'Salt']],
     ["Penitsillinni kim kashf qilgan?", 'Who discovered penicillin?', ['A. Fleming', 'D. Mendeleyev', 'Ibn Sino', 'J. Dalton'], ['A. Fleming', 'D. Mendeleev', 'Ibn Sina', 'J. Dalton']]],
    [["Oqartirgich va kislotali tozalagichni aralashtirish nega xavfli?", 'Why is mixing bleach with an acidic cleaner dangerous?', ['Zaharli xlor gazi ajraladi', "Rang o'zgaradi", "Hid yo'qoladi", "Aralashma muzlaydi"], ['Toxic chlorine gas is released', 'The colour changes', 'The smell disappears', 'The mixture freezes']],
     ["Kimyoviy moddani qayerda saqlash mumkin emas?", 'Where must chemicals NOT be stored?', ['Ichimlik shishasida', 'Yorliqli idishda', 'Yopiq shkafda', 'Bolalar yeta olmaydigan joyda'], ['In a drinks bottle', 'In a labelled container', 'In a locked cupboard', 'Out of children’s reach']],
     ["Zaharlanish belgisi qaysi?", 'Which is a sign of poisoning?', ["Bosh aylanishi va ko'ngil aynishi", 'Ishtaha ochilishi', 'Kayfiyat ko\'tarilishi', "Ko'z yaxshi ko'rishi"], ['Dizziness and nausea', 'Feeling hungry', 'Feeling happy', 'Seeing better']]],
    [["Na'matak qaysi vitaminga eng boy?", 'Rosehip is richest in which vitamin?', ['C vitamini', 'D vitamini', 'B12 vitamini', 'K vitamini'], ['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Vitamin K']],
     ["Aspirin qaysi o'simlikdagi moddaga asoslangan?", 'Aspirin is based on a substance from which plant?', ["Tol po'stlog'i", 'Yalpiz', 'Kartoshka', 'Bodom'], ['Willow bark', 'Mint', 'Potato', 'Almond']],
     ["\"Tib qonunlari\" asari muallifi kim?", 'Who wrote the "Canon of Medicine"?', ['Ibn Sino', 'Beruniy', 'Al-Xorazmiy', 'Mendeleyev'], ['Ibn Sina', 'Al-Biruni', 'Al-Khwarizmi', 'Mendeleev']]],
    [["Ifloslantiruvchilar organizmga qaysi yo'llar bilan kiradi?", 'How do pollutants enter the body?', ["Nafas, ovqat va teri orqali", 'Faqat teri orqali', 'Faqat ko\'z orqali', 'Kirmaydi'], ['Through breathing, food and skin', 'Only through skin', 'Only through eyes', 'They cannot enter']],
     ["Shaharda havo ifloslanishini kamaytirishning eng samarali yo'li:", 'The most effective way to reduce city air pollution:', ['Jamoat transporti va daraxt ekish', "Ko'proq mashina", 'Chiqindini yoqish', 'Zavodlarni ko\'paytirish'], ['Public transport and planting trees', 'More cars', 'Burning waste', 'More factories']],
     ["Smog nima?", 'What is smog?', ['Tutun va tumanning zararli aralashmasi', 'Toza havo', "Yomg'ir turi", 'Bulut'], ['A harmful mix of smoke and fog', 'Clean air', 'A kind of rain', 'A cloud']]],
    [["3R tamoyili nimani anglatadi?", 'What does the 3R principle mean?', ["Kamaytirish, qayta foydalanish, qayta ishlash", "O'qish, yozish, hisoblash", 'Yig\'ish, yoqish, ko\'mish', "Sotish, sotib olish, tashlash"], ['Reduce, Reuse, Recycle', 'Read, Write, Count', 'Collect, Burn, Bury', 'Sell, Buy, Throw']],
     ["Plastik shisha tabiatda taxminan qancha vaqtda parchalanadi?", 'Roughly how long does a plastic bottle take to break down?', ['Yuzlab yil (≈450 yil)', '1 hafta', '1 yil', '10 kun'], ['Hundreds of years (≈450)', '1 week', '1 year', '10 days']],
     ["Mikroplastik nima uchun xavfli?", 'Why are microplastics dangerous?', ['Suv va oziq-ovqat orqali organizmga tushadi', "Juda katta", "Tez parchalanadi", "Foydali o'g'it"], ['They enter the body through water and food', 'They are huge', 'They break down quickly', 'They are a good fertiliser']]],
    [["Ishlatilgan batareyani qayerga tashlash kerak?", 'Where should a used battery go?', ["Maxsus yig'ish qutisiga", 'Oddiy axlatga', 'Daryoga', 'Olovga'], ['A special collection box', 'Ordinary rubbish', 'A river', 'A fire']],
     ["Batareyalardagi xavfli moddalar qaysilar?", 'Which hazardous substances are in batteries?', ["Og'ir metallar (simob, kadmiy, qo'rg'oshin)", 'Shakar', 'Suv', 'Kislorod'], ['Heavy metals (mercury, cadmium, lead)', 'Sugar', 'Water', 'Oxygen']],
     ["Qayta ishlashning to'g'ri tartibi:", 'Correct recycling path:', ["Saralash → yig'ish → qayta ishlash → yangi mahsulot", "Yoqish → ko'mish → unutish", "Tashlash → yig'ish → yoqish", "Sotib olish → tashlash"], ['Sort → collect → recycle → new product', 'Burn → bury → forget', 'Throw → collect → burn', 'Buy → throw away']]],
    [["Sovun molekulasining yog'ga tortiladigan qismi:", 'The part of a soap molecule attracted to grease is its…', ['Uzun «dumi»', '«Boshi»', 'Ioni', 'Rangi'], ['Long "tail"', '"Head"', 'Ion', 'Colour']],
     ["Murchli suvga sovun tekkizilganda nima bo'ladi?", 'What happens when soap touches peppered water?', ['Murch chetlarga qochadi', 'Murch cho\'kadi', 'Suv qaynaydi', "Murch eriydi"], ['The pepper rushes to the edges', 'The pepper sinks', 'The water boils', 'The pepper dissolves']],
     ["Sovun qanday moddalardan tayyorlanadi?", 'Soap is made from…', ["Yog'lar va ishqor", 'Shakar va tuz', 'Qum va suv', 'Kislota va metall'], ['Fats and an alkali', 'Sugar and salt', 'Sand and water', 'An acid and a metal']]],
    [["Qora siyohning tarkibini qaysi usul bilan aniqlash mumkin?", 'Which method reveals what black ink is made of?', ['Xromatografiya', 'Filtrlash', 'Distillash', 'Magnit'], ['Chromatography', 'Filtration', 'Distillation', 'A magnet']],
     ["Bo'yoqqa rang beruvchi modda:", 'The substance that gives paint its colour:', ['Pigment', 'Erituvchi', 'Katalizator', 'Konservant'], ['Pigment', 'Solvent', 'Catalyst', 'Preservative']],
     ["Qaysi biri tabiiy bo'yoq manbai?", 'Which is a natural dye source?', ["Anor po'chog'i", 'Plastik', 'Neft', 'Benzin'], ['Pomegranate peel', 'Plastic', 'Crude oil', 'Petrol']]],
    [["Tuxum pishishi nega kimyoviy o'zgarish?", 'Why is cooking an egg a chemical change?', ["Oqsil qotib, orqaga qaytmaydi — yangi tuzilish hosil bo'ladi", "Tuxum isiydi", "Po'chog'i yorilmaydi", "Rangi o'zgarmaydi"], ['The protein sets irreversibly — a new structure forms', 'The egg gets warm', 'The shell does not crack', 'Its colour stays the same']],
     ["Xamir nega ko'pchiydi?", 'Why does dough rise?', ['Xamirturush CO₂ gazini ajratadi', 'Un eriydi', 'Suv bug\'lanadi', 'Tuz kengayadi'], ['Yeast releases CO₂ gas', 'The flour dissolves', 'Water evaporates', 'Salt expands']],
     ["Qaysi biri fizik o'zgarish?", 'Which is a physical change?', ["Sariyog'ning erishi", "Non qobig'ining qizarishi", "Tuxumning pishishi", "Go'shtning qovurilishi"], ['Butter melting', 'Bread crust browning', 'An egg cooking', 'Meat frying']]],
    [["Mushaklarda kislorod yetishmasa, qaysi modda to'planadi?", 'Without enough oxygen, which substance builds up in muscles?', ['Sut kislotasi', 'Glyukoza', 'Kalsiy', 'Azot'], ['Lactic acid', 'Glucose', 'Calcium', 'Nitrogen']],
     ["Sportdan keyin suv ichish nega muhim?", 'Why is drinking water after sport important?', ["Ter bilan yo'qotilgan suv va tuzlar tiklanadi", "Mushak og'irlashadi", 'Kislorod kamayadi', 'Energiya yo\'qoladi'], ['It replaces water and salts lost in sweat', 'Muscles get heavier', 'Oxygen falls', 'Energy is lost']],
     ["C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energiya — bu qaysi jarayon?", 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy is…', ['Hujayra nafasi', 'Fotosintez', 'Distillash', 'Neytrallanish'], ['Cellular respiration', 'Photosynthesis', 'Distillation', 'Neutralization']]],
    [["Dori tayyorlaydigan va uni to'g'ri qo'llashni tushuntiradigan mutaxassis:", 'The specialist who prepares medicines and explains their use:', ['Farmatsevt', 'Ekolog', 'Geolog', 'Muhandis'], ['Pharmacist', 'Ecologist', 'Geologist', 'Engineer']],
     ["Kimyogar uchun eng muhim fazilat qaysi?", 'Which quality matters most for a chemist?', ["Kuzatuvchanlik va mas'uliyat", 'Shoshqaloqlik', "E'tiborsizlik", 'Tavakkalchilik'], ['Observation and responsibility', 'Haste', 'Carelessness', 'Risk-taking']],
     ["Qon tahlilini kim o'tkazadi?", 'Who runs blood tests?', ['Laborant', 'Oshpaz', 'Haydovchi', 'Quruvchi'], ['Lab technician', 'Chef', 'Driver', 'Builder']]],
  ];

  /* ---------------- 7-sinf: qiyin savollar ---------------- */
  const H7 = {
    1: [["Qaysi biri kimyoviy o'zgarish?", 'Which is a chemical change?', ['Yog\'ochning yonishi', 'Muzning erishi', 'Qog\'ozning yirtilishi', 'Shakarning erishi'], ['Wood burning', 'Ice melting', 'Paper tearing', 'Sugar dissolving']],
      ["Zarrachalari eng erkin harakatlanadigan holat:", 'The state with the most freely moving particles:', ['Gaz', 'Suyuq', 'Qattiq', 'Hammasida teng'], ['Gas', 'Liquid', 'Solid', 'All equal']],
      ["Qaysi biri modda emas, jism?", 'Which is an object, not a substance?', ['Mix', 'Temir', 'Suv', 'Kislorod'], ['A nail', 'Iron', 'Water', 'Oxygen']]],
    2: [["Davriy jadval qaysi davrda yaratilgan?", 'When was the periodic table created?', ['XIX asr (1869)', 'Qadimgi davr', 'X asr', 'XXI asr'], ['19th century (1869)', 'Ancient times', '10th century', '21st century']],
      ["Zamonaviy kimyoning sohasi EMAS:", 'Which is NOT an area of modern chemistry?', ['Munajjimlik (astrologiya)', 'Dori ishlab chiqarish', 'Suv tozalash', 'Yangi materiallar'], ['Astrology', 'Making medicines', 'Water purification', 'New materials']],
      ["Ilmiy kimyoning asosi nima?", 'What is scientific chemistry based on?', ["Tajriba va o'lchash", 'Afsonalar', 'Taxmin', 'Sehr'], ['Experiment and measurement', 'Myths', 'Guesswork', 'Magic']]],
    3: [["Minerallarning zichligini aniq o'lchagan olim:", 'The scholar who precisely measured mineral densities:', ['Beruniy', 'Ibn Sino', 'Jobir ibn Hayyon', 'Ar-Roziy'], ['Al-Biruni', 'Ibn Sina', 'Jabir ibn Hayyan', 'Al-Razi']],
      ["Ilmiy usulning to'g'ri tartibi:", 'Correct order of the scientific method:', ["Kuzatish → tajriba → o'lchash → yozish → xulosa", "Xulosa → tajriba → kuzatish", "O'lchash → xulosa → kuzatish", "Yozish → xulosa → tajriba"], ['Observe → experiment → measure → record → conclude', 'Conclude → experiment → observe', 'Measure → conclude → observe', 'Record → conclude → experiment']],
      ["Ibn Sino o'simliklardan dori olishda qaysi usuldan foydalangan?", 'Which method did Ibn Sina use to obtain medicines from plants?', ['Distillash', 'Elektroliz', 'Xromatografiya', 'Magnit'], ['Distillation', 'Electrolysis', 'Chromatography', 'A magnet']]],
    4: [["Aniq natija olish uchun nima qilish kerak?", 'What ensures accurate results?', ["Natijalarni darhol daftarga yozish", 'Xotirada saqlash', "Taxmin qilish", "Do'stdan so'rash"], ['Record results in a notebook immediately', 'Keep them in memory', 'Guess', 'Ask a friend']],
      ["Kimyoviy modda ko'zga tushsa:", 'If a chemical gets in your eye:', ["Darhol ko'p suv bilan yuvib, o'qituvchiga xabar berish", 'Ko\'zni ishqalash', 'Kutib turish', 'Ko\'zni yumib ishni davom ettirish'], ['Rinse with lots of water at once and tell the teacher', 'Rub the eye', 'Wait', 'Close the eye and continue']],
      ["Xavfsizlik + aniqlik + tartib = ?", 'Safety + accuracy + order = ?', ['Ishonchli natija', 'Tezkor ish', 'Ko\'p reagent', 'Qiziqarli rang'], ['A reliable result', 'Fast work', 'More reagents', 'Nice colours']]],
    5: [["Moddani maydalash uchun qaysi jihoz ishlatiladi?", 'Which equipment grinds substances?', ['Chinni hovoncha', 'Voronka', 'Menzurka', 'Probirka'], ['Porcelain mortar', 'Funnel', 'Measuring cylinder', 'Test tube']],
      ["Eritmani tomchilab qo'shish uchun:", 'To add a solution drop by drop, use a…', ['Tomizgich (pipetka)', 'Kolba', 'Shtativ', 'Tarozi'], ['Dropper (pipette)', 'Flask', 'Stand', 'Balance']],
      ["Kimyoviy stakan va menzurkaning farqi:", 'Difference between a beaker and a measuring cylinder:', ["Menzurka hajmni aniqroq o'lchaydi", "Stakan aniqroq o'lchaydi", 'Farqi yo\'q', 'Menzurkada qizdiriladi'], ['A cylinder measures volume more precisely', 'A beaker is more precise', 'No difference', 'Cylinders are for heating']]],
    6: [["150 mL suv o'lchash uchun eng mos jihoz:", 'Best equipment to measure 150 mL of water:', ['Menzurka', 'Tarozi', 'Termometr', 'Probirka ushlagich'], ['Measuring cylinder', 'Balance', 'Thermometer', 'Test tube holder']],
      ["Meniskni yuqoridan o'qisak natija qanday bo'ladi?", 'Reading a meniscus from above gives a value that is…', ['Haqiqiydan katta', 'Haqiqiydan kichik', 'Aniq', 'Nolga teng'], ['Too high', 'Too low', 'Exact', 'Zero']],
      ["Bo'sh stakan 48,20 g. Tuz solingach tarozi 53,20 g ko'rsatdi. Tuz massasi?", 'An empty beaker is 48.20 g; with salt it shows 53.20 g. Mass of salt?', ['5,00 g', '53,20 g', '48,20 g', '101,40 g'], ['5.00 g', '53.20 g', '48.20 g', '101.40 g']]],
    7: [["Qaysi biri ko'p jinsli aralashma?", 'Which is a heterogeneous mixture?', ['Qum + suv', 'Havo', 'Tuzli suv', 'Shakarli suv'], ['Sand + water', 'Air', 'Salt water', 'Sugar water']],
      ["Tuzli suvda erituvchi qaysi?", 'In salt water, the solvent is…', ['Suv', 'Tuz', 'Ikkalasi', 'Havo'], ['Water', 'Salt', 'Both', 'Air']],
      ["Aralashmaning sof moddadan asosiy farqi:", 'Main difference between a mixture and a pure substance:', ["Aralashma tarkibi o'zgaruvchan", "Aralashma har doim tiniq", "Sof modda har doim suyuq", "Farqi yo'q"], ['A mixture’s composition can vary', 'Mixtures are always clear', 'Pure substances are always liquid', 'No difference']]],
    8: [["Loyqa suvdan tiniq suyuqlikni ehtiyotkorlik bilan quyib olish:", 'Carefully pouring clear liquid off a sediment is…', ['Dekantatsiya', 'Distillash', 'Xromatografiya', 'Bug\'latish'], ['Decantation', 'Distillation', 'Chromatography', 'Evaporation']],
      ["Temir kukuni va oltingugurt aralashmasini ajratish:", 'Separating iron filings from sulfur:', ['Magnit bilan', 'Filtrlash bilan', 'Distillash bilan', 'Qaynatish bilan'], ['With a magnet', 'By filtration', 'By distillation', 'By boiling']],
      ["Tuz eritmasidan tuz olish usuli:", 'How to obtain salt from salt solution:', ["Bug'latish", 'Filtrlash', 'Magnit', 'Dekantatsiya'], ['Evaporation', 'Filtration', 'A magnet', 'Decantation']]],
    9: [["Qaysi belgi fizik o'zgarishga xos?", 'Which sign belongs to a physical change?', ["Faqat holat yoki shakl o'zgaradi", "Cho'kma hosil bo'ladi", 'Gaz ajraladi', 'Yangi hid paydo bo\'ladi'], ['Only state or shape changes', 'A precipitate forms', 'Gas is released', 'A new smell appears']],
      ["Temirning zanglashi qaysi o'zgarish?", 'Rusting of iron is a…', ["Kimyoviy o'zgarish", "Fizik o'zgarish", 'Agregat holat o\'zgarishi', 'Erish'], ['Chemical change', 'Physical change', 'Change of state', 'Dissolving']],
      ["Sut achib qatiqqa aylanishi:", 'Milk turning into yoghurt is…', ["Kimyoviy o'zgarish", "Fizik o'zgarish", 'Aralashma hosil bo\'lishi', 'Bug\'lanish'], ['A chemical change', 'A physical change', 'Forming a mixture', 'Evaporation']]],
    10: [["Elektronni kashf etgan olim:", 'Who discovered the electron?', ['J. Tomson', 'E. Rezerford', 'N. Bor', 'J. Dalton'], ['J. Thomson', 'E. Rutherford', 'N. Bohr', 'J. Dalton']],
      ["Oltin varaq tajribasida ba'zi zarrachalarning orqaga qaytishi nimani isbotladi?", 'What did some particles bouncing back from gold foil prove?', ["Atom markazida kichik, zich, musbat yadro bor", "Atom bo'linmas", "Elektronlar musbat", "Atom butunlay to'la"], ['The atom has a tiny, dense, positive nucleus', 'The atom cannot be divided', 'Electrons are positive', 'The atom is completely solid']],
      ["Elektronlar aniq energiya qavatlarida harakatlanadi, degan olim:", 'Who proposed that electrons move in definite energy levels?', ['N. Bor', 'Demokrit', 'J. Tomson', 'J. Dalton'], ['N. Bohr', 'Democritus', 'J. Thomson', 'J. Dalton']]],
    11: [["Zamonaviy modelda elektron qanday tasvirlanadi?", 'How does the modern model describe electrons?', ["Ehtimollik buluti sifatida", 'Aniq orbitadagi sharcha', 'Yadro ichidagi zarracha', 'Mayizli pirog'], ['As a probability cloud', 'A ball in a fixed orbit', 'A particle inside the nucleus', 'A plum pudding']],
      ["Atom massasining deyarli hammasi qayerda?", 'Where is nearly all of an atom’s mass?', ['Yadroda', 'Elektron bulutida', "Bo'shliqda", 'Teng taqsimlangan'], ['In the nucleus', 'In the electron cloud', 'In empty space', 'Evenly spread']],
      ["Musbat zaryadni atomning qaysi zarrachasi tashiydi?", 'Which particle carries positive charge?', ['Proton', 'Neytron', 'Elektron', 'Foton'], ['Proton', 'Neutron', 'Electron', 'Photon']]],
    12: [["Proton va neytronning umumiy nomi:", 'Protons and neutrons together are called…', ['Nuklonlar', 'Elektronlar', 'Ionlar', 'Izotoplar'], ['Nucleons', 'Electrons', 'Ions', 'Isotopes']],
      ["Yadro atomdan taxminan necha marta kichik?", 'About how many times smaller is the nucleus than the atom?', ['100 000', '10', '100', '2'], 0],
      ["Yadro zaryadi nimaga teng?", 'The nuclear charge equals…', ['Protonlar soniga', 'Neytronlar soniga', 'Massa soniga', 'Elektronlar va neytronlar yig\'indisiga'], ['The number of protons', 'The number of neutrons', 'The mass number', 'Electrons + neutrons']]],
    13: [["Xlor (Cl, Z=17) elektronlarining qavatlar bo'yicha taqsimoti:", 'Electron arrangement of chlorine (Cl, Z = 17):', ['2, 8, 7', '2, 7, 8', '8, 8, 1', '2, 8, 8'], 0],
      ["2, 8, 1 taqsimoti qaysi elementga tegishli?", 'Which element has the arrangement 2, 8, 1?', ['Natriy (Na)', 'Neon (Ne)', 'Magniy (Mg)', 'Litiy (Li)'], ['Sodium (Na)', 'Neon (Ne)', 'Magnesium (Mg)', 'Lithium (Li)']],
      ["Elementning kimyoviy xossalarini nima belgilaydi?", 'What determines an element’s chemical properties?', ['Tashqi qavat elektronlari', 'Neytronlar soni', 'Yadro massasi', 'Atom rangi'], ['Outer-shell electrons', 'Number of neutrons', 'Nuclear mass', 'Atom colour']]],
    17: [["Qaysi juftlik bitta elementga tegishli?", 'Which pair belongs to one element?', ['O₂ va O₃', 'H₂O va H₂', 'CO va CO₂', 'NaCl va Na'], 0],
      ["Protonlar soni 7 dan 8 ga o'zgarsa:", 'If the number of protons changes from 7 to 8:', ['Boshqa element hosil bo\'ladi (N → O)', 'Izotop hosil bo\'ladi', 'Ion hosil bo\'ladi', "Hech narsa o'zgarmaydi"], ['A different element forms (N → O)', 'An isotope forms', 'An ion forms', 'Nothing changes']],
      ["Qaysi biri element emas, murakkab modda?", 'Which is a compound, not an element?', ['H₂O', 'O₂', 'Fe', 'N₂'], 0]],
    18: [["Kumushning belgisi:", 'The symbol for silver is…', ['Ag', 'Si', 'S', 'Au'], 0],
      ["K belgisi qaysi lotincha nomdan olingan?", 'The symbol K comes from which Latin name?', ['Kalium', 'Krypton', 'Kobalt', 'Kuprum'], 0],
      ["Element belgilarini taklif qilgan olim:", 'Who proposed the element symbols?', ['J. Berselius', 'D. Mendeleyev', 'J. Dalton', 'A. Lavuazye'], ['J. Berzelius', 'D. Mendeleev', 'J. Dalton', 'A. Lavoisier']]],
    20: [["1 m.a.b. qaysi atom massasining 1/12 qismi?", '1 amu is 1/12 of the mass of which atom?', ['¹²C', '¹H', '¹⁶O', '²³Na'], 0],
      ["Elektron massasi m.a.b. da taxminan:", 'An electron’s mass in amu is about…', ['0,00055', '1', '12', '0,5'], ['0.00055', '1', '12', '0.5']],
      ["Kislorod atomining massasi taxminan:", 'An oxygen atom’s mass is about…', ['16 m.a.b.', '8 m.a.b.', '1 m.a.b.', '32 m.a.b.'], ['16 amu', '8 amu', '1 amu', '32 amu']]],
    21: [["¹²C, ¹³C, ¹⁴C atomlari:", 'Atoms ¹²C, ¹³C, ¹⁴C are…', ['Izotoplar', 'Izobarlar', 'Izotonlar', 'Turli elementlar'], ['Isotopes', 'Isobars', 'Isotones', 'Different elements']],
      ["⁴⁰Ar va ⁴⁰Ca atomlari:", 'Atoms ⁴⁰Ar and ⁴⁰Ca are…', ['Izobarlar', 'Izotoplar', 'Izotonlar', 'Bir xil element'], ['Isobars', 'Isotopes', 'Isotones', 'The same element']],
      ["Izotoplarning kimyoviy xossalari nega deyarli bir xil?", 'Why do isotopes have almost the same chemistry?', ['Elektronlari soni teng', 'Massasi teng', 'Neytronlari teng', 'Rangi bir xil'], ['They have equal numbers of electrons', 'Their masses are equal', 'Their neutrons are equal', 'Same colour']]],
    26: [["Qaysi biri oddiy modda?", 'Which is a simple substance?', ['N₂', 'H₂O', 'CO₂', 'NaCl'], 0],
      ["Metan (CH₄) qanday modda?", 'Methane (CH₄) is a…', ['Murakkab modda', 'Oddiy modda', 'Aralashma', 'Element'], ['Compound', 'Simple substance', 'Mixture', 'Element']],
      ["Moddalarni tasniflash nimaga asoslanadi?", 'Classifying substances is based on…', ['Tarkibidagi elementlar soniga', 'Rangiga', 'Narxiga', 'Hidiga'], ['The number of elements they contain', 'Colour', 'Price', 'Smell']]],
    27: [["Olmos va grafit — bu:", 'Diamond and graphite are…', ['Uglerodning allotropik shakllari', 'Turli elementlar', 'Murakkab moddalar', 'Aralashmalar'], ['Allotropes of carbon', 'Different elements', 'Compounds', 'Mixtures']],
      ["Na (faol metall) + Cl₂ (zaharli gaz) → ?", 'Na (reactive metal) + Cl₂ (toxic gas) → ?', ['Osh tuzi (NaCl)', 'Natriy gazi', 'Xlorli metall', 'Suv'], ['Table salt (NaCl)', 'Sodium gas', 'Chlorine metal', 'Water']],
      ["Qaysi qatorda faqat oddiy moddalar?", 'Which list contains only simple substances?', ['Fe, O₂, S', 'Fe, H₂O, S', 'NaCl, O₂, Cu', 'CO₂, N₂, Al'], 0]],
    35: [["Elektrni yaxshi o'tkazadigan nometall:", 'A non-metal that conducts electricity well:', ['Grafit', 'Oltingugurt', 'Kislorod', 'Fosfor'], ['Graphite', 'Sulfur', 'Oxygen', 'Phosphorus']],
      ["Qaysi qatorda faqat metallar?", 'Which list contains only metals?', ['Na, Fe, Cu', 'O, N, S', 'He, Ne, Ar', 'Na, Cl, O'], 0],
      ["Inert gazlarning asosiy xossasi:", 'Main property of noble gases:', ['Deyarli reaksiyaga kirishmaydi', 'Juda faol', 'Metall', 'Rangli'], ['Almost unreactive', 'Very reactive', 'Metallic', 'Coloured']]],
    36: [["Hali ochilmagan elementlar uchun bo'sh joy qoldirgan olim:", 'Who left gaps for undiscovered elements?', ['D. Mendeleyev', 'J. Nyulends', 'R. Boyl', 'J. Dalton'], ['D. Mendeleev', 'J. Newlands', 'R. Boyle', 'J. Dalton']],
      ["Bugungi davriy jadvalda elementlar nimaga ko'ra joylashgan?", 'Today elements are arranged by…', ['Yadro zaryadi (Z) ortib borishi', 'Atom massasi', 'Kashf etilgan yili', 'Alifbo'], ['Increasing nuclear charge (Z)', 'Atomic mass', 'Year of discovery', 'Alphabet']],
      ["\"Oktavalar qonuni\" muallifi:", 'Author of the "law of octaves":', ['J. Nyulends', 'A. Lavuazye', 'N. Bor', 'E. Rezerford'], ['J. Newlands', 'A. Lavoisier', 'N. Bohr', 'E. Rutherford']]],
    37: [["Galogenlar qaysi guruhda joylashgan?", 'Halogens are in which group?', ['7-guruh', '1-guruh', '2-guruh', '8-guruh'], ['Group 7', 'Group 1', 'Group 2', 'Group 8']],
      ["Kaliy suvga solinsa:", 'If potassium is put in water:', ['Shiddatli reaksiyaga kirishadi', 'Reaksiya bormaydi', 'Eriydi, lekin o\'zgarmaydi', 'Muzlaydi'], ['It reacts violently', 'No reaction', 'It dissolves unchanged', 'It freezes']],
      ["Bir guruh elementlari nega o'xshash?", 'Why are elements in one group similar?', ["Tashqi qavat elektronlari soni bir xil", "Massalari bir xil", "Bir yilda kashf etilgan", "Rangi bir xil"], ['Same number of outer electrons', 'Same mass', 'Discovered the same year', 'Same colour']]],
    38: [["Magniy (Z=12) nechanchi davrda?", 'Magnesium (Z = 12) is in which period?', ['3-davr', '2-davr', '1-davr', '4-davr'], ['Period 3', 'Period 2', 'Period 1', 'Period 4']],
      ["Davr bo'ylab chapdan o'ngga:", 'Across a period, left to right:', ['Nometall xossalari ortadi', 'Metall xossalari ortadi', 'Hech narsa o\'zgarmaydi', 'Qavatlar soni ortadi'], ['Non-metallic character increases', 'Metallic character increases', 'Nothing changes', 'Number of shells increases']],
      ["Oltingugurt (S) 6-guruhda. Uning tashqi qavatida nechta elektron?", 'Sulfur is in group 6. How many outer electrons?', ['6', '16', '2', '8'], 0]],
    39: [["Havodagi CO₂ ulushi taxminan:", 'The share of CO₂ in air is about…', ['0,04%', '21%', '78%', '1%'], ['0.04%', '21%', '78%', '1%']],
      ["Havo tarkibiy qismlarini sanoatda qanday ajratishadi?", 'How does industry separate air into its parts?', ['Suyuq havoni distillash', 'Filtrlash', 'Magnit', 'Elektroliz'], ['Distilling liquid air', 'Filtration', 'A magnet', 'Electrolysis']],
      ["Havodagi qaysi gaz o'simliklar oziqlanishi uchun muhim (birikmalar orqali)?", 'Which gas in air is key to plant nutrition (via compounds)?', ['Azot', 'Argon', 'Neon', 'Geliy'], ['Nitrogen', 'Argon', 'Neon', 'Helium']]],
    40: [["Avtomobil transporti asosan qaysi gazlarni chiqaradi?", 'Which gases do cars mainly emit?', ['CO va NO₂', 'O₂ va N₂', 'He va Ne', 'H₂ va O₂'], 0],
      ["Qaysi tabiiy omil havoni ifloslantiradi?", 'Which natural factor pollutes air?', ["Vulqon otilishi", "Daraxt o'sishi", "Yomg'ir", 'Qor'], ['Volcanic eruption', 'Trees growing', 'Rain', 'Snow']],
      ["Chiqindilarni yoqish qaysi xavfli moddalarni chiqaradi?", 'Burning waste releases which dangerous substances?', ['CO va dioksinlar', 'Kislorod', 'Suv', 'Azot'], ['CO and dioxins', 'Oxygen', 'Water', 'Nitrogen']]],
    41: [["Yer po'stida eng ko'p tarqalgan element:", 'The most abundant element in Earth’s crust:', ['Kislorod', 'Temir', 'Kremniy', 'Alyuminiy'], ['Oxygen', 'Iron', 'Silicon', 'Aluminium']],
      ["Kislorod atomi elektronlarining taqsimoti:", 'Electron arrangement of oxygen:', ['2, 6', '2, 8', '8', '6, 2'], 0],
      ["Kislorodni kim kashf etgan?", 'Who discovered oxygen?', ['K. Sheele va J. Pristli', 'D. Mendeleyev', 'J. Dalton', 'N. Bor'], ['C. Scheele and J. Priestley', 'D. Mendeleev', 'J. Dalton', 'N. Bohr']]],
    42: [["Suyuq kislorodning rangi:", 'Colour of liquid oxygen:', ['Havorang', 'Qizil', 'Rangsiz', 'Qora'], ['Pale blue', 'Red', 'Colourless', 'Black']],
      ["2KMnO₄ → K₂MnO₄ + MnO₂ + O₂ — bu:", '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂ is…', ["Laboratoriyada kislorod olish", 'Vodorod olish', 'Neytrallanish', 'Yonish'], ['Making oxygen in the lab', 'Making hydrogen', 'Neutralization', 'Combustion']],
      ["Kislorod suv ostida yig'ilishi mumkin, chunki:", 'Oxygen can be collected over water because…', ['Suvda kam eriydi', 'Suvdan og\'ir', 'Suv bilan reaksiyaga kirishadi', 'Rangli'], ['It is only slightly soluble in water', 'It is heavier than water', 'It reacts with water', 'It is coloured']]],
    43: [["Raketalarda suyuq kislorodning vazifasi:", 'The role of liquid oxygen in rockets:', ['Oksidlovchi', "Yoqilg'i", 'Sovutgich', "Bo'yoq"], ['Oxidiser', 'Fuel', 'Coolant', 'Paint']],
      ["Metallurgiyada kislorod nima uchun ishlatiladi?", 'Why is oxygen used in metallurgy?', ["Po'lat olish, kesish va payvandlash", 'Bo\'yash', 'Sovutish', 'Yuvish'], ['Steelmaking, cutting and welding', 'Painting', 'Cooling', 'Washing']],
      ["Oqova suvlarni tozalashda kislorod:", 'In waste-water treatment, oxygen…', ['Ifloslantiruvchilarning parchalanishiga yordam beradi', 'Suvni muzlatadi', 'Suvni bo\'yaydi', 'Hech narsa qilmaydi'], ['Helps break down pollutants', 'Freezes the water', 'Colours the water', 'Does nothing']]],
    44: [["Chala yonishda qaysi zaharli gaz hosil bo'ladi?", 'Which toxic gas forms in incomplete combustion?', ['CO', 'CO₂', 'O₂', 'N₂'], 0],
      ["Gugurt boshining alangalanish harorati taxminan:", 'Ignition temperature of a match head is about…', ['200 °C', '20 °C', '1000 °C', '0 °C'], 0],
      ["CH₄ + 2O₂ → CO₂ + 2H₂O — bu qanday yonish?", 'CH₄ + 2O₂ → CO₂ + 2H₂O is…', ["To'liq yonish", 'Chala yonish', 'Parchalanish', 'Neytrallanish'], ['Complete combustion', 'Incomplete combustion', 'Decomposition', 'Neutralization']]],
    45: [["Tabiiy gazga o'tkir hidli modda nima uchun qo'shiladi?", 'Why is a smelly substance added to natural gas?', ['Gaz sizib chiqsa sezish uchun', "Yaxshiroq yonishi uchun", 'Rang berish uchun', 'Arzonlashtirish uchun'], ['To detect leaks', 'To burn better', 'To add colour', 'To make it cheaper']],
      ["Qaysi biri qazilma yoqilg'i emas?", 'Which is NOT a fossil fuel?', ['Biogaz', "Ko'mir", 'Neft', 'Tabiiy gaz'], ['Biogas', 'Coal', 'Oil', 'Natural gas']],
      ["Ko'mir yoqilganda ajralib, kislotali yomg'irga sabab bo'luvchi gaz:", 'The gas from burning coal that causes acid rain:', ['SO₂', 'O₂', 'N₂', 'He'], 0]],
    46: [["Probirkani alanganing qaysi qismida qizdirish kerak?", 'Which part of the flame should heat a test tube?', ["Tashqi (eng issiq) zona", 'Ichki zona', 'Alanga ostida', 'Pilik yonida'], ['The outer (hottest) zone', 'The inner zone', 'Below the flame', 'Next to the wick']],
      ["Oltingugurt kislorodda qanday alanga bilan yonadi?", 'How does sulfur burn in oxygen?', ["Yorqin ko'k-binafsha", 'Qizil', 'Yashil', 'Oq'], ['Bright blue-violet', 'Red', 'Green', 'White']],
      ["2Mg + O₂ → ? (mahsulot)", '2Mg + O₂ → ? (product)', ['2MgO', 'MgO₂', 'Mg₂O', 'MgO + O'], 0]],
    47: [["Ozon qatlami qaysi atmosfera qatlamida?", 'The ozone layer is in which layer?', ['Stratosfera', 'Troposfera', 'Ionosfera', 'Yer yuzasi'], ['Stratosphere', 'Troposphere', 'Ionosphere', 'Ground level']],
      ["Ozon qatlamini yemiruvchi moddalar:", 'Substances that destroy the ozone layer:', ['Freonlar (xlorftoruglerodlar)', 'Kislorod', 'Suv bug\'i', 'Azot'], ['CFCs (freons)', 'Oxygen', 'Water vapour', 'Nitrogen']],
      ["3O₂ → 2O₃ reaksiyasi qachon sodir bo'ladi?", 'When does 3O₂ → 2O₃ happen?', ['Chaqmoq yoki UB nur ta\'sirida', 'Muzlaganda', 'Qorong\'ida', 'Suvda'], ['With lightning or UV light', 'On freezing', 'In the dark', 'In water']]],
    48: [["O'simliklar qachon nafas oladi?", 'When do plants respire?', ['Kecha-kunduz', 'Faqat kechasi', 'Faqat kunduzi', 'Hech qachon'], ['Day and night', 'Only at night', 'Only by day', 'Never']],
      ["Tabiatda kislorod miqdori nega taxminan doimiy?", 'Why does oxygen in nature stay roughly constant?', ["Fotosintez va nafas olish muvozanati", 'Kislorod sarflanmaydi', 'U yangidan paydo bo\'lmaydi', 'Vulqonlar tufayli'], ['Photosynthesis and respiration balance', 'Oxygen is never used', 'It never forms', 'Because of volcanoes']],
      ["Baliqlar qaysi kisloroddan foydalanadi?", 'Fish use which oxygen?', ['Suvda erigan kislorod', 'Suv molekulasidagi kislorod', 'Ozon', 'Havo pufakchalari'], ['Oxygen dissolved in water', 'Oxygen inside H₂O molecules', 'Ozone', 'Air bubbles only']]],
    49: [["Qaysi modda oksid?", 'Which substance is an oxide?', ['Al₂O₃', 'NaOH', 'HCl', 'NaCl'], 0],
      ["NaOH nega oksid emas?", 'Why is NaOH not an oxide?', ['Uch xil elementdan iborat', 'Kislorod yo\'q', 'Suyuq', 'Metall yo\'q'], ['It contains three elements', 'It has no oxygen', 'It is liquid', 'It has no metal']],
      ["Oksidlarning umumiy formulasi:", 'General formula of oxides:', ['EₓOᵧ', 'HₓEᵧ', 'E(OH)ₓ', 'HₓEOᵧ'], 0]],
    50: [["Qaysi oksid amfoter?", 'Which oxide is amphoteric?', ['ZnO', 'CaO', 'SO₂', 'CO'], 0],
      ["SO₃ + H₂O → ?", 'SO₃ + H₂O → ?', ['H₂SO₄', 'H₂SO₃', 'H₂S', 'SO₂ + H₂'], 0],
      ["Neytral (befarq) oksid:", 'A neutral oxide:', ['CO', 'CO₂', 'Na₂O', 'P₂O₅'], 0]],
    51: [["CaO + H₂O → ?", 'CaO + H₂O → ?', ['Ca(OH)₂', 'CaCO₃', 'CaH₂', 'Ca + H₂O₂'], 0],
      ["Shisha tayyorlashda asosiy xomashyo:", 'Main raw material for glass:', ['SiO₂ (qum)', 'Fe₂O₃', 'CO₂', 'CaO'], ['SiO₂ (sand)', 'Fe₂O₃', 'CO₂', 'CaO']],
      ["Zang asosan qaysi oksid?", 'Rust is mainly which oxide?', ['Fe₂O₃', 'Al₂O₃', 'CuO', 'ZnO'], 0]],
    52: [["Deyteriy yadrosida nechta neytron bor?", 'How many neutrons are in a deuterium nucleus?', ['1', '0', '2', '3'], 0],
      ["Radioaktiv vodorod izotopi:", 'The radioactive hydrogen isotope:', ['Tritiy', 'Protiy', 'Deyteriy', 'Geliy'], ['Tritium', 'Protium', 'Deuterium', 'Helium']],
      ["Quyoshda energiya qanday hosil bo'ladi?", 'How is energy produced in the Sun?', ["Vodorod geliyga aylanadi", 'Ko\'mir yonadi', 'Kislorod parchalanadi', 'Temir eriydi'], ['Hydrogen fuses into helium', 'Coal burns', 'Oxygen decomposes', 'Iron melts']]],
    53: [["Laboratoriyada vodorod olish:", 'Making hydrogen in the lab:', ['Zn + 2HCl → ZnCl₂ + H₂', 'Cu + HCl → CuCl₂ + H₂', 'NaCl + H₂O → H₂', 'O₂ + C → H₂'], 0],
      ["Vodorodni yig'ishda probirka qanday tutiladi?", 'How is the tube held when collecting hydrogen?', ["Og'zi pastga qaratib", "Og'zi yuqoriga", 'Yonboshiga', 'Farqi yo\'q'], ['Mouth down', 'Mouth up', 'On its side', 'It does not matter']],
      ["\"Yashil vodorod\" qanday olinadi?", 'How is "green hydrogen" produced?', ['Toza energiya bilan suv elektrolizi', "Ko'mir yoqib", 'Neftdan', 'Gazni yoqib'], ['Electrolysis of water with clean energy', 'Burning coal', 'From oil', 'Burning gas']]],
    54: [["CuO + H₂ → ?", 'CuO + H₂ → ?', ['Cu + H₂O', 'CuH₂ + O', 'Cu₂O + H₂O₂', 'CuOH'], 0],
      ["Vodorod-havo aralashmasi nega xavfli?", 'Why is a hydrogen–air mixture dangerous?', ['Portlovchi', 'Zaharli', 'Radioaktiv', 'Kuydiruvchi kislota'], ['It is explosive', 'It is toxic', 'It is radioactive', 'It is a corrosive acid']],
      ["Vodorod nega ekologik toza yoqilg'i?", 'Why is hydrogen a clean fuel?', ['Yonganda faqat suv hosil bo\'ladi', 'Arzon', 'Rangsiz', 'Og\'ir'], ['Burning it forms only water', 'It is cheap', 'It is colourless', 'It is heavy']]],
    55: [["Ko'k lakmus qog'ozi kislotada qanday rangga kiradi?", 'Blue litmus in acid turns…', ['Qizil', "Ko'k", 'Yashil', 'Sariq'], ['Red', 'Blue', 'Green', 'Yellow']],
      ["H₃PO₄ — qaysi kislota?", 'H₃PO₄ is…', ['Fosfat kislota', 'Sulfat kislota', 'Nitrat kislota', 'Xlorid kislota'], ['Phosphoric acid', 'Sulfuric acid', 'Nitric acid', 'Hydrochloric acid']],
      ["Kislotalarning umumiy belgisi:", 'What all acids have in common:', ['Suvda H⁺ ionlari hosil qiladi', 'OH⁻ ionlari hosil qiladi', 'Metall bo\'ladi', 'Shirin ta\'mli'], ['They form H⁺ ions in water', 'They form OH⁻ ions', 'They are metals', 'They taste sweet']]],
    56: [["Ikki asosli kislorodsiz kislota:", 'A dibasic oxygen-free acid:', ['H₂S', 'H₂SO₄', 'HCl', 'H₃PO₄'], 0],
      ["Kuchsiz kislota:", 'A weak acid:', ['H₂CO₃', 'HCl', 'H₂SO₄', 'HNO₃'], 0],
      ["Kislota asosliligi nimaga bog'liq?", 'Basicity of an acid depends on…', ['Almashinadigan vodorod atomlari soniga', 'Rangiga', 'Massasiga', 'Hidiga'], ['The number of replaceable H atoms', 'Colour', 'Mass', 'Smell']]],
    57: [["P₂O₅ + 3H₂O → ?", 'P₂O₅ + 3H₂O → ?', ['2H₃PO₄', 'H₃PO₃', 'PH₃', 'HPO₃ + H₂'], 0],
      ["Gazli ichimlik ochilganda pufakchalar nega chiqadi?", 'Why does a fizzy drink bubble when opened?', ["H₂CO₃ beqaror, CO₂ va suvga parchalanadi", 'Suv qaynaydi', 'Kislorod ajraladi', 'Shakar eriydi'], ['H₂CO₃ is unstable and breaks into CO₂ and water', 'The water boils', 'Oxygen is released', 'Sugar dissolves']],
      ["HCl ni H₂ va Cl₂ dan olish tenglamasi:", 'Equation for making HCl from H₂ and Cl₂:', ['H₂ + Cl₂ → 2HCl', 'H₂ + Cl₂ → HCl', '2H₂ + Cl₂ → HCl', 'H + Cl → HCl₂'], 0]],
    58: [["Qaysi metall suyultirilgan HCl bilan reaksiyaga KIRISHMAYDI?", 'Which metal does NOT react with dilute HCl?', ['Cu', 'Mg', 'Zn', 'Fe'], 0],
      ["Zn + H₂SO₄ reaksiyasida hosil bo'ladigan tuz:", 'The salt formed from Zn + H₂SO₄:', ['ZnSO₄', 'ZnCl₂', 'ZnS', 'ZnO'], 0],
      ["Fe + 2HCl → ?", 'Fe + 2HCl → ?', ['FeCl₂ + H₂↑', 'FeCl₃ + H₂', 'FeH₂ + Cl₂', 'Fe₂O₃ + H₂'], 0]],
    59: [["Kislotali yomg'irning pH qiymati:", 'The pH of acid rain is…', ['5,6 dan past', '7', '9 dan yuqori', '14'], ['Below 5.6', '7', 'Above 9', '14']],
      ["Kislotali yomg'ir marmar haykallarni nega yemiradi?", 'Why does acid rain damage marble statues?', ['CaCO₃ kislotada eriydi', 'Marmar muzlaydi', 'Marmar yonadi', 'Suv marmarni bo\'yaydi'], ['CaCO₃ dissolves in acid', 'Marble freezes', 'Marble burns', 'Water dyes the marble']],
      ["Kislotali yomg'irni kamaytirish uchun nimani kamaytirish kerak?", 'To reduce acid rain, cut emissions of…', ['SO₂ va NO₂', 'O₂', 'N₂', 'H₂O'], 0]],
    60: [["Suv elektrolizida V(H₂) : V(O₂) nisbati:", 'In water electrolysis, V(H₂) : V(O₂) =', ['2 : 1', '1 : 2', '1 : 1', '8 : 1'], 0],
      ["Tog'da suv 100 °C dan pastroq haroratda qaynashining sababi:", 'Water boils below 100 °C in the mountains because…', ['Atmosfera bosimi past', 'Havo sovuq', 'Suv toza', 'Kislorod ko\'p'], ['Air pressure is lower', 'The air is cold', 'The water is pure', 'There is more oxygen']],
      ["Bug'lanish va kondensatsiyaning farqi:", 'Evaporation vs condensation:', ["Bug'lanish: suyuq → gaz; kondensatsiya: gaz → suyuq", "Ikkalasi bir xil", "Bug'lanish: gaz → suyuq", "Kondensatsiya: qattiq → gaz"], ['Evaporation: liquid → gas; condensation: gas → liquid', 'They are the same', 'Evaporation: gas → liquid', 'Condensation: solid → gas']]],
    61: [["Qishda ko'llar tubigacha muzlamasligining sababi:", 'Why don’t lakes freeze to the bottom in winter?', ["Muz suvdan yengil va yuzada qoladi", "Suv issiq", "Ko'lda tuz bor", "Baliqlar isitadi"], ['Ice is less dense and stays on top', 'The water is warm', 'Lakes contain salt', 'Fish warm the water']],
      ["2Na + 2H₂O → ?", '2Na + 2H₂O → ?', ['2NaOH + H₂↑', 'Na₂O + H₂O', '2NaH + O₂', 'NaO + H₂'], 0],
      ["Suvning zichligi qaysi haroratda eng katta?", 'At what temperature is water densest?', ['4 °C', '0 °C', '100 °C', '20 °C'], 0]],
    62: [["2KOH + H₂SO₄ → ?", '2KOH + H₂SO₄ → ?', ['K₂SO₄ + 2H₂O', 'KSO₄ + H₂O', 'K₂S + H₂O₂', '2KH + SO₄'], 0],
      ["Ortiqcha kislota qo'shilsa, eritma pH qiymati:", 'If excess acid is added, the pH becomes…', ['7 dan kichik', '7', '7 dan katta', '14'], ['Below 7', '7', 'Above 7', '14']],
      ["Neytrallanishning ionli mohiyati:", 'The ionic essence of neutralization:', ['H⁺ + OH⁻ → H₂O', 'Na⁺ + Cl⁻ → NaCl', 'H₂ + O₂ → H₂O', 'H⁺ + Cl⁻ → HCl'], 0]],
    63: [["Suv tozalash bosqichlarining to'g'ri tartibi:", 'Correct order of water treatment:', ['Tindirish → filtrlash → zararsizlantirish', 'Zararsizlantirish → tindirish → filtrlash', 'Filtrlash → ifloslantirish → tindirish', 'Qaynatish → tindirish → ifloslantirish'], ['Settling → filtration → disinfection', 'Disinfection → settling → filtration', 'Filtration → polluting → settling', 'Boiling → settling → polluting']],
      ["Faollashtirilgan ko'mir suvdan nimani tozalaydi?", 'What does activated charcoal remove from water?', ["Erigan bo'yoq va hidlarni", 'Kislorodni', 'Tuzni to\'liq', 'Suv molekulalarini'], ['Dissolved colours and odours', 'Oxygen', 'All the salt', 'Water molecules']],
      ["Suvdagi og'ir metallar qayerdan tushadi?", 'Where do heavy metals in water come from?', ['Sanoat oqovalaridan', "Yomg'irdan", 'Daraxtlardan', 'Baliqlardan'], ['Industrial waste water', 'Rain', 'Trees', 'Fish']]],
    64: [["Vaqtinchalik qattiqlikni qanday yo'qotish mumkin?", 'How is temporary hardness removed?', ['Qaynatish bilan', 'Muzlatish bilan', 'Tuz qo\'shib', 'Aralashtirib'], ['By boiling', 'By freezing', 'By adding salt', 'By stirring']],
      ["Choynakdagi oq quyqa:", 'The white crust in a kettle is…', ['CaCO₃', 'NaCl', 'Fe₂O₃', 'CuSO₄'], 0],
      ["Doimiy qattiqlikni yumshatish uchun qo'shiladi:", 'To soften permanent hardness, add…', ['Soda (Na₂CO₃)', 'Shakar', 'Sirka', 'Osh tuzi'], ['Washing soda (Na₂CO₃)', 'Sugar', 'Vinegar', 'Table salt']]],
    65: [["Inson tanasida massasi bo'yicha eng ko'p element:", 'The most abundant element in the body by mass:', ['Kislorod', 'Uglerod', 'Vodorod', 'Kalsiy'], ['Oxygen', 'Carbon', 'Hydrogen', 'Calcium']],
      ["Qaysi biri mikroelement?", 'Which is a microelement?', ['Yod', 'Kislorod', 'Uglerod', 'Azot'], ['Iodine', 'Oxygen', 'Carbon', 'Nitrogen']],
      ["Gemoglobin tarkibidagi element:", 'The element in haemoglobin:', ['Temir', 'Mis', 'Rux', 'Natriy'], ['Iron', 'Copper', 'Zinc', 'Sodium']]],
    66: [["Oqsillar nimadan tuzilgan?", 'Proteins are built from…', ['Aminokislotalar', 'Glyukoza', "Yog' kislotalari", 'Tuzlar'], ['Amino acids', 'Glucose', 'Fatty acids', 'Salts']],
      ["Yog'lar suvda nega erimaydi?", 'Why don’t fats dissolve in water?', ['Molekulalari qutbsiz', 'Juda og\'ir', 'Rangli', 'Qattiq'], ['Their molecules are non-polar', 'They are too heavy', 'They are coloured', 'They are solid']],
      ["Selluloza qaysi guruhga kiradi?", 'Cellulose belongs to which group?', ['Uglevodlar', 'Oqsillar', "Yog'lar", 'Vitaminlar'], ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins']]],
    67: [["Tish emalini mustahkamlovchi element:", 'The element that strengthens enamel:', ['Ftor', 'Natriy', 'Temir', 'Yod'], ['Fluorine', 'Sodium', 'Iron', 'Iodine']],
      ["Immunitet va yara bitishi uchun muhim mineral:", 'A mineral important for immunity and healing:', ['Rux', 'Kaliy', 'Natriy', 'Kalsiy'], ['Zinc', 'Potassium', 'Sodium', 'Calcium']],
      ["Mineral elementlar organizmga qanday kiradi?", 'How do minerals enter the body?', ['Ovqat va suv bilan', "O'zi hosil bo'ladi", 'Havodan', 'Quyosh nuridan'], ['With food and water', 'The body makes them', 'From the air', 'From sunlight']]],
    68: [["Olma sharbati indikator bilan qanday muhit ko'rsatadi?", 'With an indicator, apple juice shows…', ['Kislotali', 'Ishqoriy', 'Neytral', 'Kuchli ishqoriy'], ['Acidic', 'Alkaline', 'Neutral', 'Strongly alkaline']],
      ["Olmadagi asosiy organik kislota:", 'The main organic acid in apples:', ['Olma kislotasi', 'Xlorid kislota', 'Sulfat kislota', 'Fosfat kislota'], ['Malic acid', 'Hydrochloric acid', 'Sulfuric acid', 'Phosphoric acid']],
      ["Olma pishganda kraxmal nimaga aylanadi?", 'As an apple ripens, starch turns into…', ['Shakarlarga', 'Yog\'ga', 'Oqsilga', 'Suvga'], ['Sugars', 'Fat', 'Protein', 'Water']]],
    69: [["Galit qanday mineral?", 'Halite is…', ['NaCl (tosh tuzi)', 'CaCO₃', 'SiO₂', 'FeS₂'], ['NaCl (rock salt)', 'CaCO₃', 'SiO₂', 'FeS₂']],
      ["Pirit formulasi:", 'Formula of pyrite:', ['FeS₂', 'Fe₂O₃', 'CuFeS₂', 'FeO'], 0],
      ["Yer po'stida kisloroddan keyin eng ko'p element:", 'After oxygen, the most abundant crustal element is…', ['Kremniy', 'Temir', 'Alyuminiy', 'Kalsiy'], ['Silicon', 'Iron', 'Aluminium', 'Calcium']]],
    70: [["Muruntov koni qaysi viloyatda?", 'Muruntau is in which region?', ['Navoiy', 'Toshkent', 'Farg\'ona', 'Xorazm'], ['Navoi', 'Tashkent', 'Fergana', 'Khorezm']],
      ["Olmaliq konlarida asosan nima qazib olinadi?", 'What is mainly mined at Almalyk?', ["Mis, rux, qo'rg'oshin", 'Neft', 'Uran', 'Tuz'], ['Copper, zinc, lead', 'Oil', 'Uranium', 'Salt']],
      ["Kaliy tuzlari koni:", 'A potash deposit:', ['Tyubegatan (Dehqonobod)', 'Angren', 'Muruntov', 'Gazli'], ['Tyubegatan (Dekhkanabad)', 'Angren', 'Muruntau', 'Gazli']]],
    71: [["Rekultivatsiya nima?", 'What is reclamation?', ['Buzilgan yerni qayta tiklash', 'Yangi kon ochish', 'Rudani boyitish', 'Gazni yoqish'], ['Restoring damaged land', 'Opening a new mine', 'Concentrating ore', 'Burning gas']],
      ["Tabiiy resurslarni tejashning eng yaxshi yo'li:", 'The best way to save natural resources:', ['Metallarni qayta ishlash', "Ko'proq qazib olish", 'Chiqindini yoqish', 'Ag\'darmalarni ko\'paytirish'], ['Recycling metals', 'Mining more', 'Burning waste', 'Making more waste heaps']],
      ["Qazib olishning salbiy oqibati EMAS:", 'Which is NOT a negative effect of mining?', ['Ish o\'rinlari yaratilishi', 'Chang chiqishi', 'Suvning ifloslanishi', 'Landshaft buzilishi'], ['Creating jobs', 'Dust', 'Water pollution', 'Landscape damage']]],
    72: [["BRM nechanchi yilgacha erishilishi kerak?", 'The SDGs are due by…', ['2030', '2025', '2050', '2100'], 0],
      ["Toza suv va sanitariya — nechanchi maqsad?", 'Clean water and sanitation is goal number…', ['6', '1', '13', '17'], 0],
      ["Iqlim o'zgarishiga qarshi kurashda kimyoning hissasi:", 'Chemistry’s contribution to climate action:', ["CO₂ chiqindilarini kamaytiruvchi texnologiyalar", "Ko'proq ko'mir yoqish", 'Plastikni ko\'paytirish', 'O\'rmonlarni kesish'], ['Technologies that cut CO₂ emissions', 'Burning more coal', 'More plastic', 'Cutting forests']]],
  };

  const M7 = {
    57: [["Kislotali oksid + suv → ?", 'Acidic oxide + water → ?', ['Kislota', 'Ishqor', 'Tuz', 'Metall'], ['An acid', 'An alkali', 'A salt', 'A metal']],
      ["Qaysi kislota tabiiy manbadan (mevadan) olinadi?", 'Which acid comes from a natural source (fruit)?', ['Limon kislotasi', 'Sulfat kislota', 'Nitrat kislota', 'Xlorid kislota'], ['Citric acid', 'Sulfuric acid', 'Nitric acid', 'Hydrochloric acid']]],
  };
  /* ---------------- hisoblash generatorlari (7-sinf) ---------------- */
  const EL = [['H', 1, 1], ['He', 2, 4], ['Li', 3, 7], ['Be', 4, 9], ['B', 5, 11], ['C', 6, 12], ['N', 7, 14], ['O', 8, 16], ['F', 9, 19], ['Ne', 10, 20], ['Na', 11, 23], ['Mg', 12, 24], ['Al', 13, 27], ['Si', 14, 28], ['P', 15, 31], ['S', 16, 32], ['Cl', 17, 35], ['Ar', 18, 40], ['K', 19, 39], ['Ca', 20, 40]];
  const CMP = [['H₂O', 18], ['CO₂', 44], ['NH₃', 17], ['CH₄', 16], ['SO₂', 64], ['SO₃', 80], ['H₂SO₄', 98], ['HNO₃', 63], ['NaCl', 58.5], ['CaCO₃', 100], ['NaOH', 40], ['HCl', 36.5], ['Ca(OH)₂', 74], ['MgO', 40], ['Al₂O₃', 102], ['Fe₂O₃', 160], ['CuO', 80], ['KOH', 56], ['H₃PO₄', 98], ['NaHCO₃', 84], ['O₂', 32], ['N₂', 28], ['C₆H₁₂O₆', 180], ['CaO', 56], ['P₂O₅', 142]];
  const ATOMS = { 'H₂O': 3, 'CO₂': 3, 'NH₃': 4, 'CH₄': 5, 'SO₂': 3, 'SO₃': 4, 'H₂SO₄': 7, 'HNO₃': 5, 'NaCl': 2, 'CaCO₃': 5, 'NaOH': 3, 'Ca(OH)₂': 5, 'Al₂O₃': 5, 'Fe₂O₃': 5, 'H₃PO₄': 8, 'NaHCO₃': 6, 'C₆H₁₂O₆': 24, 'P₂O₅': 7 };
  const VAL = [['Fe₂O₃', 'Fe', 'III'], ['FeCl₂', 'Fe', 'II'], ['CO₂', 'C', 'IV'], ['CO', 'C', 'II'], ['SO₃', 'S', 'VI'], ['SO₂', 'S', 'IV'], ['H₂S', 'S', 'II'], ['N₂O₅', 'N', 'V'], ['NH₃', 'N', 'III'], ['Al₂O₃', 'Al', 'III'], ['Cu₂O', 'Cu', 'I'], ['CuO', 'Cu', 'II'], ['P₂O₅', 'P', 'V'], ['MnO₂', 'Mn', 'IV'], ['CaCl₂', 'Ca', 'II'], ['FeCl₃', 'Fe', 'III']];
  const EQS = [['2H₂ + O₂ → 2H₂O', 'O₂', 1, 'H₂', 2], ['CH₄ + 2O₂ → CO₂ + 2H₂O', 'O₂', 2, 'H₂O', 2], ['4Al + 3O₂ → 2Al₂O₃', 'O₂', 3, 'Al', 4], ['2Na + Cl₂ → 2NaCl', 'NaCl', 2, 'Na', 2], ['N₂ + 3H₂ → 2NH₃', 'H₂', 3, 'NH₃', 2], ['4P + 5O₂ → 2P₂O₅', 'O₂', 5, 'P', 4], ['2Mg + O₂ → 2MgO', 'Mg', 2, 'MgO', 2], ['Zn + 2HCl → ZnCl₂ + H₂', 'HCl', 2, 'H₂', 1], ['2KMnO₄ → K₂MnO₄ + MnO₂ + O₂', 'KMnO₄', 2, 'O₂', 1], ['C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', 'O₂', 5, 'H₂O', 4]];
  const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const rnd = (n) => Math.floor(Math.random() * n), pick = (a) => a[rnd(a.length)];
  const fmt = (x) => (Math.round(x * 100) / 100).toString();
  const fmtU = (x) => fmt(x).replace('.', ',');
  function nums(correct, cands) { const s = [correct]; for (const c of cands) { if (s.length >= 4) break; if (c > 0 && !s.some((v) => Math.abs(v - c) < 1e-9)) s.push(c); } let k = 1; while (s.length < 4) { const c = correct + k * (k % 2 ? 1 : -1) * Math.max(1, Math.round(correct * 0.2)); if (c > 0 && !s.includes(c)) s.push(c); k++; } return s; }
  const q = (uz, en, opts, unitUz = '', unitEn = '') => ({ q: { uz, en }, o: opts.map((v) => (typeof v === 'object' ? v : { uz: fmtU(v) + unitUz, en: fmt(v) + unitEn })), a: 0, d: 'hard', gen: true });
  const sci = (n) => { const e = Math.floor(Math.log10(n)); const m = n / Math.pow(10, e); const sup = String(e).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join(''); return { uz: fmtU(m) + '·10' + sup, en: fmt(m) + '·10' + sup }; };
  const G = {
    14: () => { const e = pick(EL.slice(2)); return q(`${e[0]} (Z = ${e[1]}) atomi yadrosining zaryadi qancha?`, `What is the nuclear charge of ${e[0]} (Z = ${e[1]})?`, nums(e[1], [e[2], e[2] - e[1], e[1] + 1, e[1] * 2]).map((v) => ({ uz: '+' + v, en: '+' + v }))); },
    15: () => { const e = pick(EL.slice(1)); const n = e[2] - e[1]; return Math.random() < 0.5 ? q(`Atomda ${e[1]} ta proton va ${n} ta neytron bor. Massa soni A = ?`, `An atom has ${e[1]} protons and ${n} neutrons. Mass number A = ?`, nums(e[2], [e[1], n, e[2] + e[1], Math.abs(n - e[1]) || e[2] + 2])) : q(`A = ${e[2]}, Z = ${e[1]} bo'lgan ${e[0]} atomida nechta neytron bor?`, `How many neutrons are in ${e[0]} with A = ${e[2]}, Z = ${e[1]}?`, nums(n, [e[2], e[1], e[2] + e[1], n + 2])); },
    16: () => { const e = pick(EL.slice(2)); if (Math.random() < 0.5) { const ion = pick([['Na', 11, 1], ['Mg', 12, 2], ['Al', 13, 3], ['Ca', 20, 2], ['K', 19, 1]]); const ch = ion[2] === 1 ? '⁺' : ion[2] === 2 ? '²⁺' : '³⁺'; return q(`${ion[0]}${ch} ionida nechta elektron bor? (Z = ${ion[1]})`, `How many electrons are in the ${ion[0]}${ch} ion? (Z = ${ion[1]})`, nums(ion[1] - ion[2], [ion[1], ion[1] + ion[2], ion[1] - ion[2] - 1])); } const p0 = e[1], n0 = e[2] - e[1], A0 = e[2]; const cands = [[p0, n0, p0], [p0, A0, p0], [n0 + 1, p0, n0 + 1], [p0, n0, A0], [A0, n0, p0], [p0 + 1, n0 - 1, p0 + 1], [p0, n0 + 2, p0 - 1]]; const uniq = []; cands.forEach((c) => { const k = c.join(','); if (!uniq.some((u) => u.join(',') === k)) uniq.push(c); }); return q(`${e[2]}${e[0]} (Z = ${e[1]}) atomida p, n, e soni:`, `Numbers of p, n, e in ${e[2]}${e[0]} (Z = ${e[1]}):`, uniq.slice(0, 4).map((a) => ({ uz: `p=${a[0]}, n=${a[1]}, e=${a[2]}`, en: `p=${a[0]}, n=${a[1]}, e=${a[2]}` }))); },
    19: () => { const pairs = [['C', 12, 'H', 1], ['O', 16, 'H', 1], ['Mg', 24, 'C', 12], ['S', 32, 'O', 16], ['Ca', 40, 'He', 4], ['Mg', 24, 'He', 4], ['O', 16, 'He', 4], ['S', 32, 'He', 4], ['Ca', 40, 'Ne', 20]]; const p = pick(pairs); const r = p[1] / p[3]; return q(`Aᵣ(${p[0]}) = ${p[1]}, Aᵣ(${p[2]}) = ${p[3]}. ${p[0]} atomi ${p[2]} atomidan necha marta og'ir?`, `Aᵣ(${p[0]}) = ${p[1]}, Aᵣ(${p[2]}) = ${p[3]}. How many times heavier is ${p[0]} than ${p[2]}?`, nums(r, [r + 1, r * 2, r / 2, p[1] - p[3]])); },
    22: () => { const v = pick(VAL); return q(`${v[0]} birikmasida ${v[1]} ning valentligi:`, `Valency of ${v[1]} in ${v[0]}:`, [v[2]].concat(ROM.filter((r) => r !== v[2]).sort(() => Math.random() - 0.5).slice(0, 3)).map((r) => ({ uz: r, en: r }))); },
    23: () => { const k = pick(Object.keys(ATOMS)); const n = ATOMS[k]; return q(`${k} formulasida jami nechta atom bor?`, `How many atoms in total are in ${k}?`, nums(n, [n - 1, n + 1, n + 2, n * 2])); },
    24: () => { const c = pick(CMP); return q(`Mᵣ(${c[0]}) = ?`, `Mᵣ(${c[0]}) = ?`, nums(c[1], [c[1] + 16, c[1] - 2, c[1] + 2, c[1] * 2, c[1] - 16])); },
    28: () => { const n = pick([0.5, 1, 1.5, 2, 3, 4, 5]); const N = n * 6.02e23; return { q: { uz: `${fmtU(n)} mol moddada nechta zarracha bor?`, en: `How many particles are in ${fmt(n)} mol of a substance?` }, o: (() => { const out = []; [N, N * 2, N / 2, N * 10, 6.02e23 * (n + 2.5), N * 3].forEach((v) => { const s1 = sci(v); if (!out.some((o) => o.uz === s1.uz)) out.push(s1); }); return out.slice(0, 4); })(), a: 0, d: 'hard', gen: true }; },
    29: () => { const n = pick([0.5, 2, 3, 4, 10]); const N = n * 6.02e23; return { q: { uz: `${sci(N).uz} ta molekula necha mol?`, en: `How many moles are ${sci(N).en} molecules?` }, o: nums(n, [n * 2, n / 2, n + 1, n * 6]).map((v) => ({ uz: fmtU(v) + ' mol', en: fmt(v) + ' mol' })), a: 0, d: 'hard', gen: true }; },
    30: () => { const c = pick(CMP.filter((x) => Number.isInteger(x[1]))); const n = pick([0.5, 1, 2, 3, 4]); const m = n * c[1]; return q(`${fmtU(m)} g ${c[0]} necha mol? (M = ${c[1]} g/mol)`, `How many moles are in ${fmt(m)} g of ${c[0]}? (M = ${c[1]} g/mol)`, nums(n, [n * 2, n / 2, n + 1, m]), ' mol', ' mol'); },
    33: () => { const e = pick(EQS); const which = Math.random() < 0.5; const sp = which ? e[1] : e[3], val = which ? e[2] : e[4]; const shown = e[0].replace(/(^|\s)(\d)(?=[A-Z])/g, '$1□'); return q(`Tenglamada ${sp} oldidagi koeffitsiyent: ${shown}`, `Coefficient of ${sp} in: ${shown}`, nums(val, [val + 1, val - 1, val + 2, 1, 2, 3])); },
  };
  G[25] = G[24]; G[32] = () => (Math.random() < 0.5 ? G[23]() : G[24]()); G[31] = G[22]; G[34] = G[33];

  /* ---------------- savol yig'uvchi ---------------- */
  const B = () => window.BOOKS;
  const strip = (s) => String(s).replace(/<[^>]+>/g, '');
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function unitOf(g, n) { const u = (B()[g].units || []).filter((x) => x.from <= n).pop(); return u ? u.from : 1; }
  function neighbours(g, n) { const bk = B()[g]; const u = unitOf(g, n); const same = []; const other = []; bk.lessons.forEach((L, i) => { if (i + 1 === n) return; (unitOf(g, i + 1) === u ? same : other).push(L); }); return shuffle(same).concat(shuffle(other)); }
  const pair = (o) => ({ uz: strip(o.uz), en: strip(o.en) });
  function boldTerms(L) { const out = []; (L.pts || []).forEach((p) => { const m = p.uz.match(/<b>(.*?)<\/b>/), e = p.en.match(/<b>(.*?)<\/b>/); if (m && e) out.push({ p, t: { uz: m[1], en: e[1] } }); }); return out; }

  function pool(g, n) {
    const bk = B()[g]; const L = bk.lessons[n - 1]; if (!L) return { easy: [], medium: [], hard: [] };
    const nb = neighbours(g, n);
    const easy = [], medium = [], hard = [];
    const id = (k) => `${g}-${n}-${k}`;
    // EASY: true/false from lesson statements
    (L.quiz || []).forEach((z, i) => easy.push({ id: id('tf' + i), tf: true, q: pair(z[0]), a: z[1] ? 0 : 1, o: [{ uz: "Ha, to'g'ri", en: 'True' }, { uz: "Yo'q, noto'g'ri", en: 'False' }], d: 'easy', e: z[2] ? pair(z[2]) : null, fixed: true }));
    // EASY: term -> definition
    const otherDefs = nb.flatMap((x) => (x.terms || []).map((t) => pair(t[1])));
    (L.terms || []).forEach((t, i) => { const ds = otherDefs.filter((d) => d.uz !== strip(t[1].uz)).slice(0, 3); if (ds.length === 3) easy.push({ id: id('td' + i), q: { uz: `«${strip(t[0].uz)}» — bu…`, en: `"${strip(t[0].en)}" means…` }, o: [pair(t[1])].concat(ds), a: 0, d: 'easy' }); });
    // MEDIUM: definition -> term
    const otherTerms = nb.flatMap((x) => (x.terms || []).map((t) => pair(t[0])));
    (L.terms || []).forEach((t, i) => { const ts = otherTerms.filter((d) => d.uz !== strip(t[0].uz)); const uniq = []; ts.forEach((x) => { if (!uniq.some((u) => u.uz === x.uz)) uniq.push(x); }); if (uniq.length >= 3) medium.push({ id: id('dt' + i), q: { uz: `Ta'rifga mos atamani toping: «${strip(t[1].uz)}»`, en: `Which term matches: "${strip(t[1].en)}"?` }, o: [pair(t[0])].concat(uniq.slice(0, 3)), a: 0, d: 'medium' }); });
    // MEDIUM: which statement is correct / incorrect
    const trues = (L.quiz || []).filter((z) => z[1]).map((z) => pair(z[0]));
    const falses = (L.quiz || []).filter((z) => !z[1]).map((z) => pair(z[0]));
    const nbTrue = nb.slice(0, 6).flatMap((x) => (x.quiz || []).filter((z) => z[1]).map((z) => pair(z[0])));
    const nbFalse = nb.slice(0, 6).flatMap((x) => (x.quiz || []).filter((z) => !z[1]).map((z) => pair(z[0])));
    trues.slice(0, 2).forEach((tr, i) => { const fs = falses.concat(nbFalse).slice(0, 3); if (fs.length === 3) medium.push({ id: id('wc' + i), q: { uz: "Qaysi fikr TO'G'RI?", en: 'Which statement is TRUE?' }, o: [tr].concat(fs), a: 0, d: 'medium' }); });
    falses.slice(0, 1).forEach((fa, i) => { const ts = trues.concat(nbTrue).slice(0, 3); if (ts.length === 3) medium.push({ id: id('wf' + i), q: { uz: "Qaysi fikr NOTO'G'RI?", en: 'Which statement is FALSE?' }, o: [fa].concat(ts), a: 0, d: 'medium' }); });
    // MEDIUM: cloze from key ideas
    const bt = boldTerms(L); const nbBold = nb.slice(0, 8).flatMap(boldTerms).map((x) => x.t);
    bt.forEach((b, i) => { const dist = bt.filter((x) => x !== b).map((x) => x.t).concat(nbBold).filter((x, k, arr) => x.uz !== b.t.uz && arr.findIndex((y) => y.uz === x.uz) === k).slice(0, 3); if (dist.length === 3) medium.push({ id: id('cz' + i), q: { uz: "Bo'sh joyni to'ldiring: " + strip(b.p.uz.replace(/<b>.*?<\/b>/, '_____')), en: 'Fill in the blank: ' + strip(b.p.en.replace(/<b>.*?<\/b>/, '_____')) }, o: [b.t].concat(dist), a: 0, d: 'medium' }); });
    // HARD: hand-written
    const X = (window.QB_EXT || {})[g] || {}; const GG = g === 'g7' ? G : X.G || {};
    const H = g === 'g6' ? (H6[n - 1] || []) : g === 'g7' ? (H7[n] || []) : ((X.H || {})[n] || []);
    H.forEach((h, i) => { const ou = h[2], oe = h[3] || h[2]; hard.push({ id: id('h' + i), q: { uz: h[0], en: h[1] }, o: ou.map((x, k) => ({ uz: x, en: oe[k] })), a: 0, d: 'hard' }); });
    // HARD: generators (several fresh instances)
    if (GG[n]) { for (let k = 0; k < 6; k++) { const x = GG[n](); x.id = id('g' + k); hard.push(x); } for (let k = 0; k < 3; k++) { const x = GG[n](); x.id = id('gm' + k); x.d = 'medium'; medium.push(x); } }
    (g === 'g7' ? (M7[n] || []) : ((X.M || {})[n] || [])).forEach((h, i) => { const ou = h[2], oe = h[3] || h[2]; medium.push({ id: id('m' + i), q: { uz: h[0], en: h[1] }, o: ou.map((x, k) => ({ uz: x, en: oe[k] })), a: 0, d: 'medium' }); });
    return { easy, medium, hard };
  }

  function prepare(item, g, n) { // shuffle options, keep answer, drop duplicate options
    item = Object.assign({}, item); const seen = new Set(); const keep = [];
    item.o.forEach((o, i) => { if (i === item.a || !seen.has(o.uz)) { if (!seen.has(o.uz) || i === item.a) keep.push(i); seen.add(o.uz); } });
    const ans = item.o[item.a]; const uniqO = []; keep.forEach((i) => { if (i === item.a || item.o[i].uz !== ans.uz) uniqO.push(item.o[i]); });
    item.a = uniqO.indexOf(ans); item.o = uniqO;
    const it = Object.assign({ g, n }, item);
    if (!it.fixed) { const idx = shuffle(it.o.map((_, i) => i)); it.o = idx.map((i) => item.o[i]); it.a = idx.indexOf(item.a); }
    return it;
  }
  const MIX = { easy: 0.3, medium: 0.4, hard: 0.3 };
  function lessonTest(g, n, counts = { easy: 3, medium: 4, hard: 3 }) {
    const P = pool(g, n); const out = [];
    ['easy', 'medium', 'hard'].forEach((d) => { let src = shuffle(P[d]); let need = counts[d]; if (src.length < need) { const fallback = d === 'easy' ? P.medium : d === 'medium' ? P.easy.concat(P.hard) : P.medium; src = src.concat(shuffle(fallback).filter((x) => !out.includes(x))); } src.slice(0, need).forEach((x) => out.push(prepare(x, g, n))); });
    return out;
  }
  function build(sel, total, mode) { // sel: [[g,n],...], mode: 'mix'|'easy'|'medium'|'hard'
    const pools = sel.map(([g, n]) => ({ g, n, P: pool(g, n) }));
    const want = mode === 'mix' ? { easy: Math.round(total * MIX.easy), hard: Math.round(total * MIX.hard) } : { [mode]: total };
    if (mode === 'mix') want.medium = total - want.easy - want.hard;
    const out = []; const used = new Set();
    Object.keys(want).forEach((d) => {
      let k = 0, guard = 0; const order = shuffle(pools);
      while (k < want[d] && guard < want[d] * 20) { const p = order[guard % order.length]; guard++; const cand = shuffle(p.P[d]).find((x) => !used.has(x.id)); if (cand) { used.add(cand.id); out.push(prepare(cand, p.g, p.n)); k++; } }
    });
    return shuffle(out);
  }
  function counts(g, n) { const P = pool(g, n); return { easy: P.easy.length, medium: P.medium.length, hard: P.hard.length + (hasGen(g, n) ? '∞' : '') }; }
  const hasGen = (g, n) => (g === 'g7' ? !!G[n] : !!(((window.QB_EXT || {})[g] || {}).G || {})[n]);
  window.QB = { pool, lessonTest, build, counts, hasGen, util: { q, nums, pick, fmt, fmtU, sci, rnd } };
})();
