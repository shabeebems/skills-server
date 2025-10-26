import JobModel, { IJob } from "../models/job.model";
import { BaseRepository } from "./base.repository";
import mongoose from "mongoose";

export class JobRepository extends BaseRepository<IJob> {
  constructor() {
    super(JobModel);
  }
}
