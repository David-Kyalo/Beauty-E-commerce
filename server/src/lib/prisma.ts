import { PrismaClient } from '@prisma/client';
import { config } from '../config/config';

export const prisma = new PrismaClient({
  log: config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
