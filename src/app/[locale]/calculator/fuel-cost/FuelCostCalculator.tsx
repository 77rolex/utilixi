'use client';

import { useState, useCallback } from 'react';
import styles from './FuelCostCalculator.module.scss';

type Props = { locale: string };
type Unit = 'metric' | 'imperial';

const T: Record<string, {
  metric: string;
  imperial: string;
  distance: string;
  km: string;
  miles: string;
  consumption: string;
  lper100km: string;
  mpg: string;
  fuelPrice: string;
  perLiter: string;
  perGallon: string;
  calculate: string;
  fuelNeeded: string;
  liters: string;
  gallons: string;
  totalCost: string;
  error: string;
}> = {
  en: {
    metric: 'Metric',
    imperial: 'Imperial',
    distance: 'Distance',
    km: 'km',
    miles: 'miles',
    consumption: 'Fuel consumption',
    lper100km: 'L/100 km',
    mpg: 'MPG',
    fuelPrice: 'Fuel price',
    perLiter: '/liter',
    perGallon: '/gallon',
    calculate: 'Calculate',
    fuelNeeded: 'Fuel needed',
    liters: 'L',
    gallons: 'gal',
    totalCost: 'Total cost',
    error: 'Please enter valid positive numbers in all fields.',
  },
  ru: {
    metric: 'Метрическая',
    imperial: 'Имперская',
    distance: 'Расстояние',
    km: 'км',
    miles: 'миль',
    consumption: 'Расход топлива',
    lper100km: 'л/100 км',
    mpg: 'MPG',
    fuelPrice: 'Цена топлива',
    perLiter: '/литр',
    perGallon: '/галлон',
    calculate: 'Рассчитать',
    fuelNeeded: 'Нужно топлива',
    liters: 'л',
    gallons: 'гал',
    totalCost: 'Итоговая стоимость',
    error: 'Введите корректные положительные числа во все поля.',
  },
  uk: {
    metric: 'Метрична',
    imperial: 'Імперська',
    distance: 'Відстань',
    km: 'км',
    miles: 'миль',
    consumption: 'Витрата пального',
    lper100km: 'л/100 км',
    mpg: 'MPG',
    fuelPrice: 'Ціна пального',
    perLiter: '/літр',
    perGallon: '/галон',
    calculate: 'Розрахувати',
    fuelNeeded: 'Потрібно пального',
    liters: 'л',
    gallons: 'гал',
    totalCost: 'Загальна вартість',
    error: 'Введіть коректні додатні числа у всі поля.',
  },
  fr: {
    metric: 'Métrique',
    imperial: 'Impérial',
    distance: 'Distance',
    km: 'km',
    miles: 'miles',
    consumption: 'Consommation',
    lper100km: 'L/100 km',
    mpg: 'MPG',
    fuelPrice: 'Prix du carburant',
    perLiter: '/litre',
    perGallon: '/gallon',
    calculate: 'Calculer',
    fuelNeeded: 'Carburant nécessaire',
    liters: 'L',
    gallons: 'gal',
    totalCost: 'Coût total',
    error: 'Veuillez entrer des nombres positifs valides dans tous les champs.',
  },
  lt: {
    metric: 'Metrinė',
    imperial: 'Imperinė',
    distance: 'Atstumas',
    km: 'km',
    miles: 'mylios',
    consumption: 'Degalų sąnaudos',
    lper100km: 'l/100 km',
    mpg: 'MPG',
    fuelPrice: 'Degalų kaina',
    perLiter: '/litrą',
    perGallon: '/galoną',
    calculate: 'Skaičiuoti',
    fuelNeeded: 'Reikalingi degalai',
    liters: 'l',
    gallons: 'gal',
    totalCost: 'Bendra kaina',
    error: 'Įveskite teigiamus skaičius visuose laukuose.',
  },
};

export default function FuelCostCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [unit, setUnit] = useState<Unit>('metric');
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<{ fuel: number; cost: number } | null>(null);
  const [error, setError] = useState('');

  const handleUnit = (u: Unit) => { setUnit(u); setResult(null); setError(''); };

  const handleCalculate = useCallback(() => {
    const d = parseFloat(distance.replace(',', '.'));
    const c = parseFloat(consumption.replace(',', '.'));
    const p = parseFloat(price.replace(',', '.'));
    if (isNaN(d) || d <= 0 || isNaN(c) || c <= 0 || isNaN(p) || p <= 0) {
      setError(t.error);
      setResult(null);
      return;
    }
    setError('');
    let fuel: number;
    if (unit === 'metric') {
      fuel = (d / 100) * c;
    } else {
      fuel = d / c;
    }
    setResult({ fuel: Math.round(fuel * 100) / 100, cost: Math.round(fuel * p * 100) / 100 });
  }, [distance, consumption, price, unit, t]);

  const distanceUnit = unit === 'metric' ? t.km : t.miles;
  const consUnit = unit === 'metric' ? t.lper100km : t.mpg;
  const priceUnit = unit === 'metric' ? t.perLiter : t.perGallon;
  const volumeUnit = unit === 'metric' ? t.liters : t.gallons;

  return (
    <div className={styles.widget}>
      <div className={styles.widget__form}>
        <div className={styles.widget__toggle} role="group">
          {(['metric', 'imperial'] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              className={`${styles['widget__toggle-btn']}${unit === u ? ` ${styles['widget__toggle-btn--active']}` : ''}`}
              onClick={() => handleUnit(u)}
            >
              {u === 'metric' ? t.metric : t.imperial}
            </button>
          ))}
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="fc-distance">{t.distance}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="fc-distance" className={styles.widget__input} type="number" min="0" step="1"
              value={distance} onChange={(e) => setDistance(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '300' : '200'}
              aria-label={`${t.distance} (${distanceUnit})`}
            />
            <span className={styles.widget__suffix}>{distanceUnit}</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="fc-consumption">{t.consumption}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="fc-consumption" className={styles.widget__input} type="number" min="0" step="0.1"
              value={consumption} onChange={(e) => setConsumption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '8' : '35'}
              aria-label={`${t.consumption} (${consUnit})`}
            />
            <span className={styles.widget__suffix}>{consUnit}</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="fc-price">{t.fuelPrice}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="fc-price" className={styles.widget__input} type="number" min="0" step="0.01"
              value={price} onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '1.60' : '3.50'}
              aria-label={`${t.fuelPrice} (${priceUnit})`}
            />
            <span className={styles.widget__suffix}>{priceUnit}</span>
          </div>
        </div>

        {error && <p className={styles.widget__error}>{error}</p>}

        <button className={styles.widget__btn} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__result-card']}>
            <span className={styles['widget__result-label']}>{t.fuelNeeded}</span>
            <span className={styles['widget__result-value']}>{result.fuel.toLocaleString()} {volumeUnit}</span>
          </div>
          <div className={styles['widget__result-card']}>
            <span className={styles['widget__result-label']}>{t.totalCost}</span>
            <span className={styles['widget__result-value']}>{result.cost.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
