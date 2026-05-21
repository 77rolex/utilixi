import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import IdealWeightCalculator from './IdealWeightCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/bmi', label: 'BMI Calculator' },
    { href: '/calculator/calories', label: 'Calorie Calculator (TDEE)' },
  ],
  ru: [
    { href: '/calculator/bmi', label: 'Калькулятор ИМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорий (TDEE)' },
  ],
  uk: [
    { href: '/calculator/bmi', label: 'Калькулятор ІМТ' },
    { href: '/calculator/calories', label: 'Калькулятор калорій (TDEE)' },
  ],
  fr: [
    { href: '/calculator/bmi', label: 'Calculatrice IMC' },
    { href: '/calculator/calories', label: 'Calculatrice de calories (TDEE)' },
  ],
  lt: [
    { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' },
    { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas (TDEE)' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Ideal Weight Calculator — Find Your Healthy Weight',
    description: 'Free ideal weight calculator. Find your healthy weight range by height and gender using 4 medical formulas (Devine, Hamwi, Robinson, Miller) and BMI guidelines.',
    h1: 'Ideal Weight Calculator',
  },
  ru: {
    title: 'Калькулятор идеального веса — норма по росту и полу',
    description: 'Бесплатный калькулятор идеального веса онлайн. Рассчитайте нормальный вес по росту и полу по 4 медицинским формулам (Девайн, Хамви, Робинсон, Миллер).',
    h1: 'Калькулятор идеального веса',
  },
  uk: {
    title: 'Калькулятор ідеальної ваги — норма за зростом і статтю',
    description: 'Безкоштовний калькулятор ідеальної ваги онлайн. Розрахуйте нормальну вагу за зростом і статтю за 4 медичними формулами (Девайн, Хамві, Робінсон, Міллер).',
    h1: 'Калькулятор ідеальної ваги',
  },
  fr: {
    title: 'Calculatrice du Poids Idéal — Poids Santé par Taille',
    description: 'Calculatrice du poids idéal gratuite. Trouvez votre poids santé selon votre taille et votre sexe grâce à 4 formules médicales (Devine, Hamwi, Robinson, Miller).',
    h1: 'Calculatrice du Poids Idéal',
  },
  lt: {
    title: 'Idealaus Svorio Skaičiuotuvas — Sveikas Svoris pagal Ūgį',
    description: 'Nemokamas idealaus svorio skaičiuotuvas. Raskite sveiko svorio intervalą pagal ūgį ir lytį naudodami 4 medicinines formules (Devine, Hamwi, Robinson, Miller).',
    h1: 'Idealaus Svorio Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free ideal weight calculator helps you find a healthy weight range for your height and gender. Enter your height in metric (cm) or imperial (ft/in) units, select your gender, and get results from four widely used medical formulas — Devine, Hamwi, Robinson, and Miller — alongside the WHO-recommended healthy BMI range (18.5–24.9).',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is ideal body weight?',
        a: 'Ideal body weight (IBW) is an estimated weight range considered optimal for a person\'s height and gender. It is commonly used in medicine to determine drug dosages and assess nutritional status. There is no single "perfect" number — IBW is a useful reference range, not a strict target.',
      },
      {
        q: 'What formulas does this calculator use?',
        a: 'The calculator uses four established medical formulas: Devine (1974), Hamwi (1964), Robinson (1983), and Miller (1983). All four were developed for adults and use height in inches above 5 feet as the key variable. The results differ slightly because each formula was derived from different population samples.',
      },
      {
        q: 'What is the difference between the BMI healthy range and the formula results?',
        a: 'The BMI-based range (18.5–24.9) gives the weight interval within which a person is considered to have a healthy body mass index. The four formulas calculate a single target weight per gender. In practice, both approaches give similar values, but the BMI range is broader and accounts for natural body variation.',
      },
      {
        q: 'Does gender affect ideal weight?',
        a: 'Yes. Women naturally have a higher percentage of body fat and a different body composition than men of the same height. All four formulas use a lower baseline weight for women, resulting in a lower ideal weight estimate compared to men of the same height.',
      },
      {
        q: 'What if my actual weight is above or below the ideal range?',
        a: 'Ideal weight is a reference guideline, not a strict health boundary. Many factors affect healthy weight: muscle mass, bone structure, age, and fitness level. If your weight differs significantly from the range, consult a doctor or registered dietitian — weight alone does not fully determine health status.',
      },
    ],
  },
  ru: {
    description: 'Наш бесплатный калькулятор идеального веса помогает найти оптимальный диапазон веса для вашего роста и пола. Введите рост в метрической (см) или имперской (фут/дюйм) системе, выберите пол — и получите результаты по четырём медицинским формулам (Девайн, Хамви, Робинсон, Миллер), а также рекомендованный ВОЗ диапазон здорового ИМТ (18,5–24,9).',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Что такое идеальный вес?',
        a: 'Идеальный вес (ИВТ) — это расчётный диапазон веса, считающийся оптимальным для роста и пола человека. В медицине он используется для расчёта доз препаратов и оценки нутритивного статуса. Это ориентировочный показатель, а не строгая норма.',
      },
      {
        q: 'Какие формулы используются в калькуляторе?',
        a: 'Калькулятор использует четыре медицинские формулы: Девайн (1974), Хамви (1964), Робинсон (1983) и Миллер (1983). Все они разработаны для взрослых и основаны на росте сверх 152 см (5 футов). Небольшое расхождение между формулами объясняется тем, что они получены на разных выборках населения.',
      },
      {
        q: 'В чём разница между диапазоном ИМТ и результатами формул?',
        a: 'Диапазон по ИМТ (18,5–24,9) показывает интервал веса, при котором индекс массы тела считается здоровым. Четыре формулы рассчитывают одно целевое значение веса с учётом пола. На практике результаты схожи, но диапазон ИМТ шире и учитывает естественную вариацию телосложения.',
      },
      {
        q: 'Влияет ли пол на идеальный вес?',
        a: 'Да. У женщин naturally выше доля жировой ткани и иной состав тела, чем у мужчин того же роста. Все четыре формулы используют меньшее базовое значение для женщин, поэтому идеальный вес для женщин ниже, чем для мужчин того же роста.',
      },
      {
        q: 'Что делать, если мой реальный вес отличается от нормы?',
        a: 'Идеальный вес — это ориентир, а не жёсткая граница здоровья. На оптимальный вес влияют мышечная масса, костная структура, возраст и образ жизни. Если ваш вес значительно отличается от расчётного диапазона, проконсультируйтесь с врачом или диетологом.',
      },
    ],
  },
  uk: {
    description: 'Наш безкоштовний калькулятор ідеальної ваги допомагає знайти оптимальний діапазон ваги для вашого зросту і статі. Введіть зріст у метричній (см) або імперській (фут/дюйм) системі, оберіть стать — і отримайте результати за чотирма медичними формулами (Девайн, Хамві, Робінсон, Міллер) та рекомендований ВООЗ діапазон здорового ІМТ (18,5–24,9).',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Що таке ідеальна вага?',
        a: 'Ідеальна вага тіла — це розрахунковий діапазон ваги, що вважається оптимальним для зросту і статі людини. У медицині використовується для розрахунку доз препаратів та оцінки нутритивного статусу. Це орієнтовний показник, а не суворо встановлена норма.',
      },
      {
        q: 'Які формули використовує калькулятор?',
        a: 'Калькулятор використовує чотири медичні формули: Девайн (1974), Хамві (1964), Робінсон (1983) та Міллер (1983). Усі вони розроблені для дорослих і базуються на зрості понад 152 см (5 футів). Незначне розходження між формулами пояснюється різними вибірками населення.',
      },
      {
        q: 'У чому різниця між діапазоном ІМТ і результатами формул?',
        a: 'Діапазон за ІМТ (18,5–24,9) показує інтервал ваги, при якому індекс маси тіла вважається здоровим. Чотири формули розраховують одне цільове значення ваги з урахуванням статі. На практиці результати схожі, але діапазон ІМТ ширший і враховує природну варіацію будови тіла.',
      },
      {
        q: 'Чи впливає стать на ідеальну вагу?',
        a: 'Так. У жінок природно вища частка жирової тканини та інший склад тіла, ніж у чоловіків того самого зросту. Усі чотири формули використовують менше базове значення для жінок, тому ідеальна вага для жінок нижча, ніж для чоловіків того самого зросту.',
      },
      {
        q: 'Що робити, якщо моя реальна вага відрізняється від норми?',
        a: 'Ідеальна вага — це орієнтир, а не жорстка межа здоров\'я. На оптимальну вагу впливають м\'язова маса, кісткова структура, вік і спосіб життя. Якщо ваша вага значно відрізняється від розрахункового діапазону, проконсультуйтеся з лікарем або дієтологом.',
      },
    ],
  },
  fr: {
    description: "Notre calculatrice du poids idéal gratuite vous aide à trouver une plage de poids sain pour votre taille et votre sexe. Entrez votre taille en unités métriques (cm) ou impériales (pi/po), sélectionnez votre sexe — et obtenez les résultats de quatre formules médicales reconnues (Devine, Hamwi, Robinson, Miller) ainsi que la plage IMC sain recommandée par l'OMS (18,5–24,9).",
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Qu\'est-ce que le poids idéal ?',
        a: "Le poids idéal (PI) est une plage de poids estimée comme optimale pour la taille et le sexe d'une personne. En médecine, il est couramment utilisé pour calculer les posologies et évaluer l'état nutritionnel. Il s'agit d'une fourchette de référence, pas d'un objectif strict.",
      },
      {
        q: 'Quelles formules ce calculateur utilise-t-il ?',
        a: "Le calculateur utilise quatre formules médicales établies : Devine (1974), Hamwi (1964), Robinson (1983) et Miller (1983). Toutes sont conçues pour les adultes et utilisent la taille en pouces au-dessus de 5 pieds (152 cm). Les légères différences entre les formules s'expliquent par les échantillons de population utilisés.",
      },
      {
        q: "Quelle est la différence entre la plage IMC sain et les résultats des formules ?",
        a: "La plage basée sur l'IMC (18,5–24,9) indique l'intervalle de poids pour lequel l'indice de masse corporelle est considéré sain. Les quatre formules calculent un poids cible unique selon le sexe. En pratique, les résultats sont proches, mais la plage IMC est plus large et tient compte des variations naturelles de la morphologie.",
      },
      {
        q: 'Le sexe influe-t-il sur le poids idéal ?',
        a: "Oui. Les femmes ont naturellement un pourcentage de graisse corporelle plus élevé et une composition corporelle différente de celle des hommes de même taille. Les quatre formules utilisent une valeur de base plus faible pour les femmes, ce qui donne un poids idéal inférieur à celui des hommes de même taille.",
      },
      {
        q: 'Que faire si mon poids réel diffère de la plage idéale ?',
        a: "Le poids idéal est une référence, pas une frontière stricte de santé. De nombreux facteurs influent sur le poids optimal : masse musculaire, structure osseuse, âge et niveau d'activité physique. Si votre poids diffère significativement de la plage calculée, consultez un médecin ou un diététicien.",
      },
    ],
  },
  lt: {
    description: 'Mūsų nemokamas idealaus svorio skaičiuotuvas padės rasti sveiką svorio intervalą pagal jūsų ūgį ir lytį. Įveskite ūgį metrinėje (cm) arba imperinėje (pėd./col.) sistemoje, pasirinkite lytį — ir gaukite rezultatus pagal keturias medicinine formules (Devine, Hamwi, Robinson, Miller) bei PSO rekomenduojamą sveiką KMI intervalą (18,5–24,9).',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kas yra idealus kūno svoris?',
        a: 'Idealus kūno svoris (IKS) — tai apskaičiuotas svorio intervalas, laikomas optimaliu pagal žmogaus ūgį ir lytį. Medicinoje jis naudojamas vaistų dozėms skaičiuoti ir mitybos būklei vertinti. Tai orientacinis rodiklis, o ne griežta norma.',
      },
      {
        q: 'Kokias formules naudoja šis skaičiuotuvas?',
        a: 'Skaičiuotuvas naudoja keturias nusistovėjusias medicinine formules: Devine (1974), Hamwi (1964), Robinson (1983) ir Miller (1983). Visos jos skirtos suaugusiesiems ir remiasi ūgiu coliais virš 5 pėdų (152 cm). Nedideli skirtumai tarp formulių atsiranda dėl skirtingų populiacijų imčių.',
      },
      {
        q: 'Koks skirtumas tarp sveiko KMI intervalo ir formulių rezultatų?',
        a: 'KMI pagrįstas intervalas (18,5–24,9) rodo svorio ribas, kuriose kūno masės indeksas laikomas sveiku. Keturios formulės apskaičiuoja vieną tikslinį svorį pagal lytį. Praktiškai rezultatai yra panašūs, tačiau KMI intervalas yra platesnis ir atsižvelgia į natūralią kūno sudėjimo variaciją.',
      },
      {
        q: 'Ar lytis įtakoja idealų svorį?',
        a: 'Taip. Moterims natūraliai būdingas didesnis kūno riebalų procentas ir kitokia kūno sudėtis nei to paties ūgio vyrams. Visos keturios formulės naudoja mažesnę bazinę reikšmę moterims, todėl moterų idealus svoris yra mažesnis nei to paties ūgio vyrų.',
      },
      {
        q: 'Ką daryti, jei mano tikrasis svoris skiriasi nuo idealaus intervalo?',
        a: 'Idealus svoris yra orientyras, o ne griežta sveikatos riba. Optimalų svorį lemia daugelis veiksnių: raumenų masė, kaulų struktūra, amžius ir fizinis aktyvumas. Jei jūsų svoris gerokai skiriasi nuo apskaičiuoto intervalo, pasitarkite su gydytoju arba dietologu.',
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
    alternates: buildAlternates(locale, '/calculator/ideal-weight'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function IdealWeightPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/ideal-weight`,
    applicationCategory: 'HealthApplication',
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
        <IdealWeightCalculator locale={locale} />

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
