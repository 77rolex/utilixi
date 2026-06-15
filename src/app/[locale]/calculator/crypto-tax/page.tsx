import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CryptoTaxCalculator from './CryptoTaxCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/crypto', label: 'Crypto Rates' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/crypto/converter', label: 'Crypto Converter' }, { href: '/currency', label: 'Currency Converter' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }],
  ru: [{ href: '/crypto', label: 'Курс криптовалют' }, { href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' }, { href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/currency', label: 'Конвертер валют' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }],
  uk: [{ href: '/crypto', label: 'Курс криптовалют' }, { href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' }, { href: '/crypto/converter', label: 'Конвертер криптовалют' }, { href: '/currency', label: 'Конвертер валют' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }],
  fr: [{ href: '/crypto', label: 'Cours des cryptos' }, { href: '/calculator/income-tax', label: 'Calculatrice impôt sur le revenu' }, { href: '/crypto/converter', label: 'Convertisseur crypto' }, { href: '/currency', label: 'Convertisseur de devises' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }],
  lt: [{ href: '/crypto', label: 'Kriptovaliutų kursai' }, { href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' }, { href: '/crypto/converter', label: 'Kriptovaliutų keitiklis' }, { href: '/currency', label: 'Valiutų keitiklis' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Crypto Tax Calculator — Capital Gains by Country 2024',
    description: 'Free cryptocurrency tax calculator. Calculate capital gains tax on Bitcoin, Ethereum and other crypto for 8 countries. Supports short-term and long-term holdings.',
    h1: 'Crypto Tax Calculator',
    subtitle: 'Calculate capital gains tax on your crypto trades and estimate what you owe.',
  },
  ru: {
    title: 'Калькулятор налога на криптовалюту — по странам 2024',
    description: 'Бесплатный калькулятор налога на доход от криптовалют. Рассчитайте налог на прибыль от Bitcoin, Ethereum и других монет для 8 стран.',
    h1: 'Калькулятор налога на доход от крипты',
    subtitle: 'Рассчитайте налог на прибыль от торговли криптовалютой и узнайте сумму к уплате.',
  },
  uk: {
    title: 'Калькулятор податку на криптовалюту — за країнами 2024',
    description: 'Безкоштовний калькулятор податку на дохід від криптовалют. Розрахуйте податок на прибуток від Bitcoin, Ethereum та інших монет для 8 країн.',
    h1: 'Калькулятор податку на дохід від крипти',
    subtitle: 'Розрахуйте податок на прибуток від торгівлі криптовалютою та суму до сплати.',
  },
  fr: {
    title: 'Calculatrice d\'impôt crypto — Plus-values par pays 2024',
    description: 'Calculatrice d\'impôt sur les cryptomonnaies gratuite. Calculez l\'impôt sur les plus-values de Bitcoin, Ethereum et autres cryptos pour 8 pays.',
    h1: 'Calculatrice d\'impôt sur les cryptomonnaies',
    subtitle: 'Calculez l\'impôt sur les plus-values crypto et estimez votre montant à payer.',
  },
  lt: {
    title: 'Kriptovaliutų mokesčių skaičiuotuvas — pagal šalis 2024',
    description: 'Nemokamas kriptovaliutų mokesčių skaičiuotuvas. Apskaičiuokite kapitalo prieaugio mokestį nuo Bitcoin, Ethereum ir kitų kriptovaliutų 8 šalims.',
    h1: 'Kriptovaliutų mokesčių skaičiuotuvas',
    subtitle: 'Apskaičiuokite kapitalo prieaugių mokestį nuo kriptovaliutų sandorių.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Calculate the tax on your cryptocurrency profits for 8 countries. Enter the purchase price, sale price, quantity, and holding period — and our calculator determines the applicable tax rate and exact amount owed based on each country\'s crypto tax rules for 2024.\n\nCrypto taxation is evolving rapidly. Most countries now treat crypto as a capital asset subject to capital gains tax. The key variables are: the holding period (short vs long-term rates), whether crypto-to-crypto swaps are taxable events, and how losses can offset gains.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is cryptocurrency taxed?', a: 'Yes — in most countries, profits from selling cryptocurrency are subject to capital gains tax or income tax. Rates and rules vary significantly: Germany exempts gains after 1 year; France uses a flat 30% (PFU); the US distinguishes short-term (up to 37%) and long-term (0–20%) rates; Lithuania applies a flat 15%.' },
      { q: 'What is the difference between short-term and long-term crypto tax?', a: 'In the US: crypto held under 1 year is taxed as ordinary income (up to 37%); over 1 year gets preferential rates (0%, 15%, or 20%). In Germany: crypto held over 1 year is completely tax-free. In France: both are taxed at 30% flat. In Lithuania: all gains taxed at 15% regardless of holding period.' },
      { q: 'Can I offset crypto losses against gains?', a: 'In most countries, yes — crypto losses offset gains from other crypto sales in the same tax year, reducing your taxable profit. In the US, losses can also offset other capital gains and up to $3,000 of ordinary income per year, with excess losses carried forward indefinitely.' },
      { q: 'Which country has the most favorable crypto tax?', a: 'Germany stands out — crypto held over 1 year is completely tax-free. Portugal historically had no capital gains tax on crypto for individuals (rules changing). Lithuania has a low 15% flat rate. Switzerland taxes crypto gains as income only for professional traders; casual investors often pay nothing.' },
      { q: 'Are crypto-to-crypto trades taxable?', a: 'In most countries, yes. Swapping Bitcoin for Ethereum is treated as disposing of Bitcoin at its current market value and acquiring Ethereum — triggering a taxable gain or loss. This applies in the US, UK, Germany, France, and most EU countries. Each swap must be reported separately.' },
      { q: 'Is cryptocurrency mining income taxable?', a: 'Yes in most jurisdictions. Mining income is typically taxed as ordinary income at the fair market value when coins are received. When those mined coins are later sold, any gain/loss from the original value is a separate capital gains event. Some countries treat small-scale mining differently.' },
      { q: 'What records do I need to keep for crypto taxes?', a: 'Keep records of: date of each acquisition and sale; amount of crypto; price in local currency at time of transaction; fees paid; wallet addresses involved. Most exchanges provide annual transaction reports. Tax software (Koinly, CoinTracking, TaxBit) can automate this for complex portfolios.' },
      { q: 'Is receiving crypto as payment taxable?', a: 'Yes. Receiving crypto as salary, freelance payment, or in exchange for goods/services is treated as income at the fair market value on the date of receipt. Later, when you sell that crypto, any gain above the original income value is a capital gain.' },
      { q: 'What is cost basis for crypto?', a: 'Cost basis is the original value of crypto when acquired — used to calculate profit or loss when sold. Common methods: FIFO (first in, first out — most countries default), LIFO (last in, first out — some US accounts), or average cost (UK, some EU countries). The method affects your tax liability significantly.' },
      { q: 'Do I pay tax if I just hold crypto without selling?', a: 'No — in almost all countries, simply holding cryptocurrency is not a taxable event. Tax is triggered only when you dispose of crypto: by selling, trading, spending, or gifting it. Exception: some countries tax unrealized gains if you move crypto offshore or renounce citizenship.' },
    ],
  },
  ru: {
    description: 'Рассчитайте налог на прибыль от криптовалют для 8 стран. Введите цену покупки и продажи монеты, количество и срок владения — калькулятор определит применимую ставку и точную сумму налога на 2024 год.\n\nНалогообложение крипты быстро меняется. В большинстве стран криптовалюта теперь считается капитальным активом. Ключевые факторы: срок владения (кратко- или долгосрочные ставки), является ли обмен крипты на крипту налогооблагаемым событием, и как убытки зачитываются против прибыли.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Облагается ли криптовалюта налогом?', a: 'Да — в большинстве стран прибыль от продажи крипты облагается налогом. Ставки существенно различаются: Германия освобождает прибыль после 1 года владения; Франция — 30% фиксированная ставка; США различают краткосрочные (до 37%) и долгосрочные (0–20%) ставки; Литва — 15%.' },
      { q: 'В чём разница между краткосрочным и долгосрочным налогом?', a: 'В США: крипта до 1 года — по ставкам обычного дохода (до 37%); более 1 года — льготные ставки (0–20%). В Германии: крипта свыше 1 года полностью освобождена. Во Франции: 30% независимо от срока. В Литве: 15% независимо от срока.' },
      { q: 'Можно ли зачесть убытки по крипте?', a: 'В большинстве стран — да. Убытки зачитываются против прибыли от других криптосделок в том же налоговом году. В США убытки также зачитываются против других прироста капитала и до $3 000 обычного дохода в год, остаток переносится на следующие годы.' },
      { q: 'В какой стране наиболее выгодное налогообложение крипты?', a: 'Германия — крипта свыше 1 года полностью освобождена. Швейцария: случайные инвесторы часто не платят налог (только профессиональные трейдеры). Литва — 15% фиксированная ставка.' },
      { q: 'Облагается ли обмен крипты на крипту налогом?', a: 'В большинстве стран — да. Обмен Bitcoin на Ethereum считается продажей Bitcoin по текущей рыночной цене и покупкой Ethereum, что создаёт налогооблагаемую прибыль или убыток. Каждая такая операция должна отражаться в налоговой декларации.' },
      { q: 'Облагается ли майнинг налогом?', a: 'Да. Доход от майнинга обычно считается обычным доходом по рыночной стоимости монет на момент получения. При последующей продаже намайненных монет прирост выше первоначальной стоимости — отдельный доход от прироста капитала.' },
      { q: 'Какие записи нужно вести для налоговой отчётности?', a: 'Необходимо фиксировать: дату каждой покупки и продажи; количество монет; цену в национальной валюте на момент сделки; уплаченные комиссии. Большинство бирж предоставляют выгрузку операций. Для сложных портфелей удобно использовать специализированное ПО (Koinly, CoinTracking).' },
      { q: 'Облагается ли получение крипты в оплату услуг налогом?', a: 'Да. Получение крипты как зарплаты, оплаты за фриланс или товары считается доходом по рыночной стоимости на дату получения. При последующей продаже — прирост сверх первоначальной стоимости облагается налогом на прирост капитала.' },
      { q: 'Что такое базовая стоимость для крипты?', a: 'Базовая стоимость — первоначальная стоимость криптовалюты при приобретении, используемая для расчёта прибыли или убытка при продаже. Методы: FIFO (первый пришёл — первый ушёл), LIFO (последний пришёл — первый ушёл), средняя стоимость. Выбор метода существенно влияет на налоговую нагрузку.' },
      { q: 'Нужно ли платить налог при простом владении криптой?', a: 'Нет — в почти всех странах само по себе владение криптовалютой не является налогооблагаемым событием. Налог возникает только при распоряжении: продаже, обмене, оплате товаров, дарении.' },
    ],
  },
  uk: {
    description: 'Розрахуйте податок на прибуток від криптовалют для 8 країн. Введіть ціну купівлі та продажу монети, кількість і термін утримання — калькулятор визначить застосовну ставку та точну суму податку на 2024 рік.\n\nОподаткування крипти швидко змінюється. У більшості країн криптовалюта вважається капітальним активом. Ключові фактори: термін утримання, чи є обмін крипти на крипту оподатковуваною подією, та як збитки зараховуються проти прибутку.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Чи оподатковується криптовалюта?', a: 'Так — у більшості країн прибуток від продажу крипти оподатковується. Ставки суттєво різняться: Німеччина звільняє прибуток після 1 року; Франція — 30% єдина ставка; США розрізняють короткострокові (до 37%) та довгострокові (0–20%) ставки; Литва — 15%.' },
      { q: 'У чому різниця між короткостроковим і довгостроковим податком?', a: 'У США: крипта до 1 року — ставки звичайного доходу (до 37%); понад 1 рік — пільгові (0–20%). У Німеччині: крипта понад 1 рік повністю звільнена. У Франції: 30% незалежно від терміну. В Литві: 15% незалежно від терміну.' },
      { q: 'Чи можна зарахувати збитки по крипті?', a: 'У більшості країн так — збитки зараховуються проти прибутку від інших криптоугод у тому ж податковому році.' },
      { q: 'В якій країні найвигідніше оподаткування крипти?', a: 'Німеччина — крипта понад 1 рік повністю звільнена. Швейцарія: випадкові інвестори часто не платять податок. Литва — 15% єдина ставка.' },
      { q: 'Чи оподатковується обмін крипти на крипту?', a: 'У більшості країн — так. Обмін Bitcoin на Ethereum вважається продажем Bitcoin за поточною ринковою ціною, що створює оподатковуваний прибуток або збиток. Кожна така операція має відображатися у декларації.' },
      { q: 'Чи оподатковується майнінг?', a: 'Так. Дохід від майнінгу вважається звичайним доходом за ринковою вартістю монет на момент отримання. При подальшому продажу намайнених монет приріст вище первісної вартості — окремий дохід від приросту капіталу.' },
      { q: 'Які записи потрібно вести для податкової звітності?', a: 'Необхідно фіксувати: дату кожної купівлі та продажу; кількість монет; ціну в національній валюті на момент угоди; сплачені комісії. Більшість бірж надають вивантаження операцій за рік.' },
      { q: 'Чи оподатковується отримання крипти як оплати послуг?', a: 'Так. Отримання крипти як зарплати або оплати за послуги вважається доходом за ринковою вартістю на дату отримання. При подальшому продажу — приріст вище первісної вартості оподатковується.' },
      { q: 'Що таке базова вартість для крипти?', a: 'Базова вартість — початкова вартість криптовалюти при придбанні, що використовується для розрахунку прибутку або збитку при продажу. Методи: FIFO, LIFO або середня вартість. Вибір методу суттєво впливає на податкове навантаження.' },
      { q: 'Чи потрібно платити податок при простому утриманні крипти?', a: 'Ні — у майже всіх країнах просте утримання криптовалюти не є оподатковуваною подією. Податок виникає лише при розпорядженні: продажу, обміні, оплаті товарів, даруванні.' },
    ],
  },
  fr: {
    description: 'Calculez l\'impôt sur vos bénéfices en cryptomonnaies pour 8 pays. Entrez le prix d\'achat et de vente, la quantité et la durée de détention — notre calculatrice détermine le taux applicable et le montant exact dû selon les règles fiscales 2024.\n\nLa fiscalité des crypto évolue rapidement. Dans la plupart des pays, les cryptos sont traités comme des actifs en capital soumis à l\'impôt sur les plus-values. Les variables clés : durée de détention, traitement des échanges crypto-à-crypto, et déductibilité des pertes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Les cryptomonnaies sont-elles imposées ?', a: 'Oui — dans la plupart des pays, les bénéfices issus de la vente de cryptos sont imposables. En France : flat tax 30 % (PFU). En Allemagne : exonération après 1 an. Aux États-Unis : taux court terme (jusqu\'à 37 %) ou long terme (0–20 %). En Lituanie : 15 % forfaitaire.' },
      { q: 'Quelle est la différence entre taxe à court et long terme ?', a: 'En France, les deux sont taxés à 30 % (PFU) sans distinction de durée. Aux États-Unis, moins d\'1 an = revenu ordinaire (jusqu\'à 37 %) ; plus d\'1 an = taux réduit (0–20 %). En Allemagne, après 1 an de détention = totalement exonéré.' },
      { q: 'Puis-je déduire les pertes crypto ?', a: 'En France, les moins-values crypto ne peuvent être imputées que sur des plus-values de même nature (cessions d\'actifs numériques) la même année — pas sur d\'autres plus-values. Aux États-Unis, les pertes peuvent compenser d\'autres gains en capital et jusqu\'à 3 000 $/an de revenus ordinaires.' },
      { q: 'Quel pays a la fiscalité crypto la plus avantageuse ?', a: 'L\'Allemagne : exonération totale après 1 an. Portugal : traditionnellement pas de CGT sur crypto pour les particuliers (règles en évolution). Lituanie : 15 % forfaitaire. Suisse : les investisseurs occasionnels sont souvent exonérés.' },
      { q: 'Les échanges crypto-à-crypto sont-ils imposables ?', a: 'En France, oui — l\'échange d\'une crypto contre une autre constitue une cession imposable si l\'on reçoit de la monnaie ayant cours légal, ou dans certains cas de conversion directe. Chaque échange génère potentiellement une plus ou moins-value. Les échanges entre cryptos sans contrepartie en monnaie fiat font l\'objet d\'interprétations, consultez un expert.' },
      { q: 'Le minage est-il imposable en France ?', a: 'Oui. Les revenus du minage sont imposés comme BNC (bénéfices non commerciaux) à la valeur des coins reçus. À la vente ultérieure, toute plus-value par rapport à la valeur d\'entrée est taxée comme plus-value sur actifs numériques (30 %).' },
      { q: 'Quelles traces dois-je conserver ?', a: 'Conservez : la date de chaque acquisition et cession, la quantité, le prix en euros au moment de la transaction, les frais. La plupart des plateformes fournissent un historique annuel. Des logiciels spécialisés (Koinly, Waltio, CoinTracking) simplifient la déclaration.' },
      { q: 'Recevoir des cryptos en paiement est-il imposable ?', a: 'Oui. Recevoir des cryptos comme salaire ou en échange de services est un revenu imposable à la valeur marchande à la date de réception. La plus-value ultérieure lors de la vente constitue une plus-value sur actifs numériques.' },
      { q: 'Qu\'est-ce que le prix de revient (cost basis) ?', a: 'Le prix de revient est la valeur d\'acquisition de la crypto en euros — utilisée pour calculer la plus ou moins-value à la vente. En France, une méthode de calcul spécifique est prévue (art. 150 VH bis CGI) basée sur la proportion du portefeuille global cédé.' },
      { q: 'Dois-je payer des impôts si je détiens des cryptos sans vendre ?', a: 'Non — dans presque tous les pays, la simple détention de cryptos n\'est pas un événement imposable. L\'impôt naît uniquement lors de la cession : vente, échange, utilisation pour payer des biens ou services, donation.' },
    ],
  },
  lt: {
    description: 'Apskaičiuokite mokestį nuo kriptovaliutų pelno 8 šalims. Įveskite pirkimo ir pardavimo kainą, kiekį ir laikymo laikotarpį — skaičiuotuvas nustatys taikomą tarifą ir tikslią mokesčio sumą pagal 2024 m. taisykles.\n\nKriptovaliutų apmokestinimas sparčiai keičiasi. Daugelyje šalių kriptos laikomos kapitalo turtu. Pagrindiniai veiksniai: laikymo laikotarpis, ar kriptovaliutų keitimas apmokestinamas, ir kaip nuostoliai kompensuoja pelną.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Ar kriptovaliutos apmokestinamos?', a: 'Taip — daugelyje šalių pelnas iš kriptovaliutų pardavimo apmokestinamas. Vokietija atleidžia po 1 metų; Prancūzija — 30 % fiksuotas tarifas; JAV skiria trumpalaikius ir ilgalaikius tarifus; Lietuva — 15 %.' },
      { q: 'Koks skirtumas tarp trumpalaikio ir ilgalaikio mokesčio?', a: 'Lietuvoje taikomas vienodas 15 % GPM tarifas nepriklausomai nuo laikymo laikotarpio. Vokietijoje — po 1 metų visiškai atleidžiama. JAV — mažiau nei 1 metai = pajamų mokestis (iki 37 %); daugiau nei 1 metai = lengvatinis tarifas (0–20 %).' },
      { q: 'Ar galima įskaityti kriptovaliutų nuostolius?', a: 'Daugelyje šalių taip — nuostoliai kompensuoja pelną iš kitų kriptosandorių tais pačiais mokestiniais metais.' },
      { q: 'Kurioje šalyje palankiausias kriptovaliutų apmokestinimas?', a: 'Vokietija — po 1 metų visiškai atleidžiama. Šveicarija — atsitiktiniai investuotojai dažnai nemoka mokesčio. Lietuva — 15 % fiksuotas tarifas.' },
      { q: 'Ar kriptovaliutų keitimas į kitas kriptovaliutas apmokestinamas?', a: 'Daugelyje šalių taip — Bitcoin keitimas į Ethereum laikomas Bitcoin realizavimu dabartine rinkos verte, sukuriant apmokestinamą pelną ar nuostolį. Kiekvienas toks sandoris turi būti deklaruojamas atskirai.' },
      { q: 'Ar kriptovaliutų kasimas apmokestinamas?', a: 'Taip. Kasimo pajamos paprastai apmokestinamos kaip įprastos pajamos pagal monetų rinkos vertę gavimo momentu. Vėliau parduodant iškastas monetas, prieaugis virš pradinės vertės yra atskiras kapitalo prieaugis.' },
      { q: 'Kokius įrašus reikia saugoti mokestinei atskaitomybei?', a: 'Saugokite: kiekvieno pirkimo ir pardavimo datą; monetų kiekį; kainą eurais sandorio metu; sumokėtus mokesčius. Dauguma biržų pateikia metinę sandorių istoriją. Specialioji programinė įranga (Koinly, CoinTracking) palengvina ataskaitų teikimą.' },
      { q: 'Ar apmokestinamas kriptovaliutų gavimas kaip mokėjimas?', a: 'Taip. Gautos kriptos kaip atlyginimas ar apmokėjimas už paslaugas laikomos pajamomis pagal rinkos vertę gavimo dieną. Vėliau parduodant — prieaugis virš pradinės vertės apmokestinamas.' },
      { q: 'Kas yra savikainos bazė kriptovaliutoms?', a: 'Savikainos bazė — pradinė kriptovaliutos įsigijimo vertė, naudojama pelno ar nuostolio skaičiavimui. Metodai: FIFO, LIFO arba vidutinė kaina. Metodo pasirinkimas reikšmingai veikia mokesčių naštą.' },
      { q: 'Ar reikia mokėti mokestį tiesiog laikant kriptovaliutas?', a: 'Ne — beveik visose šalyse vien kriptovaliutų laikymas nėra apmokestinamas įvykis. Mokestis atsiranda tik realizavus: parduodant, keičiant, naudojant prekėms ar paslaugoms apmokėti, dovanojant.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/crypto-tax', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CryptoTaxPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/crypto-tax`,
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
        <CryptoTaxCalculator locale={locale} />

        <AdInline locale={locale} />
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
