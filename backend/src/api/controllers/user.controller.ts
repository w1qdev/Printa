import { logger } from "@/shared/utils/logger";
import { Request, Response } from "express";
import { UserService } from "@/domain/user/user.service";

export class UserController {
  private userService = new UserService();

  async refreshPassword(req: Request, res: Response) {
    try {
      const { email, oldPassword, newPassword } = req.body;

      const result = await this.userService.refreshPassword({
        email,
        oldPassword,
        newPassword,
      });

      const responseResult = {
        status: "ok",
        data: result,
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with refreshing user password");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const user = await this.userService.findUserByEmail({ email });

      const responseResult = {
        status: "ok",
        data: user,
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with getting user by email");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await this.userService.getAllUsers();

      const responseResult = {
        status: "ok",
        data: allUsers,
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with getting all users", err);

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
