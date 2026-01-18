import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util';
import { TaiKhoan, VaiTro, Quyen } from '../models';

const authService = new AuthService();

export class AuthController {
    /**
     * POST /api/auth/register
     * Register a new user
     */
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.register(req.body);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/auth/login
     * Login user
     */
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.login(req.body);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/auth/refresh
     * Refresh access token
     */
    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                res.status(400).json({
                    success: false,
                    message: 'Refresh token is required',
                });
                return;
            }

            const result = await authService.refreshToken(refreshToken);

            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/auth/profile
     * Get current user profile
     */
    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
                return;
            }

            const user = req.user as any;
            const profile = await authService.getProfile(user.ma_tai_khoan || user.id);

            res.status(200).json({
                success: true,
                message: 'Profile retrieved successfully',
                data: profile,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/auth/google/callback
     * Google OAuth callback
     */
    async googleCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth_failed`);
            }

            const user = req.user as any;
            
            // Load full user info with roles and permissions
            const fullUser = await TaiKhoan.findByPk(user.id_taikhoan, {
                include: [
                    {
                        model: VaiTro,
                        as: 'vaitros',
                        include: [{ model: Quyen, as: 'quyens' }],
                    },
                ],
            });

            if (!fullUser) {
                return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=user_not_found`);
            }

            // Extract roles and permissions
            const roles = (fullUser as any).vaitros?.map((vaitro: any) => vaitro.ten_vaitro) || ['customer'];
            const permissions = (fullUser as any).vaitros?.flatMap((vaitro: any) =>
                vaitro.quyens?.map((quyen: any) => quyen.ten_quyen) || []
            ) || [];

            const payload = {
                id: fullUser.id_taikhoan,
                email: fullUser.email,
                roles,
                permissions,
            };

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // Redirect to frontend with tokens
            res.redirect(
                `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?` +
                `token=${accessToken}&refreshToken=${refreshToken}`
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/auth/facebook/callback
     * Facebook OAuth callback
     */
    async facebookCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth_failed`);
            }

            const user = req.user as any;
            
            // Load full user info with roles and permissions
            const fullUser = await TaiKhoan.findByPk(user.id_taikhoan, {
                include: [
                    {
                        model: VaiTro,
                        as: 'vaitros',
                        include: [{ model: Quyen, as: 'quyens' }],
                    },
                ],
            });

            if (!fullUser) {
                return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=user_not_found`);
            }

            // Extract roles and permissions
            const roles = (fullUser as any).vaitros?.map((vaitro: any) => vaitro.ten_vaitro) || ['customer'];
            const permissions = (fullUser as any).vaitros?.flatMap((vaitro: any) =>
                vaitro.quyens?.map((quyen: any) => quyen.ten_quyen) || []
            ) || [];

            const payload = {
                id: fullUser.id_taikhoan,
                email: fullUser.email,
                roles,
                permissions,
            };

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            // Redirect to frontend with tokens
            res.redirect(
                `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?` +
                `token=${accessToken}&refreshToken=${refreshToken}`
            );
        } catch (error) {
            next(error);
        }
    }
}
