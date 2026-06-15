import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import LoanCalculator from './LoanCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/rent-vs-buy', label: 'Rent vs Buy' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }],
  ru: [{ href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/rent-vs-buy', label: 'Аренда vs Покупка' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }],
  uk: [{ href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/rent-vs-buy', label: 'Оренда vs Купівля' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }],
  fr: [{ href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/rent-vs-buy', label: 'Louer vs Acheter' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }],
  lt: [{ href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/rent-vs-buy', label: 'Nuoma vs Pirkimas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Loan Calculator — Monthly Payment & Total Cost',
    description: 'Free online loan calculator. Calculate your monthly payment, total repayment, and interest for any personal loan.',
    h1: 'Loan Calculator',
    subtitle: 'Calculate monthly loan payments and total interest',
  },
  ru: {
    title: 'Калькулятор кредита — ежемесячный платёж онлайн',
    description: 'Бесплатный калькулятор кредита онлайн. Рассчитайте ежемесячный платёж, общую сумму выплат и переплату по потребительскому кредиту.',
    h1: 'Калькулятор кредита',
    subtitle: 'Рассчитайте ежемесячный платёж по кредиту и переплату',
  },
  uk: {
    title: 'Калькулятор кредиту — щомісячний платіж онлайн',
    description: 'Безкоштовний калькулятор кредиту онлайн. Розрахуйте щомісячний платіж та переплату за споживчим кредитом.',
    h1: 'Калькулятор кредиту',
    subtitle: 'Розрахуйте щомісячний платіж за кредитом і переплату',
  },
  fr: {
    title: 'Calculatrice de Prêt — Calcul Mensualité Gratuit en ligne',
    description: 'Calculatrice de prêt gratuite. Calcul mensualité instantané : saisissez le montant, le TAEG et la durée. Simulateur de prêt personnel — coût total et intérêts en quelques secondes.',
    h1: 'Calculatrice de prêt personnel',
    subtitle: 'Calculez la mensualité de votre prêt et le coût total',
  },
  lt: {
    title: 'Paskolos Skaičiuotuvas — mėnesio įmoka internetu',
    description: 'Nemokamas paskolos skaičiuotuvas. Apskaičiuokite mėnesio įmoką, bendrą sumą ir palūkanas bet kuriai paskolai.',
    h1: 'Paskolos Skaičiuotuvas',
    subtitle: 'Apskaičiuokite mėnesinę paskolos įmoką ir palūkanas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free loan calculator lets you instantly estimate monthly payments for any personal or consumer loan. Enter the loan amount, annual interest rate (APR), and repayment term to get your monthly payment, total repayment amount, and total interest cost in seconds. A handy tool to compare multiple loan offers before committing.\n\nThe calculation uses the standard amortisation formula — the most common method for personal loans. Each monthly payment covers a portion of interest (calculated on the outstanding balance) and a portion of principal repayment. Always compare loans by APR, as it reflects the true annual cost including all mandatory fees.',
    faqTitle: 'Frequently Asked Questions about Personal Loans',
    faqs: [
      {
        q: 'How is the monthly loan payment calculated?',
        a: 'The monthly payment uses the annuity formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Our calculator performs this automatically as soon as you enter the three parameters.',
      },
      {
        q: 'What is APR (Annual Percentage Rate)?',
        a: 'APR is the annual cost of a loan expressed as a percentage, including interest and any mandatory fees. It is the most reliable figure for comparing loan offers, as it reflects the true total cost rather than just the nominal interest rate.',
      },
      {
        q: 'What is the difference between a personal loan and a mortgage?',
        a: 'A personal loan is an unsecured consumer credit (typically 3–84 months) with no requirement to state how the money is used. A mortgage finances property purchase over 10–30 years and is secured against the property. Mortgage rates are generally lower due to the collateral involved.',
      },
      {
        q: 'How can I reduce the total cost of my loan?',
        a: 'Three main levers: negotiate a lower interest rate, choose a shorter repayment term, or make early repayments when possible. A shorter term increases the monthly payment but significantly reduces the total interest paid over the life of the loan.',
      },
      {
        q: 'Can I repay a personal loan early?',
        a: 'In most countries, early repayment is a legal right. Some lenders charge an early repayment fee, but this is usually capped by consumer protection law. Check your loan agreement for the specific terms. Paying off a loan early reduces the total interest you pay.',
      },
      {
        q: 'Is a shorter or longer loan term better?',
        a: 'A shorter term means higher monthly payments but much less total interest. A longer term lowers the monthly payment but increases the total cost. For example, €10,000 at 6% over 24 months costs around €622 in interest, versus €1,561 over 60 months — 2.5 times more.',
      },
      {
        q: 'What are typical personal loan interest rates?',
        a: 'Rates vary by country, lender, loan amount, term, and borrower profile. Generally, personal loan rates range from around 4% to 15% per year. Online banks and credit unions often offer more competitive rates than traditional banks. Always compare APR, not just the nominal rate.',
      },
      {
        q: 'How do I compare loan offers effectively?',
        a: 'Always compare the APR (not the nominal rate), the total cost of credit, early repayment conditions, and any mandatory insurance. Our calculator displays the total repayment amount for each scenario, making it easy to compare different loan options side by side.',
      },
      {
        q: 'What is loan amortisation?',
        a: 'Amortisation is the gradual repayment of the loan principal over time. With a standard amortising loan, each monthly payment includes a declining share of interest and a growing share of principal. Early in the loan, most of the payment covers interest; later, most covers principal.',
      },
      {
        q: 'Does the calculator include loan insurance?',
        a: 'No. Our loan calculator computes monthly payments based on the interest rate you enter, without factoring in loan protection insurance. To simulate the full real cost, add your annual insurance rate to the interest rate you enter in the calculator.',
      },
    ],
  },
  ru: {
    description: 'Бесплатный калькулятор кредита позволяет мгновенно рассчитать ежемесячный платёж по потребительскому кредиту. Введите сумму, годовую процентную ставку и срок — и получите ежемесячный платёж, общую сумму выплат и итоговую переплату. Удобный инструмент для сравнения предложений разных банков перед оформлением кредита.\n\nРасчёт ведётся по стандартной формуле аннуитетных платежей — самой распространённой схеме для потребительских кредитов. Каждый платёж включает часть процентов (начисляемых на остаток долга) и часть основного долга. Для сравнения предложений всегда ориентируйтесь на ПСК — полную стоимость кредита.',
    faqTitle: 'Часто задаваемые вопросы о потребительском кредите',
    faqs: [
      {
        q: 'Как рассчитывается ежемесячный платёж по кредиту?',
        a: 'Платёж рассчитывается по формуле аннуитета: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], где P — сумма кредита, r — месячная ставка (годовая ÷ 12), n — количество платежей. Калькулятор выполняет этот расчёт автоматически при вводе трёх параметров.',
      },
      {
        q: 'Что такое ПСК — полная стоимость кредита?',
        a: 'ПСК — это годовая стоимость кредита в процентах, включающая процентную ставку и все обязательные платежи (комиссии, страховки). По закону банк обязан указывать ПСК в договоре. Именно ПСК, а не номинальная ставка, позволяет корректно сравнивать предложения разных банков.',
      },
      {
        q: 'В чём разница между потребительским кредитом и ипотекой?',
        a: 'Потребительский кредит — нецелевой краткосрочный займ (3–84 месяца) без залога имущества. Ипотека — долгосрочный займ на покупку недвижимости (10–30 лет) под залог этой недвижимости. Ставки по ипотеке, как правило, ниже из-за наличия залога.',
      },
      {
        q: 'Как снизить общую переплату по кредиту?',
        a: 'Три основных способа: договориться о более низкой ставке, взять кредит на меньший срок или делать досрочные погашения. Более короткий срок увеличивает ежемесячный платёж, но существенно снижает итоговую переплату.',
      },
      {
        q: 'Можно ли погасить потребительский кредит досрочно?',
        a: 'Да, досрочное погашение — законное право заёмщика. По российскому законодательству банк обязан принять досрочный платёж без штрафов при условии уведомления за 30 дней (для полного погашения) или за 30 дней (для частичного). Досрочное погашение сокращает итоговую переплату.',
      },
      {
        q: 'Что лучше — короткий или длинный срок кредита?',
        a: 'Короткий срок — выше ежемесячный платёж, но меньше переплата. Длинный срок — ниже платёж, но больше итоговая стоимость. Например, 300 000 ₽ под 15% на 12 месяцев дадут переплату около 26 000 ₽, а на 48 месяцев — около 99 000 ₽, то есть почти в 4 раза больше.',
      },
      {
        q: 'Какие процентные ставки по потребительским кредитам?',
        a: 'Ставки зависят от банка, суммы, срока и кредитной истории заёмщика. Онлайн-банки и кредитные кооперативы нередко предлагают более выгодные условия, чем традиционные банки. Сравнивайте предложения по ПСК, а не по номинальной ставке.',
      },
      {
        q: 'Как эффективно сравнивать кредитные предложения?',
        a: 'Сравнивайте всегда по ПСК (а не по номинальной ставке), итоговой сумме переплаты, условиям досрочного погашения и наличию обязательных страховок. Наш калькулятор показывает общую сумму выплат для каждого сценария, что упрощает прямое сравнение.',
      },
      {
        q: 'Что такое амортизация кредита?',
        a: 'Амортизация — это постепенное погашение основного долга. При аннуитетной схеме каждый платёж содержит убывающую долю процентов и растущую долю основного долга. В начале срока большая часть платежа идёт на проценты, в конце — на погашение тела кредита.',
      },
      {
        q: 'Учитывается ли страховка в калькуляторе?',
        a: 'Нет. Калькулятор рассчитывает платежи только на основе введённой процентной ставки, без учёта страховки. Чтобы смоделировать полную стоимость кредита, прибавьте годовой тариф страховки к процентной ставке при расчёте.',
      },
    ],
  },
  uk: {
    description: 'Безкоштовний калькулятор кредиту дозволяє миттєво розрахувати щомісячний платіж за споживчим кредитом. Введіть суму, річну відсоткову ставку та термін — і отримайте щомісячний платіж, загальну суму виплат та підсумкову переплату. Зручний інструмент для порівняння пропозицій різних банків перед оформленням кредиту.\n\nРозрахунок виконується за стандартною формулою ануїтетних платежів — найпоширенішою схемою для споживчих кредитів. Кожен платіж містить частину відсотків (нарахованих на залишок боргу) та частину основного боргу. Для порівняння пропозицій завжди орієнтуйтесь на повну вартість кредиту (ПВК).',
    faqTitle: 'Часті запитання про споживчий кредит',
    faqs: [
      {
        q: 'Як розраховується щомісячний платіж за кредитом?',
        a: 'Платіж розраховується за формулою ануїтету: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], де P — сума кредиту, r — місячна ставка (річна ÷ 12), n — кількість платежів. Калькулятор виконує цей розрахунок автоматично при введенні трьох параметрів.',
      },
      {
        q: 'Що таке повна вартість кредиту (ПВК)?',
        a: 'ПВК — це річна вартість кредиту у відсотках, що включає відсоткову ставку та всі обов\'язкові платежі (комісії, страховки). Банк зобов\'язаний зазначати ПВК у договорі. Саме ПВК, а не номінальна ставка, дозволяє коректно порівнювати пропозиції різних банків.',
      },
      {
        q: 'У чому різниця між споживчим кредитом та іпотекою?',
        a: 'Споживчий кредит — нецільова короткострокова позика (3–84 місяці) без застави майна. Іпотека — довгострокова позика на купівлю нерухомості (10–30 років) під заставу цієї нерухомості. Ставки за іпотекою, як правило, нижчі завдяки наявності застави.',
      },
      {
        q: 'Як знизити загальну переплату за кредитом?',
        a: 'Три основні способи: домовитись про нижчу ставку, взяти кредит на менший термін або робити дострокові погашення. Коротший термін збільшує щомісячний платіж, але суттєво знижує підсумкову переплату.',
      },
      {
        q: 'Чи можна погасити споживчий кредит достроково?',
        a: 'Так, дострокове погашення — законне право позичальника в Україні. За законодавством банк не має права стягувати штраф за дострокове повернення кредиту. Дострокове погашення скорочує підсумкову переплату.',
      },
      {
        q: 'Що краще — короткий чи довгий термін кредиту?',
        a: 'Короткий термін — вищий щомісячний платіж, але менша переплата. Довгий термін — нижчий платіж, але більша загальна вартість. Наприклад, 100 000 ₴ під 20% на 12 місяців дають переплату близько 11 000 ₴, а на 48 місяців — близько 44 000 ₴.',
      },
      {
        q: 'Які відсоткові ставки за споживчими кредитами?',
        a: 'Ставки залежать від банку, суми, терміну та кредитної історії позичальника. Онлайн-банки та кредитні спілки нерідко пропонують вигідніші умови, ніж традиційні банки. Порівнюйте пропозиції за ПВК, а не за номінальною ставкою.',
      },
      {
        q: 'Як ефективно порівнювати кредитні пропозиції?',
        a: 'Завжди порівнюйте за ПВК (а не за номінальною ставкою), загальною сумою переплати, умовами дострокового погашення та наявністю обов\'язкових страховок. Наш калькулятор показує загальну суму виплат для кожного сценарію, що спрощує пряме порівняння.',
      },
      {
        q: 'Що таке амортизація кредиту?',
        a: 'Амортизація — це поступове погашення основного боргу. При ануїтетній схемі кожен платіж містить частку відсотків, що зменшується, та частку основного боргу, що зростає. На початку терміну більша частина платежу йде на відсотки, наприкінці — на погашення тіла кредиту.',
      },
      {
        q: 'Чи враховується страховка в калькуляторі?',
        a: 'Ні. Калькулятор розраховує платежі лише на основі введеної відсоткової ставки, без урахування страховки. Щоб змоделювати повну вартість кредиту, додайте річний тариф страховки до відсоткової ставки при розрахунку.',
      },
    ],
  },
  fr: {
    description: 'Notre simulateur de prêt personnel gratuit vous permet de calculer instantanément vos mensualités pour tout crédit à la consommation. Saisissez le montant souhaité, le taux d\'intérêt annuel (TAEG) et la durée de remboursement pour obtenir en quelques secondes votre mensualité, le coût total du crédit et le montant total des intérêts. Outil idéal pour comparer plusieurs offres avant de souscrire un prêt.\n\nLe calcul repose sur la formule d\'amortissement constant, la plus courante pour les prêts personnels en France : chaque mensualité comprend une part d\'intérêts (calculée sur le capital restant dû) et une part de remboursement du capital. Pour comparer des offres, fiez-vous toujours au TAEG — il inclut tous les frais obligatoires.',
    faqTitle: 'Questions fréquentes sur le prêt personnel',
    faqs: [
      {
        q: 'Comment calculer la mensualité d\'un prêt personnel ?',
        a: 'La mensualité se calcule selon la formule d\'amortissement : M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], où P est le montant emprunté, r le taux mensuel (taux annuel ÷ 12) et n le nombre total de mensualités. Notre simulateur effectue ce calcul automatiquement dès que vous saisissez les trois paramètres.',
      },
      {
        q: 'Qu\'est-ce que le TAEG ?',
        a: 'Le TAEG (Taux Annuel Effectif Global) est le taux qui inclut tous les coûts obligatoires du crédit : intérêts, frais de dossier et assurance obligatoire. C\'est le seul indicateur fiable pour comparer des offres de prêt entre elles. La loi oblige les banques à l\'afficher sur toute offre de crédit.',
      },
      {
        q: 'Quelle est la différence entre un prêt personnel et un crédit immobilier ?',
        a: 'Le prêt personnel est un crédit à la consommation non affecté (3 à 84 mois), sans justificatif d\'utilisation obligatoire. Le crédit immobilier finance l\'achat d\'un bien sur 10 à 30 ans avec des garanties spécifiques (hypothèque, caution). Les taux sont généralement plus bas pour l\'immobilier.',
      },
      {
        q: 'Comment réduire le coût total de son crédit ?',
        a: 'Trois leviers principaux : négocier un taux plus bas, rembourser sur une durée plus courte, ou effectuer des remboursements anticipés. Une durée plus courte augmente la mensualité mais réduit significativement le montant total des intérêts payés.',
      },
      {
        q: 'Peut-on rembourser un prêt personnel par anticipation ?',
        a: 'Oui, c\'est un droit légal en France. Les indemnités de remboursement anticipé (IRA) sont plafonnées par la loi : 1 % du capital restant dû si la durée restante est supérieure à un an, 0,5 % dans le cas contraire. Pour les crédits inférieurs à 10 000 €, aucune indemnité ne peut être réclamée.',
      },
      {
        q: 'Vaut-il mieux une durée courte ou longue pour un prêt personnel ?',
        a: 'Une durée courte réduit le coût total des intérêts mais augmente la mensualité. Une durée longue allège la mensualité mais augmente le coût total. Par exemple, 10 000 € à 6 % sur 24 mois génère environ 622 € d\'intérêts, contre 1 561 € sur 60 mois — soit 2,5 fois plus.',
      },
      {
        q: 'Quels sont les taux moyens pour un prêt personnel en France ?',
        a: 'En 2024–2025, les taux des prêts personnels varient généralement entre 3,5 % et 8 % selon la durée, le montant et le profil de l\'emprunteur. Les banques en ligne proposent souvent des taux plus compétitifs que les banques traditionnelles.',
      },
      {
        q: 'Comment comparer plusieurs offres de prêt efficacement ?',
        a: 'Comparez toujours le TAEG (et non le taux nominal), le coût total du crédit, les conditions de remboursement anticipé et la présence d\'une assurance obligatoire. Notre simulateur affiche le coût total pour chaque simulation, ce qui facilite la comparaison directe entre plusieurs scénarios.',
      },
      {
        q: 'Qu\'est-ce que l\'amortissement d\'un prêt ?',
        a: 'L\'amortissement est le remboursement progressif du capital emprunté. Dans un prêt amortissable classique, chaque mensualité comprend une part d\'intérêts (décroissante) et une part de capital (croissante). Au début du prêt, vous remboursez surtout des intérêts ; à la fin, surtout du capital.',
      },
      {
        q: 'L\'assurance emprunteur est-elle incluse dans le simulateur ?',
        a: 'Non. Notre calculateur de prêt calcule les mensualités sur la base du taux d\'intérêt saisi, sans inclure l\'assurance emprunteur. Pour simuler le coût réel complet, ajoutez le taux d\'assurance annuel au taux d\'intérêt que vous saisissez dans le simulateur.',
      },
    ],
  },
  lt: {
    description: 'Nemokamas paskolos skaičiuotuvas leidžia akimirksniu apskaičiuoti mėnesio įmokas bet kuriai vartojimo paskolai. Įveskite sumą, metinę palūkanų normą (BVKKMN) ir terminą — ir iš karto gausite mėnesio įmoką, bendrą grąžinamą sumą bei bendrą palūkanų sumą. Patogus įrankis palyginant kelių bankų pasiūlymus prieš pasirašant sutartį.\n\nSkaičiavimas grindžiamas standartine anuiteto formule — dažniausiai naudojama vartojimo paskolų schema. Kiekviena įmoka apima palūkanų dalį (skaičiuojamą nuo likusios skolos) ir pagrindinės skolos dalį. Pasiūlymams palyginti visada naudokite BVKKMN — bendrąją vartojimo kredito kainos metinę normą.',
    faqTitle: 'Dažniausiai užduodami klausimai apie vartojimo paskolas',
    faqs: [
      {
        q: 'Kaip apskaičiuojama mėnesio paskolos įmoka?',
        a: 'Mėnesio įmoka apskaičiuojama pagal anuiteto formulę: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], kur P — paskolos suma, r — mėnesinė norma (metinė ÷ 12), n — mokėjimų skaičius. Skaičiuotuvas šį skaičiavimą atlieka automatiškai, kai tik įvedate tris parametrus.',
      },
      {
        q: 'Kas yra BVKKMN?',
        a: 'BVKKMN (Bendroji Vartojimo Kredito Kainos Metinė Norma) — tai metinė paskolos kaina procentais, apimanti palūkanas ir visus privalomus mokesčius. Pagal ES vartojimo kredito direktyvą bankas privalo nurodyti BVKKMN sutartyje. Būtent BVKKMN, o ne nominalioji norma, leidžia teisingai palyginti skirtingų bankų pasiūlymus.',
      },
      {
        q: 'Kuo skiriasi vartojimo paskola nuo hipotekos?',
        a: 'Vartojimo paskola — tai ne tikslinė trumpalaikė paskola (3–84 mėnesiai) be turto įkeitimo. Hipoteka finansuoja nekilnojamojo turto pirkimą (10–30 metų) su turto įkeitimu. Hipotekos palūkanos paprastai mažesnės dėl turto garantijos.',
      },
      {
        q: 'Kaip sumažinti bendrą paskolos kainą?',
        a: 'Trys pagrindiniai būdai: derėtis dėl mažesnės palūkanų normos, pasirinkti trumpesnį grąžinimo terminą arba atlikti dalinį išankstinį grąžinimą. Trumpesnis terminas padidina mėnesio įmoką, tačiau žymiai sumažina bendrą palūkanų sumą.',
      },
      {
        q: 'Ar galima paskolą grąžinti anksčiau laiko?',
        a: 'Taip, išankstinis grąžinimas yra teisinis paskolos gavėjo teisė ES šalyse. Pagal ES direktyvą bankas gali taikyti kompensaciją, tačiau ji negali viršyti 1 % likusios sumos (jei likęs terminas ilgesnis nei metai) arba 0,5 % (trumpiau nei metai). Išankstinis grąžinimas sumažina bendrą palūkanų sumą.',
      },
      {
        q: 'Ar geriau trumpesnis ar ilgesnis paskolos terminas?',
        a: 'Trumpesnis terminas — didesnė mėnesio įmoka, bet mažesnė bendra palūkanų suma. Ilgesnis terminas — mažesnė įmoka, bet didesnė bendra kaina. Pavyzdžiui, 10 000 € paskola 6 % palūkanomis 24 mėnesiams kainuoja apie 622 € palūkanų, o 60 mėnesiams — apie 1 561 €, t. y. 2,5 karto daugiau.',
      },
      {
        q: 'Kokios vidutinės vartojimo paskolų palūkanos?',
        a: 'Palūkanos priklauso nuo banko, sumos, termino ir paskolos gavėjo kredito istorijos. Interneto bankai ir kredito unijos dažnai siūlo konkurencingesnes sąlygas nei tradiciniai bankai. Pasiūlymus visada lyginkite pagal BVKKMN, o ne pagal nominalią normą.',
      },
      {
        q: 'Kaip efektyviai palyginti paskolų pasiūlymus?',
        a: 'Visada lyginkite BVKKMN (o ne nominalią normą), bendrą kredito kainą, išankstinio grąžinimo sąlygas ir privalomojo draudimo buvimą. Mūsų skaičiuotuvas kiekvienam scenarijui rodo bendrą grąžinamą sumą, todėl lengva tiesiogiai palyginti skirtingus variantus.',
      },
      {
        q: 'Kas yra paskolos amortizacija?',
        a: 'Amortizacija — tai laipsniškas pagrindinės skolos grąžinimas. Anuiteto schemoje kiekviena įmoka apima mažėjančią palūkanų dalį ir augančią pagrindinės skolos dalį. Paskolos pradžioje didžioji dalis įmokos eina palūkanoms, pabaigoje — pagrindinei skolai.',
      },
      {
        q: 'Ar skaičiuoklė įskaičiuoja paskolos draudimą?',
        a: 'Ne. Skaičiuotuvas apskaičiuoja įmokas tik pagal įvestą palūkanų normą, neįskaitant draudimo. Norint sumodeliuoti visą realią paskolos kainą, prie palūkanų normos pridėkite metinį draudimo tarifą.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/loan', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LoanPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/loan`,
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <LoanCalculator locale={locale} />

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
