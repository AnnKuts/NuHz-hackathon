import { FastifyEnvOptions } from '@fastify/env';
import { envSchema } from './env.schema';

export const envOptions: FastifyEnvOptions = {
  confKey: 'config',
  schema: envSchema,
  dotenv: true,
  data: process.env,
};