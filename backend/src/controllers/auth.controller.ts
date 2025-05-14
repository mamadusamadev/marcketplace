// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRegisterData, UserLoginData } from '../interfaces/auth.types';
import { forgotPasswordSchema ,resetPasswordSchema} from '../validations/auth.validation';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const userData: UserRegisterData = req.body;
    const result = await AuthService.register(userData);

    if (result.error) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  }

  static async login(req: Request, res: Response): Promise<void> {
    const loginData: UserLoginData = req.body;
    const result = await AuthService.login(loginData);

    if (result.error) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  }

  

  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = forgotPasswordSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const resetToken = await AuthService.forgotPassword(value);

      res.json({ message: 'Password reset instructions sent to email', resetToken });
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Failed to process forgot password' });
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = resetPasswordSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      await AuthService.resetPassword(value);

      res.json({ message: 'Password has been reset successfully' });
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Failed to reset password' });
    }
  }
}