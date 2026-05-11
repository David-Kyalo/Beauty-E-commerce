import { Router } from 'express';
import prisma from '../lib/prisma';
import { cacheable } from '../cache/cache';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await cacheable('categories:all', 3600, () => prisma.category.findMany());
    res.json({ status: 'success', data: { categories } });
  } catch (error) { next(error); }
});

export default router;
