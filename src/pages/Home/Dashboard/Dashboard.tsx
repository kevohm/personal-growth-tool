import { useState } from "react";
import { Select } from "../../../components/ui/Select";
import { RANGE_OPTIONS, type Range } from "../../../utils/analytics";
import DashboardWidgets from "./components/DashboardWidgets";
import AnalyticsSummaryChart from "./components/AnalyticsSummaryChart";
import { useAnalytics } from "../../../features/analytics/hooks";

const Dashboard = () => {
  const [range, setRange] = useState<Range>("30d");

  const { data, isLoading } = useAnalytics(range);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Define consistent colors for each series
  const colors = {
    expenses: { base: "#f43f5e", light: "#fda4af" },
    savings: { base: "#22c55e", light: "#86efac" },
    earnings: { base: "#3b82f6", light: "#93c5fd" },
  };

  return (
    <div className="h-auto w-full flex flex-col gap-6 px-6 pb-6">
      {/* Greeting + Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          {getGreeting()}, Kevin 👋
        </h1>
        <div>
          <Select
            placeholder=""
            value={range}
            onValueChange={(val) => setRange(val as Range)}
            options={RANGE_OPTIONS.map((opt) => opt)}
          />
        </div>
      </div>

      {/* Widgets */}
      <DashboardWidgets range={range} />

      {/* Analytics Summary Chart */}
      {isLoading ? (
        <div className="text-slate-500">Loading analytics...</div>
      ) : (
        data && (
          <AnalyticsSummaryChart
            data={data}
            colors={colors}
            series={["expenses", "savings", "earnings"]}
            range={range}
          />
        )
      )}
    </div>
  );
};

export default Dashboard;
