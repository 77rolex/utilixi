'use client';
import { useState } from 'react';
import styles from './InflationCalculator.module.scss';

const T: Record<string, {
  modeFuture: string; modePast: string;
  amount: string; rate: string; years: string;
  calculate: string;
  futureValue: string; purchasingPower: string;
  totalIncrease: string; yearlyBreakdown: string;
  yr: string; value: string;
  error: string; curr: string;
}> = {
  en: { modeFuture: 'Future Value', modePast: 'Past Purchasing Power', amount: 'Amount (₴)', rate: 'Annual Inflation Rate (%)', years: 'Number of Years', calculate: 'Calculate', futureValue: 'Future Value', purchasingPower: 'Equivalent Past Value', totalIncrease: 'Total Increase', yearlyBreakdown: 'Year-by-Year Breakdown', yr: 'Year', value: 'Value', curr: '₴', error: 'Please enter valid positive numbers.' },
  ru: { modeFuture: 'Будущая стоимость', modePast: 'Покупательная способность', amount: 'Сумма (₴)', rate: 'Годовая инфляция (%)', years: 'Количество лет', calculate: 'Рассчитать', futureValue: 'Будущая стоимость', purchasingPower: 'Эквивалент прошлой стоимости', totalIncrease: 'Общий рост', yearlyBreakdown: 'Разбивка по годам', yr: 'Год', value: 'Стоимость', curr: '₴', error: 'Введите корректные положительные числа.' },
  uk: { modeFuture: 'Майбутня вартість', modePast: 'Купівельна спроможність', amount: 'Сума (₴)', rate: 'Річна інфляція (%)', years: 'Кількість років', calculate: 'Розрахувати', futureValue: 'Майбутня вартість', purchasingPower: 'Еквівалент минулої вартості', totalIncrease: 'Загальне зростання', yearlyBreakdown: 'Розбивка за роками', yr: 'Рік', value: 'Вартість', curr: '₴', error: 'Введіть коректні додатні числа.' },
  fr: { modeFuture: 'Valeur future', modePast: 'Pouvoir d\'achat passé', amount: 'Montant (€)', rate: 'Taux d\'inflation annuel (%)', years: 'Nombre d\'années', calculate: 'Calculer', futureValue: 'Valeur future', purchasingPower: 'Valeur équivalente passée', totalIncrease: 'Augmentation totale', yearlyBreakdown: 'Évolution annuelle', yr: 'Année', value: 'Valeur', curr: '€', error: 'Veuillez entrer des nombres positifs valides.' },
  lt: { modeFuture: 'Būsimoji vertė', modePast: 'Perkamoji galia praeityje', amount: 'Suma (₴)', rate: 'Metinė infliacijos norma (%)', years: 'Metų skaičius', calculate: 'Skaičiuoti', futureValue: 'Būsimoji vertė', purchasingPower: 'Praeities ekvivalentas', totalIncrease: 'Bendras augimas', yearlyBreakdown: 'Metinis pokytis', yr: 'Metai', value: 'Vertė', curr: '₴', error: 'Įveskite teigiamus skaičius.' },
};

type Mode = 'future' | 'past';

export default function InflationCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [mode, setMode] = useState<Mode>('future');
  const [amount, setAmount] = useState('1000');
  const [rate, setRate] = useState('3');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<{ end: number; change: number; pct: number; rows: { yr: number; val: number }[] } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const a = parseFloat(amount); const r = parseFloat(rate) / 100; const y = parseInt(years);
    if (!a || a <= 0 || isNaN(r) || r <= 0 || !y || y < 1) { setError(t.error); return; }
    const rows: { yr: number; val: number }[] = [];
    let val = a;
    if (mode === 'future') {
      for (let i = 1; i <= Math.min(y, 50); i++) {
        val = a * Math.pow(1 + r, i);
        rows.push({ yr: i, val });
      }
      const end = a * Math.pow(1 + r, y);
      setResult({ end, change: end - a, pct: ((end - a) / a) * 100, rows });
    } else {
      for (let i = 1; i <= Math.min(y, 50); i++) {
        val = a / Math.pow(1 + r, i);
        rows.push({ yr: i, val });
      }
      const end = a / Math.pow(1 + r, y);
      setResult({ end, change: a - end, pct: ((a - end) / a) * 100, rows });
    }
  }

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={styles.widget}>
      <div className={styles['widget__mode-row']}>
        <button type="button" className={`${styles['widget__mode-btn']}${mode === 'future' ? ` ${styles['widget__mode-btn--active']}` : ''}`} onClick={() => { setMode('future'); setResult(null); }}>{t.modeFuture}</button>
        <button type="button" className={`${styles['widget__mode-btn']}${mode === 'past' ? ` ${styles['widget__mode-btn--active']}` : ''}`} onClick={() => { setMode('past'); setResult(null); }}>{t.modePast}</button>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.amount}</label>
        <input type="number" min="0" step="1" className={styles.widget__input} value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.rate}</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="0" step="0.1" className={styles.widget__input} value={rate} onChange={e => setRate(e.target.value)} />
          <span className={styles.widget__suffix}>%</span>
        </div>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.years}</label>
        <input type="number" min="1" max="100" className={styles.widget__input} value={years} onChange={e => setYears(e.target.value)} />
      </div>
      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles.widget__grid}>
            <div className={`${styles['widget__result-card']} ${styles['widget__result-card--highlight']}`}>
              <div className={styles['widget__result-label']}>{mode === 'future' ? t.futureValue : t.purchasingPower}</div>
              <div className={styles['widget__result-value']}>{t.curr}{fmt(result.end)}</div>
            </div>
            <div className={styles['widget__result-card']}>
              <div className={styles['widget__result-label']}>{t.totalIncrease}</div>
              <div className={styles['widget__result-value']}>{mode === 'future' ? '+' : '-'}{t.curr}{fmt(result.change)}</div>
              <div className={styles['widget__result-unit']}>{result.pct.toFixed(1)}%</div>
            </div>
          </div>
          <div className={styles.widget__breakdown}>
            <div className={styles['widget__breakdown-header']}>
              <span>{t.yr}</span><span>{t.value}</span>
            </div>
            {result.rows.map(row => (
              <div key={row.yr} className={styles['widget__breakdown-row']}>
                <span>{row.yr}</span>
                <span>{t.curr}{fmt(row.val)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
