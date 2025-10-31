import QuestionModel, { IQuestion } from "../models/question.model";
import { BaseRepository } from "./base.repository";

export class QuestionRepository extends BaseRepository<IQuestion> {
  constructor() {
    super(QuestionModel);
  }
}


