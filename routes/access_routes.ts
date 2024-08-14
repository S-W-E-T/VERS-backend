import express from "express";
import {
  approveAccessRequest,
  getAccessMembers,
  getAccessRequests,
  rejectAccess,
} from "../controllers/access_controller";

import { authenticate } from "../middleware/auth_middleware";

const router = express.Router();

router.get("/", authenticate, getAccessMembers);
router.get("/approve", authenticate, getAccessRequests);
router.put("/approve", authenticate, approveAccessRequest);
router.post("/reject", authenticate, rejectAccess);

export default router;
