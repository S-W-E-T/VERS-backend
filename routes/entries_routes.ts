import { Router } from "express";
import {
  createEntry,
  updateEntry,
  getAllEntries,
  getEntryById,
  deleteEntry,
  getEntriesByUser,
} from "../controllers/entries_controller";
import { authenticate } from "../middleware/auth_middleware";
import { authorized } from "../middleware/checkPermission";
import { Role } from "../constants/role";

const router = Router();

// Get all entries
router.get(
  "/",
  // authenticate,
  // authorized([Role.ADMIN, Role.USER]),
  getAllEntries
);

// Create a new entry
router.post("/", authenticate, authorized([Role.USER]), createEntry);

// Get all entries by a specific user
router.get("/my", authenticate, authorized([Role.USER]), getEntriesByUser);

// Update an existing entry
router.put("/:id", authenticate, authorized([Role.USER]), updateEntry);

// Get a specific entry by ID
router.get("/:id", authenticate, authorized([Role.USER]), getEntryById);

// Delete an entry
router.delete(
  "/:id",
  authenticate,
  authorized([Role.USER, Role.ADMIN]),
  deleteEntry
);

export default router;
