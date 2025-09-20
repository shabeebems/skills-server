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

  public async getAllStates(): Promise<ServiceResponse> {
    const states = await this.stateRepo.findAll();
    return {
      success: true,
      message: Messages.STATE_FETCH_SUCCESS,
      data: states,
    };
  }

  public async getSingleState(_id: string): Promise<ServiceResponse> {
    const state = await this.stateRepo.findById(_id);
    return {
      success: true,
      message: Messages.STATE_FETCH_SUCCESS,
      data: state,
    };
  }
}
