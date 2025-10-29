import { JobRepository } from "../repositories/job.repository";
import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { IJob } from "../models/job.model";
import { formatJobsOutput } from "../views/job.view";

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

  public async getJobsByOrganization(
    organizationId: string,
    departmentId?: string
  ): Promise<ServiceResponse> {
    let jobs;
    
    if (departmentId) {
      jobs = await this.jobRepository.findByDepartmentAndOrganization(
        departmentId,
        organizationId
      );
    } else {
      jobs = await this.jobRepository.findByOrganizationId(organizationId);
    }
    
    return {
      success: true,
      message: Messages.JOB_FETCH_SUCCESS,
      data: formatJobsOutput(jobs),
    };
  }

  public async getJobById(jobId: string): Promise<ServiceResponse> {
    const job = await this.jobRepository.findById(jobId);
    console.log("job", job);
    if (!job) {
      return {
        success: false,
        message: Messages.JOB_NOT_FOUND,
        data: null,
      };
    }
    
    return {
      success: true,
      message: Messages.JOB_FETCH_SUCCESS,
      data: job,
    };
  }
}
