import { Schema, model, Document } from "mongoose";

export interface ISystemSetting extends Document {
  systemCode: string;
  values: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const systemSettingSchema = new Schema<ISystemSetting>(
  {
    systemCode: { type: String, required: true, unique: true },
    values: { type: [String], required: true, default: [] },
  },
  { timestamps: true, collection: "systemSettings" }
);

systemSettingSchema.index({ systemCode: 1 }, { unique: true });

export default model<ISystemSetting>("SystemSetting", systemSettingSchema);
