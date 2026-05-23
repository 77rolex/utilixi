import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CarInsuranceCalculator from './CarInsuranceCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/loan', label: 'Loan Calculator' },
    { href: '/calculator/roi', label: 'ROI Calculator' },
  ],
  ru: [
    { href: '/calculator/loan', label: 'Калькулятор кредита' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
  ],
  uk: [
    { href: '/calculator/loan', label: 'Калькулятор кредиту' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
  ],
  fr: [
    { href: '/calculator/loan', label: 'Calculatrice de prêt' },
    { href: '/calculator/roi', label: 'Calculatrice ROI' },
  ],
  lt: [
    { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' },
    { href: '/calculator/roi', label: 'RI skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Car Insurance Calculator — Estimate Your Premium',
    description: 'Free car insurance calculator. Estimate your annual and monthly auto insurance premium based on vehicle value, driver age, experience and country.',
    h1: 'Car Insurance Calculator',
  },
  ru: {
    title: 'Калькулятор страховки автомобиля — расчёт стоимости ОСАГО и КАСКО',
    description: 'Бесплатный калькулятор страховки автомобиля. Рассчитайте стоимость ОСАГО и КАСКО по стоимости авто, возрасту водителя и стажу.',
    h1: 'Калькулятор страховки автомобиля',
  },
  uk: {
    title: 'Калькулятор страховки автомобіля — розрахунок ОСЦПВ і КАСКО',
    description: 'Безкоштовний калькулятор страховки автомобіля. Розрахуйте вартість ОСЦПВ і КАСКО за вартістю авто, віком водія та стажем.',
    h1: 'Калькулятор страховки автомобіля',
  },
  fr: {
    title: 'Calculatrice d\'assurance auto — Estimez votre prime',
    description: 'Calculatrice d\'assurance auto gratuite. Estimez votre prime annuelle et mensuelle selon la valeur du véhicule, l\'âge du conducteur et le pays.',
    h1: 'Calculatrice d\'assurance auto',
  },
  lt: {
    title: 'Automobilio draudimo skaičiuotuvas — įmokos įvertinimas',
    description: 'Nemokamas automobilio draudimo skaičiuotuvas. Įvertinkite metinę ir mėnesinę draudimo įmoką pagal automobilio vertę, vairuotojo amžių ir patirtį.',
    h1: 'Automobilio draudimo skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our free car insurance calculator to get an instant estimate of your annual and monthly premium. Enter your vehicle\'s value, age, your driving history and the type of coverage you need — and we\'ll calculate an approximate cost based on typical market rates across 8 countries.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What factors affect car insurance premiums?', a: 'The main factors are: vehicle value and age, driver age and experience, accident history, coverage type (liability vs comprehensive), and the country where the vehicle is registered.' },
      { q: 'What is the difference between liability and comprehensive coverage?', a: 'Liability (MTPL) covers damage you cause to others and is usually mandatory. Comprehensive (CASCO) also covers damage to your own vehicle from accidents, theft, fire, and other risks. Comprehensive costs roughly 3–4× more than liability only.' },
      { q: 'Why do young drivers pay more?', a: 'Drivers under 25 statistically have more accidents. Insurers compensate for this higher risk with higher premiums. The surcharge can be 50–100% above the base rate.' },
      { q: 'How accurate is this calculator?', a: 'This is an approximate estimate based on average market rates. Actual premiums vary by specific insurer, exact vehicle model, your credit score (in some countries), and other individual factors. Always get quotes from multiple insurers.' },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором страховки автомобиля для мгновенной оценки годовой и ежемесячной стоимости ОСАГО или КАСКО. Введите стоимость и возраст авто, ваш стаж и историю ДТП — и получите приблизительную стоимость на основе рыночных ставок в 8 странах.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что влияет на стоимость страховки?', a: 'Основные факторы: стоимость и возраст авто, возраст и стаж водителя, история ДТП, тип страхования (ОСАГО или КАСКО), страна регистрации.' },
      { q: 'Чем отличается ОСАГО от КАСКО?', a: 'ОСАГО (гражданская ответственность) покрывает ущерб, причинённый другим участникам движения, и является обязательным. КАСКО также страхует ваш автомобиль от ДТП, угона, пожара и прочих рисков. КАСКО стоит в 3–4 раза дороже ОСАГО.' },
      { q: 'Почему молодые водители платят больше?', a: 'Водители до 25 лет статистически попадают в ДТП чаще. Страховщики компенсируют этот риск повышенными тарифами — надбавка может составлять 50–100% к базовой ставке.' },
      { q: 'Насколько точен этот калькулятор?', a: 'Это приблизительная оценка на основе средних рыночных ставок. Реальная стоимость зависит от конкретного страховщика, марки и модели авто, региона и других факторов. Рекомендуем сравнивать предложения нескольких компаний.' },
    ],
  },
  uk: {
    description: 'Скористайтеся безкоштовним калькулятором страховки автомобіля для миттєвої оцінки вартості ОСЦПВ або КАСКО. Введіть вартість і вік авто, ваш стаж і історію ДТП — і отримайте приблизну вартість на основі ринкових ставок у 8 країнах.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що впливає на вартість страховки?', a: 'Основні фактори: вартість і вік авто, вік і стаж водія, історія ДТП, тип страхування (ОСЦПВ або КАСКО), країна реєстрації.' },
      { q: 'Чим відрізняється ОСЦПВ від КАСКО?', a: 'ОСЦПВ (цивільна відповідальність) покриває збитки, завдані іншим учасникам руху, і є обов\'язковим. КАСКО також страхує власний автомобіль від ДТП, угону, пожежі. КАСКО коштує в 3–4 рази дорожче.' },
      { q: 'Чому молоді водії платять більше?', a: 'Водії до 25 років статистично частіше потрапляють у ДТП. Страховики компенсують цей ризик підвищеними тарифами — надбавка може становити 50–100%.' },
      { q: 'Наскільки точний цей калькулятор?', a: 'Це приблизна оцінка на основі середніх ринкових ставок. Реальна вартість залежить від конкретного страховика, марки та моделі авто та інших факторів.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice d\'assurance auto gratuite pour estimer instantanément votre prime annuelle et mensuelle. Entrez la valeur de votre véhicule, son âge, votre expérience de conduite et vos antécédents — obtenez une estimation basée sur les tarifs du marché dans 8 pays.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quels facteurs influencent la prime d\'assurance auto ?', a: 'Les principaux facteurs sont : la valeur et l\'âge du véhicule, l\'âge et l\'expérience du conducteur, l\'historique d\'accidents, le type de couverture (RC ou tous risques) et le pays d\'immatriculation.' },
      { q: 'Quelle est la différence entre RC et tous risques ?', a: 'La responsabilité civile (RC) couvre les dommages causés aux tiers et est obligatoire. Le tous risques (CASCO) couvre également les dommages à votre propre véhicule. Le tous risques coûte environ 3 à 4 fois plus cher.' },
      { q: 'Pourquoi les jeunes conducteurs paient-ils plus ?', a: 'Les conducteurs de moins de 25 ans ont statistiquement plus d\'accidents. Les assureurs compensent ce risque par des primes plus élevées — la majoration peut atteindre 50 à 100 %.' },
      { q: 'Quelle est la précision de cette calculatrice ?', a: 'Il s\'agit d\'une estimation approximative basée sur les tarifs moyens du marché. Les primes réelles varient selon l\'assureur, le modèle exact du véhicule et d\'autres facteurs individuels.' },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą automobilio draudimo skaičiuotuvą, kad iš karto įvertintumėte metinę ir mėnesinę draudimo įmoką. Įveskite automobilio vertę, amžių, vairavimo patirtį ir avarijų istoriją — gaukite įvertinimą pagal rinkos tarifus 8 šalyse.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kokie veiksniai lemia draudimo įmoką?', a: 'Pagrindiniai veiksniai: automobilio vertė ir amžius, vairuotojo amžius ir patirtis, avarijų istorija, draudimo tipas (civilinė atsakomybė ar visapusis) ir šalis.' },
      { q: 'Kuo skiriasi civilinė atsakomybė nuo visapusio draudimo?', a: 'Civilinė atsakomybė (TPVC) dengia žalą, padarytą kitiems, ir yra privaloma. Visapusis draudimas (KASKO) taip pat dengia žalą jūsų paties automobiliui. KASKO kainuoja maždaug 3–4 kartus daugiau.' },
      { q: 'Kodėl jauni vairuotojai moka daugiau?', a: 'Vairuotojai iki 25 metų statistiškai dažniau patenka į avarijas. Draudikai kompensuoja šią riziką didesnėmis įmokomis — priedas gali siekti 50–100 %.' },
      { q: 'Koks šio skaičiuotuvo tikslumas?', a: 'Tai apytikslis įvertinimas pagal vidutines rinkos normas. Tikrosios įmokos priklauso nuo konkretaus draudiko, automobilio modelio ir kitų veiksnių.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/car-insurance'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CarInsurancePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/car-insurance`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <CarInsuranceCalculator locale={locale} />

        <AdInline locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>
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
