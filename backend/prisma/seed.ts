// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const zones = await prisma.shippingZone.createMany({
    data: [
      // Portugal
      { name: 'Norte de Portugal', country: 'Portugal', price: 3.50 },
      { name: 'Centro de Portugal', country: 'Portugal', price: 4.00 },
      { name: 'Sul de Portugal', country: 'Portugal', price: 4.50 },
      { name: 'Ilhas (Madeira e Açores)', country: 'Portugal', price: 6.00 },

      // Espanha
      { name: 'Norte de Espanha', country: 'Espanha', price: 4.00 },
      { name: 'Centro de Espanha', country: 'Espanha', price: 5.00 },
      { name: 'Sul de Espanha', country: 'Espanha', price: 5.50 },
      { name: 'Ilhas Canárias', country: 'Espanha', price: 7.00 },
    ],
  });

  console.log('Shipping zones seeded.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });