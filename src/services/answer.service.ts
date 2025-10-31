import { AnswerRepository } from "../repositories/answer.repository";
import { IAnswer } from "../models/answer.model";

export class AnswerService {
  private answerRepository = new AnswerRepository();

  public async createAnswer(data: Partial<IAnswer>) {
    const created = await this.answerRepository.create(data as Partial<IAnswer>);
    return created;
  }

  public async getAnswersByQuestionIds(questionIds: string[]) {
    return this.answerRepository.find({ questionId: { $in: questionIds } } as any);
  }

  public async getAnswerByQuestionId(questionId: string) {
    return this.answerRepository.findOne({ questionId } as any);
  }

  public async updateAnswer(answerId: string, data: Partial<IAnswer>) {
    return this.answerRepository.update(answerId, data as Partial<IAnswer>);
  }

  public async deleteByQuestionId(questionId: string) {
    const existing = await this.getAnswerByQuestionId(questionId);
    if (existing) {
      await this.answerRepository.delete(String((existing as any)._id));
    }
  }
}


