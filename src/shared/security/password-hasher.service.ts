import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService {
  private readonly SALT_ROUNDS = 16;

  async hash(password: string): Promise<string> {
    const hashedPassword = (await bcrypt.hash(password, this.SALT_ROUNDS)) as string;
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
