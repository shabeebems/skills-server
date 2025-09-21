import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IOrganization } from "../models/organization.model";
import { OrganizationRepository } from "../repositories/organization.repository";

export class OrganizationService {
  private organizationRepository = new OrganizationRepository();

  public async createOrganization(
    data: IOrganization
  ): Promise<ServiceResponse> {
    if (await this.organizationRepository.existsByEmail(data.adminEmail)) {
      return { success: false, message: Messages.ADMIN_EMAIL_ALREADY_EXISTS };
    }

    if (await this.organizationRepository.existsByMobile(data.mobileNumber)) {
      return { success: false, message: Messages.MOBILE_NUMBER_ALREADY_EXISTS };
    }
    const newOrganization = await this.organizationRepository.create(data);
    return {
      success: true,
      message: Messages.ORGANIZATION_CREATED_SUCCESS,
      data: newOrganization,
    };
  }

  public async getOrganizations(filters: any): Promise<ServiceResponse> {
    const query: any = {};

    if (filters.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters.country)
      query.country = { $regex: filters.country, $options: "i" };
    if (filters.state) query.state = { $regex: filters.state, $options: "i" };
    if (filters.district)
      query.district = { $regex: filters.district, $options: "i" };

    const organizations = await this.organizationRepository.findByFilter(query);

    return {
      success: true,
      message: Messages.ORGANIZATION_FETCH_SUCCESS,
      data: organizations,
    };
  }

  public async getOrganizationById(id: string): Promise<ServiceResponse> {
    const org = await this.organizationRepository.findById(id);
    if (!org) {
      return { success: false, message: Messages.ORGANIZATION_NOT_FOUND };
    }
    return {
      success: true,
      message: Messages.ORGANIZATION_FETCH_SUCCESS,
      data: org,
    };
  }

  public async updateOrganization(
    id: string,
    data: Partial<IOrganization>
  ): Promise<ServiceResponse> {
    const updated = await this.organizationRepository.update(id, data);
    if (!updated) {
      return { success: false, message: Messages.ORGANIZATION_NOT_FOUND };
    }
    return {
      success: true,
      message: Messages.ORGANIZATION_UPDATED_SUCCESS,
      data: updated,
    };
  }

  public async deleteOrganization(id: string): Promise<ServiceResponse> {
    const deleted = await this.organizationRepository.delete(id);
    if (!deleted) {
      return { success: false, message: Messages.ORGANIZATION_NOT_FOUND };
    }
    return {
      success: true,
      message: Messages.ORGANIZATION_DELETED_SUCCESS,
      data: deleted,
    };
  }

  public async changeStatus(
    id: string,
    action: "accept" | "reject"
  ): Promise<ServiceResponse> {
    const newStatus = action === "accept" ? "active" : "rejected";
    const updated = await this.organizationRepository.update(id, {
      status: newStatus,
    });
    if (!updated) {
      return { success: false, message: Messages.ORGANIZATION_NOT_FOUND };
    }
    return {
      success: true,
      message: `Organization ${action}ed successfully`,
      data: updated,
    };
  }
}
