import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import NumerologyCompatibilityCalculator from './NumerologyCompatibilityCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Numerology Compatibility Calculator — Life Path Match', description: 'Calculate numerology compatibility between two people using Life Path numbers. Discover your match score, relationship theme and compatibility insights. Free numerology tool.', h1: 'Numerology Compatibility Calculator', subtitle: 'Check the numerological compatibility between two people by comparing their Life Path Numbers and relationship dynamics.' },
  ru: { title: 'Калькулятор совместимости по нумерологии — числа жизненного пути', description: 'Рассчитайте нумерологическую совместимость двух людей по числам жизненного пути. Узнайте оценку совместимости, тему отношений и анализ пары. Бесплатный инструмент.', h1: 'Калькулятор совместимости по нумерологии', subtitle: 'Проверьте нумерологическую совместимость двух людей, сравнив их числа жизненного пути и динамику отношений.' },
  uk: { title: 'Калькулятор сумісності за нумерологією — числа шляху життя', description: 'Розрахуйте нумерологічну сумісність двох людей за числами шляху життя. Дізнайтеся оцінку сумісності, тему стосунків та аналіз пари. Безкоштовний інструмент.', h1: 'Калькулятор сумісності за нумерологією', subtitle: 'Перевірте нумерологічну сумісність двох людей, порівнявши їхні числа шляху життя та динаміку стосунків.' },
  fr: { title: 'Calculateur de Compatibilité Numérologique — Chemin de Vie', description: 'Calculez la compatibilité numérologique entre deux personnes en utilisant les Chemins de Vie. Découvrez votre score de compatibilité et les insights relationnels. Outil gratuit.', h1: 'Calculateur de Compatibilité Numérologique', subtitle: 'Vérifiez la compatibilité numérologique entre deux personnes en comparant leurs Nombres Chemin de Vie et dynamiques relationnelles.' },
  lt: { title: 'Numerologinio suderinamumo skaičiuotuvas — Gyvenimo kelio skaičiai', description: 'Apskaičiuokite dviejų žmonių numerologinį suderinamumą naudojant Gyvenimo kelio skaičius. Sužinokite suderinamumo balą ir santykių įžvalgas. Nemokamas įrankis.', h1: 'Numerologinio suderinamumo skaičiuotuvas', subtitle: 'Patikrinkite dviejų žmonių numerologinį suderinamumą lygindami jų gyvenimo kelio skaičius ir santykių dinamiką.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Numerology compatibility uses the Life Path number — the most fundamental number in numerology — to assess the natural dynamics between two people. Each person\'s Life Path is calculated from their full birth date and reduced to a single digit (1–9) or a Master Number (11 or 22). The combination of the two Life Path numbers reveals characteristic patterns of attraction, friction, growth and harmony between the two individuals. Some pairings are naturally complementary; others require more conscious effort to thrive.\n\nThis tool calculates both Life Paths and looks up their compatibility based on the numerological relationship between the two numbers. The compatibility score reflects the overall ease and depth of connection across romantic, friendship and professional dimensions. Rather than a fixed verdict, think of the result as a nuanced map — identifying where two people\'s energies flow together naturally and where growth and understanding are called for. Many couples with \'challenging\' numerological pairings report deeply meaningful relationships, particularly when both partners are committed to conscious growth.',
    faqTitle: 'Frequently Asked Questions about Numerology Compatibility',
    faqs: [
      { q: 'What is numerology compatibility?', a: 'Numerology compatibility uses Life Path numbers — derived from each person\'s birth date — to assess the natural dynamics, strengths and challenges in a relationship. Each Life Path number (1–9, or Master 11/22) carries distinct energy, and certain combinations are more harmonious than others.' },
      { q: 'How is the compatibility score calculated?', a: 'This calculator determines the Life Path number for each birth date by summing all digits and reducing to a single digit (preserving Master Numbers 11 and 22). It then looks up the established numerological relationship between the two Life Path numbers and returns a compatibility score and description.' },
      { q: 'Which Life Path numbers are most compatible?', a: 'Generally, 2 and 6 are among the most compatible pairings — both value love, harmony and family. 4 and 8 form an excellent practical partnership. 3 and 5 share high creative energy. 1 and 3 inspire each other strongly. 7 and 9 share a deep philosophical bond.' },
      { q: 'Which Life Path combinations are most challenging?', a: 'The most challenging pairings tend to be 4 and 5 (structure versus freedom), 2 and 5 (security versus adventure), and 1 and 6 (independence versus commitment). These pairings require more conscious effort, compromise and mutual respect to build lasting harmony.' },
      { q: 'Can Master Number 11 or 22 people be compatible?', a: 'Yes. People with Master Number Life Paths (11 or 22) are compared based on the base digit (11 treated as 2, 22 as 4) for compatibility purposes, as the underlying qualities are similar at the base level. Master Number individuals often bring extraordinary intensity and purpose to relationships.' },
      { q: 'Is numerology compatibility accurate?', a: 'Numerology compatibility offers a meaningful framework for reflection rather than absolute prediction. Many couples find surprising accuracy in the patterns described. However, real compatibility depends on individual maturity, communication, shared values and mutual commitment — no single number system can fully capture the complexity of human relationships.' },
      { q: 'Does numerology compatibility apply to friendships and work relationships?', a: 'Yes. The same Life Path dynamics apply across all types of relationships. A 4–8 combination might describe an excellent business partnership; a 2–6 pairing might describe a deeply supportive friendship. The numerological themes are relational, not limited to romance.' },
      { q: 'Can opposite Life Path numbers be compatible?', a: 'Yes, and often they create powerful and growth-oriented dynamics. Life Path opposites (1 and 9, 2 and 8, 3 and 7, 4 and 6, etc.) can attract each other strongly through their differences and each provides what the other lacks — as long as both respect the other\'s nature.' },
      { q: 'Should I choose a partner based on numerology?', a: 'Numerology is a reflective tool, not a selection algorithm. It can offer helpful insights into relationship dynamics and where conscious work may be needed, but the quality of any relationship depends far more on shared values, communication and mutual commitment than on numerological compatibility scores.' },
      { q: 'What if both people have the same Life Path number?', a: 'Same Life Path pairings can be deeply natural — both people understand each other\'s core motivations and share fundamental values. However, they can also mirror each other\'s blind spots. Two 1s may both want to lead; two 4s may create a highly stable but sometimes rigid partnership. Awareness of shared tendencies is key.' },
    ],
  },
  ru: {
    description: 'Совместимость в нумерологии использует число жизненного пути — наиболее фундаментальное число в нумерологии — для оценки природной динамики между двумя людьми. Число жизненного пути каждого человека рассчитывается из полной даты рождения и сводится к однозначному числу (1–9) или Мастер-числу (11 или 22). Сочетание двух чисел жизненного пути раскрывает характерные паттерны притяжения, трений, роста и гармонии между двумя людьми.\n\nЭтот инструмент рассчитывает оба жизненных пути и определяет их совместимость на основе нумерологической взаимосвязи между двумя числами. Оценка совместимости отражает общую лёгкость и глубину связи. Скорее чем окончательный вердикт, воспринимайте результат как детальную карту, определяющую где энергии двух людей естественно сочетаются, а где требуется рост.',
    faqTitle: 'Часто задаваемые вопросы о совместимости в нумерологии',
    faqs: [
      { q: 'Что такое нумерологическая совместимость?', a: 'Нумерологическая совместимость использует числа жизненного пути — производные от дат рождения каждого человека — для оценки природной динамики, сильных сторон и вызовов в отношениях.' },
      { q: 'Как рассчитывается оценка совместимости?', a: 'Этот калькулятор определяет число жизненного пути для каждой даты рождения, суммируя все цифры и сводя к однозначному числу (сохраняя Мастер-числа 11 и 22). Затем определяется нумерологическое соотношение между двумя числами.' },
      { q: 'Какие числа жизненного пути наиболее совместимы?', a: 'В целом, 2 и 6 — одна из наиболее совместимых пар. 4 и 8 образуют отличное практическое партнёрство. 3 и 5 разделяют высокую творческую энергию. 1 и 3 сильно вдохновляют друг друга. 7 и 9 разделяют глубокую философскую связь.' },
      { q: 'Какие сочетания чисел жизненного пути наиболее сложны?', a: 'Наиболее сложные пары: 4 и 5 (структура против свободы), 2 и 5 (безопасность против приключений) и 1 и 6 (независимость против обязательств). Эти пары требуют более осознанных усилий.' },
      { q: 'Могут ли люди с Мастер-числами 11 или 22 быть совместимы?', a: 'Да. Люди с Мастер-числами жизненного пути сравниваются по базовой цифре (11 трактуется как 2, 22 как 4) в целях совместимости, поскольку базовые качества схожи.' },
      { q: 'Насколько точна нумерологическая совместимость?', a: 'Нумерологическая совместимость предлагает значимую основу для размышлений, а не абсолютного предсказания. Реальная совместимость зависит от зрелости, общения и взаимных обязательств.' },
      { q: 'Применима ли нумерологическая совместимость к дружбе и рабочим отношениям?', a: 'Да. Та же динамика жизненного пути применима ко всем типам отношений. Сочетание 4–8 может описывать отличное деловое партнёрство; 2–6 — глубокую поддерживающую дружбу.' },
      { q: 'Могут ли противоположные числа жизненного пути быть совместимы?', a: 'Да. Противоположные числа жизненного пути (1 и 9, 2 и 8, 3 и 7 и т.д.) могут сильно притягивать друг друга и обеспечивать то, чего другому не хватает — при условии взаимного уважения.' },
      { q: 'Стоит ли выбирать партнёра на основе нумерологии?', a: 'Нумерология — инструмент для размышлений, а не алгоритм выбора. Качество отношений зависит от общих ценностей, общения и взаимных обязательств значительно больше, чем от оценки совместимости.' },
      { q: 'Что если у обоих людей одинаковое число жизненного пути?', a: 'Одинаковые числа жизненного пути могут быть глубоко естественными — оба человека понимают основные мотивации друг друга. Однако они могут также отражать слепые пятна друг друга.' },
    ],
  },
  uk: {
    description: 'Сумісність у нумерології використовує число шляху життя — найбільш фундаментальне число в нумерології — для оцінки природної динаміки між двома людьми. Число шляху життя кожної людини розраховується з повної дати народження та зводиться до однозначного числа (1–9) або Майстер-числа (11 або 22). Поєднання двох чисел шляху життя розкриває характерні паттерни притяжіння, тертя, зростання та гармонії між двома людьми.\n\nЦей інструмент розраховує обидва шляхи життя та визначає їхню сумісність на основі нумерологічного взаємозв\'язку між двома числами. Оцінка сумісності відображає загальну легкість та глибину зв\'язку. Радше ніж остаточний вердикт, сприймайте результат як детальну карту, що визначає, де енергії двох людей природно поєднуються.',
    faqTitle: 'Поширені запитання про сумісність за нумерологією',
    faqs: [
      { q: 'Що таке нумерологічна сумісність?', a: 'Нумерологічна сумісність використовує числа шляху життя для оцінки природної динаміки, сильних сторін та викликів у стосунках.' },
      { q: 'Як розраховується оцінка сумісності?', a: 'Цей калькулятор визначає число шляху життя для кожної дати народження, підсумовуючи всі цифри та зводячи до однозначного числа (зберігаючи Майстер-числа 11 та 22). Потім визначається нумерологічне співвідношення між двома числами.' },
      { q: 'Які числа шляху життя найбільш сумісні?', a: 'Загалом, 2 і 6 — одна з найбільш сумісних пар. 4 і 8 утворюють відмінне практичне партнерство. 3 і 5 поділяють високу творчу енергію. 1 і 3 сильно надихають одне одного.' },
      { q: 'Які поєднання чисел шляху життя найбільш складні?', a: 'Найбільш складні пари: 4 і 5 (структура проти свободи), 2 і 5 (безпека проти пригод) та 1 і 6 (незалежність проти зобов\'язань).' },
      { q: 'Чи можуть люди з Майстер-числами 11 або 22 бути сумісними?', a: 'Так. Люди з Майстер-числами шляху життя порівнюються за базовою цифрою (11 трактується як 2, 22 як 4) для цілей сумісності.' },
      { q: 'Наскільки точна нумерологічна сумісність?', a: 'Нумерологічна сумісність пропонує значущу основу для роздумів, а не абсолютного прогнозу. Реальна сумісність залежить від зрілості, спілкування та взаємних зобов\'язань.' },
      { q: 'Чи застосовна нумерологічна сумісність до дружби та робочих стосунків?', a: 'Так. Та сама динаміка шляху життя застосовна до всіх типів стосунків. Поєднання 4–8 може описувати відмінне ділове партнерство; 2–6 — глибоку підтримуючу дружбу.' },
      { q: 'Чи можуть протилежні числа шляху життя бути сумісними?', a: 'Так. Протилежні числа шляху життя можуть сильно притягуватися одне до одного та надавати те, чого іншому бракує — за умови взаємної поваги.' },
      { q: 'Чи варто обирати партнера на основі нумерології?', a: 'Нумерологія — інструмент для роздумів, а не алгоритм вибору. Якість стосунків залежить від спільних цінностей, спілкування та взаємних зобов\'язань значно більше, ніж від оцінки сумісності.' },
      { q: 'Що якщо обидві людини мають однакове число шляху життя?', a: 'Однакові числа шляху життя можуть бути глибоко природними — обидва розуміють основні мотивації одне одного. Але вони можуть також відображати сліпі плями одне одного.' },
    ],
  },
  fr: {
    description: 'La compatibilité numérologique utilise le Chemin de Vie — le chiffre le plus fondamental de la numérologie — pour évaluer les dynamiques naturelles entre deux personnes. Le Chemin de Vie de chaque personne est calculé à partir de sa date de naissance complète et réduit à un chiffre unique (1–9) ou un Nombre Maître (11 ou 22). La combinaison des deux Chemins de Vie révèle des schémas caractéristiques d\'attraction, de friction, de croissance et d\'harmonie entre les deux individus.\n\nCet outil calcule les deux Chemins de Vie et évalue leur compatibilité sur la base de la relation numérologique entre les deux chiffres. Le score de compatibilité reflète la facilité et la profondeur globales de la connexion. Considérez le résultat comme une carte nuancée — identifiant où les énergies de deux personnes s\'écoulent naturellement et où la croissance est appelée.',
    faqTitle: 'Questions fréquentes sur la Compatibilité Numérologique',
    faqs: [
      { q: 'Qu\'est-ce que la compatibilité numérologique ?', a: 'La compatibilité numérologique utilise les Chemins de Vie — dérivés des dates de naissance — pour évaluer les dynamiques naturelles, les forces et les défis d\'une relation.' },
      { q: 'Comment le score de compatibilité est-il calculé ?', a: 'Ce calculateur détermine le Chemin de Vie pour chaque date de naissance en additionnant tous les chiffres et en les réduisant à un seul (en préservant les Nombres Maîtres 11 et 22). Il consulte ensuite la relation numérologique établie entre les deux Chemins de Vie.' },
      { q: 'Quels Chemins de Vie sont les plus compatibles ?', a: 'Les combinaisons 2 et 6 sont parmi les plus naturellement compatibles. 4 et 8 forment un excellent partenariat pratique. 3 et 5 partagent une haute énergie créative. 1 et 3 s\'inspirent mutuellement. 7 et 9 partagent un lien philosophique profond.' },
      { q: 'Quelles combinaisons sont les plus difficiles ?', a: 'Les paires les plus difficiles sont 4 et 5 (structure contre liberté), 2 et 5 (sécurité contre aventure) et 1 et 6 (indépendance contre engagement). Ces paires nécessitent plus d\'efforts conscients.' },
      { q: 'Les personnes avec les Nombres Maîtres 11 ou 22 peuvent-elles être compatibles ?', a: 'Oui. Les personnes avec des Chemins de Vie à Nombres Maîtres sont comparées sur la base du chiffre de base (11 traité comme 2, 22 comme 4) à des fins de compatibilité.' },
      { q: 'La compatibilité numérologique est-elle précise ?', a: 'La compatibilité numérologique offre un cadre de réflexion significatif plutôt qu\'une prédiction absolue. La compatibilité réelle dépend de la maturité individuelle, de la communication et de l\'engagement mutuel.' },
      { q: 'La compatibilité numérologique s\'applique-t-elle aux amitiés et aux relations professionnelles ?', a: 'Oui. Les mêmes dynamiques s\'appliquent à tous les types de relations. Une combinaison 4–8 peut décrire un excellent partenariat commercial ; une paire 2–6 peut décrire une amitié profondément soutenante.' },
      { q: 'Des Chemins de Vie opposés peuvent-ils être compatibles ?', a: 'Oui. Les Chemins de Vie opposés peuvent s\'attirer puissamment et chacun apporte ce qui manque à l\'autre — tant que les deux respectent la nature de l\'autre.' },
      { q: 'Faut-il choisir un partenaire en fonction de la numérologie ?', a: 'La numérologie est un outil de réflexion, pas un algorithme de sélection. La qualité d\'une relation dépend bien davantage des valeurs partagées, de la communication et de l\'engagement mutuel que des scores de compatibilité.' },
      { q: 'Et si les deux personnes ont le même Chemin de Vie ?', a: 'Les paires avec le même Chemin de Vie peuvent être profondément naturelles — les deux comprennent les motivations fondamentales de l\'autre. Cependant, elles peuvent aussi refléter les angles morts de l\'autre.' },
    ],
  },
  lt: {
    description: 'Numerologinis suderinamumas naudoja Gyvenimo kelio skaičių — patį fundamentaliausią numerologijos skaičių — natūraliai dinamikai tarp dviejų žmonių įvertinti. Kiekvieno žmogaus Gyvenimo kelias apskaičiuojamas iš visos gimimo datos ir sumažinamas iki vieno skaitmens (1–9) arba Meistro skaičiaus (11 ar 22). Dviejų Gyvenimo kelio skaičių derinys atskleidžia charakteringus patrauklumo, trinties, augimo ir harmonijos modelius tarp dviejų individų.\n\nŠis įrankis apskaičiuoja abu Gyvenimo kelius ir įvertina jų suderinamumą pagal numerologinį ryšį tarp dviejų skaičių. Suderinamumo balas atspindi bendrą ryšio lengvumą ir gylį. Rezultatą supraskite kaip detalų žemėlapį, rodantį, kur dviejų žmonių energijos natūraliai susilieja, o kur reikia augimo.',
    faqTitle: 'Dažnai užduodami klausimai apie numerologinį suderinamumą',
    faqs: [
      { q: 'Kas yra numerologinis suderinamumas?', a: 'Numerologinis suderinamumas naudoja Gyvenimo kelio skaičius — išvestus iš kiekvieno asmens gimimo datos — natūraliai santykių dinamikai, stiprybėms ir iššūkiams įvertinti.' },
      { q: 'Kaip apskaičiuojamas suderinamumo balas?', a: 'Šis skaičiuotuvas nustato Gyvenimo kelio skaičių kiekvienai gimimo datai, sumuodamas visus skaitmenis ir sumažindamas iki vieno skaitmens (išsaugant Meistro skaičius 11 ir 22). Tada peržiūri numerologinį ryšį tarp dviejų Gyvenimo kelio skaičių.' },
      { q: 'Kurie Gyvenimo kelio skaičiai yra labiausiai suderinami?', a: '2 ir 6 yra viena iš natūraliausiai suderinamų porų. 4 ir 8 sudaro puikią praktinę partnerystę. 3 ir 5 dalijasi aukšta kūrybine energija. 1 ir 3 stipriai įkvepia vienas kitą. 7 ir 9 dalijasi gilia filosofine jungtimi.' },
      { q: 'Kurie Gyvenimo kelio deriniai yra sudėtingiausi?', a: 'Sudėtingiausios poros: 4 ir 5 (struktūra prieš laisvę), 2 ir 5 (saugumas prieš nuotykius) ir 1 ir 6 (nepriklausomybė prieš įsipareigojimą).' },
      { q: 'Ar Meistro skaičių 11 ar 22 žmonės gali būti suderinami?', a: 'Taip. Meistro skaičių Gyvenimo kelio žmonės lyginami pagal bazinį skaitmenį (11 traktuojamas kaip 2, 22 kaip 4) suderinamumo tikslais.' },
      { q: 'Ar numerologinis suderinamumas yra tikslus?', a: 'Numerologinis suderinamumas siūlo prasmingą apmąstymų struktūrą, o ne absoliučią prognozę. Tikrasis suderinamumas priklauso nuo brandos, bendravimo ir abipusių įsipareigojimų.' },
      { q: 'Ar numerologinis suderinamumas taikomas draugystėms ir darbiniams santykiams?', a: 'Taip. Ta pati Gyvenimo kelio dinamika taikoma visiems santykių tipams. 4–8 derinys gali apibūdinti puikią verslo partnerystę; 2–6 pora — gilią palaikančią draugystę.' },
      { q: 'Ar priešingi Gyvenimo kelio skaičiai gali būti suderinami?', a: 'Taip. Priešingi Gyvenimo kelio skaičiai gali stipriai traukti vienas kitą ir kiekvienas teikia tai, ko kitam trūksta — kol abu gerbia vienas kito prigimtį.' },
      { q: 'Ar reikėtų rinktis partnerį pagal numerologiją?', a: 'Numerologija yra apmąstymų įrankis, o ne atrankos algoritmas. Santykių kokybė labiau priklauso nuo bendrų vertybių, bendravimo ir abipusių įsipareigojimų nei nuo suderinamumo balų.' },
      { q: 'O jei abu žmonės turi tą patį Gyvenimo kelio skaičių?', a: 'Tos pačios Gyvenimo kelio poros gali būti giliai natūralios — abu supranta vienas kito pagrindinę motyvaciją. Tačiau jie taip pat gali atspindėti vienas kito akląsias dėmes.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/destiny-number', label: 'Destiny Number' },
    { href: '/calculator/personal-year', label: 'Personal Year Number' },
    { href: '/calculator/zodiac-sign', label: 'Zodiac Sign' },
    { href: '/calculator/name-number', label: 'Name Number' },
  ],
  ru: [
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/destiny-number', label: 'Число судьбы' },
    { href: '/calculator/personal-year', label: 'Персональный год' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодиака' },
    { href: '/calculator/name-number', label: 'Число имени' },
  ],
  uk: [
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/destiny-number', label: 'Число долі' },
    { href: '/calculator/personal-year', label: 'Персональний рік' },
    { href: '/calculator/zodiac-sign', label: 'Знак зодіаку' },
    { href: '/calculator/name-number', label: 'Число імені' },
  ],
  fr: [
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/destiny-number', label: 'Nombre de Destinée' },
    { href: '/calculator/personal-year', label: 'Année Personnelle' },
    { href: '/calculator/zodiac-sign', label: 'Signe du Zodiaque' },
    { href: '/calculator/name-number', label: 'Nombre du Prénom' },
  ],
  lt: [
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/destiny-number', label: 'Likimo skaičius' },
    { href: '/calculator/personal-year', label: 'Asmeniniai metai' },
    { href: '/calculator/zodiac-sign', label: 'Zodiako ženklas' },
    { href: '/calculator/name-number', label: 'Vardo skaičius' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/numerology-compatibility', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function NumerologyCompatibilityPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/numerology-compatibility`,
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
        <ToolActions />
        <RelatedTools locale={locale} tools={related} />
        <NumerologyCompatibilityCalculator locale={locale} />
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
