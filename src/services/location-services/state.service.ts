import { Messages } from "../../constants/messages";
import { StateRepository } from "../../repositories/location-repositories/state.repository";
import { IState } from "../../models/state.model";
import { ServiceResponse } from "../types";

export class StateService {
  private stateRepo = new StateRepository();

  public async createState(data: IState): Promise<ServiceResponse> {
    const newState = await this.stateRepo.create(data);
    return {
      success: true,
      message: Messages.STATE_CREATED_SUCCESS,
      data: newState,
    };
  }

  public async getStatesByCountryCode(countryCode: string): Promise<ServiceResponse> {
    const states = await this.stateRepo.findByCountryCode(countryCode);
    return {
      success: true,
      message: Messages.STATE_FETCH_SUCCESS,
      data: states,
    };
  }
}
