import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import TravelBudgetCalculator from './TravelBudgetCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/savings-goal', label: 'Savings Goal Calculator' },
    { href: '/calculator/currency', label: 'Currency Converter' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
    { href: '/calculator/roi', label: 'ROI Calculator' },
    { href: '/calculator/party-food', label: 'Party Food Calculator' },
  ],
  ru: [
    { href: '/calculator/savings-goal', label: 'Калькулятор накоплений' },
    { href: '/currency', label: 'Конвертер валют' },
    { href: '/calculator/net-worth', label: 'Калькулятор капитала' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/party-food', label: 'Калькулятор продуктов' },
  ],
  uk: [
    { href: '/calculator/savings-goal', label: 'Калькулятор накопичень' },
    { href: '/currency', label: 'Конвертер валют' },
    { href: '/calculator/net-worth', label: 'Калькулятор капіталу' },
    { href: '/calculator/roi', label: 'Калькулятор ROI' },
    { href: '/calculator/party-food', label: 'Калькулятор продуктів' },
  ],
  fr: [
    { href: '/calculator/savings-goal', label: 'Calculatrice Objectif Épargne' },
    { href: '/currency', label: 'Convertisseur de Devises' },
    { href: '/calculator/net-worth', label: 'Calculatrice Valeur Nette' },
    { href: '/calculator/roi', label: 'Calculatrice ROI' },
    { href: '/calculator/party-food', label: 'Calculatrice Buffet' },
  ],
  lt: [
    { href: '/calculator/savings-goal', label: 'Taupymo tikslo skaičiuotuvas' },
    { href: '/currency', label: 'Valiutų keitiklis' },
    { href: '/calculator/net-worth', label: 'Grynosios vertės skaičiuotuvas' },
    { href: '/calculator/roi', label: 'RI skaičiuotuvas' },
    { href: '/calculator/party-food', label: 'Vakarėlio maisto skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Travel Budget Calculator — Plan Trip Costs',
    description: 'Free travel budget calculator. Estimate total trip cost, cost per person, and daily budget for any number of travelers and days. Includes accommodation, food, transport, and activities.',
    h1: 'Travel Budget Calculator',
  },
  ru: {
    title: 'Калькулятор бюджета путешествия — план расходов',
    description: 'Бесплатный калькулятор бюджета путешествия. Оцените общую стоимость поездки, расходы на человека и дневной бюджет для любого количества путешественников и дней.',
    h1: 'Калькулятор бюджета путешествия',
  },
  uk: {
    title: 'Калькулятор бюджету подорожі — план витрат',
    description: 'Безкоштовний калькулятор бюджету подорожі. Оцініть загальну вартість поїздки, витрати на людину та добовий бюджет для будь-якої кількості мандрівників і днів.',
    h1: 'Калькулятор бюджету подорожі',
  },
  fr: {
    title: 'Calculatrice Budget Voyage — Planifier Ses Dépenses',
    description: 'Calculatrice de budget voyage gratuite. Estimez le coût total du voyage, le coût par personne et le budget journalier pour n\'importe quel nombre de voyageurs et de jours.',
    h1: 'Calculatrice Budget Voyage',
  },
  lt: {
    title: 'Kelionės Biudžeto Skaičiuotuvas — Planuokite Išlaidas',
    description: 'Nemokamas kelionės biudžeto skaičiuotuvas. Įvertinkite bendrą kelionės kainą, išlaidas vienam asmeniui ir dienos biudžetą bet kuriam keliautojų ir dienų skaičiui.',
    h1: 'Kelionės Biudžeto Skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our travel budget calculator helps you plan and estimate the total cost of any trip, whether a weekend getaway, a two-week family holiday, or an extended backpacking adventure. Enter the number of travelers and days, then fill in your estimates for accommodation, food, transportation, activities, and miscellaneous expenses. The calculator instantly shows your total budget, cost per person, and daily expenditure per person.\n\nEffective travel budgeting prevents unpleasant surprises and reduces financial stress. Research shows that travelers who plan budgets in advance spend 20–30% less than those who do not. Key tips: book accommodation and flights early (typically 2–8 weeks ahead offers best prices), set a daily "fun money" allowance, research free or low-cost attractions, and always add a 10–15% contingency buffer for unexpected costs.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How should I estimate accommodation costs?', a: 'Research current prices for your destination and travel dates. For the budget field, enter the total accommodation cost per night (for all travelers combined). Budget options range from $10–30/night (hostels, guesthouses) to $100–300+ (mid-range hotels) to $500+ (luxury). Use platforms like Booking.com, Airbnb, or Hostelworld for current prices.' },
      { q: 'What is a realistic daily food budget per person?', a: 'Daily food costs vary enormously by destination: Southeast Asia: $10–25/person/day; Eastern Europe: $20–40; Western Europe: $40–80; Scandinavia/Japan: $60–120; USA: $40–80. Budget travelers who cook occasionally and use local markets or street food can cut costs by 50–70% compared to restaurant-only dining.' },
      { q: 'How do I estimate transportation costs for a trip?', a: 'Transportation includes flights/trains/buses between destinations (the largest cost) and local transport. For the total transportation field, add all inter-city and major transport costs. Local daily transport (subway, buses, taxis) is best included in the "miscellaneous" or "activities" field as it varies day-to-day.' },
      { q: 'What is a travel contingency budget?', a: 'A contingency budget is an emergency reserve for unexpected costs: medical expenses, missed connections, accommodation price spikes, damaged equipment, or spontaneous opportunities. Most travel experts recommend adding 10–15% of your total planned budget as contingency. Never travel without at least this buffer.' },
      { q: 'How do travel costs compare between budget and luxury travel?', a: 'Budget backpacker (Southeast Asia): $25–50/day; Mid-range traveler (Europe): $80–150/day; Comfortable traveler (Europe/USA): $150–300/day; Luxury traveler: $300+/day. The biggest cost drivers are accommodation (40–50% of budget), flights (20–30%), and dining choices.' },
      { q: 'Is it cheaper to travel solo or with a group?', a: 'Group travel typically reduces costs through shared accommodation (hotel rooms are often similar price for 1 or 2 people), shared transport (rental cars), and group tour discounts. However, coordinating group decisions can lead to more expensive choices. Couples often achieve the best cost-to-comfort ratio.' },
      { q: 'How much spending money should I bring?', a: 'Plan cash for daily expenses (food, local transport, small purchases) plus a credit card for major expenses and emergencies. In most developed destinations, €/$ 50–100 per person per day in cash is sufficient. Always notify your bank before international travel to prevent card blocking.' },
      { q: 'What are the biggest hidden travel costs?', a: 'Common overlooked costs: airport transfers (often $30–100 each way), city tourist taxes (€1–8/person/night in Europe), travel insurance (crucial — 3–8% of trip cost), checked baggage fees (budget airlines), international SIM card or roaming, medication and vaccinations, visa fees, and tipping customs.' },
      { q: 'Should I buy travel insurance?', a: 'Yes — travel insurance is strongly recommended, especially for international trips. A comprehensive policy covers: medical emergencies (can cost $50,000–500,000+ without insurance), trip cancellation, lost baggage, and delays. Cost is typically 4–8% of total trip cost. Never skip for long trips or when visiting countries with high medical costs.' },
      { q: 'How do I save money on flights?', a: 'Best strategies: 1) Book 2–8 weeks ahead for domestic, 3–6 months for international; 2) Be flexible on dates (midweek departures are often 20–40% cheaper); 3) Use incognito/private browsing or VPN when searching; 4) Compare nearby airports; 5) Set price alerts on Google Flights or Skyscanner; 6) Consider budget airlines for short-haul; 7) Use airline credit card points.' },
      { q: 'What is the best way to budget for a trip in different currencies?', a: 'Use a multi-currency travel card or credit card with no foreign transaction fees. Plan your budget in a single base currency (USD, EUR, or GBP are widely accepted). Check exchange rates weekly before your trip. Avoid airport currency exchange (rates are typically 5–15% worse than market). Withdraw local currency from ATMs for the best rates.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор бюджета путешествия поможет спланировать и оценить общую стоимость любой поездки — выходные, двухнедельный семейный отпуск или длительное путешествие с рюкзаком. Введите количество путешественников и дней, затем заполните оценки по жилью, питанию, транспорту, развлечениям и прочим расходам.\n\nЭффективное планирование бюджета предотвращает неприятные сюрпризы. Исследования показывают, что путешественники, планирующие бюджет заранее, тратят на 20–30% меньше. Ключевые советы: бронируйте жильё и билеты заблаговременно (2–8 недель — для оптимальных цен), установите дневной лимит на «карманные расходы», и всегда добавляйте 10–15% резерв на непредвиденные траты.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как оценить расходы на жильё?', a: 'Изучите актуальные цены для вашего направления и дат. В поле вводите общую стоимость проживания в сутки (для всех путешественников). Варианты: хостелы/гестхаусы — $10–30; отели среднего класса — $50–150; люкс — $300+. Используйте Booking.com или Airbnb для актуальных цен.' },
      { q: 'Каков реалистичный дневной бюджет на питание?', a: 'Расходы на питание сильно зависят от направления: Юго-Восточная Азия — $10–25/день; Восточная Европа — $20–40; Западная Европа — $40–80; США/Скандинавия — $60–120. Готовка и уличная еда позволяют сэкономить 50–70%.' },
      { q: 'Как учесть транспортные расходы?', a: 'В поле «транспорт» введите суммарные расходы на перелёты, поезда или автобусы между городами. Местный транспорт (метро, такси) лучше включить в «прочие расходы» или «развлечения».' },
      { q: 'Что такое резервный бюджет для путешествия?', a: 'Резерв покрывает непредвиденные расходы: медицинские случаи, пропущенные рейсы, непредвиденный рост цен на жильё. Рекомендую 10–15% от общего бюджета. Никогда не путешествуйте без этого запаса.' },
      { q: 'Как соотносятся бюджетные и люксовые путешествия?', a: 'Бюджетный путешественник (Азия): $25–50/день; средний уровень (Европа): $80–150/день; комфортный (Европа/США): $150–300/день; люкс: $300+/день. Основные статьи: жильё (40–50% бюджета), перелёты (20–30%), питание.' },
      { q: 'Дешевле путешествовать одному или в группе?', a: 'Групповые поездки позволяют экономить на номерах (стоят почти одинаково для 1–2 человек), аренде авто и групповых турах. Однако согласование группового расписания часто приводит к более дорогим выборам. Пары обычно достигают лучшего соотношения цена/комфорт.' },
      { q: 'Сколько наличных брать в поездку?', a: 'Планируйте наличные для ежедневных расходов (еда, транспорт, мелкие покупки) + карту для крупных покупок и экстренных случаев. В большинстве развитых стран $50–100/день на человека наличными достаточно. Предупреждайте банк о поездке заранее.' },
      { q: 'Какие скрытые расходы часто упускают?', a: 'Типичные забытые статьи: трансфер из аэропорта ($30–100 в одну сторону), туристический налог (€1–8/ночь в Европе), страховка (5–8% стоимости поездки), сборы за багаж у лоукостеров, международная SIM-карта, визы, чаевые.' },
      { q: 'Нужна ли страховка для путешествия?', a: 'Да — страхование настоятельно рекомендуется, особенно для международных поездок. Полис покрывает: медицинскую эвакуацию (может стоить $50 000–500 000+), отмену поездки, потерю багажа, задержки. Стоимость обычно 4–8% от суммы поездки.' },
      { q: 'Как сэкономить на билетах?', a: 'Лучшие стратегии: 1) бронировать за 2–8 недель для внутренних рейсов, за 3–6 месяцев — для международных; 2) гибкость по датам (будние дни на 20–40% дешевле); 3) сравнивать ближайшие аэропорты; 4) подписаться на оповещения о ценах.' },
      { q: 'Как бюджетировать поездку в разных валютах?', a: 'Используйте мультивалютную карту без комиссии за конвертацию. Планируйте бюджет в одной базовой валюте. Избегайте обмена в аэропорту (курс хуже рыночного на 5–15%). Снимайте местную валюту в банкоматах.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор бюджету подорожі допоможе спланувати та оцінити загальну вартість будь-якої поїздки — вихідні, двотижнева сімейна відпустка або тривала пригода. Введіть кількість мандрівників і днів, потім заповніть оцінки щодо проживання, харчування, транспорту, розваг та інших витрат.\n\nЕфективне планування бюджету запобігає неприємним сюрпризам. Дослідження показують, що мандрівники, які планують бюджет заздалегідь, витрачають на 20–30% менше. Ключові поради: бронюйте житло і квитки завчасно, встановіть денний ліміт на кишенькові витрати і завжди додавайте 10–15% резерв на непередбачені витрати.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як оцінити витрати на проживання?', a: 'Вивчіть актуальні ціни для вашого напрямку і дат. У полі вводьте загальну вартість проживання за добу (для всіх мандрівників). Варіанти: хостели — $10–30; готелі середнього класу — $50–150; люкс — $300+.' },
      { q: 'Який реалістичний добовий бюджет на харчування?', a: 'Витрати на харчування суттєво залежать від напрямку: Південно-Східна Азія — $10–25/день; Східна Європа — $20–40; Західна Європа — $40–80; США — $50–100. Приготування їжі та вулична їжа дозволяють заощадити 50–70%.' },
      { q: 'Як врахувати транспортні витрати?', a: 'У полі «транспорт» введіть сумарні витрати на перельоти, поїзди або автобуси між містами. Місцевий транспорт (метро, таксі) краще включити до «інших витрат».' },
      { q: 'Що таке резервний бюджет для подорожі?', a: 'Резерв покриває непередбачені витрати: медичні випадки, пропущені рейси, непередбачений ріст цін на житло. Рекомендую 10–15% від загального бюджету. Ніколи не подорожуйте без цього запасу.' },
      { q: 'Як співвідносяться бюджетні та люксові подорожі?', a: 'Бюджетний мандрівник (Азія): $25–50/день; середній рівень (Європа): $80–150/день; комфортний (Європа/США): $150–300/день; люкс: $300+/день.' },
      { q: 'Дешевше подорожувати самому чи в групі?', a: 'Групові поїздки дозволяють заощаджувати на номерах, оренді авто та групових турах. Однак узгодження розкладу групи часто призводить до дорожчих виборів. Пари зазвичай досягають найкращого співвідношення ціна/комфорт.' },
      { q: 'Скільки готівки брати в поїздку?', a: 'Плануйте готівку для щоденних витрат (їжа, транспорт, дрібні покупки) + картку для великих покупок. У більшості розвинених країн $50–100/день на людину готівкою достатньо. Попереджайте банк про поїздку заздалегідь.' },
      { q: 'Які приховані витрати часто не враховують?', a: 'Типові забуті статті: трансфер з аеропорту ($30–100 в один бік), туристичний податок (€1–8/ніч у Європі), страховка, збори за багаж у лоукостерів, міжнародна SIM-карта, візи, чайові.' },
      { q: 'Чи потрібна страховка для подорожі?', a: 'Так — страхування настійно рекомендується, особливо для міжнародних поїздок. Поліс покриває медичну евакуацію, скасування поїздки, втрату багажу. Вартість зазвичай 4–8% від вартості поїздки.' },
      { q: 'Як заощадити на квитках?', a: 'Кращі стратегії: бронювати за 2–8 тижнів для внутрішніх рейсів, за 3–6 місяців — для міжнародних; гнучкість за датами (будні на 20–40% дешевші); порівнювати сусідні аеропорти; підписатися на сповіщення про ціни.' },
      { q: 'Як бюджетувати поїздку в різних валютах?', a: 'Використовуйте мультивалютну картку без комісії за конвертацію. Плануйте бюджет в одній базовій валюті. Уникайте обміну в аеропорту (курс гірший за ринковий на 5–15%). Знімайте місцеву валюту в банкоматах.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice de budget voyage vous aide à planifier et estimer le coût total de n\'importe quel voyage — un week-end, deux semaines de vacances en famille ou un long périple. Entrez le nombre de voyageurs et de jours, puis renseignez vos estimations pour l\'hébergement, la nourriture, le transport, les activités et les dépenses diverses.\n\nUne bonne planification budgétaire évite les mauvaises surprises. Des études montrent que les voyageurs qui planifient leur budget à l\'avance dépensent 20–30 % de moins. Conseils clés : réservez tôt (2 à 8 semaines avant pour les meilleures offres), fixez un budget journalier, et prévoyez toujours une marge de 10–15 % pour les imprévus.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment estimer les coûts d\'hébergement ?', a: 'Renseignez-vous sur les prix actuels pour votre destination et vos dates. Entrez le coût total de l\'hébergement par nuit (pour tous les voyageurs). Options : auberges/guesthouses — 10–30 $/nuit ; hôtels milieu de gamme — 50–150 $ ; luxe — 300 $+.' },
      { q: 'Quel est un budget alimentaire journalier réaliste ?', a: 'Les coûts varient fortement selon la destination : Asie du Sud-Est — 10–25 $/personne/jour ; Europe de l\'Est — 20–40 € ; Europe de l\'Ouest — 40–80 € ; Scandinavie/Japon — 60–120 €. Cuisiner et manger dans les marchés locaux peut réduire les coûts de 50–70 %.' },
      { q: 'Comment estimer les coûts de transport ?', a: 'Incluez dans le champ transport tous les vols, trains et bus entre destinations (le poste le plus important). Le transport local quotidien (métro, taxis) est mieux inclus dans les dépenses diverses ou les activités.' },
      { q: 'Qu\'est-ce qu\'une réserve de sécurité pour le voyage ?', a: 'Une réserve de 10–15 % du budget total couvre les imprévus : frais médicaux, connexions manquées, hausses de prix d\'hébergement, opportunités spontanées. Ne voyagez jamais sans cette marge.' },
      { q: 'Comment les coûts se comparent-ils entre le voyage budget et luxe ?', a: 'Voyageur budget (Asie) : 25–50 $/jour ; niveau intermédiaire (Europe) : 80–150 €/jour ; confort (Europe/USA) : 150–300 €/jour ; luxe : 300 €+/jour.' },
      { q: 'Voyage en solo ou en groupe : lequel est moins cher ?', a: 'Les voyages en groupe permettent de partager les frais d\'hébergement (chambres souvent au même prix pour 1 ou 2 personnes), de transport et les tarifs de groupe. Les couples atteignent souvent le meilleur rapport qualité-prix.' },
      { q: 'Combien d\'argent liquide emporter ?', a: 'Prévoyez du liquide pour les dépenses quotidiennes + une carte bancaire pour les grosses dépenses et urgences. Dans la plupart des destinations, 50–100 €/personne/jour en liquide suffit. Avisez votre banque avant de voyager.' },
      { q: 'Quels sont les coûts cachés courants ?', a: 'Postes souvent oubliés : transfers aéroport (30–100 € aller simple), taxe de séjour (1–8 €/nuit en Europe), assurance voyage (4–8 % du coût total), frais de bagages sur les vols low-cost, SIM internationale, visa, pourboires.' },
      { q: 'Faut-il souscrire une assurance voyage ?', a: 'Oui — l\'assurance voyage est fortement recommandée, surtout pour les voyages internationaux. Elle couvre les urgences médicales, l\'annulation, les bagages perdus et les retards. Coût habituel : 4–8 % du budget total du voyage.' },
      { q: 'Comment économiser sur les billets d\'avion ?', a: 'Meilleures stratégies : réserver 2–8 semaines avant pour le domestique, 3–6 mois pour l\'international ; être flexible sur les dates (départs en milieu de semaine souvent 20–40 % moins chers) ; comparer les aéroports proches ; configurer des alertes prix.' },
      { q: 'Comment budgéter un voyage en différentes devises ?', a: 'Utilisez une carte multi-devises ou une carte bancaire sans frais de change. Planifiez votre budget dans une seule devise de référence. Évitez les bureaux de change en aéroport (taux souvent 5–15 % moins avantageux). Retirez des espèces locales au distributeur pour les meilleurs taux.' },
    ],
  },
  lt: {
    description: 'Mūsų kelionės biudžeto skaičiuotuvas padeda planuoti ir įvertinti bet kurios kelionės bendrą kainą — savaitgalinis išvykimas, dviejų savaičių šeimos atostogos ar ilga nuotykių kelionė. Įveskite keliautojų ir dienų skaičių, tada užpildykite sąnaudų apskaičiavimus apgyvendinimui, maistui, transportui, veiklai ir kitoms išlaidoms.\n\nEfektyvus biudžeto planavimas apsaugo nuo netikėtų išlaidų. Tyrimai rodo, kad keliautojai, planuojantys biudžetą iš anksto, išleidžia 20–30% mažiau. Pagrindiniai patarimai: rezervuokite anksčiau, nustatykite dienos kišenpinius ir visada pridėkite 10–15% atsarginių lėšų.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kaip įvertinti apgyvendinimo išlaidas?', a: 'Ištirti esamas kainas jūsų paskirties vietoje ir datoms. Lauke įveskite bendrą apgyvendinimo kainą per naktį (visiems keliautojams). Parinktys: nakvynės namai — 10–30 $/naktį; vidutinės klasės viešbučiai — 50–150 $; liuksas — 300 $+.' },
      { q: 'Koks yra realistiškas dienos maisto biudžetas vienam asmeniui?', a: 'Dienos maisto išlaidos labai skiriasi priklausomai nuo paskirties: Pietryčių Azija — 10–25 $/asmeniui/dieną; Rytų Europa — 20–40 €; Vakarų Europa — 40–80 €; Skandinavija — 60–120 €. Gaminant patiems ir valgant gatvės maistą galima sutaupyti 50–70%.' },
      { q: 'Kaip įvertinti transporto išlaidas?', a: 'Transporto lauke įveskite visus skrydžių, traukinių ar autobusų tarp miestų kaštus. Vietos transportas (metro, taksi) geriausiai įskaitomas į kitas išlaidas ar veiklą.' },
      { q: 'Kas yra kelionės atsarginių lėšų biudžetas?', a: 'Atsarginis fondas padengia nenumatytas išlaidas: medicinos atvejus, praleistus skrydžius, kainų šuolius. Rekomenduojama 10–15% viso planuojamo biudžeto. Niekada nekeliauti be šio rezervo.' },
      { q: 'Kaip skiriasi biudžetinės ir prabangios kelionės išlaidos?', a: 'Biudžetinis keliautojas (Azija): 25–50 $/dieną; vidutinis lygis (Europa): 80–150 €/dieną; komfortiškas (Europa/JAV): 150–300 €/dieną; liuksas: 300 €+/dieną.' },
      { q: 'Ar pigiau keliauti vienam ar su grupe?', a: 'Grupinės kelionės leidžia sutaupyti dalinantis apgyvendinimu, transporto nuoma ir grupinių ekskursijų kainomis. Poros dažniausiai pasiekia geriausią kainos ir komforto santykį.' },
      { q: 'Kiek grynųjų pinigų pasiimti į kelionę?', a: 'Planuokite grynuosius kasdienėms išlaidoms (maistas, vietinis transportas) + kortelę stambioms išlaidoms. Daugumoje išsivysčiusių šalių 50–100 €/asmeniui/dieną grynaisiais pakanka. Informuokite banką apie kelionę iš anksto.' },
      { q: 'Kokios yra dažniausiai pamirštamos paslėptos išlaidos?', a: 'Dažnai pamirštamos: oro uosto vežimas (30–100 € į vieną pusę), turistinis mokestis (1–8 €/naktį Europoje), kelionių draudimas (4–8% išlaidų), bagažo mokesčiai pigių aviakompanijų skrydžiams, tarptautinė SIM kortelė, vizos.' },
      { q: 'Ar verta pirkti kelionių draudimą?', a: 'Taip — kelionių draudimas labai rekomenduojamas, ypač tarptautinėms kelionėms. Polisas padengia medicinos pagalbą, kelionės atšaukimą, pamestą bagažą ir vėlavimus. Kaina paprastai 4–8% viso kelionės biudžeto.' },
      { q: 'Kaip sutaupyti perkant bilietus?', a: 'Geriausios strategijos: rezervuoti 2–8 savaites iš anksto vidaus skrydžiams, 3–6 mėnesius — tarptautiniams; lanksčios datos (savaitės vidurio skrydžiai 20–40% pigesni); palyginkite artimus oro uostus; nustatykite kainų perspėjimus.' },
      { q: 'Kaip planuoti biudžetą skirtingomis valiutomis?', a: 'Naudokite daugiavaliutę kortelę be valiutos keitimo mokesčių. Planuokite biudžetą viena bazine valiuta. Venkite valiutos keitimo oro uoste (kursas 5–15% blogesnis). Grynuosius vietinius pinigus išsiimkite bankomatuose.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/travel-budget', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TravelBudgetPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/travel-budget`,
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
        <ToolActions />
        <TravelBudgetCalculator locale={locale} />
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
