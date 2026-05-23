'use client';

import { useState } from 'react';
import styles from './PercentageCalculator.module.scss';

const L: Record<string, Record<string, string>> = {
  mode1:    { en: 'X% of Y', ru: 'X% от Y', uk: 'X% від Y', fr: 'X% de Y', lt: 'X% iš Y' },
  mode2:    { en: 'X is what % of Y', ru: 'X — это сколько % от Y', uk: 'X — це скільки % від Y', fr: 'X représente quel % de Y', lt: 'X — koks % nuo Y' },
  mode3:    { en: '% Change', ru: 'Изменение в %', uk: 'Зміна у %', fr: 'Variation en %', lt: 'Pokytis %' },
  mode4:    { en: 'X + Y%', ru: 'X + Y%', uk: 'X + Y%', fr: 'X + Y%', lt: 'X + Y%' },
  mode5:    { en: 'X − Y%', ru: 'X − Y%', uk: 'X − Y%', fr: 'X − Y%', lt: 'X − Y%' },
  pct:      { en: 'Percentage (%)', ru: 'Процент (%)', uk: 'Відсоток (%)', fr: 'Pourcentage (%)', lt: 'Procentas (%)' },
  value:    { en: 'Value', ru: 'Значение', uk: 'Значення', fr: 'Valeur', lt: 'Reikšmė' },
  valueX:   { en: 'Value (X)', ru: 'Значение (X)', uk: 'Значення (X)', fr: 'Valeur (X)', lt: 'Reikšmė (X)' },
  valueY:   { en: 'Value (Y)', ru: 'Значение (Y)', uk: 'Значення (Y)', fr: 'Valeur (Y)', lt: 'Reikšmė (Y)' },
  from:     { en: 'From', ru: 'Начальное', uk: 'Початкове', fr: 'De', lt: 'Nuo' },
  to:       { en: 'To', ru: 'Конечное', uk: 'Кінцеве', fr: 'À', lt: 'Iki' },
  result:   { en: 'Result', ru: 'Результат', uk: 'Результат', fr: 'Résultat', lt: 'Rezultatas' },
  calculate:{ en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  increase: { en: 'Increase', ru: 'Рост', uk: 'Зростання', fr: 'Augmentation', lt: 'Padidėjimas' },
  decrease: { en: 'Decrease', ru: 'Снижение', uk: 'Зниження', fr: 'Diminution', lt: 'Sumažėjimas' },
  noChange: { en: 'No change', ru: 'Без изменений', uk: 'Без змін', fr: 'Pas de changement', lt: 'Be pokyčių' },
  formula:  { en: 'Formula', ru: 'Формула', uk: 'Формула', fr: 'Formule', lt: 'Formulė' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Mode = '1' | '2' | '3' | '4' | '5';

const MODES: Mode[] = ['1', '2', '3', '4', '5'];
const MODE_KEYS: Record<Mode, string> = { '1': 'mode1', '2': 'mode2', '3': 'mode3', '4': 'mode4', '5': 'mode5' };

type Result = { value: number; formula: string; label: string };

function fmt(n: number): string {
  const rounded = Math.round(n * 10000) / 10000;
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

export default function PercentageCalculator({ locale }: { locale: string }) {
  const [mode, setMode] = useState<Mode>('1');
  const [a, setA] = useState('25');
  const [b, setB] = useState('200');
  const [c, setC] = useState('100');
  const [d, setD] = useState('150');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const na = parseFloat(a) || 0;
    const nb = parseFloat(b) || 0;
    const nc = parseFloat(c) || 0;
    const nd = parseFloat(d) || 0;
    let res: Result;
    if (mode === '1') {
      const val = (na / 100) * nb;
      res = { value: val, formula: `${na}% × ${nb} = ${fmt(val)}`, label: t('result', locale) };
    } else if (mode === '2') {
      const val = nb !== 0 ? (na / nb) * 100 : 0;
      res = { value: val, formula: `(${na} / ${nb}) × 100 = ${fmt(val)}%`, label: t('result', locale) };
    } else if (mode === '3') {
      const val = nc !== 0 ? ((nd - nc) / nc) * 100 : 0;
      const changeLabel = val > 0 ? t('increase', locale) : val < 0 ? t('decrease', locale) : t('noChange', locale);
      res = { value: val, formula: `((${nd} − ${nc}) / ${nc}) × 100 = ${fmt(val)}%`, label: changeLabel };
    } else if (mode === '4') {
      const val = na + (na * nb / 100);
      res = { value: val, formula: `${na} + (${na} × ${nb}%) = ${fmt(val)}`, label: t('result', locale) };
    } else {
      const val = na - (na * nb / 100);
      res = { value: val, formula: `${na} − (${na} × ${nb}%) = ${fmt(val)}`, label: t('result', locale) };
    }
    setResult(res);
  }

  const showAB = mode === '1' || mode === '2' || mode === '4' || mode === '5';
  const showCD = mode === '3';

  return (
    <div className={styles['pct-calc']}>
      <div className={styles['pct-calc__modes']}>
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles['pct-calc__mode-btn']}${mode === m ? ` ${styles['pct-calc__mode-btn--active']}` : ''}`}
            onClick={() => { setMode(m); setResult(null); }}
          >
            {t(MODE_KEYS[m], locale)}
          </button>
        ))}
      </div>

      <div className={styles['pct-calc__form']}>
        {showAB && mode === '1' && (
          <>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('pct', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} step="0.01" />
            </div>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('value', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} step="0.01" />
            </div>
          </>
        )}
        {showAB && mode === '2' && (
          <>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('valueX', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} step="0.01" />
            </div>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('valueY', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} step="0.01" />
            </div>
          </>
        )}
        {(mode === '4' || mode === '5') && (
          <>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('value', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} step="0.01" />
            </div>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('pct', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} step="0.01" />
            </div>
          </>
        )}
        {showCD && (
          <>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('from', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={c} onChange={(e) => { setC(e.target.value); setResult(null); }} step="0.01" />
            </div>
            <div className={styles['pct-calc__field']}>
              <label className={styles['pct-calc__label']}>{t('to', locale)}</label>
              <input type="number" className={styles['pct-calc__input']} value={d} onChange={(e) => { setD(e.target.value); setResult(null); }} step="0.01" />
            </div>
          </>
        )}
        <button type="button" className={styles['pct-calc__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['pct-calc__result']}>
          <div className={styles['pct-calc__result-value']}>{fmt(result.value)}{mode === '2' || mode === '3' ? '%' : ''}</div>
          <div className={styles['pct-calc__result-label']}>{result.label}</div>
          <div className={styles['pct-calc__result-formula']}>
            <span className={styles['pct-calc__result-formula-label']}>{t('formula', locale)}:</span> {result.formula}
          </div>
        </div>
      )}
    </div>
  );
}
