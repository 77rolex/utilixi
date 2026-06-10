import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import CelticZodiacCalculator from './CelticZodiacCalculator';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Celtic Zodiac Calculator — Find Your Tree Sign by Birthday', description: 'Discover your Celtic zodiac tree sign by birth date. Based on the ancient Ogham tree alphabet, get your druidic symbol, qualities and personality description. Free Celtic astrology tool.', h1: 'Celtic Zodiac Calculator' },
  ru: { title: 'Кельтский зодиак по дате рождения — дерево-символ', description: 'Определите своё дерево-символ по кельтскому зодиаку по дате рождения. Основано на древнем алфавите Огам — получите свои черты характера и описание. Бесплатно.', h1: 'Кельтский зодиак' },
  uk: { title: 'Кельтський зодіак за датою народження — дерево-символ', description: 'Визначте своє дерево-символ за кельтським зодіаком за датою народження. Засноване на давньому алфавіті Огам — отримайте риси характеру та опис. Безкоштовно.', h1: 'Кельтський зодіак' },
  fr: { title: 'Zodiaque Celtique — Trouvez votre Arbre par date de naissance', description: 'Découvrez votre signe arbre du zodiaque celtique par date de naissance. Basé sur l\'alphabet oghamique des druides — obtenez votre symbole, qualités et description. Gratuit.', h1: 'Zodiaque Celtique' },
  lt: { title: 'Keltų zodiako skaičiuotuvas — raskite savo medžio ženklą', description: 'Sužinokite savo keltų zodiako medžio ženklą pagal gimimo datą. Pagrįstas senoviniu Ogham medžių alfabetu — gaukite savo simbolį, savybes ir aprašymą. Nemokama.', h1: 'Keltų zodiako skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'The Celtic zodiac is an ancient astrological system rooted in the Druidic tradition of the British Isles and Western Europe. Unlike the Western zodiac\'s 12 signs based on solar months, the Celtic tree calendar features 13 lunar months, each associated with a sacred tree from the Ogham alphabet — the earliest written script of the Celtic peoples. The 13 trees are: Birch, Rowan, Ash, Alder, Willow, Hawthorn, Oak, Holly, Hazel, Vine, Ivy, Reed and Elder. Each tree sign spans approximately 28 days and carries the spiritual and symbolic qualities that the Druids associated with that tree species — qualities observed across centuries of living alongside and venerating these trees as sacred gateways to the otherworld.\n\nDruids held trees in the highest reverence, seeing them as living embodiments of wisdom, protection and cosmic connection. Your Celtic tree sign reveals the deeper, often hidden qualities of your nature — the particular gift or challenge that your soul carries into this life. Combined with the Western sun sign and other astrological tools, the Celtic zodiac adds a rich, nature-based dimension to self-understanding. Enter your birth date to discover your tree sign, its Ogham symbol, its core qualities and what the ancient Druidic tradition says about the path of those born under it.',
    faqTitle: 'Frequently Asked Questions about the Celtic Zodiac',
    faqs: [
      { q: 'What is the Celtic zodiac?', a: 'The Celtic zodiac is a Druidic astrological system based on 13 sacred trees from the Ogham alphabet, each associated with a lunar month of approximately 28 days. It originates from the ancient Celtic traditions of the British Isles and Western Europe and emphasises the spiritual qualities of nature.' },
      { q: 'How many signs are in the Celtic zodiac?', a: 'There are 13 signs in the Celtic zodiac, one for each lunar month of the year. The 13 tree signs are: Birch, Rowan, Ash, Alder, Willow, Hawthorn, Oak, Holly, Hazel, Vine, Ivy, Reed and Elder.' },
      { q: 'What is the Ogham alphabet?', a: 'Ogham is the earliest known written script used by Celtic peoples, dating back to the 4th–6th centuries AD. It consists of a series of strokes and notches carved on stone or wood. Each letter corresponds to a tree, plant or shrub, and the system forms the basis of the Celtic tree zodiac.' },
      { q: 'What is the Oak tree sign known for?', a: 'Oak (Duir, June 10 – July 7) is one of the most powerful signs in the Celtic zodiac. Those born under the Oak are natural protectors, known for strength, endurance, wisdom and a sense of duty. They are often pillars of their communities — stable, generous and deeply connected to tradition.' },
      { q: 'What is the Birch tree sign?', a: 'Birch (Beth, December 24 – January 20) is the first sign of the Celtic tree calendar. It represents new beginnings, drive and resilience. People born under Birch are ambitious, adaptable and deeply motivated — they pioneer new paths and inspire others with their energy and determination.' },
      { q: 'Is the Celtic zodiac related to the Western zodiac?', a: 'The Celtic and Western zodiacs are separate systems developed independently. The Western zodiac is based on the solar year and ecliptic constellations, while the Celtic system is based on the lunar year and sacred trees. However, many people use both systems together for a more complete picture.' },
      { q: 'What is the most rare Celtic zodiac sign?', a: 'The Vine (Muin, September 2 – September 29) and the Reed (Ngetal, October 28 – November 24) signs are sometimes considered among the rarer or more mysterious Celtic signs. However, all 13 signs cover roughly equal portions of the year, so none is dramatically rarer than another.' },
      { q: 'What does the Elder tree sign represent?', a: 'Elder (Ruis, November 25 – December 23) is the last sign of the Celtic tree calendar. Elder people are known for their depth, introspection, free spirit and willingness to push boundaries. They are the seekers and truth-tellers of the Celtic zodiac, often misunderstood but deeply insightful.' },
      { q: 'Can the Celtic zodiac be used for compatibility?', a: 'Yes. In Celtic astrological tradition, certain tree signs are considered especially harmonious together. For example, Oak and Ash are both strong, grounded signs that complement each other. Hazel and Alder share intellectual and creative compatibility. Many practitioners read the elemental associations of trees for compatibility guidance.' },
      { q: 'How accurate is the Celtic zodiac?', a: 'Like all astrological systems, the Celtic zodiac is a symbolic and interpretive tool rather than a scientifically validated system. Its value lies in providing a framework for self-reflection, drawing on centuries of accumulated symbolic wisdom about human nature. Whether it resonates with you personally is the most meaningful test.' },
    ],
  },
  ru: {
    description: 'Кельтский зодиак — древняя астрологическая система, уходящая корнями в друидическую традицию Британских островов и Западной Европы. В отличие от западного зодиака с 12 знаками, основанными на солнечных месяцах, кельтский календарь деревьев имеет 13 лунных месяцев, каждый из которых связан со священным деревом из алфавита Огам — древнейшего письма кельтских народов. 13 деревьев: Берёза, Рябина, Ясень, Ольха, Ива, Боярышник, Дуб, Падуб, Лещина, Виноград, Плющ, Тростник и Бузина.\n\nДруиды чтили деревья как живые воплощения мудрости, защиты и космической связи. Ваш кельтский знак дерева раскрывает глубинные качества вашей натуры — особый дар или вызов, который ваша душа несёт в этой жизни. В сочетании с западным солнечным знаком и другими астрологическими инструментами кельтский зодиак добавляет богатое, природное измерение к самопознанию.',
    faqTitle: 'Часто задаваемые вопросы о кельтском зодиаке',
    faqs: [
      { q: 'Что такое кельтский зодиак?', a: 'Кельтский зодиак — друидическая астрологическая система, основанная на 13 священных деревьях из алфавита Огам, каждое из которых связано с лунным месяцем примерно в 28 дней. Он берёт начало в древних кельтских традициях Британских островов и подчёркивает духовные качества природы.' },
      { q: 'Сколько знаков в кельтском зодиаке?', a: 'В кельтском зодиаке 13 знаков, по одному на каждый лунный месяц года. 13 знаков деревьев: Берёза, Рябина, Ясень, Ольха, Ива, Боярышник, Дуб, Падуб, Лещина, Виноград, Плющ, Тростник и Бузина.' },
      { q: 'Что такое алфавит Огам?', a: 'Огам — древнейшая известная письменность кельтских народов, датируемая IV–VI веками нашей эры. Каждая буква соответствует дереву, растению или кусту и составляет основу кельтского зодиака деревьев.' },
      { q: 'Какие качества у знака Дуба?', a: 'Дуб (Дуйр, 10 июня – 7 июля) — один из самых сильных знаков кельтского зодиака. Рождённые под Дубом — природные защитники, известные силой, выносливостью, мудростью и чувством долга. Они часто являются столпами своих общин.' },
      { q: 'Что символизирует знак Берёзы?', a: 'Берёза (Бет, 24 декабря – 20 января) — первый знак кельтского календаря деревьев. Она символизирует новые начинания, стремление и стойкость. Рождённые под Берёзой амбициозны, адаптивны и глубоко мотивированы.' },
      { q: 'Связан ли кельтский зодиак с западным?', a: 'Кельтский и западный зодиаки — отдельные системы, разработанные независимо. Западный зодиак основан на солнечном году, кельтский — на лунном году и священных деревьях. Многие люди используют обе системы вместе для более полной картины.' },
      { q: 'Какой знак кельтского зодиака самый редкий?', a: 'Все 13 знаков охватывают примерно равные части года, поэтому ни один из них не является значительно редким. Виноград (2–29 сентября) и Тростник (28 октября–24 ноября) иногда считаются более таинственными знаками.' },
      { q: 'Что символизирует знак Бузины?', a: 'Бузина (Рус, 25 ноября – 23 декабря) — последний знак кельтского календаря деревьев. Люди Бузины известны своей глубиной, интроспекцией, свободным духом и готовностью раздвигать границы. Они — искатели истины кельтского зодиака.' },
      { q: 'Можно ли использовать кельтский зодиак для совместимости?', a: 'Да. В кельтской астрологической традиции некоторые знаки деревьев считаются особенно гармоничными. Например, Дуб и Ясень — сильные, заземлённые знаки, дополняющие друг друга. Лещина и Ольха разделяют интеллектуальную и творческую совместимость.' },
      { q: 'Насколько точен кельтский зодиак?', a: 'Как и все астрологические системы, кельтский зодиак — символический инструмент для самопознания, а не научно подтверждённая система. Его ценность в предоставлении рамок для размышления, основанных на многовековой мудрости о природе человека.' },
    ],
  },
  uk: {
    description: 'Кельтський зодіак — давня астрологічна система, що бере коріння в друїдичній традиції Британських островів та Західної Європи. На відміну від Західного зодіаку з 12 знаками, заснованими на сонячних місяцях, кельтський календар дерев має 13 місячних місяців, кожен з яких пов\'язаний зі священним деревом з алфавіту Огам — найдавнішого письма кельтських народів. 13 дерев: Береза, Горобина, Ясен, Вільха, Верба, Глід, Дуб, Падуб, Ліщина, Виноград, Плющ, Очерет і Бузина.\n\nДруїди шанували дерева як живі втілення мудрості, захисту та космічного зв\'язку. Ваш кельтський знак дерева розкриває глибинні якості вашої натури — особливий дар або виклик, який ваша душа несе в цьому житті. У поєднанні з Західним сонячним знаком кельтський зодіак додає багатий, природний вимір до самопізнання.',
    faqTitle: 'Поширені запитання про кельтський зодіак',
    faqs: [
      { q: 'Що таке кельтський зодіак?', a: 'Кельтський зодіак — друїдична астрологічна система, заснована на 13 священних деревах з алфавіту Огам, кожне з яких пов\'язане з місячним місяцем приблизно 28 днів. Він бере початок у давніх кельтських традиціях Британських островів.' },
      { q: 'Скільки знаків у кельтському зодіаку?', a: 'У кельтському зодіаку 13 знаків, по одному на кожен місячний місяць року. 13 знаків дерев: Береза, Горобина, Ясен, Вільха, Верба, Глід, Дуб, Падуб, Ліщина, Виноград, Плющ, Очерет і Бузина.' },
      { q: 'Що таке алфавіт Огам?', a: 'Огам — найдавніша відома писемність кельтських народів, що датується IV–VI ст. н.е. Кожна буква відповідає дереву, рослині або кущу і складає основу кельтського зодіаку дерев.' },
      { q: 'Які якості знаку Дуба?', a: 'Дуб (Дуїр, 10 червня – 7 липня) — один із найсильніших знаків кельтського зодіаку. Народжені під Дубом — природні захисники, відомі силою, витривалістю, мудрістю та почуттям обов\'язку.' },
      { q: 'Що символізує знак Берези?', a: 'Береза (Бет, 24 грудня – 20 січня) — перший знак кельтського календаря дерев. Вона символізує нові початки, прагнення та стійкість. Народжені під Березою амбіційні, адаптивні та глибоко вмотивовані.' },
      { q: 'Чи пов\'язаний кельтський зодіак із Західним?', a: 'Кельтський і Західний зодіаки — окремі системи, розроблені незалежно. Багато людей використовують обидві системи разом для більш повної картини.' },
      { q: 'Який знак кельтського зодіаку найрідкісніший?', a: 'Усі 13 знаків охоплюють приблизно рівні частини року, тому жоден з них не є значно рідкішим. Виноград (2–29 вересня) і Очерет (28 жовтня–24 листопада) іноді вважаються більш таємничими знаками.' },
      { q: 'Що символізує знак Бузини?', a: 'Бузина (Рус, 25 листопада – 23 грудня) — останній знак кельтського календаря дерев. Люди Бузини відомі своєю глибиною, інтроспекцією, вільним духом і готовністю розсувати межі.' },
      { q: 'Чи можна використовувати кельтський зодіак для сумісності?', a: 'Так. У кельтській астрологічній традиції деякі знаки дерев вважаються особливо гармонійними. Наприклад, Дуб і Ясен — сильні, заземлені знаки, що доповнюють один одного.' },
      { q: 'Наскільки точний кельтський зодіак?', a: 'Як і всі астрологічні системи, кельтський зодіак — символічний інструмент для самопізнання, а не науково підтверджена система. Його цінність у наданні рамок для роздумів, заснованих на багатовіковій мудрості.' },
    ],
  },
  fr: {
    description: 'Le zodiaque celtique est un ancien système astrologique enraciné dans la tradition druidique des îles britanniques et de l\'Europe de l\'Ouest. Contrairement au zodiaque occidental qui compte 12 signes basés sur les mois solaires, le calendrier celtique des arbres comporte 13 mois lunaires, chacun associé à un arbre sacré de l\'alphabet oghamique — la plus ancienne écriture des peuples celtes. Les 13 arbres sont : Bouleau, Sorbier, Frêne, Aulne, Saule, Aubépine, Chêne, Houx, Noisetier, Vigne, Lierre, Roseau et Sureau.\n\nLes druides vénéraient les arbres comme des incarnations vivantes de la sagesse, de la protection et de la connexion cosmique. Votre signe arbre celtique révèle les qualités profondes, souvent cachées, de votre nature — le don particulier ou le défi que votre âme porte dans cette vie. Combiné au signe solaire occidental, le zodiaque celtique ajoute une dimension riche et ancrée dans la nature à la connaissance de soi.',
    faqTitle: 'Questions fréquentes sur le zodiaque celtique',
    faqs: [
      { q: 'Qu\'est-ce que le zodiaque celtique ?', a: 'Le zodiaque celtique est un système astrologique druidique basé sur 13 arbres sacrés de l\'alphabet oghamique, chacun associé à un mois lunaire d\'environ 28 jours. Il trouve son origine dans les traditions celtiques des îles britanniques et met l\'accent sur les qualités spirituelles de la nature.' },
      { q: 'Combien de signes comporte le zodiaque celtique ?', a: 'Le zodiaque celtique comprend 13 signes, un pour chaque mois lunaire. Les 13 arbres sont : Bouleau, Sorbier, Frêne, Aulne, Saule, Aubépine, Chêne, Houx, Noisetier, Vigne, Lierre, Roseau et Sureau.' },
      { q: 'Qu\'est-ce que l\'alphabet oghamique ?', a: 'L\'ogham est la plus ancienne écriture connue des peuples celtes, datant des IVe–VIe siècles. Chaque lettre correspond à un arbre, une plante ou un arbuste, et constitue la base du zodiaque celtique des arbres.' },
      { q: 'Quelles sont les qualités du signe Chêne ?', a: 'Chêne (Duir, 10 juin – 7 juillet) est l\'un des signes les plus puissants du zodiaque celtique. Les personnes nées sous le Chêne sont des protecteurs naturels, réputés pour leur force, endurance, sagesse et sens du devoir.' },
      { q: 'Que symbolise le signe Bouleau ?', a: 'Bouleau (Beth, 24 décembre – 20 janvier) est le premier signe du calendrier celtique des arbres. Il représente les nouveaux départs, l\'ambition et la résilience. Les personnes nées sous le Bouleau sont ambitieuses, adaptables et profondément motivées.' },
      { q: 'Le zodiaque celtique est-il lié au zodiaque occidental ?', a: 'Le zodiaque celtique et le zodiaque occidental sont des systèmes distincts développés indépendamment. Beaucoup de personnes utilisent les deux systèmes ensemble pour obtenir un tableau plus complet.' },
      { q: 'Quel est le signe le plus rare du zodiaque celtique ?', a: 'Tous les 13 signes couvrent des portions à peu près égales de l\'année. La Vigne (2–29 septembre) et le Roseau (28 octobre–24 novembre) sont parfois considérés comme les signes les plus mystérieux.' },
      { q: 'Que représente le signe Sureau ?', a: 'Sureau (Ruis, 25 novembre – 23 décembre) est le dernier signe du calendrier celtique. Les personnes nées sous le Sureau sont connues pour leur profondeur, leur introspection, leur esprit libre et leur volonté de repousser les limites.' },
      { q: 'Peut-on utiliser le zodiaque celtique pour la compatibilité ?', a: 'Oui. Dans la tradition astrologique celtique, certains signes arbres sont considérés comme particulièrement harmonieux ensemble. Par exemple, Chêne et Frêne se complètent bien, et Noisetier et Aulne partagent une compatibilité intellectuelle et créative.' },
      { q: 'Quelle est la fiabilité du zodiaque celtique ?', a: 'Comme tous les systèmes astrologiques, le zodiaque celtique est un outil symbolique d\'introspection plutôt qu\'un système scientifiquement validé. Sa valeur réside dans le cadre de réflexion qu\'il offre, ancré dans des siècles de sagesse symbolique.' },
    ],
  },
  lt: {
    description: 'Keltų zodiako ženklas yra senovinė astrologinė sistema, įsišaknijusi Britų salų ir Vakarų Europos druidų tradicijoje. Skirtingai nuo Vakarų zodiako su 12 ženklų, pagrįstų saulės mėnesiais, keltų medžių kalendorius turi 13 mėnulio mėnesių, kurių kiekvienas susietas su šventu medžiu iš Ogham abėcėlės — seniausio keltų tautų rašto. 13 medžių: Beržas, Šermukšnis, Uosis, Alksnis, Gluosnis, Gudobelis, Ąžuolas, Bugienis, Lazdynas, Vynmedis, Gebenė, Nendrė ir Šeivamedis.\n\nDruidai garbino medžius kaip gyvus išminties, apsaugos ir kosminės ryšio įkūnijimus. Jūsų keltų medžio ženklas atskleidžia gilesnes, dažnai paslėptas jūsų prigimties savybes — ypatingą dovaną ar iššūkį, kurį jūsų siela neša šiame gyvenime. Kartu su Vakarų saulės ženklu keltų zodiako ženklas prideda turtingą, gamtos pagrindu sukurtą dimensiją savęs pažinimui.',
    faqTitle: 'Dažnai užduodami klausimai apie keltų zodiaką',
    faqs: [
      { q: 'Kas yra keltų zodiako ženklas?', a: 'Keltų zodiako ženklas yra druidų astrologinė sistema, pagrįsta 13 šventų medžių iš Ogham abėcėlės, kurių kiekvienas susietas su mėnulio mėnesiu, trunkančiu apie 28 dienas. Ji kilo iš senovinių keltų tradicijų Britų salose.' },
      { q: 'Kiek ženklų yra keltų zodiakalyje?', a: 'Keltų zodiakalyje yra 13 ženklų, po vieną kiekvienam mėnulio mėnesiui. 13 medžių ženklų: Beržas, Šermukšnis, Uosis, Alksnis, Gluosnis, Gudobelis, Ąžuolas, Bugienis, Lazdynas, Vynmedis, Gebenė, Nendrė ir Šeivamedis.' },
      { q: 'Kas yra Ogham abėcėlė?', a: 'Ogham yra seniausia žinoma keltų tautų rašto sistema, datuojama IV–VI amžiais. Kiekviena raidė atitinka medį, augalą ar krūmą ir sudaro keltų medžių zodialinę sistemą.' },
      { q: 'Kokios yra Ąžuolo ženklo savybės?', a: 'Ąžuolas (Duir, birželio 10 – liepos 7 d.) yra vienas galingiausių keltų zodiako ženklų. Gimę Ąžuolo ženklų asmenys yra natūralūs gynėjai, žinomi savo jėga, ištverme, išmintimi ir pareigos jausmu.' },
      { q: 'Ką simbolizuoja Beržo ženklas?', a: 'Beržas (Beth, gruodžio 24 – sausio 20 d.) yra pirmasis keltų medžių kalendoriaus ženklas. Jis simbolizuoja naujus pradžiūmus, ryžtą ir atsparumą. Gimę Beržo ženklu yra ambicingi, prisitaikantys ir giliai motyvuoti.' },
      { q: 'Ar keltų zodiako ženklas susijęs su Vakarų zodiaku?', a: 'Keltų ir Vakarų zodiakai yra atskiros, nepriklausomai sukurtos sistemos. Daugelis žmonių naudoja abi sistemas kartu, kad gautų išsamesnį vaizdą.' },
      { q: 'Kuris keltų zodiako ženklas rečiausias?', a: 'Visi 13 ženklų apima maždaug lygias metų dalis. Vynmedis (rugsėjo 2–29 d.) ir Nendrė (spalio 28–lapkričio 24 d.) kartais laikomi paslaptingiausiais ženklais.' },
      { q: 'Ką simbolizuoja Šeivamedžio ženklas?', a: 'Šeivamedis (Ruis, lapkričio 25 – gruodžio 23 d.) yra paskutinis keltų kalendoriaus ženklas. Gimę Šeivamedžio ženklų asmenys žinomi dėl savo gilaus mąstymo, introspekcijos, laisvos dvasios ir noro peržengti ribas.' },
      { q: 'Ar galima naudoti keltų zodiaką suderinamumui nustatyti?', a: 'Taip. Keltų astrologinėje tradicijoje tam tikri medžių ženklai laikomi ypač darniais. Pvz., Ąžuolas ir Uosis puikiai papildo vienas kitą, o Lazdynas ir Alksnis dalijasi intelektualiniu kūrybiniu suderinamumu.' },
      { q: 'Koks yra keltų zodiako tikslumas?', a: 'Kaip ir visos astrologinės sistemos, keltų zodiako ženklas yra simbolinė savirefleksijos priemonė, o ne moksliškai patvirtinta sistema. Jo vertė glūdi savęs pažinimo rėmuose, pagrįstuose šimtmečių sukaupta simboline išmintimi.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [
    { href: '/calculator/zodiac-sign', label: 'Western Zodiac Sign' },
    { href: '/calculator/chinese-zodiac', label: 'Chinese Zodiac' },
    { href: '/calculator/zodiac-compatibility', label: 'Zodiac Compatibility' },
    { href: '/calculator/life-path', label: 'Life Path Number' },
    { href: '/calculator/age', label: 'Age Calculator' },
  ],
  ru: [
    { href: '/calculator/zodiac-sign', label: 'Западный знак зодиака' },
    { href: '/calculator/chinese-zodiac', label: 'Китайский гороскоп' },
    { href: '/calculator/zodiac-compatibility', label: 'Совместимость знаков' },
    { href: '/calculator/life-path', label: 'Число жизненного пути' },
    { href: '/calculator/age', label: 'Калькулятор возраста' },
  ],
  uk: [
    { href: '/calculator/zodiac-sign', label: 'Знак Західного зодіаку' },
    { href: '/calculator/chinese-zodiac', label: 'Китайський гороскоп' },
    { href: '/calculator/zodiac-compatibility', label: 'Сумісність знаків' },
    { href: '/calculator/life-path', label: 'Число шляху життя' },
    { href: '/calculator/age', label: 'Калькулятор віку' },
  ],
  fr: [
    { href: '/calculator/zodiac-sign', label: 'Signe Zodiaque Occidental' },
    { href: '/calculator/chinese-zodiac', label: 'Zodiaque Chinois' },
    { href: '/calculator/zodiac-compatibility', label: 'Compatibilité des Signes' },
    { href: '/calculator/life-path', label: 'Chemin de Vie' },
    { href: '/calculator/age', label: 'Calculateur d\'âge' },
  ],
  lt: [
    { href: '/calculator/zodiac-sign', label: 'Vakarų zodiako ženklas' },
    { href: '/calculator/chinese-zodiac', label: 'Kinų zodiako ženklas' },
    { href: '/calculator/zodiac-compatibility', label: 'Ženklų suderinamumas' },
    { href: '/calculator/life-path', label: 'Gyvenimo kelio skaičius' },
    { href: '/calculator/age', label: 'Amžiaus skaičiuotuvas' },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  return buildMetadata(locale, '/calculator/celtic-zodiac', meta);
}

export function generateStaticParams() {
  return ['en', 'ru', 'uk', 'fr', 'lt'].map((locale) => ({ locale }));
}

export default async function CelticZodiacPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const content = CONTENT[locale] ?? CONTENT.en;
  const related = RELATED[locale] ?? RELATED.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://utilixi.com/${locale}/calculator/celtic-zodiac`,
    applicationCategory: 'UtilityApplication',
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
        <ToolActions />
        <CelticZodiacCalculator locale={locale} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <RelatedTools locale={locale} tools={related} />
          <section className={styles.faq}>
            <h2 className={styles.faq__title}>{content.faqTitle}</h2>
            <div className={styles.faq__list}>
              {content.faqs.map((f, i) => (
                <div key={i} className={styles.faq__item}>
                  <h3 className={styles.faq__question}>{f.q}</h3>
                  <p className={styles.faq__answer}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
