import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import ZodiacSignCalculator from './ZodiacSignCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Zodiac Sign Calculator — Find Your Star Sign by Birth Date', description: 'Find your zodiac sign by birth date instantly. Get your star sign symbol, element, ruling planet and personality description. Free astrology tool for all 12 signs.', h1: 'Zodiac Sign Calculator' },
  ru: { title: 'Калькулятор знака зодиака — определить по дате рождения', description: 'Определите знак зодиака по дате рождения бесплатно. Узнайте символ, элемент, планету-покровитель и описание своего знака. Бесплатный астрологический инструмент.', h1: 'Калькулятор знака зодиака' },
  uk: { title: 'Калькулятор знаку зодіаку — визначити за датою народження', description: 'Визначте знак зодіаку за датою народження безкоштовно. Дізнайтеся символ, елемент, планету-покровительку та опис свого знаку. Безкоштовний астрологічний інструмент.', h1: 'Калькулятор знаку зодіаку' },
  fr: { title: 'Calculateur de Signe du Zodiaque — Trouvez votre signe', description: 'Trouvez votre signe du zodiaque par date de naissance. Obtenez votre symbole, élément, planète maîtresse et description de personnalité. Outil astrologique gratuit pour les 12 signes.', h1: 'Calculateur de Signe du Zodiaque' },
  lt: { title: 'Zodiako ženklo skaičiuotuvas — raskite savo ženklą', description: 'Raskite savo zodiako ženklą pagal gimimo datą. Gaukite savo simbolį, elementą, valdančią planetą ir asmenybės aprašymą. Nemokamas astrologijos įrankis visiems 12 ženklų.', h1: 'Zodiako ženklo skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Your zodiac sign, also called your sun sign or star sign, is determined by the position of the Sun at the moment of your birth — specifically by which of the twelve zodiac constellations the Sun was passing through. The Western zodiac divides the year into twelve equal segments, each governed by one of the twelve signs: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces. Each sign has a unique element (Fire, Earth, Air or Water), a ruling planet, a symbol and a distinctive set of personality traits that have been observed and documented across thousands of years of astrological tradition.\n\nWhile your sun sign is the most widely known part of your astrological profile, it represents just one layer of a much richer picture. It reflects your ego, identity and the core drives that motivate you in life. Many people find that their sun sign resonates powerfully with their sense of self, even if they differ in some traits from the traditional description. Use this tool to instantly identify your sign, element and ruling planet — and explore what the ancient tradition of astrology says about your essential nature.',
    faqTitle: 'Frequently Asked Questions about Zodiac Signs',
    faqs: [
      { q: 'How do I find my zodiac sign?', a: 'Your zodiac sign is determined by your date of birth. Each sign corresponds to a specific range of dates in the year. Enter your birth date in the calculator above and your sign will be identified instantly, along with its symbol, element and ruling planet.' },
      { q: 'What are the 12 zodiac signs and their dates?', a: 'Aries (Mar 21–Apr 19), Taurus (Apr 20–May 20), Gemini (May 21–Jun 20), Cancer (Jun 21–Jul 22), Leo (Jul 23–Aug 22), Virgo (Aug 23–Sep 22), Libra (Sep 23–Oct 22), Scorpio (Oct 23–Nov 21), Sagittarius (Nov 22–Dec 21), Capricorn (Dec 22–Jan 19), Aquarius (Jan 20–Feb 18), Pisces (Feb 19–Mar 20).' },
      { q: 'What are the four elements of the zodiac?', a: 'The twelve signs are grouped into four elements: Fire (Aries, Leo, Sagittarius) — passionate and energetic; Earth (Taurus, Virgo, Capricorn) — practical and grounded; Air (Gemini, Libra, Aquarius) — intellectual and communicative; Water (Cancer, Scorpio, Pisces) — emotional and intuitive.' },
      { q: 'What is the difference between a sun sign and a moon sign?', a: 'Your sun sign is determined by the position of the Sun at your birth and represents your core identity. Your moon sign is determined by the Moon\'s position and represents your emotional nature and inner world. For a complete astrological profile, many people also consider their rising sign (ascendant).' },
      { q: 'What is a cusp sign in astrology?', a: 'A cusp sign refers to being born on or near the boundary between two zodiac signs (typically within a day or two of the transition date). In Western astrology, the Sun is technically in only one sign at any given moment, so your birth date precisely determines your sign — but people born near the boundary may relate to traits of both adjacent signs.' },
      { q: 'Which zodiac signs are most compatible?', a: 'Generally, signs of the same element tend to be highly compatible: Fire with Fire, Earth with Earth, Air with Air, Water with Water. Signs in complementary elements also pair well — Fire and Air, Earth and Water. Opposite signs (Aries–Libra, Taurus–Scorpio, etc.) can experience powerful attraction through their differences.' },
      { q: 'What does my ruling planet mean?', a: 'Each zodiac sign is governed by a ruling planet that influences the sign\'s energy and themes. For example, Mars rules Aries (action, drive), Venus rules Taurus and Libra (beauty, love), Mercury rules Gemini and Virgo (communication, intellect). The ruling planet adds a layer of archetypal meaning to the sign\'s character.' },
      { q: 'Can two people born under the same zodiac sign be compatible?', a: 'Yes. Two people with the same sun sign often share core values, communication styles and life priorities, which can create strong natural understanding. However, full compatibility is determined by the complete birth chart, not just the sun sign, so same-sign couples can range from deeply harmonious to challenging.' },
      { q: 'How often do zodiac sign dates change?', a: 'The Sun enters each sign at slightly different times each year due to astronomical factors, meaning the exact cusp date can shift by a day. This is why someone born on the 20th or 21st of a transition month should check the exact cusp time for their birth year if they are unsure of their sign.' },
      { q: 'Is Western astrology the same as Vedic astrology?', a: 'No. Western astrology uses the Tropical zodiac, which is based on the seasons and fixed to the vernal equinox. Vedic (Jyotish) astrology uses the Sidereal zodiac, which is aligned with the actual constellations and currently sits about 23 degrees behind the Tropical zodiac. Most people\'s Vedic sun sign is one sign earlier than their Western sign.' },
      { q: 'What is the most powerful zodiac sign?', a: 'Power in astrology is not ranked by sign but by the strength of the full birth chart. Every sign has unique strengths: Aries and Leo lead and inspire, Scorpio transforms and endures, Capricorn and Taurus build and persist, and so on. Each sign expresses a different archetype of power.' },
    ],
  },
  ru: {
    description: 'Ваш знак зодиака, также называемый солнечным знаком, определяется положением Солнца в момент вашего рождения — конкретно тем, через какое из двенадцати зодиакальных созвездий проходило Солнце. Западный зодиак делит год на двенадцать равных сегментов, каждый из которых управляется одним из двенадцати знаков. Каждый знак имеет уникальный элемент (Огонь, Земля, Воздух или Вода), планету-покровителя, символ и отличительный набор черт личности.\n\nХотя солнечный знак является наиболее известной частью астрологического профиля, он представляет лишь один из пластов богатой картины. Он отражает ваше эго, идентичность и основные стремления, мотивирующие вас в жизни. Многие люди обнаруживают, что их солнечный знак сильно перекликается с их ощущением себя.',
    faqTitle: 'Часто задаваемые вопросы о знаках зодиака',
    faqs: [
      { q: 'Как определить свой знак зодиака?', a: 'Ваш знак зодиака определяется датой рождения. Каждый знак соответствует определённому диапазону дат в году. Введите дату рождения в калькулятор выше, и ваш знак будет определён мгновенно вместе с символом, элементом и планетой-покровителем.' },
      { q: 'Каковы даты всех 12 знаков зодиака?', a: 'Овен (21 марта–19 апреля), Телец (20 апреля–20 мая), Близнецы (21 мая–20 июня), Рак (21 июня–22 июля), Лев (23 июля–22 августа), Дева (23 августа–22 сентября), Весы (23 сентября–22 октября), Скорпион (23 октября–21 ноября), Стрелец (22 ноября–21 декабря), Козерог (22 декабря–19 января), Водолей (20 января–18 февраля), Рыбы (19 февраля–20 марта).' },
      { q: 'Что такое четыре элемента зодиака?', a: 'Двенадцать знаков сгруппированы по четырём элементам: Огонь (Овен, Лев, Стрелец) — страстные и энергичные; Земля (Телец, Дева, Козерог) — практичные и приземлённые; Воздух (Близнецы, Весы, Водолей) — интеллектуальные и общительные; Вода (Рак, Скорпион, Рыбы) — эмоциональные и интуитивные.' },
      { q: 'В чём разница между солнечным и лунным знаком?', a: 'Солнечный знак определяется положением Солнца при вашем рождении и представляет вашу основную идентичность. Лунный знак определяется положением Луны и представляет вашу эмоциональную природу и внутренний мир.' },
      { q: 'Что такое знак-куспид в астрологии?', a: 'Знак-куспид означает рождение вблизи границы между двумя знаками зодиака. В западной астрологии Солнце технически находится только в одном знаке, поэтому дата рождения точно определяет ваш знак, но люди, рождённые вблизи границы, могут ощущать черты обоих знаков.' },
      { q: 'Какие знаки зодиака наиболее совместимы?', a: 'Как правило, знаки одного элемента хорошо совместимы: Огонь с Огнём, Земля с Землёй, Воздух с Воздухом, Вода с Водой. Знаки дополнительных элементов также хорошо сочетаются: Огонь и Воздух, Земля и Вода.' },
      { q: 'Что означает моя планета-покровитель?', a: 'Каждый знак зодиака управляется планетой-покровителем, влияющей на энергию знака. Например, Марс управляет Овном (действие, стремление), Венера управляет Тельцом и Весами (красота, любовь), Меркурий управляет Близнецами и Девой (общение, интеллект).' },
      { q: 'Могут ли два человека с одним знаком зодиака быть совместимы?', a: 'Да. Два человека с одним солнечным знаком часто разделяют основные ценности и стили общения, что может создавать сильное естественное понимание. Полная совместимость определяется всей картой рождения, а не только солнечным знаком.' },
      { q: 'Как часто меняются даты знаков зодиака?', a: 'Солнце входит в каждый знак в немного разное время каждый год из-за астрономических факторов, поэтому точная дата перехода может сдвинуться на день. Если вы родились около 20-21-го числа, проверьте точное время перехода для вашего года рождения.' },
      { q: 'Одинаковы ли западная и ведическая астрология?', a: 'Нет. Западная астрология использует тропический зодиак, основанный на временах года. Ведическая (джйотиш) астрология использует сидерический зодиак, выровненный по реальным созвездиям. Ведический солнечный знак большинства людей на один знак ранее западного.' },
    ],
  },
  uk: {
    description: 'Ваш знак зодіаку, також відомий як сонячний знак, визначається положенням Сонця в момент вашого народження. Західний зодіак ділить рік на дванадцять рівних сегментів, кожен з яких управляється одним із дванадцяти знаків. Кожен знак має унікальний елемент (Вогонь, Земля, Повітря або Вода), планету-покровительку, символ та відмінний набір рис особистості.\n\nХоча сонячний знак є найбільш відомою частиною астрологічного профілю, він відображає лише один пласт складної картини. Він відображає ваше его, ідентичність та основні прагнення, що мотивують вас у житті. Багато людей виявляють, що їхній сонячний знак сильно перегукується з їхнім відчуттям себе.',
    faqTitle: 'Поширені запитання про знаки зодіаку',
    faqs: [
      { q: 'Як визначити свій знак зодіаку?', a: 'Ваш знак зодіаку визначається датою народження. Кожен знак відповідає певному діапазону дат у році. Введіть дату народження в калькулятор вище, і ваш знак буде визначений миттєво.' },
      { q: 'Які дати всіх 12 знаків зодіаку?', a: 'Овен (21 березня–19 квітня), Телець (20 квітня–20 травня), Близнюки (21 травня–20 червня), Рак (21 червня–22 липня), Лев (23 липня–22 серпня), Діва (23 серпня–22 вересня), Терези (23 вересня–22 жовтня), Скорпіон (23 жовтня–21 листопада), Стрілець (22 листопада–21 грудня), Козеріг (22 грудня–19 січня), Водолій (20 січня–18 лютого), Риби (19 лютого–20 березня).' },
      { q: 'Що таке чотири елементи зодіаку?', a: 'Дванадцять знаків згруповані за чотирма елементами: Вогонь (Овен, Лев, Стрілець) — пристрасні та енергійні; Земля (Телець, Діва, Козеріг) — практичні та заземлені; Повітря (Близнюки, Терези, Водолій) — інтелектуальні та комунікабельні; Вода (Рак, Скорпіон, Риби) — емоційні та інтуїтивні.' },
      { q: 'У чому різниця між сонячним і місячним знаком?', a: 'Сонячний знак визначається положенням Сонця при вашому народженні і представляє вашу основну ідентичність. Місячний знак визначається положенням Місяця і представляє вашу емоційну природу та внутрішній світ.' },
      { q: 'Що таке знак-куспід в астрології?', a: 'Знак-куспід означає народження поблизу межі між двома знаками зодіаку. Якщо ви народилися близько 20-21 числа місяця переходу, рекомендується перевірити точний час переходу для вашого року народження.' },
      { q: 'Які знаки зодіаку найбільш сумісні?', a: 'Як правило, знаки одного елементу добре сумісні: Вогонь з Вогнем, Земля із Землею, Повітря з Повітрям, Вода з Водою. Знаки додаткових елементів також добре поєднуються: Вогонь і Повітря, Земля і Вода.' },
      { q: 'Що означає моя планета-покровителька?', a: 'Кожен знак зодіаку управляється планетою-покровителькою, що впливає на енергію знаку. Наприклад, Марс управляє Овном (дія, прагнення), Венера управляє Тельцем і Терезами (краса, любов), Меркурій управляє Близнюками і Дівою (спілкування, інтелект).' },
      { q: 'Чи можуть двоє з однаковим знаком зодіаку бути сумісними?', a: 'Так. Два людини з однаковим сонячним знаком часто поділяють основні цінності і стилі спілкування. Повна сумісність визначається всією картою народження, а не лише сонячним знаком.' },
      { q: 'Як часто змінюються дати знаків зодіаку?', a: 'Сонце входить у кожен знак у дещо різний час щороку через астрономічні фактори, тому точна дата переходу може зміститися на день.' },
      { q: 'Однакові чи Західна і Ведична астрологія?', a: 'Ні. Західна астрологія використовує тропічний зодіак, заснований на порах року. Ведична (Джйотіш) астрологія використовує сидеричний зодіак, вирівняний по реальних сузір\'ях. Ведичний сонячний знак більшості людей на один знак раніший за Західний.' },
    ],
  },
  fr: {
    description: 'Votre signe du zodiaque, également appelé signe solaire, est déterminé par la position du Soleil au moment de votre naissance — spécifiquement par quelle constellation zodiacale le Soleil traversait. Le zodiaque occidental divise l\'année en douze segments égaux, chacun gouverné par l\'un des douze signes. Chaque signe possède un élément unique (Feu, Terre, Air ou Eau), une planète maîtresse, un symbole et un ensemble distinctif de traits de personnalité documentés sur des millénaires d\'observation.\n\nBien que votre signe solaire soit la partie la plus connue de votre profil astrologique, il ne représente qu\'une couche d\'un tableau beaucoup plus riche. Il reflète votre ego, votre identité et les motivations fondamentales qui vous animent. Beaucoup de personnes trouvent que leur signe solaire résonne puissamment avec leur sens de soi.',
    faqTitle: 'Questions fréquentes sur les signes du zodiaque',
    faqs: [
      { q: 'Comment trouver mon signe du zodiaque ?', a: 'Votre signe du zodiaque est déterminé par votre date de naissance. Chaque signe correspond à une plage de dates spécifique dans l\'année. Entrez votre date de naissance dans le calculateur ci-dessus et votre signe sera identifié instantanément.' },
      { q: 'Quelles sont les dates des 12 signes du zodiaque ?', a: 'Bélier (21 mars–19 avril), Taureau (20 avril–20 mai), Gémeaux (21 mai–20 juin), Cancer (21 juin–22 juillet), Lion (23 juillet–22 août), Vierge (23 août–22 septembre), Balance (23 sept–22 oct), Scorpion (23 oct–21 nov), Sagittaire (22 nov–21 déc), Capricorne (22 déc–19 jan), Verseau (20 jan–18 fév), Poissons (19 fév–20 mars).' },
      { q: 'Quels sont les quatre éléments du zodiaque ?', a: 'Les douze signes sont regroupés en quatre éléments : Feu (Bélier, Lion, Sagittaire) — passionnés et énergiques ; Terre (Taureau, Vierge, Capricorne) — pratiques et ancrés ; Air (Gémeaux, Balance, Verseau) — intellectuels et communicatifs ; Eau (Cancer, Scorpion, Poissons) — émotionnels et intuitifs.' },
      { q: 'Quelle est la différence entre le signe solaire et le signe lunaire ?', a: 'Le signe solaire est déterminé par la position du Soleil à votre naissance et représente votre identité centrale. Le signe lunaire est déterminé par la position de la Lune et représente votre nature émotionnelle et votre monde intérieur.' },
      { q: 'Qu\'est-ce qu\'un signe de cuspide en astrologie ?', a: 'Un signe de cuspide désigne une naissance à la limite entre deux signes du zodiaque. En astrologie occidentale, le Soleil se trouve techniquement dans un seul signe à la fois, donc votre date de naissance détermine précisément votre signe.' },
      { q: 'Quels signes du zodiaque sont les plus compatibles ?', a: 'En général, les signes du même élément sont très compatibles : Feu avec Feu, Terre avec Terre, Air avec Air, Eau avec Eau. Les éléments complémentaires s\'entendent aussi bien : Feu et Air, Terre et Eau.' },
      { q: 'Que signifie ma planète maîtresse ?', a: 'Chaque signe est gouverné par une planète maîtresse qui influence l\'énergie du signe. Par exemple, Mars règne sur le Bélier (action, dynamisme), Vénus sur le Taureau et la Balance (beauté, amour), Mercure sur les Gémeaux et la Vierge (communication, intellect).' },
      { q: 'Deux personnes sous le même signe peuvent-elles être compatibles ?', a: 'Oui. Deux personnes sous le même signe solaire partagent souvent des valeurs fondamentales et des styles de communication, ce qui crée une compréhension naturelle. La compatibilité complète dépend du thème natal entier.' },
      { q: 'À quelle fréquence les dates des signes changent-elles ?', a: 'Le Soleil entre dans chaque signe à des moments légèrement différents chaque année en raison de facteurs astronomiques. La date exacte de transition peut varier d\'un jour, surtout pour les personnes nées le 20 ou 21 d\'un mois de transition.' },
      { q: 'L\'astrologie occidentale est-elle la même que l\'astrologie védique ?', a: 'Non. L\'astrologie occidentale utilise le zodiaque tropical, basé sur les saisons. L\'astrologie védique (Jyotish) utilise le zodiaque sidéral, aligné sur les constellations réelles. Le signe solaire védique de la plupart des gens est un signe en avance sur leur signe occidental.' },
    ],
  },
  lt: {
    description: 'Jūsų zodiako ženklas, taip pat vadinamas saulės ženklu, nustatomas pagal Saulės padėtį jūsų gimimo metu — konkrečiai pagal tai, kurią iš dvylikos zodiako žvaigždynų Saulė perėjo. Vakarų zodiako astrologija dalija metus į dvylika lygių segmentų, kiekvieną valdant vienam iš dvylikos ženklų. Kiekvienas ženklas turi unikalų elementą (Ugnis, Žemė, Oras ar Vanduo), valdančią planetą, simbolį ir unikalų asmenybės bruožų rinkinį.\n\nNors jūsų saulės ženklas yra labiausiai žinoma astrologinio profilio dalis, jis atspindi tik vieną iš daugelio paveikslą sudarančių sluoksnių. Jis atspindi jūsų ego, tapatybę ir pagrindinius motyvus, skatinančius jus gyvenime. Daugelis žmonių atranda, kad jų saulės ženklas stipriai rezonuoja su savęs jautimu.',
    faqTitle: 'Dažnai užduodami klausimai apie zodiako ženklus',
    faqs: [
      { q: 'Kaip sužinoti savo zodiako ženklą?', a: 'Jūsų zodiako ženklas nustatomas pagal jūsų gimimo datą. Kiekvienas ženklas atitinka specifinį datų diapazoną metuose. Įveskite savo gimimo datą aukščiau esančiame skaičiuotuve ir jūsų ženklas bus nustatytas akimirksniu.' },
      { q: 'Kokios yra 12 zodiako ženklų datos?', a: 'Avinas (kovo 21–balandžio 19), Jautis (balandžio 20–gegužės 20), Dvyniai (gegužės 21–birželio 20), Vėžys (birželio 21–liepos 22), Liūtas (liepos 23–rugpjūčio 22), Mergelė (rugpjūčio 23–rugsėjo 22), Svarstyklės (rugsėjo 23–spalio 22), Skorpionas (spalio 23–lapkričio 21), Šaulys (lapkričio 22–gruodžio 21), Ožiaragis (gruodžio 22–sausio 19), Vandenis (sausio 20–vasario 18), Žuvys (vasario 19–kovo 20).' },
      { q: 'Kokie yra keturi zodiako elementai?', a: 'Dvylika ženklų sugrupuoti į keturis elementus: Ugnis (Avinas, Liūtas, Šaulys) — aistringi ir energingi; Žemė (Jautis, Mergelė, Ožiaragis) — praktiški ir žemiški; Oras (Dvyniai, Svarstyklės, Vandenis) — intelektualūs ir komunikabilūs; Vanduo (Vėžys, Skorpionas, Žuvys) — emocingi ir intuityvūs.' },
      { q: 'Koks skirtumas tarp saulės ir mėnulio ženklo?', a: 'Saulės ženklas nustatomas pagal Saulės padėtį jūsų gimimo metu ir atspindi pagrindinę jūsų tapatybę. Mėnulio ženklas nustatomas pagal Mėnulio padėtį ir atspindi jūsų emocinę prigimtį bei vidinį pasaulį.' },
      { q: 'Kas yra kuspidinis ženklas astrologijoje?', a: 'Kuspidinis ženklas reiškia gimimą prie dviejų zodiako ženklų ribos. Vakarų astrologijoje Saulė techniškai yra tik viename ženkle bet kuriuo momentu, todėl jūsų gimimo data tiksliai nustato jūsų ženklą.' },
      { q: 'Kurie zodiako ženklai labiausiai suderinami?', a: 'Paprastai to paties elemento ženklai yra labai suderinami: Ugnis su Ugnimi, Žemė su Žeme, Oras su Oru, Vanduo su Vandeniu. Papildančių elementų ženklai taip pat derinasi gerai: Ugnis ir Oras, Žemė ir Vanduo.' },
      { q: 'Ką reiškia mano valdančioji planeta?', a: 'Kiekvieną zodiako ženklą valdo planeta, daranti įtaką ženklo energijai. Pavyzdžiui, Marsas valdo Aviną (veiksmas, ryžtingumas), Venera valdo Jautį ir Svarstykles (grožis, meilė), Merkurijus valdo Dvynius ir Mergelę (bendravimas, intelektas).' },
      { q: 'Ar du žmonės su tuo pačiu zodiako ženklu gali būti suderinami?', a: 'Taip. Du žmonės su tuo pačiu saulės ženklu dažnai dalijasi pagrindinėmis vertybėmis ir bendravimo stiliais, kas gali sukurti stiprų natūralų supratimą. Pilnas suderinamumas nustatomas pagal visą gimimo kortą.' },
      { q: 'Kaip dažnai keičiasi zodiako ženklų datos?', a: 'Saulė į kiekvieną ženklą įeina šiek tiek skirtingu laiku kiekvienais metais dėl astronominių veiksnių, todėl tikslus perėjimo laikas gali pasikeisti viena diena.' },
      { q: 'Ar Vakarų astrologija tokia pati kaip Vedos astrologija?', a: 'Ne. Vakarų astrologija naudoja Tropinį zodiaką, pagrįstą sezonais. Vedų (Jyotish) astrologija naudoja Siderinį zodiaką, sulygiuotą su tikrosiomis žvaigždynais. Vedų saulės ženklas daugumai žmonių yra vienu ženklu ankstesnis nei Vakarų ženklas.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/numerology-compatibility', label: 'Numerology Compatibility' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/personal-year', label: 'Personal Year Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/numerology-compatibility', label: 'Совместимость по нумерологии' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/personal-year', label: 'Персональный год' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/numerology-compatibility', label: 'Сумісність за нумерологією' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/personal-year', label: 'Персональний рік' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/numerology-compatibility', label: 'Compatibilité Numérologique' },
    { href: '/calculator/destiny-number', label: 'Nombre de Destinée' },
    { href: '/calculator/personal-year', label: 'Année Personnelle' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/numerology-compatibility', label: 'Numerologinis suderinamumas' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/personal-year', label: 'Asmeniniai metai' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/zodiac-sign', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function ZodiacSignPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/zodiac-sign`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <ToolActions />
        <ZodiacSignCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((f, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{f.q}</h3>
                  <p className={styles.faq__answer}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
