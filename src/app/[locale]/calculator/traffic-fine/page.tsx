import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import TrafficFineCalculator from './TrafficFineCalculator';
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
  fr: [{ href: '/calculator/alimony', label: 'Calculatrice de pension alimentaire' }, { href: '/calculator/flight-delay', label: 'Compensation retard de vol' }],
  lt: [{ href: '/calculator/alimony', label: 'Alimentų skaičiuotuvas' }, { href: '/calculator/flight-delay', label: 'Kompensacija už skrydžio vėlavimą' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Traffic Fine Calculator — Fines by Country', description: 'Check traffic fines for speeding, red light violations, phone use and drunk driving in Germany, France, USA, Ukraine, Russia and more. Penalty points and license suspension info included.', h1: 'Traffic Fine Calculator' },
  ru: { title: 'Штрафы ПДД — размер штрафа по стране', description: 'Узнайте размер штрафов ПДД за превышение скорости, проезд на красный, телефон и пьяное вождение в Германии, Франции, США, Украине, России и других странах.', h1: 'Штрафы ПДД' },
  uk: { title: 'Штрафи ПДР — розмір штрафу за країною', description: 'Дізнайтеся розміри штрафів за перевищення швидкості, проїзд на червоне світло, використання телефону та нетверезе водіння у різних країнах.', h1: 'Штрафи ПДР' },
  fr: { title: 'Calculateur d\'amendes routières — par pays', description: 'Consultez les amendes routières pour excès de vitesse, feu rouge, téléphone au volant et alcool en Allemagne, France, Pologne, USA et autres pays.', h1: 'Calculateur d\'amendes routières' },
  lt: { title: 'Eismo baudų skaičiuotuvas — baudos pagal šalį', description: 'Patikrinkite eismo baudas už greičio viršijimą, raudoną šviesą, telefoną ir neblaivų vairavimą Vokietijoje, Prancūzijoje, JAV, Ukrainoje ir kitose šalyse.', h1: 'Eismo baudų skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Select your country and the type of traffic violation to see the typical fine range, penalty points, and whether a license suspension may apply. Data covers Germany, France, Poland, Lithuania, Ukraine, Russia, and the USA. Note that fines can vary significantly by region, prior offences, and whether the case goes to court.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How are traffic fines calculated?', a: 'Traffic fines are set by national or regional law and depend on the type of violation, speed over the limit, blood alcohol level, and prior offences. Some countries use fixed fines (France, Germany for minor speeding), while others use ranges decided by a traffic court.' },
      { q: 'What are penalty points?', a: 'Many European countries use a penalty point system. Points accumulate on your driving licence for violations. Reaching the maximum (e.g. 8 points in Germany, 12 in France) results in licence suspension. Points are typically cleared after 2–4 years of clean driving.' },
      { q: 'Can I get a fine reduced?', a: 'In most countries, fines paid promptly (within a set period) are reduced by 25–50% — for example, France offers a 33% reduction for early payment. Some jurisdictions allow appeal via a traffic court where fines may be lowered or dismissed.' },
      { q: 'What happens if I ignore a traffic fine abroad?', a: 'EU countries cooperate to enforce fines across borders under Directive 2015/413/EU. Your home country\'s authority can be asked to collect the fine on behalf of another EU member state. Non-EU countries may also have bilateral enforcement agreements.' },
      { q: 'What is the legal blood alcohol limit?', a: 'Limits vary by country: 0.5‰ in Germany, France, Poland, and Lithuania (0.4‰); 0.2‰ in Poland for novice drivers; 0‰ in some US states for commercial drivers. Ukraine uses 0.2‰ for all drivers. Always check local rules before driving.' },
    ],
  },
  ru: {
    description: 'Выберите страну и вид нарушения, чтобы узнать ориентировочный размер штрафа, количество штрафных баллов и возможность лишения прав. Данные охватывают Германию, Францию, Польшу, Литву, Украину, Россию и США.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитываются штрафы за нарушения ПДД?', a: 'Штрафы устанавливаются национальным или региональным законодательством и зависят от вида нарушения, скорости превышения, уровня алкоголя и наличия предыдущих нарушений. В одних странах применяются фиксированные штрафы, в других — диапазон, устанавливаемый судом.' },
      { q: 'Что такое штрафные баллы?', a: 'Во многих европейских странах применяется балльная система. Баллы начисляются за нарушения и накапливаются на водительском удостоверении. При достижении максимума — лишение прав. Как правило, баллы снимаются через 2–4 года без нарушений.' },
      { q: 'Можно ли снизить размер штрафа?', a: 'В большинстве стран штраф, оплаченный своевременно, снижается на 25–50%. Например, во Франции — скидка 33% при досрочной оплате. В ряде стран возможно обжалование в суде.' },
      { q: 'Что будет, если не оплатить штраф за границей?', a: 'Страны ЕС сотрудничают в принудительном взыскании штрафов согласно Директиве 2015/413/EU. Власти вашей страны могут быть привлечены к взысканию штрафа от имени другого государства ЕС.' },
      { q: 'Какой допустимый уровень алкоголя за рулём?', a: 'Лимиты различаются: 0,5‰ в Германии, Франции; 0,5‰ в Польше (0,2‰ для новичков); 0,4‰ в Литве; 0,2‰ на Украине; варьируется по штатам в США. Всегда уточняйте местные правила.' },
    ],
  },
  uk: {
    description: 'Оберіть країну та вид порушення, щоб дізнатися орієнтовний розмір штрафу, кількість штрафних балів та можливість позбавлення прав. Дані охоплюють Німеччину, Францію, Польщу, Литву, Україну, Росію та США.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховуються штрафи за порушення ПДР?', a: 'Штрафи встановлюються національним або регіональним законодавством і залежать від виду порушення, перевищення швидкості та рівня алкоголю. В одних країнах — фіксовані штрафи, в інших — діапазон, що визначається судом.' },
      { q: 'Що таке штрафні бали?', a: 'Багато європейських країн використовують балову систему. Бали нараховуються за порушення. При досягненні максимуму — позбавлення прав. Зазвичай бали знімаються через 2–4 роки без порушень.' },
      { q: 'Чи можна зменшити розмір штрафу?', a: 'У більшості країн штраф, сплачений своєчасно, знижується на 25–50%. У Франції — знижка 33% при ранній сплаті. В деяких країнах можливе оскарження в суді.' },
      { q: 'Що буде, якщо не сплатити штраф за кордоном?', a: 'Країни ЄС співпрацюють у примусовому стягненні штрафів відповідно до Директиви 2015/413/EU. Влада вашої країни може бути залучена до стягнення штрафу від імені іншої держави ЄС.' },
      { q: 'Який допустимий рівень алкоголю за кермом?', a: 'Ліміти різняться: 0,5‰ у Німеччині та Франції; 0,5‰ у Польщі (0,2‰ для початківців); 0,4‰ у Литві; 0,2‰ в Україні. Завжди уточнюйте місцеві правила.' },
    ],
  },
  fr: {
    description: 'Sélectionnez votre pays et le type d\'infraction pour voir la fourchette d\'amendes, les points de pénalité et les risques de suspension de permis. Données pour l\'Allemagne, la France, la Pologne, la Lituanie, l\'Ukraine, la Russie et les États-Unis.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment les amendes routières sont-elles calculées ?', a: 'Les amendes sont fixées par la loi nationale ou régionale et dépendent du type d\'infraction, de l\'excès de vitesse, du taux d\'alcool et des antécédents. Certains pays appliquent des amendes fixes, d\'autres des fourchettes décidées par un tribunal.' },
      { q: 'Que sont les points de pénalité ?', a: 'De nombreux pays européens utilisent un système de points. Les points s\'accumulent sur votre permis pour chaque infraction. Atteindre le maximum entraîne une suspension. Les points sont généralement effacés après 2 à 4 ans de conduite sans infraction.' },
      { q: 'Peut-on réduire une amende ?', a: 'Dans la plupart des pays, une amende payée rapidement est réduite de 25 à 50 %. En France, une réduction de 33 % est accordée en cas de paiement anticipé. Un recours devant un tribunal peut également permettre de réduire ou annuler l\'amende.' },
      { q: 'Que se passe-t-il si j\'ignore une amende à l\'étranger ?', a: 'Les pays de l\'UE coopèrent pour recouvrer les amendes en vertu de la directive 2015/413/UE. Votre pays peut être chargé de recouvrer l\'amende au nom d\'un autre État membre.' },
      { q: 'Quel est le taux d\'alcoolémie légal ?', a: 'Les limites varient : 0,5‰ en Allemagne et en France ; 0,5‰ en Pologne (0,2‰ pour les nouveaux conducteurs) ; 0,4‰ en Lituanie ; 0,2‰ en Ukraine. Vérifiez toujours les règles locales.' },
    ],
  },
  lt: {
    description: 'Pasirinkite šalį ir pažeidimo tipą, kad pamatytumėte orientacinį baudos dydį, baudos taškus ir galimą vairuotojo teisių atėmimą. Duomenys apima Vokietiją, Prancūziją, Lenkiją, Lietuvą, Ukrainą, Rusiją ir JAV.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamos eismo baudos?', a: 'Baudos nustatomos nacionaliniais arba regioniniais teisės aktais ir priklauso nuo pažeidimo tipo, greičio viršijimo, alkoholio kiekio ir ankstesnių pažeidimų. Kai kurios šalys taiko fiksuotas baudas, kitos – diapazonus, nustatytus teismo.' },
      { q: 'Kas yra baudos taškai?', a: 'Daugelis Europos šalių naudoja baudų taškų sistemą. Taškai kaupiami vairuotojo pažymėjime už pažeidimus. Pasiekus maksimumą – teisių atėmimas. Paprastai taškai panaikinami po 2–4 metų be pažeidimų.' },
      { q: 'Ar galima sumažinti baudą?', a: 'Daugelyje šalių laiku sumokėta bauda sumažinama 25–50%. Prancūzijoje – 33% nuolaida mokant anksčiau termino. Kai kuriose šalyse galima apskųsti teisme.' },
      { q: 'Kas nutiks, jei neapmokėsiu baudos užsienyje?', a: 'ES šalys bendradarbiauja vykdydamos baudas pagal Direktyvą 2015/413/ES. Jūsų šalies institucija gali būti paprašyta išieškoti baudą kitos ES valstybės narės vardu.' },
      { q: 'Koks yra leistinas alkoholio kiekis kraujyje?', a: 'Ribos skiriasi: 0,5‰ Vokietijoje ir Prancūzijoje; 0,5‰ Lenkijoje (0,2‰ pradedantiesiems); 0,4‰ Lietuvoje; 0,2‰ Ukrainoje. Visada tikrinkite vietos taisykles.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/traffic-fine') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TrafficFinePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/traffic-fine`,
    applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <TrafficFineCalculator locale={locale} />
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
