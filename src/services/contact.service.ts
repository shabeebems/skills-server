import { Messages } from "../constants/messages";
import { IContact } from "../models/contact.model";
import { ContactRepository } from "../repositories/contact.repository";
import { ServiceResponse } from "./types";

export class ContactService {
  private contactRepository = new ContactRepository();

  public async createContact(data: Partial<IContact> & { studentId: string }): Promise<ServiceResponse> {
    const newContact = await this.contactRepository.create(data);

    return {
        success: true,
        message: Messages.CONTACT_CREATED_SUCCESS,
        data: newContact,
    }
  }

  public async getContactsByStudent(studentId: string): Promise<ServiceResponse> {
    const contacts = await this.contactRepository.findByStudentId(studentId);

    return {
      success: true,
      message: Messages.CONTACT_FETCH_SUCCESS,
      data: contacts,
    };
  }

  public async getContactsByDesig(studentId: string, designation: string): Promise<ServiceResponse> {
    const contacts = await this.contactRepository.findByProperty(studentId, designation);

    return {
      success: true,
      message: Messages.CONTACT_FETCH_SUCCESS,
      data: contacts
    }
  }

  public async addDesigContact(studentId: string, designation: string, contactData: any): Promise<ServiceResponse> {
    
    const newContact = await this.contactRepository.createDesigContact(
      studentId,
      designation,
      contactData
    );

    return {
      success: true,
      message: Messages.CONTACT_CREATED_SUCCESS,
      data: newContact
    }; 
  }

  
}
