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

// Add tools here only when their pages are live — Next.js prefetches footer links
// and missing pages cause 404 console errors that hurt Lighthouse Best Practices.
const TOOLS: Record<string, Record<LocaleKey, string>> = {
  '/calculator/mortgage': {
    en: 'Mortgage Calculator',
    ru: 'Ипотечный калькулятор',
    uk: 'Іпотечний калькулятор',
    fr: 'Calculatrice immobilière',
    lt: 'Hipotekos skaičiuotuvas',
  },
  '/calculator/loan': {
    en: 'Loan Calculator',
    ru: 'Калькулятор кредита',
    uk: 'Калькулятор кредиту',
    fr: 'Calculatrice de prêt',
    lt: 'Paskolos skaičiuotuvas',
  },
  '/calculator/bmi': {
    en: 'BMI Calculator',
    ru: 'Калькулятор ИМТ',
    uk: 'Калькулятор ІМТ',
    fr: 'Calculatrice IMC',
    lt: 'KMI skaičiuotuvas',
  },
  '/calculator/calories': {
    en: 'Calorie Calculator',
    ru: 'Калькулятор калорий',
    uk: 'Калькулятор калорій',
    fr: 'Calculatrice de calories',
    lt: 'Kalorijų skaičiuotuvas',
  },
  '/calculator/deposit': {
    en: 'Deposit Calculator',
    ru: 'Калькулятор депозита',
    uk: 'Калькулятор депозиту',
    fr: 'Calculatrice de dépôt',
    lt: 'Indėlio skaičiuotuvas',
  },
  '/calculator/pregnancy': {
    en: 'Pregnancy Calculator',
    ru: 'Калькулятор беременности',
    uk: 'Калькулятор вагітності',
    fr: 'Calculatrice de grossesse',
    lt: 'Nėštumo skaičiuotuvas',
  },
  '/calculator/ideal-weight': {
    en: 'Ideal Weight Calculator',
    ru: 'Калькулятор идеального веса',
    uk: 'Калькулятор ідеальної ваги',
    fr: 'Poids Idéal',
    lt: 'Idealaus svorio skaičiuotuvas',
  },
  '/currency': {
    en: 'Currency Converter',
    ru: 'Конвертер валют',
    uk: 'Конвертер валют',
    fr: 'Convertisseur de devises',
    lt: 'Valiutų keitiklis',
  },
  '/crypto': {
    en: 'Crypto Rates',
    ru: 'Курс криптовалют',
    uk: 'Курс криптовалют',
    fr: 'Cours des cryptos',
    lt: 'Kriptovaliutų kursai',
  },
  '/crypto/converter': {
    en: 'Crypto Converter',
    ru: 'Конвертер криптовалют',
    uk: 'Конвертер криптовалют',
    fr: 'Convertisseur crypto',
    lt: 'Kriptovaliutų keitiklis',
  },
  '/weather': {
    en: 'Weather Forecast',
    ru: 'Прогноз погоды',
    uk: 'Прогноз погоди',
    fr: 'Météo',
    lt: 'Oro prognozė',
  },
  '/calculator/alimony': {
    en: 'Alimony Calculator',
    ru: 'Калькулятор алиментов',
    uk: 'Калькулятор аліментів',
    fr: 'Calculatrice de pension alimentaire',
    lt: 'Alimentų skaičiuotuvas',
  },
  '/calculator/rent-vs-buy': {
    en: 'Rent vs Buy',
    ru: 'Аренда vs Покупка',
    uk: 'Оренда vs Купівля',
    fr: 'Louer vs Acheter',
    lt: 'Nuoma vs Pirkimas',
  },
  '/calculator/roi': {
    en: 'ROI Calculator',
    ru: 'Калькулятор ROI',
    uk: 'Калькулятор ROI',
    fr: 'Calculatrice ROI',
    lt: 'RI skaičiuotuvas',
  },
  '/calculator/pension': {
    en: 'Pension Calculator',
    ru: 'Пенсионный калькулятор',
    uk: 'Пенсійний калькулятор',
    fr: 'Calculatrice Retraite',
    lt: 'Pensijų skaičiuotuvas',
  },
  '/tools/password-generator': {
    en: 'Password Generator',
    ru: 'Генератор паролей',
    uk: 'Генератор паролів',
    fr: 'Générateur de mot de passe',
    lt: 'Slaptažodžių generatorius',
  },
  '/calculator/vat': {
    en: 'VAT Calculator',
    ru: 'Калькулятор НДС',
    uk: 'Калькулятор ПДВ',
    fr: 'Calculatrice TVA',
    lt: 'PVM skaičiuotuvas',
  },
  '/calculator/compound-interest': {
    en: 'Compound Interest',
    ru: 'Сложные проценты',
    uk: 'Складні відсотки',
    fr: 'Intérêts composés',
    lt: 'Sudėtinės palūkanos',
  },
  '/converter/units': {
    en: 'Unit Converter',
    ru: 'Конвертер единиц',
    uk: 'Конвертер одиниць',
    fr: 'Convertisseur d\'unités',
    lt: 'Vienetų keitiklis',
  },
  '/calculator/heart-rate': {
    en: 'Heart Rate Zones',
    ru: 'Пульсовые зоны',
    uk: 'Пульсові зони',
    fr: 'Zones de FC',
    lt: 'Pulso zonos',
  },
  '/calculator/tip': {
    en: 'Tip Calculator',
    ru: 'Калькулятор чаевых',
    uk: 'Калькулятор чайових',
    fr: 'Calculatrice de pourboire',
    lt: 'Arbatpinigių skaičiuotuvas',
  },
};

export default function Footer({ locale }: Props) {
  const l = (locale as LocaleKey) in T ? (locale as LocaleKey) : 'en';
  const t = T[l];
  const currentYear = new Date().getFullYear();
  const toolEntries = Object.entries(TOOLS);

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

          {/* Tools */}
          <div className={styles.footer__tools}>
            <p className={styles['footer__section-title']}>{t.toolsTitle}</p>
            <div className={styles['footer__tools-grid']}>
              {toolEntries.map(([href, labels]) => (
                <Link key={href} href={`/${locale}${href}`} className={styles.footer__link}>
                  {labels[l]}
                </Link>
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
