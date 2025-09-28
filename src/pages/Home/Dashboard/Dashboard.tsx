import { useState } from "react";
import { Select } from "../../../components/ui/Select";
import { useAnalytics, useEarningSummary, useExpenseSummary, useSavingSummary } from "../../../features/analytics/hooks";
import { useAuth } from "../../../hooks/useAuth";
import { RANGE_OPTIONS, type Range } from "../../../utils/analytics";
import AnalyticsSummaryChart from "./components/AnalyticsSummaryChart";
import DashboardWidgets from "./components/DashboardWidgets";

const Dashboard = () => {
  const [range, setRange] = useState<Range>("30d");

  const { data, isLoading: isAnalyticsLoading } = useAnalytics(range);
  const { user, isLoading } = useAuth();
  const { data: expenseSummary, isLoading: loadingExpenses } =
    useExpenseSummary(range);
  const { data: savingSummary, isLoading: loadingSavings } =
    useSavingSummary(range);
  const { data: earningSummary, isLoading: loadingEarnings } =
    useEarningSummary(range);

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

  if (
    isAnalyticsLoading ||
    isLoading ||
    loadingEarnings ||
    loadingSavings ||
    loadingExpenses
  ) {
    return <div className="text-slate-500">Loading analytics...</div>;
  }

  return (
    <div className="h-auto w-full flex flex-col gap-6 px-6 pb-6">
      {/* Greeting + Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          {getGreeting()}, {user?.name} 👋
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
      <DashboardWidgets range={range} 
      earningSummary={earningSummary}
      expenseSummary={expenseSummary}
      savingSummary={savingSummary}
      />

      {/* Analytics Summary Chart */}

      {data && (
        <AnalyticsSummaryChart
          data={data}
          colors={colors}
          series={["expenses", "savings", "earnings"]}
          range={range}
        />
      )}
    </div>
  );
};

export default Dashboard;
