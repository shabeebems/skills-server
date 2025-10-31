import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { TopicService } from "../services/topic.service";

export class TopicController {
  private topicService = new TopicService();

  public createTopic = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.topicService.createTopic(req.body));

  public getTopicsByOrganization = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.topicService.getTopicsByOrganization(req.params.organizationId));

  public getTopicsByJob = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.topicService.getTopicsByJob(req.params.jobId));

  public getTopicsBySubject = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.topicService.getTopicsBySubject(req.params.subjectId));

  public deleteTopic = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.topicService.deleteTopic(req.params.topicId));
}
