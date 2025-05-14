// prisma/seed_cities.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const zones = await prisma.shippingZone.findMany();
  const zoneMap = Object.fromEntries(zones.map(z => [z.name, z.id]));

  const cities = [
    // Portugal
    { name: 'Porto', zone: 'Norte de Portugal' },
    { name: 'Braga', zone: 'Norte de Portugal' },
    { name: 'Aveiro', zone: 'Centro de Portugal' },
    { name: 'Coimbra', zone: 'Centro de Portugal' },
    { name: 'Lisboa', zone: 'Sul de Portugal' },
    { name: 'Faro', zone: 'Sul de Portugal' },
    { name: 'Funchal', zone: 'Ilhas (Madeira e Açores)' },
    { name: 'Ponta Delgada', zone: 'Ilhas (Madeira e Açores)' },

    // Espanha
    { name: 'Bilbao', zone: 'Norte de Espanha' },
    { name: 'Santander', zone: 'Norte de Espanha' },
    { name: 'Madrid', zone: 'Centro de Espanha' },
    { name: 'Toledo', zone: 'Centro de Espanha' },
    { name: 'Sevilha', zone: 'Sul de Espanha' },
    { name: 'Málaga', zone: 'Sul de Espanha' },
    { name: 'Las Palmas', zone: 'Ilhas Canárias' },
    { name: 'Santa Cruz de Tenerife', zone: 'Ilhas Canárias' },
  ];

  for (const { name, zone } of cities) {
    const zoneId = zoneMap[zone];
    if (zoneId) {
      await prisma.city.create({ data: { name, shippingZoneId: zoneId } });
    }
  }

  console.log('Cities seeded successfully');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
