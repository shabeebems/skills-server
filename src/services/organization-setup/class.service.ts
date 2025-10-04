import { Messages } from "../../constants/messages";
import { ServiceResponse } from "../types";
import { IClass } from "../../models/class.model";
import { ClassRepository } from "../../repositories/class.repository";
import { formatClassOutput } from "../../views/organization-setup.view";

export class ClassService {
  private classRepository = new ClassRepository();

  public async createClass(data: IClass): Promise<ServiceResponse> {
    const created = await this.classRepository.create(data);
    return {
      success: true,
      message: Messages.CLASS_CREATED_SUCCESS,
      data: created,
    };
  }

  public async getAllClasses(organizationId: string): Promise<ServiceResponse> {
    const data = await this.classRepository.findByOrganizationId(
      organizationId
    );
    return {
      success: true,
      message: Messages.CLASS_FETCH_SUCCESS,
      data: formatClassOutput(data),
    };
  }

  public async getClassById(id: string): Promise<ServiceResponse> {
    const data = await this.classRepository.findById(id);
    if (!data) return { success: false, message: Messages.CLASS_NOT_FOUND };
    return { success: true, message: Messages.CLASS_FETCH_SUCCESS, data };
  }

  public async updateClass(
    id: string,
    payload: Partial<IClass>
  ): Promise<ServiceResponse> {
    const updated = await this.classRepository.update(id, payload);
    if (!updated) return { success: false, message: Messages.CLASS_NOT_FOUND };
    return {
      success: true,
      message: Messages.CLASS_UPDATED_SUCCESS,
      data: updated,
    };
  }

  public async deleteClass(id: string): Promise<ServiceResponse> {
    const deleted = await this.classRepository.delete(id);
    if (!deleted) return { success: false, message: Messages.CLASS_NOT_FOUND };
    return {
      success: true,
      message: Messages.CLASS_DELETED_SUCCESS,
      data: deleted,
    };
  }
}
