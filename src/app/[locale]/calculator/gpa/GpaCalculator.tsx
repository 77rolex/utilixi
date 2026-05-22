'use client';

import { useState } from 'react';
import styles from './GpaCalculator.module.scss';

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.3, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0,
  'F':  0.0,
};

const GRADE_KEYS = Object.keys(GRADE_POINTS);

function gpaToLetter(gpa: number): string {
  if (gpa >= 4.0) return 'A';
  if (gpa >= 3.7) return 'A-';
  if (gpa >= 3.3) return 'B+';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.7) return 'B-';
  if (gpa >= 2.3) return 'C+';
  if (gpa >= 2.0) return 'C';
  if (gpa >= 1.7) return 'C-';
  if (gpa >= 1.3) return 'D+';
  if (gpa >= 1.0) return 'D';
  return 'F';
}

const L: Record<string, Record<string, string>> = {
  course:      { en: 'Course Name',       ru: 'Название курса',          uk: 'Назва курсу',              fr: 'Nom du cours',              lt: 'Kurso pavadinimas'       },
  grade:       { en: 'Grade',             ru: 'Оценка',                  uk: 'Оцінка',                   fr: 'Note',                      lt: 'Pažymys'                 },
  credits:     { en: 'Credits',           ru: 'Кредиты',                 uk: 'Кредити',                  fr: 'Crédits',                   lt: 'Kreditai'                },
  addCourse:   { en: '+ Add Course',      ru: '+ Добавить курс',         uk: '+ Додати курс',            fr: '+ Ajouter un cours',        lt: '+ Pridėti kursą'         },
  calculate:   { en: 'Calculate GPA',     ru: 'Рассчитать GPA',          uk: 'Розрахувати GPA',          fr: 'Calculer la GPA',           lt: 'Skaičiuoti GPA'          },
  yourGpa:     { en: 'Your GPA',          ru: 'Ваш GPA',                 uk: 'Ваш GPA',                  fr: 'Votre GPA',                 lt: 'Jūsų GPA'                },
  letterGrade: { en: 'Letter Grade',      ru: 'Буквенная оценка',        uk: 'Буквена оцінка',           fr: 'Note littérale',            lt: 'Raidinis pažymys'        },
  totalCredits:{ en: 'Total Credits',     ru: 'Всего кредитов',          uk: 'Всього кредитів',          fr: 'Total crédits',             lt: 'Iš viso kreditų'         },
  courses:     { en: 'Courses',           ru: 'Курсов',                  uk: 'Курсів',                   fr: 'Cours',                     lt: 'Kursų'                   },
  errMin:      { en: 'Add at least 1 course with valid credits', ru: 'Добавьте хотя бы 1 курс с кредитами', uk: 'Додайте хоча б 1 курс з кредитами', fr: 'Ajoutez au moins 1 cours avec des crédits valides', lt: 'Pridėkite bent 1 kursą su kreditais' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Course = { id: number; name: string; grade: string; credits: string };
type Result = { gpa: number; letter: string; totalCredits: number; courseCount: number };

let nextId = 4;

export default function GpaCalculator({ locale }: { locale: string }) {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: 'A', credits: '3' },
    { id: 2, name: '', grade: 'B+', credits: '3' },
    { id: 3, name: '', grade: 'B', credits: '4' },
  ]);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function updateCourse(id: number, field: keyof Course, value: string) {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    setResult(null);
  }

  function addCourse() {
    setCourses(prev => [...prev, { id: nextId++, name: '', grade: 'B', credits: '3' }]);
  }

  function removeCourse(id: number) {
    if (courses.length <= 1) return;
    setCourses(prev => prev.filter(c => c.id !== id));
    setResult(null);
  }

  function calculate() {
    setError('');
    const valid = courses.filter(c => {
      const cr = parseFloat(c.credits);
      return cr > 0 && GRADE_POINTS[c.grade] !== undefined;
    });

    if (valid.length === 0) { setError(t('errMin', locale)); return; }

    const totalPoints = valid.reduce((sum, c) => sum + GRADE_POINTS[c.grade] * parseFloat(c.credits), 0);
    const totalCredits = valid.reduce((sum, c) => sum + parseFloat(c.credits), 0);
    const gpa = totalPoints / totalCredits;

    setResult({
      gpa: Math.round(gpa * 100) / 100,
      letter: gpaToLetter(gpa),
      totalCredits,
      courseCount: valid.length,
    });
  }

  return (
    <div className={styles['gpa-widget']}>
      <div className={styles['gpa-widget__form']}>
        <div className={styles['gpa-widget__course-header']}>
          <span className={styles['gpa-widget__col-label']}>{t('course', locale)}</span>
          <span className={styles['gpa-widget__col-label']}>{t('grade', locale)}</span>
          <span className={styles['gpa-widget__col-label']}>{t('credits', locale)}</span>
          <span />
        </div>

        <div className={styles['gpa-widget__courses']}>
          {courses.map(course => (
            <div key={course.id} className={styles['gpa-widget__course-row']}>
              <input
                type="text"
                className={styles['gpa-widget__input']}
                value={course.name}
                onChange={e => updateCourse(course.id, 'name', e.target.value)}
                placeholder={`${t('course', locale)} ${course.id}`}
              />
              <select
                className={styles['gpa-widget__select']}
                value={course.grade}
                onChange={e => updateCourse(course.id, 'grade', e.target.value)}
              >
                {GRADE_KEYS.map(g => (
                  <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                ))}
              </select>
              <input
                type="number"
                className={styles['gpa-widget__input']}
                value={course.credits}
                onChange={e => updateCourse(course.id, 'credits', e.target.value)}
                min="0.5" max="12" step="0.5"
              />
              <button
                type="button"
                className={styles['gpa-widget__remove-btn']}
                onClick={() => removeCourse(course.id)}
                aria-label="Remove"
              >×</button>
            </div>
          ))}
        </div>

        <button type="button" className={styles['gpa-widget__add-btn']} onClick={addCourse}>
          {t('addCourse', locale)}
        </button>

        {error && <p style={{ color: '#e53e3e', fontSize: 'var(--font-size-sm)' }}>{error}</p>}

        <button type="button" className={styles['gpa-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['gpa-widget__results']}>
          <div className={styles['gpa-widget__gpa-display']}>
            <span className={styles['gpa-widget__gpa-value']}>{result.gpa.toFixed(2)}</span>
            <span className={styles['gpa-widget__gpa-max']}> / 4.0</span>
            <span className={styles['gpa-widget__gpa-letter']}>{result.letter}</span>
          </div>
          <div className={styles['gpa-widget__result-grid']}>
            <div className={styles['gpa-widget__result-item']}>
              <span className={styles['gpa-widget__result-label']}>{t('totalCredits', locale)}</span>
              <span className={styles['gpa-widget__result-value']}>{result.totalCredits}</span>
            </div>
            <div className={styles['gpa-widget__result-item']}>
              <span className={styles['gpa-widget__result-label']}>{t('courses', locale)}</span>
              <span className={styles['gpa-widget__result-value']}>{result.courseCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
