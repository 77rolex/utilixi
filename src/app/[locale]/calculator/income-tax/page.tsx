import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import IncomeTaxCalculator from './IncomeTaxCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/freelance-rate', label: 'Freelance Rate Calculator' }, { href: '/calculator/salary', label: 'Salary Calculator' }, { href: '/calculator/margin', label: 'Margin Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }],
  ru: [{ href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' }, { href: '/calculator/salary', label: 'Калькулятор зарплаты' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }],
  uk: [{ href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' }, { href: '/calculator/salary', label: 'Калькулятор зарплати' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }],
  fr: [{ href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/freelance-rate', label: 'Taux freelance' }, { href: '/calculator/salary', label: 'Calculatrice de salaire' }, { href: '/calculator/margin', label: 'Calculatrice marge' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }],
  lt: [{ href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/freelance-rate', label: 'Laisvai samdomų tarifas' }, { href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Income Tax Calculator — Tax by Country 2024',
    description: 'Free income tax calculator for 8 countries. Calculate your income tax, effective rate, and net salary based on tax brackets for USA, UK, Germany, France, Poland, Lithuania, Ukraine, and Russia.',
    h1: 'Income Tax Calculator',
  },
  ru: {
    title: 'Калькулятор подоходного налога — НДФЛ по странам 2024',
    description: 'Бесплатный калькулятор подоходного налога для 8 стран. Рассчитайте НДФЛ, эффективную ставку и чистый доход на основе налоговых ставок США, Великобритании, Германии, Франции, Польши, Литвы, Украины, России.',
    h1: 'Калькулятор подоходного налога',
  },
  uk: {
    title: 'Калькулятор прибуткового податку — ПДФО за країнами 2024',
    description: 'Безкоштовний калькулятор прибуткового податку для 8 країн. Розрахуйте ПДФО, ефективну ставку та чистий дохід для США, Великобританії, Німеччини, Франції, Польщі, Литви, України, Росії.',
    h1: 'Калькулятор прибуткового податку',
  },
  fr: {
    title: 'Calculatrice d\'impôt sur le revenu — par pays 2024',
    description: 'Calculatrice d\'impôt gratuite pour 8 pays. Calculez votre impôt, taux effectif et salaire net selon les tranches fiscales des États-Unis, Royaume-Uni, Allemagne, France, Pologne, Lituanie, Ukraine et Russie.',
    h1: 'Calculatrice d\'impôt sur le revenu',
  },
  lt: {
    title: 'Pajamų mokesčio skaičiuotuvas — pagal šalis 2024',
    description: 'Nemokamas pajamų mokesčio skaičiuotuvas 8 šalims. Apskaičiuokite mokestį, efektyvią normą ir grynąsias pajamas pagal JAV, JK, Vokietijos, Prancūzijos, Lenkijos, Lietuvos, Ukrainos ir Rusijos tarifus.',
    h1: 'Pajamų mokesčio skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Calculate your income tax for 8 countries using real 2024 tax brackets. Enter your annual gross income and country — our calculator shows the total tax owed, your effective (average) tax rate, net annual income, and a breakdown by tax bracket.\n\nIncome tax systems vary widely: some countries use progressive brackets (the more you earn, the higher the rate on the top portion), others use flat rates. Understanding your marginal vs effective rate helps you plan salary negotiations, freelance pricing, and investment decisions.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a marginal tax rate?', a: 'The marginal rate is the rate applied to your last dollar/euro of income. In a progressive system, different portions of income are taxed at different rates. For example, in the UK: the first £12,570 is tax-free, then 20% up to £50,270, then 40% above that.' },
      { q: 'What is the effective tax rate?', a: 'The effective (average) rate is total tax paid divided by total income. It is always lower than your marginal rate. For example, a UK taxpayer earning £60,000 has a marginal rate of 40% but an effective rate of only about 22% because most income is taxed at lower rates.' },
      { q: 'Does this calculator include social security contributions?', a: 'No — this calculator only shows income tax. Social security, national insurance, pension contributions, Medicare, and local/state taxes are not included. Your actual take-home pay will be lower than shown.' },
      { q: 'Which country has the lowest income tax?', a: 'Among the 8 countries: Ukraine has a flat rate of 19.5% (18% + 1.5% military levy). The US and Poland offer tax-free thresholds making lower incomes nearly tax-free. Germany has the highest top rate (45%) but only on incomes above ~€277,000.' },
      { q: 'How does the UK income tax work?', a: 'In the UK for 2024–25: Personal allowance £12,570 (0% tax). Basic rate: 20% on £12,571–£50,270. Higher rate: 40% on £50,271–£125,140. Additional rate: 45% above £125,140. The personal allowance tapers away for incomes above £100,000.' },
      { q: 'How does France\'s income tax work?', a: 'France uses a progressive household-based (quotient familial) system. For 2024, the brackets are: 0% up to €11,294; 11% from €11,294 to €28,797; 30% up to €82,341; 41% up to €177,106; 45% above that. The tax is calculated on household income divided by the number of "parts" (family quotient).' },
      { q: 'How does the US income tax work?', a: 'The US uses federal progressive brackets (for single filers 2024): 10% up to $11,600; 12% to $47,150; 22% to $100,525; 24% to $191,950; 32% to $243,725; 35% to $609,350; 37% above. State income tax is additional and varies from 0% to 13.3% depending on the state.' },
      { q: 'How does German income tax work?', a: 'Germany has a progressive linear formula (no fixed brackets). For 2024: income up to €11,784 is tax-free. Between €11,784 and €66,760: rate rises progressively from 14% to 42%. Between €66,760 and €277,826: flat 42%. Above €277,826: 45% (Reichsteuer). Church tax (~8–9%) and solidarity surcharge may also apply.' },
      { q: 'What is a flat income tax?', a: 'A flat tax applies the same rate to all income above a threshold. Ukraine (18% + 1.5%), Russia (13–22%), and Poland (12–32%) use simplified structures closer to flat rates. Flat systems are simpler to calculate but typically less redistributive than progressive systems.' },
      { q: 'How can I legally reduce my income tax?', a: 'Common legal methods include: contributing to pension plans (reduces taxable income in most countries), claiming tax credits (children, education, energy), using tax-efficient investment accounts (ISA in UK, PEA in France, IRA in US), deducting home office expenses (for self-employed), and income splitting with a spouse in applicable tax systems.' },
    ],
  },
  ru: {
    description: 'Рассчитайте подоходный налог для 8 стран по реальным налоговым ставкам 2024 года. Введите годовой доход и страну — калькулятор покажет сумму налога, эффективную ставку, чистый доход и разбивку по налоговым ставкам.\n\nНалоговые системы существенно отличаются: прогрессивные шкалы (Германия, Франция, Великобритания, США) облагают высокие доходы по более высоким ставкам. Плоские или упрощённые системы (Украина, Россия) применяют единую ставку. Знание разницы между предельной и эффективной ставкой поможет вам планировать зарплату и инвестиции.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое предельная налоговая ставка?', a: 'Предельная ставка применяется к последнему рублю дохода. В прогрессивной системе разные части дохода облагаются по разным ставкам. В России с 2025 года: до 2,4 млн ₽ — 13%, 2,4–5 млн — 15%, 5–20 млн — 18%, 20–50 млн — 20%, свыше 50 млн — 22%.' },
      { q: 'Что такое эффективная налоговая ставка?', a: 'Эффективная (средняя) ставка — общая сумма налога, делённая на весь доход. Она всегда ниже предельной. Например, при доходе 5 млн ₽ в России предельная ставка — 18%, а эффективная — около 14–15%, потому что большая часть дохода облагается по 13%.' },
      { q: 'Включает ли калькулятор страховые взносы?', a: 'Нет. Показывается только НДФЛ. Взносы в ПФР, ФОМС, ФСС, региональные налоги и другие отчисления не учтены. Реальный чистый доход будет ниже.' },
      { q: 'В какой стране самый низкий подоходный налог?', a: 'Среди 8 стран: на Украине — 19,5% (18% + 1,5% военный сбор), в США и Польше действует необлагаемый минимум, делающий небольшие доходы безналоговыми. В Германии высшая ставка 45%, но применяется только к доходам выше ~277 000 €.' },
      { q: 'Как работает НДФЛ в России?', a: 'С 2025 года в России прогрессивная пятиступенчатая шкала: 13% — до 2,4 млн ₽; 15% — 2,4–5 млн; 18% — 5–20 млн; 20% — 20–50 млн; 22% — свыше 50 млн ₽ в год. Налог рассчитывается с каждого рубля дохода, превышающего следующую ступень.' },
      { q: 'Как работает подоходный налог в Германии?', a: 'Германия использует непрерывную прогрессивную формулу. Необлагаемый минимум — 11 784 € (2024). Ставка растёт от 14% до 42% для доходов до 66 760 €. Выше — 42% (Spitzensteuersatz). Свыше 277 826 € — 45% (Reichsteuer). Плюс возможен церковный налог ~8–9%.' },
      { q: 'Как работает подоходный налог во Франции?', a: 'Во Франции прогрессивная система для домохозяйства (quotient familial): 0% до €11 294, 11% до €28 797, 30% до €82 341, 41% до €177 106, 45% сверх €177 106. Налог рассчитывается на суммарный доход домохозяйства с учётом «долей» на каждого члена.' },
      { q: 'Как работает подоходный налог в Великобритании?', a: 'В Великобритании (2024–25): необлагаемый минимум £12 570. Basic rate — 20% на £12 571–£50 270. Higher rate — 40% на £50 271–£125 140. Additional rate — 45% свыше £125 140. При доходе выше £100 000 личный вычет постепенно уменьшается.' },
      { q: 'Что такое плоский налог?', a: 'Плоский налог применяет единую ставку ко всем доходам выше порога. Украина (18% + 1,5%), Россия (13–22%) — ближе к плоским или упрощённым системам. Плоские системы проще рассчитывать, но менее перераспределяющие по сравнению с прогрессивными.' },
      { q: 'Как легально снизить подоходный налог?', a: 'Основные законные способы: взносы в НПФ или ИИС (налоговый вычет), социальные вычеты (обучение, лечение, благотворительность), имущественные вычеты при покупке жилья (до 260 000 ₽ + вычет по ипотечным процентам до 390 000 ₽), профессиональные вычеты для ИП и самозанятых.' },
      { q: 'Почему реальная зарплата «на руки» ниже расчётного чистого дохода?', a: 'Калькулятор показывает только подоходный налог. Фактически с вашей зарплаты работодатель ещё перечисляет: в России — 22% в ПФР, 5,1% в ФОМС, 2,9% в ФСС (итого ~30% дополнительной нагрузки). Эти взносы не снижают вашу зарплату напрямую, но увеличивают стоимость труда для работодателя.' },
    ],
  },
  uk: {
    description: 'Розрахуйте прибутковий податок для 8 країн за реальними ставками 2024 року. Введіть річний дохід і країну — калькулятор покаже суму податку, ефективну ставку, чистий дохід і розбивку за податковими ставками.\n\nПодаткові системи суттєво відрізняються: прогресивні шкали (Німеччина, Франція, Великобританія, США) обкладають вищі доходи за вищими ставками. Спрощені або плоскі системи (Україна, Росія) застосовують єдину або майже єдину ставку.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке гранична податкова ставка?', a: 'Гранична ставка застосовується до останньої одиниці доходу. В Україні ПДФО — 18%, плюс військовий збір 1,5% (разом 19,5%). Для підприємців-ФОП діють інші ставки єдиного податку.' },
      { q: 'Що таке ефективна податкова ставка?', a: 'Ефективна (середня) ставка — загальна сума податку, поділена на весь дохід. Якщо є неоподатковуваний мінімум або прогресивна шкала, ефективна ставка завжди нижча за граничну.' },
      { q: 'Чи включає калькулятор ЄСВ?', a: 'Ні. Показується лише ПДФО та військовий збір. Єдиний соціальний внесок (ЄСВ 22% для роботодавця), військовий збір та інші відрахування для ФОП не враховані.' },
      { q: 'Як розраховується ПДФО в Україні?', a: 'В Україні — плоска ставка 18% ПДФО на всі доходи + 1,5% військовий збір (разом 19,5%). Після перемоги у війні вводяться зміни: планується прогресивна шкала. Соціальна пільга застосовується для доходів нижче певного порогу.' },
      { q: 'Як працює підоходний податок у Великобританії?', a: 'У Великобританії (2024–25): неоподатковуваний мінімум £12 570. Basic rate — 20% на £12 571–£50 270. Higher rate — 40% на £50 271–£125 140. Additional rate — 45% вище £125 140.' },
      { q: 'Як працює підоходний податок у Франції?', a: 'Франція використовує прогресивну систему: 0% до €11 294, 11% до €28 797, 30% до €82 341, 41% до €177 106, 45% вище. Розраховується на дохід домогосподарства з урахуванням кількості членів (quotient familial).' },
      { q: 'Як працює підоходний податок у Польщі?', a: 'Польща (2024): неоподатковуваний мінімум 30 000 злотих/рік. Ставка 12% на доходи до 120 000 злотих. 32% на суму вище 120 000 злотих. Це одна з найпростіших прогресивних систем у Центральній Європі.' },
      { q: 'Що таке плоский податок?', a: 'Плоский податок застосовує єдину ставку до всіх доходів вище порогу. Україна (18% + 1,5%) — по суті плоска система. Плоскі системи прості для розрахунку, але менш перерозподільчі.' },
      { q: 'Як легально зменшити прибутковий податок в Україні?', a: 'Основні способи: соціальна пільга (для доходів нижче ~3 700 грн/міс), податкова знижка (навчання, іпотека, внески до НПФ, благодійність), статус ФОП 3-ї групи зі ставкою 5% від доходу.' },
      { q: 'Чому реальна зарплата «на руки» нижча за розрахунковий чистий дохід?', a: 'Калькулятор показує лише ПДФО і військовий збір. Фактично роботодавець ще сплачує ЄСВ 22% від нарахованої зарплати. Ці кошти не вираховуються з вашої зарплати, але збільшують витрати роботодавця.' },
    ],
  },
  fr: {
    description: 'Calculez votre impôt sur le revenu pour 8 pays avec les tranches fiscales réelles 2024. Entrez votre revenu annuel brut et votre pays — notre calculatrice affiche l\'impôt total, le taux effectif, le revenu net et le détail par tranche.\n\nLes systèmes fiscaux varient considérablement : les systèmes progressifs (France, Allemagne, Royaume-Uni, États-Unis) taxent les revenus élevés à des taux plus forts. Comprendre la différence entre taux marginal et taux effectif est essentiel pour négocier un salaire ou planifier vos placements.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le taux marginal d\'imposition ?', a: 'C\'est le taux appliqué à votre dernier euro de revenu. En France, les tranches 2024 sont : 0 % jusqu\'à 11 294 €, 11 % jusqu\'à 28 797 €, 30 % jusqu\'à 82 341 €, 41 % jusqu\'à 177 106 €, 45 % au-delà.' },
      { q: 'Qu\'est-ce que le taux effectif d\'imposition ?', a: 'Le taux effectif est le total de l\'impôt divisé par le revenu total. Il est toujours inférieur au taux marginal. Par exemple, un contribuable gagnant 60 000 € en France a un taux marginal de 30 %, mais un taux effectif d\'environ 13 % seulement.' },
      { q: 'La calculatrice inclut-elle les cotisations sociales ?', a: 'Non — uniquement l\'impôt sur le revenu (IR). Les cotisations sociales salariales (URSSAF, retraite, chômage), la CSG, la CRDS et la taxe d\'habitation ne sont pas incluses. Votre revenu net réel sera plus faible.' },
      { q: 'Comment fonctionne l\'impôt sur le revenu en France ?', a: 'En France (2024) : 0 % jusqu\'à 11 294 €, 11 % de 11 294 à 28 797 €, 30 % jusqu\'à 82 341 €, 41 % jusqu\'à 177 106 €, 45 % au-delà. L\'impôt est calculé sur le revenu du foyer fiscal divisé par le nombre de parts (quotient familial). Pour un célibataire : 1 part. Couple sans enfant : 2 parts.' },
      { q: 'Qu\'est-ce que le quotient familial ?', a: 'Le quotient familial divise le revenu du foyer par un nombre de « parts » selon la composition familiale (2 pour un couple, +0,5 par enfant). Cela réduit l\'impôt pour les familles. Le gain fiscal par demi-part est plafonné (~1 759 € en 2024).' },
      { q: 'Comment fonctionne l\'impôt au Royaume-Uni ?', a: 'Au Royaume-Uni (2024–25) : abattement personnel £12 570 (0 %). Basic rate 20 % de £12 571 à £50 270. Higher rate 40 % de £50 271 à £125 140. Additional rate 45 % au-delà. L\'abattement personnel disparaît progressivement au-delà de £100 000.' },
      { q: 'Comment fonctionne l\'impôt aux États-Unis ?', a: 'Les États-Unis ont un système fédéral progressif à 7 tranches (pour célibataires 2024) : 10 %, 12 %, 22 %, 24 %, 32 %, 35 % et 37 %. S\'y ajoute l\'impôt d\'État (0 % à 13,3 % selon l\'État). Cela représente une complexité fiscale importante.' },
      { q: 'Comment fonctionne l\'impôt en Allemagne ?', a: 'L\'Allemagne utilise une formule progressive continue. Exonération jusqu\'à 11 784 € (2024). Taux croissant de 14 % à 42 % pour les revenus jusqu\'à 66 760 €. Au-delà : 42 % fixe. Au-dessus de 277 826 € : 45 % (Reichsteuer). La taxe d\'église (~8–9 %) peut s\'ajouter.' },
      { q: 'Qu\'est-ce qu\'un impôt forfaitaire (flat tax) ?', a: 'Un impôt forfaitaire applique le même taux à tous les revenus au-delà d\'un seuil. L\'Ukraine (18 % + 1,5 %) et la Pologne (12–32 %, quasi-forfaitaire pour les bas revenus) s\'en rapprochent. Les systèmes forfaitaires sont plus simples mais moins redistributifs.' },
      { q: 'Comment réduire légalement son impôt en France ?', a: 'Principaux leviers : Plan d\'Épargne Retraite (PER, déductible du revenu imposable), dons aux associations (66 % de réduction), crédits d\'impôt garde d\'enfants (50 %), investissement locatif (Pinel en cours de suppression), versements syndicaux, frais réels (si supérieurs aux 10 % forfaitaires).' },
    ],
  },
  lt: {
    description: 'Apskaičiuokite pajamų mokestį 8 šalims pagal tikruosius 2024 m. mokesčių tarifus. Įveskite metines bendrąsias pajamas ir šalį — skaičiuotuvas parodys mokesčio sumą, efektyvią normą, grynąsias pajamas ir tarifų analizę.\n\nMokesčių sistemos labai skiriasi: progresinės skalės (Vokietija, Prancūzija, JK, JAV) apmokestina didesnes pajamas aukštesniais tarifais. Supaprastintos ar fiksuotos sistemos (Ukraina, Rusija) taiko vieną arba beveik vieną tarifą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra ribinis mokesčio tarifas?', a: 'Ribinis tarifas taikomas paskutiniam pajamų eurui. Progresyvioje sistemoje skirtingos pajamų dalys apmokestinamos skirtingais tarifais. Lietuvoje: pajamos iki 101 094 € apmokestinamos 20 % GPM tarifu, virš šios sumos — 32 %.' },
      { q: 'Kas yra efektyvus mokesčio tarifas?', a: 'Efektyvus (vidutinis) tarifas — bendra mokesčio suma, padalyta iš visų pajamų. Jis visada mažesnis už ribinį tarifą, nes mažesnės pajamų dalys apmokestinamos žemesniais tarifais.' },
      { q: 'Ar skaičiuotuvas apima socialinio draudimo įmokas?', a: 'Ne — rodomas tik pajamų mokestis (GPM). Socialinio draudimo įmokos darbuotojui (12,52 %) ir sveikatos draudimas (6,98 %) neįtraukti. Faktinis neto atlyginimas bus mažesnis.' },
      { q: 'Kaip veikia pajamų mokestis Lietuvoje?', a: 'Lietuvoje (2024): 20 % GPM tarifo taikoma pajamoms iki 101 094 € per metus. 32 % — pajamų daliai virš šios ribos. Neapmokestinamosios pajamos (NPD) mažina apmokestinamąją bazę mažas pajamas gaunantiems gyventojams.' },
      { q: 'Kaip veikia pajamų mokestis Vokietijoje?', a: 'Vokietija naudoja tolydžiąją progresinę formulę. Neapmokestinamasis minimumas — 11 784 € (2024). Tarifas kyla nuo 14 % iki 42 % pajamoms iki 66 760 €. Virš 66 760 € — fiksuotas 42 %. Virš 277 826 € — 45 % (Reichsteuer). Gali papildomai taikyti bažnyčios mokestis ~8–9 %.' },
      { q: 'Kaip veikia pajamų mokestis Prancūzijoje?', a: 'Prancūzija: 0 % iki 11 294 €, 11 % iki 28 797 €, 30 % iki 82 341 €, 41 % iki 177 106 €, 45 % virš. Mokestis skaičiuojamas namų ūkio pajamoms, padalytoms pagal „dalių" skaičių (quotient familial).' },
      { q: 'Kaip veikia pajamų mokestis JK?', a: 'JK (2024–25): asmeninis išskaitymas £12 570 (0 %). Basic rate 20 % iki £50 270. Higher rate 40 % iki £125 140. Additional rate 45 % virš. Asmeninis išskaitymas mažėja pajamoms viršijant £100 000.' },
      { q: 'Kas yra fiksuotas mokestis?', a: 'Fiksuotas mokestis taiko vienodą tarifą visoms pajamoms virš ribos. Ukraina (18 % + 1,5 %), Rusija — artimesnės fiksuotoms sistemoms. Tokios sistemos paprastesnės, bet mažiau perskirstančios.' },
      { q: 'Kaip teisėtai sumažinti pajamų mokestį Lietuvoje?', a: 'Pagrindiniai būdai: NPD (neapmokestinamosios pajamos — mažina mokesčių bazę), gyvybės draudimo ir pensijų įmokos (iki 25 % pajamų), palūkanų už būsto paskolą išskaitymas (iki 2 000 € per metus), labdara, individualios veiklos leidžiamos išlaidos.' },
      { q: 'Kodėl faktinis neto atlyginimas mažesnis nei skaičiuotuvo rezultatas?', a: 'Skaičiuotuvas rodo tik GPM (pajamų mokestį). Iš tikrųjų darbuotojas dar moka: socialinio draudimo įmokos 12,52 %, sveikatos draudimas 6,98 % — iš viso ~19,5 % papildomai nuo bruto atlyginimo.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/income-tax'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function IncomeTaxPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/income-tax`,
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
        <IncomeTaxCalculator locale={locale} />

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
