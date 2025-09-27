import { useState } from "react";
import { Select } from "../../../components/ui/Select";
import { RANGE_OPTIONS, type Range } from "../../../utils/analytics";
import DashboardWidgets from "./components/DashboardWidgets";
import EarningsChart from "./components/EarningsChart";

const Dashboard = () => {
  const [range, setRange] = useState<Range>("30d");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
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

      {/* Pass range to widgets + chart */}
      <DashboardWidgets range={range} />
      <EarningsChart />
    </div>
  );
};

export default Dashboard;
