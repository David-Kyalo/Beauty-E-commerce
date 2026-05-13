import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

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

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', data: { user: req.user } });
  } catch (error) { next(error); }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ status: 'fail', message: 'Refresh token is required' });
    }
    const result = await AuthService.refreshAccessToken(refreshToken);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) { next(error); }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }
    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
  } catch (error) { next(error); }
};
