import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PartyFoodCalculator from './PartyFoodCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/travel-budget', label: 'Travel Budget Calculator' },
    { href: '/calculator/calories', label: 'Calorie Calculator' },
    { href: '/calculator/tip', label: 'Tip Calculator' },
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/discount', label: 'Discount Calculator' },
  ],
  ru: [
    { href: '/calculator/travel-budget', label: 'Калькулятор бюджета поездки' },
    { href: '/calculator/calories', label: 'Калькулятор калорий' },
    { href: '/calculator/tip', label: 'Калькулятор чаевых' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/calculator/discount', label: 'Калькулятор скидок' },
  ],
  uk: [
    { href: '/calculator/travel-budget', label: 'Калькулятор бюджету поїздки' },
    { href: '/calculator/calories', label: 'Калькулятор калорій' },
    { href: '/calculator/tip', label: 'Калькулятор чайових' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/calculator/discount', label: 'Калькулятор знижок' },
  ],
  fr: [
    { href: '/calculator/travel-budget', label: 'Calculatrice Budget Voyage' },
    { href: '/calculator/calories', label: 'Calculatrice Calories' },
    { href: '/calculator/tip', label: 'Calculatrice Pourboire' },
    { href: '/calculator/savings-goal', label: 'Calculatrice Objectif Épargne' },
    { href: '/calculator/discount', label: 'Calculatrice Remise' },
  ],
  lt: [
    { href: '/calculator/travel-budget', label: 'Kelionės biudžeto skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' },
    { href: '/calculator/tip', label: 'Arbatpinigių skaičiuotuvas' },
    { href: '/calculator/savings-goal', label: 'Taupymo tikslo skaičiuotuvas' },
    { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Party Food Calculator — BBQ & Buffet Shopping List',
    description: 'Free party food calculator for BBQ, buffet, and cocktail parties. Get a complete shopping list with quantities for meat, sides, drinks, and desserts based on guest count and duration.',
    h1: 'Party Food Calculator',
    subtitle: 'Get a complete shopping list with quantities for meat, drinks, sides, and desserts based on guest count.',
  },
  ru: {
    title: 'Калькулятор еды на вечеринку — барбекю, фуршет, банкет',
    description: 'Бесплатный калькулятор продуктов для вечеринки. Получите список покупок с количествами для мяса, гарниров, напитков и десертов на барбекю, фуршет или банкет.',
    h1: 'Калькулятор еды на вечеринку',
    subtitle: 'Получите готовый список покупок с количеством мяса, напитков, гарниров и десертов по числу гостей.',
  },
  uk: {
    title: 'Калькулятор їжі для вечірки — барбекю, фуршет, банкет',
    description: 'Безкоштовний калькулятор продуктів для вечірки. Отримайте список покупок з кількостями для м\'яса, гарнірів, напоїв і десертів на барбекю, фуршет або банкет.',
    h1: 'Калькулятор їжі для вечірки',
    subtitle: 'Отримайте готовий список покупок із кількістю м\'яса, напоїв, гарнірів і десертів за кількістю гостей.',
  },
  fr: {
    title: 'Calculatrice Buffet & Barbecue — Liste de Courses',
    description: 'Calculatrice de nourriture pour fêtes gratuite. Obtenez une liste de courses complète avec les quantités pour viandes, accompagnements, boissons et desserts selon le nombre d\'invités.',
    h1: 'Calculatrice Buffet & Barbecue',
    subtitle: 'Obtenez une liste de courses complète avec les quantités de viandes, boissons et desserts selon vos invités.',
  },
  lt: {
    title: 'Vakarėlio Maisto Skaičiuotuvas — Kepsninė ir Bufetas',
    description: 'Nemokamas vakarėlio maisto skaičiuotuvas kepsninei, bufetui ir kokteilių vakarėliui. Gaukite visą apsipirkimo sąrašą su mėsos, garnyro, gėrimų ir desertų kiekiais pagal svečių skaičių.',
    h1: 'Vakarėlio Maisto Skaičiuotuvas',
    subtitle: 'Gaukite pilną pirkinių sąrašą su mėsos, gėrimų, garnyrų ir desertų kiekiais pagal svečių skaičių.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our party food calculator helps you create a complete shopping list for BBQ/grill parties, buffet dinners, and cocktail events. Enter the number of guests, choose the event format, and select the duration — the calculator instantly generates quantity estimates for all food categories: meat and protein, side dishes, drinks, desserts, and bread. Quantities automatically scale with longer events.\n\nProper food planning for parties prevents two common problems: running out of food (leaving guests hungry) and massive waste (expensive leftovers). As a rule, it\'s better to have 10–15% extra rather than running short. For BBQ events, plan 350g of raw meat per person for a standard party — raw meat loses 25–30% weight during cooking. For buffets, 250g of main protein per person is typical. For cocktail parties, focus on variety over quantity: 6–8 canapés per person per hour.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much meat per person for a BBQ?', a: 'Plan 300–400g of raw meat per person for a standard BBQ (2–3 hours). Remember that raw meat shrinks by 25–30% during cooking, so 350g raw yields about 250g cooked. For a 20-person party: 7kg raw meat. For longer events (4+ hours), increase to 450–500g per person.' },
      { q: 'How much should I buy for drinks at a party?', a: 'General guideline: 500ml water + 1.5–2 bottles of beer (or 0.35L wine) + 0.5L soft drinks per person for a 3-hour outdoor party. Increase by 30–50% for hot weather, summer events, or longer duration. Always have more non-alcoholic options than you expect to need — typically 40% of guests prefer them.' },
      { q: 'How much food for a cocktail party vs dinner party?', a: 'Cocktail party (standing, no seated meal): 6–8 canapés or finger food pieces per person per hour. Dinner/buffet (seated or self-service meal): 250–350g protein + 200g sides + 150g salad per person. A cocktail party needs roughly 40% less food per person than a full buffet.' },
      { q: 'How do I calculate food for a party of 50 vs 100 people?', a: 'Scale quantities linearly: if 20 people need 7kg meat, 50 people need 17.5kg, 100 people need 35kg. However, for very large events (100+), the "buffet effect" means guests self-regulate — you can reduce quantities by 5–10% per person compared to small gatherings, as people take smaller portions from larger spreads.' },
      { q: 'What is the best way to keep food warm at a BBQ?', a: 'For BBQ: cook in batches and keep warm in covered foil trays in a 60–80°C oven. Chafing dishes (with fuel cells) keep food at safe serving temperatures (>60°C) for 2–3 hours. Thermal bags work well for transporting hot items. Never leave meat at room temperature (20–40°C) for more than 2 hours — bacterial risk.' },
      { q: 'How much food for a children\'s party?', a: 'Children (ages 6–12) eat 50–60% of adult portions. For a 20-child party: plan as if for 10–12 adults. Focus on: finger foods, pizza slices, sandwiches, fruit, and juice rather than formal adult party food. Add 1–2 cakes/desserts per 20 children for celebrations. Allergy awareness is critical — always ask parents in advance.' },
      { q: 'What should I serve for a vegetarian or vegan party?', a: 'For mixed groups: plan 25–30% of food quantities as vegetarian/vegan if you don\'t know dietary preferences in advance. Replace meat with: grilled vegetables (skewers, corn, peppers), veggie burgers, halloumi (vegetarian), tofu (vegan), hummus, falafel. Clearly label all dishes to prevent cross-contamination concerns.' },
      { q: 'How far in advance can I prepare party food?', a: 'Preparation timelines: marinated meats (24–48h fridge); cold salads without dressing (24h fridge); cooked dishes like pasta salads (24h fridge, add dressing just before serving); desserts/cakes (1–2 days); drinks stocked and chilled (24h). Buy perishables (fresh meat, seafood) the day before or morning of the event.' },
      { q: 'How much ice do I need for a party?', a: 'Plan 0.5–1 kg of ice per person for cooling drinks. For a 50-person outdoor summer party: 25–50 kg of ice (about 3–5 standard 10kg bags). Use a ratio of 60% ice to 40% drinks in coolers. For longer events and hot weather, increase ice by 50%. Alternatively, use large drinks tubs with ice water.' },
      { q: 'What are the biggest food safety mistakes at parties?', a: 'Common dangers: leaving meat at room temperature (>2 hours creates bacterial risk); cross-contamination from raw to cooked meat surfaces; insufficient cooking (always use meat thermometer — beef/pork 63°C, chicken 74°C); preparing high-risk foods (egg-based salads, shellfish) too early; not labelling allergens.' },
      { q: 'Should I hire a caterer or DIY for large parties?', a: 'DIY works well up to 30–40 guests if you have help and equipment. Above 40–50 people, consider catering: professional caterers typically cost $30–80/person for buffet service but eliminate logistics stress, ensure food safety compliance, and handle setup/cleanup. For corporate events, 50+ guests, or formal dinners, catering is usually the better value considering total time invested.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор еды для вечеринки помогает составить полный список покупок для барбекю, фуршета или коктейльного мероприятия. Введите количество гостей, выберите формат и продолжительность — калькулятор мгновенно генерирует нормы для всех категорий: мясо, гарниры, напитки, десерты и хлеб. Количества автоматически масштабируются для более длительных мероприятий.\n\nПравильное планирование питания для вечеринки предотвращает две типичные проблемы: нехватку еды и огромные остатки. Стандарт для барбекю: 350 г сырого мяса на человека — оно теряет 25–30% веса при приготовлении. Для фуршета: 250 г основного белка. Для коктейльной вечеринки: 6–8 канапе на человека в час.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько мяса на человека для барбекю?', a: 'Планируйте 300–400 г сырого мяса на человека для стандартного барбекю (2–3 часа). Сырое мясо при приготовлении теряет 25–30%: 350 г сырого = ~250 г готового. На 20 человек: ~7 кг сырого мяса. Для более длительных мероприятий (4+ часа) — 450–500 г.' },
      { q: 'Сколько напитков покупать на вечеринку?', a: 'Ориентир на 3-часовое мероприятие на открытом воздухе: 500 мл воды + 1,5–2 бутылки пива (или 350 мл вина) + 500 мл безалкогольных на человека. В жару или при большей длительности увеличивайте на 30–50%. Всегда готовьте больше безалкогольных, чем ожидаете — ~40% гостей предпочитают их.' },
      { q: 'Сколько еды для коктейльной вечеринки против банкета?', a: 'Коктейль (стоячий, без сидячего ужина): 6–8 канапе на человека в час. Банкет/фуршет: 250–350 г белка + 200 г гарниров + 150 г салатов на человека. Коктейльная вечеринка требует примерно на 40% меньше еды, чем полноценный фуршет.' },
      { q: 'Как рассчитать еду для 50 и 100 человек?', a: 'Масштабируйте пропорционально: если на 20 человек 7 кг мяса, то на 50 — 17,5 кг, на 100 — 35 кг. Для очень большого числа гостей (100+) «буфетный эффект» позволяет снизить нормы на 5–10%: люди берут меньше порций из большого выбора блюд.' },
      { q: 'Как хранить еду в тепле на барбекю?', a: 'Готовьте партиями и держите в фольге в духовке при 60–80°C. Мармиты поддерживают температуру >60°C в течение 2–3 часов. Никогда не оставляйте мясо при комнатной температуре более 2 часов — риск размножения бактерий.' },
      { q: 'Сколько еды для детского праздника?', a: 'Дети 6–12 лет едят 50–60% взрослой порции. На 20 детей планируйте как на 10–12 взрослых. Акцент на: закусках, пицце, бутербродах, фруктах и соках. Обязательно заранее узнавайте об аллергиях.' },
      { q: 'Как планировать еду для вегетарианцев?', a: 'Для смешанных групп без данных о предпочтениях: планируйте 25–30% вегетарианской/веганской еды. Замените мясо: овощами-гриль, вегетарианскими бургерами, халлуми, хумусом, фалафелем. Подписывайте все блюда.' },
      { q: 'Сколько заранее готовить еду для вечеринки?', a: 'Тайминг: маринованное мясо — за 24–48 ч (в холодильнике); холодные салаты без заправки — за 24 ч; готовые блюда (паста-салаты) — за 24 ч; десерты — за 1–2 дня. Скоропортящиеся продукты (мясо, морепродукты) — за 1 день или утром.' },
      { q: 'Сколько льда нужно на вечеринку?', a: 'Планируйте 0,5–1 кг льда на человека для охлаждения напитков. На 50 человек летом: 25–50 кг льда (3–5 стандартных пакетов по 10 кг). Соотношение в холодильнике: 60% льда, 40% напитков.' },
      { q: 'Какие ошибки безопасности чаще всего допускают на вечеринках?', a: 'Типичные ошибки: мясо при комнатной температуре >2 часов; перекрёстное заражение сырого и готового мяса; недожаривание (используйте термометр: говядина 63°C, курица 74°C); слишком ранняя подготовка блюд с яйцами/морепродуктами.' },
      { q: 'Заказывать кейтеринг или готовить самому?', a: 'До 30–40 гостей DIY работает отлично при наличии помощников. Более 50 человек — стоит рассмотреть кейтеринг ($30–80/чел. за фуршет). Профессионалы берут на себя логистику, соблюдение пищевой безопасности, сервировку и уборку.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор їжі для вечірки допомагає скласти повний список покупок для барбекю, фуршету або коктейльного заходу. Введіть кількість гостей, оберіть формат і тривалість — калькулятор миттєво генерує норми для всіх категорій: м\'ясо, гарніри, напої, десерти і хліб.\n\nПравильне планування харчування для вечірки запобігає двом типовим проблемам: нестачі їжі та величезним залишкам. Стандарт для барбекю: 350 г сирого м\'яса на людину — воно втрачає 25–30% ваги при приготуванні. Для фуршету: 250 г основного білка. Для коктейльної вечірки: 6–8 канапе на людину на годину.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки м\'яса на людину для барбекю?', a: 'Плануйте 300–400 г сирого м\'яса на людину для стандартного барбекю (2–3 години). Сире м\'ясо при приготуванні втрачає 25–30%: 350 г сирого = ~250 г готового. На 20 осіб: ~7 кг сирого м\'яса.' },
      { q: 'Скільки напоїв купувати на вечірку?', a: 'Орієнтир на 3-годинний захід: 500 мл води + 1,5–2 пляшки пива (або 350 мл вина) + 500 мл безалкогольних на людину. У спеку або при більшій тривалості збільшуйте на 30–50%.' },
      { q: 'Скільки їжі для коктейльної вечірки проти банкету?', a: 'Коктейль (стоячий): 6–8 канапе на людину на годину. Банкет/фуршет: 250–350 г білка + 200 г гарнірів + 150 г салатів на людину. Коктейльна вечірка потребує приблизно на 40% менше їжі.' },
      { q: 'Як розрахувати їжу для 50 і 100 людей?', a: 'Масштабуйте пропорційно: якщо на 20 осіб 7 кг м\'яса, то на 50 — 17,5 кг, на 100 — 35 кг. Для дуже великих заходів (100+) можна знизити норми на 5–10% завдяки «буфетному ефекту».' },
      { q: 'Як зберігати їжу теплою на барбекю?', a: 'Готуйте партіями і тримайте у фользі в духовці при 60–80°C. Ніколи не залишайте м\'ясо при кімнатній температурі більше 2 годин — ризик розмноження бактерій.' },
      { q: 'Скільки їжі для дитячого свята?', a: 'Діти 6–12 років їдять 50–60% дорослої порції. На 20 дітей плануйте як на 10–12 дорослих. Акцент на: закусках, піці, бутербродах, фруктах і соках. Обов\'язково заздалегідь дізнавайтесь про алергії.' },
      { q: 'Як планувати їжу для вегетаріанців?', a: 'Для змішаних груп без даних про вподобання: плануйте 25–30% вегетаріанської/веганської їжі. Замініть м\'ясо: овочами-гриль, вегетаріанськими бургерами, халумі, хумусом, фалафелем. Підписуйте всі страви.' },
      { q: 'Скільки завчасно готувати їжу для вечірки?', a: 'Тайминг: мариноване м\'ясо — за 24–48 год; холодні салати без заправки — за 24 год; готові страви (паста-салати) — за 24 год; десерти — за 1–2 дні. Швидкопсувні продукти — за 1 день або зранку.' },
      { q: 'Скільки льоду потрібно на вечірку?', a: 'Плануйте 0,5–1 кг льоду на людину для охолодження напоїв. На 50 осіб влітку: 25–50 кг льоду. Співвідношення у холодильнику: 60% льоду, 40% напоїв.' },
      { q: 'Які помилки безпеки найчастіше допускають на вечірках?', a: 'Типові помилки: м\'ясо при кімнатній температурі >2 годин; перехресне забруднення сирого і готового м\'яса; недосмаження (використовуйте термометр: яловичина 63°C, курятина 74°C).' },
      { q: 'Замовляти кейтеринг чи готувати самому?', a: 'До 30–40 гостей DIY добре працює при наявності помічників. Більше 50 осіб — варто розглянути кейтеринг. Професіонали беруть на себе логістику, дотримання харчової безпеки, сервірування і прибирання.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de nourriture pour fêtes vous aide à créer une liste de courses complète pour un barbecue, un buffet ou un cocktail. Entrez le nombre d\'invités, choisissez le format et la durée — la calculatrice génère instantanément des estimations de quantités pour toutes les catégories alimentaires.\n\nUne bonne planification alimentaire évite deux problèmes courants : manquer de nourriture et gaspiller. Règle générale pour un BBQ : 350 g de viande crue par personne — la viande perd 25–30 % de poids à la cuisson. Pour un buffet : 250 g de protéines par personne. Pour un cocktail : 6–8 canapés par personne par heure.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle quantité de viande par personne pour un BBQ ?', a: 'Prévoyez 300–400 g de viande crue par personne pour un BBQ standard (2–3 h). La viande crue perd 25–30 % à la cuisson : 350 g cru ≈ 250 g cuit. Pour 20 personnes : 7 kg de viande crue.' },
      { q: 'Quelle quantité de boissons pour une fête ?', a: 'Pour une fête de 3 h en extérieur : 500 ml d\'eau + 1,5–2 bières (ou 350 ml de vin) + 500 ml de boissons sans alcool par personne. En cas de chaleur ou d\'événement plus long, augmentez de 30–50 %.' },
      { q: 'Quelle quantité pour un cocktail vs un buffet ?', a: 'Cocktail debout : 6–8 canapés par personne par heure. Buffet/dîner : 250–350 g de protéines + 200 g d\'accompagnements + 150 g de salade par personne. Un cocktail nécessite environ 40 % de nourriture en moins qu\'un buffet complet.' },
      { q: 'Comment calculer les quantités pour 50 ou 100 personnes ?', a: 'Multipliez proportionnellement : si 20 personnes nécessitent 7 kg de viande, 50 personnes en nécessitent 17,5 kg, et 100 personnes 35 kg. Pour les très grands événements (100+), l\'effet buffet permet de réduire les quantités de 5–10 % par personne.' },
      { q: 'Comment maintenir la nourriture au chaud au BBQ ?', a: 'Cuisez par lots et gardez au chaud dans des barquettes en aluminium couverts dans un four à 60–80 °C. Les chafing dishes maintiennent une température de service sûre (>60 °C). Ne laissez jamais de viande à température ambiante plus de 2 heures.' },
      { q: 'Quelle quantité pour un anniversaire d\'enfants ?', a: 'Les enfants (6–12 ans) mangent 50–60 % d\'une portion adulte. Pour 20 enfants, planifiez comme pour 10–12 adultes. Privilégiez : finger food, pizza, sandwichs, fruits, jus de fruits. Renseignez-vous toujours sur les allergies à l\'avance.' },
      { q: 'Comment planifier pour les végétariens et végans ?', a: 'Pour les groupes mixtes sans connaître les préférences : prévoyez 25–30 % d\'aliments végétariens/végans. Remplacez la viande par : légumes grillés, burgers végétariens, halloumi, houmous, falafels. Étiquetez clairement tous les plats.' },
      { q: 'Combien de temps à l\'avance préparer les aliments ?', a: 'Délais de préparation : viandes marinées (24–48 h au réfrigérateur) ; salades froides sans vinaigrette (24 h) ; plats cuisinés (24 h) ; desserts (1–2 jours). Achetez les produits périssables la veille ou le matin de l\'événement.' },
      { q: 'Quelle quantité de glace pour une fête ?', a: 'Prévoyez 0,5–1 kg de glace par personne. Pour 50 personnes en été : 25–50 kg de glace. Ratio dans le bac : 60 % de glace, 40 % de boissons.' },
      { q: 'Quelles sont les erreurs de sécurité alimentaire les plus fréquentes ?', a: 'Risques courants : viande laissée à température ambiante (>2 h = risque bactérien) ; contamination croisée cru/cuit ; cuisson insuffisante (utilisez un thermomètre : bœuf 63 °C, poulet 74 °C) ; étiquetage des allergènes insuffisant.' },
      { q: 'Faire appel à un traiteur ou cuisiner soi-même ?', a: 'Le DIY fonctionne bien jusqu\'à 30–40 invités avec de l\'aide. Au-delà de 50, un traiteur (30–80 €/personne pour un buffet) élimine le stress logistique et garantit la sécurité alimentaire.' },
    ],
  },
  lt: {
    description: 'Mūsų vakarėlio maisto skaičiuotuvas padeda sukurti išsamų apsipirkimo sąrašą kepsninei, bufetui ar kokteilių renginiui. Įveskite svečių skaičių, pasirinkite renginio formatą ir trukmę — skaičiuotuvas akimirksniu sugeneruoja kiekių įvertinimus visoms maisto kategorijoms: mėsa, garnyrai, gėrimai, desertai ir duona.\n\nTinkamas maisto planavimas šventėms išvengia dviejų dažnų problemų: maisto trūkumo ir didelių atliekų. Standartinė taisyklė kepsninei: 350 g žalios mėsos vienam asmeniui — žalia mėsa kepant netenka 25–30% svorio. Bufetui: 250 g pagrindinio baltymo. Kokteilių vakarėliui: 6–8 kanapė vienam asmeniui per valandą.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kiek mėsos vienam asmeniui kepsninei?', a: 'Planuokite 300–400 g žalios mėsos vienam asmeniui standartinei kepsninei (2–3 val.). Žalia mėsa kepant netenka 25–30%: 350 g žalios ≈ 250 g iškeptos. 20 žmonių: ~7 kg žalios mėsos.' },
      { q: 'Kiek gėrimų reikia vakarėliui?', a: '3 valandų lauko renginiui: 500 ml vandens + 1,5–2 alaus buteliai (arba 350 ml vyno) + 500 ml nealkoholinių gėrimų vienam asmeniui. Karštą orą ar ilgesniam renginiui padidinkite 30–50%.' },
      { q: 'Kiek maisto kokteilių vakarėliui vs bufetui?', a: 'Kokteilių vakarėlis: 6–8 kanapė vienam asmeniui per valandą. Bufetas: 250–350 g baltymo + 200 g garnyrų + 150 g salotų vienam asmeniui. Kokteilių vakarėliui reikia maždaug 40% mažiau maisto.' },
      { q: 'Kaip skaičiuoti maistą 50 ir 100 žmonių?', a: 'Proporcingai padauginkite: jei 20 žmonių reikia 7 kg mėsos, tai 50 žmonių — 17,5 kg, 100 žmonių — 35 kg. Labai dideliems renginiams (100+) galima sumažinti normas 5–10% dėl „bufeto efekto".' },
      { q: 'Kaip palaikyti maistą karštą kepsninėje?', a: 'Kepkite partijomis ir laikykite šiltą folijos indiuose orkaitėje 60–80°C temperatūroje. Niekada nepalikite mėsos kambario temperatūroje ilgiau nei 2 valandas — bakterijų rizika.' },
      { q: 'Kiek maisto vaikų gimtadienio šventei?', a: 'Vaikai (6–12 m.) valgo 50–60% suaugusiųjų porcijos. 20 vaikų planuokite kaip 10–12 suaugusiųjų. Prioritetas: užkandžiai, pica, sumuštiniai, vaisiai ir sultys. Visada iš anksto klauskite apie alergijas.' },
      { q: 'Kaip planuoti vegetarams?', a: 'Mišrioms grupėms be nurodytų pageidavimų: planuokite 25–30% vegetariško/veganiško maisto. Mėsą pakeiskite: griljuotomis daržovėmis, vegetariškais burgeriais, halumi, humu, falafeliu. Aiškiai paženklinkite visus patiekalus.' },
      { q: 'Kiek iš anksto ruošti vakarėlio maistą?', a: 'Paruošimo laikas: marinuota mėsa — 24–48 val. šaldytuve; šaltos salotos be padažo — 24 val.; desertai — 1–2 dienos. Greitai gendančius produktus pirkite dieną prieš arba renginio rytą.' },
      { q: 'Kiek ledo reikia vakarėliui?', a: 'Planuokite 0,5–1 kg ledo vienam asmeniui gėrimams vėsinti. 50 žmonių vasarą: 25–50 kg ledo. Santykis dėžėje: 60% ledo, 40% gėrimų.' },
      { q: 'Kokios dažniausios maisto saugos klaidos vakarėliuose?', a: 'Dažni pavojai: mėsa kambario temperatūroje >2 val.; kryžminė tarša tarp žalios ir iškeptos mėsos; nepakankamas kepimas (naudokite termometrą: jautiena 63°C, vištiena 74°C).' },
      { q: 'Samdyti kateringą ar gaminti patiems?', a: 'Iki 30–40 svečių savarankas puikiai tinka su pagalbininkais. Daugiau nei 50 žmonių — verta svarstyti kateringą (30–80 €/asmeniui bufetui). Profesionalai rūpinasi logistika, maisto sauga ir tvarkymu.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/party-food', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PartyFoodPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/party-food`,
    applicationCategory: 'UtilityApplication',
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
        <PartyFoodCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
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
