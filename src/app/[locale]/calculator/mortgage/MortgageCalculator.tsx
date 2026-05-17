'use client';

import { useState, useCallback } from 'react';
import styles from './MortgageCalculator.module.scss';

type Props = {
  locale: string;
};

const T: Record<string, Record<string, string>> = {
  en: {
    title: 'Mortgage Calculator',
    loanAmount: 'Loan Amount',
    interestRate: 'Annual Interest Rate (%)',
    loanTerm: 'Loan Term (years)',
    calculate: 'Calculate',
    monthlyPayment: 'Monthly Payment',
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    currency: '$',
    amountPlaceholder: '200000',
    ratePlaceholder: '6.5',
    termPlaceholder: '20',
    errorInvalid: 'Please fill all fields with valid positive numbers.',
    errorRate: 'Interest rate must be less than 100%.',
    errorTerm: 'Loan term must be 50 years or less.',
  },
  ru: {
    title: 'Ипотечный калькулятор',
    loanAmount: 'Сумма кредита',
    interestRate: 'Годовая ставка (%)',
    loanTerm: 'Срок кредита (лет)',
    calculate: 'Рассчитать',
    monthlyPayment: 'Ежемесячный платёж',
    totalPayment: 'Общая сумма выплат',
    totalInterest: 'Переплата',
    currency: '₽',
    amountPlaceholder: '3000000',
    ratePlaceholder: '12',
    termPlaceholder: '20',
    errorInvalid: 'Заполните все поля корректными положительными числами.',
    errorRate: 'Процентная ставка должна быть менее 100%.',
    errorTerm: 'Срок кредита не может превышать 50 лет.',
  },
  uk: {
    title: 'Іпотечний калькулятор',
    loanAmount: 'Сума кредиту',
    interestRate: 'Річна ставка (%)',
    loanTerm: 'Термін кредиту (років)',
    calculate: 'Розрахувати',
    monthlyPayment: 'Щомісячний платіж',
    totalPayment: 'Загальна сума виплат',
    totalInterest: 'Переплата',
    currency: '₴',
    amountPlaceholder: '2000000',
    ratePlaceholder: '15',
    termPlaceholder: '20',
    errorInvalid: 'Заповніть усі поля коректними додатними числами.',
    errorRate: 'Відсоткова ставка має бути менше 100%.',
    errorTerm: 'Термін кредиту не може перевищувати 50 років.',
  },
  fr: {
    title: 'Calculatrice de Prêt Immobilier',
    loanAmount: 'Montant du prêt',
    interestRate: 'Taux annuel (%)',
    loanTerm: 'Durée du prêt (ans)',
    calculate: 'Calculer',
    monthlyPayment: 'Mensualité',
    totalPayment: 'Total à rembourser',
    totalInterest: 'Coût total des intérêts',
    currency: '€',
    amountPlaceholder: '200000',
    ratePlaceholder: '3.5',
    termPlaceholder: '20',
    errorInvalid: 'Veuillez remplir tous les champs avec des nombres positifs valides.',
    errorRate: 'Le taux d\'intérêt doit être inférieur à 100%.',
    errorTerm: 'La durée du prêt ne peut pas dépasser 50 ans.',
  },
  lt: {
    title: 'Hipotekos Skaičiuotuvas',
    loanAmount: 'Paskolos suma',
    interestRate: 'Metinė palūkanų norma (%)',
    loanTerm: 'Paskolos terminas (metai)',
    calculate: 'Skaičiuoti',
    monthlyPayment: 'Mėnesio įmoka',
    totalPayment: 'Bendra suma',
    totalInterest: 'Palūkanų suma',
    currency: '€',
    amountPlaceholder: '100000',
    ratePlaceholder: '4.5',
    termPlaceholder: '20',
    errorInvalid: 'Užpildykite visus laukus teigiamais skaičiais.',
    errorRate: 'Palūkanų norma turi būti mažesnė nei 100%.',
    errorTerm: 'Paskolos terminas negali viršyti 50 metų.',
  },
};

function calculateMortgage(amount: number, rate: number, years: number) {
  if (!amount || !rate || !years) return null;
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) {
    const monthly = amount / n;
    return { monthly, total: monthly * n, interest: 0 };
  }
  const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const total = monthly * n;
  const interest = total - amount;
  return { monthly, total, interest };
}

function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function MortgageCalculator({ locale }: Props) {
  const t = T[locale] || T.en;

  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    const a = parseFloat(amount.replace(/\s/g, '').replace(',', '.'));
    const r = parseFloat(rate.replace(',', '.'));
    const y = parseFloat(term);

    if (isNaN(a) || a <= 0 || isNaN(r) || r <= 0 || isNaN(y) || y <= 0) {
      setError(t.errorInvalid);
      setResult(null);
      return;
    }
    if (r > 100) {
      setError(t.errorRate);
      setResult(null);
      return;
    }
    if (y > 50) {
      setError(t.errorTerm);
      setResult(null);
      return;
    }

    setError('');
    setResult(calculateMortgage(a, r, y));
  }, [amount, rate, term]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCalculate();
  };

  return (
    <div className={styles['mortgage-widget']}>
      <div className={styles['mortgage-widget__form']}>
        <div className={styles['mortgage-widget__field']}>
          <label className={styles['mortgage-widget__label']} htmlFor="amount">
            {t.loanAmount}
          </label>
          <div className={styles['mortgage-widget__input-wrap']}>
            <span className={styles['mortgage-widget__prefix']}>{t.currency}</span>
            <input
              id="amount"
              className={styles['mortgage-widget__input']}
              type="number"
              min="0"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.amountPlaceholder}
              aria-label={t.loanAmount}
            />
          </div>
        </div>

        <div className={styles['mortgage-widget__field']}>
          <label className={styles['mortgage-widget__label']} htmlFor="rate">
            {t.interestRate}
          </label>
          <div className={styles['mortgage-widget__input-wrap']}>
            <input
              id="rate"
              className={styles['mortgage-widget__input']}
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.ratePlaceholder}
              aria-label={t.interestRate}
            />
            <span className={styles['mortgage-widget__suffix']}>%</span>
          </div>
        </div>

        <div className={styles['mortgage-widget__field']}>
          <label className={styles['mortgage-widget__label']} htmlFor="term">
            {t.loanTerm}
          </label>
          <input
            id="term"
            className={styles['mortgage-widget__input']}
            type="number"
            min="1"
            max="50"
            step="1"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.termPlaceholder}
            aria-label={t.loanTerm}
          />
        </div>

        {error && <p className={styles['mortgage-widget__error']}>{error}</p>}

        <button
          className={styles['mortgage-widget__btn']}
          onClick={handleCalculate}
          type="button"
        >
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['mortgage-widget__results']}>
          <div className={styles['mortgage-widget__result-item']}>
            <span className={styles['mortgage-widget__result-label']}>{t.monthlyPayment}</span>
            <span className={styles['mortgage-widget__result-value']}>
              {t.currency}{formatNumber(result.monthly, locale)}
            </span>
          </div>
          <div className={styles['mortgage-widget__result-item']}>
            <span className={styles['mortgage-widget__result-label']}>{t.totalPayment}</span>
            <span className={styles['mortgage-widget__result-value']}>
              {t.currency}{formatNumber(result.total, locale)}
            </span>
          </div>
          <div className={`${styles['mortgage-widget__result-item']} ${styles['mortgage-widget__result-item--accent']}`}>
            <span className={styles['mortgage-widget__result-label']}>{t.totalInterest}</span>
            <span className={styles['mortgage-widget__result-value']}>
              {t.currency}{formatNumber(result.interest, locale)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
