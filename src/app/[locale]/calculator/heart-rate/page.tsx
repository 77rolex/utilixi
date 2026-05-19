import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import HeartRateCalculator from './HeartRateCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/bmi', label: 'BMI Calculator' }, { href: '/calculator/calories', label: 'Calorie Calculator' }],
  ru: [{ href: '/calculator/bmi', label: 'Калькулятор ИМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорий' }],
  uk: [{ href: '/calculator/bmi', label: 'Калькулятор ІМТ' }, { href: '/calculator/calories', label: 'Калькулятор калорій' }],
  fr: [{ href: '/calculator/bmi', label: 'Calculatrice IMC' }, { href: '/calculator/calories', label: 'Calculatrice de calories' }],
  lt: [{ href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }, { href: '/calculator/calories', label: 'Kalorijų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Heart Rate Zones Calculator — Training Zones by Age', description: 'Free heart rate zones calculator. Find your 5 training zones based on your age and optional resting HR using the 220−age and Karvonen formulas.', h1: 'Heart Rate Zones Calculator' },
  ru: { title: 'Калькулятор пульсовых зон — тренировочные зоны по возрасту', description: 'Бесплатный калькулятор пульсовых зон. Рассчитайте 5 зон тренировки по возрасту и пульсу покоя по формуле 220−возраст и методу Карвонена.', h1: 'Калькулятор пульсовых зон' },
  uk: { title: 'Калькулятор пульсових зон — тренувальні зони за віком', description: 'Безкоштовний калькулятор пульсових зон. Розрахуйте 5 зон тренування за віком і пульсом спокою за формулою 220−вік і методом Карвонена.', h1: 'Калькулятор пульсових зон' },
  fr: { title: 'Calculatrice des zones de fréquence cardiaque — Zones d\'entraînement', description: 'Calculatrice gratuite des zones de fréquence cardiaque. Trouvez vos 5 zones d\'entraînement selon votre âge et FC de repos, formules 220−âge et Karvonen.', h1: 'Calculatrice des zones de fréquence cardiaque' },
  lt: { title: 'Pulso Zonų Skaičiuotuvas — Treniruočių zonos pagal amžių', description: 'Nemokamas pulso zonų skaičiuotuvas. Raskite savo 5 treniruočių zonas pagal amžių ir ramybės pulsą, naudodami 220−amžius ir Karvonenų formules.', h1: 'Pulso zonų skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Heart rate training zones help you target specific energy systems during exercise. Enter your age to calculate the 5 zones based on the standard 220−age formula. Optionally enter your resting heart rate to use the more accurate Karvonen method, which accounts for your individual cardiovascular fitness.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What are the 5 heart rate training zones?', a: 'Zone 1 (50–60% max HR): very light — warm-up and recovery. Zone 2 (60–70%): light — fat-burning, base endurance. Zone 3 (70–80%): moderate — aerobic fitness, cardio. Zone 4 (80–90%): hard — anaerobic threshold training. Zone 5 (90–100%): maximum — peak speed and power.' },
      { q: 'How is maximum heart rate calculated?', a: 'The most common formula is 220 − age. For example, a 35-year-old has an estimated max HR of 185 bpm. More precise formulas exist (e.g., Tanaka: 208 − 0.7 × age), but 220−age remains the standard for general use.' },
      { q: 'What is the Karvonen formula?', a: 'The Karvonen method calculates target HR using heart rate reserve (HRR = max HR − resting HR). Target HR = resting HR + (HRR × intensity%). This gives more personalized zones because it factors in your baseline cardiovascular fitness.' },
      { q: 'What is the best zone for fat burning?', a: 'Zone 2 (60–70% max HR) is often called the "fat-burning zone" because fat is the primary fuel source at this intensity. However, total calorie burn is lower than in higher zones. For weight loss, a mix of Zone 2 and Zone 3–4 training is typically most effective.' },
      { q: 'How do I measure my resting heart rate?', a: 'Measure your resting HR first thing in the morning before getting out of bed. Count your pulse for 60 seconds (or 30 seconds × 2). An average adult resting HR is 60–80 bpm. Trained athletes may have resting HRs of 40–60 bpm.' },
    ],
  },
  ru: {
    description: 'Пульсовые зоны помогают целенаправленно тренировать разные энергетические системы. Введите возраст — и калькулятор рассчитает 5 зон по формуле 220−возраст. При желании введите пульс в покое для использования более точного метода Карвонена, учитывающего вашу индивидуальную физическую форму.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое 5 пульсовых зон тренировки?', a: 'Зона 1 (50–60% от МЧСС): очень лёгкая — разминка и восстановление. Зона 2 (60–70%): лёгкая — сжигание жира, базовая выносливость. Зона 3 (70–80%): умеренная — аэробная нагрузка. Зона 4 (80–90%): тяжёлая — анаэробный порог. Зона 5 (90–100%): максимальная — пиковая нагрузка.' },
      { q: 'Как рассчитывается максимальная ЧСС?', a: 'Наиболее распространённая формула: 220 − возраст. Например, для человека 35 лет максимальная ЧСС составит примерно 185 уд/мин. Существуют более точные формулы (например, Танака: 208 − 0,7 × возраст), но 220−возраст остаётся стандартом.' },
      { q: 'Что такое формула Карвонена?', a: 'Метод Карвонена рассчитывает целевую ЧСС с использованием резерва пульса (РП = МЧСС − пульс покоя). Целевая ЧСС = пульс покоя + (РП × интенсивность%). Это даёт более персонализированные зоны, так как учитывает уровень вашей физической формы.' },
      { q: 'Какая зона лучше всего подходит для сжигания жира?', a: 'Зона 2 (60–70% от МЧСС) называется «зоной сжигания жира», так как в ней жир является основным источником энергии. Однако общий расход калорий ниже, чем в высших зонах. Для похудения эффективнее сочетать зоны 2 и 3–4.' },
      { q: 'Как измерить пульс в покое?', a: 'Измеряйте пульс покоя с утра, сразу после пробуждения, ещё лёжа в постели. Считайте удары 60 секунд (или 30 × 2). Норма для взрослого — 60–80 уд/мин. У тренированных спортсменов пульс покоя может быть 40–60 уд/мин.' },
    ],
  },
  uk: {
    description: 'Пульсові зони допомагають цілеспрямовано тренувати різні енергетичні системи. Введіть вік — калькулятор розрахує 5 зон за формулою 220−вік. За бажанням введіть пульс у спокої для використання точнішого методу Карвонена, який враховує вашу індивідуальну фізичну форму.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке 5 пульсових зон тренування?', a: 'Зона 1 (50–60% від МЧСС): дуже легка — розминка і відновлення. Зона 2 (60–70%): легка — спалювання жиру, базова витривалість. Зона 3 (70–80%): помірна — аеробне навантаження. Зона 4 (80–90%): важка — анаеробний поріг. Зона 5 (90–100%): максимальна — пікове навантаження.' },
      { q: 'Як розраховується максимальна ЧСС?', a: 'Найпоширеніша формула: 220 − вік. Наприклад, для 35-річної людини максимальна ЧСС становить приблизно 185 уд/хв.' },
      { q: 'Що таке формула Карвонена?', a: 'Метод Карвонена розраховує цільову ЧСС із використанням резерву пульсу (РП = МЧСС − пульс спокою). Цільова ЧСС = пульс спокою + (РП × інтенсивність%). Це дає персоналізованіші зони.' },
      { q: 'Яка зона краща для спалювання жиру?', a: 'Зона 2 (60–70% від МЧСС) називається «зоною спалювання жиру». Для схуднення ефективніше поєднувати зони 2 і 3–4.' },
      { q: 'Як виміряти пульс у спокої?', a: 'Вимірюйте пульс спокою вранці, відразу після пробудження. Порахуйте удари 60 секунд. Норма для дорослого — 60–80 уд/хв. У спортсменів пульс спокою може бути 40–60 уд/хв.' },
    ],
  },
  fr: {
    description: 'Les zones de fréquence cardiaque aident à cibler des systèmes énergétiques spécifiques à l\'entraînement. Entrez votre âge pour calculer les 5 zones selon la formule standard 220−âge. Entrez optionnellement votre FC de repos pour utiliser la méthode de Karvonen, plus précise.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelles sont les 5 zones d\'entraînement ?', a: 'Zone 1 (50–60% FC max) : très légère — échauffement et récupération. Zone 2 (60–70%) : légère — combustion des graisses, endurance de base. Zone 3 (70–80%) : modérée — aérobie. Zone 4 (80–90%) : intense — seuil anaérobie. Zone 5 (90–100%) : maximale — effort maximal.' },
      { q: 'Comment calcule-t-on la fréquence cardiaque maximale ?', a: 'La formule la plus courante est 220 − âge. Par exemple, pour une personne de 35 ans, la FC max estimée est de 185 bpm. La formule de Tanaka (208 − 0,7 × âge) est parfois considérée plus précise.' },
      { q: 'Qu\'est-ce que la formule de Karvonen ?', a: 'La méthode de Karvonen utilise la réserve de FC (RCF = FC max − FC repos). FC cible = FC repos + (RCF × intensité%). Elle donne des zones plus personnalisées en tenant compte de votre condition cardiovasculaire.' },
      { q: 'Quelle zone est la meilleure pour brûler les graisses ?', a: 'La Zone 2 (60–70% FC max) est appelée « zone de combustion des graisses ». Pour la perte de poids, un mélange de Zones 2 et 3–4 est généralement le plus efficace.' },
      { q: 'Comment mesurer sa FC de repos ?', a: 'Mesurez votre FC de repos le matin, avant de vous lever. Comptez votre pouls pendant 60 secondes. La FC de repos normale chez un adulte est de 60–80 bpm. Les athlètes entraînés peuvent avoir 40–60 bpm.' },
    ],
  },
  lt: {
    description: 'Pulso zonos padeda tikslingai treniruoti skirtingas energetines sistemas. Įveskite amžių — skaičiuotuvas apskaičiuos 5 zonas pagal standartinę 220−amžius formulę. Neprivaloma: įveskite ramybės pulsą, kad naudotumėte tikslesnį Karvonenų metodą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kokios yra 5 treniruočių pulso zonos?', a: '1 zona (50–60% maks. pulso): labai lengva — atšilimas ir atsigavimas. 2 zona (60–70%): lengva — riebalų deginimas, bazinė ištvermė. 3 zona (70–80%): vidutinė — aerobinis krūvis. 4 zona (80–90%): sunki — anaerobinis slenkstis. 5 zona (90–100%): maksimali — didžiausios pastangos.' },
      { q: 'Kaip apskaičiuojamas maksimalus pulsas?', a: 'Labiausiai paplitusi formulė: 220 − amžius. Pavyzdžiui, 35 metų žmogui maksimalus pulsas yra apytiksliai 185 k/min.' },
      { q: 'Kas yra Karvonenų formulė?', a: 'Karvonenų metodas apskaičiuoja tikslinį pulsą naudojant pulso rezervą (PR = maks. pulsas − ramybės pulsas). Tikslinė zona = ramybės pulsas + (PR × intensyvumas%). Tai suteikia labiau individualizuotas zonas.' },
      { q: 'Kuri zona geriausia riebalų deginimui?', a: '2 zona (60–70% maks. pulso) vadinama „riebalų deginimo zona". Svorio metimui paprastai efektyviausia derinti 2 ir 3–4 zonas.' },
      { q: 'Kaip išmatuoti ramybės pulsą?', a: 'Matuokite ramybės pulsą ryte, prieš atsikeldami iš lovos. Skaičiuokite smūgius 60 sekundžių. Suaugusiojo norma — 60–80 k/min. Treniruoti sportininkai gali turėti 40–60 k/min.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => { alternates[l] = `https://utilixi.com/${l}/calculator/heart-rate`; });
  return { title: meta.title, description: meta.description, alternates: { languages: alternates } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HeartRatePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/heart-rate`,
    applicationCategory: 'HealthApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <HeartRateCalculator locale={locale} />
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
