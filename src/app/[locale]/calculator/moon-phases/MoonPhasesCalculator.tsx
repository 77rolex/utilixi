'use client';

import { useState, useEffect } from 'react';
import styles from './MoonPhasesCalculator.module.scss';

const T: Record<string, {
  dateLabel: string;
  today: string;
  illumination: string;
  nextPhases: string;
  newMoon: string;
  firstQuarter: string;
  fullMoon: string;
  lastQuarter: string;
  upcomingNew: string;
  upcomingFull: string;
  phaseNames: Record<string, string>;
  months: string[];
}> = {
  en: {
    dateLabel: 'Select Date',
    today: 'Today',
    illumination: 'Illumination',
    nextPhases: 'Upcoming Phases',
    newMoon: 'New Moon',
    firstQuarter: 'First Quarter',
    fullMoon: 'Full Moon',
    lastQuarter: 'Last Quarter',
    upcomingNew: 'New Moons',
    upcomingFull: 'Full Moons',
    phaseNames: {
      new: 'New Moon', waxing_crescent: 'Waxing Crescent', first_quarter: 'First Quarter',
      waxing_gibbous: 'Waxing Gibbous', full: 'Full Moon', waning_gibbous: 'Waning Gibbous',
      last_quarter: 'Last Quarter', waning_crescent: 'Waning Crescent',
    },
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  },
  ru: {
    dateLabel: 'Выберите дату',
    today: 'Сегодня',
    illumination: 'Освещённость',
    nextPhases: 'Предстоящие фазы',
    newMoon: 'Новолуние',
    firstQuarter: 'Первая четверть',
    fullMoon: 'Полнолуние',
    lastQuarter: 'Последняя четверть',
    upcomingNew: 'Новолуния',
    upcomingFull: 'Полнолуния',
    phaseNames: {
      new: 'Новолуние', waxing_crescent: 'Молодой месяц', first_quarter: 'Первая четверть',
      waxing_gibbous: 'Растущая Луна', full: 'Полнолуние', waning_gibbous: 'Убывающая Луна',
      last_quarter: 'Последняя четверть', waning_crescent: 'Старый месяц',
    },
    months: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
  },
  uk: {
    dateLabel: 'Оберіть дату',
    today: 'Сьогодні',
    illumination: 'Освітленість',
    nextPhases: 'Наступні фази',
    newMoon: 'Новий місяць',
    firstQuarter: 'Перша чверть',
    fullMoon: 'Повний місяць',
    lastQuarter: 'Остання чверть',
    upcomingNew: 'Новолуніє',
    upcomingFull: 'Повні місяці',
    phaseNames: {
      new: 'Новий місяць', waxing_crescent: 'Молодик', first_quarter: 'Перша чверть',
      waxing_gibbous: 'Місяць прибуває', full: 'Повний місяць', waning_gibbous: 'Місяць спадає',
      last_quarter: 'Остання чверть', waning_crescent: 'Серп, що спадає',
    },
    months: ['січ','лют','бер','квіт','трав','черв','лип','серп','вер','жовт','лист','груд'],
  },
  fr: {
    dateLabel: 'Choisir la date',
    today: "Aujourd'hui",
    illumination: 'Illumination',
    nextPhases: 'Prochaines phases',
    newMoon: 'Nouvelle Lune',
    firstQuarter: 'Premier Quartier',
    fullMoon: 'Pleine Lune',
    lastQuarter: 'Dernier Quartier',
    upcomingNew: 'Nouvelles Lunes',
    upcomingFull: 'Pleines Lunes',
    phaseNames: {
      new: 'Nouvelle Lune', waxing_crescent: 'Croissant croissant', first_quarter: 'Premier Quartier',
      waxing_gibbous: 'Gibbeuse croissante', full: 'Pleine Lune', waning_gibbous: 'Gibbeuse décroissante',
      last_quarter: 'Dernier Quartier', waning_crescent: 'Croissant décroissant',
    },
    months: ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc'],
  },
  lt: {
    dateLabel: 'Pasirinkite datą',
    today: 'Šiandien',
    illumination: 'Apšvietimas',
    nextPhases: 'Būsimos fazės',
    newMoon: 'Jaunatis',
    firstQuarter: 'Pirmasis ketvirtis',
    fullMoon: 'Pilnatis',
    lastQuarter: 'Paskutinis ketvirtis',
    upcomingNew: 'Jaunatys',
    upcomingFull: 'Pilnatys',
    phaseNames: {
      new: 'Jaunatis', waxing_crescent: 'Jaunas mėnulis', first_quarter: 'Pirmasis ketvirtis',
      waxing_gibbous: 'Didėjantis mėnulis', full: 'Pilnatis', waning_gibbous: 'Mažėjantis mėnulis',
      last_quarter: 'Paskutinis ketvirtis', waning_crescent: 'Senas mėnulis',
    },
    months: ['sau','vas','kov','bal','geg','bir','lie','rugp','rugs','spal','lapkr','gruod'],
  },
};

const PHASE_EMOJI: Record<string, string> = {
  new: '🌑', waxing_crescent: '🌒', first_quarter: '🌓', waxing_gibbous: '🌔',
  full: '🌕', waning_gibbous: '🌖', last_quarter: '🌗', waning_crescent: '🌘',
};

const SYNODIC = 29.530588853;
const KNOWN_NM_JD = 2451550.1; // New Moon: Jan 6, 2000 18:14 UTC

function julianDay(date: Date): number {
  let y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  const d = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60) / 24;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function fromJulianDay(jd: number): Date {
  const jd1 = jd + 0.5;
  const Z = Math.floor(jd1);
  const F = jd1 - Z;
  const A = Z < 2299161 ? Z : (() => {
    const a = Math.floor((Z - 1867216.25) / 36524.25);
    return Z + 1 + a - Math.floor(a / 4);
  })();
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  return new Date(Date.UTC(year, month - 1, day, Math.round(F * 24)));
}

function moonAge(date: Date): number {
  const jd = julianDay(date);
  return ((jd - KNOWN_NM_JD) % SYNODIC + SYNODIC) % SYNODIC;
}

function getPhaseName(age: number): string {
  const p = age / SYNODIC;
  if (p < 0.025 || p >= 0.975) return 'new';
  if (p < 0.25) return 'waxing_crescent';
  if (p < 0.275) return 'first_quarter';
  if (p < 0.5) return 'waxing_gibbous';
  if (p < 0.525) return 'full';
  if (p < 0.75) return 'waning_gibbous';
  if (p < 0.775) return 'last_quarter';
  return 'waning_crescent';
}

function getIllumination(age: number): number {
  return Math.round((1 - Math.cos(2 * Math.PI * age / SYNODIC)) / 2 * 100);
}

function nextPhaseDate(fromDate: Date, targetAge: number): Date {
  const cur = moonAge(fromDate);
  let days = targetAge - cur;
  if (days <= 0) days += SYNODIC;
  return fromJulianDay(julianDay(fromDate) + days);
}

function upcomingPhases(fromDate: Date) {
  const newMoons: Date[] = [];
  const fullMoons: Date[] = [];
  let d = new Date(fromDate);
  for (let i = 0; i < 6; i++) {
    const nm = nextPhaseDate(d, 0);
    newMoons.push(nm);
    d = new Date(nm.getTime() + 2 * 86400000);
  }
  d = new Date(fromDate);
  for (let i = 0; i < 6; i++) {
    const fm = nextPhaseDate(d, SYNODIC / 2);
    fullMoons.push(fm);
    d = new Date(fm.getTime() + 2 * 86400000);
  }
  return { newMoons, fullMoons };
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type Result = {
  phaseName: string;
  illumination: number;
  nextNew: Date; nextFirstQ: Date; nextFull: Date; nextLastQ: Date;
  newMoons: Date[]; fullMoons: Date[];
};

function compute(ds: string): Result {
  const date = new Date(ds + 'T12:00:00Z');
  const age = moonAge(date);
  const { newMoons, fullMoons } = upcomingPhases(date);
  return {
    phaseName: getPhaseName(age),
    illumination: getIllumination(age),
    nextNew: nextPhaseDate(date, 0),
    nextFirstQ: nextPhaseDate(date, SYNODIC * 0.25),
    nextFull: nextPhaseDate(date, SYNODIC * 0.5),
    nextLastQ: nextPhaseDate(date, SYNODIC * 0.75),
    newMoons,
    fullMoons,
  };
}

export default function MoonPhasesCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [dateStr, setDateStr] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const s = todayStr();
    setDateStr(s);
    setResult(compute(s));
  }, []);

  function handleDate(s: string) {
    if (!s) return;
    setDateStr(s);
    setResult(compute(s));
  }

  function fmt(date: Date): string {
    return `${date.getUTCDate()} ${t.months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }

  const nextCards = result ? [
    { label: t.newMoon, emoji: '🌑', date: result.nextNew },
    { label: t.firstQuarter, emoji: '🌓', date: result.nextFirstQ },
    { label: t.fullMoon, emoji: '🌕', date: result.nextFull },
    { label: t.lastQuarter, emoji: '🌗', date: result.nextLastQ },
  ] : [];

  return (
    <div className={styles.moon}>
      <div className={styles.moon__controls}>
        <label className={styles.moon__label}>{t.dateLabel}</label>
        <div className={styles.moon__input_row}>
          <input
            type="date"
            className={styles.moon__input}
            value={dateStr}
            onChange={(e) => handleDate(e.target.value)}
          />
          <button
            type="button"
            className={styles.moon__today_btn}
            onClick={() => handleDate(todayStr())}
          >
            {t.today}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className={styles.moon__main}>
            <div className={styles.moon__emoji}>{PHASE_EMOJI[result.phaseName]}</div>
            <div className={styles.moon__info}>
              <div className={styles.moon__phase_name}>{t.phaseNames[result.phaseName]}</div>
              <div className={styles.moon__illum_row}>
                <span className={styles.moon__illum_label}>{t.illumination}</span>
                <span className={styles.moon__illum_value}>{result.illumination}%</span>
              </div>
              <div className={styles.moon__bar_wrap}>
                <div className={styles.moon__bar} style={{ width: `${result.illumination}%` }} />
              </div>
            </div>
          </div>

          <div className={styles.moon__section_title}>{t.nextPhases}</div>
          <div className={styles.moon__next_grid}>
            {nextCards.map(({ label, emoji, date }) => (
              <div key={label} className={styles.moon__next_card}>
                <span className={styles.moon__next_emoji}>{emoji}</span>
                <span className={styles.moon__next_label}>{label}</span>
                <span className={styles.moon__next_date}>{fmt(date)}</span>
              </div>
            ))}
          </div>

          <div className={styles.moon__calendar}>
            <div className={styles.moon__cal_col}>
              <div className={styles.moon__cal_title}>🌑 {t.upcomingNew}</div>
              <ul className={styles.moon__cal_list}>
                {result.newMoons.map((d, i) => (
                  <li key={i} className={styles.moon__cal_item}>{fmt(d)}</li>
                ))}
              </ul>
            </div>
            <div className={styles.moon__cal_col}>
              <div className={styles.moon__cal_title}>🌕 {t.upcomingFull}</div>
              <ul className={styles.moon__cal_list}>
                {result.fullMoons.map((d, i) => (
                  <li key={i} className={styles.moon__cal_item}>{fmt(d)}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
