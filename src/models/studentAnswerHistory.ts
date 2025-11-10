import mongoose, { Schema, Document } from "mongoose";

export interface IStudentAnswer extends Document {
  studentTestId: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
  selectedAnswer: string;
  isCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentAnswerSchema: Schema<IStudentAnswer> = new Schema(
  {
    studentTestId: {
      type: Schema.Types.ObjectId,
      ref: "StudentTest",
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const StudentAnswerModel = mongoose.model<IStudentAnswer>(
  "StudentAnswer",
  StudentAnswerSchema
);

export default StudentAnswerModel;
