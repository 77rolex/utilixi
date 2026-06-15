'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import styles from './CryptoConverter.module.scss';
import type { CoinData } from '../shared';

type Props = {
  locale: string;
  coins: CoinData[];
  fiatRates: Record<string, number>;
};

const FIAT_CURRENCIES = ['USD', 'EUR', 'GBP', 'RUB', 'UAH', 'PLN', 'CHF', 'CAD', 'AUD', 'JPY', 'CNY', 'TRY', 'BYN', 'KZT'];

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const FIAT_NAMES: Record<string, Record<LangKey, string>> = {
  USD: { en: 'US Dollar',          ru: 'Доллар США',            uk: 'Долар США',             fr: 'Dollar américain',       lt: 'JAV doleris' },
  EUR: { en: 'Euro',               ru: 'Евро',                  uk: 'Євро',                  fr: 'Euro',                   lt: 'Euras' },
  GBP: { en: 'British Pound',      ru: 'Фунт стерлингов',       uk: 'Британський фунт',      fr: 'Livre sterling',         lt: 'Britanijos svaras' },
  RUB: { en: 'Russian Ruble',      ru: 'Российский рубль',      uk: 'Російський рубль',      fr: 'Rouble russe',           lt: 'Rusijos rublis' },
  UAH: { en: 'Ukrainian Hryvnia',  ru: 'Украинская гривна',     uk: 'Українська гривня',     fr: 'Hryvnia ukrainienne',    lt: 'Ukrainos grivna' },
  PLN: { en: 'Polish Złoty',       ru: 'Польский злотый',       uk: 'Польський злотий',      fr: 'Złoty polonais',         lt: 'Lenkijos zlotas' },
  CHF: { en: 'Swiss Franc',        ru: 'Швейцарский франк',     uk: 'Швейцарський франк',    fr: 'Franc suisse',           lt: 'Šveicarijos frankas' },
  CAD: { en: 'Canadian Dollar',    ru: 'Канадский доллар',      uk: 'Канадський долар',      fr: 'Dollar canadien',        lt: 'Kanados doleris' },
  AUD: { en: 'Australian Dollar',  ru: 'Австралийский доллар',  uk: 'Австралійський долар',  fr: 'Dollar australien',      lt: 'Australijos doleris' },
  JPY: { en: 'Japanese Yen',       ru: 'Японская иена',         uk: 'Японська єна',          fr: 'Yen japonais',           lt: 'Japonijos jena' },
  CNY: { en: 'Chinese Yuan',       ru: 'Китайский юань',        uk: 'Китайський юань',       fr: 'Yuan chinois',           lt: 'Kinijos juanis' },
  TRY: { en: 'Turkish Lira',       ru: 'Турецкая лира',         uk: 'Турецька ліра',         fr: 'Livre turque',           lt: 'Turkijos lira' },
  BYN: { en: 'Belarusian Ruble',   ru: 'Белорусский рубль',     uk: 'Білоруський рубль',     fr: 'Rouble biélorusse',      lt: 'Baltarusijos rublis' },
  KZT: { en: 'Kazakhstani Tenge',  ru: 'Казахстанский тенге',   uk: 'Казахстанський тенге',  fr: 'Tenge kazakh',           lt: 'Kazachstano tengė' },
};

function getFiatName(code: string, locale: string): string {
  const l = (locale as LangKey) in (FIAT_NAMES[code] || {}) ? (locale as LangKey) : 'en';
  return FIAT_NAMES[code]?.[l] ?? code;
}

const FIAT_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', RUB: '₽', UAH: '₴', PLN: 'zł',
  CHF: 'Fr', CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', TRY: '₺',
  BYN: 'Br', KZT: '₸',
};

const DEFAULT_FIAT: Record<string, string> = {
  en: 'USD', ru: 'RUB', uk: 'UAH', fr: 'EUR', lt: 'EUR',
};

// Fallback rates — used only when ExchangeRate-API is unavailable
const FIAT_FALLBACK: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, RUB: 88, UAH: 41, PLN: 3.98,
  CHF: 0.90, CAD: 1.37, AUD: 1.54, JPY: 150, CNY: 7.24, TRY: 32,
  BYN: 3.28, KZT: 450,
};

const T: Record<string, {
  converterTitle: string;
  amount: string;
  coin: string;
  currency: string;
  noData: string;
  updatedEvery: string;
  goToRates: string;
}> = {
  en: {
    converterTitle: 'Crypto Converter',
    amount: 'Amount',
    coin: 'Coin',
    currency: 'Currency',
    noData: 'Cryptocurrency data is temporarily unavailable.',
    updatedEvery: 'Coin prices updated every 5 minutes',
    goToRates: '← Cryptocurrency Rates',
  },
  ru: {
    converterTitle: 'Конвертер криптовалют',
    amount: 'Сумма',
    coin: 'Монета',
    currency: 'Валюта',
    noData: 'Данные о криптовалютах временно недоступны.',
    updatedEvery: 'Цены монет обновляются каждые 5 минут',
    goToRates: '← Курс криптовалют',
  },
  uk: {
    converterTitle: 'Конвертер криптовалют',
    amount: 'Сума',
    coin: 'Монета',
    currency: 'Валюта',
    noData: 'Дані про криптовалюти тимчасово недоступні.',
    updatedEvery: 'Ціни монет оновлюються кожні 5 хвилин',
    goToRates: '← Курс криптовалют',
  },
  fr: {
    converterTitle: 'Convertisseur Crypto',
    amount: 'Montant',
    coin: 'Coin',
    currency: 'Devise',
    noData: 'Les données sur les cryptomonnaies sont temporairement indisponibles.',
    updatedEvery: 'Prix mis à jour toutes les 5 minutes',
    goToRates: '← Cours des cryptomonnaies',
  },
  lt: {
    converterTitle: 'Kriptovaliutų Keitiklis',
    amount: 'Suma',
    coin: 'Moneta',
    currency: 'Valiuta',
    noData: 'Kriptovaliutų duomenys laikinai nepasiekiami.',
    updatedEvery: 'Monetos kainos atnaujinamos kas 5 minutes',
    goToRates: '← Kriptovaliutų kursai',
  },
};

function fmtPrice(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  if (n >= 1)    return n.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 });
  if (n >= 0.01) return n.toLocaleString('en-US', { maximumFractionDigits: 5 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 8 });
}

function fmtResult(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  if (n >= 1)    return n.toLocaleString('en-US', { maximumFractionDigits: 4, minimumFractionDigits: 2 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

export default function CryptoConverter({ locale, coins, fiatRates }: Props) {
  const t = T[locale] || T.en;

  const [amount, setAmount]             = useState('1');
  const [selectedCoin, setSelectedCoin] = useState(coins[0]?.id || 'bitcoin');
  const [selectedFiat, setSelectedFiat] = useState(DEFAULT_FIAT[locale] || 'USD');

  useEffect(() => {
    const savedCoin = localStorage.getItem('utilixi_crypto_coin');
    const savedFiat = localStorage.getItem('utilixi_crypto_fiat');
    if (savedCoin && coins.find(c => c.id === savedCoin)) setSelectedCoin(savedCoin);
    if (savedFiat && FIAT_CURRENCIES.includes(savedFiat)) setSelectedFiat(savedFiat);
  }, []);

  function handleCoinChange(id: string) {
    setSelectedCoin(id);
    localStorage.setItem('utilixi_crypto_coin', id);
  }

  function handleFiatChange(code: string) {
    setSelectedFiat(code);
    localStorage.setItem('utilixi_crypto_fiat', code);
  }

  const rates = Object.keys(fiatRates).length > 0 ? fiatRates : FIAT_FALLBACK;

  const result = useMemo(() => {
    const a = parseFloat(amount.replace(',', '.'));
    if (isNaN(a) || a <= 0) return null;
    const coin = coins.find(c => c.id === selectedCoin);
    if (!coin) return null;
    const rate = rates[selectedFiat] ?? 1;
    return a * coin.current_price * rate;
  }, [amount, selectedCoin, selectedFiat, coins, rates]);

  const coinData = coins.find(c => c.id === selectedCoin);
  const symbol   = FIAT_SYMBOLS[selectedFiat] || selectedFiat;

  if (coins.length === 0) {
    return (
      <div className={styles['crypto-converter']}>
        <p className={styles['crypto-converter__error']}>{t.noData}</p>
      </div>
    );
  }

  return (
    <div className={styles['crypto-converter']}>
      <div className={styles['crypto-converter__header']}>
        <Link href={`/${locale}/crypto`} className={styles['crypto-converter__related-link']}>
          {t.goToRates}
        </Link>
        <span className={styles['crypto-converter__updated']}>{t.updatedEvery}</span>
      </div>

      <div className={styles['crypto-converter__body']}>
        <div className={styles['crypto-converter__inputs']}>
          <div className={styles['crypto-converter__field']}>
            <label className={styles['crypto-converter__label']} htmlFor="cc-amount">{t.amount}</label>
            <input
              id="cc-amount"
              className={styles['crypto-converter__input']}
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <div className={styles['crypto-converter__field']}>
            <label className={styles['crypto-converter__label']} htmlFor="cc-coin">{t.coin}</label>
            <select
              id="cc-coin"
              className={styles['crypto-converter__select']}
              value={selectedCoin}
              onChange={e => handleCoinChange(e.target.value)}
            >
              {coins.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className={styles['crypto-converter__field']}>
            <label className={styles['crypto-converter__label']} htmlFor="cc-fiat">{t.currency}</label>
            <select
              id="cc-fiat"
              className={styles['crypto-converter__select']}
              value={selectedFiat}
              onChange={e => handleFiatChange(e.target.value)}
            >
              {FIAT_CURRENCIES.map(c => (
                <option key={c} value={c}>{c} ({getFiatName(c, locale)})</option>
              ))}
            </select>
          </div>
        </div>

        {result !== null && coinData && (
          <div className={styles['crypto-converter__result']}>
            <div className={styles['crypto-converter__result-main']}>
              {amount} {coinData.symbol.toUpperCase()} = {symbol}{fmtResult(result)} {selectedFiat}
            </div>
            <div className={styles['crypto-converter__result-rate']}>
              1 {coinData.symbol.toUpperCase()} = ${fmtPrice(coinData.current_price)} USD
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
