# Utilixi

Free online utility tools — calculators, converters, and more.
Live site: [utilixi.com](https://utilixi.com)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styles | SCSS Modules (no Tailwind) |
| i18n | next-intl |
| Email | Nodemailer + Gmail SMTP |
| Hosting | Vercel (Hobby) |
| Domain | Hostinger → DNS → Vercel |

---

## Languages

The site is available in 5 languages via the `[locale]` route segment:

| Code | Language |
|---|---|
| `en` | English (default) |
| `ru` | Russian |
| `uk` | Ukrainian |
| `fr` | French |
| `lt` | Lithuanian |

URLs follow the pattern `/en/calculator/mortgage`, `/ru/calculator/mortgage`, etc.

---

## Project structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                      # Per-locale layout (Header, Footer, CookieBanner)
│   │   ├── page.tsx                        # Home page — tool cards grid
│   │   ├── about/page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── ContactForm.tsx             # Client form with Turnstile CAPTCHA
│   │   ├── privacy-policy/page.tsx
│   │   └── calculator/
│   │       ├── mortgage/
│   │       │   ├── page.tsx                # SSR: metadata, JSON-LD, FAQ
│   │       │   └── MortgageCalculator.tsx  # Client widget
│   │       └── loan/
│   │           ├── page.tsx
│   │           └── LoanCalculator.tsx
│   ├── api/
│   │   └── contact/route.ts                # POST: rate limit, Turnstile, nodemailer
│   ├── layout.tsx                          # Root layout (redirect to /en)
│   └── page.tsx                            # Root redirect
├── components/
│   ├── layout/
│   │   ├── Header.tsx                      # Logo + LanguageSwitcher
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Footer.tsx                      # Columns (Tools, Pages) + copyright
│   │   └── PageLayout.tsx                  # Two-column (content + sidebar) or centered
│   └── ui/
│       ├── AdPlaceholder.tsx               # Animated ad slot (sidebar or banner size)
│       ├── AdSidebar.tsx                   # Sidebar wrapper → swap for AdSense <ins> later
│       ├── AdInline.tsx                    # Mobile/tablet banner (hidden ≥1024px)
│       └── CookieBanner.tsx                # Fixed bottom consent, saves to localStorage
├── i18n/
│   ├── routing.ts                          # next-intl locales config
│   └── request.ts                          # getRequestConfig
├── styles/
│   └── globals.scss                        # CSS variables, reset, .container
└── proxy.ts                                # next-intl middleware (Next.js 16 convention)
```

---

## Tools

### Live

| Tool | URL | Type |
|---|---|---|
| Mortgage Calculator | `/calculator/mortgage` | Pure JS (annuity formula) |
| Loan Calculator | `/calculator/loan` | Pure JS (annuity formula) |

### Planned (priority order)

| # | Tool | URL | CPC est. |
|---|---|---|---|
| 3 | BMI Calculator | `/calculator/bmi` | $0.5–2 |
| 4 | Calorie / TDEE Calculator | `/calculator/calories` | $0.5–1.5 |
| 5 | Currency Converter | `/currency` | $0.3–1 |
| 6 | Pregnancy due date | `/calculator/pregnancy` | $0.8–2 |
| 7 | Deposit Calculator | `/calculator/deposit` | $0.8–2 |
| 8 | Ideal Weight | `/calculator/ideal-weight` | $0.5–1.5 |
| 9 | Weather | `/weather` | $0.1–0.4 |
| 10 | Alimony Calculator | `/calculator/alimony` | $1–3 |

---

## SEO

Every tool page includes:

- Unique `<title>` and `<meta description>` per locale
- `hreflang` alternates for all 5 languages
- JSON-LD `WebApplication` schema markup
- `<h1>` + descriptive text + FAQ section (required for AdSense approval)
- Mobile-first layout (60–65% of traffic is mobile)

---

## Ad slots

Ad placement is pre-built and ready to swap for real AdSense tags:

| Component | Location | Visible on |
|---|---|---|
| `AdSidebar` | Right sidebar on tool pages | Desktop (≥1024px) |
| `AdInline` | Before FAQ on tool pages | Mobile + tablet (<1024px) |
| `AdPlaceholder` (banner) | Below tool grid on home page | All sizes |

To activate AdSense: replace `<AdPlaceholder />` inside each wrapper with the AdSense `<ins>` tag.

---

## Contact form

- Cloudflare Turnstile CAPTCHA (server-side verification)
- Honeypot field against basic bots
- In-memory rate limiting: 3 requests per 5 minutes per IP
- Header injection protection on all string inputs
- Sends email via Gmail SMTP using nodemailer to `okk1mind@gmail.com`

Required `.env.local` variables:

```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your_app_password
TURNSTILE_SECRET_KEY=your_turnstile_secret
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en` automatically.

## Build & deploy

```bash
npm run build   # type-check + build
npm start       # production server locally
```

Deploy is automatic on every push to `main` via Vercel GitHub integration.

---

## Design conventions

- **SCSS Modules** — one `.module.scss` per component
- **BEM naming** — strictly `block__element--modifier` everywhere
- **CSS variables only** — no hardcoded colors, spacing, or font sizes
- **Dark theme** — variables declared under `[data-theme='dark']` in `globals.scss`, not yet activated
- **No UI libraries** — no Tailwind, no MUI, no shadcn

---

## Monetization

Google AdSense — main revenue source after reaching sufficient traffic.
High-CPC niches prioritised: finance (mortgage, loan, deposit), health (BMI, calories), legal (alimony).
