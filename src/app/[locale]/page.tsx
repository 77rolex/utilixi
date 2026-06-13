import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import AdSidebar from '@/components/ui/AdSidebar';
import ToolGrid, { type ToolItem } from '@/components/home/ToolGrid';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: 'Free Online Calculators & Tools',
    ru: 'Бесплатные онлайн-калькуляторы и инструменты',
    uk: 'Безкоштовні онлайн-калькулятори та інструменти',
    fr: 'Calculatrices et outils en ligne gratuits',
    lt: 'Nemokomi internetiniai skaičiuotuvai ir įrankiai',
  };

  const descriptions: Record<string, string> = {
    en: '88 free online tools — mortgage, tax & insurance calculators, BMI, calorie deficit, macros, pace, savings goal, inflation, loan payoff, pool volume, SPF, travel budget, numerology, moon sign, live currency & crypto rates, weather and more.',
    ru: '88 бесплатных онлайн-инструментов — ипотека, налоги, ИМТ, дефицит калорий, КБЖУ, темп бега, накопления, инфляция, погашение, объём бассейна, SPF, бюджет путешествия, нумерология, лунный знак, курсы валют и криптовалют, погода.',
    uk: '88 безкоштовних онлайн-інструментів — іпотека, податки, ІМТ, дефіцит калорій, КБЖВ, темп бігу, накопичення, інфляція, погашення, об\'єм басейну, SPF, бюджет подорожі, нумерологія, місячний знак, курси валют і криптовалют, погода.',
    fr: '88 outils en ligne gratuits — prêt immobilier, impôts, IMC, déficit calorique, macros, allure, épargne, inflation, remboursement anticipé, piscine, SPF, budget voyage, numérologie, signe lunaire, taux de change et crypto, météo.',
    lt: '88 nemokami internetiniai įrankiai — hipoteka, mokesčiai, KMI, kalorijų deficitas, makroelementai, tempas, taupymas, infliacija, paskolos grąžinimas, baseinas, SPF, kelionės biudžetas, numerologija, mėnulio ženklas, valiutų kursai, oras.',
  };

  return buildMetadata(locale, '', {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  });
}

type RawTool = {
  href: string;
  icon: string;
  category: ToolItem['category'];
  titles: Record<string, string>;
  descs: Record<string, string>;
};

const RAW_TOOLS: RawTool[] = [
  {
    href: '/calculator/mortgage',
    icon: '🏠',
    category: 'finance',
    titles: { en: 'Mortgage Calculator', ru: 'Ипотечный калькулятор', uk: 'Іпотечний калькулятор', fr: 'Calculatrice de prêt immobilier', lt: 'Hipotekos skaičiuotuvas' },
    descs: { en: 'Calculate monthly payments', ru: 'Рассчитайте ежемесячный платёж', uk: 'Розрахуйте щомісячний платіж', fr: 'Calculez vos mensualités', lt: 'Apskaičiuokite mėnesio įmokas' },
  },
  {
    href: '/calculator/loan',
    icon: '💳',
    category: 'finance',
    titles: { en: 'Loan Calculator', ru: 'Калькулятор кредита', uk: 'Калькулятор кредиту', fr: 'Calculatrice de prêt', lt: 'Paskolos skaičiuotuvas' },
    descs: { en: 'Calculate loan payments', ru: 'Рассчитайте платежи по кредиту', uk: 'Розрахуйте платежі за кредитом', fr: 'Calculez vos remboursements', lt: 'Apskaičiuokite paskolos įmokas' },
  },
  {
    href: '/calculator/deposit',
    icon: '🏦',
    category: 'finance',
    titles: { en: 'Deposit Calculator', ru: 'Калькулятор депозита', uk: 'Калькулятор депозиту', fr: 'Calculatrice de dépôt', lt: 'Indėlio skaičiuotuvas' },
    descs: { en: 'Calculate deposit growth with compound interest', ru: 'Рассчитайте доход по вкладу с капитализацией', uk: 'Розрахуйте дохід від вкладу з капіталізацією', fr: 'Calculez la croissance de votre épargne', lt: 'Apskaičiuokite indėlio augimą su kapitalizacija' },
  },
  {
    href: '/calculator/bmi',
    icon: '⚖️',
    category: 'health',
    titles: { en: 'BMI Calculator', ru: 'Калькулятор ИМТ', uk: 'Калькулятор ІМТ', fr: 'Calcul de l\'IMC', lt: 'KMI skaičiuotuvas' },
    descs: { en: 'Calculate your body mass index', ru: 'Вычислите индекс массы тела', uk: 'Обчисліть індекс маси тіла', fr: 'Calculez votre indice de masse corporelle', lt: 'Apskaičiuokite kūno masės indeksą' },
  },
  {
    href: '/calculator/calories',
    icon: '🥗',
    category: 'health',
    titles: { en: 'Calorie Calculator', ru: 'Калькулятор калорий', uk: 'Калькулятор калорій', fr: 'Calculatrice de calories', lt: 'Kalorijų skaičiuotuvas' },
    descs: { en: 'Calculate your daily calorie needs', ru: 'Рассчитайте суточную норму калорий', uk: 'Розрахуйте добову норму калорій', fr: 'Calculez vos besoins caloriques', lt: 'Apskaičiuokite dienos kalorijų poreikį' },
  },
  {
    href: '/calculator/pregnancy',
    icon: '🤰',
    category: 'health',
    titles: { en: 'Pregnancy Calculator', ru: 'Калькулятор беременности', uk: 'Калькулятор вагітності', fr: 'Calculatrice de grossesse', lt: 'Nėštumo skaičiuotuvas' },
    descs: { en: 'Calculate due date & track trimesters', ru: 'Рассчитайте ПДР и отследите триместры', uk: 'Розрахуйте дату пологів і триместри', fr: 'Calculez la date et suivez les trimestres', lt: 'Apskaičiuokite gimdymo datą ir trimestrus' },
  },
  {
    href: '/calculator/ideal-weight',
    icon: '⚖️',
    category: 'health',
    titles: { en: 'Ideal Weight Calculator', ru: 'Калькулятор идеального веса', uk: 'Калькулятор ідеальної ваги', fr: 'Poids Idéal', lt: 'Idealaus svorio skaičiuotuvas' },
    descs: { en: 'Find your healthy weight by height & gender', ru: 'Нормальный вес по росту и полу', uk: 'Нормальна вага за зростом і статтю', fr: 'Poids santé selon taille et sexe', lt: 'Sveiko svorio intervalas pagal ūgį ir lytį' },
  },
  {
    href: '/currency',
    icon: '💱',
    category: 'finance',
    titles: { en: 'Currency Converter', ru: 'Конвертер валют', uk: 'Конвертер валют', fr: 'Convertisseur de devises', lt: 'Valiutų keitiklis' },
    descs: { en: 'Live exchange rates', ru: 'Актуальные курсы валют', uk: 'Актуальні курси валют', fr: 'Taux de change en direct', lt: 'Aktualūs valiutų kursai' },
  },
  {
    href: '/currency/rates',
    icon: '📈',
    category: 'finance',
    titles: { en: 'Exchange Rates', ru: 'Курс валют', uk: 'Курс валют', fr: 'Taux de change', lt: 'Valiutų kursai' },
    descs: { en: 'Live table of 160+ world currencies', ru: 'Таблица курсов 160+ мировых валют', uk: 'Таблиця курсів 160+ світових валют', fr: 'Tableau de 160+ devises mondiales', lt: '160+ pasaulio valiutų kursų lentelė' },
  },
  {
    href: '/crypto',
    icon: '₿',
    category: 'crypto',
    titles: { en: 'Crypto Rates', ru: 'Курс криптовалют', uk: 'Курс криптовалют', fr: 'Cours des cryptos', lt: 'Kriptovaliutų kursai' },
    descs: { en: 'Bitcoin, Ethereum & top 50 coins', ru: 'Bitcoin, Ethereum и топ-50 монет', uk: 'Bitcoin, Ethereum та топ-50 монет', fr: 'Bitcoin, Ethereum et top 50', lt: 'Bitcoin, Ethereum ir top 50 monetų' },
  },
  {
    href: '/crypto/converter',
    icon: '🔄',
    category: 'crypto',
    titles: { en: 'Crypto Converter', ru: 'Конвертер криптовалют', uk: 'Конвертер криптовалют', fr: 'Convertisseur crypto', lt: 'Kriptovaliutų keitiklis' },
    descs: { en: 'Convert BTC, ETH to any currency', ru: 'Конвертируйте BTC, ETH в любую валюту', uk: 'Конвертуйте BTC, ETH у будь-яку валюту', fr: 'Convertissez BTC, ETH en devises', lt: 'Konvertuokite BTC, ETH į bet kurią valiutą' },
  },
  {
    href: '/weather',
    icon: '🌤️',
    category: 'utility',
    titles: { en: 'Weather Forecast', ru: 'Прогноз погоды', uk: 'Прогноз погоди', fr: 'Météo', lt: 'Oro prognozė' },
    descs: { en: 'Current weather & 7-day forecast', ru: 'Текущая погода и прогноз на 7 дней', uk: 'Поточна погода та прогноз на 7 днів', fr: 'Météo actuelle et prévisions 7 jours', lt: 'Dabartiniai orai ir 7 dienų prognozė' },
  },
  {
    href: '/calculator/alimony',
    icon: '⚖️',
    category: 'legal',
    titles: { en: 'Alimony Calculator', ru: 'Калькулятор алиментов', uk: 'Калькулятор аліментів', fr: 'Calculatrice de pension alimentaire', lt: 'Alimentų skaičiuotuvas' },
    descs: { en: 'Estimate child support by country & income', ru: 'Расчёт алиментов по стране и доходу', uk: 'Розрахунок аліментів за країною та доходом', fr: 'Estimez la pension par pays et revenus', lt: 'Apskaičiuokite alimentus pagal šalį ir pajamas' },
  },
  {
    href: '/calculator/rent-vs-buy',
    icon: '🏡',
    category: 'finance',
    titles: { en: 'Rent vs Buy', ru: 'Аренда vs Покупка', uk: 'Оренда vs Купівля', fr: 'Louer vs Acheter', lt: 'Nuoma vs Pirkimas' },
    descs: { en: 'Compare renting vs buying a home', ru: 'Сравните аренду и покупку жилья', uk: 'Порівняйте оренду та купівлю житла', fr: 'Comparez louer et acheter un logement', lt: 'Palyginkite nuomą ir pirkimą' },
  },
  {
    href: '/calculator/roi',
    icon: '📈',
    category: 'finance',
    titles: { en: 'ROI Calculator', ru: 'Калькулятор ROI', uk: 'Калькулятор ROI', fr: 'Calculatrice ROI', lt: 'RI skaičiuotuvas' },
    descs: { en: 'Calculate return on investment & CAGR', ru: 'Рассчитайте доходность инвестиций и CAGR', uk: 'Розрахуйте дохідність інвестицій і CAGR', fr: 'Calculez le ROI et le TCAM', lt: 'Apskaičiuokite investicijų grąžą ir CAGR' },
  },
  {
    href: '/calculator/pension',
    icon: '🏖️',
    category: 'finance',
    titles: { en: 'Pension Calculator', ru: 'Пенсионный калькулятор', uk: 'Пенсійний калькулятор', fr: 'Calculatrice Retraite', lt: 'Pensijų skaičiuotuvas' },
    descs: { en: 'Plan retirement savings & monthly payout', ru: 'Планируйте накопления и ежемесячную выплату', uk: 'Плануйте накопичення та щомісячну виплату', fr: 'Planifiez votre épargne retraite', lt: 'Planuokite pensijų santaupas ir išmokas' },
  },
  {
    href: '/tools/password-generator',
    icon: '🔐',
    category: 'utility',
    titles: { en: 'Password Generator', ru: 'Генератор паролей', uk: 'Генератор паролів', fr: 'Générateur de mot de passe', lt: 'Slaptažodžių generatorius' },
    descs: { en: 'Generate strong random or keyword-based passwords', ru: 'Создайте случайный или ключевой пароль', uk: 'Створіть випадковий або ключовий пароль', fr: 'Générez un mot de passe fort ou mémorisable', lt: 'Generuokite stiprų atsitiktinį arba rakto žodžio slaptažodį' },
  },
  {
    href: '/calculator/vat',
    icon: '🧾',
    category: 'finance',
    titles: { en: 'VAT Calculator', ru: 'Калькулятор НДС', uk: 'Калькулятор ПДВ', fr: 'Calculatrice TVA', lt: 'PVM skaičiuotuvas' },
    descs: { en: 'Add or extract VAT for 20+ countries', ru: 'Начислить или выделить НДС для 20+ стран', uk: 'Нарахувати або виділити ПДВ для 20+ країн', fr: 'Ajouter ou extraire la TVA pour 20+ pays', lt: 'Pridėti arba išskirti PVM 20+ šalių' },
  },
  {
    href: '/calculator/compound-interest',
    icon: '📊',
    category: 'finance',
    titles: { en: 'Compound Interest', ru: 'Сложные проценты', uk: 'Складні відсотки', fr: 'Intérêts composés', lt: 'Sudėtinės palūkanos' },
    descs: { en: 'See how your money grows over time', ru: 'Рассчитайте рост инвестиций с реинвестированием', uk: 'Розрахуйте зростання інвестицій з реінвестуванням', fr: 'Visualisez la croissance de votre capital', lt: 'Žiūrėkite, kaip auga jūsų pinigai laikui bėgant' },
  },
  {
    href: '/converter/units',
    icon: '📐',
    category: 'measure',
    titles: { en: 'Unit Converter', ru: 'Конвертер единиц', uk: 'Конвертер одиниць', fr: 'Convertisseur d\'unités', lt: 'Vienetų keitiklis' },
    descs: { en: 'Length, weight, temperature, volume & more', ru: 'Длина, масса, температура, объём и другое', uk: 'Довжина, маса, температура, об\'єм та інше', fr: 'Longueur, masse, température, volume et plus', lt: 'Ilgis, masė, temperatūra, tūris ir daugiau' },
  },
  {
    href: '/calculator/heart-rate',
    icon: '❤️',
    category: 'health',
    titles: { en: 'Heart Rate Zones', ru: 'Пульсовые зоны', uk: 'Пульсові зони', fr: 'Zones de FC', lt: 'Pulso zonos' },
    descs: { en: 'Calculate your 5 training zones by age', ru: 'Рассчитайте 5 тренировочных зон по возрасту', uk: 'Розрахуйте 5 тренувальних зон за віком', fr: 'Calculez vos 5 zones d\'entraînement', lt: 'Apskaičiuokite 5 treniruočių zonas pagal amžių' },
  },
  {
    href: '/calculator/tip',
    icon: '🍽️',
    category: 'utility',
    titles: { en: 'Tip Calculator', ru: 'Калькулятор чаевых', uk: 'Калькулятор чайових', fr: 'Calculatrice de pourboire', lt: 'Arbatpinigių skaičiuotuvas' },
    descs: { en: 'Calculate tip and split the bill', ru: 'Рассчитайте чаевые и разделите счёт', uk: 'Розрахуйте чайові та розділіть рахунок', fr: 'Calculez le pourboire et partagez l\'addition', lt: 'Apskaičiuokite arbatpinigius ir padalinkite sąskaitą' },
  },
  {
    href: '/calculator/age',
    icon: '🎂',
    category: 'utility',
    titles: { en: 'Age Calculator', ru: 'Калькулятор возраста', uk: 'Калькулятор віку', fr: 'Calculatrice d\'âge', lt: 'Amžiaus skaičiuotuvas' },
    descs: { en: 'Calculate your exact age and next birthday', ru: 'Точный возраст и обратный отсчёт до дня рождения', uk: 'Точний вік і відлік до дня народження', fr: 'Calculez votre âge exact et le prochain anniversaire', lt: 'Apskaičiuokite tikslų amžių ir artimiausią gimtadienį' },
  },
  {
    href: '/calculator/date-diff',
    icon: '📅',
    category: 'utility',
    titles: { en: 'Date Difference', ru: 'Разница дат', uk: 'Різниця дат', fr: 'Différence de dates', lt: 'Datų skirtumas' },
    descs: { en: 'Days, weeks & months between two dates', ru: 'Дни, недели и месяцы между двумя датами', uk: 'Дні, тижні та місяці між двома датами', fr: 'Jours, semaines et mois entre deux dates', lt: 'Dienos, savaitės ir mėnesiai tarp dviejų datų' },
  },
  {
    href: '/converter/color',
    icon: '🎨',
    category: 'measure',
    titles: { en: 'Color Converter', ru: 'Конвертер цветов', uk: 'Конвертер кольорів', fr: 'Convertisseur de couleurs', lt: 'Spalvų keitiklis' },
    descs: { en: 'Convert HEX, RGB and HSL colors instantly', ru: 'Конвертируйте HEX, RGB и HSL мгновенно', uk: 'Конвертуйте HEX, RGB та HSL миттєво', fr: 'Convertissez HEX, RVB et TSL instantanément', lt: 'Akimirksniu konvertuokite HEX, RGB ir HSL spalvas' },
  },
  {
    href: '/converter/clothing-size',
    icon: '👕',
    category: 'measure',
    titles: { en: 'Clothing Size Converter', ru: 'Конвертер размеров одежды', uk: 'Конвертер розмірів одягу', fr: 'Convertisseur de tailles', lt: 'Drabužių dydžių keitiklis' },
    descs: { en: 'EU, US, UK, IT sizes for men & women', ru: 'EU, US, UK, IT размеры для мужчин и женщин', uk: 'EU, US, UK, IT розміри для чоловіків і жінок', fr: 'Tailles EU, US, UK, IT hommes et femmes', lt: 'EU, US, UK, IT dydžiai vyrams ir moterims' },
  },
  {
    href: '/tools/countdown',
    icon: '⏳',
    category: 'utility',
    titles: { en: 'Countdown Timer', ru: 'Таймер обратного отсчёта', uk: 'Таймер зворотного відліку', fr: 'Compte à rebours', lt: 'Atgalinio skaičiavimo laikmatis' },
    descs: { en: 'Count down to any date or event', ru: 'Обратный отсчёт до любой даты или события', uk: 'Зворотний відлік до будь-якої дати або події', fr: 'Décomptez jusqu\'à n\'importe quelle date', lt: 'Skaičiuokite atgal iki bet kokios datos ar renginio' },
  },
  {
    href: '/calculator/traffic-fine',
    icon: '🚗',
    category: 'legal',
    titles: { en: 'Traffic Fine Calculator', ru: 'Штрафы ПДД', uk: 'Штрафи ПДР', fr: 'Amendes routières', lt: 'Eismo baudos' },
    descs: { en: 'Traffic fines by country & violation type', ru: 'Штрафы ПДД по стране и виду нарушения', uk: 'Штрафи ПДР за країною та видом порушення', fr: 'Amendes par pays et type d\'infraction', lt: 'Baudos pagal šalį ir pažeidimo tipą' },
  },
  {
    href: '/calculator/flight-delay',
    icon: '✈️',
    category: 'legal',
    titles: { en: 'Flight Delay Compensation', ru: 'Компенсация за задержку рейса', uk: 'Компенсація за затримку рейсу', fr: 'Indemnisation retard de vol', lt: 'Kompensacija už skrydžio vėlavimą' },
    descs: { en: 'Check EU261 compensation amount', ru: 'Проверьте компенсацию по EU261', uk: 'Перевірте компенсацію за EU261', fr: 'Vérifiez l\'indemnisation EU261', lt: 'Patikrinkite EU261 kompensaciją' },
  },
  {
    href: '/calculator/limitation',
    icon: '⏱️',
    category: 'legal',
    titles: { en: 'Statute of Limitations', ru: 'Срок исковой давности', uk: 'Строк позовної давності', fr: 'Délai de prescription', lt: 'Ieškinio senaties terminas' },
    descs: { en: 'Limitation periods by country & claim type', ru: 'Сроки исковой давности по стране и типу иска', uk: 'Строки позовної давності за країною та типом', fr: 'Délais de prescription par pays et type', lt: 'Senaties terminai pagal šalį ir ieškinio tipą' },
  },
  {
    href: '/calculator/renovation',
    icon: '🔨',
    category: 'realestate',
    titles: { en: 'Renovation Cost Calculator', ru: 'Калькулятор ремонта', uk: 'Калькулятор ремонту', fr: 'Coût de rénovation', lt: 'Remonto kainos skaičiuotuvas' },
    descs: { en: 'Estimate renovation costs per m² by country', ru: 'Стоимость ремонта за м² по стране', uk: 'Вартість ремонту за м² за країною', fr: 'Estimez le coût de rénovation au m²', lt: 'Įvertinkite remonto kainą m² pagal šalį' },
  },
  {
    href: '/calculator/property-tax',
    icon: '🏛️',
    category: 'realestate',
    titles: { en: 'Property Tax Calculator', ru: 'Налог на недвижимость', uk: 'Податок на нерухомість', fr: 'Taxe foncière', lt: 'Nekilnojamojo turto mokestis' },
    descs: { en: 'Annual property tax by country & type', ru: 'Годовой налог на недвижимость по стране', uk: 'Річний податок на нерухомість за країною', fr: 'Taxe foncière annuelle par pays et type', lt: 'Metinis turto mokestis pagal šalį ir tipą' },
  },
  {
    href: '/calculator/car-insurance',
    icon: '🚘',
    category: 'finance',
    titles: { en: 'Car Insurance Calculator', ru: 'Калькулятор страховки авто', uk: 'Калькулятор страховки авто', fr: 'Calculatrice assurance auto', lt: 'Automobilio draudimo skaičiuotuvas' },
    descs: { en: 'Estimate annual car insurance premium by country', ru: 'Оцените годовую страховку авто по стране', uk: 'Оцініть річну страховку авто за країною', fr: 'Estimez la prime d\'assurance auto par pays', lt: 'Įvertinkite metinę automobilio draudimo įmoką pagal šalį' },
  },
  {
    href: '/calculator/life-insurance',
    icon: '🛡️',
    category: 'finance',
    titles: { en: 'Life Insurance Calculator', ru: 'Калькулятор страховки жизни', uk: 'Калькулятор страховки життя', fr: 'Calculatrice assurance vie', lt: 'Gyvybės draudimo skaičiuotuvas' },
    descs: { en: 'Estimate monthly life insurance premium', ru: 'Оцените ежемесячный взнос по страховке жизни', uk: 'Оцініть щомісячний внесок по страховці життя', fr: 'Estimez la prime mensuelle d\'assurance vie', lt: 'Įvertinkite mėnesio gyvybės draudimo įmoką' },
  },
  {
    href: '/calculator/income-tax',
    icon: '💼',
    category: 'finance',
    titles: { en: 'Income Tax Calculator', ru: 'Калькулятор подоходного налога', uk: 'Калькулятор прибуткового податку', fr: 'Calculatrice impôt sur le revenu', lt: 'Pajamų mokesčio skaičiuotuvas' },
    descs: { en: 'Calculate income tax by country & tax brackets', ru: 'Рассчитайте подоходный налог по стране и ставкам', uk: 'Розрахуйте прибутковий податок за країною та ставками', fr: 'Calculez l\'impôt par pays et tranche', lt: 'Apskaičiuokite pajamų mokestį pagal šalį ir mokesčių grupes' },
  },
  {
    href: '/calculator/crypto-tax',
    icon: '🪙',
    category: 'crypto',
    titles: { en: 'Crypto Tax Calculator', ru: 'Налог на доход от крипты', uk: 'Податок на дохід від крипти', fr: 'Impôt sur les cryptos', lt: 'Kriptovaliutų mokesčių skaičiuotuvas' },
    descs: { en: 'Capital gains tax on crypto for 8 countries', ru: 'Налог на прирост капитала от крипты для 8 стран', uk: 'Податок на приріст капіталу від крипти для 8 країн', fr: 'Impôt sur les plus-values crypto pour 8 pays', lt: 'Kapitalo prieaugio mokestis kriptovaliutoms 8 šalims' },
  },
  {
    href: '/calculator/freelance-rate',
    icon: '💻',
    category: 'finance',
    titles: { en: 'Freelance Rate Calculator', ru: 'Калькулятор ставки фрилансера', uk: 'Калькулятор ставки фрилансера', fr: 'Calculatrice de taux freelance', lt: 'Laisvai samdomų tarifų skaičiuotuvas' },
    descs: { en: 'Find your minimum hourly freelance rate', ru: 'Найдите минимальную почасовую ставку фрилансера', uk: 'Знайдіть мінімальну погодинну ставку фрилансера', fr: 'Trouvez votre tarif horaire minimum freelance', lt: 'Raskite minimalų valandinį laisvai samdomų tarifą' },
  },
  {
    href: '/calculator/margin',
    icon: '📊',
    category: 'finance',
    titles: { en: 'Margin & Markup Calculator', ru: 'Калькулятор маржи и наценки', uk: 'Калькулятор маржі і націнки', fr: 'Calculatrice marge et majoration', lt: 'Maržos ir antkainių skaičiuotuvas' },
    descs: { en: 'Calculate profit margin and markup from cost', ru: 'Рассчитайте маржу и наценку по себестоимости', uk: 'Розрахуйте маржу і націнку за собівартістю', fr: 'Calculez marge et majoration depuis le coût', lt: 'Apskaičiuokite maržą ir antkainį iš savikainos' },
  },
  {
    href: '/calculator/gpa',
    icon: '🎓',
    category: 'utility',
    titles: { en: 'GPA Calculator', ru: 'Калькулятор GPA', uk: 'Калькулятор GPA', fr: 'Calculatrice GPA', lt: 'GPA skaičiuotuvas' },
    descs: { en: 'Calculate your Grade Point Average on the 4.0 scale', ru: 'Рассчитайте средний балл по шкале 4.0', uk: 'Розрахуйте середній бал за шкалою 4.0', fr: 'Calculez votre GPA sur l\'échelle 4,0', lt: 'Apskaičiuokite GPA pagal 4.0 skalę' },
  },
  {
    href: '/converter/grade-system',
    icon: '📝',
    category: 'utility',
    titles: { en: 'Grade System Converter', ru: 'Конвертер систем оценок', uk: 'Конвертер систем оцінок', fr: 'Convertisseur de notes', lt: 'Pažymių sistemų konverteris' },
    descs: { en: 'Convert grades between US GPA, UK, ECTS, Russian and German systems', ru: 'Переводите оценки между GPA, ECTS, российской и немецкой системами', uk: 'Переводьте оцінки між GPA, ECTS, українською та німецькою системами', fr: 'Convertissez entre GPA, ECTS, système russe et allemand', lt: 'Konvertuokite pažymius tarp GPA, ECTS, rusiškos ir vokiškos sistemų' },
  },
  {
    href: '/calculator/biological-age',
    icon: '🧬',
    category: 'health',
    titles: { en: 'Biological Age Calculator', ru: 'Калькулятор биологического возраста', uk: 'Калькулятор біологічного віку', fr: 'Calculatrice d\'âge biologique', lt: 'Biologinio amžiaus skaičiuotuvas' },
    descs: { en: 'Find out how old your body really is based on lifestyle', ru: 'Узнайте реальный возраст вашего тела по образу жизни', uk: 'Дізнайтесь реальний вік тіла за способом життя', fr: 'Découvrez l\'âge réel de votre corps selon votre mode de vie', lt: 'Sužinokite tikrąjį kūno amžių pagal gyvenimo būdą' },
  },
  {
    href: '/calculator/diabetes-risk',
    icon: '🩺',
    category: 'health',
    titles: { en: 'Diabetes Risk Calculator', ru: 'Калькулятор риска диабета', uk: 'Калькулятор ризику діабету', fr: 'Risque de diabète', lt: 'Diabeto rizikos skaičiuotuvas' },
    descs: { en: 'FINDRISC-based diabetes risk assessment in 2 minutes', ru: 'Оценка риска диабета по опроснику FINDRISC за 2 минуты', uk: 'Оцінка ризику діабету за опитувальником FINDRISC за 2 хвилини', fr: 'Évaluation du risque de diabète FINDRISC en 2 minutes', lt: 'FINDRISC diabeto rizikos įvertinimas per 2 minutes' },
  },
  {
    href: '/calculator/stress-level',
    icon: '🧘',
    category: 'health',
    titles: { en: 'Stress Level Calculator', ru: 'Калькулятор уровня стресса', uk: 'Калькулятор рівня стресу', fr: 'Calculatrice du niveau de stress', lt: 'Streso lygio skaičiuotuvas' },
    descs: { en: 'PSS-10 perceived stress test — 10 questions', ru: 'Тест PSS-10 на воспринимаемый стресс — 10 вопросов', uk: 'Тест PSS-10 на сприйнятий стрес — 10 питань', fr: 'Test PSS-10 du stress perçu — 10 questions', lt: 'PSS-10 suvokiamo streso testas — 10 klausimų' },
  },
  {
    href: '/tools/word-counter',
    icon: '📝',
    category: 'utility',
    titles: { en: 'Word Counter', ru: 'Счётчик слов', uk: 'Лічильник слів', fr: 'Compteur de mots', lt: 'Žodžių skaičiuotuvas' },
    descs: { en: 'Count words, characters, sentences & reading time', ru: 'Считайте слова, символы, предложения и время чтения', uk: 'Рахуйте слова, символи, речення та час читання', fr: 'Comptez mots, caractères, phrases et temps de lecture', lt: 'Skaičiuokite žodžius, simbolius, sakinius ir skaitymo laiką' },
  },
  {
    href: '/calculator/discount',
    icon: '🏷️',
    category: 'finance',
    titles: { en: 'Discount Calculator', ru: 'Калькулятор скидки', uk: 'Калькулятор знижки', fr: 'Calculatrice de remise', lt: 'Nuolaidos skaičiuotuvas' },
    descs: { en: 'Calculate final price, savings, and discount %', ru: 'Рассчитайте финальную цену, экономию и % скидки', uk: 'Розрахуйте фінальну ціну, економію та % знижки', fr: 'Calculez le prix final, les économies et le % de remise', lt: 'Apskaičiuokite galutinę kainą, santaupas ir nuolaidos %' },
  },
  {
    href: '/calculator/sleep',
    icon: '😴',
    category: 'health',
    titles: { en: 'Sleep Calculator', ru: 'Калькулятор сна', uk: 'Калькулятор сну', fr: 'Calculatrice du sommeil', lt: 'Miego skaičiuotuvas' },
    descs: { en: 'Best bedtimes & wake-up times based on 90-min sleep cycles', ru: 'Лучшее время сна по 90-минутным циклам сна', uk: 'Найкращий час сну за 90-хвилинними циклами', fr: 'Meilleurs horaires selon les cycles de 90 minutes', lt: 'Geriausias miego laikas pagal 90 min. ciklus' },
  },
  {
    href: '/calculator/percentage',
    icon: '%',
    category: 'utility',
    titles: { en: 'Percentage Calculator', ru: 'Калькулятор процентов', uk: 'Калькулятор відсотків', fr: 'Calculatrice de pourcentage', lt: 'Procentų skaičiuotuvas' },
    descs: { en: 'X% of Y, percent change, add/subtract percentages', ru: 'X% от Y, изменение в %, прибавить/вычесть проценты', uk: 'X% від Y, зміна у %, додати/відняти відсотки', fr: 'X% de Y, variation en %, ajouter/soustraire des %', lt: 'X% iš Y, procentinis pokytis, pridėti/atimti procentus' },
  },
  {
    href: '/calculator/basic',
    icon: '🔢',
    category: 'utility',
    titles: { en: 'Basic Calculator', ru: 'Простой калькулятор', uk: 'Простий калькулятор', fr: 'Calculatrice basique', lt: 'Paprastas skaičiuotuvas' },
    descs: { en: 'Simple online calculator — add, subtract, multiply, divide', ru: 'Простой онлайн-калькулятор — сложение, вычитание, умножение, деление', uk: 'Простий онлайн-калькулятор — додавання, віднімання, множення, ділення', fr: 'Calculatrice simple — addition, soustraction, multiplication, division', lt: 'Paprastas internetinis skaičiuotuvas — sudėtis, atimtis, dauginimas, dalinimas' },
  },
  {
    href: '/calculator/engineering',
    icon: '🔬',
    category: 'utility',
    titles: { en: 'Scientific Calculator', ru: 'Инженерный калькулятор', uk: 'Інженерний калькулятор', fr: 'Calculatrice scientifique', lt: 'Inžinerinis skaičiuotuvas' },
    descs: { en: 'Scientific calculator with sin, cos, tan, log, powers and more', ru: 'Инженерный калькулятор с sin, cos, tan, log, степенями и другими функциями', uk: 'Інженерний калькулятор з sin, cos, tan, log, степенями та іншими функціями', fr: 'Calculatrice scientifique avec sin, cos, tan, log, puissances et plus', lt: 'Mokslinis skaičiuotuvas su sin, cos, tan, log, laipsniais ir daugiau' },
  },
  {
    href: '/calculator/body-fat',
    icon: '📏',
    category: 'health',
    titles: { en: 'Body Fat Calculator', ru: 'Калькулятор % жира в теле', uk: 'Калькулятор % жиру в тілі', fr: 'Calculatrice de graisse corporelle', lt: 'Kūno riebalų skaičiuotuvas' },
    descs: { en: 'Body fat % using the US Navy method', ru: '% жира в теле по методу ВМФ США', uk: '% жиру в тілі за методом ВМС США', fr: '% de graisse corporelle méthode US Navy', lt: 'Kūno riebalų % pagal JAV karinio jūrų laivyno metodą' },
  },
  {
    href: '/calculator/water-intake',
    icon: '💧',
    category: 'health',
    titles: { en: 'Water Intake Calculator', ru: 'Норма воды в день', uk: 'Норма води на день', fr: 'Apport en eau quotidien', lt: 'Vandens normos skaičiuotuvas' },
    descs: { en: 'Daily water intake by weight & activity', ru: 'Суточная норма воды по весу и активности', uk: 'Добова норма води за вагою та активністю', fr: 'Apport quotidien en eau selon poids et activité', lt: 'Dienos vandens norma pagal svorį ir aktyvumą' },
  },
  {
    href: '/calculator/ovulation',
    icon: '🌸',
    category: 'health',
    titles: { en: 'Ovulation Calculator', ru: 'Калькулятор овуляции', uk: 'Калькулятор овуляції', fr: 'Calculatrice d\'ovulation', lt: 'Ovuliacijos skaičiuotuvas' },
    descs: { en: 'Fertile window, ovulation date & due date', ru: 'Фертильное окно, дата овуляции и ПДР', uk: 'Фертильне вікно, дата овуляції та ПДП', fr: 'Fenêtre fertile, date d\'ovulation et accouchement', lt: 'Vaisingas langas, ovuliacijos data ir gimdymas' },
  },
  {
    href: '/converter/timezone',
    icon: '🕐',
    category: 'utility',
    titles: { en: 'Timezone Converter', ru: 'Конвертер часовых поясов', uk: 'Конвертер часових поясів', fr: 'Convertisseur de fuseaux horaires', lt: 'Laiko juostų keitiklis' },
    descs: { en: 'World clock — convert time across 25 cities', ru: 'Мировые часы — время в 25 городах мира', uk: 'Світовий годинник — час у 25 містах світу', fr: 'Horloge mondiale — heure dans 25 villes', lt: 'Pasaulio laikrodis — laikas 25 miestuose' },
  },
  {
    href: '/calculator/salary',
    icon: '💰',
    category: 'finance',
    titles: { en: 'Gross to Net Salary Calculator', ru: 'Калькулятор зарплаты брутто-нетто', uk: 'Калькулятор зарплати брутто-нетто', fr: 'Calculateur Salaire Brut-Net', lt: 'Bruto-Neto Atlyginimo Skaičiuotuvas' },
    descs: { en: 'Calculate take-home pay after taxes for 24 countries', ru: 'Рассчитайте нетто-зарплату с учётом налогов для 24 стран', uk: 'Розрахуйте нетто-зарплату з урахуванням податків для 24 країн', fr: 'Calculez le salaire net après impôts pour 24 pays', lt: 'Apskaičiuokite neto atlyginimą po mokesčių 24 šalių' },
  },
  {
    href: '/calculator/life-path',
    icon: '🔢',
    category: 'esoteric',
    titles: { en: 'Life Path Number', ru: 'Число жизненного пути', uk: 'Число життєвого шляху', fr: 'Chemin de Vie', lt: 'Gyvenimo kelio skaičius' },
    descs: { en: 'Discover your core numerology number from your birth date', ru: 'Узнайте своё ключевое число нумерологии по дате рождения', uk: 'Дізнайтеся своє ключове число нумерології за датою народження', fr: 'Découvrez votre nombre numérologique clé depuis votre date de naissance', lt: 'Sužinokite savo pagrindinį numerologinį skaičių iš gimimo datos' },
  },
  {
    href: '/calculator/destiny-number',
    icon: '✨',
    category: 'esoteric',
    titles: { en: 'Destiny Number', ru: 'Число судьбы', uk: 'Число долі', fr: 'Nombre Destin', lt: 'Likimo skaičius' },
    descs: { en: 'Calculate the numerology number that reveals your life mission', ru: 'Рассчитайте число нумерологии, раскрывающее жизненное предназначение', uk: 'Розрахуйте число нумерології, що розкриває місію вашого життя', fr: 'Calculez le nombre qui révèle votre mission de vie', lt: 'Apskaičiuokite skaičių, atskleidžiantį jūsų gyvenimo misiją' },
  },
  {
    href: '/calculator/name-number',
    icon: '🔤',
    category: 'esoteric',
    titles: { en: 'Name Number', ru: 'Число имени', uk: 'Число імені', fr: 'Nombre du Nom', lt: 'Vardo skaičius' },
    descs: { en: 'Find the Pythagorean numerology vibration of your name', ru: 'Найдите пифагорейскую нумерологическую вибрацию вашего имени', uk: 'Знайдіть піфагорійську нумерологічну вібрацію вашого імені', fr: 'Trouvez la vibration pythagoricienne de votre nom', lt: 'Raskite savo vardo Pitagoro numerologinę vibraciją' },
  },
  {
    href: '/calculator/soul-number',
    icon: '💫',
    category: 'esoteric',
    titles: { en: 'Soul Number', ru: 'Число души', uk: 'Число душі', fr: "Nombre de l'Âme", lt: 'Sielos skaičius' },
    descs: { en: "Reveal your heart's deepest desire from your name's vowels", ru: 'Раскройте глубинное желание сердца по гласным вашего имени', uk: 'Розкрийте найглибше бажання серця за голосними вашого імені', fr: 'Révélez le désir le plus profond de votre cœur par les voyelles de votre nom', lt: 'Atskleiskite giliausią širdies troškimą iš savo vardo balsių' },
  },
  {
    href: '/calculator/personality-number',
    icon: '🎭',
    category: 'esoteric',
    titles: { en: 'Personality Number', ru: 'Число личности', uk: 'Число особистості', fr: 'Nombre de Personnalité', lt: 'Asmenybės skaičius' },
    descs: { en: 'Discover the outer image you project to the world by your name', ru: 'Узнайте внешний образ, который вы транслируете миру, по согласным имени', uk: 'Дізнайтеся зовнішній образ, що транслюється світу, за приголосними імені', fr: "Découvrez l'image extérieure que vous projetez au monde par votre nom", lt: 'Sužinokite išorinį įvaizdį, kurį projektuojate pasauliui, iš savo vardo' },
  },
  {
    href: '/calculator/personal-year',
    icon: '📅',
    category: 'esoteric',
    titles: { en: 'Personal Year', ru: 'Персональный год', uk: 'Персональний рік', fr: 'Année Personnelle', lt: 'Asmeniniai metai' },
    descs: { en: 'Discover the numerological theme of your current year', ru: 'Узнайте нумерологическую тему текущего года', uk: 'Дізнайтеся нумерологічну тему поточного року', fr: "Découvrez le thème numérologique de votre année", lt: 'Sužinokite jūsų einamųjų metų numerologinę temą' },
  },
  {
    href: '/calculator/numerology-compatibility',
    icon: '💞',
    category: 'esoteric',
    titles: { en: 'Numerology Compatibility', ru: 'Совместимость по нумерологии', uk: 'Сумісність за нумерологією', fr: 'Compatibilité Numérologique', lt: 'Numerologinis suderinamumas' },
    descs: { en: 'Check relationship compatibility by Life Path numbers', ru: 'Проверьте совместимость пары по числам жизненного пути', uk: 'Перевірте сумісність пари за числами шляху життя', fr: "Vérifiez la compatibilité par les Chemins de Vie", lt: 'Patikrinkite poros suderinamumą pagal Gyvenimo kelio skaičius' },
  },
  {
    href: '/calculator/pythagorean-matrix',
    icon: '🔲',
    category: 'esoteric',
    titles: { en: 'Pythagorean Matrix', ru: 'Матрица Пифагора', uk: 'Матриця Піфагора', fr: 'Matrice Pythagoricienne', lt: 'Pitagoro matrica' },
    descs: { en: 'Build your Psychomatrix 3×3 grid from your birth date', ru: 'Составьте психоматрицу 3×3 по дате рождения', uk: 'Складіть психоматрицю 3×3 за датою народження', fr: "Construisez votre Psychomatrice 3×3 par date de naissance", lt: 'Sukurkite savo 3×3 psichomatricą pagal gimimo datą' },
  },
  {
    href: '/calculator/karmic-number',
    icon: '⚖️',
    category: 'esoteric',
    titles: { en: 'Karmic Numbers', ru: 'Кармические числа', uk: 'Кармічні числа', fr: 'Nombres Karmiques', lt: 'Karminiai skaičiai' },
    descs: { en: 'Find karmic debts by detecting missing digits in your birth date', ru: 'Найдите кармические долги по отсутствующим цифрам даты рождения', uk: 'Знайдіть кармічні борги за відсутніми цифрами дати народження', fr: "Trouvez vos dettes karmiques par les chiffres manquants", lt: 'Raskite karmines skolas pagal trūkstamus skaitmenis gimimo datoje' },
  },
  {
    href: '/calculator/zodiac-sign',
    icon: '♈',
    category: 'esoteric',
    titles: { en: 'Zodiac Sign', ru: 'Знак зодиака', uk: 'Знак зодіаку', fr: 'Signe du Zodiaque', lt: 'Zodiako ženklas' },
    descs: { en: 'Find your star sign, element and ruling planet by birth date', ru: 'Узнайте знак зодиака, элемент и планету по дате рождения', uk: 'Дізнайтеся знак зодіаку, елемент і планету за датою народження', fr: "Trouvez votre signe astrologique, élément et planète par date de naissance", lt: 'Sužinokite savo zodiako ženklą, elementą ir planetą pagal gimimo datą' },
  },
  {
    href: '/calculator/chinese-zodiac',
    icon: '🐉',
    category: 'esoteric',
    titles: { en: 'Chinese Zodiac', ru: 'Китайский гороскоп', uk: 'Китайський гороскоп', fr: 'Zodiaque Chinois', lt: 'Kinų zodiako ženklas' },
    descs: { en: 'Find your Chinese zodiac animal, element and yin/yang by birth year', ru: 'Найдите своё животное, стихию и инь/ян по году рождения', uk: 'Знайдіть свою тварину, стихію та інь/ян за роком народження', fr: 'Trouvez votre animal, élément et yin/yang par année de naissance', lt: 'Raskite savo gyvūną, elementą ir yin/yang pagal gimimo metus' },
  },
  {
    href: '/calculator/celtic-zodiac',
    icon: '🌿',
    category: 'esoteric',
    titles: { en: 'Celtic Zodiac', ru: 'Кельтский зодиак', uk: 'Кельтський зодіак', fr: 'Zodiaque Celtique', lt: 'Keltų zodiako ženklas' },
    descs: { en: 'Discover your Celtic tree sign from the Druidic Ogham calendar', ru: 'Узнайте своё дерево-символ по кельтскому друидическому календарю', uk: 'Дізнайтеся своє дерево-символ за кельтським друїдичним календарем', fr: "Découvrez votre signe arbre du calendrier druidique oghamique", lt: 'Sužinokite savo medžio ženklą iš druidų Ogham kalendoriaus' },
  },
  {
    href: '/calculator/zodiac-compatibility',
    icon: '💕',
    category: 'esoteric',
    titles: { en: 'Zodiac Compatibility', ru: 'Совместимость знаков', uk: 'Сумісність знаків', fr: 'Compatibilité Astrologique', lt: 'Ženklų suderinamumas' },
    descs: { en: 'Check compatibility score between any two zodiac signs', ru: 'Проверьте совместимость любых двух знаков зодиака', uk: 'Перевірте сумісність будь-яких двох знаків зодіаку', fr: "Vérifiez le score de compatibilité entre deux signes du zodiaque", lt: 'Patikrinkite dviejų zodiako ženklų suderinamumą' },
  },
  {
    href: '/calculator/mercury-retrograde',
    icon: '☿',
    category: 'esoteric',
    titles: { en: 'Mercury Retrograde', ru: 'Меркурий ретроградный', uk: 'Меркурій ретроградний', fr: 'Mercure Rétrograde', lt: 'Merkurijaus retrogradas' },
    descs: { en: 'Check if Mercury is retrograde now and see all upcoming dates 2025–2029', ru: 'Проверьте ретроградность Меркурия сейчас и посмотрите даты 2025–2029', uk: 'Перевірте ретроградність Меркурія та перегляньте дати 2025–2029', fr: "Vérifiez si Mercure est rétrograde maintenant et dates 2025–2029", lt: 'Patikrinkite ar Merkurijus yra retrogradinis ir datos 2025–2029' },
  },
  {
    href: '/calculator/angel-number',
    icon: '👼',
    category: 'esoteric',
    titles: { en: 'Angel Number', ru: 'Число ангела', uk: 'Число ангела', fr: 'Nombre Angélique', lt: 'Angelo skaičius' },
    descs: { en: 'Look up the meaning of any angel number from 111 to 9999', ru: 'Узнайте значение любого числа ангела от 111 до 9999', uk: 'Дізнайтеся значення будь-якого числа ангела від 111 до 9999', fr: "Découvrez la signification de tout nombre angélique de 111 à 9999", lt: 'Sužinokite bet kurio angelo skaičiaus reikšmę nuo 111 iki 9999' },
  },
  {
    href: '/calculator/archetype-number',
    icon: '🧬',
    category: 'esoteric',
    titles: { en: 'Personality Archetype', ru: 'Архетип личности', uk: 'Архетип особистості', fr: 'Archétype de Personnalité', lt: 'Asmenybės archetipas' },
    descs: { en: 'Discover your personality archetype from your life path number', ru: 'Узнайте архетип личности по числу жизненного пути', uk: 'Дізнайтеся архетип особистості за числом шляху життя', fr: "Découvrez votre archétype de personnalité selon votre chemin de vie", lt: 'Sužinokite savo asmenybės archetipą pagal gyvenimo kelio numerį' },
  },
  {
    href: '/calculator/biorhythm',
    icon: '〰️',
    category: 'esoteric',
    titles: { en: 'Biorhythm Calculator', ru: 'Биоритмы', uk: 'Біоритми', fr: 'Biorythmes', lt: 'Bioritmas' },
    descs: { en: 'Calculate your physical, emotional and intellectual cycles with a 30-day chart', ru: 'Рассчитайте физический, эмоциональный и интеллектуальный циклы с графиком на 30 дней', uk: 'Розрахуйте фізичний, емоційний та інтелектуальний цикли з графіком на 30 днів', fr: "Calculez vos cycles physique, émotionnel et intellectuel avec un graphique 30 jours", lt: 'Apskaičiuokite savo fizinius, emocinius ir intelektualinius ciklus su 30 dienų grafiku' },
  },
  {
    href: '/calculator/moon-phases',
    icon: '🌕',
    category: 'esoteric',
    titles: { en: 'Moon Phase Calculator', ru: 'Лунный календарь', uk: 'Фази місяця', fr: 'Phases de la Lune', lt: 'Mėnulio fazės' },
    descs: { en: 'Current lunar phase, illumination % and upcoming New Moon & Full Moon dates', ru: 'Фаза луны сегодня, освещённость и даты ближайших новолуний и полнолуний', uk: 'Фаза місяця сьогодні, освітленість і дати найближчих новолунь і повних місяців', fr: 'Phase lunaire actuelle, illumination % et prochaines Nouvelle Lune & Pleine Lune', lt: 'Dabartinė mėnulio fazė, apšvietimas % ir artimiausi jauno mėnulio bei pilnaties datos' },
  },
  {
    href: '/calculator/moon-sign',
    icon: '🌙',
    category: 'esoteric',
    titles: { en: 'Moon Sign Calculator', ru: 'Лунный знак', uk: 'Місячний знак', fr: 'Signe Lunaire', lt: 'Mėnulio ženklas' },
    descs: { en: 'Find your lunar zodiac sign by date, time and timezone. Element, ruling planet and character description', ru: 'Лунный знак зодиака по дате и времени рождения. Стихия, управитель и описание характера', uk: 'Місячний знак зодіаку за датою і часом народження. Стихія, управитель і опис характеру', fr: 'Signe lunaire du zodiaque par date, heure et fuseau horaire. Élément et planète dominante', lt: 'Mėnulio zodiako ženklas pagal gimimo datą, laiką ir laiko juostą. Elementas ir valdančioji planeta' },
  },
  {
    href: '/calculator/fuel-cost',
    icon: '⛽',
    category: 'utility',
    titles: { en: 'Fuel Cost Calculator', ru: 'Калькулятор расхода топлива', uk: 'Калькулятор витрат на пальне', fr: 'Calculatrice Coût Carburant', lt: 'Degalų kainos skaičiuotuvas' },
    descs: { en: 'Calculate petrol & diesel cost for any trip', ru: 'Рассчитайте стоимость топлива для поездки', uk: 'Розрахуйте вартість пального для поїздки', fr: 'Estimez le coût carburant pour tout trajet', lt: 'Apskaičiuokite degalų kainą bet kuriai kelionei' },
  },
  {
    href: '/calculator/electricity-bill',
    icon: '💡',
    category: 'utility',
    titles: { en: 'Electricity Bill Calculator', ru: 'Калькулятор электроэнергии', uk: 'Калькулятор електроенергії', fr: 'Calculatrice Facture Électricité', lt: 'Elektros sąskaitos skaičiuotuvas' },
    descs: { en: 'Calculate monthly electricity cost for any appliance', ru: 'Рассчитайте расход электроэнергии для любого прибора', uk: 'Розрахуйте споживання електроенергії будь-якого приладу', fr: 'Calculez la facture d\'électricité de vos appareils', lt: 'Apskaičiuokite elektros sąskaitą bet kuriam prietaisui' },
  },
  {
    href: '/calculator/savings-goal',
    icon: '🎯',
    category: 'finance',
    titles: { en: 'Savings Goal Calculator', ru: 'Калькулятор накоплений', uk: 'Калькулятор накопичень', fr: 'Calculatrice Objectif Épargne', lt: 'Taupymo tikslo skaičiuotuvas' },
    descs: { en: 'Find out when you\'ll reach your savings goal', ru: 'Узнайте, когда достигнете цели по накоплениям', uk: 'Дізнайтеся, коли досягнете цілі по заощадженнях', fr: 'Découvrez quand vous atteindrez votre objectif', lt: 'Sužinokite, kada pasieksite taupymo tikslą' },
  },
  {
    href: '/calculator/calorie-deficit',
    icon: '🔥',
    category: 'health',
    titles: { en: 'Calorie Deficit Calculator', ru: 'Калькулятор дефицита калорий', uk: 'Калькулятор дефіциту калорій', fr: 'Calculatrice Déficit Calorique', lt: 'Kalorijų deficito skaičiuotuvas' },
    descs: { en: 'Calculate daily calorie deficit to reach your weight goal', ru: 'Рассчитайте ежедневный дефицит калорий для похудения', uk: 'Розрахуйте щоденний дефіцит калорій для схуднення', fr: 'Calculez votre déficit calorique quotidien', lt: 'Apskaičiuokite dienos kalorijų deficitą svoriui numesti' },
  },
  {
    href: '/calculator/net-worth',
    icon: '💎',
    category: 'finance',
    titles: { en: 'Net Worth Calculator', ru: 'Калькулятор чистых активов', uk: 'Калькулятор чистих активів', fr: 'Calculatrice Valeur Nette', lt: 'Grynosios vertės skaičiuotuvas' },
    descs: { en: 'Calculate your net worth from assets and liabilities', ru: 'Рассчитайте чистые активы из активов и обязательств', uk: 'Розрахуйте чисті активи з активів та зобов\'язань', fr: 'Calculez votre valeur nette selon actifs et passifs', lt: 'Apskaičiuokite grynąją vertę iš turto ir įsipareigojimų' },
  },
  {
    href: '/calculator/pace',
    icon: '🏃',
    category: 'health',
    titles: { en: 'Running / Cycling Pace Calculator', ru: 'Калькулятор темпа бега/велосипеда', uk: 'Калькулятор темпу бігу/велосипеда', fr: 'Calculatrice Allure Course/Vélo', lt: 'Bėgimo / dviračio tempo skaičiuotuvas' },
    descs: { en: 'Calculate pace, time or distance for running and cycling', ru: 'Рассчитайте темп, время или дистанцию для бега и велосипеда', uk: 'Розрахуйте темп, час або дистанцію для бігу та велосипеда', fr: 'Calculez allure, temps ou distance pour course et vélo', lt: 'Apskaičiuokite tempą, laiką ar atstumą bėgimui ir dviračiui' },
  },
  {
    href: '/calculator/macros',
    icon: '🥗',
    category: 'health',
    titles: { en: 'Macro Calculator', ru: 'Калькулятор КБЖУ', uk: 'Калькулятор КБЖВ', fr: 'Calculatrice Macros', lt: 'Makroelementų skaičiuotuvas' },
    descs: { en: 'Calculate daily protein, fat and carb targets based on your goal', ru: 'Рассчитайте суточные нормы белков, жиров и углеводов', uk: 'Розрахуйте добові норми білків, жирів і вуглеводів', fr: 'Calculez vos besoins journaliers en protéines, lipides, glucides', lt: 'Apskaičiuokite dienos baltymų, riebalų ir angliavandenių normas' },
  },
  {
    href: '/calculator/ac-cost',
    icon: '❄️',
    category: 'utility',
    titles: { en: 'AC & Heating Cost Calculator', ru: 'Калькулятор кондиционера и отопления', uk: 'Калькулятор кондиціонера та опалення', fr: 'Calculatrice Climatisation & Chauffage', lt: 'Kondicionieriaus ir šildymo išlaidų skaičiuotuvas' },
    descs: { en: 'Estimate monthly electricity cost for air conditioning or heating', ru: 'Оцените ежемесячные расходы на электроэнергию для кондиционера', uk: 'Оцініть щомісячні витрати на електроенергію для кондиціонера', fr: 'Estimez le coût mensuel d\'électricité pour climatisation ou chauffage', lt: 'Įvertinkite mėnesines elektros išlaidas kondicionavimui ar šildymui' },
  },
  {
    href: '/calculator/travel-budget',
    icon: '✈️',
    category: 'finance',
    titles: { en: 'Travel Budget Calculator', ru: 'Калькулятор бюджета путешествия', uk: 'Калькулятор бюджету подорожі', fr: 'Calculatrice Budget Voyage', lt: 'Kelionės biudžeto skaičiuotuvas' },
    descs: { en: 'Plan your trip budget: accommodation, food, transport, activities', ru: 'Планируйте бюджет поездки: жильё, еда, транспорт, развлечения', uk: 'Плануйте бюджет поїздки: житло, їжа, транспорт, розваги', fr: 'Planifiez votre budget voyage: hébergement, nourriture, transport', lt: 'Planuokite kelionės biudžetą: nakvynė, maistas, transportas' },
  },
  {
    href: '/calculator/material-cost',
    icon: '🧱',
    category: 'utility',
    titles: { en: 'Flooring, Paint & Concrete Calculator', ru: 'Калькулятор покрытий, краски и бетона', uk: 'Калькулятор покриттів, фарби та бетону', fr: 'Calculatrice Revêtement, Peinture & Béton', lt: 'Grindų, dažų ir betono skaičiuotuvas' },
    descs: { en: 'Calculate flooring, paint or concrete quantity and cost for any room', ru: 'Рассчитайте количество и стоимость покрытий, краски или бетона', uk: 'Розрахуйте кількість і вартість покриттів, фарби або бетону', fr: 'Calculez la quantité et le coût de revêtement, peinture ou béton', lt: 'Apskaičiuokite grindų, dažų ar betono kiekį ir kainą' },
  },
  {
    href: '/calculator/party-food',
    icon: '🎉',
    category: 'utility',
    titles: { en: 'Party Food Calculator', ru: 'Калькулятор продуктов для вечеринки', uk: 'Калькулятор продуктів для вечірки', fr: 'Calculatrice Buffet Fête', lt: 'Šventinių produktų skaičiuotuvas' },
    descs: { en: 'Calculate food and drink quantities for BBQ, buffet or cocktail parties', ru: 'Рассчитайте количество еды и напитков для барбекю или фуршета', uk: 'Розрахуйте кількість їжі та напоїв для вечірки або барбекю', fr: 'Calculez les quantités de nourriture et boissons pour votre fête', lt: 'Apskaičiuokite maisto ir gėrimų kiekius šventei ar BBQ' },
  },
  {
    href: '/calculator/pool-volume',
    icon: '🏊',
    category: 'utility',
    titles: { en: 'Pool Volume Calculator', ru: 'Калькулятор объёма бассейна', uk: 'Калькулятор об\'єму басейну', fr: 'Calculatrice Volume Piscine', lt: 'Baseino tūrio skaičiuotuvas' },
    descs: { en: 'Calculate swimming pool volume in litres and gallons with chemical estimates', ru: 'Рассчитайте объём бассейна в литрах и галлонах с дозировками химии', uk: 'Розрахуйте об\'єм басейну в літрах і галонах з дозуваннями хімії', fr: 'Calculez le volume de piscine en litres et gallons avec dosages chimiques', lt: 'Apskaičiuokite baseino tūrį litrais ir galonais su cheminių medžiagų kiekiais' },
  },
  {
    href: '/calculator/spf',
    icon: '☀️',
    category: 'health',
    titles: { en: 'SPF Calculator', ru: 'Калькулятор SPF', uk: 'Калькулятор SPF', fr: 'Calculatrice SPF', lt: 'SPF skaičiuotuvas' },
    descs: { en: 'Calculate sun protection time by skin type, SPF value and UV index', ru: 'Рассчитайте время защиты от солнца по типу кожи, SPF и УФ-индексу', uk: 'Розрахуйте час сонцезахисту за типом шкіри, SPF та УФ-індексом', fr: 'Calculez le temps de protection solaire par type de peau, SPF et indice UV', lt: 'Apskaičiuokite apsaugos nuo saulės laiką pagal odos tipą, SPF ir UV indeksą' },
  },
  {
    href: '/calculator/inflation',
    icon: '📈',
    category: 'finance',
    titles: { en: 'Inflation Calculator', ru: 'Калькулятор инфляции', uk: 'Калькулятор інфляції', fr: 'Calculatrice Inflation', lt: 'Infliacijos skaičiuotuvas' },
    descs: { en: 'Calculate the future or past purchasing power of money', ru: 'Рассчитайте будущую или прошлую покупательную способность денег', uk: 'Розрахуйте майбутню або минулу купівельну спроможність грошей', fr: 'Calculez la valeur future ou passée de votre argent', lt: 'Apskaičiuokite pinigų būsimąją arba praeities perkamąją galią' },
  },
  {
    href: '/calculator/loan-payoff',
    icon: '💳',
    category: 'finance',
    titles: { en: 'Loan Early Payoff Calculator', ru: 'Калькулятор досрочного погашения', uk: 'Калькулятор дострокового погашення', fr: 'Calculatrice Remboursement Anticipé', lt: 'Išankstinio paskolos grąžinimo skaičiuotuvas' },
    descs: { en: 'See how much interest you save by making extra loan payments', ru: 'Узнайте, сколько экономите на процентах при досрочных платежах', uk: 'Дізнайтеся, скільки економите на відсотках при додаткових платежах', fr: 'Calculez les intérêts économisés grâce aux paiements supplémentaires', lt: 'Sužinokite, kiek palūkanų sutaupysite mokant papildomai' },
  },
];

const PAGE_TITLE: Record<string, string> = {
  en: 'Free Online Tools',
  ru: 'Бесплатные онлайн-инструменты',
  uk: 'Безкоштовні онлайн-інструменти',
  fr: 'Outils en ligne gratuits',
  lt: 'Nemokomi internetiniai įrankiai',
};

export default async function HomePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;

  const tools: ToolItem[] = RAW_TOOLS.map((t) => ({
    href: t.href,
    icon: t.icon,
    category: t.category,
    title: t.titles[locale] || t.titles.en,
    desc: t.descs[locale] || t.descs.en,
  }));

  return (
    <div className={styles.home}>
      <div className="container">
        <h1 className={styles.home__title}>{PAGE_TITLE[locale] || PAGE_TITLE.en}</h1>
        <ToolGrid locale={locale} tools={tools} initialCategory={category} />
        <div className={styles.home__ad}>
          <AdPlaceholder locale={locale} size="banner" />
        </div>
      </div>
      <aside className={styles['home__side-ad']}>
        <AdSidebar locale={locale} />
      </aside>
    </div>
  );
}
