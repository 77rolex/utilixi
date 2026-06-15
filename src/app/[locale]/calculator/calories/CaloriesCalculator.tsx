'use client';

import { useState, useCallback, useEffect } from 'react';
import styles from './CaloriesCalculator.module.scss';

type Props = { locale: string };
type Unit = 'metric' | 'imperial';
type Gender = 'male' | 'female';

const T: Record<string, {
  metric: string;
  imperial: string;
  gender: string;
  male: string;
  female: string;
  age: string;
  height: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  weightKg: string;
  weightLbs: string;
  activity: string;
  act1: string;
  act2: string;
  act3: string;
  act4: string;
  act5: string;
  calculate: string;
  labelBmr: string;
  labelMaintain: string;
  labelLose: string;
  labelGain: string;
  kcal: string;
  errorInvalid: string;
  errorAge: string;
  errorHeight: string;
  errorWeight: string;
}> = {
  en: {
    metric: 'Metric',
    imperial: 'Imperial',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    age: 'Age',
    height: 'Height',
    heightCm: 'cm',
    heightFt: 'ft',
    heightIn: 'in',
    weight: 'Weight',
    weightKg: 'kg',
    weightLbs: 'lbs',
    activity: 'Activity level',
    act1: 'Sedentary (little or no exercise)',
    act2: 'Lightly active (1–3 days/week)',
    act3: 'Moderately active (3–5 days/week)',
    act4: 'Very active (6–7 days/week)',
    act5: 'Extra active (physical job or 2× training)',
    calculate: 'Calculate calories',
    labelBmr: 'Basal metabolic rate',
    labelMaintain: 'Maintain weight',
    labelLose: 'Lose weight (−500 kcal)',
    labelGain: 'Gain weight (+500 kcal)',
    kcal: 'kcal/day',
    errorInvalid: 'Please fill all fields with valid positive numbers.',
    errorAge: 'Age must be between 10 and 100 years.',
    errorHeight: 'Height must be between 50 and 250 cm.',
    errorWeight: 'Weight must be between 10 and 300 kg.',
  },
  ru: {
    metric: 'Метрическая',
    imperial: 'Имперская',
    gender: 'Пол',
    male: 'Мужской',
    female: 'Женский',
    age: 'Возраст',
    height: 'Рост',
    heightCm: 'см',
    heightFt: 'фут',
    heightIn: 'дюйм',
    weight: 'Вес',
    weightKg: 'кг',
    weightLbs: 'фунт',
    activity: 'Уровень активности',
    act1: 'Сидячий образ жизни (нет нагрузок)',
    act2: 'Слабая активность (1–3 дня в неделю)',
    act3: 'Умеренная активность (3–5 дней)',
    act4: 'Высокая активность (6–7 дней)',
    act5: 'Очень высокая (физ. работа или 2× тренировки)',
    calculate: 'Рассчитать калории',
    labelBmr: 'Базовый обмен веществ',
    labelMaintain: 'Поддержание веса',
    labelLose: 'Похудение (−500 ккал)',
    labelGain: 'Набор массы (+500 ккал)',
    kcal: 'ккал/день',
    errorInvalid: 'Заполните все поля корректными положительными числами.',
    errorAge: 'Возраст должен быть от 10 до 100 лет.',
    errorHeight: 'Рост должен быть от 50 до 250 см.',
    errorWeight: 'Вес должен быть от 10 до 300 кг.',
  },
  uk: {
    metric: 'Метрична',
    imperial: 'Імперська',
    gender: 'Стать',
    male: 'Чоловіча',
    female: 'Жіноча',
    age: 'Вік',
    height: 'Зріст',
    heightCm: 'см',
    heightFt: 'фут',
    heightIn: 'дюйм',
    weight: 'Вага',
    weightKg: 'кг',
    weightLbs: 'фунт',
    activity: 'Рівень активності',
    act1: 'Сидячий спосіб життя (без навантажень)',
    act2: 'Слабка активність (1–3 дні на тиждень)',
    act3: 'Помірна активність (3–5 днів)',
    act4: 'Висока активність (6–7 днів)',
    act5: 'Дуже висока (фіз. робота або 2× тренування)',
    calculate: 'Розрахувати калорії',
    labelBmr: 'Базовий обмін речовин',
    labelMaintain: 'Підтримка ваги',
    labelLose: 'Схуднення (−500 ккал)',
    labelGain: 'Набір маси (+500 ккал)',
    kcal: 'ккал/день',
    errorInvalid: 'Заповніть усі поля коректними додатними числами.',
    errorAge: 'Вік має бути від 10 до 100 років.',
    errorHeight: 'Зріст має бути від 50 до 250 см.',
    errorWeight: 'Вага має бути від 10 до 300 кг.',
  },
  fr: {
    metric: 'Métrique',
    imperial: 'Impérial',
    gender: 'Sexe',
    male: 'Homme',
    female: 'Femme',
    age: 'Âge',
    height: 'Taille',
    heightCm: 'cm',
    heightFt: 'pi',
    heightIn: 'po',
    weight: 'Poids',
    weightKg: 'kg',
    weightLbs: 'lbs',
    activity: 'Niveau d\'activité',
    act1: 'Sédentaire (peu ou pas d\'exercice)',
    act2: 'Légèrement actif (1–3 jours/semaine)',
    act3: 'Modérément actif (3–5 jours)',
    act4: 'Très actif (6–7 jours)',
    act5: 'Extrêmement actif (travail physique ou 2× entraînement)',
    calculate: 'Calculer les calories',
    labelBmr: 'Métabolisme de base',
    labelMaintain: 'Maintien du poids',
    labelLose: 'Perte de poids (−500 kcal)',
    labelGain: 'Prise de masse (+500 kcal)',
    kcal: 'kcal/jour',
    errorInvalid: 'Veuillez remplir tous les champs avec des nombres positifs valides.',
    errorAge: 'L\'âge doit être compris entre 10 et 100 ans.',
    errorHeight: 'La taille doit être comprise entre 50 et 250 cm.',
    errorWeight: 'Le poids doit être compris entre 10 et 300 kg.',
  },
  lt: {
    metric: 'Metrinė',
    imperial: 'Imperinė',
    gender: 'Lytis',
    male: 'Vyras',
    female: 'Moteris',
    age: 'Amžius',
    height: 'Ūgis',
    heightCm: 'cm',
    heightFt: 'pėd.',
    heightIn: 'col.',
    weight: 'Svoris',
    weightKg: 'kg',
    weightLbs: 'svar.',
    activity: 'Aktyvumo lygis',
    act1: 'Sėslus (mažai arba jokio fizinio aktyvumo)',
    act2: 'Nedidelis aktyvumas (1–3 dienos/sav.)',
    act3: 'Vidutinis aktyvumas (3–5 dienos)',
    act4: 'Didelis aktyvumas (6–7 dienos)',
    act5: 'Labai didelis (fizinis darbas arba 2× treniruotės)',
    calculate: 'Skaičiuoti kalorijas',
    labelBmr: 'Bazinis medžiagų apykaitos greitis',
    labelMaintain: 'Svorio palaikymas',
    labelLose: 'Svorio metimas (−500 kcal)',
    labelGain: 'Svorio augimas (+500 kcal)',
    kcal: 'kcal/dieną',
    errorInvalid: 'Užpildykite visus laukus teigiamais skaičiais.',
    errorAge: 'Amžius turi būti nuo 10 iki 100 metų.',
    errorHeight: 'Ūgis turi būti nuo 50 iki 250 cm.',
    errorWeight: 'Svoris turi būti nuo 10 iki 300 kg.',
  },
};

const ACTIVITY_MULTIPLIERS = [1.2, 1.375, 1.55, 1.725, 1.9];

function calcTDEE(gender: Gender, ageParsed: number, heightCm: number, weightKg: number, actIndex: number) {
  // Mifflin-St Jeor
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * ageParsed + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * ageParsed - 161;
  const tdee = bmr * ACTIVITY_MULTIPLIERS[actIndex];
  return { bmr: Math.round(bmr), tdee: Math.round(tdee) };
}

export default function CaloriesCalculator({ locale }: Props) {
  const t = T[locale] || T.en;

  const [unit, setUnit] = useState<Unit>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('2'); // moderately active default
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUnit = localStorage.getItem('utilixi_calories_unit') as Unit | null;
    const savedGender = localStorage.getItem('utilixi_calories_gender') as Gender | null;
    if (savedUnit === 'metric' || savedUnit === 'imperial') setUnit(savedUnit);
    if (savedGender === 'male' || savedGender === 'female') setGender(savedGender);
  }, []);

  const handleUnit = (u: Unit) => {
    setUnit(u);
    setResult(null);
    setError('');
    localStorage.setItem('utilixi_calories_unit', u);
  };

  const handleGender = (g: Gender) => {
    setGender(g);
    localStorage.setItem('utilixi_calories_gender', g);
  };

  const handleCalculate = useCallback(() => {
    const a = parseInt(age, 10);
    let heightCmVal: number;
    let weightKgVal: number;

    if (isNaN(a) || a <= 0) { setError(t.errorInvalid); setResult(null); return; }
    if (a < 10 || a > 100) { setError(t.errorAge); setResult(null); return; }

    if (unit === 'metric') {
      heightCmVal = parseFloat(heightCm.replace(',', '.'));
      weightKgVal = parseFloat(weight.replace(',', '.'));
    } else {
      const ft = parseFloat(heightFt.replace(',', '.'));
      const inches = parseFloat(heightIn.replace(',', '.') || '0');
      if (isNaN(ft) || ft <= 0) { setError(t.errorInvalid); setResult(null); return; }
      heightCmVal = (ft * 12 + (isNaN(inches) ? 0 : inches)) * 2.54;
      weightKgVal = parseFloat(weight.replace(',', '.')) * 0.453592;
    }

    if (isNaN(heightCmVal) || heightCmVal <= 0 || isNaN(weightKgVal) || weightKgVal <= 0) {
      setError(t.errorInvalid); setResult(null); return;
    }
    if (heightCmVal < 50 || heightCmVal > 250) { setError(t.errorHeight); setResult(null); return; }
    if (weightKgVal < 10 || weightKgVal > 300) { setError(t.errorWeight); setResult(null); return; }

    setError('');
    setResult(calcTDEE(gender, a, heightCmVal, weightKgVal, parseInt(activity, 10)));
  }, [unit, gender, age, heightCm, heightFt, heightIn, weight, activity, t]);

  const actKeys = ['act1', 'act2', 'act3', 'act4', 'act5'] as const;

  return (
    <div className={styles['calories-widget']}>
      <div className={styles['calories-widget__form']}>

        {/* Unit toggle */}
        <div className={styles['calories-widget__toggle']} role="group">
          {(['metric', 'imperial'] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              className={`${styles['calories-widget__toggle-btn']} ${unit === u ? styles['calories-widget__toggle-btn--active'] : ''}`}
              onClick={() => handleUnit(u)}
            >
              {t[u]}
            </button>
          ))}
        </div>

        {/* Gender + Age */}
        <div className={styles['calories-widget__row']}>
          <div className={styles['calories-widget__field']}>
            <label className={styles['calories-widget__label']} htmlFor="cal-gender">{t.gender}</label>
            <select
              id="cal-gender"
              className={styles['calories-widget__select']}
              value={gender}
              onChange={(e) => handleGender(e.target.value as Gender)}
            >
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
            </select>
          </div>
          <div className={styles['calories-widget__field']}>
            <label className={styles['calories-widget__label']} htmlFor="cal-age">{t.age}</label>
            <div className={styles['calories-widget__input-wrap']}>
              <input
                id="cal-age"
                className={styles['calories-widget__input']}
                type="number"
                min="10"
                max="100"
                step="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="30"
              />
            </div>
          </div>
        </div>

        {/* Height */}
        <div className={styles['calories-widget__field']}>
          <label className={styles['calories-widget__label']}>{t.height}</label>
          {unit === 'metric' ? (
            <div className={styles['calories-widget__input-wrap']}>
              <input
                id="cal-height"
                className={styles['calories-widget__input']}
                type="number" min="50" max="250" step="1"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="175"
                aria-label={`${t.height} (${t.heightCm})`}
              />
              <span className={styles['calories-widget__suffix']}>{t.heightCm}</span>
            </div>
          ) : (
            <div className={styles['calories-widget__input-pair']}>
              <div className={styles['calories-widget__input-wrap']}>
                <input
                  className={styles['calories-widget__input']}
                  type="number" min="1" max="8" step="1"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="5"
                  aria-label={`${t.height} (${t.heightFt})`}
                />
                <span className={styles['calories-widget__suffix']}>{t.heightFt}</span>
              </div>
              <div className={styles['calories-widget__input-wrap']}>
                <input
                  className={styles['calories-widget__input']}
                  type="number" min="0" max="11" step="1"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="9"
                  aria-label={`${t.height} (${t.heightIn})`}
                />
                <span className={styles['calories-widget__suffix']}>{t.heightIn}</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className={styles['calories-widget__field']}>
          <label className={styles['calories-widget__label']} htmlFor="cal-weight">{t.weight}</label>
          <div className={styles['calories-widget__input-wrap']}>
            <input
              id="cal-weight"
              className={styles['calories-widget__input']}
              type="number" min="10" max="300" step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '70' : '154'}
              aria-label={`${t.weight} (${unit === 'metric' ? t.weightKg : t.weightLbs})`}
            />
            <span className={styles['calories-widget__suffix']}>
              {unit === 'metric' ? t.weightKg : t.weightLbs}
            </span>
          </div>
        </div>

        {/* Activity */}
        <div className={styles['calories-widget__field']}>
          <label className={styles['calories-widget__label']} htmlFor="cal-activity">{t.activity}</label>
          <select
            id="cal-activity"
            className={styles['calories-widget__select']}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            {actKeys.map((key, i) => (
              <option key={i} value={i}>{t[key]}</option>
            ))}
          </select>
        </div>

        {error && <p className={styles['calories-widget__error']}>{error}</p>}

        <button className={styles['calories-widget__btn']} onClick={handleCalculate} type="button">
          {t.calculate}
        </button>
      </div>

      {result && (
        <div className={styles['calories-widget__results']}>
          <div className={styles['calories-widget__result-row']}>
            <div className={styles['calories-widget__result-item']}>
              <span className={styles['calories-widget__result-label']}>{t.labelBmr}</span>
              <span className={styles['calories-widget__result-value']}>{result.bmr.toLocaleString()}</span>
              <span className={styles['calories-widget__result-unit']}>{t.kcal}</span>
            </div>
            <div className={`${styles['calories-widget__result-item']} ${styles['calories-widget__result-item--highlight']}`}>
              <span className={styles['calories-widget__result-label']}>{t.labelMaintain}</span>
              <span className={`${styles['calories-widget__result-value']} ${styles['calories-widget__result-value--highlight']}`}>
                {result.tdee.toLocaleString()}
              </span>
              <span className={styles['calories-widget__result-unit']}>{t.kcal}</span>
            </div>
            <div className={styles['calories-widget__result-item']}>
              <span className={styles['calories-widget__result-label']}>{t.labelLose}</span>
              <span className={styles['calories-widget__result-value']}>{Math.max(1200, result.tdee - 500).toLocaleString()}</span>
              <span className={styles['calories-widget__result-unit']}>{t.kcal}</span>
            </div>
            <div className={styles['calories-widget__result-item']}>
              <span className={styles['calories-widget__result-label']}>{t.labelGain}</span>
              <span className={styles['calories-widget__result-value']}>{(result.tdee + 500).toLocaleString()}</span>
              <span className={styles['calories-widget__result-unit']}>{t.kcal}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
