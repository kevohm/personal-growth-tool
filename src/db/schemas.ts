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
    ...baseSchema, // UUID
    email: { type: "string" },
    password: { type: "string" }, // hashed later
    name: { type: "string" },
    isGuest: { type: "boolean", default: false },
    linkedUserId: { type: "string" }, // when guest later logs in
  },
  required: ["id", "name"],
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
    date: { type: "string", format: "date" },
    notes: { type: "string" },
    goal: { type: "string" },
    amount: { type: "number" },
    category: {
      type: "string"
    },
    source: {
      type: "string"
    },
    recurring: {
      type: "boolean",
      default: false
    },
    tags: {
      type: "array",
      items: { type: "string" },
      default:[]
    },
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
    date: { type: "string", format: "date" },
    source: { type: "string" },
    notes: { type: "string" },
    amount: { type: "number" },
  },
  required: ["id", "userId", "date", "source", "amount"]
};
