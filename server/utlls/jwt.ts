import * as jwt from 'jsonwebtoken';
import { EnvSchema } from '../config/env.schema';

export function generateToken(
  payload: { id: string; email: string },
  config: EnvSchema
): string {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(
  token: string,
  config: EnvSchema
): { id: string; email: string } {
  return jwt.verify(token, config.JWT_SECRET) as { id: string; email: string };
}
