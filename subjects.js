/* Zukko Akademiyasi — fanlar ro'yxati va darsliklar mundarijasi (ochiq ma'lumot).
 * Darslik sahifalari va yangi so'zlar BU YERDA EMAS: ular Firebase'da, faqat ruxsati bor foydalanuvchiga (ADR-0008).
 *
 * Fan:   { id, name{uz,en}, color, icon, grades: [..], books: [...] }
 * Kitob: { grade, part, lang (darslik tili), title, file (asl PDF nomi), offset (PDF sahifa = bosma sahifa - offset),
 *          units: [{ t{orig,uz}, from }], topics: [{ t (asl tilda), uz, ru, en (tarjima), p: [bosma sahifalar] }] }
 * Kimyo (id 'chem') — mavjud bo'lim (app.js, data-g6/7/8.js); bu yerda faqat fanlar ro'yxati uchun.
 */
(function () {
  const two = (from, n) => Array.from({ length: n }, (_, i) => [from + 2 * i, from + 2 * i + 1]);
  const mk = (titles, uz, ru, en, firstPage, fix) => { const p = two(firstPage, titles.length); return titles.map((t, i) => ({ t, uz: uz[i], ru: ru[i], en: en[i], p: (fix && fix[i + 1]) || p[i] })); };

  // ---------- Ingliz tili: Zukko English Pathway 1, 1-sinf, 1-qism ----------
  const EN1 = mk([
    "This Is Me", "My Name", "My Family", "My Mother", "My Father", "My Brother", "My Sister", "My Baby Brother", "My Baby Sister", "My Grandmother",
    "My Grandfather", "My Aunt", "My Uncle", "My Cousin", "We Love Our Family", "We Help at Home", "I Hug My Mom", "I Listen to Dad",
    "Grandma Tells a Story", "Grandpa Gives Advice", "We Eat Together", "We Say Thank You", "We Say Sorry", "My Family Photo", "My Happy Family",
    "My Home", "My Room", "The Living Room", "The Kitchen", "The Bathroom", "The Bedroom", "The Door", "The Window", "My Bed", "My Chair",
    "My Table", "My Toys", "My Bag", "My Clothes", "My Shoes", "Clean Home", "Dirty and Clean", "Put Things Away", "I Make My Bed",
    "I Help in the Kitchen", "I Wash My Cup", "I Keep My Room Clean", "My Favorite Place at Home", "Safe at Home", "I Love My Home",
  ], [
    "Bu menman", "Mening ismim", "Mening oilam", "Mening onam", "Mening otam", "Mening akam (ukam)", "Mening opam (singlim)", "Mening ukacham",
    "Mening singlicham", "Mening buvim", "Mening bobom", "Mening xolam", "Mening amakim", "Mening amakivachcham", "Biz oilamizni sevamiz",
    "Biz uyda yordam beramiz", "Men onamni quchoqlayman", "Men dadamni tinglayman", "Buvim hikoya aytib beradi", "Bobom maslahat beradi",
    "Biz birga ovqatlanamiz", "Biz «rahmat» deymiz", "Biz «kechirasiz» deymiz", "Oilaviy suratim", "Mening baxtli oilam", "Mening uyim",
    "Mening xonam", "Mehmonxona", "Oshxona", "Hammom", "Yotoqxona", "Eshik", "Deraza", "Mening karavotim", "Mening stulim", "Mening stolim",
    "Mening o‘yinchoqlarim", "Mening sumkam", "Mening kiyimlarim", "Mening oyoq kiyimlarim", "Toza uy", "Iflos va toza",
    "Narsalarni joyiga qo‘yamiz", "Men karavotimni yig‘ishtiraman", "Men oshxonada yordam beraman", "Men finjonimni yuvaman",
    "Men xonamni toza saqlayman", "Uydagi sevimli joyim", "Uyda xavfsizlik", "Men uyimni yaxshi ko‘raman",
  ], [
    "Это я", "Моё имя", "Моя семья", "Моя мама", "Мой папа", "Мой брат", "Моя сестра", "Мой младший братик", "Моя младшая сестрёнка", "Моя бабушка",
    "Мой дедушка", "Моя тётя", "Мой дядя", "Мой двоюродный брат", "Мы любим нашу семью", "Мы помогаем дома", "Я обнимаю маму", "Я слушаю папу",
    "Бабушка рассказывает сказку", "Дедушка даёт совет", "Мы едим вместе", "Мы говорим «спасибо»", "Мы говорим «прости»", "Моя семейная фотография",
    "Моя счастливая семья", "Мой дом", "Моя комната", "Гостиная", "Кухня", "Ванная комната", "Спальня", "Дверь", "Окно", "Моя кровать", "Мой стул",
    "Мой стол", "Мои игрушки", "Мой рюкзак", "Моя одежда", "Моя обувь", "Чистый дом", "Грязный и чистый", "Убираем вещи на место",
    "Я заправляю кровать", "Я помогаю на кухне", "Я мою свою чашку", "Я держу свою комнату в чистоте", "Моё любимое место дома", "Безопасность дома",
    "Я люблю свой дом",
  ], [
    "This Is Me", "My Name", "My Family", "My Mother", "My Father", "My Brother", "My Sister", "My Baby Brother", "My Baby Sister", "My Grandmother",
    "My Grandfather", "My Aunt", "My Uncle", "My Cousin", "We Love Our Family", "We Help at Home", "I Hug My Mom", "I Listen to Dad",
    "Grandma Tells a Story", "Grandpa Gives Advice", "We Eat Together", "We Say Thank You", "We Say Sorry", "My Family Photo", "My Happy Family",
    "My Home", "My Room", "The Living Room", "The Kitchen", "The Bathroom", "The Bedroom", "The Door", "The Window", "My Bed", "My Chair",
    "My Table", "My Toys", "My Bag", "My Clothes", "My Shoes", "Clean Home", "Dirty and Clean", "Put Things Away", "I Make My Bed",
    "I Help in the Kitchen", "I Wash My Cup", "I Keep My Room Clean", "My Favorite Place at Home", "Safe at Home", "I Love My Home",
  ], 5, { 43: [89, 91], 44: [92, 90] }); // darslikda 43–44-mavzu sahifalari aralash

  // ---------- Rus tili: Zukko Russian Pathway 1, 1-sinf, 1-qism ----------
  const RU1 = mk([
    "Это я", "Моё имя", "Моя семья", "Моя мама", "Мой папа", "Мой брат", "Моя сестра", "Мой маленький брат", "Моя маленькая сестра", "Моя бабушка",
    "Мой дедушка", "Моя тётя", "Мой дядя", "Мой двоюродный брат", "Мы любим нашу семью", "Мы помогаем дома", "Я обнимаю маму", "Я слушаю папу",
    "Бабушка рассказывает историю", "Дедушка даёт совет", "Мы едим вместе", "Мы говорим «спасибо»", "Мы говорим «прости»", "Моя семейная фотография",
    "Моя счастливая семья", "Мой дом", "Моя комната", "Гостиная", "Кухня", "Ванная комната", "Спальня", "Дверь", "Окно", "Моя кровать", "Мой стул",
    "Мой стол", "Мои игрушки", "Моя сумка", "Моя одежда", "Моя обувь", "Чистый дом", "Грязный и чистый", "Убираем вещи на место",
    "Я застилаю свою кровать", "Я помогаю на кухне", "Я мою свою чашку", "Я держу свою комнату чистой", "Моё любимое место дома",
    "Безопасность дома", "Я люблю свой дом",
  ], [
    "Bu men", "Mening ismim", "Mening oilam", "Mening onam", "Mening otam", "Mening akam / ukam", "Mening opam / singlim", "Mening ukajonim",
    "Mening singiljonim", "Mening buvim", "Mening bobom", "Mening xolam", "Mening amakim", "Mening amakivachcham", "Biz oilamizni yaxshi ko‘ramiz",
    "Biz uyda yordam beramiz", "Men onamni quchoqlayman", "Men otamni tinglayman", "Buvim hikoya aytib beradi", "Bobom maslahat beradi",
    "Biz birga ovqatlanamiz", "Biz «rahmat» deymiz", "Biz «kechir» deymiz", "Oilaviy suratim", "Mening baxtli oilam", "Mening uyim", "Mening xonam",
    "Mehmonxona", "Oshxona", "Hammom", "Yotoqxona", "Eshik", "Deraza", "Mening karavotim", "Mening stulim", "Mening stolim", "Mening o‘yinchoqlarim",
    "Mening sumkam", "Mening kiyimlarim", "Mening oyoq kiyimim", "Toza uy", "Iflos va toza", "Narsalarni joyiga qo‘yamiz",
    "Men karavotimni yig‘ishtiraman", "Men oshxonada yordam beraman", "Men finjonimni yuvaman", "Men xonamni toza saqlayman", "Uydagi sevimli joyim",
    "Uyda xavfsizlik", "Men uyimni yaxshi ko‘raman",
  ], [
    "Это я", "Моё имя", "Моя семья", "Моя мама", "Мой папа", "Мой брат", "Моя сестра", "Мой маленький брат", "Моя маленькая сестра", "Моя бабушка",
    "Мой дедушка", "Моя тётя", "Мой дядя", "Мой двоюродный брат", "Мы любим нашу семью", "Мы помогаем дома", "Я обнимаю маму", "Я слушаю папу",
    "Бабушка рассказывает историю", "Дедушка даёт совет", "Мы едим вместе", "Мы говорим «спасибо»", "Мы говорим «прости»", "Моя семейная фотография",
    "Моя счастливая семья", "Мой дом", "Моя комната", "Гостиная", "Кухня", "Ванная комната", "Спальня", "Дверь", "Окно", "Моя кровать", "Мой стул",
    "Мой стол", "Мои игрушки", "Моя сумка", "Моя одежда", "Моя обувь", "Чистый дом", "Грязный и чистый", "Убираем вещи на место",
    "Я застилаю свою кровать", "Я помогаю на кухне", "Я мою свою чашку", "Я держу свою комнату чистой", "Моё любимое место дома",
    "Безопасность дома", "Я люблю свой дом",
  ], [
    "This is me", "My name", "My family", "My mum", "My dad", "My brother", "My sister", "My little brother", "My little sister", "My grandma",
    "My grandpa", "My aunt", "My uncle", "My cousin", "We love our family", "We help at home", "I hug my mum", "I listen to my dad",
    "Grandma tells a story", "Grandpa gives advice", "We eat together", "We say “thank you”", "We say “sorry”", "My family photo", "My happy family",
    "My home", "My room", "Living room", "Kitchen", "Bathroom", "Bedroom", "Door", "Window", "My bed", "My chair", "My desk", "My toys", "My bag",
    "My clothes", "My shoes", "A clean home", "Dirty and clean", "Putting things away", "I make my bed", "I help in the kitchen", "I wash my cup",
    "I keep my room clean", "My favourite place at home", "Safety at home", "I love my home",
  ], 5);

  // ---------- Matematika: Mathematics Grade 1, 1-qism (inglizcha) ----------
  const MA1 = mk([
    "A Journey Into the World of Math", "Things Around Us", "Colours of Objects", "Shapes of Objects", "Size of Objects", "Big and Small Objects",
    "Long and Short Objects", "Tall and Short Objects", "Heavy and Light Objects", "Thick and Thin Objects", "Wide and Narrow Objects",
    "Find Identical Objects", "Find the Different Object", "Group Objects by Colour", "Group Objects by Shape", "Group Objects by Size",
    "Group Objects by Two Features", "Find the Odd One Out", "Left and Right", "Above and Below", "In Front of and Behind", "Inside and Outside",
    "Near and Far", "All, Some and None", "Logic Tasks about Objects", "One Object — Number 1", "Meet the Number 1", "We Write the Number 1",
    "Two Things — Number 2", "Meet the Number 2", "Let’s Write Number 2", "Let’s Compare 1 and 2", "Three Things — Number 3", "Meet the Number 3",
    "Let’s Write Number 3", "Ordering 1, 2 and 3", "Four Things — Number 4", "Meet the Number 4", "Let’s Write Number 4", "Parts of 4",
    "Five Things — Number 5", "Meet the Number 5", "Let’s Write Number 5", "Parts of 5", "Numbers 1 to 5", "Review 1 to 5", "More, Fewer or Equal",
    "Compare Numbers", "Number Line", "My Number Test",
  ], [
    "Matematika olamiga sayohat", "Atrofimizdagi narsalar", "Narsalarning ranglari", "Narsalarning shakllari", "Narsalarning kattaligi",
    "Katta va kichik narsalar", "Uzun va qisqa narsalar", "Baland va past narsalar", "Og‘ir va yengil narsalar", "Qalin va yupqa narsalar",
    "Keng va tor narsalar", "Bir xil narsalarni top", "Boshqacha narsani top", "Narsalarni rangiga qarab guruhlash",
    "Narsalarni shakliga qarab guruhlash", "Narsalarni kattaligiga qarab guruhlash", "Narsalarni ikki belgisiga qarab guruhlash", "Ortiqchasini top",
    "Chap va o‘ng", "Yuqorida va pastda", "Oldida va orqasida", "Ichida va tashqarisida", "Yaqin va uzoq", "Hammasi, ba’zilari va hech biri",
    "Narsalar haqida mantiqiy topshiriqlar", "Bitta narsa – 1 soni", "1 soni bilan tanishamiz", "1 sonini yozamiz", "Ikkita narsa – 2 soni",
    "2 soni bilan tanishamiz", "2 sonini yozamiz", "1 va 2 ni taqqoslaymiz", "Uchta narsa – 3 soni", "3 soni bilan tanishamiz", "3 sonini yozamiz",
    "1, 2 va 3 ni tartiblaymiz", "To‘rtta narsa – 4 soni", "4 soni bilan tanishamiz", "4 sonini yozamiz", "4 ning qismlari", "Beshta narsa – 5 soni",
    "5 soni bilan tanishamiz", "5 sonini yozamiz", "5 ning qismlari", "1 dan 5 gacha sonlar", "1 dan 5 gacha takrorlash", "Ko‘p, kam yoki teng",
    "Sonlarni taqqoslaymiz", "Sonlar chizig‘i", "Mening sonlar testim",
  ], [
    "Путешествие в мир математики", "Предметы вокруг нас", "Цвета предметов", "Формы предметов", "Размер предметов", "Большие и маленькие предметы",
    "Длинные и короткие предметы", "Высокие и низкие предметы", "Тяжёлые и лёгкие предметы", "Толстые и тонкие предметы", "Широкие и узкие предметы",
    "Найди одинаковые предметы", "Найди отличающийся предмет", "Группируем предметы по цвету", "Группируем предметы по форме",
    "Группируем предметы по размеру", "Группируем предметы по двум признакам", "Найди лишний предмет", "Слева и справа", "Выше и ниже",
    "Впереди и позади", "Внутри и снаружи", "Близко и далеко", "Все, некоторые и ни один", "Логические задачи о предметах", "Один предмет – число 1",
    "Знакомимся с числом 1", "Пишем число 1", "Два предмета – число 2", "Знакомимся с числом 2", "Пишем число 2", "Сравниваем 1 и 2",
    "Три предмета – число 3", "Знакомимся с числом 3", "Пишем число 3", "Порядок чисел 1, 2 и 3", "Четыре предмета – число 4",
    "Знакомимся с числом 4", "Пишем число 4", "Состав числа 4", "Пять предметов – число 5", "Знакомимся с числом 5", "Пишем число 5",
    "Состав числа 5", "Числа от 1 до 5", "Повторение: числа от 1 до 5", "Больше, меньше или поровну", "Сравниваем числа", "Числовой ряд",
    "Моя проверка чисел",
  ], [
    "A journey into the world of math", "Things around us", "Colours of objects", "Shapes of objects", "Size of objects", "Big and small objects",
    "Long and short objects", "Tall and short objects", "Heavy and light objects", "Thick and thin objects", "Wide and narrow objects",
    "Find identical objects", "Find the different object", "Group objects by colour", "Group objects by shape", "Group objects by size",
    "Group objects by two features", "Find the odd one out", "Left and right", "Above and below", "In front of and behind", "Inside and outside",
    "Near and far", "All, some and none", "Logic tasks about objects", "One object – number 1", "Meet the number 1", "We write the number 1",
    "Two things – number 2", "Meet the number 2", "Let’s write number 2", "Let’s compare 1 and 2", "Three things – number 3", "Meet the number 3",
    "Let’s write number 3", "Ordering 1, 2 and 3", "Four things – number 4", "Meet the number 4", "Let’s write number 4", "Parts of 4",
    "Five things – number 5", "Meet the number 5", "Let’s write number 5", "Parts of 5", "Numbers 1 to 5", "Review 1 to 5", "More, fewer or equal",
    "Compare numbers", "Number line", "My number test",
  ], 3);

  // ---------- Rus tili: Zukko Russian Pathway 1, 2-qism (51–100-mavzular) ----------
  const RU2 = mk([
    "Моя школа", "Мой класс", "Мой учитель", "Мои друзья", "Моя парта", "Мой стул в школе", "Моя книга", "Моя тетрадь", "Мой карандаш", "Моя ручка",
    "Мой ластик", "Моя линейка", "Мой школьный портфель", "Я поднимаю руку", "Я слушаю на уроке", "Я сижу красиво", "Я делюсь своими вещами",
    "Я помогаю другу", "Мы читаем вместе", "Мы пишем вместе", "Мы считаем вместе", "Мы рисуем вместе", "Школьный звонок",
    "Веселье на игровой площадке", "Я люблю свою школу", "Моё Тело", "Моя Голова", "Мои Глаза", "Мои Уши", "Мой Нос", "Мой Рот", "Мои Руки",
    "Мои Пальцы", "Мои Ноги", "Мои ступни", "Я мою руки", "Я чищу зубы", "Я расчёсываю волосы", "Я принимаю ванну", "Чистая одежда", "Здоровая еда",
    "Фрукты полезны", "Овощи полезны", "Я пью воду", "Я рано ложусь спать", "Я рано просыпаюсь", "Я делаю зарядку", "Я бегаю и прыгаю",
    "Я чувствую себя счастливым", "Я здоров",
  ], [
    "Mening maktabim", "Mening sinfim", "Mening ustozim", "Mening do‘stlarim", "Mening partam", "Maktabdagi stulim", "Mening kitobim",
    "Mening daftarim", "Mening qalamim", "Mening ruchkam", "Mening o‘chirg‘ichim", "Mening chizg‘ichim", "Mening maktab sumkam",
    "Men qo‘l ko‘taraman", "Men darsda tinglayman", "Men chiroyli o‘tiraman", "Men narsalarimni baham ko‘raman", "Men do‘stimga yordam beraman",
    "Biz birga o‘qiymiz", "Biz birga yozamiz", "Biz birga sanaymiz", "Biz birga rasm chizamiz", "Maktab qo‘ng‘irog‘i",
    "O‘yin maydonchasidagi quvnoqlik", "Men maktabimni yaxshi ko‘raman", "Mening tanam", "Mening boshim", "Mening ko‘zlarim", "Mening quloqlarim",
    "Mening burnim", "Mening og‘zim", "Mening qo‘llarim", "Mening barmoqlarim", "Mening oyoqlarim", "Mening oyoq panjalarim",
    "Men qo‘llarimni yuvaman", "Men tishlarimni tozalayman", "Men sochimni tarayman", "Men vannada yuvinaman", "Toza kiyim", "Foydali ovqat",
    "Mevalar foydali", "Sabzavotlar foydali", "Men suv ichaman", "Men erta uxlashga yotaman", "Men erta uyg‘onaman", "Men badantarbiya qilaman",
    "Men yuguraman va sakrayman", "Men o‘zimni baxtli his qilaman", "Men sog‘lomman",
  ], [
    "Моя школа", "Мой класс", "Мой учитель", "Мои друзья", "Моя парта", "Мой стул в школе", "Моя книга", "Моя тетрадь", "Мой карандаш", "Моя ручка",
    "Мой ластик", "Моя линейка", "Мой школьный портфель", "Я поднимаю руку", "Я слушаю на уроке", "Я сижу красиво", "Я делюсь своими вещами",
    "Я помогаю другу", "Мы читаем вместе", "Мы пишем вместе", "Мы считаем вместе", "Мы рисуем вместе", "Школьный звонок",
    "Веселье на игровой площадке", "Я люблю свою школу", "Моё тело", "Моя голова", "Мои глаза", "Мои уши", "Мой нос", "Мой рот", "Мои руки",
    "Мои пальцы", "Мои ноги", "Мои ступни", "Я мою руки", "Я чищу зубы", "Я расчёсываю волосы", "Я принимаю ванну", "Чистая одежда", "Здоровая еда",
    "Фрукты полезны", "Овощи полезны", "Я пью воду", "Я рано ложусь спать", "Я рано просыпаюсь", "Я делаю зарядку", "Я бегаю и прыгаю",
    "Я чувствую себя счастливым", "Я здоров",
  ], [
    "My school", "My classroom", "My teacher", "My friends", "My desk", "My chair at school", "My book", "My notebook", "My pencil", "My pen",
    "My eraser", "My ruler", "My school bag", "I raise my hand", "I listen in class", "I sit nicely", "I share my things", "I help my friend",
    "We read together", "We write together", "We count together", "We draw together", "The school bell", "Fun on the playground", "I love my school",
    "My body", "My head", "My eyes", "My ears", "My nose", "My mouth", "My hands", "My fingers", "My legs", "My feet", "I wash my hands",
    "I brush my teeth", "I comb my hair", "I take a bath", "Clean clothes", "Healthy food", "Fruit is healthy", "Vegetables are healthy",
    "I drink water", "I go to bed early", "I wake up early", "I do morning exercises", "I run and jump", "I feel happy", "I am healthy",
  ], 105, { 8: [120, 119], 44: [192, 191], 45: [194, 193] }); // darslikda bu mavzular sahifalari almashib qolgan

  // ---------- Rus tili: Zukko Russian Pathway 1, 3-qism (101–150-mavzular) ----------
  const RU3 = mk([
    "Животные вокруг меня", "Моя кошка", "Моя собака", "Маленький щенок", "Маленький котёнок", "Корова", "Овца", "Коза", "Лошадь", "Ослик", "Курица",
    "Петух", "Утка", "Птица", "Рыба", "Кролик", "Пчела", "Бабочка", "Лягушка", "Черепаха", "Лев", "Слон", "Обезьяна", "Будь добр к животным",
    "Животным нужна забота", "Природа вокруг меня", "Солнце", "Луна", "Звёзды", "Небо", "Облака", "Дождь", "Снег", "Ветер", "Вода", "Дерево",
    "Цветок", "Зелёная трава", "Лист", "Сад", "Фрукты на деревьях", "Цветы весной", "Жаркое лето", "Жёлтая осень", "Холодная зима", "Я люблю дождь",
    "Я вижу радугу", "Мы сажаем дерево", "Сохраняем природу чистой", "Природа — наш друг",
  ], [
    "Atrofimdagi hayvonlar", "Mening mushugim", "Mening itim", "Kichkina kuchukcha", "Kichkina mushukcha", "Sigir", "Qo‘y", "Echki", "Ot",
    "Eshakcha", "Tovuq", "Xo‘roz", "O‘rdak", "Qush", "Baliq", "Quyon", "Asalari", "Kapalak", "Qurbaqa", "Toshbaqa", "Sher", "Fil", "Maymun",
    "Hayvonlarga mehribon bo‘l", "Hayvonlarga g‘amxo‘rlik kerak", "Atrofimdagi tabiat", "Quyosh", "Oy", "Yulduzlar", "Osmon", "Bulutlar", "Yomg‘ir",
    "Qor", "Shamol", "Suv", "Daraxt", "Gul", "Yashil o‘t", "Barg", "Bog‘", "Daraxtlardagi mevalar", "Bahorda gullar", "Issiq yoz", "Sariq kuz",
    "Sovuq qish", "Men yomg‘irni yaxshi ko‘raman", "Men kamalakni ko‘ryapman", "Biz daraxt ekamiz", "Tabiatni toza saqlaymiz",
    "Tabiat — bizning do‘stimiz",
  ], [
    "Животные вокруг меня", "Моя кошка", "Моя собака", "Маленький щенок", "Маленький котёнок", "Корова", "Овца", "Коза", "Лошадь", "Ослик", "Курица",
    "Петух", "Утка", "Птица", "Рыба", "Кролик", "Пчела", "Бабочка", "Лягушка", "Черепаха", "Лев", "Слон", "Обезьяна", "Будь добр к животным",
    "Животным нужна забота", "Природа вокруг меня", "Солнце", "Луна", "Звёзды", "Небо", "Облака", "Дождь", "Снег", "Ветер", "Вода", "Дерево",
    "Цветок", "Зелёная трава", "Лист", "Сад", "Фрукты на деревьях", "Цветы весной", "Жаркое лето", "Жёлтая осень", "Холодная зима", "Я люблю дождь",
    "Я вижу радугу", "Мы сажаем дерево", "Сохраняем природу чистой", "Природа — наш друг",
  ], [
    "Animals around me", "My cat", "My dog", "A little puppy", "A little kitten", "The cow", "The sheep", "The goat", "The horse",
    "The little donkey", "The hen", "The rooster", "The duck", "The bird", "The fish", "The rabbit", "The bee", "The butterfly", "The frog",
    "The tortoise", "The lion", "The elephant", "The monkey", "Be kind to animals", "Animals need care", "Nature around me", "The sun", "The moon",
    "Stars", "The sky", "Clouds", "Rain", "Snow", "The wind", "Water", "The tree", "The flower", "Green grass", "The leaf", "The garden",
    "Fruit on the trees", "Flowers in spring", "Hot summer", "Yellow autumn", "Cold winter", "I love rain", "I see a rainbow", "We plant a tree",
    "We keep nature clean", "Nature is our friend",
  ], 205);

  // ---------- Rus tili: Zukko Russian Pathway 1, 4-qism (151–200-mavzular) ----------
  const RU4 = mk([
    "Моя еда", "Хлеб", "Вода", "Молоко", "Чай", "Суп", "Рис", "Яблоко", "Банан", "Апельсин", "Виноград", "Морковь", "Картофель", "Помидор", "Огурец",
    "Сладкий и кислый", "Горячий и холодный", "Красный", "Синий", "Жёлтый", "Зелёный", "Белый и чёрный", "Большой и маленький", "Длинный и короткий",
    "Мой любимый цвет", "Люди помогают нам", "Мой учитель", "Доктор", "Медсестра", "Водитель", "Фермер", "Пекарь", "Повар", "Уборщик", "Строитель",
    "Полицейский", "Пожарный", "Продавец", "Портной", "Парикмахер", "Садовник", "Почтальон", "Библиотекарь", "Музыкант", "Художник", "Дантист",
    "Пилот", "Машинист поезда", "Каждая работа важна", "Я хочу стать…",
  ], [
    "Mening ovqatim", "Non", "Suv", "Sut", "Choy", "Sho‘rva", "Guruch", "Olma", "Banan", "Apelsin", "Uzum", "Sabzi", "Kartoshka", "Pomidor",
    "Bodring", "Shirin va nordon", "Issiq va sovuq", "Qizil", "Ko‘k", "Sariq", "Yashil", "Oq va qora", "Katta va kichik", "Uzun va qisqa",
    "Mening sevimli rangim", "Odamlar bizga yordam beradi", "Mening o‘qituvchim", "Shifokor", "Hamshira", "Haydovchi", "Dehqon", "Nonvoy", "Oshpaz",
    "Farrosh", "Quruvchi", "Politsiyachi", "O‘t o‘chiruvchi", "Sotuvchi", "Tikuvchi", "Sartarosh", "Bog‘bon", "Pochtachi", "Kutubxonachi",
    "Musiqachi", "Rassom", "Tish shifokori", "Uchuvchi", "Poyezd mashinisti", "Har bir ish muhim", "Men … bo‘lishni xohlayman",
  ], [
    "Моя еда", "Хлеб", "Вода", "Молоко", "Чай", "Суп", "Рис", "Яблоко", "Банан", "Апельсин", "Виноград", "Морковь", "Картофель", "Помидор", "Огурец",
    "Сладкий и кислый", "Горячий и холодный", "Красный", "Синий", "Жёлтый", "Зелёный", "Белый и чёрный", "Большой и маленький", "Длинный и короткий",
    "Мой любимый цвет", "Люди помогают нам", "Мой учитель", "Доктор", "Медсестра", "Водитель", "Фермер", "Пекарь", "Повар", "Уборщик", "Строитель",
    "Полицейский", "Пожарный", "Продавец", "Портной", "Парикмахер", "Садовник", "Почтальон", "Библиотекарь", "Музыкант", "Художник", "Дантист",
    "Пилот", "Машинист поезда", "Каждая работа важна", "Я хочу стать…",
  ], [
    "My food", "Bread", "Water", "Milk", "Tea", "Soup", "Rice", "Apple", "Banana", "Orange", "Grapes", "Carrot", "Potato", "Tomato", "Cucumber",
    "Sweet and sour", "Hot and cold", "Red", "Blue", "Yellow", "Green", "White and black", "Big and small", "Long and short", "My favourite colour",
    "People help us", "My teacher", "Doctor", "Nurse", "Driver", "Farmer", "Baker", "Cook", "Cleaner", "Builder", "Police officer", "Firefighter",
    "Shop assistant", "Tailor", "Hairdresser", "Gardener", "Postman", "Librarian", "Musician", "Artist", "Dentist", "Pilot", "Train driver",
    "Every job is important", "I want to be…",
  ], 55);

  const G = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const LIST = [
    { id: 'chem', name: { uz: 'Kimyo', en: 'Chemistry', ru: 'Химия' }, color: '#00555a', icon: '⚗️', grades: [6, 7, 8], native: true, home: '#kimyo' },
    { id: 'math', name: { uz: 'Matematika', en: 'Mathematics', ru: 'Математика' }, color: '#2563eb', icon: '➗', grades: G(1, 11), books: [
      { grade: 1, part: 1, lang: 'en', title: 'Mathematics Grade 1 · Part 1', file: '1-qism_ingliz.pdf', offset: 0,
        units: [{ t: { orig: 'Chapter 1. Objects, Features and Logical Grouping', uz: '1-bob. Narsalar, belgilar va mantiqiy guruhlash' }, from: 1 },
                { t: { orig: 'Chapter 2. Numbers from 1 to 5', uz: '2-bob. 1 dan 5 gacha sonlar' }, from: 26 }], topics: MA1 },
    ] },
    { id: 'eng', name: { uz: 'Ingliz tili', en: 'English', ru: 'Английский язык' }, color: '#dc2626', icon: '🔤', grades: G(1, 11), speech: 'en-GB', books: [
      { grade: 1, part: 1, lang: 'en', title: 'Zukko English Pathway 1 · Part 1', file: 'Part_1.pdf', offset: 2,
        units: [{ t: { orig: 'Unit 1 — My Family', uz: '1-bo‘lim — Mening oilam' }, from: 1 }, { t: { orig: 'Unit 2 — My Home', uz: '2-bo‘lim — Mening uyim' }, from: 26 }], topics: EN1 },
    ] },
    { id: 'rus', name: { uz: 'Rus tili', en: 'Russian', ru: 'Русский язык' }, color: '#7c3aed', icon: '🅰️', grades: G(1, 11), speech: 'ru-RU', books: [
      { grade: 1, part: 1, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 1', file: '1-qism.pdf', offset: 2,
        units: [{ t: { orig: 'Раздел 1. Моя семья', uz: '1-bo‘lim. Mening oilam' }, from: 1 }, { t: { orig: 'Раздел 2. Мой дом', uz: '2-bo‘lim. Mening uyim' }, from: 26 }], topics: RU1 },
      { grade: 1, part: 2, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 2', file: '1-sinf_Russian_Patway_часть-2_1.pdf', offset: 102, first: 51,
        units: [{ t: { orig: "Раздел 3. Моя школа", uz: "3-bo‘lim. Mening maktabim" }, from: 1 }, { t: { orig: "Раздел 4. Моё тело и здоровье", uz: "4-bo‘lim. Mening tanam va sog‘ligim" }, from: 26 }], topics: RU2 },
      { grade: 1, part: 3, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 3', file: '1-sinf_Russian_Patway_часть-3_1.pdf', offset: 202, first: 101,
        units: [{ t: { orig: "Раздел 5. Животные вокруг меня", uz: "5-bo‘lim. Atrofimdagi hayvonlar" }, from: 1 }, { t: { orig: "Раздел 6. Природа вокруг меня", uz: "6-bo‘lim. Atrofimdagi tabiat" }, from: 26 }], topics: RU3 },
      { grade: 1, part: 4, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 4', file: '1-sinf_Russian_Patway_часть-4_1.pdf', offset: 52, first: 151,
        units: [{ t: { orig: "Раздел 7. Еда, цвета и предметы", uz: "7-bo‘lim. Ovqat, ranglar va buyumlar" }, from: 1 }, { t: { orig: "Раздел 8. Люди и профессии", uz: "8-bo‘lim. Odamlar va kasblar" }, from: 26 }], topics: RU4 },
    ] },
  ];
  const byId = {}; LIST.forEach((s) => { byId[s.id] = s; });
  const api = {
    list: LIST,
    get: (id) => byId[id] || null,
    // sinfdagi kitoblar (qismlar tartibida)
    books: (id, grade) => ((byId[id] && byId[id].books) || []).filter((b) => b.grade === grade).sort((a, b) => a.part - b.part),
    book: (id, grade, part) => ((byId[id] && byId[id].books) || []).find((b) => b.grade === grade && b.part === part) || null,
    ids: LIST.map((s) => s.id),
  };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else window.ZKSubjects = api;
})();
