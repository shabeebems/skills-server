import AnswerModel, { IAnswer } from "../models/answer.model";
import { BaseRepository } from "./base.repository";

export class AnswerRepository extends BaseRepository<IAnswer> {
  constructor() {
    super(AnswerModel);
  }
}


