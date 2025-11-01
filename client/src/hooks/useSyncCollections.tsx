import toast from "react-hot-toast";
import { getDb } from "../db";
import { syncCollectionsWithBackend } from "../db/db";
import { useAuth } from "./useAuth";

export const useSyncCollections = () => {
  const {user} = useAuth()
  const syncNow = async () => {
    try {
      if (!user?.id) throw new Error("No user ID found.");
      const db = await getDb();

      await toast.promise(syncCollectionsWithBackend(db, user?.id), {
        loading: "Syncing data with backend...",
        success: "✅ Data synced successfully!",
        error: "❌ Sync failed. Please try again.",
      });
    } catch (err) {
      console.error("Sync error:", err);
      toast.error("Failed to sync with backend.");
    }
  };

  return { syncNow };
};
