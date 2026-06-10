'use client';

import { useState } from 'react';
import styles from './DestinyNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; resultTitle: string;
  masterBadge: string; errEmpty: string; errInvalid: string;
}> = {
  en: { label: 'Date of birth', btn: 'Calculate Destiny Number', resultTitle: 'Your Destiny Number', masterBadge: 'Master Number', errEmpty: 'Please enter your date of birth.', errInvalid: 'Please enter a valid date.' },
  ru: { label: 'Дата рождения', btn: 'Рассчитать число судьбы', resultTitle: 'Ваше число судьбы', masterBadge: 'Мастер-число', errEmpty: 'Введите дату рождения.', errInvalid: 'Введите корректную дату.' },
  uk: { label: 'Дата народження', btn: 'Розрахувати число долі', resultTitle: 'Ваше число долі', masterBadge: 'Майстер-число', errEmpty: 'Введіть дату народження.', errInvalid: 'Введіть коректну дату.' },
  fr: { label: 'Date de naissance', btn: 'Calculer mon nombre du destin', resultTitle: 'Votre nombre du destin', masterBadge: 'Nombre Maître', errEmpty: 'Veuillez entrer votre date de naissance.', errInvalid: 'Veuillez entrer une date valide.' },
  lt: { label: 'Gimimo data', btn: 'Apskaičiuoti likimo numerį', resultTitle: 'Jūsų likimo numeris', masterBadge: 'Meistro skaičius', errEmpty: 'Įveskite gimimo datą.', errInvalid: 'Įveskite galiojančią datą.' },
};

const NUM_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'The Initiator', desc: 'Your destiny is to lead and pioneer. You are meant to stand at the forefront — independent, original, and self-reliant — showing others the way forward.' },
    ru: { name: 'Инициатор', desc: 'Ваша судьба — вести и первопроходить. Вы предназначены стоять впереди — независимым, оригинальным и самодостаточным — указывая другим путь вперёд.' },
    uk: { name: 'Ініціатор', desc: 'Ваша доля — вести і першопроходити. Ви призначені стояти на чолі — незалежним, оригінальним та самодостатнім — вказуючи іншим шлях вперед.' },
    fr: { name: "L'Initiateur", desc: "Votre destin est de mener et d'innover. Vous êtes fait pour être en avant-garde — indépendant, original et autonome — montrant aux autres la voie." },
    lt: { name: 'Iniciatorius', desc: 'Jūsų likimas — vadovauti ir pradėti nauja. Esate skirti stovėti priešakyje — nepriklausomi, originalūs ir savarankiški — rodydami kitiems kelią.' },
  },
  2: {
    en: { name: 'The Diplomat', desc: 'Your destiny is to bring peace and cooperation. You are a natural mediator, destined to unite people through empathy, tact and a deep understanding of others.' },
    ru: { name: 'Дипломат', desc: 'Ваша судьба — приносить мир и сотрудничество. Вы прирождённый посредник, предназначенный объединять людей через эмпатию, такт и глубокое понимание.' },
    uk: { name: 'Дипломат', desc: 'Ваша доля — приносити мир і співпрацю. Ви природжений посередник, призначений об\'єднувати людей через емпатію, такт та глибоке розуміння.' },
    fr: { name: 'Le Diplomate', desc: "Votre destin est d'apporter paix et coopération. Vous êtes un médiateur né, destiné à unir les gens grâce à l'empathie, au tact et à la compréhension profonde." },
    lt: { name: 'Diplomatas', desc: 'Jūsų likimas — nešti taiką ir bendradarbiavimą. Esate prigimtinis tarpininkas, skirtas jungti žmones per empatiją, taktą ir gilų supratimą.' },
  },
  3: {
    en: { name: 'The Communicator', desc: 'Your destiny is to inspire through creative expression. You are meant to share joy, beauty and ideas with the world through words, art or performance.' },
    ru: { name: 'Коммуникатор', desc: 'Ваша судьба — вдохновлять через творческое самовыражение. Вам предназначено делиться радостью, красотой и идеями с миром через слова, искусство или выступления.' },
    uk: { name: 'Комунікатор', desc: 'Ваша доля — надихати через творче самовираження. Вам призначено ділитися радістю, красою та ідеями зі світом через слова, мистецтво або виступи.' },
    fr: { name: 'Le Communicateur', desc: "Votre destin est d'inspirer par l'expression créative. Vous êtes fait pour partager joie, beauté et idées avec le monde à travers les mots, l'art ou la scène." },
    lt: { name: 'Komunikatorius', desc: 'Jūsų likimas — įkvėpti per kūrybinę raišką. Esate skirti dalytis džiaugsmu, grožiu ir idėjomis su pasauliu per žodžius, meną ar pasirodymą.' },
  },
  4: {
    en: { name: 'The Foundation Keeper', desc: 'Your destiny is to build solid foundations. You are meant to create order, stability and lasting structures — in business, family or community.' },
    ru: { name: 'Хранитель основ', desc: 'Ваша судьба — строить прочные основы. Вам предназначено создавать порядок, стабильность и долговечные структуры в бизнесе, семье или сообществе.' },
    uk: { name: 'Охоронець основ', desc: 'Ваша доля — будувати міцні основи. Вам призначено створювати порядок, стабільність та довготривалі структури в бізнесі, сім\'ї або суспільстві.' },
    fr: { name: 'Le Gardien des Fondations', desc: "Votre destin est de construire des bases solides. Vous êtes fait pour créer ordre, stabilité et structures durables — dans les affaires, la famille ou la communauté." },
    lt: { name: 'Pagrindų saugotojas', desc: 'Jūsų likimas — kurti tvirtus pamatus. Esate skirti kurti tvarką, stabilumą ir ilgalaikes struktūras versle, šeimoje ar bendruomenėje.' },
  },
  5: {
    en: { name: 'The Freedom Seeker', desc: 'Your destiny is to experience and inspire change. You are meant to live fully, embrace variety, and show others the liberating power of adaptability.' },
    ru: { name: 'Искатель свободы', desc: 'Ваша судьба — переживать и вдохновлять перемены. Вам предназначено жить в полную силу, принимать разнообразие и показывать другим освобождающую силу адаптивности.' },
    uk: { name: 'Шукач свободи', desc: 'Ваша доля — переживати та надихати зміни. Вам призначено жити на повну, приймати різноманітність та показувати іншим звільнювальну силу адаптивності.' },
    fr: { name: 'Le Chercheur de Liberté', desc: "Votre destin est de vivre et d'inspirer le changement. Vous êtes fait pour vivre pleinement, embrasser la variété et montrer aux autres la puissance libératrice de l'adaptabilité." },
    lt: { name: 'Laisvės ieškotojas', desc: 'Jūsų likimas — patirti ir įkvėpti pokyčius. Esate skirti gyventi visapusiškai, priimti įvairovę ir parodyti kitiems išlaisvinančią prisitaikymo galią.' },
  },
  6: {
    en: { name: 'The Caretaker', desc: 'Your destiny is to serve and nurture. You are meant to be a source of love, healing and responsibility — creating beauty and harmony wherever you go.' },
    ru: { name: 'Попечитель', desc: 'Ваша судьба — служить и опекать. Вам предназначено быть источником любви, исцеления и ответственности — создавая красоту и гармонию везде, куда вы идёте.' },
    uk: { name: 'Піклувальник', desc: 'Ваша доля — служити та опікуватися. Вам призначено бути джерелом любові, зцілення та відповідальності — створюючи красу та гармонію всюди, куди ви йдете.' },
    fr: { name: 'Le Gardien', desc: "Votre destin est de servir et de prendre soin. Vous êtes fait pour être une source d'amour, de guérison et de responsabilité — créant beauté et harmonie partout où vous allez." },
    lt: { name: 'Rūpintojas', desc: 'Jūsų likimas — tarnauti ir globoti. Esate skirti būti meilės, gydymo ir atsakomybės šaltiniu — kurdami grožį ir harmoniją visur, kur tik einate.' },
  },
  7: {
    en: { name: 'The Wisdom Seeker', desc: 'Your destiny is to uncover truth and wisdom. You are meant to delve deeply into the mysteries of life, gaining knowledge that you then share with the world.' },
    ru: { name: 'Искатель мудрости', desc: 'Ваша судьба — открывать истину и мудрость. Вам предназначено глубоко погружаться в тайны жизни, обретая знания, которые вы затем передаёте миру.' },
    uk: { name: 'Шукач мудрості', desc: 'Ваша доля — відкривати істину та мудрість. Вам призначено глибоко занурюватися в таємниці життя, здобуваючи знання, якими ви ділитеся зі світом.' },
    fr: { name: 'Le Chercheur de Sagesse', desc: "Votre destin est de découvrir la vérité et la sagesse. Vous êtes fait pour plonger profondément dans les mystères de la vie, acquérant des connaissances à partager." },
    lt: { name: 'Išminties ieškotojas', desc: 'Jūsų likimas — atskleisti tiesą ir išmintį. Esate skirti giliai nagrinėti gyvenimo paslaptis, įgyti žinių ir jomis dalytis su pasauliu.' },
  },
  8: {
    en: { name: 'The Powerhouse', desc: 'Your destiny is to achieve and lead in the material world. You are meant to master the realms of business, finance and authority, creating abundance for yourself and others.' },
    ru: { name: 'Силач', desc: 'Ваша судьба — достигать и вести в материальном мире. Вам предназначено освоить сферы бизнеса, финансов и власти, создавая изобилие для себя и других.' },
    uk: { name: 'Силач', desc: 'Ваша доля — досягати та вести в матеріальному світі. Вам призначено освоїти сфери бізнесу, фінансів та влади, створюючи достаток для себе і інших.' },
    fr: { name: 'La Puissance', desc: "Votre destin est de réaliser et de diriger dans le monde matériel. Vous êtes fait pour maîtriser les domaines des affaires, de la finance et de l'autorité." },
    lt: { name: 'Galybė', desc: 'Jūsų likimas — pasiekti ir vadovauti materialiame pasaulyje. Esate skirti įvaldyti verslo, finansų ir valdžios sritis, kurdami gausą sau ir kitiems.' },
  },
  9: {
    en: { name: 'The Universal Giver', desc: 'Your destiny is to serve the greater good. You are meant to transcend personal concerns, offering your compassion, creativity and wisdom to benefit all of humanity.' },
    ru: { name: 'Всеобщий даятель', desc: 'Ваша судьба — служить общему благу. Вам предназначено выходить за рамки личных интересов, предлагая своё сострадание, творчество и мудрость на благо всего человечества.' },
    uk: { name: 'Загальний дарувальник', desc: 'Ваша доля — служити загальному благу. Вам призначено виходити за межі особистих інтересів, пропонуючи своє співчуття, творчість та мудрість на благо всього людства.' },
    fr: { name: 'Le Donneur Universel', desc: "Votre destin est de servir le bien commun. Vous êtes fait pour transcender les préoccupations personnelles, offrant votre compassion, créativité et sagesse à l'humanité." },
    lt: { name: 'Visuotinis davėjas', desc: 'Jūsų likimas — tarnauti bendrajam gėriui. Esate skirti peržengti asmeninius rūpesčius, siūlydami savo užuojautą, kūrybiškumą ir išmintį visai žmonijai.' },
  },
  11: {
    en: { name: 'Master Inspirator', desc: 'Your destiny is to inspire and illuminate. As a master number, 11 calls you to serve as a spiritual messenger — elevating others through your heightened sensitivity and vision.' },
    ru: { name: 'Мастер-вдохновитель', desc: 'Ваша судьба — вдохновлять и просвещать. Как мастер-число, 11 призывает вас быть духовным посланником — возвышая других через вашу обострённую чувствительность и видение.' },
    uk: { name: 'Майстер-надихатель', desc: 'Ваша доля — надихати та просвітлювати. Як майстер-число, 11 закликає вас бути духовним посланцем — піднімаючи інших через вашу загострену чутливість та бачення.' },
    fr: { name: 'Maître Inspirateur', desc: "Votre destin est d'inspirer et d'illuminer. En tant que nombre maître, le 11 vous appelle à servir de messager spirituel — élevant les autres par votre sensibilité accrue." },
    lt: { name: 'Meistro įkvėpėjas', desc: 'Jūsų likimas — įkvėpti ir apšviesti. Kaip meistro skaičius, 11 kviečia jus būti dvasiniu pasiuntiniu — keliant kitus per padidintą jautrumą ir viziją.' },
  },
  22: {
    en: { name: 'Master Architect', desc: 'Your destiny is to build on a grand scale. The most powerful master number calls you to transform visionary dreams into practical reality that benefits the whole world.' },
    ru: { name: 'Мастер-архитектор', desc: 'Ваша судьба — строить в большом масштабе. Самое мощное мастер-число призывает вас превращать визионерские мечты в практическую реальность, которая приносит пользу всему миру.' },
    uk: { name: 'Майстер-архітектор', desc: 'Ваша доля — будувати у великому масштабі. Найпотужніше майстер-число закликає вас перетворювати візіонерські мрії на практичну реальність, яка приносить користь усьому світу.' },
    fr: { name: "Maître Architecte", desc: "Votre destin est de construire à grande échelle. Le nombre maître le plus puissant vous appelle à transformer des rêves visionnaires en réalité pratique bénéficiant au monde entier." },
    lt: { name: 'Meistro architektas', desc: 'Jūsų likimas — kurti dideliu mastu. Galingiausias meistro skaičius kviečia jus paversti vizionieriškas svajones praktine realybe, naudinga visam pasauliui.' },
  },
  33: {
    en: { name: 'Master Healer', desc: 'Your destiny is the highest service. As the rarest master number, 33 calls you to embody unconditional love and compassion, serving as a healer and teacher for all of humanity.' },
    ru: { name: 'Мастер-целитель', desc: 'Ваша судьба — высшее служение. Как самое редкое мастер-число, 33 призывает вас воплощать безусловную любовь и сострадание, служа целителем и учителем для всего человечества.' },
    uk: { name: 'Майстер-цілитель', desc: 'Ваша доля — найвище служіння. Як найрідкісніше майстер-число, 33 закликає вас втілювати безумовну любов та співчуття, служачи цілителем та вчителем для всього людства.' },
    fr: { name: 'Maître Guérisseur', desc: "Votre destin est le service suprême. En tant que nombre maître le plus rare, le 33 vous appelle à incarner l'amour inconditionnel et la compassion, servant de guérisseur." },
    lt: { name: 'Meistro gydytojas', desc: 'Jūsų likimas — aukščiausia tarnyba. Kaip rečiausias meistro skaičius, 33 kviečia jus įkūnyti besąlyginę meilę ir užuojautą, tarnaujant gydytoju ir mokytoju visai žmonijai.' },
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

function calcDestiny(dateStr: string): number {
  const [yyyy, mm, dd] = dateStr.split('-').map(Number);
  const d = reduce(digitSum(dd));
  const m = reduce(digitSum(mm));
  const y = reduce(digitSum(yyyy));
  return reduce(d + m + y);
}

export default function DestinyNumberCalculator({ locale }: Props) {
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
    setResult(calcDestiny(date));
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
