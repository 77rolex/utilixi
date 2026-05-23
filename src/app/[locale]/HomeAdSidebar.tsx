'use client';

import { useEffect, useRef } from 'react';
import AdSidebar from '@/components/ui/AdSidebar';

// header 60px + var(--spacing-lg) 24px + margin-top 72px
const STICKY_TOP = 156;

type Props = {
  locale: string;
  className: string;
};

export default function HomeAdSidebar({ locale, className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const banner = document.getElementById('home-banner-ad');
      if (!banner || !el.parentElement) return;

      const bannerBottom = banner.getBoundingClientRect().bottom;
      const elHeight = el.offsetHeight;

      if (bannerBottom <= STICKY_TOP + elHeight) {
        // Останавливаем: absolute, нижний край сайдбара = нижнему краю баннера
        const parentTop = el.parentElement.getBoundingClientRect().top;
        el.style.position = 'absolute';
        el.style.top = `${bannerBottom - parentTop - elHeight}px`;
      } else {
        el.style.position = '';
        el.style.top = '';
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <aside ref={ref} className={className}>
      <AdSidebar locale={locale} />
    </aside>
  );
}
