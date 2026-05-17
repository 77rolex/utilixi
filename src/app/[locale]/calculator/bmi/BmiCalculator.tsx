'use client';

import { useState, useCallback } from 'react';
import styles from './BmiCalculator.module.scss';

type Props = { locale: string };
type Unit = 'metric' | 'imperial';

const T: Record<string, {
  metric: string;
  imperial: string;
  height: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  weightKg: string;
  weightLbs: string;
  calculate: string;
  yourBmi: string;
  errorInvalid: string;
  errorHeight: string;
  errorWeight: string;
  catUnderweight: string;
  catNormal: string;
  catOverweight: string;
  catObese: string;
}> = {
  en: {
    metric: 'Metric',
    imperial: 'Imperial',
    height: 'Height',
    heightCm: 'cm',
    heightFt: 'ft',
    heightIn: 'in',
    weight: 'Weight',
    weightKg: 'kg',
    weightLbs: 'lbs',
    calculate: 'Calculate BMI',
    yourBmi: 'Your BMI',
    errorInvalid: 'Please fill all fields with valid positive numbers.',
    errorHeight: 'Height must be between 50 and 250 cm.',
    errorWeight: 'Weight must be between 10 and 300 kg.',
    catUnderweight: 'Underweight',
    catNormal: 'Normal weight',
    catOverweight: 'Overweight',
    catObese: 'Obese',
  },
  ru: {
    metric: 'Метрическая',
    imperial: 'Имперская',
    height: 'Рост',
    heightCm: 'см',
    heightFt: 'фут',
    heightIn: 'дюйм',
    weight: 'Вес',
    weightKg: 'кг',
    weightLbs: 'фунт',
    calculate: 'Рассчитать ИМТ',
    yourBmi: 'Ваш ИМТ',
    errorInvalid: 'Заполните все поля корректными положительными числами.',
    errorHeight: 'Рост должен быть от 50 до 250 см.',
    errorWeight: 'Вес должен быть от 10 до 300 кг.',
    catUnderweight: 'Недостаточный вес',
    catNormal: 'Нормальный вес',
    catOverweight: 'Избыточный вес',
    catObese: 'Ожирение',
  },
  uk: {
    metric: 'Метрична',
    imperial: 'Імперська',
    height: 'Зріст',
    heightCm: 'см',
    heightFt: 'фут',
    heightIn: 'дюйм',
    weight: 'Вага',
    weightKg: 'кг',
    weightLbs: 'фунт',
    calculate: 'Розрахувати ІМТ',
    yourBmi: 'Ваш ІМТ',
    errorInvalid: 'Заповніть усі поля коректними додатними числами.',
    errorHeight: 'Зріст має бути від 50 до 250 см.',
    errorWeight: 'Вага має бути від 10 до 300 кг.',
    catUnderweight: 'Недостатня вага',
    catNormal: 'Нормальна вага',
    catOverweight: 'Надмірна вага',
    catObese: 'Ожиріння',
  },
  fr: {
    metric: 'Métrique',
    imperial: 'Impérial',
    height: 'Taille',
    heightCm: 'cm',
    heightFt: 'pi',
    heightIn: 'po',
    weight: 'Poids',
    weightKg: 'kg',
    weightLbs: 'lbs',
    calculate: 'Calculer l\'IMC',
    yourBmi: 'Votre IMC',
    errorInvalid: 'Veuillez remplir tous les champs avec des nombres positifs valides.',
    errorHeight: 'La taille doit être comprise entre 50 et 250 cm.',
    errorWeight: 'Le poids doit être compris entre 10 et 300 kg.',
    catUnderweight: 'Insuffisance pondérale',
    catNormal: 'Poids normal',
    catOverweight: 'Surpoids',
    catObese: 'Obésité',
  },
  lt: {
    metric: 'Metrinė',
    imperial: 'Imperinė',
    height: 'Ūgis',
    heightCm: 'cm',
    heightFt: 'pėd.',
    heightIn: 'col.',
    weight: 'Svoris',
    weightKg: 'kg',
    weightLbs: 'svar.',
    calculate: 'Skaičiuoti KMI',
    yourBmi: 'Jūsų KMI',
    errorInvalid: 'Užpildykite visus laukus teigiamais skaičiais.',
    errorHeight: 'Ūgis turi būti nuo 50 iki 250 cm.',
    errorWeight: 'Svoris turi būti nuo 10 iki 300 kg.',
    catUnderweight: 'Nepakankamas svoris',
    catNormal: 'Normalus svoris',
    catOverweight: 'Antsvoris',
    catObese: 'Nutukimas',
  },
};

type Category = 'underweight' | 'normal' | 'overweight' | 'obese';

function getCategory(bmi: number): Category {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

// Scale range: 10–40 (30 units). Returns 0–100%.
function scalePercent(bmi: number): number {
  return Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
}

export default function BmiCalculator({ locale }: Props) {
  const t = T[locale] || T.en;

  const [unit, setUnit] = useState<Unit>('metric');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleUnit = (u: Unit) => {
    setUnit(u);
    setBmi(null);
    setError('');
  };

  const handleCalculate = useCallback(() => {
    let heightM: number;
    let weightKg: number;

    if (unit === 'metric') {
      const h = parseFloat(heightCm.replace(',', '.'));
      const w = parseFloat(weight.replace(',', '.'));
      if (isNaN(h) || h <= 0 || isNaN(w) || w <= 0) {
        setError(t.errorInvalid);
        setBmi(null);
        return;
      }
      if (h < 50 || h > 250) {
        setError(t.errorHeight);
        setBmi(null);
        return;
      }
      if (w < 10 || w > 300) {
        setError(t.errorWeight);
        setBmi(null);
        return;
      }
      heightM = h / 100;
      weightKg = w;
    } else {
      const ft = parseFloat(heightFt.replace(',', '.'));
      const inches = parseFloat(heightIn.replace(',', '.') || '0');
      const w = parseFloat(weight.replace(',', '.'));
      if (isNaN(ft) || ft <= 0 || isNaN(w) || w <= 0) {
        setError(t.errorInvalid);
        setBmi(null);
        return;
      }
      const totalInches = ft * 12 + (isNaN(inches) ? 0 : inches);
      heightM = totalInches * 0.0254;
      weightKg = w * 0.453592;
      if (heightM < 0.5 || heightM > 2.5) {
        setError(t.errorHeight);
        setBmi(null);
        return;
      }
      if (weightKg < 10 || weightKg > 300) {
        setError(t.errorWeight);
        setBmi(null);
        return;
      }
    }

    setError('');
    setBmi(Math.round((weightKg / (heightM * heightM)) * 10) / 10);
  }, [unit, heightCm, heightFt, heightIn, weight, t]);

  const category = bmi !== null ? getCategory(bmi) : null;
  const categoryLabel = category ? t[`cat${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof typeof t] : '';

  return (
    <div className={styles['bmi-widget']}>
      <div className={styles['bmi-widget__form']}>

        {/* Unit toggle */}
        <div className={styles['bmi-widget__toggle']} role="group">
          <button
            type="button"
            className={`${styles['bmi-widget__toggle-btn']} ${unit === 'metric' ? styles['bmi-widget__toggle-btn--active'] : ''}`}
            onClick={() => handleUnit('metric')}
          >
            {t.metric}
          </button>
          <button
            type="button"
            className={`${styles['bmi-widget__toggle-btn']} ${unit === 'imperial' ? styles['bmi-widget__toggle-btn--active'] : ''}`}
            onClick={() => handleUnit('imperial')}
          >
            {t.imperial}
          </button>
        </div>

        {/* Height */}
        <div className={styles['bmi-widget__field']}>
          <label className={styles['bmi-widget__label']}>{t.height}</label>
          {unit === 'metric' ? (
            <div className={styles['bmi-widget__input-wrap']}>
              <input
                id="bmi-height-cm"
                className={styles['bmi-widget__input']}
                type="number"
                min="50"
                max="250"
                step="1"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="175"
                aria-label={`${t.height} (${t.heightCm})`}
              />
              <span className={styles['bmi-widget__suffix']}>{t.heightCm}</span>
            </div>
          ) : (
            <div className={styles['bmi-widget__input-row']}>
              <div className={styles['bmi-widget__input-wrap']}>
                <input
                  id="bmi-height-ft"
                  className={styles['bmi-widget__input']}
                  type="number"
                  min="1"
                  max="8"
                  step="1"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="5"
                  aria-label={`${t.height} (${t.heightFt})`}
                />
                <span className={styles['bmi-widget__suffix']}>{t.heightFt}</span>
              </div>
              <div className={styles['bmi-widget__input-wrap']}>
                <input
                  id="bmi-height-in"
                  className={styles['bmi-widget__input']}
                  type="number"
                  min="0"
                  max="11"
                  step="1"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="9"
                  aria-label={`${t.height} (${t.heightIn})`}
                />
                <span className={styles['bmi-widget__suffix']}>{t.heightIn}</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className={styles['bmi-widget__field']}>
          <label className={styles['bmi-widget__label']} htmlFor="bmi-weight">
            {t.weight}
          </label>
          <div className={styles['bmi-widget__input-wrap']}>
            <input
              id="bmi-weight"
              className={styles['bmi-widget__input']}
              type="number"
              min="10"
              max="300"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder={unit === 'metric' ? '70' : '154'}
              aria-label={`${t.weight} (${unit === 'metric' ? t.weightKg : t.weightLbs})`}
            />
            <span className={styles['bmi-widget__suffix']}>
              {unit === 'metric' ? t.weightKg : t.weightLbs}
            </span>
          </div>
        </div>

        {error && <p className={styles['bmi-widget__error']}>{error}</p>}

        <button className={styles['bmi-widget__btn']} onClick={handleCalculate} type="button">
          {t.calculate}
        </button>
      </div>

      {bmi !== null && category && (
        <div className={styles['bmi-widget__results']}>
          <div className={styles['bmi-widget__result-main']}>
            <div className={styles['bmi-widget__result-bmi']}>
              <span className={styles['bmi-widget__result-label']}>{t.yourBmi}</span>
              <span className={styles['bmi-widget__result-value']}>{bmi.toFixed(1)}</span>
            </div>
            <span className={`${styles['bmi-widget__result-category']} ${styles[`bmi-widget__result-category--${category}`]}`}>
              {categoryLabel}
            </span>
          </div>

          {/* Scale bar */}
          <div className={styles['bmi-widget__scale']}>
            <div className={styles['bmi-widget__scale-bar-wrap']}>
              <div className={styles['bmi-widget__scale-bar']}>
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--underweight']}`} />
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--normal']}`} />
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--overweight']}`} />
                <div className={`${styles['bmi-widget__scale-segment']} ${styles['bmi-widget__scale-segment--obese']}`} />
              </div>
              <div
                className={styles['bmi-widget__scale-marker']}
                style={{ left: `${scalePercent(bmi)}%` }}
                aria-hidden="true"
              />
            </div>
            <div className={styles['bmi-widget__scale-labels']} aria-hidden="true">
              <span className={styles['bmi-widget__scale-label']} style={{ left: '28.33%' }}>18.5</span>
              <span className={styles['bmi-widget__scale-label']} style={{ left: '50%' }}>25</span>
              <span className={styles['bmi-widget__scale-label']} style={{ left: '66.67%' }}>30</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
