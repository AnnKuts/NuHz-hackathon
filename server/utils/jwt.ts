import jwt from 'jsonwebtoken';

export function generateToken(
  payload: { id: string; email: string },
  jwtSecret: string
): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

export function verifyToken(
  token: string,
  jwtSecret: string
): { id: string; email: string } {
  return jwt.verify(token, jwtSecret) as { id: string; email: string };
}