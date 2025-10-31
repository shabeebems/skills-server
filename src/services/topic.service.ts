import { TopicRepository } from "../repositories/topic.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { ITopic } from "../models/topic.model";
import { formatTopicsOutput } from "../views/topic.view";

export class TopicService {
  private topicRepository = new TopicRepository();

  public async createTopic(data: ITopic): Promise<ServiceResponse> {
    let existingTopic: ITopic | null = null;

    if (data.subjectId) {
      existingTopic = await this.topicRepository.findByNameAndSubjectId(data.name, String(data.subjectId));
    }
    
    if (data.jobId) {
      existingTopic = await this.topicRepository.findByNameAndJobId(data.name, String(data.jobId));
    }

    if (existingTopic) {
      return {
        success: false,
        message: Messages.TOPIC_ALREADY_EXISTS,
        data: null,
      };
    }

    const newTopic = await this.topicRepository.create(data);
    return {
      success: true,
      message: Messages.TOPIC_CREATED_SUCCESS,
      data: newTopic,
    };
  }

  public async getTopicsByOrganization(organizationId: string): Promise<ServiceResponse> {
    const topics = await this.topicRepository.findByOrganizationId(organizationId);
    return {
      success: true,
      message: Messages.TOPIC_FETCH_SUCCESS,
      data: formatTopicsOutput(topics),
    };
  }

  public async getTopicsByJob(jobId: string): Promise<ServiceResponse> {
    const topics = await this.topicRepository.findByJobId(jobId);
    return {
      success: true,
      message: Messages.TOPIC_FETCH_SUCCESS,
      data: formatTopicsOutput(topics),
    };
  }

  public async getTopicsBySubject(subjectId: string): Promise<ServiceResponse> {
    const topics = await this.topicRepository.findBySubjectId(subjectId);
    return {
      success: true,
      message: Messages.TOPIC_FETCH_SUCCESS,
      data: formatTopicsOutput(topics),
    };
  }

  public async deleteTopic(topicId: string): Promise<ServiceResponse> {
    const deletedTopic = await this.topicRepository.delete(topicId);
    
    if (!deletedTopic) {
      return {
        success: false,
        message: Messages.TOPIC_NOT_FOUND,
        data: null,
      };
    }

    return {
      success: true,
      message: Messages.TOPIC_DELETED_SUCCESS,
      data: deletedTopic,
    };
  }
}
