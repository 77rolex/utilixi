'use client';

import { useState } from 'react';
import styles from './TipCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  bill: string; tipPercent: string; people: string;
  calculate: string; reset: string;
  tipAmount: string; totalBill: string; perPerson: string; tipPerPerson: string;
  quickTip: string;
  errBill: string; errPositive: string;
}> = {
  en: {
    bill: 'Bill amount', tipPercent: 'Tip (%)', people: 'Split between (people)',
    calculate: 'Calculate', reset: 'Reset',
    tipAmount: 'Tip amount', totalBill: 'Total bill', perPerson: 'Per person', tipPerPerson: 'Tip per person',
    quickTip: 'Quick tip',
    errBill: 'Enter the bill amount.', errPositive: 'Values must be greater than zero.',
  },
  ru: {
    bill: 'Сумма счёта', tipPercent: 'Чаевые (%)', people: 'Разделить на (человек)',
    calculate: 'Рассчитать', reset: 'Сбросить',
    tipAmount: 'Сумма чаевых', totalBill: 'Итоговый счёт', perPerson: 'На человека', tipPerPerson: 'Чаевые на человека',
    quickTip: 'Быстрый выбор',
    errBill: 'Введите сумму счёта.', errPositive: 'Значения должны быть больше нуля.',
  },
  uk: {
    bill: 'Сума рахунку', tipPercent: 'Чайові (%)', people: 'Розділити на (осіб)',
    calculate: 'Розрахувати', reset: 'Скинути',
    tipAmount: 'Сума чайових', totalBill: 'Підсумковий рахунок', perPerson: 'На особу', tipPerPerson: 'Чайові на особу',
    quickTip: 'Швидкий вибір',
    errBill: 'Введіть суму рахунку.', errPositive: 'Значення мають бути більше нуля.',
  },
  fr: {
    bill: 'Montant de l\'addition', tipPercent: 'Pourboire (%)', people: 'Partager entre (personnes)',
    calculate: 'Calculer', reset: 'Réinitialiser',
    tipAmount: 'Montant du pourboire', totalBill: 'Total à payer', perPerson: 'Par personne', tipPerPerson: 'Pourboire par personne',
    quickTip: 'Sélection rapide',
    errBill: 'Entrez le montant de l\'addition.', errPositive: 'Les valeurs doivent être positives.',
  },
  lt: {
    bill: 'Sąskaitos suma', tipPercent: 'Arbatpinigiai (%)', people: 'Padalinti tarp (žmonių)',
    calculate: 'Skaičiuoti', reset: 'Išvalyti',
    tipAmount: 'Arbatpinigių suma', totalBill: 'Bendra suma', perPerson: 'Vienam asmeniui', tipPerPerson: 'Arbatpinigiai vienam',
    quickTip: 'Greitas pasirinkimas',
    errBill: 'Įveskite sąskaitos sumą.', errPositive: 'Reikšmės turi būti teigiamos.',
  },
};

const QUICK_TIPS = [10, 15, 18, 20, 25];

type Result = { tipAmount: number; total: number; perPerson: number; tipPerPerson: number };

export default function TipCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState('15');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const calculate = (overrideTip?: string) => {
    const b = parseFloat((bill || '0').replace(',', '.'));
    const tp = parseFloat((overrideTip ?? tipPct).replace(',', '.'));
    const n = parseInt(people);
    if (!bill || isNaN(b)) { setError(t.errBill); return; }
    if (b <= 0 || tp < 0 || n <= 0) { setError(t.errPositive); return; }
    setError('');
    const tipAmount = b * tp / 100;
    const total = b + tipAmount;
    setResult({ tipAmount, total, perPerson: total / n, tipPerPerson: tipAmount / n });
  };

  const reset = () => { setBill(''); setTipPct('15'); setPeople('1'); setResult(null); setError(''); };

  const fmt = (n: number) => n.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={styles['tip-calc']}>
      <div className={styles['tip-calc__form']}>
        <div className={styles['tip-calc__field']}>
          <label className={styles['tip-calc__label']}>{t.bill}</label>
          <input type="number" className={styles['tip-calc__input']} value={bill}
            onChange={e => { setBill(e.target.value); setError(''); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            placeholder="50.00" min="0" />
        </div>

        <div className={styles['tip-calc__field']}>
          <label className={styles['tip-calc__label']}>{t.tipPercent}</label>
          <div className={styles['tip-calc__quick-label']}>{t.quickTip}</div>
          <div className={styles['tip-calc__quick-btns']}>
            {QUICK_TIPS.map(pct => (
              <button key={pct} type="button"
                className={`${styles['tip-calc__quick-btn']} ${tipPct === String(pct) ? styles['tip-calc__quick-btn--active'] : ''}`}
                onClick={() => { setTipPct(String(pct)); setResult(null); setError(''); }}
              >{pct}%</button>
            ))}
          </div>
          <input type="number" className={styles['tip-calc__input']} value={tipPct}
            onChange={e => { setTipPct(e.target.value); setError(''); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            placeholder="15" min="0" max="100" />
        </div>

        <div className={styles['tip-calc__field']}>
          <label className={styles['tip-calc__label']}>{t.people}</label>
          <input type="number" className={styles['tip-calc__input']} value={people}
            onChange={e => { setPeople(e.target.value); setError(''); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            placeholder="1" min="1" max="100" />
        </div>

        {error && <p className={styles['tip-calc__error']}>{error}</p>}

        <div className={styles['tip-calc__actions']}>
          <button type="button" className={styles['tip-calc__btn']} onClick={() => calculate()}>{t.calculate}</button>
          <button type="button" className={styles['tip-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {result && (
        <div className={styles['tip-calc__result']}>
          <div className={styles['tip-calc__metrics']}>
            <div className={styles['tip-calc__metric']}>
              <span className={styles['tip-calc__metric-label']}>{t.tipAmount}</span>
              <span className={styles['tip-calc__metric-value']}>{fmt(result.tipAmount)}</span>
            </div>
            <div className={`${styles['tip-calc__metric']} ${styles['tip-calc__metric--highlight']}`}>
              <span className={styles['tip-calc__metric-label']}>{t.totalBill}</span>
              <span className={styles['tip-calc__metric-value']}>{fmt(result.total)}</span>
            </div>
            {parseInt(people) > 1 && (
              <>
                <div className={`${styles['tip-calc__metric']} ${styles['tip-calc__metric--highlight']}`}>
                  <span className={styles['tip-calc__metric-label']}>{t.perPerson}</span>
                  <span className={styles['tip-calc__metric-value']}>{fmt(result.perPerson)}</span>
                </div>
                <div className={styles['tip-calc__metric']}>
                  <span className={styles['tip-calc__metric-label']}>{t.tipPerPerson}</span>
                  <span className={styles['tip-calc__metric-value']}>{fmt(result.tipPerPerson)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
