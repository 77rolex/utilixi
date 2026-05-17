'use client';

import { useState, useMemo } from 'react';
import styles from './CurrencyConverter.module.scss';

type Props = {
  locale: string;
  rates: Record<string, number>; // all rates vs USD base
  updatedAt: string;
};

const T: Record<string, {
  amount: string;
  from: string;
  to: string;
  popularRates: string;
  updated: string;
  currency: string;
  rate: string;
  noData: string;
}> = {
  en: {
    amount: 'Amount',
    from: 'From',
    to: 'To',
    popularRates: 'Popular exchange rates',
    updated: 'Rates updated',
    currency: 'Currency',
    rate: 'Rate',
    noData: 'Exchange rates are temporarily unavailable.',
  },
  ru: {
    amount: 'Сумма',
    from: 'Из',
    to: 'В',
    popularRates: 'Популярные курсы валют',
    updated: 'Курсы обновлены',
    currency: 'Валюта',
    rate: 'Курс',
    noData: 'Курсы валют временно недоступны.',
  },
  uk: {
    amount: 'Сума',
    from: 'З',
    to: 'В',
    popularRates: 'Популярні курси валют',
    updated: 'Курси оновлено',
    currency: 'Валюта',
    rate: 'Курс',
    noData: 'Курси валют тимчасово недоступні.',
  },
  fr: {
    amount: 'Montant',
    from: 'De',
    to: 'Vers',
    popularRates: 'Taux de change populaires',
    updated: 'Taux mis à jour le',
    currency: 'Devise',
    rate: 'Taux',
    noData: 'Les taux de change sont temporairement indisponibles.',
  },
  lt: {
    amount: 'Suma',
    from: 'Iš',
    to: 'Į',
    popularRates: 'Populiarūs valiutų kursai',
    updated: 'Kursai atnaujinti',
    currency: 'Valiuta',
    rate: 'Kursas',
    noData: 'Valiutų kursai laikinai nepasiekiami.',
  },
};

// Default currencies per locale
const DEFAULT_FROM: Record<string, string> = {
  en: 'USD', ru: 'RUB', uk: 'UAH', fr: 'EUR', lt: 'EUR',
};
const DEFAULT_TO: Record<string, string> = {
  en: 'EUR', ru: 'USD', uk: 'USD', fr: 'USD', lt: 'USD',
};

// Popular currencies for the rates table
const POPULAR = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'CNY', 'PLN', 'TRY', 'INR', 'RUB', 'UAH'];

// All supported currencies for select dropdowns
const ALL_CURRENCIES = [
  'AED', 'AUD', 'BGN', 'BRL', 'BYN', 'CAD', 'CHF', 'CNY', 'CZK',
  'DKK', 'EUR', 'GBP', 'GEL', 'HKD', 'HUF', 'IDR', 'ILS', 'INR',
  'JPY', 'KRW', 'KZT', 'MDL', 'MXN', 'NOK', 'NZD', 'PLN', 'RON',
  'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'UAH', 'USD', 'ZAR',
];

// Convert: rates are vs USD. Cross-rate: amount * (to/from).
function convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
  const fromRate = rates[from] ?? 1;
  const toRate = rates[to] ?? 1;
  return (amount / fromRate) * toRate;
}

function fmt(n: number): string {
  if (n >= 100) return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

function formatDate(utcStr: string, locale: string): string {
  try {
    const date = new Date(utcStr);
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return utcStr;
  }
}

export default function CurrencyConverter({ locale, rates, updatedAt }: Props) {
  const t = T[locale] || T.en;

  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState(DEFAULT_FROM[locale] || 'USD');
  const [to, setTo] = useState(DEFAULT_TO[locale] || 'EUR');

  const parsed = parseFloat(amount.replace(',', '.'));
  const isValid = !isNaN(parsed) && parsed > 0 && Object.keys(rates).length > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return convert(parsed, from, to, rates);
  }, [parsed, from, to, rates, isValid]);

  const rateForOne = useMemo(() => {
    if (!isValid) return null;
    return convert(1, from, to, rates);
  }, [from, to, rates, isValid]);

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  const tableRows = useMemo(() => {
    return POPULAR
      .filter((c) => c !== from && rates[c])
      .map((c) => ({
        code: c,
        rate: convert(1, from, c, rates),
      }));
  }, [from, rates]);

  if (Object.keys(rates).length === 0) {
    return (
      <div className={styles['currency-widget']}>
        <div className={styles['currency-widget__body']}>
          <p className={styles['currency-widget__error']}>{t.noData}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['currency-widget']}>
      <div className={styles['currency-widget__body']}>

        {/* Inputs row */}
        <div className={styles['currency-widget__inputs']}>
          <div className={styles['currency-widget__field']}>
            <label className={styles['currency-widget__label']} htmlFor="cur-amount">{t.amount}</label>
            <input
              id="cur-amount"
              className={styles['currency-widget__input']}
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className={styles['currency-widget__field']}>
            <label className={styles['currency-widget__label']} htmlFor="cur-from">{t.from}</label>
            <select
              id="cur-from"
              className={styles['currency-widget__select']}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {ALL_CURRENCIES.filter((c) => rates[c]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className={styles['currency-widget__swap']}>
            <button
              type="button"
              className={styles['currency-widget__swap-btn']}
              onClick={handleSwap}
              aria-label="Swap currencies"
            >
              ⇄
            </button>
          </div>

          <div className={styles['currency-widget__field']}>
            <label className={styles['currency-widget__label']} htmlFor="cur-to">{t.to}</label>
            <select
              id="cur-to"
              className={styles['currency-widget__select']}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {ALL_CURRENCIES.filter((c) => rates[c]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        {result !== null && (
          <div className={styles['currency-widget__result']}>
            <div className={styles['currency-widget__result-main']}>
              {fmt(parsed)} {from} = {fmt(result)} {to}
            </div>
            {rateForOne !== null && (
              <div className={styles['currency-widget__result-rate']}>
                1 {from} = {fmt(rateForOne)} {to}
                {' · '}
                1 {to} = {fmt(convert(1, to, from, rates))} {from}
              </div>
            )}
          </div>
        )}

        <p className={styles['currency-widget__updated']}>
          {t.updated}: {formatDate(updatedAt, locale)}
        </p>
      </div>

      {/* Popular rates table */}
      <div className={styles['currency-widget__table-wrap']}>
        <p className={styles['currency-widget__table-title']}>
          {t.popularRates} · 1 {from}
        </p>
        <table className={styles['currency-widget__table']}>
          <thead>
            <tr className={`${styles['currency-widget__table-row']} ${styles['currency-widget__table-row--header']}`}>
              <th className={`${styles['currency-widget__table-cell']} ${styles['currency-widget__table-cell--header']}`}>
                {t.currency}
              </th>
              <th className={`${styles['currency-widget__table-cell']} ${styles['currency-widget__table-cell--header']}`}>
                {t.rate}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ code, rate }) => (
              <tr key={code} className={styles['currency-widget__table-row']}>
                <td className={styles['currency-widget__table-cell']}>{code}</td>
                <td className={styles['currency-widget__table-cell']}>{fmt(rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
