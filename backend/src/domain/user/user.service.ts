import { Hasher } from "@/shared/utils/hasher";
import { prisma } from "../../prisma";
import {
  FindUserByEmailParamsTypes,
  RefreshPasswordParamsTypes,
} from "./user.types";
import { acceptedUserSelectData } from "../../shared/constants/acceptedUserSelectData";
import { AcceptedUserSelectData } from "../auth/auth.types";

export class UserService {
  private hasher = new Hasher();

  async findUserByEmail({
    email,
    selectRoles = acceptedUserSelectData,
  }: FindUserByEmailParamsTypes<AcceptedUserSelectData>) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: selectRoles,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async refreshPassword({
    email,
    oldPassword,
    newPassword,
  }: RefreshPasswordParamsTypes) {
    const existsUser = await this.findUserByEmail({
      email: email,
      selectRoles: { ...acceptedUserSelectData, password: true },
    });

    if (!existsUser) {
      return {
        message: "User does not exists",
      };
    }

    const comparePasswords = await this.hasher.compare(
      oldPassword,
      existsUser.password,
    );

    if (!comparePasswords) {
      return {
        message: "Passed password is not correct",
      };
    }

    const newHashedPassword = await this.hasher.hash(newPassword);

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newHashedPassword,
      },
    });

    const { password, telegramChatId, ...result } = user;

    return result;
  }

  async getAllUsers() {
    const allUsers = await prisma.user.findMany({
      select: acceptedUserSelectData,
    });

    return allUsers;
  }
}
