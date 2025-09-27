import { Messages } from "../../constants/messages";
import { ServiceResponse } from "../types";
import { IDepartment } from "../../models/department.model";
import { DepartmentRepository } from "../../repositories/department.repository";

export class DepartmentService {
  private departmentRepository = new DepartmentRepository();

  public async createDepartment(data: IDepartment): Promise<ServiceResponse> {
    const created = await this.departmentRepository.create(data);
    return { success: true, message: Messages.DEPARTMENT_CREATED_SUCCESS, data: created };
  }

  public async getAllDepartments(organizationId: string): Promise<ServiceResponse> {
    const data = await this.departmentRepository.findByOrganizationId(organizationId);
    return { success: true, message: Messages.DEPARTMENT_FETCH_SUCCESS, data };
  }

  public async getDepartmentById(id: string): Promise<ServiceResponse> {
    const data = await this.departmentRepository.findById(id);
    if (!data) return { success: false, message: Messages.DEPARTMENT_NOT_FOUND };
    return { success: true, message: Messages.DEPARTMENT_FETCH_SUCCESS, data };
  }

  public async updateDepartment(id: string, payload: Partial<IDepartment>): Promise<ServiceResponse> {
    const updated = await this.departmentRepository.update(id, payload);
    if (!updated) return { success: false, message: Messages.DEPARTMENT_NOT_FOUND };
    return { success: true, message: Messages.DEPARTMENT_UPDATED_SUCCESS, data: updated };
  }

  public async deleteDepartment(id: string): Promise<ServiceResponse> {
    const deleted = await this.departmentRepository.delete(id);
    if (!deleted) return { success: false, message: Messages.DEPARTMENT_NOT_FOUND };
    return { success: true, message: Messages.DEPARTMENT_DELETED_SUCCESS, data: deleted };
  }
}


