import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile?: string;
  image?: string;
  password: string;
  role: "master admin" | "account manager" | "principle" | "hod" | "teacher" | "student";
  aadharCardNumber?: string;
  isVerified: boolean;
  isBlock: boolean;
  status: "active" | "inactive"; // added status field
  createdAt: Date;
  updatedAt: Date;
  organizationIds?: Array<Schema.Types.ObjectId>;
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
    mobile: { type: String },
    image: { type: String },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["master admin", "account manager", "principle", "hod", "teacher", "student"],
      required: true,
    },
    aadharCardNumber: { type: String, trim: true },
    isVerified: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active", // default active
    },
    organizationIds: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
