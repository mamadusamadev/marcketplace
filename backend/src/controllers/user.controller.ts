import { Request, Response } from 'express';
import { uploadFileToS3 } from '../utils/s3Uploader';


import { UserService, UserUpdateService } from '../services/user.service';
import { updateProfileSchema,
  updatePasswordSchema,
  toggleSellerModeSchema

 } from '../validations/user.validation';


export class UserController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const user = await UserService.getProfile(userId);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  }


  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = updateProfileSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const userId = req.user!.userId;
      const updatedUser = await UserUpdateService.updateProfile(userId, value);

      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  }

  static async updateProfilePhoto(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file provided' });
        return;
      }

      const userId = req.user!.userId;
      const photoUrl = await uploadFileToS3(req.file);

      const updatedUser = await UserService.updateProfilePhoto(userId, photoUrl);

      res.json({ message: 'Profile photo updated successfully', photoUrl: updatedUser.photoUrl });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile photo' });
    }
  }

  
  static async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = updatePasswordSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const userId = req.user!.userId;
      await UserService.updatePassword(userId, value);

      res.json({ message: 'Password updated successfully' });
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Failed to update password' });
    }
  }


  static async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      await UserService.softDeleteAccount(userId);

      res.json({ message: 'Account deleted successfully (soft delete)' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete account' });
    }
  }

  // MODO VENDEDOR CONTROLLER
  static async toggleSellerMode(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = toggleSellerModeSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const userId = req.user!.userId;
      const result = await UserService.toggleSellerMode(userId, value);

      res.json({ message: 'Seller mode updated successfully', data: result });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update seller mode' });
    }
  }
}




