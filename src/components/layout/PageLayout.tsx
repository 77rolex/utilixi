import styles from './PageLayout.module.scss';

type Props = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  // centered: no sidebar, content block centered with max-width
  centered?: boolean;
};

export default function PageLayout({ children, sidebar, centered }: Props) {
  const isCentered = centered && !sidebar;

  return (
    <div className={styles['page-layout']}>
      <div className={`container ${styles['page-layout__inner']}`}>
        <main className={[
          styles['page-layout__content'],
          isCentered ? styles['page-layout__content--centered'] : '',
        ].filter(Boolean).join(' ')}>
          {children}
        </main>
        {sidebar && (
          <aside className={styles['page-layout__sidebar']}>
            <div className={styles['page-layout__sidebar-sticky']}>
              {sidebar}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
