import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MoonSignCalculator from './MoonSignCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/moon-phases', label: 'Moon Phase Calculator' },
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign' },
    { href: '/calculator/zodiac-compatibility', label: 'Zodiac Compatibility' },
    { href: '/calculator/biorhythm', label: 'Biorhythm Calculator' },
    { href: '/calculator/chinese-zodiac', label: 'Chinese Zodiac' },
  ],
  ru: [
    { href: '/calculator/moon-phases', label: 'Лунный календарь' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/zodiac-compatibility', label: 'Совместимость знаков' },
    { href: '/calculator/biorhythm', label: 'Биоритмы' },
    { href: '/calculator/chinese-zodiac', label: 'Китайский гороскоп' },
  ],
  uk: [
    { href: '/calculator/moon-phases', label: 'Місячний календар' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/zodiac-compatibility', label: 'Сумісність знаків' },
    { href: '/calculator/biorhythm', label: 'Біоритми' },
    { href: '/calculator/chinese-zodiac', label: 'Китайський гороскоп' },
  ],
  fr: [
    { href: '/calculator/moon-phases', label: 'Phases de la Lune' },
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/zodiac-compatibility', label: 'Compatibilité Astrologique' },
    { href: '/calculator/biorhythm', label: 'Biorythmes' },
    { href: '/calculator/chinese-zodiac', label: 'Zodiaque Chinois' },
  ],
  lt: [
    { href: '/calculator/moon-phases', label: 'Mėnulio fazės' },
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/zodiac-compatibility', label: 'Ženklų suderinamumas' },
    { href: '/calculator/biorhythm', label: 'Bioritmas' },
    { href: '/calculator/chinese-zodiac', label: 'Kinų zodiako ženklas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Moon Sign Calculator — What is My Lunar Zodiac Sign?',
    description: 'Find your Moon sign by date, time and timezone. The Moon changes sign every 2–3 days — enter your exact birth time for an accurate result. Discover your lunar zodiac sign, element and ruling planet.',
    h1: 'Moon Sign Calculator',
    subtitle: 'Find your Moon sign by entering your date of birth, time and timezone — the Moon changes sign every 2–3 days.',
  },
  ru: {
    title: 'Лунный знак — Калькулятор знака луны по дате рождения',
    description: 'Узнайте свой лунный знак по дате и времени рождения. Луна меняет знак каждые 2–3 дня — введите точное время и часовой пояс. Стихия, управитель и описание лунного знака.',
    h1: 'Лунный знак — калькулятор',
    subtitle: 'Узнайте свой лунный знак, введя дату рождения, время и часовой пояс — Луна меняет знак каждые 2–3 дня.',
  },
  uk: {
    title: 'Місячний знак — Калькулятор знаку місяця за датою народження',
    description: 'Дізнайтеся свій місячний знак за датою і часом народження. Місяць змінює знак кожні 2–3 дні — введіть точний час і часовий пояс для точного результату.',
    h1: 'Місячний знак — калькулятор',
    subtitle: 'Дізнайтеся свій місячний знак, ввівши дату народження, час і часовий пояс — Місяць змінює знак кожні 2–3 дні.',
  },
  fr: {
    title: 'Signe Lunaire — Calculateur du Signe de la Lune par date de naissance',
    description: 'Trouvez votre signe lunaire par date, heure et fuseau horaire. La Lune change de signe tous les 2–3 jours — entrez l\'heure exacte pour un résultat précis. Élément et planète dominante inclus.',
    h1: 'Calculateur de Signe Lunaire',
    subtitle: 'Trouvez votre signe lunaire en entrant date, heure et fuseau horaire de naissance — la Lune change de signe tous les 2–3 jours.',
  },
  lt: {
    title: 'Mėnulio ženklas — Skaičiuotuvas pagal gimimo datą ir laiką',
    description: 'Sužinokite savo Mėnulio ženklą pagal gimimo datą, laiką ir laiko juostą. Mėnulis keičia ženklą kas 2–3 dienas — įveskite tikslų laiką. Elementas ir valdančioji planeta.',
    h1: 'Mėnulio ženklo skaičiuotuvas',
    subtitle: 'Raskite savo Mėnulio ženklą įvesdami gimimo datą, laiką ir laiko juostą — Mėnulis keičia ženklą kas 2–3 dienas.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Moon sign is the zodiac sign the Moon was passing through at the exact moment of your birth. While your Sun sign changes once a month, the Moon moves much faster — changing signs every 2 days and 11 hours, completing a full cycle through all 12 signs in about 27.3 days. In astrology, the Moon sign represents your inner emotional world: how you react instinctively, what you need to feel emotionally secure, and your relationship with home, family and the past. It is considered the second most important placement in a natal chart after the Sun sign.\n\nTo calculate your Moon sign, enter your birth date, time and UTC timezone offset. The calculator uses the Meeus astronomical algorithm — the same method used in professional astronomy software — to determine the Moon\'s ecliptic longitude and map it to the corresponding zodiac sign. Each sign spans exactly 30°, starting from Aries at 0°. If the Moon was within 2° of a sign boundary at your birth, a warning is displayed, as a minor error in birth time (15–30 minutes) could shift the result. The output shows your Moon sign symbol, name, element (Fire, Earth, Air, or Water), ruling planet and a character description.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a Moon sign?', a: 'The Moon sign is the zodiac sign the Moon occupied at your exact moment of birth. It moves through all 12 signs in about 27.3 days, spending 2–3 days in each. In astrology, the Moon sign governs your emotional nature, instinctive reactions, subconscious patterns and what you need to feel safe and nurtured.' },
      { q: 'How is the Moon sign different from the Sun sign?', a: 'The Sun sign (what most people call their "star sign") represents your core identity and conscious will — it changes once a month. The Moon sign represents your emotional inner world — how you react instinctively and what you need emotionally. A person with Sun in Capricorn but Moon in Pisces may appear ambitious and disciplined outwardly while feeling deeply sensitive and empathetic inside.' },
      { q: 'How often does the Moon change signs?', a: 'The Moon changes zodiac signs approximately every 2 days and 11 hours, completing a full cycle through all 12 signs in 27.3 days (the sidereal month). This is why two people born on the same day but a few hours apart can have different Moon signs, making your exact birth time essential for accurate results.' },
      { q: 'Why do I need my exact birth time and timezone?', a: 'The Moon moves approximately 13° per day — or about 0.5° per hour. Since each zodiac sign spans 30°, the Moon spends only ~57 hours in each sign. Without an accurate birth time and correct UTC offset, the calculated Moon sign could be wrong by one sign if you were born near a sign transition.' },
      { q: 'What does the sign boundary warning mean?', a: 'The Meeus algorithm is accurate to approximately ±1–2°. If the Moon is within 2° of a sign boundary at your entered date and time, even a small error in birth time (15–30 minutes) could shift the result to the adjacent sign. In this case, checking with professional astrology software using your verified birth time is recommended.' },
      { q: 'What is Moon in Cancer known for?', a: 'Cancer is the Moon\'s home sign, making Moon in Cancer one of the strongest lunar placements. People with this position have heightened intuition, deep nurturing instincts and a powerful attachment to home and family. They absorb emotional atmospheres easily and often have vivid dreams and a strong connection to their past.' },
      { q: 'What is Moon in Scorpio like?', a: 'Moon in Scorpio is one of the most intense lunar placements. People with this sign feel emotions with extraordinary depth and rarely reveal their true feelings on the surface. They are highly intuitive, drawn to transformation, and often have penetrating insight into human psychology. Trust is earned slowly but loyalty runs deep.' },
      { q: 'Which Moon sign is best for emotional stability?', a: 'Moon in Taurus is traditionally considered the most emotionally stable placement — Taurus is the Moon\'s sign of exaltation. People with Moon in Taurus are patient, grounded and rarely overwhelmed by sudden emotional upheaval. Moon in Capricorn also brings strong emotional self-control. However, "best" depends on personal life goals and the full natal chart.' },
      { q: 'How do Moon signs affect compatibility?', a: 'In astrology, Moon signs of the same element tend to be most compatible: Fire Moons (Aries, Leo, Sagittarius) share passion and spontaneity; Earth Moons (Taurus, Virgo, Capricorn) share a need for security; Air Moons (Gemini, Libra, Aquarius) connect intellectually; Water Moons (Cancer, Scorpio, Pisces) share emotional depth. However, full chart synastry gives a more complete picture.' },
      { q: 'Can the Moon sign override the Sun sign in personality?', a: 'Yes — especially in emotional situations and private life. People often feel their Moon sign more intensely than their Sun sign in close relationships and under stress. The Moon sign represents the subconscious layer of personality that emerges naturally, while the Sun sign is the conscious identity you project. Both are essential parts of the full astrological picture.' },
    ],
  },
  ru: {
    description: 'Лунный знак — это знак зодиака, через который проходила Луна в момент вашего рождения. В отличие от солнечного знака, который меняется примерно раз в месяц, Луна движется значительно быстрее: она меняет знак каждые 2 суток и 11 часов, проходя через все 12 знаков за 27,3 дня. В астрологии лунный знак отражает вашу внутреннюю эмоциональную природу: как вы реагируете инстинктивно, что вам нужно для эмоциональной безопасности и ваши отношения с домом, семьёй и прошлым. Он считается вторым по важности после солнечного знака в натальной карте.\n\nДля расчёта лунного знака введите дату, время и часовой пояс (UTC). Калькулятор использует астрономический алгоритм Мееуса — тот же метод, что применяется в профессиональном астрологическом ПО — для вычисления эклиптической долготы Луны и определения соответствующего знака. Каждый знак занимает ровно 30°, начиная с Овна при 0°. Если в момент рождения Луна находилась в пределах 2° от границы знака, отображается предупреждение — ошибка в 15–30 минут может смещать результат. Вы получаете символ знака, его название, стихию, управителя и описание.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое лунный знак?', a: 'Лунный знак — это знак зодиака, в котором находилась Луна в момент вашего рождения. Луна проходит через все 12 знаков за 27,3 дня, проводя в каждом около 2–3 суток. В астрологии лунный знак управляет эмоциональной природой, инстинктивными реакциями и тем, что нужно человеку для внутреннего комфорта.' },
      { q: 'Чем лунный знак отличается от солнечного?', a: 'Солнечный знак (то, что большинство называет «знаком зодиака») — это ваша сознательная личность и воля, меняется раз в месяц. Лунный знак — внутренний эмоциональный мир и инстинктивные реакции. Например, Козерог по Солнцу может быть амбициозен снаружи, но если у него Луна в Рыбах — внутри он очень чувствительный и эмпатичный.' },
      { q: 'Как часто Луна меняет знак?', a: 'Луна меняет знак зодиака примерно каждые 2 суток и 11 часов, проходя через все 12 знаков за 27,3 дня (сидерический месяц). Именно поэтому два человека, рождённые в один день с разницей в несколько часов, могут иметь разные лунные знаки — точное время рождения обязательно для точного расчёта.' },
      { q: 'Зачем нужно точное время рождения и часовой пояс?', a: 'Луна движется примерно на 13° в сутки, то есть около 0,5° в час. Каждый знак занимает 30°, поэтому Луна проводит в нём около 57 часов. Без точного времени и корректного часового пояса результат может оказаться на целый знак неверным, особенно если рождение произошло вблизи перехода знаков.' },
      { q: 'Что означает предупреждение о границе знака?', a: 'Алгоритм Мееуса точен приблизительно до ±1–2°. Если Луна находилась в пределах 2° от границы знака в указанное время, даже небольшая ошибка во времени рождения (15–30 минут) может дать соседний знак в результате. В таком случае рекомендуется проверка в профессиональном астрологическом ПО.' },
      { q: 'Какое значение имеет Луна в Раке?', a: 'Рак — это домашний знак Луны, и это положение считается одним из сильнейших. Люди с Луной в Раке обладают обострённой интуицией, глубокими инстинктами заботы и сильной привязанностью к дому и семье. Они легко впитывают эмоциональный фон окружающего пространства.' },
      { q: 'Что означает Луна в Скорпионе?', a: 'Луна в Скорпионе — одно из самых интенсивных лунных положений. Такие люди переживают эмоции с огромной глубиной, редко раскрывая их на поверхности. Им свойственны сильная интуиция, тяга к трансформации и проникновенное понимание психологии людей. Доверие завоёвывается медленно, но лояльность — абсолютная.' },
      { q: 'Какой лунный знак наиболее стабилен эмоционально?', a: 'Луна в Тельце традиционно считается самым эмоционально стабильным положением — Телец является знаком экзальтации Луны. Люди с такой Луной терпеливы, заземлены и редко поддаются внезапным эмоциональным всплескам. Луна в Козероге тоже даёт сильный эмоциональный самоконтроль.' },
      { q: 'Как лунные знаки влияют на совместимость?', a: 'В астрологии наиболее совместимы лунные знаки одной стихии: Луна в Огне (Овен, Лев, Стрелец) — страсть и спонтанность; в Земле (Телец, Дева, Козерог) — стабильность; в Воздухе (Близнецы, Весы, Водолей) — интеллектуальная связь; в Воде (Рак, Скорпион, Рыбы) — эмоциональная глубина. Полная картина — в синастрии.' },
      { q: 'Может ли лунный знак быть сильнее солнечного?', a: 'Да — особенно в эмоциональных ситуациях и личной жизни. Люди часто ощущают своё лунное начало сильнее в близких отношениях и под давлением. Лунный знак — это подсознательный слой личности, солнечный — сознательная идентичность. Оба одинаково важны для полного понимания натальной карты.' },
    ],
  },
  uk: {
    description: 'Місячний знак — це знак зодіаку, через який проходив Місяць у момент вашого народження. На відміну від сонячного знаку, який змінюється приблизно раз на місяць, Місяць рухається значно швидше: він змінює знак кожні 2 доби та 11 годин, проходячи через усі 12 знаків за 27,3 дня. В астрології місячний знак відображає вашу внутрішню емоційну природу: як ви реагуєте інстинктивно, що вам потрібно для емоційної безпеки та ваші стосунки з домом, сім\'єю і минулим.\n\nДля розрахунку місячного знаку введіть дату, час і часовий пояс (UTC). Калькулятор використовує астрономічний алгоритм Мееуса — той самий метод, що застосовується в професійному астрологічному ПЗ — для обчислення екліптичної довготи Місяця. Кожен знак займає рівно 30°, починаючи з Овну при 0°. Якщо в момент народження Місяць знаходився в межах 2° від межі знаку, відображається попередження — помилка в 15–30 хвилин може зсунути результат.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке місячний знак?', a: 'Місячний знак — це знак зодіаку, в якому перебував Місяць у момент вашого народження. Місяць проходить через усі 12 знаків за 27,3 дня, проводячи в кожному близько 2–3 діб. В астрології місячний знак управляє емоційною природою, інстинктивними реакціями та тим, що потрібно людині для внутрішнього комфорту.' },
      { q: 'Чим місячний знак відрізняється від сонячного?', a: 'Сонячний знак — це ваша свідома особистість і воля. Місячний знак — внутрішній емоційний світ та інстинктивні реакції. Наприклад, Козеріг за Сонцем може бути амбітним зовні, але якщо у нього Місяць у Рибах — всередині він дуже чутливий та емпатичний.' },
      { q: 'Як часто Місяць змінює знак?', a: 'Місяць змінює знак зодіаку приблизно кожні 2 доби та 11 годин, проходячи через усі 12 знаків за 27,3 дня. Саме тому двоє людей, народжених в один день з різницею в кілька годин, можуть мати різні місячні знаки — точний час народження є обов\'язковим.' },
      { q: 'Навіщо потрібен точний час народження і часовий пояс?', a: 'Місяць рухається приблизно на 13° на добу, тобто близько 0,5° на годину. Кожен знак займає 30°, тому Місяць проводить у ньому близько 57 годин. Без точного часу і коректного часового поясу результат може виявитися на цілий знак неправильним.' },
      { q: 'Що означає попередження про межу знаку?', a: 'Алгоритм Мееуса точний приблизно до ±1–2°. Якщо Місяць знаходився в межах 2° від межі знаку в зазначений час, навіть невелика помилка у часі народження (15–30 хвилин) може дати сусідній знак. У такому разі рекомендується перевірка в професійному астрологічному ПЗ.' },
      { q: 'Яке значення має Місяць у Раку?', a: 'Рак — це домашній знак Місяця, і це положення вважається одним із найсильніших. Люди з Місяцем у Раку мають загострену інтуїцію, глибокі інстинкти турботи та сильну прив\'язаність до дому та сім\'ї. Вони легко вбирають емоційний фон навколишнього простору.' },
      { q: 'Що означає Місяць у Скорпіоні?', a: 'Місяць у Скорпіоні — одне з найінтенсивніших місячних положень. Такі люди переживають емоції з величезною глибиною, рідко розкриваючи їх на поверхні. Їм властиві сильна інтуїція, потяг до трансформації і проникливе розуміння психології людей.' },
      { q: 'Який місячний знак найбільш стабільний емоційно?', a: 'Місяць у Тельці традиційно вважається найемоційно стабільним положенням — Телець є знаком екзальтації Місяця. Люди з такою позицією терплячі, заземлені й рідко піддаються раптовим емоційним спалахам. Місяць у Козерозі також дає сильний емоційний самоконтроль.' },
      { q: 'Як місячні знаки впливають на сумісність?', a: 'В астрології найбільш сумісні місячні знаки однієї стихії: Місяць у Вогні (Овен, Лев, Стрілець) — пристрасть; у Землі (Телець, Діва, Козеріг) — стабільність; у Повітрі (Близнюки, Терези, Водолій) — інтелектуальний зв\'язок; у Воді (Рак, Скорпіон, Риби) — емоційна глибина.' },
      { q: 'Чи може місячний знак бути сильнішим за сонячний?', a: 'Так — особливо в емоційних ситуаціях та особистому житті. Люди часто відчувають своє місячне начало сильніше в близьких стосунках і під тиском. Місячний знак — підсвідомий шар особистості, а сонячний — свідома ідентичність. Обидва однаково важливі.' },
    ],
  },
  fr: {
    description: 'Le signe lunaire est le signe du zodiaque que la Lune traversait au moment exact de votre naissance. Alors que votre signe solaire change environ une fois par mois, la Lune se déplace beaucoup plus rapidement : elle change de signe tous les 2 jours et 11 heures, complétant un cycle complet des 12 signes en environ 27,3 jours. En astrologie, le signe lunaire représente votre monde émotionnel intérieur : comment vous réagissez instinctivement, ce dont vous avez besoin pour vous sentir en sécurité émotionnellement, et votre rapport à la maison, la famille et le passé.\n\nPour calculer votre signe lunaire, entrez votre date, heure de naissance et décalage UTC. Le calculateur utilise l\'algorithme astronomique de Meeus — la même méthode que les logiciels d\'astrologie professionnels — pour déterminer la longitude écliptique de la Lune et la convertir en signe zodiacal. Chaque signe couvre exactement 30°, en partant du Bélier à 0°. Si la Lune se trouvait à moins de 2° d\'une limite de signe à votre naissance, un avertissement s\'affiche, car une légère erreur de 15 à 30 minutes peut changer le résultat.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le signe lunaire ?', a: 'Le signe lunaire est le signe zodiacal occupé par la Lune au moment exact de votre naissance. Elle parcourt les 12 signes en 27,3 jours, passant 2 à 3 jours dans chacun. En astrologie, le signe lunaire gouverne votre nature émotionnelle, vos réactions instinctives et ce dont vous avez besoin pour vous sentir en sécurité.' },
      { q: 'En quoi le signe lunaire diffère-t-il du signe solaire ?', a: 'Le signe solaire (votre "signe astrologique" habituel) représente votre identité consciente et votre volonté — il change une fois par mois. Le signe lunaire représente votre monde émotionnel intérieur et vos réactions instinctives. Un Capricorne solaire peut paraître ambitieux en surface, mais avec une Lune en Poissons, il sera profondément sensible et empathique à l\'intérieur.' },
      { q: 'À quelle fréquence la Lune change-t-elle de signe ?', a: 'La Lune change de signe zodiacal environ toutes les 2 jours et 11 heures, complétant un cycle complet en 27,3 jours (mois sidéral). C\'est pourquoi deux personnes nées le même jour avec quelques heures d\'écart peuvent avoir des signes lunaires différents, ce qui rend l\'heure de naissance exacte indispensable.' },
      { q: 'Pourquoi ai-je besoin de mon heure et fuseau horaire exacts ?', a: 'La Lune se déplace d\'environ 13° par jour — soit ~0,5° par heure. Comme chaque signe couvre 30°, la Lune ne passe que ~57 heures dans chacun. Sans heure précise et bon décalage UTC, le signe calculé pourrait être faux d\'un signe entier si vous êtes né proche d\'une transition.' },
      { q: 'Que signifie l\'avertissement de limite de signe ?', a: 'L\'algorithme de Meeus est précis à environ ±1–2°. Si la Lune se trouvait à moins de 2° d\'une limite de signe à l\'heure saisie, même une petite erreur d\'heure (15–30 minutes) pourrait donner le signe adjacent. Dans ce cas, il est recommandé de vérifier avec un logiciel d\'astrologie professionnel.' },
      { q: 'Quelle est la signification de la Lune en Cancer ?', a: 'Le Cancer est le signe natal de la Lune — sa position la plus naturelle. Les personnes avec la Lune en Cancer ont une intuition accrue, de profonds instincts maternels et un lien puissant avec le foyer et la famille. Elles absorbent facilement l\'atmosphère émotionnelle de leur entourage et ont souvent des rêves très vivaces.' },
      { q: 'Que représente la Lune en Scorpion ?', a: 'La Lune en Scorpion est l\'un des placements lunaires les plus intenses. Ces personnes ressentent les émotions avec une profondeur extraordinaire et révèlent rarement leurs véritables sentiments en surface. Elles ont une intuition pénétrante, une attirance pour la transformation et une compréhension profonde de la psychologie humaine.' },
      { q: 'Quel signe lunaire est le plus stable émotionnellement ?', a: 'La Lune en Taureau est traditionnellement considérée comme le placement lunaire le plus stable — le Taureau est le signe d\'exaltation de la Lune. Ces personnes sont patientes, ancrées et rarement déstabilisées par des bouleversements émotionnels soudains. La Lune en Capricorne apporte également un fort autocontrôle émotionnel.' },
      { q: 'Comment les signes lunaires influencent-ils la compatibilité ?', a: 'En astrologie, les signes lunaires du même élément sont généralement les plus compatibles : Lune en Feu (Bélier, Lion, Sagittaire) — passion ; en Terre (Taureau, Vierge, Capricorne) — stabilité ; en Air (Gémeaux, Balance, Verseau) — complicité intellectuelle ; en Eau (Cancer, Scorpion, Poissons) — profondeur émotionnelle.' },
      { q: 'Le signe lunaire peut-il l\'emporter sur le signe solaire dans la personnalité ?', a: 'Oui — surtout dans les situations émotionnelles et la vie privée. Beaucoup de personnes ressentent leur Lune plus intensément dans leurs relations proches et sous stress. Le signe lunaire est la couche subconsciente de la personnalité, le signe solaire est l\'identité consciente. Les deux sont essentiels à une lecture astrologique complète.' },
    ],
  },
  lt: {
    description: 'Mėnulio ženklas yra zodiako ženklas, kurį Mėnulis kirtо tiksliu jūsų gimimo momentu. Skirtingai nuo Saulės ženklo, kuris keičiasi maždaug kartą per mėnesį, Mėnulis juda daug greičiau — keičia ženklą kas 2 dienas ir 11 valandų, per 27,3 dienas apeidamas visus 12 ženklų. Astrologijoje Mėnulio ženklas atspindi jūsų vidinį emocinį pasaulį: kaip instinktyviai reaguojate, ko jums reikia, kad jaustumėtės emociškai saugiai, ir jūsų ryšį su namais, šeima bei praeitimi.\n\nNorėdami apskaičiuoti Mėnulio ženklą, įveskite gimimo datą, laiką ir UTC poslinkį. Skaičiuotuvas naudoja Meeaus astronomijos algoritmą — tą patį metodą, kurį naudoja profesionali astrologijos programinė įranga — Mėnulio ekliptinei ilgumai nustatyti. Kiekvienas ženklas apima tiksliai 30°, pradedant nuo Avino ties 0°. Jei gimimo metu Mėnulis buvo arčiau nei 2° nuo ženklo ribos, rodomas įspėjimas — 15–30 minučių laiko paklaida gali pakeisti rezultatą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra Mėnulio ženklas?', a: 'Mėnulio ženklas yra zodiako ženklas, kurį Mėnulis užėmė tiksliu jūsų gimimo momentu. Jis apkeliauja visus 12 ženklų per 27,3 dienos, kiekvienam praleisdamas 2–3 dienas. Astrologijoje Mėnulio ženklas valdo emocinę prigimtį, instinktyvias reakcijas ir tai, ko reikia jausmų saugumui.' },
      { q: 'Kuo Mėnulio ženklas skiriasi nuo Saulės ženklo?', a: 'Saulės ženklas (dauguma jį vadina "zodiako ženklu") reiškia sąmoningą tapatybę ir valią — jis keičiasi kartą per mėnesį. Mėnulio ženklas reiškia vidinį emocinį pasaulį ir instinktyvias reakcijas. Pvz., Ožiaragis pagal Saulę gali atrodyti ambicingas, tačiau su Mėnuliu Žuvyse iš tikrųjų yra labai jautrus.' },
      { q: 'Kaip dažnai Mėnulis keičia ženklą?', a: 'Mėnulis keičia zodiako ženklą maždaug kas 2 dienas ir 11 valandų, per 27,3 dienos apeidamas visus 12 ženklų. Todėl du žmonės, gimę tą pačią dieną, bet keliomis valandomis skirtingai, gali turėti skirtingus Mėnulio ženklus — tikslus gimimo laikas yra būtinas.' },
      { q: 'Kodėl reikia tikslaus gimimo laiko ir laiko juostos?', a: 'Mėnulis juda maždaug 13° per dieną — tai ~0,5° per valandą. Kiekvienas ženklas apima 30°, todėl Mėnulis jame praleidžia tik ~57 valandas. Be tikslaus laiko ir teisingo UTC poslinkio rezultatas gali būti klaidingas vienu ženklu, ypač jei gimėte ties ženklo riba.' },
      { q: 'Ką reiškia įspėjimas apie ženklo ribą?', a: 'Meeaus algoritmas tikslus maždaug ±1–2°. Jei įvestame laike Mėnulis buvo mažiau nei 2° nuo ženklo ribos, net maža laiko paklaida (15–30 minučių) gali duoti gretimą ženklą. Tokiu atveju rekomenduojama patikrinti su profesionalia astrologijos programine įranga.' },
      { q: 'Kokia Mėnulio Vėžyje reikšmė?', a: 'Vėžys yra gimtasis Mėnulio ženklas — jo natūraliausia padėtis. Žmonės su Mėnuliu Vėžyje pasižymi padidinta intuicija, giliais globos instinktais ir stipriu prisirišimu prie namų ir šeimos. Jie lengvai įsisavina emocinę atmosferą ir dažnai sapnuoja ryškius sapnus.' },
      { q: 'Koks yra Mėnulis Skorpione?', a: 'Mėnulis Skorpione yra vienas intensyviausių mėnulio padėčių. Šie žmonės jaučia emocijas nepaprasto gylio, retai atskleisdami tikruosius jausmus. Jiems būdinga stipri intuicija, potraukis transformacijai ir įžvalgi žmogaus psichologijos samprata. Pasitikėjimas uždirbamas lėtai, bet lojalumas — absoliutus.' },
      { q: 'Kuris Mėnulio ženklas emocionaliausiai stabilus?', a: 'Mėnulis Jaučiui tradiciškai laikomas stabiliausiu — Jautis yra Mėnulio išaukštinimo ženklas. Šie žmonės kantrūs, prisirišę prie žemės ir retai patiriami staigių emocinių protrūkių. Mėnulis Ožiaragyje taip pat teikia stiprią emocinę savikontrolę.' },
      { q: 'Kaip Mėnulio ženklai veikia suderinamumą?', a: 'Astrologijoje labiausiai suderinami to paties elemento Mėnulio ženklai: Ugnis (Avinas, Liūtas, Šaulys) — aistra; Žemė (Jautis, Mergelė, Ožiaragis) — stabilumas; Oras (Dvyniai, Svarstyklės, Vandenis) — intelektualinis ryšys; Vanduo (Vėžys, Skorpionas, Žuvys) — emocinis gilumas.' },
      { q: 'Ar Mėnulio ženklas gali pranokti Saulės ženklą asmenybėje?', a: 'Taip — ypač emocinėse situacijose ir asmeniniame gyvenime. Daugelis žmonių Mėnulio pradą jaučia stipriau artimose santykiuose ir streso metu. Mėnulio ženklas yra nesąmoningas asmenybės sluoksnis, Saulės ženklas — sąmoninga tapatybė. Abu vienodai svarbūs.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/moon-sign', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MoonSignPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/moon-sign`,
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <MoonSignCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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
