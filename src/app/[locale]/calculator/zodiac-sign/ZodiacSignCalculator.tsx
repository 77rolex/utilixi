'use client';

import { useState } from 'react';
import styles from './ZodiacSignCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, { label: string; btn: string; errEmpty: string; errInvalid: string }> = {
  en: { label: 'Date of birth', btn: 'Find My Zodiac Sign', errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.' },
  ru: { label: 'Дата рождения', btn: 'Определить знак зодиака', errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.' },
  uk: { label: 'Дата народження', btn: 'Визначити знак зодіаку', errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.' },
  fr: { label: 'Date de naissance', btn: 'Trouver mon signe du zodiaque', errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.' },
  lt: { label: 'Gimimo data', btn: 'Rasti zodiako ženklą', errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite teisingą datą.' },
};

type SignLocale = { name: string; dates: string; element: string; planet: string; desc: string };

const SIGNS: {
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  en: SignLocale; ru: SignLocale; uk: SignLocale; fr: SignLocale; lt: SignLocale;
}[] = [
  {
    symbol: '♈', element: 'fire',
    en: { name: 'Aries', dates: 'March 21 – April 19', element: 'Fire', planet: 'Mars', desc: 'Aries is the first sign of the zodiac — bold, energetic and fiercely independent. Those born under Aries are natural leaders who dive into life headfirst, driven by enthusiasm, courage and a powerful need to be first.' },
    ru: { name: 'Овен', dates: '21 марта – 19 апреля', element: 'Огонь', planet: 'Марс', desc: 'Овен — первый знак зодиака: смелый, энергичный и яростно независимый. Рождённые под знаком Овна — прирождённые лидеры, бросающиеся в жизнь с головой, движимые энтузиазмом, мужеством и мощной потребностью быть первыми.' },
    uk: { name: 'Овен', dates: '21 березня – 19 квітня', element: 'Вогонь', planet: 'Марс', desc: 'Овен — перший знак зодіаку: сміливий, енергійний та запально незалежний. Народжені під знаком Овна — природжені лідери, що кидаються в життя стрімголов, рухані ентузіазмом та мужністю.' },
    fr: { name: 'Bélier', dates: '21 mars – 19 avril', element: 'Feu', planet: 'Mars', desc: 'Le Bélier est le premier signe du zodiaque — audacieux, énergique et farouchement indépendant. Ceux nés sous le Bélier sont des leaders naturels qui plongent dans la vie, animés par l\'enthousiasme et le courage.' },
    lt: { name: 'Avinas', dates: 'kovo 21 – balandžio 19', element: 'Ugnis', planet: 'Marsas', desc: 'Avinas yra pirmasis zodiako ženklas — drąsus, energingas ir atkakliai nepriklausomas. Gimę po Avinu yra natūralūs lyderiai, kurie stoja į gyvenimą entuziastingai, skatinami drąsos ir galingos poreikio būti pirmais.' },
  },
  {
    symbol: '♉', element: 'earth',
    en: { name: 'Taurus', dates: 'April 20 – May 20', element: 'Earth', planet: 'Venus', desc: 'Taurus is the sign of steadfast reliability, sensual pleasure and patient determination. Those born under this sign are deeply loyal, love beauty and comfort, and build their lives on a foundation of practical stability and trustworthiness.' },
    ru: { name: 'Телец', dates: '20 апреля – 20 мая', element: 'Земля', planet: 'Венера', desc: 'Телец — знак непоколебимой надёжности, чувственного удовольствия и терпеливой решимости. Рождённые под этим знаком глубоко преданы, любят красоту и комфорт и строят свою жизнь на фундаменте практической стабильности.' },
    uk: { name: 'Телець', dates: '20 квітня – 20 травня', element: 'Земля', planet: 'Венера', desc: 'Телець — знак непохитної надійності, чуттєвого задоволення та терплячої рішучості. Народжені під цим знаком глибоко відданні, люблять красу та комфорт і будують своє життя на фундаменті практичної стабільності.' },
    fr: { name: 'Taureau', dates: '20 avril – 20 mai', element: 'Terre', planet: 'Vénus', desc: 'Le Taureau est le signe de la fiabilité inébranlable, du plaisir sensuel et de la détermination patiente. Ceux nés sous ce signe sont profondément loyaux, aiment la beauté et le confort, et construisent leur vie sur une base de stabilité pratique.' },
    lt: { name: 'Jautis', dates: 'balandžio 20 – gegužės 20', element: 'Žemė', planet: 'Venera', desc: 'Jautis yra tvirto patikimumo, jautimo malonumo ir kantraus ryžto ženklas. Gimę po Jauciu yra giliai ištikimi, myli grožį ir komfortą, ir stato savo gyvenimą ant praktinio stabilumo pagrindo.' },
  },
  {
    symbol: '♊', element: 'air',
    en: { name: 'Gemini', dates: 'May 21 – June 20', element: 'Air', planet: 'Mercury', desc: 'Gemini is the sign of duality, communication and curiosity. Those born under Gemini are quick-witted, adaptable and endlessly curious — always seeking new information and connections. They are natural communicators with a gift for seeing multiple sides of any situation.' },
    ru: { name: 'Близнецы', dates: '21 мая – 20 июня', element: 'Воздух', planet: 'Меркурий', desc: 'Близнецы — знак двойственности, коммуникации и любопытства. Рождённые под знаком Близнецов остроумны, адаптивны и бесконечно любопытны — всегда ищут новую информацию и связи. Прирождённые коммуникаторы с даром видеть несколько сторон любой ситуации.' },
    uk: { name: 'Близнюки', dates: '21 травня – 20 червня', element: 'Повітря', planet: 'Меркурій', desc: 'Близнюки — знак двоїстості, комунікації та допитливості. Народжені під знаком Близнюків кмітливі, адаптивні та безкінечно допитливі. Прирождені комунікатори з даром бачити кілька сторін будь-якої ситуації.' },
    fr: { name: 'Gémeaux', dates: '21 mai – 20 juin', element: 'Air', planet: 'Mercure', desc: 'Les Gémeaux sont le signe de la dualité, de la communication et de la curiosité. Vifs d\'esprit, adaptables et infiniment curieux, ils cherchent toujours de nouvelles informations et connexions. Ce sont des communicateurs naturels doués pour voir plusieurs côtés d\'une situation.' },
    lt: { name: 'Dvyniai', dates: 'gegužės 21 – birželio 20', element: 'Oras', planet: 'Merkurijus', desc: 'Dvyniai yra dualumo, bendravimo ir smalsumo ženklas. Gimę po Dvyniais yra smalsūs, prisitaikantys ir begaliniai smalsūs — visada ieško naujos informacijos ir ryšių. Natūralūs komunikatoriai, turintys dovaną matyti kelias bet kurios situacijos puses.' },
  },
  {
    symbol: '♋', element: 'water',
    en: { name: 'Cancer', dates: 'June 21 – July 22', element: 'Water', planet: 'Moon', desc: 'Cancer is the sign of deep emotional sensitivity, nurturing and home. Those born under Cancer are profoundly intuitive, caring and protective of those they love. Guided by the Moon, they are deeply connected to feelings, family and the sanctuary of their home.' },
    ru: { name: 'Рак', dates: '21 июня – 22 июля', element: 'Вода', planet: 'Луна', desc: 'Рак — знак глубокой эмоциональной чувствительности, заботы и дома. Рождённые под знаком Рака глубоко интуитивны, заботливы и защищают тех, кого любят. Ведомые Луной, они глубоко связаны с чувствами, семьёй и уютом дома.' },
    uk: { name: 'Рак', dates: '21 червня – 22 липня', element: 'Вода', planet: 'Місяць', desc: 'Рак — знак глибокої емоційної чутливості, турботи та дому. Народжені під знаком Рака глибоко інтуїтивні, дбайливі та захищають тих, кого люблять. Ведені Місяцем, вони глибоко пов\'язані з почуттями та сімейним теплом.' },
    fr: { name: 'Cancer', dates: '21 juin – 22 juillet', element: 'Eau', planet: 'Lune', desc: 'Le Cancer est le signe de la sensibilité émotionnelle profonde, du soin et du foyer. Guidés par la Lune, ceux nés sous le Cancer sont profondément intuitifs, attentionnés et protecteurs envers ceux qu\'ils aiment.' },
    lt: { name: 'Vėžys', dates: 'birželio 21 – liepos 22', element: 'Vanduo', planet: 'Mėnulis', desc: 'Vėžys yra gilaus emocinio jautrumo, rūpinimosi ir namų ženklas. Gimę po Vėžiu yra giliai intuityvūs, rūpestingi ir saugantys tuos, kuriuos myli. Mėnulio vedami, jie yra giliai susiję su jausmais, šeima ir namų šiluma.' },
  },
  {
    symbol: '♌', element: 'fire',
    en: { name: 'Leo', dates: 'July 23 – August 22', element: 'Fire', planet: 'Sun', desc: 'Leo is the sign of radiant self-expression, creativity and generosity. Born under the Sun, Leos possess a natural magnetism and warmth that draws others in. They are passionate, loyal and driven by a deep need to love and be loved in return.' },
    ru: { name: 'Лев', dates: '23 июля – 22 августа', element: 'Огонь', planet: 'Солнце', desc: 'Лев — знак лучистого самовыражения, творчества и щедрости. Рождённые под Солнцем, Львы обладают природным магнетизмом и теплотой, притягивающей других. Они страстны, преданны и движимы глубокой потребностью любить и быть любимыми.' },
    uk: { name: 'Лев', dates: '23 липня – 22 серпня', element: 'Вогонь', planet: 'Сонце', desc: 'Лев — знак яскравого самовираження, творчості та щедрості. Народжені під Сонцем, Леви мають природний магнетизм і теплоту, що притягує інших. Вони пристрасні, віддані та рухані глибокою потребою любити і бути коханими.' },
    fr: { name: 'Lion', dates: '23 juillet – 22 août', element: 'Feu', planet: 'Soleil', desc: 'Le Lion est le signe de l\'expression personnelle rayonnante, de la créativité et de la générosité. Nés sous le Soleil, les Lions ont un magnétisme naturel et une chaleur qui attire les autres. Ils sont passionnés, loyaux et animés par un profond besoin d\'aimer et d\'être aimés.' },
    lt: { name: 'Liūtas', dates: 'liepos 23 – rugpjūčio 22', element: 'Ugnis', planet: 'Saulė', desc: 'Liūtas yra spindinčios savirairos, kūrybiškumo ir dosnumo ženklas. Gimę po Saule, Liūtai turi natūralų magnetizmą ir šilumą, traukiančią kitus. Jie aistringi, ištikimi ir skatinami gilaus poreikio mylėti ir būti mylimiems.' },
  },
  {
    symbol: '♍', element: 'earth',
    en: { name: 'Virgo', dates: 'August 23 – September 22', element: 'Earth', planet: 'Mercury', desc: 'Virgo is the sign of precision, service and analytical intelligence. Those born under Virgo are meticulous, practical and driven by a sincere desire to be useful. They notice what others miss and apply their sharp minds to perfecting everything they care about.' },
    ru: { name: 'Дева', dates: '23 августа – 22 сентября', element: 'Земля', planet: 'Меркурий', desc: 'Дева — знак точности, служения и аналитического ума. Рождённые под знаком Девы педантичны, практичны и движимы искренним желанием быть полезными. Они замечают то, что другие упускают, и применяют острый ум к совершенствованию всего, о чём заботятся.' },
    uk: { name: 'Діва', dates: '23 серпня – 22 вересня', element: 'Земля', planet: 'Меркурій', desc: 'Діва — знак точності, служіння та аналітичного розуму. Народжені під знаком Діви педантичні, практичні та рухані щирим бажанням бути корисними. Вони помічають те, що інші пропускають.' },
    fr: { name: 'Vierge', dates: '23 août – 22 septembre', element: 'Terre', planet: 'Mercure', desc: 'La Vierge est le signe de la précision, du service et de l\'intelligence analytique. Ceux nés sous la Vierge sont méticuleux, pratiques et animés par un sincère désir d\'être utiles. Ils remarquent ce que les autres manquent.' },
    lt: { name: 'Mergelė', dates: 'rugpjūčio 23 – rugsėjo 22', element: 'Žemė', planet: 'Merkurijus', desc: 'Mergelė yra tikslumo, tarnystės ir analitinio intelekto ženklas. Gimę po Mergele yra kruopštūs, praktiški ir skatinami nuoširdaus noro būti naudingais. Jie pastebi tai, ko kiti nepamato.' },
  },
  {
    symbol: '♎', element: 'air',
    en: { name: 'Libra', dates: 'September 23 – October 22', element: 'Air', planet: 'Venus', desc: 'Libra is the sign of balance, beauty and partnership. Those born under Libra are gifted diplomats who seek fairness, harmony and connection. They are charming, socially adept and driven by a deep need for justice and aesthetic beauty in all areas of life.' },
    ru: { name: 'Весы', dates: '23 сентября – 22 октября', element: 'Воздух', planet: 'Венера', desc: 'Весы — знак равновесия, красоты и партнёрства. Рождённые под знаком Весов — одарённые дипломаты, стремящиеся к справедливости, гармонии и связям. Они обаятельны, социально искусны и движимы глубокой потребностью в справедливости и красоте.' },
    uk: { name: 'Терези', dates: '23 вересня – 22 жовтня', element: 'Повітря', planet: 'Венера', desc: 'Терези — знак рівноваги, краси та партнерства. Народжені під знаком Терезів — обдаровані дипломати, що прагнуть справедливості, гармонії та зв\'язків. Вони чарівні та рухані глибокою потребою у справедливості та красі.' },
    fr: { name: 'Balance', dates: '23 septembre – 22 octobre', element: 'Air', planet: 'Vénus', desc: 'La Balance est le signe de l\'équilibre, de la beauté et du partenariat. Diplomates doués, ceux nés sous la Balance recherchent l\'équité, l\'harmonie et les connexions. Ils sont charmants, socialement habiles et animés par un profond besoin de justice et de beauté esthétique.' },
    lt: { name: 'Svarstyklės', dates: 'rugsėjo 23 – spalio 22', element: 'Oras', planet: 'Venera', desc: 'Svarstyklės yra pusiausvyros, grožio ir partnerystės ženklas. Gimę po Svarstyklėmis yra gabūs diplomatai, ieškantys teisingumo, harmonijos ir ryšių. Jie žavūs, socialiai sumanūs ir skatinami gilaus poreikio teisingumo ir grožio.' },
  },
  {
    symbol: '♏', element: 'water',
    en: { name: 'Scorpio', dates: 'October 23 – November 21', element: 'Water', planet: 'Pluto', desc: 'Scorpio is the sign of intensity, depth and transformation. Those born under Scorpio are driven, perceptive and fiercely private. They experience life at its most profound levels — capable of extraordinary resilience, loyalty and the power to reinvent themselves completely.' },
    ru: { name: 'Скорпион', dates: '23 октября – 21 ноября', element: 'Вода', planet: 'Плутон', desc: 'Скорпион — знак интенсивности, глубины и трансформации. Рождённые под знаком Скорпиона целеустремлённы, проницательны и ревностно хранят личное. Они переживают жизнь на самых глубоких уровнях и способны на исключительную стойкость и полное перерождение.' },
    uk: { name: 'Скорпіон', dates: '23 жовтня – 21 листопада', element: 'Вода', planet: 'Плутон', desc: 'Скорпіон — знак інтенсивності, глибини та трансформації. Народжені під знаком Скорпіона цілеспрямовані, проникливі та ревно зберігають особисте. Вони здатні на виняткову стійкість і повне переродження.' },
    fr: { name: 'Scorpion', dates: '23 octobre – 21 novembre', element: 'Eau', planet: 'Pluton', desc: 'Le Scorpion est le signe de l\'intensité, de la profondeur et de la transformation. Déterminés, perspicaces et farouchement privés, ceux nés sous le Scorpion vivent à des niveaux profonds et sont capables d\'une résilience et d\'une transformation extraordinaires.' },
    lt: { name: 'Skorpionas', dates: 'spalio 23 – lapkričio 21', element: 'Vanduo', planet: 'Plutonas', desc: 'Skorpionas yra intensyvumo, gilumo ir transformacijos ženklas. Gimę po Skorpionu yra ryžtingi, įžvalgūs ir griežtai privatūs. Jie gyvena giliausiais lygiais ir geba nepaprastai atsitiesti ir visiškai persimainyti.' },
  },
  {
    symbol: '♐', element: 'fire',
    en: { name: 'Sagittarius', dates: 'November 22 – December 21', element: 'Fire', planet: 'Jupiter', desc: 'Sagittarius is the sign of adventure, philosophy and boundless optimism. Those born under Sagittarius are free spirits who live for exploration — of the world, of ideas and of meaning itself. Generous, enthusiastic and honest to a fault, they inspire those around them with their infectious love of life.' },
    ru: { name: 'Стрелец', dates: '22 ноября – 21 декабря', element: 'Огонь', planet: 'Юпитер', desc: 'Стрелец — знак приключений, философии и безграничного оптимизма. Рождённые под знаком Стрельца — свободные духом люди, живущие для исследования — мира, идей и самого смысла. Щедрые, энергичные и честные, они вдохновляют окружающих своей заразительной любовью к жизни.' },
    uk: { name: 'Стрілець', dates: '22 листопада – 21 грудня', element: 'Вогонь', planet: 'Юпітер', desc: 'Стрілець — знак пригод, філософії та безмежного оптимізму. Народжені під знаком Стрільця — вільні духом люди, що живуть для дослідження світу та ідей. Щедрі, енергійні та чесні, вони надихають оточуючих своєю заразливою любов\'ю до життя.' },
    fr: { name: 'Sagittaire', dates: '22 novembre – 21 décembre', element: 'Feu', planet: 'Jupiter', desc: 'Le Sagittaire est le signe de l\'aventure, de la philosophie et d\'un optimisme sans bornes. Esprits libres vivant pour l\'exploration du monde et des idées, ils sont généreux, enthousiastes et honnêtes — inspirant ceux qui les entourent avec leur amour contagieux de la vie.' },
    lt: { name: 'Šaulys', dates: 'lapkričio 22 – gruodžio 21', element: 'Ugnis', planet: 'Jupiteris', desc: 'Šaulys yra nuotykių, filosofijos ir beribio optimizmo ženklas. Gimę po Šauliu yra laisvos dvasios žmonės, gyvenantys tyrinėjimui — pasaulio, idėjų ir pačios prasmės. Dosnūs, entuziastingi ir sąžiningi, jie įkvepia aplinkinius savo užkrečiama meile gyvenimui.' },
  },
  {
    symbol: '♑', element: 'earth',
    en: { name: 'Capricorn', dates: 'December 22 – January 19', element: 'Earth', planet: 'Saturn', desc: 'Capricorn is the sign of ambition, discipline and enduring achievement. Those born under Capricorn are patient, strategic and quietly determined to reach the heights they have set for themselves. Guided by Saturn, they understand that meaningful success is built slowly, through consistent effort and integrity.' },
    ru: { name: 'Козерог', dates: '22 декабря – 19 января', element: 'Земля', planet: 'Сатурн', desc: 'Козерог — знак амбиций, дисциплины и долговременных достижений. Рождённые под знаком Козерога терпеливы, стратегичны и тихо непреклонны в достижении поставленных высот. Ведомые Сатурном, они понимают, что значимый успех строится медленно, через последовательные усилия и честность.' },
    uk: { name: 'Козеріг', dates: '22 грудня – 19 січня', element: 'Земля', planet: 'Сатурн', desc: 'Козеріг — знак амбіцій, дисципліни та тривалих досягнень. Народжені під знаком Козерога терплячі, стратегічні та тихо непохитні у досягненні поставлених висот. Ведені Сатурном, вони розуміють, що значущий успіх будується повільно через послідовні зусилля.' },
    fr: { name: 'Capricorne', dates: '22 décembre – 19 janvier', element: 'Terre', planet: 'Saturne', desc: 'Le Capricorne est le signe de l\'ambition, de la discipline et de la réussite durable. Patients, stratégiques et discrètement déterminés, ceux nés sous le Capricorne comprennent que le succès significatif se construit lentement, à travers des efforts constants et l\'intégrité.' },
    lt: { name: 'Ožiaragis', dates: 'gruodžio 22 – sausio 19', element: 'Žemė', planet: 'Saturnas', desc: 'Ožiaragis yra ambicijų, disciplinos ir ilgalaikių pasiekimų ženklas. Gimę po Ožiaragiu yra kantrūs, strategiški ir tyliai ryžtingi pasiekti save nustatytus aukštumus. Saturno vedami, jie supranta, kad reikšminga sėkmė kuriama lėtai, per nuoseklius pastangas.' },
  },
  {
    symbol: '♒', element: 'air',
    en: { name: 'Aquarius', dates: 'January 20 – February 18', element: 'Air', planet: 'Uranus', desc: 'Aquarius is the sign of innovation, humanitarianism and visionary thinking. Those born under Aquarius are independent thinkers who see the world through a unique lens, driven by a deep care for humanity and a passion for ideas that challenge convention and expand what is possible.' },
    ru: { name: 'Водолей', dates: '20 января – 18 февраля', element: 'Воздух', planet: 'Уран', desc: 'Водолей — знак инноваций, гуманизма и провидческого мышления. Рождённые под знаком Водолея — независимые мыслители, видящие мир через уникальную призму, движимые глубокой заботой о человечестве и страстью к идеям, бросающим вызов условностям.' },
    uk: { name: 'Водолій', dates: '20 січня – 18 лютого', element: 'Повітря', planet: 'Уран', desc: 'Водолій — знак інновацій, гуманізму та провидницького мислення. Народжені під знаком Водолія — незалежні мислителі, що бачать світ через унікальну призму, рухані глибокою турботою про людство та пристрастю до ідей, що кидають виклик умовностям.' },
    fr: { name: 'Verseau', dates: '20 janvier – 18 février', element: 'Air', planet: 'Uranus', desc: 'Le Verseau est le signe de l\'innovation, de l\'humanitarisme et de la pensée visionnaire. Penseurs indépendants voyant le monde à travers un prisme unique, ils sont animés par un profond souci de l\'humanité et une passion pour les idées qui défient les conventions.' },
    lt: { name: 'Vandenis', dates: 'sausio 20 – vasario 18', element: 'Oras', planet: 'Uranas', desc: 'Vandenis yra inovacijų, humanizmo ir visionierinės minties ženklas. Gimę po Vandeniu yra nepriklausomi mąstytojai, matantys pasaulį per unikalų objektyvą, skatinami gilios rūpybos žmonija ir aistros idėjoms, metančioms iššūkį konvencijoms.' },
  },
  {
    symbol: '♓', element: 'water',
    en: { name: 'Pisces', dates: 'February 19 – March 20', element: 'Water', planet: 'Neptune', desc: 'Pisces is the sign of empathy, imagination and spiritual depth. The last sign of the zodiac, Pisces carries the wisdom of all signs before it. Those born under this sign are deeply sensitive, creative and compassionate — natural healers and dreamers who bridge the worlds of the everyday and the divine.' },
    ru: { name: 'Рыбы', dates: '19 февраля – 20 марта', element: 'Вода', planet: 'Нептун', desc: 'Рыбы — знак эмпатии, воображения и духовной глубины. Последний знак зодиака несёт мудрость всех предшествующих. Рождённые под знаком Рыб глубоко чувствительны, творчески и сострадательны — прирождённые целители и мечтатели, соединяющие повседневное и божественное.' },
    uk: { name: 'Риби', dates: '19 лютого – 20 березня', element: 'Вода', planet: 'Нептун', desc: 'Риби — знак емпатії, уяви та духовної глибини. Останній знак зодіаку несе мудрість усіх попередніх. Народжені під знаком Риб глибоко чутливі, творчі та співчутливі — природжені цілителі та мрійники.' },
    fr: { name: 'Poissons', dates: '19 février – 20 mars', element: 'Eau', planet: 'Neptune', desc: 'Les Poissons sont le signe de l\'empathie, de l\'imagination et de la profondeur spirituelle. Dernier signe du zodiaque, les Poissons portent la sagesse de tous les signes. Profondément sensibles, créatifs et compatissants, ce sont des guérisseurs naturels et des rêveurs.' },
    lt: { name: 'Žuvys', dates: 'vasario 19 – kovo 20', element: 'Vanduo', planet: 'Neptūnas', desc: 'Žuvys yra empatijos, vaizduotės ir dvasinės gilumos ženklas. Paskutinis zodiako ženklas, Žuvys nešioja visų ženklų išmintį. Gimę po Žuvimis yra giliai jautrūs, kūrybingi ir užjaučiantys — natūralūs gydytojai ir svajotojai.' },
  },
];

function getZodiacIndex(month: number, day: number): number {
  const mmdd = month * 100 + day;
  if (mmdd >= 321 && mmdd <= 419) return 0;
  if (mmdd >= 420 && mmdd <= 520) return 1;
  if (mmdd >= 521 && mmdd <= 620) return 2;
  if (mmdd >= 621 && mmdd <= 722) return 3;
  if (mmdd >= 723 && mmdd <= 822) return 4;
  if (mmdd >= 823 && mmdd <= 922) return 5;
  if (mmdd >= 923 && mmdd <= 1022) return 6;
  if (mmdd >= 1023 && mmdd <= 1121) return 7;
  if (mmdd >= 1122 && mmdd <= 1221) return 8;
  if (mmdd >= 1222 || mmdd <= 119) return 9;
  if (mmdd >= 120 && mmdd <= 218) return 10;
  return 11;
}

export default function ZodiacSignCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setResult(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError(t.errInvalid); setResult(null); return; }
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    setError('');
    setResult(getZodiacIndex(month, day));
  };

  const sign = result !== null ? SIGNS[result] : null;
  const info = sign ? (sign[locale as keyof typeof sign] as SignLocale | undefined ?? sign.en) : null;

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          onChange={(e) => { setDate(e.target.value); setError(''); setResult(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {sign && info && (
        <div className={styles.calc__sign}>
          <div className={styles.calc__symbol}>{sign.symbol}</div>
          <div className={styles.calc__sign_name}>{info.name}</div>
          <div className={styles.calc__dates}>{info.dates}</div>
          <div className={styles.calc__tags}>
            <span className={`${styles.calc__tag} ${styles[`calc__tag--${sign.element}`]}`}>{info.element}</span>
            <span className={`${styles.calc__tag} ${styles['calc__tag--planet']}`}>{info.planet}</span>
          </div>
          <p className={styles.calc__desc}>{info.desc}</p>
        </div>
      )}
    </div>
  );
}
