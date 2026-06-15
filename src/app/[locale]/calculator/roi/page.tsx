import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import RoiCalculator from './RoiCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/compound-interest', label: 'Сложные проценты' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/compound-interest', label: 'Складні відсотки' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/compound-interest', label: 'Intérêts composés' }, { href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'ROI Calculator — Calculate Return on Investment Online', description: 'Free ROI calculator. Calculate return on investment, net profit, annualized ROI and investment multiplier in seconds.', h1: 'ROI Calculator', subtitle: 'Calculate return on investment for any project or asset' },
  ru: { title: 'Калькулятор ROI — рассчитать доходность инвестиций онлайн', description: 'Бесплатный калькулятор ROI. Рассчитайте доходность инвестиций, чистую прибыль, годовой ROI и мультипликатор за несколько секунд.', h1: 'Калькулятор ROI', subtitle: 'Рассчитайте ROI — рентабельность инвестиций' },
  uk: { title: 'Калькулятор ROI — розрахувати дохідність інвестицій онлайн', description: 'Безкоштовний калькулятор ROI. Розрахуйте дохідність інвестицій, чистий прибуток та річний ROI за кілька секунд.', h1: 'Калькулятор ROI', subtitle: 'Рассчитайте ROI — рентабельность инвестиций' },
  fr: { title: 'Calculatrice ROI — Calculer le retour sur investissement', description: 'Calculez votre retour sur investissement (ROI), le gain net, le ROI annualisé et le multiplicateur d\'investissement en quelques secondes.', h1: 'Calculatrice ROI', subtitle: 'Calculez le retour sur investissement de votre projet' },
  lt: { title: 'RI Skaičiuotuvas — Apskaičiuoti Investicijų Grąžą', description: 'Nemokamas investicijų grąžos skaičiuotuvas. Apskaičiuokite RI, grynąjį pelną, metinę grąžą ir daugiklį per kelias sekundes.', h1: 'Investicijų grąžos skaičiuotuvas', subtitle: 'Apskaičiuokite investicijų grąžą (ROI)' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'ROI (Return on Investment) is the most widely used metric to evaluate the profitability of an investment. Enter the amount you invested and the final value to instantly calculate ROI percentage, net profit or loss, and investment multiplier. Optionally enter the time period to see the annualized (CAGR) return.\n\nROI works across all asset classes: stocks, real estate, bonds, business projects, or any other investment. A positive ROI means profit; a negative ROI means a loss. To compare investments held for different periods, always use the annualized (CAGR) figure — simple ROI ignores the time dimension.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is ROI?', a: 'ROI (Return on Investment) is a percentage that shows how much profit or loss an investment generated relative to its cost. Formula: ROI = (Final Value − Initial Investment) / Initial Investment × 100%.' },
      { q: 'What is annualized ROI (CAGR)?', a: 'Annualized ROI, also known as CAGR (Compound Annual Growth Rate), shows the equivalent annual return if the investment grew at a steady rate. It is essential for comparing investments held over different time periods. Formula: CAGR = (Final/Initial)^(1/years) − 1.' },
      { q: 'What is the investment multiplier?', a: 'The multiplier shows how many times your money grew. For example, a multiplier of 2.5× means your investment grew 2.5 times. It equals Final Value ÷ Initial Investment.' },
      { q: 'Can ROI be negative?', a: 'Yes. A negative ROI means you lost money. For example, investing $10,000 and receiving back $7,000 results in an ROI of −30%.' },
      { q: 'What is a good ROI?', a: 'It depends on the asset class. The S&P 500 has historically returned ~10% per year. Real estate typically 4–8% annually. A savings account 2–5%. Benchmark against the average for the same category and risk level.' },
      { q: 'What is the difference between ROI and CAGR?', a: 'ROI shows the total return regardless of time — useful for a single transaction. CAGR annualizes that return, making it comparable to other time-based metrics like bank interest rates. For any investment held more than a year, always compare using CAGR.' },
      { q: 'How do I calculate ROI for real estate?', a: 'For property: ROI = (Net Rental Income + Capital Gain) / Total Investment × 100%. Total investment should include purchase price, taxes, agent fees, and renovation costs. Net rental income is annual rent minus operating expenses, insurance, and vacancy.' },
      { q: 'What is the difference between ROI and profit margin?', a: 'ROI measures return relative to the initial investment. Profit margin measures profit relative to revenue. ROI = (Profit / Cost) × 100%. Margin = (Profit / Revenue) × 100%. A business can have high margins but low ROI if the required capital is large.' },
      { q: 'How is ROI used in marketing?', a: 'Marketing ROI compares the revenue generated from a campaign to its cost. For example, spending €1,000 on ads that generate €4,000 in sales revenue gives a marketing ROI of 300%. Most marketers target a 5:1 revenue-to-spend ratio (400% ROI) as the minimum threshold.' },
      { q: 'What ROI should I expect from stock market investing?', a: 'Historically, diversified global stock indices (MSCI World, S&P 500) have returned 7–10% per year on average over long periods (20+ years), adjusted for inflation roughly 5–7%. Short-term returns vary widely and can be negative. Individual stocks carry higher volatility.' },
    ],
  },
  ru: {
    description: 'ROI (Return on Investment, окупаемость инвестиций) — ключевой показатель прибыльности вложений. Введите сумму вложений и итоговую стоимость, чтобы мгновенно рассчитать ROI в процентах, чистую прибыль/убыток и мультипликатор инвестиций. Укажите период для расчёта годового ROI (CAGR).\n\nROI подходит для любых активов: акции, недвижимость, бизнес, депозиты. Положительный ROI означает прибыль, отрицательный — убыток. Для сравнения вложений с разными сроками используйте годовой ROI (CAGR) — простой ROI не учитывает время.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое ROI?', a: 'ROI (Return on Investment) — показатель, отражающий доходность инвестиций в процентах. Формула: ROI = (Итоговая стоимость − Сумма вложений) / Сумма вложений × 100%.' },
      { q: 'Что такое годовой ROI (CAGR)?', a: 'Годовой ROI, или CAGR (Compound Annual Growth Rate), показывает эквивалентную годовую доходность при равномерном росте. Используется для сравнения инвестиций с разными сроками. Формула: CAGR = (Итог/Вложения)^(1/лет) − 1.' },
      { q: 'Что такое мультипликатор инвестиций?', a: 'Мультипликатор показывает, во сколько раз выросли вложения. Например, 2,5× означает, что капитал вырос в 2,5 раза. Формула: Итоговая стоимость ÷ Сумма вложений.' },
      { q: 'Может ли ROI быть отрицательным?', a: 'Да. Отрицательный ROI означает убыток. Например, вложили 100 000 ₽, получили 70 000 ₽ — ROI составит −30%.' },
      { q: 'Какой ROI считается хорошим?', a: 'Зависит от класса активов. Фондовый рынок исторически даёт 7–10% годовых, недвижимость — 4–8%, банковский депозит — 2–5%. Хорошим считается ROI выше среднего по своей категории с учётом риска.' },
      { q: 'В чём разница между ROI и CAGR?', a: 'ROI показывает общую доходность без учёта времени — удобно для разовых сделок. CAGR переводит её в годовую форму, что позволяет сравнивать с банковскими ставками и другими инвестициями. Для вложений сроком более года всегда сравнивайте по CAGR.' },
      { q: 'Как рассчитать ROI для недвижимости?', a: 'ROI = (Чистый доход от аренды + Прирост стоимости) / Вложения × 100%. В сумму вложений включайте цену покупки, налоги, комиссию риелтора и стоимость ремонта. Чистый доход от аренды — это арендные поступления за минусом расходов на содержание, налогов и простоя.' },
      { q: 'В чём разница между ROI и маржой?', a: 'ROI показывает прибыль относительно суммы вложений. Маржа — прибыль относительно выручки. ROI = (Прибыль / Себестоимость) × 100%, Маржа = (Прибыль / Выручка) × 100%. Высокая маржа не гарантирует высокий ROI, если требуются крупные капиталовложения.' },
      { q: 'Как ROI применяется в маркетинге?', a: 'Маркетинговый ROI сравнивает выручку от кампании с её стоимостью. Например, расходы 100 000 ₽ и выручка 500 000 ₽ дают ROI 400%. Большинство маркетологов считают соотношение выручки к расходам 5:1 (ROI 400%) минимально приемлемым.' },
      { q: 'Какой ROI ожидать от инвестиций в акции?', a: 'Диверсифицированные индексные фонды (S&P 500, MSCI World) исторически давали 7–10% годовых в долларах на горизонте 20+ лет. С поправкой на инфляцию — около 5–7%. На коротких сроках доходность сильно варьируется и может быть отрицательной.' },
    ],
  },
  uk: {
    description: 'ROI (Return on Investment, окупність інвестицій) — ключовий показник прибутковості вкладень. Введіть суму вкладень та підсумкову вартість для миттєвого розрахунку ROI у відсотках, чистого прибутку/збитку та мультиплікатора. Вкажіть період для розрахунку річного ROI (CAGR).\n\nROI підходить для будь-яких активів: акції, нерухомість, бізнес, депозити. Позитивний ROI означає прибуток, від\'ємний — збиток. Для порівняння вкладень з різними строками використовуйте річний ROI (CAGR).',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке ROI?', a: 'ROI (Return on Investment) — показник дохідності інвестицій у відсотках. Формула: ROI = (Підсумкова вартість − Сума вкладень) / Сума вкладень × 100%.' },
      { q: 'Що таке річний ROI (CAGR)?', a: 'Річний ROI або CAGR (Compound Annual Growth Rate) — еквівалентна річна дохідність при рівномірному зростанні. Формула: CAGR = (Підсумок/Вкладення)^(1/років) − 1.' },
      { q: 'Що таке мультиплікатор інвестицій?', a: 'Мультиплікатор показує, у скільки разів зросли вкладення. Наприклад, 2,5× означає, що капітал виріс у 2,5 рази. Формула: Підсумкова вартість ÷ Сума вкладень.' },
      { q: 'Чи може ROI бути від\'ємним?', a: 'Так. Від\'ємний ROI означає збиток. Наприклад, вклали 100 000 ₴, отримали 70 000 ₴ — ROI складе −30%.' },
      { q: 'Який ROI вважається хорошим?', a: 'Залежить від класу активів. Фондовий ринок історично дає 7–10% річних, нерухомість — 4–8%, банківський депозит — 2–5%. Хорошим є ROI вище середнього по своїй категорії.' },
      { q: 'У чому різниця між ROI і CAGR?', a: 'ROI показує загальну дохідність без урахування часу — зручно для разових угод. CAGR переводить її в річну форму для порівняння з банківськими ставками. Для вкладень строком понад рік завжди порівнюйте за CAGR.' },
      { q: 'Як розрахувати ROI для нерухомості?', a: 'ROI = (Чистий дохід від оренди + Приріст вартості) / Вкладення × 100%. До суми вкладень включайте ціну купівлі, податки, комісію ріелтора та ремонт. Чистий дохід — орендна плата мінус витрати на утримання та простій.' },
      { q: 'У чому різниця між ROI і маржею?', a: 'ROI показує прибуток відносно суми вкладень. Маржа — прибуток відносно виручки. Висока маржа не гарантує високий ROI, якщо потрібні великі капіталовкладення.' },
      { q: 'Як ROI застосовується в маркетингу?', a: 'Маркетинговий ROI порівнює виручку від кампанії з її вартістю. Наприклад, витрати 50 000 ₴, виручка 250 000 ₴ — ROI 400%. Більшість маркетологів вважають співвідношення виручки до витрат 5:1 мінімально прийнятним.' },
      { q: 'Який ROI очікувати від інвестицій в акції?', a: 'Диверсифіковані індексні фонди (S&P 500, MSCI World) історично давали 7–10% річних у доларах на горизонті 20+ років. З поправкою на інфляцію — близько 5–7%. На коротких строках дохідність може бути від\'ємною.' },
    ],
  },
  fr: {
    description: 'Le ROI (Return on Investment) est l\'indicateur de rentabilité le plus utilisé. Entrez le montant investi et la valeur finale pour calculer instantanément le ROI en pourcentage, le gain ou la perte nette, et le multiplicateur. Entrez la durée pour obtenir le ROI annualisé (TCAM).\n\nLe ROI s\'applique à tous les types d\'actifs : actions, immobilier, projets d\'entreprise, placements. Un ROI positif signifie un gain ; un ROI négatif, une perte. Pour comparer des investissements sur des durées différentes, utilisez toujours le TCAM (Taux de Croissance Annuel Moyen) — le ROI simple ne tient pas compte de la durée.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le ROI ?', a: 'Le ROI (Return on Investment) mesure la rentabilité d\'un investissement en pourcentage. Formule : ROI = (Valeur finale − Montant investi) / Montant investi × 100 %.' },
      { q: 'Qu\'est-ce que le ROI annualisé (TCAM) ?', a: 'Le TCAM (Taux de Croissance Annuel Moyen), ou CAGR en anglais, représente le rendement annuel équivalent. Formule : TCAM = (Final/Initial)^(1/années) − 1. Indispensable pour comparer des placements sur des durées différentes.' },
      { q: 'Qu\'est-ce que le multiplicateur d\'investissement ?', a: 'Le multiplicateur indique combien de fois votre capital a été multiplié. Par exemple, 2,5× signifie que l\'investissement a été multiplié par 2,5. Formule : Valeur finale ÷ Montant initial.' },
      { q: 'Le ROI peut-il être négatif ?', a: 'Oui. Un ROI négatif signifie une perte. Par exemple, investir 10 000 € et récupérer 7 000 € donne un ROI de −30 %.' },
      { q: 'Quel est un bon ROI ?', a: 'Cela dépend de la catégorie d\'actif. Les marchés boursiers mondiaux ont historiquement généré 7 à 10 % par an. L\'immobilier locatif en France 3 à 6 %. Les livrets réglementés (Livret A) autour de 3 %. Comparez toujours au sein de la même catégorie de risque.' },
      { q: 'Quelle est la différence entre ROI et TCAM ?', a: 'Le ROI mesure le rendement total sans tenir compte de la durée. Le TCAM annualise ce rendement pour le comparer à des taux bancaires ou d\'autres placements. Pour tout investissement sur plus d\'un an, comparez toujours sur la base du TCAM.' },
      { q: 'Comment calculer le ROI d\'un bien immobilier locatif ?', a: 'ROI = (Revenus locatifs nets + Plus-value) / Investissement total × 100 %. L\'investissement total inclut le prix d\'achat, les frais de notaire (~7–8 %), les travaux et les frais d\'agence. Les revenus nets sont les loyers moins les charges, l\'assurance et les vacances locatives.' },
      { q: 'Quelle est la différence entre ROI et marge bénéficiaire ?', a: 'Le ROI mesure le bénéfice par rapport à l\'investissement initial. La marge mesure le bénéfice par rapport au chiffre d\'affaires. ROI = (Bénéfice / Coût) × 100 %. Marge = (Bénéfice / CA) × 100 %. Une forte marge ne garantit pas un bon ROI si le capital immobilisé est élevé.' },
      { q: 'Comment le ROI est-il utilisé en marketing ?', a: 'Le ROI marketing compare les revenus générés par une campagne à son coût. Par exemple, dépenser 1 000 € pour générer 5 000 € de CA donne un ROI de 400 %. La plupart des professionnels visent un ratio CA/dépenses de 5:1 (soit 400 % de ROI) comme seuil minimum.' },
      { q: 'Quel ROI attendre de la Bourse ?', a: 'Les indices boursiers diversifiés (CAC 40, MSCI World, S&P 500) ont historiquement généré 7 à 10 % par an sur le long terme (20 ans et plus). Après inflation, la performance réelle est d\'environ 5 à 7 %. Sur le court terme, les rendements sont très volatils.' },
    ],
  },
  lt: {
    description: 'RI (investicijų grąža) — plačiausiai naudojamas investicijų pelningumo rodiklis. Įveskite investuotą sumą ir galutinę vertę, kad akimirksniu apskaičiuotumėte RI procentais, grynąjį pelną ar nuostolį ir daugiklį. Nurodykite laikotarpį, kad gautumėte metinę RI (CAGR).\n\nRI taikoma visų rūšių turtui: akcijoms, nekilnojamajam turtui, verslo projektams, indėliams. Teigiama RI reiškia pelną, neigiama — nuostolį. Investicijoms su skirtingais laikotarpiais visada naudokite metinę RI (CAGR) — paprasta RI neatsižvelgia į laiką.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra RI (investicijų grąža)?', a: 'RI matuoja investicijos pelningumą procentais. Formulė: RI = (Galutinė vertė − Investuota suma) / Investuota suma × 100 %.' },
      { q: 'Kas yra metinė RI (CAGR)?', a: 'Metinė RI arba CAGR (sudėtinis metinis augimo tempas) rodo ekvivalentinę metinę grąžą esant tolygiam augimui. Formulė: CAGR = (Galutinė/Pradinė)^(1/metai) − 1. Būtina lyginant investicijas su skirtingais laikotarpiais.' },
      { q: 'Kas yra investicijų daugiklis?', a: 'Daugiklis rodo, kiek kartų išaugo jūsų kapitalas. Pvz., 2,5× reiškia, kad investicija išaugo 2,5 karto. Formulė: Galutinė vertė ÷ Pradinė investicija.' },
      { q: 'Ar RI gali būti neigiama?', a: 'Taip. Neigiama RI reiškia nuostolį. Pvz., investavote 10 000 €, grąžinta 7 000 € — RI = −30 %.' },
      { q: 'Kokia RI laikoma gera?', a: 'Priklauso nuo turto klasės. Pasaulio akcijų indeksai istoriškai duoda 7–10 % per metus. Lietuvos nekilnojamasis turtas — 4–6 %. Indėliai — 3–5 %. Visada lyginkite toje pačioje rizikos kategorijoje.' },
      { q: 'Koks skirtumas tarp RI ir CAGR?', a: 'RI rodo bendrą grąžą neatsižvelgiant į laiką — patogu vienkartinėms sandoriams. CAGR ją perkelia į metinę formą, leidžiančią lyginti su banko palūkanomis. Investicijoms ilgesnėms nei vieneri metai visada naudokite CAGR.' },
      { q: 'Kaip apskaičiuoti RI nekilnojamajam turtui?', a: 'RI = (Grynos nuomos pajamos + Vertės prieaugis) / Investicijos × 100 %. Į investicijų sumą įtraukite pirkimo kainą, notaro mokesčius, agento komisinius ir renovacijos išlaidas. Grynos pajamos — nuomos pajamos atėmus eksploatavimo išlaidas ir laisvus laikotarpius.' },
      { q: 'Koks skirtumas tarp RI ir pelno maržos?', a: 'RI matuoja pelną lyginant su pradinėmis investicijomis. Marža — pelną lyginant su pajamomis. Didelė marža negarantuoja geros RI, jei reikalingas didelis kapitalas.' },
      { q: 'Kaip RI naudojama rinkodaroje?', a: 'Rinkodaros RI lygina kampanijos pajamas su jos kaina. Pvz., 1 000 € išlaidos, 5 000 € pajamos — RI 400 %. Dauguma rinkodarininkų siekia pajamų ir išlaidų santykio 5:1 (400 % RI) kaip minimalaus slenkščio.' },
      { q: 'Kokios RI tikėtis iš akcijų?', a: 'Diversifikuoti pasaulio akcijų indeksai (MSCI World, S&P 500) istoriškai grąžino 7–10 % per metus ilguoju laikotarpiu (20+ metų). Koreguojant pagal infliaciją — apie 5–7 %. Trumpuoju laikotarpiu grąža gali būti neigiama.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/roi', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RoiPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/roi`,
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
        <RoiCalculator locale={locale} />
        <AdInline locale={locale} />
        <DisclaimerNote locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
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
