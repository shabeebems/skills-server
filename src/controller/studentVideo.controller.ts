import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { StudentVideoService } from "../services/studentVideo.service";

export class StudentVideoController {
  private studentVideoService = new StudentVideoService();

  public createStudentVideo = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.studentVideoService.createStudentVideo((req as any).user?._id, req.body)
    );

  public getStudentVideos = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.studentVideoService.getStudentVideosBySkillPlannerAndTopic(
        req.query.skillPlannerId as string,
        req.query.topicId as string
      )
    );
}

