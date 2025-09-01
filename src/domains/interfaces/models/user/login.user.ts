export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}