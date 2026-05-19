'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './CountdownTimer.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  title: string;
  targetDate: string;
  targetTime: string;
  start: string; stop: string; reset: string;
  days: string; hours: string; minutes: string; seconds: string;
  expired: string;
  errEmpty: string; errPast: string;
  placeholder: string;
  quickLabels: string[];
}> = {
  en: {
    title: 'Countdown Timer',
    targetDate: 'Target date', targetTime: 'Time (optional)',
    start: 'Start', stop: 'Stop', reset: 'Reset',
    days: 'Days', hours: 'Hours', minutes: 'Min', seconds: 'Sec',
    expired: 'Time is up!',
    errEmpty: 'Please select a target date.', errPast: 'The date must be in the future.',
    placeholder: '',
    quickLabels: ['New Year', 'Christmas', 'Halloween', 'Valentine\'s Day'],
  },
  ru: {
    title: 'Таймер обратного отсчёта',
    targetDate: 'Целевая дата', targetTime: 'Время (необязательно)',
    start: 'Старт', stop: 'Стоп', reset: 'Сброс',
    days: 'Дней', hours: 'Часов', minutes: 'Мин', seconds: 'Сек',
    expired: 'Время вышло!',
    errEmpty: 'Выберите целевую дату.', errPast: 'Дата должна быть в будущем.',
    placeholder: '',
    quickLabels: ['Новый год', 'Рождество', 'Хэллоуин', 'День влюблённых'],
  },
  uk: {
    title: 'Таймер зворотного відліку',
    targetDate: 'Цільова дата', targetTime: 'Час (необов\'язково)',
    start: 'Старт', stop: 'Стоп', reset: 'Скинути',
    days: 'Днів', hours: 'Годин', minutes: 'Хв', seconds: 'Сек',
    expired: 'Час минув!',
    errEmpty: 'Оберіть цільову дату.', errPast: 'Дата має бути в майбутньому.',
    placeholder: '',
    quickLabels: ['Новий рік', 'Різдво', 'Гелловін', 'День закоханих'],
  },
  fr: {
    title: 'Minuteur de compte à rebours',
    targetDate: 'Date cible', targetTime: 'Heure (facultatif)',
    start: 'Démarrer', stop: 'Arrêter', reset: 'Réinitialiser',
    days: 'Jours', hours: 'Heures', minutes: 'Min', seconds: 'Sec',
    expired: 'Temps écoulé !',
    errEmpty: 'Veuillez sélectionner une date cible.', errPast: 'La date doit être dans le futur.',
    placeholder: '',
    quickLabels: ['Nouvel An', 'Noël', 'Halloween', 'Saint-Valentin'],
  },
  lt: {
    title: 'Atgalinio skaičiavimo laikmatis',
    targetDate: 'Tikslinė data', targetTime: 'Laikas (neprivaloma)',
    start: 'Pradėti', stop: 'Stabdyti', reset: 'Atstatyti',
    days: 'Dienos', hours: 'Valandos', minutes: 'Min', seconds: 'Sek',
    expired: 'Laikas baigėsi!',
    errEmpty: 'Pasirinkite tikslinę datą.', errPast: 'Data turi būti ateityje.',
    placeholder: '',
    quickLabels: ['Naujieji metai', 'Kalėdos', 'Helovinas', 'Valentino diena'],
  },
};

function getNextOccurrence(month: number, day: number): Date {
  const now = new Date();
  const year = now.getFullYear();
  const d = new Date(year, month - 1, day, 0, 0, 0, 0);
  if (d <= now) d.setFullYear(year + 1);
  return d;
}

const QUICK_EVENTS = [
  () => getNextOccurrence(1, 1),
  () => getNextOccurrence(12, 25),
  () => getNextOccurrence(10, 31),
  () => getNextOccurrence(2, 14),
];

function toDateString(d: Date): string {
  return d.toISOString().split('T')[0];
}

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function calcRemaining(target: Date): Remaining | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSec = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

export default function CountdownTimer({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [dateVal, setDateVal] = useState('');
  const [timeVal, setTimeVal] = useState('00:00');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [expired, setExpired] = useState(false);
  const targetRef = useRef<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    if (!targetRef.current) return;
    const rem = calcRemaining(targetRef.current);
    if (!rem) {
      setRemaining(null);
      setExpired(true);
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setRemaining(rem);
    }
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
      tick();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, tick]);

  const start = () => {
    if (!dateVal) { setError(t.errEmpty); return; }
    const [h, m] = (timeVal || '00:00').split(':').map(Number);
    const [y, mo, d] = dateVal.split('-').map(Number);
    const target = new Date(y, mo - 1, d, h, m, 0, 0);
    if (target <= new Date()) { setError(t.errPast); return; }
    setError('');
    setExpired(false);
    targetRef.current = target;
    const rem = calcRemaining(target);
    setRemaining(rem);
    setRunning(true);
  };

  const stop = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setRemaining(null);
    setExpired(false);
    setDateVal('');
    setTimeVal('00:00');
    setError('');
    targetRef.current = null;
  };

  const applyQuick = (idx: number) => {
    const d = QUICK_EVENTS[idx]();
    setDateVal(toDateString(d));
    setTimeVal('00:00');
    setError('');
    setRunning(false);
    setRemaining(null);
    setExpired(false);
    targetRef.current = null;
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={styles['cd-timer']}>
      {/* Quick presets */}
      <div className={styles['cd-timer__presets']}>
        {t.quickLabels.map((label, i) => (
          <button key={i} type="button" className={styles['cd-timer__preset']} onClick={() => applyQuick(i)}>
            {label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className={styles['cd-timer__form']}>
        <div className={styles['cd-timer__field']}>
          <label className={styles['cd-timer__label']}>{t.targetDate}</label>
          <input type="date" className={styles['cd-timer__input']} value={dateVal}
            onChange={e => { setDateVal(e.target.value); setError(''); }} />
        </div>
        <div className={styles['cd-timer__field']}>
          <label className={styles['cd-timer__label']}>{t.targetTime}</label>
          <input type="time" className={styles['cd-timer__input']} value={timeVal}
            onChange={e => { setTimeVal(e.target.value); setError(''); }} />
        </div>
      </div>

      {error && <p className={styles['cd-timer__error']}>{error}</p>}

      {/* Controls */}
      <div className={styles['cd-timer__controls']}>
        {!running ? (
          <button type="button" className={styles['cd-timer__btn']} onClick={start}>{t.start}</button>
        ) : (
          <button type="button" className={`${styles['cd-timer__btn']} ${styles['cd-timer__btn--stop']}`} onClick={stop}>{t.stop}</button>
        )}
        <button type="button" className={styles['cd-timer__btn--reset']} onClick={reset}>{t.reset}</button>
      </div>

      {/* Countdown display */}
      {expired && (
        <div className={styles['cd-timer__expired']}>{t.expired}</div>
      )}

      {remaining && !expired && (
        <div className={styles['cd-timer__display']}>
          {[
            { val: remaining.days,    label: t.days    },
            { val: remaining.hours,   label: t.hours   },
            { val: remaining.minutes, label: t.minutes },
            { val: remaining.seconds, label: t.seconds },
          ].map(({ val, label }) => (
            <div key={label} className={styles['cd-timer__unit']}>
              <span className={styles['cd-timer__number']}>{val >= 100 ? val : pad(val)}</span>
              <span className={styles['cd-timer__unit-label']}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
