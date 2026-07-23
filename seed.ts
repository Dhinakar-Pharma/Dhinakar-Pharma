import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoProduct = {
  name: 'Dhinakar Demo Product',
  price: 100,
  category: 'Pharmaceutical & Healthcare',
  focus: 'Demo Sample / Gateway Verification',
  tagline: 'Active Sample Product for Gateway & Store Testing',
  description: 'This is an active demo product configured for testing store operations, ordering workflows, and Razorpay payment gateway integration while new product catalog lines are being updated.',
  images: ['/demo-product.png'],
  benefits: [
    'Verifies Checkout & Order Processing',
    'Razorpay Gateway Integration Ready',
    'Real-time Stock & Order Testing',
    '100% Active Operational Sample'
  ],
  nutrition: [
    { component: 'Sample Spec', amount: '1 Unit' },
    { component: 'Quantity', amount: '1 Box / Bottle' }
  ],
  ingredients: ['Demo Testing Compound'],
  faq: [
    {
      question: 'Why is this product active?',
      answer: 'This demo item guarantees that your cart, ordering system, and Razorpay gateway function continuously without errors while updating product inventory.'
    }
  ]
};

async function main() {
  console.log('Clearing old products & order items from database...');
  try {
    await prisma.orderItem.deleteMany({});
  } catch (e) {
    console.error('OrderItem cleanup note:', e);
  }

  await prisma.product.deleteMany({});
  console.log('Old products cleared.');

  console.log('Seeding Demo Product...');
  const created = await prisma.product.create({
    data: demoProduct
  });
  console.log(`Successfully added demo product: ${created.name} (ID: ${created.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

