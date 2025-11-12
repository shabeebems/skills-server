import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { ReadingModuleService } from "../services/readingModule.service";

export class ReadingModuleController {
  private readingModuleService = new ReadingModuleService();

  public createReadingModule = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.readingModuleService.createReadingModule(req.body)
    );

  public getReadingModuleByJobAndTopic = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.readingModuleService.getReadingModuleByJobAndTopic(
        req.query.jobId as string,
        req.query.topicId as string
      )
    );
}

