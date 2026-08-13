import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is missing in your .env file!");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

// Next.js dev mode hot-reloads modules, which would otherwise create a new
// PrismaClient (and a new connection pool) on every file save. Caching the
// instance on `globalThis` in development avoids exhausting Postgres
// connections. In production, a fresh client is created once per process.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
