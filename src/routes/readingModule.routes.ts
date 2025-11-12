import { Router } from "express";
import { ReadingModuleController } from "../controller/readingModule.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const readingModuleRouter: Router = Router();
const readingModuleController = new ReadingModuleController();

readingModuleRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

readingModuleRouter.post("/", readingModuleController.createReadingModule);
readingModuleRouter.get("/", readingModuleController.getReadingModuleByJobAndTopic);

export default readingModuleRouter;

