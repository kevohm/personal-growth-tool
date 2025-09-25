import { createId } from "@paralleldrive/cuid2";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import toast from "react-hot-toast";
import { useAddExpense } from "../../../../features/expenses/hooks";
import type { ExpenseFormType } from "../../../../types/types";
import { handleError } from "../../../../utils/error";
import { expenseZodSchema } from "../../../models/expense";

const AddExpense: React.FC = () => {
  const { mutateAsync } = useAddExpense();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<ExpenseFormType>({
    name: "",
    amount: 0,
    category: "",
    notes: "",
    date: "",
    userId: createId(),
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
      // ✅ Validate + enrich with Zod
      const expense = await expenseZodSchema.parseAsync(form);

      await toast.promise(mutateAsync(expense), {
        loading: "Adding expense...",
        success: "Expense added successfully 🎉",
        error: "Failed to add expense. Please try again.",
      });

      // Reset form
      setForm({
        userId: form.userId, // keep same user
        name: "",
        amount: 0,
        category: "",
        notes: "",
        date: "",
      } as ExpenseFormType);
      setOpen(false);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
          + Add Expense
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Add New Expense
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <Cross2Icon className="h-5 w-5 text-gray-500" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Expense Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Expense Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Enter expense name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <div className="relative">
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Optional notes..."
                value={form.notes}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
              >
                Add Expense
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddExpense;
