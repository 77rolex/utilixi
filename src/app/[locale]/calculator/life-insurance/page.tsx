import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import LifeInsuranceCalculator from './LifeInsuranceCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/pension', label: 'Pension Calculator' },
    { href: '/calculator/income-tax', label: 'Income Tax Calculator' },
    { href: '/calculator/car-insurance', label: 'Car Insurance Calculator' },
  ],
  ru: [
    { href: '/calculator/pension', label: 'Пенсионный калькулятор' },
    { href: '/calculator/income-tax', label: 'Калькулятор подоходного налога' },
    { href: '/calculator/car-insurance', label: 'Калькулятор страховки авто' },
  ],
  uk: [
    { href: '/calculator/pension', label: 'Пенсійний калькулятор' },
    { href: '/calculator/income-tax', label: 'Калькулятор прибуткового податку' },
    { href: '/calculator/car-insurance', label: 'Калькулятор страховки авто' },
  ],
  fr: [
    { href: '/calculator/pension', label: 'Calculatrice Retraite' },
    { href: '/calculator/income-tax', label: 'Impôt sur le revenu' },
    { href: '/calculator/car-insurance', label: 'Assurance auto' },
  ],
  lt: [
    { href: '/calculator/pension', label: 'Pensijų skaičiuotuvas' },
    { href: '/calculator/income-tax', label: 'Pajamų mokestis' },
    { href: '/calculator/car-insurance', label: 'Automobilio draudimas' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Term Life Insurance Calculator — Free Estimate for UK & US',
    description: 'Free term life insurance calculator online. Estimate your monthly and annual premium by age, gender, coverage amount, policy term, health and smoking status. Instant results for UK, US and EU — no registration required.',
    h1: 'Life Insurance Calculator',
  },
  ru: {
    title: 'Калькулятор страхования жизни — расчёт стоимости полиса онлайн',
    description: 'Бесплатный калькулятор страхования жизни онлайн. Рассчитайте ежемесячную и годовую стоимость полиса по возрасту, полу, сумме покрытия, сроку и состоянию здоровья.',
    h1: 'Калькулятор страхования жизни',
  },
  uk: {
    title: 'Калькулятор страхування життя — розрахунок вартості поліса онлайн',
    description: 'Безкоштовний калькулятор страхування життя онлайн. Розрахуйте щомісячну і річну вартість поліса за віком, статтю, сумою покриття, терміном та станом здоров\'я.',
    h1: 'Калькулятор страхування життя',
  },
  fr: {
    title: 'Calculatrice Assurance Vie Gratuite — Estimez votre prime en ligne',
    description: 'Calculatrice d\'assurance vie gratuite en ligne. Estimez votre prime mensuelle et annuelle selon l\'âge, le sexe, le montant assuré, la durée et l\'état de santé. Marché FR, BE, CH.',
    h1: 'Calculatrice d\'assurance vie',
  },
  lt: {
    title: 'Gyvybės draudimo skaičiuotuvas — įmokos skaičiavimas internetu',
    description: 'Nemokamas gyvybės draudimo skaičiuotuvas internetu. Apskaičiuokite mėnesinę ir metinę įmoką pagal amžių, lytį, draudimo sumą, terminą ir sveikatos būklę.',
    h1: 'Gyvybės draudimo skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Use our free life insurance calculator to estimate the monthly and annual cost of a term life insurance policy. Enter your age, gender, desired coverage amount, policy term (10–30 years), smoking status and overall health — and get an instant estimate based on typical market rates for the US, UK and EU.\n\nTerm life insurance is the most straightforward and affordable way to protect your family financially. Unlike whole-of-life policies, it covers a set period — the years when your dependants need protection most. Our calculator helps you understand how much coverage you need and what a realistic premium looks like before you contact an insurer.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is term life insurance?', a: 'Term life insurance provides coverage for a specific period (10–30 years). If you die during the term, the insurer pays the coverage amount to your beneficiaries. It\'s the most affordable type of life insurance and has no savings or investment component.' },
      { q: 'How much life insurance do I need?', a: 'A common rule of thumb is 10–12× your annual income. Consider your outstanding debts (mortgage, loans), dependants\' living needs, children\'s education costs, and how many years your family would need financial support without your income. A person earning £40,000/year with a mortgage and two children might need £400,000–£500,000 of cover.' },
      { q: 'How is the life insurance premium calculated?', a: 'Premiums depend on your age, gender, health status, smoking habits, coverage amount and policy term. Actuarial mortality tables translate these factors into a monthly cost. Our calculator applies typical market multipliers: age doubles the rate from the 30s to 40s, and doubles again from 40s to 50s.' },
      { q: 'Why does age affect premiums so much?', a: 'Life insurance premiums are based on mortality risk. As you age, the statistical probability of dying during the policy term increases significantly, especially after 40. Buying term life insurance when young and healthy locks in the lowest available rates for the full policy term.' },
      { q: 'Does smoking really double the premium?', a: 'Yes — smokers typically pay 2 to 3× more than non-smokers for the same coverage. This reflects the significantly higher mortality risk associated with smoking. Many insurers offer standard non-smoker rates after 12 months of being completely smoke-free (including vaping).' },
      { q: 'What is the difference between term and whole-of-life insurance?', a: 'Term life insurance covers a fixed period and pays out only if you die during that term — it\'s pure protection with no cash value. Whole-of-life insurance (permanent insurance) covers you for life and builds a cash value over time, but premiums are typically 5–10× higher for the same death benefit.' },
      { q: 'What coverage amount should I choose?', a: 'A useful formula: coverage = (annual income × 10) + outstanding mortgage + other debts + estimated education costs for children. For a 35-year-old earning $80,000 with a $200,000 mortgage, a $1,000,000 policy for 25 years is a common recommendation.' },
      { q: 'Can I get life insurance with a pre-existing medical condition?', a: 'Yes, most insurers will still offer cover, but premiums will be higher and some conditions may be excluded. Common conditions like controlled diabetes, high blood pressure or a history of depression are typically covered at a loading (extra cost). Severe conditions may require specialist insurers.' },
      { q: 'What happens if I stop paying premiums?', a: 'For term life insurance, missing premium payments usually results in a grace period (typically 30 days). If premiums remain unpaid, the policy lapses and coverage ends. There is no cash surrender value with a term policy — unlike whole-of-life insurance.' },
      { q: 'Is life insurance worth it if I\'m young and healthy?', a: 'Absolutely — the best time to buy life insurance is when you are young and healthy, as you will lock in the lowest premiums for the entire term. A 25-year-old non-smoker can often get £500,000 of 25-year term cover for under £20/month in the UK, or under $30/month in the US.' },
      { q: 'How accurate is this life insurance calculator?', a: 'This tool gives an approximate estimate based on typical market averages. Actual premiums depend on your full medical history, occupation, lifestyle and the insurer\'s own underwriting criteria. Use this calculator to get a ballpark figure before requesting a formal quote from an insurer or broker.' },
    ],
  },
  ru: {
    description: 'Воспользуйтесь бесплатным калькулятором страхования жизни онлайн, чтобы оценить ежемесячную и годовую стоимость срочного полиса. Введите возраст, пол, желаемую сумму покрытия, срок полиса, статус курения и состояние здоровья — и получите мгновенную оценку на основе типичных рыночных ставок.\n\nСрочное страхование жизни — самый доступный способ финансово защитить семью. В отличие от накопительного страхования, оно покрывает только риск смерти в течение определённого срока и не включает инвестиционного компонента. Размер страховой премии зависит от возраста, пола, состояния здоровья, суммы покрытия и срока договора.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое срочное страхование жизни?', a: 'Срочное страхование жизни обеспечивает защиту на определённый период (10–30 лет). Если застрахованный умирает в период действия полиса, страховая компания выплачивает указанную сумму. Это наиболее доступный тип страхования без накопительного компонента.' },
      { q: 'На какую сумму страховать жизнь?', a: 'Распространённое правило — 10–12 годовых доходов. Учитывайте долги (ипотека, кредиты), потребности иждивенцев, расходы на образование детей и то, сколько лет семья нуждается в финансовой поддержке. Например, при доходе 100 000 ₽/месяц и ипотеке 3 млн ₽ рекомендуется покрытие не менее 10–15 млн ₽.' },
      { q: 'Как рассчитывается стоимость страховки жизни?', a: 'Премия зависит от возраста, пола, состояния здоровья, статуса курения, суммы покрытия и срока полиса. Страховщики используют актуарные таблицы смертности для расчёта тарифа. В среднем каждые 10 лет после 30 лет стоимость полиса возрастает в 1,5–2 раза.' },
      { q: 'Почему возраст так сильно влияет на стоимость?', a: 'Стоимость страховки основана на вероятности смерти в период действия полиса. После 40 лет этот риск значительно возрастает, поэтому страховые компании существенно повышают тарифы. Оформление страховки в молодом и здоровом возрасте позволяет зафиксировать минимальную ставку на весь срок.' },
      { q: 'Правда ли, что курение удваивает страховку?', a: 'Да — курящие обычно платят в 2–3 раза больше за ту же сумму покрытия из-за значительно более высокого риска смертности. Многие страховщики готовы перевести бывшего курильщика в нон-смокерскую категорию через 1–2 года полного отказа от курения.' },
      { q: 'В чём разница между срочным и накопительным страхованием?', a: 'Срочное страхование (term life) покрывает только риск смерти в течение срока полиса — без инвестиционного или накопительного элемента. Накопительное страхование жизни (НСЖ) дополнительно формирует капитал, но стоит в 5–10 раз дороже при том же страховом покрытии.' },
      { q: 'Можно ли застраховать жизнь при наличии хронических заболеваний?', a: 'Да, большинство страховщиков всё равно выдают полис, но с повышенным тарифом или исключением определённых рисков. Контролируемый диабет, гипертония или история депрессии, как правило, покрываются с надбавкой. При тяжёлых заболеваниях потребуются специализированные страховщики.' },
      { q: 'Что произойдёт, если я перестану платить взносы?', a: 'При неуплате очередного взноса обычно предусмотрен льготный период (30 дней). Если долг не погашен, полис прекращает действие. При срочном страховании выкупной стоимости нет — в отличие от накопительного.' },
      { q: 'Выгодно ли страховать жизнь молодым и здоровым людям?', a: 'Однозначно да. Молодость и здоровье — ключевые факторы низкой ставки. Полис, оформленный в 25 лет, обойдётся в несколько раз дешевле, чем в 45 лет при одинаковом покрытии. При этом ставка фиксируется на весь срок — инфляция не повлияет на размер взноса.' },
      { q: 'Насколько точен этот калькулятор страховки жизни?', a: 'Калькулятор даёт приблизительную оценку на основе типичных рыночных ставок. Реальная стоимость полиса определяется индивидуально страховщиком и зависит от полной медицинской истории, образа жизни и профессии. Используйте расчёт как ориентир перед обращением в страховую компанию.' },
    ],
  },
  uk: {
    description: 'Скористайтеся безкоштовним калькулятором страхування життя онлайн, щоб оцінити щомісячну і річну вартість строкового поліса. Введіть вік, стать, бажану суму покриття, термін поліса, статус куріння і стан здоров\'я — і отримайте миттєву оцінку на основі типових ринкових ставок.\n\nСтрокове страхування життя — найдоступніший спосіб фінансово захистити сім\'ю. На відміну від накопичувального страхування, воно покриває лише ризик смерті протягом визначеного терміну і не містить інвестиційного компонента. Розмір страхової премії залежить від віку, статі, стану здоров\'я, суми покриття та терміну договору.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке строкове страхування життя?', a: 'Строкове страхування забезпечує захист на певний період (10–30 років). Якщо застрахований помирає в цей час, страховик виплачує вказану суму бенефіціарам. Це найдоступніший тип страхування без накопичувального або інвестиційного компонента.' },
      { q: 'На яку суму страхувати життя?', a: 'Поширене правило — 10–12 річних доходів. Враховуйте борги (іпотека, кредити), потреби утриманців, витрати на навчання дітей і скільки років сім\'я потребуватиме фінансової підтримки. Наприклад, при доході 50 000 грн/місяць і іпотеці рекомендується покриття від 5 млн грн.' },
      { q: 'Як розраховується вартість страховки життя?', a: 'Премія залежить від віку, статі, стану здоров\'я, статусу куріння, суми покриття і терміну поліса. Страховики використовують актуарні таблиці смертності для розрахунку тарифу. У середньому кожні 10 років після 30 років вартість поліса зростає в 1,5–2 рази.' },
      { q: 'Чому вік так сильно впливає на вартість?', a: 'Вартість страховки базується на ймовірності смерті в період дії поліса. Після 40 років цей ризик суттєво зростає, тому страховики значно підвищують тарифи. Оформлення страховки в молодому і здоровому віці дозволяє зафіксувати мінімальну ставку на весь термін.' },
      { q: 'Чи справді куріння подвоює страховку?', a: 'Так — курці зазвичай платять у 2–3 рази більше за однакове покриття через значно вищий ризик смертності. Багато страховиків переводять колишнього курця в категорію некурящих після 1–2 років повної відмови від куріння.' },
      { q: 'У чому різниця між строковим і накопичувальним страхуванням?', a: 'Строкове страхування покриває лише ризик смерті протягом терміну поліса без інвестиційного елемента. Накопичувальне страхування (НСЖ) додатково формує капітал, але коштує в 5–10 разів дорожче при однаковому страховому покритті.' },
      { q: 'Чи можна застрахувати життя за наявності хронічних захворювань?', a: 'Так, більшість страховиків усе одно видають поліс, але з підвищеним тарифом або виключенням певних ризиків. Контрольований діабет, гіпертонія або депресія в анамнезі, як правило, покриваються з надбавкою. При тяжких захворюваннях знадобляться спеціалізовані страховики.' },
      { q: 'Що станеться, якщо я перестану сплачувати внески?', a: 'При несплаті чергового внеску зазвичай передбачений пільговий період (30 днів). Якщо заборгованість не погашена, поліс припиняє дію. При строковому страхуванні викупної вартості немає — на відміну від накопичувального.' },
      { q: 'Чи вигідно страхувати життя молодим і здоровим?', a: 'Однозначно так. Молодість і здоров\'я — ключові фактори низької ставки. Поліс, оформлений у 25 років, коштуватиме в кілька разів дешевше, ніж у 45 років при однаковому покритті. При цьому ставка фіксується на весь термін.' },
      { q: 'Наскільки точним є цей калькулятор страхування життя?', a: 'Калькулятор дає приблизну оцінку на основі типових ринкових ставок. Реальна вартість поліса визначається індивідуально страховиком і залежить від повної медичної історії, способу життя та професії. Використовуйте розрахунок як орієнтир перед зверненням до страхової компанії.' },
    ],
  },
  fr: {
    description: 'Utilisez notre calculatrice d\'assurance vie gratuite en ligne pour estimer le coût mensuel et annuel d\'une assurance temporaire. Entrez votre âge, sexe, montant assuré, durée du contrat (10 à 30 ans), statut de fumeur et état de santé — et obtenez une estimation instantanée basée sur les tarifs typiques du marché français, belge et suisse.\n\nL\'assurance vie temporaire est la solution la plus accessible pour protéger financièrement vos proches. Contrairement à l\'assurance vie entière, elle couvre uniquement le risque de décès pendant une période définie, sans composante épargne. Le montant de la prime dépend principalement de votre âge, de votre état de santé et du capital assuré.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que l\'assurance vie temporaire ?', a: 'L\'assurance vie temporaire couvre une période définie (10 à 30 ans). Si l\'assuré décède pendant cette période, l\'assureur verse le capital aux bénéficiaires. C\'est le type d\'assurance vie le plus abordable, sans composante épargne ou investissement.' },
      { q: 'De quel montant d\'assurance vie ai-je besoin ?', a: 'Une règle courante est de 10 à 12 fois votre revenu annuel brut. Tenez compte de vos dettes (crédit immobilier, prêts), des besoins de vos proches, des frais de scolarité des enfants et de la durée pendant laquelle votre famille aurait besoin d\'un soutien financier. Pour un revenu de 40 000 €/an avec un crédit immobilier de 200 000 €, un capital de 500 000 € est souvent recommandé.' },
      { q: 'Comment est calculée la prime d\'assurance vie ?', a: 'La prime dépend de votre âge, sexe, état de santé, statut de fumeur, montant assuré et durée du contrat. Les assureurs utilisent des tables de mortalité actuarielles pour calculer le tarif. En règle générale, la prime double entre la trentaine et la quarantaine, puis double à nouveau entre la quarantaine et la cinquantaine.' },
      { q: 'Pourquoi l\'âge influence-t-il autant les primes d\'assurance vie ?', a: 'Les primes sont basées sur le risque de mortalité. En vieillissant, la probabilité statistique de décès pendant la durée du contrat augmente considérablement, surtout après 40 ans. Souscrire une assurance vie jeune et en bonne santé permet de bloquer les tarifs les plus bas pour toute la durée du contrat.' },
      { q: 'Le tabagisme double-t-il vraiment la prime d\'assurance vie ?', a: 'Oui — les fumeurs paient généralement 2 à 3 fois plus pour la même couverture. Cela reflète le risque de mortalité nettement plus élevé lié au tabagisme. De nombreux assureurs proposent les tarifs non-fumeur après 12 à 24 mois d\'arrêt total du tabac (y compris la cigarette électronique).' },
      { q: 'Quelle est la différence entre assurance vie temporaire et assurance vie entière ?', a: 'L\'assurance temporaire couvre une durée fixe et verse le capital uniquement en cas de décès pendant cette période — c\'est une protection pure sans valeur de rachat. L\'assurance vie entière (permanente) vous couvre à vie et constitue une épargne, mais les primes sont 5 à 10 fois plus élevées pour le même capital.' },
      { q: 'Peut-on souscrire une assurance vie avec une maladie préexistante ?', a: 'Oui, la plupart des assureurs acceptent tout de même la souscription, mais avec une surprime et parfois des exclusions. Le diabète contrôlé, l\'hypertension ou un antécédent de dépression sont généralement couverts avec une majoration. Pour les affections graves, des assureurs spécialisés ou la convention AERAS (France) peuvent aider.' },
      { q: 'Que se passe-t-il si j\'arrête de payer mes primes ?', a: 'Pour une assurance vie temporaire, le non-paiement entraîne généralement une période de grâce (30 jours). Si les primes restent impayées, le contrat est résilié sans valeur de rachat — contrairement à l\'assurance vie entière qui peut avoir une valeur de rachat.' },
      { q: 'L\'assurance vie vaut-elle la peine quand on est jeune et en bonne santé ?', a: 'Absolument — c\'est même le meilleur moment pour souscrire. Un non-fumeur de 25 ans peut souvent obtenir 300 000 € de couverture sur 25 ans pour moins de 15–20 €/mois en France. La prime est fixée pour toute la durée du contrat : plus vous attendez, plus elle sera élevée.' },
      { q: 'Quelle est la précision de cette calculatrice d\'assurance vie ?', a: 'Cet outil fournit une estimation approximative basée sur les tarifs moyens du marché. Les primes réelles dépendent de votre historique médical complet, de votre profession, de votre mode de vie et des critères de souscription propres à chaque assureur. Utilisez ce calcul comme point de repère avant de demander un devis formel.' },
    ],
  },
  lt: {
    description: 'Naudokite nemokamą gyvybės draudimo skaičiuotuvą internetu, kad apskaičiuotumėte mėnesinę ir metinę terminuoto draudimo įmoką. Įveskite amžių, lytį, draudimo sumą, poliso terminą (10–30 metų), rūkymo statusą ir sveikatos būklę — ir gaukite momentinį įvertinimą pagal tipines rinkos normas.\n\nTerminuotas gyvybės draudimas yra pats prieinamiausias būdas finansiškai apsaugoti savo šeimą. Skirtingai nuo kaupimo draudimo, jis apima tik mirties riziką per nustatytą laikotarpį ir neturi investicinės dalies. Draudimo įmokos dydis priklauso nuo amžiaus, lyties, sveikatos būklės, draudimo sumos ir sutarties termino.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra terminuotas gyvybės draudimas?', a: 'Terminuotas gyvybės draudimas suteikia apsaugą tam tikram laikotarpiui (10–30 metų). Jei apdraustasis miršta per šį laikotarpį, draudikas išmoka nurodytą sumą naudos gavėjams. Tai prieinamiausias draudimo tipas be kaupimo ar investicinio komponento.' },
      { q: 'Kokia draudimo suma reikalinga?', a: 'Dažna taisyklė — 10–12 jūsų metinių pajamų. Atsižvelkite į skolas (būsto paskola, kitos paskolos), išlaikytinių poreikius, vaikų išsilavinimo išlaidas ir laikotarpį, kuriam šeima reikalinga finansinė parama.' },
      { q: 'Kaip apskaičiuojama gyvybės draudimo įmoka?', a: 'Įmoka priklauso nuo amžiaus, lyties, sveikatos būklės, rūkymo statuso, draudimo sumos ir sutarties termino. Draudikai naudoja aktuarines mirtingumo lenteles tarifui apskaičiuoti. Paprastai kiekvieną dešimtmetį po 30 metų įmoka padidėja 1,5–2 kartus.' },
      { q: 'Kodėl amžius taip stipriai lemia draudimo įmokas?', a: 'Draudimo įmokos grindžiamos mirtingumo rizika. Senstant statistinė mirties tikimybė per poliso galiojimo laikotarpį žymiai didėja, ypač po 40 metų. Gyvybės draudimo įsigijimas jauname ir sveikame amžiuje leidžia užfiksuoti mažiausius tarifus visam sutarties laikotarpiui.' },
      { q: 'Ar rūkymas tikrai padvigubina draudimo įmoką?', a: 'Taip — rūkantieji paprastai moka 2–3 kartus daugiau už tą pačią draudimo sumą dėl žymiai didesnės mirtingumo rizikos. Daugelis draudikų taiko nerūkančiojo tarifą po 12–24 mėnesių visiškai atsisakius rūkyti (įskaitant elektronines cigaretes).' },
      { q: 'Kuo skiriasi terminuotas ir visą gyvenimą galiojantis draudimas?', a: 'Terminuotas draudimas apima nustatytą laikotarpį ir išmoka kapitalą tik mirus per tą laikotarpį — tai gryna apsauga be išpirkimo vertės. Visą gyvenimą galiojantis draudimas apdraudžia iki gyvos galvos ir formuoja taupymą, tačiau įmokos yra 5–10 kartų didesnės.' },
      { q: 'Ar galima apsidrausti gyvybę turėnt lėtinių ligų?', a: 'Taip, dauguma draudikų vis tiek priima draudiminę sutartį, tačiau su papildoma įmoka ir tam tikrų rizikų išimtimis. Kontroliuojamas diabetas, hipertenzija ar depresijos istorija paprastai apdraudžiama su papildomu tarifu. Sunkių ligų atveju gali reikėti specializuotų draudikų.' },
      { q: 'Kas nutiks, jei liausiu mokėti draudimo įmokas?', a: 'Terminuotam gyvybės draudimui nesumokėjus įmokos, paprastai taikomas lengvatinis laikotarpis (30 dienų). Jei įmokos ir toliau nemokamos, polisas nutraukiamas be išpirkimo vertės — skirtingai nuo kaupimo draudimo.' },
      { q: 'Ar verta draustis gyvybę jauno ir sveiko žmogaus?', a: 'Tikrai taip — tai pats geriausias laikas įsigyti draudimą. Nerūkantis 25 metų asmuo Lietuvoje dažnai gali gauti 150 000 € apsaugą 25 metams už mažiau nei 15–20 €/mėn. Tarifas užfiksuojamas visam sutarties terminui.' },
      { q: 'Kiek tikslus šis gyvybės draudimo skaičiuotuvas?', a: 'Šis įrankis pateikia apytikslį įvertinimą pagal tipines rinkos normas. Tikrosios įmokos priklauso nuo jūsų pilnos medicininės istorijos, profesijos, gyvenimo būdo ir draudiko pasirašymo kriterijų. Naudokite šį skaičiavimą kaip orientyrą prieš kreipiantis į draudiką dėl oficialaus pasiūlymo.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/calculator/life-insurance'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LifeInsurancePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/life-insurance`,
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
        <LifeInsuranceCalculator locale={locale} />

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
