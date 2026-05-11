import prisma from '../lib/prisma';
import { cacheable, cacheDelete, cacheDeletePattern } from '../cache/cache';
import { AppError } from '../utils/AppError';

export class ProductService {
  static async getAllProducts(query: any) {
    const { category, search, sort, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const cacheKey = `products:${JSON.stringify({ category, search, sort, page, limit })}`;

    return cacheable(cacheKey, 300, async () => {
      const where: any = {
        ...(category && { category: { slug: String(category) } }),
        ...(search && {
          OR: [{ name: { contains: String(search) } }, { description: { contains: String(search) } }],
        }),
      };

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: { category: true },
          orderBy: {
            ...(sort === 'newest' && { createdAt: 'desc' }),
            ...(sort === 'price_asc' && { price: 'asc' }),
            ...(sort === 'price_desc' && { price: 'desc' }),
            ...(!sort && { createdAt: 'desc' }),
          },
          skip,
          take: Number(limit),
        }),
        prisma.product.count({ where }),
      ]);

      return { products, pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } };
    });
  }

  static async getProductBySlug(slug: string) {
    return cacheable(`product:${slug}`, 600, async () => {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true, reviews: { include: { user: true } } },
      });
      if (!product) throw new AppError('Product not found', 404);
      return product;
    });
  }

  static async createProduct(data: any) {
    const product = await prisma.product.create({ data });
    await cacheDeletePattern('products:*');
    return product;
  }

  static async updateProduct(id: string, data: any) {
    const product = await prisma.product.update({ where: { id }, data });
    await cacheDelete(`product:${product.slug}`);
    await cacheDeletePattern('products:*');
    return product;
  }

  static async deleteProduct(id: string) {
    const product = await prisma.product.delete({ where: { id } });
    await cacheDelete(`product:${product.slug}`);
    await cacheDeletePattern('products:*');
    return product;
  }
}
