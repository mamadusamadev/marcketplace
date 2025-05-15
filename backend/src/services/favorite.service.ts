import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export class FavoriteService {
  // Adiciona um produto aos favoritos do usuário
  static async add(userId: number, productId: number) {
    return prisma.favorite.create({
      data: { userId, productId },
    });
  }

  // Remove um produto dos favoritos do usuário
  static async remove(userId: number, productId: number) {
    return prisma.favorite.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }

  // Lista todos os produtos favoritados por um usuário
  static async list(userId: number) {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            images: { select: { url: true } },
            category: { select: { id: true, name: true } },
          },
        },
      },
    });

    return favorites.map(fav => fav.product);
  }



  static async check(userId: number, productId: number): Promise<boolean> {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });
    return !!favorite;
  }
  
}
