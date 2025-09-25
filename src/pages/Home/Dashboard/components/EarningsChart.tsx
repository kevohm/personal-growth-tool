import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export type MonthData = {
  month: string;
  value: number;
};

type Props = {
  data?: MonthData[];
  highlightedMonth?: string; // e.g. "Aug"
  className?: string;
};

const defaultData: MonthData[] = [
  { month: "Jan", value: 8000 },
  { month: "Feb", value: 22000 },
  { month: "Mar", value: 32000 },
  { month: "Apr", value: 20000 },
  { month: "May", value: 24000 },
  { month: "Jun", value: 7000 },
  { month: "Jul", value: 12000 },
  { month: "Aug", value: 38000 },
  { month: "Sep", value: 37000 },
  { month: "Oct", value: 26000 },
  { month: "Nov", value: 18000 },
  { month: "Dec", value: 14000 },
];

function formatCurrency(v: number) {
  return `${v.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  })}`;
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value } = payload[0].payload;
    return (
      <div className="bg-white shadow-lg rounded-md py-2 px-3 text-sm">
        <div className="font-medium text-slate-700">Earnings</div>
        <div className="text-green-600 font-semibold">
          {formatCurrency(value)}
        </div>
      </div>
    );
  }
  return null;
};

export default function EarningsChart({
  data = defaultData,
  highlightedMonth = "Aug",
  className = "",
}: Props) {
  // find highlighted index for rendering a reference dot
  const highlightedIndex = data.findIndex((d) => d.month === highlightedMonth);

  return (
    <div
      className={`bg-white h-max w-full rounded-2xl p-5 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-slate-600 text-base">Overview</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
            Expenses
          </button>
          <button className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
            Earnings
          </button>
          <select className="text-sm border border-slate-200 rounded-full px-3 py-1">
            <option>This Year</option>
            <option>Last 30 days</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.95} />
                <stop offset="60%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.08} />
              </linearGradient>

              <linearGradient id="barGradientDim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ecfdf5" stopOpacity={0.6} />
              </linearGradient>

              <filter
                id="softShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="12"
                  floodOpacity="0.06"
                />
              </filter>
            </defs>

            {/* hide axis visuals to match the clean design */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8" }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              isAnimationActive={false}
            >
              {data.map((entry, index) => {
                const isHighlighted = index === highlightedIndex;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      isHighlighted
                        ? "url(#barGradient)"
                        : "url(#barGradientDim)"
                    }
                    stroke={isHighlighted ? "url(#barGradient)" : "transparent"}
                    strokeWidth={isHighlighted ? 2 : 0}
                  />
                );
              })}
            </Bar>

            {/* draw a reference dot above the highlighted bar to match image */}
            {highlightedIndex >= 0 && (
              <ReferenceDot
                x={data[highlightedIndex].month}
                y={data[highlightedIndex].value}
                r={6}
                stroke="#fff"
                fill="#059669"
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer summary (small) */}
      <div className="mt-4 flex items-center justify-end text-sm text-slate-500">
        <div className="mr-2">Total</div>
        <div className="font-semibold text-slate-900">
          {formatCurrency(data.reduce((s, d) => s + d.value, 0))}
        </div>
      </div>
    </div>
  );
}
