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
  date: string;
  goal: string;
  notes?: string;
  category?: string;   // e.g., "emergency", "retirement"
  source?: string;     // e.g., "salary", "gift"
  recurring?: boolean; // whether this is recurring
  tags?: string[];     // custom tags
}

export type SavingFormType = Partial<Omit<Saving, "id">>;


export interface Earning {
  id: string;
  userId: string;
  amount: number;
  source: string;
  notes?: string;
  date: string;
}
export type EarningFormType = Pick<Earning, "amount" | "userId" | "source" | "notes" | "date">

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}
