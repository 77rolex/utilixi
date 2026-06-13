import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MacrosCalculator from './MacrosCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/calories', label: 'Calorie Calculator' },
    { href: '/calculator/calorie-deficit', label: 'Calorie Deficit Calculator' },
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' },
    { href: '/calculator/water-intake', label: 'Water Intake Calculator' },
  ],
  ru: [
    { href: '/calculator/calories', label: 'Калькулятор калорий' },
    { href: '/calculator/calorie-deficit', label: 'Калькулятор дефицита калорий' },
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' },
    { href: '/calculator/water-intake', label: 'Калькулятор нормы воды' },
  ],
  uk: [
    { href: '/calculator/calories', label: 'Калькулятор калорій' },
    { href: '/calculator/calorie-deficit', label: 'Калькулятор дефіциту калорій' },
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' },
    { href: '/calculator/water-intake', label: 'Калькулятор норми води' },
  ],
  fr: [
    { href: '/calculator/calories', label: 'Calculatrice Calories' },
    { href: '/calculator/calorie-deficit', label: 'Calculatrice Déficit Calorique' },
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/ideal-weight', label: 'Calculatrice Poids Idéal' },
    { href: '/calculator/water-intake', label: 'Calculatrice Hydratation' },
  ],
  lt: [
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' },
    { href: '/calculator/calorie-deficit', label: 'Kalorijų deficito skaičiuotuvas' },
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' },
    { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Macro Calculator — Protein, Fat & Carbs by Goal',
    description: 'Free macro calculator. Get your daily protein, fat, and carbohydrate targets based on your calorie intake and goal: cut, maintain, or bulk. Instant results with gram amounts.',
    h1: 'Macro Calculator',
  },
  ru: {
    title: 'Калькулятор БЖУ — белки, жиры и углеводы по цели',
    description: 'Бесплатный калькулятор БЖУ (белки, жиры, углеводы). Получите суточные нормы исходя из калорийности и цели: похудение, поддержание веса или набор мышечной массы.',
    h1: 'Калькулятор БЖУ / Macros',
  },
  uk: {
    title: 'Калькулятор БЖУ — білки, жири і вуглеводи за метою',
    description: 'Безкоштовний калькулятор БЖУ (білки, жири, вуглеводи). Отримайте добові норми виходячи з калорійності та мети: схуднення, підтримка ваги або набір м\'язової маси.',
    h1: 'Калькулятор БЖУ / Macros',
  },
  fr: {
    title: 'Calculatrice Macros — Protéines, Lipides & Glucides',
    description: 'Calculatrice de macronutriments gratuite. Obtenez vos objectifs quotidiens en protéines, lipides et glucides selon votre apport calorique et votre objectif : sèche, maintien ou prise de masse.',
    h1: 'Calculatrice Macronutriments',
  },
  lt: {
    title: 'Makroelementų Skaičiuotuvas — Baltymai, Riebalai ir Angliavandeniai',
    description: 'Nemokamas makroelementų skaičiuotuvas. Gaukite dieninius baltymų, riebalų ir angliavandenių tikslus pagal kalorijų kiekį ir tikslą: lieknėjimas, palaikymas ar masės didinimas.',
    h1: 'Makroelementų Skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our macro calculator helps you determine the optimal daily amounts of protein, fat, and carbohydrates based on your total calorie intake and fitness goal. Whether you are cutting (losing fat), maintaining your current weight, or bulking (building muscle), the right macronutrient split is essential for achieving your goals efficiently. Simply enter your daily calorie target and select your goal to see exact gram amounts for each macronutrient.\n\nMacronutrients are the three main energy-providing nutrients: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). Protein is critical for muscle repair and satiety; carbohydrates fuel athletic performance and brain function; fat supports hormones, vitamin absorption, and cell health. The optimal ratio varies by goal — a cutting phase emphasises protein to preserve muscle while in a calorie deficit, while a bulk prioritises carbohydrates for training energy and recovery.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What are macronutrients?', a: 'Macronutrients (macros) are the three main nutrients that provide energy: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). Unlike micronutrients (vitamins and minerals), macros are needed in large quantities daily and directly determine your energy intake and body composition.' },
      { q: 'What macro ratio should I use for cutting (fat loss)?', a: 'For cutting, a higher protein ratio helps preserve muscle mass while in a calorie deficit. Recommended split: 40% protein, 30% fat, 30% carbohydrates. At 1800 kcal: 180g protein, 60g fat, 135g carbs. High protein also increases satiety, reducing hunger during calorie restriction.' },
      { q: 'What macro ratio is best for building muscle?', a: 'For muscle building (bulking), carbohydrates should be higher to fuel training and support recovery. Recommended split: 30% protein, 25% fat, 45% carbohydrates. At 2800 kcal: 210g protein, 78g fat, 315g carbs. Ensure a slight calorie surplus (250–500 kcal above maintenance).' },
      { q: 'How much protein do I need per day?', a: 'General recommendations: sedentary adults need 0.8g/kg of body weight; active adults 1.2–1.6g/kg; strength athletes or those cutting 1.6–2.2g/kg. Higher protein intake (up to 3g/kg) has not been shown to cause harm in healthy adults and can support muscle retention during aggressive cutting.' },
      { q: 'Are all fats the same?', a: 'No. Unsaturated fats (olive oil, avocado, nuts, fish) support heart health and hormone production and should make up most of your fat intake. Saturated fats (red meat, dairy) should be limited to under 10% of total calories. Trans fats (hydrogenated oils) should be avoided entirely.' },
      { q: 'Why are carbohydrates important for athletes?', a: 'Carbohydrates are the body\'s primary fuel source for high-intensity exercise. Glucose from carbs is stored as glycogen in muscles and liver. Low glycogen means reduced performance, fatigue, and impaired recovery. Even for fat loss goals, sufficient carbohydrates around training sessions improve performance and body composition outcomes.' },
      { q: 'What is the difference between net carbs and total carbs?', a: 'Net carbs = total carbs − fibre. Fibre is not digested and doesn\'t raise blood sugar, so it doesn\'t count toward energy intake in the same way. This distinction matters mainly for low-carb/keto diets. For standard diets, tracking total carbs is sufficient.' },
      { q: 'Should I track macros every day?', a: 'Daily macro tracking is most beneficial when actively cutting, bulking, or making specific body composition changes. For weight maintenance, tracking calories and ensuring adequate protein is usually sufficient. Many people track strictly for 4–8 weeks to learn portion sizes, then use intuitive eating after.' },
      { q: 'What about fibre — is it a macro?', a: 'Fibre is a type of carbohydrate but is often tracked separately. The recommended daily intake is 25–38g for adults. Adequate fibre improves gut health, blood sugar control, and satiety. High-fibre foods (vegetables, legumes, whole grains) should form the base of your carbohydrate intake.' },
      { q: 'What happens if I eat too much protein?', a: 'Excess dietary protein is converted to glucose or stored as fat — it doesn\'t build extra muscle beyond your synthesis capacity. Very high protein intakes (over 3g/kg) may stress kidneys in individuals with pre-existing kidney disease, but are generally safe for healthy adults. Excess protein also increases calorie intake, potentially causing weight gain.' },
      { q: 'How do I know if my macros are working?', a: 'Track body weight weekly (same time, same conditions) and measure body composition monthly. For cutting: expect 0.5–1% of body weight loss per week. For bulking: 0.25–0.5% gain per week. Progress photos and strength progression in the gym are better long-term indicators than scale weight alone.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор макросов помогает определить оптимальные суточные количества белков, жиров и углеводов исходя из вашей общей калорийности рациона и фитнес-цели. Будь то похудение, поддержание веса или набор мышечной массы — правильное соотношение макронутриентов критически важно для эффективного достижения цели. Просто введите суточный калораж и выберите цель.\n\nМакронутриенты — три основных энергообеспечивающих нутриента: белок (4 ккал/г), углеводы (4 ккал/г) и жиры (9 ккал/г). Белок необходим для восстановления мышц и насыщения; углеводы обеспечивают спортивную производительность и работу мозга; жиры поддерживают гормональный фон и усвоение витаминов. Оптимальное соотношение зависит от цели — при похудении акцент на белок, при наборе массы — на углеводы.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое макронутриенты?', a: 'Макронутриенты (макросы) — три основных питательных вещества: белок (4 ккал/г), углеводы (4 ккал/г) и жиры (9 ккал/г). В отличие от микронутриентов (витаминов и минералов), макросы нужны в больших количествах и напрямую определяют состав тела.' },
      { q: 'Какое соотношение макросов при похудении?', a: 'При похудении повышенное количество белка помогает сохранить мышцы при дефиците калорий. Рекомендованное соотношение: 40% белок, 30% жир, 30% углеводы. При 1800 ккал: 180 г белка, 60 г жиров, 135 г углеводов.' },
      { q: 'Какое соотношение макросов при наборе мышечной массы?', a: 'При наборе массы (булкинге) углеводы должны быть выше для обеспечения тренировок и восстановления. Рекомендованное соотношение: 30% белок, 25% жир, 45% углеводы. При 2800 ккал: 210 г белка, 78 г жиров, 315 г углеводов.' },
      { q: 'Сколько белка нужно в день?', a: 'Общие рекомендации: малоподвижным людям — 0,8 г/кг; активным — 1,2–1,6 г/кг; спортсменам силовых видов или при похудении — 1,6–2,2 г/кг. При агрессивном похудении до 2,4 г/кг помогает сохранить мышечную массу.' },
      { q: 'Все ли жиры одинаковы?', a: 'Нет. Ненасыщенные жиры (оливковое масло, авокадо, орехи, рыба) полезны для сердца и гормонального фона. Насыщенные жиры (красное мясо, молочные продукты) следует ограничивать до 10% от калорий. Транс-жиры (гидрогенизированные масла) нужно исключить полностью.' },
      { q: 'Зачем спортсменам углеводы?', a: 'Углеводы — основное топливо для высокоинтенсивных нагрузок. Глюкоза запасается в мышцах и печени в виде гликогена. Низкий гликоген ведёт к снижению результатов и замедленному восстановлению. Даже при похудении достаточное количество углеводов вокруг тренировок улучшает производительность.' },
      { q: 'В чём разница между чистыми и общими углеводами?', a: 'Чистые углеводы = общие углеводы − клетчатка. Клетчатка не переваривается и не повышает сахар в крови. Это важно главным образом для низкоуглеводных диет (кето). При стандартном питании достаточно отслеживать общие углеводы.' },
      { q: 'Нужно ли считать макросы каждый день?', a: 'Ежедневный подсчёт макросов наиболее полезен при активном похудении или наборе массы. При поддержании веса обычно достаточно следить за калориями и потреблением белка. Многие строго считают макросы 4–8 недель, а затем переходят на интуитивное питание.' },
      { q: 'Клетчатка — это макронутриент?', a: 'Клетчатка — разновидность углеводов, которую часто учитывают отдельно. Рекомендованное суточное количество — 25–38 г. Достаточное количество клетчатки улучшает здоровье кишечника, контроль сахара и насыщение.' },
      { q: 'Что происходит при избытке белка?', a: 'Избыточный белок преобразуется в глюкозу или откладывается в виде жира — он не наращивает дополнительные мышцы. Очень высокое потребление белка (более 3 г/кг) может нагружать почки при уже имеющихся заболеваниях, но безопасно для здоровых людей.' },
      { q: 'Как понять, что макросы работают?', a: 'Взвешивайтесь еженедельно в одно время и при одинаковых условиях. При похудении: ожидайте снижения 0,5–1% от массы тела в неделю. При наборе: 0,25–0,5% прироста в неделю. Прогрессивная перегрузка в зале — лучший долгосрочный индикатор.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор макросів допомагає визначити оптимальні добові кількості білків, жирів і вуглеводів виходячи із загальної калорійності раціону та фітнес-мети. Будь то схуднення, підтримка ваги або набір м\'язової маси — правильне співвідношення макронутрієнтів критично важливе для досягнення мети. Просто введіть добовий калораж і оберіть мету.\n\nМакронутрієнти — три основних енергозабезпечуючих нутрієнти: білок (4 ккал/г), вуглеводи (4 ккал/г) і жири (9 ккал/г). Білок необхідний для відновлення м\'язів і насичення; вуглеводи забезпечують спортивну продуктивність і роботу мозку; жири підтримують гормональний фон і засвоєння вітамінів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке макронутрієнти?', a: 'Макронутрієнти (макроси) — три основних поживних речовини: білок (4 ккал/г), вуглеводи (4 ккал/г) і жири (9 ккал/г). На відміну від мікронутрієнтів, макроси потрібні у великих кількостях і безпосередньо визначають склад тіла.' },
      { q: 'Яке співвідношення макросів при схудненні?', a: 'При схудненні підвищена кількість білка допомагає зберегти м\'язи при дефіциті калорій. Рекомендоване співвідношення: 40% білок, 30% жир, 30% вуглеводи. При 1800 ккал: 180 г білка, 60 г жирів, 135 г вуглеводів.' },
      { q: 'Яке співвідношення макросів при наборі м\'язової маси?', a: 'При наборі маси вуглеводи мають бути вищими для забезпечення тренувань і відновлення. Рекомендоване співвідношення: 30% білок, 25% жир, 45% вуглеводи. При 2800 ккал: 210 г білка, 78 г жирів, 315 г вуглеводів.' },
      { q: 'Скільки білка потрібно на день?', a: 'Загальні рекомендації: малорухливим людям — 0,8 г/кг; активним — 1,2–1,6 г/кг; силовим спортсменам або при схудненні — 1,6–2,2 г/кг. При агресивному схудненні до 2,4 г/кг допомагає зберегти м\'язову масу.' },
      { q: 'Чи всі жири однакові?', a: 'Ні. Ненасичені жири (оливкова олія, авокадо, горіхи, риба) корисні для серця і гормонального фону. Насичені жири (червоне м\'ясо, молочні продукти) слід обмежувати до 10% від калорій. Транс-жири (гідрогенізовані масла) потрібно виключити.' },
      { q: 'Навіщо спортсменам вуглеводи?', a: 'Вуглеводи — основне паливо для високоінтенсивних навантажень. Глюкоза запасається в м\'язах і печінці у вигляді глікогену. Низький рівень глікогену веде до зниження результатів і уповільненого відновлення.' },
      { q: 'У чому різниця між чистими і загальними вуглеводами?', a: 'Чисті вуглеводи = загальні вуглеводи − клітковина. Клітковина не перетравлюється і не підвищує цукор у крові. Це важливо головним чином для низьковуглеводних дієт (кето).' },
      { q: 'Чи потрібно рахувати макроси щодня?', a: 'Щоденний підрахунок макросів найбільш корисний при активному схудненні або наборі маси. При підтримці ваги зазвичай достатньо стежити за калоріями і споживанням білка.' },
      { q: 'Клітковина — це макронутрієнт?', a: 'Клітковина — різновид вуглеводів, яку часто враховують окремо. Рекомендована добова кількість — 25–38 г. Достатня кількість клітковини покращує здоров\'я кишківника та контроль цукру.' },
      { q: 'Що відбувається при надлишку білка?', a: 'Надлишковий білок перетворюється на глюкозу або відкладається у вигляді жиру. Дуже високе споживання білка (понад 3 г/кг) може навантажувати нирки при наявних захворюваннях, але безпечне для здорових людей.' },
      { q: 'Як зрозуміти, що макроси працюють?', a: 'Зважуйтесь щотижня в один і той самий час. При схудненні: очікуйте зниження 0,5–1% від маси тіла на тиждень. При наборі: 0,25–0,5% приросту на тиждень. Прогресивне перевантаження в залі — найкращий довгостроковий індикатор.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de macronutriments vous aide à déterminer les quantités quotidiennes optimales de protéines, lipides et glucides en fonction de votre apport calorique total et de votre objectif fitness. Que vous soyez en phase de sèche, de maintien ou de prise de masse, le bon ratio de macronutriments est essentiel pour atteindre vos objectifs efficacement.\n\nLes macronutriments sont les trois principaux nutriments énergétiques : protéines (4 kcal/g), glucides (4 kcal/g) et lipides (9 kcal/g). Les protéines sont essentielles à la réparation musculaire et à la satiété ; les glucides alimentent la performance sportive et la fonction cérébrale ; les lipides soutiennent les hormones et l\'absorption des vitamines. Le ratio optimal varie selon l\'objectif.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Que sont les macronutriments ?', a: 'Les macronutriments (macros) sont les trois principaux nutriments qui fournissent de l\'énergie : protéines (4 kcal/g), glucides (4 kcal/g) et lipides (9 kcal/g). Contrairement aux micronutriments, ils sont nécessaires en grandes quantités et déterminent directement la composition corporelle.' },
      { q: 'Quel ratio de macros pour la sèche (perte de graisse) ?', a: 'Pour la sèche, un apport en protéines plus élevé aide à préserver la masse musculaire en déficit calorique. Ratio recommandé : 40 % protéines, 30 % lipides, 30 % glucides. À 1 800 kcal : 180 g de protéines, 60 g de lipides, 135 g de glucides.' },
      { q: 'Quel ratio est le meilleur pour la prise de masse ?', a: 'Pour la prise de masse (bulk), les glucides doivent être plus élevés pour alimenter l\'entraînement et soutenir la récupération. Ratio recommandé : 30 % protéines, 25 % lipides, 45 % glucides. À 2 800 kcal : 210 g de protéines, 78 g de lipides, 315 g de glucides.' },
      { q: 'De combien de protéines ai-je besoin par jour ?', a: 'Recommandations générales : adultes sédentaires 0,8 g/kg ; actifs 1,2–1,6 g/kg ; sportifs de force ou en sèche 1,6–2,2 g/kg. Des apports plus élevés (jusqu\'à 3 g/kg) sont sans danger pour les adultes en bonne santé et aident à conserver la masse musculaire.' },
      { q: 'Tous les lipides se valent-ils ?', a: 'Non. Les graisses insaturées (huile d\'olive, avocat, noix, poisson) sont bénéfiques pour le cœur et les hormones. Les graisses saturées (viande rouge, produits laitiers) doivent être limitées à moins de 10 % des calories. Les graisses trans (huiles hydrogénées) doivent être évitées.' },
      { q: 'Pourquoi les glucides sont-ils importants pour les sportifs ?', a: 'Les glucides sont le principal carburant pour l\'exercice de haute intensité. Le glucose est stocké sous forme de glycogène dans les muscles et le foie. Un glycogène insuffisant réduit les performances et ralentit la récupération.' },
      { q: 'Quelle est la différence entre glucides nets et glucides totaux ?', a: 'Glucides nets = glucides totaux − fibres. Les fibres ne sont pas digérées et ne font pas monter la glycémie. Cette distinction importe surtout pour les régimes low-carb/cétogènes. Pour une alimentation standard, suivre les glucides totaux suffit.' },
      { q: 'Dois-je compter mes macros tous les jours ?', a: 'Le suivi quotidien est le plus utile en phase de sèche active ou de prise de masse. Pour le maintien du poids, surveiller les calories et assurer un apport protéique suffisant est généralement suffisant. Beaucoup comptent strictement pendant 4 à 8 semaines, puis adoptent une alimentation intuitive.' },
      { q: 'Les fibres sont-elles un macro ?', a: 'Les fibres sont un type de glucide souvent suivi séparément. L\'apport journalier recommandé est de 25 à 38 g. Des fibres suffisantes améliorent la santé intestinale, la glycémie et la satiété.' },
      { q: 'Que se passe-t-il si je mange trop de protéines ?', a: 'L\'excès de protéines est converti en glucose ou stocké sous forme de graisse — il ne construit pas de muscle supplémentaire au-delà de votre capacité de synthèse. Des apports très élevés (> 3 g/kg) peuvent contraindre les reins chez les personnes avec une pathologie rénale préexistante, mais sont généralement sans danger.' },
      { q: 'Comment savoir si mes macros fonctionnent ?', a: 'Pesez-vous chaque semaine dans les mêmes conditions. En sèche : attendez une perte de 0,5 à 1 % du poids corporel par semaine. En prise de masse : 0,25 à 0,5 % de gain par semaine. La progression en force à la salle est un meilleur indicateur à long terme que la balance seule.' },
    ],
  },
  lt: {
    description: 'Mūsų makroelementų skaičiuotuvas padeda nustatyti optimalų kasdienį baltymų, riebalų ir angliavandenių kiekį pagal jūsų bendrą kalorijų suvartojimą ir kūno rengybos tikslą. Nesvarbu, ar norite lieknėti, palaikyti svorį, ar auginti raumenų masę — teisingas makroelementų santykis yra būtinas efektyviam rezultatui.\n\nMakroelementai — tai trys pagrindiniai energiją teikiantys maistiniai elementai: baltymai (4 kcal/g), angliavandeniai (4 kcal/g) ir riebalai (9 kcal/g). Baltymai būtini raumenų atstatymui ir sotumo jausmui; angliavandeniai suteikia energiją sportui ir smegenų veiklai; riebalai palaiko hormonus ir vitaminų įsisavinimą.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kas yra makroelementai?', a: 'Makroelementai (makrosai) — trys pagrindiniai maistiniai elementai: baltymai (4 kcal/g), angliavandeniai (4 kcal/g) ir riebalai (9 kcal/g). Skirtingai nei mikroelementai, makrosai reikalingi dideliais kiekiais ir tiesiogiai lemia kūno sudėjimą.' },
      { q: 'Koks makrų santykis tinkamas lieknėjimui?', a: 'Lieknėjimui didesnis baltymų kiekis padeda išsaugoti raumenų masę kalorijų deficito metu. Rekomenduojamas santykis: 40% baltymai, 30% riebalai, 30% angliavandeniai. Esant 1800 kcal: 180 g baltymų, 60 g riebalų, 135 g angliavandenių.' },
      { q: 'Koks makrų santykis geriausias raumenų auginimui?', a: 'Masės didinimui angliavandeniai turi būti didesni, kad palaikytų treniruotes ir atsistatymą. Rekomenduojamas santykis: 30% baltymai, 25% riebalai, 45% angliavandeniai. Esant 2800 kcal: 210 g baltymų, 78 g riebalų, 315 g angliavandenių.' },
      { q: 'Kiek baltymų reikia per dieną?', a: 'Bendros rekomendacijos: sėsliam gyvenimo būdui — 0,8 g/kg; aktyviems — 1,2–1,6 g/kg; jėgos sportininkams arba lieknėjant — 1,6–2,2 g/kg. Didesnis kiekis (iki 3 g/kg) yra saugus sveikiems žmonėms.' },
      { q: 'Ar visi riebalai vienodi?', a: 'Ne. Nesotieji riebalai (alyvuogių aliejus, avokadas, riešutai, žuvis) yra naudingi širdžiai ir hormonams. Sotieji riebalai (raudona mėsa, pieno produktai) turėtų sudaryti mažiau nei 10% kalorijų. Trans riebalų (hidrintų aliejų) reikia vengti.' },
      { q: 'Kodėl angliavandeniai svarbūs sportininkams?', a: 'Angliavandeniai yra pagrindinė energija intensyviems pratimams. Gliukozė kaupiama kaip glikogenas raumenyse ir kepenyse. Žemas glikogeno lygis mažina veiklą ir lėtina atsistatymą.' },
      { q: 'Koks skirtumas tarp grynųjų ir bendrų angliavandenių?', a: 'Grynieji angliavandeniai = bendri angliavandeniai − skaidulos. Skaidulose nepasisavinamos ir nedidina cukraus kraujyje. Tai svarbu daugiausia mažai angliavandenių turinčiose / ketogeninėse dietose.' },
      { q: 'Ar reikia kasdien skaičiuoti makrosus?', a: 'Kasdienis makrosų skaičiavimas labiausiai naudingas aktyviai lieknėjant ar auginant masę. Svoriui palaikyti paprastai pakanka stebėti kalorijas ir baltymų kiekį. Daugelis griežtai skaičiuoja 4–8 savaites, o paskui pereina prie intuityvaus valgymo.' },
      { q: 'Ar skaidulos yra makroelementas?', a: 'Skaidulos yra angliavandenių rūšis, dažnai sekama atskirai. Rekomenduojama paros norma — 25–38 g. Pakankamas skaidulų kiekis gerina žarnyno sveikatą ir sotumo jausmą.' },
      { q: 'Kas atsitinka suvalgius per daug baltymų?', a: 'Pertekliniai baltymai paverčiami gliukoze arba kaupiami kaip riebalai — jie neaugina papildomų raumenų. Labai didelis kiekis (> 3 g/kg) gali apkrauti inkstus esant inkstų ligai, tačiau paprastai yra saugus sveikiems suaugusiems.' },
      { q: 'Kaip žinoti, ar makrosai veikia?', a: 'Sveriamės kas savaitę tomis pačiomis sąlygomis. Lieknėjant: tikėkitės 0,5–1% kūno masės sumažėjimo per savaitę. Auginant masę: 0,25–0,5% padidėjimo per savaitę. Stiprumo augimas sporto salėje yra geriausias ilgalaikis rodiklis.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/macros', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MacrosPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/macros`,
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
        <ToolActions />
        <MacrosCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
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
