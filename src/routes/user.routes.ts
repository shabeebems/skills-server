import { Router } from "express";
import { UserController } from "../controller/users.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const userRouter: Router = Router();

const userController = new UserController();

// Admin-only routes
userRouter.use(authenticateToken(["master_admin", "org_admin"]));

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.findUsersByFilter);
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

userRouter.get('/acc_manager/:id', userController.getAccManagerById);

// Allow users to update their own profile
userRouter.put(
  "/me",
  authenticateToken(["org_admin", "master_admin", "student"]),
  userController.updateUser
);

export default userRouter;
