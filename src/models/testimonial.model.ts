import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  studentId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  skillPlannerId: Schema.Types.ObjectId;
  validatorName: string;
  validatorEmail: string;
  validatorRole: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    skillPlannerId: {
      type: Schema.Types.ObjectId,
      ref: "SkillPlanner",
      required: true,
    },
    validatorName: {
      type: String,
      required: true,
      trim: true,
    },
    validatorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    validatorRole: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
TestimonialSchema.index({ studentId: 1, topicId: 1 });
TestimonialSchema.index({ jobId: 1, topicId: 1 });
TestimonialSchema.index({ skillPlannerId: 1, topicId: 1 });

const TestimonialModel = mongoose.model<ITestimonial>(
  "Testimonial",
  TestimonialSchema
);

export default TestimonialModel;

