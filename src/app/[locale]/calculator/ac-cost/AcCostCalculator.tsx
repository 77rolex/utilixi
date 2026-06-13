'use client';
import { useState } from 'react';
import styles from './AcCostCalculator.module.scss';

const T: Record<string, {
  watts: string; btu: string;
  powerLabel: string; hoursLabel: string; daysLabel: string; rateLabel: string;
  rateUnit: string; hUnit: string; dUnit: string;
  presetsLabel: string;
  calculate: string;
  dailyKwh: string; monthlyKwh: string; annualKwh: string;
  dailyCost: string; monthlyCost: string; annualCost: string;
  error: string; curr: string;
}> = {
  en: { watts: 'Watts', btu: 'BTU/hr', powerLabel: 'Power Consumption', hoursLabel: 'Hours per Day', daysLabel: 'Days per Month', rateLabel: 'Electricity Rate', rateUnit: '₴/kWh', curr: '₴', hUnit: 'h/day', dUnit: 'days', presetsLabel: 'Presets:', calculate: 'Calculate Cost', dailyKwh: 'Daily kWh', monthlyKwh: 'Monthly kWh', annualKwh: 'Annual kWh', dailyCost: 'Daily Cost', monthlyCost: 'Monthly Cost', annualCost: 'Annual Cost', error: 'Please enter valid positive numbers.' },
  ru: { watts: 'Вт', btu: 'BTU/ч', powerLabel: 'Потребляемая мощность', hoursLabel: 'Часов в день', daysLabel: 'Дней в месяц', rateLabel: 'Тариф электроэнергии', rateUnit: '₴/кВт·ч', curr: '₴', hUnit: 'ч/день', dUnit: 'дней', presetsLabel: 'Пресеты:', calculate: 'Рассчитать', dailyKwh: 'кВт·ч/день', monthlyKwh: 'кВт·ч/месяц', annualKwh: 'кВт·ч/год', dailyCost: 'Стоимость/день', monthlyCost: 'Стоимость/месяц', annualCost: 'Стоимость/год', error: 'Введите корректные положительные числа.' },
  uk: { watts: 'Вт', btu: 'BTU/год', powerLabel: 'Споживана потужність', hoursLabel: 'Годин на день', daysLabel: 'Днів на місяць', rateLabel: 'Тариф електроенергії', rateUnit: '₴/кВт·год', curr: '₴', hUnit: 'год/день', dUnit: 'днів', presetsLabel: 'Пресети:', calculate: 'Розрахувати', dailyKwh: 'кВт·год/день', monthlyKwh: 'кВт·год/місяць', annualKwh: 'кВт·год/рік', dailyCost: 'Вартість/день', monthlyCost: 'Вартість/місяць', annualCost: 'Вартість/рік', error: 'Введіть коректні додатні числа.' },
  fr: { watts: 'Watts', btu: 'BTU/h', powerLabel: 'Puissance', hoursLabel: 'Heures par jour', daysLabel: 'Jours par mois', rateLabel: 'Tarif électricité', rateUnit: '€/kWh', curr: '€', hUnit: 'h/jour', dUnit: 'jours', presetsLabel: 'Préréglages:', calculate: 'Calculer', dailyKwh: 'kWh/jour', monthlyKwh: 'kWh/mois', annualKwh: 'kWh/an', dailyCost: 'Coût/jour', monthlyCost: 'Coût/mois', annualCost: 'Coût/an', error: 'Veuillez entrer des nombres positifs valides.' },
  lt: { watts: 'Vatai', btu: 'BTU/val', powerLabel: 'Galios suvartojimas', hoursLabel: 'Valandų per dieną', daysLabel: 'Dienų per mėnesį', rateLabel: 'Elektros tarifas', rateUnit: '€/kWh', curr: '€', hUnit: 'val/d.', dUnit: 'dienų', presetsLabel: 'Pavyzdžiai:', calculate: 'Skaičiuoti', dailyKwh: 'kWh/dieną', monthlyKwh: 'kWh/mėnesį', annualKwh: 'kWh/metus', dailyCost: 'Išlaidos/dieną', monthlyCost: 'Išlaidos/mėnesį', annualCost: 'Išlaidos/metus', error: 'Įveskite teigiamus skaičius.' },
};

const PRESETS_EN = [
  { label: 'Mini AC 9k BTU', w: 900 }, { label: 'AC 12k BTU', w: 1100 }, { label: 'AC 18k BTU', w: 1700 }, { label: 'AC 24k BTU', w: 2200 },
  { label: 'Heater 1.5kW', w: 1500 }, { label: 'Heater 2kW', w: 2000 }, { label: 'Fan', w: 50 }, { label: 'Tower Fan', w: 100 },
];

export default function AcCostCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [unit, setUnit] = useState<'watts' | 'btu'>('watts');
  const [power, setPower] = useState('');
  const [hours, setHours] = useState('8');
  const [days, setDays] = useState('30');
  const [rate, setRate] = useState('0.15');
  const [result, setResult] = useState<{ dailyKwh: number; monthlyKwh: number; annualKwh: number; daily: number; monthly: number; annual: number } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const pw = parseFloat(power);
    const h = parseFloat(hours);
    const d = parseFloat(days);
    const r = parseFloat(rate);
    if (!pw || pw <= 0 || !h || h <= 0 || !d || d <= 0 || !r || r <= 0) { setError(t.error); return; }
    const kw = unit === 'watts' ? pw / 1000 : pw * 0.000293071;
    const dailyKwh = kw * h;
    const monthlyKwh = dailyKwh * d;
    const annualKwh = dailyKwh * 365;
    setResult({ dailyKwh, monthlyKwh, annualKwh, daily: dailyKwh * r, monthly: monthlyKwh * r, annual: annualKwh * r });
  }

  function applyPreset(w: number) {
    const val = unit === 'watts' ? w : Math.round(w / 0.000293071);
    setPower(String(val));
  }

  function fmt(n: number) { return n < 10 ? n.toFixed(2) : n.toFixed(1); }
  function fmtCost(n: number) { return n.toFixed(2); }

  return (
    <div className={styles.widget}>
      <div className={styles.widget__unit_toggle}>
        <button type="button" className={`${styles['widget__unit-btn']}${unit === 'watts' ? ` ${styles['widget__unit-btn--active']}` : ''}`} onClick={() => { setUnit('watts'); setPower(''); setResult(null); }}>{t.watts}</button>
        <button type="button" className={`${styles['widget__unit-btn']}${unit === 'btu' ? ` ${styles['widget__unit-btn--active']}` : ''}`} onClick={() => { setUnit('btu'); setPower(''); setResult(null); }}>{t.btu}</button>
      </div>

      <div className={styles.widget__presets}>
        <div className={styles['widget__presets-label']}>{t.presetsLabel}</div>
        <div className={styles['widget__preset-row']}>
          {PRESETS_EN.map(p => (
            <button key={p.label} type="button" className={styles['widget__preset-btn']} onClick={() => applyPreset(p.w)}>{p.label}</button>
          ))}
        </div>
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.powerLabel} ({unit === 'watts' ? t.watts : t.btu})</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="1" className={styles.widget__input} value={power} onChange={e => setPower(e.target.value)} placeholder={unit === 'watts' ? '1500' : '5118'} />
          <span className={styles.widget__suffix}>{unit === 'watts' ? 'W' : 'BTU'}</span>
        </div>
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.hoursLabel}</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="0" max="24" step="0.5" className={styles.widget__input} value={hours} onChange={e => setHours(e.target.value)} />
          <span className={styles.widget__suffix}>{t.hUnit}</span>
        </div>
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.daysLabel}</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="1" max="31" className={styles.widget__input} value={days} onChange={e => setDays(e.target.value)} />
          <span className={styles.widget__suffix}>{t.dUnit}</span>
        </div>
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.rateLabel} ({t.rateUnit})</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="0.01" step="0.01" className={styles.widget__input} value={rate} onChange={e => setRate(e.target.value)} />
          <span className={styles.widget__suffix}>{t.rateUnit}</span>
        </div>
      </div>

      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.dailyKwh}</div>
            <div className={styles['widget__result-value']}>{fmt(result.dailyKwh)}</div>
            <div className={styles['widget__result-unit']}>kWh</div>
          </div>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.monthlyKwh}</div>
            <div className={styles['widget__result-value']}>{fmt(result.monthlyKwh)}</div>
            <div className={styles['widget__result-unit']}>kWh</div>
          </div>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.annualKwh}</div>
            <div className={styles['widget__result-value']}>{fmt(result.annualKwh)}</div>
            <div className={styles['widget__result-unit']}>kWh</div>
          </div>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.dailyCost}</div>
            <div className={styles['widget__result-value']}>{t.curr}{fmtCost(result.daily)}</div>
          </div>
          <div className={styles['widget__result-card widget__result-card--wide']}>
            <div className={styles['widget__result-label']}>{t.monthlyCost}</div>
            <div className={styles['widget__result-value']}>{t.curr}{fmtCost(result.monthly)}</div>
          </div>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.annualCost}</div>
            <div className={styles['widget__result-value']}>{t.curr}{fmtCost(result.annual)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
