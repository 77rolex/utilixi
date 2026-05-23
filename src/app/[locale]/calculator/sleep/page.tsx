import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import SleepCalculator from './SleepCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/stress-level', label: 'Stress Level Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }, { href: '/calculator/biological-age', label: 'Biological Age Calculator' }],
  ru: [{ href: '/calculator/stress-level', label: 'Калькулятор уровня стресса' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }, { href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }],
  uk: [{ href: '/calculator/stress-level', label: 'Калькулятор рівня стресу' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }, { href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }],
  fr: [{ href: '/calculator/stress-level', label: 'Calculatrice du stress' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }, { href: '/calculator/biological-age', label: 'Âge biologique' }],
  lt: [{ href: '/calculator/stress-level', label: 'Streso lygio skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }, { href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Sleep Calculator — Best Bedtimes Based on Sleep Cycles', description: 'Free sleep calculator based on 90-minute sleep cycles. Find the best time to wake up or go to bed to feel refreshed. Supports wake-up time, bedtime, and sleep-now modes.', h1: 'Sleep Calculator' },
  ru: { title: 'Калькулятор сна — лучшее время для подъёма по циклам сна', description: 'Бесплатный калькулятор сна на основе 90-минутных циклов. Найдите лучшее время для пробуждения или отхода ко сну, чтобы проснуться бодрым.', h1: 'Калькулятор сна' },
  uk: { title: 'Калькулятор сну — найкращий час для підйому за циклами сну', description: 'Безкоштовний калькулятор сну на основі 90-хвилинних циклів. Знайдіть найкращий час для пробудження або відходу до сну, щоб прокинутися бадьорим.', h1: 'Калькулятор сну' },
  fr: { title: 'Calculatrice du sommeil — Meilleurs horaires selon les cycles de sommeil', description: 'Calculatrice du sommeil gratuite basée sur les cycles de 90 minutes. Trouvez le meilleur moment pour vous réveiller ou vous coucher afin de vous sentir reposé(e).', h1: 'Calculatrice du sommeil' },
  lt: { title: 'Miego skaičiuotuvas — geriausias miego laikas pagal miego ciklus', description: 'Nemokamas miego skaičiuotuvas, pagrįstas 90 minučių miego ciklais. Raskite geriausią laiką pabusti arba eiti miegoti, kad pabustumėte žvalūs.', h1: 'Miego skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Sleep occurs in cycles of approximately 90 minutes, each consisting of several stages including light sleep, deep sleep (slow-wave sleep), and REM sleep. Waking up at the end of a complete cycle — rather than in the middle of deep sleep — significantly reduces sleep inertia (that groggy feeling). The calculator adds 14 minutes (average time to fall asleep) to the sleep time to give you accurate bedtimes or wake-up times aligned with natural cycle boundaries.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How long is one sleep cycle?', a: 'A complete sleep cycle lasts approximately 90 minutes and consists of: N1 (light sleep, ~5 min), N2 (light sleep, ~25 min), N3 (deep/slow-wave sleep, ~30 min), and REM (rapid eye movement, ~30 min). The proportion of REM sleep increases in later cycles, while deep sleep dominates early in the night.' },
      { q: 'Why does the calculator add 14 minutes?', a: 'The average person takes about 14 minutes to fall asleep after lying down. This is added to the recommended sleep duration so that your bedtime recommendation accounts for the time it actually takes to transition from wakefulness to the first sleep stage.' },
      { q: 'How many sleep cycles do I need?', a: 'Adults need 7–9 hours of sleep per night, which corresponds to 5–6 full cycles (450–540 minutes). 4 cycles (6 hours) is the minimum many function on, but research consistently shows that 5–6 cycles (7.5–9 hours) is optimal for cognitive performance, mood, and physical health.' },
      { q: 'What if I can\'t fall asleep exactly at the suggested time?', a: 'The 14-minute estimate is an average. If you know it takes you longer (e.g., 30 minutes), mentally adjust the bedtime earlier by the difference. The key goal is to wake up after a complete cycle — even 5–10 minutes late means you\'re in a new cycle, and waking mid-cycle can still cause grogginess.' },
    ],
  },
  ru: {
    description: 'Сон протекает циклами примерно по 90 минут, каждый из которых включает несколько стадий: лёгкий сон, глубокий сон (медленноволновой) и фазу быстрого сна (REM). Пробуждение в конце полного цикла, а не в середине глубокого сна, значительно снижает сонную инерцию (ощущение разбитости). Калькулятор добавляет 14 минут (среднее время засыпания) к времени сна для точного расчёта.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько длится один цикл сна?', a: 'Полный цикл сна длится около 90 минут и состоит из: N1 (лёгкий сон, ~5 мин), N2 (лёгкий сон, ~25 мин), N3 (глубокий сон, ~30 мин) и REM (быстрый сон, ~30 мин). Доля REM-сна возрастает в поздних циклах, тогда как глубокий сон преобладает в начале ночи.' },
      { q: 'Почему калькулятор добавляет 14 минут?', a: 'В среднем человеку требуется около 14 минут, чтобы заснуть после того, как он лёг в постель. Это учитывается в расчёте, чтобы время отхода ко сну соответствовало реальному переходу от бодрствования к первой стадии сна.' },
      { q: 'Сколько циклов сна мне нужно?', a: 'Взрослым необходимо 7–9 часов сна в сутки, что соответствует 5–6 полным циклам (450–540 минут). 4 цикла (6 часов) — минимум, при котором многие функционируют, но 5–6 циклов оптимальны для когнитивных способностей, настроения и здоровья.' },
      { q: 'Что если я не могу заснуть точно в указанное время?', a: 'Оценка 14 минут — среднее значение. Если вам нужно больше времени (например, 30 минут), скорректируйте время отхода ко сну. Главное — проснуться после завершённого цикла, а не в его середине.' },
    ],
  },
  uk: {
    description: 'Сон відбувається циклами приблизно по 90 хвилин, кожен з яких включає кілька стадій: легкий сон, глибокий сон (повільнохвильовий) та фазу швидкого сну (REM). Пробудження в кінці повного циклу, а не в середині глибокого сну, значно знижує сонну інерцію. Калькулятор додає 14 хвилин (середній час засинання) до часу сну для точного розрахунку.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки триває один цикл сну?', a: 'Повний цикл сну триває близько 90 хвилин і складається з: N1 (легкий сон, ~5 хв), N2 (легкий сон, ~25 хв), N3 (глибокий сон, ~30 хв) та REM (швидкий сон, ~30 хв). Частка REM-сну зростає в пізніх циклах, тоді як глибокий сон переважає на початку ночі.' },
      { q: 'Чому калькулятор додає 14 хвилин?', a: 'В середньому людині потрібно близько 14 хвилин, щоб заснути після того, як вона лягла в ліжко. Це враховується в розрахунку для точного визначення часу відходу до сну.' },
      { q: 'Скільки циклів сну мені потрібно?', a: 'Дорослим необхідно 7–9 годин сну на добу, що відповідає 5–6 повним циклам (450–540 хвилин). 4 цикли (6 годин) — мінімум, але 5–6 циклів оптимальні для когнітивних здібностей і здоров\'я.' },
      { q: 'Що якщо я не можу заснути точно в зазначений час?', a: 'Оцінка 14 хвилин — середнє значення. Якщо вам потрібно більше часу, скоригуйте час відходу до сну. Головне — прокинутися після завершеного циклу, а не в його середині.' },
    ],
  },
  fr: {
    description: 'Le sommeil se déroule en cycles d\'environ 90 minutes, comprenant plusieurs stades : sommeil léger, sommeil profond (ondes lentes) et sommeil paradoxal (REM). Se réveiller à la fin d\'un cycle complet plutôt qu\'en plein sommeil profond réduit considérablement l\'inertie du sommeil (sensation de grogue). La calculatrice ajoute 14 minutes (temps moyen d\'endormissement) pour des recommandations précises.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Combien de temps dure un cycle de sommeil ?', a: 'Un cycle de sommeil complet dure environ 90 minutes et comprend : N1 (sommeil léger, ~5 min), N2 (sommeil léger, ~25 min), N3 (sommeil profond, ~30 min) et REM (sommeil paradoxal, ~30 min). La proportion de REM augmente dans les cycles tardifs, tandis que le sommeil profond prédomine en début de nuit.' },
      { q: 'Pourquoi la calculatrice ajoute-t-elle 14 minutes ?', a: 'La plupart des gens mettent environ 14 minutes à s\'endormir après s\'être allongés. Ce délai est pris en compte pour que l\'heure de coucher recommandée corresponde au temps réel de transition entre l\'éveil et la première phase de sommeil.' },
      { q: 'De combien de cycles ai-je besoin ?', a: 'Les adultes ont besoin de 7 à 9 heures de sommeil par nuit, ce qui correspond à 5 à 6 cycles complets (450 à 540 minutes). 4 cycles (6 heures) est le minimum pour beaucoup, mais 5 à 6 cycles sont optimaux pour les performances cognitives, l\'humeur et la santé physique.' },
      { q: 'Que faire si je ne peux pas m\'endormir exactement à l\'heure suggérée ?', a: 'Les 14 minutes sont une moyenne. Si vous savez que vous mettez plus longtemps, avancez l\'heure de coucher en conséquence. L\'objectif principal est de se réveiller après un cycle complet — même 5 à 10 minutes de retard peut vous faire entrer dans un nouveau cycle.' },
    ],
  },
  lt: {
    description: 'Miegas vyksta ~90 minučių ciklais, kurių kiekvieną sudaro keli etapai: lengvas miegas, gilus miegas (lėtų bangų) ir REM miegas. Pabusti ciklo pabaigoje, o ne gilaus miego viduryje, žymiai sumažina miego inerciją (apsiblausimo jausmą). Skaičiuotuvas prideda 14 minučių (vidutinį užmigimo laiką) prie miego laiko tiksliam skaičiavimui.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek trunka vienas miego ciklas?', a: 'Visas miego ciklas trunka apie 90 minučių ir susideda iš: N1 (lengvas miegas, ~5 min), N2 (lengvas miegas, ~25 min), N3 (gilus miegas, ~30 min) ir REM (greitas akių judėjimas, ~30 min). REM miego dalis didėja vėlesniuose cikluose, o gilus miegas vyrauja nakties pradžioje.' },
      { q: 'Kodėl skaičiuotuvas prideda 14 minučių?', a: 'Vidutiniškai žmogui reikia apie 14 minučių užmigti po atsigulimo. Tai įtraukiama į skaičiavimą, kad rekomenduojamas miego laikas atitiktų tikrąjį perėjimą iš budrumo į pirmąjį miego etapą.' },
      { q: 'Kiek miego ciklų man reikia?', a: 'Suaugusiesiems reikia 7–9 valandų miego per naktį, tai atitinka 5–6 pilnus ciklus (450–540 minučių). 4 ciklai (6 valandos) yra minimumas, bet 5–6 ciklai yra optimalūs kognityviniam našumui, nuotaikai ir fizinei sveikatai.' },
      { q: 'Ką daryti, jei negaliu užmigti tiksliai siūlomu laiku?', a: '14 minučių yra vidurkis. Jei žinote, kad jums reikia ilgiau, atitinkamai paankstinkite miego laiką. Pagrindinis tikslas — pabusti po viso ciklo, o ne jo viduryje.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: buildAlternates(locale, '/calculator/sleep'),
  };
}

export default async function SleepPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/sleep`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <SleepCalculator locale={locale} />
      <AdInline locale={locale} />
      <div className={styles.page__content}>
        <p className={styles.page__description}>{c.description}</p>
        <div className={styles.faq}>
          <h2 className={styles.faq__title}>{c.faqTitle}</h2>
          <div className={styles.faq__list}>
            {c.faqs.map((f, i) => (
              <div key={i} className={styles.faq__item}>
                <p className={styles.faq__question}>{f.q}</p>
                <p className={styles.faq__answer}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RelatedTools locale={locale} tools={related} />
    </PageLayout>
  );
}
