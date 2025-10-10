import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { loginSchema } from "../schemas/auth.schema";
import { validate } from "../middlewares/zodValidate";

const authRouter: Router = Router();

const authController = new AuthController();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
