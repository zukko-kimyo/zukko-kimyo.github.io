/* Interaktiv davriy jadval / Interactive periodic table — Zukko Kimyo */
(function () {
  const RAW = `H|Vodorod|Hydrogen|1.008
He|Geliy|Helium|4.0026
Li|Litiy|Lithium|6.94
Be|Berilliy|Beryllium|9.0122
B|Bor|Boron|10.81
C|Uglerod|Carbon|12.011
N|Azot|Nitrogen|14.007
O|Kislorod|Oxygen|15.999
F|Ftor|Fluorine|18.998
Ne|Neon|Neon|20.180
Na|Natriy|Sodium|22.990
Mg|Magniy|Magnesium|24.305
Al|Alyuminiy|Aluminium|26.982
Si|Kremniy|Silicon|28.085
P|Fosfor|Phosphorus|30.974
S|Oltingugurt|Sulfur|32.06
Cl|Xlor|Chlorine|35.45
Ar|Argon|Argon|39.948
K|Kaliy|Potassium|39.098
Ca|Kalsiy|Calcium|40.078
Sc|Skandiy|Scandium|44.956
Ti|Titan|Titanium|47.867
V|Vanadiy|Vanadium|50.942
Cr|Xrom|Chromium|51.996
Mn|Marganes|Manganese|54.938
Fe|Temir|Iron|55.845
Co|Kobalt|Cobalt|58.933
Ni|Nikel|Nickel|58.693
Cu|Mis|Copper|63.546
Zn|Rux|Zinc|65.38
Ga|Galliy|Gallium|69.723
Ge|Germaniy|Germanium|72.630
As|Mishyak|Arsenic|74.922
Se|Selen|Selenium|78.971
Br|Brom|Bromine|79.904
Kr|Kripton|Krypton|83.798
Rb|Rubidiy|Rubidium|85.468
Sr|Stronsiy|Strontium|87.62
Y|Ittriy|Yttrium|88.906
Zr|Sirkoniy|Zirconium|91.224
Nb|Niobiy|Niobium|92.906
Mo|Molibden|Molybdenum|95.95
Tc|Texnetsiy|Technetium|[98]
Ru|Ruteniy|Ruthenium|101.07
Rh|Rodiy|Rhodium|102.91
Pd|Palladiy|Palladium|106.42
Ag|Kumush|Silver|107.87
Cd|Kadmiy|Cadmium|112.41
In|Indiy|Indium|114.82
Sn|Qalay|Tin|118.71
Sb|Surma|Antimony|121.76
Te|Tellur|Tellurium|127.60
I|Yod|Iodine|126.90
Xe|Ksenon|Xenon|131.29
Cs|Seziy|Caesium|132.91
Ba|Bariy|Barium|137.33
La|Lantan|Lanthanum|138.91
Ce|Seriy|Cerium|140.12
Pr|Prazeodim|Praseodymium|140.91
Nd|Neodim|Neodymium|144.24
Pm|Prometiy|Promethium|[145]
Sm|Samariy|Samarium|150.36
Eu|Yevropiy|Europium|151.96
Gd|Gadoliniy|Gadolinium|157.25
Tb|Terbiy|Terbium|158.93
Dy|Disproziy|Dysprosium|162.50
Ho|Golmiy|Holmium|164.93
Er|Erbiy|Erbium|167.26
Tm|Tuliy|Thulium|168.93
Yb|Itterbiy|Ytterbium|173.05
Lu|Lyutesiy|Lutetium|174.97
Hf|Gafniy|Hafnium|178.49
Ta|Tantal|Tantalum|180.95
W|Volfram|Tungsten|183.84
Re|Reniy|Rhenium|186.21
Os|Osmiy|Osmium|190.23
Ir|Iridiy|Iridium|192.22
Pt|Platina|Platinum|195.08
Au|Oltin|Gold|196.97
Hg|Simob|Mercury|200.59
Tl|Talliy|Thallium|204.38
Pb|Qo'rg'oshin|Lead|207.2
Bi|Vismut|Bismuth|208.98
Po|Poloniy|Polonium|[209]
At|Astat|Astatine|[210]
Rn|Radon|Radon|[222]
Fr|Fransiy|Francium|[223]
Ra|Radiy|Radium|[226]
Ac|Aktiniy|Actinium|[227]
Th|Toriy|Thorium|232.04
Pa|Protaktiniy|Protactinium|231.04
U|Uran|Uranium|238.03
Np|Neptuniy|Neptunium|[237]
Pu|Plutoniy|Plutonium|[244]
Am|Ameritsiy|Americium|[243]
Cm|Kyuriy|Curium|[247]
Bk|Berkliy|Berkelium|[247]
Cf|Kaliforniy|Californium|[251]
Es|Eynshteyniy|Einsteinium|[252]
Fm|Fermiy|Fermium|[257]
Md|Mendeleviy|Mendelevium|[258]
No|Nobeliy|Nobelium|[259]
Lr|Lourensiy|Lawrencium|[266]
Rf|Rezerfordiy|Rutherfordium|[267]
Db|Dubniy|Dubnium|[268]
Sg|Siborgiy|Seaborgium|[269]
Bh|Boriy|Bohrium|[270]
Hs|Xassiy|Hassium|[269]
Mt|Meytneriy|Meitnerium|[278]
Ds|Darmshtadtiy|Darmstadtium|[281]
Rg|Rentgeniy|Roentgenium|[282]
Cn|Kopernitsiy|Copernicium|[285]
Nh|Nixoniy|Nihonium|[286]
Fl|Fleroviy|Flerovium|[289]
Mc|Moskoviy|Moscovium|[290]
Lv|Livermoriy|Livermorium|[293]
Ts|Tennessin|Tennessine|[294]
Og|Oganesson|Oganesson|[294]`;

  const CAT = {
    alkali: { uz: 'Ishqoriy metallar', en: 'Alkali metals', c: '#ff8a80' },
    alkaline: { uz: 'Ishqoriy-yer metallari', en: 'Alkaline earth metals', c: '#ffcc80' },
    transition: { uz: "O'tish metallari", en: 'Transition metals', c: '#f8bbd0' },
    post: { uz: 'Boshqa metallar', en: 'Post-transition metals', c: '#b0bec5' },
    metalloid: { uz: 'Metalloidlar (yarim metallar)', en: 'Metalloids', c: '#c5e1a5' },
    nonmetal: { uz: 'Nometallar', en: 'Reactive nonmetals', c: '#a5d6a7' },
    halogen: { uz: 'Galogenlar', en: 'Halogens', c: '#80deea' },
    noble: { uz: 'Inert (asil) gazlar', en: 'Noble gases', c: '#b39ddb' },
    lanth: { uz: 'Lantanoidlar', en: 'Lanthanides', c: '#ffe082' },
    actin: { uz: 'Aktinoidlar', en: 'Actinides', c: '#ffab91' },
  };
  const inR = (z, a, b) => z >= a && z <= b;
  function catOf(z) {
    if ([3, 11, 19, 37, 55, 87].includes(z)) return 'alkali';
    if ([4, 12, 20, 38, 56, 88].includes(z)) return 'alkaline';
    if ([9, 17, 35, 53, 85, 117].includes(z)) return 'halogen';
    if ([2, 10, 18, 36, 54, 86, 118].includes(z)) return 'noble';
    if ([1, 6, 7, 8, 15, 16, 34].includes(z)) return 'nonmetal';
    if ([5, 14, 32, 33, 51, 52].includes(z)) return 'metalloid';
    if (inR(z, 57, 71)) return 'lanth';
    if (inR(z, 89, 103)) return 'actin';
    if ([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116].includes(z)) return 'post';
    return 'transition';
  }
  const GAS = [1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86];
  const stateOf = (z) => (z >= 104 ? 'unknown' : GAS.includes(z) ? 'gas' : z === 35 || z === 80 ? 'liquid' : 'solid');
  const STATE = { solid: { uz: 'Qattiq', en: 'Solid', c: '#90caf9' }, liquid: { uz: 'Suyuq', en: 'Liquid', c: '#4dd0e1' }, gas: { uz: 'Gaz', en: 'Gas', c: '#fff59d' }, unknown: { uz: "Noma'lum", en: 'Unknown', c: '#e0e0e0' } };
  const MET = { metal: { uz: 'Metall', en: 'Metal', c: '#90caf9' }, metalloid: { uz: 'Metalloid', en: 'Metalloid', c: '#c5e1a5' }, nonmetal: { uz: 'Nometall', en: 'Nonmetal', c: '#ffcc80' } };
  const metOf = (c) => (c === 'metalloid' ? 'metalloid' : ['nonmetal', 'halogen', 'noble'].includes(c) ? 'nonmetal' : 'metal');
  const BLOCK = { s: { uz: 's-blok', en: 's-block', c: '#ef9a9a' }, p: { uz: 'p-blok', en: 'p-block', c: '#fff59d' }, d: { uz: 'd-blok', en: 'd-block', c: '#90caf9' }, f: { uz: 'f-blok', en: 'f-block', c: '#a5d6a7' } };

  // grid position (period row 1-7, group col 1-18; f-block rows 9,10)
  function pos(z) {
    if (z === 1) return [1, 1]; if (z === 2) return [1, 18];
    if (inR(z, 57, 71)) return [9, z - 57 + 3]; if (inR(z, 89, 103)) return [10, z - 89 + 3];
    const starts = [[3, 2], [11, 3], [19, 4], [37, 5], [55, 6], [87, 7]];
    let p = 2, s = 3; for (const [a, b] of starts) if (z >= a) { s = a; p = b; }
    const i = z - s;
    if (p <= 3) return [p, i < 2 ? i + 1 : i + 11];
    if (p <= 5) return [p, i + 1];
    // periods 6,7: i 0-1 → g1-2, then La/Ac row (skip 15), then g4..
    if (i < 2) return [p, i + 1];
    return [p, i - 14 + 1];
  }
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  function groupLabel(g) {
    if (!g) return '';
    if (g <= 2) return `${g} (${ROMAN[g]} A)`; if (g >= 13) return `${g} (${ROMAN[g - 10]} A)`;
    if (g <= 7) return `${g} (${ROMAN[g]} B)`; if (g <= 10) return `${g} (VIII B)`; return `${g} (${ROMAN[g - 10]} B)`;
  }

  // electron configuration (aufbau + common exceptions)
  const ORB = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
  const CAP = { s: 2, p: 6, d: 10, f: 14 };
  const EXC = { 24: { '4s': -1, '3d': 1 }, 29: { '4s': -1, '3d': 1 }, 41: { '5s': -1, '4d': 1 }, 42: { '5s': -1, '4d': 1 }, 44: { '5s': -1, '4d': 1 }, 45: { '5s': -1, '4d': 1 }, 46: { '5s': -2, '4d': 2 }, 47: { '5s': -1, '4d': 1 }, 57: { '4f': -1, '5d': 1 }, 58: { '4f': -1, '5d': 1 }, 64: { '4f': -1, '5d': 1 }, 78: { '6s': -1, '5d': 1 }, 79: { '6s': -1, '5d': 1 }, 89: { '5f': -1, '6d': 1 }, 90: { '5f': -2, '6d': 2 }, 91: { '5f': -1, '6d': 1 }, 92: { '5f': -1, '6d': 1 }, 93: { '5f': -1, '6d': 1 }, 96: { '5f': -1, '6d': 1 }, 103: { '6d': -1, '7p': 1 } };
  function config(z) {
    const o = {}; let left = z;
    for (const k of ORB) { if (!left) break; const n = Math.min(CAP[k[1]], left); o[k] = n; left -= n; }
    const ex = EXC[z]; if (ex) for (const k in ex) o[k] = (o[k] || 0) + ex[k];
    return o;
  }
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (n) => String(n).split('').map((d) => SUP[d]).join('');
  function confStr(z) {
    const o = config(z); const keys = Object.keys(o).filter((k) => o[k] > 0).sort((a, b) => (+a[0] - +b[0]) || ('spdf'.indexOf(a[1]) - 'spdf'.indexOf(b[1])));
    return keys.map((k) => k + sup(o[k])).join(' ');
  }
  function shells(z) { const o = config(z); const sh = []; for (const k in o) { const n = +k[0]; sh[n - 1] = (sh[n - 1] || 0) + o[k]; } return [...sh].map((x) => x || 0); }
  function blockOf(z) { if (inR(z, 57, 71) || inR(z, 89, 103)) return 'f'; const o = config(z); let last = ''; for (const k of ORB) if (o[k]) last = k; if (z === 2) return 's'; return last[1]; }

  const VAL = { H: 'I', Li: 'I', Na: 'I', K: 'I', Rb: 'I', Cs: 'I', Be: 'II', Mg: 'II', Ca: 'II', Sr: 'II', Ba: 'II', B: 'III', Al: 'III', C: 'II, IV', Si: 'IV', N: 'III, V', P: 'III, V', O: 'II', S: 'II, IV, VI', F: 'I', Cl: 'I, III, V, VII', Br: 'I, V', I: 'I, V, VII', Fe: 'II, III', Cu: 'I, II', Zn: 'II', Ag: 'I', Hg: 'I, II', Pb: 'II, IV', Sn: 'II, IV', Mn: 'II, IV, VI, VII', Cr: 'II, III, VI', Ni: 'II', Co: 'II, III', Au: 'I, III', Ba_: '' };
  const USE = {
    H: ['Ammiak va metanol ishlab chiqarishda, kelajak yoqilg\'isi (vodorod energetikasi).', 'Making ammonia and methanol; a fuel of the future (hydrogen energy).'],
    He: ['Havo sharlari va dirijabllar, juda past haroratli sovutish (MRT apparatlari).', 'Balloons and airships; ultra-cold cooling (MRI scanners).'],
    Li: ['Telefon va elektromobil akkumulyatorlari.', 'Batteries for phones and electric cars.'],
    C: ['Barcha organik moddalar asosi; olmos, grafit (qalam), ko\'mir.', 'Basis of all organic matter; diamond, graphite (pencils), coal.'],
    N: ['Havoning 78% i; mineral o\'g\'itlar, ammiak ishlab chiqarish.', '78% of air; mineral fertilisers, ammonia production.'],
    O: ['Havoning 21% i; nafas olish va yonish uchun zarur; tibbiyot va metallurgiya.', '21% of air; needed for breathing and burning; medicine and metallurgy.'],
    F: ['Tish pastasida (ftoridlar) — tish emalini mustahkamlaydi.', 'In toothpaste (fluorides) — strengthens tooth enamel.'],
    Ne: ['Yorqin qizil reklama chiroqlari.', 'Bright red advertising lights.'],
    Na: ['Osh tuzi (NaCl) tarkibida; ichimlik sodasi (NaHCO₃).', 'In table salt (NaCl); baking soda (NaHCO₃).'],
    Mg: ['Yengil qotishmalar; o\'simlik xlorofilli tarkibida; feyerverk.', 'Light alloys; part of plant chlorophyll; fireworks.'],
    Al: ['Samolyot, idish, folga, elektr simlari.', 'Aircraft, cookware, foil, power cables.'],
    Si: ['Qum va shisha (SiO₂); kompyuter mikrosxemalari, quyosh panellari.', 'Sand and glass (SiO₂); computer chips, solar panels.'],
    P: ['Suyak va tishlar tarkibi; o\'g\'itlar; gugurt.', 'Part of bones and teeth; fertilisers; matches.'],
    S: ['Sulfat kislota ishlab chiqarish; rezinani vulkanlash.', 'Making sulfuric acid; vulcanising rubber.'],
    Cl: ['Suvni zararsizlantirish (xlorlash); osh tuzi tarkibida.', 'Disinfecting water (chlorination); part of table salt.'],
    Ar: ['Lampochkalarni to\'ldirish, payvandlashda himoya gazi.', 'Filling light bulbs; shielding gas in welding.'],
    K: ['O\'g\'itlar; yurak va nerv tizimi uchun zarur; banan va kartoshkada ko\'p.', 'Fertilisers; vital for heart and nerves; plenty in bananas and potatoes.'],
    Ca: ['Suyak va tishlar; ohak, bo\'r, marmar (CaCO₃); sement.', 'Bones and teeth; lime, chalk, marble (CaCO₃); cement.'],
    Ti: ['Samolyot va kosmik texnika, sun\'iy bo\'g\'imlar — yengil va mustahkam.', 'Aircraft, spacecraft, artificial joints — light and strong.'],
    Cr: ['Zanglamaydigan po\'lat, xromlash (yaltiroq qoplama).', 'Stainless steel, chrome plating.'],
    Fe: ['Po\'lat va cho\'yan; qondagi gemoglobin tarkibida.', 'Steel and cast iron; part of haemoglobin in blood.'],
    Cu: ['Elektr simlari, bronza va latun qotishmalari.', 'Electrical wires; bronze and brass alloys.'],
    Zn: ['Temirni zanglashdan himoya (rux qoplama); immunitet uchun zarur.', 'Protects iron from rust (galvanising); needed for immunity.'],
    Br: ['Xona haroratida suyuq nometall; dori va fotografiyada.', 'A nonmetal that is liquid at room temperature; medicines, photography.'],
    Ag: ['Zargarlik buyumlari, ko\'zgular; bakteriyalarga qarshi xossasi bor.', 'Jewellery, mirrors; has antibacterial properties.'],
    Sn: ['Konserva bankalari qoplamasi, kavsharlash, bronza.', 'Coating tin cans, soldering, bronze.'],
    I: ['Qalqonsimon bez uchun zarur; yodlangan tuz; yaraga surtiladigan yod eritmasi.', 'Needed for the thyroid; iodised salt; iodine tincture for wounds.'],
    W: ['Eng yuqori suyuqlanish haroratli metall — lampochka tolasi.', 'The metal with the highest melting point — light-bulb filaments.'],
    Pt: ['Avtomobil katalizatorlari, zargarlik buyumlari.', 'Car catalytic converters, jewellery.'],
    Au: ['Zargarlik, elektronika; O\'zbekistonda Muruntov konidan qazib olinadi.', 'Jewellery, electronics; mined at Muruntau in Uzbekistan.'],
    Hg: ['Xona haroratida suyuq metall; zaharli! Eski termometrlarda ishlatilgan.', 'A metal that is liquid at room temperature; toxic! Used in old thermometers.'],
    Pb: ['Akkumulyatorlar, radiatsiyadan himoya; zaharli.', 'Car batteries, radiation shielding; toxic.'],
    U: ['Atom elektr stansiyalari uchun yoqilg\'i; O\'zbekistonda Uchquduqda qazib olinadi.', 'Fuel for nuclear power plants; mined at Uchquduq in Uzbekistan.'],
    Mo: ['Mustahkam po\'lat qotishmalari.', 'Strong steel alloys.'],
    Ni: ['Tangalar, zanglamaydigan po\'lat, akkumulyatorlar.', 'Coins, stainless steel, batteries.'],
    Co: ['Ko\'k bo\'yoqlar, magnitlar, B12 vitamini tarkibida.', 'Blue pigments, magnets, part of vitamin B12.'],
    Mn: ['Po\'lat ishlab chiqarish; kaliy permanganat (KMnO₄) — dezinfeksiya.', 'Steel making; potassium permanganate (KMnO₄) — disinfectant.'],
    Kr: ['Yorug\'lik lampalari va lazerlar.', 'Lamps and lasers.'],
    Xe: ['Avtomobil faralari, kosmik kemalar dvigatellari.', 'Car headlights, spacecraft ion engines.'],
    Rn: ['Radioaktiv gaz; yerto\'lalarda to\'planishi xavfli.', 'Radioactive gas; dangerous when it builds up in basements.'],
  };

  const EL = RAW.trim().split('\n').map((l, i) => {
    const [s, uz, en, m] = l.split('|'); const z = i + 1; const radio = z === 43 || z === 61 || z >= 84;
    const mass = m.startsWith('[') ? +m.slice(1, -1) : +m;
    const [row, col] = pos(z); const cat = catOf(z);
    const period = row >= 9 ? row - 3 : row; const group = row >= 9 ? 3 : col;
    return { z, s, uz, en, m, mass, row, col, period, group, cat, state: stateOf(z), met: metOf(cat), radio, block: blockOf(z) };
  });
  const BY = Object.fromEntries(EL.map((e) => [e.s, e]));

  const T = {
    title: ['Interaktiv davriy jadval', 'Interactive periodic table'],
    sub: ["Elementni bosing — tartib raqami, massasi, elektron qavatlari, xossalari va qo'llanilishi chiqadi. Rang rejimini almashtirib, qonuniyatlarni ko'ring.", 'Click an element to see its atomic number, mass, electron shells, properties and uses. Switch the colour mode to see the patterns.'],
    color: ['Rang bo\'yicha:', 'Colour by:'], m_cat: ['Oilalar', 'Families'], m_met: ['Metall / nometall', 'Metal / nonmetal'], m_state: ['Holati (25 °C)', 'State (25 °C)'], m_block: ['Bloklar', 'Blocks'], swipe: ['👆 Jadvalni barmoq bilan chapga-o\'ngga suring', '👆 Swipe the table left and right'],
    find: ['Element qidirish (nomi, belgisi yoki raqami)…', 'Find an element (name, symbol or number)…'],
    game: ['🎯 O\'yin: elementni top', '🎯 Game: find the element'], explore: ['🔍 Tadqiq qilish', '🔍 Explore'],
    z: ['Tartib raqami (Z)', 'Atomic number (Z)'], ar: ['Nisbiy atom massasi (Aᵣ)', 'Relative atomic mass (Aᵣ)'], period: ['Davr', 'Period'], group: ['Guruh', 'Group'],
    family: ['Oila', 'Family'], state: ['Holati (25 °C)', 'State (25 °C)'], shells: ['Elektron qavatlar', 'Electron shells'], conf: ['Elektron konfiguratsiya', 'Electron configuration'],
    pne: ['Zarrachalar (eng ko\'p uchraydigan izotop)', 'Particles (most common isotope)'], val: ['Odatiy valentligi', 'Common valency'], use: ['Qo\'llanilishi', 'Uses'],
    radio: ['☢ Radioaktiv element', '☢ Radioactive element'], open3d: ['⚛️ 3D atom modelini ochish', '⚛️ Open the 3D atom model'],
    hint: ['👆 Jadvaldan elementni tanlang', '👆 Pick an element from the table'], lessons: ['Mavzuga oid darslar', 'Related lessons'],
    q_name: ['{x} elementini toping', 'Find the element {x}'], q_z: ['Tartib raqami {x} bo\'lgan elementni toping', 'Find the element with atomic number {x}'], q_pg: ['{p}-davr, {g}-guruh elementini toping', 'Find the element in period {p}, group {g}'], q_sym: ['Belgisi «{x}» bo\'lgan elementni toping', 'Find the element whose symbol is “{x}”'],
    right: ['To\'g\'ri! ✅', 'Correct! ✅'], wrong: ['Afsus, bu {x}. To\'g\'ri javob ko\'rsatildi.', 'Not quite — that is {x}. The right answer is highlighted.'], score: ['Natija', 'Score'], again: ['Qaytadan o\'ynash', 'Play again'], round: ['Savol', 'Question'],
    done: ['O\'yin tugadi!', 'Game over!'], lnf: ['f-elementlar pastda', 'f-block below'],
    p_count: ['protonlar', 'protons'], n_count: ['neytronlar (taxminiy)', 'neutrons (approx.)'], e_count: ['elektronlar', 'electrons'],
    pause3d: ['Animatsiyani to‘xtatish', 'Pause animation'], play3d: ['Animatsiyani yoqish', 'Resume animation'], reset3d: ['3D ko‘rinishni tiklash', 'Reset 3D view'],
    atomNote: ['Bohr sxemasi — elektronlar haqiqiy doiraviy orbitalarda harakatlanmaydi. Neytron soni yumaloqlangan massaga asoslangan taxmin.', 'Bohr schematic — electrons do not move in actual circular orbits. Neutron count is an estimate from rounded mass.'],
    noUse: ['Batafsil ma’lumot uchun tegishli dars mavzularini ko‘ring.', 'See the related lessons for further details.'],
  };
  const LESSONS = [['g7', 17], ['g7', 18], ['g7', 26], ['g7', 27], ['g7', 35], ['g7', 36], ['g7', 37], ['g7', 38]];

  function render(host, ctx) {
    const lang = ctx.lang; const tt = (k) => T[k][lang === 'uz' ? 0 : 1]; const nm = (e) => (lang === 'uz' ? e.uz : e.en);
    const st = render.st || (render.st = { mode: 'cat', sel: null, game: null, hl: null });
    const legendOf = () => (st.mode === 'cat' ? CAT : st.mode === 'met' ? MET : st.mode === 'state' ? STATE : BLOCK);
    const keyOf = (e) => (st.mode === 'cat' ? e.cat : st.mode === 'met' ? e.met : st.mode === 'state' ? e.state : e.block);
    const colOf = (e) => legendOf()[keyOf(e)].c;

    host.innerHTML = `<div class="page-h pt"><div class="wrap"><div class="crumbs"><a href="#home">${ctx.t('nav_home')}</a> / ${tt('title')}</div><h1>🧩 ${tt('title')}</h1><p>${tt('sub')}</p></div></div>
      <div class="wrap ptwrap">
        <div class="pt-overview"><span class="pt-stat">⚛️ <b>118</b> ${lang === 'uz' ? 'element' : 'elements'}</span><span class="pt-stat">🧪 <b>10</b> ${lang === 'uz' ? 'element oilasi' : 'element families'}</span><span class="pt-stat">🎮 <b>10</b> ${lang === 'uz' ? 'savollik o‘yin' : 'game questions'}</span></div>
        <div class="ptbar">
          <div class="seg" id="ptMode"><span class="ptlbl">${tt('color')}</span>${['cat', 'met', 'state', 'block'].map((m) => `<button data-m="${m}" class="${st.mode === m ? 'on' : ''}">${tt('m_' + m)}</button>`).join('')}</div>
          <input id="ptFind" class="ptfind" type="search" aria-label="${tt('find')}" placeholder="${tt('find')}" autocomplete="off">
          <button class="btn ${st.game ? 'sec' : ''}" id="ptGame">${st.game ? tt('explore') : tt('game')}</button>
        </div>
        <section class="ptdet pt-selected" id="ptDet" aria-live="polite"></section>
        <div class="pthint">${tt('swipe')}</div><div class="ptscroll"><div class="ptgrid" id="ptGrid">
          ${Array.from({ length: 18 }, (_, i) => `<div class="ptgh" style="grid-row:1;grid-column:${i + 2}">${i + 1}<small>${groupLabel(i + 1).replace(/^\d+ /, '')}</small></div>`).join('')}
          ${Array.from({ length: 7 }, (_, i) => `<div class="ptph" style="grid-row:${i + 2};grid-column:1">${i + 1}</div>`).join('')}
          <div class="ptcell ptph2" style="grid-row:7;grid-column:4"><b>57–71</b></div><div class="ptcell ptph2" style="grid-row:8;grid-column:4"><b>89–103</b></div>
          ${EL.map((e) => `<button class="ptcell" data-z="${e.z}" style="grid-row:${e.row + 1};grid-column:${e.col + 1};--c:${colOf(e)}" title="${nm(e)}"><i>${e.z}</i><b>${e.s}</b><span>${nm(e)}</span><em>${e.m.replace('.', ',')}</em></button>`).join('')}
          <div class="ptgap" style="grid-row:9;grid-column:1/-1"></div>
        </div></div>
        <div class="ptleg" id="ptLeg"></div>
        <div class="panel ptles"><h4>📚 ${tt('lessons')}</h4><div class="ptlinks">${LESSONS.map(([g, n]) => { const L = ctx.B[g].lessons[n - 1]; return L ? `<a href="#${g}-${n}"><span class="snum ${g}">${n}</span>${ctx.tr(L.t)}</a>` : ''; }).join('')}</div></div>
      </div>`;
    const grid = host.querySelector('#ptGrid'), det = host.querySelector('#ptDet');
    const cells = [...grid.querySelectorAll('button.ptcell')];
    let active3d = null;

    function legend() {
      const L = legendOf();
      host.querySelector('#ptLeg').innerHTML = Object.entries(L).map(([k, v]) => `<button data-k="${k}" class="${st.hl === k ? 'on' : ''}"><i style="background:${v.c}"></i>${v[lang]}</button>`).join('');
      host.querySelectorAll('#ptLeg button').forEach((b) => (b.onclick = () => { st.hl = st.hl === b.dataset.k ? null : b.dataset.k; paint(); legend(); }));
    }
    function paint() {
      cells.forEach((c) => { const e = EL[c.dataset.z - 1]; c.style.setProperty('--c', colOf(e)); c.classList.toggle('dim', !!st.hl && keyOf(e) !== st.hl); c.classList.toggle('sel', st.sel === e.z); });
    }
    function bohr(e) {
      const sh = shells(e.z); const R0 = 14, dR = Math.min(9, 34 / sh.length); const W = 2 * (R0 + dR * sh.length) + 16, c = W / 2;
      let s = `<svg viewBox="0 0 ${W} ${W}" class="bohr"><circle cx="${c}" cy="${c}" r="${R0 - 6}" fill="${CAT[e.cat].c}" stroke="#334" stroke-width="1"/><text x="${c}" y="${c + 4}" text-anchor="middle" font-size="8" font-weight="800" fill="#112">${e.s}</text>`;
      sh.forEach((n, i) => { const r = R0 + dR * (i + 1) - 4; s += `<g class="orb" style="animation-duration:${8 + i * 4}s;transform-origin:${c}px ${c}px"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#9fb3d1" stroke-dasharray="2 3"/>`; for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2; s += `<circle cx="${(c + r * Math.cos(a)).toFixed(1)}" cy="${(c + r * Math.sin(a)).toFixed(1)}" r="1.9" fill="#1f5fd6"/>`; } s += '</g>'; });
      return s + '</svg>';
    }
    function show(z) {
      if (active3d) { active3d.dispose(); active3d = null; }
      const e = EL[z - 1]; st.sel = z; paint();
      if (!e) { det.innerHTML = `<div class="ptempty">${tt('hint')}</div>`; return; }
      const sh = shells(z); const A = Math.round(e.mass); const u = USE[e.s]; const v = VAL[e.s];
      det.innerHTML = `<div class="ptcard"><div class="ptc1"><div class="ptbig" style="--c:${CAT[e.cat].c}"><i>${e.z}</i><b>${e.s}</b><span>${nm(e)}</span><em>${e.m.replace('.', ',')}</em></div><div class="pt-shell-summary"><b>${tt('shells')}</b><div>${sh.join(' · ')}</div><small>${e.z} ${tt('p_count')} · ${e.z} ${tt('e_count')}</small></div>
          <div class="pt3d" id="pt3d"><div class="pt3d-fallback">⚛️ ${nm(e)}</div><div class="pt3d-note">${tt('atomNote')}</div></div>
          <div class="pt3d-controls"><button type="button" id="pt3dPause">⏸ ${tt('pause3d')}</button><button type="button" id="pt3dReset">↺ ${tt('reset3d')}</button></div></div>
        <div class="ptinfo"><h3>${nm(e)} <small>${lang === 'uz' ? e.en : e.uz}</small></h3>
          <div class="ptkv"><span>${tt('z')}</span><b>${e.z}</b><span>${tt('ar')}</span><b>${e.m.replace('.', ',')}</b><span>${tt('period')} / ${tt('group')}</span><b>${e.period} / ${e.row >= 9 ? (lang === 'uz' ? (e.row === 9 ? 'lantanoid' : 'aktinoid') : (e.row === 9 ? 'lanthanide' : 'actinide')) : groupLabel(e.group)}</b>
          <span>${tt('family')}</span><b><i class="dot" style="background:${CAT[e.cat].c}"></i>${CAT[e.cat][lang]}</b><span>${tt('state')}</span><b>${STATE[e.state][lang]}</b>
          <span>${tt('shells')}</span><b>${sh.join(', ')}</b>${v ? `<span>${tt('val')}</span><b>${v}</b>` : ''}</div></div>
        <div class="ptx"><div class="ptpne"><b>${e.z}</b> ${tt('p_count')} · <b>${e.z}</b> ${tt('e_count')}${e.z <= 103 ? ` · <b>${A - e.z}</b> ${tt('n_count')}` : ''}</div>
          <div class="ptconf">${tt('conf')}:<br><code>${confStr(z)}</code></div>
          ${u ? `<div class="ptuse"><b>${tt('use')}:</b> ${u[lang === 'uz' ? 0 : 1]}</div>` : `<div class="ptuse"><b>${tt('use')}:</b> ${tt('noUse')}</div>`}
          ${e.radio ? `<div class="ptradio">${tt('radio')}</div>` : ''}
          ${z <= 20 && window.Lab && Lab.exps['atom-model'] ? `<a class="btn sec ptbtn" href="#lab-atom-model">${tt('open3d')}</a>` : ''}</div></div>`;
      const sceneHost = det.querySelector('#pt3d');
      if (window.PTAtom3D && window.THREE) active3d = window.PTAtom3D.mount(sceneHost, e, sh, lang);
      const pauseBtn = det.querySelector('#pt3dPause');
      const resetBtn = det.querySelector('#pt3dReset');
      if (active3d) {
        let paused = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
        if (paused) { pauseBtn.textContent = '▶ ' + tt('play3d'); active3d.pause(true); }
        pauseBtn.onclick = () => { paused = !paused; active3d.pause(paused); pauseBtn.textContent = (paused ? '▶ ' + tt('play3d') : '⏸ ' + tt('pause3d')); };
        resetBtn.onclick = () => active3d.reset();
      } else {
        sceneHost.innerHTML = `<div class="pt3d-fallback">${bohr(e)}<span>${lang === 'uz' ? '2D atom sxemasi' : '2D atom schematic'}</span></div><div class="pt3d-note">${tt('atomNote')}</div>`;
        pauseBtn.hidden = true; resetBtn.hidden = true;
      }
    }

    // game
    function newGame() {
      const pool = EL.filter((e) => e.z <= 36 || ['Ag', 'Au', 'Sn', 'I', 'Ba', 'Pb', 'Hg', 'Pt', 'U', 'Xe', 'Rn', 'Cs'].includes(e.s));
      const qs = []; const used = new Set();
      while (qs.length < 10) { const e = pool[Math.floor(Math.random() * pool.length)]; if (used.has(e.z)) continue; used.add(e.z); const kinds = e.row <= 7 ? ['name', 'z', 'pg', 'sym'] : ['name', 'z', 'sym']; qs.push({ e, kind: kinds[Math.floor(Math.random() * kinds.length)] }); }
      st.game = { qs, i: 0, score: 0, lock: false };
    }
    function qText(q) {
      const e = q.e; if (q.kind === 'name') return tt('q_name').replace('{x}', `<b>${nm(e)}</b>`); if (q.kind === 'z') return tt('q_z').replace('{x}', `<b>${e.z}</b>`);
      if (q.kind === 'sym') return tt('q_sym').replace('{x}', `<b>${e.s}</b>`); return tt('q_pg').replace('{p}', `<b>${e.period}</b>`).replace('{g}', `<b>${e.group}</b>`);
    }
    function showGame(msg) {
      const g = st.game; if (!g) return;
      if (g.i >= g.qs.length) {
        if (!g.credited) {
          g.credited = true;
          if (window.XP && XP.s && typeof XP.test === 'function') {
            const best = Math.max(0, Number(XP.s.ptBest) || 0);
            const earned = Math.max(0, g.score - best);
            if (earned) { XP.s.ptBest = g.score; XP.test(earned); }
          }
        }
        det.innerHTML = `<div class="ptgame"><h3>${tt('done')}</h3><div class="ptscore">${g.score} / ${g.qs.length}</div><button class="btn" id="ptAgain">${tt('again')}</button></div>`; host.querySelector('#ptAgain').onclick = () => { newGame(); clearMarks(); showGame(); }; return; }
      det.innerHTML = `<div class="ptgame"><div class="ptgq"><small>${tt('round')} ${g.i + 1} / ${g.qs.length} · ${tt('score')}: ${g.score}</small><div>${qText(g.qs[g.i])}</div></div>${msg ? `<div class="ptmsg">${msg}</div>` : ''}<div class="ptprog"><i style="width:${(g.i / g.qs.length) * 100}%"></i></div></div>`;
    }
    const clearMarks = () => cells.forEach((c) => c.classList.remove('ok', 'bad'));
    function answer(z) {
      const g = st.game; if (g.lock || g.i >= g.qs.length) return; const q = g.qs[g.i]; const cell = (zz) => grid.querySelector(`button.ptcell[data-z="${zz}"]`);
      g.lock = true;
      if (z === q.e.z) { g.score++; cell(z).classList.add('ok'); showGame(tt('right')); }
      else { cell(z).classList.add('bad'); cell(q.e.z).classList.add('ok'); showGame(tt('wrong').replace('{x}', `${EL[z - 1].s} — ${nm(EL[z - 1])}`)); }
      setTimeout(() => { clearMarks(); g.i++; g.lock = false; showGame(); }, z === q.e.z ? 900 : 2200);
    }

    cells.forEach((c) => {
      c.setAttribute('aria-label', `${c.dataset.z} — ${nm(EL[+c.dataset.z - 1])}, ${EL[+c.dataset.z - 1].s}`);
      c.onkeydown = (event) => {
        const jump = {ArrowRight:1,ArrowLeft:-1,ArrowDown:18,ArrowUp:-18}[event.key];
        if (!jump) return;
        event.preventDefault();
        const next = Math.max(1,Math.min(118,+c.dataset.z+jump));
        const target = cells[next-1];
        if (target) target.focus({preventScroll:false});
      };
      c.onclick = () => { const z = +c.dataset.z; if (st.game) answer(z); else show(z); if (!st.game) { const r = det.getBoundingClientRect(); if (r.bottom < 95 || r.top > window.innerHeight - 110) det.scrollIntoView({ block: 'start', behavior: window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } };
      c.onmouseenter = () => { const e = EL[c.dataset.z - 1]; grid.querySelectorAll('.ptgh,.ptph').forEach((h) => h.classList.remove('hov')); if (e.row <= 7) { const gh = grid.querySelector(`.ptgh[style*="grid-column:${e.col + 1};"], .ptgh[style$="grid-column:${e.col + 1}"]`); if (gh) gh.classList.add('hov'); const ph = grid.querySelectorAll('.ptph')[e.row - 1]; if (ph) ph.classList.add('hov'); } };
    });
    grid.onmouseleave = () => grid.querySelectorAll('.hov').forEach((h) => h.classList.remove('hov'));
    host.querySelectorAll('#ptMode button').forEach((b) => (b.onclick = () => { st.mode = b.dataset.m; st.hl = null; host.querySelectorAll('#ptMode button').forEach((x) => x.classList.toggle('on', x === b)); paint(); legend(); }));
    host.querySelector('#ptGame').onclick = () => { if (st.game) { st.game = null; render(host, ctx); } else { newGame(); render(host, ctx); } };
    const find = host.querySelector('#ptFind');
    find.oninput = () => {
      const s = find.value.trim().toLowerCase(); if (!s) { st.hl = null; cells.forEach((c) => c.classList.remove('dim')); paint(); return; }
      const hits = EL.filter((e) => String(e.z) === s || e.s.toLowerCase() === s || e.uz.toLowerCase().startsWith(s) || e.en.toLowerCase().startsWith(s));
      if (hits.length === 1 && !st.game) show(hits[0].z);
      cells.forEach((c) => c.classList.toggle('dim', !hits.some((h) => h.z === +c.dataset.z)));
    };
    find.onkeydown = (ev) => { if (ev.key === 'Enter') { const s = find.value.trim().toLowerCase(); const e = EL.find((x) => String(x.z) === s || x.s.toLowerCase() === s || x.uz.toLowerCase().startsWith(s) || x.en.toLowerCase().startsWith(s)); if (e) { st.game ? answer(e.z) : show(e.z); } } };
    legend(); paint();
    if (st.game) showGame(); else if (ctx.z) show(ctx.z); else show(st.sel || 1);
  }
  window.PT = { render, EL, BY, shells, config, confStr };
})();
