import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["error", "warn", 'info'],
  errorFormat: "pretty",
})

export default db