import { IUser } from "../models/user.model";

export const formatUsersOutput = (users: IUser[] | null) => {
  if (!users) return [];
  return users.map((user) => ({
    _id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
    mobile: user.mobile,
  }));
};
