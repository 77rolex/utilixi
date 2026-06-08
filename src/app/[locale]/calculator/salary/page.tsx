import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import SalaryCalculator from './SalaryCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Gross to Net Salary Calculator — Tax by Country',
    description: 'Calculate your net salary from gross pay. Accurate income tax and social contribution breakdown for 24 countries: Ukraine, Russia, Belarus, Kazakhstan, Germany, France, Belgium, Switzerland, UK, USA, Canada, Australia, Ireland, New Zealand and more.',
    h1: 'Gross to Net Salary Calculator',
  },
  ru: {
    title: 'Калькулятор зарплаты брутто-нетто — налоги по странам',
    description: 'Рассчитайте нетто-зарплату из брутто. Точный расчёт налогов и социальных взносов для 24 стран: Украина, Россия, Беларусь, Казахстан, Азербайджан, Грузия, Армения, Молдова, Узбекистан, Кыргызстан, Германия, Франция, Бельгия, Швейцария, Нидерланды, Польша, Чехия, Литва, Великобритания, США, Канада, Австралия, Ирландия, Новая Зеландия.',
    h1: 'Калькулятор зарплаты брутто — нетто',
  },
  uk: {
    title: 'Калькулятор зарплати брутто-нетто — податки по країнах',
    description: 'Розрахуйте нетто-зарплату з брутто. Точний розрахунок податків і соціальних внесків для 24 країн: Україна, Росія, Білорусь, Казахстан, Азербайджан, Грузія, Вірменія, Молдова, Узбекистан, Киргизстан, Німеччина, Франція, Бельгія, Швейцарія, Нідерланди, Польща, Чехія, Литва, Велика Британія, США, Канада, Австралія, Ірландія, Нова Зеландія.',
    h1: 'Калькулятор зарплати брутто — нетто',
  },
  fr: {
    title: 'Calculateur Salaire Brut Net — Impôts par pays',
    description: 'Calculez votre salaire net à partir du brut. Détail précis des impôts et cotisations sociales pour 24 pays : Ukraine, Russie, Biélorussie, Kazakhstan, Géorgie, Arménie, Moldavie, Ouzbékistan, Allemagne, France, Belgique, Suisse, Pays-Bas, Pologne, Tchéquie, Lituanie, Royaume-Uni, États-Unis, Canada, Australie, Irlande, Nouvelle-Zélande et plus.',
    h1: 'Calculateur Salaire Brut — Net',
  },
  lt: {
    title: 'Bruto į Neto Skaičiuotuvas — Convert Bruto to Neto | Lietuva',
    description: 'Apskaičiuokite neto atlyginimą iš bruto (convert bruto to neto) nemokamai. Tikslus pajamų mokesčio ir socialinio draudimo skaičiavimas Lietuvai ir 23 kitoms šalims: JK, JAV, Vokietijai, Prancūzijai ir kt.',
    h1: 'Bruto į Neto Atlyginimo Skaičiuotuvas',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our gross to net salary calculator shows exactly how much money you take home after all mandatory deductions — income tax, social security, health insurance and other contributions. Supports 24 countries including Ukraine, Russia, Belarus, Kazakhstan, Azerbaijan, Georgia, Armenia, Moldova, Uzbekistan, Kyrgyzstan, Germany, France, Belgium, Switzerland, Netherlands, Poland, Czech Republic, Lithuania, United Kingdom, USA, Canada, Australia, Ireland and New Zealand. Enter your salary as monthly, annual, or per hour — the calculator converts automatically and shows your net income per hour, month, and year.\n\nUnderstanding the difference between gross and net salary is essential for job offer comparisons, salary negotiations, and financial planning. The gap between gross and net varies significantly by country — in high-tax countries like Germany or Belgium, the difference can be 40–50%, while in lower-tax countries it may be 20–30%.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the difference between gross and net salary?', a: 'Gross salary is your total earnings before any deductions. Net salary (take-home pay) is what you receive after income tax, social security contributions, and other mandatory deductions are subtracted.' },
      { q: 'Which deductions are calculated?', a: 'The calculator includes employee-side income tax (using current progressive brackets per country) and mandatory employee social insurance contributions such as pension, health, and unemployment insurance. Employer-side contributions are not shown.' },
      { q: 'Why does net salary differ so much between countries?', a: 'Each country has its own income tax structure (flat or progressive, tax-free thresholds, credits) and different social insurance rates. For example, Lithuania has a combined employee rate of ~19.5%, Germany ~35–40%, while Ukraine is ~23% (18% income tax + 5% military levy).' },
      { q: 'Is the calculation exact?', a: 'Results are a close approximation for a single employee with no special deductions. US state income tax, German church tax, tax credits for children and dependants are not included. For exact figures, consult your payroll or HR department.' },
      { q: 'What is the gross-to-net ratio?', a: 'The gross-to-net ratio shows what percentage of gross salary you keep. For example, if your gross is £50,000 and net is £37,000, the ratio is 74% (you keep 74 pence of every £1 earned). This varies by country and income level — higher earners typically have a lower ratio.' },
      { q: 'Can I enter my hourly rate directly into the calculator?', a: 'Yes! Select "Per hour" in the salary period selector and enter your gross hourly rate. The calculator uses 2,080 working hours per year (40 h/week × 52 weeks) as the standard annual base. Results show your net income per hour, per month, and per year simultaneously. For part-time work (e.g. 20 h/week), multiply the annual net result by your share of full-time hours (20/40 = 0.5).' },
      { q: 'What is the employer\'s total cost on top of gross salary?', a: 'Employers pay additional social security contributions on top of your gross salary. These vary by country: UK ~13.8% employer NIC above the threshold; Germany ~20% total employer social contributions; France ~40–45% on top of gross; Lithuania ~1.77% employer contributions; USA ~7.65% (FICA). This is why salary negotiation and CTC (cost-to-company) matter.' },
      { q: 'How does Lithuania\'s gross-to-net salary work?', a: 'In Lithuania (2024–2025): employee pays 19.5% social insurance (12.52% + 6.98% health) and 20% GPM income tax. The non-taxable allowance (NPD) reduces the tax base for lower incomes. For a gross salary of €2,000/month, net is approximately €1,360–€1,380 after all deductions.' },
      { q: 'What is the difference between CTC and gross salary?', a: 'CTC (Cost to Company) = Gross salary + Employer-side contributions + Benefits. Gross salary is what\'s in your contract. Net salary is what hits your bank account. CTC is commonly used in India, UK (some firms), and when negotiating total compensation packages.' },
      { q: 'How do bonuses affect net salary?', a: 'Bonuses are typically taxed as income in the month they are paid, which may push you into a higher marginal tax bracket for that month. Some countries allow spread taxation or treat bonuses separately. In the UK, PAYE applies to bonuses; in Germany, bonuses use a reduced "Fünftelregelung" rate in some cases.' },
    ],
  },
  ru: {
    description: 'Калькулятор зарплаты брутто-нетто точно показывает, сколько вы получите на руки после всех обязательных вычетов — налога на доходы, взносов в социальные фонды и медицинского страхования. Поддерживает 24 страны: Украина, Россия, Беларусь, Казахстан, Азербайджан, Грузия, Армения, Молдова, Узбекистан, Кыргызстан, Германия, Франция, Бельгия, Швейцария, Нидерланды, Польша, Чехия, Литва, Великобритания, США, Канада, Австралия, Ирландия, Новая Зеландия. Введите зарплату в месяц, в год или в час — калькулятор автоматически пересчитает и покажет нетто за час, месяц и год.\n\nРазрыв между брутто и нетто существенно варьируется по странам: в Германии или Бельгии он достигает 40–50%, тогда как в России или Казахстане — 20–25%. Это важно учитывать при сравнении офферов от работодателей из разных стран.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'В чём разница между брутто и нетто?', a: 'Зарплата брутто — ваш доход до всех вычетов. Зарплата нетто (на руки) — сумма после уплаты НДФЛ, взносов в пенсионный и медицинский фонды.' },
      { q: 'Какие вычеты учитывает калькулятор?', a: 'Учитываются НДФЛ (по прогрессивным ставкам страны) и обязательные взносы работника: пенсионные, медицинские, по безработице. Взносы работодателя в расчёт не включены.' },
      { q: 'Почему нетто так сильно отличается по странам?', a: 'В каждой стране своя налоговая структура: прогрессивные или плоские ставки, необлагаемые минимумы. Например, в Литве сотрудник платит ~19,5% ЕСН, в Германии ~35–40%, на Украине ~23%.' },
      { q: 'Насколько точен расчёт?', a: 'Расчёт приблизительный для работника без специальных вычетов. Региональные налоги (штат в США, церковный налог в Германии), льготы на детей не включены. Для точного расчёта обратитесь в бухгалтерию.' },
      { q: 'Что такое коэффициент брутто-нетто?', a: 'Это процент от брутто-зарплаты, который остаётся у вас на руки. Например, брутто 100 000 ₽, нетто 85 000 ₽ — коэффициент 85%. Чем выше доход, тем ниже коэффициент из-за прогрессивного налога.' },
      { q: 'Можно ли ввести почасовую ставку напрямую?', a: 'Да! Выберите «В час» в переключателе периода и введите почасовую ставку брутто. Калькулятор использует стандарт 2 080 рабочих часов в год (40 ч/нед × 52 нед) и сразу показывает нетто в час, в месяц и в год. Для частичной занятости (например, 20 ч/нед) умножьте годовой результат на коэффициент занятости (20/40 = 0,5).' },
      { q: 'Сколько работодатель платит сверх вашей зарплаты в России?', a: 'В России работодатель платит дополнительно ~30% от фонда оплаты труда: 22% — страховые взносы в ПФР (до предела), 5,1% — в ФОМС, 2,9% — в ФСС. Именно поэтому реальная стоимость сотрудника для компании значительно выше указанной в договоре.' },
      { q: 'Как работает расчёт зарплаты в России?', a: 'В России НДФЛ с 2025 года прогрессивный: 13% — до 2,4 млн ₽, 15% — 2,4–5 млн, 18% — 5–20 млн, 20% — 20–50 млн, 22% — свыше 50 млн ₽/год. Взносы работника: включены в расчёт зарплаты работодателем (не вычитаются из брутто явно).' },
      { q: 'Что такое CTC и как это связано с зарплатой?', a: 'CTC (Cost to Company) = Брутто-зарплата + Взносы работодателя + Льготы (ДМС, обеды, транспорт). Брутто — то, что в договоре. Нетто — на руки. CTC показывает полную стоимость сотрудника для компании.' },
      { q: 'Как премии влияют на нетто-зарплату?', a: 'Премии облагаются НДФЛ в том месяце, когда выплачиваются. В России — по той же ставке, что и основная зарплата. При разовой крупной премии эффективная ставка НДФЛ может вырасти, если совокупный доход перешагнёт следующий порог прогрессивной шкалы.' },
    ],
  },
  uk: {
    description: 'Калькулятор зарплати брутто-нетто точно показує, скільки ви отримаєте на руки після всіх обов\'язкових вирахувань — податку на доходи, внесків до соціальних фондів і медичного страхування. Підтримує 24 країни: Україна, Росія, Білорусь, Казахстан, Азербайджан, Грузія, Вірменія, Молдова, Узбекистан, Киргизстан, Німеччина, Франція, Бельгія, Швейцарія, Нідерланди, Польща, Чехія, Литва, Велика Британія, США, Канада, Австралія, Ірландія, Нова Зеландія. Введіть зарплату на місяць, на рік або на годину — калькулятор автоматично перерахує і покаже нетто за годину, місяць і рік.\n\nРізниця між брутто і нетто суттєво відрізняється по країнах: у Німеччині чи Бельгії вона досягає 40–50%, тоді як в Україні чи Казахстані — 20–25%. Це важливо враховувати при порівнянні офферів від роботодавців з різних країн.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'У чому різниця між брутто і нетто?', a: 'Зарплата брутто — ваш дохід до всіх вирахувань. Зарплата нетто (на руки) — сума після сплати ПДФО, ЄСВ та інших обов\'язкових відрахувань.' },
      { q: 'Які вирахування враховує калькулятор?', a: 'Калькулятор враховує ПДФО (за прогресивними ставками країни) та обов\'язкові внески працівника: пенсійні, медичні, на безробіття. Внески роботодавця не включені.' },
      { q: 'Чому нетто так сильно відрізняється по країнах?', a: 'У кожній країні своя структура: прогресивні або фіксовані ставки, неоподатковуваний мінімум. В Україні загальна ставка ~23% (18% ПДФО + 5% військовий збір), в Литві ~19,5%, в Німеччині ~35–40%.' },
      { q: 'Наскільки точний розрахунок?', a: 'Розрахунок наближений для найманого працівника без спеціальних вирахувань. Регіональні податки, пільги на дітей не враховані.' },
      { q: 'Що таке коефіцієнт брутто-нетто?', a: 'Це відсоток від брутто-зарплати, який залишається на руках. Наприклад, брутто 30 000 грн, нетто 23 100 грн — коефіцієнт 77%. Що вищий дохід у країнах з прогресивним оподаткуванням, то нижчий коефіцієнт.' },
      { q: 'Чи можна ввести погодинну ставку безпосередньо?', a: 'Так! Виберіть «На годину» в перемикачі періоду і введіть погодинну ставку брутто. Калькулятор використовує стандарт 2 080 робочих годин на рік (40 год/тиж × 52 тиж) і одразу показує нетто на годину, місяць і рік. Для неповного робочого дня (наприклад, 20 год/тиж) помножте річний результат на коефіцієнт зайнятості (20/40 = 0,5).' },
      { q: 'Скільки роботодавець платить понад вашу зарплату в Україні?', a: 'В Україні роботодавець сплачує ЄСВ 22% від фонду оплати праці. Наприклад, якщо ваша брутто-зарплата 30 000 грн, роботодавець ще сплачує 6 600 грн ЄСВ. Реальна вартість вас для компанії — 36 600 грн.' },
      { q: 'Як розраховується зарплата нетто в Україні?', a: 'В Україні ПДФО — 18% від брутто, військовий збір — 1,5% (разом 19,5%). ЄСВ (22%) сплачує роботодавець, не вираховуючи з зарплати. Нетто = Брутто × (1 − 0,195). Для ФОП 3-ї групи — окремі ставки.' },
      { q: 'Що таке CTC і як це пов\'язано з зарплатою?', a: 'CTC (Cost to Company) = Брутто-зарплата + Внески роботодавця + Пільги (медстрахування, обіди, транспорт). Показує повну вартість працівника для компанії. Нетто — те, що ви отримуєте на руки.' },
      { q: 'Як премії впливають на нетто-зарплату?', a: 'Премії оподатковуються ПДФО та військовим збором (разом 19,5%) в тому місяці, коли виплачуються. При виплаті річної премії сума місячного оподатковуваного доходу зростає, але ставка в Україні фіксована, тому ефект мінімальний.' },
    ],
  },
  fr: {
    description: 'Notre calculateur salaire brut-net vous indique exactement ce que vous percevez après toutes les retenues obligatoires — impôt sur le revenu, cotisations sociales et assurance maladie. Compatible avec 24 pays : Ukraine, Russie, Biélorussie, Kazakhstan, Azerbaïdjan, Géorgie, Arménie, Moldavie, Ouzbékistan, Kirghizistan, Allemagne, France, Belgique, Suisse, Pays-Bas, Pologne, Tchéquie, Lituanie, Royaume-Uni, États-Unis, Canada, Australie, Irlande, Nouvelle-Zélande. Saisissez votre salaire mensuel, annuel ou horaire — le calculateur convertit automatiquement et affiche votre net par heure, par mois et par an.\n\nL\'écart brut-net varie considérablement selon les pays : en Belgique ou en Allemagne, il peut atteindre 40–50 %, tandis qu\'en Ukraine ou au Kazakhstan il est de 20–25 %. À prendre en compte impérativement lors de la comparaison d\'offres d\'emploi internationales.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quelle est la différence entre salaire brut et salaire net ?', a: 'Le salaire brut est votre rémunération totale avant toute retenue. Le salaire net (ou « à emporter ») est ce que vous percevez après la déduction de l\'impôt sur le revenu, des cotisations sociales et des autres prélèvements obligatoires.' },
      { q: 'Quelles retenues sont calculées ?', a: 'Le calculateur inclut l\'impôt sur le revenu (barèmes progressifs du pays) et les cotisations sociales salariales : retraite, santé, chômage. Les cotisations patronales ne sont pas incluses.' },
      { q: 'Pourquoi le salaire net varie-t-il autant selon les pays ?', a: 'Chaque pays a sa propre structure fiscale et des taux de cotisations sociales différents. En France les cotisations salariales représentent ~22–23 % du brut, en Allemagne ~20 %, en Lituanie ~19,5 %, en Ukraine ~19,5 %.' },
      { q: 'Le calcul est-il exact ?', a: 'Le résultat est une approximation pour un salarié célibataire sans déductions particulières. Taxes régionales (impôt d\'État aux États-Unis, taxe d\'église en Allemagne) et crédits pour enfants non inclus.' },
      { q: 'Quel est le ratio brut-net ?', a: 'Le ratio brut-net indique quelle part du salaire brut vous conservez. Par exemple, brut 50 000 €, net 33 000 € → ratio 66 %. En France, ce ratio est généralement entre 75–80 % pour un cadre (hors cotisations patronales).' },
      { q: 'Puis-je saisir mon taux horaire directement ?', a: 'Oui ! Sélectionnez « Par heure » dans le sélecteur de période et saisissez votre taux horaire brut. Le calculateur utilise 2 080 heures de travail par an (40 h/semaine × 52 semaines) comme base standard. Les résultats affichent votre net par heure, par mois et par an simultanément. Pour un temps partiel (ex. 20 h/sem), multipliez le résultat annuel par votre taux d\'occupation (20/40 = 0,5).' },
      { q: 'Quel est le coût total d\'un employé pour l\'employeur en France ?', a: 'En France, les cotisations patronales s\'élèvent à environ 40–45 % du salaire brut (variable selon le niveau de rémunération et les exonérations). Un salarié au SMIC coûte environ 1,6× le SMIC brut à l\'employeur. Le coût total est donc nettement supérieur au salaire indiqué dans le contrat.' },
      { q: 'Comment fonctionne le calcul brut-net en France ?', a: 'En France : les cotisations salariales (retraite, santé, chômage, CSG/CRDS) représentent environ 22–23 % du brut. L\'impôt sur le revenu (IR) est prélevé à la source (PAS) depuis 2019. Le taux PAS dépend du foyer fiscal. Pour un célibataire au salaire médian (~2 500 € brut/mois), le net est environ 1 950–2 000 €.' },
      { q: 'Qu\'est-ce que le package salarial (CTC) ?', a: 'Le CTC (Cost to Company) = Salaire brut + Cotisations patronales + Avantages (mutuelle, tickets restaurant, véhicule de fonction, participation). Il représente le coût réel pour l\'employeur. Lors d\'une négociation, certains employeurs présentent le CTC plutôt que le brut.' },
      { q: 'Comment les primes affectent-elles le salaire net ?', a: 'Les primes sont soumises à l\'impôt sur le revenu et aux cotisations sociales dans le mois de versement. Une prime annuelle peut faire monter le taux marginal d\'imposition ce mois-là. En France, certaines primes (participation, intéressement, prime Macron/PPV) bénéficient d\'exonérations fiscales et sociales.' },
    ],
  },
  lt: {
    description: 'Mūsų bruto į neto atlyginimo skaičiuotuvas tiksliai parodo, kiek gausite po visų privalomų išskaitymų — pajamų mokesčio, socialinio draudimo ir sveikatos draudimo įmokų. Palaikomos 24 šalys: Ukraina, Rusija, Baltarusija, Kazachstanas, Azerbaidžanas, Gruzija, Armėnija, Moldova, Uzbekistanas, Kirgizija, Vokietija, Prancūzija, Belgija, Šveicarija, Nyderlandai, Lenkija, Čekija, Lietuva, JK, JAV, Kanada, Australija, Airija, Naujoji Zelandija. Įveskite atlyginimą mėnesiniu, metiniu arba valandiniu tarifu — skaičiuotuvas automatiškai konvertuos ir parodys neto per valandą, mėnesį ir metus.\n\nSkirtumas tarp bruto ir neto labai skiriasi pagal šalis: Belgijoje ar Vokietijoje jis gali siekti 40–50 %, Ukrainoje ar Kazachstane — 20–25 %. Tai svarbu lyginant darbo pasiūlymus iš skirtingų šalių.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Koks skirtumas tarp bruto ir neto atlyginimo?', a: 'Bruto atlyginimas — jūsų pajamos prieš bet kokius atskaitymus. Neto atlyginimas (į rankas) — suma po pajamų mokesčio, socialinio draudimo ir kitų privalomų išskaitymų.' },
      { q: 'Kokie išskaitymai skaičiuojami?', a: 'Skaičiuotuvas apima pajamų mokestį (GPM) ir privalomus darbuotojo socialinio draudimo įnašus: pensijų, sveikatos, nedarbo draudimą. Darbdavio mokamos įmokos neįtrauktos.' },
      { q: 'Kodėl neto atlyginimas taip skiriasi pagal šalis?', a: 'Kiekviena šalis turi savo mokesčių struktūrą. Lietuvoje darbuotojas moka ~19,5 % (12,52 % + 6,98 %) socialinio draudimo ir 20 % GPM. Vokietijoje bendra našta ~35–40 %, Prancūzijoje ~22–23 % tik socialinės įmokos.' },
      { q: 'Ar skaičiavimas tikslus?', a: 'Rezultatas yra apytiksliai tikslus vienišam darbuotojui be specialių atskaitymų. Regioniniai mokesčiai, NPD (neapmokestinamosios pajamos) vaikams ir kitiems išlaikytiniams neįtraukti.' },
      { q: 'Koks yra bruto-neto koeficientas?', a: 'Tai procentas nuo bruto, kurį gausite į rankas. Pvz., bruto 2 000 €, neto 1 380 € → koeficientas 69 %. Lietuvoje vidutinis koeficientas yra apie 68–75 % priklausomai nuo pajamų lygio ir NPD.' },
      { q: 'Ar galiu įvesti valandinį tarifą tiesiogiai?', a: 'Taip! Pasirinkite „Per valandą" periodo pasirinkime ir įveskite bruto valandinį tarifą. Skaičiuotuvas naudoja 2 080 darbo valandų per metus (40 val./sav. × 52 sav.) kaip standartą. Rezultatai rodo neto per valandą, per mėnesį ir per metus vienu metu. Darbui ne pilnu etatu (pvz. 20 val./sav.) padauginkite metinį rezultatą iš užimtumo koeficiento (20/40 = 0,5).' },
      { q: 'Kiek darbdavys moka viršaus jūsų atlyginimo Lietuvoje?', a: 'Lietuvoje darbdavio socialinio draudimo įmokos yra 1,77 % darbuotojo bruto atlyginimo — tai vienas žemiausių rodiklių ES. Tačiau darbuotojas moka 12,52 % + 6,98 % = 19,5 % iš savo bruto ir 20 % GPM.' },
      { q: 'Kaip apskaičiuojamas neto atlyginimas Lietuvoje?', a: 'Lietuvoje (2024): nuo bruto atskaitomi 12,52 % pensijų draudimo + 6,98 % sveikatos draudimo = 19,5 %. Likusios sumos (bruto × 0,805) neapmokestinamoji pajamų dalis (NPD) sumažina GPM bazę. GPM tarifas 20 % (iki 101 094 €/m.) arba 32 % (virš).' },
      { q: 'Kas yra CTC ir kaip tai susiję su atlyginimu?', a: 'CTC (Cost to Company) = Bruto atlyginimas + Darbdavio įmokos + Privalumai (sveikatos draudimas, maisto čekiai, automobilis). Parodo tikrąją darbuotojo kainą įmonei. Derybose kai kurie darbdaviai nurodo CTC, o ne bruto.' },
      { q: 'Kaip premijos veikia neto atlyginimą?', a: 'Premijos apmokestinamos GPM ir socialinio draudimo įmokomis tą mėnesį, kurį išmokamos. Jei mėnesinės pajamos su premija viršija 101 094 € / 12 = 8 424 € ribą, viršijanti dalis apmokestinama 32 % tarifu.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/freelance-rate', label: 'Freelance Rate Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }, { href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/margin', label: 'Margin Calculator' }],
  ru: [{ href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' }, { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }, { href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/margin', label: 'Калькулятор маржи' }],
  uk: [{ href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' }, { href: '/calculator/freelance-rate', label: 'Калькулятор ставки фрилансера' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }, { href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/margin', label: 'Калькулятор маржі' }],
  fr: [{ href: '/calculator/income-tax', label: 'Calculatrice impôt sur le revenu' }, { href: '/calculator/freelance-rate', label: 'Calculatrice taux freelance' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }, { href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/margin', label: 'Calculatrice marge' }],
  lt: [{ href: '/calculator/income-tax', label: 'Pajamų mokesčio skaičiuotuvas' }, { href: '/calculator/freelance-rate', label: 'Laisvai samdomų tarifų skaičiuotuvas' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }, { href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/margin', label: 'Maržos skaičiuotuvas' }],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/salary'),
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function SalaryPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/salary`,
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
        <SalaryCalculator locale={locale} />

        <AdInline locale={locale} />

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
