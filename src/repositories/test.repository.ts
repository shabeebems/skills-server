import TestModel, { ITest } from "../models/test.model";
import { BaseRepository } from "./base.repository";

export class TestRepository extends BaseRepository<ITest> {
  constructor() {
    super(TestModel);
  }

  async findBySubjectId(subjectId: string) {
    return this.find({
      subjectId,
      $or: [
        { topicId: { $exists: false } },
        { topicId: null },
      ],
    } as any);
  }

  async findByTopicId(topicId: string) {
    return this.find({ topicId } as any);
  }

  async findByJobId(jobId: string) {
    return this.find({
      jobId,
      $or: [
        { topicId: { $exists: false } },
        { topicId: null },
      ],
    } as any);
  }
}


