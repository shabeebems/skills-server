import { Messages } from "../../constants/messages";
import { ITeachingAssignment } from "../../models/teachingAssignment.model";
import { teachingAssignmentRepository } from "../../repositories/teachingAssignment.repository";
import { ServiceResponse } from "../types";

export class TeachingAssignmentService {
  private teachingAssignmentRepository = new teachingAssignmentRepository();

  public createTeachingAssignment = async (
    data: ITeachingAssignment
  ): Promise<ServiceResponse> => {
    await this.teachingAssignmentRepository.create(data);
    return {
      success: true,
      message: Messages.TEACHING_ASSIGNMENT_CREATED_SUCCESS,
    };
  };

  public getTeachingAssignments = async (
    orgId: string
  ): Promise<ServiceResponse> => {
    const assignments = await this.teachingAssignmentRepository.findWithDetails(
      orgId
    );
    return {
      success: true,
      message: Messages.TEACHING_ASSIGNMENTS_FETCHED_SUCCESS,
      data: assignments,
    };
  };

  public assignTeacher = async (
    params: { assignmentId: string; subjectId: string },
    body: { organizationId: string; teacherId: string }
  ): Promise<ServiceResponse> => {
    const { assignmentId, subjectId } = params;
    const { organizationId, teacherId } = body;
    await this.teachingAssignmentRepository.assignOrUpdateTeacher(
      assignmentId,
      organizationId,
      subjectId,
      teacherId
    );
    return {
      success: true,
      message: Messages.TEACHING_ASSIGNMENT_UPDATED_SUCCESS,
    };
  };
}
