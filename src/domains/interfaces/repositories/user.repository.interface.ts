import { User } from 'src/domains/entities/user.entity';

export abstract class UserRepository { 
  abstract createUser(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
