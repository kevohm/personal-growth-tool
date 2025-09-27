import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExpenseUpdate } from "../../models/expense";
import type { Range } from "../../utils/analytics";
import { addExpense, deleteExpense, fetchExpenseAnalytics, fetchExpenseById, fetchExpenses, updateExpense } from "./api";


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

// ✅ Hook to get single expense by id
export const useExpense = (id: string | undefined) => {
  return useQuery({
    queryKey: ["expense", id],
    queryFn: () => {
      if (!id) throw new Error("Expense ID is required");
      return fetchExpenseById(id);
    },
    enabled: !!id, // only run if id is defined
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
