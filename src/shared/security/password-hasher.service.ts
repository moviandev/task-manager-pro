import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService {
  private readonly SALT_ROUNDS = 16;

  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = (await bcrypt.hash(password, this.SALT_ROUNDS)) as string;
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
}
