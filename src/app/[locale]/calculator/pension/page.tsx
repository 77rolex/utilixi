import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PensionCalculator from './PensionCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' }],
  ru: [{ href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/compound-interest', label: 'Калькулятор сложных процентов' }],
  uk: [{ href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/compound-interest', label: 'Калькулятор складних відсотків' }],
  fr: [{ href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/compound-interest', label: 'Calculatrice d\'intérêts composés' }],
  lt: [{ href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Pension Calculator — Plan Your Retirement Savings Online', description: 'Free pension calculator. Calculate how much to save for retirement and your monthly payout from accumulated capital. Instant results.', h1: 'Pension Calculator' },
  ru: { title: 'Пенсионный калькулятор — рассчитать накопления онлайн', description: 'Бесплатный пенсионный калькулятор. Рассчитайте, сколько накопить к пенсии и какую ежемесячную выплату получите из накопленного капитала.', h1: 'Пенсионный калькулятор' },
  uk: { title: 'Пенсійний калькулятор — розрахувати накопичення онлайн', description: 'Безкоштовний пенсійний калькулятор. Розрахуйте, скільки накопичити до пенсії та яку щомісячну виплату отримаєте з накопиченого капіталу.', h1: 'Пенсійний калькулятор' },
  fr: { title: 'Calculatrice Retraite — Planifier votre épargne retraite', description: 'Calculatrice de retraite gratuite. Calculez combien épargner pour la retraite et votre versement mensuel à partir du capital accumulé.', h1: 'Calculatrice Retraite' },
  lt: { title: 'Pensijų Skaičiuotuvas — Planuokite Pensijų Santaupas', description: 'Nemokamas pensijų skaičiuotuvas. Apskaičiuokite, kiek kaupti pensijai ir kokia bus mėnesinė išmoka iš sukauptos sumos.', h1: 'Pensijų skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Planning for retirement early can make a significant difference to your financial future. This pension calculator has two modes: "Save for retirement" shows how much your savings will grow by the time you retire, and "Monthly payout" calculates how much you can withdraw each month from an accumulated fund. Results are approximate and depend on actual market returns, inflation, and your country\'s pension regulations.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much should I save each month for retirement?', a: 'A common rule of thumb is to save 10–15% of your gross income. The earlier you start, the less you need to save monthly thanks to compound growth. Use this calculator to find the monthly contribution needed for your target capital.' },
      { q: 'What annual return should I use?', a: 'A conservative estimate is 4–5% (bonds, conservative funds). A moderate estimate is 6–8% (balanced portfolio). An aggressive estimate is 8–10% (stock-heavy portfolio). Always use net-of-fees return. For the payout phase, 3–4% is safer as you\'re drawing down capital.' },
      { q: 'What is the "Monthly payout" tab for?', a: 'The payout tab answers: "If I have X amount saved, how much can I withdraw monthly over Y years?" It calculates the monthly payment from a fixed capital pool, assuming that capital earns a return while being drawn down.' },
      { q: 'Why is the disclaimer important?', a: 'Government pension benefits, tax treatment of savings, fund management fees, and inflation all affect your real purchasing power in retirement. This calculator shows the math of compound growth and drawdown — it cannot predict future markets or policy changes.' },
      { q: 'At what age should I start saving for retirement?', a: 'The earlier the better. Starting at 25 vs 35 can result in more than double the capital by retirement, even with the same monthly contribution, purely due to compound interest working for an extra 10 years.' },
    ],
  },
  ru: {
    description: 'Грамотное планирование пенсии — важный шаг к финансовой независимости. Калькулятор работает в двух режимах: «Накопить к пенсии» показывает, сколько вырастут ваши вложения к пенсионному возрасту, а «Ежемесячная выплата» рассчитывает, какую сумму вы сможете снимать каждый месяц с накопленного капитала. Расчёт ориентировочный.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько нужно откладывать в месяц?', a: 'Классическое правило — 10–15% от дохода. Чем раньше начать, тем меньше нужно откладывать ежемесячно: сложный процент работает годами. Используйте калькулятор, чтобы подобрать нужный взнос для целевого капитала.' },
      { q: 'Какую доходность указывать?', a: 'Консервативный вариант — 4–5% (облигации, консервативные фонды). Умеренный — 6–8% (сбалансированный портфель). Агрессивный — 8–10% (акции). Указывайте доходность после вычета комиссий. В фазе выплат реалистична ставка 3–4%.' },
      { q: 'Для чего вкладка «Ежемесячная выплата»?', a: 'Она отвечает на вопрос: «Если у меня накоплено X, сколько я смогу снимать в месяц в течение Y лет?» При этом учитывается, что капитал продолжает работать по указанной ставке доходности.' },
      { q: 'Почему расчёт приблизительный?', a: 'Государственная пенсия, налоги, комиссии фондов, инфляция и рыночная волатильность влияют на реальный доход на пенсии. Калькулятор показывает математику сложного процента, но не может предсказать будущие рынки или изменения законодательства.' },
      { q: 'С какого возраста начинать копить?', a: 'Чем раньше — тем лучше. Начав в 25 лет вместо 35, при одинаковом взносе можно накопить вдвое больше к выходу на пенсию — за счёт того, что сложный процент работает на 10 лет дольше.' },
    ],
  },
  uk: {
    description: 'Грамотне планування пенсії — важливий крок до фінансової незалежності. Калькулятор працює у двох режимах: «Накопити до пенсії» показує, скільки зростуть ваші вкладення до пенсійного віку, а «Щомісячна виплата» розраховує, яку суму ви зможете знімати щомісяця з накопиченого капіталу. Розрахунок орієнтовний.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки потрібно відкладати на місяць?', a: 'Класичне правило — 10–15% від доходу. Чим раніше почати, тим менше потрібно відкладати щомісяця завдяки складному відсотку. Використовуйте калькулятор, щоб підібрати потрібний внесок для цільового капіталу.' },
      { q: 'Яку дохідність вказувати?', a: 'Консервативний варіант — 4–5% (облігації). Помірний — 6–8% (збалансований портфель). Агресивний — 8–10% (акції). Вказуйте дохідність після вирахування комісій. У фазі виплат реалістична ставка 3–4%.' },
      { q: 'Для чого вкладка «Щомісячна виплата»?', a: 'Вона відповідає на запитання: «Якщо у мене накопичено X, скільки я зможу знімати на місяць протягом Y років?» При цьому враховується, що капітал продовжує працювати за вказаною ставкою.' },
      { q: 'Чому розрахунок орієнтовний?', a: 'Державна пенсія, податки, комісії фондів, інфляція та ринкова волатильність впливають на реальний дохід на пенсії. Калькулятор показує математику складного відсотка, але не може передбачити майбутні ринки.' },
      { q: 'З якого віку починати накопичувати?', a: 'Що раніше — то краще. Почавши у 25 років замість 35, при однакових внесках можна накопичити вдвічі більше завдяки тому, що складний відсоток працює на 10 років довше.' },
    ],
  },
  fr: {
    description: 'Planifier sa retraite tôt peut faire une grande différence pour votre avenir financier. Cette calculatrice de retraite propose deux modes : « Épargner pour la retraite » montre combien votre épargne va croître d\'ici votre départ en retraite, et « Versement mensuel » calcule combien vous pouvez retirer chaque mois d\'un capital accumulé. Les résultats sont approximatifs.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Combien épargner chaque mois pour la retraite ?', a: 'La règle générale est d\'épargner 10 à 15 % de vos revenus bruts. Plus vous commencez tôt, moins vous avez besoin d\'épargner mensuellement grâce aux intérêts composés. Utilisez cette calculatrice pour trouver le versement mensuel correspondant à votre capital cible.' },
      { q: 'Quel rendement annuel utiliser ?', a: 'Une estimation conservatrice est de 4 à 5 % (obligations, fonds conservateurs). Une estimation modérée est de 6 à 8 % (portefeuille équilibré). Une estimation agressive est de 8 à 10 % (portefeuille orienté actions). Utilisez un rendement net de frais.' },
      { q: 'À quoi sert l\'onglet « Versement mensuel » ?', a: 'Cet onglet répond à la question : « Si j\'ai X euros épargnés, combien puis-je retirer par mois pendant Y années ? » Il calcule le versement mensuel d\'un capital fixe, en supposant que ce capital continue à fructifier.' },
      { q: 'Pourquoi le calcul est-il approximatif ?', a: 'La pension de l\'État, la fiscalité, les frais de gestion des fonds, l\'inflation et la volatilité des marchés affectent votre pouvoir d\'achat réel à la retraite. Cette calculatrice montre les mathématiques des intérêts composés, sans prédire les marchés futurs.' },
      { q: 'À quel âge commencer à épargner pour la retraite ?', a: 'Le plus tôt est le mieux. Commencer à 25 ans plutôt qu\'à 35 ans peut plus que doubler le capital à la retraite, à versement mensuel identique, grâce aux intérêts composés sur 10 ans supplémentaires.' },
    ],
  },
  lt: {
    description: 'Anksti planuoti pensiją gali labai paveikti jūsų finansinę ateitį. Šis pensijų skaičiuotuvas turi du režimus: „Kaupti pensijai" rodo, kiek išaugs jūsų santaupos iki pensijos, o „Mėnesinė išmoka" apskaičiuoja, kiek galite išsiimti kas mėnesį iš sukauptos sumos. Rezultatai yra apytiksliai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek reikia taupyti per mėnesį?', a: 'Bendra taisyklė — 10–15% bruto pajamų. Kuo anksčiau pradedate, tuo mažiau reikia taupyti kas mėnesį dėl sudėtinių palūkanų. Naudokite šį skaičiuotuvą, kad rastumėte reikiamą mėnesinį įnašą savo tikslui.' },
      { q: 'Kokią metinę grąžą nurodyti?', a: 'Konservatyvi vertė — 4–5% (obligacijos). Vidutinė — 6–8% (subalansuotas portfelis). Agresyvi — 8–10% (akcijų portfelis). Nurodykite grąžą atėmus komisinius. Išmokų fazėje saugiau naudoti 3–4%.' },
      { q: 'Kam skirtas skirtukas „Mėnesinė išmoka"?', a: 'Jis atsako į klausimą: „Jei turiu X sumą, kiek galiu išsiimti per mėnesį per Y metų?" Skaičiuojama mėnesinė išmoka iš fiksuoto kapitalo, darant prielaidą, kad kapitalas toliau uždirba nurodytą grąžą.' },
      { q: 'Kodėl skaičiavimas yra apytikslis?', a: 'Valstybinė pensija, mokesčiai, fondų komisiniai, infliacija ir rinkos svyravimai veikia realią perkamąją galią pensijoje. Skaičiuotuvas rodo sudėtinių palūkanų matematiką, bet negali prognozuoti būsimų rinkų.' },
      { q: 'Nuo kokio amžiaus pradėti kaupti?', a: 'Kuo anksčiau, tuo geriau. Pradedant nuo 25, o ne nuo 35 metų, esant vienodams mėnesiniams įnašams, galima sukaupti daugiau nei dvigubai daugiau iki pensijos dėl sudėtinių palūkanų 10 papildomų metų.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/pension') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PensionPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/pension`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <PensionCalculator locale={locale} />
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
