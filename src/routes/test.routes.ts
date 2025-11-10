import { Router } from "express";
import { TestController } from "../controller/test.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { createTestSchema } from "../schemas/test.schema";

const testRouter: Router = Router();

const testController = new TestController();

testRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

testRouter.post("/", validate(createTestSchema), testController.createTest);
testRouter.get("/subject/:subjectId", testController.getTestsBySubject);
testRouter.get("/job/:jobId", testController.getTestsByJob);
testRouter.get("/topic/:topicId", testController.getTestsByTopic);
testRouter.get("/:testId", testController.getTestById);
testRouter.put("/:testId", validate(createTestSchema), testController.updateTest);
testRouter.delete("/:testId", testController.deleteTest);

export default testRouter;


