import { Schema, model, Document, Types } from "mongoose";

export interface IAssignedSubTeacher {
  subjectId: Types.ObjectId;
  teacherId: Types.ObjectId;
}

export interface ITeachingAssignment extends Document {
  organizationId: Types.ObjectId;
  assignmentId: Types.ObjectId;
  assignedSubTeachers: IAssignedSubTeacher[];
  createdAt?: Date;
  updatedAt?: Date;
}

const assignedSubTeacherSchema = new Schema<IAssignedSubTeacher>(
  {
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User", // assuming teachers are stored in User model
    },
  },
  { _id: false } // no separate _id for each subdocument
);

const teachingAssignmentSchema = new Schema<ITeachingAssignment>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    assignedSubTeachers: {
      type: [assignedSubTeacherSchema],
      required: true,
      default: [],
    },
  },
  { timestamps: true, collection: "teaching_assignments" }
);

// ✅ Add compound index for faster queries
teachingAssignmentSchema.index({ organizationId: 1, assignmentId: 1 });

export default model<ITeachingAssignment>(
  "TeachingAssignment",
  teachingAssignmentSchema
);
