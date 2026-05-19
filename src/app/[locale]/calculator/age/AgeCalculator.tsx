'use client';

import { useState } from 'react';
import styles from './AgeCalculator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  dob: string; calculate: string; reset: string;
  years: string; months: string; days: string;
  totalDays: string; totalWeeks: string; totalMonths: string;
  nextBirthday: string; nextIn: string; today: string;
  age: string;
  errEmpty: string; errFuture: string;
  daysShort: string; weeksShort: string;
}> = {
  en: {
    dob: 'Date of birth', calculate: 'Calculate', reset: 'Reset',
    years: 'Years', months: 'Months', days: 'Days',
    totalDays: 'Total days lived', totalWeeks: 'Total weeks', totalMonths: 'Total months',
    nextBirthday: 'Next birthday', nextIn: 'in', today: 'Today! 🎉',
    age: 'Your age',
    errEmpty: 'Enter your date of birth.', errFuture: 'Date of birth cannot be in the future.',
    daysShort: 'd', weeksShort: 'wk',
  },
  ru: {
    dob: 'Дата рождения', calculate: 'Рассчитать', reset: 'Сбросить',
    years: 'Лет', months: 'Месяцев', days: 'Дней',
    totalDays: 'Всего дней прожито', totalWeeks: 'Всего недель', totalMonths: 'Всего месяцев',
    nextBirthday: 'Следующий день рождения', nextIn: 'через', today: 'Сегодня! 🎉',
    age: 'Ваш возраст',
    errEmpty: 'Введите дату рождения.', errFuture: 'Дата рождения не может быть в будущем.',
    daysShort: 'д', weeksShort: 'нед',
  },
  uk: {
    dob: 'Дата народження', calculate: 'Розрахувати', reset: 'Скинути',
    years: 'Років', months: 'Місяців', days: 'Днів',
    totalDays: 'Всього днів прожито', totalWeeks: 'Всього тижнів', totalMonths: 'Всього місяців',
    nextBirthday: 'Наступний день народження', nextIn: 'через', today: 'Сьогодні! 🎉',
    age: 'Ваш вік',
    errEmpty: 'Введіть дату народження.', errFuture: 'Дата народження не може бути в майбутньому.',
    daysShort: 'д', weeksShort: 'тиж',
  },
  fr: {
    dob: 'Date de naissance', calculate: 'Calculer', reset: 'Réinitialiser',
    years: 'Ans', months: 'Mois', days: 'Jours',
    totalDays: 'Total de jours vécus', totalWeeks: 'Total de semaines', totalMonths: 'Total de mois',
    nextBirthday: 'Prochain anniversaire', nextIn: 'dans', today: 'Aujourd\'hui ! 🎉',
    age: 'Votre âge',
    errEmpty: 'Entrez votre date de naissance.', errFuture: 'La date de naissance ne peut pas être dans le futur.',
    daysShort: 'j', weeksShort: 'sem',
  },
  lt: {
    dob: 'Gimimo data', calculate: 'Skaičiuoti', reset: 'Išvalyti',
    years: 'Metai', months: 'Mėnesiai', days: 'Dienos',
    totalDays: 'Iš viso dienų', totalWeeks: 'Iš viso savaičių', totalMonths: 'Iš viso mėnesių',
    nextBirthday: 'Kitas gimtadienis', nextIn: 'po', today: 'Šiandien! 🎉',
    age: 'Jūsų amžius',
    errEmpty: 'Įveskite gimimo datą.', errFuture: 'Gimimo data negali būti ateityje.',
    daysShort: 'd', weeksShort: 'sav',
  },
};

type Result = {
  years: number; months: number; days: number;
  totalDays: number; totalWeeks: number; totalMonths: number;
  nextBirthdayDays: number;
};

function calcAge(dob: Date, now: Date): Result {
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { months += 12; years--; }

  const totalDays = Math.floor((now.getTime() - dob.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  const nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);

  return { years, months, days, totalDays, totalWeeks, totalMonths, nextBirthdayDays };
}

export default function AgeCalculator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [dob, setDob] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!dob) { setError(t.errEmpty); return; }
    const date = new Date(dob);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (date > now) { setError(t.errFuture); return; }
    setError('');
    setResult(calcAge(date, now));
  };

  const reset = () => { setDob(''); setResult(null); setError(''); };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles['age-calc']}>
      <div className={styles['age-calc__form']}>
        <div className={styles['age-calc__field']}>
          <label className={styles['age-calc__label']}>{t.dob}</label>
          <input
            type="date"
            className={styles['age-calc__input']}
            value={dob}
            max={today}
            onChange={e => { setDob(e.target.value); setError(''); setResult(null); }}
            onKeyDown={e => e.key === 'Enter' && calculate()}
          />
        </div>

        {error && <p className={styles['age-calc__error']}>{error}</p>}

        <div className={styles['age-calc__actions']}>
          <button type="button" className={styles['age-calc__btn']} onClick={calculate}>{t.calculate}</button>
          <button type="button" className={styles['age-calc__btn--reset']} onClick={reset}>{t.reset}</button>
        </div>
      </div>

      {result && (
        <div className={styles['age-calc__result']}>
          <div className={styles['age-calc__main']}>
            <span className={styles['age-calc__main-label']}>{t.age}</span>
            <div className={styles['age-calc__main-value']}>
              <div className={styles['age-calc__main-item']}>
                <span className={styles['age-calc__big']}>{result.years}</span>
                <span className={styles['age-calc__unit']}>{t.years}</span>
              </div>
              <div className={styles['age-calc__main-item']}>
                <span className={styles['age-calc__big']}>{result.months}</span>
                <span className={styles['age-calc__unit']}>{t.months}</span>
              </div>
              <div className={styles['age-calc__main-item']}>
                <span className={styles['age-calc__big']}>{result.days}</span>
                <span className={styles['age-calc__unit']}>{t.days}</span>
              </div>
            </div>
          </div>

          <div className={styles['age-calc__stats']}>
            <div className={styles['age-calc__stat']}>
              <span className={styles['age-calc__stat-value']}>{result.totalDays.toLocaleString()}</span>
              <span className={styles['age-calc__stat-label']}>{t.totalDays}</span>
            </div>
            <div className={styles['age-calc__stat']}>
              <span className={styles['age-calc__stat-value']}>{result.totalWeeks.toLocaleString()}</span>
              <span className={styles['age-calc__stat-label']}>{t.totalWeeks}</span>
            </div>
            <div className={styles['age-calc__stat']}>
              <span className={styles['age-calc__stat-value']}>{result.totalMonths.toLocaleString()}</span>
              <span className={styles['age-calc__stat-label']}>{t.totalMonths}</span>
            </div>
          </div>

          <div className={styles['age-calc__birthday']}>
            <span className={styles['age-calc__birthday-label']}>{t.nextBirthday}</span>
            <span className={styles['age-calc__birthday-value']}>
              {result.nextBirthdayDays === 0
                ? t.today
                : `${t.nextIn} ${result.nextBirthdayDays} ${t.daysShort}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
