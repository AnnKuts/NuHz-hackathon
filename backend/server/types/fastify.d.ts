import { FastifyRequest, FastifyReply } from 'fastify';
import { EnvSchema } from '../config/env.schema';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchema;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
    };
  }
}
