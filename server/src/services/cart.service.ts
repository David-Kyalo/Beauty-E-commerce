import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';

export class CartService {
  static async getCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) cart = await prisma.cart.create({ data: { userId }, include: { items: { include: { product: true } } } });
    return cart;
  }

  static async addItem(userId: string, productId: string, quantity: number = 1) {
    const cart = await this.getCart(userId);
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Product not found', 404);
    if (product.stock < quantity) throw new AppError('Not enough stock', 400);

    return prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId: cart.id, productId, quantity },
    });
  }

  static async updateItem(userId: string, itemId: string, quantity: number) {
    const cart = await this.getCart(userId);
    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id }, include: { product: true } });
    if (!item) throw new AppError('Cart item not found', 404);
    if (item.product.stock < quantity) throw new AppError('Not enough stock', 400);

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
      return null;
    }
    return prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  }

  static async removeItem(userId: string, itemId: string) {
    const cart = await this.getCart(userId);
    return prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
  }

  static async clearCart(userId: string) {
    const cart = await this.getCart(userId);
    return prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
}
