import express from "express";
import { OrganizationSetupController } from "../controller/organization-setup.controller";
import { validate } from "../middlewares/zodValidate";
import { classSchema, classUpdateSchema, departmentSchema, departmentUpdateSchema, sectionSchema, subjectSchema, subjectUpdateSchema, assignmentSchema, assignmentUpdateSchema } from "../schemas/organization-setup.schema";
const router = express.Router();
const controller = new OrganizationSetupController();

// -------- Departments --------
router.post("/departments", validate(departmentSchema), controller.createDepartment);
router.get("/departments/:organizationId", controller.getDepartments);
router.get("/departments/:id", controller.getDepartmentById);
router.put("/departments/:id", validate(departmentUpdateSchema), controller.updateDepartment);
router.delete("/departments/:id", controller.deleteDepartment);

// -------- Classes --------
router.post("/classes", validate(classSchema), controller.createClass);
router.get("/classes/:organizationId", controller.getClasses);
router.get("/classes/:id", controller.getClassById);
router.put("/classes/:id", validate(classUpdateSchema), controller.updateClass);
router.delete("/classes/:id", controller.deleteClass);

// -------- Sections --------
router.post("/sections", validate(sectionSchema), controller.createSection);
router.get("/sections/:organizationId", controller.getSections);
router.get("/sections/:id", controller.getSectionById);
router.put("/sections/:id", controller.updateSection);
router.delete("/sections/:id", controller.deleteSection);

// -------- Subjects --------
router.post("/subjects", validate(subjectSchema), controller.createSubject);
router.get("/subjects/:organizationId", controller.getSubjects);
router.get("/subjects/:id", controller.getSubjectById);
router.put("/subjects/:id", validate(subjectUpdateSchema), controller.updateSubject);
router.delete("/subjects/:id", controller.deleteSubject);

// -------- Assignments --------
router.post("/assignments", validate(assignmentSchema), controller.createAssignment);
router.get("/assignments/:organizationId", controller.getAssignments);
router.get("/assignments/:id", controller.getAssignmentById);
router.put("/assignments/:id", validate(assignmentUpdateSchema), controller.updateAssignment);
router.delete("/assignments/:id", controller.deleteAssignment);

export default router;
