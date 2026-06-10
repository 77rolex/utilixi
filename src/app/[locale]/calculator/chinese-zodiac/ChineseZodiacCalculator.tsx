'use client';

import { useState } from 'react';
import styles from './ChineseZodiacCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; placeholder: string;
  errEmpty: string; errInvalid: string;
  elementLabel: string; energyLabel: string;
  noteText: string;
}> = {
  en: {
    label: 'Birth Year', btn: 'Find My Chinese Zodiac', placeholder: 'e.g. 1990',
    errEmpty: 'Please enter your birth year.', errInvalid: 'Enter a valid year between 1900 and 2030.',
    elementLabel: 'Element', energyLabel: 'Energy',
    noteText: 'If you were born in January or February, your sign may be the previous year\'s animal depending on the Chinese New Year date that year.',
  },
  ru: {
    label: 'Год рождения', btn: 'Найти мой китайский знак', placeholder: 'например, 1990',
    errEmpty: 'Введите год рождения.', errInvalid: 'Введите корректный год от 1900 до 2030.',
    elementLabel: 'Стихия', energyLabel: 'Энергия',
    noteText: 'Если вы родились в январе или феврале, ваш знак может быть животным предыдущего года — в зависимости от даты китайского Нового года в тот год.',
  },
  uk: {
    label: 'Рік народження', btn: 'Знайти мій китайський знак', placeholder: 'наприклад, 1990',
    errEmpty: 'Введіть рік народження.', errInvalid: 'Введіть коректний рік від 1900 до 2030.',
    elementLabel: 'Стихія', energyLabel: 'Енергія',
    noteText: 'Якщо ви народилися в січні або лютому, ваш знак може бути твариною попереднього року — залежно від дати китайського Нового року в той рік.',
  },
  fr: {
    label: 'Année de naissance', btn: 'Trouver mon signe chinois', placeholder: 'ex. 1990',
    errEmpty: 'Veuillez entrer votre année de naissance.', errInvalid: 'Entrez une année valide entre 1900 et 2030.',
    elementLabel: 'Élément', energyLabel: 'Énergie',
    noteText: 'Si vous êtes né en janvier ou février, votre signe peut être l\'animal de l\'année précédente selon la date du Nouvel An chinois.',
  },
  lt: {
    label: 'Gimimo metai', btn: 'Rasti savo kinų ženklą', placeholder: 'pvz. 1990',
    errEmpty: 'Įveskite gimimo metus.', errInvalid: 'Įveskite teisingus metus nuo 1900 iki 2030.',
    elementLabel: 'Elementas', energyLabel: 'Energija',
    noteText: 'Jei gimėte sausio ar vasario mėnesį, jūsų ženklas gali būti praėjusių metų gyvūnas, priklausomai nuo Kinų Naujųjų metų datos tais metais.',
  },
};

type AnimalLocale = { name: string; traits: string; desc: string };

const ANIMALS: {
  symbol: string;
  en: AnimalLocale; ru: AnimalLocale; uk: AnimalLocale; fr: AnimalLocale; lt: AnimalLocale;
}[] = [
  {
    symbol: '🐀',
    en: { name: 'Rat', traits: 'Quick-witted · Resourceful · Versatile · Charming', desc: 'Those born in the Year of the Rat are clever, adaptable and endlessly resourceful. They have a gift for spotting opportunities and turning challenges into advantages, backed by natural charm and a sharp, strategic mind.' },
    ru: { name: 'Крыса', traits: 'Находчивость · Адаптивность · Ум · Обаяние', desc: 'Рождённые в год Крысы умны, адаптивны и находчивы. Они умеют замечать возможности и превращать трудности в преимущества, обладая природным обаянием и острым стратегическим умом.' },
    uk: { name: 'Щур', traits: 'Кмітливість · Адаптивність · Розум · Чарівність', desc: 'Народжені у рік Щура кмітливі, адаптивні та винахідливі. Вони вміють помічати можливості та перетворювати труднощі на переваги, маючи природну чарівність та гострий стратегічний розум.' },
    fr: { name: 'Rat', traits: 'Ingénieux · Adaptable · Intelligent · Charmant', desc: 'Ceux nés dans l\'Année du Rat sont intelligents, adaptables et infiniment ingénieux. Ils ont le don de repérer les opportunités et de transformer les défis en avantages, avec un charme naturel et un esprit stratégique.' },
    lt: { name: 'Žiurkė', traits: 'Išradingumas · Prisitaikymumas · Intelektas · Žavesys', desc: 'Gimę Žiurkės metais yra protingi, prisitaikantys ir išradingi. Jie turi dovaną pastebėti galimybes ir paversti iššūkius privalumais, turėdami natūralų žavesį ir aštrų strateginį protą.' },
  },
  {
    symbol: '🐂',
    en: { name: 'Ox', traits: 'Diligent · Reliable · Strong · Patient', desc: 'Born under the Ox sign are steady, reliable and extraordinarily hardworking. They favour methodical progress over shortcuts, rarely quit once committed, and inspire trust in everyone around them through consistency and honesty.' },
    ru: { name: 'Бык', traits: 'Трудолюбие · Надёжность · Сила · Терпение', desc: 'Рождённые под знаком Быка — стойкие, надёжные и невероятно трудолюбивые. Они предпочитают методичный прогресс быстрым путям, редко сдаются и вызывают доверие у всех вокруг своей последовательностью.' },
    uk: { name: 'Бик', traits: 'Працьовитість · Надійність · Сила · Терпіння', desc: 'Народжені під знаком Бика — стійкі, надійні та надзвичайно працьовиті. Вони надають перевагу методичному прогресу, рідко здаються та викликають довіру у всіх навколо.' },
    fr: { name: 'Bœuf', traits: 'Diligent · Fiable · Fort · Patient', desc: 'Les personnes nées sous le signe du Bœuf sont stables, fiables et extraordinairement travailleuses. Elles préfèrent un progrès méthodique aux raccourcis et inspirent confiance par leur constance et leur honnêteté.' },
    lt: { name: 'Jautis', traits: 'Darbštumas · Patikimumas · Stiprybė · Kantrybė', desc: 'Gimę Jaučio ženklu yra tvarūs, patikimi ir nepaprastai darbštūs. Jie teikia pirmenybę metodiškai pažangai, retai pasiduoda ir įkvepia pasitikėjimą nuoseklumu ir sąžiningumu.' },
  },
  {
    symbol: '🐅',
    en: { name: 'Tiger', traits: 'Brave · Charismatic · Passionate · Unpredictable', desc: 'Tigers are bold, adventurous and magnetically charismatic. They live for excitement, throw themselves into everything with full intensity and are natural-born leaders who inspire action and loyalty in those around them.' },
    ru: { name: 'Тигр', traits: 'Храбрость · Харизма · Страсть · Непредсказуемость', desc: 'Тигры смелые, авантюрные и магнетически харизматичные. Они живут ради азарта, бросаются в дело с полной интенсивностью и являются прирождёнными лидерами, вдохновляющими окружающих.' },
    uk: { name: 'Тигр', traits: 'Хоробрість · Харизма · Пристрасть · Непередбачуваність', desc: 'Тигри сміливі, авантюрні та магнетично харизматичні. Вони живуть заради азарту, кидаються в справу з повною інтенсивністю та є природженими лідерами.' },
    fr: { name: 'Tigre', traits: 'Courageux · Charismatique · Passionné · Imprévisible', desc: 'Les Tigres sont audacieux, aventureux et magnétiquement charismatiques. Ils vivent pour l\'excitation, s\'investissent totalement dans tout ce qu\'ils font et sont des leaders nés qui inspirent action et loyauté.' },
    lt: { name: 'Tigras', traits: 'Drąsumas · Charizma · Aistrumas · Nenuspėjamumas', desc: 'Tigrai yra drąsūs, nuotykių kupini ir magnetiškai charizmatingi. Jie gyvena dėl jaudulio, visiškai atsideda viskam, ką daro, ir yra natūralūs lyderiai, įkvepiантys veiksmus.' },
  },
  {
    symbol: '🐇',
    en: { name: 'Rabbit', traits: 'Gentle · Elegant · Compassionate · Alert', desc: 'Rabbits are gentle, thoughtful and quietly powerful. They have refined taste, a deep love of beauty and peace, and a gift for building lasting relationships through kindness and consistent reliability.' },
    ru: { name: 'Кролик', traits: 'Мягкость · Элегантность · Сострадание · Внимательность', desc: 'Кролики — мягкие, задумчивые и тихо сильные. Они обладают утончённым вкусом, глубокой любовью к красоте и миру и даром строить прочные отношения через доброту и надёжность.' },
    uk: { name: 'Кролик', traits: 'М\'якість · Елегантність · Співчуття · Уважність', desc: 'Кролики — м\'які, задумливі та тихо сильні. Вони мають витончений смак, глибоку любов до краси та миру і дар будувати тривалі стосунки через доброту та надійність.' },
    fr: { name: 'Lapin', traits: 'Doux · Élégant · Compatissant · Attentif', desc: 'Les Lapins sont doux, réfléchis et discrètement puissants. Ils ont un goût raffiné, un profond amour de la beauté et de la paix, et un talent pour établir des relations durables par la bonté.' },
    lt: { name: 'Triušis', traits: 'Švelnumas · Elegancija · Užuojauta · Budrumas', desc: 'Triušiai yra švelni, apgalvota ir tyliai galinga asmenybė. Jie turi išgrynintą skonį, gilią meilę grožiui ir taikai bei dovaną kurti ilgalaikius santykius per gerumą.' },
  },
  {
    symbol: '🐉',
    en: { name: 'Dragon', traits: 'Confident · Intelligent · Ambitious · Lucky', desc: 'Dragons are the most iconic sign of the Chinese zodiac — powerful, charismatic and full of vitality. Natural leaders and innovators, they combine intelligence with fearless ambition and radiate an energy that commands attention.' },
    ru: { name: 'Дракон', traits: 'Уверенность · Интеллект · Амбиции · Удача', desc: 'Дракон — самый культовый знак китайского зодиака: мощный, харизматичный и полный жизненной силы. Прирождённые лидеры и новаторы, сочетающие интеллект со смелыми амбициями.' },
    uk: { name: 'Дракон', traits: 'Впевненість · Інтелект · Амбіції · Удача', desc: 'Дракон — найіконічніший знак китайського зодіаку: потужний, харизматичний та сповнений життєвої сили. Природжені лідери та новатори, що поєднують інтелект із безстрашними амбіціями.' },
    fr: { name: 'Dragon', traits: 'Confiant · Intelligent · Ambitieux · Chanceux', desc: 'Les Dragons sont le signe le plus emblématique du zodiaque chinois — puissants, charismatiques et pleins de vitalité. Leaders et innovateurs naturels, ils combinent intelligence et ambition intrépide.' },
    lt: { name: 'Drakonas', traits: 'Pasitikėjimas · Intelektas · Ambicingumas · Sėkmė', desc: 'Drakonai yra įtakingiausias kinų zodiako ženklas — galingi, charizmatingi ir pilni energijos. Natūralūs lyderiai ir novatoriai, derinantys intelektą su bebaimėmis ambicijomis.' },
  },
  {
    symbol: '🐍',
    en: { name: 'Snake', traits: 'Wise · Intuitive · Elegant · Mysterious', desc: 'Snakes are deep thinkers with sharp intuition and a natural air of mystery. They are wise, private and deliberate — observing situations carefully before acting, and often possessing uncanny insight into people and events.' },
    ru: { name: 'Змея', traits: 'Мудрость · Интуиция · Элегантность · Таинственность', desc: 'Змеи — глубокие мыслители с острой интуицией и естественным ореолом тайны. Они мудры, сдержанны и осторожны — тщательно наблюдают ситуацию перед действием, нередко обладая сверхъестественной проницательностью.' },
    uk: { name: 'Змія', traits: 'Мудрість · Інтуїція · Елегантність · Таємничість', desc: 'Змії — глибокі мислителі з гострою інтуїцією та природним ореолом таємничості. Вони мудрі, стримані та обережні — ретельно спостерігають ситуацію перед дією.' },
    fr: { name: 'Serpent', traits: 'Sage · Intuitif · Élégant · Mystérieux', desc: 'Les Serpents sont des penseurs profonds avec une intuition aiguisée et une aura naturelle de mystère. Sages, discrets et délibérés, ils observent les situations attentivement avant d\'agir.' },
    lt: { name: 'Gyvatė', traits: 'Išmintis · Intuicija · Elegancija · Paslaptingumas', desc: 'Gyvatės yra gilūs mąstytojai su aštria intuicija ir natūraliu paslaptingumo oru. Jos išmintingos, santūriosios ir apgalvotos — atidžiai stebi situacijas prieš imdamiesi veiksmų.' },
  },
  {
    symbol: '🐎',
    en: { name: 'Horse', traits: 'Energetic · Independent · Warm-hearted · Spirited', desc: 'Horses are free spirits who thrive on movement, adventure and social connection. Lively and enthusiastic, they make quick decisions and crave the freedom to express themselves fully, lighting up every room they enter.' },
    ru: { name: 'Лошадь', traits: 'Энергичность · Независимость · Теплота · Дух', desc: 'Лошади — свободные духи, расцветающие в движении, приключениях и общении. Живые и полные энтузиазма, они быстро принимают решения и жаждут свободы для полного самовыражения.' },
    uk: { name: 'Кінь', traits: 'Енергійність · Незалежність · Сердечність · Дух', desc: 'Коні — вільні духи, що процвітають у русі, пригодах та спілкуванні. Живі та сповнені ентузіазму, вони швидко приймають рішення та прагнуть свободи для повного самовираження.' },
    fr: { name: 'Cheval', traits: 'Énergique · Indépendant · Chaleureux · Fougueux', desc: 'Les Chevaux sont des esprits libres qui s\'épanouissent dans le mouvement, l\'aventure et les connexions sociales. Vifs et enthousiastes, ils prennent des décisions rapides et aspirent à la liberté.' },
    lt: { name: 'Arklys', traits: 'Energingumas · Nepriklausomumas · Širdingumas · Dvasinis', desc: 'Arkliai yra laisvo dvasios, klestintys judėjime, nuotykiuose ir socialiniuose ryšiuose. Gyvybingi ir entuziastingi, greitai priimantys sprendimus ir trokštantys laisvės.' },
  },
  {
    symbol: '🐏',
    en: { name: 'Goat', traits: 'Gentle · Creative · Empathetic · Calm', desc: 'Goats are among the most empathetic and creatively gifted signs. They are peaceful, imaginative and deeply sensitive — natural artists and healers who find beauty in the world and bring harmony to those around them.' },
    ru: { name: 'Коза', traits: 'Мягкость · Творчество · Эмпатия · Спокойствие', desc: 'Козы — одни из самых чутких и творчески одарённых знаков. Они миролюбивы, богаты воображением и глубоко чувствительны — прирождённые художники и целители, несущие гармонию.' },
    uk: { name: 'Коза', traits: 'М\'якість · Творчість · Емпатія · Спокій', desc: 'Кози — одні з найчутливіших та творчо обдарованих знаків. Вони миролюбні, багаті уявою та глибоко чутливі — природжені митці та цілителі, що несуть гармонію.' },
    fr: { name: 'Chèvre', traits: 'Doux · Créatif · Empathique · Calme', desc: 'Les Chèvres sont parmi les signes les plus empathiques et créatifs. Pacifiques, imaginatifs et profondément sensibles, ce sont des artistes et guérisseurs naturels qui apportent harmonie.' },
    lt: { name: 'Ožka', traits: 'Švelnumas · Kūrybiškumas · Empatija · Ramumas', desc: 'Ožkos yra vienos iš empatiškiausių ir kūrybiškai apdovanotų ženklų. Jos taikingos, vaizduotingos ir giliai jautrios — natūralūs menininkai ir gydytojai, nešantys harmoniją.' },
  },
  {
    symbol: '🐒',
    en: { name: 'Monkey', traits: 'Clever · Agile · Inventive · Playful', desc: 'Monkeys are endlessly clever, curious and inventive. They have sharp minds and a gift for problem-solving that makes them excel in complex situations. Playful and social, they bring energy and wit wherever they go.' },
    ru: { name: 'Обезьяна', traits: 'Ум · Ловкость · Изобретательность · Игривость', desc: 'Обезьяны бесконечно умны, любопытны и изобретательны. Они обладают острым умом и даром решения проблем, преуспевая в сложных ситуациях. Игривые и общительные, они везде несут энергию.' },
    uk: { name: 'Мавпа', traits: 'Розум · Спритність · Винахідливість · Грайливість', desc: 'Мавпи безкінечно розумні, допитливі та винахідливі. Вони мають гострий розум та дар вирішення проблем, що дозволяє їм процвітати у складних ситуаціях.' },
    fr: { name: 'Singe', traits: 'Intelligent · Agile · Inventif · Joueur', desc: 'Les Singes sont infiniment intelligents, curieux et inventifs. Dotés d\'un esprit vif et d\'un talent pour résoudre les problèmes, ils excellent dans les situations complexes. Joueurs et sociaux.' },
    lt: { name: 'Beždžionė', traits: 'Intelektas · Vikrumas · Išradingumas · Žaismingumas', desc: 'Beždžionės yra begaliniai protingos, smalsios ir išradingos. Jos turi aštrų protą ir problemų sprendimo dovaną, leidžiančią joms puikiai sekti sudėtingose situacijose.' },
  },
  {
    symbol: '🐓',
    en: { name: 'Rooster', traits: 'Observant · Confident · Hardworking · Honest', desc: 'Roosters are meticulous observers who miss nothing. They are hardworking, proud and honest — setting high standards for themselves and others, and communicating with a directness that some find refreshing and others find bold.' },
    ru: { name: 'Петух', traits: 'Наблюдательность · Уверенность · Трудолюбие · Честность', desc: 'Петухи — дотошные наблюдатели, не упускающие ничего. Они трудолюбивы, горды и честны — ставят высокие стандарты для себя и других и общаются с прямолинейностью, которую одни находят освежающей.' },
    uk: { name: 'Півень', traits: 'Спостережливість · Впевненість · Працьовитість · Чесність', desc: 'Півні — прискіпливі спостерігачі, що не пропускають нічого. Вони працьовиті, горді та чесні — встановлюють високі стандарти для себе та інших.' },
    fr: { name: 'Coq', traits: 'Observateur · Confiant · Travailleur · Honnête', desc: 'Les Coqs sont des observateurs méticuleux qui ne manquent rien. Travailleurs, fiers et honnêtes, ils fixent des standards élevés pour eux-mêmes et les autres, communiquant avec une franchise directe.' },
    lt: { name: 'Gaidys', traits: 'Stebėjimas · Pasitikėjimas · Darbštumas · Sąžiningumas', desc: 'Gaidžiai yra kruopštūs stebėtojai, nepraleidžiantys nieko. Jie darbštūs, didžiuojasi savimi ir sąžiningi — nustato aukštus standartus sau ir kitiems.' },
  },
  {
    symbol: '🐕',
    en: { name: 'Dog', traits: 'Loyal · Honest · Protective · Faithful', desc: 'Dogs are the most loyal creatures of the Chinese zodiac. Honest, dependable and deeply devoted, they have an innate sense of justice and will stand up for what is right. Their steadfast love and integrity make them the most trusted companions.' },
    ru: { name: 'Собака', traits: 'Лояльность · Честность · Защита · Верность', desc: 'Собаки — самые верные существа китайского зодиака. Честные, надёжные и глубоко преданные, они обладают врождённым чувством справедливости и будут отстаивать правое дело.' },
    uk: { name: 'Собака', traits: 'Лояльність · Чесність · Захист · Вірність', desc: 'Собаки — найвірніші істоти китайського зодіаку. Чесні, надійні та глибоко відданні, вони мають вроджене почуття справедливості та відстоюватимуть праву справу.' },
    fr: { name: 'Chien', traits: 'Loyal · Honnête · Protecteur · Fidèle', desc: 'Les Chiens sont les créatures les plus loyales du zodiaque chinois. Honnêtes, fiables et profondément dévoués, ils ont un sens inné de la justice et défendront toujours ce qui est juste.' },
    lt: { name: 'Šuo', traits: 'Lojalumas · Sąžiningumas · Apsauga · Ištikimybė', desc: 'Šunys yra labiausiai lojalūs kinų zodiako padarai. Sąžiningi, patikimi ir giliai atsidavę, jie turi įgimtą teisingumo jausmą ir visada gina tai, kas teisinga.' },
  },
  {
    symbol: '🐖',
    en: { name: 'Pig', traits: 'Generous · Compassionate · Optimistic · Sincere', desc: 'Pigs are among the most warm-hearted and generous signs of the Chinese zodiac. Optimistic, sincere and deeply empathetic, they always see the good in people and approach life with an open heart and genuine enjoyment of its many pleasures.' },
    ru: { name: 'Свинья', traits: 'Щедрость · Сострадание · Оптимизм · Искренность', desc: 'Свиньи — одни из самых сердечных и щедрых знаков китайского зодиака. Оптимистичные, искренние и глубоко сочувствующие, они всегда видят хорошее в людях и подходят к жизни с открытым сердцем.' },
    uk: { name: 'Свиня', traits: 'Щедрість · Співчуття · Оптимізм · Щирість', desc: 'Свині — одні з найсердечніших та найщедріших знаків китайського зодіаку. Оптимістичні, щирі та глибоко співчутливі, вони завжди бачать хороше в людях.' },
    fr: { name: 'Cochon', traits: 'Généreux · Compatissant · Optimiste · Sincère', desc: 'Les Cochons sont parmi les signes les plus chaleureux et généreux du zodiaque chinois. Optimistes, sincères et profondément empathiques, ils voient toujours le bien en autrui.' },
    lt: { name: 'Kiaulė', traits: 'Dosnumas · Užuojauta · Optimizmas · Nuoširdumas', desc: 'Kiaulės yra vienos iš šilčiausių ir dosniausių kinų zodiako ženklų. Optimistiškos, nuoširdžios ir giliai empatiškos, jos visada mato gera žmonėse.' },
  },
];

const ELEMENTS: Record<string, string[]> = {
  en: ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'],
  ru: ['Металл', 'Металл', 'Вода', 'Вода', 'Дерево', 'Дерево', 'Огонь', 'Огонь', 'Земля', 'Земля'],
  uk: ['Метал', 'Метал', 'Вода', 'Вода', 'Дерево', 'Дерево', 'Вогонь', 'Вогонь', 'Земля', 'Земля'],
  fr: ['Métal', 'Métal', 'Eau', 'Eau', 'Bois', 'Bois', 'Feu', 'Feu', 'Terre', 'Terre'],
  lt: ['Metalas', 'Metalas', 'Vanduo', 'Vanduo', 'Medis', 'Medis', 'Ugnis', 'Ugnis', 'Žemė', 'Žemė'],
};

const YIN_YANG: Record<string, [string, string]> = {
  en: ['Yang ☀️', 'Yin 🌙'],
  ru: ['Ян ☀️', 'Инь 🌙'],
  uk: ['Ян ☀️', 'Інь 🌙'],
  fr: ['Yang ☀️', 'Yin 🌙'],
  lt: ['Yang ☀️', 'Yin 🌙'],
};

function getAnimalIndex(year: number): number {
  return ((year - 1900) % 12 + 12) % 12;
}

export default function ChineseZodiacCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const elements = ELEMENTS[locale] ?? ELEMENTS.en;
  const yinYang = YIN_YANG[locale] ?? YIN_YANG.en;

  const [yearStr, setYearStr] = useState('');
  const [result, setResult] = useState<null | { idx: number; element: string; energy: string }>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const year = parseInt(yearStr, 10);
    if (!yearStr.trim()) { setError(t.errEmpty); setResult(null); return; }
    if (isNaN(year) || year < 1900 || year > 2030) { setError(t.errInvalid); setResult(null); return; }
    setError('');
    setResult({
      idx: getAnimalIndex(year),
      element: elements[year % 10],
      energy: yinYang[year % 2 === 0 ? 0 : 1],
    });
  };

  const animal = result !== null ? ANIMALS[result.idx] : null;
  const animalData = animal ? ((animal[locale as keyof typeof animal] ?? animal.en) as AnimalLocale) : null;

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="number"
          className={styles.calc__input}
          placeholder={t.placeholder}
          value={yearStr}
          min={1900}
          max={2030}
          onChange={(e) => { setYearStr(e.target.value); setError(''); setResult(null); }}
          onKeyDown={(e) => e.key === 'Enter' && calculate()}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {result !== null && animal && animalData && (
        <div className={styles.calc__result}>
          <div className={styles.calc__symbol}>{animal.symbol}</div>
          <h3 className={styles.calc__name}>{animalData.name}</h3>
          <p className={styles.calc__traits}>{animalData.traits}</p>
          <div className={styles.calc__tags}>
            <span className={styles.calc__tag}>{t.elementLabel}: {result.element}</span>
            <span className={styles.calc__tag}>{t.energyLabel}: {result.energy}</span>
          </div>
          <p className={styles.calc__desc}>{animalData.desc}</p>
          <p className={styles.calc__note}>{t.noteText}</p>
        </div>
      )}
    </div>
  );
}
