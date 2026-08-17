# Looking Up Business Solutions — Website (v2, Tailwind + TypeScript + shadcn)

This is a full rebuild of the Looking Up static website using the design
system and stack from the approved Lovable mockup: **Tailwind CSS v4,
TypeScript, and shadcn/Radix UI components** — replacing the earlier
plain-CSS/JavaScript version.

---

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme`, no `tailwind.config.js`)
- **shadcn/ui** component conventions, built on **Radix UI** primitives
- **EmailJS** for the product inquiry form (same as the previous version)

---

## Design system

The entire visual identity — palette, type, the `glass`/`shadow-teal`/
`gradient-teal`/`animate-float` utilities — lives in `src/index.css`,
ported directly from the approved Lovable design file. Colors are defined
in OKLCH and mapped to semantic CSS variables (`--primary`, `--accent`,
etc.) plus a few brand-specific tokens (`--teal`, `--teal-deep`, `--gold`,
`--paper`, `--cream`, `--ink`).

To adjust the palette or type, edit the `:root` block and `@theme inline`
block in `src/index.css` — every component reads from these variables, so
a change there updates the whole site.

---

## Project structure

```
src/
  components/
    Header.tsx, Footer.tsx, Logo.tsx     → layout
    Hero.tsx, About.tsx, Clients.tsx,     → page sections
    Exhibitions.tsx, Contact.tsx
    InquiryModal.tsx                      → product inquiry form + EmailJS
    ui/                                   → shadcn primitives (Button, Card,
                                             Badge, Alert, AlertDialog, Avatar,
                                             Accordion, Breadcrumb, AspectRatio)
  data/
    site.ts            → customers, products, exhibitions (typed)
    emailjsConfig.ts    → EmailJS service/template/public keys
  lib/
    utils.ts           → cn() class-merging helper used by every shadcn component
  assets/
    logos/              → brand logo files
index.css               → design tokens + Tailwind v4 theme + custom utilities
```

---

## Updating content

### Add or edit a featured company
Edit `src/data/site.ts` — `Customer` and `Product` are typed interfaces, so
your editor will flag any missing required field.

### Add a real company logo
Place the image in `src/assets/` (or a new `src/assets/clients/` folder),
import it at the top of `site.ts`, and set `logo: yourImport` on that
company's entry. Leave `logo` unset and the card shows a clean initials
badge automatically.

### Set up EmailJS (required before the inquiry form can send)
Same as before — see `src/data/emailjsConfig.ts` for the three values
needed (Service ID, Template ID, Public Key) from your EmailJS dashboard.
Template variables expected: `company_name`, `product_name`, `from_name`,
`from_company`, `from_email`, `from_phone`, `message`.

---

## Running locally

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build      # outputs static files into dist/, built for root path (/)
```

For GitHub Pages (subfolder deployment), build with:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

(See `vite.config.ts` for the deploy-target note — same dual-target
pattern as the previous version of this site.)

---

## What's different from the previous (plain-CSS) version

- Every component is now `.tsx` with typed props/data instead of `.jsx`.
- Styling is utility-first Tailwind classes instead of separate `.css`
  files per component — there is no more `src/styles/` folder.
- shadcn's `components/ui/` primitives are included and ready to use for
  any future additions (dialogs, accordions, badges, etc.) without needing
  to hand-roll them.
- The magazine flipbook viewer and exhibition carousel have been ported
  over and rebuilt against this Tailwind/TypeScript structure — see below.

---

## Magazine viewer (digital edition)

`src/components/FlipBook.tsx` is a self-hosted, page-by-page PDF viewer
(via `react-pdf`), lazy-loaded by `src/components/Magazine.tsx` so its
fairly large rendering library only downloads once a visitor scrolls to
that section.

**Swapping in the real issue**, once ready:
1. Put the PDF into `public/magazine/`.
2. Update the `file` path in `src/data/magazine.ts`.

A placeholder sample PDF ships in `public/magazine/sample-issue.pdf` so
the feature works end-to-end before a real issue is ready.

> **Setup note:** `npm install` automatically copies the pdf.js worker
> file into `public/` via the `postinstall` script in `package.json`
> (`scripts/copy-pdf-worker.js`). If you ever see the magazine viewer fail
> to load with a worker-related console error, re-run `npm install`.

---

## Exhibition banner carousel

`src/components/ExhibitionCarousel.tsx` sits directly under the fixed
navbar and displays client-supplied, finished promotional posters (like
a trade-show flyer) full-bleed — it never overlays its own text on top,
since these images already have their own complete design.

**Adding a new exhibition banner:**
1. Get the poster from the client. Ask for:
   - Desktop: 1600×500px landscape, JPEG/PNG, under 300KB
   - Mobile: 1080×1350px portrait, JPEG/PNG, under 250KB
2. Compress both to WebP (75–80% quality, e.g. via squoosh.app) and add
   to `src/assets/banners/`.
3. Import them and add an entry in `src/data/upcomingExhibitions.ts`.

With only one entry (the current default), no arrows/dots are shown —
they appear automatically once there's more than one slide to navigate.
