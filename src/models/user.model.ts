import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile?: number;
  image?: string;
  password: string;
  role: "adminUser" | "school" | "principle" | "hod" | "teacher" | "student";
  isVerified: boolean;
  isBlock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: { type: Number },
    image: { type: String },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["adminUser", "school", "principle", "hod", "teacher", "student"],
      required: true,
    },
    isVerified: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
