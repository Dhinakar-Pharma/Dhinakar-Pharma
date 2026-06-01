import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial admin user...');
  
  const username = 'admin';
  const plainPassword = 'password123';
  
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username }
  });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plainPassword, salt);

  await prisma.adminUser.create({
    data: {
      username,
      password: passwordHash
    }
  });

  console.log('Admin user created successfully.');
  console.log(`Username: ${username}`);
  console.log(`Password: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
