import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import GpaCalculator from './GpaCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/grade-system', label: 'Grade System Converter' }, { href: '/calculator/gpa', label: 'GPA Calculator' }],
  ru: [{ href: '/converter/grade-system', label: 'Конвертер систем оценок' }, { href: '/calculator/gpa', label: 'Калькулятор GPA' }],
  uk: [{ href: '/converter/grade-system', label: 'Конвертер систем оцінок' }, { href: '/calculator/gpa', label: 'Калькулятор GPA' }],
  fr: [{ href: '/converter/grade-system', label: 'Convertisseur de notes' }, { href: '/calculator/gpa', label: 'Calculatrice GPA' }],
  lt: [{ href: '/converter/grade-system', label: 'Pažymių sistemų konverteris' }, { href: '/calculator/gpa', label: 'GPA skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'GPA Calculator — Calculate Your Grade Point Average', description: 'Free GPA calculator. Add your courses, select letter grades and credit hours to instantly calculate your Grade Point Average on the 4.0 scale.', h1: 'GPA Calculator' },
  ru: { title: 'Калькулятор GPA — рассчитайте средний балл', description: 'Бесплатный калькулятор GPA. Добавьте курсы, выберите оценки и кредиты — мгновенно рассчитайте средний балл по шкале 4.0.', h1: 'Калькулятор GPA' },
  uk: { title: 'Калькулятор GPA — розрахуйте середній бал', description: 'Безкоштовний калькулятор GPA. Додайте курси, виберіть оцінки та кредити — миттєво розрахуйте середній бал за шкалою 4.0.', h1: 'Калькулятор GPA' },
  fr: { title: 'Calculatrice GPA — Calculez votre moyenne pondérée', description: 'Calculatrice GPA gratuite. Ajoutez vos cours, sélectionnez les notes et crédits pour calculer instantanément votre GPA sur l\'échelle 4,0.', h1: 'Calculatrice GPA' },
  lt: { title: 'GPA skaičiuotuvas — apskaičiuokite vidurkį', description: 'Nemokamas GPA skaičiuotuvas. Pridėkite kursus, pasirinkite pažymius ir kreditus — iš karto apskaičiuokite GPA pagal 4.0 skalę.', h1: 'GPA skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our GPA calculator to quickly calculate your Grade Point Average. Add each course, select the letter grade you received (A+, A, B+, etc.) and enter the credit hours. The calculator uses the standard US 4.0 scale and weights each course by its credit hours for an accurate cumulative GPA.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is GPA calculated?', a: 'GPA = Total Grade Points ÷ Total Credit Hours. Each letter grade has a point value (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0). Each course\'s grade points are multiplied by its credit hours, summed up, and divided by total credit hours. This gives a weighted average that accounts for heavier courses.' },
      { q: 'What is a good GPA?', a: 'On the 4.0 scale: 3.5–4.0 is excellent (Dean\'s List level), 3.0–3.49 is good, 2.5–2.99 is average, below 2.0 may put you on academic probation. Many graduate programs require a minimum 3.0 GPA for admission.' },
      { q: 'What is the difference between GPA and CGPA?', a: 'GPA (Grade Point Average) usually refers to a single semester or term. CGPA (Cumulative GPA) is the average across all completed semesters. Our calculator computes the GPA for the courses you enter — to get your CGPA, include all courses from all semesters.' },
      { q: 'Does an A+ count as 4.0 or 4.3?', a: 'It depends on the institution. Some schools cap the scale at 4.0 (A+ = 4.0), while others use a 4.3 scale where A+ = 4.3. Our calculator uses the 4.3 scale with A+ = 4.3, which gives a more granular result.' },
    ],
  },
  ru: {
    description: 'Используйте калькулятор GPA для быстрого расчёта среднего балла. Добавьте каждый курс, выберите буквенную оценку (A+, A, B+ и т.д.) и введите количество кредитов. Калькулятор использует стандартную американскую шкалу 4.0 с взвешиванием по кредитам.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается GPA?', a: 'GPA = Сумма баллов ÷ Сумма кредитов. Каждая буквенная оценка имеет числовое значение (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0). Баллы каждого курса умножаются на кредиты, суммируются и делятся на общее количество кредитов.' },
      { q: 'Какой GPA считается хорошим?', a: 'По шкале 4.0: 3.5–4.0 — отлично (уровень Dean\'s List), 3.0–3.49 — хорошо, 2.5–2.99 — средне, ниже 2.0 — риск академических последствий. Большинство магистерских программ требуют минимум 3.0.' },
      { q: 'В чём разница между GPA и CGPA?', a: 'GPA обычно относится к одному семестру. CGPA (Cumulative GPA) — это средний балл за все семестры. Чтобы получить CGPA, добавьте все курсы за все семестры.' },
      { q: 'A+ — это 4.0 или 4.3?', a: 'Зависит от учебного заведения. Некоторые используют шкалу до 4.0 (A+ = 4.0), другие — до 4.3 (A+ = 4.3). Наш калькулятор использует шкалу 4.3, что даёт более точный результат.' },
    ],
  },
  uk: {
    description: 'Використовуйте калькулятор GPA для швидкого розрахунку середнього балу. Додайте кожен курс, виберіть буквену оцінку та введіть кількість кредитів. Калькулятор використовує стандартну американську шкалу 4.0 з зважуванням за кредитами.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується GPA?', a: 'GPA = Сума балів ÷ Сума кредитів. Кожна буквена оцінка має числове значення (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0). Бали кожного курсу множаться на кредити, сумуються і діляться на загальну кількість кредитів.' },
      { q: 'Який GPA вважається гарним?', a: 'За шкалою 4.0: 3.5–4.0 — відмінно, 3.0–3.49 — добре, 2.5–2.99 — середньо, нижче 2.0 — ризик академічних наслідків. Більшість магістерських програм вимагають мінімум 3.0.' },
      { q: 'У чому різниця між GPA і CGPA?', a: 'GPA зазвичай відноситься до одного семестру. CGPA (Cumulative GPA) — це середній бал за всі семестри. Щоб отримати CGPA, додайте всі курси за всі семестри.' },
      { q: 'A+ — це 4.0 чи 4.3?', a: 'Залежить від навчального закладу. Деякі використовують шкалу до 4.0 (A+ = 4.0), інші — до 4.3 (A+ = 4.3). Наш калькулятор використовує шкалу 4.3.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice GPA pour calculer rapidement votre moyenne pondérée. Ajoutez chaque cours, sélectionnez la note littérale obtenue (A+, A, B+, etc.) et entrez les crédits. La calculatrice utilise l\'échelle américaine standard 4,0 avec pondération par crédits.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment se calcule la GPA ?', a: 'GPA = Total des points de note ÷ Total des crédits. Chaque note littérale a une valeur numérique (A = 4,0, B = 3,0, C = 2,0, D = 1,0, F = 0). Les points de chaque cours sont multipliés par ses crédits, additionnés, puis divisés par le total des crédits.' },
      { q: 'Quelle est une bonne GPA ?', a: 'Sur l\'échelle 4,0 : 3,5–4,0 est excellent (niveau Dean\'s List), 3,0–3,49 est bien, 2,5–2,99 est dans la moyenne, en dessous de 2,0 risque des conséquences académiques. La plupart des masters exigent un minimum de 3,0.' },
      { q: 'Quelle est la différence entre GPA et CGPA ?', a: 'La GPA désigne généralement un semestre. La CGPA (cumulative) est la moyenne sur tous les semestres. Pour obtenir votre CGPA, incluez tous les cours de tous les semestres.' },
      { q: 'A+ vaut-il 4,0 ou 4,3 ?', a: 'Cela dépend de l\'établissement. Certains plafonnent à 4,0 (A+ = 4,0), d\'autres utilisent 4,3 (A+ = 4,3). Notre calculatrice utilise l\'échelle 4,3 pour plus de précision.' },
    ],
  },
  lt: {
    description: 'Naudokite GPA skaičiuotuvą, kad greitai apskaičiuotumėte vidurkį. Pridėkite kiekvieną kursą, pasirinkite raidinį pažymį (A+, A, B+ ir kt.) ir įveskite kreditų skaičių. Skaičiuotuvas naudoja standartinę JAV 4.0 skalę su kreditų svoriais.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip skaičiuojamas GPA?', a: 'GPA = Bendri taškų taškai ÷ Bendri kreditai. Kiekvienas raidinis pažymys turi skaitinę vertę (A = 4,0, B = 3,0, C = 2,0, D = 1,0, F = 0). Kiekvieno kurso taškai dauginami iš jo kreditų, susumuojami ir dalijami iš bendrų kreditų.' },
      { q: 'Koks GPA laikomas geru?', a: 'Pagal 4.0 skalę: 3,5–4,0 — puikiai, 3,0–3,49 — gerai, 2,5–2,99 — vidutiniškai, žemiau 2,0 — akademinės pasekmės. Dauguma magistrantūros programų reikalauja mažiausiai 3,0.' },
      { q: 'Koks skirtumas tarp GPA ir CGPA?', a: 'GPA paprastai reiškia vieną semestrą. CGPA (kumuliatyvinis) yra vidurkis per visus semestrus. Norėdami gauti CGPA, pridėkite visus kursus iš visų semestrų.' },
      { q: 'Ar A+ = 4,0 ar 4,3?', a: 'Tai priklauso nuo institucijos. Kai kurios riboja skalę iki 4,0 (A+ = 4,0), kitos naudoja 4,3 (A+ = 4,3). Mūsų skaičiuotuvas naudoja 4,3 skalę, kad rezultatai būtų tikslesni.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/gpa') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function GpaPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: meta.title, description: meta.description, url: `https://www.utilixi.com/${locale}/calculator/gpa`, applicationCategory: 'EducationApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <GpaCalculator locale={locale} />
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
