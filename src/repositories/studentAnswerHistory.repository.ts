import StudentAnswerModel, { IStudentAnswer } from "../models/studentAnswerHistory";
import { BaseRepository } from "./base.repository";

export class StudentAnswerHistoryRepository extends BaseRepository<IStudentAnswer> {
  constructor() {
    super(StudentAnswerModel);
  }

  async findByStudentTestId(studentTestId: string) {
    return this.find({ studentTestId } as any);
  }

  async createMany(answers: Partial<IStudentAnswer>[]) {
    return this.model.insertMany(answers);
  }
}

