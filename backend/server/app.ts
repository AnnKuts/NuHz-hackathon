import fastify from 'fastify';
import cors from '@fastify/cors';
import env from '@fastify/env';
import dbPlugin from './plugins/db.plugin';
import authPlugin from './plugins/auth.plugin';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cvRoutes from './routes/cv.routes';
import { envOptions } from './config';

export async function buildApp() {
  const app = fastify({
    logger: true,
  });

  await app.register(env, envOptions);
  await app.register(cors, {
    origin: '*',
  });
  await app.register(dbPlugin);
  await app.register(authPlugin);

  app.register(authRoutes, { prefix: '/auth' });
  app.register(userRoutes, { prefix: '/users' });
  app.register(cvRoutes, { prefix: '/cvs' });

  app.get('/', async (request, reply) => {
    reply.send({ message: 'Welcome to Student Career MVP' });
  });

  return app;
}