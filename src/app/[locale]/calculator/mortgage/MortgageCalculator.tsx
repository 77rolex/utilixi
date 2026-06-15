'use client';

import { useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './MortgageCalculator.module.scss';

type Props = {
  locale: string;
  initialAmount?: string;
  initialRate?: string;
  initialTerm?: string;
};

const T: Record<string, Record<string, string>> = {
  en: {
    loanAmount: 'Loan Amount',
    interestRate: 'Annual Interest Rate (%)',
    loanTerm: 'Loan Term (years)',
    calculate: 'Calculate',
    monthlyPayment: 'Monthly Payment',
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    currency: '$',
    amountPlaceholder: '250000',
    ratePlaceholder: '6.5',
    termPlaceholder: '25',
    errorInvalid: 'Please fill all fields with valid positive numbers.',
    errorRate: 'Interest rate must be less than 100%.',
    errorTerm: 'Loan term must be 50 years or less.',
    copy: 'Copy result',
    copied: 'Copied!',
  },
  ru: {
    loanAmount: 'Сумма кредита',
    interestRate: 'Годовая ставка (%)',
    loanTerm: 'Срок кредита (лет)',
    calculate: 'Рассчитать',
    monthlyPayment: 'Ежемесячный платёж',
    totalPayment: 'Общая сумма выплат',
    totalInterest: 'Переплата',
    currency: '₽',
    amountPlaceholder: '5000000',
    ratePlaceholder: '12.5',
    termPlaceholder: '20',
    errorInvalid: 'Заполните все поля корректными положительными числами.',
    errorRate: 'Процентная ставка должна быть менее 100%.',
    errorTerm: 'Срок кредита не может превышать 50 лет.',
    copy: 'Скопировать',
    copied: 'Скопировано!',
  },
  uk: {
    loanAmount: 'Сума кредиту',
    interestRate: 'Річна ставка (%)',
    loanTerm: 'Термін кредиту (років)',
    calculate: 'Розрахувати',
    monthlyPayment: 'Щомісячний платіж',
    totalPayment: 'Загальна сума виплат',
    totalInterest: 'Переплата',
    currency: '₴',
    amountPlaceholder: '3000000',
    ratePlaceholder: '16',
    termPlaceholder: '20',
    errorInvalid: 'Заповніть усі поля коректними додатними числами.',
    errorRate: 'Відсоткова ставка має бути менше 100%.',
    errorTerm: 'Термін кредиту не може перевищувати 50 років.',
    copy: 'Копіювати',
    copied: 'Скопійовано!',
  },
  fr: {
    loanAmount: 'Montant du prêt',
    interestRate: 'Taux annuel (%)',
    loanTerm: 'Durée du prêt (ans)',
    calculate: 'Calculer',
    monthlyPayment: 'Mensualité',
    totalPayment: 'Total à rembourser',
    totalInterest: 'Coût total des intérêts',
    currency: '€',
    amountPlaceholder: '250000',
    ratePlaceholder: '3.8',
    termPlaceholder: '25',
    errorInvalid: 'Veuillez remplir tous les champs avec des nombres positifs valides.',
    errorRate: 'Le taux d\'intérêt doit être inférieur à 100%.',
    errorTerm: 'La durée du prêt ne peut pas dépasser 50 ans.',
    copy: 'Copier',
    copied: 'Copié !',
  },
  lt: {
    loanAmount: 'Paskolos suma',
    interestRate: 'Metinė palūkanų norma (%)',
    loanTerm: 'Paskolos terminas (metai)',
    calculate: 'Skaičiuoti',
    monthlyPayment: 'Mėnesio įmoka',
    totalPayment: 'Bendra suma',
    totalInterest: 'Palūkanų suma',
    currency: '€',
    amountPlaceholder: '120000',
    ratePlaceholder: '4.5',
    termPlaceholder: '25',
    errorInvalid: 'Užpildykite visus laukus teigiamais skaičiais.',
    errorRate: 'Palūkanų norma turi būti mažesnė nei 100%.',
    errorTerm: 'Paskolos terminas negali viršyti 50 metų.',
    copy: 'Kopijuoti',
    copied: 'Nukopijuota!',
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

export default function MortgageCalculator({ locale, initialAmount = '', initialRate = '', initialTerm = '' }: Props) {
  const t = T[locale] || T.en;
  const router = useRouter();
  const pathname = usePathname();

  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [term, setTerm] = useState(initialTerm);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(() => {
    const a = parseFloat(initialAmount);
    const r = parseFloat(initialRate);
    const y = parseFloat(initialTerm);
    if (a > 0 && r > 0 && r <= 100 && y > 0 && y <= 50 && !isNaN(a) && !isNaN(r) && !isNaN(y)) {
      return calculateMortgage(a, r, y);
    }
    return null;
  });

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
    const res = calculateMortgage(a, r, y);
    setResult(res);
    router.replace(`${pathname}?${new URLSearchParams({ amount, rate, term })}`, { scroll: false });
  }, [amount, rate, term, t, router, pathname]);

  const handleCopy = useCallback(() => {
    if (!result) return;
    const text = [
      `${t.monthlyPayment}: ${t.currency}${formatNumber(result.monthly, locale)}`,
      `${t.totalPayment}: ${t.currency}${formatNumber(result.total, locale)}`,
      `${t.totalInterest}: ${t.currency}${formatNumber(result.interest, locale)}`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result, locale, t]);

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
          <div className={styles['mortgage-widget__copy']}>
            <button
              type="button"
              className={`${styles['mortgage-widget__copy-btn']}${copied ? ` ${styles['mortgage-widget__copy-btn--copied']}` : ''}`}
              onClick={handleCopy}
              aria-label={t.copy}
            >
              {copied ? '✓' : '⎘'} {copied ? t.copied : t.copy}
            </button>
          </div>
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
