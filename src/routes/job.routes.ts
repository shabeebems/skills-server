import { Router } from "express";
import { JobController } from "../controller/job.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { createJobSchema } from "../schemas/job.schema";

const jobRouter: Router = Router();

const jobController = new JobController();

jobRouter.use(authenticateToken(["master_admin", "org_admin"]));

jobRouter.post('/', validate(createJobSchema), jobController.createJob);
jobRouter.get('/:organizationId', jobController.getJobsByOrganization);

export default jobRouter;
