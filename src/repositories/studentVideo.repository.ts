import { Types } from "mongoose";
import StudentVideoModel, { IStudentVideo } from "../models/studentVideo.model";
import { BaseRepository } from "./base.repository";

export class StudentVideoRepository extends BaseRepository<IStudentVideo> {
  constructor() {
    super(StudentVideoModel);
  }

  async findBySkillPlannerIdAndTopicId(
    skillPlannerId: string,
    topicId: string
  ): Promise<IStudentVideo[]> {
    return this.find({
      skillPlannerId: new Types.ObjectId(skillPlannerId),
      topicId: new Types.ObjectId(topicId),
    } as any);
  }
}

