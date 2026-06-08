import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import RenovationCalculator from './RenovationCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/property-tax', label: 'Property Tax Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/loan', label: 'Loan Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/rent-vs-buy', label: 'Rent vs Buy Calculator' }],
  ru: [{ href: '/calculator/property-tax', label: 'Калькулятор налога на недвижимость' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредита' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/rent-vs-buy', label: 'Аренда vs Покупка' }],
  uk: [{ href: '/calculator/property-tax', label: 'Калькулятор податку на нерухомість' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредиту' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/rent-vs-buy', label: 'Оренда vs Купівля' }],
  fr: [{ href: '/calculator/property-tax', label: 'Calculateur de taxe foncière' }, { href: '/calculator/mortgage', label: 'Calculateur de prêt immobilier' }, { href: '/calculator/loan', label: 'Calculatrice de prêt' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/rent-vs-buy', label: 'Louer vs Acheter' }],
  lt: [{ href: '/calculator/property-tax', label: 'Nekilnojamojo turto mokesčio skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/rent-vs-buy', label: 'Nuoma vs Pirkimas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Home Renovation Cost Calculator UK — Cost per m² by Room & Quality',
    description: 'Free renovation cost calculator for the UK, Belgium, Germany, France, Poland, Ukraine and USA. Estimate home renovation costs per m² by room type and finish quality. Covers bathroom, kitchen, full apartment and house renovation.',
    h1: 'Renovation Cost Calculator',
  },
  ru: {
    title: 'Калькулятор стоимости ремонта квартиры — по стране и типу помещения',
    description: 'Бесплатный калькулятор стоимости ремонта квартиры или дома онлайн. Рассчитайте затраты за квадратный метр по Германии, Франции, Польше, Литве, Украине и США. Эконом, стандарт и премиум отделка.',
    h1: 'Калькулятор стоимости ремонта',
  },
  uk: {
    title: 'Калькулятор вартості ремонту квартири — за країною та типом приміщення',
    description: 'Безкоштовний калькулятор вартості ремонту квартири або будинку онлайн. Розрахуйте витрати за квадратний метр по Великій Британії, Бельгії, Німеччині, Франції, Польщі, Литві, Україні та США.',
    h1: 'Калькулятор вартості ремонту',
  },
  fr: {
    title: 'Calculateur Coût Rénovation Maison — Prix au m² France & Belgique',
    description: 'Calculateur de coût de rénovation gratuit pour la Belgique, la France, l\'Allemagne, la Pologne et d\'autres pays. Estimez le prix au m² selon le type de pièce et la qualité des finitions.',
    h1: 'Calculateur de coût de rénovation',
  },
  lt: {
    title: 'Remonto kainos skaičiuotuvas — kaina už m² pagal šalį ir patalpą',
    description: 'Nemokamas remonto kainos skaičiuotuvas. Apskaičiuokite buto ar namo remonto kainą kvadratiniam metrui Jungtinėje Karalystėje, Belgijoje, Lietuvoje, Vokietijoje, Prancūzijoje ir kitose šalyse.',
    h1: 'Remonto kainos skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This free home renovation cost calculator estimates costs per square metre for the UK, Belgium, Germany, France, Poland, Lithuania, Ukraine and USA. Select your country, room type (bathroom, kitchen, full apartment or house), area in m², and finish quality (economy, standard or premium) — and get an instant cost estimate with a breakdown by labour, materials, plumbing and electrical work.\n\nPrices are based on 2024 market averages and include labour and materials but exclude furniture, built-in appliances, structural changes (e.g. removing walls), and architectural design fees. Costs can vary significantly by region — London and the South East are typically 40–60% above the UK national average. Use this calculator to set a realistic renovation budget before getting quotes from contractors.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is included in the renovation cost estimate?', a: 'This calculator estimates costs for surface finishing work: floor covering (laminate, engineered wood, tiles, or hardwood), wall tiling or plastering and painting, ceiling work, and — for kitchens and bathrooms — plumbing and electrical installations. It does not include furniture, built-in appliances, structural changes, demolition, or architectural design fees.' },
      { q: 'How much does a bathroom renovation cost in the UK?', a: 'A bathroom renovation in the UK typically costs £650–£2,800 per m² depending on finish quality. For a standard 5 m² bathroom, expect £3,500–£7,000 for an economy fit-out, £7,000–£14,000 for a standard renovation, and £14,000–£25,000+ for a premium refurb. London costs are 40–60% higher than the national average.' },
      { q: 'How much does a kitchen renovation cost in the UK?', a: 'A kitchen renovation in the UK costs approximately £500–£2,300 per m² for surface finishing work (flooring, tiling, plastering, and plumbing/electrical). Note that kitchen units and appliances are additional — a mid-range fitted kitchen typically adds £5,000–£15,000 on top of the labour and installation costs.' },
      { q: 'What is the difference between economy, standard, and premium finish?', a: 'Economy finish uses basic materials — laminate flooring, standard ceramic tiles, and simple emulsion paint. Standard finish includes mid-range materials like engineered wood, quality porcelain tiles, and branded sanitaryware. Premium finish uses high-end materials — natural stone, solid hardwood flooring, designer fittings, bespoke joinery, and underfloor heating as standard.' },
      { q: 'Why is the bathroom more expensive per m²?', a: 'Bathrooms require intensive plumbing and waterproofing work, wall-to-floor tiling, sanitary ware installation, and often underfloor heating. The labour complexity per square metre is much higher than for a bedroom or living room, which is why bathroom costs per m² are typically 1.5–2× higher than other rooms.' },
      { q: 'How much does a full apartment renovation cost in the UK?', a: 'A full apartment renovation in the UK costs approximately £380–£1,700 per m². For a 50 m² flat, budget £19,000–£40,000 for an economy or standard renovation, or £85,000+ for a premium fit-out. Always obtain at least 3 quotes from qualified contractors and add a 15–20% contingency budget for unforeseen issues.' },
      { q: 'Do I need planning permission for a renovation in the UK?', a: 'Most internal renovation work (replastering, flooring, bathroom/kitchen refits, painting) does not require planning permission in the UK. However, structural changes — removing load-bearing walls, loft conversions, extensions, or changes to listed buildings — typically require planning permission and/or building regulations approval. Always check with your local council before starting structural work.' },
      { q: 'How long does a renovation typically take?', a: 'A full apartment renovation takes 1–3 months depending on size and scope. A bathroom alone typically takes 2–4 weeks. Key factors affecting duration include: extent of demolition, drying times for screeds and plaster (screed: 1 day per mm thickness), and contractor availability. Always add a 20–30% time buffer — most UK renovations run over schedule.' },
      { q: 'How can I reduce renovation costs?', a: 'Key ways to reduce costs: get 3+ quotes from different contractors; supply your own materials (tiles, sanitaryware, fittings) bought online or from trade suppliers; do minor work (painting, decorating) yourself if skilled; avoid changing the design once work has started — mid-project changes are the most common cause of budget overruns; and consider renovating in autumn/winter when contractors are less busy and more competitive on price.' },
      { q: 'How do renovation costs in Belgium compare to France?', a: 'Belgian renovation costs are similar to France — typically €380–€1,500/m² for an apartment depending on quality. Brussels tends to be 20–30% higher than other Belgian cities. In France, Paris and the Île-de-France region are 30–40% above the national average. Belgium offers renovation grants (RENOLUTION programme in Brussels, RENoWALL in Wallonia) that can reduce costs for energy-efficiency upgrades.' },
      { q: 'How accurate is this renovation cost calculator?', a: 'This tool provides a rough estimate based on typical 2024 market averages. Actual costs depend on the specific scope of work, materials selected, your contractor\'s rates, accessibility, site conditions, and regional price variations. Always use this as a starting point and validate with professional quotes before committing to a project budget.' },
    ],
  },
  ru: {
    description: 'Бесплатный калькулятор стоимости ремонта квартиры или дома онлайн. Оцените затраты за квадратный метр в зависимости от страны, типа помещения (ванная, кухня, квартира целиком или дом) и класса отделки — эконом, стандарт или премиум. Цены рассчитываются с разбивкой по работам: труд, материалы, сантехника и электрика.\n\nЦены основаны на среднерыночных данных 2024 года и включают работу и материалы, но не включают мебель, встроенную технику, снос несущих стен и услуги архитектора. Стоимость ремонта существенно варьируется по регионам — Москва и Санкт-Петербург на 40–60% дороже среднего по России. Используйте калькулятор для составления реалистичного бюджета перед обращением к подрядчикам.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что включает стоимость ремонта?', a: 'Калькулятор оценивает затраты на чистовую отделку: напольные покрытия, облицовку или штукатурку и покраску стен, потолочные работы, а для кухни и ванной — сантехнику и электрику. Не включает мебель, технику, снос несущих стен и услуги архитектора.' },
      { q: 'В чём разница между эконом, стандарт и премиум отделкой?', a: 'Эконом: ламинат, стандартная плитка, обычная краска. Стандарт: инженерная доска, качественная плитка, брендовая сантехника. Премиум: натуральный камень, паркет, дизайнерская фурнитура и сантехника, изготовление по индивидуальным проектам.' },
      { q: 'Сколько стоит ремонт ванной?', a: 'Стоимость ремонта ванной комнаты — самой дорогой по м² — составляет от 30 000 ₽/м² (эконом) до 160 000 ₽/м² (премиум). Для ванной 4–5 м² бюджет с материалами: эконом от 120 000–180 000 ₽, стандарт от 300 000–400 000 ₽, премиум от 650 000 ₽ и выше. Москва и СПб на 40–60% дороже.' },
      { q: 'Сколько стоит ремонт кухни?', a: 'Ремонт кухни (без мебели и техники) обходится в 22 000–130 000 ₽/м² в зависимости от класса. На кухне 12 м²: эконом — 250 000–350 000 ₽, стандарт — 700 000–800 000 ₽. Кухонный гарнитур и техника — отдельные статьи бюджета.' },
      { q: 'Почему ванная дороже всего за м²?', a: 'Ванная требует интенсивных сантехнических работ, гидроизоляции, укладки плитки, монтажа сантехники и, как правило, тёплого пола. Трудозатраты на квадратный метр значительно выше, чем в спальне или гостиной.' },
      { q: 'Сколько времени занимает ремонт?', a: 'Полный ремонт квартиры занимает 1–3 месяца в зависимости от площади и объёма работ. Только ванная — 2–4 недели. Учитывайте время высыхания стяжки (1 день на каждый мм толщины) и штукатурки. К прогнозируемым срокам добавьте запас 20–30%.' },
      { q: 'Нужно ли разрешение на перепланировку?', a: 'Косметический ремонт (поклейка обоев, замена полов, сантехники) не требует согласования. Перепланировка с изменением несущих конструкций, переносом санузлов или объединением комнат требует согласования в БТИ и жилищной инспекции. Самовольная перепланировка грозит штрафом и предписанием восстановить исходное состояние.' },
      { q: 'Как правильно составить смету на ремонт?', a: 'Получите 3–5 предложений от разных бригад. Убедитесь, что в смете прописаны: объём работ в м², стоимость единицы, сроки и порядок оплаты. Отдельно оцените стоимость материалов — по возможности закупайте их сами. Заложите резервный бюджет 15–20% на непредвиденные расходы.' },
      { q: 'Как сэкономить на ремонте?', a: 'Самостоятельно закупайте материалы через оптовые каналы. По возможности делайте простые работы (покраску, оклейку обоями) самостоятельно. Не меняйте проект в процессе работ — это существенно увеличивает стоимость. Очень низкие цены, как правило, указывают на некачественные работы или скрытые доплаты.' },
      { q: 'Насколько точен калькулятор стоимости ремонта?', a: 'Калькулятор даёт ориентировочную оценку на основе среднерыночных данных 2024 года. Реальная стоимость зависит от конкретного объёма работ, выбранных материалов, региона и условий на объекте. Используйте расчёт как отправную точку и обязательно получайте профессиональные сметы от подрядчиков.' },
    ],
  },
  uk: {
    description: 'Безкоштовний калькулятор вартості ремонту квартири або будинку онлайн. Оцініть витрати за квадратний метр залежно від країни, типу приміщення (ванна, кухня, квартира повністю або будинок) та класу оздоблення. Ціни розраховуються з розбивкою по роботах: праця, матеріали, сантехніка та електрика.\n\nЦіни базуються на середньоринкових даних 2024 року і включають роботу та матеріали, але не включають меблі, вбудовану техніку, знесення несучих стін та послуги архітектора. Вартість ремонту суттєво варіюється за регіонами — Київ на 20–30% дорожчий за регіональні міста. Використовуйте калькулятор для складання реалістичного бюджету перед зверненням до підрядників.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що включає вартість ремонту?', a: 'Калькулятор оцінює витрати на чистове оздоблення: підлогові покриття, облицювання або штукатурку і фарбування стін, стельові роботи, а для кухні та ванної — сантехніку та електрику. Не включає меблі, техніку, знос несучих стін та послуги архітектора.' },
      { q: 'Скільки коштує ремонт ванної?', a: 'Ремонт ванної кімнати — найдорожчої за м² — коштує від 9 000 ₴/м² (економ) до 38 000 ₴/м² (преміум). Для ванної 4 м²: економ від 35 000–50 000 ₴, стандарт від 70 000–90 000 ₴, преміум від 150 000 ₴. Київ на 20–30% дорожчий за регіони.' },
      { q: 'Скільки коштує ремонт кухні в Україні?', a: 'Ремонт кухні (без меблів та техніки) обходиться в 7 500–30 000 ₴/м² залежно від класу. На кухні 12 м²: економ — 90 000–120 000 ₴, стандарт — 180 000–220 000 ₴. Кухонні меблі та техніка — окремі статті бюджету.' },
      { q: 'У чому різниця між економ, стандарт і преміум оздобленням?', a: 'Економ: ламінат, стандартна плитка, звичайна фарба. Стандарт: інженерна дошка, якісна плитка, брендова сантехніка. Преміум: натуральний камінь, паркет, дизайнерська фурнітура та сантехніка.' },
      { q: 'Чому ванна коштує найдорожче за м²?', a: 'Ванна потребує інтенсивних сантехнічних робіт, гідроізоляції, укладання плитки, монтажу сантехніки та, як правило, теплої підлоги. Трудовитрати на квадратний метр значно вищі, ніж у спальні чи вітальні.' },
      { q: 'Скільки часу займає ремонт квартири?', a: 'Повний ремонт квартири займає 1–3 місяці залежно від площі та обсягу робіт. Лише ванна — 2–4 тижні. Враховуйте час висихання стяжки (1 день на мм товщини) та штукатурки. До прогнозованих термінів додайте запас 20–30%.' },
      { q: 'Чи потрібен дозвіл на перепланування?', a: 'Косметичний ремонт (шпалери, підлога, сантехніка без переносу) не потребує погодження. Перепланування з втручанням у несучі конструкції, перенесенням санвузла або об\'єднанням кімнат потребує погодження в БТІ та ДАБІ. Самовільне перепланування загрожує штрафом та вимогою відновити первісний стан.' },
      { q: 'Як скласти правильний кошторис на ремонт?', a: 'Отримайте 3–5 пропозицій від різних бригад. Переконайтеся, що в кошторисі прописані: обсяг робіт в м², вартість одиниці, строки та порядок оплати. Окремо оцініть вартість матеріалів — по можливості закуповуйте їх самостійно. Закладіть резервний бюджет 15–20% на непередбачені витрати.' },
      { q: 'Як зекономити на ремонті?', a: 'Отримайте мінімум 3 пропозиції від різних підрядників. Самостійно закуповуйте матеріали через оптових постачальників. Якщо можливо, виконуйте прості роботи (фарбування) самостійно. Не змінюйте проект у процесі робіт — це суттєво збільшує вартість. Дуже низькі ціни, як правило, свідчать про неякісні роботи.' },
      { q: 'Наскільки точний цей калькулятор вартості ремонту?', a: 'Калькулятор дає орієнтовну оцінку на основі середньоринкових даних 2024 року. Реальна вартість залежить від конкретного обсягу робіт, обраних матеріалів, регіону та умов на об\'єкті. Використовуйте розрахунок як відправну точку та обов\'язково отримуйте професійні кошториси від підрядників.' },
    ],
  },
  fr: {
    description: 'Ce calculateur de coût de rénovation gratuit estime le prix au m² pour la Belgique, la France, l\'Allemagne, la Pologne, la Lituanie, l\'Ukraine et les États-Unis. Sélectionnez votre pays, le type de pièce (salle de bain, cuisine, appartement entier ou maison), la surface et la qualité des finitions — et obtenez une estimation instantanée avec une répartition par poste de travaux.\n\nLes prix sont basés sur les moyennes du marché 2024 et incluent la main-d\'œuvre et les matériaux, mais excluent le mobilier, l\'électroménager, les travaux structurels et les honoraires d\'architecte. En Belgique, les primes RENOLUTION (Bruxelles) et RENoWALL (Wallonie) peuvent réduire le coût des travaux d\'isolation et d\'efficacité énergétique. Utilisez cet outil pour établir votre budget avant de demander des devis.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qui est inclus dans les coûts de rénovation ?', a: 'Ce calculateur estime les travaux de finition de surface : revêtements de sol, carrelage ou plâtrage et peinture des murs, travaux de plafond, et pour les cuisines et salles de bain — installations de plomberie et d\'électricité. Il n\'inclut pas les meubles, l\'électroménager, les travaux structurels ni les honoraires d\'architecte.' },
      { q: 'Combien coûte une rénovation de salle de bain en Belgique ?', a: 'En Belgique, la rénovation d\'une salle de bain coûte typiquement €650–€2 400/m² selon la qualité. Pour une salle de bain de 5 m² : comptez €3 000–€6 500 en économique, €6 500–€13 000 en standard et €12 000–€24 000 en premium. Bruxelles est 20–30% plus chère que les autres régions.' },
      { q: 'Combien coûte une rénovation de cuisine en France ?', a: 'En France, la rénovation d\'une cuisine (hors meubles et électroménager) coûte environ €500–€2 000/m². Pour une cuisine de 12 m² : €6 000–€12 000 en économique, €12 000–€18 000 en standard, et €24 000+ en premium. Paris et l\'Île-de-France sont 30–40% plus chers que la province.' },
      { q: 'Quelle est la différence entre finition économique, standard et premium ?', a: 'Économique : parquet stratifié, carrelage basique, peinture simple. Standard : parquet contrecollé, carrelage de qualité, robinetterie de marque. Premium : pierre naturelle, parquet massif, robinetterie design, menuiserie sur mesure.' },
      { q: 'Pourquoi la salle de bain coûte-t-elle plus cher au m² ?', a: 'La salle de bain nécessite une plomberie intensive, une étanchéité, une pose de carrelage complexe, des équipements sanitaires et souvent un chauffage par le sol. La complexité des travaux au mètre carré est 1,5 à 2× plus élevée que pour une chambre ou un salon.' },
      { q: 'Quelles sont les primes rénovation en Belgique ?', a: 'En Belgique, plusieurs primes existent selon la région : à Bruxelles, le programme RENOLUTION subventionne isolation, ventilation et chauffage. En Wallonie, RENoWALL propose des primes énergie. En Flandre, des primes mur, toit et vitrage sont disponibles. Ces aides peuvent couvrir 20–40% du coût des travaux d\'isolation ou de chauffage.' },
      { q: 'Faut-il un permis de construire pour rénover en France ?', a: 'La plupart des travaux intérieurs (peinture, carrelage, plomberie, remplacement cuisine/salle de bain) ne nécessitent pas de permis. Cependant, les modifications de structure porteuse, l\'agrandissement de surface ou les changements d\'aspect extérieur en zone protégée peuvent nécessiter une déclaration préalable ou un permis de construire. Vérifiez toujours auprès de votre mairie.' },
      { q: 'Combien de temps dure une rénovation ?', a: 'Une rénovation complète d\'appartement prend 1 à 3 mois selon la surface et l\'envergure. Une salle de bain seule prend généralement 2 à 4 semaines. La séche de la chape (1 jour par mm d\'épaisseur) et du plâtre allonge souvent les délais. Ajoutez toujours un délai tampon de 20 à 30% aux estimations.' },
      { q: 'Comment réduire les coûts de rénovation ?', a: 'Obtenez au moins 3 devis de différents artisans. Achetez vous-même les matériaux (carrelage, sanitaire, robinetterie) chez des grossistes ou en ligne. Évitez de modifier le projet en cours de chantier — c\'est la première cause de dépassement de budget. Évitez les devis anormalement bas — ils indiquent souvent des malfaçons ou des coûts cachés.' },
      { q: 'Quelle est la précision de ce calculateur de rénovation ?', a: 'Cet outil fournit une estimation approximative basée sur les prix moyens du marché 2024. Les coûts réels dépendent du détail des travaux, des matériaux choisis, de l\'artisan, des conditions du chantier et de la région. Utilisez ce calcul comme point de départ avant de demander des devis professionnels.' },
    ],
  },
  lt: {
    description: 'Nemokamas remonto kainos skaičiuotuvas įvertina kainą kvadratiniam metrui Jungtinėje Karalystėje, Belgijoje, Lietuvoje, Vokietijoje, Prancūzijoje, Lenkijoje, Ukrainoje ir JAV. Pasirinkite šalį, patalpos tipą (vonios kambarys, virtuvė, visas butas ar namas), plotą ir apdailos kokybę — ir gaukite momentinį įvertinimą su darbo, medžiagų ir santechnikos kaštų struktūra.\n\nKainos grindžiamos 2024 m. rinkos vidurkiais ir apima darbą bei medžiagas, tačiau neapima baldų, buitinės technikos, konstrukcinių pakeitimų ir architekto honorarų. Kainos gali labai skirtis priklausomai nuo regiono — Vilnius yra 10–20% brangesnis už kitus Lietuvos miestus. Naudokite skaičiuotuvą realiam biudžetui sudaryti prieš kreipiantis į rangovus.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas įeina į remonto kainą?', a: 'Skaičiuotuvas įvertina paviršiaus apdailos darbus: grindų dangas, sienų plytelių klojimą arba tinkavimą ir dažymą, lubų darbus, o virtuvei ir voniai – santechnikos ir elektros įrangą. Neapima baldų, buitinės technikos, konstrukcinių pakeitimų ir architekto honorarų.' },
      { q: 'Kiek kainuoja vonios kambario remontas Lietuvoje?', a: 'Vonios kambario remontas Lietuvoje kainuoja apie €500–€2 000/m² priklausomai nuo apdailos kokybės. 4 m² voniai: ekonominė apdaila nuo €2 000–€3 000, standartinė nuo €4 000–€6 000, premium nuo €8 000. Vilnius yra 10–20% brangesnis už kitus miestus.' },
      { q: 'Kiek kainuoja virtuvės remontas?', a: 'Virtuvės remontas (be baldų ir buitinės technikos) kainuoja apie €400–€1 600/m². 12 m² virtuvei: ekonominė apdaila nuo €5 000–€7 000, standartinė nuo €10 000–€14 000. Virtuvės baldai ir technika – atskiros biudžeto eilutės.' },
      { q: 'Koks skirtumas tarp ekonominės, standartinės ir premium apdailos?', a: 'Ekonominė: laminatas, standartinės plytelės, paprasti dažai. Standartinė: inžinerinė lenta, kokybiškos plytelės, firminiai sanitariniai reikmenys. Premium: natūralus akmuo, ąžuolo parketlentė, dizainerio armatūra ir santechnika.' },
      { q: 'Kodėl vonios kambarys brangesnis už m²?', a: 'Vonios kambarys reikalauja intensyvių santechnikos darbų, hidroizoliacijos, plytelių klojimo, sanitarinių reikmenų montavimo ir dažnai – šiltų grindų. Darbo sudėtingumas kvadratiniam metrui yra 1,5–2× didesnis nei miegamajame ar svetainėje.' },
      { q: 'Ar reikia leidimo remontui Lietuvoje?', a: 'Kosmetiniam remontui (dažymas, grindys, santechnika be perkėlimo) leidimas nereikalingas. Kapitaliniam remontui su konstrukciniais pakeitimais, perkant ar rekonstruojant pastato elementus, reikalingas statybos leidimas. Prieš pradedant didesnį remontą, pasitarkite su savivaldybės statybos inspekcija.' },
      { q: 'Kiek laiko užtrunka remontas?', a: 'Visas buto remontas trunka 1–3 mėnesius, priklausomai nuo ploto ir apimties. Tik vonios kambarys – paprastai 2–4 savaites. Įskaičiuokite grindinių dangų džiūvimo laiką (1 diena 1 mm storiui). Visada pridėkite 20–30% laiko atsargą prie numatytų terminų.' },
      { q: 'Kaip sumažinti remonto išlaidas?', a: 'Gaukite bent 3 pasiūlymus iš skirtingų rangovų. Medžiagas pirkite patys iš didmeninių tiekėjų ar internetinių parduotuvių. Venkite keisti projektą remonto metu – tai žymiai padidina kainą. Labai žemos kainos dažnai rodo nekokybišką darbą arba paslėptas papildomas išlaidas.' },
      { q: 'Kaip sudaryti remonto sąmatą?', a: 'Sąmatoje turi būti: darbų apimtis m², vieneto kaina, terminai ir apmokėjimo tvarka. Atskirai įvertinkite medžiagų kainą. Palikite 15–20% rezervinį biudžetą nenumatytoms išlaidoms. Kreipkitės į kelis rangovus ir palyginkite detalias sąmatas — ne tik bendrą sumą.' },
      { q: 'Kiek tikslus šis remonto kainos skaičiuotuvas?', a: 'Skaičiuotuvas pateikia apytikslį įvertinimą pagal 2024 m. rinkos vidurkius. Tikrosios kainos priklauso nuo darbų apimties, medžiagų, rangovo, regiono ir objekto sąlygų. Naudokite skaičiavimą kaip pradžios tašką ir prieš pradedant projektą gauti profesionalias sąmatas.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/renovation') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RenovationPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/renovation`,
    applicationCategory: 'UtilitiesApplication',
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
        <RenovationCalculator locale={locale} />
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
