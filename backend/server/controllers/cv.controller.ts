import { FastifyRequest, FastifyReply } from 'fastify';
import * as cvService from '../services/cv.service';
import { ICV, ICVData } from '../models/cv.model';

export async function createCv(
  request: FastifyRequest<{ Body: { templateName: string; data: ICVData } }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const userId = request.user.id;
  const { templateName, data } = request.body;
  const newCv = await cvService.createCv(userId, templateName, data);
  reply.code(201).send(newCv);
}

export async function getCvs(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const cvs = await cvService.getCvsByUser(request.user.id);
  reply.send(cvs);
}

export async function getCvById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const cv = await cvService.getCvById(request.params.id);
  if (!cv || cv.userId.toString() !== request.user.id) {
    return reply.code(404).send({ message: 'CV not found or unauthorized' });
  }

  reply.send(cv);
}

export async function updateCv(
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<ICV> }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const cv = await cvService.getCvById(request.params.id);
  if (!cv || cv.userId.toString() !== request.user.id) {
    return reply.code(404).send({ message: 'CV not found or unauthorized' });
  }

  const updatedCv = await cvService.updateCv(request.params.id, request.body);
  reply.send(updatedCv);
}

export async function deleteCv(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const cv = await cvService.getCvById(request.params.id);
  if (!cv || cv.userId.toString() !== request.user.id) {
    return reply.code(404).send({ message: 'CV not found or unauthorized' });
  }

  await cvService.deleteCv(request.params.id);
  reply.send({ message: 'CV deleted successfully' });
}
