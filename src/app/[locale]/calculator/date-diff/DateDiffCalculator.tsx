'use client';

import { useState } from 'react';
import styles from './DateDiffCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  startDate: string; endDate: string; calculate: string; reset: string; swap: string;
  years: string; months: string; weeks: string; days: string;
  totalDays: string; totalWeeks: string; totalMonths: string; workingDays: string;
  weekends: string;
  errEmpty: string; errOrder: string;
  fromTo: string;
}> = {
  en: {
    startDate: 'Start date', endDate: 'End date', calculate: 'Calculate', reset: 'Reset', swap: 'Swap',
    years: 'years', months: 'months', weeks: 'weeks', days: 'days',
    totalDays: 'Total days', totalWeeks: 'Total weeks', totalMonths: 'Total months', workingDays: 'Working days',
    weekends: 'Weekends',
    errEmpty: 'Please fill in both dates.', errOrder: 'Start date must be before end date.',
    fromTo: 'From — To',
  },
  ru: {
    startDate: 'Начальная дата', endDate: 'Конечная дата', calculate: 'Рассчитать', reset: 'Сбросить', swap: 'Поменять',
    years: 'лет', months: 'мес', weeks: 'нед', days: 'дн',
    totalDays: 'Всего дней', totalWeeks: 'Всего недель', totalMonths: 'Всего месяцев', workingDays: 'Рабочих дней',
    weekends: 'Выходных дней',
    errEmpty: 'Заполните обе даты.', errOrder: 'Начальная дата должна быть раньше конечной.',
    fromTo: 'От — До',
  },
  uk: {
    startDate: 'Початкова дата', endDate: 'Кінцева дата', calculate: 'Розрахувати', reset: 'Скинути', swap: 'Поміняти',
    years: 'років', months: 'міс', weeks: 'тиж', days: 'дн',
    totalDays: 'Всього днів', totalWeeks: 'Всього тижнів', totalMonths: 'Всього місяців', workingDays: 'Робочих днів',
    weekends: 'Вихідних днів',
    errEmpty: 'Заповніть обидві дати.', errOrder: 'Початкова дата має бути раніше кінцевої.',
    fromTo: 'Від — До',
  },
  fr: {
    startDate: 'Date de début', endDate: 'Date de fin', calculate: 'Calculer', reset: 'Réinitialiser', swap: 'Inverser',
    years: 'ans', months: 'mois', weeks: 'sem', days: 'j',
    totalDays: 'Total jours', totalWeeks: 'Total semaines', totalMonths: 'Total mois', workingDays: 'Jours ouvrés',
    weekends: 'Week-ends',
    errEmpty: 'Veuillez remplir les deux dates.', errOrder: 'La date de début doit être avant la date de fin.',
    fromTo: 'De — À',
  },
  lt: {
    startDate: 'Pradžios data', endDate: 'Pabaigos data', calculate: 'Skaičiuoti', reset: 'Išvalyti', swap: 'Sukeisti',
    years: 'metai', months: 'mėn', weeks: 'sav', days: 'd',
    totalDays: 'Iš viso dienų', totalWeeks: 'Iš viso savaičių', totalMonths: 'Iš viso mėnesių', workingDays: 'Darbo dienų',
    weekends: 'Savaitgalių',
    errEmpty: 'Užpildykite abi datas.', errOrder: 'Pradžios data turi būti anksčiau nei pabaigos.',
    fromTo: 'Nuo — Iki',
  },
};

type Result = {
  years: number; months: number; weeks: number; days: number;
  totalDays: number; totalWeeks: number; totalMonths: number;
  workingDays: number; weekends: number;
};

function countWorkingDays(start: Date, end: Date): { working: number; weekends: number } {
  let working = 0, weekends = 0;
  const cur = new Date(start);
  while (cur < end) {
    const dow = cur.getDay();
    if (dow === 0 || dow === 6) weekends++; else working++;
    cur.setDate(cur.getDate() + 1);
  }
  return { working, weekends };
}

function calcDiff(start: Date, end: Date): Result {
  const totalDays = Math.round((end.getTime() - start.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) { months--; const prev = new Date(end.getFullYear(), end.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { months += 12; years--; }
  const weeks = Math.floor(days / 7);
  const remainDays = days % 7;

  const totalMonths = years * 12 + months;
  const { working, weekends } = countWorkingDays(start, end);

  return { years, months, weeks, days: remainDays, totalDays, totalWeeks, totalMonths, workingDays: working, weekends };
}

export default function DateDiffCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const today = new Date().toISOString().split('T')[0];
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!start || !end) { setError(t.errEmpty); return; }
    const s = new Date(start), e = new Date(end);
    if (s >= e) { setError(t.errOrder); return; }
    setError('');
    setResult(calcDiff(s, e));
  };

  const swap = () => { setStart(end); setEnd(start); setResult(null); setError(''); };
  const reset = () => { setStart(''); setEnd(''); setResult(null); setError(''); };

  return (
    <div className={styles['dd-calc']}>
      <div className={styles['dd-calc__form']}>
        <div className={styles['dd-calc__dates']}>
          <div className={styles['dd-calc__field']}>
            <label className={styles['dd-calc__label']}>{t.startDate}</label>
            <input type="date" className={styles['dd-calc__input']} value={start}
              onChange={e => { setStart(e.target.value); setResult(null); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && calculate()} />
          </div>
          <button type="button" className={styles['dd-calc__swap']} onClick={swap} aria-label={t.swap}>⇄</button>
          <div className={styles['dd-calc__field']}>
            <label className={styles['dd-calc__label']}>{t.endDate}</label>
            <input type="date" className={styles['dd-calc__input']} value={end}
              onChange={e => { setEnd(e.target.value); setResult(null); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && calculate()} />
          </div>
        </div>

        {error && <p className={styles['dd-calc__error']}>{error}</p>}

        <div className={styles['dd-calc__actions']}>
          <button type="button" className={styles['dd-calc__btn']} onClick={calculate}>{t.calculate}</button>
          <button type="button" className={styles['dd-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {result && (
        <div className={styles['dd-calc__result']}>
          <div className={styles['dd-calc__main']}>
            {result.years > 0 && (
              <div className={styles['dd-calc__main-item']}>
                <span className={styles['dd-calc__big']}>{result.years}</span>
                <span className={styles['dd-calc__unit']}>{t.years}</span>
              </div>
            )}
            {result.months > 0 && (
              <div className={styles['dd-calc__main-item']}>
                <span className={styles['dd-calc__big']}>{result.months}</span>
                <span className={styles['dd-calc__unit']}>{t.months}</span>
              </div>
            )}
            {result.weeks > 0 && (
              <div className={styles['dd-calc__main-item']}>
                <span className={styles['dd-calc__big']}>{result.weeks}</span>
                <span className={styles['dd-calc__unit']}>{t.weeks}</span>
              </div>
            )}
            <div className={styles['dd-calc__main-item']}>
              <span className={styles['dd-calc__big']}>{result.days}</span>
              <span className={styles['dd-calc__unit']}>{t.days}</span>
            </div>
          </div>

          <div className={styles['dd-calc__stats']}>
            {[
              { val: result.totalDays, label: t.totalDays },
              { val: result.totalWeeks, label: t.totalWeeks },
              { val: result.totalMonths, label: t.totalMonths },
              { val: result.workingDays, label: t.workingDays },
              { val: result.weekends, label: t.weekends },
            ].map(({ val, label }) => (
              <div key={label} className={styles['dd-calc__stat']}>
                <span className={styles['dd-calc__stat-value']}>{val.toLocaleString()}</span>
                <span className={styles['dd-calc__stat-label']}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
