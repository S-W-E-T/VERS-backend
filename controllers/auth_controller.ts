import { Request, Response } from "express";
import colors from "colors";
import User, { IUser } from "../models/user_model";
import Access, { IAccess, Role } from "../models/access_model";
import { generateTokenAndSetCookie, TokenPayload } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/password";

colors.enable();

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber, password, role } = req.body;
  if (!name || !email || !phoneNumber || !password || !role) {
    res.status(400).json({ error: "Please fill in all fields" });
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: IUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Create access record
    const newAccess: IAccess = new Access({
      userId: savedUser._id,
      role: role || Role.USER,
      accessApproved: false,
    });

    await newAccess.save();

    // Generate JWT and set cookie
    const tokenPayload: TokenPayload = {
      _id: newAccess._id.toString(),
    };

    const token = generateTokenAndSetCookie(tokenPayload, res);

    const resUser = {
      name: savedUser.name,
      email: savedUser.email,
      phoneNumber: savedUser.phoneNumber,
      role: newAccess.role,
      accessApproved: newAccess.accessApproved,
    };
    console.log(resUser, newAccess, "data");

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: resUser,
    });
  } catch (error: any) {
    console.error(
      colors.red.bgWhite("Error registering user:"),
      colors.red.bgWhite(error)
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please fill in all fields" });
    return;
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // Check if user's access is approved
    const access = await Access.findOne({ userId: user._id });
    if (!access) {
      res.status(403).json({ error: "Access Request is not available" });
      return;
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT and set cookie
    const tokenPayload: TokenPayload = {
      _id: access._id.toString(),
    };

    const token = generateTokenAndSetCookie(tokenPayload, res);
    const resUser = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: access.role,
      accessApproved: access.accessApproved,
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: resUser,
    });
  } catch (error: any) {
    console.error(
      colors.red.bgWhite("Error logging in user:"),
      colors.red.bgWhite(error)
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
