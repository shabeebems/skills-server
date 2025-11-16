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
    subjectId: string | undefined,
    studentId: string,
    organizationId: string,
    topicId?: string,
    jobId?: string
  ): Promise<void> {
    try {
      // Get all tests for the subject, topic, job, or job topic
      let testsResponse: ServiceResponse;
      if (jobId && topicId) {
        // Job topic-level tests
        testsResponse = await this.testService.getTestsByTopic(topicId);
        // Filter to only include tests that belong to the job
        const allTests = (testsResponse.data as any[]) || [];
        const jobObjectId = new Types.ObjectId(jobId);
        const tests = allTests.filter((test: any) => 
          test.jobId && String(test.jobId) === String(jobObjectId)
        );
        testsResponse = { ...testsResponse, data: tests };
      } else if (jobId) {
        // Job-level tests
        testsResponse = await this.testService.getTestsByJob(jobId);
      } else if (topicId) {
        // Subject topic-level tests
        testsResponse = await this.testService.getTestsByTopic(topicId);
        // Filter to only include tests that belong to the subject
        const allTests = (testsResponse.data as any[]) || [];
        const subjectObjectId = new Types.ObjectId(subjectId!);
        const tests = allTests.filter((test: any) => 
          test.subjectId && String(test.subjectId) === String(subjectObjectId)
        );
        testsResponse = { ...testsResponse, data: tests };
      } else if (subjectId) {
        // Subject-level tests
        testsResponse = await this.testService.getTestsBySubject(subjectId);
      } else {
        return;
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

  public async getStudentTestHistoryByJob(
    jobId: string,
    studentId: string | undefined,
    organizationId: string | undefined,
    topicId?: string
  ): Promise<ServiceResponse> {
    try {
      if (!jobId || !studentId || !organizationId) {
        return {
          success: false,
          message: "jobId, studentId, and organizationId are required",
          data: null,
        };
      }

      // First, ensure all test history records exist
      await this.ensureStudentTestHistoryRecords(undefined, studentId, organizationId, topicId, jobId);

      // Then fetch the student test history
      let studentTestHistory;
      if (topicId) {
        studentTestHistory = await this.studentTestHistoryRepository.findByJobTopicIdAndStudentId(
          topicId,
          studentId
        );
      } else {
        studentTestHistory = await this.studentTestHistoryRepository.findByJobIdAndStudentId(
          jobId,
          studentId
        );
      }
      
      return {
        success: true,
        message: Messages.TEST_FETCH_SUCCESS || "Student test history fetched successfully",
        data: formatStudentTestHistoryResponse(studentTestHistory),
      };
    } catch (error) {
      console.error("Error fetching student test history by job:", error);
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
          topic: (q as any).topicId?.name || 'General',
          topicId: (q as any).topicId?._id ? String((q as any).topicId._id) : (q.topicId ? String(q.topicId) : null),
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

  public async getTopicAverageScore(
    jobId: string,
    topicId: string,
    studentId: string,
    organizationId: string
  ): Promise<ServiceResponse> {
    try {
      if (!jobId || !topicId || !studentId || !organizationId) {
        return {
          success: false,
          message: "jobId, topicId, studentId, and organizationId are required",
          data: null,
        };
      }

      // Get all completed test histories for this topic in this job
      const studentTestHistory = await this.studentTestHistoryRepository.findByJobTopicIdAndStudentId(
        topicId,
        studentId
      );

      // Filter only completed tests with scores
      const completedTests = (studentTestHistory as any[]).filter(
        (test: any) => test.status === "Completed" && test.score !== null && test.score !== undefined
      );

      if (completedTests.length === 0) {
        return {
          success: true,
          message: "No completed tests found for this topic",
          data: {
            averageScore: null,
            totalTests: 0,
            completedTests: 0,
          },
        };
      }

      // Calculate average score
      const totalScore = completedTests.reduce((sum: number, test: any) => sum + (test.score || 0), 0);
      const averageScore = Math.round((totalScore / completedTests.length) * 100) / 100; // Round to 2 decimal places

      return {
        success: true,
        message: "Topic average score calculated successfully",
        data: {
          averageScore,
          totalTests: completedTests.length,
          completedTests: completedTests.length,
        },
      };
    } catch (error) {
      console.error("Error calculating topic average score:", error);
      return {
        success: false,
        message: "Failed to calculate topic average score",
        data: null,
      };
    }
  }
}

