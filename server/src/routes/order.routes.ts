import { Router } from 'express';
import { createOrder, getMyOrders, getOrderById } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/me', getMyOrders);
router.get('/:id', getOrderById);

export default router;
