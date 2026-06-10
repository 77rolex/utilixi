'use client';

import { useState } from 'react';
import styles from './ZodiacCompatibilityCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label1: string; label2: string; btn: string; errEmpty: string;
  scoreLabel: string; levelLabel: string; descLabel: string;
  levels: [string, string, string, string];
}> = {
  en: {
    label1: 'Your zodiac sign', label2: 'Partner\'s zodiac sign', btn: 'Check Compatibility',
    errEmpty: 'Please select the partner\'s zodiac sign.',
    scoreLabel: 'Compatibility', levelLabel: 'Level', descLabel: 'What this means',
    levels: ['Excellent', 'Good', 'Moderate', 'Challenging'],
  },
  ru: {
    label1: 'Ваш знак зодиака', label2: 'Знак партнёра', btn: 'Проверить совместимость',
    errEmpty: 'Пожалуйста, выберите знак партнёра.',
    scoreLabel: 'Совместимость', levelLabel: 'Уровень', descLabel: 'Что это означает',
    levels: ['Отлично', 'Хорошо', 'Умеренно', 'Сложно'],
  },
  uk: {
    label1: 'Ваш знак зодіаку', label2: 'Знак партнера', btn: 'Перевірити сумісність',
    errEmpty: 'Будь ласка, виберіть знак партнера.',
    scoreLabel: 'Сумісність', levelLabel: 'Рівень', descLabel: 'Що це означає',
    levels: ['Відмінно', 'Добре', 'Помірно', 'Складно'],
  },
  fr: {
    label1: 'Votre signe du zodiaque', label2: 'Signe du partenaire', btn: 'Vérifier la compatibilité',
    errEmpty: 'Veuillez sélectionner le signe du partenaire.',
    scoreLabel: 'Compatibilité', levelLabel: 'Niveau', descLabel: 'Ce que cela signifie',
    levels: ['Excellent', 'Bien', 'Modéré', 'Difficile'],
  },
  lt: {
    label1: 'Jūsų zodiako ženklas', label2: 'Partnerio zodiako ženklas', btn: 'Tikrinti suderinamumą',
    errEmpty: 'Pasirinkite partnerio zodiako ženklą.',
    scoreLabel: 'Suderinamumas', levelLabel: 'Lygis', descLabel: 'Ką tai reiškia',
    levels: ['Puikus', 'Geras', 'Vidutinis', 'Sudėtingas'],
  },
};

type SignMeta = { name: string; symbol: string; element: 'fire' | 'earth' | 'air' | 'water'; modality: 'cardinal' | 'fixed' | 'mutable' };

const SIGNS: Record<string, SignMeta[]> = {
  en: [
    { name: 'Aries ♈', symbol: '♈', element: 'fire', modality: 'cardinal' },
    { name: 'Taurus ♉', symbol: '♉', element: 'earth', modality: 'fixed' },
    { name: 'Gemini ♊', symbol: '♊', element: 'air', modality: 'mutable' },
    { name: 'Cancer ♋', symbol: '♋', element: 'water', modality: 'cardinal' },
    { name: 'Leo ♌', symbol: '♌', element: 'fire', modality: 'fixed' },
    { name: 'Virgo ♍', symbol: '♍', element: 'earth', modality: 'mutable' },
    { name: 'Libra ♎', symbol: '♎', element: 'air', modality: 'cardinal' },
    { name: 'Scorpio ♏', symbol: '♏', element: 'water', modality: 'fixed' },
    { name: 'Sagittarius ♐', symbol: '♐', element: 'fire', modality: 'mutable' },
    { name: 'Capricorn ♑', symbol: '♑', element: 'earth', modality: 'cardinal' },
    { name: 'Aquarius ♒', symbol: '♒', element: 'air', modality: 'fixed' },
    { name: 'Pisces ♓', symbol: '♓', element: 'water', modality: 'mutable' },
  ],
  ru: [
    { name: 'Овен ♈', symbol: '♈', element: 'fire', modality: 'cardinal' },
    { name: 'Телец ♉', symbol: '♉', element: 'earth', modality: 'fixed' },
    { name: 'Близнецы ♊', symbol: '♊', element: 'air', modality: 'mutable' },
    { name: 'Рак ♋', symbol: '♋', element: 'water', modality: 'cardinal' },
    { name: 'Лев ♌', symbol: '♌', element: 'fire', modality: 'fixed' },
    { name: 'Дева ♍', symbol: '♍', element: 'earth', modality: 'mutable' },
    { name: 'Весы ♎', symbol: '♎', element: 'air', modality: 'cardinal' },
    { name: 'Скорпион ♏', symbol: '♏', element: 'water', modality: 'fixed' },
    { name: 'Стрелец ♐', symbol: '♐', element: 'fire', modality: 'mutable' },
    { name: 'Козерог ♑', symbol: '♑', element: 'earth', modality: 'cardinal' },
    { name: 'Водолей ♒', symbol: '♒', element: 'air', modality: 'fixed' },
    { name: 'Рыбы ♓', symbol: '♓', element: 'water', modality: 'mutable' },
  ],
  uk: [
    { name: 'Овен ♈', symbol: '♈', element: 'fire', modality: 'cardinal' },
    { name: 'Телець ♉', symbol: '♉', element: 'earth', modality: 'fixed' },
    { name: 'Близнюки ♊', symbol: '♊', element: 'air', modality: 'mutable' },
    { name: 'Рак ♋', symbol: '♋', element: 'water', modality: 'cardinal' },
    { name: 'Лев ♌', symbol: '♌', element: 'fire', modality: 'fixed' },
    { name: 'Діва ♍', symbol: '♍', element: 'earth', modality: 'mutable' },
    { name: 'Терези ♎', symbol: '♎', element: 'air', modality: 'cardinal' },
    { name: 'Скорпіон ♏', symbol: '♏', element: 'water', modality: 'fixed' },
    { name: 'Стрілець ♐', symbol: '♐', element: 'fire', modality: 'mutable' },
    { name: 'Козеріг ♑', symbol: '♑', element: 'earth', modality: 'cardinal' },
    { name: 'Водолій ♒', symbol: '♒', element: 'air', modality: 'fixed' },
    { name: 'Риби ♓', symbol: '♓', element: 'water', modality: 'mutable' },
  ],
  fr: [
    { name: 'Bélier ♈', symbol: '♈', element: 'fire', modality: 'cardinal' },
    { name: 'Taureau ♉', symbol: '♉', element: 'earth', modality: 'fixed' },
    { name: 'Gémeaux ♊', symbol: '♊', element: 'air', modality: 'mutable' },
    { name: 'Cancer ♋', symbol: '♋', element: 'water', modality: 'cardinal' },
    { name: 'Lion ♌', symbol: '♌', element: 'fire', modality: 'fixed' },
    { name: 'Vierge ♍', symbol: '♍', element: 'earth', modality: 'mutable' },
    { name: 'Balance ♎', symbol: '♎', element: 'air', modality: 'cardinal' },
    { name: 'Scorpion ♏', symbol: '♏', element: 'water', modality: 'fixed' },
    { name: 'Sagittaire ♐', symbol: '♐', element: 'fire', modality: 'mutable' },
    { name: 'Capricorne ♑', symbol: '♑', element: 'earth', modality: 'cardinal' },
    { name: 'Verseau ♒', symbol: '♒', element: 'air', modality: 'fixed' },
    { name: 'Poissons ♓', symbol: '♓', element: 'water', modality: 'mutable' },
  ],
  lt: [
    { name: 'Avinas ♈', symbol: '♈', element: 'fire', modality: 'cardinal' },
    { name: 'Jautis ♉', symbol: '♉', element: 'earth', modality: 'fixed' },
    { name: 'Dvyniai ♊', symbol: '♊', element: 'air', modality: 'mutable' },
    { name: 'Vėžys ♋', symbol: '♋', element: 'water', modality: 'cardinal' },
    { name: 'Liūtas ♌', symbol: '♌', element: 'fire', modality: 'fixed' },
    { name: 'Mergelė ♍', symbol: '♍', element: 'earth', modality: 'mutable' },
    { name: 'Svarstyklės ♎', symbol: '♎', element: 'air', modality: 'cardinal' },
    { name: 'Skorpionas ♏', symbol: '♏', element: 'water', modality: 'fixed' },
    { name: 'Šaulys ♐', symbol: '♐', element: 'fire', modality: 'mutable' },
    { name: 'Ožiaragis ♑', symbol: '♑', element: 'earth', modality: 'cardinal' },
    { name: 'Vandenis ♒', symbol: '♒', element: 'air', modality: 'fixed' },
    { name: 'Žuvys ♓', symbol: '♓', element: 'water', modality: 'mutable' },
  ],
};

type ElemPair = string;
const BASE_SCORES: Record<ElemPair, number> = {
  'fire-fire': 80, 'fire-earth': 50, 'fire-air': 88, 'fire-water': 42,
  'earth-earth': 82, 'earth-air': 48, 'earth-water': 87,
  'air-air': 80, 'air-water': 52, 'water-water': 85,
};

const COMPAT_DESC: Record<string, Record<string, string>> = {
  en: {
    'same': 'Two of the same sign share an immediate, instinctive understanding — you know each other\'s drives, fears and desires without explanation. The connection feels effortless at first, but the real challenge lies in growth: without contrast, you risk amplifying each other\'s weaknesses rather than balancing them. The key to making this work is preserving individual paths within the relationship, so each person continues to evolve independently rather than becoming a mirror of the other.',
    'fire-fire': 'Two fire signs burn bright together — passionate, competitive and never boring. You share a love of adventure, excitement and bold action. The key challenge is avoiding ego clashes; when you channel that fire in the same direction, you become an unstoppable team.',
    'fire-earth': 'Fire and Earth create friction — Fire wants spontaneity while Earth needs security and routine. This pairing requires patience and mutual respect. Earth can ground Fire\'s impulsive energy, while Fire can inspire Earth to take bold leaps.',
    'fire-air': 'Fire and Air are a natural pairing — Air feeds Fire and keeps it alive. You connect through ideas, conversation and a shared love of freedom. This is often an exciting, intellectually stimulating combination with strong romantic spark.',
    'fire-water': 'Fire and Water are fundamentally different — one seeks action, the other depth. This pairing creates emotional intensity but also significant tension. With awareness, Fire can warm Water\'s depths while Water can temper Fire\'s excess.',
    'earth-earth': 'Two Earth signs build something lasting together. You share values of stability, loyalty and practical achievement. The relationship may not be flashy, but it is deeply reliable and capable of great long-term success.',
    'earth-air': 'Earth and Air often speak different languages — Earth is practical and grounded, Air is abstract and idea-driven. This pairing stimulates growth but requires consistent effort to bridge different worldviews and communication styles.',
    'earth-water': 'Earth and Water are among the most compatible combinations. Earth provides the stable ground Water needs, while Water nourishes Earth\'s growth. This pairing tends to be deeply supportive, nurturing and emotionally satisfying.',
    'air-air': 'Two Air signs keep each other mentally stimulated and endlessly engaged. You connect through conversation, ideas and social life. The challenge is grounding the relationship in emotional depth — you may need to cultivate vulnerability deliberately.',
    'air-water': 'Air and Water struggle to understand each other — Air operates from logic while Water moves through emotion. This combination can be rich and complementary, but requires genuine effort to bridge the gap between the head and the heart.',
    'water-water': 'Two Water signs share extraordinary emotional depth, empathy and intuitive understanding. You feel profoundly seen and understood by each other. The risk is getting lost in emotions together; regular grounding in the practical world helps.',
  },
  ru: {
    'same': 'Два одинаковых знака создают мгновенную, инстинктивную связь — вы понимаете мотивы, страхи и желания друг друга без лишних слов. Поначалу это ощущается как магия, но главный вызов — в росте: без контраста вы рискуете усиливать слабости друг друга, а не уравновешивать их. Ключ к успеху — сохранять индивидуальные пути внутри союза, чтобы каждый продолжал развиваться самостоятельно, не превращаясь в зеркало партнёра.',
    'fire-fire': 'Два знака Огня горят ярко вместе — страстные, соревновательные и никогда не скучные. Вы разделяете любовь к приключениям и смелым поступкам. Ключевой вызов — избегать столкновений эго; когда вы направляете этот огонь в одном направлении, вы становитесь непобедимой командой.',
    'fire-earth': 'Огонь и Земля создают трения — Огонь хочет спонтанности, Земля нуждается в безопасности и рутине. Эта пара требует терпения и взаимного уважения. Земля может заземлить импульсивную энергию Огня, а Огонь может вдохновить Землю на смелые шаги.',
    'fire-air': 'Огонь и Воздух — естественная пара: Воздух питает Огонь и поддерживает его горение. Вы связаны через идеи, разговоры и общую любовь к свободе. Это часто захватывающее, интеллектуально стимулирующее сочетание с сильной искрой.',
    'fire-water': 'Огонь и Вода принципиально разные — один ищет действия, другой глубины. Эта пара создаёт эмоциональную интенсивность, но и значительное напряжение. С осознанностью Огонь может согреть глубины Воды, а Вода — умерить избыток Огня.',
    'earth-earth': 'Два знака Земли создают что-то прочное вместе. Вы разделяете ценности стабильности, лояльности и практических достижений. Отношения могут быть не броскими, но глубоко надёжными и способными на большой долгосрочный успех.',
    'earth-air': 'Земля и Воздух часто говорят на разных языках — Земля практична и приземлена, Воздух абстрактен и ориентирован на идеи. Эта пара стимулирует рост, но требует постоянных усилий для преодоления разных мировоззрений.',
    'earth-water': 'Земля и Вода — одна из наиболее совместимых комбинаций. Земля обеспечивает стабильную почву, которая нужна Воде, а Вода питает рост Земли. Эта пара, как правило, глубоко поддерживающая и эмоционально удовлетворяющая.',
    'air-air': 'Два знака Воздуха поддерживают умственную стимуляцию и бесконечную вовлечённость. Вы связаны через разговоры, идеи и общественную жизнь. Вызов — заземлить отношения в эмоциональной глубине.',
    'air-water': 'Воздух и Вода с трудом понимают друг друга — Воздух работает из логики, а Вода движется через эмоции. Это сочетание может быть богатым, но требует искренних усилий для преодоления разрыва между разумом и сердцем.',
    'water-water': 'Два знака Воды разделяют необыкновенную эмоциональную глубину, эмпатию и интуитивное понимание. Вы глубоко видите и понимаете друг друга. Риск — потеряться в эмоциях вместе.',
  },
  uk: {
    'same': 'Два однакових знаки створюють миттєвий, інстинктивний зв\'язок — ви розумієте мотиви, страхи та бажання одне одного без зайвих слів. Спочатку це відчувається як магія, але головний виклик — у зростанні: без контрасту ви ризикуєте посилювати слабкості одне одного, а не врівноважувати їх. Ключ до успіху — зберігати індивідуальні шляхи всередині союзу, щоб кожен продовжував розвиватися самостійно.',
    'fire-fire': 'Два знаки Вогню горять яскраво разом — пристрасні, змагальні та ніколи нудні. Ви поділяєте любов до пригод та сміливих дій. Ключовий виклик — уникати зіткнень его; коли ви спрямовуєте цей вогонь в одному напрямку, ви стаєте непереможною командою.',
    'fire-earth': 'Вогонь та Земля створюють тертя — Вогонь хоче спонтанності, Земля потребує безпеки та рутини. Ця пара вимагає терпіння та взаємної поваги. Земля може заземлити імпульсивну енергію Вогню, а Вогонь може надихнути Землю на сміливі кроки.',
    'fire-air': 'Вогонь та Повітря — природна пара: Повітря живить Вогонь. Ви пов\'язані через ідеї, розмови та спільну любов до свободи. Це часто захоплюючи, інтелектуально стимулюючи поєднання з сильною іскрою.',
    'fire-water': 'Вогонь та Вода принципово різні — один шукає дій, інший глибини. Ця пара створює емоційну інтенсивність, але й значну напруженість. З усвідомленістю Вогонь може зігріти глибини Води, а Вода — вгамувати надлишок Вогню.',
    'earth-earth': 'Два знаки Землі разом будують щось тривале. Ви поділяєте цінності стабільності, лояльності та практичних досягнень. Стосунки можуть бути не яскравими, але глибоко надійними.',
    'earth-air': 'Земля та Повітря часто говорять різними мовами — Земля практична та приземлена, Повітря абстрактне та орієнтоване на ідеї. Ця пара стимулює зростання, але вимагає постійних зусиль.',
    'earth-water': 'Земля та Вода — одне з найсумісніших поєднань. Земля забезпечує стабільний ґрунт, який потрібен Воді, а Вода живить зростання Землі. Ця пара, як правило, глибоко підтримуюча та емоційно задовольняюча.',
    'air-air': 'Два знаки Повітря підтримують розумову стимуляцію. Ви пов\'язані через розмови, ідеї та суспільне життя. Виклик — заземлити стосунки в емоційній глибині.',
    'air-water': 'Повітря та Вода важко розуміють одне одного — Повітря працює з логіки, а Вода рухається через емоції. Це поєднання може бути багатим, але вимагає щирих зусиль.',
    'water-water': 'Два знаки Води поділяють надзвичайну емоційну глибину, емпатію та інтуїтивне розуміння. Ви глибоко бачите та розумієте одне одного. Ризик — разом загубитися в емоціях.',
  },
  fr: {
    'same': 'Deux signes identiques partagent une compréhension immédiate et instinctive — vous connaissez les motivations, les peurs et les désirs de l\'autre sans explication. La connexion semble magique au début, mais le vrai défi réside dans la croissance : sans contraste, vous risquez d\'amplifier mutuellement vos faiblesses plutôt que de les équilibrer. La clé est de préserver des chemins individuels au sein de la relation, pour que chacun continue d\'évoluer de façon indépendante.',
    'fire-fire': 'Deux signes de Feu brillent intensément ensemble — passionnés, compétitifs et jamais ennuyeux. Vous partagez l\'amour de l\'aventure et des actions audacieuses. Le principal défi est d\'éviter les conflits d\'ego.',
    'fire-earth': 'Le Feu et la Terre créent des frictions — le Feu veut la spontanéité tandis que la Terre a besoin de sécurité et de routine. Cette combinaison nécessite patience et respect mutuel.',
    'fire-air': 'Le Feu et l\'Air sont une paire naturelle — l\'Air nourrit le Feu et le maintient en vie. Vous vous connectez à travers les idées, la conversation et un amour partagé de la liberté.',
    'fire-water': 'Le Feu et l\'Eau sont fondamentalement différents — l\'un cherche l\'action, l\'autre la profondeur. Cette combinaison crée une intensité émotionnelle mais aussi des tensions significatives.',
    'earth-earth': 'Deux signes de Terre construisent quelque chose de durable ensemble. Vous partagez des valeurs de stabilité, loyauté et réalisation pratique. La relation est profondément fiable.',
    'earth-air': 'La Terre et l\'Air parlent souvent des langages différents. Cette combinaison stimule la croissance mais nécessite un effort constant pour combler les différences.',
    'earth-water': 'La Terre et l\'Eau sont parmi les combinaisons les plus compatibles. La Terre fournit le terrain stable dont l\'Eau a besoin, tandis que l\'Eau nourrit la croissance de la Terre.',
    'air-air': 'Deux signes d\'Air se maintiennent mutuellement stimulés. Vous vous connectez à travers la conversation et les idées. Le défi est d\'ancrer la relation dans la profondeur émotionnelle.',
    'air-water': 'L\'Air et l\'Eau ont du mal à se comprendre — l\'Air opère depuis la logique tandis que l\'Eau se meut à travers l\'émotion. Cette combinaison peut être riche mais nécessite des efforts.',
    'water-water': 'Deux signes d\'Eau partagent une profondeur émotionnelle extraordinaire et une compréhension intuitive. Vous vous sentez profondément vus et compris l\'un par l\'autre.',
  },
  lt: {
    'same': 'Du vienodi ženklai dalijasi momentišku, instinktyviu supratimu — jūs žinote vienas kito motyvus, baimes ir norus be paaiškinimų. Ryšys iš pradžių atrodo magiškas, tačiau tikrasis iššūkis yra augimas: be kontrasto rizikuojate stiprinti vienas kito silpnybes, o ne jas subalansuoti. Raktas — išlaikyti individualius kelius santykiuose, kad kiekvienas toliau augtų savarankiškai.',
    'fire-fire': 'Du Ugnies ženklai dega ryškiai kartu — aistringi, konkurencingi ir niekada nuobodūs. Jūs dalijatės meile nuotykiams ir drąsiems veiksmams. Pagrindinis iššūkis — vengti ego susidūrimų.',
    'fire-earth': 'Ugnis ir Žemė sukuria trintį — Ugnis nori spontaniškumo, o Žemė reikalauja saugumo ir rutinos. Šis derinys reikalauja kantrybės ir abipusės pagarbos.',
    'fire-air': 'Ugnis ir Oras yra natūrali pora — Oras maitina Ugnį ir palaiko ją gyva. Jūs susisiejate per idėjas, pokalbius ir bendrą laisvės meilę.',
    'fire-water': 'Ugnis ir Vanduo iš esmės skiriasi — vienas ieško veiksmų, kitas gilumos. Šis derinys sukuria emocinį intensyvumą, bet ir didelę įtampą.',
    'earth-earth': 'Du Žemės ženklai kartu stato kažką ilgalaikio. Jūs dalijatės stabilumo, lojalumo ir praktinių pasiekimų vertybėmis. Santykiai yra giliai patikimi.',
    'earth-air': 'Žemė ir Oras dažnai kalba skirtingomis kalbomis. Šis derinys skatina augimą, bet reikalauja nuolatinių pastangų.',
    'earth-water': 'Žemė ir Vanduo yra vienas iš suderinamiausių derinių. Žemė suteikia stabilų pagrindą, kurio reikia Vandeniui, o Vanduo maitina Žemės augimą.',
    'air-air': 'Du Oro ženklai palaiko vienas kitą intelektualiai stimuliuotą. Jūs susisiejate per pokalbius ir idėjas. Iššūkis — įžeminti santykius emocinėje gilumoje.',
    'air-water': 'Oras ir Vanduo sunkiai supranta vienas kitą. Šis derinys gali būti turtingas, bet reikalauja nuoširdžių pastangų.',
    'water-water': 'Du Vandens ženklai dalijasi nepaprastu emociniu gilumu ir intuityvu supratimu. Jūs giliai matote ir suprantate vienas kitą.',
  },
};

function getElementPairKey(e1: string, e2: string): ElemPair {
  const order = ['fire', 'earth', 'air', 'water'];
  const i1 = order.indexOf(e1);
  const i2 = order.indexOf(e2);
  if (i1 <= i2) return `${e1}-${e2}`;
  return `${e2}-${e1}`;
}

function calcScore(s1: SignMeta, s2: SignMeta): number {
  if (s1.element === s2.element && s1.modality === s2.modality) return 75;
  const key = getElementPairKey(s1.element, s2.element);
  let score = BASE_SCORES[key] ?? 60;
  if (s1.modality === s2.modality && s1.modality !== 'mutable') score -= 5;
  if (s1.modality === 'mutable' && s2.modality === 'mutable') score += 3;
  return Math.min(100, Math.max(0, score));
}

function getLevel(score: number, levels: [string, string, string, string]): string {
  if (score >= 80) return levels[0];
  if (score >= 65) return levels[1];
  if (score >= 50) return levels[2];
  return levels[3];
}

export default function ZodiacCompatibilityCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const signs = SIGNS[locale] ?? SIGNS.en;
  const descs = COMPAT_DESC[locale] ?? COMPAT_DESC.en;

  const [sign1, setSign1] = useState('0');
  const [sign2, setSign2] = useState('');
  const [result, setResult] = useState<null | { score: number; desc: string; level: string; name1: string; name2: string }>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!sign2) { setError(t.errEmpty); setResult(null); return; }
    setError('');
    const i1 = parseInt(sign1, 10);
    const i2 = parseInt(sign2, 10);
    const s1 = signs[i1];
    const s2 = signs[i2];
    const isSame = i1 === i2;
    const score = isSame ? 75 : calcScore(s1, s2);
    const key = isSame ? 'same' : getElementPairKey(s1.element, s2.element);
    setResult({
      score,
      desc: descs[key] ?? '',
      level: getLevel(score, t.levels),
      name1: s1.name,
      name2: s2.name,
    });
  };

  const scoreColor = result
    ? result.score >= 80 ? '#16A34A' : result.score >= 65 ? '#CA8A04' : result.score >= 50 ? '#EA580C' : '#DC2626'
    : 'var(--color-primary)';

  return (
    <div className={styles.calc}>
      <div className={styles.calc__row}>
        <div className={styles.calc__field}>
          <label className={styles.calc__label}>{t.label1}</label>
          <select
            className={styles.calc__select}
            value={sign1}
            onChange={(e) => { setSign1(e.target.value); setResult(null); setError(''); }}
          >
            {signs.map((s, i) => <option key={i} value={i}>{s.name}</option>)}
          </select>
        </div>
        <div className={styles.calc__field}>
          <label className={styles.calc__label}>{t.label2}</label>
          <select
            className={styles.calc__select}
            value={sign2}
            onChange={(e) => { setSign2(e.target.value); setResult(null); setError(''); }}
          >
            <option value="">—</option>
            {signs.map((s, i) => <option key={i} value={i}>{s.name}</option>)}
          </select>
        </div>
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {result && (
        <div className={styles.calc__result}>
          <div className={styles.calc__pair}>
            <span className={styles.calc__pair_name}>{result.name1}</span>
            <span className={styles.calc__pair_sep}>♥</span>
            <span className={styles.calc__pair_name}>{result.name2}</span>
          </div>
          <div className={styles.calc__score_wrap}>
            <div className={styles.calc__score_num} style={{ color: scoreColor }}>{result.score}%</div>
            <div className={styles.calc__score_bar_bg}>
              <div className={styles.calc__score_bar} style={{ width: `${result.score}%`, background: scoreColor }} />
            </div>
            <div className={styles.calc__level} style={{ color: scoreColor }}>{result.level}</div>
          </div>
          <p className={styles.calc__desc}>{result.desc}</p>
        </div>
      )}
    </div>
  );
}
