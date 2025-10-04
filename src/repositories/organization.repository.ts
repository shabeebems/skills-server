import OrganizationModel, { IOrganization } from "../models/organization.model";
import { BaseRepository } from "./base.repository";

export class OrganizationRepository extends BaseRepository<IOrganization> {
  constructor() {
    super(OrganizationModel);
  }

  public async existsByEmail(adminEmail: string): Promise<boolean> {
    const count = await this.model.countDocuments({ adminEmail }).exec();
    return count > 0;
  }

  public async existsByMobile(mobileNumber: string): Promise<boolean> {
    const count = await this.model.countDocuments({ mobileNumber }).exec();
    return count > 0;
  }

  public async findAllByFilter(query: any): Promise<IOrganization[]> {
    return this.model.find(query).sort({ createdAt: -1 }).exec();
  }

  public async findByFilter(
    query: any,
    skip: number = 0,
    limit: number = 5
  ): Promise<IOrganization[]> {
    return this.model
      .find(query)
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip(skip)
      .limit(limit)
      .exec();
  }

  public async getCountByFilter(query: any): Promise<number> {
    return this.model.countDocuments(query).exec();
  }

  // ✅ Count organizations (with optional filters)
  public async countAll(query: any = {}): Promise<number> {
    return this.model.countDocuments(query).exec();
  }
}
