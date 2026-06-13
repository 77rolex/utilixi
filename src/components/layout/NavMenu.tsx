'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './NavMenu.module.scss';

type NavTool = { href: string; labels: Record<string, string> };
type NavCategory = { key: string; labelsByLocale: Record<string, string>; tools: NavTool[] };
type NavPage = { href: string; labels: Record<string, string> };

const NAV_CATEGORIES: NavCategory[] = [
  {
    key: 'finance',
    labelsByLocale: { en: 'Finance', ru: 'Финансы', uk: 'Фінанси', fr: 'Finance', lt: 'Finansai' },
    tools: [
      { href: '/calculator/mortgage', labels: { en: 'Mortgage Calculator', ru: 'Ипотечный калькулятор', uk: 'Іпотечний калькулятор', fr: 'Calculatrice de prêt immobilier', lt: 'Hipotekos skaičiuotuvas' } },
      { href: '/calculator/loan', labels: { en: 'Loan Calculator', ru: 'Калькулятор кредита', uk: 'Калькулятор кредиту', fr: 'Calculatrice de prêt', lt: 'Paskolos skaičiuotuvas' } },
      { href: '/calculator/deposit', labels: { en: 'Deposit Calculator', ru: 'Калькулятор депозита', uk: 'Калькулятор депозиту', fr: 'Calculatrice de dépôt', lt: 'Indėlio skaičiuotuvas' } },
      { href: '/calculator/roi', labels: { en: 'ROI Calculator', ru: 'Калькулятор ROI', uk: 'Калькулятор ROI', fr: 'Calculatrice ROI', lt: 'RI skaičiuotuvas' } },
      { href: '/calculator/pension', labels: { en: 'Pension Calculator', ru: 'Пенсионный калькулятор', uk: 'Пенсійний калькулятор', fr: 'Calculatrice Retraite', lt: 'Pensijų skaičiuotuvas' } },
      { href: '/calculator/rent-vs-buy', labels: { en: 'Rent vs Buy', ru: 'Аренда vs Покупка', uk: 'Оренда vs Купівля', fr: 'Louer vs Acheter', lt: 'Nuoma vs Pirkimas' } },
      { href: '/calculator/vat', labels: { en: 'VAT Calculator', ru: 'Калькулятор НДС', uk: 'Калькулятор ПДВ', fr: 'Calculatrice TVA', lt: 'PVM skaičiuotuvas' } },
      { href: '/calculator/compound-interest', labels: { en: 'Compound Interest', ru: 'Сложные проценты', uk: 'Складні відсотки', fr: 'Intérêts composés', lt: 'Sudėtinės palūkanos' } },
      { href: '/currency', labels: { en: 'Currency Converter', ru: 'Конвертер валют', uk: 'Конвертер валют', fr: 'Convertisseur de devises', lt: 'Valiutų keitiklis' } },
      { href: '/calculator/savings-goal', labels: { en: 'Savings Goal Calculator', ru: 'Калькулятор накоплений', uk: 'Калькулятор накопичень', fr: 'Calculatrice Objectif Épargne', lt: 'Taupymo tikslo skaičiuotuvas' } },
      { href: '/calculator/net-worth', labels: { en: 'Net Worth Calculator', ru: 'Калькулятор чистых активов', uk: 'Калькулятор чистих активів', fr: 'Calculatrice Valeur Nette', lt: 'Grynosios vertės skaičiuotuvas' } },
      { href: '/calculator/travel-budget', labels: { en: 'Travel Budget Calculator', ru: 'Бюджет путешествия', uk: 'Бюджет подорожі', fr: 'Budget Voyage', lt: 'Kelionės biudžetas' } },
      { href: '/calculator/inflation', labels: { en: 'Inflation Calculator', ru: 'Калькулятор инфляции', uk: 'Калькулятор інфляції', fr: 'Calculatrice Inflation', lt: 'Infliacijos skaičiuotuvas' } },
      { href: '/calculator/loan-payoff', labels: { en: 'Loan Early Payoff', ru: 'Досрочное погашение', uk: 'Дострокове погашення', fr: 'Remboursement Anticipé', lt: 'Išankstinis grąžinimas' } },
    ],
  },
  {
    key: 'crypto',
    labelsByLocale: { en: 'Crypto', ru: 'Криптовалюта', uk: 'Криптовалюта', fr: 'Crypto', lt: 'Kripto' },
    tools: [
      { href: '/crypto', labels: { en: 'Crypto Rates', ru: 'Курс криптовалют', uk: 'Курс криптовалют', fr: 'Cours des cryptos', lt: 'Kriptovaliutų kursai' } },
      { href: '/crypto/converter', labels: { en: 'Crypto Converter', ru: 'Конвертер криптовалют', uk: 'Конвертер криптовалют', fr: 'Convertisseur crypto', lt: 'Kriptovaliutų keitiklis' } },
    ],
  },
  {
    key: 'legal',
    labelsByLocale: { en: 'Legal', ru: 'Юридические', uk: 'Юридичні', fr: 'Juridique', lt: 'Teisiniai' },
    tools: [
      { href: '/calculator/alimony', labels: { en: 'Alimony Calculator', ru: 'Калькулятор алиментов', uk: 'Калькулятор аліментів', fr: 'Calculatrice de pension alimentaire', lt: 'Alimentų skaičiuotuvas' } },
      { href: '/calculator/traffic-fine', labels: { en: 'Traffic Fine Calculator', ru: 'Штрафы ПДД', uk: 'Штрафи ПДР', fr: 'Amendes routières', lt: 'Eismo baudos' } },
      { href: '/calculator/flight-delay', labels: { en: 'Flight Delay Compensation', ru: 'Компенсация за задержку рейса', uk: 'Компенсація за затримку рейсу', fr: 'Indemnisation retard de vol', lt: 'Kompensacija už skrydžio vėlavimą' } },
      { href: '/calculator/limitation', labels: { en: 'Statute of Limitations', ru: 'Срок исковой давности', uk: 'Строк позовної давності', fr: 'Délai de prescription', lt: 'Ieškinio senaties terminas' } },
    ],
  },
  {
    key: 'realestate',
    labelsByLocale: { en: 'Real Estate', ru: 'Недвижимость', uk: 'Нерухомість', fr: 'Immobilier', lt: 'Nekilnojamasis turtas' },
    tools: [
      { href: '/calculator/renovation', labels: { en: 'Renovation Cost Calculator', ru: 'Калькулятор ремонта', uk: 'Калькулятор ремонту', fr: 'Coût de rénovation', lt: 'Remonto kainos skaičiuotuvas' } },
      { href: '/calculator/property-tax', labels: { en: 'Property Tax Calculator', ru: 'Налог на недвижимость', uk: 'Податок на нерухомість', fr: 'Taxe foncière', lt: 'Nekilnojamojo turto mokestis' } },
    ],
  },
  {
    key: 'utility',
    labelsByLocale: { en: 'Utilities', ru: 'Утилиты', uk: 'Утиліти', fr: 'Utilitaires', lt: 'Priemonės' },
    tools: [
      { href: '/weather', labels: { en: 'Weather Forecast', ru: 'Прогноз погоды', uk: 'Прогноз погоди', fr: 'Météo', lt: 'Oro prognozė' } },
      { href: '/tools/password-generator', labels: { en: 'Password Generator', ru: 'Генератор паролей', uk: 'Генератор паролів', fr: 'Générateur de mot de passe', lt: 'Slaptažodžių generatorius' } },
      { href: '/converter/units', labels: { en: 'Unit Converter', ru: 'Конвертер единиц', uk: 'Конвертер одиниць', fr: "Convertisseur d'unités", lt: 'Vienetų keitiklis' } },
      { href: '/calculator/tip', labels: { en: 'Tip Calculator', ru: 'Калькулятор чаевых', uk: 'Калькулятор чайових', fr: 'Calculatrice de pourboire', lt: 'Arbatpinigių skaičiuotuvas' } },
      { href: '/calculator/age', labels: { en: 'Age Calculator', ru: 'Калькулятор возраста', uk: 'Калькулятор віку', fr: "Calculatrice d'âge", lt: 'Amžiaus skaičiuotuvas' } },
      { href: '/calculator/date-diff', labels: { en: 'Date Difference', ru: 'Разница дат', uk: 'Різниця дат', fr: 'Différence de dates', lt: 'Datų skirtumas' } },
      { href: '/tools/countdown', labels: { en: 'Countdown Timer', ru: 'Таймер обратного отсчёта', uk: 'Таймер зворотного відліку', fr: 'Compte à rebours', lt: 'Atgalinio skaičiavimo laikmatis' } },
      { href: '/calculator/fuel-cost', labels: { en: 'Fuel Cost Calculator', ru: 'Калькулятор расхода топлива', uk: 'Калькулятор витрат на пальне', fr: 'Calculatrice Coût Carburant', lt: 'Degalų kainos skaičiuotuvas' } },
      { href: '/calculator/electricity-bill', labels: { en: 'Electricity Bill Calculator', ru: 'Калькулятор электроэнергии', uk: 'Калькулятор електроенергії', fr: 'Calculatrice Facture Électricité', lt: 'Elektros sąskaitos skaičiuotuvas' } },
      { href: '/calculator/ac-cost', labels: { en: 'AC & Heating Cost', ru: 'Кондиционер / отопление', uk: 'Кондиціонер / опалення', fr: 'Clim & Chauffage', lt: 'Kondicionierius / šildymas' } },
      { href: '/calculator/material-cost', labels: { en: 'Flooring, Paint & Concrete', ru: 'Полы, краска и бетон', uk: 'Підлога, фарба і бетон', fr: 'Revêtement, Peinture & Béton', lt: 'Grindys, dažai ir betonas' } },
      { href: '/calculator/party-food', labels: { en: 'Party Food Calculator', ru: 'Продукты для вечеринки', uk: 'Продукти для вечірки', fr: 'Buffet Fête', lt: 'Šventiniai produktai' } },
      { href: '/calculator/pool-volume', labels: { en: 'Pool Volume Calculator', ru: 'Объём бассейна', uk: 'Об\'єм басейну', fr: 'Volume Piscine', lt: 'Baseino tūris' } },
    ],
  },
  {
    key: 'measure',
    labelsByLocale: { en: 'Measurements', ru: 'Измерения', uk: 'Вимірювання', fr: 'Mesures', lt: 'Matavimai' },
    tools: [
      { href: '/converter/color', labels: { en: 'Color Converter', ru: 'Конвертер цветов', uk: 'Конвертер кольорів', fr: 'Convertisseur de couleurs', lt: 'Spalvų keitiklis' } },
      { href: '/converter/clothing-size', labels: { en: 'Clothing Size Converter', ru: 'Конвертер размеров одежды', uk: 'Конвертер розмірів одягу', fr: 'Convertisseur de tailles', lt: 'Drabužių dydžių keitiklis' } },
    ],
  },
  {
    key: 'esoteric',
    labelsByLocale: { en: 'Esoteric', ru: 'Эзотерика', uk: 'Езотерика', fr: 'Ésotérique', lt: 'Ezoterika' },
    tools: [
      { href: '/calculator/life-path', labels: { en: 'Life Path Number', ru: 'Число жизненного пути', uk: 'Число життєвого шляху', fr: 'Nombre du Chemin de Vie', lt: 'Gyvenimo kelio skaičius' } },
      { href: '/calculator/destiny-number', labels: { en: 'Destiny Number', ru: 'Число судьбы', uk: 'Число долі', fr: 'Nombre du Destin', lt: 'Likimo skaičius' } },
      { href: '/calculator/name-number', labels: { en: 'Name Number', ru: 'Число имени', uk: 'Число імені', fr: 'Nombre du Prénom', lt: 'Vardo skaičius' } },
      { href: '/calculator/soul-number', labels: { en: 'Soul Number', ru: 'Число души', uk: 'Число душі', fr: "Nombre de l'Âme", lt: 'Sielos skaičius' } },
      { href: '/calculator/personality-number', labels: { en: 'Personality Number', ru: 'Число личности', uk: 'Число особистості', fr: 'Nombre de la Personnalité', lt: 'Asmenybės skaičius' } },
      { href: '/calculator/personal-year', labels: { en: 'Personal Year', ru: 'Персональный год', uk: 'Персональний рік', fr: 'Année Personnelle', lt: 'Asmeniniai metai' } },
      { href: '/calculator/numerology-compatibility', labels: { en: 'Numerology Compatibility', ru: 'Совместимость', uk: 'Сумісність', fr: 'Compatibilité', lt: 'Suderinamumas' } },
      { href: '/calculator/pythagorean-matrix', labels: { en: 'Pythagorean Matrix', ru: 'Матрица Пифагора', uk: 'Матриця Піфагора', fr: 'Matrice de Pythagore', lt: 'Pitagoro matrica' } },
      { href: '/calculator/karmic-number', labels: { en: 'Karmic Numbers', ru: 'Кармические числа', uk: 'Кармічні числа', fr: 'Nombres Karmiques', lt: 'Karminiai skaičiai' } },
      { href: '/calculator/zodiac-sign', labels: { en: 'Zodiac Sign', ru: 'Знак зодиака', uk: 'Знак зодіаку', fr: 'Signe du Zodiaque', lt: 'Zodiako ženklas' } },
      { href: '/calculator/chinese-zodiac', labels: { en: 'Chinese Zodiac', ru: 'Китайский гороскоп', uk: 'Китайський гороскоп', fr: 'Zodiaque Chinois', lt: 'Kinų zodiako ženklas' } },
      { href: '/calculator/celtic-zodiac', labels: { en: 'Celtic Zodiac', ru: 'Кельтский зодиак', uk: 'Кельтський зодіак', fr: 'Zodiaque Celtique', lt: 'Keltų zodiako ženklas' } },
      { href: '/calculator/zodiac-compatibility', labels: { en: 'Zodiac Compatibility', ru: 'Совместимость знаков', uk: 'Сумісність знаків', fr: 'Compatibilité', lt: 'Ženklų suderinamumas' } },
      { href: '/calculator/mercury-retrograde', labels: { en: 'Mercury Retrograde', ru: 'Меркурий ретроградный', uk: 'Меркурій ретроградний', fr: 'Mercure Rétrograde', lt: 'Merkurijaus retrogradas' } },
      { href: '/calculator/angel-number', labels: { en: 'Angel Number', ru: 'Число ангела', uk: 'Число ангела', fr: 'Nombre Angélique', lt: 'Angelo skaičius' } },
      { href: '/calculator/archetype-number', labels: { en: 'Personality Archetype', ru: 'Архетип личности', uk: 'Архетип особистості', fr: 'Archétype', lt: 'Asmenybės archetipas' } },
      { href: '/calculator/biorhythm', labels: { en: 'Biorhythm', ru: 'Биоритмы', uk: 'Біоритми', fr: 'Biorythmes', lt: 'Bioritmas' } },
      { href: '/calculator/moon-phases', labels: { en: 'Moon Phases', ru: 'Лунный календарь', uk: 'Фази місяця', fr: 'Phases de la Lune', lt: 'Mėnulio fazės' } },
      { href: '/calculator/moon-sign', labels: { en: 'Moon Sign', ru: 'Лунный знак', uk: 'Місячний знак', fr: 'Signe Lunaire', lt: 'Mėnulio ženklas' } },
    ],
  },
  {
    key: 'health',
    labelsByLocale: { en: 'Health', ru: 'Здоровье', uk: "Здоров'я", fr: 'Santé', lt: 'Sveikata' },
    tools: [
      { href: '/calculator/bmi', labels: { en: 'BMI Calculator', ru: 'Калькулятор ИМТ', uk: 'Калькулятор ІМТ', fr: 'Calculatrice IMC', lt: 'KMI skaičiuotuvas' } },
      { href: '/calculator/calories', labels: { en: 'Calorie Calculator', ru: 'Калькулятор калорий', uk: 'Калькулятор калорій', fr: 'Calculatrice de calories', lt: 'Kalorijų skaičiuotuvas' } },
      { href: '/calculator/pregnancy', labels: { en: 'Pregnancy Calculator', ru: 'Калькулятор беременности', uk: 'Калькулятор вагітності', fr: 'Calculatrice de grossesse', lt: 'Nėštumo skaičiuotuvas' } },
      { href: '/calculator/ideal-weight', labels: { en: 'Ideal Weight Calculator', ru: 'Калькулятор идеального веса', uk: 'Калькулятор ідеальної ваги', fr: 'Poids Idéal', lt: 'Idealaus svorio skaičiuotuvas' } },
      { href: '/calculator/heart-rate', labels: { en: 'Heart Rate Zones', ru: 'Пульсовые зоны', uk: 'Пульсові зони', fr: 'Zones de FC', lt: 'Pulso zonos' } },
      { href: '/calculator/biological-age', labels: { en: 'Biological Age', ru: 'Биологический возраст', uk: 'Біологічний вік', fr: 'Âge biologique', lt: 'Biologinis amžius' } },
      { href: '/calculator/diabetes-risk', labels: { en: 'Diabetes Risk', ru: 'Риск диабета', uk: 'Ризик діабету', fr: 'Risque de diabète', lt: 'Diabeto rizika' } },
      { href: '/calculator/stress-level', labels: { en: 'Stress Level Test', ru: 'Уровень стресса', uk: 'Рівень стресу', fr: 'Niveau de stress', lt: 'Streso lygis' } },
      { href: '/calculator/sleep', labels: { en: 'Sleep Calculator', ru: 'Калькулятор сна', uk: 'Калькулятор сну', fr: 'Calculatrice de sommeil', lt: 'Miego skaičiuotuvas' } },
      { href: '/calculator/body-fat', labels: { en: 'Body Fat Calculator', ru: 'Калькулятор жира', uk: 'Калькулятор жиру', fr: 'Calculatrice de graisse', lt: 'Kūno riebalų skaičiuotuvas' } },
      { href: '/calculator/water-intake', labels: { en: 'Water Intake Calculator', ru: 'Норма воды', uk: 'Норма води', fr: 'Apport en eau', lt: 'Vandens norma' } },
      { href: '/calculator/ovulation', labels: { en: 'Ovulation Calculator', ru: 'Калькулятор овуляции', uk: 'Калькулятор овуляції', fr: "Calculatrice d'ovulation", lt: 'Ovuliacijos skaičiuotuvas' } },
      { href: '/calculator/calorie-deficit', labels: { en: 'Calorie Deficit Calculator', ru: 'Калькулятор дефицита калорий', uk: 'Калькулятор дефіциту калорій', fr: 'Calculatrice Déficit Calorique', lt: 'Kalorijų deficito skaičiuotuvas' } },
      { href: '/calculator/pace', labels: { en: 'Running / Cycling Pace', ru: 'Темп бега/велосипеда', uk: 'Темп бігу/велосипеда', fr: 'Allure Course/Vélo', lt: 'Bėgimo / dviračio tempas' } },
      { href: '/calculator/macros', labels: { en: 'Macro Calculator', ru: 'Калькулятор КБЖУ', uk: 'Калькулятор КБЖВ', fr: 'Calculatrice Macros', lt: 'Makroelementų skaičiuotuvas' } },
      { href: '/calculator/spf', labels: { en: 'SPF Calculator', ru: 'Калькулятор SPF', uk: 'Калькулятор SPF', fr: 'Calculatrice SPF', lt: 'SPF skaičiuotuvas' } },
    ],
  },
];

const NAV_PAGES: NavPage[] = [
  { href: '', labels: { en: 'Home', ru: 'Главная', uk: 'Головна', fr: 'Accueil', lt: 'Pradžia' } },
  { href: '/about', labels: { en: 'About', ru: 'О нас', uk: 'Про нас', fr: 'À propos', lt: 'Apie mus' } },
  { href: '/contact', labels: { en: 'Contact', ru: 'Контакты', uk: 'Контакти', fr: 'Contact', lt: 'Kontaktai' } },
  { href: '/privacy-policy', labels: { en: 'Privacy Policy', ru: 'Конфиденциальность', uk: 'Конфіденційність', fr: 'Confidentialité', lt: 'Privatumas' } },
];

const FAV_LABEL: Record<string, string> = {
  en: 'Favorites', ru: 'Избранное', uk: 'Вибране', fr: 'Favoris', lt: 'Mėgstamiausi',
};

const TRIGGER_LABEL: Record<string, string> = {
  en: 'Tools', ru: 'Инструменты', uk: 'Інструменти', fr: 'Outils', lt: 'Įrankiai',
};

const PAGES_LABEL: Record<string, string> = {
  en: 'Pages', ru: 'Страницы', uk: 'Сторінки', fr: 'Pages', lt: 'Puslapiai',
};

const SIDEBAR_HOME_LABEL: Record<string, string> = {
  en: 'All Tools', ru: 'Все инструменты', uk: 'Всі інструменти', fr: 'Tous les outils', lt: 'Visi įrankiai',
};

export default function NavMenu({ locale }: { locale: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pagesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDesktop = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopOpen(true);
  };
  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setDesktopOpen(false);
      setActiveCat(null);
    }, 150);
  };
  const closeDesktop = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopOpen(false);
    setActiveCat(null);
  };

  const openPages = () => {
    if (pagesTimerRef.current) clearTimeout(pagesTimerRef.current);
    setPagesOpen(true);
  };
  const schedulePagesClose = () => {
    pagesTimerRef.current = setTimeout(() => setPagesOpen(false), 150);
  };
  const closePages = () => {
    if (pagesTimerRef.current) clearTimeout(pagesTimerRef.current);
    setPagesOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
    setOpenSection(null);
  };

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const triggerLabel = TRIGGER_LABEL[locale] || TRIGGER_LABEL.en;
  const pagesLabel = PAGES_LABEL[locale] || PAGES_LABEL.en;
  const sidebarHomeLabel = SIDEBAR_HOME_LABEL[locale] || SIDEBAR_HOME_LABEL.en;
  const effectiveCat = activeCat ?? NAV_CATEGORIES[0].key;
  const activeCatData = NAV_CATEGORIES.find(c => c.key === effectiveCat) ?? NAV_CATEGORIES[0];

  const chevronSvg = (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
      <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      {/* Desktop Tools nav */}
      <nav
        className={styles.nav}
        onMouseEnter={openDesktop}
        onMouseLeave={scheduleClose}
        aria-label={triggerLabel}
      >
        <button
          type="button"
          className={`${styles.nav__trigger}${desktopOpen ? ` ${styles['nav__trigger--open']}` : ''}`}
          aria-haspopup="true"
          aria-expanded={desktopOpen}
        >
          {triggerLabel}
          {chevronSvg}
        </button>

        <div
          className={`${styles.nav__dropdown}${desktopOpen ? ` ${styles['nav__dropdown--open']}` : ''}`}
          role="menu"
          onMouseEnter={openDesktop}
          onMouseLeave={scheduleClose}
        >
          <div className={styles['nav__dropdown-inner']}>
            {/* Top row: category tabs — now as links */}
            <ul className={styles['nav__cat-list']}>
              <li className={styles['nav__cat-item']} role="none">
                <Link
                  href={`/${locale}?category=favorites`}
                  className={`${styles['nav__cat-link']} ${styles['nav__cat-link--fav']}`}
                  onClick={closeDesktop}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {FAV_LABEL[locale] || FAV_LABEL.en}
                </Link>
              </li>
              {NAV_CATEGORIES.map((cat) => (
                <li
                  key={cat.key}
                  className={`${styles['nav__cat-item']}${effectiveCat === cat.key ? ` ${styles['nav__cat-item--active']}` : ''}`}
                  onMouseEnter={() => setActiveCat(cat.key)}
                  role="none"
                >
                  <Link
                    href={`/${locale}?category=${cat.key}`}
                    className={styles['nav__cat-link']}
                    onClick={closeDesktop}
                  >
                    {cat.labelsByLocale[locale] || cat.labelsByLocale.en}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Bottom panel: tools for active/default category */}
            <div className={styles['nav__tools-panel']}>
              {activeCatData.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={`/${locale}${tool.href}`}
                  className={styles['nav__tool-link']}
                  role="menuitem"
                  onClick={closeDesktop}
                >
                  {tool.labels[locale] || tool.labels.en}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Pages nav */}
      <nav
        className={styles['nav-pages']}
        onMouseEnter={openPages}
        onMouseLeave={schedulePagesClose}
        aria-label={pagesLabel}
      >
        <button
          type="button"
          className={`${styles['nav-pages__trigger']}${pagesOpen ? ` ${styles['nav-pages__trigger--open']}` : ''}`}
          aria-haspopup="true"
          aria-expanded={pagesOpen}
        >
          {pagesLabel}
          {chevronSvg}
        </button>

        <div
          className={`${styles['nav-pages__dropdown']}${pagesOpen ? ` ${styles['nav-pages__dropdown--open']}` : ''}`}
          role="menu"
        >
          {NAV_PAGES.map((page) => (
            <Link
              key={page.href}
              href={`/${locale}${page.href}`}
              className={styles['nav-pages__link']}
              role="menuitem"
              onClick={closePages}
            >
              {page.labels[locale] || page.labels.en}
            </Link>
          ))}
        </div>
      </nav>

      {/* Burger button — mobile only */}
      <button
        type="button"
        className={styles.burger}
        onClick={() => setSidebarOpen(true)}
        aria-label={triggerLabel}
        aria-expanded={sidebarOpen}
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
          <rect x="0" y="0" width="22" height="2" rx="1" fill="currentColor" />
          <rect x="0" y="7" width="22" height="2" rx="1" fill="currentColor" />
          <rect x="0" y="14" width="22" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar}${sidebarOpen ? ` ${styles['sidebar--open']}` : ''}`}
        aria-label={sidebarHomeLabel}
      >
        <div className={styles.sidebar__header}>
          <Link href={`/${locale}?category=all`} className={styles.sidebar__home} onClick={closeSidebar}>
            {sidebarHomeLabel}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button
            type="button"
            className={styles.sidebar__close}
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tool categories — scrollable area */}
        <div className={styles['sidebar__categories']}>
          {/* Favorites — direct link, not accordion */}
          <div className={styles.sidebar__section}>
            <Link
              href={`/${locale}?category=favorites`}
              className={`${styles['sidebar__section-btn']} ${styles['sidebar__section-btn--fav']}`}
              onClick={closeSidebar}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{FAV_LABEL[locale] || FAV_LABEL.en}</span>
            </Link>
          </div>

          {NAV_CATEGORIES.map((cat) => {
            const isOpen = openSection === cat.key;
            return (
              <div key={cat.key} className={styles.sidebar__section}>
                <button
                  type="button"
                  className={styles['sidebar__section-btn']}
                  onClick={() => toggleSection(cat.key)}
                  aria-expanded={isOpen}
                >
                  <span>{cat.labelsByLocale[locale] || cat.labelsByLocale.en}</span>
                  <svg
                    className={`${styles['sidebar__section-arrow']}${isOpen ? ` ${styles['sidebar__section-arrow--open']}` : ''}`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <ul className={styles['sidebar__tool-list']}>
                    {cat.tools.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={`/${locale}${tool.href}`}
                          className={styles['sidebar__tool-link']}
                          onClick={closeSidebar}
                        >
                          {tool.labels[locale] || tool.labels.en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Pages section — fixed at the very bottom */}
        <div className={`${styles.sidebar__section} ${styles['sidebar__section--pages']}`}>
          <button
            type="button"
            className={styles['sidebar__section-btn']}
            onClick={() => toggleSection('__pages__')}
            aria-expanded={openSection === '__pages__'}
          >
            <span>{pagesLabel}</span>
            <svg
              className={styles['sidebar__section-arrow']}
              style={{ transform: openSection === '__pages__' ? 'rotate(0deg)' : 'rotate(180deg)' }}
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {openSection === '__pages__' && (
            <ul className={styles['sidebar__tool-list']}>
              {NAV_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={`/${locale}${page.href}`}
                    className={styles['sidebar__tool-link']}
                    onClick={closeSidebar}
                  >
                    {page.labels[locale] || page.labels.en}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
