import { RecordingRepository } from "../repositories/recording.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IRecording } from "../models/recording.model";

export class RecordingService {
  private recordingRepository = new RecordingRepository();

  public async createRecording(data: {
    name: string;
    link: string;
    description?: string;
    duration: string;
    topicId: string;
    subjectId: string;
  }): Promise<ServiceResponse> {
    // Map subjectId to subId to match the model
    const recordingData: Partial<IRecording> = {
      name: data.name,
      link: data.link,
      description: data.description,
      duration: data.duration,
      topicId: data.topicId as any,
      subId: data.subjectId as any,
    };

    const newRecording = await this.recordingRepository.create(recordingData);
    return {
      success: true,
      message: Messages.RECORDING_CREATED_SUCCESS,
      data: newRecording,
    };
  }

  public async getRecordingsBySubjectIdAndTopicId(
    subjectId: string,
    topicId: string
  ): Promise<ServiceResponse> {
    const recordings = await this.recordingRepository.findBySubjectIdAndTopicId(
      subjectId,
      topicId
    );

    return {
      success: true,
      message: Messages.RECORDING_FETCH_SUCCESS,
      data: recordings,
    };
  }

  public async getRecordingsByTopicIds(
    topicIds: string[] | string | undefined
  ): Promise<ServiceResponse> {
    const ids = Array.isArray(topicIds) ? topicIds : topicIds ? [topicIds] : [];
    
    if (ids.length === 0) {
      return {
        success: true,
        message: Messages.RECORDING_FETCH_SUCCESS,
        data: [],
      };
    }

    const recordings = await this.recordingRepository.findByTopicIds(ids);

    return {
      success: true,
      message: Messages.RECORDING_FETCH_SUCCESS,
      data: recordings,
    };
  }

  public async deleteRecording(recordingId: string): Promise<ServiceResponse> {
    const deleted = await this.recordingRepository.delete(recordingId);
    if (!deleted) {
      return {
        success: false,
        message: Messages.RECORDING_NOT_FOUND,
        data: null,
      };
    }
    return {
      success: true,
      message: Messages.RECORDING_DELETED_SUCCESS,
      data: deleted,
    };
  }
}

