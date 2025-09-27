import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

import { getDb } from "../../db";
import type { Expense, ExpenseUpdate } from "../../models/expense";
import { getDateFormat, getDateRange, getStepUnit, type Range } from "../../utils/analytics";

export const fetchExpenseAnalytics = async (range: Range = "30d") => {
    const db = await getDb();
    const docs = await db.expenses.find().exec();
    const expenses = docs.map((d: any) => d.toJSON());

    const { end, start } = getDateRange(range);
    const timeFormat = getDateFormat(range);


    // 1. Filter expenses in range
    const filtered = expenses.filter((e) =>
        dayjs(e.date).isBetween(start, end, null, "[]")
    );

    // 2. Group actual expenses
    const grouped: Record<string, number> = {};
    filtered.forEach((e) => {
        const key = dayjs(e.date).format(timeFormat);
        grouped[key] = (grouped[key] || 0) + e.amount;
    });

    // 3. Generate full list of keys for the range
    const results: { label: string; value: number }[] = [];
    let cursor = start.clone();

    const stepUnit = getStepUnit(range);
    while (cursor.isBefore(end) || cursor.isSame(end, stepUnit)) {
        const key = cursor.format(timeFormat);

        results.push({
            label: key,
            value: grouped[key] || 0,
        });

        cursor = cursor.add(1, stepUnit);
    }


    return results;
};



// ✅ Read all expenses
export const fetchExpenses = async () => {
    const db = await getDb();
    const docs = await db.expenses.find().exec()
    return docs.map((d: any) => d.toJSON());
};

// ✅ Create new expense
export const addExpense = async (expense: Expense) => {
    const db = await getDb();
    return db.expenses.insert(expense);
};

// ✅ Update expense
export const updateExpense = async (id: string, updates:ExpenseUpdate) => {
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
