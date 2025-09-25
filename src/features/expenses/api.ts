import { createId } from "@paralleldrive/cuid2";
import { getDb } from "../../db";

// ✅ Read all expenses
export const fetchExpenses = async () => {
  const db = await getDb();
  const docs = await db.expenses.find().exec()
  return docs.map((d: any) => d.toJSON());
};

// ✅ Create new expense
export const addExpense = async (expense: { userId: string; amount: number; category: string }) => {
  const db = await getDb();
  return db.expenses.insert({
    id: createId(),
    createdAt: new Date().toISOString(),
    ...expense,
  });
};

// ✅ Update expense
export const updateExpense = async (id: string, updates: Partial<{ amount: number; category: string }>) => {
  const db = await getDb();
  const doc = await db.expenses.findOne({ selector: { id } }).exec();

  if (!doc) throw new Error("Expense not found");

  await doc.patch(updates);
  return doc.toJSON();
};

// ✅ Delete expense
export const deleteExpense = async (id: string) => {
  const db = await getDb();
  const doc = await db.expenses.findOne({ selector: { id } }).exec();

  if (!doc) throw new Error("Expense not found");

  await doc.remove();
  return id;
};
