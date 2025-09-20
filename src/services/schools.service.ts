import { Messages } from "../constants/messages";
import { ServiceResponse } from "./types";
import { ISchool } from "../models/school.model";
import { SchoolRepository } from "../repositories/school.repository";

export class SchoolService {
  private schoolRepository = new SchoolRepository();

  public async createSchool(data: ISchool): Promise<ServiceResponse> {
    const newSchool = await this.schoolRepository.create(data);
    return {
      success: true,
      message: Messages.SCHOOL_CREATED_SUCCESS,
      data: newSchool,
    };
  }

  public async getSchools(): Promise<ServiceResponse> {
    const schools = await this.schoolRepository.findAll();
    return {
      success: true,
      message: Messages.SCHOOL_CREATED_SUCCESS,
      data: schools,
    };
  }
}
