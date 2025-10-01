import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useState } from "react";
import { formatCurrency } from "../../../../utils/format";

type AnalyticsRow = {
  label: string;
  expenses: number;
  savings: number;
  earnings: number;
};

type Props = {
  data: AnalyticsRow[];
  colors: Record<
    "expenses" | "savings" | "earnings",
    { base: string; light: string }
  >;
  series: ("expenses" | "savings" | "earnings")[];
  range: string;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-md py-2 px-3 text-sm">
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex justify-between gap-4">
            <span className="capitalize text-slate-600">{p.dataKey}</span>
            <span className="font-semibold" style={{ color: p.fill }}>
              {p.value.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


const Legend = ({
  series,
  colors,
  data,
  valueFormatter,
}: {
  series: string[];
  colors: Record<string, { base: string; light: string }>;
  data: any[];
  valueFormatter: (v: number) => string;
}) => {
  return (
    <div className="flex flex-wrap gap-6 mt-4 text-sm">
      {series.map((key) => {
        const total = data.reduce((sum, d) => sum + (d[key] || 0), 0);
        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: colors[key].base }}
            />
            <span className="capitalize text-slate-600">{key}</span>
            <span className="font-medium text-slate-900">
              {valueFormatter(total)}
            </span>
          </div>
        );
      })}
    </div>
  );
};



export default function AnalyticsSummaryChart({
  data,
  colors,
  series,
  range,
}: Props) {
  const [_, setHovered] = useState<{ key: string; index: number } | null>(
    null
  );

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, left: 16, bottom: 0 }}
        >
          <defs>
            {series.map((key) => (
              <linearGradient
                key={key}
                id={`gradient-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={colors[key].base}
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor={colors[key].light}
                  stopOpacity={0.3}
                />
              </linearGradient>
            ))}
          </defs>

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            interval={range === "30d" || range === "all" ? 0 : undefined}
            tick={{
              fill: "#94A3B8",
              ...(range === "30d" || range === "all"
                ? { fontSize: 10, angle: -45, textAnchor: "end" }
                : {}),
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          {series.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              barSize={24}
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`${key}-${index}`}
                  fill={`url(#gradient-${key})`}
                  onMouseEnter={() => setHovered({ key, index })}
                  onMouseLeave={() => setHovered(null)}
                  cursor="pointer"
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
        <Legend 
        series={series}
        colors={colors}
        data={data}
        valueFormatter={formatCurrency}
        />
    </div>
  );
}
