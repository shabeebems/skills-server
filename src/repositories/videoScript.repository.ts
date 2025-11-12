import { Types } from "mongoose";
import VideoScriptModel, { IVideoScript } from "../models/videoScript.model";
import { BaseRepository } from "./base.repository";

export class VideoScriptRepository extends BaseRepository<IVideoScript> {
  constructor() {
    super(VideoScriptModel);
  }

  async findBySkillPlannerIdAndTopicIdAndUserIdea(
    skillPlannerId: string,
    topicId: string,
    userIdea: string
  ): Promise<IVideoScript | null> {
    return this.findOne({
      skillPlannerId: new Types.ObjectId(skillPlannerId),
      topicId: new Types.ObjectId(topicId),
      userIdea: { $regex: new RegExp(`^${userIdea.trim()}$`, "i") },
    } as any);
  }

  async findBySkillPlannerIdAndTopicId(
    skillPlannerId: string,
    topicId: string
  ): Promise<IVideoScript[]> {
    return this.find({
      skillPlannerId: new Types.ObjectId(skillPlannerId),
      topicId: new Types.ObjectId(topicId),
    } as any);
  }
}

