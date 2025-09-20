import { Router } from "express";
import { OrganizationController } from "../controller/organization.controller";
import { validate } from "../middlewares/zodValidate";
import { organizationSchema } from "../schemas/organization.schema";

const router = Router();
const organizationController = new OrganizationController();

router.post("/", validate(organizationSchema), (req, res) =>
  organizationController.createOrganization(req, res)
);

router.get("/", (req, res) =>
  organizationController.getOrganizations(req, res)
);

export default router;
