import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import ZodiacCompatibilityCalculator from './ZodiacCompatibilityCalculator';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Zodiac Compatibility Calculator — Check Your Star Sign Match', description: 'Check zodiac sign compatibility between two star signs. Get a compatibility score, element analysis and relationship description for any pair of signs. Free astrology compatibility tool.', h1: 'Zodiac Compatibility Calculator', subtitle: 'Check the compatibility between any two Western zodiac signs — get a compatibility score and element analysis.' },
  ru: { title: 'Совместимость знаков зодиака — проверить пару бесплатно', description: 'Проверьте совместимость двух знаков зодиака. Получите оценку совместимости, анализ элементов и описание отношений для любой пары. Бесплатный астрологический инструмент.', h1: 'Совместимость знаков зодиака', subtitle: 'Проверьте совместимость двух знаков западного зодиака — получите оценку совместимости и анализ элементов.' },
  uk: { title: 'Сумісність знаків зодіаку — перевірити пару безкоштовно', description: 'Перевірте сумісність двох знаків зодіаку. Отримайте оцінку сумісності, аналіз елементів та опис стосунків для будь-якої пари. Безкоштовний астрологічний інструмент.', h1: 'Сумісність знаків зодіаку', subtitle: 'Перевірте сумісність двох знаків західного зодіаку — отримайте оцінку сумісності та аналіз елементів.' },
  fr: { title: 'Compatibilité Astrologique — Vérifiez votre couple de signes', description: 'Vérifiez la compatibilité entre deux signes du zodiaque. Obtenez un score de compatibilité, une analyse des éléments et une description de la relation. Outil astrologique gratuit.', h1: 'Compatibilité des Signes du Zodiaque', subtitle: 'Vérifiez la compatibilité entre deux signes du zodiaque occidental — obtenez un score et une analyse des éléments.' },
  lt: { title: 'Zodiako ženklų suderinamumo skaičiuotuvas — patikrinkite porą', description: 'Patikrinkite dviejų zodiako ženklų suderinamumą. Gaukite suderinamumo balą, elementų analizę ir santykių aprašymą bet kuriai porai. Nemokamas astrologijos įrankis.', h1: 'Zodiako ženklų suderinamumo skaičiuotuvas', subtitle: 'Patikrinkite dviejų Vakarų zodiako ženklų suderinamumą — gaukite suderinamumo balą ir elementų analizę.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Zodiac compatibility in Western astrology is assessed primarily through the elemental relationship between two signs. The four elements — Fire, Earth, Air and Water — each carry distinct energetic qualities, and how two elements interact determines the fundamental nature of a pairing. Fire and Air feed each other (Air stokes Fire, Fire warms Air), creating natural enthusiasm and intellectual spark. Earth and Water nourish each other, building stable, emotionally secure relationships. Fire and Water clash through steam and tension, while Earth and Air often struggle with differing priorities of practicality versus idealism. Within each element, the modality (Cardinal, Fixed or Mutable) adds further nuance — two Fixed signs, for example, may experience power struggles, while two Mutable signs tend towards flexibility and compromise.\n\nThis calculator analyses the element and modality of both chosen signs to produce a compatibility score from 0 to 100. A high score reflects natural harmony in communication style, values and approach to life — not a guarantee of a perfect relationship, but a strong foundation. A lower score highlights areas requiring conscious effort and mutual growth. Remember that the full birth chart — including Moon, Venus, Mars and Rising signs — offers a far more detailed picture of relationship dynamics than the sun sign alone. Use this tool as a starting point for reflection, not a definitive verdict.',
    faqTitle: 'Frequently Asked Questions about Zodiac Compatibility',
    faqs: [
      { q: 'How is zodiac compatibility calculated?', a: 'Zodiac compatibility is assessed through the elemental and modal relationship between two signs. The four elements (Fire, Earth, Air, Water) and three modalities (Cardinal, Fixed, Mutable) interact in ways that have been studied and interpreted across thousands of years of astrological tradition. This calculator scores these interactions to produce a compatibility percentage.' },
      { q: 'Which zodiac signs are most compatible?', a: 'Generally, signs of the same element are highly compatible: Fire signs (Aries, Leo, Sagittarius) together, Earth signs (Taurus, Virgo, Capricorn) together, Air signs (Gemini, Libra, Aquarius) together, and Water signs (Cancer, Scorpio, Pisces) together. Fire and Air also pair well, as do Earth and Water.' },
      { q: 'Which zodiac signs are least compatible?', a: 'Traditionally, the most challenging pairings are between opposite or clashing elements: Fire and Water (steam and conflict), Earth and Air (practicality vs. idealism). Some specific challenging pairs include Aries–Cancer, Leo–Scorpio, and Capricorn–Aries due to clashing modalities as well as elements.' },
      { q: 'What does the compatibility score mean?', a: 'A score of 80–100 indicates excellent natural harmony — the pair shares complementary values, communication styles and life approaches. 65–79 indicates good compatibility with some areas needing attention. 50–64 is moderate — workable but requiring conscious effort. Below 50 suggests significant differences that require mutual understanding and respect.' },
      { q: 'Can opposite zodiac signs be compatible?', a: 'Yes, opposite signs (Aries–Libra, Taurus–Scorpio, Gemini–Sagittarius, Cancer–Capricorn, Leo–Aquarius, Virgo–Pisces) often experience powerful attraction. Each pair shares the same axis of themes but approaches them from opposite directions, creating a complementary dynamic where each partner has what the other lacks.' },
      { q: 'Is zodiac compatibility only about sun signs?', a: 'No. Sun sign compatibility is the most popular but most simplified form of astrological compatibility. A complete synastry reading (full chart comparison) considers the positions of Moon, Mercury, Venus, Mars, Jupiter, Saturn and the Rising sign for both individuals, revealing a much more detailed picture of relationship dynamics.' },
      { q: 'What is the role of elements in compatibility?', a: 'Elements reveal fundamental personality energies: Fire brings passion, initiative and inspiration; Earth brings stability, practicality and patience; Air brings intellect, communication and adaptability; Water brings emotion, intuition and depth. Signs sharing or complementing each other\'s element tend to understand each other\'s core nature most easily.' },
      { q: 'Do Fixed, Cardinal and Mutable signs affect compatibility?', a: 'Yes. Modality describes how a sign expresses its element. Cardinal signs (Aries, Cancer, Libra, Capricorn) initiate and lead. Fixed signs (Taurus, Leo, Scorpio, Aquarius) persist and stabilise. Mutable signs (Gemini, Virgo, Sagittarius, Pisces) adapt and transform. Two Fixed signs may clash on control; two Mutable signs may lack direction together; a Cardinal–Mutable pairing often works well with one leading and one adapting.' },
      { q: 'Can astrology predict relationship success?', a: 'Astrology provides archetypal frameworks for understanding relationship dynamics, not predictions. A challenging chart comparison does not mean a relationship will fail; it highlights areas requiring extra communication and effort. Many long-lasting couples have "incompatible" sun signs but deeply resonant Moon, Venus or Ascendant placements.' },
      { q: 'What is synastry in astrology?', a: 'Synastry is the branch of astrology that compares two birth charts to analyse the dynamics between two people. In synastry, astrologers overlay the two charts and examine how planets in one chart aspect planets in the other — for example, one person\'s Venus conjunct the other\'s Moon indicates deep emotional and romantic attunement.' },
    ],
  },
  ru: {
    description: 'Совместимость знаков зодиака в западной астрологии оценивается прежде всего через элементарную связь между двумя знаками. Четыре элемента — Огонь, Земля, Воздух и Вода — несут отличительные энергетические качества, и то, как два элемента взаимодействуют, определяет фундаментальную природу пары. Огонь и Воздух питают друг друга, создавая энтузиазм и интеллектуальную искру. Земля и Вода питают друг друга, строя стабильные, эмоционально безопасные отношения. Огонь и Вода сталкиваются, порождая напряжение, а Земля и Воздух часто борются с различными приоритетами.\n\nЭтот калькулятор анализирует элемент и модальность обоих выбранных знаков для получения оценки совместимости от 0 до 100. Высокая оценка отражает естественную гармонию в стиле общения, ценностях и подходе к жизни. Помните, что полная натальная карта предлагает гораздо более детальную картину динамики отношений. Используйте этот инструмент как отправную точку для размышлений.',
    faqTitle: 'Часто задаваемые вопросы о совместимости знаков зодиака',
    faqs: [
      { q: 'Как рассчитывается совместимость знаков зодиака?', a: 'Совместимость знаков оценивается через элементарную и модальную связь между двумя знаками. Четыре элемента и три модальности взаимодействуют способами, которые изучались в астрологической традиции на протяжении тысячелетий. Калькулятор оценивает эти взаимодействия для получения процента совместимости.' },
      { q: 'Какие знаки зодиака наиболее совместимы?', a: 'Как правило, знаки одного элемента высоко совместимы: знаки Огня (Овен, Лев, Стрелец), Земли (Телец, Дева, Козерог), Воздуха (Близнецы, Весы, Водолей) и Воды (Рак, Скорпион, Рыбы). Огонь и Воздух также хорошо сочетаются, как и Земля и Вода.' },
      { q: 'Какие знаки наименее совместимы?', a: 'Традиционно наиболее сложными являются пары между противоборствующими элементами: Огонь и Вода, Земля и Воздух. Некоторые конкретные сложные пары: Овен–Рак, Лев–Скорпион, Козерог–Овен из-за столкновения как элементов, так и модальностей.' },
      { q: 'Что означает оценка совместимости?', a: 'Оценка 80–100 указывает на отличную природную гармонию. 65–79 — хорошая совместимость с некоторыми областями, требующими внимания. 50–64 — умеренная, требующая сознательных усилий. Ниже 50 — значительные различия, требующие взаимопонимания и уважения.' },
      { q: 'Могут ли противоположные знаки быть совместимы?', a: 'Да, противоположные знаки (Овен–Весы, Телец–Скорпион, Близнецы–Стрелец и т.д.) часто испытывают сильное притяжение. Каждая пара разделяет одну ось тем, но подходит к ним с противоположных сторон, создавая дополняющую динамику.' },
      { q: 'Связана ли совместимость только с солнечным знаком?', a: 'Нет. Совместимость по солнечному знаку — наиболее популярная, но и наиболее упрощённая форма астрологической совместимости. Полный синастрический анализ включает позиции Луны, Меркурия, Венеры, Марса и Асцендента для обоих людей.' },
      { q: 'Какова роль элементов в совместимости?', a: 'Элементы раскрывают фундаментальные энергии личности: Огонь — страсть и инициатива; Земля — стабильность и практичность; Воздух — интеллект и общение; Вода — эмоции и интуиция. Знаки, разделяющие или дополняющие элементы друг друга, склонны лучше понимать основную природу партнёра.' },
      { q: 'Влияют ли кардинальные, фиксированные и изменчивые знаки на совместимость?', a: 'Да. Модальность описывает, как знак выражает свой элемент. Кардинальные знаки инициируют, фиксированные — сохраняют, изменчивые — адаптируются. Два фиксированных знака могут конфликтовать из-за контроля; два изменчивых могут не иметь направления.' },
      { q: 'Может ли астрология предсказать успех отношений?', a: 'Астрология предоставляет архетипические рамки для понимания динамики отношений, а не предсказания. Сложная карта совместимости не означает, что отношения потерпят неудачу; она указывает на области, требующие дополнительного общения.' },
      { q: 'Что такое синастрия в астрологии?', a: 'Синастрия — раздел астрологии, сравнивающий две натальные карты для анализа динамики между двумя людьми. Астрологи накладывают карты и исследуют аспекты планет одной карты с планетами другой.' },
      { q: 'Что означает, если у двух людей одинаковый знак зодиака?', a: 'Два человека с одним солнечным знаком часто разделяют основные ценности и стили общения, что создаёт сильное естественное понимание. Однако они также могут усиливать недостатки знака. Полный анализ требует сравнения всех планет.' },
    ],
  },
  uk: {
    description: 'Сумісність знаків зодіаку у Західній астрології оцінюється насамперед через елементарний зв\'язок між двома знаками. Чотири елементи — Вогонь, Земля, Повітря та Вода — несуть відмітні енергетичні якості, і те, як два елементи взаємодіють, визначає фундаментальну природу пари. Вогонь і Повітря живлять одне одного, створюючи ентузіазм та інтелектуальну іскру. Земля і Вода живлять одне одного, будуючи стабільні, емоційно захищені стосунки.\n\nЦей калькулятор аналізує елемент і модальність обох обраних знаків для отримання оцінки сумісності від 0 до 100. Висока оцінка відображає природну гармонію у стилі спілкування, цінностях та підході до життя. Пам\'ятайте, що повна натальна карта пропонує набагато детальнішу картину динаміки стосунків. Використовуйте цей інструмент як відправну точку для роздумів.',
    faqTitle: 'Поширені запитання про сумісність знаків зодіаку',
    faqs: [
      { q: 'Як розраховується сумісність знаків зодіаку?', a: 'Сумісність знаків оцінюється через елементарний та модальний зв\'язок між двома знаками. Чотири елементи та три модальності взаємодіють способами, що вивчалися в астрологічній традиції протягом тисячоліть.' },
      { q: 'Які знаки зодіаку найбільш сумісні?', a: 'Як правило, знаки одного елементу добре сумісні: знаки Вогню (Овен, Лев, Стрілець), Землі (Телець, Діва, Козеріг), Повітря (Близнюки, Терези, Водолій) і Води (Рак, Скорпіон, Риби). Вогонь і Повітря також добре поєднуються, як і Земля з Водою.' },
      { q: 'Які знаки найменш сумісні?', a: 'Традиційно найбільш складними є пари між протилежними елементами: Вогонь і Вода, Земля і Повітря. Деякі конкретні складні пари: Овен–Рак, Лев–Скорпіон, Козеріг–Овен через зіткнення елементів і модальностей.' },
      { q: 'Що означає оцінка сумісності?', a: 'Оцінка 80–100 означає відмінну природну гармонію. 65–79 — хороша сумісність з деякими областями уваги. 50–64 — помірна. Нижче 50 — значні відмінності, що вимагають взаємоповаги.' },
      { q: 'Чи можуть протилежні знаки бути сумісними?', a: 'Так, протилежні знаки (Овен–Терези, Телець–Скорпіон тощо) часто відчувають сильне притягання. Кожна пара ділить одну вісь тем, але підходить до них з протилежних сторін, створюючи доповнюючу динаміку.' },
      { q: 'Чи стосується сумісність лише сонячного знаку?', a: 'Ні. Сумісність за сонячним знаком — найпопулярніша, але найспрощеніша форма астрологічної сумісності. Повний синастрій включає позиції Місяця, Меркурія, Венери, Марса та Асценденту для обох людей.' },
      { q: 'Яка роль елементів у сумісності?', a: 'Елементи розкривають фундаментальні енергії особистості: Вогонь — пристрасть і ініціатива; Земля — стабільність і практичність; Повітря — інтелект і спілкування; Вода — емоції та інтуїція.' },
      { q: 'Чи впливають кардинальні, фіксовані та мінливі знаки на сумісність?', a: 'Так. Модальність описує, як знак виражає свій елемент. Кардинальні знаки ініціюють, фіксовані — зберігають, мінливі — адаптуються. Два фіксовані знаки можуть конфліктувати через контроль.' },
      { q: 'Чи може астрологія передбачити успіх стосунків?', a: 'Астрологія надає архетипічні рамки для розуміння динаміки стосунків, а не передбачення. Складна карта сумісності не означає, що стосунки провалятся; вона вказує на сфери, що потребують додаткового спілкування.' },
      { q: 'Що таке синастрія в астрології?', a: 'Синастрія — розділ астрології, що порівнює дві натальні карти для аналізу динаміки між двома людьми. Астрологи накладають карти та досліджують аспекти планет однієї карти з планетами іншої.' },
      { q: 'Що означає, якщо у двох людей однаковий знак зодіаку?', a: 'Два людини з однаковим сонячним знаком часто поділяють основні цінності та стилі спілкування. Однак вони також можуть посилювати недоліки знаку. Повний аналіз вимагає порівняння всіх планет.' },
    ],
  },
  fr: {
    description: 'La compatibilité astrologique en astrologie occidentale est évaluée principalement à travers la relation élémentaire entre deux signes. Les quatre éléments — Feu, Terre, Air et Eau — portent des qualités énergétiques distinctes, et la façon dont deux éléments interagissent détermine la nature fondamentale d\'un couple. Feu et Air se nourrissent mutuellement, créant enthousiasme et étincelle intellectuelle. Terre et Eau se nourrissent mutuellement, construisant des relations stables et émotionnellement sécurisées. Feu et Eau s\'opposent, générant tension et vapeur, tandis que Terre et Air peinent souvent à s\'accorder sur les priorités.\n\nCe calculateur analyse l\'élément et la modalité des deux signes choisis pour produire un score de compatibilité de 0 à 100. Un score élevé reflète une harmonie naturelle dans le style de communication, les valeurs et l\'approche de la vie. N\'oubliez pas que le thème natal complet offre une image beaucoup plus détaillée de la dynamique relationnelle. Utilisez cet outil comme point de départ pour la réflexion.',
    faqTitle: 'Questions fréquentes sur la compatibilité des signes du zodiaque',
    faqs: [
      { q: 'Comment calcule-t-on la compatibilité des signes ?', a: 'La compatibilité est évaluée à travers la relation élémentaire et modale entre deux signes. Les quatre éléments et les trois modalités interagissent selon des patrons étudiés pendant des millénaires en astrologie. Ce calculateur note ces interactions pour produire un pourcentage de compatibilité.' },
      { q: 'Quels signes sont les plus compatibles ?', a: 'En général, les signes du même élément sont très compatibles : Feu (Bélier, Lion, Sagittaire), Terre (Taureau, Vierge, Capricorne), Air (Gémeaux, Balance, Verseau), Eau (Cancer, Scorpion, Poissons). Feu et Air s\'accordent aussi bien, tout comme Terre et Eau.' },
      { q: 'Quels signes sont les moins compatibles ?', a: 'Traditionnellement, les associations les plus difficiles sont entre éléments opposés : Feu et Eau, Terre et Air. Certaines paires particulièrement challengeantes : Bélier–Cancer, Lion–Scorpion, Capricorne–Bélier en raison du choc des modalités et des éléments.' },
      { q: 'Que signifie le score de compatibilité ?', a: '80–100 : excellente harmonie naturelle. 65–79 : bonne compatibilité avec quelques points d\'attention. 50–64 : modérée, nécessitant des efforts conscients. Moins de 50 : différences significatives nécessitant compréhension et respect mutuels.' },
      { q: 'Les signes opposés peuvent-ils être compatibles ?', a: 'Oui, les signes opposés (Bélier–Balance, Taureau–Scorpion, etc.) connaissent souvent une attraction puissante. Chaque paire partage le même axe thématique mais l\'aborde de directions opposées, créant une dynamique complémentaire.' },
      { q: 'La compatibilité ne concerne-t-elle que le signe solaire ?', a: 'Non. La compatibilité par signe solaire est la forme la plus populaire mais aussi la plus simplifiée. Une lecture complète de synastrie considère la Lune, Mercure, Vénus, Mars et l\'Ascendant des deux individus.' },
      { q: 'Quel est le rôle des éléments dans la compatibilité ?', a: 'Les éléments révèlent les énergies fondamentales de la personnalité : le Feu apporte passion et initiative ; la Terre, stabilité et pragmatisme ; l\'Air, intellect et communication ; l\'Eau, émotion et intuition.' },
      { q: 'Les modalités (Cardinal, Fixe, Mutable) affectent-elles la compatibilité ?', a: 'Oui. Les signes Cardinaux initient, les signes Fixes maintiennent et stabilisent, les signes Mutables s\'adaptent. Deux signes Fixes peuvent s\'affronter sur le contrôle ; deux signes Mutables manqueront peut-être de direction.' },
      { q: 'L\'astrologie peut-elle prédire le succès d\'une relation ?', a: 'L\'astrologie fournit des cadres archétypaux pour comprendre la dynamique relationnelle, pas des prédictions. Un thème de synastrie difficile ne signifie pas que la relation échouera ; il signale des zones nécessitant davantage de communication.' },
      { q: 'Qu\'est-ce que la synastrie en astrologie ?', a: 'La synastrie est la branche de l\'astrologie qui compare deux thèmes natals pour analyser la dynamique entre deux personnes. Les astrologues superposent les deux thèmes et examinent comment les planètes d\'un thème aspectent les planètes de l\'autre.' },
    ],
  },
  lt: {
    description: 'Zodiako ženklų suderinamumas Vakarų astrologijoje pirmiausia vertinamas per elementinį ryšį tarp dviejų ženklų. Keturi elementai — Ugnis, Žemė, Oras ir Vanduo — turi skirtingas energetines savybes, ir tai, kaip du elementai sąveikauja, lemia poros pagrindinę prigimtį. Ugnis ir Oras maitina vienas kitą, sukurdami entuziazmą ir intelektualinę kibirkštį. Žemė ir Vanduo maitina vienas kitą, statydami stabilius, emociškai saugius santykius.\n\nŠis skaičiuotuvas analizuoja abiejų pasirinktų ženklų elementą ir modalumą, kad gautų suderinamumo balą nuo 0 iki 100. Aukštas balas atspindi natūralią harmoniją bendravimo stiliuje, vertybėse ir požiūryje į gyvenimą. Atminkite, kad pilna gimimo korta suteikia daug išsamesnį santykių dinamikos vaizdą. Naudokite šį įrankį kaip apmąstymo pradžios tašką.',
    faqTitle: 'Dažnai užduodami klausimai apie zodiako ženklų suderinamumą',
    faqs: [
      { q: 'Kaip skaičiuojamas zodiako ženklų suderinamumas?', a: 'Suderinamumas vertinamas per elementinį ir modalinį ryšį tarp dviejų ženklų. Keturi elementai ir trys modalumai sąveikauja pagal modelius, kuriuos astrologai tyrinėja tūkstantmečius. Skaičiuotuvas įvertina šias sąveikas suderinamumo procento pavidalu.' },
      { q: 'Kurie zodiako ženklai labiausiai suderinami?', a: 'Paprastai to paties elemento ženklai yra labai suderinami: Ugnies ženklai (Avinas, Liūtas, Šaulys), Žemės (Jautis, Mergelė, Ožiaragis), Oro (Dvyniai, Svarstyklės, Vandenis), Vandens (Vėžys, Skorpionas, Žuvys). Ugnis ir Oras taip pat gerai derinasi, kaip ir Žemė su Vandeniu.' },
      { q: 'Kurie ženklai mažiausiai suderinami?', a: 'Tradiciškai sudėtingiausios yra poros tarp priešingų elementų: Ugnis ir Vanduo, Žemė ir Oras. Kai kurios sudėtingos poros: Avinas–Vėžys, Liūtas–Skorpionas, Ožiaragis–Avinas.' },
      { q: 'Ką reiškia suderinamumo balas?', a: '80–100: puiki natūrali harmonija. 65–79: geras suderinamumas su kai kuriomis sritimis. 50–64: vidutinis, reikalaujantis sąmoningo pastangų. Žemiau 50: reikšmingi skirtumai, reikalaujantys abipusio supratimo.' },
      { q: 'Ar priešingi ženklai gali būti suderinami?', a: 'Taip, priešingi ženklai (Avinas–Svarstyklės, Jautis–Skorpionas ir kt.) dažnai patiria stiprų trauką. Kiekviena pora dalijasi ta pačia teminės ašimi, bet priartėja iš priešingų pusių, kurdama papildančią dinamiką.' },
      { q: 'Ar suderinamumas susijęs tik su saulės ženklu?', a: 'Ne. Suderinamumas pagal saulės ženklą yra populiariausia, bet ir supaprastinta forma. Pilna sinastrinė analizė apima Mėnulio, Merkurijaus, Veneros, Marso ir Ascendento pozicijas abiem asmenims.' },
      { q: 'Kokį vaidmenį suderinamume atlieka elementai?', a: 'Elementai atskleidžia pagrindines asmenybės energijas: Ugnis atneša aistrą ir iniciatyvą; Žemė — stabilumą ir praktiškumą; Oras — intelektą ir bendravimą; Vanduo — emocijas ir intuiciją.' },
      { q: 'Ar kardinaliniai, fiksuoti ir kintantys ženklai veikia suderinamumą?', a: 'Taip. Modalumas apibūdina, kaip ženklas reiškia savo elementą. Kardinaliniai ženklai inicijuoja, fiksuoti — išlaiko, kintantys — prisitaiko. Du fiksuoti ženklai gali konfliktuoti dėl kontrolės.' },
      { q: 'Ar astrologija gali nuspėti santykių sėkmę?', a: 'Astrologija suteikia archetipines sistemas santykių dinamikai suprasti, o ne prognozuoti. Sudėtinga suderinamumo korta nereiškia, kad santykiai žlugs; ji nurodo sritis, kuriose reikia papildomo bendravimo.' },
      { q: 'Kas yra sinastras astrologijoje?', a: 'Sinastras yra astrologijos šaka, lyginanti dvi gimimo kortas, siekiant analizuoti dinamiką tarp dviejų žmonių. Astrologai uždeda kortas viena ant kitos ir nagrinėja, kaip vienos kortos planetos daro aspektus kitos planetas.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign Calculator' },
    { href: '/calculator/chinese-zodiac', label: 'Chinese Zodiac' },
    { href: '/calculator/numerology-compatibility', label: 'Numerology Compatibility' },
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/celtic-zodiac', label: 'Celtic Zodiac' },
  ],
  ru: [
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/chinese-zodiac', label: 'Китайский гороскоп' },
    { href: '/calculator/numerology-compatibility', label: 'Совместимость по нумерологии' },
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/celtic-zodiac', label: 'Кельтский зодиак' },
  ],
  uk: [
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/chinese-zodiac', label: 'Китайський гороскоп' },
    { href: '/calculator/numerology-compatibility', label: 'Сумісність за нумерологією' },
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/celtic-zodiac', label: 'Кельтський зодіак' },
  ],
  fr: [
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/chinese-zodiac', label: 'Zodiaque Chinois' },
    { href: '/calculator/numerology-compatibility', label: 'Compatibilité Numérologique' },
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/celtic-zodiac', label: 'Zodiaque Celtique' },
  ],
  lt: [
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/chinese-zodiac', label: 'Kinų zodiako ženklas' },
    { href: '/calculator/numerology-compatibility', label: 'Numerologinis suderinamumas' },
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/celtic-zodiac', label: 'Keltų zodiako ženklas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/zodiac-compatibility', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function ZodiacCompatibilityPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/zodiac-compatibility`,
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
        <ZodiacCompatibilityCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
          <FaqSection title={content.faqTitle} faqs={content.faqs} />
        </div>
      </PageLayout>
    </>
  );
}
