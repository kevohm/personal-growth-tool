import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSavings,
  addSaving,
  updateSaving,
  deleteSaving,
  fetchSavingAnalytics,
  fetchSavingById,
} from "./api";
import type { Range } from "../../utils/analytics";
import type { SavingUpdate } from "../../models/saving";

// ✅ Hook to get saving analytics
export const useSavingAnalytics = (range: Range) => {
  return useQuery({
    queryKey: ["saving-analytics", range],
    queryFn: () => fetchSavingAnalytics(range),
  });
};

// ✅ Hook to get savings
export const useSavings = () => {
  return useQuery({
    queryKey: ["savings"],
    queryFn: fetchSavings,
  });
};

// ✅ Hook to get single saving by id
export const useSaving = (id: string | undefined) => {
  return useQuery({
    queryKey: ["saving", id],
    queryFn: () => {
      if (!id) throw new Error("Saving ID is required");
      return fetchSavingById(id);
    },
    enabled: !!id, // only run if id is defined
  });
};

// ✅ Hook to add saving
export const useAddSaving = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSaving,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });
};

// ✅ Hook to update saving
export const useUpdateSaving = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: SavingUpdate }) =>
      updateSaving(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });
};

// ✅ Hook to delete saving
export const useDeleteSaving = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSaving(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });
};
