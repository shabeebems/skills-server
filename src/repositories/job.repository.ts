import JobModel, { IJob } from "../models/job.model";
import { BaseRepository } from "./base.repository";
import mongoose from "mongoose";

export class JobRepository extends BaseRepository<IJob> {
  constructor() {
    super(JobModel);
  }

  async findByDepartmentAndOrganization(
    departmentId: string,
    organizationId: string
  ): Promise<IJob[]> {
    return this.model
      .find({
        departmentId,
        organizationId,
      })
      .exec();
  }
}
