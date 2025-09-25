// db.ts
import { createRxDatabase, removeRxDatabase} from "rxdb";
import type {RxDatabase, RxCollection} from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { earningSchema, expenseSchema, userSchema, savingSchema } from "./schemas";
// 🔹 Optional: dev-mode plugin for debugging
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { addRxPlugin } from 'rxdb/plugins/core';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

import type {
  Earning,
  Expense,
  Saving,
  User,
} from "../types/types";

addRxPlugin(RxDBDevModePlugin);

// 🔹 Collection typing
export type FinanceCollections = {
  expenses: RxCollection<Expense>;
  savings: RxCollection<Saving>;
  earnings: RxCollection<Earning>;
  users: RxCollection<User>;
};
const DB_NAME = "finance";

// 🔹 Database type
export type FinanceDatabase = RxDatabase<FinanceCollections>;

// 🔹 Database instance
let dbPromise: Promise<FinanceDatabase> | null = null;

export const getDb = async (): Promise<FinanceDatabase> => {
  if (!dbPromise) {
    //    if (process.env.NODE_ENV === "development") {
    //   // 🔥 Clears old IndexedDB in dev so schema changes don’t trigger DB6
    //   await removeRxDatabase(DB_NAME, getRxStorageDexie());
    //   console.log("Dev mode: old DB removed");
    // }
    dbPromise = createRxDatabase<FinanceCollections>({
      name: DB_NAME, // database name
      storage: wrappedValidateAjvStorage({storage:getRxStorageDexie()})
      ,
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
