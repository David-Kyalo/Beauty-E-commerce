import { Router } from 'express';
import { initiatePayment, mpesaCallback } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';
import { paymentLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

router.post('/stkpush', authenticate, paymentLimiter, initiatePayment);
router.post('/callback', mpesaCallback);

export default router;
