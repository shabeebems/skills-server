import { Messages } from "../../constants/messages";
import { ServiceResponse } from "../types";
import { ISection } from "../../models/section.model";
import { SectionRepository } from "../../repositories/section.repository";
import { formatSectionsOutput } from "../../views/organization-setup.view";

export class SectionService {
  private sectionRepository = new SectionRepository();

  public async createSection(data: ISection): Promise<ServiceResponse> {
    const created = await this.sectionRepository.create(data);
    return {
      success: true,
      message: Messages.SECTION_CREATED_SUCCESS,
      data: created,
    };
  }

  public async getAllSections(
    organizationId: string
  ): Promise<ServiceResponse> {
    const data = await this.sectionRepository.findByOrganizationId(
      organizationId
    );
    return {
      success: true,
      message: Messages.SECTION_FETCH_SUCCESS,
      data: formatSectionsOutput(data),
    };
  }

  public async getSectionById(id: string): Promise<ServiceResponse> {
    const data = await this.sectionRepository.findById(id);
    if (!data) return { success: false, message: Messages.SECTION_NOT_FOUND };
    return { success: true, message: Messages.SECTION_FETCH_SUCCESS, data };
  }

  public async updateSection(
    id: string,
    payload: Partial<ISection>
  ): Promise<ServiceResponse> {
    const updated = await this.sectionRepository.update(id, payload);
    if (!updated)
      return { success: false, message: Messages.SECTION_NOT_FOUND };
    return {
      success: true,
      message: Messages.SECTION_UPDATED_SUCCESS,
      data: updated,
    };
  }

  public async deleteSection(id: string): Promise<ServiceResponse> {
    const deleted = await this.sectionRepository.delete(id);
    if (!deleted)
      return { success: false, message: Messages.SECTION_NOT_FOUND };
    return {
      success: true,
      message: Messages.SECTION_DELETED_SUCCESS,
      data: deleted,
    };
  }
}
