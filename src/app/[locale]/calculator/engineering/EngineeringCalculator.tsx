'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './EngineeringCalculator.module.scss';

const L: Record<string, Record<string, string>> = {
  deg:     { en: 'DEG', ru: 'ГРД', uk: 'ГРД', fr: 'DEG', lt: 'LAIP' },
  rad:     { en: 'RAD', ru: 'РАД', uk: 'РАД', fr: 'RAD', lt: 'RAD' },
  error:   { en: 'Error', ru: 'Ошибка', uk: 'Помилка', fr: 'Erreur', lt: 'Klaida' },
  history: { en: 'History', ru: 'История', uk: 'Історія', fr: 'Historique', lt: 'Istorija' },
};

function tl(key: string, locale: string) {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

type Token = { dis: string; js: string };
type HistoryItem = { expr: string; result: string };

// Allow digits, lowercase fn names, operators, parens, modulo, comma (for multi-arg fns)
const SAFE_EXPR = /^[0-9a-z.+\-*/()%,]+$/;

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
  const sinh  = Math.sinh;
  const cosh  = Math.cosh;
  const tanh  = Math.tanh;
  const log10 = Math.log10;
  const log2  = Math.log2;
  const ln    = Math.log;
  const sqrt  = Math.sqrt;
  const cbrt  = Math.cbrt;
  const exp   = Math.exp;
  const pow10 = (x: number) => Math.pow(10, x);
  const abs   = Math.abs;
  const floor = Math.floor;
  const ceil  = Math.ceil;
  const round = Math.round;
  const fact  = (n: number) => {
    if (!Number.isInteger(n) || n < 0) return NaN;
    if (n > 170) return Infinity;
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  };
  const pi  = Math.PI;
  const e   = Math.E;
  const phi = (1 + Math.sqrt(5)) / 2;
  try {
    // eslint-disable-next-line no-new-func
    const val = new Function(
      'sin','cos','tan','asin','acos','atan',
      'sinh','cosh','tanh',
      'log10','log2','ln','sqrt','cbrt','exp','pow10',
      'abs','floor','ceil','round','fact',
      'pi','e','phi',
      `"use strict"; return (${jsExpr});`
    )(sin, cos, tan, asin, acos, atan,
      sinh, cosh, tanh,
      log10, log2, ln, sqrt, cbrt, exp, pow10,
      abs, floor, ceil, round, fact,
      pi, e, phi);
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
  const [ansValue, setAnsValue] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const disStr = tokens.map(tk => tk.dis).join('');
  const jsStr  = tokens.map(tk => tk.js).join('');
  const OPS = new Set(['+', '-', '*', '/', '**', '%']);

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

  function doEquals() {
    if (!jsStr) return;
    const r = calcResult(jsStr, isRad);
    setResult(r);
    setLastExpr(disStr);
    setTokens([]);
    setJustComputed(true);
    if (r !== 'Error' && r !== '∞' && r !== '') {
      setAnsValue(r);
      setHistory(prev => [{ expr: disStr, result: r }, ...prev].slice(0, 5));
    }
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

  function insertAns() {
    if (ansValue === null) return;
    if (justComputed) {
      setTokens([{ dis: ansValue, js: ansValue }]);
      setResult('');
      setJustComputed(false);
    } else {
      setTokens(ts => [...ts, { dis: ansValue, js: ansValue }]);
    }
  }

  // Keep a ref to the latest state so the keyboard handler doesn't go stale
  const stateRef = useRef({ tokens, result, justComputed, isRad });
  useEffect(() => {
    stateRef.current = { tokens, result, justComputed, isRad };
  });

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const { tokens, result, justComputed, isRad } = stateRef.current;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      function doPush(dis: string, js: string, isOp = false) {
        if (justComputed) {
          if (isOp && result && result !== 'Error') {
            setTokens([{ dis: result, js: result }, { dis, js }]);
          } else {
            setTokens([{ dis, js }]);
          }
          setResult('');
          setJustComputed(false);
        } else {
          setTokens(ts => [...ts, { dis, js }]);
        }
      }

      if (e.key >= '0' && e.key <= '9') { e.preventDefault(); doPush(e.key, e.key); }
      else if (e.key === '.') { e.preventDefault(); doPush('.', '.'); }
      else if (e.key === '+') { e.preventDefault(); doPush('+', '+', true); }
      else if (e.key === '-') { e.preventDefault(); doPush('−', '-', true); }
      else if (e.key === '*') { e.preventDefault(); doPush('×', '*', true); }
      else if (e.key === '/') { e.preventDefault(); doPush('÷', '/', true); }
      else if (e.key === '(') { e.preventDefault(); doPush('(', '('); }
      else if (e.key === ')') { e.preventDefault(); doPush(')', ')'); }
      else if (e.key === 'Backspace') {
        e.preventDefault();
        if (justComputed) {
          setTokens([]); setResult(''); setLastExpr(''); setJustComputed(false);
        } else {
          setTokens(ts => ts.slice(0, -1));
        }
      }
      else if (e.key === 'Escape') {
        e.preventDefault();
        setTokens([]); setResult(''); setLastExpr(''); setJustComputed(false);
      }
      else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        const js = tokens.map(tk => tk.js).join('');
        const dis = tokens.map(tk => tk.dis).join('');
        if (!js) return;
        const r = calcResult(js, isRad);
        setResult(r);
        setLastExpr(dis);
        setTokens([]);
        setJustComputed(true);
        if (r !== 'Error' && r !== '∞' && r !== '') {
          setAnsValue(r);
          setHistory(prev => [{ expr: dis, result: r }, ...prev].slice(0, 5));
        }
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []); // mount once — reads fresh state via stateRef

  const SCI_ROWS: BtnDef[][] = [
    [
      { label: 'sin',    dis: 'sin(',    js: 'sin('    },
      { label: 'cos',    dis: 'cos(',    js: 'cos('    },
      { label: 'tan',    dis: 'tan(',    js: 'tan('    },
      { label: 'sinh',   dis: 'sinh(',   js: 'sinh('   },
      { label: 'cosh',   dis: 'cosh(',   js: 'cosh('   },
    ],
    [
      { label: 'sin⁻¹', dis: 'asin(',   js: 'asin('   },
      { label: 'cos⁻¹', dis: 'acos(',   js: 'acos('   },
      { label: 'tan⁻¹', dis: 'atan(',   js: 'atan('   },
      { label: 'tanh',   dis: 'tanh(',   js: 'tanh('   },
      { label: 'abs',    dis: 'abs(',    js: 'abs('    },
    ],
    [
      { label: 'log',   dis: 'log(',    js: 'log10('  },
      { label: 'ln',    dis: 'ln(',     js: 'ln('     },
      { label: 'log₂',  dis: 'log2(',   js: 'log2('   },
      { label: '√',     dis: '√(',      js: 'sqrt('   },
      { label: '∛',     dis: '∛(',      js: 'cbrt('   },
    ],
    [
      { label: 'x²',    dis: '²',       js: '**2'     },
      { label: 'xⁿ',   dis: '^',       js: '**'      },
      { label: 'eˣ',   dis: 'exp(',    js: 'exp('    },
      { label: '10ˣ',  dis: '10^(',    js: 'pow10('  },
      { label: 'n!',   dis: 'fact(',   js: 'fact('   },
    ],
    [
      { label: '1/x',  dis: '1/(',     js: '1/('     },
      { label: '⌊x⌋',  dis: 'floor(',  js: 'floor('  },
      { label: '⌈x⌉',  dis: 'ceil(',   js: 'ceil('   },
      { label: 'rnd',  dis: 'round(',  js: 'round('  },
      { label: 'mod',  dis: 'mod',     js: '%'       },
    ],
    [
      { label: 'π',    dis: 'π',       js: 'pi'      },
      { label: 'e',    dis: 'e',       js: 'e'       },
      { label: 'φ',    dis: 'φ',       js: 'phi'     },
      { label: 'Ans',  action: 'ans',  cls: 'fn'     },
      { label: 'C',    action: 'clear', cls: 'fn'    },
    ],
  ];

  const MAIN_ROWS: BtnDef[][] = [
    [
      { label: isRad ? tl('rad', locale) : tl('deg', locale), action: 'toggleAngle', cls: 'fn' },
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
        case 'equals':      doEquals(); break;
        case 'toggleAngle': setIsRad(r => !r); break;
        case 'toggleSign':  toggleSign(); break;
        case 'ans':         insertAns(); break;
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
        <span className={styles['eng-calc__expr']}>{exprLine || ' '}</span>
        <span className={`${styles['eng-calc__number']} ${isError ? styles['eng-calc__number--error'] : ''}`}>
          {isError ? tl('error', locale) : mainDisplay}
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

      {history.length > 0 && (
        <div className={styles['eng-calc__history']}>
          <p className={styles['eng-calc__history-title']}>{tl('history', locale)}</p>
          {history.map((item, i) => (
            <button
              key={i}
              type="button"
              className={styles['eng-calc__history-item']}
              onClick={() => {
                setTokens([{ dis: item.result, js: item.result }]);
                setResult('');
                setJustComputed(false);
              }}
            >
              <span className={styles['eng-calc__history-expr']}>{item.expr} =</span>
              <span className={styles['eng-calc__history-result']}>{item.result}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
