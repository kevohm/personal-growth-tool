import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";

const expenseData = [
  { month: "Jan", value: 8200 },
  { month: "Feb", value: 15400 },
  { month: "Mar", value: 9400 },
  { month: "Apr", value: 18300 },
  { month: "May", value: 12200 },
  { month: "Jun", value: 21400 },
  { month: "Jul", value: 13500 },
  { month: "Aug", value: 9800 },
  { month: "Sep", value: 11000 },
  { month: "Oct", value: 14900 },
  { month: "Nov", value: 8700 },
  { month: "Dec", value: 17500 },
];

function formatCurrency(v: number) {
  return v.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  });
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value } = payload[0].payload;
    return (
      <div className="bg-white shadow-lg rounded-md py-2 px-3 text-sm">
        <div className="font-medium text-slate-700">Expenses</div>
        <div className="text-rose-600 font-semibold">{formatCurrency(value)}</div>
      </div>
    );
  }
  return null;
};

const Savings: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Graph */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Monthly Expenses</h2>
          <select className="text-sm border border-slate-200 rounded-full px-3 py-1">
            <option>This Year</option>
            <option>Last 30 days</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseData} margin={{ top: 8, right: 16, left: 16, bottom: 0 }}>
              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#fda4af" stopOpacity={0.3} />
                </linearGradient>
              </defs>

              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8" }} />
              <Tooltip content={<CustomTooltip />} />

              <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={36} isAnimationActive={false}>
                {expenseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="url(#expenseGradient)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Expense Breakdown</h2>
          <button className="text-sm border border-slate-200 rounded-full px-3 py-1">Filter</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-2">Category</th>
                <th className="py-2">Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 font-medium text-slate-700">Groceries</td>
                <td className="py-2">12 Sep 2026</td>
                <td className="py-2 text-rose-600 font-semibold">{formatCurrency(2500)}</td>
                <td className="py-2 text-emerald-600">Paid</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-700">Transport</td>
                <td className="py-2">09 Sep 2026</td>
                <td className="py-2 text-rose-600 font-semibold">{formatCurrency(800)}</td>
                <td className="py-2 text-emerald-600">Paid</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-700">Utilities</td>
                <td className="py-2">03 Sep 2026</td>
                <td className="py-2 text-rose-600 font-semibold">{formatCurrency(4200)}</td>
                <td className="py-2 text-emerald-600">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Savings
