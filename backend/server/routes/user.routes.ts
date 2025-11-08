import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/user.controller';

async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get('/', userController.getCurrentUserProfile);
  fastify.put('/', userController.updateProfile);
  fastify.delete('/', userController.deleteCurrentUser);
  fastify.post('/interview-results', userController.addInterviewResult);
  fastify.post('/quiz-results', userController.addQuizResult);
  fastify.put('/analytics-opt-in', userController.updateAnalyticsOptIn);
}

export default userRoutes;