import { JobRepository } from "../repositories/job.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IJob } from "../models/job.model";

export class JobService {
  private jobRepository = new JobRepository();

  public async createJob(data: IJob): Promise<ServiceResponse> {
    const newJob = await this.jobRepository.create(data);
    return {
      success: true,
      message: Messages.JOB_CREATED_SUCCESS,
      data: newJob,
    };
  }

  public async getJobsByOrganization(organizationId: string): Promise<ServiceResponse> {
    const jobs = await this.jobRepository.findByOrganizationId(organizationId);
    return {
      success: true,
      message: Messages.JOB_FETCH_SUCCESS,
      data: jobs,
    };
  }
}
