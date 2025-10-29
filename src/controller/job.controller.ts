import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { JobService } from "../services/job.service";

export class JobController {
  private jobService = new JobService();

  public createJob = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.jobService.createJob(req.body));

  public getJobsByOrganization = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () =>
        this.jobService.getJobsByOrganization(
          req.params.organizationId,
          req.query?.departmentId as string | undefined
        )
    );

  public getJobById = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.jobService.getJobById(req.params.jobId));
}
