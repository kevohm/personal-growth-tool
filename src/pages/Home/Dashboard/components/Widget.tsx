import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import React from "react";

interface WidgetProps {
  title: string;
  amount: number;
  change: number; // positive or negative percentage
  isCurrency?: boolean;
}

const Widget: React.FC<WidgetProps> = ({
  title,
  amount,
  change,
  isCurrency = true,
}) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <span>{title}</span>
        </div>
        <MoreHorizontal size={18} className="text-slate-400" />
      </div>

      <div className="text-2xl font-semibold text-slate-900">
        {isCurrency
          ? amount.toLocaleString("en-KE", {
              style: "currency",
              currency: "KES",
              minimumFractionDigits: 2,
            })
          : amount}
      </div>

      <div className="flex items-center gap-2 mt-2 text-sm">
        <span
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
            isPositive
              ? "text-emerald-600 bg-emerald-50"
              : "text-rose-600 bg-rose-50"
          }`}
        >
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {Math.abs(change)}%
        </span>
        <span className="text-slate-500">from last month</span>
      </div>
    </div>
  );
};

export default Widget;
