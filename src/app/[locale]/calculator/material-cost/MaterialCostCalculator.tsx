'use client';
import { useState } from 'react';
import styles from './MaterialCostCalculator.module.scss';

const T: Record<string, {
  tabFloor: string; tabPaint: string; tabConcrete: string;
  length: string; width: string; depth: string;
  waste: string; price: string; coverage: string; coats: string;
  m: string; m2: string; m3: string; pct: string;
  pricePerM2: string; pricePerL: string; pricePerBag: string;
  calculate: string;
  areaLabel: string; materialLabel: string; costLabel: string;
  litersLabel: string; bagsLabel: string; volumeLabel: string;
  coat1: string; coat2: string;
  error: string; curr: string;
}> = {
  en: { tabFloor: 'Flooring', tabPaint: 'Paint', tabConcrete: 'Concrete', length: 'Length', width: 'Width', depth: 'Depth', waste: 'Waste Allowance', price: 'Price', coverage: 'Coverage', coats: 'Number of Coats', m: 'm', m2: 'm²', m3: 'm³', pct: '%', pricePerM2: '₴ / m²', pricePerL: '₴ / litre', pricePerBag: '₴ / bag (25kg)', curr: '₴', calculate: 'Calculate', areaLabel: 'Total Area', materialLabel: 'Material Needed', costLabel: 'Total Cost', litersLabel: 'Litres Needed', bagsLabel: 'Bags Needed', volumeLabel: 'Volume', coat1: '1 coat', coat2: '2 coats', error: 'Please enter valid positive numbers.' },
  ru: { tabFloor: 'Покрытие пола', tabPaint: 'Краска', tabConcrete: 'Бетон', length: 'Длина', width: 'Ширина', depth: 'Глубина', waste: 'Запас на отходы', price: 'Цена', coverage: 'Расход краски', coats: 'Количество слоёв', m: 'м', m2: 'м²', m3: 'м³', pct: '%', pricePerM2: '₴ / м²', pricePerL: '₴ / л', pricePerBag: '₴ / мешок (25кг)', curr: '₴', calculate: 'Рассчитать', areaLabel: 'Общая площадь', materialLabel: 'Материала нужно', costLabel: 'Общая стоимость', litersLabel: 'Литров нужно', bagsLabel: 'Мешков нужно', volumeLabel: 'Объём', coat1: '1 слой', coat2: '2 слоя', error: 'Введите корректные положительные числа.' },
  uk: { tabFloor: 'Підлогове покриття', tabPaint: 'Фарба', tabConcrete: 'Бетон', length: 'Довжина', width: 'Ширина', depth: 'Глибина', waste: 'Запас на відходи', price: 'Ціна', coverage: 'Витрати фарби', coats: 'Кількість шарів', m: 'м', m2: 'м²', m3: 'м³', pct: '%', pricePerM2: '₴ / м²', pricePerL: '₴ / л', pricePerBag: '₴ / мішок (25кг)', curr: '₴', calculate: 'Розрахувати', areaLabel: 'Загальна площа', materialLabel: 'Матеріалу потрібно', costLabel: 'Загальна вартість', litersLabel: 'Літрів потрібно', bagsLabel: 'Мішків потрібно', volumeLabel: 'Об\'єм', coat1: '1 шар', coat2: '2 шари', error: 'Введіть коректні додатні числа.' },
  fr: { tabFloor: 'Revêtement de sol', tabPaint: 'Peinture', tabConcrete: 'Béton', length: 'Longueur', width: 'Largeur', depth: 'Épaisseur', waste: 'Marge de perte', price: 'Prix', coverage: 'Rendement', coats: 'Nombre de couches', m: 'm', m2: 'm²', m3: 'm³', pct: '%', pricePerM2: '€ / m²', pricePerL: '€ / litre', pricePerBag: '€ / sac (25kg)', curr: '€', calculate: 'Calculer', areaLabel: 'Surface totale', materialLabel: 'Matériaux nécessaires', costLabel: 'Coût total', litersLabel: 'Litres nécessaires', bagsLabel: 'Sacs nécessaires', volumeLabel: 'Volume', coat1: '1 couche', coat2: '2 couches', error: 'Veuillez entrer des nombres positifs valides.' },
  lt: { tabFloor: 'Grindų danga', tabPaint: 'Dažai', tabConcrete: 'Betonas', length: 'Ilgis', width: 'Plotis', depth: 'Gylis', waste: 'Atliekų rezervas', price: 'Kaina', coverage: 'Dažų sunaudojimas', coats: 'Sluoksnių skaičius', m: 'm', m2: 'm²', m3: 'm³', pct: '%', pricePerM2: '€ / m²', pricePerL: '€ / litras', pricePerBag: '€ / maišas (25kg)', curr: '€', calculate: 'Skaičiuoti', areaLabel: 'Bendras plotas', materialLabel: 'Reikalingi materialai', costLabel: 'Bendra kaina', litersLabel: 'Reikalingi litrai', bagsLabel: 'Reikalingi maišai', volumeLabel: 'Tūris', coat1: '1 sluoksnis', coat2: '2 sluoksniai', error: 'Įveskite teigiamus skaičius.' },
};

type Tab = 'floor' | 'paint' | 'concrete';

export default function MaterialCostCalculator({ locale }: { locale: string }) {
  const t = T[locale] ?? T.en;
  const [tab, setTab] = useState<Tab>('floor');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('0.1');
  const [waste, setWaste] = useState('10');
  const [price, setPrice] = useState('');
  const [coverage, setCoverage] = useState('10');
  const [coats, setCoats] = useState('1');
  const [result, setResult] = useState<{ area?: number; volume?: number; material: number; cost: number; unit: string } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const l = parseFloat(length); const w = parseFloat(width);
    const p = parseFloat(price);
    if (!l || l <= 0 || !w || w <= 0 || !p || p <= 0) { setError(t.error); return; }

    if (tab === 'floor') {
      const wst = parseFloat(waste) || 0;
      const area = l * w;
      const material = area * (1 + wst / 100);
      setResult({ area, material, cost: material * p, unit: t.m2 });
    } else if (tab === 'paint') {
      const cov = parseFloat(coverage) || 10;
      const c = parseInt(coats) || 1;
      const area = l * w;
      const liters = Math.ceil((area / cov) * c * 10) / 10;
      setResult({ area, material: liters, cost: liters * p, unit: 'L' });
    } else {
      const d = parseFloat(depth) || 0.1;
      const volume = l * w * d;
      const CUBIC_PER_BAG = 0.012;
      const bags = Math.ceil(volume / CUBIC_PER_BAG);
      setResult({ volume, material: bags, cost: bags * p, unit: t.bagsLabel });
    }
  }

  function switchTab(next: Tab) { setTab(next); setResult(null); setError(''); }

  return (
    <div className={styles.widget}>
      <div className={styles.widget__tabs}>
        {(['floor', 'paint', 'concrete'] as Tab[]).map(tb => (
          <button key={tb} type="button" className={`${styles.widget__tab}${tab === tb ? ` ${styles['widget__tab--active']}` : ''}`} onClick={() => switchTab(tb)}>
            {tb === 'floor' ? t.tabFloor : tb === 'paint' ? t.tabPaint : t.tabConcrete}
          </button>
        ))}
      </div>

      <div className={styles.widget__row}>
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.length} ({t.m})</label>
          <div className={styles['widget__input-wrap']}>
            <input type="number" min="0" step="0.01" className={styles.widget__input} value={length} onChange={e => setLength(e.target.value)} placeholder="5" />
            <span className={styles.widget__suffix}>{t.m}</span>
          </div>
        </div>
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.width} ({t.m})</label>
          <div className={styles['widget__input-wrap']}>
            <input type="number" min="0" step="0.01" className={styles.widget__input} value={width} onChange={e => setWidth(e.target.value)} placeholder="4" />
            <span className={styles.widget__suffix}>{t.m}</span>
          </div>
        </div>
      </div>

      {tab === 'floor' && (
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.waste} ({t.pct})</label>
          <div className={styles['widget__input-wrap']}>
            <input type="number" min="0" max="30" className={styles.widget__input} value={waste} onChange={e => setWaste(e.target.value)} />
            <span className={styles.widget__suffix}>%</span>
          </div>
        </div>
      )}

      {tab === 'paint' && (
        <>
          <div className={styles.widget__field}>
            <label className={styles.widget__label}>{t.coverage} ({t.m2}/L)</label>
            <div className={styles['widget__input-wrap']}>
              <input type="number" min="1" className={styles.widget__input} value={coverage} onChange={e => setCoverage(e.target.value)} />
              <span className={styles.widget__suffix}>{t.m2}/L</span>
            </div>
          </div>
          <div className={styles.widget__field}>
            <label className={styles.widget__label}>{t.coats}</label>
            <select className={styles.widget__select} value={coats} onChange={e => setCoats(e.target.value)}>
              <option value="1">{t.coat1}</option>
              <option value="2">{t.coat2}</option>
            </select>
          </div>
        </>
      )}

      {tab === 'concrete' && (
        <div className={styles.widget__field}>
          <label className={styles.widget__label}>{t.depth} ({t.m})</label>
          <div className={styles['widget__input-wrap']}>
            <input type="number" min="0.01" step="0.01" className={styles.widget__input} value={depth} onChange={e => setDepth(e.target.value)} />
            <span className={styles.widget__suffix}>{t.m}</span>
          </div>
        </div>
      )}

      <div className={styles.widget__field}>
        <label className={styles.widget__label}>{t.price} ({tab === 'floor' ? t.pricePerM2 : tab === 'paint' ? t.pricePerL : t.pricePerBag})</label>
        <div className={styles['widget__input-wrap']}>
          <input type="number" min="0" step="0.01" className={styles.widget__input} value={price} onChange={e => setPrice(e.target.value)} placeholder="25" />
          <span className={styles.widget__suffix}>{t.curr}</span>
        </div>
      </div>

      {error && <p className={styles.widget__error}>{error}</p>}
      <button type="button" className={styles.widget__btn} onClick={calculate}>{t.calculate}</button>

      {result && (
        <div className={styles.widget__results}>
          {result.area !== undefined && (
            <div className={styles['widget__result-card']}>
              <div className={styles['widget__result-label']}>{t.areaLabel}</div>
              <div className={styles['widget__result-value']}>{result.area.toFixed(2)}</div>
              <div className={styles['widget__result-unit']}>{t.m2}</div>
            </div>
          )}
          {result.volume !== undefined && (
            <div className={styles['widget__result-card']}>
              <div className={styles['widget__result-label']}>{t.volumeLabel}</div>
              <div className={styles['widget__result-value']}>{result.volume.toFixed(3)}</div>
              <div className={styles['widget__result-unit']}>{t.m3}</div>
            </div>
          )}
          <div className={styles['widget__result-card']}>
            <div className={styles['widget__result-label']}>{tab === 'paint' ? t.litersLabel : tab === 'concrete' ? t.bagsLabel : t.materialLabel}</div>
            <div className={styles['widget__result-value']}>{tab === 'floor' ? result.material.toFixed(2) : result.material}</div>
            <div className={styles['widget__result-unit']}>{tab === 'floor' ? t.m2 : tab === 'paint' ? 'L' : ''}</div>
          </div>
          <div className={`${styles['widget__result-card']} ${styles['widget__result-card--highlight']}`}>
            <div className={styles['widget__result-label']}>{t.costLabel}</div>
            <div className={styles['widget__result-value']}>{t.curr}{result.cost.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
