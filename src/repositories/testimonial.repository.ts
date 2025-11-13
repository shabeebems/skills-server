import { Types } from "mongoose";
import TestimonialModel, { ITestimonial } from "../models/testimonial.model";
import { BaseRepository } from "./base.repository";

export class TestimonialRepository extends BaseRepository<ITestimonial> {
  constructor() {
    super(TestimonialModel);
  }

  async findBySkillPlannerIdAndTopicId(
    skillPlannerId: string,
    topicId: string
  ): Promise<ITestimonial[]> {
    return this.find({
      skillPlannerId: new Types.ObjectId(skillPlannerId),
      topicId: new Types.ObjectId(topicId),
    } as any);
  }
}

