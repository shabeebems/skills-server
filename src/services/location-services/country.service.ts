import { Messages } from "../../constants/messages";
import { CountryRepository } from "../../repositories/location-repositories/country.repository";
import { ICountry } from "../../models/country.model";
import { ServiceResponse } from "../types";

export class CountryService {
  private countryRepo = new CountryRepository();

  public async createCountry(data: ICountry): Promise<ServiceResponse> {
    const newCountry = await this.countryRepo.create(data);
    return {
      success: true,
      message: Messages.COUNTRY_CREATED_SUCCESS,
      data: newCountry,
    };
  }

  public async getAllCountries(): Promise<ServiceResponse> {
    const countries = await this.countryRepo.findAll();
    return {
      success: true,
      message: Messages.COUNTRY_FETCH_SUCCESS,
      data: countries,
    };
  }
}
