import { prisma } from "../../prisma";

export class AuthService {
  async createUser(userData) {
    const result = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
      },
    });

    if (result) {
      return result;
    }
  }
}
