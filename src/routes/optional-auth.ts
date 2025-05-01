import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const optionalAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const jwtSecret = process.env.JWT_SECRET ?? '';
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (error, user) => {
      if (error) {
        console.log('Invalid token:', error.message);
      } else {
        req.user = user;
      }

      next();
    });
  } else {
    next();
  }
};
