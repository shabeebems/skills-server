import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { LinkedInPostService } from "../services/linkedInPost.service";

export class LinkedInPostController {
  private linkedInPostService = new LinkedInPostService();

  public createLinkedInPost = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.linkedInPostService.createLinkedInPost((req as any).user?._id, req.body)
    );

  public getLinkedInPosts = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.linkedInPostService.getLinkedInPostsBySkillPlannerAndTopic(
        req.query.skillPlannerId as string,
        req.query.topicId as string
      )
    );
}

