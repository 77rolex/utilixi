'use client';

import { useState } from 'react';
import styles from './RoiCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  invested: string; returned: string; period: string; periodPlaceholder: string;
  calculate: string; reset: string;
  roi: string; profit: string; annualRoi: string; multiplier: string;
  positive: string; negative: string;
  errRequired: string; errPositive: string;
  periodLabel: string;
}> = {
  en: {
    invested: 'Amount invested', returned: 'Amount returned (final value)', period: 'Time period (years, optional)', periodPlaceholder: 'e.g. 3',
    calculate: 'Calculate', reset: 'Reset',
    roi: 'ROI', profit: 'Net profit / loss', annualRoi: 'Annualized ROI', multiplier: 'Multiplier',
    positive: 'Profitable', negative: 'Loss',
    errRequired: 'Please fill in invested and returned amounts.', errPositive: 'Amounts must be greater than zero.',
    periodLabel: 'years',
  },
  ru: {
    invested: 'Сумма инвестиций', returned: 'Итоговая стоимость', period: 'Период (лет, необязательно)', periodPlaceholder: 'например 3',
    calculate: 'Рассчитать', reset: 'Сбросить',
    roi: 'ROI', profit: 'Прибыль / убыток', annualRoi: 'Годовой ROI', multiplier: 'Мультипликатор',
    positive: 'Прибыльно', negative: 'Убыток',
    errRequired: 'Введите сумму вложений и итоговую стоимость.', errPositive: 'Суммы должны быть больше нуля.',
    periodLabel: 'лет',
  },
  uk: {
    invested: 'Сума інвестицій', returned: 'Підсумкова вартість', period: 'Період (років, необов\'язково)', periodPlaceholder: 'наприклад 3',
    calculate: 'Розрахувати', reset: 'Скинути',
    roi: 'ROI', profit: 'Прибуток / збиток', annualRoi: 'Річний ROI', multiplier: 'Мультиплікатор',
    positive: 'Прибутково', negative: 'Збиток',
    errRequired: 'Введіть суму вкладень та підсумкову вартість.', errPositive: 'Суми мають бути більше нуля.',
    periodLabel: 'років',
  },
  fr: {
    invested: 'Montant investi', returned: 'Valeur finale', period: 'Période (années, facultatif)', periodPlaceholder: 'ex. 3',
    calculate: 'Calculer', reset: 'Réinitialiser',
    roi: 'ROI', profit: 'Gain / perte nette', annualRoi: 'ROI annualisé', multiplier: 'Multiplicateur',
    positive: 'Rentable', negative: 'Perte',
    errRequired: 'Veuillez entrer le montant investi et la valeur finale.', errPositive: 'Les montants doivent être supérieurs à zéro.',
    periodLabel: 'ans',
  },
  lt: {
    invested: 'Investuota suma', returned: 'Galutinė vertė', period: 'Laikotarpis (metai, neprivaloma)', periodPlaceholder: 'pvz. 3',
    calculate: 'Skaičiuoti', reset: 'Išvalyti',
    roi: 'RI', profit: 'Grynasis pelnas / nuostolis', annualRoi: 'Metinė RI', multiplier: 'Daugiklis',
    positive: 'Pelninga', negative: 'Nuostolis',
    errRequired: 'Įveskite investuotą sumą ir galutinę vertę.', errPositive: 'Sumos turi būti didesnės už nulį.',
    periodLabel: 'metų',
  },
};

interface Result {
  roi: number;
  profit: number;
  annualRoi: number | null;
  multiplier: number;
}

export default function RoiCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [invested, setInvested] = useState('');
  const [returned, setReturned] = useState('');
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const inv = parseFloat(invested.replace(',', '.'));
    const ret = parseFloat(returned.replace(',', '.'));
    if (isNaN(inv) || isNaN(ret)) { setError(t.errRequired); return; }
    if (inv <= 0 || ret <= 0) { setError(t.errPositive); return; }
    setError('');

    const roi = ((ret - inv) / inv) * 100;
    const profit = ret - inv;
    const multiplier = ret / inv;
    const yrs = parseFloat(period);
    const annualRoi = !isNaN(yrs) && yrs > 0
      ? (Math.pow(ret / inv, 1 / yrs) - 1) * 100
      : null;

    setResult({ roi, profit, annualRoi, multiplier });
  };

  const reset = () => { setInvested(''); setReturned(''); setPeriod(''); setResult(null); setError(''); };

  const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
  const money = (n: number) => `${n >= 0 ? '+' : ''}${n.toLocaleString('en', { maximumFractionDigits: 0 })}`;

  return (
    <div className={styles['roi-calc']}>
      <div className={styles['roi-calc__form']}>

        <div className={styles['roi-calc__field']}>
          <label className={styles['roi-calc__label']}>{t.invested}</label>
          <input type="number" className={styles['roi-calc__input']} value={invested}
            onChange={(e) => { setInvested(e.target.value); setError(''); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="10000" min="0" />
        </div>

        <div className={styles['roi-calc__field']}>
          <label className={styles['roi-calc__label']}>{t.returned}</label>
          <input type="number" className={styles['roi-calc__input']} value={returned}
            onChange={(e) => { setReturned(e.target.value); setError(''); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder="13000" min="0" />
        </div>

        <div className={styles['roi-calc__field']}>
          <label className={styles['roi-calc__label']}>{t.period}</label>
          <input type="number" className={styles['roi-calc__input']} value={period}
            onChange={(e) => { setPeriod(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === 'Enter' && calculate()} placeholder={t.periodPlaceholder} min="0" />
        </div>

        {error && <p className={styles['roi-calc__error']}>{error}</p>}

        <div className={styles['roi-calc__actions']}>
          <button type="button" className={styles['roi-calc__btn']} onClick={calculate}>{t.calculate}</button>
          <button type="button" className={styles['roi-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {result && (
        <div className={styles['roi-calc__result']}>
          <div className={`${styles['roi-calc__roi-badge']} ${result.roi >= 0 ? styles['roi-calc__roi-badge--positive'] : styles['roi-calc__roi-badge--negative']}`}>
            <span className={styles['roi-calc__roi-label']}>{t.roi}</span>
            <span className={styles['roi-calc__roi-value']}>{pct(result.roi)}</span>
            <span className={styles['roi-calc__roi-tag']}>{result.roi >= 0 ? t.positive : t.negative}</span>
          </div>

          <div className={styles['roi-calc__metrics']}>
            <div className={styles['roi-calc__metric']}>
              <span className={styles['roi-calc__metric-label']}>{t.profit}</span>
              <span className={`${styles['roi-calc__metric-val']} ${result.profit >= 0 ? styles['roi-calc__metric-val--pos'] : styles['roi-calc__metric-val--neg']}`}>
                {money(result.profit)}
              </span>
            </div>
            <div className={styles['roi-calc__metric']}>
              <span className={styles['roi-calc__metric-label']}>{t.multiplier}</span>
              <span className={styles['roi-calc__metric-val']}>{result.multiplier.toFixed(2)}×</span>
            </div>
            {result.annualRoi !== null && (
              <div className={styles['roi-calc__metric']}>
                <span className={styles['roi-calc__metric-label']}>{t.annualRoi}</span>
                <span className={`${styles['roi-calc__metric-val']} ${result.annualRoi >= 0 ? styles['roi-calc__metric-val--pos'] : styles['roi-calc__metric-val--neg']}`}>
                  {pct(result.annualRoi)} / {t.periodLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
