import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.adminUser.deleteMany();
  console.log("Deleted all admins");
}
main();
