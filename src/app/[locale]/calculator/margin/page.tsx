import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MarginCalculator from './MarginCalculator';
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
  en: [{ href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/discount', label: 'Discount Calculator' }],
  ru: [{ href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/discount', label: 'Калькулятор скидки' }],
  uk: [{ href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/discount', label: 'Калькулятор знижки' }],
  fr: [{ href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/discount', label: 'Calculatrice de remise' }],
  lt: [{ href: '/calculator/roi', label: 'RI skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Margin & Markup Calculator — Calculate Profit Margin',
    description: 'Free margin and markup calculator. Calculate gross profit margin, markup percentage, and selling price from cost. Supports two modes: calculate from prices or find selling price by target margin.',
    h1: 'Margin & Markup Calculator',
    subtitle: 'Calculate profit margin, markup percentage, and revenue for your products or services.',
  },
  ru: {
    title: 'Калькулятор маржи и наценки — расчёт прибыльности',
    description: 'Бесплатный калькулятор маржи и наценки. Рассчитайте валовую маржу, процент наценки и цену продажи по себестоимости. Два режима: расчёт по ценам или по целевой марже.',
    h1: 'Калькулятор маржи и наценки',
    subtitle: 'Рассчитайте маржу прибыли, процент наценки и выручку для ваших товаров или услуг.',
  },
  uk: {
    title: 'Калькулятор маржі і націнки — розрахунок прибутковості',
    description: 'Безкоштовний калькулятор маржі та націнки. Розрахуйте валову маржу, відсоток націнки та ціну продажу за собівартістю. Два режими: розрахунок за цінами або за цільовою маржею.',
    h1: 'Калькулятор маржі і націнки',
    subtitle: 'Розрахуйте маржу прибутку, відсоток націнки та виручку для ваших товарів або послуг.',
  },
  fr: {
    title: 'Calculatrice marge et majoration — calcul de rentabilité',
    description: 'Calculatrice de marge et majoration gratuite. Calculez la marge brute, le taux de majoration et le prix de vente à partir du coût. Deux modes : calcul depuis les prix ou par marge cible.',
    h1: 'Calculatrice marge et majoration',
    subtitle: 'Calculez la marge bénéficiaire, le pourcentage de majoration et le chiffre d\'affaires.',
  },
  lt: {
    title: 'Maržos ir antkainių skaičiuotuvas — pelno skaičiavimas',
    description: 'Nemokamas maržos ir antkainių skaičiuotuvas. Apskaičiuokite bendrąją maržą, antkainių procentą ir pardavimo kainą pagal savikainą. Du režimai: skaičiavimas iš kainų arba pagal tikslinę maržą.',
    h1: 'Maržos ir antkainių skaičiuotuvas',
    subtitle: 'Apskaičiuokite pelno maržą, antkainių procentą ir pajamas savo produktams ar paslaugoms.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our margin and markup calculator to analyze the profitability of your products. In "Calculate from prices" mode, enter the cost and selling price to instantly get the gross profit margin and markup percentage. In "Find selling price" mode, enter your cost and target margin or markup — and get the exact price you need to charge.\n\nMargin and markup are the two most important pricing metrics in business. Understanding the difference — and knowing which one your industry uses — is essential for setting correct prices, negotiating with suppliers, and benchmarking against competitors.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the difference between margin and markup?', a: 'Margin is profit as a percentage of revenue: Margin = (Profit ÷ Revenue) × 100. Markup is profit as a percentage of cost: Markup = (Profit ÷ Cost) × 100. For the same product, markup is always higher than margin. Example: cost $100, sell $150 → profit $50 → Markup 50%, Margin 33.3%.' },
      { q: 'Which is more useful — margin or markup?', a: 'Margin is preferred in financial analysis, P&L reporting, and accounting because it shows what percentage of revenue is profit. Markup is more common in retail and procurement when calculating the selling price from cost. Most financial software defaults to margin.' },
      { q: 'How do I calculate selling price from a target margin?', a: 'Selling Price = Cost ÷ (1 − Margin%). Example: cost $100, target margin 30% → $100 ÷ 0.70 = $142.86. This is what the "Find selling price" mode does automatically.' },
      { q: 'What is a good profit margin?', a: 'It varies by industry. Grocery retail: 2–5%. Food service: 3–9%. Manufacturing: 10–20%. Ecommerce: 15–30%. Software/SaaS: 60–80%. Consulting: 30–50%. Always benchmark against your specific industry and ensure your gross margin covers fixed costs plus net profit target.' },
      { q: 'What is the formula for markup from margin?', a: 'Markup = Margin ÷ (1 − Margin). Example: 30% margin → 30% ÷ 70% = 42.86% markup. Conversely: Margin = Markup ÷ (1 + Markup). Example: 42.86% markup → 42.86% ÷ 142.86% = 30% margin.' },
      { q: 'What is gross margin vs net margin?', a: 'Gross margin = (Revenue − Cost of Goods Sold) ÷ Revenue. Net margin = Net Profit ÷ Revenue (after all expenses including overheads, taxes, interest). This calculator computes gross margin. Net margin requires subtracting all operating and fixed costs.' },
      { q: 'What is a retail markup percentage?', a: 'Common retail markup percentages by category: clothing 100–200%; electronics 10–30%; furniture 200–400%; jewelry 300–500%; grocery 10–20%; hardware 30–50%. These are typical ranges — individual products vary widely based on brand, exclusivity, and competition.' },
      { q: 'What is the keystone markup?', a: 'Keystone markup is doubling the cost price to set the selling price — a 100% markup (50% margin). It was the traditional retail rule of thumb. Modern retailers often use higher markups for premium products and lower for commodities.' },
      { q: 'How does VAT/sales tax affect margin calculation?', a: 'Margin should be calculated on prices excluding VAT, because VAT is collected on behalf of the government and is not your revenue. If your selling price includes VAT, remove it first: Price ex-VAT = Price incl. VAT ÷ (1 + VAT rate). Then calculate margin on the ex-VAT prices.' },
      { q: 'What is contribution margin?', a: 'Contribution margin = Revenue − Variable Costs. It shows how much each sale contributes to covering fixed costs and generating profit. It differs from gross margin in that it only subtracts variable (not all direct) costs. Contribution margin is particularly useful for break-even analysis and pricing decisions.' },
    ],
  },
  ru: {
    description: 'Используйте калькулятор маржи и наценки для анализа прибыльности ваших товаров. В режиме «Расчёт по ценам» введите себестоимость и цену продажи — мгновенно получите процент маржи и наценки. В режиме «Найти цену продажи» введите себестоимость и целевую маржу или наценку — и получите точную цену.\n\nМаржа и наценка — два ключевых показателя ценообразования в бизнесе. Понимание разницы между ними и знание отраслевых норм необходимы для правильной цены, переговоров с поставщиками и сравнения с конкурентами.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'В чём разница между маржой и наценкой?', a: 'Маржа — прибыль в процентах от цены продажи: Маржа = (Прибыль ÷ Выручка) × 100. Наценка — прибыль в процентах от себестоимости: Наценка = (Прибыль ÷ Себестоимость) × 100. Пример: себест. 100 ₽, цена 150 ₽, прибыль 50 ₽ → Наценка 50%, Маржа 33,3%.' },
      { q: 'Что лучше использовать — маржу или наценку?', a: 'Маржа предпочтительна в финансовом анализе и бухгалтерии — показывает, какой % выручки составляет прибыль. Наценка чаще используется в торговле и закупках для расчёта цены из себестоимости. Большинство бухгалтерских программ по умолчанию оперирует маржой.' },
      { q: 'Как рассчитать цену продажи по целевой марже?', a: 'Цена продажи = Себестоимость ÷ (1 − Маржа%). Например: себест. 100 ₽, маржа 30% → 100 ÷ 0,70 = 142,86 ₽. Режим «Найти цену продажи» делает это автоматически.' },
      { q: 'Какая маржа считается хорошей?', a: 'Зависит от отрасли. Продуктовый ретейл: 2–5%. Общепит: 5–15%. Производство: 10–25%. Интернет-торговля: 15–30%. ПО и SaaS: 60–80%. Консалтинг: 30–50%. Главное — сравнивать с нормами своей отрасли и контролировать покрытие постоянных расходов.' },
      { q: 'Как перевести маржу в наценку и обратно?', a: 'Наценка из маржи: Наценка = Маржа ÷ (1 − Маржа). Пример: маржа 30% → 30% ÷ 70% = 42,86% наценка. Маржа из наценки: Маржа = Наценка ÷ (1 + Наценка). Пример: наценка 42,86% → 42,86% ÷ 142,86% = 30% маржа.' },
      { q: 'Что такое валовая и чистая маржа?', a: 'Валовая маржа = (Выручка − Себестоимость) ÷ Выручка. Чистая маржа = Чистая прибыль ÷ Выручка (после всех расходов, включая аренду, зарплаты, налоги). Этот калькулятор рассчитывает валовую маржу.' },
      { q: 'Каков типичный процент наценки в рознице?', a: 'Типичные наценки по категориям: одежда — 100–200%, электроника — 10–30%, мебель — 100–300%, ювелирные изделия — 200–400%, продукты — 10–25%, стройматериалы — 20–50%. Конкретные значения варьируются в зависимости от бренда и конкуренции.' },
      { q: 'Что такое «двойная наценка» (keystone markup)?', a: '«Двойная наценка» — традиционное правило ретейла: удвоить себестоимость для получения цены продажи. Это наценка 100% или маржа 50%. Сегодня используется реже — в премиум-сегменте наценки выше, в массовом — ниже.' },
      { q: 'Как НДС влияет на расчёт маржи?', a: 'Маржу нужно считать по ценам без НДС, так как НДС — это налог, перечисляемый в бюджет, а не доход. Если в цене продажи включён НДС 20%, то цена без НДС = Цена с НДС ÷ 1,2. Затем считайте маржу на основе цены без НДС.' },
      { q: 'Что такое маржинальность как показатель эффективности бизнеса?', a: 'Маржинальность (или маржа вклада) = Выручка − Переменные расходы. Показывает, сколько каждая продажа вносит в покрытие постоянных расходов и прибыль. Используется для анализа точки безубыточности и оценки ценовых решений.' },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор маржі та націнки для аналізу прибутковості ваших товарів. У режимі «Розрахунок за цінами» введіть собівартість і ціну продажу — миттєво отримайте відсоток маржі та націнки. У режимі «Знайти ціну продажу» введіть собівартість і цільову маржу або націнку.\n\nМаржа і націнка — два ключові показники ціноутворення. Розуміння різниці між ними необхідне для правильного ціноутворення, переговорів з постачальниками та порівняння з конкурентами.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'У чому різниця між маржею і націнкою?', a: 'Маржа — прибуток у відсотках від ціни продажу: Маржа = (Прибуток ÷ Виручка) × 100. Націнка — прибуток у відсотках від собівартості: Націнка = (Прибуток ÷ Собівартість) × 100. Приклад: собів. 100 ₴, ціна 150 ₴, прибуток 50 ₴ → Націнка 50%, Маржа 33,3%.' },
      { q: 'Що краще використовувати — маржу чи націнку?', a: 'Маржа переважає у фінансовому аналізі — показує, який % виручки є прибутком. Націнка частіше використовується в торгівлі та закупівлях для розрахунку ціни із собівартості.' },
      { q: 'Як розрахувати ціну продажу за цільовою маржею?', a: 'Ціна продажу = Собівартість ÷ (1 − Маржа%). Приклад: собів. 100 ₴, маржа 30% → 100 ÷ 0,70 = 142,86 ₴. Режим «Знайти ціну продажу» робить це автоматично.' },
      { q: 'Яка маржа вважається гарною?', a: 'Залежить від галузі. Продуктовий ретейл: 2–5%. Виробництво: 10–25%. Інтернет-торгівля: 15–30%. ПЗ та SaaS: 60–80%. Консалтинг: 30–50%. Порівнюйте з нормами своєї галузі.' },
      { q: 'Як перевести маржу в націнку і навпаки?', a: 'Націнка з маржі: Націнка = Маржа ÷ (1 − Маржа). Приклад: маржа 30% → 30% ÷ 70% = 42,86%. Маржа з націнки: Маржа = Націнка ÷ (1 + Націнка). Приклад: 42,86% → 42,86% ÷ 142,86% = 30% маржа.' },
      { q: 'Що таке валова і чиста маржа?', a: 'Валова маржа = (Виручка − Собівартість) ÷ Виручка. Чиста маржа = Чистий прибуток ÷ Виручка (після всіх витрат включно з орендою, зарплатами, податками). Цей калькулятор розраховує валову маржу.' },
      { q: 'Який типовий відсоток націнки в роздрібній торгівлі?', a: 'Типові націнки: одяг — 100–200%, електроніка — 10–30%, меблі — 100–300%, ювелірні вироби — 200–400%, продукти — 10–25%. Конкретні значення залежать від бренду та конкуренції.' },
      { q: 'Що таке «подвійна наценка»?', a: 'Подвійна наценка (keystone markup) — традиційне правило ретейлу: подвоїти собівартість. Це наценка 100% або маржа 50%. Сьогодні застосовується рідше — у преміум-сегменті вона вища, у масовому — нижча.' },
      { q: 'Як ПДВ впливає на розрахунок маржі?', a: 'Маржу треба рахувати за цінами без ПДВ, оскільки ПДВ — це податок, що перераховується до бюджету. Якщо ціна продажу включає ПДВ 20%, то ціна без ПДВ = Ціна з ПДВ ÷ 1,2. Потім розраховуйте маржу на основі ціни без ПДВ.' },
      { q: 'Що таке маржинальність як показник ефективності бізнесу?', a: 'Маржинальність (маржа вкладу) = Виручка − Змінні витрати. Показує, скільки кожен продаж вносить у покриття постійних витрат і прибуток. Використовується для аналізу точки беззбитковості та цінових рішень.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de marge et majoration pour analyser la rentabilité de vos produits. En mode « Calculer depuis les prix », entrez le coût et le prix de vente pour obtenir instantanément la marge brute et le taux de majoration. En mode « Trouver le prix de vente », entrez votre coût et la marge ou majoration cible.\n\nLa marge et la majoration sont les deux indicateurs de tarification les plus importants en commerce. Comprendre la différence — et savoir lequel utilise votre secteur — est essentiel pour fixer des prix corrects et négocier avec vos fournisseurs.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle est la différence entre marge et majoration ?', a: 'Marge = Bénéfice ÷ CA × 100. Majoration = Bénéfice ÷ Coût × 100. Pour le même produit, la majoration est toujours supérieure à la marge. Exemple : coût 100 €, prix 150 €, bénéfice 50 € → Majoration 50 %, Marge 33,3 %.' },
      { q: 'Laquelle est la plus utile ?', a: 'La marge est préférée en analyse financière et comptabilité car elle montre quelle part du CA est du bénéfice. La majoration est plus utilisée dans le commerce pour calculer le prix de vente à partir du coût. La plupart des logiciels de gestion utilisent la marge par défaut.' },
      { q: 'Comment calculer le prix de vente à partir d\'une marge cible ?', a: 'Prix de vente = Coût ÷ (1 − Marge%). Exemple : coût 100 €, marge 30 % → 100 ÷ 0,70 = 142,86 €. C\'est ce que fait le mode « Trouver le prix de vente ».' },
      { q: 'Quelle est une bonne marge bénéficiaire ?', a: 'Cela varie par secteur. Distribution alimentaire : 2–5 %. Restauration : 5–15 %. Fabrication : 10–25 %. E-commerce : 15–30 %. Logiciels/SaaS : 60–80 %. Conseil : 30–50 %. Comparez toujours les normes de votre secteur.' },
      { q: 'Comment convertir la marge en majoration et inversement ?', a: 'Majoration depuis marge : Majoration = Marge ÷ (1 − Marge). Exemple : marge 30 % → 30 % ÷ 70 % = 42,86 % de majoration. Marge depuis majoration : Marge = Majoration ÷ (1 + Majoration). Exemple : 42,86 % → 42,86 % ÷ 142,86 % = 30 %.' },
      { q: 'Quelle est la différence entre marge brute et marge nette ?', a: 'Marge brute = (CA − Coût des ventes) ÷ CA. Marge nette = Bénéfice net ÷ CA (après toutes les charges : loyer, salaires, impôts). Cette calculatrice calcule la marge brute.' },
      { q: 'Quels sont les taux de majoration typiques en retail ?', a: 'Taux de majoration courants : habillement 100–200 %, électronique 10–30 %, mobilier 100–300 %, bijouterie 200–400 %, alimentation 10–25 %. Les valeurs varient selon la marque et la concurrence.' },
      { q: 'Qu\'est-ce que le « keystone markup » ?', a: 'Le keystone markup consiste à doubler le coût pour obtenir le prix de vente — soit une majoration de 100 % ou une marge de 50 %. C\'était la règle traditionnelle du commerce de détail. Aujourd\'hui, les détaillants premium appliquent des majorations plus élevées, les segments mass-market des majorations plus faibles.' },
      { q: 'Comment la TVA affecte-t-elle le calcul de la marge ?', a: 'La marge doit être calculée sur les prix HT (hors taxe), car la TVA collectée est reversée à l\'État et n\'est pas un revenu. Si votre prix de vente est TTC (TVA 20 %), le prix HT = Prix TTC ÷ 1,20. Calculez ensuite la marge sur les prix HT.' },
      { q: 'Qu\'est-ce que la marge sur coût variable ?', a: 'Marge sur coût variable = CA − Charges variables. Elle montre combien chaque vente contribue à couvrir les charges fixes et à générer du bénéfice. Elle diffère de la marge brute car elle ne soustrait que les charges variables. Utile pour l\'analyse du seuil de rentabilité.' },
    ],
  },
  lt: {
    description: 'Naudokite maržos ir antkainių skaičiuotuvą savo produktų pelningumui analizuoti. Režimu „Skaičiuoti iš kainų" įveskite savikainą ir pardavimo kainą — iš karto gaukite bendrąją maržą ir antkainių procentą. Režimu „Rasti pardavimo kainą" įveskite savikainą ir tikslinę maržą arba antkainį.\n\nMarža ir antkainis — du svarbiausi kainodaros rodikliai versle. Skirtumas tarp jų ir pramonės normos žinojimas būtini teisingoms kainoms nustatyti ir deryboms su tiekėjais.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Koks skirtumas tarp maržos ir antkainių?', a: 'Marža = Pelnas ÷ Pajamos × 100. Antkainis = Pelnas ÷ Savikaina × 100. Tam pačiam produktui antkainis visada didesnis. Pvz.: savikaina 100 €, kaina 150 €, pelnas 50 € → Antkainis 50 %, Marža 33,3 %.' },
      { q: 'Ką geriau naudoti?', a: 'Marža tinkamesnė finansinei analizei ir apskaitai — rodo, kokia pajamų dalis yra pelnas. Antkainis dažniau naudojamas prekyboje ir pirkimuose pardavimo kainai iš savikainos apskaičiuoti.' },
      { q: 'Kaip apskaičiuoti pardavimo kainą pagal tikslinę maržą?', a: 'Pardavimo kaina = Savikaina ÷ (1 − Marža%). Pvz.: savikaina 100 €, marža 30 % → 100 ÷ 0,70 = 142,86 €. Tai automatiškai atlieka režimas „Rasti pardavimo kainą".' },
      { q: 'Kokia laikoma gera pelno marža?', a: 'Priklauso nuo sektoriaus. Maisto mažmeninėje prekyboje: 2–5 %. Gamyboje: 10–25 %. E-komercijoje: 15–30 %. Programinėje įrangoje ir SaaS: 60–80 %. Konsultavime: 30–50 %. Lyginkite su savo sektoriaus standartais.' },
      { q: 'Kaip konvertuoti maržą į antkainį ir atvirkščiai?', a: 'Antkainis iš maržos: Antkainis = Marža ÷ (1 − Marža). Pvz.: marža 30 % → 30 % ÷ 70 % = 42,86 %. Marža iš antkainių: Marža = Antkainis ÷ (1 + Antkainis). Pvz.: 42,86 % → 42,86 % ÷ 142,86 % = 30 %.' },
      { q: 'Koks skirtumas tarp bendrosios ir grynosios maržos?', a: 'Bendroji marža = (Pajamos − Parduotų prekių savikaina) ÷ Pajamos. Grynoji marža = Grynasis pelnas ÷ Pajamos (po visų išlaidų). Šis skaičiuotuvas apskaičiuoja bendrąją maržą.' },
      { q: 'Kokie tipiški antkainiai mažmeninėje prekyboje?', a: 'Tipiniai antkainiai: drabužiai 100–200 %, elektronika 10–30 %, baldai 100–300 %, juvelyriniai dirbiniai 200–400 %, maisto produktai 10–25 %. Konkrečios vertės priklauso nuo prekės ženklo ir konkurencijos.' },
      { q: 'Kas yra „keystone" antkainis?', a: 'Keystone antkainis — tradicinė mažmenininkų taisyklė: padvigubinti savikainą. Tai 100 % antkainis arba 50 % marža. Šiandien dažniau taikoma specialiose kategorijose; masinio segmento parduotuvės dažnai naudoja mažesnius antkainius.' },
      { q: 'Kaip PVM veikia maržos skaičiavimą?', a: 'Maržą reikia skaičiuoti pagal kainas be PVM, nes PVM pervedamas valstybei ir nėra pajamos. Jei pardavimo kainoje yra PVM 21 %, kaina be PVM = Kaina su PVM ÷ 1,21. Tada skaičiuokite maržą pagal kainą be PVM.' },
      { q: 'Kas yra kintamoji marža?', a: 'Kintamoji marža = Pajamos − Kintamos išlaidos. Parodo, kiek kiekvienas pardavimas prisideda prie fiksuotų išlaidų padengimo ir pelno. Skirtingai nuo bendrosios maržos, atskaitomos tik kintamos (ne visos tiesioginės) išlaidos. Naudinga lyginamosios analizės taške.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/margin', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MarginPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/margin`,
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
        <MarginCalculator locale={locale} />

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
