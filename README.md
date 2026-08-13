# Delight Treats

Delight Treats is a sample e-commerce application for a bakery — a Next.js (App Router) + TypeScript prototype demonstrating product catalog, customizable products, cart/order workflow, simple session-based auth, event management, and a Prisma + PostgreSQL backend.

**Highlights**
- Modern stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- Full-stack data modeling with Prisma and PostgreSQL
- Server-side session handling (cookie + DB) and minimal auth routes
- Sample product catalog and seed data to get started quickly

**Quick Links**
- Code: [app](app)
- Components: [components](components)
- Database schema: [prisma/schema.prisma](prisma/schema.prisma)
- Prisma client (generated): [generated/prisma](generated/prisma)
- DB helpers: [lib/prisma.ts](lib/prisma.ts)

**Requirements**
- Node.js 18+ (Node 20 recommended)
- PostgreSQL (local or hosted) for the database
- pnpm (recommended) or npm/yarn

**Environment**
- Create a `.env` in the project root with at least:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NODE_ENV=development
```

Replace the connection string with your Postgres credentials.

## Getting started (local development)

1. Install dependencies (pnpm recommended):

```bash
pnpm install
# or: npm install
```

2. Generate Prisma client and run migrations:

```bash
pnpm exec prisma generate
pnpm exec prisma migrate dev --name init
```

3. Seed the database (optional but provides sample products):

```bash
pnpm run db:seed
```

4. Start the development server:

```bash
pnpm run dev
# or: npm run dev
```

## Build & production

```bash
pnpm run build
pnpm start
```

## Useful npm scripts
- `dev`: Start Next.js dev server
- `build`: Build the app for production
- `start`: Start the production server
- `lint`: Run ESLint
- `db:seed`: Run Prisma seed script (see `prisma/seed.ts`)
- `db:studio`: Open Prisma Studio

## Database & Prisma
- Schema is defined in [prisma/schema.prisma](prisma/schema.prisma).
- The project uses the `@prisma/adapter-pg` adapter for PostgreSQL; the Prisma client is generated into `generated/prisma`.
- DB helper and connection are in `lib/prisma.ts` — the app expects a `DATABASE_URL` env var. See [lib/prisma.ts](lib/prisma.ts) for implementation details.

Prisma toolchain in this repository is wired via `prisma.config.ts`. The seed script (`prisma/seed.ts`) populates a realistic product catalog used by the UI.

## Architecture & notable files
- `app/` — Next.js App Router routes, pages, and layouts
- `components/` — UI components organized by area (product, cart, dashboard, events)
- `lib/` — application helpers (`prisma.ts`, `session.ts`, serializers)
- `prisma/` — Prisma schema, seed, and migrations
- `generated/prisma` — generated Prisma client (do not edit)
- `public/products` — sample product images

## Sessions & auth
- This project uses a simple cookie-based session system (see `lib/session.ts`). Sessions are stored in the `sessions` table and a secure cookie named `delight_treats_session` is set for logged-in users.

## Contributing
- Open an issue or submit a pull request. Keep changes focused and include tests for non-trivial logic.

