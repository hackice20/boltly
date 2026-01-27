import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

// Create Neon adapter with connection string
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

// Initialize Prisma client with Neon adapter
export const prisma = new PrismaClient({ adapter });

/**
 * Sync user from Clerk to database
 * Creates user if not exists, or updates existing
 */
export async function syncUser(userId: string, email: string | null, name: string | null): Promise<void> {
  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email,
        name,
      },
      create: {
        id: userId,
        email,
        name,
      },
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { projects: true },
  });
}
