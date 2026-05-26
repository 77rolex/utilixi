'use client';

import { useState } from 'react';
import styles from './EngineeringCalculator.module.scss';

const L: Record<string, Record<string, string>> = {
  deg:   { en: 'DEG', ru: 'ГРД', uk: 'ГРД', fr: 'DEG', lt: 'LAIP' },
  rad:   { en: 'RAD', ru: 'РАД', uk: 'РАД', fr: 'RAD', lt: 'RAD' },
  error: { en: 'Error', ru: 'Ошибка', uk: 'Помилка', fr: 'Erreur', lt: 'Klaida' },
};

function t(key: string, locale: string) {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Token = { dis: string; js: string };

const SAFE_EXPR = /^[0-9a-z.+\-*/()]+$/;

function calcResult(jsExpr: string, isRad: boolean): string {
  if (!jsExpr.trim()) return '';
  if (!SAFE_EXPR.test(jsExpr.replace(/\s/g, ''))) return 'Error';
  const DEG = Math.PI / 180;
  const sin   = isRad ? Math.sin   : (x: number) => Math.sin(x * DEG);
  const cos   = isRad ? Math.cos   : (x: number) => Math.cos(x * DEG);
  const tan   = isRad ? Math.tan   : (x: number) => Math.tan(x * DEG);
  const asin  = isRad ? Math.asin  : (x: number) => Math.asin(x) / DEG;
  const acos  = isRad ? Math.acos  : (x: number) => Math.acos(x) / DEG;
  const atan  = isRad ? Math.atan  : (x: number) => Math.atan(x) / DEG;
  const log10 = Math.log10;
  const ln    = Math.log;
  const sqrt  = Math.sqrt;
  const exp   = Math.exp;
  const pow10 = (x: number) => Math.pow(10, x);
  const fact  = (n: number) => {
    if (!Number.isInteger(n) || n < 0) return NaN;
    if (n > 170) return Infinity;
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  };
  const pi = Math.PI;
  const e  = Math.E;
  try {
    // eslint-disable-next-line no-new-func
    const val = new Function(
      'sin','cos','tan','asin','acos','atan',
      'log10','ln','sqrt','exp','pow10','fact','pi','e',
      `"use strict"; return (${jsExpr});`
    )(sin, cos, tan, asin, acos, atan, log10, ln, sqrt, exp, pow10, fact, pi, e);
    if (typeof val !== 'number') return 'Error';
    if (isNaN(val)) return 'Error';
    if (!isFinite(val)) return '∞';
    if (Number.isInteger(val) && Math.abs(val) < 1e13) return val.toString();
    return parseFloat(val.toPrecision(10)).toString();
  } catch {
    return 'Error';
  }
}

type BtnNormal = { label: string; dis: string; js: string; cls?: string };
type BtnAction = { label: string; action: string; cls?: string };
type BtnDef = BtnNormal | BtnAction;

function isAction(b: BtnDef): b is BtnAction { return 'action' in b; }

export default function EngineeringCalculator({ locale }: { locale: string }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [result, setResult] = useState('');
  const [lastExpr, setLastExpr] = useState('');
  const [isRad, setIsRad] = useState(false);
  const [justComputed, setJustComputed] = useState(false);

  const disStr = tokens.map(tk => tk.dis).join('');
  const jsStr  = tokens.map(tk => tk.js).join('');

  const OPS = new Set(['+', '-', '*', '/', '**']);

  function push(dis: string, js: string, isOp = false) {
    if (justComputed) {
      if (isOp && result && result !== 'Error') {
        setTokens([{ dis: result, js: result }, { dis, js }]);
      } else {
        setTokens([{ dis, js }]);
      }
      setResult('');
      setJustComputed(false);
      return;
    }
    setTokens(ts => [...ts, { dis, js }]);
  }

  function clear() {
    setTokens([]);
    setResult('');
    setLastExpr('');
    setJustComputed(false);
  }

  function backspace() {
    if (justComputed) { clear(); return; }
    setTokens(ts => ts.slice(0, -1));
  }

  function equals() {
    if (!jsStr) return;
    const r = calcResult(jsStr, isRad);
    setResult(r);
    setLastExpr(disStr);
    setTokens([]);
    setJustComputed(true);
  }

  function toggleSign() {
    if (justComputed && result && result !== 'Error') {
      const n = parseFloat(result);
      if (!isNaN(n)) { setResult((-n).toString()); return; }
    }
    if (tokens.length > 0) {
      setTokens(ts => [{ dis: '-(', js: '-(' }, ...ts, { dis: ')', js: ')' }]);
    }
  }

  const SCI_ROWS: BtnDef[][] = [
    [
      { label: 'sin',    dis: 'sin(',    js: 'sin('    },
      { label: 'cos',    dis: 'cos(',    js: 'cos('    },
      { label: 'tan',    dis: 'tan(',    js: 'tan('    },
      { label: 'sin⁻¹', dis: 'sin⁻¹(', js: 'asin('   },
      { label: 'cos⁻¹', dis: 'cos⁻¹(', js: 'acos('   },
    ],
    [
      { label: 'tan⁻¹', dis: 'tan⁻¹(', js: 'atan('   },
      { label: 'log',   dis: 'log(',    js: 'log10('  },
      { label: 'ln',    dis: 'ln(',     js: 'ln('     },
      { label: '√',     dis: '√(',      js: 'sqrt('   },
      { label: 'x²',    dis: '²',       js: '**2'     },
    ],
    [
      { label: 'xⁿ',   dis: '^',       js: '**'      },
      { label: 'eˣ',   dis: 'exp(',    js: 'exp('    },
      { label: '10ˣ',  dis: '10^(',    js: 'pow10('  },
      { label: 'n!',   dis: 'fact(',   js: 'fact('   },
      { label: '1/x',  dis: '1/(',     js: '1/('     },
    ],
    [
      { label: 'π',    dis: 'π',       js: 'pi'      },
      { label: 'e',    dis: 'e',       js: 'e'       },
      { label: '(',    dis: '(',       js: '('       },
      { label: ')',    dis: ')',       js: ')'       },
      { label: 'C',   action: 'clear', cls: 'fn'    },
    ],
  ];

  const MAIN_ROWS: BtnDef[][] = [
    [
      { label: isRad ? t('rad', locale) : t('deg', locale), action: 'toggleAngle', cls: 'fn' },
      { label: '%',   dis: '%',  js: '/100' },
      { label: '⌫',  action: 'backspace', cls: 'fn' },
      { label: '÷',   dis: '÷',  js: '/',   cls: 'op' },
    ],
    [
      { label: '7',  dis: '7',  js: '7' },
      { label: '8',  dis: '8',  js: '8' },
      { label: '9',  dis: '9',  js: '9' },
      { label: '×',  dis: '×',  js: '*',  cls: 'op' },
    ],
    [
      { label: '4',  dis: '4',  js: '4' },
      { label: '5',  dis: '5',  js: '5' },
      { label: '6',  dis: '6',  js: '6' },
      { label: '−',  dis: '−',  js: '-',  cls: 'op' },
    ],
    [
      { label: '1',  dis: '1',  js: '1' },
      { label: '2',  dis: '2',  js: '2' },
      { label: '3',  dis: '3',  js: '3' },
      { label: '+',  dis: '+',  js: '+',  cls: 'op' },
    ],
    [
      { label: '±',  action: 'toggleSign', cls: 'fn' },
      { label: '0',  dis: '0',  js: '0',  cls: 'zero' },
      { label: '.',  dis: '.',  js: '.'  },
      { label: '=',  action: 'equals', cls: 'eq' },
    ],
  ];

  function handleBtn(btn: BtnDef) {
    if (isAction(btn)) {
      switch (btn.action) {
        case 'clear':       clear(); break;
        case 'backspace':   backspace(); break;
        case 'equals':      equals(); break;
        case 'toggleAngle': setIsRad(r => !r); break;
        case 'toggleSign':  toggleSign(); break;
      }
      return;
    }
    push(btn.dis, btn.js, OPS.has(btn.js));
  }

  const mainDisplay = justComputed ? result : (disStr || '0');
  const exprLine = justComputed ? lastExpr : '';
  const isError = mainDisplay === 'Error';

  return (
    <div className={styles['eng-calc']}>
      <div className={styles['eng-calc__display']}>
        <span className={styles['eng-calc__expr']}>{exprLine || ' '}</span>
        <span className={`${styles['eng-calc__number']} ${isError ? styles['eng-calc__number--error'] : ''}`}>
          {isError ? t('error', locale) : mainDisplay}
        </span>
      </div>

      <div className={styles['eng-calc__sci-grid']}>
        {SCI_ROWS.flat().map((btn, i) => {
          const cls = [
            styles['eng-calc__sci-btn'],
            !isAction(btn) && btn.cls ? styles[`eng-calc__sci-btn--${btn.cls}`] : '',
            isAction(btn) && btn.cls ? styles[`eng-calc__sci-btn--${btn.cls}`] : '',
          ].filter(Boolean).join(' ');
          return (
            <button key={i} type="button" className={cls} onClick={() => handleBtn(btn)}>
              {btn.label}
            </button>
          );
        })}
      </div>

      <div className={styles['eng-calc__main-grid']}>
        {MAIN_ROWS.flat().map((btn, i) => {
          const cls = [
            styles['eng-calc__btn'],
            !isAction(btn) && btn.cls ? styles[`eng-calc__btn--${btn.cls}`] : '',
            isAction(btn) && btn.cls ? styles[`eng-calc__btn--${btn.cls}`] : '',
          ].filter(Boolean).join(' ');
          return (
            <button key={i} type="button" className={cls} onClick={() => handleBtn(btn)}>
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
