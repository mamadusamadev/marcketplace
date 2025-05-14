// src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../utils/emailSender';
import { UserRegisterData, UserLoginData, JwtPayload, AuthResponse ,
  ForgotPasswordData,ResetPasswordData

} from '../interfaces/auth.types';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '7d';

export class AuthService {
  static async register(userData: UserRegisterData): Promise<AuthResponse> {
    try {
      const existingUser = await prisma.user.findUnique({ 
        where: { email: userData.email } 
      });

      if (existingUser) {
        return { 
          error: 'Email already registered', 
          message: 'Registration failed' 
        };
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: 'CLIENT',
          status: 'ACTIVE',
        },
        select: {
          id: true,
          name:true,
          email: true,
          role: true,
          status: true
        }
      });

      return {
        message: 'User registered successfully',
        user
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        error: 'Registration failed', 
        message: 'Registration failed' 
      };
    }
  }

  static async login(loginData: UserLoginData): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: loginData.email,
          isDeleted: false,
        },
      });
  
      if (!user) {
        return {
          error: 'Invalid email or password',
          message: 'Login failed',
        };
      }
  
      if (user.status !== 'ACTIVE') {
        return {
          error: 'Account is not active',
          message: 'Login failed',
        };
      }
  
      const isValid = await bcrypt.compare(loginData.password, user.password);
      if (!isValid) {
        return {
          error: 'Invalid email or password',
          message: 'Login failed',
        };
      }
  
      const payload: JwtPayload = {
        userId: user.id,
        role: user.role,
      };
  
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
  
      return {
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          name: user.name,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        error: 'Login failed',
        message: 'Login failed',
      };
    }
  }
  

  static async forgotPassword(data: ForgotPasswordData) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email: data.email },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    await sendResetPasswordEmail(data.email, resetToken);

    return;
  }

  static async resetPassword(data: ResetPasswordData) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: data.token,
        resetTokenExpires: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
  }
}