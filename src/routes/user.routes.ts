import { Router } from "express";
import { UserController } from "../controller/users.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const userRouter: Router = Router();

const userController = new UserController();

userRouter.use(authenticateToken(["master_admin"]));

userRouter.post('/', userController.createUser);
userRouter.get('/filter', userController.findUsersByFilter);
userRouter.get('/:id', userController.getUserById);
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

userRouter.get('/:role', userController.getUsersByRoles);

export default userRouter;
