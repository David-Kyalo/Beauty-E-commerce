import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) { next(error); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) { next(error); }
};

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.googleLogin(req.body);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) { next(error); }
};

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', data: { user: req.user } });
  } catch (error) { next(error); }
};
