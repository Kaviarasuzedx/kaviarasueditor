# Kaviarasu — Video Editor & Motion Designer

**Final Step 7 release candidate: all seven implementation steps integrated.** A five-page cinematic portfolio for a video editor and motion designer with 2+ years of experience.

> **Release gate:** The complete source, local SVG assets, OG/Twitter previews and contact validation suites have passed static checks. The authoring environment could not reach the npm registry to install Next.js dependencies, so a genuine `next build`, browser QA and Lighthouse measurement are **not verified**. Treat this as a deployable *candidate*, not a tested live site, until the production checklist below passes.

## Technology

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3.4, Framer Motion, GSAP (available), React Three Fiber + Drei, Lenis smooth scrolling, `next/font` for Inter, Clash Display via Fontshare. No database; optional Resend REST delivery for the contact form.

## Five pages

| URL | Features |
| --- | --- |
| `/` | Cinematic hero, lazy low-poly 3D clapperboard, stock-footage demo showreel, services preview, featured creative concepts, animated waveform, capability stats, sample quotes, CTA |
| `/work` | Responsive masonry, 7 filters, 10 labeled demo concepts, hover-to-play video previews, complete modal details, skeleton/fallback states |
| `/about` | About statement, 5 creative skills, Adobe tool showcase, **illustrative** journey/timeline and behind-the-scenes art |
| `/services` | Six services with deliverables/format/indicative turnaround, Brief→Edit→Review→Deliver process, FAQ and quote CTA |
| `/contact` | 3D envelope fallback, 5-field validated inquiry, explicit consent, server-side API, optional real Resend sending, configurable direct contact channels |

### Installation (Windows PowerShell)

Requirements: Node.js **22 LTS** recommended, npm, and internet access to install dependencies and load fonts/videos. Open the **project root** (the folder containing `package.json`) in VS Code:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. If `.env.local` already exists, edit it instead of overwriting it. The initial install creates `package-lock.json`; **commit that lockfile** for reproducible future builds, then prefer `npm ci` in deployments.

### Common scripts

```powershell
npm run validate:content    # 10 demo concepts, filters and poster images
npm run validate:pages      # skills, services, process, FAQs and illustrations
npm run test:contact        # 17 mock validation/route tests, no real email
npm run verify:release      # social preview images, route/meta/static asset checks
npm run typecheck
npm run lint
npm run build
npm start
```

`npm run qa` executes all checks above in one command; requires dependencies installed. The independent `npm run verify:release` needs Node but no installed packages.

## Release / SEO setup

Set **`NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com`** at build/deploy time. Do not keep the example `localhost` URL in a live deployment. The site intentionally sets `noindex` metadata and `robots.txt: Disallow: /` until an explicit non-placeholder **HTTPS** domain is configured. This protects unfinished demo content from accidental indexing. Once configured, `app/sitemap.ts` publishes all five routes, while `app/robots.ts` allows public pages and excludes `/api/`.

The project includes:

- **Five unique OpenGraph preview images** at 1200×630 (plus corresponding Twitter versions), generated in the matching dark/amber visual language.
- **Favicon SVG** and branded 180×180 PNG Apple touch icon, plus `app/manifest.ts`.
- Route-specific descriptions, canonical paths, social metadata, and **Person/WebSite JSON-LD** with verified-only facts (no fabricated reviews or client lists).
- Default security headers (`nosniff`, frame protection, restricted browser feature permissions and conservative referrer policy).
- Route fade transitions with reduced-motion opt-out; desktop-only motion cursor; Lenis smooth scroll; navigation announcements, keyboard focus and accessible error boundaries.

The OG images are real image assets in the ZIP, not remotely fetched at runtime. To redesign them, edit `scripts/generate-opengraph.py` and run it with Python + Pillow. **No font files are redistributed.**

## Enable real contact email delivery

The form will return a clear **503/unconfigured** response until a verified sender and inbox are specified. Configure server-only environment settings:

```dotenv
RESEND_API_KEY=re_replace_with_your_real_key
CONTACT_FROM_EMAIL=Kaviarasu Portfolio <hello@your-verified-domain.com>
CONTACT_TO_EMAIL=you@your-domain.com
```

These are **examples**, not live contact addresses. Next.js does not load `.env.example`; copy its settings into a local `.env.local` file and set values there. For Instagram, use the full profile URL, for example `NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your_username/` (replace `your_username` with the real account). Restart the development server after editing `.env.local`; for deployment, set the variable in the hosting provider and rebuild/redeploy. Do not share or commit `.env.local`, and never add `NEXT_PUBLIC_` to API keys or inbox credentials. To enable public email and social links, set the optional `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_DISCORD_URL`, `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_FIVERR_URL` and `NEXT_PUBLIC_GITHUB_URL`. Existing `NEXT_PUBLIC_BEHANCE_URL` is accepted as a fallback for Fiverr. Empty or invalid URLs are intentionally shown as unavailable; no invented identities are used.

The API performs client/server validation, field allowlisting, payload size limits, same-site Origin checking, a honeypot and a **per-process best-effort** rate limit. Production deployments with serverless replication should use provider/edge abuse prevention and a distributed rate limiter; add an appropriate privacy notice and retention policy before collecting real client inquiries. Real email success has **not** been end-to-end verified; Resend mocked API cases passed and should be checked against a real verified sender/inbox.

## Replace demo data before publicly showcasing work

- `data/projects.ts` — 10 **fictional concepts**, with HTTPS stock-footage URLs and local SVG posters. Replace titles, credits, clips, format labels, dates and briefs with approved actual client work. Any sample video that does not play falls back to the local poster or a source link.
- `data/testimonials.ts` — **demonstration quotes**, explicitly labeled non-endorsements. Replace with written client permission or remove the section entirely.
- `data/about.ts` — **illustrative milestone dates** and BTS content; replace with accurate milestones and licensed imagery.
- `public/posters/`, `public/about/`, `public/services/` — local art placeholders. Use real video stills/portraits with permission; use `next/image` for all imagery.
- `components/sections/ReelTrigger.tsx` / `data/projects.ts` — swap stock reel with owned showreel assets.
- `app/(marketing)/contact/page.tsx` — verify availability wording matches reality.
- `app/layout.tsx` — verify the Person/WebSite JSON-LD and domain after publication.

## Performance and accessibility design

- R3F scenes are code-split and mount only near the viewport when motion is allowed and WebGL 2 is available, including on compatible mobile devices. Local vector art is used when motion is reduced or WebGL is unavailable.
- MP4 previews load only when requested by hover/visibility; inline previews are muted and stop on exit. The modal player uses `preload="none"`.
- Images use Next's responsive `next/image`; stock visuals have local fallbacks and loading states.
- Motion honors `prefers-reduced-motion`; content uses semantic headings and buttons, visible focus rings, aria labels/live updates, native accordion semantics, and server/client form validation.
- `next/font` automatically self-hosts Inter during a successful build. Clash Display loads via Fontshare with system fallback. Test blocked-font/network behavior.

## Production verification checklist

- [ ] Run `npm install` on Node 22+ and commit the resulting `package-lock.json`.
- [ ] Run `npm run qa` with exit code 0; resolve **all** build/typecheck/lint errors.
- [ ] Launch a real production build (`npm run build && npm start`) and test all five routes, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, social preview tags and `/api/contact`.
- [ ] Test 320px, 375px, 768px, 1024px, 1440px, and 4K widths, in both desktop and mobile browsers.
- [ ] Navigate only by keyboard; check modals for trapped focus/return focus, arrow controls, skip link, form validation, error messages and a reduced-motion environment.
- [ ] Verify actual stock video sources/owned assets work in all target browsers; ensure no copyrighted content is shown without permission.
- [ ] Configure a **real HTTPS domain**, contact channels, and verified Resend sender; submit a real test inquiry and verify inbox receipt.
- [ ] Replace every demo concept, quote, portrait and timeline example with approved material **before representing it as client work**.
- [ ] Run Lighthouse against the *deployed production website* on mobile and desktop. The requested ≥90 for Performance, Accessibility and SEO is a **target, not a measured result**.
- [ ] Verify analytics/privacy/data-retention practices and enable abuse protection before announcing the site publicly.
- [ ] Add a dedicated privacy policy appropriate to the business and contact form.

## Incremental history

1. Foundation, tokens, layouts, five routes.
2. Shared UI components, navigation/footer, cursor/Lenis.
3. Cinematic home and lazy R3F clapperboard.
4. Filterable work gallery, video previews, project detail modal.
5. About and Services editorial pages.
6. Contact form, API and R3F envelope.
7. **This release:** page transitions, scroll-progress indicator, route announcements, error boundaries, canonical/SEO metadata, robots/sitemap, branded OG/Twitter assets, site manifest, release verification and CI recipe.

## CI

`.github/workflows/quality.yml` runs validations and a production build on Node 22 in GitHub Actions. It uses `npm install` because a lockfile could not be generated without registry access in the authoring environment. **After your first successful local installation, commit the lockfile and switch the CI install command to `npm ci`.**
