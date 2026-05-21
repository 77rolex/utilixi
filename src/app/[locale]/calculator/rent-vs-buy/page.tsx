import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/deposit', label: 'Deposit Calculator' }],
  ru: [{ href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/deposit', label: 'Калькулятор депозита' }],
  uk: [{ href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/deposit', label: 'Калькулятор депозиту' }],
  fr: [{ href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/deposit', label: 'Calculatrice de dépôt' }],
  lt: [{ href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Rent vs Buy Calculator — Is It Better to Rent or Buy?', description: 'Compare the total cost of renting vs buying a home over any period. Calculates net costs, home equity, break-even point and investment returns.', h1: 'Rent vs Buy Calculator' },
  ru: { title: 'Аренда или покупка — что выгоднее: калькулятор онлайн', description: 'Сравните полную стоимость аренды и покупки жилья за любой период. Расчёт чистых расходов, собственного капитала и точки окупаемости.', h1: 'Аренда vs Покупка' },
  uk: { title: 'Оренда або купівля — що вигідніше: калькулятор онлайн', description: 'Порівняйте повну вартість оренди та купівлі житла за будь-який період. Розрахунок чистих витрат, власного капіталу та точки беззбитковості.', h1: 'Оренда vs Купівля' },
  fr: { title: 'Louer ou Acheter — Calculatrice de comparaison', description: 'Comparez le coût total de la location et de l\'achat immobilier sur n\'importe quelle période. Calcule les coûts nets, les capitaux propres et le seuil de rentabilité.', h1: 'Louer ou Acheter' },
  lt: { title: 'Nuoma ar Pirkimas — Kas Naudingiau: Skaičiuotuvas', description: 'Palyginkite nuomos ir pirkimo bendras išlaidas bet kuriam laikotarpiui. Skaičiuoja grynas išlaidas, nuosavybės kapitalą ir atsipirkimo tašką.', h1: 'Nuoma ar Pirkimas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This calculator compares the total financial outcome of renting versus buying a home over a chosen time horizon. It accounts for mortgage payments, property taxes, maintenance, home value appreciation, and the opportunity cost of investing your down payment instead of spending it. The result shows the net cost of each option and when buying becomes cheaper than renting (break-even point).',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the break-even point?', a: 'The break-even point is the year at which the cumulative net cost of buying becomes equal to (and then lower than) renting. Before this point, renting is cheaper; after it, buying is. It typically ranges from 3 to 10 years depending on local real estate market conditions.' },
      { q: 'What is "investment return" in the renting scenario?', a: 'If you rent instead of buying, you don\'t spend your down payment on a property. This calculator assumes you invest that money at the specified annual return rate. This models the "opportunity cost" of tying up capital in a home purchase.' },
      { q: 'Why can "net cost to buy" be negative?', a: 'If home appreciation is high and you hold the property long enough, the equity gained can exceed all costs paid (mortgage, taxes, maintenance). In that case, buying generates a net positive return, shown as a negative net cost.' },
      { q: 'Does this calculator include transaction costs?', a: 'No — agent fees, closing costs, moving expenses, and renovations are not included. These typically add 5–10% to the purchase price and can significantly affect the break-even point. Factor them in manually for a more precise comparison.' },
      { q: 'What home appreciation rate should I use?', a: 'Historical real estate appreciation in most developed countries ranges from 2% to 5% per year on average. Use local market data for a more accurate estimate. In rapidly growing cities, it can be higher; in stagnant markets, it may be near zero.' },
    ],
  },
  ru: {
    description: 'Калькулятор сравнивает общий финансовый результат аренды и покупки жилья за выбранный период. Учитываются ипотечные платежи, налог на недвижимость, расходы на обслуживание, рост стоимости жилья и альтернативная стоимость вложения первоначального взноса. Результат показывает чистые расходы по каждому варианту и точку окупаемости покупки.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое точка окупаемости?', a: 'Точка окупаемости — год, когда накопленные чистые расходы на покупку становятся равными расходам на аренду. До этого момента аренда дешевле, после — покупка. Обычно наступает через 3–10 лет в зависимости от рынка недвижимости.' },
      { q: 'Что такое «доходность инвестиций» в сценарии аренды?', a: 'При аренде первоначальный взнос остаётся у вас. Калькулятор предполагает, что вы инвестируете эту сумму с указанной годовой доходностью. Это моделирует альтернативные издержки вложения капитала в недвижимость.' },
      { q: 'Почему «чистые расходы на покупку» могут быть отрицательными?', a: 'Если жильё существенно подорожало за период, прирост капитала превышает все понесённые расходы. В этом случае покупка приносит чистый доход, что отображается как отрицательные расходы.' },
      { q: 'Включены ли транзакционные расходы?', a: 'Нет. Комиссия агента, нотариальные расходы, страховка и ремонт не включены. Они составляют обычно 5–10% от стоимости жилья и могут существенно сдвинуть точку окупаемости.' },
      { q: 'Какой рост стоимости жилья указывать?', a: 'Историческая доходность недвижимости в большинстве стран составляет 2–5% в год. Для точного расчёта используйте данные по вашему городу и сегменту рынка. В быстрорастущих городах рост может быть выше.' },
    ],
  },
  uk: {
    description: 'Калькулятор порівнює загальний фінансовий результат оренди та купівлі житла за обраний період. Враховуються іпотечні платежі, податок на нерухомість, витрати на обслуговування, зростання вартості житла та альтернативна вартість інвестиції першого внеску.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке точка беззбитковості?', a: 'Точка беззбитковості — рік, коли накопичені чисті витрати на купівлю стають рівними витратам на оренду. До цього моменту оренда дешевша, після — купівля. Зазвичай настає через 3–10 років.' },
      { q: 'Що таке «дохідність інвестицій» у сценарії оренди?', a: 'При оренді перший внесок залишається у вас. Калькулятор припускає, що ви інвестуєте цю суму із зазначеною річною дохідністю. Це моделює альтернативні витрати вкладення капіталу в нерухомість.' },
      { q: 'Чому «чисті витрати на купівлю» можуть бути від\'ємними?', a: 'Якщо житло суттєво подорожчало, приріст капіталу перевищує всі понесені витрати. У такому разі купівля приносить чистий дохід, що відображається як від\'ємні витрати.' },
      { q: 'Чи включені транзакційні витрати?', a: 'Ні. Комісія агента, нотаріальні витрати та ремонт не включені. Вони зазвичай становлять 5–10% від вартості житла і суттєво впливають на точку беззбитковості.' },
      { q: 'Яке зростання вартості житла вказувати?', a: 'Середньорічне зростання нерухомості в більшості країн становить 2–5%. Для точного розрахунку використовуйте дані по вашому місту. У великих містах зростання може бути значно вищим.' },
    ],
  },
  fr: {
    description: 'Ce calculateur compare le résultat financier total de la location et de l\'achat d\'un bien sur une période choisie. Il tient compte des mensualités, de la taxe foncière, des frais d\'entretien, de la valorisation du bien et du coût d\'opportunité de l\'apport personnel.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le seuil de rentabilité ?', a: 'Le seuil de rentabilité est l\'année à partir de laquelle le coût net cumulé de l\'achat devient inférieur à celui de la location. Avant ce seuil, louer est moins cher ; après, acheter devient plus avantageux. Il se situe généralement entre 3 et 10 ans.' },
      { q: 'Qu\'est-ce que le « rendement investissement » en scénario location ?', a: 'En louant, vous ne dépensez pas votre apport dans le bien. Le calculateur suppose que vous investissez cette somme au taux de rendement annuel indiqué, modélisant ainsi le coût d\'opportunité de l\'achat.' },
      { q: 'Pourquoi le coût net d\'achat peut-il être négatif ?', a: 'Si le bien prend fortement de la valeur, la plus-value peut dépasser toutes les charges payées. Dans ce cas, l\'achat génère un retour net positif, affiché comme coût négatif.' },
      { q: 'Les frais de notaire sont-ils inclus ?', a: 'Non. Les frais d\'agence, de notaire, de déménagement et de travaux ne sont pas inclus. Ils représentent généralement 7 à 10 % du prix d\'achat et peuvent décaler significativement le seuil de rentabilité.' },
      { q: 'Quel taux de valorisation immobilière utiliser ?', a: 'La valorisation historique de l\'immobilier dans la plupart des pays développés est de 2 à 5 % par an. Utilisez les données de votre marché local pour un résultat plus précis.' },
    ],
  },
  lt: {
    description: 'Šis skaičiuotuvas lygina bendrą finansinį rezultatą nuomojant ir perkant būstą pasirinktam laikotarpiui. Atsižvelgiama į hipotekos įmokas, nekilnojamojo turto mokestį, priežiūros išlaidas, būsto vertės augimą ir alternatyvias pradinio įnašo investavimo galimybes.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra atsipirkimo taškas?', a: 'Atsipirkimo taškas — metai, kai kaupiamos pirkimo grynosios išlaidos tampa mažesnės nei nuomos. Iki šio momento nuoma pigesnė, po jo — pirkimas. Paprastai tai įvyksta per 3–10 metų.' },
      { q: 'Kas yra „investicijų grąža" nuomos scenarijuje?', a: 'Nuomojantis pradinis įnašas lieka pas jus. Skaičiuotuvas daro prielaidą, kad investuojate šią sumą nurodytu metiniu grąžos tarifu. Tai modeliuoja alternatyvias pirkimo kaštų galimybes.' },
      { q: 'Kodėl grynosios pirkimo išlaidos gali būti neigiamos?', a: 'Jei būsto vertė stipriai išaugo, kapitalo prieaugis viršija visas patirtas išlaidas. Tokiu atveju pirkimas duoda grynąjį pelną, rodomą kaip neigiamos išlaidos.' },
      { q: 'Ar įtrauktos sandorio išlaidos?', a: 'Ne. Agento komisiniai, notaro mokesčiai ir remonto išlaidos neįtrauktos. Jos paprastai sudaro 5–10% pirkimo kainos ir gali reikšmingai paveikti atsipirkimo tašką.' },
      { q: 'Kokį būsto vertės augimą nurodyti?', a: 'Istorinis nekilnojamojo turto vertės augimas daugelyje šalių yra 2–5% per metus. Naudokite savo miesto rinkos duomenis tikslesniam rezultatui gauti.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/rent-vs-buy') };
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <RentVsBuyCalculator locale={locale} />
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
