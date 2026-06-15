import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import SavingsGoalCalculator from './SavingsGoalCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
    { href: '/calculator/deposit', label: 'Deposit Calculator' },
    { href: '/calculator/roi', label: 'ROI Calculator' },
    { href: '/calculator/pension', label: 'Pension Calculator' },
  ],
  ru: [
    { href: '/calculator/compound-interest', label: 'Сложные проценты' },
    { href: '/calculator/net-worth', label: 'Калькулятор капитала' },
    { href: '/calculator/deposit', label: 'Калькулятор депозита' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/pension', label: 'Пенсионный калькулятор' },
  ],
  uk: [
    { href: '/calculator/compound-interest', label: 'Складні відсотки' },
    { href: '/calculator/net-worth', label: 'Калькулятор капіталу' },
    { href: '/calculator/deposit', label: 'Калькулятор депозиту' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/pension', label: 'Пенсійний калькулятор' },
  ],
  fr: [
    { href: '/calculator/compound-interest', label: 'Calculatrice Intérêts Composés' },
    { href: '/calculator/net-worth', label: 'Calculatrice Valeur Nette' },
    { href: '/calculator/deposit', label: 'Calculatrice de Dépôt' },
    { href: '/calculator/roi', label: 'Calculatrice ROI' },
    { href: '/calculator/pension', label: 'Calculatrice Retraite' },
  ],
  lt: [
    { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' },
    { href: '/calculator/net-worth', label: 'Grynosios vertės skaičiuotuvas' },
    { href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' },
    { href: '/calculator/roi', label: 'RI skaičiuotuvas' },
    { href: '/calculator/pension', label: 'Pensijų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Savings Goal Calculator — How Long to Save?',
    description: 'Free savings goal calculator. Find out how many months it will take to reach your savings target. Enter your goal, current savings, monthly contribution, and interest rate.',
    h1: 'Savings Goal Calculator',
    subtitle: 'Find out how long it takes to reach your savings target with regular monthly contributions.',
  },
  ru: {
    title: 'Калькулятор накоплений — когда достигну цели?',
    description: 'Бесплатный калькулятор накоплений. Узнайте, сколько месяцев нужно, чтобы достичь финансовой цели. Введите цель, текущие сбережения, ежемесячный взнос и процентную ставку.',
    h1: 'Калькулятор накоплений',
    subtitle: 'Узнайте, сколько времени нужно для достижения цели накоплений при регулярных взносах.',
  },
  uk: {
    title: 'Калькулятор накопичень — коли досягну цілі?',
    description: 'Безкоштовний калькулятор накопичень. Дізнайтеся, скільки місяців потрібно для досягнення фінансової цілі. Введіть ціль, поточні заощадження, щомісячний внесок і процентну ставку.',
    h1: 'Калькулятор накопичень',
    subtitle: 'Дізнайтеся, скільки часу потрібно для досягнення мети накопичень при регулярних внесках.',
  },
  fr: {
    title: 'Calculatrice Objectif Épargne — Combien de temps ?',
    description: 'Calculatrice d\'objectif d\'épargne gratuite. Découvrez en combien de mois vous atteindrez votre objectif financier. Entrez votre objectif, épargne actuelle, versement mensuel et taux d\'intérêt.',
    h1: 'Calculatrice Objectif Épargne',
    subtitle: 'Découvrez en combien de mois vous atteindrez votre objectif d\'épargne avec des versements réguliers.',
  },
  lt: {
    title: 'Taupymo Tikslo Skaičiuotuvas — Kada Pasieksite?',
    description: 'Nemokamas taupymo tikslo skaičiuotuvas. Sužinokite, per kiek mėnesių pasieksite savo finansinį tikslą. Įveskite tikslą, dabartines santaupas, mėnesinį įnašą ir palūkanų normą.',
    h1: 'Taupymo Tikslo Skaičiuotuvas',
    subtitle: 'Sužinokite, per kiek mėnesių pasieksite taupymo tikslą su reguliariomis mėnesinėmis įmokomis.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our savings goal calculator helps you plan how long it will take to reach any financial target — whether it\'s a down payment on a house, an emergency fund, a holiday, or a new car. Enter your savings goal, current savings, monthly contribution, and annual interest rate. The calculator instantly tells you how many months you need, the exact target date, total contributions, and interest earned.\n\nRegular saving with compound interest is one of the most powerful wealth-building tools available to individuals. Even a modest 3–4% annual interest rate on a savings account significantly accelerates goal achievement compared to saving with no interest. For example, saving €500 per month towards a €10,000 goal at 3% annual interest takes 18 months instead of 20 months without interest — and you earn over €300 in interest while doing it.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is the time to reach a savings goal calculated?', a: 'With a non-zero interest rate, the formula is: n = ln((goal × r + PMT) / (current × r + PMT)) / ln(1 + r), where r is the monthly interest rate and PMT is the monthly contribution. Without interest, it\'s simply: months = (goal − current) / monthly contribution.' },
      { q: 'What is compound interest on savings?', a: 'Compound interest means you earn interest not only on your original savings but also on previously earned interest. Over time, this creates exponential growth. The more frequently interest compounds (monthly vs annually), the faster your savings grow.' },
      { q: 'What interest rate should I use?', a: 'Use your actual savings account annual interest rate. European high-yield savings accounts currently offer 2–4% annually. US high-yield savings accounts offer around 4–5%. If you\'re investing in index funds, historical average returns are 7–10% per year, though this involves risk.' },
      { q: 'How much should I save each month?', a: 'A common rule is to save at least 20% of your take-home income (the "50/30/20 rule"). For specific goals, work backwards: decide when you need the money, subtract your current savings from the goal, and divide by the number of months — that\'s your minimum monthly contribution.' },
      { q: 'What is an emergency fund and how much should I save?', a: 'An emergency fund covers unexpected expenses (job loss, medical costs, car repairs) without going into debt. Most financial advisers recommend saving 3–6 months of living expenses. For a monthly budget of €2,000, that means €6,000–12,000 in an accessible account.' },
      { q: 'Is it better to save or invest?', a: 'Saving in a bank account is lower risk and immediately accessible, making it ideal for short-term goals (under 3–5 years) or emergency funds. Investing in stocks or funds offers higher potential returns but involves risk and is best for long-term goals (5+ years) where you can ride out market fluctuations.' },
      { q: 'How does inflation affect savings goals?', a: 'Inflation erodes purchasing power over time. If inflation is 3% per year and your savings account pays 1%, your real return is −2% annually. For long-term goals, choose savings or investment products that beat inflation. As of 2024, many high-yield savings accounts match or exceed current inflation rates.' },
      { q: 'Should I pay off debt or save first?', a: 'Generally: always build a small emergency fund first (1 month of expenses), then pay off high-interest debt (credit cards at 15–25%), then contribute to retirement accounts with employer matching, then save for other goals. Low-interest debt (mortgages at 3–5%) can often be carried while saving.' },
      { q: 'What is the rule of 72?', a: 'The rule of 72 is a quick way to estimate how long it takes to double your savings. Divide 72 by the annual interest rate. At 4% interest: 72 ÷ 4 = 18 years to double. At 8%: 72 ÷ 8 = 9 years. It\'s a useful mental shortcut for understanding the power of compound interest.' },
      { q: 'How do I stay motivated to reach my savings goal?', a: 'Effective strategies include: automating transfers on payday (pay yourself first), opening a dedicated savings account for the goal, tracking progress with a tool like this calculator, setting smaller milestone rewards, and visualising what the goal represents (a specific holiday, a house, financial security).' },
      { q: 'Can I reach my savings goal faster?', a: 'Yes — three levers: increase monthly contributions (even small increases compound significantly), increase the interest rate by switching to a higher-yield account, or reduce the goal amount. A 10% increase in monthly contributions can cut the timeline by 5–15% depending on your current savings and interest rate.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор накоплений поможет спланировать, сколько времени нужно для достижения любой финансовой цели — первоначальный взнос за квартиру, подушка безопасности, отпуск или новый автомобиль. Введите цель, текущие сбережения, ежемесячный взнос и годовую процентную ставку — калькулятор покажет количество месяцев, дату достижения цели, общую сумму взносов и начисленные проценты.\n\nРегулярные накопления со сложными процентами — один из самых мощных инструментов финансового роста. Даже скромная ставка 3–4% годовых существенно ускоряет достижение цели. Например, при цели 10 000 € и взносах 500 €/месяц под 3% годовых потребуется 18 месяцев вместо 20 без процентов — и вы дополнительно заработаете более 300 €.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается срок достижения цели накоплений?', a: 'При ненулевой ставке: n = ln((цель × r + взнос) / (сбережения × r + взнос)) / ln(1 + r), где r — месячная ставка. При нулевой: месяцы = (цель − текущие сбережения) / ежемесячный взнос.' },
      { q: 'Что такое сложные проценты?', a: 'Сложные проценты — начисление процентов не только на основной капитал, но и на ранее начисленные проценты. Это создаёт экспоненциальный рост. Чем чаще начисляются проценты (ежемесячно vs ежегодно), тем быстрее растут накопления.' },
      { q: 'Какую процентную ставку использовать?', a: 'Используйте фактическую годовую ставку вашего банковского счёта. Российские накопительные счета в 2024 году предлагают 10–16% годовых. Европейские — 2–4%. США — 4–5% в высокодоходных счетах.' },
      { q: 'Сколько нужно откладывать в месяц?', a: 'Распространённое правило — минимум 20% от чистого дохода (правило «50/30/20»). Для конкретной цели: вычтите имеющиеся сбережения из суммы цели и разделите на нужное количество месяцев.' },
      { q: 'Что такое финансовая подушка безопасности?', a: 'Резервный фонд покрывает непредвиденные расходы (потеря работы, медицинские расходы, ремонт). Большинство финансовых консультантов рекомендуют иметь 3–6 месячных расходов. При бюджете 80 000 руб/мес — 240 000–480 000 рублей.' },
      { q: 'Что лучше — сберегать или инвестировать?', a: 'Банковский счёт — низкий риск, мгновенный доступ, идеален для краткосрочных целей (до 3–5 лет) и резервного фонда. Инвестиции в акции или фонды — более высокая доходность, но риск; оптимальны для долгосрочных целей (5+ лет).' },
      { q: 'Как инфляция влияет на накопления?', a: 'Инфляция снижает покупательную способность. Если инфляция 7%, а вклад даёт 10%, реальная доходность — лишь 3%. При долгосрочных целях выбирайте инструменты с доходностью выше инфляции.' },
      { q: 'Что сначала — гасить долги или копить?', a: 'Рекомендуемая последовательность: 1) резерв на 1 месяц расходов, 2) погашение долгов с высокой ставкой (кредитные карты), 3) пенсионные накопления с работодателем, 4) прочие цели. Ипотеку (низкая ставка) можно совмещать с накоплениями.' },
      { q: 'Что такое правило 72?', a: 'Правило 72 — способ оценить, за сколько лет удвоятся накопления. Разделите 72 на годовую ставку. При 8%: 72 ÷ 8 = 9 лет. При 4%: 18 лет. Удобный ориентир для понимания силы сложных процентов.' },
      { q: 'Как ускорить достижение цели?', a: 'Три рычага: увеличить ежемесячный взнос, переключиться на счёт с более высокой ставкой, или снизить целевую сумму. Даже +10% к ежемесячному взносу может сократить срок на 5–15%.' },
      { q: 'Как не потерять мотивацию копить?', a: 'Автоматизировать перевод в день зарплаты, открыть отдельный счёт для конкретной цели, отслеживать прогресс с помощью этого калькулятора и установить промежуточные награды за достижение вех.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор накопичень допоможе спланувати, скільки часу потрібно для досягнення будь-якої фінансової цілі — перший внесок за квартиру, подушка безпеки, відпустка або новий автомобіль. Введіть ціль, поточні заощадження, щомісячний внесок і річну процентну ставку — калькулятор покаже кількість місяців, дату досягнення цілі, загальну суму внесків і нараховані відсотки.\n\nРегулярні накопичення зі складними відсотками — один з найпотужніших інструментів фінансового зростання. Навіть скромна ставка 3–4% річних суттєво прискорює досягнення цілі. Наприклад, при цілі 10 000 € і внесках 500 €/місяць під 3% річних потрібно 18 місяців замість 20 без відсотків — і ви додатково заробите понад 300 €.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується строк досягнення цілі накопичень?', a: 'При ненульовій ставці: n = ln((ціль × r + внесок) / (заощадження × r + внесок)) / ln(1 + r), де r — місячна ставка. При нульовій: місяці = (ціль − поточні заощадження) / щомісячний внесок.' },
      { q: 'Що таке складні відсотки?', a: 'Складні відсотки нараховуються не лише на основну суму, але й на вже нараховані відсотки. Це створює експоненціальне зростання. Що частіше нараховуються відсотки, то швидше ростуть заощадження.' },
      { q: 'Яку процентну ставку використовувати?', a: 'Використовуйте фактичну річну ставку вашого банківського рахунку. Українські ощадні рахунки у 2024 році пропонують 10–15% річних. Європейські — 2–4%.' },
      { q: 'Скільки потрібно відкладати щомісяця?', a: 'Поширене правило — мінімум 20% від чистого доходу (правило «50/30/20»). Для конкретної цілі: відніміть наявні заощадження від суми цілі і розділіть на потрібну кількість місяців.' },
      { q: 'Що таке фінансова подушка безпеки?', a: 'Резервний фонд покриває непередбачені витрати (втрата роботи, медичні витрати, ремонт). Більшість фінансових консультантів рекомендують мати 3–6 місячних витрат на легкодоступному рахунку.' },
      { q: 'Що краще — заощаджувати або інвестувати?', a: 'Банківський рахунок — низький ризик, миттєвий доступ, ідеальний для короткострокових цілей (до 3–5 років) і резервного фонду. Інвестиції — вища потенційна дохідність, але ризик; оптимальні для довгострокових цілей (5+ років).' },
      { q: 'Як інфляція впливає на накопичення?', a: 'Інфляція знижує купівельну спроможність. Якщо інфляція 8%, а вклад дає 12%, реальна дохідність — лише 4%. При довгострокових цілях обирайте інструменти з дохідністю вище інфляції.' },
      { q: 'Що спочатку — гасити борги чи заощаджувати?', a: 'Рекомендована послідовність: 1) резерв на 1 місяць витрат, 2) погашення боргів з високою ставкою (кредитні картки), 3) пенсійні накопичення, 4) інші цілі. Іпотеку (низька ставка) можна поєднувати з накопиченнями.' },
      { q: 'Що таке правило 72?', a: 'Правило 72 — спосіб оцінити, за скільки років подвояться накопичення. Розділіть 72 на річну ставку. При 8%: 72 ÷ 8 = 9 років. При 4%: 18 років.' },
      { q: 'Як прискорити досягнення цілі?', a: 'Три важелі: збільшити щомісячний внесок, перейти на рахунок з вищою ставкою, або зменшити цільову суму. Навіть +10% до щомісячного внеску може скоротити строк на 5–15%.' },
      { q: 'Як не втратити мотивацію заощаджувати?', a: 'Автоматизувати переказ в день зарплати, відкрити окремий рахунок для конкретної цілі, відстежувати прогрес за допомогою цього калькулятора і встановити проміжні нагороди.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice d\'objectif d\'épargne vous aide à planifier le temps nécessaire pour atteindre n\'importe quel objectif financier — apport immobilier, fonds d\'urgence, vacances ou nouvelle voiture. Entrez votre objectif, votre épargne actuelle, votre versement mensuel et le taux d\'intérêt annuel. La calculatrice vous indique instantanément le nombre de mois nécessaires, la date cible, les contributions totales et les intérêts gagnés.\n\nL\'épargne régulière avec intérêts composés est l\'un des outils de création de richesse les plus puissants. Même un taux d\'intérêt annuel modeste de 3–4 % accélère significativement l\'atteinte des objectifs. Par exemple, épargner 500 € par mois pour un objectif de 10 000 € à 3 % d\'intérêt annuel prend 18 mois au lieu de 20 sans intérêt — et vous gagnez plus de 300 € d\'intérêts.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le temps pour atteindre un objectif d\'épargne ?', a: 'Avec un taux non nul : n = ln((objectif × r + PMT) / (épargne × r + PMT)) / ln(1 + r), où r est le taux mensuel. Sans intérêt : mois = (objectif − épargne actuelle) / versement mensuel.' },
      { q: 'Qu\'est-ce que les intérêts composés ?', a: 'Les intérêts composés signifient que vous gagnez des intérêts non seulement sur votre épargne initiale, mais aussi sur les intérêts déjà accumulés. Cela crée une croissance exponentielle. Plus les intérêts sont capitalisés fréquemment, plus l\'épargne croît vite.' },
      { q: 'Quel taux d\'intérêt utiliser ?', a: 'Utilisez le taux annuel réel de votre compte d\'épargne. Les livrets réglementés français (Livret A) offrent actuellement 3 %. Les comptes épargne à terme offrent 3–4 %. Les assurances-vie en fonds euros : 2,5–4 %.' },
      { q: 'Combien devrais-je épargner chaque mois ?', a: 'La règle courante est d\'épargner au moins 20 % de son revenu net (règle du "50/30/20"). Pour un objectif précis, calculez à rebours : combien de mois avez-vous ? Divisez (objectif − épargne actuelle) par ce nombre.' },
      { q: 'Qu\'est-ce qu\'un fonds d\'urgence ?', a: 'Un fonds d\'urgence couvre les dépenses imprévues (perte d\'emploi, frais médicaux, réparations) sans s\'endetter. La plupart des conseillers recommandent 3 à 6 mois de dépenses. Pour un budget de 2 000 €/mois, cela représente 6 000 à 12 000 €.' },
      { q: 'Vaut-il mieux épargner ou investir ?', a: 'Un compte bancaire offre faible risque et accès immédiat, idéal pour les objectifs à court terme (moins de 3–5 ans) ou le fonds d\'urgence. L\'investissement en actions ou fonds offre de meilleurs rendements potentiels mais implique un risque, adapté aux objectifs long terme (5 ans et plus).' },
      { q: 'Comment l\'inflation affecte-t-elle l\'épargne ?', a: 'L\'inflation érode le pouvoir d\'achat. Si l\'inflation est de 3 % et votre livret rapporte 3 %, le rendement réel est de 0 %. Pour les objectifs long terme, choisissez des placements dont le rendement dépasse l\'inflation.' },
      { q: 'Faut-il rembourser ses dettes ou épargner d\'abord ?', a: 'Priorités recommandées : 1) constituer un fond d\'urgence d\'un mois, 2) rembourser les dettes à taux élevé (carte de crédit à 15–25 %), 3) cotiser à l\'épargne retraite, 4) autres objectifs. Les dettes à faible taux (immobilier) peuvent être conservées tout en épargnant.' },
      { q: 'Qu\'est-ce que la règle des 72 ?', a: 'La règle des 72 est un raccourci pour estimer le temps de doublement de l\'épargne. Divisez 72 par le taux d\'intérêt annuel. À 4 % : 72 ÷ 4 = 18 ans. À 8 % : 9 ans.' },
      { q: 'Comment atteindre son objectif d\'épargne plus vite ?', a: 'Trois leviers : augmenter les versements mensuels, choisir un compte à meilleur rendement, ou réduire le montant de l\'objectif. Une augmentation de 10 % des versements peut raccourcir le délai de 5 à 15 %.' },
      { q: 'Comment rester motivé pour épargner ?', a: 'Automatiser les virements le jour de paie, ouvrir un compte dédié à l\'objectif, suivre les progrès avec cet outil, se fixer des récompenses intermédiaires et visualiser concrètement ce que l\'objectif représente.' },
    ],
  },
  lt: {
    description: 'Mūsų taupymo tikslo skaičiuotuvas padeda suplanuoti, kiek laiko prireiks pasiekti bet kurį finansinį tikslą — pradinį įnašą namams, avarinį fondą, atostogas ar naują automobilį. Įveskite tikslą, dabartines santaupas, mėnesinį įnašą ir metinę palūkanų normą — skaičiuotuvas akimirksniu parodys, kiek mėnesių reikia, tikslinę datą, bendrus įnašus ir sukauptas palūkanas.\n\nNuolatinis taupymas su sudėtinėmis palūkanomis yra vienas iš galingiausių asmeninio turto kūrimo įrankių. Net ir kuklios 3–4% metinės palūkanos reikšmingai pagreitina tikslo pasiekimą. Pavyzdžiui, taupant 500 € per mėnesį, siekiant 10 000 € tikslo, esant 3% metinei palūkanų normai, prireiks 18 mėnesių, o ne 20 be palūkanų — ir papildomai uždirbasite virš 300 €.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamas laikas pasiekti taupymo tikslą?', a: 'Su nenuliais palūkanais: n = ln((tikslas × r + įnašas) / (santaupos × r + įnašas)) / ln(1 + r), kur r yra mėnesinė palūkanų norma. Be palūkanų: mėnesiai = (tikslas − dabartinės santaupos) / mėnesinis įnašas.' },
      { q: 'Kas yra sudėtinės palūkanos?', a: 'Sudėtinės palūkanos reiškia, kad palūkanos skaičiuojamos ne tik nuo pradinių santaupų, bet ir nuo jau sukauptų palūkanų. Tai sukuria eksponentinį augimą. Kuo dažniau skaičiuojamos palūkanos, tuo greičiau auga santaupos.' },
      { q: 'Kokią palūkanų normą naudoti?', a: 'Naudokite faktinę savo taupomosios sąskaitos metinę palūkanų normą. Lietuvos bankų taupomosios sąskaitos 2024 m. siūlo 2–4% metinių palūkanų. Aukštos grąžos Europos taupomosios sąskaitos — 3–4%.' },
      { q: 'Kiek turėčiau taupyti kiekvieną mėnesį?', a: 'Bendras patarimas — taupyti bent 20% grynųjų pajamų (50/30/20 taisyklė). Konkrečiam tikslui: atimkite turimas santaupas iš tikslo sumos ir padalinkite iš mėnesių skaičiaus.' },
      { q: 'Kas yra avarinių lėšų fondas?', a: 'Avarinių lėšų fondas padengia netikėtas išlaidas (darbo netekimas, medicinos išlaidos, remontas) nesiskolinant. Daugelis finansų konsultantų rekomenduoja turėti 3–6 mėnesių išlaidų sumą lengvai prieinamoje sąskaitoje.' },
      { q: 'Ar geriau taupyti ar investuoti?', a: 'Banko sąskaita — mažesnė rizika, greitas priėjimas, ideali trumpalaikiams tikslams (iki 3–5 metų) ir avariniam fondui. Investicijos į akcijas ar fondus siūlo didesnę grąžą, tačiau apima riziką ir geriausiai tinka ilgalaikiams tikslams (5+ metų).' },
      { q: 'Kaip infliacija veikia santaupas?', a: 'Infliacija mažina perkamąją galią. Jei infliacija yra 3%, o jūsų sąskaita duoda 3%, realus pelnas yra 0%. Ilgalaikiams tikslams rinkitės priemones, kurių grąža viršija infliaciją.' },
      { q: 'Ar pirma grąžinti skolas ar taupyti?', a: 'Rekomenduojama eilė: 1) avarinių lėšų fondas (1 mėnesio išlaidos), 2) didelių palūkanų skolų grąžinimas (kreditinės kortelės), 3) pensijų santaupos, 4) kiti tikslai. Mažų palūkanų skolas (hipoteka) galima derinti su taupymu.' },
      { q: 'Kas yra 72 taisyklė?', a: '72 taisyklė — greitas būdas įvertinti, per kiek metų padvigubės santaupos. Padalinkite 72 iš metinių palūkanų normos. Esant 4%: 72 ÷ 4 = 18 metų. Esant 8%: 9 metai.' },
      { q: 'Kaip greičiau pasiekti taupymo tikslą?', a: 'Trys sverai: padidinti mėnesinį įnašą, pereiti prie sąskaitos su didesne palūkanų norma arba sumažinti tikslo sumą. Net 10% didesnis mėnesinis įnašas gali sutrumpinti terminą 5–15%.' },
      { q: 'Kaip išlikti motyvuotam taupyti?', a: 'Automatizuoti pervedimus atlyginimo dieną, atidaryti atskirą sąskaitą tikslui, stebėti pažangą naudojant šį skaičiuotuvą, nustatyti tarpinius apdovanojimus ir vizualizuoti, ką tikslas reiškia konkrečiai.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/savings-goal', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SavingsGoalPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/savings-goal`,
    applicationCategory: 'FinanceApplication',
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
        <SavingsGoalCalculator locale={locale} />
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
