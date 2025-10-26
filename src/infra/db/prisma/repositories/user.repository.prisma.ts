import { Injectable } from '@nestjs/common';
import { UserRepository }  from '../../../../domains/interfaces/repositories/user.repository.interface';
import { User } from 'src/domains/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { Email } from 'src/domains/valueObjects/email.vo';
import { RoleType } from 'src/domains/types/role.type';
import { Role } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: User): Promise<User> {
    try {
      const { name, email, password, role, createdAt, updatedAt } = user;
      const roleValue = role as Role;
      const createdUser = await this.prisma.user.create({
        data: {
          name,
          email: email.value,
          password,
          role: roleValue,
          createdAt,
          updatedAt,
        },
      });

      return new User(
        createdUser.id,
        createdUser.name,
        Email.create(createdUser.email),
        createdUser.password,
        createdUser.role as RoleType,
        createdUser.createdAt,
        createdUser.updatedAt,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      const userEmail = Email.create(user.email);
      return new User(user.id,
        user.name,
        userEmail,
        user.password,
        user.role as RoleType,
        user.createdAt,
        user.updatedAt);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) return null;

      const userEmail = Email.create(user.email);
      return new User(user.id,
        user.name,
        userEmail,
        user.password,
        user.role as RoleType,
        user.createdAt,
        user.updatedAt);
    } catch (error) {
      throw error;
    }
  }
  // TODO: Implement the methods defined in the UserRepository interface
}