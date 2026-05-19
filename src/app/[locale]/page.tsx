import type { Metadata } from 'next';
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
