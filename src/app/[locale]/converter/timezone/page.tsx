import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import TimezoneConverter from './TimezoneConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/date-diff', label: 'Date Difference Calculator' },
    { href: '/calculator/age', label: 'Age Calculator' },
    { href: '/tools/countdown', label: 'Countdown Timer' },
  ],
  ru: [
    { href: '/calculator/date-diff', label: 'Калькулятор разницы дат' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
    { href: '/tools/countdown', label: 'Таймер обратного отсчёта' },
  ],
  uk: [
    { href: '/calculator/date-diff', label: 'Калькулятор різниці дат' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
    { href: '/tools/countdown', label: 'Таймер зворотного відліку' },
  ],
  fr: [
    { href: '/calculator/date-diff', label: 'Calculatrice de différence de dates' },
    { href: '/calculator/age', label: 'Calculatrice d\'âge' },
    { href: '/tools/countdown', label: 'Compte à rebours' },
  ],
  lt: [
    { href: '/calculator/date-diff', label: 'Datų skirtumo skaičiuotuvas' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
    { href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' },
  ],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Timezone Converter — World Clock Online',
    description: 'Free timezone converter. Select a date, time, and source timezone to instantly see the same moment across 50+ major world cities and time zones.',
    h1: 'Timezone Converter',
  },
  ru: {
    title: 'Конвертер часовых поясов — мировые часы онлайн',
    description: 'Бесплатный конвертер часовых поясов. Выберите дату, время и исходный часовой пояс, чтобы мгновенно увидеть тот же момент в 50+ городахх мира.',
    h1: 'Конвертер часовых поясов',
  },
  uk: {
    title: 'Конвертер часових поясів — світовий годинник онлайн',
    description: 'Безкоштовний конвертер часових поясів. Виберіть дату, час та вихідний часовий пояс, щоб миттєво побачити той самий момент у 50+ містах світу.',
    h1: 'Конвертер часових поясів',
  },
  fr: {
    title: 'Convertisseur de fuseaux horaires — horloge mondiale',
    description: 'Convertisseur de fuseaux horaires gratuit. Sélectionnez une date, une heure et un fuseau source pour voir instantanément le même moment dans 50+ grandes villes du monde.',
    h1: 'Convertisseur de fuseaux horaires',
  },
  lt: {
    title: 'Laiko juostų keitiklis — pasaulio laikrodis internete',
    description: 'Nemokamas laiko juostų keitiklis. Pasirinkite datą, laiką ir šaltinio laiko juostą, kad akimirksniu pamatytumėte tą patį momentą 50+ pasaulio miestuose.',
    h1: 'Laiko juostų keitiklis',
  },
};

const CONTENT: Record<string, {
  description: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}> = {
  en: {
    description: 'Our timezone converter shows the same point in time across 50+ major world cities instantly. Pick any date and time, select your source timezone, and the tool automatically displays the equivalent local time for every city in the list — including the UTC offset for each zone.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How does the timezone converter work?',
        a: 'The converter takes your chosen date and time, interprets it in the selected source timezone, then converts that exact UTC moment to local time in all 50+ listed cities. Conversion uses the browser\'s built-in Intl.DateTimeFormat API, which respects daylight saving time (DST) automatically.',
      },
      {
        q: 'Does it account for daylight saving time?',
        a: 'Yes. Daylight saving time is handled automatically by the Intl API. The UTC offset shown next to each city reflects the actual offset on the selected date — so UTC+1 in winter and UTC+2 in summer for Central European Time, for example.',
      },
      {
        q: 'What is UTC?',
        a: 'UTC (Coordinated Universal Time) is the world\'s primary time standard. All other timezones are defined as an offset from UTC. UTC does not observe daylight saving time, making it a stable reference for international scheduling.',
      },
      {
        q: 'Why might a meeting scheduled at "9 AM EST" be confusing?',
        a: 'Timezone abbreviations like EST can be ambiguous — EST means UTC−5 in North America, but different abbreviations overlap across the world. It is always safer to specify a full timezone name (e.g., "America/New_York") or state the UTC offset explicitly.',
      },
    ],
  },
  ru: {
    description: 'Конвертер часовых поясов мгновенно показывает один и тот же момент времени в 50+ крупных городах мира. Выберите дату, время и исходный часовой пояс — инструмент автоматически отобразит местное время для каждого города, включая смещение UTC.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      {
        q: 'Как работает конвертер часовых поясов?',
        a: 'Конвертер берёт выбранные дату и время, интерпретирует их в исходном часовом поясе, затем преобразует этот момент UTC в местное время для всех 50+ городов. Конвертация использует встроенный браузерный API Intl.DateTimeFormat, который автоматически учитывает переход на летнее время.',
      },
      {
        q: 'Учитывается ли переход на летнее время?',
        a: 'Да. Переход на летнее время обрабатывается автоматически через Intl API. Смещение UTC рядом с каждым городом отражает фактическое смещение на выбранную дату — например, UTC+1 зимой и UTC+2 летом для Центральной Европы.',
      },
      {
        q: 'Что такое UTC?',
        a: 'UTC (всемирное координированное время) — главный мировой стандарт времени. Все часовые пояса определяются как смещение от UTC. UTC не переходит на летнее время, что делает его стабильным ориентиром для международного планирования.',
      },
      {
        q: 'Почему сокращения часовых поясов могут быть неоднозначными?',
        a: 'Сокращения часовых поясов, например EST, могут быть неточными — EST означает UTC−5 в Северной Америке, но похожие аббревиатуры используются по всему миру. Лучше указывать полное название часового пояса (например, "America/New_York") или явно указывать смещение UTC.',
      },
    ],
  },
  uk: {
    description: 'Конвертер часових поясів миттєво показує один і той самий момент часу в 50+ великих містах світу. Виберіть дату, час та вихідний часовий пояс — інструмент автоматично відобразить місцевий час для кожного міста, включаючи зміщення UTC.',
    faqTitle: 'Часті запитання',
    faqs: [
      {
        q: 'Як працює конвертер часових поясів?',
        a: 'Конвертер бере обрані дату та час, інтерпретує їх у вихідному часовому поясі, потім перетворює цей момент UTC у місцевий час для всіх 50+ міст. Конвертація використовує вбудований браузерний API Intl.DateTimeFormat, який автоматично враховує перехід на літній час.',
      },
      {
        q: 'Чи враховується перехід на літній час?',
        a: 'Так. Перехід на літній час обробляється автоматично через Intl API. Зміщення UTC поруч із кожним містом відображає фактичне зміщення на обрану дату — наприклад, UTC+1 взимку та UTC+2 влітку для Центральної Європи.',
      },
      {
        q: 'Що таке UTC?',
        a: 'UTC (всесвітній координований час) — головний світовий стандарт часу. Всі часові пояси визначаються як зміщення від UTC. UTC не переходить на літній час, що робить його стабільним орієнтиром для міжнародного планування.',
      },
      {
        q: 'Чому скорочення часових поясів можуть бути неоднозначними?',
        a: 'Скорочення часових поясів, наприклад EST, можуть бути неточними — EST означає UTC−5 у Північній Америці, але схожі абревіатури використовуються по всьому світу. Краще вказувати повну назву часового поясу (наприклад, "America/New_York") або явно вказувати зміщення UTC.',
      },
    ],
  },
  fr: {
    description: 'Notre convertisseur de fuseaux horaires affiche instantanément le même moment dans 50+ grandes villes du monde. Choisissez une date et une heure, sélectionnez votre fuseau source, et l\'outil affiche automatiquement l\'heure locale équivalente pour chaque ville, avec le décalage UTC.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment fonctionne le convertisseur de fuseaux horaires ?',
        a: 'Le convertisseur prend la date et l\'heure choisies, les interprète dans le fuseau horaire source, puis convertit ce moment UTC exact en heure locale pour les 50+ villes listées. La conversion utilise l\'API Intl.DateTimeFormat du navigateur, qui gère automatiquement l\'heure d\'été.',
      },
      {
        q: 'Prend-il en compte l\'heure d\'été ?',
        a: 'Oui. L\'heure d\'été est gérée automatiquement par l\'API Intl. Le décalage UTC affiché pour chaque ville reflète le décalage réel à la date sélectionnée — par exemple UTC+1 en hiver et UTC+2 en été pour l\'heure d\'Europe centrale.',
      },
      {
        q: 'Qu\'est-ce que l\'UTC ?',
        a: 'L\'UTC (Temps Universel Coordonné) est le principal standard horaire mondial. Tous les fuseaux horaires sont définis comme un décalage par rapport à l\'UTC. L\'UTC n\'observe pas l\'heure d\'été, ce qui en fait une référence stable pour la planification internationale.',
      },
      {
        q: 'Pourquoi les abréviations de fuseaux horaires peuvent-elles prêter à confusion ?',
        a: 'Les abréviations comme EST peuvent être ambiguës — EST signifie UTC−5 en Amérique du Nord, mais des abréviations similaires existent dans le monde entier. Il est préférable de préciser le nom complet du fuseau (p. ex. "America/New_York") ou d\'indiquer explicitement le décalage UTC.',
      },
    ],
  },
  lt: {
    description: 'Mūsų laiko juostų keitiklis akimirksniu rodo tą patį laiko momentą 25 didžiuosiuose pasaulio miestuose. Pasirinkite datą, laiką ir šaltinio laiko juostą — įrankis automatiškai rodo atitinkamą vietos laiką kiekvienam miestui su UTC poslinkiu.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      {
        q: 'Kaip veikia laiko juostų keitiklis?',
        a: 'Keitiklis paima pasirinktą datą ir laiką, interpretuoja juos pasirinktoje šaltinio laiko juostoje, tada konvertuoja tą tikslų UTC momentą į vietos laiką visoms 50+ išvardytiems miestams. Konvertacija naudoja naršyklės integruotą Intl.DateTimeFormat API, kuris automatiškai atsižvelgia į vasaros laiką.',
      },
      {
        q: 'Ar atsižvelgiama į vasaros laiką?',
        a: 'Taip. Vasaros laikas tvarkomas automatiškai per Intl API. UTC poslinkis šalia kiekvieno miesto atspindi faktinį poslinkį pasirinktą datą — pavyzdžiui, UTC+1 žiemą ir UTC+2 vasarą Vidurio Europos laikui.',
      },
      {
        q: 'Kas yra UTC?',
        a: 'UTC (koordinuotasis universalusis laikas) yra pagrindinis pasaulio laiko standartas. Visos laiko juostos apibrėžiamos kaip poslinkis nuo UTC. UTC nepereina į vasaros laiką, todėl yra stabili tarptautinio planavimo nuoroda.',
      },
      {
        q: 'Kodėl laiko juostų santrumpos gali kelti painiavą?',
        a: 'Laiko juostų santrumpos, pvz., EST, gali būti dviprasmiškos — EST reiškia UTC−5 Šiaurės Amerikoje, tačiau panašios santrumpos naudojamos visame pasaulyje. Visada geriau nurodyti visą laiko juostos pavadinimą (pvz., "America/New_York") arba aiškiai nurodyti UTC poslinkį.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(locale, '/converter/timezone'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TimezonePage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/timezone`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <TimezoneConverter locale={locale} />

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
