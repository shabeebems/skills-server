import { Router } from "express";
import { StudentVideoController } from "../controller/studentVideo.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const studentVideoRouter: Router = Router();
const studentVideoController = new StudentVideoController();

studentVideoRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

studentVideoRouter.post("/", studentVideoController.createStudentVideo);
studentVideoRouter.get("/", studentVideoController.getStudentVideos);

export default studentVideoRouter;

