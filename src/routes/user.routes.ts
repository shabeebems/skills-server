import { Router } from "express";
import { UserController } from "../controller/users.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const userRouter: Router = Router();

const userController = new UserController();

userRouter.use(authenticateToken(["master_admin"]));

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.findUsersByFilter);
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

userRouter.get('/acc_manager/:id', userController.getAccManagerById);

export default userRouter;
