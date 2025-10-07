import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile?: string;
  image?: string;
  password: string;
  role: "master_admin" | "acc_manager" | "account manager" | "org_admin" | "principal" | "hod" | "teacher" | "student";
  aadharCardNumber?: string;
  isVerified: boolean;
  isBlock: boolean;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  organizationId?: Schema.Types.ObjectId;
  organizationIds?: Array<Schema.Types.ObjectId>;
  departmentId?: Schema.Types.ObjectId;
  assignmentId?: Schema.Types.ObjectId; // Replaced classId and sectionId
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
      enum: ["master_admin", "acc_manager", "account manager", "org_admin", "principal", "hod", "teacher", "student"],
      required: true,
    },
    aadharCardNumber: { type: String, trim: true },
    isVerified: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // relations
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization" },
    organizationIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
      default: undefined,
    },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment" }, // New field
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;