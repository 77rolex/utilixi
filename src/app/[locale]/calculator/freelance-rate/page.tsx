import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import FreelanceRateCalculator from './FreelanceRateCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string>> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/salary', label: 'Salary Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }],
  ru: [{ href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/salary', label: 'Калькулятор зарплаты' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }],
  uk: [{ href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/salary', label: 'Калькулятор зарплати' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }],
  fr: [{ href: '/calculator/income-tax', label: 'Calculatrice impôt sur le revenu' }, { href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/salary', label: 'Calculatrice de salaire' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }],
  lt: [{ href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' }, { href: '/calculator/roi', label: 'RI skaičiuotuvas' }, { href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Freelance Rate Calculator — Hourly & Day Rate for UK & US',
    description: 'Free freelance rate calculator for UK and US. Calculate your minimum hourly rate, day rate, and monthly freelance income based on target earnings, expenses, tax rate, and billable hours. Instant results.',
    h1: 'Freelance Rate Calculator',
    subtitle: 'Find the ideal hourly or daily rate to cover your expenses and reach your income goal.',
  },
  ru: {
    title: 'Калькулятор ставки фрилансера — минимальная почасовая ставка',
    description: 'Бесплатный калькулятор ставки фрилансера онлайн. Рассчитайте минимальную почасовую, дневную и месячную ставку на основе желаемого дохода, расходов и налоговой нагрузки.',
    h1: 'Калькулятор ставки фрилансера',
    subtitle: 'Определите оптимальную почасовую или дневную ставку для покрытия расходов и достижения дохода.',
  },
  uk: {
    title: 'Калькулятор ставки фрилансера — мінімальна погодинна ставка',
    description: 'Безкоштовний калькулятор ставки фрилансера онлайн. Розрахуйте мінімальну погодинну, денну та місячну ставку на основі бажаного доходу, витрат і податкового навантаження.',
    h1: 'Калькулятор ставки фрилансера',
    subtitle: 'Визначте оптимальну погодинну або денну ставку для покриття витрат та досягнення доходу.',
  },
  fr: {
    title: 'Calculatrice Taux Freelance — Tarif Horaire et Journalier',
    description: 'Calculatrice de taux freelance gratuite. Calculez votre tarif horaire minimum, tarif journalier et revenu mensuel selon votre objectif de revenu, vos dépenses et votre taux d\'imposition.',
    h1: 'Calculatrice de taux freelance',
    subtitle: 'Trouvez le tarif horaire ou journalier idéal pour couvrir vos charges et atteindre vos revenus.',
  },
  lt: {
    title: 'Laisvai Samdomų Tarifų Skaičiuotuvas — Valandinis ir Dienos Tarifas',
    description: 'Nemokamas laisvai samdomų darbuotojų tarifų skaičiuotuvas. Apskaičiuokite minimalų valandinį, dienos ir mėnesinį tarifą pagal pajamų tikslą, išlaidas ir mokesčių normą.',
    h1: 'Laisvai samdomų tarifų skaičiuotuvas',
    subtitle: 'Raskite idealų valandinį ar dienos tarifą, kad padengtumėte išlaidas ir pasiektumėte pajamų tikslą.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use this freelance rate calculator to find the minimum rate you need to charge to reach your financial goals. Enter your target net income, annual business expenses, tax rate, weeks off per year, and billable hours per week — and instantly get your minimum hourly rate, day rate, weekly and monthly freelance rates.\n\nAs a freelancer in the UK or US, your rate must cover everything an employer normally pays: National Insurance or self-employment tax, equipment, software, accounting, and paid vacation. A common rule of thumb: your freelance hourly rate should be at least 1.5–2× the equivalent employee hourly wage. Use this tool to verify you\'re not undercharging.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a billable hour?', a: 'A billable hour is time you can invoice a client for — actual work on their project. As a freelancer, not all your working time is billable: you also spend time on business development, marketing, admin, accounting, invoicing, and professional development. Most freelancers are billable for only 60–75% of their working hours. If you work 40 hours/week but only bill 25, your true hourly rate needs to cover the full 40.' },
      { q: 'What is a freelance day rate?', a: 'A freelance day rate is the amount you charge for a full working day, typically 7–8 hours. Day rates are common in IT contracting, design, consulting, and project-based work in the UK. A day rate is simply your hourly rate × billable hours per day (usually 7 or 8). For example, at £75/hour × 8 hours = £600/day. UK IR35 rules affect day-rate contractors working through limited companies — check your IR35 status before setting rates.' },
      { q: 'How do I calculate my freelance rate for the UK market?', a: 'For UK freelancers: (1) Calculate your target gross income = net income goal ÷ (1 − income tax − National Insurance rate). (2) Add annual business expenses (software, equipment, accounting). (3) Divide by billable hours per year (weeks worked × billable hours/week). Typical UK freelance rates: junior developers £300–450/day, mid-level £450–650/day, senior £650–900/day. Designers: £200–500/day. Copywriters: £150–400/day.' },
      { q: 'Why is my freelance rate higher than an employee salary?', a: 'As a freelancer you cover all costs an employer normally pays: employer National Insurance (13.8% in UK), pension contributions, equipment, software, accounting fees, office costs, and paid holiday. You also have no income during gaps between contracts and no sick pay. A freelancer earning £60,000 equivalent needs to charge for roughly 1,440–1,600 billable hours vs an employee\'s 2,080 hours — plus cover all overhead. This is why a freelance rate of 1.5–2× employee salary is typical.' },
      { q: 'How many billable hours per year is realistic?', a: 'With 4 weeks off and 30 billable hours/week, you get ~1,440 billable hours/year. In practice, also account for sick days (average 5–10 days/year), slow periods between clients, and non-billable admin time. Most experienced freelancers in the UK and US plan for 1,000–1,400 truly billable hours annually — roughly 60–70% of a standard working year.' },
      { q: 'What tax rate should I use as a UK freelancer?', a: 'For UK sole traders: Income Tax (20% basic rate up to £50,270, 40% higher rate above) + Class 4 National Insurance (9% on profits £12,570–£50,270, 2% above). Total effective rate is roughly 25–30% at moderate incomes. For limited company contractors: Corporation Tax (19–25%) + salary and dividend extraction — effective rate 20–30%. Use HMRC\'s tax calculator for your specific situation.' },
      { q: 'What tax rate should I use as a US freelancer?', a: 'US self-employed freelancers pay: Self-employment tax (15.3% on net earnings up to Social Security limit, 2.9% above) + Federal income tax (10–37% depending on bracket). You can deduct 50% of self-employment tax from income. At $80,000 net income, expect ~30–35% effective total tax rate. Also account for state income taxes (0–13% depending on state). Many US freelancers set aside 25–30% of income for taxes.' },
      { q: 'Should I charge by the hour or by the project?', a: 'Project-based pricing is often more profitable: clients pay for value delivered, not time spent, and you\'re rewarded for working efficiently. Use the hourly rate as your baseline to estimate project budgets. As you gain experience, shifting to value-based pricing (charging based on the business outcome you deliver) typically increases earnings by 30–100%. Start with hourly to build confidence, then move to fixed-price or retainer arrangements.' },
      { q: 'How do I account for unpaid gaps between projects?', a: 'Build a buffer into your rate. If you expect to be fully booked 10 months out of 12, divide your annual income target by 10 months of billable work rather than 12. Alternatively, use the "weeks off" input to account for expected downtime. Most freelancers in competitive markets have 1–2 months of unbilled time per year; those just starting may have 3–4 months. A 3-month emergency fund is the standard recommendation before going full-time freelance.' },
      { q: 'How often should I review my freelance rates?', a: 'Review your rates at least annually, and raise them when: you\'re fully booked consistently, your skills have significantly improved, inflation has eroded your purchasing power, or market rates in your niche have risen. A 5–10% annual increase is standard in most markets. Existing clients typically accept a rate increase of 10–15% with 30–60 days notice, especially if your work quality is high.' },
    ],
  },
  ru: {
    description: 'Используйте калькулятор ставки фрилансера, чтобы рассчитать минимальную ставку для достижения финансовых целей. Введите целевой чистый доход, годовые расходы на бизнес, налоговую нагрузку, количество недель отпуска и оплачиваемых часов в неделю — и мгновенно получите минимальные почасовую, дневную и месячную ставки.\n\nКак фрилансер, вы сами покрываете все расходы, которые обычно берёт на себя работодатель: налоги, страховые взносы, оборудование, ПО, бухгалтерия и отпуск. Стандартное правило: ставка фрилансера должна быть минимум в 1,5–2 раза выше эквивалентной почасовой ставки наёмного сотрудника. Используйте этот инструмент, чтобы убедиться, что вы не занижаете цену.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое оплачиваемый час?', a: 'Оплачиваемый час — это время, которое вы выставляете в счёт клиенту. Как фрилансер, вы также тратите время на маркетинг, административные задачи, бухгалтерию и обучение. Большинство фрилансеров выставляют счёт только за 60–75% рабочего времени. Если вы работаете 40 часов в неделю, но выставляете счёт только за 25, ваша реальная ставка должна покрывать все 40 часов.' },
      { q: 'Почему ставка фрилансера выше зарплаты сотрудника?', a: 'Фрилансер покрывает все расходы, которые обычно несёт работодатель: страховые взносы, пенсионные отчисления, оборудование, ПО, бухгалтерские услуги. Плюс нет оплаты в периоды между проектами и нет оплачиваемых больничных. Фрилансеру нужно выставить счёт за 1000–1400 оплачиваемых часов в год против 2080 рабочих часов у сотрудника — поэтому ставка фрилансера в 1,5–2 раза выше нормальная практика.' },
      { q: 'Сколько оплачиваемых часов в год реалистично?', a: 'При 4 неделях отпуска и 30 оплачиваемых часах в неделю получается ~1440 часов/год. На практике учитывайте больничные (5–10 дней), сезонные спады и время на поиск клиентов. Опытные фрилансеры планируют 1000–1400 реально оплачиваемых часов в год — около 60–70% рабочего года.' },
      { q: 'Брать почасово или за проект?', a: 'Проектная оплата часто выгоднее: клиент платит за результат, а не за время, и вы получаете больше при эффективной работе. Используйте почасовую ставку как основу для оценки стоимости проектов. По мере роста опыта переход на ценностное ценообразование (плата за бизнес-результат) типично увеличивает доход на 30–100%.' },
      { q: 'Какую налоговую нагрузку указывать для РФ?', a: 'Самозанятые (НПД): 6% с дохода от юрлиц, 4% от физлиц. ИП на УСН «доходы»: 6% + 1% с суммы свыше 300 тыс. ₽ в ПФ. ИП на ОСНО: НДФЛ 13–15% + НДС. В калькуляторе укажите эффективную ставку с учётом всех обязательных платежей. Для самозанятых с доходом до 500 тыс. ₽ это обычно 6–8%.' },
      { q: 'Как учесть простои между проектами?', a: 'Заложите буфер в ставку. Если вы ожидаете полную занятость 10 месяцев из 12, делите целевой годовой доход на 10, а не 12 месяцев оплачиваемой работы. Или используйте поле «недель отпуска» для учёта ожидаемых простоев. Большинство фрилансеров имеют 1–2 месяца неоплачиваемого времени в год, новички — 3–4 месяца.' },
      { q: 'Нужен ли финансовый резерв перед уходом во фриланс?', a: 'Да. Стандартная рекомендация — финансовая подушка на 3–6 месяцев расходов до выхода на полный фриланс. Это позволяет не браться за невыгодные проекты от страха остаться без денег и спокойно выстраивать клиентскую базу первые месяцы.' },
      { q: 'Как часто пересматривать ставки?', a: 'Пересматривайте ставки не реже раза в год. Повышайте их когда: загрузка стабильно полная, значительно вырос уровень экспертизы, инфляция снизила покупательную способность. Повышение на 10–15% с уведомлением за 30–60 дней большинство постоянных клиентов принимает нормально.' },
      { q: 'Что такое ценностное ценообразование?', a: 'Ценностное ценообразование — вы берёте плату не за время, а за ценность, которую создаёте для клиента. Например, SEO-текст, приносящий клиенту 300 000 ₽ выручки в месяц, стоит гораздо больше, чем просто «8 часов работы». Переход на ценностное ценообразование — один из самых мощных способов увеличить доход без увеличения рабочего времени.' },
      { q: 'Насколько точен этот калькулятор ставки фрилансера?', a: 'Калькулятор даёт математически точный результат на основе введённых данных. Реальная ставка зависит также от вашей специализации, опыта, рыночного спроса и географии клиентов. Используйте расчёт как отправную точку, а не как окончательное решение — проверьте рыночные ставки в вашей нише и регионе.' },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор ставки фрилансера, щоб розрахувати мінімальну ставку для досягнення фінансових цілей. Введіть цільовий чистий дохід, річні витрати на бізнес, податкове навантаження, кількість тижнів відпустки та оплачуваних годин на тиждень — і миттєво отримайте мінімальні погодинну, денну та місячну ставки.\n\nЯк фрилансер, ви самостійно покриваєте всі витрати, які зазвичай несе роботодавець: податки, страхові внески, обладнання, ПЗ, бухгалтерія та відпустка. Стандартне правило: ставка фрилансера має бути мінімум у 1,5–2 рази вища за еквівалентну погодинну ставку найманого працівника.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке оплачувана година?', a: 'Оплачувана година — це час, за який ви виставляєте рахунок клієнту. Як фрилансер, ви також витрачаєте час на маркетинг, адміністративні завдання, бухгалтерію та навчання. Більшість фрилансерів виставляють рахунок лише за 60–75% робочого часу. Якщо ви працюєте 40 годин на тиждень, але виставляєте рахунок лише за 25, ваша реальна ставка має покривати всі 40 годин.' },
      { q: 'Чому ставка фрилансера вища за зарплату працівника?', a: 'Фрилансер покриває всі витрати, які зазвичай несе роботодавець: ЄСВ, обладнання, ПЗ, бухгалтерські послуги. Плюс немає оплати в простої між проєктами та немає оплачуваних лікарняних. Тому ставка фрилансера в 1,5–2 рази вища — це нормальна практика.' },
      { q: 'Скільки оплачуваних годин на рік реально?', a: 'При 4 тижнях відпустки і 30 оплачуваних годинах на тиждень виходить ~1440 годин/рік. На практиці враховуйте лікарняні (5–10 днів), сезонні спади та час на пошук клієнтів. Досвідчені фрилансери планують 1000–1400 реально оплачуваних годин на рік.' },
      { q: 'Брати погодинно чи за проєкт?', a: 'Проєктна оплата часто вигідніша: клієнт платить за результат, а не за час, і ви отримуєте більше при ефективній роботі. Використовуйте погодинну ставку як основу для оцінки вартості проєктів. З досвідом перехід на ціннісне ціноутворення типово збільшує дохід на 30–100%.' },
      { q: 'Яке податкове навантаження вказувати для України?', a: 'ФОП на 2-й групі ЄП: 10% від мінімальної зарплати/місяць + ЄСВ (22% від мінімальної). ФОП на 3-й групі: 5% від доходу + ЄСВ. ПДФО для найманих: 18% + 1.5% військовий збір. Для розрахунку використовуйте загальну ефективну ставку — зазвичай 5–10% для ФОП на ЄП.' },
      { q: 'Як врахувати простої між проєктами?', a: 'Закладіть буфер у ставку. Якщо ви очікуєте повну зайнятість 10 місяців з 12, діліть цільовий річний дохід на 10, а не 12 місяців оплачуваної роботи. Або використовуйте поле «тижнів відпустки» для врахування очікуваних простоїв.' },
      { q: 'Чи потрібен фінансовий резерв перед виходом у фриланс?', a: 'Так. Стандартна рекомендація — фінансова подушка на 3–6 місяців витрат до повного переходу на фриланс. Це дозволяє не братися за невигідні проєкти від страху залишитися без грошей і спокійно формувати клієнтську базу перші місяці.' },
      { q: 'Як часто переглядати ставки?', a: 'Переглядайте ставки не рідше разу на рік. Підвищуйте їх коли: завантаження стабільно повне, значно виріс рівень експертизи, інфляція знизила купівельну спроможність. Підвищення на 10–15% з повідомленням за 30–60 днів більшість постійних клієнтів сприймає нормально.' },
      { q: 'Що таке ціннісне ціноутворення?', a: 'Ціннісне ціноутворення — ви берете плату не за час, а за цінність, яку створюєте для клієнта. SEO-текст, що приносить клієнту значну виручку щомісяця, коштує набагато більше, ніж просто «8 годин роботи». Перехід на ціннісне ціноутворення — один з найпотужніших способів збільшити дохід без збільшення робочого часу.' },
      { q: 'Наскільки точний цей калькулятор ставки фрилансера?', a: 'Калькулятор дає математично точний результат на основі введених даних. Реальна ставка залежить також від вашої спеціалізації, досвіду, ринкового попиту та географії клієнтів. Використовуйте розрахунок як відправну точку — перевірте ринкові ставки у вашій ніші та регіоні.' },
    ],
  },
  fr: {
    description: 'Utilisez cette calculatrice de taux freelance pour trouver le tarif minimum à facturer pour atteindre vos objectifs financiers. Entrez votre revenu net cible, vos dépenses professionnelles annuelles, votre taux d\'imposition, vos semaines de congés et vos heures facturables par semaine — et obtenez instantanément votre tarif horaire, votre tarif journalier (TJM) et votre revenu mensuel minimum.\n\nEn tant que freelance, vous devez couvrir toutes les charges qu\'un employeur paie normalement : cotisations sociales, mutuelle, équipement, logiciels, comptabilité et congés payés. En France, un freelance doit généralement facturer 1,5 à 2 fois l\'équivalent d\'un salarié pour obtenir le même revenu net. Vérifiez que vous ne vous sous-facturez pas.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qu\'une heure facturable ?', a: 'Une heure facturable est du temps que vous pouvez facturer à un client — travail direct sur son projet. En tant que freelance, tout votre temps de travail n\'est pas facturable : vous consacrez aussi du temps à la prospection, l\'administratif, la comptabilité et la formation. La plupart des freelances ne facturent que 60 à 75 % de leurs heures de travail réelles.' },
      { q: 'Qu\'est-ce que le TJM (Taux Journalier Moyen) ?', a: 'Le TJM est le tarif que vous facturez pour une journée complète de travail (7–8 heures). C\'est la référence standard pour les consultants, développeurs et designers freelances en France. TJM = taux horaire × heures par jour. Un TJM standard en développement web en France : junior 250–350 €, confirmé 350–550 €, senior 550–800 €. En gestion de projet ou conseil stratégique : 600–1 200 €.' },
      { q: 'Pourquoi le tarif freelance est-il supérieur au salaire salarié ?', a: 'En tant que freelance (auto-entrepreneur, SASU ou EURL), vous couvrez toutes les charges patronales et salariales : cotisations URSSAF (22% en auto-entreprise), retraite, mutuelle, équipement, logiciels, comptable, et congés non payés. Vous payez également les périodes sans client. Un freelance doit facturer ~1,5 à 2 fois le coût total d\'un employé équivalent pour obtenir le même revenu net.' },
      { q: 'Combien d\'heures facturables par an est réaliste ?', a: 'Avec 5 semaines de congés et 30 heures facturables/semaine, vous obtenez ~1 410 heures/an. En pratique, comptez aussi les arrêts maladie (5–10 jours), les périodes creuses entre clients et le temps administratif non facturable. La plupart des freelances expérimentés planifient 1 000 à 1 400 heures réellement facturées par an.' },
      { q: 'Quel taux d\'imposition utiliser en France ?', a: 'Auto-entrepreneur : cotisations URSSAF de 22,2 % (activités de service BNC) ou 21,2 % (BIC) sur le chiffre d\'affaires. SASU / EURL IS : IS de 15–25 % + charges sur salaire et dividendes. Taux effectif global en auto-entreprise : 22–30 % selon revenus. Consultez un expert-comptable pour votre situation — les abattements et déductions varient selon le régime choisi.' },
      { q: 'Comment prendre en compte les périodes sans client ?', a: 'Intégrez un coefficient de charge dans votre calcul. Si vous estimez être chargé 10 mois sur 12, divisez votre revenu annuel cible par 10 mois de travail facturable plutôt que 12. Alternativement, augmentez le nombre de semaines de congés dans le calculateur. Garder 3 à 6 mois de trésorerie de précaution avant de vous lancer est recommandé.' },
      { q: 'Faut-il facturer à l\'heure ou au projet ?', a: 'La facturation au projet (ou au livrable) est souvent plus rentable : le client paie pour le résultat et non le temps passé. Utilisez le taux horaire comme base d\'estimation interne. Avec l\'expérience, la tarification à la valeur (basée sur l\'impact business apporté) peut multiplier vos revenus par 1,5 à 2 sans augmenter votre temps de travail.' },
      { q: 'À quelle fréquence revoir ses tarifs freelance ?', a: 'Revoyez vos tarifs au moins une fois par an. Augmentez-les lorsque : votre agenda est complet régulièrement, vos compétences ont évolué, l\'inflation érode votre pouvoir d\'achat, ou les tarifs du marché ont augmenté. Une hausse de 10–15 % avec un préavis de 30 à 60 jours est généralement acceptée par les clients fidèles.' },
      { q: 'Qu\'est-ce que la tarification à la valeur ?', a: 'La tarification à la valeur consiste à facturer non pas votre temps mais la valeur créée pour le client. Une campagne marketing qui génère 50 000 € de chiffre d\'affaires vaut bien plus que "20 heures de travail". C\'est l\'un des leviers les plus puissants pour augmenter vos revenus sans travailler plus — mais elle nécessite une relation de confiance avec le client et une compréhension claire de vos résultats.' },
      { q: 'Quelle est la précision de cette calculatrice de taux freelance ?', a: 'La calculatrice fournit un résultat mathématiquement exact basé sur vos données. Le tarif réel dépend aussi de votre spécialité, votre expérience, la demande du marché et la localisation de vos clients. Utilisez ce calcul comme point de départ et comparez avec les tarifs pratiqués dans votre secteur.' },
    ],
  },
  lt: {
    description: 'Naudokite šį laisvai samdomų darbuotojų tarifų skaičiuotuvą, kad rastumėte minimalų tarifą savo finansiniams tikslams pasiekti. Įveskite tikslines grynąsias pajamas, metines verslo išlaidas, mokesčių normą, atostogų savaičių skaičių ir apmokamas valandas per savaitę — ir iš karto gaukite minimalų valandinį, dienos ir mėnesinį tarifą.\n\nKaip laisvai samdomas darbuotojas, jūs pats dengiате visas išlaidas, kurias paprastai moka darbdavys: socialinius mokesčius, draudimą, įrangą, programinę įrangą, buhalterinę apskaitą ir atostogas. Standartinė taisyklė: laisvai samdomų darbuotojų tarifas turi būti bent 1,5–2 kartus didesnis už ekvivalentinį samdomo darbuotojo valandinį atlygį.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra apmokama valanda?', a: 'Apmokama valanda — tai laikas, kurį galite skaičiuoti klientui — tiesioginis darbas su jų projektu. Laisvai samdomi darbuotojai taip pat skiria laiko rinkodarai, administravimui, buhalterinei apskaitai ir mokymuisi. Dauguma laisvai samdomų darbuotojų skaičiuoja tik 60–75 % darbo laiko. Jei dirbate 40 val./sav., bet skaičiuojate tik 25, jūsų tarifas turi dengti visas 40 valandų.' },
      { q: 'Kodėl laisvai samdomų darbuotojų tarifas aukštesnis už samdomo darbuotojo atlyginimą?', a: 'Laisvai samdomas darbuotojas padengia visas išlaidas, kurias paprastai moka darbdavys: socialinio draudimo įmokas, sveikatos draudimą, įrangą, programinę įrangą, buhalterinę apskaitą. Be to, nėra apmokamo laiko tarp projektų ir nėra apmokamų nedarbingumo lapelių. Todėl 1,5–2 kartus didesnis tarifas nei samdomo darbuotojo atlyginimas yra normali praktika.' },
      { q: 'Kiek apmokamų valandų per metus yra realu?', a: 'Su 4 atostogų savaitėmis ir 30 apmokamų valandų per savaitę gaunate ~1 440 valandų per metus. Iš tikrųjų taip pat atsižvelkite į nedarbingumą (5–10 dienų), sezoninius svyravimus ir ne apmokamą administracinį laiką. Patyrę laisvai samdomi darbuotojai planuoja 1 000–1 400 tikrai apmokamų valandų per metus.' },
      { q: 'Ar skaičiuoti pagal valandas ar pagal projektą?', a: 'Skaičiavimas pagal projektą dažnai pelningesnis: klientas moka už vertę, o ne laiką, ir jūs gausite daugiau dirbdami efektyviai. Naudokite valandinį tarifą kaip pagrindą projektų kainai apskaičiuoti. Įgijus patirties, perėjimas prie vertės kainodaros (mokėjimas pagal sukuriamą verslo efektą) paprastai padidina pajamas 30–100 %.' },
      { q: 'Kokią mokesčių normą nurodyti Lietuvoje?', a: 'Individualios veiklos (IV) mokestis: GPM 15 % (su lengvatomis gali būti mažiau) + PSD 6,98 % + VSD 12,52 %. Iš viso efektyvi norma paprastai 25–35 %. MB nariai: GPM 15 % nuo paskirstytų dividendų + VSD ir PSD įmokos. Konsultuokitės su buhalteriu dėl jūsų konkrečios situacijos.' },
      { q: 'Kaip atsižvelgti į laikotarpius be klientų?', a: 'Įtraukite rezervą į savo tarifą. Jei tikitės visiškai dirbti 10 mėnesių iš 12, savo metinį pajamų tikslą dalinkite iš 10, o ne 12 apmokamų darbo mėnesių. Arba naudokite lauką „atostogų savaitės" numatomoms prastovoms atsižvelgti. Rekomenduojama turėti 3–6 mėnesių finansinį rezervą prieš pereinant į pilną laisvą samdą.' },
      { q: 'Kaip dažnai peržiūrėti tarifus?', a: 'Peržiūrėkite tarifus bent kartą per metus. Didinkite juos, kai: nuolat esate pilnai užimti, žymiai išaugo jūsų ekspertizės lygis, infliacija sumažino perkamąją galią, arba rinkos tarifai jūsų srityje padidėjo. 10–15 % padidinimas su 30–60 dienų įspėjimu dažniausiai priimamas nuolatinių klientų.' },
      { q: 'Kas yra vertės kainodara?', a: 'Vertės kainodara — jūs imkite mokestį ne už laiką, o už sukuriamą vertę klientui. SEO tekstas, generuojantis klientui žymias papildomas pajamas, vertas daug daugiau nei tiesiog „8 darbo valandos". Tai vienas iš galingiausių būdų padidinti pajamas nepadidinant darbo laiko.' },
      { q: 'Kiek tikslus šis laisvai samdomų tarifų skaičiuotuvas?', a: 'Skaičiuotuvas pateikia matematiškai tikslų rezultatą remiantis jūsų duomenimis. Tikrasis tarifas taip pat priklauso nuo jūsų specializacijos, patirties, rinkos paklausos ir klientų geografijos. Naudokite skaičiavimą kaip pradžios tašką ir palyginkite su rinkos tarifais jūsų srityje.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/freelance-rate', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FreelanceRatePage({ params, searchParams }: Props) {
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
    url: `https://www.utilixi.com/${locale}/calculator/freelance-rate`,
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
        <FreelanceRateCalculator locale={locale} initialCurrency={sp.currency} initialIncome={sp.income} initialExpenses={sp.expenses} initialTax={sp.tax} initialWeeks={sp.weeks} initialHours={sp.hours} />
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
