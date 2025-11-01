import express from "express";
import { SyncController } from "../controllers/sync.controller";

const router = express.Router();

// Pull new data (RxDB → Server)
router.get("/:model", SyncController.pull);

// Push local changes (Client → Server)
router.post("/:model/bulk", SyncController.bulk);

export default router;
