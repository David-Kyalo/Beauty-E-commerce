import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/config';
import { errorHandler } from './middleware/error.middleware';
import { apiLimiter } from './middleware/rateLimiter.middleware';
import logger from './utils/logger';

// Route imports (to be created)
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import cartRoutes from './routes/cart.routes';
import paymentRoutes from './routes/payment.routes';
import categoryRoutes from './routes/category.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use('/api', apiLimiter);
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/', (req, res) => res.status(200).json({ status: 'success', message: 'Welcome to Peachy Cherie API', documentation: 'Coming soon' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'success', message: 'Healthy', timestamp: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments/mpesa', paymentRoutes);
app.use('/api/categories', categoryRoutes);

app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

const PORT = config.port || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));

export default app;
