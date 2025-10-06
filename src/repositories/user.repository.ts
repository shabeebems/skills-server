import UserModel, { IUser } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import jwt from "jsonwebtoken";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  findByEmail = (email: string): Promise<IUser | null> =>
    this.model.findOne({ email });

  findByRole = (role: string): Promise<IUser[]> => this.model.find({ role });

  // ✅ New method
  findByFilter = (filters: {
    role?: string;
    name?: string;
    email?: string;
    mobile?: number;
  }): Promise<IUser[]> => {
    const query: any = {};

    if (filters.role) query.role = filters.role;
    if (filters.name) query.name = { $regex: filters.name, $options: "i" }; // case-insensitive search
    if (filters.email) query.email = { $regex: filters.email, $options: "i" };
    if (filters.mobile)
      query.mobile = { $regex: filters.mobile, $options: "i" };

    return this.model.find(query).populate("organizationIds");
  };

  findUserByToken = (
    token: string,
    jwtSecret: string
  ): Promise<IUser | null> => {
    const verify: any = jwt.verify(token, jwtSecret);
    return this.findByEmail(verify.email);
  };
}
