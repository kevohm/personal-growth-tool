// db/schemas.ts
export const userSchema = {
  title: "user schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" }, // could be UUID
    email: { type: "string" },
    password: { type: "string" }, // hash in real apps
    name: { type: "string" }
  },
  required: ["id", "email", "password", "name"]
};

export const expenseSchema = {
  title: "expense schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    userId: { type: "string" },
    date: { type: "string" },
    category: { type: "string" },
    amount: { type: "number" }
  },
  required: ["id", "userId", "date", "category", "amount"]
};

export const savingSchema = {
  title: "saving schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    userId: { type: "string" },
    date: { type: "string" },
    amount: { type: "number" }
  },
  required: ["id", "userId", "date", "amount"]
};

export const earningSchema = {
  title: "earning schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string" },
    userId: { type: "string" },
    date: { type: "string" },
    source: { type: "string" },
    amount: { type: "number" }
  },
  required: ["id", "userId", "date", "source", "amount"]
};
