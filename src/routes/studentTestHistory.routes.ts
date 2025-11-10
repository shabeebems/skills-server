import { Router } from "express";
import { StudentTestHistoryController } from "../controller/studentTestHistory.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const studentTestHistoryRouter: Router = Router();
const studentTestHistoryController = new StudentTestHistoryController();

// Allow students to access their test history
studentTestHistoryRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

studentTestHistoryRouter.get(
  "/tests/:subjectId",
  studentTestHistoryController.getStudentTestHistoryBySubject
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

