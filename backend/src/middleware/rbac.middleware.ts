import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

/**
 * Check if user has a specific role
 */
export const requireRole = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError('Unauthorized', 401));
        }

        const hasRole = req.user.roles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            return next(new AppError('Forbidden: Insufficient permissions', 403));
        }

        next();
    };
};

/**
 * Check if user has a specific permission
 */
export const requirePermission = (...requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError('Unauthorized', 401));
        }

        const hasPermission = requiredPermissions.every(permission =>
            req.user!.permissions.includes(permission)
        );

        if (!hasPermission) {
            return next(new AppError('Forbidden: Insufficient permissions', 403));
        }

        next();
    };
};

/**
 * Check if user has ANY of the specified permissions
 */
export const requireAnyPermission = (...permissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError('Unauthorized', 401));
        }

        const hasPermission = permissions.some(permission =>
            req.user!.permissions.includes(permission)
        );

        if (!hasPermission) {
            return next(new AppError('Forbidden: Insufficient permissions', 403));
        }

        next();
    };
};
