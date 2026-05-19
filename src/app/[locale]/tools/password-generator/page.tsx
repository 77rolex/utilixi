import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import PasswordGenerator from './PasswordGenerator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/tools/countdown', label: 'Countdown Timer' }, { href: '/converter/color', label: 'Color Converter' }],
  ru: [{ href: '/tools/countdown', label: 'Таймер обратного отсчёта' }, { href: '/converter/color', label: 'Конвертер цветов' }],
  uk: [{ href: '/tools/countdown', label: 'Таймер зворотного відліку' }, { href: '/converter/color', label: 'Конвертер кольорів' }],
  fr: [{ href: '/tools/countdown', label: 'Compte à rebours' }, { href: '/converter/color', label: 'Convertisseur de couleurs' }],
  lt: [{ href: '/tools/countdown', label: 'Atgalinio skaičiavimo laikmatis' }, { href: '/converter/color', label: 'Spalvų keitiklis' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Password Generator — Create Strong Passwords Online', description: 'Free online password generator. Create strong random passwords or generate a memorable password from your own keyword using leet-speak rules.', h1: 'Password Generator' },
  ru: { title: 'Генератор паролей — создать надёжный пароль онлайн', description: 'Бесплатный онлайн-генератор паролей. Создайте случайный надёжный пароль или сгенерируйте пароль из своего ключевого слова по правилам leet-speak.', h1: 'Генератор паролей' },
  uk: { title: 'Генератор паролів — створити надійний пароль онлайн', description: 'Безкоштовний онлайн-генератор паролів. Створіть випадковий надійний пароль або згенеруйте пароль зі свого ключового слова за правилами leet-speak.', h1: 'Генератор паролів' },
  fr: { title: 'Générateur de mot de passe — Créer un mot de passe sécurisé', description: 'Générateur de mot de passe gratuit en ligne. Créez un mot de passe aléatoire fort ou générez un mot de passe mémorisable à partir d\'un mot-clé.', h1: 'Générateur de mot de passe' },
  lt: { title: 'Slaptažodžių Generatorius — Sukurti Stiprų Slaptažodį', description: 'Nemokamas slaptažodžių generatorius internete. Sukurkite atsitiktinį stiprų slaptažodį arba generuokite slaptažodį iš savo rakto žodžio.', h1: 'Slaptažodžių generatorius' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'A strong password is your first line of defense against unauthorized access. This generator offers two modes: "Random" creates a cryptographically strong password using the browser\'s built-in secure random number generator, and "From keyword" transforms your memorable word into a strong password using leet-speak substitutions, capitalization rules, and symbol additions — giving you a password that\'s both strong and easier to remember.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is this password generator secure?', a: 'Yes. In "Random" mode, passwords are generated using the Web Cryptography API (crypto.getRandomValues), which is cryptographically secure. No passwords are sent to any server — all generation happens locally in your browser.' },
      { q: 'What is the "From keyword" mode?', a: 'You enter a word (e.g. "sunshine") and the generator applies leet-speak substitutions (e→3, a→4, o→0, etc.), capitalization, and adds symbols and numbers to create a strong password. The same keyword always produces the same password, making it predictable for you but secure against brute-force.' },
      { q: 'How long should a password be?', a: 'At least 12 characters for most accounts. For critical accounts (banking, email, primary passwords), use 16+ characters. Longer passwords are exponentially harder to crack even without special characters.' },
      { q: 'Should I include symbols in my password?', a: 'Yes, if the site allows it. Symbols dramatically increase the number of possible combinations. A 12-character password with symbols has roughly 10,000× more possible combinations than one with lowercase letters only.' },
      { q: 'What is a strong password?', a: 'A strong password is at least 12 characters long, contains a mix of uppercase and lowercase letters, numbers, and symbols, and is not based on dictionary words, personal information, or predictable patterns like "Password123!".' },
    ],
  },
  ru: {
    description: 'Надёжный пароль — первая линия защиты от несанкционированного доступа. Генератор работает в двух режимах: «Случайный» создаёт криптографически стойкий пароль с помощью встроенного браузерного генератора случайных чисел, а «Из ключевого слова» преобразует ваше слово в надёжный пароль с помощью leet-speak замен, заглавных букв и символов — такой пароль и надёжен, и легче запоминается.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Безопасен ли этот генератор?', a: 'Да. В режиме «Случайный» пароли создаются с помощью Web Cryptography API (crypto.getRandomValues) — криптографически стойкого источника. Пароли никуда не отправляются: всё происходит локально в браузере.' },
      { q: 'Как работает режим «Из ключевого слова»?', a: 'Вы вводите слово (например, «sunshine»), и генератор применяет leet-speak замены (e→3, a→4, o→0 и др.), заглавные буквы, добавляет символы и цифры. Одно и то же слово всегда даёт один и тот же пароль — предсказуемый для вас, но стойкий к перебору.' },
      { q: 'Какой длины должен быть пароль?', a: 'Не менее 12 символов для большинства аккаунтов. Для критически важных (банк, email, основные пароли) — от 16 символов. Длинные пароли экспоненциально труднее взломать.' },
      { q: 'Нужно ли использовать символы?', a: 'Да, если сайт позволяет. Символы резко увеличивают количество возможных комбинаций. 12-символьный пароль с символами имеет примерно в 10 000 раз больше вариантов, чем пароль только из строчных букв.' },
      { q: 'Что такое надёжный пароль?', a: 'Надёжный пароль — не менее 12 символов, содержит заглавные и строчные буквы, цифры и символы, не основан на словарных словах, личных данных или предсказуемых шаблонах вроде «Password123!».' },
    ],
  },
  uk: {
    description: 'Надійний пароль — перша лінія захисту від несанкціонованого доступу. Генератор працює у двох режимах: «Випадковий» створює криптографічно стійкий пароль за допомогою браузерного генератора, а «З ключового слова» перетворює ваше слово на надійний пароль за допомогою leet-speak замін, великих літер і символів.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Чи безпечний цей генератор?', a: 'Так. У режимі «Випадковий» паролі створюються за допомогою Web Cryptography API (crypto.getRandomValues). Паролі нікуди не надсилаються — все відбувається локально у браузері.' },
      { q: 'Як працює режим «З ключового слова»?', a: 'Ви вводите слово (наприклад, «sunshine»), і генератор застосовує leet-speak заміни (e→3, a→4, o→0 тощо), великі літери, додає символи та цифри. Одне й те саме слово завжди дає однаковий пароль.' },
      { q: 'Яка довжина пароля потрібна?', a: 'Не менше 12 символів для більшості акаунтів. Для критичних (банк, пошта) — від 16 символів. Довші паролі експоненційно важче зламати.' },
      { q: 'Чи потрібно використовувати символи?', a: 'Так, якщо сайт дозволяє. Символи різко збільшують кількість можливих комбінацій. 12-символьний пароль із символами має приблизно в 10 000 разів більше варіантів.' },
      { q: 'Що таке надійний пароль?', a: 'Надійний пароль — не менше 12 символів, містить великі та малі літери, цифри та символи, не заснований на словникових словах або персональних даних.' },
    ],
  },
  fr: {
    description: 'Un mot de passe fort est votre première ligne de défense contre les accès non autorisés. Ce générateur propose deux modes : « Aléatoire » crée un mot de passe cryptographiquement sécurisé à l\'aide du générateur de nombres aléatoires sécurisé du navigateur, et « Depuis un mot-clé » transforme votre mot mémorisable en un mot de passe fort grâce aux substitutions leet-speak, à la mise en majuscules et à l\'ajout de symboles.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Ce générateur est-il sécurisé ?', a: 'Oui. En mode « Aléatoire », les mots de passe sont générés avec l\'API Web Cryptography (crypto.getRandomValues), qui est cryptographiquement sécurisée. Aucun mot de passe n\'est envoyé à un serveur — tout se passe localement dans votre navigateur.' },
      { q: 'Comment fonctionne le mode « Depuis un mot-clé » ?', a: 'Vous entrez un mot (ex. « sunshine ») et le générateur applique des substitutions leet-speak (e→3, a→4, o→0, etc.), des majuscules, et ajoute des symboles et des chiffres. Le même mot-clé produit toujours le même mot de passe.' },
      { q: 'Quelle longueur doit avoir un mot de passe ?', a: 'Au moins 12 caractères pour la plupart des comptes. Pour les comptes critiques (banque, e-mail), utilisez 16+ caractères. Les mots de passe plus longs sont exponentiellement plus difficiles à craquer.' },
      { q: 'Faut-il inclure des symboles ?', a: 'Oui, si le site le permet. Les symboles augmentent considérablement le nombre de combinaisons possibles. Un mot de passe de 12 caractères avec des symboles a environ 10 000 fois plus de combinaisons possibles.' },
      { q: 'Qu\'est-ce qu\'un mot de passe fort ?', a: 'Un mot de passe fort comporte au moins 12 caractères, un mélange de majuscules, minuscules, chiffres et symboles, et n\'est pas basé sur des mots du dictionnaire, des informations personnelles ou des modèles prévisibles.' },
    ],
  },
  lt: {
    description: 'Stiprus slaptažodis yra jūsų pirmoji apsaugos linija nuo neteisėtos prieigos. Šis generatorius siūlo du režimus: „Atsitiktinis" sukuria kriptografiškai saugų slaptažodį naudodamas naršyklės saugų atsitiktinių skaičių generatorių, o „Iš rakto žodžio" paverčia jūsų žodį stipriu slaptažodžiu naudodamas leet-speak pakaitalus ir sudėtingumo taisykles.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Ar šis generatorius yra saugus?', a: 'Taip. „Atsitiktiniame" režime slaptažodžiai generuojami naudojant Web Cryptography API (crypto.getRandomValues), kuri yra kriptografiškai saugi. Jokie slaptažodžiai nesiunčiami į serverį — viskas vyksta vietinėje naršyklėje.' },
      { q: 'Kaip veikia „Iš rakto žodžio" režimas?', a: 'Įvedate žodį (pvz., „sunshine") ir generatorius taiko leet-speak pakaitalus (e→3, a→4, o→0 ir kt.), didžiąsias raides, prideda simbolių ir skaičių. Tas pats rakto žodis visada duoda tą patį slaptažodį.' },
      { q: 'Koks turi būti slaptažodžio ilgis?', a: 'Bent 12 simbolių daugumai paskyrų. Svarbiausioms paskyroms (bankas, el. paštas) naudokite 16+ simbolių. Ilgesni slaptažodžiai eksponentiškai sunkiau įveikiami.' },
      { q: 'Ar reikia naudoti simbolius?', a: 'Taip, jei svetainė leidžia. Simboliai dramatiškai padidina galimų kombinacijų skaičių. 12 simbolių slaptažodis su simboliais turi maždaug 10 000 kartų daugiau galimų kombinacijų.' },
      { q: 'Kas yra stiprus slaptažodis?', a: 'Stiprus slaptažodis yra bent 12 simbolių ilgio, turi didžiąsias ir mažąsias raides, skaičius ir simbolius, ir nėra pagrįstas žodyno žodžiais, asmeniniais duomenimis ar nuspėjamais šablonais.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const alternates: Record<string, string> = {};
  routing.locales.forEach((l) => { alternates[l] = `https://utilixi.com/${l}/tools/password-generator`; });
  return { title: meta.title, description: meta.description, alternates: { languages: alternates } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PasswordGeneratorPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: meta.title, description: meta.description,
    url: `https://utilixi.com/${locale}/tools/password-generator`,
    applicationCategory: 'SecurityApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <PasswordGenerator locale={locale} />
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
