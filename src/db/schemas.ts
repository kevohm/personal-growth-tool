// db/schemas.ts
const primaryKeyStructure = { type: "string", maxLength: 128, }
const baseSchema = {
  id: primaryKeyStructure,
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" }
}
export const userSchema = {
  title: "user schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    ...baseSchema, // could be UUID
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
    ...baseSchema, // could be UUID
    userId: { type: "string" },
    name: { type: "string" },         // New field
    date: { type: "string", format: "date" },
    category: { type: "string" },
    amount: { type: "number" },
    notes: { type: "string", maxLength: 1000 } // Optional field
  },
  required: ["id", "userId", "name", "date", "category", "amount"]
};

export const savingSchema = {
  title: "saving schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    ...baseSchema, // could be UUID
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
    ...baseSchema, // could be UUID
    userId: { type: "string" },
    date: { type: "string" },
    source: { type: "string" },
    amount: { type: "number" },
  },
  required: ["id", "userId", "date", "source", "amount"]
};
