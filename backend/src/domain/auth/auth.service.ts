import { Hasher } from "@/shared/utils/hasher";
import { prisma } from "../../prisma";
import { CreateUserParamsTypes } from "./auth.types";
import { acceptedUserSelectData } from "@/domain/auth/auth.types";
import { UserService } from "../user/user.service";

export class AuthService {
  private hasher = new Hasher();
  private userService = new UserService();

  async register(userData: CreateUserParamsTypes) {
    const user = await this.userService.findUserByEmail({
      email: userData.email,
      selectRoles: acceptedUserSelectData,
    });

    if (user) {
      return {
        message: "This user already exists",
      };
    }

    const hasherPassword = await this.hasher.hash(userData.password);
    if (!hasherPassword) {
      return {
        message: "Error with password hashing",
      };
    }

    const result = await prisma.user.create({
      data: {
        email: userData.email,
        password: hasherPassword,
      },
      select: acceptedUserSelectData,
    });

    if (result) {
      return result;
    }
  }

  async login(email: string, inComePassword: string) {
    const user = await this.userService.findUserByEmail({
      email: email,
      selectRoles: { ...acceptedUserSelectData, password: true },
    });

    if (!user) {
      return {
        message: "User does not exists",
      };
    }

    const comparePasswords = await this.hasher.compare(
      inComePassword,
      user.password,
    );

    if (!comparePasswords) {
      return {
        message: "Passed password is not correct",
      };
    }

    const { password, ...userData } = user;

    return userData;
  }
}
