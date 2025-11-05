import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { DepartmentService } from "../services/organization-setup/department.service";
import { ClassService } from "../services/organization-setup/class.service";
import { SectionService } from "../services/organization-setup/section.service";
import { SubjectService } from "../services/organization-setup/subject.service";
import { AssignmentService } from "../services/organization-setup/assignment.service";
import { TeachingAssignmentService } from "../services/organization-setup/teachingAssignment.service";

export class OrganizationSetupController {
  private departmentService = new DepartmentService();
  private classService = new ClassService();
  private sectionService = new SectionService();
  private subjectService = new SubjectService();
  private assignmentService = new AssignmentService();
  private teachingAssignmentService = new TeachingAssignmentService();

  // -------- Department --------
  public createDepartment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.departmentService.createDepartment(req.body));

  public getDepartments = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.departmentService.getAllDepartments(req.params.organizationId));

  public updateDepartment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.departmentService.updateDepartment(req.params.id, req.body));

  public deleteDepartment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.departmentService.deleteDepartment(req.params.id));

  // -------- Class --------
  public createClass = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.classService.createClass(req.body));

  public getClasses = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.classService.getAllClasses(req.params.organizationId));

  public getClassesByDepartmentsFromAssignments = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.classService.getClassesByDepartmentsFromAssignments(req.params));
  
  public updateClass = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.classService.updateClass(req.params.id, req.body));

  public deleteClass = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.classService.deleteClass(req.params.id));

  // -------- Section --------
  public createSection = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.sectionService.createSection(req.body));

  public getSections = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.sectionService.getAllSections(req.params.organizationId));

  public getSectionsByClassFromAssignments = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.sectionService.getSectionsByClassFromAssignments(req.params));

  public updateSection = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.sectionService.updateSection(req.params.id, req.body));

  public deleteSection = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.sectionService.deleteSection(req.params.id));

  // -------- Subject --------
  public createSubject = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.subjectService.createSubject(req.body));

  public getSubjects = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.subjectService.getAllSubjects(req.params.organizationId));

  public updateSubject = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.subjectService.updateSubject(req.params.id, req.body));

  public deleteSubject = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.subjectService.deleteSubject(req.params.id));

  public getSubjectsByDepartment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.subjectService.getSubjectsByDepartment(req.params));

  // -------- Assignment --------
  public createAssignment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.assignmentService.createAssignment(req.body));

  public getAssignmentsByOrgDeptAndClass = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.assignmentService.getAssignmentsByOrgDeptAndClass(
      req.params.organizationId,
      req.params.departmentId,
      req.params.classId
    ));

  public getAssignmentById = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.assignmentService.getAssignmentById(req.params.id));

  public deleteAssignment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.assignmentService.deleteAssignment(req.params.id));

  public createTeachingAssignment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.teachingAssignmentService.createTeachingAssignment(req.body));

  public getTeachingAssignments = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.teachingAssignmentService.getTeachingAssignments(req.params.organizationId));

  public getTeachingAssignmentByOrgAndAssignment = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.teachingAssignmentService.getTeachingAssignmentByOrgAndAssignment(req.params.organizationId, req.params.assignmentId));

  public assignTeacher = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () => this.teachingAssignmentService.assignTeacher(req.params, req.body));

  public removeSubjectFromTeachingAssignment = (req: any, res: Response): Promise<void> =>
    handleRequest(res, () => this.teachingAssignmentService.removeSubject(req.params, req.body));

}
