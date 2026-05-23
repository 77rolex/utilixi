import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import StressLevelCalculator from './StressLevelCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/heart-rate', label: 'Heart Rate Zones' }, { href: '/calculator/sleep', label: 'Sleep Calculator' }],
  ru: [{ href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }, { href: '/calculator/heart-rate', label: 'Пульсовые зоны' }, { href: '/calculator/sleep', label: 'Калькулятор сна' }],
  uk: [{ href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }, { href: '/calculator/heart-rate', label: 'Пульсові зони' }, { href: '/calculator/sleep', label: 'Калькулятор сну' }],
  fr: [{ href: '/calculator/biological-age', label: 'Âge biologique' }, { href: '/calculator/heart-rate', label: 'Zones de FC' }, { href: '/calculator/sleep', label: 'Calculatrice du sommeil' }],
  lt: [{ href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }, { href: '/calculator/heart-rate', label: 'Pulso zonos' }, { href: '/calculator/sleep', label: 'Miego skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Stress Level Calculator — PSS-10 Perceived Stress Test', description: 'Free online stress level test based on the Perceived Stress Scale (PSS-10). Answer 10 questions to find out if your stress is low, moderate, or high.', h1: 'Stress Level Calculator' },
  ru: { title: 'Калькулятор уровня стресса — тест PSS-10', description: 'Бесплатный тест на уровень стресса по шкале PSS-10. Ответьте на 10 вопросов и узнайте, низкий, умеренный или высокий у вас уровень стресса.', h1: 'Калькулятор уровня стресса' },
  uk: { title: 'Калькулятор рівня стресу — тест PSS-10', description: 'Безкоштовний тест на рівень стресу за шкалою PSS-10. Дайте відповідь на 10 запитань і дізнайтеся свій рівень стресу.', h1: 'Калькулятор рівня стресу' },
  fr: { title: 'Calculatrice du niveau de stress — Test PSS-10', description: 'Test de stress gratuit basé sur l\'échelle PSS-10. Répondez à 10 questions pour savoir si votre stress est faible, modéré ou élevé.', h1: 'Calculatrice du niveau de stress' },
  lt: { title: 'Streso lygio skaičiuotuvas — PSS-10 testas', description: 'Nemokamas streso lygio testas pagal PSS-10 skalę. Atsakykite į 10 klausimų ir sužinokite, ar jūsų stresas žemas, vidutinis ar aukštas.', h1: 'Streso lygio skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Perceived Stress Scale (PSS-10) is one of the most widely used psychological instruments for measuring the perception of stress. Developed by Dr. Sheldon Cohen in 1983, it asks about feelings and thoughts during the last month. The PSS assesses the degree to which situations in one\'s life are seen as stressful. Understanding your stress level is the first step toward managing it effectively.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the PSS-10?', a: 'The Perceived Stress Scale (PSS-10) is a validated 10-item psychological questionnaire developed by Sheldon Cohen at Carnegie Mellon University. It measures the degree to which situations in your life are appraised as stressful. It is not a clinical diagnostic tool but a widely used screening instrument in research and wellness settings.' },
      { q: 'What do the score ranges mean?', a: 'Scores range from 0 to 40. Low stress: 0–13 — you handle life events well. Moderate stress: 14–26 — you face typical daily pressures and may benefit from stress reduction strategies. High stress: 27–40 — you are experiencing significant stress that may affect your health; consider speaking to a professional.' },
      { q: 'Why are some questions reversed?', a: 'Questions 4, 5, 7, and 8 ask about positive experiences (feeling confident, things going your way). These are scored in reverse — answering "very often" for these reduces your stress score, reflecting good coping. This design makes the scale more accurate and reduces response bias.' },
      { q: 'What can I do to reduce my stress level?', a: 'Evidence-based strategies include: regular aerobic exercise (30 min/day), mindfulness meditation, adequate sleep (7–9 hours), reducing caffeine and alcohol, time management techniques, social support from friends and family, and professional counseling or therapy if needed.' },
    ],
  },
  ru: {
    description: 'Шкала воспринимаемого стресса (PSS-10) — один из наиболее широко применяемых психологических инструментов для измерения уровня стресса. Разработана доктором Шелдоном Коэном в 1983 году. Тест задаёт вопросы о чувствах и мыслях в течение последнего месяца, оценивая, насколько ситуации воспринимаются как стрессовые. Понимание своего уровня стресса — первый шаг к его эффективному управлению.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое PSS-10?', a: 'Шкала воспринимаемого стресса (PSS-10) — валидированный психологический опросник из 10 вопросов, разработанный Шелдоном Коэном в Университете Карнеги–Меллон. Он измеряет, насколько ситуации в жизни воспринимаются как стрессовые. Не является клиническим диагностическим инструментом, но широко используется в исследованиях.' },
      { q: 'Что означают диапазоны баллов?', a: 'Баллы от 0 до 40. Низкий стресс: 0–13 — вы хорошо справляетесь с жизненными событиями. Умеренный стресс: 14–26 — вы испытываете типичное давление и можете воспользоваться методами снижения стресса. Высокий стресс: 27–40 — вы испытываете значительный стресс, который может влиять на здоровье.' },
      { q: 'Почему некоторые вопросы оцениваются в обратном порядке?', a: 'Вопросы 4, 5, 7 и 8 касаются позитивного опыта (уверенность, всё идёт как надо). Они оцениваются в обратном порядке — частые позитивные ответы снижают балл стресса, отражая хорошие копинг-навыки. Это делает шкалу более точной.' },
      { q: 'Что делать для снижения уровня стресса?', a: 'Научно обоснованные методы: регулярные аэробные нагрузки (30 мин/день), медитация осознанности, достаточный сон (7–9 часов), снижение потребления кофеина и алкоголя, тайм-менеджмент, социальная поддержка, при необходимости — консультация специалиста.' },
    ],
  },
  uk: {
    description: 'Шкала сприйнятого стресу (PSS-10) — один з найбільш широко застосовуваних психологічних інструментів для вимірювання рівня стресу. Розроблена доктором Шелдоном Коеном у 1983 році. Тест задає питання про почуття та думки протягом останнього місяця, оцінюючи, наскільки ситуації сприймаються як стресові. Розуміння свого рівня стресу — перший крок до ефективного управління ним.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке PSS-10?', a: 'Шкала сприйнятого стресу (PSS-10) — валідований психологічний опитувальник з 10 запитань, розроблений Шелдоном Коеном в Університеті Карнегі–Меллон. Він вимірює, наскільки ситуації в житті сприймаються як стресові. Не є клінічним діагностичним інструментом.' },
      { q: 'Що означають діапазони балів?', a: 'Бали від 0 до 40. Низький стрес: 0–13 — ви добре справляєтеся з подіями. Помірний стрес: 14–26 — ви відчуваєте типичний тиск і можете скористатися методами зниження стресу. Високий стрес: 27–40 — ви відчуваєте значний стрес, який може впливати на здоров\'я.' },
      { q: 'Чому деякі питання оцінюються у зворотному порядку?', a: 'Питання 4, 5, 7 і 8 стосуються позитивного досвіду (впевненість, все йде як треба). Вони оцінюються у зворотному порядку — часті позитивні відповіді знижують бал стресу. Це робить шкалу більш точною.' },
      { q: 'Що робити для зниження рівня стресу?', a: 'Науково обґрунтовані методи: регулярні аеробні навантаження (30 хв/день), медитація усвідомленості, достатній сон (7–9 годин), зниження споживання кофеїну та алкоголю, тайм-менеджмент, соціальна підтримка, за необхідності — консультація спеціаліста.' },
    ],
  },
  fr: {
    description: 'L\'échelle de stress perçu (PSS-10) est l\'un des instruments psychologiques les plus utilisés pour mesurer la perception du stress. Développée par le Dr Sheldon Cohen en 1983, elle pose des questions sur les sentiments et pensées du dernier mois. La PSS évalue dans quelle mesure les situations de la vie sont perçues comme stressantes. Comprendre son niveau de stress est la première étape pour le gérer efficacement.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le PSS-10 ?', a: 'L\'échelle de stress perçu (PSS-10) est un questionnaire psychologique validé de 10 items développé par Sheldon Cohen à l\'Université Carnegie Mellon. Il mesure dans quelle mesure les situations de votre vie sont perçues comme stressantes. Ce n\'est pas un outil de diagnostic clinique, mais un instrument de dépistage largement utilisé.' },
      { q: 'Que signifient les plages de scores ?', a: 'Les scores vont de 0 à 40. Stress faible : 0–13 — vous gérez bien les événements. Stress modéré : 14–26 — vous faites face aux pressions quotidiennes et pouvez bénéficier de stratégies de réduction du stress. Stress élevé : 27–40 — vous ressentez un stress important qui peut affecter votre santé.' },
      { q: 'Pourquoi certaines questions sont-elles inversées ?', a: 'Les questions 4, 5, 7 et 8 portent sur des expériences positives (confiance en soi, les choses vont dans votre sens). Elles sont notées à l\'envers — répondre souvent positivement réduit le score de stress, reflétant de bonnes capacités d\'adaptation.' },
      { q: 'Comment réduire mon niveau de stress ?', a: 'Stratégies fondées sur des preuves : exercice aérobique régulier (30 min/jour), méditation de pleine conscience, sommeil suffisant (7–9 heures), réduction de la caféine et de l\'alcool, gestion du temps, soutien social, et si nécessaire, consultation professionnelle.' },
    ],
  },
  lt: {
    description: 'Suvokiamo streso skalė (PSS-10) yra vienas iš plačiausiai naudojamų psichologinių instrumentų streso lygiui matuoti. Sukurta dr. Sheldono Coheno 1983 m. Testas klausia apie jausmus ir mintis per praėjusį mėnesį, vertindamas, kiek situacijos gyvenime suvokiamos kaip stresinės. Streso lygio supratimas yra pirmasis žingsnis jo valdymui.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra PSS-10?', a: 'Suvokiamo streso skalė (PSS-10) — tai patvirtintas 10 klausimų psichologinis klausimynas, sukurtas Sheldono Coheno Karnegio Melono universitete. Jis matuoja, kiek gyvenimo situacijos suvokiamos kaip stresinės. Tai nėra klinikinės diagnostikos priemonė, tačiau plačiai naudojama tyrimuose ir sveikatos priežiūroje.' },
      { q: 'Ką reiškia balų intervalai?', a: 'Balai svyruoja nuo 0 iki 40. Mažas stresas: 0–13 — jūs gerai susitvarkyti su gyvenimo įvykiais. Vidutinis stresas: 14–26 — jūs patiriate tipinį kasdienį spaudimą ir galite pasinaudoti streso mažinimo strategijomis. Didelis stresas: 27–40 — jūs patirkiate didelį stresą, kuris gali paveikti jūsų sveikatą.' },
      { q: 'Kodėl kai kurie klausimai yra atvirkštiniai?', a: 'Klausimai 4, 5, 7 ir 8 klausia apie teigiamą patirtį (pasitikėjimas savimi, viskas klostosi gerai). Jie vertinami atvirkštiniai — dažni teigiami atsakymai mažina streso balą. Tai skalę daro tikslesnę.' },
      { q: 'Ką galima padaryti, kad sumažėtų streso lygis?', a: 'Moksliniais įrodymais pagrįstos strategijos: reguliari aerobinė veikla (30 min/dieną), sąmoningumo meditacija, pakankamas miegas (7–9 val.), kofeino ir alkoholio mažinimas, laiko valdymas, socialinė parama ir, jei reikia, profesionali konsultacija.' },
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
    alternates: buildAlternates(locale, '/calculator/stress-level'),
  };
}

export default async function StressLevelPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/stress-level`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <StressLevelCalculator locale={locale} />
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
