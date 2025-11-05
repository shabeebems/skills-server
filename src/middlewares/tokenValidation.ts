import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createAccessToken, clearRefreshToken, clearAccessToken } from "../utils/jwt";
import { UserRepository } from "../repositories/user.repository";

const userSchema = new UserRepository();

export const authenticateToken = (allowedRoles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;
      const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

      if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
        throw new Error("Token secrets are not defined");
      }

      const handleUser = async (userDetails: any) => {
        if (userDetails.isBlock || !userDetails.isVerified) {
          clearAccessToken(res);
          clearRefreshToken(res);
          return res.status(403).json({ success: false, message: "USER_BLOCKED" });
        }

        if (!allowedRoles.includes(userDetails.role)) {
          clearAccessToken(res);
          clearRefreshToken(res);
          return res.status(403).json({ success: false, message: "UNAUTHORIZED_ACCESS" });
        }
        
        req.user = userDetails;
        next();
      };

      // ✅ Access token
      if (accessToken) {
        try {
          const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as any;
          const userDetails = await userSchema.findUserByToken(accessToken, ACCESS_TOKEN_SECRET);
          return handleUser(userDetails);
        } catch {
          clearAccessToken(res);
          clearRefreshToken(res);
        }
      }

      // ✅ Refresh token
      if (refreshToken) {
        try {
          const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
          const userDetails = await userSchema.findUserByToken(refreshToken, REFRESH_TOKEN_SECRET || '');

          if(!userDetails) {
            clearAccessToken(res);
            clearRefreshToken(res);
            return res.status(403).json({ success: false, message: "REFRESH_TOKEN_INVALID" });
          }
          
          // Create new access token
          createAccessToken(res, {
            _id: userDetails._id,
            email: userDetails.email,
            role: userDetails.role,
          });

          return handleUser(userDetails);
        } catch {
          clearAccessToken(res);
          clearRefreshToken(res);
          return res.status(401).json({ success: false, message: "REFRESH_TOKEN_INVALID" });
        }
      }

      // ❌ No token
      return res.status(401).json({ success: false, message: "NO_TOKEN" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
  };
};
