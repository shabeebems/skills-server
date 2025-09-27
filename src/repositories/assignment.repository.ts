import { Types } from "mongoose";
import assignmentModel, { IAssignment } from "../models/assignment.model";
import { BaseRepository } from "./base.repository";

export class AssignmentRepository extends BaseRepository<IAssignment> {
  constructor() {
    super(assignmentModel);
  }

  async insertMany(data: Partial<IAssignment>[]): Promise<IAssignment[]> {
    return this.model.insertMany(data) as unknown as IAssignment[];
  }

  // ✅ new method to handle dynamic queries
  async findWithFilter(
    organizationId: string,
    filters?: { departmentId?: string; classId?: string }
  ): Promise<any[]> {
    const query: any = {
      organizationId: new Types.ObjectId(organizationId), // always required
    };

    if (filters?.departmentId) {
      query.departmentId = new Types.ObjectId(filters.departmentId);
    }

    if (filters?.classId) {
      query.classId = new Types.ObjectId(filters.classId);
    }

    const assignments = await this.model
      .find(query)
      .populate("departmentId", "name") // only fetch department name + _id
      .populate("classId", "name") // only fetch class name + _id
      .populate("sectionId", "name") // only fetch section name + _id
      .exec();

    // transform into desired shape
    return assignments.map((a: any) => ({
      _id: a._id,
      organizationId: a.organizationId,
      departmentId: a.departmentId?._id,
      department: a.departmentId?.name,
      classId: a.classId?._id,
      class: a.classId?.name,
      sectionId: a.sectionId?._id,
      section: a.sectionId?.name,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
  }
}
