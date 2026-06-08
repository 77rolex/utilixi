import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CaloriesCalculator from './CaloriesCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/body-fat', label: 'Body Fat Calculator' }, { href: '/calculator/water-intake', label: 'Water Intake Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/body-fat', label: 'Калькулятор жира' }, { href: '/calculator/water-intake', label: 'Норма воды в день' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/body-fat', label: 'Калькулятор жиру' }, { href: '/calculator/water-intake', label: 'Норма води на день' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' }, { href: '/calculator/water-intake', label: 'Apport en eau quotidien' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' }, { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Calorie Calculator — Daily Calorie Needs (TDEE)',
    description: 'Free TDEE calorie calculator. Calculate your daily calorie needs based on your age, gender, height, weight, and activity level using the Mifflin-St Jeor formula.',
    h1: 'Calorie Calculator',
  },
  ru: {
    title: 'Калькулятор калорий — суточная норма TDEE онлайн',
    description: 'Бесплатный калькулятор калорий онлайн. Рассчитайте суточную норму калорий по формуле Миффлина-Сан Жеора с учётом пола, возраста, роста, веса и активности.',
    h1: 'Калькулятор калорий',
  },
  uk: {
    title: 'Калькулятор калорій — добова норма TDEE онлайн',
    description: 'Безкоштовний калькулятор калорій онлайн. Розрахуйте добову норму калорій за формулою Міффліна-Сан Жеора з урахуванням статі, віку, зросту, ваги та активності.',
    h1: 'Калькулятор калорій',
  },
  fr: {
    title: 'Calculatrice de Calories — Besoins caloriques TDEE',
    description: 'Calculatrice de calories TDEE gratuite. Calculez vos besoins caloriques journaliers selon votre âge, sexe, taille, poids et niveau d\'activité (formule Mifflin-St Jeor).',
    h1: 'Calculatrice de Calories',
  },
  lt: {
    title: 'Kalorijų Skaičiuotuvas — Dienos kalorijų poreikis TDEE',
    description: 'Nemokamas kalorijų skaičiuotuvas. Apskaičiuokite dienos kalorijų poreikį pagal amžių, lytį, ūgį, svorį ir aktyvumo lygį (Mifflin-St Jeor formulė).',
    h1: 'Kalorijų Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free calorie calculator uses the Mifflin-St Jeor equation — the most accurate formula recommended by nutrition professionals — to estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Enter your details to see how many calories you need to maintain, lose, or gain weight.\n\nCalorie needs change over time as your weight, age, and activity level shift. Recalculate every 4–8 weeks or after a significant change in body weight. For best results, combine calorie tracking with adequate protein intake (1.6–2.2 g per kg of body weight) to preserve muscle during a deficit.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is TDEE?',
        a: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, accounting for your basal metabolic rate and physical activity. It represents the number of calories you need to maintain your current weight.',
      },
      {
        q: 'What is BMR?',
        a: 'BMR (Basal Metabolic Rate) is the number of calories your body needs at complete rest to maintain basic functions like breathing, circulation, and cell production. It is the minimum calorie intake required to stay alive.',
      },
      {
        q: 'Which formula does this calculator use?',
        a: 'This calculator uses the Mifflin-St Jeor equation (1990), which is considered the most accurate for estimating BMR in most adults. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161.',
      },
      {
        q: 'How many calories should I cut to lose weight?',
        a: 'A deficit of 500 kcal per day leads to approximately 0.5 kg (1 lb) of weight loss per week. This calculator shows you the "Lose weight" figure based on this principle. It is not recommended to go below 1,200 kcal/day without medical supervision.',
      },
      {
        q: 'Are these numbers exact?',
        a: 'These are estimates. Individual metabolism varies based on genetics, hormones, sleep, and other factors. Use these numbers as a starting point and adjust based on your real results over 2–4 weeks.',
      },
      {
        q: 'How many extra calories do I need to gain muscle?',
        a: 'A surplus of 300–500 kcal per day above your TDEE supports lean muscle gain while minimising fat accumulation. Going beyond this range leads to more fat gain without proportionally more muscle. Combining a slight calorie surplus with resistance training and adequate protein (1.6–2.2 g/kg) produces the best results.',
      },
      {
        q: 'What is the difference between TDEE and BMR?',
        a: 'BMR is your calorie burn at complete rest — the baseline your body needs just to survive. TDEE is BMR multiplied by your activity factor (ranging from 1.2 for sedentary to 1.9 for very active). TDEE is the number you actually eat to: it accounts for all movement throughout the day.',
      },
      {
        q: 'How much does activity level affect daily calorie needs?',
        a: 'Activity level has a major impact. A sedentary person burns roughly 1.2× their BMR, while someone with a very active job or who trains twice a day may burn 1.7–1.9× their BMR. For a person with a BMR of 1,600 kcal, this is the difference between ~1,920 kcal and ~3,040 kcal per day.',
      },
      {
        q: 'Should I also count macronutrients?',
        a: 'For general health and weight management, tracking total calories is the most important step. However, macronutrients matter too: adequate protein (1.6–2.2 g/kg) preserves muscle during a deficit, and carbohydrate and fat ratios affect energy levels and hormonal balance. Many nutrition apps help you track both calories and macros simultaneously.',
      },
      {
        q: 'How often should I recalculate my TDEE?',
        a: 'Recalculate every 4–8 weeks or whenever you lose or gain 5+ kg of body weight, significantly change your activity level, or notice your weight stalling despite following your targets. As you lose weight, your TDEE decreases — this is normal and means adjusting your calorie intake accordingly.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор калорий использует формулу Миффлина-Сан Жеора — наиболее точную для расчёта базового обмена веществ (BMR) и суточной нормы калорий (TDEE). Введите свои данные, чтобы узнать, сколько калорий нужно для поддержания, снижения или набора веса.\n\nПотребность в калориях меняется со временем по мере изменения веса, возраста и уровня активности. Пересчитывайте каждые 4–8 недель или после значительного изменения массы тела. Для лучших результатов сочетайте контроль калорий с достаточным потреблением белка (1,6–2,2 г на кг веса), чтобы сохранить мышцы при дефиците.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое TDEE?',
        a: 'TDEE (Total Daily Energy Expenditure) — общий расход калорий за день с учётом базового обмена и физической активности. Это количество калорий для поддержания текущего веса.',
      },
      {
        q: 'Что такое BMR?',
        a: 'BMR (базовый обмен веществ) — количество калорий, которое организм расходует в состоянии полного покоя на поддержание жизнедеятельности: дыхание, кровообращение, клеточные процессы.',
      },
      {
        q: 'Какая формула используется?',
        a: 'Используется формула Миффлина-Сан Жеора (1990). Для мужчин: BMR = 10 × вес(кг) + 6,25 × рост(см) − 5 × возраст + 5. Для женщин: BMR = 10 × вес(кг) + 6,25 × рост(см) − 5 × возраст − 161.',
      },
      {
        q: 'На сколько калорий нужно снизить рацион для похудения?',
        a: 'Дефицит 500 ккал/день даёт около 0,5 кг потери веса в неделю. Калькулятор показывает это значение в строке «Похудение». Снижать калораж ниже 1200 ккал/день без врачебного контроля не рекомендуется.',
      },
      {
        q: 'Насколько точны эти цифры?',
        a: 'Это оценочные значения. Индивидуальный обмен веществ зависит от генетики, гормонов, сна и других факторов. Используйте расчёт как отправную точку и корректируйте по реальным результатам через 2–4 недели.',
      },
      {
        q: 'Сколько лишних калорий нужно для набора мышц?',
        a: 'Профицит 300–500 ккал/день выше TDEE обеспечивает набор мышц с минимальным накоплением жира. Больший излишек приводит к большему набору жира без пропорционального роста мышц. Оптимально сочетать умеренный профицит с силовыми тренировками и достаточным белком (1,6–2,2 г/кг).',
      },
      {
        q: 'В чём разница между TDEE и BMR?',
        a: 'BMR — расход калорий в состоянии полного покоя, минимум для выживания. TDEE = BMR × коэффициент активности (от 1,2 для сидячего образа жизни до 1,9 для очень активного). TDEE — это то число калорий, на которое ориентируется ваш рацион.',
      },
      {
        q: 'Насколько уровень активности влияет на суточную норму?',
        a: 'Уровень активности — ключевой фактор. Малоактивный человек расходует ~1,2 × BMR, а тот, кто дважды в день тренируется — 1,7–1,9 × BMR. При BMR 1600 ккал это разница между ~1920 и ~3040 ккал в день.',
      },
      {
        q: 'Нужно ли также считать макронутриенты?',
        a: 'Для управления весом главное — контроль общего числа калорий. Однако макронутриенты тоже важны: достаточное количество белка (1,6–2,2 г/кг) сохраняет мышцы при дефиците, а соотношение углеводов и жиров влияет на энергию и гормональный фон. Многие приложения позволяют одновременно отслеживать калории и БЖУ.',
      },
      {
        q: 'Как часто пересчитывать TDEE?',
        a: 'Пересчитывайте каждые 4–8 недель или при изменении веса на 5+ кг, значительном изменении уровня активности, либо если вес перестал меняться несмотря на соблюдение нормы. При похудении TDEE снижается — это нормально, и норму калорий нужно корректировать.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор калорій використовує формулу Міффліна-Сан Жеора для розрахунку базового обміну речовин (BMR) і добової норми калорій (TDEE). Введіть свої дані, щоб дізнатися, скільки калорій потрібно для підтримки, зниження або набору ваги.\n\nПотреба в калоріях змінюється з часом в міру зміни ваги, віку та рівня активності. Перераховуйте кожні 4–8 тижнів або після значного зміни маси тіла. Для найкращих результатів поєднуйте контроль калорій із достатнім споживанням білка (1,6–2,2 г на кг ваги) для збереження м\'язів.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке TDEE?',
        a: 'TDEE — загальні витрати калорій за день з урахуванням базового обміну та фізичної активності. Це кількість калорій для підтримання поточної ваги.',
      },
      {
        q: 'Що таке BMR?',
        a: 'BMR (базовий обмін речовин) — кількість калорій, яку організм витрачає у стані повного спокою на підтримку дихання, кровообігу та клітинних процесів.',
      },
      {
        q: 'Яка формула використовується?',
        a: 'Формула Міффліна-Сан Жеора (1990). Для чоловіків: BMR = 10 × вага(кг) + 6,25 × зріст(см) − 5 × вік + 5. Для жінок: BMR = 10 × вага(кг) + 6,25 × зріст(см) − 5 × вік − 161.',
      },
      {
        q: 'На скільки калорій знизити раціон для схуднення?',
        a: 'Дефіцит 500 ккал/день дає близько 0,5 кг втрати ваги на тиждень. Знижувати калорійність нижче 1200 ккал/день без лікарського контролю не рекомендується.',
      },
      {
        q: 'Наскільки точні ці цифри?',
        a: 'Це орієнтовні значення. Індивідуальний обмін речовин залежить від генетики, гормонів і сну. Використовуйте розрахунок як відправну точку і коригуйте за реальними результатами через 2–4 тижні.',
      },
      {
        q: 'Скільки зайвих калорій потрібно для набору м\'язів?',
        a: 'Профіцит 300–500 ккал/день вище TDEE забезпечує набір м\'язів із мінімальним накопиченням жиру. Більший надлишок призводить до більшого набору жиру без пропорційного росту м\'язів. Оптимально поєднувати помірний профіцит із силовими тренуваннями і достатньою кількістю білка (1,6–2,2 г/кг).',
      },
      {
        q: 'У чому різниця між TDEE і BMR?',
        a: 'BMR — витрати калорій у стані повного спокою, мінімум для виживання. TDEE = BMR × коефіцієнт активності (від 1,2 для сидячого способу життя до 1,9 для дуже активного). TDEE — це те число калорій, на яке орієнтується ваш раціон.',
      },
      {
        q: 'Наскільки рівень активності впливає на добову норму?',
        a: 'Рівень активності — ключовий фактор. Малоактивна людина витрачає ~1,2 × BMR, а той, хто тренується двічі на день — 1,7–1,9 × BMR. При BMR 1600 ккал це різниця між ~1920 і ~3040 ккал на день.',
      },
      {
        q: 'Чи потрібно також рахувати макронутрієнти?',
        a: 'Для управління вагою головне — контроль загальної кількості калорій. Проте макронутрієнти теж важливі: достатня кількість білка (1,6–2,2 г/кг) зберігає м\'язи при дефіциті, а співвідношення вуглеводів і жирів впливає на енергію та гормональний фон.',
      },
      {
        q: 'Як часто перераховувати TDEE?',
        a: 'Перераховуйте кожні 4–8 тижнів або при зміні ваги на 5+ кг, значній зміні рівня активності, або якщо вага перестала змінюватися попри дотримання норми. При схудненні TDEE знижується — це нормально, і норму калорій потрібно коригувати.',
      },
    ],
  },
  fr: {
    description: 'Notre calculatrice de calories gratuite utilise la formule Mifflin-St Jeor — la plus précise recommandée par les professionnels de la nutrition — pour estimer votre métabolisme de base (BMR) et vos dépenses énergétiques totales (TDEE). Entrez vos données pour connaître vos besoins caloriques.\n\nLes besoins caloriques évoluent avec le temps en fonction du poids, de l\'âge et du niveau d\'activité. Recalculez toutes les 4 à 8 semaines ou après un changement significatif de poids. Pour de meilleurs résultats, associez le suivi calorique à un apport en protéines suffisant (1,6–2,2 g par kg) pour préserver la masse musculaire.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Qu\'est-ce que le TDEE ?',
        a: 'Le TDEE (Dépense Énergétique Totale Journalière) est le nombre total de calories brûlées en une journée, en tenant compte du métabolisme de base et de l\'activité physique. C\'est le nombre de calories nécessaires pour maintenir votre poids actuel.',
      },
      {
        q: 'Qu\'est-ce que le BMR ?',
        a: 'Le BMR (Métabolisme de Base) est le nombre de calories que votre corps consomme au repos complet pour maintenir les fonctions vitales : respiration, circulation et production cellulaire.',
      },
      {
        q: 'Quelle formule est utilisée ?',
        a: 'La formule Mifflin-St Jeor (1990). Hommes : BMR = 10 × poids(kg) + 6,25 × taille(cm) − 5 × âge + 5. Femmes : BMR = 10 × poids(kg) + 6,25 × taille(cm) − 5 × âge − 161.',
      },
      {
        q: 'De combien réduire les calories pour perdre du poids ?',
        a: 'Un déficit de 500 kcal par jour entraîne environ 0,5 kg de perte de poids par semaine. Il n\'est pas recommandé de descendre en dessous de 1 200 kcal/jour sans suivi médical.',
      },
      {
        q: 'Ces chiffres sont-ils exacts ?',
        a: 'Ce sont des estimations. Le métabolisme individuel varie selon la génétique, les hormones et le sommeil. Utilisez ces chiffres comme point de départ et ajustez selon vos résultats réels après 2 à 4 semaines.',
      },
      {
        q: 'Combien de calories supplémentaires pour prendre du muscle ?',
        a: 'Un surplus de 300 à 500 kcal par jour au-dessus de votre TDEE favorise la prise musculaire avec un minimum de graisse. Au-delà, l\'excédent se stocke principalement en graisse. Combinez un léger surplus avec la musculation et un apport protéique suffisant (1,6–2,2 g/kg).',
      },
      {
        q: 'Quelle est la différence entre TDEE et BMR ?',
        a: 'Le BMR est votre dépense calorique au repos complet — le minimum pour survivre. Le TDEE est le BMR multiplié par un facteur d\'activité (de 1,2 pour sédentaire à 1,9 pour très actif). Le TDEE est le chiffre que vous utilisez pour définir vos apports alimentaires.',
      },
      {
        q: 'Dans quelle mesure le niveau d\'activité affecte-t-il les besoins caloriques ?',
        a: 'Le niveau d\'activité a un impact majeur. Une personne sédentaire brûle environ 1,2× son BMR, tandis qu\'une personne très active peut brûler 1,7–1,9× son BMR. Pour un BMR de 1 600 kcal, cela représente la différence entre ~1 920 et ~3 040 kcal par jour.',
      },
      {
        q: 'Faut-il aussi compter les macronutriments ?',
        a: 'Pour la gestion du poids, compter les calories est l\'étape la plus importante. Cependant, les macronutriments comptent aussi : un apport suffisant en protéines (1,6–2,2 g/kg) préserve la masse musculaire en déficit, et le ratio glucides/lipides influence les niveaux d\'énergie et l\'équilibre hormonal.',
      },
      {
        q: 'À quelle fréquence recalculer son TDEE ?',
        a: 'Recalculez toutes les 4 à 8 semaines, ou lorsque vous perdez ou prenez 5+ kg, changez significativement votre niveau d\'activité, ou constatez que votre poids stagne malgré le respect de vos objectifs. En perdant du poids, votre TDEE diminue — c\'est normal et il faut ajuster l\'apport calorique en conséquence.',
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas kalorijų skaičiuotuvas naudoja Mifflin-St Jeor lygtį — tiksliausią formulę, rekomenduojamą mitybos specialistų — baziniam medžiagų apykaitos greičiui (BMR) ir bendrai dienos energijos sąnaudoms (TDEE) apskaičiuoti. Įveskite savo duomenis ir sužinokite, kiek kalorijų reikia norint išlaikyti, sumažinti ar padidinti svorį.\n\nKalorijų poreikis keičiasi laikui bėgant, kintant svoriui, amžiui ir aktyvumo lygiui. Perskaičiuokite kas 4–8 savaites arba po reikšmingo kūno svorio pokyčio. Kalorijų kontrolę derinkite su pakankamu baltymų vartojimu (1,6–2,2 g/kg), kad išsaugotumėte raumenų masę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra TDEE?',
        a: 'TDEE (bendra dienos energijos sąnaudos) — tai bendras kalorijų kiekis, kurį kūnas sudegina per dieną, atsižvelgiant į bazinį medžiagų apykaitą ir fizinį aktyvumą.',
      },
      {
        q: 'Kas yra BMR?',
        a: 'BMR (bazinis medžiagų apykaitos greitis) — kalorijų kiekis, kurio reikia organizmui visiško poilsio metu pagrindinėms funkcijoms palaikyti: kvėpavimui, kraujotakai ir ląstelių veiklai.',
      },
      {
        q: 'Kokia formulė naudojama?',
        a: 'Mifflin-St Jeor formulė (1990). Vyrams: BMR = 10 × svoris(kg) + 6,25 × ūgis(cm) − 5 × amžius + 5. Moterims: BMR = 10 × svoris(kg) + 6,25 × ūgis(cm) − 5 × amžius − 161.',
      },
      {
        q: 'Kiek kalorijų sumažinti norint numesti svorio?',
        a: '500 kcal per dieną deficitas lemia apie 0,5 kg svorio netekimą per savaitę. Nerekomenduojama leistis žemiau 1200 kcal/dieną be medicininės priežiūros.',
      },
      {
        q: 'Ar šie skaičiai tikslūs?',
        a: 'Tai įvertinimai. Individualus metabolizmas priklauso nuo genetikos, hormonų ir miego. Naudokite šiuos skaičius kaip pradžios tašką ir koreguokite pagal realius rezultatus po 2–4 savaičių.',
      },
      {
        q: 'Kiek papildomų kalorijų reikia norint auginti raumenis?',
        a: '300–500 kcal per dieną perteklius virš TDEE skatina raumenų augimą su minimaliu riebalų kaupimu. Didesnis perteklius daugiausia kaupiamas kaip riebalai. Derinkite nedidelį perteklių su jėgos treniruotėmis ir pakankamu baltymų kiekiu (1,6–2,2 g/kg).',
      },
      {
        q: 'Koks skirtumas tarp TDEE ir BMR?',
        a: 'BMR yra kalorijų sąnaudos visiško poilsio metu — minimumas išgyvenimui. TDEE = BMR × aktyvumo koeficientas (nuo 1,2 sėsliems iki 1,9 labai aktyviems). TDEE yra skaičius, kurį naudojate planuodami maisto racioną.',
      },
      {
        q: 'Kaip aktyvumo lygis veikia dienos kalorijų poreikį?',
        a: 'Aktyvumo lygis turi didelę reikšmę. Sėslus žmogus sudegina ~1,2× savo BMR, o labai aktyvus — 1,7–1,9× BMR. Esant BMR 1600 kcal, tai skirtumas tarp ~1920 ir ~3040 kcal per dieną.',
      },
      {
        q: 'Ar reikia skaičiuoti ir makromaistines medžiagas?',
        a: 'Svorio valdymui svarbiausia stebėti bendrą kalorijų kiekį. Tačiau makromaistinės medžiagos taip pat svarbios: pakankamas baltymų kiekis (1,6–2,2 g/kg) išsaugo raumenis esant deficitui, o angliavandenių ir riebalų santykis veikia energiją ir hormonų pusiausvyrą.',
      },
      {
        q: 'Kaip dažnai perskaičiuoti TDEE?',
        a: 'Perskaičiuokite kas 4–8 savaites arba kai svoris pakinta 5+ kg, reikšmingai keičiasi aktyvumo lygis, arba kai svoris nesikeičia nepaisant tikslų laikymosi. Mažinant svorį TDEE mažėja — tai normalu ir reiškia, kad reikia koreguoti kalorijų normą.',
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
    alternates: buildAlternates(locale, '/calculator/calories'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CaloriesPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/calories`,
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
        <CaloriesCalculator locale={locale} />

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
