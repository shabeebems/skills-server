import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { StudentTestHistoryService } from "../services/studentTestHistory.service";

export class StudentTestHistoryController {
  private studentTestHistoryService = new StudentTestHistoryService();

  public getStudentTestHistoryBySubject = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.studentTestHistoryService.getStudentTestHistoryBySubject(
        req.params.subjectId,
        req.query.studentId,
        req.query.organizationId,
        req.query.topicId
      )
    );

  public getStudentTestHistoryByJob = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.studentTestHistoryService.getStudentTestHistoryByJob(
        req.params.jobId,
        req.query.studentId,
        req.query.organizationId,
        req.query.topicId
      )
    );

  public completeTest = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.studentTestHistoryService.completeTest(
        req.params.studentTestHistoryId,
        req.body.answers,
        req.body.score,
        req.body.correctAnswers,
        req.body.totalQuestions
      )
    );

  public getStudentTestHistoryById = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.studentTestHistoryService.getStudentTestHistoryById(req.params.studentTestHistoryId)
    );
}

