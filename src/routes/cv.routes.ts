import { Router } from "express";
import { CVController } from "../controller/cv.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { createOrUpdateCVProfileSchema } from "../schemas/cvProfile.schema";
import {
  createCVEducationSchema,
  updateCVEducationSchema,
} from "../schemas/cvEducation.schema";
import {
  createCVExperienceSchema,
  updateCVExperienceSchema,
} from "../schemas/cvExperience.schema";

const cvRouter: Router = Router();
const cvController = new CVController();

cvRouter.use(authenticateToken(["student"]));

// Profile routes
cvRouter.get("/profile", cvController.getCVProfile);
cvRouter.post(
  "/profile",
  validate(createOrUpdateCVProfileSchema),
  cvController.createOrUpdateCVProfile
);
cvRouter.put(
  "/profile",
  validate(createOrUpdateCVProfileSchema),
  cvController.createOrUpdateCVProfile
);

// Education routes
cvRouter.get("/education", cvController.getCVEducation);
cvRouter.post(
  "/education",
  validate(createCVEducationSchema),
  cvController.createCVEducation
);
cvRouter.put(
  "/education/:id",
  validate(updateCVEducationSchema),
  cvController.updateCVEducation
);
cvRouter.delete("/education/:id", cvController.deleteCVEducation);

// Experience routes
cvRouter.get("/experience", cvController.getCVExperience);
cvRouter.post(
  "/experience",
  validate(createCVExperienceSchema),
  cvController.createCVExperience
);
cvRouter.put(
  "/experience/:id",
  validate(updateCVExperienceSchema),
  cvController.updateCVExperience
);
cvRouter.delete("/experience/:id", cvController.deleteCVExperience);

export default cvRouter;

