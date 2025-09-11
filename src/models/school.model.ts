import { Schema, model, Document } from 'mongoose';

export interface ISchool extends Document {
  name: string;
  address: string;
  establishedYear: number;
  numberOfStudents: number;
}

const schoolSchema = new Schema<ISchool>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  establishedYear: { type: Number, required: true },
  numberOfStudents: { type: Number, required: true }
});

export default model<ISchool>('School', schoolSchema);
