import RecordingModel, { IRecording } from "../models/recording.model";
import { BaseRepository } from "./base.repository";

export class RecordingRepository extends BaseRepository<IRecording> {
  constructor() {
    super(RecordingModel);
  }

  async findBySubjectIdAndTopicId(
    subjectId: string,
    topicId: string
  ): Promise<IRecording[]> {
    return this.model
      .find({
        subId: subjectId,
        topicId: topicId,
      })
      .populate("subId", "name _id")
      .populate("topicId", "name _id")
      .sort({ createdAt: -1 })
      .exec();
  }
}

