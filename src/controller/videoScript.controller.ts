import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { VideoScriptService } from "../services/videoScript.service";

export class VideoScriptController {
  private videoScriptService = new VideoScriptService();

  public createVideoScript = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.videoScriptService.createVideoScript((req as any).user?._id, req.body)
    );

  public getVideoScripts = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.videoScriptService.getVideoScriptsBySkillPlannerAndTopic(
        req.query.skillPlannerId as string,
        req.query.topicId as string
      )
    );

  public getVideoScriptSections = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.videoScriptService.getVideoScriptSections(req.params.id)
    );
}

