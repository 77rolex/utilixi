import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import LoanCalculator from './LoanCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Loan Calculator — Monthly Payment & Total Cost',
    description: 'Free online loan calculator. Calculate your monthly payment, total repayment, and interest for any personal loan.',
    h1: 'Loan Calculator',
  },
  ru: {
    title: 'Калькулятор кредита — ежемесячный платёж онлайн',
    description: 'Бесплатный калькулятор кредита онлайн. Рассчитайте ежемесячный платёж, общую сумму выплат и переплату по потребительскому кредиту.',
    h1: 'Калькулятор кредита',
  },
  uk: {
    title: 'Калькулятор кредиту — щомісячний платіж онлайн',
    description: 'Безкоштовний калькулятор кредиту онлайн. Розрахуйте щомісячний платіж та переплату за споживчим кредитом.',
    h1: 'Калькулятор кредиту',
  },
  fr: {
    title: 'Calculatrice de Prêt — Mensualité en ligne',
    description: 'Calculatrice de prêt personnel gratuite. Calculez vos mensualités, le total remboursé et le coût des intérêts.',
    h1: 'Calculatrice de Prêt',
  },
  lt: {
    title: 'Paskolos Skaičiuotuvas — mėnesio įmoka internetu',
    description: 'Nemokamas paskolos skaičiuotuvas. Apskaičiuokite mėnesio įmoką, bendrą sumą ir palūkanas bet kuriai paskolai.',
    h1: 'Paskolos Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our free loan calculator to estimate your monthly payment for a personal loan. Enter the loan amount, annual interest rate, and repayment period to instantly see your monthly payment, total amount repaid, and total interest paid.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is the difference between a loan and a mortgage calculator?',
        a: 'A mortgage calculator is designed for long-term real estate loans (typically 10–30 years) and may include property tax and insurance. A loan calculator is for shorter-term personal or consumer loans (typically 3–84 months) with no additional fees.',
      },
      {
        q: 'How is the monthly loan payment calculated?',
        a: 'The monthly payment uses the annuity formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments.',
      },
      {
        q: 'What affects the total interest paid?',
        a: 'Three factors: loan amount (higher = more interest), interest rate (higher = more interest), and repayment term (longer = more interest, even though monthly payments are lower).',
      },
      {
        q: 'Is a shorter or longer loan term better?',
        a: 'Shorter term means higher monthly payments but less total interest. Longer term means lower monthly payments but more total interest. The best choice depends on your budget and financial goals.',
      },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором кредита, чтобы рассчитать ежемесячный платёж по потребительскому кредиту. Введите сумму, годовую ставку и срок — и получите ежемесячный платёж, общую сумму выплат и переплату.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'В чём разница между кредитным и ипотечным калькулятором?',
        a: 'Ипотечный калькулятор рассчитан на долгосрочные займы на недвижимость (10–30 лет). Кредитный калькулятор — для краткосрочных потребительских кредитов (3–84 месяца) без дополнительных расходов.',
      },
      {
        q: 'Как рассчитывается ежемесячный платёж?',
        a: 'Платёж рассчитывается по формуле аннуитета: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], где P — сумма кредита, r — месячная ставка (годовая ÷ 12), n — количество платежей.',
      },
      {
        q: 'Что влияет на размер переплаты?',
        a: 'Три фактора: сумма кредита (больше = больше переплата), процентная ставка (выше = больше переплата), срок кредита (длиннее = больше переплата, даже при меньшем платеже).',
      },
      {
        q: 'Что лучше — короткий или длинный срок кредита?',
        a: 'Короткий срок — выше платёж, меньше переплата. Длинный срок — ниже платёж, но больше суммарная переплата. Выбор зависит от вашего бюджета.',
      },
    ],
  },
  uk: {
    description: 'Скористайтесь безкоштовним калькулятором кредиту для розрахунку щомісячного платежу. Введіть суму, річну ставку та термін — і отримайте платіж, загальну суму та переплату.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'У чому різниця між кредитним та іпотечним калькулятором?',
        a: 'Іпотечний калькулятор призначений для довгострокових позик на нерухомість. Кредитний — для короткострокових споживчих кредитів (3–84 місяці).',
      },
      {
        q: 'Як розраховується щомісячний платіж?',
        a: 'Платіж розраховується за формулою ануїтету: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], де P — сума кредиту, r — місячна ставка, n — кількість платежів.',
      },
      {
        q: 'Що впливає на переплату?',
        a: 'Сума кредиту, відсоткова ставка та термін. Довший термін — менший платіж, але більша загальна переплата.',
      },
      {
        q: 'Що краще — короткий чи довгий термін?',
        a: 'Короткий термін — більший платіж, менша переплата. Довгий — менший платіж, але більша загальна вартість кредиту.',
      },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de prêt gratuite pour estimer vos mensualités. Entrez le montant, le taux annuel et la durée pour voir immédiatement votre mensualité, le total remboursé et le coût des intérêts.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Quelle est la différence entre un prêt personnel et un crédit immobilier ?',
        a: 'Le crédit immobilier est destiné à l\'achat d\'un bien sur 10 à 30 ans. Le prêt personnel est un crédit à court terme (3 à 84 mois) sans frais supplémentaires liés à l\'immobilier.',
      },
      {
        q: 'Comment est calculée la mensualité ?',
        a: 'La mensualité est calculée selon la formule d\'amortissement : M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], où P est le montant, r le taux mensuel et n le nombre de mensualités.',
      },
      {
        q: 'Qu\'est-ce qui influence le coût total des intérêts ?',
        a: 'Trois facteurs : le montant emprunté, le taux d\'intérêt et la durée. Plus la durée est longue, plus les intérêts sont élevés, même si la mensualité est plus faible.',
      },
      {
        q: 'Vaut-il mieux une durée courte ou longue ?',
        a: 'Durée courte = mensualité plus élevée, mais moins d\'intérêts au total. Durée longue = mensualité plus faible, mais coût total plus élevé.',
      },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą paskolos skaičiuotuvą mėnesio įmokai apskaičiuoti. Įveskite sumą, metinę palūkanų normą ir terminą — ir iš karto pamatysite įmoką, bendrą grąžinamą sumą ir palūkanas.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kuo skiriasi paskolos ir hipotekos skaičiuotuvas?',
        a: 'Hipotekos skaičiuotuvas skirtas ilgalaikėms nekilnojamojo turto paskoloms (10–30 metų). Paskolos skaičiuotuvas — trumpalaikėms vartojimo paskoloms (3–84 mėnesiai).',
      },
      {
        q: 'Kaip apskaičiuojama mėnesio įmoka?',
        a: 'Mėnesio įmoka apskaičiuojama pagal anuiteto formulę: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], kur P — paskolos suma, r — mėnesinė norma, n — mokėjimų skaičius.',
      },
      {
        q: 'Kas lemia bendrą palūkanų sumą?',
        a: 'Trys veiksniai: paskolos suma, palūkanų norma ir terminas. Ilgesnis terminas — mažesnė mėnesio įmoka, bet didesnės bendros palūkanos.',
      },
      {
        q: 'Ar geriau trumpesnis ar ilgesnis terminas?',
        a: 'Trumpesnis terminas — didesnė įmoka, mažesnės palūkanos. Ilgesnis — mažesnė įmoka, bet didesnė bendra kaina.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => {
    alternates[l] = `https://utilixi.com/${l}/calculator/loan`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LoanPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/loan`,
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
        <LoanCalculator locale={locale} />

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
