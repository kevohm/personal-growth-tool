import { PlusIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "@tanstack/react-router";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Select } from "../../../components/ui/Select";
import {
  useDeleteEarning,
  useEarningAnalytics,
  useEarnings,
} from "../../../features/earnings/hooks";
import { useAuth } from "../../../hooks/useAuth";
import type { Earning } from "../../../models/earning";
import { RANGE_OPTIONS, type Range } from "../../../utils/analytics";
import { handleError } from "../../../utils/error";
import { formatCurrency } from "../../../utils/format";
import AnalyticsChart from "../Dashboard/components/AnalyticsChart";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-emerald-50 p-4">
        <PlusIcon className="h-6 w-6 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">
        No earnings recorded
      </h3>
      <p className="mt-1 text-slate-500 text-sm">
        Start tracking your income by adding your first earning.
      </p>
    </div>
  );
};

const Earnings: React.FC = () => {
  const { user } = useAuth();
  const { data: earnings } = useEarnings(
    { userId: user?.id },
    { enabled: !!user?.id }
  );
  const [range, setRange] = useState<Range>("30d");
  const { data } = useEarningAnalytics(range);
  // console.log(earnings)
  const navigate = useNavigate();
  const { mutateAsync: deleteEarning } = useDeleteEarning();

  const analytics = useMemo(() => data || [], [data]);

  return (
    <div className="p-6 space-y-8">
      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Earnings</h2>
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
          tooltipLabel="Earnings"
          color={{ base: "#16a34a", light: "#86efac" }}
          data={analytics}
          range={range}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Earnings Breakdown
          </h2>

          <Link
            to="/home/earnings/add"
            className="px-4 py-2 flex items-center gap-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Earning</span>
          </Link>
        </div>

        {earnings && Array.isArray(earnings) && earnings?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2">Source</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Notes</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {earnings?.map((earning: Earning) => (
                  <tr key={earning.id}>
                    <td className="py-2 font-medium text-slate-700">
                      {earning.source}
                    </td>
                    <td className="py-2">{earning.date}</td>
                    <td className="py-2 text-emerald-600 font-semibold">
                      {formatCurrency(earning.amount)}
                    </td>
                    <td className="py-2 text-slate-400 italic">
                      {earning?.notes?.trim()
                        ? earning.notes
                        : "No notes added"}
                    </td>

                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate({
                              to: `/home/earnings/${earning.id}/edit`,
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
                                "Are you sure you want to delete this earning?"
                              )
                            ) {
                              try {
                                await toast.promise(deleteEarning(earning.id), {
                                  loading: "Deleting...",
                                  success: "Earning deleted",
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

export default Earnings;
