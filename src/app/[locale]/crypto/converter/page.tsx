import ToolActions from '@/components/ui/ToolActions';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import CryptoConverter from './CryptoConverter';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import RelatedTools from '@/components/ui/RelatedTools';
import { getCryptoRates, getFiatRates } from '../shared';
import FaqSection from '@/components/ui/FaqSection';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const META: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  en: {
    title: 'Crypto to Fiat Converter — Bitcoin & Ethereum to USD, EUR & More',
    description: 'Free crypto to fiat converter. Convert Bitcoin, Ethereum, Solana and top 50 coins to USD, EUR, GBP, RUB, UAH and 10 other currencies. Live prices from CoinGecko, updated every 5 minutes.',
    h1: 'Crypto Converter',
    subtitle: 'Convert Bitcoin, Ethereum, and top 50 coins to USD, EUR, and 12 other currencies at live rates.',
  },
  ru: {
    title: 'Конвертер криптовалют в рубли — Bitcoin, Ethereum и топ-50 монет',
    description: 'Бесплатный конвертер криптовалют онлайн. Переводите Bitcoin (BTC), Ethereum (ETH), Solana и топ-50 монет в USD, EUR, RUB, UAH и другие валюты. Актуальные курсы каждые 5 минут.',
    h1: 'Конвертер криптовалют',
    subtitle: 'Конвертируйте Bitcoin, Ethereum и топ-50 монет в USD, EUR, RUB и другие валюты по актуальному курсу.',
  },
  uk: {
    title: 'Конвертер криптовалют в гривні — Bitcoin, Ethereum та топ-50',
    description: 'Безкоштовний конвертер криптовалют онлайн. Переводьте Bitcoin (BTC), Ethereum (ETH), Solana та топ-50 монет у USD, EUR, UAH, RUB та інші валюти. Актуальні курси кожні 5 хвилин.',
    h1: 'Конвертер криптовалют',
    subtitle: 'Конвертуйте Bitcoin, Ethereum та топ-50 монет у USD, EUR, UAH та інші валюти за актуальним курсом.',
  },
  fr: {
    title: 'Convertisseur Crypto en Euros — Bitcoin, Ethereum et Top 50',
    description: 'Convertisseur crypto gratuit. Convertissez Bitcoin, Ethereum, Solana et le top 50 en USD, EUR, GBP et autres devises. Prix en direct mis à jour toutes les 5 minutes.',
    h1: 'Convertisseur de Cryptomonnaies',
    subtitle: 'Convertissez Bitcoin, Ethereum et le top 50 en USD, EUR et 12 autres devises aux prix du marché en direct.',
  },
  lt: {
    title: 'Kriptovaliutų Keitiklis į Eurus — Bitcoin, Ethereum ir Top 50',
    description: 'Nemokamas kriptovaliutų keitiklis. Konvertuokite Bitcoin, Ethereum, Solana ir top 50 monetų į USD, EUR, GBP ir kitas valiutas. Kainos atnaujinamos kas 5 minutes.',
    h1: 'Kriptovaliutų Keitiklis',
    subtitle: 'Konvertuokite Bitcoin, Ethereum ir top 50 monetų į USD, EUR ir 12 kitų valiutų realiomis kainomis.',
  },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'Convert any amount of Bitcoin, Ethereum, Solana and other top 50 cryptocurrencies into your preferred fiat currency in seconds. Prices are sourced from CoinGecko and updated every 5 minutes. Fiat exchange rates (USD to EUR, GBP, RUB, UAH, etc.) are updated every 6 hours via ExchangeRate-API.\n\nThis crypto to fiat converter is useful for quickly checking the value of your holdings in local currency, calculating taxable events, or comparing prices across markets. Simply select a coin, enter an amount, and choose your target currency — the conversion is instant. Supports 14 fiat currencies and all top 50 cryptocurrencies by market cap.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What does "crypto to fiat" mean?', a: '"Crypto to fiat" means converting a cryptocurrency (like Bitcoin or Ethereum) into a government-issued currency (like USD, EUR, GBP, or UAH). Fiat currencies are traditional money backed by a government, while cryptocurrencies are decentralised digital assets. This converter shows you how much your crypto is worth in your local fiat currency at current market prices.' },
      { q: 'How accurate is this crypto converter?', a: 'Coin prices are fetched from CoinGecko every 5 minutes. Fiat exchange rates (USD to EUR, RUB, UAH, etc.) are updated every 6 hours via ExchangeRate-API. The result is an indicative value — actual exchange rates on crypto platforms may differ slightly due to trading fees, spreads, and market volatility. For amounts over $1,000, check the live rate on your exchange before transacting.' },
      { q: 'Which cryptocurrencies can I convert?', a: 'The converter includes the top 50 cryptocurrencies by market capitalization — including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, USDC, Cardano (ADA), Dogecoin (DOGE), and more. The list is dynamic and always reflects the current top 50 coins ranked by market cap.' },
      { q: 'Which fiat currencies are supported?', a: 'The converter supports 14 fiat currencies: USD (US Dollar), EUR (Euro), GBP (British Pound), RUB (Russian Ruble), UAH (Ukrainian Hryvnia), PLN (Polish Zloty), CHF (Swiss Franc), CAD (Canadian Dollar), AUD (Australian Dollar), JPY (Japanese Yen), CNY (Chinese Yuan), TRY (Turkish Lira), BYN (Belarusian Ruble), KZT (Kazakhstani Tenge).' },
      { q: 'How do I convert Bitcoin to EUR?', a: 'Select Bitcoin (BTC) from the coin list, enter the amount of BTC you want to convert, then select EUR as the target currency. The converter will show the EUR equivalent at the current market rate. For example, if Bitcoin is trading at $65,000 and EUR/USD is 1.08, then 1 BTC ≈ €60,185. Fiat rates are refreshed every 6 hours so values may differ slightly from live exchange rates.' },
      { q: 'Can I convert fiat to crypto (reverse conversion)?', a: 'Yes — the converter works both ways. To convert fiat to crypto, select the coin, enter the fiat amount you want to spend, and the tool will show how much crypto you would receive at current prices. For example, enter €1,000 and select Bitcoin to see how many BTC that buys. This is useful for planning purchases or calculating how much crypto you can afford at current prices.' },
      { q: 'What is the difference between a crypto converter and a crypto exchange?', a: 'A crypto converter (like this tool) shows you the theoretical conversion value based on market prices — it does not execute any trades. A crypto exchange (Binance, Coinbase, Kraken, etc.) is a platform where you can actually buy, sell, or trade cryptocurrencies. Exchanges charge fees (0.1–0.5% typical) and use slightly different rates. Always verify the current price on your exchange before making a transaction.' },
      { q: 'Is this converter suitable for tax calculations?', a: 'This converter can give you indicative values for crypto holdings at a point in time, which can assist with tax reporting. However, for official tax purposes (capital gains, income from crypto), use the actual transaction price from your exchange account — not an estimate. Many jurisdictions (UK, US, EU) require you to use the actual acquisition/disposal price in your local currency at the time of the transaction.' },
      { q: 'Why do crypto prices change so rapidly?', a: 'Cryptocurrency prices are set by supply and demand on global markets that operate 24/7. Unlike stock markets, there are no closing times or circuit breakers. Prices can move 5–20% in a single day due to factors including: large institutional trades, regulatory news, technological developments, macroeconomic data, social media sentiment, and whale movements. Bitcoin\'s 30-day volatility is typically 40–80% annualised, compared to ~15% for the S&P 500.' },
      { q: 'Where can I see cryptocurrency prices in a table?', a: 'Visit the Cryptocurrency Prices page (linked in related tools above) to see a full sortable table of the top 50 coins with current price, 24h change, and market capitalization. You can sort by any column and search by coin name or symbol.' },
    ],
  },
  ru: {
    description: 'Конвертируйте любую сумму Bitcoin, Ethereum, Solana и других топ-50 криптовалют в нужную вам фиатную валюту за секунды. Цены монет обновляются каждые 5 минут (CoinGecko), курсы фиата — каждые 6 часов (ExchangeRate-API).\n\nКонвертер криптовалют в рубли, гривны, доллары и другие валюты полезен для быстрой оценки стоимости портфеля, расчёта налогооблагаемых событий или сравнения цен. Выберите монету, введите сумму и выберите целевую валюту — конвертация мгновенна. Поддерживаются 14 фиатных валют и топ-50 криптовалют.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что значит «конвертировать крипту в фиат»?', a: '«Конвертация крипты в фиат» означает перевод криптовалюты (Bitcoin, Ethereum и т.д.) в обычную государственную валюту (рубли, доллары, евро и т.д.). Этот конвертер показывает, сколько стоит ваша крипта в выбранной валюте по текущему рыночному курсу — без реального обмена.' },
      { q: 'Насколько точен конвертер?', a: 'Цены монет получаются от CoinGecko каждые 5 минут. Курсы фиата (USD к RUB, EUR, UAH и т.д.) обновляются каждые 6 часов. Результат является ориентировочным — реальные курсы на биржах могут незначительно отличаться из-за комиссий и волатильности.' },
      { q: 'Какие криптовалюты поддерживаются?', a: 'Конвертер включает топ-50 криптовалют по рыночной капитализации: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano (ADA), Dogecoin (DOGE) и другие. Список динамический и всегда отражает актуальный топ-50.' },
      { q: 'Какие фиатные валюты поддерживаются?', a: 'Конвертер поддерживает 14 валют: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Как конвертировать Bitcoin в рубли?', a: 'Выберите Bitcoin (BTC) из списка монет, введите количество BTC, затем выберите RUB как целевую валюту. Конвертер покажет сумму в рублях по текущему курсу. Например, при цене BTC $65 000 и курсе USD/RUB 90 → 1 BTC ≈ 5 850 000 ₽. Курсы фиата обновляются каждые 6 часов.' },
      { q: 'Можно ли конвертировать фиат в крипту (обратный расчёт)?', a: 'Да — конвертер работает в обе стороны. Для конвертации рублей в Bitcoin: выберите BTC, введите сумму в рублях, и инструмент покажет, сколько BTC можно получить по текущей цене. Это удобно для планирования покупок или расчёта объёма крипты на заданную сумму.' },
      { q: 'В чём разница между конвертером и криптобиржей?', a: 'Конвертер (этот инструмент) показывает теоретическую стоимость по рыночным ценам — реальный обмен не выполняется. Криптобиржа (Binance, ByBit, OKX и т.д.) — платформа, где можно купить, продать или обменять криптовалюту. Биржи берут комиссию (обычно 0.1–0.5%) и используют реальный спред. Перед транзакцией всегда проверяйте актуальный курс на своей бирже.' },
      { q: 'Можно ли использовать конвертер для налогового учёта?', a: 'Конвертер даёт ориентировочные значения, полезные для оценки портфеля. Для официального налогового учёта в РФ используйте реальные курсы сделок с биржи — именно они учитываются при расчёте дохода от операций с ЦФА и криптовалютой. Применимое законодательство: ФЗ о ЦФА, разъяснения ФНС о налогообложении крипты.' },
      { q: 'Почему цены криптовалют меняются так быстро?', a: 'Цены криптовалют формируются спросом и предложением на глобальных рынках, работающих 24/7. В отличие от фондового рынка, нет закрытий или остановок торгов. За один день цена может измениться на 5–20% из-за новостей, регуляторных решений, крупных сделок, настроений в соцсетях. Историческая волатильность Bitcoin — 40–80% годовых.' },
      { q: 'Где посмотреть полную таблицу курсов криптовалют?', a: 'Перейдите на страницу «Курс криптовалют» (ссылка в похожих инструментах выше), чтобы увидеть сортируемую таблицу топ-50 монет с текущей ценой, изменением за 24ч и рыночной капитализацией.' },
    ],
  },
  uk: {
    description: 'Конвертуйте будь-яку суму Bitcoin, Ethereum, Solana та інших топ-50 криптовалют у потрібну вам фіатну валюту за лічені секунди. Ціни монет оновлюються кожні 5 хвилин (CoinGecko), курси фіату — кожні 6 годин (ExchangeRate-API).\n\nКонвертер криптовалют у гривні, долари та інші валюти корисний для швидкої оцінки вартості портфеля, розрахунку податкових подій або порівняння цін. Виберіть монету, введіть суму і виберіть цільову валюту — конвертація миттєва. Підтримуються 14 фіатних валют і топ-50 криптовалют.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що означає «конвертувати крипту у фіат»?', a: '«Конвертація крипти у фіат» означає переведення криптовалюти (Bitcoin, Ethereum тощо) у звичайну державну валюту (гривні, долари, євро тощо). Цей конвертер показує, скільки коштує ваша крипта у вибраній валюті за поточним ринковим курсом — без реального обміну.' },
      { q: 'Наскільки точний конвертер?', a: 'Ціни монет отримуються від CoinGecko кожні 5 хвилин. Курси фіату оновлюються кожні 6 годин. Результат є орієнтовним — реальні курси на біржах можуть незначно відрізнятися через комісії та волатильність.' },
      { q: 'Які криптовалюти підтримуються?', a: 'Конвертер включає топ-50 криптовалют за ринковою капіталізацією: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano (ADA), Dogecoin (DOGE) та інші. Список динамічний і завжди відображає актуальний топ-50.' },
      { q: 'Які фіатні валюти підтримуються?', a: 'Конвертер підтримує 14 валют: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Як конвертувати Bitcoin у гривні?', a: 'Виберіть Bitcoin (BTC) зі списку монет, введіть кількість BTC, потім виберіть UAH як цільову валюту. Конвертер покаже суму в гривнях за поточним курсом. Курси фіату оновлюються кожні 6 годин.' },
      { q: 'Чи можна конвертувати фіат у крипту (зворотний розрахунок)?', a: 'Так — конвертер працює в обидва боки. Для конвертації гривень у Bitcoin: виберіть BTC, введіть суму у гривнях, і інструмент покаже, скільки BTC можна отримати за поточною ціною. Зручно для планування покупок.' },
      { q: 'У чому різниця між конвертером і криптобіржею?', a: 'Конвертер (цей інструмент) показує теоретичну вартість за ринковими цінами — реальний обмін не виконується. Криптобіржа (Binance, OKX, WhiteBIT тощо) — платформа для реальної купівлі/продажу криптовалюти. Біржі стягують комісію (зазвичай 0.1–0.5%). Перед транзакцією перевіряйте актуальний курс на своїй біржі.' },
      { q: 'Можна ли використовувати конвертер для податкового обліку?', a: 'Конвертер дає орієнтовні значення для оцінки портфеля. Для офіційного податкового обліку використовуйте реальні курси угод з біржі — саме вони враховуються при розрахунку прибутку від операцій з криптовалютою відповідно до законодавства України.' },
      { q: 'Чому ціни криптовалют змінюються так швидко?', a: 'Ціни формуються попитом і пропозицією на глобальних ринках, що працюють 24/7. За один день ціна може змінитися на 5–20% через новини, регуляторні рішення, великі угоди, настрої у соцмережах. Волатильність Bitcoin — 40–80% річних.' },
      { q: 'Де переглянути повну таблицю курсів криптовалют?', a: 'Перейдіть на сторінку «Курс криптовалют» (посилання у схожих інструментах вище), щоб побачити таблицю топ-50 монет з поточною ціною, зміною за 24 год та ринковою капіталізацією.' },
    ],
  },
  fr: {
    description: 'Convertissez n\'importe quel montant de Bitcoin, Ethereum, Solana et d\'autres cryptomonnaies en votre devise préférée en quelques secondes. Les prix des coins sont mis à jour toutes les 5 minutes (CoinGecko), les taux de change fiat toutes les 6 heures (ExchangeRate-API).\n\nCet outil de conversion crypto en euros et autres devises est utile pour évaluer rapidement la valeur de votre portefeuille, calculer des événements fiscaux, ou comparer les prix entre marchés. Sélectionnez une cryptomonnaie, entrez un montant et choisissez votre devise — la conversion est instantanée. 14 devises fiat et top 50 cryptos disponibles.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Que signifie "convertir des cryptos en fiat" ?', a: '"Crypto vers fiat" signifie convertir une cryptomonnaie (Bitcoin, Ethereum...) en monnaie fiduciaire (euros, dollars, livres...). Les devises fiat sont les monnaies traditionnelles émises par les États. Ce convertisseur vous montre la valeur de votre crypto en devise locale au prix du marché — sans effectuer de transaction réelle.' },
      { q: 'Quelle est la précision du convertisseur ?', a: 'Les prix des coins sont récupérés de CoinGecko toutes les 5 minutes. Les taux de change fiat sont mis à jour toutes les 6 heures. Le résultat est indicatif — les taux réels sur les plateformes d\'échange peuvent différer légèrement en raison des frais de trading et de la volatilité.' },
      { q: 'Quelles cryptomonnaies sont prises en charge ?', a: 'Le convertisseur inclut le top 50 des cryptomonnaies par capitalisation boursière : Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano, Dogecoin et d\'autres. La liste est dynamique et reflète toujours le top 50 actuel.' },
      { q: 'Quelles devises fiat sont prises en charge ?', a: 'Le convertisseur prend en charge 14 devises : USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Comment convertir du Bitcoin en euros ?', a: 'Sélectionnez Bitcoin (BTC) dans la liste, entrez le montant de BTC, puis choisissez EUR comme devise cible. Le convertisseur affichera l\'équivalent en euros au taux du marché actuel. Par exemple, si Bitcoin vaut $65 000 et EUR/USD = 1,08, alors 1 BTC ≈ €60 185. Les taux fiat sont mis à jour toutes les 6 heures.' },
      { q: 'Puis-je convertir des euros en crypto (sens inverse) ?', a: 'Oui — le convertisseur fonctionne dans les deux sens. Pour convertir des euros en Bitcoin : sélectionnez BTC, entrez le montant en euros que vous souhaitez dépenser, et l\'outil indiquera la quantité de BTC obtenue au prix actuel. Utile pour planifier des achats ou calculer ce que vous pouvez acquérir avec un budget donné.' },
      { q: 'Quelle est la différence entre un convertisseur et un échange crypto ?', a: 'Un convertisseur (comme cet outil) affiche la valeur théorique basée sur les prix du marché — il n\'exécute aucune transaction. Un échange crypto (Binance, Coinbase, Kraken...) est une plateforme où vous achetez, vendez ou échangez réellement des cryptos. Les échanges prélèvent des frais (0,1–0,5% typiquement). Vérifiez toujours le taux en direct sur votre plateforme avant de transacter.' },
      { q: 'Ce convertisseur est-il adapté aux déclarations fiscales ?', a: 'Cet outil peut fournir des valeurs indicatives pour évaluer votre portefeuille. Pour les déclarations fiscales officielles (plus-values, revenus crypto), utilisez le prix réel de transaction sur votre échange. En France, la fiscalité des cryptos (flat tax 30% sur les plus-values) exige les prix réels d\'achat/vente en euros.' },
      { q: 'Pourquoi les prix des cryptos changent-ils si rapidement ?', a: 'Les prix des cryptomonnaies sont déterminés par l\'offre et la demande sur des marchés mondiaux ouverts 24h/24, 7j/7. Contrairement aux marchés boursiers, il n\'y a pas de clôture ni de coupe-circuit. Les prix peuvent varier de 5 à 20 % en une journée sous l\'effet de l\'actualité réglementaire, des gros trades institutionnels, des réseaux sociaux. La volatilité historique du Bitcoin est de 40–80 % annualisée.' },
      { q: 'Où voir le tableau complet des cours crypto ?', a: 'Visitez la page «Cours des Cryptomonnaies» (lien dans les outils connexes ci-dessus) pour voir un tableau trié du top 50 avec le prix actuel, la variation 24h et la capitalisation boursière.' },
    ],
  },
  lt: {
    description: 'Konvertuokite bet kokią Bitcoin, Ethereum, Solana ir kitų top 50 kriptovaliutų sumą į norimą fiat valiutą per kelias sekundes. Monetų kainos atnaujinamos kas 5 minutes (CoinGecko), fiat valiutų kursai – kas 6 valandas (ExchangeRate-API).\n\nŠis kriptovaliutų į eurus ir kitas valiutas keitiklis naudingas greitam portfelio vertės įvertinimui, mokestinių įvykių skaičiavimui ar kainų palyginimui. Pasirinkite monetą, įveskite sumą ir pasirinkite valiutą — konvertavimas momentinis. Palaikomos 14 fiat valiutų ir top 50 kriptovaliutų.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Ką reiškia „konvertuoti kriptovaliutą į fiat"?', a: '„Kriptovaliuta į fiat" reiškia kriptovaliutos (Bitcoin, Ethereum ir kt.) pavertimą tradicine valstybe išleista valiuta (eurais, doleriais ir kt.). Šis keitiklis parodo, kiek verta jūsų kriptovaliuta pasirinktoje valiutoje pagal dabartinę rinkos kainą — be realaus keitimo.' },
      { q: 'Koks keitiklio tikslumas?', a: 'Monetų kainos gaunamos iš CoinGecko kas 5 minutes. Fiat valiutų kursai atnaujinami kas 6 valandas. Rezultatas yra orientacinis — faktiniai kursai kriptovaliutų biržose gali šiek tiek skirtis dėl prekybos mokesčių ir nepastovumo.' },
      { q: 'Kokios kriptovaliutos palaikomos?', a: 'Keitiklyje yra 50 populiariausių kriptovaliutų pagal rinkos kapitalizaciją: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), XRP, Cardano, Dogecoin ir kitos. Sąrašas dinamiškas ir visada atspindi dabartinį top 50.' },
      { q: 'Kokios fiat valiutos palaikomos?', a: 'Keitiklis palaiko 14 valiutų: USD, EUR, GBP, RUB, UAH, PLN, CHF, CAD, AUD, JPY, CNY, TRY, BYN, KZT.' },
      { q: 'Kaip konvertuoti Bitcoin į eurus?', a: 'Pasirinkite Bitcoin (BTC) iš monetų sąrašo, įveskite BTC kiekį, tada pasirinkite EUR kaip tikslinę valiutą. Keitiklis parodys eurų ekvivalentą pagal dabartinį rinkos kursą. Fiat kursai atnaujinami kas 6 valandas.' },
      { q: 'Ar galima konvertuoti fiat į kriptovaliutą (atvirkščiai)?', a: 'Taip — keitiklis veikia abiem kryptimis. Eurų konvertavimui į Bitcoin: pasirinkite BTC, įveskite eurų sumą, ir įrankis parodys, kiek BTC gaunama pagal dabartinę kainą. Naudinga planuojant pirkimus.' },
      { q: 'Koks skirtumas tarp keitiklio ir kriptovaliutų biržos?', a: 'Keitiklis (šis įrankis) parodo teorinę vertę pagal rinkos kainas — realūs sandoriai nevykdomi. Kriptovaliutų birža (Binance, Coinbase ir kt.) yra platforma, kurioje galima faktiškai pirkti, parduoti ar keistis kriptovaliutomis. Biržos ima mokesčius (paprastai 0,1–0,5%). Prieš sandorį visada patikrinkite realaus laiko kursą savo platformoje.' },
      { q: 'Ar tinka keitiklis mokestinei apskaitai?', a: 'Keitiklis pateikia orientacines vertes portfelio vertinimui. Oficialiai mokestinei apskaitai naudokite faktinius sandorių kursus iš biržos. Lietuvoje kriptovaliutų pajamos apmokestinamos GPM — reikalingi faktiniai pirkimo ir pardavimo kursai.' },
      { q: 'Kodėl kriptovaliutų kainos keičiasi taip greitai?', a: 'Kriptovaliutų kainos nustatomos pasiūlos ir paklausos pasaulinėse rinkose, veikiančiose 24/7. Kainos per vieną dieną gali keistis 5–20% dėl naujienų, reguliacinių sprendimų, didelių sandorių ir socialinių tinklų nuotaikos. Bitcoin istorinis nepastovumas — 40–80% metinis.' },
      { q: 'Kur matyti pilną kriptovaliutų kainų lentelę?', a: 'Apsilankykite puslapyje „Kriptovaliutų Kursai" (nuoroda susijusiuose įrankiuose aukščiau), kad pamatytumėte rūšiuojamą top 50 lentelę su dabartine kaina, 24h pokyčiais ir rinkos kapitalizacija.' },
    ],
  },
};

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/crypto', label: 'Crypto Rates (Top 50)' }, { href: '/currency', label: 'Currency Converter' }, { href: '/calculator/crypto-tax', label: 'Crypto Tax Calculator' }, { href: '/calculator/income-tax', label: 'Income Tax Calculator' }, { href: '/calculator/percentage', label: 'Percentage Calculator' }],
  ru: [{ href: '/crypto', label: 'Курс криптовалют (топ-50)' }, { href: '/currency', label: 'Конвертер валют' }, { href: '/calculator/crypto-tax', label: 'Налог на крипту' }, { href: '/calculator/income-tax', label: 'Подоходный налог' }, { href: '/calculator/percentage', label: 'Калькулятор процентов' }],
  uk: [{ href: '/crypto', label: 'Курс криптовалют (топ-50)' }, { href: '/currency', label: 'Конвертер валют' }, { href: '/calculator/crypto-tax', label: 'Податок на крипту' }, { href: '/calculator/income-tax', label: 'Прибутковий податок' }, { href: '/calculator/percentage', label: 'Калькулятор відсотків' }],
  fr: [{ href: '/crypto', label: 'Cours des Cryptos (top 50)' }, { href: '/currency', label: 'Convertisseur de devises' }, { href: '/calculator/crypto-tax', label: 'Taxe sur les cryptos' }, { href: '/calculator/income-tax', label: 'Impôt sur le revenu' }, { href: '/calculator/percentage', label: 'Calculatrice de pourcentage' }],
  lt: [{ href: '/crypto', label: 'Kriptovaliutų Kursai (top 50)' }, { href: '/currency', label: 'Valiutų keitiklis' }, { href: '/calculator/crypto-tax', label: 'Kriptovaliutų mokesčiai' }, { href: '/calculator/income-tax', label: 'Pajamų mokestis' }, { href: '/calculator/percentage', label: 'Procentų skaičiuotuvas' }],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return buildMetadata(locale, '/crypto/converter', meta);
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function CryptoConverterPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;

  const [coins, fiatRates] = await Promise.all([getCryptoRates(), getFiatRates()]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://www.utilixi.com/${locale}/crypto/converter`,
    applicationCategory: 'FinanceApplication',
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
        <RelatedTools locale={locale} tools={related} />
        <ToolActions />
        <CryptoConverter locale={locale} coins={coins} fiatRates={fiatRates} />
        <AdInline locale={locale} />
        <div className={styles.page__content}>
          {content.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.page__description}>{para}</p>
          ))}
          <AdPlaceholder locale={locale} size="banner" />
          <FaqSection title={content.faqTitle} faqs={content.faqs} />
        </div>
      </PageLayout>
    </>
  );
}
