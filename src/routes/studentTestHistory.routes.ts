import { Router } from "express";
import { StudentTestHistoryController } from "../controller/studentTestHistory.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const studentTestHistoryRouter: Router = Router();
const studentTestHistoryController = new StudentTestHistoryController();

// Allow students to access their test history
studentTestHistoryRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

// Subject-based test history
// GET /tests/:subjectId - Get subject-level tests
// GET /tests/:subjectId?topicId=xxx - Get topic-level tests under subject
studentTestHistoryRouter.get(
  "/tests/:subjectId",
  studentTestHistoryController.getStudentTestHistoryBySubject
);

// Job-based test history
// GET /tests/job/:jobId - Get job-level tests
// GET /tests/job/:jobId?topicId=xxx - Get topic-level tests under job
studentTestHistoryRouter.get(
  "/tests/job/:jobId",
  studentTestHistoryController.getStudentTestHistoryByJob
);

studentTestHistoryRouter.get(
  "/:studentTestHistoryId",
  studentTestHistoryController.getStudentTestHistoryById
);

studentTestHistoryRouter.post(
  "/:studentTestHistoryId/complete",
  studentTestHistoryController.completeTest
);

export default studentTestHistoryRouter;

