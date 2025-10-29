import { IJob } from "../models/job.model";

export const formatJobsOutput = (jobs: IJob[] | null) => {
  if (!jobs) return [];
  return jobs.map((job) => ({
    _id: job._id,
    name: job.name,
    companyName: job.companyName,
    place: job.place,
  }));
};