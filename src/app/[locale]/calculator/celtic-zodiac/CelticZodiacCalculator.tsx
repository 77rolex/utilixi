'use client';

import { useState } from 'react';
import styles from './CelticZodiacCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, { label: string; btn: string; errEmpty: string; errInvalid: string; oghamLabel: string; qualitiesLabel: string }> = {
  en: { label: 'Date of birth', btn: 'Find My Celtic Tree Sign', errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.', oghamLabel: 'Ogham', qualitiesLabel: 'Key qualities' },
  ru: { label: 'Дата рождения', btn: 'Найти мой кельтский знак', errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.', oghamLabel: 'Огам', qualitiesLabel: 'Ключевые качества' },
  uk: { label: 'Дата народження', btn: 'Знайти мій кельтський знак', errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.', oghamLabel: 'Огам', qualitiesLabel: 'Ключові якості' },
  fr: { label: 'Date de naissance', btn: 'Trouver mon signe celtique', errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.', oghamLabel: 'Ogham', qualitiesLabel: 'Qualités clés' },
  lt: { label: 'Gimimo data', btn: 'Rasti savo keltų ženklą', errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite teisingą datą.', oghamLabel: 'Ogamas', qualitiesLabel: 'Pagrindinės savybės' },
};

type TreeLocale = { name: string; tree: string; qualities: string; desc: string };

// [mmdd_start, mmdd_end] ranges; Birch wraps (Dec24–Jan20)
const TREES: {
  symbol: string;
  ogham: string;
  startMmdd: number;
  endMmdd: number;
  wrap?: boolean;
  en: TreeLocale; ru: TreeLocale; uk: TreeLocale; fr: TreeLocale; lt: TreeLocale;
}[] = [
  {
    symbol: '🌲', ogham: 'ᚁ', startMmdd: 1224, endMmdd: 120, wrap: true,
    en: { name: 'Birch', tree: 'Beth', qualities: 'Pioneer · Renewal · Courage', desc: 'Birch is the tree of new beginnings. Those born under this sign are determined pioneers — resilient, courageous and always ready to start fresh. They carry the energy of renewal and have a remarkable ability to recover from setbacks.' },
    ru: { name: 'Берёза', tree: 'Beth', qualities: 'Первопроходец · Обновление · Смелость', desc: 'Берёза — дерево новых начал. Рождённые под этим знаком — стойкие первопроходцы, смелые и всегда готовые начать заново. Они несут энергию обновления и замечательно восстанавливаются после трудностей.' },
    uk: { name: 'Береза', tree: 'Beth', qualities: 'Першопрохідник · Оновлення · Сміливість', desc: 'Береза — дерево нових початків. Народжені під цим знаком — стійкі першопрохідники, сміливі та завжди готові почати спочатку. Вони несуть енергію оновлення та чудово відновлюються після труднощів.' },
    fr: { name: 'Bouleau', tree: 'Beth', qualities: 'Pionnier · Renouveau · Courage', desc: 'Le Bouleau est l\'arbre des nouveaux commencements. Nés sous ce signe sont des pionniers déterminés — résilients, courageux et toujours prêts à repartir de zéro. Ils portent l\'énergie du renouveau.' },
    lt: { name: 'Beržas', tree: 'Beth', qualities: 'Pionierius · Atsinaujinimas · Drąsa', desc: 'Beržas yra naujų pradžių medis. Gimę po šiuo ženklu yra ryžtingi pionieriai — atsparūs, drąsūs ir visada pasiruošę pradėti iš naujo. Jie neša atsinaujinimo energiją.' },
  },
  {
    symbol: '🌿', ogham: 'ᚂ', startMmdd: 121, endMmdd: 217,
    en: { name: 'Rowan', tree: 'Luis', qualities: 'Vision · Protection · Intuition', desc: 'Rowan is the tree of vision and protection. Those born under Rowan are gifted with great intuition, creative thinking and a strong spiritual awareness. They are natural protectors who guide others with insight and calm strength.' },
    ru: { name: 'Рябина', tree: 'Luis', qualities: 'Видение · Защита · Интуиция', desc: 'Рябина — дерево видения и защиты. Рождённые под знаком Рябины наделены острой интуицией, творческим мышлением и сильной духовной осознанностью. Они прирождённые защитники, ведущие других с проницательностью.' },
    uk: { name: 'Горобина', tree: 'Luis', qualities: 'Бачення · Захист · Інтуїція', desc: 'Горобина — дерево бачення та захисту. Народжені під знаком Горобини наділені гострою інтуїцією, творчим мисленням та сильною духовною усвідомленістю.' },
    fr: { name: 'Sorbier', tree: 'Luis', qualities: 'Vision · Protection · Intuition', desc: 'Le Sorbier est l\'arbre de la vision et de la protection. Nés sous ce signe sont dotés d\'une grande intuition, d\'une pensée créative et d\'une forte conscience spirituelle. Protecteurs naturels qui guident les autres.' },
    lt: { name: 'Šermukšnis', tree: 'Luis', qualities: 'Regėjimas · Apsauga · Intuicija', desc: 'Šermukšnis yra vizijos ir apsaugos medis. Gimę po Šermukšniu apdovanoti didelę intuicija, kūrybišku mąstymu ir stipriu dvasiniu sąmoningumu. Natūralūs saugotojai, nukreipiantys kitus.' },
  },
  {
    symbol: '🌳', ogham: 'ᚅ', startMmdd: 218, endMmdd: 317,
    en: { name: 'Ash', tree: 'Nion', qualities: 'Connection · Flexibility · Healing', desc: 'Ash is the world tree, connecting the realms of above and below. Those born under Ash are flexible, imaginative thinkers with a deep inner life. They are natural connectors — bridging worlds, ideas and people with ease.' },
    ru: { name: 'Ясень', tree: 'Nion', qualities: 'Связь · Гибкость · Исцеление', desc: 'Ясень — мировое дерево, соединяющее миры. Рождённые под знаком Ясеня — гибкие, воображаемые мыслители с богатой внутренней жизнью. Прирождённые объединители, легко соединяющие миры, идеи и людей.' },
    uk: { name: 'Ясен', tree: 'Nion', qualities: 'Зв\'язок · Гнучкість · Зцілення', desc: 'Ясен — світове дерево, що з\'єднує світи. Народжені під знаком Ясена — гнучкі, уявні мислителі з багатим внутрішнім світом. Природжені об\'єднувачі, що легко з\'єднують ідеї та людей.' },
    fr: { name: 'Frêne', tree: 'Nion', qualities: 'Connexion · Flexibilité · Guérison', desc: 'Le Frêne est l\'arbre du monde, connectant les royaumes. Nés sous le Frêne sont des penseurs flexibles et imaginatifs avec une vie intérieure profonde. Connecteurs naturels — reliant mondes, idées et personnes.' },
    lt: { name: 'Uosis', tree: 'Nion', qualities: 'Ryšys · Lankstumas · Gydymas', desc: 'Uosis yra pasaulio medis, jungiančius sferas. Gimę po Uosiu yra lanksčiai mąstantys, vaizduotingi su gilia vidiniu gyvenimu. Natūralūs jungiamieji — lengvai jungiantys pasaulius, idėjas ir žmones.' },
  },
  {
    symbol: '🌿', ogham: 'ᚃ', startMmdd: 318, endMmdd: 414,
    en: { name: 'Alder', tree: 'Fearn', qualities: 'Confidence · Guidance · Strength', desc: 'Alder is the tree of the warrior and the guide. Those born under Alder are confident decision-makers with a strong sense of purpose. They are natural guides and protectors, capable of leading others through difficult terrain with resolve.' },
    ru: { name: 'Ольха', tree: 'Fearn', qualities: 'Уверенность · Наставничество · Сила', desc: 'Ольха — дерево воина и проводника. Рождённые под знаком Ольхи — уверенные в себе, с сильным чувством цели. Прирождённые наставники и защитники, способные вести других через трудности.' },
    uk: { name: 'Вільха', tree: 'Fearn', qualities: 'Впевненість · Наставництво · Сила', desc: 'Вільха — дерево воїна та провідника. Народжені під знаком Вільхи — впевнені у собі, з сильним відчуттям мети. Природжені наставники та захисники.' },
    fr: { name: 'Aulne', tree: 'Fearn', qualities: 'Confiance · Guidage · Force', desc: 'L\'Aulne est l\'arbre du guerrier et du guide. Nés sous l\'Aulne sont des décideurs confiants avec un fort sens du but. Guides et protecteurs naturels capables de mener les autres à travers les difficultés.' },
    lt: { name: 'Alksnis', tree: 'Fearn', qualities: 'Pasitikėjimas · Vadovavimas · Stiprybė', desc: 'Alksnis yra kario ir vadovo medis. Gimę po Alksniu yra pasitikintys savimi sprendimų priėmėjai su stipriu tikslo jausmu. Natūralūs vadovai ir gynėjai.' },
  },
  {
    symbol: '🌸', ogham: 'ᚄ', startMmdd: 415, endMmdd: 512,
    en: { name: 'Willow', tree: 'Saille', qualities: 'Intuition · Emotion · Cycles', desc: 'Willow is deeply connected to the moon and the rhythms of water. Those born under Willow are highly intuitive, emotionally perceptive and in tune with natural cycles. They possess an inner knowing that guides them through life\'s ebbs and flows.' },
    ru: { name: 'Ива', tree: 'Saille', qualities: 'Интуиция · Эмоции · Циклы', desc: 'Ива глубоко связана с луной и ритмами воды. Рождённые под знаком Ивы высокоинтуитивны, эмоционально восприимчивы и настроены на природные циклы. Они обладают внутренним знанием, ведущим их через приливы и отливы жизни.' },
    uk: { name: 'Верба', tree: 'Saille', qualities: 'Інтуїція · Емоції · Цикли', desc: 'Верба глибоко пов\'язана з місяцем та ритмами води. Народжені під знаком Верби — висококонтуїтивні, емоційно сприйнятливі та налаштовані на природні цикли.' },
    fr: { name: 'Saule', tree: 'Saille', qualities: 'Intuition · Émotion · Cycles', desc: 'Le Saule est profondément connecté à la lune et aux rythmes de l\'eau. Nés sous le Saule sont très intuitifs, émotionnellement perceptifs et à l\'écoute des cycles naturels.' },
    lt: { name: 'Gluosnis', tree: 'Saille', qualities: 'Intuicija · Emocijos · Ciklai', desc: 'Gluosnis yra giliai susijęs su mėnuliu ir vandens ritmais. Gimę po Gluosniu yra labai intuityvūs, emociškai jautrūs ir suderinti su gamtos ciklais.' },
  },
  {
    symbol: '🌺', ogham: 'ᚆ', startMmdd: 513, endMmdd: 609,
    en: { name: 'Hawthorn', tree: 'Huath', qualities: 'Balance · Patience · Contradiction', desc: 'Hawthorn is the tree of paradox — combining beauty with thorns, sweetness with protection. Those born under Hawthorn are complex individuals who hold opposites in balance. They are patient, adaptable and exceptionally perceptive about the hidden layers of life.' },
    ru: { name: 'Боярышник', tree: 'Huath', qualities: 'Равновесие · Терпение · Противоречие', desc: 'Боярышник — дерево парадокса: красота с шипами, сладость с защитой. Рождённые под знаком Боярышника — сложные личности, удерживающие противоположности в равновесии.' },
    uk: { name: 'Глід', tree: 'Huath', qualities: 'Рівновага · Терпіння · Суперечність', desc: 'Глід — дерево парадоксу: краса з шипами, солодкість із захистом. Народжені під знаком Гліду — складні особистості, що тримають протилежності в рівновазі.' },
    fr: { name: 'Aubépine', tree: 'Huath', qualities: 'Équilibre · Patience · Contradiction', desc: 'L\'Aubépine est l\'arbre du paradoxe — combinant beauté et épines, douceur et protection. Nés sous l\'Aubépine sont des individus complexes qui équilibrent les opposés.' },
    lt: { name: 'Gudobelis', tree: 'Huath', qualities: 'Pusiausvyra · Kantrybė · Prieštaravimas', desc: 'Gudobelis yra paradokso medis — derinantis grožį su dygliais, saldumą su apsauga. Gimę po Gudobeliu yra sudėtingi asmenys, išlaikantys priešybes pusiausvyroje.' },
  },
  {
    symbol: '🌳', ogham: 'ᚇ', startMmdd: 610, endMmdd: 707,
    en: { name: 'Oak', tree: 'Duir', qualities: 'Strength · Endurance · Leadership', desc: 'Oak is the king of the forest and the most powerful Celtic tree sign. Those born under the Oak are strong, enduring and naturally inspiring. They are born leaders with deep roots, immovable values and the ability to provide shelter and stability for those around them.' },
    ru: { name: 'Дуб', tree: 'Duir', qualities: 'Сила · Выносливость · Лидерство', desc: 'Дуб — король леса и самый мощный кельтский знак. Рождённые под знаком Дуба сильны, выносливы и вдохновляют других. Прирождённые лидеры с глубокими корнями и незыблемыми ценностями.' },
    uk: { name: 'Дуб', tree: 'Duir', qualities: 'Сила · Витривалість · Лідерство', desc: 'Дуб — король лісу і наймогутніший кельтський знак. Народжені під знаком Дуба — сильні, витривалі та надихають інших. Природжені лідери з глибокими коренями та непохитними цінностями.' },
    fr: { name: 'Chêne', tree: 'Duir', qualities: 'Force · Endurance · Leadership', desc: 'Le Chêne est le roi de la forêt et le signe celtique le plus puissant. Nés sous le Chêne sont forts, endurants et naturellement inspirants. Des leaders nés avec des racines profondes et des valeurs inébranlables.' },
    lt: { name: 'Ąžuolas', tree: 'Duir', qualities: 'Stiprybė · Ištvermė · Lyderystė', desc: 'Ąžuolas yra miško karalius ir galingiausias keltų ženklas. Gimę po Ąžuolu yra stiprūs, atsparūs ir natūraliai įkvepiancys. Natūralūs lyderiai su gilomis šaknimis ir nepalenkiamomis vertybėmis.' },
  },
  {
    symbol: '🍃', ogham: 'ᚈ', startMmdd: 708, endMmdd: 804,
    en: { name: 'Holly', tree: 'Tinne', qualities: 'Nobility · Ambition · Steadiness', desc: 'Holly is a sign of noble ambition and unwavering commitment. Those born under Holly are competitive, goal-oriented and highly capable of rising to any challenge. They combine practical strength with noble purpose, often achieving great things through persistence.' },
    ru: { name: 'Падуб', tree: 'Tinne', qualities: 'Благородство · Амбиции · Стойкость', desc: 'Падуб — знак благородных амбиций и непоколебимой преданности. Рождённые под знаком Падуба соревновательны, целеустремлённы и способны преодолевать любые испытания.' },
    uk: { name: 'Падуб', tree: 'Tinne', qualities: 'Шляхетність · Амбіції · Стійкість', desc: 'Падуб — знак шляхетних амбіцій та непохитної відданості. Народжені під знаком Падуба змагальні, цілеспрямовані та здатні долати будь-які виклики.' },
    fr: { name: 'Houx', tree: 'Tinne', qualities: 'Noblesse · Ambition · Constance', desc: 'Le Houx est un signe d\'ambition noble et d\'engagement inébranlable. Nés sous le Houx sont compétitifs, orientés vers les objectifs et très capables de relever tout défi.' },
    lt: { name: 'Bugienis', tree: 'Tinne', qualities: 'Kilnumas · Ambicingumas · Pastovumas', desc: 'Bugienis yra kilnių ambicijų ir nepajudinamo atsidavimo ženklas. Gimę po Bugienio yra konkurencingi, orientuoti į tikslus ir labai pajėgūs įveikti bet kokius iššūkius.' },
  },
  {
    symbol: '🌰', ogham: 'ᚉ', startMmdd: 805, endMmdd: 901,
    en: { name: 'Hazel', tree: 'Coll', qualities: 'Wisdom · Knowledge · Creativity', desc: 'Hazel is the sacred tree of knowledge and inspiration. Those born under Hazel are highly creative, intellectually gifted and drawn to learning. They absorb information rapidly, see connections others miss, and are often found at the crossroads of art and science.' },
    ru: { name: 'Лещина', tree: 'Coll', qualities: 'Мудрость · Знание · Творчество', desc: 'Лещина — священное дерево знания и вдохновения. Рождённые под знаком Лещины творчески и интеллектуально одарены, стремятся к учёбе. Они быстро усваивают информацию и видят связи, которые другие упускают.' },
    uk: { name: 'Ліщина', tree: 'Coll', qualities: 'Мудрість · Знання · Творчість', desc: 'Ліщина — священне дерево знань та натхнення. Народжені під знаком Ліщини творчо та інтелектуально обдаровані, прагнуть навчання. Вони швидко засвоюють інформацію та бачать зв\'язки.' },
    fr: { name: 'Noisetier', tree: 'Coll', qualities: 'Sagesse · Connaissance · Créativité', desc: 'Le Noisetier est l\'arbre sacré de la connaissance et de l\'inspiration. Nés sous le Noisetier sont très créatifs, intellectuellement doués et attirés par l\'apprentissage. Ils absorbent l\'information rapidement.' },
    lt: { name: 'Lazdynas', tree: 'Coll', qualities: 'Išmintis · Žinios · Kūrybiškumas', desc: 'Lazdynas yra šventasis žinių ir įkvėpimo medis. Gimę po Lazdynu yra labai kūrybingi, intelektualiai apdovanoti ir linkę mokytis. Jie greitai įsisavina informaciją.' },
  },
  {
    symbol: '🍇', ogham: 'ᚋ', startMmdd: 902, endMmdd: 929,
    en: { name: 'Vine', tree: 'Muin', qualities: 'Refined taste · Indecision · Empathy', desc: 'Vine is a sign of refined perception and deep empathy. Those born under Vine have exquisite taste, a rich inner world and an ability to deeply understand others\' emotions. They can see multiple sides of any situation, which brings both great wisdom and occasional indecision.' },
    ru: { name: 'Виноград', tree: 'Muin', qualities: 'Утончённый вкус · Нерешительность · Эмпатия', desc: 'Виноград — знак утончённого восприятия и глубокой эмпатии. Рождённые под знаком Винограда обладают изысканным вкусом, богатым внутренним миром и способностью глубоко понимать эмоции других.' },
    uk: { name: 'Виноград', tree: 'Muin', qualities: 'Витончений смак · Нерішучість · Емпатія', desc: 'Виноград — знак витонченого сприйняття та глибокої емпатії. Народжені під знаком Винограду мають вишуканий смак, багатий внутрішній світ та здатність глибоко розуміти емоції інших.' },
    fr: { name: 'Vigne', tree: 'Muin', qualities: 'Goût raffiné · Indécision · Empathie', desc: 'La Vigne est un signe de perception raffinée et d\'empathie profonde. Nés sous la Vigne ont un goût exquis, un monde intérieur riche et une capacité à comprendre profondément les émotions des autres.' },
    lt: { name: 'Vynmedis', tree: 'Muin', qualities: 'Rafinuotas skonis · Neryžtingumas · Empatija', desc: 'Vynmedis yra subtilaus suvokimo ir gilios empatijos ženklas. Gimę po Vynmedžiu turi puikų skonį, turtingą vidinį pasaulį ir gebėjimą giliai suprasti kitų emocijas.' },
  },
  {
    symbol: '🍂', ogham: 'ᚌ', startMmdd: 930, endMmdd: 1027,
    en: { name: 'Ivy', tree: 'Gort', qualities: 'Resilience · Loyalty · Tenacity', desc: 'Ivy is a sign of remarkable resilience and unwavering loyalty. Those born under Ivy are tenacious climbers who overcome obstacles through persistence. They are deeply loyal to their circle, thrive in community and have a quiet but powerful determination that sees them through any difficulty.' },
    ru: { name: 'Плющ', tree: 'Gort', qualities: 'Стойкость · Лояльность · Упорство', desc: 'Плющ — знак замечательной стойкости и непоколебимой лояльности. Рождённые под знаком Плюща — упорные, преодолевающие препятствия настойчивостью. Они глубоко преданы своему окружению.' },
    uk: { name: 'Плющ', tree: 'Gort', qualities: 'Стійкість · Лояльність · Наполегливість', desc: 'Плющ — знак надзвичайної стійкості та непохитної лояльності. Народжені під знаком Плюща — завзяті, що долають перешкоди наполегливістю. Вони глибоко відданні своєму колу.' },
    fr: { name: 'Lierre', tree: 'Gort', qualities: 'Résilience · Loyauté · Ténacité', desc: 'Le Lierre est un signe de résilience remarquable et de loyauté inébranlable. Nés sous le Lierre sont des grimpeurs tenaces qui surmontent les obstacles par la persévérance. Profondément loyaux à leur cercle.' },
    lt: { name: 'Gebenė', tree: 'Gort', qualities: 'Atsparumas · Lojalumas · Užsispyrimas', desc: 'Gebenė yra nuostabaus atsparumo ir nepajudinamo lojalumo ženklas. Gimę po Gebene yra atkaklūs, įveikiantys kliūtis atkaklumu. Jie giliai ištikimi savo ratui.' },
  },
  {
    symbol: '🌾', ogham: 'ᚏ', startMmdd: 1028, endMmdd: 1124,
    en: { name: 'Reed', tree: 'Ngetal', qualities: 'Purpose · Harmony · Secrets', desc: 'Reed is a sign of hidden depths and purposeful action. Those born under Reed are complex, determined individuals who seek the root causes of things. They are natural storytellers and truth-seekers, with an ability to uncover what is hidden and weave it into meaningful expression.' },
    ru: { name: 'Тростник', tree: 'Ngetal', qualities: 'Цель · Гармония · Тайны', desc: 'Тростник — знак скрытых глубин и целенаправленного действия. Рождённые под знаком Тростника — сложные, целеустремлённые, ищущие первопричины. Прирождённые рассказчики и искатели истины.' },
    uk: { name: 'Очерет', tree: 'Ngetal', qualities: 'Мета · Гармонія · Таємниці', desc: 'Очерет — знак прихованих глибин та цілеспрямованих дій. Народжені під знаком Очерету — складні, цілеспрямовані, що шукають першопричини. Природжені оповідачі та шукачі істини.' },
    fr: { name: 'Roseau', tree: 'Ngetal', qualities: 'But · Harmonie · Secrets', desc: 'Le Roseau est un signe de profondeurs cachées et d\'action déterminée. Nés sous le Roseau sont des individus complexes qui cherchent les causes profondes des choses. Conteurs naturels et chercheurs de vérité.' },
    lt: { name: 'Nendrė', tree: 'Ngetal', qualities: 'Tikslas · Harmonija · Paslaptys', desc: 'Nendrė yra paslėptų gelmių ir tikslingų veiksmų ženklas. Gimę po Nendre yra sudėtingi, ryžtingi asmenys, ieškantys dalykų šaknų priežasčių. Natūralūs pasakotojai ir tiesos ieškotojai.' },
  },
  {
    symbol: '🌑', ogham: 'ᚏ', startMmdd: 1125, endMmdd: 1223,
    en: { name: 'Elder', tree: 'Ruis', qualities: 'Transformation · Freedom · Evolution', desc: 'Elder is the final tree of the Celtic calendar — the sign of endings, transformation and new beginnings in disguise. Those born under Elder are intensely alive, freedom-loving and drawn to change. They experience life deeply, learn quickly from setbacks and are never afraid to evolve.' },
    ru: { name: 'Бузина', tree: 'Ruis', qualities: 'Трансформация · Свобода · Эволюция', desc: 'Бузина — последнее дерево кельтского календаря: знак окончаний, трансформации и новых начал в маскировке. Рождённые под знаком Бузины страстно любят жизнь и свободу, притягиваются к переменам.' },
    uk: { name: 'Бузина', tree: 'Ruis', qualities: 'Трансформація · Свобода · Еволюція', desc: 'Бузина — останнє дерево кельтського календаря: знак завершень, трансформацій та нових початків у масці. Народжені під знаком Бузини пристрасно люблять життя та свободу.' },
    fr: { name: 'Sureau', tree: 'Ruis', qualities: 'Transformation · Liberté · Évolution', desc: 'Le Sureau est le dernier arbre du calendrier celtique — le signe des fins, de la transformation et des nouveaux commencements déguisés. Nés sous le Sureau sont intensément vivants, amateurs de liberté.' },
    lt: { name: 'Šeivamedis', tree: 'Ruis', qualities: 'Transformacija · Laisvė · Evoliucija', desc: 'Šeivamedis yra paskutinis keltų kalendoriaus medis — pabaigų, transformacijos ir naujų pradžių persirengusiomis ženklas. Gimę po Šeivamedžiu intensyviai gyvena, myli laisvę ir mėgsta pokyčius.' },
  },
];

function getTreeIndex(month: number, day: number): number {
  const mmdd = month * 100 + day;
  for (let i = 0; i < TREES.length; i++) {
    const t = TREES[i];
    if (t.wrap) {
      if (mmdd >= t.startMmdd || mmdd <= t.endMmdd) return i;
    } else {
      if (mmdd >= t.startMmdd && mmdd <= t.endMmdd) return i;
    }
  }
  return 0;
}

export default function CelticZodiacCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [date, setDate] = useState('');
  const [result, setResult] = useState<typeof TREES[0] | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setResult(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError(t.errInvalid); setResult(null); return; }
    setError('');
    const idx = getTreeIndex(d.getMonth() + 1, d.getDate());
    setResult(TREES[idx]);
  };

  const treeData = result ? ((result[locale as keyof typeof result] ?? result.en) as TreeLocale) : null;

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => { setDate(e.target.value); setError(''); setResult(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {result && treeData && (
        <div className={styles.calc__result}>
          <div className={styles.calc__symbol}>{result.symbol}</div>
          <div className={styles.calc__ogham}>{result.ogham}</div>
          <h3 className={styles.calc__name}>{treeData.name}</h3>
          <p className={styles.calc__tree}>{treeData.tree} · {t.oghamLabel}: {result.ogham}</p>
          <div className={styles.calc__tags}>
            <span className={styles.calc__tag}>{t.qualitiesLabel}: {treeData.qualities}</span>
          </div>
          <p className={styles.calc__desc}>{treeData.desc}</p>
        </div>
      )}
    </div>
  );
}
