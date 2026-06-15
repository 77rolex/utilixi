import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BmiCalculator from './BmiCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string>> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' }, { href: '/calculator/body-fat', label: 'Body Fat Calculator' }, { href: '/calculator/water-intake', label: 'Water Intake Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }],
  ru: [{ href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' }, { href: '/calculator/body-fat', label: 'Калькулятор жира' }, { href: '/calculator/water-intake', label: 'Норма воды в день' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }],
  uk: [{ href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' }, { href: '/calculator/body-fat', label: 'Калькулятор жиру' }, { href: '/calculator/water-intake', label: 'Норма води на день' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }],
  fr: [{ href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' }, { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' }, { href: '/calculator/water-intake', label: 'Apport en eau quotidien' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }],
  lt: [{ href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' }, { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' }, { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'BMI Calculator — Body Mass Index Online',
    description: 'Free BMI calculator. Calculate your Body Mass Index instantly using metric (cm/kg) or imperial (ft/lbs) units and find out your weight category.',
    h1: 'BMI Calculator',
    subtitle: 'Find out if your weight is healthy based on your height and body mass.',
  },
  ru: {
    title: 'Калькулятор ИМТ — индекс массы тела онлайн',
    description: 'Бесплатный калькулятор ИМТ онлайн. Рассчитайте индекс массы тела в метрической или имперской системе и узнайте свою весовую категорию.',
    h1: 'Калькулятор ИМТ',
    subtitle: 'Узнайте, соответствует ли ваш вес норме по росту и индексу массы тела.',
  },
  uk: {
    title: 'Калькулятор ІМТ — індекс маси тіла онлайн',
    description: 'Безкоштовний калькулятор ІМТ онлайн. Розрахуйте індекс маси тіла в метричній або імперській системі та дізнайтеся свою вагову категорію.',
    h1: 'Калькулятор ІМТ',
    subtitle: 'Дізнайтеся, чи відповідає ваша вага нормі за зростом та індексом маси тіла.',
  },
  fr: {
    title: 'Calculatrice IMC — Indice de Masse Corporelle',
    description: 'Calculatrice IMC gratuite. Calculez votre indice de masse corporelle en unités métriques ou impériales et découvrez votre catégorie de poids.',
    h1: 'Calculatrice IMC',
    subtitle: 'Découvrez si votre poids est sain selon votre taille et votre masse corporelle.',
  },
  lt: {
    title: 'KMI Skaičiuotuvas — Kūno Masės Indeksas',
    description: 'Nemokamas KMI skaičiuotuvas. Apskaičiuokite kūno masės indeksą metrinėje arba imperinėje sistemoje ir sužinokite savo svorio kategoriją.',
    h1: 'KMI Skaičiuotuvas',
    subtitle: 'Sužinokite, ar jūsų svoris yra sveikas pagal ūgį ir kūno masę.',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our free BMI calculator to find out your Body Mass Index. Simply enter your height and weight in metric (cm/kg) or imperial (ft/lbs) units. BMI is a widely used screening tool to identify whether a person is underweight, normal weight, overweight, or obese.\n\nWhile BMI is a convenient first screening measure, it has important limitations. It does not distinguish between muscle and fat, and does not account for age, ethnic background, or fat distribution. Always consult a healthcare professional for a complete health assessment.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is BMI?',
        a: 'BMI (Body Mass Index) is a value derived from a person\'s weight and height. It is calculated as weight (kg) divided by height squared (m²). BMI is used as a screening tool to categorise weight status.',
      },
      {
        q: 'What are the BMI categories?',
        a: 'The standard BMI categories are: Underweight (BMI below 18.5), Normal weight (18.5–24.9), Overweight (25–29.9), and Obese (30 and above).',
      },
      {
        q: 'Is BMI an accurate measure of health?',
        a: 'BMI is a useful screening tool but not a direct measure of body fat or health. It does not account for muscle mass, bone density, age, or fat distribution. Athletes, for example, may have a high BMI due to muscle rather than fat.',
      },
      {
        q: 'What is the difference between metric and imperial BMI?',
        a: 'The metric formula is BMI = weight (kg) ÷ height² (m²). The imperial formula is BMI = 703 × weight (lbs) ÷ height² (inches²). Both give the same result.',
      },
      {
        q: 'What is a healthy BMI for adults?',
        a: 'For most adults, a BMI between 18.5 and 24.9 is considered healthy. A BMI below 18.5 may indicate undernutrition with associated health risks such as weakened immunity and bone loss. A BMI of 25–29.9 is overweight, and 30 or above is classified as obese with increased risk of heart disease, type 2 diabetes, and other conditions.',
      },
      {
        q: 'How can I lower my BMI?',
        a: 'BMI decreases when you lose body weight. The most effective approach combines a moderate caloric deficit (eating 300–500 kcal fewer per day than you burn), regular aerobic exercise (150+ minutes per week), strength training to preserve muscle mass, and adequate sleep. Rapid crash diets are counterproductive as they often cause muscle loss and metabolic slowdown.',
      },
      {
        q: 'Are there obesity classifications beyond BMI 30?',
        a: 'Yes. Obesity is further divided into three classes: Class I (BMI 30–34.9) — moderate health risk; Class II (BMI 35–39.9) — high health risk; Class III or "severe obesity" (BMI 40+) — very high health risk. Class III obesity is associated with significantly elevated rates of cardiovascular disease, sleep apnea, and type 2 diabetes.',
      },
      {
        q: 'Does BMI differ by gender?',
        a: 'The same BMI scale applies to both men and women. However, women naturally have a higher percentage of body fat than men at the same BMI. A BMI of 22 may represent 18% body fat in a man but 25% in a woman. This is why body fat percentage measurement provides more nuanced information than BMI alone.',
      },
      {
        q: 'Is BMI reliable for older adults?',
        a: 'BMI tends to underestimate health risks in older adults because muscle mass naturally declines with age (sarcopenia), while fat mass increases — without the total weight necessarily changing. Many researchers suggest that a BMI of 22–27 may be more appropriate for adults over 65, and waist circumference is a useful additional marker.',
      },
      {
        q: 'Can children use the same BMI categories as adults?',
        a: 'No. For children and teenagers (ages 2–19), BMI is interpreted differently using BMI-for-age percentiles on growth charts. A child at the 85th–95th percentile is considered overweight, and above the 95th percentile is obese. Adult BMI categories do not apply to children.',
      },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором ИМТ, чтобы узнать свой индекс массы тела. Введите рост и вес в метрической (см/кг) или имперской (фут/фунт) системе. ИМТ — это широко используемый показатель для оценки весовой категории.\n\nИМТ — удобный инструмент первичного скрининга, но он имеет важные ограничения. Он не различает мышечную массу и жир, не учитывает возраст, этническую принадлежность и характер распределения жира. Для полноценной оценки здоровья обязательно проконсультируйтесь с врачом.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое ИМТ?',
        a: 'ИМТ (индекс массы тела) — это показатель, рассчитываемый как вес (кг), разделённый на квадрат роста (м²). Используется для оценки весовой категории человека.',
      },
      {
        q: 'Какие категории ИМТ существуют?',
        a: 'Стандартные категории: Недостаточный вес (ИМТ менее 18,5), Нормальный вес (18,5–24,9), Избыточный вес (25–29,9), Ожирение (30 и выше).',
      },
      {
        q: 'Является ли ИМТ точным показателем здоровья?',
        a: 'ИМТ — полезный инструмент скрининга, но не прямой показатель жира в организме. Он не учитывает мышечную массу, плотность костей, возраст и распределение жира. Например, у спортсменов ИМТ может быть высоким из-за мышц.',
      },
      {
        q: 'В чём разница между метрической и имперской системой?',
        a: 'Метрическая формула: ИМТ = вес (кг) ÷ рост² (м²). Имперская: ИМТ = 703 × вес (фунты) ÷ рост² (дюймы²). Результат одинаков.',
      },
      {
        q: 'Какой ИМТ считается нормальным для взрослых?',
        a: 'Для большинства взрослых нормальным считается ИМТ от 18,5 до 24,9. ИМТ ниже 18,5 может свидетельствовать о дефиците веса с повышенным риском для иммунной системы и костей. ИМТ 25–29,9 — избыточный вес, 30 и выше — ожирение с повышенным риском сердечно-сосудистых заболеваний и диабета.',
      },
      {
        q: 'Как снизить ИМТ?',
        a: 'ИМТ снижается при уменьшении массы тела. Наиболее эффективный подход: умеренный дефицит калорий (300–500 ккал/день), регулярные аэробные нагрузки (150+ минут в неделю), силовые тренировки для сохранения мышц и достаточный сон. Жёсткие диеты контрпродуктивны — они вызывают потерю мышц и замедление обмена веществ.',
      },
      {
        q: 'Есть ли классификации ожирения выше ИМТ 30?',
        a: 'Да. Ожирение делится на три класса: Класс I (ИМТ 30–34,9) — умеренный риск; Класс II (ИМТ 35–39,9) — высокий риск; Класс III или «морбидное ожирение» (ИМТ 40+) — очень высокий риск сердечно-сосудистых заболеваний, апноэ сна и диабета 2 типа.',
      },
      {
        q: 'Различается ли ИМТ у мужчин и женщин?',
        a: 'Одна и та же шкала применяется для мужчин и женщин. Однако у женщин при одинаковом ИМТ естественно больше жировой ткани. ИМТ 22 может соответствовать 18% жира у мужчины, но 25% — у женщины. Поэтому измерение процента жира даёт более точную картину, чем ИМТ.',
      },
      {
        q: 'Надёжен ли ИМТ для пожилых людей?',
        a: 'ИМТ часто недооценивает риски для пожилых, потому что с возрастом мышечная масса снижается (саркопения), а жировая — растёт, без изменения общего веса. Ряд исследователей считает оптимальным ИМТ 22–27 для людей старше 65 лет, а обхват талии — полезным дополнительным показателем.',
      },
      {
        q: 'Применимы ли взрослые категории ИМТ к детям?',
        a: 'Нет. Для детей и подростков (2–19 лет) ИМТ интерпретируется через центильные кривые (ИМТ для возраста). 85–95-й центиль — избыточный вес, выше 95-го — ожирение. Взрослые категории ИМТ к детям не применяются.',
      },
    ],
  },
  uk: {
    description: 'Скористайтеся безкоштовним калькулятором ІМТ, щоб дізнатися свій індекс маси тіла. Введіть зріст і вагу в метричній (см/кг) або імперській (фут/фунт) системі. ІМТ — широко використовуваний показник для оцінки вагової категорії.\n\nХоча ІМТ є зручним інструментом первинного скринінгу, він має важливі обмеження. Він не розрізняє м\'язову масу та жир, не враховує вік, етнічне походження та характер розподілу жиру. Для повноцінної оцінки здоров\'я обов\'язково зверніться до лікаря.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке ІМТ?',
        a: 'ІМТ (індекс маси тіла) — показник, що розраховується як вага (кг), поділена на квадрат зросту (м²). Використовується для оцінки вагової категорії.',
      },
      {
        q: 'Які категорії ІМТ існують?',
        a: 'Стандартні категорії: Недостатня вага (ІМТ менше 18,5), Нормальна вага (18,5–24,9), Надмірна вага (25–29,9), Ожиріння (30 і вище).',
      },
      {
        q: 'Чи є ІМТ точним показником здоров\'я?',
        a: 'ІМТ — корисний інструмент скринінгу, але не прямий показник жирової маси. Він не враховує м\'язову масу, щільність кісток та розподіл жиру.',
      },
      {
        q: 'У чому різниця між метричною та імперською системами?',
        a: 'Метрична формула: ІМТ = вага (кг) ÷ зріст² (м²). Імперська: ІМТ = 703 × вага (фунти) ÷ зріст² (дюйми²).',
      },
      {
        q: 'Який ІМТ вважається нормальним для дорослих?',
        a: 'Для більшості дорослих нормальним вважається ІМТ від 18,5 до 24,9. ІМТ нижче 18,5 може свідчити про дефіцит ваги з підвищеним ризиком для імунної системи та кісток. ІМТ 25–29,9 — надмірна вага, 30 і вище — ожиріння з підвищеним ризиком серцево-судинних захворювань і діабету.',
      },
      {
        q: 'Як знизити ІМТ?',
        a: 'ІМТ знижується при зменшенні маси тіла. Найефективніший підхід: помірний дефіцит калорій (300–500 ккал/день), регулярні аеробні навантаження (150+ хвилин на тиждень), силові тренування для збереження м\'язів і достатній сон. Жорсткі дієти контрпродуктивні — вони спричиняють втрату м\'язів і сповільнення обміну речовин.',
      },
      {
        q: 'Чи існують класифікації ожиріння вище ІМТ 30?',
        a: 'Так. Ожиріння поділяється на три класи: Клас I (ІМТ 30–34,9) — помірний ризик; Клас II (ІМТ 35–39,9) — високий ризик; Клас III або «морбідне ожиріння» (ІМТ 40+) — дуже високий ризик серцево-судинних захворювань, апное сну та діабету 2 типу.',
      },
      {
        q: 'Чи відрізняється ІМТ у чоловіків і жінок?',
        a: 'Та сама шкала застосовується для чоловіків і жінок. Однак у жінок при однаковому ІМТ природно більше жирової тканини. ІМТ 22 може відповідати 18% жиру у чоловіка, але 25% — у жінки. Тому вимірювання відсотка жиру дає більш точну картину.',
      },
      {
        q: 'Чи надійний ІМТ для літніх людей?',
        a: 'ІМТ часто недооцінює ризики для літніх, бо з віком м\'язова маса знижується (саркопенія), а жирова зростає без зміни загальної ваги. Ряд дослідників вважає оптимальним ІМТ 22–27 для людей старше 65 років, а обхват талії — корисним додатковим показником.',
      },
      {
        q: 'Чи застосовні дорослі категорії ІМТ до дітей?',
        a: 'Ні. Для дітей і підлітків (2–19 років) ІМТ інтерпретується через центильні криві (ІМТ для віку). 85–95-й центиль — надмірна вага, вище 95-го — ожиріння. Дорослі категорії ІМТ до дітей не застосовуються.',
      },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice IMC gratuite pour connaître votre Indice de Masse Corporelle. Entrez votre taille et votre poids en unités métriques (cm/kg) ou impériales (pi/lbs). L\'IMC est un outil de dépistage largement utilisé pour évaluer la catégorie de poids.\n\nBien que l\'IMC soit un outil de dépistage pratique, il présente des limites importantes. Il ne distingue pas la masse musculaire de la graisse et ne tient pas compte de l\'âge, de l\'origine ethnique ou de la répartition des graisses. Consultez toujours un professionnel de santé pour une évaluation complète.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Qu\'est-ce que l\'IMC ?',
        a: 'L\'IMC (Indice de Masse Corporelle) est une valeur calculée à partir du poids et de la taille d\'une personne : poids (kg) divisé par la taille au carré (m²). Il sert à catégoriser le statut pondéral.',
      },
      {
        q: 'Quelles sont les catégories d\'IMC ?',
        a: 'Les catégories standard sont : Insuffisance pondérale (IMC inférieur à 18,5), Poids normal (18,5–24,9), Surpoids (25–29,9) et Obésité (30 et plus).',
      },
      {
        q: 'L\'IMC est-il une mesure précise de la santé ?',
        a: 'L\'IMC est un outil de dépistage utile, mais pas une mesure directe de la graisse corporelle. Il ne tient pas compte de la masse musculaire, de la densité osseuse, de l\'âge ou de la répartition des graisses.',
      },
      {
        q: 'Quelle est la différence entre les systèmes métrique et impérial ?',
        a: 'Formule métrique : IMC = poids (kg) ÷ taille² (m²). Formule impériale : IMC = 703 × poids (lbs) ÷ taille² (pouces²). Les deux donnent le même résultat.',
      },
      {
        q: 'Quel est un IMC sain pour un adulte ?',
        a: 'Pour la plupart des adultes, un IMC entre 18,5 et 24,9 est considéré comme sain. Un IMC inférieur à 18,5 indique une insuffisance pondérale, associée à des risques pour le système immunitaire et les os. Un IMC de 25 à 29,9 correspond à un surpoids, et 30 ou plus à une obésité avec risques accrus de maladies cardiovasculaires et de diabète.',
      },
      {
        q: 'Comment réduire son IMC ?',
        a: 'L\'IMC diminue avec la perte de poids. L\'approche la plus efficace combine un déficit calorique modéré (300–500 kcal/jour), une activité aérobique régulière (150+ minutes par semaine), la musculation pour préserver la masse musculaire et un sommeil suffisant. Les régimes draconiens sont contre-productifs car ils entraînent une perte musculaire et un ralentissement du métabolisme.',
      },
      {
        q: 'Existe-t-il des classifications au-delà de l\'obésité IMC 30 ?',
        a: 'Oui. L\'obésité est divisée en trois classes : Classe I (IMC 30–34,9) — risque modéré ; Classe II (IMC 35–39,9) — risque élevé ; Classe III ou « obésité morbide » (IMC 40+) — risque très élevé de maladies cardiovasculaires, d\'apnée du sommeil et de diabète de type 2.',
      },
      {
        q: 'L\'IMC diffère-t-il selon le sexe ?',
        a: 'La même échelle s\'applique aux hommes et aux femmes. Cependant, les femmes ont naturellement un pourcentage de graisse corporelle plus élevé que les hommes au même IMC. Un IMC de 22 peut représenter 18% de graisse chez un homme, mais 25% chez une femme. C\'est pourquoi la mesure du pourcentage de graisse corporelle fournit des informations plus précises.',
      },
      {
        q: 'L\'IMC est-il fiable pour les personnes âgées ?',
        a: 'L\'IMC a tendance à sous-estimer les risques chez les personnes âgées car la masse musculaire diminue naturellement avec l\'âge (sarcopénie), tandis que la masse grasse augmente sans changement total du poids. Un IMC de 22 à 27 est souvent recommandé pour les plus de 65 ans, et le tour de taille est un indicateur complémentaire utile.',
      },
      {
        q: 'Les catégories d\'IMC adultes s\'appliquent-elles aux enfants ?',
        a: 'Non. Pour les enfants et adolescents (2–19 ans), l\'IMC est interprété via des courbes de percentiles (IMC pour l\'âge). Le 85e–95e percentile correspond à un surpoids, au-dessus du 95e à une obésité. Les catégories adultes ne s\'appliquent pas aux enfants.',
      },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą KMI skaičiuotuvą, kad sužinotumėte savo kūno masės indeksą. Įveskite ūgį ir svorį metrinėje (cm/kg) arba imperinėje (pėd./svar.) sistemoje. KMI yra plačiai naudojamas patikros įrankis svorio kategorijai nustatyti.\n\nNors KMI yra patogus pirminis patikros rodiklis, jis turi svarbių apribojimų. Jis neskiria raumenų masės nuo riebalų ir neatsižvelgia į amžių, etninę kilmę ar riebalų pasiskirstymą. Visada konsultuokitės su sveikatos priežiūros specialistu dėl išsamaus sveikatos įvertinimo.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra KMI?',
        a: 'KMI (kūno masės indeksas) — tai vertė, apskaičiuojama kaip svoris (kg) padalytas iš ūgio kvadrato (m²). Naudojamas svorio kategorijos nustatymui.',
      },
      {
        q: 'Kokios yra KMI kategorijos?',
        a: 'Standartinės kategorijos: Nepakankamas svoris (KMI mažiau nei 18,5), Normalus svoris (18,5–24,9), Antsvoris (25–29,9), Nutukimas (30 ir daugiau).',
      },
      {
        q: 'Ar KMI yra tikslus sveikatos rodiklis?',
        a: 'KMI yra naudingas patikros įrankis, bet ne tiesioginis kūno riebalų matas. Jis neatsižvelgia į raumenų masę, kaulų tankį, amžių ar riebalų pasiskirstymą.',
      },
      {
        q: 'Koks skirtumas tarp metrinės ir imperinės sistemų?',
        a: 'Metrinė formulė: KMI = svoris (kg) ÷ ūgis² (m²). Imperinė: KMI = 703 × svoris (svarai) ÷ ūgis² (coliai²).',
      },
      {
        q: 'Koks KMI laikomas sveiku suaugusiesiems?',
        a: 'Daugumai suaugusiųjų sveikas KMI yra nuo 18,5 iki 24,9. KMI žemiau 18,5 gali rodyti nepakankamą svorį su padidėjusia imuninės sistemos ir kaulų rizika. KMI 25–29,9 yra antsvoris, o 30 ir daugiau — nutukimas su padidėjusia širdies ir kraujagyslių ligų bei diabeto rizika.',
      },
      {
        q: 'Kaip sumažinti KMI?',
        a: 'KMI mažėja kartu su kūno svoriu. Veiksmingiausias metodas: vidutinis kalorijų deficitas (300–500 kcal/dieną), reguliari aerobinė veikla (150+ minučių per savaitę), jėgos treniruotės raumenų išsaugojimui ir pakankamas miegas. Griežtos dietos yra kontraproduktyvios — jos sukelia raumenų netekimą ir medžiagų apykaitos sulėtėjimą.',
      },
      {
        q: 'Ar yra nutukimo klasifikacijos virš KMI 30?',
        a: 'Taip. Nutukimas skirstomas į tris klases: I klasė (KMI 30–34,9) — vidutinė rizika; II klasė (KMI 35–39,9) — didelė rizika; III klasė arba „morbidinis nutukimas" (KMI 40+) — labai didelė širdies ir kraujagyslių ligų, miego apnėjos ir II tipo diabeto rizika.',
      },
      {
        q: 'Ar KMI skiriasi vyrams ir moterims?',
        a: 'Ta pati skalė taikoma tiek vyrams, tiek moterims. Tačiau moterys natūraliai turi didesnį kūno riebalų procentą nei vyrai esant tam pačiam KMI. KMI 22 vyrams gali reikšti 18% riebalų, o moterims — 25%. Todėl kūno riebalų procentas suteikia tikslesnius duomenis.',
      },
      {
        q: 'Ar KMI patikimas vyresnio amžiaus žmonėms?',
        a: 'KMI dažnai neįvertina rizikos vyresnio amžiaus žmonėms, nes su amžiumi raumenų masė mažėja (sarkopenija), o riebalų masė didėja be bendro svorio pokyčio. Daugelis tyrėjų rekomenduoja KMI 22–27 vyresniems nei 65 metų, o juosmens apimtis yra naudingas papildomas rodiklis.',
      },
      {
        q: 'Ar suaugusiųjų KMI kategorijos taikomos vaikams?',
        a: 'Ne. Vaikams ir paaugliams (2–19 metų) KMI interpretuojamas naudojant amžiaus percentilių kreives. 85–95 percentilis atitinka antsvorio, virš 95 percentilio — nutukimo kategorijas. Suaugusiųjų KMI kategorijos vaikams netaikomos.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/bmi', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BmiPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/bmi`,
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <RelatedTools locale={locale} tools={related} />
        <BmiCalculator locale={locale} initialUnit={sp.unit} initialHeightCm={sp.heightCm} initialHeightFt={sp.heightFt} initialHeightIn={sp.heightIn} initialWeight={sp.weight} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}

          <AdPlaceholder locale={locale} size="banner" />
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
