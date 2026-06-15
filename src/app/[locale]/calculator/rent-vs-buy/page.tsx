import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/loan', label: 'Loan Calculator' }, { href: '/calculator/property-tax', label: 'Property Tax Calculator' }, { href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредита' }, { href: '/calculator/property-tax', label: 'Налог на недвижимость' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/loan', label: 'Калькулятор кредиту' }, { href: '/calculator/property-tax', label: 'Податок на нерухомість' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/loan', label: 'Calculatrice de prêt' }, { href: '/calculator/property-tax', label: 'Taxe foncière' }, { href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }, { href: '/calculator/property-tax', label: 'Nekilnojamojo turto mokestis' }, { href: '/calculator/roi', label: 'ROI skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Rent vs Buy Calculator — Is It Better to Rent or Buy?', description: 'Compare the total cost of renting vs buying a home over any period. Calculates net costs, home equity, break-even point and investment returns.', h1: 'Rent vs Buy Calculator', subtitle: 'Compare renting vs buying a home financially' },
  ru: { title: 'Аренда или покупка — что выгоднее: калькулятор онлайн', description: 'Сравните полную стоимость аренды и покупки жилья за любой период. Расчёт чистых расходов, собственного капитала и точки окупаемости.', h1: 'Аренда vs Покупка', subtitle: 'Сравните аренду и покупку жилья — что выгоднее' },
  uk: { title: 'Оренда або купівля — що вигідніше: калькулятор онлайн', description: 'Порівняйте повну вартість оренди та купівлі житла за будь-який період. Розрахунок чистих витрат, власного капіталу та точки беззбитковості.', h1: 'Оренда vs Купівля', subtitle: 'Порівняйте оренду та купівлю житла фінансово' },
  fr: { title: 'Louer ou Acheter — Calculatrice de comparaison', description: 'Comparez le coût total de la location et de l\'achat immobilier sur n\'importe quelle période. Calcule les coûts nets, les capitaux propres et le seuil de rentabilité.', h1: 'Louer ou Acheter', subtitle: 'Comparez financièrement louer ou acheter un logement' },
  lt: { title: 'Nuoma ar Pirkimas — Kas Naudingiau: Skaičiuotuvas', description: 'Palyginkite nuomos ir pirkimo bendras išlaidas bet kuriam laikotarpiui. Skaičiuoja grynas išlaidas, nuosavybės kapitalą ir atsipirkimo tašką.', h1: 'Nuoma ar Pirkimas', subtitle: 'Palyginkite nuomos ir pirkimo išlaidas finansiškai' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This calculator compares the total financial outcome of renting versus buying a home over a chosen time horizon. It accounts for mortgage payments, property taxes, maintenance, home value appreciation, and the opportunity cost of investing your down payment instead of spending it. The result shows the net cost of each option and when buying becomes cheaper than renting.\n\nThe decision to rent or buy is one of the biggest financial choices most people make. Buying builds equity and provides stability, but ties up capital and comes with high transaction costs. Renting offers flexibility and liquidity, but provides no equity. This calculator helps you see the full picture over any time period — from 1 to 30 years.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the break-even point?', a: 'The break-even point is the year when the cumulative net cost of buying becomes equal to (and then lower than) renting. Before this point, renting is cheaper; after it, buying wins. It typically ranges from 3 to 10 years depending on local market conditions.' },
      { q: 'What is "investment return" in the renting scenario?', a: 'If you rent instead of buying, your down payment stays with you. This calculator assumes you invest that money at the specified annual return rate, modeling the opportunity cost of tying up capital in a home purchase.' },
      { q: 'Why can the "net cost to buy" be negative?', a: 'If home appreciation is high and you hold long enough, the equity gained exceeds all costs paid (mortgage, taxes, maintenance). In that case, buying generates a net positive return, shown as a negative net cost.' },
      { q: 'Does this calculator include transaction costs?', a: 'No — agent fees, stamp duty/closing costs, moving expenses, and renovations are not included. These typically add 5–10% to the purchase price. Factor them in manually for a precise comparison.' },
      { q: 'What home appreciation rate should I use?', a: 'Historical real estate appreciation in most developed countries averages 2–5% per year. Use local market data for a more accurate estimate. In rapidly growing cities (London, Paris, Vilnius) it can be higher; in stagnant markets it may be near zero.' },
      { q: 'Is it better to rent or buy in 2024–2025?', a: 'With elevated mortgage rates (4–7% depending on country), the break-even point has shifted longer — often 7–12 years in major cities. In areas where rents are high relative to purchase prices, or where you plan to stay long-term, buying still makes sense. In overvalued markets, renting and investing the difference can outperform.' },
      { q: 'What maintenance rate should I use?', a: 'A commonly used rule of thumb is 1–2% of home value per year for maintenance and repairs. Older properties may need more. This covers routine repairs, appliances, roof, plumbing, and periodic renovations.' },
      { q: 'How does inflation affect this calculation?', a: 'Inflation generally benefits property owners: the real value of a fixed mortgage payment decreases over time, while rents typically rise with inflation. Over 20–30 years, this can significantly favor buying, especially in inflationary environments.' },
      { q: 'Should I include property tax?', a: 'Yes, always. Property tax varies widely: in France (taxe foncière) it\'s typically 0.5–1.5% of property value per year. In the UK there is no annual property tax for owner-occupiers, but stamp duty applies on purchase. In Lithuania the rate is 0.3–3% per year depending on value.' },
      { q: 'What if I want to move in a few years?', a: 'If you plan to stay for less than 5–7 years, renting is almost always better. Transaction costs (agent fees, stamp duty/notary, mortgage arrangement) alone typically amount to 5–10% of property value, requiring years of appreciation just to break even.' },
    ],
  },
  ru: {
    description: 'Калькулятор сравнивает общий финансовый результат аренды и покупки жилья за выбранный период. Учитываются ипотечные платежи, налог на недвижимость, расходы на обслуживание, рост стоимости жилья и альтернативная стоимость вложения первоначального взноса.\n\nПокупка жилья строит капитал и даёт стабильность, но требует крупного первоначального взноса и высоких транзакционных расходов. Аренда даёт гибкость и ликвидность, но не создаёт собственного капитала. Этот калькулятор показывает полную картину для любого горизонта планирования — от 1 до 30 лет.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое точка окупаемости?', a: 'Точка окупаемости — год, когда накопленные чистые расходы на покупку становятся равными расходам на аренду. До этого аренда дешевле, после — покупка выгоднее. Обычно наступает через 3–10 лет в зависимости от рынка.' },
      { q: 'Что такое «доходность инвестиций» в сценарии аренды?', a: 'При аренде первоначальный взнос остаётся у вас. Калькулятор предполагает, что вы инвестируете эту сумму с указанной годовой доходностью, моделируя альтернативные издержки покупки.' },
      { q: 'Почему «чистые расходы на покупку» могут быть отрицательными?', a: 'Если жильё сильно подорожало, прирост капитала превышает все понесённые расходы. В этом случае покупка приносит чистый доход, отображаемый как отрицательные расходы.' },
      { q: 'Включены ли транзакционные расходы?', a: 'Нет. Комиссия агента (2–3%), нотариальные расходы, страховка и ремонт не включены. В России суммарно это 5–7% от стоимости. Учтите их самостоятельно для точного расчёта.' },
      { q: 'Какой рост стоимости жилья указывать?', a: 'Историческая доходность недвижимости в большинстве стран — 2–5% в год. В Москве и Санкт-Петербурге за последние 10 лет — 5–8%. Для точного расчёта используйте данные по конкретному городу и сегменту.' },
      { q: 'Выгоднее ли покупать при высоких ипотечных ставках?', a: 'При ставках выше 10% точка окупаемости смещается — покупка начинает окупаться позже (10–15 лет). В такой ситуации аренда с инвестированием разницы часто выгоднее на коротком горизонте. Но если ставки снизятся, можно рефинансировать ипотеку.' },
      { q: 'Какой процент расходов на обслуживание указывать?', a: 'Стандартное правило — 1–2% от стоимости жилья в год. Для новостроек — около 0,5–1%, для старого фонда — 1,5–2%. Это покрывает текущий ремонт, замену техники и плановые работы.' },
      { q: 'Как инфляция влияет на расчёт?', a: 'Инфляция выгодна покупателям: реальная стоимость фиксированных ипотечных платежей снижается, а аренда и цены на жильё растут. На горизонте 20–30 лет это существенно склоняет чашу весов в пользу покупки.' },
      { q: 'Нужно ли учитывать налог на недвижимость?', a: 'Да. В России налог на имущество физических лиц составляет 0,1–0,3% от кадастровой стоимости в год для жилья. Это небольшая, но постоянная статья расходов.' },
      { q: 'Стоит ли покупать, если планируется переезд через несколько лет?', a: 'Если горизонт менее 5–7 лет, аренда почти всегда выгоднее. Транзакционные расходы (агент, нотариус, ипотека) составляют 5–10% от стоимости — чтобы их отбить, нужен рост цен или долгий срок владения.' },
    ],
  },
  uk: {
    description: 'Калькулятор порівнює загальний фінансовий результат оренди та купівлі житла за обраний період. Враховуються іпотечні платежі, податок на нерухомість, витрати на обслуговування, зростання вартості житла та альтернативна вартість першого внеску.\n\nКупівля житла будує власний капітал і дає стабільність, але потребує великого першого внеску та значних транзакційних витрат. Оренда дає гнучкість і ліквідність, але не створює власного капіталу. Цей калькулятор показує повну картину для будь-якого горизонту планування.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке точка беззбитковості?', a: 'Точка беззбитковості — рік, коли накопичені чисті витрати на купівлю стають рівними витратам на оренду. До цього моменту оренда дешевша, після — купівля вигідніша. Зазвичай настає через 3–10 років.' },
      { q: 'Що таке «дохідність інвестицій» у сценарії оренди?', a: 'При оренді перший внесок залишається у вас. Калькулятор припускає, що ви інвестуєте цю суму із зазначеною річною дохідністю — моделюючи альтернативні витрати купівлі.' },
      { q: 'Чому «чисті витрати на купівлю» можуть бути від\'ємними?', a: 'Якщо житло суттєво подорожчало, приріст капіталу перевищує всі понесені витрати. У такому разі купівля приносить чистий дохід — від\'ємні витрати.' },
      { q: 'Чи включені транзакційні витрати?', a: 'Ні. Комісія ріелтора, нотаріальні витрати та ремонт не включені. В Україні сукупно це 3–6% від вартості. Врахуйте їх самостійно для точного розрахунку.' },
      { q: 'Яке зростання вартості житла вказувати?', a: 'В Україні середньорічне зростання цін на нерухомість у великих містах — 5–10% (з урахуванням девальвації). Для точного розрахунку використовуйте дані по конкретному місту та сегменту ринку.' },
      { q: 'Чи вигідно купувати при високих іпотечних ставках?', a: 'При ставках вище 15% (єОселя — 7%) точка беззбитковості зміщується — купівля окупається пізніше. На короткому горизонті оренда з інвестуванням різниці може бути вигіднішою. На довгому — купівля зазвичай виграє через зростання цін і зниження реального платежу.' },
      { q: 'Який відсоток витрат на обслуговування вказувати?', a: 'Стандартне правило — 1–2% від вартості житла на рік. Для нового будівництва — 0,5–1%, для старого фонду — 1,5–2%. Враховує поточний ремонт, заміну техніки та планові роботи.' },
      { q: 'Як інфляція впливає на розрахунок?', a: 'Інфляція вигідна покупцям: реальна вартість фіксованих іпотечних платежів знижується, тоді як оренда та ціни на житло зростають. На горизонті 20+ років це суттєво схиляє чашу терезів на користь купівлі.' },
      { q: 'Чи потрібно враховувати податок на нерухомість?', a: 'Так. В Україні податок на нерухомість становить 1,5% від мінімальної зарплати за 1 кв. м на рік (понад неоподатковуваний мінімум). Для квартири 80 кв. м (понад 60 кв. м пільги) — близько 600–800 грн/рік.' },
      { q: 'Чи варто купувати, якщо плануєте переїзд через кілька років?', a: 'Якщо горизонт менше 5–7 років, оренда майже завжди вигідніша. Транзакційні витрати (ріелтор, нотаріус, реєстрація) становлять 3–6% від вартості — щоб їх відбити, потрібне суттєве зростання цін.' },
    ],
  },
  fr: {
    description: 'Ce calculateur compare le résultat financier total de la location et de l\'achat d\'un bien sur une période choisie. Il tient compte des mensualités, de la taxe foncière, des frais d\'entretien, de la valorisation du bien et du coût d\'opportunité de l\'apport personnel.\n\nAcheter construit un patrimoine et apporte de la stabilité, mais immobilise du capital et entraîne des frais d\'acquisition élevés. Louer offre de la flexibilité et de la liquidité, mais ne crée pas d\'équité. Ce simulateur vous aide à voir l\'image complète sur n\'importe quelle durée — de 1 à 30 ans.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le seuil de rentabilité ?', a: 'C\'est l\'année à partir de laquelle le coût net cumulé de l\'achat devient inférieur à celui de la location. Avant ce seuil, louer est moins cher ; après, acheter est plus avantageux. Il se situe généralement entre 3 et 10 ans.' },
      { q: 'Qu\'est-ce que le « rendement investissement » en scénario location ?', a: 'En louant, vous ne dépensez pas votre apport dans le bien. Le simulateur suppose que vous investissez cette somme au taux de rendement annuel indiqué, modélisant le coût d\'opportunité de l\'achat.' },
      { q: 'Pourquoi le coût net d\'achat peut-il être négatif ?', a: 'Si le bien se valorise fortement, la plus-value peut dépasser toutes les charges payées. Dans ce cas, l\'achat génère un retour positif, affiché comme coût négatif.' },
      { q: 'Les frais de notaire sont-ils inclus ?', a: 'Non. Les frais d\'agence, de notaire (~7–8 % dans l\'ancien), de déménagement et de travaux ne sont pas inclus. Ils peuvent décaler significativement le seuil de rentabilité.' },
      { q: 'Quel taux de valorisation immobilière utiliser en France ?', a: 'Sur le long terme, la valorisation moyenne de l\'immobilier français est d\'environ 2 à 4 % par an. Paris a historiquement affiché des hausses plus fortes (5–7 %) mais connaît aussi des corrections. Les villes moyennes varient selon les dynamiques locales.' },
      { q: 'Est-il préférable d\'acheter avec des taux élevés ?', a: 'Avec des taux autour de 4 % en 2024–2025, le seuil de rentabilité s\'allonge. Si vous envisagez de rester moins de 7 ans, la location reste souvent plus avantageuse. À long terme (15 ans+), l\'achat est presque toujours gagnant car le loyer fictif disparaît.' },
      { q: 'Quel taux d\'entretien annuel utiliser ?', a: 'La règle courante est 1 à 2 % de la valeur du bien par an. Pour un bien neuf : 0,5–1 %. Pour un bien ancien : 1,5–2 %. Cela couvre les petites réparations, les équipements et les travaux périodiques.' },
      { q: 'Comment l\'inflation influence-t-elle le résultat ?', a: 'L\'inflation favorise les propriétaires : la valeur réelle d\'une mensualité fixe diminue dans le temps, tandis que les loyers et les prix de l\'immobilier tendent à augmenter. Sur 20–30 ans, cela joue fortement en faveur de l\'achat.' },
      { q: 'Faut-il inclure la taxe foncière ?', a: 'Oui. En France, la taxe foncière représente généralement 0,5 à 1,5 % de la valeur locative cadastrale. Sur un bien à 300 000 €, comptez en moyenne 1 000 à 2 500 € par an selon la commune.' },
      { q: 'Que faire si je prévois de déménager dans quelques années ?', a: 'Si vous envisagez de partir dans moins de 5–7 ans, la location est presque toujours préférable. Les frais d\'acquisition (notaire, agence) représentent 7 à 10 % du prix — il faut plusieurs années de plus-value pour les amortir.' },
    ],
  },
  lt: {
    description: 'Šis skaičiuotuvas lygina bendrą finansinį rezultatą nuomojant ir perkant būstą pasirinktam laikotarpiui. Atsižvelgiama į hipotekos įmokas, nekilnojamojo turto mokestį, priežiūros išlaidas, būsto vertės augimą ir alternatyvias pradinio įnašo investavimo galimybes.\n\nPirkimas kuria turtą ir suteikia stabilumą, tačiau reikalauja didelio pradinio įnašo ir sandorio išlaidų. Nuoma siūlo lankstumą ir likvidumą, bet nekuria nuosavo kapitalo. Šis skaičiuotuvas parodo visą vaizdą bet kuriam laikotarpiui — nuo 1 iki 30 metų.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra atsipirkimo taškas?', a: 'Atsipirkimo taškas — metai, kai kaupiamos pirkimo grynosios išlaidos tampa mažesnės nei nuomos. Iki šio taško nuoma pigesnė, po jo — pirkimas pelningesnis. Paprastai tai įvyksta per 3–10 metų.' },
      { q: 'Kas yra „investicijų grąža" nuomos scenarijuje?', a: 'Nuomojantis pradinis įnašas lieka pas jus. Skaičiuotuvas daro prielaidą, kad investuojate šią sumą nurodytu metiniu grąžos tarifu — tai modeliuoja alternatyvias pirkimo išlaidas.' },
      { q: 'Kodėl grynosios pirkimo išlaidos gali būti neigiamos?', a: 'Jei būsto vertė stipriai išaugo, kapitalo prieaugis viršija visas patirtas išlaidas. Tokiu atveju pirkimas duoda grynąjį pelną — rodomą kaip neigiamos išlaidos.' },
      { q: 'Ar įtrauktos sandorio išlaidos?', a: 'Ne. Agento komisiniai, notaro mokesčiai ir remonto išlaidos neįtrauktos. Lietuvoje šios išlaidos sudaro 2–5 % pirkimo kainos. Į jas reikia atsižvelgti apskaičiuojant tikslų atsipirkimo tašką.' },
      { q: 'Kokį būsto vertės augimą nurodyti Lietuvoje?', a: 'Vilniuje per pastaruosius 10 metų butų kainos augo vidutiniškai 6–10 % per metus. Kituose Lietuvos miestuose augimas lėtesnis — 2–5 %. Naudokite konkrečios vietovės duomenis tikslesniam skaičiavimui.' },
      { q: 'Ar verta pirkti esant didelėms hipotekos palūkanoms?', a: 'Kai palūkanos viršija 5–6 %, atsipirkimo taškas pailgėja. Jei planuojate gyventi mažiau nei 7–10 metų, nuoma dažnai pelningesnė. Ilguoju laikotarpiu (15+ metų) pirkimas beveik visada laimėtų dėl nuomos kaštų išnykimo.' },
      { q: 'Kokį priežiūros išlaidų procentą nurodyti?', a: 'Standartinė taisyklė — 1–2 % turto vertės per metus. Naujiems būstams — 0,5–1 %, seniems — 1,5–2 %. Tai apima einamąjį remontą, įrangos keitimą ir periodines renovacijas.' },
      { q: 'Kaip infliacija veikia skaičiavimą?', a: 'Infliacija naudingas pirkėjams: fiksuotos hipotekos įmokos reali vertė mažėja laikui bėgant, o nuomos kainos ir būsto kainos paprastai auga. Per 20–30 metų tai reikšmingai lemia naudą pirkimo naudai.' },
      { q: 'Ar reikia įtraukti nekilnojamojo turto mokestį?', a: 'Taip. Lietuvoje nekilnojamojo turto mokestis fiziniams asmenims yra 0,5 % nuo turto vertės per metus (virš neapmokestinamosios ribos — 150 000 €). Tai nuolat mokama išlaidų dalis.' },
      { q: 'Ką daryti, jei planuojate persikraustyti po kelių metų?', a: 'Jei planuojate išvykti per mažiau nei 5–7 metus, nuoma beveik visada geresnė. Sandorio išlaidos (agentas, notaras) sudaro 2–5 % kainos — norint jas susigrąžinti, reikalingas reikšmingas kainų augimas.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/rent-vs-buy', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RentVsBuyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/rent-vs-buy`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
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
        <h1 className={styles.page__title}>{meta.h1}</h1>
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <RelatedTools locale={locale} tools={related} />
        <RentVsBuyCalculator locale={locale} />
        <AdInline locale={locale} />
        <DisclaimerNote locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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
