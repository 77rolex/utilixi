import Link from 'next/link';
import styles from './Footer.module.scss';

type Props = {
  locale: string;
};

type LocaleKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LocaleKey, {
  home: string;
  toolsTitle: string;
  pagesTitle: string;
  about: string;
  contact: string;
  privacy: string;
  copyright: string;
}> = {
  en: {
    home: 'Home',
    toolsTitle: 'Tools',
    pagesTitle: 'Pages',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    copyright: 'Free online tools.',
  },
  ru: {
    home: 'Главная',
    toolsTitle: 'Инструменты',
    pagesTitle: 'Страницы',
    about: 'О проекте',
    contact: 'Контакты',
    privacy: 'Политика конфиденциальности',
    copyright: 'Бесплатные онлайн-инструменты.',
  },
  uk: {
    home: 'Головна',
    toolsTitle: 'Інструменти',
    pagesTitle: 'Сторінки',
    about: 'Про проект',
    contact: 'Контакти',
    privacy: 'Політика конфіденційності',
    copyright: 'Безкоштовні онлайн-інструменти.',
  },
  fr: {
    home: 'Accueil',
    toolsTitle: 'Outils',
    pagesTitle: 'Pages',
    about: 'À propos',
    contact: 'Contact',
    privacy: 'Politique de confidentialité',
    copyright: 'Outils en ligne gratuits.',
  },
  lt: {
    home: 'Pradžia',
    toolsTitle: 'Įrankiai',
    pagesTitle: 'Puslapiai',
    about: 'Apie mus',
    contact: 'Kontaktai',
    privacy: 'Privatumo politika',
    copyright: 'Nemokami internetiniai įrankiai.',
  },
};

type FooterTool = { href: string; labels: Record<LocaleKey, string> };
type FooterCategory = { key: string; labels: Record<LocaleKey, string>; tools: FooterTool[] };

const FOOTER_CATEGORIES: FooterCategory[] = [
  {
    key: 'finance',
    labels: { en: 'Finance', ru: 'Финансы', uk: 'Фінанси', fr: 'Finance', lt: 'Finansai' },
    tools: [
      { href: '/calculator/mortgage', labels: { en: 'Mortgage Calculator', ru: 'Ипотечный калькулятор', uk: 'Іпотечний калькулятор', fr: 'Calculatrice de prêt immobilier', lt: 'Hipotekos skaičiuotuvas' } },
      { href: '/calculator/loan', labels: { en: 'Loan Calculator', ru: 'Калькулятор кредита', uk: 'Калькулятор кредиту', fr: 'Calculatrice de prêt', lt: 'Paskolos skaičiuotuvas' } },
      { href: '/calculator/deposit', labels: { en: 'Deposit Calculator', ru: 'Калькулятор депозита', uk: 'Калькулятор депозиту', fr: 'Calculatrice de dépôt', lt: 'Indėlio skaičiuotuvas' } },
      { href: '/calculator/rent-vs-buy', labels: { en: 'Rent vs Buy', ru: 'Аренда vs Покупка', uk: 'Оренда vs Купівля', fr: 'Louer vs Acheter', lt: 'Nuoma vs Pirkimas' } },
      { href: '/calculator/roi', labels: { en: 'ROI Calculator', ru: 'Калькулятор ROI', uk: 'Калькулятор ROI', fr: 'Calculatrice ROI', lt: 'RI skaičiuotuvas' } },
      { href: '/calculator/pension', labels: { en: 'Pension Calculator', ru: 'Пенсионный калькулятор', uk: 'Пенсійний калькулятор', fr: 'Calculatrice Retraite', lt: 'Pensijų skaičiuotuvas' } },
      { href: '/calculator/vat', labels: { en: 'VAT Calculator', ru: 'Калькулятор НДС', uk: 'Калькулятор ПДВ', fr: 'Calculatrice TVA', lt: 'PVM skaičiuotuvas' } },
      { href: '/calculator/compound-interest', labels: { en: 'Compound Interest', ru: 'Сложные проценты', uk: 'Складні відсотки', fr: 'Intérêts composés', lt: 'Sudėtinės palūkanos' } },
      { href: '/currency', labels: { en: 'Currency Converter', ru: 'Конвертер валют', uk: 'Конвертер валют', fr: 'Convertisseur de devises', lt: 'Valiutų keitiklis' } },
    ],
  },
  {
    key: 'crypto',
    labels: { en: 'Crypto', ru: 'Криптовалюта', uk: 'Криптовалюта', fr: 'Crypto', lt: 'Kripto' },
    tools: [
      { href: '/crypto', labels: { en: 'Crypto Rates', ru: 'Курс криптовалют', uk: 'Курс криптовалют', fr: 'Cours des cryptos', lt: 'Kriptovaliutų kursai' } },
      { href: '/crypto/converter', labels: { en: 'Crypto Converter', ru: 'Конвертер криптовалют', uk: 'Конвертер криптовалют', fr: 'Convertisseur crypto', lt: 'Kriptovaliutų keitiklis' } },
    ],
  },
  {
    key: 'health',
    labels: { en: 'Health', ru: 'Здоровье', uk: 'Здоров\'я', fr: 'Santé', lt: 'Sveikata' },
    tools: [
      { href: '/calculator/bmi', labels: { en: 'BMI Calculator', ru: 'Калькулятор ИМТ', uk: 'Калькулятор ІМТ', fr: 'Calculatrice IMC', lt: 'KMI skaičiuotuvas' } },
      { href: '/calculator/calories', labels: { en: 'Calorie Calculator', ru: 'Калькулятор калорий', uk: 'Калькулятор калорій', fr: 'Calculatrice de calories', lt: 'Kalorijų skaičiuotuvas' } },
      { href: '/calculator/pregnancy', labels: { en: 'Pregnancy Calculator', ru: 'Калькулятор беременности', uk: 'Калькулятор вагітності', fr: 'Calculatrice de grossesse', lt: 'Nėštumo skaičiuotuvas' } },
      { href: '/calculator/ideal-weight', labels: { en: 'Ideal Weight Calculator', ru: 'Калькулятор идеального веса', uk: 'Калькулятор ідеальної ваги', fr: 'Poids Idéal', lt: 'Idealaus svorio skaičiuotuvas' } },
      { href: '/calculator/heart-rate', labels: { en: 'Heart Rate Zones', ru: 'Пульсовые зоны', uk: 'Пульсові зони', fr: 'Zones de FC', lt: 'Pulso zonos' } },
    ],
  },
  {
    key: 'legal',
    labels: { en: 'Legal', ru: 'Юридические', uk: 'Юридичні', fr: 'Juridique', lt: 'Teisiniai' },
    tools: [
      { href: '/calculator/alimony', labels: { en: 'Alimony Calculator', ru: 'Калькулятор алиментов', uk: 'Калькулятор аліментів', fr: 'Calculatrice de pension alimentaire', lt: 'Alimentų skaičiuotuvas' } },
      { href: '/calculator/traffic-fine', labels: { en: 'Traffic Fine Calculator', ru: 'Штрафы ПДД', uk: 'Штрафи ПДР', fr: 'Amendes routières', lt: 'Eismo baudos' } },
      { href: '/calculator/flight-delay', labels: { en: 'Flight Delay Compensation', ru: 'Компенсация за задержку рейса', uk: 'Компенсація за затримку рейсу', fr: 'Indemnisation retard de vol', lt: 'Kompensacija už skrydžio vėlavimą' } },
      { href: '/calculator/limitation', labels: { en: 'Statute of Limitations', ru: 'Срок исковой давности', uk: 'Строк позовної давності', fr: 'Délai de prescription', lt: 'Ieškinio senaties terminas' } },
    ],
  },
  {
    key: 'realestate',
    labels: { en: 'Real Estate', ru: 'Недвижимость', uk: 'Нерухомість', fr: 'Immobilier', lt: 'Nekilnojamasis turtas' },
    tools: [
      { href: '/calculator/renovation', labels: { en: 'Renovation Cost', ru: 'Калькулятор ремонта', uk: 'Калькулятор ремонту', fr: 'Coût de rénovation', lt: 'Remonto kainos' } },
      { href: '/calculator/property-tax', labels: { en: 'Property Tax', ru: 'Налог на недвижимость', uk: 'Податок на нерухомість', fr: 'Taxe foncière', lt: 'Turto mokestis' } },
    ],
  },
  {
    key: 'utilities',
    labels: { en: 'Utilities', ru: 'Утилиты', uk: 'Утиліти', fr: 'Utilitaires', lt: 'Priemonės' },
    tools: [
      { href: '/weather', labels: { en: 'Weather Forecast', ru: 'Прогноз погоды', uk: 'Прогноз погоди', fr: 'Météo', lt: 'Oro prognozė' } },
      { href: '/tools/password-generator', labels: { en: 'Password Generator', ru: 'Генератор паролей', uk: 'Генератор паролів', fr: 'Générateur de mot de passe', lt: 'Slaptažodžių generatorius' } },
      { href: '/converter/units', labels: { en: 'Unit Converter', ru: 'Конвертер единиц', uk: 'Конвертер одиниць', fr: 'Convertisseur d\'unités', lt: 'Vienetų keitiklis' } },
      { href: '/calculator/tip', labels: { en: 'Tip Calculator', ru: 'Калькулятор чаевых', uk: 'Калькулятор чайових', fr: 'Calculatrice de pourboire', lt: 'Arbatpinigių skaičiuotuvas' } },
      { href: '/calculator/age', labels: { en: 'Age Calculator', ru: 'Калькулятор возраста', uk: 'Калькулятор віку', fr: 'Calculatrice d\'âge', lt: 'Amžiaus skaičiuotuvas' } },
      { href: '/calculator/date-diff', labels: { en: 'Date Difference', ru: 'Разница дат', uk: 'Різниця дат', fr: 'Différence de dates', lt: 'Datų skirtumas' } },
      { href: '/tools/countdown', labels: { en: 'Countdown Timer', ru: 'Таймер обратного отсчёта', uk: 'Таймер зворотного відліку', fr: 'Compte à rebours', lt: 'Atgalinio skaičiavimo laikmatis' } },
    ],
  },
  {
    key: 'measure',
    labels: { en: 'Measurements', ru: 'Измерения', uk: 'Вимірювання', fr: 'Mesures', lt: 'Matavimai' },
    tools: [
      { href: '/converter/color', labels: { en: 'Color Converter', ru: 'Конвертер цветов', uk: 'Конвертер кольорів', fr: 'Convertisseur de couleurs', lt: 'Spalvų keitiklis' } },
      { href: '/converter/clothing-size', labels: { en: 'Clothing Size Converter', ru: 'Конвертер размеров одежды', uk: 'Конвертер розмірів одягу', fr: 'Convertisseur de tailles', lt: 'Drabužių dydžių keitiklis' } },
    ],
  },
];

export default function Footer({ locale }: Props) {
  const l = (locale as LocaleKey) in T ? (locale as LocaleKey) : 'en';
  const t = T[l];
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>

        <nav className={styles.footer__nav}>

          {/* Pages — first on mobile (top), last on desktop (right) */}
          <div className={styles.footer__pages}>
            <p className={styles['footer__section-title']}>{t.pagesTitle}</p>
            <ul className={styles['footer__pages-list']}>
              <li><Link href={`/${locale}`} className={styles.footer__link}>{t.home}</Link></li>
              <li><Link href={`/${locale}/about`} className={styles.footer__link}>{t.about}</Link></li>
              <li><Link href={`/${locale}/contact`} className={styles.footer__link}>{t.contact}</Link></li>
              <li><Link href={`/${locale}/privacy-policy`} className={styles.footer__link}>{t.privacy}</Link></li>
            </ul>
          </div>

          {/* Divider between pages and tools — mobile only */}
          <div className={styles['footer__pages-divider']} aria-hidden="true" />

          {/* Tools by category */}
          <div className={styles.footer__tools}>
            <p className={styles['footer__section-title']}>{t.toolsTitle}</p>
            <div className={styles['footer__categories']}>
              {FOOTER_CATEGORIES.map((cat) => (
                <details key={cat.key} className={styles['footer__cat']}>
                  <summary className={styles['footer__cat-summary']}>
                    <span>{cat.labels[l]}</span>
                    <svg className={styles['footer__cat-arrow']} width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <ul className={styles['footer__cat-list']}>
                    {cat.tools.map((tool) => (
                      <li key={tool.href}>
                        <Link href={`/${locale}${tool.href}`} className={styles.footer__link}>
                          {tool.labels[l]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

        </nav>

        <div className={styles.footer__divider} />

        <p className={styles.footer__copyright}>
          © {currentYear} Utilixi. {t.copyright}
        </p>
      </div>
    </footer>
  );
}
