import { Messages } from "../../constants/messages";
import { ServiceResponse } from "../types";
import { IAssignment } from "../../models/assignment.model";
import { AssignmentRepository } from "../../repositories/assignment.repository";
import { AssignmentInput } from "../../schemas/organization-setup.schema";
import { Types } from "mongoose";
import { formatClassSectionView } from "../../views/organization-setup.view";

export class AssignmentService {
  private assignmentRepository = new AssignmentRepository();

  public async createAssignment(
    data: AssignmentInput
  ): Promise<ServiceResponse> {
    // map sectionIds to individual assignment docs
    const assignments = data.sectionIds.map((sectionId) => ({
      sectionId: new Types.ObjectId(sectionId),
      classId: new Types.ObjectId(data.classId),
      departmentId: new Types.ObjectId(data.departmentId),
      organizationId: new Types.ObjectId(data.organizationId),
    }));

    // create multiple documents at once
    const created = await this.assignmentRepository.insertMany(assignments);

    return {
      success: true,
      message: Messages.ASSIGNMENT_CREATED_SUCCESS,
      data: created,
    };
  }

  public async getAllAssignments(
    organizationId: string, query: object
  ): Promise<ServiceResponse> {
    const data = await this.assignmentRepository.findWithFilter(organizationId, query);
    return {
      success: true,
      message: Messages.ASSIGNMENT_FETCH_SUCCESS,
      data,
    };
  }

  public async getAssignmentById(id: string): Promise<ServiceResponse> {
    const data = await this.assignmentRepository.findById(id);
    if (!data)
      return { success: false, message: Messages.ASSIGNMENT_NOT_FOUND };
    return { success: true, message: Messages.ASSIGNMENT_FETCH_SUCCESS, data };
  }

  public async updateAssignment(
    id: string,
    payload: Partial<IAssignment>
  ): Promise<ServiceResponse> {
    const updated = await this.assignmentRepository.update(id, payload);
    if (!updated)
      return { success: false, message: Messages.ASSIGNMENT_NOT_FOUND };
    return {
      success: true,
      message: Messages.ASSIGNMENT_UPDATED_SUCCESS,
      data: updated,
    };
  }

  public async deleteAssignment(id: string): Promise<ServiceResponse> {
    const deleted = await this.assignmentRepository.delete(id);
    if (!deleted)
      return { success: false, message: Messages.ASSIGNMENT_NOT_FOUND };
    return {
      success: true,
      message: Messages.ASSIGNMENT_DELETED_SUCCESS,
      data: deleted,
    };
  }
}
