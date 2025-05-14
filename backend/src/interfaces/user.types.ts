import { Role, UserStatus } from '@prisma/client';
import { string } from 'joi';


export interface UserProfileResponse {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: UserStatus;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    postalCode?: string | null;
    country?: string | null;
    photoUrl?: string | null;
    addresses: any[]; 
}

export interface UserUpdateProfileData {
    name?: string;
    phone?: string;
    address?: string; 
    city?: string;
    postalCode?: string;
    country?: string;
}

export interface UpdatePasswordData {
    currentPassword: string;
    newPassword: string;
  }
  

export interface SellerModeToggle {
wantsToBeSeller: boolean;
}