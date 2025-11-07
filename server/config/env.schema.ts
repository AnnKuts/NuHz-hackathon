import { Static, Type } from '@sinclair/typebox';

export const envSchema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  MONGODB_URI: Type.String(),
  GOOGLE_CLIENT_ID: Type.String(),
  GOOGLE_CLIENT_SECRET: Type.String(),
  JWT_SECRET: Type.String(),
});

export type EnvSchema = Static<typeof envSchema>;