// types.ts
export interface Expense {
  id: string;
  userId: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export type ExpenseFormType = Pick<Expense, "amount" | "name" | "category" | "date" | "userId" | "notes">


export interface Saving {
  id: string;
  userId: string;
  amount: number;
  goal: string;
  createdAt: string;
}

export interface Earning {
  id: string;
  userId: string;
  amount: number;
  source: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}
