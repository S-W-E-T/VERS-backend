import jwt from "jsonwebtoken";
import { Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export interface TokenPayload {
  _id: string;
}

interface JwtPayload {
  payload: TokenPayload;
  iat: number;
  exp: number;
}

export const generateTokenAndSetCookie = (
  payload: TokenPayload,
  res: Response
): string => {
  try {
    const token = jwt.sign({ payload }, JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("ver-user", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true, // prevent XSS attacks
      secure: process.env.NODE_ENV !== "development", // use secure cookies in production
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).send("Internal Server Error");
    return "Token error";
  }
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
