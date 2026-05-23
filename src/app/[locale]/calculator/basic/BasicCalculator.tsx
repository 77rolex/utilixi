'use client';

import { useState } from 'react';
import styles from './BasicCalculator.module.scss';

type Op = '+' | '−' | '×' | '÷';

function fmt(n: number): string {
  if (!isFinite(n)) return 'Error';
  if (Number.isInteger(n) && Math.abs(n) < 1e13) return n.toString();
  return parseFloat(n.toPrecision(10)).toString();
}

function compute(a: number, b: number, op: Op): number {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  return b !== 0 ? a / b : NaN;
}

export default function BasicCalculator({ locale: _locale }: { locale: string }) {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Op | null>(null);
  const [fresh, setFresh] = useState(false);

  function digit(d: string) {
    if (fresh) {
      setDisplay(d === '.' ? '0.' : d);
      setFresh(false);
      return;
    }
    setDisplay(s => {
      if (s === 'Error') return d;
      if (s === '0' && d !== '.') return d;
      if (d === '.' && s.includes('.')) return s;
      if (s.replace('-', '').length >= 12) return s;
      return s + d;
    });
  }

  function handleOp(nextOp: Op) {
    const cur = parseFloat(display);
    if (prev !== null && op && !fresh) {
      const r = compute(prev, cur, op);
      setDisplay(fmt(r));
      setPrev(r);
    } else {
      setPrev(cur);
    }
    setOp(nextOp);
    setFresh(true);
  }

  function equals() {
    if (op === null || prev === null) return;
    const r = compute(prev, parseFloat(display), op);
    setDisplay(fmt(r));
    setPrev(null);
    setOp(null);
    setFresh(true);
  }

  function clear() {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setFresh(false);
  }

  function toggleSign() {
    setDisplay(s => {
      const n = parseFloat(s);
      return isNaN(n) || s === 'Error' ? s : fmt(n * -1);
    });
  }

  function percent() {
    setDisplay(s => {
      const n = parseFloat(s);
      return isNaN(n) ? s : fmt(n / 100);
    });
  }

  const opLine = prev !== null && op ? `${fmt(prev)} ${op}` : ' ';

  return (
    <div className={styles['basic-calc']}>
      <div className={styles['basic-calc__display']}>
        <span className={styles['basic-calc__op-line']}>{opLine}</span>
        <span className={styles['basic-calc__number']}>{display}</span>
      </div>
      <div className={styles['basic-calc__grid']}>
        <button type="button" className={`${styles.btn} ${styles['btn--fn']}`} onClick={clear}>C</button>
        <button type="button" className={`${styles.btn} ${styles['btn--fn']}`} onClick={toggleSign}>±</button>
        <button type="button" className={`${styles.btn} ${styles['btn--fn']}`} onClick={percent}>%</button>
        <button type="button" className={`${styles.btn} ${styles['btn--op']}`} onClick={() => handleOp('÷')}>÷</button>

        {(['7','8','9'] as const).map(d => (
          <button key={d} type="button" className={styles.btn} onClick={() => digit(d)}>{d}</button>
        ))}
        <button type="button" className={`${styles.btn} ${styles['btn--op']}`} onClick={() => handleOp('×')}>×</button>

        {(['4','5','6'] as const).map(d => (
          <button key={d} type="button" className={styles.btn} onClick={() => digit(d)}>{d}</button>
        ))}
        <button type="button" className={`${styles.btn} ${styles['btn--op']}`} onClick={() => handleOp('−')}>−</button>

        {(['1','2','3'] as const).map(d => (
          <button key={d} type="button" className={styles.btn} onClick={() => digit(d)}>{d}</button>
        ))}
        <button type="button" className={`${styles.btn} ${styles['btn--op']}`} onClick={() => handleOp('+')}>+</button>

        <button type="button" className={`${styles.btn} ${styles['btn--zero']}`} onClick={() => digit('0')}>0</button>
        <button type="button" className={styles.btn} onClick={() => digit('.')}>.</button>
        <button type="button" className={`${styles.btn} ${styles['btn--op']}`} onClick={equals}>=</button>
      </div>
    </div>
  );
}
