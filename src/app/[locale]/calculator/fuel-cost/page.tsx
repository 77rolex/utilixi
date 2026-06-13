import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import FuelCostCalculator from './FuelCostCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/electricity-bill', label: 'Electricity Bill Calculator' },
    { href: '/calculator/tip', label: 'Tip Calculator' },
    { href: '/calculator/discount', label: 'Discount Calculator' },
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/percentage', label: 'Percentage Calculator' },
  ],
  ru: [
    { href: '/calculator/electricity-bill', label: 'Калькулятор электроэнергии' },
    { href: '/calculator/tip', label: 'Калькулятор чаевых' },
    { href: '/calculator/discount', label: 'Калькулятор скидки' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/calculator/percentage', label: 'Калькулятор процентов' },
  ],
  uk: [
    { href: '/calculator/electricity-bill', label: 'Калькулятор електроенергії' },
    { href: '/calculator/tip', label: 'Калькулятор чайових' },
    { href: '/calculator/discount', label: 'Калькулятор знижки' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/calculator/percentage', label: 'Калькулятор відсотків' },
  ],
  fr: [
    { href: '/calculator/electricity-bill', label: 'Calculatrice Facture Électricité' },
    { href: '/calculator/tip', label: 'Calculatrice de Pourboire' },
    { href: '/calculator/discount', label: 'Calculatrice de Remise' },
    { href: '/calculator/savings-goal', label: 'Calculatrice Objectif Épargne' },
    { href: '/calculator/percentage', label: 'Calculatrice de Pourcentage' },
  ],
  lt: [
    { href: '/calculator/electricity-bill', label: 'Elektros sąskaitos skaičiuotuvas' },
    { href: '/calculator/tip', label: 'Arbatpinigių skaičiuotuvas' },
    { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' },
    { href: '/calculator/savings-goal', label: 'Taupymo tikslo skaičiuotuvas' },
    { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Fuel Cost Calculator — Petrol & Trip Cost Estimator',
    description: 'Free fuel cost calculator. Estimate petrol or diesel expenses for any trip. Supports metric (L/100km) and imperial (MPG) units. Calculate fuel needed and total trip cost instantly.',
    h1: 'Fuel Cost Calculator',
  },
  ru: {
    title: 'Калькулятор расхода топлива — стоимость поездки',
    description: 'Бесплатный калькулятор стоимости топлива. Рассчитайте расход бензина или дизеля для любой поездки. Метрическая (л/100 км) и имперская (MPG) системы.',
    h1: 'Калькулятор расхода топлива',
  },
  uk: {
    title: 'Калькулятор витрат на пальне — вартість поїздки',
    description: 'Безкоштовний калькулятор вартості пального. Розрахуйте витрати на бензин або дизель для будь-якої поїздки. Метрична (л/100 км) та імперська (MPG) системи.',
    h1: 'Калькулятор витрат на пальне',
  },
  fr: {
    title: 'Calculatrice Coût Carburant — Estimation Trajet',
    description: 'Calculatrice de coût carburant gratuite. Estimez les dépenses en essence ou diesel pour tout trajet. Unités métriques (L/100 km) et impériales (MPG) disponibles.',
    h1: 'Calculatrice Coût Carburant',
  },
  lt: {
    title: 'Degalų Kainos Skaičiuotuvas — Kelionės Išlaidos',
    description: 'Nemokamas degalų kainos skaičiuotuvas. Įvertinkite benzino ar dyzelino išlaidas bet kuriai kelionei. Metriniai (l/100 km) ir imperiniai (MPG) vienetai.',
    h1: 'Degalų Kainos Skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our free fuel cost calculator to estimate how much you will spend on petrol or diesel for any trip. Enter the distance, your car\'s fuel consumption rate, and the current fuel price to instantly see how many litres (or gallons) you need and the total journey cost. The tool supports both metric (litres per 100 km) and imperial (miles per gallon) units, making it useful whether you drive in Europe, the US, or elsewhere.\n\nFuel costs are one of the most significant recurring expenses for car owners. According to industry data, the average European passenger car consumes around 6–8 litres per 100 km, while American vehicles average around 25–30 MPG. By calculating fuel costs before a trip, you can better plan your travel budget, decide whether to refuel before a long journey, and compare the real cost of driving versus public transport or car-sharing.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is fuel cost calculated?', a: 'Fuel cost = (distance ÷ 100) × fuel consumption rate × fuel price per litre (metric). In imperial: fuel needed (gallons) = distance (miles) ÷ MPG, then total cost = gallons × price per gallon.' },
      { q: 'What is L/100km?', a: 'L/100km (litres per 100 kilometres) is the most common fuel efficiency metric in Europe and most of the world. It tells you how many litres of fuel your car consumes to travel 100 kilometres. A lower number means better fuel efficiency.' },
      { q: 'What is MPG?', a: 'MPG (miles per gallon) is the fuel efficiency unit used in the United States and United Kingdom. It represents how many miles a vehicle can travel on one gallon of fuel. A higher MPG number means better fuel efficiency — the opposite of L/100km.' },
      { q: 'How do I convert L/100km to MPG?', a: 'To convert L/100km to US MPG: divide 235.21 by the L/100km value. For example, 8 L/100km = 235.21 ÷ 8 ≈ 29.4 MPG. To convert US MPG to L/100km: divide 235.21 by the MPG value.' },
      { q: 'What is the average fuel consumption of a car?', a: 'The average new passenger car in Europe consumes about 6–7 litres per 100 km. SUVs and larger vehicles typically use 8–12 L/100km. In the US, the average new car achieves around 28–30 MPG, while trucks and SUVs average 20–25 MPG.' },
      { q: 'Does driving speed affect fuel consumption?', a: 'Yes, significantly. Fuel consumption increases sharply above 90–100 km/h (55–62 mph) due to aerodynamic drag. Driving at 120 km/h can use 20–30% more fuel than at 90 km/h. Smooth, steady driving at moderate speeds is most fuel-efficient.' },
      { q: 'How does tyre pressure affect fuel costs?', a: 'Under-inflated tyres increase rolling resistance, which raises fuel consumption by up to 3% per 10% tyre pressure deficit. Keeping tyres properly inflated as per manufacturer recommendations can noticeably reduce fuel costs over time.' },
      { q: 'Is diesel cheaper to run than petrol?', a: 'Diesel engines are typically more fuel-efficient (20–30% better L/100km), so they can be cheaper per kilometre even if diesel costs more per litre. However, petrol cars have lower purchase and maintenance costs, so the break-even depends heavily on annual mileage.' },
      { q: 'How can I reduce fuel costs?', a: 'Key strategies include: driving smoothly without harsh acceleration or braking, maintaining steady speeds, keeping tyres properly inflated, removing unnecessary weight, using cruise control on motorways, avoiding excessive idling, and keeping up with regular car servicing.' },
      { q: 'What is the difference between city and highway fuel consumption?', a: 'City driving typically uses 20–40% more fuel than highway driving due to frequent stopping and starting. Fuel efficiency is worst in stop-and-go traffic because the engine idles and accelerates repeatedly. Hybrid cars narrow this gap significantly by recovering energy during braking.' },
      { q: 'How do I calculate the cost of a round trip?', a: 'Simply enter the total round-trip distance in the distance field. For example, if your destination is 150 km away and you return the same way, enter 300 km. The calculator will show the total fuel needed and cost for the complete journey.' },
    ],
  },
  ru: {
    description: 'Используйте наш бесплатный калькулятор расхода топлива, чтобы рассчитать стоимость поездки. Введите расстояние, расход вашего автомобиля и текущую цену бензина или дизеля — калькулятор мгновенно покажет, сколько литров потребуется и во сколько обойдётся поездка. Поддерживаются метрическая (л/100 км) и имперская (MPG) системы.\n\nРасходы на топливо — одна из главных статей расходов автовладельца. Средний европейский автомобиль потребляет 6–8 л/100 км, а внедорожники — до 12 л/100 км. Предварительный расчёт стоимости поездки помогает грамотно планировать бюджет, выбирать оптимальный маршрут и сравнивать затраты на личный транспорт с общественным.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать стоимость топлива?', a: 'Стоимость = (расстояние ÷ 100) × расход (л/100 км) × цена литра. Например, 300 км при расходе 8 л/100 км и цене 1,80 €/л: (300 ÷ 100) × 8 × 1,80 = 43,20 €.' },
      { q: 'Что такое расход л/100 км?', a: 'Это количество литров топлива, которое автомобиль потребляет на 100 км пути. Меньшее значение означает более экономичный автомобиль. Средний легковой автомобиль в Европе расходует 6–8 л/100 км.' },
      { q: 'Что такое MPG?', a: 'MPG (miles per gallon — миль на галлон) — единица топливной эффективности, принятая в США и Великобритании. Более высокое значение MPG означает меньший расход. Для перевода: MPG = 235,21 / (л/100 км).' },
      { q: 'Как перевести л/100 км в MPG?', a: 'Разделите 235,21 на значение л/100 км. Например, 8 л/100 км = 235,21 ÷ 8 ≈ 29,4 MPG. Для обратного перевода: л/100 км = 235,21 ÷ MPG.' },
      { q: 'Какой средний расход топлива у легкового автомобиля?', a: 'Средний легковой автомобиль в Европе расходует 6–7 л/100 км. SUV — 8–12 л/100 км. Электромобили «потребляют» 15–20 кВт·ч/100 км, что эквивалентно примерно 2–3 л бензина.' },
      { q: 'Влияет ли скорость на расход топлива?', a: 'Да, существенно. Выше 90–100 км/ч расход резко растёт из-за аэродинамического сопротивления. Езда при 120 км/ч может потреблять на 20–30% больше топлива, чем при 90 км/ч. Плавное движение без резких разгонов — наиболее экономичный режим.' },
      { q: 'Как давление в шинах влияет на расход?', a: 'Недокачанные шины увеличивают сопротивление качению и расход топлива на 1–3% на каждые 10% падения давления ниже нормы. Регулярная проверка давления — простой и бесплатный способ сэкономить на топливе.' },
      { q: 'Что выгоднее — бензин или дизель?', a: 'Дизельные двигатели на 20–30% экономичнее бензиновых, поэтому при больших пробегах (от 20 000 км/год) дизель обычно выгоднее, даже с учётом более высокой цены топлива. При малых пробегах — бензин предпочтительнее.' },
      { q: 'Как снизить расход топлива?', a: 'Плавный разгон и торможение, поддержание постоянной скорости, правильное давление в шинах, отключение кондиционера при движении по городу, удаление лишнего груза, регулярное техобслуживание двигателя и использование рекомендуемого масла.' },
      { q: 'Чем отличается расход в городе и на трассе?', a: 'Городской цикл обычно на 20–40% хуже трассового из-за частых остановок и разгонов. На трассе расход стабилен. Гибридные автомобили особенно эффективны в городе, так как рекуперируют энергию торможения.' },
      { q: 'Как посчитать расход для поездки туда и обратно?', a: 'Введите суммарное расстояние туда и обратно. Например, если пункт назначения — 150 км, введите 300 км для поездки в обе стороны.' },
    ],
  },
  uk: {
    description: 'Використовуйте наш безкоштовний калькулятор витрат на пальне, щоб дізнатися вартість будь-якої поїздки. Введіть відстань, витрату вашого автомобіля та поточну ціну бензину чи дизелю — калькулятор миттєво покаже кількість необхідного пального та загальну вартість поїздки. Підтримуються метрична (л/100 км) та імперська (MPG) системи.\n\nВитрати на паливо — одна з основних статей витрат для власників автомобілів. Середній легковий автомобіль в Європі споживає 6–8 л/100 км, а позашляховики — до 12 л/100 км. Попередній розрахунок допомагає планувати бюджет поїздки, вибирати оптимальний маршрут і порівнювати витрати на власний транспорт з громадським.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати вартість пального?', a: 'Вартість = (відстань ÷ 100) × витрата (л/100 км) × ціна літра. Наприклад, 300 км при витраті 8 л/100 км і ціні 1,80 €/л: (300 ÷ 100) × 8 × 1,80 = 43,20 €.' },
      { q: 'Що таке витрата л/100 км?', a: 'Це кількість літрів пального, яку автомобіль споживає на 100 км шляху. Менше значення означає економічніший автомобіль. Середній легковий автомобіль в Європі споживає 6–8 л/100 км.' },
      { q: 'Що таке MPG?', a: 'MPG (miles per gallon — миль на галон) — одиниця паливної ефективності, прийнята у США та Великобританії. Вище значення MPG означає менший розхід. Для перетворення: MPG = 235,21 / (л/100 км).' },
      { q: 'Як перевести л/100 км у MPG?', a: 'Розділіть 235,21 на значення л/100 км. Наприклад, 8 л/100 км = 235,21 ÷ 8 ≈ 29,4 MPG. Для зворотного: л/100 км = 235,21 ÷ MPG.' },
      { q: 'Який середній розхід пального легкового автомобіля?', a: 'Середній легковий автомобіль в Європі споживає 6–7 л/100 км. Позашляховики — 8–12 л/100 км. Електромобілі споживають 15–20 кВт·год/100 км.' },
      { q: 'Чи впливає швидкість на розхід пального?', a: 'Так, суттєво. Вище 90–100 км/год розхід різко зростає через аеродинамічний опір. Їзда при 120 км/год може споживати на 20–30% більше, ніж при 90 км/год. Плавне рівномірне водіння — найекономічніший режим.' },
      { q: 'Як тиск у шинах впливає на розхід?', a: 'Спущені шини збільшують опір кочення та розхід пального на 1–3% за кожні 10% падіння тиску нижче норми. Регулярна перевірка тиску — простий спосіб зменшити витрати.' },
      { q: 'Що вигідніше — бензин чи дизель?', a: 'Дизельні двигуни на 20–30% економічніші за бензинові. При великому річному пробігу (понад 20 000 км) дизель зазвичай вигідніший навіть за вищої ціни пального.' },
      { q: 'Як зменшити витрати на пальне?', a: 'Плавне прискорення та гальмування, підтримання сталої швидкості, правильний тиск у шинах, прибирання зайвого вантажу, регулярне технічне обслуговування та використання рекомендованого масла.' },
      { q: 'Чим відрізняється розхід у місті та на трасі?', a: 'Міський цикл зазвичай на 20–40% гірший за трасовий через часті зупинки. На трасі розхід стабільний. Гібридні автомобілі особливо ефективні у місті — рекуперують енергію гальмування.' },
      { q: 'Як розрахувати пальне для поїздки туди й назад?', a: 'Введіть загальну відстань туди і назад. Наприклад, якщо пункт призначення за 150 км, введіть 300 км.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de coût carburant gratuite pour estimer vos dépenses en essence ou diesel pour n\'importe quel trajet. Entrez la distance, la consommation de votre véhicule et le prix du carburant — la calculatrice affiche instantanément le volume de carburant nécessaire et le coût total du trajet. Les unités métriques (L/100 km) et impériales (MPG) sont disponibles.\n\nLes coûts de carburant représentent l\'une des dépenses récurrentes les plus importantes pour les conducteurs. La voiture européenne moyenne consomme 6 à 8 litres aux 100 km, tandis que les SUV atteignent 8 à 12 L/100 km. Calculer le coût de carburant avant un voyage permet de mieux budgétiser le trajet, de décider s\'il est nécessaire de faire le plein avant de partir, et de comparer le coût réel de la voiture versus les transports en commun.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le coût du carburant ?', a: 'Coût = (distance ÷ 100) × consommation (L/100 km) × prix au litre. Exemple : 300 km à 8 L/100 km avec le carburant à 1,80 €/L : (300 ÷ 100) × 8 × 1,80 = 43,20 €.' },
      { q: 'Qu\'est-ce que le L/100 km ?', a: 'Le L/100 km (litres pour 100 kilomètres) est l\'unité de consommation de carburant la plus utilisée en Europe. Plus la valeur est faible, plus le véhicule est économique. Une voiture moyenne consomme 6 à 8 L/100 km.' },
      { q: 'Qu\'est-ce que le MPG ?', a: 'Le MPG (miles par gallon) est l\'unité de consommation utilisée aux États-Unis et au Royaume-Uni. Une valeur plus élevée signifie une meilleure efficacité. Pour convertir : MPG = 235,21 ÷ L/100 km.' },
      { q: 'Comment convertir L/100 km en MPG ?', a: 'Divisez 235,21 par la valeur en L/100 km. Exemple : 8 L/100 km = 235,21 ÷ 8 ≈ 29,4 MPG US. Pour la conversion inverse : L/100 km = 235,21 ÷ MPG.' },
      { q: 'Quelle est la consommation moyenne d\'une voiture ?', a: 'Une voiture particulière européenne neuve consomme environ 6 à 7 L/100 km. Les SUV utilisent 8 à 12 L/100 km. Aux États-Unis, la moyenne nationale tourne autour de 28 à 30 MPG.' },
      { q: 'La vitesse influence-t-elle la consommation ?', a: 'Oui, significativement. Au-delà de 90–100 km/h, la consommation augmente fortement à cause de la résistance aérodynamique. Rouler à 130 km/h peut consommer 25–35 % de plus qu\'à 90 km/h.' },
      { q: 'Comment la pression des pneus affecte-t-elle les coûts ?', a: 'Des pneus sous-gonflés augmentent la résistance au roulement et la consommation jusqu\'à 3 % par 10 % de pression en moins. Maintenir la pression recommandée réduit les coûts sur le long terme.' },
      { q: 'Le diesel est-il moins cher à l\'usage que l\'essence ?', a: 'Les moteurs diesel consomment généralement 20 à 30 % de moins en L/100 km. Pour un kilométrage élevé (> 20 000 km/an), le diesel est souvent plus économique malgré un prix au litre plus élevé.' },
      { q: 'Comment réduire ses coûts de carburant ?', a: 'Conduire de manière souple, éviter les freinages brusques, maintenir une vitesse constante, vérifier la pression des pneus, alléger le véhicule, entretenir régulièrement le moteur et utiliser l\'huile recommandée.' },
      { q: 'Quelle est la différence entre consommation urbaine et autoroutière ?', a: 'La conduite urbaine consomme 20 à 40 % de plus qu\'en autoroute en raison des arrêts et redémarrages fréquents. Les véhicules hybrides réduisent cet écart grâce à la récupération d\'énergie au freinage.' },
      { q: 'Comment calculer le coût pour un aller-retour ?', a: 'Saisissez la distance totale aller-retour. Par exemple, si la destination est à 150 km, entrez 300 km pour le trajet complet.' },
    ],
  },
  lt: {
    description: 'Naudokite mūsų nemokamą degalų kainos skaičiuotuvą, kad apskaičiuotumėte bet kurios kelionės išlaidas. Įveskite atstumą, automobilio degalų sąnaudas ir dabartinę degalų kainą — skaičiuotuvas akimirksniu parodys, kiek litrų (arba galonų) reikės ir kokia bus bendra kelionės kaina. Palaikomi metriniai (l/100 km) ir imperiniai (MPG) vienetai.\n\nDegalų išlaidos yra viena didžiausių pasikartojančių automobilių savininkų išlaidų. Vidutinis Europos lengvasis automobilis sunaudoja apie 6–8 litrus 100 km, o visureigiai — iki 12 l/100 km. Iš anksto apskaičiavę degalų sąnaudas galėsite tiksliau planuoti kelionės biudžetą, nuspręsti, ar papildyti baką prieš ilgą kelionę, ir palyginti vairavimo kainą su viešuoju transportu.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojama degalų kaina?', a: 'Kaina = (atstumas ÷ 100) × sąnaudos (l/100 km) × kaina už litrą. Pavyzdžiui, 300 km, kai sąnaudos 8 l/100 km, o kaina 1,80 €/l: (300 ÷ 100) × 8 × 1,80 = 43,20 €.' },
      { q: 'Kas yra l/100 km?', a: 'L/100 km (litrai 100 kilometrų) yra dažniausiai Europoje naudojamas degalų efektyvumo rodiklis. Mažesnė reikšmė reiškia taupesnį automobilį. Vidutinis lengvasis automobilis sunaudoja 6–8 l/100 km.' },
      { q: 'Kas yra MPG?', a: 'MPG (mylios galonui) yra degalų efektyvumo vienetas, naudojamas JAV ir Jungtinėje Karalystėje. Didesnė MPG reikšmė reiškia mažesnes sąnaudas. Konvertuoti: MPG = 235,21 ÷ l/100 km.' },
      { q: 'Kaip konvertuoti l/100 km į MPG?', a: 'Padalinkite 235,21 iš l/100 km reikšmės. Pvz.: 8 l/100 km = 235,21 ÷ 8 ≈ 29,4 MPG. Atvirkščiai: l/100 km = 235,21 ÷ MPG.' },
      { q: 'Kokios vidutinės automobilio degalų sąnaudos?', a: 'Vidutinis naujas Europos lengvasis automobilis sunaudoja apie 6–7 l/100 km. Visureigiai — 8–12 l/100 km. JAV vidutinė riba yra apie 28–30 MPG.' },
      { q: 'Ar greitis veikia degalų sąnaudas?', a: 'Taip, labai. Viršijus 90–100 km/h greičio ribą, sąnaudos stipriai auga dėl aerodinaminio pasipriešinimo. Važiuojant 120 km/h gali prireikti 20–30 % daugiau degalų nei 90 km/h.' },
      { q: 'Kaip padangų slėgis veikia degalų sąnaudas?', a: 'Nepakankamai pripumpuotos padangos didina riedėjimo pasipriešinimą ir sąnaudas iki 3 % kiekvienam 10 % slėgio sumažėjimui žemiau normos. Reguliari padangų slėgio kontrolė padeda sutaupyti.' },
      { q: 'Ar dyzelis pigesnis nei benzinas?', a: 'Dyzeliniai varikliai paprastai yra 20–30 % ekonomiškesni. Esant didelei metinei rida (>20 000 km), dyzelis dažnai apsimoka labiau, net jei kaina litrui didesnė.' },
      { q: 'Kaip sumažinti degalų išlaidas?', a: 'Sklandus greičio didinimas ir stabdymas, tolygus greitis, tinkamas padangų slėgis, nereikalingo svorio pašalinimas, reguliarus techninis aptarnavimas ir rekomenduojamo variklinės tepalų naudojimas.' },
      { q: 'Koks skirtumas tarp miesto ir greitkelio sąnaudų?', a: 'Miesto ciklas paprastai sunaudoja 20–40 % daugiau degalų nei greitkelis dėl dažnų sustojimų ir startelių. Hibridiniai automobiliai šį skirtumą sumažina, regeneruodami energiją stabdymo metu.' },
      { q: 'Kaip apskaičiuoti degalus kelionei pirmyn ir atgal?', a: 'Įveskite bendrą atstumą pirmyn ir atgal. Pavyzdžiui, jei tikslas yra 150 km, įveskite 300 km pilnai kelionei.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/fuel-cost', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FuelCostPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/fuel-cost`,
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
        <ToolActions />
        <FuelCostCalculator locale={locale} />
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
