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
      { href: '/currency/rates', labels: { en: 'Exchange Rates', ru: 'Курс валют', uk: 'Курс валют', fr: 'Taux de change', lt: 'Valiutų kursai' } },
      { href: '/calculator/car-insurance', labels: { en: 'Car Insurance Calculator', ru: 'Калькулятор страховки авто', uk: 'Калькулятор страховки авто', fr: 'Assurance auto', lt: 'Automobilio draudimas' } },
      { href: '/calculator/life-insurance', labels: { en: 'Life Insurance Calculator', ru: 'Калькулятор страховки жизни', uk: 'Калькулятор страховки життя', fr: 'Assurance vie', lt: 'Gyvybės draudimas' } },
      { href: '/calculator/income-tax', labels: { en: 'Income Tax Calculator', ru: 'Калькулятор подоходного налога', uk: 'Калькулятор прибуткового податку', fr: 'Impôt sur le revenu', lt: 'Pajamų mokestis' } },
      { href: '/calculator/freelance-rate', labels: { en: 'Freelance Rate Calculator', ru: 'Калькулятор ставки фрилансера', uk: 'Калькулятор ставки фрилансера', fr: 'Taux freelance', lt: 'Laisvai samdomų tarifas' } },
      { href: '/calculator/margin', labels: { en: 'Margin & Markup Calculator', ru: 'Калькулятор маржи и наценки', uk: 'Калькулятор маржі і націнки', fr: 'Marge et majoration', lt: 'Maržos skaičiuotuvas' } },
      { href: '/calculator/discount', labels: { en: 'Discount Calculator', ru: 'Калькулятор скидки', uk: 'Калькулятор знижки', fr: 'Calculatrice de remise', lt: 'Nuolaidos skaičiuotuvas' } },
      { href: '/calculator/percentage', labels: { en: 'Percentage Calculator', ru: 'Калькулятор процентов', uk: 'Калькулятор відсотків', fr: 'Calculatrice de pourcentage', lt: 'Procentų skaičiuotuvas' } },
      { href: '/calculator/salary', labels: { en: 'Gross to Net Salary', ru: 'Зарплата брутто-нетто', uk: 'Зарплата брутто-нетто', fr: 'Salaire Brut-Net', lt: 'Bruto-Neto atlyginimas' } },
    ],
  },
  {
    key: 'crypto',
    labels: { en: 'Crypto', ru: 'Криптовалюта', uk: 'Криптовалюта', fr: 'Crypto', lt: 'Kripto' },
    tools: [
      { href: '/crypto', labels: { en: 'Crypto Rates', ru: 'Курс криптовалют', uk: 'Курс криптовалют', fr: 'Cours des cryptos', lt: 'Kriptovaliutų kursai' } },
      { href: '/crypto/converter', labels: { en: 'Crypto Converter', ru: 'Конвертер криптовалют', uk: 'Конвертер криптовалют', fr: 'Convertisseur crypto', lt: 'Kriptovaliutų keitiklis' } },
      { href: '/calculator/crypto-tax', labels: { en: 'Crypto Tax Calculator', ru: 'Налог на доход от крипты', uk: 'Податок на дохід від крипти', fr: 'Impôt crypto', lt: 'Kriptovaliutų mokestis' } },
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
      { href: '/calculator/biological-age', labels: { en: 'Biological Age Calculator', ru: 'Калькулятор биологического возраста', uk: 'Калькулятор біологічного віку', fr: 'Âge biologique', lt: 'Biologinio amžiaus skaičiuotuvas' } },
      { href: '/calculator/diabetes-risk', labels: { en: 'Diabetes Risk Calculator', ru: 'Калькулятор риска диабета', uk: 'Калькулятор ризику діабету', fr: 'Risque de diabète', lt: 'Diabeto rizikos skaičiuotuvas' } },
      { href: '/calculator/stress-level', labels: { en: 'Stress Level Calculator', ru: 'Калькулятор уровня стресса', uk: 'Калькулятор рівня стресу', fr: 'Calculatrice du stress', lt: 'Streso lygio skaičiuotuvas' } },
      { href: '/calculator/sleep', labels: { en: 'Sleep Calculator', ru: 'Калькулятор сна', uk: 'Калькулятор сну', fr: 'Calculatrice du sommeil', lt: 'Miego skaičiuotuvas' } },
      { href: '/calculator/body-fat', labels: { en: 'Body Fat Calculator', ru: 'Калькулятор % жира в теле', uk: 'Калькулятор % жиру в тілі', fr: 'Graisse corporelle', lt: 'Kūno riebalų skaičiuotuvas' } },
      { href: '/calculator/water-intake', labels: { en: 'Water Intake Calculator', ru: 'Норма воды в день', uk: 'Норма води на день', fr: 'Apport en eau quotidien', lt: 'Vandens normos skaičiuotuvas' } },
      { href: '/calculator/ovulation', labels: { en: 'Ovulation Calculator', ru: 'Калькулятор овуляции', uk: 'Калькулятор овуляції', fr: 'Calculatrice d\'ovulation', lt: 'Ovuliacijos skaičiuotuvas' } },
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
      { href: '/calculator/gpa', labels: { en: 'GPA Calculator', ru: 'Калькулятор GPA', uk: 'Калькулятор GPA', fr: 'Calculatrice GPA', lt: 'GPA skaičiuotuvas' } },
      { href: '/converter/grade-system', labels: { en: 'Grade System Converter', ru: 'Конвертер систем оценок', uk: 'Конвертер систем оцінок', fr: 'Convertisseur de notes', lt: 'Pažymių konverteris' } },
      { href: '/tools/word-counter', labels: { en: 'Word Counter', ru: 'Счётчик слов', uk: 'Лічильник слів', fr: 'Compteur de mots', lt: 'Žodžių skaičiuotuvas' } },
      { href: '/calculator/basic', labels: { en: 'Basic Calculator', ru: 'Простой калькулятор', uk: 'Простий калькулятор', fr: 'Calculatrice basique', lt: 'Paprastas skaičiuotuvas' } },
      { href: '/calculator/engineering', labels: { en: 'Scientific Calculator', ru: 'Инженерный калькулятор', uk: 'Інженерний калькулятор', fr: 'Calculatrice scientifique', lt: 'Inžinerinis skaičiuotuvas' } },
      { href: '/converter/timezone', labels: { en: 'Timezone Converter', ru: 'Конвертер часовых поясов', uk: 'Конвертер часових поясів', fr: 'Fuseaux horaires', lt: 'Laiko juostų keitiklis' } },
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
  {
    key: 'esoteric',
    labels: { en: 'Esoteric', ru: 'Эзотерика', uk: 'Езотерика', fr: 'Ésotérique', lt: 'Ezoterika' },
    tools: [
      { href: '/calculator/life-path', labels: { en: 'Life Path Number', ru: 'Число жизненного пути', uk: 'Число життєвого шляху', fr: 'Chemin de Vie', lt: 'Gyvenimo kelio skaičius' } },
      { href: '/calculator/destiny-number', labels: { en: 'Destiny Number', ru: 'Число судьбы', uk: 'Число долі', fr: 'Nombre Destin', lt: 'Likimo skaičius' } },
      { href: '/calculator/name-number', labels: { en: 'Name Number', ru: 'Число имени', uk: 'Число імені', fr: 'Nombre du Nom', lt: 'Vardo skaičius' } },
      { href: '/calculator/soul-number', labels: { en: 'Soul Number', ru: 'Число души', uk: 'Число душі', fr: "Nombre de l'Âme", lt: 'Sielos skaičius' } },
      { href: '/calculator/personality-number', labels: { en: 'Personality Number', ru: 'Число личности', uk: 'Число особистості', fr: 'Nombre de Personnalité', lt: 'Asmenybės skaičius' } },
      { href: '/calculator/personal-year', labels: { en: 'Personal Year', ru: 'Персональный год', uk: 'Персональний рік', fr: 'Année Personnelle', lt: 'Asmeniniai metai' } },
      { href: '/calculator/numerology-compatibility', labels: { en: 'Numerology Compatibility', ru: 'Совместимость нумерология', uk: 'Сумісність нумерологія', fr: 'Compatibilité Numérologique', lt: 'Numerologinis suderinamumas' } },
      { href: '/calculator/pythagorean-matrix', labels: { en: 'Pythagorean Matrix', ru: 'Матрица Пифагора', uk: 'Матриця Піфагора', fr: 'Matrice Pythagoricienne', lt: 'Pitagoro matrica' } },
      { href: '/calculator/karmic-number', labels: { en: 'Karmic Numbers', ru: 'Кармические числа', uk: 'Кармічні числа', fr: 'Nombres Karmiques', lt: 'Karminiai skaičiai' } },
      { href: '/calculator/zodiac-sign', labels: { en: 'Zodiac Sign', ru: 'Знак зодиака', uk: 'Знак зодіаку', fr: 'Signe du Zodiaque', lt: 'Zodiako ženklas' } },
      { href: '/calculator/chinese-zodiac', labels: { en: 'Chinese Zodiac', ru: 'Китайский гороскоп', uk: 'Китайський гороскоп', fr: 'Zodiaque Chinois', lt: 'Kinų zodiako ženklas' } },
      { href: '/calculator/celtic-zodiac', labels: { en: 'Celtic Zodiac', ru: 'Кельтский зодиак', uk: 'Кельтський зодіак', fr: 'Zodiaque Celtique', lt: 'Keltų zodiako ženklas' } },
      { href: '/calculator/zodiac-compatibility', labels: { en: 'Zodiac Compatibility', ru: 'Совместимость знаков', uk: 'Сумісність знаків', fr: 'Compatibilité Astrologique', lt: 'Ženklų suderinamumas' } },
      { href: '/calculator/mercury-retrograde', labels: { en: 'Mercury Retrograde', ru: 'Меркурий ретроградный', uk: 'Меркурій ретроградний', fr: 'Mercure Rétrograde', lt: 'Merkurijaus retrogradas' } },
      { href: '/calculator/angel-number', labels: { en: 'Angel Number', ru: 'Число ангела', uk: 'Число ангела', fr: 'Nombre Angélique', lt: 'Angelo skaičius' } },
      { href: '/calculator/archetype-number', labels: { en: 'Personality Archetype', ru: 'Архетип личности', uk: 'Архетип особистості', fr: 'Archétype de Personnalité', lt: 'Asmenybės archetipas' } },
      { href: '/calculator/biorhythm', labels: { en: 'Biorhythm Calculator', ru: 'Биоритмы', uk: 'Біоритми', fr: 'Biorythmes', lt: 'Bioritmas' } },
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
