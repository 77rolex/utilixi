import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import DiscountCalculator from './DiscountCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/margin', label: 'Margin & Markup Calculator' }, { href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }, { href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }, { href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/margin', label: 'Calculatrice marge' }, { href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }, { href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Discount Calculator — Calculate Sale Price & Savings', description: 'Free discount calculator. Find the final price after a discount %, calculate what % discount you got, or apply multiple sequential discounts. Instant results.', h1: 'Discount Calculator', subtitle: 'Find the final price after a discount, or calculate what percentage off you\'re getting.' },
  ru: { title: 'Калькулятор скидки — рассчитайте цену и экономию', description: 'Бесплатный калькулятор скидки. Найдите финальную цену после скидки, рассчитайте процент скидки по ценам или примените несколько скидок подряд. Мгновенный результат.', h1: 'Калькулятор скидки', subtitle: 'Узнайте финальную цену после скидки или рассчитайте, какой процент скидки вы получаете.' },
  uk: { title: 'Калькулятор знижки — розрахуйте ціну та економію', description: 'Безкоштовний калькулятор знижки. Знайдіть фінальну ціну після знижки, розрахуйте відсоток знижки за цінами або застосуйте кілька знижок підряд. Миттєвий результат.', h1: 'Калькулятор знижки', subtitle: 'Дізнайтеся фінальну ціну після знижки або розрахуйте відсоток знижки, який ви отримуєте.' },
  fr: { title: 'Calculatrice de remise — Calculez le prix soldé et les économies', description: 'Calculatrice de remise gratuite. Trouvez le prix final après une remise %, calculez le % de remise à partir des prix, ou appliquez plusieurs remises successives.', h1: 'Calculatrice de remise', subtitle: 'Trouvez le prix final après une remise ou calculez le pourcentage de réduction appliqué.' },
  lt: { title: 'Nuolaidų Skaičiuotuvas — galutinė kaina ir sutaupoma suma', description: 'Apskaičiuokite galutinę kainą po nuolaidos ir sužinokite, kiek sutaupote. Įveskite pradinę kainą ir nuolaidos % — arba kelios nuolaidos iš eilės. Nemokamai ir akimirksniu.', h1: 'Nuolaidos skaičiuotuvas', subtitle: 'Raskite galutinę kainą po nuolaidos arba apskaičiuokite, koks nuolaidos procentas taikomas.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This discount calculator handles three common scenarios: calculating the final price when you know the original price and discount percentage; finding the discount percentage when you know both the original and sale prices; and applying multiple sequential discounts (common in wholesale, retail promotions, and stacked coupon codes). Note that multiple discounts do not simply add up — a 20% discount followed by a 10% discount equals a combined discount of 28%, not 30%.\n\nDiscount calculations are essential in retail, e-commerce, B2B negotiations, and personal finance. Understanding how discounts stack, how to reverse-calculate original prices, and how VAT interacts with discounts helps you make better buying and selling decisions.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I calculate a discount percentage?', a: 'Discount % = ((Original Price − Sale Price) / Original Price) × 100. Example: original $120, sale $90 → ((120 − 90) / 120) × 100 = 25% discount.' },
      { q: 'Why don\'t multiple discounts add up?', a: 'Stacked discounts apply sequentially to the reduced price. 20% then 10%: pay 80% of original after first; second applies to that 80%, leaving 72% — total saving 28%, not 30%.' },
      { q: 'What is the formula for final price after discount?', a: 'Final Price = Original × (1 − Discount% / 100). Example: $200 with 15% off → $200 × 0.85 = $170. Savings = $30.' },
      { q: 'What is a "stacked" discount?', a: 'Stacked discounts mean applying one discount after another. Common in retail (clearance + coupon) and B2B pricing. The order of application does not affect the final result.' },
      { q: 'How do I calculate the original price from a discounted price?', a: 'Original Price = Sale Price ÷ (1 − Discount% / 100). Example: a product costs $85 after a 15% discount → $85 ÷ 0.85 = $100 original price. This is useful when price tags only show the sale price.' },
      { q: 'What is the effective discount of "buy 2 get 1 free"?', a: '"Buy 2 get 1 free" (BOGOF) means you pay for 2 and get 3 items — saving 1 out of 3, which is a 33.3% discount on the total purchase. It is equivalent to a ~33% discount on each item when buying 3 together.' },
      { q: 'How does VAT apply to discounts?', a: 'In most countries, VAT is calculated on the final price after discount — not the original price. So a 20% discount on a €100 item (ex-VAT) gives €80 ex-VAT, then €96 with 20% VAT. Never apply VAT to the original pre-discount price.' },
      { q: 'What is the difference between a trade discount and a cash discount?', a: 'A trade discount is a reduction from the list price offered to trade customers (e.g. wholesalers, retailers) — it reduces the invoice price. A cash discount (or prompt payment discount) is offered for early payment, e.g. "2/10 net 30" means 2% off if paid within 10 days.' },
      { q: 'How do loyalty points relate to discounts?', a: 'Loyalty points are effectively a deferred discount. If 1 point = €0.01 and a product earns 100 points per €10 spent, that is a 1% effective discount on future purchases. The real discount rate depends on the redemption value and your likelihood of actually using the points.' },
      { q: 'Can this calculator handle negative discounts (surcharges)?', a: 'Yes — entering a negative discount percentage (e.g. −10%) calculates a surcharge, increasing the price. A −10% "discount" on $100 gives $110 final price. This is useful for calculating handling fees, import duties, or service charges expressed as percentages.' },
    ],
  },
  ru: {
    description: 'Этот калькулятор скидок обрабатывает три распространённых сценария: расчёт финальной цены при известной исходной цене и проценте скидки; нахождение процента скидки при известных исходной и акционной ценах; применение нескольких последовательных скидок. Важно: несколько скидок не суммируются — скидка 20% + скидка 10% = итоговая скидка 28%, а не 30%.\n\nРасчёты скидок применяются в розничной торговле, B2B-переговорах и личных финансах. Понимание того, как складываются скидки, как рассчитать исходную цену и как НДС взаимодействует со скидками, помогает принимать лучшие решения при покупке и продаже.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитать процент скидки?', a: 'Скидка % = ((Исходная − Акционная) / Исходная) × 100. Пример: 120 ₽ → 90 ₽ → скидка 25%.' },
      { q: 'Почему несколько скидок не суммируются?', a: 'Скидки применяются последовательно к уже сниженной цене. 20% + 10%: остаётся 80% × 90% = 72% от исходной — итого 28%, а не 30%.' },
      { q: 'Какова формула финальной цены?', a: 'Финальная = Исходная × (1 − Скидка% / 100). Пример: 200 ₽ скидка 15% → 170 ₽. Экономия 30 ₽.' },
      { q: 'Что такое накапливаемые скидки?', a: 'Последовательные скидки — применение одной скидки за другой. Порядок применения не влияет на итоговый результат.' },
      { q: 'Как рассчитать исходную цену по цене со скидкой?', a: 'Исходная цена = Акционная ÷ (1 − Скидка% / 100). Пример: товар стоит 85 ₽ со скидкой 15% → 85 ÷ 0,85 = 100 ₽ исходная цена.' },
      { q: 'Какова реальная скидка при акции "купи 2, получи 1 в подарок"?', a: '"Купи 2 возьми 1 в подарок" (BOGOF): вы платите за 2 и получаете 3. Экономия — 1 из 3, то есть 33,3% от общей суммы. Это эквивалентно скидке ~33% на каждый товар при покупке 3 штук.' },
      { q: 'Как НДС взаимодействует со скидками?', a: 'НДС начисляется на цену после скидки. Пример: товар 100 ₽ без НДС, скидка 20% → 80 ₽, с НДС 20% → 96 ₽. Никогда не начисляйте НДС на исходную цену до скидки.' },
      { q: 'Чем торговая скидка отличается от скидки за досрочную оплату?', a: 'Торговая скидка — снижение прейскурантной цены для оптовых или постоянных клиентов (снижает цену счёта). Скидка за досрочную оплату (кассовая скидка) предоставляется при быстрой оплате, например «2/10 нетто 30» — 2% скидка при оплате в течение 10 дней.' },
      { q: 'Как работают накопительные баллы лояльности в отношении скидок?', a: 'Баллы лояльности — это отложенная скидка. Если 1 балл = 0,01 ₽ и за 100 ₽ начисляют 100 баллов — это 1% эффективная скидка на будущие покупки. Реальная ценность зависит от курса обмена баллов.' },
      { q: 'Можно ли рассчитать надбавку (отрицательную скидку)?', a: 'Да — введите отрицательный процент скидки (например, −10%) для расчёта надбавки. Надбавка −10% к 100 ₽ даёт 110 ₽. Полезно для расчёта наценок, таможенных пошлин или сервисных сборов.' },
    ],
  },
  uk: {
    description: 'Цей калькулятор знижок обробляє три поширені сценарії: розрахунок фінальної ціни при відомій початковій ціні та відсотку знижки; знаходження відсотку знижки при відомих цінах; застосування кількох послідовних знижок. Кілька знижок не підсумовуються: знижка 20% + знижка 10% = загальна знижка 28%, а не 30%.\n\nРозрахунки знижок застосовуються в роздрібній торгівлі, B2B-переговорах та особистих фінансах. Розуміння того, як складаються знижки та як ПДВ взаємодіє зі знижками, допомагає приймати кращі рішення.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розрахувати відсоток знижки?', a: 'Знижка % = ((Початкова − Акційна) / Початкова) × 100. Приклад: 120 грн → 90 грн → знижка 25%.' },
      { q: 'Чому кілька знижок не підсумовуються?', a: 'Знижки застосовуються послідовно. 20% + 10%: залишається 80% × 90% = 72% від початкової — разом 28%, а не 30%.' },
      { q: 'Яка формула фінальної ціни?', a: 'Фінальна = Початкова × (1 − Знижка% / 100). Приклад: 200 грн знижка 15% → 170 грн. Економія 30 грн.' },
      { q: 'Що таке накопичувані знижки?', a: 'Послідовні знижки — застосування однієї знижки за іншою. Порядок застосування не впливає на результат.' },
      { q: 'Як розрахувати початкову ціну за ціною зі знижкою?', a: 'Початкова = Акційна ÷ (1 − Знижка% / 100). Приклад: 85 грн зі знижкою 15% → 85 ÷ 0,85 = 100 грн початкова.' },
      { q: 'Яка реальна знижка при акції «купи 2, отримай 1 в подарунок»?', a: 'Ви платите за 2 і отримуєте 3. Економія — 1 з 3, тобто 33,3% від загальної суми.' },
      { q: 'Як ПДВ взаємодіє зі знижками?', a: 'ПДВ нараховується на ціну після знижки. Приклад: 100 грн без ПДВ, знижка 20% → 80 грн, з ПДВ 20% → 96 грн.' },
      { q: 'Чим торгова знижка відрізняється від знижки за дострокову оплату?', a: 'Торгова знижка — зниження прейскурантної ціни для оптовиків. Знижка за дострокову оплату надається при швидкій оплаті, наприклад «2% за оплату протягом 10 днів».' },
      { q: 'Як накопичувальні бали лояльності пов\'язані зі знижками?', a: 'Бали лояльності — відкладена знижка. Якщо 1 бал = 0,01 грн і за 100 грн нараховують 100 балів — це 1% ефективна знижка на майбутні покупки.' },
      { q: 'Чи можна розрахувати надбавку (від\'ємну знижку)?', a: 'Так — введіть від\'ємний відсоток знижки (наприклад −10%) для розрахунку надбавки. −10% до 100 грн дає 110 грн. Корисно для митних зборів або сервісних надбавок.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice de remise gère trois scénarios : calculer le prix final depuis le prix original et le pourcentage de remise ; trouver le pourcentage de remise depuis les prix ; appliquer plusieurs remises successives. Les remises multiples ne s\'additionnent pas : 20% puis 10% = 28% de remise totale, pas 30%.\n\nLes calculs de remise sont essentiels dans le commerce de détail, les négociations B2B et les finances personnelles. Comprendre comment les remises s\'empilent, comment retrouver le prix d\'origine, et comment la TVA interagit avec les remises aide à prendre de meilleures décisions.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer le pourcentage de remise ?', a: 'Remise % = ((Prix original − Prix soldé) / Prix original) × 100. Exemple : 120 € → 90 € → remise 25 %.' },
      { q: 'Pourquoi les remises multiples ne s\'additionnent-elles pas ?', a: '20% puis 10% : après la première, vous payez 80 % ; la seconde s\'applique à ces 80 %, restant 72 % — soit 28 %, pas 30 %.' },
      { q: 'Quelle est la formule du prix final ?', a: 'Prix final = Prix original × (1 − Remise% / 100). Exemple : 200 € remisé 15 % → 170 €. Économie 30 €.' },
      { q: 'Qu\'est-ce qu\'une remise cumulée ?', a: 'Application successive de remises. L\'ordre d\'application ne change pas le résultat final.' },
      { q: 'Comment retrouver le prix d\'origine depuis un prix remisé ?', a: 'Prix original = Prix soldé ÷ (1 − Remise% / 100). Exemple : 85 € avec une remise de 15 % → 85 ÷ 0,85 = 100 € prix original.' },
      { q: 'Quelle remise réelle offre un "1 acheté = 1 offert" (BOGOF) ?', a: 'Vous payez 2 articles et en recevez 4 — soit 2 gratuits sur 4. C\'est une remise de 50 % sur la transaction. Le BOGOF classique (buy 2 get 1 free) représente une remise de 33,3 %.' },
      { q: 'Comment la TVA s\'applique-t-elle aux remises ?', a: 'La TVA est calculée sur le prix après remise. Exemple : 100 € HT, remise 20 % → 80 € HT, avec TVA 20 % → 96 € TTC. Ne jamais appliquer la TVA sur le prix original avant remise.' },
      { q: 'Quelle est la différence entre remise commerciale et escompte ?', a: 'La remise commerciale réduit le prix catalogue accordé aux clients professionnels (distributeurs, grossistes). L\'escompte est accordé pour paiement rapide — par exemple "2% pour paiement sous 10 jours, net 30 jours".' },
      { q: 'Comment les points de fidélité se rapportent-ils aux remises ?', a: 'Les points de fidélité sont une remise différée. Si 1 point = 0,01 € et qu\'un achat de 100 € génère 100 points, c\'est une remise effective de 1 % sur les achats futurs. La valeur réelle dépend du taux d\'utilisation des points.' },
      { q: 'Peut-on calculer une majoration (remise négative) ?', a: 'Oui — entrez un pourcentage négatif (ex. −10%) pour calculer une majoration. −10 % sur 100 € donne 110 €. Utile pour calculer des frais de port, droits de douane ou charges de service exprimés en pourcentage.' },
    ],
  },
  lt: {
    description: 'Šis nuolaidos skaičiuotuvas apima tris dažniausius scenarijus: galutinės kainos apskaičiavimas; nuolaidos procento radimas; kelių nuoseklių nuolaidų taikymas. Kelios nuolaidos nesudedamos: 20% + 10% = bendra nuolaida 28%, o ne 30%.\n\nNuolaidų skaičiavimai taikomi mažmeninėje ir didmeninėje prekyboje, B2B derybose bei asmeniniuose finansuose. Supratimas, kaip veikia kaupiamosios nuolaidos, padeda priimti geresnius pirkimo ir pardavimo sprendimus.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuoti nuolaidos procentą?', a: 'Nuolaida % = ((Pradinė − Pardavimo) / Pradinė) × 100. Pvz.: 120 € → 90 € → 25 % nuolaida.' },
      { q: 'Kodėl kelios nuolaidos nesudedamos?', a: '20 % + 10 %: po pirmosios lieka 80 %; antroji taikoma šiems 80 %, lieka 72 % — iš viso 28 %, o ne 30 %.' },
      { q: 'Kokia yra galutinės kainos formulė?', a: 'Galutinė = Pradinė × (1 − Nuolaida% / 100). Pvz.: 200 € su 15 % nuolaida → 170 €. Santaupos 30 €.' },
      { q: 'Kas yra kaupiamosios nuolaidos?', a: 'Nuoseklūs nuolaidų taikymai. Taikymo tvarka galutinio rezultato nekeičia.' },
      { q: 'Kaip apskaičiuoti pradinę kainą iš kainos su nuolaida?', a: 'Pradinė = Pardavimo ÷ (1 − Nuolaida% / 100). Pvz.: 85 € su 15 % nuolaida → 85 ÷ 0,85 = 100 € pradinė kaina.' },
      { q: 'Kokia tikroji nuolaida „pirk 2, gauk 1 nemokamai"?', a: 'Mokate už 2, gaunate 3 prekes — taupote 1 iš 3, t. y. 33,3 % nuo bendros sumos.' },
      { q: 'Kaip PVM sąveikauja su nuolaidomis?', a: 'PVM skaičiuojamas nuo kainos po nuolaidos. Pvz.: 100 € be PVM, nuolaida 20 % → 80 € be PVM, su PVM 21 % → 96,80 €.' },
      { q: 'Kuo prekybinė nuolaida skiriasi nuo skatinamosios nuolaidos?', a: 'Prekybinė nuolaida mažina kataloginę kainą didmenininkams ar nuolatiniams pirkėjams. Skatinamoji nuolaida (kasų nuolaida) teikiama už greitą apmokėjimą — pvz., „2 % nuolaida mokant per 10 dienų".' },
      { q: 'Kaip lojalumo taškai susiję su nuolaidomis?', a: 'Lojalumo taškai yra atidėta nuolaida. Jei 1 taškas = 0,01 € ir už 100 € pirkinį surenkami 100 taškų — tai 1 % efektyvi nuolaida būsimiems pirkiniams.' },
      { q: 'Ar galima apskaičiuoti antkainį (neigiamą nuolaidą)?', a: 'Taip — įveskite neigiamą nuolaidos procentą (pvz., −10 %) antkainiui apskaičiuoti. −10 % nuo 100 € duoda 110 €. Naudinga muitų, transporto ar aptarnavimo mokesčiams skaičiuoti.' },
    ],
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/discount', m);
}

export default async function DiscountPage({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const c = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: m.h1,
    description: m.description,
    url: `https://www.utilixi.com/${locale}/calculator/discount`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{m.h1}</h1>
        {m.subtitle && <p className={styles.page__subtitle}>{m.subtitle}</p>}
        <ToolActions />
        <DiscountCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {c.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{c.faqTitle}</h2>
            <div className={styles.faq__list}>
              {c.faqs.map((f, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{f.q}</h3>
                  <p className={styles.faq__answer}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
