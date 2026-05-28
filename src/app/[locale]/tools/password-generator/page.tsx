import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
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
  en: {
    title: 'Strong Password Generator — Free Random Password Creator Online',
    description: 'Free strong password generator online. Create secure random passwords up to 64 characters, or generate a memorable password from your own keyword. No data is sent to any server — 100% private, runs in your browser.',
    h1: 'Password Generator',
  },
  ru: {
    title: 'Генератор паролей онлайн — создать надёжный пароль бесплатно',
    description: 'Бесплатный генератор паролей онлайн. Создайте случайный надёжный пароль до 64 символов или сгенерируйте пароль из ключевого слова. Данные никуда не отправляются — всё работает в браузере.',
    h1: 'Генератор паролей',
  },
  uk: {
    title: 'Генератор паролів онлайн — безкоштовний надійний пароль',
    description: 'Безкоштовний генератор паролів онлайн. Створіть випадковий надійний пароль до 64 символів або згенеруйте пароль зі свого ключового слова. Дані нікуди не надсилаються — все працює у браузері.',
    h1: 'Генератор паролів',
  },
  fr: {
    title: 'Générateur de Mot de Passe Gratuit — Créer un Mot de Passe Sécurisé',
    description: 'Générateur de mot de passe gratuit en ligne. Créez un mot de passe aléatoire fort jusqu\'à 64 caractères ou générez un mot de passe mémorisable depuis votre propre mot-clé. Aucune donnée envoyée à un serveur.',
    h1: 'Générateur de mot de passe',
  },
  lt: {
    title: 'Slaptažodžių Generatorius Internetu — Stiprus Slaptažodis Nemokamai',
    description: 'Nemokamas slaptažodžių generatorius internetu. Sukurkite atsitiktinį stiprų slaptažodį iki 64 simbolių arba generuokite slaptažodį iš savo rakto žodžio. Jokie duomenys nesiunčiami į serverį.',
    h1: 'Slaptažodžių generatorius',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'A strong password is your first line of defense against unauthorized access. This free password generator offers two modes: "Random" creates a cryptographically secure password of up to 64 characters using the browser\'s built-in Web Cryptography API — no data ever leaves your device. "From keyword" transforms your memorable word into a strong password using leet-speak substitutions, capitalization rules, and symbol additions.\n\nYou can customize the character set: include or exclude uppercase letters, numbers, and symbols to match any site\'s requirements. All generation happens entirely in your browser — no passwords are stored, logged, or transmitted to any server.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is this password generator secure?', a: 'Yes. In "Random" mode, passwords are generated using the Web Cryptography API (crypto.getRandomValues), which is cryptographically secure and approved by security standards including NIST. No passwords are sent to any server — all generation happens locally in your browser. You can verify this by disconnecting from the internet and confirming the tool still works.' },
      { q: 'What is the "From keyword" mode?', a: 'You enter a memorable word (e.g. "sunshine") and the generator applies leet-speak substitutions (e→3, a→4, o→0, i→!, s→$, etc.), capitalization, and adds symbols and numbers. The same keyword always produces the same password, making it reproducible for you but highly resistant to brute-force attacks.' },
      { q: 'How long should a password be?', a: 'At least 12 characters for most accounts. For critical accounts (banking, email, cloud storage), use 16+ characters. Password length is the single biggest factor in security — a 16-character password with only lowercase letters is far harder to crack than an 8-character password with all character types.' },
      { q: 'Should I include symbols in my password?', a: 'Yes, if the site allows it. Symbols dramatically increase entropy. A 12-character password with uppercase, lowercase, digits and symbols has approximately 10,000× more possible combinations than one with lowercase letters only. If a site restricts symbols, compensate by increasing the length to 16+ characters.' },
      { q: 'What is a strong password?', a: 'A strong password is at least 12 characters long, contains a mix of uppercase and lowercase letters, numbers, and symbols, and is not based on dictionary words, personal information (names, dates of birth), or predictable patterns like "Password123!" or "Qwerty2024". Each account should have a unique password.' },
      { q: 'Should I use a password manager?', a: 'Yes — a password manager (such as Bitwarden, 1Password, or KeePass) is the most practical way to use unique, strong passwords for every account without memorising them. You only need to remember one master password. Free options like Bitwarden are fully featured and open-source.' },
      { q: 'Is it safe to use an online password generator?', a: 'It is safe if the generator works entirely in your browser without sending data to a server. This generator uses the browser\'s crypto.getRandomValues API and performs all operations locally — no password is ever transmitted or stored. For extra peace of mind, you can go offline before generating passwords.' },
      { q: 'What is two-factor authentication (2FA) and should I use it?', a: 'Two-factor authentication adds a second verification step (such as a code from an authenticator app) after your password. Even if your password is compromised, an attacker cannot access your account without the second factor. Enable 2FA on all critical accounts — email, banking, and any account with personal or financial data.' },
      { q: 'How often should I change my passwords?', a: 'Current NIST guidelines (2023) recommend against mandatory periodic password changes unless there is evidence of a breach. Instead, focus on: using a unique password for every account, enabling 2FA, and changing a password immediately if a service reports a data breach. Regular unprompted changes often lead to weaker passwords (e.g. Password1 → Password2).' },
      { q: 'What is password entropy?', a: 'Entropy measures how unpredictable a password is, expressed in bits. Higher entropy = harder to crack. A 12-character password using all character types (94 possible characters) has about 79 bits of entropy — considered strong. A 16-character version reaches ~105 bits. Our random generator maximises entropy by using the cryptographically secure crypto.getRandomValues function.' },
    ],
  },
  ru: {
    description: 'Надёжный пароль — первая линия защиты от несанкционированного доступа. Бесплатный генератор паролей онлайн работает в двух режимах: «Случайный» создаёт криптографически стойкий пароль до 64 символов с помощью Web Cryptography API браузера — данные никуда не уходят с вашего устройства. «Из ключевого слова» преобразует ваше запоминаемое слово в надёжный пароль через leet-speak замены, заглавные буквы и символы.\n\nВы можете настроить набор символов: включить или исключить заглавные буквы, цифры и спецсимволы под требования любого сайта. Весь процесс происходит только в браузере — пароли не сохраняются, не логируются и не передаются ни на какой сервер.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Безопасен ли этот генератор паролей?', a: 'Да. В режиме «Случайный» пароли создаются с помощью Web Cryptography API (crypto.getRandomValues) — криптографически стойкого источника, рекомендованного стандартами NIST. Пароли никуда не отправляются: всё происходит локально в браузере. Вы можете проверить это, отключив интернет — инструмент продолжит работать.' },
      { q: 'Как работает режим «Из ключевого слова»?', a: 'Вы вводите слово (например, «солнышко»), и генератор применяет leet-speak замены (e→3, a→4, o→0, i→!, s→$ и др.), заглавные буквы, добавляет символы и цифры. Одно и то же слово всегда даёт один и тот же пароль — предсказуемый для вас, но стойкий к перебору.' },
      { q: 'Какой длины должен быть пароль?', a: 'Не менее 12 символов для большинства аккаунтов. Для критически важных (банк, email, облако) — от 16 символов. Длина пароля — главный фактор безопасности: 16-символьный пароль из строчных букв взломать сложнее, чем 8-символьный со всеми типами символов.' },
      { q: 'Нужно ли использовать символы в пароле?', a: 'Да, если сайт позволяет. Символы резко увеличивают количество возможных комбинаций. 12-символьный пароль с заглавными, строчными, цифрами и символами имеет примерно в 10 000 раз больше вариантов. Если сайт запрещает символы — компенсируйте длиной от 16 символов.' },
      { q: 'Что такое надёжный пароль?', a: 'Надёжный пароль — не менее 12 символов, содержит заглавные и строчные буквы, цифры и символы, не основан на словарных словах, личных данных (имя, дата рождения) или предсказуемых шаблонах вроде «Пароль123!». На каждом сайте должен быть уникальный пароль.' },
      { q: 'Стоит ли использовать менеджер паролей?', a: 'Да — менеджер паролей (Bitwarden, 1Password, KeePass) позволяет хранить уникальные сложные пароли для каждого аккаунта без необходимости их запоминать. Нужно помнить только один мастер-пароль. Bitwarden — бесплатный и открытый исходный код.' },
      { q: 'Безопасно ли пользоваться онлайн-генератором паролей?', a: 'Да, если генератор работает целиком в браузере и не отправляет данные на сервер. Наш инструмент использует crypto.getRandomValues и выполняет все операции локально — ни один пароль не передаётся и не хранится. Для надёжности можно отключить интернет перед генерацией.' },
      { q: 'Что такое двухфакторная аутентификация (2FA)?', a: 'Двухфакторная аутентификация добавляет второй шаг проверки (код из приложения-аутентификатора) после ввода пароля. Даже если пароль утёк, злоумышленник не попадёт в аккаунт без второго фактора. Включите 2FA на всех важных аккаунтах: email, банк, соцсети.' },
      { q: 'Как часто нужно менять пароль?', a: 'Актуальные рекомендации NIST (2023) не советуют принудительно менять пароли без повода — это приводит к слабым паролям вроде «Пароль1» → «Пароль2». Главное: уникальный пароль на каждом сайте, включённый 2FA, и смена пароля сразу после утечки данных в сервисе.' },
      { q: 'Что такое энтропия пароля?', a: 'Энтропия измеряет непредсказуемость пароля в битах. Чем выше — тем сложнее взломать. 12-символьный пароль из всех типов символов (94 варианта) имеет около 79 бит энтропии — считается надёжным. 16-символьный достигает ~105 бит. Наш генератор максимизирует энтропию через crypto.getRandomValues.' },
    ],
  },
  uk: {
    description: 'Надійний пароль — перша лінія захисту від несанкціонованого доступу. Безкоштовний генератор паролів онлайн працює у двох режимах: «Випадковий» створює криптографічно стійкий пароль до 64 символів за допомогою Web Cryptography API браузера — дані нікуди не залишають ваш пристрій. «З ключового слова» перетворює ваше запам\'ятовуване слово на надійний пароль через leet-speak заміни, великі літери та символи.\n\nВи можете налаштувати набір символів: включити або виключити великі літери, цифри та спецсимволи під вимоги будь-якого сайту. Весь процес відбувається лише у браузері — паролі не зберігаються, не логуються і не передаються на жоден сервер.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Чи безпечний цей генератор паролів?', a: 'Так. У режимі «Випадковий» паролі створюються за допомогою Web Cryptography API (crypto.getRandomValues) — криптографічно стійкого джерела, рекомендованого стандартами NIST. Паролі нікуди не надсилаються — все відбувається локально у браузері. Можна перевірити, відключившись від інтернету — інструмент продовжить працювати.' },
      { q: 'Як працює режим «З ключового слова»?', a: 'Ви вводите слово (наприклад, «сонечко»), і генератор застосовує leet-speak заміни (e→3, a→4, o→0, i→!, s→$ тощо), великі літери, додає символи та цифри. Одне й те саме слово завжди дає однаковий пароль — відтворюваний для вас, але стійкий до перебору.' },
      { q: 'Яка довжина пароля потрібна?', a: 'Не менше 12 символів для більшості акаунтів. Для критичних (банк, пошта, хмарні сховища) — від 16 символів. Довжина — головний чинник безпеки: 16-символьний пароль зі строчних літер зламати складніше, ніж 8-символьний з усіма типами символів.' },
      { q: 'Чи потрібно використовувати символи в паролі?', a: 'Так, якщо сайт дозволяє. Символи різко збільшують кількість можливих комбінацій. 12-символьний пароль з великими, малими, цифрами та символами має приблизно в 10 000 разів більше варіантів. Якщо сайт забороняє символи — компенсуйте довжиною від 16 символів.' },
      { q: 'Що таке надійний пароль?', a: 'Надійний пароль — не менше 12 символів, містить великі та малі літери, цифри та символи, не заснований на словникових словах, персональних даних (ім\'я, дата народження) або передбачуваних шаблонах. На кожному сайті повинен бути унікальний пароль.' },
      { q: 'Чи варто використовувати менеджер паролів?', a: 'Так — менеджер паролів (Bitwarden, 1Password, KeePass) дозволяє зберігати унікальні складні паролі для кожного акаунту без необхідності їх запам\'ятовувати. Потрібно пам\'ятати лише один майстер-пароль. Bitwarden — безкоштовний і з відкритим вихідним кодом.' },
      { q: 'Чи безпечно користуватися онлайн-генератором паролів?', a: 'Так, якщо генератор працює повністю у браузері і не надсилає дані на сервер. Наш інструмент використовує crypto.getRandomValues і виконує всі операції локально — жоден пароль не передається і не зберігається. Для певності можна відключитися від інтернету перед генерацією.' },
      { q: 'Що таке двофакторна аутентифікація (2FA)?', a: 'Двофакторна аутентифікація додає другий крок перевірки (код з додатка-автентифікатора) після введення пароля. Навіть якщо пароль витік, зловмисник не потрапить в акаунт без другого фактора. Увімкніть 2FA на всіх важливих акаунтах: пошта, банк, соцмережі.' },
      { q: 'Як часто потрібно міняти пароль?', a: 'Актуальні рекомендації NIST (2023) не радять примусово змінювати паролі без причини — це призводить до слабких паролів типу «Пароль1» → «Пароль2». Головне: унікальний пароль на кожному сайті, увімкнений 2FA та зміна пароля одразу після витоку даних із сервісу.' },
      { q: 'Що таке ентропія пароля?', a: 'Ентропія вимірює непередбачуваність пароля у бітах. Що вища — то складніше зламати. 12-символьний пароль з усіх типів символів (94 варіанти) має близько 79 біт ентропії — вважається надійним. 16-символьний досягає ~105 біт. Наш генератор максимізує ентропію через crypto.getRandomValues.' },
    ],
  },
  fr: {
    description: 'Un mot de passe fort est votre première ligne de défense contre les accès non autorisés. Ce générateur de mot de passe gratuit propose deux modes : « Aléatoire » crée un mot de passe cryptographiquement sécurisé jusqu\'à 64 caractères avec l\'API Web Cryptography du navigateur — aucune donnée ne quitte votre appareil. « Depuis un mot-clé » transforme votre mot mémorisable en mot de passe fort grâce aux substitutions leet-speak, à la mise en majuscules et à l\'ajout de symboles.\n\nVous pouvez personnaliser le jeu de caractères : inclure ou exclure les majuscules, les chiffres et les symboles selon les exigences de chaque site. Toute la génération se fait localement dans votre navigateur — aucun mot de passe n\'est stocké, enregistré ou transmis à un serveur.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Ce générateur de mot de passe est-il sécurisé ?', a: 'Oui. En mode « Aléatoire », les mots de passe sont générés avec l\'API Web Cryptography (crypto.getRandomValues), approuvée par les normes NIST. Aucun mot de passe n\'est envoyé à un serveur — tout se passe localement dans votre navigateur. Vous pouvez vérifier en vous déconnectant d\'internet : l\'outil fonctionne toujours.' },
      { q: 'Comment fonctionne le mode « Depuis un mot-clé » ?', a: 'Vous entrez un mot (ex. « soleil ») et le générateur applique des substitutions leet-speak (e→3, a→4, o→0, i→!, s→$, etc.), des majuscules, et ajoute des symboles et des chiffres. Le même mot-clé produit toujours le même mot de passe — reproductible pour vous, mais résistant aux attaques par force brute.' },
      { q: 'Quelle longueur doit avoir un mot de passe ?', a: 'Au moins 12 caractères pour la plupart des comptes. Pour les comptes critiques (banque, e-mail, stockage cloud), utilisez 16+ caractères. La longueur est le facteur le plus important : un mot de passe de 16 caractères en minuscules est plus difficile à craquer qu\'un mot de passe de 8 caractères avec tous les types de caractères.' },
      { q: 'Faut-il inclure des symboles dans un mot de passe ?', a: 'Oui, si le site le permet. Les symboles augmentent considérablement l\'entropie. Un mot de passe de 12 caractères avec majuscules, minuscules, chiffres et symboles a environ 10 000 fois plus de combinaisons. Si un site interdit les symboles, compensez avec une longueur de 16+ caractères.' },
      { q: 'Qu\'est-ce qu\'un mot de passe fort ?', a: 'Un mot de passe fort comporte au moins 12 caractères, un mélange de majuscules, minuscules, chiffres et symboles, et n\'est pas basé sur des mots du dictionnaire, des informations personnelles (nom, date de naissance) ou des modèles prévisibles comme « Motdepasse123! ». Chaque compte doit avoir un mot de passe unique.' },
      { q: 'Faut-il utiliser un gestionnaire de mots de passe ?', a: 'Oui — un gestionnaire de mots de passe (Bitwarden, 1Password, KeePass) permet d\'utiliser des mots de passe uniques et forts pour chaque compte sans les mémoriser. Il suffit de retenir un seul mot de passe maître. Bitwarden est gratuit et open-source.' },
      { q: 'Est-il sûr d\'utiliser un générateur de mot de passe en ligne ?', a: 'Oui, si le générateur fonctionne entièrement dans le navigateur sans envoyer de données à un serveur. Cet outil utilise crypto.getRandomValues et effectue toutes les opérations localement — aucun mot de passe n\'est transmis ni stocké. Pour plus de sécurité, déconnectez-vous d\'internet avant de générer.' },
      { q: 'Qu\'est-ce que l\'authentification à deux facteurs (2FA) ?', a: 'L\'authentification à deux facteurs ajoute une deuxième étape de vérification (comme un code d\'une application d\'authentification) après votre mot de passe. Même si votre mot de passe est compromis, un attaquant ne peut pas accéder à votre compte sans le second facteur. Activez le 2FA sur tous les comptes critiques : e-mail, banque, réseaux sociaux.' },
      { q: 'À quelle fréquence faut-il changer son mot de passe ?', a: 'Les recommandations actuelles du NIST (2023) déconseillent les changements périodiques obligatoires — cela conduit à des mots de passe plus faibles (ex. « Motdepasse1 » → « Motdepasse2 »). L\'essentiel : un mot de passe unique par compte, le 2FA activé, et un changement immédiat en cas de fuite de données d\'un service.' },
      { q: 'Qu\'est-ce que l\'entropie d\'un mot de passe ?', a: 'L\'entropie mesure l\'imprévisibilité d\'un mot de passe en bits. Plus elle est élevée, plus il est difficile à craquer. Un mot de passe de 12 caractères avec tous les types de caractères (94 possibles) a environ 79 bits d\'entropie — considéré comme fort. Notre générateur maximise l\'entropie via crypto.getRandomValues.' },
    ],
  },
  lt: {
    description: 'Stiprus slaptažodis yra jūsų pirmoji apsaugos linija nuo neteisėtos prieigos. Šis nemokamas slaptažodžių generatorius internetu siūlo du režimus: „Atsitiktinis" sukuria kriptografiškai saugų slaptažodį iki 64 simbolių naudodamas naršyklės Web Cryptography API — jokie duomenys nepalieka jūsų įrenginio. „Iš rakto žodžio" paverčia jūsų įsimenamą žodį stipriu slaptažodžiu naudodamas leet-speak pakaitalus ir sudėtingumo taisykles.\n\nGalite tinkinti simbolių rinkinį: įtraukti arba neįtraukti didžiąsias raides, skaičius ir simbolius pagal kiekvieno svetainės reikalavimus. Visas generavimas vyksta tik jūsų naršyklėje — jokie slaptažodžiai nesaugomi, neregistruojami ir nesiunčiami į jokį serverį.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Ar šis slaptažodžių generatorius yra saugus?', a: 'Taip. „Atsitiktiniame" režime slaptažodžiai generuojami naudojant Web Cryptography API (crypto.getRandomValues), kurią rekomenduoja NIST standartai. Jokie slaptažodžiai nesiunčiami į serverį — viskas vyksta vietinėje naršyklėje. Galite patikrinti išjungę internetą — įrankis vis tiek veiks.' },
      { q: 'Kaip veikia „Iš rakto žodžio" režimas?', a: 'Įvedate žodį (pvz., „saulutė") ir generatorius taiko leet-speak pakaitalus (e→3, a→4, o→0, i→!, s→$ ir kt.), didžiąsias raides, prideda simbolių ir skaičių. Tas pats rakto žodis visada duoda tą patį slaptažodį — atkuriamą jums, bet atsparų jėgos atakoms.' },
      { q: 'Koks turi būti slaptažodžio ilgis?', a: 'Bent 12 simbolių daugumai paskyrų. Svarbiausioms paskyroms (bankas, el. paštas, debesų saugyklos) naudokite 16+ simbolių. Ilgis yra pagrindinis saugumo veiksnys: 16 simbolių slaptažodis iš mažųjų raidžių sunkiau įveikiamas nei 8 simbolių slaptažodis su visų tipų simboliais.' },
      { q: 'Ar reikia naudoti simbolius slaptažodyje?', a: 'Taip, jei svetainė leidžia. Simboliai dramatiškai padidina galimų kombinacijų skaičių. 12 simbolių slaptažodis su didžiosiomis, mažosiomis, skaičiais ir simboliais turi maždaug 10 000 kartų daugiau kombinacijų. Jei svetainė draudžia simbolius, kompensuokite ilgiu — naudokite 16+ simbolių.' },
      { q: 'Kas yra stiprus slaptažodis?', a: 'Stiprus slaptažodis yra bent 12 simbolių ilgio, turi didžiąsias ir mažąsias raides, skaičius ir simbolius, ir nėra pagrįstas žodyno žodžiais, asmeniniais duomenimis (vardas, gimimo data) ar nuspėjamais šablonais kaip „Slaptazodis123!". Kiekviena paskyra turi turėti unikalų slaptažodį.' },
      { q: 'Ar verta naudoti slaptažodžių tvarkyklę?', a: 'Taip — slaptažodžių tvarkyklė (Bitwarden, 1Password, KeePass) leidžia saugoti unikalius stiprius slaptažodžius kiekvienai paskyrai jų neįsiminant. Reikia atsiminti tik vieną pagrindinį slaptažodį. Bitwarden yra nemokamas ir atvirojo kodo.' },
      { q: 'Ar saugu naudoti internetinį slaptažodžių generatorių?', a: 'Taip, jei generatorius veikia visiškai naršyklėje ir nesiunčia duomenų į serverį. Šis įrankis naudoja crypto.getRandomValues ir atlieka visas operacijas vietinėje naršyklėje — jokie slaptažodžiai neplukdomi ir nesaugomi. Norėdami didesnio saugumo, prieš generuodami atjunkite internetą.' },
      { q: 'Kas yra dviejų veiksnių autentifikacija (2FA)?', a: 'Dviejų veiksnių autentifikacija prideda antrą tikrinimo žingsnį (pvz., kodą iš autentifikatoriaus programos) po slaptažodžio įvedimo. Net jei slaptažodis nutekėjo, užpuolikas negali patekti į paskyrą be antrojo veiksnio. Įjunkite 2FA visose svarbiose paskyrose: el. paštas, bankas, socialiniai tinklai.' },
      { q: 'Kaip dažnai reikia keisti slaptažodį?', a: 'Dabartinės NIST (2023) rekomendacijos nepataria priverstinai periodiškai keisti slaptažodžių — tai veda prie silpnesnių slaptažodžių (pvz., „Slaptazodis1" → „Slaptazodis2"). Svarbiausia: unikalus slaptažodis kiekvienai svetainei, įjungtas 2FA ir nedelsiant pakeistas slaptažodis po duomenų nutekėjimo.' },
      { q: 'Kas yra slaptažodžio entropija?', a: 'Entropija matuoja slaptažodžio nenuspėjamumą bitais. Kuo didesnė — tuo sunkiau įveikti. 12 simbolių slaptažodis su visų tipų simboliais (94 galimi) turi apie 79 entropijos bitus — laikomas stipriu. 16 simbolių versija pasiekia ~105 bitus. Mūsų generatorius maksimaliai padidina entropiją naudodamas crypto.getRandomValues.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/tools/password-generator') };
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
    url: `https://www.utilixi.com/${locale}/tools/password-generator`,
    applicationCategory: 'SecurityApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <PasswordGenerator locale={locale} />
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
