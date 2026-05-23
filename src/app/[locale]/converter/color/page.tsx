import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ColorConverter from './ColorConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/units', label: 'Unit Converter' }, { href: '/converter/clothing-size', label: 'Clothing Size Converter' }],
  ru: [{ href: '/converter/units', label: 'Конвертер единиц' }, { href: '/converter/clothing-size', label: 'Конвертер размеров одежды' }],
  uk: [{ href: '/converter/units', label: 'Конвертер одиниць' }, { href: '/converter/clothing-size', label: 'Конвертер розмірів одягу' }],
  fr: [{ href: '/converter/units', label: 'Convertisseur d\'unités' }, { href: '/converter/clothing-size', label: 'Convertisseur de tailles' }],
  lt: [{ href: '/converter/units', label: 'Vienetų keitiklis' }, { href: '/converter/clothing-size', label: 'Drabužių dydžių keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Color Converter — HEX, RGB, HSL Online Tool', description: 'Free online color converter. Instantly convert colors between HEX, RGB, and HSL formats. Copy any format with one click.', h1: 'Color Converter HEX ↔ RGB ↔ HSL' },
  ru: { title: 'Конвертер цветов — HEX, RGB, HSL онлайн', description: 'Бесплатный онлайн-конвертер цветов. Мгновенно переводите цвета между форматами HEX, RGB и HSL. Копируйте любой формат одним кликом.', h1: 'Конвертер цветов HEX ↔ RGB ↔ HSL' },
  uk: { title: 'Конвертер кольорів — HEX, RGB, HSL онлайн', description: 'Безкоштовний онлайн-конвертер кольорів. Миттєво конвертуйте кольори між форматами HEX, RGB та HSL. Копіюйте будь-який формат одним кліком.', h1: 'Конвертер кольорів HEX ↔ RGB ↔ HSL' },
  fr: { title: 'Convertisseur de couleurs — HEX, RVB, TSL en ligne', description: 'Convertisseur de couleurs gratuit en ligne. Convertissez instantanément des couleurs entre les formats HEX, RVB et TSL. Copiez n\'importe quel format en un clic.', h1: 'Convertisseur de couleurs HEX ↔ RVB ↔ TSL' },
  lt: { title: 'Spalvų keitiklis — HEX, RGB, HSL internete', description: 'Nemokamas spalvų keitiklis internete. Akimirksniu konvertuokite spalvas tarp HEX, RGB ir HSL formatų. Nukopijuokite bet kurį formatą vienu paspaudimu.', h1: 'Spalvų keitiklis HEX ↔ RGB ↔ HSL' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Enter a color in HEX, RGB, or HSL format — the converter instantly updates all three formats simultaneously. Use the native color picker on the HEX tab to visually choose a color. Click "Copy" next to any format to copy the value to your clipboard. Useful for web developers, designers, and anyone working with CSS or design tools.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a HEX color code?', a: 'A HEX color is a six-digit hexadecimal value (e.g. #1565C0) that represents the red, green, and blue components of a color. Each pair of digits ranges from 00 to FF (0–255 in decimal). HEX is the most common format used in CSS and HTML.' },
      { q: 'What is the difference between RGB and HSL?', a: 'RGB describes a color by its red, green, and blue light components (0–255 each). HSL (Hue, Saturation, Lightness) is more intuitive: hue is the color angle (0–360°), saturation is the intensity (0–100%), and lightness controls how bright or dark the color is (0–100%). HSL is often easier to adjust when designing.' },
      { q: 'How do I convert HEX to RGB?', a: 'Split the 6-character HEX value into three pairs: the first pair is Red, the second is Green, the third is Blue. Convert each pair from hexadecimal to decimal. For example, #1565C0 → R=21, G=101, B=192. This converter does it automatically as you type.' },
      { q: 'Can I use a 3-digit HEX code?', a: 'Yes. A 3-digit HEX code like #1AC is shorthand for #11AACC, where each digit is doubled. This converter accepts both 3-digit and 6-digit HEX codes.' },
      { q: 'What are HEX colors used for?', a: 'HEX colors are used in CSS, HTML, SVG, and most design tools (Figma, Adobe XD, Photoshop). When building websites, you\'ll often need to switch between HEX and RGB/HSL — this tool saves time by converting all three formats at once.' },
    ],
  },
  ru: {
    description: 'Введите цвет в формате HEX, RGB или HSL — конвертер мгновенно обновляет все три формата одновременно. На вкладке HEX можно воспользоваться нативным выбором цвета в браузере. Кнопка «Копировать» рядом с каждым форматом копирует значение в буфер обмена. Незаменим для веб-разработчиков и дизайнеров.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое HEX-код цвета?', a: 'HEX-цвет — это шестизначное шестнадцатеричное значение (например, #1565C0), которое кодирует красный, зелёный и синий компоненты. Каждая пара символов от 00 до FF соответствует 0–255 в десятичной системе. HEX — самый распространённый формат в CSS и HTML.' },
      { q: 'В чём разница между RGB и HSL?', a: 'RGB описывает цвет через яркость красного, зелёного и синего каналов (0–255 каждый). HSL (оттенок, насыщенность, светлота) более интуитивен: оттенок — угол в 0–360°, насыщенность — интенсивность 0–100%, светлота — яркость 0–100%. HSL удобен при работе с дизайном.' },
      { q: 'Как перевести HEX в RGB?', a: 'Разделите 6-символьный HEX на три пары: первая — красный, вторая — зелёный, третья — синий. Переведите каждую пару из шестнадцатеричной в десятичную. Например, #1565C0 → R=21, G=101, B=192. Конвертер делает это автоматически.' },
      { q: 'Поддерживается ли трёхсимвольный HEX?', a: 'Да. Краткая запись #1AC эквивалентна #11AACC, где каждый символ удваивается. Конвертер принимает оба формата.' },
      { q: 'Где используются HEX-цвета?', a: 'HEX используется в CSS, HTML, SVG и большинстве дизайн-инструментов (Figma, Adobe XD, Photoshop). При разработке сайтов часто нужно переключаться между форматами — этот инструмент переводит все три сразу.' },
    ],
  },
  uk: {
    description: 'Введіть колір у форматі HEX, RGB або HSL — конвертер миттєво оновлює всі три формати. На вкладці HEX доступний нативний вибір кольору в браузері. Кнопка «Копіювати» поруч з кожним форматом копіює значення в буфер обміну. Незамінний для веб-розробників і дизайнерів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке HEX-код кольору?', a: 'HEX-колір — це шестизначне шістнадцяткове значення (наприклад, #1565C0), яке кодує червоний, зелений та синій компоненти. Кожна пара символів від 00 до FF відповідає 0–255 у десятковій системі.' },
      { q: 'Яка різниця між RGB і HSL?', a: 'RGB описує колір через яскравість червоного, зеленого та синього каналів (0–255). HSL (відтінок, насиченість, світлість) інтуїтивніший: відтінок — кут 0–360°, насиченість — 0–100%, світлість — 0–100%.' },
      { q: 'Як перевести HEX у RGB?', a: 'Розділіть 6-символьний HEX на три пари. Перша — червоний, друга — зелений, третя — синій. Переведіть кожну пару у десяткову. Наприклад, #1565C0 → R=21, G=101, B=192.' },
      { q: 'Чи підтримується трисимвольний HEX?', a: 'Так. Скорочений запис #1AC еквівалентний #11AACC. Конвертер приймає обидва формати.' },
      { q: 'Де використовуються HEX-кольори?', a: 'HEX використовується у CSS, HTML, SVG та більшості дизайн-інструментів (Figma, Adobe XD, Photoshop). Цей інструмент перетворює всі три формати одночасно.' },
    ],
  },
  fr: {
    description: 'Entrez une couleur en format HEX, RVB ou TSL — le convertisseur met à jour instantanément les trois formats. Utilisez le sélecteur de couleur natif dans l\'onglet HEX. Le bouton « Copier » copie la valeur dans le presse-papier. Indispensable pour les développeurs web et les designers.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qu\'un code couleur HEX ?', a: 'Une couleur HEX est une valeur hexadécimale à six chiffres (ex. #1565C0) représentant les composantes rouge, vert et bleu. Chaque paire va de 00 à FF (0–255 en décimal). HEX est le format le plus utilisé en CSS et HTML.' },
      { q: 'Quelle est la différence entre RVB et TSL ?', a: 'RVB décrit une couleur par l\'intensité de ses composantes rouge, vert et bleu (0–255). TSL (Teinte, Saturation, Luminosité) est plus intuitif : la teinte est un angle (0–360°), la saturation l\'intensité (0–100%) et la luminosité contrôle la clarté (0–100%).' },
      { q: 'Comment convertir HEX en RVB ?', a: 'Divisez les 6 caractères HEX en trois paires : rouge, vert, bleu. Convertissez chaque paire de l\'hexadécimal au décimal. Par exemple, #1565C0 → R=21, G=101, B=192.' },
      { q: 'Puis-je utiliser un code HEX à 3 chiffres ?', a: 'Oui. Un code HEX à 3 chiffres comme #1AC est l\'abréviation de #11AACC, où chaque chiffre est doublé. Ce convertisseur accepte les deux formats.' },
      { q: 'À quoi servent les couleurs HEX ?', a: 'Les couleurs HEX sont utilisées en CSS, HTML, SVG et dans la plupart des outils de design (Figma, Adobe XD, Photoshop). Cet outil convertit les trois formats simultanément.' },
    ],
  },
  lt: {
    description: 'Įveskite spalvą HEX, RGB arba HSL formatu — keitiklis iš karto atnaujina visus tris formatus. HEX skirtuke naudokite naršyklės spalvų parinkiklį. Mygtukas „Kopijuoti" nukopijuoja reikšmę į iškarpinę. Būtinas žiniatinklio kūrėjams ir dizaineriams.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra HEX spalvos kodas?', a: 'HEX spalva yra šešiaženklis šešioliktainis kodas (pvz., #1565C0), vaizduojantis raudoną, žalią ir mėlyną komponentus. Kiekviena pora nuo 00 iki FF atitinka 0–255 dešimtainėje sistemoje. HEX yra dažniausiai naudojamas formatas CSS ir HTML.' },
      { q: 'Koks skirtumas tarp RGB ir HSL?', a: 'RGB aprašo spalvą per raudonos, žalios ir mėlynos šviesos intensyvumą (0–255). HSL (atspalvis, sodrumas, šviesumas) intuityvesnis: atspalvis yra kampas (0–360°), sodrumas intensyvumas (0–100%), šviesumas kontroliuoja ryškumą (0–100%).' },
      { q: 'Kaip konvertuoti HEX į RGB?', a: 'Padalinkite 6 simbolių HEX į tris poras: raudona, žalia, mėlyna. Konvertuokite kiekvieną porą iš šešioliktainės į dešimtainę. Pavyzdžiui, #1565C0 → R=21, G=101, B=192.' },
      { q: 'Ar galima naudoti 3 skaitmenų HEX kodą?', a: 'Taip. 3 skaitmenų kodas #1AC yra sutrumpintas #11AACC variantas, kur kiekvienas skaitmuo padvigubinamas. Šis keitiklis priima abu formatus.' },
      { q: 'Kur naudojamos HEX spalvos?', a: 'HEX spalvos naudojamos CSS, HTML, SVG ir daugelyje dizaino įrankių (Figma, Adobe XD, Photoshop). Šis įrankis konvertuoja visus tris formatus vienu metu.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/converter/color') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ColorConverterPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/color`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <ColorConverter locale={locale} />
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
