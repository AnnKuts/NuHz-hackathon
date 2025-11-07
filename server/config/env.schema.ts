import { Static, Type } from '@sinclair/typebox';
import { config } from 'dotenv';

config();

export const envSchema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  MONGODB_URI: Type.String(),
  GOOGLE_CLIENT_ID: Type.String(),
  GOOGLE_CLIENT_SECRET: Type.String(),
  JWT_SECRET: Type.String(),
});

export type EnvSchema = Static<typeof envSchema>;

export const env: EnvSchema = {
  PORT: Number(process.env.PORT) || 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
};