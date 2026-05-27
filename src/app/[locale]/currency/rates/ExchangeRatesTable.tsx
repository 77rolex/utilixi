'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './ExchangeRatesTable.module.scss';
import { getCurrencyName } from '../shared';

type Props = {
  locale: string;
  rates: Record<string, number>;
  updatedAt: string;
};

type SortField = 'code' | 'rate';
type SortDir   = 'asc' | 'desc';

const LOCALE_BASE: Record<string, string> = {
  en: 'USD', ru: 'RUB', uk: 'UAH', fr: 'EUR', lt: 'EUR',
};

const LOCALE_TOP: Record<string, string[]> = {
  en: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY', 'CNY', 'HKD', 'NZD'],
  ru: ['RUB', 'USD', 'EUR', 'UAH', 'BYN', 'KZT', 'GBP', 'CHF', 'JPY', 'CNY'],
  uk: ['UAH', 'USD', 'EUR', 'RUB', 'PLN', 'GBP', 'CHF', 'JPY', 'CNY', 'CZK'],
  fr: ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'JPY', 'CNY', 'MAD', 'DZD', 'TND'],
  lt: ['EUR', 'USD', 'GBP', 'PLN', 'SEK', 'DKK', 'NOK', 'CHF', 'CZK', 'HUF'],
};

const T: Record<string, {
  base: string;
  currency: string;
  rate: string;
  search: string;
  noData: string;
  updated: string;
  goToConverter: string;
}> = {
  en: {
    base: 'Base currency',
    currency: 'Currency',
    rate: 'Rate',
    search: 'Search currency...',
    noData: 'Exchange rate data is temporarily unavailable.',
    updated: 'Rates updated',
    goToConverter: 'Currency Converter →',
  },
  ru: {
    base: 'Базовая валюта',
    currency: 'Валюта',
    rate: 'Курс',
    search: 'Поиск валюты...',
    noData: 'Данные о курсах валют временно недоступны.',
    updated: 'Курсы обновлены',
    goToConverter: 'Конвертер валют →',
  },
  uk: {
    base: 'Базова валюта',
    currency: 'Валюта',
    rate: 'Курс',
    search: 'Пошук валюти...',
    noData: 'Дані про курси валют тимчасово недоступні.',
    updated: 'Курси оновлено',
    goToConverter: 'Конвертер валют →',
  },
  fr: {
    base: 'Devise de base',
    currency: 'Devise',
    rate: 'Taux',
    search: 'Rechercher une devise...',
    noData: 'Les données de taux de change sont temporairement indisponibles.',
    updated: 'Taux mis à jour le',
    goToConverter: 'Convertisseur de devises →',
  },
  lt: {
    base: 'Bazinė valiuta',
    currency: 'Valiuta',
    rate: 'Kursas',
    search: 'Ieškoti valiutos...',
    noData: 'Valiutų kursų duomenys laikinai nepasiekiami.',
    updated: 'Kursai atnaujinti',
    goToConverter: 'Valiutų keitiklis →',
  },
};

function fmt(n: number): string {
  if (n >= 100)  return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  if (n >= 1)    return n.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 });
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

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className={styles['rates-table__sort-icon']} aria-hidden="true">
      <span className={`${styles['rates-table__sort-arrow']} ${active && dir === 'asc' ? styles['rates-table__sort-arrow--active'] : ''}`}>▲</span>
      <span className={`${styles['rates-table__sort-arrow']} ${active && dir === 'desc' ? styles['rates-table__sort-arrow--active'] : ''}`}>▼</span>
    </span>
  );
}

export default function ExchangeRatesTable({ locale, rates, updatedAt }: Props) {
  const t = T[locale] || T.en;

  const defaultBase = useMemo(() => {
    const preferred = LOCALE_BASE[locale] || 'USD';
    return rates[preferred] ? preferred : 'USD';
  }, [locale, rates]);

  const [base, setBase] = useState(defaultBase);
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('code');
  const [sortDir, setSortDir]     = useState<SortDir>('asc');

  const baseCurrencies = useMemo(() => {
    const top = LOCALE_TOP[locale] || LOCALE_TOP.en;
    return top.filter(c => rates[c]);
  }, [rates, locale]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'code' ? 'asc' : 'desc');
    }
  }

  const allRows = useMemo(() => {
    const baseRate = rates[base] ?? 1;
    return Object.entries(rates)
      .filter(([code]) => code !== base)
      .map(([code, usdRate]) => ({
        code,
        name: getCurrencyName(code, locale),
        rate: usdRate / baseRate,
      }));
  }, [rates, base, locale]);

  const sorted = useMemo(() => {
    return [...allRows].sort((a, b) => {
      const cmp = sortField === 'code'
        ? a.code.localeCompare(b.code)
        : a.rate - b.rate;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [allRows, sortField, sortDir]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(r =>
      r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  }, [sorted, query]);

  if (Object.keys(rates).length === 0) {
    return (
      <div className={styles['rates-table']}>
        <p className={styles['rates-table__error']}>{t.noData}</p>
      </div>
    );
  }

  return (
    <div className={styles['rates-table']}>
      <div className={styles['rates-table__meta']}>
        <div className={styles['rates-table__base-wrap']}>
          <label className={styles['rates-table__base-label']} htmlFor="rates-base">{t.base}:</label>
          <select
            id="rates-base"
            className={styles['rates-table__base-select']}
            value={base}
            onChange={e => setBase(e.target.value)}
          >
            {baseCurrencies.map(c => (
              <option key={c} value={c}>{c} — {getCurrencyName(c, locale)}</option>
            ))}
          </select>
        </div>
        <Link href={`/${locale}/currency`} className={styles['rates-table__link']}>
          {t.goToConverter}
        </Link>
      </div>

      <div className={styles['rates-table__search-wrap']}>
        <input
          type="text"
          className={styles['rates-table__search']}
          placeholder={t.search}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className={styles['rates-table__scroll']}>
        <table className={styles['rates-table__table']}>
          <thead>
            <tr className={styles['rates-table__row']}>
              <th
                className={`${styles['rates-table__cell']} ${styles['rates-table__cell--sortable']}`}
                onClick={() => handleSort('code')}
              >
                {t.currency}
                <SortIcon active={sortField === 'code'} dir={sortDir} />
              </th>
              <th
                className={`${styles['rates-table__cell']} ${styles['rates-table__cell--right']} ${styles['rates-table__cell--sortable']}`}
                onClick={() => handleSort('rate')}
              >
                1 {base} =
                <SortIcon active={sortField === 'rate'} dir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ code, name, rate }) => (
              <tr key={code} className={styles['rates-table__row']}>
                <td className={styles['rates-table__cell']}>
                  <span className={styles['rates-table__code']}>{code}</span>
                  {name && <span className={styles['rates-table__name']}>{name}</span>}
                </td>
                <td className={`${styles['rates-table__cell']} ${styles['rates-table__cell--right']}`}>
                  <span className={styles['rates-table__rate']}>{fmt(rate)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles['rates-table__updated']}>
        {t.updated}: {formatDate(updatedAt, locale)}
      </p>
    </div>
  );
}
