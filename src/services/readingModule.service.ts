import { Types } from "mongoose";
import { ReadingModuleRepository } from "../repositories/readingModule.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { IReadingModule } from "../models/readingModule.model";

export class ReadingModuleService {
  private readingModuleRepository = new ReadingModuleRepository();

  public async createReadingModule(
    data: {
      jobId: string;
      topicId: string;
      skillName: string;
      jobContext: string;
      introduction: string;
      keyConcepts: Array<{ title: string; content: string }>;
      practicalExample: string;
      summary: string[];
    }
  ): Promise<ServiceResponse> {
    if (!data.jobId || !data.topicId) {
      return {
        success: false,
        message: "jobId and topicId are required",
        data: null,
      };
    }

    try {
      // Check if reading module already exists for this job and topic
      const existingModule = await this.readingModuleRepository.findByJobIdAndTopicId(
        data.jobId,
        data.topicId
      );

      if (existingModule) {
        return {
          success: false,
          message: "Reading module already exists for this job and topic",
          data: existingModule,
        };
      }

      const readingModule = await this.readingModuleRepository.create({
        jobId: new Types.ObjectId(data.jobId) as any,
        topicId: new Types.ObjectId(data.topicId) as any,
        skillName: data.skillName,
        jobContext: data.jobContext,
        introduction: data.introduction,
        keyConcepts: data.keyConcepts,
        practicalExample: data.practicalExample,
        summary: data.summary,
      } as Partial<IReadingModule>);

      return {
        success: true,
        message: Messages.READING_MODULE_CREATED_SUCCESS || "Reading module created successfully",
        data: readingModule,
      };
    } catch (error) {
      console.error("Error creating reading module:", error);
      return {
        success: false,
        message: "Failed to create reading module",
        data: null,
      };
    }
  }

  public async getReadingModuleByJobAndTopic(
    jobId: string,
    topicId: string
  ): Promise<ServiceResponse> {
    if (!jobId || !topicId) {
      return {
        success: false,
        message: "jobId and topicId are required",
        data: null,
      };
    }

    try {
      const readingModule = await this.readingModuleRepository.findByJobIdAndTopicId(jobId, topicId);

      if (!readingModule) {
        return {
          success: false,
          message: "Reading module not found",
          data: null,
        };
      }

      return {
        success: true,
        message: Messages.READING_MODULE_FETCH_SUCCESS || "Reading module fetched successfully",
        data: readingModule,
      };
    } catch (error) {
      console.error("Error fetching reading module:", error);
      return {
        success: false,
        message: "Failed to fetch reading module",
        data: null,
      };
    }
  }
}

