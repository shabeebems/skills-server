import { Types } from "mongoose";
import { VideoScriptRepository } from "../repositories/videoScript.repository";
import { VideoScriptSectionRepository } from "../repositories/videoScriptSection.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { IVideoScript } from "../models/videoScript.model";

export class VideoScriptService {
  private videoScriptRepository = new VideoScriptRepository();
  private videoScriptSectionRepository = new VideoScriptSectionRepository();

  public async createVideoScript(
    studentId: string | undefined,
    data: {
      jobId: string;
      topicId: string;
      skillPlannerId: string;
      userIdea: string;
      selectedLength: string;
      sections: Array<{ time: string; title: string; content: string }>;
    }
  ): Promise<ServiceResponse> {
    if (!studentId || !data.jobId || !data.topicId || !data.skillPlannerId || !data.userIdea) {
      return {
        success: false,
        message: "studentId, jobId, topicId, skillPlannerId, and userIdea are required",
        data: null,
      };
    }

    try {
      // Check if video script already exists with same skillPlannerId, topicId, and userIdea
      const existingScript = await this.videoScriptRepository.findBySkillPlannerIdAndTopicIdAndUserIdea(
        data.skillPlannerId,
        data.topicId,
        data.userIdea
      );

      if (existingScript) {
        return {
          success: false,
          message: "Video script with this idea already exists for this skill and topic",
          data: existingScript,
        };
      }

      // Create video script
      const videoScript = await this.videoScriptRepository.create({
        studentId: new Types.ObjectId(studentId) as any,
        jobId: new Types.ObjectId(data.jobId) as any,
        topicId: new Types.ObjectId(data.topicId) as any,
        skillPlannerId: new Types.ObjectId(data.skillPlannerId) as any,
        userIdea: data.userIdea.trim(),
        selectedLength: data.selectedLength,
      } as Partial<IVideoScript>);

      // Create sections
      if (data.sections && data.sections.length > 0) {
        const sectionsToCreate = data.sections.map((section, index) => ({
          videoScriptId: new Types.ObjectId(String(videoScript._id)) as any,
          time: section.time,
          title: section.title.trim(),
          content: section.content,
          order: index,
        }));

        await this.videoScriptSectionRepository.createMany(sectionsToCreate);
      }

      return {
        success: true,
        message: Messages.VIDEO_SCRIPT_CREATED_SUCCESS || "Video script created successfully",
        data: videoScript,
      };
    } catch (error) {
      console.error("Error creating video script:", error);
      return {
        success: false,
        message: "Failed to create video script",
        data: null,
      };
    }
  }

  public async getVideoScriptsBySkillPlannerAndTopic(
    skillPlannerId: string,
    topicId: string
  ): Promise<ServiceResponse> {
    if (!skillPlannerId || !topicId) {
      return {
        success: false,
        message: "skillPlannerId and topicId are required",
        data: null,
      };
    }

    try {
      const videoScripts = await this.videoScriptRepository.findBySkillPlannerIdAndTopicId(
        skillPlannerId,
        topicId
      );

      return {
        success: true,
        message: Messages.VIDEO_SCRIPT_FETCH_SUCCESS || "Video scripts fetched successfully",
        data: videoScripts,
      };
    } catch (error) {
      console.error("Error fetching video scripts:", error);
      return {
        success: false,
        message: "Failed to fetch video scripts",
        data: null,
      };
    }
  }

  public async getVideoScriptSections(videoScriptId: string): Promise<ServiceResponse> {
    if (!videoScriptId) {
      return {
        success: false,
        message: "videoScriptId is required",
        data: null,
      };
    }

    try {
      const sections = await this.videoScriptSectionRepository.findByVideoScriptId(videoScriptId);

      // Sort by order
      const sortedSections = sections.sort((a, b) => a.order - b.order);

      return {
        success: true,
        message: Messages.VIDEO_SCRIPT_SECTIONS_FETCH_SUCCESS || "Video script sections fetched successfully",
        data: sortedSections,
      };
    } catch (error) {
      console.error("Error fetching video script sections:", error);
      return {
        success: false,
        message: "Failed to fetch video script sections",
        data: null,
      };
    }
  }
}

