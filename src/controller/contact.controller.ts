import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { ContactService } from "../services/contact.service";

interface AuthenticatedRequest extends Request {
  user?: {
    _id?: string;
    [key: string]: unknown;
  };
}

export class ContactController {
  private contactService = new ContactService();

  public createContact = (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () => {
      const studentId = req.user?._id;
      if (!studentId) {
        throw new Error("User ID not found");
      }
      return this.contactService.createContact({ ...req.body, studentId });
    });

  public getContactsByDesig = (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () => {
      const studentId = req.user?._id;
      const designation = req.params.designation;
      if (!studentId) {
        throw new Error("User ID not found");
      }
      if (!designation) {
        throw new Error("Designation not found");
      }
      return this.contactService.getContactsByDesig(studentId, designation);
    });
}
