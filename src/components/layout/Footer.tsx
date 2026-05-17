import Link from 'next/link';
import styles from './Footer.module.scss';

type Props = {
  locale: string;
};

const TOOLS = [
  { href: '/calculator/mortgage', labelEn: 'Mortgage Calculator' },
  { href: '/calculator/loan', labelEn: 'Loan Calculator' },
  { href: '/calculator/bmi', labelEn: 'BMI Calculator' },
  { href: '/calculator/calories', labelEn: 'Calorie Calculator' },
  { href: '/currency', labelEn: 'Currency Converter' },
];

export default function Footer({ locale }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>
        <div className={styles.footer__tools}>
          <p className={styles.footer__tools_title}>Tools</p>
          <ul className={styles.footer__tools_list}>
            {TOOLS.map((tool) => (
              <li key={tool.href}>
                <Link href={`/${locale}${tool.href}`} className={styles.footer__link}>
                  {tool.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__legal}>
          <ul className={styles.footer__legal_list}>
            <li>
              <Link href={`/${locale}/about`} className={styles.footer__link}>About</Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className={styles.footer__link}>Contact</Link>
            </li>
            <li>
              <Link href={`/${locale}/privacy-policy`} className={styles.footer__link}>Privacy Policy</Link>
            </li>
          </ul>
          <p className={styles.footer__copyright}>
            © {currentYear} Utilixi. Free online tools.
          </p>
        </div>
      </div>
    </footer>
  );
}
