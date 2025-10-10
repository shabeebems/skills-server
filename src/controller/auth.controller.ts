import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { handleRequest } from "../utils/handle-request.util";

export class AuthController {
  private authService = new AuthService();

  public login = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.authService.login(res, req.body));

  public logout = (req: Request, res: Response): Promise<void> =>
    handleRequest(res, () => this.authService.logout(res));
}
