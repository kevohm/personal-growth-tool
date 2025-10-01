import z from "zod";
import { amountSchema, baseSchema, dateSchema } from ".";

/**
 * Saving schema
 */
export const savingZodSchema = baseSchema.extend({
  userId: z.string(),
  amount: amountSchema,
  date: dateSchema,
  goal: z.string().min(1, "Goal is required"),

  // Optional fields
  notes: z.string().optional(),
  category: z.string(),   // e.g., emergency, retirement
  source: z.string(),     // e.g., salary, gift
  recurring: z.boolean().default(false),
  tags: z.array(z.string()),
});

export type Saving = z.infer<typeof savingZodSchema>;
export type SavingUpdate = Partial<Omit<Saving, "id" | "userId">>;
