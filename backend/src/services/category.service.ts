import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { CategoryData } from '../interfaces/category.types';

export class CategoryService {
  static async create(data: CategoryData) {
    return prisma.category.create({ data });
  }

  static async list() {
    return prisma.category.findMany();
  }

  static async update(id: number, data: CategoryData) {
    return prisma.category.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  }
}