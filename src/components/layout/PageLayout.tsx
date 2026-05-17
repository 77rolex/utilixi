import styles from './PageLayout.module.scss';

type Props = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  // centered: no sidebar, content block centered with max-width
  centered?: boolean;
};

export default function PageLayout({ children, sidebar, centered }: Props) {
  const innerClass = [
    styles['page-layout__inner'],
    centered && !sidebar ? styles['page-layout__inner--centered'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles['page-layout']}>
      <div className={`container ${innerClass}`}>
        <main className={styles['page-layout__content']}>
          {children}
        </main>
        {sidebar && (
          <aside className={styles['page-layout__sidebar']}>
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  );
}
