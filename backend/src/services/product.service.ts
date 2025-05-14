import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//import { uploadBufferToS3 } from '../utils/uploadToS3';
import  {uploadFileToS3 } from "../utils/s3Uploader"
import { ProductData } from '../interfaces/product.types';
import { ProductCondition } from '@prisma/client';


export class ProductService {

  static async create(userId: number, data: ProductData, files: Express.Multer.File[]) {
    const seller = await prisma.seller.findUnique({
      where: { userId },
      select: { id: true }
    });
    
    if (!seller) throw new Error('Seller not found');
    
    const product = await prisma.product.create({
      data: {
        ...data,
        sellerId: seller.id
      }
    });
    

    for (const file of files) {
      const url = await uploadFileToS3(file);
      await prisma.productImage.create({
        data: {
          url,
          productId: product.id,
        },
      });
    }

    return product;
  }

  static async listBySeller(userId: number) {
    const seller = await prisma.seller.findUnique({
      where: { userId },
      select: { id: true, verificationStatus: true, user: { select: {
        name: true, city: true, address: true, photoUrl: true, country: true
      } } }
    });
  
    if (!seller) return [];
  
    const products = await prisma.product.findMany({
      where: { sellerId: seller.id },
      include: {
        category: { select: { id: true, name: true } },
        images: { select: { url: true } }
      }
    });
  
    return products.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      location: p.location,
      price: Number(p.price),
      condition: p.condition,
      active: p.active,
      createdAt: p.createdAt,
      category: p.category,
      images: p.images.map(img => img.url) ,
      seller: {
        id: seller.id,
        verificationStatus: seller.verificationStatus,
        name: seller.user.name,
        city: seller.user.city,
        address: seller.user.address,
        country: seller.user.country,
        photoUrl: seller.user.photoUrl,
      },
    }));
  }

 


static async filterProducts(filters: {
  minPrice: number;
  maxPrice: number;
  orderBy?: string;
  location?: string;
  category?:string;
  condition?: ProductCondition;
}) {
  const orderByClause: Prisma.ProductOrderByWithRelationInput | undefined = (() => {
    switch (filters.orderBy) {
      case 'latest':
        return { createdAt: 'desc' as const };
      case 'price_asc':
        return { price: 'asc' as const };
      case 'price_desc':
        return { price: 'desc' as const };
      default:
        return undefined;
    }
  })();
  

  return prisma.product.findMany({
    where: {
      active: true,
      price: { gte: filters.minPrice, lte: filters.maxPrice },
      location: filters.location ? { contains: filters.location } : undefined,
      condition: filters.condition,
      seller: {
        seller: {
          is: {
            verificationStatus: 'VERIFIED',
            status: 'ACTIVE',
          },
        },
      },
      category: filters.category
      ? {
          is: {
            name: filters.category,
          },
        }
      : undefined,
    

    },
      orderBy: orderByClause,

    include: {
      images: { select: { url: true } },
      category: { select: { id: true, name: true } },
    },
  });
}

  

  static async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { select: { url: true } },

        seller: { // isso é um User
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
            photoUrl: true,
          },
        },
      },
    });
    
    if (!product) return null;
    
    const seller = await prisma.seller.findUnique({
      where: { userId: product.seller.id },
      select: {
        id: true,
        status: true,
        verificationStatus: true,
      },
    });
    
  
  
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      condition: product.condition,
      location: product.location,
      active: product.active,
      createdAt: product.createdAt,
      category: product.category,
      images: product.images.map((img) => img.url),
      seller: {
        id: seller?.id ?? null,
        verificationStatus: seller?.verificationStatus ?? null,
        status: seller?.status ?? null,
        name: product.seller.name,
        city: product.seller.city,
        country: product.seller.country,
        photoUrl: product.seller.photoUrl,
      }
    };
  }
  

  static async update(id: number, userId: number, data: any, files: Express.Multer.File[]) {
    console.log('🟡 DATA ENVIADA PARA UPDATE:', data);

    const updatedProduct = await prisma.product.update({
      where: { id, sellerId: userId },
      data,
    });

    for (const file of files) {
      const url = await uploadFileToS3(file);
      await prisma.productImage.create({
        data: {
          url,
          productId: updatedProduct.id,
        },
      });
    }

    return updatedProduct;
  }

  static async delete(id: number, userId: number) {
    return prisma.product.delete({ where: { id, sellerId: userId } });
  }


}
