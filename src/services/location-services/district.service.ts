import { Messages } from "../../constants/messages";
import { DistrictRepository } from "../../repositories/location-repositories/district.repository";
import { IDistrict } from "../../models/district.model";
import { ServiceResponse } from "../types";

export class DistrictService {
  private districtRepo = new DistrictRepository();

  public async createDistrict(data: IDistrict): Promise<ServiceResponse> {
    const newDistrict = await this.districtRepo.create(data);
    return {
      success: true,
      message: Messages.DISTRICT_CREATED_SUCCESS,
      data: newDistrict,
    };
  }

  public async getDistrictsByStateCode(stateCode: string): Promise<ServiceResponse> {
    const districts = await this.districtRepo.findByStateCode(stateCode);
    return {
      success: true,
      message: Messages.DISTRICT_FETCH_SUCCESS,
      data: districts,
    };
  }

  public async getDistrictsByCountryCode(countryCode: string): Promise<ServiceResponse> {
    const districts = await this.districtRepo.findByCountryCode(countryCode);
    return {
      success: true,
      message: Messages.DISTRICT_FETCH_SUCCESS,
      data: districts,
    };
  }
}
