'use client';
import { useState } from 'react';
import styles from './LoanPayoffCalculator.module.scss';

const T: Record<string, {
  balance: string; rate: string; payment: string; extra: string;
  calculate: string;
  standard: string; withExtra: string;
  months: string; totalInterest: string; totalPaid: string;
  timeSaved: string; interestSaved: string;
  mos: string; yrs: string;
  error: string; errorExtra: string; curr: string;
}> = {
  en: { balance: 'Loan Balance (₴)', rate: 'Annual Interest Rate (%)', payment: 'Monthly Payment (₴)', extra: 'Extra Monthly Payment (₴)', calculate: 'Calculate', standard: 'Standard Plan', withExtra: 'With Extra Payment', months: 'Months to Pay Off', totalInterest: 'Total Interest', totalPaid: 'Total Paid', timeSaved: 'Time Saved', interestSaved: 'Interest Saved', mos: 'mo.', yrs: 'yr.', curr: '₴', error: 'Please enter valid positive numbers. Payment must exceed monthly interest.', errorExtra: 'Extra payment must be 0 or positive.' },
  ru: { balance: 'Остаток кредита (₴)', rate: 'Годовая ставка (%)', payment: 'Ежемесячный платёж (₴)', extra: 'Доп. платёж в месяц (₴)', calculate: 'Рассчитать', standard: 'Стандартный план', withExtra: 'С доп. платежом', months: 'Месяцев до погашения', totalInterest: 'Итого проценты', totalPaid: 'Итого выплачено', timeSaved: 'Сэкономлено времени', interestSaved: 'Сэкономлено процентов', mos: 'мес.', yrs: 'лет', curr: '₴', error: 'Введите корректные числа. Платёж должен превышать ежемесячные проценты.', errorExtra: 'Доп. платёж должен быть ≥ 0.' },
  uk: { balance: 'Залишок кредиту (₴)', rate: 'Річна ставка (%)', payment: 'Щомісячний платіж (₴)', extra: 'Доп. платіж на місяць (₴)', calculate: 'Розрахувати', standard: 'Стандартний план', withExtra: 'З доп. платежем', months: 'Місяців до погашення', totalInterest: 'Всього відсотків', totalPaid: 'Всього виплачено', timeSaved: 'Зекономлено часу', interestSaved: 'Зекономлено відсотків', mos: 'міс.', yrs: 'рок.', curr: '₴', error: 'Введіть коректні числа. Платіж має перевищувати щомісячні відсотки.', errorExtra: 'Доп. платіж має бути ≥ 0.' },
  fr: { balance: 'Solde du prêt (€)', rate: 'Taux annuel (%)', payment: 'Mensualité (€)', extra: 'Remboursement supplémentaire (€)', calculate: 'Calculer', standard: 'Plan standard', withExtra: 'Avec paiement extra', months: 'Mois restants', totalInterest: 'Total intérêts', totalPaid: 'Total payé', timeSaved: 'Temps gagné', interestSaved: 'Intérêts économisés', mos: 'mois', yrs: 'ans', curr: '€', error: 'Veuillez entrer des nombres valides. La mensualité doit dépasser les intérêts mensuels.', errorExtra: 'Le paiement extra doit être ≥ 0.' },
  lt: { balance: 'Paskolos likutis (₴)', rate: 'Metinė palūkanų norma (%)', payment: 'Mėnesinė įmoka (₴)', extra: 'Papildoma mėnesinė įmoka (₴)', calculate: 'Skaičiuoti', standard: 'Standartinis planas', withExtra: 'Su papildoma įmoka', months: 'Mėnesiai iki grąžinimo', totalInterest: 'Iš viso palūkanų', totalPaid: 'Iš viso sumokėta', timeSaved: 'Sutaupytas laikas', interestSaved: 'Sutaupytos palūkanos', mos: 'mėn.', yrs: 'm.', curr: '₴', error: 'Įveskite tinkamus skaičius. Įmoka turi viršyti mėnesines palūkanas.', errorExtra: 'Papildoma įmoka turi būti ≥ 0.' },
};

interface Plan { months: number; interest: number; total: number }

function calcPlan(balance: number, monthlyRate: number, payment: number): Plan | null {
  if (monthlyRate > 0 && payment <= balance * monthlyRate) return null;
  let remaining = balance; let interest = 0; let months = 0;
  while (remaining > 0.01 && months < 1200) {
    const int = remaining * monthlyRate;
    interest += int;
    const principal = Math.min(payment - int, remaining);
    remaining -= principal;
    months++;
  }
  return { months, interest, total: balance + interest };
}

function fmtPeriod(months: number, mos: string, yrs: string) {
  if (months < 12) return `${months} ${mos}`;
  const y = Math.floor(months / 12); const m = months % 12;
  return m > 0 ? `${y} ${yrs} ${m} ${mos}` : `${y} ${yrs}`;
}

export default function LoanPayoffCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [balance, setBalance] = useState('100000');
  const [rate, setRate] = useState('7');
  const [payment, setPayment] = useState('1000');
  const [extra, setExtra] = useState('200');
  const [result, setResult] = useState<{ std: Plan; ext: Plan } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const b = parseFloat(balance); const r = parseFloat(rate) / 100 / 12;
    const p = parseFloat(payment); const ex = parseFloat(extra) || 0;
    if (!b || b <= 0 || isNaN(r) || r < 0 || !p || p <= 0) { setError(t.error); return; }
    if (ex < 0) { setError(t.errorExtra); return; }
    const std = calcPlan(b, r, p);
    if (!std) { setError(t.error); return; }
    const ext = calcPlan(b, r, p + ex);
    if (!ext) { setError(t.error); return; }
    setResult({ std, ext });
  }

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className={styles.widget}>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.balance}</label>
        <input type="number" min="0" step="100" className={styles.widget__input} value={balance} onChange={e => setBalance(e.target.value)} />
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.rate}</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="0" step="0.1" className={styles.widget__input} value={rate} onChange={e => setRate(e.target.value)} />
          <span className={styles.widget__suffix}>%</span>
        </div>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.payment}</label>
        <input type="number" min="0" step="10" className={styles.widget__input} value={payment} onChange={e => setPayment(e.target.value)} />
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.extra}</label>
        <input type="number" min="0" step="10" className={styles.widget__input} value={extra} onChange={e => setExtra(e.target.value)} />
      </div>
      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles.widget__comparison}>
            <div className={styles['widget__col']}>
              <div className={styles['widget__col-title']}>{t.standard}</div>
              <div className={styles['widget__col-row']}><span>{t.months}</span><span>{fmtPeriod(result.std.months, t.mos, t.yrs)}</span></div>
              <div className={styles['widget__col-row']}><span>{t.totalInterest}</span><span>{t.curr}{fmt(result.std.interest)}</span></div>
              <div className={styles['widget__col-row']}><span>{t.totalPaid}</span><span>{t.curr}{fmt(result.std.total)}</span></div>
            </div>
            <div className={`${styles['widget__col']} ${styles['widget__col--extra']}`}>
              <div className={styles['widget__col-title']}>{t.withExtra}</div>
              <div className={styles['widget__col-row']}><span>{t.months}</span><span>{fmtPeriod(result.ext.months, t.mos, t.yrs)}</span></div>
              <div className={styles['widget__col-row']}><span>{t.totalInterest}</span><span>{t.curr}{fmt(result.ext.interest)}</span></div>
              <div className={styles['widget__col-row']}><span>{t.totalPaid}</span><span>{t.curr}{fmt(result.ext.total)}</span></div>
            </div>
          </div>
          <div className={styles['widget__savings-banner']}>
            <div className={styles['widget__savings-item']}>
              <div className={styles['widget__savings-label']}>{t.timeSaved}</div>
              <div className={styles['widget__savings-value']}>{fmtPeriod(result.std.months - result.ext.months, t.mos, t.yrs)}</div>
            </div>
            <div className={styles['widget__savings-item']}>
              <div className={styles['widget__savings-label']}>{t.interestSaved}</div>
              <div className={styles['widget__savings-value']}>{t.curr}{fmt(result.std.interest - result.ext.interest)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
