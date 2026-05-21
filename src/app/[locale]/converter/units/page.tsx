import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import UnitConverter from './UnitConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/color', label: 'Color Converter' }, { href: '/converter/clothing-size', label: 'Clothing Size Converter' }],
  ru: [{ href: '/converter/color', label: 'Конвертер цветов' }, { href: '/converter/clothing-size', label: 'Конвертер размеров одежды' }],
  uk: [{ href: '/converter/color', label: 'Конвертер кольорів' }, { href: '/converter/clothing-size', label: 'Конвертер розмірів одягу' }],
  fr: [{ href: '/converter/color', label: 'Convertisseur de couleurs' }, { href: '/converter/clothing-size', label: 'Convertisseur de tailles' }],
  lt: [{ href: '/converter/color', label: 'Spalvų keitiklis' }, { href: '/converter/clothing-size', label: 'Drabužių dydžių keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Unit Converter — Length, Weight, Temperature & More', description: 'Free online unit converter. Convert length, weight, temperature, volume, area, speed, and digital storage units instantly. No ads, no sign-up.', h1: 'Unit Converter' },
  ru: { title: 'Конвертер единиц — длина, вес, температура и другое', description: 'Бесплатный онлайн конвертер единиц измерения. Конвертируйте длину, массу, температуру, объём, площадь, скорость и данные мгновенно.', h1: 'Конвертер единиц' },
  uk: { title: 'Конвертер одиниць — довжина, вага, температура та інше', description: 'Безкоштовний онлайн конвертер одиниць виміру. Конвертуйте довжину, масу, температуру, об\'єм, площу, швидкість і дані миттєво.', h1: 'Конвертер одиниць' },
  fr: { title: 'Convertisseur d\'unités — Longueur, Poids, Température et plus', description: 'Convertisseur d\'unités gratuit en ligne. Convertissez longueur, masse, température, volume, superficie, vitesse et données numériques instantanément.', h1: 'Convertisseur d\'unités' },
  lt: { title: 'Vienetų Keitiklis — Ilgis, Svoris, Temperatūra ir daugiau', description: 'Nemokamas vienetų keitiklis internete. Akimirksniu konvertuokite ilgį, masę, temperatūrą, tūrį, plotą, greitį ir skaitmeninius vienetus.', h1: 'Vienetų keitiklis' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This unit converter supports 7 categories with dozens of units. Select a category (length, weight, temperature, volume, area, speed, or digital storage), choose the units to convert between, enter a value, and the result appears instantly. Use the swap button to reverse the conversion direction.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How many meters are in a mile?', a: 'One mile equals exactly 1609.344 meters. Conversely, one meter equals approximately 0.000621371 miles. For rough estimates: 1 mile ≈ 1.6 km.' },
      { q: 'How do you convert Celsius to Fahrenheit?', a: 'The formula is °F = °C × 9/5 + 32. For example, 20°C = 68°F. To convert back: °C = (°F − 32) × 5/9. Absolute zero is −273.15°C = −459.67°F = 0 K.' },
      { q: 'What is the difference between KB and KiB?', a: 'KB (Kilobyte) = 1000 bytes in the decimal SI system. KiB (Kibibyte) = 1024 bytes in the binary IEC system. Operating systems often report file sizes in KiB/MiB/GiB but label them as KB/MB/GB, causing confusion. This converter uses the standard definitions: 1 KB = 1000 B, 1 KiB = 1024 B.' },
      { q: 'How many pounds in a kilogram?', a: 'One kilogram equals approximately 2.20462 pounds. One pound equals approximately 0.453592 kg. For a quick estimate, 1 kg ≈ 2.2 lb.' },
      { q: 'What are knots in speed?', a: 'A knot (kn) is one nautical mile per hour, where 1 nautical mile = 1852 m. It is used in aviation and maritime navigation. 1 knot ≈ 1.852 km/h ≈ 1.151 mph.' },
    ],
  },
  ru: {
    description: 'Конвертер поддерживает 7 категорий с десятками единиц. Выберите категорию (длина, масса, температура, объём, площадь, скорость или данные), единицы для конвертации, введите значение — результат появится мгновенно. Кнопка «Поменять» меняет направление конвертации.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько метров в миле?', a: 'В одной миле ровно 1609,344 метра. Один метр равен примерно 0,000621371 мили. Для приближённых расчётов: 1 миля ≈ 1,6 км.' },
      { q: 'Как перевести Цельсий в Фаренгейт?', a: 'Формула: °F = °C × 9/5 + 32. Например, 20°C = 68°F. Обратный перевод: °C = (°F − 32) × 5/9. Абсолютный ноль: −273,15°C = −459,67°F = 0 К.' },
      { q: 'В чём разница между КБ и КиБ?', a: 'КБ (Килобайт) = 1000 байт (десятичная система SI). КиБ (Кибибайт) = 1024 байт (двоичная система IEC). ОС часто отображают размеры в КиБ/МиБ/ГиБ, называя их КБ/МБ/ГБ, что вызывает путаницу. Этот конвертер использует стандартные определения: 1 КБ = 1000 Б, 1 КиБ = 1024 Б.' },
      { q: 'Сколько фунтов в килограмме?', a: 'Один килограмм равен примерно 2,20462 фунта. Один фунт равен примерно 0,453592 кг. Для быстрой оценки: 1 кг ≈ 2,2 фунта.' },
      { q: 'Что такое узлы (knots) в скорости?', a: 'Узел (уз) — единица скорости, равная одной морской миле в час (1 морская миля = 1852 м). Используется в авиации и мореплавании. 1 уз ≈ 1,852 км/ч ≈ 1,151 мили/ч.' },
    ],
  },
  uk: {
    description: 'Конвертер підтримує 7 категорій з десятками одиниць. Оберіть категорію (довжина, маса, температура, об\'єм, площа, швидкість або дані), одиниці для конвертації, введіть значення — результат з\'явиться миттєво. Кнопка «Поміняти» змінює напрямок конвертації.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки метрів у милі?', a: 'В одній милі рівно 1609,344 метра. Один метр дорівнює приблизно 0,000621371 милі. Для приблизних розрахунків: 1 миля ≈ 1,6 км.' },
      { q: 'Як перевести Цельсій у Фаренгейт?', a: 'Формула: °F = °C × 9/5 + 32. Наприклад, 20°C = 68°F. Зворотний переклад: °C = (°F − 32) × 5/9.' },
      { q: 'У чому різниця між КБ і КіБ?', a: 'КБ (Кілобайт) = 1000 байт (десяткова система SI). КіБ (Кібібайт) = 1024 байт (двійкова система IEC). ОС часто відображають розміри в КіБ/МіБ/ГіБ, називаючи їх КБ/МБ/ГБ.' },
      { q: 'Скільки фунтів у кілограмі?', a: 'Один кілограм дорівнює приблизно 2,20462 фунта. Один фунт дорівнює приблизно 0,453592 кг. Для швидкої оцінки: 1 кг ≈ 2,2 фунта.' },
      { q: 'Що таке вузли (knots) у швидкості?', a: 'Вузол — одиниця швидкості, що дорівнює одній морській милі на годину (1 морська миля = 1852 м). Використовується в авіації та судноплавстві. 1 вуз ≈ 1,852 км/год ≈ 1,151 миль/год.' },
    ],
  },
  fr: {
    description: 'Ce convertisseur supporte 7 catégories avec des dizaines d\'unités. Sélectionnez une catégorie (longueur, masse, température, volume, superficie, vitesse ou données numériques), choisissez les unités, entrez une valeur — le résultat s\'affiche instantanément. Le bouton Inverser échange les deux unités.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Combien de mètres dans un mile ?', a: 'Un mile équivaut exactement à 1609,344 mètres. Un mètre équivaut à environ 0,000621371 mile. Pour les estimations rapides : 1 mile ≈ 1,6 km.' },
      { q: 'Comment convertir Celsius en Fahrenheit ?', a: 'La formule est °F = °C × 9/5 + 32. Par exemple, 20°C = 68°F. Conversion inverse : °C = (°F − 32) × 5/9. Le zéro absolu est −273,15°C = 0 K.' },
      { q: 'Quelle est la différence entre Ko et Kio ?', a: 'Ko (Kilooctet) = 1000 octets (système décimal SI). Kio (Kibioctet) = 1024 octets (système binaire CEI). Les systèmes d\'exploitation affichent souvent des tailles en Kio/Mio/Gio mais les étiquettent Ko/Mo/Go.' },
      { q: 'Combien de livres dans un kilogramme ?', a: 'Un kilogramme équivaut à environ 2,20462 livres. Une livre équivaut à environ 0,453592 kg. Pour une estimation rapide : 1 kg ≈ 2,2 lb.' },
      { q: 'Qu\'est-ce qu\'un nœud en vitesse ?', a: 'Un nœud (kn) est une unité de vitesse équivalant à un mille nautique par heure (1 mille nautique = 1852 m). Utilisé en aviation et navigation maritime. 1 nœud ≈ 1,852 km/h ≈ 1,151 mph.' },
    ],
  },
  lt: {
    description: 'Šis keitiklis palaiko 7 kategorijas su dešimtimis vienetų. Pasirinkite kategoriją (ilgis, masė, temperatūra, tūris, plotas, greitis arba skaitmeniniai duomenys), vienetus ir įveskite reikšmę — rezultatas pasirodys akimirksniu. Mygtuku „Sukeisti" galima apkeisti konvertavimo kryptį.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek metrų yra mylioje?', a: 'Viena mylia lygi tiksliai 1609,344 metrų. Vienas metras lygus maždaug 0,000621371 mylios. Greitam įvertinimui: 1 mylia ≈ 1,6 km.' },
      { q: 'Kaip konvertuoti Celsijų į Farenheitą?', a: 'Formulė: °F = °C × 9/5 + 32. Pavyzdžiui, 20°C = 68°F. Atvirkštinis: °C = (°F − 32) × 5/9. Absoliutus nulis: −273,15°C = 0 K.' },
      { q: 'Kuo skiriasi KB ir KiB?', a: 'KB (kilobaitas) = 1000 baitų (dešimtainė SI sistema). KiB (kibibaitas) = 1024 baitai (dvejetainė IEC sistema). Operacinės sistemos dažnai rodo dydžius KiB/MiB/GiB, bet ženklina juos KB/MB/GB.' },
      { q: 'Kiek svarų yra kilogramą?', a: 'Vienas kilogramas lygus maždaug 2,20462 svaro. Vienas svaras lygus maždaug 0,453592 kg. Greitam įvertinimui: 1 kg ≈ 2,2 lb.' },
      { q: 'Kas yra mazgai greičio matavime?', a: 'Mazgas (kn) — greičio vienetas, lygus vienai jūrmylei per valandą (1 jūrmylė = 1852 m). Naudojamas aviacijoje ir laivyboje. 1 mazgas ≈ 1,852 km/h ≈ 1,151 mph.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/converter/units') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function UnitsPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/units`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <UnitConverter locale={locale} />
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
