import { Request, Response } from "express";
import { SyncService } from "../services/sync.service";
import {
  earningSchema,
  expenseSchema,
  savingSchema,
  earningUpdateSchema,
  expenseUpdateSchema,
  savingUpdateSchema,
} from "../models";
import { error } from "console";

const VALID_MODELS = {
  expenses: "expense",
  savings: "saving",
  earnings: "earning",
  users: "user",
};

const SCHEMAS = {
  expense: expenseSchema,
  saving: savingSchema,
  earning: earningSchema,
};
const UPDATE_SCHEMAS = {
  expense: expenseUpdateSchema,
  saving: savingUpdateSchema,
  earning: earningUpdateSchema,
};

export const SyncController = {
  async pull(req: Request, res: Response) {
    try {
      const model = VALID_MODELS[req.params.model as keyof typeof VALID_MODELS];
      if (!model) return res.status(400).json({ message: "Invalid model" });

      const since = (req.query.since as string) || null;
      const limit = parseInt(req.query.limit as string) || 50;

      const data = await SyncService.pull(model, since, limit);
      res.json(data);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  },

  async bulk(req: Request, res: Response) {
    try {
      const model = VALID_MODELS[req.params.model as keyof typeof VALID_MODELS];
      if (!model) return res.status(400).json({ message: "Invalid model" });

      const docs = Array.isArray(req.body) ? req.body : [];
      if (!docs.length)
        return res.status(400).json({ message: "No documents provided" });
    // console.log("DOCS: ", docs)
      // ✅ Validate documents using Zod schema
      const schema = SCHEMAS[model as keyof typeof SCHEMAS];
      if (!schema)
        return res
          .status(400)
          .json({ message: `No schema for model ${model}` });

      const validatedDocs = [];
      for (const doc of docs) {
        const result = schema.safeParse(doc);
        if (!result.success) {
          console.log(result.error.issues);
          return res.status(400).json({
            message: "Validation error",
            errors: result.error.issues[0].message,
          });
        }
        validatedDocs.push(result.data);
      }

      await SyncService.bulkInsert(model, validatedDocs);
      res.json({ ok: true, count: validatedDocs.length });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
