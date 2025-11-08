import { FastifyInstance } from 'fastify';
import * as cvController from '../controllers/cv.controller';

async function cvRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate);

  fastify.post('/', cvController.createCv);
  fastify.get('/', cvController.getCvs);
  fastify.get('/:id', cvController.getCvById);
  fastify.put('/:id', cvController.updateCv);
  fastify.delete('/:id', cvController.deleteCv);
}

export default cvRoutes;