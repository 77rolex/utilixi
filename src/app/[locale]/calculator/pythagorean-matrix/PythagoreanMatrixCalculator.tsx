'use client';

import { useState } from 'react';
import styles from './PythagoreanMatrixCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; errEmpty: string; errInvalid: string;
  strongTitle: string; emptyTitle: string; amplified: string;
}> = {
  en: {
    label: 'Date of birth', btn: 'Build My Matrix',
    errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.',
    strongTitle: '✔ Your strong zones', emptyTitle: '✖ Areas to develop',
    amplified: 'Very strong — trait is amplified',
  },
  ru: {
    label: 'Дата рождения', btn: 'Построить матрицу',
    errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.',
    strongTitle: '✔ Ваши сильные зоны', emptyTitle: '✖ Зоны для развития',
    amplified: 'Очень сильно — черта усилена',
  },
  uk: {
    label: 'Дата народження', btn: 'Побудувати матрицю',
    errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.',
    strongTitle: '✔ Ваші сильні зони', emptyTitle: '✖ Зони для розвитку',
    amplified: 'Дуже сильно — риса підсилена',
  },
  fr: {
    label: 'Date de naissance', btn: 'Créer ma matrice',
    errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.',
    strongTitle: '✔ Vos zones fortes', emptyTitle: '✖ Zones à développer',
    amplified: 'Très fort — trait amplifié',
  },
  lt: {
    label: 'Gimimo data', btn: 'Kurti matricą',
    errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite teisingą datą.',
    strongTitle: '✔ Jūsų stiprios zonos', emptyTitle: '✖ Zonos tobulinti',
    amplified: 'Labai stipru — savybė sustiprinta',
  },
};

const DIGIT_MEANINGS: Record<string, Record<number, { name: string; trait: string; develop: string }>> = {
  en: {
    1: { name: 'Character & Will', trait: 'Strong will, drive, inner strength', develop: 'Self-confidence and persistence need development' },
    2: { name: 'Energy & Emotions', trait: 'Emotional sensitivity, empathy, expressiveness', develop: 'Emotional intelligence and empathy need development' },
    3: { name: 'Intellect', trait: 'Sharp mind, quick learning, natural curiosity', develop: 'Analytical thinking and intellectual curiosity need development' },
    4: { name: 'Health & Body', trait: 'Physical energy, vitality, endurance', develop: 'Health and physical activity deserve special attention' },
    5: { name: 'Logic & Intuition', trait: 'Intuitive channel, inner voice, perception', develop: 'Intuition and trust in inner feelings need development' },
    6: { name: 'Work Ethic', trait: 'Diligence, everyday discipline, routine', develop: 'Discipline, organization, and daily routines need development' },
    7: { name: 'Luck & Intuition', trait: 'Inner luck, spiritual gifts, intuition', develop: 'Trust in fate and spiritual awareness need development' },
    8: { name: 'Duty & Stability', trait: 'Responsibility, reliability, steadiness', develop: 'Sense of responsibility and commitment need development' },
    9: { name: 'Memory & Wisdom', trait: 'Deep memory, analytical mind, wisdom', develop: 'Memory and ability to generalize need development' },
  },
  ru: {
    1: { name: 'Характер и воля', trait: 'Сильная воля, напор, внутренняя энергия', develop: 'Уверенность в себе и настойчивость требуют развития' },
    2: { name: 'Энергия и эмоции', trait: 'Эмоциональность, эмпатия, выразительность', develop: 'Эмоциональный интеллект и эмпатия требуют развития' },
    3: { name: 'Интеллект', trait: 'Острый ум, быстрое обучение, любознательность', develop: 'Аналитическое мышление и любознательность требуют развития' },
    4: { name: 'Здоровье и тело', trait: 'Физическая энергия, жизнестойкость, выносливость', develop: 'Здоровье и физическая активность заслуживают особого внимания' },
    5: { name: 'Логика и интуиция', trait: 'Интуитивный канал, внутренний голос, восприятие', develop: 'Интуиция и доверие к внутренним ощущениям требуют развития' },
    6: { name: 'Трудолюбие', trait: 'Трудолюбие, бытовая дисциплина, порядок', develop: 'Дисциплина, организованность и ежедневный распорядок требуют развития' },
    7: { name: 'Везение и интуиция', trait: 'Внутренняя удача, духовные дары, интуиция', develop: 'Доверие к судьбе и духовное осознание требуют развития' },
    8: { name: 'Долг и стабильность', trait: 'Ответственность, надёжность, стабильность', develop: 'Ответственность и надёжность требуют развития' },
    9: { name: 'Память и мудрость', trait: 'Глубокая память, аналитика, мудрость', develop: 'Память и способность обобщать требуют развития' },
  },
  uk: {
    1: { name: 'Характер і воля', trait: 'Сильна воля, напір, внутрішня енергія', develop: 'Впевненість у собі та наполегливість потребують розвитку' },
    2: { name: 'Енергія та емоції', trait: 'Емоційність, емпатія, виразність', develop: 'Емоційний інтелект та емпатія потребують розвитку' },
    3: { name: 'Інтелект', trait: 'Гострий розум, швидке навчання, допитливість', develop: 'Аналітичне мислення та допитливість потребують розвитку' },
    4: { name: "Здоров'я та тіло", trait: 'Фізична енергія, витривалість, жвавість', develop: "Здоров'я та фізична активність заслуговують особливої уваги" },
    5: { name: 'Логіка та інтуїція', trait: 'Інтуїтивний канал, внутрішній голос, сприйняття', develop: 'Інтуїція та довіра до внутрішніх відчуттів потребують розвитку' },
    6: { name: 'Працьовитість', trait: 'Працьовитість, побутова дисципліна, порядок', develop: 'Дисципліна, організованість та розпорядок дня потребують розвитку' },
    7: { name: 'Везіння та інтуїція', trait: 'Внутрішня удача, духовні дари, інтуїція', develop: 'Довіра до долі та духовне усвідомлення потребують розвитку' },
    8: { name: "Обов'язок і стабільність", trait: 'Відповідальність, надійність, стабільність', develop: 'Відповідальність та надійність потребують розвитку' },
    9: { name: "Пам'ять та мудрість", trait: "Глибока пам'ять, аналітика, мудрість", develop: "Пам'ять та здатність узагальнювати потребують розвитку" },
  },
  fr: {
    1: { name: 'Caractère & Volonté', trait: 'Forte volonté, dynamisme, énergie intérieure', develop: 'La confiance en soi et la persévérance nécessitent du développement' },
    2: { name: 'Énergie & Émotions', trait: 'Sensibilité émotionnelle, empathie, expressivité', develop: "L'intelligence émotionnelle et l'empathie nécessitent du développement" },
    3: { name: 'Intellect', trait: 'Esprit vif, apprentissage rapide, curiosité naturelle', develop: 'La pensée analytique et la curiosité intellectuelle nécessitent du développement' },
    4: { name: 'Santé & Corps', trait: 'Énergie physique, vitalité, endurance', develop: "La santé et l'activité physique méritent une attention particulière" },
    5: { name: 'Logique & Intuition', trait: 'Canal intuitif, voix intérieure, perception', develop: "L'intuition et la confiance en les sensations intérieures nécessitent du développement" },
    6: { name: 'Travail & Discipline', trait: 'Diligence, discipline quotidienne, routine', develop: "La discipline, l'organisation et les routines quotidiennes nécessitent du développement" },
    7: { name: 'Chance & Intuition', trait: 'Chance intérieure, dons spirituels, intuition', develop: "La confiance en le destin et la conscience spirituelle nécessitent du développement" },
    8: { name: 'Devoir & Stabilité', trait: 'Responsabilité, fiabilité, stabilité', develop: "Le sens des responsabilités et l'engagement nécessitent du développement" },
    9: { name: 'Mémoire & Sagesse', trait: 'Mémoire profonde, esprit analytique, sagesse', develop: 'La mémoire et la capacité de généralisation nécessitent du développement' },
  },
  lt: {
    1: { name: 'Charakteris ir valia', trait: 'Stipri valia, ryžtas, vidinė energija', develop: 'Pasitikėjimas savimi ir atkaklumas reikalauja ugdymo' },
    2: { name: 'Energija ir emocijos', trait: 'Emocinis jautrumas, empatija, išraiškingumas', develop: 'Emocinis intelektas ir empatija reikalauja ugdymo' },
    3: { name: 'Intelektas', trait: 'Aštrus protas, greitas mokymasis, smalsumas', develop: 'Analitinis mąstymas ir intelektinis smalsumas reikalauja ugdymo' },
    4: { name: 'Sveikata ir kūnas', trait: 'Fizinė energija, gyvybingumas, ištvermė', develop: 'Sveikata ir fizinis aktyvumas nusipelno ypatingo dėmesio' },
    5: { name: 'Logika ir intuicija', trait: 'Intuityvus kanalas, vidinis balsas, suvokimas', develop: 'Intuicija ir pasitikėjimas vidiniais jausmais reikalauja ugdymo' },
    6: { name: 'Darbštumas', trait: 'Darbštumas, kasdienė drausmė, tvarka', develop: 'Drausmė, organizuotumas ir kasdienė rutina reikalauja ugdymo' },
    7: { name: 'Sėkmė ir intuicija', trait: 'Vidinė sėkmė, dvasinės dovanos, intuicija', develop: 'Pasitikėjimas likimu ir dvasinė sąmonė reikalauja ugdymo' },
    8: { name: 'Pareiga ir stabilumas', trait: 'Atsakomybė, patikimumas, stabilumas', develop: 'Atsakomybės jausmas ir įsipareigojimas reikalauja ugdymo' },
    9: { name: 'Atmintis ir išmintis', trait: 'Gili atmintis, analitinis protas, išmintis', develop: 'Atmintis ir sugebėjimas apibendrinti reikalauja ugdymo' },
  },
};

function calcMatrix(dateStr: string): Record<number, number> {
  const [yyyy, mm, dd] = dateStr.split('-');
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  (dd + mm + yyyy).split('').map(Number).forEach(d => {
    if (d >= 1 && d <= 9) counts[d]++;
  });
  return counts;
}

const GRID_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function PythagoreanMatrixCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const meanings = DIGIT_MEANINGS[locale] ?? DIGIT_MEANINGS.en;
  const [date, setDate] = useState('');
  const [matrix, setMatrix] = useState<Record<number, number> | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setMatrix(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError(t.errInvalid); setMatrix(null); return; }
    setError('');
    setMatrix(calcMatrix(date));
  };

  const strongDigits = matrix ? GRID_ORDER.filter(n => matrix[n] > 0) : [];
  const emptyDigits = matrix ? GRID_ORDER.filter(n => matrix[n] === 0) : [];

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => { setDate(e.target.value); setError(''); setMatrix(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {matrix && (
        <div className={styles.calc__result}>
          <div className={styles.calc__grid_wrap}>
            <div className={styles.calc__grid}>
              {GRID_ORDER.map(n => {
                const count = matrix[n];
                const filled = count > 0;
                return (
                  <div
                    key={n}
                    className={`${styles.calc__cell}${filled ? ' ' + styles['calc__cell--filled'] : ''}`}
                    title={meanings[n].name}
                  >
                    <span className={styles.calc__cell_num}>{n}</span>
                    <span className={styles.calc__cell_count}>
                      {filled ? String(n).repeat(count) : '—'}
                    </span>
                    {filled && (
                      <span className={styles.calc__cell_dots}>
                        {Array.from({ length: count }).map((_, i) => (
                          <span key={i} className={styles.calc__dot} />
                        ))}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.calc__interp}>
            {strongDigits.length > 0 && (
              <div className={styles.calc__zone}>
                <h3 className={styles.calc__zone_title}>{t.strongTitle}</h3>
                <div className={styles.calc__zone_list}>
                  {strongDigits.map(n => {
                    const count = matrix[n];
                    const meaning = meanings[n];
                    return (
                      <div key={n} className={styles.calc__zone_item}>
                        <div className={`${styles.calc__zone_badge} ${styles['calc__zone_badge--filled']}`}>
                          {count > 1 ? String(n).repeat(count) : n}
                        </div>
                        <div className={styles.calc__zone_content}>
                          <span className={styles.calc__zone_name}>{meaning.name}</span>
                          {count > 1 && <span className={styles.calc__zone_amplified}>{t.amplified}</span>}
                          <span className={styles.calc__zone_trait}>{meaning.trait}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {emptyDigits.length > 0 && (
              <div className={styles.calc__zone}>
                <h3 className={`${styles.calc__zone_title} ${styles['calc__zone_title--empty']}`}>{t.emptyTitle}</h3>
                <div className={styles.calc__zone_list}>
                  {emptyDigits.map(n => {
                    const meaning = meanings[n];
                    return (
                      <div key={n} className={`${styles.calc__zone_item} ${styles['calc__zone_item--empty']}`}>
                        <div className={`${styles.calc__zone_badge} ${styles['calc__zone_badge--empty']}`}>
                          {n}
                        </div>
                        <div className={styles.calc__zone_content}>
                          <span className={styles.calc__zone_name}>{meaning.name}</span>
                          <span className={styles.calc__zone_trait}>{meaning.develop}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
