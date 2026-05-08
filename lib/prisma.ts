import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL

const createPrismaClient = () => {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set")
  }

  if (databaseUrl?.startsWith("prisma+postgres://")) {
    return new PrismaClient({
      accelerateUrl: databaseUrl,
    }).$extends(withAccelerate())
  }

  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

type PrismaClientType = ReturnType<typeof createPrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientType
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
