'use client';

import { useState, useCallback } from 'react';
import styles from './ElectricityBillCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  power: string;
  watt: string;
  hoursDay: string;
  hUnit: string;
  daysMonth: string;
  dUnit: string;
  rate: string;
  rateUnit: string;
  calculate: string;
  kwhMonth: string;
  monthlyCost: string;
  annualCost: string;
  presetsLabel: string;
  error: string;
}> = {
  en: {
    power: 'Power',
    watt: 'W',
    hoursDay: 'Hours per day',
    hUnit: 'h/day',
    daysMonth: 'Days per month',
    dUnit: 'days',
    rate: 'Electricity rate',
    rateUnit: '€/kWh',
    calculate: 'Calculate',
    kwhMonth: 'kWh / month',
    monthlyCost: 'Monthly cost',
    annualCost: 'Annual cost',
    presetsLabel: 'Quick presets:',
    error: 'Please enter valid positive numbers in all fields.',
  },
  ru: {
    power: 'Мощность',
    watt: 'Вт',
    hoursDay: 'Часов в сутки',
    hUnit: 'ч/день',
    daysMonth: 'Дней в месяце',
    dUnit: 'дней',
    rate: 'Тариф на электричество',
    rateUnit: '₽/кВт·ч',
    calculate: 'Рассчитать',
    kwhMonth: 'кВт·ч / мес',
    monthlyCost: 'В месяц',
    annualCost: 'В год',
    presetsLabel: 'Быстрый выбор:',
    error: 'Введите корректные положительные числа во все поля.',
  },
  uk: {
    power: 'Потужність',
    watt: 'Вт',
    hoursDay: 'Годин на добу',
    hUnit: 'год/день',
    daysMonth: 'Днів у місяці',
    dUnit: 'днів',
    rate: 'Тариф на електрику',
    rateUnit: '₴/кВт·год',
    calculate: 'Розрахувати',
    kwhMonth: 'кВт·год / міс',
    monthlyCost: 'На місяць',
    annualCost: 'На рік',
    presetsLabel: 'Швидкий вибір:',
    error: 'Введіть коректні додатні числа у всі поля.',
  },
  fr: {
    power: 'Puissance',
    watt: 'W',
    hoursDay: 'Heures par jour',
    hUnit: 'h/jour',
    daysMonth: 'Jours par mois',
    dUnit: 'jours',
    rate: 'Tarif électricité',
    rateUnit: '€/kWh',
    calculate: 'Calculer',
    kwhMonth: 'kWh / mois',
    monthlyCost: 'Coût mensuel',
    annualCost: 'Coût annuel',
    presetsLabel: 'Appareils courants :',
    error: 'Veuillez entrer des nombres positifs valides dans tous les champs.',
  },
  lt: {
    power: 'Galia',
    watt: 'W',
    hoursDay: 'Val. per dieną',
    hUnit: 'val./d.',
    daysMonth: 'Dienų per mėnesį',
    dUnit: 'dienos',
    rate: 'Elektros tarifas',
    rateUnit: '€/kWh',
    calculate: 'Skaičiuoti',
    kwhMonth: 'kWh / mėn.',
    monthlyCost: 'Mėnesio išlaidos',
    annualCost: 'Metinės išlaidos',
    presetsLabel: 'Greiti pasirinkimai:',
    error: 'Įveskite teigiamus skaičius visuose laukuose.',
  },
};

const PRESETS = [
  { label: 'LED', w: 10 },
  { label: 'Laptop', w: 65 },
  { label: 'TV', w: 100 },
  { label: 'PC', w: 200 },
  { label: 'Fridge', w: 150 },
  { label: 'Microwave', w: 1000 },
  { label: 'A/C', w: 1500 },
  { label: 'Washing machine', w: 2000 },
];

export default function ElectricityBillCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [power, setPower] = useState('');
  const [hours, setHours] = useState('');
  const [days, setDays] = useState('30');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState<{ kwh: number; monthly: number; annual: number } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    const p = parseFloat(power.replace(',', '.'));
    const h = parseFloat(hours.replace(',', '.'));
    const d = parseFloat(days.replace(',', '.'));
    const r = parseFloat(rate.replace(',', '.'));
    if (isNaN(p) || p <= 0 || isNaN(h) || h <= 0 || isNaN(d) || d <= 0 || isNaN(r) || r <= 0) {
      setError(t.error);
      setResult(null);
      return;
    }
    setError('');
    const kwh = (p / 1000) * h * d;
    const monthly = kwh * r;
    setResult({
      kwh: Math.round(kwh * 100) / 100,
      monthly: Math.round(monthly * 100) / 100,
      annual: Math.round(monthly * 12 * 100) / 100,
    });
  }, [power, hours, days, rate, t]);

  return (
    <div className={styles.widget}>
      <div className={styles.widget__form}>
        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="eb-power">{t.power}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="eb-power" className={styles.widget__input} type="number" min="0" step="1"
              value={power} onChange={(e) => setPower(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="100"
              aria-label={`${t.power} (${t.watt})`}
            />
            <span className={styles.widget__suffix}>{t.watt}</span>
          </div>
          <div className={styles.widget__presets}>
            <span className={styles.widget__label}>{t.presetsLabel}</span>
            {PRESETS.map((p) => (
              <button
                key={p.w}
                type="button"
                className={styles['widget__preset-btn']}
                onClick={() => { setPower(String(p.w)); setResult(null); }}
              >
                {p.label} {p.w}W
              </button>
            ))}
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="eb-hours">{t.hoursDay}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="eb-hours" className={styles.widget__input} type="number" min="0" max="24" step="0.5"
              value={hours} onChange={(e) => setHours(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="8"
              aria-label={`${t.hoursDay} (${t.hUnit})`}
            />
            <span className={styles.widget__suffix}>{t.hUnit}</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="eb-days">{t.daysMonth}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="eb-days" className={styles.widget__input} type="number" min="1" max="31" step="1"
              value={days} onChange={(e) => setDays(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              aria-label={`${t.daysMonth} (${t.dUnit})`}
            />
            <span className={styles.widget__suffix}>{t.dUnit}</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="eb-rate">{t.rate}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="eb-rate" className={styles.widget__input} type="number" min="0" step="0.001"
              value={rate} onChange={(e) => setRate(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="0.30"
              aria-label={`${t.rate} (${t.rateUnit})`}
            />
            <span className={styles.widget__suffix}>{t.rateUnit}</span>
          </div>
        </div>

        {error && <p className={styles.widget__error}>{error}</p>}

        <button className={styles.widget__btn} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles.widget__results}>
          <div className={`${styles['widget__result-card']} ${styles['widget__result-card--wide']}`}>
            <span className={styles['widget__result-label']}>{t.kwhMonth}</span>
            <span className={styles['widget__result-value']}>{result.kwh.toLocaleString()} kWh</span>
          </div>
          <div className={styles['widget__result-card']}>
            <span className={styles['widget__result-label']}>{t.monthlyCost}</span>
            <span className={styles['widget__result-value']}>{result.monthly.toLocaleString()}</span>
          </div>
          <div className={styles['widget__result-card']}>
            <span className={styles['widget__result-label']}>{t.annualCost}</span>
            <span className={styles['widget__result-value']}>{result.annual.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
