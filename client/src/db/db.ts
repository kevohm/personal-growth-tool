import { replicateRxCollection } from "rxdb/plugins/replication";
import type { Expense, Earning, Saving, User } from "../types/types";
import type { FinanceDatabase } from ".";
import { baseUrl } from "../features/axios";

export const syncCollectionsWithBackend = async (db: FinanceDatabase) => {
  // ---- EXPENSES ----
  replicateRxCollection<Expense>({
    collection: db.expenses,
    replicationIdentifier: "expenses-replication",
    pull: {
      async handler(lastCheckpoint, batchSize) {
        const res = await fetch(
          `${baseUrl}/expenses?since=${lastCheckpoint || ""}&limit=${batchSize}`
        );
        const docs = await res.json();
        return {
          documents: docs,
          checkpoint: docs.length
            ? docs[docs.length - 1]._updatedAt
            : lastCheckpoint,
        };
      },
      batchSize: 50,
    },
    push: {
      async handler(changeRows) {
        await fetch(`${baseUrl}/expenses/bulk`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changeRows.map((r) => r.newDocumentState)),
        });
        // ✅ Return empty array to satisfy expected type
        return [];
      },
      batchSize: 50,
    },
    live: true,
    retryTime: 5000,
  });

  // ---- SAVINGS ----
  replicateRxCollection<Saving>({
    collection: db.savings,
    replicationIdentifier: "savings-replication",
    pull: {
      async handler(lastCheckpoint, batchSize) {
        const res = await fetch(
          `${baseUrl}/savings?since=${lastCheckpoint || ""}&limit=${batchSize}`
        );
        const docs = await res.json();
        return {
          documents: docs,
          checkpoint: docs.length
            ? docs[docs.length - 1]._updatedAt
            : lastCheckpoint,
        };
      },
      batchSize: 50,
    },
    push: {
      async handler(changeRows) {
        await fetch(`${baseUrl}/savings/bulk`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changeRows.map((r) => r.newDocumentState)),
        });
        return [];
      },
      batchSize: 50,
    },
    live: true,
    retryTime: 5000,
  });

  // ---- EARNINGS ----
  replicateRxCollection<Earning>({
    collection: db.earnings,
    replicationIdentifier: "earnings-replication",
    pull: {
      async handler(lastCheckpoint, batchSize) {
        const res = await fetch(
          `${baseUrl}/earnings?since=${lastCheckpoint || ""}&limit=${batchSize}`
        );
        const docs = await res.json();
        return {
          documents: docs,
          checkpoint: docs.length
            ? docs[docs.length - 1]._updatedAt
            : lastCheckpoint,
        };
      },
      batchSize: 50,
    },
    push: {
      async handler(changeRows) {
        await fetch(`${baseUrl}/earnings/bulk`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changeRows.map((r) => r.newDocumentState)),
        });
        return [];
      },
      batchSize: 50,
    },
    live: true,
    retryTime: 5000,
  });

  // ---- USERS ----
  replicateRxCollection<User>({
    collection: db.users,
    replicationIdentifier: "users-replication",
    pull: {
      async handler(lastCheckpoint, batchSize) {
        const res = await fetch(
          `${baseUrl}/users?since=${lastCheckpoint || ""}&limit=${batchSize}`
        );
        const docs = await res.json();
        return {
          documents: docs,
          checkpoint: docs.length
            ? docs[docs.length - 1]._updatedAt
            : lastCheckpoint,
        };
      },
      batchSize: 50,
    },
    push: {
      async handler(changeRows) {
        await fetch(`${baseUrl}/users/bulk`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changeRows.map((r) => r.newDocumentState)),
        });
        return [];
      },
      batchSize: 50,
    },
    live: true,
    retryTime: 5000,
  });

  console.log("✅ RxDB sync initialized for all collections");
};
