import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

import { getDb } from "../../db";
import type { EarningUpdate } from "../../models/earning";
import type { Earning } from "../../types/types";
import {
  getDateFormat,
  getDateRange,
  getStepUnit,
  type Range,
} from "../../utils/analytics";

// ✅ Read all earnings
export const fetchEarnings = async () => {
  const db = await getDb();
  const docs = await db.earnings.find().exec();
  return docs.map((d: any) => d.toJSON());
};
// ✅ Read single earning
export const fetchEarningById = async (id:string) => {
  const db = await getDb();
  const doc = await db.earnings.findOne({selector:{id}}).exec();
  return doc ? doc.toJSON() : null;
};

// ✅ Create new earning
export const addEarning = async (earning: Earning) => {
  const db = await getDb();
  return db.earnings.insert(earning);
};

// ✅ Update earning
export const updateEarning = async (
  id: string,
  updates: EarningUpdate
) => {
  const db = await getDb();
  const doc = await db.earnings.findOne({ selector: { id } }).exec();

  if (!doc) throw new Error("Earning not found");

  await doc.patch(updates);
  return doc.toJSON();
};

// ✅ Delete earning
export const deleteEarning = async (id: string) => {
  const db = await getDb();
  const doc = await db.earnings.findOne({ selector: { id } }).exec();

  if (!doc) throw new Error("Earning not found");

  await doc.remove();
  return id;
};

// ✅ Analytics
export const fetchEarningAnalytics = async (range: Range = "30d") => {
  const db = await getDb();
  const docs = await db.earnings.find().exec();
  const earnings = docs.map((d: any) => d.toJSON());

  const { end, start } = getDateRange(range);
  const timeFormat = getDateFormat(range);

  // 1. Filter earnings in range
  const filtered = earnings.filter((e) =>
    dayjs(e.date).isBetween(start, end, null, "[]")
  );

  // 2. Group actual earnings
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
