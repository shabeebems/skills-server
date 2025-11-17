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

  public getContactsByStudent = (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () => {
      const studentId = req.user?._id;
      const designation = req.query.designation
      if (!studentId) {
        throw new Error("User ID not found");
      }
      return this.contactService.getContactsByStudent(studentId);
    });


  public getContactsByDesig = (
    req: any,
    res: Response
  ): Promise<void> =>
    handleRequest(res, () => {
      const studentId = req.user?._id;
      const designation = req.query.designation;
      if (!studentId) {
        throw new Error("User ID not found");
      }
      if (!designation) {
        throw new Error("Designation not found");
      }
      return this.contactService.getContactsByDesig(studentId, designation);
    });

    
    public addDesigContact = (
      req: any,
      res: Response
    ): Promise<void> =>
      handleRequest(res, () => {
        const studentId = req.user?._id;
        const designation = req.params.designation;
        const contactData = req.body;
    
        if (!studentId) {
          throw new Error("User ID not found");
        }
    
        return this.contactService.addDesigContact(studentId, designation, contactData);
      });

  // public updateContact = (
  //   req: AuthenticatedRequest,
  //   res: Response
  // ): Promise<void> =>
  //   handleRequest(res, () => {
  //     const studentId = req.user?._id;
  //     if (!studentId) throw new Error("User ID not found");

  //     return this.contactService.updateContact(
  //       req.params.contactId,
  //       req.body,
  //       studentId
  //     );
  //   });

  //   public updateContact = (req: Request, res: Response): Promise<void> =>
  //     handleRequest(res, () =>
  //       this.contactService.updateContact(req.params.id, req.body)
  //     );

  //   public deleteContact = (req: Request, res: Response): Promise<void> =>
  //     handleRequest(res, () => this.contactService.deleteContact(req.params.id));

}
