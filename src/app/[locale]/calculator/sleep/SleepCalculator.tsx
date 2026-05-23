'use client';

import { useState } from 'react';
import styles from './SleepCalculator.module.scss';

const L: Record<string, Record<string, string>> = {
  mode1:      { en: 'Wake up at…', ru: 'Проснуться в…', uk: 'Прокинутись о…', fr: 'Se réveiller à…', lt: 'Pabusti…' },
  mode2:      { en: 'Go to sleep at…', ru: 'Лечь спать в…', uk: 'Лягти спати о…', fr: 'Dormir à…', lt: 'Eiti miegoti…' },
  mode3:      { en: 'Sleep now', ru: 'Лечь спать сейчас', uk: 'Лягти спати зараз', fr: 'Dormir maintenant', lt: 'Eiti miegoti dabar' },
  wakeTime:   { en: 'Wake-up time', ru: 'Время подъёма', uk: 'Час підйому', fr: 'Heure de réveil', lt: 'Pabudimo laikas' },
  sleepTime:  { en: 'Bedtime', ru: 'Время отхода ко сну', uk: 'Час відходу до сну', fr: 'Heure du coucher', lt: 'Miego laikas' },
  calculate:  { en: 'Calculate', ru: 'Рассчитать', uk: 'Розрахувати', fr: 'Calculer', lt: 'Skaičiuoti' },
  fallAsleep: { en: 'Average time to fall asleep: ~14 minutes', ru: 'Среднее время засыпания: ~14 минут', uk: 'Середній час засинання: ~14 хвилин', fr: 'Temps moyen d\'endormissement : ~14 min', lt: 'Vidutinis užmigimo laikas: ~14 minučių' },
  sleepAt:    { en: 'Go to sleep at:', ru: 'Ложитесь спать в:', uk: 'Лягайте спати о:', fr: 'Allez dormir à :', lt: 'Eikite miegoti:' },
  wakeAt:     { en: 'Wake up at:', ru: 'Просыпайтесь в:', uk: 'Прокидайтесь о:', fr: 'Réveillez-vous à :', lt: 'Pabudimo laikas:' },
  cycles:     { en: 'cycles', ru: 'цикла(ов)', uk: 'цикли(ів)', fr: 'cycles', lt: 'ciklų' },
  hours:      { en: 'h', ru: 'ч', uk: 'год', fr: 'h', lt: 'val.' },
  min:        { en: 'min', ru: 'мин', uk: 'хв', fr: 'min', lt: 'min' },
  recommended:{ en: '(recommended)', ru: '(рекомендуется)', uk: '(рекомендується)', fr: '(recommandé)', lt: '(rekomenduojama)' },
  hint:       { en: 'Sleep cycles last ~90 minutes. Waking between cycles feels most natural.',
                ru: 'Каждый цикл сна длится ~90 минут. Пробуждение между циклами — наиболее естественное.',
                uk: 'Кожен цикл сну триває ~90 хвилин. Пробудження між циклами — найбільш природне.',
                fr: 'Les cycles de sommeil durent ~90 min. Se réveiller entre cycles est plus naturel.',
                lt: 'Miego ciklai trunka ~90 min. Pabusti tarp ciklų yra natūraliausia.' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Mode = 'wake' | 'sleep' | 'now';

const CYCLES = [2, 3, 4, 5, 6];
const FALL_ASLEEP_MIN = 14;

function addMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function subtractMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  let total = h * 60 + m - minutes;
  if (total < 0) total += 24 * 60;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function getNow(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export default function SleepCalculator({ locale }: { locale: string }) {
  const [mode, setMode] = useState<Mode>('wake');
  const [time, setTime] = useState('07:00');
  const [results, setResults] = useState<{ cycles: number; time: string; totalMin: number }[] | null>(null);

  function calculate() {
    const baseTime = mode === 'now' ? getNow() : time;
    const out: { cycles: number; time: string; totalMin: number }[] = [];

    if (mode === 'wake') {
      for (const c of CYCLES) {
        const totalMin = c * 90 + FALL_ASLEEP_MIN;
        const bedtime = subtractMinutes(baseTime, totalMin);
        out.push({ cycles: c, time: bedtime, totalMin: c * 90 });
      }
    } else {
      for (const c of CYCLES) {
        const totalMin = c * 90 + FALL_ASLEEP_MIN;
        const wakeTime = addMinutes(baseTime, totalMin);
        out.push({ cycles: c, time: wakeTime, totalMin: c * 90 });
      }
    }
    setResults(out.reverse());
  }

  const showTimeInput = mode !== 'now';

  return (
    <div className={styles['sleep-calc']}>
      <div className={styles['sleep-calc__modes']}>
        {(['wake', 'sleep', 'now'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles['sleep-calc__mode-btn']}${mode === m ? ` ${styles['sleep-calc__mode-btn--active']}` : ''}`}
            onClick={() => { setMode(m); setResults(null); }}
          >
            {t(m === 'wake' ? 'mode1' : m === 'sleep' ? 'mode2' : 'mode3', locale)}
          </button>
        ))}
      </div>

      {showTimeInput && (
        <div className={styles['sleep-calc__time-input']}>
          <label className={styles['sleep-calc__label']}>
            {mode === 'wake' ? t('wakeTime', locale) : t('sleepTime', locale)}
          </label>
          <input
            type="time"
            className={styles['sleep-calc__input']}
            value={time}
            onChange={(e) => { setTime(e.target.value); setResults(null); }}
          />
        </div>
      )}

      <p className={styles['sleep-calc__hint']}>{t('hint', locale)}</p>

      <button type="button" className={styles['sleep-calc__btn']} onClick={calculate}>
        {t('calculate', locale)}
      </button>

      {results && (
        <div className={styles['sleep-calc__results']}>
          <p className={styles['sleep-calc__fall-asleep']}>{t('fallAsleep', locale)}</p>
          <div className={styles['sleep-calc__result-list']}>
            {results.map(({ cycles, time: resTime, totalMin }) => {
              const h = Math.floor(totalMin / 60);
              const m = totalMin % 60;
              const isRecommended = cycles === 5 || cycles === 6;
              return (
                <div key={cycles} className={`${styles['sleep-calc__result-item']}${isRecommended ? ` ${styles['sleep-calc__result-item--recommended']}` : ''}`}>
                  <div className={styles['sleep-calc__result-time-block']}>
                    <span className={styles['sleep-calc__result-label']}>
                      {mode === 'wake' ? t('sleepAt', locale) : t('wakeAt', locale)}
                    </span>
                    <span className={styles['sleep-calc__result-time']}>{resTime}</span>
                  </div>
                  <div className={styles['sleep-calc__result-meta']}>
                    <span className={styles['sleep-calc__result-cycles']}>{cycles} {t('cycles', locale)}</span>
                    <span className={styles['sleep-calc__result-duration']}>
                      {h}{t('hours', locale)} {m > 0 ? `${m} ${t('min', locale)}` : ''}
                    </span>
                    {isRecommended && (
                      <span className={styles['sleep-calc__result-recommended']}>{t('recommended', locale)}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
