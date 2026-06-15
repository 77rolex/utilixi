import styles from './DisclaimerNote.module.scss';

const T: Record<string, string> = {
  en: 'Results are estimates for informational purposes only and do not constitute financial, legal, or medical advice.',
  ru: 'Результаты носят ознакомительный характер и не являются финансовой, юридической или медицинской консультацией.',
  uk: 'Результати мають ознайомчий характер і не є фінансовою, юридичною або медичною консультацією.',
  fr: 'Les résultats sont des estimations à titre informatif uniquement et ne constituent pas un conseil financier, juridique ou médical.',
  lt: 'Rezultatai yra tik informacinio pobūdžio įverčiai ir nėra finansinė, teisinė ar medicininė konsultacija.',
};

export default function DisclaimerNote({ locale }: { locale: string }) {
  const text = T[locale] ?? T.en;
  return <p className={styles.disclaimer}>{text}</p>;
}
