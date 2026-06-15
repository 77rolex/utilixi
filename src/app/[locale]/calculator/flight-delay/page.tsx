import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import FlightDelayCalculator from './FlightDelayCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/traffic-fine', label: 'Traffic Fine Calculator' }, { href: '/calculator/limitation', label: 'Statute of Limitations' }, { href: '/calculator/alimony', label: 'Alimony Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/salary', label: 'Salary Calculator' }],
  ru: [{ href: '/calculator/traffic-fine', label: 'Штрафы ПДД' }, { href: '/calculator/limitation', label: 'Срок исковой давности' }, { href: '/calculator/alimony', label: 'Калькулятор алиментов' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/salary', label: 'Калькулятор зарплаты' }],
  uk: [{ href: '/calculator/traffic-fine', label: 'Штрафи ПДР' }, { href: '/calculator/limitation', label: 'Строк позовної давності' }, { href: '/calculator/alimony', label: 'Калькулятор аліментів' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/salary', label: 'Калькулятор зарплати' }],
  fr: [{ href: '/calculator/traffic-fine', label: 'Calculateur d\'amendes routières' }, { href: '/calculator/limitation', label: 'Délai de prescription' }, { href: '/calculator/alimony', label: 'Calculatrice de pension alimentaire' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/salary', label: 'Calculatrice de salaire' }],
  lt: [{ href: '/calculator/traffic-fine', label: 'Eismo baudų skaičiuotuvas' }, { href: '/calculator/limitation', label: 'Ieškinio senaties terminas' }, { href: '/calculator/alimony', label: 'Alimentų skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Flight Delay Compensation Calculator — EU261 & UK261',
    description: 'Check if you are entitled to flight delay compensation under EU Regulation 261/2004 or UK261. Find out how much you can claim — €250, €400 or €600 — based on flight distance and delay duration.',
    h1: 'Flight Delay Compensation Calculator',
    subtitle: 'Find out how much EU261 compensation you are entitled to for a delayed or cancelled flight.',
  },
  ru: {
    title: 'EU261 — Компенсация за задержку рейса €250–€600 онлайн',
    description: 'Калькулятор EU261: проверьте право на компенсацию за задержку или отмену рейса. Сумма €250, €400 или €600 в зависимости от расстояния. Бесплатный расчёт онлайн по Регламенту ЕС 261/2004.',
    h1: 'Калькулятор компенсации за задержку рейса EU261',
    subtitle: 'Узнайте размер компенсации по EU261 за задержку или отмену рейса.',
  },
  uk: {
    title: 'Компенсація за затримку рейсу — EU261/2004 онлайн',
    description: 'Перевірте право на компенсацію за затримку рейсу згідно з Регламентом ЄС 261/2004. Дізнайтеся суму — €250, €400 або €600 — залежно від дальності та затримки. Безкоштовний розрахунок онлайн.',
    h1: 'Калькулятор компенсації за затримку рейсу',
    subtitle: 'Дізнайтеся розмір компенсації за правилами ЄС261 за затримку або скасування рейсу.',
  },
  fr: {
    title: 'Calculateur Indemnisation Retard de Vol — UE 261/2004 gratuit',
    description: 'Vérifiez si vous avez droit à une indemnisation pour retard de vol selon le règlement UE 261/2004. Découvrez le montant — €250, €400 ou €600 — selon la distance et le retard. Calcul gratuit en ligne.',
    h1: 'Calculateur d\'indemnisation retard de vol',
    subtitle: 'Découvrez votre indemnisation EU261 pour un vol retardé ou annulé.',
  },
  lt: {
    title: 'Skrydžio Vėlavimo Kompensacijos Skaičiuotuvas — ES 261/2004',
    description: 'Patikrinkite, ar turite teisę gauti kompensaciją už skrydžio vėlavimą pagal ES reglamentą 261/2004. Sužinokite sumą — €250, €400 ar €600. Nemokamas skaičiavimas internetu.',
    h1: 'Skrydžio vėlavimo kompensacijos skaičiuotuvas',
    subtitle: 'Sužinokite, kokia ES261 kompensacija jums priklauso už vėluojantį ar atšauktą skrydį.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'EU Regulation 261/2004 entitles passengers to financial compensation when their flight is delayed by 3 hours or more at the destination, cancelled, or they are denied boarding. This calculator estimates your compensation based on the route type, delay duration, and flight distance. Note that airlines can reduce compensation by 50% if they offer re-routing that keeps your final arrival delay below 2–4 hours (depending on distance).\n\nSince Brexit, UK passengers have their own equivalent — UK Regulation 261 (UK261) — which mirrors EU261 for flights departing UK airports. UK261 applies to all airlines on flights from UK airports, and to UK-licensed carriers on flights arriving into the UK. UK passengers can claim in GBP at approximately £220, £350 and £520 (the GBP equivalents of the EUR amounts). Both EU261 and UK261 are enforced, and claims can be submitted directly to the airline or via the national aviation authority.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'When am I entitled to flight delay compensation?', a: 'You are entitled to compensation under EU261/2004 if: (1) your flight departs from an EU airport (any airline); or (2) your flight arrives at an EU airport operated by an EU-based carrier — AND you arrive at your final destination with a delay of 3 hours or more (measured as actual arrival time vs scheduled arrival). Cancellations and denied boarding also qualify. Under UK261 (post-Brexit), the same rules apply for flights departing UK airports.' },
      { q: 'How much compensation can I claim?', a: '€250 for flights up to 1,500 km; €400 for flights between 1,500 and 3,500 km; €400 for intra-EU flights over 3,500 km; €600 for non-EU flights over 3,500 km. Airlines can reduce compensation by 50% if they offer re-routing and your arrival is within 2 hours (short-haul), 3 hours (medium-haul), or 4 hours (long-haul) of the original scheduled time. Under UK261, equivalent amounts are approximately £220, £350, and £520.' },
      { q: 'What is UK261 and how does it differ from EU261?', a: 'UK261 is the UK\'s post-Brexit equivalent of EU Regulation 261/2004, retained in UK law after the UK left the EU. It applies to: all flights departing from a UK airport (any airline); and flights arriving at a UK airport operated by a UK-licensed carrier. The compensation amounts are the same as EU261 but quoted in GBP (approximately £220/£350/£520). If your flight departs from an EU airport and arrives in the UK, EU261 applies (not UK261). Both regulations can apply simultaneously on some UK-EU routes.' },
      { q: 'What are extraordinary circumstances?', a: 'Extraordinary circumstances exempt the airline from paying compensation. These include: severe weather (storms, heavy snow, lightning affecting aircraft); political instability or security risks at the airport; unexpected air traffic control restrictions; hidden manufacturing defects not detectable during normal maintenance; and strikes by airport staff or air traffic control (not airline staff). Crucially, technical faults with the aircraft generally do NOT qualify as extraordinary circumstances — the airline must prove the cause was genuinely outside their control.' },
      { q: 'Does EU261 apply to all flights?', a: 'EU261 applies to: all flights departing from an EU/EEA airport (any airline); and flights arriving at an EU/EEA airport operated by an EU/EEA-licensed carrier. It does NOT apply to flights outside the EU operated by non-EU airlines — e.g. an American airline flying New York to Dubai. UK261 applies to all flights departing UK airports (any airline), and to UK-licensed carriers arriving at UK airports.' },
      { q: 'How long do I have to claim flight delay compensation?', a: 'Time limits vary by country and carrier. EU261/UK261 do not specify a universal time limit — it is determined by national law. In the UK: 6 years (England & Wales), 5 years (Scotland). In France: 5 years. In Germany: 3 years. In Spain, Italy, and most EU states: 2–5 years. Some airlines have internal deadlines of 2–3 years. Always file as soon as possible after the disruption — the sooner you claim, the more evidence you have.' },
      { q: 'Can I claim for a cancelled flight?', a: 'Yes. A cancelled flight entitles you to the same compensation as a delay (€250/400/600) unless: (a) the airline informed you of the cancellation 14 days or more before departure; or (b) the cancellation was due to extraordinary circumstances. You are also entitled to choose between a full refund of your ticket or re-routing to your destination at the earliest opportunity, plus meals and refreshments if the wait exceeds 2 hours.' },
      { q: 'Does the delay need to be the airline\'s fault?', a: 'No — EU261/UK261 compensation is based on the passenger\'s experience (the delay), not on fault. The only exception is extraordinary circumstances (weather, security, etc.) which relieve the airline of the compensation obligation. However, even with extraordinary circumstances, the airline must still offer you a choice of refund or re-routing, and provide care (meals, accommodation if overnight stay is required).' },
      { q: 'How do I claim flight delay compensation?', a: 'Step 1: File a written complaint directly with the airline, citing EU Regulation 261/2004 (or UK261 for UK flights). Keep all boarding passes, booking confirmations, and evidence of actual arrival time (baggage receipts, taxi receipts, etc.). Step 2: If the airline refuses or doesn\'t respond within 6–8 weeks, escalate to the national aviation authority: CAA (UK), DGAC (France), Luftfahrt-Bundesamt (Germany), ENAC (Italy). Step 3: Use Alternative Dispute Resolution (ADR) — in the UK, the CAA\'s PACT scheme or CEDR. You can also use a claims management company (typically 25–35% commission on the payout).' },
      { q: 'Do I need a compensation company to claim?', a: 'No — you can claim directly from the airline at no cost. Write to the airline\'s customer service team, reference EU261/2004 (or UK261), and state the delay, route, and amount you\'re entitled to. If the airline rejects the claim, escalate to the relevant authority. Compensation companies (AirHelp, Flightright, ClaimCompass etc.) handle the process for you in exchange for 25–35% of the payout. They are useful if the airline disputes the claim or if you don\'t want to deal with the process yourself.' },
    ],
  },
  ru: {
    description: 'Регламент ЕС 261/2004 даёт пассажирам право на компенсацию при задержке рейса на 3 и более часов в пункте назначения, отмене рейса или отказе в посадке. Используйте калькулятор, чтобы оценить сумму компенсации в зависимости от типа маршрута, длительности задержки и дальности рейса. Авиакомпании могут снизить компенсацию на 50%, если предложат альтернативный маршрут с ограниченной итоговой задержкой.\n\nРегламент EU261/2004 распространяется на рейсы из аэропортов ЕС (любая авиакомпания) и рейсы в ЕС авиакомпаниями ЕС. После Brexit в Великобритании действует аналогичный UK261. Все результаты носят информационный характер — при отказе авиакомпании обращайтесь в национальный авиационный орган.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Когда я имею право на компенсацию?', a: 'Право на компенсацию по EU261/2004 возникает, если ваш рейс вылетает из аэропорта ЕС (любая авиакомпания) или прибывает в ЕС авиакомпанией ЕС, и вы прибыли в конечный пункт с задержкой 3 часа и более. Также применяется при отмене рейса и отказе в посадке.' },
      { q: 'Какова сумма компенсации?', a: '€250 — рейсы до 1500 км; €400 — 1500–3500 км; €400 — внутри ЕС свыше 3500 км; €600 — за пределы ЕС свыше 3500 км. Суммы могут быть снижены на 50%, если авиакомпания предложила альтернативный маршрут и итоговая задержка составила менее 2–4 часов в зависимости от дальности.' },
      { q: 'Что такое UK261 и чем он отличается от EU261?', a: 'UK261 — британский аналог EU261/2004, сохранённый в законодательстве Великобритании после Brexit. Применяется ко всем рейсам из британских аэропортов (любая авиакомпания) и рейсам в Великобританию авиакомпаниями с британской лицензией. Суммы компенсации те же, но в фунтах: примерно £220, £350 и £520.' },
      { q: 'Что такое чрезвычайные обстоятельства?', a: 'Чрезвычайные обстоятельства освобождают авиакомпанию от выплаты компенсации: сильные штормы, политическая нестабильность, угрозы безопасности, непредвиденные решения по управлению воздушным движением, забастовки персонала аэропорта или диспетчеров (не по вине авиакомпании). Технические неисправности, как правило, НЕ являются чрезвычайными обстоятельствами.' },
      { q: 'На какие рейсы распространяется EU261?', a: 'EU261 применяется к: (1) всем рейсам из аэропортов ЕС/ЕЭЗ (любая авиакомпания); (2) рейсам в ЕС авиакомпаний ЕС. Не применяется к рейсам за пределами ЕС не-ЕС авиакомпаний.' },
      { q: 'Сколько времени есть на подачу претензии?', a: 'Срок зависит от страны. В странах ЕС: как правило, 2–5 лет (по нормам давности гражданского права). В Великобритании: 6 лет (Англия/Уэльс), 5 лет (Шотландия). Во Франции: 5 лет. В Германии: 3 года. Подавайте претензию как можно раньше — доказательная база свежее, а некоторые авиакомпании имеют внутренние сроки 2–3 года.' },
      { q: 'Можно ли получить компенсацию за отменённый рейс?', a: 'Да. Отменённый рейс даёт те же права, что и задержка (€250/400/600), если авиакомпания не уведомила вас за 14 или более дней до вылета и причиной не стали чрезвычайные обстоятельства. Помимо компенсации, вы вправе выбрать возврат стоимости билета или альтернативный маршрут, а также питание и напитки при ожидании свыше 2 часов.' },
      { q: 'Нужна ли вина авиакомпании для получения компенсации?', a: 'Нет. Компенсация по EU261/UK261 основана на факте задержки, а не на вине авиакомпании. Исключение — чрезвычайные обстоятельства, которые освобождают от компенсации. Но даже при чрезвычайных обстоятельствах авиакомпания обязана предложить выбор: возврат денег или перебронирование, а также обеспечить питанием и размещением при необходимости.' },
      { q: 'Как подать заявку на компенсацию?', a: 'Шаг 1: направьте письменную претензию в авиакомпанию, ссылаясь на Регламент ЕС 261/2004 (или UK261 для британских рейсов). Сохраните посадочные талоны, бронирование и доказательства задержки. Шаг 2: если авиакомпания отказала или не ответила в течение 6–8 недель — обратитесь в национальный авиационный орган или орган по альтернативному урегулированию споров. Шаг 3: при необходимости — подайте иск в суд или воспользуйтесь услугами компании по взысканию компенсаций.' },
      { q: 'Нужна ли компания по возмещению компенсаций?', a: 'Нет — претензию можно подать напрямую в авиакомпанию бесплатно. Компании-посредники (AirHelp, Flightright и др.) берут 25–35% от суммы компенсации. Они полезны при споре с авиакомпанией или если вы не хотите заниматься процессом самостоятельно. В любом случае — сначала попробуйте напрямую.' },
    ],
  },
  uk: {
    description: 'Регламент ЄС 261/2004 надає пасажирам право на компенсацію при затримці рейсу на 3 і більше годин у пункті призначення, скасуванні або відмові у посадці. Використовуйте калькулятор для оцінки суми компенсації залежно від типу маршруту та затримки. Авіакомпанії можуть зменшити компенсацію на 50%, якщо запропонують альтернативний маршрут з обмеженою підсумковою затримкою.\n\nРегламент EU261/2004 поширюється на рейси з аеропортів ЄС (будь-яка авіакомпанія) та рейси до ЄС авіакомпаніями ЄС. Після Brexit у Великій Британії діє аналогічний UK261. Всі результати мають інформаційний характер.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Коли я маю право на компенсацію?', a: 'Право на компенсацію по EU261/2004 виникає, якщо ваш рейс вилітає з аеропорту ЄС (будь-яка авіакомпанія) або прибуває до ЄС авіакомпанією ЄС, і ви прибули до кінцевого пункту із затримкою 3 і більше годин. Також застосовується при скасуванні рейсу та відмові у посадці.' },
      { q: 'Яка сума компенсації?', a: '€250 — рейси до 1500 км; €400 — 1500–3500 км; €400 — всередині ЄС понад 3500 км; €600 — за межі ЄС понад 3500 км. Суми можуть бути зменшені на 50%, якщо авіакомпанія запропонувала альтернативний маршрут.' },
      { q: 'Що таке UK261 і чим він відрізняється від EU261?', a: 'UK261 — британський аналог EU261/2004, збережений у законодавстві після Brexit. Поширюється на всі рейси з британських аеропортів (будь-яка авіакомпанія) та рейси до Великої Британії авіакомпаніями з британською ліцензією. Суми компенсації ті ж, але у фунтах: приблизно £220, £350 і £520.' },
      { q: 'Що таке надзвичайні обставини?', a: 'Надзвичайні обставини звільняють авіакомпанію від виплати компенсації: сильні шторми, політична нестабільність, загрози безпеці, непередбачені рішення щодо управління повітряним рухом, страйки персоналу аеропорту (не з вини авіакомпанії). Технічні несправності, як правило, НЕ є надзвичайними обставинами.' },
      { q: 'На які рейси поширюється EU261?', a: 'EU261 застосовується до: (1) всіх рейсів з аеропортів ЄС/ЄЕЗ (будь-яка авіакомпанія); (2) рейсів до ЄС авіакомпаній ЄС. Не застосовується до рейсів за межами ЄС не-ЄС авіакомпаній.' },
      { q: 'Скільки часу є на подання претензії?', a: 'Строк залежить від країни. В країнах ЄС: як правило, 2–5 років. У Великій Британії: 6 років (Англія/Уельс), 5 років (Шотландія). У Франції: 5 років. Подавайте претензію якомога раніше.' },
      { q: 'Чи можна отримати компенсацію за скасований рейс?', a: 'Так. Скасований рейс дає ті ж права, що і затримка (€250/400/600), якщо авіакомпанія не повідомила вас за 14 або більше днів до вильоту і причиною не стали надзвичайні обставини. Крім компенсації, ви маєте право вибрати повернення вартості квитка або альтернативний маршрут, а також харчування при очікуванні понад 2 години.' },
      { q: 'Чи потрібна вина авіакомпанії?', a: 'Ні. Компенсація базується на факті затримки, а не на вині авіакомпанії. Виняток — надзвичайні обставини. Але навіть тоді авіакомпанія зобов\'язана запропонувати повернення коштів або перебронювання, а також забезпечити харчуванням і розміщенням.' },
      { q: 'Як подати заявку на компенсацію?', a: 'Крок 1: направте письмову претензію до авіакомпанії, посилаючись на Регламент ЄС 261/2004. Збережіть посадкові талони та докази затримки. Крок 2: якщо авіакомпанія відмовила або не відповіла протягом 6–8 тижнів — зверніться до національного авіаційного органу або органу альтернативного вирішення спорів.' },
      { q: 'Чи потрібна компанія з відшкодування компенсацій?', a: 'Ні — претензію можна подати безпосередньо до авіакомпанії безкоштовно. Компанії-посередники (AirHelp, Flightright тощо) беруть 25–35% від суми. Вони корисні при суперечці з авіакомпанією. Спочатку спробуйте самостійно.' },
    ],
  },
  fr: {
    description: 'Le règlement UE 261/2004 donne aux passagers le droit à une indemnisation lorsque leur vol est retardé de 3 heures ou plus à destination, annulé ou en cas de refus d\'embarquement. Ce calculateur estime le montant en fonction du type de trajet, de la durée du retard et de la distance. Les compagnies peuvent réduire l\'indemnisation de 50% si elles proposent un réacheminement limitant le retard final.\n\nDepuis le Brexit, le Royaume-Uni dispose de son propre règlement UK261, identique à EU261 pour les vols au départ des aéroports britanniques. Pour les vols au départ d\'un aéroport de l\'UE à destination du Royaume-Uni, c\'est le règlement UE 261/2004 qui s\'applique. Les résultats sont indicatifs — en cas de refus, saisissez la DGAC ou la DGCCRF.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quand ai-je droit à une indemnisation ?', a: 'Vous avez droit à une indemnisation si votre vol part d\'un aéroport de l\'UE (toute compagnie) ou arrive dans l\'UE avec une compagnie européenne, et que vous arrivez à destination avec 3 heures ou plus de retard. Les annulations et refus d\'embarquement sont également concernés.' },
      { q: 'Quel est le montant de l\'indemnisation ?', a: '€250 pour les vols jusqu\'à 1 500 km ; €400 pour 1 500–3 500 km ; €400 pour les vols intra-UE de plus de 3 500 km ; €600 pour les vols hors UE de plus de 3 500 km. Ces montants peuvent être réduits de 50 % si la compagnie propose un réacheminement.' },
      { q: 'Qu\'est-ce que le règlement UK261 ?', a: 'UK261 est l\'équivalent britannique post-Brexit du règlement UE 261/2004. Il s\'applique à tous les vols au départ des aéroports britanniques (toute compagnie) et aux vols à destination du Royaume-Uni opérés par des compagnies britanniques. Les montants sont les mêmes mais en livres sterling : environ £220, £350 et £520. Pour les vols depuis l\'UE vers le Royaume-Uni, c\'est EU261 qui s\'applique.' },
      { q: 'Que sont les circonstances extraordinaires ?', a: 'Les circonstances extraordinaires exonèrent la compagnie du paiement : météo extrême, instabilité politique, menaces sécuritaires, décisions imprévisibles de gestion du trafic aérien, grèves du personnel aéroportuaire ou des contrôleurs aériens (non imputables à la compagnie). Les pannes techniques ne constituent généralement PAS des circonstances extraordinaires.' },
      { q: 'EU261 s\'applique-t-il à tous les vols ?', a: 'EU261 s\'applique à tous les vols au départ d\'un aéroport de l\'UE/EEE (toute compagnie) et aux vols à destination de l\'UE opérés par une compagnie européenne. Il ne s\'applique pas aux vols hors UE opérés par des compagnies non européennes.' },
      { q: 'Quel est le délai pour réclamer une indemnisation ?', a: 'Le délai varie selon les pays. En France : 5 ans. En Allemagne : 3 ans. En Espagne et Italie : 2 ans. Au Royaume-Uni : 6 ans. Déposez votre réclamation le plus tôt possible après l\'incident — vous avez plus de preuves et certaines compagnies appliquent des délais internes de 2–3 ans.' },
      { q: 'Puis-je réclamer pour un vol annulé ?', a: 'Oui. Un vol annulé ouvre droit à la même indemnisation (€250/400/600), sauf si la compagnie vous a informé 14 jours avant ou si l\'annulation est due à des circonstances extraordinaires. Vous avez également droit au choix entre remboursement intégral et réacheminement, plus repas et hébergement si nécessaire.' },
      { q: 'Faut-il une faute de la compagnie pour être indemnisé ?', a: 'Non. L\'indemnisation EU261/UK261 est basée sur l\'expérience du passager (le retard), pas sur la faute. La seule exception est les circonstances extraordinaires. Même dans ce cas, la compagnie doit offrir le choix entre remboursement et réacheminement, et assurer la prise en charge (repas, hébergement si nécessaire).' },
      { q: 'Comment réclamer mon indemnisation ?', a: 'Étape 1 : déposez une réclamation écrite auprès de la compagnie en citant le règlement UE 261/2004. Conservez vos cartes d\'embarquement et preuves de retard. Étape 2 : en cas de refus après 6–8 semaines, saisissez la DGAC (Direction Générale de l\'Aviation Civile) ou un organisme de règlement alternatif des litiges (DGCCRF, médiateur du tourisme). Étape 3 : recours judiciaire ou société de réclamation.' },
      { q: 'Faut-il passer par une société de réclamation ?', a: 'Non — vous pouvez réclamer directement à la compagnie gratuitement. Les sociétés comme AirHelp, Flightright ou Indemniflight prennent en charge le processus pour 25–35 % du montant. Elles sont utiles si la compagnie conteste votre réclamation. Essayez d\'abord vous-même — de nombreuses compagnies règlent rapidement les demandes claires.' },
    ],
  },
  lt: {
    description: 'ES reglamentas 261/2004 suteikia keleiviams teisę į kompensaciją, kai skrydis vėluoja 3 ar daugiau valandų, atšaukiamas arba atsisakoma įlaipinti. Naudokite šį skaičiuotuvą kompensacijos sumai įvertinti pagal maršruto tipą, vėlavimo trukmę ir atstumą. Aviakompanija gali sumažinti kompensaciją 50%, jei pasiūlys alternatyvų maršrutą su ribotu galutiniu vėlavimu.\n\nPo Brexit Jungtinė Karalystė turi savo analogą — UK261, kuris atitinka EU261 skrydžiams iš JK oro uostų. Skrydžiams iš ES oro uostų į JK taikomas EU261. Visi rezultatai yra orientaciniai — atsisakius, kreipkitės į nacionalinę aviacijos instituciją.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kada turiu teisę į kompensaciją?', a: 'Turite teisę į kompensaciją, jei jūsų skrydis išvyksta iš ES oro uosto (bet kuri aviakompanija) arba atvyksta į ES su ES aviakompanija, ir atvykstate į galutinį tikslą su 3 ar daugiau valandų vėlavimu. Taip pat taikoma atšaukus skrydį ar atsisakius įlaipinti.' },
      { q: 'Kokia kompensacijos suma?', a: '€250 – skrydžiams iki 1500 km; €400 – 1500–3500 km; €400 – ES vidaus skrydžiams per 3500 km; €600 – skrydžiams už ES ribų per 3500 km. Sumos gali būti sumažintos 50%, jei aviakompanija pasiūlė alternatyvų maršrutą.' },
      { q: 'Kas yra UK261?', a: 'UK261 yra Jungtinės Karalystės atitikmuo ES 261/2004, išlaikytas JK teisėje po Brexit. Taikomas visiems skrydžiams iš JK oro uostų (bet kuri aviakompanija) ir skrydžiams į JK, vykdomiems JK licencijuotų aviakompanijų. Sumos tokios pačios, bet svarais: apytiksliai £220, £350 ir £520.' },
      { q: 'Kas yra ypatingos aplinkybės?', a: 'Ypatingos aplinkybės atleidžia aviakompaniją nuo kompensacijos: stiprios audros, politinis nestabilumas, saugumo grėsmės, nenumatyti oro eismo valdymo sprendimai, streikai (ne dėl aviakompanijos kaltės). Techniniai gedimai paprastai NĖRA ypatingos aplinkybės.' },
      { q: 'Ar EU261 taikomas visiems skrydžiams?', a: 'EU261 taikomas: (1) visiems skrydžiams iš ES/EEE oro uostų; (2) skrydžiams į ES, vykdomiems ES aviakompanijų. Netaikomas skrydžiams už ES ribų, vykdomiems ne ES aviakompanijų.' },
      { q: 'Kiek laiko turiu pateikti reikalavimą?', a: 'Terminas priklauso nuo šalies. Lietuvoje: 3 metai (pagal bendrą senaties terminą). Vokietijoje: 3 metai. Prancūzijoje: 5 metai. JK: 6 metai. Pateikite reikalavimą kuo greičiau po incidento.' },
      { q: 'Ar galiu reikalauti kompensacijos už atšauktą skrydį?', a: 'Taip. Atšauktas skrydis suteikia teisę į tą pačią kompensaciją (€250/400/600), nebent aviakompanija pranešė 14 ar daugiau dienų prieš išvykimą arba atšaukimas įvyko dėl ypatingų aplinkybių. Taip pat turite teisę pasirinkti: bilieto grąžinimas arba alternatyvus maršrutas, bei maitinimas laukiant.' },
      { q: 'Ar reikia aviakompanijos kaltės?', a: 'Ne. Kompensacija grindžiama keleivio patirtimi (vėlavimu), o ne aviakompanijos kaltė. Išimtis — ypatingos aplinkybės. Net ir tokiu atveju aviakompanija privalo pasiūlyti grąžinimą arba perkėlimą ir užtikrinti priežiūrą.' },
      { q: 'Kaip pateikti kompensacijos prašymą?', a: '1 žingsnis: pateikite rašytinį skundą aviakompanijai, nurodydami ES reglamentą 261/2004. Išsaugokite įlaipinimo korteles ir vėlavimo įrodymus. 2 žingsnis: atsisakius po 6–8 savaičių — kreipkitės į Civilinės aviacijos administraciją (CAA) arba alternatyvaus ginčų sprendimo įstaigą.' },
      { q: 'Ar reikia kompensacijų bendrovės?', a: 'Ne — reikalavimą galite pateikti tiesiogiai aviakompanijai nemokamai. Tarpininkų bendrovės (AirHelp, Flightright) ima 25–35% sumos. Jos naudingos, jei aviakompanija ginčija reikalavimą. Pirmiausia pabandykite patys.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/flight-delay', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function FlightDelayPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/flight-delay`,
    applicationCategory: 'UtilitiesApplication',
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
        <RelatedTools locale={locale} tools={related} />
        <FlightDelayCalculator locale={locale} />
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
