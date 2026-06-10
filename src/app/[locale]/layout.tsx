import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ru' | 'uk' | 'fr' | 'lt')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
        <main className="main-content">
          <Breadcrumbs locale={locale} />
          {children}
        </main>
        <Footer locale={locale} />
        <CookieBanner locale={locale} />
        <Analytics />
        <SpeedInsights />
      </NextIntlClientProvider>
    </>
  );
}
