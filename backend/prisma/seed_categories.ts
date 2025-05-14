// prisma/seed_categories.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(): Promise<void> {
  const categories = [
    'Eletrônicos',
    'Moda',
    'Casa e Jardim',
    'Esportes',
    'Brinquedos',
    'Livros',
    'Informática',
    'Automóveis',
    'Música',
    'Beleza e Saúde',
  ];

  for (const name of categories) {
    await prisma.category.create({ data: { name } });
  }

  console.log('Categorias criadas com sucesso.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
