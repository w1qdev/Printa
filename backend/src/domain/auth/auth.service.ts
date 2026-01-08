import { Hasher } from "@/shared/utils/hasher";
import { prisma } from "../../prisma";
import { createUserParameters } from "./auth.types";

export class AuthService {
  private hasher = new Hasher();

  async createUser(userData: createUserParameters) {
    const isUserExists = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (isUserExists) {
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
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    });

    if (result) {
      return result;
    }
  }
}
