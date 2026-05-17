import type { Metadata } from 'next';
import Link from 'next/link';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
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

const TOOLS = [
  {
    href: '/calculator/mortgage',
    icon: '🏠',
    titles: { en: 'Mortgage Calculator', ru: 'Ипотечный калькулятор', uk: 'Іпотечний калькулятор', fr: 'Calculatrice de prêt immobilier', lt: 'Hipotekos skaičiuotuvas' },
    descs: { en: 'Calculate monthly payments', ru: 'Рассчитайте ежемесячный платёж', uk: 'Розрахуйте щомісячний платіж', fr: 'Calculez vos mensualités', lt: 'Apskaičiuokite mėnesio įmokas' },
  },
  {
    href: '/calculator/loan',
    icon: '💳',
    titles: { en: 'Loan Calculator', ru: 'Калькулятор кредита', uk: 'Калькулятор кредиту', fr: 'Calculatrice de prêt', lt: 'Paskolos skaičiuotuvas' },
    descs: { en: 'Calculate loan payments', ru: 'Рассчитайте платежи по кредиту', uk: 'Розрахуйте платежі за кредитом', fr: 'Calculez vos remboursements', lt: 'Apskaičiuokite paskolos įmokas' },
  },
  {
    href: '/calculator/bmi',
    icon: '⚖️',
    titles: { en: 'BMI Calculator', ru: 'Калькулятор ИМТ', uk: 'Калькулятор ІМТ', fr: 'Calcul de l\'IMC', lt: 'KMI skaičiuotuvas' },
    descs: { en: 'Calculate your body mass index', ru: 'Вычислите индекс массы тела', uk: 'Обчисліть індекс маси тіла', fr: 'Calculez votre indice de masse corporelle', lt: 'Apskaičiuokite kūno masės indeksą' },
  },
  {
    href: '/calculator/calories',
    icon: '🥗',
    titles: { en: 'Calorie Calculator', ru: 'Калькулятор калорий', uk: 'Калькулятор калорій', fr: 'Calculatrice de calories', lt: 'Kalorijų skaičiuotuvas' },
    descs: { en: 'Calculate your daily calorie needs', ru: 'Рассчитайте суточную норму калорий', uk: 'Розрахуйте добову норму калорій', fr: 'Calculez vos besoins caloriques', lt: 'Apskaičiuokite dienos kalorijų poreikį' },
  },
  {
    href: '/currency',
    icon: '💱',
    titles: { en: 'Currency Converter', ru: 'Конвертер валют', uk: 'Конвертер валют', fr: 'Convertisseur de devises', lt: 'Valiutų keitiklis' },
    descs: { en: 'Live exchange rates', ru: 'Актуальные курсы валют', uk: 'Актуальні курси валют', fr: 'Taux de change en direct', lt: 'Aktualūs valiutų kursai' },
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const pageTitle: Record<string, string> = {
    en: 'Free Online Tools',
    ru: 'Бесплатные онлайн-инструменты',
    uk: 'Безкоштовні онлайн-інструменти',
    fr: 'Outils en ligne gratuits',
    lt: 'Nemokomi internetiniai įrankiai',
  };

  return (
    <div className={styles.home}>
      <div className="container">
        <h1 className={styles.home__title}>{pageTitle[locale] || pageTitle.en}</h1>
        <div className={styles.home__grid}>
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={`/${locale}${tool.href}`}
              className={styles['tool-card']}
            >
              <span className={styles['tool-card__icon']}>{tool.icon}</span>
              <h2 className={styles['tool-card__title']}>
                {tool.titles[locale as keyof typeof tool.titles] || tool.titles.en}
              </h2>
              <p className={styles['tool-card__desc']}>
                {tool.descs[locale as keyof typeof tool.descs] || tool.descs.en}
              </p>
            </Link>
          ))}
        </div>
        <div className={styles.home__ad}>
          <AdPlaceholder locale={locale} size="banner" />
        </div>
      </div>
    </div>
  );
}
