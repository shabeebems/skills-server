import { Router } from "express";
import { SkillPlannerController } from "../controller/skillPlanner.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const skillPlannerRouter: Router = Router();

const skillPlannerController = new SkillPlannerController();

skillPlannerRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

skillPlannerRouter.post("/", skillPlannerController.addJobToSkillPlanner);
skillPlannerRouter.get("/", skillPlannerController.getSkillPlannerJobs);

export default skillPlannerRouter;

