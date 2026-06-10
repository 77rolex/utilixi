'use client';

import { useState } from 'react';
import styles from './NameNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; hint: string; btn: string;
  masterBadge: string; errEmpty: string; errNoLetters: string;
}> = {
  en: { label: 'Full name', hint: 'Enter your full name (Latin or Cyrillic)', btn: 'Calculate Name Number', masterBadge: 'Master Number', errEmpty: 'Please enter your name.', errNoLetters: 'Name must contain at least one letter.' },
  ru: { label: 'Полное имя', hint: 'Введите полное имя (латиница или кириллица)', btn: 'Рассчитать число имени', masterBadge: 'Мастер-число', errEmpty: 'Введите имя.', errNoLetters: 'Имя должно содержать хотя бы одну букву.' },
  uk: { label: 'Повне ім\'я', hint: 'Введіть повне ім\'я (латиниця або кирилиця)', btn: 'Розрахувати число імені', masterBadge: 'Майстер-число', errEmpty: 'Введіть ім\'я.', errNoLetters: 'Ім\'я має містити хоча б одну літеру.' },
  fr: { label: 'Nom complet', hint: 'Entrez votre nom complet (Latin ou cyrillique)', btn: 'Calculer le nombre du nom', masterBadge: 'Nombre Maître', errEmpty: 'Veuillez entrer votre nom.', errNoLetters: 'Le nom doit contenir au moins une lettre.' },
  lt: { label: 'Pilnas vardas', hint: 'Įveskite pilną vardą (lotyniška arba kirilica)', btn: 'Apskaičiuoti vardo numerį', masterBadge: 'Meistro skaičius', errEmpty: 'Įveskite vardą.', errNoLetters: 'Vardas turi turėti bent vieną raidę.' },
};

const NUM_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'The Original', desc: 'Your name vibrates with leadership and independence. This energy draws you toward self-expression, originality and pioneering endeavours.' },
    ru: { name: 'Оригинал', desc: 'Ваше имя вибрирует с энергией лидерства и независимости. Эта энергия влечёт вас к самовыражению, оригинальности и первопроходческой деятельности.' },
    uk: { name: 'Оригінал', desc: 'Ваше ім\'я вібрує з енергією лідерства та незалежності. Ця енергія притягує вас до самовираження, оригінальності та першопроходницької діяльності.' },
    fr: { name: "L'Original", desc: "Votre nom vibre avec le leadership et l'indépendance. Cette énergie vous attire vers l'expression de soi, l'originalité et les entreprises pionnières." },
    lt: { name: 'Originalus', desc: 'Jūsų vardas vibruoja lyderyste ir nepriklausomybe. Ši energija traukia jus link savęs raiškos, originalumo ir novatorių veiklos.' },
  },
  2: {
    en: { name: 'The Harmoniser', desc: 'Your name carries the vibration of cooperation and sensitivity. This energy brings grace, intuition and the ability to create harmony between people.' },
    ru: { name: 'Гармонизатор', desc: 'Ваше имя несёт вибрацию сотрудничества и чувствительности. Эта энергия привносит изящество, интуицию и способность создавать гармонию между людьми.' },
    uk: { name: 'Гармонізатор', desc: 'Ваше ім\'я несе вібрацію співпраці та чутливості. Ця енергія привносить витонченість, інтуїцію та здатність створювати гармонію між людьми.' },
    fr: { name: "L'Harmoniseur", desc: "Votre nom porte la vibration de la coopération et de la sensibilité. Cette énergie apporte grâce, intuition et capacité à créer l'harmonie entre les personnes." },
    lt: { name: 'Harmonizuotojas', desc: 'Jūsų vardas nešioja bendradarbiavimo ir jautrumo vibraciją. Ši energija atneša malonumą, intuiciją ir gebėjimą kurti harmoniją tarp žmonių.' },
  },
  3: {
    en: { name: 'The Expressive', desc: 'Your name resonates with creativity and joy. This vibration supports artistic talents, communication skills and an innate ability to uplift the spirits of those around you.' },
    ru: { name: 'Выразительный', desc: 'Ваше имя резонирует с творчеством и радостью. Эта вибрация поддерживает художественные таланты, коммуникативные способности и врождённую способность поднимать настроение.' },
    uk: { name: 'Виразний', desc: 'Ваше ім\'я резонує з творчістю та радістю. Ця вібрація підтримує художні таланти, комунікативні здібності та вроджену здатність піднімати настрій.' },
    fr: { name: "L'Expressif", desc: "Votre nom résonne avec la créativité et la joie. Cette vibration soutient les talents artistiques, les aptitudes à la communication et la capacité à élever les esprits." },
    lt: { name: 'Ekspresyvus', desc: 'Jūsų vardas rezonuoja su kūrybiškumu ir džiaugsmu. Ši vibracija palaiko meninius talentus, bendravimo įgūdžius ir įgimtą gebėjimą pakelti aplinkinių nuotaiką.' },
  },
  4: {
    en: { name: 'The Steadfast', desc: 'Your name vibrates with stability and discipline. This energy supports a methodical, trustworthy nature — you are someone others can always rely on.' },
    ru: { name: 'Стойкий', desc: 'Ваше имя вибрирует со стабильностью и дисциплиной. Эта энергия поддерживает методичный, надёжный характер — вы тот, на кого всегда можно положиться.' },
    uk: { name: 'Стійкий', desc: 'Ваше ім\'я вібрує зі стабільністю та дисципліною. Ця енергія підтримує методичний, надійний характер — ви той, на кого завжди можна покластися.' },
    fr: { name: 'Le Solide', desc: "Votre nom vibre avec stabilité et discipline. Cette énergie soutient une nature méthodique et fiable — vous êtes quelqu'un sur qui on peut toujours compter." },
    lt: { name: 'Tvirtas', desc: 'Jūsų vardas vibruoja stabilumu ir disciplina. Ši energija palaiko metodišką, patikimą prigimtį — jūs esate žmogus, kuriuo visada galima pasitikėti.' },
  },
  5: {
    en: { name: 'The Dynamic', desc: 'Your name carries the vibration of freedom and change. This energy draws you toward adventure, travel and dynamic experiences that keep life fresh and exciting.' },
    ru: { name: 'Динамичный', desc: 'Ваше имя несёт вибрацию свободы и перемен. Эта энергия влечёт вас к приключениям, путешествиям и динамичным переживаниям, которые делают жизнь свежей и захватывающей.' },
    uk: { name: 'Динамічний', desc: 'Ваше ім\'я несе вібрацію свободи та змін. Ця енергія притягує вас до пригод, подорожей та динамічних переживань, які роблять життя свіжим та захоплюючим.' },
    fr: { name: 'Le Dynamique', desc: "Votre nom porte la vibration de la liberté et du changement. Cette énergie vous attire vers l'aventure, le voyage et les expériences dynamiques qui maintiennent la vie fraîche." },
    lt: { name: 'Dinamiškas', desc: 'Jūsų vardas nešioja laisvės ir pokyčių vibraciją. Ši energija traukia jus link nuotykių, kelionių ir dinamiškų patirčių, kurios išlaiko gyvenimą šviežią ir jaudinantį.' },
  },
  6: {
    en: { name: 'The Loving', desc: 'Your name resonates with love and responsibility. This vibration gives you a nurturing nature and a deep sense of duty to your family, community and the world.' },
    ru: { name: 'Любящий', desc: 'Ваше имя резонирует с любовью и ответственностью. Эта вибрация даёт вам заботливую натуру и глубокое чувство долга перед семьёй, сообществом и миром.' },
    uk: { name: 'Люблячий', desc: 'Ваше ім\'я резонує з любов\'ю та відповідальністю. Ця вібрація дає вам дбайливу натуру та глибоке відчуття обов\'язку перед сім\'єю, суспільством та світом.' },
    fr: { name: "L'Aimant", desc: "Votre nom résonne avec l'amour et la responsabilité. Cette vibration vous donne une nature bienveillante et un profond sens du devoir envers votre famille et votre communauté." },
    lt: { name: 'Mylintis', desc: 'Jūsų vardas rezonuoja su meile ir atsakomybe. Ši vibracija suteikia jums rūpestingą prigimtį ir gilų pareigos jausmą savo šeimai, bendruomenei ir pasauliui.' },
  },
  7: {
    en: { name: 'The Analytical', desc: 'Your name vibrates with the energy of deep thought and spiritual inquiry. You possess an exceptional mind and a natural drive to understand the deeper mysteries of existence.' },
    ru: { name: 'Аналитик', desc: 'Ваше имя вибрирует с энергией глубокого мышления и духовного поиска. Вы обладаете исключительным умом и природным стремлением понять более глубокие тайны существования.' },
    uk: { name: 'Аналітик', desc: 'Ваше ім\'я вібрує з енергією глибокого мислення та духовного пошуку. Ви маєте виняткові розумові здібності та природне прагнення зрозуміти глибші таємниці існування.' },
    fr: { name: "L'Analytique", desc: "Votre nom vibre avec l'énergie de la pensée profonde et de la quête spirituelle. Vous possédez un esprit exceptionnel et une tendance naturelle à comprendre les mystères de l'existence." },
    lt: { name: 'Analitiškas', desc: 'Jūsų vardas vibruoja gilaus mąstymo ir dvasinio tyrimo energija. Turite išskirtinį protą ir natūralų siekį suprasti gilesnes egzistencijos paslaptis.' },
  },
  8: {
    en: { name: 'The Powerful', desc: 'Your name carries the vibration of authority and achievement. This energy supports ambition, financial acumen and the ability to lead and create abundance on a large scale.' },
    ru: { name: 'Мощный', desc: 'Ваше имя несёт вибрацию авторитета и достижений. Эта энергия поддерживает амбиции, финансовую хватку и способность вести и создавать изобилие в большом масштабе.' },
    uk: { name: 'Могутній', desc: 'Ваше ім\'я несе вібрацію авторитету та досягнень. Ця енергія підтримує амбіції, фінансову кмітливість та здатність вести та створювати достаток у великому масштабі.' },
    fr: { name: 'Le Puissant', desc: "Votre nom porte la vibration de l'autorité et de la réussite. Cette énergie soutient l'ambition, l'acuité financière et la capacité à diriger et créer l'abondance." },
    lt: { name: 'Galingas', desc: 'Jūsų vardas nešioja autoriteto ir pasiekimų vibraciją. Ši energija palaiko ambiciją, finansinį sumanumą ir gebėjimą vadovauti bei kurti gausą dideliu mastu.' },
  },
  9: {
    en: { name: 'The Compassionate', desc: 'Your name resonates with universal love and philanthropy. This vibration gives you a broad, tolerant outlook and a natural desire to serve and improve the world.' },
    ru: { name: 'Сострадательный', desc: 'Ваше имя резонирует со всеобщей любовью и филантропией. Эта вибрация даёт вам широкий, терпимый взгляд и природное желание служить и улучшать мир.' },
    uk: { name: 'Співчутливий', desc: 'Ваше ім\'я резонує із загальною любов\'ю та філантропією. Ця вібрація дає вам широкий, терпимий погляд та природне бажання служити та покращувати світ.' },
    fr: { name: 'Le Compatissant', desc: "Votre nom résonne avec l'amour universel et la philanthropie. Cette vibration vous donne une vision large et tolérante et un désir naturel de servir et d'améliorer le monde." },
    lt: { name: 'Užjaučiantis', desc: 'Jūsų vardas rezonuoja su visuotine meile ir filantropija. Ši vibracija suteikia jums plačią, tolerantišką perspektyvą ir natūralų norą tarnauti bei gerinti pasaulį.' },
  },
  11: {
    en: { name: 'Master Visionary', desc: 'Your name carries the most spiritually charged vibration. As a master number name, 11 endows you with heightened intuition, sensitivity and the potential for profound spiritual leadership.' },
    ru: { name: 'Мастер-визионер', desc: 'Ваше имя несёт наиболее духовно заряженную вибрацию. Как имя мастер-числа, 11 наделяет вас обострённой интуицией, чувствительностью и потенциалом духовного лидерства.' },
    uk: { name: 'Майстер-візіонер', desc: 'Ваше ім\'я несе найбільш духовно заряджену вібрацію. Як ім\'я майстер-числа, 11 наділяє вас загостреною інтуїцією, чутливістю та потенціалом духовного лідерства.' },
    fr: { name: 'Maître Visionnaire', desc: "Votre nom porte la vibration la plus chargée spirituellement. En tant que nom à nombre maître, le 11 vous dote d'une intuition accrue et d'un potentiel de leadership spirituel." },
    lt: { name: 'Meistro visionierius', desc: 'Jūsų vardas nešioja dvasiškai labiausiai įkrautą vibraciją. Kaip meistro skaičiaus vardas, 11 suteikia jums padidintą intuiciją ir dvasinio lyderystės potencialą.' },
  },
  22: {
    en: { name: 'Master Manifestor', desc: 'Your name vibrates at the highest practical frequency. This master number name empowers you to manifest extraordinary achievements and leave a lasting legacy in the world.' },
    ru: { name: 'Мастер-манифестор', desc: 'Ваше имя вибрирует на высочайшей практической частоте. Это имя мастер-числа наделяет вас силой проявлять необыкновенные достижения и оставлять неизгладимое наследие в мире.' },
    uk: { name: 'Майстер-маніфестор', desc: 'Ваше ім\'я вібрує на найвищій практичній частоті. Це ім\'я майстер-числа наділяє вас силою проявляти надзвичайні досягнення та залишати незабутню спадщину у світі.' },
    fr: { name: 'Maître Manifestant', desc: "Votre nom vibre à la fréquence pratique la plus élevée. Ce nom à nombre maître vous habilite à manifester des réalisations extraordinaires et laisser un héritage durable." },
    lt: { name: 'Meistro manifestuotojas', desc: 'Jūsų vardas vibruoja aukščiausiame praktiniu dažniu. Šis meistro skaičiaus vardas suteikia jums galią pasireikšti nepaprastais pasiekimais ir palikti ilgalaikį palikimą.' },
  },
  33: {
    en: { name: 'Master Nurturer', desc: 'Your name carries the most compassionate vibration that exists. This rare master number name calls you to embody unconditional love and devote yourself to the healing of others.' },
    ru: { name: 'Мастер-опекун', desc: 'Ваше имя несёт наиболее сострадательную вибрацию из существующих. Это редкое имя мастер-числа призывает вас воплощать безусловную любовь и посвящать себя исцелению других.' },
    uk: { name: 'Майстер-опікун', desc: 'Ваше ім\'я несе найбільш співчутливу вібрацію з існуючих. Це рідкісне ім\'я майстер-числа закликає вас втілювати безумовну любов та присвячувати себе зціленню інших.' },
    fr: { name: 'Maître Nourricier', desc: "Votre nom porte la vibration la plus compatissante qui existe. Ce rare nom à nombre maître vous appelle à incarner l'amour inconditionnel et à vous consacrer à la guérison des autres." },
    lt: { name: 'Meistro globėjas', desc: 'Jūsų vardas nešioja labiausiai užjaučiančią egzistuojančią vibraciją. Šis retas meistro skaičiaus vardas kviečia jus įkūnyti besąlyginę meilę ir skirti save kitų gydymui.' },
  },
};

const PYTHAGOREAN: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
  J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
  S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
  'А':1,'Б':2,'В':3,'Г':4,'Д':5,'Е':6,'Ж':7,'З':8,'И':9,
  'Й':1,'К':2,'Л':3,'М':4,'Н':5,'О':6,'П':7,'Р':8,'С':9,
  'Т':1,'У':2,'Ф':3,'Х':4,'Ц':5,'Ч':6,'Ш':7,'Щ':8,'Ъ':9,
  'Ы':1,'Ь':2,'Э':3,'Ю':4,'Я':5,'Ё':6,
  'І':9,'Ї':1,'Є':6,'Ґ':4,
};

function digitSum(n: number): number {
  return String(Math.abs(n)).split('').reduce((s, d) => s + parseInt(d, 10), 0);
}

function reduce(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n <= 9) return n;
  return reduce(digitSum(n));
}

function calcNameNumber(name: string): number | null {
  const letters = name.toUpperCase().split('').filter(c => PYTHAGOREAN[c] !== undefined);
  if (letters.length === 0) return null;
  const total = letters.reduce((s, c) => s + PYTHAGOREAN[c], 0);
  return reduce(total);
}

export default function NameNumberCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [name, setName] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!name.trim()) { setError(t.errEmpty); setResult(null); return; }
    const n = calcNameNumber(name.trim());
    if (n === null) { setError(t.errNoLetters); setResult(null); return; }
    setError('');
    setResult(n);
  };

  const info = result !== null ? (NUM_INFO[result]?.[locale] ?? NUM_INFO[result]?.en) : null;
  const isMaster = result === 11 || result === 22 || result === 33;

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="text"
          className={styles.calc__input}
          value={name}
          placeholder="John Smith"
          onChange={(e) => { setName(e.target.value); setError(''); setResult(null); }}
          onKeyDown={(e) => e.key === 'Enter' && calculate()}
        />
        <span className={styles.calc__hint}>{t.hint}</span>
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
