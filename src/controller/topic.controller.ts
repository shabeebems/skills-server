import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { TopicService } from "../services/topic.service";

export class TopicController {
  private topicService = new TopicService();

  public createTopic = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.topicService.createTopic(req.body));
}
