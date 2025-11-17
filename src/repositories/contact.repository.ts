import ContactModel, { IContact } from "../models/contact.model";
import { BaseRepository } from "./base.repository";


export class ContactRepository extends BaseRepository<IContact> {
  constructor() {
    super(ContactModel);
  }

  async findByStudentId(studentId: string): Promise<IContact[]> {
    return this.model.find({ studentId }).sort({ createdAt: -1 }).lean();
  }

  async findByProperty(studentId: string, designation: string): Promise<IContact[]> {
    return this.model.find({studentId, designation}).sort({ createdAt: -1 }).lean();
  }

  public async createDesigContact(
    studentId: string,
    designation: string,
    contactData: any
  ) {
    return await this.model.create({
      studentId,
      designation,
      ...contactData,
    });
  }
}