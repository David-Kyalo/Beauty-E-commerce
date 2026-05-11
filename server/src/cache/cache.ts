import redis from './redis';
import logger from '../utils/logger';

export const cacheSet = async (key: string, value: any, ttlSeconds: number = 3600) => {
  if (!redis || redis.status !== 'ready') return;
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (error) {
    logger.error(`Cache set error for ${key}:`, error);
  }
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  if (!redis || redis.status !== 'ready') return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Cache get error for ${key}:`, error);
    return null;
  }
};

export const cacheDelete = async (key: string) => {
  if (!redis || redis.status !== 'ready') return;
  try {
    await redis.del(key);
  } catch (error) {
    logger.error(`Cache delete error for ${key}:`, error);
  }
};

export const cacheDeletePattern = async (pattern: string) => {
  if (!redis || redis.status !== 'ready') return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  } catch (error) {
    logger.error(`Cache delete pattern error for ${pattern}:`, error);
  }
};

export const cacheable = async <T>(
  key: string,
  ttl: number,
  fetchFn: () => Promise<T>
): Promise<T> => {
  const cached = await cacheGet<T>(key);
  if (cached) return cached;

  const freshData = await fetchFn();
  await cacheSet(key, freshData, ttl);
  return freshData;
};
