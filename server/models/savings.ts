import z from "zod";
import { baseSchema, dateSchema } from "./base";

export const savingSchema = baseSchema.extend({
  userId: z.string(),
  date: dateSchema,
  notes: z.string().optional(),
  goal: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().optional(),
  source: z.string().optional(),
  recurring: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
})

// ✅ Make all fields optional for updates
export const savingUpdateSchema = savingSchema
  .omit({ id: true, createdAt: true, updatedAt: true, userId: true })
  .partial();
