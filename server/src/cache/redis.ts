import Redis from 'ioredis';
import { config } from '../config/config';
import logger from '../utils/logger';

let redis: Redis | null = null;

if (config.redis.url && config.redis.url !== 'disabled') {
  redis = new Redis(config.redis.url, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: (times) => {
      if (times > 3) return null; // Stop retrying after 3 attempts
      return Math.min(times * 100, 2000);
    },
  });

  redis.on('connect', () => logger.info('Connected to Redis'));
  redis.on('error', (err) => {
    if (redis?.status === 'reconnecting') {
      // Quietly handle connection failures
    } else {
      logger.warn('Redis is unavailable. Caching disabled.');
    }
  });
}

export default redis;
