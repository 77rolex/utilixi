'use client';

import { useState } from 'react';
import styles from './DiscountCalculator.module.scss';

const L: Record<string, Record<string, string>> = {
  mode1:       { en: 'Price & Discount %', ru: 'Цена и скидка %', uk: 'Ціна і знижка %', fr: 'Prix et remise %', lt: 'Kaina ir nuolaida %' },
  mode2:       { en: 'Original & Sale Price', ru: 'Оригинальная и акционная цена', uk: 'Оригінальна та акційна ціна', fr: 'Prix original et soldé', lt: 'Pradinė ir pardavimo kaina' },
  mode3:       { en: 'Final Price After Multiple Discounts', ru: 'Финальная цена после нескольких скидок', uk: 'Фінальна ціна після кількох знижок', fr: 'Prix final après plusieurs remises', lt: 'Galutinė kaina po kelių nuolaidų' },
  origPrice:   { en: 'Original Price', ru: 'Исходная цена', uk: 'Початкова ціна', fr: 'Prix original', lt: 'Pradinė kaina' },
  discount:    { en: 'Discount (%)', ru: 'Скидка (%)', uk: 'Знижка (%)', fr: 'Remise (%)', lt: 'Nuolaida (%)' },
  salePrice:   { en: 'Sale Price', ru: 'Цена со скидкой', uk: 'Ціна зі знижкою', fr: 'Prix soldé', lt: 'Pardavimo kaina' },
  discount2:   { en: 'Second Discount (%)', ru: 'Вторая скидка (%)', uk: 'Друга знижка (%)', fr: 'Deuxième remise (%)', lt: 'Antroji nuolaida (%)' },
  discount3:   { en: 'Third Discount (%, optional)', ru: 'Третья скидка (%, необязательно)', uk: 'Третя знижка (%, необов\'язково)', fr: 'Troisième remise (%, optionnel)', lt: 'Trečioji nuolaida (%, neprivaloma)' },
  calculate:   { en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  finalPrice:  { en: 'Final Price', ru: 'Финальная цена', uk: 'Фінальна ціна', fr: 'Prix final', lt: 'Galutinė kaina' },
  savings:     { en: 'You Save', ru: 'Вы экономите', uk: 'Ви економите', fr: 'Vous économisez', lt: 'Sutaupote' },
  discountPct: { en: 'Total Discount', ru: 'Общая скидка', uk: 'Загальна знижка', fr: 'Remise totale', lt: 'Bendra nuolaida' },
  origPriceLbl:{ en: 'Original Price', ru: 'Исходная цена', uk: 'Початкова ціна', fr: 'Prix original', lt: 'Pradinė kaina' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Mode = 'pct' | 'prices' | 'multi';

export default function DiscountCalculator({ locale }: { locale: string }) {
  const [mode, setMode] = useState<Mode>('pct');

  const [origPrice, setOrigPrice] = useState('100');
  const [discountPct, setDiscountPct] = useState('20');
  const [salePrice, setSalePrice] = useState('80');
  const [d1, setD1] = useState('20');
  const [d2, setD2] = useState('10');
  const [d3, setD3] = useState('');

  type Result = { finalPrice: number; savings: number; totalPct: number; origPrice: number };
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    let orig = 0, final = 0;
    if (mode === 'pct') {
      orig = parseFloat(origPrice) || 0;
      const pct = Math.min(100, Math.max(0, parseFloat(discountPct) || 0));
      final = orig * (1 - pct / 100);
    } else if (mode === 'prices') {
      orig = parseFloat(origPrice) || 0;
      final = parseFloat(salePrice) || 0;
    } else {
      orig = parseFloat(origPrice) || 0;
      const p1 = 1 - Math.min(100, Math.max(0, parseFloat(d1) || 0)) / 100;
      const p2 = 1 - Math.min(100, Math.max(0, parseFloat(d2) || 0)) / 100;
      const p3 = d3 ? 1 - Math.min(100, Math.max(0, parseFloat(d3) || 0)) / 100 : 1;
      final = orig * p1 * p2 * p3;
    }
    const savings = orig - final;
    const totalPct = orig > 0 ? (savings / orig) * 100 : 0;
    setResult({ finalPrice: final, savings, totalPct, origPrice: orig });
  }

  return (
    <div className={styles['discount-calc']}>
      <div className={styles['discount-calc__modes']}>
        {(['pct', 'prices', 'multi'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles['discount-calc__mode-btn']}${mode === m ? ` ${styles['discount-calc__mode-btn--active']}` : ''}`}
            onClick={() => { setMode(m); setResult(null); }}
          >
            {t(m === 'pct' ? 'mode1' : m === 'prices' ? 'mode2' : 'mode3', locale)}
          </button>
        ))}
      </div>

      <div className={styles['discount-calc__form']}>
        <div className={styles['discount-calc__field']}>
          <label className={styles['discount-calc__label']}>{t('origPrice', locale)}</label>
          <input
            type="number"
            className={styles['discount-calc__input']}
            value={origPrice}
            min="0"
            step="0.01"
            onChange={(e) => { setOrigPrice(e.target.value); setResult(null); }}
          />
        </div>

        {mode === 'pct' && (
          <div className={styles['discount-calc__field']}>
            <label className={styles['discount-calc__label']}>{t('discount', locale)}</label>
            <input
              type="number"
              className={styles['discount-calc__input']}
              value={discountPct}
              min="0" max="100" step="0.1"
              onChange={(e) => { setDiscountPct(e.target.value); setResult(null); }}
            />
          </div>
        )}

        {mode === 'prices' && (
          <div className={styles['discount-calc__field']}>
            <label className={styles['discount-calc__label']}>{t('salePrice', locale)}</label>
            <input
              type="number"
              className={styles['discount-calc__input']}
              value={salePrice}
              min="0" step="0.01"
              onChange={(e) => { setSalePrice(e.target.value); setResult(null); }}
            />
          </div>
        )}

        {mode === 'multi' && (
          <>
            <div className={styles['discount-calc__field']}>
              <label className={styles['discount-calc__label']}>{t('discount', locale)}</label>
              <input type="number" className={styles['discount-calc__input']} value={d1} min="0" max="100" step="0.1" onChange={(e) => { setD1(e.target.value); setResult(null); }} />
            </div>
            <div className={styles['discount-calc__field']}>
              <label className={styles['discount-calc__label']}>{t('discount2', locale)}</label>
              <input type="number" className={styles['discount-calc__input']} value={d2} min="0" max="100" step="0.1" onChange={(e) => { setD2(e.target.value); setResult(null); }} />
            </div>
            <div className={styles['discount-calc__field']}>
              <label className={styles['discount-calc__label']}>{t('discount3', locale)}</label>
              <input type="number" className={styles['discount-calc__input']} value={d3} min="0" max="100" step="0.1" placeholder="0" onChange={(e) => { setD3(e.target.value); setResult(null); }} />
            </div>
          </>
        )}

        <button type="button" className={styles['discount-calc__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['discount-calc__result']}>
          <div className={styles['discount-calc__result-grid']}>
            <div className={styles['discount-calc__result-card']}>
              <span className={styles['discount-calc__result-value']}>{result.finalPrice.toFixed(2)}</span>
              <span className={styles['discount-calc__result-label']}>{t('finalPrice', locale)}</span>
            </div>
            <div className={`${styles['discount-calc__result-card']} ${styles['discount-calc__result-card--savings']}`}>
              <span className={styles['discount-calc__result-value']}>−{result.savings.toFixed(2)}</span>
              <span className={styles['discount-calc__result-label']}>{t('savings', locale)}</span>
            </div>
            <div className={styles['discount-calc__result-card']}>
              <span className={styles['discount-calc__result-value']}>{result.totalPct.toFixed(1)}%</span>
              <span className={styles['discount-calc__result-label']}>{t('discountPct', locale)}</span>
            </div>
            <div className={styles['discount-calc__result-card']}>
              <span className={styles['discount-calc__result-value']}>{result.origPrice.toFixed(2)}</span>
              <span className={styles['discount-calc__result-label']}>{t('origPriceLbl', locale)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
