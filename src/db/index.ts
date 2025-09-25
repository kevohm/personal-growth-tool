// db.ts
import { createRxDatabase, addRxPlugin } from "rxdb";
import type {RxDatabase, RxCollection} from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { earningSchema, expenseSchema, userSchema, savingSchema } from "./schemas";
// 🔹 Optional: dev-mode plugin for debugging
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

import type {
  EarningDocType,
  ExpenseDocType,
  SavingDocType,
  UserDocType,
} from "../types/types";

addRxPlugin(RxDBDevModePlugin);

// 🔹 Collection typing
export type FinanceCollections = {
  expenses: RxCollection<ExpenseDocType>;
  savings: RxCollection<SavingDocType>;
  earnings: RxCollection<EarningDocType>;
  users: RxCollection<UserDocType>;
};

// 🔹 Database type
export type FinanceDatabase = RxDatabase<FinanceCollections>;

// 🔹 Database instance
let dbPromise: Promise<FinanceDatabase> | null = null;

export const getDb = async (): Promise<FinanceDatabase> => {
  if (!dbPromise) {
    dbPromise = createRxDatabase<FinanceCollections>({
      name: "finance", // database name
      storage: getRxStorageDexie(),
    }).then(async (db) => {
      await db.addCollections({
        expenses: { schema: expenseSchema },
        savings: { schema: savingSchema },
        earnings: { schema: earningSchema },
        users: { schema: userSchema },
      });
      return db;
    });
  }
  return dbPromise;
};
