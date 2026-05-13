import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../lib/prisma';
import { config } from '../config/config';
import { AppError } from '../utils/AppError';

export class AuthService {
  // Short-lived access token (1 hour)
  static async generateAccessToken(user: any) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  // Long-lived refresh token (7 days), stored in DB for revocation
  static async generateRefreshToken(userId: string) {
    const token = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.refreshToken.create({
      data: { token, userId, expiresAt },
    });

    return token;
  }

  static async register(data: any) {
    const { email, password, name } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, password: hashedPassword, name, role: 'CUSTOMER' } });

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);
    return { user, token: accessToken, refreshToken };
  }

  static async login(data: any) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);
    return { user, token: accessToken, refreshToken };
  }

  static async googleLogin(data: any) {
    const { email, name, image } = data;
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({ data: { email, name, image, role: 'CUSTOMER' } });
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);
    return { user, token: accessToken, refreshToken };
  }

  static async refreshAccessToken(refreshTokenValue: string) {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshTokenValue },
      include: { user: true },
    });

    if (!storedToken) throw new AppError('Invalid refresh token', 401);
    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new AppError('Refresh token expired. Please log in again.', 401);
    }

    const newAccessToken = await this.generateAccessToken(storedToken.user);
    return { token: newAccessToken, user: storedToken.user };
  }

  static async logout(refreshTokenValue: string) {
    // Delete the specific refresh token (revoke session)
    await prisma.refreshToken.deleteMany({ where: { token: refreshTokenValue } });
  }

  static async logoutAll(userId: string) {
    // Delete all refresh tokens for the user (revoke all sessions)
    await prisma.refreshToken.deleteMany({ where: { userId } });
  }
}
