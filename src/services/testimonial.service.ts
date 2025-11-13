import { Types } from "mongoose";
import { TestimonialRepository } from "../repositories/testimonial.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { ITestimonial } from "../models/testimonial.model";

export class TestimonialService {
  private testimonialRepository = new TestimonialRepository();

  public async createTestimonial(
    studentId: string | undefined,
    data: {
      jobId: string;
      topicId: string;
      skillPlannerId: string;
      validatorName: string;
      validatorEmail: string;
      validatorRole: string;
    }
  ): Promise<ServiceResponse> {
    if (!studentId || !data.jobId || !data.topicId || !data.skillPlannerId || !data.validatorName || !data.validatorEmail || !data.validatorRole) {
      return {
        success: false,
        message: "studentId, jobId, topicId, skillPlannerId, validatorName, validatorEmail, and validatorRole are required",
        data: null,
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.validatorEmail.trim())) {
      return {
        success: false,
        message: "Please enter a valid email address",
        data: null,
      };
    }

    try {
      // Create testimonial
      const testimonial = await this.testimonialRepository.create({
        studentId: new Types.ObjectId(studentId) as any,
        jobId: new Types.ObjectId(data.jobId) as any,
        topicId: new Types.ObjectId(data.topicId) as any,
        skillPlannerId: new Types.ObjectId(data.skillPlannerId) as any,
        validatorName: data.validatorName.trim(),
        validatorEmail: data.validatorEmail.trim(),
        validatorRole: data.validatorRole.trim(),
      } as Partial<ITestimonial>);

      return {
        success: true,
        message: Messages.TESTIMONIAL_CREATED_SUCCESS || "Testimonial created successfully",
        data: testimonial,
      };
    } catch (error) {
      console.error("Error creating testimonial:", error);
      return {
        success: false,
        message: "Failed to create testimonial",
        data: null,
      };
    }
  }

  public async getTestimonialsBySkillPlannerAndTopic(
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
      const testimonials = await this.testimonialRepository.findBySkillPlannerIdAndTopicId(
        skillPlannerId,
        topicId
      );

      return {
        success: true,
        message: Messages.TESTIMONIAL_FETCH_SUCCESS || "Testimonials fetched successfully",
        data: testimonials,
      };
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return {
        success: false,
        message: "Failed to fetch testimonials",
        data: null,
      };
    }
  }
}

