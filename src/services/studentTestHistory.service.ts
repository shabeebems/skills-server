import { Types } from "mongoose";
import { StudentTestHistoryRepository } from "../repositories/studentTestHistory.repository";
import { StudentAnswerHistoryRepository } from "../repositories/studentAnswerHistory.repository";
import { TestService } from "./test.service";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { formatStudentTestHistoryResponse } from "../schemas/studentTestHistory.schema";

export class StudentTestHistoryService {
  private studentTestHistoryRepository = new StudentTestHistoryRepository();
  private studentAnswerHistoryRepository = new StudentAnswerHistoryRepository();
  private testService = new TestService();

  private async ensureStudentTestHistoryRecords(
    subjectId: string,
    studentId: string,
    organizationId: string,
    topicId?: string
  ): Promise<void> {
    try {
      // Get all tests for the subject or topic
      let testsResponse: ServiceResponse;
      if (topicId) {
        testsResponse = await this.testService.getTestsByTopic(topicId);
      } else {
        testsResponse = await this.testService.getTestsBySubject(subjectId);
      }
      const tests = (testsResponse.data as any[]) || [];

      if (tests.length === 0) {
        return;
      }

      // Get all testIds (these are already ObjectIds from mongoose)
      const testIds = tests.map((test: any) => test._id);

      // Convert studentId to ObjectId for query
      const studentObjectId = new Types.ObjectId(studentId);

      // Check which testIds already have student test history records
      const existingHistory = await this.studentTestHistoryRepository.find({
        studentId: studentObjectId,
        testId: { $in: testIds },
      } as any);

      const existingTestIds = new Set(
        existingHistory.map((history: any) => String(history.testId))
      );

      // Find testIds that don't have history records
      const missingTestIds = testIds.filter(
        (testId: any) => !existingTestIds.has(String(testId))
      );

      // Create missing records
      if (missingTestIds.length > 0) {
        const recordsToCreate = missingTestIds.map((testId: any) => ({
          studentId: studentObjectId,
          testId: testId, // Already an ObjectId
          organizationId: new Types.ObjectId(organizationId),
          status: "Pending" as const,
        }));

        await Promise.all(
          recordsToCreate.map((record) =>
            this.studentTestHistoryRepository.create(record as any)
          )
        );
      }
    } catch (error) {
      console.error("Error ensuring student test history records:", error);
      // Don't throw, just log the error
    }
  }

  public async getStudentTestHistoryBySubject(
    subjectId: string,
    studentId: string | undefined,
    organizationId: string | undefined,
    topicId?: string
  ): Promise<ServiceResponse> {
    try {
      if (!subjectId || !studentId || !organizationId) {
        return {
          success: false,
          message: "subjectId, studentId, and organizationId are required",
          data: null,
        };
      }

      // First, ensure all test history records exist
      await this.ensureStudentTestHistoryRecords(subjectId, studentId, organizationId, topicId);

      // Then fetch the student test history
      let studentTestHistory;
      if (topicId) {
        studentTestHistory = await this.studentTestHistoryRepository.findByTopicIdAndStudentId(
          topicId,
          studentId
        );
      } else {
        studentTestHistory = await this.studentTestHistoryRepository.findBySubjectIdAndStudentId(
          subjectId,
          studentId
        );
      }
      
      return {
        success: true,
        message: Messages.TEST_FETCH_SUCCESS || "Student test history fetched successfully",
        data: formatStudentTestHistoryResponse(studentTestHistory),
      };
    } catch (error) {
      console.error("Error fetching student test history by subject:", error);
      return {
        success: false,
        message: "Failed to fetch student test history",
        data: null,
      };
    }
  }

  public async completeTest(
    studentTestHistoryId: string,
    answers: Array<{ questionId: string; selectedAnswer: string; isCorrect: boolean }>,
    score: number,
    correctAnswers: number,
    totalQuestions: number
  ): Promise<ServiceResponse> {
    try {
      // Update student test history
      const updatedHistory = await this.studentTestHistoryRepository.update(
        studentTestHistoryId,
        {
          status: "Completed",
          score,
          correctAnswers,
          totalQuestions,
          completedAt: new Date(),
        } as any
      );

      if (!updatedHistory) {
        return {
          success: false,
          message: "Student test history not found",
          data: null,
        };
      }

      // Save all answers to studentAnswerHistory
      const answerRecords = answers.map((answer) => ({
        studentTestId: new Types.ObjectId(studentTestHistoryId) as any,
        questionId: new Types.ObjectId(answer.questionId) as any,
        selectedAnswer: answer.selectedAnswer,
        isCorrect: answer.isCorrect,
      }));

      await this.studentAnswerHistoryRepository.createMany(answerRecords as any);

      return {
        success: true,
        message: "Test completed successfully",
        data: updatedHistory,
      };
    } catch (error) {
      console.error("Error completing test:", error);
      return {
        success: false,
        message: "Failed to complete test",
        data: null,
      };
    }
  }

  public async getStudentTestHistoryById(studentTestHistoryId: string): Promise<ServiceResponse> {
    try {
      // Get student test history
      const studentTestHistory = await this.studentTestHistoryRepository.findById(studentTestHistoryId);
      
      if (!studentTestHistory) {
        return {
          success: false,
          message: "Student test history not found",
          data: null,
        };
      }

      const testId = String((studentTestHistory as any).testId);
      
      // Get test details
      const testResponse = await this.testService.getTestById(testId);
      if (!testResponse.success || !testResponse.data) {
        return {
          success: false,
          message: "Test not found",
          data: null,
        };
      }

      const testData = testResponse.data as any;
      const questions = (testData?.questions || []) as any[];

      // Get student answers
      const studentAnswers = await this.studentAnswerHistoryRepository.findByStudentTestId(studentTestHistoryId);
      const answersByQuestionId = new Map<string, any>();
      (studentAnswers as any[]).forEach((answer: any) => {
        answersByQuestionId.set(String(answer.questionId), answer);
      });

      // Transform questions with student answers
      const questionsWithAnswers = questions.map((q) => {
        const studentAnswer = answersByQuestionId.get(String(q._id));
        const correctAnswer = q.answer?.correctAnswer || '';
        const correctAnswerIndex = q.options?.findIndex((opt: string) => opt === correctAnswer) ?? -1;
        
        return {
          _id: q._id,
          id: String(q._id),
          question: q.questionText || '',
          questionText: q.questionText || '',
          options: q.options || [],
          correctAnswer: correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
          correctAnswerText: correctAnswer,
          topic: q.topicId?.name || 'General',
          studentAnswer: studentAnswer ? {
            selectedAnswer: studentAnswer.selectedAnswer,
            isCorrect: studentAnswer.isCorrect,
          } : null,
        };
      });

      return {
        success: true,
        message: "Student test history fetched successfully",
        data: {
          ...(studentTestHistory as any).toObject?.() ?? studentTestHistory,
          test: testData?.test,
          questions: questionsWithAnswers,
        },
      };
    } catch (error) {
      console.error("Error fetching student test history by ID:", error);
      return {
        success: false,
        message: "Failed to fetch student test history",
        data: null,
      };
    }
  }
}

