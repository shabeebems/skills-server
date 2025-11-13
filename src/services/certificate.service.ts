import { Types } from "mongoose";
import { CertificateRepository } from "../repositories/certificate.repository";
import { ServiceResponse } from "./types";
import { Messages } from "../constants/messages";
import { ICertificate } from "../models/certificate.model";

export class CertificateService {
  private certificateRepository = new CertificateRepository();

  public async createCertificate(
    studentId: string | undefined,
    data: {
      jobId: string;
      topicId: string;
      skillPlannerId: string;
      title: string;
      link: string;
      storageProvider: "google drive" | "dropbox";
    }
  ): Promise<ServiceResponse> {
    if (!studentId || !data.jobId || !data.topicId || !data.skillPlannerId || !data.title || !data.link || !data.storageProvider) {
      return {
        success: false,
        message: "studentId, jobId, topicId, skillPlannerId, title, link, and storageProvider are required",
        data: null,
      };
    }

    try {
      // Create certificate
      const certificate = await this.certificateRepository.create({
        studentId: new Types.ObjectId(studentId) as any,
        jobId: new Types.ObjectId(data.jobId) as any,
        topicId: new Types.ObjectId(data.topicId) as any,
        skillPlannerId: new Types.ObjectId(data.skillPlannerId) as any,
        title: data.title.trim(),
        link: data.link.trim(),
        storageProvider: data.storageProvider,
      } as Partial<ICertificate>);

      return {
        success: true,
        message: Messages.CERTIFICATE_CREATED_SUCCESS || "Certificate created successfully",
        data: certificate,
      };
    } catch (error) {
      console.error("Error creating certificate:", error);
      return {
        success: false,
        message: "Failed to create certificate",
        data: null,
      };
    }
  }

  public async getCertificatesBySkillPlannerAndTopic(
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
      const certificates = await this.certificateRepository.findBySkillPlannerIdAndTopicId(
        skillPlannerId,
        topicId
      );

      return {
        success: true,
        message: Messages.CERTIFICATE_FETCH_SUCCESS || "Certificates fetched successfully",
        data: certificates,
      };
    } catch (error) {
      console.error("Error fetching certificates:", error);
      return {
        success: false,
        message: "Failed to fetch certificates",
        data: null,
      };
    }
  }
}

