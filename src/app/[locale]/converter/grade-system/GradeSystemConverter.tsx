'use client';

import { useState, useEffect } from 'react';
import styles from './GradeSystemConverter.module.scss';

type SystemKey = 'us' | 'uk_percent' | 'ects' | 'ru' | 'de';

type SystemConfig = {
  min: number;
  max: number;
  step: number;
  toPercent: (v: number) => number;
  fromPercent: (p: number) => number;
  format: (v: number) => string;
};

// All systems normalised through 0-100% internally
const SYSTEMS: Record<SystemKey, SystemConfig> = {
  us: {
    min: 0, max: 4.3, step: 0.1,
    toPercent: v => (v / 4.3) * 100,
    fromPercent: p => (p / 100) * 4.3,
    format: v => v.toFixed(2),
  },
  uk_percent: {
    min: 0, max: 100, step: 1,
    toPercent: v => v,
    fromPercent: p => p,
    format: v => Math.round(v) + '%',
  },
  ects: {
    // A≥90, B≥80, C≥70, D≥60, E≥50, F<50
    min: 0, max: 100, step: 1,
    toPercent: v => v,
    fromPercent: p => p,
    format: v => {
      if (v >= 90) return 'A';
      if (v >= 80) return 'B';
      if (v >= 70) return 'C';
      if (v >= 60) return 'D';
      if (v >= 50) return 'E';
      return 'F';
    },
  },
  ru: {
    // 5=90-100, 4=70-89, 3=50-69, 2<50
    min: 2, max: 5, step: 1,
    toPercent: v => v === 5 ? 95 : v === 4 ? 80 : v === 3 ? 60 : 30,
    fromPercent: p => p >= 90 ? 5 : p >= 70 ? 4 : p >= 50 ? 3 : 2,
    format: v => String(Math.round(v)),
  },
  de: {
    // DE: 1.0 best, 6.0 worst. 1=95, 2=80, 3=67, 4=50, 5=30, 6<30
    min: 1.0, max: 6.0, step: 0.1,
    toPercent: v => {
      if (v <= 1.5) return 95;
      if (v <= 2.5) return 80;
      if (v <= 3.5) return 67;
      if (v <= 4.0) return 50;
      if (v <= 5.0) return 30;
      return 10;
    },
    fromPercent: p => {
      if (p >= 95) return 1.0;
      if (p >= 80) return 2.0;
      if (p >= 67) return 3.0;
      if (p >= 50) return 4.0;
      if (p >= 30) return 5.0;
      return 6.0;
    },
    format: v => v.toFixed(1),
  },
};

const SYSTEM_LABELS: Record<SystemKey, Record<string, string>> = {
  us:         { en: 'US GPA (0–4.3)',            ru: 'США GPA (0–4,3)',           uk: 'США GPA (0–4,3)',            fr: 'GPA américain (0–4,3)',      lt: 'JAV GPA (0–4,3)'          },
  uk_percent: { en: 'UK / International (%)',    ru: 'Великобритания / %',        uk: 'Великобританія / %',         fr: 'Royaume-Uni / %',            lt: 'JK / tarptautinė (%)'     },
  ects:       { en: 'European ECTS (A–F)',        ru: 'Европейская ECTS (A–F)',    uk: 'Європейська ECTS (A–F)',     fr: 'ECTS européen (A–F)',         lt: 'Europos ECTS (A–F)'       },
  ru:         { en: 'Russian / CIS (2–5)',        ru: 'Российская / СНГ (2–5)',    uk: 'Українська / СНД (2–5)',     fr: 'Russe / CEI (2–5)',           lt: 'Rusijos / NVS (2–5)'      },
  de:         { en: 'German (1.0–6.0)',           ru: 'Немецкая (1,0–6,0)',        uk: 'Німецька (1,0–6,0)',         fr: 'Allemand (1,0–6,0)',          lt: 'Vokiška (1,0–6,0)'        },
};

const SYSTEM_KEYS = Object.keys(SYSTEMS) as SystemKey[];

const L: Record<string, Record<string, string>> = {
  sourceSystem: { en: 'Source System',  ru: 'Исходная система',      uk: 'Вихідна система',       fr: 'Système source',       lt: 'Pradinė sistema'    },
  gradeValue:   { en: 'Your Grade',     ru: 'Ваша оценка',           uk: 'Ваша оцінка',           fr: 'Votre note',           lt: 'Jūsų pažymys'       },
  convert:      { en: 'Convert',        ru: 'Конвертировать',        uk: 'Конвертувати',          fr: 'Convertir',            lt: 'Konvertuoti'        },
  system:       { en: 'System',         ru: 'Система',               uk: 'Система',               fr: 'Système',              lt: 'Sistema'            },
  equivalent:   { en: 'Equivalent',     ru: 'Эквивалент',            uk: 'Еквівалент',            fr: 'Équivalent',           lt: 'Atitikmuo'          },
  errRange:     { en: 'Grade is outside the valid range for this system', ru: 'Оценка вне допустимого диапазона', uk: 'Оцінка поза допустимим діапазоном', fr: 'Note hors de la plage valide', lt: 'Pažymys už leistino diapazono ribų' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

function getSystemLabel(key: SystemKey, locale: string): string {
  return SYSTEM_LABELS[key]?.[locale] ?? SYSTEM_LABELS[key]?.en ?? key;
}

export default function GradeSystemConverter({ locale }: { locale: string }) {
  const [sourceSystem, setSourceSystem] = useState<SystemKey>('us');
  const [gradeValue, setGradeValue] = useState('3.5');
  const [results, setResults] = useState<{ key: SystemKey; formatted: string }[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('utilixi_grades_source') as SystemKey | null;
    if (saved && SYSTEM_KEYS.includes(saved)) setSourceSystem(saved);
  }, []);

  function handleSourceChange(key: SystemKey) {
    setSourceSystem(key);
    setResults(null);
    setError('');
    localStorage.setItem('utilixi_grades_source', key);
  }

  function convert() {
    setError('');
    const val = parseFloat(gradeValue);
    const sys = SYSTEMS[sourceSystem];

    if (isNaN(val) || val < sys.min || val > sys.max) {
      setError(t('errRange', locale));
      return;
    }

    const percent = sys.toPercent(val);
    const converted = SYSTEM_KEYS.map(key => ({
      key,
      formatted: key === sourceSystem
        ? sys.format(val)
        : SYSTEMS[key].format(SYSTEMS[key].fromPercent(percent)),
    }));

    setResults(converted);
  }

  const sys = SYSTEMS[sourceSystem];

  return (
    <div className={styles['grade-converter']}>
      <div className={styles['grade-converter__form']}>
        <div className={styles['grade-converter__row']}>
          <div className={styles['grade-converter__field']}>
            <label className={styles['grade-converter__label']}>{t('sourceSystem', locale)}</label>
            <select
              className={styles['grade-converter__select']}
              value={sourceSystem}
              onChange={e => handleSourceChange(e.target.value as SystemKey)}
            >
              {SYSTEM_KEYS.map(k => (
                <option key={k} value={k}>{getSystemLabel(k, locale)}</option>
              ))}
            </select>
          </div>
          <div className={styles['grade-converter__field']}>
            <label className={styles['grade-converter__label']}>
              {t('gradeValue', locale)} ({sys.min}–{sys.max})
            </label>
            <input
              type="number"
              className={styles['grade-converter__input']}
              value={gradeValue}
              onChange={e => { setGradeValue(e.target.value); setResults(null); }}
              min={sys.min} max={sys.max} step={sys.step}
            />
          </div>
        </div>

        {error && <p style={{ color: '#e53e3e', fontSize: 'var(--font-size-sm)' }}>{error}</p>}

        <button type="button" className={styles['grade-converter__btn']} onClick={convert}>
          {t('convert', locale)}
        </button>
      </div>

      {results && (
        <div className={styles['grade-converter__results']}>
          <table className={styles['grade-converter__table']}>
            <thead>
              <tr>
                <th className={styles['grade-converter__th']}>{t('system', locale)}</th>
                <th className={styles['grade-converter__th']}>{t('equivalent', locale)}</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr
                  key={r.key}
                  className={r.key === sourceSystem ? styles['grade-converter__tr--source'] : ''}
                >
                  <td className={styles['grade-converter__td']}>{getSystemLabel(r.key, locale)}</td>
                  <td className={styles['grade-converter__td']}>{r.formatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
