import { TopicRepository } from "../repositories/topic.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { ITopic } from "../models/topic.model";

export class TopicService {
  private topicRepository = new TopicRepository();

  public async createTopic(data: ITopic): Promise<ServiceResponse> {
    const newTopic = await this.topicRepository.create(data);
    return {
      success: true,
      message: Messages.TOPIC_CREATED_SUCCESS,
      data: newTopic,
    };
  }
}
