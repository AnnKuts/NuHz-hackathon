import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';
import * as userService from '../services/user.service';
import { IUser } from '../models/user.model';


interface AuthRequest<T extends RouteGenericInterface = RouteGenericInterface>
  extends FastifyRequest<T> {
  user: {
    id: string;
    email: string;
  };
}


export async function getCurrentUserProfile(
  request: AuthRequest,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const user = await userService.getUserById(userId);
  if (!user) {
    return reply.code(404).send({ message: 'User not found' });
  }

  const publicUserData = user.toObject();
  delete publicUserData.googleId;
  reply.send(publicUserData);
}

export async function updateProfile(
  request: AuthRequest<{ Body: Partial<IUser> }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const updates = request.body;
  const updatedUser = await userService.updateUserProfile(userId, updates);
  if (!updatedUser) {
    return reply.code(404).send({ message: 'User not found' });
  }
  reply.send(updatedUser);
}

export async function deleteCurrentUser(request: AuthRequest, reply: FastifyReply) {
  const userId = request.user.id;
  const deletedUser = await userService.deleteUser(userId);
  if (!deletedUser) {
    return reply.code(404).send({ message: 'User not found' });
  }

  reply.send({ message: 'User and associated data deleted successfully' });
}

export async function addInterviewResult(
  request: AuthRequest<{ Body: { score: number; feedback: string } }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const { score, feedback } = request.body;
  const updatedUser = await userService.addInterviewResult(userId, score, feedback);
  if (!updatedUser) {
    return reply.code(404).send({ message: 'User not found' });
  }
  reply.send(updatedUser);
}

export async function addQuizResult(
  request: AuthRequest<{ Body: { quizName: string; score: number } }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const { quizName, score } = request.body;
  const updatedUser = await userService.addQuizResult(userId, quizName, score);
  if (!updatedUser) {
    return reply.code(404).send({ message: 'User not found' });
  }
  reply.send(updatedUser);
}

export async function updateAnalyticsOptIn(
  request: AuthRequest<{ Body: { optIn: boolean } }>,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const { optIn } = request.body;
  const updatedUser = await userService.updateOptInAnalytics(userId, optIn);
  if (!updatedUser) {
    return reply.code(404).send({ message: 'User not found' });
  }
  reply.send(updatedUser);
}