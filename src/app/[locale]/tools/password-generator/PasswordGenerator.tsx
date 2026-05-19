'use client';

import { useState, useCallback } from 'react';
import styles from './PasswordGenerator.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  tabRandom: string; tabKeyword: string;
  length: string; uppercase: string; lowercase: string; numbers: string; symbols: string;
  generate: string; copy: string; copied: string;
  strength: string; strengthWeak: string; strengthFair: string; strengthGood: string; strengthStrong: string;
  keyword: string; keywordPlaceholder: string; keywordHint: string;
  errKeyword: string; errCharset: string;
  noPassword: string;
}> = {
  en: {
    tabRandom: 'Random', tabKeyword: 'From keyword',
    length: 'Length', uppercase: 'Uppercase (A–Z)', lowercase: 'Lowercase (a–z)',
    numbers: 'Numbers (0–9)', symbols: 'Symbols (!@#…)',
    generate: 'Generate', copy: 'Copy', copied: 'Copied!',
    strength: 'Strength', strengthWeak: 'Weak', strengthFair: 'Fair', strengthGood: 'Good', strengthStrong: 'Strong',
    keyword: 'Your keyword', keywordPlaceholder: 'e.g. sunshine',
    keywordHint: 'The keyword defines the base of the password. The same keyword + same settings always produce the same password.',
    errKeyword: 'Please enter a keyword (at least 3 characters).', errCharset: 'Select at least one character type.',
    noPassword: 'Click "Generate" to create a password',
  },
  ru: {
    tabRandom: 'Случайный', tabKeyword: 'Из ключевого слова',
    length: 'Длина', uppercase: 'Заглавные (A–Z)', lowercase: 'Строчные (a–z)',
    numbers: 'Цифры (0–9)', symbols: 'Символы (!@#…)',
    generate: 'Сгенерировать', copy: 'Копировать', copied: 'Скопировано!',
    strength: 'Надёжность', strengthWeak: 'Слабый', strengthFair: 'Средний', strengthGood: 'Хороший', strengthStrong: 'Сильный',
    keyword: 'Ключевое слово', keywordPlaceholder: 'например sunshine',
    keywordHint: 'Ключевое слово задаёт основу пароля. Одно и то же слово + одни настройки всегда дают одинаковый пароль.',
    errKeyword: 'Введите ключевое слово (не менее 3 символов).', errCharset: 'Выберите хотя бы один тип символов.',
    noPassword: 'Нажмите «Сгенерировать»',
  },
  uk: {
    tabRandom: 'Випадковий', tabKeyword: 'З ключового слова',
    length: 'Довжина', uppercase: 'Великі (A–Z)', lowercase: 'Малі (a–z)',
    numbers: 'Цифри (0–9)', symbols: 'Символи (!@#…)',
    generate: 'Згенерувати', copy: 'Копіювати', copied: 'Скопійовано!',
    strength: 'Надійність', strengthWeak: 'Слабкий', strengthFair: 'Середній', strengthGood: 'Хороший', strengthStrong: 'Сильний',
    keyword: 'Ключове слово', keywordPlaceholder: 'наприклад sunshine',
    keywordHint: 'Ключове слово задає основу пароля. Однакове слово + однакові налаштування завжди дають однаковий пароль.',
    errKeyword: 'Введіть ключове слово (не менше 3 символів).', errCharset: 'Оберіть хоча б один тип символів.',
    noPassword: 'Натисніть «Згенерувати»',
  },
  fr: {
    tabRandom: 'Aléatoire', tabKeyword: 'Depuis un mot-clé',
    length: 'Longueur', uppercase: 'Majuscules (A–Z)', lowercase: 'Minuscules (a–z)',
    numbers: 'Chiffres (0–9)', symbols: 'Symboles (!@#…)',
    generate: 'Générer', copy: 'Copier', copied: 'Copié !',
    strength: 'Force', strengthWeak: 'Faible', strengthFair: 'Moyen', strengthGood: 'Bon', strengthStrong: 'Fort',
    keyword: 'Votre mot-clé', keywordPlaceholder: 'ex. sunshine',
    keywordHint: 'Le mot-clé définit la base du mot de passe. Le même mot-clé + mêmes paramètres produisent toujours le même mot de passe.',
    errKeyword: 'Entrez un mot-clé (au moins 3 caractères).', errCharset: 'Sélectionnez au moins un type de caractère.',
    noPassword: 'Cliquez sur « Générer »',
  },
  lt: {
    tabRandom: 'Atsitiktinis', tabKeyword: 'Iš rakto žodžio',
    length: 'Ilgis', uppercase: 'Didžiosios (A–Z)', lowercase: 'Mažosios (a–z)',
    numbers: 'Skaičiai (0–9)', symbols: 'Simboliai (!@#…)',
    generate: 'Generuoti', copy: 'Kopijuoti', copied: 'Nukopijuota!',
    strength: 'Stiprumas', strengthWeak: 'Silpnas', strengthFair: 'Vidutinis', strengthGood: 'Geras', strengthStrong: 'Stiprus',
    keyword: 'Rakto žodis', keywordPlaceholder: 'pvz. sunshine',
    keywordHint: 'Rakto žodis nustato slaptažodžio pagrindą. Tas pats žodis + tie patys nustatymai visada duoda tą patį slaptažodį.',
    errKeyword: 'Įveskite rakto žodį (bent 3 simboliai).', errCharset: 'Pasirinkite bent vieną simbolių tipą.',
    noPassword: 'Spauskite „Generuoti"',
  },
};

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMS  = '0123456789';
const SYMS  = '!@#$%^&*_-+=?';

const LEET_MAP: Record<string, string[]> = {
  a: ['4', '@'], e: ['3'], i: ['1', '!'], o: ['0'], s: ['5', '$'],
  t: ['7'], g: ['9'], b: ['8'], l: ['1'], z: ['2'],
};

function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (((hash << 5) + hash) ^ str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function calcStrength(password: string): 0 | 1 | 2 | 3 {
  if (password.length < 6) return 0;
  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  if (score <= 1) return 0;
  if (score === 2) return 1;
  if (score === 3) return 2;
  return 3;
}

function generateRandom(length: number, useUpper: boolean, useLower: boolean, useNums: boolean, useSyms: boolean): string {
  let charset = '';
  const guaranteed: string[] = [];

  if (useUpper) { charset += UPPER; guaranteed.push(UPPER[Math.floor(Math.random() * UPPER.length)]); }
  if (useLower) { charset += LOWER; guaranteed.push(LOWER[Math.floor(Math.random() * LOWER.length)]); }
  if (useNums)  { charset += NUMS;  guaranteed.push(NUMS[Math.floor(Math.random() * NUMS.length)]); }
  if (useSyms)  { charset += SYMS;  guaranteed.push(SYMS[Math.floor(Math.random() * SYMS.length)]); }
  if (!charset) return '';

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  const base = Array.from(arr).map((n) => charset[n % charset.length]);

  guaranteed.forEach((ch, i) => { base[i % length] = ch; });

  const shuffleArr = new Uint32Array(length);
  crypto.getRandomValues(shuffleArr);
  for (let i = length - 1; i > 0; i--) {
    const j = shuffleArr[i] % (i + 1);
    [base[i], base[j]] = [base[j], base[i]];
  }

  return base.join('');
}

function generateFromKeyword(
  keyword: string,
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNums: boolean,
  useSyms: boolean,
): string {
  const word = keyword.toLowerCase().trim();
  if (word.length < 3) return '';

  let charset = '';
  if (useUpper) charset += UPPER;
  if (useLower) charset += LOWER;
  if (useNums)  charset += NUMS;
  if (useSyms)  charset += SYMS;
  if (!charset) return '';

  const seed = djb2(word);
  const result: string[] = [];

  // Phase 1: transform keyword chars with leet-speak, respect charset options
  for (let i = 0; i < word.length && result.length < length; i++) {
    const ch = word[i];
    const subs = LEET_MAP[ch];

    if (subs && i % 3 === 1) {
      const sub = subs[i % subs.length];
      const isDigit = /[0-9]/.test(sub);
      const isSym   = /[^A-Za-z0-9]/.test(sub);
      if ((isDigit && useNums) || (isSym && useSyms)) {
        result.push(sub);
        continue;
      }
    }
    if (i % 4 === 0 && useUpper) {
      result.push(ch.toUpperCase());
    } else if (useLower) {
      result.push(ch);
    } else {
      result.push(charset[(seed + i) % charset.length]);
    }
  }

  // Phase 2: pad to target length deterministically
  let lcg = seed;
  while (result.length < length) {
    lcg = (lcg * 1664525 + 1013904223) >>> 0;
    result.push(charset[lcg % charset.length]);
  }

  // Phase 3: guarantee at least one of each required type
  const guaranteed: string[] = [];
  if (useUpper && !/[A-Z]/.test(result.join(''))) guaranteed.push(UPPER[(seed * 3) % UPPER.length]);
  if (useLower && !/[a-z]/.test(result.join(''))) guaranteed.push(LOWER[(seed * 7) % LOWER.length]);
  if (useNums  && !/[0-9]/.test(result.join(''))) guaranteed.push(NUMS[(seed * 11) % NUMS.length]);
  if (useSyms  && !/[^A-Za-z0-9]/.test(result.join(''))) guaranteed.push(SYMS[(seed * 17) % SYMS.length]);

  guaranteed.forEach((ch, i) => {
    result[(word.length + i) % length] = ch;
  });

  return result.join('');
}

export default function PasswordGenerator({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [tab, setTab] = useState<'random' | 'keyword'>('random');

  // Shared controls
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNums,  setUseNums]  = useState(true);
  const [useSyms,  setUseSyms]  = useState(true);

  // Keyword tab only
  const [keyword, setKeyword] = useState('');

  // Shared output
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setError('');
    if (!useUpper && !useLower && !useNums && !useSyms) { setError(t.errCharset); return; }
    if (tab === 'random') {
      setPassword(generateRandom(length, useUpper, useLower, useNums, useSyms));
    } else {
      if (keyword.trim().length < 3) { setError(t.errKeyword); return; }
      setPassword(generateFromKeyword(keyword, length, useUpper, useLower, useNums, useSyms));
    }
    setCopied(false);
  }, [tab, length, useUpper, useLower, useNums, useSyms, keyword, t]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const strength = password ? calcStrength(password) : -1;
  const strengthLabels = [t.strengthWeak, t.strengthFair, t.strengthGood, t.strengthStrong];
  const strengthKeys: ('weak' | 'fair' | 'good' | 'strong')[] = ['weak', 'fair', 'good', 'strong'];

  const controls = (
    <>
      <div className={styles['pass-gen__slider-row']}>
        <label className={styles['pass-gen__label']}>{t.length}: <strong>{length}</strong></label>
        <input
          type="range" min={6} max={64} value={length}
          className={styles['pass-gen__slider']}
          onChange={(e) => { setLength(Number(e.target.value)); setPassword(''); }}
        />
      </div>
      <div className={styles['pass-gen__checkboxes']}>
        {([
          [useUpper, setUseUpper, t.uppercase],
          [useLower, setUseLower, t.lowercase],
          [useNums,  setUseNums,  t.numbers],
          [useSyms,  setUseSyms,  t.symbols],
        ] as [boolean, (v: boolean) => void, string][]).map(([val, setter, label]) => (
          <label key={label} className={styles['pass-gen__checkbox-label']}>
            <input
              type="checkbox" checked={val}
              onChange={(e) => { setter(e.target.checked); setPassword(''); }}
              className={styles['pass-gen__checkbox']}
            />
            {label}
          </label>
        ))}
      </div>
    </>
  );

  return (
    <div className={styles['pass-gen']}>
      <div className={styles['pass-gen__tabs']}>
        <button
          type="button"
          className={`${styles['pass-gen__tab']} ${tab === 'random' ? styles['pass-gen__tab--active'] : ''}`}
          onClick={() => { setTab('random'); setPassword(''); setError(''); }}
        >{t.tabRandom}</button>
        <button
          type="button"
          className={`${styles['pass-gen__tab']} ${tab === 'keyword' ? styles['pass-gen__tab--active'] : ''}`}
          onClick={() => { setTab('keyword'); setPassword(''); setError(''); }}
        >{t.tabKeyword}</button>
      </div>

      <div className={styles['pass-gen__body']}>
        <div className={styles['pass-gen__controls']}>
          {tab === 'keyword' && (
            <div className={styles['pass-gen__field']}>
              <label className={styles['pass-gen__label']}>{t.keyword}</label>
              <input
                type="text" className={styles['pass-gen__input']}
                value={keyword} placeholder={t.keywordPlaceholder}
                onChange={(e) => { setKeyword(e.target.value); setPassword(''); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && generate()}
              />
            </div>
          )}
          {controls}
          {tab === 'keyword' && (
            <p className={styles['pass-gen__hint']}>{t.keywordHint}</p>
          )}
        </div>

        {error && <p className={styles['pass-gen__error']}>{error}</p>}

        <button type="button" className={styles['pass-gen__btn']} onClick={generate}>{t.generate}</button>

        {password ? (
          <div className={styles['pass-gen__result']}>
            <div className={styles['pass-gen__output-row']}>
              <span className={styles['pass-gen__output']}>{password}</span>
              <button
                type="button"
                className={`${styles['pass-gen__copy-btn']} ${copied ? styles['pass-gen__copy-btn--copied'] : ''}`}
                onClick={copyToClipboard}
              >{copied ? t.copied : t.copy}</button>
            </div>
            {strength >= 0 && (
              <div className={styles['pass-gen__strength']}>
                <span className={styles['pass-gen__strength-label']}>{t.strength}:</span>
                <div className={styles['pass-gen__strength-bars']}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`${styles['pass-gen__strength-bar']} ${i <= strength ? styles[`pass-gen__strength-bar--${strengthKeys[strength]}`] : ''}`}
                    />
                  ))}
                </div>
                <span className={`${styles['pass-gen__strength-text']} ${styles[`pass-gen__strength-text--${strengthKeys[strength]}`]}`}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className={styles['pass-gen__placeholder']}>{t.noPassword}</p>
        )}
      </div>
    </div>
  );
}
