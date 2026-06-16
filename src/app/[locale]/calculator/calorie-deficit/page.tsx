import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CalorieDeficitCalculator from './CalorieDeficitCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' },
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' },
    { href: '/calculator/water-intake', label: 'Water Intake Calculator' },
    { href: '/calculator/body-fat', label: 'Body Fat Calculator' },
  ],
  ru: [
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' },
    { href: '/calculator/water-intake', label: 'Норма воды в день' },
    { href: '/calculator/body-fat', label: 'Калькулятор жира' },
  ],
  uk: [
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' },
    { href: '/calculator/water-intake', label: 'Норма води на день' },
    { href: '/calculator/body-fat', label: 'Калькулятор жиру' },
  ],
  fr: [
    { href: '/calculator/calories', label: 'Calculatrice de Calories (TDEE)' },
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/ideal-weight', label: 'Poids Idéal' },
    { href: '/calculator/water-intake', label: 'Apport en Eau Quotidien' },
    { href: '/calculator/body-fat', label: 'Calculatrice Graisse Corporelle' },
  ],
  lt: [
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' },
    { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' },
    { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Calorie Deficit Calculator — Weight Loss Plan',
    description: 'Free calorie deficit calculator. Find out how many calories per day you need to cut to lose weight in your target timeframe. Supports kg and lbs. Includes safety indicator.',
    h1: 'Calorie Deficit Calculator',
    subtitle: 'Find out how many calories to cut per day to reach your weight goal safely and sustainably.',
  },
  ru: {
    title: 'Калькулятор дефицита калорий — план похудения',
    description: 'Бесплатный калькулятор дефицита калорий. Узнайте, сколько калорий в день нужно сократить, чтобы похудеть в нужные сроки. Поддерживает кг и фунты. Индикатор безопасности.',
    h1: 'Калькулятор дефицита калорий',
    subtitle: 'Узнайте, сколько калорий сократить в день, чтобы безопасно достичь целевого веса.',
  },
  uk: {
    title: 'Калькулятор дефіциту калорій — план схуднення',
    description: 'Безкоштовний калькулятор дефіциту калорій. Дізнайтеся, скільки калорій на день потрібно скорочувати, щоб схуднути за потрібний час. Підтримує кг і фунти. Індикатор безпеки.',
    h1: 'Калькулятор дефіциту калорій',
    subtitle: 'Дізнайтеся, скільки калорій скоротити на день, щоб безпечно досягти цільової ваги.',
  },
  fr: {
    title: 'Calculatrice Déficit Calorique — Plan Perte de Poids',
    description: 'Calculatrice de déficit calorique gratuite. Trouvez combien de calories par jour vous devez réduire pour perdre du poids dans les délais souhaités. Supporte kg et lbs. Indicateur de sécurité.',
    h1: 'Calculatrice Déficit Calorique',
    subtitle: 'Calculez combien de calories réduire par jour pour atteindre votre objectif de poids en toute sécurité.',
  },
  lt: {
    title: 'Kalorijų Deficito Skaičiuotuvas — Svorio Metimo Planas',
    description: 'Nemokamas kalorijų deficito skaičiuotuvas. Sužinokite, kiek kalorijų per dieną reikia sumažinti, kad pasiektumėte norimą svorį per nustatytą laiką. Palaikomi kg ir svarai. Saugos indikatorius.',
    h1: 'Kalorijų Deficito Skaičiuotuvas',
    subtitle: 'Sužinokite, kiek kalorijų mažinti per dieną, kad saugiai pasiektumėte svorio tikslą.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our calorie deficit calculator helps you understand exactly how many calories per day you need to reduce to reach your goal weight within a specific timeframe. Enter your current weight, target weight, and the number of weeks you want to achieve this in. The calculator uses the established rule that 1 kg of body fat equals approximately 7,700 kilocalories (3,500 kcal per pound), and divides your total required deficit over the chosen period to give you a daily target.\n\nA calorie deficit is the foundation of weight loss — consuming fewer calories than your body expends forces it to use stored fat for energy. However, the size of the deficit matters greatly for safety and sustainability. A moderate deficit of 300–500 kcal/day leads to gradual, sustainable fat loss of 0.3–0.5 kg per week, which most health organisations recommend as the safe and effective rate. Deficits above 750–1,000 kcal/day may cause muscle loss, nutritional deficiencies, fatigue, and metabolic adaptation, so always consult a healthcare professional if your calculated deficit exceeds safe limits.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a calorie deficit?', a: 'A calorie deficit occurs when you consume fewer calories than your body burns in a day. Your body then uses stored energy (primarily fat) to make up the difference, leading to weight loss over time. A deficit of 3,500 kcal roughly corresponds to losing 0.45 kg (1 lb) of fat.' },
      { q: 'How many calories equal 1 kg of body fat?', a: 'One kilogram of body fat contains approximately 7,700 kilocalories of stored energy. This is why losing 1 kg of fat requires a cumulative deficit of ~7,700 kcal. In imperial units, 1 pound of fat ≈ 3,500 kcal.' },
      { q: 'What is a safe calorie deficit for weight loss?', a: 'Most health authorities recommend a deficit of 500–750 kcal/day as safe for most healthy adults, leading to 0.5–0.75 kg per week of fat loss. Deficits over 1,000 kcal/day are generally considered aggressive and should only be undertaken under medical supervision.' },
      { q: 'How quickly can I safely lose weight?', a: 'The NHS, WHO, and most dietitians recommend a safe rate of 0.5–1 kg (1–2 lbs) per week. This rate preserves muscle mass, avoids nutritional deficiencies, and is much more likely to result in permanent weight loss versus rapid crash diets that lead to weight regain.' },
      { q: 'What is TDEE and how does it relate to a calorie deficit?', a: 'TDEE (Total Daily Energy Expenditure) is the total calories your body burns in a day, including exercise and daily activities. Your calorie deficit is relative to your TDEE. If your TDEE is 2,500 kcal and you eat 2,000 kcal, your deficit is 500 kcal/day.' },
      { q: 'Should I count macros or just calories?', a: 'For weight loss, total calories are the primary factor (calories in vs. calories out). However, macronutrient balance significantly affects how you feel and whether you lose fat vs. muscle. High protein intake (1.6–2.2 g/kg body weight) during a calorie deficit helps preserve muscle mass and increases satiety.' },
      { q: 'Does exercise create a calorie deficit?', a: 'Yes — exercise increases your TDEE, making it easier to create a deficit without cutting food dramatically. A 30-minute run burns 250–400 kcal depending on weight and intensity. Combining moderate diet reduction with regular exercise is the most sustainable weight loss strategy.' },
      { q: 'Why do I stop losing weight even in a deficit?', a: 'This is called a weight loss plateau. Your body adapts to a lower calorie intake by reducing metabolic rate (adaptive thermogenesis). After 4–8 weeks, your TDEE may be lower than when you started. Solutions: take a diet break at maintenance calories for 1–2 weeks, re-calculate TDEE, or increase exercise.' },
      { q: 'Can I gain weight while in a calorie deficit?', a: 'True fat gain is impossible in a consistent calorie deficit. However, weight on the scale can temporarily increase due to water retention (especially with high salt, carb refeeds, or during menstrual cycle), muscle gain (rare but possible for beginners), or increased gut content. Trust long-term trends over daily fluctuations.' },
      { q: 'What is the difference between a calorie deficit for cutting vs. crash dieting?', a: 'Cutting (bodybuilding term) means a moderate, sustained deficit of 300–500 kcal/day, designed to maximise fat loss while preserving muscle. Crash dieting involves severe restriction (800–1,200 kcal/day total), which causes rapid initial weight loss but includes muscle loss, nutrient deficiencies, and almost always leads to weight regain.' },
      { q: 'Does the type of food affect weight loss in a deficit?', a: 'For fat loss, total calorie balance is paramount. However, food quality affects satiety, muscle preservation, and health. High-volume, high-fibre, high-protein foods (vegetables, lean meats, legumes) make it much easier to maintain a deficit without constant hunger, compared to calorie-dense processed foods.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор дефицита калорий помогает точно рассчитать, сколько калорий в день нужно сократить, чтобы достичь целевого веса за желаемое время. Введите текущий вес, целевой вес и количество недель — калькулятор использует правило, что 1 кг жира ≈ 7700 ккал, и распределяет общий дефицит по дням, давая ежедневный ориентир.\n\nДефицит калорий — основа похудения: потребляя меньше, чем тратит организм, вы вынуждаете его использовать жировые запасы. Умеренный дефицит в 300–500 ккал/день обеспечивает постепенную потерю веса 0,3–0,5 кг/нед — именно этот темп большинство организаций здравоохранения признают безопасным. Дефицит свыше 750–1000 ккал/день может привести к потере мышечной массы, дефициту питательных веществ и замедлению метаболизма.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое дефицит калорий?', a: 'Дефицит калорий — это ситуация, когда вы потребляете меньше калорий, чем тратит ваш организм. В ответ тело использует запасённую энергию (преимущественно жир). Дефицит в 7700 ккал соответствует потере примерно 1 кг жировой ткани.' },
      { q: 'Сколько калорий в 1 кг жира?', a: 'В 1 кг жировой ткани содержится около 7700 ккал. Именно столько нужно сжечь, чтобы потерять 1 кг жира. В имперской системе: 1 фунт жира ≈ 3500 ккал.' },
      { q: 'Какой дефицит калорий безопасен?', a: 'Большинство организаций здравоохранения рекомендуют дефицит 300–500 ккал/день, что даёт 0,3–0,5 кг потери веса в неделю. Дефицит свыше 750–1000 ккал/день считается агрессивным и рекомендуется только под наблюдением врача.' },
      { q: 'Как быстро можно безопасно похудеть?', a: 'Безопасный темп — 0,5–1 кг в неделю. Более быстрое похудение сопровождается потерей мышечной массы, дефицитом питательных веществ и почти всегда заканчивается возвратом веса.' },
      { q: 'Что такое TDEE?', a: 'TDEE (Total Daily Energy Expenditure) — суточный расход энергии с учётом всей активности. Дефицит калорий — это разница между TDEE и количеством съеденных калорий. Если TDEE = 2500 ккал, а вы съедаете 2000 ккал, дефицит = 500 ккал/день.' },
      { q: 'Нужно ли считать БЖУ или только калории?', a: 'Для похудения главное — общий баланс калорий. Однако достаточное количество белка (1,6–2,2 г/кг веса) при дефиците помогает сохранить мышечную массу и усиливает чувство сытости.' },
      { q: 'Создаёт ли физическая активность дефицит?', a: 'Да. Тренировки увеличивают TDEE, облегчая создание дефицита без жёсткого ограничения питания. Пробежка 30 мин сжигает 250–400 ккал. Сочетание умеренного дефицита с регулярными тренировками — наиболее устойчивая стратегия.' },
      { q: 'Почему вес перестаёт снижаться при дефиците?', a: 'Это плато. Организм адаптируется к меньшему потреблению, снижая скорость обмена веществ. Решения: временно вернуться к калориям поддержания на 1–2 недели (diet break), пересчитать TDEE или усилить тренировки.' },
      { q: 'Можно ли набрать вес при дефиците?', a: 'Набрать жир при стабильном дефиците невозможно. Но вес на весах может временно расти из-за задержки воды (соль, углеводы, цикл) или увеличения мышечной массы у новичков. Ориентируйтесь на долгосрочную тенденцию.' },
      { q: 'Чем отличается сушка от жёсткой диеты?', a: 'Сушка (бодибилдинг) — умеренный дефицит 300–500 ккал/день с высоким потреблением белка для сохранения мышц. Жёсткая диета — суровое ограничение до 800–1200 ккал/день, приводящее к потере мышц и возврату веса.' },
      { q: 'Влияет ли состав питания на похудение?', a: 'Для потери жира ключевой фактор — баланс калорий. Однако качество пищи влияет на чувство сытости и сохранение мышц. Высокобелковые, высококлетчаточные продукты (мясо, бобовые, овощи) облегчают поддержание дефицита без постоянного голода.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор дефіциту калорій допомагає точно розрахувати, скільки калорій на день потрібно скорочувати, щоб досягти цільової ваги за бажаний час. Введіть поточну вагу, цільову вагу і кількість тижнів — калькулятор використовує правило, що 1 кг жиру ≈ 7700 ккал, і розподіляє загальний дефіцит по днях, даючи щоденний орієнтир.\n\nДефіцит калорій — основа схуднення: споживаючи менше, ніж витрачає організм, ви змушуєте його використовувати жирові запаси. Помірний дефіцит 300–500 ккал/день забезпечує поступову втрату ваги 0,3–0,5 кг/тиж — саме такий темп більшість організацій охорони здоров\'я визнають безпечним. Дефіцит понад 750–1000 ккал/день може призвести до втрати м\'язової маси, дефіциту поживних речовин і сповільнення метаболізму.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке дефіцит калорій?', a: 'Дефіцит калорій — це ситуація, коли ви споживаєте менше калорій, ніж витрачає організм. У відповідь тіло використовує запасену енергію (переважно жир). Дефіцит у 7700 ккал відповідає втраті приблизно 1 кг жирової тканини.' },
      { q: 'Скільки калорій у 1 кг жиру?', a: 'В 1 кг жирової тканини міститься близько 7700 ккал. Саме стільки потрібно спалити для втрати 1 кг жиру. В імперській системі: 1 фунт жиру ≈ 3500 ккал.' },
      { q: 'Який дефіцит калорій є безпечним?', a: 'Більшість організацій охорони здоров\'я рекомендують дефіцит 300–500 ккал/день, що дає 0,3–0,5 кг втрати ваги на тиждень. Дефіцит понад 750–1000 ккал/день вважається агресивним і рекомендується лише під наглядом лікаря.' },
      { q: 'Як швидко можна безпечно схуднути?', a: 'Безпечний темп — 0,5–1 кг на тиждень. Швидше схуднення супроводжується втратою м\'язової маси, дефіцитом поживних речовин і майже завжди закінчується поверненням ваги.' },
      { q: 'Що таке TDEE?', a: 'TDEE (Total Daily Energy Expenditure) — добовий розхід енергії з урахуванням усієї активності. Якщо TDEE = 2500 ккал, а ви споживаєте 2000 ккал, дефіцит = 500 ккал/день.' },
      { q: 'Чи потрібно рахувати БЖВ чи лише калорії?', a: 'Для схуднення головне — загальний баланс калорій. Однак достатня кількість білка (1,6–2,2 г/кг ваги) при дефіциті допомагає зберегти м\'язову масу і посилює відчуття ситості.' },
      { q: 'Чи створює фізична активність дефіцит?', a: 'Так. Тренування збільшують TDEE, полегшуючи створення дефіциту без жорсткого обмеження харчування. Пробіжка 30 хв спалює 250–400 ккал. Поєднання помірного дефіциту з регулярними тренуваннями — найстійкіша стратегія.' },
      { q: 'Чому вага перестає знижуватися при дефіциті?', a: 'Це плато. Організм адаптується до меншого споживання, знижуючи швидкість обміну речовин. Рішення: тимчасово повернутися до калорій підтримки на 1–2 тижні (diet break), перерахувати TDEE або посилити тренування.' },
      { q: 'Чи можна набрати вагу при дефіциті?', a: 'Набрати жир при стабільному дефіциті неможливо. Але вага на вагах може тимчасово зростати через затримку води (сіль, вуглеводи, цикл) або збільшення м\'язової маси у початківців. Орієнтуйтеся на довгострокову тенденцію.' },
      { q: 'Чим відрізняється сушіння від жорсткої дієти?', a: 'Сушіння (бодібілдинг) — помірний дефіцит 300–500 ккал/день з великою кількістю білка для збереження м\'язів. Жорстка дієта — суворе обмеження до 800–1200 ккал/день, що призводить до втрати м\'язів і повернення ваги.' },
      { q: 'Чи впливає склад харчування на схуднення?', a: 'Для втрати жиру ключовий фактор — баланс калорій. Однак якість їжі впливає на відчуття ситості і збереження м\'язів. Висококалорійні, насичені клітковиною продукти (м\'ясо, бобові, овочі) полегшують підтримку дефіциту без постійного голоду.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de déficit calorique vous aide à déterminer exactement combien de calories par jour vous devez réduire pour atteindre votre poids cible dans le délai souhaité. Entrez votre poids actuel, votre poids cible et le nombre de semaines. La calculatrice utilise la règle établie selon laquelle 1 kg de graisse corporelle correspond à environ 7 700 kilocalories, et répartit le déficit total sur la période choisie.\n\nLe déficit calorique est le fondement de la perte de poids. Un déficit modéré de 300 à 500 kcal/jour entraîne une perte de graisse progressive de 0,3 à 0,5 kg par semaine, ce que la plupart des organisations de santé recommandent. Des déficits supérieurs à 750–1 000 kcal/jour peuvent provoquer une perte de masse musculaire, des carences nutritionnelles et une adaptation métabolique — consultez toujours un professionnel de santé si votre déficit calculé dépasse les limites recommandées.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qu\'un déficit calorique ?', a: 'Un déficit calorique se produit lorsque vous consommez moins de calories que votre corps en dépense. Le corps utilise alors ses réserves d\'énergie (principalement les graisses) pour compenser. Un déficit de 7 700 kcal correspond à environ 1 kg de graisse perdue.' },
      { q: 'Combien de calories contient 1 kg de graisse ?', a: 'Un kilogramme de tissu adipeux contient environ 7 700 kilocalories. C\'est pourquoi perdre 1 kg de graisse nécessite un déficit cumulatif d\'environ 7 700 kcal. En unités impériales : 1 livre de graisse ≈ 3 500 kcal.' },
      { q: 'Quel déficit calorique est sans danger ?', a: 'La plupart des autorités sanitaires recommandent un déficit de 500 à 750 kcal/jour pour les adultes en bonne santé, conduisant à une perte de 0,5 à 0,75 kg par semaine. Un déficit supérieur à 1 000 kcal/jour est généralement considéré comme agressif et nécessite une supervision médicale.' },
      { q: 'À quelle vitesse peut-on perdre du poids en toute sécurité ?', a: 'L\'OMS, le NHS et la plupart des diététiciens recommandent une perte de 0,5 à 1 kg (1 à 2 lbs) par semaine. Ce rythme préserve la masse musculaire, évite les carences nutritionnelles et est beaucoup plus susceptible de conduire à une perte de poids durable.' },
      { q: 'Qu\'est-ce que le TDEE ?', a: 'Le TDEE (dépense énergétique totale journalière) est le nombre total de calories brûlées en une journée, y compris l\'activité physique. Si votre TDEE est de 2 500 kcal et que vous mangez 2 000 kcal, votre déficit est de 500 kcal/jour.' },
      { q: 'Faut-il compter les macros ou seulement les calories ?', a: 'Pour la perte de poids, l\'équilibre calorique total est primordial. Cependant, un apport élevé en protéines (1,6–2,2 g/kg de poids corporel) en déficit aide à préserver la masse musculaire et augmente la satiété.' },
      { q: 'L\'exercice crée-t-il un déficit calorique ?', a: 'Oui — l\'exercice augmente le TDEE, facilitant la création d\'un déficit sans réduire drastiquement l\'alimentation. Une course de 30 minutes brûle 250 à 400 kcal. Combiner une alimentation modérée avec une activité physique régulière est la stratégie de perte de poids la plus durable.' },
      { q: 'Pourquoi le poids stagne-t-il malgré un déficit ?', a: 'C\'est le plateau. Le corps s\'adapte à un apport calorique réduit en diminuant son métabolisme. Solutions : prendre une pause diète à l\'entretien pendant 1–2 semaines, recalculer le TDEE, ou augmenter l\'activité physique.' },
      { q: 'Peut-on prendre du poids en déficit calorique ?', a: 'Une vraie prise de graisse est impossible en déficit soutenu. Le poids peut augmenter temporairement à cause de la rétention d\'eau (sel, glucides, cycle menstruel). Fiez-vous aux tendances à long terme plutôt qu\'aux variations quotidiennes.' },
      { q: 'Quelle est la différence entre la sèche et le régime crash ?', a: 'La sèche (terme de musculation) implique un déficit modéré de 300–500 kcal/jour avec beaucoup de protéines pour préserver le muscle. Le régime crash (800–1 200 kcal/jour) provoque une perte rapide mais inclut une perte musculaire et conduit presque toujours à la reprise du poids.' },
      { q: 'La qualité des aliments influence-t-elle la perte de poids ?', a: 'Pour la perte de graisse, l\'équilibre calorique est prioritaire. Mais la qualité affecte la satiété et la préservation musculaire. Les aliments riches en protéines, en fibres et en volume (légumes, viandes maigres, légumineuses) facilitent le maintien d\'un déficit sans faim constante.' },
    ],
  },
  lt: {
    description: 'Mūsų kalorijų deficito skaičiuotuvas padeda tiksliai nustatyti, kiek kalorijų per dieną reikia sumažinti, kad pasiektumėte norimą svorį per nustatytą laiką. Įveskite dabartinį svorį, tikslinį svorį ir savaičių skaičių — skaičiuotuvas taiko taisyklę, kad 1 kg riebalų ≈ 7700 kcal, ir paskirsto bendrą deficitą per pasirinktas dienas.\n\nKalorijų deficitas yra svorio metimo pagrindas. Suvartojant mažiau kalorijų, nei išleidžia organizmas, jis verčiamas naudoti sukauptus riebalus energijai. Vidutinis 300–500 kcal/dieną deficitas lemia palaipsnį riebalų mažėjimą 0,3–0,5 kg per savaitę — šį tempą daugelis sveikatos organizacijų laiko saugiu. Deficitas viršijantis 750–1000 kcal/dieną gali sukelti raumenų masės praradimą ir medžiagų apykaitos sulėtėjimą.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kas yra kalorijų deficitas?', a: 'Kalorijų deficitas atsiranda, kai suvartojate mažiau kalorijų, nei sudegina jūsų kūnas. Tuomet organizmas naudoja sukauptą energiją (daugiausia riebalus). 7700 kcal deficitas atitinka maždaug 1 kg riebalų praradimą.' },
      { q: 'Kiek kalorijų yra 1 kg riebalų?', a: 'Viename kilogramе riebalinio audinio yra apie 7700 kilokalorijas. Tiek reikia sudeginti, norint netekti 1 kg riebalų. Imperiniais vienetais: 1 svaras riebalų ≈ 3500 kcal.' },
      { q: 'Koks kalorijų deficitas yra saugus?', a: 'Daugelis sveikatos institucijų rekomenduoja 500–750 kcal/dieną deficitą, lemiantį 0,5–0,75 kg per savaitę riebalų mažėjimą. Deficitas virš 1000 kcal/dieną laikomas agresyviu ir rekomenduojamas tik gydytojo priežiūroje.' },
      { q: 'Kaip greitai galima saugiai numesti svorio?', a: 'PSO ir daugelis dietologų rekomenduoja 0,5–1 kg (1–2 svarų) per savaitę tempą. Šis tempas išsaugo raumenų masę, apsaugo nuo mitybinių trūkumų ir labiau tikėtina, kad svorio metimas bus ilgalaikis.' },
      { q: 'Kas yra TDEE?', a: 'TDEE (bendra dienos energijos išlaida) — tai bendras kalorijų kiekis, kurį jūsų kūnas sudegina per dieną, įskaitant fizinį aktyvumą. Jei TDEE = 2500 kcal ir valgote 2000 kcal, deficitas = 500 kcal/dieną.' },
      { q: 'Ar reikia skaičiuoti makroelementus ar tik kalorijas?', a: 'Svorio metimui pagrindinis veiksnys yra bendras kalorijų balansas. Tačiau didelis baltymų kiekis (1,6–2,2 g/kg kūno svorio) esant deficitui padeda išsaugoti raumenų masę ir didina sotumo jausmą.' },
      { q: 'Ar fizinis aktyvumas kuria kalorijų deficitą?', a: 'Taip. Treniruotės didina TDEE, lengvinant deficito kūrimą be griežtų mitybos apribojimų. 30 min bėgimas sudegina 250–400 kcal. Vidutinių apribojimų ir reguliaraus aktyvumo derinys yra tvariausia strategija.' },
      { q: 'Kodėl svoris sustoja mažėti esant deficitui?', a: 'Tai plynaukštė. Organizmas adaptuojasi prie mažesnio suvartojimo, sumažindamas medžiagų apykaitą. Sprendimai: palaikančios kalorijų normos pauzė 1–2 savaitėms, TDEE perskaičiavimas arba aktyvumo didinimas.' },
      { q: 'Ar galima priaugti svorio esant deficitui?', a: 'Tikrų riebalų kaupimas esant nuolatiniam deficitui neįmanomas. Tačiau svarstyklių svoris gali laikinai didėti dėl vandens sulaikymo (druska, angliavandeniai, mėnesinis ciklas). Pasitikėkite ilgalaikėmis tendencijomis.' },
      { q: 'Kuo skiriasi „džiovinimas" nuo griežtos dietos?', a: 'Kultūrizmo „džiovinimas" — vidutinis 300–500 kcal/dieną deficitas su daug baltymų raumenims išsaugoti. Griežta dieta (800–1200 kcal/dieną) sukelia greitą, bet trumpalaikį svorio kritimą, raumenų netekimą ir beveik visada baigiasi svorio atgavimu.' },
      { q: 'Ar maisto kokybė veikia svorio metimą?', a: 'Riebalų praradimui pagrindinis veiksnys yra kalorijų balansas. Tačiau maisto kokybė veikia sotumo jausmą ir raumenų išsaugojimą. Daug baltymų, skaidulų turintis maistas (daržovės, liesa mėsa, ankštiniai) padeda palaikyti deficitą be nuolatinio alkio.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/calorie-deficit', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CalorieDeficitPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/calorie-deficit`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <CalorieDeficitCalculator locale={locale} />
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
