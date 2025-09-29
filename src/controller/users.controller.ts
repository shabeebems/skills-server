import { Request, Response } from "express";
import { handleRequest } from "../utils/handle-request.util";
import { UserService } from "../services/users.service";

export class UserController {
  private userService = new UserService();

  public createUser = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.createUser(req.body));

  public getUsersByRoles = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.getUsersByRoles(req.params.role));

  public findUsersByFilter = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.findUsersByFilter(req.query));

  public getUserById = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.getUserById(req.params.id));

  public updateUser = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.updateUser(req.params.id, req.body));

  public deleteUser = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.userService.deleteUser(req.params.id));
}
