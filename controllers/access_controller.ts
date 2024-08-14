import { Request, Response } from "express";
import colors from "colors";
import User, { IUser } from "../models/user_model";
import Access, { IAccess, Role } from "../models/access_model";

colors.enable();

export const getAccessRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accessRequests = await Access.find({
      accessApproved: false,
    }).populate("userId", "name email phoneNumber");
    res.status(200).json(accessRequests);
  } catch (error) {
    console.error(colors.red.bold("Failed to get access requests:"), error);
    res.status(500).json({ error: "Server error" });
  }
};

export const approveAccessRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { accessId, role } = req.body;
  if (!accessId) {
    res.status(400).json({ error: "accessId is required" });
    return;
  }
  if (role && !Object.values(Role).includes(role)) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }
  try {
    const accessRequest = await Access.findById(accessId);
    if (!accessRequest) {
      res.status(404).json({ error: "Access request not found" });
      return;
    }

    accessRequest.accessApproved = true;
    if (role) {
      accessRequest.role = role as Role;
    }
    await accessRequest.save();
    res.status(200).json({ message: "Access request approved" });
  } catch (error) {
    console.error(colors.red.bold("Failed to approve access request:"), error);
    res.status(500).json({ error: "Server error" });
  }
};

export const rejectAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;
  try {
    const accessRequest = await Access.findOne({ email });
    if (!accessRequest) {
      res.status(404).json({ error: "Access request not found" });
      return;
    }
    accessRequest.accessApproved = false;
    await accessRequest.save();
    res.status(200).json({ message: "Access request rejected" });
  } catch (error) {
    console.error(colors.red.bold("Failed to reject access request:"), error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAccessMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const accessRequests = await Access.find({
      accessApproved: true,
    }).populate("userId", "name email phoneNumber");
    res.status(200).json(accessRequests);
  } catch (error) {
    console.error(colors.red.bold("Failed to get access requests:"), error);
    res.status(500).json({ error: "Server error" });
  }
};
