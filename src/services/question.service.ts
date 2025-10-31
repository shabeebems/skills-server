import { QuestionRepository } from "../repositories/question.repository";
import { IQuestion } from "../models/question.model";

export class QuestionService {
  private questionRepository = new QuestionRepository();

  public async createQuestion(data: Partial<IQuestion>) {
    const created = await this.questionRepository.create(data as Partial<IQuestion>);
    return created;
  }

  public async getQuestionsByTestId(testId: string) {
    return this.questionRepository.find({ testId } as any);
  }

  public async updateQuestion(questionId: string, data: Partial<IQuestion>) {
    return this.questionRepository.update(questionId, data as Partial<IQuestion>);
  }

  public async deleteQuestion(questionId: string) {
    return this.questionRepository.delete(questionId);
  }
}


