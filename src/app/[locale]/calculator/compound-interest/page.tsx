import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/pension', label: 'Pension Calculator' }],
  ru: [{ href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/pension', label: 'Пенсионный калькулятор' }],
  uk: [{ href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/pension', label: 'Пенсійний калькулятор' }],
  fr: [{ href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/pension', label: 'Calculatrice Retraite' }],
  lt: [{ href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/pension', label: 'Pensijų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Compound Interest Calculator — Calculate Investment Growth', description: 'Free compound interest calculator. See how your money grows with annual, monthly or daily compounding. Includes year-by-year breakdown and optional monthly contributions.', h1: 'Compound Interest Calculator' },
  ru: { title: 'Калькулятор сложных процентов — рассчитать доход онлайн', description: 'Бесплатный калькулятор сложных процентов. Рассчитайте рост вложений с ежегодным, ежемесячным или ежедневным начислением. Таблица по годам и ежемесячные пополнения.', h1: 'Калькулятор сложных процентов' },
  uk: { title: 'Калькулятор складних відсотків — розрахувати дохід онлайн', description: 'Безкоштовний калькулятор складних відсотків. Розрахуйте зростання вкладень із щорічним, щомісячним або щоденним нарахуванням. Таблиця по роках.', h1: 'Калькулятор складних відсотків' },
  fr: { title: 'Calculatrice d\'intérêts composés — Calculer la croissance d\'un placement', description: 'Calculatrice d\'intérêts composés gratuite. Calculez la croissance de votre capital avec capitalisation annuelle, mensuelle ou quotidienne. Tableau annuel inclus.', h1: 'Calculatrice d\'intérêts composés' },
  lt: { title: 'Sudėtinių Palūkanų Skaičiuotuvas — Investicijų Augimas', description: 'Nemokamas sudėtinių palūkanų skaičiuotuvas. Apskaičiuokite investicijų augimą su kasmetiniu, mėnesiniu ar kasdieninniu kapitalizavimu. Metų suvestinė.', h1: 'Sudėtinių palūkanų skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Compound interest is the engine of long-term wealth building — your returns earn returns. Enter your initial investment, annual rate, and time period to see the final amount and year-by-year growth. Add a monthly contribution to model a savings plan. Choose compounding frequency: the more often interest compounds, the higher your final balance.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is compound interest?', a: 'Compound interest means you earn interest not just on your initial principal, but also on the interest you\'ve already earned. Over time, this creates exponential growth — the "snowball effect". Formula: A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounds per year, t is years.' },
      { q: 'How does compounding frequency affect returns?', a: 'The more frequently interest compounds, the more you earn. Monthly compounding yields slightly more than annual, and daily yields a bit more than monthly. The difference becomes significant over long periods. For example, $10,000 at 8% for 20 years: annually → $46,610; monthly → $49,268; daily → $49,530.' },
      { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick mental shortcut: divide 72 by your annual interest rate to estimate how many years it takes to double your money. At 8% per year, your money doubles in roughly 9 years (72 ÷ 8). It\'s an approximation — the calculator gives you the exact figures.' },
      { q: 'What annual return should I use for investments?', a: 'For long-term stock market investments, 7–10% is a historically reasonable estimate (before inflation). For bonds, 3–5%. For a savings deposit, 2–5%. Always use the net-of-fees, net-of-inflation rate for realistic projections.' },
      { q: 'What\'s the difference between this and the deposit calculator?', a: 'This calculator is designed for investment planning with flexible compounding frequencies and optional monthly contributions. The deposit calculator focuses specifically on bank deposits with capitalization periods.' },
    ],
  },
  ru: {
    description: 'Сложный процент — двигатель долгосрочного роста капитала: проценты начисляются на уже начисленные проценты. Введите начальную сумму, ставку и срок, чтобы увидеть итоговую сумму и рост по годам. Добавьте ежемесячное пополнение для моделирования плана накоплений.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое сложный процент?', a: 'Сложный процент означает, что проценты начисляются не только на первоначальную сумму, но и на уже накопленные проценты. Это создаёт экспоненциальный рост — «эффект снежного кома». Формула: A = P(1 + r/n)^(nt).' },
      { q: 'Как частота начисления влияет на доход?', a: 'Чем чаще начисляются проценты, тем больше итоговая сумма. Ежемесячное начисление даёт немного больше, чем ежегодное, а ежедневное — чуть больше ежемесячного. Разница становится существенной на длинных сроках.' },
      { q: 'Что такое правило 72?', a: 'Правило 72 — быстрое вычисление в уме: разделите 72 на годовую ставку, чтобы узнать, через сколько лет удвоятся вложения. При ставке 8% капитал удвоится примерно за 9 лет (72 ÷ 8). Это приближение — калькулятор даёт точный результат.' },
      { q: 'Какую доходность использовать для расчётов?', a: 'Для долгосрочных инвестиций в акции исторически обоснована доходность 7–10% годовых (до инфляции). Для облигаций — 3–5%. Для банковского вклада — 2–5%. Для реалистичных прогнозов используйте ставку после вычета комиссий и инфляции.' },
      { q: 'Чем отличается от калькулятора депозита?', a: 'Этот калькулятор предназначен для инвестиционного планирования с гибкой частотой начисления и ежемесячными пополнениями. Калькулятор депозита ориентирован специально на банковские вклады с капитализацией.' },
    ],
  },
  uk: {
    description: 'Складний відсоток — двигун довгострокового зростання капіталу: відсотки нараховуються на вже нараховані відсотки. Введіть початкову суму, ставку та строк, щоб побачити підсумкову суму та зростання по роках. Додайте щомісячне поповнення для моделювання плану накопичень.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке складний відсоток?', a: 'Складний відсоток означає, що відсотки нараховуються не лише на початкову суму, а й на вже накопичені відсотки. Це створює експоненційне зростання — «ефект сніжного кома». Формула: A = P(1 + r/n)^(nt).' },
      { q: 'Як частота нарахування впливає на дохід?', a: 'Чим частіше нараховуються відсотки, тим більша підсумкова сума. Щомісячне нарахування дає трохи більше, ніж щорічне, а щоденне — трохи більше щомісячного.' },
      { q: 'Що таке правило 72?', a: 'Правило 72 — швидке обчислення: поділіть 72 на річну ставку, щоб дізнатися, за скільки років подвояться вкладення. При ставці 8% капітал подвоїться приблизно за 9 років (72 ÷ 8).' },
      { q: 'Яку дохідність використовувати для розрахунків?', a: 'Для довгострокових інвестицій в акції історично обґрунтована дохідність 7–10% річних (до інфляції). Для облігацій — 3–5%. Для банківського вкладу — 2–5%.' },
      { q: 'Чим відрізняється від калькулятора депозиту?', a: 'Цей калькулятор призначений для інвестиційного планування з гнучкою частотою нарахування та щомісячними поповненнями. Калькулятор депозиту орієнтований на банківські вклади.' },
    ],
  },
  fr: {
    description: 'Les intérêts composés sont le moteur de la croissance du patrimoine à long terme : vos rendements génèrent des rendements. Entrez votre capital initial, le taux annuel et la durée pour voir le montant final et la croissance année par année. Ajoutez un versement mensuel pour modéliser un plan d\'épargne.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'intérêt composé ?', a: 'L\'intérêt composé signifie que vous gagnez des intérêts non seulement sur votre capital initial, mais aussi sur les intérêts déjà accumulés. Cela crée une croissance exponentielle. Formule : A = P(1 + r/n)^(nt).' },
      { q: 'Comment la fréquence de capitalisation affecte-t-elle les rendements ?', a: 'Plus la capitalisation est fréquente, plus le rendement final est élevé. La capitalisation mensuelle rapporte légèrement plus que l\'annuelle, et la quotidienne un peu plus que la mensuelle. La différence devient significative sur de longues périodes.' },
      { q: 'Qu\'est-ce que la règle des 72 ?', a: 'La règle des 72 est un raccourci mental : divisez 72 par votre taux annuel pour estimer en combien d\'années votre capital double. À 8% par an, votre argent double en environ 9 ans (72 ÷ 8).' },
      { q: 'Quel taux de rendement annuel utiliser ?', a: 'Pour les investissements en actions à long terme, 7 à 10% est historiquement raisonnable (avant inflation). Pour les obligations, 3 à 5%. Pour un dépôt bancaire, 2 à 5%.' },
      { q: 'Quelle est la différence avec la calculatrice de dépôt ?', a: 'Cette calculatrice est conçue pour la planification d\'investissements avec des fréquences de capitalisation flexibles et des versements mensuels optionnels. La calculatrice de dépôt se concentre sur les dépôts bancaires.' },
    ],
  },
  lt: {
    description: 'Sudėtinės palūkanos — ilgalaikio turto augimo variklis: jūsų grąža generuoja grąžą. Įveskite pradinę sumą, metinę normą ir laikotarpį, kad pamatytumėte galutinę sumą ir augimą metais. Pridėkite mėnesinį įnašą taupymo planui modeliuoti.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra sudėtinės palūkanos?', a: 'Sudėtinės palūkanos reiškia, kad palūkanos skaičiuojamos ne tik nuo pradinės sumos, bet ir nuo jau sukauptų palūkanų. Tai sukuria eksponentinį augimą. Formulė: A = P(1 + r/n)^(nt).' },
      { q: 'Kaip kaupimo dažnumas veikia grąžą?', a: 'Kuo dažniau kaupiamos palūkanos, tuo didesnė galutinė suma. Mėnesinis kaupimas duoda šiek tiek daugiau nei metinis, o kasdieninis — šiek tiek daugiau nei mėnesinis.' },
      { q: 'Kas yra 72 taisyklė?', a: 'Padalinkite 72 iš metinės normos, kad sužinotumėte, per kiek metų kapitalas padvigubės. Esant 8% normai, kapitalas padvigubės maždaug per 9 metus (72 ÷ 8).' },
      { q: 'Kokią metinę grąžą naudoti skaičiavimams?', a: 'Ilgalaikėms investicijoms į akcijas istoriškai pagrįsta 7–10% metinė grąža (prieš infliaciją). Obligacijoms — 3–5%. Bankų indėliams — 2–5%.' },
      { q: 'Kuo skiriasi nuo indėlio skaičiuotuvo?', a: 'Šis skaičiuotuvas skirtas investicijų planavimui su lanksčiu kaupimo dažnumu ir neprivalomais mėnesiniais įnašais. Indėlio skaičiuotuvas orientuotas į banko indėlius.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => { alternates[l] = `https://utilixi.com/${l}/calculator/compound-interest`; });
  return { title: meta.title, description: meta.description, alternates: { languages: alternates } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CompoundInterestPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/compound-interest`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <CompoundInterestCalculator locale={locale} />
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
