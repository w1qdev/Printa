import { config } from "@/config/app.config";
import bcrypt from "bcrypt";
import "dotenv/config";

type HasherConstructorParameters = {
  saltRounds: number;
  secretKey: string;
};

export class Hasher {
  private saltRounds = 12;
  private secretKey = config.bcrypt.secret;
  private bcrypt;

  constructor(options?: HasherConstructorParameters) {
    this.saltRounds = options?.saltRounds || 12;
    this.secretKey = options?.secretKey || (process.env.JWT_SECRET as string);
    this.bcrypt = bcrypt;
  }

  async hash(hashString: string) {
    const result = await this.bcrypt.hash(hashString, this.saltRounds);

    return result;
  }
}
