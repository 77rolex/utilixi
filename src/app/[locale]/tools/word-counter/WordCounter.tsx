'use client';

import { useState, useCallback } from 'react';
import styles from './WordCounter.module.scss';

const L: Record<string, Record<string, string>> = {
  placeholder: { en: 'Paste or type your text here…', ru: 'Вставьте или введите текст здесь…', uk: 'Вставте або введіть текст тут…', fr: 'Collez ou saisissez votre texte ici…', lt: 'Įklijuokite arba įveskite tekstą čia…' },
  words:       { en: 'Words', ru: 'Слов', uk: 'Слів', fr: 'Mots', lt: 'Žodžių' },
  chars:       { en: 'Characters', ru: 'Символов', uk: 'Символів', fr: 'Caractères', lt: 'Simbolių' },
  charsNoSp:   { en: 'Chars (no spaces)', ru: 'Символов (без пробелов)', uk: 'Символів (без пробілів)', fr: 'Caractères (sans espaces)', lt: 'Simbolių (be tarpų)' },
  sentences:   { en: 'Sentences', ru: 'Предложений', uk: 'Речень', fr: 'Phrases', lt: 'Sakinių' },
  paragraphs:  { en: 'Paragraphs', ru: 'Абзацев', uk: 'Абзаців', fr: 'Paragraphes', lt: 'Pastraipų' },
  readTime:    { en: 'Reading Time', ru: 'Время чтения', uk: 'Час читання', fr: 'Temps de lecture', lt: 'Skaitymo laikas' },
  min:         { en: 'min', ru: 'мин', uk: 'хв', fr: 'min', lt: 'min' },
  sec:         { en: 'sec', ru: 'сек', uk: 'сек', fr: 'sec', lt: 'sek' },
  clear:       { en: 'Clear', ru: 'Очистить', uk: 'Очистити', fr: 'Effacer', lt: 'Išvalyti' },
  copy:        { en: 'Copy Text', ru: 'Копировать', uk: 'Копіювати', fr: 'Copier', lt: 'Kopijuoti' },
  copied:      { en: 'Copied!', ru: 'Скопировано!', uk: 'Скопійовано!', fr: 'Copié!', lt: 'Nukopijuota!' },
  density:     { en: 'Top keywords', ru: 'Топ ключевых слов', uk: 'Топ ключових слів', fr: 'Mots-clés les plus fréquents', lt: 'Dažniausi žodžiai' },
};

function t(key: string, locale: string): string {
  return L[key]?.[locale] ?? L[key]?.en ?? key;
}

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const matches = text.match(/[^.!?]*[.!?]+/g);
  return matches ? matches.length : (text.trim().length > 0 ? 1 : 0);
}

function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;
}

function getTopKeywords(text: string, limit = 5): { word: string; count: number }[] {
  if (!text.trim()) return [];
  const STOP = new Set(['the','a','an','and','or','but','in','on','at','to','of','for','is','are','was','were','it','this','that','with','as','be','by','from','not','we','i','you','he','she','they','have','has','had','do','does','did','will','would','can','could','should','may','might','his','her','its','our','your','their','there','then','than','when','if','so','no','up','out','about','что','в','на','не','и','он','она','они','мы','вы','это','как','за','к','от','по','с','у','да','нет','я','а','но','или','же','бы','ли','уже']);
  const freq: Record<string, number> = {};
  text.toLowerCase().replace(/[^a-zа-яёїієґ'\s-]/gi, ' ').split(/\s+/).forEach((w) => {
    if (w.length > 2 && !STOP.has(w)) freq[w] = (freq[w] || 0) + 1;
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

export default function WordCounter({ locale }: { locale: string }) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = countWords(text);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const readingSec = Math.round((words / 200) * 60);
  const readingMin = Math.floor(readingSec / 60);
  const readingSecRem = readingSec % 60;
  const readingTime = readingMin > 0
    ? `${readingMin} ${t('min', locale)} ${readingSecRem} ${t('sec', locale)}`
    : `${readingSec} ${t('sec', locale)}`;

  const keywords = getTopKeywords(text);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <div className={styles['word-counter']}>
      <div className={styles['word-counter__stats']}>
        <div className={styles['word-counter__stat']}>
          <span className={styles['word-counter__stat-num']}>{words.toLocaleString()}</span>
          <span className={styles['word-counter__stat-label']}>{t('words', locale)}</span>
        </div>
        <div className={styles['word-counter__stat']}>
          <span className={styles['word-counter__stat-num']}>{chars.toLocaleString()}</span>
          <span className={styles['word-counter__stat-label']}>{t('chars', locale)}</span>
        </div>
        <div className={styles['word-counter__stat']}>
          <span className={styles['word-counter__stat-num']}>{charsNoSpaces.toLocaleString()}</span>
          <span className={styles['word-counter__stat-label']}>{t('charsNoSp', locale)}</span>
        </div>
        <div className={styles['word-counter__stat']}>
          <span className={styles['word-counter__stat-num']}>{sentences}</span>
          <span className={styles['word-counter__stat-label']}>{t('sentences', locale)}</span>
        </div>
        <div className={styles['word-counter__stat']}>
          <span className={styles['word-counter__stat-num']}>{paragraphs}</span>
          <span className={styles['word-counter__stat-label']}>{t('paragraphs', locale)}</span>
        </div>
        <div className={styles['word-counter__stat']}>
          <span className={styles['word-counter__stat-num']}>{words > 0 ? readingTime : '—'}</span>
          <span className={styles['word-counter__stat-label']}>{t('readTime', locale)}</span>
        </div>
      </div>

      <div className={styles['word-counter__editor']}>
        <textarea
          className={styles['word-counter__textarea']}
          placeholder={t('placeholder', locale)}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label={t('placeholder', locale)}
        />
        <div className={styles['word-counter__actions']}>
          <button
            type="button"
            className={styles['word-counter__btn-copy']}
            onClick={handleCopy}
            disabled={!text}
          >
            {copied ? t('copied', locale) : t('copy', locale)}
          </button>
          <button
            type="button"
            className={styles['word-counter__btn-clear']}
            onClick={() => setText('')}
            disabled={!text}
          >
            {t('clear', locale)}
          </button>
        </div>
      </div>

      {keywords.length > 0 && (
        <div className={styles['word-counter__density']}>
          <p className={styles['word-counter__density-title']}>{t('density', locale)}</p>
          <div className={styles['word-counter__density-list']}>
            {keywords.map(({ word, count }) => (
              <div key={word} className={styles['word-counter__density-item']}>
                <span className={styles['word-counter__density-word']}>{word}</span>
                <span className={styles['word-counter__density-bar-wrap']}>
                  <span
                    className={styles['word-counter__density-bar']}
                    style={{ width: `${Math.min(100, (count / keywords[0].count) * 100)}%` }}
                  />
                </span>
                <span className={styles['word-counter__density-count']}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
