'use client';

import { useState } from 'react';
import styles from './ArchetypeNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; resultTitle: string;
  masterBadge: string; strengthsTitle: string; challengesTitle: string; purposeTitle: string;
  errEmpty: string; errInvalid: string;
}> = {
  en: {
    label: 'Date of birth', btn: 'Find My Archetype', resultTitle: 'Your Personality Archetype',
    masterBadge: 'Master Number', strengthsTitle: 'Core Strengths', challengesTitle: 'Key Challenges', purposeTitle: 'Life Purpose',
    errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.',
  },
  ru: {
    label: 'Дата рождения', btn: 'Найти мой архетип', resultTitle: 'Ваш архетип личности',
    masterBadge: 'Мастер-число', strengthsTitle: 'Сильные стороны', challengesTitle: 'Ключевые вызовы', purposeTitle: 'Жизненное предназначение',
    errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.',
  },
  uk: {
    label: 'Дата народження', btn: 'Знайти мій архетип', resultTitle: 'Ваш архетип особистості',
    masterBadge: 'Майстер-число', strengthsTitle: 'Сильні сторони', challengesTitle: 'Ключові виклики', purposeTitle: 'Життєве призначення',
    errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.',
  },
  fr: {
    label: 'Date de naissance', btn: 'Trouver mon archétype', resultTitle: 'Votre Archétype de Personnalité',
    masterBadge: 'Nombre Maître', strengthsTitle: 'Forces Principales', challengesTitle: 'Défis Clés', purposeTitle: 'But de Vie',
    errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.',
  },
  lt: {
    label: 'Gimimo data', btn: 'Rasti mano archetipą', resultTitle: 'Jūsų asmenybės archetipas',
    masterBadge: 'Meistro skaičius', strengthsTitle: 'Pagrindinės stiprybės', challengesTitle: 'Pagrindiniai iššūkiai', purposeTitle: 'Gyvenimo tikslas',
    errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite galiojančią datą.',
  },
};

type ArchetypeData = {
  name: string; symbol: string; tagline: string;
  strengths: string[]; challenges: string[]; purpose: string;
};

const ARCHETYPES: Record<number, Record<string, ArchetypeData>> = {
  1: {
    en: { name: 'The Pioneer', symbol: '🔥', tagline: 'Independent visionary who forges new paths',
      strengths: ['Natural leadership', 'Fierce independence', 'Originality and courage', 'Ability to initiate'],
      challenges: ['Tendency to dominate', 'Difficulty with collaboration', 'Impatience with slower pace'],
      purpose: 'To lead, innovate and show others that the impossible is achievable.' },
    ru: { name: 'Первопроходец', symbol: '🔥', tagline: 'Независимый визионер, прокладывающий новые пути',
      strengths: ['Природное лидерство', 'Независимость', 'Оригинальность и смелость', 'Способность к инициативе'],
      challenges: ['Склонность к доминированию', 'Трудности с сотрудничеством', 'Нетерпеливость'],
      purpose: 'Вести за собой, внедрять инновации и показывать другим, что невозможное достижимо.' },
    uk: { name: 'Першопрохідець', symbol: '🔥', tagline: 'Незалежний візіонер, що прокладає нові шляхи',
      strengths: ['Природне лідерство', 'Незалежність', 'Оригінальність і сміливість', 'Здатність до ініціативи'],
      challenges: ['Схильність до домінування', 'Труднощі із співпрацею', 'Нетерплячість'],
      purpose: 'Вести за собою, впроваджувати інновації та показувати іншим, що неможливе є досяжним.' },
    fr: { name: 'Le Pionnier', symbol: '🔥', tagline: 'Visionnaire indépendant qui trace de nouveaux chemins',
      strengths: ['Leadership naturel', 'Indépendance farouche', 'Originalité et courage', "Capacité d'initiative"],
      challenges: ['Tendance à dominer', 'Difficulté à collaborer', 'Impatience'],
      purpose: "Diriger, innover et montrer aux autres que l'impossible est réalisable." },
    lt: { name: 'Pradininkas', symbol: '🔥', tagline: 'Nepriklausomas visionierius, pramaunantis naujus kelius',
      strengths: ['Natūralus lyderystė', 'Nepriklausomumas', 'Originalumas ir drąsa', 'Iniciatyvumas'],
      challenges: ['Polinkis dominuoti', 'Sunkumai bendradarbiaujant', 'Nekantrumas'],
      purpose: 'Vadovauti, novatoriškai veikti ir parodyti kitiems, kad neįmanoma yra pasiekiama.' },
  },
  2: {
    en: { name: 'The Diplomat', symbol: '🕊️', tagline: 'Sensitive harmoniser who bridges divides',
      strengths: ['Deep empathy', 'Excellent listening skills', 'Gift for mediation', 'Patience and tact'],
      challenges: ['Over-sensitivity', 'Difficulty with confrontation', 'Tendency to self-doubt'],
      purpose: 'To bring peace, foster cooperation and remind the world of the power of kindness.' },
    ru: { name: 'Дипломат', symbol: '🕊️', tagline: 'Чуткий гармонизатор, наводящий мосты между людьми',
      strengths: ['Глубокая эмпатия', 'Отличный слушатель', 'Дар к посредничеству', 'Терпение и такт'],
      challenges: ['Чрезмерная чувствительность', 'Трудности с конфронтацией', 'Склонность к самосомнению'],
      purpose: 'Нести мир, поощрять сотрудничество и напоминать миру о силе доброты.' },
    uk: { name: 'Дипломат', symbol: '🕊️', tagline: 'Чуйний гармонізатор, що наводить мости між людьми',
      strengths: ['Глибока емпатія', 'Відмінний слухач', 'Дар до посередництва', 'Терпіння та такт'],
      challenges: ['Надмірна чутливість', 'Труднощі з конфронтацією', 'Схильність до самосумніву'],
      purpose: 'Нести мир, заохочувати співпрацю та нагадувати світу про силу доброти.' },
    fr: { name: 'Le Diplomate', symbol: '🕊️', tagline: 'Harmonisateur sensible qui construit des ponts',
      strengths: ['Profonde empathie', 'Excellente écoute', 'Don pour la médiation', 'Patience et tact'],
      challenges: ['Hypersensibilité', 'Difficulté avec la confrontation', 'Tendance au doute de soi'],
      purpose: 'Apporter la paix, favoriser la coopération et rappeler au monde la puissance de la bienveillance.' },
    lt: { name: 'Diplomatas', symbol: '🕊️', tagline: 'Jautrus harmonizatorius, statantis tiltus tarp žmonių',
      strengths: ['Gili empatija', 'Puikūs klausymo įgūdžiai', 'Mediavimo talentas', 'Kantrybė ir taktiškumas'],
      challenges: ['Hiperjautrumas', 'Sunkumai su konfrontacija', 'Polinkis abejoti savimi'],
      purpose: 'Atnešti taiką, skatinti bendradarbiavimą ir priminti pasauliui gerumo galią.' },
  },
  3: {
    en: { name: 'The Storyteller', symbol: '✨', tagline: 'Joyful creator who illuminates life through expression',
      strengths: ['Vivid imagination', 'Powerful communication', 'Natural optimism', 'Artistic sensitivity'],
      challenges: ['Scattered focus', 'Tendency to superficiality', 'Emotional highs and lows'],
      purpose: 'To inspire, uplift and bring beauty into the world through creative expression.' },
    ru: { name: 'Рассказчик', symbol: '✨', tagline: 'Жизнерадостный творец, освещающий жизнь через выражение',
      strengths: ['Яркое воображение', 'Мощная коммуникация', 'Природный оптимизм', 'Художественная чувствительность'],
      challenges: ['Рассеянный фокус', 'Склонность к поверхностности', 'Эмоциональные взлёты и падения'],
      purpose: 'Вдохновлять, воодушевлять и привносить красоту в мир через творческое самовыражение.' },
    uk: { name: 'Оповідач', symbol: '✨', tagline: 'Радісний творець, що освітлює життя через вираження',
      strengths: ['Яскрава уява', 'Потужна комунікація', 'Природний оптимізм', 'Художня чутливість'],
      challenges: ['Розсіяний фокус', 'Схильність до поверховості', 'Емоційні злети та падіння'],
      purpose: 'Надихати, підбадьорювати та привносити красу у світ через творче самовираження.' },
    fr: { name: 'Le Conteur', symbol: '✨', tagline: "Créateur joyeux qui illumine la vie par l'expression",
      strengths: ['Imagination vive', 'Communication puissante', 'Optimisme naturel', 'Sensibilité artistique'],
      challenges: ['Manque de concentration', 'Tendance à la superficialité', 'Hauts et bas émotionnels'],
      purpose: "Inspirer, élever et apporter de la beauté dans le monde par l'expression créative." },
    lt: { name: 'Pasakotojas', symbol: '✨', tagline: 'Džiaugsmingas kūrėjas, apšviečiantis gyvenimą raiška',
      strengths: ['Ryški vaizduotė', 'Galinga komunikacija', 'Natūralus optimizmas', 'Meninis jautrumas'],
      challenges: ['Išsibarstęs dėmesys', 'Polinkis į paviršutiniškumą', 'Emociniai pakilomai ir nuosmukiai'],
      purpose: 'Įkvėpti, pakelti ir atnešti grožį į pasaulį per kūrybinę raišką.' },
  },
  4: {
    en: { name: 'The Architect', symbol: '🏛️', tagline: 'Master builder who creates lasting structure',
      strengths: ['Exceptional discipline', 'Reliability and loyalty', 'Methodical problem-solving', 'Long-term thinking'],
      challenges: ['Resistance to change', 'Over-rigidity', 'Difficulty delegating', 'Workaholism'],
      purpose: 'To build systems, structures and foundations that stand the test of time.' },
    ru: { name: 'Архитектор', symbol: '🏛️', tagline: 'Мастер-строитель, создающий долговечные структуры',
      strengths: ['Исключительная дисциплина', 'Надёжность и верность', 'Методичное решение проблем', 'Долгосрочное мышление'],
      challenges: ['Сопротивление переменам', 'Чрезмерная жёсткость', 'Трудности с делегированием', 'Трудоголизм'],
      purpose: 'Строить системы, структуры и основы, способные выдержать испытание временем.' },
    uk: { name: 'Архітектор', symbol: '🏛️', tagline: 'Майстер-будівельник, що створює довговічні структури',
      strengths: ['Виняткова дисципліна', 'Надійність та вірність', 'Методичне вирішення проблем', 'Довгострокове мислення'],
      challenges: ['Опір змінам', 'Надмірна жорсткість', 'Труднощі з делегуванням', 'Трудоголізм'],
      purpose: 'Будувати системи, структури та основи, здатні витримати випробування часом.' },
    fr: { name: "L'Architecte", symbol: '🏛️', tagline: 'Maître bâtisseur qui crée des structures durables',
      strengths: ['Discipline exceptionnelle', 'Fiabilité et loyauté', 'Résolution méthodique', 'Vision à long terme'],
      challenges: ['Résistance au changement', 'Rigidité excessive', 'Difficulté à déléguer', 'Boulomanie'],
      purpose: 'Construire des systèmes, des structures et des fondations qui résistent à l\'épreuve du temps.' },
    lt: { name: 'Architektas', symbol: '🏛️', tagline: 'Meistras statytojas, kuriantis ilgalaikę struktūrą',
      strengths: ['Išskirtinė disciplina', 'Patikimumas ir ištikimybė', 'Metodiškas problemų sprendimas', 'Ilgalaikis mąstymas'],
      challenges: ['Pasipriešinimas pokyčiams', 'Per didelis standumas', 'Sunkumai deleguojant', 'Darbomanija'],
      purpose: 'Kurti sistemas, struktūras ir pamatus, kurie atlaikys laiko išbandymą.' },
  },
  5: {
    en: { name: 'The Adventurer', symbol: '🌊', tagline: 'Free-spirited explorer who embraces life\'s full range',
      strengths: ['Adaptability', 'Magnetic charisma', 'Quick intelligence', 'Courage to embrace change'],
      challenges: ['Commitment issues', 'Restlessness', 'Tendency to excess', 'Difficulty with routine'],
      purpose: 'To experience freedom, catalyse change and show others the art of living fully in the moment.' },
    ru: { name: 'Авантюрист', symbol: '🌊', tagline: 'Свободный исследователь, принимающий всю полноту жизни',
      strengths: ['Адаптивность', 'Магнетическая харизма', 'Быстрый интеллект', 'Смелость принять перемены'],
      challenges: ['Проблемы с обязательствами', 'Непоседливость', 'Склонность к излишествам', 'Трудности с рутиной'],
      purpose: 'Познавать свободу, катализировать перемены и показывать другим искусство жить в полную силу.' },
    uk: { name: 'Авантюрист', symbol: '🌊', tagline: 'Вільний дослідник, що приймає всю повноту життя',
      strengths: ['Адаптивність', 'Магнетична харизма', 'Швидкий інтелект', 'Сміливість прийняти зміни'],
      challenges: ['Проблеми з зобов\'язаннями', 'Непосидючість', 'Схильність до надмірностей', 'Труднощі з рутиною'],
      purpose: 'Пізнавати свободу, каталізувати зміни та показувати іншим мистецтво жити в повну силу.' },
    fr: { name: "L'Aventurier", symbol: '🌊', tagline: "Explorateur libre qui embrasse toute la richesse de la vie",
      strengths: ['Adaptabilité', 'Charisme magnétique', 'Intelligence vive', 'Courage d\'embrasser le changement'],
      challenges: ['Problèmes d\'engagement', 'Agitation', 'Tendance aux excès', 'Difficulté avec la routine'],
      purpose: 'Vivre la liberté, catalyser le changement et montrer l\'art de vivre pleinement l\'instant présent.' },
    lt: { name: 'Nuotykių ieškotojas', symbol: '🌊', tagline: 'Laisvos dvasios tyrinėtojas, priimantis visą gyvenimo spektrą',
      strengths: ['Prisitaikymas', 'Magnetiškas charizma', 'Greitas intelektas', 'Drąsa priimti pokyčius'],
      challenges: ['Įsipareigojimo problemos', 'Neramumas', 'Polinkis į perteklių', 'Sunkumai su rutina'],
      purpose: 'Patirti laisvę, katalizuoti pokyčius ir parodyti kitiems visapusiško gyvenimo meną.' },
  },
  6: {
    en: { name: 'The Healer', symbol: '💚', tagline: 'Devoted guardian whose love transforms and protects',
      strengths: ['Unconditional love', 'Healing presence', 'Strong sense of responsibility', 'Gift for nurturing'],
      challenges: ['Martyrdom tendencies', 'Boundary issues', 'Over-giving', 'Perfectionism about others'],
      purpose: 'To nurture, protect and heal — creating harmony and love in family and community.' },
    ru: { name: 'Целитель', symbol: '💚', tagline: 'Преданный хранитель, чья любовь преобразует и защищает',
      strengths: ['Безусловная любовь', 'Целительное присутствие', 'Сильное чувство ответственности', 'Дар заботы'],
      challenges: ['Склонность к мученичеству', 'Проблемы с границами', 'Чрезмерная самоотдача', 'Перфекционизм в отношении других'],
      purpose: 'Заботиться, защищать и исцелять — создавая гармонию и любовь в семье и обществе.' },
    uk: { name: 'Цілитель', symbol: '💚', tagline: 'Відданий охоронець, чия любов перетворює і захищає',
      strengths: ['Безумовна любов', 'Цілюща присутність', 'Сильне почуття відповідальності', 'Дар турботи'],
      challenges: ['Схильність до мучеництва', 'Проблеми з межами', 'Надмірна самовіддача', 'Перфекціонізм щодо інших'],
      purpose: 'Піклуватися, захищати та зцілювати — створюючи гармонію і любов у сім\'ї та суспільстві.' },
    fr: { name: 'Le Guérisseur', symbol: '💚', tagline: "Gardien dévoué dont l'amour transforme et protège",
      strengths: ['Amour inconditionnel', 'Présence guérisseuse', 'Fort sens des responsabilités', 'Don pour prendre soin'],
      challenges: ['Tendances au martyre', 'Problèmes de limites', 'Don excessif', 'Perfectionnisme envers les autres'],
      purpose: "Nourrir, protéger et guérir — créer harmonie et amour dans la famille et la communauté." },
    lt: { name: 'Gydytojas', symbol: '💚', tagline: 'Atsidavęs sargas, kurio meilė transformuoja ir saugo',
      strengths: ['Besąlyginė meilė', 'Gydanti buvimas', 'Stiprus atsakomybės jausmas', 'Rūpinimosi talentas'],
      challenges: ['Polinkis į kankinystę', 'Ribų problemos', 'Per didelis davimas', 'Perfekcionizmas kitų atžvilgiu'],
      purpose: 'Rūpintis, saugoti ir gydyti — kurti harmoniją ir meilę šeimoje ir bendruomenėje.' },
  },
  7: {
    en: { name: 'The Mystic', symbol: '🔮', tagline: 'Deep thinker who seeks truth beyond the surface',
      strengths: ['Profound analytical mind', 'Spiritual awareness', 'Intuitive intelligence', 'Research mastery'],
      challenges: ['Social withdrawal', 'Emotional aloofness', 'Tendency to cynicism', 'Perfectionism paralysis'],
      purpose: 'To seek, understand and transmit deep wisdom — bridging the visible world with the invisible.' },
    ru: { name: 'Мистик', symbol: '🔮', tagline: 'Глубокий мыслитель, ищущий истину за поверхностью',
      strengths: ['Глубокий аналитический ум', 'Духовная осознанность', 'Интуитивный интеллект', 'Мастерство исследования'],
      challenges: ['Социальная замкнутость', 'Эмоциональная отстранённость', 'Склонность к цинизму', 'Перфекционистский паралич'],
      purpose: 'Искать, понимать и передавать глубокую мудрость — соединяя видимый мир с невидимым.' },
    uk: { name: 'Містик', symbol: '🔮', tagline: 'Глибокий мислитель, що шукає істину за поверхнею',
      strengths: ['Глибокий аналітичний розум', 'Духовна усвідомленість', 'Інтуїтивний інтелект', 'Майстерність дослідження'],
      challenges: ['Соціальна замкнутість', 'Емоційна відстороненість', 'Схильність до цинізму', 'Перфекціоністський параліч'],
      purpose: 'Шукати, розуміти та передавати глибоку мудрість — поєднуючи видимий світ з невидимим.' },
    fr: { name: 'Le Mystique', symbol: '🔮', tagline: 'Penseur profond qui cherche la vérité au-delà de la surface',
      strengths: ['Esprit analytique profond', 'Conscience spirituelle', 'Intelligence intuitive', 'Maîtrise de la recherche'],
      challenges: ['Retrait social', 'Froideur émotionnelle', 'Tendance au cynisme', 'Paralysie par perfectionnisme'],
      purpose: 'Chercher, comprendre et transmettre une sagesse profonde — relier le monde visible à l\'invisible.' },
    lt: { name: 'Mistikas', symbol: '🔮', tagline: 'Gilus mąstytojas, ieškantis tiesos už paviršiaus',
      strengths: ['Gilus analitinis protas', 'Dvasinė sąmonė', 'Intuityvi intelektas', 'Tyrimų meistriškumas'],
      challenges: ['Socialinis atsiribojimas', 'Emocinis šaltumas', 'Polinkis į cinizmą', 'Perfekcionizmo paralyžius'],
      purpose: 'Ieškoti, suprasti ir perduoti gilią išmintį — sujungiant matomą pasaulį su nematomu.' },
  },
  8: {
    en: { name: 'The Executive', symbol: '⚖️', tagline: 'Power-conscious achiever who masters the material world',
      strengths: ['Exceptional organisational ability', 'Business acumen', 'Ambitious determination', 'Natural authority'],
      challenges: ['Workaholic tendencies', 'Power struggles', 'Materialism', 'Difficulty showing vulnerability'],
      purpose: 'To achieve mastery in the material world and use that power to create positive impact.' },
    ru: { name: 'Руководитель', symbol: '⚖️', tagline: 'Власть осознающий достигатор, овладевающий материальным миром',
      strengths: ['Исключительные организаторские способности', 'Деловое чутьё', 'Амбициозная решительность', 'Природный авторитет'],
      challenges: ['Трудоголизм', 'Борьба за власть', 'Материализм', 'Трудность в проявлении уязвимости'],
      purpose: 'Достичь мастерства в материальном мире и использовать эту силу для создания позитивного влияния.' },
    uk: { name: 'Керівник', symbol: '⚖️', tagline: 'Усвідомлений досягатор, що опановує матеріальний світ',
      strengths: ['Виняткові організаторські здібності', 'Ділова інтуїція', 'Амбітна рішучість', 'Природний авторитет'],
      challenges: ['Трудоголізм', 'Боротьба за владу', 'Матеріалізм', 'Труднощі у прояві вразливості'],
      purpose: 'Досягти майстерності у матеріальному світі та використати цю силу для створення позитивного впливу.' },
    fr: { name: "L'Exécutif", symbol: '⚖️', tagline: "Réalisateur conscient du pouvoir qui maîtrise le monde matériel",
      strengths: ['Capacité organisationnelle exceptionnelle', 'Sens des affaires', 'Détermination ambitieuse', 'Autorité naturelle'],
      challenges: ['Boulomanie', 'Luttes de pouvoir', 'Matérialisme', 'Difficulté à montrer sa vulnérabilité'],
      purpose: 'Atteindre la maîtrise dans le monde matériel et utiliser ce pouvoir pour créer un impact positif.' },
    lt: { name: 'Vadovas', symbol: '⚖️', tagline: 'Galios įsisąmoninęs pasiekėjas, valdantis materialų pasaulį',
      strengths: ['Išskirtiniai organizaciniai gebėjimai', 'Verslo nuojauta', 'Ambicinga ryžtingumas', 'Natūralus autoritetas'],
      challenges: ['Darbomanija', 'Kovos dėl galios', 'Materializmas', 'Sunkumai rodyti pažeidžiamumą'],
      purpose: 'Pasiekti meistriškumą materialiame pasaulyje ir naudoti tą galią pozityviam poveikiui kurti.' },
  },
  9: {
    en: { name: 'The Sage', symbol: '🌍', tagline: 'Wise elder soul here to serve and transform the world',
      strengths: ['Universal compassion', 'Broad wisdom', 'Ability to inspire masses', 'Selfless service'],
      challenges: ['Attachment issues', 'Resentment when unrecognised', 'Martyrdom', 'Difficulty with personal boundaries'],
      purpose: 'To serve humanity, inspire transformation and leave the world better than you found it.' },
    ru: { name: 'Мудрец', symbol: '🌍', tagline: 'Мудрая зрелая душа, пришедшая служить и преобразовывать мир',
      strengths: ['Вселенское сострадание', 'Широкая мудрость', 'Способность вдохновлять массы', 'Бескорыстное служение'],
      challenges: ['Проблемы привязанности', 'Обида при непризнании', 'Мученичество', 'Трудность с личными границами'],
      purpose: 'Служить человечеству, вдохновлять преобразования и оставить мир лучше, чем нашёл его.' },
    uk: { name: 'Мудрець', symbol: '🌍', tagline: 'Мудра зріла душа, що прийшла служити та перетворювати світ',
      strengths: ['Всесвітнє співчуття', 'Широка мудрість', 'Здатність надихати маси', 'Безкорисливе служіння'],
      challenges: ['Проблеми прив\'язаності', 'Образа при невизнанні', 'Мучеництво', 'Труднощі з особистими межами'],
      purpose: 'Служити людству, надихати перетворення та залишити світ кращим, ніж знайшов його.' },
    fr: { name: 'Le Sage', symbol: '🌍', tagline: 'Âme sage et mature venue servir et transformer le monde',
      strengths: ['Compassion universelle', 'Sagesse profonde', "Capacité à inspirer les foules", 'Service désintéressé'],
      challenges: ['Problèmes d\'attachement', 'Ressentiment quand ignoré', 'Martyre', 'Difficulté avec les limites personnelles'],
      purpose: 'Servir l\'humanité, inspirer la transformation et laisser le monde meilleur qu\'on ne l\'a trouvé.' },
    lt: { name: 'Išminčius', symbol: '🌍', tagline: 'Išmintinga subrendusi siela, atėjusi tarnauti ir transformuoti pasaulį',
      strengths: ['Visuotinis užuojautimas', 'Plati išmintis', 'Gebėjimas įkvėpti minias', 'Nesavanaudiškas tarnavimas'],
      challenges: ['Prisirišimo problemos', 'Pasipiktinimas nepripažinus', 'Kankinystė', 'Sunkumai su asmeninėmis ribomis'],
      purpose: 'Tarnauti žmonijai, įkvėpti transformaciją ir palikti pasaulį geresnį nei radai.' },
  },
  11: {
    en: { name: 'The Visionary', symbol: '💫', tagline: 'Illuminated channel between the earthly and the divine',
      strengths: ['Powerful intuition', 'Inspirational presence', 'Psychic sensitivity', 'Ability to uplift others'],
      challenges: ['Nervous tension', 'Impracticality', 'Living in extremes', 'Overwhelming sensitivity'],
      purpose: 'To channel divine inspiration and bring higher consciousness to the everyday world.' },
    ru: { name: 'Визионер', symbol: '💫', tagline: 'Просветлённый канал между земным и божественным',
      strengths: ['Мощная интуиция', 'Вдохновляющее присутствие', 'Психическая чувствительность', 'Способность поднимать других'],
      challenges: ['Нервное напряжение', 'Непрактичность', 'Жизнь в крайностях', 'Подавляющая чувствительность'],
      purpose: 'Быть каналом божественного вдохновения и привносить высшее сознание в повседневный мир.' },
    uk: { name: 'Візіонер', symbol: '💫', tagline: 'Просвітлений канал між земним і божественним',
      strengths: ['Потужна інтуїція', 'Надихаюча присутність', 'Психічна чутливість', 'Здатність піднімати інших'],
      challenges: ['Нервове напруження', 'Непрактичність', 'Життя у крайнощах', 'Пригнічуюча чутливість'],
      purpose: 'Бути каналом божественного натхнення та привносити вищу свідомість у повсякденний світ.' },
    fr: { name: 'Le Visionnaire', symbol: '💫', tagline: 'Canal illuminé entre le terrestre et le divin',
      strengths: ['Intuition puissante', 'Présence inspirante', 'Sensibilité psychique', "Capacité à élever les autres"],
      challenges: ['Tension nerveuse', 'Impraticité', 'Vie dans les extrêmes', 'Sensibilité écrasante'],
      purpose: 'Canaliser l\'inspiration divine et apporter une conscience supérieure au monde quotidien.' },
    lt: { name: 'Visionierius', symbol: '💫', tagline: 'Apšviestas kanalas tarp žemiškojo ir dieviškojo',
      strengths: ['Galinga intuicija', 'Įkvepianti buvimas', 'Psichinė jautrumas', 'Gebėjimas pakelti kitus'],
      challenges: ['Nervinė įtampa', 'Nepraktiškumas', 'Gyvenimas kraštutinumais', 'Didžiulis jautrumas'],
      purpose: 'Kanalinti dieviškąją įkvėpimą ir atnešti aukštesnę sąmonę į kasdienį pasaulį.' },
  },
  22: {
    en: { name: 'The Master Builder', symbol: '🌐', tagline: 'Grand architect who turns visions into global reality',
      strengths: ['Visionary practicality', 'Exceptional organising power', 'Ability to inspire large teams', 'Global thinking'],
      challenges: ['Fear of own potential', 'Nervous tension', 'All-or-nothing thinking', 'Crushing self-expectation'],
      purpose: 'To build systems and structures that serve humanity on a grand, lasting scale.' },
    ru: { name: 'Мастер-строитель', symbol: '🌐', tagline: 'Великий архитектор, превращающий видения в глобальную реальность',
      strengths: ['Визионерская практичность', 'Исключительная организаторская сила', 'Способность вдохновлять большие команды', 'Глобальное мышление'],
      challenges: ['Страх собственного потенциала', 'Нервное напряжение', 'Мышление «всё или ничего»', 'Сокрушительные самоожидания'],
      purpose: 'Строить системы и структуры, служащие человечеству в широком, долговечном масштабе.' },
    uk: { name: 'Майстер-будівельник', symbol: '🌐', tagline: 'Великий архітектор, що перетворює бачення на глобальну реальність',
      strengths: ['Візіонерська практичність', 'Виняткова організаторська сила', 'Здатність надихати великі команди', 'Глобальне мислення'],
      challenges: ['Страх власного потенціалу', 'Нервове напруження', 'Мислення «все або нічого»', 'Нищівні самоочікування'],
      purpose: 'Будувати системи та структури, що служать людству у широкому, довговічному масштабі.' },
    fr: { name: 'Le Maître Bâtisseur', symbol: '🌐', tagline: 'Grand architecte qui transforme les visions en réalité mondiale',
      strengths: ['Praticité visionnaire', 'Pouvoir d\'organisation exceptionnel', "Capacité à inspirer de grandes équipes", 'Pensée globale'],
      challenges: ['Peur de son propre potentiel', 'Tension nerveuse', 'Pensée tout ou rien', 'Attentes écrasantes envers soi'],
      purpose: "Construire des systèmes et structures qui servent l'humanité à grande échelle et durablement." },
    lt: { name: 'Meistro statytojas', symbol: '🌐', tagline: 'Didis architektas, paverčiantis vizijas globaline tikrove',
      strengths: ['Vizioneriškas praktiškumas', 'Išskirtinė organizavimo galia', 'Gebėjimas įkvėpti didelius komandas', 'Globalus mąstymas'],
      challenges: ['Baimė savo potencialaus', 'Nervinė įtampa', 'Viso arba nieko mąstymas', 'Žlugdantys lūkesčiai sau'],
      purpose: 'Kurti sistemas ir struktūras, tarnaujančias žmonijai dideliu, ilgalaikiu mastu.' },
  },
  33: {
    en: { name: 'The Master Teacher', symbol: '🕯️', tagline: 'Rare sacred healer called to serve humanity through love',
      strengths: ['Unconditional love at scale', 'Healing wisdom', 'Selfless compassion', 'Power to inspire through example'],
      challenges: ['Taking on the world\'s suffering', 'Extreme self-sacrifice', 'Martyrdom', 'Neglecting personal needs'],
      purpose: 'To teach through unconditional love — serving as a living example of compassion in action.' },
    ru: { name: 'Мастер-учитель', symbol: '🕯️', tagline: 'Редкий священный целитель, призванный служить человечеству через любовь',
      strengths: ['Безусловная любовь в масштабе', 'Исцеляющая мудрость', 'Бескорыстное сострадание', 'Сила вдохновлять примером'],
      challenges: ['Принятие чужих страданий', 'Крайнее самопожертвование', 'Мученичество', 'Пренебрежение личными потребностями'],
      purpose: 'Учить через безусловную любовь — служить живым примером сострадания в действии.' },
    uk: { name: 'Майстер-вчитель', symbol: '🕯️', tagline: 'Рідкісний священний цілитель, покликаний служити людству через любов',
      strengths: ['Безумовна любов у масштабі', 'Зцілювальна мудрість', 'Безкорисливе співчуття', 'Сила надихати прикладом'],
      challenges: ['Прийняття чужих страждань', 'Крайнє самопожертвування', 'Мучеництво', 'Нехтування особистими потребами'],
      purpose: 'Вчити через безумовну любов — служити живим прикладом співчуття в дії.' },
    fr: { name: 'Le Maître Enseignant', symbol: '🕯️', tagline: "Rare guérisseur sacré appelé à servir l'humanité par l'amour",
      strengths: ["Amour inconditionnel à grande échelle", 'Sagesse guérisseuse', 'Compassion désintéressée', "Pouvoir d'inspirer par l'exemple"],
      challenges: ["Absorber la souffrance du monde", 'Auto-sacrifice extrême', 'Martyre', 'Négligence des besoins personnels'],
      purpose: "Enseigner par l'amour inconditionnel — servir d'exemple vivant de la compassion en action." },
    lt: { name: 'Meistro mokytojas', symbol: '🕯️', tagline: 'Retas šventas gydytojas, pašauktas tarnauti žmonijai per meilę',
      strengths: ['Besąlyginė meilė dideliu mastu', 'Gydanti išmintis', 'Nesavanaudiškas užuojautimas', 'Galia įkvėpti pavyzdžiu'],
      challenges: ['Pasaulio kančios prisiėmimas', 'Kraštutinė savęs aukojimas', 'Kankinystė', 'Asmeninių poreikių ignoravimas'],
      purpose: 'Mokyti per besąlyginę meilę — tarnauti kaip gyvas užuojautos veiksmais pavyzdys.' },
  },
};

function digitSum(n: number): number {
  return String(Math.abs(n)).split('').reduce((s, d) => s + parseInt(d, 10), 0);
}
function reduce(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n <= 9) return n;
  return reduce(digitSum(n));
}
function calcLifePath(dateStr: string): number {
  const total = dateStr.replace(/-/g, '').split('').reduce((s, d) => s + parseInt(d, 10), 0);
  return reduce(total);
}

export default function ArchetypeNumberCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setResult(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime()) || d.getFullYear() < 1900 || d > new Date()) {
      setError(t.errInvalid); setResult(null); return;
    }
    setError('');
    setResult(calcLifePath(date));
  };

  const archetype = result !== null ? (ARCHETYPES[result]?.[locale] ?? ARCHETYPES[result]?.en) : null;
  const isMaster = result === 11 || result === 22 || result === 33;

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => { setDate(e.target.value); setError(''); setResult(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}

      {result !== null && archetype && (
        <div className={styles.calc__result}>
          <div className={styles.calc__header}>
            <span className={styles.calc__symbol}>{archetype.symbol}</span>
            <div className={styles.calc__header_text}>
              {isMaster && <span className={styles.calc__master}>{t.masterBadge} {result}</span>}
              {!isMaster && <span className={styles.calc__number}>#{result}</span>}
              <h2 className={styles.calc__name}>{archetype.name}</h2>
            </div>
          </div>
          <p className={styles.calc__tagline}>{archetype.tagline}</p>

          <div className={styles.calc__sections}>
            <div className={styles.calc__section}>
              <h3 className={styles.calc__section_title}>{t.strengthsTitle}</h3>
              <ul className={styles.calc__list}>
                {archetype.strengths.map((s, i) => (
                  <li key={i} className={styles.calc__list_item}>{s}</li>
                ))}
              </ul>
            </div>
            <div className={styles.calc__section}>
              <h3 className={styles.calc__section_title}>{t.challengesTitle}</h3>
              <ul className={styles.calc__list}>
                {archetype.challenges.map((c, i) => (
                  <li key={i} className={`${styles.calc__list_item} ${styles['calc__list_item--challenge']}`}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.calc__purpose}>
            <h3 className={styles.calc__purpose_title}>{t.purposeTitle}</h3>
            <p className={styles.calc__purpose_text}>{archetype.purpose}</p>
          </div>
        </div>
      )}
    </div>
  );
}
