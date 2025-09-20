import { Request, Response } from "express";
import { OrganizationService } from "../services/organization.service";
import { handleRequest } from "../utils/handle-request.util";

export class OrganizationController {
  private organizationService = new OrganizationService();

  public createOrganization = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.organizationService.createOrganization(req.body));

  public getOrganizations = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.organizationService.getOrganizations());
}
