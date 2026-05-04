import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- STARTING DATABASE CLEANUP ---');
  
  // Order of deletion matters because of foreign keys
  const deleteOrderItems = await prisma.orderItem.deleteMany();
  console.log(`Deleted ${deleteOrderItems.count} order items.`);
  
  const deletePayments = await prisma.payment.deleteMany();
  console.log(`Deleted ${deletePayments.count} payments.`);
  
  const deleteOrders = await prisma.order.deleteMany();
  console.log(`Deleted ${deleteOrders.count} orders.`);
  
  console.log('--- CLEANUP COMPLETE ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
