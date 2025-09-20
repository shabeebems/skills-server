import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { CountryService } from "../services/location-services/country.service";
import { StateService } from "../services/location-services/state.service";
import { DistrictService } from "../services/location-services/district.service";

export class LocationController {
  private countryService = new CountryService();
  private stateService = new StateService();
  private districtService = new DistrictService();

  // -------- Country --------
  public createCountry = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.countryService.createCountry(req.body));

  public getAllCountries = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.countryService.getAllCountries());

  // -------- State --------
  public createState = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.stateService.createState(req.body));

  public getStatesByCountryCode = (
    req: Request,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () =>
      this.stateService.getStatesByCountryCode(req.params.countryCode)
    );

  // -------- District --------
  public createDistrict = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.districtService.createDistrict(req.body));

  public getDistrictsByStateCode = (
    req: Request,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () =>
      this.districtService.getDistrictsByStateCode(req.params.stateCode)
    );

  public getDistrictsByCountryCode = (
    req: Request,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () =>
      this.districtService.getDistrictsByCountryCode(req.params.countryCode)
    );
}
