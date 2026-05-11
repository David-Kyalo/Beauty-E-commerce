import { Router } from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', authenticate, isAdmin, createProduct);
router.put('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
