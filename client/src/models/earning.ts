import z from "zod";
import { amountSchema, baseSchema, dateSchema } from ".";


/**
 * Earning schema
 */
export const earningZodSchema = baseSchema.extend({
  userId: z.string(),
  date: dateSchema,
  source: z.string(),
  amount: amountSchema,
  notes: z.string().optional()
});

export const updateEarningZodSchema = earningZodSchema.partial()

export type Earning = z.infer<typeof earningZodSchema>;
export type EarningUpdate = z.infer<typeof updateEarningZodSchema>;