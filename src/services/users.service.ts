import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { fetchCreatableRoles, UserRole } from "../utils/role-hierarchy.utils";
import { IUser } from "../models/user.model";

export class UserService {
  private userRepository = new UserRepository();

  public async getCreatableRoles(req: Request): Promise<ServiceResponse> {
    const creatableRoles: UserRole[] = await fetchCreatableRoles(req);
    return {
      success: true,
      message: Messages.CREATABLE_ROLES_FETCHED,
      data: creatableRoles,
    };
  }

  public async createUser(data: IUser): Promise<ServiceResponse> {
    const newUser = await this.userRepository.create(data)
    return {
      success: true,
      message: Messages.USER_CREATED_SUCCESS,
      data: newUser
    };
  }
}
