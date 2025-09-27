// db/zodSchemas.ts
import { z } from "zod";
import { amountSchema, baseSchema, dateSchema } from ".";


/**
 * Expense schema
 */
export const expenseZodSchema = baseSchema.extend({
  userId: z.string(),
  name: z.string(),
  date: dateSchema, // just date, not full datetime
  category: z.string(),
  amount: amountSchema,
  notes: z.string().max(1000).optional(),
});

export const updateExpenseZodSchema = expenseZodSchema.partial()

export type Expense = z.infer<typeof expenseZodSchema>;
export type ExpenseUpdate = z.infer<typeof updateExpenseZodSchema>;


