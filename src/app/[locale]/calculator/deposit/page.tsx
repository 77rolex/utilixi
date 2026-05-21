import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import DepositCalculator from './DepositCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/mortgage', label: 'Mortgage Calculator' },
    { href: '/calculator/loan', label: 'Loan Calculator' },
  ],
  ru: [
    { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' },
    { href: '/calculator/loan', label: 'Калькулятор кредита' },
  ],
  uk: [
    { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' },
    { href: '/calculator/loan', label: 'Калькулятор кредиту' },
  ],
  fr: [
    { href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' },
    { href: '/calculator/loan', label: 'Calculatrice de prêt' },
  ],
  lt: [
    { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' },
    { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Deposit Calculator — Calculate Savings & Interest Online',
    description: 'Free deposit calculator. Calculate the final amount of your bank deposit with compound interest. Choose compounding frequency, currency and term.',
    h1: 'Deposit Calculator',
  },
  ru: {
    title: 'Калькулятор депозита — расчёт вклада с капитализацией',
    description: 'Бесплатный калькулятор депозита онлайн. Рассчитайте итоговую сумму вклада с учётом капитализации процентов. Выберите валюту, ставку и срок.',
    h1: 'Калькулятор депозита',
  },
  uk: {
    title: 'Калькулятор депозиту — розрахунок вкладу з капіталізацією',
    description: 'Безкоштовний калькулятор депозиту онлайн. Розрахуйте підсумкову суму вкладу з урахуванням капіталізації відсотків. Оберіть валюту, ставку та строк.',
    h1: 'Калькулятор депозиту',
  },
  fr: {
    title: 'Calculatrice de Dépôt — Calcul des Intérêts Bancaires',
    description: "Calculatrice de dépôt gratuite. Calculez le montant final de votre dépôt bancaire avec capitalisation des intérêts. Choisissez la fréquence, la devise et la durée.",
    h1: 'Calculatrice de Dépôt',
  },
  lt: {
    title: 'Indėlio Skaičiuotuvas — Palūkanų Skaičiavimas Internete',
    description: 'Nemokamas indėlio skaičiuotuvas. Apskaičiuokite galutinę banko indėlio sumą su sudėtinėmis palūkanomis. Pasirinkite valiutą, normą ir terminą.',
    h1: 'Indėlio Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free deposit calculator shows how your savings grow over time. Enter the initial amount, annual interest rate and term — choose compounding frequency (monthly, quarterly, annually or none) to see the final balance and a year-by-year or month-by-month breakdown.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is compound interest (compounding)?',
        a: 'Compounding means the interest earned each period is added to the principal, so future interest is calculated on a larger balance. For example, with monthly compounding at 12% per year, each month earns 1% on the growing total — resulting in more than 12% effective annual return.',
      },
      {
        q: 'What is the difference between simple and compound interest?',
        a: 'Simple interest (no compounding) is calculated only on the original principal: Interest = Principal × Rate × Time. Compound interest adds earned interest back to the principal, so the balance grows exponentially over time. The longer the term, the larger the difference.',
      },
      {
        q: 'Which compounding frequency is most profitable?',
        a: 'The more frequently interest is compounded, the higher the final amount. Monthly compounding yields slightly more than quarterly, which yields more than annual. The difference becomes significant over long terms (5+ years) or at high interest rates.',
      },
      {
        q: 'How is the annual effective rate calculated?',
        a: 'The effective annual rate (EAR) accounts for compounding: EAR = (1 + r/n)ⁿ − 1, where r is the nominal annual rate and n is the number of compounding periods per year. For example, 12% compounded monthly gives an effective rate of about 12.68%.',
      },
      {
        q: 'Can I use this calculator for any currency?',
        a: 'Yes. The calculator supports RUB, USD, EUR, UAH and PLN. The calculation logic is identical for all currencies — only the display symbol changes. Select your preferred currency in the initial deposit field.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор депозита показывает, как растут ваши сбережения с течением времени. Введите начальную сумму, годовую процентную ставку и срок — выберите периодичность капитализации (ежемесячная, ежеквартальная, ежегодная или без неё) и получите итоговый баланс с детальной разбивкой.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое капитализация процентов?',
        a: 'Капитализация — это начисление процентов на уже накопленные проценты. Например, при ежемесячной капитализации под 12% годовых каждый месяц на счёт начисляется 1% от текущего остатка (а не только от первоначальной суммы). Это даёт больший итоговый доход, чем простые проценты.',
      },
      {
        q: 'Чем простые проценты отличаются от сложных?',
        a: 'Простые проценты (без капитализации) начисляются только на первоначальную сумму: Доход = Сумма × Ставка × Время. Сложные проценты начисляются на постоянно растущий остаток, поэтому доходность выше — особенно при длительных сроках и высоких ставках.',
      },
      {
        q: 'Какая периодичность капитализации выгоднее?',
        a: 'Чем чаще капитализация, тем выше итоговая сумма: ежемесячная выгоднее ежеквартальной, та — выгоднее ежегодной. На коротких сроках разница минимальна, но при сроках от 3–5 лет она становится заметной.',
      },
      {
        q: 'Как рассчитывается итоговая сумма вклада?',
        a: 'Формула сложных процентов: S = P × (1 + r/n)^(n×t), где P — начальная сумма, r — годовая ставка (дробь), n — количество капитализаций в год, t — срок в годах. Для простых процентов: S = P × (1 + r × t).',
      },
      {
        q: 'Учитывает ли калькулятор налог на доход по вкладу?',
        a: 'Нет, калькулятор показывает доход до налогообложения. В России действует налог на процентный доход по вкладам, превышающий необлагаемый минимум. Уточняйте актуальные ставки в вашем банке или налоговой инспекции.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор депозиту показує, як зростають ваші заощадження з плином часу. Введіть початкову суму, річну відсоткову ставку та строк — оберіть periodicity капіталізації та отримайте підсумковий баланс із детальним розбиттям.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке капіталізація відсотків?',
        a: 'Капіталізація — це нарахування відсотків на вже накопичені відсотки. Наприклад, при щомісячній капіталізації під 12% річних щомісяця нараховується 1% від поточного залишку, а не лише від початкової суми. Це дає більший підсумковий дохід.',
      },
      {
        q: 'Чим прості відсотки відрізняються від складних?',
        a: 'Прості відсотки нараховуються лише на початкову суму: Дохід = Сума × Ставка × Час. Складні відсотки нараховуються на зростаючий залишок, що дає вищу дохідність — особливо на тривалих строках.',
      },
      {
        q: 'Яка periodicity капіталізації вигідніша?',
        a: 'Що частіша капіталізація, то вища підсумкова сума: щомісячна вигідніша за щоквартальну, а щоквартальна — за щорічну. На коротких строках різниця мінімальна, але при строках від 3–5 років вона стає помітною.',
      },
      {
        q: 'Як розраховується підсумкова сума вкладу?',
        a: 'Формула складних відсотків: S = P × (1 + r/n)^(n×t), де P — початкова сума, r — річна ставка (дріб), n — кількість капіталізацій на рік, t — строк у роках. Для простих відсотків: S = P × (1 + r × t).',
      },
      {
        q: 'Чи враховує калькулятор податок на дохід від вкладу?',
        a: 'Ні, калькулятор показує дохід до оподаткування. Уточнюйте актуальні ставки оподаткування у вашому банку або податковій службі.',
      },
    ],
  },
  fr: {
    description: "Notre calculatrice de dépôt gratuite montre comment votre épargne fructifie dans le temps. Entrez le montant initial, le taux annuel et la durée — choisissez la fréquence de capitalisation (mensuelle, trimestrielle, annuelle ou sans) pour voir le solde final et la progression détaillée.",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: "Qu'est-ce que la capitalisation des intérêts ?",
        a: "La capitalisation signifie que les intérêts gagnés à chaque période sont ajoutés au capital, de sorte que les intérêts futurs sont calculés sur un solde plus élevé. Par exemple, avec une capitalisation mensuelle à 12 % par an, chaque mois rapporte 1 % sur le total croissant.",
      },
      {
        q: 'Quelle est la différence entre intérêts simples et composés ?',
        a: "Les intérêts simples (sans capitalisation) ne sont calculés que sur le capital initial : Intérêts = Capital × Taux × Temps. Les intérêts composés s'appliquent sur le solde croissant, ce qui produit un rendement exponentiel sur la durée.",
      },
      {
        q: 'Quelle fréquence de capitalisation est la plus rentable ?',
        a: "Plus la capitalisation est fréquente, plus le montant final est élevé. La capitalisation mensuelle rapporte légèrement plus que la trimestrielle, qui rapporte plus que l'annuelle. La différence devient significative sur des durées longues (5 ans et plus).",
      },
      {
        q: 'Comment est calculé le montant final du dépôt ?',
        a: "Formule des intérêts composés : S = P × (1 + r/n)^(n×t), où P est le capital initial, r le taux annuel (en décimal), n le nombre de capitalisations par an et t la durée en années. Pour les intérêts simples : S = P × (1 + r × t).",
      },
      {
        q: 'La calculatrice tient-elle compte des impôts sur les intérêts ?',
        a: "Non, la calculatrice affiche les gains bruts avant impôts. En France, les intérêts sont soumis au prélèvement forfaitaire unique (PFU) de 30 %. Consultez votre banque ou un conseiller fiscal pour les détails.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas indėlio skaičiuotuvas parodo, kaip auga jūsų santaupos laikui bėgant. Įveskite pradinę sumą, metinę palūkanų normą ir terminą — pasirinkite kapitalizacijos dažnumą ir gaukite galutinį balansą su išsamia suvestine.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra palūkanų kapitalizacija?',
        a: 'Kapitalizacija reiškia, kad kiekvienu laikotarpiu uždirbtos palūkanos pridedamos prie pagrindinės sumos, todėl būsimos palūkanos skaičiuojamos nuo didesnio balanso. Pavyzdžiui, esant mėnesinei kapitalizacijai ir 12 % metinei normai, kas mėnesį uždirbama 1 % nuo augančio balanso.',
      },
      {
        q: 'Kuo skiriasi paprastos ir sudėtinės palūkanos?',
        a: 'Paprastos palūkanos skaičiuojamos tik nuo pradinės sumos: Pajamos = Suma × Norma × Laikas. Sudėtinės palūkanos skaičiuojamos nuo augančio balanso, todėl ilgainiui duoda didesnį pelną.',
      },
      {
        q: 'Kuri kapitalizacijos dažnumo parinktis yra pelningiausia?',
        a: 'Kuo dažnesnė kapitalizacija, tuo didesnė galutinė suma. Mėnesinė kapitalizacija duoda šiek tiek daugiau nei ketvirtinė, o ketvirtinė — daugiau nei metinė. Skirtumas tampa reikšmingas ilgais terminais (5 metai ir daugiau).',
      },
      {
        q: 'Kaip apskaičiuojama galutinė indėlio suma?',
        a: 'Sudėtinių palūkanų formulė: S = P × (1 + r/n)^(n×t), kur P — pradinė suma, r — metinė norma (dešimtaine forma), n — kapitalizacijų skaičius per metus, t — terminas metais. Paprastoms palūkanoms: S = P × (1 + r × t).',
      },
      {
        q: 'Ar skaičiuotuvas atsižvelgia į pajamų mokestį?',
        a: 'Ne, skaičiuotuvas rodo pajamas prieš apmokestinimą. Dėl tikslios mokesčių informacijos kreipkitės į savo banką arba mokesčių konsultantą.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/deposit'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DepositPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/deposit`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <DepositCalculator locale={locale} />

        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>

          <AdInline locale={locale} />

          <RelatedTools locale={locale} tools={related} />

          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((item, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{item.q}</h3>
                  <p className={styles.faq__answer}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
