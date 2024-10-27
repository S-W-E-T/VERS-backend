import { Request, Response, NextFunction } from "express";
import colors from "colors";
import { verifyToken } from "../utils/jwt";
import Access, { IAccess } from "../models/access_model";

colors.enable();

declare global {
  namespace Express {
    interface Request {
      user?: IAccess | null;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    console.log(colors.red("Error: Authentication required"));
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await Access.findById(decoded.payload).populate(
      "userId",
      "name email phoneNumber"
    );
    // console.log(colors.white.bgGreen("user: "), user);
    if (!user) {
      console.log(colors.red("Error: Not authenticated"));
      return res.status(401).json({ message: "Not authenticated" });
    }

    console.log(
      colors.white.bgGreen("Requesting User: "),
      colors.bgBlack.white.underline(user?.userId?.email)
    );
    req.user = user;
    next();
  } catch (error) {
    console.log(colors.red("Error: Invalid token"));
    return res.status(401).json({ message: "Invalid token" });
  }
};
