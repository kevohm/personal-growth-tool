import React from "react";
import type { Range, TotalsResult } from "../../../../utils/analytics";
import Widget from "./Widget";

const DashboardWidgets: React.FC<{
  range?: Range;
  expenseSummary?: TotalsResult;
  savingSummary?: TotalsResult;
  earningSummary?: TotalsResult;
}> = ({ range = "30d", expenseSummary, savingSummary, earningSummary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <Widget
        title="Total Expenses"
        amount={expenseSummary?.total || 0}
        change={expenseSummary?.change || 0}
        isCurrency
        range={range}
      />

      <Widget
        title="Total Savings"
        amount={savingSummary?.total || 0}
        change={savingSummary?.change || 0}
        isCurrency
        range={range}
      />

      <Widget
        title="Total Earnings"
        amount={earningSummary?.total || 0}
        change={earningSummary?.change || 0}
        isCurrency
        range={range}
      />
    </div>
  );
};

export default DashboardWidgets;
