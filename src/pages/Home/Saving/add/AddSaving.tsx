import { createId } from "@paralleldrive/cuid2";
import * as React from "react";
import toast from "react-hot-toast";
import { useAddSaving } from "../../../../features/savings/hooks";
import type { Saving } from "../../../../models/saving";
import { savingZodSchema } from "../../../../models/saving";
import { handleError } from "../../../../utils/error";

/* ✅ Shared UI components */
import { useNavigate } from "@tanstack/react-router";
import { Checkbox } from "../../../../components/ui/Checkbox";
import { FormFieldWrapper } from "../../../../components/ui/FormFieldWrapper";
import { Input } from "../../../../components/ui/Input";
import { Select } from "../../../../components/ui/Select";
import { Textarea } from "../../../../components/ui/Textarea";
import type { SavingFormType } from "../../../../types/types";
import { DatePicker } from "../../../../components/ui/DatePicker";
import dayjs from "dayjs";

const defaultBody: SavingFormType = {
  amount: 0,
  goal: "",
  notes: "",
  date: "",
  category: "",
  source: "",
  recurring: false,
  tags: [],
};

const AddSaving: React.FC = () => {
  const { mutateAsync } = useAddSaving();
  const [form, setForm] = React.useState<SavingFormType>(defaultBody);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Build full Saving object
      const saving: Saving = {
        userId: createId(), // TODO: replace with logged-in user ID
        ...form,
      } as Saving;

      const parsed = await savingZodSchema.parseAsync(saving);

      await toast.promise(mutateAsync(parsed), {
        loading: "Adding saving...",
        success: "Saving added successfully 🎉",
        error: "Failed to add saving. Please try again.",
      });

      setForm(defaultBody);
      navigate({ to: "/home/savings" });
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold">Add New Saving</h1>

      {/* Saving Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Goal */}
        <FormFieldWrapper label="Goal" htmlFor="goal">
          <Input
            id="goal"
            name="goal"
            placeholder="Enter saving goal"
            value={form.goal || ""}
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
            value={form.amount || 0}
            onChange={handleChange}
            required
          />
        </FormFieldWrapper>

        {/* Category */}
        <FormFieldWrapper label="Category" htmlFor="category">
          <Select
            value={form.category || ""}
            onValueChange={(val) =>
              setForm((prev) => ({ ...prev, category: val }))
            }
            placeholder="Select category"
            options={[
              { value: "emergency", label: "Emergency" },
              { value: "retirement", label: "Retirement" },
              { value: "education", label: "Education" },
              { value: "vacation", label: "Vacation" },
            ]}
          />
        </FormFieldWrapper>

        {/* Source */}
        <FormFieldWrapper label="Source" htmlFor="source">
          <Input
            id="source"
            name="source"
            placeholder="E.g., Salary, Bonus, Gift"
            value={form.source || ""}
            onChange={handleChange}
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
            value={form.notes || ""}
            onChange={handleChange}
          />
        </FormFieldWrapper>

        {/* Recurring */}
        <Checkbox
          id="recurring"
          label="Recurring"
          name="recurring"
          checked={form.recurring}
          onChange={() =>
            setForm((prev) => ({ ...prev, recurring: !prev.recurring }))
          }
        />

        {/* Tags */}
        <FormFieldWrapper label="Tags" htmlFor="tags">
          <Input
            id="tags"
            name="tags"
            placeholder="Comma-separated tags"
            value={form.tags?.join(", ") || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              }))
            }
          />
        </FormFieldWrapper>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="reset"
            onClick={() => setForm(defaultBody)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Add Saving
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSaving;
