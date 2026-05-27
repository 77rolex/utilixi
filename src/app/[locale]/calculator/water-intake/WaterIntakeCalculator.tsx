'use client';

import { useState, useCallback } from 'react';
import styles from './WaterIntakeCalculator.module.scss';

type Unit = 'metric' | 'imperial';

const T: Record<string, {
  metric: string;
  imperial: string;
  weight: string;
  kg: string;
  lbs: string;
  activity: string;
  actSedentary: string;
  actLight: string;
  actModerate: string;
  actActive: string;
  actVeryActive: string;
  climate: string;
  climateNormal: string;
  climateHot: string;
  calculate: string;
  dailyIntake: string;
  liters: string;
  glasses: string;
  cups: string;
  errorInvalid: string;
  errorRange: string;
  tip: string;
}> = {
  en: {
    metric: 'Metric',
    imperial: 'Imperial',
    weight: 'Body weight',
    kg: 'kg',
    lbs: 'lbs',
    activity: 'Activity level',
    actSedentary: 'Sedentary (little or no exercise)',
    actLight: 'Light (1–3 days/week)',
    actModerate: 'Moderate (3–5 days/week)',
    actActive: 'Active (6–7 days/week)',
    actVeryActive: 'Very active (hard training daily)',
    climate: 'Climate',
    climateNormal: 'Temperate',
    climateHot: 'Hot / humid',
    calculate: 'Calculate',
    dailyIntake: 'Daily water intake',
    liters: 'Liters',
    glasses: '250 ml glasses',
    cups: '8 oz cups',
    errorInvalid: 'Please enter a valid weight.',
    errorRange: 'Weight must be between 20 and 300 kg.',
    tip: 'This is a general guideline. All beverages (including tea, coffee, and food moisture) count toward your daily intake. Increase intake during illness, hot weather, or intense exercise.',
  },
  ru: {
    metric: 'Метрическая',
    imperial: 'Имперская',
    weight: 'Вес тела',
    kg: 'кг',
    lbs: 'фунт',
    activity: 'Уровень активности',
    actSedentary: 'Малоподвижный (почти нет нагрузок)',
    actLight: 'Лёгкий (1–3 дня в неделю)',
    actModerate: 'Умеренный (3–5 дней в неделю)',
    actActive: 'Активный (6–7 дней в неделю)',
    actVeryActive: 'Очень активный (интенсивные тренировки каждый день)',
    climate: 'Климат',
    climateNormal: 'Умеренный',
    climateHot: 'Жаркий / влажный',
    calculate: 'Рассчитать',
    dailyIntake: 'Суточная норма воды',
    liters: 'Литры',
    glasses: 'Стакана по 250 мл',
    cups: 'Чашки 240 мл',
    errorInvalid: 'Введите корректный вес.',
    errorRange: 'Вес должен быть от 20 до 300 кг.',
    tip: 'Это общая рекомендация. Все напитки (чай, кофе, жидкость в пище) учитываются в суточной норме. Увеличивайте потребление при болезни, жаре или интенсивных тренировках.',
  },
  uk: {
    metric: 'Метрична',
    imperial: 'Імперська',
    weight: 'Вага тіла',
    kg: 'кг',
    lbs: 'фунт',
    activity: 'Рівень активності',
    actSedentary: 'Малорухливий (майже немає навантажень)',
    actLight: 'Легкий (1–3 дні на тиждень)',
    actModerate: 'Помірний (3–5 днів на тиждень)',
    actActive: 'Активний (6–7 днів на тиждень)',
    actVeryActive: 'Дуже активний (інтенсивні тренування щодня)',
    climate: 'Клімат',
    climateNormal: 'Помірний',
    climateHot: 'Жаркий / вологий',
    calculate: 'Розрахувати',
    dailyIntake: 'Добова норма води',
    liters: 'Літри',
    glasses: 'Склянки по 250 мл',
    cups: 'Чашки 240 мл',
    errorInvalid: 'Введіть коректну вагу.',
    errorRange: 'Вага має бути від 20 до 300 кг.',
    tip: 'Це загальна рекомендація. Усі напої (чай, кава, рідина в їжі) враховуються у добовій нормі. Збільшуйте споживання під час хвороби, спеки або інтенсивних тренувань.',
  },
  fr: {
    metric: 'Métrique',
    imperial: 'Impérial',
    weight: 'Poids corporel',
    kg: 'kg',
    lbs: 'lbs',
    activity: 'Niveau d\'activité',
    actSedentary: 'Sédentaire (peu ou pas d\'exercice)',
    actLight: 'Léger (1–3 jours/semaine)',
    actModerate: 'Modéré (3–5 jours/semaine)',
    actActive: 'Actif (6–7 jours/semaine)',
    actVeryActive: 'Très actif (entraînement intense quotidien)',
    climate: 'Climat',
    climateNormal: 'Tempéré',
    climateHot: 'Chaud / humide',
    calculate: 'Calculer',
    dailyIntake: 'Apport quotidien en eau',
    liters: 'Litres',
    glasses: 'Verres de 250 ml',
    cups: 'Tasses de 240 ml',
    errorInvalid: 'Veuillez entrer un poids valide.',
    errorRange: 'Le poids doit être compris entre 20 et 300 kg.',
    tip: 'Il s\'agit d\'une recommandation générale. Toutes les boissons (thé, café, humidité des aliments) comptent. Augmentez l\'apport en cas de maladie, de chaleur ou d\'exercice intense.',
  },
  lt: {
    metric: 'Metrinė',
    imperial: 'Imperinė',
    weight: 'Kūno svoris',
    kg: 'kg',
    lbs: 'svar.',
    activity: 'Aktyvumo lygis',
    actSedentary: 'Sėslus (mažai judama)',
    actLight: 'Lengvas (1–3 d./sav.)',
    actModerate: 'Vidutinis (3–5 d./sav.)',
    actActive: 'Aktyvus (6–7 d./sav.)',
    actVeryActive: 'Labai aktyvus (intensyvios treniruotės kasdien)',
    climate: 'Klimatas',
    climateNormal: 'Vidutinis',
    climateHot: 'Karštas / drėgnas',
    calculate: 'Skaičiuoti',
    dailyIntake: 'Dienos vandens norma',
    liters: 'Litrai',
    glasses: '250 ml stiklinės',
    cups: '240 ml puodeliai',
    errorInvalid: 'Įveskite teisingą svorį.',
    errorRange: 'Svoris turi būti nuo 20 iki 300 kg.',
    tip: 'Tai bendra rekomendacija. Visos gėrimų rūšys (arbata, kava, maisto drėgmė) įskaičiuotos. Padidinkite suvartojimą ligos, karščio ar intensyvaus sporto metu.',
  },
};

const ACTIVITY_MULTIPLIERS = [1.0, 1.1, 1.2, 1.4, 1.6];
const HOT_BONUS_ML = 500;

export default function WaterIntakeCalculator({ locale }: { locale: string }) {
  const t = T[locale] || T.en;

  const [unit, setUnit] = useState<Unit>('metric');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState(0);
  const [hot, setHot] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const activityOptions = [
    t.actSedentary,
    t.actLight,
    t.actModerate,
    t.actActive,
    t.actVeryActive,
  ];

  const handleCalculate = useCallback(() => {
    const w = parseFloat(weight.replace(',', '.'));
    if (isNaN(w) || w <= 0) { setError(t.errorInvalid); setResult(null); return; }

    const weightKg = unit === 'metric' ? w : w * 0.453592;
    if (weightKg < 20 || weightKg > 300) { setError(t.errorRange); setResult(null); return; }

    const base = weightKg * 35;
    const adjusted = base * ACTIVITY_MULTIPLIERS[activity];
    const total = Math.round((adjusted + (hot ? HOT_BONUS_ML : 0)) / 50) * 50;

    setError('');
    setResult(total);
  }, [weight, unit, activity, hot, t]);

  const liters = result !== null ? (result / 1000).toFixed(1) : null;
  const glasses = result !== null ? Math.round(result / 250) : null;
  const cups = result !== null ? Math.round(result / 240) : null;

  return (
    <div className={styles['water-widget']}>
      <div className={styles['water-widget__form']}>

        <div className={styles['water-widget__toggle']} role="group">
          {(['metric', 'imperial'] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              className={`${styles['water-widget__toggle-btn']} ${unit === u ? styles['water-widget__toggle-btn--active'] : ''}`}
              onClick={() => { setUnit(u); setResult(null); setError(''); }}
            >
              {u === 'metric' ? t.metric : t.imperial}
            </button>
          ))}
        </div>

        <div className={styles['water-widget__field']}>
          <label className={styles['water-widget__label']} htmlFor="water-weight">
            {t.weight}
          </label>
          <div className={styles['water-widget__input-wrap']}>
            <input
              id="water-weight"
              className={styles['water-widget__input']}
              type="number"
              min="20"
              max="300"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '70' : '154'}
              aria-label={`${t.weight} (${unit === 'metric' ? t.kg : t.lbs})`}
            />
            <span className={styles['water-widget__suffix']}>
              {unit === 'metric' ? t.kg : t.lbs}
            </span>
          </div>
        </div>

        <div className={styles['water-widget__field']}>
          <label className={styles['water-widget__label']} htmlFor="water-activity">
            {t.activity}
          </label>
          <select
            id="water-activity"
            className={styles['water-widget__select']}
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
          >
            {activityOptions.map((label, i) => (
              <option key={i} value={i}>{label}</option>
            ))}
          </select>
        </div>

        <div className={styles['water-widget__field']}>
          <label className={styles['water-widget__label']} htmlFor="water-climate">
            {t.climate}
          </label>
          <select
            id="water-climate"
            className={styles['water-widget__select']}
            value={hot ? '1' : '0'}
            onChange={(e) => setHot(e.target.value === '1')}
          >
            <option value="0">{t.climateNormal}</option>
            <option value="1">{t.climateHot}</option>
          </select>
        </div>

        {error && <p className={styles['water-widget__error']}>{error}</p>}

        <button className={styles['water-widget__btn']} type="button" onClick={handleCalculate}>
          {t.calculate}
        </button>
      </div>

      {result !== null && liters !== null && glasses !== null && cups !== null && (
        <div className={styles['water-widget__results']}>
          <div className={styles['water-widget__result-main']}>
            <div className={styles['water-widget__result-value-block']}>
              <span className={styles['water-widget__result-label']}>{t.dailyIntake}</span>
              <span className={styles['water-widget__result-value']}>{liters} L</span>
            </div>
          </div>

          <div className={styles['water-widget__cards']}>
            <div className={styles['water-widget__card']}>
              <span className={styles['water-widget__card-icon']}>💧</span>
              <span className={styles['water-widget__card-value']}>{liters}</span>
              <span className={styles['water-widget__card-label']}>{t.liters}</span>
            </div>
            <div className={styles['water-widget__card']}>
              <span className={styles['water-widget__card-icon']}>🥛</span>
              <span className={styles['water-widget__card-value']}>{glasses}</span>
              <span className={styles['water-widget__card-label']}>{t.glasses}</span>
            </div>
            <div className={styles['water-widget__card']}>
              <span className={styles['water-widget__card-icon']}>☕</span>
              <span className={styles['water-widget__card-value']}>{cups}</span>
              <span className={styles['water-widget__card-label']}>{t.cups}</span>
            </div>
          </div>

          <p className={styles['water-widget__tip']}>{t.tip}</p>
        </div>
      )}
    </div>
  );
}
