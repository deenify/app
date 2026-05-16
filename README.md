# 🧾 Project Rules (Islam Companion)

## 🔤 Naming

- `UPPER_SNAKE_CASE` → constants
- `camelCase` → variables, functions
- `PascalCase` → types, interfaces, components
- ❌ Never use `var`

## 📁 Folder Structure (short)

```

src/
├── app/ # App router
├── components/ # UI components
├── config/ # Static configs (links, meta)
├── hooks/ # Custom hooks
├── lib/
│ ├── api/ # Feature logic (fetch/process)
│ └── utils/ # Pure functions (clsx, strings)
├── types/ # Global types

```

## 📐 Components

- ✅ Use arrow functions
- ✅ Component name = file name (PascalCase)
- ✅ Small logic/types inside file
- ✅ Reused types → `types/`
- ✅ Local logic → `hooks/` or `lib/api/`

## 🧠 Types

- `type` over `interface`
- No `any` — use `unknown` or schema types in prod
- Use `types.d.ts`, `types/feature.d.ts`
- Schema validation → Zod (optional)

## ⚒️ Utils

- `lib/utils/` → pure functions (no fetch or side-effects)
- `lib/api/` → fetch/transform logic
- `hooks/` → useSomething logic only

## 🧼 Code Style

- Prettier = required
- ESLint = required in dev-envoirment if not depricated
- `npm run lint` before push (optional)

* ✅ Add this **must-have comment** at the **top of every route file (like `page.tsx`)** to indicate its route; for example:

```ts
// pages/home/page.tsx  ← describes the actual route path of this file
```

> 🔒 This comment stays even in production to help with debugging and clarity across the team.

## 🔐 Secure Code

- ❌ No `console.log` in prod
- ❌ No `.env` commits
- ✅ Use `.env.local`
- ✅ Use `NEXT_PUBLIC_` for frontend vars
- ✅ Sanitize inputs (must-required)

## 🧪 Git

- Branch: `FEAT/`, `FIX/`, `REFACTOR/`
- Commit: conventional format or use ai to make
- Pull/rebase before push
- Never push to `main` directly
- Always PR with description

## ✅ Before Push

- [ ] Prettier run (use **Prettier extension** in VSCode – required)
- [ ] Lint clean (run `npm run lint` — **optional**, but recommended; ESLint extension can be used)
- [ ] Console.log removed (no logs should remain in any file)
- [ ] No comments left (❌ remove all except the top comment in `page.tsx` files that shows route, e.g. `// pages/home/page.tsx`)
- [ ] README / types / config updated (if any structural or API changes were made)

```

```
