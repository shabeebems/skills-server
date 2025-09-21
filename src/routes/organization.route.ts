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

router.get("/:id", (req, res) =>
  organizationController.getOrganizationById(req, res)
);

router.put("/:id", validate(organizationSchema.partial()), (req, res) =>
  organizationController.updateOrganization(req, res)
);

router.delete("/:id", (req, res) =>
  organizationController.deleteOrganization(req, res)
);

router.patch("/:id/status", (req, res) =>
  organizationController.changeStatus(req, res)
);

export default router;
