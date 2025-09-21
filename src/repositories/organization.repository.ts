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

  public async findByFilter(query: any): Promise<IOrganization[]> {
    return this.model.find(query).exec();
  }
}
