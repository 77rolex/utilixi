import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import WaterIntakeCalculator from './WaterIntakeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' },
    { href: '/calculator/body-fat', label: 'Body Fat Calculator' },
  ],
  ru: [
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
    { href: '/calculator/body-fat', label: 'Калькулятор % жира в теле' },
  ],
  uk: [
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
    { href: '/calculator/body-fat', label: 'Калькулятор % жиру в тілі' },
  ],
  fr: [
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' },
    { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' },
  ],
  lt: [
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
    { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Water Intake Calculator — Daily Hydration Guide',
    description: 'Free daily water intake calculator. Find out how many liters and glasses of water you should drink per day based on your weight, activity level, and climate.',
    h1: 'Water Intake Calculator',
  },
  ru: {
    title: 'Калькулятор нормы воды в день — суточная гидратация',
    description: 'Бесплатный калькулятор нормы воды в день. Узнайте, сколько литров и стаканов воды нужно пить в сутки с учётом веса, активности и климата.',
    h1: 'Норма воды в день',
  },
  uk: {
    title: 'Калькулятор норми води на день — щоденна гідратація',
    description: 'Безкоштовний калькулятор норми води на день. Дізнайтеся, скільки літрів і склянок води потрібно пити на добу з урахуванням ваги, активності та клімату.',
    h1: 'Норма води на день',
  },
  fr: {
    title: 'Calculatrice d\'apport en eau — hydratation quotidienne',
    description: 'Calculatrice gratuite de l\'apport quotidien en eau. Découvrez combien de litres et de verres d\'eau vous devez boire par jour selon votre poids, activité et climat.',
    h1: 'Calculatrice d\'apport en eau',
  },
  lt: {
    title: 'Vandens normos skaičiuotuvas — dienos hidratacija',
    description: 'Nemokamas dienos vandens normos skaičiuotuvas. Sužinokite, kiek litrų ir stiklinių vandens reikia gerti per dieną pagal svorį, aktyvumą ir klimatą.',
    h1: 'Vandens normos skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Staying hydrated is essential for health, energy, and performance. Our water intake calculator uses your body weight as the base (35 ml per kg), then adjusts for your activity level and whether you live in a hot climate. The result shows your daily target in liters, 250 ml glasses, and 8 oz cups.\n\nProper hydration affects virtually every bodily function — from regulating body temperature and lubricating joints to delivering nutrients to cells and supporting kidney function. Even mild dehydration of 1–2% of body weight can impair concentration, mood, and physical endurance. Your individual needs vary based on weight, activity, climate, and health conditions.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How much water should I drink per day?',
        a: 'A common guideline is 35 ml per kilogram of body weight for a sedentary person in a temperate climate. Active people and those in hot weather need significantly more. For a 70 kg person with moderate activity, this is typically around 2.5–3 liters per day.',
      },
      {
        q: 'Does coffee and tea count toward daily water intake?',
        a: 'Yes — all beverages including coffee, tea, juices, and even food moisture count toward your daily fluid intake. However, alcohol has a diuretic effect and should not be counted.',
      },
      {
        q: 'What are signs of dehydration?',
        a: 'Common signs include dark yellow urine, dry mouth, fatigue, dizziness, and headaches. Mild dehydration (1–2% of body weight) can already impair physical and cognitive performance.',
      },
      {
        q: 'Should I drink more when exercising?',
        a: 'Yes. During intense exercise you can lose 0.5–2 liters of fluid per hour through sweat. Drink 400–600 ml before exercise and replace fluids regularly during and after your workout. The activity level selector in this calculator already accounts for this.',
      },
      {
        q: 'Can you drink too much water (overhydration)?',
        a: 'Yes — overhydration (hyponatremia) occurs when excess water dilutes sodium in the blood, causing nausea, headache, confusion, and in severe cases, seizures. This is rare for most people in daily life but can occur in endurance athletes who drink large amounts of plain water without electrolyte replacement. For most healthy adults, the kidneys can process up to 0.8–1 liter per hour.',
      },
      {
        q: 'How does climate and heat affect water needs?',
        a: 'In hot weather or humid climates you can lose 1–2+ extra liters per day through sweat, even without exercise. In extreme heat (>35°C) or during outdoor work/sport, fluid needs can reach 5–8 liters per day. The "hot climate" option in this calculator adds approximately 500 ml to your base recommendation. High altitude also increases fluid losses through faster breathing.',
      },
      {
        q: 'Does age affect how much water I need?',
        a: 'Yes. Older adults are at higher risk of dehydration because the sense of thirst diminishes with age, and kidneys become less efficient at concentrating urine. People over 65 should consciously drink on a schedule rather than waiting for thirst. Children have higher water needs relative to body weight than adults. Pregnant and breastfeeding women need an additional 0.3–0.7 liters per day.',
      },
      {
        q: 'What are tips for tracking daily water intake?',
        a: 'Use a marked reusable water bottle (500 ml or 1 liter) and set a goal to refill it a specific number of times. Set hourly reminders on your phone. Drink a glass of water with every meal and before bed. Eat hydrating foods — cucumber, watermelon, celery, and soups contribute 20–30% of daily fluid intake. Check urine colour: pale yellow (like lemonade) means adequate hydration; dark yellow means drink more.',
      },
      {
        q: 'Is sparkling water as hydrating as still water?',
        a: 'Yes — carbonated (sparkling) water hydrates just as effectively as still water. The CO₂ does not significantly affect fluid absorption. However, flavoured sparkling waters may contain added acids or sweeteners. For dental health, limit sipping acidic beverages throughout the day and prefer still water for most of your intake.',
      },
      {
        q: 'Does drinking more water help with weight loss?',
        a: 'Water can support weight loss in several ways: drinking 500 ml before meals reduces hunger and caloric intake by 13–22% in studies; water replaces high-calorie beverages; and adequate hydration supports metabolism and exercise performance. Some studies show that cold water may slightly increase metabolism as the body warms it, but the effect is small. Water itself has zero calories.',
      },
    ],
  },
  ru: {
    description: 'Правильная гидратация необходима для здоровья, энергии и работоспособности. Калькулятор использует вес тела как базу (35 мл на кг), затем корректирует норму с учётом уровня активности и климата. Результат отображается в литрах, стаканах по 250 мл и чашках.\n\nГидратация влияет практически на все функции организма: регуляцию температуры тела, смазку суставов, транспорт питательных веществ к клеткам и работу почек. Даже лёгкое обезвоживание (1–2% массы тела) снижает концентрацию, настроение и физическую выносливость. Индивидуальные потребности зависят от веса, активности, климата и состояния здоровья.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Сколько воды нужно пить в день?',
        a: 'Общая рекомендация — 35 мл на кг веса тела для малоподвижного человека в умеренном климате. Активным людям и тем, кто живёт в жарком климате, нужно значительно больше. Для человека весом 70 кг с умеренной активностью это обычно около 2,5–3 литров в день.',
      },
      {
        q: 'Учитываются ли кофе и чай в суточной норме?',
        a: 'Да — все напитки, включая кофе, чай, соки и даже жидкость из еды, засчитываются в суточное потребление жидкости. Однако алкоголь имеет мочегонный эффект и не должен учитываться.',
      },
      {
        q: 'Каковы признаки обезвоживания?',
        a: 'Тёмно-жёлтая моча, сухость во рту, усталость, головокружение и головная боль. Даже лёгкое обезвоживание (1–2% массы тела) может снизить физическую и умственную работоспособность.',
      },
      {
        q: 'Нужно ли пить больше воды во время тренировок?',
        a: 'Да. При интенсивных тренировках можно терять 0,5–2 литра жидкости в час с потом. Выпивайте 400–600 мл перед тренировкой и восполняйте жидкость во время и после. Уровень активности в калькуляторе уже учитывает это.',
      },
      {
        q: 'Можно ли выпить слишком много воды (гипергидратация)?',
        a: 'Да — гипонатриемия возникает, когда избыток воды разводит натрий в крови, вызывая тошноту, головную боль, спутанность сознания, а в тяжёлых случаях — судороги. Для большинства людей это редкость в обычной жизни, но риск есть у спортсменов на выносливость, пьющих большое количество воды без электролитов. Почки здорового взрослого могут переработать до 0,8–1 литра в час.',
      },
      {
        q: 'Как жаркий климат влияет на потребность в воде?',
        a: 'В жарком климате можно терять 1–2+ дополнительных литра в день через пот даже без нагрузки. В сильную жару (>35°C) потребность в жидкости может достигать 5–8 литров в день. Опция «жаркий климат» в калькуляторе добавляет примерно 500 мл к базовой норме. Высокогорье также увеличивает потери жидкости из-за учащённого дыхания.',
      },
      {
        q: 'Влияет ли возраст на потребность в воде?',
        a: 'Да. Пожилые люди чаще страдают от обезвоживания, потому что с возрастом чувство жажды снижается, а почки хуже концентрируют мочу. Людям старше 65 лет следует пить по расписанию, не дожидаясь жажды. Беременным и кормящим женщинам нужно дополнительно 0,3–0,7 литра в день.',
      },
      {
        q: 'Как отслеживать суточное потребление воды?',
        a: 'Используйте маркированную бутылку (500 мл или 1 литр) и ставьте цель пополнять её определённое число раз. Настройте почасовые напоминания. Пейте по стакану воды с каждым приёмом пищи и перед сном. Ешьте продукты с высоким содержанием воды — огурцы, арбуз, сельдерей, супы (20–30% суточной нормы). Контролируйте цвет мочи: бледно-жёлтый (как лимонад) — хорошая гидратация, тёмно-жёлтый — нужно пить больше.',
      },
      {
        q: 'Газированная вода так же увлажняет, как и обычная?',
        a: 'Да — газированная вода увлажняет не хуже обычной. CO₂ не влияет существенно на всасывание жидкости. Однако ароматизированные газировки могут содержать кислоты или подсластители. Для здоровья зубов не стоит часто пить кислые напитки — большую часть жидкости лучше получать из обычной воды.',
      },
      {
        q: 'Помогает ли питьё воды похудеть?',
        a: 'Вода поддерживает похудение несколькими путями: 500 мл перед едой снижают чувство голода и потребление калорий на 13–22% (по данным исследований); вода заменяет калорийные напитки; адекватная гидратация поддерживает обмен веществ и физическую работоспособность. Сама по себе вода не содержит калорий.',
      },
    ],
  },
  uk: {
    description: 'Правильна гідратація необхідна для здоров\'я, енергії та працездатності. Калькулятор використовує вагу тіла як базу (35 мл на кг), потім коригує норму з урахуванням рівня активності та клімату. Результат відображається в літрах, склянках по 250 мл та чашках.\n\nГідратація впливає практично на всі функції організму: регуляцію температури тіла, змащення суглобів, транспорт поживних речовин до клітин і роботу нирок. Навіть легке зневоднення (1–2% маси тіла) знижує концентрацію, настрій та фізичну витривалість. Індивідуальні потреби залежать від ваги, активності, клімату та стану здоров\'я.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Скільки води потрібно пити на день?',
        a: 'Загальна рекомендація — 35 мл на кг ваги тіла для малорухливої людини в помірному кліматі. Активним людям і тим, хто живе в жаркому кліматі, потрібно значно більше. Для людини вагою 70 кг із помірною активністю це зазвичай близько 2,5–3 літрів на день.',
      },
      {
        q: 'Чи враховуються кава та чай у добовій нормі?',
        a: 'Так — всі напої, включаючи каву, чай, соки та навіть рідину з їжі, зараховуються у добове споживання рідини. Однак алкоголь має сечогінний ефект і не повинен враховуватися.',
      },
      {
        q: 'Які ознаки зневоднення?',
        a: 'Темно-жовта сеча, сухість у роті, втома, запаморочення та головний біль. Навіть легке зневоднення (1–2% маси тіла) може знизити фізичну та розумову працездатність.',
      },
      {
        q: 'Чи потрібно пити більше води під час тренувань?',
        a: 'Так. При інтенсивних тренуваннях можна втрачати 0,5–2 літри рідини на годину з потом. Випивайте 400–600 мл перед тренуванням і поповнюйте рідину під час та після. Рівень активності в калькуляторі вже враховує це.',
      },
      {
        q: 'Чи можна випити надто багато води (гіпергідратація)?',
        a: 'Так — гіпонатріємія виникає, коли надлишок води розводить натрій у крові, спричиняючи нудоту, головний біль, сплутаність свідомості та (у важких випадках) судоми. Для більшості людей це рідкість, але ризик є у спортсменів на витривалість, які п\'ють велику кількість води без електролітів. Нирки здорового дорослого можуть переробити до 0,8–1 літра на годину.',
      },
      {
        q: 'Як спекотний клімат впливає на потребу у воді?',
        a: 'У спекотному кліматі можна втрачати 1–2+ додаткових літри на день через піт навіть без навантаження. У сильну спеку (>35°C) потреба в рідині може досягати 5–8 літрів на день. Опція «спекотний клімат» у калькуляторі додає приблизно 500 мл до базової норми.',
      },
      {
        q: 'Чи впливає вік на потребу у воді?',
        a: 'Так. Люди похилого віку частіше страждають від зневоднення, оскільки з віком відчуття спраги знижується, а нирки гірше концентрують сечу. Людям старше 65 років слід пити за розкладом, не чекаючи спраги. Вагітним і годуючим жінкам потрібно додатково 0,3–0,7 літра на день.',
      },
      {
        q: 'Як відстежувати добове споживання води?',
        a: 'Використовуйте марковану пляшку (500 мл або 1 літр) і ставте ціль поповнювати її певну кількість разів. Встановіть погодинні нагадування. Пийте по склянці води з кожним прийомом їжі і перед сном. Їжте продукти з високим вмістом води — огірки, кавун, селера, супи (20–30% добової норми). Контролюйте колір сечі: блідо-жовтий — хороша гідратація, темно-жовтий — потрібно пити більше.',
      },
      {
        q: 'Газована вода так само зволожує, як і звичайна?',
        a: 'Так — газована вода зволожує не гірше звичайної. CO₂ суттєво не впливає на всмоктування рідини. Однак ароматизовані газовані напої можуть містити кислоти або підсолоджувачі. Для здоров\'я зубів не варто часто пити кислі напої — більшу частину рідини краще отримувати зі звичайної води.',
      },
      {
        q: 'Чи допомагає вживання води схуднути?',
        a: 'Вода підтримує схуднення кількома шляхами: 500 мл перед їжею знижують відчуття голоду та споживання калорій на 13–22% (за даними досліджень); вода замінює калорійні напої; адекватна гідратація підтримує обмін речовин і фізичну працездатність. Сама по собі вода не містить калорій.',
      },
    ],
  },
  fr: {
    description: 'Une bonne hydratation est essentielle pour la santé, l\'énergie et les performances. Notre calculatrice utilise votre poids corporel comme base (35 ml par kg), puis ajuste selon votre niveau d\'activité et le climat. Le résultat s\'affiche en litres, verres de 250 ml et tasses.\n\nL\'hydratation affecte pratiquement toutes les fonctions corporelles : régulation de la température, lubrification des articulations, transport des nutriments et fonctionnement des reins. Même une légère déshydratation (1–2% du poids corporel) peut altérer la concentration, l\'humeur et l\'endurance physique. Les besoins individuels varient selon le poids, l\'activité, le climat et l\'état de santé.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Combien d\'eau doit-on boire par jour ?',
        a: 'La recommandation générale est de 35 ml par kilogramme de poids corporel pour une personne sédentaire en climat tempéré. Les personnes actives et celles vivant en climat chaud ont besoin de beaucoup plus. Pour une personne de 70 kg avec une activité modérée, cela représente environ 2,5 à 3 litres par jour.',
      },
      {
        q: 'Le café et le thé comptent-ils dans l\'apport quotidien ?',
        a: 'Oui — toutes les boissons, y compris le café, le thé, les jus et même l\'humidité des aliments, sont comptabilisées. Cependant, l\'alcool a un effet diurétique et ne doit pas être inclus.',
      },
      {
        q: 'Quels sont les signes de déshydratation ?',
        a: 'Urine jaune foncé, bouche sèche, fatigue, vertiges et maux de tête. Une légère déshydratation (1–2% du poids corporel) peut déjà altérer les performances physiques et cognitives.',
      },
      {
        q: 'Faut-il boire plus pendant l\'exercice ?',
        a: 'Oui. Lors d\'un exercice intense, vous pouvez perdre 0,5 à 2 litres de liquide par heure par la transpiration. Buvez 400–600 ml avant l\'exercice et remplacez les fluides pendant et après l\'entraînement. Le sélecteur de niveau d\'activité tient déjà compte de cela.',
      },
      {
        q: 'Peut-on boire trop d\'eau (surhydratation) ?',
        a: 'Oui — l\'hyponatrémie survient quand l\'excès d\'eau dilue le sodium sanguin, provoquant nausées, maux de tête, confusion et dans les cas graves, des convulsions. C\'est rare en vie quotidienne, mais possible chez les sportifs d\'endurance qui boivent de grandes quantités d\'eau sans électrolytes. Les reins d\'un adulte sain peuvent traiter jusqu\'à 0,8–1 litre par heure.',
      },
      {
        q: 'Comment le climat chaud affecte-t-il les besoins en eau ?',
        a: 'Par temps chaud ou en climat humide, vous pouvez perdre 1 à 2 litres supplémentaires par jour par la transpiration, même sans exercice. En chaleur extrême (>35°C), les besoins peuvent atteindre 5 à 8 litres par jour. L\'option « climat chaud » de cette calculatrice ajoute environ 500 ml à la recommandation de base.',
      },
      {
        q: 'L\'âge affecte-t-il les besoins en eau ?',
        a: 'Oui. Les personnes âgées sont plus à risque de déshydratation car la sensation de soif diminue avec l\'âge et les reins deviennent moins efficaces. Les personnes de plus de 65 ans devraient boire selon un horaire sans attendre la soif. Les femmes enceintes et allaitantes ont besoin de 0,3 à 0,7 litre supplémentaire par jour.',
      },
      {
        q: 'Conseils pour suivre sa consommation d\'eau au quotidien ?',
        a: 'Utilisez une bouteille réutilisable graduée (500 ml ou 1 litre) et fixez-vous un objectif de recharges. Programmez des rappels toutes les heures. Buvez un verre d\'eau à chaque repas et avant le coucher. Mangez des aliments hydratants (concombre, pastèque, céleri, soupes) qui apportent 20–30% de l\'apport quotidien. Surveillez la couleur des urines : jaune pâle (limonade) = bonne hydratation ; jaune foncé = buvez davantage.',
      },
      {
        q: 'L\'eau gazeuse hydrate-t-elle autant que l\'eau plate ?',
        a: 'Oui — l\'eau gazeuse hydrate aussi efficacement que l\'eau plate. Le CO₂ n\'affecte pas significativement l\'absorption des liquides. Cependant, les eaux aromatisées peuvent contenir des acides ou des édulcorants. Pour la santé dentaire, préférez l\'eau plate pour la majorité de vos apports.',
      },
      {
        q: 'Boire plus d\'eau aide-t-il à perdre du poids ?',
        a: 'L\'eau peut soutenir la perte de poids : boire 500 ml avant les repas réduit la faim et l\'apport calorique de 13–22% selon des études ; l\'eau remplace les boissons caloriques ; une bonne hydratation soutient le métabolisme et les performances sportives. L\'eau elle-même ne contient aucune calorie.',
      },
    ],
  },
  lt: {
    description: 'Tinkama hidratacija yra būtina sveikatai, energijai ir darbingumui. Mūsų skaičiuotuvas naudoja kūno svorį kaip pagrindą (35 ml vienam kg), tada koreguoja pagal aktyvumo lygį ir klimatą. Rezultatas rodomas litrais, 250 ml stiklinėmis ir puodeliais.\n\nHidratacija veikia beveik visas kūno funkcijas: kūno temperatūros reguliavimą, sąnarių tepimą, maistinių medžiagų gabenimą į ląsteles ir inkstų veiklą. Net nedidelis dehidratacijos lygis (1–2% kūno svorio) gali sumažinti koncentraciją, nuotaiką ir fizinę ištvermę. Individualūs poreikiai skiriasi priklausomai nuo svorio, aktyvumo, klimato ir sveikatos būklės.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kiek vandens reikia gerti per dieną?',
        a: 'Bendras rekomenduojamas kiekis yra 35 ml vienam kilogramui kūno svorio sėsliems žmonėms vidutinio klimato sąlygomis. Aktyviems žmonėms ir gyvenantiems karštame klimate reikia žymiai daugiau. 70 kg sveriantiems žmonėms su vidutinio aktyvumo fizine veikla paprastai reikia apie 2,5–3 litrai per dieną.',
      },
      {
        q: 'Ar kava ir arbata įskaičiuojama į dienos normą?',
        a: 'Taip — visos gėrimų rūšys, įskaitant kavą, arbatą, sultis ir net maisto drėgmę, įskaičiuojamos į dienos skysčių normą. Tačiau alkoholis turi diuretinį poveikį ir neturėtų būti skaičiuojamas.',
      },
      {
        q: 'Kokie dehidratacijos požymiai?',
        a: 'Tamsiai geltonas šlapimas, sausa burna, nuovargis, galvos svaigimas ir galvos skausmas. Net lengva dehidratacija (1–2% kūno svorio) gali pabloginti fizines ir kognityvines funkcijas.',
      },
      {
        q: 'Ar reikia gerti daugiau vandens fizinių pratimų metu?',
        a: 'Taip. Intensyvių pratimų metu galite prarasti 0,5–2 litrus skysčių per valandą per prakaitą. Išgerkite 400–600 ml prieš treniruotę ir reguliariai papildykite skysčius jos metu ir po. Aktyvumo lygio parinkiklis šiame skaičiuotuve jau tai atsižvelgia.',
      },
      {
        q: 'Ar galima išgerti per daug vandens (hiperhidratacija)?',
        a: 'Taip — hiponatremija įvyksta, kai vandens perteklius atskiedžia natrio kiekį kraujyje, sukeldamas pykinimą, galvos skausmą, sąmonės drumstimą ir sunkiais atvejais — traukulius. Tai reta kasdieniniame gyvenime, tačiau galima ištvermės sporto atstovams, geriantiems daug vandens be elektrolitų. Sveiko suaugusiojo inkstai gali apdoroti iki 0,8–1 litro per valandą.',
      },
      {
        q: 'Kaip karštas klimatas veikia vandens poreikį?',
        a: 'Karštame klimate ar didelėje drėgmėje galite prarasti 1–2+ papildomus litrus per dieną prakaitaudami net be fizinio krūvio. Esant stipriai kaitriai (>35°C), skysčių poreikis gali siekti 5–8 litrus per dieną. „Karšto klimato" parinktis šiame skaičiuotuve prideda apie 500 ml prie bazinės normos.',
      },
      {
        q: 'Ar amžius veikia vandens poreikį?',
        a: 'Taip. Vyresnio amžiaus žmonės dažniau kenčia nuo dehidratacijos, nes su amžiumi troškulio jausmas mažėja, o inkstai tampa mažiau efektyvūs. Vyresni nei 65 metų žmonės turėtų gerti pagal tvarkaraštį, nelaukdami troškulio. Nėščiosioms ir žindančioms moterims reikia papildomai 0,3–0,7 litro per dieną.',
      },
      {
        q: 'Kaip stebėti dienos vandens suvartojimą?',
        a: 'Naudokite pažymėtą daugkartinį buteliuką (500 ml arba 1 litrą) ir nustatykite tikslą jį papildyti tam tikrą kartų skaičių. Nustatykite kas valandą primenančius signalus. Gerkite stiklinę vandens prie kiekvieno valgio ir prieš miegą. Valgykite drėgnų maisto produktų — agurkus, arbūzą, salierus, sriubas (20–30% dienos normos). Tikrinkite šlapimo spalvą: šviesiai geltonas = gera hidratacija; tamsiai geltonas = gerkite daugiau.',
      },
      {
        q: 'Ar gazuotas vanduo hidratuoja taip pat kaip paprastas?',
        a: 'Taip — gazuotas vanduo hidratuoja taip pat efektyviai kaip paprastas. CO₂ reikšmingai neveikia skysčių įsisavinimo. Tačiau aromatizuoti gazuoti gėrimai gali turėti rūgščių ar saldiklių. Dantų sveikatos labui daugumą skysčių geriau gauti iš paprastų vandens.',
      },
      {
        q: 'Ar gerti daugiau vandens padeda numesti svorio?',
        a: 'Vanduo gali padėti numesti svorio keliais būdais: 500 ml prieš valgį mažina alkį ir kalorijų vartojimą 13–22% (tyrimų duomenimis); vanduo pakeičia kaloringus gėrimus; tinkama hidratacija palaiko medžiagų apykaitą ir fizinį pajėgumą. Pats vanduo neturi jokių kalorijų.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/water-intake'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function WaterIntakePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/water-intake`,
    applicationCategory: 'HealthApplication',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <WaterIntakeCalculator locale={locale} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}

          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((item, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{item.q}</h3>
                  <p className={styles.faq__answer}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
