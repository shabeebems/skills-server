import express from "express";
import { OrganizationSetupController } from "../controller/organization-setup.controller";
import { validate } from "../middlewares/zodValidate";
import { classSchema, departmentSchema, sectionSchema, subjectSchema, assignmentSchema } from "../schemas/organization-setup.schema";
const router = express.Router();
const controller = new OrganizationSetupController();

// -------- Departments --------
router.post("/departments", validate(departmentSchema), controller.createDepartment);
router.get("/departments/:organizationId", controller.getDepartments);
router.put("/departments/:id", validate(departmentSchema), controller.updateDepartment);
router.delete("/departments/:id", controller.deleteDepartment);

// -------- Classes --------
router.post("/classes", validate(classSchema), controller.createClass);
router.get("/classes/:organizationId", controller.getClasses);
router.put("/classes/:id", validate(classSchema), controller.updateClass);
router.delete("/classes/:id", controller.deleteClass);

// -------- Sections --------
router.post("/sections", validate(sectionSchema), controller.createSection);
router.get("/sections/:organizationId", controller.getSections);
router.put("/sections/:id", validate(sectionSchema), controller.updateSection);
router.delete("/sections/:id", controller.deleteSection);

// -------- Subjects --------
router.post("/subjects", validate(subjectSchema), controller.createSubject);
router.get("/subjects/:organizationId", controller.getSubjects);
router.put("/subjects/:id", validate(subjectSchema), controller.updateSubject);
router.delete("/subjects/:id", controller.deleteSubject);

// -------- Assignments --------
router.post("/assignments", validate(assignmentSchema), controller.createAssignment);
router.get("/assignments/:organizationId", controller.getAssignments);
router.delete("/assignments/:id", controller.deleteAssignment);

export default router;
