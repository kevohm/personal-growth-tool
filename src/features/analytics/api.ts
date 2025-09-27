import dayjs from "dayjs";
import { getDb } from "../../db";
import { calculateTotals, getDateFormat, getDateRange, getStepUnit, type Range } from "../../utils/analytics";

// ✅ Expenses summary
export const fetchExpenseSummary = async (range: Range = "30d") => {
  const db = await getDb();
  const docs = await db.expenses.find().exec();
  const expenses = docs.map((d: any) => d.toJSON());
  return calculateTotals(expenses, "amount", range);
};

// ✅ Savings summary
export const fetchSavingSummary = async (range: Range = "30d") => {
  const db = await getDb();
  const docs = await db.savings.find().exec();
  const savings = docs.map((d: any) => d.toJSON());
  return calculateTotals(savings, "amount", range);
};

// ✅ Earnings summary
export const fetchEarningSummary = async (range: Range = "30d") => {
  const db = await getDb();
  const docs = await db.earnings.find().exec();
  const earnings = docs.map((d: any) => d.toJSON());
  return calculateTotals(earnings, "amount", range);
};



export const fetchAnalytics = async (range: Range = "30d") => {
  const db = await getDb();

  const [expensesDocs, savingsDocs, earningsDocs] = await Promise.all([
    db.expenses.find().exec(),
    db.savings.find().exec(),
    db.earnings.find().exec(),
  ]);

  const expenses = expensesDocs.map((d: any) => d.toJSON());
  const savings = savingsDocs.map((d: any) => d.toJSON());
  const earnings = earningsDocs.map((d: any) => d.toJSON());

  const { end, start } = getDateRange(range);
  const timeFormat = getDateFormat(range);
  const stepUnit = getStepUnit(range);

  // Grouping helper
  const groupBy = (items: any[]) => {
    const grouped: Record<string, number> = {};
    items
      .filter((i) => dayjs(i.date).isBetween(start, end, null, "[]"))
      .forEach((i) => {
        const k = dayjs(i.date).format(timeFormat);
        grouped[k] = (grouped[k] || 0) + i.amount;
      });
    return grouped;
  };

  const groupedExpenses = groupBy(expenses);
  const groupedSavings = groupBy(savings);
  const groupedEarnings = groupBy(earnings);

  // Build complete series with all keys filled
  const results: {
    label: string;
    expenses: number;
    savings: number;
    earnings: number;
  }[] = [];

  let cursor = start.clone();
  while (cursor.isBefore(end) || cursor.isSame(end, stepUnit)) {
    const key = cursor.format(timeFormat);

    results.push({
      label: key,
      expenses: groupedExpenses[key] || 0,
      savings: groupedSavings[key] || 0,
      earnings: groupedEarnings[key] || 0,
    });

    cursor = cursor.add(1, stepUnit);
  }

  return results;
};
