'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ContactForm.module.scss';

type Locale = 'en' | 'ru' | 'uk' | 'fr' | 'lt';

const T: Record<Locale, {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successTitle: string;
  successText: string;
  errorDefault: string;
}> = {
  en: {
    name: 'Your name',
    namePlaceholder: 'John Smith',
    email: 'Email address',
    emailPlaceholder: 'you@example.com',
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    send: 'Send message',
    sending: 'Sending...',
    successTitle: 'Message sent!',
    successText: 'Thank you. We will get back to you shortly.',
    errorDefault: 'Something went wrong. Please try again.',
  },
  ru: {
    name: 'Ваше имя',
    namePlaceholder: 'Иван Иванов',
    email: 'Email адрес',
    emailPlaceholder: 'you@example.com',
    message: 'Сообщение',
    messagePlaceholder: 'Напишите ваше сообщение...',
    send: 'Отправить',
    sending: 'Отправка...',
    successTitle: 'Сообщение отправлено!',
    successText: 'Спасибо. Мы ответим вам в ближайшее время.',
    errorDefault: 'Что-то пошло не так. Попробуйте ещё раз.',
  },
  uk: {
    name: 'Ваше ім\'я',
    namePlaceholder: 'Іван Іванов',
    email: 'Email адреса',
    emailPlaceholder: 'you@example.com',
    message: 'Повідомлення',
    messagePlaceholder: 'Напишіть ваше повідомлення...',
    send: 'Надіслати',
    sending: 'Надсилання...',
    successTitle: 'Повідомлення надіслано!',
    successText: 'Дякуємо. Ми відповімо вам найближчим часом.',
    errorDefault: 'Щось пішло не так. Спробуйте ще раз.',
  },
  fr: {
    name: 'Votre nom',
    namePlaceholder: 'Jean Dupont',
    email: 'Adresse e-mail',
    emailPlaceholder: 'vous@exemple.com',
    message: 'Message',
    messagePlaceholder: 'Écrivez votre message ici...',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    successTitle: 'Message envoyé !',
    successText: 'Merci. Nous vous répondrons dans les plus brefs délais.',
    errorDefault: 'Une erreur est survenue. Veuillez réessayer.',
  },
  lt: {
    name: 'Jūsų vardas',
    namePlaceholder: 'Jonas Jonaitis',
    email: 'El. pašto adresas',
    emailPlaceholder: 'jusu@pavyzdys.lt',
    message: 'Žinutė',
    messagePlaceholder: 'Rašykite savo žinutę čia...',
    send: 'Siųsti žinutę',
    sending: 'Siunčiama...',
    successTitle: 'Žinutė išsiųsta!',
    successText: 'Ačiū. Netrukus su jumis susisieksime.',
    errorDefault: 'Kažkas nutiko. Bandykite dar kartą.',
  },
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: object) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

type Props = { locale: string };

export default function ContactForm({ locale }: Props) {
  const l: Locale = (locale as Locale) in T ? (locale as Locale) : 'en';
  const t = T[l];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>('');
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  const initTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileRef.current || !siteKey) return;
    if (widgetIdRef.current) {
      try { window.turnstile.remove(widgetIdRef.current); } catch {}
    }
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
      theme: 'light',
    });
  }, [siteKey]);

  useEffect(() => {
    if (document.querySelector('script[src*="turnstile"]')) {
      if (window.turnstile) initTurnstile();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => initTurnstile();
    document.head.appendChild(script);
  }, [initTurnstile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!turnstileToken) {
      setStatus('error');
      setErrorMsg('Please complete the CAPTCHA.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          turnstileToken,
          website: '', // honeypot — always empty for real users
        }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        throw new Error(data.error || t.errorDefault);
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t.errorDefault);
      // Reset turnstile on error
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken('');
      }
    }
  }

  if (status === 'success') {
    return (
      <div className={styles['contact-form__success']}>
        <span className={styles['contact-form__success-icon']}>✓</span>
        <h2 className={styles['contact-form__success-title']}>{t.successTitle}</h2>
        <p className={styles['contact-form__success-text']}>{t.successText}</p>
      </div>
    );
  }

  return (
    <form className={styles['contact-form']} onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users, bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        readOnly
      />

      <div className={styles['contact-form__field']}>
        <label className={styles['contact-form__label']} htmlFor="cf-name">
          {t.name}
        </label>
        <input
          id="cf-name"
          className={styles['contact-form__input']}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          maxLength={100}
          required
          autoComplete="name"
        />
      </div>

      <div className={styles['contact-form__field']}>
        <label className={styles['contact-form__label']} htmlFor="cf-email">
          {t.email}
        </label>
        <input
          id="cf-email"
          className={styles['contact-form__input']}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          maxLength={254}
          required
          autoComplete="email"
        />
      </div>

      <div className={styles['contact-form__field']}>
        <label className={styles['contact-form__label']} htmlFor="cf-message">
          {t.message}
        </label>
        <textarea
          id="cf-message"
          className={styles['contact-form__textarea']}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          maxLength={5000}
          rows={5}
          required
        />
      </div>

      <div ref={turnstileRef} className={styles['contact-form__captcha']} />

      {status === 'error' && errorMsg && (
        <p className={styles['contact-form__error']}>{errorMsg}</p>
      )}

      <button
        className={styles['contact-form__btn']}
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? t.sending : t.send}
      </button>
    </form>
  );
}
