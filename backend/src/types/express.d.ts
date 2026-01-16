import { TaiKhoan } from '../models/taikhoan.model';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                roles: string[];
                permissions: string[];
            };
        }
    }
}

export { };
