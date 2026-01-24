import { logger } from "@/shared/utils/logger";
import { Request, Response } from "express";
import { AuthService } from "services/auth/auth.service";
import { ResponseService } from "services/response-handler/response.service";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.register({
        email,
        password,
      });

      if (result && "refreshToken" in result) {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      return this.responseService.sendMessageNotification(res, result);
    } catch (err) {
      logger.error("Error with creating a new user", err);

      return this.responseService.sendErrorNotification(res, {
        message: "Some internal error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      return this.responseService.sendMessageNotification(res, result);
    } catch (err) {
      logger.error("Error with user authentication", err);

      return this.responseService.sendErrorNotification(res, {
        message: "Some internal error",
      });
    }
  }
}
