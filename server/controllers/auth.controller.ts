import { FastifyRequest, FastifyReply } from 'fastify';
import * as authService from '../services/auth.service';
import { User } from '../models/user.model';
import { env } from '../config/env.schema';

interface GoogleAuthRequestBody {
  googleId: string;
  email: string;
  fullName: string;
  profilePicture?: string;
}

export async function googleLogin(
  request: FastifyRequest<{ Body: GoogleAuthRequestBody }>,
  reply: FastifyReply
) {
  const { googleId, email, fullName, profilePicture } = request.body;

  if (!googleId || !email || !fullName) {
    return reply.code(400).send({ message: 'Missing required Google OAuth data' });
  }

  const user = await authService.findOrCreateUser(googleId, email, fullName, profilePicture);
  const token = authService.createAuthToken(user, env.JWT_SECRET);

  reply.send({
    token,
    user: { id: user._id, email: user.email, fullName: user.fullName },
  });
}

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user?.id;
  if (!userId) {
    return reply.code(401).send({ message: 'Unauthorized' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return reply.code(404).send({ message: 'User not found' });
  }

  reply.send({ user });
}
