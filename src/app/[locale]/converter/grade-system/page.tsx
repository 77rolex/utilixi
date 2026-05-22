import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import GradeSystemConverter from './GradeSystemConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/gpa', label: 'GPA Calculator' }, { href: '/converter/units', label: 'Unit Converter' }],
  ru: [{ href: '/calculator/gpa', label: 'Калькулятор GPA' }, { href: '/converter/units', label: 'Конвертер единиц' }],
  uk: [{ href: '/calculator/gpa', label: 'Калькулятор GPA' }, { href: '/converter/units', label: 'Конвертер одиниць' }],
  fr: [{ href: '/calculator/gpa', label: 'Calculatrice GPA' }, { href: '/converter/units', label: 'Convertisseur d\'unités' }],
  lt: [{ href: '/calculator/gpa', label: 'GPA skaičiuotuvas' }, { href: '/converter/units', label: 'Vienetų konverteris' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Grade System Converter — US GPA, UK, ECTS, Russian, German', description: 'Free grade system converter. Convert grades between US GPA (4.0), UK percentage, European ECTS (A–F), Russian 5-point scale, and German 1–6 system instantly.', h1: 'Grade System Converter' },
  ru: { title: 'Конвертер систем оценок — GPA, ECTS, русская, немецкая', description: 'Бесплатный конвертер систем оценок. Переводите оценки между американской GPA (4.0), британской %, европейской ECTS (A–F), российской пятибалльной и немецкой системами.', h1: 'Конвертер систем оценок' },
  uk: { title: 'Конвертер систем оцінок — GPA, ECTS, українська, німецька', description: 'Безкоштовний конвертер систем оцінок. Переводьте оцінки між американською GPA (4.0), британською %, європейською ECTS (A–F), українською п\'ятибальною та німецькою системами.', h1: 'Конвертер систем оцінок' },
  fr: { title: 'Convertisseur de systèmes de notation — GPA, ECTS, russe, allemand', description: 'Convertisseur de notes gratuit. Convertissez les notes entre le GPA américain (4,0), les pourcentages UK, l\'ECTS européen (A–F), le système russe sur 5 et le système allemand.', h1: 'Convertisseur de systèmes de notation' },
  lt: { title: 'Pažymių sistemų konverteris — GPA, ECTS, rusiška, vokiška', description: 'Nemokamas pažymių sistemų konverteris. Konvertuokite pažymius tarp JAV GPA (4,0), JK procentų, Europos ECTS (A–F), Rusijos 5 balų ir Vokietijos sistemų.', h1: 'Pažymių sistemų konverteris' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our grade system converter lets you instantly translate any grade between 5 major grading systems used worldwide. Whether you need to understand a US GPA on a European scale, convert a Russian grade for a German university application, or compare academic performance across different educational systems — simply enter your grade and source system.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How does the converter work?', a: 'The converter normalises all grades to a 0–100% scale internally and then converts to each target system. While this is an approximation (grade system boundaries vary by institution), it provides a reliable reference for academic comparisons and applications.' },
      { q: 'What is the ECTS grading scale?', a: 'ECTS (European Credit Transfer and Accumulation System) grades run from A (best 10%) to E (lowest 50% that still passes), with F as fail. The percentile boundaries are: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, E ≥ 50%.' },
      { q: 'How is the German grading scale different?', a: 'The German scale runs from 1.0 (best) to 6.0 (fail), which is the opposite of most other systems. Grade 1.0–1.5 is "sehr gut" (very good), 1.6–2.5 is "gut" (good), 2.6–3.5 is "befriedigend" (satisfactory), 3.6–4.0 is "ausreichend" (sufficient), and above 4.0 is failing.' },
      { q: 'Is 4.0 GPA equivalent to 100%?', a: 'Not exactly. A 4.0 GPA typically corresponds to an A or A+ grade, which in the US usually means scoring 90–100%. However, a 4.3 GPA (A+) represents exceptional performance. A 3.0 (B) roughly corresponds to 80–89%.' },
    ],
  },
  ru: {
    description: 'Конвертер систем оценок позволяет мгновенно перевести любую оценку между 5 основными системами, используемыми в мире. Просто введите оценку и выберите исходную систему — получите эквиваленты во всех остальных.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как работает конвертер?', a: 'Конвертер нормализует все оценки к внутренней шкале 0–100%, а затем переводит в каждую целевую систему. Это приближённое значение, поскольку границы систем оценок варьируются по учебным заведениям.' },
      { q: 'Что такое шкала ECTS?', a: 'ECTS (Европейская система переноса кредитов) использует оценки от A (лучшие 10%) до E (нижние 50% успевающих), F — незачёт. Границы: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, E ≥ 50%.' },
      { q: 'Чем отличается немецкая система?', a: 'Немецкая шкала идёт от 1.0 (лучший) до 6.0 (неудовлетворительно) — это противоположность большинства систем. 1.0–1.5 — sehr gut (отлично), 1.6–2.5 — gut (хорошо), 2.6–3.5 — befriedigend (удовлетворительно), 3.6–4.0 — ausreichend (достаточно), выше 4.0 — незачёт.' },
      { q: 'Равен ли GPA 4.0 ста процентам?', a: 'Не совсем. GPA 4.0 обычно соответствует оценке A или A+, что в США означает 90–100%. GPA 3.0 (B) приблизительно соответствует 80–89%.' },
    ],
  },
  uk: {
    description: 'Конвертер систем оцінок дозволяє миттєво перевести будь-яку оцінку між 5 основними системами, що використовуються у світі. Просто введіть оцінку та виберіть вихідну систему — отримайте еквіваленти у всіх інших.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як працює конвертер?', a: 'Конвертер нормалізує всі оцінки до внутрішньої шкали 0–100%, а потім переводить у кожну цільову систему. Це наближене значення, оскільки межі систем оцінок різняться в залежності від навчального закладу.' },
      { q: 'Що таке шкала ECTS?', a: 'ECTS (Європейська система перенесення кредитів) використовує оцінки від A (найкращі 10%) до E (нижні 50% успішних), F — незалік. Межі: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, E ≥ 50%.' },
      { q: 'Чим відрізняється німецька система?', a: 'Німецька шкала йде від 1.0 (найкраще) до 6.0 (незадовільно) — протилежність більшості систем. 1.0–1.5 — sehr gut (відмінно), 1.6–2.5 — gut (добре), 2.6–3.5 — befriedigend, 3.6–4.0 — ausreichend.' },
      { q: 'Чи рівний GPA 4.0 ста відсоткам?', a: 'Не зовсім. GPA 4.0 зазвичай відповідає оцінці A або A+, що в США означає 90–100%. GPA 3.0 (B) приблизно відповідає 80–89%.' },
    ],
  },
  fr: {
    description: 'Notre convertisseur de systèmes de notation vous permet de traduire instantanément n\'importe quelle note entre 5 systèmes majeurs utilisés dans le monde. Entrez simplement votre note et le système source pour obtenir les équivalents dans tous les autres.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment fonctionne le convertisseur ?', a: 'Le convertisseur normalise toutes les notes sur une échelle interne de 0 à 100 %, puis les convertit dans chaque système cible. Il s\'agit d\'une approximation, car les frontières des systèmes de notation varient selon les établissements.' },
      { q: 'Qu\'est-ce que l\'échelle ECTS ?', a: 'L\'ECTS utilise des notes de A (10 % les meilleurs) à E (50 % les plus bas mais encore admis), avec F comme échec. Les seuils : A ≥ 90 %, B ≥ 80 %, C ≥ 70 %, D ≥ 60 %, E ≥ 50 %.' },
      { q: 'En quoi le système allemand est-il différent ?', a: 'L\'échelle allemande va de 1,0 (meilleur) à 6,0 (insuffisant), ce qui est l\'inverse de la plupart des autres systèmes. 1,0–1,5 = sehr gut (très bien), 1,6–2,5 = gut (bien), 2,6–3,5 = befriedigend, 3,6–4,0 = ausreichend.' },
      { q: 'Un GPA de 4,0 équivaut-il à 100 % ?', a: 'Pas exactement. Un GPA de 4,0 correspond généralement à une note A ou A+, ce qui aux États-Unis signifie 90–100 %. Un GPA de 3,0 (B) correspond approximativement à 80–89 %.' },
    ],
  },
  lt: {
    description: 'Mūsų pažymių sistemų konverteris leidžia akimirksniu versti bet kokį pažymį tarp 5 pagrindinių sistemų, naudojamų visame pasaulyje. Tiesiog įveskite pažymį ir šaltinio sistemą — gaukite atitikmenis visose kitose sistemose.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip veikia konverteris?', a: 'Konverteris normalizuoja visus pažymius į vidinę 0–100 % skalę, o tada konvertuoja į kiekvieną tikslinę sistemą. Tai yra apytikslis rezultatas, nes pažymių sistemų ribos skiriasi priklausomai nuo institucijos.' },
      { q: 'Kas yra ECTS vertinimo skalė?', a: 'ECTS naudoja pažymius nuo A (geriausieji 10 %) iki E (žemiausi 50 % išlaikančių), F — neišlaikė. Ribos: A ≥ 90 %, B ≥ 80 %, C ≥ 70 %, D ≥ 60 %, E ≥ 50 %.' },
      { q: 'Kuo skiriasi Vokietijos sistema?', a: 'Vokietijos skalė eina nuo 1,0 (geriausias) iki 6,0 (nepatenkinamai), kas yra priešinga daugumai kitų sistemų. 1,0–1,5 = sehr gut, 1,6–2,5 = gut, 2,6–3,5 = befriedigend, 3,6–4,0 = ausreichend.' },
      { q: 'Ar GPA 4,0 = 100 %?', a: 'Ne visai. GPA 4,0 paprastai atitinka A arba A+ pažymį, kuris JAV reiškia 90–100 %. GPA 3,0 (B) maždaug atitinka 80–89 %.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/converter/grade-system') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GradeSystemPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: meta.title, description: meta.description, url: `https://www.utilixi.com/${locale}/converter/grade-system`, applicationCategory: 'EducationApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <GradeSystemConverter locale={locale} />
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
