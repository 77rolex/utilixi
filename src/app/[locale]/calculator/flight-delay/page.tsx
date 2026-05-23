import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import FlightDelayCalculator from './FlightDelayCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/traffic-fine', label: 'Traffic Fine Calculator' }, { href: '/calculator/alimony', label: 'Alimony Calculator' }],
  ru: [{ href: '/calculator/traffic-fine', label: 'Штрафы ПДД' }, { href: '/calculator/alimony', label: 'Калькулятор алиментов' }],
  uk: [{ href: '/calculator/traffic-fine', label: 'Штрафи ПДР' }, { href: '/calculator/alimony', label: 'Калькулятор аліментів' }],
  fr: [{ href: '/calculator/traffic-fine', label: 'Calculateur d\'amendes routières' }, { href: '/calculator/alimony', label: 'Calculatrice de pension alimentaire' }],
  lt: [{ href: '/calculator/traffic-fine', label: 'Eismo baudų skaičiuotuvas' }, { href: '/calculator/alimony', label: 'Alimentų skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Flight Delay Compensation Calculator — EU261/2004', description: 'Check if you are entitled to flight delay compensation under EU Regulation 261/2004. Find out how much you can claim — €250, €400 or €600 — based on flight distance and delay duration.', h1: 'Flight Delay Compensation Calculator' },
  ru: { title: 'Компенсация за задержку рейса — EU261/2004', description: 'Проверьте право на компенсацию за задержку рейса по Регламенту ЕС 261/2004. Узнайте сумму компенсации — €250, €400 или €600 — в зависимости от дальности и задержки.', h1: 'Калькулятор компенсации за задержку рейса' },
  uk: { title: 'Компенсація за затримку рейсу — EU261/2004', description: 'Перевірте право на компенсацію за затримку рейсу згідно з Регламентом ЄС 261/2004. Дізнайтеся суму — €250, €400 або €600 — залежно від дальності та затримки.', h1: 'Калькулятор компенсації за затримку рейсу' },
  fr: { title: 'Calculateur d\'indemnisation retard de vol — EU261/2004', description: 'Vérifiez si vous avez droit à une indemnisation pour retard de vol selon le règlement UE 261/2004. Découvrez le montant — €250, €400 ou €600 — selon la distance et le retard.', h1: 'Calculateur d\'indemnisation retard de vol' },
  lt: { title: 'Skrydžio vėlavimo kompensacijos skaičiuotuvas — EU261/2004', description: 'Patikrinkite, ar turite teisę gauti kompensaciją už skrydžio vėlavimą pagal ES reglamentą 261/2004. Sužinokite sumą — €250, €400 ar €600 — pagal atstumą ir vėlavimo trukmę.', h1: 'Skrydžio vėlavimo kompensacijos skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'EU Regulation 261/2004 entitles passengers to financial compensation when their flight is delayed by 3 hours or more at the destination, cancelled, or they are denied boarding. Use this calculator to estimate your compensation based on the route type, delay duration, and flight distance. Note that airlines can reduce compensation by 50% if they offer re-routing.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'When am I entitled to flight delay compensation?', a: 'You are entitled to compensation under EU261/2004 if your flight departs from an EU airport (any airline), or arrives at an EU airport on an EU-based airline, and you arrive at your final destination with a delay of 3 hours or more. Cancellations and denied boarding also qualify.' },
      { q: 'How much compensation can I claim?', a: '€250 for flights up to 1,500 km; €400 for flights between 1,500 and 3,500 km; €400 for intra-EU flights over 3,500 km; €600 for non-EU flights over 3,500 km. These amounts may be reduced by 50% if the airline offers re-routing that limits your delay.' },
      { q: 'What are extraordinary circumstances?', a: 'Extraordinary circumstances exempt the airline from paying compensation. These include severe weather conditions (storms, heavy snow), political instability, security risks, unexpected air traffic management decisions, and certain industrial disputes (not caused by the airline itself). Technical faults are generally NOT extraordinary circumstances.' },
      { q: 'Does EU261 apply to all flights?', a: 'EU261 applies to: (1) all flights departing from an EU airport regardless of airline; (2) flights arriving at an EU airport operated by an EU-based carrier. It does NOT apply to flights outside the EU operated by non-EU airlines — for example, a US carrier flying from New York to Canada.' },
      { q: 'How do I claim my compensation?', a: 'File a complaint directly with the airline in writing, referencing EU Regulation 261/2004. Keep all boarding passes, booking confirmations, and evidence of your actual arrival time. If the airline refuses, you can escalate to your national aviation authority (e.g. CAA in the UK, DGAC in France) or use an alternative dispute resolution (ADR) body.' },
    ],
  },
  ru: {
    description: 'Регламент ЕС 261/2004 даёт пассажирам право на компенсацию при задержке рейса на 3 и более часов, отмене или отказе в посадке. Используйте калькулятор, чтобы оценить сумму компенсации в зависимости от типа маршрута, длительности задержки и дальности рейса.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Когда я имею право на компенсацию?', a: 'Право на компенсацию возникает, если ваш рейс вылетает из аэропорта ЕС (любая авиакомпания) или прибывает в ЕС авиакомпанией ЕС, и вы прибыли в конечный пункт с задержкой 3 часа и более. Также применяется при отмене рейса и отказе в посадке.' },
      { q: 'Какова сумма компенсации?', a: '€250 — рейсы до 1500 км; €400 — 1500–3500 км; €400 — внутри ЕС свыше 3500 км; €600 — за пределы ЕС свыше 3500 км. Суммы могут быть снижены на 50%, если авиакомпания предложила альтернативный маршрут.' },
      { q: 'Что такое чрезвычайные обстоятельства?', a: 'Чрезвычайные обстоятельства освобождают авиакомпанию от выплаты компенсации. К ним относятся: сильные штормы, политическая нестабильность, угрозы безопасности, непредвиденные решения по управлению воздушным движением, забастовки (не по вине авиакомпании). Технические неисправности, как правило, НЕ являются чрезвычайными обстоятельствами.' },
      { q: 'На какие рейсы распространяется EU261?', a: 'EU261 применяется к: (1) всем рейсам из аэропортов ЕС (любая авиакомпания); (2) рейсам в ЕС авиакомпаний ЕС. Не применяется к рейсам за пределами ЕС не-ЕС авиакомпаний.' },
      { q: 'Как подать заявку на компенсацию?', a: 'Направьте письменную претензию в авиакомпанию, ссылаясь на Регламент ЕС 261/2004. Сохраните посадочные талоны и доказательства задержки. При отказе — обратитесь в национальный авиационный орган или орган по альтернативному урегулированию споров.' },
    ],
  },
  uk: {
    description: 'Регламент ЄС 261/2004 надає пасажирам право на компенсацію при затримці рейсу на 3 і більше годин, скасуванні або відмові у посадці. Використовуйте калькулятор для оцінки суми компенсації залежно від типу маршруту та затримки.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Коли я маю право на компенсацію?', a: 'Право на компенсацію виникає, якщо ваш рейс вилітає з аеропорту ЄС (будь-яка авіакомпанія) або прибуває до ЄС авіакомпанією ЄС, і ви прибули до кінцевого пункту із затримкою 3 і більше годин. Також застосовується при скасуванні рейсу та відмові у посадці.' },
      { q: 'Яка сума компенсації?', a: '€250 — рейси до 1500 км; €400 — 1500–3500 км; €400 — всередині ЄС понад 3500 км; €600 — за межі ЄС понад 3500 км. Суми можуть бути зменшені на 50%, якщо авіакомпанія запропонувала альтернативний маршрут.' },
      { q: 'Що таке надзвичайні обставини?', a: 'Надзвичайні обставини звільняють авіакомпанію від виплати компенсації: сильні шторми, політична нестабільність, загрози безпеці, непередбачені рішення щодо управління повітряним рухом, страйки (не з вини авіакомпанії). Технічні несправності, як правило, НЕ є надзвичайними обставинами.' },
      { q: 'На які рейси поширюється EU261?', a: 'EU261 застосовується до: (1) всіх рейсів з аеропортів ЄС; (2) рейсів до ЄС авіакомпаній ЄС. Не застосовується до рейсів за межами ЄС не-ЄС авіакомпаній.' },
      { q: 'Як подати заявку на компенсацію?', a: 'Направте письмову претензію до авіакомпанії, посилаючись на Регламент ЄС 261/2004. Збережіть посадкові талони та докази затримки. У разі відмови — зверніться до національного авіаційного органу.' },
    ],
  },
  fr: {
    description: 'Le règlement UE 261/2004 donne aux passagers le droit à une indemnisation lorsque leur vol est retardé de 3 heures ou plus, annulé ou en cas de refus d\'embarquement. Utilisez ce calculateur pour estimer le montant en fonction du type de trajet, de la durée du retard et de la distance.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quand ai-je droit à une indemnisation ?', a: 'Vous avez droit à une indemnisation si votre vol part d\'un aéroport de l\'UE (toute compagnie) ou arrive dans l\'UE avec une compagnie européenne, et que vous arrivez à destination avec 3 heures ou plus de retard. Les annulations et refus d\'embarquement sont également concernés.' },
      { q: 'Quel est le montant de l\'indemnisation ?', a: '€250 pour les vols jusqu\'à 1 500 km ; €400 pour 1 500–3 500 km ; €400 pour les vols intra-UE de plus de 3 500 km ; €600 pour les vols hors UE de plus de 3 500 km. Ces montants peuvent être réduits de 50% si la compagnie propose un réacheminement.' },
      { q: 'Que sont les circonstances extraordinaires ?', a: 'Les circonstances extraordinaires exonèrent la compagnie du paiement : météo extrême, instabilité politique, menaces sécuritaires, décisions imprévisibles de gestion du trafic aérien, grèves non imputables à la compagnie. Les pannes techniques ne constituent généralement PAS des circonstances extraordinaires.' },
      { q: 'EU261 s\'applique-t-il à tous les vols ?', a: 'EU261 s\'applique à : (1) tous les vols au départ d\'un aéroport de l\'UE ; (2) les vols à destination de l\'UE opérés par une compagnie européenne. Il ne s\'applique pas aux vols hors UE opérés par des compagnies non européennes.' },
      { q: 'Comment réclamer mon indemnisation ?', a: 'Déposez une réclamation écrite auprès de la compagnie en citant le règlement UE 261/2004. Conservez vos cartes d\'embarquement et preuves de retard. En cas de refus, saisissez la DGAC ou un organisme de règlement alternatif des litiges.' },
    ],
  },
  lt: {
    description: 'ES reglamentas 261/2004 suteikia keleiviams teisę į kompensaciją, kai skrydis vėluoja 3 ar daugiau valandų, atšaukiamas arba atsisakoma įlaipinti. Naudokite šį skaičiuotuvą kompensacijos sumai įvertinti pagal maršruto tipą, vėlavimo trukmę ir atstumą.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kada turiu teisę į kompensaciją?', a: 'Turite teisę į kompensaciją, jei jūsų skrydis išvyksta iš ES oro uosto (bet kuri aviakompanija) arba atvyksta į ES su ES aviakompanija, ir atvykstate į galutinį tikslą su 3 ar daugiau valandų vėlavimu. Taip pat taikoma atšaukus skrydį ar atsisakius įlaipinti.' },
      { q: 'Kokia kompensacijos suma?', a: '€250 – skrydžiams iki 1500 km; €400 – 1500–3500 km; €400 – ES vidaus skrydžiams per 3500 km; €600 – skrydžiams už ES ribų per 3500 km. Sumos gali būti sumažintos 50%, jei aviakompanija pasiūlė alternatyvų maršrutą.' },
      { q: 'Kas yra ypatingos aplinkybės?', a: 'Ypatingos aplinkybės atleidžia aviakompaniją nuo kompensacijos: stiprios audros, politinis nestabilumas, saugumo grėsmės, nenumatyti oro eismo valdymo sprendimai, streikai (ne dėl aviakompanijos kaltės). Techniniai gedimai paprastai NĖRA ypatingos aplinkybės.' },
      { q: 'Ar EU261 taikomas visiems skrydžiams?', a: 'EU261 taikomas: (1) visiems skrydžiams iš ES oro uostų; (2) skrydžiams į ES, vykdomiems ES aviakompanijų. Netaikomas skrydžiams už ES ribų, vykdomiems ne ES aviakompanijų.' },
      { q: 'Kaip pateikti kompensacijos prašymą?', a: 'Pateikite rašytinį skundą aviakompanijai, nurodydami ES reglamentą 261/2004. Išsaugokite įlaipinimo korteles ir vėlavimo įrodymus. Atsisakius – kreipkitės į nacionalinę aviacijos instituciją ar alternatyvaus ginčų sprendimo įstaigą.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/flight-delay') };
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
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/flight-delay`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <FlightDelayCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          <p className={styles.page__description}>{content.description}</p>
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
