import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import IdealWeightCalculator from './IdealWeightCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' }, { href: '/calculator/body-fat', label: 'Body Fat Calculator' }, { href: '/calculator/water-intake', label: 'Water Intake Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' }, { href: '/calculator/body-fat', label: 'Калькулятор жира' }, { href: '/calculator/water-intake', label: 'Норма воды в день' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' }, { href: '/calculator/body-fat', label: 'Калькулятор жиру' }, { href: '/calculator/water-intake', label: 'Норма води на день' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' }, { href: '/calculator/body-fat', label: 'Calculatrice de graisse corporelle' }, { href: '/calculator/water-intake', label: 'Apport en eau quotidien' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' }, { href: '/calculator/body-fat', label: 'Kūno riebalų skaičiuotuvas' }, { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Ideal Weight Calculator — Find Your Healthy Weight',
    description: 'Free ideal weight calculator. Find your healthy weight range by height and gender using 4 medical formulas (Devine, Hamwi, Robinson, Miller) and BMI guidelines.',
    h1: 'Ideal Weight Calculator',
    subtitle: 'Find your healthy weight range by height and gender using four medical formulas.',
  },
  ru: {
    title: 'Калькулятор идеального веса — норма по росту и полу',
    description: 'Бесплатный калькулятор идеального веса онлайн. Рассчитайте нормальный вес по росту и полу по 4 медицинским формулам (Девайн, Хамви, Робинсон, Миллер).',
    h1: 'Калькулятор идеального веса',
    subtitle: 'Узнайте нормальный диапазон веса по росту и полу по четырём медицинским формулам.',
  },
  uk: {
    title: 'Калькулятор ідеальної ваги — норма за зростом і статтю',
    description: 'Безкоштовний калькулятор ідеальної ваги онлайн. Розрахуйте нормальну вагу за зростом і статтю за 4 медичними формулами (Девайн, Хамві, Робінсон, Міллер).',
    h1: 'Калькулятор ідеальної ваги',
    subtitle: 'Дізнайтеся нормальний діапазон ваги за зростом і статтю за чотирма медичними формулами.',
  },
  fr: {
    title: 'Calculatrice du Poids Idéal — Poids Santé par Taille',
    description: 'Calculatrice du poids idéal gratuite. Trouvez votre poids santé selon votre taille et votre sexe grâce à 4 formules médicales (Devine, Hamwi, Robinson, Miller).',
    h1: 'Calculatrice du Poids Idéal',
    subtitle: 'Trouvez votre plage de poids santé selon votre taille et votre sexe via quatre formules médicales.',
  },
  lt: {
    title: 'Idealaus Svorio Skaičiuotuvas — Sveikas Svoris pagal Ūgį',
    description: 'Nemokamas idealaus svorio skaičiuotuvas. Raskite sveiko svorio intervalą pagal ūgį ir lytį naudodami 4 medicinines formules (Devine, Hamwi, Robinson, Miller).',
    h1: 'Idealaus Svorio Skaičiuotuvas',
    subtitle: 'Raskite sveiko svorio intervalą pagal ūgį ir lytį naudodami keturias medicinines formules.',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free ideal weight calculator helps you find a healthy weight range for your height and gender. Enter your height in metric (cm) or imperial (ft/in) units, select your gender, and get results from four widely used medical formulas — Devine, Hamwi, Robinson, and Miller — alongside the WHO-recommended healthy BMI range (18.5–24.9).\n\nNo single formula defines "perfect" weight. These tools are reference points used in medicine for dosing calculations and nutritional assessment. Your ideal weight in practice depends on muscle mass, bone structure, and overall fitness — not just height and gender.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is ideal body weight?',
        a: 'Ideal body weight (IBW) is an estimated weight range considered optimal for a person\'s height and gender. It is commonly used in medicine to determine drug dosages and assess nutritional status. There is no single "perfect" number — IBW is a useful reference range, not a strict target.',
      },
      {
        q: 'What formulas does this calculator use?',
        a: 'The calculator uses four established medical formulas: Devine (1974), Hamwi (1964), Robinson (1983), and Miller (1983). All four were developed for adults and use height in inches above 5 feet as the key variable. The results differ slightly because each formula was derived from different population samples.',
      },
      {
        q: 'What is the difference between the BMI healthy range and the formula results?',
        a: 'The BMI-based range (18.5–24.9) gives the weight interval within which a person is considered to have a healthy body mass index. The four formulas calculate a single target weight per gender. In practice, both approaches give similar values, but the BMI range is broader and accounts for natural body variation.',
      },
      {
        q: 'Does gender affect ideal weight?',
        a: 'Yes. Women naturally have a higher percentage of body fat and a different body composition than men of the same height. All four formulas use a lower baseline weight for women, resulting in a lower ideal weight estimate compared to men of the same height.',
      },
      {
        q: 'What if my actual weight is above or below the ideal range?',
        a: 'Ideal weight is a reference guideline, not a strict health boundary. Many factors affect healthy weight: muscle mass, bone structure, age, and fitness level. If your weight differs significantly from the range, consult a doctor or registered dietitian — weight alone does not fully determine health status.',
      },
      {
        q: 'Which ideal weight formula is most commonly used in medicine?',
        a: 'The Devine formula (1974) is the most widely used in clinical settings, particularly for calculating drug dosages such as for chemotherapy and anesthesia. It was originally developed for men, with a modification for women. The other formulas (Hamwi, Robinson, Miller) were also widely used but are now mainly seen in nutritional and fitness contexts.',
      },
      {
        q: 'How much does height affect ideal weight?',
        a: 'Height is the primary driver of ideal weight in all four formulas. As a rough guide, each additional centimetre of height above 152 cm (5 ft) adds approximately 0.9–1.1 kg to the ideal weight for men, and 0.7–0.9 kg for women, depending on the formula used. Taller individuals have proportionally higher ideal weights.',
      },
      {
        q: 'What is the difference between ideal weight and healthy weight?',
        a: 'Ideal weight (from the four formulas) is a specific target value — a single number per gender and height. Healthy weight (from BMI 18.5–24.9) is a range. In practice, your healthy weight range is typically broader than the single ideal weight figure. Both are guidelines, not medical diagnoses.',
      },
      {
        q: 'Does age affect ideal weight calculations?',
        a: 'The four classic formulas do not adjust for age — they were developed primarily for adults aged 18–65. However, older adults (65+) tend to have less muscle mass and more body fat at the same weight. Some specialists suggest that a slightly higher body weight may be protective in elderly individuals, and waist circumference becomes a more relevant health marker.',
      },
      {
        q: 'Is my ideal weight the same as my goal weight?',
        a: 'Not necessarily. Your goal weight is a personal target based on how you feel, your fitness objectives, and health recommendations from your doctor. Your ideal weight (from formulas) is a statistical reference based on height and gender. For athletes with high muscle mass, the formula-based ideal weight may seem too low. Use ideal weight as a starting reference, then personalise with professional guidance.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор идеального веса помогает найти оптимальный диапазон веса для вашего роста и пола. Введите рост в метрической (см) или имперской (фут/дюйм) системе, выберите пол — и получите результаты по четырём медицинским формулам (Девайн, Хамви, Робинсон, Миллер), а также рекомендованный ВОЗ диапазон здорового ИМТ (18,5–24,9).\n\nНи одна формула не определяет «идеальный» вес точно. Это ориентиры, используемые в медицине для расчёта доз и оценки питания. Реальный оптимальный вес зависит от мышечной массы, костной структуры и общего физического состояния.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое идеальный вес?',
        a: 'Идеальный вес (ИВТ) — это расчётный диапазон веса, считающийся оптимальным для роста и пола человека. В медицине он используется для расчёта доз препаратов и оценки нутритивного статуса. Это ориентировочный показатель, а не строгая норма.',
      },
      {
        q: 'Какие формулы используются в калькуляторе?',
        a: 'Калькулятор использует четыре медицинские формулы: Девайн (1974), Хамви (1964), Робинсон (1983) и Миллер (1983). Все они разработаны для взрослых и основаны на росте сверх 152 см (5 футов). Небольшое расхождение между формулами объясняется тем, что они получены на разных выборках населения.',
      },
      {
        q: 'В чём разница между диапазоном ИМТ и результатами формул?',
        a: 'Диапазон по ИМТ (18,5–24,9) показывает интервал веса, при котором индекс массы тела считается здоровым. Четыре формулы рассчитывают одно целевое значение веса с учётом пола. На практике результаты схожи, но диапазон ИМТ шире и учитывает естественную вариацию телосложения.',
      },
      {
        q: 'Влияет ли пол на идеальный вес?',
        a: 'Да. У женщин от природы выше доля жировой ткани и иной состав тела, чем у мужчин того же роста. Все четыре формулы используют меньшее базовое значение для женщин, поэтому идеальный вес для женщин ниже, чем для мужчин того же роста.',
      },
      {
        q: 'Что делать, если мой реальный вес отличается от нормы?',
        a: 'Идеальный вес — это ориентир, а не жёсткая граница здоровья. На оптимальный вес влияют мышечная масса, костная структура, возраст и образ жизни. Если ваш вес значительно отличается от расчётного диапазона, проконсультируйтесь с врачом или диетологом.',
      },
      {
        q: 'Какая формула чаще всего используется в медицине?',
        a: 'Формула Девайна (1974) наиболее широко применяется в клинической практике, особенно для расчёта доз препаратов (химиотерапия, анестезия). Изначально разработана для мужчин с поправкой для женщин. Формулы Хамви, Робинсона и Миллера сейчас используются преимущественно в контексте питания и фитнеса.',
      },
      {
        q: 'Насколько сильно рост влияет на идеальный вес?',
        a: 'Рост — основной фактор всех четырёх формул. Каждый дополнительный сантиметр роста сверх 152 см добавляет примерно 0,9–1,1 кг к идеальному весу мужчин и 0,7–0,9 кг — для женщин, в зависимости от формулы. У высоких людей пропорционально выше идеальный вес.',
      },
      {
        q: 'В чём разница между идеальным весом и здоровым весом?',
        a: 'Идеальный вес (по формулам) — это конкретное целевое значение: одно число для данного пола и роста. Здоровый вес (ИМТ 18,5–24,9) — это диапазон. На практике диапазон здорового веса шире одного значения идеального веса. Оба показателя — ориентиры, а не медицинские диагнозы.',
      },
      {
        q: 'Влияет ли возраст на расчёт идеального веса?',
        a: 'Четыре классические формулы не учитывают возраст — они разработаны для взрослых 18–65 лет. У пожилых (65+) снижается мышечная масса и растёт доля жира при неизменном весе. Ряд специалистов считает, что слегка повышенный вес может быть защитным у пожилых людей, а обхват талии становится более значимым показателем.',
      },
      {
        q: 'Совпадает ли идеальный вес с целевым весом для похудения?',
        a: 'Не обязательно. Целевой вес — личная цель, основанная на самочувствии, спортивных задачах и рекомендациях врача. Идеальный вес по формулам — статистический ориентир по росту и полу. Для спортсменов с большой мышечной массой формульный идеальный вес может казаться заниженным. Используйте его как отправную точку, а затем консультируйтесь со специалистом.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор ідеальної ваги допомагає знайти оптимальний діапазон ваги для вашого зросту і статі. Введіть зріст у метричній (см) або імперській (фут/дюйм) системі, оберіть стать — і отримайте результати за чотирма медичними формулами (Девайн, Хамві, Робінсон, Міллер) та рекомендований ВООЗ діапазон здорового ІМТ (18,5–24,9).\n\nЖодна формула не визначає «ідеальну» вагу точно. Це орієнтири, що використовуються в медицині для розрахунку доз і оцінки харчування. Реальна оптимальна вага залежить від м\'язової маси, кісткової структури та загального фізичного стану.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке ідеальна вага?',
        a: 'Ідеальна вага тіла — це розрахунковий діапазон ваги, що вважається оптимальним для зросту і статі людини. У медицині використовується для розрахунку доз препаратів та оцінки нутритивного статусу. Це орієнтовний показник, а не суворо встановлена норма.',
      },
      {
        q: 'Які формули використовує калькулятор?',
        a: 'Калькулятор використовує чотири медичні формули: Девайн (1974), Хамві (1964), Робінсон (1983) та Міллер (1983). Усі вони розроблені для дорослих і базуються на зрості понад 152 см (5 футів). Незначне розходження між формулами пояснюється різними вибірками населення.',
      },
      {
        q: 'У чому різниця між діапазоном ІМТ і результатами формул?',
        a: 'Діапазон за ІМТ (18,5–24,9) показує інтервал ваги, при якому індекс маси тіла вважається здоровим. Чотири формули розраховують одне цільове значення ваги з урахуванням статі. На практиці результати схожі, але діапазон ІМТ ширший і враховує природну варіацію будови тіла.',
      },
      {
        q: 'Чи впливає стать на ідеальну вагу?',
        a: 'Так. У жінок природно вища частка жирової тканини та інший склад тіла, ніж у чоловіків того самого зросту. Усі чотири формули використовують менше базове значення для жінок, тому ідеальна вага для жінок нижча, ніж для чоловіків того самого зросту.',
      },
      {
        q: 'Що робити, якщо моя реальна вага відрізняється від норми?',
        a: 'Ідеальна вага — це орієнтир, а не жорстка межа здоров\'я. На оптимальну вагу впливають м\'язова маса, кісткова структура, вік і спосіб життя. Якщо ваша вага значно відрізняється від розрахункового діапазону, проконсультуйтеся з лікарем або дієтологом.',
      },
      {
        q: 'Яка формула найчастіше використовується в медицині?',
        a: 'Формула Девайна (1974) найширше застосовується в клінічній практиці, особливо для розрахунку доз препаратів (хіміотерапія, анестезія). Спочатку розроблена для чоловіків із поправкою для жінок. Формули Хамві, Робінсона та Міллера зараз використовуються переважно у контексті харчування та фітнесу.',
      },
      {
        q: 'Наскільки сильно зріст впливає на ідеальну вагу?',
        a: 'Зріст — основний фактор усіх чотирьох формул. Кожен додатковий сантиметр зросту понад 152 см додає приблизно 0,9–1,1 кг до ідеальної ваги чоловіків і 0,7–0,9 кг — для жінок, залежно від формули. У високих людей пропорційно вища ідеальна вага.',
      },
      {
        q: 'У чому різниця між ідеальною вагою та здоровою вагою?',
        a: 'Ідеальна вага (за формулами) — це конкретне цільове значення: одне число для даної статі та зросту. Здорова вага (ІМТ 18,5–24,9) — це діапазон. На практиці діапазон здорової ваги ширший за одне значення ідеальної ваги. Обидва показники — орієнтири, а не медичні діагнози.',
      },
      {
        q: 'Чи впливає вік на розрахунок ідеальної ваги?',
        a: 'Чотири класичні формули не враховують вік — вони розроблені для дорослих 18–65 років. У літніх людей (65+) знижується м\'язова маса і зростає частка жиру при незмінній вазі. Ряд фахівців вважає, що дещо підвищена вага може бути захисною у людей похилого віку, а обхват талії стає більш значущим показником.',
      },
      {
        q: 'Чи збігається ідеальна вага з цільовою вагою для схуднення?',
        a: 'Не обов\'язково. Цільова вага — особиста мета, заснована на самопочутті, спортивних задачах і рекомендаціях лікаря. Ідеальна вага за формулами — статистичний орієнтир за зростом і статтю. Для спортсменів із великою м\'язовою масою формульна ідеальна вага може здаватися заниженою. Використовуйте її як відправну точку, а потім консультуйтеся зі спеціалістом.',
      },
    ],
  },
  fr: {
    description: "Notre calculatrice du poids idéal gratuite vous aide à trouver une plage de poids sain pour votre taille et votre sexe. Entrez votre taille en unités métriques (cm) ou impériales (pi/po), sélectionnez votre sexe — et obtenez les résultats de quatre formules médicales reconnues (Devine, Hamwi, Robinson, Miller) ainsi que la plage IMC sain recommandée par l'OMS (18,5–24,9).\n\nAucune formule ne définit le poids « parfait » avec précision. Ces outils sont des points de référence utilisés en médecine pour les calculs de dosage et l'évaluation nutritionnelle. Votre poids idéal en pratique dépend de la masse musculaire, de la structure osseuse et de la condition physique générale.",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Qu\'est-ce que le poids idéal ?',
        a: "Le poids idéal (PI) est une plage de poids estimée comme optimale pour la taille et le sexe d'une personne. En médecine, il est couramment utilisé pour calculer les posologies et évaluer l'état nutritionnel. Il s'agit d'une fourchette de référence, pas d'un objectif strict.",
      },
      {
        q: 'Quelles formules ce calculateur utilise-t-il ?',
        a: "Le calculateur utilise quatre formules médicales établies : Devine (1974), Hamwi (1964), Robinson (1983) et Miller (1983). Toutes sont conçues pour les adultes et utilisent la taille en pouces au-dessus de 5 pieds (152 cm). Les légères différences entre les formules s'expliquent par les échantillons de population utilisés.",
      },
      {
        q: "Quelle est la différence entre la plage IMC sain et les résultats des formules ?",
        a: "La plage basée sur l'IMC (18,5–24,9) indique l'intervalle de poids pour lequel l'indice de masse corporelle est considéré sain. Les quatre formules calculent un poids cible unique selon le sexe. En pratique, les résultats sont proches, mais la plage IMC est plus large et tient compte des variations naturelles de la morphologie.",
      },
      {
        q: 'Le sexe influe-t-il sur le poids idéal ?',
        a: "Oui. Les femmes ont naturellement un pourcentage de graisse corporelle plus élevé et une composition corporelle différente de celle des hommes de même taille. Les quatre formules utilisent une valeur de base plus faible pour les femmes, ce qui donne un poids idéal inférieur à celui des hommes de même taille.",
      },
      {
        q: 'Que faire si mon poids réel diffère de la plage idéale ?',
        a: "Le poids idéal est une référence, pas une frontière stricte de santé. De nombreux facteurs influent sur le poids optimal : masse musculaire, structure osseuse, âge et niveau d'activité physique. Si votre poids diffère significativement de la plage calculée, consultez un médecin ou un diététicien.",
      },
      {
        q: 'Quelle formule est la plus utilisée en médecine ?',
        a: "La formule de Devine (1974) est la plus utilisée en clinique, notamment pour calculer les posologies de médicaments (chimiothérapie, anesthésie). Elle a été développée à l'origine pour les hommes, avec une adaptation pour les femmes. Les formules de Hamwi, Robinson et Miller sont maintenant principalement utilisées dans les contextes nutritionnels et de fitness.",
      },
      {
        q: 'Dans quelle mesure la taille influence-t-elle le poids idéal ?',
        a: 'La taille est le principal facteur de toutes les formules. En règle générale, chaque centimètre supplémentaire au-dessus de 152 cm (5 pieds) ajoute environ 0,9 à 1,1 kg au poids idéal des hommes, et 0,7 à 0,9 kg pour les femmes, selon la formule. Les personnes de grande taille ont un poids idéal proportionnellement plus élevé.',
      },
      {
        q: 'Quelle est la différence entre poids idéal et poids santé ?',
        a: "Le poids idéal (selon les formules) est une valeur cible spécifique — un seul chiffre pour un sexe et une taille donnés. Le poids santé (IMC 18,5–24,9) est une plage. En pratique, la plage de poids santé est plus large que la valeur de poids idéal. Les deux sont des repères, non des diagnostics médicaux.",
      },
      {
        q: "L'âge influe-t-il sur le calcul du poids idéal ?",
        a: "Les quatre formules classiques n'ajustent pas pour l'âge — elles ont été développées pour les adultes de 18 à 65 ans. Chez les personnes âgées (65+), la masse musculaire diminue et la masse grasse augmente à poids égal. Certains spécialistes suggèrent qu'un poids légèrement plus élevé peut être protecteur chez les personnes âgées, et que le tour de taille devient un indicateur plus pertinent.",
      },
      {
        q: 'Mon poids idéal correspond-il à mon objectif de poids ?',
        a: "Pas nécessairement. Votre objectif de poids est une cible personnelle basée sur votre ressenti, vos objectifs sportifs et les recommandations de votre médecin. Le poids idéal (selon les formules) est une référence statistique basée sur la taille et le sexe. Pour les athlètes avec une masse musculaire élevée, le poids idéal calculé peut sembler trop bas. Utilisez-le comme point de départ, puis personnalisez avec l'aide d'un professionnel.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas idealaus svorio skaičiuotuvas padės rasti sveiką svorio intervalą pagal jūsų ūgį ir lytį. Įveskite ūgį metrinėje (cm) arba imperinėje (pėd./col.) sistemoje, pasirinkite lytį — ir gaukite rezultatus pagal keturias medicinine formules (Devine, Hamwi, Robinson, Miller) bei PSO rekomenduojamą sveiką KMI intervalą (18,5–24,9).\n\nNė viena formulė tiksliai nenustato „tobulo" svorio. Tai orientyrai, naudojami medicinoje dozavimo skaičiavimams ir mitybos vertinimui. Jūsų praktinis optimalus svoris priklauso nuo raumenų masės, kaulų struktūros ir bendros fizinės būklės.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra idealus kūno svoris?',
        a: 'Idealus kūno svoris (IKS) — tai apskaičiuotas svorio intervalas, laikomas optimaliu pagal žmogaus ūgį ir lytį. Medicinoje jis naudojamas vaistų dozėms skaičiuoti ir mitybos būklei vertinti. Tai orientacinis rodiklis, o ne griežta norma.',
      },
      {
        q: 'Kokias formules naudoja šis skaičiuotuvas?',
        a: 'Skaičiuotuvas naudoja keturias nusistovėjusias medicinine formules: Devine (1974), Hamwi (1964), Robinson (1983) ir Miller (1983). Visos jos skirtos suaugusiesiems ir remiasi ūgiu coliais virš 5 pėdų (152 cm). Nedideli skirtumai tarp formulių atsiranda dėl skirtingų populiacijų imčių.',
      },
      {
        q: 'Koks skirtumas tarp sveiko KMI intervalo ir formulių rezultatų?',
        a: 'KMI pagrįstas intervalas (18,5–24,9) rodo svorio ribas, kuriose kūno masės indeksas laikomas sveiku. Keturios formulės apskaičiuoja vieną tikslinį svorį pagal lytį. Praktiškai rezultatai yra panašūs, tačiau KMI intervalas yra platesnis ir atsižvelgia į natūralią kūno sudėjimo variaciją.',
      },
      {
        q: 'Ar lytis įtakoja idealų svorį?',
        a: 'Taip. Moterims natūraliai būdingas didesnis kūno riebalų procentas ir kitokia kūno sudėtis nei to paties ūgio vyrams. Visos keturios formulės naudoja mažesnę bazinę reikšmę moterims, todėl moterų idealus svoris yra mažesnis nei to paties ūgio vyrų.',
      },
      {
        q: 'Ką daryti, jei mano tikrasis svoris skiriasi nuo idealaus intervalo?',
        a: 'Idealus svoris yra orientyras, o ne griežta sveikatos riba. Optimalų svorį lemia daugelis veiksnių: raumenų masė, kaulų struktūra, amžius ir fizinis aktyvumas. Jei jūsų svoris gerokai skiriasi nuo apskaičiuoto intervalo, pasitarkite su gydytoju arba dietologu.',
      },
      {
        q: 'Kuri formulė dažniausiai naudojama medicinoje?',
        a: 'Devine formulė (1974) plačiausiai naudojama klinikiniu požiūriu, ypač skaičiuojant vaistų dozes (chemoterapija, anestezija). Iš pradžių sukurta vyrams su pataisymu moterims. Hamwi, Robinson ir Miller formulės dabar daugiausia naudojamos mitybos ir fitneso kontekstuose.',
      },
      {
        q: 'Kaip stipriai ūgis veikia idealų svorį?',
        a: 'Ūgis yra pagrindinis visų keturių formulių veiksnys. Kiekvienas papildomas centimetras virš 152 cm (5 pėdų) prideda apytiksliai 0,9–1,1 kg prie vyrų idealaus svorio ir 0,7–0,9 kg moterims, priklausomai nuo formulės. Aukštesni žmonės turi proporcingai didesnį idealų svorį.',
      },
      {
        q: 'Koks skirtumas tarp idealaus svorio ir sveiko svorio?',
        a: 'Idealus svoris (pagal formules) yra konkretus tikslinis dydis — vienas skaičius pagal lytį ir ūgį. Sveikas svoris (KMI 18,5–24,9) yra intervalas. Praktiškai sveiko svorio intervalas yra platesnis nei viena idealaus svorio reikšmė. Abu yra orientyrai, o ne medicininė diagnozė.',
      },
      {
        q: 'Ar amžius veikia idealaus svorio skaičiavimus?',
        a: 'Keturios klasikinės formulės neprisitaiko prie amžiaus — jos sukurtos 18–65 metų suaugusiesiems. Vyresnio amžiaus žmonėms (65+) raumenų masė mažėja, o riebalų masė auga esant tam pačiam svoriui. Kai kurie specialistai mano, kad šiek tiek didesnis svoris gali būti apsauginis vyresniems žmonėms, o juosmens apimtis tampa reikšmingesniu rodikliu.',
      },
      {
        q: 'Ar idealus svoris sutampa su mano tiksliniu svoriu?',
        a: 'Nebūtinai. Tikslinis svoris yra asmeninis tikslas, pagrįstas savijautu, sporto tikslais ir gydytojo rekomendacijomis. Idealus svoris pagal formules yra statistinis orientyras pagal ūgį ir lytį. Didelio raumenų masės sportininkams formulinis idealus svoris gali atrodyti per mažas. Naudokite jį kaip pradinį tašką, o tada konsultuokitės su specialistu.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/ideal-weight', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function IdealWeightPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/ideal-weight`,
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
        <IdealWeightCalculator locale={locale} />

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
