'use client';

import { useState, useCallback } from 'react';
import styles from './IdealWeightCalculator.module.scss';

type Props = { locale: string };
type Unit = 'metric' | 'imperial';
type Gender = 'male' | 'female';

const T: Record<string, {
  metric: string;
  imperial: string;
  male: string;
  female: string;
  height: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  calculate: string;
  bmiRange: string;
  bmiRangeLabel: string;
  formulaBreakdown: string;
  formula: string;
  weight: string;
  average: string;
  errorInvalid: string;
  errorHeight: string;
  kg: string;
  lbs: string;
  formulaDevine: string;
  formulaHamwi: string;
  formulaRobinson: string;
  formulaMiller: string;
}> = {
  en: {
    metric: 'Metric',
    imperial: 'Imperial',
    male: 'Male',
    female: 'Female',
    height: 'Height',
    heightCm: 'cm',
    heightFt: 'ft',
    heightIn: 'in',
    calculate: 'Calculate Ideal Weight',
    bmiRange: 'Healthy weight range',
    bmiRangeLabel: 'Based on healthy BMI (18.5–24.9)',
    formulaBreakdown: 'Formula breakdown',
    formula: 'Formula',
    weight: 'Weight',
    average: 'Average',
    errorInvalid: 'Please enter a valid height.',
    errorHeight: 'Height must be between 130 and 220 cm.',
    kg: 'kg',
    lbs: 'lbs',
    formulaDevine: 'Devine',
    formulaHamwi: 'Hamwi',
    formulaRobinson: 'Robinson',
    formulaMiller: 'Miller',
  },
  ru: {
    metric: 'Метрическая',
    imperial: 'Имперская',
    male: 'Мужской',
    female: 'Женский',
    height: 'Рост',
    heightCm: 'см',
    heightFt: 'фут',
    heightIn: 'дюйм',
    calculate: 'Рассчитать идеальный вес',
    bmiRange: 'Диапазон здорового веса',
    bmiRangeLabel: 'По здоровому ИМТ (18,5–24,9)',
    formulaBreakdown: 'Расчёт по формулам',
    formula: 'Формула',
    weight: 'Вес',
    average: 'Среднее',
    errorInvalid: 'Введите корректный рост.',
    errorHeight: 'Рост должен быть от 130 до 220 см.',
    kg: 'кг',
    lbs: 'фунт',
    formulaDevine: 'Девайн',
    formulaHamwi: 'Хамви',
    formulaRobinson: 'Робинсон',
    formulaMiller: 'Миллер',
  },
  uk: {
    metric: 'Метрична',
    imperial: 'Імперська',
    male: 'Чоловіча',
    female: 'Жіноча',
    height: 'Зріст',
    heightCm: 'см',
    heightFt: 'фут',
    heightIn: 'дюйм',
    calculate: 'Розрахувати ідеальну вагу',
    bmiRange: 'Діапазон здорової ваги',
    bmiRangeLabel: 'За здоровим ІМТ (18,5–24,9)',
    formulaBreakdown: 'Розрахунок за формулами',
    formula: 'Формула',
    weight: 'Вага',
    average: 'Середнє',
    errorInvalid: 'Введіть коректний зріст.',
    errorHeight: 'Зріст має бути від 130 до 220 см.',
    kg: 'кг',
    lbs: 'фунт',
    formulaDevine: 'Девайн',
    formulaHamwi: 'Хамві',
    formulaRobinson: 'Робінсон',
    formulaMiller: 'Міллер',
  },
  fr: {
    metric: 'Métrique',
    imperial: 'Impérial',
    male: 'Homme',
    female: 'Femme',
    height: 'Taille',
    heightCm: 'cm',
    heightFt: 'pi',
    heightIn: 'po',
    calculate: 'Calculer le poids idéal',
    bmiRange: 'Plage de poids sain',
    bmiRangeLabel: 'Basé sur un IMC sain (18,5–24,9)',
    formulaBreakdown: 'Détail par formule',
    formula: 'Formule',
    weight: 'Poids',
    average: 'Moyenne',
    errorInvalid: 'Veuillez entrer une taille valide.',
    errorHeight: 'La taille doit être entre 130 et 220 cm.',
    kg: 'kg',
    lbs: 'lbs',
    formulaDevine: 'Devine',
    formulaHamwi: 'Hamwi',
    formulaRobinson: 'Robinson',
    formulaMiller: 'Miller',
  },
  lt: {
    metric: 'Metrinė',
    imperial: 'Imperinė',
    male: 'Vyras',
    female: 'Moteris',
    height: 'Ūgis',
    heightCm: 'cm',
    heightFt: 'pėd.',
    heightIn: 'col.',
    calculate: 'Skaičiuoti idealų svorį',
    bmiRange: 'Sveiko svorio intervalas',
    bmiRangeLabel: 'Pagal sveiką KMI (18,5–24,9)',
    formulaBreakdown: 'Formulių suvestinė',
    formula: 'Formulė',
    weight: 'Svoris',
    average: 'Vidurkis',
    errorInvalid: 'Įveskite tinkamą ūgį.',
    errorHeight: 'Ūgis turi būti nuo 130 iki 220 cm.',
    kg: 'kg',
    lbs: 'svar.',
    formulaDevine: 'Devine',
    formulaHamwi: 'Hamwi',
    formulaRobinson: 'Robinson',
    formulaMiller: 'Miller',
  },
};

interface Results {
  devine: number;
  hamwi: number;
  robinson: number;
  miller: number;
  avg: number;
  bmiMin: number;
  bmiMax: number;
}

function calcIdealWeights(heightCm: number, gender: Gender): Results {
  const inches = heightCm / 2.54;
  const over60 = inches - 60;

  const devine   = gender === 'male' ? 50.0 + 2.3  * over60 : 45.5 + 2.3  * over60;
  const hamwi    = gender === 'male' ? 48.0 + 2.7  * over60 : 45.4 + 2.3  * over60;
  const robinson = gender === 'male' ? 52.0 + 1.9  * over60 : 49.0 + 1.7  * over60;
  const miller   = gender === 'male' ? 56.2 + 1.41 * over60 : 53.1 + 1.36 * over60;
  const avg = (devine + hamwi + robinson + miller) / 4;

  const hm = heightCm / 100;
  const bmiMin = 18.5 * hm * hm;
  const bmiMax = 24.9 * hm * hm;

  return { devine, hamwi, robinson, miller, avg, bmiMin, bmiMax };
}

export default function IdealWeightCalculator({ locale }: Props) {
  const t = T[locale] || T.en;

  const [unit, setUnit] = useState<Unit>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState('');

  const handleUnit = (u: Unit) => {
    setUnit(u);
    setResults(null);
    setError('');
  };

  const handleGender = (g: Gender) => {
    setGender(g);
    if (results) {
      const cm = unit === 'metric'
        ? parseFloat(heightCm)
        : (parseFloat(heightFt || '0') * 12 + parseFloat(heightIn || '0')) * 2.54;
      if (!isNaN(cm) && cm >= 130 && cm <= 220) {
        setResults(calcIdealWeights(cm, g));
      }
    }
  };

  const handleCalculate = useCallback(() => {
    let cm: number;

    if (unit === 'metric') {
      const h = parseFloat(heightCm.replace(',', '.'));
      if (isNaN(h) || h <= 0) { setError(t.errorInvalid); setResults(null); return; }
      if (h < 130 || h > 220) { setError(t.errorHeight); setResults(null); return; }
      cm = h;
    } else {
      const ft = parseFloat(heightFt.replace(',', '.'));
      const inches = parseFloat(heightIn.replace(',', '.') || '0');
      if (isNaN(ft) || ft <= 0) { setError(t.errorInvalid); setResults(null); return; }
      cm = (ft * 12 + (isNaN(inches) ? 0 : inches)) * 2.54;
      if (cm < 130 || cm > 220) { setError(t.errorHeight); setResults(null); return; }
    }

    setError('');
    setResults(calcIdealWeights(cm, gender));
  }, [unit, gender, heightCm, heightFt, heightIn, t]);

  const fmt = (kg: number) => unit === 'metric'
    ? `${kg.toFixed(1)} ${t.kg}`
    : `${(kg / 0.453592).toFixed(1)} ${t.lbs}`;

  const rows: [string, number][] = results ? [
    [t.formulaDevine,   results.devine],
    [t.formulaHamwi,    results.hamwi],
    [t.formulaRobinson, results.robinson],
    [t.formulaMiller,   results.miller],
  ] : [];

  return (
    <div className={styles['iw-widget']}>
      <div className={styles['iw-widget__form']}>

        <div className={styles['iw-widget__controls']}>
          <div className={styles['iw-widget__toggle']} role="group" aria-label="Gender">
            <button
              type="button"
              className={`${styles['iw-widget__toggle-btn']} ${gender === 'male' ? styles['iw-widget__toggle-btn--active'] : ''}`}
              onClick={() => handleGender('male')}
            >
              {t.male}
            </button>
            <button
              type="button"
              className={`${styles['iw-widget__toggle-btn']} ${gender === 'female' ? styles['iw-widget__toggle-btn--active'] : ''}`}
              onClick={() => handleGender('female')}
            >
              {t.female}
            </button>
          </div>

          <div className={styles['iw-widget__toggle']} role="group" aria-label="Units">
            <button
              type="button"
              className={`${styles['iw-widget__toggle-btn']} ${unit === 'metric' ? styles['iw-widget__toggle-btn--active'] : ''}`}
              onClick={() => handleUnit('metric')}
            >
              {t.metric}
            </button>
            <button
              type="button"
              className={`${styles['iw-widget__toggle-btn']} ${unit === 'imperial' ? styles['iw-widget__toggle-btn--active'] : ''}`}
              onClick={() => handleUnit('imperial')}
            >
              {t.imperial}
            </button>
          </div>
        </div>

        <div className={styles['iw-widget__field']}>
          <label className={styles['iw-widget__label']}>{t.height}</label>
          {unit === 'metric' ? (
            <div className={styles['iw-widget__input-wrap']}>
              <input
                className={styles['iw-widget__input']}
                type="number"
                min="130"
                max="220"
                step="1"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                placeholder="175"
                aria-label={`${t.height} (${t.heightCm})`}
              />
              <span className={styles['iw-widget__suffix']}>{t.heightCm}</span>
            </div>
          ) : (
            <div className={styles['iw-widget__input-row']}>
              <div className={styles['iw-widget__input-wrap']}>
                <input
                  className={styles['iw-widget__input']}
                  type="number"
                  min="4"
                  max="7"
                  step="1"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="5"
                  aria-label={`${t.height} (${t.heightFt})`}
                />
                <span className={styles['iw-widget__suffix']}>{t.heightFt}</span>
              </div>
              <div className={styles['iw-widget__input-wrap']}>
                <input
                  className={styles['iw-widget__input']}
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
                <span className={styles['iw-widget__suffix']}>{t.heightIn}</span>
              </div>
            </div>
          )}
        </div>

        {error && <p className={styles['iw-widget__error']}>{error}</p>}

        <button className={styles['iw-widget__btn']} onClick={handleCalculate} type="button">
          {t.calculate}
        </button>
      </div>

      {results && (
        <div className={styles['iw-widget__results']}>
          <div className={styles['iw-widget__main-result']}>
            <p className={styles['iw-widget__main-label']}>{t.bmiRange}</p>
            <p className={styles['iw-widget__main-range']}>
              {fmt(results.bmiMin)}&thinsp;—&thinsp;{fmt(results.bmiMax)}
            </p>
            <p className={styles['iw-widget__main-note']}>{t.bmiRangeLabel}</p>
          </div>

          <div className={styles['iw-widget__formulas']}>
            <p className={styles['iw-widget__formulas-title']}>{t.formulaBreakdown}</p>
            <table className={styles['iw-widget__table']}>
              <thead>
                <tr>
                  <th className={styles['iw-widget__th']}>{t.formula}</th>
                  <th className={styles['iw-widget__th']}>{t.weight}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, val]) => (
                  <tr key={name} className={styles['iw-widget__tr']}>
                    <td className={styles['iw-widget__td']}>{name}</td>
                    <td className={styles['iw-widget__td']}>{fmt(val)}</td>
                  </tr>
                ))}
                <tr className={`${styles['iw-widget__tr']} ${styles['iw-widget__tr--avg']}`}>
                  <td className={styles['iw-widget__td']}>{t.average}</td>
                  <td className={styles['iw-widget__td']}>{fmt(results.avg)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
