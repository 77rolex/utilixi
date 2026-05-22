import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import DiabetesRiskCalculator from './DiabetesRiskCalculator';
import PageLayout from '@/components/layout/PageLayout';
import AdSidebar from '@/components/ui/AdSidebar';
import AdInline from '@/components/ui/AdInline';
import RelatedTools from '@/components/ui/RelatedTools';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

const RELATED: Record<string, { href: string; label: string }[]> = {
  en: [{ href: '/calculator/biological-age', label: 'Biological Age Calculator' }, { href: '/calculator/bmi', label: 'BMI Calculator' }],
  ru: [{ href: '/calculator/biological-age', label: 'Калькулятор биологического возраста' }, { href: '/calculator/bmi', label: 'Калькулятор ИМТ' }],
  uk: [{ href: '/calculator/biological-age', label: 'Калькулятор біологічного віку' }, { href: '/calculator/bmi', label: 'Калькулятор ІМТ' }],
  fr: [{ href: '/calculator/biological-age', label: 'Âge biologique' }, { href: '/calculator/bmi', label: 'Calculatrice IMC' }],
  lt: [{ href: '/calculator/biological-age', label: 'Biologinio amžiaus skaičiuotuvas' }, { href: '/calculator/bmi', label: 'KMI skaičiuotuvas' }],
};

const META: Record<string, { title: string; description: string; h1: string }> = {
  en: { title: 'Diabetes Risk Calculator — FINDRISC Score Test', description: 'Free diabetes risk calculator based on the validated FINDRISC questionnaire. Assess your 10-year risk of developing type 2 diabetes in under 2 minutes.', h1: 'Diabetes Risk Calculator' },
  ru: { title: 'Калькулятор риска диабета — тест FINDRISC', description: 'Бесплатный калькулятор риска диабета на основе валидированного опросника FINDRISC. Оцените риск развития диабета 2 типа за 10 лет менее чем за 2 минуты.', h1: 'Калькулятор риска диабета' },
  uk: { title: 'Калькулятор ризику діабету — тест FINDRISC', description: 'Безкоштовний калькулятор ризику діабету на основі валідованого опитувальника FINDRISC. Оцініть ризик розвитку діабету 2 типу за 10 років менш ніж за 2 хвилини.', h1: 'Калькулятор ризику діабету' },
  fr: { title: 'Calculatrice de risque de diabète — Score FINDRISC', description: 'Calculatrice de risque de diabète gratuite basée sur le questionnaire FINDRISC validé. Évaluez votre risque de développer un diabète de type 2 sur 10 ans en moins de 2 minutes.', h1: 'Calculatrice de risque de diabète' },
  lt: { title: 'Diabeto rizikos skaičiuotuvas — FINDRISC testas', description: 'Nemokamas diabeto rizikos skaičiuotuvas, pagrįstas patvirtintu FINDRISC klausimynu. Įvertinkite 10 metų 2 tipo diabeto išsivystymo riziką per mažiau nei 2 minutes.', h1: 'Diabeto rizikos skaičiuotuvas' },
};

const CONTENT: Record<string, { description: string; faqTitle: string; faqs: { q: string; a: string }[] }> = {
  en: {
    description: 'This diabetes risk calculator is based on the FINDRISC (Finnish Diabetes Risk Score) questionnaire, one of the most widely validated screening tools for type 2 diabetes risk. It evaluates nine key risk factors: age, BMI, waist circumference, physical activity, diet, history of elevated blood glucose, blood pressure medication, and family history. The resulting score estimates your probability of developing type 2 diabetes within the next 10 years.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) is a validated questionnaire developed in Finland and adopted by the International Diabetes Federation. It accurately identifies individuals at high risk of developing type 2 diabetes using simple, non-invasive questions. Studies show it has a sensitivity of about 78% and specificity of 77% for detecting undiagnosed type 2 diabetes.' },
      { q: 'What score means high risk?', a: 'FINDRISC scores: 0–7 = Low risk (1% chance over 10 years), 7–11 = Slightly elevated (4%), 12–14 = Moderate (17%), 15–20 = High (33%), 21–26 = Very high (50%). Scores of 15+ are clinically significant and warrant medical consultation and a blood glucose test.' },
      { q: 'Can type 2 diabetes be prevented?', a: 'Yes — research shows that lifestyle intervention in high-risk individuals can reduce type 2 diabetes incidence by 58%. Key interventions: losing 5–7% of body weight if overweight, at least 150 minutes of moderate exercise per week, reducing saturated fat and increasing fiber intake. Early intervention is far more effective than later treatment.' },
      { q: 'Is this a medical diagnosis?', a: 'No. This calculator is a screening tool only. A high score does not mean you have diabetes — it indicates elevated risk that warrants further evaluation by a healthcare professional. Only blood tests (fasting glucose, HbA1c, or oral glucose tolerance test) can confirm a diabetes diagnosis.' },
    ],
  },
  ru: {
    description: 'Калькулятор риска диабета основан на опроснике FINDRISC (Finnish Diabetes Risk Score) — одном из наиболее валидированных инструментов скрининга риска сахарного диабета 2 типа. Он оценивает девять ключевых факторов риска: возраст, ИМТ, окружность талии, физическую активность, питание, историю повышенного сахара, приём препаратов от давления и семейный анамнез. Результирующий балл оценивает вероятность развития диабета 2 типа в течение 10 лет.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Что такое FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) — валидированный опросник, разработанный в Финляндии и принятый Международной федерацией диабета. Он выявляет людей с высоким риском развития диабета 2 типа с помощью простых неинвазивных вопросов. Чувствительность — около 78%, специфичность — 77%.' },
      { q: 'Какой балл означает высокий риск?', a: 'Баллы FINDRISC: 0–7 = низкий риск (1% за 10 лет), 7–11 = немного повышен (4%), 12–14 = умеренный (17%), 15–20 = высокий (33%), 21–26 = очень высокий (50%). Баллы от 15 требуют консультации врача и анализа крови на сахар.' },
      { q: 'Можно ли предотвратить диабет 2 типа?', a: 'Да — исследования показывают, что изменение образа жизни у людей из группы риска снижает заболеваемость диабетом на 58%. Ключевые меры: снижение веса на 5–7% при избыточном весе, не менее 150 минут умеренных нагрузок в неделю, уменьшение насыщенных жиров и увеличение клетчатки в рационе.' },
      { q: 'Это медицинский диагноз?', a: 'Нет. Это инструмент скрининга. Высокий балл не означает наличие диабета — он указывает на повышенный риск, требующий обследования у врача. Только анализы крови (глюкоза натощак, HbA1c или тест с нагрузкой глюкозой) могут подтвердить диагноз.' },
    ],
  },
  uk: {
    description: 'Калькулятор ризику діабету заснований на опитувальнику FINDRISC — одному з найбільш валідованих інструментів скринінгу ризику цукрового діабету 2 типу. Він оцінює дев\'ять ключових факторів ризику: вік, ІМТ, окружність талії, фізичну активність, харчування, історію підвищеного цукру, прийом ліків від тиску та сімейний анамнез.',
    faqTitle: 'Часті запитання',
    faqs: [
      { q: 'Що таке FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) — валідований опитувальник, розроблений у Фінляндії і прийнятий Міжнародною федерацією діабету. Він виявляє людей з високим ризиком розвитку діабету 2 типу за допомогою простих неінвазивних запитань. Чутливість — близько 78%, специфічність — 77%.' },
      { q: 'Який бал означає високий ризик?', a: 'Бали FINDRISC: 0–7 = низький ризик (1% за 10 років), 7–11 = дещо підвищений (4%), 12–14 = помірний (17%), 15–20 = високий (33%), 21–26 = дуже високий (50%). Бали від 15 потребують консультації лікаря та аналізу крові на цукор.' },
      { q: 'Чи можна запобігти діабету 2 типу?', a: 'Так — зміна способу життя у людей з групи ризику знижує захворюваність на 58%. Ключові заходи: зниження ваги на 5–7% при надмірній вазі, не менше 150 хвилин помірних навантажень на тиждень, зменшення насичених жирів і збільшення клітковини.' },
      { q: 'Це медичний діагноз?', a: 'Ні. Це інструмент скринінгу. Лише аналізи крові (глюкоза натщесерце, HbA1c або тест з навантаженням глюкозою) можуть підтвердити діагноз.' },
    ],
  },
  fr: {
    description: 'Cette calculatrice de risque de diabète est basée sur le questionnaire FINDRISC (Finnish Diabetes Risk Score), l\'un des outils de dépistage les plus validés pour le risque de diabète de type 2. Il évalue neuf facteurs de risque clés : âge, IMC, tour de taille, activité physique, alimentation, antécédents de glycémie élevée, médicaments antihypertenseurs et antécédents familiaux.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Qu\'est-ce que le FINDRISC ?', a: 'Le FINDRISC (Finnish Diabetes Risk Score) est un questionnaire validé développé en Finlande et adopté par la Fédération internationale du diabète. Il identifie les personnes à risque élevé de développer un diabète de type 2 avec une sensibilité d\'environ 78 % et une spécificité de 77 %.' },
      { q: 'Quel score indique un risque élevé ?', a: 'Scores FINDRISC : 0–7 = faible risque (1 % sur 10 ans), 7–11 = légèrement élevé (4 %), 12–14 = modéré (17 %), 15–20 = élevé (33 %), 21–26 = très élevé (50 %). Un score ≥ 15 justifie une consultation médicale et un test de glycémie.' },
      { q: 'Peut-on prévenir le diabète de type 2 ?', a: 'Oui — des études montrent que l\'intervention sur le mode de vie réduit l\'incidence du diabète de 58 %. Mesures clés : perdre 5 à 7 % du poids corporel si en surpoids, au moins 150 minutes d\'exercice modéré par semaine, réduire les graisses saturées et augmenter les fibres.' },
      { q: 'Est-ce un diagnostic médical ?', a: 'Non. Il s\'agit uniquement d\'un outil de dépistage. Seuls des tests sanguins (glycémie à jeun, HbA1c ou test de tolérance au glucose) peuvent confirmer un diagnostic de diabète.' },
    ],
  },
  lt: {
    description: 'Šis diabeto rizikos skaičiuotuvas pagrįstas FINDRISC (Finnish Diabetes Risk Score) klausimynu — vienu iš labiausiai patvirtintų 2 tipo diabeto rizikos atrankos įrankių. Jis įvertina devynis pagrindinius rizikos veiksnius: amžių, KMI, juosmens apimtį, fizinį aktyvumą, mitybą, padidėjusio cukraus kiekio kraujyje istoriją, vaistų nuo spaudimo vartojimą ir šeimos istoriją.',
    faqTitle: 'Dažniausiai užduodami klausimai',
    faqs: [
      { q: 'Kas yra FINDRISC?', a: 'FINDRISC (Finnish Diabetes Risk Score) — patvirtintas klausimynas, sukurtas Suomijoje ir priimtas Tarptautinės diabeto federacijos. Jis identifikuoja asmenis, kurių rizika susirgti 2 tipo diabetu yra didelė, naudodamas paprastus neinvazinius klausimus. Jautrumas — apie 78 %, specifiškumas — 77 %.' },
      { q: 'Koks balas rodo didelę riziką?', a: 'FINDRISC balai: 0–7 = maža rizika (1 % per 10 metų), 7–11 = šiek tiek padidėjusi (4 %), 12–14 = vidutinė (17 %), 15–20 = didelė (33 %), 21–26 = labai didelė (50 %). Balai nuo 15 reikalauja medicininės konsultacijos ir kraujo cukraus testo.' },
      { q: 'Ar galima išvengti 2 tipo diabeto?', a: 'Taip — tyrimai rodo, kad gyvenimo būdo pakeitimai didelės rizikos asmenims sumažina diabeto dažnį 58 %. Pagrindinės priemonės: sumažinti svorį 5–7 % esant antsvorį, ne mažiau kaip 150 minučių vidutinio intensyvumo pratimų per savaitę, mažinti sočiuosius riebalus ir didinti skaidulinių medžiagų kiekį.' },
      { q: 'Ar tai medicininė diagnozė?', a: 'Ne. Tai tik atrankos priemonė. Tik kraujo tyrimai (gliukozė nevalgius, HbA1c arba gliukozės tolerancijos testas) gali patvirtinti diabeto diagnozę.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return { title: meta.title, description: meta.description, alternates: buildAlternates(locale, '/calculator/diabetes-risk') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DiabetesRiskPage({ params }: Props) {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const content = CONTENT[locale] || CONTENT.en;
  const related = RELATED[locale] || RELATED.en;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: meta.title, description: meta.description, url: `https://www.utilixi.com/${locale}/calculator/diabetes-risk`, applicationCategory: 'HealthApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout sidebar={<AdSidebar locale={locale} />}>
        <h1 className={styles.page__title}>{meta.h1}</h1>
        <DiabetesRiskCalculator locale={locale} />
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
