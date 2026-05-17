'use client';

import { useState, useCallback } from 'react';
import styles from './LoanCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  termMonths: string;
  calculate: string;
  monthlyPayment: string;
  totalPayment: string;
  totalInterest: string;
  currency: string;
  amountPlaceholder: string;
  ratePlaceholder: string;
  termPlaceholder: string;
}> = {
  en: {
    loanAmount: 'Loan amount',
    interestRate: 'Annual interest rate (%)',
    loanTerm: 'Loan term',
    termMonths: 'months',
    calculate: 'Calculate',
    monthlyPayment: 'Monthly payment',
    totalPayment: 'Total payment',
    totalInterest: 'Total interest',
    currency: '$',
    amountPlaceholder: '10000',
    ratePlaceholder: '12',
    termPlaceholder: '24',
    errorInvalid: 'Please fill all fields with valid positive numbers.',
    errorRate: 'Interest rate seems too high (max 200%).',
  },
  ru: {
    loanAmount: 'Сумма кредита',
    interestRate: 'Годовая ставка (%)',
    loanTerm: 'Срок кредита',
    termMonths: 'мес.',
    calculate: 'Рассчитать',
    monthlyPayment: 'Ежемесячный платёж',
    totalPayment: 'Общая сумма',
    totalInterest: 'Переплата',
    currency: '₽',
    amountPlaceholder: '500000',
    ratePlaceholder: '18',
    termPlaceholder: '24',
    errorInvalid: 'Заполните все поля корректными положительными числами.',
    errorRate: 'Процентная ставка слишком высокая (макс. 200%).',
  },
  uk: {
    loanAmount: 'Сума кредиту',
    interestRate: 'Річна ставка (%)',
    loanTerm: 'Термін кредиту',
    termMonths: 'міс.',
    calculate: 'Розрахувати',
    monthlyPayment: 'Щомісячний платіж',
    totalPayment: 'Загальна сума',
    totalInterest: 'Переплата',
    currency: '₴',
    amountPlaceholder: '100000',
    ratePlaceholder: '20',
    termPlaceholder: '24',
    errorInvalid: 'Заповніть усі поля коректними додатними числами.',
    errorRate: 'Відсоткова ставка занадто висока (макс. 200%).',
  },
  fr: {
    loanAmount: 'Montant du prêt',
    interestRate: 'Taux annuel (%)',
    loanTerm: 'Durée du prêt',
    termMonths: 'mois',
    calculate: 'Calculer',
    monthlyPayment: 'Mensualité',
    totalPayment: 'Total remboursé',
    totalInterest: 'Coût des intérêts',
    currency: '€',
    amountPlaceholder: '10000',
    ratePlaceholder: '5.5',
    termPlaceholder: '24',
    errorInvalid: 'Veuillez remplir tous les champs avec des nombres positifs valides.',
    errorRate: 'Le taux d\'intérêt semble trop élevé (max 200%).',
  },
  lt: {
    loanAmount: 'Paskolos suma',
    interestRate: 'Metinė palūkanų norma (%)',
    loanTerm: 'Paskolos terminas',
    termMonths: 'mėn.',
    calculate: 'Skaičiuoti',
    monthlyPayment: 'Mėnesio įmoka',
    totalPayment: 'Bendra suma',
    totalInterest: 'Palūkanos',
    currency: '€',
    amountPlaceholder: '5000',
    ratePlaceholder: '8',
    termPlaceholder: '24',
    errorInvalid: 'Užpildykite visus laukus teigiamais skaičiais.',
    errorRate: 'Palūkanų norma per didelė (maks. 200%).',
  },
};

function calcLoan(amount: number, annualRate: number, months: number) {
  if (!amount || !annualRate || !months) return null;
  const r = annualRate / 100 / 12;
  if (r === 0) {
    const monthly = amount / months;
    return { monthly, total: monthly * months, interest: 0 };
  }
  const monthly = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = monthly * months;
  return { monthly, total, interest: total - amount };
}

function fmt(n: number, locale: string) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// Common month options
const MONTH_OPTIONS = [3, 6, 12, 18, 24, 36, 48, 60, 84];

export default function LoanCalculator({ locale }: Props) {
  const t = T[locale] || T.en;

  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('24');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    const a = parseFloat(amount.replace(/\s/g, '').replace(',', '.'));
    const r = parseFloat(rate.replace(',', '.'));
    const m = parseInt(months, 10);

    if (isNaN(a) || a <= 0 || isNaN(r) || r <= 0 || isNaN(m) || m <= 0) {
      setError(t.errorInvalid);
      setResult(null);
      return;
    }
    if (r > 200) {
      setError(t.errorRate);
      setResult(null);
      return;
    }
    setError('');
    setResult(calcLoan(a, r, m));
  }, [amount, rate, months]);

  return (
    <div className={styles['loan-widget']}>
      <div className={styles['loan-widget__form']}>

        <div className={styles['loan-widget__field']}>
          <label className={styles['loan-widget__label']} htmlFor="loan-amount">
            {t.loanAmount}
          </label>
          <div className={styles['loan-widget__input-wrap']}>
            <span className={styles['loan-widget__prefix']}>{t.currency}</span>
            <input
              id="loan-amount"
              className={styles['loan-widget__input']}
              type="number"
              min="0"
              step="500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={t.amountPlaceholder}
            />
          </div>
        </div>

        <div className={styles['loan-widget__field']}>
          <label className={styles['loan-widget__label']} htmlFor="loan-rate">
            {t.interestRate}
          </label>
          <div className={styles['loan-widget__input-wrap']}>
            <input
              id="loan-rate"
              className={styles['loan-widget__input']}
              type="number"
              min="0"
              max="200"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={t.ratePlaceholder}
            />
            <span className={styles['loan-widget__suffix']}>%</span>
          </div>
        </div>

        <div className={styles['loan-widget__field']}>
          <label className={styles['loan-widget__label']} htmlFor="loan-term">
            {t.loanTerm}
          </label>
          <div className={styles['loan-widget__term-row']}>
            <select
              id="loan-term"
              className={styles['loan-widget__select']}
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} {t.termMonths}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className={styles['loan-widget__error']}>{error}</p>}

        <button className={styles['loan-widget__btn']} onClick={handleCalculate} type="button">
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['loan-widget__results']}>
          <div className={styles['loan-widget__result-item']}>
            <span className={styles['loan-widget__result-label']}>{t.monthlyPayment}</span>
            <span className={styles['loan-widget__result-value']}>
              {t.currency}{fmt(result.monthly, locale)}
            </span>
          </div>
          <div className={styles['loan-widget__result-item']}>
            <span className={styles['loan-widget__result-label']}>{t.totalPayment}</span>
            <span className={styles['loan-widget__result-value']}>
              {t.currency}{fmt(result.total, locale)}
            </span>
          </div>
          <div className={`${styles['loan-widget__result-item']} ${styles['loan-widget__result-item--accent']}`}>
            <span className={styles['loan-widget__result-label']}>{t.totalInterest}</span>
            <span className={styles['loan-widget__result-value']}>
              {t.currency}{fmt(result.interest, locale)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
