import { Request, Response, NextFunction } from "express";
import { Role } from "../constants/role";

export const authorized = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not found",
        });
      }
      if (!req.user.accessApproved) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Access not approved",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Forbidden: User role ${req.user.role} is not allowed`,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error during authorization",
      });
    }
  };
};
