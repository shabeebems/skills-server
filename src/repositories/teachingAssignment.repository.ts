import teachingAssignment, {
  ITeachingAssignment,
} from "../models/teachingAssignment.model";
import { BaseRepository } from "./base.repository";

export class teachingAssignmentRepository extends BaseRepository<ITeachingAssignment> {
  constructor() {
    super(teachingAssignment);
  }

  // 🧩 Fetch all teaching assignments with full details
  findWithDetails = (organizationId: string) => {
    return this.model
      .find({ organizationId })
      .populate({
        path: "assignmentId",
        populate: [
          { path: "classId", select: "name" },
          { path: "sectionId", select: "name" },
          { path: "departmentId", select: "name" },
        ],
        select: "classId sectionId departmentId",
      })
      .populate({
        path: "subjectId",
        select: "name code",
      })
      .populate({
        path: "teacherId",
        select: "name",
      });
  };

  // 🧩 Fetch teaching assignments by organizationId and assignmentId with full details
  findByOrgAndAssignment = (organizationId: string, assignmentId: string) => {
    return this.model
      .find({ organizationId, assignmentId })
      .populate({
        path: "subjectId",
        select: "name code",
      })
      .populate({
        path: "teacherId",
        select: "name",
      });
  };

  // 🔁 Update teacher for an existing subject, or create if not exists
  assignOrUpdateTeacher = async (
    assignmentId: string,
    organizationId: string,
    subjectId: string,
    teacherId: string
  ) => {
    // Use findOneAndUpdate with upsert to create or update
    return this.model.findOneAndUpdate(
      {
        organizationId,
        assignmentId,
        subjectId,
      },
      {
        organizationId,
        assignmentId,
        subjectId,
        teacherId,
      },
      {
        upsert: true,
        new: true,
      }
    );
  };

  // ❌ Remove a subject entry by assignmentId, organizationId, and subjectId
  removeSubjectFromAssignment = async (
    assignmentId: string,
    organizationId: string,
    subjectId: string
  ) => {
    return this.model.deleteOne({
      assignmentId,
      organizationId,
      subjectId,
    });
  };
}
