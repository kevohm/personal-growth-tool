import dayjs from "dayjs";
import * as React from "react";
import toast from "react-hot-toast";
import { useAddExpense } from "../../../../features/expenses/hooks";
import { expenseZodSchema } from "../../../../models/expense";
import type { ExpenseFormType } from "../../../../types/types";
import { handleError } from "../../../../utils/error";

/* ✅ Shared UI components */
import { useNavigate } from "@tanstack/react-router";
import { DatePicker } from "../../../../components/ui/DatePicker";
import { FormFieldWrapper } from "../../../../components/ui/FormFieldWrapper";
import { Input } from "../../../../components/ui/Input";
import { Select } from "../../../../components/ui/Select";
import { Textarea } from "../../../../components/ui/Textarea";
import { useAuth } from "../../../../hooks/useAuth";

const AddExpense: React.FC = () => {
  const { user, } = useAuth();
  const { mutateAsync } = useAddExpense();
  const navigate = useNavigate();
  const [form, setForm] = React.useState<ExpenseFormType>({
    name: "",
    amount: 0,
    category: "",
    notes: "",
    date: "",
    userId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const expense = await expenseZodSchema.parseAsync(form);

      await toast.promise(mutateAsync(expense), {
        loading: "Adding expense...",
        success: "Expense added successfully 🎉",
        error: "Failed to add expense. Please try again.",
      });

      setForm({
        userId: form.userId,
        name: "",
        amount: 0,
        category: "",
        notes: "",
        date: "",
      } as ExpenseFormType);
      navigate({ to: "/home/expenses" });
    } catch (err) {
      handleError(err);
    }
  };

  React.useEffect(() => {
    if (user?.id && !form.userId) {
      setForm((prev) => ({ ...prev, userId: user?.id }));
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold">Add New Expense</h1>

      {/* Expense Form */}
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
            value={
              form.date ? dayjs(form.date, "YYYY-MM-DD").toDate() : undefined
            }
            onChange={(day) => {
              const date = day ? dayjs(day).format("YYYY-MM-DD") : "";

              setForm({
                ...form,
                date,
              });
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
            type="reset"
            onClick={() =>
              setForm({
                userId: form.userId,
                name: "",
                amount: 0,
                category: "",
                notes: "",
                date: "",
              } as ExpenseFormType)
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
