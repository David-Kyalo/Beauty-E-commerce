import { Request, Response, NextFunction } from 'express';
import { CartService } from '../services/cart.service';

export const getCart = async (req: any, res: Response, next: NextFunction) => {
  try {
    const cart = await CartService.getCart(req.user.id);
    res.status(200).json({ status: 'success', data: { cart } });
  } catch (error) { next(error); }
};

export const addItemToCart = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;
    const item = await CartService.addItem(req.user.id, productId, quantity);
    res.status(200).json({ status: 'success', data: { item } });
  } catch (error) { next(error); }
};

export const updateCartItem = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const item = await CartService.updateItem(req.user.id, itemId, quantity);
    res.status(200).json({ status: 'success', data: { item } });
  } catch (error) { next(error); }
};

export const removeCartItem = async (req: any, res: Response, next: NextFunction) => {
  try {
    await CartService.removeItem(req.user.id, req.params.itemId);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) { next(error); }
};

export const clearCart = async (req: any, res: Response, next: NextFunction) => {
  try {
    await CartService.clearCart(req.user.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) { next(error); }
};
