'use client';

import { useState } from 'react';
import styles from './DiabetesRiskCalculator.module.scss';

// Based on FINDRISC (Finnish Diabetes Risk Score)
type RiskLevel = 'low' | 'slightly' | 'moderate' | 'high' | 'very-high';

const RISK_DATA: Record<RiskLevel, { maxScore: number; probability: string }> = {
  'low':       { maxScore: 7,  probability: '~1%'  },
  'slightly':  { maxScore: 11, probability: '~4%'  },
  'moderate':  { maxScore: 14, probability: '~17%' },
  'high':      { maxScore: 20, probability: '~33%' },
  'very-high': { maxScore: 99, probability: '~50%' },
};

const L: Record<string, Record<string, string>> = {
  age:        { en: 'Age',                          ru: 'Возраст',                         uk: 'Вік',                              fr: 'Âge',                              lt: 'Amžius'                           },
  gender:     { en: 'Gender',                       ru: 'Пол',                             uk: 'Стать',                            fr: 'Genre',                            lt: 'Lytis'                            },
  male:       { en: 'Male',                         ru: 'Мужской',                         uk: 'Чоловіча',                         fr: 'Homme',                            lt: 'Vyras'                            },
  female:     { en: 'Female',                       ru: 'Женский',                         uk: 'Жіноча',                           fr: 'Femme',                            lt: 'Moteris'                          },
  bmi:        { en: 'BMI',                          ru: 'ИМТ',                             uk: 'ІМТ',                              fr: 'IMC',                              lt: 'KMI'                              },
  waist:      { en: 'Waist Circumference (cm)',     ru: 'Обхват талии (см)',               uk: 'Обхват талії (см)',                fr: 'Tour de taille (cm)',              lt: 'Juosmens apimtis (cm)'            },
  activity:   { en: 'Physical Activity',            ru: 'Физическая активность',           uk: 'Фізична активність',               fr: 'Activité physique',                lt: 'Fizinis aktyvumas'                },
  actYes:     { en: '≥ 30 min/day',                ru: '≥ 30 мин/день',                   uk: '≥ 30 хв/день',                     fr: '≥ 30 min/jour',                    lt: '≥ 30 min/dieną'                   },
  actNo:      { en: '< 30 min/day',                ru: '< 30 мин/день',                   uk: '< 30 хв/день',                     fr: '< 30 min/jour',                    lt: '< 30 min/dieną'                   },
  vegetables: { en: 'Vegetables/Fruits Daily',      ru: 'Овощи/фрукты каждый день',        uk: 'Овочі/фрукти щодня',               fr: 'Légumes/fruits quotidiens',        lt: 'Daržovės/vaisiai kasdien'         },
  vegYes:     { en: 'Yes, every day',               ru: 'Да, каждый день',                 uk: 'Так, щодня',                       fr: 'Oui, tous les jours',              lt: 'Taip, kiekvieną dieną'            },
  vegNo:      { en: 'Not every day',                ru: 'Не каждый день',                  uk: 'Не щодня',                         fr: 'Pas tous les jours',               lt: 'Ne kiekvieną dieną'               },
  bpMeds:     { en: 'Blood Pressure Medication',   ru: 'Лекарства от давления',           uk: 'Ліки від тиску',                   fr: 'Médicaments tension artérielle',   lt: 'Kraujospūdžio vaistai'            },
  glucHistory:{ en: 'History of High Blood Sugar',  ru: 'Был повышенный сахар',            uk: 'Був підвищений цукор',             fr: 'Antécédents d\'hyperglycémie',     lt: 'Buvo padidėjęs gliukozės kiekis'  },
  family:     { en: 'Family History of Diabetes',   ru: 'Диабет в семье',                  uk: 'Цукровий діабет у родині',         fr: 'Antécédents familiaux de diabète', lt: 'Diabetas šeimoje'                 },
  famNone:    { en: 'No family history',            ru: 'Нет',                             uk: 'Немає',                            fr: 'Aucun',                            lt: 'Nėra'                             },
  famSecond:  { en: 'Grandparent, aunt/uncle, cousin', ru: 'Дедушка/бабушка, тётя/дядя, двоюродный', uk: 'Дідусь/бабуся, тітка/дядько, двоюрідний', fr: 'Grand-parent, oncle/tante, cousin(e)', lt: 'Senelis/senelė, dėdė/teta, pusbrolis' },
  famFirst:   { en: 'Parent, sibling, or own child', ru: 'Родитель, брат/сестра или дети', uk: 'Батько/мати, брат/сестра або діти', fr: 'Parent, frère/sœur ou enfant',   lt: 'Tėvas/motina, brolis/sesuo ar vaikas' },
  yesNo_yes:  { en: 'Yes',                          ru: 'Да',                              uk: 'Так',                              fr: 'Oui',                              lt: 'Taip'                             },
  yesNo_no:   { en: 'No',                           ru: 'Нет',                             uk: 'Ні',                               fr: 'Non',                              lt: 'Ne'                               },
  calculate:  { en: 'Calculate Risk',               ru: 'Рассчитать риск',                 uk: 'Розрахувати ризик',                fr: 'Calculer le risque',               lt: 'Skaičiuoti riziką'                },
  score:      { en: 'Risk Score',                   ru: 'Балл риска',                      uk: 'Бал ризику',                       fr: 'Score de risque',                  lt: 'Rizikos balas'                    },
  probability:{ en: '10-year risk of Type 2 diabetes', ru: '10-летний риск диабета 2 типа', uk: '10-річний ризик цукрового діабету 2 типу', fr: 'Risque de diabète de type 2 à 10 ans', lt: '10 metų 2 tipo diabeto rizika' },
  disclaimer: { en: 'Based on the FINDRISC questionnaire. For informational purposes only — consult your doctor for a medical assessment.', ru: 'Основано на опроснике FINDRISC. Только для информационных целей — проконсультируйтесь с врачом.', uk: 'На основі опитувальника FINDRISC. Лише в інформаційних цілях — проконсультуйтеся з лікарем.', fr: 'Basé sur le questionnaire FINDRISC. À titre informatif uniquement — consultez votre médecin.', lt: 'Remiantis FINDRISC klausimynu. Tik informaciniais tikslais — pasitarkite su gydytoju.' },
};

const RISK_LABELS: Record<RiskLevel, Record<string, string>> = {
  'low':       { en: 'Low Risk',          ru: 'Низкий риск',           uk: 'Низький ризик',          fr: 'Risque faible',          lt: 'Maža rizika'          },
  'slightly':  { en: 'Slightly Elevated', ru: 'Слегка повышенный',     uk: 'Дещо підвищений',        fr: 'Légèrement élevé',       lt: 'Šiek tiek padidėjusi' },
  'moderate':  { en: 'Moderate Risk',     ru: 'Умеренный риск',        uk: 'Помірний ризик',         fr: 'Risque modéré',          lt: 'Vidutinė rizika'      },
  'high':      { en: 'High Risk',         ru: 'Высокий риск',          uk: 'Високий ризик',          fr: 'Risque élevé',           lt: 'Didelė rizika'        },
  'very-high': { en: 'Very High Risk',    ru: 'Очень высокий риск',    uk: 'Дуже високий ризик',     fr: 'Risque très élevé',      lt: 'Labai didelė rizika'  },
};

const RISK_ADVICE: Record<RiskLevel, Record<string, string>> = {
  'low':       { en: 'Your risk is low. Maintain a healthy lifestyle with regular physical activity and a balanced diet to keep it that way.', ru: 'Ваш риск низкий. Поддерживайте здоровый образ жизни с регулярной активностью и сбалансированным питанием.', uk: 'Ваш ризик низький. Підтримуйте здоровий спосіб життя з регулярною активністю та збалансованим харчуванням.', fr: 'Votre risque est faible. Maintenez un mode de vie sain avec une activité physique régulière et une alimentation équilibrée.', lt: 'Jūsų rizika maža. Palaikykite sveiką gyvenseną su reguliariu fiziniu aktyvumu ir subalansuota mityba.' },
  'slightly':  { en: 'Your risk is slightly elevated. Consider lifestyle changes: increase physical activity, eat more vegetables and fruits, maintain a healthy weight.', ru: 'Риск слегка повышен. Рассмотрите изменения образа жизни: больше физической активности, овощей и фруктов, контроль веса.', uk: 'Ризик дещо підвищений. Розгляньте зміни способу життя: більше фізичної активності, овочів і фруктів, контроль ваги.', fr: 'Votre risque est légèrement élevé. Envisagez des changements de mode de vie : plus d\'activité physique, plus de légumes et fruits, maintien d\'un poids santé.', lt: 'Jūsų rizika šiek tiek padidėjusi. Apsvarstykite gyvenimo būdo pokyčius: daugiau fizinio aktyvumo, daugiau daržovių ir vaisių, sveiko svorio palaikymas.' },
  'moderate':  { en: 'Moderate risk — consult your doctor about a blood glucose test. Lifestyle changes can significantly reduce your risk.', ru: 'Умеренный риск — проконсультируйтесь с врачом о тесте на сахар. Изменение образа жизни значительно снижает риск.', uk: 'Помірний ризик — проконсультуйтеся з лікарем щодо тесту на цукор. Зміна способу життя значно знижує ризик.', fr: 'Risque modéré — consultez votre médecin pour un test de glycémie. Des changements de mode de vie peuvent réduire considérablement votre risque.', lt: 'Vidutinė rizika — pasitarkite su gydytoju dėl gliukozės testo. Gyvenimo būdo pokyčiai gali žymiai sumažinti riziką.' },
  'high':      { en: 'High risk — please see your doctor for a blood glucose test and professional guidance. Early intervention is highly effective.', ru: 'Высокий риск — обратитесь к врачу для теста на сахар и профессиональной помощи. Раннее вмешательство очень эффективно.', uk: 'Високий ризик — зверніться до лікаря для тесту на цукор. Рання інтервенція дуже ефективна.', fr: 'Risque élevé — consultez votre médecin pour un test de glycémie. L\'intervention précoce est très efficace.', lt: 'Didelė rizika — kreipkitės į gydytoją dėl gliukozės testo. Ankstyvas įsikišimas yra labai veiksmingas.' },
  'very-high': { en: 'Very high risk — see your doctor as soon as possible for blood glucose testing and evaluation. Do not delay.', ru: 'Очень высокий риск — обратитесь к врачу как можно скорее для теста на сахар. Не откладывайте.', uk: 'Дуже високий ризик — зверніться до лікаря якомога швидше для тесту на цукор. Не зволікайте.', fr: 'Risque très élevé — consultez votre médecin dès que possible pour un test de glycémie. N\'attendez pas.', lt: 'Labai didelė rizika — kuo greičiau kreipkitės į gydytoją dėl gliukozės testo. Nedelskite.' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

export default function DiabetesRiskCalculator({ locale }: { locale: string }) {
  const [age, setAge] = useState('45');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState('26');
  const [waist, setWaist] = useState('90');
  const [activity, setActivity] = useState('yes');
  const [vegetables, setVegetables] = useState('yes');
  const [bpMeds, setBpMeds] = useState('no');
  const [glucHistory, setGlucHistory] = useState('no');
  const [family, setFamily] = useState('none');

  type ScoreResult = { score: number; level: RiskLevel; probability: string; advice: string };
  const [result, setResult] = useState<ScoreResult | null>(null);

  function calculate() {
    let score = 0;
    const ageNum = parseInt(age) || 45;
    const bmiNum = parseFloat(bmi) || 26;
    const waistNum = parseFloat(waist) || 90;

    // Age
    if (ageNum >= 65) score += 4;
    else if (ageNum >= 55) score += 3;
    else if (ageNum >= 45) score += 2;

    // BMI
    if (bmiNum >= 30) score += 3;
    else if (bmiNum >= 25) score += 1;

    // Waist
    if (gender === 'male') {
      if (waistNum >= 102) score += 4;
      else if (waistNum >= 94) score += 3;
    } else {
      if (waistNum >= 88) score += 4;
      else if (waistNum >= 80) score += 3;
    }

    // Activity
    if (activity === 'no') score += 2;

    // Vegetables
    if (vegetables === 'no') score += 1;

    // BP Meds
    if (bpMeds === 'yes') score += 2;

    // High glucose history
    if (glucHistory === 'yes') score += 5;

    // Family history
    if (family === 'first') score += 5;
    else if (family === 'second') score += 3;

    const level: RiskLevel =
      score <= 7  ? 'low' :
      score <= 11 ? 'slightly' :
      score <= 14 ? 'moderate' :
      score <= 20 ? 'high' : 'very-high';

    setResult({
      score,
      level,
      probability: RISK_DATA[level].probability,
      advice: RISK_ADVICE[level][locale] ?? RISK_ADVICE[level].en,
    });
  }

  const barWidth = result ? Math.min((result.score / 25) * 100, 100) : 0;

  return (
    <div className={styles['diabetes-widget']}>
      <div className={styles['diabetes-widget__form']}>
        <div className={styles['diabetes-widget__row']}>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('age', locale)}</label>
            <input type="number" className={styles['diabetes-widget__input']} value={age} onChange={e => setAge(e.target.value)} min="18" max="90" />
          </div>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('gender', locale)}</label>
            <select className={styles['diabetes-widget__select']} value={gender} onChange={e => setGender(e.target.value)}>
              <option value="male">{t('male', locale)}</option>
              <option value="female">{t('female', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['diabetes-widget__row']}>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('bmi', locale)}</label>
            <input type="number" className={styles['diabetes-widget__input']} value={bmi} onChange={e => setBmi(e.target.value)} min="10" max="60" step="0.1" />
          </div>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('waist', locale)}</label>
            <input type="number" className={styles['diabetes-widget__input']} value={waist} onChange={e => setWaist(e.target.value)} min="50" max="200" />
          </div>
        </div>

        <div className={styles['diabetes-widget__row']}>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('activity', locale)}</label>
            <select className={styles['diabetes-widget__select']} value={activity} onChange={e => setActivity(e.target.value)}>
              <option value="yes">{t('actYes', locale)}</option>
              <option value="no">{t('actNo', locale)}</option>
            </select>
          </div>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('vegetables', locale)}</label>
            <select className={styles['diabetes-widget__select']} value={vegetables} onChange={e => setVegetables(e.target.value)}>
              <option value="yes">{t('vegYes', locale)}</option>
              <option value="no">{t('vegNo', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['diabetes-widget__row']}>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('bpMeds', locale)}</label>
            <select className={styles['diabetes-widget__select']} value={bpMeds} onChange={e => setBpMeds(e.target.value)}>
              <option value="no">{t('yesNo_no', locale)}</option>
              <option value="yes">{t('yesNo_yes', locale)}</option>
            </select>
          </div>
          <div className={styles['diabetes-widget__field']}>
            <label className={styles['diabetes-widget__label']}>{t('glucHistory', locale)}</label>
            <select className={styles['diabetes-widget__select']} value={glucHistory} onChange={e => setGlucHistory(e.target.value)}>
              <option value="no">{t('yesNo_no', locale)}</option>
              <option value="yes">{t('yesNo_yes', locale)}</option>
            </select>
          </div>
        </div>

        <div className={styles['diabetes-widget__field']}>
          <label className={styles['diabetes-widget__label']}>{t('family', locale)}</label>
          <select className={styles['diabetes-widget__select']} value={family} onChange={e => setFamily(e.target.value)}>
            <option value="none">{t('famNone', locale)}</option>
            <option value="second">{t('famSecond', locale)}</option>
            <option value="first">{t('famFirst', locale)}</option>
          </select>
        </div>

        <button type="button" className={styles['diabetes-widget__btn']} onClick={calculate}>
          {t('calculate', locale)}
        </button>
      </div>

      {result && (
        <div className={styles['diabetes-widget__results']}>
          <div className={styles['diabetes-widget__score-row']}>
            <span className={styles['diabetes-widget__score']}>{result.score}</span>
            <span className={`${styles['diabetes-widget__risk-badge']} ${styles[`diabetes-widget__risk-badge--${result.level}`]}`}>
              {RISK_LABELS[result.level][locale] ?? RISK_LABELS[result.level].en}
            </span>
          </div>
          <div className={styles['diabetes-widget__bar-wrap']}>
            <div
              className={`${styles['diabetes-widget__bar']} ${styles[`diabetes-widget__bar--${result.level}`]}`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <p className={styles['diabetes-widget__probability']}>
            {t('probability', locale)}: <strong>{result.probability}</strong>
          </p>
          <div className={styles['diabetes-widget__advice']}>{result.advice}</div>
          <p className={styles['diabetes-widget__disclaimer']}>{t('disclaimer', locale)}</p>
        </div>
      )}
    </div>
  );
}
