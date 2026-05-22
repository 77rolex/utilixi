'use client';

import { useState } from 'react';
import styles from './CryptoTaxCalculator.module.scss';

type TaxRule = {
  en: string; ru: string; uk: string; fr: string; lt: string;
  symbol: string;
  shortRate: number;
  longRate: number;
  longExempt?: boolean;
  note?: Record<string, string>;
};

const COUNTRIES: Record<string, TaxRule> = {
  US: {
    en: 'USA', ru: 'США', uk: 'США', fr: 'États-Unis', lt: 'JAV',
    symbol: '$', shortRate: 0.22, longRate: 0.15,
    note: {
      en: 'Short-term: taxed as ordinary income (10–37%). Long-term (>1 year): 0%, 15%, or 20% depending on income.',
      ru: 'Краткосрочный: облагается как обычный доход (10–37%). Долгосрочный (>1 года): 0%, 15% или 20%.',
      uk: 'Короткостроковий: оподатковується як звичайний дохід. Довгостроковий (>1 року): 0%, 15% або 20%.',
      fr: 'Court terme : imposé comme revenu ordinaire. Long terme (>1 an) : 0 %, 15 % ou 20 %.',
      lt: 'Trumpalaikis: apmokestinamas kaip įprastos pajamos. Ilgalaikis (>1 metai): 0 %, 15 % arba 20 %.',
    },
  },
  GB: {
    en: 'United Kingdom', ru: 'Великобритания', uk: 'Великобританія', fr: 'Royaume-Uni', lt: 'Didžioji Britanija',
    symbol: '£', shortRate: 0.18, longRate: 0.18,
    note: {
      en: 'Capital Gains Tax: 18% (basic rate) or 24% (higher rate). Annual allowance of £3,000 is tax-free.',
      ru: 'Налог на прирост капитала: 18% (базовая ставка) или 24% (повышенная). Годовая льгота £3,000 не облагается.',
      uk: 'Податок на приріст капіталу: 18% або 24%. Річна пільга £3,000 не оподатковується.',
      fr: 'Impôt sur les plus-values : 18 % ou 24 %. Abattement annuel de 3 000 £ exonéré.',
      lt: 'Kapitalo prieaugio mokestis: 18 % arba 24 %. Metinė 3 000 £ išimtis neapmokestinama.',
    },
  },
  DE: {
    en: 'Germany', ru: 'Германия', uk: 'Німеччина', fr: 'Allemagne', lt: 'Vokietija',
    symbol: '€', shortRate: 0.26, longRate: 0,
    longExempt: true,
    note: {
      en: 'Held >1 year: completely tax-free. Held <1 year: 26% flat tax (Abgeltungsteuer).',
      ru: 'Удержание >1 года: полностью не облагается. Удержание <1 года: 26% фиксированный налог.',
      uk: 'Утримання >1 року: повністю не оподатковується. Утримання <1 року: 26% фіксований.',
      fr: 'Détenu >1 an : totalement exonéré. Détenu <1 an : 26 % (Abgeltungsteuer).',
      lt: 'Laikyta >1 metus: visiškai neapmokestinama. Laikyta <1 metų: 26 % (Abgeltungsteuer).',
    },
  },
  FR: {
    en: 'France', ru: 'Франция', uk: 'Франція', fr: 'France', lt: 'Prancūzija',
    symbol: '€', shortRate: 0.30, longRate: 0.30,
    note: {
      en: 'Flat tax (PFU) of 30% regardless of holding period (12.8% income tax + 17.2% social contributions).',
      ru: 'Единый налог (PFU) 30% независимо от срока владения (12,8% НДФЛ + 17,2% социальные взносы).',
      uk: 'Єдиний податок (PFU) 30% незалежно від терміну (12,8% + 17,2% соціальні внески).',
      fr: 'Flat tax (PFU) de 30 % quel que soit la durée (12,8 % IR + 17,2 % prélèvements sociaux).',
      lt: 'Fiksuotas mokestis (PFU) 30 %, nepriklausomai nuo laikymo laikotarpio.',
    },
  },
  PL: {
    en: 'Poland', ru: 'Польша', uk: 'Польща', fr: 'Pologne', lt: 'Lenkija',
    symbol: 'zł', shortRate: 0.19, longRate: 0.19,
    note: {
      en: 'Capital gains tax: 19% flat rate regardless of holding period.',
      ru: 'Налог на прирост капитала: 19% фиксированная ставка.',
      uk: 'Податок на приріст капіталу: 19% фіксована ставка.',
      fr: 'Impôt sur les plus-values : taux forfaitaire de 19 %.',
      lt: 'Kapitalo prieaugio mokestis: 19 % fiksuotas tarifas.',
    },
  },
  LT: {
    en: 'Lithuania', ru: 'Литва', uk: 'Литва', fr: 'Lituanie', lt: 'Lietuva',
    symbol: '€', shortRate: 0.15, longRate: 0.15,
    note: {
      en: 'Capital gains taxed at 15% flat rate.',
      ru: 'Прирост капитала облагается по ставке 15%.',
      uk: 'Приріст капіталу оподатковується за ставкою 15%.',
      fr: 'Plus-values imposées au taux forfaitaire de 15 %.',
      lt: 'Kapitalo prieaugis apmokestinamas 15 % tarifu.',
    },
  },
  UA: {
    en: 'Ukraine', ru: 'Украина', uk: 'Україна', fr: 'Ukraine', lt: 'Ukraina',
    symbol: '₴', shortRate: 0.195, longRate: 0.195,
    note: {
      en: 'Income tax 18% + military levy 1.5% = 19.5% flat rate.',
      ru: 'НДФЛ 18% + военный сбор 1,5% = 19,5%.',
      uk: 'ПДФО 18% + військовий збір 1,5% = 19,5%.',
      fr: 'Impôt sur le revenu 18 % + prélèvement militaire 1,5 % = 19,5 %.',
      lt: 'Pajamų mokestis 18 % + karinis mokestis 1,5 % = 19,5 %.',
    },
  },
  RU: {
    en: 'Russia', ru: 'Россия', uk: 'Росія', fr: 'Russie', lt: 'Rusija',
    symbol: '₽', shortRate: 0.13, longRate: 0.13,
    note: {
      en: 'NDFL 13% (15% above 5M RUB). No specific long-term exemption for crypto.',
      ru: 'НДФЛ 13% (15% при доходе свыше 5 млн ₽). Специальных льгот для крипты нет.',
      uk: 'ПДФО 13% (15% понад 5 млн ₽). Спеціальних пільг для крипти немає.',
      fr: 'NDFL 13 % (15 % au-delà de 5 M RUB). Pas d\'exonération spécifique pour les cryptos.',
      lt: 'NDFL 13 % (15 % viršijant 5 mln. RUB). Nėra specialių kriptovaliutų lengvatų.',
    },
  },
};

const L: Record<string, Record<string, string>> = {
  country:     { en: 'Country', ru: 'Страна', uk: 'Країна', fr: 'Pays', lt: 'Šalis' },
  buyPrice:    { en: 'Purchase Price per Coin', ru: 'Цена покупки за монету', uk: 'Ціна купівлі за монету', fr: 'Prix d\'achat par coin', lt: 'Pirkimo kaina už monetą' },
  sellPrice:   { en: 'Sale Price per Coin', ru: 'Цена продажи за монету', uk: 'Ціна продажу за монету', fr: 'Prix de vente par coin', lt: 'Pardavimo kaina už monetą' },
  quantity:    { en: 'Number of Coins', ru: 'Количество монет', uk: 'Кількість монет', fr: 'Nombre de coins', lt: 'Monetų skaičius' },
  holding:     { en: 'Holding Period', ru: 'Срок владения', uk: 'Термін утримання', fr: 'Durée de détention', lt: 'Laikymo laikotarpis' },
  shortTerm:   { en: 'Less than 1 year', ru: 'Менее 1 года', uk: 'Менше 1 року', fr: 'Moins d\'1 an', lt: 'Mažiau nei 1 metai' },
  longTerm:    { en: 'More than 1 year', ru: 'Более 1 года', uk: 'Більше 1 року', fr: 'Plus d\'1 an', lt: 'Daugiau nei 1 metai' },
  calculate:   { en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  totalProfit: { en: 'Total Profit', ru: 'Прибыль', uk: 'Прибуток', fr: 'Bénéfice total', lt: 'Bendras pelnas' },
  taxRate:     { en: 'Tax Rate', ru: 'Ставка налога', uk: 'Ставка податку', fr: 'Taux d\'imposition', lt: 'Mokesčio norma' },
  taxOwed:     { en: 'Tax Owed', ru: 'Сумма налога', uk: 'Сума податку', fr: 'Impôt dû', lt: 'Mokėtinas mokestis' },
  netProfit:   { en: 'Net Profit', ru: 'Чистая прибыль', uk: 'Чистий прибуток', fr: 'Bénéfice net', lt: 'Grynasis pelnas' },
  exempt:      { en: 'TAX FREE — held >1 year in Germany', ru: 'НАЛОГ 0% — удержание >1 года в Германии', uk: 'ПОДАТОК 0% — утримання >1 року в Німеччині', fr: 'EXONÉRÉ — détenu >1 an en Allemagne', lt: 'NEAPMOKESTINAMA — laikyta >1 metus Vokietijoje' },
  loss:        { en: 'No tax — result is a loss', ru: 'Налог не взимается — результат убыток', uk: 'Податок не стягується — результат збиток', fr: 'Pas d\'impôt — résultat en perte', lt: 'Mokestis netaikomas — nuostolingas rezultatas' },
  disclaimer: {
    en: 'Tax laws on cryptocurrency vary and change frequently. Consult a tax professional for your specific situation.',
    ru: 'Налогообложение криптовалют варьируется и часто меняется. Проконсультируйтесь с налоговым специалистом.',
    uk: 'Оподаткування криптовалют варіюється і часто змінюється. Проконсультуйтеся з фахівцем.',
    fr: 'La fiscalité des cryptomonnaies varie et évolue fréquemment. Consultez un professionnel fiscal.',
    lt: 'Kriptovaliutų mokesčiai skiriasi ir dažnai keičiasi. Pasitarkite su mokesčių specialistu.',
  },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Result = {
  profit: number; rate: number; tax: number; net: number;
  symbol: string; isLoss: boolean; isExempt: boolean; note: string;
};

export default function CryptoTaxCalculator({ locale }: { locale: string }) {
  const [country, setCountry] = useState('US');
  const [buyPrice, setBuyPrice] = useState('30000');
  const [sellPrice, setSellPrice] = useState('60000');
  const [quantity, setQuantity] = useState('1');
  const [holding, setHolding] = useState('long');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const qty = parseFloat(quantity) || 1;
    const profit = (sell - buy) * qty;

    const config = COUNTRIES[country];
    const isLoss = profit <= 0;
    const isExempt = !isLoss && holding === 'long' && !!config.longExempt;
    const rate = holding === 'long' ? config.longRate : config.shortRate;
    const tax = isLoss || isExempt ? 0 : profit * rate;

    setResult({
      profit,
      rate: isExempt ? 0 : rate * 100,
      tax: Math.round(tax),
      net: Math.round(profit - tax),
      symbol: config.symbol,
      isLoss,
      isExempt,
      note: config.note?.[locale] ?? config.note?.en ?? '',
    });
  }

  const fmt = (n: number) => Math.abs(n).toLocaleString('en-US');
  const config = COUNTRIES[country];

  return (
    <div className={styles['crypto-tax-widget']}>
      <div className={styles['crypto-tax-widget__form']}>
        <div className={styles['crypto-tax-widget__row']}>
          <div className={styles['crypto-tax-widget__field']}>
            <label className={styles['crypto-tax-widget__label']}>{t('country', locale)}</label>
            <select className={styles['crypto-tax-widget__select']} value={country} onChange={e => { setCountry(e.target.value); setResult(null); }}>
              {Object.entries(COUNTRIES).map(([code, data]) => (
                <option key={code} value={code}>{data[locale as 'en'|'ru'|'uk'|'fr'|'lt'] || data.en}</option>
              ))}
            </select>
          </div>
          <div className={styles['crypto-tax-widget__field']}>
            <label className={styles['crypto-tax-widget__label']}>{t('holding', locale)}</label>
            <select className={styles['crypto-tax-widget__select']} value={holding} onChange={e => setHolding(e.target.value)}>
              <option value="short">{t('shortTerm', locale)}</option>
              <option value="long">{t('longTerm', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['crypto-tax-widget__row']}>
          <div className={styles['crypto-tax-widget__field']}>
            <label className={styles['crypto-tax-widget__label']}>{t('buyPrice', locale)} ({config.symbol})</label>
            <input
              type="number"
              className={styles['crypto-tax-widget__input']}
              value={buyPrice}
              onChange={e => setBuyPrice(e.target.value)}
              min="0" step="100"
            />
          </div>
          <div className={styles['crypto-tax-widget__field']}>
            <label className={styles['crypto-tax-widget__label']}>{t('sellPrice', locale)} ({config.symbol})</label>
            <input
              type="number"
              className={styles['crypto-tax-widget__input']}
              value={sellPrice}
              onChange={e => setSellPrice(e.target.value)}
              min="0" step="100"
            />
          </div>
        </div>

        <div className={styles['crypto-tax-widget__field']}>
          <label className={styles['crypto-tax-widget__label']}>{t('quantity', locale)}</label>
          <input
            type="number"
            className={styles['crypto-tax-widget__input']}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            min="0.000001" step="0.1"
          />
        </div>

        <button type="button" className={styles['crypto-tax-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['crypto-tax-widget__results']}>
          {result.isExempt && (
            <div className={styles['crypto-tax-widget__note']}>{t('exempt', locale)}</div>
          )}
          {result.isLoss && (
            <div className={styles['crypto-tax-widget__note']}>{t('loss', locale)}</div>
          )}
          <div className={styles['crypto-tax-widget__result-grid']}>
            <div className={styles['crypto-tax-widget__result-item']}>
              <span className={styles['crypto-tax-widget__result-label']}>{t('totalProfit', locale)}</span>
              <span className={`${styles['crypto-tax-widget__result-value']}${result.isLoss ? ` ${styles['crypto-tax-widget__result-value--loss']}` : ''}`}>
                {result.isLoss ? '−' : '+'}{result.symbol}{fmt(result.profit)}
              </span>
            </div>
            <div className={styles['crypto-tax-widget__result-item']}>
              <span className={styles['crypto-tax-widget__result-label']}>{t('taxRate', locale)}</span>
              <span className={styles['crypto-tax-widget__result-value']}>{result.rate.toFixed(1)}%</span>
            </div>
            <div className={styles['crypto-tax-widget__result-item']}>
              <span className={styles['crypto-tax-widget__result-label']}>{t('taxOwed', locale)}</span>
              <span className={styles['crypto-tax-widget__result-value']}>{result.symbol}{fmt(result.tax)}</span>
            </div>
            <div className={styles['crypto-tax-widget__result-item']}>
              <span className={styles['crypto-tax-widget__result-label']}>{t('netProfit', locale)}</span>
              <span className={styles['crypto-tax-widget__result-value']}>{result.symbol}{fmt(result.net)}</span>
            </div>
          </div>
          {result.note && <div className={styles['crypto-tax-widget__note']}>{result.note}</div>}
          <p className={styles['crypto-tax-widget__disclaimer']}>{t('disclaimer', locale)}</p>
        </div>
      )}
    </div>
  );
}
