import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/pension', label: 'Pension Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }],
  ru: [{ href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/pension', label: 'Пенсионный калькулятор' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }],
  uk: [{ href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/pension', label: 'Пенсійний калькулятор' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }],
  fr: [{ href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/pension', label: 'Simulatrice Retraite' }, { href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }],
  lt: [{ href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/roi', label: 'ROI skaičiuotuvas' }, { href: '/calculator/pension', label: 'Pensijų skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Compound Interest Calculator — Investment Growth & Savings',
    description: 'Free compound interest calculator. See how investments grow with annual, monthly or daily compounding. Includes year-by-year breakdown, optional monthly contributions, and the Rule of 72.',
    h1: 'Compound Interest Calculator',
  },
  ru: {
    title: 'Калькулятор сложных процентов — рассчитать доход онлайн',
    description: 'Бесплатный калькулятор сложных процентов онлайн. Рассчитайте рост вложений с ежегодным, ежемесячным или ежедневным начислением. Таблица по годам и ежемесячные пополнения.',
    h1: 'Калькулятор сложных процентов',
  },
  uk: {
    title: 'Калькулятор складних відсотків — розрахувати дохід онлайн',
    description: 'Безкоштовний калькулятор складних відсотків онлайн. Розрахуйте зростання вкладень із щорічним, щомісячним або щоденним нарахуванням. Таблиця по роках і щомісячні поповнення.',
    h1: 'Калькулятор складних відсотків',
  },
  fr: {
    title: 'Calculatrice Intérêts Composés — Calculer la Croissance d\'un Investissement',
    description: 'Calculatrice d\'intérêts composés gratuite. Calculez la croissance de votre capital avec capitalisation annuelle, mensuelle ou quotidienne. Tableau annuel inclus, avec versements mensuels optionnels.',
    h1: 'Calculatrice d\'intérêts composés',
  },
  lt: {
    title: 'Sudėtinių Palūkanų Skaičiuotuvas — Investicijų Augimas',
    description: 'Nemokamas sudėtinių palūkanų skaičiuotuvas. Apskaičiuokite investicijų augimą su kasmetiniu, mėnesiniu ar kasdieninniu kapitalizavimu. Metų suvestinė su neprivalomais mėnesiniais įnašais.',
    h1: 'Sudėtinių palūkanų skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Compound interest is the engine of long-term wealth building — your returns earn returns. Enter your initial investment, annual interest rate, and time period to see the final amount and a year-by-year growth table. Add a monthly contribution to model a regular savings or investment plan. Choose compounding frequency: the more often interest compounds, the higher your final balance.\n\nThis calculator is useful for modelling investment accounts, savings plans, index fund portfolios, and any scenario where returns are reinvested. The compound interest formula is A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding periods per year, and t is years. Monthly contributions use the future value of annuity formula added to the lump-sum calculation.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is compound interest?', a: 'Compound interest means you earn interest not just on your initial principal, but also on all previously accumulated interest. This creates exponential rather than linear growth — the "snowball effect". The longer the time horizon, the more dramatic the effect. For example, $10,000 at 8% for 10 years with annual compounding grows to $21,589 — more than double — and to $46,610 after 20 years.' },
      { q: 'What is the compound interest formula?', a: 'A = P(1 + r/n)^(nt), where: A = final amount, P = principal (initial investment), r = annual interest rate (as decimal, e.g. 0.08 for 8%), n = number of times interest compounds per year (1=annual, 12=monthly, 365=daily), t = number of years. For monthly contributions, the future value of annuity formula is added: FV = PMT × [(1 + r/n)^(nt) − 1] / (r/n).' },
      { q: 'How does compounding frequency affect returns?', a: 'The more frequently interest compounds, the more you earn. Example: $10,000 at 8% for 20 years: Annual compounding → $46,610. Monthly compounding → $49,268. Daily compounding → $49,530. The difference between monthly and daily is small (~0.5%), but annual vs monthly adds ~6% over 20 years. For most savings accounts and investments, monthly compounding is standard.' },
      { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a mental shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 6%: 72 ÷ 6 = 12 years. At 9%: 72 ÷ 9 = 8 years. At 3% (savings account): 72 ÷ 3 = 24 years. It\'s an approximation — the calculator gives exact figures.' },
      { q: 'What annual return should I use for investments?', a: 'For long-term stock market investments: 7–10% is historically reasonable (before inflation). S&P 500 historical average: ~10%/year nominal, ~7%/year real (inflation-adjusted). For bonds: 3–5%. For savings deposits: 2–5%. For index funds: ~7–8% real long-term. Always use the net-of-fees, after-inflation rate for realistic projections. A 2% difference in annual return makes an enormous difference over 30 years.' },
      { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the original principal: I = P × r × t. If you invest $10,000 at 8% for 10 years with simple interest, you earn $8,000 total = $18,000. Compound interest (reinvesting earnings) gives $21,589 at the same rate — $3,589 more. The gap widens dramatically over time: over 30 years, $10,000 at 8% simple = $34,000; compound = $100,627. Compound interest is why long-term investing works.' },
      { q: 'How do monthly contributions accelerate compound growth?', a: 'Regular contributions dramatically amplify compound growth through a technique sometimes called "dollar-cost averaging". Example: $10,000 initial + $200/month at 7% for 30 years: without contributions = $76,123; with $200/month = $327,946 ($72,000 contributed, $245,946 from growth). The earlier and more regularly you contribute, the more powerful the effect.' },
      { q: 'What is the effective annual rate (EAR)?', a: 'The effective annual rate (EAR) accounts for compounding frequency. If your nominal rate is 8% compounded monthly, the EAR = (1 + 0.08/12)^12 − 1 = 8.30%. EAR is what you actually earn when interest compounds within the year. Banks and investment products often advertise nominal rates — check whether interest compounds monthly, quarterly, or annually to calculate your true return.' },
      { q: 'How does inflation affect compound interest calculations?', a: 'Inflation erodes purchasing power. At 2% inflation, $100 today is worth ~$55 in 30 years. To calculate real (inflation-adjusted) returns, subtract inflation from your nominal rate: real rate ≈ nominal rate − inflation rate. If your investment earns 8% nominally and inflation is 2.5%, your real return is ~5.5%. Using the real rate in this calculator shows you future value in today\'s purchasing power.' },
      { q: 'What is the difference between this and the deposit calculator?', a: 'This compound interest calculator is designed for general investment planning with flexible compounding frequencies (annual, monthly, daily), optional monthly contributions, and a year-by-year growth table. The deposit calculator is focused specifically on bank deposits with periodic capitalization and uses local interest rate conventions. Use this for investment modelling (index funds, portfolios) and the deposit calculator for bank savings products.' },
    ],
  },
  ru: {
    description: 'Сложный процент — двигатель долгосрочного роста капитала: проценты начисляются на уже накопленные проценты. Введите начальную сумму, годовую ставку и срок, чтобы увидеть итоговую сумму и рост по годам. Добавьте ежемесячное пополнение для моделирования плана накоплений. Выберите частоту начисления: чем чаще, тем выше итоговая сумма.\n\nКалькулятор полезен для моделирования инвестиционных счетов, планов накопления, портфелей индексных фондов и любых сценариев реинвестирования доходов. Формула: A = P(1 + r/n)^(nt), где P — начальная сумма, r — годовая ставка, n — количество начислений в год, t — срок в годах.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое сложный процент?', a: 'Сложный процент означает, что проценты начисляются не только на начальную сумму, но и на уже накопленные проценты. Это создаёт экспоненциальный, а не линейный рост — «эффект снежного кома». Чем дольше срок, тем сильнее эффект: $10 000 под 8% за 10 лет превращается в $21 589, за 20 лет — в $46 610.' },
      { q: 'Какова формула сложных процентов?', a: 'A = P(1 + r/n)^(nt), где: A — итоговая сумма, P — начальная сумма, r — годовая ставка (в долях, например 0.08 для 8%), n — количество начислений в год (1=ежегодно, 12=ежемесячно, 365=ежедневно), t — срок в годах. При ежемесячных пополнениях добавляется формула будущей стоимости аннуитета.' },
      { q: 'Как частота начисления влияет на доход?', a: 'Чем чаще начисляются проценты, тем больше итоговая сумма. Пример: $10 000 под 8% за 20 лет: ежегодно → $46 610; ежемесячно → $49 268; ежедневно → $49 530. Разница между ежемесячным и ежедневным небольшая (~0.5%), но ежегодное против ежемесячного добавляет ~6% за 20 лет.' },
      { q: 'Что такое правило 72?', a: 'Правило 72 — быстрое вычисление в уме: разделите 72 на годовую ставку, чтобы узнать, через сколько лет удвоятся вложения. При 6%: 72 ÷ 6 = 12 лет. При 9%: 8 лет. При 3% (банковский вклад): 24 года. Это приближение — калькулятор даёт точный результат.' },
      { q: 'Какую доходность использовать для расчётов?', a: 'Для долгосрочных инвестиций в акции: 7–10% исторически обоснованы (до инфляции). Индекс S&P 500: ~10%/год номинально, ~7%/год реально. Для облигаций: 3–5%. Для банковских вкладов: 2–5%. Для расчётов в реальных ценах вычтите инфляцию из номинальной ставки.' },
      { q: 'В чём разница между простыми и сложными процентами?', a: 'Простые проценты начисляются только на начальную сумму: $10 000 под 8% за 10 лет → $18 000 (доход $8 000). Сложные проценты: $10 000 под 8% за 10 лет → $21 589 (доход $11 589). За 30 лет: простые → $34 000; сложные → $100 627. Разница нарастает экспоненциально — именно поэтому долгосрочные инвестиции работают.' },
      { q: 'Как ежемесячные пополнения ускоряют рост?', a: 'Регулярные пополнения резко усиливают эффект сложного процента. Пример: $10 000 начальных + $200/месяц под 7% за 30 лет: без пополнений → $76 123; с пополнениями $200/месяц → $327 946 ($72 000 вложено, $245 946 — рост). Чем раньше и регулярнее пополнения, тем мощнее эффект.' },
      { q: 'Что такое эффективная годовая ставка (ЭГС)?', a: 'Эффективная годовая ставка учитывает частоту начисления. Если номинальная ставка 8% с ежемесячным начислением, ЭГС = (1 + 0.08/12)^12 − 1 = 8.30%. ЭГС — это реальный доход при промежуточном начислении в течение года. Банки часто рекламируют номинальные ставки — уточняйте периодичность начисления.' },
      { q: 'Как учесть инфляцию в расчёте сложных процентов?', a: 'При инфляции 5% покупательная способность $100 через 30 лет составит ~$23. Для расчёта реальной доходности вычтите инфляцию из номинальной: реальная ставка ≈ номинальная − инфляция. При 9% номинально и 5% инфляции реальная доходность ~4%. Использование реальной ставки покажет итог в сегодняшних ценах.' },
      { q: 'Насколько точен этот калькулятор?', a: 'Калькулятор даёт математически точный результат при фиксированной ставке. Реальные инвестиционные доходы нестабильны: рынки колеблются, ставки меняются. Используйте калькулятор для ориентировочного моделирования сценариев, а не как гарантию будущей доходности.' },
    ],
  },
  uk: {
    description: 'Складний відсоток — двигун довгострокового зростання капіталу: відсотки нараховуються на вже накопичені відсотки. Введіть початкову суму, річну ставку і строк, щоб побачити підсумкову суму та зростання по роках. Додайте щомісячне поповнення для моделювання плану накопичень. Оберіть частоту нарахування: чим частіше, тим вища підсумкова сума.\n\nКалькулятор корисний для моделювання інвестиційних рахунків, планів накопичення та будь-яких сценаріїв реінвестування доходів. Формула: A = P(1 + r/n)^(nt), де P — початкова сума, r — річна ставка, n — кількість нарахувань на рік, t — строк у роках.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке складний відсоток?', a: 'Складний відсоток означає, що відсотки нараховуються не лише на початкову суму, а й на вже накопичені відсотки. Це створює експоненційне зростання — «ефект сніжного кома». Чим довший строк, тим сильніший ефект: $10 000 під 8% за 10 років → $21 589, за 20 років → $46 610.' },
      { q: 'Яка формула складних відсотків?', a: 'A = P(1 + r/n)^(nt), де: A — підсумкова сума, P — початкова сума, r — річна ставка (в частках, наприклад 0.08 для 8%), n — кількість нарахувань на рік (1=щорічно, 12=щомісячно, 365=щоденно), t — строк у роках. При щомісячних поповненнях додається формула майбутньої вартості ануїтету.' },
      { q: 'Як частота нарахування впливає на дохід?', a: 'Чим частіше нараховуються відсотки, тим більша підсумкова сума. Приклад: $10 000 під 8% за 20 років: щорічно → $46 610; щомісячно → $49 268; щоденно → $49 530. Різниця між щомісячним і щоденним невелика (~0.5%), але щорічне проти щомісячного додає ~6% за 20 років.' },
      { q: 'Що таке правило 72?', a: 'Правило 72 — швидке обчислення: поділіть 72 на річну ставку, щоб дізнатися, за скільки років подвояться вкладення. При 6%: 12 років. При 9%: 8 років. При 3%: 24 роки. Це наближення — калькулятор дає точний результат.' },
      { q: 'Яку дохідність використовувати для розрахунків?', a: 'Для довгострокових інвестицій в акції: 7–10% історично обґрунтовані (до інфляції). Для облігацій: 3–5%. Для банківських вкладів: 2–5%. Для розрахунків у реальних цінах вичтіть інфляцію з номінальної ставки.' },
      { q: 'У чому різниця між простими і складними відсотками?', a: 'Прості відсотки нараховуються лише на початкову суму: $10 000 під 8% за 10 років → $18 000. Складні: $10 000 під 8% за 10 років → $21 589. За 30 років: прості → $34 000; складні → $100 627. Різниця зростає експоненційно — саме тому довгострокові інвестиції працюють.' },
      { q: 'Як щомісячні поповнення прискорюють зростання?', a: 'Регулярні поповнення різко підсилюють ефект складного відсотка. Приклад: $10 000 початкових + $200/місяць під 7% за 30 років: без поповнень → $76 123; з $200/місяць → $327 946. Що раніше і регулярніше поповнення — тим потужніший ефект.' },
      { q: 'Що таке ефективна річна ставка (ЕРС)?', a: 'Ефективна річна ставка враховує частоту нарахування. Якщо номінальна ставка 8% з щомісячним нарахуванням, ЕРС = (1 + 0.08/12)^12 − 1 = 8.30%. Банки часто рекламують номінальні ставки — уточнюйте періодичність нарахування для розрахунку реального доходу.' },
      { q: 'Як врахувати інфляцію в розрахунку складних відсотків?', a: 'Для розрахунку реальної дохідності вичтіть інфляцію з номінальної: реальна ставка ≈ номінальна − інфляція. При 9% номінально і 5% інфляції реальна дохідність ~4%. Використання реальної ставки покаже підсумок у сьогоднішніх цінах.' },
      { q: 'Чим відрізняється від калькулятора депозиту?', a: 'Цей калькулятор призначений для інвестиційного планування з гнучкою частотою нарахування та щомісячними поповненнями. Калькулятор депозиту орієнтований на банківські вклади з капіталізацією і використовує місцеві банківські конвенції.' },
    ],
  },
  fr: {
    description: 'Les intérêts composés sont le moteur de la croissance du patrimoine à long terme : vos rendements génèrent des rendements. Entrez votre capital initial, le taux annuel et la durée pour voir le montant final et la croissance année par année. Ajoutez un versement mensuel pour modéliser un plan d\'épargne régulier. Choisissez la fréquence de capitalisation : plus elle est élevée, plus le solde final est important.\n\nCet outil est utile pour modéliser des comptes d\'investissement, des plans d\'épargne, des portefeuilles de fonds indiciels et tout scénario où les rendements sont réinvestis. La formule est A = P(1 + r/n)^(nt), où P est le capital initial, r le taux annuel, n le nombre de capitalisations par an, et t la durée en années.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'intérêt composé ?', a: 'L\'intérêt composé signifie que vous gagnez des intérêts non seulement sur votre capital initial, mais aussi sur les intérêts déjà accumulés. Cela crée une croissance exponentielle — l\'"effet boule de neige". Exemple : 10 000 € à 8 % pendant 10 ans = 21 589 € ; pendant 20 ans = 46 610 €.' },
      { q: 'Quelle est la formule des intérêts composés ?', a: 'A = P(1 + r/n)^(nt), avec : A = montant final, P = capital initial, r = taux annuel en décimale (ex. 0,08 pour 8 %), n = nombre de capitalisations par an (1 = annuelle, 12 = mensuelle, 365 = quotidienne), t = durée en années. Pour les versements mensuels, la formule de la valeur future d\'une annuité est ajoutée.' },
      { q: 'Comment la fréquence de capitalisation affecte-t-elle les rendements ?', a: 'Exemple : 10 000 € à 8 % pendant 20 ans. Capitalisation annuelle → 46 610 €. Mensuelle → 49 268 €. Quotidienne → 49 530 €. L\'écart entre mensuelle et quotidienne est faible (~0,5 %), mais l\'annuelle vs mensuelle représente +6 % sur 20 ans. La capitalisation mensuelle est le standard pour la plupart des comptes d\'épargne.' },
      { q: 'Qu\'est-ce que la règle des 72 ?', a: 'La règle des 72 est un raccourci mental : divisez 72 par votre taux annuel pour estimer le nombre d\'années pour doubler votre capital. À 6 % : 12 ans. À 9 % : 8 ans. À 3 % (livret A) : 24 ans. C\'est une approximation — le calculateur donne les chiffres exacts.' },
      { q: 'Quel taux de rendement annuel utiliser ?', a: 'Pour les investissements en actions à long terme : 7–10 % est historiquement raisonnable (avant inflation). CAC 40 hors dividendes : ~6 %/an sur 30 ans. Pour les obligations : 3–5 %. Pour les livrets réglementés : 2–4 %. Pour les projections en euros constants, utilisez le taux réel (nominal − inflation).' },
      { q: 'Quelle est la différence entre intérêt simple et intérêt composé ?', a: 'L\'intérêt simple est calculé uniquement sur le capital initial. 10 000 € à 8 % pendant 10 ans en intérêt simple = 18 000 €. En intérêt composé = 21 589 €. Sur 30 ans : intérêt simple → 34 000 € ; composé → 100 627 €. L\'écart s\'élargit dramatiquement avec le temps — c\'est pourquoi l\'investissement à long terme est si puissant.' },
      { q: 'Comment les versements mensuels amplifient-ils la croissance ?', a: 'Des versements réguliers amplifient considérablement les intérêts composés. Exemple : 10 000 € initiaux + 200 €/mois à 7 % pendant 30 ans : sans versements → 76 123 € ; avec 200 €/mois → 327 946 € (72 000 € versés, 245 946 € de croissance). Plus vous commencez tôt et régulièrement, plus l\'effet est puissant.' },
      { q: 'Qu\'est-ce que le taux annuel effectif global (TAEG) ?', a: 'Le taux annuel effectif global (TAEG) tient compte de la fréquence de capitalisation. Si votre taux nominal est de 8 % capitalisé mensuellement, le TAEG = (1 + 0,08/12)^12 − 1 = 8,30 %. Les banques communiquent souvent des taux nominaux — vérifiez la fréquence de capitalisation pour connaître votre rendement réel.' },
      { q: 'Comment l\'inflation affecte-t-elle les intérêts composés ?', a: 'À 2 % d\'inflation, 100 € aujourd\'hui ne valent plus que ~55 € en termes de pouvoir d\'achat dans 30 ans. Pour calculer le rendement réel : taux réel ≈ taux nominal − inflation. À 8 % nominal et 2,5 % d\'inflation, le rendement réel est ~5,5 %. Utilisez le taux réel dans ce calculateur pour obtenir le résultat en euros d\'aujourd\'hui.' },
      { q: 'Quelle est la différence avec la calculatrice de dépôt ?', a: 'Cette calculatrice est conçue pour la planification d\'investissements avec des fréquences de capitalisation flexibles, des versements mensuels optionnels et un tableau de croissance annuel. La calculatrice de dépôt est axée sur les dépôts bancaires avec capitalisation périodique. Utilisez cette calculatrice pour les portefeuilles d\'investissement et la calculatrice de dépôt pour les produits bancaires.' },
    ],
  },
  lt: {
    description: 'Sudėtinės palūkanos — ilgalaikio turto augimo variklis: jūsų grąža generuoja grąžą. Įveskite pradinę sumą, metinę normą ir laikotarpį, kad pamatytumėte galutinę sumą ir metų augimo lentelę. Pridėkite mėnesinį įnašą taupymo planui modeliuoti. Pasirinkite kaupimo dažnumą: kuo dažniau, tuo didesnė galutinė suma.\n\nSkaičiuotuvas naudingas modeliuojant investicinių sąskaitų, taupymo planų, indeksų fondų portfelių augimą. Formulė: A = P(1 + r/n)^(nt), kur P — pradinė suma, r — metinė norma, n — kaupimo periodų skaičius per metus, t — metai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra sudėtinės palūkanos?', a: 'Sudėtinės palūkanos reiškia, kad palūkanos skaičiuojamos ne tik nuo pradinės sumos, bet ir nuo jau sukauptų palūkanų. Tai sukuria eksponentinį augimą — „sniego gniūžtės efektą". Kuo ilgesnis terminas, tuo stipresnis efektas: 10 000 € esant 8 % už 10 metų → 21 589 €, už 20 metų → 46 610 €.' },
      { q: 'Kokia yra sudėtinių palūkanų formulė?', a: 'A = P(1 + r/n)^(nt), kur: A — galutinė suma, P — pradinė suma, r — metinė norma (kaip dešimtainė trupmena, pvz. 0,08 = 8 %), n — kaupimo periodų skaičius per metus (1=metinis, 12=mėnesinis, 365=kasdienis), t — metai. Su mėnesiniais įnašais pridedama anuitetų formulė.' },
      { q: 'Kaip kaupimo dažnumas veikia grąžą?', a: 'Kuo dažniau kaupiamos palūkanos, tuo didesnė galutinė suma. Pavyzdys: 10 000 € esant 8 % už 20 metų: metinis kaupimas → 46 610 €; mėnesinis → 49 268 €; kasdienis → 49 530 €. Mėnesinis ir kasdienis skiriasi nedaug (~0,5 %), tačiau metinis vs mėnesinis per 20 metų skiriasi ~6 %.' },
      { q: 'Kas yra 72 taisyklė?', a: 'Padalinkite 72 iš metinės normos, kad sužinotumėte, per kiek metų kapitalas padvigubės. Esant 6 %: 12 metų. Esant 9 %: 8 metai. Esant 3 %: 24 metai. Tai apytikslis rezultatas — skaičiuotuvas pateikia tikslius skaičius.' },
      { q: 'Kokią metinę grąžą naudoti skaičiavimams?', a: 'Ilgalaikėms investicijoms į akcijas: 7–10 % istoriškai pagrįsti (prieš infliaciją). Obligacijoms: 3–5 %. Bankų indėliams: 2–5 %. Realiems skaičiavimams atimkite infliaciją iš nominalios normos.' },
      { q: 'Koks skirtumas tarp paprastų ir sudėtinių palūkanų?', a: 'Paprastos palūkanos skaičiuojamos tik nuo pradinės sumos: 10 000 € esant 8 % už 10 metų → 18 000 €. Sudėtinės: → 21 589 €. Per 30 metų: paprastos → 34 000 €; sudėtinės → 100 627 €. Skirtumas didėja eksponentiškai — todėl ilgalaikės investicijos veikia.' },
      { q: 'Kaip mėnesiniai įnašai pagreitina augimą?', a: 'Reguliarūs įnašai žymiai sustiprina sudėtinių palūkanų efektą. Pavyzdys: 10 000 € pradinis + 200 €/mėn. esant 7 % per 30 metų: be įnašų → 76 123 €; su 200 €/mėn. → 327 946 € (72 000 € įnešta, 245 946 € augimas). Kuo anksčiau ir reguliariau — tuo galingesnis efektas.' },
      { q: 'Kas yra efektyvioji metinė norma (EMN)?', a: 'Efektyvioji metinė norma atsižvelgia į kaupimo dažnumą. Jei nominali norma 8 % su mėnesiniu kaupimu, EMN = (1 + 0,08/12)^12 − 1 = 8,30 %. Bankai dažnai skelbia nominalias normas — patikrinkite kaupimo dažnumą, kad apskaičiuotumėte tikrąją grąžą.' },
      { q: 'Kaip infliacija veikia sudėtinių palūkanų skaičiavimus?', a: 'Esant 3 % infliacijai, 100 € šiandien per 30 metų praras pusę perkamosios galios. Realiajai grąžai apskaičiuoti atimkite infliaciją iš nominalios: reali norma ≈ nominali − infliacija. Esant 8 % nominaliai ir 3 % infliacijai, reali grąža ~5 %. Naudokite realią normą, kad rezultatas būtų šiandieninėmis kainomis.' },
      { q: 'Kuo skiriasi nuo indėlio skaičiuotuvo?', a: 'Šis skaičiuotuvas skirtas investicijų planavimui su lanksčiu kaupimo dažnumu ir neprivalomais mėnesiniais įnašais. Indėlio skaičiuotuvas orientuotas į banko indėlius su kapitalizacijos laikotarpiais. Naudokite šį indeksų fondų portfelių modeliavimui, o indėlio skaičiuotuvą — bankinių produktų analizei.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/compound-interest') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CompoundInterestPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/compound-interest`,
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
        <CompoundInterestCalculator locale={locale} />
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
