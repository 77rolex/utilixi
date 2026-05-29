import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PensionCalculator from './PensionCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/deposit', label: 'Deposit Calculator' },
    { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' },
    { href: '/calculator/income-tax', label: 'Income Tax Calculator' },
  ],
  ru: [
    { href: '/calculator/deposit', label: 'Калькулятор депозита' },
    { href: '/calculator/compound-interest', label: 'Калькулятор сложных процентов' },
    { href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' },
  ],
  uk: [
    { href: '/calculator/deposit', label: 'Калькулятор депозиту' },
    { href: '/calculator/compound-interest', label: 'Калькулятор складних відсотків' },
    { href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' },
  ],
  fr: [
    { href: '/calculator/deposit', label: 'Calculatrice de dépôt' },
    { href: '/calculator/compound-interest', label: 'Calculatrice d\'intérêts composés' },
    { href: '/calculator/income-tax', label: 'Calculatrice d\'impôt sur le revenu' },
  ],
  lt: [
    { href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' },
    { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' },
    { href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Pension Calculator UK — Free Retirement Savings Planner',
    description: 'Free pension calculator for UK and EU. Calculate how much to save monthly for retirement or model your pension fund drawdown. Covers pension pot growth, monthly payout, and retirement savings planning — instant results.',
    h1: 'Pension Calculator',
  },
  ru: {
    title: 'Пенсионный калькулятор — рассчитать накопления на пенсию онлайн',
    description: 'Бесплатный пенсионный калькулятор онлайн. Рассчитайте, сколько нужно откладывать ежемесячно, чтобы накопить нужный капитал к пенсии, или сколько можно снимать в месяц с уже накопленной суммы.',
    h1: 'Пенсионный калькулятор',
  },
  uk: {
    title: 'Пенсійний калькулятор — розрахувати накопичення на пенсію онлайн',
    description: 'Безкоштовний пенсійний калькулятор онлайн. Розрахуйте, скільки потрібно відкладати щомісяця, щоб накопичити потрібний капітал до пенсії, або скільки можна знімати на місяць з накопиченої суми.',
    h1: 'Пенсійний калькулятор',
  },
  fr: {
    title: 'Simulateur Retraite Gratuit — Calculatrice Épargne Retraite en ligne',
    description: 'Simulateur retraite gratuit en ligne. Calculez combien épargner chaque mois pour atteindre votre objectif retraite, ou combien retirer mensuellement de votre capital. Résultats instantanés pour la France, la Belgique et la Suisse.',
    h1: 'Calculatrice Retraite',
  },
  lt: {
    title: 'Pensijų Skaičiuotuvas — Nemokamas Pensijų Planavimo Įrankis',
    description: 'Nemokamas pensijų skaičiuotuvas internetu. Apskaičiuokite, kiek kaupti pensijai kas mėnesį tikslui pasiekti, arba kiek galite išsiimti kas mėnesį iš sukauptos sumos. Akimirksniu gauti rezultatai.',
    h1: 'Pensijų skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use this free pension calculator to model your retirement savings. The tool has two modes: Retirement savings — calculate how much your monthly contributions will grow by your target retirement age at an assumed annual return; Monthly payout — calculate how much you can withdraw per month from a given pension pot over a set number of years. Suitable for UK personal pensions, SIPPs, workplace pension top-ups, and private retirement savings across Europe and internationally.\n\nEnter your current savings, monthly contribution, expected annual return (4–7% is typical for a diversified long-term portfolio), and target retirement age. For UK users: the full new State Pension is worth up to £11,502 per year (2024/25) — factor this in alongside your private savings target. Results are estimates; actual outcomes depend on market returns, inflation, fund charges, and your country\'s pension regulations.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a pension fund calculator?', a: 'A pension fund calculator models how your retirement savings grow over time (accumulation phase) and how long they will last when you draw them down (decumulation phase). This tool covers both: the Retirement savings mode calculates your projected pension pot at retirement; the Monthly payout mode calculates a sustainable monthly income from an accumulated fund — useful for modelling SIPP drawdown, annuity comparisons, or any retirement savings pot.' },
      { q: 'How much pension pot do I need in the UK?', a: 'A widely used target is to replace 60–70% of pre-retirement income. For a retirement income of £30,000/year from private savings alone, you would need approximately £600,000–£750,000 (based on the 4% withdrawal rule). However, with the full State Pension of £11,502/year (2024/25), you only need private savings to cover the gap. For a £25,000/year total income, your private target is roughly £13,500/year from savings — requiring a pot of around £300,000–£350,000.' },
      { q: 'How much should I save each month for retirement?', a: 'The standard recommendation is 10–15% of gross income. Under UK auto-enrolment, the minimum combined contribution is 8% (3% employer + 5% employee). A 25-year-old earning £40,000 saving £400/month at 6% annual return could accumulate over £800,000 by age 65. A 35-year-old saving the same amount would accumulate roughly £450,000. Use this calculator to model your specific scenario.' },
      { q: 'What annual return should I assume for my pension?', a: 'Conservative (low-risk portfolio): 3–4% (bonds, cash ISAs, money market funds). Moderate (balanced portfolio): 5–7% (typical for Vanguard LifeStrategy 60/40 or similar). Aggressive (equity-heavy): 8–10% (all-equity funds; S&P 500 historical average ~10% before inflation). Always use net-of-fees return. For the drawdown phase, use a more conservative rate of 3–4% to account for sequence-of-returns risk.' },
      { q: 'What is the 4% rule for pension drawdown?', a: 'The 4% rule states that withdrawing 4% of your portfolio value per year means your savings are unlikely to run out over a 30-year retirement, based on historical market returns. A £500,000 pension pot supports roughly £20,000/year (£1,667/month) in withdrawals. Some UK financial planners recommend a slightly lower 3.5% withdrawal rate in the current environment, giving £17,500/year from £500,000. This tool lets you model any withdrawal amount and see how many years your fund will last.' },
      { q: 'What is the difference between a SIPP and a workplace pension?', a: 'A Self-Invested Personal Pension (SIPP) gives you full control over your investments but requires more active management. A workplace pension (e.g., Nest, LGPS, or your employer\'s scheme) automatically receives employer contributions — under UK auto-enrolment, employers must contribute at least 3% of qualifying earnings on top of your contributions. Most people should maximise employer pension contributions first (it is effectively free money) before making additional SIPP contributions.' },
      { q: 'How does the UK State Pension affect my private savings target?', a: 'The full new UK State Pension (2024/25) is £221.20/week (£11,502/year). You need 35 qualifying National Insurance years for the full amount, and a minimum of 10 years for any State Pension. This guaranteed income significantly reduces your private savings target. Check your forecast at gov.uk/check-state-pension. If you receive the full State Pension, you only need private savings to cover the gap between £11,502 and your desired total retirement income.' },
      { q: 'How does inflation affect my pension savings?', a: 'At 2% annual inflation, money loses roughly half its purchasing power over 35 years. A target of £30,000/year in today\'s money requires approximately £60,000/year in nominal terms in 35 years. To account for inflation in this calculator, use a real return: subtract expected inflation from your nominal return (e.g., 7% nominal return − 2.5% inflation = 4.5% real return). This will show your purchasing power in today\'s money.' },
      { q: 'At what age should I start saving for a pension?', a: 'As early as possible. Due to compound growth, starting 10 years earlier can more than double your pension pot by retirement. In the UK, you can contribute to a pension from birth and receive basic-rate tax relief (20%) on contributions up to 100% of earnings, or up to £3,600/year for non-earners. Higher-rate taxpayers can reclaim an additional 20–25% through self-assessment. The earlier you start, the less you need to save each month.' },
      { q: 'How accurate is this pension calculator?', a: 'This calculator models compound growth at a fixed annual rate of return — it does not simulate market volatility, sequence-of-returns risk, or changing contribution amounts. Real pension outcomes depend on market performance, fund management fees (typically 0.1–0.75%/year for mainstream UK providers), inflation, tax rules, and your own behaviour. Use this tool to explore scenarios and set a savings direction, then review with a regulated financial adviser for personalised pension planning.' },
    ],
  },
  ru: {
    description: 'Грамотное планирование пенсии — важный шаг к финансовой независимости. Калькулятор работает в двух режимах: «Накопить к пенсии» показывает, сколько вырастут ваши вложения к пенсионному возрасту при регулярных взносах и указанной доходности; «Ежемесячная выплата» рассчитывает, какую сумму вы сможете снимать каждый месяц с накопленного капитала в течение заданного срока.\n\nВведите текущие накопления (если есть), ежемесячный взнос, ожидаемую годовую доходность и целевой пенсионный возраст. Учитывайте, что реальный результат зависит от рыночной доходности, инфляции, комиссий управляющих и изменений пенсионного законодательства. Используйте расчёт как ориентир для составления личного пенсионного плана.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое пенсионный калькулятор онлайн?', a: 'Пенсионный калькулятор — инструмент для планирования пенсионных накоплений в двух режимах: расчёт накопления (сколько вырастет капитал при регулярных взносах) и расчёт выплаты (сколько можно снимать ежемесячно с накопленной суммы). Он помогает понять, сколько нужно откладывать сегодня, чтобы обеспечить желаемый доход на пенсии.' },
      { q: 'Сколько нужно накопить к пенсии?', a: 'Распространённый ориентир — 20–25 годовых расходов на пенсии (правило 4%). При желаемом ежемесячном доходе 60 000 ₽ из личных накоплений (720 000 ₽ в год) потребуется капитал 18–22 млн ₽. Если предполагается государственная пенсия, целевой капитал из личных накоплений сокращается на соответствующую сумму.' },
      { q: 'Сколько нужно откладывать в месяц?', a: 'Классическое правило — 10–15% от дохода. Чем раньше начать, тем меньше нужно откладывать ежемесячно благодаря эффекту сложного процента. Калькулятор поможет подобрать нужный взнос для вашего целевого капитала — введите желаемую итоговую сумму и проверьте, какой ежемесячный взнос вам нужен.' },
      { q: 'Какую годовую доходность указывать?', a: 'Консервативный вариант — 4–6% (облигации, консервативные фонды). Умеренный — 7–9% (сбалансированный портфель акций и облигаций). Агрессивный — 10–12% (портфель из акций). Указывайте доходность после вычета комиссий управляющего. В фазе выплат используйте более консервативную ставку 3–5%.' },
      { q: 'Для чего вкладка «Ежемесячная выплата»?', a: 'Она отвечает на вопрос: «Если у меня накоплено X рублей, сколько я смогу снимать в месяц в течение Y лет?» При этом учитывается, что остаток капитала продолжает работать по указанной ставке доходности. Это полезно для расчёта безопасного уровня снятий из портфеля или расчёта аннуитетного дохода.' },
      { q: 'Что такое правило 4% для пенсионных выплат?', a: 'Правило 4% — концепция безопасного снятия: ежегодно снимая 4% от портфеля, вы с высокой вероятностью не исчерпаете капитал в течение 30 лет пенсии. Например, при капитале 20 млн ₽ можно снимать 800 000 ₽ в год (66 000 ₽/месяц). При более консервативном подходе используйте 3–3,5%.' },
      { q: 'Как инфляция влияет на пенсионные накопления?', a: 'При инфляции 5% деньги теряют половину покупательной способности примерно за 14 лет. При планировании пенсии на 30+ лет это критично. Чтобы учесть инфляцию, используйте реальную доходность: вычтите инфляцию из номинальной (например, 9% − 5% = 4% реальная доходность). Тогда результат калькулятора будет показывать сумму в сегодняшних ценах.' },
      { q: 'В чём разница между НПФ и ИИС для пенсионных накоплений?', a: 'НПФ (негосударственный пенсионный фонд) — специализированный пенсионный инструмент с возможными льготами, но ограниченным доступом к средствам до пенсии. ИИС — более гибкий инструмент с налоговым вычетом (до 52 000 ₽/год возврата НДФЛ по типу А). Многие россияне используют комбинацию: НПФ для базовой пенсии и ИИС для самостоятельного инвестирования.' },
      { q: 'Почему расчёт приблизительный?', a: 'Государственная пенсия, налоги, комиссии управляющих, инфляция и рыночная волатильность влияют на реальный доход на пенсии. Калькулятор показывает математику сложного процента при фиксированной ставке доходности, но не учитывает колебания рынка, изменения законодательства и инфляцию. Используйте расчёт как ориентир, а не гарантию.' },
      { q: 'С какого возраста начинать копить на пенсию?', a: 'Как можно раньше. Начав в 25 лет вместо 35, при одинаковом ежемесячном взносе можно накопить более чем вдвое больше к пенсии — исключительно за счёт того, что сложный процент работает на 10 лет дольше. Даже небольшой ежемесячный взнос в 5 000–10 000 ₽ в возрасте 20–25 лет может к 60 годам превратиться в значительный капитал.' },
    ],
  },
  uk: {
    description: 'Грамотне планування пенсії — важливий крок до фінансової незалежності. Калькулятор працює у двох режимах: «Накопити до пенсії» показує, скільки зростуть ваші вкладення до пенсійного віку при регулярних внесках та заданій дохідності; «Щомісячна виплата» розраховує, яку суму ви зможете знімати щомісяця з накопиченого капіталу протягом заданого строку.\n\nВведіть поточні накопичення (якщо є), щомісячний внесок, очікувану річну дохідність і цільовий пенсійний вік. Враховуйте, що реальний результат залежить від ринкової дохідності, інфляції, комісій управляючих і змін пенсійного законодавства. Використовуйте розрахунок як орієнтир для складання особистого пенсійного плану.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке пенсійний калькулятор?', a: 'Пенсійний калькулятор — інструмент для планування пенсійних накопичень. Він дозволяє розрахувати, скільки виросте капітал при регулярних внесках (режим накопичення) та скільки можна знімати щомісяця з накопиченої суми (режим виплати). Допомагає зрозуміти, скільки потрібно відкладати вже сьогодні для забезпечення бажаного доходу на пенсії.' },
      { q: 'Скільки потрібно накопити до пенсії в Україні?', a: 'Поширений орієнтир — 20–25 річних витрат на пенсії (правило 4%). При бажаному місячному доході 30 000 грн з особистих накопичень (360 000 грн на рік) знадобиться капітал 9–11 млн грн. Враховуючи, що державна пенсія в Україні залишається відносно невисокою, більшість фахівців рекомендують накопичувати особисті заощадження паралельно з обов\'язковими відрахуваннями.' },
      { q: 'Скільки потрібно відкладати на місяць?', a: 'Класичне правило — 10–15% від доходу. Чим раніше почати, тим менше потрібно відкладати щомісяця завдяки складному відсотку. Калькулятор допоможе підібрати потрібний внесок — введіть бажану підсумкову суму та перевірте, який щомісячний внесок вам необхідний.' },
      { q: 'Яку річну дохідність вказувати?', a: 'Консервативний варіант — 4–6% (облігації, консервативні фонди). Помірний — 7–9% (збалансований портфель акцій та облігацій). Агресивний — 10–12% (портфель з акцій). Вказуйте дохідність після вирахування комісій управляючого. У фазі виплат використовуйте більш консервативну ставку 3–5%.' },
      { q: 'Для чого вкладка «Щомісячна виплата»?', a: 'Вона відповідає на запитання: «Якщо у мене накопичено X гривень, скільки я зможу знімати на місяць протягом Y років?» При цьому враховується, що залишок капіталу продовжує працювати за вказаною ставкою дохідності. Корисно для розрахунку безпечного рівня знять з портфеля.' },
      { q: 'Що таке правило 4% для пенсійних виплат?', a: 'Правило 4% — концепція безпечного зняття: щорічно знімаючи 4% від портфеля, ви з високою ймовірністю не вичерпаєте капітал протягом 30 років пенсії. Наприклад, при капіталі 10 млн грн можна знімати 400 000 грн на рік (33 000 грн/місяць). При більш консервативному підході використовуйте 3–3,5%.' },
      { q: 'Як інфляція впливає на пенсійні накопичення?', a: 'При високій інфляції реальна купівельна спроможність накопичень знижується. Щоб врахувати інфляцію, використовуйте реальну дохідність: вичтіть інфляцію з номінальної (наприклад, 9% − 6% = 3% реальна дохідність). Тоді результат калькулятора показуватиме суму в сьогоднішніх цінах.' },
      { q: 'Як накопичити на пенсію в Україні без державного пенсійного фонду?', a: 'В Україні доступні: банківські депозити (захищені ФГВФО до 600 000 грн), ОВДП (держоблігації), інвестиційні фонди (КУА), страхові накопичувальні продукти та самостійне інвестування в акції та ETF через брокерів. Диверсифікація між кількома інструментами знижує ризики і підвищує шанси досягти пенсійної мети.' },
      { q: 'Чому розрахунок орієнтовний?', a: 'Державна пенсія, податки, комісії управляючих, інфляція та ринкова волатильність впливають на реальний дохід на пенсії. Калькулятор показує математику складного відсотка при фіксованій ставці дохідності, але не враховує коливання ринку, зміни законодавства та інфляцію. Використовуйте розрахунок як орієнтир.' },
      { q: 'З якого віку починати накопичувати на пенсію?', a: 'Якомога раніше. Почавши у 25 років замість 35, при однакових щомісячних внесках можна накопити більш ніж вдвічі більше до пенсії завдяки тому, що складний відсоток працює на 10 років довше. Навіть невеликий щомісячний внесок у 1 000–2 000 грн у молодому віці може до 60 років перетворитися на значний капітал.' },
    ],
  },
  fr: {
    description: 'Utilisez ce simulateur retraite gratuit pour planifier votre épargne retraite. L\'outil fonctionne en deux modes : « Épargner pour la retraite » calcule combien votre épargne mensuelle va croître d\'ici votre départ en retraite à un taux de rendement supposé ; « Versement mensuel » calcule combien vous pouvez retirer chaque mois d\'un capital accumulé sur une durée donnée. Adapté aux PER (Plan d\'Épargne Retraite), assurance vie et épargne salariale en France, Belgique et Suisse.\n\nEntrez vos économies actuelles, votre versement mensuel, le rendement annuel attendu (5–7 % est typique pour un portefeuille diversifié à long terme) et l\'âge de départ à la retraite. Pour les résidents français : la retraite de base de la Sécurité sociale complète votre épargne personnelle. Les résultats sont des estimations — les rendements réels dépendent des marchés, de l\'inflation et des frais de gestion.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qu\'un simulateur retraite ?', a: 'Un simulateur retraite modélise deux choses : comment votre épargne croît pendant la phase d\'accumulation, et combien vous pouvez retirer pendant la retraite. Cet outil couvre les deux : le mode « Épargner » projette votre capital à la retraite ; le mode « Versement mensuel » calcule un retrait mensuel soutenable depuis un capital constitué — utile pour modéliser la sortie d\'un PER, d\'une assurance vie ou d\'un plan d\'épargne salariale.' },
      { q: 'Combien épargner pour la retraite en France ?', a: 'Une règle courante est de viser 60–70 % de vos revenus nets actuels à la retraite. La retraite de base Sécurité sociale couvre une partie, rarement l\'intégralité. En France, pour compléter avec 800 €/mois de revenu privé, vous aurez besoin de 190 000–250 000 € de capital. Le PER (Plan d\'Épargne Retraite) permet de déduire les versements de votre revenu imposable — un avantage fiscal significatif.' },
      { q: 'Combien épargner chaque mois pour la retraite ?', a: 'La recommandation standard est d\'épargner 10 à 15 % de vos revenus bruts. Un actif de 30 ans épargnant 300 €/mois avec un rendement de 6 % peut accumuler environ 285 000 € à 65 ans. À 40 ans avec le même effort, le capital serait d\'environ 140 000 €. Plus vous commencez tôt, moins vous avez besoin d\'épargner chaque mois grâce aux intérêts composés.' },
      { q: 'Quel rendement annuel utiliser pour le simulateur ?', a: 'Conservateur (faible risque) : 2–4 % (fonds en euros d\'assurance vie, livrets réglementés). Modéré : 5–7 % (portefeuille équilibré, fonds mixtes). Agressif : 8–10 % (portefeuille orienté actions). Utilisez un rendement net de frais — les assurances vie et PER prélèvent généralement 0,5–1 %/an. En phase de décaissement, utilisez un taux plus prudent de 3–4 %.' },
      { q: 'Qu\'est-ce que la règle des 4 % pour la retraite ?', a: 'La règle des 4 % stipule que retirer 4 % de votre portefeuille par an vous permet de ne pas l\'épuiser sur 30 ans de retraite, selon les données historiques. Un capital de 300 000 € permet de retirer 12 000 €/an (1 000 €/mois). En France, certains conseillers recommandent 3,5 % comme taux de retrait prudent dans le contexte actuel.' },
      { q: 'Quels produits d\'épargne retraite existent en France, Belgique et Suisse ?', a: 'En France : PER individuel (déductible fiscalement), assurance vie multisupport (flexible, fiscalité avantageuse après 8 ans), PERECO (épargne salariale avec abondement employeur). En Belgique : PLCI (Pension Libre Complémentaire pour Indépendants), EIP (Engagement Individuel de Pension), épargne-pension (déduction fiscale jusqu\'à 30 % des versements). En Suisse : Pilier 3a (déduction fiscale jusqu\'à 7 056 CHF/an en 2024).' },
      { q: 'Comment l\'inflation affecte-t-elle l\'épargne retraite ?', a: 'À 2 % d\'inflation annuelle, le pouvoir d\'achat est réduit de moitié en 35 ans. Pour tenir compte de l\'inflation dans ce simulateur, utilisez un rendement réel : soustrayez l\'inflation attendue de votre rendement nominal (ex. 7 % rendement − 2,5 % inflation = 4,5 % rendement réel). Le résultat affichera alors votre capital futur en euros d\'aujourd\'hui.' },
      { q: 'À quel âge commencer à épargner pour la retraite ?', a: 'Le plus tôt possible. Commencer à 30 ans plutôt qu\'à 40 ans avec 200 €/mois à 6 % de rendement génère plus de 200 000 € d\'écart à 65 ans. En France, les versements sur un PER ouvrent droit à une déduction fiscale — un actif imposé dans la tranche à 30 % récupère 30 centimes par euro versé. Plus vous commencez tôt, plus l\'effet des intérêts composés est significatif.' },
      { q: 'Quelle est la différence entre le PER et l\'assurance vie ?', a: 'Le PER (Plan d\'Épargne Retraite) est conçu pour la retraite : les versements sont déductibles du revenu imposable, mais les fonds sont bloqués jusqu\'à la retraite (sauf cas exceptionnels). L\'assurance vie est plus flexible : pas de blocage, disponibilité à tout moment, et une fiscalité avantageuse après 8 ans. Beaucoup de Français utilisent les deux : le PER pour l\'avantage fiscal immédiat et l\'assurance vie pour la flexibilité.' },
      { q: 'Quelle est la précision de ce simulateur retraite ?', a: 'Ce simulateur modélise la croissance composée à un taux fixe — il ne simule pas la volatilité des marchés ni le risque de séquence des rendements. Les résultats réels dépendent des performances des marchés, des frais de gestion (0,5–1 %/an pour la plupart des assurances vie et PER), de l\'inflation et de votre régularité dans les versements. Utilisez cet outil pour définir une direction d\'épargne, puis consultez un conseiller financier pour une stratégie personnalisée.' },
    ],
  },
  lt: {
    description: 'Naudokite šį nemokamą pensijų skaičiuotuvą, kad suplanuotumėte pensijų santaupas. Įrankis veikia dviem režimais: „Kaupti pensijai" — apskaičiuoja, kiek išaugs jūsų mėnesiniai įnašai iki numatyto pensinio amžiaus esant nurodytai metinei grąžai; „Mėnesinė išmoka" — apskaičiuoja, kiek galite išsiimti kas mėnesį iš sukauptos sumos per nustatytą metų skaičių. Tinka privačioms pensijų santaupoms, III pakopos pensijų fondams ir kitoms santaupų formoms Lietuvoje ir kitose Europos šalyse.\n\nĮveskite dabartines santaupas, mėnesinį įnašą, numatomą metinę grąžą (5–7 % yra tipinis ilgalaikio diversifikuoto portfelio rodiklis) ir tikslinį pensijos amžių. Lietuvoje: „Sodros" pensija ir II pakopos pensijų fondas papildo asmenines santaupas — atsižvelkite į tai sudarydami pensijų planą. Rezultatai yra apytiksliniai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra pensijų skaičiuotuvas?', a: 'Pensijų skaičiuotuvas yra įrankis, skirtas pensijų santaupų planavimui. Jis leidžia apskaičiuoti, kiek išaugs kapitalas su reguliariais įnašais (kaupimo režimas) ir kiek galima išsiimti kas mėnesį iš sukauptos sumos (išmokų režimas). Padeda suprasti, kiek reikia taupyti šiandien, kad būtų užtikrintos norimos pajamos pensijoje.' },
      { q: 'Kiek reikia sukaupti pensijai Lietuvoje?', a: 'Dažnas orientyras — 20–25 metinių išlaidų pensijoje (4 % taisyklė). Norint papildomų 600 €/mėn. pajamų iš asmeninių santaupų (7 200 €/metus), reikia apie 180 000–240 000 € kapitalo. „Sodros" pensija ir II pakopos pensijų fondas (privalomas kaupimas) mažina reikiamą asmeninių santaupų sumą.' },
      { q: 'Kiek reikia taupyti per mėnesį?', a: 'Standartinė rekomendacija — 10–15 % bruto pajamų. 30-metis, taupantis 200 €/mėn. su 6 % metine grąža, iki 65 metų gali sukaupti apie 190 000 €. 40-metis su ta pačia suma sukauptų apie 95 000 €. Kuo anksčiau pradedate, tuo mažiau reikia taupyti kas mėnesį dėl sudėtinių palūkanų efekto.' },
      { q: 'Kokią metinę grąžą nurodyti?', a: 'Konservatyvu (maža rizika): 2–4 % (obligacijos, pinigų rinkos fondai). Vidutiniška: 5–7 % (subalansuotas portfelis). Agresyvu: 8–10 % (akcijų portfelis). Nurodykite grąžą atėmus komisinius. III pakopos pensijų fondų komisiniai Lietuvoje siekia apie 0,5–1 %/metai. Išmokų fazėje naudokite konservatyvesnę 3–4 % normą.' },
      { q: 'Kam skirtas „Mėnesinės išmokos" režimas?', a: 'Jis atsako į klausimą: „Jei turiu X eurų, kiek galiu išsiimti per mėnesį per Y metų?" Skaičiuojama mėnesinė išmoka iš fiksuoto kapitalo, darant prielaidą, kad likęs kapitalas toliau uždirba nurodytą grąžą. Naudinga modeliuojant III pakopos pensijų fondo ar asmeninio portfelio išmokų strategiją.' },
      { q: 'Kas yra 4 % taisyklė pensijų išmokoms?', a: '4 % taisyklė teigia, kad kasmet išsiimant 4 % portfelio vertės, kapitalas su didele tikimybe neišseks per 30 pensijos metų. Pavyzdžiui, turėdami 200 000 €, galite išsiimti 8 000 €/metus (apie 667 €/mėn.). Kai kurie finansų patarėjai rekomenduoja konservatyvesnę 3–3,5 % normą.' },
      { q: 'Kaip infliacija veikia pensijų santaupas?', a: 'Esant 3 % infliacijai, pinigai per 24 metus netenka pusės perkamosios galios. Norint atsižvelgti į infliaciją, naudokite realią grąžą: atimkite infliaciją iš nominalios (pvz., 7 % nominalus − 3 % infliacija = 4 % realus). Tada skaičiuotuvas rodys jūsų kaupimo tikslą šiandieninėmis kainomis.' },
      { q: 'Kaip veikia pensijų sistema Lietuvoje?', a: 'Lietuvoje veikia trijų pakopų sistema: I pakopa — „Sodros" valstybinė pensija (privaloma); II pakopa — privalomas kaupimas pensijų fonduose (3 % nuo darbo užmokesčio + valstybės papildas); III pakopa — savanoriškas papildomas kaupimas pensijų fonduose ar gyvybės draudime (iki 2 000 €/metus mokestinė lengvata — 25 % GPM grąžinamas). Rekomenduojama naudotis visomis pakopomis.' },
      { q: 'Kodėl skaičiavimas yra apytikslis?', a: 'Skaičiuotuvas modeliuoja sudėtinių palūkanų augimą esant fiksuotai metinei grąžai — jis nesimituoja rinkos svyravimų, grąžos sekos rizikos ar kintančių įnašų. Tikri rezultatai priklauso nuo rinkos veiklos, fondų mokesčių, infliacijos ir jūsų reguliarumo mokant įnašus. Naudokite kaip planavimo gairę.' },
      { q: 'Nuo kokio amžiaus pradėti kaupti pensijai?', a: 'Kuo anksčiau, tuo geriau. Pradedant 25, o ne 35 metų amžiaus su vienodais mėnesiniais įnašais, iki pensijos galima sukaupti daugiau nei dvigubai daugiau. Lietuvoje nuo 18 metų galima prisijungti prie III pakopos pensijų fondo ir gauti mokestinę lengvatą — iki 25 % nuo įmokėtų lėšų grąžinama kaip gyventojų pajamų mokesčio kompensacija.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/pension') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PensionPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/pension`,
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
        <PensionCalculator locale={locale} />
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
