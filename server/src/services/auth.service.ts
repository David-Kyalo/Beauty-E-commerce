import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { config } from '../config/config';
import { AppError } from '../utils/AppError';

export class AuthService {
  static async generateToken(user: any) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
  }

  static async register(data: any) {
    const { email, password, name } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, password: hashedPassword, name, role: 'CUSTOMER' } });

    const token = await this.generateToken(user);
    return { user, token };
  }

  static async login(data: any) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = await this.generateToken(user);
    return { user, token };
  }

  static async googleLogin(data: any) {
    const { email, name, image } = data;
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({ data: { email, name, image, role: 'CUSTOMER' } });
    }

    const token = await this.generateToken(user);
    return { user, token };
  }
}
