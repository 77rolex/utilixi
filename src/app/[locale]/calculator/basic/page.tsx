import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import BasicCalculator from './BasicCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/engineering', label: 'Engineering Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/discount', label: 'Discount Calculator' }],
  ru: [{ href: '/calculator/engineering', label: 'Инженерный калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/discount', label: 'Калькулятор скидки' }],
  uk: [{ href: '/calculator/engineering', label: 'Інженерний калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/discount', label: 'Калькулятор знижки' }],
  fr: [{ href: '/calculator/engineering', label: 'Calculatrice scientifique' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/discount', label: 'Calculatrice de remise' }],
  lt: [{ href: '/calculator/engineering', label: 'Inžinerinis skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Online Calculator — Basic Calculator Free', description: 'Free online basic calculator. Perform addition, subtraction, multiplication and division instantly. Works on all devices, no install needed.', h1: 'Basic Calculator' },
  ru: { title: 'Онлайн калькулятор — бесплатный простой калькулятор', description: 'Бесплатный простой онлайн-калькулятор. Выполняйте сложение, вычитание, умножение и деление мгновенно. Работает на всех устройствах.', h1: 'Простой калькулятор' },
  uk: { title: 'Онлайн калькулятор — безкоштовний простий калькулятор', description: 'Безкоштовний простий онлайн-калькулятор. Виконуйте додавання, віднімання, множення та ділення миттєво. Працює на всіх пристроях.', h1: 'Простий калькулятор' },
  fr: { title: 'Calculatrice en ligne — Calculatrice basique gratuite', description: 'Calculatrice basique en ligne gratuite. Effectuez additions, soustractions, multiplications et divisions instantanément. Fonctionne sur tous les appareils.', h1: 'Calculatrice basique' },
  lt: { title: 'Internetinis skaičiuotuvas — nemokamas paprastas skaičiuotuvas', description: 'Nemokamas paprastas internetinis skaičiuotuvas. Atlikite sudėtį, atimtį, dauginimą ir dalinimą akimirksniu. Veikia visuose įrenginiuose.', h1: 'Paprastas skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This online basic calculator handles everyday arithmetic: addition (+), subtraction (−), multiplication (×), and division (÷). It includes a percentage key (%) for quick percent calculations and a sign toggle (±) to change positive/negative. Results are shown with up to 10 significant digits of precision. The calculator is fully keyboard-friendly — use number keys and operator keys directly.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate a percentage?', a: 'Press the number, then the % button. For example, to find 15% of 200: press 200 × 15 %, and the result is 30. Or press 15 % alone to convert 15 to 0.15.' },
      { q: 'What does the ± button do?', a: 'The ± (plus/minus) button toggles the sign of the currently displayed number. Press it to change a positive number to negative or vice versa. Useful for subtracting from a running total.' },
      { q: 'What happens when I divide by zero?', a: 'Dividing any number by zero is mathematically undefined. The calculator displays "Error" to indicate an invalid operation. Press C to clear and start a new calculation.' },
      { q: 'Is this calculator free to use?', a: 'Yes, completely free with no account needed. Works in any browser on mobile, tablet, or desktop. No download or installation required.' },
    ],
  },
  ru: {
    description: 'Этот онлайн-калькулятор выполняет повседневные арифметические операции: сложение (+), вычитание (−), умножение (×) и деление (÷). Включает кнопку процента (%) для быстрых вычислений и переключатель знака (±). Результаты отображаются с точностью до 10 значащих цифр.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как посчитать процент?', a: 'Нажмите число, затем кнопку %. Например, чтобы найти 15% от 200: нажмите 200 × 15 %, результат — 30. Или нажмите 15 % отдельно, чтобы получить 0,15.' },
      { q: 'Что делает кнопка ±?', a: 'Кнопка ± меняет знак текущего числа с положительного на отрицательный или наоборот. Полезно при вычитании из накопленной суммы.' },
      { q: 'Что происходит при делении на ноль?', a: 'Деление на ноль математически не определено. Калькулятор отображает «Ошибка». Нажмите C, чтобы очистить и начать новое вычисление.' },
      { q: 'Калькулятор бесплатный?', a: 'Да, полностью бесплатный, аккаунт не нужен. Работает в любом браузере на телефоне, планшете или ПК.' },
    ],
  },
  uk: {
    description: 'Цей онлайн-калькулятор виконує повсякденні арифметичні операції: додавання (+), віднімання (−), множення (×) та ділення (÷). Включає кнопку відсотка (%) та перемикач знака (±). Результати відображаються з точністю до 10 значущих цифр.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як порахувати відсоток?', a: 'Натисніть число, потім кнопку %. Наприклад, щоб знайти 15% від 200: натисніть 200 × 15 %, результат — 30.' },
      { q: 'Що робить кнопка ±?', a: 'Кнопка ± змінює знак поточного числа з позитивного на негативний або навпаки.' },
      { q: 'Що відбувається при діленні на нуль?', a: 'Ділення на нуль математично не визначене. Калькулятор показує «Помилка». Натисніть C для очищення.' },
      { q: 'Калькулятор безкоштовний?', a: 'Так, повністю безкоштовний, не потребує аккаунта. Працює у будь-якому браузері.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice en ligne effectue les opérations arithmétiques courantes : addition (+), soustraction (−), multiplication (×) et division (÷). Elle comprend une touche pourcentage (%) et une touche changement de signe (±). Les résultats sont affichés avec jusqu\'à 10 chiffres significatifs.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer un pourcentage ?', a: 'Appuyez sur le nombre, puis sur %. Par exemple, pour trouver 15% de 200 : appuyez sur 200 × 15 %, le résultat est 30.' },
      { q: 'À quoi sert le bouton ± ?', a: 'Le bouton ± (plus/moins) change le signe du nombre affiché de positif à négatif ou inversement.' },
      { q: 'Que se passe-t-il lors d\'une division par zéro ?', a: 'La division par zéro est mathématiquement indéfinie. La calculatrice affiche « Erreur ». Appuyez sur C pour recommencer.' },
      { q: 'Cette calculatrice est-elle gratuite ?', a: 'Oui, entièrement gratuite, sans compte nécessaire. Fonctionne dans n\'importe quel navigateur.' },
    ],
  },
  lt: {
    description: 'Šis internetinis skaičiuotuvas atlieka kasdienius aritmetinius veiksmus: sudėtį (+), atimtį (−), dauginimą (×) ir dalinimą (÷). Turi procentų mygtuką (%) ir ženklo keitimo mygtuką (±). Rezultatai rodomi su iki 10 reikšminių skaitmenų tikslumu.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti procentą?', a: 'Paspauskite skaičių, tada % mygtuką. Pavyzdžiui, 15% nuo 200: paspauskite 200 × 15 %, rezultatas — 30.' },
      { q: 'Ką daro ± mygtukas?', a: '± mygtukas keičia rodomo skaičiaus ženklą iš teigiamo į neigiamą arba atvirkščiai.' },
      { q: 'Kas nutinka dalijant iš nulio?', a: 'Dalijimas iš nulio matematiškai neapibrėžtas. Skaičiuotuvas rodo „Klaida". Paspauskite C, kad pradėtumėte iš naujo.' },
      { q: 'Ar skaičiuotuvas nemokamas?', a: 'Taip, visiškai nemokamas, nereikia paskyros. Veikia bet kurioje naršyklėje.' },
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
    alternates: buildAlternates(locale, '/calculator/basic'),
  };
}

export default async function BasicCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://utilixi.com/${locale}/calculator/basic`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <PageLayout sidebar={<AdSidebar locale={locale} />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className={styles.page__title}>{m.h1}</h1>
      <BasicCalculator locale={locale} />
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
