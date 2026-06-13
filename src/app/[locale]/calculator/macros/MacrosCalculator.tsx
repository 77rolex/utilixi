'use client';
import { useState } from 'react';
import styles from './MacrosCalculator.module.scss';

const T: Record<string, {
  calories: string; calPlaceholder: string;
  goal: string; goalCut: string; goalMaintain: string; goalBulk: string;
  calculate: string;
  protein: string; fat: string; carbs: string;
  perDay: string; grams: string; ofCalories: string;
  error: string;
}> = {
  en: { calories: 'Daily Calories (kcal)', calPlaceholder: '2000', goal: 'Your Goal', goalCut: 'Lose Weight (Cut)', goalMaintain: 'Maintain Weight', goalBulk: 'Gain Muscle (Bulk)', calculate: 'Calculate Macros', protein: 'Protein', fat: 'Fat', carbs: 'Carbohydrates', perDay: 'per day', grams: 'g', ofCalories: '% of calories', error: 'Please enter a valid calorie amount (100–10000).' },
  ru: { calories: 'Суточные калории (ккал)', calPlaceholder: '2000', goal: 'Ваша цель', goalCut: 'Похудение', goalMaintain: 'Поддержание веса', goalBulk: 'Набор мышечной массы', calculate: 'Рассчитать БЖУ', protein: 'Белки', fat: 'Жиры', carbs: 'Углеводы', perDay: 'в день', grams: 'г', ofCalories: '% калорий', error: 'Введите корректное количество калорий (100–10000).' },
  uk: { calories: 'Добові калорії (ккал)', calPlaceholder: '2000', goal: 'Ваша мета', goalCut: 'Схуднення', goalMaintain: 'Підтримання ваги', goalBulk: 'Набір м\'язової маси', calculate: 'Розрахувати БЖВ', protein: 'Білки', fat: 'Жири', carbs: 'Вуглеводи', perDay: 'на день', grams: 'г', ofCalories: '% калорій', error: 'Введіть коректну кількість калорій (100–10000).' },
  fr: { calories: 'Calories quotidiennes (kcal)', calPlaceholder: '2000', goal: 'Votre objectif', goalCut: 'Perte de poids', goalMaintain: 'Maintien du poids', goalBulk: 'Prise de muscle', calculate: 'Calculer les macros', protein: 'Protéines', fat: 'Lipides', carbs: 'Glucides', perDay: 'par jour', grams: 'g', ofCalories: '% des calories', error: 'Veuillez entrer une quantité valide de calories (100–10000).' },
  lt: { calories: 'Dienos kalorijos (kcal)', calPlaceholder: '2000', goal: 'Jūsų tikslas', goalCut: 'Svorio metimas', goalMaintain: 'Svorio palaikymas', goalBulk: 'Raumenų auginimas', calculate: 'Skaičiuoti makroelementus', protein: 'Baltymai', fat: 'Riebalai', carbs: 'Angliavandeniai', perDay: 'per dieną', grams: 'g', ofCalories: '% kalorijų', error: 'Įveskite tinkamą kalorijų kiekį (100–10000).' },
};

const RATIOS: Record<string, { protein: number; fat: number; carbs: number }> = {
  cut:      { protein: 0.40, fat: 0.30, carbs: 0.30 },
  maintain: { protein: 0.30, fat: 0.30, carbs: 0.40 },
  bulk:     { protein: 0.30, fat: 0.25, carbs: 0.45 },
};

export default function MacrosCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [calories, setCalories] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState<{ protein: number; fat: number; carbs: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const cal = parseFloat(calories);
    if (!cal || cal < 100 || cal > 10000) { setError(t.error); return; }
    const r = RATIOS[goal];
    setResult({
      total: cal,
      protein: Math.round((cal * r.protein) / 4),
      fat: Math.round((cal * r.fat) / 9),
      carbs: Math.round((cal * r.carbs) / 4),
    });
  }

  const macros = result ? [
    { key: 'protein', name: t.protein, grams: result.protein, pct: Math.round((result.protein * 4 / result.total) * 100) },
    { key: 'fat',     name: t.fat,     grams: result.fat,     pct: Math.round((result.fat * 9 / result.total) * 100) },
    { key: 'carbs',   name: t.carbs,   grams: result.carbs,   pct: Math.round((result.carbs * 4 / result.total) * 100) },
  ] : [];

  return (
    <div className={styles.widget}>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.calories}</label>
        <input type="number" min="100" max="10000" className={styles.widget__input} value={calories} onChange={e => setCalories(e.target.value)} placeholder={t.calPlaceholder} />
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.goal}</label>
        <select className={styles.widget__select} value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="cut">{t.goalCut}</option>
          <option value="maintain">{t.goalMaintain}</option>
          <option value="bulk">{t.goalBulk}</option>
        </select>
      </div>

      {error && <p className={styles.widget__error}>{error}</p>}

      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__total-cal']}>
            {t.perDay}
            <strong>{result.total} kcal</strong>
          </div>
          <div className={styles['widget__macro-list']}>
            {macros.map(m => (
              <div key={m.key} className={styles.widget__macro}>
                <div className={styles['widget__macro-info']}>
                  <div className={styles['widget__macro-name']}>{m.name}</div>
                  <div className={styles['widget__bar-wrap']}>
                    <div className={`${styles.widget__bar} ${styles[`widget__bar--${m.key}`]}`} style={{ width: `${m.pct}%` }} />
                  </div>
                  <div className={styles['widget__macro-cal']}>{m.pct} {t.ofCalories}</div>
                </div>
                <div className={styles['widget__macro-grams']}>{m.grams}{t.grams}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
