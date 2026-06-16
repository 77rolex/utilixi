'use client';
import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';

const LABELS: Record<string, { toLight: string; toDark: string }> = {
  en: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
  ru: { toLight: 'Светлая тема', toDark: 'Тёмная тема' },
  uk: { toLight: 'Світла тема', toDark: 'Темна тема' },
  fr: { toLight: 'Mode clair', toDark: 'Mode sombre' },
  lt: { toLight: 'Šviesiasis režimas', toDark: 'Tamsusis režimas' },
};

export default function ThemeToggle({ locale }: { locale: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const labels = LABELS[locale] ?? LABELS.en;

  useEffect(() => {
    const getTheme = (): 'light' | 'dark' =>
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    setTheme(getTheme());

    const obs = new MutationObserver(() => setTheme(getTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('utilixi_theme', next);
    setTheme(next);
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === 'dark' ? labels.toLight : labels.toDark}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? labels.toLight : labels.toDark}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
