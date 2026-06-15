import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import DepositCalculator from './DepositCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/loan', label: 'Loan Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }, { href: '/calculator/compound-interest', label: 'Compound Interest Calculator' }, { href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/loan', label: 'Калькулятор кредита' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }, { href: '/calculator/compound-interest', label: 'Сложные проценты' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/loan', label: 'Калькулятор кредиту' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }, { href: '/calculator/compound-interest', label: 'Складні відсотки' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/loan', label: 'Calculatrice de prêt' }, { href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }, { href: '/calculator/compound-interest', label: 'Intérêts composés' }, { href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }, { href: '/calculator/compound-interest', label: 'Sudėtinių palūkanų skaičiuotuvas' }, { href: '/calculator/roi', label: 'ROI skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Deposit Calculator — Calculate Savings & Interest Online',
    description: 'Free deposit calculator. Calculate the final amount of your bank deposit with compound interest. Choose compounding frequency, currency and term.',
    h1: 'Deposit Calculator',
    subtitle: 'Calculate deposit interest and returns online',
  },
  ru: {
    title: 'Калькулятор вклада — доход в месяц и % годовых онлайн',
    description: 'Рассчитайте вклад по ставке % годовых: ежемесячный доход, итоговая сумма с капитализацией. Выберите частоту начисления — ежемесячно, ежеквартально или раз в год. Бесплатно.',
    h1: 'Калькулятор депозита',
    subtitle: 'Рассчитайте проценты по вкладу онлайн — любая ставка и срок',
  },
  uk: {
    title: 'Калькулятор вкладу з капіталізацією — розрахунок депозиту онлайн',
    description: 'Безкоштовний калькулятор вкладу онлайн. Розрахуйте підсумкову суму депозиту з капіталізацією відсотків: щомісячною, щоквартальною або щорічною. Порівняйте дохід із простими відсотками.',
    h1: 'Калькулятор депозиту',
    subtitle: 'Розрахуйте відсотки по депозиту онлайн',
  },
  fr: {
    title: 'Simulateur de Dépôt Bancaire Gratuit — Calcul des Intérêts Composés',
    description: 'Simulateur de dépôt bancaire gratuit. Calculez le montant final de votre épargne avec capitalisation des intérêts. Comparez intérêts simples et composés, choisissez la fréquence et la durée.',
    h1: 'Simulateur de Dépôt Bancaire',
    subtitle: 'Calculez les intérêts sur votre dépôt bancaire en ligne',
  },
  lt: {
    title: 'Indėlio Skaičiuotuvas — Palūkanų Skaičiavimas Internete',
    description: 'Nemokamas indėlio skaičiuotuvas. Apskaičiuokite galutinę banko indėlio sumą su sudėtinėmis palūkanomis. Pasirinkite valiutą, normą ir terminą.',
    h1: 'Indėlio Skaičiuotuvas',
    subtitle: 'Apskaičiuokite indėlio palūkanas ir grąžą internetu',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our free deposit calculator shows exactly how your savings grow over time with compound interest. Enter the initial amount, annual interest rate and term — choose compounding frequency (monthly, quarterly, annually or none) to instantly see the final balance, total interest earned, and a detailed year-by-year breakdown.\n\nCompound interest is the most powerful driver of savings growth: interest earned each period is added to the principal, so subsequent interest is calculated on a larger balance. The longer the term and the higher the rate, the greater the gap between compound and simple interest. Use this calculator to compare scenarios before opening a bank deposit.',
    faqTitle: 'Frequently Asked Questions about Deposit Calculators',
    faqs: [
      {
        q: 'What is compound interest (compounding)?',
        a: 'Compounding means the interest earned each period is added to the principal, so future interest is calculated on a larger balance. For example, with monthly compounding at 12% per year, each month earns 1% on the growing total — resulting in an effective annual return of about 12.68%, not just 12%.',
      },
      {
        q: 'What is the difference between simple and compound interest?',
        a: 'Simple interest is calculated only on the original principal: Interest = Principal × Rate × Time. Compound interest is calculated on the growing balance (principal + accumulated interest). Over long terms, the difference is substantial — for example, €10,000 at 8% over 10 years gives €8,000 with simple interest but €11,589 with annual compounding.',
      },
      {
        q: 'Which compounding frequency gives the highest return?',
        a: 'The more frequently interest compounds, the higher the final amount: daily > monthly > quarterly > annually > no compounding. In practice, the difference between monthly and daily compounding is minimal, but monthly vs. annual compounding can add up significantly over 5+ years.',
      },
      {
        q: 'How is the final deposit amount calculated?',
        a: 'Compound interest formula: S = P × (1 + r/n)^(n×t), where P is the initial amount, r is the annual rate (as a decimal), n is the number of compounding periods per year, and t is the term in years. For simple interest: S = P × (1 + r × t).',
      },
      {
        q: 'What is the effective annual rate (EAR)?',
        a: 'The effective annual rate accounts for compounding within a year: EAR = (1 + r/n)ⁿ − 1. For example, a 12% nominal rate compounded monthly gives an EAR of about 12.68%. Banks must disclose the EAR so you can compare products fairly.',
      },
      {
        q: 'Is a deposit with compounding better than one without?',
        a: 'Almost always yes, especially over longer terms. Without compounding, you earn interest only on the original amount. With monthly compounding at 6% over 5 years, €10,000 grows to about €13,489 — compared to €13,000 with simple interest. The difference grows larger with time.',
      },
      {
        q: 'How long should a deposit term be?',
        a: 'Longer terms generally yield more due to compounding, but lock up your funds. The optimal term depends on your goals: for an emergency fund, choose a short-term or demand deposit. For long-term savings, a 1–3 year fixed deposit with monthly compounding typically offers the best balance of rate and flexibility.',
      },
      {
        q: 'Does inflation affect my deposit returns?',
        a: 'Yes. If your deposit rate is lower than inflation, your real purchasing power decreases even as the nominal balance grows. To compare, subtract the inflation rate from your deposit rate — the result is your approximate real return. Always consider inflation when evaluating savings options.',
      },
      {
        q: 'Does the calculator include tax on interest income?',
        a: 'No, the calculator shows gross returns before tax. Interest income is taxable in most countries. Consult your bank or a tax adviser for the applicable rates in your country.',
      },
      {
        q: 'Can I use this calculator for any currency?',
        a: 'Yes. The calculator supports RUB, USD, EUR, UAH and PLN. The calculation logic is identical for all currencies — only the display symbol changes. Select your preferred currency in the initial deposit field.',
      },
    ],
  },
  ru: {
    description: 'Онлайн-калькулятор вклада позволяет быстро рассчитать доход по банковскому депозиту с учётом капитализации процентов. Введите начальную сумму, % годовых и срок — выберите периодичность начисления (ежемесячная, ежеквартальная, ежегодная или без неё) и мгновенно получите итоговый баланс, сумму дохода и разбивку по периодам. Подходит как для срочных вкладов, так и для накопительных счетов.\n\nКапитализация процентов — главный инструмент роста вклада: начисленные за период проценты прибавляются к телу вклада, и уже следующий период считается от большей базы. Чем выше ставка и длиннее срок, тем значительнее разрыв между вкладом с капитализацией и без неё. Используйте калькулятор, чтобы сравнить предложения банков по ставкам и выбрать оптимальный вклад под свои цели.',
    faqTitle: 'Часто задаваемые вопросы о вкладах и депозитах',
    faqs: [
      {
        q: 'Что такое капитализация процентов по вкладу?',
        a: 'Капитализация — это начисление процентов на уже накопленные проценты. Например, при ежемесячной капитализации под 12% годовых каждый месяц на счёт начисляется 1% от текущего остатка, а не только от первоначальной суммы. Это даёт больший итоговый доход по сравнению с простыми процентами.',
      },
      {
        q: 'Чем простые проценты отличаются от сложных?',
        a: 'Простые проценты начисляются только на первоначальную сумму: Доход = Сумма × Ставка × Время. Сложные проценты начисляются на постоянно растущий остаток. Например, 100 000 ₽ под 10% на 10 лет дадут 100 000 ₽ дохода при простых процентах и 159 374 ₽ — при ежегодной капитализации.',
      },
      {
        q: 'Какая периодичность капитализации выгоднее?',
        a: 'Чем чаще капитализация, тем выше итоговая сумма: ежемесячная выгоднее ежеквартальной, та — выгоднее ежегодной. На коротких сроках (1 год) разница невелика, но при вкладах от 3–5 лет она становится существенной.',
      },
      {
        q: 'Как рассчитывается итоговая сумма вклада?',
        a: 'Формула сложных процентов: S = P × (1 + r/n)^(n×t), где P — начальная сумма вклада, r — годовая процентная ставка (дробью), n — количество капитализаций в год, t — срок в годах. Для простых процентов: S = P × (1 + r × t). Наш калькулятор применяет обе формулы и показывает разницу.',
      },
      {
        q: 'Что такое эффективная процентная ставка?',
        a: 'Эффективная ставка учитывает капитализацию: ЭПС = (1 + r/n)ⁿ − 1. Например, вклад под 12% с ежемесячной капитализацией имеет эффективную ставку около 12,68% годовых. Именно эффективную ставку стоит сравнивать при выборе между предложениями банков.',
      },
      {
        q: 'Чем срочный вклад отличается от накопительного счёта?',
        a: 'Срочный вклад открывается на фиксированный срок (обычно 1–36 месяцев) по фиксированной ставке — досрочное снятие, как правило, ведёт к потере начисленных процентов. Накопительный счёт даёт гибкость: можно пополнять и снимать без ограничений, но ставка ниже и банк вправе её изменить в любой момент. Калькулятор подходит для обоих продуктов — просто введите ожидаемую ставку и срок размещения.',
      },
      {
        q: 'Вклад с капитализацией или без — что выгоднее?',
        a: 'Вклад с капитализацией почти всегда выгоднее, особенно на длинных сроках. При 8% годовых на 5 лет: 100 000 ₽ без капитализации дадут 40 000 ₽ дохода, с ежемесячной капитализацией — около 48 985 ₽. Разница растёт с каждым годом.',
      },
      {
        q: 'На какой срок лучше открывать вклад?',
        a: 'Более длинный срок даёт больший доход за счёт капитализации, но замораживает средства. Для подушки безопасности выбирайте вклад до востребования или краткосрочный. Для накоплений — срочный вклад на 1–3 года с ежемесячной капитализацией, как правило, оптимален по соотношению ставки и гибкости.',
      },
      {
        q: 'Влияет ли инфляция на доходность вклада?',
        a: 'Да. Если ставка по вкладу ниже инфляции, реальная покупательная способность ваших сбережений снижается — даже при росте номинального баланса. Реальная доходность ≈ ставка по вкладу минус инфляция. Учитывайте инфляцию при выборе инструмента для накоплений.',
      },
      {
        q: 'Учитывает ли калькулятор налог на доход по вкладу?',
        a: 'Нет, калькулятор показывает доход до налогообложения. В России действует налог на процентный доход по вкладам сверх необлагаемого минимума (ключевая ставка ЦБ × 1 млн ₽). Уточняйте актуальные условия в вашем банке или налоговой инспекции.',
      },
      {
        q: 'Насколько безопасны банковские вклады?',
        a: 'В России вклады застрахованы АСВ (Агентство по страхованию вкладов) на сумму до 1,4 млн ₽ на человека в одном банке. Для крупных сумм распределяйте средства между несколькими банками с государственной лицензией.',
      },
    ],
  },
  uk: {
    description: 'Безкоштовний калькулятор вкладу показує, як саме зростають ваші заощадження завдяки капіталізації відсотків. Введіть початкову суму, річну ставку та строк — оберіть частоту капіталізації (щомісячна, щоквартальна, щорічна або без неї) і отримайте підсумковий баланс, суму доходу та детальне розбиття по періодах.\n\nКапіталізація відсотків — головний інструмент зростання вкладу: відсотки кожного періоду додаються до основної суми, і наступного разу нараховуються вже на більшу базу. Що довший строк і вища ставка, то суттєвіша різниця між вкладом із капіталізацією та простими відсотками. Використовуйте калькулятор для порівняння пропозицій банків перед відкриттям рахунку.',
    faqTitle: 'Часті запитання про вклади та депозити',
    faqs: [
      {
        q: 'Що таке капіталізація відсотків за вкладом?',
        a: 'Капіталізація — це нарахування відсотків на вже накопичені відсотки. Наприклад, при щомісячній капіталізації під 12% річних щомісяця нараховується 1% від поточного залишку, а не лише від початкової суми. Це дає більший підсумковий дохід порівняно з простими відсотками.',
      },
      {
        q: 'Чим прості відсотки відрізняються від складних?',
        a: 'Прості відсотки нараховуються лише на початкову суму: Дохід = Сума × Ставка × Час. Складні відсотки нараховуються на зростаючий залишок. Наприклад, 100 000 ₴ під 10% на 10 років дадуть 100 000 ₴ доходу при простих відсотках і 159 374 ₴ — при щорічній капіталізації.',
      },
      {
        q: 'Яка частота капіталізації вигідніша?',
        a: 'Що частіша капіталізація, то вища підсумкова сума: щомісячна вигідніша за щоквартальну, а щоквартальна — за щорічну. На коротких строках різниця мінімальна, але при строках від 3–5 років вона стає помітною.',
      },
      {
        q: 'Як розраховується підсумкова сума вкладу?',
        a: 'Формула складних відсотків: S = P × (1 + r/n)^(n×t), де P — початкова сума, r — річна ставка (дробом), n — кількість капіталізацій на рік, t — строк у роках. Для простих відсотків: S = P × (1 + r × t).',
      },
      {
        q: 'Що таке ефективна відсоткова ставка?',
        a: 'Ефективна ставка враховує капіталізацію: ЕВС = (1 + r/n)ⁿ − 1. Наприклад, вклад під 12% зі щомісячною капіталізацією має ефективну ставку близько 12,68% річних. Саме ефективну ставку варто порівнювати при виборі між пропозиціями банків.',
      },
      {
        q: 'Вклад із капіталізацією чи без — що вигідніше?',
        a: 'Вклад із капіталізацією майже завжди вигідніший, особливо на довгих строках. При 8% річних на 5 років: 100 000 ₴ без капіталізації дадуть 40 000 ₴ доходу, зі щомісячною капіталізацією — близько 48 985 ₴. Різниця зростає з кожним роком.',
      },
      {
        q: 'На який строк краще відкривати вклад?',
        a: 'Довший строк дає більший дохід завдяки капіталізації, але заморожує кошти. Для подушки безпеки обирайте вклад до запитання або короткостроковий. Для накопичень — строковий вклад на 1–3 роки зі щомісячною капіталізацією, як правило, оптимальний за співвідношенням ставки та гнучкості.',
      },
      {
        q: 'Чи впливає інфляція на дохідність вкладу?',
        a: 'Так. Якщо ставка за вкладом нижча за інфляцію, реальна купівельна спроможність заощаджень зменшується — навіть попри зростання номінального балансу. Реальна дохідність ≈ ставка за вкладом мінус інфляція. Враховуйте інфляцію при виборі інструменту для накопичень.',
      },
      {
        q: 'Чи враховує калькулятор податок на дохід від вкладу?',
        a: 'Ні, калькулятор показує дохід до оподаткування. В Україні відсотки за вкладами оподатковуються ПДФО (18%) та військовим збором. Уточнюйте актуальні умови у вашому банку або податковій службі.',
      },
      {
        q: 'Наскільки безпечні банківські вклади в Україні?',
        a: 'В Україні вклади фізичних осіб застраховані Фондом гарантування вкладів (ФГВФО) на суму до 600 000 ₴ на одну особу в одному банку. Для великих сум розподіляйте кошти між кількома банками з ліцензією НБУ.',
      },
    ],
  },
  fr: {
    description: "Notre simulateur de dépôt bancaire gratuit montre précisément comment votre épargne fructifie grâce aux intérêts composés. Entrez le montant initial, le taux annuel et la durée — choisissez la fréquence de capitalisation (mensuelle, trimestrielle, annuelle ou sans) pour voir le solde final, les intérêts gagnés et la progression année par année.\n\nLes intérêts composés sont le principal moteur de la croissance de l'épargne : les intérêts de chaque période s'ajoutent au capital, et les intérêts suivants sont calculés sur un solde plus élevé. Plus la durée est longue et le taux élevé, plus l'écart avec les intérêts simples est significatif. Utilisez ce simulateur pour comparer les offres bancaires avant d'ouvrir un compte.",
    faqTitle: "Questions fréquentes sur les dépôts et l'épargne",
    faqs: [
      {
        q: "Qu'est-ce que la capitalisation des intérêts ?",
        a: "La capitalisation signifie que les intérêts gagnés chaque période sont ajoutés au capital, de sorte que les intérêts futurs sont calculés sur un solde plus élevé. Avec une capitalisation mensuelle à 12 % par an, chaque mois rapporte 1 % sur le total croissant — soit un rendement effectif annuel d'environ 12,68 %.",
      },
      {
        q: 'Quelle est la différence entre intérêts simples et composés ?',
        a: "Les intérêts simples sont calculés uniquement sur le capital initial : Intérêts = Capital × Taux × Temps. Les intérêts composés s'appliquent sur le solde croissant. Par exemple, 10 000 € à 8 % sur 10 ans donnent 8 000 € avec des intérêts simples, mais 11 589 € avec une capitalisation annuelle.",
      },
      {
        q: 'Quelle fréquence de capitalisation est la plus rentable ?',
        a: "Plus la capitalisation est fréquente, plus le montant final est élevé : quotidienne > mensuelle > trimestrielle > annuelle > sans capitalisation. En pratique, la différence entre capitalisation mensuelle et quotidienne est minime, mais mensuelle vs annuelle sur 5 ans peut représenter plusieurs centaines d'euros.",
      },
      {
        q: 'Comment est calculé le montant final du dépôt ?',
        a: "Formule des intérêts composés : S = P × (1 + r/n)^(n×t), où P est le capital initial, r le taux annuel (en décimal), n le nombre de capitalisations par an et t la durée en années. Pour les intérêts simples : S = P × (1 + r × t).",
      },
      {
        q: "Qu'est-ce que le taux effectif annuel (TEA) ?",
        a: "Le TEA tient compte de la capitalisation : TEA = (1 + r/n)ⁿ − 1. Par exemple, un taux nominal de 12 % capitalisé mensuellement donne un TEA d'environ 12,68 %. C'est le TEA — et non le taux nominal — qu'il faut comparer pour évaluer des placements.",
      },
      {
        q: 'Un dépôt avec ou sans capitalisation — lequel est plus avantageux ?',
        a: "Presque toujours avec capitalisation, surtout sur le long terme. À 8 % sur 5 ans, 10 000 € sans capitalisation donnent 4 000 € d'intérêts, contre environ 4 898 € avec une capitalisation mensuelle. L'écart s'amplifie chaque année.",
      },
      {
        q: "Quelle durée choisir pour un dépôt à terme ?",
        a: "Une durée plus longue génère davantage grâce à la capitalisation, mais immobilise les fonds. Pour une épargne de précaution, choisissez un livret ou un dépôt à court terme. Pour des économies à long terme, un dépôt à terme de 1 à 3 ans avec capitalisation mensuelle offre généralement le meilleur équilibre entre taux et flexibilité.",
      },
      {
        q: "L'inflation affecte-t-elle le rendement réel de mon dépôt ?",
        a: "Oui. Si votre taux de dépôt est inférieur à l'inflation, votre pouvoir d'achat réel diminue malgré la croissance nominale du solde. Rendement réel ≈ taux du dépôt − taux d'inflation. Tenez compte de l'inflation pour choisir le bon instrument d'épargne.",
      },
      {
        q: 'La calculatrice tient-elle compte des impôts sur les intérêts ?',
        a: "Non, la calculatrice affiche les gains bruts avant impôts. En France, les intérêts sont soumis au prélèvement forfaitaire unique (PFU) de 30 % (12,8 % d'IR + 17,2 % de prélèvements sociaux). Les livrets réglementés (Livret A, LDDS) sont exonérés. Consultez votre banque ou un conseiller fiscal.",
      },
      {
        q: 'Les dépôts bancaires sont-ils sécurisés en France ?',
        a: "En France, les dépôts sont garantis par le Fonds de Garantie des Dépôts et de Résolution (FGDR) à hauteur de 100 000 € par personne et par établissement. Pour des montants supérieurs, répartissez vos fonds entre plusieurs banques agréées.",
      },
    ],
  },
  lt: {
    description: 'Nemokamas indėlio skaičiuotuvas tiksliai parodo, kaip auga jūsų santaupos dėl sudėtinių palūkanų. Įveskite pradinę sumą, metinę palūkanų normą ir terminą — pasirinkite kapitalizacijos dažnumą (mėnesinė, ketvirtinė, metinė arba be jos) ir iš karto gaukite galutinį balansą, uždirbtų palūkanų sumą ir išsamų periodų suskirstymą.\n\nPalūkanų kapitalizacija — pagrindinis santaupų augimo variklis: kiekvieno laikotarpio palūkanos pridedamos prie pagrindinės sumos, todėl kitu laikotarpiu palūkanos skaičiuojamos nuo didesnės bazės. Kuo ilgesnis terminas ir aukštesnė norma, tuo didesnis skirtumas tarp indėlio su kapitalizacija ir paprastų palūkanų. Naudokite skaičiuotuvą bankų pasiūlymams palyginti prieš atidarant sąskaitą.',
    faqTitle: 'Dažniausiai užduodami klausimai apie indėlius',
    faqs: [
      {
        q: 'Kas yra palūkanų kapitalizacija indėlyje?',
        a: 'Kapitalizacija reiškia, kad kiekvienu laikotarpiu uždirbtos palūkanos pridedamos prie pagrindinės sumos, todėl būsimos palūkanos skaičiuojamos nuo didesnio balanso. Esant mėnesinei kapitalizacijai ir 12 % metinei normai, kas mėnesį uždirbama 1 % nuo augančio balanso — tai daugiau nei paprastos palūkanos.',
      },
      {
        q: 'Kuo skiriasi paprastos ir sudėtinės palūkanos?',
        a: 'Paprastos palūkanos skaičiuojamos tik nuo pradinės sumos: Pajamos = Suma × Norma × Laikas. Sudėtinės palūkanos skaičiuojamos nuo augančio balanso. Pavyzdžiui, 10 000 € esant 10 % per 10 metų duos 10 000 € paprastų palūkanų, bet 15 937 € sudėtinių (metinė kapitalizacija).',
      },
      {
        q: 'Kuri kapitalizacijos dažnumo parinktis yra pelningiausia?',
        a: 'Kuo dažnesnė kapitalizacija, tuo didesnė galutinė suma: kasdienė > mėnesinė > ketvirtinė > metinė > be kapitalizacijos. Mėnesinės ir kasdienės kapitalizacijos skirtumas minimalus, tačiau mėnesinė vs metinė per 5+ metus gali sudaryti šimtus eurų.',
      },
      {
        q: 'Kaip apskaičiuojama galutinė indėlio suma?',
        a: 'Sudėtinių palūkanų formulė: S = P × (1 + r/n)^(n×t), kur P — pradinė suma, r — metinė norma (dešimtaine forma), n — kapitalizacijų skaičius per metus, t — terminas metais. Paprastoms palūkanoms: S = P × (1 + r × t).',
      },
      {
        q: 'Kas yra efektyvioji metinė norma (EMN)?',
        a: 'EMN atsižvelgia į kapitalizaciją: EMN = (1 + r/n)ⁿ − 1. Pavyzdžiui, 12 % nominalioji norma su mėnesine kapitalizacija duoda EMN apie 12,68 %. Būtent EMN, o ne nominalioji norma, leidžia teisingai lyginti skirtingus indėlių pasiūlymus.',
      },
      {
        q: 'Indėlis su kapitalizacija ar be — kuris naudingesnis?',
        a: 'Beveik visada su kapitalizacija, ypač ilgiems terminams. Esant 8 % per 5 metus, 10 000 € be kapitalizacijos duos 4 000 € palūkanų, o su mėnesine kapitalizacija — apie 4 898 €. Skirtumas kasmet didėja.',
      },
      {
        q: 'Kokiam terminui geriausia atidaryti indėlį?',
        a: 'Ilgesnis terminas duoda daugiau dėl kapitalizacijos, tačiau įšaldo lėšas. Avariniam fondui rinkitės pareikalavimo ar trumpalaikį indėlį. Ilgalaikėms santaupoms — 1–3 metų terminuotas indėlis su mėnesine kapitalizacija paprastai siūlo geriausią normos ir lankstumo balansą.',
      },
      {
        q: 'Ar infliacija veikia indėlio realią grąžą?',
        a: 'Taip. Jei indėlio norma žemesnė už infliaciją, realus perkamosios galios sumažėjimas vyksta net nominaliam balansui augant. Reali grąža ≈ indėlio norma − infliacijos norma. Renkantis taupymo priemonę, atsižvelkite į infliaciją.',
      },
      {
        q: 'Ar skaičiuotuvas atsižvelgia į pajamų mokestį?',
        a: 'Ne, skaičiuotuvas rodo pajamas prieš apmokestinimą. Lietuvoje palūkanų pajamos apmokestinamos gyventojų pajamų mokesčiu. Tikslios mokesčių sąlygos — kreipkitės į savo banką arba mokesčių konsultantą.',
      },
      {
        q: 'Ar bankiniai indėliai Lietuvoje yra saugūs?',
        a: 'Taip. Lietuvoje indėliai draudžiami Indėlių ir investicijų draudimo įstaigos (IIDI) iki 100 000 € vienam asmeniui vienoje įstaigoje, pagal ES direktyvą. Didesnėms sumoms paskirstykite lėšas tarp kelių licencijuotų bankų.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/deposit', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DepositPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/deposit`,
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
        <DepositCalculator locale={locale} />

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
