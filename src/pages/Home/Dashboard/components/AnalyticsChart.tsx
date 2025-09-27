import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export type AnalyticsData = {
  label: string;
  value: number;
};

type Props = {
  data?: AnalyticsData[];
  color: {
    base: string; // e.g. "#f43f5e"
    light: string; // e.g. "#fda4af"
  };
  tooltipLabel: string; // "Expenses" or "Earnings"
  valueFormatter?: (v: number) => string;
  range?: string;
};

const defaultFormatter = (v: number) =>
  v.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  });

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: any[];
  label?: string;
  tooltipLabel: string;
  formatter: (v: number) => string;
  color: string;
}> = ({ active, payload, tooltipLabel, formatter, color }) => {
  if (active && payload && payload.length) {
    const { value } = payload[0].payload;
    return (
      <div className="bg-white shadow-lg rounded-md py-2 px-3 text-sm">
        <div className="font-medium text-slate-700">{tooltipLabel}</div>
        <div className="font-semibold" style={{ color }}>
          {formatter(value)}
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsChart({
  data = [],
  color,
  tooltipLabel,
  valueFormatter = defaultFormatter,
  range = "30d",
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 16, bottom: 0 }}
          >
            <defs>
              {/* hover gradient */}
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color.base} stopOpacity={0.95} />
                <stop offset="60%" stopColor={color.base} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color.base} stopOpacity={0.08} />
              </linearGradient>

              {/* normal gradient */}
              <linearGradient
                id={`gradient-${tooltipLabel}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color.base} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color.light} stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="label"
              axisLine={false}
              interval={(range === "30d" || range === "all") ? 0 : undefined}
              tickLine={false}
              tick={{
                fill: "#94A3B8",
                ...( (range === "30d" || range === "all")
                  ? { fontSize: 10, angle: -45, textAnchor: "end" }
                  : {}),
              }}
            />

            <Tooltip
              content={
                <CustomTooltip
                  tooltipLabel={tooltipLabel}
                  formatter={valueFormatter}
                  color={color.base}
                />
              }
            />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              barSize={36}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    hoveredIndex === index
                      ? "url(#barGradient)" // hover gradient
                      : `url(#gradient-${tooltipLabel})` // normal gradient
                  }
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  cursor="pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-end text-sm text-slate-500">
        <div className="mr-2">Total</div>
        <div className="font-semibold text-slate-900">
          {valueFormatter(data.reduce((s, d) => s + d.value, 0))}
        </div>
      </div>
    </div>
  );
}
