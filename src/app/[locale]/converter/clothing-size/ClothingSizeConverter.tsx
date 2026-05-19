'use client';

import { useState } from 'react';
import styles from './ClothingSizeConverter.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  men: string; women: string;
  tops: string; pants: string; shoes: string;
  eu: string; us: string; uk: string; it: string; int: string;
  pickSize: string; noResult: string;
  disclaimer: string;
}> = {
  en: {
    men: 'Men', women: 'Women', tops: 'Tops / Jackets', pants: 'Pants / Jeans', shoes: 'Shoes',
    eu: 'EU', us: 'US', uk: 'UK', it: 'IT', int: 'INT',
    pickSize: 'Select a size to see equivalents', noResult: 'No match found',
    disclaimer: 'Sizes may vary by brand. Use as a reference only.',
  },
  ru: {
    men: 'Мужской', women: 'Женский', tops: 'Верх / Пиджаки', pants: 'Брюки / Джинсы', shoes: 'Обувь',
    eu: 'EU', us: 'US', uk: 'UK', it: 'IT', int: 'INT',
    pickSize: 'Выберите размер, чтобы увидеть соответствие', noResult: 'Совпадений не найдено',
    disclaimer: 'Размеры могут отличаться у разных брендов. Используйте как ориентир.',
  },
  uk: {
    men: 'Чоловічий', women: 'Жіночий', tops: 'Верх / Піджаки', pants: 'Штани / Джинси', shoes: 'Взуття',
    eu: 'EU', us: 'US', uk: 'UK', it: 'IT', int: 'INT',
    pickSize: 'Оберіть розмір, щоб побачити відповідність', noResult: 'Відповідностей не знайдено',
    disclaimer: 'Розміри можуть відрізнятися залежно від бренду. Використовуйте як орієнтир.',
  },
  fr: {
    men: 'Homme', women: 'Femme', tops: 'Hauts / Vestes', pants: 'Pantalons / Jeans', shoes: 'Chaussures',
    eu: 'EU', us: 'US', uk: 'UK', it: 'IT', int: 'INT',
    pickSize: 'Sélectionnez une taille pour voir les équivalences', noResult: 'Aucun résultat',
    disclaimer: 'Les tailles peuvent varier selon les marques. À utiliser comme référence uniquement.',
  },
  lt: {
    men: 'Vyriški', women: 'Moteriški', tops: 'Viršutinė dalis / Švarkai', pants: 'Kelnės / Džinsai', shoes: 'Avalynė',
    eu: 'EU', us: 'US', uk: 'UK', it: 'IT', int: 'INT',
    pickSize: 'Pasirinkite dydį, kad pamatytumėte atitikimą', noResult: 'Atitikimų nerasta',
    disclaimer: 'Dydžiai gali skirtis priklausomai nuo prekės ženklo. Naudokite kaip orientyrą.',
  },
};

type SizeRow = { eu: string; us: string; uk: string; it: string; int: string };

const MEN_TOPS: SizeRow[] = [
  { eu: '44', us: 'XS', uk: 'XS', it: '44', int: 'XS' },
  { eu: '46', us: 'S',  uk: 'S',  it: '46', int: 'S'  },
  { eu: '48', us: 'M',  uk: 'M',  it: '48', int: 'M'  },
  { eu: '50', us: 'L',  uk: 'L',  it: '50', int: 'L'  },
  { eu: '52', us: 'XL', uk: 'XL', it: '52', int: 'XL' },
  { eu: '54', us: 'XXL',uk: 'XXL',it: '54', int: 'XXL'},
  { eu: '56', us: '3XL',uk: '3XL',it: '56', int: '3XL'},
  { eu: '58', us: '4XL',uk: '4XL',it: '58', int: '4XL'},
];

const MEN_PANTS: SizeRow[] = [
  { eu: '44', us: '28', uk: '28', it: '44', int: 'XS' },
  { eu: '46', us: '30', uk: '30', it: '46', int: 'S'  },
  { eu: '48', us: '32', uk: '32', it: '48', int: 'M'  },
  { eu: '50', us: '34', uk: '34', it: '50', int: 'L'  },
  { eu: '52', us: '36', uk: '36', it: '52', int: 'XL' },
  { eu: '54', us: '38', uk: '38', it: '54', int: 'XXL'},
  { eu: '56', us: '40', uk: '40', it: '56', int: '3XL'},
  { eu: '58', us: '42', uk: '42', it: '58', int: '4XL'},
];

const MEN_SHOES: SizeRow[] = [
  { eu: '39', us: '6',   uk: '5.5', it: '39', int: '-' },
  { eu: '40', us: '7',   uk: '6.5', it: '40', int: '-' },
  { eu: '41', us: '8',   uk: '7',   it: '41', int: '-' },
  { eu: '42', us: '9',   uk: '8',   it: '42', int: '-' },
  { eu: '43', us: '10',  uk: '9',   it: '43', int: '-' },
  { eu: '44', us: '11',  uk: '10',  it: '44', int: '-' },
  { eu: '45', us: '12',  uk: '11',  it: '45', int: '-' },
  { eu: '46', us: '13',  uk: '12',  it: '46', int: '-' },
];

const WOMEN_TOPS: SizeRow[] = [
  { eu: '32', us: 'XXS', uk: '4',  it: '32', int: 'XXS' },
  { eu: '34', us: 'XS',  uk: '6',  it: '34', int: 'XS'  },
  { eu: '36', us: 'S',   uk: '8',  it: '36', int: 'S'   },
  { eu: '38', us: 'M',   uk: '10', it: '38', int: 'M'   },
  { eu: '40', us: 'L',   uk: '12', it: '40', int: 'L'   },
  { eu: '42', us: 'XL',  uk: '14', it: '42', int: 'XL'  },
  { eu: '44', us: 'XXL', uk: '16', it: '44', int: 'XXL' },
  { eu: '46', us: '1X',  uk: '18', it: '46', int: '3XL' },
  { eu: '48', us: '2X',  uk: '20', it: '48', int: '4XL' },
];

const WOMEN_PANTS: SizeRow[] = [
  { eu: '32', us: '0',  uk: '4',  it: '32', int: 'XXS' },
  { eu: '34', us: '2',  uk: '6',  it: '34', int: 'XS'  },
  { eu: '36', us: '4',  uk: '8',  it: '36', int: 'S'   },
  { eu: '38', us: '6',  uk: '10', it: '38', int: 'M'   },
  { eu: '40', us: '8',  uk: '12', it: '40', int: 'L'   },
  { eu: '42', us: '10', uk: '14', it: '42', int: 'XL'  },
  { eu: '44', us: '12', uk: '16', it: '44', int: 'XXL' },
  { eu: '46', us: '14', uk: '18', it: '46', int: '3XL' },
  { eu: '48', us: '16', uk: '20', it: '48', int: '4XL' },
];

const WOMEN_SHOES: SizeRow[] = [
  { eu: '35', us: '4.5', uk: '2.5', it: '35', int: '-' },
  { eu: '36', us: '5.5', uk: '3.5', it: '36', int: '-' },
  { eu: '37', us: '6.5', uk: '4.5', it: '37', int: '-' },
  { eu: '38', us: '7.5', uk: '5.5', it: '38', int: '-' },
  { eu: '39', us: '8.5', uk: '6.5', it: '39', int: '-' },
  { eu: '40', us: '9.5', uk: '7.5', it: '40', int: '-' },
  { eu: '41', us: '10',  uk: '8',   it: '41', int: '-' },
  { eu: '42', us: '11',  uk: '9',   it: '42', int: '-' },
];

type Gender = 'men' | 'women';
type Category = 'tops' | 'pants' | 'shoes';
type Standard = 'eu' | 'us' | 'uk' | 'it' | 'int';

const TABLE_MAP: Record<Gender, Record<Category, SizeRow[]>> = {
  men:   { tops: MEN_TOPS,   pants: MEN_PANTS,   shoes: MEN_SHOES   },
  women: { tops: WOMEN_TOPS, pants: WOMEN_PANTS, shoes: WOMEN_SHOES },
};

const STANDARDS: Standard[] = ['eu', 'us', 'uk', 'it', 'int'];

export default function ClothingSizeConverter({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [gender, setGender] = useState<Gender>('men');
  const [category, setCategory] = useState<Category>('tops');
  const [fromStd, setFromStd] = useState<Standard>('eu');
  const [selectedVal, setSelectedVal] = useState<string>('');

  const table = TABLE_MAP[gender][category];
  const uniqueVals = Array.from(new Set(table.map(r => r[fromStd]).filter(v => v !== '-')));
  const match = selectedVal ? table.find(r => r[fromStd] === selectedVal) : null;

  const handleGender = (g: Gender) => { setGender(g); setSelectedVal(''); };
  const handleCategory = (c: Category) => { setCategory(c); setSelectedVal(''); };
  const handleFrom = (s: Standard) => { setFromStd(s); setSelectedVal(''); };

  return (
    <div className={styles['cs-conv']}>
      {/* Gender toggle */}
      <div className={styles['cs-conv__toggles']}>
        {(['men', 'women'] as Gender[]).map(g => (
          <button key={g} type="button"
            className={`${styles['cs-conv__toggle']} ${gender === g ? styles['cs-conv__toggle--active'] : ''}`}
            onClick={() => handleGender(g)}>
            {t[g]}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className={styles['cs-conv__cats']}>
        {(['tops', 'pants', 'shoes'] as Category[]).map(c => (
          <button key={c} type="button"
            className={`${styles['cs-conv__cat']} ${category === c ? styles['cs-conv__cat--active'] : ''}`}
            onClick={() => handleCategory(c)}>
            {t[c]}
          </button>
        ))}
      </div>

      {/* Source standard */}
      <div className={styles['cs-conv__from-row']}>
        <span className={styles['cs-conv__from-label']}>
          {lang === 'en' ? 'Convert from:' :
           lang === 'ru' ? 'Конвертировать из:' :
           lang === 'uk' ? 'Конвертувати з:' :
           lang === 'fr' ? 'Convertir depuis :' :
           'Konvertuoti iš:'}
        </span>
        <div className={styles['cs-conv__stds']}>
          {STANDARDS.map(s => (
            <button key={s} type="button"
              className={`${styles['cs-conv__std']} ${fromStd === s ? styles['cs-conv__std--active'] : ''}`}
              onClick={() => handleFrom(s)}>
              {t[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className={styles['cs-conv__select-row']}>
        <label className={styles['cs-conv__select-label']}>
          {lang === 'en' ? 'Size:' :
           lang === 'ru' ? 'Размер:' :
           lang === 'uk' ? 'Розмір:' :
           lang === 'fr' ? 'Taille :' :
           'Dydis:'}
        </label>
        <div className={styles['cs-conv__sizes']}>
          {uniqueVals.map(v => (
            <button key={v} type="button"
              className={`${styles['cs-conv__size-btn']} ${selectedVal === v ? styles['cs-conv__size-btn--active'] : ''}`}
              onClick={() => setSelectedVal(v)}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {selectedVal && (
        <div className={styles['cs-conv__result']}>
          {match ? (
            <div className={styles['cs-conv__result-grid']}>
              {STANDARDS.map(s => (
                <div key={s} className={`${styles['cs-conv__result-item']} ${s === fromStd ? styles['cs-conv__result-item--source'] : ''}`}>
                  <span className={styles['cs-conv__result-std']}>{t[s]}</span>
                  <span className={styles['cs-conv__result-val']}>{match[s]}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles['cs-conv__no-result']}>{t.noResult}</p>
          )}
        </div>
      )}

      {!selectedVal && (
        <p className={styles['cs-conv__hint']}>{t.pickSize}</p>
      )}

      <p className={styles['cs-conv__disclaimer']}>{t.disclaimer}</p>
    </div>
  );
}
