import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import ColorConverter from './ColorConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/converter/units', label: 'Unit Converter' }, { href: '/converter/clothing-size', label: 'Clothing Size Converter' }, { href: '/calculator/engineering', label: 'Engineering Calculator' }, { href: '/calculator/basic', label: 'Basic Calculator' }, { href: '/converter/grade-system', label: 'Grade System Converter' }],
  ru: [{ href: '/converter/units', label: 'Конвертер единиц' }, { href: '/converter/clothing-size', label: 'Конвертер размеров одежды' }, { href: '/calculator/engineering', label: 'Инженерный калькулятор' }, { href: '/calculator/basic', label: 'Простой калькулятор' }, { href: '/converter/grade-system', label: 'Конвертер систем оценок' }],
  uk: [{ href: '/converter/units', label: 'Конвертер одиниць' }, { href: '/converter/clothing-size', label: 'Конвертер розмірів одягу' }, { href: '/calculator/engineering', label: 'Інженерний калькулятор' }, { href: '/calculator/basic', label: 'Простий калькулятор' }, { href: '/converter/grade-system', label: 'Конвертер систем оцінок' }],
  fr: [{ href: '/converter/units', label: 'Convertisseur d\'unités' }, { href: '/converter/clothing-size', label: 'Convertisseur de tailles' }, { href: '/calculator/engineering', label: 'Calculatrice scientifique' }, { href: '/calculator/basic', label: 'Calculatrice basique' }, { href: '/converter/grade-system', label: 'Convertisseur de notes' }],
  lt: [{ href: '/converter/units', label: 'Vienetų keitiklis' }, { href: '/converter/clothing-size', label: 'Drabužių dydžių keitiklis' }, { href: '/calculator/engineering', label: 'Inžinerinis skaičiuotuvas' }, { href: '/calculator/basic', label: 'Paprastas skaičiuotuvas' }, { href: '/converter/grade-system', label: 'Pažymių sistemų konverteris' }],
};

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Color Converter — HEX to RGB, HSL Online Tool',
    description: 'Free online color converter. Convert HEX to RGB, RGB to HEX, and HSL instantly. Visual color picker included. Copy any format with one click — perfect for web developers and designers.',
    h1: 'Color Converter HEX ↔ RGB ↔ HSL',
    subtitle: 'Convert colors between HEX, RGB, and HSL formats instantly — with a visual color picker.',
  },
  ru: {
    title: 'Конвертер цветов — HEX в RGB, HSL онлайн',
    description: 'Бесплатный онлайн-конвертер цветов. Мгновенно переводите цвета между форматами HEX, RGB и HSL. Визуальный выбор цвета. Копируйте любой формат одним кликом.',
    h1: 'Конвертер цветов HEX ↔ RGB ↔ HSL',
    subtitle: 'Мгновенно переводите цвета между форматами HEX, RGB и HSL с визуальным выбором цвета.',
  },
  uk: {
    title: 'Конвертер кольорів — HEX у RGB, HSL онлайн',
    description: 'Безкоштовний онлайн-конвертер кольорів. Миттєво конвертуйте кольори між форматами HEX, RGB та HSL. Візуальний вибір кольору. Копіюйте будь-який формат одним кліком.',
    h1: 'Конвертер кольорів HEX ↔ RGB ↔ HSL',
    subtitle: 'Миттєво конвертуйте кольори між форматами HEX, RGB і HSL з візуальним вибором кольору.',
  },
  fr: {
    title: 'Convertisseur Couleur HEX RVB HSL — Outil gratuit en ligne',
    description: 'Convertisseur de couleurs gratuit. Convertissez instantanément HEX en RVB, RVB en HEX, et HSL. Sélecteur de couleur visuel inclus. Copiez n\'importe quel format en un clic — pour développeurs web et designers.',
    h1: 'Convertisseur de couleurs HEX ↔ RVB ↔ HSL',
    subtitle: 'Convertissez les couleurs entre les formats HEX, RVB et HSL instantanément — avec sélecteur visuel inclus.',
  },
  lt: {
    title: 'Spalvų Keitiklis — HEX į RGB, HSL internete',
    description: 'Nemokamas spalvų keitiklis internete. Akimirksniu konvertuokite HEX į RGB, RGB į HEX ir HSL. Vizualinis spalvų parinkiklis. Nukopijuokite bet kurį formatą vienu paspaudimu.',
    h1: 'Spalvų keitiklis HEX ↔ RGB ↔ HSL',
    subtitle: 'Akimirksniu konvertuokite spalvas tarp HEX, RGB ir HSL formatų — su vizualiniu spalvų parinkikliu.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Enter a color in HEX, RGB, or HSL format — the converter instantly updates all three formats simultaneously. Use the native color picker on the HEX tab to visually choose a color. Click "Copy" next to any format to copy it to your clipboard. Supports both 3-digit (#ABC) and 6-digit (#AABBCC) HEX codes.\n\nThis tool is used by web developers, UI/UX designers, and anyone working with CSS, HTML, Figma, or design systems. Converting between HEX, RGB, and HSL is a daily need when building websites or adjusting brand color palettes. All conversions happen instantly in your browser — no server calls, no data sent.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is a HEX color code?', a: 'A HEX color is a 6-digit hexadecimal value (e.g. #1565C0) representing the red, green, and blue components of a color. Each pair of digits ranges from 00 to FF (0–255 in decimal). HEX is the most common color format in CSS, HTML, and design tools like Figma and Adobe XD.' },
      { q: 'What is the difference between RGB and HSL?', a: 'RGB describes a color by its red, green, and blue light components (0–255 each). HSL (Hue, Saturation, Lightness) is more intuitive for designers: hue is the color wheel angle (0–360°), saturation is the intensity (0–100%), and lightness controls brightness (0–100%). HSL is easier to adjust when you want to make a color lighter, darker, or more/less vivid.' },
      { q: 'How do I convert HEX to RGB?', a: 'Split the 6-character HEX into three pairs: first pair = Red, second = Green, third = Blue. Convert each pair from hexadecimal to decimal. For example: #1565C0 → 15=21, 65=101, C0=192 → RGB(21, 101, 192). This converter does it automatically — type in any field and all others update instantly.' },
      { q: 'Can I use a 3-digit HEX code?', a: 'Yes. A 3-digit code like #1AC is shorthand for #11AACC, where each digit is doubled. This converter accepts both 3-digit and 6-digit HEX codes. Note that not all tools support 3-digit HEX in all contexts — if in doubt, use the 6-digit form.' },
      { q: 'What are HEX colors used for?', a: 'HEX colors are used in CSS (color: #1565C0), HTML attributes, SVG, and virtually all design tools (Figma, Adobe XD, Sketch, Photoshop, Canva). HEX is compact and human-readable, making it the default format for web design. RGB is preferred in CSS for RGBA (with alpha/transparency) and in programmatic color manipulation.' },
      { q: 'How do I find the HEX code of a color in Figma?', a: 'In Figma: select the element, open the Fill panel on the right sidebar, click the color swatch — the HEX code is shown and can be copied directly. You can also use the color picker eyedropper to sample any on-screen color. In VS Code: install the "Color Highlight" extension to see color swatches next to HEX/RGB values in your CSS files.' },
      { q: 'What is RGBA and how does it differ from RGB?', a: 'RGBA adds an alpha (opacity) channel to RGB: RGBA(21, 101, 192, 0.8) means the same color at 80% opacity. The alpha value ranges from 0 (fully transparent) to 1 (fully opaque). This converter handles RGB without alpha — for RGBA, simply use the RGB values shown here and add your desired alpha value in CSS: rgba(R, G, B, alpha).' },
      { q: 'How do I convert HSL to HEX?', a: 'HSL to HEX conversion is done mathematically. First convert HSL → RGB using the standard formula (H/60, saturation and lightness calculations), then convert each RGB component to its 2-digit HEX equivalent. This tool handles the full conversion chain automatically — enter an HSL value and the HEX output updates instantly.' },
      { q: 'What are web-safe colors?', a: 'Web-safe colors are a set of 216 colors (6 values per channel: 00, 33, 66, 99, CC, FF) that display consistently across all older monitors and browsers. Modern displays can render over 16 million colors, making the web-safe palette largely obsolete. You can use any HEX/RGB/HSL value in modern web design without restriction.' },
      { q: 'How are colors defined in CSS?', a: 'CSS supports multiple color formats: HEX (#1565C0), RGB (rgb(21, 101, 192)), RGBA (rgba(21, 101, 192, 0.8)), HSL (hsl(213, 80%, 42%)), HSLA (with alpha), named colors (blue, red, etc.), and the newer oklch() and color() functions. HEX and RGB are most widely supported. HSL is preferred when you need to programmatically adjust lightness or saturation in CSS custom properties.' },
    ],
  },
  ru: {
    description: 'Введите цвет в формате HEX, RGB или HSL — конвертер мгновенно обновляет все три формата одновременно. На вкладке HEX доступен нативный выбор цвета в браузере. Кнопка «Копировать» рядом с каждым форматом копирует значение в буфер обмена. Поддерживаются как 3-символьные (#ABC), так и 6-символьные (#AABBCC) HEX-коды.\n\nИнструмент используется веб-разработчиками, UI/UX-дизайнерами и всеми, кто работает с CSS, HTML, Figma или дизайн-системами. Конвертация между HEX, RGB и HSL — ежедневная задача при разработке сайтов и работе с палитрами бренда. Все вычисления происходят мгновенно в браузере.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое HEX-код цвета?', a: 'HEX-цвет — шестизначное шестнадцатеричное значение (например, #1565C0), кодирующее красный, зелёный и синий компоненты. Каждая пара символов — от 00 до FF (0–255 в десятичной). HEX — самый распространённый формат в CSS, HTML и дизайн-инструментах.' },
      { q: 'В чём разница между RGB и HSL?', a: 'RGB описывает цвет через интенсивность красного, зелёного и синего каналов (0–255 каждый). HSL (оттенок, насыщенность, светлота) интуитивнее для дизайнеров: оттенок — угол 0–360°, насыщенность — интенсивность 0–100%, светлота — яркость 0–100%. HSL удобен когда нужно сделать цвет светлее, темнее или изменить насыщенность.' },
      { q: 'Как перевести HEX в RGB?', a: 'Разделите 6-символьный HEX на три пары: первая — красный, вторая — зелёный, третья — синий. Переведите каждую пару из шестнадцатеричной в десятичную. Например: #1565C0 → 15=21, 65=101, C0=192 → RGB(21, 101, 192). Конвертер делает это автоматически — введите значение в любое поле.' },
      { q: 'Поддерживается ли трёхсимвольный HEX?', a: 'Да. Запись #1AC равнозначна #11AACC — каждый символ удваивается. Конвертер принимает оба формата. Рекомендую использовать 6-символьный вариант для совместимости с максимальным числом инструментов.' },
      { q: 'Где используются HEX-цвета?', a: 'HEX используется в CSS (color: #1565C0), HTML, SVG и большинстве дизайн-инструментов (Figma, Adobe XD, Sketch, Photoshop). HEX компактен и читаем, что делает его форматом по умолчанию для веб-дизайна. RGB предпочтителен для RGBA (с прозрачностью) и при программном управлении цветом.' },
      { q: 'Как найти HEX-код цвета в Figma?', a: 'В Figma: выберите элемент, откройте панель Fill справа, нажмите на цветовой прямоугольник — HEX-код будет показан и его можно скопировать. Пипетка позволяет снять цвет с любого места экрана. В VS Code: установите расширение "Color Highlight" — оно отображает цветные квадратики рядом с HEX/RGB в CSS-файлах.' },
      { q: 'Что такое RGBA?', a: 'RGBA добавляет к RGB канал прозрачности: RGBA(21, 101, 192, 0.8) — тот же цвет с непрозрачностью 80%. Значение alpha от 0 (полностью прозрачный) до 1 (непрозрачный). Данный конвертер работает с RGB без alpha — для RGBA возьмите RGB-значения отсюда и добавьте нужное alpha в CSS: rgba(R, G, B, alpha).' },
      { q: 'Как перевести HSL в HEX?', a: 'Конвертация HSL → HEX проходит через промежуточный RGB. Сначала вычисляется RGB по формуле HSL-to-RGB, затем каждый компонент переводится в двузначный шестнадцатеричный. Этот конвертер делает всё автоматически — введите HSL, и HEX обновится мгновенно.' },
      { q: 'Что такое веб-безопасные цвета?', a: 'Веб-безопасные цвета — набор из 216 цветов (6 значений на канал: 00, 33, 66, 99, CC, FF), гарантированно отображавшихся одинаково на старых мониторах. Современные дисплеи поддерживают более 16 млн цветов, поэтому веб-безопасная палитра потеряла актуальность. Используйте любые HEX/RGB/HSL без ограничений.' },
      { q: 'Как задаются цвета в CSS?', a: 'CSS поддерживает: HEX (#1565C0), RGB (rgb(21, 101, 192)), RGBA, HSL (hsl(213, 80%, 42%)), HSLA, именованные цвета (blue, red) и новые форматы oklch(). HEX и RGB наиболее совместимы. HSL удобен для программной настройки светлоты и насыщенности через CSS custom properties.' },
    ],
  },
  uk: {
    description: 'Введіть колір у форматі HEX, RGB або HSL — конвертер миттєво оновлює всі три формати одночасно. На вкладці HEX доступний нативний вибір кольору в браузері. Кнопка «Копіювати» поруч з кожним форматом копіює значення в буфер обміну. Підтримуються як 3-символьні (#ABC), так і 6-символьні (#AABBCC) HEX-коди.\n\nІнструмент використовується веб-розробниками, UI/UX-дизайнерами та всіма, хто працює з CSS, HTML, Figma або дизайн-системами. Конвертація між HEX, RGB та HSL — щоденне завдання при розробці сайтів. Всі обчислення відбуваються миттєво в браузері.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке HEX-код кольору?', a: 'HEX-колір — шестизначне шістнадцяткове значення (наприклад, #1565C0), що кодує червоний, зелений та синій компоненти. Кожна пара символів — від 00 до FF (0–255 у десятковій). HEX — найпоширеніший формат у CSS, HTML та дизайн-інструментах.' },
      { q: 'Яка різниця між RGB і HSL?', a: 'RGB описує колір через інтенсивність червоного, зеленого та синього каналів (0–255). HSL (відтінок, насиченість, світлість) інтуїтивніший для дизайнерів: відтінок — кут 0–360°, насиченість — 0–100%, світлість — 0–100%. HSL зручний коли потрібно зробити колір світлішим, темнішим або змінити насиченість.' },
      { q: 'Як перевести HEX у RGB?', a: 'Розділіть 6-символьний HEX на три пари: перша — червоний, друга — зелений, третя — синій. Переведіть кожну пару з шістнадцяткової в десяткову. Наприклад: #1565C0 → 15=21, 65=101, C0=192 → RGB(21, 101, 192). Конвертер робить це автоматично.' },
      { q: 'Чи підтримується трисимвольний HEX?', a: 'Так. Запис #1AC рівнозначний #11AACC — кожен символ подвоюється. Конвертер приймає обидва формати. Для максимальної сумісності рекомендую використовувати 6-символьний варіант.' },
      { q: 'Де використовуються HEX-кольори?', a: 'HEX використовується у CSS (color: #1565C0), HTML, SVG та більшості дизайн-інструментів (Figma, Adobe XD, Sketch, Photoshop). HEX компактний і читаний. RGB кращий для RGBA (з прозорістю) та програмного керування кольором.' },
      { q: 'Як знайти HEX-код кольору у Figma?', a: 'У Figma: виберіть елемент, відкрийте панель Fill праворуч, натисніть на кольоровий прямокутник — HEX-код буде показаний і його можна скопіювати. Піпетка дозволяє зняти колір з будь-якого місця екрана. У VS Code: встановіть розширення "Color Highlight" для відображення кольорових квадратиків поруч з кодами.' },
      { q: 'Що таке RGBA?', a: 'RGBA додає до RGB канал прозорості: RGBA(21, 101, 192, 0.8) — той самий колір з непрозорістю 80%. Значення alpha від 0 (повністю прозорий) до 1 (непрозорий). Для RGBA візьміть RGB-значення звідси і додайте потрібне alpha у CSS: rgba(R, G, B, alpha).' },
      { q: 'Як перевести HSL у HEX?', a: 'Конвертація HSL → HEX проходить через проміжний RGB. Спочатку обчислюється RGB за формулою HSL-to-RGB, потім кожен компонент переводиться у двозначний шістнадцятковий. Цей конвертер робить все автоматично.' },
      { q: 'Що таке веб-безпечні кольори?', a: 'Веб-безпечні кольори — набір з 216 кольорів, що гарантовано відображались однаково на старих моніторах. Сучасні дисплеї підтримують понад 16 млн кольорів, тому веб-безпечна палітра втратила актуальність. Використовуйте будь-які HEX/RGB/HSL без обмежень.' },
      { q: 'Як задаються кольори у CSS?', a: 'CSS підтримує: HEX (#1565C0), RGB (rgb(21, 101, 192)), RGBA, HSL (hsl(213, 80%, 42%)), HSLA, іменовані кольори (blue, red) та нові формати oklch(). HEX і RGB найбільш сумісні. HSL зручний для програмного налаштування світлості та насиченості через CSS custom properties.' },
    ],
  },
  fr: {
    description: 'Entrez une couleur en format HEX, RVB ou HSL — le convertisseur met instantanément à jour les trois formats. Utilisez le sélecteur de couleur natif dans l\'onglet HEX pour choisir visuellement une couleur. Le bouton « Copier » copie la valeur dans le presse-papier. Prend en charge les codes HEX à 3 chiffres (#ABC) et 6 chiffres (#AABBCC).\n\nCet outil est utilisé par les développeurs web, les designers UI/UX et toute personne travaillant avec CSS, HTML, Figma ou des systèmes de design. La conversion entre HEX, RVB et HSL est une tâche quotidienne en développement web. Toutes les conversions s\'effectuent instantanément dans votre navigateur — aucune donnée n\'est envoyée.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce qu\'un code couleur HEX ?', a: 'Une couleur HEX est une valeur hexadécimale à 6 chiffres (ex. #1565C0) représentant les composantes rouge, vert et bleu. Chaque paire de chiffres va de 00 à FF (0–255 en décimal). HEX est le format de couleur le plus utilisé en CSS, HTML et dans les outils de design comme Figma ou Adobe XD.' },
      { q: 'Quelle est la différence entre RVB et HSL ?', a: 'RVB (Rouge, Vert, Bleu) décrit une couleur par l\'intensité de ses composantes lumineuses (0–255). HSL (Teinte, Saturation, Luminosité) est plus intuitif pour les designers : la teinte est l\'angle sur le cercle chromatique (0–360°), la saturation l\'intensité (0–100%), la luminosité contrôle la clarté (0–100%). HSL est plus pratique pour ajuster la teinte ou l\'éclat sans recalculer les trois composantes.' },
      { q: 'Comment convertir HEX en RVB ?', a: 'Divisez les 6 caractères HEX en 3 paires : rouge (1re paire), vert (2e), bleu (3e). Convertissez chaque paire de l\'hexadécimal au décimal. Exemple : #1565C0 → 15=21, 65=101, C0=192 → RVB(21, 101, 192). Ce convertisseur le fait automatiquement — tapez dans n\'importe quel champ.' },
      { q: 'Puis-je utiliser un code HEX à 3 chiffres ?', a: 'Oui. #1AC est l\'abréviation de #11AACC — chaque chiffre est doublé. Ce convertisseur accepte les deux formats. Pour une compatibilité maximale, utilisez de préférence le format à 6 chiffres.' },
      { q: 'À quoi servent les couleurs HEX ?', a: 'HEX est utilisé dans CSS (color: #1565C0), HTML, SVG et la quasi-totalité des outils de design (Figma, Adobe XD, Sketch, Photoshop, Canva). C\'est le format par défaut en web design. RVB est préféré pour RGBA (avec transparence) et pour la manipulation programmatique des couleurs.' },
      { q: 'Comment trouver le code HEX d\'une couleur dans Figma ?', a: 'Dans Figma : sélectionnez l\'élément, ouvrez le panneau Fill à droite, cliquez sur le carré de couleur — le code HEX s\'affiche et peut être copié directement. La pipette (eyedropper) permet de capturer la couleur de n\'importe quel élément à l\'écran. Dans VS Code, l\'extension "Color Highlight" affiche un aperçu des couleurs à côté de chaque code HEX/RVB dans vos fichiers CSS.' },
      { q: 'Qu\'est-ce que RGBA ?', a: 'RGBA ajoute un canal alpha (opacité) à RVB : RGBA(21, 101, 192, 0.8) représente la même couleur à 80 % d\'opacité. La valeur alpha va de 0 (totalement transparent) à 1 (totalement opaque). Ce convertisseur traite le RVB sans canal alpha — pour RGBA, utilisez les valeurs RVB obtenues ici et ajoutez votre alpha dans CSS : rgba(R, G, B, alpha).' },
      { q: 'Comment convertir HSL en HEX ?', a: 'La conversion HSL → HEX passe par une étape intermédiaire RVB. D\'abord, HSL est converti en RVB selon la formule standard. Ensuite, chaque composante RVB est convertie en son équivalent hexadécimal à 2 chiffres. Ce convertisseur gère automatiquement toute la chaîne de conversion.' },
      { q: 'Qu\'est-ce que les couleurs web-safe ?', a: 'Les couleurs web-safe forment un ensemble de 216 couleurs (6 valeurs par canal : 00, 33, 66, 99, CC, FF) qui s\'affichaient de façon identique sur les anciens moniteurs. Les écrans modernes affichent plus de 16 millions de couleurs, rendant cette palette largement obsolète. Vous pouvez utiliser n\'importe quelle valeur HEX/RVB/HSL sans restriction.' },
      { q: 'Comment les couleurs sont-elles définies en CSS ?', a: 'CSS prend en charge : HEX (#1565C0), RVB (rgb(21, 101, 192)), RGBA, HSL (hsl(213, 80%, 42%)), HSLA, couleurs nommées (blue, red), et les nouveaux formats oklch() et color(). HEX et RVB sont les plus largement supportés. HSL est préférable pour ajuster programmatiquement la luminosité ou la saturation via des variables CSS personnalisées.' },
    ],
  },
  lt: {
    description: 'Įveskite spalvą HEX, RGB arba HSL formatu — keitiklis iš karto atnaujina visus tris formatus vienu metu. HEX skirtuke naudokite naršyklės spalvų parinkiklį vizualiam spalvos pasirinkimui. Mygtukas „Kopijuoti" nukopijuoja reikšmę į iškarpinę. Palaiko tiek 3 skaitmenų (#ABC), tiek 6 skaitmenų (#AABBCC) HEX kodus.\n\nŠis įrankis naudojamas žiniatinklio kūrėjų, UI/UX dizainerių ir visų, dirbančių su CSS, HTML, Figma ar dizaino sistemomis. HEX, RGB ir HSL konvertavimas yra kasdienis poreikis kuriant svetaines. Visi skaičiavimai atliekami naršyklėje — jokie duomenys nesiunčiami.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra HEX spalvos kodas?', a: 'HEX spalva — šešiaženklis šešioliktainis kodas (pvz., #1565C0), vaizduojantis raudoną, žalią ir mėlyną komponentus. Kiekviena pora nuo 00 iki FF atitinka 0–255 dešimtainėje. HEX yra dažniausiai naudojamas spalvų formatas CSS, HTML ir dizaino įrankiuose.' },
      { q: 'Koks skirtumas tarp RGB ir HSL?', a: 'RGB aprašo spalvą per raudonos, žalios ir mėlynos šviesos intensyvumą (0–255). HSL (atspalvis, sodrumas, šviesumas) intuityvesnis dizaineriams: atspalvis — kampas 0–360°, sodrumas — intensyvumas 0–100%, šviesumas — ryškumas 0–100%. HSL patogus norint padaryti spalvą šviesesnę, tamsesnę ar pakeisti jos sodrumo lygį.' },
      { q: 'Kaip konvertuoti HEX į RGB?', a: 'Padalinkite 6 simbolių HEX į tris poras: pirma — raudona, antra — žalia, trečia — mėlyna. Konvertuokite kiekvieną porą iš šešioliktainės į dešimtainę. Pavyzdžiui: #1565C0 → 15=21, 65=101, C0=192 → RGB(21, 101, 192). Šis keitiklis tai daro automatiškai.' },
      { q: 'Ar galima naudoti 3 skaitmenų HEX kodą?', a: 'Taip. #1AC yra sutrumpintas #11AACC variantas, kur kiekvienas skaitmuo padvigubinamas. Šis keitiklis priima abu formatus. Maksimaliam suderinamumui rekomenduojama naudoti 6 skaitmenų formatą.' },
      { q: 'Kur naudojamos HEX spalvos?', a: 'HEX naudojamas CSS (color: #1565C0), HTML, SVG ir daugelyje dizaino įrankių (Figma, Adobe XD, Sketch, Photoshop). HEX glaustas ir lengvai skaitomas. RGB tinkamesnis RGBA (su skaidrumu) ir programiniam spalvų valdymui.' },
      { q: 'Kaip rasti HEX kodą Figma?', a: 'Figma: pasirinkite elementą, atidarykite Fill skydelį dešinėje, spustelėkite spalvos kvadratą — HEX kodas bus parodytas ir galėsite jį nukopijuoti. Pipetė leidžia paimti spalvą iš bet kurios ekrano vietos. VS Code: įdiekite "Color Highlight" plėtinį, kad matytumėte spalvų peržiūras šalia HEX/RGB kodų CSS failuose.' },
      { q: 'Kas yra RGBA?', a: 'RGBA prideda alpha (skaidrumo) kanalą prie RGB: RGBA(21, 101, 192, 0.8) — ta pati spalva 80 % neskaidrumu. Alpha reikšmė nuo 0 (visiškai skaidri) iki 1 (visiškai neskaidri). Šis keitiklis apdoroja RGB be alpha — RGBA naudokite čia pateiktas RGB reikšmes ir pridėkite norimą alpha CSS: rgba(R, G, B, alpha).' },
      { q: 'Kaip konvertuoti HSL į HEX?', a: 'HSL → HEX konvertavimas vyksta per tarpinį RGB žingsnį. Pirmiausia HSL konvertuojamas į RGB pagal standartinę formulę, tada kiekvienas RGB komponentas paverčiamas dviženkle šešioliktaine verte. Šis keitiklis automatiškai atlieka visą konvertavimo grandinę.' },
      { q: 'Kas yra saugios žiniatinklio spalvos?', a: 'Saugios žiniatinklio spalvos — 216 spalvų rinkinys (6 vertės kiekvienam kanalui: 00, 33, 66, 99, CC, FF), vienodai atrodančios senuose monitoriuose. Modernūs ekranai palaiko daugiau nei 16 mln spalvų, todėl ši paletė iš esmės nebeaktuali. Galite naudoti bet kokias HEX/RGB/HSL vertes be apribojimų.' },
      { q: 'Kaip CSS apibrėžia spalvas?', a: 'CSS palaiko: HEX (#1565C0), RGB (rgb(21, 101, 192)), RGBA, HSL (hsl(213, 80%, 42%)), HSLA, pavadintas spalvas (blue, red) ir naujus formatus oklch(). HEX ir RGB labiausiai palaikomi. HSL patogus programiškai koreguojant šviesumą ar sodrumo lygį per CSS kintamuosius.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/converter/color', meta);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ColorConverterPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/converter/color`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
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
        {meta.subtitle && <p className={styles.page__subtitle}>{meta.subtitle}</p>}
        <ToolActions />
        <RelatedTools locale={locale} tools={related} />
        <ColorConverter locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
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
