import { Role, UserStatus } from '@prisma/client';
export interface UserRegisterData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface UserLoginData {
    email: string;
    password: string;
  }
  export interface AuthResponse {
    message: string;
    user?: {
      id: number;  // Alterado para number
      name: string;
      email: string;
      role: Role;  // Usando o tipo do Prisma
      status: UserStatus; // Usando o tipo do Prisma
    };
    token?: string;
    error?: string;
}
  
export interface JwtPayload {
userId: number;  // Alterado para number
role: Role;      // Usando o tipo do Prisma
}


export interface ForgotPasswordData {
  email: string;
}


export interface ResetPasswordData {
  token: string;
  newPassword: string;
}
