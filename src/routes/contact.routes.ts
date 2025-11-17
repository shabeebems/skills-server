import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenValidation";
import { ContactController } from "../controller/contact.controller";
import { validate } from "../middlewares/zodValidate";
import { addDesigContactSchema, createContactSchema } from "../schemas/contact.schema";

const contactsRouter: Router = Router();
const contactController = new ContactController();

contactsRouter.use(authenticateToken(["master_admin", "org_admin", "student"]));

contactsRouter.post("/create", validate(createContactSchema), contactController.createContact);
contactsRouter.get("/all-contacts", contactController.getContactsByStudent);
contactsRouter.get("/", contactController.getContactsByDesig);
contactsRouter.post("/add/:designation", validate(addDesigContactSchema), contactController.addDesigContact);
// contactsRouter.post("/edit", validate(createContactSchema), contactController.)

export default contactsRouter;