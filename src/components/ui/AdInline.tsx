import AdPlaceholder from './AdPlaceholder';
import styles from './AdInline.module.scss';

type Props = {
  locale: string;
};

// Shown on mobile/tablet only (hidden on desktop ≥1024px where sidebar is visible).
// Replace the inner AdPlaceholder with an <ins> AdSense tag when approved.
export default function AdInline({ locale }: Props) {
  return (
    <div className={styles['ad-inline']}>
      <AdPlaceholder locale={locale} size="banner" />
    </div>
  );
}
