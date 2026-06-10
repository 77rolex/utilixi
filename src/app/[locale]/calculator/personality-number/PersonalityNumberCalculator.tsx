'use client';

import { useState } from 'react';
import styles from './PersonalityNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; hint: string; btn: string;
  masterBadge: string; errEmpty: string; errNoConsonants: string;
}> = {
  en: { label: 'Full name', hint: 'Only consonants are used in the calculation', btn: 'Calculate Personality Number', masterBadge: 'Master Number', errEmpty: 'Please enter your name.', errNoConsonants: 'No consonants found in the name.' },
  ru: { label: 'Полное имя', hint: 'Для расчёта используются только согласные буквы', btn: 'Рассчитать число личности', masterBadge: 'Мастер-число', errEmpty: 'Введите имя.', errNoConsonants: 'В имени не найдено согласных букв.' },
  uk: { label: 'Повне ім\'я', hint: 'Для розрахунку використовуються лише приголосні літери', btn: 'Розрахувати число особистості', masterBadge: 'Майстер-число', errEmpty: 'Введіть ім\'я.', errNoConsonants: 'У імені не знайдено приголосних літер.' },
  fr: { label: 'Nom complet', hint: 'Seules les consonnes sont utilisées dans le calcul', btn: 'Calculer le nombre de personnalité', masterBadge: 'Nombre Maître', errEmpty: 'Veuillez entrer votre nom.', errNoConsonants: 'Aucune consonne trouvée dans le nom.' },
  lt: { label: 'Pilnas vardas', hint: 'Skaičiavimui naudojami tik priebalsiai', btn: 'Apskaičiuoti asmenybės numerį', masterBadge: 'Meistro skaičius', errEmpty: 'Įveskite vardą.', errNoConsonants: 'Varde nerasta priebalsių.' },
};

const NUM_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'The Independent', desc: 'You project an image of confidence, strength and authority. Others see you as a natural leader — decisive, self-assured and capable of taking charge in any situation.' },
    ru: { name: 'Независимый', desc: 'Вы проецируете образ уверенности, силы и авторитета. Другие видят в вас природного лидера — решительного, уверенного в себе и способного взять дело в свои руки в любой ситуации.' },
    uk: { name: 'Незалежний', desc: 'Ви проектуєте образ впевненості, сили та авторитету. Інші бачать у вас природного лідера — рішучого, впевненого в собі та здатного взяти справу в свої руки в будь-якій ситуації.' },
    fr: { name: "L'Indépendant", desc: "Vous projetez une image de confiance, de force et d'autorité. Les autres vous voient comme un leader naturel — décisif, sûr de vous et capable de prendre les choses en main." },
    lt: { name: 'Nepriklausomas', desc: 'Projektuojate pasitikėjimo, stiprybės ir autoriteto įvaizdį. Kiti jus mato kaip natūralų lyderį — ryžtingą, savimi pasitikinčiu ir gebantį imtis atsakomybės bet kurioje situacijoje.' },
  },
  2: {
    en: { name: 'The Gentle', desc: 'You come across as approachable, warm and considerate. People feel instantly at ease around you, sensing your genuine interest in them and your natural ability to listen and understand.' },
    ru: { name: 'Мягкий', desc: 'Вы производите впечатление доступного, тёплого и вдумчивого человека. Люди сразу чувствуют себя непринуждённо рядом с вами, ощущая вашу искреннюю заинтересованность и умение слушать.' },
    uk: { name: 'М\'який', desc: 'Ви справляєте враження доступної, теплої та вдумливої людини. Люди одразу почуваються невимушено поруч з вами, відчуваючи вашу щиру зацікавленість та вміння слухати.' },
    fr: { name: 'Le Doux', desc: "Vous vous montrez accessible, chaleureux et attentionné. Les gens se sentent immédiatement à l'aise avec vous, sentant votre véritable intérêt pour eux et votre capacité naturelle à écouter." },
    lt: { name: 'Švelnus', desc: 'Atrodo prieinamas, šiltas ir atidus. Žmonės jaučiasi iš karto patogiai šalia jūsų, jaučiant jūsų tikrą susidomėjimą jais ir natūralų gebėjimą klausytis ir suprasti.' },
  },
  3: {
    en: { name: 'The Charming', desc: 'You have a magnetic, sociable personality. Others are drawn to your wit, energy and enthusiasm. You come across as fun, creative and full of life — someone who makes any gathering brighter.' },
    ru: { name: 'Очаровательный', desc: 'У вас притягательная, общительная личность. Другие тянутся к вашему остроумию, энергии и энтузиазму. Вы производите впечатление весёлого, творческого и полного жизни человека.' },
    uk: { name: 'Чарівний', desc: 'У вас притягальна, товариська особистість. Інші тягнуться до вашого дотепності, енергії та ентузіазму. Ви справляєте враження веселої, творчої та повної життя людини.' },
    fr: { name: 'Le Charmant', desc: "Vous avez une personnalité magnétique et sociable. Les autres sont attirés par votre esprit, votre énergie et votre enthousiasme. Vous paraissez amusant, créatif et plein de vie." },
    lt: { name: 'Žavus', desc: 'Turite magnetišką, bendraujančią asmenybę. Kiti traukiami jūsų proto, energijos ir entuziazmo. Atrodo, kad esate linksmas, kūrybingas ir pilnas gyvenimo žmogus.' },
  },
  4: {
    en: { name: 'The Reliable', desc: 'You project an image of dependability, discipline and thoroughness. Others see you as someone who keeps their word, follows through on commitments and can always be counted on.' },
    ru: { name: 'Надёжный', desc: 'Вы проецируете образ надёжности, дисциплины и тщательности. Другие видят в вас человека, который держит слово, выполняет обязательства и на которого всегда можно положиться.' },
    uk: { name: 'Надійний', desc: 'Ви проектуєте образ надійності, дисципліни та ретельності. Інші бачать у вас людину, яка тримає слово, виконує зобов\'язання та на яку завжди можна покластися.' },
    fr: { name: 'Le Fiable', desc: "Vous projetez une image de fiabilité, de discipline et de rigueur. Les autres vous voient comme quelqu'un qui tient sa parole, suit ses engagements et sur qui on peut toujours compter." },
    lt: { name: 'Patikimas', desc: 'Projektuojate patikimumo, disciplinos ir kruopštumo įvaizdį. Kiti jus mato kaip žmogų, kuris laiko žodį, vykdo įsipareigojimus ir kuriuo visada galima pasitikėti.' },
  },
  5: {
    en: { name: 'The Adventurous', desc: 'You project a vibrant, exciting image. Others see you as someone dynamic, unpredictable and full of stories — a free spirit who lives life to the fullest and inspires others to do the same.' },
    ru: { name: 'Авантюрный', desc: 'Вы проецируете яркий, захватывающий образ. Другие видят в вас динамичного, непредсказуемого и полного историй человека — свободного духа, живущего жизнь в полную и вдохновляющего других.' },
    uk: { name: 'Авантюрний', desc: 'Ви проектуєте яскравий, захоплюючий образ. Інші бачать у вас динамічну, непередбачувану та повну історій людину — вільного духу, який живе на повну та надихає інших.' },
    fr: { name: "L'Aventureux", desc: "Vous projetez une image vibrante et passionnante. Les autres vous voient comme quelqu'un de dynamique, imprévisible et plein d'histoires — un esprit libre qui vit pleinement et inspire les autres." },
    lt: { name: 'Nuotykių mėgėjas', desc: 'Projektuojate ryškų, jaudinantį įvaizdį. Kiti jus mato kaip dinamišką, nenuspėjamą ir kupina istorijų žmogų — laisvą dvasią, gyvenantį pilnai ir įkvepiančiu kitus daryti tą patį.' },
  },
  6: {
    en: { name: 'The Trustworthy', desc: 'You project an image of warmth, caring and responsibility. Others see you as someone they can come to with their problems — a person of integrity, compassion and steady moral strength.' },
    ru: { name: 'Заслуживающий доверия', desc: 'Вы проецируете образ теплоты, заботы и ответственности. Другие видят в вас человека, к которому можно обратиться с проблемами — личность с высокими моральными принципами и состраданием.' },
    uk: { name: 'Гідний довіри', desc: 'Ви проектуєте образ теплоти, турботи та відповідальності. Інші бачать у вас людину, до якої можна звернутися з проблемами — особистість з високими моральними принципами та співчуттям.' },
    fr: { name: 'Le Digne de Confiance', desc: "Vous projetez une image de chaleur, de sollicitude et de responsabilité. Les autres vous voient comme quelqu'un à qui ils peuvent confier leurs problèmes — une personne d'intégrité et de compassion." },
    lt: { name: 'Vertas pasitikėjimo', desc: 'Projektuojate šilumos, rūpestingumo ir atsakomybės įvaizdį. Kiti jus mato kaip žmogų, kuriam galima kreiptis su problemomis — asmenybę su aukštais moraliniais principais ir užuojauta.' },
  },
  7: {
    en: { name: 'The Mysterious', desc: 'You have an air of mystery and depth about you. Others find you intriguing — you seem thoughtful, reserved and knowledgeable. People sense there is much more to you than you reveal on the surface.' },
    ru: { name: 'Загадочный', desc: 'В вас есть аура тайны и глубины. Другие находят вас интригующим — вы кажетесь задумчивым, сдержанным и эрудированным. Люди чувствуют, что в вас гораздо больше, чем вы показываете.' },
    uk: { name: 'Загадковий', desc: 'У вас є аура таємниці та глибини. Інші вважають вас інтригуючим — ви здаєтеся задумливим, стриманим та ерудованим. Люди відчувають, що у вас набагато більше, ніж ви показуєте.' },
    fr: { name: 'Le Mystérieux', desc: "Vous avez un air de mystère et de profondeur. Les autres vous trouvent fascinant — vous semblez réfléchi, réservé et savant. Les gens sentent qu'il y a bien plus en vous que ce que vous montrez." },
    lt: { name: 'Paslaptingas', desc: 'Turite paslapties ir gylio aurą. Kiti jus laiko intriguojančiu — atroto, kad esate mąslingas, santūrus ir išmanantis. Žmonės jaučia, kad jūs turite daug daugiau, nei parodote.' },
  },
  8: {
    en: { name: 'The Executive', desc: 'You project an image of authority, competence and success. Others see you as capable, ambitious and goal-driven. You carry yourself with confidence, and people naturally look to you for leadership.' },
    ru: { name: 'Руководитель', desc: 'Вы проецируете образ авторитета, компетентности и успеха. Другие видят вас способным, амбициозным и целеустремлённым. Вы держитесь с уверенностью, и люди естественно ищут в вас лидера.' },
    uk: { name: 'Керівник', desc: 'Ви проектуєте образ авторитету, компетентності та успіху. Інші бачать вас здібним, амбітним та цілеспрямованим. Ви тримаєтеся з впевненістю, і люди природно шукають у вас лідера.' },
    fr: { name: "Le Cadre", desc: "Vous projetez une image d'autorité, de compétence et de succès. Les autres vous voient comme capable, ambitieux et orienté vers les objectifs. Vous portez en vous de la confiance, et les gens vous voient naturellement comme un leader." },
    lt: { name: 'Vadovas', desc: 'Projektuojate autoriteto, kompetencijos ir sėkmės įvaizdį. Kiti jus mato kaip gabų, ambicingą ir tikslą iškeliantį. Laikotės pasitikėjimu, ir žmonės natūraliai ieško jūsų lyderystės.' },
  },
  9: {
    en: { name: 'The Wise', desc: 'You come across as someone of wisdom, tolerance and broad perspective. Others sense that you have lived deeply and arrived at a place of quiet acceptance — they find you inspiring and calming.' },
    ru: { name: 'Мудрый', desc: 'Вы производите впечатление человека, обладающего мудростью, терпимостью и широким кругозором. Другие чувствуют, что вы прожили глубоко и пришли к месту спокойного принятия — они находят вас вдохновляющим.' },
    uk: { name: 'Мудрий', desc: 'Ви справляєте враження людини з мудрістю, терпимістю та широким кругозором. Інші відчувають, що ви прожили глибоко та прийшли до стану спокійного прийняття — вони знаходять вас надихаючим.' },
    fr: { name: 'Le Sage', desc: "Vous vous montrez comme quelqu'un de sage, tolérant et avec une perspective large. Les autres sentent que vous avez vécu profondément et atteint un lieu d'acceptation tranquille — ils vous trouvent inspirant." },
    lt: { name: 'Išmintingas', desc: 'Atrodo, kad esate žmogus su išmintimi, tolerancija ir plačia perspektyva. Kiti jaučia, kad giliai gyvenote ir atėjote į ramaus priėmimo vietą — jie jus laiko įkvepiančiu.' },
  },
  11: {
    en: { name: 'Master Idealist', desc: 'You project an otherworldly sensitivity and spiritual presence. Others sense immediately that you operate on a higher frequency — you inspire without even trying, drawing people to your light.' },
    ru: { name: 'Мастер-идеалист', desc: 'Вы проецируете неземную чувствительность и духовное присутствие. Другие сразу чувствуют, что вы работаете на более высокой частоте — вы вдохновляете, не прилагая усилий.' },
    uk: { name: 'Майстер-ідеаліст', desc: 'Ви проектуєте неземну чутливість та духовну присутність. Інші одразу відчувають, що ви працюєте на більш високій частоті — ви надихаєте, не докладаючи зусиль.' },
    fr: { name: "Maître Idéaliste", desc: "Vous projetez une sensibilité d'un autre monde et une présence spirituelle. Les autres sentent immédiatement que vous opérez à une fréquence plus élevée — vous inspirez sans même essayer." },
    lt: { name: 'Meistro idealistas', desc: 'Projektuojate antgamtinį jautrumą ir dvasinę buvimą. Kiti iš karto jaučia, kad veikiate aukštesniu dažniu — įkvepiate net nesistengdami, traukdami žmones prie savo šviesos.' },
  },
  22: {
    en: { name: 'Master Doer', desc: 'You project an image of extraordinary capability and quiet power. Others see you as someone who can achieve anything — visionary yet practical, inspiring trust and confidence in those around you.' },
    ru: { name: 'Мастер-деятель', desc: 'Вы проецируете образ исключительных способностей и тихой силы. Другие видят вас как человека, способного достичь всего — визионерского, но практичного, внушающего доверие окружающим.' },
    uk: { name: 'Майстер-діяч', desc: 'Ви проектуєте образ виняткових здібностей та тихої сили. Інші бачать вас як людину, здатну досягти всього — візіонерську, але практичну, що вселяє довіру оточуючим.' },
    fr: { name: "Maître Réalisateur", desc: "Vous projetez une image de capacité extraordinaire et de pouvoir discret. Les autres vous voient comme quelqu'un qui peut tout réaliser — visionnaire mais pratique, inspirant confiance." },
    lt: { name: 'Meistro veikėjas', desc: 'Projektuojate nepaprastų gebėjimų ir tylos galios įvaizdį. Kiti jus mato kaip žmogų, kuris gali pasiekti viską — visionierišką, bet praktišką, įkvepiančiu pasitikėjimą aplinkinius.' },
  },
  33: {
    en: { name: 'Master Mentor', desc: 'You radiate a profound warmth and wisdom. Others immediately feel safe, seen and uplifted in your presence. You have a rare quality that makes people feel they are becoming their best selves simply by knowing you.' },
    ru: { name: 'Мастер-наставник', desc: 'Вы излучаете глубокое тепло и мудрость. Другие сразу чувствуют себя в безопасности, замеченными и возвышенными в вашем присутствии. У вас редкое качество — рядом с вами люди чувствуют себя лучшими.' },
    uk: { name: 'Майстер-наставник', desc: 'Ви випромінюєте глибоке тепло та мудрість. Інші одразу відчувають себе в безпеці, поміченими та піднятими у вашій присутності. У вас рідкісна якість — поруч з вами люди відчувають себе кращими.' },
    fr: { name: "Maître Mentor", desc: "Vous rayonnez une chaleur et une sagesse profondes. Les autres se sentent immédiatement en sécurité, vus et élevés en votre présence. Vous avez cette qualité rare qui fait que les gens se sentent meilleurs en vous connaissant." },
    lt: { name: 'Meistro mentorius', desc: 'Spinduliuojate giliu šilumu ir išmintimi. Kiti iš karto jaučiasi saugiai, pastebėti ir pakelti jūsų buvimo. Turite retą savybę, dėl kurios žmonės jaučiasi tampantys geriausiais tiesiog jus pažindami.' },
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

const LATIN_VOWELS = new Set(['A','E','I','O','U','Y']);
const CYR_VOWELS = new Set(['А','Е','Ё','И','О','У','Ы','Э','Ю','Я','І','Ї','Є']);

function digitSum(n: number): number {
  return String(Math.abs(n)).split('').reduce((s, d) => s + parseInt(d, 10), 0);
}

function reduce(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n <= 9) return n;
  return reduce(digitSum(n));
}

function calcPersonalityNumber(name: string): number | null {
  const consonants = name.toUpperCase().split('').filter(c => {
    if (PYTHAGOREAN[c] === undefined) return false;
    return !LATIN_VOWELS.has(c) && !CYR_VOWELS.has(c);
  });
  if (consonants.length === 0) return null;
  const total = consonants.reduce((s, c) => s + (PYTHAGOREAN[c] ?? 0), 0);
  return total === 0 ? null : reduce(total);
}

export default function PersonalityNumberCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [name, setName] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!name.trim()) { setError(t.errEmpty); setResult(null); return; }
    const n = calcPersonalityNumber(name.trim());
    if (n === null) { setError(t.errNoConsonants); setResult(null); return; }
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
