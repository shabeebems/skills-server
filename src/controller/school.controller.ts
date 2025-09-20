import { Request, Response } from "express";
import { SchoolService } from "../services/schools.service";
import { handleRequest } from "../utils/handle-request.util";

export class SchoolController {
  private schoolService = new SchoolService();

  public createSchool = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.schoolService.createSchool(req.body));

  public getSchools = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.schoolService.getSchools());
}
