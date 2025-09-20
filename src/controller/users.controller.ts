import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { UserService } from "../services/users.service";

export class UserController {
  private userService = new UserService();

  public getCreatableRoles = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.getCreatableRoles(req));

  public createUser = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.createUser(req.body));
}
