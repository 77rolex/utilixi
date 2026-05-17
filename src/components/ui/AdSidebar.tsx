import AdPlaceholder from './AdPlaceholder';

type Props = {
  locale: string;
};

// When AdSense is approved:
// 1. Add <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"> to layout
// 2. Replace AdPlaceholder with <ins class="adsbygoogle" ...> tags
export default function AdSidebar({ locale }: Props) {
  return <AdPlaceholder locale={locale} size="sidebar" />;
}
