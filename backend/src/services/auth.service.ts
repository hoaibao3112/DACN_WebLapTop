import { TaiKhoan, VaiTro, Quyen } from '../models';
import { hashPassword, comparePassword } from '../utils/password.util';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.util';
import { AppError } from '../middleware/error.middleware';

interface RegisterData {
    hoten: string;
    email: string;
    matkhau: string;
}

interface LoginData {
    email: string;
    matkhau: string;
}

interface QuyenWithMaQuyen extends Quyen {
    ma_quyen: string;
}

interface VaiTroWithQuyen extends VaiTro {
    ten_vaitro: string;
    quyens?: QuyenWithMaQuyen[];
}

interface TaiKhoanWithRoles extends TaiKhoan {
    vaitros?: VaiTroWithQuyen[];
}

export class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData) {
        // Check if email already exists
        const existingUser = await TaiKhoan.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }

        // Hash password
        const hashedPassword = await hashPassword(data.matkhau);

        // Create user
        const user = await TaiKhoan.create({
            hoten: data.hoten,
            email: data.email,
            matkhau: hashedPassword,
        });

        // Assign default "Customer" role
        const customerRole = await VaiTro.findOne({ where: { ten_vaitro: 'Customer' } });
        if (customerRole) {
            await (user as any).addVaitro(customerRole);
        }

        // Generate tokens
        const tokens = await this.generateTokensForUser(user.id_taikhoan);

        return {
            user: {
                id: user.id_taikhoan,
                hoten: user.hoten,
                email: user.email,
            },
            ...tokens,
        };
    }

    /**
     * Login user
     */
    async login(data: LoginData) {
        // Find user by email
        const user = await TaiKhoan.findOne({
            where: { email: data.email },
            include: [
                {
                    model: VaiTro,
                    as: 'vaitros',
                    include: [
                        {
                            model: Quyen,
                            as: 'quyens',
                        },
                    ],
                },
            ],
        });

        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        // Check if account is active
        if (!user.trangthai) {
            throw new AppError('Account is disabled', 403);
        }

        // Verify password
        const isPasswordValid = await comparePassword(data.matkhau, user.matkhau);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        // Generate tokens
        const tokens = await this.generateTokensForUser(user.id_taikhoan);

        return {
            user: {
                id: user.id_taikhoan,
                hoten: user.hoten,
                email: user.email,
            },
            ...tokens,
        };
    }

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string) {
        try {
            // Verify refresh token
            const decoded = verifyRefreshToken(refreshToken);

            // Generate new tokens
            const tokens = await this.generateTokensForUser(decoded.id);

            return tokens;
        } catch (error) {
            throw new AppError('Invalid or expired refresh token', 401);
        }
    }

    /**
     * Generate tokens for user
     */
    private async generateTokensForUser(userId: number) {
        // Get user with roles and permissions
        const user = await TaiKhoan.findByPk(userId, {
            include: [
                {
                    model: VaiTro,
                    as: 'vaitros',
                    include: [
                        {
                            model: Quyen,
                            as: 'quyens',
                        },
                    ],
                },
            ],
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Extract roles and permissions
        const userWithRoles = user as TaiKhoanWithRoles;
        const vaitros = userWithRoles.vaitros || [];
        const roles = vaitros.map((vt: VaiTroWithQuyen) => vt.ten_vaitro);
        const permissions = [...new Set(vaitros.flatMap((vt: VaiTroWithQuyen) => (vt.quyens || []).map((q: QuyenWithMaQuyen) => q.ma_quyen)))] as string[];

        const payload = {
            id: user.id_taikhoan,
            email: user.email,
            roles,
            permissions,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
        };
    }

    /**
     * Get user profile
     */
    async getProfile(userId: number) {
        const user = await TaiKhoan.findByPk(userId, {
            attributes: { exclude: ['matkhau'] },
            include: [
                {
                    model: VaiTro,
                    as: 'vaitros',
                    include: [
                        {
                            model: Quyen,
                            as: 'quyens',
                        },
                    ],
                },
            ],
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }
}
export default new AuthService()