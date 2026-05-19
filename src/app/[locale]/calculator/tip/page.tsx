import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import TipCalculator from './TipCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/vat', label: 'VAT Calculator' }, { href: '/calculator/roi', label: 'ROI Calculator' }],
  ru: [{ href: '/calculator/vat', label: 'Калькулятор НДС' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }],
  uk: [{ href: '/calculator/vat', label: 'Калькулятор ПДВ' }, { href: '/calculator/roi', label: 'Калькулятор ROI' }],
  fr: [{ href: '/calculator/vat', label: 'Calculatrice TVA' }, { href: '/calculator/roi', label: 'Calculatrice ROI' }],
  lt: [{ href: '/calculator/vat', label: 'PVM skaičiuotuvas' }, { href: '/calculator/roi', label: 'RI skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Tip Calculator — Calculate Tip and Split the Bill', description: 'Free tip calculator. Calculate the tip amount for any bill, choose a percentage, and split the total between any number of people instantly.', h1: 'Tip Calculator' },
  ru: { title: 'Калькулятор чаевых — рассчитать чаевые и разделить счёт', description: 'Бесплатный калькулятор чаевых. Рассчитайте сумму чаевых для любого счёта, выберите процент и разделите итог между нужным количеством людей.', h1: 'Калькулятор чаевых' },
  uk: { title: 'Калькулятор чайових — розрахувати чайові та розділити рахунок', description: 'Безкоштовний калькулятор чайових. Розрахуйте суму чайових для будь-якого рахунку та розділіть підсумок між потрібною кількістю людей.', h1: 'Калькулятор чайових' },
  fr: { title: 'Calculatrice de pourboire — Calculer le pourboire et partager l\'addition', description: 'Calculatrice de pourboire gratuite. Calculez le montant du pourboire pour n\'importe quelle addition et répartissez le total entre plusieurs personnes.', h1: 'Calculatrice de pourboire' },
  lt: { title: 'Arbatpinigių Skaičiuotuvas — Apskaičiuoti arbatpinigius ir padalinti sąskaitą', description: 'Nemokamas arbatpinigių skaičiuotuvas. Apskaičiuokite arbatpinigių sumą bet kuriai sąskaitai ir padalinkite bendrą sumą tarp kelių žmonių.', h1: 'Arbatpinigių skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Enter the bill amount, select or type a tip percentage, and optionally split the total between multiple people. Quick-select buttons for the most common tip percentages (10%, 15%, 18%, 20%, 25%) make it easy to calculate in seconds. The calculator shows the tip amount, total bill, and the amount per person.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much should I tip at a restaurant?', a: 'In the US, 15–20% is standard for table service at restaurants. 18–20% is typical for good service, 25%+ for exceptional service, and 10–15% if service was poor. In Europe, tipping is less expected — rounding up or 5–10% is common. In Japan and some Asian countries, tipping is not customary.' },
      { q: 'How do you calculate a 20% tip?', a: 'Multiply the bill by 0.20. For example, a $45 bill: $45 × 0.20 = $9 tip, total = $54. A quick mental trick: find 10% (move the decimal one place left), then double it. For $45: 10% = $4.50, × 2 = $9.' },
      { q: 'Should you tip on the pre-tax or post-tax amount?', a: 'Convention varies. In the US, tipping on the pre-tax (subtotal) amount is technically correct, but tipping on the total including tax is also common and results in a slightly higher tip. The difference is small — on a $50 bill with 8% tax, it\'s about $0.80.' },
      { q: 'How do you split a bill evenly?', a: 'Enter the bill amount, set your tip percentage, and enter the number of people. The calculator divides the total (bill + tip) equally. For example, $100 bill + 20% tip = $120 total, split between 4 people = $30 each.' },
      { q: 'What tip is standard for delivery?', a: 'For food delivery, 10–20% of the order total is standard, with a minimum of $3–5 for small orders regardless of percentage. For grocery or other delivery services, $3–5 per trip is typical.' },
    ],
  },
  ru: {
    description: 'Введите сумму счёта, выберите или введите процент чаевых и при необходимости разделите итог на нескольких человек. Кнопки быстрого выбора для самых распространённых значений (10%, 15%, 18%, 20%, 25%) позволяют рассчитать за секунды. Калькулятор показывает сумму чаевых, итоговый счёт и долю каждого.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Сколько принято давать чаевых в ресторане?', a: 'В США стандарт — 15–20% за обслуживание за столом. В Европе чаевые менее обязательны — обычно округляют счёт или оставляют 5–10%. В Японии и ряде азиатских стран чаевые не приняты совсем.' },
      { q: 'Как быстро посчитать 20% чаевых в уме?', a: 'Найдите 10% (перенесите запятую влево), затем удвойте. Например, счёт 45$: 10% = 4,50$, × 2 = 9$. Итого с чаевыми: 54$.' },
      { q: 'С какой суммы считать чаевые — до налога или после?', a: 'По правилам считают от суммы до налога, но на практике в США часто считают от итоговой суммы. Разница незначительная — при счёте 50$ и налоге 8% это около 0,80$.' },
      { q: 'Как разделить счёт поровну?', a: 'Введите сумму счёта, выберите процент чаевых и укажите количество человек. Калькулятор разделит итог (счёт + чаевые) поровну. Например: счёт 100$ + 20% = 120$, на 4 человека = 30$ с каждого.' },
      { q: 'Какие чаевые стандартны для доставки?', a: 'При доставке еды стандарт — 10–20% от суммы заказа, но не менее 3–5$ при небольших заказах.' },
    ],
  },
  uk: {
    description: 'Введіть суму рахунку, оберіть або введіть відсоток чайових і за потреби розділіть підсумок між кількома людьми. Кнопки швидкого вибору для найпоширеніших значень (10%, 15%, 18%, 20%, 25%) дозволяють розрахувати за секунди.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Скільки прийнято залишати чайових у ресторані?', a: 'У США стандарт — 15–20% за обслуговування. У Європі чайові менш обов\'язкові — зазвичай округлюють рахунок або залишають 5–10%. В Японії чайові не прийняті.' },
      { q: 'Як швидко порахувати 20% чайових?', a: 'Знайдіть 10% (перенесіть кому вліво), потім подвойте. Наприклад, рахунок 45$: 10% = 4,50$, × 2 = 9$. Разом із чайовими: 54$.' },
      { q: 'Від якої суми рахувати чайові — до податку чи після?', a: 'За правилами — від суми до податку, але на практиці в США часто рахують від підсумкової суми. Різниця незначна.' },
      { q: 'Як розділити рахунок порівну?', a: 'Введіть суму рахунку, відсоток чайових і кількість людей. Калькулятор розділить підсумок (рахунок + чайові) порівну.' },
      { q: 'Які чайові стандартні для доставки?', a: 'При доставці їжі стандарт — 10–20% від суми замовлення, але не менше 100–150 грн при невеликих замовленнях.' },
    ],
  },
  fr: {
    description: 'Entrez le montant de l\'addition, sélectionnez ou tapez un pourcentage de pourboire, et divisez optionnellement le total entre plusieurs personnes. Les boutons de sélection rapide pour les pourcentages courants (10%, 15%, 18%, 20%, 25%) permettent de calculer en quelques secondes.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Quel pourboire laisser au restaurant ?', a: 'En France, le service (15%) est légalement inclus dans l\'addition. Un pourboire supplémentaire n\'est pas obligatoire mais apprécié — arrondir l\'addition ou laisser 5–10% est courant pour un bon service. Aux États-Unis, 15–20% est la norme.' },
      { q: 'Comment calculer 20% de pourboire mentalement ?', a: 'Trouvez 10% (déplacez la virgule d\'un rang vers la gauche) et doublez. Par exemple, addition de 45€ : 10% = 4,50€, × 2 = 9€. Total avec pourboire = 54€.' },
      { q: 'Le pourboire se calcule-t-il sur le montant HT ou TTC ?', a: 'En pratique, le pourboire se calcule généralement sur le montant TTC affiché sur l\'addition. La différence avec le montant HT est minime.' },
      { q: 'Comment partager l\'addition équitablement ?', a: 'Entrez le montant, le pourcentage de pourboire et le nombre de personnes. La calculatrice divise le total (addition + pourboire) également. Exemple : 100€ + 20% = 120€ ÷ 4 = 30€ par personne.' },
      { q: 'Quel pourboire pour la livraison ?', a: 'Pour la livraison de repas, 10–15% du total de la commande est courant, avec un minimum de 2–3€ pour les petites commandes.' },
    ],
  },
  lt: {
    description: 'Įveskite sąskaitos sumą, pasirinkite arba įveskite arbatpinigių procentą ir neprivaloma padalinkite sumą tarp kelių žmonių. Greito pasirinkimo mygtukai dažniausioms reikšmėms (10%, 15%, 18%, 20%, 25%) leidžia apskaičiuoti per kelias sekundes.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kiek arbatpinigių palikti restorane?', a: 'JAV standartas — 15–20% už aptarnavimą. Europoje arbatpinigiai nėra privalomi — dažniausiai apvalinama sąskaita arba paliekama 5–10%. Japonijoje arbatpinigiai nepriimtini.' },
      { q: 'Kaip greitai apskaičiuoti 20% arbatpinigius?', a: 'Raskite 10% (perkelkite kablelį į kairę) ir padvigubinkite. Pavyzdžiui, 45€ sąskaita: 10% = 4,50€, × 2 = 9€. Viso su arbatpinigiais: 54€.' },
      { q: 'Ar arbatpinigiai skaičiuojami nuo sumos be PVM ar su PVM?', a: 'Praktikoje arbatpinigiai paprastai skaičiuojami nuo galutinės sąskaitos sumos. Skirtumas yra minimalus.' },
      { q: 'Kaip padalinti sąskaitą lygiomis dalimis?', a: 'Įveskite sąskaitos sumą, arbatpinigių procentą ir žmonių skaičių. Skaičiuotuvas padalins bendrą sumą (sąskaita + arbatpinigiai) lygiomis dalimis.' },
      { q: 'Kokie arbatpinigiai priimti pristatymui?', a: 'Maisto pristatymui standartas — 10–15% nuo užsakymo sumos, bet ne mažiau kaip 2–3€ mažiems užsakymams.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => { alternates[l] = `https://utilixi.com/${l}/calculator/tip`; });
  return { title: meta.title, description: meta.description, alternates: { languages: alternates } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TipPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/tip`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <TipCalculator locale={locale} />
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
