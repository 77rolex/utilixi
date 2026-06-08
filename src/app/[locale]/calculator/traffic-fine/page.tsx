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
    description: 'Select your country and the type of traffic violation to see the typical fine range, penalty points, and whether a licence suspension may apply. Data covers Germany, France, Poland, Lithuania, Ukraine, Russia, and the USA. Note that fines can vary significantly by region, prior offences, and whether the case goes to court.\n\nTraffic laws vary dramatically between countries. A 20 km/h speeding offence that costs €35 in Germany might cost €135 in France or lead to criminal charges elsewhere. Understanding the rules before you drive abroad can save you from unexpected penalties.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How are traffic fines calculated?', a: 'Traffic fines are set by national or regional law and depend on the violation type, speed over the limit, BAC level, and prior offences. Some countries use fixed fines (France, Germany for minor speeding), while others use ranges decided by a traffic court.' },
      { q: 'What are penalty points?', a: 'Many European countries use a penalty point system. Points accumulate on your driving licence for violations. Reaching the maximum (8 points in Germany, 12 in France, 20 in Lithuania) results in licence suspension. Points are cleared after 2–4 years of clean driving.' },
      { q: 'Can I get a fine reduced?', a: 'In most countries, fines paid promptly within a set period are reduced by 25–50%. France offers a 33% reduction for payment within 15 days. Germany offers 25% off for early payment. Some jurisdictions allow appeal via a traffic court where fines may be lowered or dismissed.' },
      { q: 'What happens if I ignore a traffic fine abroad?', a: 'EU countries cooperate to enforce fines across borders under Directive 2015/413/EU. Your home country\'s authority can be asked to collect the fine on behalf of another EU state. Non-EU countries may also have bilateral enforcement agreements with your country.' },
      { q: 'What is the legal blood alcohol limit?', a: 'Limits vary: Germany and France 0.5‰ (0.0‰ for new drivers); Lithuania 0.4‰ (0.0‰ for new drivers); Ukraine 0.2‰; USA varies by state, typically 0.8‰ (0.0‰ for commercial drivers). Always check local rules before driving.' },
      { q: 'What are typical speeding fines in France?', a: 'In France (2024): 1–20 km/h over limit — €68–€135; 21–30 km/h — €135; 31–40 km/h — €135 + 2 points; 41–50 km/h — €135 + 3 points; over 50 km/h — up to €1,500 + 6 points + possible suspension. Automated camera fines arrive by post at a reduced rate.' },
      { q: 'How do German traffic fines work?', a: 'Germany uses the Bußgeldkatalog (fixed fine schedule). Speeding 1–10 km/h over: €30; 11–15 km/h: €50; 21–25 km/h in built-up area: €100 + 1 point; 31–40 km/h: €160 + 2 points; over 70 km/h: €700 + 3 points + 3-month ban. 8 points in 2 years = suspension.' },
      { q: 'What are traffic fines in Ukraine?', a: 'Ukraine\'s traffic fines are set in "non-taxable income minimums" (NDSM = 17 UAH): Minor speeding (20–40 km/h over): 300–500 UAH; drunk driving: from 3,400 UAH + license confiscation; running red light: 340 UAH; no insurance: 255–510 UAH. Fines increase 2–3× for repeat offences.' },
      { q: 'Can I lose my licence for a single offence?', a: 'Yes, in serious cases. All countries allow immediate licence suspension for: extreme speeding (50+ km/h over), drunk driving (BAC above a serious threshold), dangerous driving causing injury. In France, driving at 50+ km/h over the limit results in immediate suspension and possible criminal charges.' },
      { q: 'What is the difference between administrative and criminal traffic offences?', a: 'Administrative offences (minor speeding, parking, mobile phone use) are handled without court — you pay a fixed fine. Criminal offences (extreme speeding, drunk driving with injury, hit and run) require a court appearance and can result in criminal record, large fines, or imprisonment. The threshold varies by country.' },
    ],
  },
  ru: {
    description: 'Выберите страну и вид нарушения, чтобы узнать ориентировочный размер штрафа, количество штрафных баллов и возможность лишения прав. Данные охватывают Германию, Францию, Польшу, Литву, Украину, Россию и США.\n\nПравила дорожного движения и размеры штрафов существенно различаются по странам. Нарушение скорости на 20 км/ч, которое в Германии стоит €30, во Франции обойдётся в €135, а в некоторых ситуациях может повлечь уголовную ответственность.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как рассчитываются штрафы за нарушения ПДД?', a: 'Штрафы устанавливаются национальным законодательством и зависят от вида нарушения, превышения скорости, уровня алкоголя и наличия предыдущих нарушений. В одних странах фиксированные штрафы, в других — диапазон, устанавливаемый судом.' },
      { q: 'Что такое штрафные баллы?', a: 'Во многих европейских странах применяется балльная система. Баллы накапливаются на водительском удостоверении за нарушения. При достижении максимума — лишение прав. Как правило, баллы снимаются через 2–4 года без нарушений.' },
      { q: 'Можно ли снизить размер штрафа?', a: 'В большинстве стран штраф, оплаченный своевременно, снижается на 25–50%. Франция — скидка 33% при оплате в течение 15 дней. Германия — 25% при досрочной оплате. В ряде стран возможно обжалование в суде.' },
      { q: 'Что будет, если не оплатить штраф за границей?', a: 'Страны ЕС сотрудничают в принудительном взыскании штрафов согласно Директиве 2015/413/EU. Власти вашей страны могут быть привлечены к взысканию от имени другого государства ЕС.' },
      { q: 'Какой допустимый уровень алкоголя за рулём?', a: 'Лимиты: Германия и Франция — 0,5‰ (0,0‰ для начинающих); Литва — 0,4‰; Украина — 0,2‰; США — по штатам, как правило 0,8‰ (0,0‰ для коммерческих водителей). Всегда уточняйте местные правила.' },
      { q: 'Каковы штрафы за превышение скорости в России?', a: 'В России (2024): превышение до 20 км/ч — предупреждение или 500 ₽; 20–40 км/ч — 500–1 500 ₽; 40–60 км/ч — 1 000–2 500 ₽; 60–80 км/ч — 2 000–5 000 ₽; свыше 80 км/ч — 5 000 ₽ или лишение на 6 мес. Повторное нарушение — штрафы удваиваются.' },
      { q: 'Как работает балльная система в Германии (Bußgeldkatalog)?', a: 'В Германии применяется Flensburg-Punktesystem: нарушения оцениваются в 1–3 балла. При 4 баллах — предупреждение; 5 баллах — повторное предупреждение + семинар; 6 баллов — лишение прав. Баллы гасятся через 2,5–5 лет в зависимости от их количества.' },
      { q: 'Какие штрафы ПДД в Украине?', a: 'В Украине штрафы привязаны к НМДГ (17 грн): превышение на 20–50 км/ч — ~340–700 грн; нетрезвое вождение — от 3 400 грн + лишение прав; проезд на красный — ~340 грн; отсутствие страховки — 255–510 грн. Повторные нарушения — штрафы вырастают в 2–3 раза.' },
      { q: 'Можно ли лишиться прав за одно нарушение?', a: 'Да, в серьёзных случаях. Во всех странах предусмотрено немедленное лишение прав за: экстремальное превышение скорости (50+ км/ч), управление в состоянии опьянения, опасное вождение с причинением ущерба. Во Франции превышение на 50+ км/ч — немедленное лишение прав.' },
      { q: 'В чём разница между административным и уголовным нарушением ПДД?', a: 'Административные (незначительное превышение, телефон, парковка) — оплата фиксированного штрафа без суда. Уголовные (грубое превышение, нетрезвое вождение с ДТП, оставление места аварии) — судебное разбирательство, судимость, крупные штрафы или лишение свободы.' },
    ],
  },
  uk: {
    description: 'Оберіть країну та вид порушення, щоб дізнатися орієнтовний розмір штрафу, кількість штрафних балів та можливість позбавлення прав. Дані охоплюють Німеччину, Францію, Польщу, Литву, Україну, Росію та США.\n\nПравила дорожнього руху та розміри штрафів суттєво відрізняються між країнами. Порушення швидкісного режиму на 20 км/год, яке в Німеччині коштує €30, у Франції обійдеться у €135, а в деяких ситуаціях може спричинити кримінальну відповідальність.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як розраховуються штрафи за порушення ПДР?', a: 'Штрафи встановлюються національним законодавством і залежать від виду порушення, перевищення швидкості та рівня алкоголю. В одних країнах фіксовані штрафи, в інших — діапазон, що визначається судом.' },
      { q: 'Що таке штрафні бали?', a: 'Багато європейських країн використовують балову систему. Бали нараховуються за порушення. При досягненні максимуму — позбавлення прав. Зазвичай знімаються через 2–4 роки без порушень.' },
      { q: 'Чи можна зменшити розмір штрафу?', a: 'У більшості країн штраф, сплачений своєчасно, знижується на 25–50%. Франція — знижка 33% при оплаті протягом 15 днів. У деяких країнах можливе оскарження в суді.' },
      { q: 'Що буде, якщо не сплатити штраф за кордоном?', a: 'Країни ЄС співпрацюють у примусовому стягненні штрафів відповідно до Директиви 2015/413/EU. Влада вашої країни може бути залучена до стягнення від імені іншої держави ЄС.' },
      { q: 'Який допустимий рівень алкоголю за кермом?', a: 'Ліміти: Німеччина та Франція — 0,5‰; Литва — 0,4‰; Україна — 0,2‰; США — зазвичай 0,8‰. Завжди уточнюйте місцеві правила.' },
      { q: 'Які штрафи за перевищення швидкості в Україні?', a: 'В Україні штрафи прив\'язані до НМДГ (17 грн): перевищення на 20–50 км/год — ~340–700 грн; нетверезе водіння — від 3 400 грн + позбавлення прав; проїзд на червоне — ~340 грн; відсутність страховки — 255–510 грн. Повторні порушення — штрафи зростають у 2–3 рази.' },
      { q: 'Як працює система штрафів у Франції?', a: 'У Франції фіксований розклад штрафів (amende forfaitaire): перевищення на 1–20 км/год — €68–135; 21–30 км/год — €135; 31–40 км/год — €135 + 2 бали; понад 50 км/год — до €1 500 + 6 балів + позбавлення прав.' },
      { q: 'Як працює система Bußgeldkatalog у Німеччині?', a: 'Фіксований каталог штрафів: перевищення на 1–10 км/год — €30; 11–15 км/год — €50; 21–25 км/год у місті — €100 + 1 бал; понад 70 км/год — €700 + 3 бали + 3 місяці позбавлення прав. 8 балів за 2 роки = позбавлення прав.' },
      { q: 'Чи можна позбутися прав за одне порушення?', a: 'Так, у серйозних випадках. В усіх країнах передбачено негайне позбавлення прав за: екстремальне перевищення швидкості (50+ км/год), водіння у нетверезому стані, небезпечне водіння із завданням шкоди.' },
      { q: 'У чому різниця між адміністративним та кримінальним порушенням?', a: 'Адміністративні (незначне перевищення, телефон, паркування) — оплата фіксованого штрафу. Кримінальні (грубе перевищення, нетверезе водіння з ДТП, залишення місця аварії) — судовий розгляд, судимість, великі штрафи або ув\'язнення.' },
    ],
  },
  fr: {
    description: 'Sélectionnez votre pays et le type d\'infraction pour voir la fourchette d\'amendes, les points de pénalité et les risques de suspension de permis. Données pour l\'Allemagne, la France, la Pologne, la Lituanie, l\'Ukraine, la Russie et les États-Unis.\n\nLes règles de circulation varient considérablement entre pays. Un excès de vitesse de 20 km/h qui coûte 30 € en Allemagne peut coûter 135 € en France ou entraîner des poursuites pénales dans d\'autres situations.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment les amendes routières sont-elles calculées ?', a: 'Les amendes sont fixées par la loi et dépendent du type d\'infraction, de l\'excès de vitesse, du taux d\'alcool et des antécédents. Certains pays appliquent des amendes fixes, d\'autres des fourchettes décidées par un tribunal.' },
      { q: 'Que sont les points de pénalité ?', a: 'De nombreux pays européens utilisent un système de points. En France, le permis part avec 12 points. Chaque infraction en retire 1 à 6. Atteindre 0 = annulation du permis. Les points se récupèrent après 2 ans sans infraction (1 an pour les infraction mineures).' },
      { q: 'Peut-on réduire une amende ?', a: 'En France, payer dans les 15 jours réduit l\'amende forfaitaire de 33 %. Payer après 45 jours = majoration de 33 %. Un recours devant une juridiction de proximité est possible, mais risqué — l\'amende peut être alourdie.' },
      { q: 'Que se passe-t-il si j\'ignore une amende à l\'étranger ?', a: 'Les pays de l\'UE coopèrent pour recouvrer les amendes (directive 2015/413/UE). Votre pays peut être chargé de recouvrer l\'amende au nom d\'un autre État membre. Les véhicules peuvent aussi être saisis à la frontière.' },
      { q: 'Quel est le taux d\'alcoolémie légal ?', a: 'Limites : Allemagne et France 0,5‰ (0,2‰ pour les jeunes conducteurs en France) ; Lituanie 0,4‰ ; Ukraine 0,2‰ ; États-Unis généralement 0,8‰. Vérifiez toujours les règles locales.' },
      { q: 'Quelles sont les amendes types pour excès de vitesse en France ?', a: 'France 2024 : 1–20 km/h dépassé — €68 (minoré) à €135 ; 21–30 km/h — €135 + 2 pts ; 31–40 km/h — €135 + 3 pts ; 41–50 km/h — €135 + 4 pts ; 50+ km/h — jusqu\'à €1 500 + 6 pts + suspension immédiate possible.' },
      { q: 'Comment fonctionne le Bußgeldkatalog allemand ?', a: 'L\'Allemagne utilise un catalogue fixe d\'amendes : 1–10 km/h dépassé — €30 ; 11–15 km/h — €50 ; 21–25 km/h en agglomération — €100 + 1 pt ; 31–40 km/h — €160 + 2 pts ; 70+ km/h — €700 + 3 pts + 3 mois de suspension. 8 points en 2 ans = annulation.' },
      { q: 'Peut-on perdre son permis pour une seule infraction ?', a: 'Oui. Toutes les infractions graves entraînent une suspension immédiate : dépassement de 50+ km/h, conduite en état d\'ivresse grave, délit de fuite. En France, perdre 6 points en une seule infraction peut aussi approcher du seuil critique selon le solde de départ.' },
      { q: 'Quelle est la différence entre infraction administrative et pénale ?', a: 'Infraction administrative (excès de vitesse modéré, téléphone, stationnement) : amende forfaitaire, pas de procès. Infraction pénale (grand excès de vitesse, conduite en état d\'ivresse avec accident, délit de fuite) : comparution au tribunal, casier judiciaire possible, amendes lourdes voire emprisonnement.' },
      { q: 'Le malus écologique est-il lié aux amendes routières ?', a: 'Non — le malus écologique est une taxe sur l\'achat de véhicules polluants, sans lien avec les infractions. Les amendes routières relèvent du Code de la route. Cependant, une condamnation pour conduite dangereuse peut affecter votre prime d\'assurance auto via le coefficient bonus-malus.' },
    ],
  },
  lt: {
    description: 'Pasirinkite šalį ir pažeidimo tipą, kad pamatytumėte orientacinį baudos dydį, baudos taškus ir galimą vairuotojo teisių atėmimą. Duomenys apima Vokietiją, Prancūziją, Lenkiją, Lietuvą, Ukrainą, Rusiją ir JAV.\n\nEismo taisyklės ir baudų dydžiai labai skiriasi tarp šalių. Greičio viršijimas 20 km/h, kuris Vokietijoje kainuoja 30 €, Prancūzijoje gali kainuoti 135 €, o kai kuriais atvejais gali lemti baudžiamąją atsakomybę.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip apskaičiuojamos eismo baudos?', a: 'Baudos nustatomos nacionaliniais teisės aktais ir priklauso nuo pažeidimo tipo, greičio viršijimo, alkoholio kiekio ir ankstesnių pažeidimų. Kai kurios šalys taiko fiksuotas baudas, kitos — teismo nustatytus diapazonus.' },
      { q: 'Kas yra baudos taškai?', a: 'Daugelis Europos šalių naudoja baudų taškų sistemą. Lietuvoje: vairuotojo pažymėjime kaupiami taškai (maks. 20). Surinkus 20 taškų — teisių atėmimas. Taškai nurašomi po 3 metų be pažeidimų.' },
      { q: 'Ar galima sumažinti baudą?', a: 'Daugelyje šalių laiku sumokėta bauda sumažinama 25–50 %. Prancūzijoje — 33 % nuolaida mokant per 15 dienų. Kai kuriose šalyse galima apskųsti teisme.' },
      { q: 'Kas nutiks, jei neapmokėsiu baudos užsienyje?', a: 'ES šalys bendradarbiauja pagal Direktyvą 2015/413/ES — jūsų šalies institucija gali būti paprašyta išieškoti baudą kitos valstybės vardu.' },
      { q: 'Koks yra leistinas alkoholio kiekis kraujyje?', a: 'Ribos: Vokietija ir Prancūzija — 0,5‰; Lietuva — 0,4‰ (0,0‰ pradedantiesiems); Ukraina — 0,2‰; JAV — paprastai 0,8‰. Visada tikrinkite vietos taisykles.' },
      { q: 'Kokios baudos už greičio viršijimą Lietuvoje?', a: 'Lietuva (2024): 10–20 km/h viršijimas — 60–100 €; 21–30 km/h — 100–300 € + 1 taškas; 31–50 km/h — 300–400 € + 2 taškai; virš 50 km/h — 400–600 € + teisių atėmimas. Girto vairavimo bauda — nuo 500 € + teisių atėmimas.' },
      { q: 'Kaip veikia Vokietijos Bußgeldkatalog sistema?', a: 'Fiksuotas baudų katalogas: 1–10 km/h viršijimas — 30 €; 11–15 km/h — 50 €; 21–25 km/h gyvenamojoje vietovėje — 100 € + 1 taškas; virš 70 km/h — 700 € + 3 taškai + 3 mėn. teisių atėmimas. 8 taškai per 2 metus = teisių atėmimas.' },
      { q: 'Ar galima netekti teisių dėl vieno pažeidimo?', a: 'Taip, rimtais atvejais. Visose šalyse numatytas neatidėliotinas teisių atėmimas už: ekstremalų greičio viršijimą (50+ km/h), girto vairavimą, pavojingą vairavimą, sukėlusį žalą. Lietuvoje surinkus 20 taškų — automatinis teisių atėmimas.' },
      { q: 'Koks skirtumas tarp administracinio ir baudžiamojo eismo pažeidimo?', a: 'Administraciniai (nedidelis greičio viršijimas, telefonas, stovėjimas) — fiksuota bauda, be teismo proceso. Baudžiamieji (didelis greičio viršijimas, girtas vairavimas su avarija, pabėgimas iš įvykio vietos) — teisminis procesas, teistumas, didelės baudos ar įkalinimas.' },
      { q: 'Ar Lietuvos vairuotojai baudžiami už pažeidimus ES šalyse?', a: 'Taip. ES taikoma baudų vykdymo sistema (Direktyva 2015/413/ES): baudos, skirtos Lietuvos registruotiems automobiliams ES, siunčiamos į Lietuvos institucijas išieškojimui. Neapmokėtos baudos gali sukelti papildomas sankcijas.' },
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
        <TrafficFineCalculator locale={locale} />
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
