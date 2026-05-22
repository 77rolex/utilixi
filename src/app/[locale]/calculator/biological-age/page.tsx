import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BiologicalAgeCalculator from './BiologicalAgeCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/diabetes-risk', label: 'Diabetes Risk Calculator' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/diabetes-risk', label: 'Калькулятор риска диабета' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/diabetes-risk', label: 'Калькулятор ризику діабету' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/diabetes-risk', label: 'Risque de diabète' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/diabetes-risk', label: 'Diabeto rizikos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Biological Age Calculator — Find Your Real Body Age', description: 'Free biological age calculator. Discover how old your body really is based on lifestyle factors: BMI, exercise, sleep, diet, stress, smoking, and alcohol habits.', h1: 'Biological Age Calculator' },
  ru: { title: 'Калькулятор биологического возраста — узнайте реальный возраст тела', description: 'Бесплатный калькулятор биологического возраста. Узнайте, насколько молодо или старо ваше тело на основе образа жизни: ИМТ, физическая активность, сон, питание, стресс.', h1: 'Калькулятор биологического возраста' },
  uk: { title: 'Калькулятор біологічного віку — дізнайтесь реальний вік тіла', description: 'Безкоштовний калькулятор біологічного віку. Дізнайтесь, наскільки молоде або старе ваше тіло за способом життя: ІМТ, фізична активність, сон, харчування, стрес.', h1: 'Калькулятор біологічного віку' },
  fr: { title: 'Calculatrice d\'âge biologique — Découvrez l\'âge réel de votre corps', description: 'Calculatrice d\'âge biologique gratuite. Découvrez l\'âge réel de votre corps selon votre style de vie : IMC, exercice, sommeil, alimentation, stress, tabac et alcool.', h1: 'Calculatrice d\'âge biologique' },
  lt: { title: 'Biologinio amžiaus skaičiuotuvas — sužinokite tikrąjį kūno amžių', description: 'Nemokamas biologinio amžiaus skaičiuotuvas. Sužinokite, kiek iš tikrųjų jaučiasi jūsų kūnas: KMI, fizinis aktyvumas, miegas, mityba, stresas, rūkymas ir alkoholis.', h1: 'Biologinio amžiaus skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Your biological age reflects how well your body is functioning compared to an average person of a given chronological age. Unlike your birth date, biological age can be improved through healthy lifestyle changes. This calculator estimates your biological age based on key lifestyle factors that science has linked to aging: BMI, physical activity, sleep quality, smoking, alcohol consumption, diet quality, and stress levels.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is biological age?', a: 'Biological age is an estimate of how old your body functions relative to population averages. A 40-year-old with an active lifestyle, healthy weight, and good sleep may have a biological age of 33, while someone with poor habits might register 48. It reflects cumulative health status, not just years lived.' },
      { q: 'Can I reduce my biological age?', a: 'Yes. Research shows that consistent exercise, quality sleep (7–9 hours), a balanced diet, not smoking, and managing stress can measurably slow or even reverse biological aging markers. Even small improvements — like adding 3 exercise sessions per week — can reduce biological age by 2–4 years.' },
      { q: 'How accurate is this calculator?', a: 'This is an estimation tool based on established risk factor research, not a clinical diagnostic. It uses well-documented correlations between lifestyle factors and aging biomarkers. For a precise biological age assessment, clinical tests such as epigenetic (DNA methylation) clocks or telomere length analysis are available through medical providers.' },
      { q: 'Which factor has the biggest impact?', a: 'Smoking has one of the strongest negative effects — studies suggest regular smoking can add 7–10 biological years. Physical inactivity and poor sleep quality each add roughly 3–5 years. BMI in the obese range adds 2–6 years depending on severity. Conversely, regular vigorous exercise is one of the strongest anti-aging interventions available.' },
    ],
  },
  ru: {
    description: 'Биологический возраст отражает, насколько хорошо функционирует ваш организм по сравнению со среднестатистическим человеком того же хронологического возраста. В отличие от даты рождения, биологический возраст можно улучшить через изменение образа жизни. Калькулятор оценивает биологический возраст на основе ключевых факторов: ИМТ, физическая активность, сон, курение, алкоголь, питание и уровень стресса.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое биологический возраст?', a: 'Биологический возраст — оценка того, насколько молодо или старо функционирует ваш организм относительно среднего человека. 40-летний с активным образом жизни и здоровым весом может иметь биологический возраст 33 года, а человек с нездоровыми привычками — 48 лет.' },
      { q: 'Можно ли снизить биологический возраст?', a: 'Да. Регулярные физические нагрузки, качественный сон (7–9 часов), сбалансированное питание, отказ от курения и управление стрессом способны замедлить или обратить вспять маркеры биологического старения. Даже небольшие изменения могут снизить биологический возраст на 2–4 года.' },
      { q: 'Насколько точен этот калькулятор?', a: 'Это инструмент-оценщик на основе исследований факторов риска, а не клинический диагностический инструмент. Для точного измерения биологического возраста доступны клинические тесты: эпигенетические часы (метилирование ДНК) или анализ длины теломер.' },
      { q: 'Какой фактор влияет сильнее всего?', a: 'Курение имеет один из самых сильных негативных эффектов — добавляет 7–10 биологических лет. Физическая инертность и плохой сон — по 3–5 лет. Ожирение — 2–6 лет. В то же время регулярные интенсивные тренировки — один из самых мощных антивозрастных инструментов.' },
    ],
  },
  uk: {
    description: 'Біологічний вік відображає, наскільки добре функціонує ваш організм порівняно з середньостатистичною людиною того ж хронологічного віку. На відміну від дати народження, біологічний вік можна покращити через зміну способу життя. Калькулятор оцінює біологічний вік на основі ключових факторів: ІМТ, фізична активність, сон, куріння, алкоголь, харчування та рівень стресу.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке біологічний вік?', a: 'Біологічний вік — оцінка того, наскільки молодо або старо функціонує ваш організм відносно середньої людини. 40-річний з активним способом життя може мати біологічний вік 33 роки, а людина з нездоровими звичками — 48 років.' },
      { q: 'Чи можна знизити біологічний вік?', a: 'Так. Регулярні фізичні навантаження, якісний сон (7–9 годин), збалансоване харчування, відмова від куріння та управління стресом здатні сповільнити або навіть обернути вспять маркери біологічного старіння.' },
      { q: 'Наскільки точний цей калькулятор?', a: 'Це інструмент-оцінювач на основі досліджень факторів ризику, а не клінічний діагностичний інструмент. Для точного вимірювання доступні клінічні тести: епігенетичні годинники (метилювання ДНК) або аналіз довжини теломер.' },
      { q: 'Який фактор впливає найбільше?', a: 'Куріння має один з найсильніших негативних ефектів — додає 7–10 біологічних років. Фізична інертність і поганий сон — по 3–5 років. Ожиріння — 2–6 років. Регулярні інтенсивні тренування — один з найпотужніших антивікових інструментів.' },
    ],
  },
  fr: {
    description: 'L\'âge biologique reflète l\'état de fonctionnement de votre corps par rapport à une personne moyenne du même âge chronologique. Contrairement à votre date de naissance, l\'âge biologique peut être amélioré grâce à des changements de mode de vie. Cette calculatrice estime votre âge biologique en fonction de facteurs clés : IMC, activité physique, sommeil, tabagisme, alcool, alimentation et stress.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'âge biologique ?', a: 'L\'âge biologique est une estimation de la façon dont votre corps fonctionne par rapport aux moyennes de la population. Une personne de 40 ans avec un mode de vie actif peut avoir un âge biologique de 33 ans, tandis qu\'une personne avec de mauvaises habitudes peut en avoir 48.' },
      { q: 'Peut-on réduire son âge biologique ?', a: 'Oui. Des études montrent que l\'exercice régulier, un sommeil de qualité (7–9 heures), une alimentation équilibrée, ne pas fumer et gérer le stress peuvent ralentir ou inverser les marqueurs du vieillissement biologique. Même de petites améliorations peuvent réduire l\'âge biologique de 2 à 4 ans.' },
      { q: 'Quelle est la précision de cette calculatrice ?', a: 'Il s\'agit d\'un outil d\'estimation basé sur des recherches sur les facteurs de risque, et non d\'un outil de diagnostic clinique. Pour une mesure précise, des tests cliniques comme les horloges épigénétiques (méthylation de l\'ADN) ou l\'analyse de la longueur des télomères sont disponibles.' },
      { q: 'Quel facteur a le plus grand impact ?', a: 'Le tabagisme a l\'un des effets négatifs les plus forts — il peut ajouter 7 à 10 ans biologiques. La sédentarité et le mauvais sommeil ajoutent chacun 3 à 5 ans. L\'obésité ajoute 2 à 6 ans. En revanche, l\'exercice vigourier régulier est l\'une des interventions anti-âge les plus puissantes.' },
    ],
  },
  lt: {
    description: 'Biologinis amžius atspindi, kaip gerai funkcionuoja jūsų kūnas, palyginti su vidutinio to paties chronologinio amžiaus žmogumi. Skirtingai nuo gimimo datos, biologinis amžius gali būti pagerintas keičiant gyvenimo būdą. Šis skaičiuotuvas įvertina biologinį amžių pagal pagrindinius veiksnius: KMI, fizinį aktyvumą, miegą, rūkymą, alkoholį, mitybą ir stresą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra biologinis amžius?', a: 'Biologinis amžius yra įvertinimas, kaip jaunas ar senas funkcionuoja jūsų kūnas, palyginti su populiacijos vidurkiais. 40-metis su aktyviu gyvenimo būdu gali turėti 33 metų biologinį amžių, o žmogus su blogais įpročiais — 48 metų.' },
      { q: 'Ar galima sumažinti biologinį amžių?', a: 'Taip. Tyrimai rodo, kad reguliari fizinė veikla, kokybiškas miegas (7–9 val.), subalansuota mityba, nerūkymas ir streso valdymas gali sulėtinti ar net atversti biologinio senėjimo žymenis. Net nedideli pokyčiai gali sumažinti biologinį amžių 2–4 metais.' },
      { q: 'Koks šio skaičiuotuvo tikslumas?', a: 'Tai įvertinimo priemonė, pagrįsta rizikos veiksnių tyrimais, o ne klinikinė diagnostinė priemonė. Tiksliam biologinio amžiaus matavimui galimi klinikiniai testai: epigenetiniai laikrodžiai (DNR metilinimas) arba telomerų ilgio analizė.' },
      { q: 'Kuris veiksnys turi didžiausią poveikį?', a: 'Rūkymas turi vieną stipriausių neigiamų poveikių — gali pridėti 7–10 biologinių metų. Fizinis neaktyvumas ir blogas miegas — po 3–5 metus. Nutukimas — 2–6 metus. Tuo tarpu reguliarios intensyvios treniruotės yra viena iš galingiausių priemonių prieš senėjimą.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/biological-age') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BiologicalAgePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: meta.title, description: meta.description, url: `https://www.utilixi.com/${locale}/calculator/biological-age`, applicationCategory: 'HealthApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <BiologicalAgeCalculator locale={locale} />
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
