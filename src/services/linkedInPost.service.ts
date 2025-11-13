import { Types } from "mongoose";
import { LinkedInPostRepository } from "../repositories/linkedInPost.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { ILinkedInPost } from "../models/linkedInPost.model";

export class LinkedInPostService {
  private linkedInPostRepository = new LinkedInPostRepository();

  public async createLinkedInPost(
    studentId: string | undefined,
    data: {
      jobId: string;
      topicId: string;
      skillPlannerId: string;
      topic: string;
      postText: string;
      userTopic: string;
      userContext?: string;
    }
  ): Promise<ServiceResponse> {
    if (!studentId || !data.jobId || !data.topicId || !data.skillPlannerId || !data.topic || !data.postText || !data.userTopic) {
      return {
        success: false,
        message: "studentId, jobId, topicId, skillPlannerId, topic, postText, and userTopic are required",
        data: null,
      };
    }

    try {
      // Create LinkedIn post
      const linkedInPost = await this.linkedInPostRepository.create({
        studentId: new Types.ObjectId(studentId) as any,
        jobId: new Types.ObjectId(data.jobId) as any,
        topicId: new Types.ObjectId(data.topicId) as any,
        skillPlannerId: new Types.ObjectId(data.skillPlannerId) as any,
        topic: data.topic.trim(),
        postText: data.postText.trim(),
        userTopic: data.userTopic.trim(),
        userContext: data.userContext?.trim() || undefined,
      } as Partial<ILinkedInPost>);

      return {
        success: true,
        message: Messages.LINKEDIN_POST_CREATED_SUCCESS || "LinkedIn post created successfully",
        data: linkedInPost,
      };
    } catch (error) {
      console.error("Error creating LinkedIn post:", error);
      return {
        success: false,
        message: "Failed to create LinkedIn post",
        data: null,
      };
    }
  }

  public async getLinkedInPostsBySkillPlannerAndTopic(
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
      const linkedInPosts = await this.linkedInPostRepository.findBySkillPlannerIdAndTopicId(
        skillPlannerId,
        topicId
      );

      return {
        success: true,
        message: Messages.LINKEDIN_POST_FETCH_SUCCESS || "LinkedIn posts fetched successfully",
        data: linkedInPosts,
      };
    } catch (error) {
      console.error("Error fetching LinkedIn posts:", error);
      return {
        success: false,
        message: "Failed to fetch LinkedIn posts",
        data: null,
      };
    }
  }
}

