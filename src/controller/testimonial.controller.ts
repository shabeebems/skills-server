import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { TestimonialService } from "../services/testimonial.service";

export class TestimonialController {
  private testimonialService = new TestimonialService();

  public createTestimonial = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.testimonialService.createTestimonial((req as any).user?._id, req.body)
    );

  public getTestimonials = (req: Request, res: Response): Promise<void> =>
    handleRequest(
      res,
      () => this.testimonialService.getTestimonialsBySkillPlannerAndTopic(
        req.query.skillPlannerId as string,
        req.query.topicId as string
      )
    );
}

