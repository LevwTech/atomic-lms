import { Request } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';

export default function getUserFromRequest(req: Request) {
  return (req as AuthRequest).user;
}
