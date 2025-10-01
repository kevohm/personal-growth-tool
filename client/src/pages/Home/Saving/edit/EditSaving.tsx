import { useNavigate, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import * as React from "react";
import toast from "react-hot-toast";
import { useSaving, useUpdateSaving } from "../../../../features/savings/hooks";
import { savingZodSchema, type Saving } from "../../../../models/saving";
import type { SavingFormType } from "../../../../types/types";
import { handleError } from "../../../../utils/error";

/* ✅ Shared UI components */
import { Checkbox } from "../../../../components/ui/Checkbox";
import { DatePicker } from "../../../../components/ui/DatePicker";
import { FormFieldWrapper } from "../../../../components/ui/FormFieldWrapper";
import { Input } from "../../../../components/ui/Input";
import { Select } from "../../../../components/ui/Select";
import { Textarea } from "../../../../components/ui/Textarea";

const EditSaving: React.FC = () => {
  const { id } = useParams({ strict: false }); // get saving id from URL
  const navigate = useNavigate();

  const { mutateAsync: updateSaving } = useUpdateSaving();
  const { data: saving, isLoading, error } = useSaving(id);

  const [form, setForm] = React.useState<SavingFormType | null>(null);
  console.log(saving);
  React.useEffect(() => {
    if (saving) {
      setForm({
        ...saving,
        date: saving.date ? dayjs(saving.date).format("YYYY-MM-DD") : "",
      } as Saving);
    }
  }, [saving]);

  if (isLoading) {
    return <p>Loading saving...</p>;
  }

  if (error) return <p>Something went wrong</p>;
  if (!saving) {
    return <p>Saving not found.</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!form) return;
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (!id) return toast.error("Invalid request");

    try {
      const validated = await savingZodSchema.parseAsync({
        ...saving,
        ...form,
      });

      await toast.promise(updateSaving({ id, updates: validated }), {
        loading: "Updating saving...",
        success: "Saving updated successfully 🎉",
        error: "Failed to update saving. Please try again.",
      });

      navigate({ to: "/home/savings" }); // redirect after update
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Edit Saving</h1>

      {form && (
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
                setForm((prev) => ({ ...prev!, category: val }))
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
              value={form.notes || ""}
              onChange={handleChange}
            />
          </FormFieldWrapper>

          {/* Recurring */}
          <Checkbox
            id="recurring"
            label="Recurring"
            name="recurring"
            checked={form.recurring || false}
            onChange={() =>
              setForm((prev) => ({ ...prev!, recurring: !prev?.recurring }))
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
                  ...prev!,
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
              type="button"
              onClick={() => navigate({ to: "/home/savings" })}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Update Saving
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditSaving;
