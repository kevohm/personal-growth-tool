import * as React from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "@tanstack/react-router"; // or react-router-dom depending on your setup
import { useExpenses, useUpdateExpense } from "../../../../features/expenses/hooks";
import { expenseZodSchema, updateExpenseZodSchema } from "../../../../models/expense";
import type { ExpenseFormType } from "../../../../types/types";
import { handleError } from "../../../../utils/error";
import dayjs from "dayjs";

/* ✅ Shared UI components */
import { DatePicker } from "../../../../components/ui/DatePicker";
import { FormFieldWrapper } from "../../../../components/ui/FormFieldWrapper";
import { Input } from "../../../../components/ui/Input";
import { Select } from "../../../../components/ui/Select";
import { Textarea } from "../../../../components/ui/Textarea";

const EditExpense: React.FC = () => {
  const { id } = useParams({ strict: false }); // get expense id from URL
  const navigate = useNavigate();

  const { data: expenses, isLoading } = useExpenses();
  const { mutateAsync: updateExpense } = useUpdateExpense();

  // Find the expense we’re editing
  const expense = expenses?.find((e) => e.id === id);

  const [form, setForm] = React.useState<ExpenseFormType | null>(null);

  React.useEffect(() => {
    if (expense) {
      setForm({
        ...expense,
        date: expense.date ? dayjs(expense.date).format("YYYY-MM-DD") : "",
      });
    }
  }, [expense]);

  if (isLoading) {
    return <p>Loading expense...</p>;
  }

  if (!expense) {
    return <p>Expense not found.</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if(!id) return toast.error("Invalid request")

    try {
      const validatedExpense = await updateExpenseZodSchema.parseAsync(form);

      await toast.promise(
        updateExpense({ id, updates: validatedExpense }),
        {
          loading: "Updating expense...",
          success: "Expense updated successfully 🎉",
          error: "Failed to update expense. Please try again.",
        }
      );

      navigate({ to: "/home/expenses" }); // redirect after update
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Edit Expense</h1>

      {form && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Expense Name */}
          <FormFieldWrapper label="Expense Name" htmlFor="name">
            <Input
              id="name"
              name="name"
              placeholder="Enter expense name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </FormFieldWrapper>

          {/* Amount */}
          <FormFieldWrapper label="Amount" htmlFor="amount">
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </FormFieldWrapper>

          {/* Category */}
          <FormFieldWrapper label="Category" htmlFor="category">
            <Select
              value={form.category}
              onValueChange={(val) => setForm({ ...form, category: val })}
              placeholder="Select category"
              options={[
                { value: "Food", label: "Food" },
                { value: "Transport", label: "Transport" },
                { value: "Shopping", label: "Shopping" },
                { value: "Bills", label: "Bills" },
                { value: "Other", label: "Other" },
              ]}
            />
          </FormFieldWrapper>

          {/* Date */}
          <FormFieldWrapper label="Date" htmlFor="date">
            <DatePicker
              value={form.date ? dayjs(form.date, "YYYY-MM-DD").toDate() : undefined}
              onChange={(day) => {
                const date = day ? dayjs(day).format("YYYY-MM-DD") : "";
                setForm({ ...form, date });
              }}
              placeholder="Select a date"
            />
          </FormFieldWrapper>

          {/* Notes */}
          <FormFieldWrapper label="Notes" htmlFor="notes">
            <Textarea
              id="notes"
              name="notes"
              placeholder="Optional notes..."
              value={form.notes}
              onChange={handleChange}
            />
          </FormFieldWrapper>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate({ to:"/home/expenses" })}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Update Expense
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditExpense;
