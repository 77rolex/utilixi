import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ToolGrid, { type ToolItem } from '@/components/home/ToolGrid';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ locale: string }>;
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
    en: 'Free online tools — mortgage calculator, BMI, calorie counter, currency converter and more.',
    ru: 'Бесплатные онлайн-инструменты — ипотечный калькулятор, ИМТ, счётчик калорий, конвертер валют и другие.',
    uk: 'Безкоштовні онлайн-інструменти — іпотечний калькулятор, ІМТ, лічильник калорій, конвертер валют та інші.',
    fr: 'Outils en ligne gratuits — calculatrice de prêt immobilier, IMC, compteur de calories, convertisseur de devises et plus.',
    lt: 'Nemokomi internetiniai įrankiai — hipotekos skaičiuotuvas, KMI, kalorijų skaičiuotuvas, valiutų keitiklis ir daugiau.',
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: buildAlternates(locale, ''),
  };
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
];

const PAGE_TITLE: Record<string, string> = {
  en: 'Free Online Tools',
  ru: 'Бесплатные онлайн-инструменты',
  uk: 'Безкоштовні онлайн-інструменти',
  fr: 'Outils en ligne gratuits',
  lt: 'Nemokomi internetiniai įrankiai',
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

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
        <ToolGrid locale={locale} tools={tools} />
        <div className={styles.home__ad}>
          <AdPlaceholder locale={locale} size="banner" />
        </div>
      </div>
    </div>
  );
}
