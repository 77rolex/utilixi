'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './IncomeTaxCalculator.module.scss';

type Bracket = { from: number; to: number; rate: number };
type CountryConfig = {
  en: string; ru: string; uk: string; fr: string; lt: string;
  symbol: string;
  brackets: Bracket[];
  deduction?: number;
};

const COUNTRIES: Record<string, CountryConfig> = {
  US: {
    en: 'USA (Federal, Single)', ru: 'США (федеральный, холост)', uk: 'США (федеральний, неодружений)', fr: 'États-Unis (fédéral, célibataire)', lt: 'JAV (federalinis, vienišas)',
    symbol: '$',
    deduction: 14600,
    brackets: [
      { from: 0, to: 11600, rate: 0.10 },
      { from: 11600, to: 47150, rate: 0.12 },
      { from: 47150, to: 100525, rate: 0.22 },
      { from: 100525, to: 191950, rate: 0.24 },
      { from: 191950, to: 243725, rate: 0.32 },
      { from: 243725, to: 609350, rate: 0.35 },
      { from: 609350, to: Infinity, rate: 0.37 },
    ],
  },
  GB: {
    en: 'United Kingdom', ru: 'Великобритания', uk: 'Великобританія', fr: 'Royaume-Uni', lt: 'Didžioji Britanija',
    symbol: '£',
    brackets: [
      { from: 0, to: 12570, rate: 0 },
      { from: 12570, to: 50270, rate: 0.20 },
      { from: 50270, to: 125140, rate: 0.40 },
      { from: 125140, to: Infinity, rate: 0.45 },
    ],
  },
  DE: {
    en: 'Germany', ru: 'Германия', uk: 'Німеччина', fr: 'Allemagne', lt: 'Vokietija',
    symbol: '€',
    brackets: [
      { from: 0, to: 11604, rate: 0 },
      { from: 11604, to: 17006, rate: 0.14 },
      { from: 17006, to: 66760, rate: 0.30 },
      { from: 66760, to: 277825, rate: 0.42 },
      { from: 277825, to: Infinity, rate: 0.45 },
    ],
  },
  FR: {
    en: 'France', ru: 'Франция', uk: 'Франція', fr: 'France', lt: 'Prancūzija',
    symbol: '€',
    brackets: [
      { from: 0, to: 11294, rate: 0 },
      { from: 11294, to: 28797, rate: 0.11 },
      { from: 28797, to: 82341, rate: 0.30 },
      { from: 82341, to: 177106, rate: 0.41 },
      { from: 177106, to: Infinity, rate: 0.45 },
    ],
  },
  PL: {
    en: 'Poland', ru: 'Польша', uk: 'Польща', fr: 'Pologne', lt: 'Lenkija',
    symbol: 'zł',
    brackets: [
      { from: 0, to: 30000, rate: 0 },
      { from: 30000, to: 120000, rate: 0.12 },
      { from: 120000, to: Infinity, rate: 0.32 },
    ],
  },
  LT: {
    en: 'Lithuania', ru: 'Литва', uk: 'Литва', fr: 'Lituanie', lt: 'Lietuva',
    symbol: '€',
    brackets: [
      { from: 0, to: 90246, rate: 0.20 },
      { from: 90246, to: Infinity, rate: 0.32 },
    ],
  },
  UA: {
    en: 'Ukraine', ru: 'Украина', uk: 'Україна', fr: 'Ukraine', lt: 'Ukraina',
    symbol: '₴',
    brackets: [
      { from: 0, to: Infinity, rate: 0.195 },
    ],
  },
  RU: {
    en: 'Russia', ru: 'Россия', uk: 'Росія', fr: 'Russie', lt: 'Rusija',
    symbol: '₽',
    brackets: [
      { from: 0, to: 2400000, rate: 0.13 },
      { from: 2400000, to: 5000000, rate: 0.15 },
      { from: 5000000, to: Infinity, rate: 0.18 },
    ],
  },
};

function calcTax(income: number, config: CountryConfig): { tax: number; brackets: { from: number; to: number; rate: number; taxInBracket: number; active: boolean }[] } {
  const taxableIncome = Math.max(0, income - (config.deduction ?? 0));
  let totalTax = 0;
  const bracketResults = config.brackets.map(b => {
    const taxable = Math.max(0, Math.min(taxableIncome, b.to) - b.from);
    const taxInBracket = taxable * b.rate;
    totalTax += taxInBracket;
    return { from: b.from, to: b.to, rate: b.rate, taxInBracket, active: taxable > 0 };
  });
  return { tax: totalTax, brackets: bracketResults };
}

const L: Record<string, Record<string, string>> = {
  country:       { en: 'Country', ru: 'Страна', uk: 'Країна', fr: 'Pays', lt: 'Šalis' },
  income:        { en: 'Annual Gross Income', ru: 'Годовой доход (брутто)', uk: 'Річний дохід (брутто)', fr: 'Revenu annuel brut', lt: 'Metinės bendrosios pajamos' },
  calculate:     { en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  taxAmount:     { en: 'Income Tax', ru: 'Сумма налога', uk: 'Сума податку', fr: 'Impôt sur le revenu', lt: 'Pajamų mokestis' },
  effectiveRate: { en: 'Effective Rate', ru: 'Эффективная ставка', uk: 'Ефективна ставка', fr: 'Taux effectif', lt: 'Efektyvi norma' },
  netIncome:     { en: 'Net Income', ru: 'Чистый доход', uk: 'Чистий дохід', fr: 'Revenu net', lt: 'Grynos pajamos' },
  monthlyNet:    { en: 'Monthly Net', ru: 'В месяц (чистыми)', uk: 'На місяць (чистими)', fr: 'Net mensuel', lt: 'Mėnesinis grynas' },
  brackets:      { en: 'Tax Brackets', ru: 'Налоговые ставки', uk: 'Податкові ставки', fr: 'Tranches d\'imposition', lt: 'Mokesčių tarifai' },
  disclaimer: {
    en: 'Simplified calculation. Does not include social security, local taxes, or country-specific deductions.',
    ru: 'Упрощённый расчёт. Не включает социальные отчисления, местные налоги и индивидуальные вычеты.',
    uk: 'Спрощений розрахунок. Не включає соціальні відрахування, місцеві податки та індивідуальні вирахування.',
    fr: 'Calcul simplifié. N\'inclut pas les cotisations sociales, les taxes locales ni les déductions spécifiques.',
    lt: 'Supaprastintas skaičiavimas. Neapima socialinio draudimo, vietinių mokesčių ar individualių atskaitymų.',
  },
  copy:    { en: 'Copy result', ru: 'Скопировать', uk: 'Копіювати', fr: 'Copier', lt: 'Kopijuoti' },
  copied:  { en: 'Copied!', ru: 'Скопировано!', uk: 'Скопійовано!', fr: 'Copié !', lt: 'Nukopijuota!' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Result = {
  tax: number; effectiveRate: number; net: number; monthlyNet: number; symbol: string;
  brackets: { from: number; to: number; rate: number; taxInBracket: number; active: boolean }[];
};

type Props = { locale: string; initialCountry?: string; initialIncome?: string };

function computeResult(country: string, incomeStr: string): Result | null {
  const incomeNum = parseFloat(incomeStr);
  if (!incomeNum || incomeNum <= 0) return null;
  const config = COUNTRIES[country];
  if (!config) return null;
  const { tax, brackets } = calcTax(incomeNum, config);
  const net = incomeNum - tax;
  return {
    tax: Math.round(tax),
    effectiveRate: (tax / incomeNum) * 100,
    net: Math.round(net),
    monthlyNet: Math.round(net / 12),
    symbol: config.symbol,
    brackets,
  };
}

export default function IncomeTaxCalculator({ locale, initialCountry, initialIncome }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [country, setCountry] = useState(initialCountry && COUNTRIES[initialCountry] ? initialCountry : 'US');
  const [income, setIncome] = useState(initialIncome || '60000');
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<Result | null>(() =>
    initialCountry && initialIncome ? computeResult(initialCountry, initialIncome) : null
  );

  function calculate() {
    const res = computeResult(country, income);
    if (!res) return;
    setResult(res);
    router.replace(`${pathname}?${new URLSearchParams({ country, income })}`, { scroll: false });
  }

  function handleCopy() {
    if (!result) return;
    const fmt = (n: number) => n.toLocaleString('en-US');
    const text = [
      `${t('taxAmount', locale)}: ${result.symbol}${fmt(result.tax)}`,
      `${t('effectiveRate', locale)}: ${result.effectiveRate.toFixed(1)}%`,
      `${t('netIncome', locale)}: ${result.symbol}${fmt(result.net)}`,
      `${t('monthlyNet', locale)}: ${result.symbol}${fmt(result.monthlyNet)}`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const fmt = (n: number) => n.toLocaleString('en-US');
  const config = COUNTRIES[country];

  return (
    <div className={styles['income-tax-widget']}>
      <div className={styles['income-tax-widget__form']}>
        <div className={styles['income-tax-widget__row']}>
          <div className={styles['income-tax-widget__field']}>
            <label className={styles['income-tax-widget__label']}>{t('country', locale)}</label>
            <select className={styles['income-tax-widget__select']} value={country} onChange={e => { setCountry(e.target.value); setResult(null); }}>
              {Object.entries(COUNTRIES).map(([code, data]) => (
                <option key={code} value={code}>{data[locale as 'en'|'ru'|'uk'|'fr'|'lt'] || data.en}</option>
              ))}
            </select>
          </div>
          <div className={styles['income-tax-widget__field']}>
            <label className={styles['income-tax-widget__label']}>{t('income', locale)} ({config.symbol})</label>
            <input
              type="number"
              className={styles['income-tax-widget__input']}
              value={income}
              onChange={e => setIncome(e.target.value)}
              min="0" step="1000"
            />
          </div>
        </div>
        <button type="button" className={styles['income-tax-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['income-tax-widget__results']}>
          <div className={styles['income-tax-widget__copy']}>
            <button
              type="button"
              className={`${styles['income-tax-widget__copy-btn']}${copied ? ` ${styles['income-tax-widget__copy-btn--copied']}` : ''}`}
              onClick={handleCopy}
              aria-label={t('copy', locale)}
            >
              {copied ? '✓' : '⎘'} {copied ? t('copied', locale) : t('copy', locale)}
            </button>
          </div>

          <div className={styles['income-tax-widget__result-grid']}>
            <div className={styles['income-tax-widget__result-item']}>
              <span className={styles['income-tax-widget__result-label']}>{t('taxAmount', locale)}</span>
              <span className={styles['income-tax-widget__result-value']}>{result.symbol}{fmt(result.tax)}</span>
            </div>
            <div className={styles['income-tax-widget__result-item']}>
              <span className={styles['income-tax-widget__result-label']}>{t('effectiveRate', locale)}</span>
              <span className={styles['income-tax-widget__result-value']}>{result.effectiveRate.toFixed(1)}%</span>
            </div>
            <div className={styles['income-tax-widget__result-item']}>
              <span className={styles['income-tax-widget__result-label']}>{t('netIncome', locale)}</span>
              <span className={styles['income-tax-widget__result-value']}>{result.symbol}{fmt(result.net)}</span>
            </div>
            <div className={styles['income-tax-widget__result-item']}>
              <span className={styles['income-tax-widget__result-label']}>{t('monthlyNet', locale)}</span>
              <span className={styles['income-tax-widget__result-value']}>{result.symbol}{fmt(result.monthlyNet)}</span>
            </div>
          </div>

          <div className={styles['income-tax-widget__breakdown']}>
            <p className={styles['income-tax-widget__breakdown-title']}>{t('brackets', locale)}</p>
            {result.brackets.map((b, i) => (
              <div
                key={i}
                className={`${styles['income-tax-widget__bracket']}${b.active ? ` ${styles['income-tax-widget__bracket--active']}` : ''}`}
              >
                <span className={styles['income-tax-widget__bracket-range']}>
                  {result.symbol}{fmt(b.from)} – {b.to === Infinity ? '∞' : `${result.symbol}${fmt(b.to)}`}
                </span>
                <span className={styles['income-tax-widget__bracket-rate']}>{(b.rate * 100).toFixed(0)}%</span>
                <span className={styles['income-tax-widget__bracket-tax']}>
                  {b.taxInBracket > 0 ? `${result.symbol}${fmt(Math.round(b.taxInBracket))}` : '—'}
                </span>
              </div>
            ))}
          </div>

          <p className={styles['income-tax-widget__disclaimer']}>{t('disclaimer', locale)}</p>
        </div>
      )}
    </div>
  );
}
