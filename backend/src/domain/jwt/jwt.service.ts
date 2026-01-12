import jwt from "jsonwebtoken";
import { config } from "@/config/app.config";
import { GenerateTokenParams } from "@/domain/jwt/jwt.types";

export class JWTService {
  private readonly accessSecret: string = config.jwt.accessSecret as string;
  private readonly refreshSecret: string = config.jwt.refreshSecret as string;
  private readonly accessSecretExpiresIn: string = config.jwt.expiresAccessIn;
  private readonly refreshSecretExpiresIn: string = config.jwt.expiresRefreshIn;

  public generateAccessToken({ userId }: GenerateTokenParams): string {
    const token = jwt.sign({ userId: userId }, this.accessSecret, {
      expiresIn: "7d",
    });

    return token;
  }

  public generateRefreshToken({ userId }: GenerateTokenParams): string {
    const token = jwt.sign({ userId: userId }, this.refreshSecret, {
      expiresIn: this.refreshSecretExpiresIn,
    });

    return token;
  }

  public verifyToken(token: string) {
    const decoded = jwt.verify(token, this.accessSecret);

    return decoded;
  }

  public generateTokens({ userId }: GenerateTokenParams) {
    const accessToken = this.generateAccessToken({ userId });
    const refreshToken = this.generateRefreshToken({ userId });

    return { accessToken, refreshToken };
  }
}
