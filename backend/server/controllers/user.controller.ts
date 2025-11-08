import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from '../services/user.service';
import { IUser } from '../models/user.model';

export async function getCurrentUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const user = await userService.getUserById(request.user.id);
  if (!user) return reply.code(404).send({ message: 'User not found' });

  const publicUserData = { ...user } as any;
  delete publicUserData.googleId;

  reply.send(publicUserData);
}

export async function updateProfile(
  request: FastifyRequest<{ Body: Partial<IUser> }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const updatedUser = await userService.updateUserProfile(request.user.id, request.body);
  if (!updatedUser) return reply.code(404).send({ message: 'User not found' });

  reply.send(updatedUser);
}

export async function deleteCurrentUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const deletedUser = await userService.deleteUser(request.user.id);
  if (!deletedUser) return reply.code(404).send({ message: 'User not found' });

  reply.send({ message: 'User and associated data deleted successfully' });
}

export async function addInterviewResult(
  request: FastifyRequest<{ Body: { score: number; feedback: string } }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const updatedUser = await userService.addInterviewResult(
    request.user.id,
    request.body.score,
    request.body.feedback
  );
  if (!updatedUser) return reply.code(404).send({ message: 'User not found' });

  reply.send(updatedUser);
}

export async function addQuizResult(
  request: FastifyRequest<{ Body: { quizName: string; score: number } }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const updatedUser = await userService.addQuizResult(
    request.user.id,
    request.body.quizName,
    request.body.score
  );
  if (!updatedUser) return reply.code(404).send({ message: 'User not found' });

  reply.send(updatedUser);
}

export async function updateAnalyticsOptIn(
  request: FastifyRequest<{ Body: { optIn: boolean } }>,
  reply: FastifyReply
) {
  if (!request.user) return reply.code(401).send({ message: 'Unauthorized' });

  const updatedUser = await userService.updateOptInAnalytics(
    request.user.id,
    request.body.optIn
  );
  if (!updatedUser) return reply.code(404).send({ message: 'User not found' });

  reply.send(updatedUser);
}
