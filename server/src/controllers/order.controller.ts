import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';

export const createOrder = async (req: any, res: Response, next: NextFunction) => {
  try {
    const order = await OrderService.createOrder(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: { order } });
  } catch (error) { next(error); }
};

export const getMyOrders = async (req: any, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.getMyOrders(req.user.id);
    res.status(200).json({ status: 'success', data: { orders } });
  } catch (error) { next(error); }
};

export const getOrderById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const order = await OrderService.getOrderById(req.params.id, req.user.id, isAdmin);
    res.status(200).json({ status: 'success', data: { order } });
  } catch (error) { next(error); }
};
