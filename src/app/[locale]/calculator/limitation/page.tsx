import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import LimitationCalculator from './LimitationCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/alimony', label: 'Alimony Calculator' }, { href: '/calculator/traffic-fine', label: 'Traffic Fine Calculator' }, { href: '/calculator/flight-delay', label: 'Flight Delay Compensation' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/date-diff', label: 'Date Difference Calculator' }],
  ru: [{ href: '/calculator/alimony', label: 'Калькулятор алиментов' }, { href: '/calculator/traffic-fine', label: 'Штрафы ПДД' }, { href: '/calculator/flight-delay', label: 'Компенсация за задержку рейса' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/date-diff', label: 'Разница дат' }],
  uk: [{ href: '/calculator/alimony', label: 'Калькулятор аліментів' }, { href: '/calculator/traffic-fine', label: 'Штрафи ПДР' }, { href: '/calculator/flight-delay', label: 'Компенсація за затримку рейсу' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/date-diff', label: 'Різниця дат' }],
  fr: [{ href: '/calculator/alimony', label: 'Calculatrice de pension alimentaire' }, { href: '/calculator/traffic-fine', label: 'Calculateur d\'amendes routières' }, { href: '/calculator/flight-delay', label: 'Indemnisation retard de vol' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/date-diff', label: 'Différence de dates' }],
  lt: [{ href: '/calculator/alimony', label: 'Alimentų skaičiuotuvas' }, { href: '/calculator/traffic-fine', label: 'Eismo baudų skaičiuotuvas' }, { href: '/calculator/flight-delay', label: 'Kompensacija už skrydžio vėlavimą' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/date-diff', label: 'Datų skirtumas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Statute of Limitations Calculator — By Country & Claim Type', description: 'Find out the statute of limitations for contracts, personal injury, debt, employment, and more in Germany, France, Poland, Lithuania, Ukraine, Russia, the USA, and the UK.', h1: 'Statute of Limitations Calculator' },
  ru: { title: 'Срок исковой давности — по стране и типу иска', description: 'Узнайте срок исковой давности по договорным спорам, причинению вреда, взысканию долга, трудовым спорам и другим требованиям в Германии, Франции, Польше, Литве, Украине, России, США и Великобритании.', h1: 'Калькулятор срока исковой давности' },
  uk: { title: 'Строк позовної давності — за країною та типом позову', description: 'Дізнайтеся строк позовної давності для договірних спорів, заподіяної шкоди, стягнення боргу, трудових спорів та інших вимог у різних країнах.', h1: 'Калькулятор строку позовної давності' },
  fr: { title: 'Calculateur de délai de prescription — par pays et type de réclamation', description: 'Trouvez le délai de prescription pour les litiges contractuels, préjudices corporels, recouvrement de créances, litiges prud\'homaux et plus encore en Allemagne, France, Pologne, Lituanie, Ukraine, Russie, États-Unis et Royaume-Uni.', h1: 'Calculateur de délai de prescription' },
  lt: { title: 'Ieškinio senaties termino skaičiuotuvas — pagal šalį ir tipą', description: 'Sužinokite ieškinio senaties terminą sutartiniams ginčams, asmeninei žalai, skolų išieškojimui, darbo ginčams ir kt. Vokietijoje, Prancūzijoje, Lenkijoje, Lietuvoje, Ukrainoje, Rusijoje, JAV ir JK.', h1: 'Ieškinio senaties termino skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The statute of limitations (or prescription period) is the maximum time after an event within which legal proceedings may be initiated. After this period expires, the claim becomes time-barred and courts will generally refuse to hear it. Periods vary significantly by country, claim type, and circumstances.\n\nMissing a limitation deadline is one of the most common and costly legal mistakes. Even a strong claim becomes unenforceable once the period expires. Always check the applicable period and act promptly — this tool provides a general guide, but always verify with a qualified lawyer for your specific situation.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the statute of limitations?', a: 'The statute of limitations sets the maximum period after an event during which legal proceedings may be initiated. Once expired, the claim becomes "time-barred" — courts will generally refuse to hear it. The purpose is legal certainty and protecting defendants from stale claims.' },
      { q: 'When does the limitation period start?', a: 'Generally it starts when the claimant knew (or should have known) about the harm and the defendant\'s identity. For contracts, typically at the date of breach. For personal injury, from the date of injury or knowledge. Some countries have an "absolute" long-stop date regardless of knowledge.' },
      { q: 'Can the limitation period be suspended or interrupted?', a: 'Yes. Common grounds for suspension: claimant being a minor or lacking mental capacity, defendant\'s fraud, ongoing negotiations, or filing formal proceedings (which interrupts and resets the clock in many systems). Specific rules vary greatly by country.' },
      { q: 'What happens if I miss the limitation period?', a: 'The defendant can raise limitation as a defence, and the court will typically dismiss your claim. Some jurisdictions have discretion to allow late claims in exceptional cases (e.g. UK\'s s.33 Limitation Act for personal injury, or French "forclusion" exceptions).' },
      { q: 'Is this tool legal advice?', a: 'No. This tool provides general educational information only. Limitation law is complex, jurisdiction-specific, and fact-dependent. Always consult a qualified solicitor, attorney, or legal adviser before deciding whether to bring or defend a claim.' },
      { q: 'What is the limitation period for debt recovery?', a: 'Debt limitation periods vary: UK — 6 years from last payment or written acknowledgment (England/Wales); France — 5 years for most debts, 2 years for consumer credit; Germany — 3 years; Lithuania — 10 years for general debts, 3 years for commercial; Ukraine — 3 years; Russia — 3 years.' },
      { q: 'What is a "long-stop" date?', a: 'A long-stop (or absolute) limitation date is the maximum period after which no claim can be brought, regardless of when the claimant discovered the damage. It overrides the standard "date of knowledge" rule. In France it\'s 20 years from the harmful act; in the UK various long-stops apply (e.g. 15 years for latent damage under s.14B Limitation Act).' },
      { q: 'Does the limitation period apply to criminal cases?', a: 'Yes, but the rules differ. Minor criminal offences typically have shorter limitation periods. Serious crimes (murder, serious sexual offences, crimes against humanity) are generally imprescriptible — there is no limitation period. In France, minor offences (contraventions) have a 1-year limit; serious crimes (crimes) have no limit.' },
      { q: 'What is the limitation period for employment claims?', a: 'Employment limitation periods: UK — 3 months from dismissal for most claims (very short!); France — 2 years for most employment disputes; Germany — 3 years (statutory) but contractual terms often shorter; Lithuania — 1 month for unfair dismissal disputes; Ukraine — 1 month for dismissal challenges; Russia — 1 month for dismissal.' },
      { q: 'Can parties agree to extend or shorten the limitation period?', a: 'This varies by jurisdiction. In England/Wales, parties generally cannot extend or shorten the limitation period by contract (Limitation Act 1980, s.3). In Germany, parties can contractually shorten or (within limits) extend limitation periods. In France, commercial parties can adjust prescription periods between 1 and 10 years.' },
    ],
  },
  ru: {
    description: 'Срок исковой давности — это максимальное время, в течение которого может быть подан иск в суд. По истечении этого срока требование становится погашённым, и суд, как правило, откажет в его рассмотрении. Сроки существенно различаются в зависимости от страны, типа иска и обстоятельств.\n\nПропуск срока исковой давности — одна из самых распространённых и дорогостоящих юридических ошибок. Даже сильное требование становится неисполнимым после истечения срока. Всегда проверяйте применимый срок и действуйте оперативно.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое срок исковой давности?', a: 'Срок исковой давности — установленный законом период, в течение которого лицо может обратиться в суд. После его истечения суд откажет в принятии иска. Это обеспечивает правовую определённость и защиту ответчиков от устаревших требований.' },
      { q: 'Когда начинается срок исковой давности?', a: 'Как правило, с момента, когда истец узнал или должен был узнать о нарушении своего права. Для договорных требований — с даты нарушения. В ряде стран существует «абсолютный» максимальный срок независимо от осведомлённости.' },
      { q: 'Можно ли приостановить или прервать срок?', a: 'Да. Основания: несовершеннолетие истца, мошенничество ответчика, переговоры между сторонами, подача иска в суд (прерывает срок). Конкретные основания зависят от законодательства страны.' },
      { q: 'Что будет, если пропустить срок?', a: 'Ответчик вправе заявить об истечении срока, и суд откажет в иске. В отдельных случаях срок можно восстановить при наличии уважительных причин (болезнь, беспомощное состояние) — на усмотрение суда.' },
      { q: 'Является ли этот инструмент юридической консультацией?', a: 'Нет. Инструмент предоставляет общую образовательную информацию. Законодательство об исковой давности сложно и различается по юрисдикциям. Всегда консультируйтесь с квалифицированным юристом.' },
      { q: 'Какой срок исковой давности по взысканию долга?', a: 'Общий срок: Россия — 3 года; Украина — 3 года; Германия — 3 года; Франция — 5 лет (2 года по потребительским кредитам); Великобритания — 6 лет; Литва — 10 лет (общий), 3 года (коммерческий).' },
      { q: 'Что такое «пресекательный срок»?', a: 'Пресекательный (абсолютный) срок — максимальный период, по истечении которого требование не может быть предъявлено независимо от момента, когда истец узнал о нарушении. Во Франции — 20 лет с момента причинения вреда; в Германии для большинства требований — 30 лет.' },
      { q: 'Применяется ли срок давности к уголовным делам?', a: 'Да, но по другим правилам. Незначительные преступления имеют короткие сроки давности. Тяжкие преступления (убийство, серьёзные сексуальные преступления, военные преступления) как правило не имеют срока давности. В России: за убийство и ряд тяжких преступлений — 15 лет.' },
      { q: 'Каков срок давности по трудовым спорам?', a: 'Сроки по трудовым спорам значительно короче: Россия — 1 месяц по искам об увольнении, 1 год по невыплате зарплаты; Украина — 1 месяц по увольнению; Литва — 1 месяц; Германия — 3 года (но часто договорные сроки короче); Франция — 2 года.' },
      { q: 'Могут ли стороны договориться об изменении срока исковой давности?', a: 'Зависит от юрисдикции. В России стороны не могут изменить срок давности по соглашению — это прямо запрещено законом. В Германии стороны вправе сокращать срок в договоре. Во Франции коммерческие стороны могут договориться о сроке от 1 до 10 лет.' },
    ],
  },
  uk: {
    description: 'Строк позовної давності — це максимальний час, протягом якого може бути поданий позов до суду. Після його спливу вимога вважається погашеною, і суд, як правило, відмовить у її розгляді. Строки суттєво різняться залежно від країни та типу позову.\n\nПропуск строку позовної давності — одна з найпоширеніших і найдорожчих юридичних помилок. Навіть сильна вимога стає нездійсненною після спливу строку. Завжди перевіряйте застосовний строк і дійте оперативно.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке строк позовної давності?', a: 'Встановлений законом період, протягом якого особа може звернутися до суду. Після його спливу суд відмовить у позові. Забезпечує правову визначеність та захист відповідачів від застарілих вимог.' },
      { q: 'Коли починається строк позовної давності?', a: 'Як правило, з моменту, коли позивач дізнався або повинен був дізнатися про порушення. Для договірних вимог — з дати порушення. У деяких країнах існує «абсолютний» максимальний строк незалежно від поінформованості.' },
      { q: 'Чи можна зупинити або перервати строк?', a: 'Так. Підстави: неповноліття позивача, шахрайство відповідача, переговори між сторонами, подання позову до суду. Конкретні підстави залежать від законодавства країни.' },
      { q: 'Що станеться, якщо пропустити строк?', a: 'Відповідач може заявити про закінчення строку давності, і суд відмовить у позові. У окремих випадках строк можна поновити за наявності поважних причин — на розсуд суду.' },
      { q: 'Чи є цей інструмент юридичною консультацією?', a: 'Ні. Інструмент надає загальну освітню інформацію. Завжди консультуйтеся з кваліфікованим юристом.' },
      { q: 'Який строк позовної давності для стягнення боргу?', a: 'Загальний строк: Україна — 3 роки; Росія — 3 роки; Польща — 6 років (3 роки для підприємців); Литва — 10 років (загальний), 3 роки (комерційний); Франція — 5 років; Великобританія — 6 років.' },
      { q: 'Що таке «присікальний строк»?', a: 'Присікальний (абсолютний) строк — максимальний термін, після якого вимога не може бути пред\'явлена незалежно від моменту, коли позивач дізнався про порушення. В Україні встановлені окремі присікальні строки для різних категорій вимог.' },
      { q: 'Чи застосовується строк давності до кримінальних справ?', a: 'Так, але за іншими правилами. Незначні злочини мають короткі строки. Тяжкі злочини (вбивство, тяжкі сексуальні злочини) як правило не мають строку давності. В Україні: за злочини проти людяності строк не застосовується.' },
      { q: 'Яким є строк давності у трудових спорах?', a: 'Строки по трудових спорах значно коротші: Україна — 1 місяць по звільненню, 3 роки по заробітній платі; Литва — 1 місяць; Росія — 1 місяць по звільненню; Польща — 3 роки; Франція — 2 роки; Великобританія — 3 місяці (дуже короткий!).' },
      { q: 'Чи можуть сторони домовитися про зміну строку давності?', a: 'В Україні сторони не можуть змінювати строк позовної давності за угодою — це прямо заборонено ЦК України. У Німеччині та Франції комерційні сторони мають більше гнучкості для договірного регулювання строків.' },
    ],
  },
  fr: {
    description: 'Le délai de prescription est le délai maximal pendant lequel une action en justice peut être introduite. Une fois expiré, la créance est prescrite et les tribunaux refuseront généralement de l\'examiner. Les délais varient considérablement selon le pays, le type de réclamation et les circonstances.\n\nRater un délai de prescription est l\'une des erreurs juridiques les plus fréquentes et les plus coûteuses. Même une créance solide devient irrecevable une fois le délai expiré. Vérifiez toujours le délai applicable et agissez rapidement.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le délai de prescription ?', a: 'Le délai de prescription fixe la période maximale pour saisir un tribunal. Une fois expiré, la créance est prescrite. Ce mécanisme garantit la sécurité juridique et protège les défendeurs de réclamations anciennes.' },
      { q: 'Quand commence le délai de prescription ?', a: 'En général, à partir du moment où le demandeur a eu connaissance du préjudice et de l\'identité du défendeur. Pour les contrats, à la date de la violation. Certains pays ont un délai maximum absolu indépendant de la connaissance.' },
      { q: 'Peut-on suspendre ou interrompre la prescription ?', a: 'Oui. Causes de suspension : minorité, mesures conservatoires, négociations. Causes d\'interruption (redémarrent le compteur) : mise en demeure, assignation en justice, reconnaissance de dette. Les règles varient par pays et type de créance.' },
      { q: 'Que se passe-t-il si je rate le délai ?', a: 'Le défendeur peut soulever la prescription et le tribunal rejettera la demande. En France, la prescription est un moyen de défense que le juge ne peut pas soulever d\'office — le défendeur doit l\'invoquer expressément.' },
      { q: 'Cet outil constitue-t-il un conseil juridique ?', a: 'Non. Informations éducatives générales uniquement. Consultez toujours un avocat qualifié avant de décider d\'introduire ou de défendre une action.' },
      { q: 'Quel est le délai pour recouvrer une dette en France ?', a: 'En France : 5 ans pour les créances personnelles et commerciales (art. L.110-4 C. com.) ; 2 ans pour les créances entre un professionnel et un consommateur ; 30 ans pour les créances immobilières. Le point de départ est la date d\'exigibilité ou la connaissance de la créance.' },
      { q: 'Qu\'est-ce que le délai butoir (long-stop) ?', a: 'Le délai butoir est un délai maximum absolu au-delà duquel aucune action n\'est possible, quelle que soit la date de connaissance du dommage. En France, c\'est généralement 20 ans à compter du fait générateur. Il empêche les actions indéfiniment retardées même en cas de dommages "latents".' },
      { q: 'La prescription s\'applique-t-elle aux affaires pénales ?', a: 'Oui, avec des règles différentes. En France : contraventions — 1 an ; délits — 6 ans ; crimes — 20 ans. Les crimes contre l\'humanité et crimes de guerre sont imprescriptibles. Pour certaines infractions sexuelles sur mineurs, le délai court à partir de la majorité de la victime.' },
      { q: 'Quel est le délai pour les litiges prud\'homaux en France ?', a: 'En France : 2 ans pour toute action relative au contrat de travail (art. L.1471-1 C. trav.) ; 3 ans pour les rappels de salaire ; 5 ans pour les discriminations et harcèlement. Attention : le délai prud\'homal de 2 ans est parmi les plus courts en Europe.' },
      { q: 'Les parties peuvent-elles modifier la prescription par contrat ?', a: 'En France oui, dans certaines limites : les parties peuvent convenir d\'un délai compris entre 1 et 10 ans (art. 2254 C. civ.), sauf pour les actions en responsabilité délictuelle, les créances de salaire, et les consommateurs. Cette modification doit être expresse et ne peut pas aggraver la position du débiteur en matière de contrats d\'adhésion.' },
    ],
  },
  lt: {
    description: 'Ieškinio senaties terminas yra maksimalus laikotarpis, per kurį gali būti pradėtas teisinis procesas. Pasibaigus šiam terminui, reikalavimas tampa senaties teise padengtas ir teismai paprastai atsisako jį nagrinėti. Terminai labai skiriasi priklausomai nuo šalies, ieškinio tipo ir aplinkybių.\n\nIeškinio senaties termino praleidimas yra viena iš dažniausių ir brangiausių teisinių klaidų. Net stiprus reikalavimas tampa neįvykdomas pasibaigus terminui. Visada patikrinkite taikomą terminą ir veikite greitai.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra ieškinio senaties terminas?', a: 'Įstatymo nustatytas laikotarpis, per kurį asmuo gali kreiptis į teismą. Pasibaigus terminui, teismas atsisakys priimti ieškinį. Tai užtikrina teisinį tikrumą ir apsaugo atsakovus nuo senų reikalavimų.' },
      { q: 'Kada pradedamas skaičiuoti terminas?', a: 'Paprastai nuo tada, kai ieškovas sužinojo arba turėjo sužinoti apie pažeidimą. Sutartinėms pretenzijoms – nuo sutarties pažeidimo datos. Kai kuriose šalyse yra „absoliutus" maksimalus terminas, nepriklausantis nuo žinojimo.' },
      { q: 'Ar galima sustabdyti arba pertraukti terminą?', a: 'Taip. Pagrindai: ieškovo nepilnametystė, atsakovo sukčiavimas, derybos tarp šalių, ieškinio pateikimas teismui. Konkretūs pagrindai priklauso nuo šalies įstatymų.' },
      { q: 'Kas nutiks, jei praleisiu terminą?', a: 'Atsakovas gali pareikšti senaties gynybą, ir teismas atmes ieškinį. Kai kuriose jurisdikcijose teismas turi diskreciją leisti vėlyvus ieškinius išimtinėmis aplinkybėmis.' },
      { q: 'Ar šis įrankis teikia teisinę konsultaciją?', a: 'Ne. Bendrojo pobūdžio edukacinė informacija. Visada konsultuokitės su kvalifikuotu teisininku.' },
      { q: 'Koks senaties terminas skoloms išieškoti?', a: 'Lietuva — 10 metų bendras, 3 metai komerciniam (tarp verslo subjektų); Latvija — 10 metų; Estija — 3 metai; Vokietija — 3 metai; Prancūzija — 5 metai; Rusija ir Ukraina — 3 metai; JK — 6 metai.' },
      { q: 'Kas yra galutinis (absoliutus) terminas?', a: 'Galutinis terminas — maksimalus laikotarpis, po kurio joks ieškinys negali būti pateiktas nepriklausomai nuo žinojimo apie žalą momento. Jis neleidžia neribotai atidėti ieškinio net esant „latentinei" žalai.' },
      { q: 'Ar baudžiamosioms byloms taikomi senaties terminai?', a: 'Taip, bet pagal kitas taisykles. Nusikaltimai prieš žmoniškumą ir karo nusikaltimai paprastai nepriklauso senačiai. Lengvi nusikaltimai turi trumpus terminus. Lietuva: baudžiamoji atsakomybė atsiranda per terminus, nustatytus BK.' },
      { q: 'Koks yra terminas darbo ginčams?', a: 'Darbo ginčų terminai gerokai trumpesni: Lietuva — 1 mėnuo atleidimu dėl atleidimo iš darbo, 3 metai kitoms darbo ginčams; Latvija — 1 mėnuo; Estija — 4 mėnesiai; Vokietija — 3 metai; Prancūzija — 2 metai; JK — 3 mėnesiai (labai trumpas!).' },
      { q: 'Ar šalys gali susitarti pakeisti senaties terminą?', a: 'Lietuvoje šalys gali sutartinai nustatyti trumpesnį terminą komercinėse sutartyse, bet negali pailginti termino virš įstatyminio maksimalaus. Vartotojų sutartyse tokios išlygos draudžiamos. Prancūzijoje komercinės šalys gali susitarti dėl 1–10 metų termino.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/calculator/limitation', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LimitationPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/limitation`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
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
        <LimitationCalculator locale={locale} />
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
