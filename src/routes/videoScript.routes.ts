import { Router } from "express";
import { VideoScriptController } from "../controller/videoScript.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const videoScriptRouter: Router = Router();
const videoScriptController = new VideoScriptController();

videoScriptRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

videoScriptRouter.post("/", videoScriptController.createVideoScript);
videoScriptRouter.get("/", videoScriptController.getVideoScripts);
videoScriptRouter.get("/:id/sections", videoScriptController.getVideoScriptSections);

export default videoScriptRouter;

