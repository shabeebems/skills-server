import TopicModel, { ITopic } from "../models/topic.model";
import { BaseRepository } from "./base.repository";

export class TopicRepository extends BaseRepository<ITopic> {
  constructor() {
    super(TopicModel);
  }

  // ✅ Find topics by organizationId and populate only 'name' and '_id'
  async findByOrganizationId(organizationId: string): Promise<ITopic[]> {
    return await TopicModel.find({ organizationId })
      .populate("subjectId", "name _id")      // only name and _id
      .populate("departmentId", "name _id")   // only name and _id
      .exec();
  }

  // Find topic by name and subjectId
  async findByNameAndSubjectId(name: string, subjectId: string): Promise<ITopic | null> {
    return await TopicModel.findOne({ name, subjectId }).exec();
  }
}
