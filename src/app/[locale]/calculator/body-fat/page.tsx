import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BodyFatCalculator from './BodyFatCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' }, { href: '/calculator/water-intake', label: 'Water Intake Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' }, { href: '/calculator/water-intake', label: 'Норма воды в день' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' }, { href: '/calculator/water-intake', label: 'Норма води на день' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' }, { href: '/calculator/water-intake', label: 'Apport en eau quotidien' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' }, { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Body Fat Calculator — US Navy Method Online',
    description: 'Free body fat percentage calculator using the US Navy method. Enter your measurements to find your body fat % and fitness category for men and women.',
    h1: 'Body Fat Calculator',
    subtitle: 'Measure your body fat percentage using the US Navy method — just neck, waist, and hip measurements.',
  },
  ru: {
    title: 'Калькулятор жира в теле — метод ВМФ США онлайн',
    description: 'Бесплатный калькулятор процента жира в теле по методу ВМФ США. Введите замеры и узнайте % жира и категорию физической формы для мужчин и женщин.',
    h1: 'Калькулятор % жира в теле',
    subtitle: 'Рассчитайте процент жира в теле методом ВМФ США по замерам шеи, талии и бёдер.',
  },
  uk: {
    title: 'Калькулятор жиру в тілі — метод ВМС США онлайн',
    description: 'Безкоштовний калькулятор відсотка жиру в тілі за методом ВМС США. Введіть виміри та дізнайтеся % жиру та категорію фізичної форми.',
    h1: 'Калькулятор % жиру в тілі',
    subtitle: 'Розрахуйте відсоток жиру в тілі методом ВМС США за вимірами шиї, талії та стегон.',
  },
  fr: {
    title: 'Calculatrice de graisse corporelle — méthode US Navy',
    description: 'Calculatrice gratuite du pourcentage de graisse corporelle selon la méthode US Navy. Entrez vos mensurations pour connaître votre % de graisse.',
    h1: 'Calculatrice de graisse corporelle',
    subtitle: 'Mesurez votre pourcentage de graisse corporelle selon la méthode US Navy avec vos mensurations.',
  },
  lt: {
    title: 'Kūno riebalų skaičiuotuvas — JAV karinio jūrų laivyno metodas',
    description: 'Nemokamas kūno riebalų procentų skaičiuotuvas pagal JAV karinio jūrų laivyno metodą. Įveskite matmenis ir sužinokite riebalų % ir fizinę kategoriją.',
    h1: 'Kūno riebalų skaičiuotuvas',
    subtitle: 'Išmatuokite kūno riebalų procentą JAV karinio jūrų laivyno metodu pagal kaklo, juosmens matmenis.',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our body fat calculator uses the US Navy circumference method — one of the most accurate non-equipment-based formulas. Simply enter your neck, waist (and hip for women), and height measurements to get your body fat percentage and see which fitness category you fall into.\n\nBody fat percentage is a more useful health metric than weight or BMI alone. Two people with the same weight and height can have very different body composition: one may be lean and muscular while the other carries excess fat. Knowing your body fat percentage helps you set meaningful fitness goals and track real progress.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is body fat percentage calculated?',
        a: 'This calculator uses the US Navy method. For men: 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450. For women, hip measurement is also included. All measurements are in centimetres.',
      },
      {
        q: 'What is a healthy body fat percentage?',
        a: 'For men, 14–20% is considered fitness level and 21–24% acceptable. For women, 21–28% is fitness level and 29–35% acceptable. Essential fat (minimum needed for survival) is around 3–5% for men and 10–13% for women.',
      },
      {
        q: 'Where should I measure waist circumference?',
        a: 'Measure your waist at the narrowest point, usually around the navel level. For the most accurate result, take the measurement in the morning before eating, standing upright with relaxed muscles.',
      },
      {
        q: 'Is the US Navy method accurate?',
        a: 'The US Navy method is accurate to within 3–4% compared to DEXA scans, making it one of the best field methods. It is less accurate for very muscular or very obese individuals. For clinical precision, DEXA or hydrostatic weighing is recommended.',
      },
      {
        q: 'What is the most accurate way to measure body fat?',
        a: 'DEXA (dual-energy X-ray absorptiometry) is considered the gold standard, with accuracy within 1–2%. Hydrostatic (underwater) weighing and Bod Pod (air displacement plethysmography) are also highly accurate. Skinfold callipers measured by a trained professional give around 3% accuracy. The US Navy circumference method (used here) is a practical field estimate with about 3–4% accuracy.',
      },
      {
        q: 'How does high body fat affect my health?',
        a: 'Excess body fat — especially visceral (abdominal) fat — is associated with increased risk of type 2 diabetes, heart disease, high blood pressure, sleep apnea, certain cancers, and metabolic syndrome. Even modest fat loss of 5–10% of body weight significantly reduces these risks. It\'s not just the amount but the location of fat that matters — abdominal fat is more metabolically active and harmful than subcutaneous fat.',
      },
      {
        q: 'What is visceral fat and why is it dangerous?',
        a: 'Visceral fat is the fat stored deep inside the abdomen, surrounding internal organs like the liver, pancreas, and intestines. Unlike subcutaneous fat (under the skin), visceral fat secretes inflammatory hormones and cytokines that disrupt insulin signalling and promote cardiovascular disease. High waist circumference is the main external indicator of excess visceral fat.',
      },
      {
        q: 'How can I reduce my body fat percentage?',
        a: 'The most effective approach: create a moderate caloric deficit (300–500 kcal/day), eat adequate protein (1.6–2.2 g/kg) to preserve muscle, do regular resistance training 3–4× per week, and include cardio for additional caloric expenditure. Aim to lose 0.5–1% of body weight per week — faster rates increase muscle loss. Sleep of 7–9 hours per night is also critical as sleep deprivation increases cortisol and fat storage.',
      },
      {
        q: 'Does high muscle mass affect the accuracy of this calculator?',
        a: 'Yes. The US Navy circumference method can underestimate body fat in very muscular individuals because large muscle mass can increase neck and waist measurements in ways that don\'t reflect true fat content. Conversely, it may overestimate fat in individuals with small bone structure. For highly trained athletes, DEXA or skinfold measurements are more reliable.',
      },
      {
        q: 'What is the difference between BMI and body fat percentage?',
        a: 'BMI (Body Mass Index) is calculated from height and weight only — it cannot distinguish between fat and muscle. Body fat percentage directly measures the proportion of fat in your total body mass. Two people with identical BMIs can have very different body fat percentages depending on their muscle mass. Body fat percentage is generally considered a more accurate health indicator than BMI, especially for athletes.',
      },
    ],
  },
  ru: {
    description: 'Калькулятор использует метод Военно-морского флота США — один из наиболее точных методов определения % жира без специального оборудования. Введите замеры шеи, талии (и бёдер для женщин) и роста, чтобы получить результат.\n\nПроцент жира в теле — более информативный показатель здоровья, чем вес или ИМТ. Двое людей с одинаковым весом и ростом могут иметь совершенно разный состав тела: один — стройный и мускулистый, другой — с избытком жира. Знание % жира помогает ставить осмысленные фитнес-цели и отслеживать реальный прогресс.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как рассчитывается % жира в теле?',
        a: 'Используется метод ВМФ США. Для мужчин: 495 ÷ (1,0324 − 0,19077 × log10(талия − шея) + 0,15456 × log10(рост)) − 450. Для женщин дополнительно учитывается замер бёдер. Все замеры в сантиметрах.',
      },
      {
        q: 'Какой % жира считается нормальным?',
        a: 'Для мужчин 14–20% — уровень фитнеса, 21–24% — допустимый. Для женщин 21–28% — фитнес, 29–35% — допустимый. Незаменимый жир (минимум для выживания) — около 3–5% у мужчин и 10–13% у женщин.',
      },
      {
        q: 'Где измерять обхват талии?',
        a: 'Измеряйте талию в самом узком месте, обычно на уровне пупка. Для точности измеряйте утром натощак, стоя прямо с расслабленными мышцами.',
      },
      {
        q: 'Насколько точен метод ВМФ США?',
        a: 'Метод ВМФ США обеспечивает точность в пределах 3–4% по сравнению со сканированием DEXA. Менее точен для очень мускулистых или тучных людей. Для клинической точности рекомендуется DEXA или гидростатическое взвешивание.',
      },
      {
        q: 'Какой метод измерения жира наиболее точен?',
        a: 'DEXA (двухэнергетическая рентгеновская абсорбциометрия) считается золотым стандартом с точностью до 1–2%. Гидростатическое взвешивание и BodPod также высокоточны. Калиперометрия (измерение кожных складок) опытным специалистом даёт точность около 3%. Метод ВМФ США (используемый здесь) — практичная полевая оценка с точностью ~3–4%.',
      },
      {
        q: 'Как высокий % жира влияет на здоровье?',
        a: 'Избыток жира, особенно висцерального (абдоминального), повышает риск диабета 2 типа, сердечно-сосудистых заболеваний, гипертонии, апноэ сна и метаболического синдрома. Даже снижение веса на 5–10% значительно снижает эти риски. Важно не только количество, но и расположение жира — абдоминальный жир более метаболически активен и опасен, чем подкожный.',
      },
      {
        q: 'Что такое висцеральный жир и чем он опасен?',
        a: 'Висцеральный жир — жир, расположенный глубоко в брюшной полости вокруг внутренних органов (печень, поджелудочная железа, кишечник). В отличие от подкожного жира, он выделяет воспалительные гормоны и цитокины, нарушающие чувствительность к инсулину и способствующие сердечно-сосудистым заболеваниям. Увеличенный обхват талии — главный внешний признак избытка висцерального жира.',
      },
      {
        q: 'Как снизить % жира в теле?',
        a: 'Наиболее эффективный подход: умеренный дефицит калорий (300–500 ккал/день), достаточное потребление белка (1,6–2,2 г/кг) для сохранения мышц, регулярные силовые тренировки 3–4 раза в неделю и кардио для дополнительного расхода калорий. Цель — снижение веса 0,5–1% в неделю. Сон 7–9 часов критически важен: его недостаток повышает кортизол и способствует накоплению жира.',
      },
      {
        q: 'Влияет ли большая мышечная масса на точность расчёта?',
        a: 'Да. Метод ВМФ США может занижать % жира у очень мускулистых людей, потому что большая мышечная масса увеличивает замеры шеи и талии способами, не отражающими реальное содержание жира. Для профессиональных атлетов надёжнее использовать DEXA или калиперометрию.',
      },
      {
        q: 'В чём разница между ИМТ и % жира в теле?',
        a: 'ИМТ рассчитывается только по росту и весу — он не может различить жир и мышцы. Процент жира напрямую измеряет долю жира в общей массе тела. Двое людей с одинаковым ИМТ могут иметь совершенно разный % жира в зависимости от мышечной массы. % жира — более точный показатель здоровья, особенно для спортсменов.',
      },
    ],
  },
  uk: {
    description: 'Калькулятор використовує метод ВМС США — один із найточніших методів визначення % жиру без спеціального обладнання. Введіть виміри шиї, талії (та стегон для жінок) і зросту, щоб отримати результат.\n\nВідсоток жиру в тілі — більш інформативний показник здоров\'я, ніж вага або ІМТ. Двоє людей з однаковою вагою та зростом можуть мати зовсім різний склад тіла: один — стрункий і м\'язистий, інший — з надлишком жиру. Знання % жиру допомагає ставити осмислені фітнес-цілі та відстежувати реальний прогрес.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як розраховується % жиру в тілі?',
        a: 'Використовується метод ВМС США. Для чоловіків: 495 ÷ (1,0324 − 0,19077 × log10(талія − шия) + 0,15456 × log10(зріст)) − 450. Для жінок додатково враховується вимір стегон. Всі виміри в сантиметрах.',
      },
      {
        q: 'Який % жиру вважається нормальним?',
        a: 'Для чоловіків 14–20% — рівень фітнесу, 21–24% — допустимий. Для жінок 21–28% — фітнес, 29–35% — допустимий. Незамінний жир — близько 3–5% у чоловіків і 10–13% у жінок.',
      },
      {
        q: 'Де вимірювати обхват талії?',
        a: 'Вимірюйте талію у найвужчому місці, зазвичай на рівні пупка. Для точності вимірюйте вранці натщесерце, стоячи прямо з розслабленими м\'язами.',
      },
      {
        q: 'Наскільки точний метод ВМС США?',
        a: 'Метод ВМС США забезпечує точність у межах 3–4% порівняно зі скануванням DEXA. Менш точний для дуже м\'язистих або огрядних людей. Для клінічної точності рекомендується DEXA або гідростатичне зважування.',
      },
      {
        q: 'Який метод вимірювання жиру найточніший?',
        a: 'DEXA (двохенергетична рентгенівська абсорбціометрія) вважається золотим стандартом з точністю до 1–2%. Гідростатичне зважування та BodPod також високоточні. Каліперометрія (вимірювання шкірних складок) досвідченим фахівцем дає точність близько 3%. Метод ВМС США — практична польова оцінка з точністю ~3–4%.',
      },
      {
        q: 'Як високий % жиру впливає на здоров\'я?',
        a: 'Надлишок жиру, особливо вісцерального (абдомінального), підвищує ризик діабету 2 типу, серцево-судинних захворювань, гіпертонії, апное сну та метаболічного синдрому. Навіть зниження ваги на 5–10% значно знижує ці ризики. Важливо не лише кількість, а й розташування жиру — абдомінальний жир метаболічно активніший і небезпечніший за підшкірний.',
      },
      {
        q: 'Що таке вісцеральний жир і чим він небезпечний?',
        a: 'Вісцеральний жир — жир, розташований глибоко в черевній порожнині навколо внутрішніх органів (печінка, підшлункова залоза, кишківник). На відміну від підшкірного жиру, він виділяє запальні гормони та цитокіни, що порушують чутливість до інсуліну та сприяють серцево-судинним захворюванням. Збільшений обхват талії — головна зовнішня ознака надлишку вісцерального жиру.',
      },
      {
        q: 'Як знизити % жиру в тілі?',
        a: 'Найефективніший підхід: помірний дефіцит калорій (300–500 ккал/день), достатнє споживання білка (1,6–2,2 г/кг) для збереження м\'язів, регулярні силові тренування 3–4 рази на тиждень і кардіо. Ціль — зниження ваги 0,5–1% на тиждень. Сон 7–9 годин критично важливий: його нестача підвищує кортизол і сприяє накопиченню жиру.',
      },
      {
        q: 'Чи впливає велика м\'язова маса на точність розрахунку?',
        a: 'Так. Метод ВМС США може занижувати % жиру у дуже м\'язистих людей, тому що велика м\'язова маса збільшує виміри шиї та талії способами, що не відображають реальний вміст жиру. Для професійних атлетів надійніше використовувати DEXA або каліперометрію.',
      },
      {
        q: 'У чому різниця між ІМТ і % жиру в тілі?',
        a: 'ІМТ розраховується лише за зростом і вагою — він не може розрізнити жир і м\'язи. Відсоток жиру безпосередньо вимірює частку жиру в загальній масі тіла. Двоє людей з однаковим ІМТ можуть мати зовсім різний % жиру залежно від м\'язової маси. % жиру — точніший показник здоров\'я, особливо для спортсменів.',
      },
    ],
  },
  fr: {
    description: 'Notre calculatrice utilise la méthode US Navy — l\'une des formules les plus précises sans équipement. Entrez vos mesures du cou, de la taille (et des hanches pour les femmes) et votre taille pour obtenir votre pourcentage de graisse corporelle.\n\nLe pourcentage de graisse corporelle est un indicateur de santé plus utile que le poids ou l\'IMC seuls. Deux personnes ayant le même poids et la même taille peuvent avoir des compositions corporelles très différentes. Connaître son pourcentage de graisse permet de fixer des objectifs fitness pertinents et de suivre de vrais progrès.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment le pourcentage de graisse est-il calculé ?',
        a: 'Cette calculatrice utilise la méthode US Navy. Pour les hommes : 495 ÷ (1,0324 − 0,19077 × log10(taille − cou) + 0,15456 × log10(hauteur)) − 450. Pour les femmes, la mesure des hanches est également incluse. Toutes les mesures sont en centimètres.',
      },
      {
        q: 'Quel est un pourcentage de graisse corporelle sain ?',
        a: 'Pour les hommes, 14–20% correspond au niveau fitness et 21–24% est acceptable. Pour les femmes, 21–28% est fitness et 29–35% acceptable. La graisse essentielle est d\'environ 3–5% pour les hommes et 10–13% pour les femmes.',
      },
      {
        q: 'Où mesurer le tour de taille ?',
        a: 'Mesurez votre taille au point le plus étroit, généralement au niveau du nombril. Pour plus de précision, prenez la mesure le matin à jeun, debout avec les muscles détendus.',
      },
      {
        q: 'La méthode US Navy est-elle précise ?',
        a: 'La méthode US Navy est précise à 3–4% par rapport aux scanners DEXA. Elle est moins précise pour les personnes très musclées ou très obèses. Pour une précision clinique, le DEXA ou la pesée hydrostatique est recommandé.',
      },
      {
        q: 'Quelle est la méthode la plus précise pour mesurer la graisse corporelle ?',
        a: 'Le DEXA (absorptiométrie à rayons X en double énergie) est considéré comme la référence avec une précision de 1–2%. La pesée hydrostatique et le Bod Pod sont également très précis. La mesure des plis cutanés par un professionnel donne environ 3% de précision. La méthode US Navy (utilisée ici) est une estimation de terrain pratique avec ~3–4% de précision.',
      },
      {
        q: 'Comment un pourcentage de graisse élevé affecte-t-il la santé ?',
        a: 'L\'excès de graisse, surtout viscérale (abdominale), est associé à un risque accru de diabète de type 2, maladies cardiovasculaires, hypertension, apnée du sommeil et syndrome métabolique. Même une perte de 5 à 10% du poids corporel réduit significativement ces risques. Ce n\'est pas seulement la quantité mais la localisation des graisses qui importe — la graisse abdominale est plus métaboliquement active et nuisible que la graisse sous-cutanée.',
      },
      {
        q: 'Qu\'est-ce que la graisse viscérale et pourquoi est-elle dangereuse ?',
        a: 'La graisse viscérale est stockée en profondeur dans l\'abdomen, autour des organes internes. Contrairement à la graisse sous-cutanée, elle sécrète des hormones inflammatoires qui perturbent la sensibilité à l\'insuline et favorisent les maladies cardiovasculaires. Un tour de taille élevé est le principal indicateur externe d\'un excès de graisse viscérale.',
      },
      {
        q: 'Comment réduire son pourcentage de graisse corporelle ?',
        a: 'L\'approche la plus efficace : créer un déficit calorique modéré (300–500 kcal/jour), consommer suffisamment de protéines (1,6–2,2 g/kg) pour préserver la masse musculaire, pratiquer la musculation 3–4 fois par semaine et ajouter du cardio. Visez une perte de 0,5–1% du poids corporel par semaine. Un sommeil de 7–9 heures est essentiel — le manque de sommeil augmente le cortisol et favorise le stockage des graisses.',
      },
      {
        q: 'Une grande masse musculaire affecte-t-elle la précision du calcul ?',
        a: 'Oui. La méthode US Navy peut sous-estimer la graisse corporelle chez les personnes très musclées car une grande masse musculaire peut augmenter les mesures du cou et de la taille sans refléter le contenu réel en graisse. Pour les athlètes, le DEXA ou la mesure des plis cutanés sont plus fiables.',
      },
      {
        q: 'Quelle est la différence entre l\'IMC et le pourcentage de graisse corporelle ?',
        a: 'L\'IMC est calculé uniquement à partir de la taille et du poids — il ne peut pas distinguer la graisse des muscles. Le pourcentage de graisse corporelle mesure directement la proportion de graisse dans la masse totale. Deux personnes avec le même IMC peuvent avoir des pourcentages de graisse très différents selon leur masse musculaire. Le pourcentage de graisse est généralement un indicateur de santé plus précis que l\'IMC, surtout pour les athlètes.',
      },
    ],
  },
  lt: {
    description: 'Mūsų skaičiuotuvas naudoja JAV karinio jūrų laivyno metodą — vieną tiksliausių be įrangos pagrįstų formulių. Įveskite kaklo, juosmens (ir klubų moterims) bei ūgio matmenis, kad gautumėte kūno riebalų procentą.\n\nKūno riebalų procentas yra informatyvesnis sveikatos rodiklis nei svoris ar KMI. Du žmonės su vienodu svoriu ir ūgiu gali turėti labai skirtingą kūno sudėtį: vienas — lieknas ir raumeningas, kitas — su riebalų pertekliumi. Riebalų procento žinojimas padeda kelti prasmingus fitneso tikslus ir sekti tikrą pažangą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip apskaičiuojamas kūno riebalų procentas?',
        a: 'Skaičiuotuvas naudoja JAV karinio jūrų laivyno metodą. Vyrams: 495 ÷ (1,0324 − 0,19077 × log10(juosmuo − kaklas) + 0,15456 × log10(ūgis)) − 450. Moterims taip pat įtraukiamas klubų matmuo. Visi matmenys centimetrais.',
      },
      {
        q: 'Koks kūno riebalų procentas yra sveikas?',
        a: 'Vyrams 14–20% laikoma fitneso lygiu, 21–24% priimtinu. Moterims 21–28% yra fitnesas, 29–35% priimtina. Būtinasis riebalas (minimalus išgyvenimui) yra apie 3–5% vyrams ir 10–13% moterims.',
      },
      {
        q: 'Kur matuoti juosmens apimtį?',
        a: 'Matuokite juosmenį siauriausioje vietoje, paprastai bambos lygyje. Tikslesniam rezultatui matuokite ryte prieš valgant, stovint tiesiai su atpalaiduotais raumenimis.',
      },
      {
        q: 'Ar JAV karinio jūrų laivyno metodas tikslus?',
        a: 'JAV karinio jūrų laivyno metodas tikslus iki 3–4% palyginti su DEXA skenavimais. Mažiau tikslus labai raumeningiems ar labai nutukusiems asmenims. Klinikiniam tikslumui rekomenduojamas DEXA arba hidrostatinis svėrimas.',
      },
      {
        q: 'Koks metodas yra tiksliausias kūno riebalams matuoti?',
        a: 'DEXA (dviejų energijų rentgeno absorpciometrija) laikoma auksiniu standartu su tikslumu iki 1–2%. Hidrostatinis svėrimas ir Bod Pod taip pat labai tikslūs. Odos raukšlių matavimas apmokyto specialisto suteikia apie 3% tikslumą. JAV karinio jūrų laivyno metodas (naudojamas čia) yra praktinis lauko įvertinimas su ~3–4% tikslumu.',
      },
      {
        q: 'Kaip didelis riebalų kiekis veikia sveikatą?',
        a: 'Riebalų perteklius, ypač visceraliniai (pilvo) riebalai, yra susijęs su padidėjusia 2 tipo diabeto, širdies ir kraujagyslių ligų, padidėjusio kraujospūdžio, miego apnėjos ir metabolinio sindromo rizika. Net 5–10% kūno svorio netekimas žymiai sumažina šias rizikas. Svarbu ne tik kiekis, bet ir riebalų vieta — pilvo riebalai yra metaboliškai aktyvesni ir kenksmingesni nei poodinis riebalas.',
      },
      {
        q: 'Kas yra visceraliniai riebalai ir kodėl jie pavojingi?',
        a: 'Visceraliniai riebalai saugomi giliai pilvo ertmėje aplink vidinius organus. Skirtingai nuo poodinių riebalų, jie išskiria uždegimo hormonus ir citokinus, kurie sutrikdo insulino jautrumą ir skatina širdies ir kraujagyslių ligas. Padidėjusi juosmens apimtis yra pagrindinis išorinis visceralinių riebalų pertekliaus rodiklis.',
      },
      {
        q: 'Kaip sumažinti kūno riebalų procentą?',
        a: 'Veiksmingiausias metodas: vidutinis kalorijų deficitas (300–500 kcal/dieną), pakankamas baltymų kiekis (1,6–2,2 g/kg) raumenims išsaugoti, reguliarios jėgos treniruotės 3–4 kartus per savaitę ir kardio. Siekite 0,5–1% svorio netekimo per savaitę. Miegas 7–9 val. yra labai svarbus — jo trūkumas didina kortizolio lygį ir skatina riebalų kaupimąsi.',
      },
      {
        q: 'Ar didelė raumenų masė veikia skaičiavimo tikslumą?',
        a: 'Taip. JAV karinio jūrų laivyno metodas gali neįvertinti riebalų labai raumeningiems žmonėms, nes didelė raumenų masė gali padidinti kaklo ir juosmens matmenis neatsižvelgiant į tikrąjį riebalų kiekį. Profesionaliems sportininkams patikimesnis DEXA arba odos raukšlių matavimas.',
      },
      {
        q: 'Koks skirtumas tarp KMI ir kūno riebalų procento?',
        a: 'KMI apskaičiuojamas tik pagal ūgį ir svorį — jis negali atskirti riebalų nuo raumenų. Kūno riebalų procentas tiesiogiai matuoja riebalų dalį bendrame kūno svoryje. Du žmonės su vienodu KMI gali turėti labai skirtingą riebalų procentą priklausomai nuo raumenų masės. Riebalų procentas paprastai yra tikslesnis sveikatos rodiklis nei KMI, ypač sportininkams.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/body-fat', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BodyFatPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/body-fat`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <BodyFatCalculator locale={locale} />

        <AdInline locale={locale} />
        <DisclaimerNote locale={locale} />
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
