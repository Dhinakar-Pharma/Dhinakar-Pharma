import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'admin@dhinakar.com',
      password: passwordHash
    }
  });
  console.log("Root admin re-created: admin@dhinakar.com / password123");
}
main();
