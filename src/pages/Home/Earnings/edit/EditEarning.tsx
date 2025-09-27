import * as React from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "@tanstack/react-router"; // or react-router-dom depending on your setup
import { useEarnings, useUpdateEarning } from "../../../../features/earnings/hooks";
import { earningZodSchema, updateEarningZodSchema } from "../../../../models/earning";
import type { EarningFormType } from "../../../../types/types";
import { handleError } from "../../../../utils/error";
import dayjs from "dayjs";

/* ✅ Shared UI components */
import { DatePicker } from "../../../../components/ui/DatePicker";
import { FormFieldWrapper } from "../../../../components/ui/FormFieldWrapper";
import { Input } from "../../../../components/ui/Input";
import { Textarea } from "../../../../components/ui/Textarea";

const EditEarning: React.FC = () => {
  const { id } = useParams({ strict: false }); // get earning id from URL
  const navigate = useNavigate();

  const { data: earnings, isLoading } = useEarnings();
  const { mutateAsync: updateEarning } = useUpdateEarning();

  // Find the earning we’re editing
  const earning = earnings?.find((e) => e.id === id);

  const [form, setForm] = React.useState<EarningFormType | null>(null);

  React.useEffect(() => {
    if (earning) {
      setForm({
        ...earning,
        date: earning.date ? dayjs(earning.date).format("YYYY-MM-DD") : "",
      });
    }
  }, [earning]);

  if (isLoading) {
    return <p>Loading earning...</p>;
  }

  if (!earning) {
    return <p>Earning not found.</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    if (!id) return toast.error("Invalid request");

    try {
      const validatedEarning = await updateEarningZodSchema.parseAsync(form);

      await toast.promise(
        updateEarning({ id, updates: validatedEarning }),
        {
          loading: "Updating earning...",
          success: "Earning updated successfully 🎉",
          error: "Failed to update earning. Please try again.",
        }
      );

      navigate({ to: "/home/earnings" }); // redirect after update
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Edit Earning</h1>

      {form && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source */}
          <FormFieldWrapper label="Source" htmlFor="source">
            <Input
              id="source"
              name="source"
              placeholder="Enter source"
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
              onClick={() => navigate({ to: "/home/earnings" })}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Update Earning
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditEarning;
