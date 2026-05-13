import { Router } from 'express';
import { register, login, googleLogin, getMe, refreshToken, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/google', authLimiter, googleLogin);
router.post('/refresh', authLimiter, refreshToken);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

export default router;
