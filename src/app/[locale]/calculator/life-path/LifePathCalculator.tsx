'use client';

import { useState } from 'react';
import styles from './LifePathCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; resultTitle: string;
  masterBadge: string; errEmpty: string; errInvalid: string;
}> = {
  en: { label: 'Date of birth', btn: 'Calculate Life Path Number', resultTitle: 'Your Life Path Number', masterBadge: 'Master Number', errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.' },
  ru: { label: 'Дата рождения', btn: 'Рассчитать число жизненного пути', resultTitle: 'Ваше число жизненного пути', masterBadge: 'Мастер-число', errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.' },
  uk: { label: 'Дата народження', btn: 'Розрахувати число життєвого шляху', resultTitle: 'Ваше число життєвого шляху', masterBadge: 'Майстер-число', errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.' },
  fr: { label: 'Date de naissance', btn: 'Calculer mon chemin de vie', resultTitle: 'Votre chemin de vie', masterBadge: 'Nombre Maître', errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.' },
  lt: { label: 'Gimimo data', btn: 'Apskaičiuoti gyvenimo kelio numerį', resultTitle: 'Jūsų gyvenimo kelio numeris', masterBadge: 'Meistro skaičius', errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite galiojančią datą.' },
};

const NUM_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'The Leader', desc: 'Independent, ambitious and pioneering. You forge your own path with courage and determination, inspiring others with your originality and drive.' },
    ru: { name: 'Лидер', desc: 'Независимый, амбициозный и первопроходец. Вы прокладываете собственный путь с мужеством и решительностью, вдохновляя других своей оригинальностью.' },
    uk: { name: 'Лідер', desc: 'Незалежний, амбітний та першопрохідець. Ви прокладаєте власний шлях із мужністю та рішучістю, надихаючи інших своєю оригінальністю.' },
    fr: { name: 'Le Leader', desc: 'Indépendant, ambitieux et pionnier. Vous tracez votre propre chemin avec courage et détermination, inspirant les autres par votre originalité.' },
    lt: { name: 'Lyderis', desc: 'Nepriklausomas, ambicingas ir pradininkas. Praminate savo kelią su drąsa ir ryžtu, įkvėpdami kitus savo originalumu.' },
  },
  2: {
    en: { name: 'The Peacemaker', desc: 'Diplomatic, sensitive and cooperative. You excel in partnerships and teamwork, bringing harmony and understanding to all relationships.' },
    ru: { name: 'Миротворец', desc: 'Дипломатичный, чувствительный и кооперативный. Вы преуспеваете в партнёрстве и командной работе, привнося гармонию и взаимопонимание.' },
    uk: { name: 'Миротворець', desc: 'Дипломатичний, чутливий та кооперативний. Ви досягаєте успіху в партнерстві та командній роботі, привносячи гармонію та взаєморозуміння.' },
    fr: { name: 'Le Pacificateur', desc: 'Diplomatique, sensible et coopératif. Vous excellez dans les partenariats, apportant harmonie et compréhension à toutes vos relations.' },
    lt: { name: 'Taikos kūrėjas', desc: 'Diplomatiškas, jautrus ir bendraujantis. Puikiai dirbate partnerystėje, į visus santykius įnešdami harmoniją ir supratimą.' },
  },
  3: {
    en: { name: 'The Creator', desc: 'Creative, expressive and joyful. You have a gift for communication and the arts, with an optimistic outlook that brightens everyone around you.' },
    ru: { name: 'Творец', desc: 'Творческий, выразительный и жизнерадостный. У вас есть дар общения и искусства, оптимистичный взгляд, который вдохновляет окружающих.' },
    uk: { name: 'Творець', desc: 'Творчий, виразний та радісний. У вас є дар спілкування та мистецтва, оптимістичний погляд, який надихає оточуючих.' },
    fr: { name: 'Le Créateur', desc: 'Créatif, expressif et joyeux. Vous avez un don pour la communication et les arts, avec un optimisme qui illumine votre entourage.' },
    lt: { name: 'Kūrėjas', desc: 'Kūrybingas, ekspresyvus ir linksmas. Turite dovaną komunikacijai ir menui, o jūsų optimizmas šviesina visus aplinkinius.' },
  },
  4: {
    en: { name: 'The Builder', desc: 'Practical, disciplined and reliable. You build lasting foundations through hard work and perseverance, bringing order and stability to everything you do.' },
    ru: { name: 'Строитель', desc: 'Практичный, дисциплинированный и надёжный. Вы строите прочные основы через упорный труд и настойчивость, привнося порядок и стабильность.' },
    uk: { name: 'Будівельник', desc: 'Практичний, дисциплінований та надійний. Ви будуєте міцні основи через наполегливу працю та наполегливість, привносячи порядок і стабільність.' },
    fr: { name: 'Le Bâtisseur', desc: 'Pratique, discipliné et fiable. Vous construisez des fondations durables par le travail et la persévérance, apportant ordre et stabilité.' },
    lt: { name: 'Statytojas', desc: 'Praktiškas, disciplinuotas ir patikimas. Sunkiu darbu ir atkaklumu kuriate tvarius pamatus, įnešdami tvarką ir stabilumą.' },
  },
  5: {
    en: { name: 'The Explorer', desc: 'Adventurous, versatile and freedom-loving. You thrive on change and new experiences, bringing energy and enthusiasm wherever life takes you.' },
    ru: { name: 'Исследователь', desc: 'Авантюрный, разносторонний и свободолюбивый. Вы процветаете в переменах и новом опыте, привнося энергию и энтузиазм в жизнь.' },
    uk: { name: 'Дослідник', desc: 'Авантюрний, різносторонній та волелюбний. Ви процвітаєте у змінах і новому досвіді, привносячи енергію та ентузіазм у життя.' },
    fr: { name: "L'Explorateur", desc: "Aventureux, polyvalent et épris de liberté. Vous vous épanouissez dans le changement et les nouvelles expériences, apportant énergie et enthousiasme." },
    lt: { name: 'Tyrinėtojas', desc: 'Nuotykių ieškantis, universalus ir mylintis laisvę. Klestite pokyčiuose ir naujose patirtyse, įnešdami energiją ir entuziazmą.' },
  },
  6: {
    en: { name: 'The Nurturer', desc: 'Caring, responsible and harmonious. You have a natural gift for healing and helping others, creating warmth and balance in your home and community.' },
    ru: { name: 'Опекун', desc: 'Заботливый, ответственный и гармоничный. У вас есть природный дар исцеления и помощи другим, создания тепла и равновесия.' },
    uk: { name: 'Опікун', desc: 'Дбайливий, відповідальний та гармонійний. У вас є природний дар зцілення та допомоги іншим, створення тепла та рівноваги.' },
    fr: { name: 'Le Protecteur', desc: 'Attentionné, responsable et harmonieux. Vous avez un don naturel pour soigner et aider les autres, créant chaleur et équilibre autour de vous.' },
    lt: { name: 'Globėjas', desc: 'Rūpestingas, atsakingas ir harmoningas. Turite natūralią dovaną gydyti ir padėti kitiems, kurdami šilumą ir pusiausvyrą.' },
  },
  7: {
    en: { name: 'The Seeker', desc: 'Analytical, spiritual and introspective. You have a deep need for knowledge and truth, with a natural ability for research, analysis and spiritual insight.' },
    ru: { name: 'Искатель', desc: 'Аналитичный, духовный и самоуглублённый. У вас есть глубокая потребность в знаниях и истине, природная способность к исследованиям и духовному познанию.' },
    uk: { name: 'Шукач', desc: 'Аналітичний, духовний та самозаглиблений. У вас є глибока потреба у знаннях та істині, природна здатність до досліджень і духовного пізнання.' },
    fr: { name: 'Le Chercheur', desc: 'Analytique, spirituel et introspectif. Vous avez un profond besoin de connaissance et de vérité, avec une aptitude naturelle pour la recherche et la perspicacité.' },
    lt: { name: 'Ieškotojas', desc: 'Analitiškas, dvasinis ir introspektyvus. Turite gilų žinių ir tiesos poreikį, natūralų gebėjimą tyrinėti ir dvasinį įžvalgumą.' },
  },
  8: {
    en: { name: 'The Achiever', desc: 'Ambitious, powerful and goal-oriented. You have exceptional organisational skills and the drive to achieve material and professional success on a grand scale.' },
    ru: { name: 'Достигатор', desc: 'Амбициозный, мощный и целеустремлённый. У вас исключительные организаторские способности и стремление к материальному и профессиональному успеху.' },
    uk: { name: 'Досягатор', desc: 'Амбітний, потужний та цілеспрямований. У вас є виняткові організаторські здібності та прагнення до матеріального і професійного успіху.' },
    fr: { name: 'Le Réalisateur', desc: 'Ambitieux, puissant et orienté vers les objectifs. Vous avez des compétences organisationnelles exceptionnelles et la volonté de réussir matériellement.' },
    lt: { name: 'Pasiekėjas', desc: 'Ambicingas, galingas ir orientuotas į tikslus. Turite išskirtinių organizacinių įgūdžių ir ryžto pasiekti materialinę ir profesinę sėkmę.' },
  },
  9: {
    en: { name: 'The Humanitarian', desc: 'Compassionate, idealistic and wise. You are driven by a desire to serve humanity, with broad wisdom and a natural understanding of the human condition.' },
    ru: { name: 'Гуманист', desc: 'Сострадательный, идеалистичный и мудрый. Вами движет желание служить человечеству, широкая мудрость и понимание человеческой природы.' },
    uk: { name: 'Гуманіст', desc: 'Співчутливий, ідеалістичний та мудрий. Вами рухає бажання служити людству, широка мудрість та розуміння людської природи.' },
    fr: { name: "L'Humaniste", desc: "Compatissant, idéaliste et sage. Vous êtes animé par le désir de servir l'humanité, avec une sagesse profonde et une compréhension naturelle de la condition humaine." },
    lt: { name: 'Humanistas', desc: 'Užjaučiantis, idealistinis ir išmintingas. Esate vedamas noro tarnauti žmonijai, turite platų išmintį ir natūralų žmogaus prigimties supratimą.' },
  },
  11: {
    en: { name: 'Master Intuitive', desc: 'Highly sensitive, inspirational and spiritually aware. As a master number, 11 carries intensified energy — you are a natural channel for spiritual insight and inspiration.' },
    ru: { name: 'Мастер-интуит', desc: 'Высокочувствительный, вдохновляющий и духовно осознанный. Как мастер-число, 11 несёт усиленную энергию — вы являетесь естественным каналом для духовного прозрения.' },
    uk: { name: 'Майстер-інтуїт', desc: 'Висококочутливий, надихаючий та духовно усвідомлений. Як майстер-число, 11 несе посилену енергію — ви є природним каналом для духовного прозріння.' },
    fr: { name: 'Maître Intuitif', desc: "Très sensible, inspirant et conscient spirituellement. En tant que nombre maître, le 11 porte une énergie intensifiée — vous êtes un canal naturel pour la perspicacité spirituelle." },
    lt: { name: 'Meistro intuitas', desc: 'Labai jautrus, įkvepiantis ir dvasiškai suvokiantis. Kaip meistro skaičius, 11 neša sustiprėjusią energiją — esate natūralus dvasinio įžvalgumo kanalas.' },
  },
  22: {
    en: { name: 'Master Builder', desc: 'Visionary, practical and supremely capable. Combining intuition with practicality, you can turn ambitious dreams into lasting real-world achievements.' },
    ru: { name: 'Мастер-строитель', desc: 'Визионерский, практичный и исключительно способный. Сочетая интуицию с практичностью, вы можете превращать амбициозные мечты в реальные достижения.' },
    uk: { name: 'Майстер-будівельник', desc: 'Візіонерський, практичний та винятково здібний. Поєднуючи інтуїцію з практичністю, ви можете перетворювати амбітні мрії на реальні досягнення.' },
    fr: { name: 'Maître Bâtisseur', desc: "Visionnaire, pratique et suprêmement capable. En combinant intuition et pragmatisme, vous pouvez transformer de grands rêves en réalisations durables." },
    lt: { name: 'Meistro statytojas', desc: 'Visionierius, praktiškas ir nepaprastai galingas. Derindami intuiciją su praktiškumu, galite paversti ambicingus svajones ilgalaikiais realiais pasiekimais.' },
  },
  33: {
    en: { name: 'Master Teacher', desc: 'Compassionate, selfless and deeply wise. The rarest master number — you are called to serve, heal and uplift humanity through unconditional love and wisdom.' },
    ru: { name: 'Мастер-учитель', desc: 'Сострадательный, бескорыстный и глубоко мудрый. Самое редкое мастер-число — вы призваны служить, исцелять и возвышать человечество через безусловную любовь и мудрость.' },
    uk: { name: 'Майстер-вчитель', desc: 'Співчутливий, безкорисливий та глибоко мудрий. Найрідкісніше майстер-число — ви покликані служити, зцілювати та піднімати людство через безумовну любов і мудрість.' },
    fr: { name: 'Maître Enseignant', desc: "Compatissant, altruiste et profondément sage. Le nombre maître le plus rare — vous êtes appelé à servir, guérir et élever l'humanité par l'amour inconditionnel." },
    lt: { name: 'Meistro mokytojas', desc: 'Užjaučiantis, nesavanaudiškas ir giliai išmintingas. Rečiausias meistro skaičius — esate pašauktas tarnauti, gydyti ir kelti žmoniją besąlygiška meile ir išmintimi.' },
  },
};

function digitSum(n: number): number {
  return String(Math.abs(n)).split('').reduce((s, d) => s + parseInt(d, 10), 0);
}

function reduce(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n <= 9) return n;
  return reduce(digitSum(n));
}

function calcLifePath(dateStr: string): number {
  const total = dateStr.replace(/-/g, '').split('').reduce((s, d) => s + parseInt(d, 10), 0);
  return reduce(total);
}

export default function LifePathCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!date) { setError(t.errEmpty); setResult(null); return; }
    const d = new Date(date);
    if (isNaN(d.getTime()) || d.getFullYear() < 1900 || d > new Date()) {
      setError(t.errInvalid); setResult(null); return;
    }
    setError('');
    setResult(calcLifePath(date));
  };

  const info = result !== null ? (NUM_INFO[result]?.[locale] ?? NUM_INFO[result]?.en) : null;
  const isMaster = result === 11 || result === 22 || result === 33;

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="date"
          className={styles.calc__input}
          value={date}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => { setDate(e.target.value); setError(''); setResult(null); }}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {result !== null && info && (
        <div className={styles.calc__result}>
          {isMaster && <span className={styles['calc__master-badge']}>{t.masterBadge}</span>}
          <div className={styles.calc__number}>{result}</div>
          <div className={styles.calc__name}>{info.name}</div>
          <p className={styles.calc__desc}>{info.desc}</p>
        </div>
      )}
    </div>
  );
}
