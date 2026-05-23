import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import EngineeringCalculator from './EngineeringCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' }],
  ru: [{ href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/compound-interest', label: 'Калькулятор сложных процентов' }],
  uk: [{ href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/compound-interest', label: 'Калькулятор складних відсотків' }],
  fr: [{ href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/compound-interest', label: 'Intérêts composés' }],
  lt: [{ href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Scientific Calculator Online — Engineering Calculator Free', description: 'Free online scientific calculator with sin, cos, tan, log, ln, sqrt, powers and more. Supports DEG/RAD mode. Works on all devices without installation.', h1: 'Scientific Calculator' },
  ru: { title: 'Инженерный калькулятор онлайн — научный калькулятор бесплатно', description: 'Бесплатный онлайн инженерный калькулятор с sin, cos, tan, log, ln, sqrt, степенями и другими функциями. Поддержка градусов и радиан.', h1: 'Инженерный калькулятор' },
  uk: { title: 'Інженерний калькулятор онлайн — науковий калькулятор безкоштовно', description: 'Безкоштовний онлайн інженерний калькулятор з sin, cos, tan, log, ln, sqrt, степенями та іншими функціями. Підтримка градусів і радіан.', h1: 'Інженерний калькулятор' },
  fr: { title: 'Calculatrice scientifique en ligne — Calculatrice ingénieur gratuite', description: 'Calculatrice scientifique en ligne gratuite avec sin, cos, tan, log, ln, racine carrée, puissances et plus. Mode DEG/RAD. Fonctionne sur tous les appareils.', h1: 'Calculatrice scientifique' },
  lt: { title: 'Mokslinis skaičiuotuvas internete — inžinerinis skaičiuotuvas nemokamai', description: 'Nemokamas internetinis mokslinis skaičiuotuvas su sin, cos, tan, log, ln, sqrt, laipsniais ir daugiau. Palaiko DEG/RAD režimą.', h1: 'Inžinerinis skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This scientific calculator supports a full range of mathematical functions: trigonometry (sin, cos, tan and their inverses), logarithms (log base 10 and natural log ln), exponential functions (eˣ, 10ˣ), powers (xⁿ), square root, factorial (n!), constants π and e, and parentheses for complex expressions. Switch between degree and radian mode using the DEG/RAD toggle. The calculator builds expressions step by step and shows them as you type, evaluating when you press =.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I use trigonometric functions?', a: 'Press sin, cos, or tan, then type the angle value, then close with ). For example, sin(30) in DEG mode returns 0.5. Switch between degrees and radians using the DEG/RAD toggle at bottom left.' },
      { q: 'What is the difference between log and ln?', a: 'log calculates the base-10 logarithm (log₁₀), while ln calculates the natural logarithm (base e ≈ 2.718). For example, log(100) = 2 and ln(e) = 1. Use log for decibels, pH, and decades; use ln for continuous growth and decay.' },
      { q: 'How do I enter powers (xⁿ)?', a: 'Type the base number, press the xⁿ button (which inserts ^), then type the exponent. For example: 2 ^ 10 = 1024. You can also use x² to quickly square a number.' },
      { q: 'How does factorial (n!) work?', a: 'Press n!, type the number, then close with ). For example: fact(5) = 120 (because 5! = 5×4×3×2×1 = 120). Factorial is only defined for non-negative integers up to 170.' },
      { q: 'Can I use π in expressions?', a: 'Yes. Press the π button to insert the constant π (≈ 3.14159265358979). You can use it in any expression, for example: 2 × π calculates the circumference factor, or sin(π/2) = 1 in radian mode.' },
    ],
  },
  ru: {
    description: 'Этот инженерный калькулятор поддерживает полный набор математических функций: тригонометрию (sin, cos, tan и обратные), логарифмы (log по основанию 10 и натуральный ln), экспоненциальные функции (eˣ, 10ˣ), степени (xⁿ), квадратный корень, факториал (n!), константы π и e, скобки для сложных выражений. Переключайте градусы и радианы кнопкой ГРД/РАД.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как использовать тригонометрические функции?', a: 'Нажмите sin, cos или tan, введите значение угла, затем закройте скобку. Например, sin(30) в режиме ГРД вернёт 0,5. Переключение между градусами и радианами — кнопка ГРД/РАД.' },
      { q: 'В чём разница между log и ln?', a: 'log вычисляет логарифм по основанию 10 (log₁₀), ln — натуральный логарифм (по основанию e ≈ 2,718). Например, log(100) = 2 и ln(e) = 1.' },
      { q: 'Как вводить степени (xⁿ)?', a: 'Введите основание, нажмите кнопку xⁿ (вставляет ^), затем введите показатель. Например: 2 ^ 10 = 1024. Кнопка x² быстро возводит число в квадрат.' },
      { q: 'Как работает факториал (n!)?', a: 'Нажмите n!, введите число, затем закройте скобку. Например: fact(5) = 120 (5! = 5×4×3×2×1). Факториал определён только для неотрицательных целых чисел до 170.' },
      { q: 'Можно ли использовать π в выражениях?', a: 'Да. Кнопка π вставляет константу π (≈ 3,14159). Её можно использовать в любом выражении, например: sin(π/2) = 1 в режиме радиан.' },
    ],
  },
  uk: {
    description: 'Цей інженерний калькулятор підтримує повний набір математичних функцій: тригонометрію (sin, cos, tan та обернені), логарифми (log за основою 10 та натуральний ln), експоненціальні функції (eˣ, 10ˣ), степені (xⁿ), квадратний корінь, факторіал (n!), константи π та e, дужки для складних виразів. Перемикайте градуси і радіани кнопкою ГРД/РАД.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як використовувати тригонометричні функції?', a: 'Натисніть sin, cos або tan, введіть значення кута, потім закрийте дужку. Наприклад, sin(30) в режимі ГРД поверне 0,5.' },
      { q: 'В чому різниця між log та ln?', a: 'log обчислює логарифм за основою 10, ln — натуральний логарифм (за основою e ≈ 2,718). Наприклад, log(100) = 2, ln(e) = 1.' },
      { q: 'Як вводити степені (xⁿ)?', a: 'Введіть основу, натисніть xⁿ (вставляє ^), потім введіть показник. Наприклад: 2 ^ 10 = 1024.' },
      { q: 'Як працює факторіал (n!)?', a: 'Натисніть n!, введіть число, потім закрийте дужку. Наприклад: fact(5) = 120.' },
      { q: 'Чи можна використовувати π у виразах?', a: 'Так. Кнопка π вставляє константу π (≈ 3,14159). Її можна використовувати у будь-якому виразі.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice scientifique prend en charge un large éventail de fonctions mathématiques : trigonométrie (sin, cos, tan et leurs inverses), logarithmes (log base 10 et ln naturel), fonctions exponentielles (eˣ, 10ˣ), puissances (xⁿ), racine carrée, factorielle (n!), constantes π et e, parenthèses pour les expressions complexes. Basculez entre degrés et radians avec le bouton DEG/RAD.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment utiliser les fonctions trigonométriques ?', a: 'Appuyez sur sin, cos ou tan, tapez la valeur de l\'angle, puis fermez la parenthèse. Par exemple, sin(30) en mode DEG donne 0,5.' },
      { q: 'Quelle est la différence entre log et ln ?', a: 'log calcule le logarithme en base 10, ln calcule le logarithme naturel (base e ≈ 2,718). Par exemple, log(100) = 2 et ln(e) = 1.' },
      { q: 'Comment entrer des puissances (xⁿ) ?', a: 'Tapez la base, appuyez sur xⁿ (insère ^), puis tapez l\'exposant. Par exemple : 2 ^ 10 = 1024.' },
      { q: 'Comment fonctionne la factorielle (n!) ?', a: 'Appuyez sur n!, tapez le nombre, puis fermez avec ). Exemple : fact(5) = 120.' },
      { q: 'Peut-on utiliser π dans les expressions ?', a: 'Oui. Le bouton π insère la constante π (≈ 3,14159). Utilisable dans n\'importe quelle expression.' },
    ],
  },
  lt: {
    description: 'Šis mokslinis skaičiuotuvas palaiko visą matematinių funkcijų rinkinį: trigonometriją (sin, cos, tan ir jų atvirkštines), logaritmus (log 10 pagrindu ir natūrinį ln), eksponentines funkcijas (eˣ, 10ˣ), laipsnius (xⁿ), kvadratinę šaknį, faktorialą (n!), konstantas π ir e, skliaustus sudėtingiems išreiškimams. Prepainame tarp laipsnių ir radianų DEG/RAD mygtuku.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip naudoti trigonometrines funkcijas?', a: 'Paspauskite sin, cos arba tan, įveskite kampo reikšmę, tada uždarykite skliaustą. Pavyzdžiui, sin(30) DEG režimu duoda 0,5.' },
      { q: 'Koks skirtumas tarp log ir ln?', a: 'log skaičiuoja logaritmą 10 pagrindu, ln — natūrinį logaritmą (e pagrindu ≈ 2,718). Pavyzdžiui, log(100) = 2, ln(e) = 1.' },
      { q: 'Kaip įvesti laipsnius (xⁿ)?', a: 'Įveskite pagrindą, paspauskite xⁿ (įterpia ^), tada įveskite laipsnį. Pavyzdžiui: 2 ^ 10 = 1024.' },
      { q: 'Kaip veikia faktorialas (n!)?', a: 'Paspauskite n!, įveskite skaičių, tada uždarykite skliaustą. Pavyzdžiui: fact(5) = 120.' },
      { q: 'Ar galima naudoti π išraiškose?', a: 'Taip. π mygtukas įterpia konstantą π (≈ 3,14159). Galima naudoti bet kurioje išraiškoje.' },
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
    alternates: buildAlternates(locale, '/calculator/engineering'),
  };
}

export default async function EngineeringCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/engineering`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <EngineeringCalculator locale={locale} />
      <AdInline locale={locale} />
      <div className={styles.page__content}>
        <p className={styles.page__description}>{c.description}</p>
        <RelatedTools locale={locale} tools={related} />
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
    </PageLayout>
  );
}
