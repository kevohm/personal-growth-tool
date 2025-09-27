import z from "zod";
import { baseSchema } from ".";

/**
 * Saving schema
 */
export const savingZodSchema = baseSchema.extend({
  userId: z.string(),
  amount: z.number().nonnegative("Amount must be 0 or greater"),
  goal: z.string().min(1, "Goal is required"),


  // Optional fields
  notes: z.string().optional(),
  category: z.string().optional(),   // e.g., emergency, retirement
  source: z.string().optional(),     // e.g., salary, gift
  recurring: z.boolean().default(false).optional(),
  tags: z.array(z.string()).optional(),
});

export type Saving = z.infer<typeof savingZodSchema>;
export type SavingUpdate = Partial<Omit<Saving, "id" | "userId">>;
