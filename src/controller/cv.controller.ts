import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { CVProfileService } from "../services/cv/cvProfile.service";
import { CVEducationService } from "../services/cv/cvEducation.service";
import { CVExperienceService } from "../services/cv/cvExperience.service";

export class CVController {
  private cvProfileService = new CVProfileService();
  private cvEducationService = new CVEducationService();
  private cvExperienceService = new CVExperienceService();

  // Profile methods
  public getCVProfile = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvProfileService.getCVProfileByUserId(req.user._id.toString())
    );

  public createOrUpdateCVProfile = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvProfileService.createOrUpdateCVProfile(
        req.user._id.toString(),
        req.body
      )
    );

  // Education methods
  public getCVEducation = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvEducationService.getCVEducationByUserId(req.user._id.toString())
    );

  public createCVEducation = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvEducationService.createCVEducation(
        req.user._id.toString(),
        req.body
      )
    );

  public updateCVEducation = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvEducationService.updateCVEducation(req.params.id, req.body)
    );

  public deleteCVEducation = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvEducationService.deleteCVEducation(req.params.id)
    );

  // Experience methods
  public getCVExperience = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvExperienceService.getCVExperienceByUserId(req.user._id.toString())
    );

  public createCVExperience = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvExperienceService.createCVExperience(
        req.user._id.toString(),
        req.body
      )
    );

  public updateCVExperience = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvExperienceService.updateCVExperience(req.params.id, req.body)
    );

  public deleteCVExperience = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () =>
      this.cvExperienceService.deleteCVExperience(req.params.id)
    );
}

