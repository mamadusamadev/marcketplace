// src/middlewares/isSellerVerifiedOrAdmin.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from 'express';

export const isSellerVerifiedOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (user.role === 'ADMIN') {
    next();
    return;
  }

  if (user.role === 'SELLER') {
    const seller = await prisma.seller.findUnique({ where: { userId: user.userId } });
    if (!seller || seller.status !== 'ACTIVE' || seller.verificationStatus !== 'VERIFIED') {
      res.status(403).json({ message: 'Seller not verified or inactive' });
      return;
    }
    next();
    return;
  }

  res.status(403).json({ message: 'Access denied: Only verified sellers or admin allowed' });
};
