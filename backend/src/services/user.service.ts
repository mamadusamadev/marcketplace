import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { 
  UserProfileResponse ,
  UserUpdateProfileData,
  UpdatePasswordData,
  SellerModeToggle

} from '../interfaces/user.types';


const prisma = new PrismaClient();

export class UserService {
  static async getProfile(userId: number): Promise<UserProfileResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        phone: true,
        addresses: true,
        city: true,
        postalCode: true,
        address:true,
        country: true,
        photoUrl: true,
      },
    });
    return user;
  }

  // atualizar foto de perfil
  static async updateProfilePhoto(userId: number, photoUrl: string) {
    const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { photoUrl },
    select: {
        id: true,
        photoUrl: true,
    },
    });
    return updatedUser;
  }

  // atualizar senha
  static async updatePassword(userId: number, data: UpdatePasswordData) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }


  static async softDeleteAccount(userId: number) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        isDeleted: true,
        email: `deleted_${userId}_${Date.now()}@deleted.com`, // opcional: anonimizar
        name: 'Deleted User', // opcional: anonimizar
      },
    });
  }
  
  // ATIVAR MODO VENDEDOR
  static async toggleSellerMode(userId: number, data: SellerModeToggle) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        wantsToBeSeller: data.wantsToBeSeller,
      },
      select: {
        id: true,
        wantsToBeSeller: true,
        role: true,
        status: true,
      },
    });
    return updatedUser;
  }
  
}



export class UserUpdateService {
    static async updateProfile(userId: number, data: UserUpdateProfileData) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          city: true,
          postalCode: true,
          country: true,
          photoUrl: true,
          role: true,
          status: true,
        },
      });
      return updatedUser;
    }
  }
  