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
        path: "assignedSubTeachers.subjectId",
        select: "name",
      })
      .populate({
        path: "assignedSubTeachers.teacherId",
        select: "name",
      });
  };

  // 🔁 Update teacher for an existing subject, or add if not exists
  assignOrUpdateTeacher = async (
    assignmentId: string,
    organizationId: string,
    subjectId: string,
    teacherId: string
  ) => {
    // Step 1: Try updating existing subject's teacher
    const result = await this.model.updateOne(
      {
        organizationId,
        assignmentId,
        "assignedSubTeachers.subjectId": subjectId,
      },
      { $set: { "assignedSubTeachers.$.teacherId": teacherId } }
    );

    // Step 2: If not found, push new subject-teacher entry
    if (result.matchedCount === 0) {
      await this.model.updateOne(
        { assignmentId, organizationId },
        { $push: { assignedSubTeachers: { subjectId, teacherId } } },
        { upsert: true }
      );
    }

    return result;
  };
}
