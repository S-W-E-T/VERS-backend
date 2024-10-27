import { Router } from "express";
import {
  createEntry,
  updateEntry,
  getAllEntries,
  getEntryById,
  deleteEntry,
} from "../controllers/entries_controller";

const router = Router();

// Get all entries
router.get("/", getAllEntries);

// Create a new entry
router.post("/", createEntry);

// Update an existing entry
router.put("/:id", updateEntry);

// Get a specific entry by ID
router.get("/:id", getEntryById);

// Delete an entry
router.delete("/:id", deleteEntry);

export default router;
