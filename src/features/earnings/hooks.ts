import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEarnings,
  addEarning,
  updateEarning,
  deleteEarning,
  fetchEarningAnalytics,
} from "./api";
import type { Range } from "../../utils/analytics";
import type { ExpenseUpdate } from "../../models/expense";
import type { EarningUpdate } from "../../models/earning";

// ✅ Hook to get earnings analytics
export const useEarningAnalytics = (range: Range) => {
  return useQuery({
    queryKey: ["earning-analytics", range],
    queryFn: () => fetchEarningAnalytics(range),
  });
};

// ✅ Hook to get earnings
export const useEarnings = () => {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: fetchEarnings,
  });
};

// ✅ Hook to add earning
export const useAddEarning = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEarning,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["earnings"] });
    },
  });
};

// ✅ Hook to update earning
export const useUpdateEarning = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: EarningUpdate }) =>
      updateEarning(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["earnings"] });
    },
  });
};

// ✅ Hook to delete earning
export const useDeleteEarning = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEarning(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["earnings"] });
    },
  });
};
