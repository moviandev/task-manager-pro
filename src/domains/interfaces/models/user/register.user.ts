import { RoleType } from 'src/domains/types/role.type';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role: RoleType;
}

export interface RegisterUserOutput {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}