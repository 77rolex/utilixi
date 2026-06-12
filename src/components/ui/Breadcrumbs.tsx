'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.scss';

type ToolCategory = 'finance' | 'crypto' | 'health' | 'utility' | 'legal' | 'measure' | 'realestate' | 'esoteric';

const BACK_LABEL: Record<string, string> = {
  en: 'Back to',
  ru: 'Вернуться к',
  uk: 'Повернутися до',
  fr: 'Retour à',
  lt: 'Grįžti į',
};

const CATEGORY_LABELS: Record<string, Record<ToolCategory, string>> = {
  en: { finance: 'Finance', crypto: 'Crypto', health: 'Health', utility: 'Utilities', legal: 'Legal', measure: 'Measurements', realestate: 'Real Estate', esoteric: 'Esoteric' },
  ru: { finance: 'Финансы', crypto: 'Криптовалюта', health: 'Здоровье', utility: 'Утилиты', legal: 'Юридические', measure: 'Измерения', realestate: 'Недвижимость', esoteric: 'Эзотерика' },
  uk: { finance: 'Фінанси', crypto: 'Криптовалюта', health: "Здоров'я", utility: 'Утиліти', legal: 'Юридичні', measure: 'Вимірювання', realestate: 'Нерухомість', esoteric: 'Езотерика' },
  fr: { finance: 'Finance', crypto: 'Crypto', health: 'Santé', utility: 'Utilitaires', legal: 'Juridique', measure: 'Mesures', realestate: 'Immobilier', esoteric: 'Ésotérique' },
  lt: { finance: 'Finansai', crypto: 'Kripto', health: 'Sveikata', utility: 'Priemones', legal: 'Teisinius', measure: 'Matavimus', realestate: 'Nekilnojamąjį turtą', esoteric: 'Ezoteriką' },
};

type ToolMeta = { category: ToolCategory };

const TOOL_META: Record<string, ToolMeta> = {
  '/calculator/mortgage': { category: 'finance' },
  '/calculator/loan': { category: 'finance' },
  '/calculator/deposit': { category: 'finance' },
  '/calculator/bmi': { category: 'health' },
  '/calculator/calories': { category: 'health' },
  '/calculator/pregnancy': { category: 'health' },
  '/calculator/ideal-weight': { category: 'health' },
  '/currency': { category: 'finance' },
  '/currency/rates': { category: 'finance' },
  '/crypto': { category: 'crypto' },
  '/crypto/converter': { category: 'crypto' },
  '/weather': { category: 'utility' },
  '/calculator/alimony': { category: 'legal' },
  '/calculator/rent-vs-buy': { category: 'finance' },
  '/calculator/roi': { category: 'finance' },
  '/calculator/pension': { category: 'finance' },
  '/tools/password-generator': { category: 'utility' },
  '/calculator/vat': { category: 'finance' },
  '/calculator/compound-interest': { category: 'finance' },
  '/converter/units': { category: 'measure' },
  '/calculator/heart-rate': { category: 'health' },
  '/calculator/tip': { category: 'utility' },
  '/calculator/age': { category: 'utility' },
  '/calculator/date-diff': { category: 'utility' },
  '/converter/color': { category: 'measure' },
  '/converter/clothing-size': { category: 'measure' },
  '/tools/countdown': { category: 'utility' },
  '/calculator/traffic-fine': { category: 'legal' },
  '/calculator/flight-delay': { category: 'legal' },
  '/calculator/limitation': { category: 'legal' },
  '/calculator/renovation': { category: 'realestate' },
  '/calculator/property-tax': { category: 'realestate' },
  '/calculator/car-insurance': { category: 'finance' },
  '/calculator/life-insurance': { category: 'finance' },
  '/calculator/income-tax': { category: 'finance' },
  '/calculator/crypto-tax': { category: 'crypto' },
  '/calculator/freelance-rate': { category: 'finance' },
  '/calculator/margin': { category: 'finance' },
  '/calculator/gpa': { category: 'utility' },
  '/converter/grade-system': { category: 'utility' },
  '/calculator/biological-age': { category: 'health' },
  '/calculator/diabetes-risk': { category: 'health' },
  '/calculator/stress-level': { category: 'health' },
  '/tools/word-counter': { category: 'utility' },
  '/calculator/discount': { category: 'finance' },
  '/calculator/sleep': { category: 'health' },
  '/calculator/percentage': { category: 'utility' },
  '/calculator/basic': { category: 'utility' },
  '/calculator/engineering': { category: 'utility' },
  '/calculator/body-fat': { category: 'health' },
  '/calculator/water-intake': { category: 'health' },
  '/calculator/ovulation': { category: 'health' },
  '/converter/timezone': { category: 'utility' },
  '/calculator/salary': { category: 'finance' },
  '/calculator/life-path': { category: 'esoteric' },
  '/calculator/destiny-number': { category: 'esoteric' },
  '/calculator/name-number': { category: 'esoteric' },
  '/calculator/soul-number': { category: 'esoteric' },
  '/calculator/personality-number': { category: 'esoteric' },
  '/calculator/personal-year': { category: 'esoteric' },
  '/calculator/numerology-compatibility': { category: 'esoteric' },
  '/calculator/pythagorean-matrix': { category: 'esoteric' },
  '/calculator/karmic-number': { category: 'esoteric' },
  '/calculator/zodiac-sign': { category: 'esoteric' },
  '/calculator/chinese-zodiac': { category: 'esoteric' },
  '/calculator/celtic-zodiac': { category: 'esoteric' },
  '/calculator/zodiac-compatibility': { category: 'esoteric' },
  '/calculator/mercury-retrograde': { category: 'esoteric' },
  '/calculator/angel-number': { category: 'esoteric' },
  '/calculator/archetype-number': { category: 'esoteric' },
  '/calculator/biorhythm': { category: 'esoteric' },
  '/calculator/moon-phases': { category: 'esoteric' },
  '/calculator/moon-sign': { category: 'esoteric' },
};

const LOCALES = ['en', 'ru', 'uk', 'fr', 'lt'];

export default function Breadcrumbs({ locale }: { locale: string }) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const isLocalePrefix = segments.length > 0 && LOCALES.includes(segments[0]);
  const toolPath = isLocalePrefix ? '/' + segments.slice(1).join('/') : '/' + segments.join('/');

  if (!toolPath || toolPath === '/') return null;
  const cleanPath = toolPath.startsWith('/') ? toolPath : `/${toolPath}`;
  if (['about', 'contact', 'privacy-policy'].some(p => cleanPath === `/${p}`)) return null;

  const tool = TOOL_META[cleanPath];
  if (!tool) return null;

  const backLabel = BACK_LABEL[locale] ?? BACK_LABEL.en;
  const catLabels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.en;
  const catLabel = catLabels[tool.category];

  return (
    <div className={styles.breadcrumbs}>
      <Link href={`/${locale}?category=${tool.category}`} className={styles.breadcrumbs__link}>
        <svg className={styles.breadcrumbs__arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {backLabel} <span className={styles.breadcrumbs__category}>{catLabel}</span>
      </Link>
    </div>
  );
}
