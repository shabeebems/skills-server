import stateModel, { IState } from "../../models/state.model";
import { BaseRepository } from "../base.repository";

export class StateRepository extends BaseRepository<IState> {
  constructor() {
    super(stateModel);
  }

  public async findByCountryCode(countryCode: string): Promise<IState[]> {
    return this.model.find({ countryCode }).exec();
  }
}
