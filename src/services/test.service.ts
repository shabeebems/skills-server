import { TestRepository } from "../repositories/test.repository";
import { QuestionService } from "./question.service";
import { AnswerService } from "./answer.service";
import { ITest } from "../models/test.model";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";

type CreateTestPayload = ITest & {
  questions: Array<{
    questionText: string;
    options: string[];
    topicId: string;
    difficultyLevel?: "Easy" | "Medium" | "Hard";
    correctAnswer: string;
  }>;
};

export class TestService {
  private testRepository = new TestRepository();
  private questionService = new QuestionService();
  private answerService = new AnswerService();

  public async createTest(data: CreateTestPayload): Promise<ServiceResponse> {
    const { questions, ...testData } = data as unknown as CreateTestPayload;

    const newTest = await this.testRepository.create(testData as Partial<ITest>);

    for (const q of questions) {
      const createdQuestion = await this.questionService.createQuestion({
        questionText: q.questionText,
        options: q.options,
        topicId: q.topicId as any,
        difficultyLevel: (q.difficultyLevel || (testData as any).difficultyLevel) as any,
        organizationId: (testData as any).organizationId as any,
        testId: (newTest as any)._id,
      });

      await this.answerService.createAnswer({
        questionId: (createdQuestion as any)._id,
        correctAnswer: q.correctAnswer,
      } as any);
    }

    return {
      success: true,
      message: Messages.TEST_CREATED_SUCCESS,
      data: newTest,
    };
  }

  public async getTestsBySubject(subjectId: string): Promise<ServiceResponse> {
    const tests = await this.testRepository.findBySubjectId(subjectId);
    return {
      success: true,
      message: Messages.TEST_FETCH_SUCCESS,
      data: tests,
    };
  }

  public async getTestsByTopic(topicId: string): Promise<ServiceResponse> {
    const tests = await this.testRepository.findByTopicId(topicId);
    return {
      success: true,
      message: Messages.TEST_FETCH_SUCCESS,
      data: tests,
    };
  }

  public async getTestsByJob(jobId: string): Promise<ServiceResponse> {
    const tests = await this.testRepository.findByJobId(jobId);
    return {
      success: true,
      message: Messages.TEST_FETCH_SUCCESS,
      data: tests,
    };
  }

  public async getTestById(testId: string): Promise<ServiceResponse> {
    const test = await this.testRepository.findById(testId);
    if (!test) {
      return {
        success: false,
        message: Messages.TEST_NOT_FOUND || 'Test not found',
        data: null,
      };
    }

    const questions = await this.questionService.getQuestionsByTestId(testId);
    const questionIds = questions.map((q: any) => String(q._id));
    const answers = questionIds.length
      ? await this.answerService.getAnswersByQuestionIds(questionIds)
      : [];

    const answersByQuestionId = new Map<string, any>();
    (answers as any[]).forEach((a: any) => {
      answersByQuestionId.set(String(a.questionId), a);
    });

    const assembled = {
      test,
      questions: (questions as any[]).map((q: any) => ({
        ...q.toObject?.() ?? q,
        answer: answersByQuestionId.get(String(q._id)) || null,
      })),
    };

    return {
      success: true,
      message: Messages.TEST_FETCH_SUCCESS,
      data: assembled,
    };
  }

  public async updateTest(testId: string, data: any): Promise<ServiceResponse> {
    const { questions, ...testUpdate } = data || {};

    const updatedTest = await this.testRepository.update(testId, testUpdate);
    if (!updatedTest) {
      return {
        success: false,
        message: Messages.TEST_NOT_FOUND,
        data: null,
      };
    }

    const existingQuestions = await this.questionService.getQuestionsByTestId(testId);
    const existingMap = new Map<string, any>();
    (existingQuestions as any[]).forEach((q: any) => existingMap.set(String(q._id), q));

    const incoming = Array.isArray(questions) ? questions : [];
    const seenIds = new Set<string>();

    for (const q of incoming) {
      const qId = q._id || q.id;
      if (qId && existingMap.has(String(qId))) {
        // update question
        await this.questionService.updateQuestion(String(qId), {
          questionText: q.questionText || q.question,
          options: q.options,
          topicId: q.topicId,
          difficultyLevel: q.difficultyLevel || updatedTest.difficultyLevel,
        });

        // upsert answer
        const existingAnswer = await this.answerService.getAnswerByQuestionId(String(qId));
        if (existingAnswer) {
          await this.answerService.updateAnswer(String((existingAnswer as any)._id), { correctAnswer: q.correctAnswer } as any);
        } else {
          await this.answerService.createAnswer({ questionId: qId as any, correctAnswer: q.correctAnswer } as any);
        }

        seenIds.add(String(qId));
      } else {
        // create question
        const createdQuestion = await this.questionService.createQuestion({
          questionText: q.questionText || q.question,
          options: q.options,
          topicId: q.topicId as any,
          difficultyLevel: (q.difficultyLevel || updatedTest.difficultyLevel) as any,
          organizationId: (updatedTest as any).organizationId as any,
          testId: (updatedTest as any)._id,
        });

        await this.answerService.createAnswer({
          questionId: (createdQuestion as any)._id,
          correctAnswer: q.correctAnswer,
        } as any);
      }
    }

    // delete removed questions (and their answers)
    for (const [id] of existingMap.entries()) {
      if (!seenIds.has(id)) {
        await this.answerService.deleteByQuestionId(id);
        await this.questionService.deleteQuestion(id);
      }
    }

    return this.getTestById(testId);
  }

  public async deleteTest(testId: string): Promise<ServiceResponse> {
    const test = await this.testRepository.findById(testId);
    if (!test) {
      return {
        success: false,
        message: Messages.TEST_NOT_FOUND,
        data: null,
      };
    }

    const questions = await this.questionService.getQuestionsByTestId(testId);
    for (const q of questions as any[]) {
      await this.answerService.deleteByQuestionId(String((q as any)._id));
      await this.questionService.deleteQuestion(String((q as any)._id));
    }

    await this.testRepository.delete(testId);
    return {
      success: true,
      message: Messages.TEST_DELETED_SUCCESS || 'Test deleted successfully',
      data: null,
    };
  }
}


