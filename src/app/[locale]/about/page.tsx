import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
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
    description: 'Learn about Utilixi — 71 free online calculators and tools across finance, health, legal, esoteric, and more.',
    h1: 'About Utilixi',
    sections: [
      {
        heading: 'What is Utilixi?',
        body: 'Utilixi is a free collection of 71 online tools and calculators built to help you make smarter decisions — faster. We cover finance (mortgage, loans, taxes, insurance), health (BMI, calories, heart rate, pregnancy), legal (alimony, flight delays), real estate, utilities, unit converters, live currency and crypto rates, weather forecasts, and esoteric tools (numerology, biorhythm, zodiac). Everything in one place, at no cost.',
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
    description: 'Узнайте об Utilixi — 71 бесплатный онлайн-калькулятор и инструмент: финансы, здоровье, юридика, эзотерика и не только.',
    h1: 'О проекте Utilixi',
    sections: [
      {
        heading: 'Что такое Utilixi?',
        body: 'Utilixi — это бесплатная коллекция из 71 онлайн-инструмента и калькулятора для принятия взвешенных решений. Финансы (ипотека, кредиты, налоги, страхование), здоровье (ИМТ, калории, ЧСС, беременность), юридические инструменты, недвижимость, конвертеры единиц, актуальные курсы валют и криптовалют, прогноз погоды, а также эзотерические инструменты (нумерология, биоритмы, зодиак) — всё в одном месте, бесплатно.',
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
    description: 'Дізнайтесь про Utilixi — 71 безкоштовний онлайн-калькулятор та інструмент: фінанси, здоров\'я, юридика, езотерика та інше.',
    h1: 'Про проект Utilixi',
    sections: [
      {
        heading: 'Що таке Utilixi?',
        body: 'Utilixi — це безкоштовна колекція з 71 онлайн-інструменту та калькулятора для прийняття розумних рішень. Фінанси (іпотека, кредити, податки, страхування), здоров\'я (ІМТ, калорії, ЧСС, вагітність), юридичні інструменти, нерухомість, конвертери одиниць, актуальні курси валют та криптовалют, прогноз погоди, а також езотеричні інструменти (нумерологія, біоритми, зодіак) — все в одному місці, безкоштовно.',
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
    description: 'Découvrez Utilixi — 71 calculatrices et outils en ligne gratuits : finances, santé, juridique, ésotérisme et plus.',
    h1: 'À propos d\'Utilixi',
    sections: [
      {
        heading: 'Qu\'est-ce qu\'Utilixi ?',
        body: 'Utilixi est une collection gratuite de 71 outils en ligne et calculatrices pour prendre de meilleures décisions. Finances (prêt immobilier, impôts, assurances), santé (IMC, calories, fréquence cardiaque, grossesse), outils juridiques, immobilier, convertisseurs, taux de change et cryptos en direct, météo, ainsi que des outils ésotériques (numérologie, biorythme, zodiaque) — tout en un seul endroit, gratuitement.',
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
    description: 'Sužinokite apie Utilixi — 71 nemokamas internetinis skaičiuotuvas ir įrankis: finansai, sveikata, teisė, ezoterika ir daugiau.',
    h1: 'Apie Utilixi',
    sections: [
      {
        heading: 'Kas yra Utilixi?',
        body: 'Utilixi — tai nemokama 71 internetinio įrankio ir skaičiuotuvo kolekcija, padedanti priimti geresnius sprendimus. Finansai (hipoteka, paskolos, mokesčiai, draudimas), sveikata (KMI, kalorijos, širdies ritmas, nėštumas), teisiniai įrankiai, nekilnojamasis turtas, vienetų keitikliai, valiutų ir kriptovaliutų kursai, orų prognozė bei ezoteriniai įrankiai (numerologija, bioritmas, zodiako ženklai) — viskas vienoje vietoje, nemokamai.',
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
  return buildMetadata(locale, '/about', c);
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
