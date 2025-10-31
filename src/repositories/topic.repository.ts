import TopicModel, { ITopic } from "../models/topic.model";
import { BaseRepository } from "./base.repository";

export class TopicRepository extends BaseRepository<ITopic> {
  constructor() {
    super(TopicModel);
  }

  // ✅ Find topics by organizationId and only include documents with a valid subjectId
  async findByOrganizationId(organizationId: string): Promise<ITopic[]> {
    return await TopicModel.find({
      organizationId,
      subjectId: { $exists: true, $ne: null }, // ensures subjectId exists and is not null
    })
      .populate("subjectId", "name _id") // only name and _id
      .populate("departmentId", "name _id") // only name and _id
      .exec();
  }

  // ✅ Find topics by jobId and populate only 'name' and '_id'
  async findByJobId(jobId: string): Promise<ITopic[]> {
    return await TopicModel.find({ jobId })
      .populate("subjectId", "name _id") // only name and _id
      .populate("departmentId", "name _id") // only name and _id
      .exec();
  }

  // ✅ Find topics by subjectId and populate only 'name' and '_id'
  async findBySubjectId(subjectId: string): Promise<ITopic[]> {
    return await TopicModel.find({ subjectId })
      .populate("subjectId", "name _id")
      .populate("departmentId", "name _id")
      .exec();
  }

  // Find topic by name and subjectId
  async findByNameAndSubjectId(
    name: string,
    subjectId: string
  ): Promise<ITopic | null> {
    return await TopicModel.findOne({ name, subjectId }).exec();
  }

  // Find topic by name and jobId
  async findByNameAndJobId(
    name: string,
    jobId: string
  ): Promise<ITopic | null> {
    return await TopicModel.findOne({ name, jobId }).exec();
  }
}
