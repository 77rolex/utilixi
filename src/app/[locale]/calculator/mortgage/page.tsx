import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import MortgageCalculator from './MortgageCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ locale: string }>;
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Mortgage Calculator — Monthly Payment & Total Cost',
    description: 'Free mortgage calculator online. Calculate your monthly payment, total cost, and interest for any loan amount, rate, and term.',
    h1: 'Mortgage Calculator',
  },
  ru: {
    title: 'Ипотечный калькулятор — ежемесячный платёж онлайн',
    description: 'Бесплатный ипотечный калькулятор онлайн. Рассчитайте ежемесячный платёж, переплату и полную стоимость кредита.',
    h1: 'Ипотечный калькулятор',
  },
  uk: {
    title: 'Іпотечний калькулятор — щомісячний платіж онлайн',
    description: 'Безкоштовний іпотечний калькулятор онлайн. Розрахуйте щомісячний платіж, переплату та повну вартість кредиту.',
    h1: 'Іпотечний калькулятор',
  },
  fr: {
    title: 'Calculatrice de Prêt Immobilier — Mensualité en ligne',
    description: 'Calculatrice de prêt immobilier gratuite. Calculez vos mensualités, le coût total et les intérêts pour votre crédit immobilier.',
    h1: 'Calculatrice de Prêt Immobilier',
  },
  lt: {
    title: 'Hipotekos Skaičiuotuvas — mėnesio įmoka internetu',
    description: 'Nemokamas hipotekos skaičiuotuvas internetu. Apskaičiuokite mėnesio įmoką, palūkanas ir bendrą paskolos sumą.',
    h1: 'Hipotekos Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our free mortgage calculator to estimate your monthly payment based on the loan amount, interest rate, and loan term. The calculator uses the standard annuity formula and shows your monthly payment, total repayment amount, and total interest paid over the life of the loan.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is the monthly mortgage payment calculated?', a: 'The monthly payment is calculated using the annuity formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], where P is the loan amount, r is the monthly interest rate, and n is the number of payments.' },
      { q: 'What does the total interest figure mean?', a: 'Total interest is the difference between your total repayment amount and the original loan amount. It shows how much extra you pay for borrowing the money.' },
      { q: 'Does the calculator account for insurance or fees?', a: 'No, this calculator shows only the principal and interest portion of the payment. Additional costs like insurance, property tax, or origination fees are not included.' },
      { q: 'Can I use this calculator for any currency?', a: 'Yes. The formula works the same for any currency. Simply enter your amount in the currency you need.' },
    ],
  },
  ru: {
    description: 'Воспользуйтесь нашим бесплатным ипотечным калькулятором, чтобы рассчитать ежемесячный платёж по кредиту. Калькулятор использует стандартную формулу аннуитета и показывает ежемесячный платёж, общую сумму выплат и переплату за весь срок кредита.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается ежемесячный платёж?', a: 'Ежемесячный платёж рассчитывается по формуле аннуитета: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], где P — сумма кредита, r — месячная ставка, n — количество платежей.' },
      { q: 'Что такое переплата?', a: 'Переплата — это разница между общей суммой выплат и первоначальной суммой кредита. Она показывает, сколько дополнительно вы платите за пользование деньгами банка.' },
      { q: 'Учитывается ли страховка в расчёте?', a: 'Нет, калькулятор рассчитывает только основной долг и проценты. Страховка, налоги и другие сборы не включены.' },
      { q: 'Можно ли использовать калькулятор для любой валюты?', a: 'Да. Формула одинакова для любой валюты. Просто введите сумму в нужной вам валюте.' },
    ],
  },
  uk: {
    description: 'Скористайтесь нашим безкоштовним іпотечним калькулятором для розрахунку щомісячного платежу за кредитом. Калькулятор використовує стандартну формулу ануїтету та показує щомісячний платіж, загальну суму виплат і переплату.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується щомісячний платіж?', a: 'Щомісячний платіж розраховується за формулою ануїтету: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], де P — сума кредиту, r — місячна ставка, n — кількість платежів.' },
      { q: 'Що таке переплата?', a: 'Переплата — це різниця між загальною сумою виплат і початковою сумою кредиту.' },
      { q: 'Чи враховується страховка?', a: 'Ні, калькулятор розраховує лише основний борг і відсотки. Страховка та інші збори не включені.' },
      { q: 'Чи можна використовувати для будь-якої валюти?', a: 'Так. Формула однакова для будь-якої валюти.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de prêt immobilier gratuite pour estimer vos mensualités. La calculatrice utilise la formule d\'amortissement standard et affiche votre mensualité, le montant total remboursé et le coût total des intérêts.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment est calculée la mensualité ?', a: 'La mensualité est calculée selon la formule d\'amortissement : M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], où P est le montant emprunté, r le taux mensuel et n le nombre de mensualités.' },
      { q: 'Que signifie le coût total des intérêts ?', a: 'C\'est la différence entre le total remboursé et le montant initialement emprunté. Il représente le coût réel du crédit.' },
      { q: 'L\'assurance est-elle incluse ?', a: 'Non, cette calculatrice n\'inclut que le capital et les intérêts. L\'assurance emprunteur et les frais de dossier ne sont pas pris en compte.' },
      { q: 'Puis-je utiliser cette calculatrice pour n\'importe quelle devise ?', a: 'Oui. La formule est identique pour toutes les devises.' },
    ],
  },
  lt: {
    description: 'Naudokite mūsų nemokamą hipotekos skaičiuotuvą, kad apskaičiuotumėte mėnesio įmoką pagal paskolos sumą, palūkanų normą ir terminą. Skaičiuotuvas naudoja standartinę anuiteto formulę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojama mėnesio įmoka?', a: 'Mėnesio įmoka apskaičiuojama pagal anuiteto formulę: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], kur P — paskolos suma, r — mėnesinė norma, n — mokėjimų skaičius.' },
      { q: 'Ką reiškia bendra palūkanų suma?', a: 'Tai skirtumas tarp bendros grąžinamos sumos ir pradinės paskolos sumos.' },
      { q: 'Ar draudimas įtrauktas į skaičiavimą?', a: 'Ne, skaičiuotuvas rodo tik pagrindinę dalį ir palūkanas.' },
      { q: 'Ar galiu naudoti bet kuriai valiutai?', a: 'Taip. Formulė yra vienoda visoms valiutoms.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => {
    alternates[l] = `https://utilixi.com/${l}/calculator/mortgage`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: alternates,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MortgagePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/mortgage`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <MortgageCalculator locale={locale} />

        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>

          <AdInline locale={locale} />

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
