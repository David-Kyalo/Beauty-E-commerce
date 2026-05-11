import prisma from '../lib/prisma';
import { AppError } from '../utils/AppError';
import { CartService } from './cart.service';

export class OrderService {
  static async createOrder(userId: string, data: any) {
    const { shippingAddress } = data;
    const cart = await CartService.getCart(userId);
    if (!cart.items || cart.items.length === 0) throw new AppError('Empty cart', 400);

    let totalAmount = 0;
    const orderItemsData = cart.items.map((item) => {
      totalAmount += Number(item.product.price) * item.quantity;
      if (item.product.stock < item.quantity) throw new AppError(`Not enough stock for ${item.product.name}`, 400);
      return { productId: item.productId, quantity: item.quantity, price: item.product.price };
    });

    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { userId, totalAmount, shippingAddress, status: 'PENDING', orderItems: { create: orderItemsData } },
        include: { orderItems: true },
      });

      await tx.payment.create({ data: { orderId: order.id, amount: totalAmount, status: 'PENDING', method: 'MPESA' } });

      for (const item of cart.items) {
        await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return order;
    });
  }

  static async getMyOrders(userId: string) {
    return prisma.order.findMany({ where: { userId }, include: { orderItems: { include: { product: true } }, payment: true }, orderBy: { createdAt: 'desc' } });
  }

  static async getOrderById(orderId: string, userId: string, isAdmin: boolean = false) {
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { orderItems: { include: { product: true } }, payment: true, user: { select: { name: true, email: true } } } });
    if (!order) throw new AppError('Order not found', 404);
    if (!isAdmin && order.userId !== userId) throw new AppError('Access denied', 403);
    return order;
  }

  static async updateOrderStatus(orderId: string, status: any) {
    return prisma.order.update({ where: { id: orderId }, data: { status } });
  }

  static async getAllOrders(query: any) {
    const { status, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({ where, include: { user: { select: { name: true, email: true } } }, orderBy: { createdAt: 'desc' }, skip, take: Number(limit) }),
      prisma.order.count({ where }),
    ]);

    return { orders, pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } };
  }
}
