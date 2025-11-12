import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { SkillPlannerService } from "../services/skillPlanner.service";

export class SkillPlannerController {
  private skillPlannerService = new SkillPlannerService();

  public addJobToSkillPlanner = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.skillPlannerService.addJobToSkillPlanner((req as any).user?._id, req.body.jobId)
    );

  public getSkillPlannerJobs = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.skillPlannerService.getSkillPlannerJobs((req as any).user?._id)
    );
}

