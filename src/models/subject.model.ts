import { Schema, model, Document, Types } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code?: string;
  credits?: number;
  type?: string;
  description?: string;
  organizationId: Types.ObjectId; // reference to Organization
  createdAt?: Date;
  updatedAt?: Date;
}

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    code: { type: String },
    credits: { type: Number },
    type: { type: String },
    description: { type: String },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    }
  },
  { timestamps: true, collection: "subjects" }
);

export default model<ISubject>("Subject", subjectSchema);
