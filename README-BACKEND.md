## Backend: PostgreSQL & Prisma

This document explains how to set up and run the backend portion of the Delight Treats prototype: PostgreSQL + Prisma and the seed data included in this repository.

Key backend files
- `prisma/schema.prisma` — database schema and models. See [prisma/schema.prisma](prisma/schema.prisma)
- `prisma/seed.ts` — seed script that populates a realistic product catalog. See [prisma/seed.ts](prisma/seed.ts)
- `prisma.config.ts` — project Prisma config (custom seed command). See [prisma.config.ts](prisma.config.ts)
- `lib/prisma.ts` — application Prisma client and adapter usage (checks `DATABASE_URL`). See [lib/prisma.ts](lib/prisma.ts)
- Generated client: `generated/prisma` — the generated Prisma client (do not edit). See [generated/prisma](generated/prisma)

Requirements
- Node.js 18+ (Node 20 recommended)
- PostgreSQL 14+ (local or hosted)
- pnpm (recommended) or npm/yarn

Environment
Create a `.env` file in the project root with at least the following variable:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NODE_ENV=development
```

Local PostgreSQL (Docker)
If you don't have Postgres locally, you can run one quickly with Docker:

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: delight_treats_dev
    ports:
      - '5432:5432'
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Then set `DATABASE_URL` accordingly, e.g.: `postgresql://postgres:postgres@localhost:5432/delight_treats_dev`

Prisma workflow (development)
1. Install dependencies:

```bash
pnpm install
# or: npm install
```

2. Generate the Prisma client:

```bash
pnpm exec prisma generate
```

3. Create and apply migrations (development):

```bash
pnpm exec prisma migrate dev --name init
```

4. Seed the database with sample products (optional but recommended):

```bash
pnpm run db:seed
```

5. Open Prisma Studio to inspect data:

```bash
pnpm run db:studio
```

Notes on the seed
- The seed script is in `prisma/seed.ts` and uses the same product catalogue used by the UI. It requires `DATABASE_URL` to be set. The repository wires the seed via `prisma.config.ts` so `pnpm run db:seed` runs `tsx ./prisma/seed.ts`.

Production & deployment notes
- Use `prisma migrate deploy` in production to apply already-created migrations.
- Ensure the production `DATABASE_URL` points to a managed Postgres instance and the environment variable is set in your deployment platform (Vercel, Render, Fly, etc.).
- The project uses `@prisma/adapter-pg` with a `PrismaPg` adapter (see `lib/prisma.ts`) which configures connection pooling behavior — verify adapter settings if deploying to serverless environments.

Common commands
- `pnpm exec prisma generate` — generate the client
- `pnpm exec prisma migrate dev --name init` — create & apply dev migration
- `pnpm exec prisma migrate deploy` — apply migrations in production
- `pnpm run db:seed` — run the seed script
- `pnpm run db:studio` — open Prisma Studio

Troubleshooting
- "DATABASE_URL environment variable is missing" — ensure `.env` exists and contains `DATABASE_URL` (see `lib/prisma.ts`).
- Connection errors — confirm Postgres is running and the connection string is correct; check firewall and host binding when using Docker.
- Too many connections — during development Next.js hot reloads can create multiple Prisma clients; `lib/prisma.ts` caches the client on `globalThis` in dev mode to avoid exhausting connections.

CI tips
- For CI, set `DATABASE_URL` to a temporary Postgres instance (or use a test container). Run `pnpm exec prisma migrate deploy` (or `prisma migrate dev` for ephemeral DBs), then `pnpm run db:seed` if tests require seed data.

Further help
If you want, I can add a `docker-compose.yml` to the repo, or a `README-BACKEND-DOCKER.md` with step-by-step Docker instructions and a one-command dev startup script.
