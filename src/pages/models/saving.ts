import z from "zod";
import { baseSchema } from ".";

/**
 * Saving schema
 */
export const savingZodSchema = baseSchema.extend({
  userId: z.string(),
  date: z.string(), // could use z.string().date() if always YYYY-MM-DD
  amount: z.number(),
});
export type Saving = z.infer<typeof savingZodSchema>;