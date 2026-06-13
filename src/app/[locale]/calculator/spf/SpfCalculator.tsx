'use client';
import { useState } from 'react';
import styles from './SpfCalculator.module.scss';

const T: Record<string, {
  skinType: string; uvIndex: string; activity: string; spfLabel: string;
  skinI: string; skinII: string; skinIII: string; skinIV: string; skinV: string; skinVI: string;
  uvLow: string; uvMod: string; uvHigh: string; uvVeryHigh: string; uvExtreme: string;
  actNormal: string; actOutdoor: string; actWater: string;
  calculate: string;
  protectedTime: string; reapply: string; reapplyNote: string; waterNote: string;
  tip1: string; tip2: string; tip3: string; tip4: string;
  uvHint: string; error: string;
}> = {
  en: { skinType: 'Skin Type (Fitzpatrick Scale)', uvIndex: 'UV Index', activity: 'Activity', spfLabel: 'SPF Value', skinI: 'Type I — Very fair, always burns', skinII: 'Type II — Fair, usually burns', skinIII: 'Type III — Medium, sometimes burns', skinIV: 'Type IV — Olive, rarely burns', skinV: 'Type V — Brown, very rarely burns', skinVI: 'Type VI — Dark, almost never burns', uvLow: 'Low (1–2)', uvMod: 'Moderate (3–5)', uvHigh: 'High (6–7)', uvVeryHigh: 'Very High (8–10)', uvExtreme: 'Extreme (11+)', actNormal: 'Normal outdoor', actOutdoor: 'Sports / hiking', actWater: 'Swimming / beach', calculate: 'Calculate Protection', protectedTime: 'Protected Time', reapply: 'Reapply every', reapplyNote: 'Regardless of SPF, reapply sunscreen every 2 hours.', waterNote: 'After swimming or sweating, reapply immediately.', tip1: 'Apply sunscreen 20–30 minutes before sun exposure.', tip2: 'Use at least 2mg/cm² (about 1 teaspoon for face + neck).', tip3: 'SPF 50+ blocks ~98% of UVB rays; SPF 30 blocks ~97%.', tip4: 'No sunscreen blocks 100% of UV — limit peak sun hours (10am–4pm).', uvHint: 'UV Index measures solar radiation intensity (1 = low, 11+ = extreme). Check your weather app or search "UV index [your city]" on Google.', error: 'Please select all options.' },
  ru: { skinType: 'Тип кожи (шкала Фицпатрика)', uvIndex: 'Индекс УФ', activity: 'Активность', spfLabel: 'Значение SPF', skinI: 'Тип I — Очень светлая, всегда горит', skinII: 'Тип II — Светлая, обычно горит', skinIII: 'Тип III — Средняя, иногда горит', skinIV: 'Тип IV — Смуглая, редко горит', skinV: 'Тип V — Тёмная, очень редко горит', skinVI: 'Тип VI — Очень тёмная, почти не горит', uvLow: 'Низкий (1–2)', uvMod: 'Умеренный (3–5)', uvHigh: 'Высокий (6–7)', uvVeryHigh: 'Очень высокий (8–10)', uvExtreme: 'Экстремальный (11+)', actNormal: 'Обычная прогулка', actOutdoor: 'Спорт / поход', actWater: 'Купание / пляж', calculate: 'Рассчитать защиту', protectedTime: 'Время защиты', reapply: 'Обновлять каждые', reapplyNote: 'Независимо от SPF обновляйте крем каждые 2 часа.', waterNote: 'После купания или потоотделения — нанести сразу.', tip1: 'Наносить за 20–30 минут до пребывания на солнце.', tip2: 'Используйте не менее 2 мг/см² (≈1 чайная ложка на лицо + шею).', tip3: 'SPF 50+ блокирует ~98% UVB; SPF 30 — ~97%.', tip4: 'Ни один крем не блокирует УФ полностью — избегайте солнца с 10 до 16 ч.', uvHint: 'Индекс УФ — интенсивность солнечного излучения (1 = низкий, 11+ = экстремальный). Найдите в приложении погоды или поищите «индекс УФ [ваш город]» в Google.', error: 'Выберите все параметры.' },
  uk: { skinType: 'Тип шкіри (шкала Фіцпатріка)', uvIndex: 'Індекс УФ', activity: 'Активність', spfLabel: 'Значення SPF', skinI: 'Тип I — Дуже світла, завжди горить', skinII: 'Тип II — Світла, зазвичай горить', skinIII: 'Тип III — Середня, іноді горить', skinIV: 'Тип IV — Смаглява, рідко горить', skinV: 'Тип V — Темна, дуже рідко горить', skinVI: 'Тип VI — Дуже темна, майже не горить', uvLow: 'Низький (1–2)', uvMod: 'Помірний (3–5)', uvHigh: 'Високий (6–7)', uvVeryHigh: 'Дуже високий (8–10)', uvExtreme: 'Екстремальний (11+)', actNormal: 'Звичайна прогулянка', actOutdoor: 'Спорт / похід', actWater: 'Купання / пляж', calculate: 'Розрахувати захист', protectedTime: 'Час захисту', reapply: 'Оновлювати кожні', reapplyNote: 'Незалежно від SPF оновлюйте крем кожні 2 години.', waterNote: 'Після купання або потовиділення — нанести одразу.', tip1: 'Наносити за 20–30 хвилин до перебування на сонці.', tip2: 'Використовуйте не менше 2 мг/см² (≈1 чайна ложка на обличчя + шию).', tip3: 'SPF 50+ блокує ~98% UVB; SPF 30 — ~97%.', tip4: 'Жоден крем не блокує УФ повністю — уникайте сонця з 10 до 16 год.', uvHint: 'Індекс УФ — інтенсивність сонячного випромінювання (1 = низький, 11+ = екстремальний). Перевірте в додатку погоди або пошукайте «індекс УФ [ваше місто]» в Google.', error: 'Виберіть усі параметри.' },
  fr: { skinType: 'Type de peau (Échelle de Fitzpatrick)', uvIndex: 'Indice UV', activity: 'Activité', spfLabel: 'Indice SPF', skinI: 'Type I — Très claire, brûle toujours', skinII: 'Type II — Claire, brûle souvent', skinIII: 'Type III — Moyenne, brûle parfois', skinIV: 'Type IV — Mate, brûle rarement', skinV: 'Type V — Foncée, brûle très rarement', skinVI: 'Type VI — Très foncée, ne brûle presque jamais', uvLow: 'Faible (1–2)', uvMod: 'Modéré (3–5)', uvHigh: 'Élevé (6–7)', uvVeryHigh: 'Très élevé (8–10)', uvExtreme: 'Extrême (11+)', actNormal: 'Sortie normale', actOutdoor: 'Sport / randonnée', actWater: 'Natation / plage', calculate: 'Calculer la protection', protectedTime: 'Temps de protection', reapply: 'Réappliquer toutes les', reapplyNote: 'Quel que soit le SPF, réappliquez toutes les 2 heures.', waterNote: 'Après la baignade ou la transpiration, réappliquez immédiatement.', tip1: 'Appliquez 20 à 30 minutes avant l\'exposition au soleil.', tip2: 'Utilisez au moins 2 mg/cm² (environ 1 cuillère à café pour visage + cou).', tip3: 'SPF 50+ bloque ~98% des UVB ; SPF 30 bloque ~97%.', tip4: 'Aucune crème ne bloque 100% des UV — évitez le soleil entre 10h et 16h.', uvHint: 'L\'indice UV mesure l\'intensité du rayonnement solaire (1 = faible, 11+ = extrême). Vérifiez votre app météo ou cherchez «indice UV [ville]» sur Google.', error: 'Veuillez sélectionner toutes les options.' },
  lt: { skinType: 'Odos tipas (Fitzpatrick skalė)', uvIndex: 'UV indeksas', activity: 'Veikla', spfLabel: 'SPF vertė', skinI: 'I tipas — labai šviesi, visada dega', skinII: 'II tipas — šviesi, dažnai dega', skinIII: 'III tipas — vidutinė, kartais dega', skinIV: 'IV tipas — tamsesnė, retai dega', skinV: 'V tipas — tamsi, labai retai dega', skinVI: 'VI tipas — labai tamsi, beveik nedega', uvLow: 'Žemas (1–2)', uvMod: 'Vidutinis (3–5)', uvHigh: 'Aukštas (6–7)', uvVeryHigh: 'Labai aukštas (8–10)', uvExtreme: 'Itin aukštas (11+)', actNormal: 'Įprasta lauko veikla', actOutdoor: 'Sportas / žygiai', actWater: 'Plaukimas / paplūdimys', calculate: 'Skaičiuoti apsaugą', protectedTime: 'Apsaugos laikas', reapply: 'Tepkite kas', reapplyNote: 'Nepriklausomai nuo SPF, tepkite kreną kas 2 valandas.', waterNote: 'Po plaukimo ar prakaitavimo tepkite iš karto.', tip1: 'Tepkite 20–30 minučių prieš saulės ekspoziciją.', tip2: 'Naudokite mažiausiai 2 mg/cm² (apie 1 arbatinį šaukštelį veidui + kaklui).', tip3: 'SPF 50+ blokuoja ~98% UVB; SPF 30 — ~97%.', tip4: 'Joks kremas neblokuoja 100% UV — venkite saulės 10–16 val.', uvHint: 'UV indeksas matuoja saulės radiacijos intensyvumą (1 = žemas, 11+ = ypač aukštas). Patikrinkite orų programėlėje arba ieškokite „UV indeksas [miestas]" Google.', error: 'Pasirinkite visus parametrus.' },
};

const SKIN_BASE: Record<number, number> = { 1: 10, 2: 15, 3: 20, 4: 30, 5: 45, 6: 60 };
const UV_FACTOR: Record<string, number> = { low: 1.5, mod: 1.0, high: 0.7, veryhigh: 0.5, extreme: 0.4 };
const ACT_FACTOR: Record<string, number> = { normal: 1.0, outdoor: 0.8, water: 0.6 };
const SPF_VALUES = [15, 30, 50, 100];

export default function SpfCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [skinType, setSkinType] = useState('2');
  const [uvIndex, setUvIndex] = useState('mod');
  const [activity, setActivity] = useState('normal');
  const [spf, setSpf] = useState(30);
  const [result, setResult] = useState<{ minutes: number; reapplyH: number } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const skin = parseInt(skinType);
    const base = SKIN_BASE[skin];
    const uv = UV_FACTOR[uvIndex];
    const act = ACT_FACTOR[activity];
    const protectedMin = Math.min(base * spf * uv * act, 240);
    const reapply = activity === 'water' ? 40 : 120;
    setResult({ minutes: Math.round(protectedMin), reapplyH: reapply });
  }

  const skinOptions = [
    { v: '1', l: t.skinI }, { v: '2', l: t.skinII }, { v: '3', l: t.skinIII },
    { v: '4', l: t.skinIV }, { v: '5', l: t.skinV }, { v: '6', l: t.skinVI },
  ];
  const uvOptions = [
    { v: 'low', l: t.uvLow }, { v: 'mod', l: t.uvMod }, { v: 'high', l: t.uvHigh },
    { v: 'veryhigh', l: t.uvVeryHigh }, { v: 'extreme', l: t.uvExtreme },
  ];
  const actOptions = [
    { v: 'normal', l: t.actNormal }, { v: 'outdoor', l: t.actOutdoor }, { v: 'water', l: t.actWater },
  ];

  const fmtTime = (min: number) => min >= 60 ? `${Math.floor(min / 60)}h ${min % 60}min` : `${min} min`;

  return (
    <div className={styles.widget}>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.skinType}</label>
        <select className={styles.widget__select} value={skinType} onChange={e => setSkinType(e.target.value)}>
          {skinOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.spfLabel}</label>
        <div className={styles['widget__spf-row']}>
          {SPF_VALUES.map(v => (
            <button key={v} type="button" className={`${styles['widget__spf-btn']}${spf === v ? ` ${styles['widget__spf-btn--active']}` : ''}`} onClick={() => setSpf(v)}>SPF {v}</button>
          ))}
        </div>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.uvIndex}</label>
        <select className={styles.widget__select} value={uvIndex} onChange={e => setUvIndex(e.target.value)}>
          {uvOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
        <p className={styles.widget__hint}>{t.uvHint}</p>
      </div>
      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.activity}</label>
        <select className={styles.widget__select} value={activity} onChange={e => setActivity(e.target.value)}>
          {actOptions.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      </div>
      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          <div className={styles['widget__result-hero']}>
            <div className={styles['widget__result-label']}>{t.protectedTime}</div>
            <div className={styles['widget__result-time']}>{fmtTime(result.minutes)}</div>
            <div className={styles['widget__result-sub']}>{t.reapply} {fmtTime(result.reapplyH)}</div>
          </div>
          <div className={styles.widget__tips}>
            <div className={styles.widget__tip}><span className={styles['widget__tip-icon']}>☀️</span>{t.reapplyNote}</div>
            {activity === 'water' && <div className={styles.widget__tip}><span className={styles['widget__tip-icon']}>💧</span>{t.waterNote}</div>}
            <div className={styles.widget__tip}><span className={styles['widget__tip-icon']}>🕐</span>{t.tip1}</div>
            <div className={styles.widget__tip}><span className={styles['widget__tip-icon']}>🧴</span>{t.tip2}</div>
            <div className={styles.widget__tip}><span className={styles['widget__tip-icon']}>🔆</span>{t.tip3}</div>
            <div className={styles.widget__tip}><span className={styles['widget__tip-icon']}>⚠️</span>{t.tip4}</div>
          </div>
        </div>
      )}
    </div>
  );
}
