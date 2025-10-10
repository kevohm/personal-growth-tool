import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { getDb } from "../../db";
import type { SavingUpdate } from "../../models/saving";
import type { Saving } from "../../types/types";
import {
  getDateFormat,
  getDateRange,
  getStepUnit,
  type Range,
} from "../../utils/analytics";


// ✅ Fetch savings analytics
export const fetchSavingAnalytics = async (range: Range = "30d", params?: { userId?: string }) => {
  const db = await getDb();
  const docs = await db.savings.find({ selector: params }).exec();
  const savings = docs.map((d: any) => d.toJSON()) ?? [];

  const { end, start } = getDateRange(range);
  const timeFormat = getDateFormat(range);

  // 1. Filter in range
  const filtered = savings.filter((s) =>
    dayjs(s.date).isBetween(start, end, null, "[]")
  );

  // 2. Group by period
  const grouped: Record<string, number> = {};
  filtered.forEach((s) => {
    const key = dayjs(s.date).format(timeFormat);
    grouped[key] = (grouped[key] || 0) + s.amount;
  });

  // 3. Fill full range
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

// ✅ Read all savings
export const fetchSavings = async (params?: { userId?: string }) => {
  const db = await getDb();
  const docs = await db.savings.find({ selector: params }).exec();
  return docs.map((d: any) => d.toJSON());
};

// ✅ Read single saving by id
export const fetchSavingById = async (id: string) => {
  const db = await getDb();
  const doc = await db.savings.findOne({ selector: { id } }).exec();

  if (!doc) return null; // return null if not found
  return doc.toJSON();
};

// ✅ Create new saving
export const addSaving = async (saving: Saving) => {
  const db = await getDb();
  return db.savings.insert(saving);
};

// ✅ Update saving
export const updateSaving = async (id: string, updates: SavingUpdate) => {
  const db = await getDb();
  const doc = await db.savings.findOne({ selector: { id } }).exec();

  if (!doc) throw new Error("Saving not found");

  await doc.patch(updates);
  return doc.toJSON();
};

// ✅ Delete saving
export const deleteSaving = async (id: string) => {
  const db = await getDb();
  const doc = await db.savings.findOne({ selector: { id } }).exec();

  if (!doc) throw new Error("Saving not found");

  await doc.remove();
  return id;
};
