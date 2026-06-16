import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import NetWorthCalculator from './NetWorthCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' },
    { href: '/calculator/roi', label: 'ROI Calculator' },
    { href: '/calculator/mortgage', label: 'Mortgage Calculator' },
    { href: '/calculator/pension', label: 'Pension Calculator' },
  ],
  ru: [
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/calculator/compound-interest', label: 'Сложные проценты' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' },
    { href: '/calculator/pension', label: 'Пенсионный калькулятор' },
  ],
  uk: [
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/calculator/compound-interest', label: 'Складні відсотки' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' },
    { href: '/calculator/pension', label: 'Пенсійний калькулятор' },
  ],
  fr: [
    { href: '/calculator/savings-goal', label: 'Calculatrice Objectif Épargne' },
    { href: '/calculator/compound-interest', label: 'Calculatrice Intérêts Composés' },
    { href: '/calculator/roi', label: 'Calculatrice ROI' },
    { href: '/calculator/mortgage', label: 'Calculatrice de Prêt Immobilier' },
    { href: '/calculator/pension', label: 'Calculatrice Retraite' },
  ],
  lt: [
    { href: '/calculator/savings-goal', label: 'Taupymo tikslo skaičiuotuvas' },
    { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' },
    { href: '/calculator/roi', label: 'RI skaičiuotuvas' },
    { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' },
    { href: '/calculator/pension', label: 'Pensijų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Net Worth Calculator — Assets Minus Liabilities',
    description: 'Free net worth calculator. Calculate your total assets minus total liabilities to find your net worth. Enter cash, investments, real estate, loans, and debts for an instant financial snapshot.',
    h1: 'Net Worth Calculator',
    subtitle: 'Add up your assets and subtract your liabilities to calculate your total net worth.',
  },
  ru: {
    title: 'Калькулятор чистых активов — активы минус долги',
    description: 'Бесплатный калькулятор чистых активов. Рассчитайте свой капитал: активы минус обязательства. Введите наличные, инвестиции, недвижимость, кредиты и долги для мгновенного финансового снэпшота.',
    h1: 'Калькулятор чистых активов',
    subtitle: 'Сложите активы и вычтите обязательства, чтобы узнать своё чистое состояние.',
  },
  uk: {
    title: 'Калькулятор чистих активів — активи мінус борги',
    description: 'Безкоштовний калькулятор чистих активів. Розрахуйте свій капітал: активи мінус зобов\'язання. Введіть готівку, інвестиції, нерухомість, кредити та борги для миттєвого фінансового знімка.',
    h1: 'Калькулятор чистих активів',
    subtitle: 'Складіть активи та відніміть зобов\'язання, щоб дізнатися своє чисте майно.',
  },
  fr: {
    title: 'Calculatrice Valeur Nette — Actifs Moins Passifs',
    description: 'Calculatrice de valeur nette gratuite. Calculez votre patrimoine net : actifs moins passifs. Entrez liquidités, investissements, immobilier, prêts et dettes pour un bilan financier instantané.',
    h1: 'Calculatrice Valeur Nette',
    subtitle: 'Additionnez vos actifs et soustrayez vos dettes pour connaître votre patrimoine net total.',
  },
  lt: {
    title: 'Grynosios Vertės Skaičiuotuvas — Turtas Minus Skolos',
    description: 'Nemokamas grynosios vertės skaičiuotuvas. Apskaičiuokite savo grynąją finansinę vertę: turtas atėmus įsipareigojimus. Įveskite grynuosius, investicijas, nekilnojamąjį turtą, paskolas ir skolas.',
    h1: 'Grynosios Vertės Skaičiuotuvas',
    subtitle: 'Sudėkite turtą ir atimkite įsipareigojimus, kad sužinotumėte savo grynąją vertę.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our net worth calculator gives you an instant snapshot of your financial health by adding up all your assets and subtracting all your liabilities. Assets include cash and savings, investment portfolios, real estate, vehicles, and any other valuable property you own. Liabilities include mortgages, car loans, student loans, credit card balances, and any other outstanding debts. The result — your net worth — is the single most important number in personal finance.\n\nTracking your net worth regularly (monthly or quarterly) is one of the most effective ways to measure financial progress. A positive and growing net worth means you are building wealth; a negative net worth means your debts exceed your assets, which is common early in adult life due to student loans or mortgages. By understanding exactly where you stand, you can make better decisions about paying off debt, saving, and investing.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is net worth?', a: 'Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). Formula: Net Worth = Total Assets − Total Liabilities. It is the most comprehensive single measure of your financial position at a given point in time.' },
      { q: 'What counts as an asset?', a: 'Assets include: bank accounts and cash, investments (stocks, bonds, mutual funds, crypto), retirement accounts (pension, 401k, IRA), real estate (home value, rental properties), vehicles (cars, motorcycles, boats), business interests, jewellery and collectibles, and any other valuable property you own outright or partially.' },
      { q: 'What counts as a liability?', a: 'Liabilities are debts you owe: mortgage balance (not property value — only what you still owe), car loans, student loans, personal loans, credit card balances, home equity loans, business loans, taxes owed, and any other outstanding financial obligations.' },
      { q: 'What is a good net worth?', a: 'Net worth depends heavily on age, income, and location. A common benchmark: your net worth at age 40 should be roughly twice your annual income. In the US, the median net worth is around $192,000 for households aged 45–54. Many financial planners target a retirement net worth of 25× annual expenses (the "4% rule").' },
      { q: 'Is a negative net worth bad?', a: 'Not necessarily. Many young adults have negative net worth due to student loans or mortgages. What matters is the trend — is it improving? A rising net worth over time indicates healthy financial behaviour, even if the current balance is negative.' },
      { q: 'How often should I calculate my net worth?', a: 'Most financial advisers recommend tracking net worth monthly or quarterly. Annual tracking is the minimum. Regular tracking keeps you accountable, helps you see progress, and quickly reveals if something is going wrong (unexpected debt growth, investment losses).' },
      { q: 'Should I include my home in net worth?', a: 'Yes — at current market value, not purchase price. However, remember that your home is an illiquid asset (hard to sell quickly) and often carries a mortgage liability against it. Many financial planners calculate net worth both including and excluding the primary residence for a complete picture.' },
      { q: 'How do I increase my net worth?', a: 'Two strategies: increase assets (save more, invest, buy appreciating assets) and decrease liabilities (pay off debts, avoid new debt). The fastest way to grow net worth is usually to eliminate high-interest debt first (credit cards at 15–25%), then invest the freed-up cash flow.' },
      { q: 'What is the difference between net worth and income?', a: 'Income is what you earn; net worth is what you keep. A high income does not guarantee a high net worth if spending and debt are also high. Many high-income individuals have low net worth due to lifestyle inflation and debt. Net worth, not income, is the true measure of financial wealth.' },
      { q: 'Should I include retirement accounts in net worth?', a: 'Yes. Retirement accounts (pension funds, 401k, IRA, ISA) are assets that belong to you and should be included in total net worth. However, it\'s worth noting that early withdrawal from tax-advantaged accounts often incurs penalties and taxes, so they\'re less liquid than bank accounts.' },
      { q: 'How do I value illiquid assets for net worth?', a: 'Use realistic current market values, not what you paid. For real estate: use current market estimates (Zillow, estate agent valuations). For vehicles: use current market value (Autoscout24, Cargurus). For collectibles and jewellery: use recent auction prices or professional appraisals.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор чистых активов даёт мгновенный финансовый срез: суммирует все активы и вычитает все обязательства. Активы включают наличные и сбережения, инвестиции, недвижимость, транспорт и прочее имущество. Обязательства — ипотека, автокредит, студенческий кредит, кредитные карты и прочие долги. Результат — ваши чистые активы — главный показатель финансового состояния.\n\nРегулярный расчёт чистых активов (ежемесячно или ежеквартально) — один из самых эффективных способов отслеживать финансовый прогресс. Положительные и растущие чистые активы означают накопление богатства; отрицательные — долги превышают активы, что нормально на раннем этапе жизни из-за студенческих кредитов или ипотеки.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое чистые активы (чистый капитал)?', a: 'Чистые активы = Все активы − Все обязательства. Это наиболее полный показатель вашего финансового положения. Активы — всё, чем вы владеете; обязательства — всё, что вы должны.' },
      { q: 'Что относится к активам?', a: 'Активы: банковские счета и наличные, инвестиции (акции, облигации, крипта), пенсионные счета, недвижимость (рыночная стоимость), транспортные средства, доли в бизнесе, ювелирные украшения и коллекции, прочее ценное имущество.' },
      { q: 'Что относится к обязательствам?', a: 'Обязательства: остаток ипотеки (не стоимость недвижимости, а именно долг), автокредит, студенческий кредит, потребительские кредиты, задолженность по кредитным картам, прочие финансовые обязательства.' },
      { q: 'Какой нормальный уровень чистых активов?', a: 'Общий ориентир: в 40 лет чистые активы должны составлять примерно двойной годовой доход. Медианный уровень в России варьируется от региона, но для планирования пенсии часто используют правило 25-кратного годового расхода.' },
      { q: 'Плохо ли иметь отрицательные чистые активы?', a: 'Не обязательно. У многих молодых людей чистые активы отрицательные из-за ипотеки или студенческих кредитов. Важна тенденция — растут ли они со временем? Стабильный рост говорит о здоровом финансовом поведении.' },
      { q: 'Как часто нужно считать чистые активы?', a: 'Большинство финансовых консультантов рекомендуют ежемесячный или ежеквартальный расчёт. Минимум — раз в год. Регулярный мониторинг помогает отслеживать прогресс и быстро выявлять проблемы.' },
      { q: 'Включать ли квартиру в чистые активы?', a: 'Да, по текущей рыночной стоимости. Но помните: жильё — неликвидный актив, а ипотека — обязательство. Многие финансисты считают чистые активы как с учётом первичного жилья, так и без него.' },
      { q: 'Как увеличить чистые активы?', a: 'Два пути: увеличить активы (больше сберегать, инвестировать) и уменьшить обязательства (гасить долги). Быстрейший рост даёт погашение дорогих кредитов (кредитные карты) с дальнейшим перенаправлением средств в инвестиции.' },
      { q: 'Чем чистые активы отличаются от дохода?', a: 'Доход — то, что вы зарабатываете; чистые активы — то, что вы сохраняете. Высокий доход не гарантирует высокий капитал при высоких тратах и долгах. Чистые активы — настоящий показатель финансового благополучия.' },
      { q: 'Включать ли пенсионные накопления?', a: 'Да. Пенсионные счета (НПФ, ИИС, брокерский счёт) — ваши активы. Однако досрочный вывод часто сопряжён со штрафами, поэтому они менее ликвидны, чем банковские счета.' },
      { q: 'Как оценить неликвидные активы?', a: 'Используйте реальную рыночную стоимость, а не цену покупки. Недвижимость: текущие рыночные оценки. Автомобиль: текущая рыночная стоимость по аналогичным объявлениям. Украшения: последние цены аукционов или профессиональная оценка.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор чистих активів дає миттєвий фінансовий знімок: підсумовує всі активи та віднімає всі зобов\'язання. Активи включають готівку та заощадження, інвестиції, нерухомість, транспорт та інше майно. Зобов\'язання — іпотека, автокредит, студентський кредит, кредитні картки та інші борги. Результат — ваші чисті активи — головний показник фінансового стану.\n\nРегулярний розрахунок чистих активів (щомісяця або щоквартально) — один із найефективніших способів відстежувати фінансовий прогрес. Позитивні та зростаючі чисті активи означають накопичення багатства; від\'ємні — борги перевищують активи, що нормально на ранньому етапі через іпотеку або студентські кредити.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке чисті активи (чистий капітал)?', a: 'Чисті активи = Усі активи − Усі зобов\'язання. Це найбільш повний показник вашого фінансового становища. Активи — все, чим ви володієте; зобов\'язання — все, що ви винні.' },
      { q: 'Що відноситься до активів?', a: 'Активи: банківські рахунки та готівка, інвестиції (акції, облігації, крипта), пенсійні рахунки, нерухомість (ринкова вартість), транспортні засоби, частки в бізнесі, ювелірні прикраси та колекції.' },
      { q: 'Що відноситься до зобов\'язань?', a: 'Зобов\'язання: залишок іпотеки (не вартість нерухомості, а саме борг), автокредит, студентський кредит, споживчі кредити, заборгованість за кредитними картками, інші фінансові зобов\'язання.' },
      { q: 'Який нормальний рівень чистих активів?', a: 'Загальний орієнтир: у 40 років чисті активи мають бути приблизно вдвічі більшими за річний дохід. Для планування пенсії часто використовують правило 25-кратного річного витрату.' },
      { q: 'Чи погано мати від\'ємні чисті активи?', a: 'Не обов\'язково. У багатьох молодих людей чисті активи від\'ємні через іпотеку або студентські кредити. Важлива тенденція — чи ростуть вони з часом? Стабільне зростання говорить про здорову фінансову поведінку.' },
      { q: 'Як часто потрібно рахувати чисті активи?', a: 'Більшість фінансових консультантів рекомендують щомісячний або щоквартальний розрахунок. Мінімум — раз на рік. Регулярний моніторинг допомагає відстежувати прогрес і швидко виявляти проблеми.' },
      { q: 'Чи включати квартиру в чисті активи?', a: 'Так, за поточною ринковою вартістю. Але пам\'ятайте: житло — неліквідний актив, а іпотека — зобов\'язання. Багато фінансистів розраховують чисті активи як з урахуванням первинного житла, так і без нього.' },
      { q: 'Як збільшити чисті активи?', a: 'Два шляхи: збільшити активи (більше заощаджувати, інвестувати) і зменшити зобов\'язання (гасити борги). Найшвидший ріст дає погашення дорогих кредитів (кредитні картки) з подальшим спрямуванням коштів в інвестиції.' },
      { q: 'Чим чисті активи відрізняються від доходу?', a: 'Дохід — те, що ви заробляєте; чисті активи — те, що ви зберігаєте. Великий дохід не гарантує великий капітал за великих витрат і боргів. Чисті активи — справжній показник фінансового добробуту.' },
      { q: 'Чи включати пенсійні накопичення?', a: 'Так. Пенсійні рахунки — ваші активи. Однак дострокове виведення зазвичай пов\'язане зі штрафами, тому вони менш ліквідні, ніж банківські рахунки.' },
      { q: 'Як оцінити неліквідні активи?', a: 'Використовуйте реальну ринкову вартість, а не ціну покупки. Нерухомість: поточні ринкові оцінки. Автомобіль: поточна ринкова вартість за аналогічними оголошеннями. Прикраси: останні ціни аукціонів або професійна оцінка.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de valeur nette vous donne un instantané complet de votre santé financière en additionnant tous vos actifs et en soustrayant toutes vos dettes. Les actifs comprennent les liquidités et l\'épargne, les portefeuilles d\'investissement, l\'immobilier, les véhicules et tout autre bien précieux. Les passifs comprennent les prêts immobiliers, les prêts auto, les prêts étudiants, les soldes de cartes de crédit et toutes les autres dettes en cours. Le résultat — votre valeur nette — est le chiffre le plus important de la finance personnelle.\n\nSuivre sa valeur nette régulièrement (mensuellement ou trimestriellement) est l\'une des façons les plus efficaces de mesurer ses progrès financiers. Une valeur nette positive et croissante signifie que vous construisez un patrimoine ; une valeur nette négative signifie que vos dettes dépassent vos actifs, ce qui est courant en début de vie adulte en raison des prêts étudiants ou immobiliers.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que la valeur nette (patrimoine net) ?', a: 'La valeur nette = Total des actifs − Total des passifs. C\'est la mesure la plus complète de votre situation financière à un moment donné. Les actifs sont tout ce que vous possédez ; les passifs sont tout ce que vous devez.' },
      { q: 'Qu\'est-ce qui compte comme actif ?', a: 'Actifs : comptes bancaires et liquidités, investissements (actions, obligations, crypto), comptes retraite, immobilier (valeur marchande actuelle), véhicules, parts d\'entreprise, bijoux et collections, tout autre bien précieux.' },
      { q: 'Qu\'est-ce qui compte comme passif ?', a: 'Passifs : solde du prêt immobilier (pas la valeur du bien — seulement ce que vous devez encore), prêt auto, prêts étudiants, prêts personnels, soldes de cartes de crédit, autres obligations financières.' },
      { q: 'Quelle est une bonne valeur nette ?', a: 'La règle courante : à 40 ans, votre patrimoine net devrait être environ le double de votre revenu annuel. En France, la médiane du patrimoine net pour les 45–54 ans est d\'environ 200 000 €. Pour la retraite, beaucoup visent 25 fois les dépenses annuelles (règle des 4 %).' },
      { q: 'Une valeur nette négative est-elle grave ?', a: 'Pas nécessairement. De nombreux jeunes adultes ont une valeur nette négative en raison des prêts étudiants ou immobiliers. Ce qui compte, c\'est la tendance : s\'améliore-t-elle ? Une valeur nette croissante dans le temps indique un comportement financier sain.' },
      { q: 'À quelle fréquence calculer sa valeur nette ?', a: 'La plupart des conseillers financiers recommandent un suivi mensuel ou trimestriel. Le minimum est annuel. Un suivi régulier vous responsabilise et révèle rapidement tout problème (endettement croissant, pertes d\'investissement).' },
      { q: 'Faut-il inclure sa résidence principale ?', a: 'Oui, à la valeur marchande actuelle. Mais n\'oubliez pas : votre logement est un actif peu liquide et le solde de votre prêt est un passif. Beaucoup de planificateurs financiers calculent la valeur nette avec et sans la résidence principale pour une vue complète.' },
      { q: 'Comment augmenter sa valeur nette ?', a: 'Deux stratégies : augmenter les actifs (épargner plus, investir, acquérir des actifs qui s\'apprécient) et réduire les passifs (rembourser les dettes, éviter les nouvelles dettes). Le moyen le plus rapide est souvent d\'éliminer d\'abord les dettes à taux élevé (cartes de crédit à 15–25 %).' },
      { q: 'Quelle est la différence entre la valeur nette et le revenu ?', a: 'Le revenu est ce que vous gagnez ; la valeur nette est ce que vous conservez. Un revenu élevé ne garantit pas un patrimoine élevé si les dépenses et les dettes sont aussi élevées. La valeur nette, et non le revenu, est la vraie mesure de la richesse financière.' },
      { q: 'Faut-il inclure les comptes retraite ?', a: 'Oui. Les comptes retraite (PER, assurance-vie, PEA) sont des actifs qui vous appartiennent. Cependant, le retrait anticipé entraîne souvent des pénalités fiscales, ce qui les rend moins liquides que les comptes courants.' },
      { q: 'Comment évaluer les actifs illiquides ?', a: 'Utilisez des valeurs marchandes réalistes actuelles, pas le prix d\'achat. Pour l\'immobilier : estimations actuelles (Seloger, notaires.fr). Pour les véhicules : valeur marchande actuelle (La Centrale, LeBonCoin). Pour les bijoux : enchères récentes ou expertise professionnelle.' },
    ],
  },
  lt: {
    description: 'Mūsų grynosios vertės skaičiuotuvas suteikia momentinį finansinės sveikatos vaizdą: sudeda visą turtą ir atima visus įsipareigojimus. Turtas apima grynuosius ir santaupas, investicijų portfelius, nekilnojamąjį turtą, transporto priemones ir kitą vertingą nuosavybę. Įsipareigojimai apima hipotekas, automobilių paskolas, studijų paskolas, kredito kortelių likučius ir kitas skolas. Rezultatas — grynoji vertė — yra svarbiausias asmeninių finansų rodiklis.\n\nReguliari grynosios vertės stebėsena (kas mėnesį arba kas ketvirtį) yra vienas efektyviausių finansinės pažangos matavimo būdų. Teigiama ir auganti grynoji vertė reiškia, kad kuriate turtą; neigiama reiškia, kad skolos viršija turtą, kas yra įprasta ankstyvame suaugusiojo gyvenime dėl studijų paskolų ar hipotekos.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kas yra grynoji vertė?', a: 'Grynoji vertė = Visas turtas − Visi įsipareigojimai. Tai išsamiausias jūsų finansinės padėties rodiklis. Turtas — visa, ką turite; įsipareigojimai — visa, ką skolingote.' },
      { q: 'Kas laikoma turtu?', a: 'Turtas: banko sąskaitos ir grynieji, investicijos (akcijos, obligacijos, kriptovaliuta), pensijų sąskaitos, nekilnojamasis turtas (dabartinė rinkos vertė), transporto priemonės, verslo dalys, papuošalai ir kolekcijos.' },
      { q: 'Kas laikoma įsipareigojimais?', a: 'Įsipareigojimai: hipotekos likutis (ne turto vertė — tik tai, ką dar skolingote), automobilio paskola, studijų paskolos, vartojimo kreditas, kredito kortelių likučiai, kiti finansiniai įsipareigojimai.' },
      { q: 'Kokia yra gera grynoji vertė?', a: 'Bendra taisyklė: sulaukus 40 metų, grynoji vertė turėtų būti maždaug dvigubas metinis pajamų dydis. Pensijų planavimui dažnai naudojama 25 kartų metinių išlaidų taisyklė (4% taisyklė).' },
      { q: 'Ar bloga neigiama grynoji vertė?', a: 'Ne būtinai. Daugelis jaunų suaugusiųjų turi neigiamą grynąją vertę dėl studijų paskolų ar hipotekos. Svarbu yra tendencija — ar ji gerėja? Auganti grynoji vertė rodo sveiką finansinį elgesį.' },
      { q: 'Kaip dažnai skaičiuoti grynąją vertę?', a: 'Daugelis finansų patarėjų rekomenduoja mėnesinę arba ketvirtinę stebėseną. Minimumas — kartą per metus. Reguliari stebėsena laiko jus atsakingais ir greitai atskleidžia problemas.' },
      { q: 'Ar įtraukti namą į grynąją vertę?', a: 'Taip, pagal dabartinę rinkos vertę. Tačiau prisiminkite: būstas yra nelikvidus turtas, o hipoteka — įsipareigojimas. Daugelis finansų planuotojų skaičiuoja grynąją vertę tiek su pagrindiniu būstu, tiek be jo.' },
      { q: 'Kaip padidinti grynąją vertę?', a: 'Dvi strategijos: didinti turtą (daugiau taupyti, investuoti) ir mažinti įsipareigojimus (grąžinti skolas). Greičiausias augimas dažniausiai pasiekiamas pirmiausia panaikinant dideles palūkanų skolas (kreditinės kortelės).' },
      { q: 'Kuo grynoji vertė skiriasi nuo pajamų?', a: 'Pajamos yra tai, ką uždirbate; grynoji vertė yra tai, ką išlaikote. Didelės pajamos negarantuoja didelės grynosios vertės, jei išlaidos ir skolos taip pat didelės. Grynoji vertė, o ne pajamos, yra tikrasis finansinės gerovės rodiklis.' },
      { q: 'Ar įtraukti pensijų sąskaitas?', a: 'Taip. Pensijų sąskaitos (pensijų fondai, II ir III pakopos pensijos) yra jūsų turtas. Tačiau ankstyvas išėmimas dažnai susijęs su baudomis, todėl jos yra mažiau likvidžios nei banko sąskaitos.' },
      { q: 'Kaip įvertinti nelikvidų turtą?', a: 'Naudokite realistiškas dabartines rinkos vertes, o ne pirkimo kainas. Nekilnojamajam turtui: dabartiniai rinkos įvertinimai. Transporto priemonėms: dabartinė rinkos vertė pagal panašius skelbimus. Papuošalams: neseniai įvykusių aukcionų kainos arba profesionali ekspertizė.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/net-worth', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NetWorthPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/net-worth`,
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
        <NetWorthCalculator locale={locale} />
        <AdInline locale={locale} />
        <DisclaimerNote locale={locale} />
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
