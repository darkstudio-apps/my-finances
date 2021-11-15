import { PrismaClient } from "@prisma/client"

export let currentPrisma: PrismaClient | undefined = undefined

function getPrisma(): PrismaClient {
  if (currentPrisma === undefined) {
    const prismaClient = new PrismaClient()
    currentPrisma = prismaClient
    return prismaClient
  }

  return currentPrisma
}

export const prisma = getPrisma()
