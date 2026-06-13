'use client';

import { useState, useCallback } from 'react';
import styles from './CalorieDeficitCalculator.module.scss';

type Props = { locale: string };
type Unit = 'metric' | 'imperial';

const T: Record<string, {
  metric: string;
  imperial: string;
  currentWeight: string;
  goalWeight: string;
  weeks: string;
  kg: string;
  lbs: string;
  weeksUnit: string;
  calculate: string;
  weightDiff: string;
  dailyDeficit: string;
  kcalDay: string;
  totalDeficit: string;
  kcalTotal: string;
  safeLabel: string;
  moderateLabel: string;
  riskyLabel: string;
  warningText: string;
  gainLabel: string;
  alreadyAtGoal: string;
  error: string;
}> = {
  en: {
    metric: 'Metric (kg)',
    imperial: 'Imperial (lbs)',
    currentWeight: 'Current weight',
    goalWeight: 'Goal weight',
    weeks: 'Time to reach goal',
    kg: 'kg',
    lbs: 'lbs',
    weeksUnit: 'weeks',
    calculate: 'Calculate',
    weightDiff: 'Weight to lose',
    dailyDeficit: 'Daily calorie deficit',
    kcalDay: 'kcal/day',
    totalDeficit: 'Total calorie deficit',
    kcalTotal: 'kcal',
    safeLabel: 'Safe (≤ 500 kcal/day)',
    moderateLabel: 'Moderate (500–750 kcal/day)',
    riskyLabel: 'Consult a doctor (> 750 kcal/day)',
    warningText: 'A deficit above 750 kcal/day may be unsafe. Consider a longer timeline or consult a healthcare professional.',
    gainLabel: 'Weight to gain',
    alreadyAtGoal: 'You are already at your goal weight!',
    error: 'Please enter valid positive numbers. Goal weight must differ from current weight.',
  },
  ru: {
    metric: 'Метрическая (кг)',
    imperial: 'Имперская (фунт)',
    currentWeight: 'Текущий вес',
    goalWeight: 'Целевой вес',
    weeks: 'Срок достижения цели',
    kg: 'кг',
    lbs: 'фунт',
    weeksUnit: 'нед.',
    calculate: 'Рассчитать',
    weightDiff: 'Нужно сбросить',
    dailyDeficit: 'Дефицит калорий в день',
    kcalDay: 'ккал/день',
    totalDeficit: 'Общий дефицит калорий',
    kcalTotal: 'ккал',
    safeLabel: 'Безопасно (≤ 500 ккал/день)',
    moderateLabel: 'Умеренно (500–750 ккал/день)',
    riskyLabel: 'Проконсультируйтесь с врачом (> 750 ккал/день)',
    warningText: 'Дефицит свыше 750 ккал/день может быть небезопасен. Рассмотрите более длительный срок или проконсультируйтесь со специалистом.',
    gainLabel: 'Нужно набрать',
    alreadyAtGoal: 'Вы уже достигли целевого веса!',
    error: 'Введите корректные положительные числа. Целевой вес должен отличаться от текущего.',
  },
  uk: {
    metric: 'Метрична (кг)',
    imperial: 'Імперська (фунт)',
    currentWeight: 'Поточна вага',
    goalWeight: 'Цільова вага',
    weeks: 'Термін досягнення цілі',
    kg: 'кг',
    lbs: 'фунт',
    weeksUnit: 'тиж.',
    calculate: 'Розрахувати',
    weightDiff: 'Потрібно скинути',
    dailyDeficit: 'Дефіцит калорій на день',
    kcalDay: 'ккал/день',
    totalDeficit: 'Загальний дефіцит калорій',
    kcalTotal: 'ккал',
    safeLabel: 'Безпечно (≤ 500 ккал/день)',
    moderateLabel: 'Помірно (500–750 ккал/день)',
    riskyLabel: 'Проконсультуйтесь з лікарем (> 750 ккал/день)',
    warningText: 'Дефіцит понад 750 ккал/день може бути небезпечним. Розгляньте довший термін або зверніться до фахівця.',
    gainLabel: 'Потрібно набрати',
    alreadyAtGoal: 'Ви вже досягли цільової ваги!',
    error: 'Введіть коректні додатні числа. Цільова вага має відрізнятися від поточної.',
  },
  fr: {
    metric: 'Métrique (kg)',
    imperial: 'Impérial (lbs)',
    currentWeight: 'Poids actuel',
    goalWeight: 'Poids cible',
    weeks: 'Délai pour atteindre l\'objectif',
    kg: 'kg',
    lbs: 'lbs',
    weeksUnit: 'semaines',
    calculate: 'Calculer',
    weightDiff: 'Poids à perdre',
    dailyDeficit: 'Déficit calorique quotidien',
    kcalDay: 'kcal/jour',
    totalDeficit: 'Déficit calorique total',
    kcalTotal: 'kcal',
    safeLabel: 'Sûr (≤ 500 kcal/jour)',
    moderateLabel: 'Modéré (500–750 kcal/jour)',
    riskyLabel: 'Consultez un médecin (> 750 kcal/jour)',
    warningText: 'Un déficit supérieur à 750 kcal/jour peut être risqué. Envisagez un délai plus long ou consultez un professionnel de santé.',
    gainLabel: 'Poids à prendre',
    alreadyAtGoal: 'Vous êtes déjà à votre poids cible !',
    error: 'Veuillez entrer des nombres positifs valides. Le poids cible doit différer du poids actuel.',
  },
  lt: {
    metric: 'Metrinė (kg)',
    imperial: 'Imperinė (svar.)',
    currentWeight: 'Dabartinis svoris',
    goalWeight: 'Tikslo svoris',
    weeks: 'Laikas tikslui pasiekti',
    kg: 'kg',
    lbs: 'svar.',
    weeksUnit: 'sav.',
    calculate: 'Skaičiuoti',
    weightDiff: 'Svoris numesti',
    dailyDeficit: 'Dienos kalorijų deficitas',
    kcalDay: 'kcal/dieną',
    totalDeficit: 'Bendras kalorijų deficitas',
    kcalTotal: 'kcal',
    safeLabel: 'Saugu (≤ 500 kcal/dieną)',
    moderateLabel: 'Vidutinis (500–750 kcal/dieną)',
    riskyLabel: 'Konsultuokitės su gydytoju (> 750 kcal/d.)',
    warningText: 'Deficitas virš 750 kcal/dieną gali būti nesaugus. Apsvarstykite ilgesnį terminą arba konsultuokitės su gydytoju.',
    gainLabel: 'Svoris priaugti',
    alreadyAtGoal: 'Jūs jau pasiekėte tikslo svorį!',
    error: 'Įveskite teigiamus skaičius. Tikslo svoris turi skirtis nuo dabartinio.',
  },
};

const KCAL_PER_KG = 7700;
const KCAL_PER_LB = 3500;

export default function CalorieDeficitCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [unit, setUnit] = useState<Unit>('metric');
  const [current, setCurrent] = useState('');
  const [goal, setGoal] = useState('');
  const [weeks, setWeeks] = useState('');
  const [result, setResult] = useState<{
    diff: number; totalKcal: number; dailyDeficit: number; isGain: boolean;
  } | null>(null);
  const [atGoal, setAtGoal] = useState(false);
  const [error, setError] = useState('');

  const handleUnit = (u: Unit) => { setUnit(u); setResult(null); setAtGoal(false); setError(''); };

  const handleCalculate = useCallback(() => {
    const c = parseFloat(current.replace(',', '.'));
    const g = parseFloat(goal.replace(',', '.'));
    const w = parseFloat(weeks.replace(',', '.'));
    if (isNaN(c) || c <= 0 || isNaN(g) || g <= 0 || isNaN(w) || w <= 0) {
      setError(t.error);
      setResult(null);
      setAtGoal(false);
      return;
    }
    setError('');
    const diff = c - g;
    if (Math.abs(diff) < 0.01) { setAtGoal(true); setResult(null); return; }
    setAtGoal(false);
    const kcalPerUnit = unit === 'metric' ? KCAL_PER_KG : KCAL_PER_LB;
    const totalKcal = Math.abs(diff) * kcalPerUnit;
    const days = w * 7;
    const dailyDeficit = Math.round(totalKcal / days);
    setResult({ diff: Math.abs(diff), totalKcal: Math.round(totalKcal), dailyDeficit, isGain: diff < 0 });
  }, [current, goal, weeks, unit, t]);

  const weightUnit = unit === 'metric' ? t.kg : t.lbs;

  const getSafetyLevel = (d: number): 'safe' | 'moderate' | 'risky' => {
    if (d <= 500) return 'safe';
    if (d <= 750) return 'moderate';
    return 'risky';
  };

  return (
    <div className={styles.widget}>
      <div className={styles.widget__form}>
        <div className={styles.widget__toggle} role="group">
          {(['metric', 'imperial'] as Unit[]).map((u) => (
            <button key={u} type="button"
              className={`${styles['widget__toggle-btn']}${unit === u ? ` ${styles['widget__toggle-btn--active']}` : ''}`}
              onClick={() => handleUnit(u)}
            >
              {u === 'metric' ? t.metric : t.imperial}
            </button>
          ))}
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="cd-current">{t.currentWeight}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="cd-current" className={styles.widget__input} type="number" min="0" step="0.1"
              value={current} onChange={(e) => setCurrent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '80' : '175'}
              aria-label={`${t.currentWeight} (${weightUnit})`}
            />
            <span className={styles.widget__suffix}>{weightUnit}</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="cd-goal">{t.goalWeight}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="cd-goal" className={styles.widget__input} type="number" min="0" step="0.1"
              value={goal} onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '70' : '154'}
              aria-label={`${t.goalWeight} (${weightUnit})`}
            />
            <span className={styles.widget__suffix}>{weightUnit}</span>
          </div>
        </div>

        <div className={styles.widget__field}>
          <label className={styles.widget__label} htmlFor="cd-weeks">{t.weeks}</label>
          <div className={styles['widget__input-wrap']}>
            <input id="cd-weeks" className={styles.widget__input} type="number" min="1" step="1"
              value={weeks} onChange={(e) => setWeeks(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="12"
              aria-label={`${t.weeks} (${t.weeksUnit})`}
            />
            <span className={styles.widget__suffix}>{t.weeksUnit}</span>
          </div>
        </div>

        {error && <p className={styles.widget__error}>{error}</p>}

        <button className={styles.widget__btn} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {atGoal && (
        <div className={styles.widget__results}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>{t.alreadyAtGoal}</p>
        </div>
      )}

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__result-hero']}>
            <div className={styles['widget__result-deficit']}>
              <span className={styles['widget__result-label']}>{t.dailyDeficit}</span>
              <span className={styles['widget__result-value']}>{result.dailyDeficit.toLocaleString()} <small style={{ fontSize: '0.45em', fontWeight: 400 }}>{t.kcalDay}</small></span>
            </div>
            {!result.isGain && (
              <span className={`${styles.widget__badge} ${styles[`widget__badge--${getSafetyLevel(result.dailyDeficit)}`]}`}>
                {getSafetyLevel(result.dailyDeficit) === 'safe' ? t.safeLabel
                  : getSafetyLevel(result.dailyDeficit) === 'moderate' ? t.moderateLabel
                  : t.riskyLabel}
              </span>
            )}
          </div>

          <div className={styles['widget__result-grid']}>
            <div className={styles['widget__result-card']}>
              <span className={styles['widget__result-card-label']}>{result.isGain ? t.gainLabel : t.weightDiff}</span>
              <span className={styles['widget__result-card-value']}>{result.diff.toFixed(1)} {weightUnit}</span>
            </div>
            <div className={styles['widget__result-card']}>
              <span className={styles['widget__result-card-label']}>{t.totalDeficit}</span>
              <span className={styles['widget__result-card-value']}>{result.totalKcal.toLocaleString()} {t.kcalTotal}</span>
            </div>
          </div>

          {!result.isGain && getSafetyLevel(result.dailyDeficit) === 'risky' && (
            <p className={styles.widget__warning}>{t.warningText}</p>
          )}
        </div>
      )}
    </div>
  );
}
