import ContactModel, { IContact } from "../models/contact.model";
import { BaseRepository } from "./base.repository";

export class ContactRepository extends BaseRepository<IContact> {
  constructor() {
    super(ContactModel);
  }

  async findByProperty(studentId: string, designation: string): Promise<IContact[]> {
    return this.model.find({ studentId, designation }).sort({ createdAt: -1 }).lean();
  }
}