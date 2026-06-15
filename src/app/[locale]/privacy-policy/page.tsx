import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

type Section = { heading: string; body: string | string[] };

type LocaleContent = {
  title: string;
  description: string;
  h1: string;
  sections: Section[];
};


const CONTENT: Record<string, LocaleContent> = {
  en: {
    title: 'Privacy Policy',
    description: 'Utilixi privacy policy — how we handle your data.',
    h1: 'Privacy Policy',
    sections: [
      {
        heading: '1. Introduction',
        body: 'This Privacy Policy explains how Utilixi collects, uses, and safeguards information when you visit utilixi.com. We are committed to protecting your privacy.',
      },
      {
        heading: '2. Information we collect',
        body: [
          'Calculator inputs: All calculations are performed locally in your browser. We do not collect, transmit, or store any data you enter into our calculators.',
          'Contact form: When you submit the contact form, we collect your name, email address, and message content solely to respond to your inquiry.',
          'Google Analytics: We use Google Analytics to collect anonymised usage statistics (page views, session duration, browser type) to improve the service. This data does not identify individual users.',
          'Yandex Metrica: We use Yandex Metrica (loaded with a deferred strategy) to record anonymised sessions — mouse movements, clicks, and scroll depth (Webvisor) — to improve usability. Session recordings do not include personally identifiable information.',
          'Vercel Analytics & Speed Insights: We use Vercel\'s built-in analytics and performance monitoring to collect anonymised traffic statistics and Core Web Vitals metrics. No personal data is collected.',
        ],
      },
      {
        heading: '3. Cookies',
        body: 'We use cookies only for essential site functionality and anonymized analytics. We do not use cookies for advertising or tracking purposes. You can disable cookies in your browser settings.',
      },
      {
        heading: '4. Local storage and preferences',
        body: 'We use your browser\'s localStorage to save your preferences between sessions — for example, your favourite tools list, preferred unit system (metric or imperial), currency and cryptocurrency pair selections, and country or region settings. This data is stored entirely on your device and is never sent to our servers. You can delete it at any time by clearing your browser\'s site data in your browser settings.',
      },
      {
        heading: '5. Google AdSense',
        body: 'We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings.',
      },
      {
        heading: '6. Third-party services',
        body: 'We use Cloudflare Turnstile for CAPTCHA verification in the contact form to protect against automated spam. Cloudflare may process your IP address for bot detection purposes. Our website is hosted and delivered via Vercel\'s infrastructure and CDN. Please refer to Cloudflare\'s and Vercel\'s respective Privacy Policies for details.',
      },
      {
        heading: '7. Data retention',
        body: 'Contact form submissions are retained only as long as necessary to respond to your inquiry. We do not sell, rent, or share your personal data with third parties.',
      },
      {
        heading: '8. Your rights',
        body: 'You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, please contact us via the contact form.',
      },
      {
        heading: '9. Changes to this policy',
        body: 'We may update this Privacy Policy from time to time. We encourage you to review this page periodically. Continued use of the site after changes are posted constitutes your acceptance of the updated policy.',
      },
      {
        heading: '10. Contact',
        body: 'If you have any questions about this Privacy Policy, please use the contact form on our website.',
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    description: 'Политика конфиденциальности Utilixi — как мы работаем с вашими данными.',
    h1: 'Политика конфиденциальности',
    sections: [
      {
        heading: '1. Введение',
        body: 'Эта политика конфиденциальности описывает, как Utilixi собирает, использует и защищает информацию при посещении utilixi.com. Мы стремимся защитить вашу конфиденциальность.',
      },
      {
        heading: '2. Собираемые данные',
        body: [
          'Данные калькуляторов: Все вычисления выполняются локально в вашем браузере. Мы не собираем и не передаём данные, которые вы вводите.',
          'Контактная форма: При отправке формы мы получаем ваше имя, email и текст сообщения — только для ответа на ваш запрос.',
          'Google Analytics: Мы используем Google Analytics для сбора анонимной статистики (просмотры страниц, тип браузера) для улучшения сервиса. Эти данные не позволяют идентифицировать пользователей.',
          'Яндекс.Метрика: Мы используем Яндекс.Метрику (загружается в отложенном режиме) для записи анонимных сессий — движения мыши, кликов и глубины прокрутки (Вебвизор) — в целях улучшения удобства. Записи сессий не содержат персонально идентифицируемой информации.',
          'Vercel Analytics и Speed Insights: Мы используем встроенную аналитику и мониторинг производительности Vercel для сбора анонимной статистики трафика и показателей Core Web Vitals. Персональные данные не собираются.',
        ],
      },
      {
        heading: '3. Файлы cookie',
        body: 'Мы используем cookie только для базовой функциональности сайта и анонимной аналитики. Мы не используем cookie в рекламных целях.',
      },
      {
        heading: '4. Локальное хранилище и настройки',
        body: 'Мы используем localStorage вашего браузера для сохранения настроек между сессиями — например, список избранных инструментов, предпочтительная система единиц (метрическая или имперская), выбранные валютные и криптовалютные пары, настройки страны или региона. Эти данные хранятся исключительно на вашем устройстве и никогда не передаются на наши серверы. Вы можете удалить их в любой момент, очистив данные сайта в настройках браузера.',
      },
      {
        heading: '5. Google AdSense',
        body: 'Мы используем Google AdSense для показа рекламы. Google может использовать cookie для показа рекламы на основе ваших предыдущих посещений сайтов. Вы можете отказаться от персонализированной рекламы в настройках Google Ads.',
      },
      {
        heading: '6. Сторонние сервисы',
        body: 'Мы используем Cloudflare Turnstile для CAPTCHA-проверки в контактной форме в целях защиты от спама. Cloudflare может обрабатывать ваш IP-адрес для обнаружения ботов. Наш сайт размещён и доставляется через инфраструктуру и CDN Vercel. Подробнее читайте в политиках конфиденциальности Cloudflare и Vercel.',
      },
      {
        heading: '7. Хранение данных',
        body: 'Сообщения из контактной формы хранятся только в течение времени, необходимого для ответа. Мы не продаём и не передаём ваши данные третьим лицам.',
      },
      {
        heading: '8. Ваши права',
        body: 'Вы имеете право на доступ, исправление или удаление ваших персональных данных. Для этого свяжитесь с нами через контактную форму.',
      },
      {
        heading: '9. Изменения политики',
        body: 'Мы можем периодически обновлять эту политику. Рекомендуем регулярно проверять эту страницу. Продолжение использования сайта после публикации изменений означает принятие обновлённой политики.',
      },
      {
        heading: '10. Контакты',
        body: 'По вопросам о политике конфиденциальности воспользуйтесь контактной формой на сайте.',
      },
    ],
  },
  uk: {
    title: 'Політика конфіденційності',
    description: 'Політика конфіденційності Utilixi — як ми обробляємо ваші дані.',
    h1: 'Політика конфіденційності',
    sections: [
      {
        heading: '1. Вступ',
        body: 'Ласкаво просимо на Utilixi. Ми прагнемо захистити вашу конфіденційність. Ця політика пояснює, як ми збираємо та використовуємо інформацію при відвідуванні utilixi.com.',
      },
      {
        heading: '2. Дані, які ми збираємо',
        body: [
          'Дані калькуляторів: Всі обчислення виконуються локально у вашому браузері. Ми не збираємо дані, які ви вводите.',
          'Контактна форма: При надсиланні форми ми отримуємо ваше ім\'я, email та текст повідомлення — лише для відповіді на запит.',
          'Google Analytics: Ми використовуємо Google Analytics для збору анонімної статистики (перегляди сторінок, тип браузера) для покращення сервісу. Ці дані не ідентифікують окремих користувачів.',
          'Яндекс.Метрика: Ми використовуємо Яндекс.Метрику (завантажується у відкладеному режимі) для запису анонімних сесій — рухів миші, кліків та глибини прокрутки (Вебвізор) — з метою покращення зручності. Записи сесій не містять особисто ідентифікованої інформації.',
          'Vercel Analytics та Speed Insights: Ми використовуємо вбудовану аналітику та моніторинг продуктивності Vercel для збору анонімної статистики трафіку та показників Core Web Vitals. Персональні дані не збираються.',
        ],
      },
      {
        heading: '3. Файли cookie',
        body: 'Ми використовуємо cookie лише для базової функціональності та анонімної аналітики.',
      },
      {
        heading: '4. Локальне сховище і налаштування',
        body: 'Ми використовуємо localStorage вашого браузера для збереження налаштувань між сесіями — наприклад, список вибраних інструментів, бажана система одиниць (метрична або імперська), вибрані валютні та криптовалютні пари, налаштування країни або регіону. Ці дані зберігаються виключно на вашому пристрої і ніколи не передаються на наші сервери. Ви можете видалити їх у будь-який момент, очистивши дані сайту в налаштуваннях браузера.',
      },
      {
        heading: '5. Google AdSense',
        body: 'Ми використовуємо Google AdSense для показу реклами. Ви можете відмовитися від персоналізованої реклами в налаштуваннях Google Ads.',
      },
      {
        heading: '6. Сторонні сервіси',
        body: 'Ми використовуємо Cloudflare Turnstile для CAPTCHA-перевірки у контактній формі з метою захисту від спаму. Cloudflare може обробляти вашу IP-адресу для виявлення ботів. Наш сайт розміщений і доставляється через інфраструктуру та CDN Vercel. Детальніше читайте у політиках конфіденційності Cloudflare і Vercel.',
      },
      {
        heading: '7. Зберігання даних',
        body: 'Повідомлення з контактної форми зберігаються лише стільки, скільки потрібно для відповіді. Ми не продаємо ваші дані третім особам.',
      },
      {
        heading: '8. Ваші права',
        body: 'Ви маєте право на доступ, виправлення або видалення ваших персональних даних. Зв\'яжіться з нами через контактну форму.',
      },
      {
        heading: '9. Зміни',
        body: 'Ми можемо оновлювати цю політику. Рекомендуємо регулярно перевіряти цю сторінку. Продовження використання сайту після публікації змін означає прийняття оновленої політики.',
      },
      {
        heading: '10. Контакти',
        body: 'З питань щодо конфіденційності скористайтеся контактною формою.',
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité d\'Utilixi — comment nous traitons vos données.',
    h1: 'Politique de confidentialité',
    sections: [
      {
        heading: '1. Introduction',
        body: 'Bienvenue sur Utilixi. Nous nous engageons à protéger votre vie privée. Cette politique explique comment nous collectons et utilisons vos informations lors de votre visite sur utilixi.com.',
      },
      {
        heading: '2. Données collectées',
        body: [
          'Données des calculatrices : Tous les calculs sont effectués localement dans votre navigateur. Nous ne collectons pas les données que vous saisissez.',
          'Formulaire de contact : Lors de l\'envoi du formulaire, nous recevons votre nom, adresse e-mail et message pour vous répondre.',
          'Google Analytics : Nous utilisons Google Analytics pour collecter des statistiques d\'utilisation anonymisées (pages vues, type de navigateur) afin d\'améliorer le service. Ces données n\'identifient pas les utilisateurs individuellement.',
          'Yandex Metrica : Nous utilisons Yandex Metrica (chargé avec une stratégie différée) pour enregistrer des sessions anonymisées — mouvements de souris, clics et profondeur de défilement (Webvisor) — afin d\'améliorer l\'ergonomie. Les enregistrements de sessions ne contiennent aucune information personnellement identifiable.',
          'Vercel Analytics et Speed Insights : Nous utilisons les outils d\'analyse et de surveillance des performances intégrés à Vercel pour collecter des statistiques de trafic et des métriques Core Web Vitals anonymisées. Aucune donnée personnelle n\'est collectée.',
        ],
      },
      {
        heading: '3. Cookies',
        body: 'Nous utilisons des cookies uniquement pour les fonctionnalités essentielles et des analyses anonymisées. Nous n\'utilisons pas de cookies à des fins publicitaires.',
      },
      {
        heading: '4. Stockage local et préférences',
        body: 'Nous utilisons le localStorage de votre navigateur pour enregistrer vos préférences entre les sessions — par exemple, votre liste d\'outils favoris, le système d\'unités préféré (métrique ou impérial), les paires de devises et de cryptomonnaies sélectionnées, ainsi que les paramètres de pays ou de région. Ces données sont stockées uniquement sur votre appareil et ne sont jamais transmises à nos serveurs. Vous pouvez les supprimer à tout moment en effaçant les données de site dans les paramètres de votre navigateur.',
      },
      {
        heading: '5. Google AdSense',
        body: 'Nous utilisons Google AdSense pour afficher des publicités. Vous pouvez désactiver la publicité personnalisée dans les paramètres Google Ads.',
      },
      {
        heading: '6. Services tiers',
        body: 'Nous utilisons Cloudflare Turnstile pour la vérification CAPTCHA dans le formulaire de contact afin de lutter contre le spam automatisé. Cloudflare peut traiter votre adresse IP à des fins de détection de robots. Notre site est hébergé et distribué via l\'infrastructure et le CDN de Vercel. Veuillez consulter les politiques de confidentialité respectives de Cloudflare et Vercel pour plus de détails.',
      },
      {
        heading: '7. Conservation des données',
        body: 'Les messages du formulaire de contact sont conservés uniquement le temps nécessaire pour vous répondre. Nous ne vendons pas vos données à des tiers.',
      },
      {
        heading: '8. Vos droits',
        body: 'Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données personnelles. Contactez-nous via le formulaire de contact.',
      },
      {
        heading: '9. Modifications',
        body: 'Nous pouvons mettre à jour cette politique périodiquement. Nous vous encourageons à consulter cette page régulièrement. La poursuite de l\'utilisation du site après la publication des modifications vaut acceptation de la politique mise à jour.',
      },
      {
        heading: '10. Contact',
        body: 'Pour toute question relative à cette politique, utilisez le formulaire de contact.',
      },
    ],
  },
  lt: {
    title: 'Privatumo politika',
    description: 'Utilixi privatumo politika — kaip mes tvarkome jūsų duomenis.',
    h1: 'Privatumo politika',
    sections: [
      {
        heading: '1. Įvadas',
        body: 'Sveiki atvykę į Utilixi. Mes įsipareigojame saugoti jūsų privatumą. Ši politika paaiškina, kaip mes renkame ir naudojame informaciją, kai lankotės utilixi.com.',
      },
      {
        heading: '2. Renkami duomenys',
        body: [
          'Skaičiuotuvų duomenys: Visi skaičiavimai atliekami vietinėje jūsų naršyklėje. Mes nerenkame jūsų įvestų duomenų.',
          'Kontaktų forma: Pateikus formą, gauname jūsų vardą, el. pašto adresą ir žinutę — tik atsakymui.',
          'Google Analytics: Naudojame Google Analytics anoniminei naudojimo statistikai rinkti (puslapių peržiūros, naršyklės tipas), kad pagerintume paslaugą. Šie duomenys neatpažįsta atskirų vartotojų.',
          'Yandex Metrica: Naudojame Yandex Metrica (įkeliamą atidėtu režimu) anoniminėms sesijoms įrašyti — pelės judesiams, paspaudimams ir slinkimo gyliui (Webvisor) — naudojimo patogumui gerinti. Sesijų įrašai neapima asmeniškai identifikuojamos informacijos.',
          'Vercel Analytics ir Speed Insights: Naudojame Vercel integruotą analitiką ir našumo stebėjimą anoniminei srauto statistikai ir Core Web Vitals metrikai rinkti. Asmeniniai duomenys nerenkami.',
        ],
      },
      {
        heading: '3. Slapukai',
        body: 'Naudojame slapukus tik pagrindiniam funkcionalumui ir anoniminei analizei. Nesaugojame slapukų reklamos tikslais.',
      },
      {
        heading: '4. Vietinė atmintinė ir nuostatos',
        body: 'Naudojame jūsų naršyklės localStorage nuostatoms išsaugoti tarp sesijų — pavyzdžiui, mėgstamų įrankių sąrašui, pageidaujamai matavimo sistemai (metrinei arba imperinei), pasirinktoms valiutų ir kriptovaliutų poroms bei šalies ar regiono nustatymams. Šie duomenys saugomi tik jūsų įrenginyje ir niekada nesiunčiami mūsų serveriams. Galite juos ištrinti bet kada per naršyklės svetainės duomenų nustatymus.',
      },
      {
        heading: '5. Google AdSense',
        body: 'Naudojame Google AdSense reklamai rodyti. Galite atsisakyti personalizuotos reklamos Google skelbimų nustatymuose.',
      },
      {
        heading: '6. Trečiųjų šalių paslaugos',
        body: 'Naudojame Cloudflare Turnstile CAPTCHA patikrinimui kontaktų formoje apsaugai nuo automatinio šiukšlių. Cloudflare gali apdoroti jūsų IP adresą robotų aptikimo tikslais. Mūsų svetainė talpinama ir pristatoma per Vercel infrastruktūrą ir CDN. Daugiau informacijos rasite atitinkamose Cloudflare ir Vercel privatumo politikose.',
      },
      {
        heading: '7. Duomenų saugojimas',
        body: 'Kontaktų formos žinutės saugomos tik tiek, kiek reikia atsakymui. Mes neparduodame jūsų duomenų trečiosioms šalims.',
      },
      {
        heading: '8. Jūsų teisės',
        body: 'Turite teisę susipažinti, taisyti ar ištrinti savo asmeninius duomenis. Susisiekite su mumis per kontaktų formą.',
      },
      {
        heading: '9. Pakeitimai',
        body: 'Galime periodiškai atnaujinti šią privatumo politiką. Rekomenduojame reguliariai peržiūrėti šį puslapį. Tolesnė svetainės naudojimas po pakeitimų paskelbimo laikomas atnaujintos politikos sutikimu.',
      },
      {
        heading: '10. Kontaktai',
        body: 'Dėl klausimų apie privatumą naudokitės kontaktų forma.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return buildMetadata(locale, '/privacy-policy', c);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <PageLayout centered>
      <div className={styles.page__content}>
        <h1 className={styles.page__title}>{c.h1}</h1>
        {c.sections.map((s) => (
          <section key={s.heading} className={styles.page__section}>
            <h2 className={styles.page__section_title}>{s.heading}</h2>
            {Array.isArray(s.body) ? (
              <ul className={styles.page__list}>
                {s.body.map((item, i) => (
                  <li key={i} className={styles.page__list_item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.page__section_text}>{s.body}</p>
            )}
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
