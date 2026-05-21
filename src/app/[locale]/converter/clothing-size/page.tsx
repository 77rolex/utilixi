import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ClothingSizeConverter from './ClothingSizeConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/units', label: 'Unit Converter' }, { href: '/converter/color', label: 'Color Converter' }],
  ru: [{ href: '/converter/units', label: 'Конвертер единиц' }, { href: '/converter/color', label: 'Конвертер цветов' }],
  uk: [{ href: '/converter/units', label: 'Конвертер одиниць' }, { href: '/converter/color', label: 'Конвертер кольорів' }],
  fr: [{ href: '/converter/units', label: 'Convertisseur d\'unités' }, { href: '/converter/color', label: 'Convertisseur de couleurs' }],
  lt: [{ href: '/converter/units', label: 'Vienetų keitiklis' }, { href: '/converter/color', label: 'Spalvų keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Clothing Size Converter — EU, US, UK, IT Sizes', description: 'Free clothing size converter. Convert men\'s and women\'s clothing sizes between EU, US, UK, and Italian standards for tops, pants, and shoes.', h1: 'Clothing Size Converter' },
  ru: { title: 'Конвертер размеров одежды — EU, US, UK, IT', description: 'Бесплатный конвертер размеров одежды. Переводите мужские и женские размеры между стандартами EU, US, UK и итальянским для верха, брюк и обуви.', h1: 'Конвертер размеров одежды' },
  uk: { title: 'Конвертер розмірів одягу — EU, US, UK, IT', description: 'Безкоштовний конвертер розмірів одягу. Переводьте чоловічі та жіночі розміри між стандартами EU, US, UK та італійським для верху, штанів і взуття.', h1: 'Конвертер розмірів одягу' },
  fr: { title: 'Convertisseur de tailles — EU, US, UK, IT', description: 'Convertisseur de tailles gratuit. Convertissez les tailles hommes et femmes entre les normes européennes, américaines, britanniques et italiennes.', h1: 'Convertisseur de tailles vêtements' },
  lt: { title: 'Drabužių dydžių keitiklis — EU, US, UK, IT', description: 'Nemokamas drabužių dydžių keitiklis. Konvertuokite vyrų ir moterų dydžius tarp ES, JAV, JK ir Italijos standartų viršutinei aprangai, kelnėms ir avalynei.', h1: 'Drabužių dydžių keitiklis' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Select your gender and clothing category (tops, pants, or shoes), then choose the sizing standard you know (EU, US, UK, IT, or INT). Click your size to instantly see its equivalents across all other standards. The highlighted card shows your source size. Note: sizes are approximate averages — always check brand-specific size guides when shopping.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the difference between EU and US clothing sizes?', a: 'EU sizes are based on body measurements in centimeters, while US sizes use a numerical or letter system (XS/S/M/L/XL or numerical for jeans). For example, an EU 48 men\'s jacket corresponds to US "L". Women\'s sizes differ too: EU 38 = US 8 for tops.' },
      { q: 'How do UK clothing sizes compare to EU?', a: 'UK women\'s sizes typically run about 4 numbers lower than EU sizes (EU 36 = UK 8). UK men\'s clothing often uses the same letter system (S/M/L) but shoes differ significantly: UK sizes run about 1 full size below EU.' },
      { q: 'What does "INT" size mean?', a: 'INT (International) refers to the generic letter-based system: XXS, XS, S, M, L, XL, XXL, 3XL, 4XL. It is widely used by sportswear and casual brands globally, though exact measurements vary between manufacturers.' },
      { q: 'Are Italian clothing sizes different from EU sizes?', a: 'Italian (IT) sizes typically match EU numeric sizes exactly for most garments (IT 46 = EU 46 for men\'s jackets). However, some Italian luxury brands cut slightly smaller, so it\'s always worth checking the brand\'s own size chart.' },
      { q: 'Why do sizes vary between brands?', a: 'Clothing sizes are not standardized across manufacturers. A "size M" from one brand may differ by 2–5 cm from another brand\'s "M". This is especially true for jeans, where the fit (slim, regular, loose) also plays a major role.' },
    ],
  },
  ru: {
    description: 'Выберите пол и категорию одежды (верх, брюки или обувь), затем укажите известный вам стандарт (EU, US, UK, IT или INT). Нажмите на свой размер, чтобы мгновенно увидеть соответствие во всех остальных стандартах. Выделенная карточка показывает исходный размер. Примечание: размеры являются приблизительными — всегда проверяйте таблицу размеров конкретного бренда.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'В чём разница между европейским и американским размерами?', a: 'Европейские размеры основаны на измерениях тела в сантиметрах, американские используют числовую или буквенную систему. Например, EU 48 для мужского пиджака соответствует US "L". Женские размеры: EU 38 = US 8.' },
      { q: 'Как британские размеры соотносятся с европейскими?', a: 'Женские UK-размеры примерно на 4 единицы ниже EU (EU 36 = UK 8). Для мужской одежды часто используется та же буквенная система, но обувь отличается: UK примерно на 1 размер меньше EU.' },
      { q: 'Что означает размер "INT"?', a: 'INT (международный) — универсальная буквенная система: XXS, XS, S, M, L, XL, XXL и т.д. Широко используется спортивными и casual-брендами по всему миру, хотя точные измерения варьируются у разных производителей.' },
      { q: 'Отличаются ли итальянские размеры от европейских?', a: 'Итальянские размеры (IT) в большинстве случаев совпадают с европейскими числовыми (IT 46 = EU 46 для мужских пиджаков). Однако некоторые итальянские бренды класса люкс шьют немного меньше.' },
      { q: 'Почему размеры отличаются у разных брендов?', a: 'Размеры одежды не стандартизированы между производителями. «Размер M» одного бренда может отличаться на 2–5 см от «M» другого. Особенно это касается джинсов, где посадка тоже играет роль.' },
    ],
  },
  uk: {
    description: 'Оберіть стать і категорію одягу (верх, штани або взуття), потім вкажіть відомий вам стандарт (EU, US, UK, IT або INT). Натисніть на свій розмір, щоб миттєво побачити відповідність в усіх інших стандартах. Примітка: розміри є приблизними — завжди перевіряйте таблицю розмірів конкретного бренду.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'У чому різниця між європейськими та американськими розмірами?', a: 'Європейські розміри засновані на вимірюваннях тіла в сантиметрах, американські використовують числову або літерну систему. Наприклад, EU 48 для чоловічого піджака відповідає US "L".' },
      { q: 'Як британські розміри співвідносяться з європейськими?', a: 'Жіночі UK-розміри приблизно на 4 одиниці нижче EU (EU 36 = UK 8). Для взуття UK приблизно на 1 розмір менше EU.' },
      { q: 'Що означає розмір "INT"?', a: 'INT (міжнародний) — універсальна літерна система: XXS, XS, S, M, L, XL, XXL тощо. Широко використовується спортивними та casual-брендами, хоча точні вимірювання варіюються у різних виробників.' },
      { q: 'Чи відрізняються італійські розміри від європейських?', a: 'Італійські розміри (IT) здебільшого збігаються з європейськими числовими (IT 46 = EU 46 для чоловічих піджаків). Деякі преміальні бренди шиють трохи менше.' },
      { q: 'Чому розміри відрізняються у різних брендів?', a: 'Розміри одягу не стандартизовані між виробниками. «Розмір M» одного бренду може відрізнятися на 2–5 см від «M» іншого. Особливо це стосується джинсів.' },
    ],
  },
  fr: {
    description: 'Sélectionnez votre sexe et la catégorie de vêtements (hauts, pantalons ou chaussures), puis choisissez la norme que vous connaissez (EU, US, UK, IT ou INT). Cliquez sur votre taille pour voir instantanément les équivalences dans tous les autres standards. Note : les tailles sont des moyennes approximatives — vérifiez toujours le guide des tailles de la marque.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle est la différence entre les tailles EU et US ?', a: 'Les tailles EU sont basées sur les mensurations corporelles en centimètres, tandis que les tailles US utilisent un système numérique ou de lettres. Par exemple, une veste EU 48 homme correspond à US "L".' },
      { q: 'Comment les tailles UK se comparent-elles aux tailles EU ?', a: 'Les tailles femmes UK sont généralement 4 numéros inférieures aux tailles EU (EU 36 = UK 8). Pour les chaussures, les tailles UK sont environ 1 taille en dessous des tailles EU.' },
      { q: 'Que signifie la taille "INT" ?', a: 'INT (International) désigne le système générique de lettres : XXS, XS, S, M, L, XL, XXL, etc. Largement utilisé par les marques de sport et de mode décontractée, bien que les mesures exactes varient selon les fabricants.' },
      { q: 'Les tailles italiennes diffèrent-elles des tailles EU ?', a: 'Les tailles italiennes (IT) correspondent généralement aux tailles EU numériques (IT 46 = EU 46 pour les vestes homme). Certaines marques de luxe italiennes taillent légèrement plus petit.' },
      { q: 'Pourquoi les tailles varient-elles selon les marques ?', a: 'Les tailles vestimentaires ne sont pas standardisées entre les fabricants. Un "taille M" d\'une marque peut différer de 2 à 5 cm de celui d\'une autre marque.' },
    ],
  },
  lt: {
    description: 'Pasirinkite lytį ir drabužių kategoriją (viršutinė dalis, kelnės ar avalynė), tada nurodykite žinomą standartą (EU, US, UK, IT ar INT). Spustelėkite savo dydį, kad akimirksniu pamatytumėte atitikimą visuose kituose standartuose. Pastaba: dydžiai yra apytiksliai — visada tikrinkite konkrečios prekės ženklo dydžių lentelę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Koks skirtumas tarp ES ir JAV drabužių dydžių?', a: 'ES dydžiai pagrįsti kūno matmenimis centimetrais, o JAV naudojama skaitinė arba raidinė sistema. Pavyzdžiui, vyriškas švarkas EU 48 atitinka US „L".' },
      { q: 'Kaip JK dydžiai lyginami su ES dydžiais?', a: 'Moterų JK dydžiai paprastai yra maždaug 4 vienetais mažesni nei ES (EU 36 = UK 8). Avalynėje JK dydžiai yra maždaug 1 dydžiu mažesni nei ES.' },
      { q: 'Ką reiškia dydis „INT"?', a: 'INT (tarptautinis) reiškia bendrą raidinę sistemą: XXS, XS, S, M, L, XL, XXL ir kt. Plačiai naudojama sportinių ir laisvalaikio prekių ženklų, nors tikslūs matmenys skiriasi.' },
      { q: 'Ar italų drabužių dydžiai skiriasi nuo ES?', a: 'Italų (IT) dydžiai dažniausiai sutampa su ES skaitiniais dydžiais (IT 46 = EU 46 vyriškiems švaркams). Kai kurie itališki prabangos prekių ženklai pjauna šiek tiek mažiau.' },
      { q: 'Kodėl dydžiai skiriasi priklausomai nuo prekės ženklo?', a: 'Drabužių dydžiai nėra standartizuoti tarp gamintojų. Vieno prekės ženklo „M dydis" gali skirtis 2–5 cm nuo kito. Tai ypač aktualu džinsams.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/converter/clothing-size') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ClothingSizePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/clothing-size`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <ClothingSizeConverter locale={locale} />
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
