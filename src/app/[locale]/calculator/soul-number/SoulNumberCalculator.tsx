'use client';

import { useState } from 'react';
import styles from './SoulNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; hint: string; btn: string;
  masterBadge: string; errEmpty: string; errNoVowels: string;
}> = {
  en: { label: 'Full name', hint: 'Only vowels are used in the calculation', btn: 'Calculate Soul Number', masterBadge: 'Master Number', errEmpty: 'Please enter your name.', errNoVowels: 'No vowels found in the name.' },
  ru: { label: 'Полное имя', hint: 'Для расчёта используются только гласные буквы', btn: 'Рассчитать число души', masterBadge: 'Мастер-число', errEmpty: 'Введите имя.', errNoVowels: 'В имени не найдено гласных букв.' },
  uk: { label: 'Повне ім\'я', hint: 'Для розрахунку використовуються лише голосні літери', btn: 'Розрахувати число душі', masterBadge: 'Майстер-число', errEmpty: 'Введіть ім\'я.', errNoVowels: 'У імені не знайдено голосних літер.' },
  fr: { label: 'Nom complet', hint: 'Seules les voyelles sont utilisées dans le calcul', btn: 'Calculer le nombre de l\'âme', masterBadge: 'Nombre Maître', errEmpty: 'Veuillez entrer votre nom.', errNoVowels: 'Aucune voyelle trouvée dans le nom.' },
  lt: { label: 'Pilnas vardas', hint: 'Skaičiavimui naudojami tik balsiai', btn: 'Apskaičiuoti sielos numerį', masterBadge: 'Meistro skaičius', errEmpty: 'Įveskite vardą.', errNoVowels: 'Varde nerasta balsių.' },
};

const NUM_INFO: Record<number, Record<string, { name: string; desc: string }>> = {
  1: {
    en: { name: 'Soul of the Pioneer', desc: 'Deep within, you yearn for independence and self-expression. Your inner drive is to forge your own path and be recognised as a unique individual.' },
    ru: { name: 'Душа первопроходца', desc: 'Глубоко внутри вы жаждете независимости и самовыражения. Ваш внутренний порыв — прокладывать собственный путь и быть признанным как уникальная личность.' },
    uk: { name: 'Душа першопрохідця', desc: 'Глибоко в душі ви прагнете незалежності та самовираження. Ваш внутрішній поклик — прокладати власний шлях та бути визнаним як унікальна особистість.' },
    fr: { name: "Âme du Pionnier", desc: "Au plus profond de vous, vous aspirez à l'indépendance et à l'expression de soi. Votre moteur intérieur est de tracer votre propre chemin et d'être reconnu comme un individu unique." },
    lt: { name: 'Pradininko siela', desc: 'Giliai viduje trokštate nepriklausomybės ir savęs raiškos. Jūsų vidinis poreikis — nutiesti savo kelią ir būti pripažintam kaip unikalus individas.' },
  },
  2: {
    en: { name: 'Soul of the Companion', desc: 'At your core, you crave love, partnership and deep emotional connections. You are most fulfilled when working in harmony with others and feeling truly understood.' },
    ru: { name: 'Душа спутника', desc: 'В глубине души вы жаждете любви, партнёрства и глубоких эмоциональных связей. Вы наиболее счастливы, когда работаете в гармонии с другими и чувствуете себя по-настоящему понятым.' },
    uk: { name: 'Душа супутника', desc: 'У глибині душі ви прагнете любові, партнерства та глибоких емоційних зв\'язків. Ви найщасливіші, коли працюєте в гармонії з іншими та відчуваєте себе по-справжньому зрозумілим.' },
    fr: { name: "Âme du Compagnon", desc: "Au fond de vous, vous aspirez à l'amour, au partenariat et aux liens émotionnels profonds. Vous vous épanouissez en harmonie avec les autres et en vous sentant vraiment compris." },
    lt: { name: 'Palydovo siela', desc: 'Savo esme trokštate meilės, partnerystės ir gilių emocinių ryšių. Esate laimingiausias, kai dirbate harmonijoje su kitais ir jaučiatės tikrai suprastas.' },
  },
  3: {
    en: { name: 'Soul of the Artist', desc: 'Your inner self longs for creative expression and joy. You find your deepest satisfaction through art, communication and sharing your unique vision of beauty with the world.' },
    ru: { name: 'Душа художника', desc: 'Ваше внутреннее «я» жаждет творческого самовыражения и радости. Вы находите глубочайшее удовлетворение через искусство, общение и обмен своим уникальным видением красоты.' },
    uk: { name: 'Душа художника', desc: 'Ваше внутрішнє «я» прагне творчого самовираження та радості. Ви знаходите глибоке задоволення через мистецтво, спілкування та ділення своїм унікальним баченням краси.' },
    fr: { name: "Âme de l'Artiste", desc: "Votre être intérieur aspire à l'expression créative et à la joie. Vous trouvez votre satisfaction la plus profonde à travers l'art, la communication et le partage de votre vision unique." },
    lt: { name: 'Menininko siela', desc: 'Jūsų vidinė esybė ilgisi kūrybinės raiškos ir džiaugsmo. Giliai patenkinti jaučiatės per meną, bendravimą ir savo unikalios grožio vizijos dalijimąsi su pasauliu.' },
  },
  4: {
    en: { name: 'Soul of the Architect', desc: 'Your deepest desire is for security, order and a sense of solid achievement. You find peace in building something lasting and knowing that your efforts truly matter.' },
    ru: { name: 'Душа архитектора', desc: 'Ваше глубочайшее желание — безопасность, порядок и чувство прочного достижения. Вы находите покой в создании чего-то долговечного и осознании, что ваши усилия действительно важны.' },
    uk: { name: 'Душа архітектора', desc: 'Ваше найглибше бажання — безпека, порядок і відчуття міцного досягнення. Ви знаходите спокій у побудові чогось довговічного та усвідомленні, що ваші зусилля справді важливі.' },
    fr: { name: "Âme de l'Architecte", desc: "Votre désir le plus profond est la sécurité, l'ordre et le sentiment d'une réalisation solide. Vous trouvez la paix en construisant quelque chose de durable et en sachant que vos efforts comptent vraiment." },
    lt: { name: 'Architekto siela', desc: 'Jūsų giliausias noras yra saugumas, tvarka ir tvirto pasiekimo jausmas. Ramybę randatė kurdami kažką ilgalaikį ir žinodami, kad jūsų pastangos tikrai svarbios.' },
  },
  5: {
    en: { name: 'Soul of the Adventurer', desc: 'At your core, you crave freedom, variety and new experiences. You feel most alive when you are moving, exploring and embracing the unexpected.' },
    ru: { name: 'Душа авантюриста', desc: 'В глубине души вы жаждете свободы, разнообразия и новых впечатлений. Вы чувствуете себя наиболее живым, когда двигаетесь, исследуете и принимаете неожиданное.' },
    uk: { name: 'Душа авантюриста', desc: 'У глибині душі ви прагнете свободи, різноманітності та нових вражень. Ви відчуваєте себе найбільш живим, коли рухаєтеся, досліджуєте та приймаєте несподіване.' },
    fr: { name: "Âme de l'Aventurier", desc: "Au fond de vous, vous aspirez à la liberté, à la variété et à de nouvelles expériences. Vous vous sentez le plus vivant quand vous bougez, explorez et embrassez l'inattendu." },
    lt: { name: 'Nuotykių ieškotojo siela', desc: 'Savo esme trokštate laisvės, įvairovės ir naujų išgyvenimų. Jaučiatės labiausiai gyvas, kai judatė, tyrinėjate ir priimatė netikėtumą.' },
  },
  6: {
    en: { name: 'Soul of the Healer', desc: 'Your deepest motivation is to love and be loved. You feel most fulfilled when caring for others, creating a beautiful home or healing those who are hurting.' },
    ru: { name: 'Душа целителя', desc: 'Ваша глубочайшая мотивация — любить и быть любимым. Вы чувствуете себя наиболее исполненным, когда заботитесь о других, создаёте красивый дом или исцеляете тех, кто страдает.' },
    uk: { name: 'Душа цілителя', desc: 'Ваша найглибша мотивація — любити та бути коханим. Ви почуваєтеся найбільш реалізованим, коли дбаєте про інших, створюєте красивий дім або зцілюєте тих, хто страждає.' },
    fr: { name: "Âme du Guérisseur", desc: "Votre motivation la plus profonde est d'aimer et d'être aimé. Vous vous sentez le plus épanoui en prenant soin des autres, en créant un beau foyer ou en guérissant ceux qui souffrent." },
    lt: { name: 'Gydytojo siela', desc: 'Jūsų giliausias motyvacija — mylėti ir būti mylimam. Jaučiatės labiausiai išpildytas, kai rūpinatės kitais, kuriate gražius namus ar gydatė tuos, kurie kenčia.' },
  },
  7: {
    en: { name: 'Soul of the Mystic', desc: 'Within, you seek truth, solitude and a deeper understanding of the universe. You are most at peace when you can explore the spiritual and intellectual dimensions of life.' },
    ru: { name: 'Душа мистика', desc: 'Внутри вы ищете истину, уединение и более глубокое понимание вселенной. Вы наиболее умиротворены, когда можете исследовать духовные и интеллектуальные измерения жизни.' },
    uk: { name: 'Душа містика', desc: 'Всередині ви шукаєте істину, усамітнення та глибше розуміння всесвіту. Ви найспокійніші, коли можете досліджувати духовні та інтелектуальні виміри життя.' },
    fr: { name: "Âme du Mystique", desc: "En vous, vous cherchez la vérité, la solitude et une compréhension plus profonde de l'univers. Vous êtes le plus en paix quand vous pouvez explorer les dimensions spirituelles de la vie." },
    lt: { name: 'Mistiko siela', desc: 'Viduje ieškotė tiesos, vienatvės ir gilesnio visatos supratimo. Esate labiausiai taikoje, kai galite tyrinėti dvasines ir intelektualines gyvenimo dimensijas.' },
  },
  8: {
    en: { name: 'Soul of the Achiever', desc: 'Your innermost desire is for success, recognition and material abundance. You are driven by the need to demonstrate your strength and leave a significant mark on the world.' },
    ru: { name: 'Душа достигатора', desc: 'Ваше самое заветное желание — успех, признание и материальное изобилие. Вами движет потребность продемонстрировать свою силу и оставить значительный след в мире.' },
    uk: { name: 'Душа досягатора', desc: 'Ваше найзаповітніше бажання — успіх, визнання та матеріальне достаток. Вами рухає потреба продемонструвати свою силу та залишити значний слід у світі.' },
    fr: { name: "Âme du Réalisateur", desc: "Votre désir le plus profond est le succès, la reconnaissance et l'abondance matérielle. Vous êtes mû par le besoin de démontrer votre force et de laisser une marque significative dans le monde." },
    lt: { name: 'Pasiekėjo siela', desc: 'Jūsų giliausias noras yra sėkmė, pripažinimas ir materialinė gausa. Jus varo poreikis parodyti savo stiprybę ir palikti reikšmingą pėdsaką pasaulyje.' },
  },
  9: {
    en: { name: 'Soul of the Sage', desc: 'Your deepest desire is to serve a higher purpose. You long to give, inspire and leave the world a better place through the wisdom and compassion you have gained in this lifetime.' },
    ru: { name: 'Душа мудреца', desc: 'Ваше глубочайшее желание — служить более высокой цели. Вы стремитесь отдавать, вдохновлять и оставить мир лучшим местом с помощью мудрости и сострадания, которые вы обрели.' },
    uk: { name: 'Душа мудреця', desc: 'Ваше найглибше бажання — служити вищій меті. Ви прагнете давати, надихати та залишити світ кращим місцем за допомогою мудрості та співчуття, які ви здобули.' },
    fr: { name: "Âme du Sage", desc: "Votre désir le plus profond est de servir un but supérieur. Vous aspirez à donner, inspirer et laisser le monde meilleur grâce à la sagesse et à la compassion acquises dans cette vie." },
    lt: { name: 'Išminčiaus siela', desc: 'Jūsų giliausias noras yra tarnauti aukštesniam tikslui. Trokštate duoti, įkvėpti ir palikti pasaulį geresnę vietą per išmintį ir užuojautą, kurią įgijote šiame gyvenime.' },
  },
  11: {
    en: { name: 'Master Soul of Illumination', desc: 'Your soul\'s deepest yearning is for spiritual connection and to be a light for others. This master number soul is called to inspire, enlighten and raise the vibration of all around you.' },
    ru: { name: 'Мастер-душа просветления', desc: 'Глубочайшее стремление вашей души — духовная связь и быть светом для других. Эта душа мастер-числа призвана вдохновлять, просвещать и поднимать вибрацию всех вокруг.' },
    uk: { name: 'Майстер-душа просвітлення', desc: 'Найглибше прагнення вашої душі — духовний зв\'язок та бути світлом для інших. Ця душа майстер-числа покликана надихати, просвітлювати та піднімати вібрацію всіх навколо.' },
    fr: { name: "Âme Maître de l'Illumination", desc: "L'aspiration la plus profonde de votre âme est la connexion spirituelle et être une lumière pour les autres. Cette âme à nombre maître est appelée à inspirer et illuminer." },
    lt: { name: 'Meistro apšvietimo siela', desc: 'Giliausias jūsų sielos troškimas yra dvasinis ryšys ir būti šviesa kitiems. Ši meistro skaičiaus siela pašaukta įkvėpti, apšviesti ir kelti visų aplinkinių vibraciją.' },
  },
  22: {
    en: { name: 'Master Soul of Creation', desc: 'Your soul seeks to manifest extraordinary visions into reality. As a master soul, you carry the potential for world-changing achievement and a deep desire to build something truly great.' },
    ru: { name: 'Мастер-душа творения', desc: 'Ваша душа стремится воплощать необыкновенные видения в реальность. Как душа мастер-числа, вы несёте потенциал для меняющих мир достижений и глубокое желание построить что-то по-настоящему великое.' },
    uk: { name: 'Майстер-душа творення', desc: 'Ваша душа прагне втілювати надзвичайні бачення у реальність. Як душа майстер-числа, ви несете потенціал для революційних досягнень та глибоке бажання збудувати щось справді велике.' },
    fr: { name: "Âme Maître de la Création", desc: "Votre âme cherche à manifester des visions extraordinaires en réalité. En tant qu'âme maître, vous portez le potentiel de réalisations qui changent le monde et le désir de construire quelque chose de vraiment grand." },
    lt: { name: 'Meistro kūrybos siela', desc: 'Jūsų siela siekia pasireikšti neeilinėmis vizijomis į realybę. Kaip meistro siela, nešiate pasaulio keitimo pasiekimų potencialą ir gilų norą sukurti kažką tikrai didingo.' },
  },
  33: {
    en: { name: 'Master Soul of Love', desc: 'Your soul\'s ultimate purpose is unconditional love and service. As the rarest master soul, you are called to embody Christ-like compassion and dedicate your life to the healing of the world.' },
    ru: { name: 'Мастер-душа любви', desc: 'Высшее предназначение вашей души — безусловная любовь и служение. Как самая редкая душа мастер-числа, вы призваны воплощать христоподобное сострадание и посвятить жизнь исцелению мира.' },
    uk: { name: 'Майстер-душа любові', desc: 'Найвище призначення вашої душі — безумовна любов та служіння. Як найрідкісніша душа майстер-числа, ви покликані втілювати христоподібне співчуття та присвятити життя зціленню світу.' },
    fr: { name: "Âme Maître de l'Amour", desc: "L'ultime vocation de votre âme est l'amour inconditionnel et le service. En tant que l'âme maître la plus rare, vous êtes appelé à incarner une compassion christique et à dédier votre vie à la guérison du monde." },
    lt: { name: 'Meistro meilės siela', desc: 'Aukščiausias jūsų sielos tikslas yra besąlyginė meilė ir tarnyba. Kaip rečiausia meistro siela, esate pašauktas įkūnyti kristišką užuojautą ir skirti savo gyvenimą pasaulio gydymui.' },
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

function calcSoulNumber(name: string): number | null {
  const vowels = name.toUpperCase().split('').filter(c => LATIN_VOWELS.has(c) || CYR_VOWELS.has(c));
  if (vowels.length === 0) return null;
  const total = vowels.reduce((s, c) => s + (PYTHAGOREAN[c] ?? 0), 0);
  return total === 0 ? null : reduce(total);
}

export default function SoulNumberCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [name, setName] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    if (!name.trim()) { setError(t.errEmpty); setResult(null); return; }
    const n = calcSoulNumber(name.trim());
    if (n === null) { setError(t.errNoVowels); setResult(null); return; }
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
