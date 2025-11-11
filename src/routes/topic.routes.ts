import { Router } from "express";
import { TopicController } from "../controller/topic.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { createTopicSchema } from "../schemas/topic.schema";

const topicRouter: Router = Router();
const topicController = new TopicController();

// Student accessible route - placed before global middleware
topicRouter.get('/subject/:subjectId', authenticateToken(["master_admin", "org_admin", "student"]), topicController.getTopicsBySubject);

topicRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

topicRouter.post('/', validate(createTopicSchema), topicController.createTopic);
topicRouter.get('/job/:jobId', topicController.getTopicsByJob);
topicRouter.get('/:organizationId', topicController.getTopicsByOrganization);
topicRouter.delete('/:topicId', topicController.deleteTopic);

export default topicRouter;
