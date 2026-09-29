# Deenify — Islamic Companion App

Next.js App Router frontend for an Islamic lifestyle platform: Qur'an, Hadith, prayer, dhikr, guides, catalogs, profile, and marketing pages. App name, URLs, and social links are driven by environment variables (`NEXT_PUBLIC_APP_NAME`, etc.).

## Stack

- **Next.js 13** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS 3** · Radix UI · shadcn-style components (`components/ui`)
- **Zod** — env validation · **Zustand** — client state (Qur'an / Hadith)
- **Framer Motion** — marketing animations · **Recharts** · **Swiper**

## Quick start

```bash
cd app
npm install
cp .env.example .env.local   # fill in all required values
npm run dev                  # http://localhost:1426
```

### Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`  | Dev server on port **1426**          |
| `npm run dev-ip` | Dev server bound to LAN IP         |
| `npm run dev-qr` | Dev server + terminal QR for mobile |
| `npm run build`| Production build                     |
| `npm run start`| Serve production build               |
| `npm run lint` | Next.js ESLint                       |

## Environment

- Local secrets → **`.env.local`** (never commit)
- Template → **`.env.example`**
- Do **not** read env vars directly in components; use the validated modules:

| Module            | Use case                          |
| ----------------- | --------------------------------- |
| `@/env/client`    | Browser-safe `NEXT_PUBLIC_*` vars |
| `@/env/server`    | Server-only secrets (`server-only` guard) |

Both files parse with **Zod** at startup — missing or invalid values fail fast.

Required public vars include `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_DASHBOARD_URL`, `NEXT_PUBLIC_APP_SUPPORT_EMAIL`, API URL/key, and social URLs. Server-only: `SUPABASE_*`, `ENCODING_SECRET`, `JWT_SECRET`.

## Folder structure

```
app/
├── config.ts                 # Shared API constants (Qur'an languages, Hadith books)
├── scripts/                  # dev-ip, dev-qr helpers
└── src/
    ├── app/                  # App Router (route groups below)
    │   ├── (marketing)/      # Public site: /, /about, /pricing, …
    │   ├── (auth)/           # /login, /register
    │   └── (dashboard)/      # Authenticated app: /dashboard, /quran, /prayer, …
    ├── assets/               # globals.css, fonts, meta, SVG icons
    ├── components/
    │   ├── layout/           # Marketing, dashboard, auth shells
    │   ├── pages/            # Feature UI (dashboard/*, platform/*, auth, profile)
    │   ├── shared/           # Reusable UI (motion, charts, modals, …)
    │   └── ui/               # Primitives (Button, Dialog, …)
    ├── constant/             # App-wide constants
    ├── context/              # React context providers
    ├── env/                  # client.ts, server.ts
    ├── hooks/                # useBreakpoint, usePagination, …
    ├── lib/
    │   ├── utils/            # Pure helpers (clsx, format-date)
    │   └── notification/     # Notify / permissions
    ├── middleware.ts         # Theme cookie bootstrap
    └── store/                # Zustand stores (quran, hadith)
```

### Route groups

Route groups `(marketing)`, `(auth)`, `(dashboard)` organize layouts; they do **not** appear in the URL.

- **Marketing** — header/footer layout, home sections under `components/pages/platform/home/`
- **Dashboard** — sidebar, bottom bar, scroll container; pages stay thin and delegate to `components/pages/dashboard/`
- **Profile** — nested under `(dashboard)/profile/` with its own layout

### Page vs component pattern

- `src/app/**/page.tsx` — metadata, route entry, minimal JSX
- `src/components/pages/**` — actual page UI
- `content.ts` next to a feature — static copy, nav items, cards (no fetch)

## Naming

| Kind                         | Convention        | Example              |
| ---------------------------- | ----------------- | -------------------- |
| Constants                    | `UPPER_SNAKE_CASE`| `POINTS_BASE_DELAY`  |
| Variables, functions, hooks  | `camelCase`       | `useBreakpoint`      |
| Types, components, files     | `PascalCase`      | `MarketingHeroSection` |
| Never                        | `var`             | use `const` / `let`  |

## Components

- Prefer **arrow function** components; name must match the file (`MarketingHeroSection.tsx` → `MarketingHeroSection`)
- `"use client"` only when hooks, state, or browser APIs are needed
- Colocate small types in the same file; shared store types → `store/<feature>/*.types.ts`
- Icons in `src/assets/svg/` — prefer **SVG + `currentColor`**, not styled `<span>` bars (global CSS resets affect spans)
- Responsive copy: use `useBreakpoint("sm", "up")` (or `"md"`, `"xs"`) — breakpoints match `tailwind.config.ts` (`xs: 480`, `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1170`)

## Types

- Prefer **`type`** over `interface`
- No **`any`** in production code — use `unknown` or Zod-inferred types
- Store/feature types live beside the store (`quran.types.ts`, `hadith.types.ts`)

## Utils & data

| Location              | Purpose                                      |
| --------------------- | -------------------------------------------- |
| `lib/utils/`          | Pure functions, no side effects              |
| `lib/notification/`   | Browser notification helpers                 |
| `config.ts`           | Qur'an language lists, Hadith book sets      |
| `store/`              | Client state + selectors                     |
| `hooks/`              | React hooks only                             |

Feature `content.ts` files hold UI copy and config arrays — not API fetch logic.

## Code style

- **Prettier** — format on save (VS Code extension recommended)
- **ESLint** — `npm run lint` before push
- Import alias: `@/*` → `src/*`
- Tailwind: use `cn()` from `@/lib/utils/clsx`; custom screens/colors/fonts in `tailwind.config.ts` and `globals.css`

### Route comment (required on every `page.tsx`)

Add a single line at the top describing the public route path (omit route-group folders):

```ts
// app/dashboard/page.tsx
```

Keep this comment in production — it helps navigation and debugging across the team.

## Security

- No **`console.log`** in production-bound code
- Never commit **`.env`**, **`.env.local`**, or secrets
- **`NEXT_PUBLIC_`** prefix only for values safe in the browser
- Server secrets only in `@/env/server` (never import in client components)
- Sanitize and validate user input; prefer Zod at boundaries

## Git workflow

- Branches: `FEAT/`, `FIX/`, `REFACTOR/` + short description
- Conventional commits encouraged
- Pull / rebase before push
- **Never push directly to `main`** — open a PR with a clear description

## Before push / production

- [ ] `.env.local` complete locally; production env set on host (Vercel, etc.)
- [ ] `npm run build` passes
- [ ] `npm run lint` clean (recommended)
- [ ] Prettier applied
- [ ] No stray `console.log`
- [ ] No unnecessary comments (except `page.tsx` route line)
- [ ] README / `.env.example` updated if env or structure changed

## Production

```bash
npm run build
npm run start
```

Set the same env vars as `.env.example` on the deployment platform. Ensure `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_APP_DASHBOARD_URL` match the live domains.
