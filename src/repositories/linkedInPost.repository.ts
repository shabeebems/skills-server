import { Types } from "mongoose";
import LinkedInPostModel, { ILinkedInPost } from "../models/linkedInPost.model";
import { BaseRepository } from "./base.repository";

export class LinkedInPostRepository extends BaseRepository<ILinkedInPost> {
  constructor() {
    super(LinkedInPostModel);
  }

  async findBySkillPlannerIdAndTopicId(
    skillPlannerId: string,
    topicId: string
  ): Promise<ILinkedInPost[]> {
    return this.find({
      skillPlannerId: new Types.ObjectId(skillPlannerId),
      topicId: new Types.ObjectId(topicId),
    } as any);
  }
}

