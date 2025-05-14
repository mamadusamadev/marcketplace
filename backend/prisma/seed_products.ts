// prisma/seed_products.ts
import { PrismaClient, ProductCondition } from '@prisma/client';
const prisma = new PrismaClient();

async function main(): Promise<void> {
  const products = [
    {
      title: 'Smartphone Samsung Galaxy A14',
      description: 'Smartphone com 128GB de armazenamento, câmera tripla e bateria de longa duração.',
      price: 189.99,
      condition: ProductCondition.NEW,
      location: 'Lisboa',
      category: { connect: { id: 1 } },
      seller: { connect: { id: 1 } },
    },
    {
      title: 'Notebook Lenovo IdeaPad 3',
      description: 'Notebook com processador Ryzen 5, 8GB de RAM e SSD de 256GB.',
      price: 499.00,
      condition: ProductCondition.LIKE_NEW,
      location: 'Porto',
      category: { connect: { id: 1 } },
      seller: { connect: { id: 1 } },
    },
    {
      title: 'Tênis Nike Revolution 6',
      description: 'Tênis de corrida confortável com ótimo amortecimento.',
      price: 64.90,
      condition: ProductCondition.NEW,
      location: 'Braga',
      category: { connect: { id: 2 } },
      seller: { connect: { id: 1 } },
    },
    {
      title: 'Violão Acústico Giannini',
      description: 'Violão ideal para iniciantes, encordoamento de nylon e ótimo acabamento.',
      price: 120.00,
      condition: ProductCondition.GOOD,
      location: 'Coimbra',
      category: { connect: { id: 9 } },
      seller: { connect: { id: 1 } },
    },
    {
      title: 'Máquina de Café Dolce Gusto',
      description: 'Máquina de cápsulas com várias opções de bebidas quentes.',
      price: 75.50,
      condition: ProductCondition.ACCEPTABLE,
      location: 'Lisboa',
      category: { connect: { id: 3 } },
      seller: { connect: { id: 1 } },
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Produtos cadastrados com sucesso.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
