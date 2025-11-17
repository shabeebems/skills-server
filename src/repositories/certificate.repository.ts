import { Types } from "mongoose";
import CertificateModel, { ICertificate } from "../models/certificate.model";
import { BaseRepository } from "./base.repository";

export class CertificateRepository extends BaseRepository<ICertificate> {
  constructor() {
    super(CertificateModel);
  }

  async findBySkillPlannerIdAndTopicId(
    skillPlannerId: string,
    topicId: string
  ): Promise<ICertificate[]> {
    return this.find({
      skillPlannerId: new Types.ObjectId(skillPlannerId),
      topicId: new Types.ObjectId(topicId),
    } as any);
  }
}

