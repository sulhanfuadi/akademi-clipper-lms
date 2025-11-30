import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString });

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter } as any);
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

prisma
  .$connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((e) => {
    console.error("❌ Database connection failed:", e);
    process.exit(1);
  });
