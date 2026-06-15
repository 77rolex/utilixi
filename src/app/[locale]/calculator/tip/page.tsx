import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import TipCalculator from './TipCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/discount', label: 'Discount Calculator' }, { href: '/calculator/salary', label: 'Salary Calculator' }],
  ru: [{ href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/discount', label: 'Калькулятор скидки' }, { href: '/calculator/salary', label: 'Калькулятор зарплаты' }],
  uk: [{ href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/discount', label: 'Калькулятор знижки' }, { href: '/calculator/salary', label: 'Калькулятор зарплати' }],
  fr: [{ href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/discount', label: 'Calculatrice de remise' }, { href: '/calculator/salary', label: 'Calculatrice de salaire' }],
  lt: [{ href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/discount', label: 'Nuolaidos skaičiuotuvas' }, { href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: { title: 'Tip Calculator — Calculate Tip and Split the Bill', description: 'Free tip calculator. Calculate the tip amount for any bill, choose a percentage, and split the total between any number of people instantly.', h1: 'Tip Calculator', subtitle: 'Calculate the tip amount for any bill and split the total among multiple people.' },
  ru: { title: 'Калькулятор чаевых — рассчитать чаевые и разделить счёт', description: 'Бесплатный калькулятор чаевых. Рассчитайте сумму чаевых для любого счёта, выберите процент и разделите итог между нужным количеством людей.', h1: 'Калькулятор чаевых', subtitle: 'Рассчитайте сумму чаевых и разделите счёт на несколько человек.' },
  uk: { title: 'Калькулятор чайових — розрахувати чайові та розділити рахунок', description: 'Безкоштовний калькулятор чайових. Розрахуйте суму чайових для будь-якого рахунку та розділіть підсумок між потрібною кількістю людей.', h1: 'Калькулятор чайових', subtitle: 'Розрахуйте суму чайових і розділіть рахунок між кількома людьми.' },
  fr: { title: 'Calculatrice de pourboire — Calculer le pourboire et partager l\'addition', description: 'Calculatrice de pourboire gratuite. Calculez le montant du pourboire pour n\'importe quelle addition et répartissez le total entre plusieurs personnes.', h1: 'Calculatrice de pourboire', subtitle: 'Calculez le montant du pourboire et répartissez l\'addition entre plusieurs personnes.' },
  lt: { title: 'Arbatpinigių Skaičiuotuvas — Apskaičiuoti arbatpinigius ir padalinti sąskaitą', description: 'Nemokamas arbatpinigių skaičiuotuvas. Apskaičiuokite arbatpinigių sumą bet kuriai sąskaitai ir padalinkite bendrą sumą tarp kelių žmonių.', h1: 'Arbatpinigių skaičiuotuvas', subtitle: 'Apskaičiuokite arbatpinigių sumą ir padalykite sąskaitą tarp kelių žmonių.' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Enter the bill amount, select or type a tip percentage, and optionally split the total between multiple people. Quick-select buttons for the most common tip percentages (10%, 15%, 18%, 20%, 25%) make it easy to calculate in seconds. The calculator shows the tip amount, total bill, and the amount per person.\n\nTipping customs vary considerably around the world. In the US and Canada, 15–20% is the standard and service workers often rely on tips as a significant part of their income. In Western Europe, tipping is appreciated but less expected — rounding up or leaving 5–10% is common. In Japan, South Korea, and much of Southeast Asia, tipping is not traditional and may even cause embarrassment for staff.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much should I tip at a restaurant?', a: 'In the US, 15–20% is standard for table service at restaurants. 18–20% is typical for good service, 25%+ for exceptional service, and 10–15% if service was poor. In Europe, tipping is less expected — rounding up or 5–10% is common. In Japan and some Asian countries, tipping is not customary.' },
      { q: 'How do you calculate a 20% tip?', a: 'Multiply the bill by 0.20. For example, a $45 bill: $45 × 0.20 = $9 tip, total = $54. A quick mental trick: find 10% (move the decimal one place left), then double it. For $45: 10% = $4.50, × 2 = $9.' },
      { q: 'Should you tip on the pre-tax or post-tax amount?', a: 'Convention varies. In the US, tipping on the pre-tax (subtotal) amount is technically correct, but tipping on the total including tax is also common and results in a slightly higher tip. The difference is small — on a $50 bill with 8% tax, it\'s about $0.80.' },
      { q: 'How do you split a bill evenly?', a: 'Enter the bill amount, set your tip percentage, and enter the number of people. The calculator divides the total (bill + tip) equally. For example, $100 bill + 20% tip = $120 total, split between 4 people = $30 each.' },
      { q: 'What tip is standard for delivery?', a: 'For food delivery, 10–20% of the order total is standard, with a minimum of $3–5 for small orders regardless of percentage. For grocery or other delivery services, $3–5 per trip is typical.' },
      { q: 'Is tipping included in the bill in Europe?', a: 'In France, service is legally included in prices ("service compris" at 15%), so an extra tip is optional. In the UK, some restaurants add a discretionary 12.5% service charge — always check the bill to avoid double-tipping. In Germany and the Netherlands, rounding up or 5–10% for good service is customary but not required.' },
      { q: 'Should I tip at a coffee shop or fast food?', a: 'At coffee shops and cafés, $1–2 or 10–15% is increasingly common in the US due to digital tip prompts at POS terminals. At traditional fast food counters (order and pick up), tipping is generally not expected. Tip if the service warrants it.' },
      { q: 'How much should I tip a taxi or rideshare driver?', a: 'For taxis and rideshare (Uber, Lyft) in the US, 15–20% is customary. For international destinations, 10% or rounding up to the nearest whole amount is typical. For short rideshare trips, $1–2 is common; for longer trips, $3–5 is appreciated.' },
      { q: 'What are typical hotel tipping amounts?', a: 'Housekeeping: $2–5 per night (leave daily, as staff may rotate). Bellhop/porter: $1–2 per bag. Concierge: $5–20 for major reservations or special help. Room service: 15–20% if a service charge is not already included. Doorman: $1–2 for hailing a cab.' },
      { q: 'When is it acceptable not to tip?', a: 'In countries where tipping is customary (US, Canada), not tipping sends a strong signal of dissatisfaction — for genuinely poor service it is acceptable, but consider also speaking to the manager. In non-tipping cultures (Japan, Korea, most of East Asia), not tipping is the expected norm and staff may politely decline.' },
    ],
  },
  ru: {
    description: 'Введите сумму счёта, выберите или введите процент чаевых и при необходимости разделите итог на нескольких человек. Кнопки быстрого выбора для самых распространённых значений (10%, 15%, 18%, 20%, 25%) позволяют рассчитать за секунды. Калькулятор показывает сумму чаевых, итоговый счёт и долю каждого.\n\nТрадиции чаевых существенно различаются по всему миру. В США и Канаде 15–20% считается нормой — для многих работников сферы обслуживания чаевые составляют значительную часть дохода. В Западной Европе чаевые приветствуются, но не обязательны: принято округлять счёт или оставлять 5–10%. В Японии, Южной Корее и большей части Юго-Восточной Азии чаевые не приняты и могут поставить персонал в неловкое положение.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько принято давать чаевых в ресторане?', a: 'В США стандарт — 15–20% за обслуживание за столом. В Европе чаевые менее обязательны — обычно округляют счёт или оставляют 5–10%. В Японии и ряде азиатских стран чаевые не приняты совсем.' },
      { q: 'Как быстро посчитать 20% чаевых в уме?', a: 'Найдите 10% (перенесите запятую влево), затем удвойте. Например, счёт 45$: 10% = 4,50$, × 2 = 9$. Итого с чаевыми: 54$.' },
      { q: 'С какой суммы считать чаевые — до налога или после?', a: 'По правилам считают от суммы до налога, но на практике в США часто считают от итоговой суммы. Разница незначительная — при счёте 50$ и налоге 8% это около 0,80$.' },
      { q: 'Как разделить счёт поровну?', a: 'Введите сумму счёта, выберите процент чаевых и укажите количество человек. Калькулятор разделит итог (счёт + чаевые) поровну. Например: счёт 100$ + 20% = 120$, на 4 человека = 30$ с каждого.' },
      { q: 'Какие чаевые стандартны для доставки?', a: 'При доставке еды стандарт — 10–20% от суммы заказа, но не менее 3–5$ при небольших заказах.' },
      { q: 'Включены ли чаевые в счёт в Европе?', a: 'Во Франции сервисный сбор 15% включён в цену по закону («service compris»), дополнительные чаевые необязательны. В Великобритании некоторые рестораны добавляют дискреционный сбор 12,5% — проверяйте счёт, чтобы не дать дважды. В России сервисный сбор иногда включается в счёт: обратите внимание на строку «Service charge».' },
      { q: 'Нужно ли давать чаевые в кофейне или фастфуде?', a: 'В кофейнях и кафе 10–15% или небольшое округление стало нормой во многих странах. В классическом фастфуде у прилавка чаевые не ожидаются. Ориентируйтесь на уровень обслуживания и формат заведения.' },
      { q: 'Сколько давать чаевых таксисту или водителю Uber?', a: 'В США стандарт — 15–20%. В России чаевые таксистам не обязательны, но 50–100 рублей за хорошую поездку приветствуются. В Uber и Яндекс Go чаевые удобно оставить прямо в приложении после поездки.' },
      { q: 'Каков этикет чаевых в гостинице?', a: 'Горничной: 200–300 рублей в день, желательно ежедневно, так как персонал меняется. Носильщику: 100–200 рублей за сумку. Консьержу: 500–1000 рублей за особые услуги (бронирование, трансфер). Обслуживание в номере: 10–15%, если не включено в счёт.' },
      { q: 'Когда уместно не давать чаевые?', a: 'При откровенно плохом обслуживании допустимо снизить процент или не оставлять совсем, однако лучше также поговорить с менеджером. В странах, где чаевые являются нормой (США, Канада), их полное отсутствие — сильный сигнал недовольства. В Японии и большей части Азии не давать чаевые абсолютно нормально.' },
    ],
  },
  uk: {
    description: 'Введіть суму рахунку, оберіть або введіть відсоток чайових і за потреби розділіть підсумок між кількома людьми. Кнопки швидкого вибору для найпоширеніших значень (10%, 15%, 18%, 20%, 25%) дозволяють розрахувати за секунди. Калькулятор показує суму чайових, підсумковий рахунок і частку кожного.\n\nТрадиції чайових суттєво різняться у різних країнах. У США та Канаді 15–20% є нормою — для багатьох працівників сфери послуг чайові складають важливу частину доходу. У Великій Британії чайові вітаються, але не є обов\'язковими: зазвичай рахунок просто округлюють або залишають 5–10%. В Японії та Кореї чайові не прийняті і можуть спантеличити персонал.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки прийнято залишати чайових у ресторані?', a: 'У США стандарт — 15–20% за обслуговування. У Європі чайові менш обов\'язкові — зазвичай округлюють рахунок або залишають 5–10%. В Японії чайові не прийняті.' },
      { q: 'Як швидко порахувати 20% чайових?', a: 'Знайдіть 10% (перенесіть кому вліво), потім подвойте. Наприклад, рахунок 45$: 10% = 4,50$, × 2 = 9$. Разом із чайовими: 54$.' },
      { q: 'Від якої суми рахувати чайові — до податку чи після?', a: 'За правилами — від суми до податку, але на практиці в США часто рахують від підсумкової суми. Різниця незначна.' },
      { q: 'Як розділити рахунок порівну?', a: 'Введіть суму рахунку, відсоток чайових і кількість людей. Калькулятор розділить підсумок (рахунок + чайові) порівну.' },
      { q: 'Які чайові стандартні для доставки?', a: 'При доставці їжі стандарт — 10–20% від суми замовлення, але не менше 100–150 грн при невеликих замовленнях.' },
      { q: 'Чи включені чайові до рахунку в Європі?', a: 'У Франції сервісний збір 15% включений у ціну за законом ("service compris"). У Великій Британії деякі ресторани додають дискреційний збір 12,5% — перевіряйте рахунок, щоб не дати двічі. В Україні сервісний збір іноді включається до рахунку автоматично.' },
      { q: 'Чи потрібно давати чайові в кав\'ярні або фастфуді?', a: 'У кав\'ярнях та кафе залишити 10–15% або невелике округлення стало нормою. У класичному фастфуді біля прилавка чайові не очікуються.' },
      { q: 'Скільки давати чайових таксисту або водієві Bolt?', a: 'В Україні чайові таксистам не є обов\'язковими, але 20–50 грн за хорошу поїздку вітаються. У США стандарт — 15–20%.' },
      { q: 'Який етикет чайових у готелі?', a: 'Покоївці: 100–200 грн на день, бажано щодня, оскільки персонал змінюється. Носильнику: 50–100 грн за сумку. Консьєржу: 200–500 грн за особливі послуги. Обслуговування в номері: 10–15%, якщо не включено.' },
      { q: 'Коли доречно не давати чайових?', a: 'При поганому обслуговуванні можна залишити менший відсоток або не залишати зовсім, але краще також поговорити з менеджером. У країнах без традиції чайових (Японія, більшість Азії) не давати чайові — норма.' },
    ],
  },
  fr: {
    description: 'Entrez le montant de l\'addition, sélectionnez ou tapez un pourcentage de pourboire, et divisez optionnellement le total entre plusieurs personnes. Les boutons de sélection rapide pour les pourcentages courants (10%, 15%, 18%, 20%, 25%) permettent de calculer en quelques secondes. La calculatrice affiche le montant du pourboire, le total et la part par personne.\n\nLes habitudes de pourboire varient considérablement selon les pays. En France, le service est légalement inclus dans l\'addition (15%), donc un pourboire supplémentaire n\'est pas attendu, mais toujours bienvenu pour un bon service. Aux États-Unis, 15–20% est la norme absolue et les employés dépendent souvent de ces pourboires. Au Japon et dans une grande partie de l\'Asie, le pourboire n\'est pas dans les traditions et peut même être malvenu.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quel pourboire laisser au restaurant ?', a: 'En France, le service (15%) est légalement inclus dans l\'addition. Un pourboire supplémentaire n\'est pas obligatoire mais apprécié — arrondir l\'addition ou laisser 5–10% est courant pour un bon service. Aux États-Unis, 15–20% est la norme.' },
      { q: 'Comment calculer 20% de pourboire mentalement ?', a: 'Trouvez 10% (déplacez la virgule d\'un rang vers la gauche) et doublez. Par exemple, addition de 45€ : 10% = 4,50€, × 2 = 9€. Total avec pourboire = 54€.' },
      { q: 'Le pourboire se calcule-t-il sur le montant HT ou TTC ?', a: 'En pratique, le pourboire se calcule généralement sur le montant TTC affiché sur l\'addition. La différence avec le montant HT est minime.' },
      { q: 'Comment partager l\'addition équitablement ?', a: 'Entrez le montant, le pourcentage de pourboire et le nombre de personnes. La calculatrice divise le total (addition + pourboire) également. Exemple : 100€ + 20% = 120€ ÷ 4 = 30€ par personne.' },
      { q: 'Quel pourboire pour la livraison ?', a: 'Pour la livraison de repas, 10–15% du total de la commande est courant, avec un minimum de 2–3€ pour les petites commandes.' },
      { q: 'Le pourboire est-il inclus dans l\'addition en Europe ?', a: 'En France, le service légal ("service compris") est inclus dans les prix. Au Royaume-Uni, certains restaurants ajoutent un service discrétionnaire de 12,5% — vérifiez l\'addition pour éviter de doubler. En Allemagne et aux Pays-Bas, arrondir ou laisser 5–10% est courant mais pas obligatoire.' },
      { q: 'Faut-il laisser un pourboire dans un café ou un fast-food ?', a: 'Dans les cafés et établissements de service, arrondir ou laisser 1–2€ est courant pour un bon service. Dans le fast-food classique avec commande au comptoir, le pourboire n\'est généralement pas attendu.' },
      { q: 'Combien laisser au chauffeur de taxi ou VTC ?', a: 'Pour les taxis et VTC (Uber, Bolt) en France, 10–15% est courant, ou simplement arrondir à l\'euro. Aux États-Unis, 15–20% est la norme absolue.' },
      { q: 'Quel est l\'étiquette pour les pourboires à l\'hôtel ?', a: 'Femme de chambre : 1–3€ par nuit, idéalement quotidiennement. Porteur : 1–2€ par bagage. Concierge : 5–15€ pour des réservations importantes. Room service : 10–15% si non inclus dans la note.' },
      { q: 'Est-il acceptable de ne pas laisser de pourboire ?', a: 'En France, il est tout à fait acceptable de ne pas laisser de pourboire puisque le service est inclus. Dans les pays où le pourboire est une norme culturelle (États-Unis, Canada), l\'absence de pourboire signale une forte insatisfaction. Au Japon, ne pas laisser de pourboire est la norme.' },
    ],
  },
  lt: {
    description: 'Įveskite sąskaitos sumą, pasirinkite arba įveskite arbatpinigių procentą ir neprivaloma padalinkite sumą tarp kelių žmonių. Greito pasirinkimo mygtukai dažniausioms reikšmėms (10%, 15%, 18%, 20%, 25%) leidžia apskaičiuoti per kelias sekundes. Skaičiuotuvas rodo arbatpinigių sumą, bendrą sąskaitą ir kiekvieno dalį.\n\nArbatpinigių tradicijos labai skiriasi visame pasaulyje. JAV ir Kanadoje 15–20% yra standartas — daugeliui paslaugų darbuotojų arbatpinigiai sudaro didelę pajamų dalį. Vakarų Europoje arbatpinigiai vertinami, bet nėra privalomi — paprastai apvalinama sąskaita arba paliekama 5–10%. Japonijoje ir Pietų Korėjoje arbatpinigiai nėra tradicija ir gali sukelti nepatogumą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek arbatpinigių palikti restorane?', a: 'JAV standartas — 15–20% už aptarnavimą. Europoje arbatpinigiai nėra privalomi — dažniausiai apvalinama sąskaita arba paliekama 5–10%. Japonijoje arbatpinigiai nepriimtini.' },
      { q: 'Kaip greitai apskaičiuoti 20% arbatpinigius?', a: 'Raskite 10% (perkelkite kablelį į kairę) ir padvigubinkite. Pavyzdžiui, 45€ sąskaita: 10% = 4,50€, × 2 = 9€. Viso su arbatpinigiais: 54€.' },
      { q: 'Ar arbatpinigiai skaičiuojami nuo sumos be PVM ar su PVM?', a: 'Praktikoje arbatpinigiai paprastai skaičiuojami nuo galutinės sąskaitos sumos. Skirtumas yra minimalus.' },
      { q: 'Kaip padalinti sąskaitą lygiomis dalimis?', a: 'Įveskite sąskaitos sumą, arbatpinigių procentą ir žmonių skaičių. Skaičiuotuvas padalins bendrą sumą (sąskaita + arbatpinigiai) lygiomis dalimis.' },
      { q: 'Kokie arbatpinigiai priimti pristatymui?', a: 'Maisto pristatymui standartas — 10–15% nuo užsakymo sumos, bet ne mažiau kaip 2–3€ mažiems užsakymams.' },
      { q: 'Ar Europoje arbatpinigiai įtraukti į sąskaitą?', a: 'Prancūzijoje aptarnavimo mokestis 15% įtrauktas į kainą pagal įstatymą ("service compris"). JK kai kurie restoranai prideda 12,5% diskrecinį mokestį — patikrinkite sąskaitą. Lietuvoje aptarnavimo mokestis kartais įtraukiamas automatiškai.' },
      { q: 'Ar reikia palikti arbatpinigius kavinėje ar greito maisto restorane?', a: 'Kavinėse 10–15% arba nedidelis apvalinimas tampa norma. Klasikiniame greitojo maisto restorane prie kasos arbatpinigiai nesitikima.' },
      { q: 'Kiek arbatpinigių palikti taksi vairuotojui ar Bolt vairuotojui?', a: 'Lietuvoje arbatpinigiai taksi vairuotojams nėra tradicija, tačiau 1–2€ už gerą kelionę vertinami. JAV standartas — 15–20%.' },
      { q: 'Koks viešbučio arbatpinigių etiketas?', a: 'Kambarinei: 2–5€ per naktį, geriausia kasdien, nes personalas keičiasi. Nešikui: 1–2€ už bagažą. Konsiergui: 5–15€ už ypatingas paslaugas. Kambarinis aptarnavimas: 10–15%, jei neįtraukta į sąskaitą.' },
      { q: 'Kada priimtina nepalikti arbatpinigių?', a: 'Šalyse, kur arbatpinigiai yra kultūrinė norma (JAV, Kanada), arbatpinigių nepalikimas yra stiprus nepasitenkinimo signalas. Europos šalyse priimtina nepalikti papildomų, ypač jei aptarnavimo mokestis jau įtrauktas. Japonijoje ir didžiojoje Azijos dalyje nepalikti arbatpinigių yra visiškai normalu.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/tip', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TipPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/tip`,
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
        <TipCalculator locale={locale} />
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
