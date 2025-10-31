import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { RecordingService } from "../services/recording.service";

export class RecordingController {
  private recordingService = new RecordingService();

  public createRecording = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.recordingService.createRecording(req.body));

  public getRecordingsBySubjectIdAndTopicId = (
    req: Request,
    res: Response
  ): Promise<void> =>
    handleRequest(
      res,
      () =>
        this.recordingService.getRecordingsBySubjectIdAndTopicId(
          req.params.subjectId,
          req.params.topicId
        )
    );

  public deleteRecording = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.recordingService.deleteRecording(req.params.recordingId));
}

