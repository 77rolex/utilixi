'use client';

import { useState } from 'react';
import styles from './AngelNumberCalculator.module.scss';

type Props = { locale: string };

const T: Record<string, {
  label: string; btn: string; placeholder: string;
  errEmpty: string; errInvalid: string;
  meaningLabel: string; baseLabel: string; baseNote: string;
}> = {
  en: {
    label: 'Enter a number (e.g. 111, 444, 1212)', btn: 'Reveal Angel Message', placeholder: '111',
    errEmpty: 'Please enter a number.', errInvalid: 'Enter a number between 1 and 9999.',
    meaningLabel: 'Angel message', baseLabel: 'Core digit meaning',
    baseNote: 'This number is not in the angel number dictionary. Showing its core digit meaning instead.',
  },
  ru: {
    label: 'Введите число (например, 111, 444, 1212)', btn: 'Узнать послание ангела', placeholder: '111',
    errEmpty: 'Введите число.', errInvalid: 'Введите число от 1 до 9999.',
    meaningLabel: 'Послание ангела', baseLabel: 'Значение основной цифры',
    baseNote: 'Это число отсутствует в словаре ангельских чисел. Показываем значение основной цифры.',
  },
  uk: {
    label: 'Введіть число (наприклад, 111, 444, 1212)', btn: 'Дізнатися послання ангела', placeholder: '111',
    errEmpty: 'Введіть число.', errInvalid: 'Введіть число від 1 до 9999.',
    meaningLabel: 'Послання ангела', baseLabel: 'Значення основної цифри',
    baseNote: 'Це число відсутнє у словнику ангельських чисел. Показуємо значення основної цифри.',
  },
  fr: {
    label: 'Entrez un nombre (ex. 111, 444, 1212)', btn: 'Révéler le message angélique', placeholder: '111',
    errEmpty: 'Veuillez entrer un nombre.', errInvalid: 'Entrez un nombre entre 1 et 9999.',
    meaningLabel: 'Message angélique', baseLabel: 'Signification du chiffre de base',
    baseNote: 'Ce nombre n\'est pas dans le dictionnaire des nombres angéliques. Affichage de la signification du chiffre de base.',
  },
  lt: {
    label: 'Įveskite skaičių (pvz. 111, 444, 1212)', btn: 'Atskleisti angelo žinią', placeholder: '111',
    errEmpty: 'Įveskite skaičių.', errInvalid: 'Įveskite skaičių nuo 1 iki 9999.',
    meaningLabel: 'Angelo žinia', baseLabel: 'Pagrindinio skaitmens reikšmė',
    baseNote: 'Šio skaičiaus nėra angelų skaičių žodyne. Rodoma pagrindinio skaitmens reikšmė.',
  },
};

type MeaningEntry = { title: string; emoji: string; meaning: string };

const ANGEL_NUMBERS: Record<string, Record<string | number, MeaningEntry>> = {
  en: {
    111: { title: 'Manifestation & New Beginnings', emoji: '✨', meaning: 'Your thoughts are manifesting rapidly right now. Stay focused on what you want, not what you fear. 111 is a powerful gateway number — the universe is listening, and your intentions are being amplified. This is a moment to set clear, positive intentions and trust that you are aligned with your higher purpose.' },
    222: { title: 'Balance & Trust', emoji: '⚖️', meaning: 'You are being asked to trust the process. 222 signals that everything is unfolding as it should — keep the faith even when you cannot see the full picture. This is a number of partnerships, harmony and divine timing. Be patient: what you have planted is growing beneath the surface.' },
    333: { title: 'Growth & Ascended Masters', emoji: '🔺', meaning: 'The ascended masters are near and supporting your growth. 333 is an invitation to expand — to create, to communicate and to step more fully into your authentic self. Your creativity is heightened, your intuition is sharp. Trust your inner voice and express yourself boldly.' },
    444: { title: 'Protection & Solid Foundation', emoji: '🛡️', meaning: 'Your angels are surrounding you with protection and love. 444 is one of the most reassuring angel numbers — it confirms that you are on the right path and that the foundations you are building are solid. Hard work is paying off. You are safe, supported and exactly where you need to be.' },
    555: { title: 'Major Change & Transformation', emoji: '🌀', meaning: 'A significant change is underway in your life. 555 signals transformation, transition and adventure. Let go of what no longer serves you and welcome the new. This shift may feel unsettling, but it is aligned with your soul\'s growth. Embrace the unknown with curiosity rather than fear.' },
    666: { title: 'Rebalance & Mind-Body-Spirit', emoji: '🔄', meaning: '666 is often misunderstood — it is not a warning but an invitation to rebalance. Your thoughts may be dwelling too heavily on fears or material concerns. Shift your focus back to love, gratitude and spiritual connection. This number asks you to integrate the physical and spiritual dimensions of your life.' },
    777: { title: 'Spiritual Luck & Divine Alignment', emoji: '🍀', meaning: 'You are in a state of profound spiritual alignment. 777 is the luckiest spiritual number — it signals that you are on a path of spiritual growth, inner wisdom and divine reward. Good fortune is flowing your way. Continue following your intuition and trust that the universe is conspiring in your favour.' },
    888: { title: 'Abundance & Karmic Reward', emoji: '💰', meaning: 'Abundance is flowing toward you — financial, spiritual and energetic. 888 is the number of infinite flow and karmic reward. The energy you have invested is returning to you multiplied. This is a powerful time to attract prosperity by maintaining a mindset of gratitude and open receptivity.' },
    999: { title: 'Completion & New Cycle', emoji: '🔚', meaning: 'A significant chapter of your life is coming to a close. 999 asks you to let go gracefully and make space for what is coming. This is not an ending to mourn but a completion to celebrate — you have grown, you have learned and you are ready for the next level of your journey.' },
    1111: { title: 'Spiritual Gateway & Wake-Up Call', emoji: '🌟', meaning: 'You are at a powerful spiritual gateway. 1111 is the master manifestation number — a direct line between your thoughts and the universe. Many experience 1111 as a wake-up call to their spiritual path. Your intuition is heightened, synchronicities are increasing, and the veil between the physical and spiritual is thin. Pay attention.' },
    2222: { title: 'Deep Trust & Divine Timing', emoji: '🕊️', meaning: 'Everything is happening in perfect divine timing. 2222 amplifies the message of 222 — trust, patience and deep faith are called for. Your prayers and intentions have been heard. The universe is working behind the scenes on your behalf. Do not rush, do not doubt; what is meant for you is on its way.' },
    3333: { title: 'Amplified Creativity', emoji: '🎨', meaning: 'The creative and spiritual energies of 333 are powerfully amplified. You are in a period of exceptional creative flow and spiritual support. This is an ideal time to create, teach, write or express your gifts in the world. The ascended masters are right beside you, cheering you forward.' },
    4444: { title: 'Unshakeable Foundation', emoji: '🏛️', meaning: 'The protective energy of 444 is powerfully amplified. You are surrounded by angels and are being supported on the deepest level. The hard work you have invested in building your foundation will bear lasting fruit. Trust the structures you have created — they are stronger than you know.' },
    5555: { title: 'Radical Transformation', emoji: '🦋', meaning: 'An extraordinary metamorphosis is underway. 5555 amplifies the energy of change — this is not a small adjustment but a complete shift in the direction of your life. Surrender to it. The old version of yourself is giving way to a freer, more authentic one. This is the most exciting kind of change there is.' },
    7777: { title: 'Extraordinary Spiritual Mastery', emoji: '🌈', meaning: 'You are on the path of spiritual mastery. 7777 is extraordinarily rare and powerful — it signals that you are deeply aligned with your highest self and that divine fortune is fully supporting your journey. Your intuitive gifts are at their peak. Share your wisdom, for you have much to offer.' },
    8888: { title: 'Maximum Abundance & Infinite Flow', emoji: '♾️', meaning: 'The infinite loop of abundance is fully activated in your life. 8888 is the ultimate prosperity number — it signals that karmic cycles are completing and that financial and energetic abundance is flowing in great measure. Receive with grace and circulate generously.' },
    9999: { title: 'Ultimate Completion & Rebirth', emoji: '🔮', meaning: 'A profound completion is occurring at the deepest level of your soul\'s journey. 9999 marks the end of a major karmic cycle. You are being called to release the past entirely and step into a radically new chapter with open hands and an open heart. A spiritual rebirth awaits.' },
    1212: { title: 'Stay Positive & Trust Your Path', emoji: '🌺', meaning: '1212 is a reminder to stay positive and maintain your vision. It combines the pioneering energy of 1 with the balance of 2, signalling that your thoughts and actions are in alignment. You are co-creating your reality moment by moment — keep your vibration high and your intentions clear.' },
    1234: { title: 'Step-by-Step Progress', emoji: '👣', meaning: '1234 is a sequential number of natural progression. It tells you that you are moving forward in exactly the right way — one step at a time. Do not try to skip steps or rush ahead. Trust the process, honour the natural flow and know that each step is preparing you for the next.' },
    1010: { title: 'New Beginnings & Spiritual Completion', emoji: '⭕', meaning: '1010 combines the energy of new beginnings (1) with divine completion (0). It signals that you are entering a new cycle with strong spiritual support behind you. Trust the divine plan, let go of the old and step boldly into the blank canvas that lies ahead.' },
    1: { title: 'New Beginnings & Leadership', emoji: '🔥', meaning: 'The energy of 1 is about new starts, independence and leadership. It represents the spark of creation, the will to forge a new path and the courage to stand alone. When 1 appears, you are being called to initiate, to take the lead and to trust your own voice above all others.' },
    2: { title: 'Balance & Partnership', emoji: '☯️', meaning: 'The energy of 2 is about duality, harmony and cooperation. It represents the power of partnership, the beauty of balance and the wisdom of patience. When 2 appears, you are being guided toward unity — with others, with your own contrasting feelings and with the natural rhythms of life.' },
    3: { title: 'Creativity & Expression', emoji: '🎭', meaning: 'The energy of 3 is about creative expression, joy and communication. It represents the Trinity — mind, body and spirit in alignment. When 3 appears, you are being encouraged to express yourself freely, to share your gifts with the world and to approach life with playfulness and optimism.' },
    4: { title: 'Stability & Hard Work', emoji: '🏗️', meaning: 'The energy of 4 is about building, stability and dedication. It represents the four elements and the solid structure of the physical world. When 4 appears, you are being guided to lay strong foundations, commit to your work and trust that disciplined effort will yield lasting results.' },
    5: { title: 'Freedom & Change', emoji: '🌊', meaning: 'The energy of 5 is about freedom, adventure and transformation. It represents the five senses and the dynamic, ever-changing nature of life. When 5 appears, you are being called to break free from limitations, embrace change and open yourself to the full richness of experience.' },
    6: { title: 'Love & Responsibility', emoji: '💚', meaning: 'The energy of 6 is about love, home and responsibility. It represents nurturing, service and the deep satisfaction of caring for others. When 6 appears, you are being called back to what truly matters — your relationships, your home and your responsibilities to those you love.' },
    7: { title: 'Wisdom & Spiritual Insight', emoji: '🔮', meaning: 'The energy of 7 is about spiritual depth, inner wisdom and the search for truth. It is the most mystical of all numbers. When 7 appears, you are being guided inward — to meditate, to reflect and to trust the profound knowing that lives within you beyond logic or reason.' },
    8: { title: 'Power & Abundance', emoji: '💎', meaning: 'The energy of 8 is about power, ambition and material abundance. It represents the flow of energy between the spiritual and material worlds. When 8 appears, you are being reminded of your capacity to create wealth, to wield power wisely and to achieve great things through focused intention.' },
    9: { title: 'Completion & Compassion', emoji: '🌍', meaning: 'The energy of 9 is about completion, wisdom and humanitarian service. It represents the culmination of all that has come before and the call to give back. When 9 appears, you are nearing the completion of a cycle and being invited to share your accumulated wisdom with the world.' },
  },
  ru: {
    111: { title: 'Манифестация и новые начала', emoji: '✨', meaning: 'Ваши мысли сейчас быстро материализуются. Сосредоточьтесь на том, чего вы хотите, а не на том, чего боитесь. 111 — мощное число-портал: вселенная слушает, и ваши намерения усиливаются. Это момент для чётких, позитивных намерений.' },
    222: { title: 'Равновесие и доверие', emoji: '⚖️', meaning: 'Вам предлагается довериться процессу. 222 сигнализирует, что всё разворачивается так, как должно, — сохраняйте веру, даже когда не видите полной картины. Это число партнёрства, гармонии и Божественного времени. То, что вы посеяли, растёт.' },
    333: { title: 'Рост и Вознёсшиеся Мастера', emoji: '🔺', meaning: 'Вознёсшиеся Мастера рядом и поддерживают ваш рост. 333 — приглашение расширяться: творить, общаться и более полно воплощать своё подлинное «я». Ваша интуиция обострена, доверяйте внутреннему голосу.' },
    444: { title: 'Защита и прочный фундамент', emoji: '🛡️', meaning: 'Ваши ангелы окружают вас защитой и любовью. 444 подтверждает, что вы на верном пути, а фундамент, который вы строите, прочен. Ваши усилия приносят плоды. Вы в безопасности и именно там, где нужно.' },
    555: { title: 'Перемены и трансформация', emoji: '🌀', meaning: 'В вашей жизни происходят значительные перемены. 555 сигнализирует о трансформации и новых приключениях. Отпустите то, что больше не служит вам, и приветствуйте новое. Эти перемены согласуются с ростом вашей души.' },
    666: { title: 'Восстановление равновесия', emoji: '🔄', meaning: '666 — не предупреждение, а приглашение восстановить равновесие. Ваши мысли могут слишком зацикливаться на страхах или материальных заботах. Верните фокус на любовь, благодарность и духовную связь.' },
    777: { title: 'Духовная удача и выравнивание', emoji: '🍀', meaning: 'Вы находитесь в состоянии глубокого духовного выравнивания. 777 — самое удачливое духовное число: вы на пути духовного роста, внутренней мудрости и Божественного вознаграждения. Продолжайте следовать своей интуиции.' },
    888: { title: 'Изобилие и кармическое вознаграждение', emoji: '💰', meaning: 'К вам течёт изобилие — финансовое, духовное и энергетическое. 888 — число бесконечного потока и кармического вознаграждения. Энергия, которую вы вложили, возвращается к вам умноженной.' },
    999: { title: 'Завершение и новый цикл', emoji: '🔚', meaning: 'Значительная глава вашей жизни подходит к концу. 999 просит вас отпустить с благодарностью и освободить пространство для нового. Это не конец для скорби, а завершение для празднования.' },
    1111: { title: 'Духовный портал и пробуждение', emoji: '🌟', meaning: 'Вы у мощного духовного портала. 1111 — главное число манифестации: прямая линия между вашими мыслями и вселенной. Ваша интуиция обострена, синхроничности учащаются. Обращайте внимание.' },
    2222: { title: 'Глубокое доверие и Божественное время', emoji: '🕊️', meaning: 'Всё происходит в совершенном Божественном времени. 2222 усиливает послание 222. Ваши молитвы услышаны. Вселенная работает за кулисами в вашу пользу. Не торопитесь, не сомневайтесь.' },
    3333: { title: 'Усиленное творчество', emoji: '🎨', meaning: 'Творческие и духовные энергии 333 мощно усилены. Вы в периоде исключительного творческого потока. Это идеальное время для создания, обучения, написания и выражения своих даров.' },
    4444: { title: 'Незыблемый фундамент', emoji: '🏛️', meaning: 'Защитная энергия 444 мощно усилена. Вы окружены ангелами и поддерживаетесь на глубочайшем уровне. Тяжёлая работа, вложенная в создание фундамента, принесёт долгосрочные плоды.' },
    5555: { title: 'Радикальная трансформация', emoji: '🦋', meaning: 'Происходит необычайный метаморфоз. 5555 усиливает энергию перемен — это не небольшая корректировка, а полный сдвиг в направлении вашей жизни. Ваша старая версия уступает место более свободной.' },
    7777: { title: 'Духовное мастерство', emoji: '🌈', meaning: 'Вы на пути духовного мастерства. 7777 — исключительно редкое и мощное число: вы глубоко согласованы с высшим «я», и Божественная удача полностью поддерживает ваш путь.' },
    8888: { title: 'Максимальное изобилие', emoji: '♾️', meaning: 'Бесконечный поток изобилия полностью активирован в вашей жизни. 8888 — высшее число процветания. Финансовое и энергетическое изобилие течёт в большой мере.' },
    9999: { title: 'Высшее завершение и перерождение', emoji: '🔮', meaning: 'Глубокое завершение происходит на глубочайшем уровне вашего духовного пути. 9999 отмечает конец главного кармического цикла. Вас призывают полностью отпустить прошлое.' },
    1212: { title: 'Оставайтесь позитивны', emoji: '🌺', meaning: '1212 — напоминание оставаться позитивным и поддерживать своё видение. Ваши мысли и действия согласованы. Вы создаёте свою реальность момент за моментом — держите вибрацию высокой.' },
    1234: { title: 'Прогресс шаг за шагом', emoji: '👣', meaning: '1234 — последовательное число естественного прогресса. Вы движетесь вперёд правильным образом — шаг за шагом. Не пытайтесь пропускать этапы. Доверяйте процессу и естественному потоку.' },
    1010: { title: 'Новые начала и духовное завершение', emoji: '⭕', meaning: '1010 сочетает энергию новых начал (1) с Божественным завершением (0). Вы вступаете в новый цикл с сильной духовной поддержкой. Отпустите старое и смело шагните вперёд.' },
    1: { title: 'Новые начала и лидерство', emoji: '🔥', meaning: 'Энергия 1 — о новых стартах, независимости и лидерстве. Это искра творения, воля прокладывать новый путь и смелость идти своей дорогой. Когда появляется 1, вас призывают инициировать и доверять своему голосу.' },
    2: { title: 'Равновесие и партнёрство', emoji: '☯️', meaning: 'Энергия 2 — о двойственности, гармонии и сотрудничестве. Она представляет силу партнёрства, красоту баланса и мудрость терпения. Когда появляется 2, вас ведут к единству.' },
    3: { title: 'Творчество и самовыражение', emoji: '🎭', meaning: 'Энергия 3 — о творческом самовыражении, радости и общении. Она представляет Троицу — разум, тело и дух в согласии. Когда появляется 3, вас поощряют выражать себя свободно.' },
    4: { title: 'Стабильность и труд', emoji: '🏗️', meaning: 'Энергия 4 — о строительстве, стабильности и преданности. Она представляет четыре элемента и прочную структуру. Когда появляется 4, вас ведут закладывать прочные основы.' },
    5: { title: 'Свобода и перемены', emoji: '🌊', meaning: 'Энергия 5 — о свободе, приключениях и трансформации. Она представляет пять чувств и динамичную природу жизни. Когда появляется 5, вас призывают освободиться от ограничений.' },
    6: { title: 'Любовь и ответственность', emoji: '💚', meaning: 'Энергия 6 — о любви, доме и ответственности. Она представляет заботу и служение. Когда появляется 6, вас призывают вернуться к тому, что действительно важно.' },
    7: { title: 'Мудрость и духовное прозрение', emoji: '🔮', meaning: 'Энергия 7 — о духовной глубине, внутренней мудрости и поиске истины. Это самое мистическое число. Когда появляется 7, вас ведут внутрь — медитировать, размышлять и доверять.' },
    8: { title: 'Сила и изобилие', emoji: '💎', meaning: 'Энергия 8 — о силе, амбициях и материальном изобилии. Она представляет поток энергии между духовным и материальным мирами. Когда появляется 8, вам напоминают о вашей способности создавать.' },
    9: { title: 'Завершение и сострадание', emoji: '🌍', meaning: 'Энергия 9 — о завершении, мудрости и гуманитарном служении. Она представляет кульминацию всего предыдущего и призыв отдавать. Когда появляется 9, вы близки к завершению цикла.' },
  },
};

// Copy en as fallback for uk, fr, lt (with locale-appropriate titles)
function getMeaning(num: number, locale: string): { entry: MeaningEntry; isExact: boolean } {
  const dict = ANGEL_NUMBERS[locale] ?? ANGEL_NUMBERS.en;
  const enDict = ANGEL_NUMBERS.en;

  if (dict[num]) return { entry: dict[num], isExact: true };
  if (enDict[num]) return { entry: enDict[num], isExact: true };

  // Reduce to single digit
  let n = num;
  while (n >= 10) {
    n = String(n).split('').reduce((a, c) => a + parseInt(c, 10), 0);
  }
  const base = dict[n] ?? enDict[n];
  return { entry: base, isExact: false };
}

export default function AngelNumberCalculator({ locale }: Props) {
  const t = T[locale] ?? T.en;
  const [input, setInput] = useState('');
  const [result, setResult] = useState<null | { num: number; entry: MeaningEntry; isExact: boolean }>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const num = parseInt(input, 10);
    if (!input.trim()) { setError(t.errEmpty); setResult(null); return; }
    if (isNaN(num) || num < 1 || num > 9999) { setError(t.errInvalid); setResult(null); return; }
    setError('');
    const { entry, isExact } = getMeaning(num, locale);
    setResult({ num, entry, isExact });
  };

  return (
    <div className={styles.calc}>
      <div className={styles.calc__field}>
        <label className={styles.calc__label}>{t.label}</label>
        <input
          type="number"
          className={styles.calc__input}
          placeholder={t.placeholder}
          value={input}
          min={1}
          max={9999}
          onChange={(e) => { setInput(e.target.value); setError(''); setResult(null); }}
          onKeyDown={(e) => e.key === 'Enter' && calculate()}
        />
      </div>
      <button className={styles.calc__btn} onClick={calculate}>{t.btn}</button>
      {error && <p className={styles.calc__error}>{error}</p>}
      {result && (
        <div className={styles.calc__result}>
          <div className={styles.calc__num}>{result.entry.emoji} {result.num}</div>
          {!result.isExact && <p className={styles.calc__base_note}>{t.baseNote}</p>}
          <h3 className={styles.calc__title}>{result.entry.title}</h3>
          <p className={styles.calc__meaning}>{result.entry.meaning}</p>
        </div>
      )}
    </div>
  );
}
