import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import LifeInsuranceCalculator from './LifeInsuranceCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/pension', label: 'Pension Calculator' },
    { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' },
  ],
  ru: [
    { href: '/calculator/pension', label: 'Пенсионный калькулятор' },
    { href: '/calculator/compound-interest', label: 'Калькулятор сложных процентов' },
  ],
  uk: [
    { href: '/calculator/pension', label: 'Пенсійний калькулятор' },
    { href: '/calculator/compound-interest', label: 'Калькулятор складних відсотків' },
  ],
  fr: [
    { href: '/calculator/pension', label: 'Calculatrice Retraite' },
    { href: '/calculator/compound-interest', label: 'Intérêts composés' },
  ],
  lt: [
    { href: '/calculator/pension', label: 'Pensijų skaičiuotuvas' },
    { href: '/calculator/compound-interest', label: 'Sudėtinės palūkanos' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Life Insurance Calculator — Estimate Your Premium',
    description: 'Free life insurance calculator. Estimate your monthly and annual term life insurance premium based on age, gender, coverage amount, health status and smoking habits.',
    h1: 'Life Insurance Calculator',
  },
  ru: {
    title: 'Калькулятор страховки жизни — расчёт стоимости полиса',
    description: 'Бесплатный калькулятор страхования жизни. Рассчитайте ежемесячную и годовую стоимость срочной страховки по возрасту, полу, сумме покрытия и состоянию здоровья.',
    h1: 'Калькулятор страховки жизни',
  },
  uk: {
    title: 'Калькулятор страховки життя — розрахунок вартості поліса',
    description: 'Безкоштовний калькулятор страхування життя. Розрахуйте щомісячну і річну вартість страховки за віком, статтю, сумою покриття та станом здоров\'я.',
    h1: 'Калькулятор страховки життя',
  },
  fr: {
    title: 'Calculatrice d\'assurance vie — Estimez votre prime',
    description: 'Calculatrice d\'assurance vie gratuite. Estimez votre prime mensuelle et annuelle selon l\'âge, le sexe, le montant assuré et l\'état de santé.',
    h1: 'Calculatrice d\'assurance vie',
  },
  lt: {
    title: 'Gyvybės draudimo skaičiuotuvas — įmokos įvertinimas',
    description: 'Nemokamas gyvybės draudimo skaičiuotuvas. Įvertinkite mėnesinę ir metinę įmoką pagal amžių, lytį, draudimo sumą ir sveikatos būklę.',
    h1: 'Gyvybės draudimo skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our free life insurance calculator to estimate the monthly and annual cost of a term life insurance policy. Enter your age, gender, desired coverage amount, policy term, smoking status and overall health — and get an instant estimate based on US market averages.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is term life insurance?', a: 'Term life insurance provides coverage for a specific period (10–30 years). If you die during the term, the insurer pays the coverage amount to your beneficiaries. It\'s the most affordable type of life insurance and has no savings component.' },
      { q: 'How much life insurance do I need?', a: 'A common rule of thumb is 10–12× your annual income. Consider your debts (mortgage, loans), dependents\' needs, education costs, and how long your family would need financial support without your income.' },
      { q: 'Why does age affect premiums so much?', a: 'Life insurance premiums are based on mortality risk. As you age, the statistical probability of dying during the policy term increases significantly, especially after 40. Buying life insurance when young and healthy locks in the lowest rates.' },
      { q: 'Does smoking really double the premium?', a: 'Yes — smokers typically pay 2 to 3× more than non-smokers for the same coverage. This reflects the significantly higher mortality risk associated with smoking. Many insurers offer lower rates after 1–2 years of being smoke-free.' },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором страхования жизни, чтобы оценить ежемесячную и годовую стоимость срочного полиса. Введите возраст, пол, желаемую сумму покрытия, срок полиса, статус курения и состояние здоровья — и получите мгновенную оценку.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое срочное страхование жизни?', a: 'Срочное страхование жизни обеспечивает защиту на определённый период (10–30 лет). Если застрахованный умирает в период действия полиса, страховая компания выплачивает указанную сумму. Это наиболее доступный тип страхования без накопительного компонента.' },
      { q: 'На какую сумму страховать жизнь?', a: 'Распространённое правило — 10–12 ваших годовых доходов. Учитывайте долги (ипотека, кредиты), потребности иждивенцев, расходы на образование и то, как долго семья нуждается в финансовой поддержке без вашего дохода.' },
      { q: 'Почему возраст так сильно влияет на стоимость?', a: 'Страховые взносы основаны на риске смертности. С возрастом статистическая вероятность смерти в период действия полиса значительно возрастает, особенно после 40 лет. Оформление страховки в молодом возрасте фиксирует минимальные ставки.' },
      { q: 'Правда ли, что курение удваивает страховку?', a: 'Да — курящие обычно платят в 2–3 раза больше за ту же сумму покрытия. Многие страховщики предлагают льготные ставки после 1–2 лет без курения.' },
    ],
  },
  uk: {
    description: 'Скористайтеся безкоштовним калькулятором страхування життя, щоб оцінити щомісячну і річну вартість строкового поліса. Введіть вік, стать, бажану суму покриття, термін поліса, статус куріння і стан здоров\'я.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке строкове страхування життя?', a: 'Строкове страхування забезпечує захист на певний період (10–30 років). Якщо застрахований помирає в цей час, страховик виплачує вказану суму. Це найдоступніший тип страхування без накопичувального компонента.' },
      { q: 'На яку суму страхувати життя?', a: 'Поширене правило — 10–12 річних доходів. Враховуйте борги, потреби утриманців, витрати на навчання та тривалість фінансової підтримки сім\'ї.' },
      { q: 'Чому вік так сильно впливає на вартість?', a: 'Страхові внески базуються на ризику смертності. З віком імовірність смерті в період дії поліса зростає. Оформлення страховки в молодому віці фіксує мінімальні ставки.' },
      { q: 'Чи справді куріння подвоює страховку?', a: 'Так — курці зазвичай платять у 2–3 рази більше за однакове покриття. Багато страховиків пропонують нижчі ставки після 1–2 років без куріння.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice d\'assurance vie gratuite pour estimer le coût mensuel et annuel d\'une assurance terme. Entrez votre âge, sexe, montant assuré, durée du contrat, statut de fumeur et état de santé.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'assurance vie temporaire ?', a: 'L\'assurance vie temporaire couvre une période définie (10 à 30 ans). Si l\'assuré décède pendant cette période, l\'assureur verse le capital aux bénéficiaires. C\'est le type d\'assurance vie le plus abordable, sans composante épargne.' },
      { q: 'De quel montant d\'assurance ai-je besoin ?', a: 'Une règle courante est de 10 à 12 fois votre revenu annuel. Tenez compte de vos dettes, des besoins de vos proches, des frais d\'études et de la durée pendant laquelle votre famille aurait besoin d\'un soutien financier.' },
      { q: 'Pourquoi l\'âge influence-t-il autant les primes ?', a: 'Les primes sont basées sur le risque de mortalité. En vieillissant, la probabilité statistique de décès pendant la durée du contrat augmente considérablement, surtout après 40 ans.' },
      { q: 'Le tabagisme double-t-il vraiment la prime ?', a: 'Oui — les fumeurs paient généralement 2 à 3 fois plus pour la même couverture. De nombreux assureurs proposent des tarifs réduits après 1 à 2 ans sans tabac.' },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą gyvybės draudimo skaičiuotuvą, kad įvertintumėte mėnesinę ir metinę terminuoto draudimo įmoką. Įveskite amžių, lytį, draudimo sumą, terminą, rūkymo statusą ir sveikatos būklę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra terminuotas gyvybės draudimas?', a: 'Terminuotas gyvybės draudimas suteikia apsaugą tam tikram laikotarpiui (10–30 metų). Jei apdraustasis miršta per šį laikotarpį, draudikas išmoka nurodytą sumą. Tai prieinamiausias draudimo tipas be kaupimo komponento.' },
      { q: 'Kokia draudimo suma reikalinga?', a: 'Dažna taisyklė — 10–12 jūsų metinių pajamų. Atsižvelkite į skolas, išlaikytinių poreikius, išsilavinimo išlaidas ir laikotarpį, kuriam šeima reikalinga finansinė parama.' },
      { q: 'Kodėl amžius taip stipriai lemia įmokas?', a: 'Draudimo įmokos grindžiamos mirtingumo rizika. Senstant statistinė mirties tikimybė per poliso galiojimo laikotarpį žymiai didėja, ypač po 40 metų.' },
      { q: 'Ar rūkymas tikrai padvigubina įmoką?', a: 'Taip — rūkantieji paprastai moka 2–3 kartus daugiau už tą pačią draudimo sumą. Daugelis draudikų siūlo mažesnius tarifus po 1–2 metų be rūkymo.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/life-insurance'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LifeInsurancePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/life-insurance`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <LifeInsuranceCalculator locale={locale} />

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
