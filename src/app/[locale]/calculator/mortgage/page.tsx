import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import MortgageCalculator from './MortgageCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string>>;
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/loan', label: 'Loan Calculator' }, { href: '/calculator/deposit', label: 'Deposit Calculator' }, { href: '/calculator/rent-vs-buy', label: 'Rent vs Buy' }, { href: '/calculator/property-tax', label: 'Property Tax Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }],
  ru: [{ href: '/calculator/loan', label: 'Калькулятор кредита' }, { href: '/calculator/deposit', label: 'Калькулятор депозита' }, { href: '/calculator/rent-vs-buy', label: 'Аренда vs Покупка' }, { href: '/calculator/property-tax', label: 'Налог на недвижимость' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }],
  uk: [{ href: '/calculator/loan', label: 'Калькулятор кредиту' }, { href: '/calculator/deposit', label: 'Калькулятор депозиту' }, { href: '/calculator/rent-vs-buy', label: 'Оренда vs Купівля' }, { href: '/calculator/property-tax', label: 'Податок на нерухомість' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }],
  fr: [{ href: '/calculator/loan', label: 'Calculatrice de prêt' }, { href: '/calculator/deposit', label: 'Calculatrice de dépôt' }, { href: '/calculator/rent-vs-buy', label: 'Louer vs Acheter' }, { href: '/calculator/property-tax', label: 'Taxe foncière' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }],
  lt: [{ href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }, { href: '/calculator/deposit', label: 'Indėlio skaičiuotuvas' }, { href: '/calculator/rent-vs-buy', label: 'Nuoma vs Pirkimas' }, { href: '/calculator/property-tax', label: 'Nekilnojamojo turto mokestis' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Mortgage Calculator — Monthly Payment & Total Cost',
    description: 'Free mortgage calculator online. Calculate your monthly payment, total cost, and interest for any loan amount, rate, and term.',
    h1: 'Mortgage Calculator',
    subtitle: 'Calculate monthly mortgage payments and total cost',
  },
  ru: {
    title: 'Ипотечный калькулятор — ежемесячный платёж онлайн',
    description: 'Бесплатный ипотечный калькулятор онлайн. Рассчитайте ежемесячный платёж, переплату и полную стоимость кредита.',
    h1: 'Ипотечный калькулятор',
    subtitle: 'Рассчитайте ежемесячный платёж по ипотеке онлайн',
  },
  uk: {
    title: 'Іпотечний калькулятор — щомісячний платіж онлайн',
    description: 'Безкоштовний іпотечний калькулятор онлайн. Розрахуйте щомісячний платіж, переплату та повну вартість кредиту.',
    h1: 'Іпотечний калькулятор',
    subtitle: 'Розрахуйте щомісячний платіж по іпотеці онлайн',
  },
  fr: {
    title: 'Calculatrice de Prêt Immobilier — Mensualité en ligne',
    description: 'Calculatrice de prêt immobilier gratuite. Calculez vos mensualités, le coût total et les intérêts pour votre crédit immobilier.',
    h1: 'Calculatrice de Prêt Immobilier',
    subtitle: 'Calculez votre mensualité d\'emprunt immobilier en ligne',
  },
  lt: {
    title: 'Hipotekos Skaičiuotuvas — mėnesio įmoka internetu',
    description: 'Nemokamas hipotekos skaičiuotuvas internetu. Apskaičiuokite mėnesio įmoką, palūkanas ir bendrą paskolos sumą.',
    h1: 'Hipotekos Skaičiuotuvas',
    subtitle: 'Apskaičiuokite mėnesinę hipotekos įmoką internetu',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Use our free mortgage calculator to estimate your monthly payment based on the loan amount, interest rate, and loan term. Enter your figures to instantly see your monthly payment, total repayment, and total interest paid over the life of the loan — no sign-up required.\n\nAll payments are calculated using the annuity (equal-payment) method — the most common repayment structure in the UK, US, EU, and most other countries. Each payment covers interest on the outstanding balance plus a portion of principal, so the interest share decreases and the principal share increases over time. This calculator does not include additional costs such as property insurance, mortgage insurance (PMI/MIG), or origination fees.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is the monthly mortgage payment calculated?', a: 'The monthly payment uses the annuity formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments.' },
      { q: 'What does the total interest figure mean?', a: 'Total interest is the difference between the total amount you repay and the original loan amount. For example, a £200,000 mortgage at 5% over 25 years results in roughly £175,000 in total interest — meaning you repay nearly double the original loan.' },
      { q: 'Does the calculator include insurance or fees?', a: 'No. This calculator shows only principal and interest. Additional costs — such as homeowner\'s insurance, property tax, mortgage insurance (PMI/MIG), and lender fees — are not included and should be budgeted separately.' },
      { q: 'What is the difference between annuity and differentiated payments?', a: 'Annuity payments are equal throughout the term — easier to budget. Differentiated payments are higher at first and decrease over time, resulting in less total interest. Most banks in the UK, US, France, and Lithuania offer annuity. Russia and Ukraine often offer both.' },
      { q: 'How does the interest rate affect monthly payments?', a: 'Even a 1% rate difference has a significant effect. On a £200,000 / 25-year mortgage: at 4% the payment is ~£1,056/month; at 5% it\'s ~£1,169; at 6% it\'s ~£1,289. That\'s a £233/month difference between 4% and 6%.' },
      { q: 'Should I choose a shorter or longer loan term?', a: 'A shorter term means higher monthly payments but much less total interest. A longer term reduces the monthly burden but costs significantly more overall. For example, a £200,000 loan at 5%: over 15 years the monthly payment is ~£1,582 and total interest ~£84,800; over 30 years the payment drops to ~£1,074 but total interest rises to ~£186,500.' },
      { q: 'What is LTV (loan-to-value)?', a: 'LTV is the loan amount as a percentage of the property value. For example, buying a £250,000 home with a £200,000 mortgage gives an LTV of 80%. Lower LTV means less risk for the lender, which typically results in better (lower) interest rates. Most lenders prefer LTV below 80%.' },
      { q: 'What happens if I make overpayments?', a: 'Overpayments reduce your outstanding balance faster, which means you pay less total interest and can pay off the mortgage earlier. Many mortgages allow overpayments of up to 10% of the outstanding balance per year without early repayment charges. Check your mortgage agreement for terms.' },
      { q: 'What is a good mortgage interest rate?', a: 'A "good" rate depends on the country, market conditions, and your credit profile. In 2024–2025: UK fixed rates are around 4–5%, US 30-year fixed around 6–7%, France around 3.5–4%, Ukraine around 10–14%. The best way to compare is always by APR (Annual Percentage Rate), which includes all fees.' },
      { q: 'Can I use this calculator for any currency?', a: 'Yes. The annuity formula works identically for any currency — just enter your amount in the currency you need. The result will be in the same currency.' },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным ипотечным калькулятором, чтобы рассчитать ежемесячный платёж по ипотеке. Введите сумму кредита, процентную ставку и срок — и сразу получите ежемесячный платёж, общую сумму выплат и переплату за весь срок кредита.\n\nРасчёт ведётся по формуле аннуитетных платежей — наиболее распространённой схеме в России, Украине, Казахстане и Европе. Каждый платёж включает часть процентов (начисляемых на остаток долга) и часть основного долга, поэтому доля процентов со временем снижается. Страховка, комиссии и налог на имущество в расчёт не включены.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается ежемесячный платёж?', a: 'Ежемесячный платёж рассчитывается по формуле аннуитета: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], где P — сумма кредита, r — месячная ставка (годовая ÷ 12), n — количество платежей.' },
      { q: 'Что такое переплата?', a: 'Переплата — разница между суммой всех выплат и первоначальной суммой кредита. Например, ипотека на 5 млн ₽ под 10% на 20 лет даст переплату около 6,5 млн ₽ — то есть в итоге выплачивается более чем в 2 раза больше суммы кредита.' },
      { q: 'Учитывается ли страховка в расчёте?', a: 'Нет. Калькулятор рассчитывает только основной долг и проценты. Обязательное страхование (имущество, жизнь, ответственность), оценка, комиссии и другие расходы в расчёт не включены. Суммируйте их отдельно.' },
      { q: 'В чём разница между аннуитетным и дифференцированным платежом?', a: 'Аннуитетный платёж одинаков на протяжении всего срока — удобно для бюджетирования. Дифференцированный — убывает со временем, но изначально выше. Дифференцированная схема выгоднее по итоговой переплате, но нагрузка в первые годы больше. Большинство российских банков предлагают оба варианта.' },
      { q: 'Как ставка влияет на ежемесячный платёж?', a: 'Разница в 1% ощутимо меняет платёж. По ипотеке 5 млн ₽ на 20 лет: при ставке 10% платёж — 48 250 ₽, при 11% — 51 610 ₽, при 12% — 55 050 ₽. Разница между 10% и 12% составляет ~6 800 ₽ в месяц.' },
      { q: 'Что выгоднее — короткий или длинный срок?', a: 'Короткий срок — выше платёж, но значительно меньше переплата. Длинный срок снижает ежемесячную нагрузку, но увеличивает итоговые расходы. Пример: 5 млн ₽ под 10% на 10 лет: платёж ~66 075 ₽, переплата ~2,9 млн ₽. На 25 лет: платёж ~45 435 ₽, переплата ~8,6 млн ₽.' },
      { q: 'Что такое LTV (соотношение кредита к стоимости)?', a: 'LTV (loan-to-value) — это сумма кредита, делённая на стоимость недвижимости, в процентах. Например, квартира стоит 7 млн ₽, ипотека 5 млн ₽ — LTV 71%. Чем ниже LTV, тем ниже риск для банка и тем выгоднее ставка. Большинство банков предпочитают LTV ≤ 80%.' },
      { q: 'Что будет, если вносить досрочные платежи?', a: 'Досрочные выплаты уменьшают остаток долга, что снижает итоговую переплату и сокращает срок ипотеки. По закону вы вправе досрочно погасить ипотеку полностью или частично в любое время — банк не может взимать штрафы. При частичном погашении выгоднее сокращать срок, а не платёж.' },
      { q: 'Какой процент по ипотеке считается хорошим?', a: 'Зависит от рынка и вашего профиля заёмщика. В России в 2024–2025 гг.: льготная ипотека 8%, рыночная — 14–18%. На вторичном рынке ставки выше. Для сравнения всегда используйте ПСК (полная стоимость кредита) — она включает все комиссии.' },
      { q: 'Можно ли использовать калькулятор для любой валюты?', a: 'Да. Формула аннуитета работает одинаково для любой валюты. Просто введите сумму в нужной вам валюте — результат будет в той же валюте.' },
    ],
  },
  uk: {
    description: 'Скористайтесь безкоштовним іпотечним калькулятором для розрахунку щомісячного платежу. Введіть суму кредиту, відсоткову ставку та строк — і одразу отримайте щомісячний платіж, загальну суму виплат і переплату за весь строк.\n\nРозрахунок виконується за формулою ануїтетних платежів — найпоширенішою схемою в Україні, Польщі та Євросоюзі. Кожен платіж містить частину відсотків (нарахованих на залишок боргу) та частину основного боргу. Страхування, комісії та податки до розрахунку не входять.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується щомісячний платіж?', a: 'Щомісячний платіж розраховується за формулою ануїтету: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], де P — сума кредиту, r — місячна ставка (річна ÷ 12), n — кількість платежів.' },
      { q: 'Що таке переплата?', a: 'Переплата — різниця між загальною сумою всіх платежів і початковою сумою кредиту. Наприклад, іпотека на 3 млн грн під 15% на 20 років дасть переплату понад 5 млн грн.' },
      { q: 'Чи враховується страховка?', a: 'Ні. Калькулятор розраховує лише основний борг і відсотки. Страхування нерухомості та життя, комісії та оцінка — це окремі витрати, які потрібно додати самостійно.' },
      { q: 'У чому різниця між ануїтетним і диференційованим платежем?', a: 'Ануїтетний платіж однаковий протягом усього строку — зручно для планування. Диференційований — зменшується з часом, але спочатку вищий. Диференційована схема вигідніша за підсумковою переплатою. Більшість українських банків пропонують обидва варіанти.' },
      { q: 'Як ставка впливає на щомісячний платіж?', a: 'Різниця в 1% суттєво змінює платіж. По кредиту 3 млн грн на 20 років: при ставці 15% — 39 610 грн/міс, при 16% — 41 700 грн/міс, при 17% — 43 810 грн/міс.' },
      { q: 'Що вигідніше — короткий чи довгий строк?', a: 'Короткий строк — вищий платіж, але значно менша переплата. Довгий строк знижує щомісячне навантаження, але збільшує загальні витрати. Обирайте строк, за якого платіж не перевищує 30–35% доходу.' },
      { q: 'Що таке LTV?', a: 'LTV (loan-to-value) — співвідношення суми кредиту до вартості нерухомості у відсотках. Наприклад, квартира 4 млн грн, кредит 3 млн грн — LTV 75%. Що нижчий LTV, то нижча ставка і вищі шанси схвалення.' },
      { q: 'Що відбувається при достроковому погашенні?', a: 'Дострокові внески зменшують залишок боргу і скорочують переплату. В Україні банки зобов\'язані дозволяти дострокове погашення без штрафів. При частковому погашенні вигідніше скорочувати строк кредиту, а не суму платежу.' },
      { q: 'Який відсоток за іпотекою вважається хорошим?', a: 'В Україні в 2024–2025 рр. ринкові ставки за іпотекою — 15–22%, за держпрограмами (єОселя) — 7%. Для порівняння пропозицій орієнтуйтеся на повну вартість кредиту (ПВК), яка враховує всі комісії.' },
      { q: 'Чи можна використовувати калькулятор для будь-якої валюти?', a: 'Так. Формула ануїтету однакова для будь-якої валюти. Просто введіть суму у потрібній валюті.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice de prêt immobilier gratuite pour estimer vos mensualités. Entrez le montant emprunté, le taux d\'intérêt et la durée — et obtenez instantanément votre mensualité, le montant total remboursé et le coût total des intérêts.\n\nLe calcul utilise la formule d\'amortissement à mensualités constantes, la méthode standard en France pour les crédits immobiliers. Chaque mensualité couvre les intérêts sur le capital restant dû et une fraction de capital — la part d\'intérêts diminue progressivement. L\'assurance emprunteur, les frais de dossier et la garantie ne sont pas inclus dans ce calcul.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment est calculée la mensualité ?', a: 'La mensualité est calculée avec la formule d\'amortissement : M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], où P est le capital emprunté, r le taux mensuel (taux annuel ÷ 12) et n le nombre de mensualités.' },
      { q: 'Que signifie le coût total des intérêts ?', a: 'C\'est la différence entre le total remboursé et le capital initialement emprunté. Par exemple, pour un prêt de 200 000 € à 4 % sur 20 ans, le coût total des intérêts est d\'environ 87 000 € — soit 44 % du capital emprunté.' },
      { q: 'L\'assurance emprunteur est-elle incluse ?', a: 'Non. Cette calculatrice n\'inclut que le capital et les intérêts. L\'assurance emprunteur (obligatoire en France) représente généralement 0,1 à 0,4 % du capital par an. Elle doit être ajoutée séparément pour connaître le coût total réel.' },
      { q: 'Quelle est la différence entre taux nominal et TAEG ?', a: 'Le taux nominal (ou taux débiteur) est le taux d\'intérêt pur du prêt. Le TAEG (Taux Annuel Effectif Global) inclut tous les frais obligatoires : intérêts, frais de dossier, garantie, et parfois assurance. Comparez toujours les offres sur la base du TAEG.' },
      { q: 'Quel taux immobilier est considéré comme bon en France ?', a: 'En 2024–2025, les taux immobiliers en France sont autour de 3,5 à 4,5 % selon la durée et le profil emprunteur. Les taux sur 15 ans sont inférieurs à ceux sur 25 ans. Un bon dossier (apport ≥ 10 %, revenus stables) permet d\'obtenir les taux les plus bas.' },
      { q: 'Faut-il choisir une durée courte ou longue ?', a: 'Une durée courte signifie des mensualités plus élevées mais beaucoup moins d\'intérêts. Une durée longue allège les mensualités mais coûte nettement plus cher. Exemple : 200 000 € à 4 % — sur 15 ans : 1 479 €/mois, coût total 66 220 €. Sur 25 ans : 1 056 €/mois, coût total 116 800 €.' },
      { q: 'Qu\'est-ce que le ratio LTV (quotité de financement) ?', a: 'Le LTV (Loan-to-Value) est le rapport entre le montant du prêt et la valeur du bien. En France on parle de « quotité de financement ». Exemple : bien à 300 000 €, apport de 60 000 €, prêt de 240 000 € → LTV 80 %. Les banques françaises exigent généralement un apport de 10 à 20 % (LTV ≤ 80–90 %).' },
      { q: 'Peut-on rembourser le prêt par anticipation ?', a: 'Oui. En France, tout emprunteur peut effectuer un remboursement anticipé à tout moment. Les indemnités de remboursement anticipé (IRA) sont plafonnées par la loi à 3 % du capital restant dû ou à 6 mois d\'intérêts. Vérifiez les conditions dans votre contrat.' },
      { q: 'Combien peut-on emprunter pour un prêt immobilier en France ?', a: 'Le Haut Conseil de Stabilité Financière (HCSF) impose un taux d\'endettement maximal de 35 % des revenus nets. Par exemple, pour des revenus nets de 4 000 €/mois, la mensualité maximale est de 1 400 €. La durée maximale est de 25 ans (27 ans pour les logements en VEFA).' },
      { q: 'Puis-je utiliser cette calculatrice pour toute devise ?', a: 'Oui. La formule d\'amortissement est universelle. Entrez simplement votre montant dans la devise souhaitée.' },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą hipotekos skaičiuotuvą, kad apskaičiuotumėte mėnesio įmoką pagal paskolos sumą, palūkanų normą ir terminą. Įveskite duomenis ir iš karto gaukite mėnesio įmoką, bendrą grąžinamą sumą ir bendrą palūkanų sumą.\n\nSkaičiavimas atliekamas pagal anuiteto (lygių mokėjimų) formulę — labiausiai paplitusią hipotekos grąžinimo schemą Lietuvoje ir ES. Kiekvienoje įmokoje yra palūkanų dalis (skaičiuojama nuo likusios skolos) ir pagrindinės skolos dalis. Draudimo, komisinių ir turto mokesčio skaičiuotuvas neapima.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojama mėnesio įmoka?', a: 'Mėnesio įmoka apskaičiuojama pagal anuiteto formulę: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ–1], kur P — paskolos suma, r — mėnesinė norma (metinė ÷ 12), n — mokėjimų skaičius.' },
      { q: 'Ką reiškia bendra palūkanų suma?', a: 'Tai skirtumas tarp bendros grąžinamos sumos ir pradinės paskolos sumos. Pvz., 100 000 € paskola 4 % palūkanomis 20 metų duos apie 44 000 € bendrą palūkanų sumą.' },
      { q: 'Ar draudimas įtrauktas?', a: 'Ne. Skaičiuotuvas rodo tik pagrindinę skolą ir palūkanas. Turto draudimas, gyvybės draudimas ir kiti mokesčiai neįtraukti ir turi būti planuojami atskirai.' },
      { q: 'Koks yra skirtumas tarp anuiteto ir diferencijuotų mokėjimų?', a: 'Anuiteto mokėjimai vienodi per visą terminą — patogu planuoti biudžetą. Diferencijuoti mokėjimai iš pradžių didesni, bet mažėja laikui bėgant, todėl bendra palūkanų suma mažesnė. Lietuvos bankai dažniausiai siūlo anuitetą.' },
      { q: 'Kaip palūkanų norma veikia mėnesio įmoką?', a: 'Net 1 % skirtumas turi reikšmingą poveikį. 100 000 € paskolai 20 metų: 3 % — 555 €/mėn., 4 % — 606 €/mėn., 5 % — 660 €/mėn. Skirtumas tarp 3 % ir 5 % — 105 €/mėn. arba 25 200 € per visą laikotarpį.' },
      { q: 'Ar geriau rinktis trumpesnį ar ilgesnį terminą?', a: 'Trumpesnis terminas — didesnės įmokos, bet gerokai mažesnės bendros palūkanos. Ilgesnis terminas mažina mėnesinę naštą, bet padidina bendrą kainą. Rekomenduojama, kad hipotekos įmoka neviršytų 30–35 % mėnesinių pajamų.' },
      { q: 'Kas yra LTV (paskolos ir vertės santykis)?', a: 'LTV (Loan-to-Value) — paskolos sumos ir nekilnojamojo turto vertės santykis procentais. Pvz., būstas kainuoja 150 000 €, paskola 120 000 € — LTV 80 %. Kuo mažesnis LTV, tuo žemesnė palūkanų norma. Lietuvos bankai paprastai reikalauja ne mažiau kaip 10–15 % pradinio įnašo.' },
      { q: 'Kas nutinka atliekant išankstinį grąžinimą?', a: 'Išankstinis grąžinimas sumažina likusios skolos likutį, todėl mokama mažiau palūkanų. Lietuvoje bankai privalo leisti atlikti išankstinį grąžinimą. Papildomas mokestis už išankstinį grąžinimą negali viršyti 1 % likusios sumos.' },
      { q: 'Kokia palūkanų norma laikoma gera Lietuvoje?', a: 'Lietuvoje 2024–2025 m. hipotekos palūkanos — apie 4–6 % (kintamos, susietos su EURIBOR, plius banko marža 1–2 %). Fiksuotos normos 5 metams — apie 4–5 %. Visada lyginkite pagal BVKKMN (bendrąją vartojimo kredito kainos metinę normą).' },
      { q: 'Ar galiu naudoti skaičiuotuvą bet kuriai valiutai?', a: 'Taip. Anuiteto formulė vienoda visoms valiutoms. Tiesiog įveskite sumą norima valiuta.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return buildMetadata(locale, '/calculator/mortgage', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MortgagePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/mortgage`,
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
        <MortgageCalculator locale={locale} initialAmount={sp.amount} initialRate={sp.rate} initialTerm={sp.term} />

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
