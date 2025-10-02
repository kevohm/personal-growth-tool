import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import type { EarningUpdate } from "../../models/earning";
import type { Range } from "../../utils/analytics";
import {
  addEarning,
  deleteEarning,
  fetchEarningAnalytics,
  fetchEarningById,
  fetchEarnings,
  updateEarning,
} from "./api";
import type { Earning } from "../../types/types";

// ✅ Hook to get earnings analytics
export const useEarningAnalytics = (range: Range) => {
  return useQuery({
    queryKey: ["earning-analytics", range],
    queryFn: () => fetchEarningAnalytics(range),
  });
};

// ✅ Hook to get earnings
export const useEarnings = (params?:{userId?:string}, options?: Omit<UseQueryOptions<Earning[], Error >, "queryKey" | "queryFn"> ) => {
  return useQuery({
    queryKey: ["earnings", params],
    queryFn: ()=>fetchEarnings(params),
    ...options
  });
};
export const useEarning = (id?:string) => {
  return useQuery({
    queryKey: ["earning", id],
    queryFn: ()=>{
       if (!id) throw new Error("Earning ID is required");
      return fetchEarningById(id)
    },
    enabled:!!id
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
