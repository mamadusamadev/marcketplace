
import { RequestHandler } from 'express';

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ message: 'Access denied: Admins only' });
    return;
  }
  next();
};
