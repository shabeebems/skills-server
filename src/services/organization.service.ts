import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IOrganization } from "../models/organization.model";
import { OrganizationRepository } from "../repositories/organization.repository";

export class OrganizationService {
  private organizationRepository = new OrganizationRepository();

  public async createOrganization(data: IOrganization): Promise<ServiceResponse> {
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

  public async getOrganizations(): Promise<ServiceResponse> {
    const organizations = await this.organizationRepository.findAll();
    return {
      success: true,
      message: Messages.ORGANIZATION_FETCH_SUCCESS,
      data: organizations,
    };
  }
}
