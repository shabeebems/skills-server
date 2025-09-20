import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Messages } from "../constants/messages";

interface TokenPayload {
  _id: any;
  email: string;
  role: string;
}

export const createAccessToken = (
  res: Response,
  payload: TokenPayload
): void => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error(Messages.ACCESS_TOKEN_NOT_DEFINED);

  const accessToken = jwt.sign(payload, secret, {
    expiresIn: "30m",
    algorithm: "HS256",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 60 * 1000,
    sameSite: "strict",
    path: "/",
  });
};

export const createRefreshToken = (
  res: Response,
  payload: TokenPayload
): void => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error(Messages.REFRESH_TOKEN_NOT_DEFINED);

  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    path: "/",
  });
};

export const decodeToken = async (req: Request): Promise<any> => {
  const token = req.cookies?.accessToken;
  if (!token) return null;
  return jwt.decode(token);
};
