import { Types } from "mongoose";
import { SkillPlannerRepository } from "../repositories/skillPlanner.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { ISkillPlanner } from "../models/skillPlanner.model";

export class SkillPlannerService {
  private skillPlannerRepository = new SkillPlannerRepository();

  public async addJobToSkillPlanner(
    studentId: string | undefined,
    jobId: string
  ): Promise<ServiceResponse> {
    if (!studentId || !jobId) {
      return {
        success: false,
        message: "studentId and jobId are required",
        data: null,
      };
    }

    try {
      // Check if already exists
      const existing = await this.skillPlannerRepository.findByStudentIdAndJobId(
        studentId,
        jobId
      );

      if (existing) {
        return {
          success: false,
          message: "Job already exists in skill planner",
          data: existing,
        };
      }

      // Create new skill planner entry
      const skillPlanner = await this.skillPlannerRepository.create({
        studentId: new Types.ObjectId(studentId) as any,
        jobId: new Types.ObjectId(jobId) as any,
      } as Partial<ISkillPlanner>);

      return {
        success: true,
        message: Messages.SKILL_PLANNER_ADDED_SUCCESS || "Job added to skill planner successfully",
        data: skillPlanner,
      };
    } catch (error) {
      console.error("Error adding job to skill planner:", error);
      return {
        success: false,
        message: "Failed to add job to skill planner",
        data: null,
      };
    }
  }


  public async getSkillPlannerJobs(studentId: string | undefined): Promise<ServiceResponse> {
    if (!studentId) {
      return {
        success: false,
        message: "studentId is required",
        data: null,
      };
    }

    try {
      const skillPlanners = await this.skillPlannerRepository.findByStudentId(studentId);
      console.log("skillPlanners", skillPlanners);
      return {
        success: true,
        message: Messages.SKILL_PLANNER_FETCH_SUCCESS || "Skill planner jobs fetched successfully",
        data: skillPlanners,
      };
    } catch (error) {
      console.error("Error fetching skill planner jobs:", error);
      return {
        success: false,
        message: "Failed to fetch skill planner jobs",
        data: null,
      };
    }
  }
}

