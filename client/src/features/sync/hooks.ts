import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncToBackend } from "./api";

export const useReplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => syncToBackend(),
    onSuccess: (replicationState) => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      console.log("✅ Replication is running:", replicationState);
    },

    onError: (err) => {
      console.error("❌ Replication failed:", err);
    },
  });
};
