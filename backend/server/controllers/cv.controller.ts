import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';
import * as cvService from '../services/cv.service';
import { ICV,ICVData } from '../models/cv.model';

interface AuthRequest<T extends RouteGenericInterface = RouteGenericInterface>
  extends FastifyRequest<T> {
  user: {
    id: string;
    email: string;
  };
}

export async function createCv(
  request: AuthRequest<{ Body: { templateName: string; data: ICVData } }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const { templateName, data } = request.body;
  const newCv = await cvService.createCv(userId, templateName, data);
  reply.code(201).send(newCv);
}

export async function getCvs(request: AuthRequest, reply: FastifyReply) {
  const userId = request.user.id;
  const cvs = await cvService.getCvsByUser(userId);
  reply.send(cvs);
}

export async function getCvById(
  request: AuthRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const cvId = request.params.id;
  const cv = await cvService.getCvById(cvId);

  if (!cv || cv.userId.toString() !== userId) {
    return reply.code(404).send({ message: 'CV not found or unauthorized' });
  }
  reply.send(cv);
}

export async function updateCv(
  request: AuthRequest<{ Params: { id: string }; Body: Partial<ICV> }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const cvId = request.params.id;
  const updates = request.body;

  const existingCv = await cvService.getCvById(cvId);
  if (!existingCv || existingCv.userId.toString() !== userId) {
    return reply.code(404).send({ message: 'CV not found or unauthorized' });
  }

  const updatedCv = await cvService.updateCv(cvId, updates);
  reply.send(updatedCv);
}

export async function deleteCv(
  request: AuthRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const cvId = request.params.id;

  const existingCv = await cvService.getCvById(cvId);
  if (!existingCv || existingCv.userId.toString() !== userId) {
    return reply.code(404).send({ message: 'CV not found or unauthorized' });
  }

  await cvService.deleteCv(cvId);
  reply.send({ message: 'CV deleted successfully' });
}