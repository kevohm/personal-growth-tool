import z from "zod";
import { baseSchema, dateSchema } from "./base";

export const expenseSchema = baseSchema.extend(
{
    userId: z.string(),
    name: z.string().min(1, "Name is required"),
    date: dateSchema,
    category: z.string().min(1, "Category is required"),
    amount: z.number().positive("Amount must be positive"),
    notes: z.string().optional(),
  }
);

export const expenseUpdateSchema = expenseSchema
  .omit({ id: true, createdAt: true, updatedAt: true, userId: true })
  .partial();
