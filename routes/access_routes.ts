import express from "express";
import {
  approveAccessRequest,
  getAccessMembers,
  getAccessRequests,
  rejectAccess,
} from "../controllers/access_controller";

import { authenticate } from "../middleware/auth_middleware";
import { authorized } from "../middleware/checkPermission";

import { Role } from "../constants/role";

const router = express.Router();

router.get("/", authenticate, authorized([Role.ADMIN]), getAccessMembers);
router.get(
  "/approve",
  authenticate,
  authorized([Role.ADMIN]),
  getAccessRequests
);
router.put(
  "/approve",
  authenticate,
  authorized([Role.ADMIN]),
  approveAccessRequest
);
router.post("/reject", authenticate, authorized([Role.ADMIN]), rejectAccess);

export default router;
