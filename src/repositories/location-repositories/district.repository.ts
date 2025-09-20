import districtModel, { IDistrict } from "../../models/district.model";
import { BaseRepository } from "../base.repository";

export class DistrictRepository extends BaseRepository<IDistrict> {
  constructor() {
    super(districtModel);
  }

  public async findByStateCode(stateCode: string): Promise<IDistrict[]> {
    return this.model.find({ stateCode }).exec();
  }

  public async findByCountryCode(countryCode: string): Promise<IDistrict[]> {
    return this.model.find({ countryCode }).exec();
  }
}
