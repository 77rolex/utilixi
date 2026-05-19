'use client';

import { useState, useCallback } from 'react';
import styles from './ColorConverter.module.scss';

type LangKey = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<LangKey, {
  hex: string; rgb: string; hsl: string; preview: string; copy: string; copied: string;
  errHex: string; errRgb: string; errHsl: string;
  r: string; g: string; b: string; h: string; s: string; l: string;
}> = {
  en: { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Color preview', copy: 'Copy', copied: 'Copied!', errHex: 'Invalid HEX color.', errRgb: 'RGB values must be 0–255.', errHsl: 'H: 0–360, S/L: 0–100.', r: 'R', g: 'G', b: 'B', h: 'H', s: 'S', l: 'L' },
  ru: { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Предпросмотр цвета', copy: 'Копировать', copied: 'Скопировано!', errHex: 'Некорректный HEX цвет.', errRgb: 'Значения RGB должны быть 0–255.', errHsl: 'H: 0–360, S/L: 0–100.', r: 'R', g: 'G', b: 'B', h: 'H', s: 'S', l: 'L' },
  uk: { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Попередній перегляд', copy: 'Копіювати', copied: 'Скопійовано!', errHex: 'Некоректний HEX колір.', errRgb: 'Значення RGB мають бути 0–255.', errHsl: 'H: 0–360, S/L: 0–100.', r: 'R', g: 'G', b: 'B', h: 'H', s: 'S', l: 'L' },
  fr: { hex: 'HEX', rgb: 'RVB', hsl: 'TSL', preview: 'Aperçu de la couleur', copy: 'Copier', copied: 'Copié !', errHex: 'Couleur HEX invalide.', errRgb: 'Les valeurs RVB doivent être 0–255.', errHsl: 'H: 0–360, S/L: 0–100.', r: 'R', g: 'V', b: 'B', h: 'T', s: 'S', l: 'L' },
  lt: { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Spalvos peržiūra', copy: 'Kopijuoti', copied: 'Nukopijuota!', errHex: 'Netinkama HEX spalva.', errRgb: 'RGB reikšmės turi būti 0–255.', errHsl: 'H: 0–360, S/L: 0–100.', r: 'R', g: 'G', b: 'B', h: 'H', s: 'S', l: 'L' },
};

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

type Tab = 'hex' | 'rgb' | 'hsl';

export default function ColorConverter({ locale }: { locale: string }) {
  const lang = (locale as LangKey) in T ? (locale as LangKey) : 'en';
  const t = T[lang];

  const [tab, setTab] = useState<Tab>('hex');
  const [hexVal, setHexVal] = useState('#1565C0');
  const [rgbR, setRgbR] = useState('21'); const [rgbG, setRgbG] = useState('101'); const [rgbB, setRgbB] = useState('192');
  const [hslH, setHslH] = useState('214'); const [hslS, setHslS] = useState('80'); const [hslL, setHslL] = useState('42');
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState('');

  const currentHex = hexVal.startsWith('#') ? hexVal : '#' + hexVal;
  const [previewR, previewG, previewB] = hexToRgb(currentHex) ?? [21, 101, 192];
  const previewColor = `rgb(${previewR},${previewG},${previewB})`;

  const copyText = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1800);
  }, []);

  const applyFromHex = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) { setError(t.errHex); return; }
    setError('');
    const [r, g, b] = rgb;
    setRgbR(String(r)); setRgbG(String(g)); setRgbB(String(b));
    const [h, s, l] = rgbToHsl(r, g, b);
    setHslH(String(h)); setHslS(String(s)); setHslL(String(l));
  };

  const applyFromRgb = () => {
    const r = parseInt(rgbR), g = parseInt(rgbG), b = parseInt(rgbB);
    if ([r, g, b].some(v => isNaN(v) || v < 0 || v > 255)) { setError(t.errRgb); return; }
    setError('');
    setHexVal(rgbToHex(r, g, b));
    const [h, s, l] = rgbToHsl(r, g, b);
    setHslH(String(h)); setHslS(String(s)); setHslL(String(l));
  };

  const applyFromHsl = () => {
    const h = parseInt(hslH), s = parseInt(hslS), l = parseInt(hslL);
    if (isNaN(h) || h < 0 || h > 360 || isNaN(s) || s < 0 || s > 100 || isNaN(l) || l < 0 || l > 100) { setError(t.errHsl); return; }
    setError('');
    const [r, g, b] = hslToRgb(h, s, l);
    setRgbR(String(r)); setRgbG(String(g)); setRgbB(String(b));
    setHexVal(rgbToHex(r, g, b));
  };

  const hexOut = (hexVal.startsWith('#') ? hexVal : '#' + hexVal).toUpperCase();
  const rgbOut = `rgb(${previewR}, ${previewG}, ${previewB})`;
  const hslOut = `hsl(${hslH}, ${hslS}%, ${hslL}%)`;

  return (
    <div className={styles['col-conv']}>
      <div className={styles['col-conv__tabs']}>
        {(['hex', 'rgb', 'hsl'] as Tab[]).map(tb => (
          <button key={tb} type="button"
            className={`${styles['col-conv__tab']} ${tab === tb ? styles['col-conv__tab--active'] : ''}`}
            onClick={() => { setTab(tb); setError(''); }}
          >{tb.toUpperCase()}</button>
        ))}
      </div>

      <div className={styles['col-conv__body']}>
        {tab === 'hex' && (
          <div className={styles['col-conv__inputs']}>
            <div className={styles['col-conv__field']}>
              <label className={styles['col-conv__label']}>HEX</label>
              <div className={styles['col-conv__hex-row']}>
                <input type="color" className={styles['col-conv__color-picker']} value={currentHex}
                  onChange={e => { setHexVal(e.target.value); applyFromHex(e.target.value); }} />
                <input type="text" className={styles['col-conv__input']} value={hexVal} maxLength={7}
                  onChange={e => { setHexVal(e.target.value); setError(''); }}
                  onBlur={() => applyFromHex(hexVal)}
                  onKeyDown={e => e.key === 'Enter' && applyFromHex(hexVal)}
                  placeholder="#RRGGBB" />
              </div>
            </div>
          </div>
        )}

        {tab === 'rgb' && (
          <div className={styles['col-conv__inputs']}>
            {[{ label: t.r, val: rgbR, set: setRgbR }, { label: t.g, val: rgbG, set: setRgbG }, { label: t.b, val: rgbB, set: setRgbB }].map(({ label, val, set }) => (
              <div key={label} className={styles['col-conv__field']}>
                <label className={styles['col-conv__label']}>{label} (0–255)</label>
                <input type="number" className={styles['col-conv__input']} value={val} min={0} max={255}
                  onChange={e => { set(e.target.value); setError(''); }}
                  onBlur={applyFromRgb} onKeyDown={e => e.key === 'Enter' && applyFromRgb()} />
              </div>
            ))}
          </div>
        )}

        {tab === 'hsl' && (
          <div className={styles['col-conv__inputs']}>
            {[
              { label: `${t.h} (0–360)`, val: hslH, set: setHslH },
              { label: `${t.s} (0–100%)`, val: hslS, set: setHslS },
              { label: `${t.l} (0–100%)`, val: hslL, set: setHslL },
            ].map(({ label, val, set }) => (
              <div key={label} className={styles['col-conv__field']}>
                <label className={styles['col-conv__label']}>{label}</label>
                <input type="number" className={styles['col-conv__input']} value={val}
                  onChange={e => { set(e.target.value); setError(''); }}
                  onBlur={applyFromHsl} onKeyDown={e => e.key === 'Enter' && applyFromHsl()} />
              </div>
            ))}
          </div>
        )}

        {error && <p className={styles['col-conv__error']}>{error}</p>}

        <div className={styles['col-conv__preview']} style={{ backgroundColor: previewColor }}>
          <span className={styles['col-conv__preview-label']}>{t.preview}</span>
          <span className={styles['col-conv__preview-hex']}>{hexOut}</span>
        </div>

        <div className={styles['col-conv__outputs']}>
          {[
            { label: 'HEX', value: hexOut, key: 'hex' },
            { label: 'RGB', value: rgbOut, key: 'rgb' },
            { label: 'HSL', value: hslOut, key: 'hsl' },
          ].map(({ label, value, key }) => (
            <div key={key} className={styles['col-conv__output']}>
              <span className={styles['col-conv__output-label']}>{label}</span>
              <span className={styles['col-conv__output-value']}>{value}</span>
              <button type="button" className={styles['col-conv__copy']} onClick={() => copyText(value, key)}>
                {copiedKey === key ? t.copied : t.copy}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
