import { Hasher } from "@/shared/utils/hasher";
import { prisma } from "../../prisma";
import { CreateUserParamsTypes } from "./auth.types";
import { acceptedUserSelectData } from "@/domain/auth/auth.types";
import { UserService } from "../user/user.service";
import { JWTService } from "@/domain/jwt/jwt.service";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  private hasher = new Hasher();
  private userService = new UserService();
  private jwtService = new JWTService();

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

    const userId = uuidv4();
    const tokens = this.jwtService.generateTokens({ userId: userId });

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email: userData.email,
        password: hasherPassword,
        refreshTokens: {
          create: {
            hashedToken: tokens.refreshToken,
          },
        },
      },
      select: { ...acceptedUserSelectData },
    });

    const result = {
      ...newUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };

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

  // async logout(email: string) {
  //   const user = await this.userService.findUserByEmail({
  //     email: email,
  //     selectRoles: acceptedUserSelectData,
  //   });

  //   if (!user) {
  //     return {
  //       message: "User does not exists",
  //     };
  //   }

  //   const result = await prisma.user.update({
  //     where: { email: email },
  //     data: { token: null },
  //     select: acceptedUserSelectData,
  //   });

  //   if (result) {
  //     return result;
  //   }
  // }
}
