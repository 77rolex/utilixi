'use client';

import { useState } from 'react';
import styles from './MarginCalculator.module.scss';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'PLN', symbol: 'zł' },
  { code: 'UAH', symbol: '₴' },
  { code: 'RUB', symbol: '₽' },
];

const L: Record<string, Record<string, string>> = {
  modeCalc:    { en: 'Calculate from prices',    ru: 'Расчёт по ценам',          uk: 'Розрахунок за цінами',         fr: 'Calculer depuis les prix',     lt: 'Skaičiuoti iš kainų'         },
  modeTarget:  { en: 'Find selling price',        ru: 'Найти цену продажи',        uk: 'Знайти ціну продажу',          fr: 'Trouver le prix de vente',     lt: 'Rasti pardavimo kainą'        },
  currency:    { en: 'Currency',                  ru: 'Валюта',                    uk: 'Валюта',                       fr: 'Devise',                       lt: 'Valiuta'                      },
  costPrice:   { en: 'Cost Price',                ru: 'Себестоимость',             uk: 'Собівартість',                 fr: 'Prix de revient',              lt: 'Savikaina'                    },
  sellPrice:   { en: 'Selling Price',             ru: 'Цена продажи',              uk: 'Ціна продажу',                 fr: 'Prix de vente',                lt: 'Pardavimo kaina'              },
  targetType:  { en: 'Target by',                 ru: 'Цель по',                   uk: 'Ціль за',                      fr: 'Cible par',                    lt: 'Tikslas pagal'                },
  byMargin:    { en: 'Margin %',                  ru: 'Марже %',                   uk: 'Маржею %',                     fr: 'Marge %',                      lt: 'Maržą %'                      },
  byMarkup:    { en: 'Markup %',                  ru: 'Наценке %',                 uk: 'Націнкою %',                   fr: 'Majoration %',                 lt: 'Antkainis %'                  },
  targetValue: { en: 'Target Value (%)',          ru: 'Целевое значение (%)',       uk: 'Цільове значення (%)',          fr: 'Valeur cible (%)',             lt: 'Tikslinė vertė (%)'           },
  calculate:   { en: 'Calculate',                 ru: 'Рассчитать',                uk: 'Розрахувати',                  fr: 'Calculer',                     lt: 'Skaičiuoti'                   },
  margin:      { en: 'Margin',                    ru: 'Маржа',                     uk: 'Маржа',                        fr: 'Marge',                        lt: 'Marža'                        },
  markup:      { en: 'Markup',                    ru: 'Наценка',                   uk: 'Націнка',                      fr: 'Majoration',                   lt: 'Antkainis'                    },
  profit:      { en: 'Gross Profit',              ru: 'Валовая прибыль',           uk: 'Валовий прибуток',             fr: 'Bénéfice brut',                lt: 'Bendrasis pelnas'             },
  revenue:     { en: 'Selling Price',             ru: 'Цена продажи',              uk: 'Ціна продажу',                 fr: 'Prix de vente',                lt: 'Pardavimo kaina'              },
  errNegative: { en: 'Values must be positive',   ru: 'Значения должны быть > 0',  uk: 'Значення мають бути > 0',      fr: 'Les valeurs doivent être > 0', lt: 'Vertės turi būti > 0'         },
  errMargin:   { en: 'Margin must be < 100%',     ru: 'Маржа должна быть < 100%',  uk: 'Маржа має бути < 100%',        fr: 'La marge doit être < 100 %',  lt: 'Marža turi būti < 100 %'      },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Mode = 'calc' | 'target';
type TargetType = 'margin' | 'markup';

type Result = {
  margin: number;
  markup: number;
  profit: number;
  sellPrice: number;
  symbol: string;
};

export default function MarginCalculator({ locale }: { locale: string }) {
  const [mode, setMode] = useState<Mode>('calc');
  const [currency, setCurrency] = useState('USD');
  const [costPrice, setCostPrice] = useState('100');
  const [sellPrice, setSellPrice] = useState('150');
  const [targetType, setTargetType] = useState<TargetType>('margin');
  const [targetValue, setTargetValue] = useState('30');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const sym = CURRENCIES.find(c => c.code === currency)?.symbol ?? '$';

  function calculate() {
    setError('');
    const cost = parseFloat(costPrice);

    if (!cost || cost <= 0) { setError(t('errNegative', locale)); return; }

    let sell: number;
    let profit: number;
    let margin: number;
    let markup: number;

    if (mode === 'calc') {
      sell = parseFloat(sellPrice);
      if (!sell || sell <= 0) { setError(t('errNegative', locale)); return; }
      profit = sell - cost;
      margin = (profit / sell) * 100;
      markup = (profit / cost) * 100;
    } else {
      const tv = parseFloat(targetValue);
      if (!tv || tv <= 0) { setError(t('errNegative', locale)); return; }
      if (targetType === 'margin') {
        if (tv >= 100) { setError(t('errMargin', locale)); return; }
        sell = cost / (1 - tv / 100);
        profit = sell - cost;
        margin = tv;
        markup = (profit / cost) * 100;
      } else {
        sell = cost * (1 + tv / 100);
        profit = sell - cost;
        markup = tv;
        margin = (profit / sell) * 100;
      }
    }

    setResult({
      margin: Math.round(margin * 100) / 100,
      markup: Math.round(markup * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      sellPrice: Math.round(sell * 100) / 100,
      symbol: sym,
    });
  }

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={styles['margin-widget']}>
      <div className={styles['margin-widget__form']}>

        <div className={styles['margin-widget__mode']}>
          <button
            type="button"
            className={`${styles['margin-widget__mode-btn']}${mode === 'calc' ? ` ${styles['margin-widget__mode-btn--active']}` : ''}`}
            onClick={() => { setMode('calc'); setResult(null); setError(''); }}
          >
            {t('modeCalc', locale)}
          </button>
          <button
            type="button"
            className={`${styles['margin-widget__mode-btn']}${mode === 'target' ? ` ${styles['margin-widget__mode-btn--active']}` : ''}`}
            onClick={() => { setMode('target'); setResult(null); setError(''); }}
          >
            {t('modeTarget', locale)}
          </button>
        </div>

        <div className={styles['margin-widget__row']}>
          <div className={styles['margin-widget__field']}>
            <label className={styles['margin-widget__label']}>{t('currency', locale)}</label>
            <select className={styles['margin-widget__select']} value={currency} onChange={e => setCurrency(e.target.value)}>
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
            </select>
          </div>
          <div className={styles['margin-widget__field']}>
            <label className={styles['margin-widget__label']}>{t('costPrice', locale)} ({sym})</label>
            <input
              type="number"
              className={styles['margin-widget__input']}
              value={costPrice}
              onChange={e => setCostPrice(e.target.value)}
              min="0" step="1"
            />
          </div>
        </div>

        {mode === 'calc' ? (
          <div className={styles['margin-widget__field']}>
            <label className={styles['margin-widget__label']}>{t('sellPrice', locale)} ({sym})</label>
            <input
              type="number"
              className={styles['margin-widget__input']}
              value={sellPrice}
              onChange={e => setSellPrice(e.target.value)}
              min="0" step="1"
            />
          </div>
        ) : (
          <div className={styles['margin-widget__row']}>
            <div className={styles['margin-widget__field']}>
              <label className={styles['margin-widget__label']}>{t('targetType', locale)}</label>
              <div className={styles['margin-widget__toggle']}>
                <button
                  type="button"
                  className={`${styles['margin-widget__toggle-btn']}${targetType === 'margin' ? ` ${styles['margin-widget__toggle-btn--active']}` : ''}`}
                  onClick={() => setTargetType('margin')}
                >
                  {t('byMargin', locale)}
                </button>
                <button
                  type="button"
                  className={`${styles['margin-widget__toggle-btn']}${targetType === 'markup' ? ` ${styles['margin-widget__toggle-btn--active']}` : ''}`}
                  onClick={() => setTargetType('markup')}
                >
                  {t('byMarkup', locale)}
                </button>
              </div>
            </div>
            <div className={styles['margin-widget__field']}>
              <label className={styles['margin-widget__label']}>{t('targetValue', locale)}</label>
              <input
                type="number"
                className={styles['margin-widget__input']}
                value={targetValue}
                onChange={e => setTargetValue(e.target.value)}
                min="0" max="99" step="0.1"
              />
            </div>
          </div>
        )}

        {error && <p style={{ color: '#e53e3e', fontSize: 'var(--font-size-sm)' }}>{error}</p>}

        <button type="button" className={styles['margin-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['margin-widget__results']}>
          <div className={styles['margin-widget__result-main']}>
            <span className={styles['margin-widget__result-main-label']}>{t('margin', locale)}</span>
            <span className={styles['margin-widget__result-main-value']}>{result.margin.toFixed(2)}%</span>
          </div>
          <div className={styles['margin-widget__result-grid']}>
            <div className={styles['margin-widget__result-item']}>
              <span className={styles['margin-widget__result-label']}>{t('markup', locale)}</span>
              <span className={`${styles['margin-widget__result-value']} ${styles['margin-widget__result-value--accent']}`}>
                {result.markup.toFixed(2)}%
              </span>
            </div>
            <div className={styles['margin-widget__result-item']}>
              <span className={styles['margin-widget__result-label']}>{t('profit', locale)}</span>
              <span className={styles['margin-widget__result-value']}>{result.symbol}{fmt(result.profit)}</span>
            </div>
            {mode === 'target' && (
              <div className={styles['margin-widget__result-item']}>
                <span className={styles['margin-widget__result-label']}>{t('revenue', locale)}</span>
                <span className={styles['margin-widget__result-value']}>{result.symbol}{fmt(result.sellPrice)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
