import { createId } from "@paralleldrive/cuid2";
import * as React from "react";
import toast from "react-hot-toast";
import { useAddEarning } from "../../../../features/earnings/hooks";
import { earningZodSchema } from "../../../../models/earning";
import type { EarningFormType } from "../../../../types/types";
import { handleError } from "../../../../utils/error";
import dayjs from "dayjs";

/* ✅ Shared UI components */
import { DatePicker } from "../../../../components/ui/DatePicker";
import { FormFieldWrapper } from "../../../../components/ui/FormFieldWrapper";
import { Input } from "../../../../components/ui/Input";
import { Select } from "../../../../components/ui/Select";
import { Textarea } from "../../../../components/ui/Textarea";
import { useNavigate } from "@tanstack/react-router";

const defaultBody = {
    source: "",
    amount: 0,
    notes: "",
    date: "",
    userId: createId(),
  }

const AddEarning: React.FC = () => {
  const { mutateAsync } = useAddEarning();
  const [form, setForm] = React.useState<EarningFormType>(defaultBody);
  const navigate = useNavigate()

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
      const earning = await earningZodSchema.parseAsync(form);

      await toast.promise(mutateAsync(earning), {
        loading: "Adding earning...",
        success: "Earning added successfully 🎉",
        error: "Failed to add earning. Please try again.",
      });

      setForm(defaultBody as EarningFormType);
      navigate({to:"/home/earnings"})
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold">Add New Earning</h1>

      {/* Earning Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Source */}
        <FormFieldWrapper label="Source" htmlFor="source">
          <Input
            id="source"
            name="source"
            placeholder="Enter earning source"
            value={form.source}
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
            value={form.notes}
            onChange={handleChange}
          />
        </FormFieldWrapper>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="reset"
            onClick={() =>
              setForm(defaultBody as EarningFormType)
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Add Earning
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEarning;
