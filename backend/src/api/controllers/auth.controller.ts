import { logger } from "@/shared/utils/logger";
import { Request, Response } from "express";
import { AuthService } from "services/auth/auth.service";

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

      if (result && "refreshToken" in result) {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with creating a new user", err);

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
      logger.error("Error with user authentication", err);

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
