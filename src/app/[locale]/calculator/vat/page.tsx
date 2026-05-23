import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import VatCalculator from './VatCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/roi', label: 'ROI Calculator' }, { href: '/calculator/compound-interest', label: 'Compound Interest' }],
  ru: [{ href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/compound-interest', label: 'Сложные проценты' }],
  uk: [{ href: '/calculator/roi', label: 'Калькулятор ROI' }, { href: '/calculator/compound-interest', label: 'Складні відсотки' }],
  fr: [{ href: '/calculator/roi', label: 'Calculatrice ROI' }, { href: '/calculator/compound-interest', label: 'Intérêts composés' }],
  lt: [{ href: '/calculator/roi', label: 'RI skaičiuotuvas' }, { href: '/calculator/compound-interest', label: 'Sudėtinės palūkanos' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'VAT Calculator — Add or Extract VAT Online', description: 'Free VAT calculator. Add VAT to a price or extract VAT from a gross amount. Supports 20+ countries with preset rates.', h1: 'VAT Calculator' },
  ru: { title: 'Калькулятор НДС — рассчитать НДС онлайн', description: 'Бесплатный калькулятор НДС. Добавьте НДС к сумме или выделите НДС из суммы с НДС. Поддержка 20+ стран.', h1: 'Калькулятор НДС' },
  uk: { title: 'Калькулятор ПДВ — розрахувати ПДВ онлайн', description: 'Безкоштовний калькулятор ПДВ. Додайте ПДВ до суми або виділіть ПДВ із суми з ПДВ. Підтримка 20+ країн.', h1: 'Калькулятор ПДВ' },
  fr: { title: 'Calculatrice TVA — Calculer la TVA en ligne', description: 'Calculatrice TVA gratuite. Ajoutez la TVA à un prix HT ou extrayez la TVA d\'un montant TTC. Plus de 20 pays supportés.', h1: 'Calculatrice TVA' },
  lt: { title: 'PVM Skaičiuotuvas — Skaičiuoti PVM internetu', description: 'Nemokamas PVM skaičiuotuvas. Pridėkite PVM prie sumos arba išskirkite PVM iš bendros sumos. Palaikomos 20+ šalių.', h1: 'PVM skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This VAT calculator works in two modes: "Add VAT" calculates the gross price from a net amount, and "Extract VAT" separates the VAT portion from a gross price. Select your country to automatically load the standard VAT rate, or enter a custom rate for reduced rates or other tax types.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How to add VAT to a price?', a: 'Switch to "Add VAT" mode, enter the net (excl. VAT) amount and select your country. The calculator shows the VAT amount and the total gross price. Formula: Gross = Net × (1 + VAT rate).' },
      { q: 'How to extract VAT from a gross price?', a: 'Switch to "Extract VAT" mode and enter the gross (incl. VAT) amount. The calculator calculates the net price and the VAT portion. Formula: Net = Gross / (1 + VAT rate).' },
      { q: 'What is the difference between HT and TTC (excl. vs incl. VAT)?', a: 'Excl. VAT (HT in French, net) is the price before tax is added. Incl. VAT (TTC, gross) is the final price the customer pays. The difference between them is the VAT amount.' },
      { q: 'What is the standard VAT rate in the EU?', a: 'EU VAT rates vary by country: France 20%, Germany 19%, Italy 22%, Spain 21%, Poland 23%, Lithuania/Latvia 21%, Estonia 22%, Sweden/Denmark/Norway 25%. Switzerland (not EU) has a reduced rate of 8.1%.' },
      { q: 'Can I use a custom VAT rate?', a: 'Yes. The "Custom rate" field lets you enter any rate, including reduced rates (e.g., 5% for certain goods in some countries) or zero-rated transactions. The custom rate overrides the country preset.' },
    ],
  },
  ru: {
    description: 'Калькулятор работает в двух режимах: «Добавить НДС» рассчитывает сумму с НДС из суммы без НДС, а «Выделить НДС» разбивает сумму с НДС на чистую сумму и НДС. Выберите страну для автоматической загрузки ставки или введите свою.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Как начислить НДС на сумму?', a: 'Выберите режим «Добавить НДС», введите сумму без НДС и выберите страну. Калькулятор покажет сумму НДС и итоговую сумму с НДС. Формула: Сумма с НДС = Сумма без НДС × (1 + ставка НДС).' },
      { q: 'Как выделить НДС из суммы?', a: 'Выберите режим «Выделить НДС» и введите сумму с НДС. Калькулятор рассчитает сумму без НДС и отдельно сумму НДС. Формула: Без НДС = С НДС / (1 + ставка НДС).' },
      { q: 'Чему равна ставка НДС в России и Украине?', a: 'В России стандартная ставка НДС составляет 20%, в Украине — 20%, в Беларуси — 20%, в Казахстане — 12%.' },
      { q: 'Что такое НДС?', a: 'НДС (налог на добавленную стоимость) — косвенный налог, включённый в цену товара или услуги. Конечный потребитель платит цену с НДС, а продавец перечисляет налог государству.' },
      { q: 'Можно ли использовать свою ставку?', a: 'Да. Поле «Своя ставка» позволяет ввести любой процент, включая льготные ставки (например, 10% для ряда товаров в России). Своя ставка заменяет пресет выбранной страны.' },
    ],
  },
  uk: {
    description: 'Калькулятор ПДВ працює в двох режимах: «Додати ПДВ» розраховує суму з ПДВ із суми без ПДВ, а «Виділити ПДВ» розбиває суму з ПДВ на чисту суму і ПДВ. Оберіть країну для автоматичного завантаження ставки або введіть свою.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Як нарахувати ПДВ на суму?', a: 'Оберіть режим «Додати ПДВ», введіть суму без ПДВ і виберіть країну. Калькулятор покаже суму ПДВ і підсумкову суму з ПДВ. Формула: З ПДВ = Без ПДВ × (1 + ставка ПДВ).' },
      { q: 'Як виділити ПДВ із суми?', a: 'Оберіть режим «Виділити ПДВ» і введіть суму з ПДВ. Калькулятор розрахує суму без ПДВ і окремо суму ПДВ. Формула: Без ПДВ = З ПДВ / (1 + ставка ПДВ).' },
      { q: 'Яка ставка ПДВ в Україні?', a: 'В Україні стандартна ставка ПДВ становить 20%. Пільгова ставка 7% застосовується до деяких видів медичних товарів та лікарських засобів.' },
      { q: 'Що таке ПДВ?', a: 'ПДВ (податок на додану вартість) — непрямий податок, включений у ціну товару або послуги. Кінцевий споживач сплачує ціну з ПДВ, а продавець перераховує податок до державного бюджету.' },
      { q: 'Чи можна використовувати власну ставку?', a: 'Так. Поле «Своя ставка» дозволяє ввести будь-який відсоток, включаючи пільгові ставки. Власна ставка замінює пресет обраної країни.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice TVA fonctionne dans deux modes : « Ajouter TVA » calcule le prix TTC à partir d\'un montant HT, et « Extraire TVA » sépare la part de TVA d\'un prix TTC. Sélectionnez votre pays pour charger automatiquement le taux standard, ou entrez un taux personnalisé.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment ajouter la TVA à un prix HT ?', a: 'Sélectionnez le mode « Ajouter TVA », entrez le montant HT et choisissez votre pays. La calculatrice affiche le montant de TVA et le prix TTC. Formule : TTC = HT × (1 + taux TVA).' },
      { q: 'Comment extraire la TVA d\'un prix TTC ?', a: 'Sélectionnez le mode « Extraire TVA » et entrez le montant TTC. La calculatrice calcule le prix HT et la part de TVA. Formule : HT = TTC / (1 + taux TVA).' },
      { q: 'Quel est le taux de TVA en France ?', a: 'Le taux normal de TVA en France est de 20%. Les taux réduits sont 10% (restauration, hôtellerie) et 5.5% (produits alimentaires, énergie). Le taux super-réduit de 2.1% s\'applique à certains médicaments.' },
      { q: 'Quelle est la différence entre HT et TTC ?', a: 'HT (Hors Taxes) est le prix avant application de la TVA. TTC (Toutes Taxes Comprises) est le prix final payé par le consommateur. La différence entre les deux est le montant de la TVA.' },
      { q: 'Puis-je utiliser un taux personnalisé ?', a: 'Oui. Le champ « Taux personnalisé » vous permet de saisir n\'importe quel taux, y compris les taux réduits ou les taux d\'autres pays. Le taux personnalisé remplace le taux préréglé du pays sélectionné.' },
    ],
  },
  lt: {
    description: 'Šis PVM skaičiuotuvas veikia dviem režimais: „Pridėti PVM" apskaičiuoja kainą su PVM iš kainos be PVM, o „Išskirti PVM" atskiria PVM dalį nuo bendros sumos. Pasirinkite šalį automatiškai įkelti standartinį tarifą arba įveskite savo.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kaip pridėti PVM prie sumos?', a: 'Pasirinkite režimą „Pridėti PVM", įveskite sumą be PVM ir pasirinkite šalį. Skaičiuotuvas parodys PVM sumą ir galutinę sumą su PVM. Formulė: Su PVM = Be PVM × (1 + PVM tarifas).' },
      { q: 'Kaip išskirti PVM iš sumos?', a: 'Pasirinkite režimą „Išskirti PVM" ir įveskite sumą su PVM. Skaičiuotuvas apskaičiuos sumą be PVM ir PVM dalį. Formulė: Be PVM = Su PVM / (1 + PVM tarifas).' },
      { q: 'Koks PVM tarifas Lietuvoje?', a: 'Standartinis PVM tarifas Lietuvoje yra 21%. Lengvatiniai tarifai: 9% (knygoms, periodiniams leidiniams, viešbučiams, keleivių vežimui) ir 5% (vaistams, medicinos prietaisams).' },
      { q: 'Kas yra PVM?', a: 'PVM (pridėtinės vertės mokestis) — netiesioginis mokestis, įtrauktas į prekės ar paslaugos kainą. Galutinis vartotojas moka kainą su PVM, o pardavėjas perveda mokestį valstybei.' },
      { q: 'Ar galima naudoti savo tarifą?', a: 'Taip. Laukelis „Pasirinktinis tarifas" leidžia įvesti bet kokį procentą, įskaitant lengvatinius tarifus. Pasirinktinis tarifas pakeičia pasirinktos šalies išankstinę reikšmę.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/vat') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VatPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://www.utilixi.com/${locale}/calculator/vat`,
    applicationCategory: 'FinanceApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <VatCalculator locale={locale} />
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
