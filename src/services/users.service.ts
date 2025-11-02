import { UserRepository } from "../repositories/user.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IUser } from "../models/user.model";
import { formatUsersOutput } from "../views/user.view";

export class UserService {
  private userRepository = new UserRepository();

  public async createUser(data: IUser): Promise<ServiceResponse> {
    const existingUserByEmail = await this.userRepository.findByEmail(data.email);
    if (existingUserByEmail) {
      return {
        success: false,
        message: Messages.EMAIL_ALREADY_EXISTS,
        data: null,
      };
    }

    if (data.mobile) {
      const existingUserByMobile = await this.userRepository.findOne({
        mobile: data.mobile,
      });
      if (existingUserByMobile) {
        return {
          success: false,
          message: Messages.MOBILE_NUMBER_ALREADY_EXISTS,
          data: null,
        };
      }
    }

    if (data.role === "hod" && data.organizationId && data.departmentId) {
      const existingHOD = await this.userRepository.findOne({
        role: "hod",
        organizationId: data.organizationId,
        departmentId: data.departmentId,
      });
      if (existingHOD) {
        return {
          success: false,
          message: Messages.HOD_ALREADY_EXISTS,
          data: null,
        };
      }
    }

    const plainPassword =
      (data.name?.slice(0, 4).toUpperCase() || "USER") +
      (data.mobile?.toString().slice(0, 4) || "0000");

    data.password = plainPassword

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
