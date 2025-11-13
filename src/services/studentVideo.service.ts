import { Types } from "mongoose";
import { StudentVideoRepository } from "../repositories/studentVideo.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { IStudentVideo } from "../models/studentVideo.model";

export class StudentVideoService {
  private studentVideoRepository = new StudentVideoRepository();

  public async createStudentVideo(
    studentId: string | undefined,
    data: {
      jobId: string;
      topicId: string;
      skillPlannerId: string;
      title: string;
      link: string;
      description?: string;
    }
  ): Promise<ServiceResponse> {
    if (!studentId || !data.jobId || !data.topicId || !data.skillPlannerId || !data.title || !data.link) {
      return {
        success: false,
        message: "studentId, jobId, topicId, skillPlannerId, title, and link are required",
        data: null,
      };
    }

    try {
      // Create student video
      const studentVideo = await this.studentVideoRepository.create({
        studentId: new Types.ObjectId(studentId) as any,
        jobId: new Types.ObjectId(data.jobId) as any,
        topicId: new Types.ObjectId(data.topicId) as any,
        skillPlannerId: new Types.ObjectId(data.skillPlannerId) as any,
        title: data.title.trim(),
        link: data.link.trim(),
        description: data.description?.trim() || undefined,
      } as Partial<IStudentVideo>);

      return {
        success: true,
        message: Messages.STUDENT_VIDEO_CREATED_SUCCESS || "Student video created successfully",
        data: studentVideo,
      };
    } catch (error) {
      console.error("Error creating student video:", error);
      return {
        success: false,
        message: "Failed to create student video",
        data: null,
      };
    }
  }

  public async getStudentVideosBySkillPlannerAndTopic(
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
      const studentVideos = await this.studentVideoRepository.findBySkillPlannerIdAndTopicId(
        skillPlannerId,
        topicId
      );

      return {
        success: true,
        message: Messages.STUDENT_VIDEO_FETCH_SUCCESS || "Student videos fetched successfully",
        data: studentVideos,
      };
    } catch (error) {
      console.error("Error fetching student videos:", error);
      return {
        success: false,
        message: "Failed to fetch student videos",
        data: null,
      };
    }
  }
}

