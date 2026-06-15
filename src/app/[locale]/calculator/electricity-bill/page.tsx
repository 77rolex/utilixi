import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ElectricityBillCalculator from './ElectricityBillCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/fuel-cost', label: 'Fuel Cost Calculator' },
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
    { href: '/calculator/percentage', label: 'Percentage Calculator' },
    { href: '/calculator/discount', label: 'Discount Calculator' },
  ],
  ru: [
    { href: '/calculator/fuel-cost', label: 'Калькулятор топлива' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/calculator/net-worth', label: 'Калькулятор капитала' },
    { href: '/calculator/percentage', label: 'Калькулятор процентов' },
    { href: '/calculator/discount', label: 'Калькулятор скидки' },
  ],
  uk: [
    { href: '/calculator/fuel-cost', label: 'Калькулятор пального' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/calculator/net-worth', label: 'Калькулятор капіталу' },
    { href: '/calculator/percentage', label: 'Калькулятор відсотків' },
    { href: '/calculator/discount', label: 'Калькулятор знижки' },
  ],
  fr: [
    { href: '/calculator/fuel-cost', label: 'Calculatrice Coût Carburant' },
    { href: '/calculator/savings-goal', label: 'Calculatrice Objectif Épargne' },
    { href: '/calculator/net-worth', label: 'Calculatrice Valeur Nette' },
    { href: '/calculator/percentage', label: 'Calculatrice de Pourcentage' },
    { href: '/calculator/discount', label: 'Calculatrice de Remise' },
  ],
  lt: [
    { href: '/calculator/fuel-cost', label: 'Degalų kainos skaičiuotuvas' },
    { href: '/calculator/savings-goal', label: 'Taupymo tikslo skaičiuotuvas' },
    { href: '/calculator/net-worth', label: 'Grynosios vertės skaičiuotuvas' },
    { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' },
    { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Electricity Bill Calculator — Monthly & Annual Cost',
    description: 'Free electricity bill calculator. Calculate monthly and annual electricity costs for any appliance. Enter power (W), usage hours per day, days per month, and electricity rate per kWh.',
    h1: 'Electricity Bill Calculator',
    subtitle: 'Calculate the monthly and annual cost of running any electrical appliance based on wattage, usage, and energy rate.',
  },
  ru: {
    title: 'Калькулятор электроэнергии — расчёт счёта за свет',
    description: 'Бесплатный калькулятор расходов на электроэнергию. Рассчитайте месячный и годовой счёт для любого прибора. Введите мощность (Вт), часы работы в день и тариф за кВт·ч.',
    h1: 'Калькулятор электроэнергии',
    subtitle: 'Рассчитайте ежемесячные и годовые расходы на работу любого электроприбора по мощности, времени работы и тарифу.',
  },
  uk: {
    title: 'Калькулятор електроенергії — рахунок за світло',
    description: 'Безкоштовний калькулятор витрат на електроенергію. Розрахуйте місячний і річний рахунок для будь-якого приладу. Введіть потужність (Вт), години роботи на день і тариф за кВт·год.',
    h1: 'Калькулятор електроенергії',
    subtitle: 'Розрахуйте щомісячні та річні витрати на роботу будь-якого електроприладу за потужністю, часом роботи та тарифом.',
  },
  fr: {
    title: 'Calculatrice Facture Électricité — Coût Mensuel & Annuel',
    description: 'Calculatrice de facture d\'électricité gratuite. Calculez le coût mensuel et annuel de n\'importe quel appareil électrique. Entrez la puissance (W), les heures d\'utilisation et le tarif par kWh.',
    h1: 'Calculatrice Facture Électricité',
    subtitle: 'Calculez le coût mensuel et annuel de fonctionnement de n\'importe quel appareil électrique selon la puissance et le tarif.',
  },
  lt: {
    title: 'Elektros Sąskaitos Skaičiuotuvas — Mėnesio Išlaidos',
    description: 'Nemokamas elektros sąskaitos skaičiuotuvas. Apskaičiuokite mėnesio ir metines elektros išlaidas bet kuriam prietaisui. Įveskite galią (W), naudojimo valandas per dieną ir tarifą už kWh.',
    h1: 'Elektros Sąskaitos Skaičiuotuvas',
    subtitle: 'Apskaičiuokite bet kurio elektrinio prietaiso mėnesines ir metines veikimo išlaidas pagal galią, naudojimą ir tarifą.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our electricity bill calculator helps you find out exactly how much any electrical appliance costs to run. Simply enter the device\'s power in watts, how many hours per day you use it, the number of days per month, and your local electricity tariff per kilowatt-hour. The calculator will instantly show you the monthly energy consumption in kWh and the monthly and annual cost in your currency.\n\nElectricity bills can be surprisingly high when multiple appliances run constantly. A standard electric kettle at 2,000 W used 3 times a day adds up to around 3 kWh per month — a relatively small figure. But a central air conditioning unit at 3,000 W running 8 hours a day in summer can cost over €50 per month at European rates. Understanding the energy cost of each appliance helps you identify which devices drive your bill the most and where targeted energy-saving measures will have the greatest impact.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is electricity cost calculated?', a: 'Electricity cost = (power in watts ÷ 1000) × hours of use per day × days per month × price per kWh. For example, a 100 W device used 8 hours/day for 30 days at €0.30/kWh: (100 ÷ 1000) × 8 × 30 × 0.30 = €7.20 per month.' },
      { q: 'What is a kWh?', a: 'A kilowatt-hour (kWh) is the standard unit of electricity consumption. It represents one kilowatt (1,000 watts) of power used for one hour. Your electricity bill is charged in kWh. A 1,000 W device running for one hour consumes exactly 1 kWh.' },
      { q: 'How much does a kWh cost?', a: 'Electricity prices vary widely by country. In the EU, the average household electricity price is around €0.25–0.40 per kWh. In the US, the average is around $0.13–0.17 per kWh. Nordic countries and France tend to have cheaper electricity due to hydropower and nuclear energy.' },
      { q: 'Which appliances use the most electricity?', a: 'The highest electricity consumers in a typical home are: electric heating/cooling (2,000–5,000 W), electric water heater (2,000–4,500 W), tumble dryer (2,000–4,000 W), dishwasher (1,200–1,800 W), oven (1,500–3,000 W), and washing machine (500–2,500 W). Small electronics like LED bulbs (5–15 W) and laptops (30–80 W) use very little.' },
      { q: 'How can I reduce my electricity bill?', a: 'Key strategies: switch to LED lighting (90% less than incandescent), use appliances on off-peak tariffs, upgrade to energy-efficient appliances (A-rated), unplug chargers and standby devices, insulate your home well, use smart thermostats, and run washing machines and dishwashers at lower temperatures.' },
      { q: 'What is standby power consumption?', a: 'Standby power (also called vampire power) is the electricity consumed by appliances even when switched off but still plugged in. Smart TVs, gaming consoles, and chargers can draw 1–20 W each in standby. Across all devices in a home this can add up to 50–100 kWh per year.' },
      { q: 'How much electricity does an air conditioner use?', a: 'A typical split-unit air conditioner (2.5 kW cooling capacity) consumes about 750–900 W per hour. Running it 8 hours/day for 30 days costs approximately 180–216 kWh — at €0.30/kWh, that\'s €54–65 per month. Modern inverter ACs are 30–50% more efficient than older fixed-speed models.' },
      { q: 'How much does electric vehicle charging cost?', a: 'Most EV batteries hold 40–100 kWh. A full charge from 10% to 100% for a 60 kWh battery costs about €18 at €0.30/kWh. Per 100 km, EVs typically consume 15–20 kWh, costing €4.50–6.00 at European rates versus €8–12 for a petrol car.' },
      { q: 'What is the average household electricity consumption?', a: 'Average annual electricity consumption: US household ~10,500 kWh; EU household ~3,500–4,500 kWh (varies widely by country and climate); UK household ~3,200 kWh. Larger homes, electric heating, and more occupants increase consumption.' },
      { q: 'Is solar power worth it to reduce electricity bills?', a: 'In most sunny countries, a 4–6 kW rooftop solar system generates 4,000–7,000 kWh per year, potentially covering 50–100% of a household\'s needs. Payback periods are typically 6–10 years, after which electricity is essentially free.' },
      { q: 'How do I read a kWh meter?', a: 'A standard electricity meter shows a cumulative reading in kWh. To calculate consumption between two dates, subtract the earlier reading from the later one. For example, if the meter reads 1,250 kWh in January and 1,420 kWh in February, you used 170 kWh that month.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор электроэнергии поможет точно рассчитать, во сколько обходится работа любого электроприбора. Введите мощность прибора в ваттах, количество часов работы в день, дней в месяце и тариф на электроэнергию — калькулятор мгновенно покажет ежемесячное потребление в кВт·ч, стоимость в месяц и в год.\n\nСчета за электричество могут быть неожиданно высокими, если несколько приборов работают постоянно. Электрочайник на 2000 Вт при использовании 3 раза в день добавляет около 3 кВт·ч в месяц — это немного. Но центральный кондиционер на 3000 Вт, работающий 8 часов летом, может стоить больше 50 € в месяц. Понимание энергопотребления каждого прибора помогает определить, что больше всего влияет на счёт, и найти места для экономии.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать расход электроэнергии?', a: 'Расход (кВт·ч) = (мощность в Вт ÷ 1000) × часов в день × дней в месяце. Стоимость = расход × тариф. Например, прибор 100 Вт, 8 ч/день, 30 дней, тариф 5 руб/кВт·ч: (100 ÷ 1000) × 8 × 30 × 5 = 120 руб.' },
      { q: 'Что такое кВт·ч?', a: 'Киловатт-час (кВт·ч) — единица измерения потреблённой электроэнергии. Прибор мощностью 1000 Вт, работающий 1 час, потребляет ровно 1 кВт·ч. По этой единице выставляется счёт за электроэнергию.' },
      { q: 'Сколько стоит 1 кВт·ч?', a: 'Тариф зависит от региона и поставщика. В России — около 3–7 руб./кВт·ч в зависимости от региона. В Европе — 0,25–0,40 €/кВт·ч. В США — около 0,13–0,17 $/кВт·ч.' },
      { q: 'Какие приборы потребляют больше всего электроэнергии?', a: 'Наибольшие потребители: электрообогреватель (1000–3000 Вт), электрический бойлер (1500–3000 Вт), стиральная машина (500–2500 Вт), духовой шкаф (1500–3000 Вт), кондиционер (700–3000 Вт), сушильная машина (2000–4000 Вт). Светодиодные лампы и ноутбуки потребляют очень мало.' },
      { q: 'Как снизить счёт за электроэнергию?', a: 'Перейти на светодиодные лампы (экономия 80–90%), использовать бытовую технику класса A+++, стирать при низких температурах (30–40°C), отключать приборы из розетки в режиме ожидания, установить умный счётчик или регулируемый термостат.' },
      { q: 'Что такое потребление в режиме ожидания?', a: 'Режим ожидания (stand-by) — потребление электроэнергии приборами, которые выключены, но подключены к розетке. Телевизоры, приставки, зарядные устройства потребляют 1–20 Вт в ожидании. За год это может добавить 50–100 кВт·ч.' },
      { q: 'Сколько потребляет кондиционер?', a: 'Типичный сплит-кондиционер (холодопроизводительность 2,5 кВт) потребляет около 750–900 Вт в час. При работе 8 часов в день 30 дней: 180–216 кВт·ч в месяц. При тарифе 5 руб/кВт·ч — около 900–1080 руб. в месяц.' },
      { q: 'Сколько стоит зарядка электромобиля?', a: 'Большинство аккумуляторов ЭМ вмещают 40–100 кВт·ч. Полная зарядка 60 кВт·ч стоит около 300–360 руб. при тарифе 5 руб/кВт·ч. На 100 км ЭМ расходует 15–20 кВт·ч против 5–8 л бензина.' },
      { q: 'Каково среднее потребление электроэнергии домохозяйства?', a: 'Среднее годовое потребление: российская квартира — 1500–3000 кВт·ч, дом — 3000–6000 кВт·ч. В Европе — 3500–4500 кВт·ч. В США — около 10 500 кВт·ч (из-за широкого использования электроотопления и кондиционирования).' },
      { q: 'Выгодна ли солнечная батарея для снижения счёта?', a: 'В большинстве регионов России система мощностью 4–6 кВт генерирует 4000–7000 кВт·ч в год, что может покрыть 50–100% потребностей. Срок окупаемости при наличии программ субсидирования — 7–12 лет.' },
      { q: 'Как считать по показаниям счётчика?', a: 'Вычтите текущие показания из предыдущих. Например: в начале месяца — 1250 кВт·ч, в конце — 1420 кВт·ч. Расход за месяц = 1420 − 1250 = 170 кВт·ч.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор електроенергії допоможе точно розрахувати, скільки коштує робота будь-якого електроприладу. Введіть потужність приладу у ватах, кількість годин роботи на день, днів на місяць і тариф на електроенергію — калькулятор миттєво покаже щомісячне споживання в кВт·год і вартість за місяць та рік.\n\nРахунки за електроенергію можуть бути несподівано великими, коли кілька приладів працюють постійно. Електрочайник на 2000 Вт, який вмикають 3 рази на день, додає близько 3 кВт·год на місяць — це небагато. Але кондиціонер на 3000 Вт, що працює 8 годин на день влітку, може коштувати понад 50 € на місяць. Розуміння енергоспоживання кожного приладу допомагає виявити, що найбільше впливає на рахунок, і знайти можливості для економії.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати споживання електроенергії?', a: 'Споживання (кВт·год) = (потужність Вт ÷ 1000) × годин на день × днів на місяць. Вартість = споживання × тариф. Наприклад, 100 Вт, 8 год/день, 30 днів, тариф 4 грн/кВт·год: (100 ÷ 1000) × 8 × 30 × 4 = 96 грн.' },
      { q: 'Що таке кВт·год?', a: 'Кіловат-година (кВт·год) — одиниця виміру спожитої електроенергії. Прилад потужністю 1000 Вт, що працює 1 годину, споживає рівно 1 кВт·год. За цією одиницею виставляється рахунок.' },
      { q: 'Скільки коштує 1 кВт·год?', a: 'В Україні тариф для населення — приблизно 2,64–4,32 грн/кВт·год залежно від обсягів споживання. У Європі — 0,25–0,40 €/кВт·год. У США — близько 0,13–0,17 $/кВт·год.' },
      { q: 'Які прилади споживають найбільше електроенергії?', a: 'Найбільші споживачі: електрообігрівач (1000–3000 Вт), бойлер (1500–3000 Вт), пральна машина (500–2500 Вт), духова шафа (1500–3000 Вт), кондиціонер (700–3000 Вт), сушильна машина (2000–4000 Вт). Світлодіодні лампи і ноутбуки споживають дуже мало.' },
      { q: 'Як зменшити рахунок за електроенергію?', a: 'Перейти на світлодіодні лампи (економія 80–90%), використовувати побутову техніку класу A+++, прати при низьких температурах (30–40°C), вимикати прилади з розетки в режимі очікування, встановити розумний лічильник або регульований термостат.' },
      { q: 'Що таке споживання в режимі очікування?', a: 'Режим очікування — споживання електроенергії приладами, вимкненими але підключеними до розетки. Телевізори, приставки, зарядні пристрої споживають 1–20 Вт у режимі очікування. За рік це може додати 50–100 кВт·год.' },
      { q: 'Скільки споживає кондиціонер?', a: 'Типовий спліт-кондиціонер (2,5 кВт холодопродуктивності) споживає близько 750–900 Вт на годину. При роботі 8 годин на день 30 днів: 180–216 кВт·год на місяць. При тарифі 4 грн/кВт·год — близько 720–864 грн на місяць.' },
      { q: 'Скільки коштує зарядка електромобіля?', a: 'Більшість акумуляторів ЕМ містять 40–100 кВт·год. Повна зарядка 60 кВт·год коштуватиме близько 158–259 грн при тарифі 2,64–4,32 грн/кВт·год. На 100 км ЕМ споживає 15–20 кВт·год проти 5–8 л бензину.' },
      { q: 'Яке середнє споживання електроенергії домогосподарства?', a: 'Середнє річне споживання: міська квартира в Україні — 1500–3000 кВт·год; приватний будинок — 3000–6000 кВт·год. У Європі — 3500–4500 кВт·год. У США — близько 10 500 кВт·год.' },
      { q: 'Чи вигідні сонячні панелі?', a: 'Система потужністю 4–6 кВт в Україні генерує 4000–6000 кВт·год на рік, що може покрити 50–100% потреб. Термін окупності за наявності субсидій і зеленого тарифу — 5–9 років.' },
      { q: 'Як читати показання лічильника?', a: 'Відніміть попередні показання від поточних. Наприклад: початок місяця — 1250 кВт·год, кінець — 1420 кВт·год. Споживання за місяць = 1420 − 1250 = 170 кВт·год.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de facture d\'électricité vous permet de savoir exactement combien coûte le fonctionnement de n\'importe quel appareil électrique. Entrez la puissance de l\'appareil en watts, le nombre d\'heures d\'utilisation par jour, les jours par mois et votre tarif d\'électricité par kWh. La calculatrice affiche instantanément la consommation mensuelle en kWh et le coût mensuel et annuel.\n\nLes factures d\'électricité peuvent être étonnamment élevées lorsque plusieurs appareils fonctionnent en permanence. Une bouilloire électrique standard de 2 000 W utilisée 3 fois par jour représente environ 3 kWh par mois — une somme relativement modeste. Mais une climatisation centrale de 3 000 W fonctionnant 8 heures par jour en été peut coûter plus de 50 € par mois aux tarifs européens. Comprendre la consommation de chaque appareil vous aide à identifier les postes les plus coûteux et à cibler vos efforts d\'économies d\'énergie.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le coût de l\'électricité ?', a: 'Coût = (puissance en W ÷ 1000) × heures d\'utilisation/jour × jours/mois × tarif/kWh. Exemple : un appareil de 100 W utilisé 8 h/jour pendant 30 jours à 0,30 €/kWh : (100 ÷ 1000) × 8 × 30 × 0,30 = 7,20 € par mois.' },
      { q: 'Qu\'est-ce qu\'un kWh ?', a: 'Un kilowattheure (kWh) est l\'unité standard de consommation d\'électricité. Il représente 1 000 watts de puissance utilisés pendant une heure. Votre facture est calculée en kWh. Un appareil de 1 000 W fonctionnant 1 heure consomme exactement 1 kWh.' },
      { q: 'Quel est le prix du kWh en France ?', a: 'En France, le tarif réglementé EDF est d\'environ 0,23–0,25 €/kWh TTC en 2024. En moyenne dans l\'UE : 0,25–0,40 €/kWh. Aux États-Unis : 0,13–0,17 $/kWh. La France bénéficie de l\'énergie nucléaire qui maintient les prix parmi les plus bas d\'Europe.' },
      { q: 'Quels appareils consomment le plus d\'électricité ?', a: 'Les plus grands consommateurs : chauffage électrique (1 000–3 000 W), chauffe-eau électrique (2 000–3 000 W), sèche-linge (2 000–4 000 W), four électrique (1 500–3 000 W), climatiseur (700–3 000 W), lave-vaisselle (1 200–1 800 W). L\'éclairage LED et les ordinateurs portables consomment très peu.' },
      { q: 'Comment réduire sa facture d\'électricité ?', a: 'Passer aux ampoules LED (90 % d\'économies), utiliser des appareils de classe A ou A+++, laver le linge à 30–40 °C, débrancher les appareils en veille, installer un thermostat intelligent, isoler correctement le logement et utiliser les heures creuses si votre contrat le permet.' },
      { q: 'Qu\'est-ce que la consommation en veille ?', a: 'La consommation en veille (ou « vampire électrique ») est l\'électricité consommée par les appareils branchés mais éteints. Téléviseurs, consoles, chargeurs peuvent consommer 1 à 20 W chacun. Cela représente 50 à 100 kWh par an pour un foyer moyen.' },
      { q: 'Combien consomme une climatisation ?', a: 'Un climatiseur split de 2,5 kW de puissance frigorifique consomme environ 750–900 W par heure. Utilisé 8 h/jour pendant 30 jours : 180–216 kWh par mois. À 0,25 €/kWh, c\'est 45–54 € par mois.' },
      { q: 'Combien coûte la recharge d\'un véhicule électrique ?', a: 'La plupart des batteries de VE contiennent 40 à 100 kWh. Une recharge complète d\'une batterie de 60 kWh coûte environ 15 € à 0,25 €/kWh. Pour 100 km, un VE consomme 15 à 20 kWh, soit 3,75 à 5 € — contre 8 à 12 € pour une voiture essence.' },
      { q: 'Quelle est la consommation moyenne d\'un foyer français ?', a: 'La consommation annuelle moyenne d\'un foyer français est d\'environ 4 700 kWh (hors chauffage électrique), soit environ 390 kWh/mois. Avec chauffage électrique, elle peut dépasser 10 000 kWh/an.' },
      { q: 'Le solaire photovoltaïque est-il rentable ?', a: 'Une installation de 3 à 6 kWc produit 3 000 à 7 000 kWh/an en France. Avec les aides de l\'État et l\'autoconsommation, la rentabilité peut être atteinte en 8 à 12 ans. L\'électricité produite est ensuite gratuite.' },
      { q: 'Comment lire un compteur électrique ?', a: 'Relevez le chiffre affiché en kWh. Pour calculer la consommation sur une période, soustrayez le relevé précédent du relevé actuel. Exemple : 1 420 − 1 250 = 170 kWh consommés dans le mois.' },
    ],
  },
  lt: {
    description: 'Mūsų elektros sąskaitos skaičiuotuvas padeda tiksliai apskaičiuoti, kiek kainuoja bet kurio elektrinio prietaiso naudojimas. Įveskite prietaiso galią vatais, naudojimo valandas per dieną, dienų per mėnesį ir elektros tarifą už kWh — skaičiuotuvas akimirksniu parodys mėnesio energijos sąnaudas kWh ir mėnesio bei metines išlaidas.\n\nElektros sąskaitos gali būti netikėtai didelės, kai keli prietaisai veikia nuolatos. Standartinis elektrinis virdulys, 2000 W, naudojamas 3 kartus per dieną, per mėnesį sunaudoja apie 3 kWh — tai nedidelė suma. Tačiau 3000 W centrinis oro kondicionierius, veikiantis 8 valandas per dieną vasarą, gali kainuoti daugiau nei 50 € per mėnesį Europos tarifais. Suprantant kiekvieno prietaiso energijos sąnaudas, lengviau nustatyti, kas labiausiai didina sąskaitą, ir rasti taupymo galimybes.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojama elektros kaina?', a: 'Kaina = (galia W ÷ 1000) × naudojimo val./dieną × dienų/mėn. × tarifas/kWh. Pvz.: 100 W prietaisas, 8 val./dieną, 30 dienų, 0,30 €/kWh: (100 ÷ 1000) × 8 × 30 × 0,30 = 7,20 € per mėnesį.' },
      { q: 'Kas yra kWh?', a: 'Kilovatvalandė (kWh) yra standartinis elektros suvartojimo vienetas. Jis reiškia 1000 W galios naudojimą vieną valandą. Jūsų sąskaita skaičiuojama kWh. 1000 W prietaisas, veikiantis 1 valandą, sunaudoja tiksliai 1 kWh.' },
      { q: 'Kiek kainuoja 1 kWh Lietuvoje?', a: 'Lietuvoje buities vartotojų elektros kaina yra apie 0,20–0,27 €/kWh su mokesčiais (2024 m.). Europoje vidutiniškai — 0,25–0,40 €/kWh. JAV — apie 0,13–0,17 $/kWh.' },
      { q: 'Kurie prietaisai sunaudoja daugiausiai elektros?', a: 'Didžiausi vartotojai: elektrinis šildytuvas (1000–3000 W), elektrinis vandens šildytuvas (1500–3000 W), džiovintuvas (2000–4000 W), elektrinė krosnelė (1500–3000 W), oro kondicionierius (700–3000 W), indaplovė (1200–1800 W). LED lemputės ir nešiojamieji kompiuteriai sunaudoja labai mažai.' },
      { q: 'Kaip sumažinti elektros sąskaitą?', a: 'Pereiti prie LED apšvietimo (taupoma 80–90 %), naudoti A+++ klasės buitinę techniką, skalbti 30–40 °C temperatūroje, išjungti prietaisus iš lizdo budėjimo režimu, įdiegti išmanųjį termostatą ir naudoti naktinius tarifus, jei jie prieinami.' },
      { q: 'Kas yra budėjimo režimo suvartojimas?', a: 'Budėjimo režimo suvartojimas — tai elektra, kurią prietaisai naudoja, kai yra išjungti, bet prijungti prie lizdo. Televizoriai, žaidimų konsolės ir krovikliai budėjimo režimu gali naudoti 1–20 W kiekvienas. Per metus tai gali sudaryti 50–100 kWh.' },
      { q: 'Kiek elektros sunaudoja oro kondicionierius?', a: 'Tipinis split tipo oro kondicionierius (2,5 kW šaldymo galia) sunaudoja apie 750–900 W per valandą. Veikiant 8 val./dieną 30 dienų: 180–216 kWh per mėnesį. Esant 0,25 €/kWh tarifui — apie 45–54 € per mėnesį.' },
      { q: 'Kiek kainuoja elektromobilio įkrovimas?', a: 'Dauguma elektromobilių akumuliatorių talpina 40–100 kWh. Pilnas 60 kWh akumuliatoriaus įkrovimas kainuoja apie 15 € esant 0,25 €/kWh tarifui. 100 km elektromobilis sunaudoja 15–20 kWh — tai 3,75–5 €, palyginti su 8–12 € benzininiam automobiliui.' },
      { q: 'Koks vidutinis namų ūkio elektros suvartojimas?', a: 'Vidutinis metinis namų ūkio suvartojimas Lietuvoje: butas — apie 1500–2500 kWh, privatus namas — 3000–6000 kWh. Europoje vidurkis yra 3500–4500 kWh. JAV — apie 10 500 kWh.' },
      { q: 'Ar saulės energija apsimoka?', a: 'Lietuvoje 4–6 kW saulės elektrinė per metus pagamina 3500–5000 kWh, o tai gali padengti 50–100% namų ūkio poreikių. Atsipirkimo laikotarpis su valstybės subsidijomis yra 6–10 metų.' },
      { q: 'Kaip nuskaityti elektros skaitiklį?', a: 'Perskaitykite esamą kWh rodmenį. Suvartojimui apskaičiuoti atimkite ankstesnį rodmenį iš dabartinio. Pvz.: 1420 − 1250 = 170 kWh per mėnesį.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/electricity-bill', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ElectricityBillPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/electricity-bill`,
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
        <ElectricityBillCalculator locale={locale} />
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
