import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { CertificateService } from "../services/certificate.service";

export class CertificateController {
  private certificateService = new CertificateService();

  public createCertificate = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.certificateService.createCertificate((req as any).user?._id, req.body)
    );

  public getCertificates = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.certificateService.getCertificatesBySkillPlannerAndTopic(
        req.query.skillPlannerId as string,
        req.query.topicId as string
      )
    );
}

