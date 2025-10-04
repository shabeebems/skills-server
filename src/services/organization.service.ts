import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IOrganization } from "../models/organization.model";
import { OrganizationRepository } from "../repositories/organization.repository";
import { formatOrganizationsOutput } from "../views/organization.view";

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
    // Filters
    if (filters.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters.country)
      query.country = { $regex: filters.country, $options: "i" };
    if (filters.state) query.state = { $regex: filters.state, $options: "i" };
    if (filters.district)
      query.district = { $regex: filters.district, $options: "i" };

    if (filters.status) {
      if (filters.status === "not-pending") {
        query.status = { $ne: "pending" };
      } else {
        query.status = filters.status;
      }
    }

    // If pagination params exist
    if (filters.page || filters.limit) {
      const page = parseInt(filters.page as string) || 1;
      const limit = parseInt(filters.limit as string) || 5;
      const skip = (page - 1) * limit;

      const organizations = await this.organizationRepository.findByFilter(
        query,
        skip,
        limit
      );

      const totalCount = await this.organizationRepository.getCountByFilter(
        query
      );
      const totalPages = Math.ceil(totalCount / limit);

      return {
        success: true,
        message: Messages.ORGANIZATION_FETCH_SUCCESS,
        data: {
          organizations: formatOrganizationsOutput(organizations),
          pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            hasNext: page < totalPages,
            hasPrev: page > 1,
            limit,
          },
        },
      };
    } else {
      // No pagination → return all results
      const organizations = await this.organizationRepository.findAllByFilter(
        query
      );

      return {
        success: true,
        message: Messages.ORGANIZATION_FETCH_SUCCESS,
        data: formatOrganizationsOutput(organizations),
      };
    }
  }

  // if (filters.isSetupCompleted !== undefined) {
  //   query.isSetupCompleted = filters.isSetupCompleted;
  // }

  public async getOrganizationsCount(filters: any): Promise<ServiceResponse> {
    const query: any = {};

    if (filters.status) {
      if (filters.status === "pending") {
        query.status = "pending";
      } else if (filters.status === "not-pending") {
        query.status = { $ne: "pending" };
      }
    }

    const count = await this.organizationRepository.countAll(query);
    return {
      success: true,
      message: Messages.ORGANIZATION_FETCH_SUCCESS,
      data: { count },
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
