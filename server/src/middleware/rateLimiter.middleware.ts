import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: 'fail', message: 'Too many requests, please try again later' },
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { status: 'fail', message: 'Too many attempts, please try again later' },
});

export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { status: 'fail', message: 'Too many payment attempts, please try again later' },
});
