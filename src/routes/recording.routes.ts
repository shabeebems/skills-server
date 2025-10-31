import { Router } from "express";
import { RecordingController } from "../controller/recording.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { createRecordingSchema } from "../schemas/recording.schema";

const recordingRouter: Router = Router();

const recordingController = new RecordingController();

recordingRouter.use(authenticateToken(["master_admin", "org_admin"]));

recordingRouter.post(
  "/",
  validate(createRecordingSchema),
  recordingController.createRecording
);

recordingRouter.get(
  "/subject/:subjectId/topic/:topicId",
  recordingController.getRecordingsBySubjectIdAndTopicId
);

recordingRouter.delete(
  "/:recordingId",
  recordingController.deleteRecording
);

export default recordingRouter;

