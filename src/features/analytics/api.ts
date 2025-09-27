import { getDb } from "../../db";
import { calculateTotals, type Range } from "../../utils/analytics";

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
