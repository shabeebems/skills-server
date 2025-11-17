import { Router } from "express";
import { LinkedInPostController } from "../controller/linkedInPost.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const linkedInPostRouter: Router = Router();
const linkedInPostController = new LinkedInPostController();

linkedInPostRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

linkedInPostRouter.post("/", linkedInPostController.createLinkedInPost);
linkedInPostRouter.get("/", linkedInPostController.getLinkedInPosts);

export default linkedInPostRouter;

