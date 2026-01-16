import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.util';
import { AppError } from './error.middleware';

/**
 * Authentication middleware - verifies JWT token
 */
export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = verifyAccessToken(token);

        // Attach user data to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            roles: decoded.roles,
            permissions: decoded.permissions,
        };

        next();
    } catch (error) {
        if (error instanceof AppError) {
            return next(error);
        }
        return next(new AppError('Invalid or expired token', 401));
    }
};

/**
 * Optional authentication - doesn't throw error if no token
 */
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = verifyAccessToken(token);

            req.user = {
                id: decoded.id,
                email: decoded.email,
                roles: decoded.roles,
                permissions: decoded.permissions,
            };
        }

        next();
    } catch (error) {
        // Continue without user data
        next();
    }
};
