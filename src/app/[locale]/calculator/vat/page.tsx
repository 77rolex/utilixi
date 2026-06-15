import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import VatCalculator from './VatCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/freelance-rate', label: 'Freelance Rate Calculator' }, { href: '/calculator/margin', label: 'Margin Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/discount', label: 'Discount Calculator' }],
  ru: [{ href: '/calculator/income-tax', label: 'Калькулятор НДФЛ' }, { href: '/calculator/salary', label: 'Калькулятор зарплаты' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/discount', label: 'Калькулятор скидки' }],
  uk: [{ href: '/calculator/income-tax', label: 'Калькулятор ПДФО' }, { href: '/calculator/salary', label: 'Калькулятор зарплати' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/discount', label: 'Калькулятор знижки' }],
  fr: [{ href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/freelance-rate', label: 'Taux freelance' }, { href: '/calculator/margin', label: 'Calculatrice marge' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/discount', label: 'Calculatrice de remise' }],
  lt: [{ href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' }, { href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'VAT Calculator — Add or Remove VAT Online Free',
    description: 'Free VAT calculator online. Add VAT to a net price or extract VAT from a gross amount in seconds. Supports 20+ countries with preset rates — UK, France, Germany, Belgium and more. Enter a custom rate for reduced VAT.',
    h1: 'VAT Calculator',
    subtitle: 'Add or remove VAT from any price instantly',
  },
  ru: {
    title: 'Калькулятор НДС онлайн — начислить и выделить НДС бесплатно',
    description: 'Бесплатный калькулятор НДС онлайн. Начислите НДС на сумму без НДС или выделите НДС из суммы с НДС. Ставки 20+ стран, включая Россию (20%), Украину (20%), Беларусь (20%) и Казахстан (12%).',
    h1: 'Калькулятор НДС',
    subtitle: 'Рассчитайте НДС онлайн — прибавить или вычесть',
  },
  uk: {
    title: 'Калькулятор ПДВ — Нарахувати або Виділити ПДВ онлайн',
    description: 'Розрахуйте ПДВ миттєво: нарахуйте 20% до суми без ПДВ або виділіть ПДВ із суми з ПДВ. Ставки України, Польщі, Литви та 20+ країн. Формула і результат одразу.',
    h1: 'Калькулятор ПДВ',
    subtitle: 'Розрахуйте ПДВ онлайн — додати або відняти',
  },
  fr: {
    title: 'Calculatrice TVA Gratuite — Calcul TVA France & Belgique en ligne',
    description: 'Calculatrice TVA gratuite en ligne. Calcul TVA instantané : ajoutez la TVA à un prix HT ou extrayez la TVA d\'un montant TTC. Taux France (20%), Belgique (21%), Suisse (8.1%) et 20+ pays. Simulateur TVA avec taux personnalisé.',
    h1: 'Calculatrice TVA',
    subtitle: 'Calculez la TVA en ligne — ajouter ou déduire',
  },
  lt: {
    title: 'PVM Skaičiuotuvas — Skaičiuoti PVM internetu nemokamai',
    description: 'Nemokamas PVM skaičiuotuvas internetu. Pridėkite PVM prie sumos arba išskirkite PVM iš bendros sumos. Lietuvos PVM 21%, taip pat 20+ šalių tarifo parinktys ir galimybė įvesti savo tarifą.',
    h1: 'PVM skaičiuotuvas',
    subtitle: 'Pridėkite arba atimkite PVM iš bet kurios kainos',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This free VAT calculator works in two modes: "Add VAT" calculates the gross (incl. VAT) price from a net amount, and "Extract VAT" separates the VAT portion from a gross price. Select your country to automatically load the standard VAT rate, or enter a custom rate for reduced VAT rates or other tax types. Results show the net amount, VAT amount, and gross total side by side.\n\nVAT rates vary significantly across countries — from 17% in Luxembourg to 27% in Hungary. Reduced rates apply to specific goods and services (food, medicine, books) in most countries. Use the custom rate field to calculate VAT at any rate, including zero-rated and exempt transactions.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How to add VAT to a net price?', a: 'Switch to "Add VAT" mode, enter the net (excl. VAT) amount and select your country. The calculator instantly shows the VAT amount and the total gross price. Formula: Gross = Net × (1 + VAT rate / 100). Example: £100 net at 20% VAT = £120 gross.' },
      { q: 'How to extract VAT from a gross price?', a: 'Switch to "Extract VAT" mode and enter the gross (incl. VAT) amount. The calculator shows the net price and the exact VAT portion. Formula: Net = Gross ÷ (1 + VAT rate / 100). Example: £120 gross at 20% VAT → £100 net + £20 VAT.' },
      { q: 'What is the VAT rate in the UK?', a: 'The standard UK VAT rate is 20%. The reduced rate is 5% (domestic energy, children\'s car seats, some health products). Zero-rated (0%) applies to most food, children\'s clothing, books and newspapers. Businesses with turnover above £90,000/year must register for VAT.' },
      { q: 'What are EU VAT rates by country?', a: 'EU standard VAT rates (2024): France 20%, Germany 19%, Belgium 21%, Netherlands 21%, Spain 21%, Italy 22%, Poland 23%, Sweden 25%, Denmark 25%, Hungary 27%, Luxembourg 17%, Lithuania/Latvia 21%, Estonia 22%. Switzerland (non-EU) uses 8.1% standard.' },
      { q: 'What is the difference between net and gross (excl. vs incl. VAT)?', a: 'Net price (excl. VAT, HT in French) is the price before tax. Gross price (incl. VAT, TTC) is the final price the customer pays. The difference is the VAT amount. On invoices, both figures are typically shown: the net amount, the VAT amount, and the total gross.' },
      { q: 'What is VAT and who pays it?', a: 'VAT (Value Added Tax) is an indirect consumption tax added to the price of goods and services. The end consumer bears the VAT cost, while registered businesses collect it on behalf of the government and remit it minus any input VAT they paid on their purchases (the "VAT chain"). In most countries VAT applies to most goods and services, with exemptions for financial services, healthcare, and education.' },
      { q: 'What are reduced VAT rates and when do they apply?', a: 'Most countries have reduced VAT rates for essential goods. In France: 5.5% on food, 10% on restaurants and hotels, 2.1% on prescription medicines. In the UK: 0% on food and children\'s clothing, 5% on energy. In Germany: 7% on food, books and public transport. Use the custom rate field to apply any reduced rate.' },
      { q: 'Can I use a custom VAT rate?', a: 'Yes. The "Custom rate" field lets you enter any rate — useful for reduced rates, zero-rated transactions, or calculating tax in countries not in the preset list. The custom rate overrides the country preset while keeping all other fields intact.' },
      { q: 'How to calculate VAT percentage from a total?', a: 'To find the VAT rate applied when you only have net and gross amounts: VAT rate = (Gross ÷ Net − 1) × 100. Example: net £83.33, gross £100 → (100 ÷ 83.33 − 1) × 100 = 20%. Our calculator does this automatically in "Extract VAT" mode.' },
      { q: 'Is VAT the same as sales tax?', a: 'No. VAT is charged at every stage of production and distribution, with businesses reclaiming VAT paid on inputs. Sales tax (used in the US) is only charged at the final point of sale to the consumer. VAT invoices show the tax explicitly; sales tax is typically added at the checkout. Most countries outside the US and some developing economies use VAT.' },
    ],
  },
  ru: {
    description: 'Бесплатный калькулятор НДС онлайн работает в двух режимах: «Начислить НДС» рассчитывает сумму с НДС из суммы без НДС, а «Выделить НДС» разбивает сумму с НДС на чистую сумму и отдельно НДС. Выберите страну для автоматической загрузки ставки или введите свою. Формулы расчёта отображаются в результате.\n\nНДС — косвенный налог, включённый в цену товара. В России стандартная ставка составляет 20%. Льготные ставки 10% и 0% применяются к отдельным категориям товаров (продукты питания, медикаменты, детские товары). Используйте поле «Своя ставка» для расчёта по любой ставке.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как начислить НДС на сумму?', a: 'Выберите режим «Начислить НДС», введите сумму без НДС и выберите страну. Калькулятор покажет сумму НДС и итоговую сумму с НДС. Формула: Сумма с НДС = Сумма без НДС × 1,20 (при ставке 20%). Пример: 1 000 ₽ без НДС → НДС 200 ₽ → итого 1 200 ₽.' },
      { q: 'Как выделить НДС из суммы с НДС?', a: 'Выберите режим «Выделить НДС» и введите сумму с НДС. Калькулятор рассчитает сумму без НДС и отдельно сумму НДС. Формула: НДС = Сумма с НДС − (Сумма с НДС / 1,20). Пример: 1 200 ₽ с НДС 20% → 1 000 ₽ без НДС + 200 ₽ НДС.' },
      { q: 'Как рассчитать НДС 20% онлайн?', a: 'Введите сумму в поле калькулятора и выберите «Россия» (20%). Режим «Начислить НДС» прибавляет 20% к сумме. Режим «Выделить НДС» вычленяет НДС из суммы с НДС. Результат отображается мгновенно.' },
      { q: 'Чему равна ставка НДС в России и других странах СНГ?', a: 'Ставки НДС в странах СНГ: Россия — 20% (льготные 10% и 0%), Украина — 20% (льготная 7% на медтовары), Беларусь — 20%, Казахстан — 12%, Армения — 20%, Азербайджан — 18%, Узбекистан — 15%.' },
      { q: 'Что такое НДС?', a: 'НДС (налог на добавленную стоимость) — косвенный налог, включённый в цену товара или услуги. Конечный потребитель платит цену с НДС. Продавец перечисляет налог государству, вычитая «входной» НДС, уплаченный поставщикам. Такой механизм называется «цепочкой НДС».' },
      { q: 'Какие льготные ставки НДС есть в России?', a: 'В России три ставки НДС: 20% — стандартная, 10% — для продуктов питания (кроме деликатесов), детских товаров, книг и медикаментов, 0% — для экспортных операций и ряда услуг. Для применения льготной ставки требуется документальное подтверждение.' },
      { q: 'Как рассчитать сумму без НДС?', a: 'Формула: Сумма без НДС = Сумма с НДС / (1 + ставка НДС / 100). При ставке 20%: разделите сумму с НДС на 1,20. Пример: 6 000 ₽ / 1,20 = 5 000 ₽ без НДС. Наш калькулятор делает этот расчёт автоматически в режиме «Выделить НДС».' },
      { q: 'Кто должен платить НДС?', a: 'НДС обязаны уплачивать юридические лица и ИП на общей системе налогообложения (ОСНО). ИП и компании на УСН, патенте или ЕСХН освобождены от НДС, если их выручка не превышает лимит. Физические лица НДС не уплачивают — он включён в цену товара.' },
      { q: 'Можно ли использовать свою ставку?', a: 'Да. Поле «Своя ставка» позволяет ввести любой процент — удобно для льготной ставки 10%, нулевой ставки или расчёта НДС в стране, не включённой в список. Своя ставка заменяет пресет выбранной страны.' },
      { q: 'Как проверить правильность расчёта НДС?', a: 'Сумма НДС = Сумма с НДС × ставка / (100 + ставка). При ставке 20%: НДС = сумма × 20 / 120 = сумма / 6. Пример: 12 000 ₽ с НДС 20% → 12 000 / 6 = 2 000 ₽ НДС → 10 000 ₽ без НДС. Наш калькулятор НДС автоматически проверяет оба направления расчёта.' },
    ],
  },
  uk: {
    description: 'Безкоштовний калькулятор ПДВ онлайн працює в двох режимах: «Нарахувати ПДВ» розраховує суму з ПДВ із суми без ПДВ, а «Виділити ПДВ» розбиває суму з ПДВ на чисту суму і ПДВ. Оберіть країну для автоматичного завантаження ставки або введіть свою. Формули розрахунку відображаються в результаті.\n\nПДВ — непрямий податок, включений у ціну товару або послуги. В Україні стандартна ставка — 20%. Пільгова ставка 7% застосовується до окремих видів медичних товарів та лікарських засобів. Нульова ставка — для експортних операцій.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як нарахувати ПДВ на суму?', a: 'Оберіть режим «Нарахувати ПДВ», введіть суму без ПДВ і виберіть країну. Калькулятор покаже суму ПДВ і підсумкову суму з ПДВ. Формула: З ПДВ = Без ПДВ × 1,20 (при ставці 20%). Приклад: 1 000 грн без ПДВ → ПДВ 200 грн → разом 1 200 грн.' },
      { q: 'Як виділити ПДВ із суми?', a: 'Оберіть режим «Виділити ПДВ» і введіть суму з ПДВ. Калькулятор розрахує суму без ПДВ і окремо суму ПДВ. Формула: Без ПДВ = З ПДВ / 1,20. Приклад: 1 200 грн з ПДВ 20% → 1 000 грн без ПДВ + 200 грн ПДВ.' },
      { q: 'Яка ставка ПДВ в Україні?', a: 'В Україні стандартна ставка ПДВ — 20%. Пільгова ставка 7% застосовується до деяких медичних товарів та лікарських засобів. Нульова ставка (0%) — для експортних операцій та деяких інших видів діяльності.' },
      { q: 'Як розрахувати суму без ПДВ?', a: 'Формула: Без ПДВ = З ПДВ / (1 + ставка / 100). При ставці 20%: поділіть суму з ПДВ на 1,20. Приклад: 6 000 грн / 1,20 = 5 000 грн без ПДВ. Наш калькулятор виконує цей розрахунок автоматично в режимі «Виділити ПДВ».' },
      { q: 'Що таке ПДВ?', a: 'ПДВ (податок на додану вартість) — непрямий податок, включений у ціну товару або послуги. Кінцевий споживач сплачує ціну з ПДВ, а продавець перераховує податок до державного бюджету. Зареєстровані платники ПДВ зменшують суму до сплати на «вхідний» ПДВ від постачальників.' },
      { q: 'Хто є платником ПДВ в Україні?', a: 'Обов\'язкова реєстрація платником ПДВ в Україні — при обсягу оподатковуваних операцій понад 1 млн грн за 12 місяців. Добровільна реєстрація можлива і при меншому обороті. ФОП на єдиному податку 1–3 групи, як правило, не є платниками ПДВ.' },
      { q: 'Які пільгові ставки ПДВ в Україні?', a: 'В Україні діють три ставки ПДВ: 20% — стандартна, 7% — для деяких медичних товарів та ліків, 0% — для експортних операцій, міжнародних перевезень та деяких інших операцій.' },
      { q: 'Ставки ПДВ у Польщі та ЄС?', a: 'Ставки ПДВ у сусідніх країнах ЄС: Польща — 23% (пільгові 8% і 5%), Литва — 21% (пільгові 9% і 5%), Латвія — 21%, Угорщина — 27%, Словаччина — 20%. Мінімальна стандартна ставка в ЄС — 15% (за регламентом).' },
      { q: 'Чи можна використовувати власну ставку?', a: 'Так. Поле «Своя ставка» дозволяє ввести будь-який відсоток — для пільгової ставки 7%, нульової ставки або розрахунку в країні поза списком. Власна ставка замінює пресет обраної країни.' },
      { q: 'Як перевірити правильність розрахунку ПДВ?', a: 'Сума ПДВ = Сума з ПДВ × ставка / (100 + ставка). При ставці 20%: ПДВ = сума з ПДВ / 6. Приклад: 12 000 грн / 6 = 2 000 грн ПДВ → 10 000 грн без ПДВ. Наш калькулятор ПДВ автоматично перевіряє обидва напрямки розрахунку.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice TVA gratuite en ligne fonctionne en deux modes : « Ajouter TVA » calcule le prix TTC à partir d\'un montant HT, et « Extraire TVA » sépare la part de TVA d\'un prix TTC. Sélectionnez votre pays (France, Belgique, Suisse et 20+ autres) pour charger automatiquement le taux standard, ou saisissez un taux personnalisé pour les taux réduits. Le calcul est instantané et les formules sont affichées dans les résultats.\n\nLes taux de TVA varient selon les pays et les catégories de produits. En France, le taux normal est de 20%, avec des taux réduits de 10% (restauration, hôtellerie) et 5,5% (alimentation, énergie). En Belgique, le taux normal est de 21%, avec des taux réduits de 12% et 6%. Utilisez le simulateur TVA pour calculer n\'importe quel montant HT ou TTC.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calculer la TVA sur un prix HT ?', a: 'Sélectionnez « Ajouter TVA », entrez le montant HT et choisissez votre pays. La calculatrice affiche le montant de TVA et le prix TTC. Formule : TTC = HT × (1 + taux / 100). Exemple : 100 € HT à 20% → TVA 20 € → TTC 120 €.' },
      { q: 'Comment extraire la TVA d\'un prix TTC ?', a: 'Sélectionnez « Extraire TVA » et entrez le montant TTC. La calculatrice calcule le prix HT et la part de TVA. Formule : HT = TTC ÷ (1 + taux / 100). Exemple : 120 € TTC à 20% → 100 € HT + 20 € TVA.' },
      { q: 'Quel est le taux de TVA en France ?', a: 'Les taux de TVA en France : taux normal 20% (la majorité des biens et services), taux intermédiaire 10% (restauration, hôtellerie, travaux de rénovation), taux réduit 5,5% (produits alimentaires, livres, énergie), taux super-réduit 2,1% (médicaments remboursables, presse). Utilisez le champ taux personnalisé pour calculer la TVA à ces taux réduits.' },
      { q: 'Quel est le taux de TVA en Belgique ?', a: 'Les taux de TVA en Belgique : taux normal 21%, taux intermédiaire 12% (certains produits alimentaires, phytopharmacie), taux réduit 6% (alimentation de base, médicaments, livres, logement social, transports). Le taux 0% s\'applique aux journaux et magazines.' },
      { q: 'Quelle est la différence entre HT et TTC ?', a: 'HT (Hors Taxes) est le prix avant application de la TVA — c\'est le montant net. TTC (Toutes Taxes Comprises) est le prix final payé par le consommateur. La différence entre TTC et HT est le montant de la TVA. Sur les factures B2B, les deux montants doivent être indiqués.' },
      { q: 'Qu\'est-ce que la TVA ?', a: 'La TVA (Taxe sur la Valeur Ajoutée) est un impôt indirect sur la consommation. Elle est collectée par les entreprises assujetties à chaque étape de la chaîne de valeur, mais c\'est le consommateur final qui la supporte. Les entreprises récupèrent la TVA payée sur leurs achats (TVA déductible) et reversent la TVA collectée à l\'État (TVA collectée moins TVA déductible).' },
      { q: 'Comment calculer le montant de TVA sur une facture ?', a: 'Montant TVA = Montant TTC × taux / (100 + taux). Au taux de 20% : TVA = TTC / 6. Exemple : 1 200 € TTC → 1 200 / 6 = 200 € de TVA → 1 000 € HT. Pour vérifier : 1 000 × 1,20 = 1 200 € TTC ✓' },
      { q: 'Quel taux de TVA s\'applique aux produits alimentaires ?', a: 'En France : 5,5% sur la plupart des produits alimentaires non transformés et transformés (sauf boissons alcoolisées et produits de confiserie à certaines conditions). En Belgique : 6% ou 0% selon le produit. En Suisse : 2,6% sur les denrées alimentaires (taux réduit).' },
      { q: 'Puis-je utiliser un taux de TVA personnalisé ?', a: 'Oui. Le champ « Taux personnalisé » permet de saisir n\'importe quel taux — utile pour les taux réduits (5,5%, 10%), les opérations exonérées (0%) ou les pays hors liste. Le taux personnalisé remplace automatiquement le taux préréglé du pays sélectionné.' },
      { q: 'Quelle est la précision de cette calculatrice TVA ?', a: 'Les calculs sont exacts à deux décimales près, conformément aux règles de facturation. Les taux de TVA affichés sont les taux standard officiels 2024. Pour les taux réduits ou des cas particuliers, utilisez le champ taux personnalisé. En cas de doute, consultez le site des impôts ou votre comptable.' },
    ],
  },
  lt: {
    description: 'Šis nemokamas PVM skaičiuotuvas internetu veikia dviem režimais: „Pridėti PVM" apskaičiuoja kainą su PVM iš kainos be PVM, o „Išskirti PVM" atskiria PVM dalį nuo sumos su PVM. Pasirinkite šalį automatiškai įkelti standartinį tarifą arba įveskite savo. Skaičiavimas momentinis, formulės rodomos rezultatuose.\n\nPVM tarifai skiriasi priklausomai nuo šalies ir prekių kategorijos. Lietuvoje standartinis tarifas yra 21%, su lengvatiniais tarifais 9% ir 5% tam tikroms prekėms ir paslaugoms. Naudokite „Pasirinktinis tarifas" laukelį bet kokio tarifo skaičiavimui.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip pridėti PVM prie sumos be PVM?', a: 'Pasirinkite „Pridėti PVM", įveskite sumą be PVM ir pasirinkite šalį. Skaičiuotuvas parodys PVM sumą ir galutinę sumą su PVM. Formulė: Su PVM = Be PVM × (1 + tarifas / 100). Pavyzdys: 100 € be PVM × 1,21 = 121 € su PVM.' },
      { q: 'Kaip išskirti PVM iš sumos su PVM?', a: 'Pasirinkite „Išskirti PVM" ir įveskite sumą su PVM. Skaičiuotuvas apskaičiuos sumą be PVM ir PVM dalį. Formulė: Be PVM = Su PVM ÷ (1 + tarifas / 100). Pavyzdys: 121 € su PVM ÷ 1,21 = 100 € be PVM + 21 € PVM.' },
      { q: 'Koks PVM tarifas Lietuvoje?', a: 'Standartinis PVM tarifas Lietuvoje yra 21%. Lengvatiniai tarifai: 9% (knygoms, periodiniams leidiniams, viešbučiams, keleivių vežimui, šildymui) ir 5% (vaistams, medicinos prietaisams). 0% tarifas taikomas eksportui ir kai kurioms kitoms operacijoms.' },
      { q: 'Kas yra PVM?', a: 'PVM (pridėtinės vertės mokestis) — netiesioginis vartojimo mokestis. Jį renka PVM mokėtojais registruotos įmonės kiekviename vertės grandinės etape. Galutinis vartotojas sumoka kainą su PVM, o pardavėjas perveda surinktą PVM valstybei, atskaičiuodamas „pirkimo" PVM.' },
      { q: 'Kokie PVM tarifai ES?', a: 'ES standartiniai PVM tarifai (2024): Lietuva 21%, Latvija 21%, Estija 22%, Lenkija 23%, Vokietija 19%, Prancūzija 20%, Belgija 21%, Italija 22%, Ispanija 21%, Vengrija 27% (aukščiausias ES), Liuksemburgas 17% (žemiausias ES). Minimalus leidžiamas standartas ES — 15%.' },
      { q: 'Kaip apskaičiuoti PVM sumą iš TTC?', a: 'Formulė: PVM = Suma su PVM × tarifas / (100 + tarifas). Esant 21% tarifui: PVM = suma su PVM × 21 / 121. Pavyzdys: 121 € × 21 / 121 = 21 € PVM → 100 € be PVM. Mūsų skaičiuotuvas tai apskaičiuoja automatiškai.' },
      { q: 'Ar galima naudoti savo PVM tarifą?', a: 'Taip. „Pasirinktinis tarifas" laukelis leidžia įvesti bet kokį procentą — lengvatiniam 9% ar 5% tarifui, nulinei normai arba šaliai, kurios nėra sąraše. Pasirinktinis tarifas pakeičia pasirinktos šalies išankstinę reikšmę.' },
      { q: 'Kas privalo registruotis PVM mokėtoju Lietuvoje?', a: 'Privaloma PVM registracija Lietuvoje, kai per 12 mėnesių apmokestinamosios operacijos viršija 45 000 €. Savanoriška registracija galima ir prie mažesnės apyvartos. PVM mokėtojams išduodamas PVM mokėtojo kodas (su LT prefiksu).' },
      { q: 'Koks PVM taikomas maisto produktams Lietuvoje?', a: 'Maisto produktams Lietuvoje taikomas standartinis 21% PVM tarifas, išskyrus tam tikras kategorijas. Lengvatinis 5% tarifas taikomas vaistams ir medicinos prietaisams. Knygoms, periodinei spaudai, viešbučiams ir keleivių vežimui — 9%.' },
      { q: 'Kiek tikslus šis PVM skaičiuotuvas?', a: 'Skaičiavimai tikslūs iki dviejų skaičių po kablelio pagal sąskaitų faktūrų išrašymo taisykles. Rodomi 2024 m. oficialūs standartiniai PVM tarifai. Lengvatiniams tarifams naudokite pasirinktinio tarifo laukelį. Kilus abejonių, kreipkitės į VMI arba buhalterį.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/vat', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VatPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/vat`,
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
        <VatCalculator locale={locale} />
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
