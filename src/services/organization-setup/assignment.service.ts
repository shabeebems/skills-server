import { Messages } from "../../constants/messages";
import { ServiceResponse } from "../types";
import { AssignmentRepository } from "../../repositories/assignment.repository";
import { AssignmentInput } from "../../schemas/organization-setup.schema";
import { Types } from "mongoose";
import { formatClassSectionView } from "../../views/organization-setup.view";
import { OrganizationRepository } from "../../repositories/organization.repository";

export class AssignmentService {
  private assignmentRepository = new AssignmentRepository();
  private organizationRepository = new OrganizationRepository();

  public async createAssignment(
    data: AssignmentInput
  ): Promise<ServiceResponse> {
    const { classId, departmentId, organizationId, sectionIds } = data;
    // Convert IDs to ObjectId
    const sectionObjectIds = sectionIds.map((id) => new Types.ObjectId(id));

    // Check if any assignment already exists for the given combination
    const existingAssignments = await this.assignmentRepository.find({
      sectionId: { $in: sectionObjectIds },
      classId: new Types.ObjectId(classId),
      departmentId: new Types.ObjectId(departmentId),
      organizationId: new Types.ObjectId(organizationId),
    });

    if (existingAssignments.length > 0) {
      return {
        success: false,
        message: Messages.ASSIGNMENT_ALREADY_EXISTS,
      };
    }

    // If not exists, create new assignments
    const assignments = sectionIds.map((sectionId) => ({
      sectionId: new Types.ObjectId(sectionId),
      classId: new Types.ObjectId(classId),
      departmentId: new Types.ObjectId(departmentId),
      organizationId: new Types.ObjectId(organizationId),
    }));

    await this.assignmentRepository.insertMany(assignments);
    
    // ✅ Check and update organization setup status
    const organization = await this.organizationRepository.findById(
      organizationId
    );
    if (organization && organization.isSetupCompleted === false) {
      organization.isSetupCompleted = true;
      await organization.save();
    }
    return {
      success: true,
      message: Messages.ASSIGNMENT_CREATED_SUCCESS,
    };
  }

  public async getAssignmentsByOrgDeptAndClass(
    organizationId: string,
    departmentId: string,
    classId: string
  ): Promise<ServiceResponse> {
    const data = await this.assignmentRepository.findWithFilter(
      organizationId,
      { departmentId, classId }
    );
    return {
      success: true,
      message: Messages.ASSIGNMENT_FETCH_SUCCESS,
      data: formatClassSectionView(data),
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
