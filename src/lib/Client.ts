import { PrismaClient } from "@prisma/client";

// Use a global variable to prevent exhausting connections in development
declare global {
  var __prisma: PrismaClient | undefined;
}

const prisma = global.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV === "development") global.__prisma = prisma;

export default prisma;