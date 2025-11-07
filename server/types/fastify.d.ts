import 'fastify';
import { EnvSchema } from '../config/env.schema';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchema;
  }
}
