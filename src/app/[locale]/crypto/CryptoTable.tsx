'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CryptoTable.module.scss';
import type { CoinData } from './shared';

type Props = { locale: string; coins: CoinData[] };

type SortField = 'name' | 'price' | 'change' | 'marketCap';
type SortDir   = 'asc' | 'desc';

const T: Record<string, {
  rank: string;
  name: string;
  price: string;
  change24h: string;
  marketCap: string;
  noData: string;
  updatedEvery: string;
  goToConverter: string;
}> = {
  en: {
    rank: '#',
    name: 'Name',
    price: 'Price (USD)',
    change24h: '24h Change',
    marketCap: 'Market Cap',
    noData: 'Cryptocurrency data is temporarily unavailable.',
    updatedEvery: 'Updated every 5 minutes',
    goToConverter: 'Crypto Converter →',
  },
  ru: {
    rank: '#',
    name: 'Название',
    price: 'Цена (USD)',
    change24h: 'Изменение 24ч',
    marketCap: 'Капитализация',
    noData: 'Данные о криптовалютах временно недоступны.',
    updatedEvery: 'Обновляется каждые 5 минут',
    goToConverter: 'Конвертер криптовалют →',
  },
  uk: {
    rank: '#',
    name: 'Назва',
    price: 'Ціна (USD)',
    change24h: 'Зміна 24г',
    marketCap: 'Капіталізація',
    noData: 'Дані про криптовалюти тимчасово недоступні.',
    updatedEvery: 'Оновлюється кожні 5 хвилин',
    goToConverter: 'Конвертер криптовалют →',
  },
  fr: {
    rank: '#',
    name: 'Nom',
    price: 'Prix (USD)',
    change24h: 'Variation 24h',
    marketCap: 'Capitalisation',
    noData: 'Les données sur les cryptomonnaies sont temporairement indisponibles.',
    updatedEvery: 'Mis à jour toutes les 5 minutes',
    goToConverter: 'Convertisseur crypto →',
  },
  lt: {
    rank: '#',
    name: 'Pavadinimas',
    price: 'Kaina (USD)',
    change24h: 'Pokytis 24h',
    marketCap: 'Rinkos kap.',
    noData: 'Kriptovaliutų duomenys laikinai nepasiekiami.',
    updatedEvery: 'Atnaujinama kas 5 minutes',
    goToConverter: 'Kriptovaliutų keitiklis →',
  },
};

function fmtPrice(n: number | null): string {
  if (n == null) return '—';
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  if (n >= 1)    return n.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 });
  if (n >= 0.01) return n.toLocaleString('en-US', { maximumFractionDigits: 5 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 8 });
}

function fmtMarketCap(n: number | null): string {
  if (n == null) return '—';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString('en-US')}`;
}

function SortIcon({ field, active, dir }: { field: SortField; active: boolean; dir: SortDir }) {
  return (
    <span className={styles['crypto-table__sort-icon']} aria-hidden="true">
      <span className={`${styles['crypto-table__sort-arrow']} ${active && dir === 'asc' ? styles['crypto-table__sort-arrow--active'] : ''}`}>▲</span>
      <span className={`${styles['crypto-table__sort-arrow']} ${active && dir === 'desc' ? styles['crypto-table__sort-arrow--active'] : ''}`}>▼</span>
    </span>
  );
}

export default function CryptoTable({ locale, coins }: Props) {
  const t = T[locale] || T.en;

  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDir, setSortDir]     = useState<SortDir>('desc');

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'name' ? 'asc' : 'desc');
    }
  }

  const sorted = useMemo(() => {
    return [...coins].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name')      cmp = a.name.localeCompare(b.name);
      if (sortField === 'price')     cmp = (a.current_price ?? 0) - (b.current_price ?? 0);
      if (sortField === 'change')    cmp = (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0);
      if (sortField === 'marketCap') cmp = (a.market_cap ?? 0) - (b.market_cap ?? 0);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [coins, sortField, sortDir]);

  if (coins.length === 0) {
    return (
      <div className={styles['crypto-table']}>
        <p className={styles['crypto-table__error']}>{t.noData}</p>
      </div>
    );
  }

  return (
    <div className={styles['crypto-table']}>
      <div className={styles['crypto-table__meta']}>
        <span className={styles['crypto-table__updated']}>{t.updatedEvery}</span>
        <Link href={`/${locale}/crypto/converter`} className={styles['crypto-table__related-link']}>
          {t.goToConverter}
        </Link>
      </div>

      <div className={styles['crypto-table__scroll']}>
        <table className={styles['crypto-table__table']}>
          <thead>
            <tr className={styles['crypto-table__row']}>
              <th className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--rank']}`}>
                {t.rank}
              </th>
              <th
                className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--name']} ${styles['crypto-table__cell--sortable']}`}
                onClick={() => handleSort('name')}
              >
                {t.name}
                <SortIcon field="name" active={sortField === 'name'} dir={sortDir} />
              </th>
              <th
                className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--right']} ${styles['crypto-table__cell--sortable']}`}
                onClick={() => handleSort('price')}
              >
                {t.price}
                <SortIcon field="price" active={sortField === 'price'} dir={sortDir} />
              </th>
              <th
                className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--right']} ${styles['crypto-table__cell--sortable']}`}
                onClick={() => handleSort('change')}
              >
                {t.change24h}
                <SortIcon field="change" active={sortField === 'change'} dir={sortDir} />
              </th>
              <th
                className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--right']} ${styles['crypto-table__cell--sortable']} ${styles['crypto-table__cell--hide-mobile']}`}
                onClick={() => handleSort('marketCap')}
              >
                {t.marketCap}
                <SortIcon field="marketCap" active={sortField === 'marketCap'} dir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((coin, idx) => {
              const change = coin.price_change_percentage_24h;
              const isUp = change == null ? true : change >= 0;
              return (
                <tr key={coin.id} className={styles['crypto-table__row']}>
                  <td className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--rank']}`}>
                    {idx + 1}
                  </td>
                  <td className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--name']}`}>
                    <div className={styles['crypto-table__coin']}>
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className={styles['crypto-table__coin-icon']}
                      />
                      <span className={styles['crypto-table__coin-info']}>
                        <span className={styles['crypto-table__coin-name']}>{coin.name}</span>
                        <span className={styles['crypto-table__coin-symbol']}>{coin.symbol.toUpperCase()}</span>
                      </span>
                    </div>
                  </td>
                  <td className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--right']}`}>
                    <span className={styles['crypto-table__price']}>${fmtPrice(coin.current_price)}</span>
                  </td>
                  <td className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--right']}`}>
                    <span className={`${styles['crypto-table__change']} ${isUp ? styles['crypto-table__change--up'] : styles['crypto-table__change--down']}`}>
                      {change == null ? '—' : `${isUp ? '+' : ''}${change.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className={`${styles['crypto-table__cell']} ${styles['crypto-table__cell--right']} ${styles['crypto-table__cell--hide-mobile']}`}>
                    <span className={styles['crypto-table__mcap']}>{fmtMarketCap(coin.market_cap)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
