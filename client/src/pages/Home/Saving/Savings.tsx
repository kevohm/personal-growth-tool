import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { Select } from "../../../components/ui/Select";
import {
  useDeleteSaving,
  useSavingAnalytics,
  useSavings,
} from "../../../features/savings/hooks";
import type { Saving } from "../../../types/types";
import { RANGE_OPTIONS, type Range } from "../../../utils/analytics";
import { handleError } from "../../../utils/error";
import { formatCurrency } from "../../../utils/format";
import AnalyticsChart from "../Dashboard/components/AnalyticsChart";
import { useAuth } from "../../../hooks/useAuth";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-blue-50 p-4">
        <FilePlusIcon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">No savings yet</h3>
      <p className="mt-1 text-slate-500 text-sm">
        Start building your financial goals by adding your first saving.
      </p>
    </div>
  );
};

const Savings: React.FC = () => {
  const {user} = useAuth()
  const { data: savings } = useSavings({userId:user?.id}, {enabled:!!user?.id});
  const [range, setRange] = useState<Range>("30d");
  const { data: analytics } = useSavingAnalytics(range, {userId:user?.id}, {enabled:!!user?.id});

  const navigate = useNavigate();
  const { mutateAsync: deleteSaving } = useDeleteSaving();

  console.log(savings);
  // console.log(analytics)
  // console.log(data, savings)

  return (
    <div className="p-6 space-y-8">
      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Savings</h2>
          <div className="w-max">
            <Select
              value={range}
              options={RANGE_OPTIONS.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              onValueChange={(val) => setRange(val as Range)}
            />
          </div>
        </div>

        <AnalyticsChart
          tooltipLabel="Savings"
          color={{ base: "#2563eb", light: "#93c5fd" }}
          data={analytics}
          range={range}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Savings Breakdown
          </h2>

          <Link
            to="/home/savings/add"
            className="px-4 py-2 flex items-center gap-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Saving</span>
          </Link>
        </div>

        {savings && Array.isArray(savings) && savings?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2">Goal</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Source</th>
                  <th className="py-2">Notes</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {savings?.map((saving: Saving) => (
                  <tr key={saving.id}>
                    <td className="py-2 font-medium text-slate-700">
                      {saving.goal}
                    </td>
                    <td className="py-2 text-blue-600 font-semibold">
                      {formatCurrency(saving.amount)}
                    </td>
                    <td className="py-2 font-medium text-slate-700">
                      {saving.category || "N/A"}
                    </td>
                    <td className="py-2 font-medium text-slate-700">
                      {saving.source || "N/A"}
                    </td>

                    <td className="py-2 text-slate-400 italic">
                      {saving?.notes?.trim() ? saving.notes : "No notes added"}
                    </td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate({
                              to: `/home/savings/${saving.id}/edit`,
                            })
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1 text-sm text-slate-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={async () => {
                            if (
                              confirm(
                                "Are you sure you want to delete this saving?"
                              )
                            ) {
                              try {
                                await toast.promise(deleteSaving(saving.id), {
                                  loading: "Deleting...",
                                  success: "Saving deleted",
                                  error: "Failed to delete",
                                });
                              } catch (err) {
                                handleError(err);
                              }
                            }
                          }}
                          className="rounded-lg bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Savings;
