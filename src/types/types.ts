// types.ts
export interface ExpenseDocType {
  id: string;
  userId: string;
  amount: number;
  category: string;
  createdAt: string;
}

export interface SavingDocType {
  id: string;
  userId: string;
  amount: number;
  goal: string;
  createdAt: string;
}

export interface EarningDocType {
  id: string;
  userId: string;
  amount: number;
  source: string;
  createdAt: string;
}

export interface UserDocType {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}
