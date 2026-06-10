'use client';

import { useState } from 'react';
import styles from './KarmicNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, { label: string; btn: string; errEmpty: string; errInvalid: string; noDebts: string; noDebtsDesc: string }> = {
  en: { label: 'Date of birth', btn: 'Find Karmic Numbers', errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.', noDebts: '✨ No Karmic Debts', noDebtsDesc: 'All digits 1–9 appear in your birth date. You enter this life with no karmic debts — a rare and fortunate start on your journey.' },
  ru: { label: 'Дата рождения', btn: 'Найти кармические числа', errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.', noDebts: '✨ Нет кармических долгов', noDebtsDesc: 'Все цифры от 1 до 9 присутствуют в вашей дате рождения. Вы входите в эту жизнь без кармических долгов — редкий и счастливый старт.' },
  uk: { label: 'Дата народження', btn: 'Знайти кармічні числа', errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.', noDebts: '✨ Немає кармічних боргів', noDebtsDesc: 'Усі цифри від 1 до 9 присутні у вашій даті народження. Ви входите в це життя без кармічних боргів — рідкісний та щасливий старт.' },
  fr: { label: 'Date de naissance', btn: 'Trouver les nombres karmiques', errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.', noDebts: '✨ Pas de dettes karmiques', noDebtsDesc: 'Tous les chiffres de 1 à 9 apparaissent dans votre date de naissance. Vous entrez dans cette vie sans dettes karmiques — un début rare et chanceux.' },
  lt: { label: 'Gimimo data', btn: 'Rasti karminius skaičius', errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite teisingą datą.', noDebts: '✨ Nėra karminių skolų', noDebtsDesc: 'Visi skaitmenys nuo 1 iki 9 yra jūsų gimimo datoje. Jūs įeinate į šį gyvenimą be karminių skolų — retas ir laimingas pradžios taškas.' },
};

const DEBT_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'Karmic Debt of Self', desc: 'The digit 1 — willpower, leadership and self-assertion — is absent from your birth date. Your lesson in this life is to develop confidence, overcome dependence on others and learn to stand on your own two feet. Cultivating initiative and a sense of self will be a core growth area.' },
    ru: { name: 'Кармический долг Воли', desc: 'Цифра 1 — сила воли, лидерство и самоутверждение — отсутствует в вашей дате рождения. Ваш урок в этой жизни — развить уверенность, преодолеть зависимость от других и научиться стоять на собственных ногах. Инициатива и самоощущение будут ключевыми областями роста.' },
    uk: { name: 'Кармічний борг Волі', desc: 'Цифра 1 — сила волі, лідерство та самоствердження — відсутня у вашій даті народження. Ваш урок у цьому житті — розвинути впевненість, подолати залежність від інших та навчитися стояти на власних ногах.' },
    fr: { name: 'Dette karmique du Moi', desc: 'Le chiffre 1 — volonté, leadership et affirmation de soi — est absent de votre date de naissance. Votre leçon dans cette vie est de développer la confiance, de surmonter la dépendance aux autres et d\'apprendre à vous tenir debout par vous-même.' },
    lt: { name: 'Karminė Valios skola', desc: 'Skaitmuo 1 — valia, lyderystė ir savęs teigimas — nėra jūsų gimimo datoje. Jūsų pamoka šiame gyvenime yra ugdyti pasitikėjimą savimi, įveikti priklausomybę nuo kitų ir išmokti stovėti ant savo kojų.' },
  },
  2: {
    en: { name: 'Karmic Debt of Cooperation', desc: 'The digit 2 — sensitivity, diplomacy and partnership — is missing. Your challenge is to learn patience, genuine consideration for others and the art of collaboration. Relationships may require extra conscious effort, but mastering them brings profound richness to your life.' },
    ru: { name: 'Кармический долг Сотрудничества', desc: 'Цифра 2 — чувствительность, дипломатия и партнёрство — отсутствует. Ваш вызов — научиться терпению, искреннему учёту интересов других и искусству сотрудничества. Отношения могут требовать дополнительных сознательных усилий, но их освоение приносит глубокое обогащение.' },
    uk: { name: 'Кармічний борг Співпраці', desc: 'Цифра 2 — чутливість, дипломатія та партнерство — відсутня. Ваш виклик — навчитися терпінню, щирому врахуванню інтересів інших та мистецтву співпраці.' },
    fr: { name: 'Dette karmique de la Coopération', desc: 'Le chiffre 2 — sensibilité, diplomatie et partenariat — est manquant. Votre défi est d\'apprendre la patience, la véritable considération pour les autres et l\'art de la collaboration.' },
    lt: { name: 'Karminė Bendradarbiavimo skola', desc: 'Skaitmuo 2 — jautrumas, diplomatija ir partnerystė — trūksta. Jūsų iššūkis yra išmokti kantrybės, tikro kitų atsižvelgimo ir bendradarbiavimo meno.' },
  },
  3: {
    en: { name: 'Karmic Debt of Expression', desc: 'The digit 3 — creativity, self-expression and joy — is absent. You are here to learn to speak your truth, embrace your creative gifts and allow yourself to experience lightness and joy. Suppressing your authentic voice was a pattern in past cycles; this life invites you to break it.' },
    ru: { name: 'Кармический долг Самовыражения', desc: 'Цифра 3 — творчество, самовыражение и радость — отсутствует. Вы здесь, чтобы научиться говорить свою правду, принять творческие дары и позволить себе испытывать лёгкость и радость. Подавление подлинного голоса было паттерном прошлых циклов.' },
    uk: { name: 'Кармічний борг Самовираження', desc: 'Цифра 3 — творчість, самовираження та радість — відсутня. Ви тут, щоб навчитися говорити свою правду, прийняти творчі дари та дозволити собі відчувати легкість і радість.' },
    fr: { name: 'Dette karmique de l\'Expression', desc: 'Le chiffre 3 — créativité, expression personnelle et joie — est absent. Vous êtes ici pour apprendre à exprimer votre vérité, embrasser vos dons créatifs et vous permettre de vivre la légèreté et la joie.' },
    lt: { name: 'Karminė Raiškos skola', desc: 'Skaitmuo 3 — kūrybiškumas, saviraiška ir džiaugsmas — nėra. Esate čia, kad išmoktumėte kalbėti savo tiesą, priimtumėte kūrybinius talentus ir leistumėte sau patirti lengvumą ir džiaugsmą.' },
  },
  4: {
    en: { name: 'Karmic Debt of Discipline', desc: 'The digit 4 — discipline, structure and practical effort — is missing from your date. Your lesson is to develop perseverance, follow through on commitments and build stable foundations in your life. Shortcuts and scattered energy were patterns of past lives; patient, methodical work is your path forward.' },
    ru: { name: 'Кармический долг Труда', desc: 'Цифра 4 — дисциплина, структура и практические усилия — отсутствует в вашей дате. Ваш урок — развить настойчивость, следовать обязательствам и строить стабильные основы. Ярлыки и рассредоточенная энергия были паттернами прошлых жизней.' },
    uk: { name: 'Кармічний борг Праці', desc: 'Цифра 4 — дисципліна, структура та практичні зусилля — відсутня у вашій даті. Ваш урок — розвинути наполегливість, дотримуватися зобов\'язань та будувати стабільні основи.' },
    fr: { name: 'Dette karmique du Travail', desc: 'Le chiffre 4 — discipline, structure et effort pratique — manque dans votre date. Votre leçon est de développer la persévérance, de respecter vos engagements et de construire des bases stables dans votre vie.' },
    lt: { name: 'Karminė Darbo skola', desc: 'Skaitmuo 4 — disciplina, struktūra ir praktinės pastangos — trūksta jūsų datoje. Jūsų pamoka yra ugdyti atkaklumą, laikytis įsipareigojimų ir statyti stabilius pagrindus savo gyvenime.' },
  },
  5: {
    en: { name: 'Karmic Debt of Freedom', desc: 'The digit 5 — freedom, adaptability and experience — is absent. You are here to learn to embrace change, break free from excessive routine and allow yourself to explore life with curiosity. Fear of the unknown and rigid patterns are the karmic lessons you are being invited to dissolve.' },
    ru: { name: 'Кармический долг Свободы', desc: 'Цифра 5 — свобода, адаптивность и опыт — отсутствует. Вы здесь, чтобы научиться принимать перемены, вырваться из чрезмерной рутины и позволить себе исследовать жизнь с любопытством. Страх неизвестного и жёсткие паттерны — кармические уроки для проработки.' },
    uk: { name: 'Кармічний борг Свободи', desc: 'Цифра 5 — свобода, адаптивність та досвід — відсутня. Ви тут, щоб навчитися приймати зміни, вирватися з надмірної рутини та дозволити собі досліджувати життя з цікавістю.' },
    fr: { name: 'Dette karmique de la Liberté', desc: 'Le chiffre 5 — liberté, adaptabilité et expérience — est absent. Vous êtes ici pour apprendre à embrasser le changement, vous libérer des routines excessives et vous permettre d\'explorer la vie avec curiosité.' },
    lt: { name: 'Karminė Laisvės skola', desc: 'Skaitmuo 5 — laisvė, prisitaikymas ir patirtis — nėra. Esate čia, kad išmoktumėte priimti pokyčius, išsivaduoti iš per didelio rutinos ir leistumėte sau tyrinėti gyvenimą su smalsumu.' },
  },
  6: {
    en: { name: 'Karmic Debt of Responsibility', desc: 'The digit 6 — love, responsibility and service — is missing. Your lesson is to open your heart to others, accept responsibility for those in your care and learn to give and receive love without conditions. Avoidance of commitment or emotional bonds was a pattern to overcome in this life.' },
    ru: { name: 'Кармический долг Любви', desc: 'Цифра 6 — любовь, ответственность и служение — отсутствует. Ваш урок — открыть сердце другим, принять ответственность за тех, кто под вашей опекой, и научиться давать и получать любовь без условий. Избегание обязательств было паттерном для преодоления.' },
    uk: { name: 'Кармічний борг Любові', desc: 'Цифра 6 — любов, відповідальність та служіння — відсутня. Ваш урок — відкрити серце іншим, прийняти відповідальність та навчитися давати і отримувати любов без умов.' },
    fr: { name: 'Dette karmique de la Responsabilité', desc: 'Le chiffre 6 — amour, responsabilité et service — manque. Votre leçon est d\'ouvrir votre cœur aux autres, d\'accepter la responsabilité envers ceux dont vous prenez soin et d\'apprendre à donner et recevoir l\'amour sans conditions.' },
    lt: { name: 'Karminė Atsakomybės skola', desc: 'Skaitmuo 6 — meilė, atsakomybė ir tarnyba — trūksta. Jūsų pamoka yra atverti širdį kitiems, prisiimti atsakomybę už tuos, kurie yra jūsų globoje, ir išmokti duoti bei gauti meilę be sąlygų.' },
  },
  7: {
    en: { name: 'Karmic Debt of Introspection', desc: 'The digit 7 — reflection, spirituality and inner wisdom — is absent from your birth date. Your lesson is to develop a rich inner life, trust intuition and seek deeper meaning beyond the material world. A tendency to remain purely on the surface was the pattern you are here to transcend.' },
    ru: { name: 'Кармический долг Духовности', desc: 'Цифра 7 — рефлексия, духовность и внутренняя мудрость — отсутствует в вашей дате. Ваш урок — развить богатую внутреннюю жизнь, доверять интуиции и искать более глубокий смысл за пределами материального мира.' },
    uk: { name: 'Кармічний борг Духовності', desc: 'Цифра 7 — рефлексія, духовність та внутрішня мудрість — відсутня. Ваш урок — розвинути багате внутрішнє життя, довіряти інтуїції та шукати глибший сенс за межами матеріального світу.' },
    fr: { name: 'Dette karmique de l\'Introspection', desc: 'Le chiffre 7 — réflexion, spiritualité et sagesse intérieure — est absent. Votre leçon est de développer une vie intérieure riche, de faire confiance à votre intuition et de chercher un sens plus profond au-delà du monde matériel.' },
    lt: { name: 'Karminė Introspekcinė skola', desc: 'Skaitmuo 7 — apmąstymai, dvasingumas ir vidinė išmintis — nėra jūsų gimimo datoje. Jūsų pamoka yra ugdyti turtingą vidinį gyvenimą, pasitikėti intuicija ir ieškoti gilesnės prasmės už materialaus pasaulio ribų.' },
  },
  8: {
    en: { name: 'Karmic Debt of Abundance', desc: 'The digit 8 — material mastery, ambition and financial intelligence — is missing. Your lesson is to develop a healthy relationship with money, power and achievement. Avoiding material responsibility or misusing resources were patterns of past cycles; learning to build and manage abundance wisely is your path.' },
    ru: { name: 'Кармический долг Изобилия', desc: 'Цифра 8 — материальное мастерство, амбиции и финансовый интеллект — отсутствует. Ваш урок — развить здоровые отношения с деньгами, властью и достижениями. Избегание материальной ответственности или неправильное использование ресурсов были паттернами прошлых циклов.' },
    uk: { name: 'Кармічний борг Достатку', desc: 'Цифра 8 — матеріальна майстерність, амбіції та фінансовий інтелект — відсутня. Ваш урок — розвинути здорові відносини з грошима, владою та досягненнями.' },
    fr: { name: 'Dette karmique de l\'Abondance', desc: 'Le chiffre 8 — maîtrise matérielle, ambition et intelligence financière — manque. Votre leçon est de développer une relation saine avec l\'argent, le pouvoir et les réalisations.' },
    lt: { name: 'Karminė Gausos skola', desc: 'Skaitmuo 8 — materialinė meistrystė, ambicijos ir finansinis intelektas — trūksta. Jūsų pamoka yra ugdyti sveiką santykį su pinigais, galia ir pasiekimais.' },
  },
  9: {
    en: { name: 'Karmic Debt of Compassion', desc: 'The digit 9 — compassion, wisdom and selfless service — is absent from your date. You are here to learn to rise above personal ego, cultivate empathy for all of humanity and give generously without expecting return. Selfishness or emotional withdrawal were the patterns you are invited to heal.' },
    ru: { name: 'Кармический долг Мудрости', desc: 'Цифра 9 — сострадание, мудрость и бескорыстное служение — отсутствует в вашей дате. Вы здесь, чтобы научиться подниматься над личным эго, развивать эмпатию ко всему человечеству и щедро отдавать, не ожидая возврата.' },
    uk: { name: 'Кармічний борг Мудрості', desc: 'Цифра 9 — співчуття, мудрість та безкорисливе служіння — відсутня. Ви тут, щоб навчитися підніматися над особистим его, розвивати емпатію до всього людства та щедро віддавати, не очікуючи повернення.' },
    fr: { name: 'Dette karmique de la Compassion', desc: 'Le chiffre 9 — compassion, sagesse et service désintéressé — est absent. Vous êtes ici pour apprendre à dépasser l\'ego personnel, cultiver l\'empathie pour toute l\'humanité et donner généreusement sans attendre de retour.' },
    lt: { name: 'Karminė Užuojautos skola', desc: 'Skaitmuo 9 — užuojauta, išmintis ir nesavanaudiška tarnyba — nėra jūsų datoje. Esate čia, kad išmoktumėte pakilti virš asmeninio ego, ugdyti empatiją visai žmonijai ir dosniai duoti, nesitikint grąžinimo.' },
  },
};

function getKarmicNumbers(dateStr: string): number[] {
  const [yyyy, mm, dd] = dateStr.split('-');
  const presentDigits = new Set((dd + mm + yyyy).split('').map(Number).filter(d => d > 0));
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !presentDigits.has(n));
}

export default function KarmicNumberCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [date, setDate] = useState('');
  const [debts, setDebts] = useState<number[] | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setDebts(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime())) { setError(t.errInvalid); setDebts(null); return; }
    setError('');
    setDebts(getKarmicNumbers(date));
  };

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => { setDate(e.target.value); setError(''); setDebts(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {debts !== null && (
        <div className={styles.calc__result}>
          {debts.length === 0 ? (
            <div className={styles.calc__no_debts}>
              <p>{t.noDebts}</p>
              <p>{t.noDebtsDesc}</p>
            </div>
          ) : (
            <div className={styles.calc__debts}>
              {debts.map(n => {
                const info = DEBT_INFO[n]?.[locale] ?? DEBT_INFO[n]?.en;
                return (
                  <div key={n} className={styles.calc__debt_item}>
                    <div className={styles.calc__debt_num}>{n}</div>
                    <div className={styles.calc__debt_info}>
                      <div className={styles.calc__debt_name}>{info.name}</div>
                      <p className={styles.calc__debt_desc}>{info.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
