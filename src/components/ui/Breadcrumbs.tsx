'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';

type ToolCategory = 'finance' | 'crypto' | 'health' | 'utility' | 'legal' | 'measure' | 'realestate' | 'esoteric';

const CATEGORY_LABELS: Record<string, Record<ToolCategory, string>> = {
  en: { finance: 'Finance', crypto: 'Crypto', health: 'Health', utility: 'Utilities', legal: 'Legal', measure: 'Measurements', realestate: 'Real Estate', esoteric: 'Esoteric' },
  ru: { finance: 'Финансы', crypto: 'Криптовалюта', health: 'Здоровье', utility: 'Утилиты', legal: 'Юридические', measure: 'Измерения', realestate: 'Недвижимость', esoteric: 'Эзотерика' },
  uk: { finance: 'Фінанси', crypto: 'Криптовалюта', health: "Здоров'я", utility: 'Утиліти', legal: 'Юридичні', measure: 'Вимірювання', realestate: 'Нерухомість', esoteric: 'Езотерика' },
  fr: { finance: 'Finance', crypto: 'Crypto', health: 'Santé', utility: 'Utilitaires', legal: 'Juridique', measure: 'Mesures', realestate: 'Immobilier', esoteric: 'Ésotérique' },
  lt: { finance: 'Finansai', crypto: 'Kripto', health: 'Sveikata', utility: 'Priemonės', legal: 'Teisiniai', measure: 'Matavimai', realestate: 'Nekilnojamasis turtas', esoteric: 'Ezoterika' },
};

const HOME_LABEL: Record<string, string> = {
  en: 'Home', ru: 'Главная', uk: 'Головна', fr: 'Accueil', lt: 'Pradžia',
};

type ToolMeta = { category: ToolCategory; titles: Record<string, string> };

const TOOL_META: Record<string, ToolMeta> = {
  '/calculator/mortgage': { category: 'finance', titles: { en: 'Mortgage Calculator', ru: 'Ипотечный калькулятор', uk: 'Іпотечний калькулятор', fr: 'Calculatrice de prêt immobilier', lt: 'Hipotekos skaičiuotuvas' } },
  '/calculator/loan': { category: 'finance', titles: { en: 'Loan Calculator', ru: 'Калькулятор кредита', uk: 'Калькулятор кредиту', fr: 'Calculatrice de prêt', lt: 'Paskolos skaičiuotuvas' } },
  '/calculator/deposit': { category: 'finance', titles: { en: 'Deposit Calculator', ru: 'Калькулятор депозита', uk: 'Калькулятор депозиту', fr: 'Calculatrice de dépôt', lt: 'Indėlio skaičiuotuvas' } },
  '/calculator/bmi': { category: 'health', titles: { en: 'BMI Calculator', ru: 'Калькулятор ИМТ', uk: 'Калькулятор ІМТ', fr: "Calcul de l'IMC", lt: 'KMI skaičiuotuvas' } },
  '/calculator/calories': { category: 'health', titles: { en: 'Calorie Calculator', ru: 'Калькулятор калорий', uk: 'Калькулятор калорій', fr: 'Calculatrice de calories', lt: 'Kalorijų skaičiuotuvas' } },
  '/calculator/pregnancy': { category: 'health', titles: { en: 'Pregnancy Calculator', ru: 'Калькулятор беременности', uk: 'Калькулятор вагітності', fr: 'Calculatrice de grossesse', lt: 'Nėštumo skaičiuotuvas' } },
  '/calculator/ideal-weight': { category: 'health', titles: { en: 'Ideal Weight Calculator', ru: 'Калькулятор идеального веса', uk: 'Калькулятор ідеальної ваги', fr: 'Poids Idéal', lt: 'Idealaus svorio skaičiuotuvas' } },
  '/currency': { category: 'finance', titles: { en: 'Currency Converter', ru: 'Конвертер валют', uk: 'Конвертер валют', fr: 'Convertisseur de devises', lt: 'Valiutų keitiklis' } },
  '/currency/rates': { category: 'finance', titles: { en: 'Exchange Rates', ru: 'Курс валют', uk: 'Курс валют', fr: 'Taux de change', lt: 'Valiutų kursai' } },
  '/crypto': { category: 'crypto', titles: { en: 'Crypto Rates', ru: 'Курс криптовалют', uk: 'Курс криптовалют', fr: 'Cours des cryptos', lt: 'Kriptovaliutų kursai' } },
  '/crypto/converter': { category: 'crypto', titles: { en: 'Crypto Converter', ru: 'Конвертер криптовалют', uk: 'Конвертер криптовалют', fr: 'Convertisseur crypto', lt: 'Kriptovaliutų keitiklis' } },
  '/weather': { category: 'utility', titles: { en: 'Weather Forecast', ru: 'Прогноз погоды', uk: 'Прогноз погоди', fr: 'Météo', lt: 'Oro prognozė' } },
  '/calculator/alimony': { category: 'legal', titles: { en: 'Alimony Calculator', ru: 'Калькулятор алиментов', uk: 'Калькулятор аліментів', fr: 'Calculatrice de pension alimentaire', lt: 'Alimentų skaičiuotuvas' } },
  '/calculator/rent-vs-buy': { category: 'finance', titles: { en: 'Rent vs Buy', ru: 'Аренда vs Покупка', uk: 'Оренда vs Купівля', fr: 'Louer vs Acheter', lt: 'Nuoma vs Pirkimas' } },
  '/calculator/roi': { category: 'finance', titles: { en: 'ROI Calculator', ru: 'Калькулятор ROI', uk: 'Калькулятор ROI', fr: 'Calculatrice ROI', lt: 'RI skaičiuotuvas' } },
  '/calculator/pension': { category: 'finance', titles: { en: 'Pension Calculator', ru: 'Пенсионный калькулятор', uk: 'Пенсійний калькулятор', fr: 'Calculatrice Retraite', lt: 'Pensijų skaičiuotuvas' } },
  '/tools/password-generator': { category: 'utility', titles: { en: 'Password Generator', ru: 'Генератор паролей', uk: 'Генератор паролів', fr: 'Générateur de mot de passe', lt: 'Slaptažodžių generatorius' } },
  '/calculator/vat': { category: 'finance', titles: { en: 'VAT Calculator', ru: 'Калькулятор НДС', uk: 'Калькулятор ПДВ', fr: 'Calculatrice TVA', lt: 'PVM skaičiuotuvas' } },
  '/calculator/compound-interest': { category: 'finance', titles: { en: 'Compound Interest', ru: 'Сложные проценты', uk: 'Складні відсотки', fr: 'Intérêts composés', lt: 'Sudėtinės palūkanos' } },
  '/converter/units': { category: 'measure', titles: { en: 'Unit Converter', ru: 'Конвертер единиц', uk: 'Конвертер одиниць', fr: "Convertisseur d'unités", lt: 'Vienetų keitiklis' } },
  '/calculator/heart-rate': { category: 'health', titles: { en: 'Heart Rate Zones', ru: 'Пульсовые зоны', uk: 'Пульсові зони', fr: 'Zones de FC', lt: 'Pulso zonos' } },
  '/calculator/tip': { category: 'utility', titles: { en: 'Tip Calculator', ru: 'Калькулятор чаевых', uk: 'Калькулятор чайових', fr: 'Calculatrice de pourboire', lt: 'Arbatpinigių skaičiuotuvas' } },
  '/calculator/age': { category: 'utility', titles: { en: 'Age Calculator', ru: 'Калькулятор возраста', uk: 'Калькулятор віку', fr: "Calculatrice d'âge", lt: 'Amžiaus skaičiuotuvas' } },
  '/calculator/date-diff': { category: 'utility', titles: { en: 'Date Difference', ru: 'Разница дат', uk: 'Різниця дат', fr: 'Différence de dates', lt: 'Datų skirtumas' } },
  '/converter/color': { category: 'measure', titles: { en: 'Color Converter', ru: 'Конвертер цветов', uk: 'Конвертер кольорів', fr: 'Convertisseur de couleurs', lt: 'Spalvų keitiklis' } },
  '/converter/clothing-size': { category: 'measure', titles: { en: 'Clothing Size Converter', ru: 'Конвертер размеров одежды', uk: 'Конвертер розмірів одягу', fr: 'Convertisseur de tailles', lt: 'Drabužių dydžių keitiklis' } },
  '/tools/countdown': { category: 'utility', titles: { en: 'Countdown Timer', ru: 'Таймер обратного отсчёта', uk: 'Таймер зворотного відліку', fr: 'Compte à rebours', lt: 'Atgalinio skaičiavimo laikmatis' } },
  '/calculator/traffic-fine': { category: 'legal', titles: { en: 'Traffic Fine Calculator', ru: 'Штрафы ПДД', uk: 'Штрафи ПДР', fr: 'Amendes routières', lt: 'Eismo baudos' } },
  '/calculator/flight-delay': { category: 'legal', titles: { en: 'Flight Delay Compensation', ru: 'Компенсация за задержку рейса', uk: 'Компенсація за затримку рейсу', fr: 'Indemnisation retard de vol', lt: 'Kompensacija už skrydžio vėlavimą' } },
  '/calculator/limitation': { category: 'legal', titles: { en: 'Statute of Limitations', ru: 'Срок исковой давности', uk: 'Строк позовної давності', fr: 'Délai de prescription', lt: 'Ieškinio senaties terminas' } },
  '/calculator/renovation': { category: 'realestate', titles: { en: 'Renovation Cost Calculator', ru: 'Калькулятор ремонта', uk: 'Калькулятор ремонту', fr: 'Coût de rénovation', lt: 'Remonto kainos skaičiuotuvas' } },
  '/calculator/property-tax': { category: 'realestate', titles: { en: 'Property Tax Calculator', ru: 'Налог на недвижимость', uk: 'Податок на нерухомість', fr: 'Taxe foncière', lt: 'Nekilnojamojo turto mokestis' } },
  '/calculator/car-insurance': { category: 'finance', titles: { en: 'Car Insurance Calculator', ru: 'Калькулятор страховки авто', uk: 'Калькулятор страховки авто', fr: 'Calculatrice assurance auto', lt: 'Automobilio draudimo skaičiuotuvas' } },
  '/calculator/life-insurance': { category: 'finance', titles: { en: 'Life Insurance Calculator', ru: 'Калькулятор страховки жизни', uk: 'Калькулятор страховки життя', fr: 'Calculatrice assurance vie', lt: 'Gyvybės draudimo skaičiuotuvas' } },
  '/calculator/income-tax': { category: 'finance', titles: { en: 'Income Tax Calculator', ru: 'Калькулятор подоходного налога', uk: 'Калькулятор прибуткового податку', fr: "Calculatrice impôt sur le revenu", lt: 'Pajamų mokesčio skaičiuotuvas' } },
  '/calculator/crypto-tax': { category: 'crypto', titles: { en: 'Crypto Tax Calculator', ru: 'Налог на доход от крипты', uk: 'Податок на дохід від крипти', fr: 'Impôt sur les cryptos', lt: 'Kriptovaliutų mokesčių skaičiuotuvas' } },
  '/calculator/freelance-rate': { category: 'finance', titles: { en: 'Freelance Rate Calculator', ru: 'Калькулятор ставки фрилансера', uk: 'Калькулятор ставки фрилансера', fr: 'Calculatrice de taux freelance', lt: 'Laisvai samdomų tarifų skaičiuotuvas' } },
  '/calculator/margin': { category: 'finance', titles: { en: 'Margin & Markup Calculator', ru: 'Калькулятор маржи и наценки', uk: 'Калькулятор маржі і націнки', fr: 'Calculatrice marge et majoration', lt: 'Maržos ir antkainių skaičiuotuvas' } },
  '/calculator/gpa': { category: 'utility', titles: { en: 'GPA Calculator', ru: 'Калькулятор GPA', uk: 'Калькулятор GPA', fr: 'Calculatrice GPA', lt: 'GPA skaičiuotuvas' } },
  '/converter/grade-system': { category: 'utility', titles: { en: 'Grade System Converter', ru: 'Конвертер систем оценок', uk: 'Конвертер систем оцінок', fr: 'Convertisseur de notes', lt: 'Pažymių sistemų konverteris' } },
  '/calculator/biological-age': { category: 'health', titles: { en: 'Biological Age Calculator', ru: 'Калькулятор биологического возраста', uk: 'Калькулятор біологічного віку', fr: "Calculatrice d'âge biologique", lt: 'Biologinio amžiaus skaičiuotuvas' } },
  '/calculator/diabetes-risk': { category: 'health', titles: { en: 'Diabetes Risk Calculator', ru: 'Калькулятор риска диабета', uk: 'Калькулятор ризику діабету', fr: 'Risque de diabète', lt: 'Diabeto rizikos skaičiuotuvas' } },
  '/calculator/stress-level': { category: 'health', titles: { en: 'Stress Level Calculator', ru: 'Калькулятор уровня стресса', uk: 'Калькулятор рівня стресу', fr: 'Calculatrice du niveau de stress', lt: 'Streso lygio skaičiuotuvas' } },
  '/tools/word-counter': { category: 'utility', titles: { en: 'Word Counter', ru: 'Счётчик слов', uk: 'Лічильник слів', fr: 'Compteur de mots', lt: 'Žodžių skaičiuotuvas' } },
  '/calculator/discount': { category: 'finance', titles: { en: 'Discount Calculator', ru: 'Калькулятор скидки', uk: 'Калькулятор знижки', fr: 'Calculatrice de remise', lt: 'Nuolaidos skaičiuotuvas' } },
  '/calculator/sleep': { category: 'health', titles: { en: 'Sleep Calculator', ru: 'Калькулятор сна', uk: 'Калькулятор сну', fr: 'Calculatrice du sommeil', lt: 'Miego skaičiuotuvas' } },
  '/calculator/percentage': { category: 'utility', titles: { en: 'Percentage Calculator', ru: 'Калькулятор процентов', uk: 'Калькулятор відсотків', fr: 'Calculatrice de pourcentage', lt: 'Procentų skaičiuotuvas' } },
  '/calculator/basic': { category: 'utility', titles: { en: 'Basic Calculator', ru: 'Простой калькулятор', uk: 'Простий калькулятор', fr: 'Calculatrice basique', lt: 'Paprastas skaičiuotuvas' } },
  '/calculator/engineering': { category: 'utility', titles: { en: 'Scientific Calculator', ru: 'Инженерный калькулятор', uk: 'Інженерний калькулятор', fr: 'Calculatrice scientifique', lt: 'Inžinerinis skaičiuotuvas' } },
  '/calculator/body-fat': { category: 'health', titles: { en: 'Body Fat Calculator', ru: 'Калькулятор % жира в теле', uk: 'Калькулятор % жиру в тілі', fr: 'Calculatrice de graisse corporelle', lt: 'Kūno riebalų skaičiuotuvas' } },
  '/calculator/water-intake': { category: 'health', titles: { en: 'Water Intake Calculator', ru: 'Норма воды в день', uk: 'Норма води на день', fr: 'Apport en eau quotidien', lt: 'Vandens normos skaičiuotuvas' } },
  '/calculator/ovulation': { category: 'health', titles: { en: 'Ovulation Calculator', ru: 'Калькулятор овуляции', uk: 'Калькулятор овуляції', fr: "Calculatrice d'ovulation", lt: 'Ovuliacijos skaičiuotuvas' } },
  '/converter/timezone': { category: 'utility', titles: { en: 'Timezone Converter', ru: 'Конвертер часовых поясов', uk: 'Конвертер часових поясів', fr: 'Convertisseur de fuseaux horaires', lt: 'Laiko juostų keitiklis' } },
  '/calculator/salary': { category: 'finance', titles: { en: 'Salary Calculator', ru: 'Калькулятор зарплаты', uk: 'Калькулятор зарплати', fr: 'Calculateur Salaire', lt: 'Atlyginimo skaičiuotuvas' } },
  '/calculator/life-path': { category: 'esoteric', titles: { en: 'Life Path Number', ru: 'Число жизненного пути', uk: 'Число життєвого шляху', fr: 'Chemin de Vie', lt: 'Gyvenimo kelio skaičius' } },
  '/calculator/destiny-number': { category: 'esoteric', titles: { en: 'Destiny Number', ru: 'Число судьбы', uk: 'Число долі', fr: 'Nombre Destin', lt: 'Likimo skaičius' } },
  '/calculator/name-number': { category: 'esoteric', titles: { en: 'Name Number', ru: 'Число имени', uk: 'Число імені', fr: 'Nombre du Nom', lt: 'Vardo skaičius' } },
  '/calculator/soul-number': { category: 'esoteric', titles: { en: 'Soul Number', ru: 'Число души', uk: 'Число душі', fr: "Nombre de l'Âme", lt: 'Sielos skaičius' } },
  '/calculator/personality-number': { category: 'esoteric', titles: { en: 'Personality Number', ru: 'Число личности', uk: 'Число особистості', fr: 'Nombre de Personnalité', lt: 'Asmenybės skaičius' } },
  '/calculator/personal-year': { category: 'esoteric', titles: { en: 'Personal Year', ru: 'Персональный год', uk: 'Персональний рік', fr: 'Année Personnelle', lt: 'Asmeniniai metai' } },
  '/calculator/numerology-compatibility': { category: 'esoteric', titles: { en: 'Numerology Compatibility', ru: 'Совместимость по нумерологии', uk: 'Сумісність за нумерологією', fr: 'Compatibilité Numérologique', lt: 'Numerologinis suderinamumas' } },
  '/calculator/pythagorean-matrix': { category: 'esoteric', titles: { en: 'Pythagorean Matrix', ru: 'Матрица Пифагора', uk: 'Матриця Піфагора', fr: 'Matrice Pythagoricienne', lt: 'Pitagoro matrica' } },
  '/calculator/karmic-number': { category: 'esoteric', titles: { en: 'Karmic Numbers', ru: 'Кармические числа', uk: 'Кармічні числа', fr: 'Nombres Karmiques', lt: 'Karminiai skaičiai' } },
  '/calculator/zodiac-sign': { category: 'esoteric', titles: { en: 'Zodiac Sign', ru: 'Знак зодиака', uk: 'Знак зодіаку', fr: 'Signe du Zodiaque', lt: 'Zodiako ženklas' } },
  '/calculator/chinese-zodiac': { category: 'esoteric', titles: { en: 'Chinese Zodiac', ru: 'Китайский гороскоп', uk: 'Китайський гороскоп', fr: 'Zodiaque Chinois', lt: 'Kinų zodiako ženklas' } },
  '/calculator/celtic-zodiac': { category: 'esoteric', titles: { en: 'Celtic Zodiac', ru: 'Кельтский зодиак', uk: 'Кельтський зодіак', fr: 'Zodiaque Celtique', lt: 'Keltų zodiako ženklas' } },
  '/calculator/zodiac-compatibility': { category: 'esoteric', titles: { en: 'Zodiac Compatibility', ru: 'Совместимость знаков', uk: 'Сумісність знаків', fr: 'Compatibilité Astrologique', lt: 'Ženklų suderinamumas' } },
  '/calculator/mercury-retrograde': { category: 'esoteric', titles: { en: 'Mercury Retrograde', ru: 'Меркурий ретроградный', uk: 'Меркурій ретроградний', fr: 'Mercure Rétrograde', lt: 'Merkurijaus retrogradas' } },
  '/calculator/angel-number': { category: 'esoteric', titles: { en: 'Angel Number', ru: 'Число ангела', uk: 'Число ангела', fr: 'Nombre Angélique', lt: 'Angelo skaičius' } },
  '/calculator/archetype-number': { category: 'esoteric', titles: { en: 'Personality Archetype', ru: 'Архетип личности', uk: 'Архетип особистості', fr: 'Archétype de Personnalité', lt: 'Asmenybės archetipas' } },
  '/calculator/biorhythm': { category: 'esoteric', titles: { en: 'Biorhythm Calculator', ru: 'Биоритмы', uk: 'Біоритми', fr: 'Biorythmes', lt: 'Bioritmas' } },
};

const LOCALES = ['en', 'ru', 'uk', 'fr', 'lt'];

export default function Breadcrumbs({ locale }: { locale: string }) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const isLocalePrefix = segments.length > 0 && LOCALES.includes(segments[0]);
  const toolPath = isLocalePrefix ? '/' + segments.slice(1).join('/') : '/' + segments.join('/');

  // Skip home and info pages
  if (!toolPath || toolPath === '/' || ['about', 'contact', 'privacy-policy'].includes(toolPath.replace('/', ''))) {
    return null;
  }

  const tool = TOOL_META[toolPath];
  if (!tool) return null;

  const homeLabel = HOME_LABEL[locale] ?? HOME_LABEL.en;
  const catLabels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.en;
  const catLabel = catLabels[tool.category];
  const toolLabel = tool.titles[locale] ?? tool.titles.en;

  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <ol className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link href={`/${locale}`} className={styles.breadcrumbs__link}>{homeLabel}</Link>
        </li>
        <li className={styles['breadcrumbs__sep-item']} aria-hidden="true">
          <span className={styles.breadcrumbs__sep}>›</span>
        </li>
        <li className={styles.breadcrumbs__item}>
          <Link href={`/${locale}?category=${tool.category}`} className={styles.breadcrumbs__link}>{catLabel}</Link>
        </li>
        <li className={styles['breadcrumbs__sep-item']} aria-hidden="true">
          <span className={styles.breadcrumbs__sep}>›</span>
        </li>
        <li className={styles.breadcrumbs__item}>
          <span className={styles.breadcrumbs__current} aria-current="page">{toolLabel}</span>
        </li>
      </ol>
    </nav>
  );
}
