import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { env } from '../config/env';

interface JwtPayload {
    id: number;
    email: string;
    roles: string[];
    permissions: string[];
}

/**
 * Generate access token
 */
export const generateAccessToken = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as StringValue,
    };
    return jwt.sign(payload, env.JWT_SECRET, options) as string;
};

/**
 * Generate refresh token
 */
export const generateRefreshToken = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN as StringValue,
    };
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options) as string;
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};
