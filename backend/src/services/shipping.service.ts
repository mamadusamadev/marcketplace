import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { ShippingZoneData ,CityData} from '../interfaces/shipping.types';

export class ShippingService {
  static async create(data: ShippingZoneData) {
    return prisma.shippingZone.create({ data });
  }

  static async list() {
    return prisma.shippingZone.findMany({ include: { cities: true } });
  }

  static async getById(id: number) {
    return prisma.shippingZone.findUnique({ where: { id }, include: { cities: true } });
  }

  static async update(id: number, data: ShippingZoneData) {
    return prisma.shippingZone.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.shippingZone.delete({ where: { id } });
  }

  // City methods
  static async createCity(data: CityData) {
    return prisma.city.create({ data });
  }

  static async deleteCity(id: number) {
    return prisma.city.delete({ where: { id } });
  }
}
