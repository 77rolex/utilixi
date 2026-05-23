'use client';

import { useState } from 'react';
import styles from './StressLevelCalculator.module.scss';

type StressLevel = 'low' | 'moderate' | 'high';

const L: Record<string, Record<string, string>> = {
  intro:      { en: 'Answer 10 questions about the past month. Choose how often each situation occurred.',
                ru: 'Ответьте на 10 вопросов о прошедшем месяце. Выберите, как часто возникала каждая ситуация.',
                uk: 'Дайте відповідь на 10 запитань про минулий місяць. Оберіть, як часто виникала кожна ситуація.',
                fr: 'Répondez à 10 questions sur le mois écoulé. Choisissez la fréquence de chaque situation.',
                lt: 'Atsakykite į 10 klausimų apie praėjusį mėnesį. Pasirinkite, kaip dažnai pasitaikė kiekviena situacija.' },
  never:      { en: 'Never', ru: 'Никогда', uk: 'Ніколи', fr: 'Jamais', lt: 'Niekada' },
  almost:     { en: 'Almost Never', ru: 'Почти никогда', uk: 'Майже ніколи', fr: 'Presque jamais', lt: 'Beveik niekada' },
  sometimes:  { en: 'Sometimes', ru: 'Иногда', uk: 'Іноді', fr: 'Parfois', lt: 'Kartais' },
  often:      { en: 'Fairly Often', ru: 'Довольно часто', uk: 'Досить часто', fr: 'Assez souvent', lt: 'Gana dažnai' },
  veryOften:  { en: 'Very Often', ru: 'Очень часто', uk: 'Дуже часто', fr: 'Très souvent', lt: 'Labai dažnai' },
  calculate:  { en: 'Calculate Stress Level', ru: 'Рассчитать уровень стресса', uk: 'Розрахувати рівень стресу', fr: 'Calculer le niveau de stress', lt: 'Skaičiuoti streso lygį' },
  reset:      { en: 'Retake Test', ru: 'Пройти заново', uk: 'Пройти знову', fr: 'Recommencer', lt: 'Atlikti iš naujo' },
  score:      { en: 'Stress Score', ru: 'Балл стресса', uk: 'Бал стресу', fr: 'Score de stress', lt: 'Streso balas' },
  outOf:      { en: 'out of 40', ru: 'из 40', uk: 'з 40', fr: 'sur 40', lt: 'iš 40' },
  disclaimer: { en: 'Based on the Perceived Stress Scale (PSS-10). For informational purposes only — not a clinical assessment.',
                ru: 'Основано на шкале воспринимаемого стресса (PSS-10). Только для информационных целей.',
                uk: 'На основі шкали сприйнятого стресу (PSS-10). Лише для інформаційних цілей.',
                fr: 'Basé sur l\'échelle de stress perçu (PSS-10). À titre informatif uniquement.',
                lt: 'Remiantis Suvokiamo streso skale (PSS-10). Tik informaciniais tikslais.' },
  unanswered: { en: 'Please answer all 10 questions.', ru: 'Ответьте на все 10 вопросов.', uk: 'Дайте відповідь на всі 10 запитань.', fr: 'Veuillez répondre aux 10 questions.', lt: 'Atsakykite į visus 10 klausimų.' },
};

const QUESTIONS: Record<string, string[]> = {
  en: [
    'Been upset because of something that happened unexpectedly?',
    'Felt that you were unable to control the important things in your life?',
    'Felt nervous and stressed?',
    'Felt confident about your ability to handle your personal problems?',
    'Felt that things were going your way?',
    'Found that you could not cope with all the things you had to do?',
    'Been able to control irritations in your life?',
    'Felt that you were on top of things?',
    'Been angered because of things that were outside of your control?',
    'Felt that difficulties were piling up so high you could not overcome them?',
  ],
  ru: [
    'Расстраивались из-за чего-то, что произошло неожиданно?',
    'Чувствовали, что не можете контролировать важные события в своей жизни?',
    'Чувствовали нервозность и стресс?',
    'Были уверены в своей способности справляться с личными проблемами?',
    'Чувствовали, что дела идут так, как вы хотите?',
    'Понимали, что не успеваете справиться со всем, что нужно сделать?',
    'Были способны управлять раздражителями в своей жизни?',
    'Чувствовали, что держите всё под контролем?',
    'Злились из-за вещей, которые были вне вашего контроля?',
    'Чувствовали, что трудности накапливаются так, что вы не можете с ними справиться?',
  ],
  uk: [
    'Засмучувалися через щось, що сталося несподівано?',
    'Відчували, що не можете контролювати важливі події у своєму житті?',
    'Відчували нервозність і стрес?',
    'Були впевнені у своїй здатності впоратися з особистими проблемами?',
    'Відчували, що справи йдуть так, як ви хочете?',
    'Розуміли, що не встигаєте впоратися з усім, що потрібно зробити?',
    'Були здатні управляти подразниками у своєму житті?',
    'Відчували, що тримаєте все під контролем?',
    'Злилися через речі, що були поза вашим контролем?',
    'Відчували, що труднощі накопичуються так, що ви не можете з ними впоратися?',
  ],
  fr: [
    'Été contrarié(e) par quelque chose d\'inattendu ?',
    'Senti que vous ne pouviez pas contrôler les choses importantes dans votre vie ?',
    'Senti nerveux(se) et stressé(e) ?',
    'Eu confiance en votre capacité à gérer vos problèmes personnels ?',
    'Senti que les choses allaient dans votre sens ?',
    'Réalisé que vous ne pouviez pas faire face à tout ce que vous deviez faire ?',
    'Réussi à contrôler vos irritations ?',
    'Senti que vous maîtrisiez la situation ?',
    'Été en colère à cause de choses hors de votre contrôle ?',
    'Senti que les difficultés s\'accumulaient au point de ne plus pouvoir les surmonter ?',
  ],
  lt: [
    'Jautėtės nusiminęs(-usi) dėl kažko netikėto?',
    'Jautėtės negalintis(-i) kontroliuoti svarbių dalykų savo gyvenime?',
    'Jautėtės nervingas(-a) ir įsitempęs(-usi)?',
    'Jautėtės užtikrintas(-a) savo gebėjimu spręsti asmenines problemas?',
    'Jautėtės, kad viskas klostosi taip, kaip norite?',
    'Supratote, kad negalite susitvarkyti su visais reikalais?',
    'Sugebėjote kontroliuoti dirgiklius savo gyvenime?',
    'Jautėtės, kad viskas po kontrole?',
    'Pykote dėl dalykų, kurie buvo už jūsų kontrolės ribų?',
    'Jautėtės, kad sunkumai kaupiasi tiek, kad nebegalite jų įveikti?',
  ],
};

const REVERSED = [3, 4, 6, 7];

const LEVEL_LABELS: Record<StressLevel, Record<string, string>> = {
  low:      { en: 'Low Stress', ru: 'Низкий стресс', uk: 'Низький стрес', fr: 'Stress faible', lt: 'Mažas stresas' },
  moderate: { en: 'Moderate Stress', ru: 'Умеренный стресс', uk: 'Помірний стрес', fr: 'Stress modéré', lt: 'Vidutinis stresas' },
  high:     { en: 'High Stress', ru: 'Высокий стресс', uk: 'Високий стрес', fr: 'Stress élevé', lt: 'Didelis stresas' },
};

const LEVEL_ADVICE: Record<StressLevel, Record<string, string>> = {
  low:      { en: 'Your stress level is low. You have good coping mechanisms. Keep practicing healthy habits like regular exercise, adequate sleep, and social connection.',
              ru: 'Ваш уровень стресса низкий. У вас хорошие механизмы преодоления. Продолжайте практиковать здоровые привычки: физическую активность, достаточный сон и общение.',
              uk: 'Ваш рівень стресу низький. У вас хороші механізми подолання. Продовжуйте практикувати здорові звички: фізичну активність, достатній сон та спілкування.',
              fr: 'Votre niveau de stress est faible. Vous avez de bonnes capacités d\'adaptation. Continuez à pratiquer des habitudes saines : exercice régulier, sommeil suffisant et lien social.',
              lt: 'Jūsų streso lygis žemas. Jūs turite gerus streso valdymo įgūdžius. Toliau laikykitės sveikų įpročių: reguliarios fizinės veiklos, pakankamo miego ir socialinių ryšių.' },
  moderate: { en: 'You experience moderate stress. Consider stress-reduction techniques: mindfulness meditation, regular exercise, time management, and talking to trusted friends or family.',
              ru: 'Вы испытываете умеренный стресс. Попробуйте техники снижения стресса: медитацию осознанности, регулярные упражнения, тайм-менеджмент и общение с близкими.',
              uk: 'Ви відчуваєте помірний стрес. Спробуйте техніки зниження стресу: медитацію усвідомленості, регулярні вправи, тайм-менеджмент та спілкування з близькими.',
              fr: 'Vous ressentez un stress modéré. Essayez des techniques de réduction du stress : méditation de pleine conscience, exercice régulier, gestion du temps et discussion avec des proches.',
              lt: 'Jūs patiriate vidutinį stresą. Išbandykite streso mažinimo technikas: sąmoningumo meditaciją, reguliarią fizinę veiklą, laiko valdymą ir pokalbius su artimaisiais.' },
  high:     { en: 'Your stress level is high. This can affect your health, sleep, and relationships. Consider speaking with a mental health professional. Prioritize rest, exercise, and support.',
              ru: 'Ваш уровень стресса высокий. Это может влиять на здоровье, сон и отношения. Рассмотрите консультацию специалиста по психическому здоровью. Приоритизируйте отдых и поддержку.',
              uk: 'Ваш рівень стресу високий. Це може впливати на здоров\'я, сон та стосунки. Розгляньте консультацію спеціаліста з психічного здоров\'я. Пріоритизуйте відпочинок та підтримку.',
              fr: 'Votre niveau de stress est élevé. Cela peut affecter votre santé, votre sommeil et vos relations. Envisagez de parler à un professionnel de santé mentale. Privilégiez le repos et le soutien.',
              lt: 'Jūsų streso lygis aukštas. Tai gali paveikti jūsų sveikatą, miegą ir santykius. Apsvarstykite galimybę pasikalbėti su psichikos sveikatos specialistu. Pirmenybę teikite poilsiui ir paramai.' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

function getLevel(score: number): StressLevel {
  if (score <= 13) return 'low';
  if (score <= 26) return 'moderate';
  return 'high';
}

export default function StressLevelCalculator({ locale }: { locale: string }) {
  const questions = QUESTIONS[locale] || QUESTIONS.en;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [result, setResult] = useState<{ score: number; level: StressLevel } | null>(null);
  const [error, setError] = useState(false);

  function setAnswer(index: number, value: number) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    setError(false);
  }

  function calculate() {
    if (answers.some((a) => a === null)) {
      setError(true);
      return;
    }
    let score = 0;
    answers.forEach((a, i) => {
      const val = a as number;
      score += REVERSED.includes(i) ? 4 - val : val;
    });
    setResult({ score, level: getLevel(score) });
  }

  function reset() {
    setAnswers(Array(10).fill(null));
    setResult(null);
    setError(false);
  }

  const options = [
    { label: t('never', locale), value: 0 },
    { label: t('almost', locale), value: 1 },
    { label: t('sometimes', locale), value: 2 },
    { label: t('often', locale), value: 3 },
    { label: t('veryOften', locale), value: 4 },
  ];

  return (
    <div className={styles['stress-calc']}>
      {!result ? (
        <>
          <p className={styles['stress-calc__intro']}>{t('intro', locale)}</p>
          <div className={styles['stress-calc__questions']}>
            {questions.map((q, i) => (
              <div key={i} className={styles['stress-calc__question']}>
                <p className={styles['stress-calc__question-text']}>
                  <span className={styles['stress-calc__question-num']}>{i + 1}.</span> {q}
                </p>
                <div className={styles['stress-calc__options']}>
                  {options.map((opt) => (
                    <label key={opt.value} className={`${styles['stress-calc__option']}${answers[i] === opt.value ? ` ${styles['stress-calc__option--selected']}` : ''}`}>
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt.value}
                        checked={answers[i] === opt.value}
                        onChange={() => setAnswer(i, opt.value)}
                        className={styles['stress-calc__radio']}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {error && <p className={styles['stress-calc__error']}>{t('unanswered', locale)}</p>}
          <button type="button" onClick={calculate} className={styles['stress-calc__btn']}>
            {t('calculate', locale)}
          </button>
        </>
      ) : (
        <div className={styles['stress-calc__result']}>
          <div className={`${styles['stress-calc__result-badge']} ${styles[`stress-calc__result-badge--${result.level}`]}`}>
            {LEVEL_LABELS[result.level][locale] || LEVEL_LABELS[result.level].en}
          </div>
          <div className={styles['stress-calc__result-score']}>
            <span className={styles['stress-calc__result-score-num']}>{result.score}</span>
            <span className={styles['stress-calc__result-score-label']}>{t('score', locale)} — {t('outOf', locale)}</span>
          </div>
          <div className={styles['stress-calc__result-bar']}>
            <div className={styles['stress-calc__result-bar-track']}>
              <div
                className={`${styles['stress-calc__result-bar-fill']} ${styles[`stress-calc__result-bar-fill--${result.level}`]}`}
                style={{ width: `${(result.score / 40) * 100}%` }}
              />
            </div>
            <div className={styles['stress-calc__result-bar-labels']}>
              <span>0</span><span>13</span><span>26</span><span>40</span>
            </div>
          </div>
          <p className={styles['stress-calc__result-advice']}>
            {LEVEL_ADVICE[result.level][locale] || LEVEL_ADVICE[result.level].en}
          </p>
          <p className={styles['stress-calc__disclaimer']}>{t('disclaimer', locale)}</p>
          <button type="button" onClick={reset} className={styles['stress-calc__btn-reset']}>
            {t('reset', locale)}
          </button>
        </div>
      )}
    </div>
  );
}
