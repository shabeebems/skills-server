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

  async findWithFilter(
    organizationId: string,
    filters?: { departmentId?: string; classId?: string }
  ): Promise<IAssignment[]> {
    const query: any = {
      organizationId: new Types.ObjectId(organizationId),
    };

    if (filters?.departmentId) {
      query.departmentId = new Types.ObjectId(filters.departmentId);
    }

    if (filters?.classId) {
      query.classId = new Types.ObjectId(filters.classId);
    }

    return this.model
      .find(query)
      .populate("departmentId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .exec();
  }
}
