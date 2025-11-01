import { z } from "zod";
import { dateSchema, baseSchema } from "./base";

export const earningSchema = baseSchema.extend(
 {
    userId: z.string(),
    date: dateSchema,
    source: z.string().min(1, "Source is required"),
    notes: z.string().optional(),
    amount: z.number().positive("Amount must be positive"),
  }
);

export const earningUpdateSchema = earningSchema
  .omit({ id: true, createdAt: true, updatedAt: true, userId: true })
  .partial();
