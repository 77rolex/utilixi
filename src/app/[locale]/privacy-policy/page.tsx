import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import PageLayout from '@/components/layout/PageLayout';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

type Section = { heading: string; body: string | string[] };

type LocaleContent = {
  title: string;
  description: string;
  h1: string;
  lastUpdated: string;
  sections: Section[];
};

const EFFECTIVE_DATE = 'May 17, 2025';

const CONTENT: Record<string, LocaleContent> = {
  en: {
    title: 'Privacy Policy',
    description: 'Utilixi privacy policy — how we handle your data.',
    h1: 'Privacy Policy',
    lastUpdated: `Last updated: ${EFFECTIVE_DATE}`,
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
          'Usage data: We may collect anonymized usage statistics (page views, browser type) via Google Analytics to improve the service. This data does not identify individual users.',
        ],
      },
      {
        heading: '3. Cookies',
        body: 'We use cookies only for essential site functionality and anonymized analytics. We do not use cookies for advertising or tracking purposes. You can disable cookies in your browser settings.',
      },
      {
        heading: '4. Google AdSense',
        body: 'We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings.',
      },
      {
        heading: '5. Third-party services',
        body: 'We use Cloudflare for security (CAPTCHA, CDN). Cloudflare may process your IP address to provide its services. Please refer to Cloudflare\'s Privacy Policy for details.',
      },
      {
        heading: '6. Data retention',
        body: 'Contact form submissions are retained only as long as necessary to respond to your inquiry. We do not sell, rent, or share your personal data with third parties.',
      },
      {
        heading: '7. Your rights',
        body: 'You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, please contact us via the contact form.',
      },
      {
        heading: '8. Changes to this policy',
        body: 'We may update this Privacy Policy from time to time. The updated version will be indicated by the "Last updated" date at the top of this page.',
      },
      {
        heading: '9. Contact',
        body: 'If you have any questions about this Privacy Policy, please use the contact form on our website.',
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    description: 'Политика конфиденциальности Utilixi — как мы работаем с вашими данными.',
    h1: 'Политика конфиденциальности',
    lastUpdated: `Последнее обновление: ${EFFECTIVE_DATE}`,
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
          'Статистика использования: Мы можем собирать анонимную статистику (просмотры страниц) через Google Analytics для улучшения сервиса.',
        ],
      },
      {
        heading: '3. Файлы cookie',
        body: 'Мы используем cookie только для базовой функциональности сайта и анонимной аналитики. Мы не используем cookie в рекламных целях.',
      },
      {
        heading: '4. Google AdSense',
        body: 'Мы используем Google AdSense для показа рекламы. Google может использовать cookie для показа рекламы на основе ваших предыдущих посещений сайтов. Вы можете отказаться от персонализированной рекламы в настройках Google Ads.',
      },
      {
        heading: '5. Сторонние сервисы',
        body: 'Мы используем Cloudflare для безопасности (CAPTCHA, CDN). Cloudflare может обрабатывать ваш IP-адрес для предоставления своих услуг.',
      },
      {
        heading: '6. Хранение данных',
        body: 'Сообщения из контактной формы хранятся только в течение времени, необходимого для ответа. Мы не продаём и не передаём ваши данные третьим лицам.',
      },
      {
        heading: '7. Ваши права',
        body: 'Вы имеете право на доступ, исправление или удаление ваших персональных данных. Для этого свяжитесь с нами через контактную форму.',
      },
      {
        heading: '8. Изменения политики',
        body: 'Мы можем периодически обновлять эту политику. Актуальная версия всегда будет доступна на этой странице.',
      },
      {
        heading: '9. Контакты',
        body: 'По вопросам о политике конфиденциальности воспользуйтесь контактной формой на сайте.',
      },
    ],
  },
  uk: {
    title: 'Політика конфіденційності',
    description: 'Політика конфіденційності Utilixi — як ми обробляємо ваші дані.',
    h1: 'Політика конфіденційності',
    lastUpdated: `Останнє оновлення: ${EFFECTIVE_DATE}`,
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
          'Статистика: Ми можемо збирати анонімну статистику через Google Analytics.',
        ],
      },
      {
        heading: '3. Файли cookie',
        body: 'Ми використовуємо cookie лише для базової функціональності та анонімної аналітики.',
      },
      {
        heading: '4. Google AdSense',
        body: 'Ми використовуємо Google AdSense для показу реклами. Ви можете відмовитися від персоналізованої реклами в налаштуваннях Google Ads.',
      },
      {
        heading: '5. Сторонні сервіси',
        body: 'Ми використовуємо Cloudflare для безпеки (CAPTCHA, CDN). Cloudflare може обробляти вашу IP-адресу.',
      },
      {
        heading: '6. Зберігання даних',
        body: 'Повідомлення з контактної форми зберігаються лише стільки, скільки потрібно для відповіді. Ми не продаємо ваші дані третім особам.',
      },
      {
        heading: '7. Ваші права',
        body: 'Ви маєте право на доступ, виправлення або видалення ваших персональних даних. Зв\'яжіться з нами через контактну форму.',
      },
      {
        heading: '8. Зміни',
        body: 'Ми можемо оновлювати цю політику. Актуальна версія завжди буде на цій сторінці.',
      },
      {
        heading: '9. Контакти',
        body: 'З питань щодо конфіденційності скористайтеся контактною формою.',
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité d\'Utilixi — comment nous traitons vos données.',
    h1: 'Politique de confidentialité',
    lastUpdated: `Dernière mise à jour : ${EFFECTIVE_DATE}`,
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
          'Données d\'utilisation : Nous pouvons collecter des statistiques anonymisées via Google Analytics.',
        ],
      },
      {
        heading: '3. Cookies',
        body: 'Nous utilisons des cookies uniquement pour les fonctionnalités essentielles et des analyses anonymisées. Nous n\'utilisons pas de cookies à des fins publicitaires.',
      },
      {
        heading: '4. Google AdSense',
        body: 'Nous utilisons Google AdSense pour afficher des publicités. Vous pouvez désactiver la publicité personnalisée dans les paramètres Google Ads.',
      },
      {
        heading: '5. Services tiers',
        body: 'Nous utilisons Cloudflare pour la sécurité (CAPTCHA, CDN). Cloudflare peut traiter votre adresse IP.',
      },
      {
        heading: '6. Conservation des données',
        body: 'Les messages du formulaire de contact sont conservés uniquement le temps nécessaire pour vous répondre. Nous ne vendons pas vos données à des tiers.',
      },
      {
        heading: '7. Vos droits',
        body: 'Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données personnelles. Contactez-nous via le formulaire de contact.',
      },
      {
        heading: '8. Modifications',
        body: 'Nous pouvons mettre à jour cette politique périodiquement. La version à jour sera toujours disponible sur cette page.',
      },
      {
        heading: '9. Contact',
        body: 'Pour toute question relative à cette politique, utilisez le formulaire de contact.',
      },
    ],
  },
  lt: {
    title: 'Privatumo politika',
    description: 'Utilixi privatumo politika — kaip mes tvarkome jūsų duomenis.',
    h1: 'Privatumo politika',
    lastUpdated: `Paskutinis atnaujinimas: ${EFFECTIVE_DATE}`,
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
          'Naudojimo statistika: Galime rinkti anoniminę statistiką naudodami Google Analytics.',
        ],
      },
      {
        heading: '3. Slapukai',
        body: 'Naudojame slapukus tik pagrindiniam funkcionalumui ir anoniminei analizei. Nesaugojame slapukų reklamos tikslais.',
      },
      {
        heading: '4. Google AdSense',
        body: 'Naudojame Google AdSense reklamai rodyti. Galite atsisakyti personalizuotos reklamos Google skelbimų nustatymuose.',
      },
      {
        heading: '5. Trečiųjų šalių paslaugos',
        body: 'Naudojame Cloudflare saugumui (CAPTCHA, CDN). Cloudflare gali apdoroti jūsų IP adresą.',
      },
      {
        heading: '6. Duomenų saugojimas',
        body: 'Kontaktų formos žinutės saugomos tik tiek, kiek reikia atsakymui. Mes neparduodame jūsų duomenų trečiosioms šalims.',
      },
      {
        heading: '7. Jūsų teisės',
        body: 'Turite teisę susipažinti, taisyti ar ištrinti savo asmeninius duomenis. Susisiekite su mumis per kontaktų formą.',
      },
      {
        heading: '8. Pakeitimai',
        body: 'Galime periodiškai atnaujinti šią politiką. Aktuali versija visada bus šiame puslapyje.',
      },
      {
        heading: '9. Kontaktai',
        body: 'Dėl klausimų apie privatumą naudokitės kontaktų forma.',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.title, description: c.description, alternates: buildAlternates(locale, '/privacy-policy') };
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
        <p className={styles.page__date}>{c.lastUpdated}</p>
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
