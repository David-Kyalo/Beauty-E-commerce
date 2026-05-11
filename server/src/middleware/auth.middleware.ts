import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { config } from '../config/config';
import prisma from '../lib/prisma';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN';
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new AppError('Please log in to get access.', 401));

    const decoded = jwt.verify(token, config.jwtSecret) as any;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) return next(new AppError('User no longer exists.', 401));

    req.user = { id: user.id, email: user.email, role: user.role as 'CUSTOMER' | 'ADMIN' };
    next();
  } catch (error) {
    next(new AppError('Invalid token. Please log in again!', 401));
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') return next(new AppError('Admin role required.', 403));
  next();
};
