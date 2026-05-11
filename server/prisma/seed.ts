import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Face',
        slug: 'face',
        description: 'Foundation, concealer, powder, blush and more for a flawless face.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Eyes',
        slug: 'eyes',
        description: 'Eyeshadow palettes, mascara, eyeliner and brow products.',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Lips',
        slug: 'lips',
        description: 'Lipstick, lip gloss, lip liner and lip care products.',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Skin Care',
        slug: 'skin-care',
        description: 'Cleansers, serums, moisturizers, masks and sunscreen for healthy skin.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
      },
    }),
  ]);

  const [face, eyes, lips, skinCare] = categories;

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Maybelline Fit Me Matte Poreless Foundation',
        slug: 'maybelline-fit-me-foundation',
        description: 'A lightweight, oil-free foundation that blurs pores and absorbs oil for a natural, poreless-looking finish.',
        price: 2400,
        images: JSON.stringify(['https://images.unsplash.com/photo-1631214524115-60a29ff6f7c2?auto=format&fit=crop&q=80&w=600']),
        stock: 25,
        categoryId: face.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Ordinary Niacinamide 10% + Zinc 1%',
        slug: 'ordinary-niacinamide-zinc',
        description: 'A high-strength vitamin and mineral blemish formula.',
        price: 2200,
        images: JSON.stringify(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600']),
        stock: 45,
        categoryId: skinCare.id,
      },
    }),
  ]);

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
