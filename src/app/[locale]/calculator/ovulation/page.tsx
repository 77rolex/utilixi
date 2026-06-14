import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import OvulationCalculator from './OvulationCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/pregnancy', label: 'Pregnancy Calculator' }, { href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/ideal-weight', label: 'Ideal Weight Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator' }, { href: '/calculator/water-intake', label: 'Water Intake Calculator' }],
  ru: [{ href: '/calculator/pregnancy', label: 'Калькулятор беременности' }, { href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор идеального веса' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }, { href: '/calculator/water-intake', label: 'Норма воды в день' }],
  uk: [{ href: '/calculator/pregnancy', label: 'Калькулятор вагітності' }, { href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/ideal-weight', label: 'Калькулятор ідеальної ваги' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }, { href: '/calculator/water-intake', label: 'Норма води на день' }],
  fr: [{ href: '/calculator/pregnancy', label: 'Calculatrice de grossesse' }, { href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/ideal-weight', label: 'Poids Idéal' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }, { href: '/calculator/water-intake', label: 'Apport en eau quotidien' }],
  lt: [{ href: '/calculator/pregnancy', label: 'Nėštumo skaičiuotuvas' }, { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/ideal-weight', label: 'Idealaus svorio skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }, { href: '/calculator/water-intake', label: 'Vandens normos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Ovulation Calculator — Fertile Window & Due Date',
    description: 'Free ovulation calculator. Enter your last period date and cycle length to find your ovulation date, fertile window, next period, and estimated due date.',
    h1: 'Ovulation Calculator',
    subtitle: 'Calculate your ovulation date and 6-day fertile window from your last period and cycle length.',
  },
  ru: {
    title: 'Калькулятор овуляции — фертильное окно и ПДР',
    description: 'Бесплатный калькулятор овуляции. Введите дату последней менструации и длину цикла, чтобы узнать дату овуляции, фертильное окно и предполагаемую дату родов.',
    h1: 'Калькулятор овуляции',
    subtitle: 'Рассчитайте дату овуляции и 6-дневное фертильное окно по дате менструации и длине цикла.',
  },
  uk: {
    title: 'Калькулятор овуляції — фертильне вікно та ПДП',
    description: 'Безкоштовний калькулятор овуляції. Введіть дату останньої менструації та тривалість циклу, щоб дізнатися дату овуляції, фертильне вікно та передбачувану дату пологів.',
    h1: 'Калькулятор овуляції',
    subtitle: 'Розрахуйте дату овуляції та 6-денне фертильне вікно за датою менструації та тривалістю циклу.',
  },
  fr: {
    title: 'Calculateur d\'ovulation — Calculatrice Ovulation Gratuite',
    description: 'Calculateur d\'ovulation gratuit. Entrez la date de vos dernières règles et la durée du cycle pour trouver votre date d\'ovulation, fenêtre fertile de 6 jours et date prévue d\'accouchement.',
    h1: 'Calculateur d\'ovulation',
    subtitle: 'Calculez votre date d\'ovulation et la fenêtre fertile de 6 jours selon vos dernières règles.',
  },
  lt: {
    title: 'Ovuliacijos skaičiuotuvas — vaisingas langas ir gimdymo data',
    description: 'Nemokamas ovuliacijos skaičiuotuvas. Įveskite paskutinių mėnesinių datą ir ciklo trukmę, kad sužinotumėte ovuliacijos datą, vaisingą langą ir numatomą gimdymo datą.',
    h1: 'Ovuliacijos skaičiuotuvas',
    subtitle: 'Apskaičiuokite ovuliacijos datą ir 6 dienų vaisingą langą pagal mėnesinių datą ir ciklo trukmę.',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our ovulation calculator to plan or avoid pregnancy. Enter the first day of your last menstrual period (LMP) and your average cycle length to calculate your most likely ovulation date, the 6-day fertile window, when your next period is expected, and the estimated due date if conception occurs.\n\nOvulation timing is the most critical factor in conception. The egg survives only 12–24 hours after release, but sperm can remain viable for up to 5 days — making the days just before ovulation the most fertile. Tracking multiple methods (this calculator combined with BBT or OPK tests) gives the most reliable results.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is the ovulation date calculated?',
        a: 'Ovulation typically occurs 14 days before the next period. The calculator estimates it as: LMP date + (cycle length − 14). For a 28-day cycle, ovulation is around day 14. For a 30-day cycle, it would be around day 16.',
      },
      {
        q: 'What is the fertile window?',
        a: 'The fertile window spans 6 days: the 5 days before ovulation and the day of ovulation itself. Sperm can survive up to 5 days in the fallopian tubes, so intercourse in the days leading up to ovulation can result in pregnancy.',
      },
      {
        q: 'What cycle length should I enter?',
        a: 'Enter your average cycle length in days. A typical cycle is 21–35 days, with 28 days being the average. If your cycles vary, use the average of your last 3–6 cycles. This calculator supports cycle lengths from 21 to 35 days.',
      },
      {
        q: 'Is this calculator accurate?',
        a: 'This calculator provides estimates based on the average cycle. It is most accurate for women with regular cycles. Stress, illness, weight changes, or hormonal fluctuations can shift ovulation. For confirmed ovulation tracking, use ovulation predictor kits (OPKs) or basal body temperature (BBT) charting.',
      },
      {
        q: 'Can I get pregnant outside the fertile window?',
        a: 'It is theoretically possible but unlikely. Outside the 6-day fertile window, the probability of conception drops dramatically — below 1% on most days. The egg survives only 12–24 hours after ovulation, and without viable sperm already present in the fallopian tubes, fertilisation cannot occur. For contraception, however, always use reliable methods rather than relying solely on cycle timing.',
      },
      {
        q: 'How does cycle length affect when I ovulate?',
        a: 'Ovulation always occurs approximately 14 days before the next period — this "luteal phase" length is relatively constant at 12–16 days. What varies between women is the follicular phase (from period to ovulation). Shorter cycles (21–24 days) mean ovulation around day 7–10; longer cycles (35 days) mean ovulation around day 21. This is why women with short cycles may ovulate during or just after their period.',
      },
      {
        q: 'What are the physical signs of ovulation?',
        a: 'Common signs include: changes in cervical mucus (becoming clear, slippery, and stretchy like egg whites — called "egg white cervical mucus" or EWCM), a slight rise in basal body temperature (0.2–0.5°C), mild one-sided pelvic pain (Mittelschmerz), increased libido, and mild breast tenderness. Ovulation predictor kits (OPKs) detect the LH surge that triggers ovulation 24–36 hours before it occurs.',
      },
      {
        q: 'Can stress delay ovulation?',
        a: 'Yes. Significant physical or emotional stress can delay or suppress ovulation by disrupting the hormonal cascade (GnRH → FSH/LH) that triggers egg release. Extreme caloric restriction, intense athletic training, illness, and major life stress can all push ovulation later in the cycle or cause anovulatory cycles (no ovulation). This can make cycle tracking unreliable during stressful periods.',
      },
      {
        q: 'What is an ovulation predictor kit (OPK) and how does it work?',
        a: 'OPKs detect the LH (luteinising hormone) surge that occurs 24–36 hours before ovulation. A positive OPK result means ovulation is imminent — typically within 12–36 hours. OPKs are more precise than calendar methods for identifying the exact fertile window, especially for women with irregular cycles. Digital OPKs also measure oestrogen (E3G) and LH together, providing a wider fertile window detection.',
      },
      {
        q: 'Is it possible to ovulate without having a period?',
        a: 'Yes, ovulation can occur without a preceding period — for example, when ovulation returns after childbirth (before the first postpartum period), after stopping hormonal contraceptives, or after a prolonged amenorrhoea episode. This is why breastfeeding is not a reliable contraceptive method, and why pregnancy can occur seemingly "without" a period. Conversely, menstrual bleeding can occur without ovulation (anovulatory cycles).',
      },
      {
        q: 'How do I know if my cycles are regular enough for this calculator?',
        a: 'If your cycle varies by more than 7 days from month to month (e.g., sometimes 25 days, sometimes 35 days), this calculator\'s estimates will be less reliable. In this case, combine calendar tracking with daily OPK testing or BBT charting. If cycles are very irregular or you have not had a period for 3+ months, consult a gynaecologist — it may indicate PCOS, thyroid issues, or other hormonal conditions.',
      },
    ],
  },
  ru: {
    description: 'Используйте калькулятор овуляции для планирования или предотвращения беременности. Введите первый день последней менструации и длину цикла, чтобы рассчитать дату овуляции, фертильное окно, дату следующей менструации и предполагаемую дату родов.\n\nВремя овуляции — важнейший фактор зачатия. Яйцеклетка выживает лишь 12–24 часа после выхода, но сперматозоиды остаются жизнеспособными до 5 дней — поэтому дни непосредственно перед овуляцией наиболее фертильны. Сочетание калькулятора с ТБТ или тестами на овуляцию даёт наиболее надёжный результат.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как рассчитывается дата овуляции?',
        a: 'Овуляция обычно происходит за 14 дней до следующей менструации. Калькулятор вычисляет её как: дата ПМ + (длина цикла − 14). При 28-дневном цикле овуляция — около 14-го дня, при 30-дневном — около 16-го.',
      },
      {
        q: 'Что такое фертильное окно?',
        a: 'Фертильное окно охватывает 6 дней: 5 дней до овуляции и сам день овуляции. Сперматозоиды могут выживать до 5 дней в маточных трубах, поэтому половой акт за несколько дней до овуляции может привести к беременности.',
      },
      {
        q: 'Какую длину цикла вводить?',
        a: 'Введите среднюю длину цикла в днях. Обычный цикл — 21–35 дней, средний — 28 дней. Если цикл нерегулярный, используйте среднее значение за последние 3–6 циклов. Калькулятор поддерживает циклы от 21 до 35 дней.',
      },
      {
        q: 'Насколько точен этот калькулятор?',
        a: 'Калькулятор даёт приблизительные результаты на основе среднего цикла. Наиболее точен для женщин с регулярными циклами. Стресс, болезнь, изменение веса или гормональные колебания могут сдвинуть овуляцию. Для точного определения используйте тесты на овуляцию (ОПК) или измерение базальной температуры тела.',
      },
      {
        q: 'Можно ли забеременеть вне фертильного окна?',
        a: 'Теоретически возможно, но маловероятно. За пределами 6-дневного фертильного окна вероятность зачатия резко падает — менее 1% в большинстве дней. Яйцеклетка выживает лишь 12–24 часа после овуляции. Для контрацепции всегда используйте надёжные методы, а не только расчёт цикла.',
      },
      {
        q: 'Как длина цикла влияет на время овуляции?',
        a: 'Овуляция всегда происходит примерно за 14 дней до следующей менструации — «лютеиновая фаза» относительно постоянна (12–16 дней). Варьируется фолликулярная фаза (от начала менструации до овуляции). При коротком цикле (21–24 дня) овуляция — на 7–10-й день; при длинном (35 дней) — около 21-го дня.',
      },
      {
        q: 'Каковы физические признаки овуляции?',
        a: 'Основные признаки: изменение цервикальной слизи (прозрачная, скользкая, тянущаяся — «яичный белок»), небольшой подъём базальной температуры тела (0,2–0,5°C), лёгкая боль с одной стороны внизу живота (Mittelschmerz), повышение либидо и лёгкая болезненность груди. Тесты ОПК определяют пик ЛГ за 24–36 часов до овуляции.',
      },
      {
        q: 'Может ли стресс задержать овуляцию?',
        a: 'Да. Сильный физический или эмоциональный стресс может задержать или подавить овуляцию, нарушая гормональный каскад (ГнРГ → ФСГ/ЛГ). Жёсткие диеты, интенсивные тренировки, болезнь и сильный стресс могут сдвинуть овуляцию на более поздний срок или вызвать ановуляторный цикл. Это делает трекинг ненадёжным в стрессовые периоды.',
      },
      {
        q: 'Что такое тест на овуляцию (ОПК) и как он работает?',
        a: 'ОПК выявляет пик лютеинизирующего гормона (ЛГ), который происходит за 24–36 часов до овуляции. Положительный результат означает, что овуляция ожидается в течение 12–36 часов. ОПК точнее календарного метода, особенно при нерегулярном цикле. Цифровые ОПК также измеряют эстрадиол, что расширяет окно обнаружения.',
      },
      {
        q: 'Возможна ли овуляция без менструации?',
        a: 'Да. Овуляция может произойти без предшествующей менструации — например, после родов (до первых постнатальных месячных), после отмены гормональных контрацептивов или после длительной аменореи. Поэтому грудное вскармливание — ненадёжный метод контрацепции, и беременность может наступить, казалось бы, «без» месячных.',
      },
      {
        q: 'Как понять, достаточно ли регулярен мой цикл для этого калькулятора?',
        a: 'Если ваш цикл варьируется более чем на 7 дней (например, иногда 25, иногда 35 дней), оценки калькулятора будут менее надёжными. В таком случае сочетайте трекинг с ежедневным ОПК или ТБТ. При очень нерегулярных циклах или отсутствии менструации более 3 месяцев обратитесь к гинекологу — это может указывать на СПКЯ, проблемы с щитовидной железой или другие гормональные нарушения.',
      },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор овуляції для планування або запобігання вагітності. Введіть перший день останньої менструації та тривалість циклу, щоб розрахувати дату овуляції, фертильне вікно, дату наступної менструації та передбачувану дату пологів.\n\nЧас овуляції — найважливіший фактор зачаття. Яйцеклітина виживає лише 12–24 години після виходу, але сперматозоїди залишаються життєздатними до 5 днів. Поєднання калькулятора з ТБТ або тестами на овуляцію дає найнадійніші результати.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як розраховується дата овуляції?',
        a: 'Овуляція зазвичай відбувається за 14 днів до наступної менструації. Калькулятор обчислює її як: дата ОМ + (тривалість циклу − 14). При 28-денному циклі овуляція — близько 14-го дня, при 30-денному — близько 16-го.',
      },
      {
        q: 'Що таке фертильне вікно?',
        a: 'Фертильне вікно охоплює 6 днів: 5 днів до овуляції та сам день овуляції. Сперматозоїди можуть виживати до 5 днів у маткових трубах, тому статевий акт за кілька днів до овуляції може призвести до вагітності.',
      },
      {
        q: 'Яку тривалість циклу вводити?',
        a: 'Введіть середню тривалість циклу в днях. Звичайний цикл — 21–35 днів, середній — 28 днів. Якщо цикл нерегулярний, використовуйте середнє значення за останні 3–6 циклів. Калькулятор підтримує цикли від 21 до 35 днів.',
      },
      {
        q: 'Наскільки точний цей калькулятор?',
        a: 'Калькулятор дає приблизні результати на основі середнього циклу. Найточніший для жінок із регулярними циклами. Стрес, хвороба, зміна ваги або гормональні коливання можуть зсунути овуляцію. Для точного визначення використовуйте тести на овуляцію або вимірювання базальної температури тіла.',
      },
      {
        q: 'Чи можна завагітніти поза фертильним вікном?',
        a: 'Теоретично можливо, але малоймовірно. За межами 6-денного фертильного вікна ймовірність зачаття різко падає — менше 1% у більшості днів. Яйцеклітина виживає лише 12–24 години після овуляції. Для контрацепції завжди використовуйте надійні методи, а не лише розрахунок циклу.',
      },
      {
        q: 'Як тривалість циклу впливає на час овуляції?',
        a: 'Овуляція завжди відбувається приблизно за 14 днів до наступної менструації — «лютеїнова фаза» відносно постійна (12–16 днів). Варіюється фолікулярна фаза (від початку менструації до овуляції). При короткому циклі (21–24 дні) овуляція — на 7–10-й день; при довгому (35 днів) — близько 21-го дня.',
      },
      {
        q: 'Які фізичні ознаки овуляції?',
        a: 'Основні ознаки: зміна цервікального слизу (прозорий, слизький, тягнеться — «яєчний білок»), невелике підвищення базальної температури тіла (0,2–0,5°C), легкий біль з одного боку внизу живота (Mittelschmerz), підвищення лібідо та легка болючість грудей. Тести ОПК визначають пік ЛГ за 24–36 годин до овуляції.',
      },
      {
        q: 'Чи може стрес затримати овуляцію?',
        a: 'Так. Сильний фізичний або емоційний стрес може затримати або пригнітити овуляцію, порушуючи гормональний каскад. Жорсткі дієти, інтенсивні тренування, хвороба та сильний стрес можуть зсунути овуляцію на більш пізній строк або спричинити ановуляторний цикл. Це робить трекінг ненадійним у стресові періоди.',
      },
      {
        q: 'Що таке тест на овуляцію (ОПК) і як він працює?',
        a: 'ОПК виявляє пік лютеїнізуючого гормону (ЛГ), який відбувається за 24–36 годин до овуляції. Позитивний результат означає, що овуляція очікується протягом 12–36 годин. ОПК точніший за календарний метод, особливо при нерегулярному циклі. Цифрові ОПК також вимірюють естрадіол.',
      },
      {
        q: 'Чи можлива овуляція без менструації?',
        a: 'Так. Овуляція може відбутися без попередньої менструації — наприклад, після пологів (до перших постнатальних місячних), після відміни гормональних контрацептивів або після тривалої аменореї. Тому грудне вигодовування — ненадійний метод контрацепції.',
      },
      {
        q: 'Як зрозуміти, чи достатньо регулярний мій цикл для цього калькулятора?',
        a: 'Якщо ваш цикл варіюється більш ніж на 7 днів (наприклад, іноді 25, іноді 35 днів), оцінки калькулятора будуть менш надійними. В такому випадку поєднуйте трекінг із щоденним ОПК або ТБТ. При дуже нерегулярних циклах або відсутності менструації понад 3 місяці зверніться до гінеколога.',
      },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice d\'ovulation pour planifier ou éviter une grossesse. Entrez le premier jour de vos dernières règles et la durée de votre cycle pour calculer votre date d\'ovulation, la fenêtre fertile de 6 jours, la date de vos prochaines règles et la date prévue d\'accouchement.\n\nLe moment de l\'ovulation est le facteur le plus important pour la conception. L\'ovule ne survit que 12 à 24 heures après sa libération, mais les spermatozoïdes peuvent rester viables jusqu\'à 5 jours. Combiner cette calculatrice avec des tests OPK ou la mesure de la température basale donne les résultats les plus fiables.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment la date d\'ovulation est-elle calculée ?',
        a: 'L\'ovulation survient généralement 14 jours avant les prochaines règles. La calculatrice l\'estime ainsi : date des dernières règles + (durée du cycle − 14). Pour un cycle de 28 jours, l\'ovulation se produit vers le 14e jour ; pour un cycle de 30 jours, vers le 16e jour.',
      },
      {
        q: 'Qu\'est-ce que la fenêtre fertile ?',
        a: 'La fenêtre fertile couvre 6 jours : les 5 jours précédant l\'ovulation et le jour de l\'ovulation lui-même. Les spermatozoïdes peuvent survivre jusqu\'à 5 jours dans les trompes, donc un rapport sexuel quelques jours avant l\'ovulation peut aboutir à une grossesse.',
      },
      {
        q: 'Quelle durée de cycle entrer ?',
        a: 'Entrez la durée moyenne de votre cycle en jours. Un cycle typique dure 21 à 35 jours, avec 28 jours en moyenne. Si vos cycles varient, utilisez la moyenne de vos 3 à 6 derniers cycles. Cette calculatrice prend en charge les cycles de 21 à 35 jours.',
      },
      {
        q: 'Cette calculatrice est-elle précise ?',
        a: 'Cette calculatrice fournit des estimations basées sur le cycle moyen. Elle est plus précise pour les femmes avec des cycles réguliers. Le stress, la maladie, les variations de poids ou les fluctuations hormonales peuvent décaler l\'ovulation. Pour un suivi précis, utilisez des tests d\'ovulation (OPK) ou la méthode de la température basale.',
      },
      {
        q: 'Peut-on tomber enceinte en dehors de la fenêtre fertile ?',
        a: 'C\'est théoriquement possible mais très peu probable. En dehors de la fenêtre fertile de 6 jours, la probabilité de conception tombe en dessous de 1%. L\'ovule ne survit que 12 à 24 heures après l\'ovulation. Pour la contraception, utilisez toujours des méthodes fiables plutôt que de compter uniquement sur le calcul du cycle.',
      },
      {
        q: 'Comment la durée du cycle affecte-t-elle le moment de l\'ovulation ?',
        a: 'L\'ovulation se produit toujours environ 14 jours avant les prochaines règles — la phase lutéale est relativement constante (12–16 jours). Ce qui varie, c\'est la phase folliculaire (des règles à l\'ovulation). Pour un cycle court (21–24 jours), l\'ovulation se produit vers les jours 7–10 ; pour un cycle long (35 jours), vers le jour 21.',
      },
      {
        q: 'Quels sont les signes physiques de l\'ovulation ?',
        a: 'Les signes courants incluent : des modifications de la glaire cervicale (transparente, glissante et filante — comme du blanc d\'œuf), une légère élévation de la température basale (0,2–0,5°C), une douleur pelvienne légère d\'un côté (Mittelschmerz), une libido accrue et une légère sensibilité des seins. Les tests OPK détectent le pic de LH 24 à 36 heures avant l\'ovulation.',
      },
      {
        q: 'Le stress peut-il retarder l\'ovulation ?',
        a: 'Oui. Un stress physique ou émotionnel important peut retarder ou supprimer l\'ovulation en perturbant la cascade hormonale. Les régimes très restrictifs, l\'entraînement intensif, la maladie et le stress majeur peuvent décaler l\'ovulation ou provoquer des cycles anovulatoires. Cela rend le suivi peu fiable durant les périodes stressantes.',
      },
      {
        q: 'Qu\'est-ce qu\'un test d\'ovulation (OPK) et comment fonctionne-t-il ?',
        a: 'Les OPK détectent le pic de LH (hormone lutéinisante) qui se produit 24 à 36 heures avant l\'ovulation. Un résultat positif signifie que l\'ovulation est imminente — généralement dans les 12 à 36 heures. Les OPK sont plus précis que la méthode du calendrier, surtout pour les cycles irréguliers. Les OPK numériques mesurent aussi l\'œstrogène.',
      },
      {
        q: 'L\'ovulation est-elle possible sans règles ?',
        a: 'Oui. L\'ovulation peut survenir sans règles préalables — par exemple au retour de la fertilité après l\'accouchement (avant les premières règles post-partum), après l\'arrêt d\'une contraception hormonale ou après une aménorrhée prolongée. C\'est pourquoi l\'allaitement n\'est pas une méthode contraceptive fiable.',
      },
      {
        q: 'Comment savoir si mes cycles sont assez réguliers pour cette calculatrice ?',
        a: 'Si votre cycle varie de plus de 7 jours d\'un mois à l\'autre (parfois 25 jours, parfois 35), les estimations seront moins fiables. Dans ce cas, combinez le suivi du calendrier avec des tests OPK quotidiens ou la mesure de la température basale. En cas de cycles très irréguliers ou d\'absence de règles depuis 3+ mois, consultez un gynécologue.',
      },
    ],
  },
  lt: {
    description: 'Naudokite mūsų ovuliacijos skaičiuotuvą nėštumui planuoti arba išvengti. Įveskite paskutinių mėnesinių pirmą dieną ir ciklo trukmę, kad apskaičiuotumėte ovuliacijos datą, 6 dienų vaisingą langą, kitų mėnesinių datą ir numatomą gimdymo datą.\n\nOvuliacijos laikas yra svarbiausias apvaisinimo veiksnys. Kiaušialąstė išgyvena tik 12–24 valandas po išsiskyrimo, tačiau spermatozoidai gali išlikti gyvybingi iki 5 dienų. Skaičiuotuvo ir OPK testų arba bazinės temperatūros matavimo derinys duoda patikimiausius rezultatus.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip apskaičiuojama ovuliacijos data?',
        a: 'Ovuliacija paprastai įvyksta likus 14 dienų iki kitų mėnesinių. Skaičiuotuvas ją įvertina taip: paskutinių mėnesinių data + (ciklo trukmė − 14). 28 dienų ciklui ovuliacija yra apie 14 dieną; 30 dienų ciklui — apie 16 dieną.',
      },
      {
        q: 'Kas yra vaisingas langas?',
        a: 'Vaisingas langas apima 6 dienas: 5 dienas prieš ovuliaciją ir pačią ovuliacijos dieną. Spermatozoidai gali išgyventi iki 5 dienų kiaušintakiuose, todėl lytiniai santykiai kelias dienas prieš ovuliaciją gali sukelti nėštumą.',
      },
      {
        q: 'Kokią ciklo trukmę įvesti?',
        a: 'Įveskite vidutinę ciklo trukmę dienomis. Tipinis ciklas trunka 21–35 dienas, vidutiniškai 28 dienas. Jei ciklai skiriasi, naudokite paskutinių 3–6 ciklų vidurkį. Šis skaičiuotuvas palaiko 21–35 dienų ciklus.',
      },
      {
        q: 'Ar šis skaičiuotuvas tikslus?',
        a: 'Skaičiuotuvas pateikia įverčius pagal vidutinį ciklą. Tiksliausias moterims su reguliariais ciklais. Stresas, liga, svorio pokyčiai ar hormoniniai svyravimai gali pastumti ovuliaciją. Tiksliam sekimui naudokite ovuliacijos testus (OPK) arba bazinės kūno temperatūros metodą.',
      },
      {
        q: 'Ar galima pastoti ne vaisiogame lange?',
        a: 'Teoriškai įmanoma, bet labai mažai tikėtina. Už 6 dienų vaisiogo lango ribų apvaisinimo tikimybė krenta žemiau 1%. Kiaušialąstė išgyvena tik 12–24 valandas po ovuliacijos. Kontracepcijos tikslais visada naudokite patikimus metodus, o ne tik ciklo skaičiavimą.',
      },
      {
        q: 'Kaip ciklo trukmė veikia ovuliacijos laiką?',
        a: 'Ovuliacija visada įvyksta maždaug likus 14 dienų iki kitų mėnesinių — „liutealinė fazė" yra gana pastovi (12–16 dienų). Kintamoji yra folikulinė fazė (nuo mėnesinių iki ovuliacijos). Trumpam ciklui (21–24 dienos) ovuliacija būna apie 7–10 dieną; ilgam (35 dienos) — apie 21 dieną.',
      },
      {
        q: 'Kokie fiziniai ovuliacijos požymiai?',
        a: 'Pagrindiniai požymiai: gimdos kaklelio gleivių pokyčiai (skaidrios, slidžios, tįsios — „kiaušinio baltymas"), nedidelis bazinės temperatūros kilimas (0,2–0,5°C), lengvas skausmas vienoje pusėje (Mittelschmerz), padidėjęs libido ir lengvas krūtų jautrumas. OPK testai nustato LH piką likus 24–36 val. iki ovuliacijos.',
      },
      {
        q: 'Ar stresas gali atidėti ovuliaciją?',
        a: 'Taip. Didelis fizinis ar emocinis stresas gali atidėti arba slopinti ovuliaciją, sutrikdydamas hormoninę kaskadą. Griežtos dietos, intensyvios treniruotės, ligos ir didelis stresas gali pastumti ovuliaciją vėliau arba sukelti anovuliacinius ciklus. Tai daro sekimą nepatikimu streso laikotarpiais.',
      },
      {
        q: 'Kas yra ovuliacijos testas (OPK) ir kaip jis veikia?',
        a: 'OPK nustato liuteinizuojančio hormono (LH) smailę, kuri įvyksta likus 24–36 val. iki ovuliacijos. Teigiamas rezultatas reiškia, kad ovuliacija artėja. OPK tikslesnis nei kalendorinis metodas, ypač nenuosekliems ciklams. Skaitmeniniai OPK taip pat matuoja estrogeną.',
      },
      {
        q: 'Ar ovuliacija galima be mėnesinių?',
        a: 'Taip. Ovuliacija gali įvykti be ankstesnių mėnesinių — pavyzdžiui, po gimdymo (prieš pirmąsias pogimdyvines mėnesines), nutraukus hormoninę kontracepciją ar po užsitęsusios amenorėjos. Todėl žindymas nėra patikimas kontracepcijos metodas.',
      },
      {
        q: 'Kaip sužinoti, ar mano ciklai pakankamai reguliarūs šiam skaičiuotuvui?',
        a: 'Jei jūsų ciklas skiriasi daugiau nei 7 dienomis nuo mėnesio iki mėnesio (kartais 25, kartais 35 dienos), skaičiuotuvo įverčiai bus mažiau patikimi. Tokiu atveju derinkite sekimą su kasdieniniais OPK testais arba bazinės temperatūros matavimu. Esant labai nereguliariems ciklams ar mėnesinių nebuvimui 3+ mėnesius, kreipkitės į ginekologą.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/ovulation', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OvulationPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/ovulation`,
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
        <OvulationCalculator locale={locale} />

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
