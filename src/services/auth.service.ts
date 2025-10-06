import bcrypt from "bcrypt";
import { Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { Messages } from "../constants/messages";
import { LoginRequest, ServiceResponse } from "./types";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

export class AuthService {
  private userRepository = new UserRepository();

  public async login(
    res: Response,
    data: LoginRequest
  ): Promise<ServiceResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) return { success: false, message: Messages.USER_NOT_FOUND };

    // const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (data.password != user.password)
      return { success: false, message: Messages.PASSWORD_INCORRECT };

    if (user.isBlock) return { success: false, message: Messages.USER_BLOCKED };

    const { _id, email, role } = user;
    const payload = { _id, email, role };
  
    createAccessToken(res, payload);
    createRefreshToken(res, payload);

    return { success: true, message: Messages.LOGIN_SUCCESS, data: payload };
  }
}
