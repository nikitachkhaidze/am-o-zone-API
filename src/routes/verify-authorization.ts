import {RequestHandler} from "express";
import jwt from "jsonwebtoken";

const verifyToken: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Missing authorization header' });
    }

    const jwtSecret = process.env.JWT_SECRET ?? '';
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, jwtSecret, (error, user) => {
        if (error) {
            return res.status(403).json({ error: 'Invalid authorization token' });
        }

        req.user = user;

        next();
    });
};

export const verifyAuthorization: RequestHandler = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ error: 'You do not have permission to perform this action' });
        }
    });
};

