import SkillPlannerModel, { ISkillPlanner } from "../models/skillPlanner.model";
import { BaseRepository } from "./base.repository";

export class SkillPlannerRepository extends BaseRepository<ISkillPlanner> {
  constructor() {
    super(SkillPlannerModel);
  }

  async findByStudentId(studentId: string): Promise<ISkillPlanner[]> {
    return this.find({ studentId } as any);
  }

  async findByStudentIdAndJobId(studentId: string, jobId: string): Promise<ISkillPlanner | null> {
    return this.findOne({ studentId, jobId } as any);
  }
}

