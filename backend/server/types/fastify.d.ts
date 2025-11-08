import 'backend/server/types/fastify';
import { EnvSchema } from '../config/env.schema';

declare module 'backend/server/types/fastify' {
  interface FastifyInstance {
    config: EnvSchema;
  }
}
