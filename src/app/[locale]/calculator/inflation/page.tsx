import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import InflationCalculator from './InflationCalculator';
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
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' },
    { href: '/calculator/pension', label: 'Pension Calculator' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
    { href: '/calculator/loan-payoff', label: 'Loan Early Payoff Calculator' },
  ],
  ru: [
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/calculator/compound-interest', label: 'Калькулятор сложных процентов' },
    { href: '/calculator/pension', label: 'Пенсионный калькулятор' },
    { href: '/calculator/net-worth', label: 'Калькулятор чистого капитала' },
    { href: '/calculator/loan-payoff', label: 'Калькулятор досрочного погашения' },
  ],
  uk: [
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/calculator/compound-interest', label: 'Калькулятор складних відсотків' },
    { href: '/calculator/pension', label: 'Пенсійний калькулятор' },
    { href: '/calculator/net-worth', label: 'Калькулятор чистого капіталу' },
    { href: '/calculator/loan-payoff', label: 'Калькулятор дострокового погашення' },
  ],
  fr: [
    { href: '/calculator/savings-goal', label: 'Calculatrice Épargne' },
    { href: '/calculator/compound-interest', label: 'Calculatrice Intérêts Composés' },
    { href: '/calculator/pension', label: 'Calculatrice Retraite' },
    { href: '/calculator/net-worth', label: 'Calculatrice Patrimoine Net' },
    { href: '/calculator/loan-payoff', label: 'Calculatrice Remboursement Anticipé' },
  ],
  lt: [
    { href: '/calculator/savings-goal', label: 'Santaupų tikslo skaičiuotuvas' },
    { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' },
    { href: '/calculator/pension', label: 'Pensijos skaičiuotuvas' },
    { href: '/calculator/net-worth', label: 'Grynojo turto skaičiuotuvas' },
    { href: '/calculator/loan-payoff', label: 'Išankstinio paskolos grąžinimo skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Inflation Calculator — Future & Past Value of Money',
    description: 'Free inflation calculator. Find out what your money will be worth in the future or what past prices equal today. Calculate purchasing power loss using custom inflation rates.',
    h1: 'Inflation Calculator',
    subtitle: 'See how inflation erodes purchasing power and compare the value of money across years.',
  },
  ru: {
    title: 'Калькулятор инфляции — будущая и прошлая стоимость денег',
    description: 'Бесплатный калькулятор инфляции. Узнайте, сколько будут стоить ваши деньги в будущем или чему равны прошлые цены сегодня. Рассчитайте потерю покупательной способности.',
    h1: 'Калькулятор инфляции',
    subtitle: 'Узнайте, как инфляция снижает покупательную способность и сравните стоимость денег в разные годы.',
  },
  uk: {
    title: 'Калькулятор інфляції — майбутня та минула вартість грошей',
    description: 'Безкоштовний калькулятор інфляції. Дізнайтеся, скільки будуть коштувати ваші гроші в майбутньому або чому рівні минулі ціни сьогодні. Розрахуйте втрату купівельної спроможності.',
    h1: 'Калькулятор інфляції',
    subtitle: 'Дізнайтеся, як інфляція знижує купівельну спроможність і порівняйте вартість грошей у різні роки.',
  },
  fr: {
    title: 'Calculatrice d\'Inflation — Valeur Actuelle et Future de l\'Argent',
    description: 'Calculatrice d\'inflation gratuite. Découvrez ce que votre argent vaudra dans le futur ou ce que les prix passés représentent aujourd\'hui. Calculez la perte de pouvoir d\'achat.',
    h1: 'Calculatrice d\'Inflation',
    subtitle: 'Voyez comment l\'inflation érode le pouvoir d\'achat et comparez la valeur de l\'argent selon les années.',
  },
  lt: {
    title: 'Infliacijos Skaičiuotuvas — Pinigų Būsimoji ir Praeities Vertė',
    description: 'Nemokamas infliacijos skaičiuotuvas. Sužinokite, kiek bus verti jūsų pinigai ateityje arba ką reiškia praeities kainos šiandien. Apskaičiuokite perkamosios galios praradimą.',
    h1: 'Infliacijos Skaičiuotuvas',
    subtitle: 'Sužinokite, kaip infliacija mažina perkamąją galią, ir palyginkite pinigų vertę skirtingais metais.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our inflation calculator lets you calculate the future value of money given an annual inflation rate, or work backwards to find the historical equivalent of today\'s prices. Simply enter an amount, the annual inflation rate, and the number of years to instantly see year-by-year purchasing power changes. The forward mode calculates what your money will be worth (FV = amount × (1 + rate)^years), while the backward mode finds what a past amount equals in today\'s dollars (PV = amount ÷ (1 + rate)^years).\n\nInflation silently erodes the real value of savings and fixed incomes. At 3% annual inflation, prices double in approximately 24 years (the Rule of 72: 72 ÷ 3 = 24). A retirement fund that seems large today may be insufficient in 20 years if its purchasing power isn\'t accounted for. Understanding inflation is critical for retirement planning, long-term investment goals, salary negotiations, and pricing decisions for businesses.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is inflation?', a: 'Inflation is the rate at which the general level of prices for goods and services rises over time, reducing the purchasing power of money. If inflation is 3% annually, a $100 basket of goods costs $103 the next year. Inflation is typically measured by the Consumer Price Index (CPI) or the Producer Price Index (PPI). Central banks generally target 2% annual inflation as a stable economic goal.' },
      { q: 'How does inflation affect savings?', a: 'If your savings account earns 1% interest while inflation runs at 3%, the real return is −2% — your money loses purchasing power despite growing in nominal terms. To protect savings, returns must exceed the inflation rate. Over 20 years at 3% inflation, $100 in purchasing power today requires $180 to maintain the same value. This is why investment (not just saving) is important for long-term wealth.' },
      { q: 'What is hyperinflation?', a: 'Hyperinflation is extreme inflation exceeding 50% per month (equivalent to ~12,975% per year). Famous historical examples: Germany 1923 (prices doubled every 3.7 days), Zimbabwe 2008 (89.7 sextillion percent annual rate), Venezuela 2018 (>1,000,000%). Hyperinflation destroys savings, causes social instability, and typically results from excessive money printing, supply shocks, or collapse of confidence in government.' },
      { q: 'What is deflation and is it good?', a: 'Deflation is when prices fall broadly across an economy (negative inflation rate). While cheaper prices seem beneficial, sustained deflation is dangerous: consumers delay purchases expecting further price drops (deflationary spiral), businesses cut investment and hiring, debt burdens increase in real terms, and wages fall. Japan\'s "Lost Decades" (1990s–2010s) demonstrate the economic stagnation deflation can cause.' },
      { q: 'What is the Rule of 72?', a: 'The Rule of 72 estimates how long it takes for prices to double at a given inflation rate: Years to double ≈ 72 ÷ inflation rate. At 2% inflation: 72 ÷ 2 = 36 years to double. At 6% inflation: 72 ÷ 6 = 12 years to double. At 10% inflation: 72 ÷ 10 = 7.2 years to double. The same rule applies to investments (how long to double at a given return rate).' },
      { q: 'How does the central bank control inflation?', a: 'The primary tool is the interest rate (monetary policy). Raising interest rates makes borrowing more expensive, reducing spending and investment → lowers demand → cools inflation. Lowering rates stimulates spending → increases demand → can raise inflation. Central banks (Fed, ECB, Bank of England) typically target 2% CPI inflation. Fiscal policy (government spending/taxation) also affects inflation but is slower to implement.' },
      { q: 'What causes inflation?', a: 'Main causes: 1) Demand-pull inflation — too much money chasing too few goods (economic boom, stimulus spending); 2) Cost-push inflation — rising production costs passed to consumers (energy price spikes, supply chain disruptions, wage increases); 3) Built-in inflation — wage-price spiral where workers demand higher wages expecting inflation; 4) Monetary inflation — excessive money supply growth; 5) Import inflation — weak currency making imports more expensive.' },
      { q: 'What is real vs nominal value?', a: 'Nominal value is the current price without adjusting for inflation. Real value adjusts for inflation to reflect true purchasing power. Example: a salary of $50,000 in 2010 vs $60,000 in 2024 — nominally it rose 20%, but if prices rose 40% over that period, the real salary fell by about 14%. Real values allow meaningful comparisons across time. GDP growth figures are often quoted in both nominal and real (inflation-adjusted) terms.' },
      { q: 'How should I invest to beat inflation?', a: 'Historically, equities (stocks) have outpaced inflation by 5–7% annually over long periods. Other inflation-beating assets: real estate, Treasury Inflation-Protected Securities (TIPS), commodities (gold, oil), and I-bonds. Savings accounts and money market funds typically underperform inflation. Diversification across asset classes is key. No asset class reliably beats inflation in every year — long-term average return above inflation is what matters.' },
      { q: 'What is core inflation vs headline inflation?', a: 'Headline inflation includes all goods and services including volatile food and energy prices. Core inflation excludes food and energy because they fluctuate for reasons unrelated to underlying economic conditions (crop failures, geopolitical oil supply disruptions). Central banks focus more on core inflation when setting policy because it better reflects persistent price pressures. The distinction matters: high energy costs can make headline inflation spike while core remains stable.' },
      { q: 'How accurate is the CPI in measuring inflation?', a: 'CPI is a useful approximation but has known limitations: 1) Substitution bias — when prices rise, consumers switch to cheaper alternatives, but CPI doesn\'t fully capture this; 2) New goods bias — new products enter the market at high initial prices, and CPI takes time to incorporate them; 3) Quality adjustments — a "new" car costs more partly because it\'s better than an old one; 4) Geographic variation — national CPI may not match local price changes. Alternative measures like PCE (Personal Consumption Expenditures) address some of these issues.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор инфляции позволяет рассчитать будущую стоимость денег при заданном годовом темпе инфляции или определить историческую эквивалентность цен. Введите сумму, годовую инфляцию и количество лет, чтобы мгновенно увидеть динамику покупательной способности по годам.\n\nИнфляция незаметно съедает реальную стоимость сбережений и фиксированных доходов. При 3% годовой инфляции цены удваиваются примерно за 24 года (Правило 72: 72 ÷ 3 = 24). Пенсионный фонд, который сегодня кажется большим, через 20 лет может оказаться недостаточным без учёта инфляции.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое инфляция?', a: 'Инфляция — темп роста общего уровня цен на товары и услуги, снижающий покупательную способность денег. При 3% инфляции набор товаров за 100 ₽ год спустя стоит 103 ₽. Измеряется через ИПЦ (индекс потребительских цен). Центральные банки обычно целятся на 2% инфляцию в год.' },
      { q: 'Как инфляция влияет на сбережения?', a: 'Если вклад даёт 1%, а инфляция — 3%, реальная доходность равна −2%: деньги обесцениваются, даже несмотря на рост в номинале. За 20 лет при 3% инфляции для сохранения покупательной способности 100 000 ₽ нужно накопить ~180 000 ₽. Именно поэтому важны инвестиции, а не просто накопление.' },
      { q: 'Что такое гиперинфляция?', a: 'Гиперинфляция — рост цен свыше 50% в месяц (~12 975% в год). Примеры: Германия 1923 (цены удваивались каждые 3,7 дня), Зимбабве 2008, Венесуэла 2018 (>1 000 000%). Уничтожает сбережения, вызывает социальную нестабильность.' },
      { q: 'Что такое дефляция и хорошо ли это?', a: 'Дефляция — общее снижение цен (отрицательная инфляция). Несмотря на привлекательность дешёвых товаров, устойчивая дефляция опасна: потребители откладывают покупки, бизнес урезает инвестиции, реальная нагрузка по долгам растёт. Пример: "Потерянные десятилетия" Японии в 1990–2000-х.' },
      { q: 'Что такое Правило 72?', a: 'Правило 72 оценивает, за сколько лет цены удвоятся: Лет ≈ 72 ÷ темп инфляции. При 2%: 36 лет. При 6%: 12 лет. При 10%: 7,2 года. Правило работает и для инвестиций.' },
      { q: 'Как центральный банк контролирует инфляцию?', a: 'Главный инструмент — ключевая ставка. Повышение ставки удорожает кредиты, снижает спрос и остужает инфляцию. Снижение стимулирует спрос и может разогнать инфляцию. ЦБ РФ, ФРС, ЕЦБ обычно таргетируют 2–4% CPI.' },
      { q: 'Что вызывает инфляцию?', a: 'Основные причины: 1) Инфляция спроса — много денег при недостатке товаров; 2) Инфляция издержек — рост себестоимости; 3) Инерционная инфляция — спираль зарплат и цен; 4) Монетарная инфляция — чрезмерная эмиссия; 5) Импортированная инфляция — слабая валюта.' },
      { q: 'Что такое реальная и номинальная стоимость?', a: 'Номинальная стоимость — текущая цена без поправки на инфляцию. Реальная — с учётом инфляции. Зарплата 50 000 ₽ в 2010 и 60 000 ₽ в 2024: номинально +20%, но если цены выросли на 40%, реально снизилась на ~14%.' },
      { q: 'Как инвестировать, чтобы обогнать инфляцию?', a: 'Исторически акции обгоняют инфляцию на 5–7% в год. Другие активы: недвижимость, ОФЗ-ИН (инфляционные гособлигации), золото. Депозиты зачастую уступают инфляции. Ключ — диверсификация и длинный горизонт.' },
      { q: 'Что такое базовая и общая инфляция?', a: 'Общая инфляция (headline) включает все товары, в том числе волатильные продукты и энергию. Базовая (core) исключает продукты питания и энергию. ЦБ ориентируется на базовую, так как она лучше отражает устойчивые ценовые давления.' },
      { q: 'Насколько точен ИПЦ?', a: 'ИПЦ — полезное приближение, но имеет ограничения: смещение замещения (потребители переходят на более дешёвые товары), запаздывание включения новых товаров, качественные корректировки. Альтернативный показатель — дефлятор PCE (Personal Consumption Expenditures).' },
    ],
  },
  uk: {
    description: 'Наш калькулятор інфляції дозволяє розрахувати майбутню вартість грошей при заданому річному темпі інфляції або визначити відповідність цін у часі. Введіть суму, річну інфляцію та кількість років, щоб миттєво побачити динаміку купівельної спроможності.\n\nІнфляція непомітно знецінює заощадження і фіксовані доходи. При 3% річній інфляції ціни подвоюються приблизно за 24 роки (Правило 72: 72 ÷ 3 = 24). Пенсійний фонд, що здається великим сьогодні, через 20 років може виявитися недостатнім без врахування інфляції.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке інфляція?', a: 'Інфляція — темп зростання загального рівня цін на товари та послуги, що знижує купівельну спроможність грошей. При 3% інфляції набір товарів за 100 грн через рік коштує 103 грн. Вимірюється через ІСЦ (індекс споживчих цін). Центральні банки зазвичай цілять на 2% інфляцію на рік.' },
      { q: 'Як інфляція впливає на заощадження?', a: 'Якщо депозит дає 1%, а інфляція — 3%, реальна прибутковість дорівнює −2%. За 20 років при 3% інфляції для збереження купівельної спроможності 100 000 грн потрібно накопити ~180 000 грн.' },
      { q: 'Що таке гіперінфляція?', a: 'Гіперінфляція — зростання цін понад 50% на місяць (~12 975% на рік). Приклади: Германія 1923, Зімбабве 2008, Венесуела 2018 (>1 000 000%). Знищує заощадження, викликає соціальну нестабільність.' },
      { q: 'Що таке дефляція і чи це добре?', a: 'Дефляція — загальне зниження цін. Незважаючи на привабливість дешевших товарів, стійка дефляція небезпечна: споживачі відкладають покупки, бізнес скорочує інвестиції, реальне боргове навантаження зростає.' },
      { q: 'Що таке Правило 72?', a: 'Правило 72 оцінює, за скільки років ціни подвояться: Років ≈ 72 ÷ темп інфляції. При 2%: 36 років. При 6%: 12 років. При 10%: 7,2 роки.' },
      { q: 'Як центральний банк контролює інфляцію?', a: 'Головний інструмент — облікова ставка. Підвищення ставки здорожчує кредити, знижує попит і охолоджує інфляцію. НБУ, ФРС, ЄЦБ зазвичай таргетують 2–4% ІСЦ.' },
      { q: 'Що спричиняє інфляцію?', a: 'Основні причини: інфляція попиту, інфляція витрат, інерційна інфляція (спіраль зарплат і цін), монетарна емісія, імпортована інфляція через слабку валюту.' },
      { q: 'Що таке реальна та номінальна вартість?', a: 'Номінальна — поточна ціна без поправки на інфляцію. Реальна — з урахуванням інфляції. Зарплата 20 000 грн у 2010 та 30 000 грн у 2024: номінально +50%, але якщо ціни зросли на 80%, реально знизилася.' },
      { q: 'Як інвестувати, щоб обігнати інфляцію?', a: 'Акції виторгнули інфляцію на 5–7% на рік за довгими горизонтами. Інші активи: нерухомість, ОВДП-ІН, золото. Депозити часто поступаються інфляції. Ключ — диверсифікація.' },
      { q: 'Що таке базова та загальна інфляція?', a: 'Загальна (headline) включає всі товари, у тому числі волатильні продукти та енергоносії. Базова (core) їх виключає. НБУ орієнтується на базову, бо вона краще відображає стійкий ціновий тиск.' },
      { q: 'Наскільки точний ІСЦ?', a: 'ІСЦ — корисне наближення, але має обмеження: зміщення заміщення (споживачі переходять на дешевші товари), затримка включення нових товарів, якісні коригування. Альтернатива — дефлятор PCE.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice d\'inflation vous permet de calculer la valeur future de l\'argent à un taux d\'inflation annuel donné, ou de trouver l\'équivalent historique des prix d\'aujourd\'hui. Saisissez un montant, le taux d\'inflation annuel et le nombre d\'années pour voir instantanément l\'évolution annuelle du pouvoir d\'achat.\n\nL\'inflation érode silencieusement la valeur réelle de l\'épargne et des revenus fixes. À 3 % d\'inflation annuelle, les prix doublent en environ 24 ans (Règle de 72 : 72 ÷ 3 = 24). Un fonds de retraite qui semble important aujourd\'hui peut s\'avérer insuffisant dans 20 ans si l\'inflation n\'est pas prise en compte.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'inflation ?', a: 'L\'inflation est le taux auquel le niveau général des prix des biens et services augmente, réduisant le pouvoir d\'achat de la monnaie. À 3 % d\'inflation, un panier de 100 € coûte 103 € l\'année suivante. Elle est mesurée par l\'IPC (Indice des Prix à la Consommation). Les banques centrales ciblent généralement 2 % d\'inflation annuelle.' },
      { q: 'Comment l\'inflation affecte-t-elle l\'épargne ?', a: 'Si votre livret rapporte 1 % tandis que l\'inflation est à 3 %, le rendement réel est de −2 % : votre argent perd du pouvoir d\'achat malgré sa croissance nominale. Sur 20 ans à 3 % d\'inflation, 100 € d\'aujourd\'hui nécessitent 180 € pour maintenir le même pouvoir d\'achat.' },
      { q: 'Qu\'est-ce que l\'hyperinflation ?', a: 'L\'hyperinflation dépasse 50 % par mois (~12 975 % par an). Exemples célèbres : Allemagne 1923 (prix doublaient toutes les 3,7 jours), Zimbabwe 2008, Venezuela 2018 (>1 000 000 %). Elle détruit l\'épargne et cause une instabilité sociale.' },
      { q: 'Qu\'est-ce que la déflation et est-ce une bonne chose ?', a: 'La déflation, c\'est quand les prix baissent globalement. Malgré l\'apparente attractivité, une déflation durable est dangereuse : les consommateurs reportent leurs achats, les entreprises réduisent les investissements, et les dettes augmentent en termes réels. Les "décennies perdues" du Japon illustrent cette stagnation.' },
      { q: 'Qu\'est-ce que la Règle de 72 ?', a: 'La Règle de 72 estime le temps pour doubler les prix : Années ≈ 72 ÷ taux d\'inflation. À 2 % : 36 ans. À 6 % : 12 ans. À 10 % : 7,2 ans. Elle s\'applique aussi aux investissements (temps pour doubler un capital).' },
      { q: 'Comment la banque centrale contrôle-t-elle l\'inflation ?', a: 'Le principal outil est le taux directeur. Hausse → emprunts coûteux → moins de dépenses → ralentit l\'inflation. Baisse → stimule les dépenses → peut relancer l\'inflation. La BCE, la Fed et la Banque d\'Angleterre ciblent généralement 2 % d\'IPC.' },
      { q: 'Quelles sont les causes de l\'inflation ?', a: 'Principales causes : inflation par la demande (trop d\'argent pour trop peu de biens), inflation par les coûts (hausse des coûts de production), inflation inertielle (spirale salaires-prix), inflation monétaire (excès de création monétaire), inflation importée (monnaie faible).' },
      { q: 'Qu\'est-ce que la valeur réelle vs nominale ?', a: 'La valeur nominale est le prix courant sans ajustement pour l\'inflation. La valeur réelle l\'est. Un salaire de 30 000 € en 2010 vs 36 000 € en 2024 : nominalement +20 %, mais si les prix ont augmenté de 40 %, le salaire réel a baissé d\'environ 14 %.' },
      { q: 'Comment investir pour battre l\'inflation ?', a: 'Historiquement, les actions ont surpassé l\'inflation de 5 à 7 % annuellement sur le long terme. Autres actifs : immobilier, OATi (obligations indexées sur l\'inflation), or. Les livrets sous-performent souvent l\'inflation. La diversification est clé.' },
      { q: 'Qu\'est-ce que l\'inflation sous-jacente vs l\'inflation totale ?', a: 'L\'inflation totale (headline) inclut tous les biens, y compris l\'alimentaire et l\'énergie. L\'inflation sous-jacente (core) les exclut car trop volatils. Les banques centrales se concentrent sur l\'inflation sous-jacente pour les décisions de politique monétaire.' },
      { q: 'L\'IPC mesure-t-il précisément l\'inflation ?', a: 'L\'IPC est utile mais imparfait : biais de substitution (les ménages changent leurs achats), délai d\'intégration des nouveaux produits, ajustements qualitatifs. Le déflateur PCE est une mesure alternative qui corrige certains de ces biais.' },
    ],
  },
  lt: {
    description: 'Mūsų infliacijos skaičiuotuvas leidžia apskaičiuoti pinigų būsimąją vertę esant nurodytam metiniam infliacijos lygiui arba nustatyti praeities kainų atitikmenį dabartyje. Įveskite sumą, metinį infliacijos procentą ir metų skaičių, kad pamatytumėte perkamosios galios pokyčius kiekvienais metais.\n\nInfliacija tyliai ardo santaupų ir fiksuotų pajamų realią vertę. Esant 3% metinei infliacijai, kainos padvigubėja maždaug per 24 metus (Taisyklė 72: 72 ÷ 3 = 24). Pensijų fondas, kuris šiandien atrodo didelis, po 20 metų gali pasirodyti nepakankamas, neatsižvelgus į infliaciją.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kas yra infliacija?', a: 'Infliacija yra prekių ir paslaugų bendrojo kainų lygio kilimo tempas, mažinantis pinigų perkamąją galią. Esant 3% infliacijai, 100 € kainuojantis prekių krepšelis kitais metais kainuoja 103 €. Matuojama VKI (Vartotojų kainų indeksu). Centriniai bankai paprastai siekia 2% metinės infliacijos.' },
      { q: 'Kaip infliacija veikia santaupas?', a: 'Jei indėlis duoda 1%, o infliacija siekia 3%, reali grąža yra −2%: pinigai praranda perkamąją galią. Per 20 metų esant 3% infliacijai, 1000 € perkamąją galią išlaikyti reikia ~1806 €.' },
      { q: 'Kas yra hiperinfliacija?', a: 'Hiperinfliacijos atveju kainos kyla daugiau nei 50% per mėnesį (~12 975% per metus). Žymūs pavyzdžiai: Vokietija 1923, Zimbabvė 2008, Venesuela 2018 (>1 000 000%). Naikina santaupas, sukelia socialinį nestabilumą.' },
      { q: 'Kas yra defliacija ir ar tai gerai?', a: 'Defliacija – bendras kainų mažėjimas. Nepaisant pigesnių prekių patrauklumo, ilgalaikė defliacija pavojinga: vartotojai atideda pirkimus, verslas mažina investicijas, realios skolos auga. Japonijos „prarasti dešimtmečiai" iliustruoja šią stagnaciją.' },
      { q: 'Kas yra Taisyklė 72?', a: 'Taisyklė 72 įvertina, per kiek metų kainos padvigubės: Metai ≈ 72 ÷ infliacijos tempas. Esant 2%: 36 metai. Esant 6%: 12 metų. Esant 10%: 7,2 metai.' },
      { q: 'Kaip centrinis bankas kontroliuoja infliaciją?', a: 'Pagrindinis įrankis – palūkanų norma. Didinimas brangina paskolas, mažina paklausą, slopina infliaciją. Mažinimas skatina išlaidas. ECB, FED, Lietuvos bankas paprastai siekia 2% VKI.' },
      { q: 'Kas sukelia infliaciją?', a: 'Pagrindinės priežastys: paklausos infliacija (daug pinigų, mažai prekių), sąnaudų infliacija (brangstančios gamybos sąnaudos), inertinė infliacija (atlyginimų ir kainų spiralė), monetarinė infliacija (perteklinė pinigų emisija), importuota infliacija (silpna valiuta).' },
      { q: 'Kas yra realioji ir nominalioji vertė?', a: 'Nominalioji vertė – dabartinė kaina be infliacijos pataisos. Realioji – su pataisos. Atlyginimas 1000 € 2010 m. ir 1200 € 2024 m.: nominaliai +20%, bet jei kainos išaugo 40%, realusis atlyginimas sumažėjo ~14%.' },
      { q: 'Kaip investuoti, kad aplenkti infliaciją?', a: 'Istoriškai akcijos aplenkdavo infliaciją 5–7% per metus ilguoju laikotarpiu. Kiti turto tipai: nekilnojamasis turtas, infliacijos indeksuotos obligacijos, auksas. Indėliai dažnai atsilieka nuo infliacijos. Diversifikacija yra svarbiausia.' },
      { q: 'Kas yra bazinė ir bendroji infliacija?', a: 'Bendroji (headline) apima visas prekes, įskaitant svyruojančius maisto ir energijos kainas. Bazinė (core) jas neįtraukia. Centriniai bankai labiau remiasi bazine, nes ji geriau atspindi ilgalaikius kainų pokyčius.' },
      { q: 'Ar VKI tiksliai matuoja infliaciją?', a: 'VKI yra naudingas aproksimacingas rodiklis, tačiau turi trūkumų: pakaitalo šališkumas, naujų prekių vėlyvas įtraukimas, kokybės koregavimai. Alternatyva – PCE defliatoriaus rodiklis.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/inflation', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InflationPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/inflation`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <InflationCalculator locale={locale} />
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
