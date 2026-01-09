import { AuthService } from "@/domain/auth/auth.service";
import { logger } from "@/shared/utils/logger";
import { Request, Response } from "express";

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.register({
        email,
        password,
      });

      const responseResult = {
        status: "ok",
        data: result,
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with creating a new user");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      const responseResult = {
        status: "ok",
        data: result,
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with user authentication");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }
}
