import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CarInsuranceCalculator from './CarInsuranceCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import DisclaimerNote from '@/components/ui/DisclaimerNote';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/loan', label: 'Loan Calculator' }, { href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/life-insurance', label: 'Life Insurance Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/mortgage', label: 'Mortgage Calculator' }],
  ru: [{ href: '/calculator/loan', label: 'Калькулятор кредита' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/life-insurance', label: 'Калькулятор страхования жизни' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/mortgage', label: 'Ипотечный калькулятор' }],
  uk: [{ href: '/calculator/loan', label: 'Калькулятор кредиту' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/life-insurance', label: 'Калькулятор страхування життя' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/mortgage', label: 'Іпотечний калькулятор' }],
  fr: [{ href: '/calculator/loan', label: 'Calculatrice de prêt' }, { href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/life-insurance', label: 'Assurance vie' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/mortgage', label: 'Calculatrice de prêt immobilier' }],
  lt: [{ href: '/calculator/loan', label: 'Paskolos skaičiuotuvas' }, { href: '/calculator/roi', label: 'RI skaičiuotuvas' }, { href: '/calculator/life-insurance', label: 'Gyvybės draudimo skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/mortgage', label: 'Hipotekos skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Car Insurance Calculator — Estimate Your Premium',
    description: 'Free car insurance calculator. Estimate your annual and monthly auto insurance premium based on vehicle value, driver age, experience and country.',
    h1: 'Car Insurance Calculator',
    subtitle: 'Estimate your car insurance cost before you buy',
  },
  ru: {
    title: 'Калькулятор страховки автомобиля — расчёт стоимости ОСАГО и КАСКО',
    description: 'Бесплатный калькулятор страховки автомобиля. Рассчитайте стоимость ОСАГО и КАСКО по стоимости авто, возрасту водителя и стажу.',
    h1: 'Калькулятор страховки автомобиля',
    subtitle: 'Рассчитайте стоимость страховки автомобиля онлайн',
  },
  uk: {
    title: 'Калькулятор страховки автомобіля — розрахунок ОСЦПВ і КАСКО',
    description: 'Безкоштовний калькулятор страховки автомобіля. Розрахуйте вартість ОСЦПВ і КАСКО за вартістю авто, віком водія та стажем.',
    h1: 'Калькулятор страховки автомобіля',
    subtitle: 'Розрахуйте вартість страховки авто онлайн',
  },
  fr: {
    title: 'Calculatrice d\'assurance auto — Estimez votre prime',
    description: 'Calculatrice d\'assurance auto gratuite. Estimez votre prime annuelle et mensuelle selon la valeur du véhicule, l\'âge du conducteur et le pays.',
    h1: 'Calculatrice d\'assurance auto',
    subtitle: 'Estimez le coût de votre assurance auto en ligne',
  },
  lt: {
    title: 'Automobilio draudimo skaičiuotuvas — įmokos įvertinimas',
    description: 'Nemokamas automobilio draudimo skaičiuotuvas. Įvertinkite metinę ir mėnesinę draudimo įmoką pagal automobilio vertę, vairuotojo amžių ir patirtį.',
    h1: 'Automobilio draudimo skaičiuotuvas',
    subtitle: 'Apskaičiuokite automobilio draudimo kainą internetu',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our free car insurance calculator to get an instant estimate of your annual and monthly premium. Enter your vehicle\'s value, age, your driving history and the type of coverage you need — and we\'ll calculate an approximate cost based on typical market rates across 8 countries.\n\nCar insurance premiums vary dramatically by country, age, and coverage type. This tool helps you understand the ballpark cost before getting formal quotes. Always compare at least 3 insurers, as rates for the same driver and vehicle can differ by 40–60%.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What factors affect car insurance premiums?', a: 'Main factors: vehicle value and age, driver age and experience, accident history, annual mileage, coverage type (liability vs comprehensive), location, and the country of registration. In some countries, credit score and profession also affect the rate.' },
      { q: 'What is the difference between liability and comprehensive coverage?', a: 'Liability (MTPL/third-party) covers damage you cause to others — mandatory in all countries. Comprehensive (CASCO/fully-comp) also covers your own vehicle from accidents, theft, fire, vandalism, and weather. Comprehensive costs roughly 3–5× more than liability alone.' },
      { q: 'Why do young drivers pay more?', a: 'Drivers under 25 statistically cause more accidents. Insurers price this risk with surcharges of 50–100% above the base rate. The premium typically drops significantly at ages 25 and 30 as the driver builds a clean record.' },
      { q: 'How accurate is this calculator?', a: 'This is an approximate estimate based on average market rates. Actual premiums vary significantly by specific insurer, exact vehicle model, credit score (in some countries), and local conditions. Always get quotes from multiple insurers.' },
      { q: 'What is the bonus-malus (no-claims discount) system?', a: 'Bonus-malus is a system used in France, Germany, Lithuania, and other countries where your premium adjusts based on claims history. Each claim-free year earns a discount (bonus); each at-fault claim increases the rate (malus). In France, the coefficient ranges from 0.5 (best) to 3.5 (worst). After a long claim-free period, savings can reach 50%.' },
      { q: 'Does my car insurance cover driving abroad?', a: 'Third-party liability (MTPL) covers you in all EU/EEA countries automatically — the Green Card is the standard proof. Comprehensive (CASCO) coverage abroad depends on your policy. Check your policy for the geographic coverage zone, especially outside the EU.' },
      { q: 'How can I reduce my car insurance premium?', a: 'Effective ways to lower premiums: increase your voluntary excess/deductible; park in a garage; choose a lower-risk vehicle; maintain a claim-free record; pay annually rather than monthly; add an experienced named driver; limit annual mileage; take an advanced driving course (in some countries).' },
      { q: 'What is an excess/deductible?', a: 'The excess (or deductible) is the amount you pay out of pocket for each claim before the insurer pays the rest. A higher excess means a lower annual premium. For example, raising your excess from €200 to €500 can reduce your CASCO premium by 15–25%. Only make claims for amounts significantly above your excess.' },
      { q: 'Does the age of my car affect the premium?', a: 'Yes. Comprehensive (CASCO) insurance for a new or high-value car is most expensive. As the car ages and depreciates, CASCO premiums fall — or it may no longer make economic sense to insure comprehensively. For cars older than 7–10 years, third-party only is often the better financial decision.' },
      { q: 'What is Green Card insurance?', a: 'The Green Card (International Motor Insurance Certificate) is the standard document proving you have at least third-party liability insurance valid for travel in the issuing country and participating countries. It is required when driving in non-EU countries that are Green Card member states (e.g. Ukraine, Turkey, Morocco). Most EU insurers provide it automatically.' },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором страховки автомобиля для мгновенной оценки стоимости ОСАГО или КАСКО. Введите стоимость и возраст авто, ваш стаж и историю ДТП — и получите приблизительную стоимость на основе рыночных ставок в 8 странах.\n\nСтоимость страховки существенно варьируется в зависимости от страны, возраста водителя и типа покрытия. Всегда сравнивайте предложения минимум 3–4 страховщиков — разброс цен для одного и того же автомобиля может достигать 40–60%.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что влияет на стоимость страховки?', a: 'Основные факторы: стоимость и возраст авто, возраст и стаж водителя, история ДТП, пробег, тип страхования (ОСАГО или КАСКО), регион регистрации.' },
      { q: 'Чем отличается ОСАГО от КАСКО?', a: 'ОСАГО — обязательное страхование гражданской ответственности: покрывает ущерб, причинённый другим участникам движения. КАСКО — добровольное: страхует ваш автомобиль от ДТП, угона, пожара, стихии. КАСКО стоит в 3–5 раз дороже ОСАГО.' },
      { q: 'Почему молодые водители платят больше?', a: 'Водители до 25 лет статистически попадают в ДТП чаще. Надбавка к базовому тарифу — 50–100%. Страховые тарифы заметно снижаются при достижении 25 и 30 лет при чистой страховой истории.' },
      { q: 'Насколько точен этот калькулятор?', a: 'Это приблизительная оценка на основе средних рыночных ставок. Реальная стоимость зависит от конкретного страховщика, марки и модели авто, региона. Всегда сравнивайте предложения нескольких компаний.' },
      { q: 'Что такое коэффициент бонус-малус (КБМ)?', a: 'КБМ — коэффициент, отражающий историю страховых случаев водителя. Без аварий — КБМ снижается (скидка до 50% за 10 лет без выплат). После ДТП по вашей вине — КБМ растёт (доп. нагрузка). КБМ хранится в базе РСА и переносится при смене страховщика.' },
      { q: 'Покрывает ли российская страховка езду за рубежом?', a: 'ОСАГО действует только на территории России. Для поездок в страны Зелёной карты (Украина, Беларусь, Казахстан, Европа) необходима Зелёная карта — отдельный полис. КАСКО за рубежом: зависит от условий договора, уточняйте у страховщика.' },
      { q: 'Как снизить стоимость страховки?', a: 'Эффективные способы: поддерживать безаварийный стаж (снижает КБМ); выбирать более высокую франшизу; парковаться в гараже; ограничить список допущенных водителей; сравнивать предложения через агрегаторы; оформлять телематику (для аккуратных водителей).' },
      { q: 'Что такое франшиза?', a: 'Франшиза — сумма, которую вы оплачиваете самостоятельно при каждом страховом случае. Чем выше франшиза, тем ниже стоимость полиса КАСКО. Например, франшиза 20 000 ₽ снижает премию на 15–25%. Не обращайтесь за выплатой, если ущерб незначительно превышает франшизу.' },
      { q: 'Влияет ли возраст автомобиля на стоимость КАСКО?', a: 'Да. Новые дорогие автомобили — самое дорогое КАСКО. С возрастом авто дешевеет и стоимость КАСКО снижается. Для авто старше 7–10 лет КАСКО часто экономически нецелесообразно — дешевле обходиться ОСАГО.' },
      { q: 'Что такое Зелёная карта?', a: 'Зелёная карта — международный страховой сертификат, подтверждающий наличие минимального ОСАГО, действующего в странах-участницах системы. Обязательна для въезда во многие страны. Приобретается дополнительно у любого страховщика.' },
    ],
  },
  uk: {
    description: 'Скористайтеся безкоштовним калькулятором страховки автомобіля для миттєвої оцінки вартості ОСЦПВ або КАСКО. Введіть вартість і вік авто, ваш стаж і історію ДТП — отримайте приблизну вартість на основі ринкових ставок у 8 країнах.\n\nВартість страховки суттєво варіюється залежно від країни, віку водія та типу покриття. Завжди порівнюйте пропозиції мінімум 3–4 страховиків — різниця цін для одного автомобіля може сягати 40–60%.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що впливає на вартість страховки?', a: 'Основні фактори: вартість і вік авто, вік і стаж водія, історія ДТП, пробіг, тип страхування (ОСЦПВ або КАСКО), регіон реєстрації.' },
      { q: 'Чим відрізняється ОСЦПВ від КАСКО?', a: 'ОСЦПВ — обов\'язкове страхування цивільної відповідальності: покриває збитки іншим учасникам руху. КАСКО — добровільне: страхує власний автомобіль від ДТП, угону, пожежі. КАСКО коштує в 3–5 разів дорожче.' },
      { q: 'Чому молоді водії платять більше?', a: 'Водії до 25 років статистично частіше потрапляють у ДТП. Надбавка до базового тарифу — 50–100%. Тарифи помітно знижуються після 25 та 30 років при чистій страховій історії.' },
      { q: 'Наскільки точний цей калькулятор?', a: 'Це приблизна оцінка на основі середніх ринкових ставок. Реальна вартість залежить від конкретного страховика, марки та моделі авто та регіону. Завжди порівнюйте пропозиції кількох компаній.' },
      { q: 'Що таке коефіцієнт бонус-малус?', a: 'Це коефіцієнт, що відображає страхову історію водія. Без аварій — знижка до 50% за 10 років без виплат. Після ДТП з вашої вини — надбавка. В Україні зберігається в базі МТСБУ і переноситься при зміні страховика.' },
      { q: 'Чи покриває українська страховка поїздки за кордон?', a: 'ОСЦПВ діє лише на території України. Для поїздок за кордон потрібна Зелена карта — окремий поліс для країн-учасниць системи. КАСКО за кордоном: залежить від умов договору, уточнюйте у страховика.' },
      { q: 'Як знизити вартість страховки?', a: 'Ефективні способи: підтримувати безаварійний стаж; вибирати вищу франшизу; паркуватися в гаражі; обмежити список допущених водіїв; порівнювати пропозиції через агрегатори; встановити телематику.' },
      { q: 'Що таке франшиза?', a: 'Франшиза — сума, яку ви сплачуєте самостійно при кожному страховому випадку. Вища франшиза — нижча вартість полісу КАСКО. Наприклад, франшиза 5 000 грн знижує премію на 15–25%.' },
      { q: 'Чи впливає вік автомобіля на вартість КАСКО?', a: 'Так. Нові дорогі автомобілі — найдорожче КАСКО. З віком авто дешевшає і вартість КАСКО знижується. Для авто старше 7–10 років КАСКО часто економічно недоцільне.' },
      { q: 'Що таке Зелена карта?', a: 'Зелена карта — міжнародний страховий сертифікат, що підтверджує наявність мінімального ОСЦПВ у країнах-учасницях системи. Обов\'язкова для в\'їзду до країн ЄС та інших держав-учасниць. Придбавається додатково у будь-якого страховика.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice d\'assurance auto gratuite pour estimer instantanément votre prime annuelle et mensuelle. Entrez la valeur de votre véhicule, son âge, votre expérience et vos antécédents — obtenez une estimation basée sur les tarifs du marché dans 8 pays.\n\nLes primes d\'assurance auto varient considérablement selon les pays, l\'âge du conducteur et le type de couverture. Comparez toujours au moins 3 assureurs — l\'écart peut atteindre 40–60 % pour le même véhicule et le même conducteur.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quels facteurs influencent la prime d\'assurance auto ?', a: 'Principaux facteurs : valeur et âge du véhicule, âge et expérience du conducteur, historique sinistres, kilométrage annuel, type de couverture (RC ou tous risques), département de résidence.' },
      { q: 'Quelle est la différence entre RC et tous risques ?', a: 'La RC (responsabilité civile) couvre les dommages causés aux tiers — obligatoire. Le tous risques couvre également votre propre véhicule (accidents, vol, incendie, bris de glace). Le tous risques coûte environ 3 à 5 fois plus cher.' },
      { q: 'Pourquoi les jeunes conducteurs paient-ils plus ?', a: 'Les conducteurs de moins de 25 ans causent statistiquement plus d\'accidents. La surprime peut atteindre 100 % en début de carrière. Elle disparaît progressivement avec les années de conduite sans sinistre.' },
      { q: 'Quelle est la précision de cette calculatrice ?', a: 'Il s\'agit d\'une estimation approximative. Les primes réelles varient selon l\'assureur, le modèle exact, la zone de résidence et d\'autres facteurs. Comparez toujours plusieurs devis.' },
      { q: 'Comment fonctionne le bonus-malus en France ?', a: 'En France, le coefficient bonus-malus part de 1,00. Chaque année sans sinistre responsable le réduit de 5 % (minimum 0,50 = 50 % de réduction). Chaque sinistre responsable l\'augmente de 25 %. Il est transmis à tout nouvel assureur.' },
      { q: 'Mon assurance couvre-t-elle les voyages à l\'étranger ?', a: 'La RC couvre automatiquement les pays de l\'UE/EEE et les pays signataires de la Carte Verte. La garantie tous risques à l\'étranger dépend de votre contrat. Vérifiez la zone géographique couverte, surtout hors UE.' },
      { q: 'Comment réduire ma prime d\'assurance auto ?', a: 'Moyens efficaces : augmenter la franchise ; garant dans un parking fermé ; limiter le kilométrage annuel ; souscrire une conduite accompagnée (jeune conducteur) ; regrouper assurances auto et habitation chez le même assureur ; comparer via un comparateur en ligne (LeLynx, AssuranceZ...).' },
      { q: 'Qu\'est-ce que la franchise ?', a: 'La franchise est le montant restant à votre charge pour chaque sinistre. Une franchise plus élevée réduit la prime. En France, une franchise de 500 € peut réduire le coût du tous risques de 15–25 %. Ne déclarez pas un sinistre dont le coût est proche ou inférieur à votre franchise.' },
      { q: 'L\'âge de mon véhicule influence-t-il la prime ?', a: 'Oui. Le tous risques est plus coûteux pour un véhicule neuf ou de valeur élevée. À mesure que le véhicule se déprécie, la prime baisse. Pour un véhicule de plus de 7–10 ans, il est souvent plus rentable de passer à une simple RC.' },
      { q: 'Qu\'est-ce que la Carte Verte ?', a: 'La Carte Verte (ou IDA) est le document international prouvant que vous disposez d\'une assurance RC valable dans les pays membres du Bureau International de l\'Automobile. Elle est requise dans de nombreux pays hors UE (Maroc, Tunisie, Turquie...). Votre assureur vous la fournit gratuitement.' },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą automobilio draudimo skaičiuotuvą, kad įvertintumėte metinę ir mėnesinę draudimo įmoką. Įveskite automobilio vertę, amžių, vairavimo patirtį ir avarijų istoriją — gaukite įvertinimą pagal rinkos tarifus 8 šalyse.\n\nDraudimo įmokos labai skiriasi priklausomai nuo šalies, vairuotojo amžiaus ir draudimo tipo. Visada palyginkite mažiausiai 3 draudikų pasiūlymus — to paties automobilio kaina gali skirtis 40–60 %.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kokie veiksniai lemia draudimo įmoką?', a: 'Pagrindiniai veiksniai: automobilio vertė ir amžius, vairuotojo amžius ir patirtis, avarijų istorija, metinis rida, draudimo tipas (civilinė atsakomybė ar visapusis) ir gyvenamoji vieta.' },
      { q: 'Kuo skiriasi civilinė atsakomybė nuo visapusio draudimo?', a: 'Civilinė atsakomybė (TPVC/privalomoji) dengia žalą, padarytą kitiems — privaloma. Visapusis draudimas (KASKO) taip pat dengia žalą jūsų paties automobiliui (avarijos, vagystė, gaisras). KASKO kainuoja maždaug 3–5 kartus daugiau.' },
      { q: 'Kodėl jauni vairuotojai moka daugiau?', a: 'Vairuotojai iki 25 metų statistiškai dažniau sukelia avarijas. Priedas prie bazinio tarifo — 50–100 %. Jis palaipsniui mažėja kaupiant patirtį be eismo įvykių.' },
      { q: 'Koks šio skaičiuotuvo tikslumas?', a: 'Tai apytikslis įvertinimas pagal vidutines rinkos normas. Tikrosios įmokos priklauso nuo konkretaus draudiko, automobilio modelio ir gyvenamosios vietos. Visada lyginkite kelių draudikų pasiūlymus.' },
      { q: 'Kaip veikia bonus-malus sistema Lietuvoje?', a: 'Lietuvoje bonus-malus koeficientas prasideda nuo 1,0. Kiekvieni metai be žalingų įvykių mažina koeficientą 5 % (minimumas 0,5 = 50 % nuolaida). Kiekvienas žalingas įvykis didina koeficientą 25 %. Koeficientas perkeliamas keičiant draudiką.' },
      { q: 'Ar mano draudimas galioja užsienyje?', a: 'Privalomoji TPVC automatiškai galioja ES/EEE šalyse ir Žaliosios kortelės sistemos šalyse. Visapusio draudimo (KASKO) galiojimas užsienyje priklauso nuo sutarties sąlygų — pasitikslinkite pas draudiką.' },
      { q: 'Kaip sumažinti draudimo įmoką?', a: 'Efektyvūs būdai: didinti savanorišką franšizę; laikyti automobilį garaže; riboti metinę ridą; palaikyti švarią draudimo istoriją; lyginti pasiūlymus internetu (draudimo agregatoriai); jungti auto ir turto draudimą pas tą patį draudiką.' },
      { q: 'Kas yra franšizė?', a: 'Franšizė — suma, kurią mokate patys kiekvieno draudiminio įvykio metu. Didesnė franšizė = mažesnė metinė įmoka. Pvz., 300 € franšizė gali sumažinti KASKO įmoką 15–25 %. Neteikite pretenzijų, jei žala artima franšizei ar mažesnė.' },
      { q: 'Ar automobilio amžius veikia KASKO kainą?', a: 'Taip. KASKO naujam ar brangiam automobiliui yra brangiausias. Automobiliui senstant ir nusidėvint, KASKO kaina krenta. Automobilims vyresniems nei 7–10 metų dažnai ekonomiškai tikslinga likti tik prie privalomosios TPVC.' },
      { q: 'Kas yra Žalioji kortelė?', a: 'Žalioji kortelė — tarptautinis draudimo sertifikatas, patvirtinantis privalomąjį TPVC draudimą Žaliosios kortelės sistemos šalyse. Reikalinga keliaujant į ne ES šalis (Ukraina, Turkija, Marokas ir kt.). Draudikai ją išduoda nemokamai kartu su polisu.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/car-insurance', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CarInsurancePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/car-insurance`,
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
        <CarInsuranceCalculator locale={locale} />

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
