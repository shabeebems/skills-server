import { UserRepository } from "../repositories/user.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IUser } from "../models/user.model";
import { formatUsersOutput } from "../views/user.view";

export class UserService {
  private userRepository = new UserRepository();

  public async createUser(data: IUser): Promise<ServiceResponse> {
    data.password =
      (data.name?.slice(0, 4).toUpperCase() || "USER") +
      (data.mobile?.toString().slice(0, 4) || "0000");
    const newUser = await this.userRepository.create(data);
    return {
      success: true,
      message: Messages.USER_CREATED_SUCCESS,
      data: newUser,
    };
  }

  public async findUsersByFilter(query: object): Promise<ServiceResponse> {
    const users = await this.userRepository.findByFilter(query);
    return {
      success: true,
      message: Messages.CREATABLE_ROLES_FETCHED,
      data: formatUsersOutput(users),
    };
  }

  public async getAccManagerById(id: string): Promise<ServiceResponse> {
    const users = await this.userRepository.findOneWithOrganizations(id);
    console.log("Fetched user:", users);
    return {
      success: true,
      message: Messages.CREATABLE_ROLES_FETCHED,
      data: users,
    };
  }

  public async updateUser(id: string, data: object): Promise<ServiceResponse> {
    const users = await this.userRepository.update(id, data);
    return {
      success: true,
      message: Messages.CREATABLE_ROLES_FETCHED,
      data: users,
    };
  }

  public async deleteUser(id: string): Promise<ServiceResponse> {
    const users = await this.userRepository.delete(id);
    return {
      success: true,
      message: Messages.CREATABLE_ROLES_FETCHED,
      data: users,
    };
  }
}
