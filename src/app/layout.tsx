import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.utilixi.com'),
  title: {
    default: 'Utilixi — Free Online Tools',
    template: '%s | Utilixi',
  },
  description: 'Free online calculators and tools — mortgage, BMI, currency converter and more.',
  verification: {
    yandex: 'e68574f6d0468744',
  },
};

const LOCALES = ['en', 'ru', 'uk', 'fr', 'lt'];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : 'en';

  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Anti-flash: установить тему до первого рендера */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('utilixi_theme')==='dark')document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('preload');window.addEventListener('load',function(){document.documentElement.classList.remove('preload');});}catch(e){}})();` }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        {ymId && (
          <>
            <Script
              id="ym-init"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  setTimeout(function(){
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
                    ym(${ymId},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
                  }, 50);
                `,
              }}
            />
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${ymId}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
