import dayjs from "dayjs";
import { prisma } from "../db";

export const SyncService = {
  async pull(model: string, since: string | null, limit: number) {
    const where: any = since ? { updatedAt: { gt: new Date(since) } } : {};
    const data = await (prisma as any)[model].findMany({
      where,
      orderBy: { updatedAt: "asc" },
      take: limit,
    });
    return data.map((d: any) => ({
      ...d,
      _updatedAt: d.updatedAt,
    }));
  },

  async bulkInsert(model: string, docs: any[]) {
    if (!docs.length) return;
    console.log("DOCS: ", docs)
    const txs = docs.map((doc) => {
      const { id, createdAt, updatedAt, userId, ...rest } = doc;
      return (prisma as any)[model].upsert({
        where: { id: doc.id },
        update: { ...rest, updatedAt: new Date().toISOString() },
        create: {
          ...rest,
          userId,
          createdAt: createdAt
            ? new Date(createdAt).toISOString()
            : new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    });
    await prisma.$transaction(txs);
  },
};
