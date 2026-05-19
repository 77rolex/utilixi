'use client';

import { useState } from 'react';
import styles from './CompoundInterestCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  principal: string; rate: string; years: string; frequency: string; monthlyAdd: string;
  freqAnnual: string; freqQuarterly: string; freqMonthly: string; freqDaily: string;
  calculate: string; reset: string;
  finalAmount: string; totalDeposited: string; totalInterest: string;
  yearTableTitle: string; colYear: string; colBalance: string; colDeposited: string; colInterest: string;
  errFields: string; errPositive: string;
}> = {
  en: {
    principal: 'Initial amount', rate: 'Annual interest rate (%)', years: 'Investment period (years)',
    frequency: 'Compounding frequency', monthlyAdd: 'Monthly contribution (optional)',
    freqAnnual: 'Annually', freqQuarterly: 'Quarterly', freqMonthly: 'Monthly', freqDaily: 'Daily',
    calculate: 'Calculate', reset: 'Reset',
    finalAmount: 'Final amount', totalDeposited: 'Total deposited', totalInterest: 'Interest earned',
    yearTableTitle: 'Year-by-year breakdown',
    colYear: 'Year', colBalance: 'Balance', colDeposited: 'Deposited', colInterest: 'Interest',
    errFields: 'Please fill in all required fields.', errPositive: 'All values must be greater than zero.',
  },
  ru: {
    principal: 'Начальная сумма', rate: 'Годовая процентная ставка (%)', years: 'Срок вложений (лет)',
    frequency: 'Периодичность начисления', monthlyAdd: 'Ежемесячное пополнение (необязательно)',
    freqAnnual: 'Раз в год', freqQuarterly: 'Раз в квартал', freqMonthly: 'Ежемесячно', freqDaily: 'Ежедневно',
    calculate: 'Рассчитать', reset: 'Сбросить',
    finalAmount: 'Итоговая сумма', totalDeposited: 'Внесено всего', totalInterest: 'Заработано процентов',
    yearTableTitle: 'Рост по годам',
    colYear: 'Год', colBalance: 'Баланс', colDeposited: 'Внесено', colInterest: 'Проценты',
    errFields: 'Заполните все обязательные поля.', errPositive: 'Все значения должны быть больше нуля.',
  },
  uk: {
    principal: 'Початкова сума', rate: 'Річна відсоткова ставка (%)', years: 'Строк вкладень (років)',
    frequency: 'Частота нарахування', monthlyAdd: 'Щомісячне поповнення (необов\'язково)',
    freqAnnual: 'Щорічно', freqQuarterly: 'Щоквартально', freqMonthly: 'Щомісяця', freqDaily: 'Щоденно',
    calculate: 'Розрахувати', reset: 'Скинути',
    finalAmount: 'Підсумкова сума', totalDeposited: 'Внесено всього', totalInterest: 'Зароблено відсотків',
    yearTableTitle: 'Зростання по роках',
    colYear: 'Рік', colBalance: 'Баланс', colDeposited: 'Внесено', colInterest: 'Відсотки',
    errFields: 'Заповніть усі обов\'язкові поля.', errPositive: 'Усі значення мають бути більше нуля.',
  },
  fr: {
    principal: 'Montant initial', rate: 'Taux d\'intérêt annuel (%)', years: 'Durée (années)',
    frequency: 'Fréquence de capitalisation', monthlyAdd: 'Versement mensuel (facultatif)',
    freqAnnual: 'Annuelle', freqQuarterly: 'Trimestrielle', freqMonthly: 'Mensuelle', freqDaily: 'Quotidienne',
    calculate: 'Calculer', reset: 'Réinitialiser',
    finalAmount: 'Montant final', totalDeposited: 'Total versé', totalInterest: 'Intérêts gagnés',
    yearTableTitle: 'Évolution annuelle',
    colYear: 'Année', colBalance: 'Solde', colDeposited: 'Versé', colInterest: 'Intérêts',
    errFields: 'Veuillez remplir tous les champs.', errPositive: 'Toutes les valeurs doivent être positives.',
  },
  lt: {
    principal: 'Pradinė suma', rate: 'Metinė palūkanų norma (%)', years: 'Investavimo laikotarpis (metai)',
    frequency: 'Kaupimo dažnumas', monthlyAdd: 'Mėnesio įnašas (neprivaloma)',
    freqAnnual: 'Kasmet', freqQuarterly: 'Kas ketvirtį', freqMonthly: 'Kas mėnesį', freqDaily: 'Kasdien',
    calculate: 'Skaičiuoti', reset: 'Išvalyti',
    finalAmount: 'Galutinė suma', totalDeposited: 'Iš viso įnešta', totalInterest: 'Uždirbtos palūkanos',
    yearTableTitle: 'Metų suvestinė',
    colYear: 'Metai', colBalance: 'Balansas', colDeposited: 'Įnešta', colInterest: 'Palūkanos',
    errFields: 'Užpildykite visus privalomus laukus.', errPositive: 'Visos reikšmės turi būti teigiamos.',
  },
};

type YearRow = { year: number; balance: number; deposited: number; interest: number };

function calcYears(
  principal: number, annualRate: number, years: number,
  freq: number, monthlyContrib: number,
): YearRow[] {
  const rows: YearRow[] = [];
  const ratePerPeriod = annualRate / freq;
  const contribPerPeriod = monthlyContrib * 12 / freq;
  let balance = principal;
  let deposited = principal;

  for (let y = 1; y <= years; y++) {
    for (let p = 0; p < freq; p++) {
      balance = balance * (1 + ratePerPeriod) + contribPerPeriod;
      deposited += contribPerPeriod;
    }
    rows.push({ year: y, balance, deposited, interest: balance - deposited });
  }
  return rows;
}

function fmt(n: number): string {
  return n.toLocaleString('en', { maximumFractionDigits: 0 });
}

export default function CompoundInterestCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('10');
  const [freq, setFreq] = useState<'1' | '4' | '12' | '365'>('12');
  const [monthly, setMonthly] = useState('');
  const [rows, setRows] = useState<YearRow[] | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const p = parseFloat(principal.replace(',', '.'));
    const r = parseFloat(rate.replace(',', '.')) / 100;
    const y = parseInt(years);
    const m = monthly !== '' ? parseFloat(monthly.replace(',', '.')) : 0;
    if (isNaN(p) || isNaN(r) || isNaN(y)) { setError(t.errFields); return; }
    if (p <= 0 || r < 0 || y <= 0) { setError(t.errPositive); return; }
    setError('');
    setRows(calcYears(p, r, Math.min(y, 50), Number(freq), m));
  };

  const reset = () => { setPrincipal('10000'); setRate('8'); setYears('10'); setMonthly(''); setRows(null); setError(''); };

  const last = rows?.[rows.length - 1];

  const freqOptions: { value: '1' | '4' | '12' | '365'; label: string }[] = [
    { value: '1', label: t.freqAnnual },
    { value: '4', label: t.freqQuarterly },
    { value: '12', label: t.freqMonthly },
    { value: '365', label: t.freqDaily },
  ];

  const field = (label: string, value: string, setter: (v: string) => void, placeholder = '') => (
    <div className={styles['ci-calc__field']}>
      <label className={styles['ci-calc__label']}>{label}</label>
      <input type="number" className={styles['ci-calc__input']} value={value}
        onChange={(e) => { setter(e.target.value); setError(''); setRows(null); }}
        onKeyDown={(e) => e.key === 'Enter' && calculate()}
        placeholder={placeholder} min="0" />
    </div>
  );

  return (
    <div className={styles['ci-calc']}>
      <div className={styles['ci-calc__form']}>
        {field(t.principal, principal, setPrincipal, '10000')}
        {field(t.rate, rate, setRate, '8')}
        {field(t.years, years, setYears, '10')}

        <div className={styles['ci-calc__field']}>
          <label className={styles['ci-calc__label']}>{t.frequency}</label>
          <div className={styles['ci-calc__freq-btns']}>
            {freqOptions.map(({ value, label }) => (
              <button key={value} type="button"
                className={`${styles['ci-calc__freq-btn']} ${freq === value ? styles['ci-calc__freq-btn--active'] : ''}`}
                onClick={() => { setFreq(value); setRows(null); }}
              >{label}</button>
            ))}
          </div>
        </div>

        {field(t.monthlyAdd, monthly, setMonthly, '100')}

        {error && <p className={styles['ci-calc__error']}>{error}</p>}

        <div className={styles['ci-calc__actions']}>
          <button type="button" className={styles['ci-calc__btn']} onClick={calculate}>{t.calculate}</button>
          <button type="button" className={styles['ci-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {last && (
        <div className={styles['ci-calc__result']}>
          <div className={styles['ci-calc__summary']}>
            <div className={styles['ci-calc__summary-main']}>
              <span className={styles['ci-calc__summary-label']}>{t.finalAmount}</span>
              <span className={styles['ci-calc__summary-value']}>{fmt(last.balance)}</span>
            </div>
            <div className={styles['ci-calc__summary-metrics']}>
              <div className={styles['ci-calc__summary-metric']}>
                <span>{t.totalDeposited}</span><strong>{fmt(last.deposited)}</strong>
              </div>
              <div className={styles['ci-calc__summary-metric']}>
                <span>{t.totalInterest}</span>
                <strong className={styles['ci-calc__green']}>{fmt(last.interest)}</strong>
              </div>
            </div>
            <div className={styles['ci-calc__bar']}>
              <div className={styles['ci-calc__bar-dep']}
                style={{ width: `${Math.min(100, (last.deposited / last.balance) * 100).toFixed(1)}%` }} />
              <div className={styles['ci-calc__bar-int']} style={{ flex: 1 }} />
            </div>
          </div>

          <h3 className={styles['ci-calc__table-title']}>{t.yearTableTitle}</h3>
          <div className={styles['ci-calc__table-wrap']}>
            <table className={styles['ci-calc__table']}>
              <thead>
                <tr>
                  <th>{t.colYear}</th>
                  <th>{t.colBalance}</th>
                  <th>{t.colDeposited}</th>
                  <th>{t.colInterest}</th>
                </tr>
              </thead>
              <tbody>
                {rows!.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td>{fmt(r.balance)}</td>
                    <td>{fmt(r.deposited)}</td>
                    <td className={styles['ci-calc__green']}>{fmt(r.interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
