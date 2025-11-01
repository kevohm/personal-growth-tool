import { replicateRxCollection } from "rxdb/plugins/replication";
import type { Expense, Earning, Saving } from "../types/types";
import type { FinanceDatabase } from ".";
import { api } from "../features/axios";

export const syncCollectionsWithBackend = async (
  db: FinanceDatabase,
  userId: string
) => {
  console.log("🔄 Initializing RxDB sync for user:", userId);

  const createReplication = (
    collectionName: string,
    endpoint: string,
    collection: any
  ) => {
    return replicateRxCollection({
      collection,
      replicationIdentifier: `${collectionName}-replication-${userId}`,
      live: true,
      retryTime: 5000,

      pull: {
        async handler(lastCheckpoint, batchSize) {
          const { data } = await api.get(`/${endpoint}`, {
            params: { since: lastCheckpoint || "", limit: batchSize },
          });

          return {
            documents: data,
            checkpoint: data[data.length - 1]?.updatedAt || lastCheckpoint,
          };
        },
        batchSize: 50,
      },

      push: {
        async handler(changeRows) {
          if (!changeRows.length) return [];
          const payload = changeRows.map((r) => r.newDocumentState);
          await api.post(`/${endpoint}/bulk`, payload);
          return [];
        },
        batchSize: 50,
      },
    });
  };

  // ---- SETUP REPLICATIONS ----
  const expenseReplication = createReplication(
    "expenses",
    "expenses",
    db.expenses
  );
  const savingReplication = createReplication("savings", "savings", db.savings);
  const earningReplication = createReplication(
    "earnings",
    "earnings",
    db.earnings
  );

  console.log("✅ RxDB sync initialized for all collections");
  
};
