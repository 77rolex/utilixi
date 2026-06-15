'use client';
import { useState, useEffect } from 'react';
import styles from './PaceCalculator.module.scss';

const T: Record<string, {
  modePace: string; modeTime: string;
  km: string; miles: string;
  distance: string; distanceUnit: string;
  totalTime: string; h: string; m: string; s: string;
  paceInput: string; minPer: string;
  calculate: string;
  resultPace: string; resultTime: string; resultSpeed: string;
  perKm: string; perMile: string; kmh: string; mph: string;
  error: string; errorPayment: string;
}> = {
  en: { modePace: 'Calc Pace', modeTime: 'Calc Time', km: 'km', miles: 'Miles', distance: 'Distance', distanceUnit: 'km', totalTime: 'Total Time', h: 'h', m: 'min', s: 'sec', paceInput: 'Pace', minPer: 'min/', calculate: 'Calculate', resultPace: 'Pace', resultTime: 'Total Time', resultSpeed: 'Speed', perKm: '/km', perMile: '/mile', kmh: 'km/h', mph: 'mph', error: 'Please enter valid positive numbers.', errorPayment: 'Payment must be greater than interest charged per month.' },
  ru: { modePace: 'Темп', modeTime: 'Время', km: 'км', miles: 'Мили', distance: 'Дистанция', distanceUnit: 'км', totalTime: 'Общее время', h: 'ч', m: 'мин', s: 'сек', paceInput: 'Темп', minPer: 'мин/', calculate: 'Рассчитать', resultPace: 'Темп', resultTime: 'Общее время', resultSpeed: 'Скорость', perKm: '/км', perMile: '/миля', kmh: 'км/ч', mph: 'миль/ч', error: 'Введите корректные положительные числа.', errorPayment: 'Платёж должен быть больше начисляемых процентов.' },
  uk: { modePace: 'Темп', modeTime: 'Час', km: 'км', miles: 'Милі', distance: 'Дистанція', distanceUnit: 'км', totalTime: 'Загальний час', h: 'год', m: 'хв', s: 'сек', paceInput: 'Темп', minPer: 'хв/', calculate: 'Розрахувати', resultPace: 'Темп', resultTime: 'Загальний час', resultSpeed: 'Швидкість', perKm: '/км', perMile: '/миля', kmh: 'км/год', mph: 'миль/год', error: 'Введіть коректні додатні числа.', errorPayment: 'Платіж має бути більшим за нараховані відсотки.' },
  fr: { modePace: 'Calculer Allure', modeTime: 'Calculer Temps', km: 'km', miles: 'Miles', distance: 'Distance', distanceUnit: 'km', totalTime: 'Temps total', h: 'h', m: 'min', s: 'sec', paceInput: 'Allure', minPer: 'min/', calculate: 'Calculer', resultPace: 'Allure', resultTime: 'Temps total', resultSpeed: 'Vitesse', perKm: '/km', perMile: '/mile', kmh: 'km/h', mph: 'mph', error: 'Veuillez entrer des nombres positifs valides.', errorPayment: 'Le paiement doit être supérieur aux intérêts mensuels.' },
  lt: { modePace: 'Skaičiuoti Tempą', modeTime: 'Skaičiuoti Laiką', km: 'km', miles: 'Mylios', distance: 'Atstumas', distanceUnit: 'km', totalTime: 'Bendras laikas', h: 'val', m: 'min', s: 'sek', paceInput: 'Tempas', minPer: 'min/', calculate: 'Skaičiuoti', resultPace: 'Tempas', resultTime: 'Bendras laikas', resultSpeed: 'Greitis', perKm: '/km', perMile: '/mylia', kmh: 'km/val', mph: 'myl/val', error: 'Įveskite teigiamus skaičius.', errorPayment: 'Mokėjimas turi viršyti mėnesines palūkanas.' },
};

type Result = { paceMin: number; paceSec: number; totalSec: number; speedKmh: number };

function fmtTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.round(totalSec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function PaceCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [mode, setMode] = useState<'pace' | 'time'>('pace');
  const [unit, setUnit] = useState<'km' | 'miles'>('km');
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [paceMin, setPaceMin] = useState('');
  const [paceSec, setPaceSec] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('utilixi_pace_unit');
    if (saved === 'km' || saved === 'miles') setUnit(saved);
  }, []);

  function handleUnit(u: 'km' | 'miles') {
    setUnit(u);
    setResult(null);
    localStorage.setItem('utilixi_pace_unit', u);
  }

  const KM_PER_MILE = 1.60934;

  function calculate() {
    setError('');
    const dist = parseFloat(distance);
    if (!dist || dist <= 0) { setError(t.error); return; }

    let distKm = unit === 'km' ? dist : dist * KM_PER_MILE;

    if (mode === 'pace') {
      const h = parseFloat(hours) || 0;
      const m = parseFloat(minutes) || 0;
      const s = parseFloat(seconds) || 0;
      const totalS = h * 3600 + m * 60 + s;
      if (totalS <= 0) { setError(t.error); return; }
      const secPerKm = totalS / distKm;
      const pMin = Math.floor(secPerKm / 60);
      const pSec = Math.round(secPerKm % 60);
      setResult({ paceMin: pMin, paceSec: pSec, totalSec: totalS, speedKmh: (distKm / totalS) * 3600 });
    } else {
      const pm = parseFloat(paceMin) || 0;
      const ps = parseFloat(paceSec) || 0;
      const secPerKm = pm * 60 + ps;
      if (secPerKm <= 0) { setError(t.error); return; }
      const totalS = secPerKm * distKm;
      setResult({ paceMin: pm, paceSec: ps, totalSec: totalS, speedKmh: (distKm / totalS) * 3600 });
    }
  }

  const speedDisplay = result
    ? unit === 'km'
      ? `${result.speedKmh.toFixed(1)} ${t.kmh}`
      : `${(result.speedKmh / KM_PER_MILE).toFixed(1)} ${t.mph}`
    : '';

  const paceUnit = unit === 'km' ? t.perKm : t.perMile;

  return (
    <div className={styles.widget}>
      <div className={styles.widget__mode}>
        <button type="button" className={`${styles['widget__mode-btn']}${mode === 'pace' ? ` ${styles['widget__mode-btn--active']}` : ''}`} onClick={() => { setMode('pace'); setResult(null); }}>{t.modePace}</button>
        <button type="button" className={`${styles['widget__mode-btn']}${mode === 'time' ? ` ${styles['widget__mode-btn--active']}` : ''}`} onClick={() => { setMode('time'); setResult(null); }}>{t.modeTime}</button>
      </div>

      <div className={styles.widget__unit_toggle}>
        <button type="button" className={`${styles['widget__unit-btn']}${unit === 'km' ? ` ${styles['widget__unit-btn--active']}` : ''}`} onClick={() => handleUnit('km')}>{t.km}</button>
        <button type="button" className={`${styles['widget__unit-btn']}${unit === 'miles' ? ` ${styles['widget__unit-btn--active']}` : ''}`} onClick={() => handleUnit('miles')}>{t.miles}</button>
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.distance} ({unit === 'km' ? t.km : t.miles})</label>
        <input type="number" min="0" step="0.1" className={styles.widget__input} value={distance} onChange={e => setDistance(e.target.value)} placeholder="10" />
      </div>

      {mode === 'pace' ? (
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.totalTime}</label>
          <div className={styles.widget__time_row}>
            <div className={styles.widget__time_field}>
              <span className={styles.widget__time_label}>{t.h}</span>
              <input type="number" min="0" max="23" className={styles.widget__input} value={hours} onChange={e => setHours(e.target.value)} placeholder="0" />
            </div>
            <div className={styles.widget__time_field}>
              <span className={styles.widget__time_label}>{t.m}</span>
              <input type="number" min="0" max="59" className={styles.widget__input} value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="45" />
            </div>
            <div className={styles.widget__time_field}>
              <span className={styles.widget__time_label}>{t.s}</span>
              <input type="number" min="0" max="59" className={styles.widget__input} value={seconds} onChange={e => setSeconds(e.target.value)} placeholder="0" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.paceInput} ({t.minPer}{unit === 'km' ? t.km : t.miles})</label>
          <div className={styles.widget__time_row}>
            <div className={styles.widget__time_field}>
              <span className={styles.widget__time_label}>{t.m}</span>
              <input type="number" min="0" className={styles.widget__input} value={paceMin} onChange={e => setPaceMin(e.target.value)} placeholder="4" />
            </div>
            <div className={styles.widget__time_field}>
              <span className={styles.widget__time_label}>{t.s}</span>
              <input type="number" min="0" max="59" className={styles.widget__input} value={paceSec} onChange={e => setPaceSec(e.target.value)} placeholder="30" />
            </div>
          </div>
        </div>
      )}

      {error && <p className={styles.widget__error}>{error}</p>}

      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.resultPace}</div>
            <div className={styles['widget__result-value']}>{result.paceMin}:{String(result.paceSec).padStart(2, '0')}</div>
            <div className={styles['widget__result-unit']}>{t.minPer}{unit === 'km' ? t.km : t.miles}</div>
          </div>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.resultTime}</div>
            <div className={styles['widget__result-value']}>{fmtTime(result.totalSec)}</div>
          </div>
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{t.resultSpeed}</div>
            <div className={styles['widget__result-value']}>{speedDisplay}</div>
          </div>
        </div>
      )}
    </div>
  );
}
