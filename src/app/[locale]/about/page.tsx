import type { Metadata } from 'next';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

type LocaleContent = {
  title: string;
  description: string;
  h1: string;
  sections: { heading: string; body: string }[];
  contactLinkText: string;
};

const CONTENT: Record<string, LocaleContent> = {
  en: {
    title: 'About Utilixi',
    description: 'Learn about Utilixi — a free collection of online calculators and tools.',
    h1: 'About Utilixi',
    sections: [
      {
        heading: 'What is Utilixi?',
        body: 'Utilixi is a free collection of online tools and calculators designed to help you make smarter decisions — faster. Whether you\'re planning a mortgage, tracking your health, converting currencies, or calculating calories, Utilixi provides accurate, easy-to-use tools at no cost.',
      },
      {
        heading: 'Our mission',
        body: 'We believe useful tools should be free, fast, and accessible to everyone. All calculators on Utilixi work directly in your browser — no registration, no subscriptions, no hidden fees.',
      },
      {
        heading: 'Available in multiple languages',
        body: 'Utilixi is available in English, Russian, Ukrainian, French, and Lithuanian. We aim to make our tools accessible to as many people as possible.',
      },
      {
        heading: 'Data and privacy',
        body: 'All calculations are performed locally in your browser. We do not collect, store, or transmit any data you enter into our calculators. Your inputs never leave your device.',
      },
    ],
    contactLinkText: 'Contact us',
  },
  ru: {
    title: 'О проекте Utilixi',
    description: 'Узнайте об Utilixi — бесплатной коллекции онлайн-калькуляторов и инструментов.',
    h1: 'О проекте Utilixi',
    sections: [
      {
        heading: 'Что такое Utilixi?',
        body: 'Utilixi — это бесплатная коллекция онлайн-инструментов и калькуляторов, которая помогает принимать взвешенные решения быстрее. Ипотека, здоровье, валюты, калории — всё в одном месте, точно и удобно.',
      },
      {
        heading: 'Наша миссия',
        body: 'Мы считаем, что полезные инструменты должны быть бесплатными, быстрыми и доступными всем. Все калькуляторы работают прямо в браузере — без регистрации, подписок и скрытых платежей.',
      },
      {
        heading: 'Несколько языков',
        body: 'Utilixi доступен на английском, русском, украинском, французском и литовском языках. Мы стремимся сделать инструменты доступными для как можно большего числа людей.',
      },
      {
        heading: 'Данные и конфиденциальность',
        body: 'Все вычисления выполняются локально в вашем браузере. Мы не собираем, не храним и не передаём данные, которые вы вводите. Ваши данные никогда не покидают ваше устройство.',
      },
    ],
    contactLinkText: 'Связаться с нами',
  },
  uk: {
    title: 'Про проект Utilixi',
    description: 'Дізнайтесь про Utilixi — безкоштовну колекцію онлайн-калькуляторів та інструментів.',
    h1: 'Про проект Utilixi',
    sections: [
      {
        heading: 'Що таке Utilixi?',
        body: 'Utilixi — це безкоштовна колекція онлайн-інструментів та калькуляторів для прийняття розумних рішень. Іпотека, здоров\'я, валюти, калорії — все в одному місці.',
      },
      {
        heading: 'Наша місія',
        body: 'Ми вважаємо, що корисні інструменти мають бути безкоштовними, швидкими та доступними для всіх. Всі калькулятори працюють прямо у браузері — без реєстрації та прихованих платежів.',
      },
      {
        heading: 'Декілька мов',
        body: 'Utilixi доступний англійською, російською, українською, французькою та литовською мовами.',
      },
      {
        heading: 'Дані та конфіденційність',
        body: 'Всі обчислення виконуються локально у вашому браузері. Ми не збираємо і не зберігаємо дані, які ви вводите. Ваші дані ніколи не залишають ваш пристрій.',
      },
    ],
    contactLinkText: 'Зв\'язатися з нами',
  },
  fr: {
    title: 'À propos d\'Utilixi',
    description: 'Découvrez Utilixi — une collection gratuite de calculatrices et d\'outils en ligne.',
    h1: 'À propos d\'Utilixi',
    sections: [
      {
        heading: 'Qu\'est-ce qu\'Utilixi ?',
        body: 'Utilixi est une collection gratuite d\'outils en ligne et de calculatrices conçus pour vous aider à prendre de meilleures décisions, plus rapidement. Crédit immobilier, santé, devises, calories — tout en un seul endroit.',
      },
      {
        heading: 'Notre mission',
        body: 'Nous croyons que les outils utiles doivent être gratuits, rapides et accessibles à tous. Toutes les calculatrices fonctionnent directement dans votre navigateur — sans inscription, sans abonnement.',
      },
      {
        heading: 'Plusieurs langues',
        body: 'Utilixi est disponible en anglais, russe, ukrainien, français et lituanien. Nous souhaitons rendre nos outils accessibles au plus grand nombre.',
      },
      {
        heading: 'Données et confidentialité',
        body: 'Tous les calculs sont effectués localement dans votre navigateur. Nous ne collectons, ne stockons ni ne transmettons aucune donnée que vous saisissez. Vos données ne quittent jamais votre appareil.',
      },
    ],
    contactLinkText: 'Nous contacter',
  },
  lt: {
    title: 'Apie Utilixi',
    description: 'Sužinokite apie Utilixi — nemokamą internetinių skaičiuotuvų ir įrankių kolekciją.',
    h1: 'Apie Utilixi',
    sections: [
      {
        heading: 'Kas yra Utilixi?',
        body: 'Utilixi — tai nemokamų internetinių įrankių ir skaičiuotuvų kolekcija, padedanti priimti geresnius sprendimus greičiau. Hipoteka, sveikata, valiutos, kalorijos — viskas vienoje vietoje.',
      },
      {
        heading: 'Mūsų misija',
        body: 'Tikime, kad naudingi įrankiai turi būti nemokami, greiti ir prieinami visiems. Visi skaičiuotuvai veikia tiesiogiai jūsų naršyklėje — be registracijos ir paslėptų mokesčių.',
      },
      {
        heading: 'Kelios kalbos',
        body: 'Utilixi pasiekiamas anglų, rusų, ukrainiečių, prancūzų ir lietuvių kalbomis.',
      },
      {
        heading: 'Duomenys ir privatumas',
        body: 'Visi skaičiavimai atliekami vietinėje jūsų naršyklėje. Mes nerenkame, nesaugome ir neplatiname jūsų įvestų duomenų. Jūsų duomenys niekada nepalieka jūsų įrenginio.',
      },
    ],
    contactLinkText: 'Susisiekite su mumis',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.title, description: c.description };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <PageLayout centered>
      <div className={styles.page__content}>
        <h1 className={styles.page__title}>{c.h1}</h1>
        {c.sections.map((s) => (
          <section key={s.heading} className={styles.page__section}>
            <h2 className={styles.page__section_title}>{s.heading}</h2>
            <p className={styles.page__section_text}>{s.body}</p>
          </section>
        ))}
        <p className={styles.page__contact}>
          <Link href={`/${locale}/contact`}>{c.contactLinkText} →</Link>
        </p>
      </div>
    </PageLayout>
  );
}
