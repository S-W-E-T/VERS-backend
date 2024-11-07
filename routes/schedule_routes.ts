import { Router } from "express";
import {
  createSchedule,
  updateSchedule,
  getAllSchedules,
  getScheduleByUser,
  getScheduleById,
} from "../controllers/schedule_controller";
import { authenticate } from "../middleware/auth_middleware";
import { authorized } from "../middleware/checkPermission";
import { Role } from "../constants/role";

const router = Router();

router.get(
  "/",
  authenticate,
  authorized([Role.ADMIN, Role.USER]),
  getAllSchedules
);

// Create a new schedule
router.post(
  "/",
  authenticate,
  authorized([Role.ADMIN, Role.USER]),
  createSchedule
);

// Get a specific schedule by ID
router.get(
  "/:id",
  authenticate,
  authorized([Role.ADMIN, Role.USER]),
  getScheduleById
);

// Update an existing schedule
router.put(
  "/:id",
  authenticate,
  authorized([Role.ADMIN, Role.USER]),
  updateSchedule
);

export default router;
