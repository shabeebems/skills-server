import { Router } from "express";
import { UserController } from "../controller/users.controller";

const userRouter: Router = Router();

const userController = new UserController();

userRouter.get('/creatable-roles', userController.getCreatableRoles);
userRouter.post('/user', userController.createUser);

export default userRouter;
