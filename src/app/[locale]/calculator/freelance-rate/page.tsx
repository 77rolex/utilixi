import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import FreelanceRateCalculator from './FreelanceRateCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/income-tax', label: 'Income Tax Calculator' },
    { href: '/calculator/roi', label: 'ROI Calculator' },
  ],
  ru: [
    { href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
  ],
  uk: [
    { href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
  ],
  fr: [
    { href: '/calculator/income-tax', label: 'Calculatrice impôt sur le revenu' },
    { href: '/calculator/roi', label: 'Calculatrice ROI' },
  ],
  lt: [
    { href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' },
    { href: '/calculator/roi', label: 'RI skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Freelance Rate Calculator — Find Your Minimum Hourly Rate',
    description: 'Free freelance rate calculator. Calculate your minimum hourly, daily, weekly and monthly rates based on your income goal, expenses, tax rate and billable hours.',
    h1: 'Freelance Rate Calculator',
  },
  ru: {
    title: 'Калькулятор ставки фрилансера — минимальная почасовая ставка',
    description: 'Бесплатный калькулятор ставки фрилансера. Рассчитайте минимальную почасовую, дневную и месячную ставку на основе желаемого дохода, расходов и налоговой нагрузки.',
    h1: 'Калькулятор ставки фрилансера',
  },
  uk: {
    title: 'Калькулятор ставки фрилансера — мінімальна погодинна ставка',
    description: 'Безкоштовний калькулятор ставки фрилансера. Розрахуйте мінімальну погодинну, денну та місячну ставку на основі бажаного доходу, витрат і податкового навантаження.',
    h1: 'Калькулятор ставки фрилансера',
  },
  fr: {
    title: 'Calculatrice de taux freelance — Trouvez votre tarif horaire minimum',
    description: 'Calculatrice de taux freelance gratuite. Calculez votre tarif horaire, journalier, hebdomadaire et mensuel minimum selon votre objectif de revenu, vos dépenses et votre taux d\'imposition.',
    h1: 'Calculatrice de taux freelance',
  },
  lt: {
    title: 'Laisvai samdomų darbuotojų tarifų skaičiuotuvas — minimalus valandinis tarifas',
    description: 'Nemokamas laisvai samdomų darbuotojų tarifų skaičiuotuvas. Apskaičiuokite minimalų valandinį, dienos, savaitinį ir mėnesinį tarifą pagal pajamų tikslą, išlaidas ir mokesčių normą.',
    h1: 'Laisvai samdomų tarifų skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our freelance rate calculator to find the minimum rate you need to charge to reach your financial goals. Enter your target net income, annual business expenses, tax rate, weeks off, and billable hours per week — and get your minimum hourly, daily, weekly and monthly freelance rates instantly.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a billable hour?', a: 'A billable hour is time you can charge a client for — actual work on their projects. As a freelancer, not all your working time is billable: you also spend time on marketing, admin, accounting, learning, and business development. Most freelancers are billable for only 60–75% of their working hours.' },
      { q: 'Why is my freelance rate higher than an employee salary?', a: 'As a freelancer, you cover all costs an employer normally pays: social security, health insurance, pension contributions, office costs, equipment, software, accounting, and paid vacation. Add unpaid downtime between projects, and a freelance rate needs to be 1.5–3× an equivalent employee salary to achieve the same net income.' },
      { q: 'How many billable hours per year is realistic?', a: 'With 4 weeks off and 30 billable hours/week, you get ~1,440 billable hours/year. In practice, also account for sick days, slow periods, and time finding new clients. Many experienced freelancers plan for 1,000–1,400 truly billable hours annually.' },
      { q: 'Should I charge by the hour or by the project?', a: 'Project-based pricing is often more profitable: clients pay for value, not time, and you\'re rewarded for working efficiently. Use the hourly rate as your baseline to estimate project costs. As you gain experience, shifting to value-based pricing typically increases earnings significantly.' },
    ],
  },
  ru: {
    description: 'Используйте калькулятор ставки фрилансера, чтобы найти минимальную ставку для достижения финансовых целей. Введите целевой чистый доход, годовые расходы на бизнес, налоговую нагрузку, количество недель отпуска и оплачиваемых часов — и мгновенно получите минимальные почасовую, дневную и месячную ставки.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое оплачиваемый час?', a: 'Оплачиваемый час — это время, которое вы выставляете клиенту счёт. Как фрилансер, не всё рабочее время является оплачиваемым: вы также тратите время на маркетинг, административные дела, бухгалтерию и обучение. Большинство фрилансеров выставляют счёт только за 60–75% рабочего времени.' },
      { q: 'Почему ставка фрилансера выше зарплаты сотрудника?', a: 'Фрилансер покрывает все расходы, которые обычно несёт работодатель: социальные взносы, медицинская страховка, пенсионные отчисления, офис, оборудование, программы и бухгалтерия. С учётом простоев между проектами ставка фрилансера должна быть в 1,5–3 раза выше зарплаты сотрудника для того же чистого дохода.' },
      { q: 'Сколько оплачиваемых часов в год реально?', a: 'При 4 неделях отпуска и 30 оплачиваемых часах в неделю получается ~1440 часов/год. На практике учитывайте больничные, сезонные спады и время на поиск клиентов. Опытные фрилансеры планируют 1000–1400 реально оплачиваемых часов в год.' },
      { q: 'Брать почасово или за проект?', a: 'Проектная оплата часто выгоднее: клиент платит за результат, а не за время, и вы получаете больше при эффективной работе. Используйте почасовую ставку как основу для оценки стоимости проектов. По мере роста опыта переход на стоимостное ценообразование значительно увеличивает доход.' },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор ставки фрилансера, щоб знайти мінімальну ставку для досягнення фінансових цілей. Введіть цільовий чистий дохід, річні витрати на бізнес, податкове навантаження та кількість оплачуваних годин.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке оплачувана година?', a: 'Оплачувана година — це час, за який ви виставляєте рахунок клієнту. Більшість фрилансерів виставляють рахунок лише за 60–75% робочого часу, адже решта йде на маркетинг, адміністрування та навчання.' },
      { q: 'Чому ставка фрилансера вища за зарплату працівника?', a: 'Фрилансер покриває всі витрати, які зазвичай несе роботодавець: соціальні внески, страховка, офіс, обладнання, ПЗ. З урахуванням простоїв між проєктами ставка фрилансера має бути в 1,5–3 рази вищою.' },
      { q: 'Скільки оплачуваних годин на рік реально?', a: 'При 4 тижнях відпустки і 30 оплачуваних годинах на тиждень виходить ~1440 годин/рік. Досвідчені фрилансери планують 1000–1400 реально оплачуваних годин.' },
      { q: 'Брати погодинно чи за проєкт?', a: 'Проєктна оплата часто вигідніша. Використовуйте погодинну ставку як основу для оцінки вартості проєктів. З досвідом перехід на ціннісне ціноутворення суттєво збільшує дохід.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de taux freelance pour trouver le tarif minimum à facturer pour atteindre vos objectifs financiers. Entrez votre revenu net cible, vos dépenses, votre taux d\'imposition, vos congés et heures facturables.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qu\'une heure facturable ?', a: 'Une heure facturable est du temps que vous pouvez facturer à un client. En tant que freelance, tout votre temps de travail n\'est pas facturable : vous consacrez aussi du temps au marketing, à l\'administratif et à la formation. La plupart des freelances facturent seulement 60 à 75 % de leurs heures de travail.' },
      { q: 'Pourquoi le taux freelance est-il supérieur au salaire salarié ?', a: 'En tant que freelance, vous couvrez toutes les charges qu\'un employeur paie normalement : charges sociales, assurance santé, retraite, bureau, matériel, logiciels. En tenant compte des périodes creuses, un taux freelance doit être 1,5 à 3 fois supérieur à un salaire équivalent.' },
      { q: 'Combien d\'heures facturables par an est réaliste ?', a: 'Avec 4 semaines de congés et 30 heures facturables/semaine, vous obtenez ~1 440 heures/an. En pratique, prévoyez aussi les arrêts maladie et les périodes sans clients. La plupart des freelances expérimentés planifient 1 000 à 1 400 heures réellement facturables.' },
      { q: 'Faut-il facturer à l\'heure ou au projet ?', a: 'La facturation au projet est souvent plus rentable : le client paie pour la valeur, pas le temps. Utilisez le taux horaire comme base pour estimer les projets. Avec l\'expérience, la facturation à la valeur augmente considérablement les revenus.' },
    ],
  },
  lt: {
    description: 'Naudokite laisvai samdomų darbuotojų tarifų skaičiuotuvą, kad rastumėte minimalų tarifą savo finansiniams tikslams pasiekti. Įveskite tikslines grynąsias pajamas, verslo išlaidas, mokesčių normą ir apmokamas valandas.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra apmokama valanda?', a: 'Apmokama valanda — tai laikas, kurį galite skaičiuoti klientui. Laisvai samdomi darbuotojai paprastai skaičiuoja tik 60–75 % darbo laiko, nes likęs laikas skiriamas rinkodarai, administravimui ir mokymuisi.' },
      { q: 'Kodėl laisvai samdomų darbuotojų tarifas aukštesnis už darbuotojo atlyginimą?', a: 'Laisvai samdomas darbuotojas padengia visas išlaidas, kurias paprastai moka darbdavys: socialinis draudimas, sveikatos draudimas, įranga, programinė įranga. Atsižvelgiant į prastovą tarp projektų, tarifas turi būti 1,5–3 kartus didesnis.' },
      { q: 'Kiek apmokamų valandų per metus yra realu?', a: 'Su 4 atostogų savaitėmis ir 30 apmokamų valandų per savaitę gaunate ~1 440 valandų per metus. Patyrę laisvai samdomi darbuotojai planuoja 1 000–1 400 tikrai apmokamų valandų.' },
      { q: 'Ar skaičiuoti pagal valandas ar pagal projektą?', a: 'Skaičiavimas pagal projektą dažnai pelningesnis: klientas moka už vertę, o ne laiką. Naudokite valandinį tarifą kaip pagrindą projektų kainai apskaičiuoti.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/freelance-rate'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FreelanceRatePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/freelance-rate`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <FreelanceRateCalculator locale={locale} />

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
