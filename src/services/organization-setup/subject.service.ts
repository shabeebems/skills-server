import { Messages } from "../../constants/messages";
import { ServiceResponse } from "../types";
import { ISubject } from "../../models/subject.model";
import { SubjectRepository } from "../../repositories/subject.repository";

export class SubjectService {
  private subjectRepository = new SubjectRepository();

  public async createSubject(data: ISubject): Promise<ServiceResponse> {
    const created = await this.subjectRepository.create(data);
    return { success: true, message: Messages.SUBJECT_CREATED_SUCCESS, data: created };
  }

  public async getAllSubjects(organizationId: string): Promise<ServiceResponse> {
    const data = await this.subjectRepository.findByOrganizationId(organizationId);
    return { success: true, message: Messages.SUBJECT_FETCH_SUCCESS, data };
  }

  public async getSubjectById(id: string): Promise<ServiceResponse> {
    const data = await this.subjectRepository.findById(id);
    if (!data) return { success: false, message: Messages.SUBJECT_NOT_FOUND };
    return { success: true, message: Messages.SUBJECT_FETCH_SUCCESS, data };
  }

  public async updateSubject(id: string, payload: Partial<ISubject>): Promise<ServiceResponse> {
    const updated = await this.subjectRepository.update(id, payload);
    if (!updated) return { success: false, message: Messages.SUBJECT_NOT_FOUND };
    return { success: true, message: Messages.SUBJECT_UPDATED_SUCCESS, data: updated };
  }

  public async deleteSubject(id: string): Promise<ServiceResponse> {
    const deleted = await this.subjectRepository.delete(id);
    if (!deleted) return { success: false, message: Messages.SUBJECT_NOT_FOUND };
    return { success: true, message: Messages.SUBJECT_DELETED_SUCCESS, data: deleted };
  }
}


