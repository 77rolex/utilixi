import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ContactForm from './ContactForm';
import PageLayout from '@/components/layout/PageLayout';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Contact Us',
    description: 'Get in touch with the Utilixi team. We respond to all messages.',
    h1: 'Contact Us',
    subtitle: 'Have a question or suggestion? Send us a message and we will get back to you.',
  },
  ru: {
    title: 'Связаться с нами',
    description: 'Свяжитесь с командой Utilixi. Мы отвечаем на все сообщения.',
    h1: 'Связаться с нами',
    subtitle: 'Есть вопрос или предложение? Напишите нам — мы ответим.',
  },
  uk: {
    title: 'Зв\'язатися з нами',
    description: 'Зв\'яжіться з командою Utilixi. Ми відповідаємо на всі повідомлення.',
    h1: 'Зв\'язатися з нами',
    subtitle: 'Маєте питання або пропозицію? Напишіть нам — ми відповімо.',
  },
  fr: {
    title: 'Nous contacter',
    description: 'Contactez l\'équipe Utilixi. Nous répondons à tous les messages.',
    h1: 'Nous contacter',
    subtitle: 'Une question ou une suggestion ? Envoyez-nous un message, nous vous répondrons.',
  },
  lt: {
    title: 'Susisiekite su mumis',
    description: 'Susisiekite su Utilixi komanda. Mes atsakome į visas žinutes.',
    h1: 'Susisiekite su mumis',
    subtitle: 'Turite klausimą ar pasiūlymą? Parašykite mums — atsakysime.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/contact') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return (
    <PageLayout centered>
      <h1 className={styles.page__title}>{meta.h1}</h1>
      <p className={styles.page__subtitle}>{meta.subtitle}</p>
      <ContactForm locale={locale} />
    </PageLayout>
  );
}
