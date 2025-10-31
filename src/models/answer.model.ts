import mongoose, { Schema, Document } from "mongoose";

export interface IAnswer extends Document {
  questionId: Schema.Types.ObjectId;
  correctAnswer: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema: Schema<IAnswer> = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    correctAnswer: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const AnswerModel = mongoose.model<IAnswer>("Answer", AnswerSchema);
export default AnswerModel;
