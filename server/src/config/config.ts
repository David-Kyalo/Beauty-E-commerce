import dotenv from 'dotenv';
import { z } from 'zod';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the server root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = z.object({
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  REDIS_URL: z.string().optional(),
  MPESA_ENVIRONMENT: z.enum(['sandbox', 'production']).default('sandbox'),
  MPESA_CONSUMER_KEY: z.string(),
  MPESA_CONSUMER_SECRET: z.string(),
  MPESA_PASSKEY: z.string(),
  MPESA_SHORTCODE: z.string(),
  MPESA_CALLBACK_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(envVars.error.format(), null, 2));
  process.exit(1);
}

export const config = {
  port: parseInt(envVars.data.PORT, 10),
  dbUrl: envVars.data.DATABASE_URL,
  jwtSecret: envVars.data.JWT_SECRET,
  nodeEnv: envVars.data.NODE_ENV,
  frontendUrl: envVars.data.FRONTEND_URL,
  redis: {
    url: envVars.data.REDIS_URL,
  },
  mpesa: {
    environment: envVars.data.MPESA_ENVIRONMENT,
    consumerKey: envVars.data.MPESA_CONSUMER_KEY,
    consumerSecret: envVars.data.MPESA_CONSUMER_SECRET,
    passKey: envVars.data.MPESA_PASSKEY,
    shortCode: envVars.data.MPESA_SHORTCODE,
    callbackUrl: envVars.data.MPESA_CALLBACK_URL,
    baseUrl: envVars.data.MPESA_ENVIRONMENT === 'sandbox' 
      ? 'https://sandbox.safaricom.co.ke' 
      : 'https://api.safaricom.co.ke',
  },
  google: {
    clientId: envVars.data.GOOGLE_CLIENT_ID,
    clientSecret: envVars.data.GOOGLE_CLIENT_SECRET,
    callbackUrl: envVars.data.GOOGLE_CALLBACK_URL,
  },
  logLevel: envVars.data.LOG_LEVEL,
};
