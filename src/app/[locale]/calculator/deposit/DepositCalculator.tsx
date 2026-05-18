'use client';

import { useState } from 'react';
import styles from './DepositCalculator.module.scss';

type Props = { locale: string };
type TermUnit = 'months' | 'years';
type Compounding = 'none' | 'monthly' | 'quarterly' | 'annually';
type Currency = 'RUB' | 'USD' | 'EUR' | 'UAH' | 'PLN';

const CURRENCIES: Currency[] = ['RUB', 'USD', 'EUR', 'UAH', 'PLN'];
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  RUB: '₽', USD: '$', EUR: '€', UAH: '₴', PLN: 'zł',
};
const DEFAULT_CURRENCY: Record<string, Currency> = {
  ru: 'RUB', uk: 'UAH', en: 'USD', fr: 'EUR', lt: 'EUR',
};

const LOCALE_NUM: Record<string, string> = {
  en: 'en-US', ru: 'ru-RU', uk: 'uk-UA', fr: 'fr-FR', lt: 'lt-LT',
};

function fmt(value: number, currency: Currency, locale: string): string {
  return (
    new Intl.NumberFormat(LOCALE_NUM[locale] || 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value) +
    ' ' +
    CURRENCY_SYMBOLS[currency]
  );
}

function computeBalance(
  principal: number,
  annualRate: number,
  years: number,
  compounding: Compounding,
): number {
  if (compounding === 'none') return principal * (1 + annualRate * years);
  if (compounding === 'monthly') return principal * Math.pow(1 + annualRate / 12, 12 * years);
  if (compounding === 'quarterly') return principal * Math.pow(1 + annualRate / 4, 4 * years);
  return principal * Math.pow(1 + annualRate, years);
}

type BreakdownRow = { period: number; balance: number; periodInterest: number };

function buildBreakdown(
  principal: number,
  annualRate: number,
  totalMonths: number,
  compounding: Compounding,
): BreakdownRow[] {
  const rows: BreakdownRow[] = [];
  const monthly = totalMonths <= 24;
  const count = monthly ? totalMonths : Math.ceil(totalMonths / 12);

  for (let i = 1; i <= count; i++) {
    const months = monthly ? i : Math.min(i * 12, totalMonths);
    const balance = computeBalance(principal, annualRate, months / 12, compounding);
    const prev = i === 1 ? principal : rows[i - 2].balance;
    rows.push({ period: i, balance, periodInterest: balance - prev });
  }
  return rows;
}

const T: Record<string, {
  principal: string;
  rate: string;
  rateUnit: string;
  term: string;
  termMonths: string;
  termYears: string;
  compounding: string;
  compNone: string;
  compMonthly: string;
  compQuarterly: string;
  compAnnually: string;
  calculate: string;
  resultFinal: string;
  resultPrincipal: string;
  resultInterest: string;
  breakdownTitle: string;
  breakdownYear: string;
  breakdownMonth: string;
  breakdownBalance: string;
  breakdownInterest: string;
  errorPrincipal: string;
  errorRate: string;
  errorTerm: string;
}> = {
  en: {
    principal: 'Initial Deposit',
    rate: 'Annual Interest Rate',
    rateUnit: '% per year',
    term: 'Term',
    termMonths: 'months',
    termYears: 'years',
    compounding: 'Compounding',
    compNone: 'No compounding',
    compMonthly: 'Monthly',
    compQuarterly: 'Quarterly',
    compAnnually: 'Annually',
    calculate: 'Calculate',
    resultFinal: 'Final Amount',
    resultPrincipal: 'Initial deposit',
    resultInterest: 'Interest earned',
    breakdownTitle: 'Growth Breakdown',
    breakdownYear: 'Year',
    breakdownMonth: 'Month',
    breakdownBalance: 'Balance',
    breakdownInterest: 'Interest',
    errorPrincipal: 'Enter a valid deposit amount (1 – 1 000 000 000).',
    errorRate: 'Enter a valid rate (0.01 – 100%).',
    errorTerm: 'Enter a valid term (1 – 600 months or 1 – 50 years).',
  },
  ru: {
    principal: 'Сумма вклада',
    rate: 'Процентная ставка',
    rateUnit: '% годовых',
    term: 'Срок',
    termMonths: 'месяцев',
    termYears: 'лет',
    compounding: 'Капитализация процентов',
    compNone: 'Без капитализации',
    compMonthly: 'Ежемесячная',
    compQuarterly: 'Ежеквартальная',
    compAnnually: 'Ежегодная',
    calculate: 'Рассчитать',
    resultFinal: 'Итоговая сумма',
    resultPrincipal: 'Сумма вклада',
    resultInterest: 'Начисленные проценты',
    breakdownTitle: 'Динамика вклада',
    breakdownYear: 'Год',
    breakdownMonth: 'Месяц',
    breakdownBalance: 'Баланс',
    breakdownInterest: 'Проценты',
    errorPrincipal: 'Введите корректную сумму (1 – 1 000 000 000).',
    errorRate: 'Введите корректную ставку (0,01 – 100%).',
    errorTerm: 'Введите корректный срок (1 – 600 месяцев или 1 – 50 лет).',
  },
  uk: {
    principal: 'Сума вкладу',
    rate: 'Процентна ставка',
    rateUnit: '% річних',
    term: 'Строк',
    termMonths: 'місяців',
    termYears: 'років',
    compounding: 'Капіталізація відсотків',
    compNone: 'Без капіталізації',
    compMonthly: 'Щомісячна',
    compQuarterly: 'Щоквартальна',
    compAnnually: 'Щорічна',
    calculate: 'Розрахувати',
    resultFinal: 'Підсумкова сума',
    resultPrincipal: 'Сума вкладу',
    resultInterest: 'Нараховані відсотки',
    breakdownTitle: 'Динаміка вкладу',
    breakdownYear: 'Рік',
    breakdownMonth: 'Місяць',
    breakdownBalance: 'Баланс',
    breakdownInterest: 'Відсотки',
    errorPrincipal: 'Введіть коректну суму (1 – 1 000 000 000).',
    errorRate: 'Введіть коректну ставку (0,01 – 100%).',
    errorTerm: 'Введіть коректний строк (1 – 600 місяців або 1 – 50 років).',
  },
  fr: {
    principal: 'Montant du dépôt',
    rate: "Taux d'intérêt annuel",
    rateUnit: '% par an',
    term: 'Durée',
    termMonths: 'mois',
    termYears: 'ans',
    compounding: 'Capitalisation',
    compNone: 'Sans capitalisation',
    compMonthly: 'Mensuelle',
    compQuarterly: 'Trimestrielle',
    compAnnually: 'Annuelle',
    calculate: 'Calculer',
    resultFinal: 'Montant final',
    resultPrincipal: 'Dépôt initial',
    resultInterest: 'Intérêts gagnés',
    breakdownTitle: 'Évolution du dépôt',
    breakdownYear: 'Année',
    breakdownMonth: 'Mois',
    breakdownBalance: 'Solde',
    breakdownInterest: 'Intérêts',
    errorPrincipal: 'Entrez un montant valide (1 – 1 000 000 000).',
    errorRate: "Entrez un taux valide (0,01 – 100%).",
    errorTerm: 'Entrez une durée valide (1 – 600 mois ou 1 – 50 ans).',
  },
  lt: {
    principal: 'Indėlio suma',
    rate: 'Metinė palūkanų norma',
    rateUnit: '% per metus',
    term: 'Terminas',
    termMonths: 'mėnesių',
    termYears: 'metų',
    compounding: 'Kapitalizacija',
    compNone: 'Be kapitalizacijos',
    compMonthly: 'Mėnesinė',
    compQuarterly: 'Ketvirtinė',
    compAnnually: 'Metinė',
    calculate: 'Skaičiuoti',
    resultFinal: 'Galutinė suma',
    resultPrincipal: 'Indėlio suma',
    resultInterest: 'Uždirbtos palūkanos',
    breakdownTitle: 'Indėlio augimas',
    breakdownYear: 'Metai',
    breakdownMonth: 'Mėnuo',
    breakdownBalance: 'Balansas',
    breakdownInterest: 'Palūkanos',
    errorPrincipal: 'Įveskite tinkamą sumą (1 – 1 000 000 000).',
    errorRate: 'Įveskite tinkamą normą (0,01 – 100%).',
    errorTerm: 'Įveskite tinkamą terminą (1 – 600 mėnesių arba 1 – 50 metų).',
  },
};

type Result = {
  finalAmount: number;
  interest: number;
  interestPct: number;
  breakdown: BreakdownRow[];
  showMonthly: boolean;
};

export default function DepositCalculator({ locale }: Props) {
  const t = T[locale] || T.en;
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [termValue, setTermValue] = useState('');
  const [termUnit, setTermUnit] = useState<TermUnit>('months');
  const [compounding, setCompounding] = useState<Compounding>('monthly');
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY[locale] || 'USD');
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal.replace(/\s/g, '').replace(',', '.'));
    const r = parseFloat(rate.replace(',', '.'));
    const tv = parseFloat(termValue.replace(',', '.'));

    if (isNaN(p) || p < 1 || p > 1_000_000_000) {
      setError(t.errorPrincipal);
      setResult(null);
      return;
    }
    if (isNaN(r) || r < 0.01 || r > 100) {
      setError(t.errorRate);
      setResult(null);
      return;
    }
    if (isNaN(tv) || tv < 1) {
      setError(t.errorTerm);
      setResult(null);
      return;
    }
    if (termUnit === 'months' && tv > 600) {
      setError(t.errorTerm);
      setResult(null);
      return;
    }
    if (termUnit === 'years' && tv > 50) {
      setError(t.errorTerm);
      setResult(null);
      return;
    }

    const totalMonths = termUnit === 'months' ? Math.round(tv) : Math.round(tv * 12);
    const annualRate = r / 100;
    const finalAmount = computeBalance(p, annualRate, totalMonths / 12, compounding);
    const interest = finalAmount - p;
    const interestPct = (interest / finalAmount) * 100;
    const breakdown = buildBreakdown(p, annualRate, totalMonths, compounding);
    const showMonthly = totalMonths <= 24;

    setError('');
    setResult({ finalAmount, interest, interestPct, breakdown, showMonthly });
  };

  const compOptions: { key: Compounding; label: string }[] = [
    { key: 'none', label: t.compNone },
    { key: 'monthly', label: t.compMonthly },
    { key: 'quarterly', label: t.compQuarterly },
    { key: 'annually', label: t.compAnnually },
  ];

  return (
    <div className={styles['deposit-widget']}>
      <div className={styles['deposit-widget__form']}>

        {/* Principal + currency */}
        <div className={styles['deposit-widget__field']}>
          <label className={styles['deposit-widget__label']} htmlFor="dep-principal">
            {t.principal}
          </label>
          <div className={styles['deposit-widget__input-row']}>
            <input
              id="dep-principal"
              type="number"
              min="1"
              step="1000"
              className={styles['deposit-widget__input']}
              value={principal}
              placeholder="100000"
              onChange={(e) => { setPrincipal(e.target.value); setError(''); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            />
            <select
              className={styles['deposit-widget__select']}
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Currency"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{CURRENCY_SYMBOLS[c]} {c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rate */}
        <div className={styles['deposit-widget__field']}>
          <label className={styles['deposit-widget__label']} htmlFor="dep-rate">
            {t.rate}
          </label>
          <div className={styles['deposit-widget__input-wrap']}>
            <input
              id="dep-rate"
              type="number"
              min="0.01"
              max="100"
              step="0.1"
              className={styles['deposit-widget__input']}
              value={rate}
              placeholder="10"
              onChange={(e) => { setRate(e.target.value); setError(''); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            />
            <span className={styles['deposit-widget__suffix']}>{t.rateUnit}</span>
          </div>
        </div>

        {/* Term */}
        <div className={styles['deposit-widget__field']}>
          <label className={styles['deposit-widget__label']} htmlFor="dep-term">
            {t.term}
          </label>
          <div className={styles['deposit-widget__input-row']}>
            <input
              id="dep-term"
              type="number"
              min="1"
              step="1"
              className={styles['deposit-widget__input']}
              value={termValue}
              placeholder={termUnit === 'months' ? '12' : '1'}
              onChange={(e) => { setTermValue(e.target.value); setError(''); setResult(null); }}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            />
            <div className={styles['deposit-widget__toggle']} role="group">
              <button
                type="button"
                className={`${styles['deposit-widget__toggle-btn']}${termUnit === 'months' ? ` ${styles['deposit-widget__toggle-btn--active']}` : ''}`}
                onClick={() => { setTermUnit('months'); setResult(null); }}
              >
                {t.termMonths}
              </button>
              <button
                type="button"
                className={`${styles['deposit-widget__toggle-btn']}${termUnit === 'years' ? ` ${styles['deposit-widget__toggle-btn--active']}` : ''}`}
                onClick={() => { setTermUnit('years'); setResult(null); }}
              >
                {t.termYears}
              </button>
            </div>
          </div>
        </div>

        {/* Compounding */}
        <div className={styles['deposit-widget__field']}>
          <span className={styles['deposit-widget__label']}>{t.compounding}</span>
          <div className={styles['deposit-widget__comp-grid']} role="group">
            {compOptions.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`${styles['deposit-widget__comp-btn']}${compounding === key ? ` ${styles['deposit-widget__comp-btn--active']}` : ''}`}
                onClick={() => { setCompounding(key); setResult(null); }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className={styles['deposit-widget__error']}>{error}</p>}

        <button
          type="button"
          className={styles['deposit-widget__btn']}
          onClick={handleCalculate}
        >
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['deposit-widget__results']}>

          {/* Final amount */}
          <div className={styles['deposit-widget__result-main']}>
            <span className={styles['deposit-widget__result-label']}>{t.resultFinal}</span>
            <span className={styles['deposit-widget__result-value']}>
              {fmt(result.finalAmount, currency, locale)}
            </span>
          </div>

          {/* Split: principal vs interest */}
          <div className={styles['deposit-widget__split']}>
            <div className={styles['deposit-widget__split-item']}>
              <span className={styles['deposit-widget__split-label']}>{t.resultPrincipal}</span>
              <span className={styles['deposit-widget__split-amount']}>
                {fmt(parseFloat(principal.replace(/\s/g, '').replace(',', '.')), currency, locale)}
              </span>
            </div>
            <div className={`${styles['deposit-widget__split-item']} ${styles['deposit-widget__split-item--interest']}`}>
              <span className={styles['deposit-widget__split-label']}>{t.resultInterest}</span>
              <span className={styles['deposit-widget__split-amount']}>
                +{fmt(result.interest, currency, locale)}
              </span>
            </div>
          </div>

          {/* Visual bar: deposit vs interest proportion */}
          <div className={styles['deposit-widget__bar']} aria-hidden="true">
            <div
              className={styles['deposit-widget__bar-principal']}
              style={{ width: `${100 - result.interestPct}%` }}
            />
            <div
              className={styles['deposit-widget__bar-interest']}
              style={{ width: `${result.interestPct}%` }}
            />
          </div>

          {/* Breakdown table */}
          <div className={styles['deposit-widget__breakdown']}>
            <p className={styles['deposit-widget__breakdown-title']}>{t.breakdownTitle}</p>
            <div className={styles['deposit-widget__table-wrap']}>
              <table className={styles['deposit-widget__table']}>
                <thead>
                  <tr>
                    <th>{result.showMonthly ? t.breakdownMonth : t.breakdownYear}</th>
                    <th>{t.breakdownBalance}</th>
                    <th>{t.breakdownInterest}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row) => (
                    <tr key={row.period}>
                      <td>{row.period}</td>
                      <td>{fmt(row.balance, currency, locale)}</td>
                      <td className={styles['deposit-widget__table-interest']}>
                        +{fmt(row.periodInterest, currency, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
