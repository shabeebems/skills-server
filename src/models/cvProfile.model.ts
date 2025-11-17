import mongoose, { Schema, Document } from "mongoose";

export interface ICVProfile extends Document {
  userId: Schema.Types.ObjectId;
  address: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  aboutMe: string;
  createdAt: Date;
  updatedAt: Date;
}

const CVProfileSchema: Schema<ICVProfile> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    address: { type: String, required: true, trim: true },
    linkedIn: { type: String, trim: true },
    github: { type: String, trim: true },
    portfolio: { type: String, trim: true },
    aboutMe: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const CVProfileModel = mongoose.model<ICVProfile>("CVProfile", CVProfileSchema);
export default CVProfileModel;

