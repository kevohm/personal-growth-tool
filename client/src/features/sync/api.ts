// src/api/auth.ts
import { getDb } from "../../db";
import { syncCollectionsWithBackend } from "../../db/db";
import { getCurrentUserId } from "../auth/api";

export const syncToBackend = async () => {
  const db = await getDb();
  const userId = getCurrentUserId();
  if (!userId) throw new Error("No user logged in");
  console.log("🔁 Replication started for user:", userId);
  return await syncCollectionsWithBackend(db, userId);
};
