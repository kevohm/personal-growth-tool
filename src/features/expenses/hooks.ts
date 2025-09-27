import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExpenses, addExpense, updateExpense, deleteExpense, fetchExpenseAnalytics } from "./api";
import type { Range } from "../../utils/analytics";
import type { ExpenseUpdate } from "../../models/expense";


export const useExpenseAnalytics = (range: Range) => {
  return useQuery({
    queryKey: ["expense-analytics", range],
    queryFn: () => fetchExpenseAnalytics(range),
  });
};

// ✅ Hook to get expenses
export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
};

// ✅ Hook to add expense
export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

// ✅ Hook to update expense
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ExpenseUpdate }) =>
      updateExpense(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

// ✅ Hook to delete expense
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
