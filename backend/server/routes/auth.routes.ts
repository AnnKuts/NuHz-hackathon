import { FastifyInstance } from 'fastify';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/user.controller';

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/google-login', authController.googleLogin);
  fastify.get('/me', { onRequest: [fastify.authenticate] }, userController.getCurrentUserProfile);
}

export default authRoutes;
