import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import LimitationCalculator from './LimitationCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/alimony', label: 'Alimony Calculator' }, { href: '/calculator/flight-delay', label: 'Flight Delay Compensation' }],
  ru: [{ href: '/calculator/alimony', label: 'Калькулятор алиментов' }, { href: '/calculator/flight-delay', label: 'Компенсация за задержку рейса' }],
  uk: [{ href: '/calculator/alimony', label: 'Калькулятор аліментів' }, { href: '/calculator/flight-delay', label: 'Компенсація за затримку рейсу' }],
  fr: [{ href: '/calculator/alimony', label: 'Calculatrice de pension alimentaire' }, { href: '/calculator/flight-delay', label: 'Indemnisation retard de vol' }],
  lt: [{ href: '/calculator/alimony', label: 'Alimentų skaičiuotuvas' }, { href: '/calculator/flight-delay', label: 'Kompensacija už skrydžio vėlavimą' }],
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
    description: 'The statute of limitations (or prescription period) is the maximum time after an event within which legal proceedings may be initiated. After this period expires, the claim becomes time-barred and courts will generally refuse to hear it. Periods vary significantly by country, claim type, and circumstances — use this tool as a guide and always consult a qualified lawyer.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the statute of limitations?', a: 'The statute of limitations is a law that sets the maximum period after an event within which legal proceedings may be initiated. Once the period expires, the right to sue is generally lost — the claim becomes "time-barred." The purpose is to ensure legal certainty and protect defendants from stale claims.' },
      { q: 'When does the limitation period start?', a: 'The start date depends on the country and claim type. Generally it starts when the claimant knew (or should have known) about the harm and the identity of the defendant. For contracts, it typically starts at the date of breach. Some countries have an "absolute" or "long-stop" date regardless of knowledge.' },
      { q: 'Can the limitation period be suspended or interrupted?', a: 'Yes. Most legal systems allow the limitation period to be suspended (paused) or interrupted (reset). Common grounds include: the claimant being a minor, fraud by the defendant, ongoing negotiations between the parties, or formal legal proceedings being started. Check local rules for specifics.' },
      { q: 'What happens if I miss the limitation period?', a: 'If you file a claim after the limitation period expires, the defendant can raise a limitation defence, and the court will typically dismiss your claim. However, courts in some jurisdictions have discretion to allow late claims in exceptional circumstances (e.g. the UK\'s s.33 Limitation Act for personal injury).' },
      { q: 'Is this tool legal advice?', a: 'No. This tool provides general educational information based on statutory limitation periods in selected countries. Limitation law is complex and jurisdiction-specific. Always consult a qualified solicitor, attorney, or legal adviser before making decisions about whether to bring or defend a claim.' },
    ],
  },
  ru: {
    description: 'Срок исковой давности — это максимальное время, в течение которого может быть подан иск в суд. По истечении этого срока требование становится погашённым, и суд, как правило, откажет в его рассмотрении. Сроки существенно различаются в зависимости от страны, типа иска и обстоятельств.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое срок исковой давности?', a: 'Срок исковой давности — это установленный законом период, в течение которого лицо может обратиться в суд за защитой своего права. После его истечения суд откажет в принятии иска (требование считается погашённым). Это обеспечивает правовую определённость и защиту ответчиков от устаревших требований.' },
      { q: 'Когда начинается срок исковой давности?', a: 'Как правило, срок начинается с момента, когда истец узнал или должен был узнать о нарушении своего права. Для договорных требований — с даты нарушения договора. В ряде стран существует «абсолютный» максимальный срок независимо от осведомлённости.' },
      { q: 'Можно ли приостановить или прервать срок?', a: 'Да. Большинство правовых систем допускают приостановление или перерыв срока: несовершеннолетие истца, мошенничество ответчика, переговоры между сторонами, подача иска в суд. Конкретные основания зависят от законодательства страны.' },
      { q: 'Что будет, если пропустить срок?', a: 'Ответчик вправе заявить об истечении срока давности, и суд, как правило, откажет в иске. В отдельных случаях суд может восстановить срок при наличии уважительных причин — зависит от законодательства.' },
      { q: 'Является ли этот инструмент юридической консультацией?', a: 'Нет. Инструмент предоставляет общую образовательную информацию. Законодательство об исковой давности сложно и различается по юрисдикциям. Всегда консультируйтесь с квалифицированным юристом.' },
    ],
  },
  uk: {
    description: 'Строк позовної давності — це максимальний час, протягом якого може бути поданий позов до суду. Після його спливу вимога вважається погашеною, і суд, як правило, відмовить у її розгляді. Строки суттєво різняться залежно від країни та типу позову.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке строк позовної давності?', a: 'Строк позовної давності — це встановлений законом період, протягом якого особа може звернутися до суду за захистом свого права. Після його спливу суд відмовить у прийнятті позову. Це забезпечує правову визначеність та захист відповідачів від застарілих вимог.' },
      { q: 'Коли починається строк позовної давності?', a: 'Як правило, строк починається з моменту, коли позивач дізнався або повинен був дізнатися про порушення свого права. Для договірних вимог — з дати порушення договору. У деяких країнах існує «абсолютний» максимальний строк незалежно від поінформованості.' },
      { q: 'Чи можна зупинити або перервати строк?', a: 'Так. Більшість правових систем допускають зупинення або переривання строку: неповноліття позивача, шахрайство відповідача, переговори між сторонами, подання позову до суду. Конкретні підстави залежать від законодавства країни.' },
      { q: 'Що станеться, якщо пропустити строк?', a: 'Відповідач має право заявити про закінчення строку давності, і суд, як правило, відмовить у позові. У окремих випадках суд може поновити строк за наявності поважних причин — залежить від законодавства.' },
      { q: 'Чи є цей інструмент юридичною консультацією?', a: 'Ні. Інструмент надає загальну освітню інформацію. Законодавство про позовну давність складне і різниться за юрисдикціями. Завжди консультуйтеся з кваліфікованим юристом.' },
    ],
  },
  fr: {
    description: 'Le délai de prescription est le délai maximal pendant lequel une action en justice peut être introduite. Une fois ce délai expiré, la créance est prescrite et les tribunaux refuseront généralement de l\'examiner. Les délais varient considérablement selon le pays, le type de réclamation et les circonstances.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le délai de prescription ?', a: 'Le délai de prescription est la période maximale fixée par la loi pendant laquelle une personne peut saisir un tribunal. Une fois expiré, le droit d\'agir est en principe perdu — la créance est prescrite. Ce mécanisme garantit la sécurité juridique et protège les défendeurs de réclamations anciennes.' },
      { q: 'Quand commence le délai de prescription ?', a: 'En général, il court à partir du moment où le demandeur a eu connaissance (ou aurait dû avoir connaissance) du préjudice et de l\'identité du défendeur. Pour les contrats, il commence généralement à la date de la violation. Certains pays ont un délai maximum absolu indépendant de la connaissance.' },
      { q: 'Peut-on suspendre ou interrompre la prescription ?', a: 'Oui. La plupart des systèmes juridiques permettent la suspension ou l\'interruption : minorité du demandeur, fraude du défendeur, négociations en cours, introduction d\'une action en justice. Les conditions spécifiques dépendent de la législation locale.' },
      { q: 'Que se passe-t-il si je rate le délai ?', a: 'Le défendeur peut soulever la prescription, et le tribunal rejettera généralement votre demande. Certaines juridictions accordent un pouvoir discrétionnaire pour admettre des actions tardives dans des circonstances exceptionnelles.' },
      { q: 'Cet outil constitue-t-il un conseil juridique ?', a: 'Non. Cet outil fournit des informations éducatives générales. Le droit de la prescription est complexe et varie selon les juridictions. Consultez toujours un avocat qualifié avant de décider d\'introduire ou de défendre une action.' },
    ],
  },
  lt: {
    description: 'Ieškinio senaties terminas yra maksimalus laikotarpis, per kurį gali būti pradėtas teisinis procesas. Pasibaigus šiam terminui, reikalavimas tampa senaties teise padengtas ir teismai paprastai atsisako jį nagrinėti. Terminai labai skiriasi priklausomai nuo šalies, ieškinio tipo ir aplinkybių.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra ieškinio senaties terminas?', a: 'Ieškinio senaties terminas yra įstatymo nustatytas laikotarpis, per kurį asmuo gali kreiptis į teismą dėl savo teisės gynimo. Pasibaigus šiam terminui, teismas atsisakys priimti ieškinį. Tai užtikrina teisinį tikrumą ir apsaugo atsakovus nuo senų reikalavimų.' },
      { q: 'Kada pradedamas skaičiuoti terminas?', a: 'Paprastai terminas pradedamas skaičiuoti nuo tada, kai ieškovas sužinojo arba turėjo sužinoti apie pažeidimą. Sutartinėms pretenzijoms – nuo sutarties pažeidimo datos. Kai kuriose šalyse yra „absoliutus" maksimalus terminas, nepriklausantis nuo žinojimo.' },
      { q: 'Ar galima sustabdyti arba pertraukti terminą?', a: 'Taip. Dauguma teisinių sistemų leidžia sustabdyti arba pertraukti terminą: ieškovo nepilnametystė, atsakovo sukčiavimas, derybos tarp šalių, ieškinio pateikimas teismui. Konkretūs pagrindai priklauso nuo šalies įstatymų.' },
      { q: 'Kas nutiks, jei praleisiu terminą?', a: 'Atsakovas gali pareikšti senaties gynybą, ir teismas paprastai atmes ieškinį. Kai kuriose jurisdikcijose teismas turi diskreciją leisti vėlyvus ieškinius išimtinėmis aplinkybėmis.' },
      { q: 'Ar šis įrankis teikia teisinę konsultaciją?', a: 'Ne. Šis įrankis teikia bendro pobūdžio edukacinę informaciją. Senaties teisė yra sudėtinga ir skiriasi pagal jurisdikcijas. Visada konsultuokitės su kvalifikuotu teisininku prieš priimdami sprendimus.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/limitation') };
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <LimitationCalculator locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>
          <AdInline locale={locale} />
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
