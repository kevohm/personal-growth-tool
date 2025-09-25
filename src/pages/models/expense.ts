// db/zodSchemas.ts
import { z } from "zod";
import { baseSchema } from ".";


/**
 * Expense schema
 */
export const expenseZodSchema = baseSchema.extend({
  userId: z.string(),
  name: z.string(),
  date: z.string().date(), // just date, not full datetime
  category: z.string(),
  amount: z
    .union([z.number(), z.string()])
    .transform((val) => {
      const num = typeof val === "string" ? Number(val) : val;
      if (isNaN(num)) throw new Error("Amount must be a valid number");
      return num;
    }),
  notes: z.string().max(1000).optional(),
});
export type Expense = z.infer<typeof expenseZodSchema>;


