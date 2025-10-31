import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { TestService } from "../services/test.service";

export class TestController {
  private testService = new TestService();

  public createTest = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.createTest(req.body));

  public getTestsBySubject = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.getTestsBySubject(req.params.subjectId));

  public getTestById = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.getTestById(req.params.testId));

  public updateTest = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.updateTest(req.params.testId, req.body));

  public getTestsByTopic = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.getTestsByTopic(req.params.topicId));

  public deleteTest = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.deleteTest(req.params.testId));

  public getTestsByJob = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.testService.getTestsByJob(req.params.jobId));
}


