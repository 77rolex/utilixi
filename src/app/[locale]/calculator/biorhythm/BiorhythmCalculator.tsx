'use client';

import { useState } from 'react';
import styles from './BiorhythmCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  birthLabel: string; dateLabel: string; btn: string;
  physical: string; emotional: string; intellectual: string;
  criticalDays: string; criticalNote: string;
  chartTitle: string; todayLabel: string;
  high: string; low: string; critical: string;
  errEmpty: string; errInvalid: string; errFuture: string;
}> = {
  en: {
    birthLabel: 'Date of birth', dateLabel: 'Target date', btn: 'Calculate Biorhythms',
    physical: 'Physical', emotional: 'Emotional', intellectual: 'Intellectual',
    criticalDays: 'Critical days in the next 30 days', criticalNote: 'Critical days occur when a cycle crosses zero — energy is transitioning and decisions should be made cautiously.',
    chartTitle: '30-day biorhythm chart', todayLabel: 'Today',
    high: 'High', low: 'Low', critical: 'Critical',
    errEmpty: 'Please fill in both dates.', errInvalid: 'Please enter a valid birth date.', errFuture: 'Birth date cannot be in the future.',
  },
  ru: {
    birthLabel: 'Дата рождения', dateLabel: 'Целевая дата', btn: 'Рассчитать биоритмы',
    physical: 'Физический', emotional: 'Эмоциональный', intellectual: 'Интеллектуальный',
    criticalDays: 'Критические дни в ближайшие 30 дней', criticalNote: 'Критические дни наступают, когда цикл пересекает ноль — энергия переходит, решения лучше принимать осторожно.',
    chartTitle: '30-дневный график биоритмов', todayLabel: 'Сегодня',
    high: 'Высокий', low: 'Низкий', critical: 'Критический',
    errEmpty: 'Заполните обе даты.', errInvalid: 'Введите корректную дату рождения.', errFuture: 'Дата рождения не может быть в будущем.',
  },
  uk: {
    birthLabel: 'Дата народження', dateLabel: 'Цільова дата', btn: 'Розрахувати біоритми',
    physical: 'Фізичний', emotional: 'Емоційний', intellectual: 'Інтелектуальний',
    criticalDays: 'Критичні дні в найближчі 30 днів', criticalNote: 'Критичні дні настають, коли цикл перетинає нуль — енергія переходить, рішення краще приймати обережно.',
    chartTitle: '30-денний графік біоритмів', todayLabel: 'Сьогодні',
    high: 'Високий', low: 'Низький', critical: 'Критичний',
    errEmpty: 'Заповніть обидві дати.', errInvalid: 'Введіть коректну дату народження.', errFuture: 'Дата народження не може бути у майбутньому.',
  },
  fr: {
    birthLabel: 'Date de naissance', dateLabel: 'Date cible', btn: 'Calculer mes biorythmes',
    physical: 'Physique', emotional: 'Émotionnel', intellectual: 'Intellectuel',
    criticalDays: 'Jours critiques dans les 30 prochains jours', criticalNote: 'Les jours critiques surviennent quand un cycle passe par zéro — l\'énergie est en transition, prenez vos décisions avec prudence.',
    chartTitle: 'Graphique des biorythmes sur 30 jours', todayLabel: "Aujourd'hui",
    high: 'Élevé', low: 'Bas', critical: 'Critique',
    errEmpty: 'Veuillez remplir les deux dates.', errInvalid: 'Veuillez entrer une date de naissance valide.', errFuture: 'La date de naissance ne peut pas être dans le futur.',
  },
  lt: {
    birthLabel: 'Gimimo data', dateLabel: 'Tikslinė data', btn: 'Apskaičiuoti bioritmus',
    physical: 'Fizinis', emotional: 'Emocinis', intellectual: 'Intelektualinis',
    criticalDays: 'Kritinės dienos per artimiausias 30 dienų', criticalNote: 'Kritinės dienos atsiranda kai ciklas kerta nulį — energija keičiasi, sprendimai turėtų būti priimami atsargiai.',
    chartTitle: '30 dienų bioritmo grafikas', todayLabel: 'Šiandien',
    high: 'Aukštas', low: 'Žemas', critical: 'Kritinis',
    errEmpty: 'Užpildykite abi datas.', errInvalid: 'Įveskite galiojančią gimimo datą.', errFuture: 'Gimimo data negali būti ateityje.',
  },
};

function bioValue(daysSinceBirth: number, period: number): number {
  return Math.sin((2 * Math.PI * daysSinceBirth) / period);
}

function isCritical(v: number): boolean {
  return Math.abs(v) < 0.12;
}

function levelLabel(v: number, t: typeof T['en']): string {
  if (isCritical(v)) return t.critical;
  return v >= 0 ? t.high : t.low;
}

function pct(v: number): number {
  return Math.round(v * 100);
}

export default function BiorhythmCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const today = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState('');
  const [targetDate, setTargetDate] = useState(today);
  const [result, setResult] = useState<{ phys: number; emo: number; intel: number; daysSince: number; target: Date } | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!birth || !targetDate) { setError(t.errEmpty); setResult(null); return; }
    const b = new Date(birth);
    const d = new Date(targetDate);
    if (isNaN(b.getTime()) || b.getFullYear() < 1900) { setError(t.errInvalid); setResult(null); return; }
    if (b > new Date()) { setError(t.errFuture); setResult(null); return; }
    setError('');
    const daysSince = Math.floor((d.getTime() - b.getTime()) / 86400000);
    setResult({
      phys: bioValue(daysSince, 23),
      emo: bioValue(daysSince, 28),
      intel: bioValue(daysSince, 33),
      daysSince,
      target: d,
    });
  };

  const getCriticalDays = () => {
    if (!result) return [];
    const days: { date: string; cycles: string[] }[] = [];
    for (let i = 1; i <= 30; i++) {
      const ds = result.daysSince + i;
      const d = new Date(result.target);
      d.setDate(d.getDate() + i);
      const cycles: string[] = [];
      if (isCritical(bioValue(ds, 23))) cycles.push(t.physical);
      if (isCritical(bioValue(ds, 28))) cycles.push(t.emotional);
      if (isCritical(bioValue(ds, 33))) cycles.push(t.intellectual);
      if (cycles.length > 0) {
        days.push({ date: d.toLocaleDateString(locale === 'ru' || locale === 'uk' ? 'ru-RU' : locale === 'fr' ? 'fr-FR' : locale === 'lt' ? 'lt-LT' : 'en-GB', { day: 'numeric', month: 'short' }), cycles });
      }
    }
    return days;
  };

  const SVG_W = 600;
  const SVG_H = 180;
  const DAYS = 30;
  const PAD_L = 4;
  const PAD_R = 4;
  const PAD_V = 16;
  const mid = SVG_H / 2;
  const amp = (SVG_H / 2) - PAD_V;

  const makePath = (ds: number, period: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= DAYS; i++) {
      const x = PAD_L + (i / DAYS) * (SVG_W - PAD_L - PAD_R);
      const y = mid - bioValue(ds - Math.floor(DAYS / 2) + i, period) * amp;
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const todayX = PAD_L + (Math.floor(DAYS / 2) / DAYS) * (SVG_W - PAD_L - PAD_R);

  return (
    <div className={styles.calc}>
      <div className={styles.calc__row}>
        <div className={styles.calc__field}>
          <label className={styles.calc__label}>{t.birthLabel}</label>
          <input
            type="date"
            className={styles.calc__input}
            value={birth}
            max={today}
            onChange={(e) => { setBirth(e.target.value); setError(''); setResult(null); }}
          />
        </div>
        <div className={styles.calc__field}>
          <label className={styles.calc__label}>{t.dateLabel}</label>
          <input
            type="date"
            className={styles.calc__input}
            value={targetDate}
            onChange={(e) => { setTargetDate(e.target.value); setError(''); setResult(null); }}
          />
        </div>
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}

      {result && (
        <div className={styles.calc__result}>
          <div className={styles.calc__gauges}>
            {[
              { label: t.physical, val: result.phys, color: '#EF4444', cls: 'phys' },
              { label: t.emotional, val: result.emo, color: '#8B5CF6', cls: 'emo' },
              { label: t.intellectual, val: result.intel, color: '#3B82F6', cls: 'intel' },
            ].map(({ label, val, color, cls }) => (
              <div key={cls} className={styles.calc__gauge}>
                <div className={styles.calc__gauge_label} style={{ color }}>{label}</div>
                <div className={styles.calc__gauge_track}>
                  <div
                    className={styles.calc__gauge_fill}
                    style={{ width: `${Math.abs(val) * 100}%`, background: color, opacity: val < 0 ? 0.45 : 1, marginLeft: val < 0 ? 'auto' : undefined }}
                  />
                </div>
                <div className={`${styles.calc__gauge_pct} ${isCritical(val) ? styles['calc__gauge_pct--critical'] : ''}`}>
                  {isCritical(val) ? '⚠ ' : ''}{pct(val)}% — {levelLabel(val, t)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.calc__chart_wrap}>
            <p className={styles.calc__chart_title}>{t.chartTitle}</p>
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className={styles.calc__svg}
              aria-hidden="true"
            >
              <line x1={PAD_L} y1={mid} x2={SVG_W - PAD_R} y2={mid} stroke="#E5E7EB" strokeWidth="1" />
              <line x1={todayX} y1={PAD_V / 2} x2={todayX} y2={SVG_H - PAD_V / 2} stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 3" />
              <path d={makePath(result.daysSince, 23)} fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <path d={makePath(result.daysSince, 28)} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
              <path d={makePath(result.daysSince, 33)} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className={styles.calc__legend}>
              <span className={styles.calc__legend_item} style={{ color: '#EF4444' }}>━ {t.physical}</span>
              <span className={styles.calc__legend_item} style={{ color: '#8B5CF6' }}>━ {t.emotional}</span>
              <span className={styles.calc__legend_item} style={{ color: '#3B82F6' }}>━ {t.intellectual}</span>
              <span className={styles.calc__legend_item} style={{ color: '#9CA3AF' }}>╌ {t.todayLabel}</span>
            </div>
          </div>

          {getCriticalDays().length > 0 && (
            <div className={styles.calc__critical}>
              <h3 className={styles.calc__critical_title}>{t.criticalDays}</h3>
              <div className={styles.calc__critical_list}>
                {getCriticalDays().map((d, i) => (
                  <div key={i} className={styles.calc__critical_item}>
                    <span className={styles.calc__critical_date}>⚠ {d.date}</span>
                    <span className={styles.calc__critical_cycles}>{d.cycles.join(', ')}</span>
                  </div>
                ))}
              </div>
              <p className={styles.calc__critical_note}>{t.criticalNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
