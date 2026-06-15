import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import AcCostCalculator from './AcCostCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/electricity-bill', label: 'Electricity Bill Calculator' },
    { href: '/calculator/fuel-cost', label: 'Fuel Cost Calculator' },
    { href: '/calculator/material-cost', label: 'Material Cost Calculator' },
    { href: '/calculator/renovation', label: 'Renovation Cost Calculator' },
    { href: '/calculator/net-worth', label: 'Net Worth Calculator' },
  ],
  ru: [
    { href: '/calculator/electricity-bill', label: 'Калькулятор счёта за электричество' },
    { href: '/calculator/fuel-cost', label: 'Калькулятор расходов на топливо' },
    { href: '/calculator/material-cost', label: 'Калькулятор стоимости материалов' },
    { href: '/calculator/renovation', label: 'Калькулятор ремонта' },
    { href: '/calculator/net-worth', label: 'Калькулятор капитала' },
  ],
  uk: [
    { href: '/calculator/electricity-bill', label: 'Калькулятор рахунку за електроенергію' },
    { href: '/calculator/fuel-cost', label: 'Калькулятор витрат на паливо' },
    { href: '/calculator/material-cost', label: 'Калькулятор вартості матеріалів' },
    { href: '/calculator/renovation', label: 'Калькулятор ремонту' },
    { href: '/calculator/net-worth', label: 'Калькулятор капіталу' },
  ],
  fr: [
    { href: '/calculator/electricity-bill', label: 'Calculatrice Facture Électricité' },
    { href: '/calculator/fuel-cost', label: 'Calculatrice Coût Carburant' },
    { href: '/calculator/material-cost', label: 'Calculatrice Coût Matériaux' },
    { href: '/calculator/renovation', label: 'Calculatrice Rénovation' },
    { href: '/calculator/net-worth', label: 'Calculatrice Valeur Nette' },
  ],
  lt: [
    { href: '/calculator/electricity-bill', label: 'Elektros sąskaitos skaičiuotuvas' },
    { href: '/calculator/fuel-cost', label: 'Kuro išlaidų skaičiuotuvas' },
    { href: '/calculator/material-cost', label: 'Medžiagų kainos skaičiuotuvas' },
    { href: '/calculator/renovation', label: 'Renovacijos skaičiuotuvas' },
    { href: '/calculator/net-worth', label: 'Grynosios vertės skaičiuotuvas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'AC & Heating Cost Calculator — Monthly Running Costs',
    description: 'Free air conditioning and heating cost calculator. Estimate your monthly electricity bill for any AC unit or electric heater. Enter wattage, hours of use, and energy rate.',
    h1: 'AC & Heating Cost Calculator',
    subtitle: 'Find out how much your air conditioning or electric heater costs to run per day, month, or year.',
  },
  ru: {
    title: 'Калькулятор расходов на кондиционер и отопление',
    description: 'Бесплатный калькулятор стоимости работы кондиционера или электрообогревателя. Рассчитайте ежемесячные расходы на электричество по мощности, часам работы и тарифу.',
    h1: 'Калькулятор расходов на кондиционер и отопление',
    subtitle: 'Узнайте, сколько стоит ежедневная работа вашего кондиционера или электрообогревателя.',
  },
  uk: {
    title: 'Калькулятор витрат на кондиціонер та опалення',
    description: 'Безкоштовний калькулятор вартості роботи кондиціонера або електрообігрівача. Розрахуйте щомісячні витрати на електроенергію за потужністю, годинами роботи та тарифом.',
    h1: 'Калькулятор витрат на кондиціонер та опалення',
    subtitle: 'Дізнайтеся, скільки коштує щоденна робота вашого кондиціонера або електрообігрівача.',
  },
  fr: {
    title: 'Calculatrice Coût Climatiseur & Chauffage — Mensuel',
    description: 'Calculatrice gratuite du coût de fonctionnement d\'un climatiseur ou d\'un radiateur électrique. Estimez votre facture mensuelle selon la puissance, les heures d\'utilisation et le tarif électrique.',
    h1: 'Calculatrice Coût Climatiseur & Chauffage',
    subtitle: 'Découvrez combien coûte le fonctionnement quotidien de votre climatiseur ou chauffage électrique.',
  },
  lt: {
    title: 'Kondicionieriaus ir Šildymo Išlaidų Skaičiuotuvas',
    description: 'Nemokamas kondicionieriaus ir elektrinio šildytuvo veikimo išlaidų skaičiuotuvas. Įvertinkite mėnesines elektros išlaidas pagal galią, naudojimo valandas ir tarifą.',
    h1: 'Kondicionieriaus ir Šildymo Išlaidų Skaičiuotuvas',
    subtitle: 'Sužinokite, kiek kainuoja jūsų kondicionieriaus ar elektrinio šildytuvo kasdienė veikla.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Our AC and heating cost calculator helps you estimate the monthly and annual electricity cost of running any air conditioning unit or electric heater. Simply select your device type from the preset list or enter a custom wattage, then specify the average hours of use per day and the number of days per month. Enter your electricity rate (found on your utility bill) to get an accurate cost estimate.\n\nAir conditioning typically accounts for 6–10% of total home electricity consumption in moderate climates, rising to 20–30% in hot regions. Understanding running costs helps you make informed decisions about equipment upgrades, thermostat settings, and energy-saving habits. For example, raising your AC thermostat by just 2°C (4°F) can reduce cooling costs by 10–15%. Similarly, using a programmable thermostat to avoid cooling empty rooms can cut AC costs by 20–30% annually.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is AC electricity consumption calculated?', a: 'The formula is: Energy (kWh) = Power (kW) × Hours. For example, a 1,500W AC running 8 hours per day for 30 days: 1.5 kW × 8 h × 30 days = 360 kWh per month. Multiply by your electricity rate to get the cost.' },
      { q: 'What does BTU mean for air conditioners?', a: 'BTU (British Thermal Unit) measures cooling or heating capacity, not power consumption. 1 BTU/hr ≈ 0.000293 kW. A 12,000 BTU AC ("1 ton") has roughly 1.1–1.2 kW of electrical consumption (EER = BTU/watts). A higher Energy Efficiency Ratio (EER) means lower running costs for the same cooling.' },
      { q: 'What is the difference between BTU and watt?', a: 'BTU/hr measures how much heat the unit can remove per hour (capacity). Watts measure how much electricity it consumes (power). An AC with 12,000 BTU/hr capacity and 1,100W consumption has EER = 12,000 ÷ 1,100 ≈ 10.9. Higher EER = more efficient.' },
      { q: 'What is SEER rating?', a: 'SEER (Seasonal Energy Efficiency Ratio) measures AC efficiency over a full cooling season. SEER = total cooling output ÷ total electricity input. Modern ACs typically have SEER 14–22. Higher SEER means lower running costs. An upgrade from SEER 10 to SEER 20 cuts electricity use roughly in half.' },
      { q: 'How much does it cost to run an AC per hour?', a: 'A typical 12,000 BTU (1.1 kW) AC costs approximately: $0.11–0.22/hour at $0.10–0.20/kWh electricity rates. A larger 24,000 BTU (2.2 kW) unit costs $0.22–0.44/hour. Running costs vary significantly by country — European electricity rates average €0.25/kWh, US average $0.13/kWh.' },
      { q: 'Are electric heaters more expensive to run than AC?', a: 'Electric resistance heaters convert electricity to heat at 100% efficiency (1 kW = 1 kW of heat). Heat pumps (reverse-cycle ACs in heating mode) are 200–400% efficient — they produce 2–4 kW of heat per 1 kW of electricity consumed. So a heat pump costs 2–4× less to heat a room than a conventional electric heater.' },
      { q: 'How can I reduce AC electricity costs?', a: 'Key strategies: 1) Raise cooling setpoint to 26°C (78°F) — each degree higher saves 3–5%; 2) Use ceiling fans (allows 4°C higher setpoint); 3) Clean or replace air filters monthly; 4) Seal air leaks and improve insulation; 5) Use programmable/smart thermostat; 6) Shade windows facing direct sun; 7) Avoid heat-generating appliances during peak hours.' },
      { q: 'What size AC do I need for my room?', a: 'General rule: 20–25 BTU per square foot (215–270 BTU/m²) for standard ceiling height (2.5m). A 20m² bedroom needs about 4,300–5,400 BTU (500–630W input). Factors increasing required size: high ceilings, sunny exposure, poor insulation, many people/appliances, humid climate.' },
      { q: 'Is inverter AC cheaper to run than non-inverter?', a: 'Yes. Inverter ACs modulate compressor speed to maintain temperature, consuming 30–50% less electricity than conventional on/off compressor units. The payback period for the higher upfront cost is typically 2–4 years through electricity savings. For heavy use, inverter is always worth it.' },
      { q: 'How does outdoor temperature affect AC running cost?', a: 'Higher outdoor temperature makes the AC work harder. As a rule, for every 3°C increase in outdoor temperature above setpoint, electricity consumption increases by about 5–10%. This is why AC bills peak in the hottest weeks of summer and why morning/evening ventilation (when outdoor temps are lower) reduces AC need.' },
      { q: 'What is the average monthly AC electricity bill?', a: 'Averages vary significantly: US household AC average: $300–600/year ($25–50/month). Southern US (Florida, Texas): $500–1,000/year. European apartment (1 AC unit, 3 months): €50–150/season. Middle East (year-round cooling): $800–2,000/year depending on unit size and usage hours.' },
    ],
  },
  ru: {
    description: 'Наш калькулятор расходов на кондиционер и отопление помогает оценить ежемесячные и ежегодные расходы на электричество при работе любого кондиционера или электрообогревателя. Выберите тип устройства из списка или введите произвольную мощность, затем укажите среднее количество часов работы в день и дней в месяце.\n\nКондиционирование обычно составляет 6–10% общего потребления электроэнергии в доме в умеренном климате и 20–30% в жарких регионах. Понимание расходов на эксплуатацию помогает принимать взвешенные решения о настройках термостата. Например, повышение температуры охлаждения всего на 2°C снижает расходы на кондиционирование на 10–15%.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитывается потребление электроэнергии кондиционером?', a: 'Формула: Энергия (кВт·ч) = Мощность (кВт) × Часы. Например, кондиционер 1500 Вт работает 8 часов в день 30 дней: 1,5 кВт × 8 ч × 30 = 360 кВт·ч в месяц. Умножьте на тариф.' },
      { q: 'Что означают BTU у кондиционера?', a: 'BTU (British Thermal Unit) — единица мощности охлаждения или обогрева, не потребления электроэнергии. 1 BTU/ч ≈ 0,000293 кВт. Кондиционер 12 000 BTU («1 тонна») потребляет примерно 1,1–1,2 кВт. Чем выше EER (отношение BTU к ваттам), тем экономичнее прибор.' },
      { q: 'В чём разница между BTU и ваттом?', a: 'BTU/ч — мощность охлаждения. Ватт — потребление электроэнергии. Кондиционер 12 000 BTU/ч и 1100 Вт: EER = 12 000 ÷ 1100 ≈ 10,9. Выше EER — эффективнее.' },
      { q: 'Что такое SEER?', a: 'SEER (Seasonal Energy Efficiency Ratio) — эффективность кондиционера за полный сезон охлаждения. Современные кондиционеры: SEER 14–22. Переход с SEER 10 на SEER 20 снижает расход электроэнергии примерно вдвое.' },
      { q: 'Сколько стоит работа кондиционера в час?', a: 'Типичный кондиционер 12 000 BTU (1,1 кВт) при тарифе 5 руб/кВт·ч обходится ~5–6 рублей в час. При тарифе €0,25/кВт·ч в Европе — около €0,28/ч. Более мощный 24 000 BTU (2,2 кВт) — вдвое дороже.' },
      { q: 'Электрообогреватель дороже кондиционера?', a: 'Электрообогреватель сопротивления — КПД 100% (1 кВт = 1 кВт тепла). Тепловой насос (кондиционер в режиме обогрева) — КПД 200–400%: 1 кВт электроэнергии = 2–4 кВт тепла. Кондиционер в режиме обогрева в 2–4 раза дешевле традиционного обогревателя.' },
      { q: 'Как снизить расходы на кондиционер?', a: 'Основные меры: повысить температуру охлаждения до 26°C (каждый градус экономит 3–5%); использовать потолочный вентилятор; менять фильтры ежемесячно; устранить сквозняки; применять программируемый термостат; затенять окна.' },
      { q: 'Какой кондиционер нужен для моей комнаты?', a: 'Правило: ~1 кВт холодопроизводительности на 10 м² при стандартной высоте потолка (2,5 м). Спальня 20 м² — ~2 кВт (7000 BTU). Увеличивайте мощность при высоких потолках, южной ориентации, плохой теплоизоляции.' },
      { q: 'Инверторный кондиционер экономичнее?', a: 'Да. Инверторные кондиционеры потребляют на 30–50% меньше электроэнергии, чем обычные On/Off. Окупаемость разницы в цене обычно 2–4 года за счёт экономии на электричестве.' },
      { q: 'Как уличная температура влияет на расход электроэнергии?', a: 'Чем выше уличная температура, тем тяжелее кондиционеру. На каждые 3°C выше точки охлаждения потребление возрастает примерно на 5–10%. Поэтому счета пиковые в самые жаркие недели лета.' },
      { q: 'Каков средний счёт за кондиционер в месяц?', a: 'Средние значения: жилая квартира в России при умеренном использовании — 500–1500 руб/месяц летом. В южных регионах с круглогодичным охлаждением — в 3–5 раз больше. В Европе при €0,25/кВт·ч — €30–100/месяц.' },
    ],
  },
  uk: {
    description: 'Наш калькулятор витрат на кондиціонер та опалення допомагає оцінити щомісячні та річні витрати на електроенергію при роботі будь-якого кондиціонера або електрообігрівача. Оберіть тип пристрою зі списку або введіть довільну потужність, вкажіть середню кількість годин роботи на день і кількість днів на місяць.\n\nКондиціонування зазвичай складає 6–10% загального споживання електроенергії в будинку в помірному кліматі і 20–30% у спекотних регіонах. Розуміння витрат допомагає приймати зважені рішення. Наприклад, підвищення температури охолодження лише на 2°C знижує витрати на кондиціонування на 10–15%.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховується споживання електроенергії кондиціонером?', a: 'Формула: Енергія (кВт·год) = Потужність (кВт) × Години. Наприклад, кондиціонер 1500 Вт працює 8 годин на день 30 днів: 1,5 кВт × 8 год × 30 = 360 кВт·год на місяць. Помножте на тариф.' },
      { q: 'Що означають BTU у кондиціонера?', a: 'BTU (British Thermal Unit) — одиниця потужності охолодження або обігріву, не споживання електроенергії. Кондиціонер 12 000 BTU споживає приблизно 1,1–1,2 кВт. Чим вище EER, тим економічніший прилад.' },
      { q: 'У чому різниця між BTU і ватом?', a: 'BTU/год — потужність охолодження. Ват — споживання електроенергії. Кондиціонер 12 000 BTU/год і 1100 Вт: EER = 12 000 ÷ 1100 ≈ 10,9. Вище EER — ефективніше.' },
      { q: 'Що таке SEER?', a: 'SEER (Seasonal Energy Efficiency Ratio) — ефективність кондиціонера за повний сезон охолодження. Сучасні кондиціонери: SEER 14–22. Перехід з SEER 10 на SEER 20 знижує споживання електроенергії приблизно вдвічі.' },
      { q: 'Скільки коштує робота кондиціонера на годину?', a: 'Типовий кондиціонер 12 000 BTU (1,1 кВт) при тарифі €0,10/кВт·год — близько €0,11/год. При €0,25/кВт·год — €0,28/год. Більш потужний 24 000 BTU (2,2 кВт) — вдвічі дорожче.' },
      { q: 'Електрообігрівач дорожчий за кондиціонер?', a: 'Електрообігрівач опору — ККД 100% (1 кВт = 1 кВт тепла). Тепловий насос (кондиціонер у режимі обігріву) — ККД 200–400%. Кондиціонер у режимі обігріву в 2–4 рази дешевший за традиційний обігрівач.' },
      { q: 'Як знизити витрати на кондиціонер?', a: 'Основні заходи: підвищити температуру охолодження до 26°C (кожен градус економить 3–5%); використовувати стельовий вентилятор; міняти фільтри щомісяця; усунути протяги; застосовувати програмований термостат.' },
      { q: 'Який кондиціонер потрібен для моєї кімнати?', a: 'Правило: ~1 кВт холодопродуктивності на 10 м² при стандартній висоті стелі (2,5 м). Спальня 20 м² — ~2 кВт (7000 BTU). Збільшуйте потужність при високих стелях, південній орієнтації, поганій теплоізоляції.' },
      { q: 'Інверторний кондиціонер економічніший?', a: 'Так. Інверторні кондиціонери споживають на 30–50% менше електроенергії, ніж звичайні On/Off. Окупність різниці у ціні зазвичай 2–4 роки за рахунок економії на електриці.' },
      { q: 'Як вулична температура впливає на споживання електроенергії?', a: 'Чим вище вулична температура, тим важче кондиціонеру. На кожні 3°C вище точки охолодження споживання зростає приблизно на 5–10%.' },
      { q: 'Який середній рахунок за кондиціонер на місяць?', a: 'Середні значення: квартира в Україні при помірному використанні — 200–600 грн/місяць влітку. В Європі при €0,25/кВт·год — €30–100/місяць.' },
    ],
  },
  fr: {
    description: 'Notre calculatrice du coût de fonctionnement de la climatisation et du chauffage vous aide à estimer la facture d\'électricité mensuelle et annuelle pour n\'importe quel climatiseur ou radiateur électrique. Sélectionnez votre appareil dans la liste ou entrez une puissance personnalisée, précisez les heures d\'utilisation quotidiennes et le nombre de jours par mois, puis entrez votre tarif électrique.\n\nLa climatisation représente généralement 6 à 10 % de la consommation électrique d\'un logement en climat tempéré, et jusqu\'à 20–30 % dans les régions chaudes. Augmenter la consigne de climatisation de seulement 2 °C peut réduire les coûts de refroidissement de 10 à 15 %.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment calcule-t-on la consommation électrique d\'un climatiseur ?', a: 'Formule : Énergie (kWh) = Puissance (kW) × Heures. Exemple : un climatiseur 1 500 W fonctionnant 8 h/jour pendant 30 jours : 1,5 kW × 8 h × 30 = 360 kWh/mois. Multipliez par votre tarif pour obtenir le coût.' },
      { q: 'Que signifient les BTU pour les climatiseurs ?', a: 'Le BTU (British Thermal Unit) mesure la capacité de refroidissement ou de chauffage, pas la consommation électrique. 1 BTU/h ≈ 0,000293 kW. Un climatiseur 12 000 BTU consomme environ 1,1–1,2 kW. Un EER (rapport BTU/watts) plus élevé signifie un fonctionnement plus économique.' },
      { q: 'Quelle est la différence entre BTU et watt ?', a: 'BTU/h = capacité de refroidissement. Watt = consommation électrique. Un climatiseur 12 000 BTU/h et 1 100 W a un EER = 12 000 ÷ 1 100 ≈ 10,9. Plus l\'EER est élevé, plus l\'appareil est efficace.' },
      { q: 'Qu\'est-ce que le SEER ?', a: 'Le SEER (Seasonal Energy Efficiency Ratio) mesure l\'efficacité d\'un climatiseur sur une saison de refroidissement complète. Les climatiseurs modernes ont un SEER de 14 à 22. Passer d\'un SEER 10 à un SEER 20 divise environ par deux la consommation d\'électricité.' },
      { q: 'Combien coûte l\'utilisation d\'un climatiseur par heure ?', a: 'Un climatiseur typique 12 000 BTU (1,1 kW) à 0,25 €/kWh coûte environ 0,28 €/h. Un modèle plus grand 24 000 BTU (2,2 kW) coûte environ 0,55 €/h. Les coûts varient selon les pays et les tarifs en vigueur.' },
      { q: 'Les radiateurs électriques coûtent-ils plus cher que la climatisation ?', a: 'Les radiateurs à résistance électrique ont un rendement de 100 % (1 kW = 1 kW de chaleur). Les pompes à chaleur (climatiseurs réversibles en mode chauffage) ont un rendement de 200–400 % : elles produisent 2 à 4 kW de chaleur par kW consommé. La pompe à chaleur est donc 2 à 4 fois moins chère.' },
      { q: 'Comment réduire les coûts de climatisation ?', a: 'Stratégies clés : relever la consigne à 26 °C (chaque degré économise 3–5 %) ; utiliser un ventilateur de plafond ; nettoyer les filtres mensuellement ; calfeutrer les fuites d\'air ; utiliser un thermostat programmable ; occulter les fenêtres exposées au soleil.' },
      { q: 'Quelle puissance de climatiseur pour ma pièce ?', a: 'Règle générale : 20–25 BTU par m² (hauteur standard 2,5 m). Une chambre de 20 m² nécessite environ 4 300 à 5 000 BTU (460–540 W). Facteurs augmentant la puissance requise : plafonds hauts, exposition ensoleillée, mauvaise isolation.' },
      { q: 'La climatisation inverter est-elle plus économique ?', a: 'Oui. Les climatiseurs inverter consomment 30 à 50 % d\'électricité en moins que les modèles on/off conventionnels. Le retour sur investissement par rapport au surcoût initial est généralement de 2 à 4 ans.' },
      { q: 'Comment la température extérieure affecte-t-elle la consommation ?', a: 'Plus la température extérieure est élevée, plus le climatiseur travaille. Pour chaque hausse de 3 °C au-dessus de la consigne, la consommation augmente d\'environ 5 à 10 %. C\'est pourquoi les factures culminent lors des semaines les plus chaudes.' },
      { q: 'Quelle est la facture mensuelle moyenne de climatisation ?', a: 'En France : appartement moyen avec un climatiseur (3 mois d\'été) : 50 à 150 € par saison. Maison avec plusieurs unités et utilisation intensive : 200–400 € par saison à 0,25 €/kWh.' },
    ],
  },
  lt: {
    description: 'Mūsų kondicionieriaus ir šildymo išlaidų skaičiuotuvas padeda įvertinti mėnesines ir metines elektros sąnaudas naudojant bet kurį oro kondicionierių ar elektrinį šildytuvą. Pasirinkite prietaiso tipą iš sąrašo arba įveskite individualią galią, tada nurodykite vidutines naudojimo valandas per dieną ir dienų skaičių per mėnesį.\n\nOro kondicionavimas paprastai sudaro 6–10% bendro namų ūkio elektros suvartojimo vidutiniame klimate ir iki 20–30% karštuose regionuose. Supratimas apie veikimo išlaidas padeda priimti informuotus sprendimus. Pavyzdžiui, pakelti aušinimo temperatūrą tik 2°C gali sumažinti kondicionavimo išlaidas 10–15%.',
    faqTitle: 'Dažnai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamas kondicionieriaus elektros suvartojimas?', a: 'Formulė: Energija (kWh) = Galia (kW) × Valandos. Pavyzdžiui, 1500 W kondicionierius veikia 8 val./dieną 30 dienų: 1,5 kW × 8 val. × 30 = 360 kWh per mėnesį. Padauginkite iš tarifo.' },
      { q: 'Ką reiškia BTU kondicionierių charakteristikose?', a: 'BTU (British Thermal Unit) matuoja aušinimo ar šildymo galią, o ne elektros suvartojimą. 12 000 BTU kondicionierius suvartoja maždaug 1,1–1,2 kW. Didesnis EER (BTU/vatais) reiškia efektyvesnį prietaisą.' },
      { q: 'Koks skirtumas tarp BTU ir vato?', a: 'BTU/val. = aušinimo galia. Vatas = elektros suvartojimas. 12 000 BTU/val. ir 1100 W kondicionierius: EER = 12 000 ÷ 1100 ≈ 10,9. Didesnis EER — efektyvesnis prietaisas.' },
      { q: 'Kas yra SEER įvertinimas?', a: 'SEER (Seasonal Energy Efficiency Ratio) matuoja kondicionieriaus efektyvumą per visą aušinimo sezoną. Šiuolaikiniai kondicionieriai turi SEER 14–22. Pereinant nuo SEER 10 prie SEER 20, elektros suvartojimas sumažėja maždaug perpus.' },
      { q: 'Kiek kainuoja kondicionierius per valandą?', a: 'Tipiškas 12 000 BTU (1,1 kW) kondicionierius esant €0,20/kWh tarifui kainuoja apie €0,22/val. Didesnis 24 000 BTU (2,2 kW) — apie €0,44/val.' },
      { q: 'Ar elektrinis šildytuvas brangesnis nei kondicionierius?', a: 'Elektrinis pasipriešinimo šildytuvas — efektyvumas 100% (1 kW = 1 kW šilumos). Šilumos siurblys (kondicionierius šildymo režimu) — efektyvumas 200–400%. Kondicionierius šildymo režimu yra 2–4 kartus pigesnis.' },
      { q: 'Kaip sumažinti kondicionavimo išlaidas?', a: 'Pagrindinės strategijos: pakelti aušinimo temperatūrą iki 26°C (kiekvienas laipsnis taupo 3–5%); naudoti lubų ventiliatorių; kas mėnesį keisti filtrus; sandarinti oro nuotėkius; naudoti programuojamą termostatą.' },
      { q: 'Kokio dydžio kondicionierius reikalingas mano kambariui?', a: 'Bendras patarimas: ~1 kW aušinimo galios 10 m² esant standartiniam lubų aukščiui (2,5 m). 20 m² miegamajam reikia ~2 kW (7000 BTU). Didinkite galią esant aukštesnėms luboms ar prastos izoliacijos sienoms.' },
      { q: 'Ar inverteriniai kondicionieriai ekonomiškesni?', a: 'Taip. Inverteriniai kondicionieriai suvartoja 30–50% mažiau elektros nei įprastiniai on/off modeliai. Atsipirkimo laikotarpis dėl aukštesnės pradinės kainos paprastai yra 2–4 metai.' },
      { q: 'Kaip lauko temperatūra veikia elektros suvartojimą?', a: 'Kuo aukštesnė lauko temperatūra, tuo sunkiau kondicionierui dirbti. Kiekvienam 3°C padidėjimui virš nustatytos temperatūros suvartojimas padidėja maždaug 5–10%.' },
      { q: 'Kokia vidutinė mėnesinė kondicionavimo sąskaita?', a: 'Lietuva: butas su vienu kondicionierium (3 vasaros mėnesiai) — 30–80 € per sezoną. Namai su keliais agregatais ir intensyviu naudojimu — 100–250 € per sezoną.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/ac-cost', { title: meta.title, description: meta.description });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AcCostPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/ac-cost`,
    applicationCategory: 'UtilityApplication',
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
        <AcCostCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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
