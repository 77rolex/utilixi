import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import RenovationCalculator from './RenovationCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/property-tax', label: 'Property Tax Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }],
  ru: [{ href: '/calculator/property-tax', label: 'Калькулятор налога на недвижимость' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }],
  uk: [{ href: '/calculator/property-tax', label: 'Калькулятор податку на нерухомість' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }],
  fr: [{ href: '/calculator/property-tax', label: 'Calculateur de taxe foncière' }, { href: '/calculator/mortgage', label: 'Calculateur de prêt immobilier' }],
  lt: [{ href: '/calculator/property-tax', label: 'Nekilnojamojo turto mokesčio skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Renovation Cost Calculator — By Country & Room Type', description: 'Estimate apartment and house renovation costs per square metre for Germany, France, Poland, Lithuania, Ukraine, and the USA. Economy, standard, and premium finish options included.', h1: 'Renovation Cost Calculator' },
  ru: { title: 'Калькулятор стоимости ремонта — по стране и типу помещения', description: 'Рассчитайте стоимость ремонта квартиры или дома за квадратный метр в Германии, Франции, Польше, Литве, Украине и США. Эконом, стандарт и премиум отделка.', h1: 'Калькулятор стоимости ремонта' },
  uk: { title: 'Калькулятор вартості ремонту — за країною та типом приміщення', description: 'Розрахуйте вартість ремонту квартири чи будинку за квадратний метр у Німеччині, Франції, Польщі, Литві, Україні та США. Економ, стандарт і преміум оздоблення.', h1: 'Калькулятор вартості ремонту' },
  fr: { title: 'Calculateur de coût de rénovation — par pays et type de pièce', description: 'Estimez le coût de rénovation d\'un appartement ou d\'une maison au m² en Allemagne, France, Pologne, Lituanie, Ukraine et États-Unis. Options économique, standard et premium.', h1: 'Calculateur de coût de rénovation' },
  lt: { title: 'Remonto kainos skaičiuotuvas — pagal šalį ir patalpos tipą', description: 'Apskaičiuokite buto ar namo remonto kainą kvadratiniam metrui Vokietijoje, Prancūzijoje, Lenkijoje, Lietuvoje, Ukrainoje ir JAV. Ekonominė, standartinė ir premium apdaila.', h1: 'Remonto kainos skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This calculator estimates renovation costs per square metre based on typical prices for your selected country and quality level. Prices include labour and materials but exclude furniture, appliances, and architectural fees. Actual costs can vary significantly based on the specific scope of work, materials chosen, contractor rates, and local market conditions.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is included in renovation costs?', a: 'This calculator estimates costs for surface finishing work: floor covering, wall tiling or plastering and painting, ceiling work, and for kitchens and bathrooms — plumbing and electrical installations. It does not include furniture, built-in appliances, structural changes, demolition, or architectural design fees.' },
      { q: 'What is the difference between economy, standard, and premium finish?', a: 'Economy finish uses basic materials — laminate flooring, standard tiles, and simple paint. Standard finish includes mid-range materials like engineered wood, quality tiles, and branded fittings. Premium finish uses high-end materials — natural stone, hardwood flooring, designer fittings, and custom joinery.' },
      { q: 'Why is the bathroom more expensive per m²?', a: 'Bathrooms require intensive plumbing and waterproofing work, premium tile installation, sanitary ware, and often underfloor heating. The complexity of work per square metre is much higher than for a bedroom or living room, which explains the higher per-m² cost.' },
      { q: 'How long does renovation typically take?', a: 'A full apartment renovation takes 1–3 months depending on size and scope. A bathroom alone typically takes 2–4 weeks. Major factors affecting duration include: extent of demolition, drying times for screeds and plaster, and contractor availability. Always add a 20–30% buffer to estimated timelines.' },
      { q: 'How can I reduce renovation costs?', a: 'Key ways to reduce costs: get 3+ quotes from different contractors; source materials yourself from wholesale suppliers; do minor work (painting, simple tiling) yourself if skilled; avoid making changes to the project once started; renovate in off-peak seasons (winter in most markets). Avoid the cheapest quotes — very low prices often indicate cut corners.' },
    ],
  },
  ru: {
    description: 'Калькулятор оценивает стоимость ремонта за квадратный метр на основе типичных цен для выбранной страны и класса отделки. Цены включают работу и материалы, но не включают мебель, бытовую технику и услуги дизайнера.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что включает стоимость ремонта?', a: 'Калькулятор оценивает затраты на чистовую отделку: напольные покрытия, облицовку или штукатурку и покраску стен, потолочные работы, а для кухни и ванной — сантехнику и электрику. Не включает мебель, технику, снос несущих стен и услуги архитектора.' },
      { q: 'В чём разница между эконом, стандарт и премиум отделкой?', a: 'Эконом: ламинат, стандартная плитка, обычная краска. Стандарт: инженерная доска, качественная плитка, брендовая сантехника. Премиум: натуральный камень, паркет, дизайнерская фурнитура и сантехника, изготовление по индивидуальным проектам.' },
      { q: 'Почему ванная дороже всего за м²?', a: 'Ванная требует интенсивных сантехнических работ, гидроизоляции, укладки плитки, монтажа сантехники и, как правило, тёплого пола. Трудозатраты на квадратный метр значительно выше, чем в спальне или гостиной.' },
      { q: 'Сколько времени занимает ремонт?', a: 'Полный ремонт квартиры занимает 1–3 месяца в зависимости от площади и объёма работ. Только ванная — 2–4 недели. Учитывайте время высыхания стяжки и штукатурки. К прогнозируемым срокам добавьте запас 20–30%.' },
      { q: 'Как сэкономить на ремонте?', a: 'Получите минимум 3 предложения от разных подрядчиков. Самостоятельно закупайте материалы через оптовые каналы. По возможности делайте простые работы (покраску) самостоятельно. Не меняйте проект в процессе работ — это существенно увеличивает стоимость. Очень низкие цены, как правило, указывают на некачественные работы.' },
    ],
  },
  uk: {
    description: 'Калькулятор оцінює вартість ремонту за квадратний метр на основі типових цін для обраної країни та класу оздоблення. Ціни включають роботу та матеріали, але не включають меблі, побутову техніку та послуги дизайнера.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що включає вартість ремонту?', a: 'Калькулятор оцінює витрати на чистове оздоблення: підлогові покриття, облицювання або штукатурку і фарбування стін, стельові роботи, а для кухні та ванної — сантехніку та електрику. Не включає меблі, техніку, знос несучих стін та послуги архітектора.' },
      { q: 'У чому різниця між економ, стандарт і преміум оздобленням?', a: 'Економ: ламінат, стандартна плитка, звичайна фарба. Стандарт: інженерна дошка, якісна плитка, брендова сантехніка. Преміум: натуральний камінь, паркет, дизайнерська фурнітура та сантехніка.' },
      { q: 'Чому ванна коштує найдорожче за м²?', a: 'Ванна потребує інтенсивних сантехнічних робіт, гідроізоляції, укладання плитки, монтажу сантехніки та, як правило, теплої підлоги. Трудовитрати на квадратний метр значно вищі, ніж у спальні чи вітальні.' },
      { q: 'Скільки часу займає ремонт?', a: 'Повний ремонт квартири займає 1–3 місяці залежно від площі та обсягу робіт. Лише ванна — 2–4 тижні. Враховуйте час висихання стяжки та штукатурки. До прогнозованих термінів додайте запас 20–30%.' },
      { q: 'Як зекономити на ремонті?', a: 'Отримайте мінімум 3 пропозиції від різних підрядників. Самостійно закуповуйте матеріали через оптових постачальників. Якщо можливо, виконуйте прості роботи (фарбування) самостійно. Не змінюйте проект у процесі робіт — це суттєво збільшує вартість. Дуже низькі ціни, як правило, свідчать про неякісні роботи.' },
    ],
  },
  fr: {
    description: 'Ce calculateur estime le coût de rénovation au m² sur la base des prix typiques pour votre pays et niveau de finition. Les prix comprennent la main-d\'œuvre et les matériaux, mais excluent le mobilier, l\'électroménager et les honoraires d\'architecte.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qui est inclus dans les coûts de rénovation ?', a: 'Ce calculateur estime les travaux de finition de surface : revêtements de sol, carrelage ou plâtrage et peinture des murs, travaux de plafond, et pour les cuisines et salles de bain — installations de plomberie et d\'électricité. Il n\'inclut pas les meubles, l\'électroménager, les travaux structurels ni les honoraires d\'architecte.' },
      { q: 'Quelle est la différence entre finition économique, standard et premium ?', a: 'Économique : parquet stratifié, carrelage basique, peinture simple. Standard : parquet contrecollé, carrelage de qualité, robinetterie de marque. Premium : pierre naturelle, parquet massif, robinetterie design, menuiserie sur mesure.' },
      { q: 'Pourquoi la salle de bain coûte-t-elle plus cher au m² ?', a: 'La salle de bain nécessite une plomberie intensive, une étanchéité, une pose de carrelage complexe, des équipements sanitaires et souvent un chauffage par le sol. La complexité des travaux au mètre carré est bien plus élevée que pour une chambre ou un salon.' },
      { q: 'Combien de temps dure une rénovation ?', a: 'Une rénovation complète d\'appartement prend 1 à 3 mois selon la surface et l\'envergure. Une salle de bain seule prend généralement 2 à 4 semaines. Ajoutez toujours un délai tampon de 20 à 30% aux estimations.' },
      { q: 'Comment réduire les coûts de rénovation ?', a: 'Obtenez au moins 3 devis de différents artisans. Achetez les matériaux vous-même auprès de grossistes. Évitez de modifier le projet en cours de chantier. Évitez les devis anormalement bas — ils indiquent souvent des malfaçons.' },
    ],
  },
  lt: {
    description: 'Šis skaičiuotuvas įvertina remonto kainą kvadratiniam metrui pagal tipines kainas jūsų pasirinktoje šalyje ir apdailos lygyje. Kainos apima darbą ir medžiagas, bet neapima baldų, buitinės technikos ir architekto honorarų.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas įeina į remonto kainą?', a: 'Skaičiuotuvas įvertina paviršiaus apdailos darbus: grindų dangas, sienų plytelių klojimą arba tinkavimą ir dažymą, lubų darbus, o virtuvei ir voniai – santechnikos ir elektros įrangą. Neapima baldų, buitinės technikos, konstrukcinių pakeitimų ir architekto honorarų.' },
      { q: 'Koks skirtumas tarp ekonominės, standartinės ir premium apdailos?', a: 'Ekonominė: laminatas, standartinės plytelės, paprasti dažai. Standartinė: inžinerinė lenta, kokybiškos plytelės, firminiai sanitariniai reikmenys. Premium: natūralus akmuo, ąžuolo parketlentė, dizainerio armatūra ir santechnika.' },
      { q: 'Kodėl vonios kambarys brangesnis už m²?', a: 'Vonios kambarys reikalauja intensyvių santechnikos darbų, hidroizoliacijos, plytelių klojimo, sanitarinių reikmenų montavimo ir dažnai – šiltų grindų. Darbo sudėtingumas kvadratiniam metrui yra daug didesnis nei miegamajame ar svetainėje.' },
      { q: 'Kiek laiko užtrunka remontas?', a: 'Visas buto remontas trunka 1–3 mėnesius, priklausomai nuo ploto ir apimties. Tik vonios kambarys – paprastai 2–4 savaites. Visada pridėkite 20–30% laiko atsargą prie numatytų terminų.' },
      { q: 'Kaip sumažinti remonto išlaidas?', a: 'Gaukite bent 3 pasiūlymus iš skirtingų rangovų. Medžiagas pirkite patys iš didmeninių tiekėjų. Venkite keisti projektą remonto metu – tai žymiai padidina kainą. Labai žemos kainos dažnai rodo nekokybišką darbą.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/renovation') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RenovationPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/renovation`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <RenovationCalculator locale={locale} />
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
