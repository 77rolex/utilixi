'use client';
import { useState } from 'react';
import styles from './TravelBudgetCalculator.module.scss';

const T: Record<string, {
  travelers: string; days: string; accommodation: string; food: string;
  transport: string; activities: string; misc: string;
  perNight: string; perDay: string; total: string;
  calculate: string;
  totalBudget: string; perPerson: string; perPersonDay: string;
  breakdown: string;
  accommodationLabel: string; foodLabel: string; transportLabel: string; activitiesLabel: string; miscLabel: string;
  error: string; curr: string;
}> = {
  en: { travelers: 'Number of Travelers', days: 'Number of Days', accommodation: 'Accommodation (per night, total)', food: 'Food (per person/day)', transport: 'Transportation (total)', activities: 'Activities (per person/day)', misc: 'Other Expenses (per person/day)', perNight: '₴/night', perDay: '₴/person/day', total: 'total ₴', curr: '₴', calculate: 'Calculate Budget', totalBudget: 'Total Budget', perPerson: 'Per Person', perPersonDay: 'Per Person/Day', breakdown: 'Expense Breakdown', accommodationLabel: 'Accommodation', foodLabel: 'Food', transportLabel: 'Transportation', activitiesLabel: 'Activities', miscLabel: 'Miscellaneous', error: 'Please enter valid numbers. Travelers and days must be at least 1.' },
  ru: { travelers: 'Количество путешественников', days: 'Количество дней', accommodation: 'Проживание (за ночь, на всех)', food: 'Питание (на человека/день)', transport: 'Транспорт (общий)', activities: 'Развлечения (на человека/день)', misc: 'Прочие расходы (на человека/день)', perNight: '₴/ночь', perDay: '₴/чел/день', total: 'всего ₴', curr: '₴', calculate: 'Рассчитать бюджет', totalBudget: 'Общий бюджет', perPerson: 'На человека', perPersonDay: 'На человека/день', breakdown: 'Разбивка расходов', accommodationLabel: 'Проживание', foodLabel: 'Питание', transportLabel: 'Транспорт', activitiesLabel: 'Развлечения', miscLabel: 'Прочее', error: 'Введите корректные числа. Путешественников и дней — минимум 1.' },
  uk: { travelers: 'Кількість мандрівників', days: 'Кількість днів', accommodation: 'Проживання (за ніч, на всіх)', food: 'Харчування (на людину/день)', transport: 'Транспорт (загальний)', activities: 'Розваги (на людину/день)', misc: 'Інші витрати (на людину/день)', perNight: '₴/ніч', perDay: '₴/ос/день', total: 'загалом ₴', curr: '₴', calculate: 'Розрахувати бюджет', totalBudget: 'Загальний бюджет', perPerson: 'На людину', perPersonDay: 'На людину/день', breakdown: 'Розбивка витрат', accommodationLabel: 'Проживання', foodLabel: 'Харчування', transportLabel: 'Транспорт', activitiesLabel: 'Розваги', miscLabel: 'Інше', error: 'Введіть коректні числа. Мандрівників і днів — мінімум 1.' },
  fr: { travelers: 'Nombre de voyageurs', days: 'Nombre de jours', accommodation: 'Hébergement (par nuit, total)', food: 'Nourriture (par personne/jour)', transport: 'Transport (total)', activities: 'Activités (par personne/jour)', misc: 'Autres dépenses (par personne/jour)', perNight: '€/nuit', perDay: '€/pers/jour', total: 'total €', curr: '€', calculate: 'Calculer le budget', totalBudget: 'Budget total', perPerson: 'Par personne', perPersonDay: 'Par personne/jour', breakdown: 'Répartition des dépenses', accommodationLabel: 'Hébergement', foodLabel: 'Nourriture', transportLabel: 'Transport', activitiesLabel: 'Activités', miscLabel: 'Divers', error: 'Veuillez entrer des nombres valides. Au moins 1 voyageur et 1 jour.' },
  lt: { travelers: 'Keliautojų skaičius', days: 'Dienų skaičius', accommodation: 'Apgyvendinimas (per naktį, iš viso)', food: 'Maistas (vienam asmeniui/dieną)', transport: 'Transportas (iš viso)', activities: 'Veiklos (vienam asmeniui/dieną)', misc: 'Kitos išlaidos (vienam asmeniui/dieną)', perNight: '€/naktis', perDay: '€/asm/dieną', total: 'iš viso €', curr: '€', calculate: 'Skaičiuoti biudžetą', totalBudget: 'Bendras biudžetas', perPerson: 'Vienam asmeniui', perPersonDay: 'Vienam asmeniui/dieną', breakdown: 'Išlaidų paskirstymas', accommodationLabel: 'Apgyvendinimas', foodLabel: 'Maistas', transportLabel: 'Transportas', activitiesLabel: 'Veiklos', miscLabel: 'Kita', error: 'Įveskite tinkamus skaičius. Mažiausiai 1 keliautojas ir 1 diena.' },
};

export default function TravelBudgetCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [travelers, setTravelers] = useState('2');
  const [days, setDays] = useState('7');
  const [accommodation, setAccommodation] = useState('');
  const [food, setFood] = useState('');
  const [transport, setTransport] = useState('');
  const [activities, setActivities] = useState('');
  const [misc, setMisc] = useState('');
  const [result, setResult] = useState<{ total: number; perPerson: number; ppd: number; breakdown: Record<string, number> } | null>(null);
  const [error, setError] = useState('');

  function p(v: string) { return parseFloat(v) || 0; }

  function calculate() {
    setError('');
    const tr = parseInt(travelers);
    const d = parseInt(days);
    if (!tr || tr < 1 || !d || d < 1) { setError(t.error); return; }
    const accTotal = p(accommodation) * d;
    const foodTotal = p(food) * tr * d;
    const transTotal = p(transport);
    const actTotal = p(activities) * tr * d;
    const miscTotal = p(misc) * tr * d;
    const total = accTotal + foodTotal + transTotal + actTotal + miscTotal;
    setResult({
      total,
      perPerson: total / tr,
      ppd: total / tr / d,
      breakdown: { accommodation: accTotal, food: foodTotal, transport: transTotal, activities: actTotal, misc: miscTotal },
    });
  }

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className={styles.widget}>
      <div className={styles.widget__grid}>
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.travelers}</label>
          <input type="number" min="1" max="50" className={styles.widget__input} value={travelers} onChange={e => setTravelers(e.target.value)} />
        </div>
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.days}</label>
          <input type="number" min="1" max="365" className={styles.widget__input} value={days} onChange={e => setDays(e.target.value)} />
        </div>
      </div>

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.accommodation} ({t.perNight})</label>
        <input type="number" min="0" className={styles.widget__input} value={accommodation} onChange={e => setAccommodation(e.target.value)} placeholder="80" />
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.food} ({t.perDay})</label>
        <input type="number" min="0" className={styles.widget__input} value={food} onChange={e => setFood(e.target.value)} placeholder="30" />
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.transport} ({t.total})</label>
        <input type="number" min="0" className={styles.widget__input} value={transport} onChange={e => setTransport(e.target.value)} placeholder="400" />
      </div>
      <div className={styles.widget__grid}>
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.activities} ({t.perDay})</label>
          <input type="number" min="0" className={styles.widget__input} value={activities} onChange={e => setActivities(e.target.value)} placeholder="20" />
        </div>
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.misc} ({t.perDay})</label>
          <input type="number" min="0" className={styles.widget__input} value={misc} onChange={e => setMisc(e.target.value)} placeholder="10" />
        </div>
      </div>

      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles.widget__hero}>
            <div className={`${styles['widget__hero-card']} ${styles['widget__hero-card--total']}`}>
              <div className={styles['widget__hero-label']}>{t.totalBudget}</div>
              <div className={styles['widget__hero-value']}>{t.curr}{fmt(result.total)}</div>
            </div>
            <div className={`${styles['widget__hero-card']} ${styles['widget__hero-card--person']}`}>
              <div className={styles['widget__hero-label']}>{t.perPerson}</div>
              <div className={styles['widget__hero-value']}>{t.curr}{fmt(result.perPerson)}</div>
              <div className={styles['widget__hero-label']}>{t.perPersonDay}: {t.curr}{result.ppd.toFixed(0)}</div>
            </div>
          </div>
          <div className={styles.widget__breakdown}>
            <div className={styles['widget__breakdown-title']}>{t.breakdown}</div>
            {[
              [t.accommodationLabel, result.breakdown.accommodation],
              [t.foodLabel, result.breakdown.food],
              [t.transportLabel, result.breakdown.transport],
              [t.activitiesLabel, result.breakdown.activities],
              [t.miscLabel, result.breakdown.misc],
            ].filter(([, v]) => (v as number) > 0).map(([label, val]) => (
              <div key={String(label)} className={styles['widget__breakdown-row']}>
                <span>{String(label)}</span>
                <span className={styles['widget__breakdown-val']}>{t.curr}{fmt(val as number)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
