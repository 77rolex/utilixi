'use client';

import { useState } from 'react';
import styles from './PensionCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  tabSave: string; tabPayout: string;
  currentAge: string; retireAge: string; currentSavings: string;
  monthlyContrib: string; annualReturn: string;
  calculate: string; reset: string;
  yearsToRetire: string; totalSaved: string; totalContrib: string; totalGrowth: string;
  payoutCapital: string; payoutYears: string; payoutReturn: string;
  monthlyPayout: string; totalPaid: string;
  disclaimer: string;
  errAge: string; errRetireAge: string; errFields: string; errPositive: string;
  yearSuffix: string; monthSuffix: string;
}> = {
  en: {
    tabSave: 'Save for retirement', tabPayout: 'Monthly payout',
    currentAge: 'Current age', retireAge: 'Retirement age',
    currentSavings: 'Current savings', monthlyContrib: 'Monthly contribution',
    annualReturn: 'Annual return (%)',
    calculate: 'Calculate', reset: 'Reset',
    yearsToRetire: 'Years to retirement', totalSaved: 'Total at retirement',
    totalContrib: 'Total contributions', totalGrowth: 'Investment growth',
    payoutCapital: 'Accumulated capital', payoutYears: 'Years in retirement',
    payoutReturn: 'Annual return on capital (%)',
    monthlyPayout: 'Monthly payout', totalPaid: 'Total paid out',
    disclaimer: '⚠ The calculation is approximate and for informational purposes only. Actual pension amounts depend on your country\'s pension system, tax rules, fund fees, inflation, and market conditions.',
    errAge: 'Age must be between 1 and 100.', errRetireAge: 'Retirement age must be greater than current age.',
    errFields: 'Please fill in all required fields.', errPositive: 'All values must be greater than zero.',
    yearSuffix: 'years', monthSuffix: '/month',
  },
  ru: {
    tabSave: 'Накопить к пенсии', tabPayout: 'Ежемесячная выплата',
    currentAge: 'Текущий возраст', retireAge: 'Возраст выхода на пенсию',
    currentSavings: 'Уже накоплено', monthlyContrib: 'Ежемесячный взнос',
    annualReturn: 'Годовая доходность (%)',
    calculate: 'Рассчитать', reset: 'Сбросить',
    yearsToRetire: 'Лет до пенсии', totalSaved: 'Накоплено к пенсии',
    totalContrib: 'Сумма взносов', totalGrowth: 'Инвестиционный доход',
    payoutCapital: 'Накопленный капитал', payoutYears: 'Лет на пенсии',
    payoutReturn: 'Годовая доходность капитала (%)',
    monthlyPayout: 'Ежемесячная выплата', totalPaid: 'Итого выплачено',
    disclaimer: '⚠ Расчёт носит ориентировочный характер. Реальный размер пенсии зависит от пенсионной системы вашей страны, налогового законодательства, комиссий фондов, инфляции и рыночной конъюнктуры.',
    errAge: 'Возраст должен быть от 1 до 100.', errRetireAge: 'Пенсионный возраст должен быть больше текущего.',
    errFields: 'Заполните все обязательные поля.', errPositive: 'Все значения должны быть больше нуля.',
    yearSuffix: 'лет', monthSuffix: '/месяц',
  },
  uk: {
    tabSave: 'Накопити до пенсії', tabPayout: 'Щомісячна виплата',
    currentAge: 'Поточний вік', retireAge: 'Вік виходу на пенсію',
    currentSavings: 'Вже накопичено', monthlyContrib: 'Щомісячний внесок',
    annualReturn: 'Річна дохідність (%)',
    calculate: 'Розрахувати', reset: 'Скинути',
    yearsToRetire: 'Років до пенсії', totalSaved: 'Накопичено до пенсії',
    totalContrib: 'Сума внесків', totalGrowth: 'Інвестиційний дохід',
    payoutCapital: 'Накопичений капітал', payoutYears: 'Років на пенсії',
    payoutReturn: 'Річна дохідність капіталу (%)',
    monthlyPayout: 'Щомісячна виплата', totalPaid: 'Разом виплачено',
    disclaimer: '⚠ Розрахунок є орієнтовним. Реальний розмір пенсії залежить від пенсійної системи вашої країни, податкового законодавства, комісій фондів, інфляції та ринкових умов.',
    errAge: 'Вік має бути від 1 до 100.', errRetireAge: 'Пенсійний вік має бути більшим за поточний.',
    errFields: 'Заповніть усі обов\'язкові поля.', errPositive: 'Усі значення мають бути більше нуля.',
    yearSuffix: 'років', monthSuffix: '/місяць',
  },
  fr: {
    tabSave: 'Épargner pour la retraite', tabPayout: 'Versement mensuel',
    currentAge: 'Âge actuel', retireAge: 'Âge de la retraite',
    currentSavings: 'Épargne actuelle', monthlyContrib: 'Versement mensuel',
    annualReturn: 'Rendement annuel (%)',
    calculate: 'Calculer', reset: 'Réinitialiser',
    yearsToRetire: 'Années avant la retraite', totalSaved: 'Capital à la retraite',
    totalContrib: 'Total des versements', totalGrowth: 'Croissance de l\'investissement',
    payoutCapital: 'Capital accumulé', payoutYears: 'Années de retraite',
    payoutReturn: 'Rendement annuel du capital (%)',
    monthlyPayout: 'Versement mensuel', totalPaid: 'Total versé',
    disclaimer: '⚠ Ce calcul est approximatif et fourni à titre informatif. Le montant réel de la retraite dépend du système de retraite de votre pays, des règles fiscales, des frais de gestion, de l\'inflation et des conditions de marché.',
    errAge: 'L\'âge doit être compris entre 1 et 100.', errRetireAge: 'L\'âge de la retraite doit être supérieur à l\'âge actuel.',
    errFields: 'Veuillez remplir tous les champs obligatoires.', errPositive: 'Toutes les valeurs doivent être positives.',
    yearSuffix: 'ans', monthSuffix: '/mois',
  },
  lt: {
    tabSave: 'Kaupti pensijai', tabPayout: 'Mėnesinė išmoka',
    currentAge: 'Dabartinis amžius', retireAge: 'Pensinis amžius',
    currentSavings: 'Jau sukauptos lėšos', monthlyContrib: 'Mėnesio įnašas',
    annualReturn: 'Metinė grąža (%)',
    calculate: 'Skaičiuoti', reset: 'Išvalyti',
    yearsToRetire: 'Metų iki pensijos', totalSaved: 'Sukauptas kapitalas',
    totalContrib: 'Viso įmokų', totalGrowth: 'Investicijų pajamos',
    payoutCapital: 'Sukauptas kapitalas', payoutYears: 'Metų pensijoje',
    payoutReturn: 'Metinė kapitalo grąža (%)',
    monthlyPayout: 'Mėnesinė išmoka', totalPaid: 'Viso išmokėta',
    disclaimer: '⚠ Skaičiavimas yra apytikslis ir skirtas tik informaciniais tikslais. Tikrasis pensijos dydis priklauso nuo jūsų šalies pensijų sistemos, mokesčių taisyklių, fondų komisinių, infliacijos ir rinkos sąlygų.',
    errAge: 'Amžius turi būti nuo 1 iki 100.', errRetireAge: 'Pensinis amžius turi būti didesnis už dabartinį.',
    errFields: 'Užpildykite visus privalomus laukus.', errPositive: 'Visos reikšmės turi būti teigiamos.',
    yearSuffix: 'metų', monthSuffix: '/mėn.',
  },
};

function fv(rate: number, nper: number, pmt: number, pv: number): number {
  if (rate === 0) return pv + pmt * nper;
  const r = rate / 12;
  return pv * Math.pow(1 + r, nper) + pmt * (Math.pow(1 + r, nper) - 1) / r;
}

function monthlyPmt(rate: number, nper: number, pv: number): number {
  const r = rate / 12;
  if (r === 0) return pv / nper;
  return (pv * r) / (1 - Math.pow(1 + r, -nper));
}

function fmtMoney(n: number): string {
  return n.toLocaleString('en', { maximumFractionDigits: 0 });
}

export default function PensionCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [tab, setTab] = useState<'save' | 'payout'>('save');

  // Tab 1 — Save
  const [currentAge, setCurrentAge] = useState('35');
  const [retireAge, setRetireAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('0');
  const [monthlyContrib, setMonthlyContrib] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [saveResult, setSaveResult] = useState<{ total: number; contrib: number; growth: number; years: number } | null>(null);

  // Tab 2 — Payout
  const [payoutCapital, setPayoutCapital] = useState('');
  const [payoutYears, setPayoutYears] = useState('20');
  const [payoutReturn, setPayoutReturn] = useState('4');
  const [payoutResult, setPayoutResult] = useState<{ monthly: number; total: number } | null>(null);

  const [error, setError] = useState('');

  const calcSave = () => {
    const ca = parseInt(currentAge), ra = parseInt(retireAge);
    const cs = parseFloat(currentSavings.replace(',', '.')), mc = parseFloat(monthlyContrib.replace(',', '.'));
    const ar = parseFloat(annualReturn.replace(',', '.')) / 100;
    if (isNaN(ca) || isNaN(ra) || isNaN(cs) || isNaN(mc) || isNaN(ar)) { setError(t.errFields); return; }
    if (ca < 1 || ca > 100) { setError(t.errAge); return; }
    if (ra <= ca) { setError(t.errRetireAge); return; }
    if (cs < 0 || mc < 0 || ar < 0) { setError(t.errPositive); return; }
    setError('');
    const years = ra - ca;
    const nper = years * 12;
    const total = fv(ar, nper, mc, cs);
    const contrib = cs + mc * nper;
    setSaveResult({ total, contrib, growth: total - contrib, years });
    setPayoutCapital(Math.round(total).toString());
  };

  const calcPayout = () => {
    const capital = parseFloat(payoutCapital.replace(',', '.'));
    const yrs = parseInt(payoutYears);
    const ret = parseFloat(payoutReturn.replace(',', '.')) / 100;
    if (isNaN(capital) || isNaN(yrs) || isNaN(ret)) { setError(t.errFields); return; }
    if (capital <= 0 || yrs <= 0) { setError(t.errPositive); return; }
    setError('');
    const monthly = monthlyPmt(ret, yrs * 12, capital);
    setPayoutResult({ monthly, total: monthly * yrs * 12 });
  };

  const reset = () => {
    setSaveResult(null); setPayoutResult(null); setError('');
  };

  const field = (label: string, value: string, setter: (v: string) => void, placeholder = '') => (
    <div className={styles['pension-calc__field']}>
      <label className={styles['pension-calc__label']}>{label}</label>
      <input
        type="number" className={styles['pension-calc__input']} value={value}
        onChange={(e) => { setter(e.target.value); setError(''); setSaveResult(null); setPayoutResult(null); }}
        placeholder={placeholder} min="0"
      />
    </div>
  );

  return (
    <div className={styles['pension-calc']}>
      <div className={styles['pension-calc__tabs']}>
        <button
          type="button"
          className={`${styles['pension-calc__tab']} ${tab === 'save' ? styles['pension-calc__tab--active'] : ''}`}
          onClick={() => { setTab('save'); setError(''); }}
        >{t.tabSave}</button>
        <button
          type="button"
          className={`${styles['pension-calc__tab']} ${tab === 'payout' ? styles['pension-calc__tab--active'] : ''}`}
          onClick={() => { setTab('payout'); setError(''); }}
        >{t.tabPayout}</button>
      </div>

      {tab === 'save' && (
        <div className={styles['pension-calc__body']}>
          <div className={styles['pension-calc__form']}>
            {field(t.currentAge, currentAge, setCurrentAge, '35')}
            {field(t.retireAge, retireAge, setRetireAge, '65')}
            {field(t.currentSavings, currentSavings, setCurrentSavings, '0')}
            {field(t.monthlyContrib, monthlyContrib, setMonthlyContrib, '500')}
            {field(t.annualReturn, annualReturn, setAnnualReturn, '7')}
            {error && <p className={styles['pension-calc__error']}>{error}</p>}
            <div className={styles['pension-calc__actions']}>
              <button type="button" className={styles['pension-calc__btn']} onClick={calcSave}>{t.calculate}</button>
              <button type="button" className={styles['pension-calc__btn--reset']} onClick={reset}>{t.reset}</button>
            </div>
          </div>

          {saveResult && (
            <div className={styles['pension-calc__result']}>
              <div className={styles['pension-calc__result-main']}>
                <span className={styles['pension-calc__result-label']}>{t.totalSaved}</span>
                <span className={styles['pension-calc__result-value']}>{fmtMoney(saveResult.total)}</span>
              </div>
              <div className={styles['pension-calc__metrics']}>
                <div className={styles['pension-calc__metric']}>
                  <span>{t.yearsToRetire}</span><strong>{saveResult.years} {t.yearSuffix}</strong>
                </div>
                <div className={styles['pension-calc__metric']}>
                  <span>{t.totalContrib}</span><strong>{fmtMoney(saveResult.contrib)}</strong>
                </div>
                <div className={styles['pension-calc__metric']}>
                  <span>{t.totalGrowth}</span>
                  <strong className={styles['pension-calc__metric--green']}>{fmtMoney(saveResult.growth)}</strong>
                </div>
              </div>
              <div className={styles['pension-calc__bar']}>
                <div
                  className={styles['pension-calc__bar-contrib']}
                  style={{ width: `${Math.min(100, (saveResult.contrib / saveResult.total) * 100).toFixed(1)}%` }}
                />
                <div className={styles['pension-calc__bar-growth']} style={{ flex: 1 }} />
              </div>
              <p className={styles['pension-calc__disclaimer']}>{t.disclaimer}</p>
            </div>
          )}
        </div>
      )}

      {tab === 'payout' && (
        <div className={styles['pension-calc__body']}>
          <div className={styles['pension-calc__form']}>
            {field(t.payoutCapital, payoutCapital, setPayoutCapital, '500000')}
            {field(t.payoutYears, payoutYears, setPayoutYears, '20')}
            {field(t.payoutReturn, payoutReturn, setPayoutReturn, '4')}
            {error && <p className={styles['pension-calc__error']}>{error}</p>}
            <div className={styles['pension-calc__actions']}>
              <button type="button" className={styles['pension-calc__btn']} onClick={calcPayout}>{t.calculate}</button>
              <button type="button" className={styles['pension-calc__btn--reset']} onClick={reset}>{t.reset}</button>
            </div>
          </div>

          {payoutResult && (
            <div className={styles['pension-calc__result']}>
              <div className={styles['pension-calc__result-main']}>
                <span className={styles['pension-calc__result-label']}>{t.monthlyPayout}</span>
                <span className={styles['pension-calc__result-value']}>
                  {fmtMoney(payoutResult.monthly)}
                  <span className={styles['pension-calc__result-period']}>{t.monthSuffix}</span>
                </span>
              </div>
              <div className={styles['pension-calc__metrics']}>
                <div className={styles['pension-calc__metric']}>
                  <span>{t.totalPaid}</span><strong>{fmtMoney(payoutResult.total)}</strong>
                </div>
              </div>
              <p className={styles['pension-calc__disclaimer']}>{t.disclaimer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
