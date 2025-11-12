import ReadingModuleModel, { IReadingModule } from "../models/readingModule.model";
import { BaseRepository } from "./base.repository";

export class ReadingModuleRepository extends BaseRepository<IReadingModule> {
  constructor() {
    super(ReadingModuleModel);
  }

  async findByJobIdAndTopicId(jobId: string, topicId: string): Promise<IReadingModule | null> {
    return this.findOne({ jobId, topicId } as any);
  }
}

