'use client';

import { useState } from 'react';
import styles from './BiologicalAgeCalculator.module.scss';

const L: Record<string, Record<string, string>> = {
  age:        { en: 'Chronological Age',    ru: 'Хронологический возраст',   uk: 'Хронологічний вік',          fr: 'Âge chronologique',         lt: 'Chronologinis amžius'      },
  bmi:        { en: 'BMI',                  ru: 'ИМТ',                       uk: 'ІМТ',                        fr: 'IMC',                       lt: 'KMI'                       },
  exercise:   { en: 'Exercise Frequency',   ru: 'Физическая активность',     uk: 'Фізична активність',         fr: 'Activité physique',         lt: 'Fizinis aktyvumas'         },
  sleep:      { en: 'Sleep (hours/night)',  ru: 'Сон (часов в ночь)',        uk: 'Сон (годин на ніч)',         fr: 'Sommeil (h/nuit)',          lt: 'Miegas (val./naktį)'      },
  smoking:    { en: 'Smoking',              ru: 'Курение',                   uk: 'Куріння',                    fr: 'Tabagisme',                 lt: 'Rūkymas'                   },
  alcohol:    { en: 'Alcohol',              ru: 'Алкоголь',                  uk: 'Алкоголь',                   fr: 'Alcool',                    lt: 'Alkoholis'                 },
  diet:       { en: 'Diet Quality',         ru: 'Качество питания',          uk: 'Якість харчування',          fr: 'Qualité de l\'alimentation',lt: 'Mitybos kokybė'            },
  stress:     { en: 'Stress Level',         ru: 'Уровень стресса',           uk: 'Рівень стресу',              fr: 'Niveau de stress',          lt: 'Streso lygis'              },
  calculate:  { en: 'Calculate',            ru: 'Рассчитать',                uk: 'Розрахувати',                fr: 'Calculer',                  lt: 'Skaičiuoti'                },
  bioAge:     { en: 'Biological Age',       ru: 'Биологический возраст',     uk: 'Біологічний вік',            fr: 'Âge biologique',            lt: 'Biologinis amžius'         },
  chronoAge:  { en: 'Chronological Age',    ru: 'Паспортный возраст',        uk: 'Паспортний вік',             fr: 'Âge civil',                 lt: 'Pilietinis amžius'         },
  younger:    { en: 'years younger than your age', ru: 'лет моложе паспортного', uk: 'років молодше паспортного', fr: 'ans de moins que votre âge', lt: 'metais jaunesnis nei amžius' },
  older:      { en: 'years older than your age',   ru: 'лет старше паспортного', uk: 'років старше паспортного',  fr: 'ans de plus que votre âge',  lt: 'metais vyresnis nei amžius'  },
  same:       { en: 'Your biological age matches your chronological age', ru: 'Биологический возраст совпадает с паспортным', uk: 'Біологічний вік збігається з паспортним', fr: 'Votre âge biologique correspond à votre âge civil', lt: 'Jūsų biologinis amžius atitinka chronologinį' },
  disclaimer: { en: 'Approximate estimate for informational purposes only. Not a medical assessment.', ru: 'Приблизительная оценка в информационных целях. Не является медицинским заключением.', uk: 'Приблизна оцінка в інформаційних цілях. Не є медичним висновком.', fr: 'Estimation approximative à titre informatif uniquement. Pas une évaluation médicale.', lt: 'Apytikslis įvertinimas tik informaciniais tikslais. Tai nėra medicininis įvertinimas.' },

  exNever:    { en: 'Never / Sedentary',    ru: 'Никогда / сидячий',         uk: 'Ніколи / сидячий',           fr: 'Jamais / sédentaire',       lt: 'Niekada / sėslus'          },
  exRarely:   { en: 'Rarely (1×/week)',     ru: 'Редко (1 раз/нед)',         uk: 'Рідко (1 раз/тиж)',          fr: 'Rarement (1×/semaine)',     lt: 'Retai (1×/sav.)'           },
  ex3x:       { en: '3× per week',          ru: '3 раза в неделю',           uk: '3 рази на тиждень',          fr: '3× par semaine',            lt: '3× per savaitę'            },
  exDaily:    { en: 'Daily',                ru: 'Каждый день',               uk: 'Щодня',                      fr: 'Quotidiennement',           lt: 'Kasdien'                   },
  sleep4:     { en: '< 5 hours',            ru: 'Менее 5 часов',             uk: 'Менше 5 годин',              fr: 'Moins de 5 h',              lt: 'Mažiau nei 5 val.'         },
  sleep6:     { en: '5–6 hours',            ru: '5–6 часов',                 uk: '5–6 годин',                  fr: '5–6 h',                     lt: '5–6 val.'                  },
  sleep8:     { en: '7–8 hours (optimal)',  ru: '7–8 часов (оптимально)',    uk: '7–8 годин (оптимально)',     fr: '7–8 h (optimal)',           lt: '7–8 val. (optimalu)'       },
  sleep9:     { en: '9+ hours',             ru: '9+ часов',                  uk: '9+ годин',                   fr: '9 h et plus',               lt: '9+ val.'                   },
  smokNo:     { en: 'Non-smoker',           ru: 'Не курю',                   uk: 'Не курю',                    fr: 'Non-fumeur',                lt: 'Nerūkantis'                },
  smokEx:     { en: 'Ex-smoker (>1 yr)',    ru: 'Бросил (>1 года)',          uk: 'Кинув (>1 року)',            fr: 'Ex-fumeur (>1 an)',         lt: 'Buvęs rūkalius (>1 m.)'   },
  smokNow:    { en: 'Current smoker',       ru: 'Курю сейчас',               uk: 'Курю зараз',                 fr: 'Fumeur actuel',             lt: 'Šiuo metu rūkantis'        },
  alcNo:      { en: 'None',                 ru: 'Не пью',                    uk: 'Не п\'ю',                    fr: 'Aucun',                     lt: 'Nevartoju'                 },
  alcMod:     { en: 'Moderate',             ru: 'Умеренно',                  uk: 'Помірно',                    fr: 'Modéré',                    lt: 'Saikingas'                 },
  alcHeavy:   { en: 'Heavy',               ru: 'Много',                     uk: 'Багато',                     fr: 'Excessif',                  lt: 'Gausus'                    },
  dietExc:    { en: 'Excellent (whole foods)', ru: 'Отличное (натуральные)', uk: 'Відмінне (натуральні)',      fr: 'Excellent (aliments complets)',lt: 'Puiki (natūralus maistas)'},
  dietGood:   { en: 'Good',                 ru: 'Хорошее',                   uk: 'Гарне',                      fr: 'Bon',                       lt: 'Gera'                      },
  dietPoor:   { en: 'Poor (processed/fast food)', ru: 'Плохое (фастфуд)', uk: 'Погане (фастфуд)',             fr: 'Mauvais (aliments transformés)',lt: 'Prasta (perdirbtasis maistas)'},
  strLow:     { en: 'Low',                  ru: 'Низкий',                    uk: 'Низький',                    fr: 'Faible',                    lt: 'Žemas'                     },
  strMed:     { en: 'Moderate',             ru: 'Умеренный',                 uk: 'Помірний',                   fr: 'Modéré',                    lt: 'Vidutinis'                 },
  strHigh:    { en: 'High',                 ru: 'Высокий',                   uk: 'Високий',                    fr: 'Élevé',                     lt: 'Aukštas'                   },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Result = { bioAge: number; diff: number; tips: string[] };

const TIPS: Record<string, Record<string, string>> = {
  exercise: {
    en: 'Regular exercise (3×/week) can reduce biological age by 1–3 years.',
    ru: 'Регулярные упражнения (3 раза/нед) снижают биологический возраст на 1–3 года.',
    uk: 'Регулярні вправи (3 рази/тиж) знижують біологічний вік на 1–3 роки.',
    fr: 'L\'exercice régulier (3×/semaine) peut réduire l\'âge biologique de 1 à 3 ans.',
    lt: 'Reguliarūs pratimai (3×/sav.) gali sumažinti biologinį amžių 1–3 metais.',
  },
  sleep: {
    en: '7–8 hours of quality sleep per night is optimal for biological age.',
    ru: 'Оптимальный сон — 7–8 часов в сутки. Недосып и пересып ускоряют старение.',
    uk: 'Оптимальний сон — 7–8 годин. Недосипання та пересипання прискорюють старіння.',
    fr: '7 à 8 heures de sommeil de qualité par nuit est optimal pour l\'âge biologique.',
    lt: '7–8 val. kokybiško miego per naktį yra optimalus biologiniam amžiui.',
  },
  smoking: {
    en: 'Smoking adds 5–10 years to biological age. Quitting reverses most damage over time.',
    ru: 'Курение добавляет 5–10 лет к биологическому возрасту. Отказ от курения со временем обращает большинство повреждений.',
    uk: 'Куріння додає 5–10 років до біологічного віку. Відмова від куріння з часом відновлює більшість пошкоджень.',
    fr: 'Le tabagisme ajoute 5 à 10 ans à l\'âge biologique. L\'arrêt inverse la plupart des dommages avec le temps.',
    lt: 'Rūkymas prideda 5–10 metų prie biologinio amžiaus. Metimas rūkyti ilgainiui atšaukia daugumą žalos.',
  },
  bmi: {
    en: 'Maintaining a healthy BMI (18.5–24.9) supports healthy aging.',
    ru: 'Поддержание здорового ИМТ (18,5–24,9) способствует здоровому старению.',
    uk: 'Підтримання здорового ІМТ (18,5–24,9) сприяє здоровому старінню.',
    fr: 'Maintenir un IMC sain (18,5–24,9) favorise un vieillissement en bonne santé.',
    lt: 'Sveiko KMI (18,5–24,9) palaikymas skatina sveiką senėjimą.',
  },
  diet: {
    en: 'A diet rich in vegetables, fruits, and whole grains can reduce biological age.',
    ru: 'Диета, богатая овощами, фруктами и цельными злаками, снижает биологический возраст.',
    uk: 'Дієта, багата овочами, фруктами та цільнозерновими продуктами, знижує біологічний вік.',
    fr: 'Un régime riche en légumes, fruits et céréales complètes peut réduire l\'âge biologique.',
    lt: 'Daug daržovių, vaisių ir neskaldytų grūdų turinti mityba gali sumažinti biologinį amžių.',
  },
};

export default function BiologicalAgeCalculator({ locale }: { locale: string }) {
  const [age, setAge] = useState('35');
  const [bmi, setBmi] = useState('23');
  const [exercise, setExercise] = useState('3x');
  const [sleep, setSleep] = useState('8');
  const [smoking, setSmoking] = useState('no');
  const [alcohol, setAlcohol] = useState('mod');
  const [diet, setDiet] = useState('good');
  const [stress, setStress] = useState('med');
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const chronoAge = parseInt(age) || 35;
    let delta = 0;

    // BMI
    const bmiVal = parseFloat(bmi) || 23;
    if (bmiVal < 18.5) delta += 1;
    else if (bmiVal < 25) delta += 0;
    else if (bmiVal < 30) delta += 2;
    else delta += 5;

    // Exercise
    if (exercise === 'never') delta += 5;
    else if (exercise === 'rarely') delta += 3;
    else if (exercise === '3x') delta -= 1;
    else if (exercise === 'daily') delta -= 3;

    // Sleep
    if (sleep === '4') delta += 4;
    else if (sleep === '6') delta += 2;
    else if (sleep === '8') delta += 0;
    else if (sleep === '9') delta += 1;

    // Smoking
    if (smoking === 'no') delta += 0;
    else if (smoking === 'ex') delta += 1;
    else if (smoking === 'yes') delta += 5;

    // Alcohol
    if (alcohol === 'no') delta += 0;
    else if (alcohol === 'mod') delta += 0;
    else if (alcohol === 'heavy') delta += 3;

    // Diet
    if (diet === 'exc') delta -= 2;
    else if (diet === 'good') delta += 0;
    else if (diet === 'poor') delta += 2;

    // Stress
    if (stress === 'low') delta += 0;
    else if (stress === 'med') delta += 1;
    else if (stress === 'high') delta += 3;

    const tips: string[] = [];
    if (exercise === 'never' || exercise === 'rarely') tips.push(TIPS.exercise[locale] ?? TIPS.exercise.en);
    if (sleep === '4' || sleep === '6') tips.push(TIPS.sleep[locale] ?? TIPS.sleep.en);
    if (smoking === 'yes') tips.push(TIPS.smoking[locale] ?? TIPS.smoking.en);
    if (bmiVal >= 25) tips.push(TIPS.bmi[locale] ?? TIPS.bmi.en);
    if (diet === 'poor') tips.push(TIPS.diet[locale] ?? TIPS.diet.en);

    setResult({ bioAge: chronoAge + delta, diff: delta, tips });
  }

  const diffClass = result
    ? result.diff < 0 ? styles['bio-age-widget__age-value--younger']
    : result.diff > 0 ? styles['bio-age-widget__age-value--older']
    : styles['bio-age-widget__age-value--same']
    : '';

  const diffBannerClass = result
    ? result.diff < 0 ? styles['bio-age-widget__diff--younger']
    : result.diff > 0 ? styles['bio-age-widget__diff--older']
    : styles['bio-age-widget__diff--same']
    : '';

  return (
    <div className={styles['bio-age-widget']}>
      <div className={styles['bio-age-widget__form']}>
        <div className={styles['bio-age-widget__row']}>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('age', locale)}</label>
            <input type="number" className={styles['bio-age-widget__input']} value={age} onChange={e => setAge(e.target.value)} min="18" max="90" />
          </div>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('bmi', locale)}</label>
            <input type="number" className={styles['bio-age-widget__input']} value={bmi} onChange={e => setBmi(e.target.value)} min="10" max="60" step="0.1" />
          </div>
        </div>

        <div className={styles['bio-age-widget__row']}>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('exercise', locale)}</label>
            <select className={styles['bio-age-widget__select']} value={exercise} onChange={e => setExercise(e.target.value)}>
              <option value="never">{t('exNever', locale)}</option>
              <option value="rarely">{t('exRarely', locale)}</option>
              <option value="3x">{t('ex3x', locale)}</option>
              <option value="daily">{t('exDaily', locale)}</option>
            </select>
          </div>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('sleep', locale)}</label>
            <select className={styles['bio-age-widget__select']} value={sleep} onChange={e => setSleep(e.target.value)}>
              <option value="4">{t('sleep4', locale)}</option>
              <option value="6">{t('sleep6', locale)}</option>
              <option value="8">{t('sleep8', locale)}</option>
              <option value="9">{t('sleep9', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['bio-age-widget__row']}>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('smoking', locale)}</label>
            <select className={styles['bio-age-widget__select']} value={smoking} onChange={e => setSmoking(e.target.value)}>
              <option value="no">{t('smokNo', locale)}</option>
              <option value="ex">{t('smokEx', locale)}</option>
              <option value="yes">{t('smokNow', locale)}</option>
            </select>
          </div>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('alcohol', locale)}</label>
            <select className={styles['bio-age-widget__select']} value={alcohol} onChange={e => setAlcohol(e.target.value)}>
              <option value="no">{t('alcNo', locale)}</option>
              <option value="mod">{t('alcMod', locale)}</option>
              <option value="heavy">{t('alcHeavy', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['bio-age-widget__row']}>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('diet', locale)}</label>
            <select className={styles['bio-age-widget__select']} value={diet} onChange={e => setDiet(e.target.value)}>
              <option value="exc">{t('dietExc', locale)}</option>
              <option value="good">{t('dietGood', locale)}</option>
              <option value="poor">{t('dietPoor', locale)}</option>
            </select>
          </div>
          <div className={styles['bio-age-widget__field']}>
            <label className={styles['bio-age-widget__label']}>{t('stress', locale)}</label>
            <select className={styles['bio-age-widget__select']} value={stress} onChange={e => setStress(e.target.value)}>
              <option value="low">{t('strLow', locale)}</option>
              <option value="med">{t('strMed', locale)}</option>
              <option value="high">{t('strHigh', locale)}</option>
            </select>
          </div>
        </div>

        <button type="button" className={styles['bio-age-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['bio-age-widget__results']}>
          <div className={styles['bio-age-widget__ages']}>
            <div className={styles['bio-age-widget__age-item']}>
              <span className={styles['bio-age-widget__age-label']}>{t('bioAge', locale)}</span>
              <span className={`${styles['bio-age-widget__age-value']} ${diffClass}`}>{result.bioAge}</span>
            </div>
            <div className={styles['bio-age-widget__age-item']}>
              <span className={styles['bio-age-widget__age-label']}>{t('chronoAge', locale)}</span>
              <span className={`${styles['bio-age-widget__age-value']} ${styles['bio-age-widget__age-value--same']}`}>{parseInt(age)}</span>
            </div>
          </div>

          <div className={`${styles['bio-age-widget__diff']} ${diffBannerClass}`}>
            {result.diff === 0
              ? t('same', locale)
              : result.diff < 0
                ? `${Math.abs(result.diff)} ${t('younger', locale)}`
                : `${result.diff} ${t('older', locale)}`}
          </div>

          {result.tips.length > 0 && (
            <div className={styles['bio-age-widget__tips']}>
              {result.tips.map((tip, i) => (
                <div key={i} className={styles['bio-age-widget__tip']}>{tip}</div>
              ))}
            </div>
          )}

          <p className={styles['bio-age-widget__disclaimer']}>{t('disclaimer', locale)}</p>
        </div>
      )}
    </div>
  );
}
