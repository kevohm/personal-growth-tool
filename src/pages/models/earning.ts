import z from "zod";
import { baseSchema } from ".";


/**
 * Earning schema
 */
export const earningZodSchema = baseSchema.extend({
  userId: z.string(),
  date: z.string(),
  source: z.string(),
  amount: z.number(),
});
export type Earning = z.infer<typeof earningZodSchema>;