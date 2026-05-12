import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductService.getAllProducts(req.query);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) { next(error); }
};

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.getProductBySlug(req.params.slug as string);
    res.status(200).json({ status: 'success', data: { product } });
  } catch (error) { next(error); }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({ status: 'success', data: { product } });
  } catch (error) { next(error); }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.updateProduct(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: { product } });
  } catch (error) { next(error); }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProductService.deleteProduct(req.params.id as string);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) { next(error); }
};
