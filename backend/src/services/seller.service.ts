import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { 
    SellerApplicationData ,
    VerifySellerData,
    AdminSellerListItem,
    SellerPublicProfile
} from '../interfaces/seller.types';

export class SellerService {
    static async submitSellerApplication(userId: number, data: SellerApplicationData, documentUrl: string) {
      const existing = await prisma.seller.findUnique({ where: { userId } });
      if (existing) {
        throw new Error('You already have a seller application');
      }
  
      const slug = `${data.fullName.toLowerCase().replace(/\s+/g, '-')}-${userId}`;
  
      const seller = await prisma.seller.create({
        data: {
          userId,
          slug,
          documentId: data.documentId,
          documentUrl,
          iban: data.iban,
        },
        select: {
          id: true,
          status: true,
          verificationStatus: true,
          slug: true,
          documentUrl: true,
          documentId:true,
          iban:true
        },
      });
  
      return seller;
    }

   // Listar vendedores pendente
    static async listPendingSellers() {
        return prisma.seller.findMany({
          where: { verificationStatus: 'PENDING' },
          include: { 
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone:true,
                    city:true,
                    postalCode:true,
                    country:true,
                    address:true,
                    photoUrl:true,
                    role:true,
                    status:true,
                    createdAt:true,
                    
                }
            } ,

        },
        });
    }

    // Verificar vendedor
    static async verifySeller(id: number, data: VerifySellerData) {
        const seller = await prisma.seller.update({
          where: { id },
          data: {
            status: data.status,
            verificationStatus: data.verificationStatus,
            verificationDate: new Date(),
            rejectionReason: data.rejectionReason,
          },
        });
    
        if (data.verificationStatus === 'VERIFIED') {
          await prisma.user.update({ where: { id: seller.userId }, data: { role: 'SELLER' } });
        }
    
        return seller;
      }

      static async listAdminSellers(): Promise<AdminSellerListItem[]> {
        const sellers = await prisma.seller.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone:true,
                city:true,
                postalCode:true,
                country:true,
                address:true,
                photoUrl:true,
                role:true,
                status:true,
                createdAt:true,
                products: true,

              },
            },
          },
        });
    
        return sellers.map(s => ({
          id: s.id,
          slug: s.slug,
          fullName: s.user.name,
          email: s.user.email,
          city: s.user.city,
          country: s.user.country,
          status: s.status,
          verificationStatus: s.verificationStatus,
          createdAt: s.user.createdAt.toISOString(),
          productsCount: s.user.products.length,
        }));
      }

      static async getPublicProfile(slug: string): Promise<SellerPublicProfile | null> {
        const seller = await prisma.seller.findUnique({
          where: { slug},

         
          include: {
            user: {
              select: {
                name: true,
                city: true,
                country: true,
                photoUrl: true,
                
                createdAt: true,
              },
            },
          },
        });
    
        if (!seller || seller.status !== 'ACTIVE' || seller.verificationStatus !== 'VERIFIED') {
          return null;
        }
    
        return {
          id: seller.id,
          slug: seller.slug,
          fullName: seller.user.name,
          city: seller.user.city,
          country: seller.user.country,
          photoUrl: seller.user.photoUrl,
          createdAt: seller.user.createdAt.toISOString(),
          verificationStatus:seller.verificationStatus,
          status:seller.status
        };
      }
  }
  