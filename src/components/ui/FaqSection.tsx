import styles from './FaqSection.module.scss';

type Faq = { q: string; a: string };

type Props = {
  title: string;
  faqs: Faq[];
};

export default function FaqSection({ title, faqs }: Props) {
  return (
    <section className={styles.faq}>
      <h2 className={styles.faq__title}>{title}</h2>
      <div className={styles.faq__list}>
        {faqs.map((faq, i) => (
          <details key={i} className={styles.faq__item} open={i === 0}>
            <summary className={styles.faq__summary}>
              {faq.q}
              <svg className={styles.faq__arrow} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p className={styles.faq__answer}>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
