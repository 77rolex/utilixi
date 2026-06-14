import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import LoanPayoffCalculator from './LoanPayoffCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/loan', label: 'Loan Calculator' },
    { href: '/calculator/mortgage', label: 'Mortgage Calculator' },
    { href: '/calculator/inflation', label: 'Inflation Calculator' },
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
  ],
  ru: [
    { href: '/calculator/loan', label: 'Кредитный калькулятор' },
    { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' },
    { href: '/calculator/inflation', label: 'Калькулятор инфляции' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/calculator/net-worth', label: 'Калькулятор чистого капитала' },
  ],
  uk: [
    { href: '/calculator/loan', label: 'Кредитний калькулятор' },
    { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' },
    { href: '/calculator/inflation', label: 'Калькулятор інфляції' },
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/calculator/net-worth', label: 'Калькулятор чистого капіталу' },
  ],
  fr: [
    { href: '/calculator/loan', label: 'Calculatrice Prêt' },
    { href: '/calculator/mortgage', label: 'Calculatrice Hypothèque' },
    { href: '/calculator/inflation', label: 'Calculatrice Inflation' },
    { href: '/calculator/savings-goal', label: 'Calculatrice Épargne' },
    { href: '/calculator/net-worth', label: 'Calculatrice Patrimoine Net' },
  ],
  lt: [
    { href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' },
    { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' },
    { href: '/calculator/inflation', label: 'Infliacijos skaičiuotuvas' },
    { href: '/calculator/savings-goal', label: 'Santaupų tikslo skaičiuotuvas' },
    { href: '/calculator/net-worth', label: 'Grynojo turto skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Loan Early Payoff Calculator — Interest Saved with Extra Payments',
    description: 'Free loan payoff calculator. See how much interest you save and how many months sooner you pay off a loan by making extra monthly payments. Compare standard vs early payoff.',
    h1: 'Loan Early Payoff Calculator',
    subtitle: 'See how extra payments reduce your loan term and save on total interest paid.',
  },
  ru: {
    title: 'Калькулятор досрочного погашения кредита — экономия на процентах',
    description: 'Бесплатный калькулятор досрочного погашения. Узнайте, сколько сэкономите на процентах и на сколько месяцев раньше закроете кредит при дополнительных выплатах.',
    h1: 'Калькулятор досрочного погашения',
    subtitle: 'Узнайте, как досрочные платежи сокращают срок кредита и уменьшают итоговую переплату.',
  },
  uk: {
    title: 'Калькулятор дострокового погашення кредиту — економія на відсотках',
    description: 'Безкоштовний калькулятор дострокового погашення. Дізнайтеся, скільки зекономите на відсотках і на скільки місяців раніше закриєте кредит при додаткових платежах.',
    h1: 'Калькулятор дострокового погашення',
    subtitle: 'Дізнайтеся, як дострокові платежі скорочують термін кредиту та зменшують загальну переплату.',
  },
  fr: {
    title: 'Calculatrice Remboursement Anticipé — Intérêts Économisés',
    description: 'Calculatrice de remboursement anticipé gratuite. Calculez combien d\'intérêts vous économisez et combien de mois plus tôt vous remboursez un prêt en faisant des paiements supplémentaires.',
    h1: 'Calculatrice Remboursement Anticipé',
    subtitle: 'Découvrez comment des paiements supplémentaires réduisent la durée du prêt et les intérêts totaux.',
  },
  lt: {
    title: 'Išankstinio Paskolos Grąžinimo Skaičiuotuvas — Sutaupytos Palūkanos',
    description: 'Nemokamas išankstinio paskolos grąžinimo skaičiuotuvas. Sužinokite, kiek palūkanų sutaupysite ir kiek mėnesių anksčiau grąžinsite paskolą mokėdami papildomus mokėjimus.',
    h1: 'Išankstinio Paskolos Grąžinimo Skaičiuotuvas',
    subtitle: 'Sužinokite, kaip papildomos įmokos sutrumpina paskolos terminą ir sumažina bendrą palūkanų sumą.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our loan early payoff calculator shows the financial impact of making extra monthly payments on any loan. Enter your current balance, annual interest rate, regular monthly payment, and optional extra payment amount to instantly compare: total interest paid under each scenario, months saved, and total amount saved. The side-by-side comparison makes it easy to see whether even small extra payments create meaningful savings.\n\nEarly loan payoff is one of the highest guaranteed returns available. Paying an extra $100/month on a $20,000 loan at 7% interest with a $400/month payment saves approximately $1,200 in interest and eliminates 14 months of payments. Unlike investing (which has market risk), paying down debt guarantees a return equal to the loan\'s interest rate — risk free. The strategy is especially powerful for high-interest debt (credit cards, personal loans).',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much can I save by paying extra on my loan?', a: 'The savings depend on your loan balance, interest rate, and how much extra you pay. As a rough guide: on a $20,000 loan at 7% with a standard 5-year repayment, paying an extra $100/month reduces the loan term by about 14 months and saves ~$1,200 in interest. The earlier in the loan term you start extra payments, the greater the savings (interest charges are highest when the balance is highest).' },
      { q: 'Should I pay off debt or invest?', a: 'A useful rule: if your loan interest rate exceeds your expected after-tax investment return, pay off the debt. If your investment returns exceed the loan rate, investing may be better mathematically. However, debt payoff has advantages: guaranteed return (no market risk), psychological benefit, reduced monthly obligations. Many financial advisors suggest a hybrid approach: maintain an emergency fund, get any employer 401k match, then aggressively pay high-interest debt before investing broadly.' },
      { q: 'Does it matter when during the month I make extra payments?', a: 'For simple interest loans (most mortgages, auto loans, personal loans), paying early in the month reduces the outstanding balance for longer, reducing the interest that accrues. The difference is modest for small extra payments. For most practical purposes, consistently making your extra payment once a month matters far more than the timing within that month.' },
      { q: 'What is the avalanche vs snowball payoff method?', a: 'Avalanche: pay minimums on all debts, then put all extra money toward the highest-interest debt. Mathematically optimal — minimises total interest paid. Snowball: pay minimums on all debts, then put extra toward the smallest balance. Creates psychological wins through quick payoffs, motivating continued debt payoff. The avalanche saves more money; the snowball tends to produce higher completion rates for people who struggle with motivation.' },
      { q: 'Should I tell my lender how to apply extra payments?', a: 'Yes — this is important. By default, some lenders apply extra payments to future payments (reducing next month\'s due amount rather than reducing principal). Always specify that extra payments should be applied to principal. Confirm this in writing or check your statement after each extra payment. Reducing principal is what shortens your loan term and saves interest.' },
      { q: 'What is an amortisation schedule?', a: 'An amortisation schedule shows the breakdown of each monthly payment into principal (reduces your balance) and interest (cost of borrowing). Early in a loan, most of each payment is interest. As the balance decreases, the interest portion shrinks and more goes to principal. This is why early extra payments are most powerful — they redirect money from high-interest-fraction periods toward principal.' },
      { q: 'Are there prepayment penalties?', a: 'Some loans — particularly auto loans from dealers and some mortgages — include prepayment penalties, typically 1–3% of the remaining balance charged if you pay off a loan early. Check your loan agreement before making large extra payments. In the US, most conforming mortgages are prohibited from charging prepayment penalties. Personal loans and credit cards generally have none.' },
      { q: 'What is biweekly payment strategy?', a: 'Instead of 12 monthly payments/year, pay half your monthly amount every two weeks — resulting in 26 half-payments = 13 full monthly equivalents per year. This one extra annual payment can reduce a 30-year mortgage by 4–5 years and save tens of thousands in interest. Confirm your lender accepts biweekly payments and applies them correctly — not all do.' },
      { q: 'How does refinancing compare to extra payments?', a: 'Refinancing replaces your loan with a new one at a lower rate — but has closing costs (typically 1–3% of loan amount) and resets the loan clock. Extra payments keep your current rate but reduce your balance faster. If you can refinance to a significantly lower rate (>1% reduction) with low closing costs and stay in the loan long enough to recoup, refinancing often wins. If rates are similar, extra payments are simpler and cost nothing.' },
      { q: 'What happens when I pay off the loan early?', a: 'When you make your final payment, the lender should provide a payoff confirmation or "release of lien." For mortgages and auto loans (secured debt), the lender releases their claim on the collateral. Request a payoff letter in writing. Keep this document permanently. Check that credit bureaus update your report to show the account as "paid in full" within 30–60 days.' },
      { q: 'Can I use this calculator for a mortgage?', a: 'Yes. Enter your current outstanding balance (not the original amount), the annual interest rate, and your current monthly payment. For the extra payment field, enter what you plan to add each month. Note that this is a simplified calculation — actual mortgage payoff may differ slightly due to escrow, exact payment dates, and bank-specific rounding rules. For precise planning, also consult your mortgage statement\'s remaining balance.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор досрочного погашения показывает финансовый эффект дополнительных ежемесячных платежей по кредиту. Введите текущий остаток, годовую ставку, ежемесячный платёж и сумму дополнительного взноса, чтобы мгновенно сравнить: сколько процентов заплатите в каждом сценарии, сколько месяцев сэкономите и какова общая экономия.\n\nДосрочное погашение — один из немногих инструментов с гарантированной доходностью. Доплата 3 000 ₽/мес к платежу по кредиту 200 000 ₽ под 15% при стандартном платеже 5 000 ₽ позволяет сэкономить десятки тысяч рублей на процентах. В отличие от инвестиций, уменьшение долга даёт гарантированную доходность, равную ставке кредита.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько можно сэкономить на досрочном погашении?', a: 'Экономия зависит от остатка долга, ставки и суммы доплаты. Ориентир: при кредите 500 000 ₽ под 14%, стандартном платеже 12 000 ₽ и доплате 2 000 ₽/мес экономия на процентах составляет ~60 000–80 000 ₽, срок сокращается на 1,5–2 года. Чем раньше начать доплачивать — тем больше экономия.' },
      { q: 'Лучше досрочно погашать кредит или инвестировать?', a: 'Правило: если ставка кредита выше ожидаемой доходности инвестиций, гасить долг выгоднее. Если доходность инвестиций выше — может быть выгоднее инвестировать. Но погашение долга даёт гарантированную доходность без рыночного риска. Оптимальная стратегия: иметь подушку безопасности + гасить высокопроцентные долги, затем инвестировать.' },
      { q: 'Когда в течение месяца лучше вносить досрочный платёж?', a: 'Для кредитов с начислением простых процентов оплата в начале месяца снижает остаток раньше и уменьшает начисленные проценты. Разница невелика. Главное — стабильность: регулярные доплаты каждый месяц важнее, чем точный день платежа.' },
      { q: 'Что такое метод лавины и метод снежного кома?', a: 'Лавина: платите минимум по всем долгам, а все дополнительные деньги направляйте на долг с наивысшей ставкой. Математически оптимально — минимизирует переплату. Снежный ком: гасите сначала самый маленький долг. Психологически проще — быстрые победы мотивируют. Лавина экономит больше; снежный ком чаще доводят до конца.' },
      { q: 'Нужно ли указывать банку, куда направить досрочный платёж?', a: 'Да, это важно. По умолчанию некоторые банки засчитывают доплату в счёт будущих платежей, а не в уменьшение тела долга. Всегда указывайте назначение: "в уменьшение основного долга". Уточняйте в договоре или заявлении. Именно снижение тела долга сокращает срок и проценты.' },
      { q: 'Что такое график амортизации?', a: 'График амортизации показывает разбивку каждого платежа на основной долг и проценты. В начале кредита большая часть платежа — проценты; со временем доля процентов снижается. Поэтому ранние доплаты наиболее эффективны — они сокращают период, когда основная часть платежа идёт на проценты.' },
      { q: 'Есть ли штрафы за досрочное погашение в России?', a: 'По закону (ст. 11 ФЗ № 353-ФЗ) банки не вправе взимать штраф за досрочное погашение потребительских кредитов. Ипотека: также без штрафов при уведомлении за 30 дней. Автокредиты у дилеров — уточнять индивидуально. Всегда читайте кредитный договор.' },
      { q: 'Что такое двухнедельный план погашения?', a: 'Вместо 12 ежемесячных платежей — 26 платежей в размере половины ежемесячного. Итог: 13 полных платежей в год вместо 12. Одна лишняя выплата в год сокращает 30-летнюю ипотеку на 4–5 лет и экономит сотни тысяч рублей. Уточните у банка, принимает ли он такой режим.' },
      { q: 'Рефинансирование или досрочное погашение — что выгоднее?', a: 'Рефинансирование заменяет кредит на новый с пониженной ставкой, но несёт расходы (комиссии, страховки) и "обнуляет" срок. Досрочное погашение сохраняет текущую ставку, но снижает остаток. Если можно снизить ставку на 2+ п.п. с небольшими расходами на рефинансирование — часто выгоднее рефинансировать. Иначе — доплачивать.' },
      { q: 'Что происходит после полного погашения?', a: 'Банк выдаёт справку о закрытии кредита и снимает обременение (для залоговых займов). Обязательно получите документ в письменном виде. Проверьте кредитную историю через 30–60 дней: счёт должен быть помечен как "закрыт".' },
      { q: 'Можно ли использовать калькулятор для ипотеки?', a: 'Да. Введите текущий остаток долга (не первоначальную сумму), годовую ставку и текущий ежемесячный платёж. Это упрощённый расчёт; реальный срок может отличаться из-за особенностей банка. Для точного расчёта сверяйтесь с выпиской по кредиту.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор дострокового погашення показує фінансовий ефект додаткових щомісячних платежів за кредитом. Введіть поточний залишок, річну ставку, щомісячний платіж та суму додаткового внеску, щоб миттєво порівняти обидва сценарії: скільки відсотків заплатите, скільки місяців зекономите і яка загальна економія.\n\nДострокове погашення — один з небагатьох інструментів з гарантованою прибутковістю. На відміну від інвестицій, зменшення боргу дає гарантовану прибутковість, рівну ставці кредиту.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки можна зекономити на достроковому погашенні?', a: 'Економія залежить від залишку боргу, ставки та суми доплати. Орієнтир: при кредиті 200 000 грн під 20%, стандартному платежі 5 000 грн та доплаті 1 000 грн/міс економія на відсотках становить 20 000–30 000 грн, термін скорочується на 1–2 роки. Чим раніше починати — тим більша економія.' },
      { q: 'Краще достроково погашати кредит чи інвестувати?', a: 'Правило: якщо ставка кредиту вища за очікувану прибутковість інвестицій — гасити борг вигідніше. Погашення боргу дає гарантовану прибутковість без ринкового ризику. Оптимальна стратегія: подушка безпеки + погашення високовідсоткових боргів, потім інвестиції.' },
      { q: 'Коли краще вносити достроковий платіж?', a: 'Для кредитів з простими відсотками оплата на початку місяця знижує залишок раніше й зменшує нараховані відсотки. Різниця невелика. Головне — стабільність: регулярні доплати щомісяця важливіші за точний день.' },
      { q: 'Що таке метод лавини та метод сніжного кома?', a: 'Лавина: платіть мінімум за всіма боргами, а всі додаткові кошти — на борг з найвищою ставкою. Математично оптимально. Сніжний ком: спочатку гасіть найменший борг. Психологічно простіше. Лавина економить більше; сніжний ком частіше доводять до кінця.' },
      { q: 'Чи потрібно вказувати банку, куди спрямувати достроковий платіж?', a: 'Так. За замовчуванням деякі банки зараховують доплату в рахунок майбутніх платежів. Завжди вказуйте: "в зменшення основного боргу". Саме зниження тіла боргу скорочує термін і відсотки.' },
      { q: 'Що таке графік амортизації?', a: 'Графік амортизації показує розбивку кожного платежу на основний борг та відсотки. На початку кредиту більша частина — відсотки. Тому ранні доплати найефективніші.' },
      { q: 'Чи є штрафи за дострокове погашення в Україні?', a: 'Закон України "Про споживче кредитування" (ст. 26) дозволяє позичальнику достроково погасити кредит без штрафів. Іпотека: можливі умови в договорі — уточнюйте. Завжди читайте кредитний договір.' },
      { q: 'Що таке двотижневий план погашення?', a: 'Замість 12 щомісячних платежів — 26 платежів у розмірі половини щомісячного. Підсумок: 13 повних платежів на рік. Один зайвий платіж на рік скорочує 30-річну іпотеку на 4–5 років.' },
      { q: 'Рефінансування чи дострокове погашення — що вигідніше?', a: 'Рефінансування замінює кредит новим з нижчою ставкою, але несе витрати. Дострокове погашення зберігає поточну ставку, але знижує залишок. Якщо можна знизити ставку на 2+ в.п. з невеликими витратами — рефінансування вигідніше. Інакше — доплачувати.' },
      { q: 'Що відбувається після повного погашення?', a: 'Банк видає довідку про закриття кредиту та знімає обтяження (для заставних позик). Обов\'язково отримайте документ. Перевірте кредитну історію через 30–60 днів: рахунок має бути позначений як "закрито".' },
      { q: 'Чи можна використовувати калькулятор для іпотеки?', a: 'Так. Введіть поточний залишок боргу, річну ставку та поточний щомісячний платіж. Це спрощений розрахунок; реальний термін може відрізнятися. Для точного планування звіряйтеся з випискою за кредитом.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de remboursement anticipé montre l\'impact financier de paiements mensuels supplémentaires sur tout prêt. Saisissez votre solde actuel, le taux d\'intérêt annuel, votre mensualité régulière et le montant optionnel du paiement supplémentaire pour comparer instantanément les deux scénarios.\n\nLe remboursement anticipé d\'un prêt est l\'un des rares placements à rendement garanti. Contrairement aux investissements (soumis au risque de marché), rembourser sa dette garantit un rendement égal au taux du prêt — sans risque.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Combien puis-je économiser en payant plus ?', a: 'Les économies dépendent du capital restant dû, du taux et du montant supplémentaire. En règle générale : sur un prêt de 20 000 € à 5 %, mensualité standard de 400 €, ajouter 100 €/mois économise environ 1 500 € d\'intérêts et supprime 14 mois de remboursement. Plus tôt vous commencez, plus les économies sont importantes.' },
      { q: 'Vaut-il mieux rembourser la dette ou investir ?', a: 'Règle générale : si le taux de votre prêt dépasse votre rendement attendu après impôt, remboursez la dette. L\'avantage du remboursement : rendement garanti, sans risque de marché, réduction des obligations mensuelles. Beaucoup de conseillers recommandent une approche hybride : épargne de précaution + primes retraite + remboursement des dettes coûteuses, puis investissement.' },
      { q: 'Le moment du paiement supplémentaire dans le mois a-t-il de l\'importance ?', a: 'Pour les prêts à intérêts simples (la majorité des crédits immobiliers, autos, personnels), payer tôt dans le mois réduit le capital restant plus longtemps, limitant les intérêts courus. La différence est modeste. La régularité des paiements supplémentaires compte bien plus que le timing.' },
      { q: 'Qu\'est-ce que la méthode avalanche vs boule de neige ?', a: 'Avalanche : payez le minimum sur toutes les dettes, puis mettez tout le surplus sur la dette au taux le plus élevé. Optimal mathématiquement. Boule de neige : commencez par la plus petite dette. Efficace psychologiquement — les "victoires" rapides maintiennent la motivation. L\'avalanche économise davantage ; la boule de neige a généralement de meilleurs taux de réussite.' },
      { q: 'Dois-je indiquer à ma banque comment appliquer les paiements supplémentaires ?', a: 'Oui — c\'est crucial. Par défaut, certaines banques appliquent les paiements supplémentaires aux prochaines mensualités plutôt qu\'au capital. Spécifiez toujours que le paiement doit être imputé sur le capital. Confirmez par écrit et vérifiez votre relevé. C\'est la réduction du capital qui raccourcit la durée et économise des intérêts.' },
      { q: 'Qu\'est-ce qu\'un tableau d\'amortissement ?', a: 'Un tableau d\'amortissement montre la décomposition de chaque mensualité entre capital (réduit votre solde) et intérêts (coût de l\'emprunt). Au début du prêt, la majeure partie du paiement est en intérêts. Les paiements supplémentaires en début de prêt sont donc les plus efficaces.' },
      { q: 'Y a-t-il des pénalités de remboursement anticipé en France ?', a: 'Pour les crédits immobiliers : les indemnités de remboursement anticipé (IRA) sont limitées par loi à 6 mois d\'intérêts sur le capital remboursé, avec un plafond de 3 % du capital restant dû. Pour les crédits consommation : aucune pénalité pour les prêts < 10 000 € ; pour les plus importants, la pénalité est limitée à 0,5 % ou 1 % selon l\'échéance restante. Vérifiez votre contrat.' },
      { q: 'Qu\'est-ce que la stratégie de paiement bimensuel ?', a: 'Au lieu de 12 mensualités, payez la moitié de votre mensualité toutes les deux semaines : 26 demi-paiements = 13 mensualités complètes par an. Ce paiement annuel supplémentaire peut réduire un crédit immobilier sur 25 ans de 3 à 4 ans. Confirmez que votre banque accepte ce rythme et l\'applique correctement.' },
      { q: 'Renégociation vs remboursement anticipé : que choisir ?', a: 'La renégociation remplace votre prêt par un nouveau à taux plus bas, mais engendre des frais (frais de dossier, IRA). Les paiements supplémentaires conservent votre taux actuel mais réduisent le capital plus vite. Si vous pouvez baisser le taux de plus d\'1 % avec de faibles frais, la renégociation est souvent avantageuse. Sinon, les paiements supplémentaires sont plus simples.' },
      { q: 'Que se passe-t-il quand je rembourse le prêt ?', a: 'À la dernière échéance, la banque émet une quittance de solde et lève le cas échéant l\'hypothèque. Demandez ce document par écrit. Conservez-le indéfiniment. Vérifiez que la Banque de France ou l\'organisme de crédit met à jour votre fichier dans les 30 à 60 jours pour indiquer le compte comme "soldé".' },
      { q: 'Puis-je utiliser cette calculatrice pour un crédit immobilier ?', a: 'Oui. Saisissez votre capital restant dû actuel (pas le montant initial), le taux annuel et votre mensualité actuelle. C\'est un calcul simplifié — le remboursement réel peut différer légèrement à cause des assurances et des règles d\'arrondi bancaire.' },
    ],
  },
  lt: {
    description: 'Mūsų išankstinio paskolos grąžinimo skaičiuotuvas parodo finansinį papildomų mėnesinių mokėjimų poveikį bet kuriai paskolai. Įveskite dabartinį likutį, metinę palūkanų normą, įprastą mėnesinę įmoką ir papildomą sumą, kad iš karto palygintumėte: kiek palūkanų sumokėsite kiekvienu scenarijumi, kiek mėnesių sutaupysite ir kokia bendra santaupa.\n\nIšankstinis paskolos grąžinimas yra vienas iš nedaugelio garantuotos grąžos įrankių. Skirtingai nuo investicijų (kurioms kyla rinkos rizika), skolos mažinimas garantuoja grąžą, lygią paskolos palūkanų normai.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kiek galiu sutaupyti mokėdamas papildomai?', a: 'Santaupos priklauso nuo paskolos likučio, palūkanų normos ir papildomos sumos. Orientyras: 20 000 € paskolai esant 7% normai su standartiniu 400 € mėnesiniu mokėjimu, mokant papildomai 100 €/mėn., sutaupoma ~1 200 € palūkanų ir sutrumpėja 14 mėnesių. Kuo anksčiau pradedami papildomi mokėjimai, tuo didesnė santaupa.' },
      { q: 'Ar geriau grąžinti skolą ar investuoti?', a: 'Taisyklė: jei paskolos palūkanų norma didesnė už tikėtiną investicijų grąžą, geriau grąžinti skolą. Skolos grąžinimas duoda garantuotą grąžą be rinkos rizikos. Daugelis finansų patarėjų siūlo hibridinį metodą: avarinė atsarga + didelių palūkanų skolų grąžinimas, tada investicijos.' },
      { q: 'Ar svarbu, kada mėnesį atliekamas papildomas mokėjimas?', a: 'Paprastų palūkanų paskoloms mokėjimas mėnesio pradžioje sumažina likutį ilgiau ir mažina susikaupusias palūkanas. Skirtumas nedidelis. Reguliarumas yra daug svarbiau nei tikslus dienos pasirinkimas.' },
      { q: 'Kas yra lavinos ir sniego gniūžtės metodai?', a: 'Lavina: mokėkite minimumą visoms skoloms, o viską papildomai skirkite didžiausių palūkanų skolai. Matematiškai optimalu. Sniego gniūžtė: pirmiausia grąžinkite mažiausią skolą. Psichologiškai lengviau. Lavina sutaupo daugiau; sniego gniūžtę dažniau užbaigdina.' },
      { q: 'Ar reikia nurodyti bankui, kaip pritaikyti papildomą mokėjimą?', a: 'Taip. Kai kurie bankai papildomas įmokas priskaito prie būsimų mokėjimų, o ne pagrindinės skolos. Visada nurodykite: "pagrindinei skolai mažinti". Tai sutrumpina terminą ir taupo palūkanas.' },
      { q: 'Kas yra amortizacijos grafikas?', a: 'Amortizacijos grafikas parodo kiekvieno mokėjimo pasiskirstymą tarp pagrindinės skolos ir palūkanų. Pradžioje didžioji dalis mokėjimo — palūkanos. Todėl ankstyvieji papildomi mokėjimai efektyviausi.' },
      { q: 'Ar yra išankstinio grąžinimo baudos?', a: 'Lietuvoje pagal Vartojimo kredito įstatymą: iki 1% nuo išankstinio grąžinimo sumos, kai iki sutarties pabaigos liko daugiau nei 1 metai; 0,5%, kai liko mažiau. Būsto paskoloms — panašiai. Visada skaitykite sutartį.' },
      { q: 'Kas yra dviejų savaičių grąžinimo strategija?', a: 'Vietoj 12 mėnesinių mokėjimų, kas dvi savaites mokate pusę mėnesinės įmokos: 26 pusės mokėjimai = 13 pilnų per metus. Vienas papildomas metinis mokėjimas gali sutrumpinti 30 metų hipoteką 4–5 metais.' },
      { q: 'Refinansavimas ar išankstinis grąžinimas — kas naudingiau?', a: 'Refinansavimas pakeičia paskolą nauja su mažesne norma, tačiau turi išlaidų. Papildomi mokėjimai išlaiko dabartinę normą, bet greičiau mažina likutį. Jei galima sumažinti normą >1%, refinansavimas dažnai naudingesnis. Kitu atveju — papildomos įmokos paprastesnės.' },
      { q: 'Kas atsitinka, kai visiškai grąžinu paskolą?', a: 'Bankas išduoda paskolos uždarymo patvirtinimą ir atšaukia įkeitimą (įkeistoms paskoloms). Gaukite dokumentą raštu. Patikrinkite, ar kredito biuras atnaujina įrašą per 30–60 dienų.' },
      { q: 'Ar galiu naudoti skaičiuotuvą hipotekai?', a: 'Taip. Įveskite dabartinį pagrindinės skolos likutį (ne pradinę sumą), metinę normą ir dabartinę mėnesinę įmoką. Tai supaprastintas skaičiavimas — tikrasis terminas gali šiek tiek skirtis dėl banko taisyklių.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/loan-payoff', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LoanPayoffPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/loan-payoff`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
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
        <LoanPayoffCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((f, i) => (
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
