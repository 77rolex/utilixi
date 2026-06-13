'use client';
import { useState } from 'react';
import styles from './PoolVolumeCalculator.module.scss';

const T: Record<string, {
  shapeRect: string; shapeRound: string; shapeOval: string; shapeFreeform: string;
  length: string; width: string; radius: string; depth: string; avgDepth: string;
  m: string;
  calculate: string;
  m3: string; liters: string; gallons: string;
  chemTitle: string; chlorine: string; ph: string; shock: string; perWeek: string;
  chemNote: string; error: string;
}> = {
  en: { shapeRect: 'Rectangular', shapeRound: 'Round', shapeOval: 'Oval', shapeFreeform: 'Freeform', length: 'Length', width: 'Width', radius: 'Radius', depth: 'Depth', avgDepth: 'Average Depth', m: 'm', calculate: 'Calculate Volume', m3: 'm³', liters: 'Litres', gallons: 'Gallons', chemTitle: 'Chemical Estimates (weekly)', chlorine: 'Chlorine', ph: 'pH Adjuster', shock: 'Shock Treatment', perWeek: 'g/week', chemNote: 'Estimated dosing per 10,000 L of pool water per week', error: 'Please enter valid positive numbers.' },
  ru: { shapeRect: 'Прямоугольный', shapeRound: 'Круглый', shapeOval: 'Овальный', shapeFreeform: 'Произвольный', length: 'Длина', width: 'Ширина', radius: 'Радиус', depth: 'Глубина', avgDepth: 'Средняя глубина', m: 'м', calculate: 'Рассчитать объём', m3: 'м³', liters: 'Литры', gallons: 'Галлоны', chemTitle: 'Химия (еженедельно)', chlorine: 'Хлор', ph: 'pH-коррект.', shock: 'Ударная доза', perWeek: 'г/нед.', chemNote: 'Оценка дозировки на каждые 10 000 л воды в неделю', error: 'Введите корректные положительные числа.' },
  uk: { shapeRect: 'Прямокутний', shapeRound: 'Круглий', shapeOval: 'Овальний', shapeFreeform: 'Довільний', length: 'Довжина', width: 'Ширина', radius: 'Радіус', depth: 'Глибина', avgDepth: 'Середня глибина', m: 'м', calculate: 'Розрахувати об\'єм', m3: 'м³', liters: 'Літри', gallons: 'Галони', chemTitle: 'Хімія (щотижнево)', chlorine: 'Хлор', ph: 'pH-коректор', shock: 'Ударна доза', perWeek: 'г/тиж.', chemNote: 'Оцінка дозування на кожні 10 000 л води на тиждень', error: 'Введіть коректні додатні числа.' },
  fr: { shapeRect: 'Rectangulaire', shapeRound: 'Rond', shapeOval: 'Ovale', shapeFreeform: 'Forme libre', length: 'Longueur', width: 'Largeur', radius: 'Rayon', depth: 'Profondeur', avgDepth: 'Profondeur moyenne', m: 'm', calculate: 'Calculer le volume', m3: 'm³', liters: 'Litres', gallons: 'Gallons', chemTitle: 'Produits chimiques (hebdomadaire)', chlorine: 'Chlore', ph: 'Correcteur pH', shock: 'Traitement choc', perWeek: 'g/sem.', chemNote: 'Dosage estimé pour 10 000 L d\'eau par semaine', error: 'Veuillez entrer des nombres positifs valides.' },
  lt: { shapeRect: 'Stačiakampis', shapeRound: 'Apvalus', shapeOval: 'Ovalus', shapeFreeform: 'Laisvos formos', length: 'Ilgis', width: 'Plotis', radius: 'Spindulys', depth: 'Gylis', avgDepth: 'Vidutinis gylis', m: 'm', calculate: 'Skaičiuoti tūrį', m3: 'm³', liters: 'Litrai', gallons: 'Galonai', chemTitle: 'Cheminės medžiagos (kas savaitę)', chlorine: 'Chloras', ph: 'pH reguliatorius', shock: 'Smūginis gydymas', perWeek: 'g/sav.', chemNote: 'Apytikslis dozavimas 10 000 L vandens per savaitę', error: 'Įveskite teigiamus skaičius.' },
};

type Shape = 'rect' | 'round' | 'oval' | 'freeform';

export default function PoolVolumeCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [shape, setShape] = useState<Shape>('rect');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [radius, setRadius] = useState('');
  const [depth, setDepth] = useState('1.5');
  const [result, setResult] = useState<{ m3: number; liters: number; gallons: number; chem: { chlorine: number; ph: number; shock: number } } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const d = parseFloat(depth);
    if (!d || d <= 0) { setError(t.error); return; }
    let vol = 0;

    if (shape === 'rect') {
      const l = parseFloat(length); const w = parseFloat(width);
      if (!l || l <= 0 || !w || w <= 0) { setError(t.error); return; }
      vol = l * w * d;
    } else if (shape === 'round') {
      const r = parseFloat(radius);
      if (!r || r <= 0) { setError(t.error); return; }
      vol = Math.PI * r * r * d;
    } else if (shape === 'oval') {
      const l = parseFloat(length); const w = parseFloat(width);
      if (!l || l <= 0 || !w || w <= 0) { setError(t.error); return; }
      vol = (Math.PI / 4) * l * w * d;
    } else {
      const l = parseFloat(length); const w = parseFloat(width);
      if (!l || l <= 0 || !w || w <= 0) { setError(t.error); return; }
      vol = l * w * d * 0.85;
    }

    const liters = vol * 1000;
    const per10k = liters / 10000;
    setResult({
      m3: vol,
      liters,
      gallons: liters * 0.264172,
      chem: { chlorine: Math.round(per10k * 175), ph: Math.round(per10k * 200), shock: Math.round(per10k * 300) },
    });
  }

  const shapes: { key: Shape; icon: string; label: string }[] = [
    { key: 'rect', icon: '▭', label: t.shapeRect },
    { key: 'round', icon: '○', label: t.shapeRound },
    { key: 'oval', icon: '⬯', label: t.shapeOval },
    { key: 'freeform', icon: '~', label: t.shapeFreeform },
  ];

  return (
    <div className={styles.widget}>
      <div className={styles.widget__shape_row}>
        {shapes.map(s => (
          <button key={s.key} type="button" className={`${styles['widget__shape-btn']}${shape === s.key ? ` ${styles['widget__shape-btn--active']}` : ''}`} onClick={() => { setShape(s.key); setResult(null); }}>
            <span className={styles['widget__shape-icon']}>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {(shape === 'rect' || shape === 'oval' || shape === 'freeform') && (
        <div className={styles.widget__row}>
          <div className={styles.widget__field}>
            <label className={styles.widget__label}>{t.length} ({t.m})</label>
            <div className={styles['widget__input-wrap']}>
              <input type="number" min="0" step="0.1" className={styles.widget__input} value={length} onChange={e => setLength(e.target.value)} placeholder="8" />
              <span className={styles.widget__suffix}>{t.m}</span>
            </div>
          </div>
          <div className={styles.widget__field}>
            <label className={styles.widget__label}>{t.width} ({t.m})</label>
            <div className={styles['widget__input-wrap']}>
              <input type="number" min="0" step="0.1" className={styles.widget__input} value={width} onChange={e => setWidth(e.target.value)} placeholder="4" />
              <span className={styles.widget__suffix}>{t.m}</span>
            </div>
          </div>
        </div>
      )}

      {shape === 'round' && (
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.radius} ({t.m})</label>
          <div className={styles['widget__input-wrap']}>
            <input type="number" min="0" step="0.1" className={styles.widget__input} value={radius} onChange={e => setRadius(e.target.value)} placeholder="3" />
            <span className={styles.widget__suffix}>{t.m}</span>
          </div>
        </div>
      )}

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{shape === 'freeform' ? t.avgDepth : t.depth} ({t.m})</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="0" step="0.1" className={styles.widget__input} value={depth} onChange={e => setDepth(e.target.value)} />
          <span className={styles.widget__suffix}>{t.m}</span>
        </div>
      </div>

      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__volume-hero']}>
            <div className={`${styles['widget__vol-card']} ${styles['widget__vol-card--primary']}`}>
              <div className={styles['widget__vol-label']}>{t.m3}</div>
              <div className={styles['widget__vol-value']}>{result.m3.toFixed(1)}</div>
              <div className={styles['widget__vol-unit']}>m³</div>
            </div>
            <div className={styles['widget__vol-card']}>
              <div className={styles['widget__vol-label']}>{t.liters}</div>
              <div className={styles['widget__vol-value']}>{Math.round(result.liters).toLocaleString()}</div>
              <div className={styles['widget__vol-unit']}>L</div>
            </div>
            <div className={styles['widget__vol-card']}>
              <div className={styles['widget__vol-label']}>{t.gallons}</div>
              <div className={styles['widget__vol-value']}>{Math.round(result.gallons).toLocaleString()}</div>
              <div className={styles['widget__vol-unit']}>gal</div>
            </div>
          </div>
          <div className={styles.widget__chemicals}>
            <div className={styles['widget__chem-title']}>{t.chemTitle}</div>
            <div className={styles['widget__chem-note']}>{t.chemNote}</div>
            <div className={styles['widget__chem-row']}><span>{t.chlorine}</span><span className={styles['widget__chem-amount']}>{result.chem.chlorine.toLocaleString()} {t.perWeek}</span></div>
            <div className={styles['widget__chem-row']}><span>{t.ph}</span><span className={styles['widget__chem-amount']}>{result.chem.ph.toLocaleString()} {t.perWeek}</span></div>
            <div className={styles['widget__chem-row']}><span>{t.shock}</span><span className={styles['widget__chem-amount']}>{result.chem.shock.toLocaleString()} {t.perWeek}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
