import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import AlimonyCalculator from './AlimonyCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/salary', label: 'Salary Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/limitation', label: 'Statute of Limitations' }, { href: '/calculator/traffic-fine', label: 'Traffic Fine Calculator' }, { href: '/calculator/flight-delay', label: 'Flight Delay Compensation' }],
  ru: [{ href: '/calculator/salary', label: 'Калькулятор зарплаты' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/limitation', label: 'Срок исковой давности' }, { href: '/calculator/traffic-fine', label: 'Штрафы ПДД' }, { href: '/calculator/flight-delay', label: 'Компенсация за задержку рейса' }],
  uk: [{ href: '/calculator/salary', label: 'Калькулятор зарплати' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/limitation', label: 'Строк позовної давності' }, { href: '/calculator/traffic-fine', label: 'Штрафи ПДР' }, { href: '/calculator/flight-delay', label: 'Компенсація за затримку рейсу' }],
  fr: [{ href: '/calculator/salary', label: 'Calculatrice de salaire' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/limitation', label: 'Délai de prescription' }, { href: '/calculator/traffic-fine', label: 'Calculateur d\'amendes routières' }, { href: '/calculator/flight-delay', label: 'Indemnisation retard de vol' }],
  lt: [{ href: '/calculator/salary', label: 'Atlyginimo skaičiuotuvas' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/limitation', label: 'Ieškinio senaties terminas' }, { href: '/calculator/traffic-fine', label: 'Eismo baudų skaičiuotuvas' }, { href: '/calculator/flight-delay', label: 'Kompensacija už skrydžio vėlavimą' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Child Support Calculator — Calculate Alimony Online',
    description: 'Free child support calculator online. Estimate monthly alimony payments based on income, number of children, and your country\'s family law. Covers Russia, Kazakhstan, Ukraine, France, Lithuania and more.',
    h1: 'Child Support Calculator',
  },
  ru: {
    title: 'Калькулятор алиментов онлайн — расчёт по РФ, РК и Украине',
    description: 'Бесплатный калькулятор алиментов онлайн. Рассчитайте ориентировочную сумму алиментов по чистому доходу и законодательству вашей страны. Учитывает РФ, РК (Казахстан), Украину, Францию и другие страны.',
    h1: 'Калькулятор алиментов',
  },
  uk: {
    title: 'Калькулятор аліментів онлайн — розрахунок по Україні та СНД',
    description: 'Безкоштовний калькулятор аліментів онлайн. Розрахуйте орієнтовну суму аліментів за чистим доходом та законодавством вашої країни. Враховує Україну, Росію, Казахстан та інші країни.',
    h1: 'Калькулятор аліментів',
  },
  fr: {
    title: 'Calculateur Pension Alimentaire — Calcul gratuit en France',
    description: 'Calculateur de pension alimentaire gratuit. Estimez le montant mensuel selon vos revenus nets, le nombre d\'enfants et le barème du Ministère de la Justice. Couvre la France, la Belgique, la Suisse et d\'autres pays.',
    h1: 'Calculateur de pension alimentaire',
  },
  lt: {
    title: 'Alimentų Skaičiuotuvas — Apskaičiuokite internetu',
    description: 'Nemokamas alimentų skaičiuotuvas internetu. Apskaičiuokite apytikslę mėnesinę alimentų sumą pagal pajamas, vaikų skaičių ir jūsų šalies įstatymus.',
    h1: 'Alimentų skaičiuotuvas',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This calculator estimates monthly child support (alimony) payments based on your net income, number of children, and the legal framework of your country. Select your country to apply the correct percentage rates established by local family law. Results are approximate and for informational purposes only — actual amounts are determined by a court.\n\nChild support laws vary significantly by country. CIS countries (Russia, Kazakhstan, Ukraine, Belarus) use percentage-of-income formulas: 25% for 1 child, 33% for 2, 50% for 3 or more. Western countries use more complex income-share or needs-based models. This tool provides an initial estimate before consulting a family law attorney.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is child support calculated?', a: 'In CIS countries, child support is calculated as a percentage of the payer\'s net monthly income: 25% for 1 child, 33% for 2 children, 50% for 3 or more. In France, the Ministry of Justice publishes a reference table based on income and custody arrangement. In the UK, the Child Maintenance Service uses a formula based on gross income and nights of care. In the US, most states use either an income shares model or a percentage-of-income model.' },
      { q: 'Is the calculated amount legally binding?', a: 'No. This calculator provides an estimate for informational purposes only. The actual amount is determined by a court and may differ based on individual circumstances, additional costs (healthcare, education, extracurricular activities), custody arrangement, and the financial situation of both parents.' },
      { q: 'How is alimony calculated in Kazakhstan (RK)?', a: 'In Kazakhstan, child support is governed by the Marriage and Family Code (Кодекс РК о браке и семье). The rates are: 1 child — 25% of net income, 2 children — 33%, 3 or more — 50%. The minimum amount cannot be less than the subsistence minimum for a child set by the region. Courts can also set a fixed sum if income is irregular. In Almaty and Nur-Sultan, courts often apply higher amounts due to the elevated cost of living.' },
      { q: 'What if the payer has no regular income?', a: 'If income is variable (self-employed, freelance) or unknown, courts typically use either: the average monthly income over the past 12 months; a fixed sum (твёрдая денежная сумма) pegged to the subsistence minimum for a child; or the average wage in the region. In Russia and Kazakhstan, if no income is declared, alimony is calculated from the average wage statistic published by Rosstat/Statistics Kazakhstan.' },
      { q: 'Can child support amounts be changed?', a: 'Yes. Either parent can apply to the court to increase or decrease alimony if there is a significant change in financial circumstances — job loss, disability, new children, change in the child\'s needs, or a significant increase in the payer\'s income. Changes are not retroactive — they apply from the date of the new court order.' },
      { q: 'What is the minimum child support in Russia?', a: 'There is no absolute statutory minimum in Russia. However, courts rarely set amounts below 50% of the regional subsistence minimum for a child (прожиточный минимум на ребёнка). In 2024, the national average subsistence minimum for children is approximately 15,000–17,000 ₽/month, meaning the minimum practical alimony for 1 child is around 7,500–8,500 ₽/month, though Moscow courts typically set higher amounts.' },
      { q: 'What is the minimum child support in Kazakhstan?', a: 'In Kazakhstan, child support cannot be set below the minimum subsistence level (МПМ — минимальный прожиточный минимум) for a child for the relevant period. In 2024, the MRM for children is approximately 41,000–43,000 KZT per month, so the minimum alimony for 1 child is around 21,000 KZT/month (50% of MRM). Regional courts in Almaty may set higher amounts.' },
      { q: 'Are child support and spousal support the same?', a: 'No. Child support (алименты на ребёнка) is paid for the child\'s benefit and is based on the payer\'s income and number of children. Spousal support (алименты на супруга/супругу) is separate — it may be ordered when one spouse cannot work (caring for a young child, disability) and follows different legal criteria in each country.' },
      { q: 'How is alimony calculated in France?', a: 'In France, pension alimentaire is determined by the family court judge using a reference table (barème indicatif) published by the Ministry of Justice. The amount depends on the payer\'s net income, the custody arrangement (alternating/full custody), and the number of children. For example, for 1 child with full custody of the other parent, a net income of €2,500/month suggests around €200–350/month. The French model is more discretionary than the CIS percentage system.' },
      { q: 'How do I enforce unpaid child support?', a: 'In Russia: apply to bailiffs (судебные приставы) who can freeze bank accounts, restrict travel, and garnish wages. In Kazakhstan: the Enforcement Service can seize assets and ban international travel for debts over 12 months. In France: the ARIPA agency (Agence de Recouvrement des Impayés de Pension Alimentaire) can directly recover and advance pension alimentaire to the custodial parent. In Ukraine: apply to state executors (ДВС) with the court order.' },
    ],
  },
  ru: {
    description: 'Калькулятор помогает рассчитать ориентировочную сумму алиментов на основе чистого дохода, количества детей и законодательства вашей страны. Выберите страну, чтобы применить актуальные ставки, установленные семейным кодексом. Учитываются законодательство РФ, Казахстана (РК), Украины, Франции и других стран.\n\nЗаконы об алиментах существенно различаются по странам. В России и Казахстане применяется процент от дохода: 25% на 1 ребёнка, 33% на двух, 50% на трёх и более. Суд также вправе назначить алименты в твёрдой денежной сумме при нерегулярном доходе. Все результаты носят информационный характер — реальный размер определяет суд.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитываются алименты в России?', a: 'По ст. 81 СК РФ: 25% дохода на 1 ребёнка, 33% на 2 детей, 50% на 3 и более. Это долевые алименты. Суд также вправе назначить алименты в твёрдой денежной сумме, если плательщик имеет нерегулярный доход, получает его в натуре или в иностранной валюте.' },
      { q: 'Как рассчитываются алименты в Казахстане (онлайн калькулятор алиментов рк)?', a: 'По Кодексу РК о браке и семье: 25% дохода на 1 ребёнка, 33% на 2 детей, 50% на 3 и более. Минимальная сумма не может быть меньше прожиточного минимума на ребёнка. Если доход нерегулярный — суд назначает фиксированную сумму. В 2024 году МПМ на ребёнка в Казахстане составляет около 41 000–43 000 ₸/месяц, то есть минимальные алименты на 1 ребёнка — около 21 000 ₸/месяц.' },
      { q: 'Является ли расчёт юридически обязательным?', a: 'Нет. Калькулятор даёт ориентировочную сумму для информационных целей. Реальный размер алиментов определяет суд с учётом индивидуальных обстоятельств: дополнительных расходов (лечение, образование), материального положения обоих родителей и потребностей ребёнка.' },
      { q: 'Что если у плательщика нет постоянного дохода?', a: 'При нерегулярном доходе или отсутствии официального заработка суд может назначить алименты в твёрдой денежной сумме, привязанной к прожиточному минимуму ребёнка в регионе. Также применяется средняя зарплата по данным Росстата. В 2024 году прожиточный минимум на ребёнка в России — около 15 500 ₽/месяц (50% — около 7 750 ₽).' },
      { q: 'Какой минимальный размер алиментов в России?', a: 'Абсолютного законодательного минимума нет. Суды крайне редко назначают сумму ниже 50% прожиточного минимума на ребёнка в регионе. В среднем по России в 2024 году ПМ на ребёнка около 15 000–17 000 ₽, значит, минимальные алименты на практике — около 7 500–8 500 ₽/месяц. В Москве суды, как правило, назначают значительно больше.' },
      { q: 'Какой минимальный размер алиментов в Казахстане?', a: 'В Казахстане алименты не могут быть ниже МПМ (минимального прожиточного минимума) на ребёнка. В 2024 году МПМ для детей составляет около 41 000–43 000 ₸/месяц. Соответственно, минимальные алименты на 1 ребёнка — около 21 000 ₸/месяц. Суды в Алматы и Астане, как правило, назначают более высокие суммы.' },
      { q: 'Можно ли изменить размер алиментов?', a: 'Да. Любой из родителей вправе обратиться в суд с иском об изменении размера алиментов при существенном изменении материального положения — потеря работы, инвалидность, рождение новых детей, значительный рост дохода плательщика. Изменения не имеют обратной силы — действуют с даты нового судебного решения.' },
      { q: 'Алименты на ребёнка и на супруга — это одно и то же?', a: 'Нет. Алименты на ребёнка выплачиваются в пользу ребёнка и рассчитываются по доле дохода плательщика. Алименты на супруга (супружеские алименты) — самостоятельный вид выплат, назначаемых когда один из супругов не может работать (уход за малолетним ребёнком, инвалидность) — и следуют другим юридическим критериям.' },
      { q: 'Облагаются ли алименты налогом?', a: 'Нет. Алименты, полученные получателем, не облагаются НДФЛ (ст. 217 НК РФ). Для плательщика алименты не уменьшают налогооблагаемую базу — выплачиваются из чистого дохода после налогообложения. В Казахстане аналогично — алименты не включаются в облагаемый доход получателя.' },
      { q: 'Как взыскать задолженность по алиментам?', a: 'В России: обратитесь к судебным приставам (ФССП) — они могут заблокировать банковские счета, ограничить выезд за рубеж и удержать долг из зарплаты. При задолженности более 4 месяцев возможна уголовная ответственность по ст. 157 УК РФ. В Казахстане: обратитесь в Службу судебных исполнителей. Долг по алиментам свыше 12 месяцев — основание для запрета на выезд и ограничения водительских прав.' },
    ],
  },
  uk: {
    description: 'Калькулятор допомагає розрахувати орієнтовну суму аліментів на основі чистого доходу, кількості дітей та законодавства вашої країни. Оберіть країну, щоб застосувати актуальні ставки сімейного кодексу. Враховується законодавство України, Росії, Казахстану, Франції та інших країн.\n\nЗакони про аліменти суттєво різняться за країнами. В Україні застосовується відсоток від доходу: 25% на 1 дитину, 33% на двох, 50% на трьох і більше. Мінімальна сума — 50% прожиткового мінімуму на дитину. Суд також може призначити аліменти у твердій грошовій сумі. Всі результати мають інформаційний характер.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховуються аліменти в Україні?', a: 'За ст. 183 Сімейного кодексу України: 25% доходу на 1 дитину, 33% на 2 дітей, 50% на 3 і більше. Мінімальна сума аліментів не може бути менше 50% прожиткового мінімуму на дитину (у 2024 році — близько 1 500–1 700 грн/місяць). Суд може встановити вищу суму залежно від потреб дитини та доходів батьків.' },
      { q: 'Чи є розрахунок юридично обов\'язковим?', a: 'Ні. Калькулятор надає орієнтовну суму для інформаційних цілей. Реальний розмір аліментів визначає суд з урахуванням індивідуальних обставин: додаткових витрат (лікування, навчання), матеріального стану обох батьків та потреб дитини.' },
      { q: 'Що якщо платник не має постійного доходу?', a: 'За відсутності офіційного доходу суд може призначити аліменти у твердій грошовій сумі, орієнтуючись на прожитковий мінімум дитини або середній заробіток у регіоні. У 2024 році прожитковий мінімум на дитину до 6 років — близько 2 872 грн, 6–18 років — 3 578 грн/місяць.' },
      { q: 'Чи можна змінити розмір аліментів?', a: 'Так. Будь-який з батьків може звернутися до суду для зміни розміру аліментів при суттєвій зміні матеріального становища (втрата роботи, інвалідність, народження інших дітей, значне зростання доходу платника). Зміни не мають зворотної сили — діють з дати нового судового рішення.' },
      { q: 'Чи відрізняються аліменти на дитину та на чоловіка/дружину?', a: 'Так. Аліменти на дитину виплачуються на користь дитини і розраховуються за часткою доходу платника. Подружні аліменти (утримання) — окремий вид виплат, що призначається коли один з подружжя не може працювати (догляд за малолітньою дитиною, інвалідність) і регулюється іншими нормами Сімейного кодексу.' },
      { q: 'Який мінімальний розмір аліментів в Україні?', a: 'Мінімальний розмір аліментів на одну дитину не може бути меншим за 50% прожиткового мінімуму для відповідної вікової групи. У 2024 році це приблизно 1 436–1 789 грн/місяць залежно від віку дитини. На практиці суди часто встановлюють вищі суми, особливо якщо встановлено, що доходи платника вищі від задекларованих.' },
      { q: 'Чи оподатковуються аліменти?', a: 'Ні. Аліменти, отримані отримувачем, не включаються до оподатковуваного доходу (пп. 165.1.14 ПКУ). Для платника аліменти не зменшують оподатковувану базу — виплачуються з чистого доходу після оподаткування.' },
      { q: 'Як стягнути заборгованість по аліментах?', a: 'В Україні: звернутися до державного виконавця (ДВС) або приватного виконавця з виконавчим листом. Виконавець може арештувати рахунки, звернути стягнення на майно, обмежити право на керування транспортом. При заборгованості понад 3 місяці можлива адміністративна, при понад 6 місяців — кримінальна відповідальність (ст. 164 КК України).' },
      { q: 'Як розраховуються аліменти у Франції?', a: 'У Франції пенсіон аліментер визначає суддя сімейних справ за допомогою орієнтовної таблиці (barème indicatif) Міністерства юстиції. Сума залежить від доходу платника, порядку опіки та кількості дітей. При повній опіці одного з батьків і доході 2 500 € на місяць сума пенсіону зазвичай становить 200–350 €/місяць на 1 дитину.' },
      { q: 'Наскільки точний цей калькулятор аліментів?', a: 'Калькулятор дає орієнтовну оцінку на основі типових законодавчих ставок. Реальний розмір аліментів встановлює суд з урахуванням конкретних обставин справи, які можуть значно відрізнятися від середньостатистичних. Перед зверненням до суду рекомендується проконсультуватися з сімейним юристом.' },
    ],
  },
  fr: {
    description: 'Ce calculateur vous permet d\'estimer la pension alimentaire mensuelle en fonction de vos revenus nets, du nombre d\'enfants et du droit applicable dans votre pays. Sélectionnez votre pays pour appliquer les taux légaux en vigueur. Les résultats sont indicatifs — le montant réel est fixé par le juge aux affaires familiales.\n\nLes règles varient fortement selon les pays. En France, le juge utilise un barème indicatif du Ministère de la Justice. Dans les pays CEI (Russie, Kazakhstan, Ukraine), un pourcentage fixe du revenu est appliqué. Au Kazakhstan (RK), le calculateur d\'aliments en ligne applique les normes du Code de la famille du Kazakhstan. Consultez un avocat spécialisé pour votre situation.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment est calculée la pension alimentaire en France ?', a: 'En France, le montant est déterminé par le juge aux affaires familiales (JAF) selon un barème indicatif du Ministère de la Justice. Ce barème tient compte des revenus nets du débiteur, du nombre d\'enfants, et du temps de résidence chez chaque parent (garde alternée ou exclusive). Pour 1 enfant avec garde exclusive et revenus de 2 500 €/mois : environ 200–350 €/mois.' },
      { q: 'Le montant calculé est-il juridiquement contraignant ?', a: 'Non. Ce calculateur fournit une estimation indicative. Le montant réel est fixé par le juge et peut différer selon les circonstances individuelles, les frais supplémentaires (santé, scolarité, activités) et la situation financière des deux parents. Il peut être convenu à l\'amiable (convention parentale) et homologué par le juge.' },
      { q: 'Comment est calculée la pension alimentaire au Kazakhstan (RK) ?', a: 'Selon le Code du Kazakhstan sur le mariage et la famille : 25 % du revenu net pour 1 enfant, 33 % pour 2 enfants, 50 % pour 3 enfants ou plus. Le montant ne peut être inférieur au minimum vital pour un enfant (MPM). En 2024, le MPM enfant est d\'environ 41 000–43 000 KZT/mois, soit un minimum de ~21 000 KZT/mois pour 1 enfant.' },
      { q: 'Que se passe-t-il si le débiteur n\'a pas de revenus réguliers ?', a: 'En France, le juge peut fixer un montant forfaitaire basé sur le SMIC ou les revenus moyens des 12 derniers mois. En Russie et Kazakhstan, le tribunal utilise la moyenne des salaires publiée par les organismes statistiques nationaux. Une pension alimentaire provisoire peut être fixée dans l\'attente des justificatifs de revenus.' },
      { q: 'Peut-on modifier le montant de la pension ?', a: 'Oui. L\'un ou l\'autre parent peut saisir le juge pour révision en cas de changement significatif de situation : perte d\'emploi, invalidité, nouvelle naissance, changement de la garde, ou augmentation notable des revenus du débiteur. Les modifications ne sont pas rétroactives — elles s\'appliquent à partir de la nouvelle décision.' },
      { q: 'Quelle est la différence entre pension alimentaire et prestation compensatoire ?', a: 'La pension alimentaire (pour enfants) est versée pour l\'entretien des enfants et calculée selon les revenus du débiteur. La prestation compensatoire est versée à l\'ex-conjoint pour compenser une disparité de niveau de vie due au divorce — c\'est un mécanisme distinct, souvent versé sous forme de capital et non de rente.' },
      { q: 'Comment l\'État français aide-t-il en cas de non-paiement ?', a: 'L\'ARIPA (Agence de Recouvrement des Impayés de Pension Alimentaire) peut avancer la pension alimentaire directement au parent gardien (ASF — allocation de soutien familial) et se charger du recouvrement auprès du débiteur défaillant. Cette aide est automatiquement versée si la pension n\'est pas payée depuis 2 mois. Renseignez-vous auprès de la CAF.' },
      { q: 'La pension alimentaire est-elle imposable ?', a: 'Pour le parent qui la perçoit : la pension alimentaire reçue pour les enfants est imposable sur le revenu en France, mais avec un abattement de 10 %. Pour le parent qui la verse : la pension alimentaire versée pour les enfants mineurs est déductible du revenu imposable dans la limite de frais réels justifiés. Pour la prestation compensatoire en capital : les règles diffèrent selon qu\'elle est versée en une ou plusieurs fois.' },
      { q: 'Comment faire exécuter une pension alimentaire impayée en France ?', a: 'Première étape : demander l\'intervention de l\'ARIPA (via la CAF). Deuxième étape : saisir le juge aux affaires familiales pour fixer une astreinte. Troisième étape : recourir à l\'huissier pour saisie sur salaire, saisie-attribution sur comptes bancaires, ou saisie de biens. Le non-paiement est un délit pénal (abandon de famille) passible de 2 ans de prison et 15 000 € d\'amende.' },
      { q: 'Quelle est la précision de cette calculatrice de pension alimentaire ?', a: 'Cet outil fournit une estimation basée sur les barèmes légaux standard. Le montant réel dépend de la situation spécifique, des frais réels de l\'enfant et de l\'appréciation du juge. Pour votre situation précise, consultez un avocat en droit de la famille ou adressez-vous à un point d\'accès au droit (CDAD).' },
    ],
  },
  lt: {
    description: 'Šis skaičiuotuvas padeda apskaičiuoti apytikslę mėnesinę alimentų sumą pagal jūsų grynosios pajamos, vaikų skaičių ir jūsų šalies teisę. Pasirinkite šalį, kad pritaikytumėte teisingus šeimos teisės normatyvus. Visi rezultatai yra orientaciniai — tikrąjį dydį nustato teismas.\n\nAlimentų taisyklės labai skiriasi priklausomai nuo šalies. Lietuvoje taikomas pajamų procentas: 25 % vienam vaikui, 33 % dviem, 50 % trims ir daugiau. Teismas taip pat gali nustatyti fiksuotą sumą. Konsultuokitės su šeimos teisės advokatu dėl savo situacijos.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip skaičiuojami alimentai Lietuvoje?', a: 'Pagal LR CK 3.196 str.: 25 % pajamų vienam vaikui, 33 % dviem vaikams, 50 % trims ir daugiau vaikų. Teismas gali nustatyti ir fiksuotą sumą, atsižvelgdamas į vaiko poreikius ir tėvų finansinę padėtį. Minimalus alimentų dydis negali būti mažesnis nei 1/2 vaiko išlaikymo išlaidų normos, kurią skelbia Socialinės apsaugos ir darbo ministerija.' },
      { q: 'Ar apskaičiuota suma yra teisiškai privaloma?', a: 'Ne. Skaičiuotuvas pateikia orientacinę sumą informaciniais tikslais. Tikrąjį dydį nustato teismas, atsižvelgdamas į individualias aplinkybes: papildomas išlaidas (sveikatos priežiūra, mokyklos reikmės), abiejų tėvų finansinę padėtį ir vaiko poreikius. Tėvai taip pat gali susitarti savanoriškai ir patvirtinti susitarimą pas notarą.' },
      { q: 'Ką daryti, jei mokėtojas neturi nuolatinių pajamų?', a: 'Jei pajamos nereguliarios, teismas gali paskirti alimentus fiksuota suma, atsižvelgdamas į minimalią mėnesinę algą (MMA) arba vidutines pajamas regione. Taip pat gali būti atsižvelgta į paskutinius 12 mėnesių pajamas. Nedeklaruojamas pajamas teismas gali įvertinti pagal gyvenimo lygį ir turimas vertybes.' },
      { q: 'Ar galima pakeisti alimentų dydį?', a: 'Taip. Kiekvienas iš tėvų gali kreiptis į teismą dėl alimentų dydžio pakeitimo, pasikeitus finansinėms aplinkybėms: darbo netekimas, negalia, naujų vaikų gimimas ar žymus mokėtojo pajamų padidėjimas. Pakeitimai negalioja atgaline data — taikomi nuo naujo teismo sprendimo datos.' },
      { q: 'Koks skirtumas tarp alimentų vaikui ir išlaikymo sutuoktiniui?', a: 'Alimentai vaikui mokami vaiko išlaikymui ir skaičiuojami pagal mokėtojo pajamas. Sutuoktinio išlaikymas — atskiras mokėjimas, skiriamas kai vienas sutuoktinis negali dirbti (mažamečio vaiko priežiūra, negalia) ir reglamentuojamas skirtingomis CK normomis. Tai du skirtingi teisiniai institutai.' },
      { q: 'Koks minimalus alimentų dydis Lietuvoje?', a: 'Minimalus alimentų dydis negali būti mažesnis nei pusė Vyriausybės nustatytos vaiko išlaikymo išlaidų normos. 2024 metais ši norma yra apie 150–200 Eur/mėn. priklausomai nuo amžiaus grupės, taigi minimalūs alimentai vienam vaikui — apie 75–100 Eur/mėn. Teismai dažnai nustato didesnes sumas, ypač Vilniuje ir Kaune.' },
      { q: 'Ar alimentai apmokestinami?', a: 'Ne. Gauti alimentai neįtraukiami į apmokestinamąsias pajamas — GPM nemokamas. Mokėtojui alimentai nemažina apmokestinamosios bazės — mokami iš grynojo uždarbio po mokesčių.' },
      { q: 'Kaip išieškoti alimentų skolą Lietuvoje?', a: 'Kreipkitės į antstolį su teismo sprendimu arba vykdomuoju raštu. Antstolis gali areštuoti banko sąskaitas, išieškoti iš darbo užmokesčio (iki 50 %), apriboti teisę valdyti transporto priemonę. Piktybinis vengimas mokėti alimentus — administracinis nusižengimas (BK 162 str.), pakartotinis — gali būti baudžiamoji atsakomybė.' },
      { q: 'Kiek tikslus šis alimentų skaičiuotuvas?', a: 'Skaičiuotuvas pateikia orientacinį įvertinimą pagal standartines teisines normas. Tikrasis dydis priklauso nuo konkrečios bylos aplinkybių ir teisėjo sprendimo. Prieš kreipdamiesi į teismą, pasitarkite su šeimos teisės advokatu.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/alimony', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AlimonyPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/alimony`,
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
        <AlimonyCalculator locale={locale} />
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
